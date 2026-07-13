# Senior Frontend Handbook — Part 4: Performance

> Bu hissə [Part 3 — React Rendering Internals](./senior-frontend-handbook-part3.md) ilə
> terminologiyada üst-üstə düşür (xüsusilə "hydration", "commit", "reconciliation").
> Həmin anlayışlar burada təkrar izah edilmir — mexanizm Part 3-də, ölçmə və
> optimallaşdırma isə burada.

## Niyə bu mövzu senior səviyyəsində vacibdir

Mid-level developer performansı "sayt sürətli hiss olunur" kimi subyektiv
şəkildə qiymətləndirir və problem yarananda "images-i optimize edək" deyir.
Senior developer isə:

1. **Ölçür, sonra optimallaşdırır.** Ölçmədən edilən optimallaşdırma çox vaxt
   real problemi həll etmir, yalnız kodu mürəkkəbləşdirir.
2. **Metrikanın nə olduğunu, necə hesablandığını və HANSI istifadəçi
   təcrübəsini təmsil etdiyini bilir.** Bu bilik olmadan "LCP-ni yaxşılaşdırdım"
   deyəndə əslində nəyi yaxşılaşdırdığını bilmir.
3. **Production insident zamanı** ("sayt yavaşdır" şikayəti) bu alətləri
   canlı istifadə edərək root cause tapır — Chrome Performance panel, React
   Profiler, heap snapshot bu zaman gündəlik alətlərdir.
4. **Code review-da** performans reqressiyasını tanıyır: yeni bir `useEffect`
   hər render-də subscribe/unsubscribe edir, yeni bir dependency bundle-a
   200KB əlavə edir, yeni bir lazy-load LCP elementini gecikdirir.
5. **Müsahibədə** "Core Web Vitals nədir?" sualına dəqiq ədəd və mexanizmlə
   cavab vermək gözlənilir — "sürətli olmalıdır" kimi qeyri-dəqiq cavab
   mid-level səviyyəsini göstərir.

Bu hissədə hər ədəd (threshold) rəsmi **web.dev** mənbəyindən götürülüb və
Google-ın öz sənədləri ilə çarpaz yoxlanılıb. Mənbələr bölməsinə bax.

---

## 1. Web Vitals — LCP, INP, CLS, TTFB

### 1.1 Konsepsiya: niyə bu 4 metrika?

Google-ın Core Web Vitals proqramı istifadəçi təcrübəsini üç oxda ölçür:

| Ox | Metrika | Sual |
|---|---|---|
| Loading (yüklənmə) | **LCP** | "Səhifənin əsas məzmunu nə vaxt göründü?" |
| Interactivity (interaktivlik) | **INP** | "İstifadəçi klikləyəndə/toxunanda sayt nə qədər tez cavab verir?" |
| Visual stability (vizual sabitlik) | **CLS** | "Elementlər gözlənilmədən yerini dəyişirmi?" |

**TTFB** Core Web Vital DEYİL — o, "supporting metric"dir (dəstəkləyici
metrika). TTFB server cavab sürətini ölçür və LCP-nin niyə pis olduğunu
diaqnoz etmək üçün istifadə olunur. Bunu müsahibədə dəqiq ayırmaq lazımdır:
namizədlərin çoxu TTFB-ni "4-cü Core Web Vital" kimi səhv təqdim edir.

Bütün threshold-lar **75-ci percentil**də (p75) ölçülür — həm mobile, həm də
desktop üçün ayrı-ayrı. Niyə p75, orta (average) yox? Çünki orta dəyər
outlier-ləri gizlədir: 100 istifadəçidən 90-ı 1 saniyə, 10-u 20 saniyə
gözləsə, orta 2.9 saniyə göstərər — bu, real təcrübəni əks etdirmir. p75
deyir: "istifadəçilərin 75%-i bu dəyərdən pis təcrübə YAŞAMIR."

### 1.2 LCP — Largest Contentful Paint

**Tərif (web.dev, rəsmi):** "LCP reports the render time of the largest
image, text block, or video visible in the viewport, relative to when the
user first navigated to the page." — yəni viewport daxilində görünən ən
böyük şəkil, mətn bloku və ya video elementinin render olunma vaxtı,
naviqasiyanın başlanğıcına nisbətən.

**Hansı elementlər hesaba alınır:**
- `<img>` elementləri (animated GIF-də ilk frame)
- `<svg>` daxilində `<image>`
- `<video>` (poster şəkli və ya ilk frame, hansı tez gəlirsə)
- CSS `background-image: url()` ilə yüklənən fon şəkilləri
- Mətn ehtiva edən block-level elementlər (məs. `<p>`, `<h1>`, `<div>`)

**Necə hesablanır:** Brauzer hər frame render olunduqda "ən böyük contentful
element" üçün performance entry yaradır. Əgər sonradan daha böyük element
render olunarsa, yeni entry yaradılır və əvvəlkini əvəz edir. Ölçmə
istifadəçi səhifə ilə qarşılıqlı əlaqəyə girən kimi (tap, scroll, keypress)
dayanır — çünki bundan sonrakı vizual dəyişiklik "yüklənmə" sayılmır.

**Threshold-lar (p75, rəsmi web.dev):**

| Reytinq | Dəyər |
|---|---|
| Good | ≤ 2.5s |
| Needs Improvement | 2.5s – 4.0s |
| Poor | > 4.0s |

2.5s ədədi ixtiyari deyil — Google-ın rəsmi izahına görə bu, real dünya
достижимость (CrUX məlumatı) və istifadəçi təcrübəsi araşdırmasının
kəsişməsindən müəyyən edilib; 4s isə "poor" həddi kimi seçilib.

### 1.3 INP — Interaction to Next Paint (FID-in varisi)

**Niyə FID-i əvəz etdi (mexanizm):** FID (First Input Delay) yalnız **ilk**
interaksiyanın **input delay** hissəsini ölçürdü — yəni brauzerin event
handler-i işə salmasına qədər keçən vaxtı. Bu, iki cəhətdən yetərsiz idi:

1. Yalnız ilk interaksiyaya baxırdı — istifadəçi səhifədə 10 dəfə klikləyirsə,
   FID yalnız birincini görürdü. Sonrakı kliklər (məsələn, hydration
   bitdikdən sonra da davam edən ağır render-lər zamanı) heç ölçülmürdü.
2. Yalnız "delay" hissəsini ölçürdü — event handler-in işləmə müddətini VƏ
   brauzerin növbəti frame-i çəkməsinə qədər keçən vaxtı nəzərə almırdı.

**INP-in hesablama mexanizmi** üç ardıcıl komponentdən ibarətdir:

1. **Input delay** — istifadəçi klikləyəndən handler-in işə başlamasına qədər
   (adətən main thread-də gedən blocking task-lar səbəbindən yaranır)
2. **Processing duration** — həmin frame daxilində bütün event handler
   callback-lərinin icra müddəti
3. **Presentation delay** — callback-lər bitdikdən sonra brauzerin növbəti
   frame-i ekranda göstərməsinə qədər keçən vaxt

INP bu üçünün cəmini səhifənin bütün həyat dövrü ərzində baş verən HƏR
klik/tap/keyboard interaksiyası üçün ölçür və **outlier-ləri çıxmaqla ən
uzun müşahidə olunan interaksiyanı** p75 səviyyəsində rapor edir.

**Threshold-lar (p75, rəsmi web.dev):**

