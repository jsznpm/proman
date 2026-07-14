# Frontend Architect — Part 11: Data-Layer Arxitekturası

> Bu, "Frontend Architect" seriyasının 11-ci hissəsidir (bax:
> `courses/frontend-architect.plan.md`). İndiyə qədər struktur (Part 2–6),
> rendering (Part 7–8) və performans (Part 9–10) klasterlərini gördük. İndi
> **data**: server-dən data-nı necə gətir, cache-lə, sinxronlaşdır — TanStack
> Query / SWR / Suspense, caching, optimistic update, waterfall qaçınma; həmçinin
> AI-UI (streaming, chatbot) pattern-ləri. Əsas ayrım: **server state ≠ client
> state** (Part 3-dəki Provider və Part 6-dakı Pinia bura bağlanır). Qərar
> çərçivəsi Part 1-dəki kimi. Mənbə: patterns.dev / PatternsDev/skills
> (`react-data-fetching`, `ai-ui-patterns`) + Vue `state-management` (Part 6).

---

## 1. Əsas ayrım: server state vs client state

### 1.1 Niyə vacibdir

Frontend developer-lərin ən böyük data səhvi: **server state-i client state kimi
idarə etmək** (məs. API cavabını `useState`-ə/Redux-a qoyub əl ilə yeniləmək).
Bunlar iki fərqli heyvandır:

- **Client state** — yalnız brauzerdə yaşayır, sənə məxsusdur, həqiqətin mənbəyi
  sənsən: tema, modal açıq/qapalı, form input. → Context/Zustand/Pinia (Part 3,
  6).
- **Server state** — həqiqətin mənbəyi **serverdir**; sən yalnız kopyasını
  saxlayırsan. Köhnəlir (stale), digər istifadəçilər dəyişir, sinxronlaşma
  lazımdır: user profili, məhsul siyahısı, mesajlar. → **TanStack Query / SWR**.

Architect qərarı (Part 1 "state / source of truth"): əvvəl soruş "bu data-nın
həqiqət mənbəyi haradadır?". Cavab "server"-dirsə, `useEffect + fetch + useState`
əl işi əvəzinə server-state kitabxanası işlət — o, cache, dedup, retry,
background refresh-i pulsuz verir.

---

## 2. React data fetching — 11 pattern

İki ən yayılmış problem: **sequential waterfall** (paralel ola bilən ardıcıl
fetch) və **dublikat fetch**. Ən böyük təsir paralelləşdirmə + düzgün cache-dən
gəlir.

### 2.1 Waterfall-ı öldür

- **Müstəqil fetch-ləri paralelləşdir** — `Promise.all()` ilə eyni anda; "React
  app-lərində ən çox rast gəlinən performans problemi request waterfall-dır."
  2–10x yaxşılaşma.
- **`await`-i dəyər lazım olana qədər təxirə sal** — promise-ləri dərhal başlat,
  amma yalnız nəticəni oxuyanda `await` et (paralel icra saxlanır).
- **Komponent ağacında waterfall-dan qaç** — fetch-i uşaq komponentlərə
  yuvalamaq əvəzinə **sabit səviyyədə** et; ardıcıl yükləmə zəncirinin qarşısını
  alır.

```jsx
// Pis (waterfall): user gəlir → sonra posts
// Yaxşı (paralel):
const [user, posts] = await Promise.all([fetchUser(id), fetchPosts(id)]);
```

### 2.2 TanStack Query — client-side cache

Raw `useEffect + fetch`-i əvəz et — avtomatik dedup, stale-while-revalidate cache,
retry, background refresh:

```jsx
// app-i QueryClientProvider ilə sar
function useProduct(id) {
  return useQuery({ queryKey: ["product", id], queryFn: () => fetchProduct(id) });
}
const { data, isLoading, error } = useProduct(42);
```

- **Suspense ilə deklarativ loading:** əl ilə `isLoading` bayrağı yerine
  `useSuspenseQuery()` + `<Suspense>` (Part 8 ilə eyni sərhəd mexanizmi).
- **Naviqasiyadan əvvəl prefetch:** link hover/focus-da `queryClient.prefetchQuery()`
  → keçiddə loading ekranı yox (Part 9 prefetch-in data qarşılığı).

### 2.3 Mutasiya və optimistic update

**Optimistic update** — proqnozlaşdırıla bilən mutasiya (like, ad dəyişmə) üçün
UI-ni dərhal yenilə, server-i arxa planda razılaşdır:

