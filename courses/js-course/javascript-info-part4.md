# JavaScript.info Kursu — Hissə 4: Xətaların İdarə Olunması və Asinxron JavaScript

Bu, [javascript.info](https://javascript.info/) əsaslı 6 hissəlik kursun dördüncü hissəsidir. Plan faylı: `javascript-info.plan.md`.

## Kimlər üçündür?

Part 1–3-ü tamamlamış, funksiya, closure, class anlayışlarını bilən öyrənənlər üçün.

## Ön şərtlər

Part 1–3: funksiyalar, closure, class-lar.

## Məzmun

1. [try...catch](#trycatch)
2. [Öz xəta class-larımız](#öz-xəta-class-larımız)
3. [Callback-lər və "callback hell"](#callback-lər-və-callback-hell)
4. [Promise](#promise)
5. [async/await](#asyncawait)
6. [Promise.all və digər statik metodlar](#promiseall-və-digər-statik-metodlar)
7. [Generatorlar](#generatorlar)
8. [Modullar: import/export](#modullar-importexport)
9. [Praktika](#praktika)
10. [Xülasə](#xülasə)
11. [Əlavə oxu](#əlavə-oxu)

---

## try...catch

Kod icrası zamanı yaranan xətaları "tutub" proqramın çökməsinin qarşısını almaq üçün:

```js
try {
  let result = JSON.parse('{ səhv json'); // xəta atır
  console.log(result); // bura çatmır
} catch (error) {
  console.log('Xəta baş verdi:', error.message);
} finally {
  console.log('Bu hər zaman icra olunur — xəta olsa da, olmasa da');
}
```

`error` obyektinin `name` (xəta növü, məs. `SyntaxError`) və `message` (izahat) xüsusiyyətləri var.

**Ümumi səhv:** `try...catch` yalnız **sinxron** kodu tutur. Asinxron kod içindəki (məs. `setTimeout` daxilindəki) xəta xarici `catch`-ə çatmır:

```js
try {
  setTimeout(() => {
    JSON.parse('səhv'); // bu xəta xarici catch-ə çatmır!
  }, 100);
} catch (error) {
  console.log('Bura çatmır');
}
```

Asinxron xətaları düzgün tutmaq üçün `async/await` ilə `try...catch` istifadə olunur (aşağıda).

## Öz xəta class-larımız

`Error` class-ından miras alaraq xüsusi xəta növləri yaratmaq olar:

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function validateAge(age) {
  if (age < 0) {
    throw new ValidationError('Yaş mənfi ola bilməz');
  }
  return age;
}

try {
  validateAge(-5);
} catch (error) {
  if (error instanceof ValidationError) {
    console.log('Doğrulama xətası:', error.message);
  } else {
    throw error; // tanımadığımız xətanı yenidən atırıq
  }
}
```

**Niyə vacibdir:** `instanceof` ilə xəta növünü ayırd etmək, müxtəlif xəta tiplərinə fərqli reaksiya verməyə imkan verir (məs. şəbəkə xətası vs. doğrulama xətası).

## Callback-lər və "callback hell"

Asinxron əməliyyatların (fayl oxumaq, şəbəkə sorğusu) köhnə idarəetmə üsulu — funksiyanı "callback" kimi ötürmək:

```js
function loadUser(id, callback) {
  setTimeout(() => {
    callback({ id, name: 'Aygün' });
  }, 1000);
}

loadUser(1, function(user) {
  console.log(user); // 1 saniyə sonra icra olunur
});
```

Bir neçə ardıcıl asinxron əməliyyat callback-lərlə "iç-içə" yazıldıqda, oxumaq çətinləşir — buna **"callback hell"** deyilir:

```js
loadUser(1, function(user) {
  loadOrders(user.id, function(orders) {
    loadOrderDetails(orders[0].id, function(details) {
      console.log(details); // 3 səviyyəli iç-içə, oxumaq çətin
    });
  });
});
```

Bu problem, aşağıda izah olunan Promise-lər ilə həll olunur.

## Promise

Promise — gələcəkdə tamamlanacaq (və ya uğursuz olacaq) əməliyyatın nəticəsini təmsil edən obyekt. 3 vəziyyəti var: `pending` (gözləmədə), `fulfilled` (uğurlu), `rejected` (uğursuz).

```js
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    let success = true;
    if (success) {
      resolve('Məlumat gəldi'); // uğurlu nəticə
    } else {
      reject(new Error('Xəta baş verdi')); // uğursuz nəticə
    }
  }, 1000);
});

promise
  .then(result => console.log(result))   // uğurlu olduqda icra olunur
  .catch(error => console.log(error))    // uğursuz olduqda icra olunur
  .finally(() => console.log('Bitdi'));  // hər halda icra olunur
```

`.then()` zəncirləmə ilə callback hell-in qarşısını alır:

```js
loadUserPromise(1)
  .then(user => loadOrdersPromise(user.id))
  .then(orders => loadOrderDetailsPromise(orders[0].id))
  .then(details => console.log(details))
  .catch(error => console.log('Hər hansı addımda xəta:', error));
```

## async/await

`async/await` — Promise-lər üzərində "sinxron kimi görünən" sintaksis, oxumağı daha da asanlaşdırır.

```js
async function loadUserData() {
  try {
    let user = await loadUserPromise(1);       // Promise nəticəsini gözləyir
    let orders = await loadOrdersPromise(user.id);
    let details = await loadOrderDetailsPromise(orders[0].id);
    console.log(details);
  } catch (error) {
    console.log('Xəta:', error.message); // indi try/catch asinxron xətaları da tutur!
  }
}

loadUserData();
```

- `async` açar sözü funksiyanın həmişə Promise qaytardığını bildirir.
- `await` yalnız `async` funksiya daxilində istifadə oluna bilər, Promise-in həll olunmasını gözləyir.

**Niyə vacibdir:** `async/await` "callback hell"i tam aradan qaldırır — kod yuxarıdan aşağı, sinxron məntiqlə oxunur, halbuki arxa planda tam asinxron işləyir.

**Ümumi səhv:** `await`-i unutmaq — nəticədə dəyişənə Promise obyekti özü (hələ həll olunmamış) mənimsədilir, gözlənilən nəticə deyil:

```js
async function bad() {
  let user = loadUserPromise(1); // await unudulub!
  console.log(user); // Promise {<pending>} — user obyekti deyil
}
```

## Promise.all və digər statik metodlar

Bir neçə asinxron əməliyyatı **paralel** icra etmək üçün:

```js
async function loadAll() {
  let [user, orders] = await Promise.all([
    loadUserPromise(1),
    loadOrdersPromise(1)
  ]); // hər ikisi paralel başlayır, ikisi də bitəndə davam edir
  console.log(user, orders);
}
```

- `Promise.all` — bütün Promise-lər uğurlu olmalıdır, biri belə uğursuz olsa bütün nəticə rədd olunur.
- `Promise.race` — ilk tamamlanan Promise-in nəticəsini qaytarır (uğurlu və ya uğursuz).
- `Promise.allSettled` — bütün Promise-lərin nəticəsini gözləyir, biri uğursuz olsa belə digərlərinin nəticəsini itirmir.

## Generatorlar

Generator — icrasını dayandırıb sonra davam etdirə bilən xüsusi funksiya, `function*` sintaksisi ilə yazılır, `yield` ilə dəyər "verir":

```js
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let generator = generateSequence();
console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: 3, done: false }
console.log(generator.next()); // { value: undefined, done: true }
```

`for...of` ilə generator üzərində birbaşa dövr etmək olar:

```js
for (let value of generateSequence()) {
  console.log(value); // 1, 2, 3
}
```

**Niyə vacibdir:** Generatorlar "iterable" (dövr edilə bilən) xüsusi obyektlər yaratmağın əsasıdır — böyük məlumat ardıcıllığını "lazy" (tələb olunanda) istehsal etməyə imkan verir, hamısını yaddaşda saxlamağa ehtiyac qalmır.

## Modullar: import/export

Kodu ayrı fayllara bölüb, lazım olan hissələri paylaşmaq üçün ES modulları istifadə olunur.

`math.js` faylı:

```js
export function sum(a, b) {
  return a + b;
}

export const PI = 3.14159;

export default function multiply(a, b) { // hər faylda yalnız 1 default export
  return a * b;
}
```

`main.js` faylı:

```js
import multiply, { sum, PI } from './math.js';

console.log(sum(2, 3));      // 5
console.log(PI);              // 3.14159
console.log(multiply(2, 3));  // 6
```

HTML-də modul istifadə etmək üçün `type="module"` göstərilməlidir:

```html
<script type="module" src="main.js"></script>
```

**Dinamik import** — modulu yalnız lazım olduqda yükləmək üçün:

```js
button.addEventListener('click', async () => {
  let { sum } = await import('./math.js'); // tələb olunanda yüklənir
  console.log(sum(1, 2));
});
```

**Niyə vacibdir:** Dinamik import böyük tətbiqlərdə "lazy loading" (kod bölmələrini yalnız lazım olduqda yükləmək) üçün istifadə olunur — ilkin yüklənmə vaxtını azaldır.

## Praktika

Fərz edək API-dən istifadəçi məlumatı çəkirik (simulyasiya edilmiş Promise ilə). Xəta baş verə biləcəyini nəzərə alaraq `async/await` və `try...catch` ilə yazın.

```js
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) {
        reject(new Error('Yanlış ID'));
      } else {
        resolve({ id, name: 'Aygün' });
      }
    }, 500);
  });
}

async function displayUser(id) {
  try {
    let user = await fetchUser(id);
    console.log(`İstifadəçi tapıldı: ${user.name}`);
  } catch (error) {
    console.log(`Xəta: ${error.message}`);
  }
}

displayUser(1);  // İstifadəçi tapıldı: Aygün
displayUser(-1); // Xəta: Yanlış ID
```

Özünüz sınayın: `fetchUser` çağırışlarını `Promise.all` ilə 3 fərqli ID üçün paralel icra edin və nəticələri bir array-də toplayın.

## Xülasə

- `try...catch` yalnız sinxron kodu tutur — asinxron xəta tutmaq üçün `async/await` ilə birləşdirin.
- Promise 3 vəziyyətə malikdir: `pending`, `fulfilled`, `rejected`; `.then()/.catch()/.finally()` ilə idarə olunur.
- `async/await` Promise-lər üzərində sinxron-kimi-görünən sintaksisdir, callback hell-i aradan qaldırır.
- `Promise.all` paralel əməliyyatlar üçün, `Promise.allSettled` hamısının nəticəsini itirmədən yığır.
- Generatorlar `function*`/`yield` ilə "dayandırılıb-davam etdirilə bilən" funksiyalardır.
- ES modulları (`import`/`export`) kodu fayllara bölüb paylaşmağa imkan verir, dinamik import lazy loading üçündür.

## Əlavə oxu

- Mənbə: [javascript.info](https://javascript.info/) — "The Modern JavaScript Tutorial"
- Əvvəlki hissə: `javascript-info-part3.md`
- Növbəti hissə: `javascript-info-part5.md` — Brauzer: Sənəd (DOM) və Events
