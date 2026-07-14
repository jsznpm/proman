# Frontend Architect — Part 7: Rendering Strategiyaları I

> Bu, "Frontend Architect" seriyasının 7-ci hissəsidir (bax:
> `courses/frontend-architect.plan.md`). Pattern klasterindən (Part 2–6) sonra
> indi **rendering strategiyaları** başlayır — HTML *harada* və *nə vaxt*
> yaranır: **CSR, SSR, Static (SSG), ISR**. Bu, frontend architect-in verdiyi
> ən nəticəli qərarlardan biridir: SEO, ilk yükləmə sürəti, data təzəliyi və
> infrastruktur xərci hamısı bundan asılıdır. Bu part-da "hydration" termini
> təyin olunur və Part 8–10-da eyni mənada işlədilir. Qərar çərçivəsi Part
> 1-dəki kimi (Problem→Options→Trade-offs→Decision→Revisit). Mənbə:
> patterns.dev / PatternsDev/skills (`client-side-rendering`,
> `server-side-rendering`, `static-rendering`, `incremental-static-rendering`).

---

## 1. Əsas ox: HTML harada və nə vaxt yaranır

### 1.1 Niyə vacibdir

Bütün rendering strategiyaları bir sualın cavabıdır: **"Bu səhifənin HTML-i
harada (client/server/build) və nə vaxt (build-time / request-time / runtime)
qurulur?"** Bu bir qərar dörd metrikaya birbaşa təsir edir:

- **TTFB** (Time To First Byte) — ilk bayt nə qədər tez gəlir?
- **FCP / LCP** (First/Largest Contentful Paint) — istifadəçi məzmunu nə vaxt
  görür?
- **SEO** — bot boş `<div>` görür, yoxsa hazır HTML?
- **Data təzəliyi** — göstərilən data nə qədər köhnədir?

Architect üçün tələ: **bir strategiyanı "ən yaxşı" saymaq.** Heç biri ən yaxşı
deyil — hər biri fərqli constraint üçündür. Qərar konkret tələbdən çıxır.

### 1.2 Dörd strategiya bir cümlədə

- **CSR** — HTML boş, brauzer JS ilə qurur. (SPA, dashboard)
- **SSR** — hər request-də server tam HTML qurur. (SEO + dinamik)
- **SSG** — build vaxtı HTML qurulur, CDN-dən verilir. (statik content)
- **ISR** — SSG + arxa planda periodik yeniləmə. (əsasən statik, amma yenilənir)

---

## 2. CSR — Client-Side Rendering

### 2.1 Konsepsiya

Server minimal HTML qabığı (adətən tək `<div id="root"></div>`) verir; JS
brauzerdə məntiqi, data fetch-i, template-i və routing-i icra edir. SPA-ların
əsasıdır — interaktivlik ilk yükləmə sürətindən üstün tutulur. Səhifə keçidləri
server round-trip olmadan client-də baş verir.

### 2.2 Architect qərarı

- **İstifadə et:** daxili alətlər, dashboard, SPA — **SEO kritik deyil**;
  dinamik, istifadəçi-yönümlü UI yeniləmələri; tam interaktiv təcrübə.
- **İstifadə etmə:** SEO-kritik content (bot server-render HTML gözləyir);
  content-ağır saytlar (JS yüklənərkən boş səhifə); FCP kritik olan hallar.

**Trade-off:** üstünlük — sürətli naviqasiya (server sorğusuz), client/server
kod ayrımı aydın, üstün interaktivlik. Çatışmazlıq — SEO zəif (böyük payload +
network şəlaləsi crawler indeksləməyə imkan verməyə bilər), ilkin performans
zəif, məntiq client/server-də təkrarlana bilər.

> **Niyə vacibdir:** İlkin bundle "< 100–170KB (minified + gzipped)" yaxşı
> başlanğıcdır. CSR-i optimize edən texnikalar — code-splitting, lazy loading,
> kritik resurs preload, service worker cache (Part 9–10) — məhz bu boş-səhifə
> problemini yumşaldır.

---

## 3. SSR — Server-Side Rendering

### 3.1 Konsepsiya

SSR istifadəçi request-inə cavab olaraq səhifənin **tam HTML-ini** server-də
qurur. Server data fetch, API çağırışı və HTML generasiyasını client-dən əvvəl
edir. Hər request müstəqil işlənir:

```js
// Next.js (Pages Router)
export async function getServerSideProps(context) {
  const data = await fetchFromDB();
  return { props: { data } };
}
// Birbaşa React: ReactDOMServer.renderToString(element)
```

