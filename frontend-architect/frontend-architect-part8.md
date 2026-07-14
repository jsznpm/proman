# Frontend Architect — Part 8: Rendering Strategiyaları II

> Bu, "Frontend Architect" seriyasının 8-ci hissəsidir (bax:
> `courses/frontend-architect.plan.md`). Part 7-də (`frontend-architect-part7.md`)
> ənənəvi strategiyalara (CSR/SSR/SSG/ISR) və **hydration** anlayışına baxdıq.
> Burada müasir, hydration problemini həll edən texnikalar: **Streaming SSR,
> Progressive Hydration, Selective Hydration, React Server Components (RSC),
> Islands Architecture, View Transitions API**. Ortaq mövzu: **JS-i azalt,
> interaktivliyi düzgün yerə və düzgün vaxta payla.** "hydration" termini Part
> 7-dəki mənada işlədilir. Qərar çərçivəsi Part 1-dəki kimi. Mənbə: patterns.dev
> / PatternsDev/skills (`streaming-ssr`, `progressive-hydration`,
> `react-selective-hydration`, `react-server-components`, `islands-architecture`,
> `view-transitions`).

---

## 1. Ənənəvi SSR-in iki böyük problemi

### 1.1 Niyə vacibdir

Part 7-dəki klassik SSR iki "hamısı-və-ya-heç-nə" məhdudiyyəti daşıyır:

1. **Bütün HTML birdən qurulur** — ən yavaş data fetch bütün səhifəni bloklayır
   (TTFB gözləyir).
2. **Bütün səhifə birdən hydrate olur** — istifadəçi HTML-i görür, amma bütün
   JS yüklənib icra olunana qədər **heç bir şey klik etmir** (yavaş TTI).

Bu part-dakı texnikalar məhz bu iki "birdən"i **hissə-hissə**yə çevirir:
streaming HTML-i, progressive/selective hydration interaktivliyi hissələyir.
RSC və Islands isə daha radikal: "bu hissəyə **ümumiyyətlə** JS lazım deyil".

---

## 2. Streaming SSR — HTML-i hissə-hissə göndər

### 2.1 Konsepsiya

Streaming SSR tam HTML string-i əvəzinə HTML-i **inkremental** göndərir. Server
content yaratdıqca chunk-ları client-ə ötürür; client ilk baytları alan kimi
"parse və paint" başlayır. React 18 API-ləri: `renderToPipeableStream` (Node),
`renderToReadableStream` (Web Streams) — `Suspense` sərhədləri ilə işləyir:
yavaş komponentlər asinxron render olunarkən kritik content əvvəl axır.

```js
const { pipe } = renderToPipeableStream(<App />, {
  bootstrapScripts: ["/build/client.js"],
  onShellReady() {          // shell hazır → ilk HTML axını başlasın
    response.setHeader("Content-Type", "text/html");
    pipe(response);
  },
  onError(error) { didError = true; console.error(error); },
});
```

### 2.2 Architect qərarı

- **İstifadə et:** tam HTML generasiyasının ilkin paint-i gecikdirdiyi böyük
  səhifələr; TTFB/FCP yaxşılaşdırılmalıdır; network backpressure idarəsi.
- **İstifadə etmə:** tam cavabı **buferləyən** hosting (bəzi serverless
  platformalar streaming-i ləğv edir); minimal HTML-li sadə statik səhifələr;
  middleware proxy streaming faydasını sıfırlayanda.

**Fayda:** səhifə ölçüsündən asılı olmayaraq TTFB-ni sabit azaldır, backpressure-ə
yaxşı cavab verir; **SEO qorunur** (crawler axan cavabı oxuyur).

> **Niyə vacibdir:** Streaming digər hər şeyin təməlidir — selective hydration
> streaming üzərində qurulur. "Shell əvvəl, yavaş hissələr sonra" mental modeli.

---

## 3. Progressive Hydration — interaktivliyi zamanla payla

### 3.1 Konsepsiya

Bütün komponentləri eyni anda hydrate etmək əvəzinə, node-ları **zamanla
fərdi** hydrate et — yalnız minimal lazımi JS-i tələb et. Kritik interaktiv
elementlər prioritet alır, aşağıdakılar təxirə salınır:

- Kritik olmayan komponentləri `<Suspense>` içinə al.
- Below-the-fold content üçün `React.lazy()` code-splitting.
- React 18+ selective hydration ilə istifadəçi-toxunduğu sahələri prioritetləşdir.
- Yalnız-client widget-lər üçün `next/dynamic` `{ ssr: false }`.

```jsx
const HydratedTeaser = withHydration(Teaser);
export default function Body() {
  return (
    <main>
      <HydratedTeaser column={2} />  {/* əvvəl hydrate */}
      <Teaser column={1} />          {/* təxirə salınır */}
    </main>
  );
}
```

### 3.2 Architect qərarı

- **İstifadə et:** below-the-fold, kritik olmayan bölmələri olan səhifələr;
  məhdud interaktivlikli statik-ağır səhifələr; ilkin JS payload-u azaltmaq TTI-ni
  yaxşılaşdırır.
- **İstifadə etmə:** bütün səhifə dərhal interaktivlik tələb edirsə; idarə
  mürəkkəbliyi performans qazancını üstələyəndə.

---

## 4. Selective Hydration — yavaş komponent tez olanı bloklamasın

### 4.1 Konsepsiya

React 18+ xüsusiyyəti: səhifənin hissələri **bütün JS bundle yüklənməzdən əvvəl**
interaktiv olur. Streaming SSR + ağıllı hydration prioritetini birləşdirir.
`Suspense` UI-ni müstəqil hydrate olunan chunk-lara bölür:

```jsx
<Layout>
  <NavBar />
  <Suspense fallback={<Spinner />}>
    <Comments />   {/* yavaş data-fetch; qalanını bloklamır */}
  </Suspense>
</Layout>
```

Axın: komponentlər hazır olduqca client-ə stream olunur, hydration dərhal başlayır
— yavaş komponentlər data-fetch-i bitirməzdən əvvəl. Gecikən komponent bitəndə
onun HTML-i ayrıca stream olunur və kiçik script fallback-i əvəz edir. **Bonus:**
React istifadəçinin kliklədiyi hissəni prioritetlə hydrate edir.

### 4.2 Architect qərarı

- **İstifadə et:** yavaş data-fetch edən komponent əks halda bütün səhifənin
  interaktivliyini bloklayacaqsa; interaktiv komponentləri bütün JS-dən əvvəl
  prioritetləşdirmək lazımdır.

**Fayda:** sürətli FCP/TTI; komponentlər tam bundle gəlməzdən əvvəl interaktiv;
yavaş komponent sürətli sibling-ləri bloklamır; interaktivliyin progressive
enhancement-i.

> **Niyə vacibdir:** Progressive vs Selective fərqi: **progressive** =
> *biz seçirik* nəyi əvvəl hydrate etmək (code-split + lazy); **selective** =
> *React özü* Suspense sərhədləri və istifadəçi qarşılıqlı əlaqəsinə görə qərar
> verir. İkisi bir-birini tamamlayır.

---

## 5. React Server Components (RSC) — JS-i heç göndərmə

### 5.1 Konsepsiya

RSC **server-driven mental model**dir — klassik SSR-dən fundamental fərqli.
Komponenti server-də render edib data fetch edirsən, amma **həmin komponentin
JS-ini client-ə göndərmirsən** → xeyli kiçik client bundle.

**Server Components (defolt):**
- Next.js App Router-də direktiv lazım deyil; yalnız server-də icra olunur.
- Database-ə və həssas dataya birbaşa çatır.
- Ağır kitabxanaları (markdown parser, date lib) **sıfır bundle qiymətinə**
  işlədir.
- Brauzer API-si və interaktivlik işlətmir.

**Client Components:**
- `'use client'` direktivi ilə işarələnir.
- İnteraktivlik üçün lazımdır: `useState`, `useEffect`, event handler, brauzer
  API-ləri (`window`, `localStorage`, `IntersectionObserver`).
- Client-ə göndərilir və brauzerdə icra olunur.

`'use server'` — Server Actions (form submit, mutasiya) üçün.

