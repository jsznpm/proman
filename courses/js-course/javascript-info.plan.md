# JavaScript.info Kursu — Plan

**Başlıq:** Sıfırdan Peşəkar Səviyyəyə: Müasir JavaScript Kursu

**Təsvir:** Bu kurs [javascript.info](https://javascript.info/) saytındakı "The Modern JavaScript Tutorial" materialına əsaslanır və JavaScript dilini sıfırdan öyrənmək istəyən, sonra brauzer mühitində (DOM, Events, şəbəkə sorğuları, saxlama) işləməyi bacarmaq istəyən hər kəs üçün nəzərdə tutulub.

**Mənbə:** https://javascript.info/

## Hissələr

1. **`javascript-info-part1.md`** — JavaScript-ə Giriş və Əsaslar
   - Giriş: JavaScript nədir, brauzerdə necə işləyir, developer console
   - Dəyişənlər (`let`, `const`, `var`), məlumat növləri (`number`, `string`, `boolean`, `null`, `undefined`, `object`, `symbol`, `bigint`)
   - Tip çevrilməsi (type conversion), operatorlar (arifmetik, müqayisə, məntiqi, nullish coalescing)
   - Şərti operatorlar (`if`, `switch`), dövrlər (`while`, `for`)
   - Funksiyalar: elan, funksiya ifadələri, arrow function-lar

2. **`javascript-info-part2.md`** — Kod Keyfiyyəti və Obyektlər
   - Kod keyfiyyəti: debugging, kod stilləri, şərhlər, ninja kodu
   - Obyektlərin əsasları: yaratma, xüsusiyyətlərə giriş, referans ilə köçürmə
   - Obyekt metodları, `this`, konstruktor funksiyalar, optional chaining (`?.`)
   - Data növləri: string-lər, array-lər, map/set/weakmap/weakset, JSON

3. **`javascript-info-part3.md`** — Funksiyalar, Prototiplər və Class-lar
   - İrəli funksiya mövzuları: rekursiya, rest/spread, closure, `this` bağlanması
   - Function object, NFE, "new Function" sintaksisi, scheduling (`setTimeout`/`setInterval`)
   - Obyekt xüsusiyyətlərinin konfiqurasiyası (property flags, getter/setter)
   - Prototiplər və varislik, class sintaksisi, varislik, private/protected üzvlər, statik metodlar

4. **`javascript-info-part4.md`** — Xətaların İdarə Olunması və Asinxron JavaScript
   - Xəta idarəetməsi: `try...catch`, öz xəta class-larımız
   - Promise, async/await, callback-lər
   - Generatorlar və iterasiya, async iterator/generator
   - Modullar: `import`/`export`, dinamik importlar

5. **`javascript-info-part5.md`** — Brauzer: Sənəd (DOM) və Events
   - DOM ağacı, node-lara giriş, DOM-un dəyişdirilməsi, stillər və siniflər
   - Events: giriş, bubbling/capturing, event delegation, brauzer default hərəkətləri
   - UI Events: siçan, klaviatura hərəkətləri
   - Formalar və idarəetmə elementləri: fokus, forma göndərilməsi

6. **`javascript-info-part6.md`** — Brauzer API-ları və Əlavə Mövzular
   - Şəbəkə sorğuları: `fetch`, `XMLHttpRequest`
   - Brauzerdə məlumat saxlama: `localStorage`, `sessionStorage`, `cookie`, `IndexedDB` (qısa)
   - Animasiya: CSS animasiya və `requestAnimationFrame`
   - Web Components-ə giriş
   - Regular Expressions-ə giriş (əsas sintaksis və istifadə halları)

**İrəliləyiş qaydası:** Part 1 heç bir ön bilik tələb etmir. Hər sonrakı hissə əvvəlki hissələrdə öyrədilmiş terminləri təkrar izah etmədən istifadə edir, lazım gəldikdə əvvəlki hissəyə keçid verir (məs. "Part 1-də öyrəndiyimiz kimi"). Part 1–4 dilin özünə (JS core), Part 5–6 brauzer mühitinə həsr olunub.

## Status
- [x] Part 1
- [x] Part 2
- [x] Part 3
- [x] Part 4
- [x] Part 5
- [x] Part 6
