# Senior Frontend Handbook — Part 3: React Rendering Internals

> Bu, "Senior Frontend Handbook" seriyasının 3-cü hissəsidir (bax:
> `courses/senior-frontend-handbook.plan.md`). Mövzu: React-ı API səviyyəsində,
> "necə işlədiyini" bilmək — nə "işləyir" (mid-level), nə "niyə belə işləyir və
> nə vaxt sınır" (senior-level). Kod nümunələri React 19.x və Next.js 16.x
> (App Router, Cache Components) səviyyəsindədir; köhnə (React 17/18,
> Next.js ≤15 experimental PPR) davranış da fərqi göstərmək üçün qeyd olunur,
> çünki müsahibələrdə hələ də soruşulur. Terminologiya Part 4 (Performance) və
> Part 5 (Browser Internals) ilə uyğun saxlanılacaq (məs. "hydration",
> "streaming" bu hissədə təyin olunan mənada işlədiləcək).

---

## 1. React Render Pipeline

### 1.1 Niyə vacibdir

Mid-level developer "component render olur, DOM yenilənir" deyir və bu kifayət
edir — nə vaxt işlər yaxşı gedirsə. Senior developer isə bilməlidir ki, React-da
"render" sözü **iki tamam ayrı fazanı** örtür: **render phase** (hesablama —
hansı dəyişikliklər lazımdır) və **commit phase** (təsir — DOM-a həqiqətən nə
yazılır). Bu ayrım olmadan bir çox real problem izah olunmur: niyə
`useEffect` içində DOM oxumaq bəzən köhnə dəyər qaytarır, niyə render phase-də
side-effect yazmaq (məs. `Math.random()`-u birbaşa JSX-də dəyişən saxlamadan
işlətmək) StrictMode-da iki dəfə çağırılanda bug yaradır, niyə "render oldu"
demək "ekranda göründü" demək deyil (Concurrent Rendering-də render phase
ləğv oluna bilər, commit olmaz).

Bu bilgi həm interview-da ("React niyə render-i iki fazaya bölür?"), həm də
production-da (memory leak, race condition, StrictMode double-invoke
qarışıqlığı) özünü göstərir.

### 1.2 Konsepsiya — ilk prinsiplərdən

React-ın render pipeline-ı üç mərhələdən keçir:

1. **Trigger** — render nə üçün başladı: ilkin mount, `setState`, parent
   re-render, context dəyişikliyi, ya da (React 18+) bir Transition.
2. **Render phase** — React component funksiyalarını çağırır, JSX-i
   "React element" ağacına çevirir, əvvəlki (`current`) fiber ağacı ilə
   müqayisə edərək (**reconciliation**, bax bölmə 4) "nə dəyişməlidir"
   siyahısını (effect list / side-effect flags) toplayır. **Bu fazada heç bir
   DOM dəyişikliyi olmur.** Fərz olunur ki, bu faza **saf (pure)**-dir —
   React onu dayandıra, ləğv edə, yenidən başlada bilər (Concurrent Rendering
   bunun üzərində qurulub). Ona görə render phase-də side-effect yazmaq
   (network sorğusu, mutasiya, `console.log` istisna olmaqla) qadağandır —
   React bunu iki dəfə çağıra bilər (StrictMode) və ya heç vaxt commit
   etməyə bilər (ləğv olunan render).
3. **Commit phase** — React hesabladığı dəyişiklikləri həqiqi DOM-a tətbiq
   edir (`mutation` sub-phase), sonra `useLayoutEffect`-ləri sinxron işlədir,
   brauzerə paint imkanı verir, sonra `useEffect`-ləri asinxron (növbəti
   task-da) işlədir. **Commit phase sinxrondur və dayandırıla bilməz** — bu
   qəsdən belədir, çünki DOM-u yarımçıq vəziyyətdə saxlamaq daha pisdir.

Niyə bu ayrım var? Çünki UI-ni cavabdehli saxlamaq üçün React-a "işi kəsib
sonra davam etmək" imkanı lazımdır — amma DOM-a yazılmış dəyişiklikləri geri
almaq mümkün deyil (və ya çox bahalıdır). Ona görə "kəsilə bilən" hissə
(render) və "kəsilə bilməyən" hissə (commit) ayrılır.

### 1.3 Praktiki nümunələr

