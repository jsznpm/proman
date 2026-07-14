# Frontend Architect — Part 9: Loading & Bundling Performansı

> Bu, "Frontend Architect" seriyasının 9-cu hissəsidir (bax:
> `courses/frontend-architect.plan.md`). Part 7–8-də HTML-in harada/nə vaxt
> qurulduğuna baxdıq. İndi **şəbəkə səviyyəsi**: kod və resurslar brauzerə necə
> çatdırılır — loading sequence, import strategiyaları, PRPL, bundle splitting,
> tree shaking, preload/prefetch, compression, third-party idarəsi, virtual
> lists. Ortaq mövzu: **düzgün resursu, düzgün vaxtda, düzgün ölçüdə göndər.**
> Metrikalar (FCP/LCP/TTI) Part 7-dəki mənada işlədilir. Qərar çərçivəsi Part
> 1-dəki kimi. Mənbə: patterns.dev / PatternsDev/skills (`loading-sequence`,
> `prpl`, `dynamic-import`, `bundle-splitting`, `tree-shaking`, `preload`,
> `prefetch`, `compression`, `third-party`, `virtual-lists`).

---

## 1. Loading sequence — resurs sırası Core Web Vitals-ı təyin edir

### 1.1 Konsepsiya

Resurs yükləmə sırası performansa birbaşa təsir edir. Çətinlik: 1P JS, 3P JS,
CSS, font, şəkil-i elə koordinasiya etmək ki, metrikalar düzgün sıra ilə işə
düşsün: **FCP → LCP → FID**. Əsas metrikalar (Part 7-dən):

- **FCP** — ilk vizual content görünür.
- **LCP** — ən böyük görünən element render olunur.
- **FID/INP** — istifadəçi qarşılıqlı əlaqə qura bilir.
- **CLS** — yükləmə zamanı vizual stabillik.

**Tövsiyə olunan sıra (3P-siz):** HTML + inline 1P script parse → kritik CSS/font
inline → **FCP** → hero şəkil (LCP resursu) → **LCP** → 1P JS interaktivlik →
**FID hazır**.

Praktik qaydalar:
- **CSS/font:** kritik CSS inline (render-blocking-i qaç), font mənşəyinə
  `preconnect`; həddindən artıq inline HTML-i şişirdir.
- **Şəkil:** above-the-fold prioritet (LCP), below-the-fold lazy-load, hamısını
  ölçülü ver (CLS qaç).
- **JS:** 1P JS fetch-i ATF şəkillərdən əvvəl başlat, kritik olmayanlara
  `async`/`defer`, code-split.

> **Niyə vacibdir:** Baş prinsip — **"çox az, çox gec"** (pis UX) ilə **"çox
> çox, çox tez"** (şişmiş resurslar hər şeyi gecikdirir) arasında balans. Bütün
> bu part-ın texnikaları bu balansı tənzimləyən düymələrdir.

---

## 2. Kod çatdırma zənciri: split → shake → compress

Üç texnika ardıcıl işləyir və qarışdırılmamalıdır:

### 2.1 Bundle splitting — böyük bundle-ı böl

Böyük JS bundle-ı kiçik ayrı bundle-lara böl. İlkin render üçün lazımsız kodu
ayır, kritik render kodunu prioritetləşdir (FCP), spesifik interaksiya/route
üçün lazım olanı təxirə sal.

```
main.bundle.js + emoji-picker.bundle.js
// ilkin yükləmə kiçik data ilə → sürətli TTI
```

### 2.2 Tree shaking — ölü kodu at

Bundle-a əlavə etməzdən əvvəl istifadə olunmayan kodu (dead code) sil. Bundler
tətbiqi AST kimi görür, entry point-dən çatıla bilən yolları işarələyir, çatılmazı
atır.

- **Yalnız ES2015 modul sintaksisi** (`import`/`export`) shake oluna bilər;
  named import default-dan yaxşıdır.
- **Side effect vacibdir:** import olunanda qlobal scope-a təsir edən modullar
  (polyfill, stylesheet) export-ları işlədilməsə də shake oluna bilməz.
