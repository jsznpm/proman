# Frontend Architect — Part 6: Vue Kompozisiya Paralleli

> Bu, "Frontend Architect" seriyasının 6-cı hissəsidir (bax:
> `courses/frontend-architect.plan.md`). Part 4–5-də React kompozisiyasına
> baxdıq; burada **eyni fikirlərin Vue-dakı qarşılığı**: Components (SFC),
> Composables, `<script setup>`, provide/inject, state-management, renderless
> komponentlər, data-provider, dynamic & async components, render functions.
> Architect üçün dəyər: **pattern-lər framework-dan asılı deyil** — React
> hook-u = Vue composable-ı, React Context = provide/inject, headless komponent
> = renderless komponent. Bunu görmək stack seçimini (Part 12) qərar məsələsinə
> çevirir, dini məsələyə yox. Qərar çərçivəsi Part 1-dəki kimi. Mənbə:
> patterns.dev / PatternsDev/skills (Vue skill-ləri).

---

## 1. Niyə architect hər iki framework-u "tərcümə" edə bilməlidir

### 1.1 Niyə vacibdir

Kompozisiya, state paylaşımı, davranış/görünüş ayrımı — bunlar **frontend
problemləridir**, React problemləri deyil. React və Vue eyni problemləri fərqli
sintaksislə həll edir. Architect bu tərcümə cədvəlini bilməlidir, çünki:

- Stack seçimi (Part 12) "hansı framework daha yaxşı" deyil, "bu komanda/tələb
  üçün hansı" sualıdır — cavab yalnız ikisini də başa düşəndə obyektivdir.
- Bir framework-dan digərinə keçən komanda pattern-i deyil, sintaksisi öyrənir.

### 1.2 Tərcümə cədvəli (bu part-ın xəritəsi)

| React (Part 4–5) | Vue qarşılığı |
|---|---|
| Custom Hook | **Composable** (`useX`) |
| Function component | **SFC + `<script setup>`** |
| Context / Provider | **provide / inject** |
| Redux / Zustand | **Pinia / `reactive()` store** |
| Headless (render props / hook) | **Renderless komponent (scoped slot)** |
| Data-fetching hook | **Data-provider (renderless)** |
| `React.lazy` / dynamic import | **`defineAsyncComponent`** |
| Şərti komponent seçimi | **`<component :is>`** |
| `createElement` / JSX | **`h()` render function** |

---

## 2. Components (SFC) — Vue-nun tikinti bloku

### 2.1 Konsepsiya

Vue komponenti markup (HTML), məntiq (JS) və stili (CSS) birləşdirir. Modern
standart **Single-File Component** (`.vue`) — üç bölmə:

```html
<template>
  <button @click="increment">Count: {{ count }}</button>
</template>

<script setup>
  import { ref } from "vue";
  const { name } = defineProps(["name"]);
  const count = ref(0);              // primitiv üçün ref()
  const increment = () => { count.value++; };
</script>

<style scoped>/* komponent stili */</style>
```

Reaktivlik: `ref()` primitiv üçün, `reactive()` obyekt üçün; Vue dəyişikliyi
aşkarlayıb render-i avtomatik yeniləyir (arxada **Proxy** — Part 3, bölmə 5).
Data valideyndən uşağa props ilə, uşaqdan valideynə event ilə axır.

### 2.2 Architect qərarı

- UI hissəsi bir neçə dəfə işlədilirsə və ya kifayət qədər mürəkkəbdirsə —
  ayrı komponentə çıxar; böyük komponentin təkrar-istifadə olunan hissələrini
  kiçik uşaq komponentlərə böl (React-dakı kompozisiya prinsipi ilə eyni).

---

## 3. Composables — React hook-un Vue qarşılığı

### 3.1 Konsepsiya

Composable — Vue Composition API ilə stateful məntiqi enkapsulyasiya edən
funksiyadır. Options API-nin parçalanmış təşkilindən funksiya-əsaslı təmiz
yanaşmaya keçid. **React custom hook-u ilə eyni məqsəd, eyni `useX` konvensiyası,
eyni closure mexanizmi:**

