# Next.js (App Router) Kursu — Hissə 6: Route Handlers, Proxy (Middleware) və Environment Variables

> Çox hissəli kursun 6-cı hissəsidir. Buraya qədər UI tərəfini (page,
> layout, data fetching) gördük. İndi Next.js-i **API/backend** kimi
> istifadə etməyi öyrənirik: Route Handler-lər, sorğuları ələ keçirən
> Proxy (əvvəlki adı: Middleware) və environment variable-lar.

## Kim üçündür

App Router-in UI tərəfini bilən developer üçün. Bu hissədən sonra:
`route.ts` ilə API endpoint yazmağı, `proxy.ts` ilə auth/redirect/CORS
məntiqini bütün sayta tətbiq etməyi, `.env` fayllarını düzgün
istifadə etməyi biləcəksən.

## Məzmun

- [Route Handlers nədir](#route-handlers-nədir)
- [Dəstəklənən HTTP metodları](#dəstəklənən-http-metodları)
- [`NextRequest`/`NextResponse`](#nextrequestnextresponse)
- [Route Handler Caching](#route-handler-caching)
- [Route Resolution qaydaları](#route-resolution-qaydaları)
- [Proxy (əvvəlki adı Middleware)](#proxy-əvvəlki-adı-middleware)
- [`matcher` konfiqurasiyası](#matcher-konfiqurasiyası)
- [Proxy nümunələri](#proxy-nümunələri)
- [Environment Variables](#environment-variables)
- [Praktika](#praktika)
- [Xülasə](#xülasə)
- [Əlavə Oxu](#əlavə-oxu)

## Route Handlers nədir

Route Handler-lər Web **Request**/**Response** API-ları ilə xüsusi
sorğu emalçıları yaratmağa imkan verir — `pages/` qovluğundakı **API
Routes**-un `app/`-dəki ekvivalentidir.

```ts
// app/api/route.ts
export async function GET(request: Request) {}
```

`route.ts` `app/` daxilində `page.js`/`layout.js` kimi istənilən yerdə
nest oluna bilər. Amma **eyni route seqmentində** həm `page.js` həm
`route.js` **ola bilməz**.

## Dəstəklənən HTTP metodları

`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`. Dəstəklənməyən
metod çağırılsa, Next.js `405 Method Not Allowed` qaytarır.

```ts
// app/api/posts/route.ts
export async function GET() {
  const posts = await db.select().from(postsTable)
  return Response.json(posts)
}

export async function POST(request: Request) {
  const body = await request.json()
  const post = await db.insert(postsTable).values(body)
  return Response.json(post, { status: 201 })
}
```

Dynamic seqmentdə `params`-a çatmaq üçün `RouteContext` helper-i:

```ts
// app/users/[id]/route.ts
import type { NextRequest } from 'next/server'

export async function GET(_req: NextRequest, ctx: RouteContext<'/users/[id]'>) {
  const { id } = await ctx.params
  return Response.json({ id })
}
```

## `NextRequest`/`NextResponse`

Next.js native `Request`/`Response`-u genişləndirən `NextRequest` və
`NextResponse` təqdim edir — cookie/header idarəetməsi, `nextUrl`
(parse olunmuş URL) kimi əlavə əməliyyatlar üçün faydalıdır (Proxy
bölməsində ətraflı görəcəyik).

## Route Handler Caching

Route Handler-lər default olaraq **cache olunmur**. `GET` metodunu
cache etmək üçün route config seçimi:

```ts
// app/items/route.ts
export const dynamic = 'force-static'

export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    headers: { 'API-Key': process.env.DATA_API_KEY! },
  })
  const data = await res.json()
  return Response.json({ data })
}
```

> **Diqqət:** Eyni fayldakı digər HTTP metodları (`POST`, `PUT` və s.)
> **heç vaxt** cache olunmur, `GET` cache edilsə belə.

Cache Components (`cacheComponents: true`) aktivdirsə, `GET` Route
Handler-lər adi UI route-ları kimi davranır — runtime data
(`cookies()`, `headers()`) işlətdikdə dynamic olur, `use cache` ilə isə
uncached data-nı statik cavaba daxil edə bilərsən (`use cache`
birbaşa handler body-də yox, ayrıca helper funksiyada olmalıdır).

## Route Resolution qaydaları

Route Handler `page`-lə fərqli olaraq layout-lara və client-side
naviqasiyaya qatılmır. Eyni seqmentdə ikisi bir yerdə ola bilməz:

| Page | Route | Nəticə |
|---|---|---|
| `app/page.js` | `app/route.js` | ✗ Konflikt |
| `app/page.js` | `app/api/route.js` | ✓ Düzgün |
| `app/[user]/page.js` | `app/api/route.js` | ✓ Düzgün |

## Proxy (əvvəlki adı Middleware)

> **Adlanma dəyişikliyi:** `middleware.js` faylı **deprecated**-dir,
> yeni adı **`proxy.js`**-dir (Next.js 16-dan). Köhnə layihələri
> köçürmək üçün: `npx @next/codemod@canary middleware-to-proxy .`

`proxy.ts` layihə kökündə (`app`/`pages` ilə eyni səviyyədə) yaradılır
və **route render olunmazdan əvvəl** server-də işləyir — auth,
logging, redirect kimi custom məntiq üçün əlvəriş̈lidir.

```ts
// proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
  matcher: '/about/:path*',
}
```

Fayl **bir** funksiya export etməlidir (default və ya `proxy` adı ilə).

## `matcher` konfiqurasiyası

`matcher` olmadan Proxy **hər sorğuda** işləyir — statik fayllar,
`_next/static`, `_next/image`, `public/` daxil. Bunları xaric etmək
üçün mütləq `matcher` istifadə et, əks halda auth məntiqi CSS/JS/şəkil
yüklənməsini bloklaya bilər:

```ts
export const config = {
  matcher: [
    // api, statik fayllar, şəkil optimizasiyası, .png xaric hər şey
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
}
```

`matcher` həmçinin `has`/`missing` şərtlərini dəstəkləyir (header,
query, cookie varlığına görə):

```ts
export const config = {
  matcher: [
    {
      source: '/api/:path*',
      has: [{ type: 'header', key: 'Authorization', value: 'Bearer Token' }],
      missing: [{ type: 'cookie', key: 'session', value: 'active' }],
    },
  ],
}
```

> **Vacib:** `matcher` dəyəri build-time statik analiz edilə bilən
> **sabit** olmalıdır — dəyişən istifadə edilə bilməz.

## Proxy nümunələri

### Şərti rewrite/redirect

```ts
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/about')) {
    return NextResponse.rewrite(new URL('/about-2', request.url))
  }
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  }
}
```

### Cookie ilə iş

```ts
export function proxy(request: NextRequest) {
  const cookie = request.cookies.get('nextjs')
  request.cookies.delete('nextjs')

  const response = NextResponse.next()
  response.cookies.set('vercel', 'fast')
  return response
}
```

### Header əlavə etmək

```ts
export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-hello-from-proxy1', 'hello')

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('x-hello-from-proxy2', 'hello')
  return response
}
```

### Autentifikasiya + JSON cavab

```ts
import { isAuthenticated } from '@lib/auth'

export const config = { matcher: '/api/:function*' }

export function proxy(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return Response.json({ success: false, message: 'authentication failed' }, { status: 401 })
  }
}
```

> **Təhlükəsizlik xəbərdarlığı:** Server Function-lar (Server Action-lar)
> ayrıca route kimi sayılmır — istifadə olunduğu route-a `POST`
> sorğusu kimi işlənir. Yəni bir `matcher` müəyyən path-i xaric etsə,
> o path-dəki Server Action-lar da Proxy-dən keçməyəcək. Ona görə
> **hər Server Action daxilində** öz autentifikasiyanı yoxla, təkcə
> Proxy-yə güvənmə.

### CORS

```ts
const allowedOrigins = ['https://acme.com']
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export function proxy(request: NextRequest) {
  const origin = request.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)
  const isPreflight = request.method === 'OPTIONS'

  if (isPreflight) {
    return NextResponse.json({}, {
      headers: { ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }), ...corsOptions },
    })
  }

  const response = NextResponse.next()
  if (isAllowedOrigin) response.headers.set('Access-Control-Allow-Origin', origin)
  Object.entries(corsOptions).forEach(([k, v]) => response.headers.set(k, v))
  return response
}

export const config = { matcher: '/api/:path*' }
```

### Execution order

Proxy zəncirdə bu ardıcıllıqla işləyir: `next.config.js` `headers` →
`next.config.js` `redirects` → **Proxy** → `beforeFiles` rewrites →
Filesystem route-lar → `afterFiles` rewrites → Dynamic Route-lar →
`fallback` rewrites.

## Environment Variables

`.env*` fayllarından `process.env`-ə avtomatik yüklənir:

```txt
# .env
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword
```

```ts
// app/api/route.ts
export async function GET() {
  const db = await myDB.connect({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  })
}
```

### Brauzerə açmaq: `NEXT_PUBLIC_`

Default olaraq environment dəyişənləri yalnız **server**-də mövcuddur.
Brauzerdə istifadə etmək üçün `NEXT_PUBLIC_` prefiksi lazımdır — build
zamanı dəyər js bundle-a **hard-code** olunur:

```txt
# .env
NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk
```

```js
setupAnalyticsService(process.env.NEXT_PUBLIC_ANALYTICS_ID)
```

> **Vacib:** Dinamik lookup (`process.env[varName]`) inline olunmur —
> `process.env.NEXT_PUBLIC_X` şəklində **tam yazılmalıdır**.
> `NEXT_PUBLIC_` dəyərləri **build vaxtı** dondurulur — sonradan
> mühit dəyişəndə dəyəri dəyişmək üçün yenidən build lazımdır.

### Dəyişənlərin bir-birinə istinadı

```txt
# .env
TWITTER_USER=nextjs
TWITTER_URL=https://x.com/$TWITTER_USER
```

### Yüklənmə sırası (Load Order)

```
1. process.env
2. .env.$(NODE_ENV).local
3. .env.local (NODE_ENV=test-də oxunmur)
4. .env.$(NODE_ENV)
5. .env
```

> **Vacib:** `create-next-app` default olaraq bütün `.env*` fayllarını
> `.gitignore`-a əlavə edir. Bu faylları **heç vaxt** repo-ya commit
> etmə.

## Praktika

Mini-blog layihəni davam etdir:

1. `app/api/posts/route.ts` yarat — `GET` metodu blog post-larının
   siyahısını, `POST` metodu isə yeni post əlavə etməyi simulyasiya
   etsin (məlumatı yaddaşda saxlayan sadə massiv kifayətdir).
2. `proxy.ts` yarat — `/admin` yolu üçün sadə cookie-əsaslı
   autentifikasiya yoxlaması et (cookie yoxdursa `/login`-ə
   `redirect`), `matcher`-i `_next`/`api`/statik fayllar xaric edəcək
   şəkildə konfiqurasiya et.
3. `.env.local` faylı yarat, `DATABASE_URL` (server-only) və
   `NEXT_PUBLIC_SITE_NAME` (client-də görünən) dəyişənləri əlavə et,
   ikincini bir Client Component-də göstər.
4. `.env.local`-ın `.gitignore`-da olduğunu yoxla.

## Xülasə

- `route.ts` — API endpoint; `GET`/`POST`/s. export edilən funksiyalar
  kimi yazılır; eyni seqmentdə `page.js` ilə birgə ola bilməz.
- Route Handler-lər default cache olunmur; `GET`-i cache etmək üçün
  `dynamic = 'force-static'`.
- `proxy.ts` (əvvəlki adı `middleware.ts`) hər route render olunmazdan
  əvvəl işləyir — auth, redirect, rewrite, header/cookie manipulyasiyası
  üçün. `matcher`-siz **hər** sorğuda (statik fayllar daxil) işləyir.
- Server Action-lar Proxy-nin `matcher`-inə tabe olmaya bilər —
  autentifikasiyanı həmişə Action-ın özündə də yoxla.
- `.env*` fayllarından `process.env`-ə avtomatik yüklənir;
  `NEXT_PUBLIC_` prefiksi olmayanlar yalnız server-də, olanlar isə
  build vaxtı brauzer bundle-ına inline olunur.

## Əlavə Oxu

- [Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers)
- [proxy.js](https://nextjs.org/docs/app/api-reference/file-conventions/proxy)
- [Environment Variables](https://nextjs.org/docs/app/guides/environment-variables)

**Növbəti hissə:** [`nextjs-part7.md`](./nextjs-part7.md) —
Autentifikasiya, Formlar və Testing.