**Hydration:** server-render HTML gəldikdən sonra client `hydrateRoot()` ilə
mövcud markup-a **event handler-ləri bağlayır** (markup-u qoruyaraq). Beləcə
server statik content + client interaktivlik birləşir.

> **Termin təyini — hydration:** server-in göndərdiyi "ölü" HTML-ə client-də JS
> yüklənib event handler və state bağlaması prosesi. HTML dərhal görünür, amma
> hydration bitənə qədər **interaktiv deyil**. Bu termin Part 8 (progressive/
> selective hydration) və Part 10-da eyni mənada işlədiləcək.

### 3.2 Architect qərarı

- **İstifadə et:** SEO və sürətli ilkin yükləmə prioritetdir; hər request-də
  dəyişən content-ağır səhifələr.
- **İstifadə etmə:** statik content (SSG kifayət); SEO-suz daxili dashboard;
  effektiv cache olmadan yüksək per-request server yükü.

**Trade-off:** üstünlük — az JS → sürətli FCP/TTI (FCP = TTI), crawler asanlıqla
oxuyur, JS büdcəsi azalır. Çatışmazlıq — **yavaş TTFB** (server emalı, network),
məhdud interaktivlik (tez-tez server round-trip).

---

## 4. SSG — Static Site Generation (Static Rendering)

### 4.1 Konsepsiya

SSG **build vaxtı** hər route üçün əvvəlcədən HTML faylları qurur, sonra onları
server/CDN-dən birbaşa verir. Request-də hazır HTML dərhal gəlir — server emalı
gecikməsi yoxdur:

```js
// Next.js — build-time data
export async function getStaticProps() {
  return { props: { products: await getProductsFromDatabase() } };
}

// Dinamik route-lar üçün əvvəlcədən yolları qur
export async function getStaticPaths() {
  const products = await getProductsFromDatabase();
  return {
    paths: products.map((p) => ({ params: { id: p.id } })),
    fallback: false,
  };
}
```

### 4.2 Architect qərarı

- **İstifadə et:** statik content (About, blog, məhsul siyahısı); CDN ilə ən
  sürətli TTFB; request-də dəyişməyən content.
- **İstifadə etmə:** yüksək dinamik/fərdiləşdirilmiş content (dashboard,
  real-time feed); build vaxtını qeyri-praktik edən nəhəng dataset; pre-render
  tələb edən auth-qorumalı content.

**Diqqət:** çoxlu ayrı HTML faylını idarə etmək çətinləşə bilər; optimal
performans üçün CDN lazımdır; content dəyişəndə sayt **yenidən build + deploy**
tələb edir — tez-tez yenilənən məlumat üçün uyğun deyil (bu problemi ISR həll
edir).

> **Niyə vacibdir:** SSG ən sürətli və ən ucuz strategiyadır (server yoxdur,
> yalnız CDN) — amma qiyməti təzəlikdir. "Nə qədər statik?" sualı SSG vs SSR vs
> ISR qərarının mərkəzidir.

---

## 5. ISR — Incremental Static Regeneration

### 5.1 Konsepsiya

ISR, SSG-ni gücləndirir: tam sayt rebuild-i olmadan statik səhifələri **periodik
yeniləməyə** icazə verir. İki mexanizm:

1. **Yeni səhifə (lazy):** qurulmamış səhifə ilk request-də yaranır (fallback
   göstərilir), sonra cache-lənib sonrakılara dərhal verilir.
2. **Mövcud səhifə (revalidation):** `stale-while-revalidate` — istifadəçi
   cache versiyanı alır, arxa planda server yeniləyir.

```js
export async function getStaticProps() {
  return {
    props: { products: await getProductsFromDatabase() },
    revalidate: 60, // hər 60 saniyədə yenidən qur
  };
}
// Modern Next.js: on-demand — revalidatePath / revalidateTag ilə dərhal yeniləmə
```

### 5.2 Architect qərarı

- **İstifadə et:** əsasən statik, amma periodik yenilənən səhifələr (blog,
  e-commerce) — tam rebuild qeyri-praktikdirsə.
- **İstifadə etmə:** real-time content (canlı hesab, birja qiyməti), tam
  fərdiləşdirilmiş səhifələr, content versiya uyğunsuzluğunun pis təcrübə
  yaratdığı hallar.

**Trade-off:** SSG-nin sürəti + CDN paylanması + dinamik data dəstəyi
(rebuild-siz); qiyməti — `stale-while-revalidate` pəncərəsində istifadəçi
**köhnə data** görə bilər.

> **Niyə vacibdir:** ISR Part 1-dəki "yavaş məhsul səhifəsi → ISR" nümunəsinin
> həllidir. Amma "revalidate: 60" o deməkdir ki, qiymət dəyişikliyi 60 saniyəyə
> qədər gec görünə bilər — bu, biznes qərarıdır, texniki yox.

