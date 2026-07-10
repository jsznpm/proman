# Yüksək Performanslı State Yeniləmələri

**State** React tətbiqinin dinamik hissəsidir. State dəyişəndə komponentlər buna reaksiya verir. State olmasaydı, React sadəcə bəzəkli bir HTML şablon dili olardı.

Adətən bir state yeniləməsinin ekranda görünməsi o qədər sürətli baş verir ki, istifadəçi heç fərq etmir. Amma bəzən mürəkkəb state dəyişiklikləri nəzərəçarpan gecikmə yaradır. Bu bölmənin məqsədi məhz belə halları aydınlaşdırmaq və gecikmənin qarşısını necə almağı öyrənməkdir:

- State dəyişikliklərini bir yerə **batch** edərək minimal re-render əldə etmək
- İstifadəçi üçün vacib olan məzmunu əvvəlcə göstərmək üçün state yeniləmələrinə **prioritet** vermək
- Batching və prioritetləşdirmə ilə yanaşı **asinxron** əməliyyatları idarə etmək

---

## Batching nədir və niyə lazımdır?

Komponentdə state dəyişəndə React həmin dəyişikliyə uyğun DOM hissəsini yenidən render edir. Məsələn, `<span>` içində göstərilən `name` state-i `Adam`-dan `Ashley`-ə dəyişəndə, bu göz qırpımında baş verən sadə bir yeniləmədir.

Problem odur ki, real tətbiqlərdə state dəyişiklikləri belə sadə olmur. 10 millisaniyə ərzində `name` state-i belə bir ardıcıllıqla dəyişə bilər:

```
Adam → Ashley → Andrew → Ashley → Aaron → Adam
```

Altı dəyişiklik var, amma sonda yenə `Adam`-a qayıdırıq. Yəni React əgər hər dəyişiklikdə ayrıca render etsəydi, 5 render tamamilə boşa gedərdi. Animasiyalar, drag-and-drop, `setTimeout`/`setInterval` kimi tez-tez state dəyişən ssenarilərdə bu boşa gedən render-lər performansı ciddi zədələyir.

Bunun həlli **batching**-dir: React eyni anda edilən bir neçə state dəyişikliyini tək bir yeniləmə kimi qəbul edir. Hər dəyişiklikdə ayrıca DOM render etmək əvəzinə, hamısı birləşdirilir və nəticədə cəmi bir DOM re-render baş verir.

---

## React 17 vs React 18

**React 17**-də avtomatik batching yalnız **event handler**-lərin daxilində işləyirdi. Məsələn, `onClick` içində 5 state dəyişikliyi olsa, React bunları birləşdirib bir render edirdi.

Problem asinxron çağırışlarda çıxır. Adətən data fetch edib sonra `then()` və ya `setTimeout` callback-i içində state dəyişdiririk — bu artıq event handler-in "içində" sayılmır. React 17 belə halları batch etmirdi.

Bunu göstərmək üçün düymə basılanda 100 state dəyişikliyi edən komponentə baxaq:

```jsx
import * as React from "react";

export default function BatchingUpdates() {
  let [value, setValue] = React.useState("loading...");

  function onStart() {
    setTimeout(() => {
      for (let i = 0; i < 100; i++) {
        setValue(`value ${i + 1}`);
      }
    }, 1);
  }

  return (
    <div>
      <p>
        Value: <em>{value}</em>
      </p>
      <button onClick={onStart}>Start</button>
    </div>
  );
}
```

Burada `setTimeout` içində 100 dəfə `setValue()` çağırılır. Yalnız sonuncu çağırışın nəticəsi əhəmiyyətlidiksə də, **React 17**-də bu, `setTimeout` callback-i olduğu üçün batch olunmur — React profiler-də 100 ayrı render görünür.

**React 18**-də isə vəziyyət fərqlidir: avtomatik batching artıq hər yerdə işləyir, `setTimeout`, `Promise.then()`, hətta native event handler-lər daxil. Eyni komponenti React 18 ilə işlədəndə profiler-də bir dənə render görünür — komponent kodunda heç bir dəyişiklik etmədən.

Bunun üçün tək şərt var: kök komponenti köhnə `ReactDOM.render()` əvəzinə yeni API ilə render etmək lazımdır.

Köhnə üsul:

```jsx
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

Yeni üsul:

```jsx
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

