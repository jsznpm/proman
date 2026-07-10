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
# React Necə "Eşidir"? Hadisə İdarəetməsinin Pərdə Arxası

Düyməyə klik edəndə, input-a yazanda, ya da elementin üzərinə mouse aparanda React tətbiqi bunu necə "bilir"? Cavab sadə görünür — `onClick`, `onChange` kimi atributlar yazırsan və hazır. Amma bu sadəliyin arxasında maraqlı bir mexanizm dayanır: React heç də hər elementə ayrıca "qulaq" qoşmur, hadisələri xüsusi bir obyektə bükür və hətta performans naminə onları təkrar-təkrar istifadə edir. Bu yazıda React-in hadisə idarəetməsini əvvəldən sona — deklarativ sintaksisdən tutmuş, `SyntheticEvent`-in pool edilməsinə qədər — addım-addım açırıq.

## Niyə React fərqli yanaşır?

jQuery kimi ənənəvi kitabxanalarda hadisə idarəetməsi **imperativdir** — əvvəlcə lazımi DOM elementini `document.querySelector` ilə tapmalı, sonra ona `addEventListener` ilə funksiya "yapışdırmalısan". Kod hara baxsa, "bu elementə hansı funksiya bağlıdır" sualının cavabını tapmaq üçün ayrıca axtarış aparmaq lazımdır.

React isə **deklarativ** yanaşma seçib: hadisə handler-i birbaşa JSX markup-un içində, elementin özündə elan olunur.

> Deklarativ yanaşmanın faydası budur: hansı kodun nə vaxt işə düşəcəyini bilmək üçün heç yerə qaçmağa ehtiyac yoxdur — markup-un özü sənə cavabı verir.

## Sadə handler yazmaq

Ən bəsit nümunədən başlayaq — düyməyə klik olunanda konsola mesaj yazan komponent:

```jsx
function MyButton(props) {
  const clickHandler = () => {
    console.log("clicked");
  };

  return <button onClick={clickHandler}>{props.children}</button>;
}
```

Burda `clickHandler` adlı funksiya `<button>` elementinin `onClick` propertisinə ötürülüb. Markup-a baxan kimi görürsən ki, düyməyə basılanda məhz bu funksiya işə düşəcək — kodu izləmək üçün başqa fayla keçməyə ehtiyac yoxdur.

React-in dəstəklədiyi bütün hadisə adlarının tam siyahısını [rəsmi React sənədlərində](https://react.dev/reference/react-dom/components/common) tapa bilərsən.

## Bir elementə bir neçə handler

Deklarativ sintaksisin əsl gücü elementə birdən çox handler bağlamaq lazım gələndə görünür. İmperativ kodda hər əlavə handler üçün yeni `addEventListener` çağırışı yazmalısan; JSX-də isə sadəcə bir prop daha əlavə edirsən:

```jsx
function MyInput() {
  const onChange = () => {
    console.log("changed");
  };
  const onBlur = () => {
    console.log("blured");
  };

  return <input onChange={onChange} onBlur={onBlur} />;
}
```

Bu `<input>` elementinə istəsən daha beş handler də əlavə et — kod eyni dərəcədə oxunaqlı qalacaq. Elementin nə qədər handler-ə "sahib" olduğunu görmək üçün sadəcə JSX-ə baxmaq kifayətdir.

## Inline handler-lər: adı olmayan funksiyalar

Adətən handler-ə ayrıca ad verib yuxarıda təyin edirsən. Amma bəzən funksiyanı birbaşa JSX-in içində, arrow function şəklində yazmaq daha rahatdır:

```jsx
function MyButton(props) {
  return (
    <button onClick={(e) => console.log("clicked", e)}>
      {props.children}
    </button>
  );
}
```

Inline handler-in ən praktik istifadə yeri — sabit (statik) bir parametri başqa funksiyaya ötürmək lazım gələndə. Yuxarıdakı nümunədə `console.log`-a `"clicked"` sətri ötürülür. Bunun üçün ayrıca adlı funksiya, ya da **higher-order function** (funksiya qaytaran funksiya) yaza bilərdin — amma bu, hər dəfə yeni bir ad tapmaq deməkdir. Inline yazmaq bəzən sadəcə daha sürətli yoldur.

## Pərdə arxasında: React handler-i DOM-a necə bağlayır?

Budur maraqlı hissə. JSX-də elementə `onClick` yazanda, React əslində **DOM elementinin özünə heç bir event listener qoşmur.** Bunun əvəzinə funksiyanı öz daxili "xəritə"sinə (internal mapping) əlavə edir. Bütün səhifə üçün React cəmi **bir dənə** hadisə dinləyicisi saxlayır — `document` obyektinin üzərində.

Hadisə baş verəndə (məsələn, klik) o, DOM ağacı boyunca yuxarı doğru "qabarır" (bubbling) və nəhayət `document`-ə çatır. Elə burda React öz xəritəsinə baxıb "bu hadisəyə uyğun hansı komponentin handler-i var?" sualına cavab tapır və uyğun funksiyanı çağırır.

> Bunu min mərtəbəli binaya bənzət: hər mənzilin qapısında ayrıca zəngçi qoymaq əvəzinə, binanın giriş qapısında tək bir təhlükəsizlik məntəqəsi olsun. Kimsə hansısa mənzilin zənginə basanda, siqnal əvvəlcə bu mərkəzi məntəqəyə gəlir, oradan da düzgün mənzilə yönləndirilir.

Niyə React bu qədər əlavə zəhmətə girir? Səbəb əvvəlki fəsillərdə gördüyümüz eyni prinsipdir: **deklarativ UI strukturunu DOM-dan mümkün qədər ayrı saxlamaq.** DOM React üçün sadəcə "render hədəfidir" — React-in memarlığı ona son render yerindən və hadisə sistemindən asılı olmadan işləmək imkanı verir.

Praktikada bu belə işləyir:
- Yeni komponent render olunanda onun handler funksiyaları React-in daxili xəritəsinə əlavə olunur.
- Hadisə `document`-ə çatanda React onu xəritədəki uyğun handler-lə eşləşdirir və tapılsa çağırır.
- Komponent silinəndə (unmount) onun handler-i xəritədən sadəcə çıxarılır.

Bunların heç biri əslində DOM-a toxunmur — hamısı tək bir mərkəzi listener vasitəsilə idarə olunur. Bu, həm performans, həm də memarlıq baxımından faydalıdır: render hədəfi (DOM) tətbiqin məntiqindən ayrı qalır.

## SyntheticEvent: React-in öz "event zərfi"

Native `addEventListener` istifadə etsən, callback-ə brauzerin öz event obyekti ötürülür. React-də isə handler-ə ötürülən obyekt fərqlidir — ona **SyntheticEvent** deyilir, native event-in üzərinə çəkilmiş yüngül "zərf"dir (wrapper).

SyntheticEvent iki məqsədə xidmət edir:

- **Brauzerlər arası fərqləri normallaşdırır** — eyni kod Chrome-da da, Safari-də də eyni cür işləyir.
- **Component-hierarchy əsaslı propagasiya üçün lazımi məlumatı daşıyır** (aşağıda izah olunur).

SyntheticEvent-in native event-lərlə tanış olan xüsusiyyətləri var:

- `event.target` — hadisəni yaradan DOM elementi göstərir.
- `event.currentTarget` — handler-in bağlı olduğu elementi göstərir.
- `event.preventDefault()` — default davranışın (məsələn, form submit, link keçidi) qarşısını alır.
- `event.stopPropagation()` — hadisənin komponent ağacı boyunca yuxarı yayılmasını dayandırır.

### Propagasiya: DOM-a görə yox, komponent ağacına görə

Native JavaScript-də hadisə propagasiyası **DOM iyerarxiyasına** görə işləyir — hadisə valideyn DOM elementlərinə doğru qabarır. React-də isə propagasiya **komponent iyerarxiyasına** görə işləyir: uşaq komponentdə baş verən hadisəni React komponent ağacının kökündə tutur, sonra həmin hadisəni yaradan konkret komponentə qədər aşağı süzür. Bu yanaşma **event delegation** adlanır və bütün hadisə məntiqini ağacın kökündə mərkəzləşdirir.

Bunun praktik faydaları:

- Hər ayrı DOM elementinə listener qoşulmadığı üçün performans yaxşılaşır.
- Dinamik yaradılan və ya silinən elementlər üçün listener əlavə/silmə ilə əl-ələ məşğul olmağa ehtiyac qalmır — React bunu avtomatik idarə edir.

## Event pooling: performans üçün "təkrar istifadə"

Hər hadisə üçün yeni bir SyntheticEvent obyekti yaratmaq və sonra onu **garbage collector**-a (yaddaş təmizləyicisinə) tapşırmaq — özü də bahalı əməliyyatdır.

> Garbage collector işləyərkən heç bir JavaScript kodu işləyə bilmir. Ona görə yaddaş baxımından səmərəli olmaq vacibdir — tez-tez təmizlənən yaddaş o qədər az CPU vaxtı deməkdir, tətbiqin istifadəçi hadisələrinə cavab vermək üçün istifadə edə biləcəyi.

Tətbiq az sayda hadisə idarə edirsə, bu problem hiss olunmaz. Amma orta ölçülü tətbiqlərdə belə saysız-hesabsız hadisə tetiklənir — handler-lər real iş görməsə belə. React bunun qarşısını **synthetic instance pool** yaradaraq alır: hadisə tetiklənəndə pool-dan hazır bir instance götürülür, onun xüsusiyyətləri doldurulur; handler bitəndən sonra isə həmin instance yenidən pool-a qaytarılır və xüsusiyyətləri sıfırlanır.

Bunu bənzətmə ilə izah etsək: hər müştəri üçün təzə fincan istehsal etmək əvəzinə, kafedə fincanları yuyub təkrar istifadə etmək kimidir — istehsal (allocation) və zibil (garbage collection) xərcindən qaçırsan.

### Pooling-in qarşısına qoyduğu tələ: asinxron kod

Burda diqqətli olmalı olduğun bir məqam var. Handler bitən kimi SyntheticEvent instance-ı pool-a qayıdır və **bütün xüsusiyyətləri təmizlənir.** Əgər handler daxilində asinxron kod yazmısansa (`.then()`, `setTimeout` və s.) və o kod event obyektinə sonradan müraciət etməyə çalışırsa — problem yaranır:

```jsx
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

function MyButton(props) {
  function onClick(e) {
    console.log("clicked", e.currentTarget.style);
    fetchData().then(() => {
      console.log("callback", e.currentTarget.style);
    });
  }

  return <button onClick={onClick}>{props.children}</button>;
}
```

Birinci `console.log` normal işləyir, çünki handler hələ bitməyib, event obyekti hələ "canlıdır". Amma ikinci `console.log` — `fetchData().then()` daxilində — handler artıq bitdikdən **sonra**, 1 saniyə gecikmə ilə işə düşür. O ana qədər `e` pool-a qaytarılıb, xüsusiyyətləri təmizlənib. Nəticədə `e.currentTarget.style` `undefined` qaytarır və konsolda xəbərdarlıq görürsən.

> Qayda sadədir: **event obyektinə heç vaxt asinxron kod daxilində müraciət etmə.** Lazım olan dəyəri (məsələn, `e.currentTarget.style`) handler hələ işləyərkən, sinxron şəkildə ayrıca dəyişənə köçür, sonra həmin dəyişəni asinxron kodda istifadə et.

## Nəticə

React-in hadisə idarəetməsi üç qatdan ibarətdir: **JSX-də deklarativ elan** (`onClick={handler}`), **pərdə arxasında mərkəzləşdirilmiş event delegation** (tək `document` listener-i, komponent ağacına görə propagasiya) və **performans üçün SyntheticEvent pooling**. Sən yalnız birinci qatı — hansı funksiyanın hansı hadisəyə bağlı olduğunu — yazırsan; qalan ikisini React öz üzərinə götürür.

**Qısaca:** JSX-də `onClick` yazmaq sadə görünə bilər, amma arxada React sənin əvəzinə minlərlə DOM elementinə listener yapışdırmaqdan, hər hadisə üçün təzə obyekt yaratmaqdan səni xilas edir. Yeganə şərt budur — event obyektindən lazım olanı dərhal götür, asinxron dünyaya "boş fincan" aparma.

# Bir Komponent Hər Şeyi Etməli Deyil: Təkrar İstifadə Oluna Bilən Komponentlər Necə Qurulur?

Tətbiq böyüyəndə çox vaxt bir feature üçün bir komponent yazırıq — bütün state, bütün JSX, bütün event handler-lər eyni yerdə. Əvvəlcə rahat görünür, amma vaxt keçdikcə həmin komponent şişir, oxunmaz olur, başqa yerdə istifadə edə bilmirsən. Bu yazıda belə bir **monolit komponenti** addım-addım necə kiçik, təkrar istifadə oluna bilən parçalara böldüyümüzü göstərəcəyik — və yol boyu **render props** kimi vacib bir texnikanı da öyrənəcəyik.

## HTML elementləri: utility yoxsa feature?

Əvvəlcə sadə bir müşahidə ilə başlayaq. HTML elementlərinin bir qismi **feature-yönümlüdür**, bir qismi isə **utility-yönümlüdür** (yəni ümumi məqsədli).

`<section>` elementinə bax — bu, generic bir konteynerdir, demək olar hər yerdə istifadə edilə bilər, amma əsas rolu feature-in strukturunu (xarici qabığını və daxili bölmələrini) qurmaqdır.

`<p>`, `<span>`, `<button>` isə fərqlidir — bunlar hər yerdə eyni məqsədlə işlədilir: `<button>` həmişə klikləmək üçündür, kontekstdən asılı olmayaraq. Bu, feature-dən daha aşağı, daha universal bir səviyyədir.

React komponentlərində də eyni fərq var, sadəcə daha mürəkkəbdir — çünki HTML statik markup-dırsa, React komponenti markup-u **data** ilə birləşdirir. Sual budur: necə edək ki, həm feature-ə xas, həm də hər yerdə işlənə bilən komponentlər düzgün ayrılsın?

## Monolit komponentin problemi

Fərz et ki, bir feature üçün cəmi **bir** komponent yazmaq mümkündür — heç bir alt-komponentə ehtiyac yoxdur. İlk baxışda bu, işi asanlaşdırır kimi görünür: az komponent, az kommunikasiya yolu.

Amma praktikada bu, bir neçə səbəbdən işləmir:

- **Komanda işi çətinləşir** — versiya nəzarəti, merge conflict-lər, paralel inkişaf bir nəhəng fayl üzərində əziyyətli olur.
- **Refaktor getdikcə çətinləşir** — komponent böyüdükcə onu sonradan kiçik parçalara bölmək də çətinləşir.
- **Feature-lər üst-üstə düşür** — tətbiqdə tam unikal feature-lər az olur, oxşar hissələr təkrarlanır.
- **State idarəsi mürəkkəbləşir** — bir feature-in state-i digərinə təsir edəndə, hər şey bir komponentin içindəsə, bunu izləmək çox çətinləşir.

Bunu ən yaxşı başa düşmək üçün əvvəlcə monolit bir komponent yazaq, sonra onu addım-addım refaktor edək.

## Monolit komponent: məqalə siyahısı

Nümunə feature-imiz sadədir: istifadəçi məqalə əlavə edə bilir, siyahıdakı məqalənin xülasəsini aça/bağlaya bilir və məqaləni silə bilir.

JSX belə görünür:

```jsx
<section>
  <header>
    <h1>Articles</h1>
    <input placeholder="Title" value={title} onChange={onChangeTitle} />
    <input
      placeholder="Summary"
      value={summary}
      onChange={onChangeSummary}
    />
    <button onClick={onClickAdd}>Add</button>
  </header>
  <article>
    <ul>
      {articles.map((i) => (
        <li key={i.id}>
          <a
            href={`#${i.id}`}
            title="Toggle Summary"
            onClick={() => onClickToggle(i.id)}
          >
            {i.title}
          </a>
          &nbsp;
          <button
            title="Remove"
            onClick={() => onClickRemove(i.id)}
          >
            &#10007;
          </button>
          <p style={{ display: i.display }}>{i.summary}</p>
        </li>
      ))}
    </ul>
  </article>