**Əsas axın:**

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  // Render phase-in bir hissəsi: bu sətir hər render-də icra olunur.
  // Side-effect YOXDUR, sadəcə hesablama.
  const doubled = count * 2;

  useLayoutEffect(() => {
    // Commit phase, DOM yazılandan SONRA, paint-dən ƏVVƍL, sinxron.
  }, [count]);

  useEffect(() => {
    // Commit phase-dən sonra, paint-dən sonra, asinxron.
  }, [count]);

  return <button onClick={() => setCount(c => c + 1)}>{doubled}</button>;
}
```

**Edge-case — render phase-də side-effect yazmaq StrictMode-da niyə partlayır:**

```jsx
// ❌ Səhv: render phase saf olmalıdır
function Logger({ id }) {
  console.log('fetching', id);
  fetchAnalytics(id); // side-effect birbaşa render-də

  return <div>{id}</div>;
}
// Development-da StrictMode component funksiyasını QƏSDƍN İKİ DƏFƍ çağırır,
// məhz bu cür bugları erkən üzə çıxarmaq üçün. Production-da bu iki dəfə
// olmaya bilər, amma Concurrent Rendering render-i ləğv edib təkrar başlada
// bilər — nəticədə fetchAnalytics lazımsız və ya "yarımçıq" state üçün
// çağırılmış olur.
```

### 1.4 Senior-level tələlər

- **Render phase-də mutasiya**: xarici dəyişəni (module-level array, ref-siz
  closure dəyişəni) render zamanı dəyişdirmək — StrictMode-da iki dəfə
  işləyəndə say ikiqat artır, amma production-da normal görünür. Bug yalnız
  concurrent render ləğv olunanda üzə çıxır.
- **`useLayoutEffect` sui-istifadəsi**: `useLayoutEffect` commit phase-i
  sinxron blok edir — böyük DOM ölçmə/yazma orada olsa, hər commit-i
  ləngidir. Real ölçmə lazım deyilsə, `useEffect` kifayətdir.
- **"Render commit deyil" fərqini unutmaq**: developer `console.log`-u
  render-in içinə qoyub "neçə dəfə render oldu" sayır, amma Concurrent
  Rendering-də render sayı ilə commit sayı (deməli, "ekranda neçə dəfə
  göründü") eyni deyil — render ola bilər, sonra ləğv olsun, heç vaxt commit
  olmasın.
- **Effect cleanup sıralaması**: commit phase-də cleanup-lar əvvəlki ağacdan
  aşağıdan-yuxarı, yeni effect-lər yuxarıdan-aşağı işləyir — sıra ilə bağlı
  fərziyyə edib parent/child effect-lər arasında qarşılıqlı asılılıq
  yaratmaq race-lərə səbəb olur.

### 1.5 Trade-off / dizayn sualları

1. React niyə render phase-i "saf" olmağa məcbur edir, amma bunu compile-time
   deyil, convention + StrictMode double-invoke ilə tətbiq edir? Compile-time
   yoxlama (React Compiler) bunu necə dəyişir?
2. Sinxron commit phase performans üçün nə vaxt problem olur (məs. çox böyük
   siyahının DOM-a yazılması)? Alternativ nə ola bilər?
3. `useLayoutEffect` ilə `useEffect` arasında seçim edərkən hansı meyarları
   götürərsiniz — "DOM-u paint-dən əvvəl oxumaq/yazmaq lazımdır" testini necə
   tətbiq edərsiniz?

### 1.6 Mock müsahibə sual-cavabları

**S: React-da "render" sözü nə deməkdir — bu DOM-un yenilənməsi ilə eynidir?**
C: Xeyr. Render — component funksiyalarının çağırılıb yeni React element
ağacının hesablanması və köhnə ağacla müqayisəsidir (reconciliation); bu
DOM-a toxunmur. DOM-a yazma yalnız commit phase-də olur. Bir render heç vaxt
commit olunmadan ləğv edilə bilər (Concurrent Rendering-də).

**S: Niyə `useEffect` içində fetch etmək təhlükəsizdir, amma render-in
içində birbaşa fetch etmək yox?**
C: Render phase təkrarlana və ləğv oluna bilər (StrictMode, Concurrent
Rendering); side-effect-lər orada nəzarətsiz təkrarlanır. `useEffect` yalnız
commit-dən sonra, bir dəfə (dependency dəyişənədək) işləyir.

**S: `useLayoutEffect` performansa necə təsir edir?**
C: Commit phase-i sinxron blok edir — brauzer paint edə bilmir, effect
bitənədək. Böyük DOM oxuma/yazma orada olarsa, hiss olunan lag yaranır.

### 1.7 Mənbələr

- [React – Suspense reference](https://react.dev/reference/react/Suspense) (render/commit anlayışlarına dair ümumi kontekst)
- [acdlite/react-fiber-architecture](https://github.com/acdlite/react-fiber-architecture) — render/commit ayrımının arxitektura əsası
- [React Working Group — New Suspense SSR Architecture](https://github.com/reactwg/react-18/discussions/37)

---

## 2. Fiber

### 2.1 Niyə vacibdir

Mid-level developer "Virtual DOM" deyəndə adətən "React element ağacı"nı
nəzərdə tutur və kifayətlənir. Senior developer bilir ki, React 16-dan bəri
əsl daxili məlumat strukturu **Fiber**-dir — React element deyil. Bu fərqi
bilmək vacibdir, çünki: (1) müsahibədə "Virtual DOM necə işləyir?" sualı
əslində "Fiber necə işləyir?" sualıdır, (2) production debugging-də (React
DevTools Profiler-də "fiber" sözünü görəndə) bu quruluşu tanımaq lazımdır,
(3) Concurrent Rendering, Suspense, Scheduler — hamısı Fiber-in "pauza edilə
bilən iş vahidi" olması üzərində qurulub.

### 2.2 Konsepsiya — ilk prinsiplərdən

Fiber-dən əvvəl (React ≤15) render prosesi sadə, sinxron, rekursiv funksiya
çağırışı zənciri idi — JS call stack-in özü. Problem: call stack-i "pauza
edib sonra davam etmək" mümkün deyil (JS-in öz stack-i buna icazə vermir).
React komandası bunu həll etmək üçün stack-i **özləri** (userland-da)
yenidən tətbiq etdi — buna görə "Fiber" adı: "fiber" sözü "yüngül thread/
stack frame" mənasını verir. Hər component instansı üçün bir **Fiber node**
var — bu, JS obyektidir (funksiya çağırışı deyil), ona görə **pauza edilə,
yaddaşda saxlanıla, sonra davam etdirilə bilər**.

Hər fiber node saxlayır:
- `type`, `key` — hansı komponentdir, reconciliation-da uyğunlaşdırma üçün.
- `child`, `sibling`, `return` — ağacı linked list kimi bağlayır (aşağı,
  yan, yuxarı).
- `pendingProps` / `memoizedProps` — yeni gələn və əvvəlki props; fərq yoxdursa
  iş atlana bilər (bailout).
- `alternate` — **double buffering**: hər anda component-in ən çoxu iki
  fiber-i var — `current` (ekranda olan) və `workInProgress` (hesablanmaqda
  olan). Render tamamlanıb commit olunanda `workInProgress` `current` olur —
  köhnə ağac atılmır, saxlanılır, çünki növbəti render onu yenidən "alternate"
  kimi istifadə edəcək. Bu, hər render-də təzə ağac allokasiya etməkdən
  qat-qat sərfəlidir (GC təzyiqini azaldır).

**Vacib qeyd (əminlik dərəcəsi ilə):** klassik `acdlite/react-fiber-architecture`
sənədi (2016-2017-dən qalma) `pendingWorkPriority` və `expirationTime` kimi
sahələrdən bəhs edir — bunlar **köhnəlmişdir**. Müasir React (17+) bunun
əvəzinə **lanes model**-i işlədir (bax bölmə 3). Fiber-in özünün strukturu
(linked list, double buffering, work-in-progress) hələ də doğrudur, amma
prioritet sistemi tamam dəyişib. Bu fərqi bilməmək köhnə bloq yazılarından
oxuyub müsahibədə köhnə termin (`expirationTime`) işlətməyə səbəb olur.

### 2.3 Praktiki nümunələr

Fiber-i birbaşa kodda "görmək" mümkün deyil (daxili API-dır), amma onun
təsirini React DevTools-da müşahidə etmək olar:

```jsx
function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        // key olmasa, React fiber-ləri "type + sıra" ilə uyğunlaşdırır —
        // sıra dəyişəndə bütün alt-fiber-lər səhv uyğunlaşır (bax bölmə 4).
        <li key={item.id}>{item.label}</li>
      ))}
    </ul>
  );
}
```

**Edge-case — component "unmount + yenidən mount" niyə state-i itirir:**

```jsx
function Parent({ showA }) {
  // showA true/false arasında keçəndə əgər fərqli component TİPİ render
  // olunursa (A vs B), React onların fiber-lərini "alternate" kimi
  // saxlamır — köhnə fiber tam atılır, yenisi sıfırdan yaradılır. Ona görə
  // type dəyişəndə state itir, amma eyni type-in props-u dəyişəndə itmir.
  return showA ? <A key="x" /> : <B key="x" />; // key eyni olsa belə, TYPE fərqlidir
}
```

### 2.4 Senior-level tələlər

- **`key`-i "unikal ID" kimi yox, "eyni fiber-i tanımaq üçün işarə" kimi
  düşünməmək** — `key`-in dəyişməsi React-a "bu fərqli bir instansiyadır,
  köhnəsini atıb yenisini yarat" deyir (state, DOM node, ref sıfırlanır).
  Bu həm bug (siyahıda `index`-i key kimi işlətmək — sıralama dəyişəndə
  state "sürüşür"), həm də feature (`key`-i qəsdən dəyişərək component-i
  reset etmək, `<Suspense>`-lə birlikdə) kimi işlədilə bilər.
- **Fiber ağacının böyüklüyünü unutmaq**: hər DOM node üçün fiber node deyil
  — hər **React element instansiyası** üçün fiber var, bu component ağacının
  dərinliyi ilə birbaşa bağlıdır. Çox dərin component ağacları (məs.
  provider-lərin uzun zənciri) reconciliation-u ağırlaşdırır.
- **`current` və `workInProgress` fərqini closure-larda unutmaq**: `ref`
  vasitəsilə birbaşa fiber-ə bağlı obyektə istinad edib, render zamanı hələ
  commit olunmamış (`workInProgress`) dəyəri "hazır" kimi oxumaq səhv
  nəticələr verə bilər — buna görə ref-ə render zamanı (yalnız effect/event
  zamanı) yazmaq/oxumaq qaydası var.

### 2.5 Trade-off / dizayn sualları

1. React niyə JS call stack-inə etibar etməyib öz "stack"-ini (Fiber) yazdı?
   Bunun runtime overhead-i nədir, əvəzində nə qazanılır?
2. Double buffering (`current`/`workInProgress`) yaddaş istifadəsinə necə
   təsir edir — hər zaman iki ağac saxlamağın qiyməti nədir?
3. `key` dizaynı ilə component identity anlayışı arasında əlaqəni necə izah
   edərdiniz junior developer-ə — real production bug nümunəsi ilə?

### 2.6 Mock müsahibə sual-cavabları

**S: Fiber nədir, Virtual DOM elementindən fərqi nədir?**
C: React element — hər render-də təzədən yaradılan, dəyişməz (immutable),
sadə JS obyektidir (`{type, props}`). Fiber — component instansına bağlı,
render-lər arasında **saxlanılan**, mutable data structure-dur; render-in
"pauza edilə bilən vahidini" təmsil edir və linked list (child/sibling/
return) formasında ağac qurur.

**S: `key`-i list-də dəyişməyin nəticəsi nədir?**
C: React həmin fiber-i "fərqli instansiya" kimi görür — köhnə DOM node,
state, ref atılır, yeni fiber sıfırdan yaradılır (mount lifecycle-ı təkrar
işləyir).

**S: "Double buffering" React-da nəyə xidmət edir?**
C: `current` (ekranda olan) və `workInProgress` (hesablanan) ağaclarını ayrı
saxlamaqla, render zamanı istifadəçi hələ köhnə, tam işlək UI-ni görür;
yalnız yeni ağac tam hazır olanda "alternate" mübadiləsi ilə keçid olur.

### 2.7 Mənbələr

- [acdlite/react-fiber-architecture](https://github.com/acdlite/react-fiber-architecture) (fiber strukturu, double buffering — struktur hissəsi doğrudur, prioritet hissəsi köhnəlmişdir, WebFetch ilə yoxlanılıb)
- [dev.to — What is "Lane" in React?](https://dev.to/okmttdhr/what-is-lane-in-react-4np7) (fiber.lanes/childLanes əlaqəsi üçün)

---

## 3. Scheduler

### 3.1 Niyə vacibdir

Mid-level developer "React sürətlidir" deyir və bunun niyə belə olduğunu
sorğulamır. Senior developer bilir ki, React-ın ayrıca, kiçik bir
`scheduler` paketi var — bu, brauzerin öz task planlayıcısı (event loop) ilə
React-ın iş vahidlərini (fiber-lər) əlaqələndirir. Bu, "niyə mənim ağır
hesablamam input-u bloklayır" və "niyə `startTransition` bəzən köməyi
dəymirdi" suallarının kökündədir.

### 3.2 Konsepsiya — ilk prinsiplərdən

Brauzer main thread-i vahiddir — həm render, həm JS icrası, həm input
emalı orada olur. React-ın Concurrent Rendering imkanı vermək üçün "hansı
işi indi, hansı işi sonra etmək" qərarını verən bir mexanizmə ehtiyacı var —
bu, **Scheduler**-dır (`scheduler` npm paketi, React-ın reconciler-indən
ayrı, prinsipcə brauzer-agnostikdir).

Scheduler-in əsas ideyası: uzun iş vahidini kiçik "task"lara bölüb, hər
task-dan sonra brauzerə nəzarəti qaytarmaq ("yield etmək"), əgər daha
prioritetli iş (məs. istifadəçi klikləməsi) gəlibsə, onu əvvəl icra etmək.
Bunun üçün Scheduler 5 prioritet səviyyəsi və hər səviyyə üçün bir
**timeout** dəyəri işlədir (React-ın `scheduler/src/forks/Scheduler.js`
mənbə koduna görə, çarpaz yoxlanılıb):

| Prioritet | Timeout | Məna |
|---|---|---|
| `ImmediatePriority` | `-1` | dərhal, sinxrona yaxın (registrasiya anında "expired" sayılır) |
| `UserBlockingPriority` | `250ms` | istifadəçi hərəkəti (klik, input) |
| `NormalPriority` | `5000ms` | data fetch, defolt yeniləmələr |
| `LowPriority` | `10000ms` | analitika, az vacib yeniləmələr |
| `IdlePriority` | demək olar sonsuz (`maxSigned31BitInt`) | brauzer boşdursa icra olunsun |

Bu **timeout**, "expiration time"-dır — task nə qədər gözləyə bilər, elə
bir müddət keçəndən sonra Scheduler onu daha da gecikdirmir, məcburi icra
edir (aclıqdan qorunma — "starvation" olmasın deyə).

**Vacib fərqləndirmə (tez-tez qarışdırılır):** Scheduler-in bu 5 prioritet
səviyyəsi React-ın **reconciler**-də işlədilən **Lanes** modelindən
**ayrı** bir qatdır. Scheduler ümumi məqsədli "hansı callback-i nə vaxt
icra et" mexanizmidir (browser `MessageChannel`/`requestIdleCallback`-a
bənzər, amma öz implementasiyası ilə); Lanes isə React-ın öz daxilində
"hansı update hansı render-ə aiddir, hansıları birgə batch etmək olar"
sualına cavab verən bitmask sistemidir (bax bölmə 4-5). Reconciler
Scheduler-i çağırır, amma ikisi konseptual olaraq fərqli məsələləri həll
edir — bu fərqi bilməmək müsahibədə "Scheduler prioritetləri" ilə "Lanes"i
səhv sinonim kimi işlətməyə gətirir.

### 3.3 Praktiki nümunələr

Scheduler-in davranışını dolayı müşahidə etmək olar — ağır render zamanı
input-un bloklanıb-bloklanmaması:

```jsx
function App() {
  const [query, setQuery] = useState('');
  const [list, setList] = useState(bigList);

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value); // UserBlockingPriority-yə yaxın: input həmişə cavab verməlidir

    startTransition(() => {
      // Bu yeniləmə aşağı prioritetli "lane"ə düşür — Scheduler input
      // emalını (yuxarıdaki setQuery) bloklamadan, boş vaxtda icra edə bilər.
      setList(filterBigList(bigList, value));
    });
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      <ExpensiveList items={list} />
    </>
  );
}
```

**Edge-case — Scheduler-in yield etməsi ilə "vaxtında bitməmə" arasındaki
gərginlik:** əgər tək bir sinxron JS funksiyası (məs. tək bir böyük `for`
dövrəsi component render-i daxilində) 50ms-dən çox sürərsə, Scheduler ARA
VERƏ BİLMİR — çünki JS single-threaded-dir, yield yalnız funksiya
qayıdanda mümkündür. Deməli, "Concurrent Rendering hər ağır işi avtomatik
kəsir" fikri səhvdir — o, yalnız **fiber-lər arasında** (bir component-in
render-i bitəndən sonra digərinə keçmədən əvvəl) yield nöqtəsi yaradır, bir
component-in öz render funksiyası içində yox.

```jsx
function HeavyComponent() {
  // ❌ Bu tək render çağırışı 200ms sürərsə, Scheduler-in ARADA VERMƍK
  // İMKANI YOXDUR — yield yalnız fiber-lər arasında olur, funksiya
  // daxilində yox.
  let sum = 0;
  for (let i = 0; i < 1e9; i++) sum += i;
  return <div>{sum}</div>;
}
```

### 3.4 Senior-level tələlər

- **"Concurrent = multi-threaded" fərziyyəsi** — React Concurrent Rendering
  hələ də single-threaded-dir; o, işi "interruptible" edir, paralel etmir.
  Ağır sinxron hesablamanı Web Worker-ə köçürmək fərqli, tamamlayıcı
  həll yoludur.
- **Hər yerdə `startTransition` işlətmək** — aşağı prioritetli lane-ə
  saldığın update, əgər ekranda artıq görünən content-i "gizlədə" bilərsə,
  istifadəçi nəticəni gecikmiş görər (bax bölmə 6, Suspense-in
  `startTransition`-la əlaqəsi). Prioritet aşağı salmaq "sürətləndirmək"
  demək deyil — "vacib olmayan işi sonraya atmaq" deməkdir; UX baxımından
  düzgün yerdə işlədilməlidir.
- **Uzun task-ları bölmədən "Scheduler həll edər" gözləməsi** — real
  production-da uzun sinxron iş (böyük siyahı sort etmək, ağır parse) hələ
  də manual bölünməlidir (`scheduler` paketinin `unstable_scheduleCallback`
  low-level API-si, ya da sadəcə işi kiçik parçalara bölmək) — React bunu
  sehrlə həll etmir.

### 3.5 Trade-off / dizayn sualları

1. Scheduler-in timeout-based prioritet modeli (əvvəlcədən müəyyən beş
   səviyyə) ilə brauzerin öz `scheduler.postTask()` API-si (daha detallı
   prioritet, `user-blocking`/`user-visible`/`background`) arasında fərq
   nədir? React niyə öz Scheduler-ni saxlayır?
2. Ağır CPU-bound hesablamanı harada icra etmək daha düzgündür — Web
   Worker, yoxsa `startTransition` ilə aşağı prioritet? Qərar meyarınız
   nədir?
3. "Starvation" (aclıq) problemi Scheduler-də necə həll olunur (timeout
   mexanizmi) — bu, real-time tələb edən UI-lərdə (məs. animasiya) hansı
   riskləri yaradır?

### 3.6 Mock müsahibə sual-cavabları

**S: React Scheduler nədir, reconciler-dən fərqi nədir?**
C: Scheduler ayrıca, ümumi məqsədli bir paketdir — "hansı callback-i nə vaxt
icra et" sualına cavab verir, beş prioritet səviyyəsi və onlara uyğun
timeout-larla. Reconciler (Fiber alqoritmi) isə "nəyi render et, necə diff
et" sualına cavab verir. Reconciler öz işini Scheduler vasitəsilə
planlaşdırır, amma ikisi ayrı təbəqədir.

**S: `startTransition` render-i sürətləndirirmi?**
C: Xeyr, əksinə — onu **aşağı prioritetli** edir ki, daha vacib (input,
klik kimi) yeniləmələr onu kəsə bilsin. Nəticədə istifadəçi interfeysi
"daha responsive" hiss edir, amma transition-un öz nəticəsi faktiki olaraq
gec gələ bilər.

**S: Concurrent Rendering paralellik təmin edirmi?**
C: Yox. JavaScript single-threaded-dir; Concurrent Rendering işi
"interruptible" (kəsilə bilən) edir — paralel icra etmir. Əsl paralellik
üçün Web Worker və ya brauzerin öz thread-ləri lazımdır.

### 3.7 Mənbələr

- Scheduler prioritet/timeout dəyərləri: React mənbə kodu (`packages/scheduler/src/forks/Scheduler.js`, facebook/react GitHub repo-su, versiyalar arası sabit qalan dəyərlər) — axtarış nəticələri üzərindən çarpaz yoxlanılıb
- [dev.to — What is "Lane" in React?](https://dev.to/okmttdhr/what-is-lane-in-react-4np7) (Scheduler vs Lanes fərqini aydınlaşdırmaq üçün)
- [React – useTransition reference](https://react.dev/reference/react/useTransition)

---

## 4. Reconciliation

### 4.1 Niyə vacibdir

"Virtual DOM diff alqoritmi" ifadəsi müsahibələrdə ən çox səthi cavablandırılan
mövzudur. Mid-level developer "React köhnə və yeni ağacı müqayisə edir"
deyir. Senior developer bilməlidir ki, bu müqayisə **O(n³) ümumi ağac diff**
alqoritmi deyil — React qəsdən **heuristik, O(n)** alqoritm işlədir, iki
sadə fərziyyəyə əsaslanaraq. Bu fərziyyələri bilməmək, `key` ilə bağlı real
buglara və performans problemlərinə (lazımsız unmount/remount) gətirir.

### 4.2 Konsepsiya — ilk prinsiplərdən

Ümumi ağac fərqini (tree diff) optimal həll etmək riyazi olaraq
**O(n³)** mürəkkəblik tələb edir — n minlərlə node olan UI ağacı üçün
tamamilə yararsızdır. React bunun əvəzinə iki **heuristika** qəbul edir və
bununla O(n)-ə düşür:

1. **Fərqli tip = fərqli alt-ağac.** Əgər eyni yerdəki fiber-in `type`-ı
   dəyişibsə (məs. `<div>` → `<span>`, ya da `<ComponentA>` → `<ComponentB>`),
   React alt-ağacın necə fərqləndiyini araştırmır — köhnəni tam atır, yenini
   sıfırdan qurur (state, DOM node, effect-lər itir).
2. **`key` ilə işarələnmiş elementlər sabit qalır.** Siyahıda (array of
   children) hər elementin `key`-i onun "identity"-sini təyin edir. `key`
   yoxdursa, React sıra indeksini işlədir — bu, sıra dəyişəndə (əlavə,
   silmə, yerdəyişmə) səhv uyğunlaşdırmaya səbəb olur.

Reconciliation prosesi əməli olaraq: React `workInProgress` fiber-i qurarkən,
hər `child` üçün `current` ağacdakı uyğun fiber-i (eyni sıra + `key` + `type`)
tapır. Uyğunluq varsa, fiber-i **yenidən istifadə edir** (`memoizedProps`
yeniləyir, state saxlanır) — yoxdursa, yeni fiber yaradır (`placement`
effect flag-ı ilə) və köhnəni silmək üçün işarələyir (`deletion`).

### 4.3 Praktiki nümunələr

**Sıra dəyişəndə `key`-siz siyahının state-i "sürüşməsi":**

```jsx
// ❌ index key ilə real bug
function TodoList({ todos }) {
  return todos.map((todo, index) => (
    <TodoItem key={index} todo={todo} /> // sıra dəyişəndə (silmə/əlavə) state qarışır
  ));
}

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  // todos[2]-ni siləndə, əvvəlki todos[3] indi index=2 alır və
  // ƍVVƍLKİ todos[2]-nin `isEditing` state-ini "miras alır" —
  // çünki React eyni index-dəki fiber-i yenidən istifadə edir.
  return isEditing ? <Editor todo={todo} /> : <Row todo={todo} />;
}
```

```jsx
// ✅ Düzgün: sabit, unikal key
function TodoList({ todos }) {
  return todos.map(todo => <TodoItem key={todo.id} todo={todo} />);
}
```

**Edge-case — eyni yerdə şərtli fərqli component tipi render etmək
component-i "silir":**

```jsx
function Panel({ isEditing }) {
  // İkisi də vizual olaraq "input sahəsi" olsa belə, TİPLƍRİ fərqlidir —
  // isEditing dəyişəndə DomNode, state, hətta fokus tam sıfırlanır.
  return isEditing ? <textarea /> : <p>Static text</p>;
}
```

### 4.4 Senior-level tələlər

- **`key={Math.random()}` və ya `key={Date.now()}`** — hər render-də fərqli
  key yaratmaq React-a "bu HƏMİŞƍ yeni elementdir" deyir, nəticədə component
  heç vaxt state saxlamır, hər dəfə sıfırdan mount olunur (görünməz
  performans qatili).
- **List-in ortasına element əlavə edərkən `key`-in sabitliyinə arxayın
  olmamaq** — `key` unikal olsa da, əgər hər render-də `key` mənbəyi
  (məs. backend-dən gələn sıra nömrəsi) dəyişirsə, eyni problem yaranır.
- **Fərqli tip render edərkən state saxlamağı gözləmək** — developer-lər
  tez-tez `<Modal type="a" />` / `<Modal type="b" />` kimi şərti render
  edib, "modal-ın öz state-i (məs. scroll pozisiyası) saxlanacaq" gözləyir —
  saxlanmır, çünki tip fərqli fiber deməkdir (əgər əsl niyyət state
  saxlamaqdırsa, tək component + prop işlədilməlidir).

### 4.5 Trade-off / dizayn sualları

1. React niyə "düzgün" O(n³) diff alqoritmi əvəzinə heuristik O(n) seçib?
   Bu hansı sinif buglara "icazə verir" (fərz edilən trade-off)?
2. `key`-i backend ID-si əvəzinə frontend-də generasiya olunan (məs. UUID
   render zamanı) dəyər kimi işlətməyin riski nədir?
3. Component-in tipini şərtlə dəyişdirmək (`condition ? <A/> : <B/>`) ilə
   tək component-i prop-la parametrləşdirmək arasında seçim edərkən hansı
   meyarı götürərsiniz (state saxlanmalıdırmı?)

### 4.6 Mock müsahibə sual-cavabları

**S: React-ın diff alqoritmi nə üçün O(n) işləyir, ümumi ağac diff-i
O(n³) olduğu halda?**
C: React iki heuristikaya güvənir: fərqli tip = fərqli alt-ağac (dərinliyə
enmədən atır), və `key` ilə siyahı elementlərinin identity-sini əvvəlcədən
bilir. Bu, ümumi həlli deyil, praktiki, "adətən doğru olan" fərziyyəni
işlədir.

**S: Siyahıda `index`-i `key` kimi işlətmək nə vaxt təhlükəlidir?**
C: Siyahı sırası dəyişəndə (əlavə/silmə/yenidən sıralama) və hər elementin
öz daxili state-i (input value, açıq/bağlı status) olduqda — çünki React
index-ə görə fiber-i yenidən istifadə edir, state "səhv" elementə keçir.

**S: `<Modal type={variant} />` component-inin `variant` dəyişəndə state-i
saxlanılırmı?**
C: Bəli, əgər `Modal` HƍMİŞƍ eyni component tipidir və `variant` sadəcə
prop-dur. Amma `variant === 'a' ? <ModalA/> : <ModalB/>` kimi fərqli
component tipləri arasında keçidsə, state saxlanmır — fərqli fiber-lərdir.

### 4.7 Mənbələr

- [ag-grid — Inside Fiber: reconciliation algorithm](https://blog.ag-grid.com/inside-fiber-an-in-depth-overview-of-the-new-reconciliation-algorithm-in-react/)
- [acdlite/react-fiber-architecture](https://github.com/acdlite/react-fiber-architecture)
- [React – Suspense reference](https://react.dev/reference/react/Suspense) (key ilə boundary reset nümunəsi üçün)

---

## 5. Concurrent Rendering

### 5.1 Niyə vacibdir

React 18-in "Concurrent Features" adlandırdığı imkanlar tez-tez "avtomatik
sürətləndirmə" kimi başa düşülür — bu, səhvdir. Senior səviyyəsi bunu dəqiq
başa düşməkdir: Concurrent Rendering React-a render-i **başlamağa, yarımçıq
saxlamağa, atmağa, ya da yenidən başlamağa** icazə verən bir **imkan**dır —
avtomatik aktiv olmur, `startTransition`, `useDeferredValue`, Suspense kimi
API-lər vasitəsilə **açıq şəkildə** işə salınır. Bu fərqi bilməmək, "React
18-ə keçdik, niyə heç nə sürətlənmədi?" sualının cavabını buraxır.

### 5.2 Konsepsiya — ilk prinsiplərdən

React 17 və əvvəli — bütün render **sinxron** idi: bir render başlayanda, o
bitənədək (bütün ağac üçün) davam edirdi, kəsilmirdi ("blocking" model).
React 18, `createRoot` ilə **concurrent renderer**-i aktivləşdirir — bu,
render-in **kəsilə bilən (interruptible)** olmasını təmin edir. Praktiki
nəticə: React eyni anda **iki versiya** render edə bilər — biri hazırkı
ekranda (`current`), biri arxa planda hesablanan (yeni `workInProgress`,
bax bölmə 2) — və istifadəçi hərəkəti gələndə arxa plandakı işi kəsib
prioritetli işi əvvəl edə bilər.

Bunun texniki əsası **Lanes** modelidir (bölmə 2-də qeyd olunan
`expirationTime`-ın yerini tutan sistem): hər update bir və ya bir neçə
"lane"ə (32-bit bitmask-da bit mövqeyi) təyin olunur — `SyncLane` (ən
yüksək, dərhal), müxtəlif `TransitionLanes` (aşağı, batch-lənə bilən),
`OffscreenLane` (ən aşağı, görünməz content üçün). React eyni render dövrü
ərzində eyni lane-ə aid update-ləri **batch** edir, fərqli lane-lərə aid
işi ayrı render keçidlərində icra edir. Bitmask operatorları (`mergeLanes`,
`isSubsetOfLanes`) sayəsində bu prioritetləşdirmə hər update-i tək-tək
müqayisə etmədən, sürətli aparılır.

**Vacib tarixi fərq:** React 17-də `ReactDOM.render()` = sinxron mod, heç
bir concurrent xüsusiyyət yoxdur. React 18-də `ReactDOM.createRoot()`
concurrent renderer-i aktivləşdirir, amma bu, **avtomatik olaraq render-i
kəsmir** — sadəcə kəsilməyə **icazə verir**. Kəsilmə yalnız `startTransition`
kimi API-lər aşağı prioritetli update yaradanda baş verir.

### 5.3 Praktiki nümunələr

```jsx
import { createRoot } from 'react-dom/client';