| Reytinq | Dəyər |
|---|---|
| Good | ≤ 200ms |
| Needs Improvement | 200ms – 500ms |
| Poor | > 500ms |

### 1.4 CLS — Cumulative Layout Shift

**Tərif:** "CLS is a measure of the largest burst of layout shift scores for
every unexpected layout shift that occurs during the entire lifecycle of a
page." — səhifənin bütün həyat dövrü ərzində baş verən gözlənilməz layout
shift-lərin ən böyük "burst" (partlayış) skoru.

**Hesablama formulu:** `layout shift score = impact fraction × distance fraction`

- **Impact fraction** — kadrlar arasında sabit olmayan (unstable) elementlərin
  təsir etdiyi ərazi, viewport-un ümumi sahəsinə nisbətdə fraksiya kimi.
- **Distance fraction** — sabit olmayan elementin hərəkət etdiyi ən böyük
  horizontal və ya vertical məsafə, viewport-un ən böyük ölçüsünə (width və ya
  height) bölünmüş.

**Session window konsepsiyası:** Ardıcıl layout shift-lər (aralarında 1
saniyədən az fasilə, maksimum 5 saniyəlik ümumi pəncərə) bir "session
window" (burst) təşkil edir. CLS — bütün səhifə həyatı ərzində baş vermiş
session window-ların **maksimum** cəmi skorudur (bütün shift-lərin cəmi
DEYİL — bu vacib fərqdir).

**Threshold-lar (p75, rəsmi web.dev):**

| Reytinq | Dəyər |
|---|---|
| Good | ≤ 0.1 |
| Needs Improvement | 0.1 – 0.25 |
| Poor | > 0.25 |

0.1 həddi Google-ın daxili testlərinə əsaslanır: 0.15 və yuxarı shift-lər
davamlı olaraq "narahatedici" (disruptive) qəbul edilib, 0.1 və aşağı isə
"nəzərə çarpan, amma həddindən artıq narahatedici olmayan" kateqoriyasına
düşüb.

### 1.5 TTFB — Time to First Byte

**Tərif:** "TTFB is a metric that measures the time between starting
navigating to a page and when the first byte of a response begins to
arrive." — naviqasiyanın başlanğıcından cavabın ilk baytının gəlməsinə qədər
keçən vaxt.

**Daxil olan fazalar:**
1. Redirect vaxtı (əgər varsa)
2. Service worker start-up vaxtı (əgər varsa)
3. DNS lookup
4. Connection + TLS negotiation
5. Request göndərilməsi → cavabın ilk baytının gəlməsi

**Threshold-lar (rəsmi web.dev):**

| Reytinq | Dəyər |
|---|---|
| Good | ≤ 0.8s |
| Needs Improvement | 0.8s – 1.8s |
| Poor | > 1.8s |

**Vacib nüans:** TTFB Core Web Vital olmadığı üçün bu hədlər "sərt qayda"
deyil, "kobud bələdçi"dir (rough guide). web.dev bunu açıq deyir: TTFB-ni
0.8s-dən aşağı salmaq məcburi deyil, əgər bu, LCP və digər user-centric
metrikalara mane olmursa. Ancaq TTFB yüksəkdirsə, LCP-nin yaxşı olması demək
olar ki, mümkün deyil — çünki LCP-nin saat sayğacı TTFB-dən SONRA başlayır.

### 1.6 Praktiki nümunə: ölçmə kodu

**Field data (real istifadəçilərdən) — `web-vitals` kitabxanası ilə:**

```javascript
import { onLCP, onINP, onCLS, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating, // 'good' | 'needs-improvement' | 'poor'
    id: metric.id,
    navigationType: metric.navigationType,
  });
  // sendBeacon səhifə bağlansa belə göndərməyə davam edir
  navigator.sendBeacon('/analytics', body) ||
    fetch('/analytics', { body, method: 'POST', keepalive: true });
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
onTTFB(sendToAnalytics);
```

**Edge-case: lazy-load edilmiş komponent LCP elementini gecikdirir.**

Tutaq ki, hero şəkli `<img loading="lazy">` ilə və ya bir React komponenti
`React.lazy()` + `Suspense` ilə yüklənir, amma məhz bu şəkil viewport-da ən
böyük elementdir (yəni LCP candidate-dır):

```jsx
// YANLIŞ: hero image LCP elementidirsə, onu lazy-load etmək LCP-ni pisləşdirir
function Hero() {
  const HeroImage = React.lazy(() => import('./HeroImage'));
  return (
    <Suspense fallback={<div className="skeleton" />}>
      <HeroImage />
    </Suspense>
  );
}
```

Bura sərf olunan vaxt: JS bundle chunk-ı yüklənməli → parse olmalı → icra
olunmalı → yalnız SONRA şəkil `<img>` DOM-a düşür → brauzer şəkli yükləməyə
başlayır. Bu zəncir statik `<img src="...">`-dən qat-qat gecdir. Nəticədə
brauzer bu müddət ərzində daha kiçik bir elementi (məs. başlıq mətnini)
"ən böyük" kimi qeyd edir, sonra hero şəkli gələndə LCP entry-ni yenidən
yazır — real LCP rəqəmi kəskin şişir.

**Düzgün yanaşma:** LCP candidate elementləri (hero image, above-the-fold
video poster) HEÇ VAXT lazy-load edilməməlidir və `fetchpriority="high"` ilə
prioritetləşdirilməlidir:

```html
<img
  src="/hero.jpg"
  fetchpriority="high"
  loading="eager"
  width="1200"
  height="600"
  alt="Hero"
/>
```

`width`/`height` (və ya `aspect-ratio` CSS-i) həmişə verilməlidir — əks halda
şəkil yükləndikdə layout shift yaranır və bu, CLS-ə zərbə vurur. Bu, LCP və
CLS optimallaşdırmasının bir-birinə necə bağlı olduğunu göstərən klassik
nümunədir.

### 1.7 Senior-level tələlər

- **TTFB-ni Core Web Vital adlandırmaq.** Deyil — o, diaqnostik metrikadır.
- **Lab data (Lighthouse) ilə field data (CrUX/RUM) arasında fərqi bilməmək.**
  Lighthouse tək bir simulyasiya edilmiş session-dır; field data real
  istifadəçilərin p75-idir. Lighthouse-da "yaşıl" olan səhifə production-da
  pis INP göstərə bilər, çünki lab test botu real istifadəçi kimi çoxlu
  interaksiya etmir.
- **CLS-i "bütün shift-lərin cəmi" kimi başa düşmək.** Düzgünü: maksimum
  session window skoru.
- **`fetchpriority="high"`-ı hər şəklə qoymaq.** Bu, "hər şey prioritetlidir"
  antipatterni yaradır — brauzerin prioritetləşdirmə mexanizmini məhvə
  aparır. Yalnız həqiqətən LCP candidate olan 1 elementə aid olmalıdır.
- **INP-i yalnız click handler-larında optimallaşdırmaq, presentation
  delay-i unutmaq.** Handler tez bitsə də, əgər həmin commit-dən sonra DOM-a
  ağır sinxron iş (məs. böyük siyahının render-i) düşürsə, presentation
  delay yenə yüksək qalır.

### 1.8 Trade-off sualları

1. LCP-ni yaxşılaşdırmaq üçün bütün şəkilləri `eager` etsək, bu, ümumi səhifə
   yüklənmə performansına necə təsir edər? Harada balans lazımdır?
2. CLS-i sıfıra endirmək üçün bütün dinamik məzmuna (reklam, banner) əvvəlcədən
   sabit yer ayırmaq mümkündür — bunun UX/dizayn trade-off-u nədir?
3. TTFB-ni azaltmaq üçün CDN-ə keçmək həmişə düzgün addımdırmı, yoxsa server
   render vaxtının özü problemdirsə bu, simptomu maskalayar?

### 1.9 Mock müsahibə sualları

**S: LCP niyə "istifadəçi ilə qarşılıqlı əlaqəyə girənə qədər" ölçülür, sonra
dayanır?**
C: Çünki istifadəçi interaksiyaya girdikdən sonra baş verən vizual
dəyişikliklər artıq "ilkin yüklənmə" təcrübəsinin hissəsi deyil — onlar
istifadəçinin öz hərəkətinin nəticəsidir (məs. modal açılması). LCP yalnız
passiv yüklənmə mərhələsini əks etdirməlidir.

**S: Bir səhifədə INP good (150ms), amma real istifadəçilər "sayt donub"
şikayəti edir. Bu necə mümkündür?**
C: INP p75-dir — istifadəçilərin 75%-i 150ms-dən yaxşı təcrübə yaşayır, amma
qalan 25% daha pis interaksiya görə bilər (məs. aşağı-end cihazlarda və ya
konkret bir "ağır" düymədə). Aggregat metrika outlier-ləri gizlədə bilər;
RUM-da percentile dağılımına və konkret interaction target-lərinə (attribution)
baxmaq lazımdır.

**S: CLS = 0 olan səhifə "yaxşı performanslıdır" deyə bilərikmi?**
C: Yox — CLS yalnız vizual sabitliyi ölçür. LCP 6 saniyə, INP 800ms ola bilər,
amma CLS 0 qala bilər (məs. statik, amma çox ağır JS-li səhifə). Core Web
Vitals-ın üç oxu bir-birindən müstəqildir, hamısına ayrıca baxılmalıdır.

---

## 2. Hydration Cost

### 2.1 Mexanizm: niyə hydration bahalıdır

Part 3-də hydration-ın NƏ olduğu izah olunub (server-rendered HTML-i
client-side React ağacı ilə "canlandırmaq"). Burada fokus **niyə bahalı**
olduğudur.

Hydration zamanı React:

1. Bütün komponent ağacını **yenidən icra edir** (server-də render olunan
   HTML-i "oxumaq" üçün deyil — server nə render etdiyini bilmir, client
   sıfırdan hər komponentin funksiyasını çağırır).
2. Nəticədə yaranan virtual DOM-u mövcud (server-dən gələn) real DOM node-ları
   ilə **uzlaşdırır** (reconcile) — hər node üçün eyniliyi yoxlayır.
3. Hər interaktiv elementə **event listener-ləri əlavə edir**.
4. Hook state-ini (useState, useReducer) ilkin dəyərlərlə **qurur**.

Bunun qiyməti neçə faktordan asılıdır:

- **JS bundle ölçüsü** — hydration başlamadan əvvəl bütün lazımi JS
  download + parse + compile olunmalıdır. Bundle böyükdürsə, hydration
  BAŞLAYA BİLMİR, nə qədər sürətli kod yazılsa da.
- **Main thread blocking** — hydration sinxron işdir və digər iş (scroll,
  klik) ilə main thread-i bölüşür. Mürəkkəb ağac üçün bu, bir neçə animation
  frame-ə yayıla bilər.
- **Komponent ağacının ölçüsü** — 99% komponent statik olsa belə, React
  hansının handler tələb etdiyini bilmək üçün BÜTÜN ağacı yenidən icra edir.
- **Cihaz performansı** — sürətli noutbukda 200ms hydration, aşağı-end
  Android telefonda 1-2 saniyəyə qədər uzana bilər (CPU throttling fərqi
  adətən 4-6x).

**Nəticə:** İstifadəçi HTML-i görür (server render sayəsində LCP yaxşı ola
bilər), amma klikləyəndə heç nə olmur — bu boşluq məhz hydration cost-dur və
adətən pis INP-in əsas səbəbidir "sürətli görünən" səhifələrdə.

### 2.2 Necə ölçülür

**React Profiler API ilə (Part-un 3-cü bölməsi ilə birləşir):**

```jsx
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  if (phase === 'mount') {
    console.log(`[hydration] ${id}: ${actualDuration.toFixed(2)}ms`);
  }
}

<Profiler id="app-root" onRender={onRenderCallback}>
  <App />
</Profiler>
```

`phase === 'mount'` ilkin render/hydration-ı təmsil edir. Qeyd: production
build-də profiling default olaraq deaktivdir (overhead səbəbindən) — ölçmək
üçün React-in profiling-enabled production build-i lazımdır.

**Performance API ilə manual marker:**

```javascript
// document HTML-də, hydration başlamadan əvvəl inline script:
performance.mark('hydration-start');

// hydrateRoot çağırışından sonra, ilk useEffect-də və ya callback-də:
performance.mark('hydration-end');
performance.measure('hydration', 'hydration-start', 'hydration-end');

const [entry] = performance.getEntriesByName('hydration');
console.log(`Hydration: ${entry.duration.toFixed(2)}ms`);
```

**Chrome Performance panel-də:** Trace qeydə alınıb, main thread flame
chart-da `hydrateRoot` / `commitRoot` çağırışlarını axtarmaq — bunlar React-in
internal function adları kimi görünür və genişliyi (width) hydration-a nə
qədər vaxt sərf olunduğunu göstərir.

### 2.3 Edge-case: selective hydration illüziyası

Next.js App Router-də Server Component + Client Component qarışığı olan
səhifədə developer tez-tez "mən yalnız kiçik bir widget-i client component
etdim, ona görə hydration cost-um azdır" deyə düşünür. Amma:

```jsx
// app/page.jsx — Server Component
import Comments from './Comments'; // "use client"

export default function Page() {
  return (
    <article>
      <StaticContent /> {/* Server Component, hydration tələb etmir */}
      <Comments postId="123" /> {/* Client Component */}
    </article>
  );
}
```

Əgər `Comments` daxilində bir kontekst provider və ya böyük state idarəçisi
varsa (məs. bütün comment ağacını state-də saxlayan bir reducer), yalnız bu
"kiçik" komponentin hydration-ı yenə də yüzlərlə DOM node-unu reconcile edə
bilər — çünki `Comments` render etdiyi HTML böyükdürsə (məs. 200 comment),
"kiçik komponent" ifadəsi ölçünü əks etdirmir. Client Component sərhədini
mümkün qədər **aşağı** (leaf node-lara yaxın) çəkmək lazımdır, "bir dəfə
yuxarıda" yox.

### 2.4 Senior-level tələlər

- **Hydration cost-u yalnız "TTI" (Time to Interactive) rəqəmi ilə
  eyniləşdirmək.** TTI köhnəlmiş metrikadır (Lighthouse-dan çıxarılıb); INP
  daha dəqiq, davamlı siqnaldır.
- **"use client" sərhədini component ağacının kökünə yaxın qoymaq**, halbuki
  məqsəd onu leaf-lərə (interaktiv atom hissələrə) yaxın saxlamaqdır.