</section>
```

Görürsən ki, bir yerdə həm form (başlıq və xülasə daxil etmək üçün input-lar), həm də siyahının render-i qarışıb. Bu, artıq "çox JSX bir yerdə" siqnalıdır.

İndi state-ə baxaq:

```jsx
const [articles, setArticles] = React.useState([
  { id: id.next(), title: "Article 1", summary: "Article 1 Summary", display: "none" },
  { id: id.next(), title: "Article 2", summary: "Article 2 Summary", display: "none" },
]);
const [title, setTitle] = React.useState("");
const [summary, setSummary] = React.useState("");
```

`articles` array-dir, hər elementdə `title`, `summary`, `display` sahələri və unikal `id` var. `id` isə belə yaradılır:

```js
const id = (function* () {
  let i = 1;
  while (true) {
    yield i;
    i += 1;
  }
})();
```

Bura diqqət et: bu, çağırılıb dərhal icra edilən bir **generator function**-dır. `id.next()` çağıranda, birinci dəfə 1, ikinci dəfə 2 qaytarır — sonsuza qədər. Yəni hər yeni məqaləyə unikal ID vermək üçün rahat bir utility.

İndi event handler-lərə baxaq:

```jsx
const onChangeTitle = useCallback((e) => {
  setTitle(e.target.value);
}, []);

const onChangeSummary = useCallback((e) => {
  setSummary(e.target.value);
}, []);
```

Bunlar sadəcə input-a yazılan dəyəri müvafiq state-ə yazır.

```jsx
const onClickAdd = useCallback(() => {
  setArticles((state) => [
    ...state,
    { id: id.next(), title: title, summary: summary, display: "none" },
  ]);
  setTitle("");
  setSummary("");
}, [summary, title]);
```

`onClickAdd` yeni məqaləni `articles` array-inə əlavə edir. Diqqət et — `[...state, yeniElement]` ilə **yeni array** qurulur, köhnəsi birbaşa dəyişdirilmir. Bu qəsdən belədir: React-də state-i **immutable** (dəyişməz) rəftar etmək lazımdır ki, eyni state-ə toxunan başqa kod gözlənilməz nəticəylə qarşılaşmasın.

```jsx
const onClickRemove = useCallback((id) => {
  setArticles((state) => state.filter((article) => article.id !== id));
}, []);
```

`filter()` da yeni array qaytarır — verilən ID-li məqalə çıxarılıb qalanları saxlanılır.

```jsx
const onClickToggle = useCallback((id) => {
  setArticles((state) => {
    const articles = [...state];
    const index = articles.findIndex((article) => article.id === id);
    articles[index] = {
      ...articles[index],
      display: articles[index].display ? "" : "none",
    };
    return articles;
  });
}, []);
```

`onClickToggle` məqalənin xülasəsini aç/bağla edir. Burda iki immutable əməliyyat var: əvvəlcə array-in kopyası çıxarılır, sonra müvafiq index-dəki obyektin özü də spread operator (`{...articles[index]}`) ilə köçürülüb, yalnız `display` sahəsi dəyişdirilir.

Bu komponent işini görür, amma **monolitdir** — tətbiqin başqa yerində bu hissələrdən (siyahı, ya da forma) təkrar istifadə etmək istəsən, hər şeyi yenidən yazmalısan. İndi bunu düzəldək.

## Refaktor: JSX-dən başlamaq

Monolit komponenti kiçildəndə ən yaxşı başlanğıc nöqtəsi JSX-in özüdür — struktura bax və təbii sərhədləri tap.

JSX-in yuxarı hissəsi — forma elementləri — öz komponenti ola bilər:

```jsx
<header>
  <h1>Articles</h1>
  <input placeholder="Title" value={title} onChange={onChangeTitle} />
  <input placeholder="Summary" value={summary} onChange={onChangeSummary} />
  <button onClick={onClickAdd}>Add</button>
</header>
```

Aşağı hissə isə — məqalə siyahısı — başqa bir namizəddir. Onun içindəki `<li>` isə özü ayrıca komponent ola bilər. Bunları bir-bir çıxaraq.

## ArticleList komponenti

```jsx
function ArticleList({ articles, onClickToggle, onClickRemove }) {
  return (
    <ul>
      {articles.map((i) => (
        <li key={i.id}>
          <a
            href={`#${i.id}`}
            title="Toggle Summary"
            onClick={() => onClickToggle(i.id)}
          >
            {i.title}
          </a>
          &nbsp;
          <button title="Remove" onClick={() => onClickRemove(i.id)}>
            &#10007;
          </button>
          <p style={{ display: i.display }}>{i.summary}</p>
        </li>
      ))}
    </ul>
  );
}
```

Sadəcə monolit komponentin siyahı hissəsi buraya köçürülüb. Əsas feature komponenti indi belədir:

```jsx
<section>
  <header>
    <h1>Articles</h1>
    <input placeholder="Title" value={title} onChange={onChangeTitle} />
    <input placeholder="Summary" value={summary} onChange={onChangeSummary} />
    <button onClick={onClickAdd}>Add</button>
  </header>
  <ArticleList
    articles={articles}
    onClickRemove={onClickRemove}
    onClickToggle={onClickToggle}
  />
</section>
```

Siyahının render-i artıq `ArticleList`-in işidir. Ona lazım olan data və iki event handler prop kimi ötürülür.

## ArticleItem komponenti: bir addım da irəli

`ArticleList`-i də daha da kiçiltmək olar. Hər `<li>` özü ayrıca komponent ola bilər:

```jsx
function ArticleItem({ article, onClickRemove }) {
  const [isOpened, setIsOpened] = React.useState(article.display !== "none");

  const onClickToggle = React.useCallback(() => {
    setIsOpened((state) => !state);
  }, []);

  return (
    <li>
      <a href={`#${article.id}`} title="Toggle Summary" onClick={onClickToggle}>
        {article.title}
      </a>
      &nbsp;
      <button title="Remove" onClick={() => onClickRemove(article.id)}>
        &#10007;
      </button>
      <p style={{ display: isOpened ? "block" : "none" }}>{article.summary}</p>
    </li>
  );
}
```

Burda diqqət çəkən əsas dəyişiklik: aç/bağla məntiqi (`isOpened` state-i) artıq **yerli olaraq** `ArticleItem`-in daxilindədir, valideyn komponentə heç bir aidiyyəti yoxdur. Bunun iki faydası var:

1. Əsas feature komponenti (`articles` state-ini saxlayan) artıq xülasənin açıq olub-olmamasından xəbərsizdir — sadəcə data axınına baxır.
2. **Performans yaxşılaşır**: xülasəni açanda artıq bütün `articles` array-i spread operator ilə yenidən qurulmur, yalnız `ArticleItem`-in öz lokal state-i dəyişir. Nəticədə siyahı özü təkrar render olunmur, sadəcə klikləniən element yenilənir.

> Niyə event handler-ləri uşaq komponentə ötürürük? Çünki `ArticleList` state-in necə dəyişdiyi ilə maraqlanmamalıdır — onun işi sadəcə düzgün elementləri render edib, düzgün DOM node-larına düzgün callback-ləri bağlamaqdır. Bu, **container komponent** anlayışının əsasıdır — aşağıda bunu daha ətraflı görəcəyik.

`ArticleList` isə indi sadəcə map edir:

```jsx
function ArticleList({ articles, onClickRemove }) {
  return (
    <ul>
      {articles.map((article) => (
        <ArticleItem
          key={article.id}
          article={article}
          onClickRemove={onClickRemove}
        />
      ))}
    </ul>
  );
}
```

Bu, `ArticleItem`-i başqa kontekstdə (məsələn, filtrlənmiş bir siyahıda) də təkrar istifadə etməyə imkan verir.

## AddArticle komponenti

Sıra formaya (yeni məqalə əlavə etmək üçün input-lara) çatdı:

```jsx
function AddArticle({ name, title, summary, onChangeTitle, onChangeSummary, onClickAdd }) {
  return (
    <section>
      <h1>{name}</h1>
      <input placeholder="Title" value={title} onChange={onChangeTitle} />
      <input placeholder="Summary" value={summary} onChange={onChangeSummary} />
      <button onClick={onClickAdd}>Add</button>
    </section>
  );
}
```

İndi əsas feature komponenti sadəcə iki komponenti render edir:

```jsx
<section>
  <AddArticle
    name="Articles"
    title={title}
    summary={summary}
    onChangeTitle={onChangeTitle}
    onChangeSummary={onChangeSummary}
    onClickAdd={onClickAdd}
  />
  <ArticleList articles={articles} onClickRemove={onClickRemove} />
</section>
```

Diqqət et — nə qədər dəyişdi. Əsas komponent artıq **data-ya** fokuslanıb (state, handler-lər), UI-nin özünü isə başqa komponentlərə həvalə edib.

## Render props: komponentləri property kimi ötürmək

İndi başqa bir sual: bu feature-i tətbiqin fərqli yerlərində istifadə etmək istəsən, amma hər yerdə `ArticleList` ya da `AddArticle`-ın fərqli versiyasını işlətmək lazımdırsa, nə edirsən? Problem budur: bir komponenti başqası ilə **əvəz etmək**.

**Render props** bunun üçün rahat bir üsuldur. Fikir sadədir: komponentə bir property ötürürsən, dəyəri isə render ediləcək JSX-i qaytaran bir **funksiyadır**. Beləliklə, feature komponenti uşaq komponentlərini birbaşa import edib asılı olmaq yerinə, onları bayırdan property kimi qəbul edir.

Əsas komponent (`MyFeature`) belə görünür:

```jsx
<section>
  {addArticle({
    title,
    summary,
    onChangeTitle,
    onChangeSummary,
    onClickAdd,
  })}
  {articleList({ articles, onClickRemove })}
