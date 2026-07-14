# Frontend Architect — Part 5: Modern Kompozisiya (2025/2026)

> Bu, "Frontend Architect" seriyasının 5-ci hissəsidir (bax:
> `courses/frontend-architect.plan.md`). Part 4-də (`frontend-architect-part4.md`)
> klassik React kompozisiya pattern-lərinə (Hooks, HOC, Render Props, Compound,
> Presentational/Container) baxdıq. Burada onların **2025/2026 sintezini** — bir
> baş prinsip ("**composition over configuration**") ətrafında 10 modern
> pattern: boolean-prop → kompozisiya, compound + context, explicit variant,
> children > render props, state-i UI-dən ayırmaq, state-i provider-ə qaldırmaq,
> polymorphic `as`, React 19 native `ref`, slot pattern, headless komponentlər.
> Bunlar professional komponent kitabxanalarının (Radix, shadcn/ui, Ark)
> API üslubudur. Qərar çərçivəsi Part 1-dəki kimi. Mənbə: patterns.dev /
> PatternsDev/skills (`react-composition-2026`).

---

## 1. Baş prinsip: composition over configuration

### 1.1 Niyə vacibdir

Komponent böyüdükcə iki yol var: **konfiqurasiya** (daha çox prop əlavə et) və ya
**kompozisiya** (daha kiçik hissələrə böl). Zəif dizayn hər yeni tələbdə prop
əlavə edir; nəticədə `<Card showHeader showFooter collapsible bordered
variant="..." />` kimi "prop çorbası" yaranır. Architect üçün əsas fərq: **prop
partlayışı vəziyyət partlayışıdır**.

Riyaziyyat sadədir: 4 boolean prop = 2⁴ = **16 mümkün vəziyyət**, hamısını test
etmək mümkün deyil, əksəri mənasızdır (`showHeader=false` + `collapsible=true`?).
Kompozisiya bu partlayışı aradan qaldırır — istifadəçi yalnız lazım olan hissəni
yığır.

> **Niyə vacibdir:** Bu part-ın 10 pattern-i eyni fikrin təzahürləridir:
> **rigid API + boolean sprawl → kiçik, yığıla bilən vahidlər**. Test asanlaşır,
> genişlənmə asanlaşır, API özü sənədləşir.

---

## 2. Boolean prop-ları kompozisiya ilə əvəz et

**Problem:** boolean prop-lar mürəkkəbliyi eksponensial artırır (4 boolean = 16
test olunmamış vəziyyət).

**Həll:** şərtli budaqlar əvəzinə kiçik, fokuslu alt-komponentlər yığ.

```jsx
// Əvəz:
<Card showHeader showFooter collapsible bordered />
// Bununla:
<Card>
  <Card.Header />
  <Card.Body />
  <Card.Footer />
</Card>
```

**Nə vaxt:** komponentə "bunu göstər/gizlət" boolean-ları yığılmağa başlayanda.

---

## 3. Compound komponentlər + Context

**Problem:** komponent mürəkkəbləşdikcə valideyn→uşaq prop drilling idarəolunmaz
olur.

**Həll:** sibling komponentlərin istehlak etdiyi context provider — prop
threading olmadan implicit state.

```jsx
<Select value={color} onChange={setColor}>
  <Select.Trigger />
  <Select.Options>
    <Select.Option value="red" />
  </Select.Options>
</Select>
```

**Nə vaxt:** əlaqəli hissələr paylaşılan state ilə koordinasiya edir (Part 4,
bölmə 5-in modern forması).

---

## 4. Explicit variant komponentlər

**Problem:** bir komponentdə rejim toggle-ları (video vs audio vs image)
mümkünsüz vəziyyətlərə və işlədilməyən prop-lara gətirir.

**Həll:** hər variant üçün ayrı, məqsədyönlü komponent.

```jsx
// Əvəz: <MediaDisplay type="video" ... />
<VideoPlayer src="..." />
<AudioPlayer src="..." />
<Image src="..." />
```

**Nə vaxt:** bir komponent `type`/`mode` prop-una görə tamam fərqli davranır və
prop-lar variantlar arası uyğun gəlmir.

> **Ümumi səhv:** "hamısını bir universal komponentdə birləşdirim" cazibəsi. Üç
> ayrı komponent üç dəfə sadədir — hər biri yalnız öz prop-larını qəbul edir,
> mümkünsüz vəziyyət yaranmır.

---

## 5. Children > Render Props

**Problem:** render prop-lar (`renderHeader`, `renderRow`) sözçüdür və
kompozisiyadan az kəşf-oluna-biləndir.

**Həll:** children qəbul edən adlı alt-komponentlərə üstünlük ver.

```jsx
// Əvəz: <DataTable renderHeader={...} renderRow={...} />
<DataTable>
  <DataTable.Header />
  <DataTable.Body />
  <DataTable.Footer />
</DataTable>
```

**Nə vaxt:** demək olar həmişə — render prop yalnız həqiqətən dinamik "hər element
üçün funksiya" hallarında qalır (Part 4, headless).

---

## 6. State implementasiyasını UI-dən ayır

**Problem:** konkret state idarəsinə bağlı komponent implementasiya seçimini
kilidləyir.

**Həll:** state forması üçün generic interfeys təyin et; implementasiyanı (local
state, API, Redux) istehlakçını dəyişmədən dəyiş.

```jsx
// CounterContext eyni qalır; provider dəyişir:
<LocalCounterProvider>...</LocalCounterProvider>   // və ya
<ApiCounterProvider>...</ApiCounterProvider>
// İstehlakçı həmişə eyni: const { count, inc } = useCounter();
```

**Nə vaxt:** eyni UI-nin arxasında fərqli data mənbəyi ola bilər (test üçün mock,
prod üçün API) — Part 1 "boundaries / explicit contract" prinsipi.

---

## 7. State-i Provider komponentə qaldır

**Problem:** paylaşılan state-ə ehtiyacı olan sibling-lər valideyn səviyyəsində
threading tələb edir.

**Həll:** paylaşılan state-i xüsusi provider-ə köçür; sibling-lər ona birbaşa
context ilə çatır.

```jsx
<SelectionProvider>
  <Sidebar />   {/* useSelection() */}
  <Detail />    {/* useSelection() — valideyn prop ötürmür */}
</SelectionProvider>
```

**Nə vaxt:** iki və artıq sibling eyni state-ə ehtiyac duyur və ortaq valideyn
sadəcə ötürücü rolunu oynayır.

---

## 8. Polymorphic `as` prop

**Problem:** bir komponent fərqli alt element və ya custom komponentə uyğunlaşa
bilmir.

**Həll:** `as` prop qəbul et — stil və davranışı saxlayaraq istənilən element /
komponent render et.

```jsx
<Box as="section" />
<Box as={Link} to="/home" />   // Box stili + Link davranışı
```

**Nə vaxt:** design-system primitivləri (Box, Text, Button) fərqli semantik
element və ya router link kimi render olunmalıdır.

> **Diqqət (TS):** polymorphic `as` düzgün tipləmə tələb edir (`as` seçiminə görə
> prop-lar dəyişir). Bu, TypeScript-də ən çətin generic hallardan biridir; hazır
> util tiplər (`PolymorphicComponentProps`) istifadə et.

---

## 9. React 19: native `ref` prop

**Problem:** sadə bir xüsusiyyət üçün `forwardRef` sarğısı boilerplate əlavə edir.

**Həll:** React 19 `ref`-i adi prop kimi ötürür — `forwardRef`-i sil.

```jsx
// Köhnə (React ≤18):
const Input = forwardRef((props, ref) => <input ref={ref} {...props} />);
// React 19:
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}
```

**Nə vaxt:** React 19+ layihələrində həmişə; köhnə kodda `forwardRef` hələ
işləyir (backward compatible).

---

## 10. Slot pattern (layout komponentləri üçün)

**Problem:** layout komponentlərinə render props olmadan çoxlu content sahəsi
lazımdır.

**Həll:** uşaq alt-komponentləri aşkarla və layout daxilində adlı slot-lara
yönlət.

```jsx
<AppLayout>
  <AppLayout.Header />   {/* avtomatik header slot-una düşür */}
  <Dashboard />          {/* content slot-una */}
</AppLayout>
```

**Nə vaxt:** sabit strukturlu, amma dəyişən məzmunlu layout (header/sidebar/
content/footer sahələri).

---

## 11. Headless komponentlər