- **Server Component-in özünün "pulsuz" olduğunu düşünmək** — server render
  vaxtı (TTFB-yə təsir edir) ilə client hydration vaxtını qarışdırmaq.
- **Profiling-i yalnız development build-də etmək** — dev build-in overhead-i
  real rəqəmləri gizlədir/şişirdir.

---

## 3. Re-render Profiling

### 3.1 Mexanizm

Re-render özü problem deyil (Kent C. Dodds-un vurğuladığı kimi — "it's fine
to re-render", çünki React-in virtual DOM diff-i və DOM-a real yazma arasında
fərq var). Problem, re-render-in **bahalı iş** ilə birləşməsidir: ağır
hesablama, böyük siyahının hər elementinin yenidən render-i, və ya
render-dən asılı side-effect-lərin təkrarlanması.

**Niyə komponent re-render olunur (Josh Comeau-nun təsnifatı üzrə, 3 səbəb):**

1. **State dəyişir** (`useState`, `useReducer` özündə və ya valideynində)
2. **Valideyn re-render olunur** — default olaraq React bütün children-ı
   yenidən render edir, props dəyişməsə belə (`React.memo` olmadan)
3. **Context dəyəri dəyişir** — context-ə subscribe olan HƏR component,
   dəyər dəyişəndə re-render olunur, hətta yalnız context-in bir hissəsindən
   istifadə etsə belə

### 3.2 Praktiki nümunə: gizli re-render storm

```jsx
// YANLIŞ: hər `Provider` render-ində yeni obyekt yaradılır
function AppProviders({ children }) {
  const [user, setUser] = useState(null);

  // Hər render-də YENİ obyekt referansı — bütün consumer-lər re-render olunur
  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
```

Bu `AppProviders` özü heç bir görünən səbəb olmadan (məs. valideyn re-render
olduğu üçün) yenidən render olunsa, `value` obyekti yeni referans alır və
`UserContext`-ə subscribe olan HƏR component — hətta `user` dəyəri əslində
dəyişməsə belə — re-render olunur. `React.memo` bunu XİLAS ETMİR, çünki
problem props-da deyil, context value referansındadır.

**Düzəliş:**

```jsx
function AppProviders({ children }) {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
```

**Edge-case: `useMemo` özü "pulsuz" deyil.** Dependency array-in özü hər
render-də yeni array kimi yaradılırsa (məs. `useMemo(fn, [{ a, b }])` — obyekt
literal dependency kimi), memoization işləmir, çünki `Object.is` müqayisəsi
hər dəfə fərqli nəticə verir. Bu, "mən artıq memoize etdim" deyə düşünüb
əslində heç nə etməmiş olmaq halının klassik nümunəsidir.

### 3.3 Ölçmə: `why-did-you-render` və `<Profiler>`

```jsx
// Profiler ilə hansı komponentin nə tez-tez render olunduğunu ölçmək
import { Profiler } from 'react';

function logRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  if (actualDuration > 16) { // 16ms ~ 1 frame büdcəsi (60fps)
    console.warn(`[slow render] ${id} (${phase}): ${actualDuration.toFixed(2)}ms`);
  }
}

<Profiler id="ProductList" onRender={logRender}>
  <ProductList />
</Profiler>
```

`actualDuration` — komponentin (və children-inin) son render-də sərf etdiyi
real vaxt; `baseDuration` — memoization olmadan nə qədər çəkəcəyinin
qiymətləndirilməsi. İkisinin fərqi memoization-ın nə qədər fayda verdiyini
göstərir.

### 3.4 Senior-level tələlər

- **Hər re-render-i "problem" hesab edib hər yerə `React.memo`/`useMemo`
  yaymaq.** Bu, əlavə müqayisə overhead-i yaradır və kodu oxumağı
  çətinləşdirir — yalnız profiler-də TƏSDİQLƏNMİŞ hot path-lərdə istifadə
  edilməlidir.
- **`useCallback`-i asılılığı unutmadan istifadə etmək, amma funksiyanın
  daxilində closure-la köhnə state-i "tutmaq"** (stale closure) — performans
  düzəlişi correctness bug-ı yaradır.
- **Context-i "state manager" kimi istifadə edib, tək bir böyük value obyekti
  saxlamaq** — istənilən field dəyişəndə bütün ağac re-render olunur. Böyük
  state-lər üçün context-i parçalamaq (bir neçə kiçik context) və ya
  xarici state manager lazımdır.

---

## 4. React DevTools Profiler

### 4.1 Necə işləyir

React DevTools-un Profiler tab-ı `<Profiler>` API-nin verdiyi eyni
məlumatı brauzer extension-u kimi interaktiv göstərir. İki əsas görünüş var:

**Flame Graph (default):** Komponent ağacını root-dan leaf-lərə render
edir. Hər bar bir komponentdir. Bar-ın **eni** (width) — o komponent VƏ
onun children-inin render vaxtı; bar-ın **rəngi** — komponentin ÖZÜNÜN
render vaxtı (yaşıl = tez, sarı/narıncı = gec). Genişlik hierarxiyanı, rəng
tezliyi göstərir.

**Ranked Chart:** Eyni commit-in komponentlərini render müddətinə görə
azalan sırada göstərir (ən uzun render edən yuxarıda). Bu görünüş children
vaxtını daxil ETMİR — yalnız komponentin özünün vaxtı. Konkret "hansı TEK
komponent yavaşdır" sualına cavab axtaranda ranked chart daha sürətli
naviqasiya təmin edir; flame graph isə "problem harada başlayır, hansı
alt-ağacda yayılır" sualına cavab verir.

### 4.2 Praktiki iş axını

1. Profiler tab-ında "Record" düyməsinə bas.
2. Şübhəli interaksiyanı et (məs. filter dəyişdir, siyahıya scroll et).
3. "Stop" bas.
4. Timeline-da hər commit-i tək-tək seç, flame graph-da ən enli/sarı bar-ları
   tap.
5. "Highlight updates when components render" seçimini aktivləşdirərək HANSI
   komponentlərin re-render olunduğunu real-time brauzerdə vizual görmək
   mümkündür (heç Profiler qeydə almadan belə).

### 4.3 Edge-case: production-da profiling

Default production build-də `<Profiler>` overhead-dən qorunmaq üçün deaktiv
edilir — `onRender` çağırılmır, React DevTools-da commit-lər görünmür.
Production-a yaxın rəqəmlər üçün React-in **profiling-enabled production
build**-i lazımdır (`react-dom/profiling` girişi + `scheduler/tracing`), əks
halda dev build-in overhead-i (əlavə xəbərdarlıqlar, yoxlamalar) rəqəmləri
real vəziyyətdən qat-qat yavaş göstərir və qərar üçün yanlış zəmin yaradır.

### 4.4 Senior-level tələlər

- **Dev build-də ölçülən rəqəmi production rəqəmi kimi təqdim etmək** —
  StrictMode-un development-də bəzi funksiyaları 2 dəfə çağırması da
  rəqəmləri təhrif edir.
- **Yalnız bir komponentin "sarı" olduğunu görüb onu memo etmək, amma əsl
  səbəbin yuxarıdan gələn re-render triggeri olduğunu qaçırmaq** — flame
  graph-da yuxarı ağaca baxmadan aşağıdan düzəliş etmək simptomatik həll
  olur.

---

## 5. Chrome Performance Panel

### 5.1 Necə işləyir

