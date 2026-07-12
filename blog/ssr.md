# SSR nədir və niyə React yenidən serverə qayıtdı?

React özü brauzerdə işləyən kitabxanadır — amma çıxdığı formatlar təkcə brauzer DOM-u ilə məhdudlaşmır. Bunlardan biri, bəlkə də ən vacibi, adi HTML string-dir: serverdə hazırlanıb brauzerə göndərilən markup. Bu yazıda server-side rendering (SSR) React-də necə işləyir, niyə bu qədər populyarlaşıb və Next.js-də necə tətbiq olunur — bunları araşdıracağıq.

Mövzular:

* SPA-dan SSR-ə qədər yol
* Next.js ilə praktik nümunələr (Pages Router)
* React Server Components və App Router

---

## Veb necə tam dövrə vurdu

Veb texnologiyaları düz xətlə deyil, dairə boyu inkişaf edib. Əvvəl statik səhifələr var idi — server hər şeyi hazırlayıb qaytarırdı, brauzer sadəcə göstərirdi. Sonra biz bu modeldən uzaqlaşıb, rendering-i brauzerə köçürdük — bu, veb səhifələri desktop tətbiqlərə bənzər interaktiv tətbiqlərə çevirdi. Nəticədə tətbiq məntiqinin mərkəzi brauzer oldu, server isə sadəcə data verən nöqtəyə çevrildi.

İndi isə dövrə tamamlanıb: yenidən SSR-ə və server komponentlərinə qayıtmışıq — amma bu dəfə server və client üçün **eyni** kod, eyni məntiq işləyir. Bunun niyə baş verdiyini anlamaq üçün əvvəlcə SPA-nın nə itirdiyinə baxaq.

## SPA: hər şey brauzerdə

Ənənəvi single-page application (SPA) yanaşmasında render tamamilə brauzerin üzərinə düşür. Bütün kod, stil və markup brauzer üçün yazılır; build zamanı statik HTML, CSS və JS faylları çıxır, bunlar brauzerə yüklənir.

Adətən başlanğıc HTML faylı boşdur — içində əsl məzmun yoxdur. Yeganə vacib şey ora bağlanmış JS fayldır, çünki lazım olan hər şeyi elə o render edəcək.

Bu yanaşma interaktivlik gətirdi: səhifəni hər dəfə yeniləmədən content dəyişdirmək, bildiriş göstərmək, yeni mesaj almaq mümkün oldu — bütün tətbiq məntiqi birbaşa brauzerdə olduğu üçün. Vaxt keçdikcə brauzer tətbiqləri demək olar desktop tətbiqləri əvəz etdi: e-poçt yazmaq, sənədlə işləmək, film izləmək — hamısı tək brauzer daxilində. Şirkətlər desktop tətbiq yazmaq əvəzinə veb tətbiq yazmağa üstünlük verdi, çünki brauzer istənilən arxitektura və OS-də işləyir — bu, development xərcini xeyli azaldır.

Paralel olaraq server tərəfi də dəyişdi: page templating, caching kimi işlərdən uzaqlaşdı. Backend developer artıq page layout-la məşğul olmur, daha çox mürəkkəb məntiq və arxitekturaya vaxt ayırır.

Amma SPA-nın da qüsurları var:

* İlkin yüklənmə vaxtı uzundur — script yüklənib emal olunana qədər istifadəçi boş ekran və ya spinner görür.
* Boş başlanğıc HTML SEO üçün yararsızdır — axtarış motoru üçün bu, boş səhifədir.

Onlayn mağaza kimi layihələrdə bu problem kritikdir — istifadəçi və axtarış motoru səhifə content-ini dərhal görməlidir. SPA-lardan əvvəl bunu server tərəfli alətlər həll edirdi, çünki content həmişə əvvəlcədən hazır idi. React-də bu, daha mürəkkəbdir, çünki React brauzer tərəfli kitabxanadır.

## `renderToString`: React-in serverdə işləməsi

