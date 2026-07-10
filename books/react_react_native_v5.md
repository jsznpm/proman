### Why React?

Əgər bu kitabı oxuyursunuzsa, çox güman ki, artıq **React** ilə tanışsınız. Əgər tanış deyilsinizsə, narahat olmayın. Fəlsəfi izahları minimum səviyyədə saxlamağa çalışacağam. Bununla belə, bu kitab kifayət qədər genişdir və çoxlu mövzunu əhatə edir. Buna görə də əvvəlcə ümumi yanaşmanı müəyyənləşdirmək vacibdir.

Məqsədimiz yalnız **React** və **React Native** öyrənmək deyil. Eyni zamanda, bu gün və gələcəkdə **React** ilə hazırlamaq istədiyimiz istənilən tətbiqi dəstəkləyə biləcək, **scalable** və **adaptive architecture** qurmağı öyrənəcəyik.

Başqa sözlə, məqsədimiz **React** ətrafında möhkəm bir təməl yaratmaq, onu müxtəlif alətlər və yanaşmalarla birləşdirərək uzunmüddətli istifadəyə uyğun bir ekosistem qurmaqdır. Bu kitab sizə **routing**, **TypeScript typing**, **testing** və bir çox digər vasitələrdən istifadə etməyi addım-addım göstərəcək.

Bu fəsildə əvvəlcə **React**-ın niyə yaradıldığını qısa şəkildə izah edəcəyik. Daha sonra **React**-ın sadəliyinə və onun veb tərtibatçılarının tez-tez qarşılaşdığı performans problemlərini necə həll etdiyinə baxacağıq.

Sonra **React**-ın **declarative** yanaşmasını və onun təqdim etdiyi **abstraction** səviyyəsini müzakirə edəcəyik. Daha sonra **React**-ın əsas xüsusiyyətlərinə toxunacaq və sonda isə ilk **React** layihəsini necə yaratmağı öyrənəcəyik.

**React**-ın əsas konsepsiyalarını və **UI development** sahəsində hansı problemləri həll etdiyini başa düşdükdən sonra kitabın qalan hissəsini öyrənmək sizin üçün daha asan olacaq.

Bu fəsildə aşağıdakı mövzular əhatə olunur:

- React nədir?
- React-da hansı yeniliklər var?
- Yeni React layihəsinin yaradılması
- 

## React nədir?

Məncə, **React**-ın rəsmi saytında (react.dev) verilən bir cümləlik təsvir həm qısa, həm də dəqiqdir:

> **"İstifadəçi interfeysləri (user interfaces) yaratmaq üçün JavaScript kitabxanası."**
> 

Bu təsvir mükəmməldir. Çünki əksər hallarda bizə məhz bu lazımdır. Məncə, bu cümlənin ən gözəl tərəfi dediklərindən çox, demədikləridir.

React **mega-framework** deyil.

O, verilənlər bazasından (**database**) tutmuş **WebSocket** vasitəsilə real vaxt yeniləmələrinə qədər hər şeyi özündə birləşdirən **full-stack** həll təqdim etmir. Əslində isə belə əvvəlcədən hazırlanmış həllərin hamısına həmişə ehtiyac olmur.

Bəs React **framework** deyilsə, onda əslində nədir?

---

## React sadəcə View Layer-dir

React adətən tətbiqin (**application**) **view layer**-i kimi qəbul edilir.

Bir tətbiq adətən bir neçə hissədən ibarət olur:

- **View Layer**
- **Logic Layer**
- **Data Layer**

Bu arxitekturada React əsasən **View Layer** üçün məsuliyyət daşıyır. Yəni məlumat (**data**) və tətbiqin vəziyyəti (**application state**) dəyişdikdə **UI**-ın render olunmasını və yenilənməsini idarə edir.

React komponentləri istifadəçinin ekranda nə gördüyünü müəyyən edir.

Şəkil 1.1 React-ın frontend tətbiqində hansı mövqedə yerləşdiyini göstərir.

---

Əslində React-ın əsas ideyası bundan ibarətdir.

Kitab boyunca bu ideyanın müxtəlif tətbiqlərini görəcəyik, lakin ümumi iş prinsipi demək olar ki, həmişə eyni qalır.

1. **Application Logic**
    
    Əvvəlcə tətbiqin biznes məntiqi işləyir və müəyyən **data** yaradır.
    
2. **Məlumatın UI-da göstərilməsi**
    
    Növbəti mərhələdə həmin məlumat **UI**-da render olunur.
    
3. **React Component**
    
    Bunun üçün həmin **data** React komponentinə ötürülür.
    
4. **Component-in rolu**
    
    React komponentinin əsas vəzifəsi həmin məlumat əsasında lazımi **HTML**-i yaradıb səhifədə göstərməkdir.
    

---

Burada belə bir sual yarana bilər:

> "Bunun nəyi fərqlidir? React sadəcə növbəti rendering texnologiyası deyilmi?"
> 

İlk baxışdan belə görünə bilər.

Lakin React tətbiq hazırlama prosesini sadələşdirən bir sıra mühüm xüsusiyyətlər təqdim edir. Fəslin davamında həmin üstünlüklərə daha yaxından baxacağıq.

---

# Sadəlik üstünlükdür

React öyrənilməsi və başa düşülməsi lazım olan çoxsaylı mürəkkəb hissələrdən ibarət deyil.

Onun **API**-si kifayət qədər sadədir. Bununla belə, daxildə React kifayət qədər mürəkkəb mexanizmlərlə işləyir. Kitab boyunca bu daxili mexanizmləri və React-ın arxitekturasını ətraflı öyrənəcəyik ki, onun necə işlədiyini daha yaxşı başa düşəsiniz.

Kiçik və sadə **API**-nin əsas üstünlüyü ondan ibarətdir ki, siz vaxtınızı onu öyrənməyə, sınaqdan keçirməyə və təcrübə qazanmağa sərf edirsiniz.

Böyük **framework**-larda isə vaxtın böyük hissəsi müxtəlif funksiyaların necə işlədiyini anlamağa gedir.

Şəkil 1.2 React ilə işləyərkən əsas diqqət yetirdiyimiz API-ləri göstərir.

---

React iki əsas API-dən ibarətdir.

### React Component API

Səhifədə render olunan komponentlərdən ibarətdir.

### React DOM

Komponentlərin veb səhifədə render olunmasını həyata keçirən API-dir.

---

Hər bir React komponentində əsasən aşağıdakı anlayışlarla işləyirik.

### Data

Komponentə müxtəlif mənbələrdən ötürülən məlumatdır. Komponent üçün həmin məlumatın haradan gəldiyi önəmli deyil. O, sadəcə bu məlumatı render edir.

### Lifecycle

Komponentin həyat dövrünü (**lifecycle**) ifadə edir.

Məsələn, komponent render olunmazdan əvvəl, render olunduqdan sonra və ya səhifədən silinərkən müəyyən **hook** və ya metodlar işə düşür.

### Events

İstifadəçi qarşılıqlı əlaqələrinə (**user interactions**) cavab vermək üçün yazdığımız kod hissələridir.

### JSX

React komponentlərində **UI** strukturunu təsvir etmək üçün istifadə olunan sintaksisdir.

JSX əsasən React ilə əlaqələndirilsə də, onu digər JavaScript kitabxanaları və framework-lərlə birlikdə də istifadə etmək mümkündür.

---

Hələlik bu anlayışların hər birini tam başa düşməyə çalışmayın.

Burada əsas fikir odur ki, React öz təbiətinə görə sadədir.

Diqqət etsəniz, öyrənilməsi lazım olan anlayışların sayı kifayət qədər azdır.

Bu isə o deməkdir ki, uzun müddət API detalları ilə məşğul olmaq əvəzinə, əsas prinsipləri öyrəndikdən sonra React-dan düzgün istifadə nümunələrinə (**React usage patterns**) və **declarative UI** yanaşmasına daha çox diqqət ayıra bilərik.
## Declarative UI Structures — Ətraflı xülasə

Bu bölmənin əsas ideyası budur ki, **React-da UI-nı "necə dəyişəcəyimizi" deyil, "necə görünməsini istədiyimizi" təsvir edirik.** Bu yanaşma **Declarative Programming** adlanır.

---

## Separation of Concerns anlayışı

Uzun illər proqramlaşdırmada belə bir prinsip mövcud idi:

> **Logic** və **Presentation** bir-birindən ayrılmalıdır.
> 

Məsələn:

- HTML → görünüş
- CSS → dizayn
- JavaScript → məntiq

React-a ilk dəfə baxan insanların çoxu JSX-i görəndə təəccüblənirlər. Çünki JavaScript kodunun içində HTML-yə bənzər sintaksis yazılır.

Bir çox proqramçı əvvəlcə bunu pis təcrübə hesab edir.

Amma React bunu təsadüfi etmir.

---

## JSX nədir?

JSX (**JavaScript XML**) React komponentlərinin UI strukturunu təsvir etmək üçün istifadə etdiyi sintaksisdir.

Məsələn:

```jsx
return (
  <div>
    <h1>Hello</h1>
  </div>
);
```

Bu kod HTML deyil.

Bu da JavaScript deyil.

Bu, JSX-dir.

React sonradan bunu adi JavaScript funksiyalarına çevirir.

---

## React niyə JSX istifadə edir?

Çünki JSX vasitəsilə UI-ı oxumaq daha asandır.

Məsələn belə yazmaq əvəzinə:

```jsx
document.createElement(...)
appendChild(...)
setAttribute(...)
```

sadəcə yazırsan

```jsx
<div>
   <Button />
</div>
```

və React qalan işi özü edir.

---

# Imperative Programming

React-dan əvvəl UI əsasən belə dəyişdirilirdi.

Məsələn jQuery:

```jsx
$("#button").click(function () {
    $("#text").addClass("active");
});
```

Burada sən browser-ə addım-addım əmr verirsən.

1. Button-u tap
2. Click gözlə
3. Paragraph tap
4. Class əlavə et

Bu yanaşmaya **Imperative Programming** deyilir.

Yəni

> **"Necə et."**
> 

deyirsən.

---

## Bunun problemi nədir?

Kiçik layihələrdə problem görünmür.

Amma layihə böyüdükcə belə kod yaranır.

```
Button click

↓

Element tap

↓

API çağır

↓

Loading göstər

↓

Spinner gizlət

↓

Error göstər

↓

Class dəyiş

↓

Başqa elementi yenilə

↓

Yeni modal aç
```

Artıq yüzlərlə addım olur.

Kod:

- qarışıq olur
- oxunması çətinləşir
- dəyişdirilməsi riskli olur

Bir yerdə dəyişiklik başqa yeri poza bilir.

---

# Declarative Programming

React isə tam əksini edir.

Sən browser-ə

> bunu et
> 

demirsən.

Sadəcə deyirsən

> UI bu vəziyyətdə belə görünməlidir.
> 

Məsələn

```jsx
const [isHighlighted, setIsHighlighted] = useState(false);

return (
 <>
   <button
      onClick={() => setIsHighlighted(true)}
   >
      Add Class
   </button>

   <p className={isHighlighted && "highlight"}>
      Paragraph
   </p>
 </>
);
```

Burada sən heç vaxt demirsən

```
document.querySelector(...)
classList.add(...)
```

Sadəcə deyirsən

> əgər isHighlighted true-dursa class əlavə et.
> 

Qalan işi React özü edir.

---

# React nəyə qərar verir?

React özü müəyyən edir

- hansı element dəyişib
- nə yenilənməlidir
- hansı DOM node dəyişməlidir
- hansına toxunmaq lazım deyil

Sən bunlarla məşğul olmursan.

---

# UI State-ə əsasən qurulur

React-da UI bir funksiyadır.

```
UI = f(state)
```

Yəni

State dəyişirsə

↓

UI yenidən hesablanır.

Məsələn

```
loading=true

↓

Spinner göstər
```

```
loading=false

↓

Spinner gizlət
```

```
user=null

↓

Login göstər
```

```
user mövcuddur

↓

Dashboard göstər
```

Sən heç vaxt

```
show()
hide()
remove()
append()
```

kimi əmrlər yazmırsan.

Sadəcə vəziyyəti (**state**) dəyişirsən.

---

# React niyə bunu üstün tutur?

Çünki bu yanaşma

- daha oxunaqlıdır
- daha test edilə bilir
- daha az səhvə səbəb olur
- böyük layihələrdə daha rahat idarə olunur

Komponentə baxan proqramçı yalnız **state**-ə baxaraq UI-nın necə görünəcəyini anlaya bilir.

---

# Bölmənin əsas mesajı

Bu bölmənin vermək istədiyi əsas fikir budur:

- JSX sadəcə HTML yazmaq üçün deyil, **UI strukturunu deklarativ şəkildə təsvir etmək** üçündür.
- React-da UI-nı dəyişdirmək üçün DOM üzərində addım-addım əmrlər yazmağa ehtiyac yoxdur.
- **State** dəyişdikdə React UI-ı yenidən hesablayır və yalnız lazım olan dəyişiklikləri tətbiq edir.
- Bu yanaşma (**Declarative Programming**) mürəkkəb tətbiqlərin daha sadə, oxunaqlı və idarəolunan şəkildə hazırlanmasına imkan verir.

Bu, React fəlsəfəsinin ən vacib prinsiplərindən biridir və kitabın sonrakı bölmələrində dəfələrlə istifadə olunacaq.
Bu bölmənin əsas ideyası belədir:

> **React komponentləri statik deyil. Onlar zaman keçdikcə dəyişən məlumatlara (data) əsasən yenidən render olunur.**
> 

Başqa sözlə, React-da UI sabit bir HTML səhifəsi deyil. O, **data dəyişdikcə dəyişən canlı bir görünüşdür**.

---

# JSX statik görünür, amma əslində dinamikdir

İlk baxışda JSX belə görünür:

```jsx
return (
  <h1>Hello</h1>
);
```

Sanki bu kod həmişə eyni nəticəni verəcək.

Amma React-da JSX demək olar ki, həmişə **data** ilə birlikdə işləyir.

Məsələn:

```jsx
return (
   <h1>{user.name}</h1>
);
```

və ya

```jsx
return (
   {isLoggedIn ? <Dashboard /> : <Login />}
);
```

Burada artıq UI sabit deyil.

Data dəyişən kimi nəticə də dəyişəcək.

---

# React komponentləri data ilə işləyir

Komponentə müxtəlif mənbələrdən məlumat gələ bilər.

Məsələn:

- props
- state
- API cavabı
- Context
- Redux
- TanStack Query

React üçün bunun fərqi yoxdur.

Əsas odur ki, komponent yeni data alsın.

---

# Render nədir?

Render dedikdə React komponentinin işləyərək JSX qaytarması nəzərdə tutulur.

Məsələn

```jsx
function User({ name }) {
   return <h1>{name}</h1>;
}
```

Əgər

```
name = "Javid"
```

olarsa

Render nəticəsi

```html
<h1>Javid</h1>
```

olar.

---

Sonra

```
name = "Ali"
```

olarsa

React komponenti yenidən işləyəcək.

Yeni nəticə

```html
<h1>Ali</h1>
```

olacaq.

---

# Hər render bir "snapshot"-dır

Bu bölmənin ən vacib fikirlərindən biri budur.

React hər render-i

> **bir şəkil (snapshot)**
> 

kimi qəbul edir.

Məsələn

İlk render

```
count = 0
```

↓

React bunu yadda saxlayır.

Sonra

```
count = 1
```

↓

yenidən render edir.

Bu artıq başqa snapshot-dır.

Sonra

```
count = 2
```

↓

yenə yeni snapshot yaranır.

Yəni React tarixçədə ardıcıl olaraq müxtəlif UI vəziyyətlərini görür.

```
Render 1

count=0
```

↓

```
Render 2

count=1
```

↓

```
Render 3

count=2
```

---

# UI zamanla dəyişir

Tətbiqlər statik deyil.

İstifadəçi

- klik edir
- məlumat daxil edir
- API cavabı gəlir
- loading bitir
- notification gəlir

Bütün bunlar **data**-nı dəyişdirir.

Data dəyişdikcə React komponenti yenidən render olunur.

---

Məsələn

İlk vəziyyət

```
loading = true
```

↓

```
Loading...
```

Sonra

```
loading = false
```

↓

```
Products
```

və ya

```
error = true
```

↓

```
Something went wrong
```

Yəni UI həmişə mövcud vəziyyətə (**state**) uyğun qurulur.

---

# React niyə hər dəfə yenidən render edir?

İlk baxışdan belə görünə bilər:

> "Hər dəfə komponent yenidən işləyirsə, bu çox yavaş olmaz?"
> 

Bu tamamilə normal sualdır.

Əgər hər render zamanı bütün HTML yenidən yaradılıb DOM-a yazılsaydı, həqiqətən də performans problemi yaranardı.

Amma React bunu etmir.

O, əvvəlki render ilə yeni render-i müqayisə edir və yalnız dəyişən hissələri yeniləyir.