- `package.json`-da side-effect-siz paketləri işarələ (`"sideEffects": false`).

### 2.3 Compression — qalanı sıxışdır

Minifikasiyadan (Terser — boşluq/artıq kod silmə) sonra sıxışdır:

- **Static** (build vaxtı pre-compress, yüksək səviyyə, dəyişməz fayllar üçün)
  vs **Dynamic** (request-də, aşağı səviyyə, tez-tez dəyişən content).
- **Gzip** (universal) vs **Brotli** (15–25% daha kiçik; əsas seçim, Gzip
  fallback). Brotli 6–11 praktik sweet spot.

> **Granularity trade-off:** `compress(a + b) ≤ compress(a) + compress(b)` —
> böyük bundle yaxşı sıxışır, kiçik chunk yaxşı cache olunur. Həll: strateji
> chunk ölçüsü (min ~20KB), müstəqil framework/vendor chunk-ları.

---

## 3. Import strategiyaları — nəyi nə vaxt yüklə

### 3.1 Static vs Dynamic import

**Static import** (`import X from "..."`) build-time-da bundle-a girir — həmişə
lazım olan kod üçün. **Dynamic import** (`import("...")`) tələb olunanda yükləyir
— ilkin bundle-ı kiçildir:

```jsx
// modal/picker/ağır kitabxana ilkin render-də lazım deyil:
const EmojiPicker = React.lazy(() => import("./EmojiPicker"));
<Suspense fallback={<LoadingSpinner />}>
  <EmojiPicker />
</Suspense>
```

Real təsir: chat app-də EmojiPicker ayrı bundle → ilkin bundle 1.5MiB → 1.33MiB.
(SSR üçün `loadable-components`.)

### 3.2 Dynamic import-un tetikləyiciləri

Eyni `import()` fərqli anlarda tetiklənə bilər — bu, ayrı-ayrı "pattern"lərdir:

- **Route-based splitting** — hər route ayrı bundle (ən çox işlədilən; router
  səviyyəsində `lazy`).
- **Import-on-visibility** — komponent viewport-a girəndə yüklə
  (`IntersectionObserver`); below-the-fold widget-lər üçün.
- **Import-on-interaction** — istifadəçi hərəkəti (klik, hover) ilə yüklə; modal,
  video player, chat widget üçün.

Prinsip: **kodu istifadəçinin ona ehtiyacı olacağı ana ən yaxın yüklə** — nə
əvvəl (bundle şişir), nə də klikdən sonra gözlədib (gecikmə hiss olunur).

---

## 4. PRPL — bütöv strategiya

### 4.1 Konsepsiya

PRPL = **Push, Render, Pre-cache, Lazy-load** — aşağı-səviyyə cihaz və yavaş
şəbəkədə səmərəli yükləmə strategiyası:

1. **Push** — kritik resursları səmərəli it (server round-trip-i azalt).
2. **Render** — ilkin route-u dərhal render et (tez first paint).
3. **Pre-cache** — tez-tez ziyarət edilən route-ları service worker ilə cache et
   (offline dəstək).
4. **Lazy-load** — dərhal lazım olmayan route/asset-ləri tələbə görə yüklə.

App shell arxitekturası (minimal giriş faylı: paylaşılan məntiq + router) əsas
giriş nöqtəsidir; HTTP/2 bidirectional stream-lər round-trip azaldır; preload hint
brauzerə nəyi erkən çəkməyi deyir.

### 4.2 Architect qərarı

- **İstifadə et:** qlobal əlçatanlıq tələb edən PWA-lar; aşağı-səviyyə cihaz /
  zəif bağlantı regionları; critical rendering path optimizasiyası. PRPL yuxarıdakı
  texnikaların (split, preload, service worker cache) bir strategiyada birləşməsidir.

---

## 5. Resource hints — preload vs prefetch

Bunlar tez-tez qarışdırılır; fərq **vaxt və prioritet**dir:

### 5.1 Preload — indi lazım olan