</section>
```

`addArticle()` və `articleList()` — özləri property olaraq gələn funksiyalardır, çağırılanda müvafiq JSX-i qaytarırlar. Fərq budur: bu modul artıq `AddArticle` ya `ArticleList`-i import etmir — onlardan tamamilə asılı deyil.

`MyFeature`-i render edən yerdə (məsələn, `main.js`) isə bunları render prop kimi ötürürük:

```jsx
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <MyFeature
    addArticle={({ title, summary, onChangeTitle, onChangeSummary, onClickAdd }) => (
      <AddArticle
        name="Articles"
        title={title}
        summary={summary}
        onChangeTitle={onChangeTitle}
        onChangeSummary={onChangeSummary}
        onClickAdd={onClickAdd}
      />
    )}
    articleList={({ articles, onClickRemove }) => (
      <ArticleList articles={articles} onClickRemove={onClickRemove} />
    )}
  />
);
```

Burda `addArticle` və `articleList` — `MyFeature`-dan gələn arqumentləri qəbul edən funksiyalardır (məsələn, `onClickRemove` `MyFeature`-in öz state-ini dəyişən funksiyadır). Funksiyanın **qaytardığı** JSX isə sonda faktiki render olunan şeydir.

> Render prop-un mahiyyəti budur: `MyFeature` artıq "mən mütləq `ArticleList` işlədəcəm" demir, sadəcə "mənə bir siyahı render edən funksiya ver" deyir. Hansı komponentin işlədiləcəyini isə çağıran tərəf seçir.

Bu yanaşma sənə asılılıqları hardcode etmədən feature-i fərqli kontekstlərdə fərqli komponentlərlə istifadə etmək imkanı verir — adətən bir modulun öz asılılıqlarını dəyişməkdən qat-qat asandır.

## Komponent ağacları necə qurulur?

Gəl bir addım geri çəkilib gördüklərimizə baxaq. Əvvəlcə monolit olan feature komponenti indi demək olar tamamilə **data**-ya fokuslanır: initial state-i saxlayır, state-i transform edir, lazım gələrsə şəbəkə sorğuları edir. Bu, React tətbiqində tipik **container komponent** rolu — data-nın başlanğıc nöqtəsi.

Yeni yaratdığımız komponentlər isə bu data-nın **alıcılarıdır**. Fərq budur: onlar yalnız render olunduqları anda aldıqları property-lərlə maraqlanır — yəni müəyyən zaman anındakı data "şəklinə" (snapshot) baxırlar. Onlar da öz növbəsində bu data-nı öz uşaq komponentlərinə property kimi ötürə bilər.

Ümumi nümunə belədir: data container-dən aşağı — detal komponentinə ya siyahı komponentinə, oradan da utility komponentlərinə — bir istiqamətdə axır. Adətən 3 səviyyəli komponent kompozisiyası kifayət edir.

> 3 səviyyədən çox qat əlavə etsən, arxitektura başa düşülməsi çətin olur. Bəzən 4-cü qat lazım ola bilər, amma qayda olaraq bundan çəkin.

## Feature komponentləri vs utility komponentləri

Fəsli monolit komponentlə başladıq — o, tam feature-ə fokuslanmışdı, ona görə də tətbiqin başqa yerində demək olar heç bir utility-si yox idi.

Səbəbi sadədir: yuxarı səviyyəli komponentlər tətbiqin state-i ilə məşğul olur, state-li komponentləri isə başqa kontekstdə istifadə etmək çətindir. Monolit komponenti refaktor etdikcə, yaratdığımız yeni komponentlər getdikcə state-dən uzaqlaşdı. Ümumi qayda budur:

> Komponent state-li data-dan nə qədər uzaqlaşırsa, onun utility-si bir o qədər artır — çünki property dəyərləri tətbiqin istənilən yerindən ötürülə bilər.

## Nəticə

Bu yazıda monolit bir React komponentini necə sürdürülə bilən (sustainable) bir dizayna çevirdiyimizi gördük:

- HTML elementləri kimi, komponentlər də feature-yönümlü ya utility-yönümlü ola bilər — məqsəd düzgün balansı tapmaqdır.
- Monolit komponentlər başlanğıcda rahatdır, amma komanda işini, refaktoru və performansı çətinləşdirir.
- JSX-in strukturu refaktor üçün ən yaxşı başlanğıc nöqtəsidir — təbii sərhədləri göstərir.
- Container komponent yalnız **state**-lə məşğul olmalı, kiçik komponentlər isə property-lərini istənilən yerdən ala bilməlidir ki, utility-ləri artsın.
- Render props asılılıqları property kimi ötürməyə imkan verir — bir komponenti başqası ilə əvəz etmək asanlaşır.

Qısaca: monolit komponentdə hər şey bir yerdədir və heç nə təkrar istifadə edilmir; refaktor edilmiş komponent ağacında isə hər parça öz işini görür, data bir istiqamətdə axır, və istənilən parçanı başqa yerdə, başqa kontekstdə yenidən işlədə bilərsən.

# Komponentin Nə Gözlədiyini Bilmirsənsə, Bug Səni Tapır: TypeScript ilə Type-Checking

Hər tətbiqdə proqnozlaşdırıla bilənlik (predictability) vacibdir. Proqnozlaşdırıla bilən tətbiq gözlənilən şəkildə davranır — az bug, yaxşı user experience, asan saxlanma. React kontekstində proqnozlaşdırıla bilənlik çox vaxt komponentlərin aldıqları **props**-lara görə necə davrandığı ilə bağlıdır. Props (properties-in qısası) komponentə giriş məlumatıdır, onun davranışını və render-ini müəyyən edir. Məhz burda **props validasiyası** anlayışı işə düşür.

## Props validasiyası niyə vacibdir

Props validasiyası komponentin düzgün tipdə məlumat aldığını təmin etmə üsuludur. Bu, komponentlər arası bir növ müqavilədir: komponent hansı tip props gözlədiyini bildirəndə, əslində "bu tip props alsam, belə davranacam" deyə söz verir.

Props validasiyası bir neçə səbəbə görə vacibdir:

- **Xətaları erkən tutur** — komponent gözlənilməz tipdə prop alanda gözlənilməz davranır, tapılması çətin bug-lara səbəb olur. Validasiya ilə bu xətaları problem yaratmazdan əvvəl tuturuq.
- **Kod oxunaqlılığını artırır** — komponentin prop tiplərinə baxaraq nə tip məlumat gözlədiyini tez anlayırsan. Bu, komponenti tətbiq boyu istifadə etməyi və təkrar istifadə etməyi asanlaşdırır.
- **Komponenti proqnozlaşdırıla bilən edir** — komponent hansı tip props gözlədiyini aydın bildirəndə, onun necə davranacağını anlamaq daha asan olur.

### Validasiya olmadan nə baş verir

Kifayət qədər props validasiyası olmadan komponentlər proqnozlaşdırılmaz və bug-a meyilli olur. Bu komponentə bax:

```jsx
const MyList = ({ list }) => (
  <ul>
    {list.map((user) => (
      <li key={user.name}>
        {user.name} ({user.email})
      </li>
    ))}
  </ul>
);
```

Burda komponent `list` adlı prop gözləyir — `name` və `email` sahələri olan obyektlərdən ibarət array. Əgər bu komponentə `list` kimi string, rəqəm, hətta obyektsiz array göndərilsə, komponent `user.name` ya da `user.email`-ə çatmağa çalışacaq və xəta verəcək.

Bu cür xətaların debug edilməsi, xüsusən çoxlu komponenti olan böyük tətbiqlərdə, çətindir. Komponentin hər sətirini oxumadan ona nə göndərməli olduğunu anlamaq da çətinləşir. Nəticədə tətbiq çökə, ya da gözlənilməz davrana bilər. Bəs komponentlərə elə bir props validasiyası əlavə etsək ki, bu xətaları erkən tutsun və komponentin gözlənilən kimi davranmasını təmin etsin?

## Props validasiyası üçün seçimlər

React və React Native-də props validasiyası üçün bir neçə alət var. Biri **PropTypes** — komponentin gözlədiyi prop tiplərini müəyyən edən kitabxana. Digəri **TypeScript** — JavaScript-in statik tip yoxlaması (static type-checking) üçün güclü alətlər təqdim edən superset-i.

PropTypes ilə `MyList` komponenti belə görünür:

```jsx
import PropTypes from 'prop-types';

const MyList = ({ list }) => (
  <ul>
    {list.map((user) => (
      <li key={user.name}>
        {user.name} ({user.email})
      </li>
    ))}
  </ul>
);

MyList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
};
```

Burda PropTypes ilə deyirik ki, `list` prop-u obyektlərdən ibarət array olmalıdır, hər obyektin isə string tipli `name` və `email` sahəsi olmalıdır.

İndi eyni komponentin TypeScript versiyasına bax:

```tsx
type User = {
  name: string;
  email: string;
};

type MyListProps = {
  list: User[];
};

const MyList = ({ list }: MyListProps) => (
  <ul>
    {list.map((user) => (
      <li key={user.name}>
        {user.name} ({user.email})
      </li>
    ))}
  </ul>
);
```

Burda `User` və `MyListProps` tiplərini müəyyən edirik. `User` — `name` və `email` sahəsi olan (hər ikisi string) obyekt. `MyListProps` isə `User` obyektlərindən ibarət array olan `list` sahəsi olan obyekt.

PropTypes də, TypeScript də props validasiyası üçün dəyərlidir, amma TypeScript daha geniş və güclü tip yoxlama yanaşması təqdim edir və React/React Native community-də getdikcə populyarlaşır. Ona görə bundan sonra TypeScript-ə fokuslanacağıq.

## TypeScript nədir

TypeScript — Microsoft tərəfindən inkişaf etdirilib saxlanılan, JavaScript-in statik tipli superset-idir. Yəni JavaScript-ə əlavə xüsusiyyətlər qatır, bunların ən önəmlisi **statik tipləmə**-dir. JavaScript dinamik tipli olduğu halda, TypeScript sənə dəyişənlərin, funksiya parametrlərinin və qaytarılan dəyərlərin hansı tip data ola biləcəyini açıq şəkildə müəyyən etmə imkanı verən tip sistemi təqdim edir.

TypeScript tam JavaScript-lə uyğundur — istənilən düzgün JavaScript kodu eyni zamanda düzgün TypeScript kodudur. TypeScript transpiler (bir növ compiler) istifadə edərək browser-in birbaşa anlamadığı TypeScript kodunu, JavaScript-in işlədiyi istənilən mühitdə işləyə bilən JavaScript koduna çevirir.

Bu JavaScript funksiyasına bax:

```js
function greet(name) {
  return "Hello, " + name;
}

console.log(greet("Mike")); // "Hello, Mike"
console.log(greet(32)); // "Hello, 32"
```

Bu funksiya string arqument verəndə gözlənilən kimi işləyir. Amma rəqəm versən, məntiqsiz olsa da, xəta vermir.

İndi eyni funksiyanı TypeScript-də necə yazacağımıza bax:

```ts
function greet(name: string) {
  return "Hello, " + name;
}

console.log(greet("Mike")); // "Hello, Mike"
console.log(greet(32)); // Xəta: 'number' tipli arqument 'string' tipli parametrə uyğun deyil.
```

TypeScript versiyasında `name` parametrinə tip annotasiyası əlavə etmişik. Bu, TypeScript-ə deyir ki, `name` həmişə string olmalıdır. `greet`-i rəqəmlə çağırmağa çalışsaq, TypeScript xəta verəcək. Bu, kodu işə salmazdan əvvəl belə səhvi tutmağa kömək edir.

> Bunu belə düşün: TypeScript, kodun daxilinə girib "bura elə bax, bu problemli ola bilər" deyən köməkçi bir ko-pilot kimidir — problem böyüməzdən əvvəl onu göstərir.

### TypeScript niyə istifadə etməli

- **Xətaları erkən tutur** — compile zamanı, hətta kodu işə salmadan əvvəl xətaları tuta bilir. Bu, adi JavaScript-də runtime-a qədər tutulmayan bir çox ümumi xətanın qarşısını alır.
- **Kod oxunaqlılığını artırır** — tip annotasiyaları funksiyanın hansı tip arqument gözlədiyini və nə qaytardığını aydın göstərir. Bu, eyni kod bazası üzərində işləyən digər developer-lər üçün kodu daha anlaşıqlı edir.
- **Refactoring-i asanlaşdırır** — statik tipləmə sayəsində dəyişənin tipini ya da funksiyanın signature-ini dəyişəndə, TypeScript kodun harada uyğun dəyişiklik lazım olduğunu tapmağa kömək edir.
- **Community və tooling dəstəyi** — Microsoft, Google, Airbnb kimi böyük şirkətlər TypeScript istifadə edir. Bu, böyük community dəstəyi və resurs deməkdir. Çoxlu code editor autocompletion, type inference, error highlighting kimi xüsusiyyətlərlə TypeScript-i əla dəstəkləyir.
- **Müasir framework və kitabxanalarla inteqrasiya** — React və React Native kimi framework-lər built-in TypeScript definition-ları ilə gəlir. Populyar JavaScript kitabxanalarının böyük əksəriyyətinin də TypeScript definition-ları var.
- **İş bazarında artan tələb** — TypeScript-ə tələb, xüsusən React/React Native rollarında, sürətlə artır. TypeScript öyrənmək həm layihələrin, həm də karyeranın üçün dəyərli investisiyadır.

## Layihədə TypeScript qurulması

Vite React-TypeScript template-i ilə yeni layihə yaratmaq üçün:

```bash
npm create vite@latest my-react-app -- --template react-ts
```

Bu, TypeScript daxil olan `react-ts` template-i ilə yeni Vite layihəsi yaradır. Layihənin kökündə TypeScript-i konfiqurasiya edən `tsconfig.json` faylı olacaq:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

Bu ayarlar TypeScript-ə deyir ki, kodu JavaScript-in ən son versiyasına compile et (`target: "esnext"`), ən son module sistemini istifadə et (`module: "esnext"`), React 17-də tanıdılan yeni JSX transform-u istifadə et (`jsx: "react-jsx"`). `strict: true` isə daha çox xətanı tutmaq üçün geniş tip-yoxlama davranışını aktivləşdirir.

TypeScript JavaScript-dən fərqli fayl uzantıları istifadə edir: JSX olmayan fayllar üçün `.ts`, JSX olanlar üçün `.tsx`. İlk TypeScript React komponentimizi yaradaq:

```tsx
type AppProps = {
  message: string;
};

