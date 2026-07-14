# Frontend Architect — Part 2: JavaScript Design Patterns I (Struktur)

> Bu, "Frontend Architect" seriyasının 2-ci hissəsidir (bax:
> `courses/frontend-architect.plan.md`). Mövzu: kod və obyektləri necə
> strukturlaşdırmağa dair beş təməl pattern — **Module, Singleton, Factory,
> Prototype, Mixin**. Vurğu "sintaksis"də deyil, **architect qərarında**: hər
> pattern hansı problemi həll edir, nə vaxt seçilir, nə vaxt anti-pattern-ə
> çevrilir. Part 1-də (`frontend-architect-part1.md`) qurduğumuz qərar
> çərçivəsi (Problem→Options→Trade-offs→Decision→Revisit) hər pattern-ə tətbiq
> olunur. Mənbə: patterns.dev / PatternsDev/skills (`module`, `singleton`,
> `factory`, `prototype`, `mixin`).

---

## 1. Niyə design pattern-lər architect üçün "lüğət"dir

### 1.1 Niyə vacibdir

Design pattern-lər sənə yeni bir şey *etməyə* imkan vermir — onlarsız da hər
şeyi yaza bilərsən. Verdikləri şey **ümumi lüğət**dir. "Bunu Factory ilə
həll edək" bir cümlədə komandaya struktur, trade-off və gözlənti ötürür.
Architect üçün pattern bilmək = "bu problemi əvvəl kim, necə həll edib və hansı
qiymətə" biliyini daşımaqdır.

Amma vacib bir tələ var: pattern **məqsəd deyil, alətdir**. Zəif developer
pattern-i "tətbiq etmək" üçün axtarır; architect problemi görüb *lazım olan*
pattern-i (çox vaxt heç birini) seçir. Bu part-dakı beş pattern-in bəziləri
(Singleton, Mixin) modern JS-də çox vaxt **anti-pattern**dir — və architect-in
işi məhz bunu bilməkdir.

### 1.2 İki ox: encapsulation və sharing

Bu part-dakı beş pattern iki suala cavab verir:

- **Encapsulation (gizlətmə):** nəyi gizli, nəyi açıq saxlayaq? → Module,
  Singleton.
- **Sharing (paylaşma):** çoxlu obyekt eyni davranışı necə paylaşsın? →
  Factory, Prototype, Mixin.

---

## 2. Module Pattern — kodu enkapsulyasiya edilmiş parçalara böl

### 2.1 Konsepsiya

Module pattern kodu kiçik, təkrar-istifadə olunan, **scope-lanmış** parçalara
bölür. Əsas ideya: modul daxilindəki elan defolt olaraq həmin modula
enkapsulyasiya olunur — qlobal namespace çirklənmir, ad toqquşması olmur.

Modern forması ES2015 modullarıdır (`import`/`export`):

```js
// math.js
export function add(x, y) {
  return x + y;
}

const privateValue = "Yalnız bu modula məxsusdur!"; // export olunmayıb = gizli
```

```js
// app.js
import { add } from "./math.js";
import { add as addValues } from "./math.js"; // ad toqquşmasından qaç
import * as math from "./math.js";            // hamısını gətir
```

**Dynamic import** — modulu tələb olunanda yüklə, ilkin bundle-ı kiçilt:

```js
const module = await import("./heavy-chart.js");
module.default();
```

(Dynamic import performance strategiyası kimi Part 9-da dərinləşir.)

### 2.2 Architect qərarı — nə vaxt

- **İstifadə et:** demək olar hər zaman. Böyük tətbiqdə concern-ləri ayırmaq,
  dəyəri modula gizlətmək, tree-shaking-i (Part 9) mümkün etmək üçün defolt
  seçim budur.
- **İstifadə etmə / diqqət:** çox trivial script-də modul overhead-i artıqdır;
  wildcard import (`import * as`) istifadə olunmayan dəyərləri də gətirə bilər
  və tree-shaking-i zəiflədir.

