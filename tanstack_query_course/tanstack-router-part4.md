# TanStack Router Kursu — Hissə 4: Data Yükləmə, Keşləmə, Xəta İdarəetməsi və Praktika

Bu, TanStack Router kursunun son (dördüncü) hissəsidir. Əvvəlki hissələrdə
router qurmuş ([Hissə 1](tanstack-router-part1.md)), route ağacını fayl-əsaslı
qurmuş ([Hissə 2](tanstack-router-part2.md)) və parametrləri idarə etmişdik
([Hissə 3](tanstack-router-part3.md)). İndi bu route-lara **data
yükləməyi** — Router-in ən güclü xüsusiyyətlərindən birini — əlavə edirik.
Kursun tam planı: [`tanstack-router.plan.md`](tanstack-router.plan.md).

## Ön biliklər

Hissə 2-3-dəki `/posts` və `/posts/$postId` route-larını, həmçinin `search`
parametrlərini bilməlisiniz — bu hissə onlara real data yükləməni əlavə
edir.

## Məzmun

1. [Route yükləmə həyat dövrü](#route-yükləmə-həyat-dövrü)
2. [Router keşi nə vaxt kifayət edir, nə vaxt yox](#router-keşi-nə-vaxt-kifayət-edir-nə-vaxt-yox)
3. [Route loader-lar](#route-loader-lar)
4. [Loader data-sını oxumaq](#loader-data-sını-oxumaq)
5. [SWR keşləmə: staleTime, gcTime, loaderDeps](#swr-keşləmə-staletime-gctime-loaderdeps)
6. [Search parametrləri loader-də](#search-parametrləri-loader-də)
7. [Router konteksti](#router-konteksti)
8. [Yavaş loader-lər: pending komponentlər](#yavaş-loader-lər-pending-komponentlər)
9. [Xəta idarəetməsi](#xəta-idarəetməsi)
10. [Praktika layihəsi: axtarışlı, səhifələməli yazı siyahısı](#praktika-layihəsi-axtarışlı-səhifələməli-yazı-siyahısı)
11. [Yekun](#yekun)
12. [Əlavə oxu](#əlavə-oxu)

## Route yükləmə həyat dövrü

Hər URL/tarixçə (history) yeniləməsi bu ardıcıllıqla işləyir:

1. **Route uyğunlaşdırma (yuxarıdan aşağı)**
   - `route.params.parse`
   - `route.validateSearch`
2. **Route ön-yüklənməsi (ardıcıl/serial)**
   - `route.beforeLoad`
   - Xəta olarsa `route.onError` və xəta komponenti
3. **Route yüklənməsi (paralel)**
   - `route.component.preload?`
   - `route.loader`
   - Lazım olarsa `route.pendingComponent`
   - `route.component`
   - Xəta olarsa `route.onError` və xəta komponenti

Bu ardıcıllığı bilmək vacibdir: `beforeLoad` həmişə `loader`-dən **əvvəl**
və **ardıcıl** işləyir (məs. autentifikasiya yoxlaması üçün əladır), `loader`
isə bir neçə route eyni anda uyğunlaşdıqda **paralel** işləyir.

## Router keşi nə vaxt kifayət edir, nə vaxt yox

TanStack Router-in daxili keşi (SWR) real üstünlüklərə malikdir:

- Əlavə asılılıq tələb etmir, sıfırdan daxilidir
- Route-üzrə dedup, preloading, SWR, arxa fonda yenidən yükləmə
- Kobud (coarse) invalidasiya imkanları
- Avtomatik "zibil yığımı" (garbage collection)
- Route-lar arası az data paylaşımı olan tətbiqlər üçün əladır
- Susmaya görə SSR-uyğundur

Lakin məhdudiyyətləri də var:

- Persistensiya adapteri yoxdur (localStorage və s. ilə saxlama daxili
  deyil)
- Route-lar arası dedup yoxdur
- Daxili mutasiya API-si yoxdur
- Keş səviyyəsində optimistic update yoxdur (komponent səviyyəsində
  alternativlər var)

> **Nə vaxt TanStack Query əlavə etməli:** Route-lar arası paylaşılan data,
> mutasiyalar, optimistic update kimi tələblər ciddiləşdikcə, sənədlər
> "External Data Loading" bələdçisinə yönləndirir — praktikada bu, çox vaxt
> TanStack Query-nin Router ilə birgə istifadəsi deməkdir.

## Route loader-lar

Loader route uyğunlaşdıqda işə düşür. İki formada yazıla bilər:

```tsx
// Sadə forma
export const Route = createFileRoute('/posts')({
  loader: () => fetchPosts(),
})

// Obyekt forması (əlavə konfiqurasiya üçün)
export const Route = createFileRoute('/posts')({
  loader: {
    handler: () => fetchPosts(),
    staleReloadMode: 'blocking',
  },
})
```

Loader bir obyekt qəbul edir, əsas sahələr:

- **`params`** — route path parametrləri
- **`deps`** — `Route.loaderDeps`-dən gələn obyekt (təyin olunmayıbsa boş
  obyekt)
- **`context`** — valideyn kontekst + `beforeLoad`-dan gələn route-spesifik
  kontekst
- **`abortController`** — route çıxdıqda və ya köhnəldikdə ləğv olunan
  siqnal
- **`preload`** — bu, normal yükləmə yoxsa preload olduğunu bildirən boolean
- **`cause`** — `'enter'`, `'preload'` və ya `'stay'`

## Loader data-sını oxumaq

```tsx
// Birbaşa
const posts = Route.useLoaderData()

// Dərin komponent ağaclarında getRouteApi ilə
import { getRouteApi } from '@tanstack/react-router'

const routeApi = getRouteApi('/posts')
const data = routeApi.useLoaderData()
```

## SWR keşləmə: staleTime, gcTime, loaderDeps

Router iki asılılıq növünə əsasən keşləyir: tam parse olunmuş pathname
(`/posts/1` vs `/posts/2`) və `loaderDeps` ilə əlavə edilmiş asılılıqlar.

### loaderDeps

```tsx
export const Route = createFileRoute('/posts')({
  loaderDeps: ({ search: { offset, limit } }) => ({ offset, limit }),
  loader: ({ deps: { offset, limit } }) => fetchPosts({ offset, limit }),
})
```

> **Diqqət:** yalnız loader-in **həqiqətən istifadə etdiyi** asılılıqları
> daxil edin — əlavə asılılıq lazımsız keş invalidasiyasına səbəb olur.

### staleTime / gcTime

- **`staleTime`** — data neçə millisaniyə "təzə" sayılır (susmaya görə
  naviqasiyalar üçün `0ms`, preload üçün `30s`).
- **`gcTime`** — keşdəki datanın neçə millisaniyədən sonra silinəcəyi
  (susmaya görə `30 dəqiqə`).
- **`staleReloadMode`** — `'background'` (SWR, susmaya görə) və ya
  `'blocking'` (yenidən yükləməni gözlə).

```tsx
// Arxa fonda (susmaya görə) — 10 saniyə təzə qalır
export const Route = createFileRoute('/posts')({
  loader: () => fetchPosts(),
  staleTime: 10_000,
})

// Blocking — yenidən yükləmə bitənə qədər gözləyir
export const Route = createFileRoute('/posts')({
  loader: {
    handler: () => fetchPosts(),
    staleReloadMode: 'blocking',
  },
})
```

Avtomatik yenidən yükləməni tamamilə söndürmək üçün `staleTime: Infinity`
(route-üzrə) və ya `defaultStaleTime: Infinity` (bütün router üçün,
`createRouter`-də).

### Keşdən tamamilə çıxmaq

```tsx
export const Route = createFileRoute('/posts')({
  loaderDeps: ({ search: { offset, limit } }) => ({ offset, limit }),
  loader: ({ deps }) => fetchPosts(deps),
  gcTime: 0, // route tərk edilən kimi keşdən silinir
  shouldReload: false, // yalnız giriş və ya deps dəyişəndə yenidən yüklə
})
```

Preloading isə `preloadGcTime` ilə hələ də susmaya görə işləyir.

## Search parametrləri loader-də

Search parametrləri loader-də **birbaşa** istifadə olunmur — düzgün
keşləmə və preloading üçün əvvəlcə `validateSearch`, sonra `loaderDeps`
vasitəsilə **açıq şəkildə** bildirilməlidir. Bu, URL-ə uyğun olmayan
"gizli" data asılılıqlarının qarşısını alır:

```tsx
export const Route = createFileRoute('/posts')({
  validateSearch: z.object({
    offset: z.number().int().nonnegative().catch(0),
  }),
  loaderDeps: ({ search: { offset } }) => ({ offset }),
  loader: async ({ deps: { offset } }) => fetchPosts({ offset }),
})
```

## Router konteksti

Kontekst router iyerarxiyası boyu axır:

1. **Qlobal kontekst** — router yaradılarkən ötürülür
2. **Route konteksti** — `beforeLoad` vasitəsilə əlavə olunur
3. **Loader-də əlçatandır** — `context` parametri kimi birləşdirilmiş halda

### Asılılıq inyeksiyası nümunəsi

Root route-da tip elan edin:

```tsx
import { createRootRouteWithContext } from '@tanstack/react-router'

export const Route = createRootRouteWithContext<{
  fetchPosts: typeof fetchPosts
}>()()
```

Router yaradanda dəyəri ötürün:

```tsx
const router = createRouter({
  routeTree,
  context: { fetchPosts },
})
```

Route-da istifadə edin:

```tsx
export const Route = createFileRoute('/posts')({
  loader: ({ context: { fetchPosts } }) => fetchPosts(),
})
```

`beforeLoad` ilə route-spesifik kontekst əlavə etmək:

```tsx
export const Route = createFileRoute('/posts')({
  beforeLoad: () => ({
    fetchPosts: () => console.info('foo'),
  }),
  loader: ({ context: { fetchPosts } }) => {
    fetchPosts() // 'foo' çap edir
  },
})
```

Bu, məsələn autentifikasiya olunmuş istifadəçini `beforeLoad`-da yoxlayıb
nəticəni kontekstə əlavə etmək və bütün uşaq route-larda istifadə etmək
üçün əladır.

## Yavaş loader-lər: pending komponentlər

Susmaya görə, 1 saniyədən çox çəkən loader-lər `pendingComponent`-i render
edir. Bunu `pendingMs` (route-üzrə) və ya `defaultPendingMs` (router-üzrə)
ilə tənzimləmək olar:

```tsx
export const Route = createFileRoute('/posts')({
  loader: () => fetchPosts(),
  pendingComponent: () => <LoadingSpinner />,
})
```

"Yanıb-sönmə" effektini önləmək üçün pending komponent susmaya görə
minimum 500ms göstərilir (`pendingMinMs` / `defaultPendingMinMs` ilə
tənzimlənir). Sürətli data varsa, amma bir hissə yavaşdırsa, "deferred data
loading" üsulundan istifadə edilə bilər ki, sürətli hissə dərhal görünsün.

## Xəta idarəetməsi

### onError

```tsx
export const Route = createFileRoute('/posts')({
  loader: () => fetchPosts(),
  onError: ({ error }) => {
    console.error(error)
  },
})
```

### errorComponent və retry

```tsx
export const Route = createFileRoute('/posts')({
  loader: () => fetchPosts(),
  errorComponent: ({ error, reset }) => (
    <div>
      {error.message}
      <button onClick={() => reset()}>Yenidən cəhd et</button>
    </div>
  ),
})
```

Loader xətaları üçün `reset()` əvəzinə `router.invalidate()` çağırmaq daha
düzgündür:

```tsx
errorComponent: ({ error }) => {
  const router = useRouter()
  return (
    <div>
      {error.message}
      <button onClick={() => router.invalidate()}>Yenidən cəhd et</button>
    </div>
  )
}
```

### Xəta tipinə görə fərqli davranış

```tsx
export const Route = createFileRoute('/posts')({
  errorComponent: ({ error }) => {
    if (error instanceof MyCustomError) {
      return <div>{error.message}</div>
    }
    return <ErrorComponent error={error} />
  },
})
```

## Praktika layihəsi: axtarışlı, səhifələməli yazı siyahısı

İndiyə qədər öyrəndiklərinizi birləşdirən kiçik layihə. Fayl-əsaslı router
qurulmuş layihənizdə (Hissə 1-2) aşağıdakıları edin:

### 1. Route və search sxemi

```tsx
// routes/posts/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const postsSearchSchema = z.object({
  page: z.number().int().nonnegative().catch(1),
  q: z.string().catch(''),
})

export const Route = createFileRoute('/posts/')({
  validateSearch: postsSearchSchema,
  loaderDeps: ({ search: { page, q } }) => ({ page, q }),
  loader: ({ deps: { page, q } }) => fetchPosts({ page, q }),
  staleTime: 10_000,
  pendingComponent: () => <p>Yüklənir...</p>,
  errorComponent: ({ error, reset }) => (
    <div>
      <p>Xəta: {error.message}</p>
      <button onClick={reset}>Yenidən cəhd et</button>
    </div>
  ),
  component: PostsComponent,
})

function PostsComponent() {
  const { page, q } = Route.useSearch()
  const posts = Route.useLoaderData()
  const navigate = useNavigate({ from: Route.fullPath })

  return (
    <div>
      <input
        value={q}
        onChange={(e) =>
          navigate({ search: (prev) => ({ ...prev, q: e.target.value, page: 1 }) })
        }
        placeholder="Axtarış..."
      />
      <ul>
        {posts.items.map((post) => (
          <li key={post.id}>
            <Link to="/posts/$postId" params={{ postId: post.id }}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <button
        disabled={page <= 1}
        onClick={() => navigate({ search: (prev) => ({ ...prev, page: page - 1 }) })}
      >
        Əvvəlki
      </button>
      <button
        onClick={() => navigate({ search: (prev) => ({ ...prev, page: page + 1 }) })}
      >
        Növbəti
      </button>
    </div>
  )
}
```

### 2. Fetch funksiyası (sadə mock)

```tsx
// src/api/posts.ts
type Post = { id: string; title: string }

const ALL_POSTS: Post[] = Array.from({ length: 42 }, (_, i) => ({
  id: String(i + 1),
  title: `Yazı #${i + 1}`,
}))

export async function fetchPosts({ page, q }: { page: number; q: string }) {
  const filtered = ALL_POSTS.filter((p) =>
    p.title.toLowerCase().includes(q.toLowerCase()),
  )
  const pageSize = 10
  const start = (page - 1) * pageSize
  return {
    items: filtered.slice(start, start + pageSize),
    total: filtered.length,
  }
}
```

### 3. Tapşırıqlar

1. Yuxarıdakı kodu öz layihənizə köçürüb işə salın.
2. `/posts/$postId` route-u yaradın, `fetchPost(postId)` ilə tək yazını
   göstərin, `errorComponent`-lə mövcud olmayan ID üçün xəta göstərin.
3. `stripSearchParams({ page: 1, q: '' })` middleware-i əlavə edərək
   default dəyərlərdə URL-in təmiz qaldığını yoxlayın.
4. `staleTime`-ı `0`-a endirib, hər naviqasiyada loader-in yenidən işlədiyini
   müşahidə edin; sonra `10_000`-ə qaytarıb fərqi görün.

## Yekun

- Route yükləmə ardıcıllığı: uyğunlaşdırma → (ardıcıl) `beforeLoad` →
  (paralel) `loader`/`component`.
- Router-in daxili SWR keşi əksər tətbiqlər üçün kifayətdir; mürəkkəb
  mutasiya/paylaşım tələbləri üçün TanStack Query əlavə edilə bilər.
- `loaderDeps` + `staleTime`/`gcTime`/`shouldReload` keşləmə davranışını
  dəqiq tənzimləyir; search parametrləri loader-ə yalnız `loaderDeps`
  vasitəsilə açıq şəkildə ötürülür.
- Router konteksti (`createRootRouteWithContext`, `beforeLoad`) asılılıq
  inyeksiyası üçün tip-təhlükəsiz yol verir.
- `pendingComponent`/`errorComponent`/`onError` ilə yavaş və uğursuz
  yüklənmələr zərif idarə olunur.

## Kursun sonu

Bu, dörd hissəlik TanStack Router kursunun sonudur. Bütün hissələr:

1. [Giriş və Quraşdırma](tanstack-router-part1.md)
2. [Marşrutlaşdırma Konsepsiyaları](tanstack-router-part2.md)
3. [Path və Search Parametrləri](tanstack-router-part3.md)
4. Data Yükləmə, Keşləmə, Xəta İdarəetməsi və Praktika (bu fayl)

## Əlavə oxu

- Data Loading: https://tanstack.com/router/latest/docs/framework/react/guide/data-loading
- Overview: https://tanstack.com/router/latest/docs/overview
- Rəsmi API sənədləri: https://tanstack.com/router/latest/docs/framework/react/api/router
