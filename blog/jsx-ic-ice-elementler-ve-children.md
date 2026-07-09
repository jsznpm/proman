# JSX-də komponentlər bir-birinin içinə necə yerləşir? `props.children` sirri

HTML-də `<li>` teqi tək başına mənasızdır — o ancaq `<ul>` və ya `<ol>`-un içində, valideyn-övlad (parent-child) münasibətində mövcud olur. React komponentləri yazanda da eyni məntiqlə qarşılaşırsınız: bir komponenti başqa bir komponentin içinə necə "soxmaq" olar? Cavab `props.children` adlı xüsusi bir mexanizmdədir.

---

## Komponentləri iç-içə yerləşdirmək

JSX-in gücü elementlər arasında valideyn-övlad münasibəti qura bilməsindədir. Övlad element sadəcə başqa bir komponentin daxilinə yazılmaqla yaranır:

```jsx
import * as ReactDOM from "react-dom";
import MySection from "./MySection";
import MyButton from "./MyButton";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <MySection>
    <MyButton>My Button Text</MyButton>
  </MySection>
);
```

Burada iki öz komponentiniz import olunub: `MySection` və `MyButton`. Kodda `<MyButton>`, `<MySection>`-un övladı kimi yazılıb. Maraqlısı budur ki, `MyButton` özü də bir mətni ("My Button Text") övlad kimi qəbul edir — başqa JSX elementi yox, sadəcə mətn.

Bu münasibəti reallaşdıran mexanizmi görək.

## `props.children` necə işləyir

`MySection` komponentinə baxaq:

```jsx
export default function MySection(props) {
  return (
    <section>
      <h2>My Section</h2>
      {props.children}
    </section>
  );
}
```

Komponent adi bir `<section>` HTML elementi, bir başlıq (`<h2>`) və sonra `{props.children}` qaytarır. Məhz bu son sətir komponentə "içinə nə yazılıbsa, onu bura render et" imkanı verir.

> **`props.children` — komponentin daxilinə yazdığınız hər şeyi (JSX, mətn, başqa komponentlər) təmsil edən xüsusi bir prop-dur.** Onu adi HTML-də `<div>...</div>` teqinin arasına nə yazsanız görünməsinə bənzədə bilərsiniz — fərq odur ki, burada bu "araya yazılan hissə" `props.children` adlı dəyişən vasitəsilə komponentin öz nəzarətinə keçir.

İndi `MyButton` komponentinə baxaq — eyni naxış təkrarlanır:

```jsx
export default function MyButton(props) {
  return <button>{props.children}</button>;
}
```

`MyButton` da eyni qaydadan istifadə edir: `{props.children}` dəyərini götürüb `<button>` teqinin arasına qoyur. Bizim nümunədə bu, "My Button Text" mətnidir.

## Zəncirvari ötürülmə: `MySection` heç nə bilmədən köməkçi olur

Bu nümunədə buton mətni `MyButton`-un övladıdır, `MyButton` isə öz növbəsində `MySection`-un övladıdır. Amma diqqətli olun: buton mətni `MySection`-un **içindən keçərək** şəffaf şəkildə ötürülür.

Başqa sözlə — `MySection` komponentinin daxilində `MyButton`-a mətn çatdırmaq üçün heç bir əlavə kod yazmadıq. `MySection` sadəcə "mənim içimə nə qoyulubsa, onu göstər" dedi (`{props.children}` vasitəsilə), React isə qalanını öz üzərinə götürdü.

Render olunan nəticə belə görünür: bir bölmə (`<section>`) başlığı ilə, altında isə "My Button Text" yazılı bir düymə.

> **Vacib fikir:** `props.children` sayəsində komponentlər öz daxilində nə olduğunu bilmədən belə, onu düzgün yerə yerləşdirə bilir. Bu, React-də "wrapper" (bükücü) komponentlər yaratmağın əsasını təşkil edir — məsələn, kart, modal, layout kimi strukturlar məhz bu üsulla qurulur.

Bu qədər: statik komponentlər öyrəndik — bir dəfə render olunub, sonra heç vaxt dəyişməyən strukturlar. Amma React-i güclü edən əsl şey budur ki, JSX daxilinə **canlı JavaScript ifadələri** də yazıla bilir. İndi bunu görək.

---

## JavaScript ifadələri: JSX-in dinamik ürəyi

JSX-in xüsusi bir sintaksisi var ki, onun sayəsində adi JavaScript ifadələrini markup-un içinə "əkmək" mümkündür. React JSX-i hər render etdiyi zaman, `{}` mötərizələri arasındakı bu ifadələr yenidən hesablanır.

> **Elə bu xüsusiyyət JSX-in dinamikliyinin əsasını təşkil edir:** komponentin göstərdiyi məzmun və atributlar, tətbiqin datası və ya state-i dəyişdikcə avtomatik yenilənir. React hər render/re-render zamanı bu ifadələri yenidən qiymətləndirir ki, ekranda görünən UI həmişə cari data ilə üst-üstə düşsün.

## Dinamik atribut və mətn dəyərləri

Bəzi HTML atributları və ya mətn dəyərləri statikdir — JSX yenidən render olunanda dəyişmir. Digərləri isə tətbiqin başqa yerində saxlanan dataya əsaslanır. Unutmayın: React sadəcə "görünüş qatı"dır (view layer) — datanın özü haradasa kənarda yaşayır.

Nümunəyə baxaq:

```jsx
import * as ReactDOM from "react-dom";

const enabled = false;
const text = "A Button";
const placeholder = "input value...";
const size = 50;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <section>
    <button disabled={!enabled}>{text}</button>
    <input placeholder={placeholder} size={size} />
  </section>
);
```

Bu kodda `{}` mötərizələri arasına düzərli JavaScript ifadəsi qoymaq mümkündür — dəyişən adı, obyekt propertisi, hətta iç-içə JSX də ola bilər. Diqqət edin: `disabled={!enabled}` ifadəsi `!enabled`-i hesablayır, yəni bir boolean (məntiqi) dəyər yaradır — `enabled` `false` olduğu üçün `!enabled` `true` olur və buton "disabled" (deaktiv) görünür.

`{text}`, `{placeholder}`, `{size}` isə sadəcə əvvəldən təyin olunmuş dəyişənlərin dəyərini JSX-in içinə köçürür.

> **Qısa qayda:** `{}` mötərizələrinin arasına — istər atributda, istərsə mətndə — hər hansı düzgün JavaScript ifadəsi yaza bilərsiniz. Bu, sadə bir dəyişən adından tutmuş mürəkkəb funksiya çağırışına qədər hər şey ola bilər.

İlkin (primitiv) JavaScript dəyərlərini (string, number, boolean) JSX-də istifadə etmək asandır. Amma iş bununla bitmir — obyektlər, massivlər, hətta hadisələri (event) idarə edən funksiyalar da eyni `{}` sintaksisi ilə JSX-ə daxil edilə bilər. Bu, növbəti mövzudur.

---

## Nəticə

JSX-in gücü iki sadə fikirdə gizlənib: birincisi, `props.children` vasitəsilə komponentləri bir-birinin içinə yerləşdirmək və valideyn komponentin övladın məzmununu bilmədən belə onu düzgün yerə "köçürməsi"; ikincisi, `{}` mötərizələri ilə JSX-in içinə canlı JavaScript ifadələri əkmək imkanı.

**Qısaca:** statik JSX bir dəfə çəkilib qalan şəkil kimidir — dəyişən JSX isə datanı izləyən canlı ekrandır. `props.children` strukturu, `{}` ifadələri isə həyatı gətirir.
