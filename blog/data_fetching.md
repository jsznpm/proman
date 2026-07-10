# Serverdən Data Çəkmək: XHR-dan GraphQL-ə Qədər Yol

Bir vaxtlar veb səhifə ilə tətbiq arasında sərhəd çox aydın idi — səhifə statik idi, server nə göndərirdisə, brauzer elə də göstərirdi. Bu gün həmin sərhəd demək olar itib. Səbəb sadədir: brauzerdəki JavaScript serverə sorğu göndərə, cavabı emal edə və nəticəni səhifəni yenidən yükləmədən ekranda göstərə bilir. Məhz bu bacarıq bugünkü interaktiv, "canlı" veb tətbiqlərin təməlini qurub.

Bu yazıda serverdən data çəkməyin tarixi təkamülünü və müasir vasitələrini araşdıracağıq:

* Uzaq (remote) data ilə iş necə inkişaf edib
* Fetch API
* Axios
* TanStack Query (React Query)
* GraphQL

---

## Uzaq Data: Qısa Tarixçə

90-cı illərin əvvəlində, HTTP 1.0 dövründə, veb səhifələr statik idi. Hər klik yeni bir bağlantı açır, server bütöv səhifəni və ya statik faylı (şəkil, HTML) qaytarırdı. İnteraktivlik demək olar yox idi — ən çoxu HTML formaları.

2000-ci illərin əvvəlində vəziyyət dəyişdi: **AJAX** (Asynchronous JavaScript and XML) meydana çıxdı. AJAX-ın gücü ondaydı ki, brauzer səhifəni tam yükləmədən, fonda serverlə danışa bilirdi. Bunun arxasında `XMLHttpRequest` (qısaca **XHR**) obyekti dururdu:

```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.error('Error fetching data');
    }
  }
};
xhr.open('GET', 'http://example.com', true);
xhr.send();
```

Burda `onreadystatechange` — sorğunun vəziyyəti dəyişdikcə (açıldı, göndərildi, cavab gəldi və s.) işə düşən callback. `readyState === DONE` yoxlaması sorğunun tam bitdiyini, `status === 200` isə uğurlu olduğunu bildirir. Diqqət et: burda **callback** üzərində qurulmuş məntiq var — sorğu nəticəsi `then`/`await` yox, funksiya çağırışı ilə idarə olunur. Bu, dövrün xüsusiyyəti idi — asinxron kod hələ promise tanımırdı.

HTTP sonra 1.1-ə keçdi: bağlantılar davamlı (persistent) oldu, RESTful API-lər standartlaşdı — resurslar müəyyən URL-lərlə təmsil olunur, standart HTTP metodları (`GET`, `POST`, `PUT`, `DELETE`) işlədilirdi. Bu, həm miqyaslanmanı, həm developer məhsuldarlığını artırdı.

Sonra **Fetch API** gəldi — promise əsaslı, daha müasir və çevik:

```js
fetch('http://example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

Callback-lərin iç-içə yığılması (callback hell) əvəzinə, artıq zəncirvari `.then()` çağırışları var. Bu, kodu oxumağı və xətaları izləməyi xeyli asanlaşdırdı.

> Fetch API-nin gəlişi ilə asinxron kodun mental modeli dəyişdi: callback yerinə promise, sonra isə `async/await`.

Fetch və XHR-in üzərində icma tərəfindən qurulmuş alətlər də meydana çıxdı — Axios, GraphQL, React Query. Onların hər biri fərqli problemi həll edir: Axios təkrarlanan kodu azaldır, GraphQL həddindən artıq/az data çəkmə problemini aradan qaldırır, React Query isə keşləmə və vəziyyət idarəetməsini öz üzərinə götürür.

WebSocket-lər isə tam başqa istiqamətdə inkişaf etdi — real-vaxt, ikitərəfli əlaqə üçün:

```js
const socket = new WebSocket('ws://example.com');