// React 18+: concurrent renderer aktivdir (amma bu tək başına heç nə
// "kəsmir" — API-lər lazımdır)
createRoot(document.getElementById('root')).render(<App />);
```

```jsx
function Tabs() {
  const [tab, setTab] = useState('posts');
  const [isPending, startTransition] = useTransition();

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab); // aşağı prioritetli lane; kəsilə bilər
    });
  }

  return (
    <>
      <TabButton onClick={() => selectTab('posts')} />
      <TabButton onClick={() => selectTab('contact')} />
      {isPending && <Spinner />}
      {tab === 'posts' ? <PostsTab /> : <ContactTab />}
    </>
  );
}
```

**Edge-case — Concurrent Rendering "eyni komponenti iki dəfə render edir"
fərziyyəsinin yanlış tətbiqi:**

```jsx
// ❌ Səhv fərziyyə: "render iki dəfə çağırılır deyə, render-in içində
// sayğac artırmaq təhlükəsizdir çünki React özü tənzimləyəcək"
let renderCount = 0;
function Component() {
  renderCount++; // render ləğv oluna bilər — bu sayğac REAL commit sayını göstərmir
  return <div>{renderCount}</div>;
}
// Düzgün yol: useRef + useEffect ilə YALNIZ commit-dən sonra saymaq.
```

### 5.4 Senior-level tələlər

- **"Concurrent = paralel" səhvi** (təkrar vurğu, çünki ən çox rast gəlinən
  yanlış anlama): tək thread, kəsilə bilən iş — paralel icra yoxdur.
- **Render-i ləğv olunan güman edib, amma yenə də orada mutasiya etmək**:
  render zamanı `Map`/`Set` kimi kənar strukturlara yazmaq — render iki dəfə
  başlaya (biri ləğv, biri tamamlanan) bilər, kənar struktur "iki dəfə
  yazılmış" vəziyyətdə qalır.
- **`startTransition`-u bütün asinxron əməliyyatlar üçün "sehrli həll" kimi
  görmək**: `startTransition` yalnız **state update-in prioritetini**
  aşağı salır; şəbəkə sorğusunu sürətləndirmir, sorğunu "abort" etmir.
- **Eyni komponentin iki müxtəlif lane-də olan iki fərqli render nəticəsini
  qarışdırmaq**: aşağı prioritetli render arxa planda hesablanarkən, yüksək
  prioritetli render onu "keçəndə", köhnə closure-larla bağlı stale state
  görünə bilər (əgər `useTransition`-un `isPending` düzgün oxunmursa).

### 5.5 Trade-off / dizayn sualları

1. Concurrent Rendering-i tətbiq etmək (createRoot-a keçid) avtomatik
   risk daşımırmı? Hansı hallarda köhnə sinxron davranışa etibar edən kod
   (side-effect-li render funksiyaları) sınır?
2. Lanes modeli ilə əvvəlki `expirationTime` modeli arasındaki fərq nə üçün
   "batching" performansına təsir edir?
3. Hansı UI ssenarilərində Concurrent Rendering-in gətirdiyi
   "responsiveness" faydası, əlavə mürəkkəbliyə (stale closure riskləri,
   render-in iki dəfə çağırılma ehtimalı) dəyməz?

### 5.6 Mock müsahibə sual-cavabları

**S: React 18-ə keçmək tək başına performansı artırırmı?**
C: Xeyr. `createRoot` concurrent renderer-i **aktivləşdirir**, amma faktiki
fayda yalnız `startTransition`, `useDeferredValue`, Suspense kimi API-ləri
işlədəndə görünür. Sadəcə keçid heç nəyi "sürətləndirmir" — imkan yaradır.

**S: Concurrent Rendering render funksiyalarının saflığına (purity) niyə
əvvəlkindən daha çox həssasdır?**
C: Çünki render indi kəsilə, ləğv edilə, təkrar başladıla bilər. Render
zamanı kənar mutasiya (side-effect) yazan kod, əvvəllər (sinxron modeldə)
"bir dəfə, ardıcıl" işlədiyi üçün görünməz qala bilirdi; concurrent modeldə
bu fərziyyə pozulur.

**S: Lanes modeli nə üçün `expirationTime`-ı əvəz etdi?**
C: `expirationTime` tək bir rəqəm idi — prioritetləşdirmə və batch-ləmə
konsepsiyalarını qarışdırırdı. Lanes bitmask olduğu üçün bir neçə update-i
bir "batch" kimi (bit OR-la birləşdirərək) qrupda saxlamaq və sürətli
müqayisə etmək mümkün olur.

### 5.7 Mənbələr

- [React – useTransition reference](https://react.dev/reference/react/useTransition)
- [dev.to — What is "Lane" in React?](https://dev.to/okmttdhr/what-is-lane-in-react-4np7)
- [certificates.dev — React Concurrent Features: An Overview](https://certificates.dev/blog/react-concurrent-features-an-overview)

---

## 6. Suspense

### 6.1 Niyə vacibdir

Suspense çox vaxt "lazy loading üçün spinner göstərmə mexanizmi" kimi
öyrədilir — bu, doğru, amma çox məhdud bir tərifdir. Senior səviyyəsində
Suspense — React-ın **asinxronluğu declarative şəkildə idarə etmək** üçün
əsas primitividir: data fetching, kod bölünməsi, streaming SSR və Server
Components-in hamısı Suspense üzərində qurulub. Suspense-in **harada
yerləşdiyi** UX-i (nə vaxt, nə qədər content birlikdə "görünür") birbaşa
təyin edir — səhv yer seçimi ya lazımsız spinner "waterfall"-larına, ya da
lazımsız uzun gözləmələrə səbəb olur.

### 6.2 Konsepsiya — ilk prinsiplərdən

Suspense boundary-si "bu ağacın altında hər hansı bir şey hazır deyilsə,
fallback göstər" deyən sərhəddir. Bir component "suspend olur" o zaman ki,
render zamanı `use()` ilə oxunan bir Promise hələ həll olunmayıb (və ya
`lazy()` ilə yüklənən kod hələ gəlməyib). React bunu **atılan (throw)
Promise** kimi tutur — component "mən hələ hazır deyiləm" deyir, React ən
yaxın üst Suspense boundary-sinə qədər yuxarı çıxıb fallback-ı göstərir.

**Kritik detal, tez-tez qarışdırılır:** Suspense yalnız `use()` ilə oxunan
Promise-lərə, `lazy()`-ə, stilşitlərə (`precedence` ilə), streaming
SSR-ə reaksiya verir. `useEffect` içində `fetch` edib `setState` etmək
**Suspense-i aktivləşdirmir** — bu, ənənəvi "loading state" pattern-idir,
Suspense-dən tamam ayrıdır. Bu fərqi bilməmək "Suspense-ə köçdük, amma heç
nə dəyişmədi" şikayətinin əsas səbəbidir.

Nested boundary-lər **progressiv açılma (progressive reveal)** yaradır —
hər boundary öz sürəti ilə "hazır" olur, üst-boundary-lər aşağıdakılara
gözləmir. Amma tək bir boundary daxilində olan **bütün** komponentlər "bir
vahid" kimi işlənir — biri suspend olsa, hamısı gözləyir.

**Re-suspension (artıq göstərilmiş content-in yenidən suspend olması)**
üçün React-ın sənədləşdirilmiş qaydası: default olaraq (sinxron/urgent
update-lə) content yenidən suspend olsa, fallback **yenidən göstərilir**
— əvvəlki, artıq görünən content gizlədilir. Bu, `startTransition` (və ya
`useDeferredValue`) ilə edilən update-lərdə **olmur** — React köhnə
content-i saxlayır, arxa planda yeni versiyanı hazırlayır. Bundan başqa,
React sənədləşdirilmiş bir throttling qaydası tətbiq edir: **suspend
olmuş boundary-lərin "açılması" ən çox 300ms-də bir dəfə** baş verir —
yəni bir neçə nested boundary yaxın vaxtda hazır olarsa, React onları
tək-tək açmaq əvəzinə birlikdə açır (layout thrashing-i azaltmaq üçün).

### 6.3 Praktiki nümunələr

```jsx
function ProfilePage({ userId }) {
  return (
    <Suspense fallback={<BigSpinner />}>
      <ProfileDetails userId={userId} />
      <Suspense fallback={<AlbumsGlimmer />}>
        <ProfileAlbums userId={userId} />
      </Suspense>
    </Suspense>
  );
}

function ProfileAlbums({ userId }) {
  const albums = use(fetchAlbums(userId)); // Promise `use()` ilə oxunur → suspend edə bilər
  return <AlbumsList albums={albums} />;
}
```

**Edge-case 1 — Suspense fallback-ın "yanlış yerdə" olması (waterfall):**

```jsx
// ❌ Hər komponent öz boundary-sini alanda, onlar SIRA ilə (waterfall)
// yüklənir kimi görünə bilər əgər daxili fetch-lər bir-birindən asılıdırsa
function Dashboard() {
  return (
    <>
      <Suspense fallback={<S1 />}><Header /></Suspense>
      <Suspense fallback={<S2 />}><Sidebar /></Suspense>
      <Suspense fallback={<S3 />}><MainContent /></Suspense>
    </>
  );
  // Əgər bunlar vizual olaraq BİRGƍ görünməlidirsə, 3 ayrı spinner-in
  // müxtəlif vaxtlarda yox olması "sıçrayan" UI yaradır — tək boundary
  // daha yaxşı UX verə bilər.
}
```

**Edge-case 2 — `useEffect` + `fetch` Suspense-i işə salmır:**

```jsx
// ❌ Bu HEÇ VAXT Suspense fallback-ını göstərmir, çünki fetch effect
// daxilindədir, render zamanı `use()` ilə oxunmur.
function Widget() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  if (!data) return <Spinner />; // manual loading state, Suspense DEYİL
  return <div>{data.value}</div>;
}
```

**Edge-case 3 — Suspense-in state-i saxlamaması:**

```jsx
// React suspend olmuş, hələ ilk dəfə mount olmamış ağac üçün HEÇ BİR
// state saxlamır. Component hazır olanda, render SIFIRDAN başlayır —
// suspend olmadan əvvəl toplanmış hər hansı local state itir.
```

### 6.4 Senior-level tələlər

- **Suspense-i hər komponentin ətrafına qoymaq** — həddindən artıq
  granular boundary-lər çoxlu, uzlaşmayan spinner "sıçrayışı" yaradır.
- **`startTransition` olmadan naviqasiya/axtarış edib, hər dəfə köhnə
  content-in fallback ilə əvəzlənməsinə etibar etmək** — istifadəçi hər
  axtarışda ekranın "yanıb-sönməsini" görür.
- **`useEffect`-based fetch-i Suspense-ə "keçirdiyini" düşünmək, amma
  həqiqətdə `use()`/framework data layer-inə keçməmiş olmaq** — Suspense
  heç vaxt aktivləşmir, gözlənilən UX baş vermir.
- **300ms throttling-i bilmədən, "niyə mənim sürətli fallback-ım gec
  görünür" deyə debug etməyə vaxt itirmək** — bu, bug deyil, sənədləşmiş
  batching davranışıdır.
- **Naviqasiya zamanı Suspense boundary-sini `key` ilə sıfırlamağı
  unutmaq** — istifadəçi eyni route-un fərqli parametrlə (`userId`)
  yüklənməsində köhnə content-in "sürünərək" qalmasını gözləməyə bilər,
  amma `key` yoxdursa React onu "eyni instansiya" sayıb saxlayır.

### 6.5 Trade-off / dizayn sualları

1. Bir səhifədə neçə Suspense boundary-si olmalıdır — "hər fetch üçün bir"
   ilə "bütün səhifə üçün bir" arasında haradan qərar veririk?
2. `startTransition` ilə "köhnə content-i saxlamaq" seçimi hər zaman doğru
   UX-dirmi? Nə vaxt istifadəçiyə açıq şəkildə "yenilənir" göstərmək daha
   yaxşıdır?
3. Suspense-i test etmək (fallback-ın düzgün göstərilməsi, race condition-
   ların olmaması) üçün hansı strategiyaları seçərsiniz?

### 6.6 Mock müsahibə sual-cavabları

**S: Suspense-i nə aktivləşdirir, nə aktivləşdirmir?**
C: Aktivləşdirir: `use()` ilə oxunan həll olunmamış Promise, `lazy()`
component-in yüklənməməsi, `precedence`-li stylesheet-lərin yüklənməsi,
streaming SSR zamanı gözləyən data. Aktivləşdirmir: `useEffect` daxilində
edilən fetch + `setState` — bu, klassik loading-state pattern-idir.

**S: Nested Suspense boundary-ləri necə davranır?**
C: Hər boundary öz sürəti ilə açılır (progressive reveal) — üst boundary alt
boundary-lərə gözləmir. Amma bir boundary-nin daxilindəki bütün elementlər
"vahid" kimi işlənir: biri suspend olsa, hamısı fallback göstərir.

**S: `startTransition` Suspense-lə necə işləyir?**
C: Əgər update `startTransition` daxilindədirsə və content **artıq
göstərilibsə**, React fallback-ı göstərmək əvəzinə köhnə content-i saxlayır
(bəlkə "dimmed" halda) yeni data hazır olanadək. Bu, yalnız **artıq
görünən** boundary-lər üçün işləyir — yeni mount olan boundary-lər hələ də
dərhal fallback göstərir.

### 6.7 Mənbələr

- [React – Suspense reference](https://react.dev/reference/react/Suspense) (fallback trigger-ləri, nested boundary davranışı, 300ms throttling, WebFetch ilə birbaşa oxunub)
- [React – useTransition reference](https://react.dev/reference/react/useTransition) (Suspense + Transition qarşılıqlı əlaqəsi)
- [React Working Group — New Suspense SSR Architecture](https://github.com/reactwg/react-18/discussions/37)

---

## 7. Streaming

### 7.1 Niyə vacibdir

Ənənəvi SSR modeli "bütün data yüklənsin → bütün HTML render olsun → HTML
göndərilsin" idi — ən yavaş data mənbəyi bütün səhifəni gecikdirirdi.
Streaming bu modeli qırır. Senior developer bunu bilməlidir, çünki
streaming həm TTFB-i (Time To First Byte) yaxşılaşdırır, həm də infra
səviyyəsində fərqli tələblər qoyur (buffering proxy-lər, HTTP/1.1 vs
HTTP/2, response header-lərin vaxtı).

### 7.2 Konsepsiya — ilk prinsiplərdən

Streaming SSR-də server bütün HTML-i bir dəfəyə göndərmək əvəzinə,
**hazır olan hissəni dərhal göndərir**, qalanını Suspense boundary-ləri
üzrə **parça-parça (chunk-larla)** axıdır. Texniki olaraq bu, HTTP
response-un açıq saxlanılıb, hər hazır Suspense nəticəsinin `<script>`
tag-ı ilə "əvvəlcədən göndərilmiş fallback-ın yerinə" inyeksiya edilməsi
yolu ilə işləyir (React-ın `renderToPipeableStream` / `renderToReadableStream`
API-ları).

**Vacib qeyd:** streaming-in başlaması response header-lərin artıq
göndərilməsini tələb edir — buna görə **status kodu streaming
başladıqdan sonra dəyişdirilə bilmir** (Next.js-in loading.js sənədləşməsi
bunu açıq şəkildə vurğulayır: `notFound()` və oxşar yönləndirmələr
streaming başlamazdan **əvvəl**, boundary-dən əvvəl çağırılmalıdır).

Streaming-in üç sənədləşdirilmiş faydası (React iş qrupunun və Next.js-in
qeyd etdiyi):
1. Bütün data yüklənənədək HTML göndərməyi gözləmək lazım deyil — shell
   dərhal göndərilir, qalanı axır.
2. Bütün JS yüklənənədək hydration-u gözləmək lazım deyil (bax bölmə 8,
   Selective Hydration) — kod bölünməsi ilə server HTML-i saxlanır, JS
   gələndə həmin hissə hydrate olunur.
3. Server hər Suspense boundary-ni öz sürəti ilə göndərə bilər — ən yavaş
   data mənbəyi bütün səhifəni bloklamır.

### 7.3 Praktiki nümunələr

```jsx
// Next.js App Router — page.tsx avtomatik olaraq loading.tsx vasitəsilə
// Suspense boundary-yə bükülür
export default function Page() {
  return (
    <section>
      <Suspense fallback={<p>Feed yüklənir...</p>}>
        <PostFeed /> {/* asinxron Server Component, öz sürəti ilə axır */}
      </Suspense>
      <Suspense fallback={<p>Hava proqnozu yüklənir...</p>}>
        <Weather />
      </Suspense>
    </section>
  );
}
```

**Edge-case — status kodu artıq dəyişdirilə bilməz:**

```jsx
// app/product/[id]/page.tsx
export default async function Page({ params }) {
  // ✅ Düzgün: notFound() streaming başlamazdan ƍVVƍL, ilk sinxron
  // hissədə çağırılır — server hələ 404 status kodu göndərə bilər.
  const exists = await checkExists(params.id);
  if (!exists) notFound();

  return (
    <Suspense fallback={<Skeleton />}>
      {/* Bu boundary-nin içində notFound() çağırsan, HTTP status artıq
          200 göndərilmiş olacaq (stream başladığı üçün) — Next.js
          bunun əvəzinə HTML-ə <meta name="robots" content="noindex">
          əlavə edir, amma status kodu 200 qalır. */}
      <ProductDetails id={params.id} />
    </Suspense>
  );
}
```

**Edge-case — brauzer buferi:** bəzi brauzerlər (WebKit-in bilinən bug-u)
streaming response-u ilk ~1024 bayta qədər buferləyir — çox kiçik "hello
world" səhifələrində streaming-in effekti ilk baxışda görünməyə bilər;
real ölçülü səhifələrdə problem deyil.

### 7.4 Senior-level tələlər

- **Reverse proxy/CDN-in response-u buferləməsi** — Nginx kimi proxy-lər
  defolt olaraq bütün backend cavabını buferləyib bir dəfəyə ötürə bilər;
  streaming-in bütün faydası itir, amma tətbiq kodu "düzgün" görünür (bu,
  Part 9-da DevOps mövzusunda daha ətraflı işlənəcək).
  React/Next.js kodu düzgün olsa da, infra qatı streaming-i "yeyə" bilər.
- **`notFound()`/`redirect()`-i Suspense boundary-dən sonra çağırmaq** —
  status kodu artıq göndərilib, dəyişdirilə bilmir.
  düzgün SEO/HTTP semantikası itir.
- **Streaming-i "avtomatik sürətli" güman edib, hər boundary-ni öz aralıq
  data mənbəyinin sürətinə görə planlaşdırmamaq** — ən yavaş boundary hələ
  də öz nəticəsini gec göstərəcək, sadəcə **digərlərini bloklamayacaq**.

### 7.5 Trade-off / dizayn sualları

1. Streaming SSR ilə klassik "bütün data-nı əvvəlcədən yüklə, sonra render
   et" (blocking SSR) arasında seçim edərkən hansı meyarları
   götürərsiniz (SEO bot davranışı, infra dəstəyi, TTFB tələbləri)?
2. Reverse proxy buferləməsi streaming-i sındıra bilirsə, bunu necə aşkar
   edər və həll edərsiniz (production-da)?
3. Streaming-in SEO-ya təsiri barədə (bot-lar JS icra edə bilməyəndə) hansı
   qərarları veriərsiniz?

### 7.6 Mock müsahibə sual-cavabları

**S: Streaming SSR blocking SSR-dən fərqi nədir?**
C: Blocking SSR bütün data hazır olanadək HTML göndərmir. Streaming SSR
hazır olan hissəni (statik shell) dərhal göndərir, qalan Suspense
boundary-lərini data hazır olduqca axıdır — ən yavaş data mənbəyi bütün
səhifəni bloklamır.

**S: Niyə streaming başlayandan sonra HTTP status kodunu dəyişmək
olmur?**
C: Çünki status kodu response header-lərinin bir hissəsidir, header-lər
isə streaming başlamazdan əvvəl göndərilməlidir. Stream başladıqdan sonra
server bədəni (body) yaza bilər, amma header-ləri artıq dəyişə bilmir.

**S: Streaming həmişə performans faydası verirmi?**
C: Yalnız infra bunu dəstəkləyirsə — buferləyən reverse proxy və ya CDN
konfiqurasiyası streaming-in faydasını sıfırlaya bilər, tətbiq kodunun
özü düzgün olsa belə.

### 7.7 Mənbələr

- [Next.js — loading.js file convention](https://nextjs.org/docs/app/api-reference/file-conventions/loading) (status kodu, streaming başlama şərtləri, brauzer buferi — WebFetch ilə birbaşa oxunub)
- [React Working Group — New Suspense SSR Architecture](https://github.com/reactwg/react-18/discussions/37)
- [LogRocket — A guide to streaming SSR with React 18](https://blog.logrocket.com/streaming-ssr-with-react-18/)

---

## 8. Selective Hydration

### 8.1 Niyə vacibdir

"Hydration" mövzusu bir çox senior müsahibədə "niyə böyük tətbiqlərdə
hydration bu qədər yavaşdır" sualı ilə açılır. Selective Hydration bu
problemin React 18-in verdiyi cavabıdır. Bunu bilməmək, hydration-u
"bütün-yoxsa-heç-nə" prosesi kimi düşünməyə (və lazımsız "hydration
strategiyaları" icad etməyə) səbəb olur, halbuki React özü artıq
qranulyar səviyyədə bunu idarə edir.

### 8.2 Konsepsiya — ilk prinsiplərdən

Klassik (React ≤17) hydration modeli: bütün JS bundle yüklənməli, sonra
React DOM ağacının **tamamını** yuxarıdan-aşağı, ardıcıl hydrate etməli
idi — bu müddət ərzində istifadəçi klikləsə belə, heç bir interaktivlik
işləmirdi (DOM görünür, amma "canlı" deyil — buna "uncanny valley"
deyilir).

React 18-in Selective Hydration-u bunu iki yolla dəyişir:
1. **Kod bölünməsi + streaming ilə birləşərək**, hər Suspense boundary-si
   öz JS-i gələn kimi, **müstəqil** hydrate ola bilir — bütün bundle-ı
   gözləmək lazım deyil.
2. **Prioritet əsaslı sıralama**: əgər istifadəçi hələ hydrate olunmamış
   bir elementə klikləsə (və ya fokuslansa), React **həmin boundary-ni
   dərhal, ən yüksək prioritetlə (`SyncLane`-ə yaxın) hydrate edir** —
   qalan ağacın hydration-unu "kəsib", istifadəçinin toxunduğu hissəni
   əvvəl "canlandırır", sonra qalan hissəyə davam edir.

Bu, birbaşa Lanes modelinin (bölmə 5) tətbiqidir — hydration da, render
kimi, prioritetləşdirilə bilən "iş vahidləri"nə bölünür.

### 8.3 Praktiki nümunələr

```jsx
// app/page.tsx (Next.js App Router, Server Component)
export default function Page() {
  return (
    <>
      <Header />               {/* kritik, tez hydrate olunmalı */}
      <Suspense fallback={<CommentsSkeleton />}>
        <Comments />           {/* ağır, gecikə bilər — öz JS chunk-ı */}
      </Suspense>
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
    </>
  );
}
// İstifadəçi hələ "Comments" hydrate olunmamışkən onun daxilindəki bir
// düyməyə klikləsə, React DİGƍR boundary-lərin (Sidebar) hydration
// növbəsini kəsib, Comments-i əvvəl hydrate edir.
```

**Edge-case — hydration mismatch selective hydration-u sındırır:**

```jsx
// ❌ Server və client fərqli məzmun render edirsə (məs. Date.now(),
// window ölçüsü, locale fərqi) hər boundary üçün AYRI hydration mismatch
// warning-i yaranır, React "təhlükəsiz" tərəfi seçib bütün alt-ağacı
// client-də YENİDƍN render edir — bu, selective hydration-un gətirdiyi
// performans faydasını həmin boundary üçün SIFIRLAYIR.
function Timestamp() {
  return <span>{new Date().toLocaleString()}</span>; // server/client fərqli ola bilər
}
```

### 8.4 Senior-level tələlər

- **Server/client render fərqinə (hydration mismatch) laqeyd yanaşmaq** —
  bir boundary-də mismatch olsa, React həmin alt-ağacı sıfırdan client-də
  render edir; bu, "sadəcə warning" deyil, performans itkisidir.
  (Part 4-də Web Vitals ilə əlaqəli ətraflı işlənəcək.)
- **Selective Hydration-u "hər şeyi avtomatik sürətləndirir" kimi görmək**
  — faydası yalnız Suspense boundary-lər düzgün, məntiqi yerlərdə
  bölündükdə görünür; tək bir monolit boundary-də selective hydration-un
  seçəcəyi bir şey yoxdur.
- **Ağır, hydrate olunmamış interaktiv elementə "erkən" klikləmənin
  nəticəsini test etməmək** — production-da bu, "düymə işləmir" şikayəti
  kimi görünə bilər, əslində hydration sırası ilə bağlıdır.

### 8.5 Trade-off / dizayn sualları

1. Suspense boundary-lərini "hydration prioritetinə görə" planlaşdırmaq
   nə deməkdir — hansı UI hissələrini ayrı boundary edərdiniz, niyə?
2. Selective Hydration server/client mismatch-ə həssasdır — bu riski
   azaltmaq üçün hansı kodlaşdırma qaydalarını (məs. `useEffect`-də
   client-only render) tətbiq edərsiniz?
3. Selective Hydration ilə "hydration-u tamam atlamaq" (React Server
   Components-in bir hissəsini həmişə server-də saxlamaq) arasında
   performans/mürəkkəblik trade-off-u necədir?

### 8.6 Mock müsahibə sual-cavabları

**S: Selective Hydration nə problemi həll edir?**
C: Klassik hydration bütün ağacı ardıcıl, bloklayıcı şəkildə hydrate
edirdi — istifadəçi hazır olmayan hissəyə klikləsə, cavab ala bilmirdi.
Selective Hydration hər Suspense boundary-ni müstəqil, prioritetə görə
(istifadəçi hərəkətinə əsasən) hydrate edir.

**S: İstifadəçi hələ hydrate olunmamış elementə klikləsə nə baş verir?**
C: React həmin elementin boundary-sini yüksək prioritetlə dərhal hydrate
edir, digər boundary-lərin hydration-unu kəsərək — istifadəçinin toxunduğu
hissə əvvəl "canlanır".

**S: Hydration mismatch selective hydration-a necə təsir edir?**
C: Mismatch aşkarlananda React o boundary-ni client-də sıfırdan render
edir — selective hydration-un o boundary üçün gətirdiyi faydayı sıfırlayır.

### 8.7 Mənbələr

- [patterns.dev — Selective Hydration](https://www.patterns.dev/react/react-selective-hydration/)
- [React Working Group — New Suspense SSR Architecture](https://github.com/reactwg/react-18/discussions/37)
- [Next.js — loading.js: Streaming with Suspense](https://nextjs.org/docs/app/api-reference/file-conventions/loading) (Selective Hydration-ın Streaming Server Rendering ilə birgə iki fayda kimi qeyd olunduğu bölmə)

---

## 9. Partial Rendering (Partial Prerendering / Cache Components)

### 9.1 Niyə vacibdir

Bu, React-Next.js ekosistemində ən sürətlə dəyişən sahədir — ona görə
senior developer üçün təkcə "necə işlədiyini" bilmək yox, həm də **hansı
versiyada nə vəziyyətdə olduğunu** bilmək kritikdir (müsahibə zamanı
"experimental" ilə "stable" arasındaki fərqi qarışdırmaq, güvən itkisinə
səbəb olur).

**Dəqiqləşdirilmiş tarixçə (rəsmi Next.js sənədləri əsasında, 2026-cı ilin
ortası vəziyyəti):**
- Next.js 14: Partial Prerendering (PPR) **experimental** olaraq təqdim
  olundu.
- Next.js 15: PPR `experimental.ppr` bayrağı ilə, hələ **experimental**
  status saxladı ("production üçün tövsiyə olunmur").
- Next.js 16 (2025-ci ilin oktyabrında çıxıb): PPR, **Cache Components**
  adlı vahid modelin bir hissəsi kimi **stabilləşdi** — `cacheComponents:
  true` bayrağı ilə aktivləşir, əvvəlki `experimental.ppr`,
  `experimental.dynamicIO`, `experimental.useCache` bayraqlarını əvəz
  edir.

### 9.2 Konsepsiya — ilk prinsiplərdən

Ənənəvi rendering strategiyaları (SSG, SSR, ISR) bütöv **route** səviyyəsində
qərar tələb edir — bütün səhifə statik, ya da bütün səhifə dinamik. Partial
Rendering bu ikili seçimi qırır: **tək bir route-un daxilində** statik və
dinamik hissələr **birgə** ola bilər.

Cache Components modelində (Next.js 16+) məntiq tərsinə çevrilib:
**data fetching defolt olaraq dinamikdir** — sən açıq şəkildə `use cache`
ilə "bu keşlənsin" deyirsən (əksinə deyil, "bu dinamik olsun" demirsən).
Mexanizm: build zamanı Next.js statik hissələri (cache-lənmiş, ya da heç
bir runtime data-ya bağlı olmayan) əvvəlcədən render edib bir **statik
HTML shell** yaradır; bu shell dərhal (CDN sürəti ilə) göndərilir.
Dinamik hissələr (runtime-da `cookies()`, `headers()`, cache-lənməmiş
fetch işlədən komponentlər) Suspense boundary-ləri ilə işarələnib, shell-lə
**bir HTTP sorğusunda, streaming ilə** doldurulur (bax bölmə 7).

Bu, texniki olaraq Suspense-in server-də "iki fazalı" işlədilməsidir:
birinci faz (build/statik) shell-i hazırlayır, ikinci faz (request-time)
Suspense boundary-lərini doldurur — istifadəçi üçün bu, **tək bir
response** kimi görünür.

### 9.3 Praktiki nümunələr

```ts
// next.config.ts (Next.js 16+)
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true, // PPR-i "Cache Components" modeli kimi aktivləşdirir
};

export default nextConfig;
```

```tsx
// app/product/[id]/page.tsx
import { Suspense } from 'react';

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <ProductStaticInfo id={params.id} /> {/* keşlənə bilər, shell-in hissəsi */}
      <Suspense fallback={<PriceSkeleton />}>
        <LivePrice id={params.id} /> {/* runtime-da fetch, streaming ilə gəlir */}
      </Suspense>
    </>
  );
}

async function ProductStaticInfo({ id }: { id: string }) {
  'use cache';
  const data = await getProductStatic(id);
  return <h1>{data.title}</h1>;
}

async function LivePrice({ id }: { id: string }) {
  const price = await getLivePrice(id); // cache-lənməmir, hər request-də icra olunur
  return <p>{price}</p>;
}
```

**Edge-case — "Cache Timeout" build zamanı sındırır:**

```tsx
// ❌ Runtime data-ya (cookies) bağlı Promise-i cache-lənmiş funksiyaya
// ötürmək build-i "asılı" qoyur (50 saniyəyə qədər timeout)
import { cookies } from 'next/headers';

export default function Page() {
  return (
    <Suspense fallback={<div>Yüklənir...</div>}>
      <Dynamic />
    </Suspense>
  );
}

async function Dynamic() {
  const cookieStore = cookies(); // runtime API
  return <Cached promise={cookieStore} />; // ❌ build hangs
}

async function Cached({ promise }: { promise: any }) {
  'use cache';
  const data = await promise; // build zamanı runtime data-nı gözləyir → timeout
  return <p>{data}</p>;
}
```

Düzgün yol: `cookies()`-i `Dynamic` daxilində `await` et, yalnız
serializable dəyəri `Cached`-ə ötür.

### 9.4 Senior-level tələlər

- **Köhnə `experimental.ppr` API-sini yeni `cacheComponents` ilə
  qarışdırmaq** — Next.js 16-da `experimental.ppr` bayrağı **silinib**;
  Next.js 15-dən köçürülərkən migration guide izlənməlidir.
- **`use cache` daxilində `cookies()`/`headers()` birbaşa çağırmaq** —
  bu, dərhal (build hangs ilə deyil, birbaşa) xəta verir; runtime
  data-ları həmişə cache scope-dan **kənarda** oxumaq, arqument kimi
  ötürmək lazımdır.
- **`React.cache()`-in `use cache` scope-una "sızacağını" gözləmək** —
  sənədlərə görə, `use cache` öz **izolə olunmuş** `React.cache` scope-una
  malikdir; parent-də `React.cache` ilə saxlanan dəyər `use cache`
  daxilindən görünmür.
- **Serverless mühitdə runtime cache-in build-vaxtı keş ilə eyni davranacağını
  gözləmək** — serverless-də hər request fərqli instansiya ola bilər, keş
  request-lər arası saxlanmır (yalnız self-hosted-da saxlanır).

### 9.5 Trade-off / dizayn sualları

1. "Data fetching defolt dinamikdir, açıq şəkildə cache-lə" modeli ilə
   əvvəlki "hər şey defolt statikdir, `dynamic = 'force-dynamic'` ilə
   dinamikləşdir" modeli arasında hansı mental model dəyişikliyi lazımdır
   komandanız üçün?
2. `use cache: remote` (şəbəkə round-trip-i ilə, platform xərci ilə) ilə
   defolt in-memory keş arasında seçim edərkən hansı meyarları
   götürərsiniz?
3. Partial Rendering-in SEO və bot-lar üçün göstərdiyi HTML-lə, real
   istifadəçinin gördüyü streaming HTML arasındaki fərq hansı riskləri
   yaradır (məs. bot-lar dinamik hissəni heç görməsə)?

### 9.6 Mock müsahibə sual-cavabları

**S: Partial Prerendering nədir, hansı problemi həll edir?**
C: Bir route-un daxilində statik və dinamik hissələri **birgə** saxlamağa
imkan verir — statik hissə build/CDN sürəti ilə dərhal, dinamik hissə isə
Suspense boundary vasitəsilə streaming ilə eyni HTTP response-da gəlir.
Əvvəllər bu seçim bütün route səviyyəsində (SSG vs SSR) edilməli idi.

**S: `use cache` və `cacheComponents` arasındaki əlaqə nədir?**
C: `cacheComponents: true` bayrağı bütöv Cache Components modelini
(PPR + `use cache` + `cacheLife`/`cacheTag`) aktivləşdirir. `use cache`
bu modelin daxilində, konkret bir route/komponent/funksiyanı keşlənə
bilən elan edən direktivdir.

**S: PPR/Cache Components hazırda (2026) production üçün nə vəziyyətdədir?**
C: Next.js 16-da (2025-ci ilin oktyabrından) stabildir — `cacheComponents`
bayrağı ilə aktivləşir. Next.js 14/15-də experimental idi, production
üçün tövsiyə olunmurdu.

### 9.7 Mənbələr

- [Next.js — cacheComponents config reference](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents) (versiya tarixçəsi, PPR ilə əlaqə — WebFetch ilə birbaşa oxunub, `lastUpdated: 2026-05-13`)
- [Next.js — "use cache" directive reference](https://nextjs.org/docs/app/api-reference/directives/use-cache) (build hangs, React.cache isolation, versiya tarixçəsi — WebFetch ilə birbaşa oxunub)
- [Next.js — Getting Started: Partial Prerendering (v15 docs)](https://nextjs.org/docs/15/app/getting-started/partial-prerendering) (experimental dövrün sənədləşməsi, tarixi kontekst üçün)

---

## 10. Server Components

### 10.1 Niyə vacibdir

React Server Components (RSC), React-ın 2020-dən bəri ən böyük arxitektura
dəyişikliyidir — "component" sözünün mənasını genişləndirir: indi bəzi
komponentlər **heç vaxt brauzerə göndərilmir**. Bu, bundle ölçüsü, data
fetching yeri, hətta "component nə vaxt state saxlaya bilər" sualına
təsir edir. Senior developer bunu bilməlidir, çünki RSC-ni "SSR-in başqa
adı" kimi düşünmək (səhv analoji) arxitektura qərarlarını korlayır.

### 10.2 Konsepsiya — ilk prinsiplərdən

Server Component — bundling-dən **əvvəl**, ayrıca bir mühitdə (build
serverində bir dəfə, ya da hər sorğu üçün bir web serverdə) render olunan
komponentdir. Onun nəticəsi **HTML deyil** — xüsusi seriallaşdırılmış bir
format (React-ın "flight" formatı), bu, Client Component-lərə **artıq
render olunmuş JSX çıxışı** kimi ötürülür.

Bunun nəticələri:
- Server Component **heç vaxt** `useState`, `useEffect`, brauzer API-larını
  işlədə bilməz — çünki bu komponentin "instansiyası" client-də yaşamır,
  onun icrası bir dəfə (server-də) baş verir, nəticə göndərilir.
- Server Component birbaşa fayl sistemi, verilənlər bazası, daxili API-lərə
  giriş ala bilər — heç bir ictimai API endpoint-i yaratmadan.
  ```jsx
  async function Page({ page }) {
    const content = await fs.readFile(`${page}.md`); // birbaşa fayl sistemi
    return <div>{sanitizeHtml(marked(content))}</div>;
  }
  ```
- Server Component-lər `async function` ola bilər və render zamanı
  `await` edə bilər — bu, React-ın component modelinə yeni bir imkandır
  (Client Component-lərdə mümkün deyil).
- Server Component Client Component-ə **JSX prop olaraq** ötürülə bilər
  (`children` pattern-i) — Client Component onu "render edən" deyil,
  sadəcə "yerləşdirən" olur, çünki JSX artıq render olunmuş şəkildə gəlir.

**Vacib texniki qeyd:** RSC-nin implementasiya təfərrüatları (bundler-lərin
necə inteqrasiya olunduğu) **semver-ə tabe deyil** — React komandası bunu
açıq bildirir, çünki bu, hələ də inkişaf edən bir sahədir. Framework-lər
(Next.js) React-ın konkret versiyasına bağlanır.

### 10.3 Praktiki nümunələr

```jsx
// Server Component (defolt, "use client" yoxdur)
async function Notes() {
  const notes = await db.notes.getAll(); // birbaşa DB girişi
  return (
    <div>
      {notes.map(note => (
        <Expandable key={note.id}>
          <p>{note.text}</p>
        </Expandable>
      ))}
    </div>
  );
}
```

```jsx
'use client';
// Client Component — interaktiv, state saxlaya bilir
export default function Expandable({ children }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <button onClick={() => setExpanded(!expanded)}>Toggle</button>
      {expanded && children} {/* children server-də artıq render olunub gəlir */}
    </div>
  );
}
```

**Edge-case — "promise ötürmə" pattern-i ilə aşağı prioritetli data:**

```jsx
// Server Component
function Note({ note }) {
  const commentsPromise = db.comments.get(note.id); // AWAIT EDİLMİR, birbaşa ötürülür
  return (
    <Suspense fallback={<p>Şərhlər yüklənir...</p>}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  );
}
```

```jsx
'use client';
function Comments({ commentsPromise }) {
  const comments = use(commentsPromise); // client-də davam edir, use() ilə
  return <ul>{comments.map(c => <li key={c.id}>{c.text}</li>)}</ul>;
}
```

Bu pattern vacibdir: `note` üçün əsas data server-də gözlənilir (blocking),
amma `comments` kimi az prioritetli data Promise kimi ötürülüb, client-də
`use()` ilə "davam etdirilir" — nəticədə əsas content daha tez göndərilir.

**Edge-case — Server Component-i "state saxlayacaq" gözləmək:**

```jsx
// ❌ Bu HEÇ VAXT işləməyəcək — Server Component-də hook yoxdur
async function Counter() {
  const [count, setCount] = useState(0); // Xəta: Server Component-də useState
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
  // Həm useState, həm onClick (event handler) Server Component-də mənasızdır —
  // "use client" lazımdır.
}
```

### 10.4 Senior-level tələlər

- **Server Component-i "hər şeyi server-ə köçür" mentalitetilə işlətmək** —
  interaktivlik lazım olan HƏR yerdə "use client" lazımdır; RSC
  interaktivliyi əvəz etmir, onu **əhatə dairəsini azaldır** (bundle-a
  düşən kodu minimuma endirir).
  bilər.
- **Server Component-in "hər render-də yenidən işə düşdüyünü" unutmaq** —
  cache-lənməyibsə (bax bölmə 13), naviqasiya zamanı Server Component
  yenidən server-də icra olunur, DB sorğusu təkrarlanır.
- **Client Component-dən Server Component-i birbaşa import etməyə
  çalışmaq** — bu mümkün deyil (module qrafında client boundary-dən sonra
  hər şey client kodudur); yalnız `children`/slot pattern-i ilə server
  nəticəsini ötürmək mümkündür.
- **Server Function-ları (aşağıda bölmə 11) Server Component-in özəlliyi
  kimi qarışdırmaq** — bunlar fərqli konsepsiyalardır: Server Component
  render-dir, Server Function (`'use server'`) mutasiya üçün çağırışdır.

### 10.5 Trade-off / dizayn sualları

1. Bir komponentin Server yoxsa Client Component olması qərarını necə
   verirsiniz — "interaktivlik lazımdırmı" testi kifayətdirmi, yoxsa
   bundle ölçüsü/data giriş nöqtəsi kimi əlavə meyarlar var?
2. `children` pattern-i ilə Server Component-i Client Component-in
   içində saxlamaq nə vaxt arxitektura mürəkkəbliyi yaradır (dərin
   "prop drilling"ə bənzər problem)?
3. RSC-nin bundler-ə bağlı, semver-siz implementasiyası komandanızın
   framework versiyası yeniləmə strategiyasına necə təsir edir?

### 10.6 Mock müsahibə sual-cavabları

**S: Server Component-lər SSR ilə eynidirmi?**
C: Xeyr. SSR — Client Component-lərin ilk render-inin server-də edilib
HTML kimi göndərilməsidir, amma component kodu **hələ də browser bundle-ına
düşür** (hydration üçün). Server Component isə **heç vaxt** brauzerə
göndərilmir — onun kodu bundle-a düşmür, yalnız render nəticəsi göndərilir.

**S: Server Component nə üçün `useState` işlədə bilmir?**
C: Çünki Server Component-in "instansiyası" client-də yaşamır — o, bir
dəfə (server-də) icra olunub nəticəsini göndərir; state saxlamaq üçün
komponent zaman keçdikcə yaşamalı, yenidən render oluna bilməlidir, bu
yalnız client-də mümkündür.

**S: Server Component Client Component-i necə "render edə bilər"?**
C: Onu import edib, JSX kimi çağıraraq (`<ClientComp />`), və ya ona
`children`/slot kimi başqa Server Component-in JSX-ini ötürərək. İkinci
halda, ötürülən JSX artıq server-də render olunmuş formada gəlir — Client
Component onu sadəcə yerləşdirir, "içini" bilmir.

### 10.7 Mənbələr

- [React – Server Components reference](https://react.dev/reference/rsc/server-components) (WebFetch ilə birbaşa oxunub — async render, fs girişi, promise ötürmə pattern-i, semver qeydi)
- [React – "use client" directive reference](https://react.dev/reference/rsc/use-client) (client/server boundary-nin module qrafında necə çəkildiyi)

---

## 11. Client Components

### 11.1 Niyə vacibdir

"Client Component" termini bəzən "əsas, defolt component tipi" kimi
başa düşülür — RSC modelində isə əksinədir: **defolt Server Component-dir**,
Client Component **açıq şəkildə seçilən istisnadır**. Bu tərs münasibəti
bilməmək, "use client"-i lazımsız yerə hər fayla yapışdırmağa (və beləliklə
RSC-nin bütün faydasını sıfırlamağa) səbəb olur.

### 11.2 Konsepsiya — ilk prinsiplərdən

`'use client'` direktivi bir **modulu və onun bütün keçidli
asılılıqlarını (transitive dependencies)** "client kodu" kimi işarələyir.
Bu, **render ağacında** deyil, **modul asılılıq qrafında** çəkilən bir
sərhəddir — fərq vacibdir: bir komponent "Client Component" olur, əgər (a)
öz faylında `'use client'` varsa, VƏ YA (b) `'use client'`-li bir modulun
**altında** import olunubsa (transitiv). Ona görə bir komponent həm
Server, həm Client Component ola bilər — kontekstdən asılı olaraq: əgər
o, Server Component-dən birbaşa import olunubsa, Server Component-dir;
əgər Client Component-in daxilindən import olunubsa (transitiv asılılıq),
Client Component-dir.

Server-dən Client-ə ötürülən props **seriallaşdırıla bilən** olmalıdır:
primitivlər, sadə obyekt/array, `Date`, `Map`/`Set`, Promise-lər, və (RSC-
yə xas) **artıq render olunmuş JSX elementləri**. Adi funksiyalar (event
handler-lər DAXİL OLMAQLA) ötürülə **bilməz** — istisna: Server Function-lar
(`'use server'`) xüsusi seriallaşdırılıb ötürülə bilir.

**Kritik, tez-tez qarışdırılan qayda:** Client Component **Server
Component-i idxal edə bilməz** (birbaşa) — amma onu **`children` kimi
qəbul edib render edə bilər**. Fərq: idxal client bundle-ına kodu daxil
edər (mümkün deyil, çünki Server Component kodu client-ə göndərilməməlidir);
`children` isə artıq-render-olunmuş nəticəni ötürür — kod deyil, data.

### 11.3 Praktiki nümunələr

```jsx
// App.js — Server Component (defolt)
import Copyright from './Copyright';           // Server Component
import InspirationGenerator from './InspirationGenerator'; // 'use client'

export default function App() {
  return (
    <InspirationGenerator>
      <Copyright year={2026} /> {/* Server Component, children kimi ötürülür */}
    </InspirationGenerator>
  );
}
```

```jsx
// InspirationGenerator.js
'use client';
export default function InspirationGenerator({ children }) {
  const [quote, setQuote] = useState(getRandomQuote());
  return (
    <>
      <p>{quote}</p>
      <button onClick={() => setQuote(getRandomQuote())}>Yeni ilham</button>
      {children} {/* Copyright-ı "bilmədən" göstərir — artıq render olunub gəlib */}
    </>
  );
}
```

**Edge-case — "use client"-i lazımsız yuxarı qaldırmaq:**

```jsx
// ❌ Bütün faylı client edir, halbuki yalnız düymə interaktivdir
'use client';

export default function ProductPage({ product }) {
  return (
    <div>
      <ExpensiveStaticDescription html={product.descriptionHtml} /> {/* indi məcburi client bundle-da */}
      <AddToCartButton productId={product.id} /> {/* yalnız BU hissə interaktiv olmalı idi */}
    </div>
  );
}
```

```jsx
// ✅ Düzgün: yalnız interaktiv hissə client, qalanı Server Component olaraq qalır
// ProductPage.js — Server Component
export default function ProductPage({ product }) {
  return (
    <div>
      <ExpensiveStaticDescription html={product.descriptionHtml} /> {/* server-də qalır */}
      <AddToCartButton productId={product.id} /> {/* yalnız bu, 'use client' */}
    </div>
  );
}
```

### 11.4 Senior-level tələlər

- **"use client"-i fayl ağacının yuxarısına qoymaq** (route səviyyəsində) —
  bütün alt-ağac transitiv olaraq client kodu olur, RSC-nin "yalnız
  lazım olan JS-i göndər" faydası itir.
- **Server-dən Client-ə funksiya (event handler) ötürməyə çalışmaq** —
  ciddi runtime xətası; yalnız Server Function-lar (`'use server'`) bu
  qaydadan istisnadır.
- **Client Component-dən Server Component-i birbaşa import etməyə
  cəhd** — build-time xəta və ya səssiz "bu artıq client kod kimi
  bundle-lanır" davranışı (bundler-ə görə dəyişir); `children` pattern-i
  düzgün yoldur.
- **Böyük, seriallaşdırılan obyektləri (məs. bütün DB cavabını) hər dəfə
  Client Component-ə prop kimi ötürmək** — network payload-u artırır;
  yalnız lazım olan sahələri seçib ötürmək lazımdır.

### 11.5 Trade-off / dizayn sualları

1. Bir komponent ağacında "use client" sərhədini harada çəkmək
   optimaldır — "ən aşağı, ən dar" prinsipi hər zaman doğrudurmu, hansı
   hallarda praktiki səbəblərlə yuxarı qaldırılır?
2. `children` pattern-i ilə Server→Client kompozisiyası component API-sinin
   oxunaqlığına necə təsir edir — bu, "prop drilling"dən fərqli bir
   mürəkkəblik yaradırmı?
3. Komandanızda "use client" istifadəsini necə audit edərdiniz (lazımsız
   genişlənməni tapmaq üçün hansı alətlər/prosesləri seçərdiniz)?

### 11.6 Mock müsahibə sual-cavabları

**S: "use client" render ağacında, yoxsa modul qrafında sərhəd çəkir?**
C: Modul asılılıq qrafında. Render ağacında bir Server Component bir
Client Component-i "children" kimi göstərə bilər, amma bu, modul
sərhədini pozmur — çünki JSX artıq render olunmuş data kimi ötürülür,
kod idxalı deyil.

**S: Client Component Server Component-i idxal edə bilərmi?**
C: Birbaşa yox. Amma Server Component-dən Client Component-ə `children`
(və ya digər slot prop-ları) kimi ötürülə bilər — Client Component onu
"render edən" deyil, sadəcə yerləşdirən olur.

**S: Server-dən Client-ə hansı tip data ötürülə bilər?**
C: Seriallaşdırıla bilən dəyərlər: primitivlər, sadə obyekt/array, `Date`,
`Map`/`Set`, Promise-lər, JSX elementləri, və Server Function-lar. Adi
funksiyalar (`'use server'` olmadan) ötürülə bilməz.

### 11.7 Mənbələr

- [React – "use client" directive reference](https://react.dev/reference/rsc/use-client) (WebFetch ilə birbaşa oxunub — modul qrafı sərhədi, seriallaşdırma qaydaları, children pattern-i)
- [React – Server Components reference](https://react.dev/reference/rsc/server-components)

---

## 12. Server Actions (Server Functions)

### 12.1 Niyə vacibdir

Server Actions, formaların və mutasiyaların idarə olunmasını köklü şəkildə
dəyişdi — ayrıca API route yazmadan, birbaşa client kodundan server
funksiyası çağırmaq mümkün oldu. Senior developer bunu "sehrli RPC" kimi
yox, **"həqiqi HTTP endpoint, sadəcə avtomatik yaradılan"** kimi başa
düşməlidir — bu fərq təhlükəsizlik qərarlarına birbaşa təsir edir.

### 12.2 Konsepsiya — ilk prinsiplərdən

`'use server'` direktivi bir `async` funksiyanı (və ya bütün modulu) **Server
Function** elan edir. Bu, `'use client'`-in əksi istiqamətdə işləyən bir
sərhəddir: server-də icra olunan, amma client koddan **çağırıla bilən**
funksiya. React/bundler bu funksiya üçün avtomatik bir **serialləşdirilmiş
istinad** yaradır — client bu istinadı çağıranda, arxa planda bir HTTP
sorğusu göndərilir, server funksiyanı icra edir, nəticəni seriallaşdırıb
qaytarır.

**Bu, kritik təhlükəsizlik nəticəsi doğurur:** React-ın öz sənədləri açıq
yazır — *"Arguments to Server Functions are fully client-controlled. For
security, always treat them as untrusted input"* — Server Function-a
göndərilən **bütün** arqumentlər, elə forma sahələrindən API çağırışına
qədər, HTTP sorğusu kimi client tərəfindən **tam idarə oluna bilər**.
Bunu unutmaq, Server Action-ı "təhlükəsiz, çünki server kodu" hesab edib,
authorization/validation-u atlamağa gətirir.

Server Function-lar iki yolla çağırıla bilər:
1. **Form action** (`<form action={fn}>`) — **progressiv təkmilləşdirmə**
   təmin edir: JavaScript hələ yüklənməmiş olsa belə, forma normal HTML
   form submit kimi işləyir (React FormData-nı avtomatik ötürür).
2. **Birbaşa çağırış** (event handler daxilində) — mütləq bir
   **Transition** daxilində olmalıdır (`useTransition` və ya avtomatik,
   forma daxilində olanda).

### 12.3 Praktiki nümunələr

```jsx
// actions.ts
'use server';

export async function addToCart(formData: FormData) {
  const productId = formData.get('productId'); // ❌ TAM etibarsız input
  const session = await getSession(); // ✅ hər dəfə yenidən doğrulanmalı

  if (!session?.userId) {
    throw new Error('Unauthorized'); // ✅ authorization Server Function-un ÖZÜNDƍ, hər çağırışda
  }

  const parsed = z.object({ productId: z.string().uuid() }).safeParse({
    productId,
  });
  if (!parsed.success) throw new Error('Invalid input'); // ✅ validation

  await db.cart.add(session.userId, parsed.data.productId);
}
```

```jsx
'use client';
import { addToCart } from './actions';

