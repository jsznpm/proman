# Next.js (App Router) Kursu — Hissə 4: Routing Fayl Konvensiyaları

> Çox hissəli kursun 4-cü hissəsidir. Bu hissədə 1-ci hissədə görülən
> routing əsaslarının (page/layout/dynamic segment) üzərinə **daha
> qabaqcıl** file-system routing xüsusiyyətlərini əlavə edirik:
> `generateStaticParams`, `template.js`, Parallel Routes, Intercepting
> Routes və Route Segment Config.

## Kim üçündür

`app/` strukturunu, dynamic segment-ləri (`[slug]`) bilən developer
üçün. Bu hissədən sonra: modal/dashboard kimi mürəkkəb UI-ları file-system
routing ilə necə quracağını biləcəksən.

## Məzmun

- [Dynamic Segment-lər: dərinləşmiş baxış](#dynamic-segment-lər-dərinləşmiş-baxış)
- [`generateStaticParams`](#generatestaticparams)
- [`template.js` — `layout.js`-dən fərqi](#templatejs--layoutjs-dən-fərqi)
- [Parallel Routes (`@slot`)](#parallel-routes-slot)
- [Intercepting Routes](#intercepting-routes)
- [Parallel + Intercepting: Modal Pattern](#parallel--intercepting-modal-pattern)
- [Route Segment Config](#route-segment-config)
- [Praktika](#praktika)
- [Xülasə](#xülasə)
- [Əlavə Oxu](#əlavə-oxu)

## Dynamic Segment-lər: dərinləşmiş baxış

1-ci hissədə `[slug]`, `[...slug]`, `[[...slug]]` sintaksisini gördük.
Bir daha xatırladaq və TypeScript tərəfini əlavə edək:

| Route | Nümunə URL | `params` |
|---|---|---|
| `app/blog/[slug]/page.js` | `/blog/a` | `{ slug: 'a' }` |
| `app/shop/[...slug]/page.js` | `/shop/a/b` | `{ slug: ['a', 'b'] }` |
| `app/shop/[[...slug]]/page.js` | `/shop` | `{ slug: undefined }` |

TypeScript-də tip təyini üçün generasiya olunan helper-lər istifadə et:

```tsx
export default async function Page(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params
  return <h1>Blog post: {slug}</h1>
}
```

`params` həmişə **Promise**-dır — brauzerdə istifadəçi istənilən URL
yaza biləcəyi üçün dəyər tipi geniş (`string`/`string[]`/`undefined`)
saxlanılır. Sabit dəyər çoxluğu olduğu hallarda (məs. `[locale]`)
runtime validasiyası ilə daralda bilərsən:

```tsx
import { notFound } from 'next/navigation'
import type { Locale } from '@i18n/types'
import { isValidLocale } from '@i18n/utils'

function assertValidLocale(value: string): asserts value is Locale {
  if (!isValidLocale(value)) notFound()
}

export default async function Page(props: PageProps<'/[locale]'>) {
  const { locale } = await props.params
  assertValidLocale(locale)
  // artıq locale tipi Locale-dır
}
```

Client Component-də `params`-a çatmaq üçün `use()` API-si ya da
`useParams()` hook-u işlədilir.

## `generateStaticParams`

Bu funksiya dynamic route-ları **build vaxtı** statik generasiya etməyə
imkan verir (request vaxtı əvəzinə):

```tsx
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // ...
}
```

`generateStaticParams` daxilindəki `fetch` sorğuları **avtomatik
dedublikasiya olunur** — eyni data üçün Layout/Page/başqa
`generateStaticParams` funksiyalarında təkrar network sorğusu getmir,
build sürətlənir.

`generateStaticParams`-da qaytarılmayan (build zamanı bilinməyən) bir
`slug` üçün sorğu gələrsə, o səhifə **on-demand** (request zamanı)
generasiya olunur — bu davranışı `dynamicParams` seçimi ilə dəyişmək
olar (aşağıda).

> **Bonus:** Bu funksiya dynamic Route Handler-lərdə də işləyir —
> API cavablarını build vaxtı statik generasiya etmək üçün.

## `template.js` — `layout.js`-dən fərqi

`template.js` görünüş olaraq `layout.js`-ə bənzəyir (uşaq elementləri
əhatə edir), amma **fərqli davranışı** var:

- **`layout.js`** — naviqasiyalar arasında **saxlanılır** (persist),
  state itmir, yenidən render olunmur.
- **`template.js`** — hər naviqasiyada **unikal key** alır, yəni
  içindəki Client Component-lərin state-i **sıfırlanır**.

Nə vaxt `template.js` lazımdır:

- Naviqasiyada `useEffect`-i yenidən sinxronlaşdırmaq
- Uşaq Client Component-in state-ini sıfırlamaq (məs. input sahəsi)
- Framework default davranışını dəyişmək (layout daxilindəki Suspense
  yalnız ilk yükləmədə fallback göstərir, template isə **hər**
  naviqasiyada göstərir)

```tsx
// app/template.tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```

Komponent iyerarxiyasında `template.js` `layout.js` ilə `error.js`
arasında render olunur — `error.js`, `loading.js`, `not-found.js`,
`page.js`-i əhatə edir, amma **eyni seqmentdəki** `layout.js`-i əhatə
etmir.

> **Common mistake:** `template.js`-i hər layout-a əvəz kimi
> istifadə etmə — əksər hallarda `layout.js` kifayətdir. `template.js`-i
> yalnız state sıfırlaması **konkret olaraq lazım olduqda** işlət,
> əks halda gərəksiz remount-lar performansa təsir edər.

## Parallel Routes (`@slot`)

Parallel Routes eyni layout daxilində **bir neçə səhifəni eyni anda**
(və ya şərtə əsasən) render etməyə imkan verir — dashboard, feed kimi
yüksək dinamik bölmələr üçün faydalıdır.

### Konvensiya

`@folder` ilə adlandırılmış **slot**-lar yaradılır:

```
app/
  @analytics/
    page.tsx
  @team/
    page.tsx
  layout.tsx
  page.tsx
```

```tsx
// app/layout.tsx
export default function Layout({
  children,
  team,
  analytics,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <>
      {children}
      {team}
      {analytics}
    </>
  )
}
```

> **Vacib:** Slot-lar URL-ə **təsir etmir**. `@analytics/views`-in URL-i
> sadəcə `/views`-dur. `children` prop-u da örtük (implicit) slot-dur —
> `app/page.js` əslində `app/@children/page.js`-ə bərabərdir.

### `default.js` — uyğunlaşmayan slot-lar üçün fallback

Fərz et `@team` slotunda `/settings` səhifəsi var, amma `@analytics`-də
yoxdur. `/settings`-ə keçəndə (**soft navigation** — client-side):
`@team` `/settings`-i göstərir, `@analytics` isə **öz aktiv state-ini
saxlayır** (URL ilə uyğun olmasa belə).

Amma **hard navigation**-da (səhifə refresh) Next.js uyğun olmayan
slot-lar üçün aktiv state-i bilə bilmir — `default.js` render edir, o
da yoxdursa **404**.

```tsx
// app/@analytics/default.tsx
export default function Default() {
  return null
}
```

### İstifadə nümunələri

**Şərti routing (rol-a görə):**

```tsx
// app/dashboard/layout.tsx
import { checkUserRole } from '@/lib/auth'

export default function Layout({
  user,
  admin,
}: {
  user: React.ReactNode
  admin: React.ReactNode
}) {
  const role = checkUserRole()
  return role === 'admin' ? admin : user
}
```

**Tab Group:** slot daxilində öz `layout.tsx`-i ilə tab naviqasiyası:

```tsx
// app/@analytics/layout.tsx
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Link href="/page-views">Page Views</Link>
        <Link href="/visitors">Visitors</Link>
      </nav>
      <div>{children}</div>
    </>
  )
}
```

**Müstəqil Loading/Error UI:** Parallel Route-lar müstəqil stream oluna
bilər — hər slot öz `loading.js`/`error.js`-inə malik ola bilər.

## Intercepting Routes

Intercepting Routes tətbiqin **başqa bir hissəsindəki route-u** cari
layout daxilində açmağa imkan verir — istifadəçi kontekstdən çıxmadan
(məs. feed-də şəklə kliklədikdə modal içində açılması, amma URL-ə
birbaşa keçəndə tam səhifə göstərilməsi).

### Konvensiya

| Sintaksis | Mənası |
|---|---|
| `(.)folder` | Eyni səviyyədə seqmenti tuturq |
| `(..)folder` | Bir səviyyə yuxarıdakı seqmenti tutur |
| `(..)(..)folder` | İki səviyyə yuxarıdakı seqmenti tutur |
| `(...)folder` | Root `app` qovluğundan tutur |

> **Vacib:** `(..)` konvensiyası **route seqmentinə** əsaslanır, fayl
> sisteminə yox — yəni `@slot` qovluqlarını nəzərə almır. Bu səbəbdən
> `@modal/(..)photo` faktiki fayl sistemində iki səviyyə yuxarıda olsa
> da, route seqmenti olaraq yalnız **bir** səviyyə yuxarı sayılır.

## Parallel + Intercepting: Modal Pattern

Bu iki xüsusiyyət birlikdə **deep-link dəstəkləyən modal** qurmaq üçün
işlədilir. Həll etdiyi problemlər:

- Modal məzmununu URL vasitəsilə **paylaşıla bilən** etmək
- Səhifə refresh olanda modalı bağlamaq əvəzinə **konteksti saxlamaq**
- Geri naviqasiyada **modalı bağlamaq** (əvvəlki route-a getmək əvəzinə)
- İrəli naviqasiyada modalı **yenidən açmaq**

### Addım-addım: Login Modal

1. `/login` route-u — əsas (tam) login səhifəsini render edir:

```tsx
// app/login/page.tsx
import { Login } from '@/app/ui/login'

export default function Page() {
  return <Login />
}
```

2. `@auth` slotuna `default.tsx` əlavə et — modal aktiv olmayanda heç
   nə render olunmasın:

```tsx
// app/@auth/default.tsx
export default function Default() {
  return null
}
```

3. `@auth` slotu daxilində `/login`-i **intercept** et:

```tsx
// app/@auth/(.)login/page.tsx
import { Modal } from '@/app/ui/modal'
import { Login } from '@/app/ui/login'

export default function Page() {
  return (
    <Modal>
      <Login />
    </Modal>
  )
}
```

4. Root layout-da `@auth` slotunu render et:

```tsx
// app/layout.tsx
import Link from 'next/link'

export default function Layout({
  auth,
  children,
}: {
  auth: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <>
      <nav>
        <Link href="/login">Modalı aç</Link>
      </nav>
      <div>{auth}</div>
      <div>{children}</div>
    </>
  )
}
```

`<Link href="/login">`-ə kliklədikdə — client-side naviqasiya olduğu
üçün modal açılır. Refresh və ya birbaşa URL-ə keçiddə isə tam
`/login` səhifəsi göstərilir.

5. Modalı bağlamaq üçün `router.back()`:

```tsx
// app/ui/modal.tsx
'use client'
import { useRouter } from 'next/navigation'

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <>
      <button onClick={() => router.back()}>Bağla</button>
      <div>{children}</div>
    </>
  )
}
```

`<Link>` ilə başqa bir route-a keçəndə `@auth` slotunun boş qalması
üçün catch-all fallback yarat:

```tsx
// app/@auth/[...catchAll]/page.tsx
export default function CatchAll() {
  return null
}
```

> **Digər istifadə hallarını düşün:** qalereyada foto modalı +
> ayrıca `/photo/[id]` səhifəsi, yan panel-də alış-veriş səbəti.

## Route Segment Config

Page/Layout/Route Handler-dən export edilən dəyişənlərlə seqmentin
davranışı konfiqurasiya olunur:

| Seçim | Tip | Default |
|---|---|---|
| `dynamicParams` | `boolean` | `true` |
| `runtime` | `'nodejs' \| 'edge'` | `'nodejs'` |
| `preferredRegion` | `'auto' \| 'global' \| 'home' \| string \| string[]` | `'auto'` |
| `maxDuration` | `number` | Deployment platformasına görə |

- **`dynamicParams`** — `generateStaticParams`-da olmayan bir dynamic
  segment sorğulananda nə baş verəcəyini idarə edir: `true` (default) —
  on-demand generasiya olunur; `false` — 404 qaytarılır.
- **`runtime`** — route-un Node.js yoxsa Edge runtime-də işləyəcəyini
  seçir.
- **`preferredRegion`** — deployment zamanı üstünlük verilən region(lar).
- **`maxDuration`** — funksiyanın icra vaxtının maksimum həddi (saniyə).

> **Diqqət:** `cacheComponents: true` aktivdirsə (3-cü hissədə gördüyümüz
> yeni Cache Components modeli), `dynamic`, `revalidate`, `fetchCache`
> kimi bəzi köhnə route segment config seçimləri **silinir** — onların
> yerini `"use cache"` + `cacheLife` tutur.

```tsx
// app/blog/[slug]/page.tsx
export const dynamicParams = false // yalnız generateStaticParams-dakı slug-lar işləsin, qalanı 404
export const runtime = 'nodejs'
```

## Praktika

Mini-blog layihəni davam etdir:

1. `app/blog/[slug]/page.tsx`-ə `generateStaticParams` əlavə et ki,
   bütün post-lar build vaxtı prerender olunsun.
2. `app/blog/template.tsx` yarat — hər blog post naviqasiyasında
   "Oxuma müddəti: ~2 dəq" kimi sadə bir Client Component-in state-inin
   sıfırlandığını (məs. `useState(0)` ilə "bu səhifədə vaxt sayğacı")
   yoxla.
3. Kiçik bir `@sidebar` parallel route slotu yarat — layout-da
   `children` ilə yanaşı göstər, `@sidebar/default.tsx`-i `null`
   qaytaracaq şəkildə yaz.
4. Bonus: bir şəkil qalereyası simulyasiyası üçün `@modal` slotu və
   `(.)photo/[id]` intercepting route qur — kliklədikdə modal açılsın,
   `router.back()` ilə bağlansın.

## Xülasə

- `generateStaticParams` dynamic route-ları build vaxtı prerender edir;
  `fetch` sorğuları avtomatik dedublikasiya olunur.
- `template.js` `layout.js`-dən fərqli olaraq hər naviqasiyada
  remount olunur — state sıfırlama lazım olanda işlət.
- `@folder` (Parallel Route) eyni layout-da bir neçə səhifəni paralel
  render edir; URL-ə təsir etmir; uyğunsuz slot-lar üçün `default.js`
  fallback-dır.
- `(.)`/`(..)`/`(..)(..)`/`(...)` (Intercepting Route) başqa route-u
  cari layout daxilində, URL-i maskalayaraq göstərir.
- Parallel + Intercepting birlikdə deep-link dəstəkləyən modal
  pattern-i üçün standart həlldir.
- Route Segment Config (`dynamicParams`, `runtime`, `preferredRegion`,
  `maxDuration`) seqment səviyyəsində davranışı tənzimləyir.

## Əlavə Oxu

- [Dynamic Route Segments](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes)
- [Parallel Routes](https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes)
- [Intercepting Routes](https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes)
- [template.js](https://nextjs.org/docs/app/api-reference/file-conventions/template)
- [Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)

**Növbəti hissə:** [`nextjs-part5.md`](./nextjs-part5.md) — Metadata,
SEO, Şəkil və Font Optimizasiyası.
