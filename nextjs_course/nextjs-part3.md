# Next.js (App Router) Kursu — Hissə 3: Caching və Revalidating

> Çox hissəli kursun 3-cü hissəsidir. 2-ci hissədə ([`nextjs-part2.md`](./nextjs-part2.md))
> data fetching və Server Action-ları öyrəndik. İndi həmin data-nın necə
> **cache** olunduğuna və necə **fresh** saxlanıldığına baxırıq.

## Kim üçündür

Server Component-lərdə data çəkməyi bacaran developer üçün. Bu hissədən
sonra: Next.js-in default caching davranışını, ISR-i (Incremental Static
Regeneration), `revalidatePath`/`revalidateTag`-i və yeni `use cache`
direktivini biləcəksən.

## Vacib qeyd: iki caching modeli

Next.js 16-da **iki** caching modeli var:

1. **Default (əvvəlki) model** — `next.config.js`-də heç nə aktiv
   etməmisənsə, bu model işləyir. `fetch` cache seçimləri,
   `unstable_cache`, route segment config (`revalidate`, `dynamic`) buna
   aiddir. Bu hissənin əsas fokusu budur, çünki `create-next-app` ilə
   yaratdığın layihə default olaraq bunu istifadə edir.
2. **Cache Components modeli** — `next.config.ts`-də
   `cacheComponents: true` aktiv etdikdə açılan yeni model. `"use cache"`
   direktivi, `cacheLife`, `cacheTag`, `updateTag` buna aiddir. Bu hissənin
   sonunda qısaca izah olunur.

## Məzmun

