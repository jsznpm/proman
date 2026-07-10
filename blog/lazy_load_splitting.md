# Bütün Tətbiqi Bir Anda Yükləmək Lazımdırmı? Lazy Component-lər və Suspense

Böyük React tətbiqi düşün: onlarla səhifə, yüzlərlə komponent. İstifadəçi ancaq ana səhifəyə baxmaq istəyir, amma browser bütün tətbiqin JavaScript kodunu — hətta istifadəçinin heç vaxt açmayacağı admin panelini belə — bir bundle içində yükləyir. Nəticə: uzun ilkin yüklənmə vaxtı, pis UX (User Experience — istifadəçi təcrübəsi).

**Code splitting** bu problemi həll edir: tətbiqin kodunu kiçik parçalara (bundle-lara) bölürsən, browser isə yalnız o an lazım olan parçanı yükləyir. React bunun üçün iki alət təklif edir: `lazy()` API və `Suspense` komponenti. Bu yazıda ikisinin necə işlədiyinə baxacağıq.

## Dynamic import: bundle-ların əsası

Adi `import` statement-i ilə modul çağıranda, həmin modul bütün tətbiqin əsas bundle-ına daxil olur — hamısı bir dəfəyə yüklənir. Amma `import()` **funksiyası** (statement yox, funksiya çağırışı) fərqli işləyir: modulu "on demand" (tələb olunanda) yükləyir, alət (Vite, Webpack və s.) isə həmin modul üçün ayrıca bundle yaradır.

Sadə komponent götürək:

```jsx
export default function MyComponent() {
  return <p>My Component</p>;
}
```

Bunu dynamic import ilə yükləsək:

```jsx
function App() {
  const [MyComponent, setMyComponent] = React.useState(() => () => null);

  React.useEffect(() => {
    import("./MyComponent").then((module) => {
      setMyComponent(() => module.default);
    });
  }, []);

  return <MyComponent />;
}
```

Burda `import("./MyComponent")` promise qaytarır, promise `module` obyekti ilə resolve olur. `module.default` — komponentin özüdür, onu `state`-ə yazırıq. Niyə state? Çünki `App` ilk render olduğu an `MyComponent`-in kodu hələ yüklənməyib. Kod gələndə state yenilənir, `MyComponent` düzgün dəyəri göstərir. Browser-in network tab-ına baxsan, `MyComponent`-in bundle-ı üçün ayrıca sorğu gedəndə görəcəksən.

## lazy(): əl işini React-a həvalə et

Yuxarıdaki `useState` + `useEffect` kombinasiyasını əldə yazmaq bezdiricidir. `lazy()` API elə bunu avtomatlaşdırır: `import()` promise-i qaytaran funksiya qəbul edir, əvəzində "lazy komponent" qaytarır — onu sadəcə render edirsən:

```jsx
import * as React from "react";

const MyComponent = React.lazy(() => import("./MyComponent"));

function App() {
  return <MyComponent />;
}
```

`MyComponent` indi `lazy()`-nin nəticəsidir. Onun bundle-ı ayrıca yüklənir, komponent isə ilk render olunanda bundle-ı özü yükləyir. Amma tək bir şey çatışmır: kod yüklənən müddətdə istifadəçiyə nə göstərmək. Bunun üçün `Suspense` lazımdır.

## Suspense: yüklənmə müddətində nə göstərmək

`Suspense` komponenti lazy komponentin daxilində olduğu ağacı "dinləyir" — kod yüklənənə qədər `fallback` prop-unda verilən məzmunu göstərir, kod yüklənən kimi əsl komponentə keçir.

Vacib məqam: lazy komponent `Suspense`-in **birbaşa** övladı olmaq məcburiyyətində deyil. Yəni tətbiqdə bir dənə `Suspense` qoyub, onun altındakı bütün lazy komponentləri idarə edə bilərsən.

```jsx
const MyFeature = React.lazy(() => import("./MyFeature"));

function MyPage() {
  return (
    <>
      <h1>My Page</h1>
      <MyFeature />
    </>
  );
}

function App() {
  return (
    <React.Suspense fallback={"loading..."}>
      <MyPage />
    </React.Suspense>
  );
}
```

`MyPage`-in özü lazy deyil, amma daxilində lazy `MyFeature` render edir. `MyFeature`-in bundle-ı yüklənən müddətdə `Suspense` bütün `MyPage`-i `fallback`-la ("loading...") əvəz edir. Bundle yüklənən kimi əsl `MyPage` görünür.

> Bunu restoranda sifariş kimi düşün: aşpaz yeməyi hazırlayana qədər ofisiant sənə boş masa göstərmir, "hazırlanır" lövhəsi qoyur. Yemək hazır olan kimi lövhə götürülür, süfrə görünür.

