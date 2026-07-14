# Frontend Architect — Part 10: Runtime Performansı

> Bu, "Frontend Architect" seriyasının 10-cu hissəsidir (bax:
> `courses/frontend-architect.plan.md`). Part 9-da kodu brauzerə *çatdırmaq*
> (network) idi. İndi kod artıq çatıb — söhbət **icra vaxtı**dır: JS runtime
> hot path-ları, Vite build konfiqurasiyası, və React re-render optimizasiyası.
> Ortaq mövzu: **əvvəl ölç, sonra optimize et** — mikro-optimizasiya yalnız
> ölçülmüş dar boğazlara. Part 3-dəki Provider re-render problemi burada həll
> olunur; Part 9 metrikaları (TTI, jank) işlədilir. Qərar çərçivəsi Part 1-dəki
> kimi. Mənbə: patterns.dev / PatternsDev/skills (`js-performance-patterns`,
> `vite-bundle-optimization`, `react-render-optimization`).

---

## 1. Baş prinsip: ölç, sonra optimize et

### 1.1 Niyə vacibdir

Runtime performansında ən böyük tələ **erkən/kor optimizasiya**dır. `useMemo`-nu
hər yerə səpmək, hər funksiyanı `useCallback`-a bükmək — çox vaxt performansı
*pisləşdirir* (əlavə yaddaş + müqayisə xərci) və kodu oxunmaz edir.

Hər üç mənbənin əsas mesajı eynidir:
- js-performance-patterns: "mikro-optimizasiyanı yalnız **ölçülmüş** hot path-a
  tətbiq et — əvvəl alqoritmik yaxşılaşma."
- react-render-optimization: pattern-lər **impact-a görə** sıralanıb (yüksək →
  aşağı).
- vite: "barrel file və manual chunking-dən başla (ən böyük təsir), sonra
  progressiv."

Architect qaydası (Part 1): "hər 'sürətli' iddia bir ox və rəqəm adlandırır."
Profiler (React DevTools Profiler, Chrome Performance panel) qərarın əsasıdır,
hiss yox.

---

## 2. JS runtime pattern-ləri (framework-agnostik)

Bunlar hot path, sıx loop, DOM əməliyyatı, data-ağır tapşırıqlar üçündür:

- **Set/Map lookup:** təkrar yoxlamada `.includes()` (O(n)) → `.has()` (O(1)).
  Böyük dataset-də böyük fərq.
- **DOM oxu/yazını qruplaşdır:** oxu (`offsetHeight`, `getBoundingClientRect`)
  ilə yazını (`style.height = ...`) növbələşdirmək brauzeri dəfələrlə layout
  hesablamağa məcbur edir (**layout thrashing**). Əvvəl bütün oxu, sonra bütün
  yazı.
- **Property girişini cache-lə:** sıx loop-da təkrar-işlədilən nested property
  və ya `.length`-i lokal dəyişəndə saxla.
- **Memoization:** eyni arqumentlə təkrar çağırılan pure funksiyanın nəticəsini
  cache-lə (tək dəyər və ya Map cache).
- **İterasiyaları birləşdir:** böyük array-də `.filter().map().reduce()`
  zəncirini tək loop-a birləşdir (zəncir aralıq array yaradır).
- **Short-circuit:** bahalı əməliyyatdan əvvəl boş girişi/uzunluğu yoxla.
- **Sabit yaratmanı hoist et:** RegExp kompilyasiyasını, sabitləri loop/funksiya
  xaricinə çıxar.
- **Immutable array metodları:** `toSorted()`, `toReversed()`, `toSpliced()` —
  kopyala-sonra-dəyiş əvəzinə aydın niyyət.
- **`requestAnimationFrame`:** vizual DOM yeniləmələrini rAF içində qruplaşdır
  (render dövrü ilə sinxron, jank qarşısı).
- **`structuredClone()`:** dərin kopya üçün — Date, Map, Set, dairəvi referansı
  `JSON.parse(JSON.stringify())`-dən fərqli düzgün işləyir.
