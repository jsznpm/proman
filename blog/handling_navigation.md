# React Router ilə naviqasiya: URL-dən komponentə necə gedilir?

Demək olar hər web tətbiqinə routing lazımdır — yəni müəyyən URL-ə uyğun məzmun göstərmək. Qulaqda sadə səslənir, amma iş içinə girəndə mürəkkəbləşir: müxtəlif URL şablonları, iç-içə route-lar, dinamik parametrlər, naviqasiya axını.

Bu yazıda React tətbiqlərində de-fakto standart olan **react-router** paketini araşdıracağıq. Sırasıyla:

* Route-ların JSX ilə necə təyin olunduğu
* Dinamik URL seqmentləri və query parametrləri
* `Link` komponenti ilə naviqasiya

---

## Route nədir, necə qururuq?

react-router-in gücü ondadır ki, route-u, o route render edəcəyi komponentlə **yan-yana** yaza bilirsən. Bu, tətbiqin hansı hissəsinin hansı URL-ə bağlı olduğunu izləməyi asanlaşdırır.

Əvvəlcə paketi quraşdır:

```bash
npm install react-router-dom
```

Sadə bir komponent yaradaq:

```jsx
function MyComponent() {
  return <p>Salam, Route!</p>;
}
```

İndi bu komponenti bir route-a bağlayaq:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyComponent from "./MyComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyComponent />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

`RouterProvider` tətbiqin ən üst komponentidir. `createBrowserRouter` daxilində hər route-un iki əsas xüsusiyyəti var: `path` və `element`. Aktiv URL `path`-a uyğun gələndə, `element` render olunur.

> Router özü heç nə render etmir — o sadəcə hazırkı URL-i yoxlayıb, hansı komponentin göstərilməli olduğuna qərar verir.

`path` uyğun gəlməyəndə isə heç nə göstərilmir. Bu, routing-in bütün əsasıdır — qalan hər şey bunun üzərinə qurulur.

---

## Route-ları necə bölürük — feature əsaslı struktur

Onlarla route bir modulda toplananda, hansı route-un hansı feature-a aid olduğunu ağılda saxlamaq çətinləşir. Həll: **hər feature öz route-larını özü təyin etsin.**

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <h1>Nested Routes</h1>,
      },
      routeOne,
      routeTwo,
    ],
  },
]);

export const App = () => <RouterProvider router={router} />;
```

Burada `routeOne` və `routeTwo` ayrıca modullardan import olunan route obyektləridir. `Layout` komponenti isə dəyişməyən şablonu (naviqasiya paneli və s.) göstərir və `<Outlet />` vasitəsilə uyğun route-un məzmununu yerinə qoyur:

```jsx
function Layout() {
  return (
    <main>
      <nav>
        <Link to="/">Main</Link>
        <span> | </span>
        <Link to="/one">One</Link>
        <span> | </span>
        <Link to="/two">Two</Link>
      </nav>
      <Outlet />
    </main>
  );
}
```

`Outlet` — react-router-in daxili komponentidir. Uyğun gələn route element-i ilə əvəz olunan "yer tutan"dır.

Bu yanaşmanın faydası: router-in ölçüsü artıq route sayına deyil, **feature sayına** görə böyüyür. `one/index.js` faylı belə görünə bilər:

```jsx
const routes = {
  path: "/one",
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Redirect path="/one/1" />,
    },
    {
      path: "1",
      element: <First />,
    },
    {
      path: "2",
      element: <Second />,
    },
  ],
};
```

Burda üç qayda var: `/one` açılanda `/one/1`-ə yönləndir, `/one/1` — `First` komponentini göstər, `/one/2` — `Second`-u göstər.

`Redirect` komponenti heç bir UI göstərmir, sadəcə istifadəçini başqa route-a yönləndirir — məsələn, authentication statusuna görə. Buradakı səbəb sadədir: feature-un kök route-unda ("/one") göstəriləcək məzmun yoxdur, ona görə istifadəçini birbaşa məzmunlu səhifəyə ötürürük.

```jsx
export default function First() {
  return <p>Feature 1, page 1</p>;
}
```

---

## Route parametrləri — URL-ə dinamik dəyər necə qatılır?

İndiyə qədər gördüyümüz URL-lər statik idi. Amma real tətbiqlərdə çox vaxt URL-in bir hissəsi dəyişkəndir — məsələn, istifadəçi ID-si.

### Resurs ID-si URL-də

Fərz et ki, istifadəçi detalları səhifəsi qurursan. URL-də istifadəçinin ID-si olmalıdır, komponent də bu ID-ni tutub API çağırışı etməlidir:

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <UsersContainer />,
    errorElement: <p>Route not found</p>,
  },
  {
    path: "/users/:id",
    element: <UserContainer />,
    errorElement: <p>User not found</p>,
    loader: async ({ params }) => {
      const user = await fetchUser(Number(params.id));
      return { user };
    },
  },
]);
```

`:id` sintaksisi URL dəyişəninin başlanğıcını bildirir. `loader` funksiyası komponent göstərilmədən **əvvəl** işə düşür və məlumatı asinxron çəkir. Xəta olarsa, `errorElement` fallback kimi işə düşür.

`UserContainer` isə bu məlumatı belə istifadə edir:

```jsx
function UserContainer() {
  const params = useParams();
  const { user } = useLoaderData();

  return (
    <div>
      User ID: {params.id}
      <UserData user={user} />
    </div>
  );
}
```

`useParams()` — URL-in dinamik hissələrini oxuyan hook. `useLoaderData()` isə `loader`-in qaytardığı nəticəni verir. Əgər URL-də seqment tamamilə yoxdursa, bu kod işə düşmür — router birbaşa `errorElement`-ə keçir.

Mock API tərəfi belədir:

```js
const users = [
  { first: "John", last: "Snow", age: 40 },
  { first: "Peter", last: "Parker", age: 30 },
];

export function fetchUsers() {
  return new Promise((resolve) => resolve(users));
}

export function fetchUser(id) {
  return new Promise((resolve, reject) => {
    const user = users[id];
    if (user === undefined) {
      reject(`User ${id} not found`);
    } else {
      resolve(user);
    }
  });
}
```

`fetchUser` mövcud olmayan ID üçün reject edir — məhz elə bu reject `errorElement`-in işə düşməsinə səbəb olur, 500 xətası əvəzinə səliqəli "tapılmadı" mesajı göstərilir.

Nəhayət, detalları göstərən komponent:

```jsx
function UserData({ user }) {
  return (
    <section>
      <p>{user.first}</p>
      <p>{user.last}</p>
      <p>{user.age}</p>
    </section>
  );
}
```

### Query parametrləri — çoxlu opsional dəyər üçün

URL seqmentləri sadə, tək dəyərlər üçün əladır. Amma çoxlu, opsional dəyər lazım olanda (məsələn, sıralama qaydası) **query parametrləri** daha uyğundur.

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <UsersContainer />,
  },
]);
```

Route tərəfində query üçün xüsusi tənzimləmə yoxdur — bu, tamamilə komponentin işidir:

```jsx
function UsersContainer() {
  const [users, setUsers] = useState([]);
  const [search] = useSearchParams();

  useEffect(() => {
    const order = search.get("order");
    fetchUsers(order).then((users) => {
      setUsers(users);
    });
  }, [search]);

  return <Users users={users} />;
}
```

`useSearchParams()` — `URLSearchParams` obyekti qaytarır, `search.get("order")` ilə query dəyərini oxuyursan. `/?order=desc` açanda siyahı azalan qaydada gəlir, sadə `/` üçün isə defolt qayda işləyir.

> **URL parametri** vs **query parametri**: birincisi resursun kimliyini bildirir (`/users/5`), ikincisi isə necə göstəriləcəyini tənzimləyir (`?order=desc`). Bunu belə düşün — ID otağın nömrəsidir, query isə otaqdakı işıqların açıq/bağlı olmasıdır.

---

## Link komponenti — niyə sadə `<a>` yox?

Adi `<a>` teqi ilə link qoysan, brauzer serverə tam səhifə üçün GET sorğusu göndərməyə çalışar. Amma bizə bu lazım deyil — route konfiqurasiyası artıq tətbiqin öz içindədir, naviqasiyanı lokal həll etmək istəyirik.

### Sadə link-lər

```jsx
function Layout() {
  return (
    <>
      <nav>
        <p><Link to="first">First</Link></p>
        <p><Link to="second">Second</Link></p>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/first", element: <First /> },
      { path: "/second", element: <Second /> },
    ],
  },
]);
```

`to` xüsusiyyəti klik olunanda hansı route-un aktivləşəcəyini göstərir. `Link` brauzerin history API-sini də özü idarə edir — səhifə tam yenilənmir, sadəcə uyğun komponent dəyişir.

### Dinamik link-lər — URL və query parametrləri ilə

Dinamik seqmentli link qurmaq üçün string-i özün quraşdırmalısan:

```jsx
function Echo() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  return <h1>{params.msg || searchParams.get("msg")}</h1>;
}

const param = "From Param";
const query = new URLSearchParams({ msg: "From Query" });

export default function App() {
  return (
    <section>
      <p>
        <Link to={`echo/${param}`}>Echo param</Link>
      </p>
      <p>
        <Link to={`echo?${query.toString()}`}>Echo query</Link>
      </p>
    </section>
  );
}
```

Birinci link `/echo/From%20Param` ünvanına, ikinci isə `/echo?msg=From+Query` ünvanına aparır. `Echo` komponenti isə hər iki mənbədən — URL parametri (`params.msg`) və ya query (`searchParams.get("msg")`) — gələn dəyəri göstərir.

---

## Nəticə

Route — sadəcə URL-i komponentə çevirən qaydadır. react-router bu çevrilməni JSX-in özü ilə, komponentlərə yaxın saxlamağa imkan verir:

* Route-ları **feature-lara görə** böl, tək nəhəng fayl yox.
* Dinamik ID-lər üçün **URL parametrləri** (`:id`), çoxlu opsional dəyər üçün **query parametrləri** istifadə et.
* Naviqasiya üçün həmişə `<Link>` işlət, `<a>` yox — beləcə brauzer tam səhifə sorğusu göndərmir.

Qısası: **React 15-in fikri "hər şeyi əvvəlcədən düz URL-ə yaz" idisə, react-router deyir — "URL-i sən idarə et, komponent ona reaksiya versin."** Məhz bu prinsip React tətbiqlərini sürətli, çevik və genişlənə bilən edir.
