# Komponent Öz Yaddaşını Necə Saxlayır? State və Hooks

Əvvəlki yazıda gördük ki, **props** valideyn komponentdən uşaq komponentə məlumat ötürmək üçündür, amma uşaq komponent onu dəyişə bilmir. Bəs komponent öz daxilində, kənar müdaxilə olmadan, dəyişə biləcəyi məlumatı necə saxlasın? Məsələn, istifadəçinin input-a yazdığı mətni, yoxlanılan checkbox-u, ya da API-dan gələn cavabı? Məhz bunun üçün **state** var.

## Component state nədir?

**State** — komponentin öz daxilində saxladığı, zaman keçdikcə dəyişə bilən məlumatdır. İstifadəçi input-a yazanda, API-dan cavab gələndə, ya da hər hansı digər dinamik məlumat yaranandaki React bu məlumatı state kimi izləyir.

> Props-u komponentə "xaricdən verilən material" kimi düşünsək, state komponentin "öz yaddaşıdır" — onu heç kim ötürmür, komponent özü yaradır və özü idarə edir.

State-in ən vacib xüsusiyyəti budur: **state dəyişəndə React komponenti avtomatik yenidən render edir**, beləliklə UI həmişə ən son məlumatı göstərir. Bunu əl ilə DOM-u yeniləməyə ehtiyac qalmadan React öz üzərinə götürür.

State-i function komponentdə istifadə etmək üçün `useState` **hook**-undan istifadə olunur. Amma əvvəlcə "hook" nə olduğunu aydınlaşdıraq.

## React Hooks nədir?

**Hooks** — React 16.8 versiyasında əlavə olunan xüsusiyyətdir və function komponentlərə state və digər React imkanlarını istifadə etməyə icazə verir. Hooks-dan əvvəl state idarəetməsi və lifecycle metodları yalnız class komponentlərdə mümkün idi. Hooks isə eyni funksionallığı function komponentlərdə daha sadə, daha oxunaqlı formada təqdim edir.

Hooks sadəcə funksiyalardır və adları `use` prefiksi ilə başlayır (`useState`, `useEffect`, `useContext` və s.). Onlar sənə React-in daxili mexanizmlərinə "qoşulmaq" imkanı verir. React özü bir neçə built-in hook təklif edir, həmçinin öz **custom hook**-larını da yarada bilərsən ki, təkrarlanan stateful məntiqi ayrıca funksiyaya çıxarasan.

Ən çox istifadə olunan built-in hook-lar bunlardır:

- **useState** — komponentə state əlavə edir. İki elementli array qaytarır: hazırkı state dəyəri və onu yeniləmək üçün funksiya.
- **useEffect** — komponentdə "side effect" icra etmək üçündür (data fetch, event-lərə subscribe olmaq, DOM-a əl ilə müdaxilə). Default olaraq hər render-dən sonra işləyir, komponentin mount/update/unmount anlarını idarə etmək üçün istifadə olunur.
- **useContext** — React context-dən dəyər oxumağa imkan verir, beləliklə komponentlər arasında props ötürmədən (prop-drilling olmadan) məlumat paylaşıla bilir.
- **useCallback** və **useMemo** — performans optimallaşdırması üçün. `useCallback` funksiyanı memoize edir (hər render-də yenidən yaradılmasının qarşısını alır), `useMemo` isə bir dəyəri memoize edir (yalnız asılılıqlar dəyişəndə yenidən hesablanır).

Gəl bu hook-ları bir-bir, real nümunələr üzərində araşdıraq.

## useState ilə state saxlamaq

### İlkin state dəyəri

Komponent ilk dəfə render olunanda state-in bir başlanğıc dəyəri olmalıdır. Buna **initial state** deyilir və `useState` hook-una arqument kimi ötürülür:

```jsx
export default function App() {
  const [name] = React.useState("Mike");
  const [age] = React.useState(32);

  return (
    <>
      <p>Mənim adım {name}</p>
      <p>Yaşım {age}</p>
    </>
  );
}
```

Burda iki state parçası var — `name` və `age` — buna görə də iki dəfə `useState` çağırılıb. **Qayda budur: hər state dəyəri üçün ayrıca `useState` çağır.** Nəzərən bir obyekt yaradıb bütün state-i bir `useState` içinə yığmaq da mümkündür, amma bu, dəyərlərə çatmağı və onları yeniləməyi çətinləşdirir. Şübhən varsa — hər dəyər üçün öz `useState`-in olsun.

`useState` çağıranda array qaytarılır. Array-in birinci elementi state-in özüdür. Array-destructuring istifadə etdiyimiz üçün dəyərə istədiyimiz adı verə bilirik — burda `name` və `age`. Hər ikisi ilk render-də dəyərə malikdir, çünki `useState`-ə başlanğıc dəyər ötürmüşük.

### State dəyərini yeniləmək

State komponentlərdə zaman keçdikcə dəyişən dəyərlər üçündür — məsələn, API yeni data qaytaranda, ya da istifadəçi input-u dəyişəndə. State-i yeniləmək üçün `useState` hər dəyər üçün ayrıca bir funksiya qaytarır — array-in ikinci elementi məhz budur:

