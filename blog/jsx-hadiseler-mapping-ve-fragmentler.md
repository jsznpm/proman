# React-də hadisələr, kolleksiyalar və "boş" teqlər: JSX-in son üç fəndi

Əvvəlki yazıda `props.children` və `{}` ifadələri ilə JSX-in necə canlandığını gördük. İndi sıra praktik məsələlərə çatır: istifadəçi düyməyə basanda nə olur? Massivdəki datanı necə siyahıya çeviririk? Və hər dəfə lazımsız `<div>` yazmadan elementləri necə qruplaşdırırıq? Bu üç sual — hadisələr, mapping və fragmentlər — gündəlik React işinin böyük hissəsini təşkil edir.

---

## Hadisələri idarə etmək

Ənənəvi JavaScript-də düymə klikini izləmək üçün `addEventListener` çağırıb, sonra lazım olanda `removeEventListener` ilə təmizləməli olursunuz. React bu prosesi tamamilə sadələşdirir: funksiyanı birbaşa komponentin propertisinə ötürürsünüz.

```jsx
import * as ReactDOM from "react-dom";

const handleClick = () => {
  console.log("Button clicked!");
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <section>
    <button onClick={handleClick}>Click me</button>
  </section>
);
```

Burada `handleClick` adlı funksiya var. `<button>` elementinin `onClick` atributuna bu funksiyanı ötürürük. Düyməyə hər basılanda React `handleClick`-i özü çağırır — nə əlavə "dinləyici qoşmaq", nə də sonradan "açmaq" lazımdır.

> **Qısa qayda:** React-də hadisə idarəetməsi elan edicidir (declarative) — siz "bu hadisə olanda bunu et" deyirsiniz, React isə qoşulma/açılma məntiqini öz üzərinə götürür.

Səthin altında React bunu necə effektiv edir? Cavab **event delegation** (hadisə nümayəndəliyi) adlanan texnikadadır.

> **React hər elementə ayrıca dinləyici qoşmur.** Bunun əvəzinə, tətbiqin kökünə (və ya bir valideyn komponentə) tək bir hadisə dinləyicisi qoşur. Uşaq elementdə hadisə baş verəndə, o, komponent ağacı boyunca yuxarı "qabarır" (bubbling), nəhayət dinləyicisi olan valideynə çatır. React-in "synthetic event" sistemi isə hadisənin `target` xüsusiyyətinə baxaraq, hansı komponentin bu hadisəni idarə etməli olduğunu müəyyən edir.

Bunu belə təsəvvür edin: min otaqlı bir binada hər otağa ayrıca zəngçi qoymaq əvəzinə, bina girişində tək bir təhlükəsizlik məntəqəsi olsun və hər otaqdan gələn siqnal ora ötürülsün. React da elementlərə tək-tək dinləyici "yapışdırmaq" əvəzinə, məhz bu mərkəzləşdirilmiş yanaşmanı seçib — performans üçün.

Bu yanaşmanın praktik faydası budur: hadisələri asanlıqla uşaq komponentlərdən valideyn komponentlərə ötürə, hətta bir neçə səviyyəli iç-içə komponent arasında yaya bilirsiniz. Bu, modul və təkrar istifadə oluna bilən komponent arxitekturası qurmağa kömək edir.

`onClick`-dən başqa, React `onChange`, `onSubmit`, `onMouseOver` kimi bütün standart hadisələri dəstəkləyir. Bu hadisə funksiyalarını düymələrə, input-lara, checkbox-lara və digər elementlərə eyni qaydada qoşa bilərsiniz.

Bir mühüm qeyd: React-də data axını **birtərəflidir** (unidirectional) — data həmişə valideyndən övlada axır. Uşaq komponentdən valideynə data ötürmək istəyirsinizsə, bunu callback funksiyalar vasitəsilə edirsiniz: valideyn bir funksiya təyin edir, onu prop kimi uşağa ötürür, uşaq isə lazım olan datanı bu funksiyaya arqument kimi verib çağırır.

## Kolleksiyaları elementlərə çevirmək (mapping)

Bəzən JSX-in strukturunu dəyişən JavaScript ifadələri lazım olur — məsələn, bir massivdəki hər elementə uyğun `<li>` yaratmaq. Bunun üçün ən yaxşı üsul kolleksiyanı `.map()` ilə JSX elementlərinə "xəritələndirməkdir" (map etməkdir).

> Bu yazıda "kolleksiya" deyəndə həm sadə obyektləri, həm massivləri, ümumiyyətlə isə iterasiya oluna bilən (iterable) hər şeyi nəzərdə tuturuq.

```jsx
import * as ReactDOM from "react-dom";

const array = ["First", "Second", "Third"];
const object = {
  first: 1,
  second: 2,
  third: 3,
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <section>
    <h1>Array</h1>
    <ul>
      {array.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
    <h1>Object</h1>
    <ul>
      {Object.keys(object).map((i) => (
        <li key={i}>
          <strong>{i}: </strong>
          {object[i]}
        </li>
      ))}
    </ul>
  </section>
);
```