socket.onopen = function(event) {
  console.log('Connection established');
};
socket.onmessage = function(event) {
  console.log('Message from server:', event.data);
};
socket.onerror = function(error) {
  console.error('WebSocket Error:', error);
};
```

Burda hələ də callback modeli işlədilir — çünki ikitərəfli, davamlı əlaqənin mental modeli "bir sorğu, bir cavab" modelindən fərqlidir: server istənilən vaxt, istənilən sayda mesaj göndərə bilər, bunun üçün tək promise kifayət deyil. Chat tətbiqləri, trading platformaları kimi canlı-yeniləmə tələb edən sistemlər üçün WebSocket vacib alətdir.

---

## Fetch API ilə Praktik Nümunə

İndi real bir misal quraq: GitHub-dan istifadəçi datası çəkib ekranda göstərmək. Layihəni Vite + React ilə başladırıq:

```bash
npm create vite@latest
```

TypeScript işlədəcəyimiz üçün, əvvəlcə serverin bizə hansı formatda data qaytaracağını təsvir edən `GitHubUser` interfeysini yazırıq. Bunun üçün adətən backend developer-lərin təqdim etdiyi API sənədləşməsinə baxılır — burda GitHub-un öz REST API sənədləşməsi mənbədir:

```ts
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  gists_url: string;
  repos_url: string;
  name: string;
  company: string | null;
  location: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
}
```

Bunlar bizə lazım olan sahələrdir — real cavabda daha çox sahə var, sadəcə istifadə edəcəklərimizi seçdik.

İstifadəçi datasını göstərən komponent:

```jsx
const UserInfo = ({ user }: GitHubUserProps) => {
  return (
    <div>
      <img src={user.avatar_url} alt={user.login} width="100" height="100" />
      <h2>{user.name || user.login}</h2>
      <p>{user.bio}</p>
      <p>Location: {user.location || "Not specified"}</p>
      <p>Company: {user.company || "Not specified"}</p>
      <p>Followers: {user.followers}</p>
      <p>Following: {user.following}</p>
      <p>Public Repos: {user.public_repos}</p>
      <p>Public Gists: {user.public_gists}</p>
      <p>
        GitHub Profile:{" "}
        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
          {user.login}
        </a>
      </p>
    </div>
  );
};
```

İndi əsl sorğunu göndərən `App` komponentinə keçək:

```jsx
function App() {
  const [user, setUser] = useState<GitHubUser>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.github.com/users/sakhnyuk")
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && !user && <p>No user found.</p>}
      {user && <UserInfo user={user} />}
    </div>
  );
}
```

Burda `useState` ilə iki vəziyyət saxlanılır: özü data (`user`) və yüklənmə statusu (`loading`). `useEffect` daxilində Fetch sorğusu göndərilir, cavab `.json()` ilə parse olunur, `.then()`-də state-ə yazılır, xəta olarsa `.catch()` onu tutur, `.finally()` isə hər halda (uğurlu və uğursuz) `loading`-i söndürür. Bu üç metodun birgə işləməsi — data çəkmənin klassik "yüklənir → uğurlu/xəta" axınıdır.

```bash
npm run dev
```

Terminaldakı linki açanda, ekranda istifadəçinin avatarı və məlumatları görünəcək.

---

## Axios: Fetch-in Güclənmiş Versiyası

Axios — HTTP client kitabxanası, Fetch-ə çox oxşayır, amma üstəlik bir neçə güclü xüsusiyyət təqdim edir. Quraşdırma:

```bash
npm install axios
```

Axios-un ən dəyərli xüsusiyyətlərindən biri — **instance** yaratmaq imkanıdır: bazovıy URL, header-lər, interceptor-lar kimi konfiqurasiyaları bir dəfə təyin edib, hər sorğuda təkrarlamamaq. Bunu bir `API` sinfinə yığaq:

```ts
class API {
  private apiInstance: AxiosInstance;

