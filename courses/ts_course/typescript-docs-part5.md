# TypeScript Kursu — Hissə 5: Obyekt Tipləri

12 hissəlik "Sıfırdan İrəli Səviyyəyə TypeScript" kursunun beşinci hissəsi (plan: `typescript-docs.plan.md`). Hissə 2-də obyekt tiplərinə səthi toxunmuşduq. Bu hissə obyekt tiplərini — `interface` və `type`, optional/readonly xüsusiyyətlər, index signature-lar, genişləndirmə, intersection tipləri, generic obyekt tipləri, massivlər və tuple-ları — dərindən öyrədir.

## Ön şərtlər

- Hissə 2: obyekt tipləri, interface/type alias-ın giriş səviyyəsi
- Hissə 3: narrowing (union tiplərlə işləmək üçün faydalıdır)

## Mündəricat

1. [Obyekt tipini təyin etmək](#obyekt-tipini-təyin-etmək)
2. [Xüsusiyyət modifikatorları](#xüsusiyyət-modifikatorları)
3. [Artıq xüsusiyyət yoxlaması (excess property checks)](#artıq-xüsusiyyət-yoxlaması)
4. [Tipləri genişləndirmək](#tipləri-genişləndirmək)
5. [Intersection tipləri](#intersection-tipləri)
6. [Generic obyekt tipləri](#generic-obyekt-tipləri)
7. [Array və ReadonlyArray](#array-və-readonlyarray)
8. [Tuple tipləri](#tuple-tipləri)
9. [Praktika](#praktika)
10. [Xülasə](#xülasə)
11. [Əlavə oxu](#əlavə-oxu)

## Obyekt tipini təyin etmək

Obyekt tipini üç yolla yaza bilərsiniz — anonim, `interface` ilə, ya da `type` alias ilə:

```typescript
// Anonim
function greet(person: { name: string; age: number }) {
  return "Salam " + person.name;
}

// Interface
interface Person {
  name: string;
  age: number;
}

// Type alias
type Person = {
  name: string;
  age: number;
};
```

Üçü də eyni şəkildə işləyir. Böyük layihələrdə adətən `interface` üstünlük təşkil edir, çünki genişləndirilə bilir və xəta mesajlarında daha oxunaqlıdır; `type` isə union/intersection kimi tərkiblərdə vacibdir (bunlara aşağıda baxacağıq).

## Xüsusiyyət modifikatorları

### Optional xüsusiyyətlər (`?`)

Xüsusiyyəti sual işarəsi ilə istəyə bağlı edə bilərsiniz:

```typescript
interface PaintOptions {
  shape: string;
  xPos?: number;
  yPos?: number;
}

function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos === undefined ? 0 : opts.xPos;
  let yPos = opts.yPos === undefined ? 0 : opts.yPos;
}

// Destructuring ilə default dəyər
function paintShape2({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log("x koordinatı:", xPos);
  console.log("y koordinatı:", yPos);
}
```

`strictNullChecks` aktivdirsə, optional xüsusiyyətin tipi əslində `Type | undefined`-dir.

### Readonly xüsusiyyətlər

`readonly` xüsusiyyəti yenidən təyin etməyə (reassignment) qadağan qoyur:

```typescript
interface SomeType {
  readonly prop: string;
}

function doSomething(obj: SomeType) {
  console.log(`prop dəyəri: '${obj.prop}'.`); // OK
  obj.prop = "salam"; // Xəta
}
```

**Vacib qeyd:** `readonly` yalnız birbaşa yenidən təyinatı qadağan edir, daxili (nested) obyektin mutasiyasını yox:

```typescript
interface Home {
  readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
  home.resident.age++; // OK — daxili obyektin xüsusiyyəti dəyişir
  home.resident = { name: "Vüqar", age: 42 }; // Xəta — resident-in özü readonly-dir
}
```

### Index signature-lar

Xüsusiyyət adları qabaqcadan məlum olmayanda, amma dəyər tipi məlum olanda index signature istifadə edin:

```typescript
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = ["salam", "dünya"];
const secondItem = myArray[1]; // tipi: string
```

String index signature ilə obyektdəki bütün adlanmış xüsusiyyətlər də uyğun tipdə olmalıdır:

```typescript
interface NumberDictionary {
  [index: string]: number;
  length: number; // OK, number
  name: string;   // Xəta — string, index signature-ın (number) altında deyil
}

interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // OK
  name: string;   // OK
}
```

Index signature-ı da `readonly` edə bilərsiniz — bu, `myArray[2] = "..."` kimi yazma əməliyyatlarını qadağan edir.

## Artıq xüsusiyyət yoxlaması

Obyekt literalı birbaşa tipli dəyişənə/parametrə ötürüləndə TypeScript **əlavə xüsusiyyətləri** yoxlayır və artıq xüsusiyyət varsa xəta verir:

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig) {
  return { color: config.color || "qırmızı", area: config.width ? config.width ** 2 : 20 };
}

let mySquare = createSquare({ colour: "qırmızı", width: 100 });
// Xəta: 'colour' SquareConfig-də yoxdur (yazı səhvi tutulur!)
```

Bu, adətən yazı səhvlərini erkən tutmaq üçün faydalıdır. Əgər həqiqətən əlavə xüsusiyyətlərə icazə vermək istəyirsinizsə, üç yol var:

```typescript
// 1) Tip assertion
let sq1 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

// 2) Index signature əlavə etmək
interface SquareConfig2 {
  color?: string;
  width?: number;
  [propName: string]: unknown;
}

// 3) Aralıq dəyişənə mənimsətmək (bu yoxlamanı yumşaldır)
let squareOptions = { colour: "qırmızı", width: 100 };
let sq2 = createSquare(squareOptions); // OK
```

## Tipləri genişləndirmək

`interface`-lər `extends` açar sözü ilə bir-birini genişləndirə bilir — bu, təkrarçılığı azaldır:

```typescript
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
}

interface AddressWithUnit extends BasicAddress {
  unit: string;
}
```

Bir interface birdən çox interface-i eyni anda genişləndirə bilər:

```typescript
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: "qırmızı",
  radius: 42,
};
```

## Intersection tipləri

`interface extends` alternativi olaraq, `type` alias-larda `&` operatoru ilə tipləri birləşdirə bilərsiniz:

```typescript
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;

function draw(circle: Colorful & Circle) {
  console.log(`Rəng: ${circle.color}, radius: ${circle.radius}`);
}

draw({ color: "mavi", radius: 42 }); // OK
```

**Fərq:** eyni adlı, ziddiyyətli xüsusiyyətlərlə iki `interface` elan etsəniz, xəta alırsınız. Amma intersection-da ziddiyyətli xüsusiyyətlər sadəcə birləşir və nəticə tez-tez `never` olur:

```typescript
interface Person1 {
  name: string;
}
interface Person2 {
  name: number;
}
type Staff = Person1 & Person2;

declare const staffer: Staff;
staffer.name; // Kompilyasiya olunur, amma tipi: never
```

## Generic obyekt tipləri

Tip parametrləri ilə yenidən istifadə oluna bilən obyekt tipləri yarada bilərsiniz:

```typescript
interface Box<Type> {
  contents: Type;
}

let boxA: Box<string> = { contents: "salam" };
let boxB: Box<number> = { contents: 42 };

function setContents<Type>(box: Box<Type>, newContents: Type) {
  box.contents = newContents;
}
```

`type` alias-lar da generic ola bilər:

```typescript
type Box2<Type> = {
  contents: Type;
};

type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];
```

## Array və ReadonlyArray

`Array<Type>` daxili generic tipdir; `Type[]` isə onun qısa formasıdır — ikisi eynidir:

```typescript
function doSomething(value: Array<string>) {}
let myArray: string[] = ["salam", "dünya"];
doSomething(myArray); // OK
```

`ReadonlyArray<Type>` (qısa forması `readonly Type[]`) mutasiya edilə bilməyən massivləri təsvir edir:

```typescript
function doStuff(values: readonly string[]) {
  const copy = values.slice(); // OK — yeni massiv qaytarır
  console.log(values[0]); // OK
  values.push("salam!"); // Xəta — readonly massivdə push yoxdur
}
```

Diqqət: `readonly` massiv adi (mutable) massivə **iki tərəfli** uyğun deyil:

```typescript
let x: readonly string[] = [];
let y: string[] = [];
x = y; // OK
y = x; // Xəta — readonly-ni mutable-a ötürmək olmaz
```

## Tuple tipləri

Tuple — sabit uzunluqlu, hər mövqedə konkret tipi olan massivdir:

```typescript
type StringNumberPair = [string, number];

function doSomething(pair: [string, number]) {
  const a = pair[0]; // string
  const b = pair[1]; // number
  const c = pair[2]; // Xəta — indeks sərhəddən kənar
}

doSomething(["salam", 42]); // OK
```

Optional element (`?`) və rest element (`...`) də dəstəklənir:

```typescript
type Either2dOr3d = [number, number, number?];

type StringNumberBooleans = [string, number, ...boolean[]];
const a: StringNumberBooleans = ["salam", 1];
const b: StringNumberBooleans = ["gözəl", 2, true, false, true];
```

Rest parametrlərlə tuple-lar birbaşa uyğunlaşır:

```typescript
function readButtonInput(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args;
  // ...
}
```

`readonly [string, number]` kimi readonly tuple da mövcuddur; `as const` ilə yaradılan massivlər avtomatik olaraq readonly tuple tipinə çevrilir:

```typescript
let point = [3, 4] as const; // tipi: readonly [3, 4]
```

## Praktika

1. `Kitab` adlı `interface` yaradın: `başlıq: string`, `səhifə: number`, `nadir?: boolean`. Sonra `NəşrOlunmuşKitab` interface-ini `Kitab`-ı genişləndirərək `nəşrIli: number` xüsusiyyəti ilə yaradın.
2. `Renglenmis` və `Olcu` adlı iki interface yaradıb, onları `&` ilə birləşdirərək `RenglenmisQutu` type alias-ı düzəldin.
3. Generic `Cüt<A, B>` tipi yaradın: `{ birinci: A; ikinci: B }`. Ondan `Cüt<string, number>` nümunəsi yaradın.
4. `readonly [number, number]` tipli `koordinat` dəyişəni yaradın və ona dəyər mənimsətməyə çalışaraq xətanı müşahidə edin (şərh kimi qeyd edin).

## Xülasə

- Obyekt tipini anonim, `interface` və ya `type` ilə yaza bilərsiniz; `interface` genişlənə bilir, `type` union/intersection üçün lazımdır.
- `?` optional, `readonly` isə yenidən-təyinatı qadağan edən modifikatordur — `readonly` daxili mutasiyanı dayandırmır.
- Index signature naməlum açar adları üçündür; string index bütün adlanmış xüsusiyyətlərə tətbiq olunur.
- Artıq xüsusiyyət yoxlaması yalnız obyekt literalları birbaşa ötürüləndə işləyir — yazı səhvlərini tutur.
- `interface extends` və `&` (intersection) tipləri birləşdirir, amma ziddiyyət zamanı fərqli davranırlar (xəta vs. `never`).
- `Box<Type>` kimi generic obyekt tipləri yenidən istifadəni artırır; `Array<T>`/`ReadonlyArray<T>` və tuple-lar bunun konkret nümunələridir.

## Əlavə oxu

- Mənbə: [Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- Əvvəlki hissə: **Hissə 4 — Funksiyalar** (`typescript-docs-part4.md`)
- Növbəti hissə: **Hissə 6 — Generiklər və Tip Operatorları** (`typescript-docs-part6.md`)
