# JSX-də HTML teqləri necə yazılır və öz komponentini necə yaradırsan?

JSX ilk baxışdan HTML-ə çox bənzəyir, amma bir neçə qayda var ki, unudulanda kod sadəcə işləmir — compile mərhələsində partlayır. Bu yazıda həmin qaydaları, JSX-lə mürəkkəb UI strukturlarının necə təsvir olunduğunu və öz JSX elementini (komponentini) necə yaratmağı görəcəyik.

---

## Qayda #1: kiçik hərflə başlayan teq = HTML, böyük hərflə başlayan = sənin komponentin

JSX-də teq adının böyük-kiçik hərflə yazılması təsadüfi deyil, React üçün bir işarədir:

- **kiçik hərflə başlayan** teq (`<button>`, `<div>`, `<p>`) → React bunu **built-in HTML elementi** kimi qəbul edir.
- **böyük hərflə başlayan** teq (`<Button>`, `<MyComponent>`) → React bunu **sənin yazdığın komponent** kimi axtarır.

Bu qayda sayəsində koda baxanda gözünüz built-in HTML elementlərini sizin yazdığınız komponentlərdən dərhal ayıra bilir — əlavə heç nə oxumadan.

HTML elementlərinə adi atributlarını (`title`, `id`, `className` və s.) ötürə bilərsiniz. Amma React tanımadığı bir atribut görəndə susmur — konsola xəbərdarlıq (`warning`) yazır:

```jsx
import * as ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <button title="My Button" foo="bar">
    My Button
  </button>
);

root.render(<Button />);
```

Bu kodda iki fərqli problem var:

1. `<button>` elementinə `foo="bar"` deyə bilinməyən bir atribut ötürülüb — React bunu tanımır və konsola xəbərdarlıq yazacaq, amma kod işə düşəcək.
2. `<Button />` isə tam fərqli hekayədir: **kod heç compile olmayacaq**, çünki heç bir yerdə `Button` adlı komponent tərif olunmayıb. React `<Button>`-u komponent kimi axtarır, tapmır və xəta verir.

> **Nəticə:** istənilən HTML teqini JSX-də sərbəst istifadə edə bilərsiniz, sadəcə iki şeyi yadda saxlamaq lazımdır — teqlər böyük-kiçik hərfə həssasdır, və atribut adları düzgün olmalıdır.

---

## Sadə teqlərdən UI strukturuna keçid

JSX-in əsl gücü tək bir elementi göstərməkdə deyil, bütün səhifə strukturunu bir yerdə, oxunaqlı şəkildə təsvir etməkdə özünü göstərir. Bax bu nümunəyə:

```jsx
import * as ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <section>
    <header>
      <h1>A Header</h1>
    </header>
    <nav>
      <a href="item">Nav Item</a>
    </nav>
    <main>
      <p>The main content...</p>
    </main>
    <footer>
      <small>&copy; 2024</small>
    </footer>
  </section>
);
```

Burada `<header>`, `<nav>`, `<main>`, `<footer>` kimi **semantik HTML teqləri** istifadə olunub — bunlar sadəcə görünüş üçün deyil, səhifənin hansı hissəsinin nə olduğunu (başlıq, naviqasiya, əsas məzmun, alt hissə) bildirir. Bu həm brauzer və axtarış sistemləri, həm də ekran oxuyucuları (screen reader) üçün faydalıdır.

Diqqət edin ki, bu kod imperativ yazılsaydı (əvvəlcə elementi yarat, sonra uşaq əlavə et, sonra digər elementi yarat...), strukturu bir baxışda görmək çətin olardı. JSX isə HTML-ə bənzədiyi üçün iyerarxiyanı — kimin kimin içində olduğunu — dərhal göstərir.

> **UI-ə tək-tək element kimi deyil, bütöv bir struktur kimi baxmaq lazımdır — məhz JSX bunu asanlaşdırır.**

---

## Öz JSX elementini yaratmaq: komponentlər

İndiyə qədər yalnız built-in HTML teqlərindən istifadə etdik. Amma React-in əsl gücü **komponentlərdədir** — böyük, təkrarlanan strukturları öz teqinizin arxasında "gizlətmək" imkanıdır.

Komponent sadəcə JSX qaytaran bir funksiyadır. Onu yaratdıqdan sonra, adi HTML teqi kimi çağıra bilərsiniz:

```jsx
import * as ReactDOM from "react-dom";

function MyComponent() {
  return (
    <section>
      <h1>My Component</h1>
      <p>Content in my component...</p>
    </section>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MyComponent />);
```

Burada baş verənləri addım-addım deşifrə edək:

1. `MyComponent` adlı bir funksiya yazırıq. Funksiyanın adı böyük hərflə başlayır — bu, React-ə "bu bir komponentdir, HTML teqi deyil" siqnalını verir.
2. Funksiya `return` ilə bir JSX bloku qaytarır — bu, komponentin "əvəzinə" nəyin render olunacağını göstərir.
3. `root.render(<MyComponent />)` çağırılanda, React `<MyComponent>` yerinə funksiyanın qaytardığı `<section>` və onun içindəkiləri render edir.

Nəticədə ekranda sadəcə `<section><h1>My Component</h1><p>...</p></section>` görünür — `<MyComponent>` teqinin özü heç vaxt real DOM-a düşmür, o sadəcə "bu strukturu bura qoy" demək üçün bir qısayoldur.

> **Vacib qayda:** JSX-də istifadə etdiyiniz hər bir öz komponentiniz, işlədiyi eyni scope-da (əhatə dairəsində) mövcud olmalıdır. Yuxarıdakı nümunədə `MyComponent` funksiyası elə `render()` çağırışı ilə eyni yerdə tərif olunduğu üçün hər şey işlədi. Real layihələrdə isə adətən komponentləri ayrı fayllarda yazıb `import` edəcəksiniz — beləliklə onlar lazım olan scope-a düşür.

---

## Nəticə

JSX-in HTML-ə bənzəməsi aldadıcı ola bilər — arxasında ciddi qaydalar var: teq adının hərf ölçüsü onun HTML yoxsa komponent olduğunu müəyyən edir, tanınmayan atributlar xəbərdarlıq doğurur, tanınmayan komponentlər isə kodu tamamilə saxlayır.

Amma məhz bu qaydalar sayəsində JSX güclü olur: semantik teqlərlə mürəkkəb səhifə strukturunu bir baxışda oxunaqlı yazmaq, sonra da təkrarlanan hissələri öz komponentinizin arxasında gizlədib, onları sadə bir teq kimi yenidən istifadə etmək mümkün olur.

**Qısaca:** HTML teqləri kiçik hərflə — brauzerin başa düşdüyü dil. Sənin komponentlərin böyük hərflə — sənin öz vokabulyarın. İkisi birlikdə JSX-i həm tanış, həm də genişlənə bilən edir.