function App({ message }: AppProps) {
  return <div>{message}</div>;
}
```

Burda `App` komponentinin props-u üçün `AppProps` tipini müəyyən etmişik. Bu, TypeScript-ə deyir ki, `message` prop-u string olmalıdır.

Layihəni işə salmaq üçün:

```bash
npm run dev
```

Bu, Vite dev server-ini başladır. Kodda tip xətası varsa, TypeScript bunu console-da da göstərəcək.

## TypeScript-in əsas tipləri

TypeScript-in ən güclü xüsusiyyətlərindən biri zəngin tip sistemidir. Dəyişənin tipini müəyyən etmək üçün dəyişən adından sonra iki nöqtə (`:`) qoyub tipi yazırsan.

- **Boolean** — true/false dəyər:
  ```ts
  let isDone: boolean = false;
  ```
- **Number** — JavaScript-də olduğu kimi bütün rəqəmlər floating point dəyərdir, `number` tipini alır:
  ```ts
  let age: number = 32;
  ```
- **String** — mətn (textual) data üçün:
  ```ts
  let color: string = "blue";
  ```
- **Array** — element tipindən sonra `[]` yazaraq, ya da generic `Array<elemType>` şəklində:
  ```ts
  let list: number[] = [1, 2, 3];
  let list2: Array<number> = [1, 2, 3];
  ```
- **Tuple** — sayı sabit olan, amma elementlərin tipi eyni olmaq məcburiyyətində olmayan array. Məsələn string və number cütü:
  ```ts
  let x: [string, number];
  x = ["hello", 10]; // OK
  ```
- **Enum** — rəqəm dəstlərinə daha "dostluq" ad vermə üsulu:
  ```ts
  enum Color {
    Red,
    Green,
    Blue,
  }
  let c: Color = Color.Green;
  ```
- **Any** — yazarkən tipini bilmədiyimiz dəyişənlər üçün (məsələn, user-dən ya da 3-cü tərəf kitabxanadan gələn dinamik data). Bu tiplə compile-time yoxlamasından tam çıxırsan:
  ```ts
  let notSure: any = 4;
  notSure = "maybe a string instead";
  notSure = false; // OK, kəsinliklə boolean
  ```
- **Unknown** — `any`-nin tip-təhlükəsiz qarşılığı. Hər şey `unknown`-a assign oluna bilər, amma `unknown` özündən başqa heç nəyə (type assertion ya da narrowing olmadan) assign oluna bilməz:
  ```ts
  let notSure: unknown = 4;
  notSure = "maybe a string instead";
  notSure = false; // OK, structural typing sayəsində

  let surelyNotAString: string = notSure; // Xəta: 'unknown' 'string'-ə assign oluna bilməz
  ```
  Tipik istifadə sahəsi `catch` bloklarıdır, çünki error obyektinin tipi əvvəlcədən bilinmir:
  ```ts
  try {
    // xəta verə biləcək əməliyyat
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
  ```
- **Void** — heç bir dəyər qaytarmayan funksiyanın return tipi kimi:
  ```ts
  function warnUser(): void {
    console.log("This is my warning message");
  }
  ```
- **Null və undefined** — hər ikisinin öz adında tipi var. `undefined` optional tiplərdə önəmli rol oynayır — tip adından sonra `?` qoysan, dəyər ya həmin tip, ya da `undefined` ola bilər:
  ```ts
  function greet(name?: string) {
    return `Hello ${name}`;
  }

  greet("Mike");
  greet(undefined); // OK
  greet(); // Bu da OK
  ```
- **Never** — heç vaxt baş verməyən dəyər tipini təmsil edir. Funksiya heç vaxt dəyər qaytarmırsa (məsələn, xəta atırsa ya da sonsuz loop-dursa), `never` istifadə olunur:
  ```ts
  function throwError(errorMsg: string): never {
    throw new Error(errorMsg);
  }

  function infiniteLoop(): never {
    while (true) {}
  }
  ```

## Interface və type alias

Sadə tiplər sadə data üçün kifayətdir, amma daha mürəkkəb data strukturları üçün **interface** və **type alias** lazımdır — mürəkkəb tipləri müəyyən edib ad vermə üsulları.

### Interface

Interface obyektin necə görünəcəyini təsvir edən müqavilədir:

```ts
interface User {
  name: string;
  email: string;
}

const user: User = {
  name: "Alice",
  email: "alice@example.com",
};
```

Bu `User` interface-inə uyğun olmayan obyekti `user` dəyişəninə assign etməyə çalışsaq, TypeScript xəta verəcək.

### Type alias

Type alias interface-ə çox bənzəyir, amma yalnız obyektlər üçün deyil, digər tiplər üçün də istifadə oluna bilir:

```ts
type Point = {
  x: number;
  y: number;
};

type ID = number | string;

const point: Point = {
  x: 10,
  y: 20,
};

const id: ID = 100;
```

Burda iki ölçülü nöqtəni təmsil edən `Point` tipi, string ya da number ola bilən `ID` tipi müəyyən olunub.

### Interface yoxsa type alias?

Çox halda ikisi bir-birini əvəz edir, seçim şəxsi zövqdür. Amma fərqlər var: interface-lər daha genişlənə bilir, çünki bir neçə dəfə elan oluna bilir və birləşdirilir (merge). Type alias-lar isə yeni sahə əlavə etmək üçün yenidən açıla bilmir. Digər tərəfdən, type alias union tip, intersection tip, tuple kimi interface-də hələ olmayan tipləri təmsil edə bilir.

Ümumi qayda: obyektin formasını təsvir edirsənsə, interface ya da type alias — hər ikisi işləyir. Obyektdən başqa bir şeyi təsvir edirsənsə (union, tuple və s.), type alias lazımdır.

## TypeScript-i React-də istifadə

### Props-un tip yoxlaması

```tsx
type GreetingProps = {
  name: string;
};

const Greeting = ({ name }: GreetingProps) => {
  return <h1>Hello, {name}!</h1>;
};
```

Burda `GreetingProps` tipi `Greeting` komponentinin gözlədiyi props-un formasını müəyyən edir. Bu, sadə bir prop-lu misaldır, amma eyni yanaşma daha mürəkkəb props-u olan komponentlər üçün də işləyir. Məsələn, komponent obyekt ya da array prop alırsa, həmin obyektin/array-in formasını təsvir edən tip müəyyən edirik:

```tsx
type UserProps = {
  user: {
    name: string;
    email: string;
  };
};

const UserCard = ({ user }: UserProps) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};
```

Digər çox rast gəlinən ssenari — optional props. Bəzən komponentin həmişə lazım olmayan props-u olur. Bu halda default dəyər verib, tip müəyyənatında prop-u optional işarələyirik:

```tsx
type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
};

const Button = ({ children, disabled = false }: ButtonProps) => {
  return <button disabled={disabled}>{children}</button>;
};
```

`ButtonProps`-da `children` üçün `React.ReactNode` istifadə olunub — React-in təqdim etdiyi, string, rəqəm, JSX elementi, bunların array-i, hətta bu tipləri qaytaran funksiyalar daxil olmaqla, istənilən render oluna bilən content-i qəbul edən xüsusi tip. `disabled` isə optional-dır (`?` işarəsi ilə) və default dəyəri `false`-dur:

```tsx
<Button>Click me!</Button> {/* OK */}
<Button disabled>Don't click me!</Button> {/* OK */}
```

### State-in tip yoxlaması

```tsx
const Counter = () => {
  const [count, setCount] = React.useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>
    </div>
  );
};
```

`React.useState<number>(0)` ilə `count` state dəyişənini `number` tipli müəyyən etmişik. Əslində `<number>`-i buraxa bilərik, çünki TypeScript başlanğıc dəyərin tipindən `count`-un `number` olduğunu özü çıxara bilir (type inference). Bu həm də deməkdir ki, `setCount` yalnız rəqəm qəbul edəcək — başqa tip arqumentlə çağırsaq, TypeScript xəta verəcək.

### Event handler-lərin tip yoxlaması

```tsx
const InputField = () => {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return <input value={value} onChange={handleChange} />;
};
```

`event` parametri üçün `React.ChangeEvent<HTMLInputElement>` tipi istifadə olunub — bu, funksiyanın input sahəsindən change event alacağını göstərir. Bu tip `event.target.value` kimi input change event-inin bütün gözlənilən sahələrini özündə saxlayır. Bu tipdə olmayan sahəyə çatmağa çalışsaq, TypeScript xəta verəcək.

### Context-in tip yoxlaması

```tsx
type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = React.createContext<ThemeContextType | null>(null);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
```

`React.createContext`-ə `ThemeContextType`-i tip arqumenti kimi vermişik — bu, context dəyərinin formasını müəyyən edir: `theme` string-i və `setTheme` funksiyası. `ThemeProvider` bu dəyərləri context-ə ötürür. `useTheme` hook-u isə `React.useContext` ilə context-i istifadə edir; context `null`-dursa, xəta atır — bu, context-in provider daxilində istifadə olunduğunu təmin edən ümumi bir pattern-dir.

> Diqqət et: `useTheme`-in özündə tip müəyyən etməmişik. Amma o, `null` yoxlaması sayəsində TypeScript-ə context-in artıq `null` olmadığını "sübut edir" — nəticədə `useTheme`-i istifadə edən hər yerdə TypeScript avtomatik düzgün, `null`-suz context tipini təqdim edir.

### Ref-lərin tip yoxlaması

Ref-lər DOM node-una ya da React komponent instansına birbaşa çatmaq üçün istifadə olunur. TypeScript burda da köməyə çatır:

```tsx
const InputWithRef = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus the input</button>
    </div>
  );
};
```

`React.useRef`-ə tip arqumenti kimi `HTMLInputElement` verilib — bu, TypeScript-in built-in DOM tip tərifidir və DOM-dakı input elementini təmsil edir. Bu tip sayəsində `inputRef.current`-in tipi `HTMLInputElement | null` olur, TypeScript isə onun `focus` metodu olduğunu bilir.

## Nəticə

Props validasiyası olmadan komponent bir qara qutudur — nə gözlədiyini yalnız kodun hər sətrini oxuyaraq anlaya bilərsən, səhv data ötürəndə isə xəta runtime-da, çox vaxt ən əlverişsiz anda üzə çıxır. TypeScript bu müqaviləni komponentin özünə yazdırır: props, state, event, context, ref — hamısı üçün tip elan edirsən, TypeScript isə kodu işə salmazdan əvvəl bu müqaviləni pozan hər yeri sənə göstərir.

Qısası: PropTypes runtime-da xəbərdarlıq edir, TypeScript isə compile-time-da, hətta kodu işə salmadan qabaq. Nəticə — daha etibarlı, daha asan saxlanan, refactor edərkən səni qorxutmayan komponentlər.

# React Router ilə naviqasiya: URL-dən komponentə necə gedilir?

Demək olar hər web tətbiqinə routing lazımdır — yəni müəyyən URL-ə uyğun məzmun göstərmək. Qulaqda sadə səslənir, amma iş içinə girəndə mürəkkəbləşir: müxtəlif URL şablonları, iç-içə route-lar, dinamik parametrlər, naviqasiya axını.

Bu yazıda React tətbiqlərində de-fakto standart olan **react-router** paketini araşdıracağıq. Sırasıyla:

* Route-ların JSX ilə necə təyin olunduğu
* Dinamik URL seqmentləri və query parametrləri
* `Link` komponenti ilə naviqasiya

---

## Route nədir, necə qururuq?

react-router-in gücü ondadır ki, route-u, o route render edəcəyi komponentlə **yan-yana** yaza bilirsən. Bu, tətbiqin hansı hissəsinin hansı URL-ə bağlı olduğunu izləməyi asanlaşdırır.

Əvvəlcə paketi quraşdır:

```bash
npm install react-router-dom
```

Sadə bir komponent yaradaq:

```jsx
function MyComponent() {
  return <p>Salam, Route!</p>;
}
```

İndi bu komponenti bir route-a bağlayaq:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyComponent from "./MyComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyComponent />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

`RouterProvider` tətbiqin ən üst komponentidir. `createBrowserRouter` daxilində hər route-un iki əsas xüsusiyyəti var: `path` və `element`. Aktiv URL `path`-a uyğun gələndə, `element` render olunur.

> Router özü heç nə render etmir — o sadəcə hazırkı URL-i yoxlayıb, hansı komponentin göstərilməli olduğuna qərar verir.

`path` uyğun gəlməyəndə isə heç nə göstərilmir. Bu, routing-in bütün əsasıdır — qalan hər şey bunun üzərinə qurulur.

---

## Route-ları necə bölürük — feature əsaslı struktur

Onlarla route bir modulda toplananda, hansı route-un hansı feature-a aid olduğunu ağılda saxlamaq çətinləşir. Həll: **hər feature öz route-larını özü təyin etsin.**

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <h1>Nested Routes</h1>,
      },
      routeOne,
      routeTwo,
    ],
  },
]);

export const App = () => <RouterProvider router={router} />;
```

Burada `routeOne` və `routeTwo` ayrıca modullardan import olunan route obyektləridir. `Layout` komponenti isə dəyişməyən şablonu (naviqasiya paneli və s.) göstərir və `<Outlet />` vasitəsilə uyğun route-un məzmununu yerinə qoyur:

```jsx
function Layout() {
  return (
    <main>
      <nav>
        <Link to="/">Main</Link>
        <span> | </span>
        <Link to="/one">One</Link>
        <span> | </span>
        <Link to="/two">Two</Link>
      </nav>
      <Outlet />
    </main>
  );
}
```

`Outlet` — react-router-in daxili komponentidir. Uyğun gələn route element-i ilə əvəz olunan "yer tutan"dır.

Bu yanaşmanın faydası: router-in ölçüsü artıq route sayına deyil, **feature sayına** görə böyüyür. `one/index.js` faylı belə görünə bilər:

```jsx
const routes = {
  path: "/one",
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Redirect path="/one/1" />,
    },
    {
      path: "1",
      element: <First />,
    },
    {
      path: "2",
      element: <Second />,
    },
  ],
};
```

Burda üç qayda var: `/one` açılanda `/one/1`-ə yönləndir, `/one/1` — `First` komponentini göstər, `/one/2` — `Second`-u göstər.

`Redirect` komponenti heç bir UI göstərmir, sadəcə istifadəçini başqa route-a yönləndirir — məsələn, authentication statusuna görə. Buradakı səbəb sadədir: feature-un kök route-unda ("/one") göstəriləcək məzmun yoxdur, ona görə istifadəçini birbaşa məzmunlu səhifəyə ötürürük.

```jsx
export default function First() {
  return <p>Feature 1, page 1</p>;
}
```

---

## Route parametrləri — URL-ə dinamik dəyər necə qatılır?

İndiyə qədər gördüyümüz URL-lər statik idi. Amma real tətbiqlərdə çox vaxt URL-in bir hissəsi dəyişkəndir — məsələn, istifadəçi ID-si.

### Resurs ID-si URL-də

Fərz et ki, istifadəçi detalları səhifəsi qurursan. URL-də istifadəçinin ID-si olmalıdır, komponent də bu ID-ni tutub API çağırışı etməlidir:

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <UsersContainer />,
    errorElement: <p>Route not found</p>,
  },
  {
    path: "/users/:id",
    element: <UserContainer />,
    errorElement: <p>User not found</p>,
    loader: async ({ params }) => {
      const user = await fetchUser(Number(params.id));
      return { user };
    },
  },
]);
```

`:id` sintaksisi URL dəyişəninin başlanğıcını bildirir. `loader` funksiyası komponent göstərilmədən **əvvəl** işə düşür və məlumatı asinxron çəkir. Xəta olarsa, `errorElement` fallback kimi işə düşür.

`UserContainer` isə bu məlumatı belə istifadə edir:

```jsx
function UserContainer() {
  const params = useParams();
  const { user } = useLoaderData();

  return (
    <div>
      User ID: {params.id}
      <UserData user={user} />
    </div>
  );
}
```

`useParams()` — URL-in dinamik hissələrini oxuyan hook. `useLoaderData()` isə `loader`-in qaytardığı nəticəni verir. Əgər URL-də seqment tamamilə yoxdursa, bu kod işə düşmür — router birbaşa `errorElement`-ə keçir.

Mock API tərəfi belədir:

```js
const users = [
  { first: "John", last: "Snow", age: 40 },
  { first: "Peter", last: "Parker", age: 30 },
];

export function fetchUsers() {
  return new Promise((resolve) => resolve(users));
}