```jsx
function App() {
  const [name, setName] = React.useState("Mike");
  const [age, setAge] = React.useState(32);

  return (
    <>
      <section>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <p>Mənim adım {name}</p>
      </section>
      <section>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <p>Yaşım {age}</p>
      </section>
    </>
  );
}
```

`input`-un `onChange` event-i tetiklənəndə `setName(e.target.value)` çağırılır — bu, `name` state-inin yeni dəyərini React-a bildirir. React bunu görüb komponenti (və altındaki bütün ağacı) yenidən render edir, beləliklə `<p>` içindəki mətn də dərhal yenilənir. `age` input-u da eyni prinsiplə işləyir, sadəcə `type="number"` istifadə olunub.

> Diqqət et: state dəyişəndə komponentin özü "yenidən çağırılmır" — React sadəcə köhnə və yeni render arasındaki fərqi tapıb DOM-un yalnız lazımi hissəsini yeniləyir.

Bu, **controlled input** adlanan nümunədir — input-un dəyəri həmişə state-dən gəlir, istifadəçi yazanda dəyər əvvəlcə state-ə, sonra yenidən input-a qayıdır.

## useEffect ilə initialization və cleanup

Çox vaxt komponent yaradılanda müəyyən əməliyyat icra etməli olur — məsələn, lazım olan API data-nı çəkmək. Həmçinin komponent silinəndə (unmount olanda) davam edən API sorğularını ləğv etmək lazım gəlir. Bunun üçün `useEffect` hook-u var.

### Komponent üçün data çəkmək

`useEffect` komponentdə "side effect" icra etmək üçündür. Function komponentin əsl işi JSX qaytarmaqdır; əgər komponent başqa bir şey etməlidirsə (məsələn API sorğusu), bu, `useEffect` daxilində edilməlidir. Əgər API sorğusunu birbaşa komponent funksiyasının içində etsən, race condition kimi çətin aşkarlanan bug-lar yarana bilər.

```jsx
function App() {
  const [id, setId] = React.useState("yüklənir...");
  const [name, setName] = React.useState("yüklənir...");

  const fetchUser = React.useCallback(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: 1, name: "Mike" });
      }, 1000);
    });
  }, []);

  React.useEffect(() => {
    fetchUser().then((user) => {
      setId(user.id);
      setName(user.name);
    });
  });

  return (
    <>
      <p>ID: {id}</p>
      <p>Ad: {name}</p>
    </>
  );
}
```

`useEffect`-ə arqument kimi funksiya ötürülür. Bu funksiya komponent render-i bitəndən sonra, React-in daxili işinə mane olmadan çağırılır.

`fetchUser` funksiyası `useCallback` ilə təyin olunub — bu hook funksiyanı memoize edir, yəni asılılıqlar dəyişməyincə funksiya yenidən yaradılmır. `useCallback` iki arqument götürür: memoize olunacaq funksiya, və asılılıq siyahısı. Burda boş array (`[]`) ötürülüb, deməli funksiya yalnız ilk render-də yaradılır, sonrakı render-lərdə təzədən yaradılmır.

`fetchUser` bir promise qaytarır, `setTimeout` isə real API sorğusu kimi 1 saniyəlik gecikmə yaradır. `useEffect` daxilində bu promise-i `.then()` ilə tutub `setId` və `setName` çağırılır — yəni data gələndə komponentin state-i yenilənir və nəticədə komponent yenidən render olunur, "yüklənir..." mətni yerini əsl data-ya verir.

### Əməliyyatları ləğv etmək və state-i sıfırlamaq

İstifadəçi tətbiqdə naviqasiya edərkən API sorğusu hələ tamamlanmamış ola bilər, komponent isə artıq ekrandan silinmiş olar. Ya da komponent müəyyən event-lərə "qulaq asır" və unmount olanda həmin listener-ləri silmək lazımdır — əks halda **memory leak** yaranır.

`useEffect`-in bunun üçün **cleanup** mexanizmi var — effect funksiyasından bir funksiya `return` etsən, React onu komponent silinəndə çağırır:

```jsx
import * as React from "react";

function Timer() {
  const [timer, setTimer] = React.useState(100);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer === 0 ? 0 : prevTimer - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <p>Timer: {timer}</p>;
}

export default Timer;
```

Bu sadə `Timer` komponentidir: `timer` adlı state saxlayır, `useEffect` daxilində `setInterval` ilə hər saniyə `timer`-i bir vahid azaldır, nəticəni isə render edir.

Diqqət et: `setTimer`-ə bu dəfə rəqəm yox, **callback funksiya** ötürülüb. Bu, React-in etibarlı bir üsuludur — yeni state-i hesablamaq üçün əvvəlki state dəyərinə ehtiyac olanda, callback-in birinci arqumenti "əvvəlki" state dəyəri olur, sən də yeni dəyəri bu callback-dən `return` edirsən.

`useEffect`-in daxilində bir funksiya da `return` olunur — React bunu komponent silinəndə çağırır. Burda `setInterval`-in yaratdığı interval, `clearInterval` çağıraraq təmizlənir.

