# Next.js (App Router) Kursu — Plan

Bu kurs Next.js-in rəsmi sənədlərinə (nextjs.org/docs) əsaslanaraq sıfırdan
işlək səviyyəyə qədər App Router yanaşmasını öyrədir. Server Components,
data fetching, caching, routing fayl konvensiyaları, metadata/SEO, route
handlers, autentifikasiya, testing və deployment daxil olmaqla, real layihə
qura bilmək üçün lazım olan bütün əsas mövzuları əhatə edir.

**Mənbə:** https://nextjs.org/docs (App Router bölməsi)

**Dil:** Azərbaycan dili

## Hissələr

1. **`nextjs-part1.md`** — Giriş, Quraşdırma və Layihə Strukturu
   - Next.js nədir, niyə istifadə olunur (SSR/SSG/ISR icmalı)
   - `create-next-app` ilə quraşdırma
   - Layihə strukturu (`app/`, `public/`, konfiqurasiya faylları)
   - Layouts və Pages (`layout.js`, `page.js` əsasları)
   - Linking və Navigating (`<Link>`, `useRouter`)

2. **`nextjs-part2.md`** — Server və Client Components, Data Fetching
   - Server Components vs Client Components fərqi, `"use client"`
   - Fetching Data (server-də fetch, `async` komponentlər)
   - Mutating Data və Server Actions (`"use server"`)
   - Error Handling (`error.js`, `not-found.js`)

3. **`nextjs-part3.md`** — Caching və Revalidating
   - Caching modeli (Full Route Cache, Data Cache, Router Cache)
   - Revalidating (time-based və on-demand: `revalidatePath`, `revalidateTag`)
   - ISR (Incremental Static Regeneration)
   - `use cache` direktivi

4. **`nextjs-part4.md`** — Routing Fayl Konvensiyaları
   - Dynamic Segments, Route Groups
   - `loading.js`, `template.js`, `default.js`
   - Parallel Routes və Intercepting Routes
   - Route Segment Config (`dynamicParams`, `runtime`, s.)

5. **`nextjs-part5.md`** — Metadata, SEO, Şəkil və Font Optimizasiyası
   - Metadata API (`generateMetadata`, statik metadata)
   - Metadata faylları (favicon, OG images, robots.txt, sitemap.xml)
   - `next/image` ilə şəkil optimizasiyası
   - `next/font` ilə font optimizasiyası

6. **`nextjs-part6.md`** — Route Handlers və Proxy/Middleware
   - Route Handlers (`route.js`) — GET/POST/s. metodları
   - `NextRequest` və `NextResponse`
   - `proxy.js` (middleware) ilə request idarəetməsi
   - Environment Variables

7. **`nextjs-part7.md`** — Autentifikasiya, Formlar və Testing
   - Authentication guide-ın əsasları (session, JWT, provider seçimi)
   - Forms və Server Actions ilə form idarəetməsi
   - Testing (Vitest/Jest və Playwright/Cypress qısa icmalı)

8. **`nextjs-part8.md`** — Deployment və Praktiki Layihə
   - Production Checklist
   - Deploying (Vercel, Self-Hosting)
   - Kiçik end-to-end praktiki layihə (mini blog: layout + data fetching + route handler + metadata)
   - Xülasə və əlavə oxu mənbələri

## Səviyyə Proqresiyası

Hissə 1-2 mütləq əsasdır (App Router-in özəyi). Hissə 3-4 daha dərin
routing/caching mexanizmini açır. Hissə 5-6 istehsala hazır feature-lar
(SEO, API). Hissə 7-8 real tətbiq və production-a çıxarma. Hər hissə
əvvəlki hissələrdə izah olunmuş anlayışlara istinad edir, təkrar izah
etmir.

## Status

- [x] Part 1 — `nextjs-part1.md`
- [x] Part 2 — `nextjs-part2.md`
- [x] Part 3 — `nextjs-part3.md`
- [x] Part 4 — `nextjs-part4.md`
- [x] Part 5 — `nextjs-part5.md`
- [x] Part 6 — `nextjs-part6.md`
- [x] Part 7 — `nextjs-part7.md`
- [x] Part 8 — `nextjs-part8.md`

Kurs tamamlandı.