Birinci kolleksiya — `array` adlı, string dəyərlərlə dolu bir massiv. JSX-də `array.map()` çağırılır, bu da yeni bir massiv qaytarır. Map funksiyası hər elementə qarşılıq bir JSX elementi (`<li>`) qaytardığı üçün, massivin hər üzvü artıq markup-da təmsil olunur.

`object` kolleksiyası üçün eyni texnika işlədilir, sadəcə fərq budur ki, əvvəlcə `Object.keys()` çağırıb obyektin açarlarını massivə çeviririk, sonra həmin massivi map edirik. Kolleksiyanı JSX elementlərinə xəritələndirməyin gözəlliyi ondadır ki, UI-nin strukturunu birbaşa datanın özü ilə idarə edə bilirsiniz — imperativ (addım-addım) məntiqə ehtiyac qalmır.

> **Diqqət:** `.map()` ifadəsinin nəticəsi bir massivdir, amma narahat olmayın — JSX massiv şəklində elementləri necə render etməyi bilir. Yenidən render (re-render) zamanı React-in dəyişiklikləri effektiv izləyə bilməsi üçün massivdəki hər komponentə unikal bir `key` prop-u vermək vacibdir.

Nə üçün `key` bu qədər vacibdir? React siyahıdakı elementləri müqayisə edərkən (əvvəlki render ilə indikini) hansı elementin qaldığını, hansının silindiyini, hansının sırasının dəyişdiyini bilməlidir. `key` olmasa, React yalnız sıra nömrəsinə güvənməli olur — bu isə siyahının ortasına yeni element əlavə olunanda səhv nəticələr, hətta performans itkisi yarada bilər.

## `<>...</>` ilə lazımsız teqlərdən qurtulmaq: fragmentlər

Komponent yazanda tez-tez belə bir vəziyyətlə rastlaşırsınız: iki-üç elementi qaytarmaq üçün onları mütləq bir `<div>`-in içinə salmalı olursunuz. Amma bu `<div>` heç bir real məqsədə xidmət etmir — sadəcə DOM-a əlavə bir qat (layer) qatır.

Əvvəlcə "problemli" versiyaya baxaq:

```jsx
export default function WithoutFragments() {
  return (
    <div>
      <h1>Without Fragments</h1>
      <p>
        Adds an extra <code>div</code> element.
      </p>
    </div>
  );
}
```

Bu komponentin əsl mahiyyəti `<h1>` və `<p>` teqləridir. Amma `render()`-dən onları qaytarmaq üçün mütləq bir sarğı (wrapper) elementinə — burada `<div>`-ə — bükmək lazım gəlib. Brauzerin dev tools-unda DOM-a baxsanız, bu `<div>`-in strukturuya əlavə bir səviyyədən başqa heç nə qatmadığını görərsiniz.

İndi isə eyni ideyanı fragment ilə yazaq:

```jsx
export default function WithFragments() {
  return (
    <>
      <h1>With Fragments</h1>
      <p>Doesn't have any unused DOM elements.</p>
    </>
  );
}
```

`<div>` ilə bükmək əvəzinə, `<>` işlədilib. Bu, xüsusi bir element növüdür və React-ə "yalnız içindəki övladları render et, özünü yox" deyir. `<>` sintaksisi əslində `React.Fragment` komponentinin qısaldılmış formasıdır. Bir qeyd: əgər fragment-ə `key` propu ötürmək lazımdırsa (məsələn, map edilən siyahıda), qısa `<>` sintaksisindən yox, açıq `<React.Fragment key={...}>` formasından istifadə etməlisiniz.

Fərqi DOM-da yoxlasanız aydın görünür: `WithFragments` komponentində heç bir artıq element yoxdur — düz `<h1>` və `<p>` teqləri, aralarında heç nə.

Təsəvvür edin ki, tətbiqinizdə bu cür onlarla, yüzlərlə komponent var — hər biri öz-özlüyündə mənasız bir `<div>` əlavə etsə, DOM nəhəng və gərəksiz strukturla dolar. Fragment məhz bunun qarşısını alır: komponent yalnız əsl lazım olan elementləri render edir, artıq heç nə əlavə olunmur.

---

## Nəticə

Bu fəsildə JSX-in üç praktik gücünü gördük. Birincisi, hadisə idarəetməsi: funksiyanı sadəcə `onClick` kimi bir prop-a ötürürsünüz, React isə qoşma/açma və event delegation məntiqini öz üzərinə götürür. İkincisi, kolleksiyaların `.map()` vasitəsilə JSX elementlərinə çevrilməsi — datanı UI-yə birbaşa əks etdirmə imkanı, `key` propu ilə effektiv yenilənmə. Üçüncüsü, fragmentlər — `<div>` kimi mənasız sarğı elementlərindən qurtulub, yalnız lazım olan HTML-i render etmək.

**Qısaca:** əvvəlki fəsildə JSX-i necə "canlandırmağı" öyrənmişdiksə, bu fəsildə onu necə **istifadəçi ilə danışdırmağı**, **datadan qurmağı** və **təmiz saxlamağı** öyrəndik. Bu üç fənd birlikdə, sonrakı fəsillərdə görəcəyimiz komponentlər, propertilər və state dünyasının təməlini qoyur.