export default function AddToCartForm({ productId }) {
  return (
    <form action={addToCart}>
      <input type="hidden" name="productId" value={productId} />
      <button type="submit">Səbətə əlavə et</button>
    </form>
  );
  // JS yüklənməmiş olsa belə (progressive enhancement), forma normal
  // HTML submit kimi işləyəcək.
}
```

**Edge-case — birbaşa çağırışda Transition-suz çağırmaq:**

```jsx
'use client';
function DeleteButton({ id }) {
  const onClick = () => {
    deleteItem(id); // ❌ Transition-suz — React-ın sənədləşməsinə görə
                     // birbaşa çağırış useTransition daxilində olmalıdır
  };
  return <button onClick={onClick}>Sil</button>;
}
```

```jsx
'use client';
function DeleteButton({ id }) {
  const [isPending, startTransition] = useTransition();
  const onClick = () => {
    startTransition(async () => {
      await deleteItem(id); // ✅ düzgün
    });
  };
  return <button onClick={onClick} disabled={isPending}>Sil</button>;
}
```

**Edge-case — "cache-lənəcək" gözləməsi:** Server Function-ların
**qaytardığı dəyər üçün heç bir keşləmə mexanizmi yoxdur** — hər çağırış
yenidən şəbəkə sorğusu və server icrası tələb edir. Data fetching üçün
deyil, **mutasiya üçün** nəzərdə tutulub; oxumaq/keşləmək lazımdırsa,
`use cache` ilə işarələnmiş funksiyalar və ya Server Component-in özü
işlədilməlidir.

### 12.4 Senior-level tələlər

- **Client-dən gələn `userId`/`role` kimi dəyərlərə etibar etmək** —
  formdan və ya funksiya arqumentindən gələn HƏR ŞEY dəyişdirilə bilər;
  session/auth həmişə server tərəfdə (cookie, JWT verification) yenidən
  yoxlanmalıdır.
  bilər.
- **Server Action-ı sürətli-sürətli, ardıcıl çağırıb "sıra" gözləmək** —
  React sənədləri qeyd edir ki, `await` ilə birgə çoxlu sürətli çağırışlar
  sıra pozğunluğuna (race condition) səbəb ola bilər; sıralama lazımdırsa
  `useActionState` və ya `<form>` action-ları (bunlar avtomatik ardıcıllığı
  təmin edir) işlədilməlidir.
- **Server Function-u data fetching üçün işlətmək** — nə cache
  mexanizmi var, nə də bu onun məqsədidir; bu, əlavə, lazımsız network
  overhead-idir.
- **`experimental_taintUniqueValue`/`taintObjectReference` kimi qorunma
  mexanizmlərini bilmədən, həssas dəyərləri (parol hash-i, secret) yanlışlıqla
  client-ə "sızdırmaq"** (serialləşdirilə bilən return dəyərinin daxilində).

### 12.5 Trade-off / dizayn sualları

1. Server Action-ları "public HTTP endpoint" kimi rəftar etmək nə deməkdir
   real kod review prosesində — hansı checklist maddələri məcburi olmalıdır
   (rate limiting, input validation, authorization)?
2. Form action ilə birbaşa çağırış arasında seçim edərkən hansı meyarları
   götürərsiniz (progressive enhancement lazımdırmı, sıra qarantısı
   vacibdirmi)?
3. Server Action-ların REST/ayrıca API route-a nisbətən nə vaxt **doğru
   olmayan** seçim olduğunu (məs. ictimai/mobile client-in də çağıracağı
   endpoint lazımdırsa) necə müəyyən edərsiniz?

### 12.6 Mock müsahibə sual-cavabları

**S: Server Action-ı niyə "public HTTP endpoint" kimi rəftar etməliyik?**
C: Çünki texniki olaraq elə budur — client tərəfdən çağırılan Server
Function arxa planda HTTP sorğusuna çevrilir, arqumentlər tam client
tərəfindən idarə olunur. Server kodudur deyə "təhlükəsiz" fərz etmək
səhvdir; authorization və validation hər çağırışda təkrar aparılmalıdır.

**S: Form action ilə birbaşa (event handler-dən) çağırış arasında fərq
nədir?**
C: Form action progressiv təkmilləşdirməni (JS yüklənməmiş olsa belə forma
işləyir) və avtomatik FormData ötürülməsini təmin edir. Birbaşa çağırış
isə mütləq `useTransition` daxilində olmalıdır, avtomatik sıralama
qarantısı vermir (bu üçün `useActionState` lazımdır).

**S: Server Action-un qaytardığı nəticə keşlənirmi?**
C: Xeyr, sənədlərə görə heç bir cache mexanizmi yoxdur — hər çağırış
yenidən icra olunur. Bu, Server Action-ların mutasiya üçün, data fetching
üçün olmadığının göstəricisidir.

### 12.7 Mənbələr

- [React – "use server" directive reference](https://react.dev/reference/rsc/use-server) (WebFetch ilə birbaşa oxunub — seriallaşdırma qaydaları, təhlükəsizlik qeydi, Transition tələbi, cache-siz olması)
- [Next.js — Server Actions guide](https://nextjs.org/docs/app/guides/server-actions)

---

## 13. Cache (React `cache()` və Next.js Cache mexanizmləri)

### 13.1 Niyə vacibdir

"Cache" React/Next.js ekosistemində **bir mexanizm yox, bir neçə fərqli
qatın adı**dır — React-ın öz `cache()` funksiyası, Next.js-in `fetch`
keşi, `use cache` direktivi, router-in client-side keşi. Bunların
hamısını "keş" deyə bir torbaya yığmaq, "niyə mənim datam təzələnmir"
kimi debug seansını saatlarla uzadır. Senior developer bu qatları ayırıb,
hər birinin **nə vaxt, harada, nə qədər müddət** işlədiyini dəqiq bilir.

### 13.2 Konsepsiya — ilk prinsiplərdən

**React `cache()`** — React-ın öz, framework-dən asılı olmayan primitividir.
Yalnız **Server Components-də** işləyir, arqumentlərə görə **request-scoped**
(bir server render sorğusu ərzində) memoizasiya edir: eyni arqumentlərlə
çağırılan funksiya nəticəsi **bir dəfə** hesablanır, sorğu ərzində bütün
komponentlər arasında **paylaşılır**, sorğu bitəndə **tamamilə silinir**.
Bu, `useMemo`-dan fərqlidir — `useMemo` bir komponent instansiyasına, bir
"həyat dövrünə" bağlıdır; `cache()` bütün render ağacına, bir **request-ə**
bağlıdır. Açar müqayisəsi `Object.is()` (shallow) ilədir — primitiv
arqumentlərlə işlək, obyekt arqumentlərdə **eyni referens** tələb edir.

**Next.js `use cache`** (bölmə 9-da ətraflı) — component/funksiya
nəticəsini **request-lər arası** (build-dən, ya da runtime-dan) saxlayan,
`cacheLife`/`cacheTag` ilə idarə olunan mexanizmdir. Defolt profil: **stale
5 dəqiqə (client), revalidate 15 dəqiqə (server), heç vaxt vaxtla
expire olmur** (yalnız `revalidateTag`/`updateTag` ilə). Bu, `cache()`-dən
prinsipial fərqlidir: `cache()` bir sorğu ərzində, `use cache` **sorğular
arasında** yaşayır.

**`React.cache` izolyasiyası (sənədləşdirilmiş, tez-tez bilinməyən
detal):** `use cache` scope-u öz, **izolə olunmuş** `React.cache`
instansiyasına malikdir — parent-də `React.cache` ilə saxlanan dəyər,
`use cache` funksiyasının daxilindən **görünmür**. Bu iki mexanizmi
birləşdirib "paylaşılan state" yaratmaq mümkün deyil.

**Revalidation üçlüyü (Next.js):**
- `revalidatePath` — konkret bir path-i keşdən çıxarır, sadə, "bir səhifə"
  ssenarisi üçün.
- `revalidateTag` — tag-lə işarələnmiş bütün keş entry-lərini **stale-
  while-revalidate** məntiqi ilə təzələyir (köhnə dəyər dərhal qaytarılır,
  arxa planda təzə fetch gedir).
- `updateTag` — **yalnız Server Action daxilindən** çağırıla bilər (başqa
  yerdə xəta verir); tag-li data-nı **dərhal** (stale dövr olmadan) expire
  edir.

### 13.3 Praktiki nümunələr

```jsx
// React cache() — request-scoped, Server Component-lərarası paylaşım
import { cache } from 'react';

export const getUser = cache(async (id: string) => {
  return db.users.findUnique({ where: { id } });
});

// Header.js (Server Component)
async function Header({ userId }) {
  const user = await getUser(userId); // İLK çağırış — DB sorğusu icra olunur
  return <h1>Salam, {user.name}</h1>;
}

// Sidebar.js (Server Component, eyni sorğu ağacında)
async function Sidebar({ userId }) {
  const user = await getUser(userId); // EYNİ arqument → CACHE-DƍN qaytarılır, DB-yə YOX
  return <aside>{user.role}</aside>;
}
```

**Edge-case — obyekt arqumentlə cache miss:**

```jsx
// ❌ Hər çağırışda YENİ obyekt referensi — cache HEÇ VAXT hit olmur
async function Page() {
  return (
    <>
      <MapMarker coords={{ x: 10, y: 20 }} /> {/* referens #1 */}
      <MapMarker coords={{ x: 10, y: 20 }} /> {/* referens #2, dəyər eyni, REFERENS fərqli */}
    </>
  );
}
const getDistance = cache((coords) => calculateNorm(coords)); // hər ikisi cache MISS

// ✅ Primitiv arqumentlərlə, ya da eyni referens ilə
const getDistance = cache((x, y) => calculateNorm(x, y)); // primitiv → cache HIT
```

**Edge-case — `use cache` + `revalidateTag`/`updateTag` ilə invalidation:**

```tsx
// lib/data.ts
import { cacheTag } from 'next/cache';

export async function getProducts() {
  'use cache';
  cacheTag('products');
  return db.products.findMany();
}

// app/actions.ts
'use server';
import { updateTag } from 'next/cache';

export async function createProduct(data: FormData) {
  await db.products.create({ /* ... */ });
  updateTag('products'); // Bütün 'products' tag-li keş DƍRHAL etibarsız olur
}
```

### 13.4 Senior-level tələlər

- **`cache()`-i sorğular arası davam edən keş kimi düşünmək** — bu, sənədə
  görə **request-scoped**-dir, sorğu bitəndə silinir; "niyə ikinci
  request-də köhnə dəyər gəlir" sualının doğru cavabı budur ki, gəlməməlidir
  — əgər gəlirsə, başqa bir keş qatı (`use cache`, `fetch` keşi) işə
  düşür.
- **`cache()`-i component daxilində yaratmaq**: `cache(fn)` çağırışı hər
  render-də təzə funksiya = təzə, paylaşılmamış keş yaradır; **modul
  səviyyəsində, bir dəfə** yaradılmalıdır.
- **Serverless mühitdə `use cache`-in in-memory keşinin request-lər arası
  saxlanacağını fərz etmək** — cədvəldə göstərildiyi kimi, serverless-də
  hər sorğu fərqli instansiyada ola bilər, in-memory keş **saxlanmaya
  bilər**; bu hallarda `use cache: remote` (Redis/KV) lazımdır.
- **`revalidatePath`-i "hər yeri təzələyən" universal həll kimi işlətmək**
  — çoxlu path-i əhatə edən data üçün `revalidateTag` daha effektivdir;
  hər path-i əl ilə sadalamaq miqyaslanmır.
- **Draft Mode ilə `use cache`-in qarşılıqlı əlaqəsini unutmaq** — Draft
  Mode aktivkən cache-lənmiş funksiyalar **hər sorğuda təkrar icra olunur**
  (nəticə saxlanmır) — bu, gözlənilməz performans fərqi kimi görünə bilər.

### 13.5 Trade-off / dizayn sualları

1. `React.cache()`, `use cache`, və brauzerin öz `fetch` keşi (HTTP cache
   header-ləri) arasında məsuliyyət bölgüsünü necə edərdiniz — hansı data
   hansı qatda keşlənməlidir?
2. `revalidateTag` ilə `updateTag` arasında (stale-while-revalidate vs
   dərhal expire) seçim edərkən hansı UX/consistency trade-off-unu
   götürürsünüz?
3. Yüksək trafiklı, çoxsaylı serverless instansiyalı mühitdə in-memory
   `use cache`-in effektivliyi necə azalır, bunun əvəzinə hansı arxitektura
   qərarını verərdiniz?

### 13.6 Mock müsahibə sual-cavabları

**S: React `cache()` ilə Next.js `use cache` arasındaki əsas fərq nədir?**
C: `React.cache()` — request-scoped, yalnız bir server render sorğusu
ərzində yaşayan, framework-dən asılı olmayan memoizasiyadır. `use cache`
— Next.js-in, sorğular **arasında** (build-dən, ya da runtime-dan) davam
edən, `cacheLife`/`cacheTag` ilə idarə olunan keşidir. İkisi fərqli
"ömür"ə malikdir və `use cache` daxilində `React.cache`-in öz izolə
scope-u var (parent-dən görünməz).

**S: `cache()`-in arqument müqayisəsi necə işləyir, obyektlərlə niyə
problemli olur?**
C: `Object.is()` (shallow, referens) müqayisəsi işlədilir. Primitivlər
üçün problemsizdir, amma hər render-də yeni yaradılan obyekt/array
arqumentləri **həmişə fərqli referens** olduğu üçün cache heç vaxt hit
olmur — ya primitivlərə keçmək, ya da eyni referensi saxlamaq lazımdır.

**S: `revalidateTag` və `updateTag` arasında fərq nədir?**
C: `revalidateTag` stale-while-revalidate məntiqi ilə işləyir — köhnə
dəyər dərhal qaytarılır, arxa planda təzə data gətirilir. `updateTag`
yalnız Server Action daxilindən çağırılır və data-nı **dərhal** expire
edir (stale dövr olmadan).

### 13.7 Mənbələr

- [React – cache() reference](https://react.dev/reference/react/cache) (WebFetch ilə birbaşa oxunub — request-scoped davranış, Object.is müqayisəsi, error caching)
- [Next.js — "use cache" directive reference](https://nextjs.org/docs/app/api-reference/directives/use-cache) (defolt profil dəyərləri, React.cache isolation, revalidation üçlüyü — WebFetch ilə birbaşa oxunub)
- [Next.js — Server Actions & caching/revalidation overview](https://www.aniq-ui.com/en/blog/nextjs-server-actions-caching-revalidation-app-router)

---

## 14. Memoization (`useMemo`, `useCallback`, `memo`, React Compiler)

### 14.1 Niyə vacibdir

Memoization mövzusu, senior/mid sərhədini ən aydın göstərən mövzulardan
biridir: mid-level developer "performans üçün hər yerə `useMemo` qoyaq"
deyir; senior developer bilir ki, **yersiz memoization öz-özlüyündə
performans xərcidir** (müqayisə əməliyyatının, əlavə closure-ların
xərci) və 2025-dən sonra bu qərarın böyük hissəsini **React Compiler**
öz üzərinə götürüb. Bunu bilməmək, həm lazımsız mürəkkəb kod yazmağa, həm
də React Compiler-lə işləyən komandada köhnə vərdişləri davam etdirməyə
səbəb olur.

### 14.2 Konsepsiya — ilk prinsiplərdən

React defolt olaraq **parent render olanda bütün children-i də render
edir** — uşaq komponentin öz props-u dəyişməsə belə. Bu, bilərəkdən
sadə bir modeldir (hər şeyi yenidən hesablamaq, "nə dəyişib" sualını
verməkdən asandır); əvəzində, ağır komponentlər üçün lazımsız iş yaranır.

Üç alət, üç fərqli problemi həll edir:
- **`useMemo`** — bir **dəyərin** hesablanmasını yaddaşda saxlayır
  (dependency array dəyişənədək). Problem: **hesablama** bahalıdır.
- **`useCallback`** — bir **funksiya referensini** saxlayır (əks halda
  hər render-də yeni funksiya = yeni referens). Problem: **referens
  sabitliyi** lazımdır (məs. `memo`-lu child-a ötürülən callback, ya da
  Effect dependency-si).
- **`memo`** — komponentin özünü, **props shallow-equal qalanda** yenidən
  render etməkdən qoruyur. Problem: **render** bahalıdır, props çox vaxt
  dəyişmir.

**`memo`-nun sənədləşdirilmiş, tez-tez unudulan iki istisna:** memo-lanmış
komponent hələ də yenidən render olunur, əgər (1) **öz state-i** dəyişsə,
ya da (2) **işlətdiyi context** dəyişsə — bunlar `memo`-nun "gördüyü"
props-un xaricindədir.

**Boş yerə memoization nə vaxt xərcdir?** Hər `useMemo`/`useCallback`
çağırışı: (a) dependency array-i hər render-də müqayisə edir (kiçik, amma
sıfır deyil xərc), (b) closure-u yaddaşda saxlayır (GC-yə əlavə iş). Əgər
uşaq komponent memo-lanmayıbsa, `useCallback` ilə referensi sabit
saxlamaq **heç bir fayda vermir** — child hələ də hər render-də yenidən
render olunacaq, çünki `memo` yoxdur. React-ın öz tövsiyəsi: "əgər render
gözə görünən lag yaratmırsa, memoization lazım deyil".

**React Compiler (stabilləşmə tarixi doğrulanmış: 2025-ci ilin oktyabrında,
1.0 versiyası ilə stable elan olunub):** build-time-da kodu analiz edib,
**avtomatik** olaraq lazım olan yerlərdə memoization tətbiq edir — inkişaf
edən mənbələrə görə "95%+ hallarda" `useMemo`/`useCallback`/`memo`
ehtiyacını aradan qaldırır. **Vacib qeyd:** compiler mövcud
`useMemo`/`useCallback` çağırışlarını **əvəz etmir** — onları "dəqiq
nəzarət" üçün escape hatch kimi saxlayır; mövcud kodda bunları kütləvi
silmək tövsiyə olunmur, çünki bəzi effect-lər referens sabitliyinə
(dependency kimi) etibar edə bilər və silinməsi effect-in "həddindən
artıq işə düşməsinə" səbəb ola bilər.

### 14.3 Praktiki nümunələr

```jsx
// useMemo — bahalı HESABLAMA üçün doğru işlədilmə
function ProductList({ products, filter }) {
  const filtered = useMemo(
    () => products.filter(p => p.category === filter), // yalnız products/filter dəyişəndə
    [products, filter]
  );
  return <List items={filtered} />;
}
```

**Edge-case — `useCallback` `memo` olmadan heç bir şey qazandırmır:**

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // ❌ Child memo-lanmayıbsa, bu useCallback TAM MƍNASIZDIR —
  // Child hər halda hər render-də yenidən render olunacaq.
  const handleClick = useCallback(() => console.log('clicked'), []);

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      <Child onClick={handleClick} /> {/* memo YOXDUR */}
    </>
  );
}
function Child({ onClick }) { return <button onClick={onClick}>Click</button>; }
```

```jsx
// ✅ useCallback yalnız Child memo-lanandan sonra mənalıdır
const Child = memo(function Child({ onClick }) {
  return <button onClick={onClick}>Click</button>;
});
```

**Edge-case — `memo` öz state/context dəyişikliyini bloklamır:**

