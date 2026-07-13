# TanStack Router Kursu — Hissə 1: Giriş və Quraşdırma

Bu, TanStack Router üzrə 4 hissəlik kursun birinci hissəsidir. Kursun tam
planına [`tanstack-router.plan.md`](tanstack-router.plan.md) faylından
baxa bilərsiniz.

## Bu hissə kimlər üçündür

React (və ya Solid) ilə tətbiq qurmuş, komponent, props, hook anlayışlarını
bilən, amma TanStack Router-i heç görməmiş inkişaf etdiricilər üçün.
React Router və ya Next.js kimi başqa bir router istifadə etmisinizsə, bu
daha da asan gələcək — çünki TanStack Router onların bir çox ideyasından
ilhamlanıb.

## Ön biliklər

- React-in əsasları (komponent, JSX, hook-lar)
- npm/pnpm ilə paket quraşdırma təcrübəsi
- TypeScript-i tam bilmək şərt deyil, amma əsas sintaksisi tanımaq faydalıdır
  (Router-in ən böyük gücü məhz TypeScript inteqrasiyasındadır)

## Məzmun

1. [TanStack Router nədir](#tanstack-router-nədir)
2. [Niyə TanStack Router seçməli](#niyə-tanstack-router-seçməli)
3. [Fayl-əsaslı vs Kod-əsaslı marşrutlaşdırma](#fayl-əsaslı-vs-kod-əsaslı-marşrutlaşdırma)
4. [Yeni layihə: CLI ilə qurulum](#yeni-layihə-cli-ilə-qurulum)
5. [Mövcud layihəyə əl ilə quraşdırma](#mövcud-layihəyə-əl-ilə-quraşdırma)
6. [İlk router-inizi qurmaq](#ilk-router-inizi-qurmaq)
7. [Təcrübə](#təcrübə)
8. [Yekun](#yekun)
9. [Əlavə oxu](#əlavə-oxu)

## TanStack Router nədir

TanStack Router — React və Solid tətbiqləri üçün hazırlanmış bir router
kitabxanasıdır. Rəsmi sənədlərin dediyi kimi, onu fərqləndirən əsas cəhət
ənənəvi marşrutlaşdırma imkanlarını (nested route-lar, layout-lar,
prefetching, xəta sərhədləri, SSR) qabaqcıl TypeScript-first dizaynla
birləşdirməsidir.

Sadə dillə desək: React Router və ya Next.js-in etdiyi işi görür (hansı URL-ə
hansı komponentin cavab verəcəyini müəyyənləşdirir), amma üstünə bunları
əlavə edir:

- **Tam TypeScript nəticə çıxarımı (inference)** — marşrutlar, parametrlər,
  axtarış sətirləri əl ilə tip yazmadan avtomatik tipləşir.
- **Axtarış parametrlərini (search params) tətbiqin state meneceri kimi**
  görmək — `?page=2&sort=price` kimi sətirləri sadə string yox, JSON-first,
  validasiya olunan strukturlaşdırılmış data kimi idarə etmək.
- **Daxili SWR (stale-while-revalidate) keşləmə** — TanStack Query-dən
  ilhamlanan, route məlumatlarını avtomatik keşləyən yüklənmə sistemi.

## Niyə TanStack Router seçməli

Sənədlər onu digər router-lərlə müqayisədə belə mövqeləndirir: adi
gözləntiləri (nested routing, prefetching, error boundary, SSR) tam təmin
etməklə yanaşı, üstünə bunları qatır:

- **Route Context** — valideyn route-dan uşaq route-lara tip-təhlükəsiz
  şəkildə ötürülən paylaşılan kontekst (asılılıq inyeksiyası üçün əla).
- **Route Loader-lar + SWR keşləmə** — məlumatı əvvəlcədən yükləmək və
  keşləmək daxili olaraq dəstəklənir.
- **Path və Search parametr sxem validasiyası** — həm `/posts/$postId`
  formatındakı path parametrləri, həm də `?page=1` formatındakı search
  parametrləri sxemlə (məs. Zod) yoxlanıla bilər.
- **Qarışıq marşrutlaşdırma** — eyni layihədə həm fayl-əsaslı, həm kod-əsaslı
  marşrutları birgə istifadə etmək mümkündür.

TanStack Router bu konsepsiyaları hazırlayarkən tRPC, Remix, Chicane və
Next.js-dən ilhamlanıb — əgər bunlardan hər hansını istifadə etmisinizsə,
tanış hisslər gözləyin.

> **Diqqət:** Router-in ən vacib fərqi budur — search parametrlərini "ikinci
> dərəcəli" URL detalı yox, **əsas state mənbəyi** kimi görməsidir. Bu mövzunu
> dərindən Hissə 3-də araşdıracağıq.

## Fayl-əsaslı vs Kod-əsaslı marşrutlaşdırma

TanStack Router iki fərqli üsulla konfiqurasiya oluna bilər:

- **Fayl-əsaslı marşrutlaşdırma (tövsiyə olunur)** — route-lar fayl
  strukturunuzdan avtomatik yaranır. Performans və developer-rahatlığı
  arasında ən yaxşı balansı təmin edir. Bu barədə Hissə 2-də ətraflı
  danışacağıq.
- **Kod-əsaslı marşrutlaşdırma** — route-ları proqram daxilində əl ilə təyin
  edirsiniz, marşrutlaşdırma davranışı üzərində maksimum nəzarət verir.

Bu kurs boyu əsasən **fayl-əsaslı** yanaşmadan istifadə edəcəyik, çünki
sənədlərin özü də onu default və tövsiyə olunan üsul kimi təqdim edir.

## Yeni layihə: CLI ilə qurulum

Sıfırdan başlamağın ən sürətli yolu rəsmi CLI-dır:

```bash
# React üçün
npx @tanstack/cli create --router-only

# Solid üçün
npx @tanstack/cli create --router-only --framework solid
```

CLI sizə interaktiv sual verəcək:

- Route təyin strategiyası (fayl-əsaslı və ya kod-əsaslı)
- TypeScript dəstəyi
- Tailwind CSS inteqrasiyası
- Development toolchain seçimi
- Git repository-nin başladılması

Bütün suallara cavab verdikdən sonra CLI layihənizi hazır router qurulumu ilə
yaradacaq.

## Mövcud layihəyə əl ilə quraşdırma

Artıq React tətbiqiniz varsa və Router-i əlavə etmək istəyirsinizsə:

### Tələb olunan versiyalar

**React stack üçün:**
- React v18+ (`createRoot` API ilə)
- ReactDOM v18+

**Solid stack üçün:**
- Solid.js v1.x.x

TypeScript v5.3+ tövsiyə olunur (məcburi deyil, amma tip dəstəyindən tam
faydalanmaq üçün vacibdir).

### Paketi quraşdırın

```bash
# React
npm install @tanstack/react-router

# Solid
npm install @tanstack/solid-router
```

Quraşdırmanı `package.json`-da yoxlaya bilərsiniz:

```json
{
  "dependencies": {
    "@tanstack/react-router": "^1.0.0"
  }
}
```

> **Ümumi səhv:** Yalnız `@tanstack/react-router` quraşdırıb fayl-əsaslı
> marşrutlaşdırmanı gözləmək kifayət deyil — fayl-əsaslı rejim üçün əlavə
> olaraq bundler plugin-i (Vite, Rspack/Rsbuild, Webpack və ya Esbuild üçün)
> də qoşulmalıdır. Bunu Hissə 2-də göstərəcəyik.

## İlk router-inizi qurmaq

Kod-əsaslı minimal nümunə ilə başlayaq ki, "arxada" nə baş verdiyini görək
(fayl-əsaslı versiyasını Hissə 2-də quracağıq):

```tsx
// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
  createRouter,
  createRootRoute,
  createRoute,
} from '@tanstack/react-router'

// 1. Root route — bütün tətbiqi əhatə edən əsas route
const rootRoute = createRootRoute({
  component: () => (
    <div>
      <h1>Salam, TanStack Router!</h1>
      {/* Uşaq route-lar burada render olunacaq */}
    </div>
  ),
})

// 2. Adi route — "/" ünvanına cavab verir
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <div>Ana səhifə</div>,
})

// 3. Route ağacını qururuq
const routeTree = rootRoute.addChildren([indexRoute])

// 4. Router instansiyası yaradırıq
const router = createRouter({ routeTree })

// 5. TypeScript üçün router tipini qeydiyyatdan keçiririk
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// 6. Tətbiqi render edirik
const rootElement = document.getElementById('root')!
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
```

Burada beş əsas anlayışı görürük:

- **`createRootRoute`** — bütün route-ların valideyni olan, path-i olmayan
  və həmişə render olunan kök route.
- **`createRoute`** — konkret bir path-ə (`/`) cavab verən adi route,
  `getParentRoute` ilə valideynini bildirir.
- **`addChildren`** — route ağacını (tree) qurmaq üçün istifadə olunur.
- **`createRouter`** — route ağacından real router instansiyası yaradır.
- **`RouterProvider`** — router-i React komponent ağacına qoşan provider.

`declare module` bloku ilk baxışda qəribə görünə bilər — bu, TanStack
Router-in "tam TypeScript inference" vədini yerinə yetirməsi üçün lazımdır:
router-i qlobal olaraq qeydiyyatdan keçirməklə, `<Link to="...">` kimi
yerlərdə mövcud bütün path-lər avtomatik tip yoxlamasından keçir.

## Təcrübə

Yuxarıdakı nümunəni öz layihənizdə (və ya yeni Vite + React layihəsində)
işə salın:

1. `npm create vite@latest my-router-app -- --template react-ts` ilə yeni
   layihə yaradın.
2. `@tanstack/react-router` paketini quraşdırın.
3. `src/main.tsx`-i yuxarıdakı nümunə ilə əvəz edin.
4. `npm run dev` ilə işə salıb brauzerdə "Salam, TanStack Router!" və "Ana
   səhifə" mətnlərini görün.
5. Sınaq üçün ikinci bir route əlavə edin: `path: '/haqqinda'`,
   `component: () => <div>Haqqımızda səhifəsi</div>`. `routeTree`-yə
   `addChildren` daxilində əlavə etməyi unutmayın, sonra brauzerdə
   `http://localhost:5173/haqqinda` ünvanına keçib yoxlayın.

## Yekun

- TanStack Router — TypeScript-first, SWR keşləməli, search-params-ı state
  kimi görən router kitabxanasıdır.
- İki marşrutlaşdırma üsulu var: fayl-əsaslı (tövsiyə olunur) və kod-əsaslı.
- CLI (`@tanstack/cli create --router-only`) ilə sıfırdan layihə qura, ya da
  mövcud layihəyə `@tanstack/react-router` paketini əl ilə əlavə edə
  bilərsiniz.
- Minimal router beş hissədən ibarətdir: root route, adi route-lar, route
  ağacı (`addChildren`), router instansiyası (`createRouter`) və
  `RouterProvider`.

## Növbəti hissə

[Hissə 2 — Marşrutlaşdırma Konsepsiyaları](tanstack-router-part2.md)
faylında route ağaclarını, fayl-əsaslı marşrutlaşdırmanı, dinamik və
splat parametrləri, layout route-ları öyrənəcəyik.

## Əlavə oxu

- Mənbə: https://tanstack.com/router/latest/docs/overview
- Quick Start: https://tanstack.com/router/latest/docs/framework/react/quick-start
