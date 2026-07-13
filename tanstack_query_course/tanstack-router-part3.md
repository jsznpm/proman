# TanStack Router Kursu — Hissə 3: Path və Search Parametrləri

Bu, TanStack Router kursunun üçüncü hissəsidir. [Hissə 2](tanstack-router-part2.md)-də
route ağacını və dinamik seqmentləri (`$postId`) qurmağı öyrənmişdik. İndi bu
parametrləri necə oxuyub yazacağımıza, həmçinin Router-in ən fərqləndirici
xüsusiyyəti olan **axtarış parametrlərinə (search params)** baxırıq. Kursun
tam planı: [`tanstack-router.plan.md`](tanstack-router.plan.md).

## Ön biliklər

Hissə 2-dəki `$postId` kimi dinamik route-ları qurmuş olmalısınız — bu
hissə həmin route-lara parametr ötürməyi göstərir.

## Məzmun

1. [Path parametrlərini dərinləşdirmə](#path-parametrlərini-dərinləşdirmə)
2. [Prefiks/suffiks və parse/stringify](#prefikssuffiks-və-parsestringify)
3. [Niyə adi URLSearchParams kifayət etmir](#niyə-adi-urlsearchparams-kifayət-etmir)
4. [JSON-first search parametrləri](#json-first-search-parametrləri)
5. [validateSearch ilə validasiya](#validatesearch-ilə-validasiya)
6. [Search parametrlərini oxumaq](#search-parametrlərini-oxumaq)
7. [Search parametrlərini yazmaq](#search-parametrlərini-yazmaq)
8. [Search middleware-lər](#search-middleware-lər)
9. [Naviqasiya əsasları: Link və useNavigate](#naviqasiya-əsasları-link-və-usenavigate)
10. [Təcrübə](#təcrübə)
11. [Yekun](#yekun)
12. [Əlavə oxu](#əlavə-oxu)

## Path parametrlərini dərinləşdirmə

Hissə 2-də gördüyümüz kimi, `$` prefiksli seqmentlər `params` obyektinə
düşür. Bunları həm loader-də, həm komponentdə oxuya bilərik:

```tsx
export const Route = createFileRoute('/posts/$postId')({
  // Loader-də
  loader: async ({ params }) => fetchPost(params.postId),
  component: PostComponent,
})

function PostComponent() {
  // Komponentdə
  const { postId } = Route.useParams()
  return <div>Yazı {postId}</div>
}
```

`beforeLoad`-da da eyni şəkildə əlçatandır: `beforeLoad: async ({ params }) => { ... }`.

### Route komponentindən kənarda

Route faylını birbaşa import etmədən (məs. code-split olunmuş uzaq
komponentdə) parametrlərə çatmaq üçün `getRouteApi` istifadə olunur:

```tsx
import { getRouteApi } from '@tanstack/react-router'

const routeApi = getRouteApi('/posts/$postId')

function PostSidebar() {
  const { postId } = routeApi.useParams()
  return <aside>Yazı ID: {postId}</aside>
}
```

Tamamilə route-dan asılı olmayan bir yerdə (məs. paylaşılan util komponent)
`strict: false` ilə "boş" nəticə riskini qəbul edərək qlobal çıxış almaq
mümkündür:

```tsx
function SomeComponent() {
  const { postId } = useParams({ strict: false })
  return <div>Yazı {postId}</div>
}
```

## Prefiks/suffiks və parse/stringify

Dinamik seqmentləri sabit mətnlə əhatələmək mümkündür:

```tsx
// /posts/post-123 uyğunlaşır
createFileRoute('/posts/post-{$postId}')

// /files/document.txt uyğunlaşır
createFileRoute('/files/{$fileName}.txt')

// /users/user-456.json uyğunlaşır
createFileRoute('/users/user-{$userId}.json')
```

Parametrin necə parse/stringify olunacağına və uyğunlaşma prioritetinə
nəzarət etmək mümkündür:

```tsx
export const Route = createFileRoute('/posts/$postId')({
  params: {
    priority: 10,
    parse: ({ postId }) => {
      if (!/^\d+$/.test(postId)) return false // uyğunlaşmır, növbəti namizədə keç
      return { postId: Number(postId) } // string-i number-ə çeviririk
    },
    stringify: ({ postId }) => ({ postId: String(postId) }),
  },
})
```

`parse` `false` qaytardıqda, router başqa uyğun route axtarmağa davam edir —
bu, məsələn `/posts/123` (rəqəm) və `/posts/latest` (söz) kimi eyni
səviyyədəki iki fərqli route-u ayırmaq üçün faydalıdır.

### i18n nümunəsi

Optional parametrlər (Hissə 2) dil seçimi kimi ssenarilər üçün əladır:

```tsx
export const Route = createFileRoute('/{-$locale}/about')({
  component: AboutComponent,
})

function AboutComponent() {
  const { locale } = Route.useParams()
  const currentLocale = locale || 'en'
  return <h1>{content[currentLocale].title}</h1>
}
```

Bu, eyni komponentlə `/about`, `/en/about`, `/fr/about` ünvanlarını
dəstəkləyir.

## Niyə adi URLSearchParams kifayət etmir

Brauzerin daxili `URLSearchParams` API-si sadə mətn açar-dəyər cütlərindən
başqa heç nə bilmir. TanStack Router bunu bir neçə cəhətdən genişləndirir:

- **Tip dəstəyi** — `URLSearchParams` hər şeyi string kimi görür; Router
  primitiv tipləri (number, boolean) və nested strukturları (array, object)
  qoruyub saxlayır.
- **Serializasiya seçimləri** — state-i serializasiya/deserializasiya
  etməyin müxtəlif yolları var, hər birinin öz kompromisi ilə.
- **Immutability** — hər parse yeni obyekt referansı yaradır; React kimi
  reaktiv freymvorklarda bu diqqətlə idarə olunmalıdır (məs. lazımsız
  re-render-lərin qarşısını almaq üçün).
- **Müstəqil yeniləmələr** — search parametrləri çox vaxt path-ə (pathname)
  toxunmadan tez-tez dəyişir.

## JSON-first search parametrləri

Router URL search sətirini avtomatik strukturlaşdırılmış JSON-a çevirir:

```tsx
const link = (
  <Link
    to="/shop"
    search={{
      pageIndex: 3,
      includeCategories: ['electronics', 'gifts'],
      sortBy: 'price',
      desc: true,
    }}
  />
)
```

Bu, aşağıdakı URL-i yaradır:

```
/shop?pageIndex=3&includeCategories=%5B%22electronics%22%2C%22gifts%22%5D&sortBy=price&desc=true
```

Geri parse edildikdə isə `pageIndex` yenidən `number`, `includeCategories`
isə `array` olaraq qayıdır — sizin əl ilə `JSON.parse` etməyinizə ehtiyac
qalmır.

## validateSearch ilə validasiya

### Sadə (əl ilə) validasiya

```tsx
type ProductSearch = {
  page: number
  filter: string
  sort: 'newest' | 'oldest' | 'price'
}

export const Route = createFileRoute('/shop/products')({
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    return {
      page: Number(search?.page ?? 1),
      filter: (search.filter as string) || '',
      sort: (search.sort as ProductSearch['sort']) || 'newest',
    }
  },
})
```

### Zod ilə validasiya

Zod v3:

```tsx
import { zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'

const productSearchSchema = z.object({
  page: z.number().default(1),
  filter: z.string().default(''),
  sort: z.enum(['newest', 'oldest', 'price']).default('newest'),
})

export const Route = createFileRoute('/shop/products/')({
  validateSearch: zodValidator(productSearchSchema),
})
```

Zod v4-də adapter artıq lazım deyil, sxem birbaşa ötürülə bilər:

```tsx
export const Route = createFileRoute('/shop/products/')({
  validateSearch: productSearchSchema,
})
```

> **`catch()` vs `default()`:** Sənədlərin dediyi kimi — "əgər bir search
> parametri səhv formatdadırsa, çox güman ki, istifadəçinin təcrübəsini
> böyük bir xəta mesajı ilə dayandırmaq istəməzsiniz". Ona görə `.catch()`
> (səhv dəyəri sakitcə default-a çevirir) çox vaxt `.default()`-dən (yalnız
> `undefined` halını əvəz edir) daha təhlükəsizdir.

### Standard Schema kitabxanaları (Valibot, ArkType, Effect/Schema)

Bunlar "Standard Schema" spesifikasiyasını dəstəklədiyi üçün adapter tələb
etmir:

```tsx
import * as v from 'valibot'

const productSearchSchema = v.object({
  page: v.optional(v.fallback(v.number(), 1), 1),
  filter: v.optional(v.fallback(v.string(), ''), ''),
  sort: v.optional(
    v.fallback(v.picklist(['newest', 'oldest', 'price']), 'newest'),
    'newest',
  ),
})

export const Route = createFileRoute('/shop/products/')({
  validateSearch: productSearchSchema,
})
```

## Search parametrlərini oxumaq

### Komponentdə

```tsx
function ProductList() {
  const { page, filter, sort } = Route.useSearch()
  return <div>Səhifə {page}</div>
}
```

### getRouteApi ilə (route faylından kənarda)

```tsx
const routeApi = getRouteApi('/shop/products')

function ProductList() {
  const { page } = routeApi.useSearch()
  return <div>Səhifə {page}</div>
}
```

### Sərbəst (loosely typed) çıxış

```tsx
function ProductList() {
  const search = useSearch({ strict: false })
  // search-un xassələri optional olacaq
  return <div>{search.page}</div>
}
```

### Uşaq route-larda irsiyyət

Uşaq route-lar valideynin search tiplərini və validasiyasını avtomatik
irsən alır — hər səviyyədə eyni sxemi təkrarlamağa ehtiyac yoxdur.

## Search parametrlərini yazmaq

### Link komponenti ilə

```tsx
<Link from={Route.fullPath} search={(prev) => ({ page: prev.page + 1 })}>
  Növbəti səhifə
</Link>
```

Fərqli route-larda işləyən ümumi komponent üçün:

```tsx
<Link to="." search={(prev) => ({ ...prev, page: prev.page + 1 })}>
  Növbəti səhifə
</Link>
```

### useNavigate hook ilə

```tsx
const navigate = useNavigate({ from: Route.fullPath })

<button
  onClick={() =>
    navigate({ search: (prev) => ({ page: prev.page + 1 }) })
  }
>
  Növbəti səhifə
</button>
```

### Digər üsullar

- `router.navigate({ search })` — imperativ naviqasiya üçün
- `<Navigate search />` komponenti — render zamanı yönləndirmə üçün

## Search middleware-lər

Middleware-lər link/naviqasiya generasiyası zamanı search parametrlərini
transformasiya edir.

### Bəzi parametrləri saxlamaq

```tsx
import { retainSearchParams } from '@tanstack/react-router'

export const Route = createRootRoute({
  validateSearch: zodValidator(searchSchema),
  search: {
    middlewares: [retainSearchParams(['rootValue'])],
  },
})
```

Bu, naviqasiya zamanı `rootValue` parametrinin itməməsini təmin edir (məs.
qlobal filtr və ya tema seçimi bütün route-larda saxlanmalıdırsa).

### Default dəyərləri URL-dən silmək

```tsx
import { stripSearchParams } from '@tanstack/react-router'

const defaultValues = { one: 'abc', two: 'xyz' }

export const Route = createFileRoute('/hello')({
  validateSearch: zodValidator(searchSchema),
  search: {
    middlewares: [stripSearchParams(defaultValues)],
  },
})
```

Bu, URL-i təmiz saxlayır — dəyər default-dan fərqlənmirsə, URL-də
göstərilmir.

### Middleware-ləri zəncirvari birləşdirmək

```tsx
export const Route = createFileRoute('/search')({
  validateSearch: zodValidator(searchSchema),
  search: {
    middlewares: [
      retainSearchParams(['retainMe']),
      stripSearchParams({ arrayWithDefaults: defaultValues }),
    ],
  },
})
```

## Naviqasiya əsasları: Link və useNavigate

`Link` və `useNavigate` — Router-də iki əsas naviqasiya vasitəsidir.
`to` path-i, `params` dinamik seqmentləri, `search` isə axtarış
parametrlərini müəyyən edir:

```tsx
<Link to="/blog/$postId" params={{ postId: '123' }}>
  123 nömrəli yazı
</Link>

<Link
  to="/blog/$postId"
  params={(prev) => ({ ...prev, postId: '123' })}
>
  123 nömrəli yazı (əvvəlki parametrləri saxlayaraq)
</Link>
```

`from` prop-u naviqasiyanın "haradan" başladığını bildirir — bu, `search`
funksiyasının `prev` arqumentinin tipini düzgün nəticə çıxarmaq üçün
vacibdir.

## Təcrübə

Hissə 2-dəki `/posts` route-larınızı genişləndirin:

1. `/posts` route-una `page` (number, default `1`) və `sort`
   (`'newest' | 'oldest'`, default `'newest'`) search parametrləri əlavə
   edin — `validateSearch` ilə (Zod və ya sadə funksiya ilə) validasiya
   edin.
2. Komponentdə bu parametrləri `Route.useSearch()` ilə oxuyub ekranda
   göstərin.
3. "Növbəti səhifə" düyməsi düzəldin — `useNavigate` ilə `page`-i 1 artırsın
   (əvvəlki `sort` dəyərini saxlayaraq).
4. `stripSearchParams` middleware-i əlavə edərək, `sort: 'newest'` və
   `page: 1` olduqda bu parametrlərin URL-dən yox olduğunu müşahidə edin.

## Yekun

- Path parametrləri (`$param`) `useParams()` və ya `getRouteApi` ilə
  oxunur; `parse`/`stringify`/`priority` ilə tip çevrilməsi və uyğunlaşma
  sırası idarə olunur.
- Search parametrləri sadə string yox, JSON-first, validasiya olunan
  strukturlaşdırılmış state-dir.
- `validateSearch` sadə funksiya, Zod, ya da Standard Schema (Valibot və s.)
  ilə yazıla bilər; `.catch()` istifadəçi təcrübəsini qorumaq üçün
  `.default()`-dən çox vaxt daha yaxşıdır.
- Search oxumaq üçün `useSearch()`/`getRouteApi`, yazmaq üçün `Link`
  `search` prop-u və ya `useNavigate` istifadə olunur; middleware-lər
  (`retainSearchParams`, `stripSearchParams`) URL-i təmiz saxlamağa kömək
  edir.

## Növbəti hissə

[Hissə 4 — Data Yükləmə, Keşləmə, Xəta İdarəetməsi və Praktika](tanstack-router-part4.md)
faylında route loader-ləri, SWR keşləməni, router kontekstini və xəta
idarəetməsini öyrənib, kiçik bir praktika layihəsi quracağıq.

## Əlavə oxu

- Search Params: https://tanstack.com/router/latest/docs/framework/react/guide/search-params
- Path Params: https://tanstack.com/router/latest/docs/framework/react/guide/path-params