> **Niyə vacibdir:** Module "pattern"i artıq dilin özünə hopub. Architect üçün
> əsl qərar *modul sərhədlərini harada çəkmək*dir — bu, Part 4-dəki komponent
> API dizaynının və feature-based arxitekturanın təməlidir.

---

## 3. Singleton Pattern — bir instansiya, qlobal giriş

### 3.1 Konsepsiya

Singleton — yalnız **bir dəfə** instansiya oluna bilən, o instansiyaya bütün
tətbiqdən çatılan sinifdir. Tipik implementasiya constructor-da mövcud
instansiyanı yoxlayır və varsa error atır; instansiya çox vaxt `Object.freeze()`
ilə dondurulur:

```js
let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) throw new Error("Yalnız bir instansiya yaratmaq olar!");
    instance = this;
  }
  increment() { return ++counter; }
}

const singletonCounter = Object.freeze(new Counter());
export default singletonCounter;
```

Bu instansiyanı import edən bütün modullar **eyni obyektə** çatır — birində
dəyişiklik hamıya təsir edir.

### 3.2 Architect qərarı — niyə bu çox vaxt anti-pattern-dir

Singleton "yaddaşa qənaət" vədi verir, amma modern JS-də çox halda
**anti-pattern**dir. Səbəblər:

- **Test çətinliyi:** yeni instansiya yaratmaq mümkün olmadığından bütün testlər
  eyni qlobal instansiyanı paylaşır — test icra sırası kritik olur, əvvəlki
  test sonrakını korlaya bilər. Hər test arasında tam reset lazımdır.
- **Gizli asılılıq:** Singleton işlədən modulu import etmək "qlobal state
  dəyişirsən" siqnalını açıq vermir. Bir neçə komponent bilmədən eyni
  instansiyanı dəyişir → gözlənilməz davranış.
- **Qlobal scope çirklənməsi:** qlobal dəyişən kimi, data axını izləmək
  çətinləşir; tətbiq böyüdükcə state mutasiyalarını başa düşmək get-gedə
  ağırlaşır.
- **Nəzarətsiz mutable state:** Redux/Context read-only state verib yalnız pure
  reducer/action ilə yeniləyir; Singleton isə istənilən yerdən birbaşa mutasiyaya
  icazə verir.

**Sadə JS alternativi** — çox vaxt adi export olunan obyekt kifayət edir
(obyektlər referansla ötürülür, təbii "paylaşılan" olur):

```js
const counter = {
  count: 0,
  increment() { return ++this.count; },
};
export default counter;
```

React-də isə qlobal state üçün Context / Redux / Zustand (Part 11) daha yaxşıdır.

> **Ümumi səhv:** "Config bir dənə olmalıdır → Singleton class" refleksi. Əksər
> halda `export const config = Object.freeze({...})` və ya modul-scope dəyişən
> daha sadə, daha test-oluna-bilən həlldir. Qərar çərçivəsində Singleton-un
> "Revisit trigger"i adətən elə *ilk test yazılan an*dır.

---

## 4. Factory Pattern — obyektləri `new`-suz yarat

### 4.1 Konsepsiya

Factory pattern **factory funksiya** ilə `new` açar sözü olmadan yeni obyektlər
yaradır. Funksiya parametr alıb konfiqurasiya olunmuş obyekt qaytarır:

```js
const createUser = ({ firstName, lastName, email }) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
});
```

Xüsusən dinamik şərtlərə görə obyekt yaratmaqda güclüdür:

```js
const createObjectFromArray = ([key, value]) => ({ [key]: value });
createObjectFromArray(["name", "John"]); // { name: "John" }
```

### 4.2 Architect qərarı — nə vaxt

- **İstifadə et:** çoxlu obyekt eyni struktura malikdirsə; obyekt yaradılması
  mühit/konfiqurasiyadan asılıdırsa; çevik, şərtli obyekt generasiyası
  lazımdırsa. (Praktik nümunə: mühitə görə fərqli API client, ya da test üçün
  fake obyekt "fabriki".)
- **İstifadə etmə:** sadə obyekt üçün adi literal kifayətdirsə; komanda `new`
  ilə class constructor standartını qəbul edibsə; heç bir şərt/konfiqurasiya
  yoxdursa.