export function fetchUser(id) {
  return new Promise((resolve, reject) => {
    const user = users[id];
    if (user === undefined) {
      reject(`User ${id} not found`);
    } else {
      resolve(user);
    }
  });
}
```

`fetchUser` mövcud olmayan ID üçün reject edir — məhz elə bu reject `errorElement`-in işə düşməsinə səbəb olur, 500 xətası əvəzinə səliqəli "tapılmadı" mesajı göstərilir.

Nəhayət, detalları göstərən komponent:

```jsx
function UserData({ user }) {
  return (
    <section>
      <p>{user.first}</p>
      <p>{user.last}</p>
      <p>{user.age}</p>
    </section>
  );
}
```

### Query parametrləri — çoxlu opsional dəyər üçün

URL seqmentləri sadə, tək dəyərlər üçün əladır. Amma çoxlu, opsional dəyər lazım olanda (məsələn, sıralama qaydası) **query parametrləri** daha uyğundur.

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <UsersContainer />,
  },
]);
```

Route tərəfində query üçün xüsusi tənzimləmə yoxdur — bu, tamamilə komponentin işidir:

```jsx
function UsersContainer() {
  const [users, setUsers] = useState([]);
  const [search] = useSearchParams();

  useEffect(() => {
    const order = search.get("order");
    fetchUsers(order).then((users) => {
      setUsers(users);
    });
  }, [search]);

  return <Users users={users} />;
}
```

`useSearchParams()` — `URLSearchParams` obyekti qaytarır, `search.get("order")` ilə query dəyərini oxuyursan. `/?order=desc` açanda siyahı azalan qaydada gəlir, sadə `/` üçün isə defolt qayda işləyir.

> **URL parametri** vs **query parametri**: birincisi resursun kimliyini bildirir (`/users/5`), ikincisi isə necə göstəriləcəyini tənzimləyir (`?order=desc`). Bunu belə düşün — ID otağın nömrəsidir, query isə otaqdakı işıqların açıq/bağlı olmasıdır.

---

## Link komponenti — niyə sadə `<a>` yox?

Adi `<a>` teqi ilə link qoysan, brauzer serverə tam səhifə üçün GET sorğusu göndərməyə çalışar. Amma bizə bu lazım deyil — route konfiqurasiyası artıq tətbiqin öz içindədir, naviqasiyanı lokal həll etmək istəyirik.

### Sadə link-lər

```jsx
function Layout() {
  return (
    <>
      <nav>
        <p><Link to="first">First</Link></p>
        <p><Link to="second">Second</Link></p>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/first", element: <First /> },
      { path: "/second", element: <Second /> },
    ],
  },
]);
```

`to` xüsusiyyəti klik olunanda hansı route-un aktivləşəcəyini göstərir. `Link` brauzerin history API-sini də özü idarə edir — səhifə tam yenilənmir, sadəcə uyğun komponent dəyişir.

### Dinamik link-lər — URL və query parametrləri ilə

Dinamik seqmentli link qurmaq üçün string-i özün quraşdırmalısan:

```jsx
function Echo() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  return <h1>{params.msg || searchParams.get("msg")}</h1>;
}

const param = "From Param";
const query = new URLSearchParams({ msg: "From Query" });

export default function App() {
  return (
    <section>
      <p>
        <Link to={`echo/${param}`}>Echo param</Link>
      </p>
      <p>
        <Link to={`echo?${query.toString()}`}>Echo query</Link>
      </p>
    </section>
  );
}
```

Birinci link `/echo/From%20Param` ünvanına, ikinci isə `/echo?msg=From+Query` ünvanına aparır. `Echo` komponenti isə hər iki mənbədən — URL parametri (`params.msg`) və ya query (`searchParams.get("msg")`) — gələn dəyəri göstərir.

---

## Nəticə

Route — sadəcə URL-i komponentə çevirən qaydadır. react-router bu çevrilməni JSX-in özü ilə, komponentlərə yaxın saxlamağa imkan verir:

* Route-ları **feature-lara görə** böl, tək nəhəng fayl yox.
* Dinamik ID-lər üçün **URL parametrləri** (`:id`), çoxlu opsional dəyər üçün **query parametrləri** istifadə et.
* Naviqasiya üçün həmişə `<Link>` işlət, `<a>` yox — beləcə brauzer tam səhifə sorğusu göndərmir.

Qısası: **React 15-in fikri "hər şeyi əvvəlcədən düz URL-ə yaz" idisə, react-router deyir — "URL-i sən idarə et, komponent ona reaksiya versin."** Məhz bu prinsip React tətbiqlərini sürətli, çevik və genişlənə bilən edir.

# Bütün Tətbiqi Bir Anda Yükləmək Lazımdırmı? Lazy Component-lər və Suspense

Böyük React tətbiqi düşün: onlarla səhifə, yüzlərlə komponent. İstifadəçi ancaq ana səhifəyə baxmaq istəyir, amma browser bütün tətbiqin JavaScript kodunu — hətta istifadəçinin heç vaxt açmayacağı admin panelini belə — bir bundle içində yükləyir. Nəticə: uzun ilkin yüklənmə vaxtı, pis UX (User Experience — istifadəçi təcrübəsi).

**Code splitting** bu problemi həll edir: tətbiqin kodunu kiçik parçalara (bundle-lara) bölürsən, browser isə yalnız o an lazım olan parçanı yükləyir. React bunun üçün iki alət təklif edir: `lazy()` API və `Suspense` komponenti. Bu yazıda ikisinin necə işlədiyinə baxacağıq.

## Dynamic import: bundle-ların əsası

Adi `import` statement-i ilə modul çağıranda, həmin modul bütün tətbiqin əsas bundle-ına daxil olur — hamısı bir dəfəyə yüklənir. Amma `import()` **funksiyası** (statement yox, funksiya çağırışı) fərqli işləyir: modulu "on demand" (tələb olunanda) yükləyir, alət (Vite, Webpack və s.) isə həmin modul üçün ayrıca bundle yaradır.

Sadə komponent götürək:

```jsx
export default function MyComponent() {
  return <p>My Component</p>;
}
```

Bunu dynamic import ilə yükləsək:

```jsx
function App() {
  const [MyComponent, setMyComponent] = React.useState(() => () => null);

  React.useEffect(() => {
    import("./MyComponent").then((module) => {
      setMyComponent(() => module.default);
    });
  }, []);

  return <MyComponent />;
}
```

Burda `import("./MyComponent")` promise qaytarır, promise `module` obyekti ilə resolve olur. `module.default` — komponentin özüdür, onu `state`-ə yazırıq. Niyə state? Çünki `App` ilk render olduğu an `MyComponent`-in kodu hələ yüklənməyib. Kod gələndə state yenilənir, `MyComponent` düzgün dəyəri göstərir. Browser-in network tab-ına baxsan, `MyComponent`-in bundle-ı üçün ayrıca sorğu gedəndə görəcəksən.

## lazy(): əl işini React-a həvalə et

Yuxarıdaki `useState` + `useEffect` kombinasiyasını əldə yazmaq bezdiricidir. `lazy()` API elə bunu avtomatlaşdırır: `import()` promise-i qaytaran funksiya qəbul edir, əvəzində "lazy komponent" qaytarır — onu sadəcə render edirsən:

```jsx
import * as React from "react";

const MyComponent = React.lazy(() => import("./MyComponent"));

function App() {
  return <MyComponent />;
}
```

`MyComponent` indi `lazy()`-nin nəticəsidir. Onun bundle-ı ayrıca yüklənir, komponent isə ilk render olunanda bundle-ı özü yükləyir. Amma tək bir şey çatışmır: kod yüklənən müddətdə istifadəçiyə nə göstərmək. Bunun üçün `Suspense` lazımdır.

## Suspense: yüklənmə müddətində nə göstərmək

`Suspense` komponenti lazy komponentin daxilində olduğu ağacı "dinləyir" — kod yüklənənə qədər `fallback` prop-unda verilən məzmunu göstərir, kod yüklənən kimi əsl komponentə keçir.

Vacib məqam: lazy komponent `Suspense`-in **birbaşa** övladı olmaq məcburiyyətində deyil. Yəni tətbiqdə bir dənə `Suspense` qoyub, onun altındakı bütün lazy komponentləri idarə edə bilərsən.

```jsx
const MyFeature = React.lazy(() => import("./MyFeature"));

function MyPage() {
  return (
    <>
      <h1>My Page</h1>
      <MyFeature />
    </>
  );
}

function App() {
  return (
    <React.Suspense fallback={"loading..."}>
      <MyPage />
    </React.Suspense>
  );
}
```

`MyPage`-in özü lazy deyil, amma daxilində lazy `MyFeature` render edir. `MyFeature`-in bundle-ı yüklənən müddətdə `Suspense` bütün `MyPage`-i `fallback`-la ("loading...") əvəz edir. Bundle yüklənən kimi əsl `MyPage` görünür.

> Bunu restoranda sifariş kimi düşün: aşpaz yeməyi hazırlayana qədər ofisiant sənə boş masa göstərmir, "hazırlanır" lövhəsi qoyur. Yemək hazır olan kimi lövhə götürülür, süfrə görünür.

Lokal development-də bu bundle-lar demək olar dərhal yüklənir, `fallback`-ı görmək çətindir. Dev tools-un Network tab-ında throttling (Slow 3G) aktiv etsən, yüklənmə prosesini simulyasiya edib `fallback`-ı öz gözünlə görə bilərsin.

### Spinner ilə daha yaxşı fallback

`fallback` prop-u istənilən React elementini qəbul edir — sadə mətn yerinə animasiyalı spinner da qoya bilərsən. Məsələn, `react-spinners` paketindən:

```jsx
import * as React from "react";
import { FadeLoader } from "react-spinners";
import MyPage from "./MyPage";

function App() {
  return (
    <React.Suspense fallback={<FadeLoader color="lightblue" />}>
      <MyPage />
    </React.Suspense>
  );
}
```

Bu, sadə "loading..." mətninindən daha peşəkar görünüş verir — istifadəçinin öyrəşdiyi vizual dil.

## Hər Komponenti Lazy Etmə

Bütün komponentləri ayrıca bundle-a bölmək cazibədar görünə bilər — texniki cəhətdən çətin deyil. Amma bunun ciddi qiyməti var: çox sayda lazy komponent = eyni anda çox sayda HTTP sorğusu. Bir səhifədə bir yerdə istifadə olunan komponentləri ayrı-ayrı bundle-lara bölməyin heç bir faydası yoxdur — əksinə, browser eyni anda 5-10 kiçik fayl üçün sorğu göndərir, bu da daha yavaş ola bilər.

Doğru yanaşma: **səhifə = bundle**. Hər səhifəni lazy et, amma səhifənin daxilindəki komponentləri bir yerdə saxla (lazy etmə), çünki onlar hər halda birlikdə lazım olacaq.

```jsx
const First = React.lazy(() => import("./First"));
const Second = React.lazy(() => import("./Second"));

function ShowComponent({ name }) {
  switch (name) {
    case "first":
      return <First />;
    case "second":
      return <Second />;
    default:
      return null;
  }
}
```

`First` və `Second` — tətbiqin səhifələridir, ona görə lazy edilib. Amma `First`-in daxilindəki komponentlərə baxaq:

```jsx
import One from "./One";
import Two from "./Two";
import Three from "./Three";

export default function First() {
  return (
    <>
      <One />
      <Two />
      <Three />
    </>
  );
}
```

`One`, `Two`, `Three` — adi (lazy olmayan) import ilə gətirilib, eyni bundle-ın içindədir. Onları da lazy etsək, üç ayrı HTTP sorğusu olardı — bir sorğu əvəzinə. Heç bir fayda yox, sadəcə əlavə network yükü.

> Qayda sadədir: səhifə açılanda dərhal lazım olan hər şey bir bundle-da olsun. Yalnız "bəzən lazım olan, bəzən yox" olan bölmələr (məsələn, başqa səhifə, modal, admin panel) ayrı bundle-a layiqdir.

## Router ilə Lazy Səhifələr

Eyni məntiq `react-router` ilə də işləyir. Hər route-un komponentini lazy edib, naviqasiya baş verəndə yalnız o səhifənin kodunu yükləmək olar:

```jsx
const First = React.lazy(() => import("./First"));
const Second = React.lazy(() => import("./Second"));

function Layout() {
  return (
    <section>
      <nav>
        <span><Link to="first">First</Link></span>
        <span> | </span>
        <span><Link to="second">Second</Link></span>
      </nav>
      <section>
        <React.Suspense fallback={<FadeLoader color="lightblue" />}>
          <Outlet />
        </React.Suspense>
      </section>
    </section>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/first" element={<First />} />
          <Route path="/second" element={<Second />} />
        </Route>
      </Routes>
    </Router>
  );
}
```

Diqqət et: `Suspense` naviqasiya linklərinin **aşağısında** yerləşir. Bu o deməkdir ki, `fallback` məhz səhifə məzmununun görünəcəyi yerdə göstərilir — naviqasiya isə hər zaman görünür, yüklənmə zamanı yoxa çıxmır. `/first` route-u aktivləşəndə `First` komponenti ilk dəfə render olunur, bu da onun bundle-ının yüklənməsini tetikləyir.

## Nəticə

Code splitting böyük React tətbiqlərində vacib texnikadır. `import()` funksiyası bundle yaratmağı öz üzərinə götürür, `lazy()` isə komponenti "yükləməyə qədər gözləyən" formaya salır. `Suspense` bu gözləmə müddətində istifadəçiyə nə göstəriləcəyini idarə edir — və adətən tətbiqdə bir dənə `Suspense` kifayətdir, əgər səhifə-bundle strukturuna sadiq qalınsa.

Qısaca: **bölünməmiş bundle = uzun gözləmə, düzgün bölünmüş bundle = sürətli, rəvan UX.** Növbəti addım — bu səhifələrin server tərəfdə necə render olunduğuna baxmaq (Next.js), amma bu artıq başqa mövzu.

# Material UI: React tətbiqinə hazır komponent dəsti necə qoşulur?

React tətbiqi qurarkən hər düymə, hər input, hər naviqasiya elementi üçün sıfırdan komponent yazmaq vaxt itkisidir. Məhz buna görə əksər komandalar hazır **UI komponent kitabxanası** üzərində işləyir. Bazarda onlarla belə kitabxana var, düzgün seçim adətən layihənin ehtiyaclarına bağlıdır.

Bu yazıda ən populyar seçimlərdən biri olan **Material UI** (MUI) kitabxanasına baxacağıq. MUI-nin üstünlüyü sadədir: Google-un Material Design prinsiplərinə əsaslanan, tam fərdiləşdirilə bilən, yaxşı sənədləşdirilmiş komponent dəsti. Sırasıyla:

* Layout (yerləşdirmə) komponentləri
* Naviqasiya komponentləri
* İstifadəçi girişi (input) komponentləri
* Stil və tema sistemi

