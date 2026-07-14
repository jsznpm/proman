# Frontend Architect — Part 4: React Komponent Kompozisiyası & API Dizaynı

> Bu, "Frontend Architect" seriyasının 4-cü hissəsidir (bax:
> `courses/frontend-architect.plan.md`). Part 2–3-də ümumi JS pattern-lərinə
> baxdıq; burada onların React-dakı təzahürü — **stateful məntiqi necə təkrar
> istifadə etmək və komponent API-sini necə dizayn etmək**: Hooks, HOC, Render
> Props, Compound Components, Presentational/Container. Vurğu "sintaksis"də
> deyil, **API dizaynı qərarında**: hansı yanaşma hansı problemi həll edir,
> tarixən niyə dəyişib, bu gün nə seçilir. Part 5 modern kompozisiya
> (2025/2026) bunun üstünə qurulur. Qərar çərçivəsi Part 1-dəki kimi. Mənbə:
> patterns.dev / PatternsDev/skills (`hooks`, `hoc`, `render-props`, `compound`,
> `presentational-container`).

---

## 1. Əsas sual: stateful məntiqi necə paylaşaq

### 1.1 Niyə vacibdir

React komponentləri UI qaytarmaq asandır. Çətin olan **stateful məntiqi**
(data fetch, event listener, form vəziyyəti) çoxlu komponent arasında
təkrarlamadan paylaşmaqdır. React tarixi əslində bu bir problemin üç nəsil
həllidir:

1. **HOC** (component-i sarıyan funksiya) — köhnə nəsil.
2. **Render Props** (JSX qaytaran funksiya prop) — orta nəsil.
3. **Hooks** (React 16.8+) — modern nəsil, digər ikisini əvəz etdi.

Architect üçün əsas: bu üçü rəqib deyil, **eyni problemin təkamülü**dür. HOC və
render props-un yaratdığı "wrapper hell" (dərin sarınmış ağac) məhz Hooks-un
həll etdiyi problemdir. Köhnə pattern-ləri bilmək lazımdır, çünki köhnə kod
bazalarında və kitabxanalarda hələ yaşayır.

### 1.2 API dizaynı = architect işi

Komponent API-si (props, children, callback-lər) sənin *contract*-ındır (Part 1,
"boundaries"). Yaxşı API: istifadəsi asan, səhv istifadəsi çətin, dəyişməyə açıq.
Pis API: prop partlayışı, gizli asılılıq, hər yeni tələbdə sınan struktur. Bu
part həmin contract-ı qurmağın alətləridir.

---

## 2. Hooks Pattern — modern standart

### 2.1 Konsepsiya

Hooks (React 16.8) funksional komponentdə state və lifecycle idarəsini class
olmadan mümkün edir. **Custom hook** (`use` prefiksli) təkrar-istifadə olunan
məntiqi enkapsulyasiya edir — kodu komponentlər arası təkrarlamadan, sarğı
qatları yaratmadan:

```jsx
function useKeyPress(targetKey) {
  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    const down = (e) => e.key === targetKey && setPressed(true);
    const up = (e) => e.key === targetKey && setPressed(false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [targetKey]);
  return pressed;
}
```

Bu `useKeyPress`-i istənilən komponentdə təkrar yaza-yaza işlət.

### 2.2 Architect qərarı

- **İstifadə et:** funksional komponentə state əlavə etmək; paylaşılan davranışı
  çıxarmaq; class komponentləri əvəz etmək — bu, **defolt seçimdir**.
- **Trade-off / diqqət:** Rules of Hooks intizam tələb edir (yalnız top-level
  çağırış); `useEffect` öyrənmə əyrisi var; `useMemo`/`useCallback` səhv
  istifadəsi (Part 10-da performansda dərinləşir). Hər komponent eyni hook-u
  implement etsə, kod təkrarı riski qalır (HOC bunu bir yerdə mərkəzləşdirirdi).

> **Niyə vacibdir:** Hooks React arxitekturasını fundamental sadələşdirdi —
> "eyni stateful məntiqi komponentləri class-a çevirmədən paylaş". Bugünkü
> React-də məntiq paylaşımının cavabı demək olar həmişə custom hook-dur.

---

## 3. HOC Pattern — köhnə nəsil, hələ lazımlı

### 3.1 Konsepsiya

Higher-Order Component — komponent qəbul edib **əlavə məntiqlə gücləndirilmiş**
versiyasını qaytaran funksiya. Orijinalı dəyişmir, sarıyır; cross-cutting
concern-ləri (auth, styling, data fetch) tətbiq edir:

```jsx
function withLoader(Element, url) {
  return (props) => {
    const [data, setData] = useState(null);
    useEffect(() => {
      fetch(url).then((r) => r.json()).then(setData);
    }, [url]);
    return data ? <Element data={data} {...props} /> : <div>Loading...</div>;
  };
}

export default withLoader(DogImages, "https://dog.ceo/api/...");
```

### 3.2 Architect qərarı

- **İstifadə et:** eyni, **fərdiləşdirilməmiş** davranış çoxlu komponentə lazımdır;
  məntiq bir yerdə mərkəzləşməlidir.
- **İstifadə etmə:** Hooks eyni nəticəni daha oxunaqlı verir; modern React 18+
  kodunda hook idiomatikdir; HOC prop toqquşması yaradır və ya DevTools debug-u
  qaranlıqlaşdırır; davranış hər komponentdə fərdiləşmə tələb edir.

**Trade-off:** üstünlük — məntiqi bir yerdə mərkəzləşdirir, komponent
gücləndirmə olmadan da işləyir. Çatışmazlıq — dərin sarınmış ağac (**wrapper
hell**), prop adı toqquşması, çoxlu HOC-dan data axını izləmək çətinliyi, çox
boilerplate. React sənədi: "əksər hallarda Hooks kifayət edir və ağacda
nesting-i azaldır".

---

## 4. Render Props Pattern — açıq data axını

### 4.1 Konsepsiya

Render prop — komponentə ötürülən və JSX qaytaran funksiya prop-udur. Komponent
öz render məntiqini implement etmir, bu funksiyanı çağırır:

```jsx
function Input(props) {
  const [value, setValue] = useState("");
  return (
    <>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      {props.children(value)}  {/* children-as-function — daha təmiz forma */}
    </>
  );
}

<Input>
  {(value) => (
    <>
      <Kelvin value={value} />
      <Fahrenheit value={value} />
    </>
  )}
</Input>
```

### 4.2 Architect qərarı

- **İstifadə et:** fərqli render tələbləri olan komponentlər arasında stateful
  məntiq paylaşmaq; HOC-un ad toqquşması və nesting problemlərindən qaçmaq; data
  axınını **açıq və görünən** etmək (hansı datanın ötürüldüyü dəqiq görünür).
- **İstifadə etmə:** modern Hooks bunu adətən əvəz edir — eyni məntiq paylaşımını
  nesting olmadan verir; çoxlu render prop dərin, saxlanılması çətin JSX yaradır;
  render prop-a lifecycle metodu əlavə etmək olmur.

**Trade-off:** üstünlük — açıq data axını, asan təkrar-istifadə, stateful məntiqi
render-dən ayırır. Çatışmazlıq — "render props-un həll etdiyi problemlər əsasən
Hooks-la əvəzlənib"; çoxlu render prop idarəolunmaz olur.

> **Niyə vacibdir:** Render props "children-as-function" formasında bu gün də
> **headless komponentlərdə** (Part 5) yaşayır — məs. bir çox kitabxana state-i
> verib render-i sənə buraxır.

---

## 5. Compound Components — koordinasiya edən komponent qrupu

### 5.1 Konsepsiya

Compound pattern əlaqəli komponentlərin (tabs, dropdown, menu) **implicit
paylaşılan state** ilə koordinasiya etməsini təmin edir — prop drilling olmadan.
Uşaq komponentlər valideynə **static property** kimi bağlanır, intuitiv API
yaranır. İki yol var; modern yol Context-dir:

```jsx
const FlyOutContext = createContext();

function FlyOut({ children }) {
  const [open, toggle] = useState(false);
  return (
    <FlyOutContext.Provider value={{ open, toggle }}>
      {children}
    </FlyOutContext.Provider>
  );
}
function Toggle() {
  const { open, toggle } = useContext(FlyOutContext);
  return <div onClick={() => toggle(!open)}><Icon /></div>;
}
function List({ children }) {
  const { open } = useContext(FlyOutContext);
  return open && <ul>{children}</ul>;
}
FlyOut.Toggle = Toggle;   // static property → intuitiv API
FlyOut.List = List;
```

İstifadə: `<FlyOut><FlyOut.Toggle /><FlyOut.List>...</FlyOut.List></FlyOut>`.

Alternativ `React.Children.map` + `cloneElement` yolu state-i prop kimi ötürür,
amma **yalnız birbaşa uşaqlar** paylaşılan prop-a çatır.

### 5.2 Architect qərarı

- **İstifadə et:** koordinasiya tələb edən əlaqəli komponent qrupu; daxili
  state-i gizlədən təmiz API; intuitiv kompozisiyalı komponent kitabxanası.
- **İstifadə etmə:** alt-komponentlər mənalı state paylaşmayanda (artıq
  overhead); adi prop kifayət edən sadə tək-komponent hallar; implicit state
  paylaşımı davranışı qaranlıqlaşdıranda.

**Trade-off:** üstünlük — daxili state istehlakçıdan gizli, tək import bütün
uşaqları verir, deklarativ sintaksis. Çatışmazlıq — `Children.map` nesting-i
məhdudlaşdırır (yalnız birbaşa uşaqlar); `cloneElement`-də shallow prop merge ad
toqquşması yarada bilər; Context yolu sadə hallarda overhead.

> **Niyə vacibdir:** Compound pattern professional komponent kitabxanalarının
> (Radix, Reach UI, shadcn/ui) əsas API üslubudur. Part 5-də "headless + slot"
> ilə birləşir.

---

## 6. Presentational / Container — necə vs nə ayrımı

### 6.1 Konsepsiya

Bu pattern komponentləri iki rola bölür:

- **Presentational** — datanın istifadəçiyə **necə** göründüyünə baxır; props
  ilə data alır, dəyişmədən render edir.
- **Container** — **nə** data göstərildiyinə baxır; data fetch və state idarəsi.

Business məntiqi UI render-dən ayrılır (separation of concerns).

**Hooks bunu necə dəyişdi:** əvvəl state-i vermək üçün container komponent
lazım idi; indi custom hook eyni ayrımı daha az boilerplate ilə verir:

```jsx
function useDogImages() {                   // "container" məntiqi hook-da
  const [dogs, setDogs] = useState([]);
  useEffect(() => {
    fetch("https://dog.ceo/api/breed/labrador/images/random/6")
      .then((r) => r.json())
      .then(({ message }) => setDogs(message));
  }, []);
  return dogs;
}
// Presentational komponent sadəcə hook-u çağırıb data-nı render edir.
```

### 6.2 Architect qərarı

- **İstifadə et:** data-fetch məntiqi ilə UI render-i arasında aydın ayrım;
  təkrar-istifadəli, asan test olunan presentational komponentlər; dizaynerlərin
  UI-ni məntiqdən asılı olmadan dəyişməsi.
- **İstifadə etmə:** kiçik komponentlərdə artıq overhead; Hooks data məntiqini
  onsuz da enkapsulyasiya edirsə; təkrar-istifadə potensialı olmayan bir-dəfəlik
  komponent.

**Trade-off:** ayrım təkrar-istifadə və test verir, amma "Hooks eyni nəticəni bu
pattern olmadan verir" — modern React-də çox vaxt sadəcə custom hook + komponent
kifayətdir.

---

## 7. Yekun — təkamül və seçim

| Pattern | Nəsil | Bu gün nə vaxt |
|---|---|---|
| **HOC** | Köhnə | Legacy kod; nadir cross-cutting hallar |
| **Render Props** | Orta | Headless "children-as-function"; əksərən Hooks əvəz edir |
| **Hooks** | Modern | **Məntiq paylaşımının defolt yolu** |
| **Compound** | Aktual | Komponent kitabxanası API-si (tabs, menu, dialog) |
| **Presentational/Container** | Köhnəlmiş forma | Konsept qalır; icra artıq hook + komponent |

**Architect qaydası:** yeni məntiq paylaşımı → **custom hook**. Yeni komponent
API-si (əlaqəli hissələr) → **compound**. HOC/render props → yalnız legacy və ya
spesifik hal. Part 5 bunun modern (2025/2026) davamıdır.

---

## Məşq

Bir `<Tabs>` komponenti dizayn et: `<Tabs>`, `<Tabs.List>`, `<Tabs.Tab>`,
`<Tabs.Panel>`. Aktiv tab state-i paylaşılmalıdır.

1. Onu **compound + Context** ilə qur (bölmə 5).
2. Tab dəyişmə məntiqini (`useTabs`) **custom hook**a çıxar (bölmə 2, 6).
3. Part 1 qərar çərçivəsində izah et: niyə burada HOC və ya render props
   seçmədin? API contract-ının hansı hissəsi istifadəçi üçün "səhv istifadəsi
   çətin" olur?

---

## Xülasə

- React tarixi bir problemin üç nəslidir: **HOC → Render Props → Hooks**;
  sonuncu "wrapper hell"i həll etdi.
- **Hooks** — məntiq paylaşımının modern defolt yolu; custom hook ilə enkapsulyasiya.
- **HOC** — mərkəzləşmiş cross-cutting concern, amma wrapper hell + prop toqquşması.
- **Render Props** — açıq data axını; bu gün headless "children-as-function"da
  yaşayır.
- **Compound** — koordinasiya edən komponent qrupu; kitabxana API-lərinin üslubu.
- **Presentational/Container** — necə/nə ayrımı; Hooks onu sadələşdirdi.
- API dizaynı = contract dizaynı: asan istifadə, çətin səhv istifadə, dəyişməyə
  açıq.

---

## Mənbələr

- [patterns.dev — Hooks](https://www.patterns.dev/react/hooks-pattern),
  [HOC](https://www.patterns.dev/react/hoc-pattern),
  [Render Props](https://www.patterns.dev/react/render-props-pattern),
  [Compound](https://www.patterns.dev/react/compound-pattern),
  [Container/Presentational](https://www.patterns.dev/react/presentational-container-pattern)
- [PatternsDev/skills](https://github.com/PatternsDev/skills)
- Növbəti hissə: **Part 5 — Modern kompozisiya (2025/2026)**
  (`frontend-architect-part5.md`) — boolean-prop → composition, headless, slot,
  polymorphic `as`, React 19 native `ref`.