```jsx
// Server Component (defolt) — DB-yə birbaşa, JS client-ə getmir
async function ProductPage({ id }) {
  const product = await db.product.find(id);   // server-də
  return (
    <article>
      <h1>{product.name}</h1>
      <AddToCart id={id} />   {/* Client Component — interaktiv hissə */}
    </article>
  );
}
```
```jsx
"use client";
export function AddToCart({ id }) {
  const [count, setCount] = useState(1);   // interaktivlik client-də
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

### 5.2 Architect qərarı — faydalar və trade-off

**Faydalar:** yalnız-server kitabxanalar client bundle-a **0 KB** əlavə edir
(markdown renderer 35.9K + sanitizer 63.3K → client-ə görünməz); avtomatik
code-splitting; state qorunur (server hissəni refetch edərkən input mətni/fokus
itmir); data fetch komponent səviyyəsinə yaxınlaşır (`getServerSideProps`
yerinə).

- **İstifadə et:** data fetch + non-interaktiv UI üçün client JS azaltmaq; Next.js
  13+ App Router; yalnız-server kitabxanalar; səhifənin çoxu server-də, interaktivlik
  seçmə əlavə olunur.
- **İstifadə etmə:** state/effect/event handler tələb edən komponentlər;
  brauzer-only API-dən asılı; server/client sərhədinin lazımsız mürəkkəblik
  yaratdığı kiçik komponentlər.

**Vacib trade-off:** RSC SSR-i **əvəz etmir, tamamlayır**. Hibrid yanaşma diqqətli
planlaşdırma tələb edir — çox səhifə RSC + `'use client'` interaktiv adalar.
Bu, sırf-client və ya sırf-server tətbiqdən daha çox arxitektura mürəkkəbliyi
gətirir.

> **Niyə vacibdir:** RSC 2024–2026-nın ən böyük paradiqma dəyişikliyidir.
> "Default server, opt-in client" — Part 1 "constraint-first" prinsipinin
> rendering-ə tətbiqi: interaktivlik istisna, statik norma.

---

## 6. Islands Architecture — statik dəniz, interaktiv adalar

### 6.1 Konsepsiya

Islands səhifəni statik və dinamik bölgələrə ayırır: content-in çoxu **sıfır JS**
tələb edən statik HTML, izolə interaktiv "adalar" isə öz script və hydration
məntiqini daşıyır. Hydration top-down deyil — **müstəqil**: hər ada öz hydration
script-ini digərlərindən asılı olmadan asinxron icra edir.

```astro
---
import { SocialButtons } from '../components/SocialButtons.js';
---
<article>
  <section class="intro">
    <h1>Post başlığı (statik)</h1>
    <p>Server render edən məzmun — JS yox</p>
  </section>
  <SocialButtons client:visible />   <!-- yalnız görünəndə hydrate -->