---

## Layout: Container və Grid

Səhifədəki elementləri düzgün yerləşdirmək — xüsusilə müxtəlif ekran ölçülərində — çətin işdir. Elementlər bir-birinə keçməməli, boşluqlar düzgün paylanmalı, ekran kiçiləndə/böyüyəndə layout "sınmamalıdır". MUI bu problemi iki komponentlə həll edir: `Container` və `Grid`.

### Container — enin idarəsi

`Container` komponenti öz içindəki elementlərin **üfüqi enini** məhdudlaşdırır. `maxWidth` xüsusiyyəti bir breakpoint (ekran ölçüsü kəsişmə nöqtəsi) qəbul edir — `sm` (kiçik), `md` (orta), `lg` (böyük) və s.

```jsx
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function MyApp() {
  const textStyle = {
    backgroundColor: "#cfe8fc",
    margin: 1,
    textAlign: "center",
  };
  return (
    <>
      <Container maxWidth="sm">
        <Typography sx={textStyle}>sm</Typography>
      </Container>
      <Container maxWidth="md">
        <Typography sx={textStyle}>md</Typography>
      </Container>
      <Container maxWidth="lg">
        <Typography sx={textStyle}>lg</Typography>
      </Container>
    </>
  );
}
```

`Typography` mətni göstərmək üçün istifadə olunur. Hər `Container` öz `maxWidth` dəyərinə çatana qədər ekranla birlikdə böyüyür, sonra dayanır. Yəni `sm` konteyner kiçik bir enə çatan kimi artıq genişlənmir, `lg` isə daha uzun müddət böyüməyə davam edir.

> `Container` sənə üfüqi böyümə üzərində nəzarət verir — ekran ölçüsü dəyişəndə layout özü uyğunlaşır, sən əl ilə media query yazmırsan.

### Grid — cədvəl əsaslı yerləşdirmə

`Container` tək bir bloku məhdudlaşdırırsa, `Grid` bütün səhifə strukturunu qurur. `Grid` iki rolda çıxış edə bilər: **konteyner** (uşaqları saxlayan) və ya **element** (konteynerin daxilindəki bir hissə). Bu iki rolun kombinasiyası ilə istənilən layout qurmaq mümkündür.

```jsx
const headerFooterStyle = { textAlign: "center", height: 50 };
const mainStyle = { textAlign: "center", padding: "8px 16px" };

const Item = styled(Paper)(() => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function App() {
  return (
    <Grid container spacing={2} sx={{ backgroundColor: "#F3F6F9" }}>
      <Grid xs={12}>
        <Item sx={headerFooterStyle}>
          <Typography sx={mainStyle}>Header</Typography>
        </Item>
      </Grid>
      <Grid xs="auto">
        <Item>
          <Stack spacing={1}>
            <Typography sx={mainStyle}>Nav Item 1</Typography>
            <Typography sx={mainStyle}>Nav Item 2</Typography>
            <Typography sx={mainStyle}>Nav Item 3</Typography>
            <Typography sx={mainStyle}>Nav Item 4</Typography>
          </Stack>
        </Item>
      </Grid>
      <Grid xs>
        <Item>
          <Typography sx={mainStyle}>Main content</Typography>
        </Item>
      </Grid>
      <Grid xs={12}>
        <Item sx={headerFooterStyle}>
          <Typography sx={mainStyle}>Footer</Typography>
        </Item>
      </Grid>
    </Grid>
  );
}
```

Burada tanış bir layout qurulub: header, yan naviqasiya, əsas məzmun, footer. `xs` xüsusiyyətinin üç fərqli dəyəri var:

* `xs={12}` — MUI-nin grid sistemi 12 sütuna bölünür, `12` dəyəri "bütün eni tut" deməkdir. Header və footer buna görə həmişə tam enə yayılır.
* `xs="auto"` — sütun eni məzmununun özünə görə təyin olunur. Naviqasiya bloku `Stack` komponenti ilə elementləri şaquli düzür, eni isə mətnin uzunluğuna görə formalaşır.
* `xs` (dəyərsiz, `true`) — naviqasiyadan sonra qalan **bütün boş sahəni** doldurur. Ona görə əsas məzmun bloku ekranın qalan hissəsini tutur.

> Konteyneri düşün fizionomik olaraq — 12 dilimlik pizza kimi. `xs={12}` bütün pizzanı istəyir, `xs="auto"` yalnız özünə lazım olan dilimi götürür, `xs` isə qalan dilimlərin hamısını yığır.

---

## Naviqasiya komponentləri

### Drawer — sürüşən yan panel

`Drawer` fiziki siyirmə kimi işləyir: klikləndikdə açılır, məzmunu göstərir, sonra yenidən bağlanır. Bu, ekranda yer qənaət edən klassik naviqasiya modelidir — panel yalnız lazım olanda görünür.

```jsx
<BrowserRouter>
  <Button onClick={toggleDrawer}>Open Nav</Button>
  <section>
    <Routes>
      <Route path="/first" element={<First />} />
      <Route path="/second" element={<Second />} />
      <Route path="/third" element={<Third />} />
    </Routes>
  </section>
  <Drawer open={open} onClose={toggleDrawer}>
    <div
      style={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List component="nav">
        {links.map((link) => (
          <NavLink
            key={link.url}
            to={link.url}
            style={{ color: "black", textDecoration: "none" }}
          >
            {({ isActive }) => (
              <ListItemButton selected={isActive}>
                <ListItemText primary={link.name} />
              </ListItemButton>
            )}
          </NavLink>
        ))}
      </List>
    </div>
  </Drawer>
</BrowserRouter>
```

Hər şey `BrowserRouter` daxilindədir, çünki drawer-dəki linklər əslində route-lara işarə edir. `First`, `Second`, `Third` — link klikləndikdə göstərilən əsas məzmun komponentləridir. Açılıb-bağlanma isə sadə bir state ilə idarə olunur:

```jsx
const [open, setOpen] = useState(false);

const toggleDrawer = ({ type, key }) => {
  if (type === "keydown" && (key === "Tab" || key === "Shift")) {
    return;
  }
  setOpen(!open);
};
```

`open` state-i drawer-in görünüb-görünməməsini idarə edir. Drawer-in `onClose` xüsusiyyəti də eyni funksiyanı çağırır — yəni içindəki hər hansı linkə klikləndikdə drawer avtomatik bağlanır.

Linklərin özü sadə siyahı elementi kimi render olunur:

```jsx
const links = [
  { url: "/first", name: "First Page" },
  { url: "/second", name: "Second Page" },
  { url: "/third", name: "Third Page" },
];
```

Hər link `NavLink` vasitəsilə göstərilir — bu komponent həm naviqasiyanı idarə edir, həm də aktiv route-u avtomatik fərqləndirir (`isActive` dəyəri ilə). "First Page" linkinə klikləndikdə drawer bağlanır, `/first` route-unun məzmunu göstərilir, drawer yenidən açılanda isə "First Page" indi aktiv link kimi işarələnmiş görünür.

### Tabs — həmişə görünən naviqasiya

`Drawer`-dən fərqli olaraq, `Tabs` komponenti həmişə ekranda qalır. MUI-nin `Tabs` və `Tab` komponentləri özləri heç bir məzmun göstərmir — sadəcə hansı tab-ın seçildiyini bildirirlər, məzmunu göstərmək tamamilə bizim işimizdir.

```jsx
function RouteLayout() {
  const routeMatch = useRouteMatch(["/", "/page1", "/page2", "/page3"]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Box>
      <Tabs value={currentTab}>
        <Tab label="Item One" component={Link} to="/page1" value="/page1" />
        <Tab label="Item Two" component={Link} to="/page2" value="/page2" />
        <Tab label="Item Three" component={Link} to="/page3" value="/page3" />
      </Tabs>
      <Outlet />
    </Box>
  );
}
```

Hər `Tab` daxildə `Link` komponentindən istifadə edir, yəni klikləndikdə router `to` xüsusiyyətindəki route-u aktivləşdirir. `Outlet` isə aktiv route-un məzmununu göstərən yer tutandır. Aktiv tab-ı təyin etmək üçün cari URL-i patternlərlə müqayisə edən köməkçi funksiya işlədilir:

```jsx
function useRouteMatch(patterns) {
  const { pathname } = useLocation();
  for (let i = 0; i < patterns.length; i += 1) {
    const possibleMatch = matchPath(patterns[i], pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }
  return null;
}
```

"ITEM TWO" tab-ına klikləndikdə URL dəyişir, aktiv tab yenilənir və `Outlet` yeni məzmunu göstərir — hamısı səhifə yenidən yüklənmədən.

---

## İstifadəçi girişini toplamaq

### Checkbox və Radio — bəli/xeyr, yoxsa bir neçə seçimdən biri?

`Checkbox` iki vəziyyət (doğru/yanlış) üçün, `RadioGroup` isə bir neçə seçimdən **birini** seçmək üçün uyğundur.

```jsx
export default function Checkboxes() {
  const [checkbox, setCheckbox] = React.useState(false);
  const [radio, setRadio] = React.useState("First");

  return (
    <div>
      <FormControlLabel
        label={`Checkbox ${checkbox ? "(checked)" : ""}`}
        control={
          <Checkbox
            checked={checkbox}
            onChange={() => setCheckbox(!checkbox)}
          />
        }
      />
      <FormControl component="fieldset">
        <FormLabel component="legend">{radio}</FormLabel>
        <RadioGroup value={radio} onChange={(e) => setRadio(e.target.value)}>
          <FormControlLabel value="First" label="First" control={<Radio />} />
          <FormControlLabel value="Second" label="Second" control={<Radio />} />
          <FormControlLabel value="Third" label="Third" control={<Radio />} />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
```

`checkbox` state-i `Checkbox`-un `checked` xüsusiyyətini idarə edir, `radio` state-i isə `RadioGroup`-un `value`-sunu. Hər ikisinin `onChange` işləyicisi öz state setter funksiyasını çağırır. `FormControlLabel` checkbox-un yanında etiket göstərir, radio qrupu isə `FormControl` və `FormLabel` ilə əhatələnir. Hər iki etiket cari state-ə uyğun canlı yenilənir.

### TextField və Select — mətn girişi, yoxsa siyahıdan seçim?

`Select` çoxsaylı seçimlər arasından birini götürmək üçün radio-dan daha yer qənaətlidir, çünki seçimlər yalnız menyu açılanda görünür.

```jsx
export default function MySelect() {
  const [value, setValue] = useState();

  return (
    <FormControl>
      <InputLabel id="select-label">My Select</InputLabel>
      <Select
        labelId="select-label"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputProps={{ id: "my-select" }}
      >
        <MenuItem value="first">First</MenuItem>
        <MenuItem value="second">Second</MenuItem>
        <MenuItem value="third">Third</MenuItem>
      </Select>
    </FormControl>
  );
}
```

`value` state-i seçilmiş dəyəri saxlayır, `MenuItem`-lər isə mümkün seçimləri təyin edir. `TextField` bundan daha sadədir — heç bir köməkçi komponentə ehtiyac duymur, hər şey birbaşa property vasitəsilə verilir:

```jsx
export default function MyTextInput() {
  const [value, setValue] = useState("");

  return (
    <TextField
      label="Name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      margin="normal"
    />
  );
}
```

### Button — HTML düyməsi, amma tema ilə inteqrasiya olunmuş

MUI düymələri adi HTML `<button>`-ə bənzəyir, fərq ondadır ki, tema və layout sistemi ilə birbaşa işləyir.

```jsx
export default function App() {
  const [color, setColor] = useState("secondary");
  const updateColor = () => {
    setColor(color === "secondary" ? "primary" : "secondary");
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" color={color} onClick={updateColor}>
        Contained
      </Button>
      <Button color={color} onClick={updateColor}>
        Text
      </Button>
      <Button variant="outlined" color={color} onClick={updateColor}>
        Outlined
      </Button>
      <IconButton color={color} onClick={updateColor}>
        <AndroidIcon />
      </IconButton>
    </Stack>
  );
}
```

Dörd fərqli düymə üslubu (`contained`, mətn, `outlined`, ikon) bir cərgədə göstərilir. İstənilən birinə klikləndikdə `color` state-i dəyişir və **bütün** düymələr eyni anda rəngini `primary`/`secondary` arasında dəyişir.

---

## Stil və tema sistemi

### `styled()` — komponentə xüsusi görünüş vermək

MUI-nin `styled()` funksiyası adi JavaScript obyektindən yeni, stilləndirilmiş komponent yaradır.

```jsx
const StyledButton = styled(Button)(({ theme }) => ({
  "&.MuiButton-root": { margin: theme.spacing(1) },
  "&.MuiButton-contained": { borderRadius: 50 },
  "&.MuiButton-sizeSmall": { fontWeight: theme.typography.fontWeightLight },
}));

export default function App() {
  return (
    <>
      <StyledButton>First</StyledButton>
      <StyledButton variant="contained">Second</StyledButton>
      <StyledButton size="small" variant="outlined">
        Third
      </StyledButton>
    </>
  );
}
```

`MuiButton-root`, `MuiButton-contained`, `MuiButton-sizeSmall` — bunlar özümüzün uydurduğu adlar deyil, MUI-nin `Button` komponentinin CSS API-sinin bir hissəsidir. `root` bütün düymələrə tətbiq olunur, `contained` yalnız `contained` variantına, `sizeSmall` isə kiçik ölçülü düymələrə.

### Tema — bütün tətbiqi bir yerdən idarə etmək

Tək komponentin görünüşünü dəyişmək bir şeydir, bütün tətbiqin görünüşünü idarə etmək başqa. MUI-nin standart teması var, onu iki addımla genişləndirmək olar: `createTheme()` ilə yeni tema obyekti yaratmaq, `ThemeProvider` ilə tətbiqi əhatələmək.

```jsx
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontSize: 11,
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          marginLeft: 15,
          marginRight: 15,
        },
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Menu anchorEl={document.body} open={true}>
        <MenuItem>First Item</MenuItem>
        <MenuItem>Second Item</MenuItem>
        <MenuItem>Third Item</MenuItem>
      </Menu>
    </ThemeProvider>
  );
}
```

