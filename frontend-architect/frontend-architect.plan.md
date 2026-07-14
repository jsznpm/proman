
# Frontend Architect — Plan

**Məqsəd:** Frontend developer-i "komponent yazan"dan "texniki qərar verən və
sistem quran frontend architect"ə çevirmək. Kurs `patterns.dev`
(mənbə: [PatternsDev/skills](https://github.com/PatternsDev/skills) — patterns.dev
məzmununun agent-skill formatı, 58 skill) üzərində qurulub, hər mövzu architect
səviyyəsində — nə "işləyir", nə "niyə belə seçilir, nə vaxt sınır, hansı trade-off"
— izah olunur. Dil: Azərbaycan dili (kod və texniki terminlər — `hydration`, `SSR`,
`tree-shaking`, `RSC` — orijinal saxlanılır).

**Struktur (hər hissə üçün):**
1. Başlıq + niyə architect səviyyəsində vacibdir
2. Konsepsiya — ilk prinsiplərdən (mexanizm, sadəcə davranış yox)
3. Praktiki nümunələr (fenced code block, dil tag-ı ilə)
4. `> **Niyə vacibdir:**` və "ümumi səhv" callout-ları
5. Architect qərarı — nə vaxt hansı pattern (senior-architect çərçivəsi:
   Problem → Options → Trade-offs → Decision → Revisit trigger)
6. Kiçik məşq + Xülasə + Mənbələr

**Qeyd:** Hər hissə tamamlandıqda bu fayldakı checkbox işarələnir; bu fayl
həm də məzmun (table of contents) rolunu oynayır.

## Hissələr

- [x] **Part 1 — Frontend Architect rolu & qərar çərçivəsi** → `frontend-architect-part1.md`
  - Architect ≠ ən yaxşı kodçu: rol, mental model, məsuliyyət
  - senior-architect 5-addımlı qərar çərçivəsi (Problem→Options→Trade-offs→
    Decision→Revisit) və ADR (Architecture Decision Record)
  - System-design checklist: Scale/Consistency/State/Failure/Coupling/
    Boundaries/Observability/Security/Cost
  - Anti-pattern-lər (premature microservices, gizli coupling, "sonra əlavə edərik")

- [x] **Part 2 — JavaScript Design Patterns I (struktur)** → `frontend-architect-part2.md`
  - Module, Singleton, Factory, Prototype, Mixin
  - Hər biri: problem → həll → nə vaxt istifadə / istifadə etmə

- [x] **Part 3 — JavaScript Design Patterns II (davranış & data axını)** → `frontend-architect-part3.md`
  - Observer, Mediator, Command, Proxy, Flyweight, Provider
  - State axını, decoupling, reactivity-nin pattern kökləri

- [x] **Part 4 — React komponent kompozisiyası & API dizaynı** → `frontend-architect-part4.md`
  - Hooks, HOC, Render Props, Compound Components, Presentational/Container
  - Komponent API dizaynı: prop drilling, separation of concerns

- [x] **Part 5 — Modern kompozisiya (2025/2026)** → `frontend-architect-part5.md`
  - Boolean-prop → composition, compound + context, explicit variant
  - Headless komponentlər, slot pattern, polymorphic `as`, React 19 native `ref`

- [x] **Part 6 — Vue kompozisiya paralleli** → `frontend-architect-part6.md`
  - Components, Composables, `<script setup>`, provide/inject, state-management
  - Renderless / container-presentational / data-provider, dynamic & async
    components, render functions — React pattern-lərinin Vue qarşılığı

- [x] **Part 7 — Rendering strategiyaları I** → `frontend-architect-part7.md`
  - CSR, SSR, Static (SSG), Incremental Static (ISR)
  - Nə vaxt hansı: SEO, TTFB, data təzəliyi, infrastruktur trade-off-ları

- [x] **Part 8 — Rendering strategiyaları II** → `frontend-architect-part8.md`
  - Streaming SSR, Progressive & Selective Hydration, React Server Components
  - Islands Architecture, View Transitions API

- [x] **Part 9 — Loading & bundling performansı** → `frontend-architect-part9.md`
  - Loading sequence, static/dynamic import, import-on-visibility/interaction,
    route-based splitting, PRPL, bundle splitting, tree shaking
  - Preload/prefetch, compression, third-party scripts, virtual lists

- [x] **Part 10 — Runtime performansı** → `frontend-architect-part10.md`
  - JS runtime pattern-ləri (Set/Map, batching, memoization, rAF)
  - Vite bundle optimization, React render optimization (re-render azaltma)

- [x] **Part 11 — Data-layer arxitekturası** → `frontend-architect-part11.md`
  - TanStack Query / SWR / Suspense: caching, dedup, optimistic update
  - Waterfall qaçınma, prefetch-on-hover, Vue state-management, AI-UI pattern-ləri

- [x] **Part 12 — Stack seçimi & capstone** → `frontend-architect-part12.md`
  - react-2026 stack: build tool (Vite/Turbopack), framework, routing, state,
    testing, React Compiler, AI inteqrasiyası
  - Yekun system-design məşqi: hamısını qərar çərçivəsi ilə birləşdirmək

## Ardıcıllıq

Part 1 bütün kursun "düşüncə çərçivəsi"dir — sonrakı hər part-da qərarlar bu
çərçivəyə (Problem→Options→Trade-offs→Decision→Revisit) istinad edir. Pattern-lər
(Part 2–6) əvvəl gəlir, çünki rendering/performance/data qərarları (Part 7–12)
bu pattern lüğətinə söykənir. Terminologiya part-lar arası sabit saxlanılır
(məs. "hydration" Part 7-də təyin olunub Part 8–10-da eyni mənada işlədilir).