**Trade-off:** çox halda hər dəfə yeni **obyekt** yaratmaqdansa, class
constructor + paylaşılan prototype metodları (bax bölmə 5) **daha yaddaş-səmərəli**
ola bilər — çünki metodlar bir dəfə prototype-da saxlanır, hər obyektdə təkrar
yaradılmır.

---

## 5. Prototype Pattern — metodları prototype-da paylaş

### 5.1 Konsepsiya

Prototype pattern JS-in doğma prototype obyektindən istifadə edərək metodları
eyni tipli instansiyalar arasında paylaşır. Metodu hər instansiyada təkrarlamaq
əvəzinə, bir dəfə prototype-da saxlayırsan; bütün instansiyalar ona **prototype
zənciri** ilə çatır.

Prototype zənciri: bir property obyektdə birbaşa yoxdursa, JS `__proto__`
istinadları boyu rekursiv "aşağı yeriyir", ta ki property-ni tapana qədər.

```js
class Dog {
  constructor(name) { this.name = name; }
  bark() { return "Woof!"; }   // prototype-da yaşayır, hər instansiyada yox
}

const dog1 = new Dog("Daisy");

class SuperDog extends Dog {   // zəncir: SuperDog → Dog → Object
  fly() { return "Flying!"; }
}
```

`Object.create()` ilə də prototype təyin etmək olar:

```js
const dog = { bark() { return "Woof!"; } };
const pet1 = Object.create(dog);
pet1.bark(); // metod prototype-dan gəlir
```

### 5.2 Architect qərarı — nə vaxt

- **İstifadə et:** çoxlu obyekt eyni metodlara ehtiyac duyanda (metod
  təkrarını aradan qaldırıb yaddaşı azaldır); JS-də inheritance ierarxiyası
  qurarkən.
- **Bilmək vacibdir:** bu pattern JS-in inheritance modelinin *özüdür* —
  `class` sintaksisi onun üzərində şəkərdir (syntactic sugar). Factory (bölmə 4)
  vs Prototype seçimi əslində "hər obyektdə metod kopyası" vs "paylaşılan metod"
  trade-off-udur.

> **Niyə vacibdir:** Prototype zəncirini başa düşmək React/Vue-nin reaktivlik və
> `this` davranışını, `instanceof`-u, və performance-da metod paylaşımını
> anlamağın açarıdır. Factory çeviklik verir, Prototype yaddaş verir — architect
> yükə görə seçir.

---

## 6. Mixin Pattern — inheritance-siz davranış əlavə et

### 6.1 Konsepsiya

Mixin — başqa obyektə/class-a **inheritance olmadan** təkrar-istifadə olunan
funksionallıq əlavə edən obyektdir. `Object.assign()` ilə mixin obyektinin
property-ləri hədəfin prototype-una kopyalanır:

```js
class Dog {
  constructor(name) { this.name = name; }
}

const dogFunctionality = {
  bark: () => console.log("Woof!"),
  wagTail: () => console.log("Wagging my tail!"),
};

Object.assign(Dog.prototype, dogFunctionality);
new Dog("Daisy").bark(); // Woof!
```

Mixin-lər zəncirlənə də bilər (bir mixin başqasından davranış götürür):

```js
const animalFunctionality = { walk: () => console.log("Walking!") };
Object.assign(dogFunctionality, animalFunctionality);
Object.assign(Dog.prototype, dogFunctionality);
```

### 6.2 Architect qərarı — niyə modern frontend-də ehtiyatlı ol

- **İstifadə et:** bir-biri ilə əlaqəsiz çoxlu class-a **eyni** funksionallıq
  əlavə etmək lazımdırsa; süni inheritance zəncirindən qaçmaq üçün.
- **İstifadə etmə:** modern framework-lər bunu daha aydın həll edir — **React
  Hooks**, **Vue Composables** (Part 6). Sadə utility funksiya və ya modul
  import kifayət edirsə. Prototype pollution təhlükəsizlik riskidir (ad
  toqquşması). **React komandası mixin-ləri açıq şəkildə tövsiyə etmir** —
  "lazımsız mürəkkəblik əlavə edir".