Bu proses sonrakı bölmədə izah olunan **Virtual DOM**, **diffing** və **patching** mexanizmləri sayəsində mümkün olur.

---

# Nəticə

Bu bölmənin əsas mesajı budur:

- React komponentləri statik deyil; onlar **data** dəyişdikcə yenidən **render** olunur.
- Hər **render** həmin andakı **state** və **props** əsasında yaranan yeni bir **snapshot** kimidir.
- UI həmişə mövcud **data**nın əksidir. **Data** dəyişirsə, UI da dəyişir.
- React bu prosesi elə optimallaşdırır ki, yalnız həqiqətən dəyişən hissələr yenilənsin. Bunun necə işlədiyi növbəti **Performance matters** bölməsində izah olunur.
- Bu bölmə React-ın ən vacib konsepsiyalarından birini izah edir:

> **Əgər React hər dəfə komponenti yenidən render edirsə, niyə tətbiq yavaşlamır?**
> 

İlk baxışdan belə görünür ki, React çox iş görür. Amma əslində React bunu çox optimallaşdırılmış şəkildə həyata keçirir.

---

# Declarative UI performans problemi yaradırmı?

Əvvəlki bölmədə öyrəndik ki, React **Declarative Programming** yanaşmasından istifadə edir.

Sən sadəcə yazırsan:

```jsx
return <UserList users={users} />;
```

və ya

```jsx
return isLoading ? <Spinner /> : <Products />;
```

Sən browser-ə addım-addım nə etməli olduğunu demirsən.

Bu çox rahatdır.

Amma burada bir sual yaranır.

Əgər hər dəfə `state` dəyişəndə React komponenti yenidən işləyirsə,

onda hər dəfə bütün səhifə yenidən yaradılır?

Əgər belə olsaydı, React çox yavaş işləyərdi.

---

# İlk render

İlk dəfə komponent yaradılarkən React aşağıdakı addımları edir.

```
Component

↓

JSX

↓

React Element

↓

DOM

↓

Browser göstərir
```

Bu ilk renderdir.

Burada problem yoxdur.

Çünki DOM boşdur.

React sadəcə elementləri yaradıb səhifəyə əlavə edir.

---

# Əsl problem sonrakı renderlərdir

Məsələn

```
count = 0
```

↓

ekranda görünür.

Sonra

```
count = 1
```

olur.

İndi React nə etməlidir?

Ən sadə yol belə olardı.

```
Sil bütün DOM-u

↓

Yenidən yarat

↓

Yenidən əlavə et
```

Bu işləyərdi.

Amma çox yavaş olardı.

Çünki browser üçün ən bahalı əməliyyatlardan biri DOM-u dəyişməkdir.

---

# DOM niyə bahalıdır?

DOM adi JavaScript obyekti deyil.

DOM browser tərəfindən idarə olunur.

DOM-da dəyişiklik baş verəndə browser

- Layout hesablayır
- Reflow edir
- Repaint edir
- Composite edir

Bunların hamısı CPU istifadə edir.

Məsələn

1000 element olan cədvəldə

yalnız

```
1 element dəyişib.
```

amma sən bütün cədvəli silib yenidən yaratsan,

browser boş yerə çox iş görəcək.

---

# Handlebars kimi Template Engine-lər

Kitab burada maraqlı müqayisə aparır.

Məsələn

Handlebars.

İlk render

```
Template

↓

HTML String

↓

DOM
```

Problem yoxdur.

Amma data dəyişəndə

yenidən

```
Template

↓

HTML String

↓

DOM
```

yaranır.

Yəni hər şey yenidən yaradılır.

Buna görə proqramçılar

belə workaround yazmağa başlayırlar.

```
if (userChanged)

↓

yalnız bu elementi dəyiş

↓

bu classı əlavə et

↓

bu texti dəyiş
```

Beləliklə

declarative template

- 

imperative DOM manipulation

qarışır.

Nəticədə kod mürəkkəbləşir.

---

# React fərqli işləyir

React deyir

Sən DOM-a toxunma.

Sadəcə yeni UI yaz.

Məsələn

Birinci render

```jsx
<h1>Hello</h1>
```

İkinci render

```jsx
<h1>Hello Javid</h1>
```

Sən heç nə etmirsən.

React özü qərar verir

```
Nə dəyişib?
```

---

# Virtual DOM

React bunun üçün

**Virtual DOM**

istifadə edir.

Virtual DOM

real DOM-un

JavaScript yaddaşındakı surətidir.

```
Browser DOM

↓

Memory-də

Virtual DOM
```

Virtual DOM browser deyil.

Sadəcə JavaScript obyektidir.

JavaScript obyektləri ilə işləmək

DOM ilə işləməkdən qat-qat sürətlidir.

---

# Yeni render necə işləyir?

Məsələn

İlk render

```
<h1>Hello</h1>
```

Virtual DOM

```
h1

↓

Hello
```

Sonra

```
Hello Javid
```

olur.

Yeni Virtual DOM yaranır.

```
h1

↓

Hello Javid
```

İndi React

köhnə Virtual DOM

ilə

yeni Virtual DOM-u

müqayisə edir.

---

# Diffing

Bu müqayisə prosesinə

**Diffing**

deyilir.

React baxır

```
Element dəyişib?

↓

Xeyr
```

```
Tag dəyişib?

↓

Xeyr
```

```
Text dəyişib?

↓

Bəli
```

Onda React qərar verir.

```
Yalnız text dəyişməlidir.
```

---

# Patching

Sonra React

yalnız lazım olan DOM əməliyyatını edir.

Bu mərhələyə

**Patching**

deyilir.

Yəni

```
DOM.remove()

DOM.append()

DOM.replace()
```

kimi böyük əməliyyatlar yox,

sadəcə

```
textNode dəyiş.
```

---

# React niyə sürətlidir?

Çünki

1000 elementdən

yalnız biri dəyişibsə,

React

999 elementə

heç toxunmur.

Bu da

DOM əməliyyatlarını minimuma endirir.

---

# React yenə də render edir

Burada vacib bir məqam var.

Bir çoxları düşünür ki

React yalnız dəyişən komponenti render edir.

Əslində

React komponent funksiyasını yenidən işlədir.

Yəni

```jsx
function App() {}
```

yenidən çağırılır.

Amma

DOM tam yenilənmir.

Çünki

Diffing

və

Patching

yalnız dəyişən hissəni tətbiq edir.

Bu iki anlayışı qarışdırmaq olmaz:

- **Re-render** — React komponentinin funksiyasının yenidən icra olunması.
- **DOM Update** — Real DOM-da dəyişiklik edilməsi.

Hər **DOM Update** bir **re-render** nəticəsində baş verir, amma hər **re-render** mütləq DOM dəyişiklikləri ilə nəticələnmir.

---

# React niyə bunu gizlədir?

React istəyir ki, proqramçı

bunları düşünməsin:

- `appendChild`
- `removeChild`
- `replaceChild`
- `querySelector`
- `textContent`

Sən sadəcə UI-ı təsvir edirsən.

React isə

- müqayisə edir (**Diffing**),
- optimallaşdırır,
- yalnız lazım olan dəyişiklikləri edir (**Patching**).

---

# Concurrent Rendering

Kitabın sonunda qeyd olunur ki, React-ın yeni versiyalarında (**React 18** və sonrakılar) daxili **rendering** alqoritmləri daha da təkmilləşdirilib.

Əvvəllər böyük bir render prosesi əsas axını (**main thread**) uzun müddət məşğul saxlaya bilərdi və bu müddətdə istifadəçi klik etsə belə, browser cavab verməkdə gecikə bilərdi.

Yeni **Concurrent Rendering** mexanizmi React-a işləri daha çevik planlamağa imkan verir. React uzun render prosesini hissələrə bölə, daha vacib istifadəçi əməliyyatlarına (məsələn, klik və ya yazı daxil etmə) üstünlük verə və daha axıcı istifadəçi təcrübəsi təmin edə bilir.

---

# Bu bölmənin əsas mesajı

Bu bölmənin vermək istədiyi əsas fikir budur:

- React **Declarative UI** yanaşmasını performansdan imtina etmədən təqdim edir.
- React hər dəfə **re-render** etsə də, **Real DOM**u tamamilə yeniləmir.
- Bunun üçün **Virtual DOM** istifadə olunur.
- React köhnə və yeni **Virtual DOM** ağaclarını müqayisə edir (**Diffing**) və yalnız həqiqətən dəyişən hissələri **Real DOM**a tətbiq edir (**Patching**).
- Nəticədə proqramçı sadə və oxunaqlı kod yazır, React isə arxa planda performansı optimallaşdırır. Bu mexanizm React-ın digər UI kitabxanalarından fərqlənməsinin əsas səbəblərindən biridir.

  # The Right Level of Abstraction — React-ın Ən Böyük Gücü

Bir çox proqramçı React öyrənməyə başlayanda onun komponentləri, JSX və hook-larına fokuslanır. Lakin React-ı uzunömürlü və güclü edən əsas xüsusiyyət bunlar deyil. React-ın əsl gücü onun təqdim etdiyi **abstraction** səviyyəsindədir.

Məhz bu abstraksiya React-ın eyni proqramlaşdırma modelini müxtəlif platformalarda tətbiq etməsinə imkan verir.

## Abstraction nədir?

Abstraction proqramlaşdırmada mürəkkəb detalları gizlədərək proqramçının yalnız vacib hissəyə fokuslanmasını təmin edən yanaşmadır.

Məsələn, avtomobil idarə edərkən mühərrikin daxilində yanacağın necə yandığını bilmirik. Biz sadəcə sükanı çevirir, qaz və əyləc pedalından istifadə edirik. Mürəkkəb mexanizmlər bizdən gizlədilib.

React da eyni prinsiplə işləyir.

Sən browser-in DOM API-lərini, native platformaların render mexanizmlərini və ya PDF generatorlarının daxili işləmə prinsipini bilmədən istifadəçi interfeysi yaradırsan.

---

## React əslində DOM deyil

Yeni başlayanların etdiyi ən böyük səhvlərdən biri React-ı DOM ilə eyniləşdirməkdir.

Əslində React və React DOM fərqli anlayışlardır.

**React** komponentləri, state, props, hooks və reconciliation kimi əsas mexanizmləri təmin edir.

**React DOM** isə bu komponentləri browser-in DOM elementlərinə çevirən xüsusi bir render mühərrikidir.

Başqa sözlə:

- React → UI necə olmalıdır?
- React DOM → Bunu browser-də necə göstərmək lazımdır?

Bu iki anlayışı ayırdıqda React-ın niyə bu qədər çevik olduğunu başa düşmək daha asan olur.

---

## React yalnız browser üçün yazılmayıb

React komponenti yazarkən belə bir kod yazırsan:

```jsx
function Button() {
  return <button>Save</button>;
}
```

Bu komponent browser-də işləyə bilər.

Amma eyni proqramlaşdırma modeli telefon tətbiqində də işləyə bilər.

Çünki React komponenti heç vaxt birbaşa browser ilə danışmır.

O, sadəcə UI təsvir edir.

Bu UI-nın hara render olunacağına isə renderer qərar verir.

---

## React Renderer nədir?

Renderer React komponentlərini konkret platformaya uyğun nəticəyə çevirən mühərrikdir.

Fərqli platformalar üçün fərqli renderer mövcuddur.

### React DOM

Brauzer üçün istifadə olunur.

React komponentlərini HTML elementlərinə çevirir.

```
React Component

↓

React DOM

↓

Browser DOM
```

---

### React Native

Mobil tətbiqlər üçün istifadə olunur.

Burada HTML yoxdur.

```
<View>
<Text>
<Button>
```

kimi Native komponentlər yaradılır.

Sən React yazırsan.

React Native isə onu Android və iOS komponentlərinə çevirir.

---

### React PDF

React komponentlərindən PDF sənədləri yaratmağa imkan verir.

Yəni eyni React yanaşması ilə hesabatlar, fakturalar və digər PDF sənədləri hazırlamaq mümkündür.

---

### React Unity

React komponentlərini Unity oyun mühərrikində istifadə etməyə imkan verən renderer-lər də mövcuddur.

Bu göstərir ki, React konkret bir platformaya bağlı texnologiya deyil.

---

## React nəyə fokuslanır?

React heç vaxt demir:

> "HTML yarat."
> 

React deyir:

> "İstifadəçi interfeysini təsvir et."
> 

Bu iki fikir arasında böyük fərq var.

Çünki UI müxtəlif formalarda mövcud ola bilər:

- Browser
- Mobil tətbiq
- Desktop tətbiqi
- Smart TV
- PDF
- Oyun mühərriki
- Gələcəkdə yaranacaq yeni platformalar

React üçün bunların hamısı sadəcə fərqli render hədəfləridir.

---

## React niyə bu qədər uzunömürlüdür?

Texnologiyalar dəyişir.

Bir vaxtlar jQuery çox populyar idi.

Sonra Angular.

Sonra Vue.

Daha sonra Svelte və digər framework-lər ortaya çıxdı.

Lakin React uzun illərdir aktuallığını qoruyur.

Bunun səbəblərindən biri React-ın konkret platformaya deyil, UI modelinə fokuslanmasıdır.

Əgər sabah tamamilə yeni bir cihaz növü yaradılsa, həmin platforma üçün yeni bir renderer yazmaq kifayət edə bilər.

React komponentləri isə böyük ölçüdə dəyişmədən istifadə oluna bilər.

---

## React proqramçısı nəyi öyrənməlidir?

Əsl React proqramçısı DOM API-lərini əzbərləməyə çalışmır.

O, aşağıdakı anlayışları dərindən başa düşür:

- Component
- State
- Props
- Hooks
- Rendering
- Re-render
- Composition
- Reconciliation

Çünki bunlar React-ın platformadan asılı olmayan əsas konsepsiyalarıdır.

Renderer isə həmin konsepsiyaları konkret platformaya uyğun həyata keçirir.

---

## Real həyatdan bənzətmə

Bunu elektrik prizinə bənzətmək olar.

Telefon adapteri, noutbuk adapteri və ya televizor fərqli cihazlardır.

Amma hamısı eyni prizdən istifadə edir.

React da həmin priz kimidir.

Renderer-lər isə müxtəlif adapterlərdir.

```
React Component

↓

Renderer

↓

Browser
```

və ya

```
React Component

↓

Renderer

↓

Android
```

və ya

```
React Component

↓

Renderer

↓

PDF
```

Sən yalnız komponent yazırsan.

Renderer isə həmin komponenti uyğun platformaya çevirir.

---

## Nəticə

React-ın ən böyük üstünlüyü onun müəyyən platformaya deyil, istifadəçi interfeysinin təsvirinə fokuslanmasıdır.

Komponentlər platformadan asılı deyil.

Platformaya uyğunlaşan hissə renderer-dir.

Bu abstraksiya React-a müxtəlif mühitlərdə işləmək, yeni platformalara uyğunlaşmaq və uzun illər aktuallığını qorumaq imkanı verir.

Məhz buna görə React sadəcə browser kitabxanası deyil. O, müxtəlif platformalarda istifadəçi interfeysləri qurmaq üçün ümumi bir proqramlaşdırma modelidir.
# İlk JSX tətbiqimiz: "Hello World" arxasında nə baş verir?

React öyrənməyə başlayanda hər kəs eyni yerdən keçir: ekrana "Hello World" yazdırmaq. Sadə görünür, amma bu bir sətir kodun arxasında React-in bütün fəlsəfəsi gizlənib — **deklarativ** düşüncə tərzi.

Bu yazıda çox sadə bir JSX nümunəsindən başlayacağıq, sonra "kapotun altına" baxıb görəcəyik ki, browser əslində bu kodu necə başa düşür.

---

## Ən sadə JSX nümunəsi

Budur, ilk JSX tətbiqimiz:

```jsx
import * as ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <p>
    Hello, <strong>JSX</strong>
  </p>
);
```

Burada üç addım var:

1. `document.getElementById("root")` ilə səhifədəki boş bir DOM elementini tapırıq.
2. `ReactDOM.createRoot()` həmin elementi React-in idarə edəcəyi bir "kök"ə (root) çevirir.
3. `root.render()` isə bu kökə nəyi çəkmək istədiyimizi deyir — bizim halda, içində qalın (`<strong>`) yazılmış "JSX" sözü olan bir paraqraf.

Nəticə çox sadədir: səhifədə "Hello, **JSX**" görünür. Əslində bunu adi HTML string kimi də DOM-a yerləşdirmək olardı. Amma məqsəd effekt deyil, JSX-in necə render olunduğunu göstərməkdir.

---

## JSX əslində browser üçün deyil

Burada vacib bir məqamı qeyd etmək lazımdır: **browser JSX-i başa düşmür.**

`<p>Hello, <strong>JSX</strong></p>` kimi görünən bu sintaksis əslində adi JavaScript deyil — HTML-ə bənzəyən, amma JS faylının içində yazılan xüsusi bir yazı formasıdır. Buna görə də kod browserə çatmadan əvvəl adi JavaScript-ə **çevrilməlidir**. Bu işi adətən Vite və ya Babel kimi alətlər görür.

Vite JSX-i emal edərkən onu `React.createElement()` çağırışlarına çevirir. Yuxarıdakı nümunə əslində belə koda "tərcümə" olunur:

```jsx
import * as ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  React.createElement(
    "p",
    null,
    "Hello, ",
    React.createElement("strong", null, "JSX")
  )
);
```

Diqqət edin: siz heç vaxt bu kodu özünüz yazmırsınız — bunu arxa planda Vite (və ya Babel) sizin üçün edir. Amma nə baş verdiyini bilmək vacibdir, çünki JSX-in "sehr" olmadığını, sadəcə funksiya çağırışları üçün rahat bir qısa yol (syntactic sugar) olduğunu göstərir.

`React.createElement()`-in arqumentlərinə baxaq:

- **Birinci arqument** — elementin tipi. Bu, DOM elementləri üçün `"div"`, `"p"` kimi bir string, ya da composite komponentlər üçün bir React komponenti ola bilər.
- **İkinci arqument** — həmin elementin prop-larını saxlayan obyekt (yoxdursa `null`).
- **Sonrakı arqumentlər** — elementin uşaqları (children).

---

## React elementi nədir?

`React.createElement()`-in qaytardığı nəticəyə **React elementi** deyilir. Bu, sadəcə adi bir JavaScript obyektidir — UI-nin bir hissəsinin necə görünməli olduğunu təsvir edən "sənəd" kimi düşünə bilərsiniz.

React bu obyektləri özü birbaşa DOM-a çevirmir, əvvəlcə onları öz daxili təmsilçisi olan **virtual DOM**-a əlavə edir. Sonra **reconciliation** adlanan bir alqoritm işə düşür: state dəyişəndə React köhnə və yeni virtual DOM-u müqayisə edir və yalnız fərqlənən yerləri real DOM-da yeniləyir.

> Başqa sözlə: state dəyişəndə React **bütün komponenti yenidən qurmur** — yalnız dəyişən minimal hissəni tapıb yeniləyir. Bu da React-i sürətli edən əsas səbəblərdən biridir.

---

## Deklarativ olmaq nə deməkdir?

Yuxarıdakı "Hello World" nümunəsinə diqqətlə baxsaq, kodun **nəyi** göstərmək istədiyimizi izah etdiyini görərik — **necə** göstərəcəyini yox. JSX-ə baxaraq deyə bilərik ki, "bu komponent bir paraqraf və onun içində qalın yazı render edəcək". Vəssalam.

İmperativ yanaşmada isə vəziyyət fərqli olardı: əvvəlcə paraqraf elementi yaratmalı, sonra ona mətn əlavə etməli, sonra `<strong>` elementi yaratmalı, onu paraqrafa uşaq kimi əlavə etməli və bütün bunları müəyyən ardıcıllıqla etməli olardıq. Nə qədər çox addım olsa, bir o qədər səhv ehtimalı artır.

> **JSX deklarativdir, çünki o, nəticəni təsvir edir — addımları deyil.**

React-in `render()` funksiyası məhz bunu edir: siz UI-nin necə görünməli olduğunu təsvir edirsiniz, React isə bunu ən effektiv şəkildə real DOM-a çevirməyi öz üzərinə götürür.

---

## HTML teqlərini birbaşa render etmək

JSX-in ən praktik tərəflərindən biri budur ki, adi HTML teqlərini heç bir əlavə tərif və ya import olmadan birbaşa istifadə edə bilirsiniz. Çünki React bu teqlər üçün özündə hazır komponentlər saxlayır — sizin hər dəfə `div` və ya `button` üçün ayrıca komponent yazmağınıza ehtiyac yoxdur.

Bir neçə HTML tegini eyni anda render edən nümunəyə baxaq:

```jsx
import * as ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div>
    <button />
    <code />
    <input />
    <label />
    <p />
    <pre />
    <select />
    <table />
    <ul />
  </div>
);
```

Bu nümunədə çıxışın necə görünəcəyi əhəmiyyətli deyil — məqsəd sadəcə odur ki, istənilən HTML teqini xüsusi tərif yazmadan JSX-də sərbəst render edə bilirik.

Diqqət etdinizsə, bütün teqlər bir `<div>`-in içinə yığılıb. Bunun səbəbi sadədir: **React-in render etmək üçün tək bir kök elementə ehtiyacı var.** Kitabın sonrakı hissələrində bu qonşu elementləri əlavə bir valideyn teq olmadan necə render etmək olduğunu da öyrənəcəyik.

JSX-də render olunan HTML elementləri əsasən adi HTML sintaksisinə oxşayır, sadəcə "case-sensitivity" (böyük-kiçik hərf fərqi) və atributlarla bağlı bəzi kiçik fərqlər var — bunları irəlidə ətraflı araşdıracağıq.

---

## Nəticə

İlk baxışdan JSX sadə bir HTML-yə bənzəyən sintaksis kimi görünür. Amma arxasında güclü bir fikir dayanır: **kod nəyi göstərmək istədiyinizi təsvir edir, necə göstərəcəyini yox.**

Vite və ya Babel kimi alətlər bu JSX-i `React.createElement()` çağırışlarına çevirir, bu çağırışlar isə React elementləri yaradır — React bu elementlər üzərində reconciliation aparıb real DOM-u effektiv şəkildə yeniləyir.

Qısaca desək: **imperativ dünyada siz "necə" sualına cavab verirsiniz, JSX dünyasında isə sadəcə "nə" sualına cavab verirsiniz — qalanını React öz üzərinə götürür.**

# JSX-də HTML teqləri necə yazılır və öz komponentini necə yaradırsan?

JSX ilk baxışdan HTML-ə çox bənzəyir, amma bir neçə qayda var ki, unudulanda kod sadəcə işləmir — compile mərhələsində partlayır. Bu yazıda həmin qaydaları, JSX-lə mürəkkəb UI strukturlarının necə təsvir olunduğunu və öz JSX elementini (komponentini) necə yaratmağı görəcəyik.

---

## Qayda #1: kiçik hərflə başlayan teq = HTML, böyük hərflə başlayan = sənin komponentin

JSX-də teq adının böyük-kiçik hərflə yazılması təsadüfi deyil, React üçün bir işarədir:

- **kiçik hərflə başlayan** teq (`<button>`, `<div>`, `<p>`) → React bunu **built-in HTML elementi** kimi qəbul edir.
- **böyük hərflə başlayan** teq (`<Button>`, `<MyComponent>`) → React bunu **sənin yazdığın komponent** kimi axtarır.

Bu qayda sayəsində koda baxanda gözünüz built-in HTML elementlərini sizin yazdığınız komponentlərdən dərhal ayıra bilir — əlavə heç nə oxumadan.

HTML elementlərinə adi atributlarını (`title`, `id`, `className` və s.) ötürə bilərsiniz. Amma React tanımadığı bir atribut görəndə susmur — konsola xəbərdarlıq (`warning`) yazır:

```jsx
import * as ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <button title="My Button" foo="bar">
    My Button
  </button>
);

root.render(<Button />);
```

Bu kodda iki fərqli problem var:

1. `<button>` elementinə `foo="bar"` deyə bilinməyən bir atribut ötürülüb — React bunu tanımır və konsola xəbərdarlıq yazacaq, amma kod işə düşəcək.
2. `<Button />` isə tam fərqli hekayədir: **kod heç compile olmayacaq**, çünki heç bir yerdə `Button` adlı komponent tərif olunmayıb. React `<Button>`-u komponent kimi axtarır, tapmır və xəta verir.

> **Nəticə:** istənilən HTML teqini JSX-də sərbəst istifadə edə bilərsiniz, sadəcə iki şeyi yadda saxlamaq lazımdır — teqlər böyük-kiçik hərfə həssasdır, və atribut adları düzgün olmalıdır.

---

## Sadə teqlərdən UI strukturuna keçid

JSX-in əsl gücü tək bir elementi göstərməkdə deyil, bütün səhifə strukturunu bir yerdə, oxunaqlı şəkildə təsvir etməkdə özünü göstərir. Bax bu nümunəyə:

```jsx
import * as ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <section>
    <header>
      <h1>A Header</h1>
    </header>
    <nav>
      <a href="item">Nav Item</a>
    </nav>
    <main>
      <p>The main content...</p>
    </main>
    <footer>
      <small>&copy; 2024</small>
    </footer>
  </section>
);
```

Burada `<header>`, `<nav>`, `<main>`, `<footer>` kimi **semantik HTML teqləri** istifadə olunub — bunlar sadəcə görünüş üçün deyil, səhifənin hansı hissəsinin nə olduğunu (başlıq, naviqasiya, əsas məzmun, alt hissə) bildirir. Bu həm brauzer və axtarış sistemləri, həm də ekran oxuyucuları (screen reader) üçün faydalıdır.

Diqqət edin ki, bu kod imperativ yazılsaydı (əvvəlcə elementi yarat, sonra uşaq əlavə et, sonra digər elementi yarat...), strukturu bir baxışda görmək çətin olardı. JSX isə HTML-ə bənzədiyi üçün iyerarxiyanı — kimin kimin içində olduğunu — dərhal göstərir.

> **UI-ə tək-tək element kimi deyil, bütöv bir struktur kimi baxmaq lazımdır — məhz JSX bunu asanlaşdırır.**

---

## Öz JSX elementini yaratmaq: komponentlər

İndiyə qədər yalnız built-in HTML teqlərindən istifadə etdik. Amma React-in əsl gücü **komponentlərdədir** — böyük, təkrarlanan strukturları öz teqinizin arxasında "gizlətmək" imkanıdır.

Komponent sadəcə JSX qaytaran bir funksiyadır. Onu yaratdıqdan sonra, adi HTML teqi kimi çağıra bilərsiniz:

```jsx
import * as ReactDOM from "react-dom";

function MyComponent() {
  return (
    <section>
      <h1>My Component</h1>
      <p>Content in my component...</p>
    </section>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MyComponent />);
```

Burada baş verənləri addım-addım deşifrə edək:

1. `MyComponent` adlı bir funksiya yazırıq. Funksiyanın adı böyük hərflə başlayır — bu, React-ə "bu bir komponentdir, HTML teqi deyil" siqnalını verir.
2. Funksiya `return` ilə bir JSX bloku qaytarır — bu, komponentin "əvəzinə" nəyin render olunacağını göstərir.
3. `root.render(<MyComponent />)` çağırılanda, React `<MyComponent>` yerinə funksiyanın qaytardığı `<section>` və onun içindəkiləri render edir.

Nəticədə ekranda sadəcə `<section><h1>My Component</h1><p>...</p></section>` görünür — `<MyComponent>` teqinin özü heç vaxt real DOM-a düşmür, o sadəcə "bu strukturu bura qoy" demək üçün bir qısayoldur.

> **Vacib qayda:** JSX-də istifadə etdiyiniz hər bir öz komponentiniz, işlədiyi eyni scope-da (əhatə dairəsində) mövcud olmalıdır. Yuxarıdakı nümunədə `MyComponent` funksiyası elə `render()` çağırışı ilə eyni yerdə tərif olunduğu üçün hər şey işlədi. Real layihələrdə isə adətən komponentləri ayrı fayllarda yazıb `import` edəcəksiniz — beləliklə onlar lazım olan scope-a düşür.

---

## Nəticə

JSX-in HTML-ə bənzəməsi aldadıcı ola bilər — arxasında ciddi qaydalar var: teq adının hərf ölçüsü onun HTML yoxsa komponent olduğunu müəyyən edir, tanınmayan atributlar xəbərdarlıq doğurur, tanınmayan komponentlər isə kodu tamamilə saxlayır.

Amma məhz bu qaydalar sayəsində JSX güclü olur: semantik teqlərlə mürəkkəb səhifə strukturunu bir baxışda oxunaqlı yazmaq, sonra da təkrarlanan hissələri öz komponentinizin arxasında gizlədib, onları sadə bir teq kimi yenidən istifadə etmək mümkün olur.

**Qısaca:** HTML teqləri kiçik hərflə — brauzerin başa düşdüyü dil. Sənin komponentlərin böyük hərflə — sənin öz vokabulyarın. İkisi birlikdə JSX-i həm tanış, həm də genişlənə bilən edir.
# JSX-də komponentlər bir-birinin içinə necə yerləşir? `props.children` sirri

HTML-də `<li>` teqi tək başına mənasızdır — o ancaq `<ul>` və ya `<ol>`-un içində, valideyn-övlad (parent-child) münasibətində mövcud olur. React komponentləri yazanda da eyni məntiqlə qarşılaşırsınız: bir komponenti başqa bir komponentin içinə necə "soxmaq" olar? Cavab `props.children` adlı xüsusi bir mexanizmdədir.

---

## Komponentləri iç-içə yerləşdirmək

JSX-in gücü elementlər arasında valideyn-övlad münasibəti qura bilməsindədir. Övlad element sadəcə başqa bir komponentin daxilinə yazılmaqla yaranır:

```jsx
import * as ReactDOM from "react-dom";
import MySection from "./MySection";
import MyButton from "./MyButton";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <MySection>
    <MyButton>My Button Text</MyButton>
  </MySection>
);
```

Burada iki öz komponentiniz import olunub: `MySection` və `MyButton`. Kodda `<MyButton>`, `<MySection>`-un övladı kimi yazılıb. Maraqlısı budur ki, `MyButton` özü də bir mətni ("My Button Text") övlad kimi qəbul edir — başqa JSX elementi yox, sadəcə mətn.

Bu münasibəti reallaşdıran mexanizmi görək.

## `props.children` necə işləyir

`MySection` komponentinə baxaq:

```jsx
export default function MySection(props) {
  return (
    <section>
      <h2>My Section</h2>
      {props.children}
    </section>
  );
}
```

Komponent adi bir `<section>` HTML elementi, bir başlıq (`<h2>`) və sonra `{props.children}` qaytarır. Məhz bu son sətir komponentə "içinə nə yazılıbsa, onu bura render et" imkanı verir.

> **`props.children` — komponentin daxilinə yazdığınız hər şeyi (JSX, mətn, başqa komponentlər) təmsil edən xüsusi bir prop-dur.** Onu adi HTML-də `<div>...</div>` teqinin arasına nə yazsanız görünməsinə bənzədə bilərsiniz — fərq odur ki, burada bu "araya yazılan hissə" `props.children` adlı dəyişən vasitəsilə komponentin öz nəzarətinə keçir.

İndi `MyButton` komponentinə baxaq — eyni naxış təkrarlanır:

```jsx
export default function MyButton(props) {
  return <button>{props.children}</button>;
}
```

`MyButton` da eyni qaydadan istifadə edir: `{props.children}` dəyərini götürüb `<button>` teqinin arasına qoyur. Bizim nümunədə bu, "My Button Text" mətnidir.

## Zəncirvari ötürülmə: `MySection` heç nə bilmədən köməkçi olur

Bu nümunədə buton mətni `MyButton`-un övladıdır, `MyButton` isə öz növbəsində `MySection`-un övladıdır. Amma diqqətli olun: buton mətni `MySection`-un **içindən keçərək** şəffaf şəkildə ötürülür.

Başqa sözlə — `MySection` komponentinin daxilində `MyButton`-a mətn çatdırmaq üçün heç bir əlavə kod yazmadıq. `MySection` sadəcə "mənim içimə nə qoyulubsa, onu göstər" dedi (`{props.children}` vasitəsilə), React isə qalanını öz üzərinə götürdü.

Render olunan nəticə belə görünür: bir bölmə (`<section>`) başlığı ilə, altında isə "My Button Text" yazılı bir düymə.

> **Vacib fikir:** `props.children` sayəsində komponentlər öz daxilində nə olduğunu bilmədən belə, onu düzgün yerə yerləşdirə bilir. Bu, React-də "wrapper" (bükücü) komponentlər yaratmağın əsasını təşkil edir — məsələn, kart, modal, layout kimi strukturlar məhz bu üsulla qurulur.

Bu qədər: statik komponentlər öyrəndik — bir dəfə render olunub, sonra heç vaxt dəyişməyən strukturlar. Amma React-i güclü edən əsl şey budur ki, JSX daxilinə **canlı JavaScript ifadələri** də yazıla bilir. İndi bunu görək.

---

## JavaScript ifadələri: JSX-in dinamik ürəyi

JSX-in xüsusi bir sintaksisi var ki, onun sayəsində adi JavaScript ifadələrini markup-un içinə "əkmək" mümkündür. React JSX-i hər render etdiyi zaman, `{}` mötərizələri arasındakı bu ifadələr yenidən hesablanır.

> **Elə bu xüsusiyyət JSX-in dinamikliyinin əsasını təşkil edir:** komponentin göstərdiyi məzmun və atributlar, tətbiqin datası və ya state-i dəyişdikcə avtomatik yenilənir. React hər render/re-render zamanı bu ifadələri yenidən qiymətləndirir ki, ekranda görünən UI həmişə cari data ilə üst-üstə düşsün.

## Dinamik atribut və mətn dəyərləri

Bəzi HTML atributları və ya mətn dəyərləri statikdir — JSX yenidən render olunanda dəyişmir. Digərləri isə tətbiqin başqa yerində saxlanan dataya əsaslanır. Unutmayın: React sadəcə "görünüş qatı"dır (view layer) — datanın özü haradasa kənarda yaşayır.

Nümunəyə baxaq:

```jsx
import * as ReactDOM from "react-dom";

const enabled = false;
const text = "A Button";
const placeholder = "input value...";
const size = 50;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <section>
    <button disabled={!enabled}>{text}</button>
    <input placeholder={placeholder} size={size} />
  </section>
);
```

Bu kodda `{}` mötərizələri arasına düzərli JavaScript ifadəsi qoymaq mümkündür — dəyişən adı, obyekt propertisi, hətta iç-içə JSX də ola bilər. Diqqət edin: `disabled={!enabled}` ifadəsi `!enabled`-i hesablayır, yəni bir boolean (məntiqi) dəyər yaradır — `enabled` `false` olduğu üçün `!enabled` `true` olur və buton "disabled" (deaktiv) görünür.

`{text}`, `{placeholder}`, `{size}` isə sadəcə əvvəldən təyin olunmuş dəyişənlərin dəyərini JSX-in içinə köçürür.

> **Qısa qayda:** `{}` mötərizələrinin arasına — istər atributda, istərsə mətndə — hər hansı düzgün JavaScript ifadəsi yaza bilərsiniz. Bu, sadə bir dəyişən adından tutmuş mürəkkəb funksiya çağırışına qədər hər şey ola bilər.

İlkin (primitiv) JavaScript dəyərlərini (string, number, boolean) JSX-də istifadə etmək asandır. Amma iş bununla bitmir — obyektlər, massivlər, hətta hadisələri (event) idarə edən funksiyalar da eyni `{}` sintaksisi ilə JSX-ə daxil edilə bilər. Bu, növbəti mövzudur.

---

## Nəticə

JSX-in gücü iki sadə fikirdə gizlənib: birincisi, `props.children` vasitəsilə komponentləri bir-birinin içinə yerləşdirmək və valideyn komponentin övladın məzmununu bilmədən belə onu düzgün yerə "köçürməsi"; ikincisi, `{}` mötərizələri ilə JSX-in içinə canlı JavaScript ifadələri əkmək imkanı.

**Qısaca:** statik JSX bir dəfə çəkilib qalan şəkil kimidir — dəyişən JSX isə datanı izləyən canlı ekrandır. `props.children` strukturu, `{}` ifadələri isə həyatı gətirir.

### Why React?

Əgər bu kitabı oxuyursunuzsa, çox güman ki, artıq **React** ilə tanışsınız. Əgər tanış deyilsinizsə, narahat olmayın. Fəlsəfi izahları minimum səviyyədə saxlamağa çalışacağam. Bununla belə, bu kitab kifayət qədər genişdir və çoxlu mövzunu əhatə edir. Buna görə də əvvəlcə ümumi yanaşmanı müəyyənləşdirmək vacibdir.

Məqsədimiz yalnız **React** və **React Native** öyrənmək deyil. Eyni zamanda, bu gün və gələcəkdə **React** ilə hazırlamaq istədiyimiz istənilən tətbiqi dəstəkləyə biləcək, **scalable** və **adaptive architecture** qurmağı öyrənəcəyik.

Başqa sözlə, məqsədimiz **React** ətrafında möhkəm bir təməl yaratmaq, onu müxtəlif alətlər və yanaşmalarla birləşdirərək uzunmüddətli istifadəyə uyğun bir ekosistem qurmaqdır. Bu kitab sizə **routing**, **TypeScript typing**, **testing** və bir çox digər vasitələrdən istifadə etməyi addım-addım göstərəcək.

Bu fəsildə əvvəlcə **React**-ın niyə yaradıldığını qısa şəkildə izah edəcəyik. Daha sonra **React**-ın sadəliyinə və onun veb tərtibatçılarının tez-tez qarşılaşdığı performans problemlərini necə həll etdiyinə baxacağıq.

Sonra **React**-ın **declarative** yanaşmasını və onun təqdim etdiyi **abstraction** səviyyəsini müzakirə edəcəyik. Daha sonra **React**-ın əsas xüsusiyyətlərinə toxunacaq və sonda isə ilk **React** layihəsini necə yaratmağı öyrənəcəyik.

**React**-ın əsas konsepsiyalarını və **UI development** sahəsində hansı problemləri həll etdiyini başa düşdükdən sonra kitabın qalan hissəsini öyrənmək sizin üçün daha asan olacaq.

Bu fəsildə aşağıdakı mövzular əhatə olunur:

- React nədir?
- React-da hansı yeniliklər var?
- Yeni React layihəsinin yaradılması
- 

## React nədir?

Məncə, **React**-ın rəsmi saytında (react.dev) verilən bir cümləlik təsvir həm qısa, həm də dəqiqdir:

> **"İstifadəçi interfeysləri (user interfaces) yaratmaq üçün JavaScript kitabxanası."**
> 

Bu təsvir mükəmməldir. Çünki əksər hallarda bizə məhz bu lazımdır. Məncə, bu cümlənin ən gözəl tərəfi dediklərindən çox, demədikləridir.

React **mega-framework** deyil.

O, verilənlər bazasından (**database**) tutmuş **WebSocket** vasitəsilə real vaxt yeniləmələrinə qədər hər şeyi özündə birləşdirən **full-stack** həll təqdim etmir. Əslində isə belə əvvəlcədən hazırlanmış həllərin hamısına həmişə ehtiyac olmur.

Bəs React **framework** deyilsə, onda əslində nədir?

---

## React sadəcə View Layer-dir

React adətən tətbiqin (**application**) **view layer**-i kimi qəbul edilir.

Bir tətbiq adətən bir neçə hissədən ibarət olur:

- **View Layer**
- **Logic Layer**
- **Data Layer**

Bu arxitekturada React əsasən **View Layer** üçün məsuliyyət daşıyır. Yəni məlumat (**data**) və tətbiqin vəziyyəti (**application state**) dəyişdikdə **UI**-ın render olunmasını və yenilənməsini idarə edir.

React komponentləri istifadəçinin ekranda nə gördüyünü müəyyən edir.

Şəkil 1.1 React-ın frontend tətbiqində hansı mövqedə yerləşdiyini göstərir.

---

Əslində React-ın əsas ideyası bundan ibarətdir.

Kitab boyunca bu ideyanın müxtəlif tətbiqlərini görəcəyik, lakin ümumi iş prinsipi demək olar ki, həmişə eyni qalır.

1. **Application Logic**
    
    Əvvəlcə tətbiqin biznes məntiqi işləyir və müəyyən **data** yaradır.
    
2. **Məlumatın UI-da göstərilməsi**
    
    Növbəti mərhələdə həmin məlumat **UI**-da render olunur.
    
3. **React Component**
    
    Bunun üçün həmin **data** React komponentinə ötürülür.
    
4. **Component-in rolu**
    
    React komponentinin əsas vəzifəsi həmin məlumat əsasında lazımi **HTML**-i yaradıb səhifədə göstərməkdir.
    

---

Burada belə bir sual yarana bilər:

> "Bunun nəyi fərqlidir? React sadəcə növbəti rendering texnologiyası deyilmi?"
> 

İlk baxışdan belə görünə bilər.

Lakin React tətbiq hazırlama prosesini sadələşdirən bir sıra mühüm xüsusiyyətlər təqdim edir. Fəslin davamında həmin üstünlüklərə daha yaxından baxacağıq.

---

# Sadəlik üstünlükdür

React öyrənilməsi və başa düşülməsi lazım olan çoxsaylı mürəkkəb hissələrdən ibarət deyil.

Onun **API**-si kifayət qədər sadədir. Bununla belə, daxildə React kifayət qədər mürəkkəb mexanizmlərlə işləyir. Kitab boyunca bu daxili mexanizmləri və React-ın arxitekturasını ətraflı öyrənəcəyik ki, onun necə işlədiyini daha yaxşı başa düşəsiniz.

Kiçik və sadə **API**-nin əsas üstünlüyü ondan ibarətdir ki, siz vaxtınızı onu öyrənməyə, sınaqdan keçirməyə və təcrübə qazanmağa sərf edirsiniz.

Böyük **framework**-larda isə vaxtın böyük hissəsi müxtəlif funksiyaların necə işlədiyini anlamağa gedir.

Şəkil 1.2 React ilə işləyərkən əsas diqqət yetirdiyimiz API-ləri göstərir.

---

React iki əsas API-dən ibarətdir.

### React Component API

Səhifədə render olunan komponentlərdən ibarətdir.

### React DOM

Komponentlərin veb səhifədə render olunmasını həyata keçirən API-dir.

---

Hər bir React komponentində əsasən aşağıdakı anlayışlarla işləyirik.

### Data

Komponentə müxtəlif mənbələrdən ötürülən məlumatdır. Komponent üçün həmin məlumatın haradan gəldiyi önəmli deyil. O, sadəcə bu məlumatı render edir.

### Lifecycle

Komponentin həyat dövrünü (**lifecycle**) ifadə edir.

Məsələn, komponent render olunmazdan əvvəl, render olunduqdan sonra və ya səhifədən silinərkən müəyyən **hook** və ya metodlar işə düşür.

### Events

İstifadəçi qarşılıqlı əlaqələrinə (**user interactions**) cavab vermək üçün yazdığımız kod hissələridir.

### JSX

React komponentlərində **UI** strukturunu təsvir etmək üçün istifadə olunan sintaksisdir.

JSX əsasən React ilə əlaqələndirilsə də, onu digər JavaScript kitabxanaları və framework-lərlə birlikdə də istifadə etmək mümkündür.

---

Hələlik bu anlayışların hər birini tam başa düşməyə çalışmayın.

Burada əsas fikir odur ki, React öz təbiətinə görə sadədir.

Diqqət etsəniz, öyrənilməsi lazım olan anlayışların sayı kifayət qədər azdır.

Bu isə o deməkdir ki, uzun müddət API detalları ilə məşğul olmaq əvəzinə, əsas prinsipləri öyrəndikdən sonra React-dan düzgün istifadə nümunələrinə (**React usage patterns**) və **declarative UI** yanaşmasına daha çox diqqət ayıra bilərik.
## Declarative UI Structures — Ətraflı xülasə

Bu bölmənin əsas ideyası budur ki, **React-da UI-nı "necə dəyişəcəyimizi" deyil, "necə görünməsini istədiyimizi" təsvir edirik.** Bu yanaşma **Declarative Programming** adlanır.

---

## Separation of Concerns anlayışı

Uzun illər proqramlaşdırmada belə bir prinsip mövcud idi:

> **Logic** və **Presentation** bir-birindən ayrılmalıdır.
> 

Məsələn:

- HTML → görünüş
- CSS → dizayn
- JavaScript → məntiq

React-a ilk dəfə baxan insanların çoxu JSX-i görəndə təəccüblənirlər. Çünki JavaScript kodunun içində HTML-yə bənzər sintaksis yazılır.

Bir çox proqramçı əvvəlcə bunu pis təcrübə hesab edir.

Amma React bunu təsadüfi etmir.

---

## JSX nədir?

JSX (**JavaScript XML**) React komponentlərinin UI strukturunu təsvir etmək üçün istifadə etdiyi sintaksisdir.

Məsələn:

```jsx
return (
  <div>
    <h1>Hello</h1>
  </div>
);
```

Bu kod HTML deyil.

Bu da JavaScript deyil.

Bu, JSX-dir.

React sonradan bunu adi JavaScript funksiyalarına çevirir.

---

## React niyə JSX istifadə edir?

Çünki JSX vasitəsilə UI-ı oxumaq daha asandır.

Məsələn belə yazmaq əvəzinə:

```jsx
document.createElement(...)
appendChild(...)
setAttribute(...)
```

sadəcə yazırsan

```jsx
<div>
   <Button />
</div>
```

və React qalan işi özü edir.

---

# Imperative Programming

React-dan əvvəl UI əsasən belə dəyişdirilirdi.

Məsələn jQuery:

```jsx
$("#button").click(function () {
    $("#text").addClass("active");
});
```

Burada sən browser-ə addım-addım əmr verirsən.

1. Button-u tap
2. Click gözlə
3. Paragraph tap
4. Class əlavə et

Bu yanaşmaya **Imperative Programming** deyilir.

Yəni

> **"Necə et."**
> 

deyirsən.

---

## Bunun problemi nədir?

Kiçik layihələrdə problem görünmür.

Amma layihə böyüdükcə belə kod yaranır.

```
Button click

↓

Element tap

↓

API çağır

↓

Loading göstər

↓

Spinner gizlət

↓

Error göstər

↓

Class dəyiş

↓

Başqa elementi yenilə

↓

Yeni modal aç
```

Artıq yüzlərlə addım olur.

Kod:

- qarışıq olur
- oxunması çətinləşir
- dəyişdirilməsi riskli olur

Bir yerdə dəyişiklik başqa yeri poza bilir.

---

# Declarative Programming

React isə tam əksini edir.

Sən browser-ə

> bunu et
> 

demirsən.

Sadəcə deyirsən

> UI bu vəziyyətdə belə görünməlidir.
> 

Məsələn

```jsx
const [isHighlighted, setIsHighlighted] = useState(false);

return (
 <>
   <button
      onClick={() => setIsHighlighted(true)}
   >
      Add Class
   </button>

   <p className={isHighlighted && "highlight"}>
      Paragraph
   </p>
 </>
);
```

Burada sən heç vaxt demirsən

```
document.querySelector(...)
classList.add(...)
```

Sadəcə deyirsən

> əgər isHighlighted true-dursa class əlavə et.
> 

Qalan işi React özü edir.

---

# React nəyə qərar verir?

React özü müəyyən edir

- hansı element dəyişib
- nə yenilənməlidir
- hansı DOM node dəyişməlidir
- hansına toxunmaq lazım deyil

Sən bunlarla məşğul olmursan.

---

# UI State-ə əsasən qurulur

React-da UI bir funksiyadır.

```
UI = f(state)
```

Yəni

State dəyişirsə

↓

UI yenidən hesablanır.

Məsələn

```
loading=true

↓

Spinner göstər
```

```
loading=false

↓

Spinner gizlət
```

```
user=null

↓

Login göstər
```

```
user mövcuddur

↓

Dashboard göstər
```

Sən heç vaxt

```
show()
hide()
remove()
append()
```

kimi əmrlər yazmırsan.

Sadəcə vəziyyəti (**state**) dəyişirsən.

---

# React niyə bunu üstün tutur?

Çünki bu yanaşma

- daha oxunaqlıdır
- daha test edilə bilir
- daha az səhvə səbəb olur
- böyük layihələrdə daha rahat idarə olunur

Komponentə baxan proqramçı yalnız **state**-ə baxaraq UI-nın necə görünəcəyini anlaya bilir.

---

# Bölmənin əsas mesajı

Bu bölmənin vermək istədiyi əsas fikir budur:

- JSX sadəcə HTML yazmaq üçün deyil, **UI strukturunu deklarativ şəkildə təsvir etmək** üçündür.
- React-da UI-nı dəyişdirmək üçün DOM üzərində addım-addım əmrlər yazmağa ehtiyac yoxdur.
- **State** dəyişdikdə React UI-ı yenidən hesablayır və yalnız lazım olan dəyişiklikləri tətbiq edir.
- Bu yanaşma (**Declarative Programming**) mürəkkəb tətbiqlərin daha sadə, oxunaqlı və idarəolunan şəkildə hazırlanmasına imkan verir.

Bu, React fəlsəfəsinin ən vacib prinsiplərindən biridir və kitabın sonrakı bölmələrində dəfələrlə istifadə olunacaq.
Bu bölmənin əsas ideyası belədir:

> **React komponentləri statik deyil. Onlar zaman keçdikcə dəyişən məlumatlara (data) əsasən yenidən render olunur.**
> 

Başqa sözlə, React-da UI sabit bir HTML səhifəsi deyil. O, **data dəyişdikcə dəyişən canlı bir görünüşdür**.

---

# JSX statik görünür, amma əslində dinamikdir

İlk baxışda JSX belə görünür:

```jsx
return (
  <h1>Hello</h1>
);
```

Sanki bu kod həmişə eyni nəticəni verəcək.

Amma React-da JSX demək olar ki, həmişə **data** ilə birlikdə işləyir.

Məsələn:

```jsx
return (
   <h1>{user.name}</h1>
);
```

və ya

```jsx
return (
   {isLoggedIn ? <Dashboard /> : <Login />}
);
```

Burada artıq UI sabit deyil.

Data dəyişən kimi nəticə də dəyişəcək.

---

# React komponentləri data ilə işləyir

Komponentə müxtəlif mənbələrdən məlumat gələ bilər.

Məsələn:

- props
- state
- API cavabı
- Context
- Redux
- TanStack Query

React üçün bunun fərqi yoxdur.

Əsas odur ki, komponent yeni data alsın.

---

# Render nədir?

Render dedikdə React komponentinin işləyərək JSX qaytarması nəzərdə tutulur.

Məsələn

```jsx
function User({ name }) {
   return <h1>{name}</h1>;
}
```

Əgər

```
name = "Javid"
```

olarsa

Render nəticəsi

```html
<h1>Javid</h1>
```

olar.

---

Sonra

```
name = "Ali"
```

olarsa

React komponenti yenidən işləyəcək.

Yeni nəticə

```html
<h1>Ali</h1>
```

olacaq.

---

# Hər render bir "snapshot"-dır

Bu bölmənin ən vacib fikirlərindən biri budur.

React hər render-i

> **bir şəkil (snapshot)**
> 

kimi qəbul edir.

Məsələn

İlk render

```
count = 0
```

↓

React bunu yadda saxlayır.

Sonra

```
count = 1
```

↓

yenidən render edir.

Bu artıq başqa snapshot-dır.

Sonra

```
count = 2
```

↓

yenə yeni snapshot yaranır.

Yəni React tarixçədə ardıcıl olaraq müxtəlif UI vəziyyətlərini görür.

```
Render 1

count=0
```

↓

```
Render 2

count=1
```

↓

```
Render 3

count=2
```

---

# UI zamanla dəyişir

Tətbiqlər statik deyil.

İstifadəçi

- klik edir
- məlumat daxil edir
- API cavabı gəlir
- loading bitir
- notification gəlir

Bütün bunlar **data**-nı dəyişdirir.

Data dəyişdikcə React komponenti yenidən render olunur.

---

Məsələn

İlk vəziyyət

```
loading = true
```

↓

```
Loading...
```

Sonra

```
loading = false
```

↓

```
Products
```

və ya

```
error = true
```

↓

```
Something went wrong
```

Yəni UI həmişə mövcud vəziyyətə (**state**) uyğun qurulur.

---

# React niyə hər dəfə yenidən render edir?

İlk baxışdan belə görünə bilər:

> "Hər dəfə komponent yenidən işləyirsə, bu çox yavaş olmaz?"
> 

Bu tamamilə normal sualdır.

Əgər hər render zamanı bütün HTML yenidən yaradılıb DOM-a yazılsaydı, həqiqətən də performans problemi yaranardı.

Amma React bunu etmir.

O, əvvəlki render ilə yeni render-i müqayisə edir və yalnız dəyişən hissələri yeniləyir.

Bu proses sonrakı bölmədə izah olunan **Virtual DOM**, **diffing** və **patching** mexanizmləri sayəsində mümkün olur.

---

# Nəticə

Bu bölmənin əsas mesajı budur:

- React komponentləri statik deyil; onlar **data** dəyişdikcə yenidən **render** olunur.
- Hər **render** həmin andakı **state** və **props** əsasında yaranan yeni bir **snapshot** kimidir.
- UI həmişə mövcud **data**nın əksidir. **Data** dəyişirsə, UI da dəyişir.
- React bu prosesi elə optimallaşdırır ki, yalnız həqiqətən dəyişən hissələr yenilənsin. Bunun necə işlədiyi növbəti **Performance matters** bölməsində izah olunur.
- Bu bölmə React-ın ən vacib konsepsiyalarından birini izah edir:

> **Əgər React hər dəfə komponenti yenidən render edirsə, niyə tətbiq yavaşlamır?**
> 

İlk baxışdan belə görünür ki, React çox iş görür. Amma əslində React bunu çox optimallaşdırılmış şəkildə həyata keçirir.

---

# Declarative UI performans problemi yaradırmı?

Əvvəlki bölmədə öyrəndik ki, React **Declarative Programming** yanaşmasından istifadə edir.

Sən sadəcə yazırsan:

```jsx
return <UserList users={users} />;
```

və ya

```jsx
return isLoading ? <Spinner /> : <Products />;
```

Sən browser-ə addım-addım nə etməli olduğunu demirsən.

Bu çox rahatdır.

Amma burada bir sual yaranır.

Əgər hər dəfə `state` dəyişəndə React komponenti yenidən işləyirsə,

onda hər dəfə bütün səhifə yenidən yaradılır?

Əgər belə olsaydı, React çox yavaş işləyərdi.

---

# İlk render

İlk dəfə komponent yaradılarkən React aşağıdakı addımları edir.

```
Component

↓

JSX

↓

React Element

↓

DOM

↓

Browser göstərir
```

Bu ilk renderdir.

Burada problem yoxdur.

Çünki DOM boşdur.

React sadəcə elementləri yaradıb səhifəyə əlavə edir.

---

# Əsl problem sonrakı renderlərdir

Məsələn

```
count = 0
```

↓

ekranda görünür.

Sonra

```
count = 1
```

olur.

İndi React nə etməlidir?

Ən sadə yol belə olardı.

```
Sil bütün DOM-u

↓

Yenidən yarat

↓

Yenidən əlavə et
```

Bu işləyərdi.

Amma çox yavaş olardı.

Çünki browser üçün ən bahalı əməliyyatlardan biri DOM-u dəyişməkdir.

---

# DOM niyə bahalıdır?

DOM adi JavaScript obyekti deyil.

DOM browser tərəfindən idarə olunur.

DOM-da dəyişiklik baş verəndə browser

- Layout hesablayır
- Reflow edir
- Repaint edir
- Composite edir

Bunların hamısı CPU istifadə edir.

Məsələn

1000 element olan cədvəldə

yalnız

```
1 element dəyişib.
```

amma sən bütün cədvəli silib yenidən yaratsan,

browser boş yerə çox iş görəcək.

---

# Handlebars kimi Template Engine-lər

Kitab burada maraqlı müqayisə aparır.

Məsələn

Handlebars.

İlk render

```
Template

↓

HTML String

↓

DOM
```

Problem yoxdur.

Amma data dəyişəndə

yenidən

```
Template

↓

HTML String

↓

DOM
```

yaranır.

Yəni hər şey yenidən yaradılır.

Buna görə proqramçılar

belə workaround yazmağa başlayırlar.

```
if (userChanged)

↓

yalnız bu elementi dəyiş

↓

bu classı əlavə et

↓

bu texti dəyiş
```

Beləliklə

declarative template

- 

imperative DOM manipulation

qarışır.

Nəticədə kod mürəkkəbləşir.

---

# React fərqli işləyir

React deyir

Sən DOM-a toxunma.

Sadəcə yeni UI yaz.

Məsələn

Birinci render

```jsx
<h1>Hello</h1>
```

İkinci render

```jsx
<h1>Hello Javid</h1>
```

Sən heç nə etmirsən.

React özü qərar verir

```
Nə dəyişib?
```

---

# Virtual DOM

React bunun üçün

**Virtual DOM**

istifadə edir.

Virtual DOM

real DOM-un

JavaScript yaddaşındakı surətidir.

```
Browser DOM

↓

Memory-də

Virtual DOM
```

Virtual DOM browser deyil.

Sadəcə JavaScript obyektidir.

JavaScript obyektləri ilə işləmək

DOM ilə işləməkdən qat-qat sürətlidir.

---

# Yeni render necə işləyir?

Məsələn

İlk render

```
<h1>Hello</h1>
```

Virtual DOM

```
h1

↓

Hello
```

Sonra

```
Hello Javid
```

olur.

Yeni Virtual DOM yaranır.

```
h1

↓

Hello Javid
```

İndi React

köhnə Virtual DOM

ilə

yeni Virtual DOM-u

müqayisə edir.

---

# Diffing

Bu müqayisə prosesinə

**Diffing**

deyilir.

React baxır

```
Element dəyişib?

↓

Xeyr
```

```
Tag dəyişib?

↓

Xeyr
```

```
Text dəyişib?

↓

Bəli
```

Onda React qərar verir.

```
Yalnız text dəyişməlidir.
```

---

# Patching

Sonra React

yalnız lazım olan DOM əməliyyatını edir.

Bu mərhələyə

**Patching**

deyilir.

Yəni

```
DOM.remove()

DOM.append()

DOM.replace()
```

kimi böyük əməliyyatlar yox,

sadəcə

```
textNode dəyiş.
```

---

# React niyə sürətlidir?

Çünki

1000 elementdən

yalnız biri dəyişibsə,

React

999 elementə

heç toxunmur.

Bu da

DOM əməliyyatlarını minimuma endirir.

---

# React yenə də render edir

Burada vacib bir məqam var.

Bir çoxları düşünür ki

React yalnız dəyişən komponenti render edir.

Əslində

React komponent funksiyasını yenidən işlədir.

Yəni

```jsx
function App() {}
```

yenidən çağırılır.

Amma

DOM tam yenilənmir.

Çünki

Diffing

və

Patching

yalnız dəyişən hissəni tətbiq edir.

Bu iki anlayışı qarışdırmaq olmaz:

- **Re-render** — React komponentinin funksiyasının yenidən icra olunması.
- **DOM Update** — Real DOM-da dəyişiklik edilməsi.

Hər **DOM Update** bir **re-render** nəticəsində baş verir, amma hər **re-render** mütləq DOM dəyişiklikləri ilə nəticələnmir.

---

# React niyə bunu gizlədir?

React istəyir ki, proqramçı

bunları düşünməsin:

- `appendChild`
- `removeChild`
- `replaceChild`
- `querySelector`
- `textContent`

Sən sadəcə UI-ı təsvir edirsən.

React isə

- müqayisə edir (**Diffing**),
- optimallaşdırır,
- yalnız lazım olan dəyişiklikləri edir (**Patching**).

---

# Concurrent Rendering

Kitabın sonunda qeyd olunur ki, React-ın yeni versiyalarında (**React 18** və sonrakılar) daxili **rendering** alqoritmləri daha da təkmilləşdirilib.

Əvvəllər böyük bir render prosesi əsas axını (**main thread**) uzun müddət məşğul saxlaya bilərdi və bu müddətdə istifadəçi klik etsə belə, browser cavab verməkdə gecikə bilərdi.

Yeni **Concurrent Rendering** mexanizmi React-a işləri daha çevik planlamağa imkan verir. React uzun render prosesini hissələrə bölə, daha vacib istifadəçi əməliyyatlarına (məsələn, klik və ya yazı daxil etmə) üstünlük verə və daha axıcı istifadəçi təcrübəsi təmin edə bilir.

---

# Bu bölmənin əsas mesajı

Bu bölmənin vermək istədiyi əsas fikir budur:

- React **Declarative UI** yanaşmasını performansdan imtina etmədən təqdim edir.
- React hər dəfə **re-render** etsə də, **Real DOM**u tamamilə yeniləmir.
- Bunun üçün **Virtual DOM** istifadə olunur.
- React köhnə və yeni **Virtual DOM** ağaclarını müqayisə edir (**Diffing**) və yalnız həqiqətən dəyişən hissələri **Real DOM**a tətbiq edir (**Patching**).
- Nəticədə proqramçı sadə və oxunaqlı kod yazır, React isə arxa planda performansı optimallaşdırır. Bu mexanizm React-ın digər UI kitabxanalarından fərqlənməsinin əsas səbəblərindən biridir.

  # The Right Level of Abstraction — React-ın Ən Böyük Gücü

Bir çox proqramçı React öyrənməyə başlayanda onun komponentləri, JSX və hook-larına fokuslanır. Lakin React-ı uzunömürlü və güclü edən əsas xüsusiyyət bunlar deyil. React-ın əsl gücü onun təqdim etdiyi **abstraction** səviyyəsindədir.

Məhz bu abstraksiya React-ın eyni proqramlaşdırma modelini müxtəlif platformalarda tətbiq etməsinə imkan verir.

## Abstraction nədir?

Abstraction proqramlaşdırmada mürəkkəb detalları gizlədərək proqramçının yalnız vacib hissəyə fokuslanmasını təmin edən yanaşmadır.

Məsələn, avtomobil idarə edərkən mühərrikin daxilində yanacağın necə yandığını bilmirik. Biz sadəcə sükanı çevirir, qaz və əyləc pedalından istifadə edirik. Mürəkkəb mexanizmlər bizdən gizlədilib.

React da eyni prinsiplə işləyir.

Sən browser-in DOM API-lərini, native platformaların render mexanizmlərini və ya PDF generatorlarının daxili işləmə prinsipini bilmədən istifadəçi interfeysi yaradırsan.

---

## React əslində DOM deyil

Yeni başlayanların etdiyi ən böyük səhvlərdən biri React-ı DOM ilə eyniləşdirməkdir.

Əslində React və React DOM fərqli anlayışlardır.

**React** komponentləri, state, props, hooks və reconciliation kimi əsas mexanizmləri təmin edir.

**React DOM** isə bu komponentləri browser-in DOM elementlərinə çevirən xüsusi bir render mühərrikidir.

Başqa sözlə:

- React → UI necə olmalıdır?
- React DOM → Bunu browser-də necə göstərmək lazımdır?

Bu iki anlayışı ayırdıqda React-ın niyə bu qədər çevik olduğunu başa düşmək daha asan olur.

---

## React yalnız browser üçün yazılmayıb

React komponenti yazarkən belə bir kod yazırsan:

```jsx
function Button() {
  return <button>Save</button>;
}
```

Bu komponent browser-də işləyə bilər.

Amma eyni proqramlaşdırma modeli telefon tətbiqində də işləyə bilər.

Çünki React komponenti heç vaxt birbaşa browser ilə danışmır.

O, sadəcə UI təsvir edir.

Bu UI-nın hara render olunacağına isə renderer qərar verir.

---

## React Renderer nədir?

Renderer React komponentlərini konkret platformaya uyğun nəticəyə çevirən mühərrikdir.

Fərqli platformalar üçün fərqli renderer mövcuddur.

### React DOM

Brauzer üçün istifadə olunur.

React komponentlərini HTML elementlərinə çevirir.

```
React Component

↓

React DOM

↓

Browser DOM
```

---

### React Native

Mobil tətbiqlər üçün istifadə olunur.

Burada HTML yoxdur.

```
<View>
<Text>
<Button>
```

kimi Native komponentlər yaradılır.

Sən React yazırsan.

React Native isə onu Android və iOS komponentlərinə çevirir.

---

### React PDF

React komponentlərindən PDF sənədləri yaratmağa imkan verir.

Yəni eyni React yanaşması ilə hesabatlar, fakturalar və digər PDF sənədləri hazırlamaq mümkündür.

---

### React Unity

React komponentlərini Unity oyun mühərrikində istifadə etməyə imkan verən renderer-lər də mövcuddur.

Bu göstərir ki, React konkret bir platformaya bağlı texnologiya deyil.

---

## React nəyə fokuslanır?

React heç vaxt demir:

> "HTML yarat."
> 

React deyir:

> "İstifadəçi interfeysini təsvir et."
> 

Bu iki fikir arasında böyük fərq var.

Çünki UI müxtəlif formalarda mövcud ola bilər:

- Browser
- Mobil tətbiq
- Desktop tətbiqi
- Smart TV
- PDF
- Oyun mühərriki
- Gələcəkdə yaranacaq yeni platformalar

React üçün bunların hamısı sadəcə fərqli render hədəfləridir.

---

## React niyə bu qədər uzunömürlüdür?

Texnologiyalar dəyişir.

Bir vaxtlar jQuery çox populyar idi.

Sonra Angular.

Sonra Vue.

Daha sonra Svelte və digər framework-lər ortaya çıxdı.

Lakin React uzun illərdir aktuallığını qoruyur.

Bunun səbəblərindən biri React-ın konkret platformaya deyil, UI modelinə fokuslanmasıdır.

Əgər sabah tamamilə yeni bir cihaz növü yaradılsa, həmin platforma üçün yeni bir renderer yazmaq kifayət edə bilər.

React komponentləri isə böyük ölçüdə dəyişmədən istifadə oluna bilər.

---

## React proqramçısı nəyi öyrənməlidir?

Əsl React proqramçısı DOM API-lərini əzbərləməyə çalışmır.

O, aşağıdakı anlayışları dərindən başa düşür:

- Component
- State
- Props
- Hooks
- Rendering
- Re-render
- Composition
- Reconciliation

Çünki bunlar React-ın platformadan asılı olmayan əsas konsepsiyalarıdır.

Renderer isə həmin konsepsiyaları konkret platformaya uyğun həyata keçirir.

---

## Real həyatdan bənzətmə

Bunu elektrik prizinə bənzətmək olar.

Telefon adapteri, noutbuk adapteri və ya televizor fərqli cihazlardır.

Amma hamısı eyni prizdən istifadə edir.

React da həmin priz kimidir.

Renderer-lər isə müxtəlif adapterlərdir.

```
React Component

↓

Renderer

↓

Browser
```

və ya