Həllin ilk addımı sadədir: React komponent ağacını serverdə HTML-ə çevirmək. Bunun üçün React-in ilk günlərdən bəri `renderToString` funksiyası var — Node.js server mühitində çağırıla bilir. Bu funksiya komponent ağacını HTML string-ə çevirir, həmin string brauzerə göndərilib göstərilir.

```
Brauzer sorğusu → Server: renderToString(<App />) → HTML string → Brauzer render edir
```

Problem budur ki, bu cür HTML-də interaktivlik yoxdur. Düymə, naviqasiya, SPA-da öyrəşdiyimiz hər şey işə düşmür — bunun üçün JavaScript lazımdır. Deməli, SSR-in növbəti addımı təkcə HTML deyil, JavaScript-i də ötürməkdir.

## Isomorfik JavaScript və hydration

Bu problemi **isomorfik JavaScript** yanaşması həll etdi: eyni kod əvvəl serverdə, sonra client-də icra olunur. Server ilkin render-i hazırlayır, hazır HTML-i JS bundle ilə birlikdə client-ə göndərir, brauzer isə sonra interaktivliyi təmin edir.

İstifadəçi səhifəni açanda, JS hələ yüklənməmiş olsa belə, server render nəticəsini dərhal görür. Bu sürətli ilkin cavab UX-i xeyli yaxşılaşdırır. Səhifə və JS bundle yükləndikdən sonra brauzer səhifəni **hydrate** edir — `renderToString` nümunəsindən bildiyimiz kimi, bütün elementlər hələ "cansız"dır, hydration zamanı script lazımi event listener-ləri elementlərə bağlayır. Bu proses sıfırdan tam render-dən daha yüngül və sürətlidir.

> Hydration-u belə düşünün: server sizə mebeli artıq quraşdırılmış otaq göndərir, brauzer isə sadəcə işıqları, açar-düymələri qoşur — hər şeyi yenidən yığmır.

İsomorfik JavaScript-in başqa bir üstünlüyü — səhifədən səhifəyə keçidi sürətli və hamar etməkdir: növbəti səhifənin JS kodunu yükləmək kifayətdir, tətbiq həmin səhifəni lokal render edə bilir.

Beləliklə SSR-in tam mənzərəsi belədir: server səhifəni request zamanı render edib HTML + JS bundle qaytarır, brauzer JS-i yükləyib göstərilən content-i hydrate edir. Bu, server render-in performansı ilə client tətbiqinin interaktivliyini birləşdirir.

## SSG və ISR: SSR-in qüsurlarına cavab

SSR böyük irəliləyiş olsa da universal həll deyil — hər sorğuda səhifəni sıfırdan render etmək lazımdır. Dinamik olmayan səhifələr üçün belə hər dəfə serverdə generasiya lazımdır, bu da gecikmə yaradır. Üstəlik ən sadə tətbiq üçün belə render üçün Node.js server lazımdır — SPA-da isə CDN kifayət idi.

Bu problemi **static site generation (SSG)** həll etdi: bütün statik səhifələr build zamanı serverdə render olunur, nəticədə dərhal çatdırıla bilən hazır HTML fayllar əldə edilir. SSR-də olduğu kimi, JS bundle səhifəni yükləndikdən sonra hydrate edir. Nəticə SPA-dakı təcrübənin eynisidir, amma boş HTML yerinə content-lə dolu fayl. SSG layihələri sürətli server və ya CDN-də host edilə bilər — bu, əlavə caching və sürət deməkdir.

SSG blog, sayt və sadə onlayn mağaza üçün ideal həll oldu: sürətli yüklənmə, SEO dəstəyi, SPA-dakı kimi interaktivlik. Həm də SSR-i dinamik data üçün, SSG-ni statik səhifələr üçün birləşdirmək mümkün oldu — bu hibrid yanaşma daha mürəkkəb layihələr üçün imkan açır.

Amma statik səhifələrin yenilənməsi ayrı problemdir: yeni blog yazısı əlavə etmək ənənəvi olaraq bütün layihənin yenidən build olunmasını tələb edir. 1000 yazılı bloqu təsəvvür edin — bir yeni yazı üçün hamısını yenidən render etmək.

