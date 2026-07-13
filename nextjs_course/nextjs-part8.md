# Next.js (App Router) Kursu — Hissə 8: Production Checklist, Deployment və Praktiki Layihə

> Çox hissəli kursun **son** hissəsidir. Bu hissədə tətbiqi production-a
> çıxarmazdan əvvəl yoxlamalı olduğun siyahını, deployment seçimlərini
> və bütün kurs boyu öyrəndiklərini birləşdirən kiçik end-to-end
> layihəni görəcəyik.

## Kim üçündür

1–7-ci hissələri bitirmiş, tətbiqini real istifadəçilərə çıxarmağa
hazırlaşan developer üçün.

## Məzmun

- [Avtomatik Optimizasiyalar](#avtomatik-optimizasiyalar)
- [Development Zamanı Checklist](#development-zamanı-checklist)
- [Production-a Çıxmazdan Əvvəl](#production-a-çıxmazdan-əvvəl)
- [Deployment Seçimləri](#deployment-seçimləri)
- [Node.js Server](#nodejs-server)
- [Docker](#docker)
- [Static Export](#static-export)
- [Adapters (Vercel, Bun və s.)](#adapters-vercel-bun-və-s)
- [Praktiki Layihə: Mini-Blog](#praktiki-layihə-mini-blog)
- [Kurs Xülasəsi](#kurs-xülasəsi)
- [Əlavə Oxu](#əlavə-oxu)

## Avtomatik Optimizasiyalar

Bunlar konfiqurasiyasız, default aktivdir:

- **Server Components** — default; client bundle ölçüsünə təsir etmir
- **Code-splitting** — route seqmentlərinə görə avtomatik
- **Prefetching** — `<Link>` viewport-a girəndə arxa planda
- **Prerendering** — build vaxtı server/client komponentlər render
  olunub cache-lənir
- **Caching** — data sorğuları, render nəticələri, statik asset-lər
  cache olunur

## Development Zamanı Checklist

### Routing və Render

- Paylaşılan UI üçün **layout-lardan** istifadə et (partial rendering
  üçün)
- Daxili naviqasiya üçün həmişə **`<Link>`** işlət
- `error.tsx`/`not-found.tsx` ilə xətaları zərif idarə et
- `"use client"` sərhədini **mümkün qədər aşağıda** saxla (JS bundle
  ölçüsü üçün)
- `cookies()`/`searchParams` kimi Request-time API-lar bütün route-u
  (root layout-da işlədilsə, **bütün tətbiqi**) dinamik render edir —
  bilərəkdən istifadə et, lazım gələrsə `<Suspense>` ilə əhatələ

### Data Fetching və Cache

- Server Component-lərdə data çək (2-ci hissə)
- Route Handler-ləri yalnız **Client Component-lərdən** backend-ə
  çatmaq üçün işlət — Server Component-dən Route Handler çağırma
  (əlavə server sorğusu yaradır, birbaşa funksiyanı çağır)
- `loading.js`/`<Suspense>` ilə stream et
- Asılı olmayan sorğuları paralel başlat
- `fetch` olmayan sorğuların (`unstable_cache`) cache olunduğunu yoxla
- Statik asset-lər üçün `public/` qovluğu

### UI və Əlçatanlıq (Accessibility)

- Formlarda Server Action + server-side validasiya (7-ci hissə)
- `app/global-error.tsx` — bütün tətbiq üçün tutarlı fallback
- `next/font` — layout shift-siz font
- `next/image` — optimallaşdırılmış şəkil
- `eslint-plugin-jsx-a11y` — əlçatanlıq problemlərini erkən tap

### Təhlükəsizlik

- **Hər Server Action-da** autentifikasiya/avtorizasiyanı yoxla —
  Proxy-yə və ya layout/page səviyyəli yoxlamaya təkcə güvənmə
  (7-ci hissə)
- Database girişini `server-only` DAL-a köçür
- `.env*` fayllarının `.gitignore`-da olduğunu, yalnız public
  dəyişənlərin `NEXT_PUBLIC_` prefiksli olduğunu yoxla (6-cı hissə)
- Həssas datanı client-ə ötürməmək üçün **tainting** düşün

### Metadata və SEO

- `generateMetadata`/statik `metadata` ilə başlıq/description (5-ci
  hissə)
- OG şəkilləri, `sitemap.xml`, `robots.txt`

### Tip Təhlükəsizliyi

- TypeScript + TS Plugin — xətaları erkən tut

## Production-a Çıxmazdan Əvvəl

```bash
next build   # lokal build, xətaları tut
next start   # production-a bənzər mühitdə performansı ölç
```

- **Lighthouse** (incognito rejimdə) — istifadəçi təcrübəsini simulyasiya et
- **`useReportWebVitals`** hook-u — Core Web Vitals data-sını analytics-ə göndər
- **`@next/bundle-analyzer`** — JS bundle ölçüsünü analiz et, böyük
  modulları tap

## Deployment Seçimləri

| Seçim | Feature Dəstəyi |
|---|---|
| Node.js server | Tam |
| Docker container | Tam |
| Static export | Məhdud |
| Adapters (Vercel, Bun, s.) | Platformaya görə dəyişir |

### Node.js Server

`package.json`-da `build`/`start` script-ləri kifayətdir:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

```bash
npm run build
npm run start
```

Node.js dəstəkləyən istənilən provider-ə (Railway, Replit,
Flightcontrol, Hostinger və s.) deploy oluna bilər — **bütün**
Next.js xüsusiyyətlərini dəstəkləyir.

### Docker

Next.js Docker konteynerini dəstəkləyən istənilən provider-ə (o
cümlədən Kubernetes) deploy oluna bilər. `output: "standalone"` ilə
minimal, production-hazır image qurula bilər. Bütün feature-lar
dəstəklənir.

### Static Export

Server tələb edən feature-lar (ISR, Server Action, dynamic render)
**dəstəklənmir**. Yalnız statik HTML/CSS/JS output verən sadə saytlar
üçün (S3, Nginx, GitHub Pages kimi hostinglərə).

### Adapters (Vercel, Bun və s.)

**Deployment Adapter API** platformalara Next.js tətbiqinin build/deploy
prosesini fərdiləşdirməyə imkan verir. **Verified adapter**-lar (Vercel,
Bun) tam uyğunluq test suite-indən keçir. Cloudflare və Netlify öz
inteqrasiyalarını təklif edir (Adapter API üzərində deyil — feature
dəstəyi fərqli ola bilər).

> **Tövsiyə:** Platform seçərkən ISR, Server Action, Proxy kimi
> istifadə etdiyin xüsusiyyətlərin həmin platformada dəstəklənib-
> dəstəklənmədiyini yoxla (3-cü hissədəki ISR "Platform Support"
> cədvəlinə bax).

## Praktiki Layihə: Mini-Blog

Kurs boyu tikdiyimiz mini-blogu bir yerə yığaq. Aşağıdakı struktur
1–7-ci hissələrdəki bütün konsepsiyaları birləşdirir:

```
app/
  layout.tsx                    ← root layout, ThemeProvider (Hissə 2)
  page.tsx                      ← ana səhifə
  opengraph-image.tsx           ← statik OG şəkli (Hissə 5)
  blog/
    layout.tsx                  ← statik metadata (Hissə 5)
    template.tsx                ← naviqasiyada state sıfırlama (Hissə 4)
    page.tsx                    ← post siyahısı, tag-lənmiş fetch (Hissə 3)
    loading.tsx                 ← streaming fallback (Hissə 2)
    error.tsx                   ← xəta boundary (Hissə 2)
    [slug]/
      page.tsx                  ← generateStaticParams + generateMetadata (Hissə 4, 5)
      not-found.tsx             ← 404 (Hissə 2)
      opengraph-image.tsx       ← post-a görə OG şəkli (Hissə 5)
  dashboard/
    page.tsx                    ← auth-qorunan səhifə (Hissə 7)
  login/
    page.tsx                    ← login formu (Hissə 7)
  api/
    posts/
      route.ts                  ← Route Handler CRUD (Hissə 6)
  actions/
    auth.ts                     ← signup/login Server Action-ları (Hissə 7)
  lib/
    dal.ts                      ← verifySession, getUser (Hissə 7)
    session.ts                  ← cookie-əsaslı session (Hissə 7)
    data.ts                     ← getPost/getPosts, cache-lənmiş (Hissə 2, 3)
proxy.ts                        ← /dashboard qorunması (Hissə 6, 7)
.env.local                      ← SESSION_SECRET, DATABASE_URL (Hissə 6)
```

### Yekun tapşırıq

Əgər bu kursun praktikalarını ardıcıl etmisənsə, artıq bu strukturun
əksəriyyəti hazırdır. Yekun olaraq:

1. `next build && next start` ilə production rejimində layihəni
   işə sal, hər səhifəyə bax (blog siyahısı, post, dashboard, login).
2. Lighthouse ilə ana səhifəni yoxla, tövsiyələrə bax.
3. `@next/bundle-analyzer` quraşdır, ən böyük 3 modulu tap.
4. Layihəni GitHub-a push et, Vercel (ya da seçdiyin platform) ilə
   deploy et — `SESSION_SECRET`/`DATABASE_URL` kimi environment
   variable-ları platform panelində təyin etməyi unutma.
5. Playwright ilə production URL-inə qarşı sadə bir "ana səhifədən
   bloqa keçid" E2E testi yaz.

Bu addımları tamamladıqdan sonra Next.js App Router ilə sıfırdan
production-a qədər bir tətbiq qurmuş olacaqsan.

## Kurs Xülasəsi

Bu 8 hissədə öyrəndiklərin:

1. **Giriş və Quraşdırma** — `create-next-app`, `app/` strukturu,
   layout/page, dynamic route-lar, `<Link>` ilə naviqasiya
2. **Server/Client Components, Data Fetching** — `"use client"`
   sərhəddi, `fetch`/ORM ilə data çəkmə, streaming, Server Action-larla
   mutasiya, xəta idarəetməsi
3. **Caching və Revalidating** — `fetch` cache, `unstable_cache`, ISR,
   `revalidatePath`/`revalidateTag`, yeni `use cache` modeli
4. **Routing Fayl Konvensiyaları** — `generateStaticParams`,
   `template.js`, Parallel/Intercepting Routes, Route Segment Config
5. **Metadata, SEO, Optimizasiya** — `generateMetadata`, OG şəkilləri,
   `next/image`, `next/font`
6. **Route Handlers, Proxy, Env Vars** — API endpoint-lər, sorğu-öncəsi
   məntiq, `.env` idarəetməsi
7. **Autentifikasiya, Formlar, Testing** — session/DAL/DTO pattern-i,
   Server Action-larla formlar, Vitest/Playwright
8. **Production Checklist və Deployment** — bu hissə

## Əlavə Oxu

- [Production Checklist](https://nextjs.org/docs/app/guides/production-checklist)
- [Deploying](https://nextjs.org/docs/app/getting-started/deploying)
- [Self-Hosting](https://nextjs.org/docs/app/guides/self-hosting)
- Bütün kursun mənbəyi: [nextjs.org/docs](https://nextjs.org/docs)
- Plan sənədi: [`nextjs.plan.md`](./nextjs.plan.md)

**Bu kursun sonuncu hissəsidir.** Əvvəlki hissələr:
[Hissə 1](./nextjs-part1.md) ·
[Hissə 2](./nextjs-part2.md) ·
[Hissə 3](./nextjs-part3.md) ·
[Hissə 4](./nextjs-part4.md) ·
[Hissə 5](./nextjs-part5.md) ·
[Hissə 6](./nextjs-part6.md) ·
[Hissə 7](./nextjs-part7.md)