Lokal development-də bu bundle-lar demək olar dərhal yüklənir, `fallback`-ı görmək çətindir. Dev tools-un Network tab-ında throttling (Slow 3G) aktiv etsən, yüklənmə prosesini simulyasiya edib `fallback`-ı öz gözünlə görə bilərsin.

### Spinner ilə daha yaxşı fallback

`fallback` prop-u istənilən React elementini qəbul edir — sadə mətn yerinə animasiyalı spinner da qoya bilərsən. Məsələn, `react-spinners` paketindən:

```jsx
import * as React from "react";
import { FadeLoader } from "react-spinners";
import MyPage from "./MyPage";

function App() {
  return (
    <React.Suspense fallback={<FadeLoader color="lightblue" />}>
      <MyPage />
    </React.Suspense>
  );
}
```

Bu, sadə "loading..." mətninindən daha peşəkar görünüş verir — istifadəçinin öyrəşdiyi vizual dil.

## Hər Komponenti Lazy Etmə

Bütün komponentləri ayrıca bundle-a bölmək cazibədar görünə bilər — texniki cəhətdən çətin deyil. Amma bunun ciddi qiyməti var: çox sayda lazy komponent = eyni anda çox sayda HTTP sorğusu. Bir səhifədə bir yerdə istifadə olunan komponentləri ayrı-ayrı bundle-lara bölməyin heç bir faydası yoxdur — əksinə, browser eyni anda 5-10 kiçik fayl üçün sorğu göndərir, bu da daha yavaş ola bilər.

Doğru yanaşma: **səhifə = bundle**. Hər səhifəni lazy et, amma səhifənin daxilindəki komponentləri bir yerdə saxla (lazy etmə), çünki onlar hər halda birlikdə lazım olacaq.

```jsx
const First = React.lazy(() => import("./First"));
const Second = React.lazy(() => import("./Second"));

function ShowComponent({ name }) {
  switch (name) {
    case "first":
      return <First />;
    case "second":
      return <Second />;
    default:
      return null;
  }
}
```

`First` və `Second` — tətbiqin səhifələridir, ona görə lazy edilib. Amma `First`-in daxilindəki komponentlərə baxaq:

```jsx
import One from "./One";
import Two from "./Two";
import Three from "./Three";

export default function First() {
  return (
    <>
      <One />
      <Two />
      <Three />
    </>
  );
}
```

`One`, `Two`, `Three` — adi (lazy olmayan) import ilə gətirilib, eyni bundle-ın içindədir. Onları da lazy etsək, üç ayrı HTTP sorğusu olardı — bir sorğu əvəzinə. Heç bir fayda yox, sadəcə əlavə network yükü.

> Qayda sadədir: səhifə açılanda dərhal lazım olan hər şey bir bundle-da olsun. Yalnız "bəzən lazım olan, bəzən yox" olan bölmələr (məsələn, başqa səhifə, modal, admin panel) ayrı bundle-a layiqdir.

## Router ilə Lazy Səhifələr

Eyni məntiq `react-router` ilə də işləyir. Hər route-un komponentini lazy edib, naviqasiya baş verəndə yalnız o səhifənin kodunu yükləmək olar:

```jsx
const First = React.lazy(() => import("./First"));
const Second = React.lazy(() => import("./Second"));

function Layout() {
  return (
    <section>
      <nav>
        <span><Link to="first">First</Link></span>
        <span> | </span>
        <span><Link to="second">Second</Link></span>
      </nav>
      <section>
        <React.Suspense fallback={<FadeLoader color="lightblue" />}>
          <Outlet />
        </React.Suspense>
      </section>
    </section>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/first" element={<First />} />
          <Route path="/second" element={<Second />} />
        </Route>
      </Routes>
    </Router>
  );
}
```

Diqqət et: `Suspense` naviqasiya linklərinin **aşağısında** yerləşir. Bu o deməkdir ki, `fallback` məhz səhifə məzmununun görünəcəyi yerdə göstərilir — naviqasiya isə hər zaman görünür, yüklənmə zamanı yoxa çıxmır. `/first` route-u aktivləşəndə `First` komponenti ilk dəfə render olunur, bu da onun bundle-ının yüklənməsini tetikləyir.

## Nəticə

Code splitting böyük React tətbiqlərində vacib texnikadır. `import()` funksiyası bundle yaratmağı öz üzərinə götürür, `lazy()` isə komponenti "yükləməyə qədər gözləyən" formaya salır. `Suspense` bu gözləmə müddətində istifadəçiyə nə göstəriləcəyini idarə edir — və adətən tətbiqdə bir dənə `Suspense` kifayətdir, əgər səhifə-bundle strukturuna sadiq qalınsa.

Qısaca: **bölünməmiş bundle = uzun gözləmə, düzgün bölünmüş bundle = sürətli, rəvan UX.** Növbəti addım — bu səhifələrin server tərəfdə necə render olunduğuna baxmaq (Next.js), amma bu artıq başqa mövzu.