- **Dinamik açarlar üçün `Map` > plain object** (V8 optimizasiyası).

> **Niyə vacibdir:** Bunlar React-dan asılı deyil — data emalı, canvas, animasiya,
> hər hansı hot loop üçün. Amma **yalnız ölçülmüş** hot path-a: 10 elementlik
> array-də `.includes()`-i `Set`-ə çevirmək faydasız mürəkkəblikdir.

---

## 3. React render optimizasiyası — re-render-i azalt

25 pattern; impact-a görə qruplaşdırılıb. Əsas ideya: **komponent lazımsız yerə
re-render olmasın, olanda ucuz olsun.**

### 3.1 Yüksək impact

- **Törəmə dəyəri render zamanı hesabla** — hesablanmış state saxlama; ucuz üçün
  `const`, bahalı üçün `useMemo` (böyük array filter). Sync bug-larını və
  lazımsız re-render-i aradan qaldırır.
- **Coarse-grained state-ə abunə ol** — kəsilməz dəyişən raw dəyər yox, törəmə
  boolean (`isMobile`) izlə. Media query hook yalnız breakpoint keçəndə re-render
  etsin, hər piksel resize-də yox.
- **Bahalı subtree-ni memoized komponentə çıxar** — React fast path-da (loading,
  error) onu render etməyi keçsin.
- **Komponenti komponent içində TƏYİN ETMƏ** — hər render-də yeni tip yaranır →
  unmount, state itkisi, DOM yenidən yaranması. Həmişə modul scope-da təyin et.
- **Uzun siyahılar üçün `content-visibility: auto`** — brauzer ekrandankənar
  elementlərin layout/paint-ini keçir (1000-dən ~990) → 5–10x ilkin render.
  Virtualizasiya (Part 9) ilə birləşdir.
- **`useDeferredValue`** — bahalı subtree arxa planda re-render olarkən UI cavabdeh
  qalsın. `useTransition` setter-i bükür; `useDeferredValue` istehlakı bükür
  (setter-ə nəzarətin yoxdursa).

### 3.2 Orta impact

- **Lazy state init:** `useState(() => buildIndex(items))` — funksiya yalnız
  mount-da işləyir, hər render-də yox.
- **Funksional setState:** `setCount(c => c + 1)` — state-i dependency array-dən
  çıxarır, stabil callback identity.
- **İnteraksiya məntiqi effect-də yox, event handler-də** — user-tetikli məntiq
  (submit, klik) handler-də; effect-lər əlaqəsiz dependency dəyişəndə təkrar
  işləməsin.
- **`startTransition` təcili olmayan yeniləmə üçün** — axtarış filtri, tab keçidi,
  siyahı sort-u; React yazma/klik kimi təcili işə görə kəsə bilsin.
- **Yüksək-tezlikli keçici dəyər üçün `useRef`** — mouse mövqeyi, scroll offset
  ref-də, DOM-a birbaşa yaz → hər yeniləmədə re-render olmasın.
- **Default prop üçün stabil referans:** `const EMPTY = []` modul scope-da; hər
  render-də yeni `{}`/`[]` literal child memoization-ı sındırır.
- **State oxumasını istifadə anına təxirə sal**, **effect dependency-lərini
  primitivə daralt**, **birləşik hook hesablamalarını böl** — hamısı "yalnız
  həqiqətən lazım olana abunə ol" prinsipi.

### 3.3 Aşağı impact (amma faydalı)

- **Layout thrashing-dən qaç** (bölmə 2 ilə eyni; oxu→yazı qruplaşdır, rAF).
- **SVG wrapper-i animasiya et, SVG elementini yox** (tam SVG repaint qarşısı).
- **Statik JSX-i modul scope-a hoist et** (React Compiler avtomatik edir).
- **Gözlənilən hydration mismatch-i `suppressHydrationWarning`** (timestamp,
  random ID — yalnız leaf element).
- **Şərti render-də açıq yoxlama:** `&&` yerine `count > 0` — `0`/`NaN`/`""`
  text node kimi render olunur.
