
# Senior Frontend Handbook — Plan

**Məqsəd:** İstifadəçini "tapşırıq icra edən developer"dən "texniki qərar verən
senior frontend developer"ə çevirmək. Süni sadələşdirmə yox, hər mövzu real
müsahibə və production insident səviyyəsində dərinliklə izah olunur. Dil:
Azərbaycan dili (kod və texniki terminlər orijinal formada saxlanılır).

**Struktur (hər hissə üçün məcburi):**
1. Başlıq + niyə senior səviyyəsində vacibdir
2. Konsepsiyalar — ilk prinsiplərdən (mexanizm, sadəcə davranış yox)
3. Praktiki nümunələr (edge-case daxil, fenced code block)
4. Senior-level tələlər (pitfalls)
5. Trade-off / dizayn sualları (2-4)
6. Mock müsahibə sual-cavabları
7. Mənbələr (WebSearch/WebFetch ilə tapılan, linklə)

**Qeyd:** Hər hissə statusu tamamlandıqda bu fayldakı checkbox işarələnəcək.

## Hissələr

- [ ] **Part 1 — Layihə, Domen və Onboarding** → `senior-frontend-handbook-part1.md`
  - İlk 90 gün: repo strukturu, deployment, CI/CD, branch strategy, release
    prosesi, feature flag, logging, monitoring, rollback, .env/secrets idarəsi
  - Full-stack axını başa düşmək: Frontend → API Gateway → Auth Service →
    Redis → JWT → Database → Response zənciri
  - Biznesi başa düşmək: "niyə" sualını soruşmaq (performans şikayəti nümunəsi)

- [ ] **Part 2 — Architecture** → `senior-frontend-handbook-part2.md`
  - Feature-Based Architecture, Clean Architecture, DDD (ümumi anlayış),
    Vertical Slice, Layered Architecture, Hexagonal Architecture,
    Dependency Inversion, Composition over Inheritance
  - senior-architect qərar çərçivəsini (Problem→Options→Trade-offs→Decision→
    Revisit trigger) tətbiq et

- [x] **Part 3 — React Rendering Internals** → `senior-frontend-handbook-part3.md`
  - Render Pipeline, Fiber, Scheduler, Reconciliation, Concurrent Rendering,
    Suspense, Streaming, Selective Hydration, Partial Rendering,
    Server Components, Client Components, Server Actions, Cache,
    Memoization, Transitions

- [x] **Part 4 — Performance** → `senior-frontend-handbook-part4.md`
  - Web Vitals (LCP, INP, CLS, TTFB), Hydration cost, Re-render profiling,
    React DevTools Profiler, Chrome Performance panel, Bundle Analysis,
    Tree Shaking, Dynamic Import, Code Splitting, Memory Leak

- [ ] **Part 5 — Browser Internals** → `senior-frontend-handbook-part5.md`
  - Rendering Pipeline (Layout/Paint/Composite), GPU Acceleration,
    Event Loop, Task Queue, Microtask Queue, Render-blocking resources,
    DOM, CSSOM, Reflow, Repaint, Stack, Heap, Garbage Collection

- [ ] **Part 6 — JavaScript Deep Dive** → `senior-frontend-handbook-part6.md`
  - Closure, Execution Context, Lexical Scope, Prototype, `this`,
    Event Loop (dil səviyyəsində), Generators, Iterators, WeakMap, WeakSet,
    Property Descriptors, Proxy, Reflect, Memory model, V8 optimization,
    Hidden Classes, Inline Cache

- [ ] **Part 7 — TypeScript Deep Dive** → `senior-frontend-handbook-part7.md`
  - Generics, Conditional Types, Mapped Types, `infer`, Utility Types,
    Variance, Declaration Merging, Module Resolution, Type Narrowing,
    Branded Types

- [ ] **Part 8 — Frontend System Design** → `senior-frontend-handbook-part8.md`
  - Dashboard dizaynı, Chat sistemi, Notification sistemi, Permission sistemi,
    Dynamic Form Builder, CMS, Widget sistemi, Plugin sistemi, White Label,
    Theme sistemi, Localization, Offline-first, Caching, Pagination,
    Virtualization, Realtime — hər biri senior-architect sistem dizaynı
    checklist-i (Scale/Consistency/State/Failure/Coupling/Boundaries/
    Observability/Security/Cost) ilə

- [x] **Part 9 — DevOps üçün Frontend Baxışı** → `senior-frontend-handbook-part9.md`
  - Docker, NGINX, Reverse Proxy, Load Balancer, CDN, Cache, HTTP/2, HTTP/3,
    TLS, DNS, Compression (Brotli, Gzip)

- [ ] **Part 10 — API Layer** → `senior-frontend-handbook-part10.md`
  - REST, GraphQL, gRPC, SSE, WebSocket, Polling, Long Polling, Retry,
    Backoff, Idempotency, Optimistic Update, Conflict Resolution

- [ ] **Part 11 — Security** → `senior-frontend-handbook-part11.md`
  - XSS, CSRF, CSP, Clickjacking, JWT, Cookie, OAuth, OIDC,
    Refresh Token Rotation, Rate Limiting, CORS, SRI

- [x] **Part 12 — Testing** → `senior-frontend-handbook-part12.md`
  - Unit, Integration, E2E, Visual Regression, Contract Testing, Mock Server

- [x] **Part 13 — Texniki Liderlik** → `senior-frontend-handbook-part13.md`
  - Code Review, RFC yazmaq, Technical Proposal, Mentoring, Planning,
    Estimation, Risk Analysis, Stakeholder Communication,
    Architecture Decision Record (ADR), Trade-off analizi

- [x] **Part 14 — Biznes Düşüncəsi** → `senior-frontend-handbook-part14.md`
  - Kod yazmaqdan problem həllinə keçid; "niyə" zənciri (network? image? API?
    database? bundle? cache? CDN?); biznes tələbini texniki qərara çevirmək

## Ardıcıllıq

Hissələr paralel tədqiq olunub yazılır (mövzular arasında sıx asılılıq yoxdur),
lakin terminologiya part1–14 arasında uyğun saxlanılır (məs. "hydration"
termini part3 və part4-də eyni mənada işlədilir).
