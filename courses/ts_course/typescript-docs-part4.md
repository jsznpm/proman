# TypeScript Kursu — Hissə 4: Funksiyalar

12 hissəlik "Sıfırdan İrəli Səviyyəyə TypeScript" kursunun dördüncü hissəsi (plan: `typescript-docs.plan.md`). Bu hissə funksiyaların tiplənməsini — funksiya tipi ifadələrindən tutmuş overload-lara qədər — əhatə edir.

## Ön şərtlər

- Hissə 2 (əsas tiplər), Hissə 3 (narrowing, `never` tipinə giriş)

## Mündəricat

1. [Funksiya tipi ifadələri](#funksiya-tipi-ifadələri)
2. [Call signatures](#call-signatures)
3. [Construct signatures](#construct-signatures)
4. [Generic funksiyalara giriş](#generic-funksiyalara-giriş)
5. [Optional və default parametrlər](#optional-və-default-parametrlər)
6. [Rest parametrlər və arqumentlər](#rest-parametrlər-və-arqumentlər)
7. [Function overloads](#function-overloads)
8. [this parametri](#this-parametri)
9. [Xüsusi tiplər: void, object, unknown, never, Function](#xüsusi-tiplər)
10. [Parametr destructuring](#parametr-destructuring)
11. [void tipinin assignability xüsusiyyəti](#void-tipinin-assignability-xüsusiyyəti)
12. [Praktika](#praktika)
13. [Xülasə](#xülasə)

## Funksiya tipi ifadələri

Funksiya tipini təsvir etməyin ən sadə yolu ox (arrow) sintaksisidir:

```typescript
function salamlayıcı(fn: (a: string) => void) {
  fn("Salam, Dünya");
}

function konsolaÇap(s: string) {
  console.log(s);
}

salamlayıcı(konsolaÇap); // OK
```

Təkrar istifadə üçün tip alias yaratmaq olar:

```typescript
type SalamFunksiyası = (a: string) => void;

function salamlayıcı(fn: SalamFunksiyası) {
  // ...
}
```

> **Diqqət:** parametr adı yazılmalıdır. `(string) => void` — bu, `string` adlı, `any` tipli parametr deməkdir, "string tipli parametr" demək **deyil**! Bu, funksiya tipi sintaksisində tez-tez rast gəlinən yanlış anlaşılmadır.

## Call signatures

Funksiyanın həm çağırıla bilməsini, həm də üzərində xüsusiyyət daşımasını təsvir etmək üçün obyekt tipi daxilində call signature yazılır:

```typescript
type TəsvirEdiləFunksiya = {
  description: string;
  (someArg: number): boolean;
};

function nəSəEt(fn: TəsvirEdiləFunksiya) {
  console.log(fn.description + " nəticə: " + fn(6));
}

function mənimFunksiyam(someArg: number) {
  return someArg > 3;
}
mənimFunksiyam.description = "standart təsvir";

nəSəEt(mənimFunksiyam); // OK
```

## Construct signatures

`new` ilə çağırıla bilən funksiyalar (konstruktorlar) construct signature ilə təsvir olunur:

```typescript
type BəziKonstruktor = {
  new (s: string): BəziObyekt;
};

function fn(ctor: BəziKonstruktor) {
  return new ctor("salam");
}
```

Call və construct signature-ları birləşdirmək olar:

```typescript
interface ÇağırVeYaQur {
  (n?: number): string;
  new (s: string): Date;
}

function fn(ctor: ÇağırVeYaQur) {
  console.log(ctor(10));        // birinci signature çağırılır
  console.log(new ctor("10"));  // ikinci signature çağırılır
}

fn(Date); // OK — Date həm funksiya, həm konstruktor kimi çağırıla bilir
```

## Generic funksiyalara giriş

İki fərqli çağırışda giriş və çıxış tipləri arasında əlaqə qurmaq lazım olanda **generic** istifadə olunur:

```typescript
function birinciElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

const s = birinciElement(["a", "b", "c"]); // tip: string
const n = birinciElement([1, 2, 3]);       // tip: number
```

Burada `Type` — çağırış zamanı ötürülən arqumentə görə TypeScript-in özü müəyyən etdiyi bir **tip dəyişənidir**. Diqqət edin: ayrıca annotasiya yazmadıq, TypeScript arqumentdən (`["a","b","c"]` → `string[]`) `Type = string` olduğunu inference etdi.

> **Qeyd:** generics mövzusu geniş və dərindir — constraints (`extends`), çoxlu tip parametrləri, generic siniflər və "yaxşı generic yazmaq" qaydaları **Hissə 6**-da tam əhatə olunacaq. Burada sadəcə funksiyalarda generic-in nəyə lazım olduğunu tanımaq kifayətdir.

## Optional və default parametrlər

```typescript
function f(x?: number) {
  // x-in tipi: number | undefined
}

f();          // OK
f(10);        // OK
f(undefined); // OK

function g(x = 10) {
  // x-in tipi: number (default dəyər sayəsində)
}
```

### Callback-lərdə optional parametr — tez-tez rast gəlinən səhv

```typescript
function mənimForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}

mənimForEach([1, 2, 3], (a, i) => {
  console.log(i.toFixed()); // Xəta: i 'possibly undefined'
});
```

> **Common mistake:** callback tipini yazarkən parametri `?` ilə optional etməyin, əgər siz özünüz o parametri **ötürmədən** çağırmaq niyyətində deyilsinizsə. `index?: number` yazmaq, çağıranlara "mən bu arqumenti göndərməyə bilərəm" siqnalı verir — nəticədə callback daxilində həmin parametr həmişə `| undefined` kimi işlənir, hətta siz onu həmişə ötürsəniz belə.

## Rest parametrlər və arqumentlər

### Rest parametrlər (topla)

```typescript
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}

const a = multiply(10, 1, 2, 3, 4); // a = [10, 20, 30, 40]
```

### Rest arqumentlər (yay/spread)

```typescript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2); // OK

const args = [8, 5];
const angle = Math.atan2(...args); // Xəta: tuple tipi lazımdır, sadə massiv kifayət etmir
```

Bunu düzəltmək üçün `as const` (Hissə 2-də gördüyümüz literal-saxlama texnikası) istifadə edilir:

```typescript
const args = [8, 5] as const;
const angle = Math.atan2(...args); // OK — indi args tipi [8, 5]-lik tuple-dır
```

## Function overloads

Bir funksiyanın müxtəlif arqument dəstlərilə çağırılmasını dəstəkləmək üçün — **overload signature-ları** yazılır, sonra tək bir **implementasiya** siqnaturası gəlir:

```typescript
function tarixYarat(timestamp: number): Date;
function tarixYarat(ay: number, gün: number, il: number): Date;
function tarixYarat(ayVeYaTimestamp: number, gün?: number, il?: number): Date {
  if (gün !== undefined && il !== undefined) {
    return new Date(il, ayVeYaTimestamp, gün);
  } else {
    return new Date(ayVeYaTimestamp);
  }
}

const d1 = tarixYarat(12345678); // OK
const d2 = tarixYarat(5, 5, 5);  // OK
const d3 = tarixYarat(1, 3);     // Xəta: 1 və ya 3 arqument gözlənilir, 2 yox
```

> **Vacib:** implementasiya siqnaturası **xaricdən görünmür** — çağıran tərəf yalnız overload siqnaturalarını görür. Ona görə implementasiyadan əvvəl mütləq **iki və ya daha çox** overload siqnaturası olmalıdır:
>
> ```typescript
> function fn(x: boolean): void;
> function fn(x: string): void;
> function fn(x: boolean) {} // Xəta: implementasiya bütün overload tiplərini qəbul etməlidir
> ```

### Overload əvəzinə union — çox vaxt daha yaxşı seçim

```typescript
// Overload ilə (çevik deyil)
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}

len(Math.random() > 0.5 ? "salam" : [0]); // Xəta

// Union ilə (çevik)
function len(x: any[] | string) {
  return x.length;
}

len(Math.random() > 0.5 ? "salam" : [0]); // OK
```

> **Qayda:** mümkün olduqda overload əvəzinə union parametr tipi istifadə edin — kod daha sadə olur və şərti (`Math.random() > 0.5 ? a : b`) kimi ifadələrlə də düzgün işləyir.

## this parametri

```typescript
interface DB {
  filterUsers(filter: (this: İstifadəçi) => boolean): İstifadəçi[];
}

const db = dbGötür();
const adminlər = db.filterUsers(function (this: İstifadəçi) {
  return this.admin; // this tiplənib
});

// Ox funksiyaları işləmir — çünki onlar xarici 'this'-i tutur
const adminlər2 = db.filterUsers(() => this.admin); // Xəta
```

## Xüsusi tiplər

### void

Dəyər qaytarmayan funksiyaların qaytarma tipi. **`undefined` ilə eyni deyil.**

```typescript
function noop() {
  return; // inference: void
}

type voidFunc = () => void;
```

### object

`string`, `number`, `bigint`, `boolean`, `symbol`, `null`, `undefined` **olmayan** hər hansı dəyər. Böyük hərfli `Object`-dən **fərqlidir** — həmişə kiçik hərfli `object` istifadə edin.

### unknown

`any`-dən daha təhlükəsizdir. Üzərində birbaşa əməliyyat aparmaq üçün əvvəlcə tip yoxlaması tələb olunur:

```typescript
function f1(a: any) {
  a.b(); // OK, amma təhlükəli
}

function f2(a: unknown) {
  a.b(); // Xəta: təhlükəsiz deyil, əvvəlcə yoxlama lazımdır
}

function təhlükəsizParse(s: string): unknown {
  return JSON.parse(s);
}
```

> **Niyə önəmlidir:** xarici mənbədən (API cavabı, `JSON.parse`) gələn məlumat üçün `any` yox, `unknown` istifadə edin — bu, sizi istifadədən əvvəl mütləq tip yoxlaması (məsələn, narrowing, Hissə 3) etməyə məcbur edir.

### never

Heç vaxt normal şəkildə qayıtmayan (xəta atan və ya sonsuz dövr edən) funksiyalar üçün:

```typescript
function uğursuz(msg: string): never {
  throw new Error(msg);
}
```

### Function

İstənilən funksiya dəyərini təsvir edir (`bind`, `call`, `apply` metodları var), amma çağırış nəticəsi `any` olur:

```typescript
function nəSəEt(f: Function) {
  return f(1, 2, 3); // nəticə: any
}
```

> **Tövsiyə:** `Function` tipini demək olar heç vaxt istifadə etməyin — konkret siqnatura (`() => void` və ya sizə lazım olan tip) yazmaq daha təhlükəsizdir.

## Parametr destructuring

```typescript
function cəmlə({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}

// Type alias ilə daha oxunaqlı
type ABC = { a: number; b: number; c: number };
function cəmlə2({ a, b, c }: ABC) {
  console.log(a + b + c);
}
```

## void tipinin assignability xüsusiyyəti

Kontekstual tiplənmədə `void` qaytarma tipi, dəyər qaytarmağın **qarşısını almır** — sadəcə qaytarılan dəyər nəzərə alınmır:

```typescript
type voidFunc = () => void;

const f1: voidFunc = () => {
  return true; // OK, amma dəyər ignor olunur
};

const v1 = f1(); // v1-in tipi: void
```

Bu, məsələn belə kodun düzgün işləməsinə imkan verir:

```typescript
const src = [1, 2, 3];
const dst = [0];
src.forEach((el) => dst.push(el)); // OK — push 'number' qaytarır, forEach 'void' gözləyir, amma bu icazəlidir
```

Amma **açıq** `void` qaytarma tipi olan funksiya təyinatında dəyər qaytarmaq xətadır:

```typescript
function f2(): void {
  return true; // Xəta
}
```

> **Fərq budur:** kontekstual (`voidFunc` kimi tip vasitəsilə) təyin olunan funksiyalarda bu qayda yumşaqdır, amma funksiyanın öz elanında açıq `: void` yazsanız, sərt tətbiq olunur.

## Praktika

1. `SalamFunksiyası` adlı `type` yaradın: `(ad: string) => void`. Bunu qəbul edən bir funksiya yazın və ona uyğun callback ötürün.
2. `sayÇap` adlı overload-lu funksiya yazın: bir overload `(n: number): string`, digəri `(n: number, prefiks: string): string` olsun; implementasiyada hər ikisini işləyin.
3. `couldBeAnything: unknown` dəyişəni yaradın, üzərində `typeof` narrowing edərək (Hissə 3-dən xatırlayın) təhlükəsiz şəkildə `.toUpperCase()` çağırın.
4. Rest parametrlə `cəmİstənilənSayda(...ədədlər: number[]): number` funksiyası yazın.

## Xülasə

- Funksiya tipini ox sintaksisi (`(a: string) => void`) ilə, xüsusiyyətli funksiyaları isə call/construct signature ilə təsvir edirik.
- Generic funksiyalar giriş və çıxış arasında tip əlaqəsi qurur — dərin mövzu Hissə 6-dadır.
- Optional (`?`) və default (`= dəyər`) parametrlər var, amma callback-lərdə optional parametrdən ehtiyatlı istifadə edin.
- Overload çoxlu çağırış formalarını dəstəkləyir, amma mümkünsə union parametr daha sadədir.
- `void`, `object`, `unknown`, `never`, `Function` — hər birinin öz məqsədi var; `any` əvəzinə çox vaxt `unknown` daha təhlükəsizdir.
- `void` qaytarma tipi kontekstual tiplənmədə "dəyər ignor olunur" mənasını verir, öz elanında isə sərt qadağadır.

## Əlavə oxu

- Mənbə: [More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
- Əvvəlki hissə: **Hissə 3 — Narrowing** (`typescript-docs-part3.md`)
- Növbəti hissə: **Hissə 5 — Obyekt Tipləri** (`typescript-docs-part5.md`)