```js
import { ref } from "vue";

export function useCounter(initialCount = 0) {
  const count = ref(initialCount);
  const increment = () => count.value++;
  const decrement = () => count.value--;
  return { count, increment, decrement };
}
```

İstifadə: `const { count, increment } = useCounter(0);`

### 3.2 Architect qərarı

- **İstifadə et:** stateful məntiqi komponentlər arası təkrarlamadan paylaşmaq;
  data fetch / event listener / timer-i təkrar-istifadəli funksiyaya çıxarmaq —
  Vue 3-də məntiq paylaşımının **defolt yolu** (React-də custom hook kimi).

> **Niyə vacibdir:** Composable ↔ hook paraleli bütün bu part-ın açarıdır. Part
> 4-də "məntiq paylaşımı → custom hook" dedik; Vue-da eyni cümlə "→ composable".

---

## 4. `<script setup>` — Composition API şəkəri

### 4.1 Konsepsiya

`<script setup>` — SFC-də Composition API üçün compile-time syntactic sugar.
Boilerplate-i silir: top-level binding-lər `return` olmadan avtomatik template-ə
açılır. Xüsusiyyətlər: import olunan komponentlər avtomatik qeydiyyat,
`defineProps()`, `defineEmits()`, TS üçün `withDefaults()`.

```html
<script setup>
  import { ref, onMounted } from "vue";
  const count = ref(0);
  const increment = () => count.value++;
  onMounted(() => console.log("mounted"));
</script>
<template><button @click="increment">Count: {{ count }}</button></template>
```

### 4.2 Architect qərarı

- Vue 3-də SFC + Composition API işlədirsənsə — **tövsiyə olunan sintaksis**;
  böyük komponentlərdə boilerplate azaldır, oxunaqlığı artırır.

---

## 5. provide / inject — React Context-in qarşılığı

### 5.1 Konsepsiya

provide/inject — Vue-nun dependency injection pattern-i: prop-drilling olmadan
data-nı komponent ağacından ötür. `provide()` əcdadda data açır, `inject()`
nə qədər dərində olsa da onu alır:

```html
<!-- valideyn --> <script setup>
  import { provide } from "vue";
  provide("theme", "dark");
</script>

<!-- istənilən dərinlikdə uşaq --> <script setup>
  import { inject } from "vue";
  const theme = inject("theme");
</script>
```

App səviyyəsində də: `app.provide("theme", "dark")`.

### 5.2 Architect qərarı

- **İstifadə et:** cross-cutting concern-lər (tema, lokalizasiya, auth) çoxlu
  iç-içə komponentə; aralıq komponentlərdən prop drilling-dən qaçmaq; app-geniş
  plugin-lər.
- **İstifadə etmə:** props-un aydınlıq verdiyi birbaşa valideyn-uşaq
  kommunikasiyası; komponent provider-siz işləməlidirsə; Pinia onsuz da paylaşılan
  state-i idarə edirsə.

**Trade-off:** props = aydın, izlənə bilən data axını (amma dərin ierarxiyada
əziyyət); provide/inject = aralıq ötürmə yox, birbaşa giriş (amma çoxlu
provider-lı böyük app-də debug mürəkkəbləşir). **React Context ilə eyni
trade-off** (Part 3, bölmə 7).

---

## 6. State-management — Pinia / reactive store

### 6.1 Konsepsiya

Sibling və ya dərin iç-içə komponentlər arası reaktiv data paylaşmaq üçün. İki
səviyyə:

**Sadə store (`reactive()`):**
```js
import { reactive } from "vue";
export const store = reactive({
  numbers: [1, 2, 3],
  addNumber(n) { this.numbers.push(n); },
});
```

**Pinia (rəsmi kitabxana):**
```js
import { defineStore } from "pinia";
export const useNumbersStore = defineStore("numbers", () => {
  const numbers = ref([1, 2, 3]);
  const addNumber = (n) => numbers.value.push(n);
  return { numbers, addNumber };
});
```

### 6.2 Architect qərarı