```
React Component

↓

Renderer

↓

Android
```

və ya

```
React Component

↓

Renderer

↓

PDF
```

Sən yalnız komponent yazırsan.

Renderer isə həmin komponenti uyğun platformaya çevirir.

---

## Nəticə

React-ın ən böyük üstünlüyü onun müəyyən platformaya deyil, istifadəçi interfeysinin təsvirinə fokuslanmasıdır.

Komponentlər platformadan asılı deyil.

Platformaya uyğunlaşan hissə renderer-dir.

Bu abstraksiya React-a müxtəlif mühitlərdə işləmək, yeni platformalara uyğunlaşmaq və uzun illər aktuallığını qorumaq imkanı verir.

Məhz buna görə React sadəcə browser kitabxanası deyil. O, müxtəlif platformalarda istifadəçi interfeysləri qurmaq üçün ümumi bir proqramlaşdırma modelidir.
# İlk JSX tətbiqimiz: "Hello World" arxasında nə baş verir?

React öyrənməyə başlayanda hər kəs eyni yerdən keçir: ekrana "Hello World" yazdırmaq. Sadə görünür, amma bu bir sətir kodun arxasında React-in bütün fəlsəfəsi gizlənib — **deklarativ** düşüncə tərzi.

Bu yazıda çox sadə bir JSX nümunəsindən başlayacağıq, sonra "kapotun altına" baxıb görəcəyik ki, browser əslində bu kodu necə başa düşür.

---

## Ən sadə JSX nümunəsi

Budur, ilk JSX tətbiqimiz:

```jsx
import * as ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <p>
    Hello, <strong>JSX</strong>
  </p>
);
```

Burada üç addım var:

1. `document.getElementById("root")` ilə səhifədəki boş bir DOM elementini tapırıq.
2. `ReactDOM.createRoot()` həmin elementi React-in idarə edəcəyi bir "kök"ə (root) çevirir.
3. `root.render()` isə bu kökə nəyi çəkmək istədiyimizi deyir — bizim halda, içində qalın (`<strong>`) yazılmış "JSX" sözü olan bir paraqraf.

Nəticə çox sadədir: səhifədə "Hello, **JSX**" görünür. Əslində bunu adi HTML string kimi də DOM-a yerləşdirmək olardı. Amma məqsəd effekt deyil, JSX-in necə render olunduğunu göstərməkdir.

---

## JSX əslində browser üçün deyil

Burada vacib bir məqamı qeyd etmək lazımdır: **browser JSX-i başa düşmür.**

`<p>Hello, <strong>JSX</strong></p>` kimi görünən bu sintaksis əslində adi JavaScript deyil — HTML-ə bənzəyən, amma JS faylının içində yazılan xüsusi bir yazı formasıdır. Buna görə də kod browserə çatmadan əvvəl adi JavaScript-ə **çevrilməlidir**. Bu işi adətən Vite və ya Babel kimi alətlər görür.

Vite JSX-i emal edərkən onu `React.createElement()` çağırışlarına çevirir. Yuxarıdakı nümunə əslində belə koda "tərcümə" olunur:

```jsx
import * as ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  React.createElement(
    "p",
    null,
    "Hello, ",
    React.createElement("strong", null, "JSX")
  )
);
```

Diqqət edin: siz heç vaxt bu kodu özünüz yazmırsınız — bunu arxa planda Vite (və ya Babel) sizin üçün edir. Amma nə baş verdiyini bilmək vacibdir, çünki JSX-in "sehr" olmadığını, sadəcə funksiya çağırışları üçün rahat bir qısa yol (syntactic sugar) olduğunu göstərir.

`React.createElement()`-in arqumentlərinə baxaq:

- **Birinci arqument** — elementin tipi. Bu, DOM elementləri üçün `"div"`, `"p"` kimi bir string, ya da composite komponentlər üçün bir React komponenti ola bilər.
- **İkinci arqument** — həmin elementin prop-larını saxlayan obyekt (yoxdursa `null`).
- **Sonrakı arqumentlər** — elementin uşaqları (children).

---

## React elementi nədir?

`React.createElement()`-in qaytardığı nəticəyə **React elementi** deyilir. Bu, sadəcə adi bir JavaScript obyektidir — UI-nin bir hissəsinin necə görünməli olduğunu təsvir edən "sənəd" kimi düşünə bilərsiniz.

React bu obyektləri özü birbaşa DOM-a çevirmir, əvvəlcə onları öz daxili təmsilçisi olan **virtual DOM**-a əlavə edir. Sonra **reconciliation** adlanan bir alqoritm işə düşür: state dəyişəndə React köhnə və yeni virtual DOM-u müqayisə edir və yalnız fərqlənən yerləri real DOM-da yeniləyir.

> Başqa sözlə: state dəyişəndə React **bütün komponenti yenidən qurmur** — yalnız dəyişən minimal hissəni tapıb yeniləyir. Bu da React-i sürətli edən əsas səbəblərdən biridir.

---

## Deklarativ olmaq nə deməkdir?

Yuxarıdakı "Hello World" nümunəsinə diqqətlə baxsaq, kodun **nəyi** göstərmək istədiyimizi izah etdiyini görərik — **necə** göstərəcəyini yox. JSX-ə baxaraq deyə bilərik ki, "bu komponent bir paraqraf və onun içində qalın yazı render edəcək". Vəssalam.

İmperativ yanaşmada isə vəziyyət fərqli olardı: əvvəlcə paraqraf elementi yaratmalı, sonra ona mətn əlavə etməli, sonra `<strong>` elementi yaratmalı, onu paraqrafa uşaq kimi əlavə etməli və bütün bunları müəyyən ardıcıllıqla etməli olardıq. Nə qədər çox addım olsa, bir o qədər səhv ehtimalı artır.

> **JSX deklarativdir, çünki o, nəticəni təsvir edir — addımları deyil.**

React-in `render()` funksiyası məhz bunu edir: siz UI-nin necə görünməli olduğunu təsvir edirsiniz, React isə bunu ən effektiv şəkildə real DOM-a çevirməyi öz üzərinə götürür.

---

## HTML teqlərini birbaşa render etmək

JSX-in ən praktik tərəflərindən biri budur ki, adi HTML teqlərini heç bir əlavə tərif və ya import olmadan birbaşa istifadə edə bilirsiniz. Çünki React bu teqlər üçün özündə hazır komponentlər saxlayır — sizin hər dəfə `div` və ya `button` üçün ayrıca komponent yazmağınıza ehtiyac yoxdur.

Bir neçə HTML tegini eyni anda render edən nümunəyə baxaq:

```jsx
import * as ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div>
    <button />
    <code />
    <input />
    <label />
    <p />
    <pre />
    <select />
    <table />
    <ul />
  </div>
);
```

Bu nümunədə çıxışın necə görünəcəyi əhəmiyyətli deyil — məqsəd sadəcə odur ki, istənilən HTML teqini xüsusi tərif yazmadan JSX-də sərbəst render edə bilirik.

Diqqət etdinizsə, bütün teqlər bir `<div>`-in içinə yığılıb. Bunun səbəbi sadədir: **React-in render etmək üçün tək bir kök elementə ehtiyacı var.** Kitabın sonrakı hissələrində bu qonşu elementləri əlavə bir valideyn teq olmadan necə render etmək olduğunu da öyrənəcəyik.

JSX-də render olunan HTML elementləri əsasən adi HTML sintaksisinə oxşayır, sadəcə "case-sensitivity" (böyük-kiçik hərf fərqi) və atributlarla bağlı bəzi kiçik fərqlər var — bunları irəlidə ətraflı araşdıracağıq.

---

## Nəticə

İlk baxışdan JSX sadə bir HTML-yə bənzəyən sintaksis kimi görünür. Amma arxasında güclü bir fikir dayanır: **kod nəyi göstərmək istədiyinizi təsvir edir, necə göstərəcəyini yox.**

Vite və ya Babel kimi alətlər bu JSX-i `React.createElement()` çağırışlarına çevirir, bu çağırışlar isə React elementləri yaradır — React bu elementlər üzərində reconciliation aparıb real DOM-u effektiv şəkildə yeniləyir.

Qısaca desək: **imperativ dünyada siz "necə" sualına cavab verirsiniz, JSX dünyasında isə sadəcə "nə" sualına cavab verirsiniz — qalanını React öz üzərinə götürür.**

# JSX-də HTML teqləri necə yazılır və öz komponentini necə yaradırsan?

JSX ilk baxışdan HTML-ə çox bənzəyir, amma bir neçə qayda var ki, unudulanda kod sadəcə işləmir — compile mərhələsində partlayır. Bu yazıda həmin qaydaları, JSX-lə mürəkkəb UI strukturlarının necə təsvir olunduğunu və öz JSX elementini (komponentini) necə yaratmağı görəcəyik.

---

## Qayda #1: kiçik hərflə başlayan teq = HTML, böyük hərflə başlayan = sənin komponentin

JSX-də teq adının böyük-kiçik hərflə yazılması təsadüfi deyil, React üçün bir işarədir:

- **kiçik hərflə başlayan** teq (`<button>`, `<div>`, `<p>`) → React bunu **built-in HTML elementi** kimi qəbul edir.
- **böyük hərflə başlayan** teq (`<Button>`, `<MyComponent>`) → React bunu **sənin yazdığın komponent** kimi axtarır.

Bu qayda sayəsində koda baxanda gözünüz built-in HTML elementlərini sizin yazdığınız komponentlərdən dərhal ayıra bilir — əlavə heç nə oxumadan.

HTML elementlərinə adi atributlarını (`title`, `id`, `className` və s.) ötürə bilərsiniz. Amma React tanımadığı bir atribut görəndə susmur — konsola xəbərdarlıq (`warning`) yazır:

```jsx
import * as ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <button title="My Button" foo="bar">
    My Button
  </button>
);

root.render(<Button />);
```

Bu kodda iki fərqli problem var:

1. `<button>` elementinə `foo="bar"` deyə bilinməyən bir atribut ötürülüb — React bunu tanımır və konsola xəbərdarlıq yazacaq, amma kod işə düşəcək.
2. `<Button />` isə tam fərqli hekayədir: **kod heç compile olmayacaq**, çünki heç bir yerdə `Button` adlı komponent tərif olunmayıb. React `<Button>`-u komponent kimi axtarır, tapmır və xəta verir.

> **Nəticə:** istənilən HTML teqini JSX-də sərbəst istifadə edə bilərsiniz, sadəcə iki şeyi yadda saxlamaq lazımdır — teqlər böyük-kiçik hərfə həssasdır, və atribut adları düzgün olmalıdır.

---

## Sadə teqlərdən UI strukturuna keçid

JSX-in əsl gücü tək bir elementi göstərməkdə deyil, bütün səhifə strukturunu bir yerdə, oxunaqlı şəkildə təsvir etməkdə özünü göstərir. Bax bu nümunəyə:

```jsx
import * as ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <section>
    <header>
      <h1>A Header</h1>
    </header>
    <nav>
      <a href="item">Nav Item</a>
    </nav>
    <main>
      <p>The main content...</p>
    </main>
    <footer>
      <small>&copy; 2024</small>
    </footer>
  </section>
);
```

Burada `<header>`, `<nav>`, `<main>`, `<footer>` kimi **semantik HTML teqləri** istifadə olunub — bunlar sadəcə görünüş üçün deyil, səhifənin hansı hissəsinin nə olduğunu (başlıq, naviqasiya, əsas məzmun, alt hissə) bildirir. Bu həm brauzer və axtarış sistemləri, həm də ekran oxuyucuları (screen reader) üçün faydalıdır.

Diqqət edin ki, bu kod imperativ yazılsaydı (əvvəlcə elementi yarat, sonra uşaq əlavə et, sonra digər elementi yarat...), strukturu bir baxışda görmək çətin olardı. JSX isə HTML-ə bənzədiyi üçün iyerarxiyanı — kimin kimin içində olduğunu — dərhal göstərir.

> **UI-ə tək-tək element kimi deyil, bütöv bir struktur kimi baxmaq lazımdır — məhz JSX bunu asanlaşdırır.**

---

## Öz JSX elementini yaratmaq: komponentlər

İndiyə qədər yalnız built-in HTML teqlərindən istifadə etdik. Amma React-in əsl gücü **komponentlərdədir** — böyük, təkrarlanan strukturları öz teqinizin arxasında "gizlətmək" imkanıdır.

Komponent sadəcə JSX qaytaran bir funksiyadır. Onu yaratdıqdan sonra, adi HTML teqi kimi çağıra bilərsiniz:

```jsx
import * as ReactDOM from "react-dom";

function MyComponent() {
  return (
    <section>
      <h1>My Component</h1>
      <p>Content in my component...</p>
    </section>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MyComponent />);
```

Burada baş verənləri addım-addım deşifrə edək:

1. `MyComponent` adlı bir funksiya yazırıq. Funksiyanın adı böyük hərflə başlayır — bu, React-ə "bu bir komponentdir, HTML teqi deyil" siqnalını verir.
2. Funksiya `return` ilə bir JSX bloku qaytarır — bu, komponentin "əvəzinə" nəyin render olunacağını göstərir.
3. `root.render(<MyComponent />)` çağırılanda, React `<MyComponent>` yerinə funksiyanın qaytardığı `<section>` və onun içindəkiləri render edir.

Nəticədə ekranda sadəcə `<section><h1>My Component</h1><p>...</p></section>` görünür — `<MyComponent>` teqinin özü heç vaxt real DOM-a düşmür, o sadəcə "bu strukturu bura qoy" demək üçün bir qısayoldur.

> **Vacib qayda:** JSX-də istifadə etdiyiniz hər bir öz komponentiniz, işlədiyi eyni scope-da (əhatə dairəsində) mövcud olmalıdır. Yuxarıdakı nümunədə `MyComponent` funksiyası elə `render()` çağırışı ilə eyni yerdə tərif olunduğu üçün hər şey işlədi. Real layihələrdə isə adətən komponentləri ayrı fayllarda yazıb `import` edəcəksiniz — beləliklə onlar lazım olan scope-a düşür.

---

## Nəticə

JSX-in HTML-ə bənzəməsi aldadıcı ola bilər — arxasında ciddi qaydalar var: teq adının hərf ölçüsü onun HTML yoxsa komponent olduğunu müəyyən edir, tanınmayan atributlar xəbərdarlıq doğurur, tanınmayan komponentlər isə kodu tamamilə saxlayır.

Amma məhz bu qaydalar sayəsində JSX güclü olur: semantik teqlərlə mürəkkəb səhifə strukturunu bir baxışda oxunaqlı yazmaq, sonra da təkrarlanan hissələri öz komponentinizin arxasında gizlədib, onları sadə bir teq kimi yenidən istifadə etmək mümkün olur.

**Qısaca:** HTML teqləri kiçik hərflə — brauzerin başa düşdüyü dil. Sənin komponentlərin böyük hərflə — sənin öz vokabulyarın. İkisi birlikdə JSX-i həm tanış, həm də genişlənə bilən edir.
# JSX-də komponentlər bir-birinin içinə necə yerləşir? `props.children` sirri

HTML-də `<li>` teqi tək başına mənasızdır — o ancaq `<ul>` və ya `<ol>`-un içində, valideyn-övlad (parent-child) münasibətində mövcud olur. React komponentləri yazanda da eyni məntiqlə qarşılaşırsınız: bir komponenti başqa bir komponentin içinə necə "soxmaq" olar? Cavab `props.children` adlı xüsusi bir mexanizmdədir.

---

## Komponentləri iç-içə yerləşdirmək

JSX-in gücü elementlər arasında valideyn-övlad münasibəti qura bilməsindədir. Övlad element sadəcə başqa bir komponentin daxilinə yazılmaqla yaranır:

```jsx
import * as ReactDOM from "react-dom";
import MySection from "./MySection";
import MyButton from "./MyButton";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <MySection>
    <MyButton>My Button Text</MyButton>
  </MySection>
);
```

Burada iki öz komponentiniz import olunub: `MySection` və `MyButton`. Kodda `<MyButton>`, `<MySection>`-un övladı kimi yazılıb. Maraqlısı budur ki, `MyButton` özü də bir mətni ("My Button Text") övlad kimi qəbul edir — başqa JSX elementi yox, sadəcə mətn.

Bu münasibəti reallaşdıran mexanizmi görək.

## `props.children` necə işləyir

`MySection` komponentinə baxaq:

```jsx
export default function MySection(props) {
  return (
    <section>
      <h2>My Section</h2>
      {props.children}
    </section>
  );
}
```

Komponent adi bir `<section>` HTML elementi, bir başlıq (`<h2>`) və sonra `{props.children}` qaytarır. Məhz bu son sətir komponentə "içinə nə yazılıbsa, onu bura render et" imkanı verir.