**Problem:** tam-stilləşdirilmiş kitabxanalar dizaynı kilidləyir; davranış və UI
ayrılmazdır.

**Həll:** davranışı (state, klaviatura idarəsi, ARIA) hook ilə ver; istehlakçı
bütün render-ə nəzarət etsin.

```jsx
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = () => setOn((v) => !v);
  const buttonProps = { "aria-pressed": on, onClick: toggle };
  return { on, toggle, buttonProps };
}
// İstehlakçı öz düyməsini istədiyi kimi render edir:
const { on, buttonProps } = useToggle();
<button {...buttonProps}>{on ? "On" : "Off"}</button>;
```

**Nə vaxt:** design system-in üstündə tam stil nəzarəti lazımdır (davranış +
əlçatanlıq hazır, görünüş sənin). **Radix Primitives, Headless UI, TanStack
Table** məhz budur.

> **Niyə vacibdir:** Headless "davranış / görünüş ayrımı"nın zirvəsidir — Part 4
> render props + Part 6 Vue renderless komponentləri ilə eyni fəlsəfə. Modern
> komponent kitabxanası dizaynının əsas trendidir.

---

## 12. Architect qərarı — hansı pattern nə vaxt

Bu 10 pattern rəqib deyil, bir alət qutusudur. Qərar üçün üç sual:

1. **Prop-lar çoxalırmı?** → kompozisiya (2), variant (4), children (5).
2. **State harada yaşayır və kim paylaşır?** → compound+context (3), provider (7),
   state-UI ayrımı (6).
3. **Görünüşə nə qədər nəzarət lazımdır?** → polymorphic `as` (8), slot (10),
   headless (11).

**Anti-pattern (Part 1 dilində):** "gələcəkdə lazım olar" deyə hər komponentə
`as`, headless, context yığmaq. Kompozisiya da over-engineer edilə bilər — sadə
komponent sadə qalsın; pattern yalnız real prop/state partlayışı görünəndə
tətbiq olunur. Revisit trigger: prop sayı 5-i keçdi, ya da eyni komponentin 3-cü
"rejimi" gəldi.

---

## Məşq

Part 4-də qurduğun `<Tabs>` komponentini götür və modernləşdir:

1. Boolean prop-lar (`vertical`, `bordered`) varsa — kompozisiya və ya variant
   ilə əvəz et (2, 4).
2. `<Tabs.Tab as={Link}>` işləsin deyə polymorphic `as` əlavə et (8).
3. Bütün stil/render-i istifadəçiyə buraxan **headless** `useTabs()` versiyası
   yaz (11); sonra onun üstündə stilləşmiş `<Tabs>` qur.
4. Part 1 çərçivəsində: hər dəyişikliyin hansı problemi (prop partlayışı? stil
   kilidi?) həll etdiyini bir cümlə ilə yaz.

---

## Xülasə

- Baş prinsip: **composition over configuration** — boolean/prop partlayışını
  kiçik yığıla bilən vahidlərlə əvəz et.
- **Boolean → kompozisiya**, **explicit variant**, **children > render props** —
  API-ni sadə və test-oluna-bilən saxlayır.
- **Compound+context**, **provider-ə qaldırma**, **state-UI ayrımı** — state-in
  harada yaşadığını və contract-ı idarə edir.
- **Polymorphic `as`**, **slot**, **headless** — görünüşə nəzarəti istehlakçıya
  verir (design system, Radix/Headless UI üslubu).
- **React 19 native `ref`** — `forwardRef` boilerplate-ini silir.
- Pattern məqsəd deyil: yalnız real prop/state partlayışı görünəndə tətbiq et.

---

## Mənbələr

- [patterns.dev — React](https://www.patterns.dev/react/) və
  [PatternsDev/skills — react-composition-2026](https://github.com/PatternsDev/skills/tree/main/react/react-composition-2026)
- [React 19 — `ref` as a prop](https://react.dev/blog/2024/12/05/react-19)
- Headless kitabxanalar: [Radix Primitives](https://www.radix-ui.com/primitives),
  [Headless UI](https://headlessui.com/), [TanStack Table](https://tanstack.com/table)
- Növbəti hissə: **Part 6 — Vue kompozisiya paralleli**
  (`frontend-architect-part6.md`) — Composables, `<script setup>`, provide/inject,
  renderless, dynamic/async components.
