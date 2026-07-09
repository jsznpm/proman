# React Komponentləri: Props Necə İşləyir?

React tətbiqi əslində kiçik, təkrar istifadə oluna bilən tikinti bloklarından ibarətdir — bu bloklara **komponent** deyilir. Amma komponent təkbaşına heç nə etmir; onu canlı edən şey ona ötürülən **məlumatdır**. Bu yazıda həmin məlumatın əsas formasından — **props**-dan (properties) danışacağıq: nədir, necə ötürülür, default dəyər necə təyin olunur və real nümunədə necə işləyir.

## Komponent nədir?

React komponenti sadəcə JSX qaytaran bir JavaScript funksiyasıdır (bəzən class da ola bilər, amma bu gün demək olar hər yerdə **function component** istifadə olunur — daha qısa, daha sadə, daha rahat oxunur).

```jsx
const MyComponent = () => {
  return <h1>Salam</h1>;
};
```

Komponentin gücü təkrar istifadə oluna bilməsindədir: eyni komponenti tətbiqin fərqli yerlərində, fərqli məlumatla dəfələrlə çağıra bilərsən. Bu, kodun təkrarlanmasını azaldır və UI-ni kiçik, idarə oluna bilən parçalara bölməyə imkan verir.

> Komponenti "qəlib" kimi düşün. Qəlib özü sabitdir, amma ona tökdüyün material (props) hər dəfə fərqli nəticə yarada bilər.

## Props nədir?

**Props** (properties-in qısaldılmışı) valideyn komponentdən uşaq komponentə ötürülən məlumatdır. Props-un məqsədi komponenti konfiqurasiya edilə bilən və çevik etməkdir — eyni komponentə fərqli props versən, fərqli nəticə alarsan.

Vacib qayda: **props read-only-dur**, yəni uşaq komponent onu birbaşa dəyişə bilməz. Əgər dəyər dəyişməlidirsə, bunu valideyn edir və yeni props ilə uşaq komponenti yenidən render edir.

Function komponentdə props sadəcə funksiyanın parametridir:

```jsx
const MyComponent = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
};
```

Burada `props` bir obyektdir, ona `props.title`, `props.description` kimi nöqtə notasiyası ilə çatırıq.

Daha təmiz yol — **destructuring** ilə birbaşa parametrdə açmaq:

```jsx
const MyComponent = ({ title, description }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};
```

Bu yanaşma daha oxunaqlıdır və həm də (aşağıda görəcəyimiz) default dəyər verməyə imkan yaradır.

## Props-u necə ötürürük?

Props JSX-də adi HTML atributu kimi ötürülür. Fərqli tip props qəbul edən iki komponentə baxaq:

```jsx
const MyButton = ({ disabled, text }) => {
  return <button disabled={disabled}>{text}</button>;
};
```

Bu komponent `disabled` (boolean) və `text` (string) qəbul edir. Diqqət et: JavaScript ifadəsi ötürəndə (misal, dəyişən və ya boolean) mütləq `{}` içinə al.

Array qəbul edən komponent nümunəsi:

```jsx
const MyList = ({ items }) => (
  <ul>
    {items.map((i) => (
      <li key={i}>{i}</li>
    ))}
  </ul>
);
```

`MyList` `items` adlı array qəbul edir və `.map()` ilə hər elementi `<li>`-yə çevirir. `key` atributu React-a hansı elementin hansı olduğunu ayırd etməyə kömək edir (siyahı elementləri üçün mütləqdir).

İndi bu komponentləri real tətbiqdə istifadə edək:

```jsx
import * as ReactDOM from "react-dom";
import MyButton from "./MyButton";
import MyList from "./MyList";
import MyComponent from "./MyComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));

const appState = {
  text: "My Button",
  disabled: true,
  items: ["First", "Second", "Third"],
};

function render(props) {
  root.render(
    <main>
      <MyComponent
        title="Welcome to My App"
        description="This is a sample component."
      />
      <MyButton text={props.text} disabled={props.disabled} />
      <MyButton text="Another Button" disabled />
      <MyList items={props.items} />
    </main>
  );
}

render(appState);

setTimeout(() => {
  appState.disabled = false;
  appState.items.push("Fourth");
  render(appState);
}, 1000);
```

Burda `render()` funksiyası hər çağırışda yeni komponent yaradırmış kimi görünür, amma React bunu belə görmür — o, mövcud komponentləri tanıyır və yalnız köhnə ilə yeni props arasındakı **fərqi** hesablayıb DOM-u ona uyğun yeniləyir (bu mexanizmə "reconciliation" deyilir).

`setTimeout` 1 saniyə sonra `appState.disabled`-i `false` edir və `items` array-ə "Fourth" əlavə edir, sonra yenidən `render()` çağırılır — yəni komponentlər yeni props ilə yenidən çəkilir.

Burdan çıxan vacib nəticə: `appState` obyekti tətbiqin vəziyyətini (state) saxlayır, amma **komponentin özündə deyil, kənarında** yaşayır. Bu parçalar render zamanı props kimi komponentlərə ötürülür. (State-in komponentin daxilində necə saxlanıla biləcəyini isə bu yazının davamında — Hooks bölməsində — göstərəcəyik.)

Nümunədə diqqət çəkən başqa məqam:

```jsx
<MyButton text="Another Button" disabled />
```

Sabit (constant) dəyər ötürəndə string-i `{}` içinə almağa ehtiyac yoxdur, sadəcə dırnaq içində yazmaq kifayətdir. Boolean `true` ötürmək üçünsə atributun adını yazıb dəyəri heç yazmamaq kifayətdir (`disabled` = `disabled={true}`).

## Default props

Əgər valideyn komponent bir props ötürməzsə, komponent yenə də düzgün işləməlidir. Bunun üçün **default dəyərlər** təyin edirik.

Köhnə üsul — `defaultProps`:

```jsx
const MyButton = ({ disabled, text }) => (
  <button disabled={disabled}>{text}</button>
);

MyButton.defaultProps = {
  disabled: false,
  text: "My Button",
};
```

Əgər valideyn `text` və ya `disabled` ötürməsə, komponent yuxarıdakı default dəyərlərə düşəcək.

Daha müasir və rahat yol — destructuring zamanı default dəyər vermək:

```jsx
const MyButton = ({ disabled = false, text = "My Button" }) => (
  <button disabled={disabled}>{text}</button>
);
```

Bu üsul daha təmizdir — props-u və onun default dəyərini eyni yerdə, funksiyanın imzasında görürsən. Xüsusilə çox props qəbul edən böyük komponentlərdə oxunaqlılığı xeyli artırır.

## Nəticə

Props React-in ən əsas ünsiyyət mexanizmidir: valideyn komponentdən uşağa məlumat axını təmin edir, komponentləri konfiqurasiya edilə bilən və təkrar istifadəyə yararlı edir. Yadda saxla:

- Props **read-only**-dur — uşaq komponent onu dəyişmir, valideyn yenisini ötürür.
- Destructuring props-u həm oxunaqlı edir, həm də default dəyər verməyə imkan yaradır.
- State tətbiqin "yaddaşıdır" — komponentə props kimi ötürülür, amma harda saxlanacağı ayrı məsələdir.

Props sənə **məlumatı ötürməyi** öyrədir, amma komponentin öz daxilində məlumatı necə saxlayıb dəyişəcəyi ayrı sualdır — məhz bunu React Hooks həll edir. Növbəti bölmədə komponent state-inə və Hooks-un gücünə keçəcəyik.