```jsx
const ShowHideTimer = ({ show }) => (show ? <Timer /> : null);

function App() {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? "Timer-i gizlət" : "Timer-i göstər"}
      </button>
      <ShowHideTimer show={show} />
    </>
  );
}
```

`App` komponenti `show` state-ini toggle edən düymə göstərir. `show` `true` olanda `<Timer />` render olunur, `false` olanda `Timer` silinir — məhz bu an `useEffect`-in cleanup funksiyası işə düşür. Əgər cleanup əlavə etməsəydik, Timer hər dəfə yaradılanda yeni interval açılar, köhnələr isə heç vaxt təmizlənməzdi — nəticədə memory leak yaranardı.

### Effect-in nə vaxt işə düşəcəyini optimallaşdırmaq

Default olaraq React hər effect-in cleanup tələb etdiyini fərz edir və onu **hər render-dən sonra** işə salır. Amma çox vaxt bu lazım deyil — məsələn, `fetchUser` nümunəsində istəyirik ki, data yalnız komponent ilk dəfə yaradılanda çəkilsin, hər render-də yox.

`useEffect`-ə ikinci arqument kimi **asılılıq array-i (dependency array)** ötürməklə bunu idarə edirik:

```jsx
React.useEffect(() => {
  fetchUser().then((user) => {
    setId(user.id);
    setName(user.name);
  });
}, []);
```

Boş array (`[]`) React-a deyir: "izləniləcək heç bir dəyər yoxdur, effect-i yalnız bir dəfə — ilk render-dən sonra — işə sal, cleanup isə yalnız komponent silinəndə çağır". Əgər `[]` yerinə izlənəcək dəyərlər qoysan (məsələn `[resolved]`), effect yalnız o dəyər dəyişəndə yenidən işə düşəcək:

```jsx
const [resolved, setResolved] = useState(false);

useEffect(() => {
  // ...effect kodu...
  return () => {
    // ...cleanup kodu...
  };
}, [resolved]);
```

Əgər `useEffect`-in ikinci arqumentini tam buraxsan, effect **hər** render-dən sonra işləyəcək — bu, adətən istəmədiyin nəticələrə (məsələn, təkrar-təkrar API sorğusu) gətirib çıxarır.

## useContext ilə data paylaşmaq

React tətbiqlərində bəzi məlumatlar "qlobal" xarakter daşıyır — tətbiqin demək olar bütün komponentləri bu məlumatı paylaşır. Məsələn, hazırda login olmuş istifadəçinin məlumatı bir neçə fərqli yerdə lazım ola bilər. Məhz bu ssenari üçün **Context API** var.

Context yaratmaq üçün React-dən `createContext` funksiyasını import edirik:

```jsx
import { createContext } from "react";

const MyContext = createContext();
```

Bu, `Provider` və `Consumer` özündə saxlayan bir context obyekti yaradır.

**Provider** — paylaşılan data-nı öz uşaq komponentlərinə çatdırmaqla məsuldur. Komponent ağacının müvafiq hissəsini `Provider` ilə əhatə edib, dəyəri `value` prop-u ilə ötürürük:

```jsx
<MyContext.Provider value={/* paylaşılan data */}>
  {/* uşaq komponentlər */}
</MyContext.Provider>
```

`MyContext.Provider` daxilindəki istənilən komponent bu data-ya `useContext` hook-u ilə çata bilər:

```jsx
import React, { useContext } from "react";

const MyComponent = () => {
  const value = useContext(MyContext);
  // value ilə render et
};
```

Context API-dan istifadə etməklə **prop-drilling** problemindən qaça bilərik — məlumatı komponent ağacının hər səviyyəsindən əl-ələ ötürməyə ehtiyac qalmır. Bu, kodu daha oxunaqlı və idarə olunan edir, çünki komponentlər paylaşılan data-ya birbaşa çata bilir.

> Vacib qeyd: Context API hər ssenari üçün nəzərdə tutulmayıb, ehtiyatla istifadə olunmalıdır. O, həqiqətən qlobal olan, ya da komponent ağacının böyük hissəsinə aid olan data üçün faydalıdır. Kiçik ölçülü data paylaşımı üçün isə hələ də adi **props** tövsiyə olunan yanaşmadır.

## Nəticə

Props komponentə xaricdən məlumat ötürməyin yolu idisə, **state** komponentin öz daxilində, zaman keçdikcə dəyişən məlumatı saxlamağın yoludur. `useState` bu məlumatı yaradır və yeniləyir, `useEffect` isə komponentin "xarici dünya" ilə əlaqəsini — data fetch, subscription, cleanup — idarə edir. Kompleks, dərin komponent ağaclarında isə `useContext` prop-drilling-ə ehtiyac qalmadan data paylaşmağa imkan verir.

Qısaca: **props valideyndən gələn, state komponentin öz yaratdığı, context isə hər kəsin bölüşdüyü məlumatdır.** Bu üç mexanizmi düzgün seçib birgə işlətmək — React ilə iş görməyin əsl sənətidir.