Performance panel bütün brauzer aktivliyini (JS, layout, paint, network,
GC) vaxt oxu üzərində qeydə alır.

**Trace qeydə alma:** Performance tab → Record → hərəkəti et → Stop.

**Main thread flame chart:** Hər bar bir "event"dir (funksiya çağırışı,
layout, paint və s). Bar-ın **eni** — o event-in müddəti; şaquli ox — call
stack (üst-üstə düzülmüş bar-lar səbəb-nəticə əlaqəsini göstərir, yəni üstdəki
bar aşağıdakının içindən çağırılıb).

**Long task göstəricisi:** Task/layout event bar-ının sağ yuxarı küncündə
**qırmızı üçbucaq** görünürsə, bu "long task" (50ms-dən uzun sürən, main
thread-i bloklayan iş) deməkdir. Long task-lar INP-ə birbaşa təsir edir —
input delay-in əsas mənbəyidir.

**Summary tab:** Qeydə alınan müddət ərzində vaxtın necə bölündüyünü göstərir
— Loading, Scripting, Rendering, Painting kateqoriyaları üzrə. Hansı
kateqoriyanın dominant olduğu, optimallaşdırma səyini hara yönəltmək
lazım olduğunu göstərir (məs. Scripting dominantdırsa, JS-i optimallaşdırmaq
lazımdır, network-ü yox).

**Forced reflow xəbərdarlığı:** Kod layout-u "oxuyub" (məs. `offsetHeight`)
dərhal DOM-u dəyişdirdikdə (məs. `style.width = ...`) brauzer layout-u vaxtından
əvvəl məcburi hesablamalı olur. Panel bunu "Forced reflow" xəbərdarlığı ilə
qeyd edir və link-lənmiş source kodu göstərir.

### 5.2 Praktiki nümunə: forced reflow tapmaq

```javascript
// YANLIŞ: layout thrashing — hər iterasiyada oxu+yazı bir-birini məcbur edir
function resizeAll(elements) {
  elements.forEach((el) => {
    const height = el.offsetHeight; // OXU (layout tələb edir)
    el.style.height = height * 2 + 'px'; // YAZI (layout-u invalid edir)
  });
  // Növbəti iterasiyada offsetHeight OXUSU əvvəlki YAZI-nı məcburi hesablatdırır
}
```

Chrome Performance panel bunu flame chart-da bir sıra kiçik, təkrarlanan
"Layout" event-ləri kimi göstərir, hər birinin yanında forced reflow
xəbərdarlığı ilə.

**Düzəliş — oxu/yazı fazalarını ayırmaq:**

```javascript
function resizeAll(elements) {
  // Əvvəlcə BÜTÜN oxuları et
  const heights = elements.map((el) => el.offsetHeight);
  // Sonra BÜTÜN yazıları et
  elements.forEach((el, i) => {
    el.style.height = heights[i] * 2 + 'px';
  });
}
```

### 5.3 Senior-level tələlər

- **Yalnız CPU-nu "no throttling" ilə test etmək.** Real istifadəçilərin
  çoxu daha zəif cihazlarda olur — panel-in "CPU throttling: 4x slowdown"
  seçimi ilə test etmək daha realistik mənzərə verir.
- **Long task-ı görüb, onu bir bütöv kimi "sync" saxlamaq, halbuki `yield`
  (məs. `scheduler.yield()` və ya kiçik `setTimeout(0)` bölmələri) main
  thread-i azad edə bilərdi.**
- **Network throttling etmədən "sürətli" nəticə əldə etmək** — TTFB, resurs
  yüklənməsi kimi network-bağlı metrikalar local mühitdə həmişə real
  istifadəçi şərtlərindən yaxşı görünür.

---

## 6. Bundle Analysis

### 6.1 Mexanizm

Bundle analyzer (webpack-bundle-analyzer, source-map-explorer, Next.js-in
daxili `@next/bundle-analyzer`-i) source map-lərdən istifadə edərək minified
bundle-dakı hər bayt-ın HANSI mənbə fayldan/paketdən gəldiyini müəyyən edir
və nəticəni treemap kimi vizuallaşdırır.

**Üç ölçü rejimi:**
- **Stat** — minifikasiyadan əvvəlki mənbə kod ölçüsü
- **Parsed** — minifikasiyadan sonrakı ölçü
- **Gzipped** — minifikasiya + gzip-dən sonrakı ölçü

`Stat > Parsed > Gzipped` sırası həmişə keçərlidir. Vacib nüans: gzip ölçüsü
hər modulu AYRI-AYRI sıxıb cəmləməklə hesablanır, amma real bundle bir bütöv
fayl kimi sıxılır — ona görə treemap-dəki gzip ədədlərinin cəmi real
transfer ölçüsündən bir qədər BÖYÜK görünə bilər (ayrı-ayrı sıxma birgə
sıxmadan az effektivdir).

### 6.2 Praktiki nümunə: treemap-də "gizli" böyük paket tapmaq

```bash
# Next.js layihəsində
npm install --save-dev @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({});
```

```bash
ANALYZE=true npm run build
```

Treemap açılanda, adətən görülən nümunə: bir tarix kitabxanası (məs.
`moment.js`, bütün locale-lərlə) 300KB+ tutur, halbuki kod bazasında ondan
cəmi bir funksiya (`format`) istifadə olunur.

**Edge-case: "kiçik" görünən paket əslində böyükdür.** `lodash-es`-dən tək bir
funksiya import etmək (`import { debounce } from 'lodash-es'`) tree-shaking
düzgün işləmirsə (bax bölmə 7), treemap-də bütün `lodash-es` göstərilə bilər
— görünən import sətri kiçikdir, amma real bundle payı böyükdür. Bu, "kodda
nə yazdığın" ilə "bundle-a nə düşdüyü" arasındakı fərqin klassik nümunəsidir
və yalnız bundle analyzer bunu üzə çıxarır, kod review-u yox.

### 6.3 Senior-level tələlər

- **Yalnız gzip ölçüsünə baxıb parse/compile vaxtını unutmaq.** Böyük bir JS
  faylı kiçik gzip ölçüsünə malik ola bilər (yaxşı sıxılan təkrarlanan kod),
  amma parse+compile vaxtı CPU-bağlıdır, ölçüdən çox token sayından asılıdır.
- **"Bu paket 50KB, əhəmiyyətsizdir" düşüncəsi** — kümülativ təsiri nəzərə
  almamaq. 10 belə "əhəmiyyətsiz" paket 500KB-a yığışır.
- **Analyzer-i yalnız bir dəfə, layihənin əvvəlində işlətmək.** Bundle
  ölçüsü zamanla "boiling frog" effekti ilə böyüyür — CI-da bundle-size
  budget (limit) qoyulmadan bu, geriyə fərq edilmir.

---

## 7. Tree Shaking

### 7.1 Mexanizm

Tree shaking — istifadə olunmayan export-ların bundle-dan silinməsi. Bu, ES
modullarının **statik strukturuna** əsaslanır: `import`/`export` bəyanatları
run-time-da deyil, **build zamanı** analiz edilə bilər, çünki onlar şərti
deyil (`if` daxilində ola bilməz, string interpolyasiya ilə dinamik ola
bilməz).

```javascript
// math.js — statik export-lar, hər ikisi analiz edilə bilər
export function square(x) { return x * x; }
export function cube(x) { return x * x * x; }
```