`createRoot()` ilə render edildikdə React 18 tətbiq boyu bütün state yeniləmələrini avtomatik batch edir. Artıq ayrıca optimallaşdırma barədə düşünməyə ehtiyac yoxdur.

---

## State yeniləmələrinə prioritet vermək

Batching hər state dəyişikliyini eyni səviyyədə görür. Amma bəzən bir state yeniləməsi digərindən daha vacibdir.

Məsələn, böyük bir siyahı render olunarkən brauzer bir anlıq tamamilə məşğul olur və istifadəçi səhifə ilə qarşılıqlı əlaqədə ola bilmir. Bu adətən problem deyil — lakin istifadəçi elə həmin anda bir input-a yazırsa, gözlədiyi hərfin dərhal ekranda görünməsidir. Əgər komponent böyük siyahı render etməklə məşğuldursa, input-un state-i dərhal yenilənə bilmir.

Bunun üçün React `startTransition()` adlı yeni bir **prioritetləşdirmə API**-si təqdim edir. `startTransition()` funksiyasına ötürülən state dəyişiklikləri **aşağı prioritetli keçid (transition)** kimi işarələnir — yəni daha vacib yeniləmələr varsa, bunlar gözləyə bilər.

`startTransition()`-i işlətmək üçün ümumi qayda:

- Çox render işi tələb edən istənilən əməliyyat üçün
- İstifadəçi qarşılıqlı əlaqəsinə dərhal cavab tələb etməyən istənilən əməliyyat üçün

25,000 elementlik siyahını filtr edən nümunəyə baxaq. Əvvəlcə data və state:

```jsx
let unfilteredItems = new Array(25000)
  .fill(null)
  .map((_, i) => ({ id: i, name: `Item ${i}` }));
```

```jsx
let [filter, setFilter] = React.useState("");
let [items, setItems] = React.useState([]);
```

`filter` — input-un dəyəri, `items` isə filtrlənmiş nəticələr. Render edilən JSX sadədir: bir `<input>` və filtrlənmiş elementləri göstərən `<ul>`.

```jsx
<div>
  <div>
    <input
      type="text"
      placeholder="Filter"
      value={filter}
      onChange={onChange}
    />
  </div>
  <div>
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  </div>
</div>
```

Filtr `onChange` handler-i belə görünür:

```jsx
const onChange = (e) => {
  setFilter(e.target.value);
  setItems(
    e.target.value === ""
      ? []
      : unfilteredItems.filter((item) => item.name.includes(e.target.value))
  );
};
```

Bu kodda problem var: `setFilter()` və `setItems()` batch olunub tək bir yeniləmə kimi işlənir. Yəni input-un dəyəri ekranda görünməzdən əvvəl minlərlə elementin render olunmasını gözləməli oluruq. Nəticədə yazarkən input "gecikir".

Həll — `setItems()` çağırışını `startTransition()` içinə köçürmək:

```jsx
const onChange = (e) => {
  setFilter(e.target.value);
  React.startTransition(() => {
    setItems(
      e.target.value === ""
        ? []
        : unfilteredItems.filter((item) => item.name.includes(e.target.value))
    );
  });
};
```

`setFilter()` kodu olduğu kimi qalır — dəyişən yalnız `setItems()`-in yeri. React-a deyirik: bu state dəyişikliyini digər (daha vacib) dəyişikliklər bitdikdən sonra icra et. Nəticədə input dərhal reaksiya verir, siyahı isə arxa planda, bir az gecikmə ilə yenilənir.

> `startTransition()`-dan əvvəl proqramçılar bunu `setTimeout()` ilə "əl ilə" simulyasiya etməyə çalışırdı. Fərq budur: React-ın öz **scheduler**-i bu dəyişikliklərin prioritetindən xəbərdardır — məsələn, keçid bitmədən yeni state gəlsə və ya komponent unmount olsa, React onu ləğv edə bilir. `setTimeout` bunu edə bilməz.

---

## Asinxron state yeniləmələri və `isPending` tələsi

Real tətbiqlərdə iş təkcə prioritetləşdirmə deyil — həm də data-nı **asinxron** gətirib prioritetlə uzlaşdırmaqdır.

`startTransition()`-i Hook kimi də işlətmək olar: `useTransition()`. Bu, keçidin hələ davam edib-etmədiyini göstərən bir **boolean** (`isPending`) qaytarır — istifadəçiyə "yüklənir" göstərmək üçün faydalıdır.

