# Zustand ilə State İdarəetməsi — Sıfırdan Praktiki Səviyyəyə

Bu kurs [Zustand](https://github.com/pmndrs/zustand) kitabxanasını — React üçün minimal, sadə state (vəziyyət) idarəetmə həllini — sıfırdan öyrədir. Kursu bitirəndə store yarada, komponentlərdə istifadə edə, performansı selector-larla optimallaşdıra, middleware-lərlə (persist, immer, devtools) işləyə və TypeScript ilə tip-təhlükəsiz store qura biləcəksən.

Kurs React ilə praktiki iş təcrübəsi olan, amma Zustand-ı ilk dəfə görən developer üçün nəzərdə tutulub.

## Ön biliklər

- JavaScript/TypeScript əsasları (funksiyalar, destructuring, async/await)
- React əsasları: komponent, hook (`useState`, `useEffect`), props
- npm/yarn ilə paket quraşdırma təcrübəsi

## Məzmun

1. [Zustand nədir və niyə lazımdır](#1-zustand-nədir-və-niyə-lazımdır)
2. [Quraşdırma](#2-quraşdırma)
3. [İlk store-un yaradılması](#3-ilk-store-un-yaradılması)
4. [Store-u komponentlərdə istifadə etmək](#4-store-u-komponentlərdə-istifadə-etmək)
5. [Selector-larla performans optimallaşdırması](#5-selector-larla-performans-optimallaşdırması)
6. [`get()` ilə state oxumaq və async əməliyyatlar](#6-get-ilə-state-oxumaq-və-async-əməliyyatlar)
7. [State-i tam əvəz etmək](#7-state-i-tam-əvəz-etmək)
8. [React-dan kənar istifadə: vanilla store](#8-react-dan-kənar-istifadə-vanilla-store)
9. [Middleware-lər](#9-middleware-lər)
10. [TypeScript ilə Zustand](#10-typescript-ilə-zustand)
11. [Praktiki pattern-lər](#11-praktiki-pattern-lər)
12. [Zustand vs Redux vs Context](#12-zustand-vs-redux-vs-context)
13. [Tez-tez rast gəlinən səhvlər](#13-tez-tez-rast-gəlinən-səhvlər)
14. [Praktika: Alış-veriş səbəti (shopping cart) store-u](#14-praktika-alış-veriş-səbəti-shopping-cart-store-u)
15. [Xülasə](#15-xülasə)
16. [Əlavə mənbələr](#16-əlavə-mənbələr)

---

## 1. Zustand nədir və niyə lazımdır

Zustand — React üçün minimal, "unopinionated" (öz qaydalarını sənə sırımayan) state idarəetmə kitabxanasıdır. "Flux" prinsiplərinin sadələşdirilmiş versiyası üzərində qurulub. Adı alman dilində "vəziyyət, hal" mənasını verən "Zustand" sözündəndir.

Redux-dan fərqli olaraq:

- **Provider tələb etmir.** Redux-da tətbiqi `<Provider store={store}>` ilə bürüməlisən. Zustand-da store sadəcə bir hook-dur, birbaşa import edib istifadə edirsən.
- **Boilerplate yoxdur.** Action type-ları, action creator-lar, reducer switch-case-ləri yazmağa ehtiyac yoxdur.
- **Selector-lar defolt performanslıdır.** Komponent yalnız seçdiyi hissə dəyişəndə yenidən render olunur.

Zustand həmçinin React-ın bəzi məlum problemlərini həll edir:

- **"Zombie child" problemi** — uşaq komponentin köhnəlmiş (stale) props ilə render olunması.
- **React concurrency** məsələləri — parıltılı (tearing) render-lərin qarşısını almaq.
- **Context itkisi** — müxtəlif renderer-lər (məsələn, React DOM və React Native eyni kod bazasında) arasında state-in itməməsi.

> **Niyə vacibdir:** Kiçik layihədə `useState`/`useContext` kifayət edir, amma tətbiq böyüdükcə çoxlu komponent arasında paylaşılan state üçün context "prop drilling" və lazımsız render problemlərinə səbəb olur. Zustand bu problemi minimal kodla həll edir.

## 2. Quraşdırma

Zustand-ı npm ilə quraşdır:

```bash
npm install zustand
```

Yarn və ya pnpm istifadə edirsənsə:

```bash
yarn add zustand
# və ya
pnpm add zustand
```

Əlavə konfiqurasiya, provider, ya da tənzimləmə lazım deyil — quraşdırdıqdan sonra birbaşa `create` funksiyasını import edib işə başlaya bilərsən.

## 3. İlk store-un yaradılması

Zustand-da store `create` funksiyası ilə yaradılır. Bu funksiya bir **hook qaytarır** — həmin hook sənin store-undur.

```javascript
import { create } from 'zustand'

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))
```

Nə baş verir burda:

- `create`-ə verdiyin funksiya `set` parametrini alır və **başlanğıc state + action-ları olan bir obyekt** qaytarır.
- `bears: 0` — state-in özü.
- `increasePopulation` və `removeAllBears` — state-i dəyişən funksiyalar (Redux-dakı "action"-ların analoqu, amma reducer/dispatch olmadan).
- `set` funksiyası verdiyin obyekti **mövcud state ilə merge edir** (üzərinə yazır, tam əvəz etmir) — defolt davranış budur.

> **Vacib qayda:** State-i birbaşa mutasiya etmə (`state.bears++` kimi). Həmişə `set` vasitəsilə, immutable şəkildə yeni state qaytar. Zustand dəyişikliyi strict equality (`===`) ilə aşkarlayır — mutasiya etsən, referans dəyişmədiyi üçün React yenidən render etməyəcək.

## 4. Store-u komponentlərdə istifadə etmək

Yaradılan hook adi React hook-u kimi işlədilir — heç bir Provider lazım deyil:

```jsx
function BearCounter() {
  const bears = useBearStore((state) => state.bears)
  return <h1>{bears} ayı var...</h1>
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>bir ədəd artır</button>
}
```

Diqqət et: hook-a bir **selector funksiyası** ötürülür — `(state) => state.bears`. Bu, store-un tam obyektini yox, yalnız lazım olan hissəsini "seçir". Nəticədə:

- `BearCounter` yalnız `bears` dəyişəndə yenidən render olunur.
- `Controls` heç vaxt yenidən render olunmur, çünki `increasePopulation` funksiyası heç dəyişmir.

Bu, Redux-dakı `useSelector` ilə demək olar eynidir, sadəcə əlavə `useSelector` import etməyə ehtiyac yoxdur — bu davranış birbaşa hook-un öz içindədir.

## 5. Selector-larla performans optimallaşdırması

Tək bir sahə seçəndə (`state.bears` kimi) strict equality kifayət edir. Amma **bir neçə sahəni obyekt və ya array kimi** qaytarsan, problem yaranır:

```javascript
// PROBLEM: hər render-də yeni obyekt yaranır → strict equality həmişə "fərqli" görür
const { nuts, honey } = useBearStore((state) => ({
  nuts: state.nuts,
  honey: state.honey,
}))
```

Bu kod işə düşür, amma store-da **hər hansı** sahə dəyişəndə komponent yenidən render olunur — çünki `(state) => ({...})` hər çağırışda təzə obyekt yaradır, referans müqayisəsi uğursuz olur.

Həll — `useShallow`:

```javascript
import { useShallow } from 'zustand/react/shallow'

const { nuts, honey } = useBearStore(
  useShallow((state) => ({ nuts: state.nuts, honey: state.honey })),
)
```

`useShallow` qaytarılan obyektin **sahələrini** (bir səviyyə dərinlikdə) müqayisə edir, obyektin özünün referansını yox. Beləliklə, yalnız `nuts` və ya `honey` həqiqətən dəyişəndə render baş verir.

> **Tez-tez edilən səhv:** Selector-da obyekt/array qaytarıb `useShallow` işlətməməyi unutmaq — nəticədə komponent store-dakı əlaqəsiz dəyişikliklərdə də render olunur, performans problemi yaranır.

## 6. `get()` ilə state oxumaq və async əməliyyatlar

`create`-ə verilən funksiya təkcə `set` yox, həm də `get` parametrini alır. `get()` action daxilində **cari state-i sinxron oxumağa** imkan verir:

```javascript
const useSoundStore = create((set, get) => ({
  sound: 'grunt',
  action: () => {
    const sound = get().sound
    console.log(`Hazırkı səs: ${sound}`)
  },
}))
```

Zustand async əməliyyatlara heç bir məhdudiyyət qoymur — sadəcə `await`-dən sonra `set` çağır:

```javascript
const useFishStore = create((set) => ({
  fishies: {},
  fetch: async (pond) => {
    const response = await fetch(pond)
    const data = await response.json()
    set({ fishies: data })
  },
}))
```

Bu, Redux-dakı thunk/saga kimi əlavə middleware tələb etmir — adi `async function` kifayətdir.

## 7. State-i tam əvəz etmək

`set` defolt olaraq **merge** edir (üzərinə yazır). Bəzən tam əvəz etmək (bütün köhnə sahələri silmək) lazımdır — bunun üçün `set`-in ikinci parametri `true` verilir:

```javascript
const useFishStore = create((set) => ({
  salmon: 1,
  tuna: 2,
  // hər şeyi silir, state-i boş obyektlə əvəz edir
  deleteEverything: () => set({}, true),
  // yalnız `tuna`-nı silir, qalanını saxlayır
  deleteTuna: () => set(({ tuna, ...rest }) => rest, true),
}))
```

`deleteTuna` nümunəsində diqqət et: funksiya cari state-i alır, destructuring ilə `tuna`-nı ayırır, qalan sahələri (`rest`) qaytarır və `true` ilə "bunu tam state kimi qəbul et" deyir.

## 8. React-dan kənar istifadə: vanilla store

Zustand-ın nüvəsi React-a bağlı deyil. `zustand/vanilla`-dan `createStore` ilə React olmadan da store yaratmaq mümkündür (məsələn, adi JS modulunda, ya da başqa framework-də):

```javascript
import { createStore } from 'zustand/vanilla'

const store = createStore((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))

const { getState, setState, subscribe, getInitialState } = store
```

React tərəfindən yaradılan `create` hook-unun özü də bu üsullara (metodlara) birbaşa çıxış verir — komponentdən kənarda, məsələn bir event listener-də və ya utility funksiyada:

```javascript
const useDogStore = create(() => ({ paw: true, snout: true, fur: true }))

// Komponentdən kənar oxumaq
const paw = useDogStore.getState().paw

// Dəyişikliklərə abunə olmaq
const unsub = useDogStore.subscribe((state) => console.log(state))

// Komponentdən kənar yazmaq
useDogStore.setState({ paw: false })

// Abunəlikdən çıxmaq
unsub()
```

> **Niyə faydalıdır:** Analitika kodu, WebSocket handler-ı, ya da React-dan asılı olmayan util funksiya store-a toxunmaq istəyəndə hook çağırmağa (`useDogStore()`) ehtiyac yoxdur — `getState()`/`setState()` kifayətdir.

## 9. Middleware-lər

Zustand-ın middleware sistemi `create`-ə verilən funksiyanı "sarıyaraq" (wrap edərək) ona əlavə davranış qatır. Middleware-lər bir-birinin içinə keçirilə (compose oluna) bilər.

### 9.1 `persist` — brauzer yaddaşına saxlama

Store-u `localStorage`/`sessionStorage`-a avtomatik yazıb-oxumaq üçün:

```javascript
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useFishStore = create(
  persist(
    (set, get) => ({
      fishes: 0,
      addAFish: () => set({ fishes: get().fishes + 1 }),
    }),
    {
      name: 'food-storage', // localStorage/sessionStorage-dakı açar (key) adı
      storage: createJSONStorage(() => sessionStorage), // defolt: localStorage
    },
  ),
)
```

Səhifə yenilənəndə (`refresh`) `fishes` sahəsi avtomatik bərpa olunur, çünki `persist` hər `set` çağırışından sonra state-i seçdiyin storage-a yazır və tətbiq açılanda oradan oxuyur.

### 9.2 `immer` — mutasiya sintaksisi ilə immutable update

Dərin iç-içə (nested) obyektləri yeniləmək adi Zustand-da yorucu ola bilər (`...state.a.b.c` spread zənciri). `immer` middleware-i "mutasiya kimi görünən, əslində immutable" sintaksis verir:

```javascript
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const useBeeStore = create(
  immer((set) => ({
    bees: 0,
    addBees: (by) =>
      set((state) => {
        state.bees += by // birbaşa "mutasiya" kimi yazılır, immer arxada immutable dəyişiklik edir
      }),
  })),
)
```

Middleware istifadə etmədən eyni effekti birbaşa `immer`-in `produce` funksiyası ilə də almaq olar:

```javascript
import { produce } from 'immer'

const useLushStore = create((set) => ({
  lush: { forest: { contains: { a: 'bear' } } },
  clearForest: () =>
    set(
      produce((state) => {
        state.lush.forest.contains = null
      }),
    ),
}))
```

### 9.3 `subscribeWithSelector` — seçici abunəlik

Defolt `subscribe` bütün state dəyişikliyində işə düşür. `subscribeWithSelector` yalnız **müəyyən sahə** dəyişəndə işə düşən abunəlik yaratmağa imkan verir:

```javascript
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

const useDogStore = create(
  subscribeWithSelector(() => ({ paw: true, snout: true })),
)

// Yalnız `paw` dəyişəndə işə düşür, əvvəlki dəyəri də verir
const unsub = useDogStore.subscribe(
  (state) => state.paw,
  (paw, previousPaw) => console.log(paw, previousPaw),
)

// Bir neçə sahəni izləmək, shallow müqayisə ilə
const unsub2 = useDogStore.subscribe(
  (state) => [state.paw, state.fur],
  console.log,
  { equalityFn: shallow, fireImmediately: true },
)
```

### 9.4 `devtools` — Redux DevTools inteqrasiyası

Brauzerin Redux DevTools extension-unda store-u izləmək üçün:

```javascript
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useBearStore = create(
  devtools((set) => ({
    fishes: 10,
    eatFish: () =>
      set(
        (prev) => ({ fishes: prev.fishes > 1 ? prev.fishes - 1 : 0 }),
        undefined,
        'bear/eatFish', // DevTools-da görünəcək action adı
      ),
  })),
)
```

Konfiqurasiya:

```javascript
devtools(/* store funksiyası */ (set) => ({}), {
  name: 'MyStore',
  enabled: process.env.NODE_ENV !== 'production',
  anonymousActionType: 'unknown',
})
```

> **Niyə vacibdir:** `devtools` production-da lazımsız overhead yaratmasın deyə `enabled` bayrağı ilə söndürülməlidir — yuxarıdakı nümunədə bunu `NODE_ENV` yoxlaması ilə edirik.

### 9.5 `redux` — ənənəvi reducer pattern-i

Redux-dan gələnlər üçün tanış `type`/`reducer` üsulu ilə də store qurmaq mümkündür:

```javascript
import { create } from 'zustand'
import { redux } from 'zustand/middleware'

const types = { increase: 'INCREASE', decrease: 'DECREASE' }

const reducer = (state, { type, by = 1 }) => {
  switch (type) {
    case types.increase:
      return { grumpiness: state.grumpiness + by }
    case types.decrease:
      return { grumpiness: state.grumpiness - by }
    default:
      return state
  }
}

const useGrumpyStore = create(redux(reducer, { grumpiness: 0 }))
```

Middleware-ləri birləşdirmək (compose) mümkündür — məsələn `devtools(persist(...))` — hər middleware əvvəlkinin üzərinə əlavə davranış qatır.

## 10. TypeScript ilə Zustand

TypeScript-də `create` funksiyasına state tipini **generic** kimi ötürmək lazımdır. Diqqət et: çağırış iki hissəlidir — `create<Tip>()(...)` (boş mötərizə + əsl funksiya):

```typescript
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // devtools tipləri üçün

interface BearState {
  bears: number
  increase: (by: number) => void
}

const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
      }),
      { name: 'bear-storage' },
    ),
  ),
)
```

> **Niyə boş `()` var:** Bu, TypeScript-in generic çıxarımı (inference) ilə bağlı texniki bir "curry" hiylədir — `create<BearState>()` state tipini bərkidir, sonra gələn funksiya arqumentini ayrıca yoxlayır. Bunu unutsan, middleware-lərin tip zənciri düzgün işləməyə bilər.

## 11. Praktiki pattern-lər

### 11.1 Slices Pattern — böyük store-u bölmək

Store böyüdükcə hər şeyi bir faylda saxlamaq çətinləşir. Store-u məntiqi "slice"-lara bölüb sonra birləşdirmək olar:

```typescript
// bir slice - balıq ilə bağlı state və action-lar
const createFishSlice = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
})

// başqa slice - ayı ilə bağlı state və action-lar
const createBearSlice = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
})

// hər iki slice-ı bir store-da birləşdirmək
const useBoundStore = create((...a) => ({
  ...createFishSlice(...a),
  ...createBearSlice(...a),
}))
```

Bu üsulla hər slice ayrı fayla çıxarıla bilər, komponent isə yenə tək bir `useBoundStore` hook-undan istifadə edir.

### 11.2 Transient Updates — render tetiklmədən dəyər izləmək

Bəzən dəyəri izləmək istəyirsən, amma dəyişəndə komponentin yenidən render olmasını istəmirsən (məsələn, animasiya üçün `ref`-ə yazmaq):

```javascript
const useScratchStore = create(() => ({ scratches: 0 }))

function Component() {
  const scratchRef = useRef(useScratchStore.getState().scratches)

  useEffect(() =>
    useScratchStore.subscribe(
      (state) => (scratchRef.current = state.scratches),
    ), [])

  // scratchRef.current dəyişəndə komponent YENİDƏN RENDER OLUNMUR
}
```

### 11.3 Context ilə inteqrasiya (dependency injection)

Adətən Zustand-a Provider lazım deyil, amma **eyni komponentin bir neçə nüsxəsinin hər birinin öz store-u olmasını** istəsən (məsələn, bir siyahıdakı hər element öz state-inə malikdirsə), vanilla store-u Context ilə birləşdirmək olar:

```jsx
import { createContext, useContext } from 'react'
import { createStore, useStore } from 'zustand'

const createBearStore = () => createStore((set) => ({
  bears: 0,
  increase: () => set((s) => ({ bears: s.bears + 1 })),
}))

const BearStoreContext = createContext(null)

function BearProvider({ children }) {
  const [store] = useState(createBearStore)
  return (
    <BearStoreContext.Provider value={store}>
      {children}
    </BearStoreContext.Provider>
  )
}

function BearCounter() {
  const store = useContext(BearStoreContext)
  const bears = useStore(store, (state) => state.bears) // vanilla store + selector
  return <span>{bears}</span>
}
```

> **Niyə faydalıdır:** Adi Zustand store-u **global**-dır (bütün tətbiqdə bir dənə). Context ilə birləşdirəndə hər `<BearProvider>` öz izolə olunmuş store nüsxəsini yaradır — məsələn, bir səhifədə eyni komponentdən bir neçə müstəqil instansiya lazım olanda.

## 12. Zustand vs Redux vs Context

| Meyar | Zustand | Redux | React Context + useState |
|---|---|---|---|
| Boilerplate | Minimal | Çox (action, reducer, dispatch) | Az, amma böyüdükcə çətinləşir |
| Provider tələb olunur? | Yox (defolt) | Bəli | Bəli |
| Selektiv render | Defolt (selector) | `useSelector` ilə | Yoxdur — context dəyişəndə bütün consumer-lar render olunur |
| DevTools | Middleware ilə | Native dəstək | Yoxdur |
| React-dan kənar istifadə | Bəli (`vanilla`) | Qismən (store obyekti) | Yox |
| Öyrənmə əyrisi | Aşağı | Yüksək | Aşağı (kiçik miqyasda) |

**Redux-a qarşı:** Zustand daha sadə API, hooks-əsaslı dizayn, boilerplate yoxdur, selector-lar vasitəsilə render azaldılır.

**Context-ə qarşı:** Daha az boilerplate, komponent səviyyəsində dəqiq render nəzarəti, mərkəzləşdirilmiş action-əsaslı idarəetmə. `useContext` + `useState` kiçik tətbiqlərdə əladır, amma state böyüdükcə və çox komponent ona abunə olduqca hər dəyişiklik **bütün** context consumer-larını render edir — Zustand bunu selector-larla önləyir.

## 13. Tez-tez rast gəlinən səhvlər

1. **State-i birbaşa mutasiya etmək.** `state.bears++` işləməyəcək — həmişə `set` çağır, yeni obyekt qaytar.
2. **Selector-da obyekt/array qaytarıb `useShallow` işlətməmək.** Nəticə: əlaqəsiz dəyişikliklərdə də render.
3. **`create<Tip>()(...)`-dəki boş mötərizəni unutmaq** — TypeScript-də middleware-lərin tipi düzgün nəticələnmir.
4. **`persist` ilə həssas məlumat saxlamaq.** `localStorage` şifrələnmir — tokenlər, şifrələr kimi məlumatları birbaşa persist etmə.
5. **`devtools`-u production-da açıq saxlamaq.** `enabled` bayrağı ilə söndürülməli, yoxsa lazımsız performans itkisi olur.
6. **Hər komponent üçün ayrı store yaratmaq lazım olanda global store işlətmək.** Bu halda 11.3-də göstərilən Context + vanilla store pattern-i lazımdır.

## 14. Praktika: Alış-veriş səbəti (shopping cart) store-u

Öyrəndiklərini tətbiq etmək üçün aşağıdakı store-u özün yaz (sonra öz həllinlə müqayisə et):

**Tapşırıq:** `useCartStore` adlı bir store yarat:

- `items: { id: string, name: string, price: number, qty: number }[]` — səbətdəki məhsullar.
- `addItem(item)` — məhsul səbətdə varsa `qty`-ni artırsın, yoxdursa əlavə etsin.
- `removeItem(id)` — məhsulu səbətdən çıxarsın.
- `total()` — `get()` istifadə edərək bütün məhsulların cəmini (`price * qty`) hesablasın.
- Store `persist` middleware ilə `localStorage`-a yazılsın ki, səhifə yenilənəndə səbət itməsin.

**Nümunə həll:**

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: number
  qty: number
}

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'qty'>) => void
  removeItem: (id: string) => void
  total: () => number
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
              ),
            }
          }
          return { items: [...state.items, { ...item, qty: 1 }] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
    }),
    { name: 'cart-storage' },
  ),
)
```

Komponentdə istifadəsi:

```jsx
function CartSummary() {
  const items = useCartStore((state) => state.items)
  const total = useCartStore((state) => state.total)

  return (
    <div>
      <p>Məhsul sayı: {items.length}</p>
      <p>Ümumi: {total()} AZN</p>
    </div>
  )
}
```

Bu tapşırığı özün yenidən yazmağa çalış, sonra `removeItem` üçün test əlavə et: bir məhsul əlavə et, sonra sil, `items` boş qalmalıdır.

## 15. Xülasə

- Zustand `create((set, get) => ({...}))` ilə store yaradan minimal state idarəetmə kitabxanasıdır — provider tələb etmir.
- Komponentdə store adi hook kimi çağırılır, **selector** ilə yalnız lazım olan hissə seçilir → lazımsız render-lər önlənir.
- Bir neçə sahəni obyekt/array kimi seçəndə `useShallow` işlət, yoxsa hər dəyişiklikdə render olunar.
- `set`-in ikinci parametri (`true`) state-i merge etmək yerinə **tam əvəz edir**.
- `get()` action daxilində cari state-i sinxron oxumağa imkan verir; async əməliyyatlar üçün əlavə middleware lazım deyil.
- `zustand/vanilla` ilə React-dan asılı olmadan store yaratmaq mümkündür; `getState`/`setState`/`subscribe` komponentdən kənar işlədilə bilər.
- Middleware-lər (`persist`, `immer`, `devtools`, `redux`, `subscribeWithSelector`) store-a əlavə davranış qatır və bir-birinin içinə keçirilə bilər.
- TypeScript-də `create<Tip>()(...)` sintaksisindəki boş mötərizəni unutma.
- Böyük store-lar **slices pattern**-i ilə bölünür; hər komponentin öz store nüsxəsi lazımdırsa, vanilla store + Context işlədilir.
- Redux-la müqayisədə minimal boilerplate, Context-lə müqayisədə daha dəqiq render nəzarəti verir.

## 16. Əlavə mənbələr

- Əsas mənbə: [github.com/pmndrs/zustand](https://github.com/pmndrs/zustand) — rəsmi README, tam API sənədləşməsi və `docs/` qovluğundakı guide-lar.
- Zustand-ın rəsmi sənədləşmə saytı və community nümunələri repo-nun README-sindəki linklərdən əlçatandır.
- Testing və daha irəli TypeScript pattern-ləri üçün repo-nun `docs/guides/` qovluğuna bax.