```jsx
useMutation({
  mutationFn: likePost,
  onMutate: async (id) => {           // dərhal UI-də göstər
    await queryClient.cancelQueries({ queryKey: ["post", id] });
    const prev = queryClient.getQueryData(["post", id]);
    queryClient.setQueryData(["post", id], (p) => ({ ...p, liked: true }));
    return { prev };                  // rollback üçün
  },
  onError: (_e, id, ctx) => queryClient.setQueryData(["post", id], ctx.prev),
  onSettled: (_d, _e, id) => queryClient.invalidateQueries({ queryKey: ["post", id] }),
});
```

### 2.4 Digər pattern-lər

- **`React.cache()`** — Server Component-lərdə async funksiyanı sar; eyni çağırış
  render dövründə bir dəfə icra olunsun (server-side dedup; Part 8 RSC ilə).
- **Qlobal event listener-i dedup et** — `useSyncExternalStore` ilə tək listener
  (resize, scroll, online) çoxlu komponent arası paylaş.
- **Passive event listener** — scroll/touch handler-ə `{ passive: true }`
  (compositor thread-i bloklamasın; Part 10 jank).
- **Client storage-ı schema-versiyala** — localStorage/sessionStorage data-sına
  versiya nömrəsi + fallback (köhnə schema crash-ının qarşısı).

> **Niyə vacibdir:** TanStack Query (və ya SWR) frontend-in "gizli backend"idir —
> cache, sync, invalidation. Bunu manual yazmaq minlərlə sətir bug-lu kod
> deməkdir. Architect qərarı: server state → hazır kitabxana, təkəri yenidən
> ixtira etmə.

---

## 3. Vue tərəfi — state-management (qısa təkrar)

Part 6-da gördük: Vue-da server state üçün TanStack Query-nin Vue adapteri
(`@tanstack/vue-query`) və ya Pinia + composable var; sadə client state üçün
`reactive()` store, böyük üçün **Pinia**. Eyni ayrım qalır: **server state
(kitabxana ilə cache) vs client state (store)**. Prinsip framework-agnostikdir
(Part 6 dərsi).

---

## 4. AI-UI pattern-ləri — data axınının yeni forması

### 4.1 Niyə ayrı bölmə

AI xüsusiyyətləri (chatbot, assistant, autocomplete) data-nın yeni axın formasını
gətirir: cavab **birdən** yox, **token-token stream** gəlir. Bu, klassik
request/response-dan fərqli UI pattern-ləri tələb edir.

### 4.2 Pattern-lər

- **Streaming response** — LLM-dən real-time token çatdırma; OpenAI API-də
  `stream: true` cavabı chunk ardıcıllığı kimi göndərir. Vercel AI SDK `useChat`
  hook və ya manual `fetch` + `ReadableStream`.
- **Prompt & conversation state** — mesaj tarixçəsi `{ role: 'user' | 'assistant'
  | 'system', content }` formatında; system prompt-la başla, növbələşən user/
  assistant. `useChat` bunu avtomatlaşdırır.
- **Input debouncing** — davamlı AI (autocomplete, real-time validation) üçün API
  çağırışını ~500ms debounce; stream aktivkən təkrar submit-i blokla.
- **Error handling & resilience** — server çağırışını try/catch; xətanı inline
  system mesaj kimi göstər; "Try again" retry; client-side validation (boş input).
- **Komponent arxitekturası** — prezentasiya (`ChatMessage`, `InputBox`) data-fetch
  məntiqindən ayrı (Part 4 Presentational/Container).