- **`react-dom` `preload()`/`preinit()`** kritik resurs üçün (Part 9 resource
  hints-in React API-si).
- **Client-only data üçün hydration flicker qarşısı** — inline script ilə
  React hydrate-dən əvvəl dəyəri təyin et (localStorage-dan tema).

> **Niyə vacibdir:** Part 3-də Provider "hər dəyişiklikdə hamı re-render" problemini
> qeyd etmişdik. Həlli məhz burada: context-i concern-ə görə böl (Part 5) +
> coarse-grained abunə + memoized subtree. React 19 **React Compiler** bu manual
> işin çoxunu avtomatlaşdırır (aşağıda).

---

## 4. Vite bundle optimizasiyası — build konfiqurasiyası

15 pattern, impact-a görə. (Part 9 network texnikalarının konkret Vite tətbiqi.)

### 4.1 Kritik impact

- **Barrel file import-dan qaç** — #1 bundle problemi. Barrel (`index.js`
  re-export) bundler-i tək export işlətsən belə bütün modul qrafını yükləməyə
  məcbur edir (`lucide-react` barrel = 1500+ ikon, dev-də ~2.8s). Həll: birbaşa
  import və ya `vite-plugin-barrel`.
- **Manual chunk splitting** — `manualChunks` ilə vendor kodunu app kodundan ayır;
  tez-tez dəyişən app kodu vendor cache-ini invalidate etməsin (React, router,
  data layer, UI ayrı chunk).

### 4.2 Yüksək impact

- **Route-level code splitting** (`React.lazy` + dynamic import; Vite avtomatik
  ayrı chunk).
- **Below-the-fold komponentləri lazy-load** (modal, chart, editor, map → LCP).
- **3P script-ləri defer et** (`requestIdleCallback`/setTimeout).
- **User intent-də preload** — hover/focus-da route chunk yüklə (klik gecikməsi
  yox).

### 4.3 Orta / aşağı impact

- **Dependency pre-bundling** (`optimizeDeps.include`/`exclude` — problemli
  CommonJS dep-ləri).
- **Compression** (`vite-plugin-compression` — gzip+Brotli, 60–80% kiçik).
- **Bundle-ı müntəzəm analiz et** (`vite-bundle-visualizer`; >200KB gzipped
  chunk-a bayraq, dublikat kitabxana).
- **Şəkil/asset optimizasiyası** (`assetsInlineLimit`, `vite-plugin-image-optimizer`).
- **PWA** (`vite-plugin-pwa`), **dev proxy** (`server.proxy` — CORS),
  **CSS strategiyası** (CSS Modules / Tailwind — zero-runtime; ənənəvi CSS-in-JS-dən
  üstün).
- **`import.meta.env` ilə dead code elimination** (build-time env → Rollup
  tree-shake).
- **React Compiler plugin** (`babel-plugin-react-compiler`) — komponentləri
  **avtomatik memoize** edir, manual `useMemo`/`useCallback`/`React.memo`-nu
  aradan qaldırır. React 19 tələb edir, per-file opt-in.

> **Niyə vacibdir:** React Compiler bölmə 3-dəki manual optimizasiyanın çoxunu
> köhnəldir. Architect qərarı: yeni React 19 layihədə Compiler-i aç, manual
> memoization-a yalnız Compiler çatmayan yerlərdə uzan. Bu, "boring, proven"
> əvəzinə "let the tool do it".

---

## 5. Architect yekunu — üç səviyyəli qərar

Runtime performansı üç ayrı səviyyədə həll olunur; problemi düzgün səviyyədə tut:

| Səviyyə | Simptom | Alət |
|---|---|---|
| **JS runtime** | Sıx loop / data emalı yavaş, jank | Set/Map, batch DOM, rAF, algoritm |
| **React render** | Lazımsız/bahalı re-render | memo subtree, coarse abunə, transition, ref |
| **Build/Vite** | Bundle böyük, cache pis | barrel qaç, manual chunk, compiler |

**Qərar sırası:**
1. **Ölç** (React DevTools Profiler — hansı komponent, nə qədər; Chrome
   Performance — jank, long task).
