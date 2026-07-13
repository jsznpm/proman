# Next.js (App Router) Kursu — Hissə 1: Giriş, Quraşdırma və Layihə Strukturu

> Bu, çox hissəli Next.js kursunun 1-ci hissəsidir. Ümumi plan üçün
> [`nextjs.plan.md`](./nextjs.plan.md) sənədinə bax.

## Kim üçündür və nə öyrədəcək

Bu hissə React bilən, amma Next.js-i ilk dəfə görən developer üçündür.
Sonunda: Next.js-in nə olduğunu, `create-next-app` ilə layihə necə
qurulduğunu, `app/` qovluğunun strukturunu, layout/page anlayışlarını və
səhifələr arası naviqasiyanı biləcəksən.

## Ön Tələblər

- JavaScript/TypeScript əsasları
- React əsasları (komponent, props, JSX)
- Terminal/CLI ilə minimal iş bacarığı (`npm`, `cd`)

## Məzmun

- [Next.js nədir?](#nextjs-nədir)
- [Quraşdırma](#quraşdırma)
- [Layihə Strukturu](#layihə-strukturu)
- [Səhifə (Page) yaratmaq](#səhifə-page-yaratmaq)
- [Layout yaratmaq](#layout-yaratmaq)
- [Nested (iç-içə) route-lar](#nested-iç-içə-route-lar)
- [Dynamic Segment-lər](#dynamic-segment-lər)
- [Route Groups və Private Folder-lər](#route-groups-və-private-folder-lər)
- [Səhifələr arası keçid (Linking)](#səhifələr-arası-keçid-linking)
- [Naviqasiya necə işləyir: Prefetch, Streaming, Client-side Transition](#naviqasiya-necə-işləyir)
- [Praktika](#praktika)
- [Xülasə](#xülasə)
- [Əlavə Oxu](#əlavə-oxu)

## Next.js nədir?

Next.js — React üzərində qurulmuş **full-stack framework**-dür. Sadə React
tətbiqi yalnız client tərəfdə (brauzerdə) render olunur; Next.js isə eyni
komponentləri **server tərəfdə** də render edə bilir, bundan əlavə routing,
data fetching, caching, optimizasiya (şəkil/font), API endpoint-lər və
production build sistemi kimi bir çox şeyi "qutudan çıxan kimi" (out of the
box) verir.

Next.js-in iki router modeli var:

- **App Router** (`app/` qovluğu) — daha yeni, React Server Components
  əsaslı, bu kursun mövzusu.
- **Pages Router** (`pages/` qovluğu) — köhnə model, hələ də dəstəklənir,
  amma yeni layihələr üçün tövsiyə olunmur.

Bu kurs boyu yalnız **App Router**-dən danışacağıq.

## Quraşdırma

### Sistem Tələbləri

- Node.js minimum versiya: **20.9**
- macOS, Windows (WSL daxil), Linux dəstəklənir
- Brauzer dəstəyi: Chrome 111+, Edge 111+, Firefox 111+, Safari 16.4+

### Sürətli başlanğıc

```bash
npx create-next-app@latest my-app --yes
cd my-app
npm run dev
```

`--yes` flag-ı bütün sualları default/saxlanmış seçimlərlə keçir. Default
quraşdırma bunları aktiv edir: TypeScript, Tailwind CSS, ESLint, App Router,
Turbopack, import alias `@/*`.

Bunun əvəzinə interaktiv sual-cavabla getmək istəsən:

```bash
npx create-next-app@latest
```

Bu zaman görəcəyin suallar:

```txt
What is your project named? my-app
Would you like to use the recommended Next.js defaults?
    Yes, use recommended defaults - TypeScript, ESLint, Tailwind CSS, App Router, AGENTS.md
    No, reuse previous settings
    No, customize settings - Choose your own preferences
```

"customize settings" seçsən, əlavə suallar gələcək: TypeScript, linter
seçimi (ESLint/Biome/None), React Compiler, Tailwind CSS, `src/` qovluğu
istifadəsi, App Router seçimi, import alias, `AGENTS.md` daxil etmək.

> **Bilmək lazımdır:** `create-next-app` prosesi bitdikdən sonra layihə
> qovluğunu yaradır və bütün asılılıqları (`next`, `react`, `react-dom`)
> avtomatik quraşdırır.

### Əl ilə (manual) quraşdırma

İstəsən, sıfırdan özün də qura bilərsən:

```bash
npm i next@latest react@latest react-dom@latest
```

Sonra `package.json`-a bu script-ləri əlavə et:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "lint:fix": "eslint --fix"
  }
}
```

- `next dev` — development server-i Turbopack ilə (default bundler) başladır
- `next build` — production üçün build edir
- `next start` — production server-i başladır

Sonra `app/layout.tsx` (root layout, mütləq lazımdır, `<html>`/`<body>`
saxlamalıdır) və `app/page.tsx` (ana səhifə) yaradılır — bunu aşağıda ətraflı
görəcəyik.

> **Common mistake:** Root layout-u yaratmağı unutsan, `next dev` işə
> düşəndə Next.js onu avtomatik yaradır — amma özün nəzarətdə saxlamaq üçün
> yaratmaq daha yaxşıdır.

## Layihə Strukturu

### Əsas (top-level) qovluqlar

| Qovluq | Təyinat |
|---|---|
| `app` | App Router |
| `pages` | Pages Router (köhnə model) |
| `public` | Static asset-lər (şəkil, font və s.) |
| `src` | (opsional) tətbiq kodunu konfiqurasiya fayllarından ayırmaq üçün |

### Əsas fayllar

| Fayl | Təyinat |
|---|---|
| `next.config.js` | Next.js konfiqurasiyası |
| `package.json` | Asılılıqlar və script-lər |
| `instrumentation.ts` | OpenTelemetry/monitoring |
| `proxy.ts` | Next.js request proxy (middleware) |
| `.env`, `.env.local`, `.env.production`, `.env.development` | Environment dəyişənləri |
| `tsconfig.json` / `jsconfig.json` | TypeScript/JavaScript konfiqurasiyası |

### Routing faylları (`app/` daxilində)

| Fayl | Nə üçün |
|---|---|
| `layout` | Paylaşılan UI (header, nav, footer) |
| `page` | Route-u ictimai (public) edir |
| `loading` | Yüklənmə (skeleton) UI |
| `error` | Xəta UI (error boundary) |
| `not-found` | "Tapılmadı" UI |
| `route` | API endpoint |
| `template` | Hər naviqasiyada yenidən render olunan layout |
| `default` | Parallel route-lar üçün fallback |

**Vacib qayda:** Bir route yalnız o segment-də `page` ya da `route` faylı
olduqda **ictimai (routable)** olur. Yəni `app/blog/authors/` qovluğu olsa
da, içində `page.tsx` yoxdursa, `/blog/authors` URL-i mövcud olmayacaq.

### Nested route-lar

Qovluqlar URL segmentlərini müəyyən edir:

| Yol | URL |
|---|---|
| `app/page.tsx` | `/` |
| `app/blog/page.tsx` | `/blog` |
| `app/blog/authors/page.tsx` | `/blog/authors` |

### Dynamic route-lar

Segmenti kvadrat mötərizəyə alaraq parametrləşdirmək olar:

| Sintaksis | Mənası | Nümunə URL |
|---|---|---|
| `[segment]` | tək parametr | `app/blog/[slug]/page.tsx` → `/blog/hello-world` |
| `[...segment]` | catch-all (çoxlu segment) | `app/shop/[...slug]/page.tsx` → `/shop/geyim/koynek` |
| `[[...segment]]` | opsional catch-all | `app/docs/[[...slug]]/page.tsx` → `/docs` və ya `/docs/a/b` |

### Route Groups və Private Folder-lər

- `(qrupAdı)` — **Route Group**: qovluğu mötərizəyə alsan, URL-ə təsir
  etmir, sadəcə təşkilati məqsədlidir (məs. fərqli layout-lar üçün).
- `_qovluqAdı` — **Private Folder**: alt xətlə (underscore) başlayan
  qovluq routing sistemindən tamamilə kənarlaşdırılır — kod colocate etmək
  (səhifə ilə yanaşı saxlamaq) üçün təhlükəsizdir.

```
app/(marketing)/page.tsx     → "/"          (qrup URL-ə düşmür)
app/(shop)/cart/page.tsx     → "/cart"
app/blog/_components/Post.tsx → route deyil, sadəcə UI komponenti
```

> **Niyə vacibdir:** Route group-lar sayəsində eyni URL səviyyəsində
> fərqli layout-lar saxlaya bilərsən (məs. `(marketing)` və `(shop)`
> qrupları öz `layout.js` fayllarına malikdir).

## Səhifə (Page) yaratmaq

`app/` daxilində `page` faylı yaradıb default export React komponenti
yazmaq kifayətdir:

```tsx
// app/page.tsx
export default function Page() {
  return <h1>Hello Next.js!</h1>
}
```

Bu, `/` (ana səhifə) route-unu yaradır.

Blog səhifəsi üçün `app/blog/page.tsx`:

```tsx
// app/blog/page.tsx
import { getPosts } from '@/lib/posts'
import { Post } from '@/ui/post'

export default async function Page() {
  const posts = await getPosts()

  return (
    <ul>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  )
}
```

Diqqət et: `Page` funksiyası `async` — Server Component-lər birbaşa
`await` ilə data çəkə bilir (bunu 2-ci hissədə ətraflı görəcəyik).

## Layout yaratmaq

Layout — bir neçə səhifə arasında **paylaşılan** UI-dir. Naviqasiya zamanı
layout state-i saxlayır, interaktiv qalır, yenidən render olunmur.

```tsx
// app/layout.tsx — Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
```

`app/layout.tsx` — **root layout**-dur, `app/` kökündə olduğu üçün belə
adlanır. **Mütləqdir** və `<html>`/`<body>` teqlərini saxlamalıdır.

## Nested (iç-içə) route-lar

`/blog/[slug]` route-u 3 segmentdən ibarətdir: `/` (root), `blog`,
`[slug]` (leaf). Qovluqları iç-içə yerləşdirməklə bunu qururuq:

```
app/
  blog/
    page.tsx          → /blog
    [slug]/
      page.tsx        → /blog/[slug]
```

```tsx
// app/blog/[slug]/page.tsx
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}
```

Diqqət: `params` bir **Promise**-dır, ona görə `await params` lazımdır.

## Layout-ları nest etmək

Layout-lar da qovluq iyerarxiyasına uyğun avtomatik nest olunur:

```tsx
// app/blog/layout.tsx
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
```

Nəticədə: root layout → blog layout → blog page (və ya blog post page)
şəklində bir-birinin içinə düşür.

## Dynamic Segment-lər

Kvadrat mötərizəli qovluq adı (`[slug]`) data-dan generasiya olunan
route-lar yaratmaq üçündür (blog post-lar, məhsul səhifələri və s.).
`params` prop-u vasitəsilə dəyərə çatırsan (yuxarıdakı nümunəyə bax).

## Route Groups və Private Folder-lər

Artıq yuxarıda qeyd etdik. Əlavə olaraq: **çoxlu root layout** də mümkündür
— əgər tətbiqin tamam fərqli iki bölməsi varsa (məs. marketinq saytı vs
admin panel), üst səviyyə `layout.js`-i silib, hər route group içinə öz
`layout.js`-ini qoya bilərsən — hər biri öz `<html>`/`<body>`-inə malik
olmalıdır.

## Səhifələr arası keçid (Linking)

Naviqasiya üçün `next/link`-dən `<Link>` komponenti istifadə olunur — bu,
adi HTML `<a>` teqini genişləndirir, **prefetching** və **client-side
naviqasiya** əlavə edir:

```tsx
// app/ui/post.tsx
import Link from 'next/link'
import { getPosts } from '@/lib/posts'

export default async function Posts() {
  const posts = await getPosts()

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}
```

Daha mürəkkəb ehtiyaclar (məs. proqramatik naviqasiya) üçün `useRouter`
hook-u da mövcuddur (Client Component daxilində):

```tsx
'use client'
import { useRouter } from 'next/navigation'

export default function Button() {
  const router = useRouter()
  return <button onClick={() => router.push('/dashboard')}>Get Started</button>
}
```

> **Common mistake:** Adi `<a>` teqi ilə keçid etsən, tam səhifə yenidən
> yüklənir (full page reload) — prefetch və client-side transition itir.
> Daxili route-lar üçün həmişə `<Link>` istifadə et.

## Naviqasiya necə işləyir

Next.js sürətli naviqasiya üçün 3 mexanizm istifadə edir:

1. **Prefetching** — `<Link>` viewport-a girəndə arxa planda route-u əvvəlcədən
   yükləyir. Static route tam prefetch olunur; dynamic route isə `loading.tsx`
   varsa qismən (partial) prefetch olunur, yoxdursa ümumiyyətlə prefetch
   olunmur.
2. **Streaming** — server hazır olan hissələri client-ə tədricən göndərir,
   bütün route-un render olunmasını gözləmir. `loading.tsx` faylı yaratmaqla
   aktivləşir (arxada Next.js `page.tsx`-i avtomatik `<Suspense>` ilə əhatə
   edir):
   ```tsx
   // app/dashboard/loading.tsx
   export default function Loading() {
     return <LoadingSkeleton />
   }
   ```
3. **Client-side Transition** — `<Link>` ilə keçiddə səhifə tam reload
   olmur, paylaşılan layout-lar saxlanılır, yalnız məzmun dəyişir.

**Naviqasiyanı yavaşladan səbəblər və həll yolları:**

- Dynamic route-da `loading.tsx` yoxdursa → əlavə et.
- Dynamic segment `generateStaticParams` istifadə etmirsə → əlavə et ki,
  build vaxtı prerender olunsun:
  ```tsx
  export async function generateStaticParams() {
    const posts = await fetch('https://.../posts').then((res) => res.json())
    return posts.map((post) => ({ slug: post.slug }))
  }
  ```
- Yavaş şəbəkədə prefetch bitməyə bilər → `useLinkStatus` hook-u ilə
  gözləmə göstəricisi göstər.
- Böyük link siyahılarında (məs. infinite-scroll cədvəl) resurs
  qənaəti üçün `<Link prefetch={false}>` istifadə et.

## Praktika

Kiçik bir "mini-blog" strukturu qur:

1. `create-next-app` ilə yeni layihə yarat (TypeScript + App Router).
2. `app/blog/page.tsx` — statik massivdən (array) 3 postun siyahısını
   göstərsin, hər biri `<Link href={"/blog/" + slug}>` ilə bağlansın.
3. `app/blog/[slug]/page.tsx` — `params.slug`-a görə uyğun postun
   başlığını və mətnini göstərsin.
4. `app/blog/layout.tsx` — blog bölməsinə xüsusi `<section>` wrapper
   əlavə etsin (məs. kənar boşluq/stil).
5. `app/blog/loading.tsx` — sadə "Yüklənir..." mətni göstərsin.

Bunu tamamladıqdan sonra `npm run dev` ilə brauzerdə yoxla: səhifələr
arası keçiddə tam reload olmadığını gör.

## Xülasə

- Next.js = React + server-side rendering + routing + optimizasiya, "hazır
  qutuda". Bu kurs **App Router**-ə fokuslanır.
- `create-next-app@latest` ən sürətli başlanğıcdır; `--yes` default
  seçimlərlə keçir.
- `app/` qovluğu **file-system routing** istifadə edir: qovluq = URL
  segmenti, `page.tsx` = route-u ictimai edən fayl.
- `layout.tsx` paylaşılan UI-dir və nest olunur; root layout mütləqdir.
- `[slug]`, `[...slug]`, `[[...slug]]` — dynamic route sintaksisləri.
- `(qrup)` URL-ə təsir etmir; `_private` qovluq routing-dən tamam çıxır.
- Naviqasiya üçün həmişə `<Link>` istifadə et — prefetch + client-side
  transition avtomatik işləyir.

## Əlavə Oxu

- Mənbə: [nextjs.org/docs](https://nextjs.org/docs)
- [Installation](https://nextjs.org/docs/app/getting-started/installation)
- [Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)
- [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Linking and Navigating](https://nextjs.org/docs/app/getting-started/linking-and-navigating)

**Növbəti hissə:** [`nextjs-part2.md`](./nextjs-part2.md) — Server və Client
Components, Data Fetching.
