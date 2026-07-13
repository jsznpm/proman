# Next.js (App Router) Kursu — Hissə 5: Metadata, SEO, Şəkil və Font Optimizasiyası

> Çox hissəli kursun 5-ci hissəsidir. Bu hissə istehsala hazır (production-ready)
> feature-lara keçid edir: SEO üçün metadata, sosial media paylaşımı üçün OG
> şəkilləri, performans üçün şəkil/font optimizasiyası.

## Kim üçündür

Route-lar, layout-lar və data fetching-i bilən developer üçün. Bu
hissədən sonra: səhifə başlığı/description-u necə əlavə edəcəyini,
dinamik OG şəkilləri necə generasiya edəcəyini, `next/image` və
`next/font` ilə performansı necə artıracağını biləcəksən.

## Məzmun

- [Metadata API-yə giriş](#metadata-api-yə-giriş)
- [Statik Metadata](#statik-metadata)
- [Dinamik Metadata: `generateMetadata`](#dinamik-metadata-generatemetadata)
- [Data sorğusunun təkrarının qarşısını almaq](#data-sorğusunun-təkrarının-qarşısını-almaq)
- [Fayl-əsaslı Metadata](#fayl-əsaslı-metadata)
- [Favicon](#favicon)
- [Statik OG şəkilləri](#statik-og-şəkilləri)
- [Dinamik OG şəkilləri: `ImageResponse`](#dinamik-og-şəkilləri-imageresponse)
- [`next/image` ilə Şəkil Optimizasiyası](#nextimage-ilə-şəkil-optimizasiyası)
- [`next/font` ilə Font Optimizasiyası](#nextfont-ilə-font-optimizasiyası)
- [Praktika](#praktika)
- [Xülasə](#xülasə)
- [Əlavə Oxu](#əlavə-oxu)

## Metadata API-yə giriş

Metadata API-lar SEO və sosial media paylaşımı üçün tətbiqin
metadata-sını təyin etməyə imkan verir:

1. Statik **`metadata`** obyekti
2. Dinamik **`generateMetadata`** funksiyası
3. Fayl konvensiyaları (favicon, OG image, robots.txt, sitemap.xml)

Bunların hamısı ilə Next.js müvafiq `<head>` teqlərini avtomatik
generasiya edir.

> **Vacib:** `metadata` obyekti və `generateMetadata` funksiyası yalnız
> **Server Component**-lərdə dəstəklənir.

Hər route-da default olaraq iki `meta` teqi əlavə olunur (özün təyin
etməsən belə): `charset` və `viewport`.

## Statik Metadata

`layout.js`/`page.js`-dən `metadata` obyekti export et:

```tsx
// app/blog/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mənim Bloqum',
  description: 'Proqramlaşdırma haqqında düşüncələr',
}

export default function Layout() {}
```

## Dinamik Metadata: `generateMetadata`

Data-dan asılı metadata üçün `generateMetadata` funksiyasından
istifadə et:

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const post = await fetch(`https://api.vercel.app/blog/${slug}`).then((res) => res.json())

  return {
    title: post.title,
    description: post.description,
  }
}

export default function Page({ params }: Props) {}
```

> **Streaming metadata:** Dinamik render olunan səhifələrdə Next.js
> metadata-nı ayrıca stream edir — `generateMetadata` nəticələnən kimi
> HTML-ə inject olunur, UI render-ini bloklamır. Amma bu, metadata-nı
> `<head>`-də gözləyən bot/crawler-lər (Twitterbot, Slackbot, Bingbot)
> üçün **deaktiv**dir — onlar üçün metadata həmişə tam hazır göndərilir.

## Data sorğusunun təkrarının qarşısını almaq

Metadata və səhifənin özü **eyni** datanı çəkirsə, `React.cache` ilə
memoize et ki, sorğu iki dəfə getməsin:

```ts
// app/lib/data.ts
import { cache } from 'react'
import { db } from '@/app/lib/db'

export const getPost = cache(async (slug: string) => {
  return db.query.posts.findFirst({ where: eq(posts.slug, slug) })
})
```

```tsx
// app/blog/[slug]/page.tsx
import { getPost } from '@/app/lib/data'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug) // ilk çağırış
  return { title: post.title, description: post.description }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug) // yenidən fetch getmir, cache-dən gəlir
  return <div>{post.title}</div>
}
```

## Fayl-əsaslı Metadata

Bu xüsusi fayllar metadata üçün istifadə olunur:

| Fayl | Təyinat |
|---|---|
| `favicon.ico`, `apple-icon.jpg`, `icon.jpg` | App ikonları |
| `opengraph-image.jpg`, `twitter-image.jpg` | Sosial media şəkilləri |
| `robots.txt` | Crawler qaydaları |
| `sitemap.xml` | Sayt xəritəsi |

Bunları həm statik fayl kimi qoya, həm də kodla (`.js`/`.ts`/`.tsx`)
proqramatik generasiya edə bilərsən.

## Favicon

`app/` qovluğunun kökünə `favicon.ico` faylı qoy — kifayətdir.

## Statik OG şəkilləri

Sosial mediada (Facebook, Twitter/X və s.) paylaşılanda görünən şəkil.
`app/` kökünə `opengraph-image.jpg` qoy:

```
app/
  opengraph-image.jpg
  blog/
    opengraph-image.jpg   ← yalnız /blog route-u üçün, daha spesifikdir
```

Daha dərin qovluqdakı şəkil daha spesifik olduğu üçün üstünlük təşkil
edir (`app/blog/opengraph-image.jpg` yalnız `/blog` altında işləyir).

## Dinamik OG şəkilləri: `ImageResponse`

Data-ya görə fərqli OG şəkli lazımdırsa (məs. hər blog post üçün öz
başlığı ilə), `next/og`-dan `ImageResponse` istifadə et:

```tsx
// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'
import { getPost } from '@/app/lib/data'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {post.title}
      </div>
    )
  )
}
```

`ImageResponse` JSX + CSS-i PNG-yə çevirir (`@vercel/og`/`satori`
əsasında). Yalnız **flexbox** və CSS-in bir alt hissəsi dəstəklənir —
`display: grid` kimi mürəkkəb layout-lar işləmir.

## `next/image` ilə Şəkil Optimizasiyası

`<Image>` komponenti adi `<img>`-i genişləndirir:

- **Ölçü optimizasiyası** — hər cihaz üçün doğru ölçülü şəkli müasir
  formatda (WebP) serve edir
- **Vizual sabitlik** — yüklənərkən layout shift-i önləyir
- **Sürətli yükləmə** — viewport-a girənə qədər lazy-load edir
- **Çeviklik** — remote şəkilləri belə on-demand resize edir

### Lokal şəkillər

```tsx
import Image from 'next/image'
import ProfileImage from './profile.png'

export default function Page() {
  return (
    <Image
      src={ProfileImage}
      alt="Müəllifin şəkli"
      // width/height/blurDataURL avtomatik təyin olunur
    />
  )
}
```

Statik `import` istifadə etsən, Next.js `width`/`height`-i özü
müəyyənləşdirir (layout shift-in qarşısını alır). `public/` qovluğundan
istifadə edəndə isə özün ver:

```tsx
<Image src="/profile.png" alt="Müəllifin şəkli" width={500} height={500} />
```

### Remote şəkillər

```tsx
<Image
  src="https://s3.amazonaws.com/my-bucket/profile.png"
  alt="Müəllifin şəkli"
  width={500}
  height={500}
/>
```

Build zamanı Next.js remote fayla çata bilmədiyi üçün `width`/`height`-i
əl ilə ver (ya da `fill` prop-u ilə valideyn elementi doldur). Təhlükəsizlik
üçün `next.config.ts`-də icazə verilən domenləri təyin et:

```ts
// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/my-bucket/**',
      },
    ],
  },
}

export default config
```

> **Common mistake:** `remotePatterns`-ı unutsan, remote şəkil
> render olunmaz — Next.js icazəsiz domendən şəkil yükləməz (bu,
> təhlükəsizlik üçün bilərəkdən belədir).

## `next/font` ilə Font Optimizasiyası

`next/font` fontları **öz serverində** (self-host) saxlayır — brauzer
üçüncü tərəf domenə (məs. Google Fonts-a) sorğu göndərmir, məxfilik və
performans yaxşılaşır, layout shift olmur.

### Google Fonts

```tsx
// app/layout.tsx
import { Geist } from 'next/font/google'

const geist = Geist({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" className={geist.className}>
      <body>{children}</body>
    </html>
  )
}
```

Variable font olmayan fontlar üçün `weight` təyin etmək lazımdır:

```tsx
import { Roboto } from 'next/font/google'

const roboto = Roboto({ weight: '400', subsets: ['latin'] })
```

> **Tövsiyə:** Mümkün olduqca **variable font** işlət — daha az fayl,
> daha çevik çəki/stil dəstəyi.

### Lokal fontlar

```tsx
import localFont from 'next/font/local'

const myFont = localFont({ src: './my-font.woff2' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" className={myFont.className}>
      <body>{children}</body>
    </html>
  )
}
```

Bir neçə weight/style faylı olan fontlar üçün `src` massiv ola bilər:

```ts
const roboto = localFont({
  src: [
    { path: './Roboto-Regular.woff2', weight: '400', style: 'normal' },
    { path: './Roboto-Bold.woff2', weight: '700', style: 'normal' },
  ],
})
```

> **Diqqət:** Font **komponentə bağlıdır** (scoped) — bütün tətbiqə
> tətbiq etmək üçün root layout-a (`app/layout.tsx`) əlavə et.

## Praktika

Mini-blog layihəni davam etdir:

1. `app/blog/layout.tsx`-ə statik `metadata` obyekti əlavə et
   (`title`, `description`).
2. `app/blog/[slug]/page.tsx`-ə `generateMetadata` yaz — post
   başlığını `<title>` kimi göstərsin. `getPost` funksiyasını
   `React.cache` ilə bəzə ki, `generateMetadata` və `Page` eyni
   sorğunu iki dəfə göndərməsin.
3. `app/opengraph-image.tsx` yarat — sadə mətn ("Mənim Bloqum") olan
   statik OG şəkli generasiya etsin.
4. `next/font/google`-dan bir font seç (məs. `Inter`) və root
   layout-a tətbiq et.
5. Blog post-larda istifadə etdiyin şəkilləri (əgər varsa) `<img>`
   əvəzinə `next/image`-ın `<Image>` komponenti ilə əvəz et.

## Xülasə

- `metadata` obyekti statik, `generateMetadata` isə data-dan asılı
  başlıq/description üçündür — hər ikisi yalnız Server Component-də
  işləyir.
- Eyni datanı metadata və səhifə üçün iki dəfə çəkməmək üçün
  `React.cache` işlət.
- `favicon.ico`, `opengraph-image.jpg`, `robots.txt`, `sitemap.xml` —
  fayl-əsaslı metadata konvensiyaları; daha dərin qovluqdakı fayl daha
  spesifikdir.
- Data-ya bağlı OG şəkli üçün `next/og`-dan `ImageResponse` (yalnız
  flexbox/məhdud CSS dəstəklənir).
- `next/image` avtomatik ölçü/format optimizasiyası, lazy-load və
  layout-shift qorunması verir; remote şəkillər üçün
  `remotePatterns` təyin etmək məcburidir.
- `next/font` fontları self-host edir, layout shift-siz, məxfilik
  dostu; root layout-a tətbiq et ki, bütün tətbiqə yayılsın.

## Əlavə Oxu

- [Metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Image Optimization](https://nextjs.org/docs/app/getting-started/images)
- [Font Optimization](https://nextjs.org/docs/app/getting-started/fonts)

**Növbəti hissə:** [`nextjs-part6.md`](./nextjs-part6.md) — Route
Handlers və Proxy/Middleware.