Bunu **incremental static generation (ISR)** həll edir. ISR, SSG və SSR-i caching məntiqi ilə birləşdirir. Bunu belə təsəvvür edin: build zamanı yaradılan bütün HTML/JS faylları sadəcə bir keş-dir — layihənin build-inin cari nəticəsi. Hər keş kimi, buna da revalidation (yenidən doğrulama) məntiqi lazımdır. Keş etibarlı olduğu müddətcə hər sorğu SSG kimi işləyir. Revalidation vaxtı bitəndə isə növbəti sorğu səhifəni SSR rejimində yenidən render etdirir, nəticə həm client-ə göndərilir, həm də köhnə HTML faylını əvəz edir — yəni keş yenilənir. Bundan sonra tətbiq yenə SSG rejimində davam edir.

ISR sayəsində milyonlarla səhifəsi olan layihələri belə hər kiçik dəyişiklik üçün tam yenidən build etmək lazım deyil. Hətta build mərhələsində səhifə generasiyasını tamamilə keçmək də mümkün oldu — lazım olan səhifələr sorğu zamanı render olunub saxlanılır. Böyük layihələr üçün bu, build sürətində əhəmiyyətli qazancdır.

Bu gün SSG + ISR, ənənəvi SSR ilə birlikdə həm sadə sayt, həm mürəkkəb tətbiq üçün ən populyar yanaşmalardandır. Amma klassik SPA da hələ populyardır. Bəs bütün bunları özümüz əldən yazmalıyıqmı? Xeyr — bunun üçün React əsaslı framework-lər var:

* **Next.js** — SSR ilə başlayıb, indi SSR, SSG, ISR-i dəstəkləyir; son zamanlar server komponentlər üzərində fəal işləyir.
* **Gatsby** — CMS və ya Markdown kimi mənbələrdən data alıb statik sayt qurmağa fokuslanıb.
* **Remix** — veb standartlarına yaxınlıq və UX-ə fokuslanan, nisbətən yeni framework; səhifə-səhifə deyil, səhifənin hissələri üzrə data işləmə və nested naviqasiya təklif edir.

## Next.js ilə praktik nümunə: Pages Router

Next.js SSR və statik generasiyanı sadələşdirmək üçün yaradılmış populyar React framework-üdür.

Əsas xüsusiyyətlər:

* SSR və statik generasiyanı avtomatlaşdıran sadə API — framework hansı səhifənin serverdə, hansının build zamanı render olunacağını özü müəyyən edir.
* Fayl əsaslı routing — layihənin qovluq/fayl strukturuna əsaslanan sadə marşrutlaşdırma.
* API route-lar sayəsində tam full-stack tətbiq qurmaq imkanı.
* Şəkil, font və script-lərin optimizasiyası.

Layihəni yaratmaq üçün tək əmr kifayətdir:

```bash
npx create-next-app@latest
```

Bu, TypeScript, ESLint, Tailwind, `src/` qovluğu, App Router istifadəsi kimi sualları verəcək. Bu bölmədəki nümunə üçün App Router sualından başqa hamısına "Bəli" cavabı verin — App Router-i növbəti bölmədə ayrıca araşdıracağıq.

Next.js-də (Pages Router-də) hər səhifə `pages` qovluğunda, URL yoluna uyğun adlı ayrı faylda yerləşir:

* Ana səhifə (`/`) → `pages/index.tsx`
* `/about` → `pages/about.tsx`
* `/posts` → `pages/posts/index.tsx`
* Dinamik post səhifəsi → `pages/posts/[post].tsx` — kvadrat mötərizədə ad framework-ə bunun dinamik səhifə olduğunu, `post` isə parametr olduğunu bildirir. Yəni `/posts/1`, `/posts/2` kimi bütün URL-lər bu faylı istifadə edəcək.

`pages` qovluğunda iki xüsusi fayl da var, bunlar özləri səhifə deyil, framework-ün səhifəni hazırlamaq üçün istifadə etdiyi fayllardır:

* `_document.tsx` — HTML markup-un hazırlanması üçün, burda `<html>` və `<body>` teqlərinə çıxış var. Bu fayl həmişə serverdə render olunur.
* `_app.tsx` — səhifənin inisializasiyası üçün; script bağlamaq və ya bütün route-lar arasında paylaşılan root layout üçün istifadə olunur.

`_app.tsx` faylına header əlavə edək:

```tsx
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <header className="p-4 flex items-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/posts">Posts</Link>
        <Link href="/about">About</Link>
      </header>
      <div className="p-4">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
```

`App` komponenti qaytardığı markup layihənin **bütün** səhifələrində görünəcək — yəni bu header hər səhifədə olacaq. `Component` prop-u isə hər an hansı səhifənin göstəriləcəyini idarə edir.

Ana səhifə çox sadədir:

```tsx
export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
    </main>
  );
}
```

Bu faylda heç bir əlavə funksiya və ya parametr yoxdur — belə səhifələr build zamanı avtomatik render olunur. Yəni `localhost:3000/`-a daxil olanda artıq hazır HTML alırıq — brauzerin dev tools-unda network tab-a baxsanız, bunu təsdiqləyə bilərsiniz: `App` və `Home` komponentlərindən yığılmış HTML serverdə hazırlanıb, brauzerdə yox.

İndi `/about` səhifəsinə baxaq — burada SSR tətbiq edəcəyik, yəni səhifə build zamanı yox, **hər sorğuda** render olunacaq. Bunun üçün Next.js `getServerSideProps` funksiyasını təqdim edir — bu, səhifə sorğulananda işə düşür və komponentin render üçün istifadə edəcəyi props-ları qaytarır:

```tsx
export const getServerSideProps = (async () => {
  const res = await fetch("https://api.github.com/users/sakhnyuk");
  const user: GitHubUser = await res.json();
  return { props: { user } };
}) satisfies GetServerSideProps<{ user: GitHubUser }>;
```

Burda GitHub API-dən istifadəçi datası çəkilir, `user` isə `props` obyekti daxilində qaytarılır. Vacib məqam: bu funksiya Node.js mühitinin bir hissəsidir — yəni burda fayl oxumaq, verilənlər bazasına qoşulmaq da mümkündür. Bu, mürəkkəb full-stack layihələr üçün böyük imkan açır.

Eyni fayldakı `About` komponenti bu datanı istifadə edir:

```tsx
export default function About({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <Image src={user.avatar_url} alt={user.login} width="100" height="100" />
      <h2>{user.name || user.login}</h2>
      <p>{user.bio}</p>
      <p>Location: {user.location || "Not specified"}</p>
      <p>Company: {user.company || "Not specified"}</p>
      <p>Followers: {user.followers}</p>
      <p>Following: {user.following}</p>
      <p>Public Repos: {user.public_repos}</p>
    </main>
  );
}
```

Tək bir funksiya ilə SSR tətbiq etdik.

Növbəti addım — `/posts` və `/posts/[post]` səhifələri, burda SSG və ISR tətbiq edəcəyik. Bunun üçün Next.js iki funksiya təqdim edir:

* `getStaticProps` — `getServerSideProps`-a bənzər məqsəd daşıyır, amma **build zamanı** çağırılır.
* `getStaticPaths` — path-də parametr olan dinamik səhifələr üçün (`[post].tsx` kimi) hansı path-lərin build zamanı əvvəlcədən generasiya olunacağını müəyyən edir.

`Posts` səhifəsi:

```tsx
export async function getStaticProps() {
  const posts = ["1", "2", "3"];
  return { props: { posts } };
}

export default function Posts({ posts }: { posts: string[] }) {
  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post}>
            <Link href={`/posts/${post}`}>Post {post}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

Bu nümunədə `getStaticProps` heç bir data çəkmir, sadəcə üç səhifə qaytarır — real layihədə isə burda da data fetch etmək və ya fayl sistemi ilə işləmək mümkündür.

Konkret post açılanda `[post].tsx` faylı işə düşür:

```tsx
export const getStaticPaths = (async () => {
  return {
    paths: [
      { params: { post: "1" } },
      { params: { post: "2" } },
      { params: { post: "3" } },
    ],
    fallback: true,
  };
}) satisfies GetStaticPaths;
```

Bu funksiya build sisteminə yalnız üç səhifənin əvvəlcədən render olunacağını bildirir. `fallback: true` isə deməkdir ki, nəzəri olaraq daha çox post səhifəsi ola bilər — məsələn `/posts/4`-ə daxil olsaq, o SSR rejimində render olunub build nəticəsinə saxlanılacaq:

```tsx
export const getStaticProps = (async (context) => {
  const content = `This is a dynamic route example. The value of the post parameter is ${context.params?.post}.`;
  return { props: { content }, revalidate: 3600 };
}) satisfies GetStaticProps<{ content: string }>;
```

Burda `context` arqumentindən `post` parametrini oxuya bilirik. Qaytarılan `revalidate` dəyəri ISR-i aktivləşdirir və serverə deyir: əvvəlki build-dən 3600 saniyə keçdikdən sonra növbəti sorğuda bu səhifəni yenidən qur.

```tsx
export default function Post({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  return (
    <main>
      <h1>Post – {router.query.post}</h1>
      <p>{content}</p>
    </main>
  );
}
```

Bu nümunədə fərqli server rendering yanaşmalarından istifadə edən çoxsəhifəli sayt qurduq — böyük, mürəkkəb layihələr üçün faydalı və rahat yanaşmadır.

## React Server Components və App Router

React Server Components (RSC) Next.js-də komponentlərlə işin yeni paradiqmasıdır — isomorfik JavaScript-i tamamilə aradan qaldırır. Bu komponentlərin kodu **yalnız** serverdə işləyir və nəticədə keşlənə bilir. Bu konseptdə komponentin daxilində birbaşa server fayl sistemini oxumaq və ya verilənlər bazasına qoşulmaq mümkündür.

Next.js-də RSC komponentləri iki kateqoriyaya ayırır: server və client komponentlər. Server komponentlər serverdə emal olunub client-ə statik HTML kimi göndərilir — brauzer yükü azalır. Client komponentlər isə brauzer JavaScript-inin bütün imkanlarına malikdir, amma bir şərtlə: faylın əvvəlində `"use client"` direktivi olmalıdır.

Server komponentlərdən istifadə üçün yeni layihə lazımdır. Routing yenə fayl əsaslıdır, amma indi əsas qovluq `app`-dır, marşrut adları isə yalnız qovluq adlarına əsaslanır. Hər route (qovluq) daxilində framework-ün müəyyən etdiyi adlarla fayllar olur:

* `page.tsx` — səhifəni göstərən komponent.
* `loading.tsx` — `page.tsx`-dəki komponent icra/yüklənərkən client-ə göndəriləcək loading state.
* `layout.tsx` — `_app.tsx`-in ekvivalenti, amma iç-içə route-larda çoxlu, iç-içə layout-lar mümkündür.
* `route.tsx` — API endpoint tətbiq etmək üçün.

İndi post saytımızı App Router arxitekturası ilə yenidən quraq. Ana səhifədən başlayaq. Saytımızda interaktiv element yox idi, gəlin ən sadəsini — sayğaclı düymə — əlavə edək:

```tsx
"use client";

import React from "react";

export const Counter = () => {
  const [count, setCount] = React.useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};
```

Bu komponent içində sayğac olan düymə render edir. Klikləyəndə sayğac artır. App Router ilə işləmək üçün `"use client"` direktivi lazımdır — bu, Next.js-ə deyir ki, bu komponentin kodunu bundle-a daxil et və brauzerə göndər.

İndi bu düyməni ana səhifəyə əlavə edək:

```tsx
export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <Counter />
    </main>
  );
}
```

Səhifə sadə olduğu üçün yeni düymədən başqa Pages Router-dəkindən fərqi yoxdur. App Router default olaraq bütün komponentləri server komponent sayır, amma bu halda səhifə yenə build zamanı render olunub statik saxlanılacaq.

`about` qovluğu və içində `page.tsx` yaradaq:

```tsx
export const dynamic = "force-dynamic";

