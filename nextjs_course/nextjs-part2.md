# Next.js (App Router) Kursu — Hissə 2: Server/Client Components, Data Fetching, Server Actions, Error Handling

> Çox hissəli kursun 2-ci hissəsidir. 1-ci hissədə ([`nextjs-part1.md`](./nextjs-part1.md))
> quraşdırma, layihə strukturu, layout/page, dynamic route-lar öyrənildi.
> Burada onların üzərinə davam edirik.

## Kim üçündür

1-ci hissəni bitirmiş, artıq `app/` strukturunu, layout/page anlayışını
bilən developer üçün. Bu hissədən sonra: Server/Client Component fərqini,
data necə çəkiləcəyini, formaların server-də necə işlədiyini və xətaların
necə tutulacağını biləcəksən.

## Məzmun

- [Server Components vs Client Components](#server-components-vs-client-components)
- [Necə işləyir: RSC Payload, Hydration](#necə-işləyir-rsc-payload-hydration)
- [`"use client"` sərhəddi](#use-client-sərhəddi)
- [Server və Client Component-ləri birləşdirmək](#server-və-client-component-ləri-birləşdirmək)
- [Server-only kodu qorumaq](#server-only-kodu-qorumaq)
- [Data Fetching: Server Components](#data-fetching-server-components)
- [Streaming: `loading.js` və `<Suspense>`](#streaming-loadingjs-və-suspense)
- [Data Fetching: Client Components](#data-fetching-client-components)
- [Sequential vs Parallel Fetching](#sequential-vs-parallel-fetching)
- [Data Mutasiyası: Server Functions / Server Actions](#data-mutasiyası-server-functions--server-actions)
- [Xəta İdarəetməsi](#xəta-idarəetməsi)
- [Praktika](#praktika)
- [Xülasə](#xülasə)
- [Əlavə Oxu](#əlavə-oxu)

## Server Components vs Client Components

Default olaraq **hər layout və page bir Server Component-dir**. Bu o
deməkdir ki, komponent server-də render olunur, data server-dən birbaşa
çəkilir, nəticə HTML/RSC formatında client-ə göndərilir.

**Client Component** lazımdır, əgər:

- **state** və **event handler**-lərə ehtiyac var (`useState`, `onClick`,
  `onChange`)
- **lifecycle** məntiqi lazımdır (`useEffect`)
- brauzer-only API-lərə ehtiyac var (`localStorage`, `window`,
  `navigator.geolocation`)
- **custom hook** istifadə olunur

**Server Component** lazımdır, əgər:

- database/API-dan data çəkilir
- API key, token kimi sirlər client-ə ötürülməməlidir
- brauzerə göndərilən JS miqdarını azaltmaq lazımdır
- ilk render sürətini (FCP) yaxşılaşdırmaq lazımdır

Nümunə: `Page` server-də postu çəkir, nəticəni `LikeButton`-a prop kimi
ötürür — `LikeButton` isə interaktiv olduğu üçün Client Component-dir:

```tsx
// app/[id]/page.tsx — Server Component
import LikeButton from '@/app/ui/like-button'
import { getPost } from '@/lib/data'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPost(id)

  return (
    <div>
      <h1>{post.title}</h1>
      <LikeButton likes={post.likes} />
    </div>
  )
}
```

```tsx
// app/ui/like-button.tsx — Client Component
'use client'

import { useState } from 'react'

export default function LikeButton({ likes }: { likes: number }) {
  const [count, setCount] = useState(likes)
  return <button onClick={() => setCount(count + 1)}>{count} bəyənmə</button>
}
```

## Necə işləyir: RSC Payload, Hydration

Server tərəfdə Next.js render işini route segmentlərinə (layout/page)
bölür:

- **Server Components** — **React Server Component Payload (RSC Payload)**
  adlı yığcam binar formata render olunur. Bu format: Server Component-lərin
  render nəticəsini, Client Component-lərin harada render olunacağına dair
  yer tutucuları və onların JS fayllarına referansları, Server-dən
  Client-ə ötürülən prop-ları saxlayır.
- **Client Components** + RSC Payload birlikdə HTML prerender edir.

Client tərəfdə (ilk yükləmə):

1. **HTML** — dərhal sürətli, qeyri-interaktiv preview göstərir.
2. **RSC Payload** — Client və Server komponent ağaclarını reconcile edir.
3. **JavaScript** — Client Component-ləri hydrate edir (interaktiv edir).

**Hydration** — React-in DOM-a event handler-lər bağlayaraq statik HTML-i
interaktiv etmə prosesidir.

Sonrakı naviqasiyalarda RSC Payload prefetch/cache olunur, Client
Component-lər isə tam client tərəfdə render olunur (server-render HTML-siz).

## `"use client"` sərhəddi

Client Component yaratmaq üçün faylın **ən yuxarısına** (import-lardan
əvvəl) `"use client"` yazılır:

```tsx
// app/ui/counter.tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>{count} bəyənmə</p>
      <button onClick={() => setCount(count + 1)}>Klikləyin</button>
    </div>
  )
}
```

`"use client"` Server və Client **module graph** (modul ağacı) arasında
**sərhəd** yaradır. Bir fayl bu direktivlə işarələnəndə, **onun bütün
import-ları və birbaşa render etdiyi komponentlər** client bundle-a
daxil olur. Ona görə hər komponentə ayrıca yazmağa ehtiyac yoxdur.

> **Vacib:** Bu qayda yalnız Client Component-in **import etdiyi** və
> **birbaşa render etdiyi** modullara aiddir. `children`/prop kimi
> ötürülən Server Component-lərə aid deyil — onlar client-in modul
> ağacına daxil olmur, server-də render olunub nəticə kimi ötürülür.

### JS bundle ölçüsünü azaltmaq

`"use client"`-i UI-nin böyük hissəsinə deyil, konkret interaktiv
komponentə əlavə et:

```tsx
// app/layout.tsx — Server Component olaraq qalır
import Search from './search'   // Client Component
import Logo from './logo'       // Server Component

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Logo />
        <Search />
      </nav>
      <main>{children}</main>
    </>
  )
}
```

Yalnız `Search` (axtarış zolağı) interaktivdir, `"use client"` yalnız
`search.tsx`-də olur — `Logo` və `Layout` Server Component olaraq qalır.

## Server və Client Component-ləri birləşdirmək

### Data ötürmək

```tsx
// Server Component
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPost(id)
  return <LikeButton likes={post.likes} />
}
```

> **Bilmək lazımdır:** Client Component-ə ötürülən prop-lar React
> tərəfindən **serializable** olmalıdır (funksiya, class instance kimi
> şeylər ötürülə bilməz).

### Server Component-i Client Component-in `children`-i kimi ötürmək

```tsx
// app/ui/modal.tsx — Client Component
'use client'
export default function Modal({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```

```tsx
// app/page.tsx — Server Component
import Modal from './ui/modal'
import Cart from './ui/cart'   // Server Component

export default function Page() {
  return (
    <Modal>
      <Cart />
    </Modal>
  )
}
```

Bu pattern-də `Cart` server-də əvvəlcədən render olunur, RSC Payload-a
daxil olur — `Modal`-ın client state-i (açıq/bağlı) isə heç bir təsir
etmir.

### Context Provider-lər

React context Server Component-lərdə dəstəklənmir. Provider-i Client
Component kimi yaz, sonra Server Component-də (məs. `layout`) import et:

```tsx
// app/theme-provider.tsx
'use client'
import { createContext } from 'react'

export const ThemeContext = createContext({})

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
}
```

```tsx
// app/layout.tsx
import ThemeProvider from './theme-provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

> **Common mistake:** Provider-i bütün `<html>` sənədini əhatə edəcək
> şəkildə yerləşdirmə — mümkün qədər dərində (`{children}`-i saracaq
> şəkildə) yerləşdir ki, Next.js Server Component-lərin statik
> hissələrini optimallaşdıra bilsin.

### Third-party komponentlər

`useState` kimi client-only feature işlədən, amma `"use client"`
direktivi olmayan paket komponentini (məs. `acme-carousel`) birbaşa
Server Component-də işlətsən, xəta alarsan. Həll: öz wrapper-ində
`"use client"` ilə örtmək:

```tsx
// app/carousel.tsx
'use client'
import { Carousel } from 'acme-carousel'
export default Carousel
```

İndi `<Carousel />`-i Server Component-də sərbəst işlədə bilərsən.

## Server-only kodu qorumaq

`NEXT_PUBLIC_` prefiksi olmayan environment dəyişənləri client bundle-a
düşmür (boş sətirlə əvəzlənir). Amma səhvən server-only funksiyanı
client-də import etmək riskini önləmək üçün `server-only` paketindən
istifadə et:

```ts
// lib/data.ts
import 'server-only'

export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: { authorization: process.env.API_KEY },
  })
  return res.json()
}
```

Bu, Client Component-də import edilməyə cəhd olunanda **build-time
xəta** verir. Əks halı üçün `client-only` paketi mövcuddur.

## Data Fetching: Server Components

### `fetch` API ilə

```tsx
// app/blog/page.tsx
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
  return (
    <ul>
      {posts.map((post) => <li key={post.id}>{post.title}</li>)}
    </ul>
  )
}
```

> **Bilmək lazımdır:**
> - Eyni component ağacında eyni `fetch` sorğuları default olaraq
>   **memoize** olunur — data lazım olan komponentdə birbaşa çəkə bilərsən,
>   prop-ları aşağı ötürməyə (prop drilling) ehtiyac qalmır.
> - `fetch` default olaraq **cache olunmur** və nəticə gələnə qədər
>   render-i bloklayır. Nəticəni cache etmək üçün `use cache` direktivi,
>   fresh data-nı stream etmək üçün isə `<Suspense>` istifadə et (3-cü
>   hissədə ətraflı).

### ORM/database ilə

```tsx
// app/blog/page.tsx
import { db, posts } from '@/lib/db'

export default async function Page() {
  const allPosts = await db.select().from(posts)
  return <ul>{allPosts.map((post) => <li key={post.id}>{post.title}</li>)}</ul>
}
```

Server Component server-də render olunduğu üçün credential/query
məntiqi client bundle-a düşmür — database sorğusunu birbaşa yaza
bilərsən. Amma access-i özün autentifikasiya/avtorizasiya ilə qorumalısan.

## Streaming: `loading.js` və `<Suspense>`

Yavaş data sorğusu bütün route-un render-ini bloklaya bilər. Streaming
route-u kiçik hissələrə (chunk) bölüb tədricən göndərməyə imkan verir.

### `loading.js` ilə (bütün səhifəni stream etmək)

```tsx
// app/blog/loading.tsx
export default function Loading() {
  return <div>Yüklənir...</div>
}
```

Arxa planda `loading.js` avtomatik olaraq `page.js`-i `<Suspense>` ilə
əhatə edir.

### `<Suspense>` ilə (daha dəqiq nəzarət)

```tsx
// app/blog/page.tsx
import { Suspense } from 'react'
import BlogList from '@/components/BlogList'
import BlogListSkeleton from '@/components/BlogListSkeleton'

export default function BlogPage() {
  return (
    <div>
      <header>
        <h1>Bloqa xoş gəldiniz</h1>
      </header>
      <main>
        <Suspense fallback={<BlogListSkeleton />}>
          <BlogList />
        </Suspense>
      </main>
    </div>
  )
}
```

`header` dərhal göndərilir, `BlogList` isə data hazır olanda stream
olunur.

## Data Fetching: Client Components

### `use` API ilə stream

Server Component-də promise-i **await etmədən** Client Component-ə
ötür, Client Component-də `use()` ilə oxu:

```tsx
// app/blog/page.tsx
import Posts from '@/app/ui/posts'
import { Suspense } from 'react'

export default function Page() {
  const posts = getPosts() // await YOX
  return (
    <Suspense fallback={<div>Yüklənir...</div>}>
      <Posts posts={posts} />
    </Suspense>
  )
}
```

```tsx
// app/ui/posts.tsx
'use client'
import { use } from 'react'

export default function Posts({ posts }: { posts: Promise<{ id: string; title: string }[]> }) {
  const allPosts = use(posts)
  return <ul>{allPosts.map((p) => <li key={p.id}>{p.title}</li>)}</ul>
}
```

### Community kitabxanalar (SWR, React Query)

```tsx
'use client'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function BlogPage() {
  const { data, error, isLoading } = useSWR('https://api.vercel.app/blog', fetcher)

  if (isLoading) return <div>Yüklənir...</div>
  if (error) return <div>Xəta: {error.message}</div>

  return <ul>{data.map((post: { id: string; title: string }) => <li key={post.id}>{post.title}</li>)}</ul>
}
```

## Sequential vs Parallel Fetching

**Sequential** — bir sorğu digərinin nəticəsindən asılıdırsa:

```tsx
export default async function Page({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const artist = await getArtist(username)

  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<div>Yüklənir...</div>}>
        <Playlists artistID={artist.id} />
      </Suspense>
    </>
  )
}
```

**Parallel** — asılı olmayan sorğuları eyni vaxtda başlatmaq üçün
`Promise.all` istifadə et (sorğular `fetch` çağırılan kimi başlayır):

```tsx
async function getArtist(username: string) { /* ... */ }
async function getAlbums(username: string) { /* ... */ }

export default async function Page({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params

  const artistData = getArtist(username)
  const albumsData = getAlbums(username)

  const [artist, albums] = await Promise.all([artistData, albumsData])

  return (
    <>
      <h1>{artist.name}</h1>
      <Albums list={albums} />
    </>
  )
}
```

> **Common mistake:** `const artist = await getArtist(...)` sətrindən
> sonra `const albums = await getAlbums(...)` yazsan, ikinci sorğu
> birincinin bitməsini gözləyəcək — halbuki asılı deyillərsə,
> `Promise.all` ilə paralel başlatmaq daha sürətlidir. Diqqət:
> `Promise.all`-da bir sorğu fail olsa, bütün əməliyyat fail olur —
> lazım gələrsə `Promise.allSettled` işlət.

## Data Mutasiyası: Server Functions / Server Actions

**Server Function** — server-də işləyən asinxron funksiya, client-dən
şəbəkə sorğusu ilə çağırıla bilir. `action`/mutasiya kontekstində
**Server Action** adlanır.

### Yaratmaq

`"use server"` direktivi ilə:

```ts
// app/lib/actions.ts
import { auth } from '@/lib/auth'

export async function createPost(formData: FormData) {
  'use server'
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const title = formData.get('title')
  const content = formData.get('content')
  // Data-nı dəyiş
  // Cache-i revalidate et
}
```

> **Təhlükəsizlik xəbərdarlığı:** Server Function-lar birbaşa `POST`
> sorğusu ilə də çağırıla bilər — yalnız UI-dən deyil. **Hər Server
> Function daxilində** autentifikasiya/avtorizasiyanı özün yoxlamalısan.

Client Component-də Server Function **təyin edilə bilməz**, amma
`"use server"` olan fayldan import edilib çağırıla bilər:

```tsx
// app/ui/button.tsx
'use client'
import { createPost } from '@/app/actions'

export function Button() {
  return <button formAction={createPost}>Yarat</button>
}
```

### Formalar ilə çağırmaq

```tsx
// app/ui/form.tsx
import { createPost } from '@/app/actions'

export function Form() {
  return (
    <form action={createPost}>
      <input type="text" name="title" />
      <input type="text" name="content" />
      <button type="submit">Yarat</button>
    </form>
  )
}
```

Form invoke olunanda funksiya avtomatik `FormData` obyekti alır.

### Event handler ilə çağırmaq

```tsx
// app/like-button.tsx
'use client'
import { incrementLike } from './actions'
import { useState } from 'react'

export default function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes)
  return (
    <button onClick={async () => setLikes(await incrementLike())}>
      Cəmi bəyənmə: {likes}
    </button>
  )
}
```

### Pending state göstərmək

```tsx
'use client'
import { useActionState, startTransition } from 'react'
import { createPost } from '@/app/actions'

export function Button() {
  const [state, action, pending] = useActionState(createPost, false)
  return (
    <button onClick={() => startTransition(action)}>
      {pending ? 'Yüklənir...' : 'Post Yarat'}
    </button>
  )
}
```

### Mutasiyadan sonra data-nı yeniləmək

```ts
// app/lib/actions.ts
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  'use server'
  // Data-nı dəyiş...
  revalidatePath('/posts')
}
```

### Mutasiyadan sonra yönləndirmək (redirect)

```ts
'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  // Data-nı dəyiş...
  revalidatePath('/posts')
  redirect('/posts')
}
```

> **Diqqət:** `redirect()` bir idarə-axını istisnası (control-flow
> exception) atır — ondan sonrakı kod işləməz. Fresh data lazımdırsa,
> `redirect`-dən **əvvəl** `revalidatePath`/`revalidateTag` çağır.

## Xəta İdarəetməsi

Xətalar iki kateqoriyaya bölünür: **gözlənilən (expected)** və
**tutulmamış (uncaught)**.

### Gözlənilən xətalar

Form validasiyası, uğursuz sorğu kimi hallar. Bunları `throw` ilə deyil,
**qaytarılan dəyər** kimi modelləşdir:

```ts
// app/actions.ts
'use server'
export async function createPost(prevState: any, formData: FormData) {
  const res = await fetch('https://api.vercel.app/posts', {
    method: 'POST',
    body: { title: formData.get('title'), content: formData.get('content') },
  })

  if (!res.ok) {
    return { message: 'Post yaratmaq alınmadı' }
  }
}
```

```tsx
// app/ui/form.tsx
'use client'
import { useActionState } from 'react'
import { createPost } from '@/app/actions'

export function Form() {
  const [state, formAction, pending] = useActionState(createPost, { message: '' })
  return (
    <form action={formAction}>
      <input type="text" name="title" required />
      {state?.message && <p aria-live="polite">{state.message}</p>}
      <button disabled={pending}>Post Yarat</button>
    </form>
  )
}
```

### `notFound()` ilə 404

```tsx
// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()
  return <div>{post.title}</div>
}
```

```tsx
// app/blog/[slug]/not-found.tsx
export default function NotFound() {
  return <div>404 - Səhifə tapılmadı</div>
}
```

### Tutulmamış xətalar: `error.js`

```tsx
// app/dashboard/error.tsx
'use client' // error boundary-lər Client Component olmalıdır

import { useEffect } from 'react'

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Nəsə səhv getdi!</h2>
      <button onClick={() => unstable_retry()}>Yenidən cəhd et</button>
    </div>
  )
}
```

Xətalar ən yaxın parent `error.tsx`-ə "bubble up" olur — beləliklə
route iyerarxiyasının müxtəlif səviyyələrinə `error.tsx` qoyaraq
qranulyar xəta idarəetməsi qura bilərsən.

> **Diqqət:** error boundary-lər event handler-lərin **içindəki**
> xətaları tutmur — yalnız render zamanı olanları. Event handler
> xətalarını `try/catch` + `useState` ilə özün idarə et.

### Global xətalar

```tsx
// app/global-error.tsx
'use client'

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <html>
      <body>
        <h2>Nəsə səhv getdi!</h2>
        <button onClick={() => unstable_retry()}>Yenidən cəhd et</button>
      </body>
    </html>
  )
}
```

`global-error.js` root layout-u əvəz etdiyi üçün öz `<html>`/`<body>`
teqlərini saxlamalıdır.

## Praktika

1-ci hissədəki mini-blog layihəsini davam etdir:

1. `app/blog/[slug]/page.tsx`-də post tapılmadıqda `notFound()` çağır,
   `app/blog/[slug]/not-found.tsx` yarat.
2. `app/lib/actions.ts`-də `"use server"` ilə `addComment(formData)`
   Server Function yaz — form-dan gələn şərhi (sadəcə consol-a `log`
   etməklə simulyasiya et) qəbul etsin və `revalidatePath('/blog/[slug]')`
   çağırsın.
3. Şərh formunu `<form action={addComment}>` ilə qur, `useActionState`
   ilə uğursuz olduqda xəta mesajı göstər.
4. `LikeButton` adlı Client Component yarat — `useState` ilə lokal say
   saxlasın, kliklədikdə server-ə fərz edilən bir Server Function
   çağırsın.
5. `app/blog/error.tsx` yaz — şərh əlavə edərkən xəta atılarsa
   istifadəçiyə "Yenidən cəhd et" düyməsi göstərsin.

## Xülasə

- Default: hər şey **Server Component**. `"use client"` yalnız
  interaktivlik/state/brauzer API lazım olan yerdə.
- `"use client"` sərhəddir: o faylın import etdiyi/render etdiyi hər şey
  client bundle-a düşür — `children`/prop kimi ötürülən Server
  Component-lərə aid deyil.
- Server Component-də `fetch`/ORM ilə birbaşa data çək; nəticəni prop
  kimi Client Component-ə ötür və ya `use()` + `<Suspense>` ilə stream et.
- `loading.js` bütün səhifəni, `<Suspense>` isə konkret hissəni stream
  edir.
- Asılı olmayan sorğuları `Promise.all` ilə paralel başlat.
- Data dəyişikliyi üçün `"use server"` ilə **Server Function** yaz,
  formalarda `action` prop-u ilə çağır, `revalidatePath`/`revalidateTag`
  ilə cache-i yenilə, `redirect()` ilə yönləndir.
- Gözlənilən xətaları **qaytarılan dəyər** kimi, tutulmamış xətaları isə
  `error.tsx` boundary-ləri ilə idarə et.

## Əlavə Oxu

- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Fetching Data](https://nextjs.org/docs/app/getting-started/fetching-data)
- [Mutating Data](https://nextjs.org/docs/app/getting-started/mutating-data)
- [Error Handling](https://nextjs.org/docs/app/getting-started/error-handling)

**Növbəti hissə:** [`nextjs-part3.md`](./nextjs-part3.md) — Caching və
Revalidating.