</article>
```

`client:visible` direktivi hydration-ı yalnız komponent görünəndə edir. Bu, Astro,
Marko, Eleventy+Preact-in əsas modelidir.

### 6.2 Architect qərarı

- **İstifadə et:** content-ağır saytlar (blog, xəbər, məhsul); statik-dominant
  layout-lar (80%+ non-interaktiv); performans-kritik; SEO-həssas.
- **İstifadə etmə:** yüksək interaktiv tətbiqlər (sosial media) — minlərlə ada
  tələb edərdi.

**Trade-off:** dramatik JS azalması + SEO + tez content; amma **məhdud framework
ekosistemi** (Astro/Marko/Eleventy), mövcud framework-dan miqrasiya əziyyət;
çox-interaktiv interfeyslərdə miqyaslanma çətinliyi. SSG ilə tam-interaktiv CSR
arasında **modern orta yol**.

> **Niyə vacibdir:** Islands və RSC eyni məqsədə iki yol: "default olaraq JS
> göndərmə". Fərq: RSC React ekosistemində (Next.js), Islands ayrı framework-larda
> (Astro). Architect stack seçimində (Part 12) bunu tərəziyə qoyur.

---

## 7. View Transitions API — hamar keçidlər

### 7.1 Konsepsiya

View Transitions API DOM dəyişikliklərini state-lər arası hamar animasiya edən
brauzer-doğma mexanizmdir. `document.startViewTransition(callback)`:
1. Cari DOM-un screenshot-unu çəkir.
2. Callback-i icra edib DOM-u yeni state-ə keçirir.
3. Köhnə/yeni state arası CSS pseudo-elementlərlə animasiya edir
   (`::view-transition-old/new(root)`).

```js
if (document.startViewTransition) {          // feature detection
  document.startViewTransition(() => details.toggleAttribute("open"));
}
```
```css
figcaption h2 { view-transition-name: photo-heading; } /* fərdi element keçidi */
```

### 7.2 Architect qərarı

- **İstifadə et:** səhifə state/naviqasiya keçidlərini animasiya; app-vari
  cilalı təcrübə; state-lər arası paylaşılan vizual elementlər (məs. şəkil
  qalereyası). Feature detection + fallback ilə progressive enhancement.

> **Niyə vacibdir:** Rendering strategiyası UX-i də əhatə edir — SPA-nın
> "app hissi"ni MPA/server-render saytlara brauzer-doğma, JS-siz gətirir. Modern
> SSR/Islands ilə birləşdikdə "server-render, amma hamar" mümkün olur.

---

## 8. Architect yekunu — texnika seçim xəritəsi

| Texnika | Nəyi həll edir | Əsas alət |
|---|---|---|
| **Streaming SSR** | HTML birdən qurulur (TTFB) | `renderToPipeableStream` + Suspense |
| **Progressive Hydration** | Bütün JS birdən yüklənir | code-split + `React.lazy` + `Suspense` |
| **Selective Hydration** | Yavaş komponent hamısını bloklayır | Suspense sərhədləri (React özü prioritet) |
| **RSC** | Non-interaktiv UI-yə JS gedir | Server Component + `'use client'` |
| **Islands** | Statik saytda artıq JS | `client:visible` (Astro və s.) |
| **View Transitions** | Keçidlər kobud | `document.startViewTransition` |

**Qərar prinsipi:** bunlar Part 7 strategiyalarını əvəz etmir, **gücləndirir**.
Tipik modern Next.js tətbiqi: App Router (RSC defolt) + streaming + selective
hydration + `'use client'` adalar. Ən böyük leverage: **RSC/Islands ilə JS-i
mənbədə azaltmaq** — çünki göndərilməyən JS ən sürətli JS-dir.

---

## Məşq

Part 7 məşqindəki e-commerce məhsul səhifəsini götür (SSR/ISR seçmişdin):

1. Səhifəni bölmələrə ayır: başlıq, təsvir, qiymət, rəylər (yavaş data),
   "səbətə əlavə et" düyməsi.
2. Hansı bölmə **Server Component** (JS lazım deyil), hansı **`'use client'`**
   olmalıdır? Sərhədi çək.
3. Yavaş "rəylər" bölməsini `<Suspense>` ilə sar — hansı hydration texnikası işə
   düşür?
4. Part 1 çərçivəsində: bu bölünmə client bundle-ı təxminən nə qədər azaldır və
   hansı UX metrikasını (TTI/LCP) yaxşılaşdırır?

---

## Xülasə

- Klassik SSR iki "birdən" problemi daşıyır: HTML birdən qurulur, JS birdən
  hydrate olur. Bu part hər ikisini **hissələyir**.
- **Streaming SSR** — HTML-i chunk-larla göndər (TTFB); hər şeyin təməli.
- **Progressive** (biz seçirik) vs **Selective** (React seçir) hydration —
  interaktivliyi zamanla payla, yavaş komponent sürətli olanı bloklamasın.
- **RSC** — non-interaktiv komponentin JS-ini heç göndərmə (`'use client'`
  sərhədi); paradiqma dəyişikliyi, amma hibrid mürəkkəblik.
- **Islands** — statik saytda yalnız interaktiv adaları hydrate et (Astro üslubu).
- **View Transitions** — brauzer-doğma hamar keçidlər, JS-siz "app hissi".
- Prinsip: **göndərilməyən JS ən sürətli JS-dir** — mənbədə azalt.

---

## Mənbələr

- [patterns.dev — Streaming SSR](https://www.patterns.dev/react/streaming-ssr),
  [Progressive Hydration](https://www.patterns.dev/react/progressive-hydration),
  [Selective Hydration](https://www.patterns.dev/react/react-selective-hydration),
  [RSC](https://www.patterns.dev/react/react-server-components),
  [Islands](https://www.patterns.dev/vanilla/islands-architecture),
  [View Transitions](https://www.patterns.dev/vanilla/view-transitions)
- [React 18 — `Suspense` & streaming](https://react.dev/reference/react-dom/server/renderToPipeableStream)
- Növbəti hissə: **Part 9 — Loading & bundling performansı**
  (`frontend-architect-part9.md`) — loading sequence, import strategiyaları,
  PRPL, bundle splitting, tree shaking, preload/prefetch, virtual lists.
