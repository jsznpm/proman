# JavaScript.info Kursu — Hissə 2: Kod Keyfiyyəti və Obyektlər

Bu, [javascript.info](https://javascript.info/) əsaslı 6 hissəlik kursun ikinci hissəsidir. Plan faylı: `javascript-info.plan.md`.

## Kimlər üçündür?

`javascript-info-part1.md`-ni tamamlamış, dəyişən, məlumat növü, funksiya və dövr anlayışlarını bilən öyrənənlər üçün.

## Ön şərtlər

Part 1: dəyişənlər, məlumat növləri, operatorlar, funksiyalar.

## Məzmun

1. [Kod keyfiyyəti: debugging və stil](#kod-keyfiyyəti-debugging-və-stil)
2. [Obyektlərin əsasları](#obyektlərin-əsasları)
3. [Referans ilə köçürmə](#referans-ilə-köçürmə)
4. [Obyekt metodları və `this`](#obyekt-metodları-və-this)
5. [Konstruktor funksiyalar](#konstruktor-funksiyalar)
6. [Optional chaining `?.`](#optional-chaining-)
7. [String-lər](#string-lər)
8. [Array-lər](#array-lər)
9. [Map, Set](#map-set)
10. [JSON](#json)
11. [Praktika](#praktika)
12. [Xülasə](#xülasə)
13. [Əlavə oxu](#əlavə-oxu)

---

## Kod keyfiyyəti: debugging və stil

**Debugging** — kod içindəki səhvləri tapıb düzəltmək prosesi. Chrome DevTools-da `Sources` tab-ında breakpoint qoymaqla kodun icrasını dayandırıb dəyişənlərin dəyərinə addım-addım baxmaq olar.

```js
function sum(a, b) {
  let result = a + b; // bura breakpoint qoyub `result` dəyərinə baxmaq olar
  return result;
}
```

`console.log()` — ən sadə debugging vasitəsi, dəyəri console-a çap edir.

**Kod stili qaydaları:**
- Bloklar üçün 2 və ya 4 boşluqlu indentasiya (tab yox).
- Sətir uzunluğu 80-120 simvoldan çox olmamalı.
- `{` mötərizəsi eyni sətirdə, `if`-dən sonra boşluq: `if (condition) {`.
- Nöqtəli vergül hər ifadənin sonunda (avtomatik əlavəyə güvənməyin).

Şərhlər ("comments") **nə etdiyini** deyil, **niyə** etdiyini izah etməlidir — kod özü nə etdiyini artıq göstərir.

```js
// PİS: bu, cəm hesablayır
let total = price * quantity;

// YAXŞI: endirim kampaniyası bitənə qədər qiymətə 10% əlavə edirik (bax: TICKET-123)
let adjustedPrice = price * 1.1;
```

## Obyektlərin əsasları

Obyekt — açar-dəyər cütləri saxlayan strukturdur.

```js
let user = {
  name: 'Aygün',
  age: 25,
  isAdmin: false
};

console.log(user.name); // Aygün
user.age = 26;           // dəyər dəyişdirmə
user.email = 'a@mail.az'; // yeni xüsusiyyət əlavə etmə
delete user.isAdmin;     // xüsusiyyəti silmə
```

Kvadrat mötərizə sintaksisi dinamik açar adları üçün istifadə olunur:

```js
let key = 'name';
console.log(user[key]); // Aygün — dot sintaksisi ilə mümkün deyil: user.key işləməz
```

Xüsusiyyətin mövcudluğunu yoxlamaq: `in` operatoru.

```js
'age' in user;       // true
'salary' in user;    // false
```

Obyekt üzərində dövr etmək: `for...in`.

```js
for (let key in user) {
  console.log(key, user[key]);
}
```

**Ümumi səhv:** `user.age === undefined` yoxlaması ilə `'age' in user` fərqlidir — əgər xüsusiyyətin dəyəri həqiqətən `undefined`-dirsə, birinci yoxlama yanılır, `in` operatoru isə düzgün nəticə verir.

## Referans ilə köçürmə

Primitiv dəyərlər (string, number, boolean) **dəyər ilə** köçürülür, obyektlər isə **referans ilə**.

```js
let user = { name: 'Aygün' };
let admin = user; // eyni obyektə işarə edir, kopya deyil

admin.name = 'Nərgiz';
console.log(user.name); // Nərgiz! — user da dəyişdi
```

Obyekti həqiqətən kopyalamaq üçün `{...obj}` (spread) və ya `Object.assign()` istifadə olunur — amma bu, **"shallow copy"**dir (yalnız birinci səviyyəni kopyalar):

```js
let clone = { ...user };
```

## Obyekt metodları və `this`

Obyektin xüsusiyyəti funksiya olduqda, buna **metod** deyilir.

```js
let user = {
  name: 'Aygün',
  sayHi() {
    console.log(`Salam, mən ${this.name}`);
  }
};

user.sayHi(); // Salam, mən Aygün
```

`this` — metodu çağıran obyektə işarə edir. Dəyəri kompilyasiya zamanı deyil, **çağırış zamanı** müəyyən olunur:

```js
function sayHi() {
  console.log(this.name);
}

let user = { name: 'Aygün', sayHi };
let admin = { name: 'Nərgiz', sayHi };

user.sayHi();  // Aygün
admin.sayHi(); // Nərgiz — eyni funksiya, fərqli `this`
```

**Ümumi səhv:** `this`-siz (obyekt kontekstindən kənar) çağırılan funksiyada `this` `undefined` olur (strict mode-da) — bu, çox vaxt callback-lərdə metodu ötürərkən baş verir. Bu problem closure və arrow function mövzusunda (Part 3) daha ətraflı izah olunur.

## Konstruktor funksiyalar

Oxşar strukturlu çoxlu obyekt yaratmaq üçün konstruktor funksiya istifadə olunur, `new` açar sözü ilə çağırılır:

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let user1 = new User('Aygün', 25);
let user2 = new User('Nərgiz', 30);
```

Konvensiya: konstruktor funksiya adı böyük hərflə başlayır (`User`, `Person`).

## Optional chaining `?.`

Obyektin dərin xüsusiyyətlərinə "təhlükəsiz" giriş üçün — aralıq xüsusiyyət `null`/`undefined` olarsa, xəta vermədən `undefined` qaytarır:

```js
let user = {};
console.log(user.address.street); // XƏTA: Cannot read properties of undefined
console.log(user.address?.street); // undefined — xəta yoxdur
```

`?.()` funksiya çağırışı üçün, `?.[]` kvadrat mötərizə üçün də işləyir:

```js
user.getName?.(); // funksiya mövcud deyilsə, sadəcə undefined qaytarır
```

**Niyə vacibdir:** API-dən gələn məlumat strukturunda hansı sahələrin mövcud olacağı qarantiya olunmadıqda `?.` xəta almadan kodu davam etdirməyə imkan verir.

## String-lər

```js
let str = 'Salam Dünya';

str.length;              // 11
str[0];                  // 'S'
str.toUpperCase();        // 'SALAM DÜNYA'
str.toLowerCase();        // 'salam dünya'
str.indexOf('Dünya');     // 6
str.includes('Salam');    // true
str.slice(0, 5);          // 'Salam'
str.split(' ');           // ['Salam', 'Dünya']
str.trim();               // ətraf boşluqları silir
str.replace('Salam', 'Hey'); // 'Hey Dünya'
```

**Ümumi səhv:** String-lər **dəyişməzdir (immutable)** — `str[0] = 'X'` heç bir effekt vermir, xəta da atmır, sadəcə heç nə etmir. Yeni string yaratmaq üçün metod nəticəsini yeni dəyişənə mənimsətmək lazımdır.

## Array-lər

Sıralanmış siyahı üçün istifadə olunan xüsusi obyekt növü.

```js
let fruits = ['alma', 'armud', 'nar'];

fruits.push('üzüm');      // sona əlavə
fruits.pop();              // sondan silmə və qaytarma
fruits.shift();             // başdan silmə
fruits.unshift('gilas');   // başa əlavə
fruits.length;              // 3

fruits.forEach(f => console.log(f)); // hər elementi gəzir

let upper = fruits.map(f => f.toUpperCase());   // yeni array qaytarır
let long = fruits.filter(f => f.length > 4);    // şərtə uyğunları seçir
let found = fruits.find(f => f === 'nar');      // birinci uyğunu tapır
let total = [1, 2, 3].reduce((sum, n) => sum + n, 0); // 6 — toplayaraq bir dəyərə endirir
```

`map`, `filter`, `find`, `reduce` — **orijinal array-i dəyişdirmir**, yeni nəticə qaytarır. Bu, müasir JS-də ən çox istifadə olunan array metodlarıdır.

**Ümumi səhv:** `sort()` metodu defolt olaraq elementləri **string kimi** müqayisə edir:

```js
[10, 1, 5].sort(); // [1, 10, 5] — SƏHV nəticə!
[10, 1, 5].sort((a, b) => a - b); // [1, 5, 10] — düzgün, comparator ilə
```

## Map, Set

**`Map`** — açar-dəyər cütləri saxlayır, açar **istənilən növ** ola bilər (obyekt daxil olmaqla), sıralamayı qoruyur:

```js
let map = new Map();
map.set('name', 'Aygün');
map.set(1, 'bir');

map.get('name'); // Aygün
map.has(1);      // true
map.size;         // 2

for (let [key, value] of map) {
  console.log(key, value);
}
```

**`Set`** — yalnız unikal dəyərləri saxlayır:

```js
let set = new Set([1, 2, 2, 3]);
console.log(set.size); // 3 — təkrarlar avtomatik silinir
```

## JSON

JSON (JavaScript Object Notation) — obyektləri mətnə çevirmək və geri çevirmək üçün format, API-lar arasında məlumat mübadiləsində standart.

```js
let user = { name: 'Aygün', age: 25 };

let json = JSON.stringify(user); // '{"name":"Aygün","age":25}'
let parsed = JSON.parse(json);    // { name: 'Aygün', age: 25 }
```

**Ümumi səhv:** `JSON.stringify` funksiyaları, `undefined` dəyərləri və `Symbol`-ları avtomatik atlayır — bu, çox vaxt "niyə xüsusiyyət itdi" sualına səbəb olur.

## Praktika

Alış-veriş səbəti üçün funksiyalar yazın: array-dəki obyektlərin ümumi qiymətini hesablayan, və 50 manatdan çox olan məhsulları filtr edən.

```js
let cart = [
  { name: 'Kitab', price: 15 },
  { name: 'Noutbuk', price: 800 },
  { name: 'Qələm', price: 2 }
];

function totalPrice(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

function expensiveItems(items, limit = 50) {
  return items.filter(item => item.price > limit);
}

console.log(totalPrice(cart));       // 817
console.log(expensiveItems(cart));    // [{ name: 'Noutbuk', price: 800 }]
```

Özünüz sınayın: `cart`-ı `Map`-ə çevirin (açar — məhsul adı, dəyər — qiymət) və `JSON.stringify` ilə mətnə çevirməyə çalışın (nəticəni müşahidə edin — `Map` düzgün serialize olunmur, niyə olduğunu araştırın).

## Xülasə

- Obyektlər referans ilə köçürülür — kopyalamaq üçün `{...obj}` istifadə edin.
- `this` metodun çağırıldığı obyektə bağlıdır, kompilyasiya zamanı deyil, çağırış zamanı müəyyən olunur.
- `?.` dərin xüsusiyyətlərə təhlükəsiz giriş üçündür.
- `map`/`filter`/`find`/`reduce` array-i dəyişdirmədən yeni nəticə istehsal edir.
- `Map` və `Set` müasir kolleksiya strukturlarıdır — `Map` açar-dəyər, `Set` unikal dəyər üçün.
- `JSON.stringify`/`JSON.parse` obyekt ↔ mətn çevrilməsi üçündür.

## Əlavə oxu

- Mənbə: [javascript.info](https://javascript.info/) — "The Modern JavaScript Tutorial"
- Əvvəlki hissə: `javascript-info-part1.md`
- Növbəti hissə: `javascript-info-part3.md` — Funksiyalar, Prototiplər və Class-lar