- **Loading/thinking state** — stream zamanı vizual (blinking cursor, "AI is
  typing", `TypingIndicator`); mesaj konteynerini auto-scroll.
- **Backend security** — **API açarlarını serverdə saxla**; Next.js API route
  və ya ayrı backend ilə proxy et. **OpenAI credentials-ı client-ə heç vaxt
  açma** (Part 1 "secrets in a vault", "authN/authZ at every boundary").
- **Arxitektura çevikliyi** — Next.js route handler (az mürəkkəblik) vs Vite +
  Express (çox nəzarət); hər ikisi streaming dəstəkləyir, frontend pattern-lər
  eyni.

> **Ümumi səhv (təhlükəsizlik):** AI çağırışını birbaşa brauzerdən API açarı ilə
> etmək. Açar dərhal sızır. Həmişə server proxy — bu, arxitektura tələbidir, opsiya
> deyil.

---

## 5. Architect yekunu — data qərar ağacı

Data-layer qərarı iki sualdan başlayır:

1. **Həqiqətin mənbəyi haradadır?**
   - Brauzer (tema, UI vəziyyəti) → **client state** (Context/Zustand/Pinia).
   - Server (data, entity) → **server state** (TanStack Query/SWR).
2. **Data necə çatır?**
   - Klassik request/response → TanStack Query + Suspense + optimistic.
   - Real-time stream (AI, chat) → streaming pattern + Vercel AI SDK.

| Simptom | Həll |
|---|---|
| Ardıcıl yavaş fetch | `Promise.all` paralelləşdir |
| Eyni data təkrar fetch | TanStack Query dedup + cache |
| Keçiddə loading ekranı | hover-də prefetch |
| Mutasiya ləng hiss olunur | optimistic update (onMutate/onError) |
| Chat cavabı gec görünür | streaming (`stream: true`) |
| API açarı sızır | server proxy (heç vaxt client-də) |

**Anti-pattern (Part 1):** `useEffect + fetch + useState` ilə server state-i əl
ilə idarə etmək — cache, retry, dedup, invalidation-ı yenidən ixtira. Revisit
trigger: ikinci `useEffect + fetch` yazdığın an kitabxanaya keç.

---

## 6. Praktik nümunə — qərar çərçivəsi ilə

**Tələb:** sosial feed — postlar (server), like düyməsi, tema toggle (client),
AI "xülasə et" düyməsi.

- **Postlar:** server state, dəyişir → **TanStack Query** (`queryKey: ["feed"]`,
  stale-while-revalidate).
- **Like:** proqnozlaşdırıla bilən mutasiya → **optimistic update** (dərhal
  UI, server razılaşması).
- **Tema:** client state → Context (Part 3), TanStack Query-də yox.
- **AI xülasə:** LLM stream → **streaming pattern**, açar **server route**-da,
  "thinking" indikator.
- **Feed + user profili:** paralel → `Promise.all` (waterfall qaçın).

**Revisit trigger:** feed real-time olmalıdırsa (WebSocket push) → TanStack Query
+ subscription, ya da ayrı realtime layer.

---

## Məşq

Öz layihəndə (və ya feed nümunəsində) bütün data mənbələrini siyahıya al. Hər biri
üçün:

1. "Həqiqətin mənbəyi haradadır?" — client, yoxsa server state?
2. Server state üçün: TanStack Query key + stale strategiyası seç; bir mutasiyada
   optimistic update yaz.
3. Bir waterfall tap və `Promise.all` ilə paralelləşdir.
4. AI xüsusiyyəti varsa: açarın harada saxlandığını (server!) və streaming/thinking
   state-i dizayn et.
5. Part 1 ADR: hər qərarı Problem→Options→Trade-offs→Decision→Revisit ilə yaz.

---

## Xülasə

- Əsas ayrım: **server state** (mənbə server; TanStack Query/SWR — cache/dedup/
  sync) vs **client state** (mənbə brauzer; Context/Zustand/Pinia).
- Waterfall-ı öldür: müstəqil fetch-ləri **`Promise.all`** ilə paralelləşdir,
  fetch-i sabit səviyyədə et.
- **TanStack Query** — stale-while-revalidate cache, Suspense, hover-prefetch,
  **optimistic update** (onMutate/onError/onSettled).
- **AI-UI:** streaming (`stream: true`), conversation state, debounce, thinking
  indikator; **API açarı həmişə serverdə** (təhlükəsizlik tələbi).
- Prinsip framework-agnostik: Vue-da eyni ayrım (vue-query / Pinia).
- Anti-pattern: `useEffect + fetch + useState` ilə server state-i əl idarəsi.

---

## Mənbələr

- [PatternsDev/skills — react-data-fetching](https://github.com/PatternsDev/skills/tree/main/react/react-data-fetching),
  [ai-ui-patterns](https://github.com/PatternsDev/skills/tree/main/react/ai-ui-patterns)
- [TanStack Query](https://tanstack.com/query/latest), [SWR](https://swr.vercel.app/),
  [Vercel AI SDK](https://sdk.vercel.ai/)
- Növbəti hissə (yekun): **Part 12 — Stack seçimi & capstone**
  (`frontend-architect-part12.md`) — react-2026 stack, hər şeyi qərar çərçivəsi
  ilə birləşdirmək.