Əsas tövsiyə birbaşa Part 1-dəki fəlsəfədir: **"app-ın mürəkkəbliyinə görə seç —
kiçik app-i over-engineer etmə."** Sadə ehtiyac üçün `reactive()` store; devtools,
plugin, TS, SSR lazımdırsa Pinia. (React tərəfdə: Context/Zustand vs Redux — Part
11.)

---

## 7. Renderless komponentlər — headless-in Vue qarşılığı

### 7.1 Konsepsiya

Renderless komponent öz markup-unu render etmir; məntiqi enkapsulyasiya edib
data-nı uşaqlara **scoped slot** ilə verir. Valideyn görünüşə tam nəzarət edir —
**React headless / render props ilə eyni fəlsəfə** (Part 4–5):

```html
<!-- Toggle.vue (renderless) -->
<script setup>
  import { ref } from "vue";
  const checked = ref(false);
  const toggle = () => (checked.value = !checked.value);
</script>
<template>
  <slot :checked="checked" :toggle="toggle"></slot>
</template>
```

```html
<!-- istifadə: görünüş tam istifadəçidə -->
<Toggle v-slot="{ checked, toggle }">
  <button @click="toggle">{{ checked ? "ON" : "OFF" }}</button>
</Toggle>
```

### 7.2 Architect qərarı

- **İstifadə et:** fərqli vizual dizaynlı komponentlər arası məntiq paylaşımı;
  kitabxanada komponent-əsaslı API.
- **Diqqət:** Vue 3-də **composable adətən üstündür** (əlavə komponent nesting-i
  yaratmır); renderless yalnız komponent-əsaslı interfeys lazım olanda seçilir.
  (React-də də eyni: çox vaxt hook > render props.)

---

## 8. Data-provider — renderless data fetch

### 8.1 Konsepsiya

Data-provider renderless komponentdən istifadə edərək data idarəsini
prezentasiyadan ayırır: data fetch + loading state + tək scoped slot:

```html
<template>
  <slot :data="data" :loading="loading" :fetchJoke="fetchJoke"></slot>
</template>
```

İstifadə: `<DataProvider v-slot="{ data, loading }">...</DataProvider>`.

### 8.2 Architect qərarı

- **İstifadə et:** eyni data-nı fərqli cür göstərən çoxlu komponent; fetch
  məntiqini UI-yə bağlamadan mərkəzləşdirmək.
- **İstifadə etmə:** Vue 3-də composable kifayət edirsə (əlavə komponent qatı
  yox); tək komponent data istehlakı; nesting template aydınlığını azaldırsa.

> **Niyə vacibdir:** Bu, Part 4-dəki Presentational/Container-in Vue versiyasıdır
> və eyni nəticə: **modern cavab çox vaxt composable-dır**, wrapper komponent yox.

---

## 9. Dynamic components — `<component :is>`

### 9.1 Konsepsiya

Runtime-da state-ə görə fərqli komponentlər arası keçid — zəncirvari
`v-if`/`v-else` əvəzinə. `<component>` + `is` atributu:

```html
<script setup>
  import { ref } from "vue";
  import Home from "./Home.vue";
  import Feed from "./Feed.vue";
  const currentTab = ref("Home");
  const tabs = { Home, Feed };
</script>
<template>
  <button v-for="(_, tab) in tabs" @click="currentTab = tab">{{ tab }}</button>
  <KeepAlive>
    <component :is="tabs[currentTab]"></component>
  </KeepAlive>
</template>
```

`<KeepAlive>` keçid zamanı komponent state-ini saxlayır.

### 9.2 Architect qərarı

- **İstifadə et:** istifadəçi qarşılıqlı əlaqəsinə görə fərqli komponent (tabs,
  multi-view); routing olmadan mount/unmount lazımdır.

---

## 10. Async components — `defineAsyncComponent`

### 10.1 Konsepsiya

Async komponentlər yalnız lazım olanda yüklənir — ilkin yükdə deyil. Böyük
bundle-ları təxirə salır, ilkin yükləməni sürətləndirir (Part 9 performansına
körpü):

