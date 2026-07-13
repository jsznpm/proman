# JavaScript.info Kursu — Hissə 5: Brauzer — Sənəd (DOM) və Events

Bu, [javascript.info](https://javascript.info/) əsaslı 6 hissəlik kursun beşinci hissəsidir. Plan faylı: `javascript-info.plan.md`. Bu hissədən başlayaraq JS dilinin özündən brauzer mühitinə keçirik.

## Kimlər üçündür?

Part 1–4-ü tamamlamış, funksiya, obyekt, asinxron JS anlayışlarını bilən öyrənənlər üçün.

## Ön şərtlər

Part 1–4: dilin əsasları, funksiyalar, class-lar, asinxron JS.

## Məzmun

1. [DOM nədir?](#dom-nədir)
2. [Node-lara giriş](#node-lara-giriş)
3. [DOM-un dəyişdirilməsi](#dom-un-dəyişdirilməsi)
4. [Stillər və siniflər](#stillər-və-siniflər)
5. [Events-ə giriş](#events-ə-giriş)
6. [Bubbling və Capturing](#bubbling-və-capturing)
7. [Event delegation](#event-delegation)
8. [Brauzer default hərəkətləri](#brauzer-default-hərəkətləri)
9. [UI Events: siçan və klaviatura](#ui-events-siçan-və-klaviatura)
10. [Formalar və idarəetmə elementləri](#formalar-və-idarəetmə-elementləri)
11. [Praktika](#praktika)
12. [Xülasə](#xülasə)
13. [Əlavə oxu](#əlavə-oxu)

---

## DOM nədir?

DOM (Document Object Model) — HTML səhifəsinin JavaScript-in "görə" və dəyişə bildiyi obyekt ağacı təsviridir. Hər HTML teqi bir "node" (düyün) kimi təmsil olunur.

```html
<body>
  <div id="app">
    <h1>Başlıq</h1>
    <p>Mətn</p>
  </div>
</body>
```

Bu struktur DOM-da: `body` → `div#app` → (`h1`, `p`) ağacına çevrilir. JavaScript bu ağaca `document` obyekti üzərindən daxil olur.

## Node-lara giriş

```js
document.getElementById('app');           // ID ilə tapır
document.querySelector('.item');          // CSS seçici ilə birincini tapır
document.querySelectorAll('.item');       // CSS seçiciyə uyğun hamısını tapır (NodeList)
document.querySelector('#app h1');        // vurğulanmış seçici zənciri
```

`querySelectorAll` nəticəsi array deyil, **NodeList**-dir — amma `forEach` işləyir:

```js
document.querySelectorAll('.item').forEach(item => console.log(item.textContent));
```

Ağacda gəzinti:

```js
let app = document.getElementById('app');
app.children;         // birbaşa uşaq elementlər
app.parentElement;    // valideyn element
app.firstElementChild; // ilk uşaq
app.nextElementSibling; // növbəti "bacı" element
```

**Ümumi səhv:** `childNodes` mətn node-larını (boşluqlar daxil) da daxil edir, `children` isə yalnız element node-larını göstərir — çox vaxt `children` istənilir.

## DOM-un dəyişdirilməsi

```js
let app = document.getElementById('app');

app.textContent = 'Yeni mətn';        // sadə mətn dəyişikliyi
app.innerHTML = '<b>Qalın mətn</b>';   // HTML kimi şərh olunur

let newElement = document.createElement('p');
newElement.textContent = 'Yeni paraqraf';
app.appendChild(newElement);           // sona əlavə edir

app.removeChild(newElement);            // silir
newElement.remove();                    // müasir, daha qısa üsul
```

**Ümumi səhv:** `innerHTML` istifadəçi girişi ilə birbaşa doldurulduqda **XSS (Cross-Site Scripting)** zəifliyinə yol açır — istifadəçi mətni skript kodu daxil edə bilər. İstifadəçi girişini göstərəndə `textContent` istifadə edin, `innerHTML`-i yalnız özünüz yazdığınız etibarlı HTML üçün saxlayın.

```js
// TƏHLÜKƏLİ:
app.innerHTML = userInput; // userInput <script> daşıyırsa, icra oluna bilər

// TƏHLÜKƏSİZ:
app.textContent = userInput; // mətn kimi göstərilir, kod kimi icra olunmur
```

## Stillər və siniflər

```js
let app = document.getElementById('app');

app.style.color = 'red';           // birbaşa stil dəyişikliyi
app.style.backgroundColor = 'black'; // camelCase: background-color → backgroundColor

app.classList.add('active');        // sinif əlavə et
app.classList.remove('hidden');     // sinif sil
app.classList.toggle('open');       // varsa sil, yoxsa əlavə et
app.classList.contains('active');   // true/false
```

**Niyə vacibdir:** Stil dəyişikliklərini birbaşa `style` ilə deyil, CSS sinifləri vasitəsilə (`classList`) idarə etmək daha təmiz koddur — vizual məntiq CSS-də qalır, JS yalnız sinif əlavə/silir.

## Events-ə giriş

```js
let button = document.querySelector('#myButton');

button.addEventListener('click', function(event) {
  console.log('Düyməyə klik edildi', event);
});
```

`event` obyekti klik haqqında məlumat verir: `event.target` (klik olunan element), `event.type` (`'click'`), `event.clientX/Y` (mouse koordinatları).

`removeEventListener` handler-i silmək üçün — bunun üçün handler funksiyası adlandırılmış olmalıdır (anonim funksiya silinə bilməz):

```js
function handleClick() { console.log('klik'); }
button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick); // düzgün silinir
```

## Bubbling və Capturing

Event bir elementdə baş verdikdə, o, **valideyn elementlərə də "yayılır"** (bubbling) — ən dərin elementdən başlayıb yuxarı `document`-ə qədər gedir.

```html
<div id="outer">
  <div id="inner">
    <button id="btn">Klik</button>
  </div>
</div>
```

```js
document.getElementById('outer').addEventListener('click', () => console.log('outer'));
document.getElementById('inner').addEventListener('click', () => console.log('inner'));
document.getElementById('btn').addEventListener('click', () => console.log('btn'));

// btn-ə klik etdikdə console-da: btn, inner, outer (bubbling — aşağıdan yuxarı)
```

`event.stopPropagation()` bubbling-i dayandırır — amma bu, çox vaxt lazımsız kompleksliyə səbəb olur, ehtiyatla istifadə edilməlidir.

**Capturing** — bubbling-in tərsi, yuxarıdan aşağı, `addEventListener`-in 3-cü arqumentini `true` verməklə aktivləşdirilir. Praktikada çox nadir istifadə olunur.

## Event delegation

Bir çox oxşar elementə (məs. siyahının hər sətri) ayrı-ayrı handler qoymaq əvəzinə, **valideynə bir handler** qoyub `event.target` ilə hansı elementə klik olunduğunu müəyyən etmək — bubbling-in praktiki tətbiqi:

```html
<ul id="list">
  <li data-id="1">Element 1</li>
  <li data-id="2">Element 2</li>
  <li data-id="3">Element 3</li>
</ul>
```

```js
document.getElementById('list').addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    console.log('Klik olunan ID:', event.target.dataset.id);
  }
});
```

**Niyə vacibdir:** Bu üsul yalnız 1 handler tələb edir, yeni `<li>` elementləri dinamik əlavə olunsa belə (məs. `appendChild` ilə) əlavə handler qoşmağa ehtiyac qalmır — performans və kod sadəliyi baxımından üstünlük təşkil edir.

## Brauzer default hərəkətləri

Bəzi elementlərin öz default davranışı var — link kliki səhifəni dəyişir, forma göndərilməsi səhifəni yeniləyir. `event.preventDefault()` bunun qarşısını alır:

```js
let link = document.querySelector('a');
link.addEventListener('click', function(event) {
  event.preventDefault(); // brauzerin yeni səhifəyə keçməsinin qarşısını alır
  console.log('Link klik olundu, amma keçid olmadı');
});
```

## UI Events: siçan və klaviatura

```js
document.addEventListener('mousemove', event => {
  console.log(event.clientX, event.clientY); // siçan koordinatları
});

document.addEventListener('keydown', event => {
  console.log(event.key);       // basılan düymə: 'Enter', 'a', 'ArrowUp'
  if (event.key === 'Enter') {
    console.log('Enter basıldı');
  }
});
```

**Ümumi səhv:** `keydown` klaviatura düyməsinin basılma anını, `keyup` isə buraxılma anını tutur — animasiya/oyun kontrolunda bu fərqi qarışdırmaq gözlənilməz davranışa səbəb olur.

## Formalar və idarəetmə elementləri

```html
<form id="loginForm">
  <input type="text" name="username" id="username">
  <button type="submit">Göndər</button>
</form>
```

```js
let form = document.getElementById('loginForm');
let input = document.getElementById('username');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // səhifə yenilənməsinin qarşısını al
  console.log('Göndərilən dəyər:', input.value);
});

input.addEventListener('focus', () => console.log('İnput fokuslandı'));
input.addEventListener('blur', () => console.log('İnput fokusdan çıxdı'));
input.addEventListener('input', () => console.log('Cari dəyər:', input.value)); // hər dəyişiklikdə
```

**Niyə vacibdir:** `submit` hadisəsində `preventDefault()` çağırmamaq, formanın brauzer tərəfindən default göndərilməsinə (səhifə yenilənməsi) səbəb olur — bu, SPA (Single Page Application) tətbiqlərində ən çox rast gəlinən başlanğıc səhvlərindəndir.

## Praktika

Dinamik "to-do list" yaradın: input-a mətn yazıb düyməyə klik etdikdə siyahıya əlavə olunsun, hər elementin yanında "sil" düyməsi olsun (event delegation ilə idarə olunsun).

```html
<input id="todoInput" type="text">
<button id="addBtn">Əlavə et</button>
<ul id="todoList"></ul>
```

```js
let input = document.getElementById('todoInput');
let addBtn = document.getElementById('addBtn');
let list = document.getElementById('todoList');

addBtn.addEventListener('click', function() {
  if (!input.value.trim()) return;

  let li = document.createElement('li');
  li.textContent = input.value;

  let deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Sil';
  deleteBtn.className = 'delete-btn';

  li.appendChild(deleteBtn);
  list.appendChild(li);
  input.value = '';
});

list.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-btn')) {
    event.target.parentElement.remove(); // event delegation — hər "sil" düyməsi üçün ayrı handler yox
  }
});
```

Özünüz sınayın: `Enter` düyməsi basıldıqda da (düyməyə klik etmədən) elementin siyahıya əlavə olunmasını təmin edin (`keydown` hadisəsi ilə).

## Xülasə

- DOM — HTML-in JS tərəfindən idarə oluna bilən obyekt ağacı təsviridir.
- İstifadəçi girişini göstərəndə `textContent` istifadə edin — `innerHTML` XSS riski yaradır.
- Event-lər bubbling (aşağıdan yuxarı) yayılır — bu, event delegation-un əsasıdır.
- Event delegation bir valideyn handler ilə çoxlu uşaq elementi idarə etməyə imkan verir, dinamik elementlərə də işləyir.
- `event.preventDefault()` brauzerin default davranışının (link keçidi, forma göndərilməsi) qarşısını alır.

## Əlavə oxu

- Mənbə: [javascript.info](https://javascript.info/) — "The Modern JavaScript Tutorial"
- Əvvəlki hissə: `javascript-info-part4.md`
- Növbəti hissə: `javascript-info-part6.md` — Brauzer API-ları və Əlavə Mövzular