```jsx
const Greeting = memo(function Greeting({ name }) {
  const theme = useContext(ThemeContext); // context dəyişsə, memo İŞLƍMİR
  const [greeting] = useState('Hello');   // öz state-i dəyişsə də, memo İŞLƍMİR
  return <h3 className={theme}>{greeting}, {name}!</h3>;
});
```

**Edge-case — obyekt/funksiya prop `memo`-nu sındırır:**

```jsx
function Parent({ name, age }) {
  return <Profile person={{ name, age }} />; // ❌ hər render-də YENİ obyekt → memo faydasız
}
const Profile = memo(function Profile({ person }) { /* ... */ });
```

### 14.4 Senior-level tələlər

- **Yersiz `useMemo`/`useCallback` ilə kodu "oxunmaz" etmək, faydasız
  performans qazancı üçün** — hər hook çağırışının öz xərci var; ölçmədən
  (React DevTools Profiler-siz) tətbiq etmək, "premature optimization"-un
  klassik nümunəsidir (Part 4-də ətraflı).
- **`memo`-nun context/state istisnasını unutub, "memo qoydum, niyə hələ
  render olunur" debug-unda vaxt itirmək.**
- **React Compiler aktiv olan kodda köhnə `useMemo`/`useCallback`-ləri
  kor-koranə silmək** — effect dependency-lərinin referens sabitliyinə
  etibar etdiyi yerlərdə bu, effect-in davranışını dəyişə bilər (over-
  firing riski, sənədləşdirilib).
- **Deep equality müqayisəsi olan custom `arePropsEqual` yazmaq** — React
  sənədləri açıq xəbərdarlıq edir: bu, məlumat strukturu böyüdükcə
  saniyələrlə donmaya səbəb ola bilər; shallow-dan kənara çıxmaq nadir
  hallarda doğrudur.

### 14.5 Trade-off / dizayn sualları

1. React Compiler aktivləşdirilmiş bir kod bazasında, mövcud
   `useMemo`/`useCallback`-ləri "təmizləmək" nə vaxt dəyər, nə vaxt risk
   daşıyır? Hansı testlə (effect-lərin dependency-lərini audit etməklə)
   qərar verərsiniz?
2. `memo` ilə "state-i aşağı itələmək" (state-i local saxlayıb parent-i
   kiçik tutmaq) arasında hansı halda hansı yanaşma daha sadə/effektivdir?
3. Performans profilinq etmədən memoization tətbiq etməyin komandanızda
   yaratdığı "cargo cult" riskini necə idarə edərsiniz (kod review
   qaydaları, linter, təlim)?

### 14.6 Mock müsahibə sual-cavabları

**S: `useMemo`, `useCallback`, `memo` — hansı nə vaxt işlədilir?**
C: `useMemo` — bahalı bir **dəyər** hesablamasını yaddaşda saxlamaq üçün.
`useCallback` — bir **funksiya referensini** sabit saxlamaq üçün (əsasən
`memo`-lu child-a ötürüləndə, ya da Effect dependency-si kimi). `memo` —
komponentin özünü, props shallow-equal qalanda, yenidən render etməkdən
qorumaq üçün. Üçü fərqli problemləri həll edir, qarşılıqlı əvəzedici deyil.

**S: `memo` işlətdiyim komponent niyə hələ də hər render-də yenidən
render olunur?**
C: İki sənədləşdirilmiş istisna var: komponentin öz state-i dəyişibsə,
ya da işlətdiyi context dəyişibsə — `memo` yalnız **props**-a baxır, bu
ikisinə baxmır. Üçüncü ehtimal: props arasında hər render-də yeni
yaradılan obyekt/funksiya var (shallow equality pozulur).

**S: React Compiler `useMemo`/`useCallback`-i tam əvəz edirmi?**
C: Yeni kodda əksəriyyət halda ehtiyacı aradan qaldırır (compiler avtomatik
memoize edir). Amma bu hook-lar "escape hatch" olaraq qalır — dəqiq
nəzarət lazım olduqda əl ilə işlədilə bilər. Mövcud kodda onları kütləvi
silmək tövsiyə olunmur, çünki effect-lər referens sabitliyinə etibar edə
bilər.

### 14.7 Mənbələr

- [React – memo() reference](https://react.dev/reference/react/memo) (WebFetch ilə birbaşa oxunub — shallow equality, context/state istisnası, custom arePropsEqual xəbərdarlığı)
- [React – React Compiler Introduction](https://react.dev/learn/react-compiler/introduction)
- [adeelhere.com — Migration Guide to React Compiler 1.0](https://adeelhere.com/blog/2026-03-24-react-compiler-migration-guide) (2026-cı il tarixli, stabilləşmə və migration risklərinə dair — ikinci dərəcəli mənbə, əsas iddia React-ın öz sənədləri ilə üst-üstə düşür)

---

## 15. Transitions (`useTransition`, `startTransition`)

### 15.1 Niyə vacibdir

Transitions, Concurrent Rendering-in (bölmə 5) ən çox istifadə olunan
"ictimai üzü"dür — amma onun **dəqiq semantikası** (nə transition sayılır,
nə sayılmır) sənədlərdə açıq yazılsa da, praktikada tez-tez səhv tətbiq
olunur, xüsusən `async`/`await` ilə birlikdə. Bu bölmə, digər bölmələrdəki
(5, 6) konsepsiyaların **API səviyyəsində** necə tətbiq olunduğunu
göstərir.

### 15.2 Konsepsiya — ilk prinsiplərdən

`startTransition(callback)` çağırıldıqda, **callback dərhal, sinxron
icra olunur** — "sonraya planlaşdırılmır". Fərq ondadır ki, callback-in
icrası **zamanı** çağırılan (sinxron) `setState`-lər aşağı prioritetli
lane-ə (bax bölmə 3, 5) yazılır — bu, onları **interrupt-a açıq** və
Suspense-in artıq-göstərilmiş content-i gizlətməsinin **qarşısını alan**
edir.

**Bunun sərhədləri (React sənədlərində konkret sadalanıb, hamısı
WebFetch ilə doğrulanıb):**

1. **`setTimeout` daxili state update-lər transition sayılmır** —
   `startTransition(() => setTimeout(() => setState(x), 1000))` işləmir,
   çünki `setTimeout`-un callback-i `startTransition`-un sinxron icra
   pəncərəsindən **kənarda** işə düşür. Düzgün forma:
   `setTimeout(() => startTransition(() => setState(x)), 1000)`.
2. **`await`-dən sonrakı update-lər avtomatik transition sayılmır** —
   `startTransition(async () => { await x(); setState(y); })`-də
   `setState(y)` transition **deyil**, çünki JS-in async context-i
   `await`-dən sonra "itir". Bunun **sənədləşdirilmiş** həlli: `await`-dən
   sonra **yenidən** `startTransition` ilə bükmək. React sənədləri bunu
   "AsyncContext gələndə düzələ biləcək bilinən məhdudiyyət" kimi
   xarakterizə edir.
3. **Controlled input dəyərləri transition-a uyğun deyil** — inputun
   `value`-sunu idarə edən state transition daxilinə salınsa, input
   "gecikmiş" hiss olunur (yazı görünmür); bunun üçün `useDeferredValue`
   və ya iki ayrı state (biri dərhal input üçün, biri transition-da
   nəticə üçün) tövsiyə olunur.
4. **Çoxsaylı ardıcıl transition-lar hazırda birlikdə batch olunur** —
   React sənədləri bunu **hazırkı bir məhdudiyyət** kimi qeyd edir, gələcək
   versiyada dəyişə bilər (bu, "əminlik dərəcəsi" ilə qeyd olunmalı bir
   nüans — hazırkı davranış, gələcək dəyişə bilər).

### 15.3 Praktiki nümunələr

```jsx
// ✅ Doğru: setTimeout XARİCİNDƍ startTransition
function ScheduleNavigation() {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    setTimeout(() => {
      startTransition(() => {
        setPage('/about'); // İNDİ düzgün transition sayılır
      });
    }, 1000);
  }
  return <button onClick={handleClick} disabled={isPending}>Get</button>;
}
```

```jsx
// ✅ Doğru: await-dən sonra YENİDƍN startTransition
function SubmitForm() {
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    startTransition(async () => {
      await saveToServer(); // bura qədər transition
      startTransition(() => {
        setStatus('saved'); // await-dən SONRA, YENİDƍN bükülüb
      });
    });
  }
  return <button onClick={handleSubmit} disabled={isPending}>Save</button>;
}
```

**Edge-case — controlled input-u transition-a salmaq:**

```jsx
// ❌ input value transition-da — yazı "gecikmiş" görünür
function SearchBox() {
  const [text, setText] = useState('');
  const [, startTransition] = useTransition();

  function handleChange(e) {
    startTransition(() => {
      setText(e.target.value); // ❌ input dəyəri buradan gəlir, gecikir
    });
  }
  return <input value={text} onChange={handleChange} />;
}
```

```jsx
// ✅ İki state: biri dərhal (input), biri transition-da (nəticə üçün)
function SearchBox() {
  const [input, setInput] = useState('');       // dərhal, transition-suz
  const deferredInput = useDeferredValue(input); // aşağı prioritetli "kölgə" dəyər

  function handleChange(e) {
    setInput(e.target.value); // input HƍMİŞƍ dərhal cavab verir
  }
  return (
    <>
      <input value={input} onChange={handleChange} />
      <SearchResults query={deferredInput} /> {/* nəticələr gecikə bilər, bu OK-dir */}
    </>
  );
}
```

### 15.4 Senior-level tələlər

- **`startTransition`-un callback-ini "planlaşdırılan" güman etmək** —
  callback dərhal, sinxron çağırılır; yalnız onun DAXİLİNDƍKİ sinxron
  `setState`-lər aşağı prioritet alır.
- **`await`-dən sonra `setState`-i yenidən bükməyi unutmaq** — nəticədə
  async server action bitəndən sonrakı UI yeniləməsi **urgent** (yüksək
  prioritet) sayılır, gözlənilməz "flash" effektləri yaradır (məs.
  Suspense-in artıq göstərilmiş content-i gizlətməsi, bax bölmə 6).
- **Race condition-ları `await` + sürətli ardıcıl çağırışla yaratmaq** —
  React sənədləri açıq deyir ki, bu ssenaridə nəticələr sıra-pozğun
  gələ bilər; sıralama qarantısı lazımdırsa `useActionState`/`<form>`
  action-ları işlədilməli (bax bölmə 12).
- **`isPending`-i "network sorğusu davam edir" ilə eyniləşdirmək** —
  `isPending` yalnız **React-ın öz render işinin** vəziyyətini göstərir;
  transition daxilində `await` edilən network sorğusunun öz status-u
  fərqli bir şeydir (bunlar tez-tez üst-üstə düşür, amma konseptual
  olaraq ayrıdır).

### 15.5 Trade-off / dizayn sualları

1. `useTransition` ilə `useDeferredValue` arasında seçim edərkən hansı
   meyarı götürürsünüz — "mənim `set` funksiyama girişim var, ya yox"
   sualı kifayət edirmi?
2. Server Action-ları çağıran transition-larda sıralama qarantısı lazım
   olan hallarda, `useActionState`-ə keçidin əlavə mürəkkəbliyi nə vaxt
   dəyər?
3. `startTransition`-un "callback dərhal icra olunur, amma daxili
   update-lər gecikir" semantikasını komandanıza necə izah edərdiniz — bu
   fərqi nümayiş etdirən hansı minimal nümunəni göstərərdiniz?

### 15.6 Mock müsahibə sual-cavabları

**S: `startTransition`-un callback-i nə vaxt icra olunur — dərhal, yoxsa
sonraya planlaşdırılır?**
C: Dərhal, sinxron. Fərq odur ki, bu icra zamanı sinxron çağırılan
`setState`-lər "Transition" kimi işarələnir — aşağı prioritetli lane-ə
düşür, interrupt-a açıq olur, artıq göstərilmiş content-i gizlətmir.

**S: `startTransition(async () => { await x(); setState(y); })`-də
`setState(y)` transition sayılırmı?**
C: Xeyr, sənədləşdirilmiş məhdudiyyətdir — `await`-dən sonra JS-in async
context-i itir. Düzgün həll: `await`-dən sonra `setState`-i yenidən
`startTransition` ilə bükmək.

**S: Transitions controlled input-larla niyə uyğunsuzdur?**
C: İnput-un `value`-sunu idarə edən state transition-a salınsa, dəyər
aşağı prioritetli olduğu üçün yazı "gecikmiş" hiss olunur — istifadəçi
klaviaturada yazdığını dərhal ekranda görmür. Bunun əvəzinə iki state
(dərhal input, gecikən "kölgə" dəyər `useDeferredValue` ilə) işlədilir.

### 15.7 Mənbələr

- [React – useTransition reference](https://react.dev/reference/react/useTransition) (WebFetch ilə birbaşa oxunub — setTimeout/await məhdudiyyətləri, controlled input qeydi, batching limitasiyası, race condition xəbərdarlığı)
- [React – useDeferredValue reference](https://react.dev/reference/react/useDeferredValue)
- [React – Suspense reference](https://react.dev/reference/react/Suspense) (Transition + Suspense qarşılıqlı əlaqəsi üçün)

---

## Ümumi qeyd — versiya vəziyyəti (2026-cı ilin ortası)

Bu sənəddə istinad olunan konkret versiya/tarix faktları (WebFetch ilə
rəsmi sənədlərdən doğrulanmış):

- React: stabil xətt 19.x (v19.2.7 / v19.1.8, 2026-cı ilin iyun ayı). Rəsmi
  "React 20" buraxılışı **yoxdur** — bu adla gəzən bəzi bloq
  başlıqları spekulyativdir, react.dev/blog-da təsdiqlənməyib.
- React Compiler: 1.0, stabil, 2025-ci ilin oktyabrında.
- Next.js: 16.x xətt (sənəd nüsxələri `version: 16.2.10`, `lastUpdated:
  2026-05-13` göstərir). Cache Components (PPR-in stabil forması) Next.js
  16.0.0-dan bəri defolt/stabil; `experimental.ppr`, `experimental.dynamicIO`,
  `experimental.useCache` bayraqları silinib, `cacheComponents: true` ilə
  əvəzlənib.

**Zəif/ziddiyyətli tapılan yerlər:**
- Fiber-in ilkin (2016-2017) sənədləşməsi (`acdlite/react-fiber-architecture`)
  strukturca doğru qalır, amma prioritet sistemi (`expirationTime`) haqqında
  hissəsi köhnəlmişdir — bu sənəddə hər yerdə "legacy" kimi işarələnib, əvəzinə
  Lanes modeli əsas götürülüb.
- React Compiler-in konkret faiz statistikaları ("20-60% daha az re-render",
  "95%+ hallarda ehtiyacı aradan qaldırır") ikinci dərəcəli bloqlardan
  (dev.to, şəxsi bloqlar) gəlir, React-ın öz rəsmi sənədləri bu dəqiq
  faizləri təsdiqləmir — ümumi istiqamət (compiler əksər hallarda əl ilə
  memoization ehtiyacını azaldır) React-ın öz sənədləri ilə üst-üstə düşür,
  amma **konkret faizlərə** ehtiyatla yanaşılmalıdır.
- Next.js-in `use cache`/Cache Components sənədləri çox təzədir (2026-cı il
  may tarixli) — bu, sürətlə dəyişən sahə olduğu üçün, oxucu tətbiq
  etməzdən əvvəl öz Next.js versiyasının rəsmi sənədini yoxlamalıdır.
