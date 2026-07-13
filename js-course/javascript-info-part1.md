# JavaScript.info Kursu — Hissə 1: JavaScript-ə Giriş və Əsaslar

Bu, [javascript.info](https://javascript.info/) saytındaki "The Modern JavaScript Tutorial" materialına əsaslanan 6 hissəlik kursun birinci hissəsidir. Plan faylı: `javascript-info.plan.md`.

## Kimlər üçündür?

Bu hissə heç bir proqramlaşdırma biliyi tələb etmir. JavaScript-i sıfırdan öyrənmək istəyən hər kəs üçündür. Yalnız kompüterdə brauzer açmaq bacarığı kifayətdir.

## Ön şərtlər

Yoxdur — bu, kursun ilk hissəsidir.

## Məzmun

1. [JavaScript nədir?](#javascript-nədir)
2. [Developer Console](#developer-console)
3. [Dəyişənlər](#dəyişənlər)
4. [Məlumat növləri](#məlumat-növləri)
5. [Tip çevrilməsi](#tip-çevrilməsi)
6. [Operatorlar](#operatorlar)
7. [Müqayisələr](#müqayisələr)
8. [Şərti operatorlar: if, switch](#şərti-operatorlar-if-switch)
9. [Məntiqi operatorlar](#məntiqi-operatorlar)
10. [Nullish coalescing operatoru `??`](#nullish-coalescing-operatoru-)
11. [Dövrlər: while və for](#dövrlər-while-və-for)
12. [Funksiyalar](#funksiyalar)
13. [Funksiya ifadələri və Arrow function-lar](#funksiya-ifadələri-və-arrow-function-lar)
14. [Praktika](#praktika)
15. [Xülasə](#xülasə)
16. [Əlavə oxu](#əlavə-oxu)

---

## JavaScript nədir?

JavaScript — veb səhifələrə "həyat" verən proqramlaşdırma dilidir. HTML səhifənin skeletidir, CSS onun görünüşüdür, JavaScript isə davranışıdır: düymələrə klik, formaların doğrulanması, animasiyalar, serverdən məlumat çəkmə və s.

JavaScript brauzerdə `<script>` teqi daxilində və ya ayrıca `.js` faylında işləyir. Bundan başqa, Node.js sayəsində serverdə, mobil tətbiqlərdə (React Native) və hətta desktop proqramlarda (Electron) da istifadə olunur — amma bu kurs əsasən dilin özünə və brauzer mühitinə fokuslanır.

Kod nümunəsi, birbaşa HTML səhifəsində:

```html
<!DOCTYPE html>
<html>
<body>
  <script>
    alert('Salam, JavaScript!');
  </script>
</body>
</html>
```

`alert()` funksiyası brauzerdə mesaj pəncərəsi açır. Bu, JavaScript-in ən sadə "çıxış" üsuludur.

**Niyə vacibdir:** JavaScript brauzerin daxili "mühərriki" (V8, SpiderMonkey və s.) tərəfindən icra olunur, kompilyasiya isə "just-in-time" (JIT) üsulu ilə aparılır — yəni kod işə düşərkən sürətli maşın koduna çevrilir.

## Developer Console

Kod yazıb sınamaq üçün brauzerin developer console-undan istifadə olunur. Chrome/Edge-də `F12` və ya `Ctrl+Shift+J` düymələri ilə açılır. Console tab-ına keçib birbaşa JS kodu yazıb Enter basmaqla nəticəni görmək mümkündür.

```js
1 + 2  // Enter basdıqda: 3
```

**Ümumi səhv:** Yeni başlayanlar çox vaxt console-u unudub, kodu yalnız fayl daxilində yazıb nəticəni görə bilmirlər. Console ilə tanış olmaq debugging bacarığının təməlidir.

## Dəyişənlər

Dəyişən — məlumatı yaddaşda saxlamaq üçün "qutu"dur. Müasir JavaScript-də dəyişən elan etmək üçün 3 açar söz var: `let`, `const`, `var`.

```js
let message;
message = 'Salam';
console.log(message); // Salam

const userName = 'Elvin'; // dəyişməz — sonradan yenidən mənimsədilə bilməz
```

- **`let`** — müasir standart. Dəyişən sonradan yenidən mənimsədilə bilər.
- **`const`** — dəyişən bir dəfə mənimsədilir və dəyişdirilə bilməz (əgər obyektdirsə, obyektin daxili xüsusiyyətləri dəyişə bilər, amma referans dəyişməz).
- **`var`** — köhnə üsul, funksiya-səviyyəli "scope"a malikdir (bloklara hörmət etmir). Müasir kodda **istifadə edilmir**, tarixi səbəblərə görə hələ də mövcuddur.

```js
const user = { name: 'Aygün' };
user.name = 'Nərgiz'; // OK — obyektin daxili xüsusiyyəti dəyişir
// user = {} // Xəta! const yenidən mənimsədilə bilməz
```

Dəyişən adları hərflə və ya `$`, `_` ilə başlamalıdır, rəqəmlə başlaya bilməz. JavaScript "camelCase" konvensiyasını istifadə edir: `userName`, `firstName`.

**Ümumi səhv:** `let` və `const` arasında seçim edərkən defolt olaraq `const` istifadə edin, dəyişəni sonradan dəyişdirməyə ehtiyac olduqda `let`-ə keçin. Bu, təsadüfi dəyişikliklərin qarşısını alır.

## Məlumat növləri

JavaScript-də 8 əsas məlumat növü var:

1. **`number`** — həm tam, həm kəsr ədədlər: `let n = 123;`, `let f = 1.5;`. Xüsusi ədədi dəyərlər: `Infinity`, `-Infinity`, `NaN` (səhv nəticə).
2. **`bigint`** — `number`-in tuta bilmədiyi çox böyük ədədlər üçün: `const big = 1234567890123456789012345678901234567890n;`
3. **`string`** — mətn: `let str = "Salam";`, `let str2 = 'tək dırnaq';`, `let phrase = \`backtick\`;`. Backtick (template literal) dəyişən daxil etməyə imkan verir: `` `Salam, ${userName}!` ``
4. **`boolean`** — `true` və ya `false`.
5. **`null`** — "heç nə", "boş", "naməlum dəyər" — özəl bir dəyər, obyekt kimi davranır amma əslində müstəqil növdür.
6. **`undefined`** — "dəyər mənimsədilməyib" mənasını verir. Elan olunmuş amma dəyər verilməmiş dəyişənin defolt dəyəridir.
7. **`object`** — mürəkkəb məlumat strukturları üçün (aşağıda Hissə 2-də ətraflı).
8. **`symbol`** — unikal identifikatorlar yaratmaq üçün.

`typeof` operatoru dəyişənin növünü yoxlamaq üçün istifadə olunur:

```js
typeof 123        // "number"
typeof "salam"     // "string"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof null        // "object" (tarixi JS "bug"ı — amma dəyişməz qalıb)
typeof {}          // "object"
typeof Symbol()     // "symbol"
```

**Niyə vacibdir:** JavaScript "dinamik tipli" dildir — dəyişən növü kompilyasiya zamanı deyil, icra zamanı müəyyən olunur, hətta icra zamanı dəyişə bilər:

```js
let x = 5;
x = "indi mən string-əm";
```

## Tip çevrilməsi

Funksiyalar və operatorlar avtomatik olaraq dəyərləri lazımi növə çevirir.

**String çevrilməsi** — nə vaxt lazım olur, `String(value)`:

```js
let value = true;
String(value); // "true"
```

**Rəqəm çevrilməsi** — riyazi funksiyalarda, `Number(value)`:

```js
Number("123");   // 123
Number("123z");  // NaN (çevrilə bilmir)
Number(true);    // 1
Number(false);   // 0
Number(null);    // 0
Number(undefined); // NaN
```

**Boolean çevrilməsi** — `Boolean(value)`. "Falsy" dəyərlər: `0`, `""`, `null`, `undefined`, `NaN`. Qalan hər şey — o cümlədən `"0"` string-i və boş massiv `[]` — **truthy**dir.

```js
Boolean(0);      // false
Boolean("0");    // true! (boş olmayan string)
Boolean(" ");    // true! (boşluqlu string də truthy-dir)
```

**Ümumi səhv:** `"0"` string-inin `Boolean` ilə `true` olması yeni başlayanları çox vaxt çaşdırır — çünki string boşdur deyil, sadəcə "0" simvolundan ibarətdir və boş string deyil.

## Operatorlar

Arifmetik operatorlar: `+`, `-`, `*`, `/`, `%` (qalıq), `**` (qüvvət).

```js
5 % 2   // 1
2 ** 3  // 8
```

`+` operatoru string-lərlə işlədikdə **birləşdirmə** aparır:

```js
'1' + 2       // "12" (rəqəm string-ə çevrilir)
2 + 2 + '1'   // "41" (əvvəl 2+2=4, sonra '4'+'1'='41')
'1' + 2 + 2   // "122" (soldan sağa: '1'+2='12', '12'+2='122')
```

Mənimsətmə operatorları: `+=`, `-=`, `*=`, `/=`. Artırma/azaltma: `++`, `--` (prefiks vs postfiks fərqi var).

```js
let counter = 1;
let a = counter++; // a = 1, counter indi 2 (əvvəl istifadə, sonra artır)
let b = ++counter; // counter = 3, b = 3 (əvvəl artır, sonra istifadə)
```

## Müqayisələr

`>`, `<`, `>=`, `<=`, `==` (dəyəri müqayisə edir, tip çevirir), `===` (tip **və** dəyəri müqayisə edir, çevirmə etmir), `!=`, `!==`.

```js
0 == false   // true (çevrilir)
0 === false  // false (fərqli tiplər)
null == undefined  // true (özəl qayda)
null === undefined // false
```

**Qayda:** Praktikada demək olar həmişə `===` və `!==` istifadə edin — gizli tip çevrilməsindən yaranan səhvlərin qarşısını alır.

## Şərti operatorlar: if, switch

```js
let hour = 14;

if (hour < 12) {
  console.log('Sabahınız xeyir');
} else if (hour < 18) {
  console.log('Günortanız xeyir');
} else {
  console.log('Axşamınız xeyir');
}
```

Qısa şərti ifadə — ternar operator `? :`:

```js
let access = (age > 18) ? 'icazə var' : 'icazə yoxdur';
```

`switch` çoxlu bərabərlik yoxlamaları üçün:

```js
switch (hour) {
  case 9:
    console.log('İş başlayır');
    break;
  case 18:
    console.log('İş bitir');
    break;
  default:
    console.log('Adi saat');
}
```

**Ümumi səhv:** `switch` bloklarında `break` unudulduqda, icra növbəti `case`-ə "sızır" (fall-through). Bu, çox vaxt istənilməyən davranışa səbəb olur.

## Məntiqi operatorlar

`||` (OR), `&&` (AND), `!` (NOT).

```js
true || false   // true
true && false   // false
!true           // false
```

`||` və `&&` yalnız `boolean` ilə işləmir — **ilk uyğun dəyəri qaytarır** (short-circuit):

```js
let name = userName || 'Qonaq'; // userName boşdursa, 'Qonaq' istifadə olunur
```

## Nullish coalescing operatoru `??`

`??` yalnız dəyər `null` və ya `undefined` olduqda defolt dəyər seçir — `||`-dən fərqli olaraq `0` və `""` kimi "falsy amma keçərli" dəyərləri əvəz etmir.

```js
let count = 0;
let result1 = count || 5;  // 5 (0 falsy-dir, səhv nəticə!)
let result2 = count ?? 5;  // 0 (0, null/undefined deyil, düzgün nəticə)
```

**Niyə vacibdir:** İstifadəçi girişində `0` kimi keçərli dəyərləri defolt dəyərlə səhv əvəz etməmək üçün `??` istifadə etmək daha etibarlıdır.

## Dövrlər: while və for

```js
let i = 0;
while (i < 3) {
  console.log(i);
  i++;
}
// 0, 1, 2

for (let i = 0; i < 3; i++) {
  console.log(i);
}
// 0, 1, 2
```

`do...while` — bədəni ən azı bir dəfə icra edir:

```js
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 3);
```

`break` dövrü dayandırır, `continue` cari iterasiyanı ötüb keçir.

```js
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) continue; // cüt ədədləri ötür
  console.log(i); // 1, 3, 5, 7, 9
}
```

## Funksiyalar

Funksiya — təkrar istifadə oluna bilən kod bloku.

```js
function showMessage(from, text = 'mətn yoxdur') {
  console.log(from + ': ' + text);
}

showMessage('Ana'); // Ana: mətn yoxdur
showMessage('Ana', 'Salam!'); // Ana: Salam!
```

`text = 'mətn yoxdur'` — defolt parametr dəyəridir, arqument verilmədikdə istifadə olunur.

`return` operatoru ilə funksiya dəyər qaytara bilər:

```js
function sum(a, b) {
  return a + b;
}
let result = sum(1, 2); // 3
```

**Ümumi səhv:** `return`-dən sonra yeni sətirdə dəyər yazmaq işləməyəcək — JavaScript avtomatik nöqtəli vergül əlavə edir:

```js
function badSum(a, b) {
  return
    a + b; // BU KOD İŞLƏMİR — return undefined qaytarır
}
```

## Funksiya ifadələri və Arrow function-lar

Funksiyaları dəyişənə mənimsətmək olar (Function Expression):

```js
let sum = function(a, b) {
  return a + b;
};
```

Arrow function — daha qısa sintaksis:

```js
let sum = (a, b) => a + b; // bir sətirlik bədən avtomatik return edir

let hello = () => console.log('Salam!'); // arqument yoxdursa boş mötərizə

let multiLine = (a, b) => {
  let result = a + b;
  return result; // çoxsətirli bədəndə return açıq yazılmalıdır
};
```

**Niyə vacibdir:** Arrow function-ların öz `this` dəyəri yoxdur — əhatə edən kontekstdən götürür. Bu fərq Hissə 3-də closure və `this` mövzusunda ətraflı izah olunacaq.

## Praktika

Aşağıdaki kiçik tapşırığı həll edin: istifadəçidən yaş alan və nəticəyə əsasən mesaj göstərən funksiya yazın.

```js
function checkAge(age) {
  if (age >= 18) {
    return 'Giriş icazəlidir';
  } else if (age >= 14) {
    return 'Valideyn icazəsi lazımdır';
  } else {
    return 'Giriş qadağandır';
  }
}

console.log(checkAge(20)); // Giriş icazəlidir
console.log(checkAge(15)); // Valideyn icazəsi lazımdır
console.log(checkAge(10)); // Giriş qadağandır
```

Özünüz sınayın: `checkAge` funksiyasını arrow function şəklinə çevirin və nullish coalescing (`??`) istifadə edərək arqument verilmədikdə defolt yaş `18` təyin edin.

## Xülasə

- JavaScript brauzerdə davranışı idarə edən dildir, dəyişən növünü icra zamanı müəyyən edir.
- Dəyişən elanı üçün `let` və `const` istifadə edin, `var`-dan çəkinin.
- 8 əsas məlumat növü var: `number`, `bigint`, `string`, `boolean`, `null`, `undefined`, `object`, `symbol`.
- Müqayisələrdə `===`/`!==` üstünlük təşkil edir, tip çevrilməsindən yaranan səhvlərdən qorunur.
- `??` yalnız `null`/`undefined` üçün, `||` istənilən falsy dəyər üçün defolt seçir.
- Funksiyalar `function` açar sözü, funksiya ifadəsi və ya arrow function şəklində yazıla bilər.

## Əlavə oxu

- Mənbə: [javascript.info](https://javascript.info/) — "The Modern JavaScript Tutorial"
- Növbəti hissə: `javascript-info-part2.md` — Kod Keyfiyyəti və Obyektlər
