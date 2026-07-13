# TanStack Router Kursu — Plan

TanStack Router React (və Solid) tətbiqləri üçün tam TypeScript dəstəkli
marşrutlaşdırma kitabxanasıdır. Bu kurs onu sıfırdan öyrədir: quraşdırma,
fayl-əsaslı marşrutlaşdırma, dinamik parametrlər, axtarış parametrləri (search
params), data yükləmə (loaders) və keşləmə, xəta idarəetməsi və kiçik bir
tətbiq layihəsi.

Mənbə: https://tanstack.com/router/latest/docs/overview (və əlaqəli guide
səhifələri: quick-start, routing-concepts, file-based-routing, search-params,
path-params, data-loading)

## Hissələr

1. **`tanstack-router-part1.md`** — Giriş və Quraşdırma
   - TanStack Router nədir, niyə seçilməlidir (TypeScript inference, search
     params state kimi, SWR keşləmə)
   - Ənənəvi routerlərlə müqayisə, ilham aldığı layihələr (tRPC, Remix,
     Next.js, Chicane)
   - CLI ilə layihə yaratmaq, mövcud layihəyə əl ilə quraşdırma
   - Fayl-əsaslı vs kod-əsaslı marşrutlaşdırma seçimi
   - Minimal işləyən router nümunəsi (root route + router instance)

2. **`tanstack-router-part2.md`** — Marşrutlaşdırma Konsepsiyaları
   - Route tree, root route, index route
   - Fayl-əsaslı marşrutlaşdırma: qovluq-əsaslı, nöqtə-notasiyalı (flat),
     qarışıq yanaşma, fayl adlandırma qaydaları
   - Dinamik parametrlər (`$postId`), splat/catch-all (`$`), optional
     parametrlər (`{-$param}`), prefiks/suffiks sintaksisi
   - Layout route'lar, pathless layout (`_layout`), nested olmayan route'lar
     (`_` suffiks), qruplaşdırma qovluqları (`(group)`), istisna fayllar (`-`)

3. **`tanstack-router-part3.md`** — Path və Search Parametrləri
   - Path parametrlərini oxumaq/yazmaq, `params.parse`/`stringify`, priority
   - Search parametrləri niyə adi `URLSearchParams`-dan güclüdür (JSON-first,
     tip təhlükəsizliyi, immutability)
   - `validateSearch` ilə validasiya: sadə funksiya, Zod, Standard Schema
     (Valibot və s.)
   - Search parametrlərini oxumaq (`useSearch`, `getRouteApi`) və yazmaq
     (`Link`, `useNavigate`), middleware'lər (`retainSearchParams`,
     `stripSearchParams`)
   - `Link` və naviqasiya əsasları (`to`, `params`, `search`, `from`)

4. **`tanstack-router-part4.md`** — Data Yükləmə, Keşləmə, Xəta İdarəetməsi və Praktika
   - Route loader'lar, loader lifecycle (parse → beforeLoad → loader →
     component)
   - SWR keşləmə: `staleTime`, `gcTime`, `loaderDeps`, `shouldReload`,
     `staleReloadMode`
   - Router context (`createRootRouteWithContext`, `beforeLoad` context)
   - Pending/error komponentləri, `onError`, `errorComponent`, retry
   - Kiçik praktika layihəsi: axtarış+səhifələmə dəstəkli bloq siyahısı
   - Yekun və əlavə oxu

Səviyyə artımı: Part 1 quraşdırma və əsas anlayışlar (heç bir ön bilik tələb
etmir) → Part 2 marşrut strukturu (Part 1-ə əsaslanır) → Part 3 parametrlər
(Part 2-dəki route-lara istinad edir) → Part 4 data qatı (əvvəlki hər üç
hissəni tətbiq edən praktiki layihə ilə bitir).

## Status
- [x] Part 1
- [x] Part 2
- [x] Part 3
- [x] Part 4