```javascript
// yalnız cube import olunur
import { cube } from './math.js';
// bundler `square`-in heç yerdə istifadə olunmadığını bilir → silinir
```

**Niyə CommonJS işləmir:** `require()` run-time funksiya çağırışıdır —
`const utils = require('./utils')` zamanı bundler hansı property-lərin
sonradan `utils.X` kimi istifadə olunacağını build zamanı bilə bilmir (bu,
teorik olaraq dinamik ola bilər: `utils[someVariable]`). Ona görə CommonJS
modulları adətən BÜTÖV şəkildə bundle-a düşür.

### 7.2 `sideEffects` flag-ı və qərar ağacı

`package.json`-dakı `sideEffects` webpack-ə deyir: "bu fayllar 'təmizdir',
istifadə olunmasa sil". Bu, `usedExports`-dan DAHA GÜCLÜDÜR, çünki bütöv
modulu (və onun asılılıqlarını) TAMAMILƏ atlamağa icazə verir, təkcə
istifadə olunmayan export-ları yox.

```json
{
  "name": "my-lib",
  "sideEffects": false
}
```

Qərar ağacı: (1) bu modulun bir export-u istifadə olunurmu? → daxil et. (2)
yox — modul `sideEffects`-də işarələnibmi? → daxil et. (3) heç biri deyil →
modulu VƏ onun asılılıqlarını at.

### 7.3 Edge-case: CSS import-un yanlışlıqla silinməsi

```javascript
// Button/index.js
import './Button.css'; // vizual side-effect var, amma export YOXDUR
export default function Button() { /* ... */ }
```

Əgər layihə kökündə `"sideEffects": false` qoyulubsa, webpack `Button.css`
import-unun heç bir export-u olmadığını görüb onu "istifadə olunmayan" kimi
SİLƏ BİLƏR — nəticədə production build-də stil yox olur, amma dev serverdə
(fərqli optimallaşdırma yolu ilə) hər şey normal görünür. Bu, "mənim
komputerimdə işləyir" tipli bug-ların performans optimallaşdırmasından
qaynaqlanan klassik nümunəsidir.

**Düzəliş:**
```json
{ "sideEffects": ["**/*.css"] }
```

### 7.4 Senior-level tələlər

- **Node modullarını CommonJS kimi buraxıb "tree-shaking işləmir" deyə
  şikayət etmək** — həll: ESM export edən (`"module"` field, `exports` map-də
  `"import"` giriş nöqtəsi) kitabxana seçmək və ya `esModuleInterop`
  konfiqurasiyasını yoxlamaq.
- **`sideEffects: false`-u kor-koranə köçürmək** — üçüncü tərəf boilerplate-dən
  götürülüb, amma polyfill/CSS/qlobal patch faylları unudulub işarələnmir.
- **Named import-un tree-shaking-i tam təmin etdiyini fərz etmək** — bəzi
  kitabxanalar (köhnə versiyalar, babel transpile ilə CommonJS-ə çevrilmiş
  ESM) named import sintaksisi ilə yazılsa belə, daxildə side-effect-li kod
  daşıyır və silinmir.

---

## 8. Dynamic Import

### 8.1 Mexanizm

`import()` — ECMAScript-in **run-time** modul yükləmə sintaksisidir (statik
`import` build-time-dır). Bundler (webpack, Rollup, Turbopack) `import()`
çağırışını görəndə onu ayrı bir chunk-a çıxarır və bu chunk yalnız funksiya
İCRA OLUNANDA network-dən yüklənir.

```javascript
// statik import: lodash həmişə əsas bundle-a düşür
import _ from 'lodash';

// dinamik import: lodash ayrı chunk-a çıxır, yalnız çağırılanda yüklənir
async function getComponent() {
  const { default: _ } = await import('lodash');
  return _.join(['Hello', 'webpack'], ' ');
}
```

Build nəticəsi fərqi göstərir:
```
asset vendors-node_modules_lodash_lodash_js.bundle.js 549 KiB  ← ayrı chunk
asset index.bundle.js 13.5 KiB                                  ← əsas bundle
```

### 8.2 Edge-case: dynamic import-un özü gecikmə yaradır

```jsx
// Modal yalnız düymə basılanda lazımdır — məntiqli dynamic import namizədi
function App() {
  const [showModal, setShowModal] = useState(false);
  const openModal = async () => {
    setShowModal(true); // amma Modal komponenti hələ yüklənməyib!
  };
  return showModal ? <Modal /> : <button onClick={openModal}>Aç</button>;
}
```

Bu, `React.lazy` olmadan sadə `import()` ilə edilsə, `setShowModal(true)`
çağırılanda `Modal` hələ network-dən gəlməyibsə, render xətası verər. Doğru
forma `React.lazy` + `Suspense` kombinasiyasıdır, amma bunun da real dəyəri
var: modal ilk kliklənəndə network ROUND-TRIP-i baş verir → düymə basılan
andan modalın göründüyü ana qədər əlavə gecikmə yaranır (bu gecikmə INP-ə
düşür!). Çox tez-tez açılan UI elementləri (məs. əsas naviqasiya menyusu)
üçün dynamic import ÜMUMİ bundle-ı kiçildir, amma İLK istifadə zamanı
gözlənilməz responsiveness gecikməsi yaradır — bu, trade-off-dur, "always
win" deyil.

**Qismən həll — `prefetch`:**
```jsx
const Modal = React.lazy(() => import('./Modal'));

function App() {
  // Hover zamanı əvvəlcədən yükləməyə başla, klikə qədər hazır olsun
  const prefetchModal = () => import('./Modal');
  return (
    <button onMouseEnter={prefetchModal} onClick={() => setShowModal(true)}>
      Aç
    </button>
  );
}
```

### 8.3 Senior-level tələlər

- **Hər komponenti "yaxşı təcrübə" deyə dynamic import etmək** — yuxarıda
  göstərildiyi kimi, tez-tez, dərhal lazım olan komponentlər üçün bu, INP-i
  PİSLƏŞDİRİR.
  bundle-ı azaltsa da.
- **`import()`-un nəticəsini cache etməmək** — hər çağırışda bundler chunk-ı
  yenidən network-dən istəməz (modul qeydiyyatı bunu idarə edir), amma
  `.then()` içində əlavə ağır iş təkrarlana bilər.
- **LCP elementini dynamic import zənciri arxasında saxlamaq** (bax bölmə
  1.6-dakı edge-case).

---

## 9. Code Splitting

### 9.1 Üç yanaşma (webpack rəsmi sənədləri)

1. **Entry points** — `entry` konfiqurasiyasında bir neçə giriş nöqtəsi
   təyin etmək. Sadədir, amma paylaşılan asılılıqlar hər iki bundle-a
   DUPLIKAT olaraq düşür (əlavə konfiqurasiya olmadan).
2. **SplitChunksPlugin** — webpack-in avtomatik ortaq asılılıqları (məs.
   `lodash` hər iki entry-də istifadə olunursa) ayrıca "vendor" chunk-a
   çıxarması.
3. **Dynamic import (`import()`)** — bölmə 8-də izah olunan, ən çox istifadə
   olunan, route/komponent səviyyəsində manual splitting üsulu.

### 9.2 Praktiki nümunə: route-based splitting