  constructor() {
    this.apiInstance = axios.create({
      baseURL: "https://api.github.com",
    });

    this.apiInstance.interceptors.request.use((config) => {
      console.log("Request:", `${config.method?.toUpperCase()} ${config.url}`);
      return config;
    });

    this.apiInstance.interceptors.response.use(
      (response) => {
        console.log("Response:", response.data);
        return response;
      },
      (error) => {
        console.log("Error:", error);
        return Promise.reject(error);
      }
    );
  }

  getProfile(username: string) {
    return this.apiInstance.get<GitHubUser>(`/users/${username}`);
  }
}

export default new API();
```

Konstruktorda `baseURL` bir dəfə təyin olunur — bundan sonra hər sorğuda domeni yazmağa ehtiyac yoxdur. `interceptors.request` — hər sorğu göndərilməzdən **əvvəl** işə düşür, `interceptors.response` isə cavab gələndən **sonra**. Burda sadəcə console-a log yazırıq, amma real layihədə buradan, məsələn, "access token vaxtı bitibsə, yenisini al və sorğuya əlavə et" məntiqi qurulur. Beləcə token yeniləmə kimi təkrarlanan iş bütün sorğulara bir yerdən tətbiq olunur, hər çağırış yerinə ayrıca yazılmır.

`App` komponenti indi belə sadələşir:

```jsx
function App() {
  const [user, setUser] = useState<GitHubUser>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .getProfile("sakhnyuk")
      .then((res) => setUser(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && !user && <p>No user found.</p>}
      {user && <UserInfo user={user} />}
    </div>
  );
}
```

Görəsən nə fərqi var? Səthdə demək olar yoxdur — amma interceptor-lar, mərkəzləşmiş xəta idarəetməsi kimi imkanlar böyüdükcə layihədə çox vaxt qazandırır.

---

## TanStack Query (React Query): Data Çəkməni Bir Hook-a Sığdırmaq

TanStack Query (əvvəlki adı React Query) — data çəkmə və keşləməni birgə həll edən kitabxana. Onun ən güclü tərəfi: eyni `useQuery` hook-u istənilən qədər komponentdə çağırsan da, server-ə **tək bir** sorğu gedir — qalanları keşdən gəlir. Üstəlik yüklənmə və xəta vəziyyətləri artıq özün idarə etmirsən, kitabxana bunu daxili saxlayır.

```bash
npm install @tanstack/react-query
```

Əvvəlcə `QueryClientProvider` ilə tətbiqi əhatə edirik:

```jsx
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

TanStack Query-nin maraqlı tərəfi budur: o hansı vasitə ilə data çəkdiyinə əhəmiyyət vermir — sadəcə data qaytaran bir promise funksiyası istəyir. Bu funksiyanı Fetch API ilə yazaq:

```js
const userFetcher = (username) =>
  fetch("https://api.github.com/users/sakhnyuk")
    .then((response) => response.json());
```

`App` komponenti isə belə görünür:

```jsx
function App() {
  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["githubUser"],
    queryFn: () => userFetcher("sakhnyuk"),
  });

  return (
    <div>
      {isPending && <p>Loading...</p>}
      {isError && <p>Error fetching data</p>}
      {user && <UserInfo user={user} />}
    </div>
  );
}
```

`queryKey` — bu sorğunun keşdə saxlanacağı "etiket". `queryFn` — datayı necə çəkəcəyini bildirən funksiya. Nəticədə bütün sorğu + yüklənmə + xəta məntiqi **bir** hook-un içinə yığılıb — nə `useState`, nə `useEffect`, nə `try/catch` yazmağa ehtiyac qalmır.

---

## GraphQL: Yalnız Lazım Olanı Sorğula