> **`props.children` — komponentin daxilinə yazdığınız hər şeyi (JSX, mətn, başqa komponentlər) təmsil edən xüsusi bir prop-dur.** Onu adi HTML-də `<div>...</div>` teqinin arasına nə yazsanız görünməsinə bənzədə bilərsiniz — fərq odur ki, burada bu "araya yazılan hissə" `props.children` adlı dəyişən vasitəsilə komponentin öz nəzarətinə keçir.

İndi `MyButton` komponentinə baxaq — eyni naxış təkrarlanır:

```jsx
export default function MyButton(props) {
  return <button>{props.children}</button>;
}
```

`MyButton` da eyni qaydadan istifadə edir: `{props.children}` dəyərini götürüb `<button>` teqinin arasına qoyur. Bizim nümunədə bu, "My Button Text" mətnidir.

## Zəncirvari ötürülmə: `MySection` heç nə bilmədən köməkçi olur

Bu nümunədə buton mətni `MyButton`-un övladıdır, `MyButton` isə öz növbəsində `MySection`-un övladıdır. Amma diqqətli olun: buton mətni `MySection`-un **içindən keçərək** şəffaf şəkildə ötürülür.

Başqa sözlə — `MySection` komponentinin daxilində `MyButton`-a mətn çatdırmaq üçün heç bir əlavə kod yazmadıq. `MySection` sadəcə "mənim içimə nə qoyulubsa, onu göstər" dedi (`{props.children}` vasitəsilə), React isə qalanını öz üzərinə götürdü.

Render olunan nəticə belə görünür: bir bölmə (`<section>`) başlığı ilə, altında isə "My Button Text" yazılı bir düymə.

> **Vacib fikir:** `props.children` sayəsində komponentlər öz daxilində nə olduğunu bilmədən belə, onu düzgün yerə yerləşdirə bilir. Bu, React-də "wrapper" (bükücü) komponentlər yaratmağın əsasını təşkil edir — məsələn, kart, modal, layout kimi strukturlar məhz bu üsulla qurulur.

Bu qədər: statik komponentlər öyrəndik — bir dəfə render olunub, sonra heç vaxt dəyişməyən strukturlar. Amma React-i güclü edən əsl şey budur ki, JSX daxilinə **canlı JavaScript ifadələri** də yazıla bilir. İndi bunu görək.

---

## JavaScript ifadələri: JSX-in dinamik ürəyi

JSX-in xüsusi bir sintaksisi var ki, onun sayəsində adi JavaScript ifadələrini markup-un içinə "əkmək" mümkündür. React JSX-i hər render etdiyi zaman, `{}` mötərizələri arasındakı bu ifadələr yenidən hesablanır.

> **Elə bu xüsusiyyət JSX-in dinamikliyinin əsasını təşkil edir:** komponentin göstərdiyi məzmun və atributlar, tətbiqin datası və ya state-i dəyişdikcə avtomatik yenilənir. React hər render/re-render zamanı bu ifadələri yenidən qiymətləndirir ki, ekranda görünən UI həmişə cari data ilə üst-üstə düşsün.

## Dinamik atribut və mətn dəyərləri

Bəzi HTML atributları və ya mətn dəyərləri statikdir — JSX yenidən render olunanda dəyişmir. Digərləri isə tətbiqin başqa yerində saxlanan dataya əsaslanır. Unutmayın: React sadəcə "görünüş qatı"dır (view layer) — datanın özü haradasa kənarda yaşayır.

Nümunəyə baxaq:

```jsx
import * as ReactDOM from "react-dom";

const enabled = false;
const text = "A Button";
const placeholder = "input value...";
const size = 50;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <section>
    <button disabled={!enabled}>{text}</button>
    <input placeholder={placeholder} size={size} />
  </section>
);
```

Bu kodda `{}` mötərizələri arasına düzərli JavaScript ifadəsi qoymaq mümkündür — dəyişən adı, obyekt propertisi, hətta iç-içə JSX də ola bilər. Diqqət edin: `disabled={!enabled}` ifadəsi `!enabled`-i hesablayır, yəni bir boolean (məntiqi) dəyər yaradır — `enabled` `false` olduğu üçün `!enabled` `true` olur və buton "disabled" (deaktiv) görünür.

`{text}`, `{placeholder}`, `{size}` isə sadəcə əvvəldən təyin olunmuş dəyişənlərin dəyərini JSX-in içinə köçürür.

> **Qısa qayda:** `{}` mötərizələrinin arasına — istər atributda, istərsə mətndə — hər hansı düzgün JavaScript ifadəsi yaza bilərsiniz. Bu, sadə bir dəyişən adından tutmuş mürəkkəb funksiya çağırışına qədər hər şey ola bilər.

İlkin (primitiv) JavaScript dəyərlərini (string, number, boolean) JSX-də istifadə etmək asandır. Amma iş bununla bitmir — obyektlər, massivlər, hətta hadisələri (event) idarə edən funksiyalar da eyni `{}` sintaksisi ilə JSX-ə daxil edilə bilər. Bu, növbəti mövzudur.

---

## Nəticə

JSX-in gücü iki sadə fikirdə gizlənib: birincisi, `props.children` vasitəsilə komponentləri bir-birinin içinə yerləşdirmək və valideyn komponentin övladın məzmununu bilmədən belə onu düzgün yerə "köçürməsi"; ikincisi, `{}` mötərizələri ilə JSX-in içinə canlı JavaScript ifadələri əkmək imkanı.

**Qısaca:** statik JSX bir dəfə çəkilib qalan şəkil kimidir — dəyişən JSX isə datanı izləyən canlı ekrandır. `props.children` strukturu, `{}` ifadələri isə həyatı gətirir.

# React Komponentləri: Props Necə İşləyir?

React tətbiqi əslində kiçik, təkrar istifadə oluna bilən tikinti bloklarından ibarətdir — bu bloklara **komponent** deyilir. Amma komponent təkbaşına heç nə etmir; onu canlı edən şey ona ötürülən **məlumatdır**. Bu yazıda həmin məlumatın əsas formasından — **props**-dan (properties) danışacağıq: nədir, necə ötürülür, default dəyər necə təyin olunur və real nümunədə necə işləyir.

## Komponent nədir?

React komponenti sadəcə JSX qaytaran bir JavaScript funksiyasıdır (bəzən class da ola bilər, amma bu gün demək olar hər yerdə **function component** istifadə olunur — daha qısa, daha sadə, daha rahat oxunur).

```jsx
const MyComponent = () => {
  return <h1>Salam</h1>;
};
```

Komponentin gücü təkrar istifadə oluna bilməsindədir: eyni komponenti tətbiqin fərqli yerlərində, fərqli məlumatla dəfələrlə çağıra bilərsən. Bu, kodun təkrarlanmasını azaldır və UI-ni kiçik, idarə oluna bilən parçalara bölməyə imkan verir.

> Komponenti "qəlib" kimi düşün. Qəlib özü sabitdir, amma ona tökdüyün material (props) hər dəfə fərqli nəticə yarada bilər.

## Props nədir?

**Props** (properties-in qısaldılmışı) valideyn komponentdən uşaq komponentə ötürülən məlumatdır. Props-un məqsədi komponenti konfiqurasiya edilə bilən və çevik etməkdir — eyni komponentə fərqli props versən, fərqli nəticə alarsan.

Vacib qayda: **props read-only-dur**, yəni uşaq komponent onu birbaşa dəyişə bilməz. Əgər dəyər dəyişməlidirsə, bunu valideyn edir və yeni props ilə uşaq komponenti yenidən render edir.

Function komponentdə props sadəcə funksiyanın parametridir:

```jsx
const MyComponent = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
};
```

Burada `props` bir obyektdir, ona `props.title`, `props.description` kimi nöqtə notasiyası ilə çatırıq.

Daha təmiz yol — **destructuring** ilə birbaşa parametrdə açmaq:

```jsx
const MyComponent = ({ title, description }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};
```

Bu yanaşma daha oxunaqlıdır və həm də (aşağıda görəcəyimiz) default dəyər verməyə imkan yaradır.

## Props-u necə ötürürük?

Props JSX-də adi HTML atributu kimi ötürülür. Fərqli tip props qəbul edən iki komponentə baxaq:

```jsx
const MyButton = ({ disabled, text }) => {
  return <button disabled={disabled}>{text}</button>;
};
```

Bu komponent `disabled` (boolean) və `text` (string) qəbul edir. Diqqət et: JavaScript ifadəsi ötürəndə (misal, dəyişən və ya boolean) mütləq `{}` içinə al.

Array qəbul edən komponent nümunəsi:

```jsx
const MyList = ({ items }) => (
  <ul>
    {items.map((i) => (
      <li key={i}>{i}</li>
    ))}
  </ul>
);
```

`MyList` `items` adlı array qəbul edir və `.map()` ilə hər elementi `<li>`-yə çevirir. `key` atributu React-a hansı elementin hansı olduğunu ayırd etməyə kömək edir (siyahı elementləri üçün mütləqdir).

İndi bu komponentləri real tətbiqdə istifadə edək:

```jsx
import * as ReactDOM from "react-dom";
import MyButton from "./MyButton";
import MyList from "./MyList";
import MyComponent from "./MyComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));

const appState = {
  text: "My Button",
  disabled: true,
  items: ["First", "Second", "Third"],
};

function render(props) {
  root.render(
    <main>
      <MyComponent
        title="Welcome to My App"
        description="This is a sample component."
      />
      <MyButton text={props.text} disabled={props.disabled} />
      <MyButton text="Another Button" disabled />
      <MyList items={props.items} />
    </main>
  );
}

render(appState);

setTimeout(() => {
  appState.disabled = false;
  appState.items.push("Fourth");
  render(appState);
}, 1000);
```

Burda `render()` funksiyası hər çağırışda yeni komponent yaradırmış kimi görünür, amma React bunu belə görmür — o, mövcud komponentləri tanıyır və yalnız köhnə ilə yeni props arasındakı **fərqi** hesablayıb DOM-u ona uyğun yeniləyir (bu mexanizmə "reconciliation" deyilir).

`setTimeout` 1 saniyə sonra `appState.disabled`-i `false` edir və `items` array-ə "Fourth" əlavə edir, sonra yenidən `render()` çağırılır — yəni komponentlər yeni props ilə yenidən çəkilir.

Burdan çıxan vacib nəticə: `appState` obyekti tətbiqin vəziyyətini (state) saxlayır, amma **komponentin özündə deyil, kənarında** yaşayır. Bu parçalar render zamanı props kimi komponentlərə ötürülür. (State-in komponentin daxilində necə saxlanıla biləcəyini isə bu yazının davamında — Hooks bölməsində — göstərəcəyik.)

Nümunədə diqqət çəkən başqa məqam:

```jsx
<MyButton text="Another Button" disabled />
```

Sabit (constant) dəyər ötürəndə string-i `{}` içinə almağa ehtiyac yoxdur, sadəcə dırnaq içində yazmaq kifayətdir. Boolean `true` ötürmək üçünsə atributun adını yazıb dəyəri heç yazmamaq kifayətdir (`disabled` = `disabled={true}`).

## Default props

Əgər valideyn komponent bir props ötürməzsə, komponent yenə də düzgün işləməlidir. Bunun üçün **default dəyərlər** təyin edirik.

Köhnə üsul — `defaultProps`:

```jsx
const MyButton = ({ disabled, text }) => (
  <button disabled={disabled}>{text}</button>
);

MyButton.defaultProps = {
  disabled: false,
  text: "My Button",
};
```

Əgər valideyn `text` və ya `disabled` ötürməsə, komponent yuxarıdakı default dəyərlərə düşəcək.

Daha müasir və rahat yol — destructuring zamanı default dəyər vermək:

```jsx
const MyButton = ({ disabled = false, text = "My Button" }) => (
  <button disabled={disabled}>{text}</button>
);
```

Bu üsul daha təmizdir — props-u və onun default dəyərini eyni yerdə, funksiyanın imzasında görürsən. Xüsusilə çox props qəbul edən böyük komponentlərdə oxunaqlılığı xeyli artırır.

## Nəticə

Props React-in ən əsas ünsiyyət mexanizmidir: valideyn komponentdən uşağa məlumat axını təmin edir, komponentləri konfiqurasiya edilə bilən və təkrar istifadəyə yararlı edir. Yadda saxla:

- Props **read-only**-dur — uşaq komponent onu dəyişmir, valideyn yenisini ötürür.
- Destructuring props-u həm oxunaqlı edir, həm də default dəyər verməyə imkan yaradır.
- State tətbiqin "yaddaşıdır" — komponentə props kimi ötürülür, amma harda saxlanacağı ayrı məsələdir.

Props sənə **məlumatı ötürməyi** öyrədir, amma komponentin öz daxilində məlumatı necə saxlayıb dəyişəcəyi ayrı sualdır — məhz bunu React Hooks həll edir. Növbəti bölmədə komponent state-inə və Hooks-un gücünə keçəcəyik.

# Komponent Öz Yaddaşını Necə Saxlayır? State və Hooks

Əvvəlki yazıda gördük ki, **props** valideyn komponentdən uşaq komponentə məlumat ötürmək üçündür, amma uşaq komponent onu dəyişə bilmir. Bəs komponent öz daxilində, kənar müdaxilə olmadan, dəyişə biləcəyi məlumatı necə saxlasın? Məsələn, istifadəçinin input-a yazdığı mətni, yoxlanılan checkbox-u, ya da API-dan gələn cavabı? Məhz bunun üçün **state** var.

## Component state nədir?

**State** — komponentin öz daxilində saxladığı, zaman keçdikcə dəyişə bilən məlumatdır. İstifadəçi input-a yazanda, API-dan cavab gələndə, ya da hər hansı digər dinamik məlumat yaranandaki React bu məlumatı state kimi izləyir.

> Props-u komponentə "xaricdən verilən material" kimi düşünsək, state komponentin "öz yaddaşıdır" — onu heç kim ötürmür, komponent özü yaradır və özü idarə edir.

State-in ən vacib xüsusiyyəti budur: **state dəyişəndə React komponenti avtomatik yenidən render edir**, beləliklə UI həmişə ən son məlumatı göstərir. Bunu əl ilə DOM-u yeniləməyə ehtiyac qalmadan React öz üzərinə götürür.

State-i function komponentdə istifadə etmək üçün `useState` **hook**-undan istifadə olunur. Amma əvvəlcə "hook" nə olduğunu aydınlaşdıraq.

## React Hooks nədir?

**Hooks** — React 16.8 versiyasında əlavə olunan xüsusiyyətdir və function komponentlərə state və digər React imkanlarını istifadə etməyə icazə verir. Hooks-dan əvvəl state idarəetməsi və lifecycle metodları yalnız class komponentlərdə mümkün idi. Hooks isə eyni funksionallığı function komponentlərdə daha sadə, daha oxunaqlı formada təqdim edir.

Hooks sadəcə funksiyalardır və adları `use` prefiksi ilə başlayır (`useState`, `useEffect`, `useContext` və s.). Onlar sənə React-in daxili mexanizmlərinə "qoşulmaq" imkanı verir. React özü bir neçə built-in hook təklif edir, həmçinin öz **custom hook**-larını da yarada bilərsən ki, təkrarlanan stateful məntiqi ayrıca funksiyaya çıxarasan.

Ən çox istifadə olunan built-in hook-lar bunlardır:

- **useState** — komponentə state əlavə edir. İki elementli array qaytarır: hazırkı state dəyəri və onu yeniləmək üçün funksiya.
- **useEffect** — komponentdə "side effect" icra etmək üçündür (data fetch, event-lərə subscribe olmaq, DOM-a əl ilə müdaxilə). Default olaraq hər render-dən sonra işləyir, komponentin mount/update/unmount anlarını idarə etmək üçün istifadə olunur.
- **useContext** — React context-dən dəyər oxumağa imkan verir, beləliklə komponentlər arasında props ötürmədən (prop-drilling olmadan) məlumat paylaşıla bilir.
- **useCallback** və **useMemo** — performans optimallaşdırması üçün. `useCallback` funksiyanı memoize edir (hər render-də yenidən yaradılmasının qarşısını alır), `useMemo` isə bir dəyəri memoize edir (yalnız asılılıqlar dəyişəndə yenidən hesablanır).

Gəl bu hook-ları bir-bir, real nümunələr üzərində araşdıraq.

## useState ilə state saxlamaq

### İlkin state dəyəri

Komponent ilk dəfə render olunanda state-in bir başlanğıc dəyəri olmalıdır. Buna **initial state** deyilir və `useState` hook-una arqument kimi ötürülür:

```jsx
export default function App() {
  const [name] = React.useState("Mike");
  const [age] = React.useState(32);

  return (
    <>
      <p>Mənim adım {name}</p>
      <p>Yaşım {age}</p>
    </>
  );
}
```

Burda iki state parçası var — `name` və `age` — buna görə də iki dəfə `useState` çağırılıb. **Qayda budur: hər state dəyəri üçün ayrıca `useState` çağır.** Nəzərən bir obyekt yaradıb bütün state-i bir `useState` içinə yığmaq da mümkündür, amma bu, dəyərlərə çatmağı və onları yeniləməyi çətinləşdirir. Şübhən varsa — hər dəyər üçün öz `useState`-in olsun.