**Trade-off:** üstünlük — süni inheritance zənciri yaratmır, çevik kompozisiya
verir. Çatışmazlıq — prototype-u dəyişmək funksiyanın *haradan gəldiyini*
qeyri-müəyyən edir; saxlamaq çətindir; ad toqquşması və prototype pollution
gözlənilməz davranış yaradır.

> **Ümumi səhv:** kod paylaşımı üçün mixin-ə uzanmaq. 2015-dən sonra frontend-də
> cavab demək olar həmişə **kompozisiya**dır (Hooks/Composables) — bax Part 4–6.

---

## 7. Yekun müqayisə — architect cədvəli

| Pattern | Həll etdiyi problem | Nə vaxt | Xəbərdarlıq |
|---|---|---|---|
| **Module** | Encapsulation, ad toqquşması | Demək olar həmişə | Wildcard import tree-shaking-i zəiflədir |
| **Singleton** | Bir qlobal instansiya | Nadir; adətən qaçın | Test, gizli asılılıq, mutable global — anti-pattern |
| **Factory** | Şərtli/çevik obyekt yaratma | Konfiqurasiya-asılı obyektlər | Yaddaş: hər obyektdə metod kopyası |
| **Prototype** | Metod paylaşımı, inheritance | Çoxlu eyni-tipli obyekt | JS inheritance modelinin özü |
| **Mixin** | Inheritance-siz davranış | Nadir; Hooks/Composables üstündür | Prototype pollution, mənbə qeyri-müəyyənliyi |

---

## Məşq

Kiçik bir "notification" sistemi təsəvvür et: `Toast`, `Modal`, `Banner` —
üçü də `show()`, `hide()`, `onClose()` davranışını paylaşır.

1. Bu paylaşımı **əvvəl Mixin ilə**, sonra **kompozisiya (adi funksiya/modul)
   ilə** yaz.
2. Part 1-dəki qərar çərçivəsində müqayisə et: test-oluna-bilmə, mənbə
   aydınlığı, prototype pollution riski hansı variantda daha yaxşıdır?
3. Nəticəni bir cümlədə "Decision + rationale" kimi ifadə et.

Məqsəd: "pattern-i tanıyıram"dan "pattern-i *nə vaxt işlətməmək* lazım olduğunu
bilirəm"ə keçmək.

---

## Xülasə

- Design pattern məqsəd deyil, **lüğət** və alətdir; architect problemi görüb
  lazım olanı (çox vaxt heç birini) seçir.
- **Module** — encapsulation-ın defolt yolu; əsl qərar modul sərhədlərini
  harada çəkməkdir.
- **Singleton** — modern JS-də əksərən **anti-pattern** (test, gizli asılılıq,
  mutable global). Adi obyekt export-u və ya state kitabxanası üstündür.
- **Factory** vs **Prototype** — çeviklik (hər obyektdə metod) vs yaddaş
  (paylaşılan prototype metodu) trade-off-u.
- **Mixin** — inheritance-siz kompozisiya, amma prototype pollution riski;
  modern frontend-də **Hooks/Composables** üstündür.
- Hər pattern-i qərar çərçivəsindən keçir: Problem → Options → Trade-offs →
  Decision → Revisit.

---

## Mənbələr

- [patterns.dev — Module](https://www.patterns.dev/vanilla/module-pattern),
  [Singleton](https://www.patterns.dev/vanilla/singleton-pattern),
  [Factory](https://www.patterns.dev/vanilla/factory-pattern),
  [Prototype](https://www.patterns.dev/vanilla/prototype-pattern),
  [Mixin](https://www.patterns.dev/vanilla/mixin-pattern)
- [PatternsDev/skills](https://github.com/PatternsDev/skills) — hər skill-in
  "When to Use / When NOT to Use" bölmələri.
- Növbəti hissə: **Part 3 — JavaScript Design Patterns II: davranış & data
  axını** (`frontend-architect-part3.md`) — Observer, Mediator, Command, Proxy,
  Flyweight, Provider.