2. Ən böyük problemi tut (adətən bir komponent və ya bir barrel import).
3. Alqoritm/arxitektura həlli mikro-optimizasiyadan əvvəl.
4. React 19-da Compiler-i aç — manual memoization yükünü azalt.

**Anti-pattern (Part 1):** profilsiz `useMemo`/`useCallback` səpmək; "gələcəkdə
lazım olar" deyə erkən optimize etmək. Revisit trigger: profiler konkret dar
boğaz göstərəndə optimize et, əvvəl yox.

---

## 6. Praktik nümunə — qərar çərçivəsi ilə

**Simptom:** böyük cədvəlli dashboard yazı zamanı "kəkələyir" (input laggy).

- **Ölç:** Profiler göstərir ki, hər klaviş vuruşunda 2000-sətirlik cədvəl
  re-render olur.
- **Options:** (a) `startTransition` ilə filtri təcili-olmayan et; (b) cədvəli
  virtual list + `content-visibility`; (c) input state-ini cədvəldən ayrı
  komponentə çıxar.
- **Decision:** üçünü birləşdir — input öz komponentində (izolyasiya), filtr
  `startTransition`-da (təcili yazma bloklanmasın), cədvəl virtualized.
- **Revisit trigger:** əgər data 100k sətrə çatsa, server-side pagination-a keç
  (client optimizasiyası kifayət etməz).

---

## Məşq

Part 9 məşqindəki chat/dashboard-u götür:

1. Mesaj yazma input-unu profilə al (React DevTools Profiler) — hansı komponent
   re-render olur?
2. Ən azı üç react-render-optimization pattern tətbiq et: coarse-grained abunə,
   memoized subtree, `startTransition` və ya `useDeferredValue`.
3. Bir hot path (məs. mesaj axtarışı) tap və bir JS runtime pattern tətbiq et
   (Set lookup / iterasiya birləşdirmə).
4. Vite-də bir barrel import tap və birbaşa import-a çevir; bundle-visualizer ilə
   fərqi ölç.
5. Part 1 çərçivəsində: hər dəyişikliyin profilə əsaslanan **rəqəm**li təsirini
   yaz. React Compiler bunların hansını lazımsız edərdi?

---

## Xülasə

- Baş prinsip: **ölç (profiler), sonra optimize et**; erkən/kor optimizasiya
  zərərlidir.
- **JS runtime:** Set/Map lookup, DOM oxu/yazı qruplaşdırma (layout thrashing),
  rAF, `structuredClone`, iterasiya birləşdirmə — yalnız ölçülmüş hot path-a.
- **React render:** törəmə dəyəri render-də hesabla, coarse-grained abunə,
  memoized subtree, komponenti komponent içində təyin ETMƏ, `content-visibility`,
  `startTransition`/`useDeferredValue`, ref for high-frequency.
- **Vite build:** barrel import-dan qaç (#1), manual chunk, route split, lazy-load,
  compression, **React Compiler** (avtomatik memoization, React 19).
- Problemi düzgün səviyyədə tut (runtime / render / build); alqoritm əvvəl,
  mikro sonra.
- React 19 Compiler manual memoization yükünün çoxunu aradan qaldırır.

---

## Mənbələr

- [patterns.dev — JS Performance](https://www.patterns.dev/vanilla/),
  [Vite Bundle Optimization](https://github.com/PatternsDev/skills/tree/main/javascript/vite-bundle-optimization),
  [React Render Optimization](https://github.com/PatternsDev/skills/tree/main/react/react-render-optimization)
- [React Compiler](https://react.dev/learn/react-compiler),
  [`useDeferredValue`](https://react.dev/reference/react/useDeferredValue),
  [`startTransition`](https://react.dev/reference/react/startTransition)
- Növbəti hissə: **Part 11 — Data-layer arxitekturası**
  (`frontend-architect-part11.md`) — TanStack Query / SWR / Suspense, caching,
  optimistic update, Vue state-management, AI-UI pattern-ləri.