`useState` çağıranda array qaytarılır. Array-in birinci elementi state-in özüdür. Array-destructuring istifadə etdiyimiz üçün dəyərə istədiyimiz adı verə bilirik — burda `name` və `age`. Hər ikisi ilk render-də dəyərə malikdir, çünki `useState`-ə başlanğıc dəyər ötürmüşük.

### State dəyərini yeniləmək

State komponentlərdə zaman keçdikcə dəyişən dəyərlər üçündür — məsələn, API yeni data qaytaranda, ya da istifadəçi input-u dəyişəndə. State-i yeniləmək üçün `useState` hər dəyər üçün ayrıca bir funksiya qaytarır — array-in ikinci elementi məhz budur:

```jsx
function App() {
  const [name, setName] = React.useState("Mike");
  const [age, setAge] = React.useState(32);

  return (
    <>
      <section>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <p>Mənim adım {name}</p>
      </section>
      <section>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <p>Yaşım {age}</p>
      </section>
    </>
  );
}
```

`input`-un `onChange` event-i tetiklənəndə `setName(e.target.value)` çağırılır — bu, `name` state-inin yeni dəyərini React-a bildirir. React bunu görüb komponenti (və altındaki bütün ağacı) yenidən render edir, beləliklə `<p>` içindəki mətn də dərhal yenilənir. `age` input-u da eyni prinsiplə işləyir, sadəcə `type="number"` istifadə olunub.

> Diqqət et: state dəyişəndə komponentin özü "yenidən çağırılmır" — React sadəcə köhnə və yeni render arasındaki fərqi tapıb DOM-un yalnız lazımi hissəsini yeniləyir.

Bu, **controlled input** adlanan nümunədir — input-un dəyəri həmişə state-dən gəlir, istifadəçi yazanda dəyər əvvəlcə state-ə, sonra yenidən input-a qayıdır.

## useEffect ilə initialization və cleanup

Çox vaxt komponent yaradılanda müəyyən əməliyyat icra etməli olur — məsələn, lazım olan API data-nı çəkmək. Həmçinin komponent silinəndə (unmount olanda) davam edən API sorğularını ləğv etmək lazım gəlir. Bunun üçün `useEffect` hook-u var.

### Komponent üçün data çəkmək

`useEffect` komponentdə "side effect" icra etmək üçündür. Function komponentin əsl işi JSX qaytarmaqdır; əgər komponent başqa bir şey etməlidirsə (məsələn API sorğusu), bu, `useEffect` daxilində edilməlidir. Əgər API sorğusunu birbaşa komponent funksiyasının içində etsən, race condition kimi çətin aşkarlanan bug-lar yarana bilər.

```jsx
function App() {
  const [id, setId] = React.useState("yüklənir...");
  const [name, setName] = React.useState("yüklənir...");

  const fetchUser = React.useCallback(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: 1, name: "Mike" });
      }, 1000);
    });
  }, []);

  React.useEffect(() => {
    fetchUser().then((user) => {
      setId(user.id);
      setName(user.name);
    });
  });

  return (
    <>
      <p>ID: {id}</p>
      <p>Ad: {name}</p>
    </>
  );
}
```

`useEffect`-ə arqument kimi funksiya ötürülür. Bu funksiya komponent render-i bitəndən sonra, React-in daxili işinə mane olmadan çağırılır.

`fetchUser` funksiyası `useCallback` ilə təyin olunub — bu hook funksiyanı memoize edir, yəni asılılıqlar dəyişməyincə funksiya yenidən yaradılmır. `useCallback` iki arqument götürür: memoize olunacaq funksiya, və asılılıq siyahısı. Burda boş array (`[]`) ötürülüb, deməli funksiya yalnız ilk render-də yaradılır, sonrakı render-lərdə təzədən yaradılmır.

`fetchUser` bir promise qaytarır, `setTimeout` isə real API sorğusu kimi 1 saniyəlik gecikmə yaradır. `useEffect` daxilində bu promise-i `.then()` ilə tutub `setId` və `setName` çağırılır — yəni data gələndə komponentin state-i yenilənir və nəticədə komponent yenidən render olunur, "yüklənir..." mətni yerini əsl data-ya verir.

### Əməliyyatları ləğv etmək və state-i sıfırlamaq

İstifadəçi tətbiqdə naviqasiya edərkən API sorğusu hələ tamamlanmamış ola bilər, komponent isə artıq ekrandan silinmiş olar. Ya da komponent müəyyən event-lərə "qulaq asır" və unmount olanda həmin listener-ləri silmək lazımdır — əks halda **memory leak** yaranır.

`useEffect`-in bunun üçün **cleanup** mexanizmi var — effect funksiyasından bir funksiya `return` etsən, React onu komponent silinəndə çağırır:

```jsx
import * as React from "react";

function Timer() {
  const [timer, setTimer] = React.useState(100);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer === 0 ? 0 : prevTimer - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <p>Timer: {timer}</p>;
}

export default Timer;
```

Bu sadə `Timer` komponentidir: `timer` adlı state saxlayır, `useEffect` daxilində `setInterval` ilə hər saniyə `timer`-i bir vahid azaldır, nəticəni isə render edir.

Diqqət et: `setTimer`-ə bu dəfə rəqəm yox, **callback funksiya** ötürülüb. Bu, React-in etibarlı bir üsuludur — yeni state-i hesablamaq üçün əvvəlki state dəyərinə ehtiyac olanda, callback-in birinci arqumenti "əvvəlki" state dəyəri olur, sən də yeni dəyəri bu callback-dən `return` edirsən.

`useEffect`-in daxilində bir funksiya da `return` olunur — React bunu komponent silinəndə çağırır. Burda `setInterval`-in yaratdığı interval, `clearInterval` çağıraraq təmizlənir.

```jsx
const ShowHideTimer = ({ show }) => (show ? <Timer /> : null);

function App() {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? "Timer-i gizlət" : "Timer-i göstər"}
      </button>
      <ShowHideTimer show={show} />
    </>
  );
}
```

`App` komponenti `show` state-ini toggle edən düymə göstərir. `show` `true` olanda `<Timer />` render olunur, `false` olanda `Timer` silinir — məhz bu an `useEffect`-in cleanup funksiyası işə düşür. Əgər cleanup əlavə etməsəydik, Timer hər dəfə yaradılanda yeni interval açılar, köhnələr isə heç vaxt təmizlənməzdi — nəticədə memory leak yaranardı.

### Effect-in nə vaxt işə düşəcəyini optimallaşdırmaq

Default olaraq React hər effect-in cleanup tələb etdiyini fərz edir və onu **hər render-dən sonra** işə salır. Amma çox vaxt bu lazım deyil — məsələn, `fetchUser` nümunəsində istəyirik ki, data yalnız komponent ilk dəfə yaradılanda çəkilsin, hər render-də yox.

`useEffect`-ə ikinci arqument kimi **asılılıq array-i (dependency array)** ötürməklə bunu idarə edirik:

```jsx
React.useEffect(() => {
  fetchUser().then((user) => {
    setId(user.id);
    setName(user.name);
  });
}, []);
```

Boş array (`[]`) React-a deyir: "izləniləcək heç bir dəyər yoxdur, effect-i yalnız bir dəfə — ilk render-dən sonra — işə sal, cleanup isə yalnız komponent silinəndə çağır". Əgər `[]` yerinə izlənəcək dəyərlər qoysan (məsələn `[resolved]`), effect yalnız o dəyər dəyişəndə yenidən işə düşəcək:

```jsx
const [resolved, setResolved] = useState(false);

useEffect(() => {
  // ...effect kodu...
  return () => {
    // ...cleanup kodu...
  };
}, [resolved]);
```

Əgər `useEffect`-in ikinci arqumentini tam buraxsan, effect **hər** render-dən sonra işləyəcək — bu, adətən istəmədiyin nəticələrə (məsələn, təkrar-təkrar API sorğusu) gətirib çıxarır.

## useContext ilə data paylaşmaq

React tətbiqlərində bəzi məlumatlar "qlobal" xarakter daşıyır — tətbiqin demək olar bütün komponentləri bu məlumatı paylaşır. Məsələn, hazırda login olmuş istifadəçinin məlumatı bir neçə fərqli yerdə lazım ola bilər. Məhz bu ssenari üçün **Context API** var.

Context yaratmaq üçün React-dən `createContext` funksiyasını import edirik:

```jsx
import { createContext } from "react";

const MyContext = createContext();
```

Bu, `Provider` və `Consumer` özündə saxlayan bir context obyekti yaradır.

**Provider** — paylaşılan data-nı öz uşaq komponentlərinə çatdırmaqla məsuldur. Komponent ağacının müvafiq hissəsini `Provider` ilə əhatə edib, dəyəri `value` prop-u ilə ötürürük:

```jsx
<MyContext.Provider value={/* paylaşılan data */}>
  {/* uşaq komponentlər */}
</MyContext.Provider>
```

`MyContext.Provider` daxilindəki istənilən komponent bu data-ya `useContext` hook-u ilə çata bilər:

```jsx
import React, { useContext } from "react";

const MyComponent = () => {
  const value = useContext(MyContext);
  // value ilə render et
};
```

Context API-dan istifadə etməklə **prop-drilling** problemindən qaça bilərik — məlumatı komponent ağacının hər səviyyəsindən əl-ələ ötürməyə ehtiyac qalmır. Bu, kodu daha oxunaqlı və idarə olunan edir, çünki komponentlər paylaşılan data-ya birbaşa çata bilir.

> Vacib qeyd: Context API hər ssenari üçün nəzərdə tutulmayıb, ehtiyatla istifadə olunmalıdır. O, həqiqətən qlobal olan, ya da komponent ağacının böyük hissəsinə aid olan data üçün faydalıdır. Kiçik ölçülü data paylaşımı üçün isə hələ də adi **props** tövsiyə olunan yanaşmadır.

## Nəticə

Props komponentə xaricdən məlumat ötürməyin yolu idisə, **state** komponentin öz daxilində, zaman keçdikcə dəyişən məlumatı saxlamağın yoludur. `useState` bu məlumatı yaradır və yeniləyir, `useEffect` isə komponentin "xarici dünya" ilə əlaqəsini — data fetch, subscription, cleanup — idarə edir. Kompleks, dərin komponent ağaclarında isə `useContext` prop-drilling-ə ehtiyac qalmadan data paylaşmağa imkan verir.

Qısaca: **props valideyndən gələn, state komponentin öz yaratdığı, context isə hər kəsin bölüşdüyü məlumatdır.** Bu üç mexanizmi düzgün seçib birgə işlətmək — React ilə iş görməyin əsl sənətidir.

# Komponentin Yaddaşı Niyə Boş Yerə İşləməsin? Memoizasiya və Hooks

Function komponent hər render-də başdan-başa çağırılır — bunu əvvəlki yazılarda gördük. Bu, sadə komponentlər üçün problem deyil, amma komponent daxilində baha başa gələn hesablama var, ya da hər dəfə yeni funksiya yaradılırsa, bu, performansa mənfi təsir edə bilər. React bu problemi həll etmək üçün üç hook təklif edir: **useMemo**, **useCallback** və **useRef**. Bunlar müvafiq olaraq dəyəri, funksiyanı və reference-i **memoize** edir — yəni lazım olmadıqca yenidən yaratmır, əvvəlki nəticəni yadda saxlayıb təkrar istifadə edir.

## useMemo: baha hesablamanı yadda saxlamaq

`useMemo` bir hesablamanın nəticəsini memoize edir, yəni yalnız asılılıqlar (dependencies) dəyişəndə yenidən hesablanır. Arqument kimi funksiya və asılılıq array-i qəbul edir, nəticədə memoize olunmuş dəyəri qaytarır.

```jsx
import { useMemo } from "react";

const Component = () => {
  const expensiveResult = useMemo(() => {
    // Baha başa gələn hesablama
    return computeExpensiveValue(dependency);
  }, [dependency]);

  return <div>{expensiveResult}</div>;
};
```

Burda `expensiveResult` dəyəri `useMemo` ilə memoize olunub. Funksiyanın daxilindəki hesablama yalnız `dependency` dəyəri dəyişəndə icra olunur. Əgər `dependency` eyni qalıbsa, React hesablamanı təkrar etmir, sadəcə əvvəlcədən yadda saxlanmış nəticəni qaytarır.

> `useMemo`-nu belə düşün: aşpaz hər sifarişdə eyni sousu yenidən hazırlamır — bir dəfə hazırlayıb soyuducuda saxlayır, resept (asılılıq) dəyişməyincə həmin sousdan istifadə edir. Resept dəyişəndə isə yenidən hazırlayır.

Diqqət et: `useMemo` yalnız *baha* hesablamalar üçün mənalıdır — iki ədədi toplamaq kimi ucuz əməliyyatı memoize etmək faydadan çox artıq mürəkkəblik yaradır, çünki `useMemo`-nun özünün də iş yükü var (asılılıqları müqayisə etmək).

## useCallback: funksiya reference-ini sabit saxlamaq

Function komponent hər render olunanda onun daxilindəki bütün funksiyalar — o cümlədən inline callback-lər — yenidən yaradılır. Bu, uşaq komponentə callback prop kimi ötürüləndə problem yaradır: uşaq komponent həmin callback-i "yeni reference" kimi qəbul edir və nəticədə lazımsız yerə yenidən render olunur.

```jsx
const MyComponent = () => {
  return <MyButton onClick={() => console.log("click")} />;
};
```

Burda `onClick`-ə ötürülən inline funksiya `MyComponent` render olunan hər dəfə yenidən yaradılır. Yəni `MyButton` hər dəfə yeni funksiya reference-i alır, bu da `MyButton`-un yenidən render olunmasına səbəb olur — hətta funksiyanın "məzmunu" eyni qalsa belə.

`useCallback` bunu həll edir — funksiyanı memoize edir:

```jsx
const MyComponent = () => {
  const clickHandler = React.useCallback(() => {
    console.log("click");
  }, []);

  return <MyButton onClick={clickHandler} />;
};
```

Boş asılılıq array-i (`[]`) React-a deyir ki, bu funksiyanın heç bir asılılığı yoxdur, deməli komponentin bütün "ömrü" boyu sabit qalmalıdır. Nəticədə `MyComponent` hər render olunanda `MyButton`-a **eyni** funksiya reference-i ötürülür, uşaq komponent isə lazımsız yerə yenidən render olunmur.

> `useCallback` ilə `useMemo` arasındaki fərq sadədir: `useMemo` bir *dəyəri* yadda saxlayır, `useCallback` isə bir *funksiyanı*. Əslində `useCallback(fn, deps)` = `useMemo(() => fn, deps)`.

## useRef: render-lər arası yaşayan, amma render tetiklməyən dəyər

`useRef` render-lər arasında yaşayan, dəyişəndə isə komponentin yenidən render olunmasına səbəb olmayan mutable (dəyişə bilən) bir reference yaradır. Ən çox iki ssenaridə istifadə olunur: (1) DOM node-una, ya da React komponent instansına birbaşa çatmaq, (2) render-lər arasında "yadda qalmalı" olan, amma UI-yə təsir etməyən dəyəri saxlamaq (məsələn, əvvəlki bir dəyər, timer ID-si və s.).

```jsx
const Component = () => {
  const inputRef = useRef();

  const handleButtonClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleButtonClick}>Input-a fokuslan</button>
    </div>
  );
};
```

`inputRef` `useRef` ilə yaradılıb və `input` elementinin `ref` atributuna verilib. Bu, `inputRef.current` vasitəsilə birbaşa DOM node-una çatmağa imkan verir. `handleButtonClick` funksiyasında `inputRef.current.focus()` çağırılır — düyməyə basanda input sahəsi fokuslanır.

> `useState` ilə `useRef`-i qarışdırma: `state` dəyişəndə komponent yenidən render olunur, `ref.current` dəyişəndə isə heç nə baş vermir — sanki qeyd dəftərçəsinə yazırsan, kimsə oxumur, sadəcə lazım olanda özün baxırsan.

`useRef` sayəsində DOM node-una birbaşa çatmaq mümkün olur, komponentin əlavə render-inə ehtiyac qalmadan.

## Nəticə

`useMemo`, `useCallback` və `useRef` hook-ları ilə tətbiqin performansını optimallaşdırmaq mümkündür: lazımsız hesablamalardan qaçmaq, lazımsız yenidən render-lərin qarşısını almaq və render-lər arasında dəyər/reference-i saxlamaq. Nəticədə istifadəçi daha rəvan təcrübə yaşayır, resurslar isə daha səmərəli istifadə olunur.

Qısaca desək: **`useMemo` dəyəri, `useCallback` funksiyanı, `useRef` reference-i yadda saxlayır** — üçü də eyni məqsədə xidmət edir: React-ə "bunu təkrar yaratma, əvvəlkini istifadə et" demək.








