# TanStack Router Kursu — Hissə 2: Marşrutlaşdırma Konsepsiyaları

Bu, TanStack Router kursunun ikinci hissəsidir. Əvvəlki hissədə
([Hissə 1](tanstack-router-part1.md)) router-i quraşdırıb kod-əsaslı minimal
nümunə qurmuşduq. İndi əsl gücə — fayl-əsaslı marşrutlaşdırmaya və route
ağacının bütün formalarına — keçirik. Kursun tam planı:
[`tanstack-router.plan.md`](tanstack-router.plan.md).

## Ön biliklər

Hissə 1-də qurduğumuz `createRootRoute` / `createRoute` / `addChildren`
anlayışlarını bilməlisiniz — bu hissə həmin konsepsiyaları fayl sisteminə
köçürür.

## Məzmun

1. [Route tree və Root route](#route-tree-və-root-route)
2. [Fayl-əsaslı marşrutlaşdırmaya keçid](#fayl-əsaslı-marşrutlaşdırmaya-keçid)
3. [Fayl adlandırma: qovluq-əsaslı, flat, qarışıq](#fayl-adlandırma-qovluq-əsaslı-flat-qarışıq)
4. [Index route-lar](#index-route-lar)
5. [Dinamik parametrlər](#dinamik-parametrlər)
6. [Splat (catch-all) route-lar](#splat-catch-all-route-lar)
7. [Optional parametrlər](#optional-parametrlər)
8. [Layout route-lar](#layout-route-lar)
9. [Pathless layout route-lar](#pathless-layout-route-lar)
10. [Nested olmayan (non-nested) route-lar](#nested-olmayan-non-nested-route-lar)
11. [Qruplaşdırma qovluqları və istisna fayllar](#qruplaşdırma-qovluqları-və-istisna-fayllar)
12. [Təcrübə](#təcrübə)
13. [Yekun](#yekun)
14. [Əlavə oxu](#əlavə-oxu)

## Route tree və Root route

TanStack Router-də bütün route-lar bir ağac (tree) formasında təşkil olunur.
Bu ağacın kökündə **root route** dayanır:

- Onun path parametri yoxdur.
- Həmişə uyğun gəlir və öz komponentini render edir.
- Bütün digər xüsusiyyətləri dəstəkləyir (loader, search validasiyası və s.
  — bunları Hissə 3-4-də görəcəyik).

`createRootRoute()` və ya (kontekst inyeksiyası lazımdırsa)
`createRootRouteWithContext<MyRouterContext>()` ilə yaradılır.

Fayl-əsaslı rejimdə root route xüsusi bir fayldır: `__root.tsx`.

## Fayl-əsaslı marşrutlaşdırmaya keçid

Fayl-əsaslı marşrutlaşdırma — route strukturunuzu kod yox, fayl sistemi ilə
təyin etmə üsuludur: `routes/` qovluğundakı fayl və qovluq iyerarxiyası
birbaşa URL iyerarxiyasını təmsil edir.

Üstünlükləri:

- **Sadəlik** — fayl strukturu URL strukturunu güzgüləyir, vizual olaraq
  intuitivdir.
- **Miqyaslana bilirlik** — layihə böyüdükcə yeni route əlavə etmək asandır.
- **Avtomatik kod bölünməsi (code-splitting)** — hər route öz bundle
  hissəsinə düşür, performans qazandırır.
- **Tip təhlükəsizliyi** — route-lar arası əlaqələr avtomatik generasiya
  olunan tiplərlə təmin olunur.

Aktivləşdirmək üçün dəstəklənən bundler-lərdən biri ilə TanStack Router
plugin-ini qoşmaq lazımdır:

- **Vite**
- **Rspack / Rsbuild**
- **Webpack**
- **Esbuild**

Məsələn, Vite üçün:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
  ],
})
```

Plugin qoşulduqdan sonra, dev və build prosesləri zamanı `routes/`
qovluğunuzu izləyib avtomatik olaraq `routeTree.gen.ts` faylını generasiya
edir — siz artıq `addChildren` ilə əl ilə ağac qurmursunuz.

Hər route faylı (root istisna olmaqla) `createFileRoute()` ilə `Route`
adlı export edilmiş dəyişən təyin edir, arqument kimi öz path-ini ötürür:

```tsx
// routes/about.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

function AboutComponent() {
  return <div>Haqqımızda səhifəsi</div>
}
```

## Fayl adlandırma: qovluq-əsaslı, flat, qarışıq

Üç fərqli üsulla eyni route strukturunu ifadə etmək olar.

### 1. Qovluq-əsaslı (Directory) iyerarxiya

```
routes/
├── __root.tsx              → Root komponent
├── index.tsx                → /
├── about.tsx                 → /about
├── posts.tsx                 → /posts
├── posts/
│   ├── index.tsx             → /posts (dəqiq)
│   └── $postId.tsx            → /posts/$postId
├── settings.tsx              → /settings
└── settings/
    ├── profile.tsx            → /settings/profile
    └── notifications.tsx      → /settings/notifications
```

### 2. Flat (nöqtə-notasiyalı) iyerarxiya

```
routes/
├── __root.tsx                       → Root komponent
├── index.tsx                        → /
├── about.tsx                        → /about
├── posts.tsx                        → /posts
├── posts.index.tsx                  → /posts (dəqiq)
├── posts.$postId.tsx                → /posts/$postId
├── posts_.$postId.edit.tsx          → /posts/$postId/edit (nested deyil)
├── settings.tsx                     → /settings
├── settings.profile.tsx             → /settings/profile
└── settings.notifications.tsx       → /settings/notifications
```

### 3. Qarışıq yanaşma

İkisini birləşdirmək də mümkündür — böyük layihələrdə çox vaxt ən praktik
seçim budur:

```
routes/
├── __root.tsx
├── index.tsx                → /
├── posts.tsx                → /posts
├── posts/
│   ├── index.tsx             → /posts (dəqiq)
│   ├── $postId.tsx            → /posts/$postId
│   └── $postId.edit.tsx       → /posts/$postId/edit
├── settings.profile.tsx      → /settings/profile
└── account.tsx                → /account
```

> **Niyə vacibdir:** Hansı üsulu seçsəniz seçin, nəticədə yaranan route ağacı
> eynidir — seçim tamamilə komanda/layihə konvensiyasına bağlıdır. Kiçik
> layihələr üçün flat, çoxlu nested route olan böyük layihələr üçün
> qovluq-əsaslı daha oxunaqlı olur.

## Index route-lar

Index route valideyn path-i dəqiq (heç bir uşaq route aktiv olmadan)
uyğun gəldikdə render olunur. Sonunda `/` olan sintaksislə göstərilir:

```tsx
// routes/posts/index.tsx
export const Route = createFileRoute('/posts/')({
  component: () => <p>Zəhmət olmasa bir yazı seçin!</p>,
})
```

Bu, `/posts` ünvanına dəqiq keçildikdə (məs. `/posts/123` yox) render olunur
— tipik istifadəsi placeholder mətn göstərməkdir.

## Dinamik parametrlər

`$` prefiksli path seqmentləri URL hissəsini `params` obyektinə tutur:

```tsx
// routes/posts/$postId.tsx
export const Route = createFileRoute('/posts/$postId')({
  loader: ({ params }) => fetchPost(params.postId),
  component: PostComponent,
})

function PostComponent() {
  const { postId } = Route.useParams()
  return <div>Yazı: {postId}</div>
}
```

`/posts/123` ünvanı `{ postId: '123' }` ilə uyğunlaşır. Hər path
səviyyəsində birdən çox dinamik seqment ola bilər:
`/posts/$postId/$revisionId` — hər ikisi ayrıca tutulur.

## Splat (catch-all) route-lar

Yalnız `$`-dan ibarət route qalan bütün URL seqmentlərini xüsusi `_splat`
xassəsinə tutur:

```tsx
// routes/files/$.tsx  →  /files/$
export const Route = createFileRoute('/files/$')({
  component: FilesComponent,
})
```

`/files/documents/hello-world` üçün `params` belə olar:

```js
{ _splat: 'documents/hello-world' }
```

Bu yanaşma Remix konvensiyasını izləyir — fayl sistemi ilə daha yaxşı
uyğunluq üçün `*` əvəzinə `$` işlədilir.

## Optional parametrlər

`{-$paramName}` sintaksisi ilə seqment isteğe bağlı olur:

```tsx
// routes/posts/{-$category}.tsx
export const Route = createFileRoute('/posts/{-$category}')({
  component: PostsComponent,
})

function PostsComponent() {
  const { category } = Route.useParams()
  return <div>{category ? `${category} kateqoriyasında yazılar` : 'Bütün yazılar'}</div>
}
```

Bu, həm `/posts` (category `undefined`), həm `/posts/tech`
(`category: 'tech'`) ilə uyğunlaşır. Birdən çox optional parametr da mümkündür:
`/posts/{-$category}/{-$slug}` — `/posts`, `/posts/tech`,
`/posts/tech/hello-world` hamısına uyğun gəlir.

> **Vacib qeyd:** Optional parametrli route-lar aşağı prioritetlə uyğunlaşır
> — yəni `/posts/featured` kimi dəqiq route varsa, o, optional route-dan
> əvvəl uyğunlaşdırılır.

## Layout route-lar

Layout route uşaq route-ları ortaq komponent və məntiqlə "sarır" — loader-lər
işlədir, search parametrlərini validasiya edir, xəta fallback-ları təmin
edir, kontekst paylaşır:

```
routes/
├── app.tsx              → Layout (AppLayout)
├── app.dashboard.tsx      → /app/dashboard
└── app.settings.tsx       → /app/settings
```

```tsx
// routes/app.tsx
export const Route = createFileRoute('/app')({
  component: AppLayout,
})

function AppLayout() {
  return (
    <div>
      <nav>App naviqasiyası</nav>
      <Outlet /> {/* Uşaq route burada render olunur */}
    </div>
  )
}
```

`<Outlet />` uşaq route-un render olunacağı yeri göstərir:

- `/app` → yalnız `<AppLayout>`
- `/app/dashboard` → `<AppLayout><Dashboard /></AppLayout>`
- `/app/settings` → `<AppLayout><Settings /></AppLayout>`

Layout-lar qovluq-daxili nested strukturda da işləyir: `app/route.tsx`
faylı `app/dashboard.tsx` və `app/settings.tsx`-i sarır.

## Pathless layout route-lar

`_` prefiksi ilə başlayan layout-lar URL-də heç bir path tələb etmədən
uşaqlarını sarır. `_`-dan sonrakı hissə route-un unikal ID-si olur:

```
routes/
├── _pathlessLayout.tsx
├── _pathlessLayout.a.tsx
└── _pathlessLayout.b.tsx
```

- `/` → `<Index>`
- `/a` → `<PathlessLayout><A /></PathlessLayout>`
- `/b` → `<PathlessLayout><B /></PathlessLayout>`

Adi layout-lardan fərqli olaraq, pathless layout-lar dinamik seqment
daxil edə bilməz — dinamik parametrlə nested etmək lazım gələrsə struktur
fərqli qurulmalıdır.

## Nested olmayan (non-nested) route-lar

`_` suffiksi ilə bir route valideynindən "un-nest" olur — yəni müstəqil
komponent ağacı yaradır:

```
routes/
├── posts.tsx
├── posts.$postId.tsx
└── posts_.$postId.edit.tsx   → müstəqil, Posts layout-una nested deyil
```

`posts_.$postId.edit.tsx` `posts` prefiksinin iyerarxiyasından qopur və
`<PostEditor>`-u `<Posts>` daxilində deyil, tam ayrıca top-level route kimi
göstərir.

## Qruplaşdırma qovluqları və istisna fayllar

**Qruplaşdırma qovluqları** — mötərizədə `(...)` olan qovluqlar route/URL
strukturuna təsir etmədən, sadəcə fayl təşkilatı üçün istifadə olunur:

```
routes/
├── (app)/
│   ├── dashboard.tsx   → /dashboard
│   └── settings.tsx    → /settings
└── (auth)/
    ├── login.tsx        → /login
    └── register.tsx     → /register
```

**İstisna fayllar** — `-` prefiksli fayl/qovluqlar route generasiyasından
tamamilə çıxarılır, yardımçı komponentləri route-ların yanında saxlamağa
imkan verir:

```
routes/
├── posts.tsx
├── -posts-table.tsx      // görməzdən gəlinir
└── -components/          // görməzdən gəlinən qovluq
    ├── header.tsx
    └── footer.tsx
```

Bu fayllar route-lar tərəfindən adi import kimi istifadə oluna bilər, route
ağacını "çirkləndirmədən".

## Təcrübə

Hissə 1-dəki layihənizi (və ya yeni Vite layihəsini) fayl-əsaslı rejimə
köçürün:

1. `@tanstack/router-plugin` paketini quraşdırın və `vite.config.ts`-ə əlavə
   edin (yuxarıdakı nümunəyə baxın).
2. `src/routes/__root.tsx`, `src/routes/index.tsx` və
   `src/routes/about.tsx` yaradın.
3. `src/main.tsx`-də `routeTree.gen.ts`-dən generasiya olunan `routeTree`-ni
   import edib `createRouter({ routeTree })`-ə ötürün.
4. `posts/index.tsx` və `posts/$postId.tsx` əlavə edərək `/posts` və
   `/posts/1` ünvanlarını test edin.
5. Sınaq üçün `app.tsx` layout-u və onun altında iki uşaq route yaradıb
   `<Outlet />`-in necə işlədiyini müşahidə edin.

## Yekun

- Bütün route-lar bir root route ətrafında ağac formalaşdırır.
- Fayl-əsaslı marşrutlaşdırma qovluq-əsaslı, flat və ya qarışıq şəkildə
  yazıla bilər — nəticə eyni route ağacıdır.
- `$param` dinamik seqment, `$` təkbaşına splat, `{-$param}` optional
  parametr yaradır.
- Layout route-lar (`route.tsx` və ya `_pathlessLayout.tsx`) `<Outlet />`
  ilə uşaqlarını sarır; `_` suffiksi valideyndən "un-nest" edir;
  `(qrup)` qovluqları yalnız fayl təşkilatı üçündür; `-` prefiksi faylı
  route generasiyasından tamamilə çıxarır.

## Növbəti hissə

[Hissə 3 — Path və Search Parametrləri](tanstack-router-part3.md) faylında
bu route-lara parametr ötürməyi və axtarış sətirlərini tip-təhlükəsiz state
kimi idarə etməyi öyrənəcəyik.

## Əlavə oxu

- Routing Concepts: https://tanstack.com/router/latest/docs/framework/react/routing/routing-concepts
- File-Based Routing: https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing
