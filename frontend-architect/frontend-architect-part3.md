# Frontend Architect — Part 3: JavaScript Design Patterns II (Davranış & Data Axını)

> Bu, "Frontend Architect" seriyasının 3-cü hissəsidir (bax:
> `courses/frontend-architect.plan.md`). Part 2-də (`frontend-architect-part2.md`)
> struktur pattern-lərinə (Module, Singleton, Factory, Prototype, Mixin)
> baxdıq. Burada **davranış və data axını** pattern-ləri: **Observer, Mediator,
> Command, Proxy, Flyweight, Provider**. Bu pattern-lər modern frontend
> reaktivliyinin, state idarəsinin və event sistemlərinin *kökləridir* — React
> Context, Vue reactivity, Redux, event bus hamısı buradakı ideyaların
> tətbiqidir. Qərar çərçivəsi Part 1-dəki kimi: Problem → Options → Trade-offs
> → Decision → Revisit. Mənbə: patterns.dev / PatternsDev/skills (`observer`,
> `mediator`, `command`, `proxy`, `flyweight`, `provider`).

---

## 1. Niyə bu pattern-lər frontend-in "gizli infrastrukturu"dur

### 1.1 Niyə vacibdir

Part 2-dəki pattern-lər sual verirdi "obyekti necə quraq?". Bu part sual verir
"obyektlər bir-biri ilə **necə danışsın**, state **necə axsın**?". Frontend-in
əksər çətinliyi məhz burdadır: bir yerdə dəyişiklik olur, başqa on yerin xəbər
tutması lazımdır — amma hər şeyi hər şeyə bağlasan (tight coupling), sistem
saxlanılmaz olur.

Architect üçün əsas: **React Context = Provider pattern, Vue reactivity/MobX =
Proxy pattern, Redux/event bus = Observer + Command, middleware = Mediator.**
Bu pattern-ləri tanıyanda framework "sehr" olmaqdan çıxıb izah oluna bilən
mühəndislik qərarına çevrilir.

### 1.2 Bir cümlə ilə hər biri

- **Observer** — "state dəyişdi, abunə olanlara xəbər ver" (pub/sub).
- **Mediator** — "hamı bir-biri ilə yox, mərkəzdən danışsın".
- **Command** — "əməliyyatı obyekt kimi qablaşdır" (undo/redo, queue).
- **Proxy** — "obyektə girişi tut və nəzarət et".
- **Flyweight** — "eyni datanı paylaş, yaddaşa qənaət et".
- **Provider** — "prop drilling-siz datanı aşağıya çatdır" (React Context).

---

## 2. Observer Pattern — pub/sub decoupling

### 2.1 Konsepsiya

Observer bir obyektə (**observable / subject**) çoxlu obyektin (**observer**)
abunə olub, hadisə/state dəyişikliyində xəbər almasını təmin edir — decoupled
publish/subscribe. Observable üç şey saxlayır: observer siyahısı, `subscribe`,
`unsubscribe`, `notify`:

```js
class Observable {
  constructor() { this.observers = []; }
  subscribe(func) { this.observers.push(func); }
  unsubscribe(func) {
    this.observers = this.observers.filter(o => o !== func);
  }
  notify(data) { this.observers.forEach(o => o(data)); }
}
```

### 2.2 Architect qərarı

- **İstifadə et:** tətbiqin çox hissəsini bir state/hadisə haqda xəbərdar etmək;
  event-driven, asinxron kommunikasiya (məs. data yükləmə bitdi → bir neçə
  komponent reaksiya versin).
- **İstifadə etmə:** çox subscriber-də notify performansı kritik olanda; sadə
  bir-bir (one-to-one) kommunikasiya birbaşa callback ilə daha aydındır; implicit
  event zəncirlərinin debug mürəkkəbliyi decoupling faydasını üstələyəndə.

**Trade-off:** üstünlük — separation of concerns, loose coupling, runtime
subscribe/unsubscribe asanlığı. Çatışmazlıq — çox subscriber-də performans düşür;
implicit event zəncirləri debug-u çətinləşdirir ("bu niyə çağırıldı?").

> **Niyə vacibdir:** Observer RxJS, EventEmitter, DOM `addEventListener`,
> Redux subscribe — hamısının əsasıdır. Reaktiv frontend-in təməl mental
> modelidir.

---

## 3. Mediator Pattern — mərkəzi kommunikasiya

### 3.1 Konsepsiya

Mediator komponentlərin bir-biri ilə **birbaşa** yox, mərkəzi nöqtə vasitəsilə
danışmasını təmin edir: "bir-biri ilə danışmaq əvəzinə, mediator sorğuları alır
və ötürür". Analogiya: hava limanında pilotlar bir-biri ilə yox, dispetçerlə
danışır.

```js
class ChatRoom {                 // mediator
  logMessage(user, message) {
    console.log(`[${user.getName()}]: ${message}`);
  }
}
class User {
  constructor(name, chatroom) { this.name = name; this.chatroom = chatroom; }
  send(message) { this.chatroom.logMessage(this, message); } // birbaşa yox
}
```

Frontend-də ən tanış nümunə **Express.js middleware** zənciridir — hər
middleware `req`-i işləyib `next()`-i çağırır:

```js
app.use("/",
  (req, res, next) => { req.headers["test-header"] = 1234; next(); },
  (req, res, next) => { console.log(!!req.headers["test-header"]); next(); }
);
```

### 3.2 Architect qərarı

- **İstifadə et:** çoxlu obyekt danışmalıdır və birbaşa əlaqələr many-to-many
  xaos yaradır; middleware / request-response zənciri.
- **İstifadə etmə:** iki komponent arasında birbaşa əlaqə daha sadədirsə;
  mediator "god object"ə çevrilmə riski varsa; Observer/pub-sub kifayət qədər
  decoupling verirsə.

> **Ümumi səhv:** Mediator-u hər şeyin keçdiyi tək nöqtəyə çevirmək — nəticədə
> saxlanılması mümkünsüz "tanrı obyekt". Mediator-un "Revisit trigger"i onun
> məsuliyyətlərinin sayı çox artdığı andır.

---

## 4. Command Pattern — əməliyyatı obyekt kimi qablaşdır

### 4.1 Konsepsiya

Command pattern əməliyyatı **çağıran** obyekti onu **icra edən**dən decouple
edir. Metodu birbaşa manager-də çağırmaq əvəzinə, hərəkəti ayrıca command obyekti
kimi qablaşdırıb tək interfeys (`execute`) ilə icra edirsən:

```js
// birbaşa: manager.placeOrder("Pad Thai", "1234");
class OrderManager {
  execute(command, ...args) { return command.execute(this.orders, ...args); }
}
class Command {
  constructor(execute) { this.execute = execute; }
}
```

### 4.2 Architect qərarı

- **İstifadə et:** çağıranı icraçıdan ayırmaq lazımdır; command-lərin öz ömrü
  olmalı, ya da növbəyə (queue) qoyulub müəyyən vaxtda icra olunmalıdır;
  **undo/redo** və ya əməliyyat log-u lazımdır. (Redux action-ları bu pattern-in
  ruhundadır; text editor undo stack-i klassik nümunədir.)
- **İstifadə etmə:** undo/redo/queue olmayan sadə bir-dəfəlik əməliyyatlar;
  birbaşa funksiya çağırışı niyyəti aydın göstərirsə; az əməliyyatlı sistemdə
  command infrastrukturu over-engineering-dir.

**Trade-off:** üstünlük — command ömrü üzərində nəzarət, metod adı dəyişəndə
kaskad dəyişikliyin qarşısını alan decoupling, queue/scheduling dəstəyi.
Çatışmazlıq — çox vaxt lazımsız boilerplate; tipik JS layihəsində məhdud real
istifadə; artıq abstraksiya sadə həlli gizlədir.

---

## 5. Proxy Pattern — obyektə girişi tut

### 5.1 Konsepsiya

Proxy hədəf obyektlə qarşılıqlı əlaqəni tutan və nəzarət edən vasitəçi obyekt
verir: "hədəflə birbaşa yox, Proxy ilə işləyirik". JS-in doğma `Proxy`-si
**trap** metodları olan handler ilə yaradılır — əsas trap-lar `get` və `set`.
`Reflect` obyekti handler daxilində manipulyasiyanı sadələşdirir:

```js
const personProxy = new Proxy(person, {
  get: (obj, prop) => { console.log(`${prop} = ${obj[prop]}`); return obj[prop]; },
  set: (obj, prop, value) => {
    if (prop === "age" && typeof value !== "number") {
      console.log("age yalnız rəqəm ola bilər."); return true;
    }
    obj[prop] = value; return true;
  },
});
```

### 5.2 Architect qərarı

- **İstifadə et:** property girişində validation, formatlaşdırma, bildiriş,
  debugging; get/set-i tutub nəzarət etmək; data bütövlüyü.
- **İstifadə etmə:** performans-kritik yollarda (overhead var); sadə
  getter/setter və ya `Object.defineProperty` kifayət edəndə; nadir işlədilən
  obyektlərdə.

**Trade-off:** çox güclü davranış nəzarəti — amma "Proxy-ni həddindən artıq
işlətmək, ya da hər handler çağırışında ağır əməliyyat etmək tətbiqin
performansına asanlıqla mənfi təsir edir".

> **Niyə vacibdir:** **Vue 3 reaktivliyi və MobX məhz Proxy üzərində qurulub** —
> `state.count++` yazanda arxada `set` trap işə düşür və asılı komponentlər
> yenilənir. "Sehr"in altında bu pattern var.

---

## 6. Flyweight Pattern — eyni datanı paylaş

### 6.1 Konsepsiya

Flyweight ümumi datanı çoxlu oxşar obyekt arasında paylaşaraq yaddaşa qənaət
edir. **Intrinsic (paylaşılan) state**-i **extrinsic (unikal) state**-dən ayır;
paylaşılan instansiyaları `Map`-də cache edib təkrar-istifadə et:

```js
const books = new Map();
const createBook = (title, author, isbn) => {
  if (books.has(isbn)) return books.get(isbn);  // artıq varsa təkrar-istifadə
  const book = new Book(title, author, isbn);
  books.set(isbn, book);
  return book;
};
```

Kitabxana nümunəsi: hər nüsxə üçün yeni `Book` yox — hər unikal ISBN üçün **bir**
`Book`, extrinsic data (availability, sales) ayrı saxlanır. 3 fərqli kitabın 5
nüsxəsi = cəmi 3 `Book` instansiyası.

### 6.2 Architect qərarı

- **İstifadə et:** yaddaşı riskə salan böyük sayda oxşar obyekt; obyektlər ciddi
  intrinsic property paylaşırsa.
- **İstifadə etmə:** az obyekt / yaddaş problem deyilsə; obyektlərin paylaşılan
  property-si yoxdursa (mürəkkəblik fayda vermir); lookup overhead-i yaddaş
  qənaətini üstələyəndə.

**Trade-off:** state ayrımı və cache idarəsi mürəkkəblik gətirir; "müasir bol
RAM-lı hardware çox vaxt bu optimizasiyanı lazımsız edir". Frontend-də konseptual
qohumu: virtual list / windowing (Part 9) — minlərlə sətir üçün yalnız görünənləri
render etmək.

---

## 7. Provider Pattern — prop drilling-i aradan qaldır

### 7.1 Konsepsiya

Provider — datanı aralıq komponentlərdən əl ilə ötürmədən (prop drilling)
istehlakçılara çatdıran React yanaşmasıdır. React Context API üzərində qurulur:
`createContext` → `Provider value=...` → `useContext`:

```jsx
const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => setTheme(t => (t === "light" ? "dark" : "light"));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// custom hook — səhv istifadəni erkən tut
function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme yalnız ThemeProvider içində işləyir");
  return ctx;
}
```

### 7.2 Architect qərarı

- **İstifadə et:** çoxlu iç-içə komponent eyni dataya ehtiyac duyur (tema, auth,
  lokalizasiya); prop drilling bir neçə qatda idarəolunmaz olub; kitabxana üçün
  təkrar-istifadəli provider.
- **İstifadə etmə / diqqət:** **tez-tez dəyişən** və çoxlu istehlakçısı olan
  state-də — çünki state hər dəyişəndə **bütün istehlakçılar re-render olur**,
  performans düşə bilər.

**Trade-off:** üstünlük — prop drilling-i aradan qaldırır, data axınını aydın
edir, qlobal state-i asanlaşdırır. Çatışmazlıq — bütün istehlakçılar hər
dəyişiklikdə re-render olur (bottleneck); state-in həddən artıq mərkəzləşməsinə
təşviq edir. **Həll:** context-ləri concern-ə görə böl (məs. `ThemeContext` və
`AuthContext` ayrı) ki, lazımsız re-render azalsın.

> **Niyə vacibdir:** Provider bu kursun körpüsüdür — Part 4-də komponent
> kompozisiyasına, Part 11-də isə "server state (TanStack Query) vs client state
> (Context)" ayrımına bağlanır. Context-in re-render problemi məhz Part 10-da
> (runtime performansı) həll olunur.

---

## 8. Yekun müqayisə — architect cədvəli

| Pattern | Nə üçün | Frontend qarşılığı | Xəbərdarlıq |
|---|---|---|---|
| **Observer** | State dəyişikliyi yayımı | RxJS, EventEmitter, Redux subscribe | Çox subscriber → performans, debug |
| **Mediator** | Mərkəzi kommunikasiya | Express middleware, event bus | "God object" riski |
| **Command** | Əməliyyatı qablaşdırmaq | Redux action, undo stack | Boilerplate; çox vaxt artıq |
| **Proxy** | Girişi tutmaq | Vue 3 reactivity, MobX | Performans overhead |
| **Flyweight** | Yaddaş paylaşımı | Virtual list, obyekt cache | Müasir RAM-da çox vaxt lazımsız |
| **Provider** | Prop drilling həlli | React Context | Hamı re-render; context böl |

---

## Məşq

Kiçik bir "tema + dil" seçici təsəvvür et. İki yanaşma yaz:

1. **Observer** ilə: adi `Observable` qur, komponentlər `subscribe` etsin, tema
   dəyişəndə `notify` çağırılsın.
2. **Provider** ilə: `ThemeContext` + `useTheme` custom hook.

Sonra Part 1 qərar çərçivəsində müqayisə et:
- Hansı re-render davranışı verir?
- React tətbiqində hansını, hansı constraint-ə görə seçərdin?
- "Tez-tez dəyişən state" halında qərar necə dəyişir?

---

## Xülasə

- Bu pattern-lər frontend-in **gizli infrastrukturu**dur: Context = Provider,
  Vue/MobX = Proxy, Redux/event bus = Observer + Command, middleware = Mediator.
- **Observer** — pub/sub decoupling; reaktiv frontend-in təməli, amma implicit
  zəncir debug-u çətinləşdirir.
- **Mediator** — mərkəzi kommunikasiya; "god object"ə çevrilməkdən qoru.
- **Command** — əməliyyatı obyekt kimi; undo/redo/queue üçün, əks halda
  boilerplate.
- **Proxy** — girişi tut; Vue 3 reaktivliyinin əsası, amma performans overhead-i.
- **Flyweight** — yaddaş paylaşımı; müasir RAM-da çox vaxt lazımsız, konsept
  virtual list-də yaşayır.
- **Provider** — prop drilling həlli; hər dəyişiklikdə hamı re-render → context-i
  concern-ə görə böl.

---

## Mənbələr

- [patterns.dev — Observer](https://www.patterns.dev/vanilla/observer-pattern),
  [Mediator](https://www.patterns.dev/vanilla/mediator-pattern),
  [Command](https://www.patterns.dev/vanilla/command-pattern),
  [Proxy](https://www.patterns.dev/vanilla/proxy-pattern),
  [Flyweight](https://www.patterns.dev/vanilla/flyweight-pattern),
  [Provider](https://www.patterns.dev/react/provider-pattern)
- [PatternsDev/skills](https://github.com/PatternsDev/skills)
- Növbəti hissə: **Part 4 — React komponent kompozisiyası & API dizaynı**
  (`frontend-architect-part4.md`) — Hooks, HOC, Render Props, Compound,
  Presentational/Container.