Əvvəlki nümunəni asinxron fetch funksiyası ilə genişləndirək:

```jsx
function filterItems(filter) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(unfilteredItems.filter((item) => item.name.includes(filter)));
    }, 1000);
  });
}
```

```jsx
export default function AsyncUpdates() {
  const [isPending, startTransition] = React.useTransition();
  const [isLoading, setIsLoading] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const [items, setItems] = React.useState([]);

  const onChange = (e) => {
    setFilter(e.target.value);
    startTransition(() => {
      if (e.target.value === "") {
        setItems([]);
      } else {
        filterItems(e.target.value).then((result) => {
          setItems(result);
        });
      }
    });
  };

  return (...);
}
```

`isPending`-i "yüklənir" mesajı üçün işlətmək məntiqli görünür:

```jsx
<div>
  {isPending && <em>loading...</em>}
  <ul>
    {items.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
</div>
```

Amma burada gizli bir problem var. Yazarkən "loading..." mesajı bir anlıq görünüb yox olur, sonra isə (data hələ gəlməmiş olsa belə) heç bir işarə olmadan gözləmə davam edir.

Səbəb: `isPending` yalnız `startTransition()`-a ötürülən funksiya **işə düşənə qədər** `true`-dur. Fetch davam edərkən və ya `setItems()` böyük siyahını render edərkən `isPending` artıq `false`-dur — çünki bu proseslər `startTransition` funksiyasının "içində", amma onun başlaması ilə bitməsi arasında deyil, sadəcə planlaşdırılmış state dəyişiklikləri kimi izlənilir.

> Daha dəqiq desək: `isPending` "yüksək prioritetli yeniləmələr hələ işləyir" mənasını verir, "mənim asinxron işim davam edir" demək deyil. Bunu `highPriorityUpdatesPending` adlandırsaq, çaşqınlıq azalar.

Düzgün həll — ayrıca `isLoading` state-i saxlamaq:

```jsx
const [isLoading, setIsLoading] = React.useState(false);
const [filter, setFilter] = React.useState("");
const [items, setItems] = React.useState([]);
```

`onChange` handler-i fetch başlayanda `isLoading`-i `true` edir, nəticə gələndə isə `false`-a qaytarır:

```jsx
const onChange = (e) => {
  setFilter(e.target.value);
  setIsLoading(true);
  React.startTransition(() => {
    if (e.target.value === "") {
      setItems([]);
      setIsLoading(false);
    } else {
      filterItems(e.target.value).then((result) => {
        setItems(result);
        setIsLoading(false);
      });
    }
  });
};
```

Göstərici artıq `isPending` yox, `isLoading` əsasında işləyir:

```jsx
<div>
  {isLoading && <em>loading...</em>}
  <ul>
    {items.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
</div>
```

İndi `setIsLoading()` və `setFilter()` yüksək prioritetli olduğu üçün dərhal icra olunur, `filterItems()` fetch-i isə yalnız bunlardan sonra başlayır. Data gələnə qədər "loading" görünür, gələndən sonra isə dərhal itir — davranış artıq proqnozlaşdırıla bilər.

---

## Nəticə

Bu bölmənin əsas mesajı:

- **React 18** avtomatik batching-i bütün kontekstlərə (o cümlədən `setTimeout`, `Promise`, asinxron callback-lər) yayır — tək şərt kök komponentin `createRoot()` ilə render olunmasıdır.
- **`startTransition()`** çox render işi tələb edən və istifadəçidən dərhal reaksiya tələb etməyən state dəyişikliklərini aşağı prioritetli elan edir; React onları lazım gələrsə ləğv edə və ya təxirə sala bilir.
- **`isPending`** yalnız yüksək prioritetli yeniləmələrin bitib-bitmədiyini göstərir, asinxron fetch-in və ya böyük render-in tam bitdiyini deyil — bunun üçün ayrıca `isLoading` state-i saxlamaq lazımdır.

Qısacası: batching lazımsız render-ləri aradan qaldırır, `startTransition` isə qalan render işini vacibliyinə görə sıralayır. İkisi birlikdə React-ın mürəkkəb state dəyişikliklərini istifadəçiyə hiss etdirmədən idarə etməsinə imkan verir.