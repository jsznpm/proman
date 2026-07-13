# TypeScript Kursu — Hissə 2: Əsas Tiplər

Bu, 12 hissəlik "Sıfırdan İrəli Səviyyəyə TypeScript" kursunun ikinci hissəsidir (plan: `typescript-docs.plan.md`). Əvvəlki hissədə (`typescript-docs-part1.md`) TypeScript-in nə olduğunu, quraşdırılmasını və tip annotasiyası/inference anlayışlarını öyrəndik. Bu hissədə TypeScript-in gündəlik istifadədə ən çox rast gəlinən tiplərini öyrənəcəyik.

## Ön şərtlər

- Hissə 1-i bilmək (tip annotasiyası, inference, `tsc` ilə iş)

## Mündəricat

1. [Primitiv tiplər: string, number, boolean](#primitiv-tiplər)
2. [Massivlər (Arrays)](#massivlər)
3. [any tipi](#any-tipi)
4. [Funksiyalarda parametr və qaytarma tipləri](#funksiyalarda-parametr-və-qaytarma-tipləri)
5. [Obyekt tipləri](#obyekt-tipləri)
6. [Union tipləri](#union-tipləri)
7. [Type alias və interface](#type-alias-və-interface)
8. [Tip assertion](#tip-assertion)
9. [Literal tiplər](#literal-tiplər)
10. [null və undefined](#null-və-undefined)
11. [Az rast gəlinən primitivlər: bigint, symbol](#az-rast-gəlinən-primitivlər)
12. [Praktika](#praktika)
13. [Xülasə](#xülasə)

## Primitiv tiplər

TypeScript-in üç əsas primitiv tipi JavaScript-in `typeof` operatorunun qaytardığı dəyərlərə uyğundur:

- **`string`** — mətn dəyərləri: `"Salam dünya"`
- **`number`** — bütün ədədi dəyərlər (tam və kəsr): `42`, `3.14`
- **`boolean`** — `true` və ya `false`

```typescript
let ad: string = "Aygün";
let yas: number = 27;
let aktivdir: boolean = true;
```

> **Diqqət:** həmişə kiçik hərflə yazın — `string`, `number`, `boolean`. `String`, `Number`, `Boolean` (böyük hərflə) fərqli, xüsusi built-in tiplərdir və adətən istifadə edilməməlidir.

## Massivlər

Massiv tipini iki yolla yazmaq olar:

```typescript
let ededler: number[] = [1, 2, 3];
let sozler: Array<string> = ["a", "b"];
```

`[number]` isə fərqlidir — bu, **tuple** tipdir (sabit uzunluqlu, hər mövqedə fərqli tip ola bilən massiv). Tuple-lar Hissə 5-də obyekt tiplərinin davamında detallı işlənir.

## any tipi

`any` tipi həmin dəyər üçün **bütün tip yoxlamasını söndürür**:

```typescript
let obj: any = { x: 0 };
obj.foo();        // OK — heç bir yoxlama yoxdur
obj = "salam";     // OK
const n: number = obj;  // OK, TypeScript etiraz etmir
```

`any` faydalıdır (məsələn, JavaScript-dən tədricən keçiddə), amma sui-istifadəsi TypeScript-in bütün üstünlüklərini itirir. `noImplicitAny` compiler seçimi TypeScript-in tipi tapa bilmədiyi yerlərdə örtülü şəkildə `any` seçilməsinin qarşısını alır və sizi açıq annotasiya yazmağa məcbur edir.

## Funksiyalarda parametr və qaytarma tipləri

### Parametr tipi annotasiyası

```typescript
function salamla(ad: string) {
  console.log("Salam, " + ad.toUpperCase() + "!!");
}

salamla(42); // Xəta: 'number' tipi 'string' parametrinə uyğun deyil
```

### Qaytarma tipi annotasiyası

```typescript
function sevimliEded(): number {
  return 26;
}

async function sevimliEdedAsync(): Promise<number> {
  return 26;
}
```

### Anonim funksiyalar (kontekstual tiplənmə)

Massiv metodlarına ötürülən callback funksiyalarda TypeScript parametr tipini **kontekstdən** özü çıxarır:

```typescript
const adlar = ["Aygün", "Nərmin", "Elvin"];
adlar.forEach((ad) => {
  console.log(ad.toUpperCase()); // 'ad' avtomatik 'string' kimi qəbul olunur
});
```

## Obyekt tipləri

Obyekt tipini `{ prop: tip; prop2: tip2 }` formasında yaza bilərsiniz:

```typescript
function koordinatÇap(pt: { x: number; y: number }) {
  console.log("x dəyəri: " + pt.x);
  console.log("y dəyəri: " + pt.y);
}

koordinatÇap({ x: 3, y: 7 });
```

### Optional (könüllü) xüsusiyyətlər

Xüsusiyyət adının sonuna `?` əlavə etsəniz, o, könüllü olur:

```typescript
function adÇap(obj: { ad: string; soyad?: string }) {
  if (obj.soyad !== undefined) {
    console.log(obj.soyad.toUpperCase());
  }
  console.log(obj.soyad?.toUpperCase()); // Optional chaining ilə daha qısa
}
```

`soyad?.toUpperCase()` — `soyad` `undefined` olsa, ifadə xəta vermədən `undefined` qaytarır (optional chaining).

## Union tipləri

`|` operatoru ilə bir neçə tipi birləşdirmək olar:

```typescript
function idÇap(id: number | string) {
  console.log("ID: " + id);
}

idÇap(101);      // OK
idÇap("202");    // OK
idÇap({ id: 1 }); // Xəta
```

### Union tiplərlə işləmək — narrowing

```typescript
function idÇap(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // burada id 'string'dir
  } else {
    console.log(id); // burada id 'number'dir
  }
}
```

```typescript
function salamla(x: string[] | string) {
  if (Array.isArray(x)) {
    console.log("Salam, " + x.join(" və "));  // x burada string[]
  } else {
    console.log("Xoş gəldin, tənha səyahətçi " + x); // x burada string
  }
}
```

Bu texnikaya **narrowing (tip daraltma)** deyilir və Hissə 3 tamamilə buna həsr olunub.

> **Ümumi xüsusiyyət qaydası:** əgər union-un bütün üzvlərində ortaq metod/xüsusiyyət varsa, `if` yazmadan da istifadə edə bilərsiniz:
> ```typescript
> function ilkÜçÜ(x: number[] | string) {
>   return x.slice(0, 3); // həm number[], həm string-də 'slice' var
> }
> ```

## Type alias və interface

### Type alias

```typescript
type Nöqtə = {
  x: number;
  y: number;
};

function koordinatÇap(pt: Nöqtə) {
  console.log("x: " + pt.x);
}

type ID = number | string;
```

Alias sadəcə **addır** — yeni, ayrıca tip yaratmır, mövcud tipə ləqəb qoyur.

### Interface

```typescript
interface Nöqtə {
  x: number;
  y: number;
}

function koordinatÇap(pt: Nöqtə) {
  console.log("x: " + pt.x);
}
```

### Fərq nədir?

| Xüsusiyyət | interface | type |
|---|---|---|
| Genişləndirmə | `extends` | `&` (intersection) |
| Sonradan sahə əlavə etmək | eyni adla yenidən elan etmək olar | mümkün deyil, yenidən açmaq olmur |
| Xəta mesajlarında görünüş | həmişə ad göstərir | bəzən alias yerinə açılmış tip göstərir |
| Performans | `extends` ilə daha sürətli | intersection-larla daha yavaş ola bilər |

> **Praktiki tövsiyə:** ehtiyac yaranana qədər `interface` istifadə edin. Yalnız `type`-a məxsus imkanlar (union, tuple, mapped types və s.) lazım olanda `type`-a keçin. Bu iki alət arasında seçim Hissə 5-də daha ətraflı müzakirə olunur.

## Tip assertion

Bəzən siz TypeScript-dən daha çox bilirsiniz — məsələn, bir DOM elementinin konkret hansı tipdə olduğunu:

```typescript
const canvas = document.getElementById("əsas_canvas") as HTMLCanvasElement;
// və ya bucaq mötərizə sintaksisi:
const canvas2 = <HTMLCanvasElement>document.getElementById("əsas_canvas");
```

> **Xəbərdarlıq:** tip assertion heç bir runtime yoxlaması etmirsiniz — sadəcə compiler-ə "mənə inan" deyirsiniz. Səhv assertion runtime xətasına səbəb ola bilər. Tamamilə əlaqəsiz tiplər arasında məcburi çevirmə lazım olsa, ikiqat assertion edilir: `const a = expr as any as T;` — amma bu, çox nadir hallarda, ehtiyatla istifadə olunmalıdır.

## Literal tiplər

Konkret dəyərləri tip kimi istifadə etmək olar:

```typescript
let x: "salam" = "salam";
x = "necəsən"; // Xəta — yalnız "salam" icazəlidir

function mətnÇap(s: string, düzləmə: "left" | "right" | "center") {
  // ...
}
```

### Literal inference və `as const`

Adi dəyişənlərdə TypeScript ümumi tipi çıxarır, amma `as const` ilə obyekt literal dəyərlərini dəyişməz (literal) saxlamaq olar:

```typescript
const req = { url: "https://example.com", method: "GET" } as const;
// 'method' indi 'string' yox, konkret "GET" literal tipindədir
```

Bu, xüsusilə konfiqurasiya obyektlərində və ya union-based API-larda faydalıdır.

## null və undefined

`strictNullChecks` aktiv olduqda (tövsiyə olunan rejim):

```typescript
function nəSə(x: string | null) {
  if (x === null) {
    // heç nə etmə
  } else {
    console.log("Salam, " + x.toUpperCase());
  }
}
```

### Non-null assertion operatoru (`!`)

```typescript
function riskliYaşa(x?: number | null) {
  console.log(x!.toFixed()); // "x-in null/undefined olmadığını təsdiq edirəm"
}
```

> **Xəbərdarlıq:** `!` operatoru да runtime yoxlaması etmir — səhv istifadə edilsə, `undefined`-in metodunu çağırmaq kimi runtime xətasına yol aça bilər. Yalnız həqiqətən əmin olduğunuz yerdə istifadə edin.

## Az rast gəlinən primitivlər

### bigint

Çox böyük tam ədədlər üçün:

```typescript
const yüzBigint: bigint = BigInt(100);
const başqaYüz: bigint = 100n;
```

### symbol

Hər zaman unikal dəyər yaratmaq üçün:

```typescript
const ad1 = Symbol("ad");
const ad2 = Symbol("ad");
// ad1 !== ad2 — eyni təsvirlə yaransalar belə, həmişə fərqlidirlər
```

## Praktika

`typescript-docs-part1.md`-də yazdığınız `greet.ts` faylını əsas alaraq:

1. `İstifadəçi` adlı `type` yaradın: `{ ad: string; yaş: number; email?: string }`.
2. Bu tipi qəbul edən `istifadəçiTəsviri(user: İstifadəçi): string` funksiyası yazın — funksiya `email` varsa onu da daxil edən, yoxdursa etməyən mətn qaytarsın (optional chaining istifadə edin).
3. `id: number | string` qəbul edən bir funksiya yazın, içində `typeof` ilə narrowing edərək hər iki halı ayrıca işləyin.
4. Bir sabit yaradın: `const status = { code: 200, label: "OK" } as const;` və `status.label`-in tipinin nə olduğunu (hover ilə, VS Code-da) yoxlayın.

## Xülasə

- Primitiv tiplər: `string`, `number`, `boolean` (kiçik hərflə).
- Massivlər `Type[]` və ya `Array<Type>`, `any` bütün yoxlamanı söndürür.
- Obyekt tipləri `{ prop: tip }` formasında yazılır, `?` ilə optional edilir.
- `|` ilə union tipi yaradılır, narrowing ilə union-un konkret üzvünə görə işlənir (Hissə 3-də davamı var).
- `type` və `interface` obyekt formasını adlandırmaq üçün iki üsuldur — fərqi ehtiyacınıza görə seçin.
- `as` tip assertion, `!` non-null assertion — ikisi də yalnız compile-time-dadır, runtime yoxlaması yoxdur.
- Literal tiplər və `as const` konkret dəyərləri tip səviyyəsində saxlamağa imkan verir.

## Əlavə oxu

- Mənbə: [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- Mənbə: [The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- Əvvəlki hissə: **Hissə 1 — Giriş və Quraşdırma** (`typescript-docs-part1.md`)
- Növbəti hissə: **Hissə 3 — Narrowing** (`typescript-docs-part3.md`)