Bu tema iki iş görür: bütün komponentlərin default şrift ölçüsünü 11-ə salır, və `components` bölməsi vasitəsilə hər `MenuItem`-in sol/sağ marjinini dəyişir. `components` bölməsi məhz bunun üçündür — bir komponentin **hər instansını** tətbiq boyu eyni cür stilləndirmək.

> Fərq bunda: `styled()` — tək bir komponentə xüsusi don geyindirir. Tema isə bütün geyim şkafının standartını təyin edir.

---

## Nəticə

Material UI dörd əsas problemi həll edir: layout (`Container`, `Grid`), naviqasiya (`Drawer`, `Tabs`), istifadəçi girişi (`Checkbox`, `Radio`, `Select`, `TextField`, `Button`) və vizual tutarlılıq (`styled()`, tema sistemi).

Sıfırdan komponent yazmaqla hazır kitabxana işlətmək arasındakı fərq budur: birincisi hər layihədə eyni təkərləri yenidən icad etməkdir, ikincisi isə React ekosisteminin artıq həll etdiyi problemlərə vaxt sərf etməmək və enerjini məhsulun özünə yönəltməkdir.

---

# Yüksək Performanslı State Yeniləmələri

**State** React tətbiqinin dinamik hissəsidir. State dəyişəndə komponentlər buna reaksiya verir. State olmasaydı, React sadəcə bəzəkli bir HTML şablon dili olardı.

Adətən bir state yeniləməsinin ekranda görünməsi o qədər sürətli baş verir ki, istifadəçi heç fərq etmir. Amma bəzən mürəkkəb state dəyişiklikləri nəzərəçarpan gecikmə yaradır. Bu bölmənin məqsədi məhz belə halları aydınlaşdırmaq və gecikmənin qarşısını necə almağı öyrənməkdir:

- State dəyişikliklərini bir yerə **batch** edərək minimal re-render əldə etmək
- İstifadəçi üçün vacib olan məzmunu əvvəlcə göstərmək üçün state yeniləmələrinə **prioritet** vermək
- Batching və prioritetləşdirmə ilə yanaşı **asinxron** əməliyyatları idarə etmək

---

## Batching nədir və niyə lazımdır?

Komponentdə state dəyişəndə React həmin dəyişikliyə uyğun DOM hissəsini yenidən render edir. Məsələn, `<span>` içində göstərilən `name` state-i `Adam`-dan `Ashley`-ə dəyişəndə, bu göz qırpımında baş verən sadə bir yeniləmədir.

Problem odur ki, real tətbiqlərdə state dəyişiklikləri belə sadə olmur. 10 millisaniyə ərzində `name` state-i belə bir ardıcıllıqla dəyişə bilər:

```
Adam → Ashley → Andrew → Ashley → Aaron → Adam
```

Altı dəyişiklik var, amma sonda yenə `Adam`-a qayıdırıq. Yəni React əgər hər dəyişiklikdə ayrıca render etsəydi, 5 render tamamilə boşa gedərdi. Animasiyalar, drag-and-drop, `setTimeout`/`setInterval` kimi tez-tez state dəyişən ssenarilərdə bu boşa gedən render-lər performansı ciddi zədələyir.

Bunun həlli **batching**-dir: React eyni anda edilən bir neçə state dəyişikliyini tək bir yeniləmə kimi qəbul edir. Hər dəyişiklikdə ayrıca DOM render etmək əvəzinə, hamısı birləşdirilir və nəticədə cəmi bir DOM re-render baş verir.

---

## React 17 vs React 18

**React 17**-də avtomatik batching yalnız **event handler**-lərin daxilində işləyirdi. Məsələn, `onClick` içində 5 state dəyişikliyi olsa, React bunları birləşdirib bir render edirdi.

Problem asinxron çağırışlarda çıxır. Adətən data fetch edib sonra `then()` və ya `setTimeout` callback-i içində state dəyişdiririk — bu artıq event handler-in "içində" sayılmır. React 17 belə halları batch etmirdi.

Bunu göstərmək üçün düymə basılanda 100 state dəyişikliyi edən komponentə baxaq:

```jsx
import * as React from "react";

export default function BatchingUpdates() {
  let [value, setValue] = React.useState("loading...");

  function onStart() {
    setTimeout(() => {
      for (let i = 0; i < 100; i++) {
        setValue(`value ${i + 1}`);
      }
    }, 1);
  }

  return (
    <div>
      <p>
        Value: <em>{value}</em>
      </p>
      <button onClick={onStart}>Start</button>
    </div>
  );
}
```

Burada `setTimeout` içində 100 dəfə `setValue()` çağırılır. Yalnız sonuncu çağırışın nəticəsi əhəmiyyətlidiksə də, **React 17**-də bu, `setTimeout` callback-i olduğu üçün batch olunmur — React profiler-də 100 ayrı render görünür.

**React 18**-də isə vəziyyət fərqlidir: avtomatik batching artıq hər yerdə işləyir, `setTimeout`, `Promise.then()`, hətta native event handler-lər daxil. Eyni komponenti React 18 ilə işlədəndə profiler-də bir dənə render görünür — komponent kodunda heç bir dəyişiklik etmədən.

Bunun üçün tək şərt var: kök komponenti köhnə `ReactDOM.render()` əvəzinə yeni API ilə render etmək lazımdır.

Köhnə üsul:

```jsx
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

Yeni üsul:

```jsx
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

`createRoot()` ilə render edildikdə React 18 tətbiq boyu bütün state yeniləmələrini avtomatik batch edir. Artıq ayrıca optimallaşdırma barədə düşünməyə ehtiyac yoxdur.

---

## State yeniləmələrinə prioritet vermək

Batching hər state dəyişikliyini eyni səviyyədə görür. Amma bəzən bir state yeniləməsi digərindən daha vacibdir.

Məsələn, böyük bir siyahı render olunarkən brauzer bir anlıq tamamilə məşğul olur və istifadəçi səhifə ilə qarşılıqlı əlaqədə ola bilmir. Bu adətən problem deyil — lakin istifadəçi elə həmin anda bir input-a yazırsa, gözlədiyi hərfin dərhal ekranda görünməsidir. Əgər komponent böyük siyahı render etməklə məşğuldursa, input-un state-i dərhal yenilənə bilmir.

Bunun üçün React `startTransition()` adlı yeni bir **prioritetləşdirmə API**-si təqdim edir. `startTransition()` funksiyasına ötürülən state dəyişiklikləri **aşağı prioritetli keçid (transition)** kimi işarələnir — yəni daha vacib yeniləmələr varsa, bunlar gözləyə bilər.

`startTransition()`-i işlətmək üçün ümumi qayda:

- Çox render işi tələb edən istənilən əməliyyat üçün
- İstifadəçi qarşılıqlı əlaqəsinə dərhal cavab tələb etməyən istənilən əməliyyat üçün

25,000 elementlik siyahını filtr edən nümunəyə baxaq. Əvvəlcə data və state:

```jsx
let unfilteredItems = new Array(25000)
  .fill(null)
  .map((_, i) => ({ id: i, name: `Item ${i}` }));
```

```jsx
let [filter, setFilter] = React.useState("");
let [items, setItems] = React.useState([]);
```

`filter` — input-un dəyəri, `items` isə filtrlənmiş nəticələr. Render edilən JSX sadədir: bir `<input>` və filtrlənmiş elementləri göstərən `<ul>`.

```jsx
<div>
  <div>
    <input
      type="text"
      placeholder="Filter"
      value={filter}
      onChange={onChange}
    />
  </div>
  <div>
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  </div>
</div>
```

Filtr `onChange` handler-i belə görünür:

```jsx
const onChange = (e) => {
  setFilter(e.target.value);
  setItems(
    e.target.value === ""
      ? []
      : unfilteredItems.filter((item) => item.name.includes(e.target.value))
  );
};
```

Bu kodda problem var: `setFilter()` və `setItems()` batch olunub tək bir yeniləmə kimi işlənir. Yəni input-un dəyəri ekranda görünməzdən əvvəl minlərlə elementin render olunmasını gözləməli oluruq. Nəticədə yazarkən input "gecikir".

Həll — `setItems()` çağırışını `startTransition()` içinə köçürmək:

```jsx
const onChange = (e) => {
  setFilter(e.target.value);
  React.startTransition(() => {
    setItems(
      e.target.value === ""
        ? []
        : unfilteredItems.filter((item) => item.name.includes(e.target.value))
    );
  });
};
```

`setFilter()` kodu olduğu kimi qalır — dəyişən yalnız `setItems()`-in yeri. React-a deyirik: bu state dəyişikliyini digər (daha vacib) dəyişikliklər bitdikdən sonra icra et. Nəticədə input dərhal reaksiya verir, siyahı isə arxa planda, bir az gecikmə ilə yenilənir.

> `startTransition()`-dan əvvəl proqramçılar bunu `setTimeout()` ilə "əl ilə" simulyasiya etməyə çalışırdı. Fərq budur: React-ın öz **scheduler**-i bu dəyişikliklərin prioritetindən xəbərdardır — məsələn, keçid bitmədən yeni state gəlsə və ya komponent unmount olsa, React onu ləğv edə bilir. `setTimeout` bunu edə bilməz.

---

## Asinxron state yeniləmələri və `isPending` tələsi

Real tətbiqlərdə iş təkcə prioritetləşdirmə deyil — həm də data-nı **asinxron** gətirib prioritetlə uzlaşdırmaqdır.

`startTransition()`-i Hook kimi də işlətmək olar: `useTransition()`. Bu, keçidin hələ davam edib-etmədiyini göstərən bir **boolean** (`isPending`) qaytarır — istifadəçiyə "yüklənir" göstərmək üçün faydalıdır.

Əvvəlki nümunəni asinxron fetch funksiyası ilə genişləndirək:

```jsx
function filterItems(filter) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(unfilteredItems.filter((item) => item.name.includes(filter)));
    }, 1000);
  });
}
```

```jsx
export default function AsyncUpdates() {
  const [isPending, startTransition] = React.useTransition();
  const [isLoading, setIsLoading] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const [items, setItems] = React.useState([]);

  const onChange = (e) => {
    setFilter(e.target.value);
    startTransition(() => {
      if (e.target.value === "") {
        setItems([]);
      } else {
        filterItems(e.target.value).then((result) => {
          setItems(result);
        });
      }
    });
  };

  return (...);
}
```

`isPending`-i "yüklənir" mesajı üçün işlətmək məntiqli görünür:

```jsx
<div>
  {isPending && <em>loading...</em>}
  <ul>
    {items.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
</div>
```

Amma burada gizli bir problem var. Yazarkən "loading..." mesajı bir anlıq görünüb yox olur, sonra isə (data hələ gəlməmiş olsa belə) heç bir işarə olmadan gözləmə davam edir.

Səbəb: `isPending` yalnız `startTransition()`-a ötürülən funksiya **işə düşənə qədər** `true`-dur. Fetch davam edərkən və ya `setItems()` böyük siyahını render edərkən `isPending` artıq `false`-dur — çünki bu proseslər `startTransition` funksiyasının "içində", amma onun başlaması ilə bitməsi arasında deyil, sadəcə planlaşdırılmış state dəyişiklikləri kimi izlənilir.

> Daha dəqiq desək: `isPending` "yüksək prioritetli yeniləmələr hələ işləyir" mənasını verir, "mənim asinxron işim davam edir" demək deyil. Bunu `highPriorityUpdatesPending` adlandırsaq, çaşqınlıq azalar.

Düzgün həll — ayrıca `isLoading` state-i saxlamaq:

```jsx
const [isLoading, setIsLoading] = React.useState(false);
const [filter, setFilter] = React.useState("");
const [items, setItems] = React.useState([]);
```

`onChange` handler-i fetch başlayanda `isLoading`-i `true` edir, nəticə gələndə isə `false`-a qaytarır:

```jsx
const onChange = (e) => {
  setFilter(e.target.value);
  setIsLoading(true);
  React.startTransition(() => {
    if (e.target.value === "") {
      setItems([]);
      setIsLoading(false);
    } else {
      filterItems(e.target.value).then((result) => {
        setItems(result);
        setIsLoading(false);
      });
    }
  });
};
```

Göstərici artıq `isPending` yox, `isLoading` əsasında işləyir:

```jsx
<div>
  {isLoading && <em>loading...</em>}
  <ul>
    {items.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
</div>
```

İndi `setIsLoading()` və `setFilter()` yüksək prioritetli olduğu üçün dərhal icra olunur, `filterItems()` fetch-i isə yalnız bunlardan sonra başlayır. Data gələnə qədər "loading" görünür, gələndən sonra isə dərhal itir — davranış artıq proqnozlaşdırıla bilər.

---

## Nəticə

Bu bölmənin əsas mesajı:

- **React 18** avtomatik batching-i bütün kontekstlərə (o cümlədən `setTimeout`, `Promise`, asinxron callback-lər) yayır — tək şərt kök komponentin `createRoot()` ilə render olunmasıdır.
- **`startTransition()`** çox render işi tələb edən və istifadəçidən dərhal reaksiya tələb etməyən state dəyişikliklərini aşağı prioritetli elan edir; React onları lazım gələrsə ləğv edə və ya təxirə sala bilir.
- **`isPending`** yalnız yüksək prioritetli yeniləmələrin bitib-bitmədiyini göstərir, asinxron fetch-in və ya böyük render-in tam bitdiyini deyil — bunun üçün ayrıca `isLoading` state-i saxlamaq lazımdır.

Qısacası: batching lazımsız render-ləri aradan qaldırır, `startTransition` isə qalan render işini vacibliyinə görə sıralayır. İkisi birlikdə React-ın mürəkkəb state dəyişikliklərini istifadəçiyə hiss etdirmədən idarə etməsinə imkan verir.

# Serverdən Data Çəkmək: XHR-dan GraphQL-ə Qədər Yol

Bir vaxtlar veb səhifə ilə tətbiq arasında sərhəd çox aydın idi — səhifə statik idi, server nə göndərirdisə, brauzer elə də göstərirdi. Bu gün həmin sərhəd demək olar itib. Səbəb sadədir: brauzerdəki JavaScript serverə sorğu göndərə, cavabı emal edə və nəticəni səhifəni yenidən yükləmədən ekranda göstərə bilir. Məhz bu bacarıq bugünkü interaktiv, "canlı" veb tətbiqlərin təməlini qurub.

Bu yazıda serverdən data çəkməyin tarixi təkamülünü və müasir vasitələrini araşdıracağıq:

* Uzaq (remote) data ilə iş necə inkişaf edib
* Fetch API
* Axios
* TanStack Query (React Query)
* GraphQL

---

## Uzaq Data: Qısa Tarixçə

90-cı illərin əvvəlində, HTTP 1.0 dövründə, veb səhifələr statik idi. Hər klik yeni bir bağlantı açır, server bütöv səhifəni və ya statik faylı (şəkil, HTML) qaytarırdı. İnteraktivlik demək olar yox idi — ən çoxu HTML formaları.

2000-ci illərin əvvəlində vəziyyət dəyişdi: **AJAX** (Asynchronous JavaScript and XML) meydana çıxdı. AJAX-ın gücü ondaydı ki, brauzer səhifəni tam yükləmədən, fonda serverlə danışa bilirdi. Bunun arxasında `XMLHttpRequest` (qısaca **XHR**) obyekti dururdu:

```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.error('Error fetching data');
    }
  }
};
xhr.open('GET', 'http://example.com', true);
xhr.send();
```

Burda `onreadystatechange` — sorğunun vəziyyəti dəyişdikcə (açıldı, göndərildi, cavab gəldi və s.) işə düşən callback. `readyState === DONE` yoxlaması sorğunun tam bitdiyini, `status === 200` isə uğurlu olduğunu bildirir. Diqqət et: burda **callback** üzərində qurulmuş məntiq var — sorğu nəticəsi `then`/`await` yox, funksiya çağırışı ilə idarə olunur. Bu, dövrün xüsusiyyəti idi — asinxron kod hələ promise tanımırdı.

HTTP sonra 1.1-ə keçdi: bağlantılar davamlı (persistent) oldu, RESTful API-lər standartlaşdı — resurslar müəyyən URL-lərlə təmsil olunur, standart HTTP metodları (`GET`, `POST`, `PUT`, `DELETE`) işlədilirdi. Bu, həm miqyaslanmanı, həm developer məhsuldarlığını artırdı.

Sonra **Fetch API** gəldi — promise əsaslı, daha müasir və çevik:

```js
fetch('http://example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

Callback-lərin iç-içə yığılması (callback hell) əvəzinə, artıq zəncirvari `.then()` çağırışları var. Bu, kodu oxumağı və xətaları izləməyi xeyli asanlaşdırdı.

> Fetch API-nin gəlişi ilə asinxron kodun mental modeli dəyişdi: callback yerinə promise, sonra isə `async/await`.

Fetch və XHR-in üzərində icma tərəfindən qurulmuş alətlər də meydana çıxdı — Axios, GraphQL, React Query. Onların hər biri fərqli problemi həll edir: Axios təkrarlanan kodu azaldır, GraphQL həddindən artıq/az data çəkmə problemini aradan qaldırır, React Query isə keşləmə və vəziyyət idarəetməsini öz üzərinə götürür.

WebSocket-lər isə tam başqa istiqamətdə inkişaf etdi — real-vaxt, ikitərəfli əlaqə üçün:

```js
const socket = new WebSocket('ws://example.com');

socket.onopen = function(event) {
  console.log('Connection established');
};
socket.onmessage = function(event) {
  console.log('Message from server:', event.data);
};
socket.onerror = function(error) {
  console.error('WebSocket Error:', error);
};
```

Burda hələ də callback modeli işlədilir — çünki ikitərəfli, davamlı əlaqənin mental modeli "bir sorğu, bir cavab" modelindən fərqlidir: server istənilən vaxt, istənilən sayda mesaj göndərə bilər, bunun üçün tək promise kifayət deyil. Chat tətbiqləri, trading platformaları kimi canlı-yeniləmə tələb edən sistemlər üçün WebSocket vacib alətdir.

---

## Fetch API ilə Praktik Nümunə

İndi real bir misal quraq: GitHub-dan istifadəçi datası çəkib ekranda göstərmək. Layihəni Vite + React ilə başladırıq:

```bash
npm create vite@latest
```

TypeScript işlədəcəyimiz üçün, əvvəlcə serverin bizə hansı formatda data qaytaracağını təsvir edən `GitHubUser` interfeysini yazırıq. Bunun üçün adətən backend developer-lərin təqdim etdiyi API sənədləşməsinə baxılır — burda GitHub-un öz REST API sənədləşməsi mənbədir:

```ts
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  gists_url: string;
  repos_url: string;
  name: string;
  company: string | null;
  location: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
}
```

Bunlar bizə lazım olan sahələrdir — real cavabda daha çox sahə var, sadəcə istifadə edəcəklərimizi seçdik.

İstifadəçi datasını göstərən komponent:

```jsx
const UserInfo = ({ user }: GitHubUserProps) => {
  return (
    <div>
      <img src={user.avatar_url} alt={user.login} width="100" height="100" />
      <h2>{user.name || user.login}</h2>
      <p>{user.bio}</p>
      <p>Location: {user.location || "Not specified"}</p>
      <p>Company: {user.company || "Not specified"}</p>
      <p>Followers: {user.followers}</p>
      <p>Following: {user.following}</p>
      <p>Public Repos: {user.public_repos}</p>
      <p>Public Gists: {user.public_gists}</p>
      <p>
        GitHub Profile:{" "}
        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
          {user.login}
        </a>
      </p>
    </div>
  );
};
```

İndi əsl sorğunu göndərən `App` komponentinə keçək:

```jsx
function App() {
  const [user, setUser] = useState<GitHubUser>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.github.com/users/sakhnyuk")
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && !user && <p>No user found.</p>}
      {user && <UserInfo user={user} />}
    </div>
  );
}
```

Burda `useState` ilə iki vəziyyət saxlanılır: özü data (`user`) və yüklənmə statusu (`loading`). `useEffect` daxilində Fetch sorğusu göndərilir, cavab `.json()` ilə parse olunur, `.then()`-də state-ə yazılır, xəta olarsa `.catch()` onu tutur, `.finally()` isə hər halda (uğurlu və uğursuz) `loading`-i söndürür. Bu üç metodun birgə işləməsi — data çəkmənin klassik "yüklənir → uğurlu/xəta" axınıdır.

```bash
npm run dev
```

Terminaldakı linki açanda, ekranda istifadəçinin avatarı və məlumatları görünəcək.

---

## Axios: Fetch-in Güclənmiş Versiyası

Axios — HTTP client kitabxanası, Fetch-ə çox oxşayır, amma üstəlik bir neçə güclü xüsusiyyət təqdim edir. Quraşdırma:

```bash
npm install axios
```

Axios-un ən dəyərli xüsusiyyətlərindən biri — **instance** yaratmaq imkanıdır: bazovıy URL, header-lər, interceptor-lar kimi konfiqurasiyaları bir dəfə təyin edib, hər sorğuda təkrarlamamaq. Bunu bir `API` sinfinə yığaq:

```ts
class API {
  private apiInstance: AxiosInstance;

  constructor() {
    this.apiInstance = axios.create({
      baseURL: "https://api.github.com",
    });

    this.apiInstance.interceptors.request.use((config) => {
      console.log("Request:", `${config.method?.toUpperCase()} ${config.url}`);
      return config;
    });

    this.apiInstance.interceptors.response.use(
      (response) => {
        console.log("Response:", response.data);
        return response;
      },
      (error) => {
        console.log("Error:", error);
        return Promise.reject(error);
      }
    );
  }

  getProfile(username: string) {
    return this.apiInstance.get<GitHubUser>(`/users/${username}`);
  }
}

export default new API();
```

Konstruktorda `baseURL` bir dəfə təyin olunur — bundan sonra hər sorğuda domeni yazmağa ehtiyac yoxdur. `interceptors.request` — hər sorğu göndərilməzdən **əvvəl** işə düşür, `interceptors.response` isə cavab gələndən **sonra**. Burda sadəcə console-a log yazırıq, amma real layihədə buradan, məsələn, "access token vaxtı bitibsə, yenisini al və sorğuya əlavə et" məntiqi qurulur. Beləcə token yeniləmə kimi təkrarlanan iş bütün sorğulara bir yerdən tətbiq olunur, hər çağırış yerinə ayrıca yazılmır.

`App` komponenti indi belə sadələşir:

```jsx
function App() {
  const [user, setUser] = useState<GitHubUser>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .getProfile("sakhnyuk")
      .then((res) => setUser(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && !user && <p>No user found.</p>}
      {user && <UserInfo user={user} />}
    </div>
  );
}
```

Görəsən nə fərqi var? Səthdə demək olar yoxdur — amma interceptor-lar, mərkəzləşmiş xəta idarəetməsi kimi imkanlar böyüdükcə layihədə çox vaxt qazandırır.

---

## TanStack Query (React Query): Data Çəkməni Bir Hook-a Sığdırmaq

TanStack Query (əvvəlki adı React Query) — data çəkmə və keşləməni birgə həll edən kitabxana. Onun ən güclü tərəfi: eyni `useQuery` hook-u istənilən qədər komponentdə çağırsan da, server-ə **tək bir** sorğu gedir — qalanları keşdən gəlir. Üstəlik yüklənmə və xəta vəziyyətləri artıq özün idarə etmirsən, kitabxana bunu daxili saxlayır.

```bash
npm install @tanstack/react-query
```

Əvvəlcə `QueryClientProvider` ilə tətbiqi əhatə edirik:

```jsx
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

TanStack Query-nin maraqlı tərəfi budur: o hansı vasitə ilə data çəkdiyinə əhəmiyyət vermir — sadəcə data qaytaran bir promise funksiyası istəyir. Bu funksiyanı Fetch API ilə yazaq:

```js
const userFetcher = (username) =>
  fetch("https://api.github.com/users/sakhnyuk")
    .then((response) => response.json());
```

`App` komponenti isə belə görünür:

```jsx
function App() {
  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["githubUser"],
    queryFn: () => userFetcher("sakhnyuk"),
  });

  return (
    <div>
      {isPending && <p>Loading...</p>}
      {isError && <p>Error fetching data</p>}
      {user && <UserInfo user={user} />}
    </div>
  );
}
```

`queryKey` — bu sorğunun keşdə saxlanacağı "etiket". `queryFn` — datayı necə çəkəcəyini bildirən funksiya. Nəticədə bütün sorğu + yüklənmə + xəta məntiqi **bir** hook-un içinə yığılıb — nə `useState`, nə `useEffect`, nə `try/catch` yazmağa ehtiyac qalmır.

---

## GraphQL: Yalnız Lazım Olanı Sorğula

REST API-də hər endpoint sabit strukturda data qaytarır — istəsən də, istəməsən də bütün sahələr gəlir. GraphQL isə tərsinə işləyir: müştəri (client) hansı sahələri istədiyini özü təyin edir, server də dəqiq onu qaytarır. Bu, həm şəbəkə yükünü azaldır, həm performansı yaxşılaşdırır.

`graphql-request` ilə sadə nümunə:

```js
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'http://example.com/graphql';
const client = new GraphQLClient(endpoint);

const query = gql`
  query {
    user(id: 123) {
      name
      email
    }
  }
`;

client.request(query)
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

Burda ID-si 123 olan istifadəçidən yalnız `name` və `email` sahələri istənilir — istifadəçi obyektində nə qədər sahə olsa da, server dəqiq bu ikisini qaytarır.

### Apollo Client ilə GraphQL

Daha real layihə üçün `@apollo/client` istifadə edək — bu, GraphQL üçün React Query-nin analoqu kimi işləyir:

```bash
npm install @apollo/client graphql
```

Provider ilə tətbiqi əhatə edirik:

```jsx
const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: "Bearer YOUR_PAT", // GitHub personal access token buraya
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
```

GitHub-un GraphQL API-si autentifikasiya tələb edir, ona görə `Authorization` başlığında GitHub profilindən alınan personal access token göndərilir.

Sorğunu təyin edirik — burda yalnız lazım olan sahələri seçirik:

```js
const GET_GITHUB_USER = gql`
  query GetGithubUser($username: String!) {
    user(login: $username) {
      login
      id
      avatarUrl
      bio
      name
      company
      location
    }
  }
`;
```

`App` komponenti:

```jsx
function App() {
  const { data, loading, error } = useQuery(GET_GITHUB_USER, {
    variables: { username: "sakhnyuk" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  const user = data.user;

  return (
    <div>
      <UserInfo user={user} />
    </div>
  );
}
```

React Query-dəki kimi, burda da `loading`, `error` və `data` bir hook-dan gəlir. Fərq isə arxa planda gedən sorğudadır: brauzerin Network panelini açsan, serverə göndərilən sorğunun **yalnız istənilən sahələri** ehtiva etdiyini görəcəksən — nə artıq, nə əskik.

> REST-də server "nə varsa göndərirəm", GraphQL-də isə client "mənə bunlar lazımdır, elə onları göndər" deyir.

---

## Hansını Nə Vaxt Seçmək Lazımdır?

* **Fetch API** — əlavə asılılıq istəmirsənsə, kiçik layihədəsənsə, kifayət edir.
* **Axios** — interceptor, mərkəzləşmiş konfiqurasiya, fayl yükləmə kimi əlavə imkanlar lazımdırsa.
* **TanStack Query** — keşləmə, arxa fon yeniləməsi, yüklənmə/xəta idarəetməsini əl ilə yazmaq istəmirsənsə.
* **GraphQL + Apollo** — backend GraphQL təqdim edirsə və dəqiq sahə seçimi, az data ötürmə vacibdirsə.
* **WebSocket** — real-vaxt, ikitərəfli əlaqə lazımdırsa (chat, canlı qiymət yeniləməsi).

## Nəticə

Serverdən data çəkmənin tarixi — sadə statik HTML sorğularından tutmuş, dəqiq sahə seçən GraphQL sorğularına qədər davamlı sadələşmə hekayəsidir. Hər yeni alət əvvəlkinin üzərinə qurulub: Fetch callback-ləri promise-ə çevirdi, Axios təkrarlanan konfiqurasiyanı bir yerə yığdı, React Query yüklənmə/xəta idarəetməsini gizlətdi, GraphQL isə "lazım olanı al" prinsipini gətirdi.

Əvvəllər developer hər sorğunun loading, error, cache məntiqini əl ilə yazırdı. İndi bunu bir hook, bir interceptor, bir sorğu töhfə edir. Data çəkmək artıq **necə** sorğu göndərməkdən çox, **nəyi** göndərmək və **necə saxlamaq** məsələsinə çevrilib.










