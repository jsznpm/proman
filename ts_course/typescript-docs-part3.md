# TypeScript Kursu — Hissə 3: Narrowing (Tip Daraltma)

12 hissəlik "Sıfırdan İrəli Səviyyəyə TypeScript" kursunun üçüncü hissəsi (plan: `typescript-docs.plan.md`). Hissə 2-də union tiplərinə (`string | number` kimi) qısaca toxunmuşduq. Bu hissə TypeScript-in union tiplərini kod axını daxilində necə **daraltdığını (narrowing)** dərindən öyrədir — bu, gündəlik TypeScript yazarkən ən çox istifadə edəcəyiniz bacarıqlardan biridir.

## Ön şərtlər

- Hissə 2: union tipləri, `typeof` ilə əsas narrowing

## Mündəricat

1. [Narrowing nədir](#narrowing-nədir)
2. [typeof type guard](#typeof-type-guard)
3. [Truthiness narrowing](#truthiness-narrowing)
4. [Equality narrowing](#equality-narrowing)
5. [in operatoru](#in-operatoru)
6. [instanceof narrowing](#instanceof-narrowing)
7. [Assignment-larla narrowing](#assignment-larla-narrowing)
8. [Control flow analysis](#control-flow-analysis)
9. [Type predicates (istifadəçi tərəfindən müəyyən edilən guard-lar)](#type-predicates)
10. [Discriminated unions](#discriminated-unions)
11. [never tipi və exhaustiveness checking](#never-tipi-və-exhaustiveness-checking)
12. [Praktika](#praktika)
13. [Xülasə](#xülasə)

## Narrowing nədir

**Narrowing** — dəyişənin elan edildiyi genişdaha tipdən (məsələn, `string | number`) kod axınının konkret nöqtəsində daha dar, daha spesifik tipə (`string` və ya `number`) endirilməsi prosesidir. TypeScript bunu sizin əlinizlə etmir — o, kodunuzdakı `if`, `switch`, `return` kimi runtime idarəetmə axınını təhlil edir (buna **control flow analysis** deyilir) və hər budaqda hansı tiplərin mümkün olduğunu özü çıxarır.

## typeof type guard

JavaScript-in `typeof` operatoru runtime-da dəyərin tipini yoxlayır, TypeScript isə bunu tip guard kimi tanıyır:

```typescript
function solaDoldur(dolğu: number | string, giriş: string): string {
  if (typeof dolğu === "number") {
    return " ".repeat(dolğu) + giriş; // burada dolğu: number
  }
  return dolğu + giriş; // burada dolğu: string
}
```

`typeof` operatorunun qaytara biləcəyi dəyərlər: `"string"`, `"number"`, `"bigint"`, `"boolean"`, `"symbol"`, `"undefined"`, `"object"`, `"function"`.

> **Diqqət — JavaScript-in qəribəliyi:** `typeof null === "object"` qaytarır! Yəni `typeof` ilə `null`-u ayırd edə bilməzsiniz — bunun üçün ayrıca `=== null` yoxlaması lazımdır.

## Truthiness narrowing

JavaScript-in şərti ifadələrdə "truthy/falsy" çevirməsindən istifadə edərək narrowing etmək olar:

```typescript
function hamısınıÇap(sətirlər: string | string[] | null) {
  if (sətirlər && typeof sətirlər === "object") {
    for (const s of sətirlər) {
      console.log(s);
    }
  } else if (typeof sətirlər === "string") {
    console.log(sətirlər);
  }
}
```

`false`-a çevrilən dəyərlər: `0`, `NaN`, `""` (boş sətir), `0n`, `null`, `undefined`. `sətirlər &&` yoxlaması burada həm `null`, həm boş sətri ələmək üçün işlədilib.

## Equality narrowing

`===`, `!==`, `==`, `!=` operatorları ilə də narrowing edilir:

```typescript
function nümunə(x: string | number, y: string | boolean) {
  if (x === y) {
    // hər iki tərəf üçün ortaq tip yalnız 'string' ola bilər
    x.toUpperCase();
    y.toLowerCase();
  }
}
```

```typescript
function hamısınıÇap(sətirlər: string | string[] | null) {
  if (sətirlər !== null) {
    if (typeof sətirlər === "object") {
      for (const s of sətirlər) { // sətirlər: string[]
        console.log(s);
      }
    }
  }
}
```

> **Faydalı qısayol:** `== null` (iki bərabər işarəsi ilə) həm `null`, həm `undefined`-i eyni anda yoxlayır — JavaScript-in `==` xüsusi davranışı sayəsində. Bu, `strictNullChecks` aktiv olan kodda tez-tez istifadə olunan qısa yoldur.

## in operatoru

Obyektdə müəyyən xüsusiyyətin olub-olmadığını yoxlayaraq narrowing etmək olar:

```typescript
type Balıq = { üzmək: () => void };
type Quş = { uçmaq: () => void };

function hərəkətEt(heyvan: Balıq | Quş) {
  if ("üzmək" in heyvan) {
    return heyvan.üzmək(); // heyvan: Balıq
  }
  return heyvan.uçmaq(); // heyvan: Quş
}
```

Optional (`?`) xüsusiyyətlər `in` yoxlamasında hər iki budaqda da görünə bilər, çünki xüsusiyyət mövcud olsa da qiyməti `undefined` ola bilər.

## instanceof narrowing

Bir dəyərin müəyyən sinifin nüsxəsi olub-olmadığını yoxlamaq:

```typescript
function dəyəriÇap(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString()); // x: Date
  } else {
    console.log(x.toUpperCase()); // x: string
  }
}
```

## Assignment-larla narrowing

TypeScript dəyişənə yeni dəyər mənimsədildikdə tipi yenidən daraldır:

```typescript
let x = Math.random() < 0.5 ? 10 : "salam dünya!";
// x: string | number

x = 1;
console.log(x); // x: number (daraldılıb)

x = "sağol!";
console.log(x); // x: string (daraldılıb)

x = true; // Xəta: 'boolean' 'string | number'-ə mənimsədilə bilməz
```

Diqqət: `x`-in elan edilmiş tipi (`string | number`) dəyişmir — sadəcə TypeScript kodun hər nöqtəsində hansı alt-tipin **hazırda** mümkün olduğunu izləyir.

## Control flow analysis

TypeScript bütün mümkün kod yollarını izləyərək hər nöqtədə dəyişənin tipini müəyyən edir:

```typescript
function nümunə() {
  let x: string | number | boolean;
  x = Math.random() < 0.5;
  console.log(x); // x: boolean

  if (Math.random() < 0.5) {
    x = "salam";
    console.log(x); // x: string
  } else {
    x = 100;
    console.log(x); // x: number
  }
  return x; // burada x: string | number (boolean budaqdan sonra üzərinə yazılıb)
}
```

Bu, sadə tip yoxlamasından fərqli olaraq, kodun **hər budağını ayrı-ayrı** analiz etməkdir — ona görə "control flow" adlanır.

## Type predicates

Öz tip guard funksiyanızı `parametrAdı is Tip` sintaksisi ilə yaza bilərsiniz:

```typescript
function isBalıq(pet: Balıq | Quş): pet is Balıq {
  return (pet as Balıq).üzmək !== undefined;
}

let pet = kiçikHeyvanGötür();
if (isBalıq(pet)) {
  pet.üzmək(); // pet: Balıq
} else {
  pet.uçmaq(); // pet: Quş
}
```

Bu üsul massiv filtrasiyasında da işləyir və TypeScript nəticə massivinin tipini avtomatik daraldır:

```typescript
const zoo: (Balıq | Quş)[] = [kiçikHeyvanGötür(), kiçikHeyvanGötür()];
const suAltındakılar: Balıq[] = zoo.filter(isBalıq);
```

> **Niyə önəmlidir:** adi `filter((p) => p.üzmək !== undefined)` çağırışında TypeScript nəticənin `Balıq[]` olduğunu **bilmir** — nəticə yenə `(Balıq | Quş)[]` qalır. Type predicate funksiyası isə TypeScript-ə "bu funksiya `true` qaytarsa, arqument mütləq `Balıq`-dır" deməyə imkan verir.

## Discriminated unions

Union-un bütün üzvlərində ortaq, literal tipli bir xüsusiyyət olduqda (məsələn, `kind`), TypeScript bunu **discriminant (ayırdedici)** kimi tanıyır:

```typescript
interface Dairə {
  kind: "dairə";
  radius: number;
}

interface Kvadrat {
  kind: "kvadrat";
  sideLength: number;
}

type Fiqur = Dairə | Kvadrat;

function sahəHesabla(fiqur: Fiqur) {
  switch (fiqur.kind) {
    case "dairə":
      return Math.PI * fiqur.radius ** 2; // fiqur: Dairə
    case "kvadrat":
      return fiqur.sideLength ** 2; // fiqur: Kvadrat
  }
}
```

`switch (fiqur.kind)`-in hər `case`-ində TypeScript `fiqur`-u avtomatik uyğun interfeysə daraldır — əlavə `as` və ya type predicate lazım deyil.

> **Common mistake:** discriminant xüsusiyyəti (`kind`) `string` yox, **literal tip** (`"dairə"`, `"kvadrat"`) olmalıdır. Əgər `kind: string` yazsanız, TypeScript ayırd edə bilmir, çünki bütün üzvlərdə eyni geniş tip görünür.

## never tipi və exhaustiveness checking

`never` tipini istifadə edərək union-un **bütün** hallarının işləndiyini compiler səviyyəsində təsdiqləmək olar:

```typescript
type Fiqur = Dairə | Kvadrat;

function sahəHesabla(fiqur: Fiqur) {
  switch (fiqur.kind) {
    case "dairə":
      return Math.PI * fiqur.radius ** 2;
    case "kvadrat":
      return fiqur.sideLength ** 2;
    default:
      const yoxlama: never = fiqur; // hər hal işlənibsə, fiqur burada 'never' olmalıdır
      return yoxlama;
  }
}
```

Əgər sonradan `Üçbucaq` adlı yeni union üzvü əlavə etsəniz, amma `switch`-ə uyğun `case` yazmasanız, `default` budağında `fiqur`-un tipi artıq `never` deyil (çünki `Üçbucaq` hələ işlənməyib) — TypeScript bunu **compile-time xətası** kimi bildirir: `Type 'Üçbucaq' is not assignable to type 'never'`. Bu, yeni fiqur növü əlavə edəndə unudulmuş `case`-ləri avtomatik tapmağın çox faydalı üsuludur.

## Praktika

1. `Ödəniş = { üsul: "kart"; kartNömrəsi: string } | { üsul: "nağd"; məbləğ: number }` adlı discriminated union type yaradın.
2. `ödənişiTəsvirEt(ödəniş: Ödəniş): string` funksiyası yazın, `switch (ödəniş.üsul)` istifadə edərək hər halı ayrıca mətnə çevirin.
3. `default` budağına `never` ilə exhaustiveness check əlavə edin. Sonra `Ödəniş`-ə üçüncü üzv (`{ üsul: "kripto"; wallet: string }`) əlavə edib, `switch`-də ona uyğun `case` yazmadan compiler-in xəta verdiyini müşahidə edin.
4. `isBalıq` tərzi bir type predicate yazın: `isString(val: unknown): val is string`.

## Xülasə

- Narrowing — TypeScript-in kod axınını izləyərək union tipini konkret budaqda daha dar tipə endirməsidir.
- Əsas alətlər: `typeof`, truthiness, `===`/`!==`, `in`, `instanceof`, assignment-lar.
- **Control flow analysis** hər budağı ayrıca izləyir, sadəcə statik tip yoxlaması deyil.
- **Type predicate** (`x is T`) öz tip guard funksiyanızı yazmağa imkan verir — xüsusilə `filter` kimi metodlarda faydalıdır.
- **Discriminated union** — ortaq literal xüsusiyyət (məs. `kind`) union üzvlərini `switch`/`if` ilə təhlükəsiz ayırmağa imkan verir.
- **`never`** ilə exhaustiveness checking — union-a yeni üzv əlavə ediləndə unudulmuş halları compile-time-da tapır.

## Əlavə oxu

- Mənbə: [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- Əvvəlki hissə: **Hissə 2 — Əsas Tiplər** (`typescript-docs-part2.md`)
- Növbəti hissə: **Hissə 4 — Funksiyalar** (`typescript-docs-part4.md`)