`<link rel="preload">` gec kəşf edilən **kritik** resursu erkən istə:

```html
<link rel="preload" href="hero-font.woff2" as="font" crossorigin>
```

- `as` atributu ilə tip (script/style/font/image); font üçün `crossorigin` (ikiqat
  fetch-i önlə).
- Yalnız ilkin render-in ~1 saniyəsində görünən asset-ləri preload et.
- **İstifadə etmə:** kritik olmayan resurslar (əsl vaciblərini gecikdirir);
  brauzerin preload scanner-i onsuz da erkən tapan resurslar.

### 5.2 Prefetch — tezliklə lazım olacaq

`<link rel="prefetch">` gələcək naviqasiya üçün resursu **idle vaxtda, aşağı
prioritetlə** yüklə:

```html
<link rel="prefetch" href="/js/next-page.js" as="script">
```
```js
const EmojiPicker = import(/* webpackPrefetch: true */ "./EmojiPicker");
```

- **İstifadə etmə:** ehtimalı az resurslar; low-bandwidth/metered bağlantı;
  tez köhnələn resurslar.

> **Ayrım (əzbərlə):** *prefetch* tezliklə lazım olanı cache-ləyir (brauzer
> bandwidth qərarına hörmət edir); *preload* indi lazım olanı işləyir (bağlantı
> keyfiyyətindən asılı olmayaraq). Səhv istifadə hər ikisini zərərli edir.

---

## 6. Third-party script idarəsi

### 6.1 Konsepsiya

Web səhifələrinin 94%+-i 3P resurs işlədir; onlar əlavə domenə round-trip,
emal vaxtı, render bloklaması gətirir — və "3P-lərin istehlakçı saytın
performansını optimize etməyə maraqı yoxdur". Strategiyalar:

- **Async/Defer:** kritik olmayan (analytics, chat) üçün `defer` (parse-i
  bloklamır, DOM sonrası icra); `async` yalnız erkən icra lazımdırsa.
- **Resource hints:** `dns-prefetch` (yalnız DNS), `preconnect` (tam TCP/TLS)
  ilə erkən bağlantı.
- **Lazy loading:** below-the-fold embed-lər üçün native `loading`,
  `IntersectionObserver`, lazysizes.
- **Self-hosting:** kritik script-ləri öz serverində (cache nəzarəti), amma
  müntəzəm yeniləmə tələb edir.
- **Partytown** (Builder.io) — ağır script-ləri web worker-də işlədir, main
  thread-i azad edir.

Framework: **Next.js `<Script>`** — `beforeInteractive` (bot detection),
`afterInteractive` (tag manager, defolt), `lazyOnload` (idle-time).

> **Niyə vacibdir:** 3P script çox vaxt performansın **ən böyük görünməz
> qatili**dir. Architect qaydası: dəyəri az script-ləri sil, vaciblərini strateji
> sırala; Lighthouse/WebPageTest ilə müntəzəm ölç.

---

## 7. Virtual lists (windowing) — böyük siyahılar

### 7.1 Konsepsiya

Virtual list dinamik siyahının yalnız **görünən** sətirlərini render edir, bütün
dataset-i yox. Scroll edildikcə "pəncərə" data boyu hərəkət edir, ekrandan çıxan
element DOM-dan silinir. (Part 3 Flyweight ideyasının UI qarşılığı.)

```jsx
import { FixedSizeList as List } from "react-window";
const Row = ({ index, style }) => <div style={style}>{items[index].name}</div>;
<List height={150} itemCount={items.length} itemSize={35} width={300}>
  {Row}
</List>;
```

### 7.2 Architect qərarı

- **İstifadə et:** böyük siyahı/grid (100+ element) performans problemi yaradır;
  ilkin render vaxtını azaltmaq; scroll performansı.
- **İstifadə etmə:** qısa siyahılar (<~100, onsuz da yaxşı); a11y bütün
  elementləri DOM-da tələb edirsə (screen reader); ölçüsü content-dən asılı
  gözlənilməz hündürlüklər (ölçmə etibarsızlaşır).

