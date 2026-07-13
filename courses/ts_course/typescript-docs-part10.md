# TypeScript Kursu — Hissə 10: Enum, Utility Types və Decorators

12 hissəlik "Sıfırdan İrəli Səviyyəyə TypeScript" kursunun onuncu hissəsi (plan: `typescript-docs.plan.md`). Bu hissə referans xarakterlidir — gündəlik işdə tez-tez rast gələcəyiniz dörd ayrı mövzunu bir yerə toplayır: enum-lar, ən çox işlənən utility types, decorator-lara giriş və declaration merging.

## Ön şərtlər

- Hissə 5-8: obyekt tipləri, generic-lər, siniflər

## Mündəricat

1. [Numeric enum-lar](#numeric-enum-lar)
2. [String enum-lar](#string-enum-lar)
3. [Const enum-lar](#const-enum-lar)
4. [Enum-ların alternativi: `as const`](#enum-ların-alternativi-as-const)
5. [Ən çox işlənən Utility Types](#ən-çox-işlənən-utility-types)
6. [Decorators-a giriş](#decorators-a-giriş)
7. [Declaration merging qısaca](#declaration-merging-qısaca)
8. [Praktika](#praktika)
9. [Xülasə](#xülasə)
10. [Əlavə oxu](#əlavə-oxu)

## Numeric enum-lar

Enum bir-biri ilə əlaqəli adlandırılmış sabitlər toplusu təyin etməyə imkan verir. Numeric enum avtomatik olaraq artan qiymətlər alır:

```typescript
enum İstiqamət {
  Yuxarı = 1,
  Aşağı,   // 2
  Sol,     // 3
  Sağ,     // 4
}
```

İnitializer yazılmasa, ilk üzv `0`-dan başlayır:

```typescript
enum İstiqamət2 {
  Yuxarı,  // 0
  Aşağı,   // 1
  Sol,     // 2
  Sağ,     // 3
}
```

```typescript
enum Cavab {
  Yox = 0,
  Bəli = 1,
}

function cavabVer(cavab: Cavab): void {}
cavabVer(Cavab.Bəli);
```

Numeric enum-lar **reverse mapping** də alır — dəyərdən ada qayıtmaq mümkündür:

```typescript
enum E {
  A,
}
let a = E.A;      // 0
let adı = E[a];   // "A"
```

## String enum-lar

String enum-un hər üzvü açıq string literalla initialize olunmalıdır. Runtime-da oxunaqlı, serialize edilə bilən dəyərlər verir (reverse mapping-i **yoxdur**):

```typescript
enum İstiqamət3 {
  Yuxarı = "YUXARI",
  Aşağı = "AŞAĞI",
  Sol = "SOL",
  Sağ = "SAĞ",
}
```

## Const enum-lar

`const enum` kompilyasiya zamanı tamamilə silinir və istifadə yerlərinə birbaşa dəyər "inline" edilir — performans üçün faydalıdır, amma bəzi məhdudiyyətləri var (`isolatedModules`, versiya uyğunsuzluğu riskləri):

```typescript
const enum İstiqamət4 {
  Yuxarı,
  Aşağı,
}

let istiqamətlər = [İstiqamət4.Yuxarı, İstiqamət4.Aşağı];
// Kompilyasiya olunmuş JS-də: let istiqamətlər = [0, 1];
```

Bu risklərə görə bəzi komandalar `const enum`-u linter qaydası ilə qadağan edir.

## Enum-ların alternativi: `as const`

Müasir TypeScript-də tez-tez `as const` ilə obyekt yaratmaq enum-a üstünlük təşkil edir — çünki JavaScript-ə daha yaxındır və enum-a xas problemlərdən (məsələn, əlavə runtime obyekti) qaçır:

```typescript
const Oİstiqamət = {
  Yuxarı: 0,
  Aşağı: 1,
  Sol: 2,
  Sağ: 3,
} as const;

type İstiqamət5 = (typeof Oİstiqamət)[keyof typeof Oİstiqamət]; // 0 | 1 | 2 | 3

function get(dir: İstiqamət5) {}
get(Oİstiqamət.Sağ); // OK
```

## Ən çox işlənən Utility Types

TypeScript daxili utility types verir — bunlar tip transformasiyasını əl ilə yazmaqdan xilas edir.

**`Partial<T>`** — bütün xüsusiyyətləri optional edir:

```typescript
interface Todo {
  başlıq: string;
  təsvir: string;
}

function yenilə(todo: Todo, sahələr: Partial<Todo>) {
  return { ...todo, ...sahələr };
}
```

**`Required<T>`** — bütün xüsusiyyətləri məcburi edir (`Partial`-ın əksi).

**`Readonly<T>`** — bütün xüsusiyyətləri `readonly` edir:

```typescript
const todo: Readonly<Todo> = { başlıq: "Sil", təsvir: "..." };
todo.başlıq = "yeni"; // Xəta
```

**`Record<K, T>`** — verilmiş açarlarla obyekt tipi qurur:

```typescript
type PişikAdı = "mişka" | "boris";
interface PişikMəlumatı {
  yaş: number;
}

const pişiklər: Record<PişikAdı, PişikMəlumatı> = {
  mişka: { yaş: 10 },
  boris: { yaş: 5 },
};
```

**`Pick<T, K>`** / **`Omit<T, K>`** — müəyyən xüsusiyyətləri seçir/çıxarır:

```typescript
type TodoPreview = Pick<Todo, "başlıq">;
type TodoNoDesc = Omit<Todo, "təsvir">;
```

**`Exclude<T, U>`** / **`Extract<T, U>`** — union-dan üzv çıxarır/seçir:

```typescript
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
```

**`NonNullable<T>`** — `null`/`undefined`-i union-dan çıxarır:

```typescript
type T2 = NonNullable<string | number | undefined>; // string | number
```

**`ReturnType<T>`** / **`Parameters<T>`** — funksiya tipindən return/parametr tiplərini çıxarır (Hissə 6-da `typeof` ilə birgə görmüşdük):

```typescript
declare function f1(arg: { a: number }): string;
type Dönən = ReturnType<typeof f1>;   // string
type Parametrlər = Parameters<typeof f1>; // [arg: { a: number }]
```

**`Awaited<T>`** — `await`-in `Promise`-i necə "açdığını" tip səviyyəsində, rekursiv olaraq modelləşdirir:

```typescript
type A = Awaited<Promise<string>>; // string
type B = Awaited<Promise<Promise<number>>>; // number
```

## Decorators-a giriş

Decorator — sinif, metod, accessor, property və ya parametrə `@ifadə` sintaksisi ilə "bağlanan" xüsusi bəyanatdır; runtime-da bəyanat haqqında məlumatla çağırılan funksiyaya çevrilir. Decorator-ları aktivləşdirmək üçün `tsconfig.json`-da `experimentalDecorators` lazımdır:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "experimentalDecorators": true
  }
}
```

**Sinif decorator-u** — konstruktoru arqument kimi alır:

```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class BugReport {
  növ = "hesabat";
  başlıq: string;
  constructor(b: string) {
    this.başlıq = b;
  }
}
```

**Metod decorator-u** — üç arqument alır: hədəf (prototype/konstruktor), üzv adı, property descriptor:

```typescript
function enumerable(dəyər: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = dəyər;
  };
}

class Greeter {
  salamlama: string;
  constructor(mesaj: string) {
    this.salamlama = mesaj;
  }

  @enumerable(false)
  salamla() {
    return "Salam, " + this.salamlama;
  }
}
```

**Decorator factory** — parametr qəbul edib decorator qaytaran funksiyadır (yuxarıdakı `enumerable(false)` məhz budur). Bir neçə decorator eyni bəyanata tətbiq oluna bilər; yuxarıdan-aşağıya **qiymətləndirilir**, aşağıdan-yuxarıya **çağırılır** (funksiya kompozisiyasına bənzəyir).

> **Qeyd:** bu, TypeScript-in "Stage 2" decorator dəstəyidir (`experimentalDecorators`). TypeScript 5.0-dan etibarən ECMAScript-in rəsmiləşən "Stage 3" decorator təklifi də dəstəklənir — yeni layihələrdə bunu araşdırmaq faydalıdır, amma köhnə kitabxanalarda (Angular, əvvəlki NestJS versiyaları) hələ Stage 2 üslubu geniş yayılıb.

## Declaration merging qısaca

TypeScript eyni adlı bir neçə ayrı bəyanatı **bir tipdə birləşdirə** bilir. Ən sadə və çox rast gəlinən forma — interface merging:

```typescript
interface Box {
  hündürlük: number;
  eni: number;
}

interface Box {
  miqyas: number;
}

let qutu: Box = { hündürlük: 5, eni: 6, miqyas: 10 };
// İki ayrı 'Box' elanı avtomatik birləşdi
```

Qaydalar: fərqli-funksiya-olmayan üzvlər unikal olmalı (və ya eyni tipdə olmalı) — ziddiyyət kompilyasiya xətasıdır; funksiya üzvləri isə bir-birinin **overload**-u kimi qəbul olunur.

## Praktika

1. `Sifariş Statusu` üçün string enum yaradın: `Gözləyir`, `Göndərilib`, `Çatdırılıb`.
2. Eyni enum-u `as const` obyekt kimi yenidən yazın və müqayisə edin.
3. `İstifadəçi` interface-indən `Pick` ilə yalnız `id` və `ad`-ı olan `İstifadəçiXülasəsi` tipi yaradın.
4. Sadə `log` sinif decorator-u yazın — sinif elan olunanda konsola "Sinif yaradıldı: <ad>" yazsın (`experimentalDecorators`-un aktiv olduğunu fərz edin).

## Xülasə

- Numeric enum avtomatik artır və reverse mapping alır; string enum runtime-da oxunaqlıdır, reverse mapping-i yoxdur.
- `const enum` kompilyasiyada silinir və dəyərləri inline edir — performans faydası var, amma risklərinə görə bəzən qadağan edilir.
- Müasir TypeScript-də `as const` obyekt çox vaxt enum-un daha JS-yönümlü alternatividir.
- `Partial`, `Required`, `Readonly`, `Record`, `Pick`, `Omit`, `Exclude`, `Extract`, `NonNullable`, `ReturnType`, `Parameters`, `Awaited` — gündəlik ən çox işlənən utility types-dır.
- Decorator-lar sinif/metod/property-lərə metadata və davranış "bağlamaq" üçündür; `experimentalDecorators` aktiv edilməlidir.
- Declaration merging (məsələn, interface merging) eyni adlı bəyanatları avtomatik birləşdirir.

## Əlavə oxu

- Mənbə: [Enums](https://www.typescriptlang.org/docs/handbook/enums.html), [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html), [Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html), [Declaration Merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
- Əvvəlki hissə: **Hissə 9 — Modullar** (`typescript-docs-part9.md`)
- Növbəti hissə: **Hissə 11 — Layihə Konfiqurasiyası (tsconfig)** (`typescript-docs-part11.md`)