```jsx
// React Router ilə
import { lazy, Suspense } from 'react';
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

Next.js-də bu, App Router-də **default davranışdır** — hər route avtomatik
öz chunk-ına bölünür, developer əlavə iş görmür.

### 9.3 Edge-case: `Suspense` boundary-nin yeri route keçidini "yavaşladır"

```jsx
// YANLIŞ: tək bir böyük Suspense boundary bütün route-u gizlədir
<Suspense fallback={<FullPageSpinner />}>
  <Dashboard /> {/* daxilində həm sürətli, həm yavaş yüklənən hissələr var */}
</Suspense>
```

`Dashboard` daxilində sürətli render olan bir siyahı ilə, ağır bir chart
kitabxanası eyni Suspense boundary-dədirsə, bütün səhifə chart yüklənənə
qədər spinner göstərir — halbuki siyahı artıq hazırdır. Granular Suspense
boundary-lər (hər asinxron hissə üçün ayrıca) bu problemi həll edir, amma
hər boundary öz fallback UI-sini tələb edir — həddindən artıq granularlıq
"skeleton çərçivəsi" adlanan vizual "sıçrayış" problemini yaradır (hər bölmə
öz vaxtında "pop" edir, CLS-ə mənfi təsir edə bilər).

### 9.4 Senior-level tələlər

- **Hər faylı ayrıca chunk etmək** — HTTP/2 multiplexing bunu qismən yumşaldır,
  amma çox sayda kiçik chunk hələ də parse overhead-i və chunk-lar arası
  koordinasiya xərcini artırır.
- **Route-based splitting edib, sonra bütün route-ları səhifə yüklənəndə
  `prefetch` etmək** — bu, code splitting-in ilkin yük azaltma faydasını
  ləğv edir, çünki bütün chunk-lar tez-tez hələ də erkən yüklənir.
- **Suspense fallback-in özünün CLS yaratdığını qaçırmaq** — skeleton
  ölçüsü real məzmun ölçüsü ilə uyğun deyilsə, məzmun gələndə layout shift
  baş verir.

---

## 10. Memory Leak

### 10.1 Frontend-də tipik səbəblər (mexanizm)

JavaScript-də memory leak — artıq lazım olmayan obyektin qarbage collector
(GC) tərəfindən təmizlənə bilməməsidir, çünki ona hardasa canlı bir
reference qalır. Ən tipik dörd nümunə:

**1. Closures.** Funksiya öz yaradıldığı lexical scope-a reference saxlayır.
Əgər closure uzunömürlü bir yerdə (məs. qlobal event listener, timer) saxlanırsa,
onun bağladığı BÜTÜN scope (böyük obyektlər daxil olmaqla) canlı qalır:

```javascript
function attachHandler(largeData) {
  // largeData çox böyük obyekt ola bilər
  window.addEventListener('resize', () => {
    console.log(largeData.length); // closure largeData-nı "tutur"
  });
  // handler heç vaxt removeEventListener ilə silinmirsə,
  // largeData səhifə həyatı boyu yaddaşda qalır
}
```

**2. Event listener-lər.** DOM elementinə əlavə olunan listener silinmirsə,
element DOM-dan çıxarılsa belə (bəzi hallarda), listener referansı onu
diri saxlaya bilər — xüsusilə element `window`/`document` kimi uzunömürlü
bir obyektə listener qoyubsa və özü unmount olunub, amma listener
silinməyibsə.

```jsx
// YANLIŞ: cleanup yoxdur
useEffect(() => {
  const handleScroll = () => { /* ... */ };
  window.addEventListener('scroll', handleScroll);
  // return təmizləmə funksiyası YOXDUR
}, []);
```

```jsx
// DÜZGÜN
useEffect(() => {
  const handleScroll = () => { /* ... */ };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

**3. Detached DOM node-lar.** Chrome DevTools-un rəsmi tərifinə görə: "A node
is said to be 'detached' when it's removed from the DOM tree but some
JavaScript still references it." — element DOM ağacından silinib (məs.
`element.remove()` və ya valideynin `innerHTML` təmizlənməsi ilə), amma
JavaScript-də (closure, massiv, state) ona reference qalıb:

```javascript
let cachedRows = [];

function refreshTable() {
  const table = document.getElementById('table');
  cachedRows.push(...table.children); // reference saxlanılır
  table.innerHTML = ''; // DOM-dan silindi, amma cachedRows onları tutur
  // → detached DOM tree, GC edilə bilmir
}
```

**4. Timer/interval-lar.** `setInterval` təmizlənmirsə, onun callback-i (və
bağladığı closure) sonsuza qədər canlı qalır:

```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount((c) => c + 1);
  }, 1000);
  return () => clearInterval(id); // bu olmadan komponent unmount olsa belə davam edir
}, []);
```

### 10.2 Necə ölçülür: Chrome DevTools Memory panel

**Heap snapshot iş axını:**
1. Memory panel → "Heap snapshot" → Take snapshot (baseline).
2. Şübhəli hərəkəti et (məs. bir modal aç-bağla 10 dəfə).
3. İkinci snapshot al.
4. View-u "Comparison"a keçir, birinci snapshot-la müqayisə et.
5. **Size Delta** sütununa bax — gözlənilən müvəqqəti obyektlər üçün böyük
   müsbət dəyər, real leak siqnalıdır (obyektlər təmizlənməli idi, amma
   qalıb).

**Detached DOM tapmaq:** Class filter-ə `Detached` yazmaq — detached DOM
ağaclarını filtrləyir. Vizual kod: **qırmızı node-lar** JavaScript-dən
birbaşa reference-i yoxdur, amma detached ağacın hissəsi olduğu üçün
canlıdır; **sarı node-lar** JavaScript-dən BİRBAŞA reference-i var — sarı
node-u tapmaq, "hansı closure/dəyişən bu ağacı tutur" sualına cavab verir.

**Allocation timeline:** Yeni memory allocation-ları zaman xəttində izləyir
— hansı user əməliyyatının nə vaxt yaddaş ayırdığını göstərir.

**Performance panel-də Memory checkbox:** Trace qeydə alarkən "Memory"
checkbox-ı aktivləşdirsə, heap ölçüsü qrafiki timeline-a əlavə olunur —
saw-tooth (mişar dişi) forması normaldır (allokasiya + GC), amma davamlı
YUXARIYA gedən trend leak siqnalıdır.

### 10.3 Edge-case: React-specific leak — stale closure + subscription

```jsx
function useLiveData(id) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const subscription = dataSource.subscribe(id, (newData) => {
      setData(newData); // closure `id`-ni tutur
    });
    return () => subscription.unsubscribe();
  }, [id]);

  return data;
}
```

Bu kod DÜZGÜN görünür (cleanup var), amma əgər `dataSource.subscribe`
daxilində callback-i bir qlobal massivdə saxlayıb `unsubscribe`-də onu
düzgün SİLMİRSƏ (kitabxana bug-ı və ya səhv API istifadəsi), hər `id`
dəyişikliyində YENİ closure yaranır, köhnəsi silinmir — komponent uzun müddət
açıq qalan bir səhifədə (dashboard, SPA) get-gedə yaddaş sızdırır. Bunu
tapmaq üçün DevTools-da closure-ların sayını (Objects allocated) zaman
keçdikcə izləmək lazımdır — kodun özünə baxmaqla görünməyə bilər, çünki
`return () => subscription.unsubscribe()` "düzgün" görünür.

### 10.4 Senior-level tələlər

- **`useEffect` cleanup-ını yazmaq, amma asılılığı səhv təyin etmək** —
  cleanup var deyə "təhlükəsizdir" düşünülür, halbuki hər render-də yeni
  subscription yaranıb köhnəsi YALNIZ unmount-da, hər render-də DEYİL
  təmizlənirsə, aralıq sızma yığılır.
- **Detached DOM-u "React-in problemi deyil" deyə görməzdən gəlmək** —
  üçüncü tərəf kitabxanaların (charting, map) DOM-u özləri idarə etdiyi
  hallarda, React unmount edəndə həmin kitabxananın öz `destroy()`/`dispose()`
  metodu çağırılmayıbsa, detached tree qalır.
- **Memory leak-i yalnız "səhifə uzun açıq qaldıqda yavaşlayır" simptomundan
  sonra axtarmaq** — production-da RUM ilə heap trend-ini izləmədən, leak
  yalnız istifadəçi şikayət edəndə tapılır, bu da artıq gecdir.

### 10.5 Trade-off sualları (bölmə 3, 9, 10 üçün ümumi)

1. Hər `useEffect`-ə cleanup yazmaq "həmişə düzgün vərdiş"dirmi, yoxsa
   overhead yaradan hallar var? (Fikirləş: subscription-un özü idempotent
   və ucuzdursa.)
2. Bundle-ı çox bölmək (aggressive code splitting) həmişə yaxşıdırmı? Hansı
   halda "hər şeyi bir bundle-da saxlamaq" daha yaxşı nəticə verər?
   (Fikirləş: HTTP/1.1 mühiti, çox kiçik chunk-ların sayı.)
2. Memory leak-i production-da tapmaq üçün hansı RUM siqnalı istifadə
   edilməlidir, heap snapshot production-da mümkün olmadığı halda?

### 10.6 Mock müsahibə sual-cavabları (Bölmə 6-10 üçün)

**S: Tree shaking niyə CommonJS ilə işləmir?**
C: CommonJS-in `require()` funksiyası run-time çağırışıdır, statik analiz
edilə bilmir — bundler hansı export-ların istifadə olunacağını build zamanı
bilə bilmir. ES modullarının statik `import`/`export` strukturu isə build
zamanı tam analiz edilə bilir.

**S: `React.lazy` ilə bölünmüş komponent həmişə performansı yaxşılaşdırırmı?**
C: Yox. Əgər komponent dərhal, tez-tez lazımdırsa (məs. ilk klikdən sonra
açılan əsas UI), dynamic import network round-trip-i əlavə edir və bu,
ilkin bundle ölçüsü qənaətindən daha çox responsiveness (INP) itkisi yarada
bilər. Prefetch ilə qismən azaldıla bilər, amma "always split" bir qayda
deyil.

**S: Detached DOM node-u necə tapardınız?**
C: Chrome DevTools Memory panel-də heap snapshot alıb, Class filter-ə
"Detached" yazaraq axtarardım. Qırmızı node-lar birbaşa JS reference-i
olmayan, amma detached ağacın hissəsi kimi diri qalanlardır; sarı node-lar
birbaşa reference-i olanlardır — sarı node-u tapıb, hansı dəyişən/closure-un
bu ağacı tutduğunu müəyyən edərdim.

**S: Bundle analyzer-də bir paketin "kiçik" göründüyünü, amma real ölçüsünün
böyük olduğunu necə izah edərdiniz?**
C: Import sətri kiçik görünsə də (məs. bir named import), əgər kitabxana
tree-shaking-ə uyğun deyil (CommonJS, `sideEffects` düzgün işarələnməyib),
bütün modul bundle-a düşür. Yalnız bundle analyzer treemap-i bunu üzə
çıxarır — kod review-da import sətri "səhv" görünmür.

---

## Mənbələr

- [Web Vitals | web.dev](https://web.dev/articles/vitals) — Core Web Vitals icmalı, p75 metodologiyası, TTFB-nin Core Web Vital olmadığı
- [Largest Contentful Paint (LCP) | web.dev](https://web.dev/articles/lcp) — LCP tərifi, hesablanan elementlər, threshold-lar
- [How the Core Web Vitals metrics thresholds were defined | web.dev](https://web.dev/articles/defining-core-web-vitals-thresholds) — threshold-ların (2.5s, 0.1 və s.) necə müəyyənləşdiyi
- [Interaction to Next Paint (INP) | web.dev](https://web.dev/articles/inp) — INP tərifi, input delay/processing/presentation delay komponentləri, FID-dən fərqi, threshold-lar
- [Cumulative Layout Shift (CLS) | web.dev](https://web.dev/articles/cls) — CLS formulu, session window konsepsiyası, threshold-lar
- [Time to First Byte (TTFB) | web.dev](https://web.dev/articles/ttfb) — TTFB tərifi, daxil olan fazalar, threshold-lar, Core Web Vital olmadığı qeydi
- [Chrome DevTools — Performance panel](https://developer.chrome.com/docs/devtools/performance) — trace qeydə alma, flame chart, long task, forced reflow
- [Chrome DevTools — Fix memory problems](https://developer.chrome.com/docs/devtools/memory-problems) — memory leak səbəbləri, heap snapshot iş axını
- [Chrome DevTools — Record heap snapshots](https://developer.chrome.com/docs/devtools/memory-problems/heap-snapshots) — detached DOM tapma metodologiyası, qırmızı/sarı node fərqi
- [<Profiler> – React](https://react.dev/reference/react/Profiler) — Profiler API, onRender callback, production profiling build tələbi
- [webpack — Tree Shaking guide](https://webpack.js.org/guides/tree-shaking/) — ES modul statik strukturu, sideEffects flag, CommonJS məhdudiyyəti
- [webpack — Code Splitting guide](https://webpack.js.org/guides/code-splitting/) — entry points, SplitChunksPlugin, dynamic import
- [Reduce JavaScript payloads with code splitting | web.dev](https://web.dev/articles/reduce-javascript-payloads-with-code-splitting) — route-based splitting, dynamic import mexanizmi
- [Why React Re-Renders — Josh W. Comeau](https://www.joshwcomeau.com/react/why-react-re-renders/) — re-render-in üç səbəbi (state, valideyn, context)

## Kasıb (thin) qalan mövzular

- **Re-render profiling üçün spesifik ədədi threshold-lar** (məs. "X ms-dən
  çox render pisdir") rəsmi mənbələrdə birbaşa verilmir — 16ms/frame (60fps)
  ümumi qəbul edilmiş praktiki hədd kimi istifadə olundu, amma bu, React-in
  özünün rəsmi elan etdiyi ədəd deyil, ümumi brauzer render büdcəsi
  prinsipindən çıxarılıb.
- **`webpack-bundle-analyzer`-in özünün rəsmi API sənədləşməsi** (README
  səviyyəsindən dərin) internetdə geniş şəkildə tapılmadı — treemap
  davranışı README və community bloqlarından təsdiqləndi, rəsmi
  "specification" formatında sənəd yoxdur.
- **Detached DOM node-ların React-specific ssenariləri** (məs. hansı React
  pattern-lərinin bu problemi ən çox yaratdığı) üçün React-in öz rəsmi
  sənədləşməsində ayrıca bölmə yoxdur — bu hissə ümumi Chrome DevTools
  qaydalarının React kontekstinə tətbiqi kimi yazılıb, birbaşa React rəsmi
  mənbəyi ilə təsdiqlənməyib.
