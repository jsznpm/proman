# TypeScript Kursu — Hissə 1: Giriş və Quraşdırma

Bu, "Sıfırdan İrəli Səviyyəyə TypeScript" kursunun birinci hissəsidir. Kurs [TypeScript-in rəsmi sənədləri](https://www.typescriptlang.org/docs/) əsasında hazırlanıb və 12 hissədən ibarətdir. Bu hissə TypeScript-in nə olduğunu, niyə istifadə edildiyini və ilk `.ts` faylını necə kompilyasiya edəcəyini izah edir.

## Kimin üçündür

Bu kurs JavaScript əsaslarını bilən, amma TypeScript-ə heç toxunmamış proqramçılar üçündür. Əgər JavaScript-i hələ bilmirsinizsə, əvvəlcə JavaScript-in əsaslarını (dəyişənlər, funksiyalar, obyektlər, massivlər) öyrənməyiniz tövsiyə olunur — TypeScript JavaScript-in üzərinə qurulur, onu əvəz etmir.

## Ön şərtlər

- JavaScript-in əsas sintaksisi (funksiyalar, obyektlər, massivlər, `const`/`let`)
- Node.js və `npm`-in kompüterdə quraşdırılmış olması (terminal əmrləri üçün)

## Mündəricat

1. [TypeScript nədir](#typescript-nədir)
2. [Niyə TypeScript](#niyə-typescript)
3. [TypeScript və JavaScript əlaqəsi](#typescript-və-javascript-əlaqəsi)
4. [Quraşdırma](#quraşdırma)
5. [İlk kompilyasiya](#ilk-kompilyasiya)
6. [Tip annotasiyası və tip inference](#tip-annotasiyası-və-tip-inference)
7. [Tip silinməsi (type erasure)](#tip-silinməsi-type-erasure)
8. [Strictness parametrləri](#strictness-parametrləri)
9. [Praktika](#praktika)
10. [Xülasə](#xülasə)
11. [Əlavə oxu](#əlavə-oxu)

## TypeScript nədir

TypeScript — JavaScript proqramları üçün **statik tip yoxlayıcısıdır (static typechecker)**. Yəni kodunuz işə düşməzdən əvvəl (compile-time-da) TypeScript kodunuzu oxuyub tiplərin düzgün istifadə olunub-olunmadığını yoxlayır.

Məsələn, bu kodu görək:

```typescript
const message = "salam!";
message(); // Xəta: 'string' tipinin çağırış siqnaturu yoxdur
```

`message` bir mətn (string) olduğu üçün onu funksiya kimi çağırmaq mənasızdır. Adi JavaScript-də bu xəta yalnız kodu işə saldıqda (runtime-da) üzə çıxar. TypeScript isə bunu kodu yazan kimi, redaktorda belə görməyə imkan verir.

## Niyə TypeScript

JavaScript 20+ ildir ki, kiçik skriptlərdən böyük tətbiqlərə qədər inkişaf edib, amma dilin özü kod hissələri arasındakı əlaqələri (məsələn, "bu funksiya hansı tip qəbul edir") ifadə etmək üçün güclü vasitə təklif etmir. Bu, böyük layihələrdə idarəetməni çətinləşdirir.

Proqramlaşdırmada ən çox rast gəlinən səhvlərdən biri **tip səhvləridir** — bir tip gözlənilən yerdə başqa tipdən dəyər istifadə etmək. Bunun səbəbləri adətən:

- sadə yazı səhvləri (typo),
- API-nin necə işlədiyini yanlış anlamaq,
- runtime davranışı haqqında yanlış fərziyyələr.

TypeScript bu səhvləri runtime-a çatmazdan **əvvəl**, statik təhlil vasitəsilə tutur.

### TypeScript-in verdiyi əsas üstünlüklər

- **Statik tip yoxlaması** — səhvlər kod işə düşməzdən əvvəl aşkarlanır.
- **Daha yaxşı editor dəstəyi** — avtomatik tamamlama, refaktorinq, koda keçid (go-to-definition) daha dəqiq işləyir, çünki editor tipləri bilir.
- **Runtime-da partlamayan səhvlər** — yazı səhvləri və məntiq xətaları JavaScript-in icazə verdiyi yerdə tutulur.
- **Tip inference** — hər yerdə tip yazmaq məcburi deyil, TypeScript çox vaxt tipi özü müəyyən edir.

## TypeScript və JavaScript əlaqəsi

TypeScript JavaScript-in **üst çoxluğudur (superset)**:

- Mövcud JavaScript sintaksisinin üzərinə **statik tip annotasiyaları** əlavə edir.
- Yazdığınız `.ts` kodu son nəticədə sadə JavaScript-ə **kompilyasiya olunur**.
- TypeScript-dən səmərəli istifadə üçün JavaScript bilgisi tələb olunur.

Başqa sözlə: hər düzgün JavaScript kodu (əsasən) düzgün TypeScript kodudur da, sadəcə üzərinə tip məlumatı əlavə etmək imkanınız var.

Bu hissəni bitirdikdən sonra bacarmalı olduğunuz şeylər:

- Tez-tez rast gəlinən TypeScript sintaksisini oxuyub başa düşmək,
- Vacib compiler seçimlərinin təsirini izah etmək,
- Tip sisteminin əksər hallarda necə davranacağını əvvəlcədən söyləmək.

## Quraşdırma

TypeScript compiler-ini (`tsc`) qlobal quraşdırmaq üçün:

```bash
npm install -g typescript
```

Alternativ olaraq, qlobal quraşdırmadan, layihənin öz `node_modules`-u daxilində `npx` ilə işlətmək olar:

```bash
npx tsc --version
```

> **Niyə önəmlidir:** Böyük komandalarda hər developerin eyni TypeScript versiyasını işlətməsi vacibdir. Ona görə real layihələrdə `tsc`-ni qlobal deyil, layihənin `package.json`-unda `devDependency` kimi saxlamaq daha çox tövsiyə olunur (`npm install --save-dev typescript`), sonra `npx tsc` ilə çağırmaq.

## İlk kompilyasiya

`hello.ts` adlı fayl yaradaq:

```typescript
function greet(person: string, date: Date) {
  console.log(`Salam ${person}, bu gün ${date.toDateString()}dir!`);
}

greet("Aygün", new Date());
```

Diqqət edin: `person: string` və `date: Date` — bunlar **tip annotasiyalarıdır**. Onlar parametrin hansı tipdə olmalı olduğunu açıq şəkildə bildirir.

Bunu kompilyasiya etmək üçün:

```bash
tsc hello.ts
```

Bu əmr eyni qovluqda `hello.js` faylı yaradır — TypeScript-in JavaScript-ə çevrilmiş, brauzerdə və ya Node.js-də işə düşə bilən versiyası.

### TypeScript necə xəta tutur

```typescript
const user = { name: "Daniyar", age: 26 };
user.location; // Xəta: Property 'location' does not exist on type...
```

```typescript
const announcement = "Salam Dünya!";
announcement.toLocaleLowerCase();  // Düzgün
announcement.toLocalwLowerCase();  // Xəta: belə metod yoxdur (yazı səhvi)
```

Hər iki halda TypeScript kodu işə salmadan, sadəcə statik təhlillə səhvi tapır.

## Tip annotasiyası və tip inference

İki yol var: **annotasiya** (özünüz yazırsınız) və **inference** (TypeScript özü tapır).

```typescript
// Aydın annotasiya
let myName: string = "Aygün";

// Inference — TypeScript "string" olduğunu özü anlayır
let myName2 = "Aygün";
```

> **Qayda:** TypeScript tipi özü düzgün müəyyən edə bildiyi yerdə, annotasiya yazmağa **ehtiyac yoxdur**. Artıq annotasiyalar kodu qarışdırır, oxumağı çətinləşdirir. Annotasiyanı yalnız TypeScript-in tipi tapa bilmədiyi (məsələn, funksiya parametrləri) və ya niyyətinizi aydın bildirmək istədiyiniz yerlərdə yazın.

## Tip silinməsi (type erasure)

Vacib fakt: tip annotasiyaları **kompilyasiya zamanı tamamilə silinir**. Onlar runtime davranışına heç bir təsir etmir.

Giriş (`hello.ts`):
```typescript
function greet(person: string, date: Date) {
  console.log(`Salam ${person}, bu gün ${date.toDateString()}dir!`);
}
```

Çıxış (`hello.js`):
```javascript
function greet(person, date) {
  console.log(`Salam ${person}, bu gün ${date.toDateString()}dir!`);
}
```

Tip annotasiyaları yox oldu — çünki onlar yalnız **compile-time**-da mövcuddur, brauzer və ya Node.js runtime-ında TypeScript tipləri haqqında heç nə bilmir.

### Downleveling (köhnə JavaScript-ə çevirmə)

TypeScript müasir JavaScript-i köhnə versiyalara da çevirə bilir:

```bash
tsc --target es2015 hello.ts
```

Standart olaraq TypeScript çox köhnə `ES5` hədəf alır; müasir mühitlərdə işləyirsinizsə, `--target` ilə daha yeni versiya seçmək tövsiyə olunur.

## Strictness parametrləri

TypeScript neçə "sərtlik" səviyyəsi təklif edir — nə qədər yoxlama aparılacağını siz seçirsiniz.

### `noImplicitAny`

Tipi müəyyən edilə bilməyən yerlərdə örtülü şəkildə `any` (istənilən tip) istifadəsinin qarşısını alır:

```bash
tsc --noImplicitAny
```

### `strictNullChecks`

`null` və `undefined`-i açıq idarə etməyi məcburi edir:

```typescript
// strictNullChecks olmadan: icazəlidir
const x: string = null;

// strictNullChecks ilə: xəta
const x: string = null; // Xəta
```

### Bütün strict yoxlamaları

```bash
tsc --strict
```

və ya `tsconfig.json`-da:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

> **Tövsiyə:** Yeni layihələrdə həmişə `"strict": true` ilə başlayın. Bu, TypeScript-in bütün faydalarından tam istifadə etməyə imkan verir. `tsconfig.json`-un detallarını Hissə 11-də dərindən öyrənəcəyik.

### Xəta olsa belə çıxış faylı yaratmaq

Standart olaraq TypeScript, tip xətaları olsa belə, JavaScript çıxışı yaradır — çünki bəzən siz compiler-dən daha yaxşı bilirsiniz (məsələn, JavaScript-dən TypeScript-ə keçid zamanı). Bunu qadağan etmək üçün:

```bash
tsc --noEmitOnError hello.ts
```

## Praktika

Aşağıdakı tapşırığı yerinə yetirin:

1. `greet.ts` adlı fayl yaradın.
2. İçində `sayHello(name: string, times: number)` adlı funksiya yazın — bu funksiya `name`-i `times` dəfə konsola çap etsin.
3. Funksiyanı bir dəfə düzgün arqumentlərlə (`sayHello("Nərmin", 3)`), bir dəfə də səhv tiplə (`sayHello("Nərmin", "üç")`) çağırın və `tsc greet.ts` işlədərək TypeScript-in ikinci çağırışda xəta verdiyini müşahidə edin.
4. `tsc --strict greet.ts` ilə də yoxlayın — fərq varmı?

Bu tapşırıq sizə annotasiya, inference və compiler-in xəta bildirmə mexanizmini əl ilə hiss etdirəcək.

## Xülasə

- TypeScript JavaScript-in **statik tip yoxlayıcısı olan üst çoxluğudur** — kompilyasiya zamanı JavaScript-ə çevrilir.
- Məqsədi — tip səhvlərini runtime-dan **əvvəl** tutmaq və editor dəstəyini yaxşılaşdırmaq.
- Tip annotasiyaları **runtime-a təsir etmir** — kompilyasiya zamanı tamamilə silinir.
- TypeScript çox vaxt tipi özü **inference** ilə tapır, hər yerdə annotasiya yazmaq lazım deyil.
- `--strict` seçimi (və `strictNullChecks`, `noImplicitAny` kimi alt seçimlər) TypeScript-in tam gücündən istifadə etməyə imkan verir.

## Əlavə oxu

- Mənbə: [The TypeScript Handbook — Giriş](https://www.typescriptlang.org/docs/handbook/intro.html)
- Mənbə: [The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- Növbəti hissə: **Hissə 2 — Əsas Tiplər** (`typescript-docs-part2.md`)
