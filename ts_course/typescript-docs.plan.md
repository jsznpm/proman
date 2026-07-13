# TypeScript Kursu — Plan

**Başlıq:** Sıfırdan İrəli Səviyyəyə TypeScript
**Təsvir:** TypeScript-in rəsmi sənədləri (typescriptlang.org/docs) əsasında hazırlanmış tam kurs — dil əsaslarından tip manipulyasiyasına, siniflərə, modullara və layihə konfiqurasiyasına qədər.

**Mənbə:** https://www.typescriptlang.org/docs/ (rəsmi TypeScript Handbook və Reference bölmələri)

## Hissələr

1. **typescript-docs-part1.md** — Giriş və Quraşdırma
   - TypeScript nədir, JavaScript-dən fərqi, niyə lazımdır
   - Quraşdırma (`npm install -g typescript`), `tsc` ilə ilk kompilyasiya
   - Statik tip yoxlaması nə deməkdir, compile-time vs runtime
   - `tsconfig.json`-a ilk baxış (sadə nümunə)
   - Editor inteqrasiyası (VS Code) qısaca

2. **typescript-docs-part2.md** — Əsas Tiplər
   - `The Basics` və `Everyday Types`: `string`, `number`, `boolean`, `array`, `tuple`, `any`, `unknown`, `void`, `never`
   - Tip annotasiyaları vs tip inference
   - Object types, optional properties, union types, type aliases, interfaces (giriş səviyyəsində)
   - Literal types

3. **typescript-docs-part3.md** — Narrowing (Tip Daraltma)
   - `typeof`, `instanceof`, `in` operatorları ilə narrowing
   - Truthiness narrowing, equality narrowing
   - Discriminated unions
   - Control flow analysis, type predicates (`is`)

4. **typescript-docs-part4.md** — Funksiyalar
   - Funksiya tipləri, parametr/return tip annotasiyaları
   - Optional/default parametrlər, rest parametrlər
   - Function overloads
   - `this` parametri, generic funksiyalara giriş

5. **typescript-docs-part5.md** — Obyekt Tipləri
   - Object types dərindən, interface vs type alias
   - Optional properties, readonly properties
   - Index signatures
   - Extending types, intersection types
   - Generic object types-a giriş

6. **typescript-docs-part6.md** — Generiklər və Tip Operatorları
   - Generics: generic funksiyalar, generic siniflər, constraints
   - `keyof` operatoru
   - `typeof` operatoru (tip səviyyəsində)
   - Indexed access types

7. **typescript-docs-part7.md** — Şərti və Mapped Tiplər
   - Conditional types, `infer` açar sözü
   - Mapped types
   - Template literal types
   - Bunların generics ilə birgə praktiki istifadəsi

8. **typescript-docs-part8.md** — Siniflər (Classes)
   - Sinif üzvləri, `public`/`private`/`protected`
   - `readonly`, static üzvlər
   - Abstract siniflər, implements/extends
   - Generic siniflər, parameter properties

9. **typescript-docs-part9.md** — Modullar
   - ES modules əsasları TypeScript-də
   - Import/export sintaksisi, tip-only importlar
   - CommonJS vs ESM, module resolution qısaca
   - Namespaces (qısa tarixi kontekst)

10. **typescript-docs-part10.md** — Enum, Utility Types və Decorators
    - Enums (numeric, string, const enum)
    - Ən çox işlənən Utility Types: `Partial`, `Required`, `Pick`, `Omit`, `Record`, `Readonly` və s.
    - Decorators-a giriş (sinif, metod)
    - Declaration merging qısaca

11. **typescript-docs-part11.md** — Layihə Konfiqurasiyası (tsconfig)
    - `tsconfig.json` strukturu və vacib seçimlər (`strict`, `target`, `module`, `outDir` və s.)
    - `tsc` CLI seçimləri
    - Project references qısaca
    - Build alətləri ilə inteqrasiya (qısaca)

12. **typescript-docs-part12.md** — Praktiki Layihə və Yekun
    - Bütün mövzuları birləşdirən kiçik end-to-end layihə (məs. tip-təhlükəsiz kiçik CLI və ya data-model)
    - Tez-tez rast gəlinən səhvlər (common pitfalls) toplu icmalı
    - Kursun ümumi xülasəsi, əlavə oxu resursları

## Ardıcıllıq və Ön Şərtlər

- Hər hissə əvvəlkilərə əsaslanır: Part 1-2 mütləq əvvəl oxunmalıdır (əsas sintaksis).
- Part 3-5 gündəlik TypeScript yazarkən lazım olan bacarıqlardır.
- Part 6-7 "irəli səviyyə" tip sistemi mövzularıdır, Part 2 və Part 4-ü bilməyi tələb edir.
- Part 8-9 struktur (siniflər/modullar) mövzularıdır, istənilən vaxtdan sonra oxuna bilər, amma Part 5-dən sonra tövsiyə olunur.
- Part 10 referans xarakterlidir, ayrıca oxuna bilər.
- Part 11 konfiqurasiya mövzusudur, kodla bağlı deyil — istənilən vaxt oxuna bilər.
- Part 12 hamısını birləşdirir, ən sonda oxunmalıdır.

## Status

- [x] Part 1
- [x] Part 2
- [x] Part 3
- [x] Part 4
- [x] Part 5
- [x] Part 6
- [x] Part 7
- [x] Part 8
- [x] Part 9
- [x] Part 10
- [x] Part 11
- [x] Part 12