REST API-də hər endpoint sabit strukturda data qaytarır — istəsən də, istəməsən də bütün sahələr gəlir. GraphQL isə tərsinə işləyir: müştəri (client) hansı sahələri istədiyini özü təyin edir, server də dəqiq onu qaytarır. Bu, həm şəbəkə yükünü azaldır, həm performansı yaxşılaşdırır.

`graphql-request` ilə sadə nümunə:

```js
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'http://example.com/graphql';
const client = new GraphQLClient(endpoint);

const query = gql`
  query {
    user(id: 123) {
      name
      email
    }
  }
`;

client.request(query)
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

Burda ID-si 123 olan istifadəçidən yalnız `name` və `email` sahələri istənilir — istifadəçi obyektində nə qədər sahə olsa da, server dəqiq bu ikisini qaytarır.

### Apollo Client ilə GraphQL

Daha real layihə üçün `@apollo/client` istifadə edək — bu, GraphQL üçün React Query-nin analoqu kimi işləyir:

```bash
npm install @apollo/client graphql
```

Provider ilə tətbiqi əhatə edirik:

```jsx
const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: "Bearer YOUR_PAT", // GitHub personal access token buraya
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
```

GitHub-un GraphQL API-si autentifikasiya tələb edir, ona görə `Authorization` başlığında GitHub profilindən alınan personal access token göndərilir.

Sorğunu təyin edirik — burda yalnız lazım olan sahələri seçirik:

```js
const GET_GITHUB_USER = gql`
  query GetGithubUser($username: String!) {
    user(login: $username) {
      login
      id
      avatarUrl
      bio
      name
      company
      location
    }
  }
`;
```

`App` komponenti:

```jsx
function App() {
  const { data, loading, error } = useQuery(GET_GITHUB_USER, {
    variables: { username: "sakhnyuk" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  const user = data.user;

  return (
    <div>
      <UserInfo user={user} />
    </div>
  );
}
```

React Query-dəki kimi, burda da `loading`, `error` və `data` bir hook-dan gəlir. Fərq isə arxa planda gedən sorğudadır: brauzerin Network panelini açsan, serverə göndərilən sorğunun **yalnız istənilən sahələri** ehtiva etdiyini görəcəksən — nə artıq, nə əskik.

> REST-də server "nə varsa göndərirəm", GraphQL-də isə client "mənə bunlar lazımdır, elə onları göndər" deyir.

---

## Hansını Nə Vaxt Seçmək Lazımdır?

* **Fetch API** — əlavə asılılıq istəmirsənsə, kiçik layihədəsənsə, kifayət edir.
* **Axios** — interceptor, mərkəzləşmiş konfiqurasiya, fayl yükləmə kimi əlavə imkanlar lazımdırsa.
* **TanStack Query** — keşləmə, arxa fon yeniləməsi, yüklənmə/xəta idarəetməsini əl ilə yazmaq istəmirsənsə.
* **GraphQL + Apollo** — backend GraphQL təqdim edirsə və dəqiq sahə seçimi, az data ötürmə vacibdirsə.
* **WebSocket** — real-vaxt, ikitərəfli əlaqə lazımdırsa (chat, canlı qiymət yeniləməsi).

## Nəticə

Serverdən data çəkmənin tarixi — sadə statik HTML sorğularından tutmuş, dəqiq sahə seçən GraphQL sorğularına qədər davamlı sadələşmə hekayəsidir. Hər yeni alət əvvəlkinin üzərinə qurulub: Fetch callback-ləri promise-ə çevirdi, Axios təkrarlanan konfiqurasiyanı bir yerə yığdı, React Query yüklənmə/xəta idarəetməsini gizlətdi, GraphQL isə "lazım olanı al" prinsipini gətirdi.

Əvvəllər developer hər sorğunun loading, error, cache məntiqini əl ilə yazırdı. İndi bunu bir hook, bir interceptor, bir sorğu töhfə edir. Data çəkmək artıq **necə** sorğu göndərməkdən çox, **nəyi** göndərmək və **necə saxlamaq** məsələsinə çevrilib.