---

## 6. Architect qərar matrisi — nə vaxt hansı

Qərar iki əsas oxdan çıxır: **SEO lazımdırmı?** və **data nə qədər dinamikdir?**

| Strategiya | HTML nə vaxt | SEO | TTFB | Data təzəliyi | İdeal hal |
|---|---|---|---|---|---|
| **CSR** | Client (runtime) | ❌ zəif | Sürətli shell, gec content | Real-time | Dashboard, daxili SPA |
| **SSR** | Server (hər request) | ✅ | Yavaş (server emalı) | Hər request təzə | Fərdi, SEO-lu dinamik |
| **SSG** | Build vaxtı | ✅ | ⚡ ən sürətli (CDN) | Build vaxtı (köhnələ bilər) | Blog, sənəd, marketinq |
| **ISR** | Build + periodik | ✅ | ⚡ sürətli (CDN) | Periodik (stale pəncərə) | E-commerce kataloq, blog |

**Qərar ardıcıllığı (praktik):**
1. SEO lazım deyil + yüksək interaktiv? → **CSR**.
2. Content build vaxtı sabitdir? → **SSG**.
3. Statik, amma bəzən yenilənir? → **ISR** (`revalidate` seç).
4. Hər request fərdi/təzə olmalıdır + SEO? → **SSR**.

**Vacib:** çoxlu real tətbiq **qarışıqdır** — marketinq səhifəsi SSG, məhsul
səhifəsi ISR, hesab paneli CSR, axtarış nəticəsi SSR. Next.js/Remix per-route
strategiya seçməyə imkan verir. Architect "bütün sayt üçün bir strategiya"
tələsindən qaçır.

---

## 7. Praktik nümunə — qərar çərçivəsi ilə

**Tələb:** e-commerce saytı — ana səhifə, məhsul səhifələri, istifadəçi hesabı,
axtarış.

- **Ana + marketinq:** dəyişmir, SEO kritik → **SSG**.
- **Məhsul səhifələri:** SEO kritik, qiymət/stok bəzən dəyişir → **ISR**
  (`revalidate: 300`, on-demand revalidate stok bitəndə).
- **İstifadəçi hesabı:** fərdi, SEO əhəmiyyətsiz, yüksək interaktiv → **CSR**.
- **Axtarış nəticələri:** hər sorğu fərqli, SEO faydalı → **SSR**.

**Revisit trigger:** məhsul qiymətləri real-time olsa (flash sale) → ISR
kifayət etməz, streaming SSR-ə (Part 8) keç.

---

## Məşq

Öz layihən (və ya təsəvvür etdiyin sayt) üçün route-ları siyahıya al. Hər route
üçün:

1. İki suala cavab ver: SEO lazımdırmı? Data nə qədər dinamikdir?
2. Bölmə 6 matrisindən strategiya seç.
3. Seçimi Part 1 ADR formatında yaz (Problem → Options → Trade-offs → Decision →
   Revisit trigger).
4. Ən azı bir route-da niyə **qarışıq** yanaşmanın (per-route) tək strategiyadan
   yaxşı olduğunu izah et.

---

## Xülasə

- Rendering strategiyası bir sualdır: **HTML harada (client/server/build) və nə
  vaxt qurulur?** — bu, SEO/TTFB/təzəliyə birbaşa təsir edir.
- **CSR** — boş HTML + client JS; SPA/dashboard, amma SEO zəif.
- **SSR** — hər request server HTML; SEO + dinamik, amma TTFB yavaş.
- **SSG** — build-time HTML + CDN; ən sürətli/ucuz, amma content köhnələ bilər.
- **ISR** — SSG + `stale-while-revalidate` periodik yeniləmə; təzəlik/sürət
  balansı, amma stale pəncərə var.
- **Hydration** = server HTML-inə client-də interaktivlik bağlamaq (Part 8-də
  dərinləşir).
- Heç bir strategiya "ən yaxşı" deyil; real tətbiqlər **per-route qarışıq**
  işlədir.

---

## Mənbələr

- [patterns.dev — CSR](https://www.patterns.dev/react/client-side-rendering),
  [SSR](https://www.patterns.dev/react/server-side-rendering),
  [Static](https://www.patterns.dev/react/static-rendering),
  [ISR](https://www.patterns.dev/react/incremental-static-rendering)
- [PatternsDev/skills](https://github.com/PatternsDev/skills)
- Növbəti hissə: **Part 8 — Rendering strategiyaları II**
  (`frontend-architect-part8.md`) — Streaming SSR, Progressive & Selective
  Hydration, React Server Components, Islands Architecture, View Transitions.
