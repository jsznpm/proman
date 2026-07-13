# Angular Kursu: Sıfırdan Əsaslara

Bu kurs Angular framework-ünün nə olduğunu, əsas konseptlərini və gündəlik işlərdə istifadə olunan alətlərini öyrədir. Kurs [angular.dev](https://angular.dev/overview) rəsmi sənədlərinə əsaslanır və heç bir ön Angular biliyi tələb etmir — yalnız HTML, CSS və TypeScript-in əsaslarını bilmək kifayətdir.

Kimə uyğundur: JavaScript/TypeScript bilən, amma Angular-a ilk dəfə baxan developer-lərə.

## Ön tələblər

- HTML və CSS-in əsas biliyi
- TypeScript sintaksisi (tiplər, class-lar)
- TypeScript Decorator-ların nə olduğu haqqında ümumi təsəvvür (`@something` formatı) — kursun içində izah olunacaq

## Mündəricat

1. [Angular nədir və niyə istifadə olunur](#angular-nədir-və-niyə-istifadə-olunur)
2. [Komponentlər (Components)](#komponentlər-components)
3. [Signals ilə reaktivlik](#signals-ilə-reaktivlik)
4. [Template-lər və dinamik interfeys](#template-lər-və-dinamik-interfeys)
5. [Dependency Injection (Asılılıq İnyeksiyası)](#dependency-injection-asılılıq-inyeksiyası)
6. [Digər əsas imkanlar: Routing, Forms, HTTP Client](#digər-əsas-imkanlar-routing-forms-http-client)
7. [Developer alətləri](#developer-alətləri)
8. [Təcrübə: Kiçik layihə](#təcrübə-kiçik-layihə)
9. [Xülasə](#xülasə)
10. [Əlavə oxu](#əlavə-oxu)

## Angular nədir və niyə istifadə olunur

Angular — Google-un komandası tərəfindən dəstəklənən, sürətli və etibarlı web tətbiqləri qurmaq üçün framework-dür. Rəsmi sənədlərdə deyilir: Angular "developer-lərə istifadəçilərin sevdiyi sürətli, etibarlı tətbiqlər qurmağa imkan verən web framework"-dür.

Bir neçə önəmli məqam:

- **Miqyaslana bilir**: Angular həm komandanın böyüklüyünə, həm də kodbazanın böyüklüyünə uyğun miqyaslanmaq üçün dizayn edilib. Kiçik layihədən tutmuş yüz minlərlə sətir koda malik enterprise layihələrə qədər işləyir.
- **Sabitlik**: Hər commit Google-un daxili repozitoriyasında yüz minlərlə real-dünya test ssenarisinə qarşı yoxlanılır. Bu, Angular-ın nadir hallarda "birdən sınan" framework olduğu deməkdir.
- **Tam ekosistem**: Routing, forma idarəetməsi, HTTP client, internasionalizasiya, test alətləri — hamısı "batteries included" formatında, ayrıca kitabxana axtarmağa ehtiyac olmadan gəlir.

Angular-ın əsasını dörd sütun təşkil edir: **komponentlər**, **signals** (reaktivlik), **template-lər** və **dependency injection**. Növbəti bölmələrdə bunların hər birini kod nümunələri ilə görəcəyik.

> **Niyə bu vacibdir**: React və Vue-dan fərqli olaraq, Angular tam bir framework-dür (kitabxana yox) — yəni routing, forma validasiyası, HTTP client kimi şeylər üçün üçüncü tərəf paketlərə ehtiyac qalmır, hamısı `@angular/*` paketlərinin içindədir.

## Komponentlər (Components)

Komponentlər Angular tətbiqlərinin əsas tikinti bloklarıdır. Hər komponent böyük bir veb səhifənin bir hissəsini təmsil edir.

Hər komponent 4 əsas hissədən ibarətdir:

1. **`@Component` Decorator** — Angular-a komponenti necə emal edəcəyini deyən konfiqurasiya metadata-sı
2. **HTML Template** — DOM-un necə render olunacağını idarə edən markup
3. **CSS Selector** — komponentin HTML-də hansı tag adı ilə çağırılacağını müəyyən edir
4. **TypeScript Class** — istifadəçi hərəkətlərini və server sorğularını idarə edən davranış kodu

### Sadə komponent nümunəsi

```typescript
// user-profile.ts
@Component({
  selector: 'user-profile',
  template: `
    <h1>User profile</h1>
    <p>This is the user profile page</p>
  `,
})
export class UserProfile {
  /* Komponentin kodu burada yazılır */
}
```

`selector: 'user-profile'` o deməkdir ki, bu komponenti başqa bir template-in içində `<user-profile></user-profile>` tag-ı kimi işlədə bilərsiniz.

### Stil əlavə etmək

Stilləri `styles` sahəsi ilə birbaşa komponentin içinə yaza bilərsiniz:

```typescript
@Component({
  selector: 'user-profile',
  template: `
    <h1>User profile</h1>
    <p>This is the user profile page</p>
  `,
  styles: `
    h1 {
      font-size: 3em;
    }
  `,
})
export class UserProfile {
  /* Komponentin kodu burada yazılır */
}
```

### Ayrı fayllara bölmək

Böyük layihələrdə template və stili ayrı fayllara çıxarmaq daha rahatdır — `templateUrl` və `styleUrl` istifadə olunur:

```typescript
// user-profile.ts
@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.html',
  styleUrl: 'user-profile.css',
})
export class UserProfile {
  // Komponentin davranışı burada təyin olunur
}
```

### Komponentlərin birləşməsi (Composition)

Komponentlər iyerarxik şəkildə bir-birinin içinə yerləşdirilə bilər. Başqa komponenti işlətmək üçün 3 addım lazımdır:

1. Komponenti TypeScript faylında import edin
2. Onu decorator-un `imports` massivinə əlavə edin
3. Onun selector tag-ını template-də işlədin

```typescript
// user-profile.ts
import {ProfilePhoto} from 'profile-photo.ts';

@Component({
  selector: 'user-profile',
  imports: [ProfilePhoto],
  template: `
    <h1>User profile</h1>
    <profile-photo />
    <p>This is the user profile page</p>
  `,
})
export class UserProfile {
  // Komponentin davranışı burada təyin olunur
}
```

> **Ümumi səhv**: `imports` massivinə əlavə etməyi unutmaq. Əgər `<profile-photo />` template-də görünür amma `imports`-da yoxdursa, Angular onu tanımayacaq və konsola xəta yazacaq.

Bu modul yanaşma tətbiqin həm saxlanmasını (maintainability), həm də miqyaslanmasını asanlaşdırır — hər komponent öz məsuliyyət sahəsinə malikdir.

## Signals ilə reaktivlik

Angular-ın "fine-grained reactivity" modeli **Signal**-lara əsaslanır. Signal sadəcə bir dəyərin ətrafına sarılmış yüngül "wrapper"-dır — amma onun fərqi ondadır ki, dəyər dəyişdikdə Angular avtomatik olaraq bunu bilir və UI-ni yeniləyir, compile-time optimizasiyalar sayəsində bunu sürətli edir.

### `signal()` ilə signal yaratmaq

```typescript
import {signal} from '@angular/core';

const firstName = signal('Morgan');

// Oxumaq üçün funksiya kimi çağırılır
console.log(firstName());

// set() ilə dəyəri tam əvəz etmək
firstName.set('Jaime');

// update() ilə əvvəlki dəyərə əsasən yeniləmək
firstName.update((name) => name.toUpperCase());
```

Diqqət: `firstName()` — mötərizələrlə çağırılır, çünki signal əslində funksiyadır. `firstName` (mötərizəsiz) signal obyektinin özünü verir, dəyərini yox.

### `computed()` ilə törəmə (derived) signal-lar

`computed()` başqa signal-lardan asılı olan, onlar dəyişdikdə avtomatik yenilənən signal yaradır:

```typescript
import {signal, computed} from '@angular/core';

const firstName = signal('Morgan');
const firstNameCapitalized = computed(() => firstName().toUpperCase());

console.log(firstNameCapitalized()); // MORGAN

firstName.set('Jaime');
console.log(firstNameCapitalized()); // JAIME
```

`computed()` ilə yaradılan signal **read-only**-dir — onun `set()` və ya `update()` metodları yoxdur, çünki dəyəri həmişə asılı olduğu signal-lardan avtomatik hesablanır.

### Signal-ları komponentdə istifadə etmək

```typescript
@Component({
  /* ... */
})
export class UserProfile {
  isTrial = signal(false);
  isTrialExpired = signal(false);
  showTrialDuration = computed(() => this.isTrial() && !this.isTrialExpired());

  activateTrial() {
    this.isTrial.set(true);
  }
}
```

Burada `showTrialDuration` iki signal-dan asılıdır. Hər hansı biri dəyişəndə, `showTrialDuration`-ın istifadə olunduğu yerlərdə UI avtomatik yenilənir — sizin əl ilə "yenilə" demənizə ehtiyac yoxdur.

> **Niyə vacibdir**: Köhnə Angular versiyalarında dəyişiklikləri izləmək üçün "Zone.js" adlı mexanizm bütün tətbiqi yoxlayırdı (change detection). Signals ilə Angular yalnız dəyəri əslində dəyişən yerləri dəqiq bilir və yeniləyir — bu, daha az lazımsız render deməkdir, yəni daha sürətli tətbiq.

## Template-lər və dinamik interfeys

Template-lər komponentin datasını render olunan HTML-ə bağlayır. Data dəyişəndə, Angular template-i avtomatik sinxronlaşdırır.

### Interpolation (dinamik mətn)

İkiqat fiqurlu mötərizə (`{{ }}`) komponent datasını göstərmək üçün işlədilir:

```typescript
@Component({
  selector: 'user-profile',
  template: `<h1>Profile for {{ userName() }}</h1>`,
})
export class UserProfile {
  userName = signal('pro_programmer_123');
}
```

`this.userName.set('cool_coder_789')` çağırıldıqda, render olunan HTML avtomatik yenilənir.

### Property və attribute binding

Kvadrat mötərizələr (`[ ]`) dinamik dəyərləri DOM property-lərinə bağlayır:

```typescript
template: `<button [disabled]="!isValidUserId()">Save changes</button>`,
```

Attribute-lar üçün `attr.` prefiksi işlədilir:

```html
<ul [attr.role]="listRole()"></ul>
```

### Event binding

Dəyirmi mötərizələr (`( )`) template elementlərinə hadisə (event) dinləyiciləri bağlayır:

```typescript
template: `<button (click)="cancelSubscription()">Cancel subscription</button>`,

cancelSubscription() {
  /* Hadisəni idarə edən kod burada */
}
```

Native event obyektinə çatmaq üçün `$event` dəyişəni işlədilir:

```typescript
template: `<button (click)="cancelSubscription($event)">Cancel</button>`,

cancelSubscription(event: Event) {
  /* Event-i idarə edən kod */
}
```

### Control Flow (idarəetmə axını)

**`@if` ilə şərti render:**

```html
@if (isAdmin()) {
  <h2>Admin settings</h2>
} @else {
  <h2>User settings</h2>
}
```

**`@for` ilə dövr (loop):**

```html
<ul class="user-badge-list">
  @for (badge of badges(); track badge.id) {
    <li class="user-badge">{{ badge.name }}</li>
  }
</ul>
```

`track` açar sözü hər data elementini müvafiq DOM node-u ilə əlaqələndirərək DOM yeniləmələrini optimallaşdırır — Angular siyahı yenilənəndə bütün DOM-u yenidən qurmaq əvəzinə, yalnız dəyişən elementləri toxunulmaz saxlayır.

> **Ümumi səhv**: `@for`-da `track`-ı unutmaq və ya yanlış açar seçmək (məsələn, unikal olmayan bir sahə) — bu, siyahı yenilənəndə lazımsız DOM yenidən qurulmasına və animasiya/fokus itkisinə səbəb ola bilər. Həmişə unikal id kimi bir sahə seçin (`badge.id`).

## Dependency Injection (Asılılıq İnyeksiyası)

Dependency Injection (DI) — kodu komponentlərə "inyeksiya edərək" mərkəzi bir yerdən idarə etməyə imkan verən dizayn pattern-dir. Sadə desək: kodun təkrar-təkrar yazılmasının qarşısını alıb, paylaşıla bilən "servis"lər yaratmaq üçündür.

### Servis yaratmaq

Servis iki hissədən ibarətdir:

1. Class-ı Angular servisi kimi elan edən **decorator**
2. Məntiqi saxlayan **TypeScript class**

```typescript
import {Service} from '@angular/core';

@Service()
export class Calculator {
  add(x: number, y: number) {
    return x + y;
  }
}
```

### Servisi komponentdə istifadə etmək

İki addım lazımdır:

1. Servisi import edin
2. `inject()` funksiyası ilə class field-i elan edin

```typescript
import {Component, inject} from '@angular/core';
import {Calculator} from './calculator';

@Component({
  selector: 'app-receipt',
  template: `<h1>The total is {{ totalCost }}</h1>`,
})
export class Receipt {
  private calculator = inject(Calculator);
  totalCost = this.calculator.add(50, 25);
}
```

`inject(Calculator)` çağırıldıqda, Angular `Calculator` servisinin bir instansını tapır (ya da yaradır) və onu `this.calculator`-a verir. Bu instans, adətən, tətbiq daxilində tək (singleton) olur — yəni hər yerdə eyni `Calculator` obyekti paylaşılır.

> **Niyə vacibdir**: DI olmadan, hər komponent özü `new Calculator()` yazmalı olardı. Bu həm test etməyi çətinləşdirər (mock servis vermək olmaz), həm də state-i paylaşmağı qeyri-mümkün edər. DI ilə isə eyni servis instansını onlarla komponent arasında paylaşmaq, yaxud testlərdə saxta (mock) versiya ilə əvəz etmək asandır.

## Digər əsas imkanlar: Routing, Forms, HTTP Client

Angular-ın "batteries included" xarakteri bu üç sahədə də özünü göstərir. Bunlar ayrı-ayrı dərin mövzulardır, amma nə üçün mövcud olduqlarını bilmək vacibdir:

- **Routing** — səhifələr arası naviqasiyanı idarə edən, "route guard"-lar (kimin hansı səhifəyə girə biləcəyini müəyyən edən qaydalar), data resolution (səhifə açılmazdan əvvəl lazım olan datanı yükləmək) və lazy-loading (kod hissələrini yalnız lazım olanda yükləmək) daxil olmaqla zəngin naviqasiya alətidir.
- **Forms** — forma iştirakı və validasiyası üçün standart bir sistem təqdim edir. Yeni yanaşma birbaşa signal-lara əsaslanır ("Forms with signals").
- **HTTP Client** — server ilə HTTP üzərindən əlaqə qurmaq üçün alətdir (sorğu göndərmək, cavabı emal etmək).

Bu üç mövzu bu kursun əhatə dairəsindən kənardır, amma Angular-ın rəsmi sənədlərində hər biri üçün ayrıca dərin bölmə var (bax: "Əlavə oxu").

## Developer alətləri

Angular ekosistemi bir neçə güclü alətlə gəlir:

- **Angular CLI** — layihəni bir dəqiqədən az müddətdə ayağa qaldırır, Vite və esbuild əsaslı sürətli build pipeline-ı ilə yüz minlərlə sətir kodu belə bir dəqiqədən az müddətdə build edə bilir.
- **Angular DevTools** — komponent ağacını (component tree) yoxlamaq, dependency injection ağacını görmək və performans profilləmək üçün flame chart daxil olan brauzer əlavəsi.
- **`ng update`** — versiya yeniləmələrində rutin breaking change-ləri avtomatik köçürən (migrate edən) alət.
- **Language Service** — redaktorunuzda kod tamamlama, naviqasiya, refaktorinq və real-vaxt diaqnostika təmin edir.

Təhlükəsizlik baxımından Angular HTML sanitization və "trusted types" dəstəyi ilə XSS (cross-site scripting) və CSRF (cross-site request forgery) kimi ümumi zəifliklərdən qorunmağa kömək edir. Beynəlxalqlaşdırma (i18n) tərəfində isə mesaj tərcümələri və Unicode ICU sintaksisi dəstəklənir.

## Təcrübə: Kiçik layihə

Aşağıdakı tapşırığı yerinə yetirərək bu kursda öyrəndiyiniz 4 əsas konsepti (komponent, signal, template, DI) birləşdirin:

**Tapşırıq**: Sadə bir "Sayğac" (Counter) komponenti qurun:

1. `CounterService` adlı servis yaradın (`@Service()` ilə), içində `count` adlı bir signal (`signal(0)`) və onu artıran/azaldan iki metod (`increment()`, `decrement()`) olsun.
2. `Counter` adlı komponent yaradın, `inject()` ilə `CounterService`-i inyeksiya edin.
3. Template-də cari sayı göstərin, iki düymə əlavə edin ("+" və "-"), onlara `(click)` ilə müvafiq metodları bağlayın.
4. `computed()` istifadə edərək `isPositive` adlı signal yaradın ki, say müsbətdirsə `true` qaytarsın, və `@if` ilə "Say müsbətdir" / "Say mənfi və ya sıfırdır" mesajını şərti göstərin.

Nümunə həll (özünüz yazmadan öncə cəhd edin, sonra müqayisə edin):

```typescript
// counter.service.ts
import {Service, signal} from '@angular/core';

@Service()
export class CounterService {
  count = signal(0);

  increment() {
    this.count.update((c) => c + 1);
  }

  decrement() {
    this.count.update((c) => c - 1);
  }
}
```

```typescript
// counter.ts
import {Component, inject, computed} from '@angular/core';
import {CounterService} from './counter.service';

@Component({
  selector: 'app-counter',
  template: `
    <h2>Say: {{ counterService.count() }}</h2>
    <button (click)="counterService.increment()">+</button>
    <button (click)="counterService.decrement()">-</button>
    @if (isPositive()) {
      <p>Say müsbətdir</p>
    } @else {
      <p>Say mənfi və ya sıfırdır</p>
    }
  `,
})
export class Counter {
  counterService = inject(CounterService);
  isPositive = computed(() => this.counterService.count() > 0);
}
```

## Xülasə

- Angular Google tərəfindən dəstəklənən, tam ekosistemə malik ("batteries included") web framework-dür və həm kiçik, həm böyük komandalar üçün miqyaslanacaq şəkildə dizayn edilib.
- **Komponentlər** — `@Component` decorator, template, selector və class-dan ibarət tikinti bloklarıdır; `imports` massivi ilə bir-birinin içinə yerləşdirilə bilər.
- **Signals** (`signal()`, `computed()`) — dəyər dəyişikliyini izləyən yüngül reaktivlik modelidir; `computed()` digər signal-lardan asılı, read-only törəmə dəyər yaradır.
- **Template-lər** — `{{ }}` interpolation, `[ ]` property binding, `( )` event binding və `@if` / `@for` control flow bloklarından istifadə edir; `@for`-da `track` performans üçün vacibdir.
- **Dependency Injection** — `@Service()` decorator-lu servislər yaradıb, `inject()` funksiyası ilə komponentlərə paylaşılan (singleton) instans kimi bağlamaq üçündür.
- Routing, Forms və HTTP Client Angular-ın əlavə "batteries included" imkanlarıdır — hər biri öz dərin sənəd bölməsinə malikdir.

## Əlavə oxu

- Əsas mənbə: [angular.dev/overview](https://angular.dev/overview)
- [angular.dev/essentials](https://angular.dev/essentials) — bu kursun əsaslandığı Essentials bölməsinin tam siyahısı (Forms with signals daxil olmaqla)
- [angular.dev/essentials/components](https://angular.dev/essentials/components)
- [angular.dev/essentials/signals](https://angular.dev/essentials/signals)
- [angular.dev/essentials/templates](https://angular.dev/essentials/templates)
- [angular.dev/essentials/dependency-injection](https://angular.dev/essentials/dependency-injection)