```js
import { defineAsyncComponent } from "vue";

export const AsyncModal = defineAsyncComponent({
  loader: () => import("./Modal.vue"),
  loadingComponent: Loading,
  errorComponent: Error,
});
```

### 10.2 Architect qərarı

- **İstifadə et:** ilkin render-də lazım olmayan böyük komponentlər; user
  hərəkəti ilə açılan modal/dialog; çoxlu ağır komponentli app-də chunk bölmə.
  **React `React.lazy` + `Suspense` qarşılığı** (Part 8–9).

---

## 11. Render functions — `h()`

### 11.1 Konsepsiya

Template əvəzinə JS ilə proqramatik komponent output-u. `h()` (hyperscript)
virtual DOM node yaradır — üç arqument: tag/komponent, props, uşaqlar:

```js
import { h } from "vue";
const render = () => h("div", { class: "card" }, [h("header", {}, message)]);
```

Vue JSX-i də dəstəkləyir (`@vue/babel-plugin-jsx`; `class`, tək `{}`).

### 11.2 Architect qərarı

- **İstifadə et:** template direktivləri ilə ifadəsi çətin mürəkkəb şərti render;
  birbaşa virtual DOM nəzarəti; kitabxana inkişafı.
- **Sənəd tövsiyəsi:** "əksər tətbiq kodu üçün template-ə üstünlük ver — render
  function qabaqcıl hallar üçündür."

---

## 12. Architect yekunu — framework-agnostik düşünmək

Bu part-ın əsl dərsi: **pattern bir, sintaksis iki.** Yeni framework öyrənmək =
tanıdığın pattern-lərin yeni sintaksisini öyrənmək. Stack seçimi qərarı (Part 12)
buna söykənir:

- Komanda Vue-nu tanıyırsa, "React daha populyardır" arqumenti Part 1 qərar
  çərçivəsində zəif arqumentdir — həll edən constraint komanda tanışlığıdır.
- Hər iki framework eyni performans/rendering imkanlarını verir (SSR, lazy,
  streaming) — fərq detaldadır, prinsipdə deyil.

---

## Məşq

Part 4–5-dəki `useToggle` (React headless) + `<Tabs>` nümunələrini götür:

1. `useToggle`-ı Vue **composable** kimi yenidən yaz.
2. Eyni məntiqi Vue **renderless komponent** (scoped slot) kimi yaz.
3. `<Tabs>`-ı Vue-da **`<component :is>`** + `<KeepAlive>` ilə qur.
4. Part 1 çərçivəsində: React↔Vue arasında hansı fərq **sintaksis**, hansı
   **prinsip** fərqidir? (İpucu: prinsip fərqi demək olar yoxdur.)

---

## Xülasə

- Kompozisiya problemləri **framework-agnostikdir**; React və Vue eyni pattern-ləri
  fərqli sintaksislə həll edir.
- Tərcümə: hook ↔ **composable**, Context ↔ **provide/inject**, Redux ↔ **Pinia**,
  headless ↔ **renderless**, `React.lazy` ↔ **`defineAsyncComponent`**.
- `<script setup>` — Vue 3-də tövsiyə olunan, boilerplate-siz Composition API.
- Modern Vue-da məntiq paylaşımının defolt yolu **composable**dır (renderless/
  data-provider yalnız komponent-interfeys lazım olanda).
- State: `reactive()` store (sadə) → **Pinia** (böyük); over-engineer etmə.
- Architect üçün dəyər: bu tərcümə stack seçimini (Part 12) obyektiv qərara çevirir.

---

## Mənbələr

- [patterns.dev — Vue](https://www.patterns.dev/vue) və
  [PatternsDev/skills — vue](https://github.com/PatternsDev/skills/tree/main/vue)
- [Vue 3 sənədi — Composition API](https://vuejs.org/guide/reusability/composables.html)
- Növbəti hissə: **Part 7 — Rendering strategiyaları I**
  (`frontend-architect-part7.md`) — CSR, SSR, Static (SSG), ISR.
