# İlk JSX tətbiqimiz: "Hello World" arxasında nə baş verir?

React öyrənməyə başlayanda hər kəs eyni yerdən keçir: ekrana "Hello World" yazdırmaq. Sadə görünür, amma bu bir sətir kodun arxasında React-in bütün fəlsəfəsi gizlənib — **deklarativ** düşüncə tərzi.

Bu yazıda çox sadə bir JSX nümunəsindən başlayacağıq, sonra "kapotun altına" baxıb görəcəyik ki, browser əslində bu kodu necə başa düşür.

---

## Ən sadə JSX nümunəsi

Budur, ilk JSX tətbiqimiz:

```jsx
import * as ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <p>
    Hello, <strong>JSX</strong>
  </p>
);
```

Burada üç addım var:

1. `document.getElementById("root")` ilə səhifədəki boş bir DOM elementini tapırıq.
2. `ReactDOM.createRoot()` həmin elementi React-in idarə edəcəyi bir "kök"ə (root) çevirir.
3. `root.render()` isə bu kökə nəyi çəkmək istədiyimizi deyir — bizim halda, içində qalın (`<strong>`) yazılmış "JSX" sözü olan bir paraqraf.

Nəticə çox sadədir: səhifədə "Hello, **JSX**" görünür. Əslində bunu adi HTML string kimi də DOM-a yerləşdirmək olardı. Amma məqsəd effekt deyil, JSX-in necə render olunduğunu göstərməkdir.

---

## JSX əslində browser üçün deyil

Burada vacib bir məqamı qeyd etmək lazımdır: **browser JSX-i başa düşmür.**

`<p>Hello, <strong>JSX</strong></p>` kimi görünən bu sintaksis əslində adi JavaScript deyil — HTML-ə bənzəyən, amma JS faylının içində yazılan xüsusi bir yazı formasıdır. Buna görə də kod browserə çatmadan əvvəl adi JavaScript-ə **çevrilməlidir**. Bu işi adətən Vite və ya Babel kimi alətlər görür.

Vite JSX-i emal edərkən onu `React.createElement()` çağırışlarına çevirir. Yuxarıdakı nümunə əslində belə koda "tərcümə" olunur:

```jsx
import * as ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  React.createElement(
    "p",
    null,
    "Hello, ",
    React.createElement("strong", null, "JSX")
  )
);
```

Diqqət edin: siz heç vaxt bu kodu özünüz yazmırsınız — bunu arxa planda Vite (və ya Babel) sizin üçün edir. Amma nə baş verdiyini bilmək vacibdir, çünki JSX-in "sehr" olmadığını, sadəcə funksiya çağırışları üçün rahat bir qısa yol (syntactic sugar) olduğunu göstərir.

`React.createElement()`-in arqumentlərinə baxaq:

- **Birinci arqument** — elementin tipi. Bu, DOM elementləri üçün `"div"`, `"p"` kimi bir string, ya da composite komponentlər üçün bir React komponenti ola bilər.
- **İkinci arqument** — həmin elementin prop-larını saxlayan obyekt (yoxdursa `null`).
- **Sonrakı arqumentlər** — elementin uşaqları (children).

---

## React elementi nədir?

`React.createElement()`-in qaytardığı nəticəyə **React elementi** deyilir. Bu, sadəcə adi bir JavaScript obyektidir — UI-nin bir hissəsinin necə görünməli olduğunu təsvir edən "sənəd" kimi düşünə bilərsiniz.

React bu obyektləri özü birbaşa DOM-a çevirmir, əvvəlcə onları öz daxili təmsilçisi olan **virtual DOM**-a əlavə edir. Sonra **reconciliation** adlanan bir alqoritm işə düşür: state dəyişəndə React köhnə və yeni virtual DOM-u müqayisə edir və yalnız fərqlənən yerləri real DOM-da yeniləyir.

> Başqa sözlə: state dəyişəndə React **bütün komponenti yenidən qurmur** — yalnız dəyişən minimal hissəni tapıb yeniləyir. Bu da React-i sürətli edən əsas səbəblərdən biridir.

---

## Deklarativ olmaq nə deməkdir?

Yuxarıdakı "Hello World" nümunəsinə diqqətlə baxsaq, kodun **nəyi** göstərmək istədiyimizi izah etdiyini görərik — **necə** göstərəcəyini yox. JSX-ə baxaraq deyə bilərik ki, "bu komponent bir paraqraf və onun içində qalın yazı render edəcək". Vəssalam.

İmperativ yanaşmada isə vəziyyət fərqli olardı: əvvəlcə paraqraf elementi yaratmalı, sonra ona mətn əlavə etməli, sonra `<strong>` elementi yaratmalı, onu paraqrafa uşaq kimi əlavə etməli və bütün bunları müəyyən ardıcıllıqla etməli olardıq. Nə qədər çox addım olsa, bir o qədər səhv ehtimalı artır.

> **JSX deklarativdir, çünki o, nəticəni təsvir edir — addımları deyil.**

React-in `render()` funksiyası məhz bunu edir: siz UI-nin necə görünməli olduğunu təsvir edirsiniz, React isə bunu ən effektiv şəkildə real DOM-a çevirməyi öz üzərinə götürür.

---

## HTML teqlərini birbaşa render etmək

JSX-in ən praktik tərəflərindən biri budur ki, adi HTML teqlərini heç bir əlavə tərif və ya import olmadan birbaşa istifadə edə bilirsiniz. Çünki React bu teqlər üçün özündə hazır komponentlər saxlayır — sizin hər dəfə `div` və ya `button` üçün ayrıca komponent yazmağınıza ehtiyac yoxdur.

Bir neçə HTML tegini eyni anda render edən nümunəyə baxaq:

```jsx
import * as ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div>
    <button />
    <code />
    <input />
    <label />
    <p />
    <pre />
    <select />
    <table />
    <ul />
  </div>
);
```

Bu nümunədə çıxışın necə görünəcəyi əhəmiyyətli deyil — məqsəd sadəcə odur ki, istənilən HTML teqini xüsusi tərif yazmadan JSX-də sərbəst render edə bilirik.

Diqqət etdinizsə, bütün teqlər bir `<div>`-in içinə yığılıb. Bunun səbəbi sadədir: **React-in render etmək üçün tək bir kök elementə ehtiyacı var.** Kitabın sonrakı hissələrində bu qonşu elementləri əlavə bir valideyn teq olmadan necə render etmək olduğunu da öyrənəcəyik.

JSX-də render olunan HTML elementləri əsasən adi HTML sintaksisinə oxşayır, sadəcə "case-sensitivity" (böyük-kiçik hərf fərqi) və atributlarla bağlı bəzi kiçik fərqlər var — bunları irəlidə ətraflı araşdıracağıq.

---

## Nəticə

İlk baxışdan JSX sadə bir HTML-yə bənzəyən sintaksis kimi görünür. Amma arxasında güclü bir fikir dayanır: **kod nəyi göstərmək istədiyinizi təsvir edir, necə göstərəcəyini yox.**

Vite və ya Babel kimi alətlər bu JSX-i `React.createElement()` çağırışlarına çevirir, bu çağırışlar isə React elementləri yaradır — React bu elementlər üzərində reconciliation aparıb real DOM-u effektiv şəkildə yeniləyir.

Qısaca desək: **imperativ dünyada siz "necə" sualına cavab verirsiniz, JSX dünyasında isə sadəcə "nə" sualına cavab verirsiniz — qalanını React öz üzərinə götürür.**