Kitabxana: **react-window** (yüngül, ~20–30KB qənaət), infinite-loader; sadə
hallar üçün CSS **`content-visibility`**.

---

## 8. Architect yekunu — performans büdcəsi düşüncəsi

Bu texnikalar ad-hoc tətbiq olunmur — **performance budget** ətrafında qərar
verilir (Part 1 "hər 'scalable' iddia bir ox və rəqəm adlandırır"):

| Problem | Alət |
|---|---|
| İlkin bundle böyük | bundle splitting + tree shaking + dynamic import |
| Transfer ölçüsü böyük | compression (Brotli) |
| Kritik resurs gec kəşf olunur | preload |
| Növbəti səhifə yavaş | prefetch |
| 3P script bloklayır | defer / preconnect / Partytown / Next `<Script>` |
| Uzun siyahı DOM-u boğur | virtual list / `content-visibility` |
| Bütöv PWA strategiyası | PRPL |

**Qərar sırası:** əvvəl **ölç** (Lighthouse, bundle analyzer, WebPageTest),
sonra ən böyük problemi həll et. Ən böyük leverage adətən **kodu ümumiyyətlə
göndərməmək**dir (Part 8 RSC/Islands) — bu part isə *göndərilməli* olanı
optimize edir.

---

## Məşq

Bir chat/dashboard tətbiqi təsəvvür et: ağır emoji picker, 10k sətirlik mesaj
siyahısı, analytics script, custom font.

1. Emoji picker üçün **import-on-interaction** qur (`React.lazy` + klik).
2. Mesaj siyahısını **virtual list** et.
3. Font üçün `preload` + `crossorigin`, analytics üçün `defer` / Next `<Script
   lazyOnload>` seç.
4. Part 1 çərçivəsində performance budget yaz: hər dəyişikliyin hansı metrikaya
   (LCP/TTI/transfer KB) təsirini bir rəqəmlə təxmin et. Hansı dəyişiklik ən
   böyük qazancı verir?

---

## Xülasə

- Loading sequence Core Web Vitals-ı təyin edir: **FCP → LCP → FID** sırası,
  "çox az/gec" vs "çox çox/tez" balansı.
- Kod çatdırma zənciri: **split → tree-shake → compress** (Brotli); granularity
  trade-off-una diqqət.
- Import strategiyaları: static (həmişə) vs dynamic (tələbə görə) — route-based /
  on-visibility / on-interaction; **ehtiyac anına ən yaxın yüklə**.
- **PRPL** — Push/Render/Pre-cache/Lazy-load bütöv PWA strategiyası.
- **Preload** (indi lazım) vs **prefetch** (tezliklə lazım) — qarışdırma.
- **3P script** performansın görünməz qatili; defer/preconnect/Partytown/Next
  `<Script>` ilə idarə et.
- **Virtual list** böyük siyahılar üçün; a11y və dəyişkən hündürlüyə diqqət.
- Əvvəl ölç, sonra optimize et; ən böyük leverage — **JS-i heç göndərməmək**.

---

## Mənbələr

- [patterns.dev — Loading Sequence](https://www.patterns.dev/vanilla/loading-sequence),
  [PRPL](https://www.patterns.dev/vanilla/prpl),
  [Dynamic Import](https://www.patterns.dev/vanilla/dynamic-import),
  [Bundle Splitting](https://www.patterns.dev/vanilla/bundle-splitting),
  [Tree Shaking](https://www.patterns.dev/vanilla/tree-shaking),
  [Preload](https://www.patterns.dev/vanilla/preload),
  [Prefetch](https://www.patterns.dev/vanilla/prefetch),
  [Compression](https://www.patterns.dev/vanilla/compress),
  [Third-party](https://www.patterns.dev/vanilla/third-party),
  [Virtual Lists](https://www.patterns.dev/vanilla/virtual-lists)
- Növbəti hissə: **Part 10 — Runtime performansı**
  (`frontend-architect-part10.md`) — JS runtime pattern-ləri, Vite bundle
  optimization, React render optimization.