- [`fetch` cache-i necə işləyir](#fetch-cache-i-necə-işləyir)
- [`unstable_cache` — fetch olmayan funksiyalar üçün](#unstable_cache--fetch-olmayan-funksiyalar-üçün)
- [Route Segment Config](#route-segment-config)
- [Time-based Revalidation (ISR)](#time-based-revalidation-isr)
- [On-demand Revalidation](#on-demand-revalidation)
- [Sorğuların Dedublikasiyası (`React.cache`)](#sorğuların-dedublikasiyası-reactcache)
- [Data Preloading](#data-preloading)
- [Yeni Model: `use cache` Direktivi](#yeni-model-use-cache-direktivi)
- [Praktika](#praktika)
- [Xülasə](#xülasə)
- [Əlavə Oxu](#əlavə-oxu)

## `fetch` cache-i necə işləyir

Default olaraq `fetch` sorğuları **cache olunmur**. Cache etmək üçün
`cache: 'force-cache'` seçimini ver:

```tsx
export default async function Page() {
  const data = await fetch('https://...', { cache: 'force-cache' })
}
```

Vaxta əsaslı revalidasiya üçün `next.revalidate`:

```tsx
export default async function Page() {
  const data = await fetch('https://...', { next: { revalidate: 3600 } })
}
```

> **Bilmək lazımdır:** Next.js, Request-time API-lardan (`cookies()`,
> `headers()` və s.) **əvvəl** rast gəlinən `fetch` sorğularını default
> cache edir, **sonra** rast gəlinənləri isə cache etmir.

## `unstable_cache` — fetch olmayan funksiyalar üçün

ORM/database sorğusu kimi `fetch` istifadə etməyən funksiyaları cache
etmək üçün `unstable_cache`:

```ts
// app/lib/data.ts
import { unstable_cache } from 'next/cache'
import { db } from '@/lib/db'

export const getCachedUser = unstable_cache(
  async (id: string) => {
    return db.select().from(users).where(eq(users.id, id)).then((res) => res[0])
  },
  ['user'], // cache key prefix
  {
    tags: ['user'],
    revalidate: 3600,
  }
)
```

3-cü arqument: `tags` (on-demand revalidasiya üçün) və `revalidate`
(saniyə).

## Route Segment Config

Page/layout/route faylından export edilən dəyişənlərlə cache
davranışını konfiqurasiya edə bilərsən.

### `dynamic`

```tsx
export const dynamic = 'auto'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
```

| Dəyər | Mənası |
|---|---|
| `'auto'` (default) | Mümkün qədər çox cache et, dynamic-ə keçidə icazə ver |
| `'force-dynamic'` | Hər istifadəçi üçün request vaxtı render et (bütün `fetch`-lər `no-store`) |
| `'error'` | Prerender məcburi et; Request-time API/uncached data işlədilsə xəta ver |
| `'force-static'` | Prerender məcburi et; `cookies()`, `headers()`, `useSearchParams()` boş dəyər qaytarır |

### `revalidate`

```tsx
export const revalidate = false
// false | 0 | number (saniyə)
```

- `false` (default) — `force-cache` olan/Request-time API-dan əvvəl
  aşkarlanan `fetch`-ləri sonsuza qədər cache edir.
- `0` — layout/page-i **həmişə dinamik** render edir.
- `number` — n saniyədən bir revalidasiya edir.

> **Vacib:** `revalidate` dəyəri statik analiz edilə bilən olmalıdır
> (`revalidate = 600` düzgündür, `revalidate = 60 * 10` yanlışdır).
> Bir route-da bir neçə layout/page varsa, **ən aşağı** `revalidate`
> dəyəri bütün route üçün istifadə olunur.

## Time-based Revalidation (ISR)

**ISR (Incremental Static Regeneration)** — bütün saytı yenidən build
etmədən statik məzmunu yeniləməyə imkan verir. Faydaları:

- Statik, prerender olunmuş səhifələr əksər sorğular üçün serve olunur
  (server yükü azalır)
- Düzgün `cache-control` header-ləri avtomatik əlavə olunur
- Böyük miqdarda kontent səhifəsi olsa da `next build` vaxtı uzanmır

Minimal nümunə:

```tsx
// app/blog/[id]/page.tsx
export const revalidate = 60 // ən çoxu 60 saniyədə bir invalidasiya

export async function generateStaticParams() {
  const posts = await fetch('https://api.vercel.app/blog').then((res) => res.json())
  return posts.map((post) => ({ id: String(post.id) }))
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await fetch(`https://api.vercel.app/blog/${id}`).then((res) => res.json())
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  )
}
```

**Necə işləyir:**

1. `next build` zamanı bütün məlum blog post-lar generasiya olunur.
2. Bu səhifələrə sorğular cache olunur, ani qaytarılır.
3. 60 saniyə keçdikdən sonra növbəti sorğu **hələ də köhnə (stale) cache**
   nəticəni qaytarır.
4. Cache invalidasiya olur, arxa planda yeni versiya generasiya olunmağa
   başlayır.
5. Uğurla generasiya olunduqdan sonra növbəti sorğu yeni versiyanı
   qaytarır və cache edir.
6. Əvvəl generasiya olunmamış `/blog/26` sorğusu gəlsə, on-demand
   generasiya olunur (`dynamicParams` ilə bu davranışı dəyişmək olar);
   post mövcud deyilsə, 404 qaytarılır.

> **Tövsiyə:** Yüksək revalidasiya vaxtı seç (1 saniyə yox, 1 saat).
> Daha dəqiq nəzarət lazımdırsa, on-demand revalidasiyaya keç. Real-time
> data lazımdırsa, dinamik render-ə keç (`revalidate = 0`).

## On-demand Revalidation

Mutasiyadan (data dəyişikliyindən) sonra konkret route-u/tag-i əl ilə
invalidasiya etmək üçün.

### `revalidatePath`

```ts
// app/actions.ts
'use server'
import { revalidatePath } from 'next/cache'

export async function createPost() {
  // Data-nı dəyiş...
  revalidatePath('/posts')
}
```

### `revalidateTag`

Əvvəlcə `fetch` sorğusunu tag-la:

```tsx
export async function getUserById(id: string) {
  const data = await fetch(`https://...`, { next: { tags: ['user'] } })
}
```

Sonra Server Action/Route Handler-də invalidasiya et:

```ts
'use server'
import { revalidateTag } from 'next/cache'

export async function updateUser(id: string) {
  // Data-nı dəyiş...
  revalidateTag('user')
}
```

`unstable_cache` istifadə edirsənsə, `tags` seçimini funksiyanın 3-cü
arqumentində ver (yuxarıdakı nümunə).

> **Nə vaxt hansını işlətmək lazımdır:** Path-i bilirsənsə və dəqiq
> route-u invalidasiya etmək istəyirsənsə `revalidatePath`; müxtəlif
> route-larda paylaşılan data varsa (məs. eyni tag-lı bir neçə `fetch`)
> daha dəqiq nəzarət üçün `revalidateTag` daha yaxşıdır.

## Sorğuların Dedublikasiyası (`React.cache`)

`fetch` avtomatik memoize olunur, amma ORM/database sorğusu üçün
`React.cache` ilə eyni render zamanı təkrar sorğunun qarşısını al:

```ts
// app/lib/data.ts
import { cache } from 'react'
import { db, posts, eq } from '@/lib/db'

export const getPost = cache(async (id: string) => {
  return db.query.posts.findFirst({ where: eq(posts.id, parseInt(id)) })
})
```

> **Diqqət:** `React.cache` yalnız **bir request daxilində** işləyir —
> requestlər arasında paylaşılmır. Requestlər arası cache üçün
> `unstable_cache` və ya `use cache` lazımdır.

## Data Preloading

Blocking iş başlamazdan əvvəl data yükləməsini erkən başlatmaq üçün
`preload` utility pattern-i:

```ts
// utils/get-item.ts
import { cache } from 'react'
import 'server-only'

export const getItem = cache(async (id: string) => { /* ... */ })

export const preload = (id: string) => {
  void getItem(id)
}
```

```tsx
// app/item/[id]/page.tsx
import { getItem, preload, checkIsAvailable } from '@/lib/data'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  preload(id) // data yüklənməsini indi başlat
  const isAvailable = await checkIsAvailable() // bu müddətdə paralel işləyir

  return isAvailable ? <Item id={id} /> : null
}

async function Item({ id }: { id: string }) {
  const result = await getItem(id) // artıq başlamış ola bilər
}
```

## Yeni Model: `use cache` Direktivi

`next.config.ts`-də `cacheComponents: true` aktiv etdikdə açılan yeni
model. Funksiya/komponentin başında `"use cache"` yazaraq nəticəni
cache edirsən:

```tsx
// app/lib/data.ts
import { cacheLife, cacheTag } from 'next/cache'

export async function getUsers() {
  'use cache'
  cacheLife('hours')
  cacheTag('users')
  return db.query('SELECT * FROM users')
}
```

- **`cacheLife(profil)`** — cache-in nə qədər "təzə" qalacağını
  müəyyən edir. Hazır profillər: `seconds`, `minutes`, `hours`, `days`,
  `weeks`, `max` (hər birinin öz `stale`/`revalidate`/`expire` dəyəri
  var), ya da fərdi obyekt: `cacheLife({ stale: 3600, revalidate: 7200, expire: 86400 })`.
- **`cacheTag(ad)`** — sonradan `revalidateTag`/`updateTag` ilə
  invalidasiya üçün etiketləmə.
- **`updateTag(ad)`** — cache-i **dərhal** bitirir (yalnız Server
  Action-larda) — istifadəçi öz dəyişikliyini dərhal görür
  ("read-your-own-writes").
- **`revalidateTag(ad, profil)`** — stale-while-revalidate: köhnə
  məzmun dərhal göstərilir, arxa planda yeni versiya hazırlanır.

Runtime data-dan asılı olan (fresh olmalı) komponentlər `"use cache"`
yerinə `<Suspense>` ilə əhatələnir, ona görə hər sorğuda təzədən render
olunur:

```tsx
import { Suspense } from 'react'

async function LatestPosts() {
  const data = await fetch('https://api.example.com/posts')
  const posts = await data.json()
  return <ul>{posts.map((p) => <li key={p.id}>{p.title}</li>)}</ul>
}

export default function Page() {
  return (
    <>
      <h1>Bloqum</h1>
      <Suspense fallback={<p>Yüklənir...</p>}>
        <LatestPosts />
      </Suspense>
    </>
  )
}
```

> **Bu kursun qalan hissələri üçün qeyd:** Default (əvvəlki) model
> yenə geniş yayılmış və `create-next-app` default-udur — sən layihəndə
> `cacheComponents` aktiv etməyibsənsə, bu hissədə öyrəndiyin
> `revalidate`/`revalidatePath`/`revalidateTag`/`unstable_cache`
> yanaşmasını istifadə et.

## Praktika

Mini-blogunda (1-2-ci hissələrdən) bunu et:

1. `app/blog/page.tsx`-də post siyahısını çəkən `fetch`-ə
   `next: { revalidate: 3600, tags: ['posts'] }` əlavə et.
2. `app/blog/[slug]/page.tsx`-ə `export const revalidate = 60` əlavə et
   və `generateStaticParams` yaz ki, build zamanı bütün post-lar
   prerender olunsun.
3. `addComment` Server Action-ında (2-ci hissədən) mutasiyadan sonra
   `revalidateTag('posts')` çağır.
4. `NEXT_PRIVATE_DEBUG_CACHE=1` mühit dəyişənini `.env`-ə əlavə edib
   `next build && next start` ilə production rejimində cache
   hit/miss-lərini konsolda izlə.

## Xülasə

- İki model var: **default** (`revalidate`, `unstable_cache`, fetch
  `cache`/`next.revalidate`) və **Cache Components** (`"use cache"`,
  `cacheLife`, `cacheTag`, `updateTag`) — `next.config.ts`-də
  `cacheComponents: true` ilə açılır.
- `fetch` default cache olunmur; `cache: 'force-cache'` və ya
  `next: { revalidate }` ilə cache-ə qoşulur.
- ORM/database sorğuları üçün `unstable_cache`.
- Route segment config (`dynamic`, `revalidate`) bütün layout/page-in
  render rejimini idarə edir.
- ISR = statik render + arxa planda vaxta əsaslı yeniləmə.
  `revalidate` + `generateStaticParams` ilə qurulur.
- Mutasiyadan sonra `revalidatePath` (route-a görə) və ya
  `revalidateTag` (etiketə görə) çağır.
- Eyni render zamanı sorğu təkrarını `React.cache` ilə önlə.

## Əlavə Oxu

- [Caching (Cache Components)](https://nextjs.org/docs/app/getting-started/caching)
- [Revalidating (Cache Components)](https://nextjs.org/docs/app/getting-started/revalidating)
- [Caching and Revalidating (Previous Model)](https://nextjs.org/docs/app/guides/caching-without-cache-components)
- [Incremental Static Regeneration](https://nextjs.org/docs/app/guides/incremental-static-regeneration)

**Növbəti hissə:** [`nextjs-part4.md`](./nextjs-part4.md) — Routing Fayl
Konvensiyaları.