export default async function About() {
  const res = await fetch("https://api.github.com/users/sakhnyuk");
  const user: GitHubUser = await res.json();
  return (
    <main>
      <Image src={user.avatar_url} alt={user.login} width="100" height="100" />
      <h2>{user.name || user.login}</h2>
      <p>{user.bio}</p>
      <p>Location: {user.location || "Not specified"}</p>
      <p>Company: {user.company || "Not specified"}</p>
      <p>Followers: {user.followers}</p>
      <p>Following: {user.following}</p>
      <p>Public Repos: {user.public_repos}</p>
    </main>
  );
}
```

Bu kod Pages Router-dəkindən daha sadədir. `About` komponenti asinxron olub — bu, network sorğusu edib nəticəni gözləməyə imkan verir. Hər sorğuda serverdə render istəndiyi üçün fayldan `dynamic` dəyişənini `force-dynamic` dəyəri ilə export etmək lazımdır — bu, Next.js-ə hər sorğu üçün yeni səhifə generasiya etməli olduğunu açıq bildirir. Əks halda Next.js səhifəni build zamanı yaradıb statik saxlayacaqdı (SSG ilə).

`about` qovluğu daxilində `loading.tsx` yaratsaq, About səhifəsi açılanda server GitHub-dan data istəyib səhifəni hazırlayana qədər gözləmək əvəzinə, dərhal `loading` faylındakı content fallback kimi göstəriləcək. `page.tsx`-dəki komponent hazır olan kimi server onu client-ə göndərib loading komponentini əvəz edəcək. Bu, əhəmiyyətli performans üstünlüyü verir və UX-i yaxşılaşdırır.

`posts` qovluğu və `page.tsx`:

```tsx
export default async function Posts() {
  const posts = ["1", "2", "3"];
  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post}>
            <Link href={`/posts/${post}`}>Post {post}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

Kod yenə çox sıxdır — render-dən əvvəl lazım olan hər şeyi birbaşa komponent daxilində əldə etmək mümkündür.

Konkret post üçün `posts` qovluğu daxilində `[post]` qovluğu, onun içində isə `page.tsx` yaradılır:

```tsx
export async function generateStaticParams() {
  return [{ post: "1" }, { post: "2" }, { post: "3" }];
}

export const revalidate = 3600;

export default async function Post({ params }: { params: { post: string } }) {
  return (
    <main>
      <h1>Post - {params.post}</h1>
      <p>
        This is a dynamic route example. The value of the post parameter is {params.post}.
      </p>
    </main>
  );
}
```

`getStaticPaths` əvəzinə burda `generateStaticParams` funksiyası ilə build zamanı hansı statik səhifələrin generasiya olunacağı bildirilir. ISR-i aktivləşdirmək üçün isə faylda `revalidate` dəyişənini saniyə ilə export etmək kifayətdir.

Bu nümunələr Next.js-in bütün imkanlarını əhatə etmir — daha dərin öyrənmə üçün rəsmi sənədləşməyə baxmaq tövsiyə olunur.

## Nəticə

SSR, SSG və ISR — hər biri eyni problemi fərqli tərəfdən həll edir: istifadəçiyə content-i **nə qədər tez**, serverə isə yükü **nə qədər az** vermək. SSR hər sorğuda təzə render, SSG build zamanı hazır fayl, ISR isə ikisinin arasında — keşlənmiş, amma vaxtaşırı yenilənən nəticə verir.

Next.js bu yanaşmaların hamısını Pages Router-də ayrı-ayrı funksiyalarla (`getServerSideProps`, `getStaticProps`, `getStaticPaths`), App Router-də isə React Server Components ilə daha təbii şəkildə təqdim edir: artıq "hansı funksiyanı export edim" sualı yerinə, komponentin özü server və ya client olduğunu deklarativ bildirir.

Fərq bir cümləyə sığır: köhnə SPA-da brauzer boş səhifəni doldururdu, indi isə server artıq dolu səhifəni göndərir, brauzer isə sadəcə onu "canlandırır".
