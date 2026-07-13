# JavaScript.info Kursu — Hissə 6: Brauzer API-ları və Əlavə Mövzular

Bu, [javascript.info](https://javascript.info/) əsaslı 6 hissəlik kursun altıncı və sonuncu hissəsidir. Plan faylı: `javascript-info.plan.md`.

## Kimlər üçündür?

Part 1–5-i tamamlamış, DOM, events və asinxron JS anlayışlarını bilən öyrənənlər üçün.

## Ön şərtlər

Part 1–5: dilin əsasları, async/await, DOM, events.

## Məzmun

1. [Şəbəkə sorğuları: fetch](#şəbəkə-sorğuları-fetch)
2. [XMLHttpRequest (qısa)](#xmlhttprequest-qısa)
3. [Brauzerdə məlumat saxlama](#brauzerdə-məlumat-saxlama)
4. [Animasiya](#animasiya)
5. [Web Components-ə giriş](#web-components-ə-giriş)
6. [Regular Expressions-ə giriş](#regular-expressions-ə-giriş)
7. [Praktika: Mini Layihə](#praktika-mini-layihə)
8. [Xülasə](#xülasə)
9. [Kursun Ümumi Xülasəsi](#kursun-ümumi-xülasəsi)
10. [Əlavə oxu](#əlavə-oxu)

---

## Şəbəkə sorğuları: fetch

`fetch` — serverə HTTP sorğusu göndərmək üçün müasir, Promise-əsaslı API (Part 4-də öyrənilən `async/await` ilə birləşir).

```js
async function loadUsers() {
  try {
    let response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) { // response.ok — status 200-299 aralığındadırsa true
      throw new Error(`HTTP xətası: ${response.status}`);
    }

    let users = await response.json(); // cavab body-sini JSON kimi parse edir
    console.log(users);
  } catch (error) {
    console.log('Sorğu uğursuz oldu:', error.message);
  }
}
```

`POST` sorğusu göndərmək:

```js
async function createUser(userData) {
  let response = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData) // Part 2-də öyrənilən JSON.stringify
  });
  return response.json();
}
```

**Ümumi səhv:** `fetch` yalnız **şəbəkə xətasında** (məs. internet yoxdur) `reject` edir — server `404` və ya `500` qaytarsa, `fetch` bunu **uğur** hesab edir. Ona görə `response.ok` yoxlaması mütləqdir, əks halda xəta statuslu cavablar sakitcə "uğurlu" kimi işlənə bilər.

## XMLHttpRequest (qısa)

`fetch`-dən əvvəl istifadə olunan köhnə API. Müasir kodda demək olar istifadə edilmir, amma köhnə layihələrdə rast gəlinə bilər:

```js
let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
xhr.onload = function() {
  console.log(JSON.parse(xhr.response));
};
xhr.send();
```

**Niyə vacibdir:** `fetch` Promise-əsaslı olduğu üçün `async/await` ilə daha təmiz oxunur — yeni kodda həmişə `fetch` seçilməlidir.

## Brauzerdə məlumat saxlama

**`localStorage`** — brauzeri bağlasan belə saxlanır, yalnız açıq şəkildə silinənə qədər qalır:

```js
localStorage.setItem('theme', 'dark');
localStorage.getItem('theme');   // 'dark'
localStorage.removeItem('theme');
localStorage.clear();             // hamısını silir
```

**`sessionStorage`** — eyni API, amma tab bağlandıqda silinir.

**Ümumi səhv:** `localStorage` yalnız **string** saxlayır — obyekt saxlamaq üçün `JSON.stringify`/`JSON.parse` istifadə edilməlidir:

```js
localStorage.setItem('user', JSON.stringify({ name: 'Aygün' }));
let user = JSON.parse(localStorage.getItem('user'));
```

**Cookie** — həm brauzerdə, həm serverdə əlçatan, hər HTTP sorğusuna avtomatik göndərilir (autentifikasiya tokenləri üçün tez-tez istifadə olunur):

```js
document.cookie = 'username=Aygün; max-age=3600'; // 1 saat saxlanır
```

**IndexedDB** — böyük həcmli struktura malik məlumat (məs. offline tətbiqlər üçün) saxlamaq üçün brauzer daxili verilənlər bazası. API-si mürəkkəbdir, praktikada çox vaxt kitabxana (məs. Dexie.js) üzərindən istifadə olunur — bu kursun əhatə dairəsindən kənardır, amma mövcudluğunu bilmək vacibdir.

## Animasiya

**CSS animasiya/transition** — sadə animasiyalar üçün ilk seçim, performans baxımından JS-dən üstündür:

```css
.box {
  transition: transform 0.3s ease;
}
.box:hover {
  transform: scale(1.1);
}
```

**`requestAnimationFrame`** — JS ilə mürəkkəb/dinamik animasiya lazım olduqda, brauzerin öz "frame" tsiklinə uyğunlaşaraq işləyir (`setInterval`-dən daha səlis və performanslıdır):

```js
let position = 0;

function animate() {
  position += 2;
  box.style.left = position + 'px';

  if (position < 300) {
    requestAnimationFrame(animate); // növbəti frame üçün özünü yenidən çağırır
  }
}

requestAnimationFrame(animate);
```

**Niyə vacibdir:** `requestAnimationFrame` brauzer sekmə arxa planda olduqda avtomatik dayanır — batareya və resurs istifadəsini optimallaşdırır, `setInterval`-dən fərqli olaraq.

## Web Components-ə giriş

Web Components — öz "custom" HTML elementlərini yaratmaq üçün brauzer standartı. Əsas hissəsi: **Custom Elements**.

```js
class MyGreeting extends HTMLElement {
  connectedCallback() { // element səhifəyə əlavə olunduqda çağırılır
    this.textContent = `Salam, ${this.getAttribute('name')}!`;
  }
}

customElements.define('my-greeting', MyGreeting);
```

```html
<my-greeting name="Aygün"></my-greeting>
<!-- Nəticə: Salam, Aygün! -->
```

**Niyə vacibdir:** Bu, React/Vue kimi framework-lərin öz komponent sisteminin arxasında dayanan brauzer-səviyyəli konseptə əsaslanır — framework-süz, təmiz JS ilə yenidən-istifadə oluna bilən komponent yaratmağa imkan verir. Praktikada bu, geniş mövzudur; burada məqsəd əsas ideyanı tanış etməkdir.

## Regular Expressions-ə giriş

Regular Expression (RegExp) — mətn içində naxış (pattern) axtarmaq/əvəz etmək üçün xüsusi sintaksis.

```js
let pattern = /\d+/;      // bir və ya bir neçə rəqəm
let str = 'Sifariş nömrəsi: 12345';

pattern.test(str);              // true — uyğunluq var
str.match(pattern);              // ['12345'] — tapılan hissə
str.replace(/\d+/, 'XXXXX');      // 'Sifariş nömrəsi: XXXXX'
```

Ən çox istifadə olunan simvollar:

| Simvol | Məna |
|---|---|
| `\d` | rəqəm |
| `\w` | hərf/rəqəm/`_` |
| `\s` | boşluq |
| `+` | 1 və ya daha çox |
| `*` | 0 və ya daha çox |
| `?` | 0 və ya 1 |
| `g` (flag) | bütün uyğunluqları tap (yalnız birincini yox) |
| `i` (flag) | böyük/kiçik hərfə həssas olmama |

```js
let email = 'test@mail.com';
let emailPattern = /^[\w.]+@[\w.]+\.\w+$/;
emailPattern.test(email); // true — sadə email formatı yoxlaması
```

**Ümumi səhv:** Mürəkkəb doğrulamalar (email, telefon nömrəsi) üçün "mükəmməl" regex yazmağa çalışmaq — real dünyada email formatları çox müxtəlifdir, sadə yoxlama + server-side doğrulama daha etibarlı yanaşmadır.

## Praktika: Mini Layihə

Bu kursda öyrənilən mövzuları birləşdirən kiçik layihə: API-dən istifadəçi siyahısı çəkib, DOM-a render edən, nəticəni `localStorage`-də keşləyən mini tətbiq.

```html
<button id="loadBtn">İstifadəçiləri yüklə</button>
<ul id="userList"></ul>
```

```js
const CACHE_KEY = 'cachedUsers';

async function loadUsers() {
  let cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    renderUsers(JSON.parse(cached)); // əvvəlcə keşdən göstər
    return;
  }

  try {
    let response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    let users = await response.json();
    localStorage.setItem(CACHE_KEY, JSON.stringify(users)); // keşə yaz
    renderUsers(users);
  } catch (error) {
    document.getElementById('userList').textContent = `Xəta: ${error.message}`;
  }
}

function renderUsers(users) {
  let list = document.getElementById('userList');
  list.innerHTML = ''; // əvvəlki nəticəni təmizlə

  users.forEach(user => {
    let li = document.createElement('li');
    li.textContent = `${user.name} (${user.email})`; // textContent — XSS-dən qorunma
    list.appendChild(li);
  });
}

document.getElementById('loadBtn').addEventListener('click', loadUsers);
```

Özünüz sınayın: "Keşi təmizlə" düyməsi əlavə edin (`localStorage.removeItem`), regex ilə yalnız `.com` domenli email-ə malik istifadəçiləri filtr edən funksiya yazın.

## Xülasə

- `fetch` + `async/await` müasir şəbəkə sorğusunun standart üsuludur — `response.ok` yoxlamağı unutmayın.
- `localStorage`/`sessionStorage` yalnız string saxlayır, obyekt üçün JSON çevrilməsi lazımdır.
- `requestAnimationFrame` JS-əsaslı animasiya üçün `setInterval`-dən daha performanslıdır.
- Web Components brauzer-səviyyəli, framework-süz komponent yaratma standartıdır.
- Regular Expressions mətn naxışı axtarışı/əvəzlənməsi üçündür, mürəkkəb doğrulamalarda server-side dəstəklə birləşdirilməlidir.

## Kursun Ümumi Xülasəsi

Bu 6 hissəlik kursda JavaScript-i sıfırdan öyrəndik:

- **Part 1–2:** Dilin təməli — dəyişənlər, məlumat növləri, operatorlar, funksiyalar, obyektlər, array-lər.
- **Part 3:** İrəli funksiya konsepsiyaları — closure, `this`, prototiplər, class-lar.
- **Part 4:** Asinxronluq — Promise, async/await, generatorlar, modullar.
- **Part 5–6:** Brauzer mühiti — DOM, events, şəbəkə sorğuları, saxlama, animasiya.

Bu əsasla artıq real dünya JS layihələrində (frontend framework-lər — React, Vue, Svelte və s. daxil olmaqla) işləməyə hazırsınız — onlar bu kursda öyrənilən konsepsiyaların üzərinə qurulub.

## Əlavə oxu

- Mənbə: [javascript.info](https://javascript.info/) — "The Modern JavaScript Tutorial" (kursun tam materialı, daha da dərin mövzular: TypeScript inteqrasiyası, performans, daha çox brauzer API-sı üçün)
- Əvvəlki hissə: `javascript-info-part5.md`
- Plan faylı: `javascript-info.plan.md`
