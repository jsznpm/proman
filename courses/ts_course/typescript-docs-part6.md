# TypeScript Kursu — Hissə 6: Generiklər və Tip Operatorları

12 hissəlik "Sıfırdan İrəli Səviyyəyə TypeScript" kursunun altıncı hissəsi (plan: `typescript-docs.plan.md`). Hissə 4 və 5-də generic funksiya/obyekt tiplərinə qısaca toxunmuşduq. Bu hissə generic-ləri dərindən öyrədir və üç güclü **tip operatoru** — `keyof`, `typeof`, indexed access — ilə tanış edir. Bunlar irəli səviyyə tip sisteminin (Hissə 7) təməlidir.

## Ön şərtlər

- Hissə 4: funksiya tipləri, generic funksiyalara giriş
- Hissə 5: interface, obyekt tipləri

## Mündəricat

1. [Generic funksiyalar](#generic-funksiyalar)
2. [Generic tip və interface-lər](#generic-tip-və-interface-lər)
3. [Generic siniflər](#generic-siniflər)
4. [Generic constraint-lər](#generic-constraint-lər)
5. [Tip parametrini constraint daxilində istifadə](#tip-parametrini-constraint-daxilində-istifadə)
6. [Generic default parametrlər](#generic-default-parametrlər)
7. [`keyof` operatoru](#keyof-operatoru)
8. [`typeof` operatoru](#typeof-operatoru)
9. [Indexed access tipləri](#indexed-access-tipləri)
10. [Praktika](#praktika)
11. [Xülasə](#xülasə)
12. [Əlavə oxu](#əlavə-oxu)

## Generic funksiyalar

Generic-lər müxtəlif tiplərlə işləyən, amma tip təhlükəsizliyini itirməyən yenidən-istifadə oluna bilən komponentlər yaratmağa imkan verir:

```typescript
function identity<Type>(arg: Type): Type {
  return arg;
}

let output1 = identity<string>("mənimTipim"); // açıq tip
let output2 = identity("mənimTipim");         // inference ilə avtomatik
```

Tip parametrini digər tiplərin daxilində də işlədə bilərsiniz:

```typescript
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}
```

## Generic tip və interface-lər

Generic funksiya tipini dəyişənə də mənimsədə bilərsiniz:

```typescript
let myIdentity: <Type>(arg: Type) => Type = identity;
```

Generic interface-lər iki formada yazıla bilər — tip parametri call signature-ın daxilində və ya interface-in özündə:

```typescript
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

interface GenericIdentityFn2<Type> {
  (arg: Type): Type;
}

let myIdentity2: GenericIdentityFn2<number> = identity;
```

## Generic siniflər

```typescript
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

**Qeyd:** generic sinif yalnız **instance** tərəfində generic-dir, statik üzvlərdə tip parametrini işlətmək olmaz (Hissə 8-də ətraflı).

## Generic constraint-lər

Generic-in qəbul edə biləcəyi tipləri məhdudlaşdırmaq üçün `extends` istifadə edin:

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // artıq təhlükəsiz — Type mütləq .length-ə malikdir
  return arg;
}

loggingIdentity({ length: 10, value: 3 }); // OK
loggingIdentity(3); // Xəta — number-də .length yoxdur
```

## Tip parametrini constraint daxilində istifadə

Bir tip parametrini digərinin constraint-ində işlətmək mümkündür — məsələn, obyektdən **məlum** açarla dəyər almaq:

```typescript
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a"); // OK
getProperty(x, "m"); // Xəta — "m" x-in açarları arasında deyil
```

## Generic default parametrlər

```typescript
declare function create<T extends HTMLElement = HTMLDivElement, U extends HTMLElement[] = T[]>(
  element?: T,
  children?: U
): void;

create(); // T = HTMLDivElement, U = HTMLDivElement[]
```

**Qayda:** default-lu tip parametrləri istəyə bağlıdır; məcburi (default-suz) parametr default-lu parametrdən **sonra** gələ bilməz.

## `keyof` operatoru

`keyof` obyekt tipini götürüb onun **açarlarının string/numeric literal union-unu** qaytarır:

```typescript
type Point = { x: number; y: number };
type P = keyof Point;
// P = "x" | "y"
```

Index signature olan tiplərdə `keyof` fərqli işləyir:

```typescript
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish; // A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish; // M = string | number
```

`M`-in `string | number` olmasının səbəbi: JavaScript-də obyekt açarları həmişə string-ə çevrilir, ona görə `obj[0]` həmişə `obj["0"]` ilə eynidir.

`keyof` xüsusilə mapped tiplərlə (Hissə 7) birlikdə çox güclüdür.

## `typeof` operatoru

JavaScript-in runtime `typeof`-undan fərqli olaraq, TypeScript-in `typeof`-u **tip kontekstində** işlədilir — dəyişənin/xüsusiyyətin tipinə istinad üçün:

```typescript
let s = "salam";
let n: typeof s; // n-in tipi: string
```

Bu, `ReturnType<T>` kimi utility tiplərlə birlikdə çox faydalıdır:

```typescript
function f() {
  return { x: 10, y: 3 };
}

type P = ReturnType<typeof f>;
// P = { x: number; y: number }
```

Diqqət: `ReturnType<f>` (yəni `typeof`-suz) **xətadır**, çünki `f` dəyərdir, tip deyil:

```typescript
type P2 = ReturnType<f>;
// Xəta: 'f' bir dəyərdir, tip kimi istifadə oluna bilməz. Bəlkə 'typeof f' nəzərdə tutmusunuz?
```

**Məhdudiyyət:** `typeof` yalnız identifikatorlara (dəyişən adları, obyekt xüsusiyyətləri) tətbiq oluna bilir — funksiya çağırışı kimi ifadələrə yox:

```typescript
let shouldContinue: typeof msgbox("davam etmək istəyirsiniz?");
// Xəta — funksiya çağırışı tip kontekstində icazəli deyil
```

## Indexed access tipləri

Bracket sintaksisi ilə başqa tipin konkret xüsusiyyətinin tipini "axtara" bilərsiniz:

```typescript
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"]; // Age = number
```

Union ilə birdən çox xüsusiyyətin tipini birdən ala bilərsiniz:

```typescript
type I1 = Person["age" | "name"]; // string | number
type I2 = Person[keyof Person];  // string | number | boolean
```

Massivin elementinin tipini almaq üçün `number` indeksindən istifadə edin:

```typescript
const MyArray = [
  { name: "Əli", age: 15 },
  { name: "Aygün", age: 23 },
];

type ArrPerson = (typeof MyArray)[number];
// { name: string; age: number }

type Age2 = (typeof MyArray)[number]["age"]; // number
```

**Vacib məhdudiyyət:** `const` dəyişənini indeks kimi işlətmək olmaz — yalnız tip:

```typescript
const key = "age";
type Age3 = Person[key]; // Xəta — 'key' dəyərdir, tip deyil

type key2 = "age";
type Age4 = Person[key2]; // OK
```

## Praktika

1. `Fərqli<Type>` adlı generic funksiya yazın: parametr kimi `Type[]` alsın, ilk elementi qaytarsın.
2. `İşçi = { ad: string; vəzifə: string; maaş: number }` tipi yaradın. `keyof İşçi` ilə açarların union-unu tipə çevirin və `getMəlumat<Key extends keyof İşçi>(iş: İşçi, açar: Key)` funksiyası yazın.
3. `const config = { host: "localhost", port: 8080 }` dəyişənindən `typeof` ilə `Config` adlı tip çıxarın.
4. `Config["port"]` indexed access tipini yaradıb, onun `number` olduğunu yoxlayın.

## Xülasə

- Generic-lər tip parametrləri ilə funksiya/interface/sinifin bir dəfə yazılıb müxtəlif tiplərlə işləməsinə imkan verir.
- `extends` ilə generic-i məhdudlaşdırmaq (constraint) mümkündür; bir tip parametri digərinin constraint-ində (`Key extends keyof Type`) işlədilə bilər.
- Generic parametrlərə default dəyər vermək mümkündür, məcburi parametrlər default-lulardan əvvəl gəlməlidir.
- `keyof Type` — obyektin açarlarının union-u; index signature-lı tiplərdə `string`/`number` qaytarır.
- `typeof dəyişən` — dəyərin tipini tip kontekstinə gətirir; yalnız identifikatorlara tətbiq olunur, funksiya çağırışına yox.
- `Type["açar"]` (indexed access) konkret xüsusiyyətin tipini "axtarmaq" üçündür; `const` dəyər deyil, yalnız tip indeks kimi işlədilə bilər.

## Əlavə oxu

- Mənbə: [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html), [Keyof Type Operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html), [Typeof Type Operator](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html), [Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
- Əvvəlki hissə: **Hissə 5 — Obyekt Tipləri** (`typescript-docs-part5.md`)
- Növbəti hissə: **Hissə 7 — Şərti və Mapped Tiplər** (`typescript-docs-part7.md`)
