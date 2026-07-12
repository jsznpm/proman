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

# React-da Qlobal State: Komponentlər Arası Divarları Necə Yıxaq?

Əvvəlki yazılarda **state**-in nə olduğunu və `useState` hook-u ilə necə işlədiyini öyrəndik. State komponentin öz yaddaşıdır — dəyişəndə React UI-ni avtomatik yeniləyir. Amma bu, yalnız **bir komponentin daxilində** işləyir. Bəs tətbiqin fərqli, bir-birindən uzaq komponentləri eyni məlumatı paylaşmalı olanda nə etməli? Bu yazıda məhz bunu — **qlobal state** anlayışını — dərindən araşdıracağıq.

Bu yazıda aşağıdakı mövzular olacaq:

- Qlobal state nədir və niyə lazımdır?
- React Context API və `useReducer`
- Redux
- MobX

## Local state hardan çətinləşir?

`useState` bir komponent daxilində əla işləyir — sadə və effektivdir. Məsələn, iki input-u olan bir form komponenti təsəvvür et: hər input üçün ayrıca state yaradılıb, istifadəçi yazanda `onChange` işə düşür, state dəyişir, komponent yenidən render olunur və nəticə ekranda görünür. Hər şey sadədir.

Amma tətbiq böyüdükcə problem başlayır. Fərz et ki, formu doldurandan sonra serverə sorğu göndərib istifadəçini autentifikasiya etməli, sessiya açarı (session key) almalı, sonra həmin açarla istifadəçinin adı, soyadı və avatarı kimi məlumatlarını çəkməliyik. Sual dərhal ortaya çıxır: **bu məlumatları harada saxlayaq?**

İlk yol ağla gələn — məlumatı formun daxilində alıb, valideyn komponentə "yuxarı ötürmək" (lifting state up). Bunun üçün valideyn komponent (məsələn, login səhifəsi) özündə `session` və `user` üçün state yaradır, formuna isə `onSessionChange` və `onUserChange` kimi funksiyaları prop olaraq ötürür. Form öz daxilində `getSessionKey` və `getUser` funksiyalarını çağırır, server cavab verəndə isə məlumatı özündə saxlamır — valideyndən gələn funksiyaları çağırıb məlumatı yuxarı ötürür.

Bura qədər problemi həll etmiş kimi görünürük. Amma sonra istifadəçini uğurlu giriş nəticəsində tətbiqin ana səhifəsinə yönləndirməli oluruq. Eyni "yuxarı ötürmə" trikini bir də təkrarlaya bilərik, amma qabaqcadan düşünsək — istifadəçi məlumatını əldə etmək məntiqi yəqin ki, təkcə login formunun işi deyil, başqa səhifələrdə də lazım olacaq.

Nəticədə görürük ki, təkcə məlumatı deyil, **məlumatla işləmə məntiqini də** komponent ağacının daha yuxarısında saxlamalıyıq — çox vaxt lap kökdə (`App` komponentində). Bu şəkildə tətbiq getdikcə mürəkkəbləşir, çünki lazım olan bütün data və funksiyalar ən yuxarı komponentdən aşağı, bütün səhifə və komponentlərə ötürülməli olur.

Bu yanaşmanın iki əsas problemi var:

- **Həddindən artıq mürəkkəb komponent ağacı** — bütün vacib məlumat yuxarıdan aşağı props ilə ötürülməli olur. Bu, komponentləri bir-birinə sıx bağlayır (tightly coupled), kodu oxumağı və saxlamağı çətinləşdirir.
- **Performans problemi** — kök komponentdə `useState` ilə yaradılmış state hər dəyişəndə bütün tətbiq yenidən render olunur, çünki kök komponent yenidən çəkilir (re-render).

## Qlobal state nədir?

Yuxarıdakı şəkilə baxanda təbii sual yaranır: bəs komponentlər arasındakı bu sıx əlaqəni qırıb, bütün data və məntiqi komponentlərdən **kənara** çıxarmaq mümkündürmü? Məhz bu, qlobal state anlayışının mahiyyətidir.

> **Qlobal state** — tətbiqin müxtəlif səviyyə və komponentlərindən əlçatan və dəyişdirilə bilən mərkəzləşdirilmiş data idarəetmə yanaşmasıdır. O, local state-in məhdudiyyətlərini aradan qaldırır, komponentlər arasında data mübadiləsini asanlaşdırır və böyük layihələrdə state-in idarə olunmasını yaxşılaşdırır.

Qlobal state modelində data komponent ağacından kənarda, müstəqil yaşayır. Yalnız o məlumata həqiqətən ehtiyacı olan komponentlər ona birbaşa qoşulur (subscribe) və dəyişikliklərdən xəbərdar olur. Bunu belə düşün: props ötürmə üsulu poçt zənciri kimidir — məktubu qonşudan-qonşuya ötürürsən, kimsə arada unudarsa, məlumat çatmır. Qlobal state isə hamının girişi olan lövhə (elan taxtası) kimidir — kimə lazımdırsa, birbaşa ora baxır.

Qlobal state tətbiq olunanda iki problem birdən həll olunur:

- Komponent ağacı və asılılıqlar sadələşir, bu da tətbiqi böyütməyi və saxlamağı asanlaşdırır.
- Performans artır, çünki artıq yalnız qlobal state-ə abunə olan komponentlər dəyişiklikdə yenidən render olunur — bütün ağac yox.

Amma diqqət: **local state öz gücünü itirmir**. Qlobal state yalnız data müxtəlif səviyyələr arasında paylaşılmalı olanda üstünlük verir. Əgər hər dəyişəni qlobal state-ə köçürsək, faydası olmadan tətbiqi sadəcə mürəkkəbləşdirmiş olarıq.

İndi isə sual budur: qlobal state-i necə idarə edək? **State manager** — tətbiqdə mürəkkəb qarşılıqlı əlaqələri və böyük data həcmini idarə etməyə kömək edən vasitədir. O, bütün tətbiqin state-i üçün mərkəzləşdirilmiş anbar yaradır və yenilənmələri qaydalı, proqnozlaşdırıla bilən şəkildə idarə edir. Praktikada state manager-lər çox vaxt npm paketi kimi gəlir, amma React-in öz API-si ilə kitabxanasız da qlobal state qurmaq mümkündür. Gəl əvvəlcə bu yolu araşdıraq.

## React Context API və useReducer

Qlobal state-i özün qurmaq üçün React ekosistemində artıq mövcud olan alətlərdən — **Context API** və **`useReducer`**-dan istifadə edə bilərsən. Bunlar üçüncü tərəf state manager-i həddindən artıq görünəndə əla işləyən güclü ikilikdir və kompakt tətbiqlərdə qlobal state yaratmaq üçün idealdır.

**React Context API** məlumatı komponent ağacı boyu, hər səviyyədə prop ötürmədən ötürməyə imkan verir. Bu, dərin yerləşmiş komponentlərdə data-ya çatmağı asanlaşdırır və **prop drilling**-i (props-u çoxlu səviyyədən keçirməyi) azaldır. Context API xüsusilə mövzu (theme) ayarları, dil seçimi və ya istifadəçi məlumatı kimi data üçün faydalıdır.

Mövzu ayarını context ilə saxlamaq belə görünür:

```jsx
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const theme = 'dark';
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
```

Burada `createContext` funksiyası ilə `ThemeContext` yaradılıb, sonra tətbiqin kök komponentini əhatə edəcək `ThemeProvider` komponenti qurulub. Bu, ağacın istənilən dərinliyindən `useTheme` hook-u ilə (özü də `useContext`-dən qurulub) mövzuya çatmağa imkan verir:

```jsx
const MyComponent = () => {
  const theme = useTheme();
  return (
    <div>
      <p>Hazırkı mövzu: {theme}</p>
    </div>
  );
};
```

Komponent ağacının istənilən səviyyəsindən `useTheme` hook-u ilə hazırkı mövzuya çatmaq mümkündür.

İndi isə ikinin digərinə — qlobal state qurmağa kömək edən xüsusi hook-a — baxaq. **`useReducer`** — mürəkkəb state-i **reducer**-lər vasitəsilə idarə etməyə imkan verən hook-dur. Reducer — hazırkı state-i və bir action alıb yeni state qaytaran funksiyadır. `useReducer` mürəkkəb məntiq və ya çoxlu alt-state tələb edən vəziyyətlər üçün idealdır. Sadə sayğac (counter) nümunəsinə baxaq:

```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Say: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
```

Burada reducer iki action-a malikdir: sayğacı artırmaq və azaltmaq.

Context API ilə `useReducer`-in birləşməsi qlobal state yaratmaq və idarə etmək üçün güclü mexanizmdir. Bu yanaşma kiçik tətbiqlər üçün rahatdır — hazır və daha böyük state manager-lər burada artıq olardı. Amma qeyd etmək lazımdır ki, bu, performans problemini tam həll etmir: `useTheme` nümunəsindəki mövzu ya da sayğac nümunəsindəki dəyər dəyişəndə, provider və onunla bərabər bütün komponent ağacı yenidən render olunur. Bunun qarşısını almaq mümkündür, amma əlavə məntiq və kod tələb edir.

Buna görə mürəkkəb tətbiqlər daha güclü alət tələb edir. Bunun üçün hər biri öz xüsusiyyətləri olan və fərqli hallara uyğun bir neçə hazır həll var.

## Redux

Bu alətlərin birincisi, əlbəttə, **Redux**-dur. Xüsusilə React ilə istifadə ediləndə mürəkkəb JavaScript tətbiqlərində state idarə etmək üçün ən populyar vasitələrdən biridir. Redux tətbiqin state-ini vahid qlobal obyektdə saxlayaraq proqnozlaşdırıla bilən state idarəetməsi təqdim edir, bu da dəyişiklikləri izləməyi və data idarəetməsini sadələşdirir.

Redux üç əsas prinsipə əsaslanır: **vahid həqiqət mənbəyi** (bir qlobal state), **state read-only-dur** (dəyişməzdir, immutable) və **dəyişikliklər pure funksiyalar** (reducer-lər) vasitəsilə edilir. Bu prinsiplər qaydalı və nəzarət olunan data axını təmin edir.

```js
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const store = createStore(counterReducer);
store.subscribe(() => console.log(store.getState()));
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
```

Burada sayğac nümunəsindəki tətbiqin state-i həyata keçirilib. `counterReducer` — hazırkı state-i və üzərində icra ediləcək action-ı qəbul edən adi funksiyadır. Reducer həmişə **yeni** state qaytarır.

Redux dünyasında asinxron əməliyyatlar həyata keçirmək çətin məsələdir, çünki qutudan çıxan zaman yalnız üçüncü tərəf həllərinin istifadə etdiyi middleware təklif edir. Bu həllərdən biri **redux-thunk**-dır.

`redux-thunk` — action obyekti əvəzinə funksiya qaytaran action creator funksiyalarını çağırmağa imkan verən middleware-dir. Bu, action-un dispatch edilməsini gecikdirmək və ya asinxron sorğular vasitəsilə bir neçə action-u dispatch etmək imkanı verir.

```js
function fetchUserData() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_USER_DATA' });
    fetch('/api/user')
      .then((response) => response.json())
      .then((data) => dispatch({ type: 'FETCH_USER_DATA_SUCCESS', payload: data }))
      .catch((error) => dispatch({ type: 'FETCH_USER_DATA_ERROR', error }));
  };
}

const store = createStore(reducer, applyMiddleware(thunk));
store.dispatch(fetchUserData());
```

Göründüyü kimi, `fetchUserData` funksiyası state-i dərhal dəyişmir. Əvəzinə `dispatch` arqumentli başqa funksiya qaytarır. Bu `dispatch`-dan state-i dəyişmək üçün lazım qədər dəfə istifadə etmək olar.

Redux mürəkkəb qlobal state-i idarə etmək üçün əla uyğun gəlir. O, **time travel** kimi güclü debug alətləri təklif edir. Data ilə onun emalı arasındakı aydın ayrılıq sayəsində Redux state və məntiqin test edilməsini də asanlaşdırır.

Redux-u React ilə inteqrasiya etmək üçün **React-Redux** kitabxanası istifadə olunur. O, `Provider` komponentini və Redux store-u tətbiqinə asanlıqla qoşmağa imkan verən `useSelector` və `useDispatch` hook-larını təqdim edir.

```jsx
function Counter() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  return (
    <div>
      <div>Say: {count}</div>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}
```

Yuxarıdakı nümunədə `Counter` komponenti `useSelector` vasitəsilə Redux state-inə abunə olaraq işləyir. Bu abunəlik daha dəqiqdir (granular) — sayğacın dəyişməsi bütün tətbiqin deyil, yalnız bu hook-u çağıran spesifik komponentin yenidən render olunmasına səbəb olur.

Amma Redux-un çatışmazlıqlarını da qeyd etmək vacibdir. Ən populyar həll olsa da, şəxsi seçimimə mənfi təsir edən əhəmiyyətli problemləri var:

- **Redux çox söz tələb edir (verbose).** Böyük qlobal state yaratmaq reducer, action, selector və s. şəklində xeyli boilerplate kod yazmağı tələb edir.
- Layihə böyüdükcə Redux state-inin saxlanması və miqyaslanması mürəkkəbliyi qeyri-mütənasib şəkildə artır.
- State və layihə böyüdükcə tətbiqin performansı əhəmiyyətli dərəcədə azalır — hətta bir dəyəri `false`-dan `true`-ya dəyişmək belə çoxlu hesablama tələb edə bilər.
- Asinxron əməliyyatların icrası Redux-un qutudan çıxan versiyasında dəstəklənmir və əlavə həllər tələb edir, bu da layihəni anlamağı və saxlamağı daha da çətinləşdirir.
- State və biznes məntiqini lazy loading üçün hissələrə bölmək xeyli əmək tələb edir. Nəticədə tətbiqin ölçüsü, deməli ilkin yüklənmə sürəti də təsirlənir.

Bu çatışmazlıqlara baxmayaraq, bir çox şirkət və developer bu həlli hələ də istifadə edir, çünki əksər biznes tapşırıqlarına uyğundur — buna görə bu aləti tanımaq və onunla işləyə bilmək vacibdir.

## MobX

Qlobal state idarəetməsi üçün digər populyar həll **MobX** kitabxanasıdır. Bu kitabxana Redux-dan konsepsiya baxımından xeyli fərqlənir — bəzi cəhətdən hətta əksinədir.

MobX — data ilə reaktiv və çevik qarşılıqlı əlaqə təmin edən state idarəetmə kitabxanasıdır. Əsas ideyası tətbiq state-ini mümkün qədər sadə və şəffaf etməkdir — istənilən qədər yaradıla bilən və bir-birinin içinə yerləşdirilə bilən kiçik obyekt və class-lar vasitəsilə.

Texniki cəhətdən kitabxana təkcə bir qlobal state deyil, tətbiqin müəyyən funksionallığına birbaşa bağlı çoxlu kiçik obyekt yaratmağa imkan verir, bu da böyük tətbiqlərlə işləyəndə əhəmiyyətli üstünlük verir.

MobX-də tətbiqin state-i **observable** metodu ilə idarə olunur — bu, dəyişiklikləri avtomatik izləyir və bağlı **computed** dəyərlər ilə **reaction**-ları xəbərdar edir. Bu, tətbiqin state dəyişikliklərinə avtomatik reaksiya verməsinə imkan verir, data axınını sadələşdirir və çevikliyi artırır.

```js
class Store {
  @observable accessor count = 0;

  @computed get doubleCount() {
    return this.count * 2;
  }

  @action increment() {
    this.count += 1;
  }

  @action decrement() {
    this.count -= 1;
  }
}

const myStore = new Store();
```

Bu nümunədə eyni sayğac MobX ilə həyata keçirilib. Bir class-ın daxilində həm real data, həm hesablanmış (computed) data, həm də state-i dəyişmək üçün action-lar mövcuddur.

Asinxron əməliyyatlar barədə desək, MobX-də heç bir problem yoxdur — adi class daxilində işləyib promise qaytaran yeni metod əlavə etmək kifayətdir:

```js
class Store {
  @observable count = 0;

  @computed get doubleCount() {
    return this.count * 2;
  }

  @action increment() {
    this.count += 1;
  }

  @action decrement() {
    this.count -= 1;
  }

  @action async fetchCountFromServer() {
    const response = await fetch('/count');
    const data = await response.json();
    this.count = data.count;
  }
}

const myStore = new Store();
```

MobX yüksək performans və mürəkkəb data asılılıqlarının sadə idarəsini tələb edən tətbiqlər üçün əla uyğun gəlir. Mürəkkəb state-i idarə etmək üçün zərif və intuitiv yol təklif edir, developer-lərin state idarəetməsi əvəzinə biznes məntiqinə fokuslanmasına imkan verir.

Bu kitabxananın bir çatışmazlığı — state-i təşkil etməkdə verdiyi əhəmiyyətli sərbəstlikdir, bu da təcrübəsiz əllərdə çətinlik və miqyaslanma problemlərinə səbəb ola bilər. Məsələn, MobX obyekt datasına birbaşa müdaxiləyə imkan verir, bu komponent yenilənməsini tetikləyə bilər, amma böyük layihələrdə gözlənilməz state dəyişikliklərinə və debug çətinliklərinə də gətirib çıxara bilər. Eynilə, bu sərbəstlik çox vaxt kiçik, təmiz MobX class-larının bir-birinə sıx bağlanmasına səbəb olur, bu da testləməni və layihənin inkişafını çətinləşdirir.

MobX-i React ilə inteqrasiya etmək üçün **mobx-react** kitabxanası istifadə olunur, bu da `observer` funksiyasını təqdim edir. Bu, React komponentlərinin izlənən (observed) datadakı dəyişikliklərə avtomatik reaksiya verməsinə imkan verir.

```jsx
import React from 'react';
import { observer } from 'mobx-react';
import myStore from './myStore';

const Counter = observer(() => {
  return (
    <div>
      <div>Say: {myStore.count}</div>
      <div>İkiqat: {myStore.doubleCount}</div>
      <button onClick={() => myStore.increment()}>-</button>
      <button onClick={() => myStore.decrement()}>+</button>
    </div>
  );
});
```

Bu nümunədə eyni sayğac MobX ilə həyata keçirilib. Göründüyü kimi, state-ə çatmaq üçün nə hook, nə də onu tətbiqin context-ində saxlamaq üçün provider istifadə olunmur. Sadəcə dəyişəni fayldan import edib istifadə edirik. `Store` class-ından yaradılan `myStore` — state-in özüdür. Obyektin izlənən (observed) dəyərini komponentdə istifadə etmək çox asandır, çünki komponent həmin dəyərin bütün dəyişikliklərinə dərhal abunə olur və hər dəyişəndə yenidən render olunur.

Nümunələrdən görmək olar ki, MobX state idarəetməsi üçün nə qədər sadə və rahatdır. Sadəcə obyekt olduğundan, lazım gəldikdə onu lazy yükləmək və data artıq lazım olmayanda tətbiqin keş və yaddaşını təmizləmək çətin deyil. Bu güclü bir state idarəetmə alətidir və real layihədə sınamağı tövsiyə edirəm.

## Nəticə

Bu yazıda qlobal state-in nə olduğunu və onu necə idarə etməyi öyrəndik. Məhdud local state nümunəsi üzərindən — data tətbiqin müxtəlif səviyyələrindəki komponentlər arasında paylaşılmalı olanda qlobal state-in niyə vacib olduğunu müzakirə etdik.

React Context API və `useReducer` nümunəsini araşdırdıq və nə vaxt bunu, nə vaxt daha güclü state manager həllərinə üstünlük verməyi müəyyənləşdirdik. Sonra bu cür iki həlli — Redux və MobX-i — nəzərdən keçirdik.

Qısaca: local state — bir otağın öz açarı, qlobal state isə bütün binanın giriş kodudur. Kiçik tapşırıq üçün hər otağa ayrıca açar kifayətdir; amma bütün mərtəbələr eyni məlumata çatmalıdırsa, mərkəzi bir sistem qurmaq daha ağıllı seçimdir — sual yalnız bu sistemi hansı alətlə (Context+useReducer, Redux, yoxsa MobX) qurmağındadır.

Növbəti fəsildə server-side rendering-i və onun tətbiqlərimizə gətirdiyi üstünlükləri müzakirə edəcəyik.

# SSR nədir və niyə React yenidən serverə qayıtdı?

React özü brauzerdə işləyən kitabxanadır — amma çıxdığı formatlar təkcə brauzer DOM-u ilə məhdudlaşmır. Bunlardan biri, bəlkə də ən vacibi, adi HTML string-dir: serverdə hazırlanıb brauzerə göndərilən markup. Bu yazıda server-side rendering (SSR) React-də necə işləyir, niyə bu qədər populyarlaşıb və Next.js-də necə tətbiq olunur — bunları araşdıracağıq.

Mövzular:

* SPA-dan SSR-ə qədər yol
* Next.js ilə praktik nümunələr (Pages Router)
* React Server Components və App Router

---

## Veb necə tam dövrə vurdu

Veb texnologiyaları düz xətlə deyil, dairə boyu inkişaf edib. Əvvəl statik səhifələr var idi — server hər şeyi hazırlayıb qaytarırdı, brauzer sadəcə göstərirdi. Sonra biz bu modeldən uzaqlaşıb, rendering-i brauzerə köçürdük — bu, veb səhifələri desktop tətbiqlərə bənzər interaktiv tətbiqlərə çevirdi. Nəticədə tətbiq məntiqinin mərkəzi brauzer oldu, server isə sadəcə data verən nöqtəyə çevrildi.

İndi isə dövrə tamamlanıb: yenidən SSR-ə və server komponentlərinə qayıtmışıq — amma bu dəfə server və client üçün **eyni** kod, eyni məntiq işləyir. Bunun niyə baş verdiyini anlamaq üçün əvvəlcə SPA-nın nə itirdiyinə baxaq.

## SPA: hər şey brauzerdə

Ənənəvi single-page application (SPA) yanaşmasında render tamamilə brauzerin üzərinə düşür. Bütün kod, stil və markup brauzer üçün yazılır; build zamanı statik HTML, CSS və JS faylları çıxır, bunlar brauzerə yüklənir.

Adətən başlanğıc HTML faylı boşdur — içində əsl məzmun yoxdur. Yeganə vacib şey ora bağlanmış JS fayldır, çünki lazım olan hər şeyi elə o render edəcək.

Bu yanaşma interaktivlik gətirdi: səhifəni hər dəfə yeniləmədən content dəyişdirmək, bildiriş göstərmək, yeni mesaj almaq mümkün oldu — bütün tətbiq məntiqi birbaşa brauzerdə olduğu üçün. Vaxt keçdikcə brauzer tətbiqləri demək olar desktop tətbiqləri əvəz etdi: e-poçt yazmaq, sənədlə işləmək, film izləmək — hamısı tək brauzer daxilində. Şirkətlər desktop tətbiq yazmaq əvəzinə veb tətbiq yazmağa üstünlük verdi, çünki brauzer istənilən arxitektura və OS-də işləyir — bu, development xərcini xeyli azaldır.

Paralel olaraq server tərəfi də dəyişdi: page templating, caching kimi işlərdən uzaqlaşdı. Backend developer artıq page layout-la məşğul olmur, daha çox mürəkkəb məntiq və arxitekturaya vaxt ayırır.

Amma SPA-nın da qüsurları var:

* İlkin yüklənmə vaxtı uzundur — script yüklənib emal olunana qədər istifadəçi boş ekran və ya spinner görür.
* Boş başlanğıc HTML SEO üçün yararsızdır — axtarış motoru üçün bu, boş səhifədir.

Onlayn mağaza kimi layihələrdə bu problem kritikdir — istifadəçi və axtarış motoru səhifə content-ini dərhal görməlidir. SPA-lardan əvvəl bunu server tərəfli alətlər həll edirdi, çünki content həmişə əvvəlcədən hazır idi. React-də bu, daha mürəkkəbdir, çünki React brauzer tərəfli kitabxanadır.

## `renderToString`: React-in serverdə işləməsi

Həllin ilk addımı sadədir: React komponent ağacını serverdə HTML-ə çevirmək. Bunun üçün React-in ilk günlərdən bəri `renderToString` funksiyası var — Node.js server mühitində çağırıla bilir. Bu funksiya komponent ağacını HTML string-ə çevirir, həmin string brauzerə göndərilib göstərilir.

```
Brauzer sorğusu → Server: renderToString(<App />) → HTML string → Brauzer render edir
```

Problem budur ki, bu cür HTML-də interaktivlik yoxdur. Düymə, naviqasiya, SPA-da öyrəşdiyimiz hər şey işə düşmür — bunun üçün JavaScript lazımdır. Deməli, SSR-in növbəti addımı təkcə HTML deyil, JavaScript-i də ötürməkdir.

## Isomorfik JavaScript və hydration

Bu problemi **isomorfik JavaScript** yanaşması həll etdi: eyni kod əvvəl serverdə, sonra client-də icra olunur. Server ilkin render-i hazırlayır, hazır HTML-i JS bundle ilə birlikdə client-ə göndərir, brauzer isə sonra interaktivliyi təmin edir.

İstifadəçi səhifəni açanda, JS hələ yüklənməmiş olsa belə, server render nəticəsini dərhal görür. Bu sürətli ilkin cavab UX-i xeyli yaxşılaşdırır. Səhifə və JS bundle yükləndikdən sonra brauzer səhifəni **hydrate** edir — `renderToString` nümunəsindən bildiyimiz kimi, bütün elementlər hələ "cansız"dır, hydration zamanı script lazımi event listener-ləri elementlərə bağlayır. Bu proses sıfırdan tam render-dən daha yüngül və sürətlidir.

> Hydration-u belə düşünün: server sizə mebeli artıq quraşdırılmış otaq göndərir, brauzer isə sadəcə işıqları, açar-düymələri qoşur — hər şeyi yenidən yığmır.

İsomorfik JavaScript-in başqa bir üstünlüyü — səhifədən səhifəyə keçidi sürətli və hamar etməkdir: növbəti səhifənin JS kodunu yükləmək kifayətdir, tətbiq həmin səhifəni lokal render edə bilir.

Beləliklə SSR-in tam mənzərəsi belədir: server səhifəni request zamanı render edib HTML + JS bundle qaytarır, brauzer JS-i yükləyib göstərilən content-i hydrate edir. Bu, server render-in performansı ilə client tətbiqinin interaktivliyini birləşdirir.

## SSG və ISR: SSR-in qüsurlarına cavab

SSR böyük irəliləyiş olsa da universal həll deyil — hər sorğuda səhifəni sıfırdan render etmək lazımdır. Dinamik olmayan səhifələr üçün belə hər dəfə serverdə generasiya lazımdır, bu da gecikmə yaradır. Üstəlik ən sadə tətbiq üçün belə render üçün Node.js server lazımdır — SPA-da isə CDN kifayət idi.

Bu problemi **static site generation (SSG)** həll etdi: bütün statik səhifələr build zamanı serverdə render olunur, nəticədə dərhal çatdırıla bilən hazır HTML fayllar əldə edilir. SSR-də olduğu kimi, JS bundle səhifəni yükləndikdən sonra hydrate edir. Nəticə SPA-dakı təcrübənin eynisidir, amma boş HTML yerinə content-lə dolu fayl. SSG layihələri sürətli server və ya CDN-də host edilə bilər — bu, əlavə caching və sürət deməkdir.

SSG blog, sayt və sadə onlayn mağaza üçün ideal həll oldu: sürətli yüklənmə, SEO dəstəyi, SPA-dakı kimi interaktivlik. Həm də SSR-i dinamik data üçün, SSG-ni statik səhifələr üçün birləşdirmək mümkün oldu — bu hibrid yanaşma daha mürəkkəb layihələr üçün imkan açır.

Amma statik səhifələrin yenilənməsi ayrı problemdir: yeni blog yazısı əlavə etmək ənənəvi olaraq bütün layihənin yenidən build olunmasını tələb edir. 1000 yazılı bloqu təsəvvür edin — bir yeni yazı üçün hamısını yenidən render etmək.

Bunu **incremental static generation (ISR)** həll edir. ISR, SSG və SSR-i caching məntiqi ilə birləşdirir. Bunu belə təsəvvür edin: build zamanı yaradılan bütün HTML/JS faylları sadəcə bir keş-dir — layihənin build-inin cari nəticəsi. Hər keş kimi, buna da revalidation (yenidən doğrulama) məntiqi lazımdır. Keş etibarlı olduğu müddətcə hər sorğu SSG kimi işləyir. Revalidation vaxtı bitəndə isə növbəti sorğu səhifəni SSR rejimində yenidən render etdirir, nəticə həm client-ə göndərilir, həm də köhnə HTML faylını əvəz edir — yəni keş yenilənir. Bundan sonra tətbiq yenə SSG rejimində davam edir.

ISR sayəsində milyonlarla səhifəsi olan layihələri belə hər kiçik dəyişiklik üçün tam yenidən build etmək lazım deyil. Hətta build mərhələsində səhifə generasiyasını tamamilə keçmək də mümkün oldu — lazım olan səhifələr sorğu zamanı render olunub saxlanılır. Böyük layihələr üçün bu, build sürətində əhəmiyyətli qazancdır.

Bu gün SSG + ISR, ənənəvi SSR ilə birlikdə həm sadə sayt, həm mürəkkəb tətbiq üçün ən populyar yanaşmalardandır. Amma klassik SPA da hələ populyardır. Bəs bütün bunları özümüz əldən yazmalıyıqmı? Xeyr — bunun üçün React əsaslı framework-lər var:

* **Next.js** — SSR ilə başlayıb, indi SSR, SSG, ISR-i dəstəkləyir; son zamanlar server komponentlər üzərində fəal işləyir.
* **Gatsby** — CMS və ya Markdown kimi mənbələrdən data alıb statik sayt qurmağa fokuslanıb.
* **Remix** — veb standartlarına yaxınlıq və UX-ə fokuslanan, nisbətən yeni framework; səhifə-səhifə deyil, səhifənin hissələri üzrə data işləmə və nested naviqasiya təklif edir.

## Next.js ilə praktik nümunə: Pages Router

Next.js SSR və statik generasiyanı sadələşdirmək üçün yaradılmış populyar React framework-üdür.

Əsas xüsusiyyətlər:

* SSR və statik generasiyanı avtomatlaşdıran sadə API — framework hansı səhifənin serverdə, hansının build zamanı render olunacağını özü müəyyən edir.
* Fayl əsaslı routing — layihənin qovluq/fayl strukturuna əsaslanan sadə marşrutlaşdırma.
* API route-lar sayəsində tam full-stack tətbiq qurmaq imkanı.
* Şəkil, font və script-lərin optimizasiyası.

Layihəni yaratmaq üçün tək əmr kifayətdir:

```bash
npx create-next-app@latest
```

Bu, TypeScript, ESLint, Tailwind, `src/` qovluğu, App Router istifadəsi kimi sualları verəcək. Bu bölmədəki nümunə üçün App Router sualından başqa hamısına "Bəli" cavabı verin — App Router-i növbəti bölmədə ayrıca araşdıracağıq.

Next.js-də (Pages Router-də) hər səhifə `pages` qovluğunda, URL yoluna uyğun adlı ayrı faylda yerləşir:

* Ana səhifə (`/`) → `pages/index.tsx`
* `/about` → `pages/about.tsx`
* `/posts` → `pages/posts/index.tsx`
* Dinamik post səhifəsi → `pages/posts/[post].tsx` — kvadrat mötərizədə ad framework-ə bunun dinamik səhifə olduğunu, `post` isə parametr olduğunu bildirir. Yəni `/posts/1`, `/posts/2` kimi bütün URL-lər bu faylı istifadə edəcək.

`pages` qovluğunda iki xüsusi fayl da var, bunlar özləri səhifə deyil, framework-ün səhifəni hazırlamaq üçün istifadə etdiyi fayllardır:

* `_document.tsx` — HTML markup-un hazırlanması üçün, burda `<html>` və `<body>` teqlərinə çıxış var. Bu fayl həmişə serverdə render olunur.
* `_app.tsx` — səhifənin inisializasiyası üçün; script bağlamaq və ya bütün route-lar arasında paylaşılan root layout üçün istifadə olunur.

`_app.tsx` faylına header əlavə edək:

```tsx
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <header className="p-4 flex items-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/posts">Posts</Link>
        <Link href="/about">About</Link>
      </header>
      <div className="p-4">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
```

`App` komponenti qaytardığı markup layihənin **bütün** səhifələrində görünəcək — yəni bu header hər səhifədə olacaq. `Component` prop-u isə hər an hansı səhifənin göstəriləcəyini idarə edir.

Ana səhifə çox sadədir:

```tsx
export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
    </main>
  );
}
```

Bu faylda heç bir əlavə funksiya və ya parametr yoxdur — belə səhifələr build zamanı avtomatik render olunur. Yəni `localhost:3000/`-a daxil olanda artıq hazır HTML alırıq — brauzerin dev tools-unda network tab-a baxsanız, bunu təsdiqləyə bilərsiniz: `App` və `Home` komponentlərindən yığılmış HTML serverdə hazırlanıb, brauzerdə yox.

İndi `/about` səhifəsinə baxaq — burada SSR tətbiq edəcəyik, yəni səhifə build zamanı yox, **hər sorğuda** render olunacaq. Bunun üçün Next.js `getServerSideProps` funksiyasını təqdim edir — bu, səhifə sorğulananda işə düşür və komponentin render üçün istifadə edəcəyi props-ları qaytarır:

```tsx
export const getServerSideProps = (async () => {
  const res = await fetch("https://api.github.com/users/sakhnyuk");
  const user: GitHubUser = await res.json();
  return { props: { user } };
}) satisfies GetServerSideProps<{ user: GitHubUser }>;
```

Burda GitHub API-dən istifadəçi datası çəkilir, `user` isə `props` obyekti daxilində qaytarılır. Vacib məqam: bu funksiya Node.js mühitinin bir hissəsidir — yəni burda fayl oxumaq, verilənlər bazasına qoşulmaq da mümkündür. Bu, mürəkkəb full-stack layihələr üçün böyük imkan açır.

Eyni fayldakı `About` komponenti bu datanı istifadə edir:

```tsx
export default function About({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <Image src={user.avatar_url} alt={user.login} width="100" height="100" />
      <h2>{user.name || user.login}</h2>
      <p>{user.bio}</p>
      <p>Location: {user.location || "Not specified"}</p>
      <p>Company: {user.company || "Not specified"}</p>
      <p>Followers: {user.followers}</p>
      <p>Following: {user.following}</p>
      <p>Public Repos: {user.public_repos}</p>
    </main>
  );
}
```

Tək bir funksiya ilə SSR tətbiq etdik.

Növbəti addım — `/posts` və `/posts/[post]` səhifələri, burda SSG və ISR tətbiq edəcəyik. Bunun üçün Next.js iki funksiya təqdim edir:

* `getStaticProps` — `getServerSideProps`-a bənzər məqsəd daşıyır, amma **build zamanı** çağırılır.
* `getStaticPaths` — path-də parametr olan dinamik səhifələr üçün (`[post].tsx` kimi) hansı path-lərin build zamanı əvvəlcədən generasiya olunacağını müəyyən edir.

`Posts` səhifəsi:

```tsx
export async function getStaticProps() {
  const posts = ["1", "2", "3"];
  return { props: { posts } };
}

export default function Posts({ posts }: { posts: string[] }) {
  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post}>
            <Link href={`/posts/${post}`}>Post {post}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

Bu nümunədə `getStaticProps` heç bir data çəkmir, sadəcə üç səhifə qaytarır — real layihədə isə burda da data fetch etmək və ya fayl sistemi ilə işləmək mümkündür.

Konkret post açılanda `[post].tsx` faylı işə düşür:

```tsx
export const getStaticPaths = (async () => {
  return {
    paths: [
      { params: { post: "1" } },
      { params: { post: "2" } },
      { params: { post: "3" } },
    ],
    fallback: true,
  };
}) satisfies GetStaticPaths;
```

Bu funksiya build sisteminə yalnız üç səhifənin əvvəlcədən render olunacağını bildirir. `fallback: true` isə deməkdir ki, nəzəri olaraq daha çox post səhifəsi ola bilər — məsələn `/posts/4`-ə daxil olsaq, o SSR rejimində render olunub build nəticəsinə saxlanılacaq:

```tsx
export const getStaticProps = (async (context) => {
  const content = `This is a dynamic route example. The value of the post parameter is ${context.params?.post}.`;
  return { props: { content }, revalidate: 3600 };
}) satisfies GetStaticProps<{ content: string }>;
```

Burda `context` arqumentindən `post` parametrini oxuya bilirik. Qaytarılan `revalidate` dəyəri ISR-i aktivləşdirir və serverə deyir: əvvəlki build-dən 3600 saniyə keçdikdən sonra növbəti sorğuda bu səhifəni yenidən qur.

```tsx
export default function Post({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  return (
    <main>
      <h1>Post – {router.query.post}</h1>
      <p>{content}</p>
    </main>
  );
}
```

Bu nümunədə fərqli server rendering yanaşmalarından istifadə edən çoxsəhifəli sayt qurduq — böyük, mürəkkəb layihələr üçün faydalı və rahat yanaşmadır.

## React Server Components və App Router

React Server Components (RSC) Next.js-də komponentlərlə işin yeni paradiqmasıdır — isomorfik JavaScript-i tamamilə aradan qaldırır. Bu komponentlərin kodu **yalnız** serverdə işləyir və nəticədə keşlənə bilir. Bu konseptdə komponentin daxilində birbaşa server fayl sistemini oxumaq və ya verilənlər bazasına qoşulmaq mümkündür.

Next.js-də RSC komponentləri iki kateqoriyaya ayırır: server və client komponentlər. Server komponentlər serverdə emal olunub client-ə statik HTML kimi göndərilir — brauzer yükü azalır. Client komponentlər isə brauzer JavaScript-inin bütün imkanlarına malikdir, amma bir şərtlə: faylın əvvəlində `"use client"` direktivi olmalıdır.

Server komponentlərdən istifadə üçün yeni layihə lazımdır. Routing yenə fayl əsaslıdır, amma indi əsas qovluq `app`-dır, marşrut adları isə yalnız qovluq adlarına əsaslanır. Hər route (qovluq) daxilində framework-ün müəyyən etdiyi adlarla fayllar olur:

* `page.tsx` — səhifəni göstərən komponent.
* `loading.tsx` — `page.tsx`-dəki komponent icra/yüklənərkən client-ə göndəriləcək loading state.
* `layout.tsx` — `_app.tsx`-in ekvivalenti, amma iç-içə route-larda çoxlu, iç-içə layout-lar mümkündür.
* `route.tsx` — API endpoint tətbiq etmək üçün.

İndi post saytımızı App Router arxitekturası ilə yenidən quraq. Ana səhifədən başlayaq. Saytımızda interaktiv element yox idi, gəlin ən sadəsini — sayğaclı düymə — əlavə edək:

```tsx
"use client";

import React from "react";

export const Counter = () => {
  const [count, setCount] = React.useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};
```

Bu komponent içində sayğac olan düymə render edir. Klikləyəndə sayğac artır. App Router ilə işləmək üçün `"use client"` direktivi lazımdır — bu, Next.js-ə deyir ki, bu komponentin kodunu bundle-a daxil et və brauzerə göndər.

İndi bu düyməni ana səhifəyə əlavə edək:

```tsx
export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <Counter />
    </main>
  );
}
```

Səhifə sadə olduğu üçün yeni düymədən başqa Pages Router-dəkindən fərqi yoxdur. App Router default olaraq bütün komponentləri server komponent sayır, amma bu halda səhifə yenə build zamanı render olunub statik saxlanılacaq.

`about` qovluğu və içində `page.tsx` yaradaq:

```tsx
export const dynamic = "force-dynamic";

export default async function About() {
  const res = await fetch("https://api.github.com/users/sakhnyuk");
  const user: GitHubUser = await res.json();
  return (
    <main>
      <Image src={user.avatar_url} alt={user.login} width="100" height="100" />
      <h2>{user.name || user.login}</h2>
      <p>{user.bio}</p>
      <p>Location: {user.location || "Not specified"}</p>
      <p>Company: {user.company || "Not specified"}</p>
      <p>Followers: {user.followers}</p>
      <p>Following: {user.following}</p>
      <p>Public Repos: {user.public_repos}</p>
    </main>
  );
}
```

Bu kod Pages Router-dəkindən daha sadədir. `About` komponenti asinxron olub — bu, network sorğusu edib nəticəni gözləməyə imkan verir. Hər sorğuda serverdə render istəndiyi üçün fayldan `dynamic` dəyişənini `force-dynamic` dəyəri ilə export etmək lazımdır — bu, Next.js-ə hər sorğu üçün yeni səhifə generasiya etməli olduğunu açıq bildirir. Əks halda Next.js səhifəni build zamanı yaradıb statik saxlayacaqdı (SSG ilə).

`about` qovluğu daxilində `loading.tsx` yaratsaq, About səhifəsi açılanda server GitHub-dan data istəyib səhifəni hazırlayana qədər gözləmək əvəzinə, dərhal `loading` faylındakı content fallback kimi göstəriləcək. `page.tsx`-dəki komponent hazır olan kimi server onu client-ə göndərib loading komponentini əvəz edəcək. Bu, əhəmiyyətli performans üstünlüyü verir və UX-i yaxşılaşdırır.

`posts` qovluğu və `page.tsx`:

```tsx
export default async function Posts() {
  const posts = ["1", "2", "3"];
  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post}>
            <Link href={`/posts/${post}`}>Post {post}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

Kod yenə çox sıxdır — render-dən əvvəl lazım olan hər şeyi birbaşa komponent daxilində əldə etmək mümkündür.

Konkret post üçün `posts` qovluğu daxilində `[post]` qovluğu, onun içində isə `page.tsx` yaradılır:

```tsx
export async function generateStaticParams() {
  return [{ post: "1" }, { post: "2" }, { post: "3" }];
}

export const revalidate = 3600;

export default async function Post({ params }: { params: { post: string } }) {
  return (
    <main>
      <h1>Post - {params.post}</h1>
      <p>
        This is a dynamic route example. The value of the post parameter is {params.post}.
      </p>
    </main>
  );
}
```

`getStaticPaths` əvəzinə burda `generateStaticParams` funksiyası ilə build zamanı hansı statik səhifələrin generasiya olunacağı bildirilir. ISR-i aktivləşdirmək üçün isə faylda `revalidate` dəyişənini saniyə ilə export etmək kifayətdir.

Bu nümunələr Next.js-in bütün imkanlarını əhatə etmir — daha dərin öyrənmə üçün rəsmi sənədləşməyə baxmaq tövsiyə olunur.

## Nəticə

SSR, SSG və ISR — hər biri eyni problemi fərqli tərəfdən həll edir: istifadəçiyə content-i **nə qədər tez**, serverə isə yükü **nə qədər az** vermək. SSR hər sorğuda təzə render, SSG build zamanı hazır fayl, ISR isə ikisinin arasında — keşlənmiş, amma vaxtaşırı yenilənən nəticə verir.

Next.js bu yanaşmaların hamısını Pages Router-də ayrı-ayrı funksiyalarla (`getServerSideProps`, `getStaticProps`, `getStaticPaths`), App Router-də isə React Server Components ilə daha təbii şəkildə təqdim edir: artıq "hansı funksiyanı export edim" sualı yerinə, komponentin özü server və ya client olduğunu deklarativ bildirir.

Fərq bir cümləyə sığır: köhnə SPA-da brauzer boş səhifəni doldururdu, indi isə server artıq dolu səhifəni göndərir, brauzer isə sadəcə onu "canlandırır".

# React-da Test Yazmaq: Niyə "İşləyir" Kifayət Deyil?

Proqram təminatı hazırlayarkən ən çox atlanılan mərhələ testdir. Xüsusilə avtomatlaşdırılmış testlər — komanda "işə yaraşır, sonra baxarıq" deyib keçir. Amma nəticədə bir sətir kodu dəyişəndə tətbiqin harasınınsa sıradan çıxıb-çıxmadığını yalnız istifadəçilər bildirir.

Bu yazıda əvvəlcə ümumi testləşdirmə anlayışına, sonra unit testlərə, ən sonda isə ReactJS komponentlərinin necə test edildiyinə baxacağıq.

## Test Etmək Nə Deməkdir?

Testləşdirmə — məhsulda xətaları aşkar etmək və funksionallığın düzgün işlədiyini təsdiqləmək prosesidir. Bundan başqa, testlər sistemin müxtəlif şərtlər altında necə davrandığını yoxlamağa və yeni dəyişikliklərin köhnə funksionallığı sındırmadığını (regressiya olmadığını) təsdiqləməyə imkan verir.

Ən sadə yol — **manual test**: developer və ya tester tətbiqi əl ilə yoxlayır. Amma bu yanaşma vaxt aparır və heç bir zaman tətbiqin təhlükəsiz və kritik xətalardan azad olduğuna zəmanət vermir.

Buna alternativ olaraq **avtomatlaşdırılmış testlər** var — insan müdaxiləsi olmadan funksionallığı yoxlayan testlər. Adətən bunlar əvvəlcədən yazılmış test dəstindən və onları işə salıb nəticəni analiz edən bir proqramdan (buna **runner** deyilir) ibarətdir.

> Testdən qaçmaq heç vaxt yaxşı fikir deyil — əksinə, onu daha yaxşı öyrənib mümkün qədər çox layihədə tətbiq etmək dəyər.

## Test Növləri və Piramida

Testlər səviyyəsinə görə üç əsas qrupa bölünür:

* **Unit test** — proqramın ayrıca modulunu və ya komponentini yoxlayır. Adətən developer tərəfindən yazılır, konkret funksiya və ya metodu yoxlayır. Yazılması və işləməsi sürətlidir, amma komponentlərin bir-biri ilə əlaqəsində yaranan problemləri tuta bilmir. Misal: bir funksiyanın, React komponentinin və ya Hook-un test edilməsi.
* **İnteqrasiya testi** — müxtəlif modul və ya komponentlərin bir-biri ilə qarşılıqlı işini yoxlayır. Məqsəd — inteqrasiya olunan hissələr arasındakı interfeys və qarşılıqlı əlaqə xətalarını tapmaqdır. Misal: istifadəçi qeydiyyatının real REST API çağırışları ilə işlədiyini yoxlamaq.
* **End-to-End (E2E) test** — bütöv sistemi, tələblərə tam uyğunluq baxımından yoxlayır. Bu ən etibarlı test növüdür, çünki tətbiqin daxili strukturundan tamamilə asılı olmayaraq real brauzerdə düymələrə klikləmə, formaların doldurulması və səhifələr arası naviqasiya kimi real hərəkətləri simulyasiya edir.

İnteqrasiya və E2E testlər daha çox etibar versə də, mürəkkəb, yavaş və bahalıdır. Buna görə də yaxşı praktika — üstünlüyü unit testlərə vermək, çünki onları saxlamaq və işlətmək daha asandır. Sonra bütün əsas biznes proseslər inteqrasiya testləri ilə, ən kritik ssenarilər isə yalnız E2E testlərlə örtülür. Bu yanaşma **piramida** şəklində təsvir olunur:

```
        /\
       /E2E\        <- az sayda, bahalı, yavaş, maksimum etibar
      /------\
     /  İnteq. \    <- orta sayda
    /------------\
   /   Unit test   \  <- çox sayda, ucuz, sürətli
  /------------------\
```

Piramidanın əsasında unit test dayanır — kodu maksimum əhatə edir, yazılışı və işə salınması ən ucuz olanıdır. Ortada inteqrasiya testləri, yuxarıda isə ən yavaş, ən bahalı, amma ən etibarlı olan E2E testlər yerləşir.

İnteqrasiya və E2E testlər tətbiqin daxili strukturundan asılı olmadığından, bu yazıda onlara toxunmayacağıq. İndi unit testə daha ətraflı baxaq.

## Unit Test Nədir?

Unit test — kodun ayrıca "vahidlərinin" (funksiya, metod) düzgün işlədiyini yoxlama prosesidir. Məqsəd — hər bir ayrıca vahidin öz vəzifəsini düzgün yerinə yetirdiyinə əmin olmaqdır ki, bu da bütün tətbiqin etibarlılığına inam artırır.

```js
export function sum(a, b) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Bu — iki ədədi toplayan ən sadə funksiyanın testidir. Test kodu özü `expect` adlı xüsusi metodu çağıran funksiyadır; `expect` bir dəyər alır və nəticəni yoxlamaq üçün bir sıra metodlar təqdim edir.

Belə üç sətirlik funksiya üçün üç sətirlik test yazmağa dəyərmi? Cavab birmənalı bəlidir. Tez-tez baş verir ki, testin özü test etdiyi funksiyadan həcmcə böyük olur — bunda pis heç nə yoxdur. Səbəbini görək.

Unit test **saf funksiyalarda** (xarici vəziyyətdən asılı olmayan, yan effekti olmayan funksiyalar) ən faydalı və effektivdir. Əksinə, test edilən funksiya xarici amillərdən (məsələn, serverdən məlumat çəkmək, `localStorage`-dan oxumaq, qlobal dəyişənlərdən asılı olmaq) asılı olub eyni girişə fərqli nəticə verə bilirsə, unit test faydasız olur.

Bundan çıxan nəticə: kodun testlə örtülməsini tələb edən yanaşma sizi avtomatik olaraq daha modul, müstəqil, təmiz və genişlənə bilən kod yazmağa sövq edir. Bu, böyük layihələrdə xüsusilə hiss olunur — testlə yazılmış layihə böyük refaktorinq və ya sıfırdan yenidən yazma ehtiyacı olmadan böyüyə bilir. Həmçinin testlər yeni gələn developerlər üçün əlavə sənədləşmə rolunu oynayır — testə baxaraq modulun nə etdiyini anlamaq olur.

### TDD vs Sonradan Test Yazmaq

Testin yazılma vaxtına görə iki əsas yanaşma var:

* **Ənənəvi yanaşma** — əvvəlcə kod, sonra test. Üstünlüyü — əsas funksionallığın sürətli inkişafı. Riski — testin təxirə salınması, örtülməmiş kodun yığılması.
* **Test-Driven Development (TDD)** — əvvəlcə test, sonra kod. Üstünlüyü — kod baştan testlə örtülür, deməli daha təmiz və etibarlı olur. Çatışmazlığı — tez-tez dəyişən tələbləri olan layihələr və ya prototiplər üçün uyğun olmaya bilər.

İkisi arasında seçim komanda mədəniyyəti, layihə tələbləri və developer üstünlüklərindən asılıdır. Vacib olan — heç bir yanaşmanın universal olmadığını anlamaq, amma test yazmamaq yanaşmasından tamamilə uzaq durmaqdır, çünki əksər hallarda belə kod sıfırdan yenidən yazılmağa məhkumdur.

## Test Mühitinin Qurulması: Vitest

Ən populyar test çərçivəsi Jest-dir. Amma biz Vite ilə tam uyğun işləyən, daha performanslı alternativ — **Vitest**-ə baxacağıq.

```bash
npm install -D vitest
```

Vitest əsas işləmək üçün əlavə konfiqurasiya tələb etmir, çünki Vite konfiqurasiya faylı ilə tam uyğundur.

Sonra `*.test.ts` uzantılı fayl yaradılır. Faylın yeri önəmli deyil, əsas odur ki, layihə daxilində olsun. Adətən test faylı test edilən faylla eyni qovluqda saxlanılır: `sum.ts` üçün `sum.test.ts`.

`package.json`-a script əlavə edin:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

```bash
npm run test
```

Bu, Vitest prosesini işə salır — layihədə `.test.` fayllarını tapıb hamısını icra edir, sonra dəyişiklikləri gözləyib yenidən işə salır (watch rejimi). Bir dəfəlik icra üçün:

```json
"test:run": "vitest run"
```

`run` parametri Vitest-ə testləri yalnız bir dəfə icra etməyi bildirir.

## Vitest-in Əsas İmkanları

Sadə bir `squared` funksiyasına baxaq:

```js
export const squared = (n) => n * n;
```

```js
import { expect, test } from 'vitest';

test('Squared', () => {
  expect(squared(2)).toBe(4);
  expect(squared(4)).toBe(16);
  expect(squared(25)).toBe(625);
});
```

`test` funksiyası birinci arqument olaraq test adını, ikinci arqument olaraq test funksiyasının özünü qəbul edir. `expect` metodu isə nəticəni yoxlamağın əsasını təşkil edir — çağırıldıqda nəticəni müxtəlif üsullarla yoxlamağa imkan verən metodlar dəsti olan obyekt qaytarır.

Uğurlu nəticədə terminalda belə görüntü olacaq:

```
✓ test/basic.test.ts (1)
   ✓ Squared
 Test Files  1 passed (1)
      Tests  1 passed (1)
```

Gözlənilən dəyəri `4`-dən `5`-ə dəyişsək, Vitest xətanın harada baş verdiyini, hansı nəticənin alındığını və hansının gözlənildiyini birbaşa göstərir:

```
FAIL  test/basic.test.ts > Squared
AssertionError: expected 4 to be 5
```

### Obyekt və Massivlərin Müqayisəsi

`toBe` sadə dəyərlərin birbaşa müqayisəsi üçün əladır, amma obyekt və massivlər üçün fərqli yanaşma lazımdır:

```js
test('objects', () => {
  const obj1 = { a: 1 };
  const obj2 = { a: 1 };
  expect(obj1).not.toBe(obj2);
  expect(obj1).toEqual(obj2);
});
```

İki eyni struktura malik, amma fərqli referansları olan obyekt yaratdıq — onlar dəyişən kimi bərabər deyil (`not.toBe`). Strukturun eyniliyini yoxlamaq üçün isə `toEqual` metodu var — o, obyektləri (və massivləri) rekursiv şəkildə müqayisə edir.

Massivlərdə element mövcudluğunu yoxlamaq üçün `toContain` var — string və hətta DOM elementinin `classList`-ində sinif axtarmaq üçün də işləyir:

```js
test('Array', () => {
  expect(['1', '2', '3']).toContain('3');
});
```

### Funksiyaların Casusluğu: `vi.fn` və `vi.spyOn`

Vitest funksiyaları "casus" (spy) edərək neçə dəfə və hansı arqumentlərlə çağırıldığını yoxlamağa imkan verir:

```js
const selector = (onSelect) => {
  onSelect('1');
  onSelect('2');
  onSelect('3');
};

test('selector', () => {
  const onSelect = vi.fn();
  selector(onSelect);
  expect(onSelect).toBeCalledTimes(3);
  expect(onSelect).toHaveBeenLastCalledWith('3');
});
```

`vi.fn()` ilə yaratdığımız fake funksiya neçə dəfə çağırıldığını (`toBeCalledTimes`) və sonuncu çağırışın arqumentini (`toHaveBeenLastCalledWith`) yoxlamağa imkan verir. `toHaveBeenCalledWith` isə hər çağırışı ayrıca yoxlaya bilər.

Real (obyektə bağlı) funksiyanı casus etmək üçün `vi.spyOn` işlədilir:

```js
test('spyOn', () => {
  const cart = {
    getProducts: () => 10,
  };
  const spy = vi.spyOn(cart, 'getProducts');
  expect(cart.getProducts()).toBe(10);
  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveReturnedWith(10);
});
```

`vi.spyOn` obyekti və metod adını qəbul edir, orijinal funksiyanı işlək saxlayaraq onun üzərində casusluq imkanı verir — `toHaveReturnedWith` isə funksiyanın nə qaytardığını yoxlayır.

## Mocking: Yan Effektli Funksiyaların Testi

Unit testin ən çətin hissəsi — yan effekti olan və ya xarici kitabxanadan asılı funksiyaların test edilməsidir. Əvvəllər deyildiyi kimi, yan effektli funksiyaları test etmək "faydasızdır" — amma bu tam doğru deyil. Bəzi hallarda saf funksiya yazmaq sadəcə mümkün deyil, lakin bu o demək deyil ki, test edilə bilməz. Bunun üçün **mocking** (saxta implementasiya) istifadə olunur: xarici davranışı emulyasiya etmək, ya da modulun/kitabxananın implementasiyasını əvəz etmək.

### Saxta Zamanlayıcılar (Fake Timers)

```js
function executeInMinute(func) {
  setTimeout(func, 1000 * 60);
}

function executeEveryMinute(func) {
  setInterval(func, 1000 * 60);
}

const mock = vi.fn(() => console.log('done'));
```

```js
describe('delayed execution', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should execute the function', () => {
    executeInMinute(mock);
    vi.runAllTimers();
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('should not execute the function', () => {
    executeInMinute(mock);
    vi.advanceTimersByTime(2);
    expect(mock).not.toHaveBeenCalled();
  });

  it('should execute every minute', () => {
    executeEveryMinute(mock);
    vi.advanceTimersToNextTimer();
    expect(mock).toHaveBeenCalledTimes(1);
    vi.advanceTimersToNextTimer();
    expect(mock).toHaveBeenCalledTimes(2);
  });
});
```

Burada `test` əvəzinə `describe` və `it` işlədildi. `describe` öz konteksti və lifecycle-ı olan test dəsti (suite) yaradır — `beforeEach`/`afterEach` metodları hər testdən əvvəl saxta zamanlayıcıları qurur, sonra hər testdən sonra hər şeyi əvvəlki vəziyyətə qaytarır. `it` sadəcə `test`-in oxunaqlılıq üçün alias-ıdır (`describe('delayed execution') > it('should execute...')` nəticədə oxunaqlı görünür).

`vi.runAllTimers()` bütün taymerləri dərhal "ötürür" — real vaxt gözləmədən nəticəni yoxlamağa imkan verir. `vi.advanceTimersByTime(2)` isə vaxtı yalnız müəyyən millisaniyə qədər irəli aparır. `vi.advanceTimersToNextTimer()` isə hər addımda növbəti taymerə qədər irəliləyərək dəqiq nəzarət verir.

### Modul Mocking

Xüsusilə React Native-də cihazın native funksiyalarından asılı kitabxanaları test edərkən modulun saxta versiyasını yaratmaq lazım gəlir:

```js
export function getSteps() {
  // NATIVE MƏNTİQ
  return 100;
}
```

```js
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { getSteps } from './ios-health-kit';

describe('IOS Health Kit', () => {
  beforeAll(() => {
    vi.mock('./ios-health-kit', () => ({
      getSteps: vi.fn().mockImplementation(() => 2000),
    }));
  });

  it('should return steps', () => {
    expect(getSteps()).toBe(2000);
    expect(getSteps).toHaveBeenCalled();
  });
});
```

`vi.mock` orijinal modulun importunu saxta implementasiya ilə əvəz edir — `getSteps` funksiyası əvəzinə `2000` qaytaran fake versiya işə düşür.

### Şəbəkə Sorğularının Mocking-i (MSW)

Demək olar ki, bütün tətbiqlər serverdən məlumat çəkir. Unit testdə bu problemdir, çünki test vahidi xarici mühitdən təcrid olunmalıdır. Bunun üçün **Mock Service Worker (MSW)** kitabxanası REST və GraphQL sorğularını çevik şəkildə mock etməyə imkan verir:

```js
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';

const server = setupServer(
  http.get('https://api.github.com/users', () => {
    return HttpResponse.json({
      firstName: 'Mikhail',
      lastName: 'Sakhniuk',
    });
  })
);

describe('Mocked fetch', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should returns test data', async () => {
    const response = await fetch('https://api.github.com/users');
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(await response.json()).toEqual({
      firstName: 'Mikhail',
      lastName: 'Sakhniuk',
    });
  });
});
```

`setupServer` verilmiş marşrut üçün saxta server yaradır; `beforeAll`/`afterEach`/`afterAll` isə serverin lifecycle-ını idarə edir. Nəticədə adi `fetch` çağırışı real şəbəkəyə çıxmadan qabaqcadan təyin olunmuş data qaytarır — status kodu, xəta halları və s. bütün ssenariləri yoxlamaq mümkün olur.

## ReactJS Komponentlərinin Test Edilməsi

React komponentləri əslində bir node qaytaran `createElement` funksiyalarıdır — `render` nəticəsində bu node brauzerdə HTML elementlərinə çevrilir. Unit testdə brauzer yoxdur, amma bu problem deyil, çünki React-ın render hədəfi demək olar ki, istənilən şey ola bilər. Komponentləri **JSDOM** formatına (DOM-un tam analoqu) render edərək test edəcəyik — buna **React Testing Library (RTL)** kömək edir.

### Mühitin Qurulması

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest jsdom
```

`tests/setup.ts` faylı yaradılır:

```ts
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

`vite.config.ts`-ə əlavə edilir:

```ts
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './tests/setup.ts',
},
```

Bu, Vitest-ə əlavə mühit (jsdom) istifadə etməyi və testlərdən əvvəl setup skriptini icra etməyi bildirir.

### Sadə Render Yoxlaması

```jsx
export function App() {
  return <h1>Hello world</h1>;
}
```

```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('should be in document', () => {
    render(<App />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });
});
```

`render` komponenti JSDOM-a yerləşdirir, `screen` isə virtual DOM ağacı ilə işləmək və elementləri müxtəlif üsullarla axtarmaq üçündür. `getByText` mətni ehtiva edən elementi tapır, `toBeInTheDocument` isə onun sənəddə mövcud olduğunu təsdiqləyir.

### Klik Hadisəsi: `fireEvent`

```jsx
export function ClassCheck() {
  const [clicked, setClicked] = useState(false);
  return (
    <button
      className={clicked ? 'active' : ''}
      onClick={() => setClicked(true)}
    >
      Click me
    </button>
  );
}
```

```jsx
describe('ClassCheck', () => {
  it('should have class active when button was clicked', () => {
    render(<ClassCheck />);
    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('active');
    fireEvent.click(button);
    expect(button).toHaveClass('active');
  });
});
```

`getByRole('button')` düyməni tapır — diqqət: sənəddə birdən çox düymə varsa, bu metod xəta verər, ona görə situasiyaya uyğun sorğu metodu seçmək vacibdir. `fireEvent.click` klik hadisəsini simulyasiya edir; sonra sinifin əlavə olunduğu yoxlanılır.

`fireEvent` klik, drag, play, focus, blur və s. bütün mümkün hadisələri yarada bilər. Formalarda ən çox rast gəlinən hadisə isə `change`-dir:

```jsx
export function Input() {
  return <input type="text" data-testid="userName" />;
}
```

```jsx
describe('Input', () => {
  it('should handle change event', () => {
    render(<Input />);
    const input = screen.getByTestId('userName');
    fireEvent.change(input, { target: { value: 'Mikhail' } });
    expect(input.value).toBe('Mikhail');
  });
});
```

`data-testid` atributu elementi kontentindən və ya rolundan asılı olmadan tapmağa imkan verir — layihə inkişaf etdikcə `h1`-i `h2`-yə, `div`-i semantik elementə dəyişəndə testlərin sınmasının qarşısını alır. `getByTestId` ilə input tapılır, `fireEvent.change` ilə dəyər dəyişdirilir, nəticə isə `input.value` üzərindən yoxlanılır. Bu yanaşma ilə validasiya və formatlaşdırma məntiqi olan böyük formaları da test etmək olar.

### Hook-ların Test Edilməsi

RTL komponentlərdən başqa Hook-ları da test etməyə imkan verir — bu, komponentdən təcrid olunmuş şəkildə yalnız custom məntiqi yoxlamağa şərait yaradır:

```js
export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  return { count, increment, decrement };
}
```

```js
test('useCounter', () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment();
  });
  expect(result.current.count).toBe(1);

  act(() => {
    result.current.decrement();
  });
  expect(result.current.count).toBe(0);
});
```

`render` əvəzinə `renderHook` işlədilir, `result` obyekti Hook-dan qaytarılan dəyəri oxumağa imkan verir. `increment`/`decrement` kimi metodları sadəcə çağırmaq kifayət etmir, çünki Hook-lar öz təbiətinə görə saf funksiya deyil və daxildə çoxlu məntiq daşıyır — buna görə çağırış `act()` içinə alınır ki, metod icra olunsun və Hook yenidən render olunsun. Bundan sonra nəticə adi qaydada yoxlanılır.

## Nəticə

Test yazmaq əlavə yük deyil, gələcək vaxtın qabaqcadan alınmasıdır. Kiçicik `sum` funksiyası üçün üç sətirlik test yazmaq gülünc görünə bilər, amma məhz bu vərdiş sizi daha modul, təmiz və dəyişikliyə davamlı kod yazmağa öyrədir.

> Testsiz kod — sabah sındırılmayacağına heç kimin zəmanət verə bilmədiyi koddur.

Unit test, inteqrasiya testi və E2E testin hər birinin öz yeri var: piramidanın əsasında çox sayda ucuz və sürətli unit test, ortada əsas biznes proseslərini örtən inteqrasiya testləri, təpədə isə yalnız ən kritik ssenariləri yoxlayan az sayda E2E test. Vitest və React Testing Library ilə bu piramidanın ən geniş, ən vacib hissəsini — React komponentləri və Hook-ları daxil olmaqla — asanlıqla qura bilərsiniz.

# Niyə React Native? Bir React component-i necə telefonda native widget-ə çevrilir?

React veb üçün o qədər uğurlu oldu ki, Meta (əvvəlki adı ilə Facebook) bir sual verdi: əgər UI qurmaq üçün bu qədər yaxşı alətimiz varsa, niyə mobil tətbiq üçün başqa bir şey öyrənməliyik? Bu sualın cavabı React Native oldu — 2013-cü ildə Facebook daxilində hackathon layihəsi kimi başlayan, 2015-ci ildə isə hamıya açıq edilən framework.

Bu məqalədə React Native-in yaranma səbəbini, necə işlədiyini və nə vaxt veb, nə vaxt native tətbiq seçməli olduğunuzu aydın şəkildə izah edəcəyik.

## React Native nədir?

React-in əsas ideyasını xatırlayaq: component-lər birbaşa ekrana "yapışmır", əvəzində **render target** adlanan bir şeyə render olunur. Veb üçün bu render target DOM-dur. Amma React component-in özü heç vaxt bilmir ki, nəticə harada göstəriləcək — bu, React-i çox çevik edən əsas xüsusiyyətdir.

Mobil dünyada isə vəziyyət fərqlidir. Android tətbiqi yazmaq üçün Java və ya Kotlin, iOS üçün isə Objective-C və ya Swift bilmək lazımdır. Yəni iki fərqli platforma üçün iki fərqli dil öyrənmək lazım gəlirdi — bu həm vaxt, həm də pul baxımından baha başa gəlirdi.

React Native məhz bu problemi həll etdi: React-ə **yeni bir render target** — native mobil widget-lər — əlavə etdi. Beləliklə eyni React bilikləri ilə həm veb, həm də mobil tətbiq yazmaq mümkün oldu.

Bunun arxasında duran texniki məntiq belədir:

- Veb üçün istifadə olunan eyni React kitabxanası React Native-də də işləyir, sadəcə JavaScriptCore mühitində icra olunur.
- Native platform API-larına göndərilən mesajlar **asinxron**dır və performans üçün toplu (batch) şəkildə göndərilir.
- React Native HTML elementləri əvəzinə, birbaşa mobil platformanın öz component-lərini (native widget-ləri) istifadə edir.
- React Native, əslində, component-ləri iOS və Android API-ları vasitəsilə render etmək üsuludur. Eyni məntiq fork və əlavələr vasitəsilə tvOS, Android TV, Windows, macOS və hətta yenidən Web üçün də tətbiq oluna bilər.

> Sadə desək: React Native veb üçün DOM-u əvəz edən şeyi — telefonun öz düymələrini, siyahılarını, input sahələrini — React component ağacına qoşan bir "körpü"dür.

Daha ətraflı tarixi və texniki detallar üçün: [React Native — Bringing Modern Web Techniques to Mobile](https://engineering.fb.com/2015/03/26/android/react-native-bringing-modern-web-techniques-to-mobile/)

## React və JSX artıq tanışdır

Yeni render target yaratmaq asan iş deyil — bu, praktiki olaraq iOS və Android üçün yeni bir "DOM" icad etmək kimidir. Bəs niyə bu qədər zəhmətə dəyər?

İki səbəb var:

1. **Mobil tətbiqlərə tələb böyükdür.** Mobil brauzer təcrübəsi native tətbiq təcrübəsi qədər yaxşı deyil.
2. **JSX artıq sınaqdan çıxmış, yaxşı alətdir.** Yeni texnologiya öyrənmək əvəzinə, artıq bildiyiniz şeydən istifadə etmək daha sərfəlidir.

Bu ikinci nöqtə xüsusilə vacibdir: bir komanda həm veb, həm iOS, həm də Android üçün ayrıca komandalar saxlamaq əvəzinə, sadəcə **React bilən bir UI komandası** saxlaya bilər. Bu, resurs baxımından böyük qənaətdir.

## Mobil brauzer təcrübəsi niyə kifayət etmir?

Mobil brauzerlər native tətbiqlərin bir çox imkanını təkrarlaya bilmir. Bunun səbəbi sadədir: brauzer HTML elementləri ilə native widget-ləri tam eyni şəkildə təqlid edə bilmir. Cəhd etmək mümkündür, amma çox vaxt native widget-in özünü istifadə etmək daha məntiqlidir — çünki:

- Az saxlama (maintenance) zəhməti tələb edir.
- İstifadəçi üçün **tanışlıq** yaradır — məsələn, tətbiqinizdəki tarix seçici (date picker) telefondakı digər tətbiqlərin tarix seçicisindən fərqli görünürsə, bu, istifadəçi üçün əlverişsizdir.

Bundan başqa, mobil istifadəçi qarşılıqlı əlaqəsi (interaction) veb-dən köklü şəkildə fərqlənir. Veb tətbiqləri, adətən, siçan olduğunu və klikin bir mərhələli hadisə olduğunu fərz edir. Mobil telefonda isə barmaqla ekrana toxunma var — bunun üçün **gesture sistemi** lazımdır (sürüşdürmə, sıxma, çoxbarmaqlı toxunma və s.). React Native bu cür gesture-ları veb React-dən daha yaxşı idarə edir, çünki bu, onun əsas dizayn məqsədlərindən biridir.

Həmçinin, platforma yeniləndikcə (məsələn, yeni iOS versiyası çıxanda) React Native tətbiqinin component-ləri də avtomatik yenilənir — çünki onlar **əsl platform component-ləridir**, təqlid deyil. Nəticədə tətbiqinizin düymələri, siyahıları digər tətbiqlərlə eyni davranır və tətbiq telefonun "bir parçası" kimi hiss olunur.

## Android və iOS: fərqli, amma eyni

İlk dəfə React Native haqqında eşidəndə çoxları düşünür ki, bu, "bir dəfə yaz, hər yerdə işlət" (write once, run anywhere) həllidir. Reallıq isə bir az daha mürəkkəbdir.

React Native kod paylaşımına böyük imkan versə də, iOS və Android bir çox fundamental səviyyədə fərqlidir — istifadəçi təcrübəsi fəlsəfələri də fərqlidir. Ona görə React Native-in real şüarı belədir:

> **"Bir dəfə öyrən, hər yerdə yaz"** (learn once, write anywhere) — "bir dəfə yaz, hər yerdə işlət" (write once, run anywhere) yox.

Yəni bəzən tətbiqiniz daha yaxşı təcrübə üçün platformaya xas widget-lərdən istifadə etməlidir.

Bununla belə, ekosistem inkişaf edir:

- **Expo** artıq veb dəstəyi təklif edir — React Native for Web vasitəsilə Android, iOS və veb üçün **tək bir kod bazası** ilə tətbiq yazmaq mümkündür.
- **Tamagui** UI kit-i həm veb, həm mobil üçün 100% dəstək verir — çoxplatformalı tətbiqi istifadəçi təcrübəsindən güzəştə getmədən qurmağa imkan yaradır.

Yəni React Native mükəmməl "bir dəfə yaz, hər yerdə işlət" həlli olmasa da, bu istiqamətdə xeyli irəliləyib.

## Bəs mobil veb tətbiqlər lazımdırmı?

Hər istifadəçi tətbiq quraşdırmağa hazır olmur — xüsusilə tətbiqinizin hələ yüksək endirmə sayı və reytinqi yoxdursa. Veb tətbiqin girişi çox asandır: istifadəçiyə sadəcə brauzer lazımdır.

Native platform UI-larının hər şeyini təkrarlamaq mümkün olmasa da, mobil veb interfeysdə hələ də çox yaxşı şeylər etmək olar. Bəlkə də yaxşı veb UI, tətbiqinizin endirmə və reytinq göstəricilərini artırmaq üçün ilk addımdır.

İdeal olaraq üç istiqamətə fikir vermək lazımdır:

- **Standart veb** (noutbuk/masaüstü brauzerlər)
- **Mobil veb** (telefon/planşet brauzerləri)
- **Mobil tətbiqlər** (telefon/planşet native platforması)

Bu üç sahəyə bərabər səy qoymaq, adətən, məntiqli deyil — istifadəçiləriniz, çox güman ki, bir sahəni digərlərindən üstün tutur. Məsələn, mobil tətbiqinizə veb versiyadan daha çox tələb olduğunu bildiyiniz an, səyinizi ora yönəltməyin vaxtıdır.

## Nəticə

React Native — Meta-nın React-i yenidən istifadə edərək native mobil tətbiqlər yaratmaq cəhdidir. React və JSX UI təsviri üçün əlaqədə çox güclüdür, mobil tətbiqlərə tələb də böyükdür — deməli, veb üçün bildiyiniz şeydən istifadə etmək tam məntiqlidir.

Mobil tətbiqlərin brauzerdən üstün olma səbəbi sadədir: onlar sadəcə **daha yaxşı hiss olunur**. Veb tətbiqlər gesture-ları native tətbiqlər qədər yaxşı idarə edə bilmir və görünüş baxımından telefonun "bir parçası" kimi hiss olunmur.

React Native illər ərzində xeyli inkişaf edib və Expo, Tamagui kimi alətlərlə daha səmərəli çoxplatformalı inkişafa imkan yaradıb. Amma unutmayın: React Native-in məqsədi "bir dəfə yaz, hər yerdə işlət" deyil, **"bir dəfə öyrən, hər yerdə yaz"**dır. Bu o deməkdir ki, developer-lər daha yaxşı istifadəçi təcrübəsi üçün platformaya xas xüsusiyyətlərdən yenə də istifadə edə bilər.

Qısası: əvvəl iki-üç dil öyrənib ayrı-ayrı komandalar saxlamaq lazım idi. İndi isə bir React komandası ilə veb, iOS və Android-i eyni anda əhatə etmək mümkündür.


# React Native "kapot altında" necə işləyir?

Əvvəlki fəsildə React Native-in nə olduğunu və istifadəçinin React Native UI ilə mobil brauzer arasında hiss etdiyi fərqi qısaca gördük. Bu dəfə daha dərinə enirik: React Native mobil cihazda necə işləyir, bu framework-lə işə başlamazdan əvvəl nə bilmək lazımdır. Həmçinin JavaScript-in native funksionallıqla necə əlaqələndiyinə və bunun hansı məhdudiyyətləri olduğuna baxacağıq.

Bu fəsildə aşağıdakıları öyrənəcəyik:

- React Native arxitekturası necə qurulub
- JavaScript və Native modullar nə fərqlənir
- React Native-in əsas component və API-ları

## Əvvəllər veb və mobil tətbiqlərin vəziyyəti necə idi?

React Native-in necə işlədiyini anlamazdan əvvəl, React arxitekturasının tarixinə və veb ilə native mobil tətbiqlər arasındakı fərqlərə qısaca baxaq.

Meta (o zamankı adı ilə Facebook) React-i 2013-cü ildə component yanaşması və virtual DOM-la işləyən monolit alət kimi buraxdı. Bu, brauzerin daxili proseslərini — JS-in parse olunması, DOM-un qurulması, layer-lərin idarəsi və render — düşünmədən veb tətbiq yazmaq imkanı verdi. Developer sadəcə state və props ilə interfeys qurur, CSS ilə stil verir, backend-dən data çəkir, local storage-da saxlayırdı.

React brauzerlə birlikdə az vaxtda performanslı tətbiq yazmağa imkan verdi. Bu deklarativ yanaşma sürətli inkişafı və yeni başlayanlar üçün aşağı giriş həddini təmin etdiyinə görə populyar oldu. Üstəlik, backend Node.js-də qurulubsa, bütün layihəni bir dildə saxlamaq asanlaşırdı.

Eyni vaxtda mobil tətbiq yazmaq daha mürəkkəb idi. Android və iOS üçün şirkətlər üç fərqli komanda saxlamalı idi:

- Veb developer HTML, CSS, JS və React bilməli idi.
- Android developer Java və ya Kotlin SDK təcrübəsinə malik olmalı idi.
- iOS developer Objective-C və ya Swift, həmçinin CocoaPods bilməli idi.

Prototipdən buraxılışa qədər hər addım fərqli bacarıq tələb edirdi. Cross-platform həllərdən əvvəl veb və mobil inkişaf belə görünürdü: eyni biznes məntiqi üç dəfə yazılırdı, komandalar arasında kod paylaşmağın alternativi yox idi, resurs paylaşımı da mümkün deyildi (Android developer iOS üçün kod yaza bilməzdi, əksinə də).

Bu problemlər test resurslarının artmasına (bug üçün daha çox yer), inkişaf sürətinin fərqli olmasına (mobil eyni funksiyanı daha uzun müddətdə çıxarırdı) səbəb oldu — nəticədə şirkətlər üçün böyük və bahalı problemə çevrildi. Bir çoxu tək kod bazası yazmaq və ya mövcud olanı bir neçə ekosistemdə istifadə etmək yollarını axtarmağa başladı. Ən sadə yol — veb tətbiqi brauzer vasitəsilə mobil üçün "wrap" etmək idi, amma bu, toxunma və gesture idarəetməsində məhdud idi (əvvəlki fəsildə gördüyümüz kimi).

Bu problemlərə cavab olaraq Meta cross-platform framework üzərində işə başladı və 2015-ci ildə React Native kitabxanasını buraxdı. Bununla React iki ayrı kitabxanaya bölündü: brauzerdə render üçün indi **ReactDOM** istifadə olunur.

React artıq yalnız component ağacını idarə edir. Bu yanaşma bütün render API-larını əhatə edir və platforma-spesifik metodların çoxunu bizdən gizlədir — biz sadəcə interfeys qurmağa fokuslana bilirik, render necə baş verəcəyi barədə düşünməyə ehtiyac qalmır.

> Ona görə də React tez-tez "renderer-agnostik" kitabxana adlandırılır. Veb üçün ReactDOM element yaradır və birbaşa brauzer DOM-una tətbiq edir; mobil üçün isə React Native interfeysi birbaşa telefon ekranına render edir.

Bəs React Native bütün brauzer API-sını necə əvəz edir və bizə tanış kodu mobil üzərində işlətməyə imkan verir?

## React Native-in cari arxitekturası

React Native kitabxanası native building block-lardan istifadə edərək React və JS ilə native tətbiq yaratmağa imkan verir. Məsələn, `<Image/>` component-i arxa planda iki fərqli native component-i təmsil edir: Android-də `ImageView`, iOS-da `UIImageView`. Bu, React Native-in iki ayrı layer-dən — JS thread və Native thread-dən — ibarət arxitekturası sayəsində mümkündür.

Növbəti bölmələrdə hər thread-i və onların bir-biri ilə necə əlaqələndiyini araşdıracağıq.

### JS thread

Brauzer JS-i V8, SpiderMonkey kimi JS engine-lər vasitəsilə icra etdiyi kimi, React Native də öz JS virtual machine-inə malikdir. Burada bizim JS kodumuz icra olunur, API çağırışları edilir, toxunma (touch) hadisələri emal olunur və s.

Əvvəlcə React Native yalnız Apple-ın JavaScriptCore virtual machine-ini dəstəkləyirdi. iOS-da bu VM built-in gəlir. Android-də isə JavaScriptCore React Native ilə birgə paketlənir — bu da tətbiqin ölçüsünü artırır. Nəticədə Android-də sadə "Hello World" React Native tətbiqi təxminən 3-4 MB yer tuturdu.

0.60 versiyasından React Native yeni **Hermes** virtual machine-inə keçdi, 0.64-dən isə iOS üçün də dəstək verildi. Hermes hər iki platformada bir sıra yaxşılaşdırma gətirdi:

- Tətbiqin start vaxtının qısalması
- Endirilən tətbiqin ölçüsünün azalması
- Yaddaş istifadəsinin azalması
- Built-in proxy dəstəyi (`react-native-firebase` və `mobx` kimi kitabxanaların işləməsi üçün)

Köhnə və yeni arxitektura arasındakı fərqləri anlamaq müsahibələrdə tez-tez soruşulan mövzudur. Hermes haqqında ətraflı: [reactnative.dev/docs/hermes](https://reactnative.dev/docs/hermes).

JS, brauzerdə olduğu kimi, React Native-də də **tək thread**-də icra olunur. Bu thread JS-in icrasına cavabdehdir — yazdığımız biznes məntiqi burada işləyir. Yəni component-lər, state, Hook-lar, REST API çağırışları kimi bütün adi kod tətbiqin JS hissəsində idarə olunur.

Bütün tətbiq strukturu **Metro bundler** vasitəsilə tək fayla paketlənir. Metro həmçinin JSX kodunu JS-ə transpile etməyə cavabdehdir. TypeScript istifadə etmək istəsək, Babel bunu dəstəkləyir — heç bir əlavə konfiqurasiya lazım deyil.

### Native hissə

Burada native kod icra olunur. React Native bu hissəni hər platforma üçün öz native dilində reallaşdırır: Android üçün Java, iOS üçün Objective-C. Native layer əsasən Android/iOS SDK ilə əlaqə saxlayan **Native modullardan** ibarətdir və tətbiqlərə unifikasiya olunmuş API vasitəsilə native funksionallıq təqdim edir. Məsələn, alert dialoq göstərmək lazımdırsa, Native layer hər iki platforma üçün eyni API təqdim edir və biz onu JS thread-dən çağırırıq.

Bu thread interfeysi yeniləmək və ya native funksiyaları çağırmaq lazım olanda JS thread ilə əlaqə saxlayır. Onun iki hissəsi var:

- **React Native UI** — native interfeys formalaşdırma vasitələrini istifadə edir.
- **Native Modules** — tətbiqlərə işlədiyi platformanın spesifik imkanlarına çıxış verir.

### Thread-lər arasında əlaqə: bridge

Hər React Native layer-i tətbiqdəki hər native və UI xüsusiyyəti üçün özünəməxsus API reallaşdırır. Layer-lər arasındakı əlaqə **bridge** vasitəsilə həyata keçir. Bu modul C++ ilə yazılıb və asinxron növbəyə (queue) əsaslanır. Bridge bir tərəfdən data alanda onu serializasiya edir, JSON string-ə çevirir və növbədən keçirir. Data təyinat yerinə çatanda deserializasiya olunur.

Alert nümunəsində olduğu kimi, native hissə JS-dən gələn çağırışı qəbul edib dialoqu göstərir. Əslində, çağırılan JS metodu bridge-ə mesaj göndərir, bridge bu mesajı aldıqda Native hissə tapşırığı icra edir. Native mesajlar da JS layer-ə ötürülə bilər — məsələn, düyməyə klikləndikdə Native layer JS-ə `onClick` hadisəsi ilə mesaj göndərir.

JS və Native hissə, bridge ilə birlikdə, veb tətbiqlərin server və client tərəflərinə bənzəyir — onlar REST API-lar vasitəsilə əlaqə saxlayır kimi. Native hissənin hansı dildə və necə reallaşdırıldığı bizim üçün fərq etmir, çünki JS-dəki kod izolə olunub — biz sadəcə bridge-ə mesaj göndərir, cavab alırıq.

> Bu, həm böyük üstünlükdür, həm də böyük çatışmazlıq: bir tərəfdən tək kod bazası ilə cross-platform tətbiq yazmağa imkan verir, digər tərəfdən isə çox biznes məntiqi olan tətbiqdə bottleneck-ə çevrilə bilər.

Tətbiqdəki bütün hadisə və əməliyyatlar asinxron JSON-bridge mesajlarına əsaslanır. Hər tərəf mesaj göndərir və gələcəkdə hansısa vaxt cavab gözləyir (bu, zəmanətli deyil). Bu cür data mübadiləsi sxemi ilə əlaqə kanalının yüklənmə riski var.

Bunun performans problemi yaratmasına klassik nümunə: istifadəçi böyük siyahını scroll edir. Native mühitdə `onScroll` hadisəsi baş verəndə, məlumat asinxron şəkildə JS mühitinə ötürülür. Amma native mexanizmlər JS hissənin işini bitirib nəticəni bildirməsini gözləmir. Bunun nəticəsində siyahıda məzmun görünməzdən əvvəl boş sahə görünür və gecikmə yaranır. Bu cür adi problemlərdən qaçmaq üçün xüsusi üsullar var — məsələn, limitsiz siyahılarda paginated `FlatList` istifadə etmək. Cari arxitekturanın bu məhdudiyyətini yadda saxlamaq vacibdir.

### Stilləşdirmə

Hər platformanın interfeys yaratmaq və stilləşdirmək üçün öz texnologiyası var. Bunu unifikasiya etmək üçün React Native CSS-in-JS sintaksisindən istifadə edir. Flexbox vasitəsilə component-lər öz uşaqlarının layout-unu təyin edə bilir — bu, müxtəlif ekran ölçülərində ardıcıl layout təmin edir. Ümumilikdə veb-də CSS-in işləmə məntiqinə bənzəyir, sadəcə adlar camelCase yazılır (məsələn, `background-color` yox, `backgroundColor`).

JS tərəfində bu, sadə obyektdir (stil xüsusiyyətləri ilə); native kodda isə **Shadow** adlanan ayrı thread-dir. Bu thread Meta-nın hazırladığı **Yoga engine** vasitəsilə tətbiqin layout-unu hesablayır. Nəticələr interfeysi göstərməyə cavabdeh olan Native UI thread-ə göndərilir.

Bütün bu hissələr birləşəndə React Native-in cari arxitekturası formalaşır: bu arxitektura mühüm biznes problemlərini həll edir — eyni komanda ilə həm veb, həm mobil tətbiq yaratmaq mümkündür, çox miqdarda biznes məntiqi kodu təkrar istifadə oluna bilər, mobil təcrübəsi olmayan developer-lər belə React Native-i rahat istifadə edə bilir.

## Gələcək arxitektura: bridge-siz React Native

Cari arxitektura ideal deyil. Son bir neçə ildir React Native komandası bridge bottleneck-i həll etmək üzərində işləyir. Yeni arxitektura məhz bunun üçündür.

React Native-in yenidən qurulması bridge-i tədricən ləğv edib əvəzinə **JS Interface (JSI)** adlanan yeni komponent gətirir. Bu element, öz növbəsində, yeni Fabric component-lərini və TurboModule-ları mümkün edir.

JSI-nin istifadəsi bir sıra yaxşılaşdırma imkanı açır:

1. **JS bundle artıq JavaScriptCore VM-dən asılı deyil.** İndi hər iki platformada yeni Hermes JS engine-i işlətmək mümkündür — yəni JavaScriptCore engine-i asanlıqla daha performanslı başqa bir şeylə əvəz oluna bilər.
2. **JSI JS-ə native metod və funksiyaları birbaşa çağırmağa imkan verir.** Bu, native metod və xüsusiyyətlərə istinadları saxlayan `HostObject` C++ obyekti sayəsində mümkün olub. `HostObject` JS-də native metod və props-ları qlobal obyektə bağlayır — beləliklə JS funksiyalarına birbaşa çağırış Java və ya Objective-C API-larını işə salır.
3. **TurboModule-lar** native modulları tam idarə etməyə imkan verir. Bütün modullar eyni anda başlamır — tətbiq onlara yalnız lazım olanda müraciət edir.
4. **Fabric** — yeni UI manager (Renderer) — bridge-ə ehtiyacı aradan qaldıraraq render layer-ini transformasiya edir. İndi Shadow Tree birbaşa C++-da yaradıla bilir, bu da sürəti artırır və bir elementi render etmək üçün addım sayını azaldır.
5. **CodeGen** — React Native və Native hissə arasında rahat əlaqəni təmin etmək üçün Meta üzərində işlədiyi alət. Güclü tipli native kodla dinamik tipli JS-in uyğunluğunu avtomatlaşdıracaq — hər iki thread üçün kodu təkrarlamağa ehtiyac qalmayacaq.

Yeni arxitektura, əvvəlki React Native tətbiqlərində mümkün olmayan yeni dizaynların yolunu aça bilər — çünki indi C++-ın gücündən istifadə etmək mümkündür. Bu, gələcəkdə React Native ilə əvvəlkindən daha çox müxtəliflikdə tətbiq yaratmağa imkan verəcək.

## JS və Native modullar

React Native bütün native imkanları qutudan çıxdığı kimi əhatə etmir — yalnız əsas tətbiqdə lazım olan ən ümumi funksiyaları təqdim edir. Üstəlik, Meta komandası tətbiqin ümumi ölçüsünü azaltmaq üçün bəzi funksiyaları öz ayrıca modullarına köçürüb. Məsələn, cihazda data saxlamaq üçün `AsyncStorage` ayrıca paketə köçürülüb və istifadə etmək üçün ayrıca quraşdırılmalıdır.

Bununla belə, React Native genişlənə bilən framework-dür. Öz native modullarımızı əlavə edib eyni bridge və ya JSI vasitəsilə JS API-nı ifşa edə bilərik. Native modul yazmaq Objective-C və ya Java təcrübəsi tələb etdiyi üçün bu kitabda fokuslanılan mövzu deyil — üstəlik buna ehtiyac da azdır, çünki React community demək olar hər ehtiyac üçün hazır modul yaradıb.

Ən populyar native modullardan bir neçəsi:

- **React Navigation** — naviqasiya menyuları və ekranlar yaratmaq üçün ən yaxşı React Native naviqasiya kitabxanalarından biri. Stabil, sürətli və az bug-lıdır, sənədləşməsi yaxşıdır.
- **UI component kitabxanaları** — layout-u sıfırdan yazmadan tez qurmağa imkan verir, adətən daha stabil və ardıcıl nəticə verir:
  - **NativeBase** — Android, iOS və veb üçün universal dizayn sistemi.
  - **React Native Elements** — hazır UI kit.
  - **UI Kitten** — Eva Design System-in React Native reallaşdırması.
  - **React Native Paper** — Google Material Design-a uyğun component-lər.
  - **Tamagui** — həm mobil, həm veb üçün işləyən component-lər.
- **Splash screen** — `react-native-bootsplash` şəkil və fon rəngi verməklə splash screen-i komanda xəttindən yaradır (JS thread başlamazdan əvvəl göstərilməli olduğu üçün bu, əl ilə çətin işdir).
- **Icons** — `react-native-vector-icons` ikonları unifikasiya edir, `react-native-svg` isə SVG render etməyə imkan verir.

### Xəta idarəetməsi

Veb tətbiqdə xətalar adətən JS-in hüdudlarından kənara çıxmır — tətbiq işə düşmürsə, səbəbi DevTools log-larında asanlıqla görmək olur. React Native-də isə Native komponent də əlavə olunduğundan, xəta icra zamanı orada da baş verə bilər. Nəticədə xəta baş verəndə tətbiq dərhal bağlanır və səbəbi tapmaq çətinləşir.

`react-native-exception-handler` native və JS xətalarını idarə etmək üçün sadə üsul təqdim edir. İşlətmək üçün modulu quraşdırıb link etmək, sonra JS və native exception-lar üçün qlobal handler qeydiyyatdan keçirmək lazımdır:

```js
import { setJSExceptionHandler, setNativeExceptionHandler }
  from "react-native-exception-handler";

setJSExceptionHandler((error, isFatal) => {
  // JS xətası baş verəndə görüləcək əməliyyat
});

const exceptionhandler = (exceptionString) => {
  // native xəta üçün handler kodu
};

setNativeExceptionHandler(
  exceptionhandler,
  forceAppQuit,
  executeDefaultHandler
);
```

`setJSExceptionHandler` və `setNativeExceptionHandler` xüsusi qlobal xəta handler-lərdir. Crash baş verəndə xəta mesajı göstərmək, Google Analytics ilə izləmək və ya öz API-nız vasitəsilə development komandasına bildiriş göndərmək mümkündür.

### Push bildirişlər

Bildirişlər indi tətbiqlərin ayrılmaz hissəsidir. Push bildirişlər adətən istifadəçi cihazlarına mesaj göndərən gateway provayderinə bağlıdır. Tətbiqə push bildiriş əlavə etmək üçün istifadə oluna bilən kitabxanalar:

- **react-native-onesignal** — OneSignal (push, email, SMS)
- **react-native-firebase** — Google Firebase
- **@aws-amplify/pushnotification** — AWS Amplify

### Over-the-air (OTA) yeniləmələr

Adi tətbiq yeniləməsində yeni versiya build edilib app store-a yüklənir. React Native bundle tək fayl olduğundan, onu **over-the-air** (hava üzərindən) əvəz etmək çətin deyil — Apple və ya Google-un təsdiqini gözləmədən tətbiqi istədiyiniz qədər tez-tez yeniləyə bilərsiniz. Bu, React Native-in real gücüdür.

Bunun üçün Microsoft-un **CodePush** servisindən istifadə edilə bilər ([sənəd](https://docs.microsoft.com/en-gb/appcenter/distribution/codepush/)). Expo də `expo-updates` paketi ilə OTA yeniləmələri dəstəkləyir.

### JS kitabxanaları

Native olmayan JS modulları üçün demək olar heç bir məhdudiyyət yoxdur — istisna DOM və Node.js kimi dəstəklənməyən API-lardan istifadə edən kitabxanalardır. Moment, Lodash, Axios, Redux, MobX və minlərlə digər JS paketini rahatlıqla istifadə etmək olar.

React Native-in minlərlə kitabxanası olduğundan hamısını sadalamaq mənasızdır. Lazım olan paketi tapmaq üçün geniş və reytinqləşdirilmiş siyahı toplayan [React Native Directory](https://reactnative.directory/) layihəsi var.

## React Native-in əsas component və API-ları

İndi React Native-in daxildə necə qurulduğunu və funksionallığını necə genişləndirə biləcəyimizi bilirik. Növbəti addım — bu framework-ün təqdim etdiyi API və component-lərə baxmaqdır.

Demək olar bütün tətbiqlər aşağıdakı əsas building block-lardan ən azı birini istifadə edir:

- **View** — hər tətbiqin əsas kərpici. Veb-də `<div>`-in ekvivalentidir, mobil-də `UIView` (iOS) və ya `android.view` (Android) kimi təmsil olunur. `<View/>` başqa `<View/>`-in içində nest oluna bilər, sıfır və ya çoxlu istənilən tipdə uşağa malik ola bilər.
- **Text** — mətn göstərmək üçün React component-i. `View` kimi nest olunma, stil və toxunma idarəetməsini dəstəkləyir.
- **Image** — şəbəkə şəkilləri, statik resurslar, müvəqqəti local şəkillər və kamera roll-undan olan şəkillər daxil olmaqla müxtəlif mənbələrdən görüntü göstərir.
- **TextInput** — istifadəçiyə klaviatura ilə mətn daxil etməyə imkan verir. Props avtokorreksiya, avto-böyük hərf, placeholder mətni, fərqli klaviatura tipləri (məsələn, rəqəm klaviaturası) kimi bir sıra xüsusiyyəti konfiqurasiya etməyə imkan verir.
- **ScrollView** — bir neçə view və component-i scroll etmək üçün ümumi konteyner. `horizontal` property ilə həm şaquli, həm üfüqi scroll mümkündür. Böyük və ya limitsiz siyahı render etmək lazımdırsa, **FlatList** istifadə edilməlidir — bu, "Pull to Refresh" və lazy-loading kimi xüsusi props dəstləri təqdim edir. Siyahı bölmələrə ayrılmalıdırsa, **SectionList** var.
- **Button** — React Native fərdi düymələr və digər toxunulabilən component-lər (`TouchableHighlight`, `TouchableOpacity`, `TouchableWithoutFeedback`) yaratmaq üçün inkişaf etmiş component-lərə malikdir.
- **Pressable** — React Native 0.63-dən etibarən daha dəqiq toxunma nəzarəti verir. Əslində toxunmanı aşkar etmək üçün wrapper-dir; `TouchableOpacity` və `Button` kimi touchable component-lər əvəzinə istifadə edilə bilən yaxşı müəyyən olunmuş component-dir.
- **Switch** — checkbox-a bənzəyir, amma mobil cihazlarda tanış olduğumuz switch formasında təqdim olunur.

Növbəti fəsillərdə bu ümumi component-lərə və onların xüsusiyyətlərinə daha dərindən baxacaq, az istifadə olunan yeni component-ləri də araşdıracağıq. Bütün mövcud component-lər haqqında ətraflı məlumat: [reactnative.dev/docs/components-and-apis](https://reactnative.dev/docs/components-and-apis).

## Nəticə

Bu fəsildə cross-platform framework React Native-in tarixinə və şirkətlər üçün hansı problemi həll etdiyinə baxdıq. Onunla şirkətlər tək universal developer komandası ilə bir biznes məntiqi yaza və bunu bütün platformalarda eyni anda tətbiq edə bilir — bu da çox vaxt və pul qənaəti deməkdir.

> React Native-in kapot altında necə işlədiyini ətraflı bilmək planlaşdırma mərhələsində potensial problemləri əvvəlcədən görməyə və həll etməyə imkan verir.

Qısası: bridge (JS ↔ Native arasında JSON mesajlaşan asinxron körpü) React Native-i mümkün etdi, amma həm də onun bottleneck-inə çevrildi. Yeni JSI-əsaslı arxitektura (Fabric, TurboModules, CodeGen) məhz bu bottleneck-i aradan qaldırmaq üçün qurulur. Növbəti fəsildə yeni React Native layihələrinə necə başlanacağını öyrənəcəyik.

# React Native layihəsinə necə sıfırdan başlamaq olar?

Əvvəlki fəsillərdə React Native-in nə olduğunu və "kapot altında" necə işlədiyini gördük. İndi nəzəriyyədən praktikaya keçmək vaxtıdır: real layihə yaratmaq, onu telefonda göstərmək və kodda dəyişiklik edərkən canlı yenilənməni izləmək.

Xoşbəxtlikdən, yeni layihə yaradarkən lazım olan bütün boilerplate kodu komanda xətti alətləri bizim əvəzimizə həll edir. Bu fəsildə React Native üçün mövcud CLI alətlərinə baxacaq, ilk sadə tətbiqimizi yaradacaq və onu birbaşa telefonumuzda işə salacağıq.

Bu fəsildə aşağıdakı mövzuları əhatə edəcəyik:

- React Native CLI alətlərinin araşdırılması
- Expo komanda xətti alətinin quraşdırılması və istifadəsi
- Tətbiqi telefonda görüntüləmək
- Tətbiqi Expo Snack-də görüntüləmək

## React Native üçün hansı CLI alətləri var?

İnkişaf prosesini sadələşdirmək və sürətləndirmək üçün xüsusi komanda xətti alətlərindən istifadə olunur — bunlar boş layihələri tətbiq şablonları, asılılıqlar (dependencies) və başlatma, build etmə, test etmə üçün digər alətlərlə birgə quraşdırır. Burada iki əsas yanaşma var:

- **React Native CLI**
- **Expo CLI**

**React Native CLI** — Meta tərəfindən yaradılmış alətdir. Layihə orijinal CLI alətinə əsaslanır və üç hissədən ibarətdir: native iOS layihəsi, native Android layihəsi və React Native JavaScript tətbiqi. Başlamaq üçün Xcode və ya Android Studio lazımdır. Bu yanaşmanın əsas üstünlüyü **çeviklik**dir — istənilən kitabxananı Native modul vasitəsilə qoşa, yaxud birbaşa native hissəyə kod yaza bilərsiniz. Amma bunun üçün ən azı mobil development-in əsaslarını bilmək tələb olunur.

**Expo CLI** isə React Native tətbiqləri qurmaq üçün böyük ekosistemin yalnız bir hissəsidir. Expo — React Native və native platformalar ətrafında qurulmuş, universal React tətbiqləri üçün framework və platformadır. O, tək bir JavaScript/TypeScript kod bazasından iOS, Android və veb üçün tətbiq qurmağa, deploy etməyə, test etməyə və sürətlə təkmilləşdirməyə imkan verir.

Expo framework-ü aşağıdakıları təqdim edir:

- **Expo CLI** — boş layihələr yaradan, sonra onları işə salan, build edən və yeniləyən komanda xətti aləti.
- **Expo Go** — layihələrinizi cihazınızda birbaşa işə salmaq üçün Android və iOS tətbiqi (native tətbiqi kompilyasiya və imzalamağa ehtiyac qalmadan) və komandanızla paylaşmaq imkanı.
- **Expo Snack** — React Native tətbiqlərini birbaşa brauzerdə yazmağa imkan verən onlayn oyun meydançası (playground).
- **Expo Application Services (EAS)** — Expo və React Native tətbiqləri üçün dərindən inteqrasiya olunmuş cloud xidmətləri toplusu. Tətbiqlər EAS vasitəsilə cloud-da kompilyasiya, imzalanma və mağazalara yüklənə bilir.

Expo hazır istifadəyə çox sayda funksiya ilə gəlir. Əvvəllər layihələrə müəyyən məhdudiyyət qoyurdu, çünki fərdi native modulları dəstəkləmirdi. Amma bu məhdudiyyət artıq mövcud deyil: Expo indi **development build**-lər və **config plugin**-lər vasitəsilə fərdi native kod əlavə etməyə və o native kodu (Android/Xcode layihələrini) fərdiləşdirməyə icazə verir.

> Qısası: Expo təcrübəsiz mobil developer üçün ideal başlanğıc nöqtəsidir, çünki native tərəfin mürəkkəbliyini bizdən gizlədir — məhz buna görə ilk React Native layihəmizi onunla quracağıq.

## Expo komanda xətti alətinin quraşdırılması və istifadəsi

Expo komanda xətti aləti tətbiqinizin işləməsi üçün lazım olan bütün scaffolding-i (baza struktur) yaradır. Bundan başqa, Expo development zamanı tətbiqi işlətməyi asanlaşdıran əlavə alətlərə də malikdir. Əvvəlcə mühiti və layihəni qurmaq lazımdır:

1. Expo-dan istifadə etməzdən əvvəl Node.js, Git və Watchman quraşdırılmalıdır. **Watchman** — layihədəki faylları izləyən və onlar dəyişəndə yenidən build kimi əməliyyatları tetikləyən alətdir. Bütün tələb olunan alətlər və detallar burada göstərilib: [docs.expo.dev/get-started/installation](https://docs.expo.dev/get-started/installation/#requirements).

2. Quraşdırma bitdikdən sonra aşağıdakı əmrlə yeni layihə başlada bilərik:

```bash
npx create-expo-app --template
```

Bu əmr sizin kompüterinizdə heç nə əvvəlcədən quraşdırılmasını tələb etmir — `npx` paketi müvəqqəti yükləyib bir dəfəlik icra edir.

3. Sonra CLI gələcək layihəniz haqqında suallar verəcək. Terminalda bunun kimi bir şey görəcəksiniz:

```
? Choose a template: › - Use arrow-keys. Return to submit.
    Blank
❯   Blank (TypeScript) - blank app with TypeScript enabled
    Navigation (TypeScript)
    Blank (Bare)
```

Biz **Blank (TypeScript)** seçimini edəcəyik — bu, TypeScript dəstəyi aktiv olan boş tətbiq şablonudur.

4. Növbəti addımda layihənin adı soruşulacaq:

```
? What is your app named? › my-project
```

Adını `my-project` qoyaq.

5. Bütün asılılıqlar quraşdırıldıqdan sonra Expo layihənizi sizin üçün tamamlayacaq:

```
✅ Your project is ready!
```

Boş React Native layihəsini yaratdıqdan sonra, indi Expo development server-ini kompüterinizdə necə işə salıb tətbiqi cihazlarınızdan birində necə görüntüləyəcəyinizi öyrənəcəyik.

## Tətbiqi telefonda görüntüləmək

React Native layihənizi development zamanı cihazınızda görmək üçün Expo development server-ini başlatmaq lazımdır:

1. Terminalda layihə qovluğunda olduğunuzdan əmin olun:

```bash
cd path/to/my-project
```

2. `my-project` qovluğuna daxil olduqdan sonra development server-i başlatmaq üçün bu əmri işlədin:

```bash
npm start
```

3. Bu, terminalda development server haqqında bəzi məlumat göstərəcək — QR kod və server ünvanı (məsələn, `exp://192.168.1.15:8081`), həmçinin klaviatura qısayolları: `a` — Android açmaq, `i` — iOS simulyator açmaq, `w` — veb açmaq, `r` — tətbiqi yenidən yükləmək və s.

4. Tətbiqi cihazlarımızda görmək üçün **Expo Go** tətbiqini quraşdırmaq lazımdır. Bunu Android üçün Play Store-da, iOS üçün isə App Store-da tapa bilərsiniz. Expo Go quraşdırıldıqdan sonra, cihazınızın kamerası ilə QR kodu skan edirsiniz.

   Əgər Expo Go və Expo CLI-a daxil olmusunuzsa, tətbiqi QR koda ehtiyac olmadan işlədə bilərsiniz — açılmış development sessiyaya sadəcə klikləmək kifayətdir.

5. QR kod skan olunan kimi (və ya açıq sessiyaya klikləndikdə) terminalda yeni log-lar və qoşulmuş yeni cihaz görünəcək:

```
iOS Bundling complete 205ms
```

6. Bundan sonra tətbiqiniz cihazda işə düşəcək.

Bu nöqtədə tətbiqinizi inkişaf etdirməyə hazırsınız. Əslində, eyni anda bir neçə fiziki cihazla işləmək istəyirsinizsə, bu prosesi hər biri üçün təkrarlaya bilərsiniz. Bu Expo qurğusunun ən yaxşı tərəfi odur ki, kompüterdə kod dəyişikliyi etdikcə fiziki cihazlarda **canlı yenilənmə** (live reloading) pulsuz təmin olunur. Gəlin bunu yoxlayaq:

1. `my-project` qovluğu daxilindəki `App.tsx` faylını açaq. Orada `App` component-ini görəcəksiniz:

```jsx
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
```

2. İndi şrifti qalın etmək üçün kiçik bir stil dəyişikliyi edək:

```jsx
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Open up App.tsx to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontWeight: "bold" },
});
```

Burada `text` adlı yeni stil əlavə edib onu `Text` component-inə tətbiq etdik. Faylı yadda saxlayıb cihazınıza qayıtsanız, dəyişikliyi dərhal görəcəksiniz — heç bir manual rebuild lazım deyil.

Tətbiqlərinizi fiziki cihazlarınızda lokal işlətməyi bacardığınıza görə, indi React Native tətbiqlərini **Expo Snack** xidməti vasitəsilə müxtəlif virtual cihaz emulyatorlarında işlətməyə baxaq.

## Tətbiqi Expo Snack-də görüntüləmək

Expo tərəfindən təqdim olunan **Snack** xidməti React Native kodunuz üçün bir oyun meydançasıdır. O, React Native layihə fayllarınızı elə kompüterinizdə olduğu kimi təşkil etməyə imkan verir. Üzərində işləmək dəyər gördüyünüz bir şey qurmusunuzsa, Snack-inizi export edə bilərsiniz. Həmçinin Expo hesabı yaradıb Snack-lərinizi saxlaya, üzərində işləməyə davam edə, yaxud başqaları ilə paylaşa bilərsiniz. Expo Snack-i bu linkdə tapa bilərsiniz: [snack.expo.dev](https://snack.expo.dev/).

React Native tətbiqini Expo Snack-də sıfırdan yarada bilərik — bu halda o, Expo hesabında saxlanılır — və ya mövcud layihələri Git repozitorisindən import edə bilərik. Repozitori import etməyin gözəl tərəfi ondadır ki, Git-ə dəyişiklik push etdikdə Snack-iniz də avtomatik yenilənir.

Snack layihə menyusundakı **Import git repository** düyməsinə klikləyib repozitori URL-ni yapışdıra bilərsiniz. Repozitori import olunub Snack saxlanıldıqdan sonra, Git repozitorisinin yerini əks etdirən yenilənmiş Snack URL-i alacaqsınız.

Bu URL-i açsanız, Snack interfeysi yüklənəcək və işə salmazdan əvvəl kodda dəyişiklik edib test edə biləcəksiniz. Snack-in əsas üstünlüyü onu virtual cihazlarda asanlıqla işlətmək imkanıdır. Tətbiqinizi virtual cihazda işlətmək üçün idarəetmə elementləri UI-nin sağ tərəfindədir:

- Yuxarıdakı idarəetmə elementi hansı cihaz tipinin emulyasiya olunacağını (Android, iOS, yaxud Web) təyin edir.
- **Tap to play** düyməsi seçilmiş virtual cihazı işə salır.
- **Run on your device** düyməsi tətbiqi QR kod üsulu ilə Expo Go-da işlətməyə imkan verir.

Bu nümunə tətbiq sadəcə mətn göstərir və ona bir neçə stil tətbiq edir, ona görə fərqli platformalarda demək olar eyni görünür. React Native fəsillərini davam etdirdikcə, Snack kimi bir alətin iki platforma arasındakı fərqləri anlamaq üçün müqayisələr aparmaqda nə qədər faydalı olduğunu görəcəksiniz.

## Nəticə

Bu fəsildə Expo komanda xətti aləti vasitəsilə React Native layihəsinə necə başlamağı öyrəndik. Əvvəlcə Expo alətini necə quraşdırmağı gördük. Sonra yeni React Native layihəsini necə başlatmağı öyrəndik. Ardınca Expo development server-ini işə saldıq və server UI-nin müxtəlif hissələri ilə tanış olduq.

Xüsusilə, development server-i tətbiqinizi test etmək istədiyiniz istənilən cihazdakı Expo tətbiqi ilə necə birləşdirməyi öyrəndik. Expo həmçinin kod parçaları və ya bütün Git repozitoriləri ilə eksperiment etməyə imkan verən Snack xidmətinə malikdir. Repozitorini necə import edib virtual iOS və Android cihazlarında işlətməyi gördük.

> Yəni bir neçə komanda ilə boş layihədən başlayaraq, telefonunuzda canlı işləyən, hər kod dəyişikliyi ilə ani yenilənən React Native tətbiqinə çatmaq mümkündür.

Əvvəllər native tətbiq görmək üçün Xcode/Android Studio ilə tam build tsikli lazım idi — indi isə `npm start` və bir QR kod skanı kifayətdir. Növbəti fəsildə React Native tətbiqlərimizdə responsive layout-ların necə qurulacağına baxacağıq.

# Flexbox ilə Responsive Layout Necə Qurulur?

Mobil ekranda component-ləri düzgün yerləşdirmək veb-dəki CSS təcrübəsindən fərqlidir. Xoşbəxtlikdən React Native köhnə CSS layout üsullarını (float, table-based layout) yox, birbaşa **Flexbox** modelini polyfill edir — yəni veb development-dən tanış olan bacarıqlar burada da işləyir, sadəcə bir neçə fərqlə.

Bu yazıda əvvəlcə Flexbox-un məntiqini, sonra React Native-də stil yazma üsullarını, ardından Styled Components alternativini, nəhayət bir neçə real layout nümunəsini görəcəyik.

## Flexbox nədir?

Flexbox-dan əvvəl layout qurmaq üçün float kimi əslində başqa məqsəd üçün (mətnin şəkil ətrafında dolanması) yaradılmış üsullardan istifadə olunurdu — bu da xətalara açıq, qarışıq kod demək idi. Flexbox bunu həll edir: layout üçün lazım olan bütün hesablamaları öz üzərinə götürür.

Konseptual olaraq Flexbox sadədir: bir **container** var, onun daxilində **child element**-lər var. Həm container, həm də child-lar ekranda necə render olunacağına görə "flexible"dir.

> Flexbox container-lərinin bir **direction**-u var: `column` (yuxarı/aşağı) və ya `row` (sol/sağ). Diqqət: bu, elementlərin ekranda necə düzüləcəyini yox, "box"un hansı istiqamətdə uzanacağını göstərir.

Bura çox adamı çaşdıran yerdir: `flexDirection: "row"` desək, elementlər bir-birinin **yanında** (soldan sağa) düzülür — sətirlər bir-birinin üstünə yığılmır. Yəni "row" — elementlərin axdığı istiqamətdir, ekranda vizual sətir demək deyil.

## React Native-də stillər necə yazılır?

React Native stil faylı CSS faylı deyil — sadə JavaScript obyektidir:

```jsx
import { Platform, StyleSheet, StatusBar } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "ghostwhite",
    ...Platform.select({
      ios: { paddingTop: 20 },
      android: { paddingTop: StatusBar.currentHeight },
    }),
  },
  box: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
  },
  boxText: {
    color: "darkslategray",
    fontWeight: "bold",
  },
});
```

Diqqət edin: property adları veb CSS-ə çox bənzəyir, sadəcə camelCase yazılır (`justify-content` yox, `justifyContent`). `StyleSheet.create()` çağırıb export etmək kifayətdir.

Burada maraqlı hissə `Platform.select()`-dır:

```jsx
...Platform.select({
  ios: { paddingTop: 20 },
  android: { paddingTop: StatusBar.currentHeight },
})
```

Bu funksiya cihazın platformasına (iOS/Android) uyğun fərqli stil qaytarır. Məqsəd sadədir: container-in üst hissəsi status bar-ın altında qalmasın. iOS-da sabit `20`, Android-də isə `StatusBar.currentHeight` dəyəri istifadə olunur — çünki hər ikisində eyni API mövcud olsaydı, bu workaround-a ehtiyac qalmazdı.

Stillər component-lərə `style` prop-u ilə verilir:

```jsx
import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.boxText}>I'm in a box</Text>
      </View>
    </View>
  );
}
```

Analoji üçün: `<View>` veb-dəki `<div>`-ə, `<Text>` isə `<p>`-yə bənzəyir — sadəcə mobil render mühitində.

## Styled Components alternativi

Stil yazmağın yeganə yolu obyekt deyil — `styled-components` kitabxanası ilə CSS-in-JS yanaşması da mövcuddur. Quraşdırmaq üçün:

```bash
npm install --save styled-components
```

Yuxarıdakı `Box` komponentini bununla yenidən yazsaq:

```jsx
import styled from "styled-components/native";

const Box = styled.View`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
`;

const BoxText = styled.Text`
  color: darkslategray;
  font-weight: bold;
`;
```

İstifadəsi də sadədir — əlavə `style` prop-u lazım deyil:

```jsx
const App = () => {
  return (
    <Box>
      <BoxText>I'm in a box</BoxText>
    </Box>
  );
};
```

> Qeyd: performans səbəbindən sonrakı nümunələrdə `StyleSheet` obyektlərinə sadiq qalınacaq, `styled-components` isə seçim olaraq qalır.

## Flexbox layout nümunələri

### Sadə üç-sütunlu layout

Üç bölmənin yuxarıdan aşağı (`column`) düzüldüyü sadə layout:

```jsx
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.boxText}>#1</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>#2</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>#3</Text>
      </View>
    </View>
  );
}
```

```jsx
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "ghostwhite",
  },
  box: {
    width: 300,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "darkslategray",
  },
  boxText: {
    color: "darkslategray",
    fontWeight: "bold",
  },
});
```

`container`-in `flex` və `flexDirection` property-ləri sətirlərin yuxarıdan aşağı axmasını təmin edir. `alignItems` child-ları mərkəzə düzür, `justifyContent: "space-around"` isə onların arasına bərabər boşluq əlavə edir.

Bu layout-un problemi: cihaz landscape (üfüqi) mövqeyə çevriləndə sol-sağ tərəflərdə çoxlu boş yer qalır — çünki `box` sabit `width: 300` dəyərinə bağlıdır.

### Təkmilləşdirilmiş üç-sütunlu layout

Sabit `width` əvəzinə `alignSelf: "stretch"` istifadə etsək, box-lar mövcud sahəni tam tutur:

```jsx
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "ghostwhite",
    justifyContent: "space-around",
  },
  box: {
    height: 100,
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: "lightgray",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "darkslategray",
  },
  boxText: {
    color: "darkslategray",
    fontWeight: "bold",
  },
});
```

Əsas dəyişiklik `alignSelf: "stretch"`-dir — bu, container-in `flexDirection`-una uyğun olaraq (bu halda `column` olduğu üçün) box-un **genişliyini** avtomatik doldurmasını təmin edir. Nəticədə həm portrait, həm landscape rejimdə bütün ekran genişliyi istifadə olunur, boş yer qalmır.

Təkrarlanan stilləri yığcamlaşdırmaq üçün ayrıca `Box` komponenti çıxarmaq məntiqlidir:

```jsx
export default function Box({ children }) {
  return (
    <View style={styles.box}>
      <Text style={styles.boxText}>{children}</Text>
    </View>
  );
}
```

### Flexible row-lar

İndi əks istiqamətə keçək: bölmələr soldan sağa düzülsün, amma yuxarıdan aşağı uzansın.

```jsx
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "ghostwhite",
    alignItems: "center",
    justifyContent: "space-around",
  },
  box: {
    width: 100,
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: "lightgray",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "darkslategray",
  },
  boxText: {
    color: "darkslategray",
    fontWeight: "bold",
  },
});
```

```jsx
export default function App() {
  return (
    <View style={styles.container}>
      <Box>#1</Box>
      <Box>#2</Box>
    </View>
  );
}
```

Burada `alignSelf: "stretch"` istiqamət göstərmir — sadəcə "mövcud oxda uzan" deyir. Container `row` olduğu üçün box-lar yuxarıdan aşağı uzanır; `flexDirection: "row"` sayəsində aralarındaki boşluq isə soldan sağa yerləşir.

### Flexible grid

Bəzən neçə sütun olacağını əvvəldən bilmirsiniz — sadəcə mövcud sahəyə uyğun sığan qədər element bir sətirdə, qalanı növbəti sətirdə göstərilsin istəyirsiniz. Flexbox bunu avtomatik edir:

```jsx
const boxes = new Array(10).fill(null).map((v, i) => i + 1);

export default function App() {
  return (
    <View style={styles.container}>
      {boxes.map((i) => (
        <Box key={i}>#{i}</Box>
      ))}
    </View>
  );
}
```

Hər child-ın ölçüsü həmin sətirdə neçəsinin sığacağını təyin edir — sətir sayını əvvəldən hesablamağa ehtiyac yoxdur.

### Flexible row + column birləşməsi

Sonuncu addım: row-ları column-lar daxilində (və ya əksinə) nest etmək. Bunun üçün iki köməkçi komponent kifayətdir:

```jsx
export default function Row({ children }) {
  return <View style={styles.row}>{children}</View>;
}
```

```jsx
export default function Column({ children }) {
  return <View style={styles.column}>{children}</View>;
}
```

Fərq yalnız tətbiq olunan stildədir (`row` və `column`) — hər ikisi sadəcə JSX-i daha oxunaqlı etmək üçün abstraksiyadır. Bu yanaşmayla, məsələn, `#1` və `#2`-ni bir `<Column>` daxilinə qoysanız, `#2` `#1`-in yanında yox, altında görünür — çünki ikisi də eyni column-un içindədir, bu column-lar isə öz növbəsində bir row-un daxilindədir.

## Nəticə

Flexbox React Native-də əsas layout mexanizmidir — veb-də öyrəşdiyiniz `flexDirection`, `justifyContent`, `alignItems`, `alignSelf` kimi property-lər burada da işləyir, sadəcə stillər CSS faylı yox, JavaScript obyekti şəklində yazılır.

> Sabit ölçülərlə (`width: 300`) qurulan layout portrait-də yaxşı görünsə də, landscape-də boş yer yaradır — `alignSelf: "stretch"` bu problemi aradan qaldırır və layout-u istənilən ekran ölçüsünə uyğunlaşdırır.

Növbəti fəsildə React Native tətbiqlərində naviqasiyanın necə qurulacağına baxılacaq.

# Ekranlar Arasında Necə Naviqasiya Etməli?

Veb tətbiqində naviqasiya URL üzərində qurulur — brauzer ünvan zolağında kod görürsən, geriyə/irəli düymələr işləyir. Mobil tətbiqdə isə istifadəçi heç bir URL görmür. Ekran adı, parametrlər, geri qayıtma məntiqi — hamısı kodun içində idarə olunmalıdır. React Native-in köhnə versiyalarında bunun üçün `Navigator` və `NavigatorIOS` kimi primitiv komponentlər var idi, amma bunlar mürəkkəb, platformalar arası uyğunsuz və performans problemli idi.

Bugün standart həll `react-navigation` paketidir. Bu yazıda naviqasiyanın əsaslarını, ekranlara parametr ötürməni, header-in tənzimlənməsini, tab/drawer naviqasiyanı və nəhayət fayl-əsaslı (file-based) naviqasiya yanaşmasını görəcəyik.

## Naviqasiyanın əsasları

Əvvəlcə lazım olan paketləri quraşdırmaq lazımdır:

```bash
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
```

Sonra `App` komponentində "stack" naviqator qurulur — yəni ekranlar bir-birinin üstünə yığılan (stack) formada açılır, tam veb-dəki browser history-si kimi:

```jsx
import Home from "./Home";
import Settings from "./Settings";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

`createNativeStackNavigator()` iki şey qaytarır: `Screen` və `Navigator` komponentləri. `Stack.Screen` hər ekranı adıyla qeydiyyatdan keçirir, `Stack.Navigator` isə onları əhatə edir. `<NavigationContainer>` isə mütləq lazımdır — bütün ekranlara naviqasiya funksionallığını ötürən əsas "kontekst"dir.

İndi `Home` ekranına baxaq:

```jsx
type Props = NativeStackScreenProps<RootStackParamList>;

export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>Home Screen</Text>
      <Button
        title="Settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
}
```

Adi funksional komponentdir — state və ya lifecycle metoduna ehtiyac olmadığı üçün class-a lüzum yoxdur. Diqqət çəkən yer `navigation.navigate("Settings")` çağırışıdır: veb-də URL-ə keçdiyin yerdə, mobil-də ekranın adını naviqasiya API-sinə ötürürsən.

Tip təhlükəsizliyi üçün bütün marşrutları təsvir edən `RootStackParamList` tipi yaradılır:

```jsx
export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};
```

Hər marşruta `undefined` verilir, çünki bu misalda parametr yoxdur. Nəticədə `navigation.navigate()` yalnız `"Home"` və ya `"Settings"` adlarını qəbul edir — səhv ad yazsan, TypeScript xəbərdarlıq edəcək.

`Settings` ekranı demək olar eynidir, sadəcə geri `Home`-a qayıdır:

```jsx
type Props = NativeStackScreenProps<RootStackParamList>;

export default function Settings({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>Settings Screen</Text>
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
```

> `react-navigation` avtomatik olaraq yuxarıda ağ naviqasiya paneli (header) çəkir, sol tərəfdə isə geri düyməsi görünür — brauzerin geri düyməsi kimi işləyir. Android-də isə cihazın öz fiziki/gesture geri düyməsi də eyni işi görür.

Bu sayədə tətbiqin layout-unda status bar-la üst-üstə düşmə problemini düşünməyə ehtiyac qalmır — hər ekran öz məzmununa fokuslana bilər.

## Marşrut parametrləri (route parameters)

Veb tətbiqlərində detal səhifəsinə keçəndə URL-ə identifikator əlavə edirsən (`/product/42` kimi). `react-navigation`-da da eyni konsepsiya var — sadəcə URL-ə yox, `navigate()` çağırışına ikinci arqument kimi ötürülür.

Əvvəlcə `RootStackParamList`-ə `Details` marşrutu üçün gözlənilən parametr formasını əlavə edirik:

```jsx
export type RootStackParamList = {
  Home: undefined;
  Details: { title: string };
};
```

`Home` ekranında üç düymə var, hər biri `Details`-ə fərqli `title` parametri ilə keçir:

```jsx
type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>Home Screen</Text>
      <Button
        title="First Item"
        onPress={() => navigation.navigate("Details", { title: "First Item" })}
      />
      <Button
        title="Second Item"
        onPress={() => navigation.navigate("Details", { title: "Second Item" })}
      />
      <Button
        title="Third Item"
        onPress={() => navigation.navigate("Details", { title: "Third Item" })}
      />
    </View>
  );
}
```

`Details` ekranı isə bu parametri `route.params`-dan oxuyur:

```jsx
type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function ({ route }: Props) {
  const { title } = route.params;
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>{title}</Text>
    </View>
  );
}
```

> Marşrut parametrlərini React komponentinə `props` ötürmək kimi düşünə bilərsən — sadəcə burada "prop"u `navigate()` çağırışı ötürür, valideyn komponent yox.

Bu misalda tək `title` ötürülür, amma istənilən sayda parametr əlavə etmək mümkündür — hər biri eyni `route.params` obyektinin daxilində gələcək. Bu üsul olmasaydı, hər məhsul üçün ayrı-ayrı komponent yazmaq lazım gələrdi.

## Naviqasiya header-i

İndiyə qədər gördüyümüz header-lər boşdur — sadəcə geri düyməsi var, çünki heç bir tənzimləmə vermədik. Hər ekran öz header məzmununu ayrıca konfiqurasiya edə bilər.

`App` komponentində `Details` ekranına `headerRight` əlavə edək — sağ tərəfdə "Buy" düyməsi:

```jsx
const Stack = createNativeStackNavigator<RoutesParams>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Details"
          component={Details}
          options={({ route }) => ({
            headerRight: () => {
              return (
                <Button
                  title="Buy"
                  onPress={() => {}}
                  disabled={route.params.stock === 0}
                />
              );
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

`Screen` komponenti `options` prop-unu obyekt və ya funksiya şəklində qəbul edir. Burada funksiya seçilib, çünki `route.params.stock` dəyərinə görə düyməni deaktiv etmək lazımdır — stok `0`-dırsa, "Buy" düyməsi basıla bilməz.

`Home` ekranı indi əlavə parametrlər ötürür — `content` və `stock`:

```jsx
type Props = NativeStackScreenProps<RoutesParams, "Home">;

export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Button
        title="First Item"
        onPress={() =>
          navigation.navigate("Details", {
            title: "First Item",
            content: "First Item Content",
            stock: 1,
          })
        }
      />
      {/* ... digər düymələr eyni məntiqlə */}
    </View>
  );
}
```

`Details` ekranı isə `navigation.setOptions()` ilə öz başlığını dinamik təyin edir:

```jsx
type Props = NativeStackScreenProps<RoutesParams, "Details">;

export default function Details({ route, navigation }: Props) {
  const { content, title } = route.params;

  React.useEffect(() => {
    navigation.setOptions({ title });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>{content}</Text>
    </View>
  );
}
```

Nəticə: header başlığı `title` parametrinə görə dəyişir, sağdakı "Buy" düyməsi isə `stock` dəyəri `1`-dirsə aktiv, `0`-dırsa deaktiv görünür. Yəni header-i həm `Screen`-in `options` prop-u ilə (statik/route-əsaslı), həm də ekranın öz içindən `setOptions()` ilə (dinamik) idarə etmək mümkündür.

## Tab və drawer naviqasiya

İndiyədək bütün nümunələr `Button`-la ekranlar arası keçid edirdi. Amma `react-navigation` ekran siyahısından avtomatik tab paneli və ya yan drawer (çəkmə) menyusu qura bilir.

Lazım olan paketlər:

```bash
npm install @react-navigation/bottom-tabs @react-navigation/drawer
npx expo install react-native-gesture-handler react-native-reanimated
```

Drawer üçün `babel.config.js`-ə plugin əlavə edilməlidir:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"],
  };
};
```

Bu misalda iOS-da alt tab naviqasiyası, Android-də isə drawer istifadə olunur — sırf fərqli üsulları göstərmək üçün, məcburiyyət deyil, hər iki platformada eyni üsulu seçmək tam mümkündür:

```jsx
const Tab = createBottomTabNavigator<Routes>();
const Drawer = createDrawerNavigator<Routes>();

export default function App() {
  return (
    <NavigationContainer>
      {Platform.OS === "ios" && (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="News" component={News} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      )}
      {Platform.OS === "android" && (
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="News" component={News} />
          <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}
```

`Platform.OS` dəyərinə görə hansı naviqatorun render olunacağı seçilir. Hər iki naviqator özündə `Navigator`/`Screen` cütünü saxlayır — struktur `Stack`-la eynidir, sadəcə vizual təqdimat fərqlidir.

Ekranların özü çox sadədir:

```jsx
export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Home Content</Text>
    </View>
  );
}
```

iOS-da nəticə: ekranın altında üç tab düyməsi, aktiv olan vurğulanır. Android-də isə drawer solda gizlidir — açmaq üçün ekranın sol kənarından sürüşdürmək (swipe) lazımdır; açıldıqdan sonra siyahıdan ekran seçilir.

> Drawer-in sol tərəfdən açılması defolt davranışdır, amma istənilən istiqamətdən açılacaq şəkildə konfiqurasiya etmək mümkündür.

## Fayl-əsaslı naviqasiya (Expo Router)

Bu yanaşma Next.js-in routing məntiqinə bənzəyir: yeni ekran əlavə etmək üçün sadəcə `app` qovluğuna yeni fayl qoyursan — heç bir `Stack.Screen` qeydiyyatı lazım deyil. Expo Router öz daxilində React Navigation üzərində qurulub, ona görə eyni options və parametrlər dəstəklənir.

Yeni layihəni "Navigation (TypeScript)" şablonuyla qurmaq kifayətdir:

```bash
npx create-expo-app –template
```

`app` qovluğu daxilində `_layout.tsx` — tətbiqin kök layer-i:

```jsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
```

`index.tsx` — Home ekranı. Diqqət: burda `navigation` prop-u yoxdur, əvəzinə veb-dəki kimi `href` qəbul edən `Link` komponenti işlədilir:

```jsx
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>Home Screen</Text>
      <Link href="/settings" asChild>
        <Button title="Settings" />
      </Link>
    </View>
  );
}
```

`settings.tsx` isə eyni məntiqlə geri `"/"` ünvanına keçir:

```jsx
import { Link } from "expo-router";

export default function Settings() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>Settings Screen</Text>
      <Link href="/" asChild>
        <Button title="Home" />
      </Link>
    </View>
  );
}
```

Fayl adı birbaşa marşrutu təyin edir — `settings.tsx` faylı `/settings` ünvanına çevrilir. Bunun əlavə bonusu: deep linking (tətbiqi birbaşa müəyyən ekrana açan xarici link) əlavə konfiqurasiya olmadan işləyir, çünki hər ekranın onsuz da URL-oxşar ünvanı var.

## Nəticə

Mobil tətbiqdə naviqasiya veb-dəki qədər tanış URL anlayışına söykənmir, amma konseptual olaraq eyni məsələni həll edir: istifadəçini bir ekrandan digərinə məntiqli, ardıcıl şəkildə aparmaq. `react-navigation` bunu stack, tab, drawer naviqatorları və marşrut parametrləri ilə təmin edir; `Expo Router` isə eyni əsasın üzərində fayl-əsaslı, veb-oxşar (`Link`, `href`) təcrübə təklif edir.

> Köhnə `Navigator`/`NavigatorIOS` komponentləri ilə əziyyət çəkməkdənsə, bu gün `react-navigation` (və ya onun fayl-əsaslı qatı Expo Router) mobil naviqasiyanı veb development qədər sadə və proqnozlaşdırıla bilən edir.

# React Native-də Siyahıları Necə Render Etməli?

Veb tətbiqdə siyahı qurmaq asandır — `<ul>` və `<li>` yaz, qurtardı. Mobil dünyada isə bu qədər sadə deyil: min ədəd elementi eyni anda ekrana çəksən, tətbiq donar, yaddaş dolar, scroll sıçrayır. React Native bu problemi `FlatList` komponenti ilə həll edir — iOS və Android-də eyni cür işləyən, hazır scroll və performans məntiqi olan siyahı komponenti.

Bu yazıda FlatList-in əsaslarından başlayıb, siyahını filtrləmə/sıralama idarəetmələri ilə zənginləşdirməyə, şəbəkədən (API-dan) məlumat çəkməyə, sonsuz scroll (infinite scroll) qurmağa və "dartıb yeniləmə" (pull-to-refresh) jestinə qədər gedəcəyik.

## FlatList əslində nə edir?

`FlatList` `data` prop-u qəbul edir — obyektlərdən ibarət array. Hər obyektin `key` xassəsi olmalıdır (React-də `<li>`-lərə `key` verməli olduğun kimi — React siyahı dəyişəndə hansı elementin dəyişdiyini bununla bilir). `key` yoxdursa, `keyExtractor` prop-u ilə hansı sahədən key çıxarılacağını özün göstərə bilərsən.

100 elementlik sadə siyahı belə qurulur:

```jsx
const data = new Array(100)
  .fill(null)
  .map((v, i) => ({ key: i.toString(), value: `Item ${i}` }));

export default function App() {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text style={styles.item}>{item.value}</Text>}
      />
    </View>
  );
}
```

`data` — 100 `null` dəyərlə doldurulmuş array-i map edərək yaradılan obyektlər toplusu. Hər obyektdə məcburi `key`, əlavə olaraq öz istədiyin `value` xassəsi var. `FlatList` mütləq `<View>` içində olmalıdır, çünki scroll işləməsi üçün konteynerin hündürlüyü (height) olmalıdır.

Stil tərəfi belədir:

```js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 40,
  },
  item: {
    margin: 5,
    padding: 5,
    color: "slategrey",
    backgroundColor: "ghostwhite",
    textAlign: "center",
  },
});
```

`container.flex: 1` konteynerə mövcud bütün hündürlüyü verir — bu olmasa scroll işləməz. `item` stili isə hər sətri fərqləndirir, əks halda hamısı sadəcə mətn kimi bir-birinə qarışardı.

> `FlatList` qəsdən "gic-gic" komponentdir — necə görünəcəyini o həll etmir, sənə buraxır. Onun işi yalnız: data dəyişəndə səmərəli yenidən render et, scroll ver.

## Filtrləmə və sıralama idarəetmələri

Sadə siyahı üzərinə axtarış və sıralama düymələri əlavə etmək istəyəndə, komponentləri parçalamaq mənalı olur. Struktur belədir:

- **ListContainer** — bütün state-i saxlayan əsas konteyner (React-in tanış "container pattern"-i)
- **List** — state-siz komponent, `ListControls`-a və `FlatList`-a lazımi parçaları ötürür
- **ListControls** — filtr və sıralama idarəetmələrini bir yerə yığan komponent
- **ListFilter** — mətnlə filtrləmə üçün input
- **ListSort** — sıralama istiqamətini (artan/azalan) dəyişən düymə
- **FlatList** — elementləri faktiki render edən React Native komponenti

Əgər siyahına idarəetmə lazımdırsa, bu bölünmə artıq yük deyil — əksinə, yaxşı düşünülmüş komponent arxitekturasından fayda görəcəksən.

Əvvəlcə köməkçi funksiyalar və data massivi:

```js
function mapItems(items) {
  return items.map((value, i) => ({ key: i.toString(), value }));
}

const array = new Array(100).fill(null).map((v, i) => `Item ${i}`);

function filterAndSort(text, asc) {
  return array
    .filter((i) => text.length === 0 || i.includes(text))
    .sort(
      asc
        ? (a, b) => (a > b ? 1 : a < b ? -1 : 0)
        : (a, b) => (b > a ? 1 : b < a ? -1 : 0)
    );
}
```

`ListContainer`-də `asc` (sıralama istiqaməti) və `filter` (axtarış mətni) state kimi saxlanır, nəticə isə `useMemo` ilə hesablanır:

```jsx
export default function ListContainer() {
  const [asc, setAsc] = useState(true);
  const [filter, setFilter] = useState("");

  const data = useMemo(() => {
    return filterAndSort(filter, asc);
  }, [filter, asc]);

  return (
    <List
      data={mapItems(data)}
      asc={asc}
      onFilter={(text) => setFilter(text)}
      onSort={() => setAsc(!asc)}
    />
  );
}
```

`useMemo` sayəsində `filter` və ya `asc` dəyişməyəndə nəticə yenidən hesablanmır — lazımsız iş görülmür. `ListContainer`-in tək işi: state-i saxlamaq və onu dəyişən funksiyaları uşaq komponentlərə ötürmək.

`List` komponenti sadədir — `FlatList`-i render edir, idarəetmələri isə `ListHeaderComponent` prop-u ilə siyahının başına yerləşdirir:

```jsx
export default function List({ data, ...props }) {
  return (
    <FlatList
      data={data}
      ListHeaderComponent={<ListControls {...props} />}
      renderItem={({ item }) => <Text style={styles.item}>{item.value}</Text>}
    />
  );
}
```

`ListHeaderComponent`-in üstünlüyü budur: idarəetmələr scroll olunan hissədən kənarda qalır, yəni istifadəçi nə qədər aşağı scroll etsə də, filtr və sıralama düymələri həmişə görünən qalır.

`ListControls` iki alt-idarəetməni birləşdirir:

```jsx
export default function ListControls({ onFilter, onSort, asc }) {
  return (
    <View style={styles.controls}>
      <ListFilter onFilter={onFilter} />
      <ListSort onSort={onSort} asc={asc} />
    </View>
  );
}
```

`ListFilter` sadə mətn inputudur:

```jsx
export default function ListFilter({ onFilter }) {
  return (
    <View>
      <TextInput
        autoFocus
        placeholder="Search"
        style={styles.filter}
        onChangeText={onFilter}
      />
    </View>
  );
}
```

`ListSort` isə ox işarəsinə basılanda sıralamanı dəyişən kiçik komponentdir:

```jsx
const arrows = new Map([
  [true, "▼"],
  [false, "▲"],
]);

export default function ListSort({ onSort, asc }) {
  return <Text onPress={onSort}>{arrows.get(asc)}</Text>;
}
```

Nəticədə: default olaraq siyahı artan sırada göstərilir, axtarış boşdursa placeholder "Search" görünür. İstifadəçi həm filtri, həm sıralamanı istənilən ardıcıllıqla dəyişə bilər — hər ikisi eyni `ListContainer` state-inin parçasıdır.

## Siyahı məlumatını API-dan çəkmək

Real layihədə data adətən backend-dən gəlir. Yaxşı xəbər budur ki, `fetch()` React Native-də veb-dəki kimi işləyir — kod demək olar eynidir.

Əvvəlcə `fetch()`-i təqlid edən mock API:

```js
const items = new Array(100).fill(null).map((v, i) => `Item ${i}`);

function filterAndSort(data, text, asc) {
  return data
    .filter((i) => text.length === 0 || i.includes(text))
    .sort(
      asc
        ? (a, b) => (b > a ? -1 : a === b ? 0 : 1)
        : (a, b) => (a > b ? -1 : a === b ? 0 : 1)
    );
}

export function fetchItems(filter, asc) {
  return new Promise((resolve) => {
    resolve({
      json: () =>
        Promise.resolve({
          items: filterAndSort(items, filter, asc),
        }),
    });
  });
}
```

İndi `ListContainer` lokal data yerinə `fetchItems()`-dən istifadə edir — komponent ilk yüklənəndə `useEffect` ilə data çəkilir:

```jsx
export default function ListContainer() {
  const [asc, setAsc] = useState(true);
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchItems(filter, asc)
      .then((resp) => resp.json())
      .then(({ items }) => {
        setData(mapItems(items));
      });
  }, []);

  return (
    <List
      data={data}
      asc={asc}
      onFilter={(text) => {
        fetchItems(text, asc)
          .then((resp) => resp.json())
          .then(({ items }) => {
            setFilter(text);
            setData(mapItems(items));
          });
      }}
      onSort={() => {
        fetchItems(filter, !asc)
          .then((resp) => resp.json())
          .then(({ items }) => {
            setAsc(!asc);
            setData(mapItems(items));
          });
      }}
    />
  );
}
```

Qayda sadədir: state-i dəyişən istənilən əməliyyat əvvəlcə `fetchItems()`-i çağırır, promise nəticələnəndə isə uyğun state yenilənir.

## Sonsuz scroll (lazy loading)

Bəzən istifadəçi konkret nə axtardığını bilmir — filtr/sıralama kömək etmir. Facebook lentini düşün: giriş edəndə axtarış deyil, scroll edərək kəşf edirsən. Bunun üçün `FlatList` siyahının sonuna çatanda yeni data çəkməlidir.

Test üçün sonsuz data mənbəyi lazımdır — generator bura mükəmməl uyğun gəlir:

```js
function* genItems() {
  let cnt = 0;
  while (true) {
    yield `Item ${cnt++}`;
  }
}

let items = genItems();

export function fetchItems({ refresh }) {
  if (refresh) {
    items = genItems();
  }
  return Promise.resolve({
    json: () =>
      Promise.resolve({
        items: new Array(30).fill(null).map(() => items.next().value),
      }),
  });
}
```

`ListContainer` isə hər çağırışda köhnə data-nın üstünə yenisini əlavə edir (əvəz etmir):

```jsx
import * as api from "./api";
import List from "./List";

export default function ListContainer() {
  const [data, setData] = useState([]);

  function fetchItems() {
    return api
      .fetchItems({})
      .then((resp) => resp.json())
      .then(({ items }) => {
        setData([
          ...data,
          ...items.map((value) => ({ key: value, value })),
        ]);
      });
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return <List data={data} fetchItems={fetchItems} />;
}
```

`List` komponenti isə `onEndReached` prop-unu istifadə edir — istifadəçi siyahının sonuna scroll edəndə bu funksiya avtomatik çağırılır:

```jsx
export default function List({ data, fetchItems }) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Text style={styles.item}>{item.value}</Text>}
      onEndReached={fetchItems}
    />
  );
}
```

Nəticədə: ekranın aşağısına yaxınlaşdıqca siyahı özü-özünə böyüyür. (Real layihədə əlbəttə hardasa dayanmalı, yəni backend-dən "daha data yoxdur" siqnalı gəlməlidir — amma məntiqin özü budur.)

## Dartıb yeniləmə (pull to refresh)

"Dartıb yeniləmə" jesti — ekranı barmaqla aşağı dartıb buraxanda content-in yenilənməsi — mobil dünyada çox tanış bir davranışdır. Bunu ilk dəfə Loren Brichter (Tweetie/Twitter for iPhone və Letterpress-in müəllifi) 2009-cu ildə tətbiq edib, sonra Apple bunu öz SDK-sına `UIRefreshControl` kimi daxil edib.

`FlatList`-də bunu aktivləşdirmək üçün cəmi iki prop kifayətdir:

```jsx
export default function List({ data, fetchItems, refreshItems, isRefreshing }) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Text style={styles.item}>{item.value}</Text>}
      onEndReached={fetchItems}
      onRefresh={refreshItems}
      refreshing={isRefreshing}
    />
  );
}
```

`onRefresh` — istifadəçi siyahını dartanda çağırılan funksiya. `refreshing` — `true` olanda yüklənmə spinner-i göstərir. `ListContainer`-də bunun üçün `isRefreshing` state-i saxlanır: API çağırışından əvvəl `true`, nəticə gələndən sonra `false` edilir. Beləcə `FlatList`-ə "yükləmə bitdi" siqnalı ötürülür.

## Nəticə

`FlatList` özü heç bir görünüş qərarı vermir — o, sadəcə data-nı səmərəli render etməyi və scroll-u idarə etməyi öz üzərinə götürür, qalan hər şeyi (necə göründüyünü) sənə buraxır. Bu yazıda gördün ki, eyni komponent üzərinə header-lə idarəetmə əlavə etmək (`ListHeaderComponent`), API-dan data çəkmək (`fetch`), sonsuz scroll qurmaq (`onEndReached`) və dartıb-yeniləmə (`onRefresh`/`refreshing`) əlavə etmək — hamısı bir neçə prop-la mümkündür.

Qısası: veb-də `<ul>`/`<li>` yazıb keçirsən, mobil-də isə `FlatList`-in verdiyi bu primitivləri necə birləşdirdiyin siyahının nə qədər "canlı" hiss olunacağını müəyyən edir.


# React Native-də Geolocation və Xəritələr Necə İşləyir?

Tətbiq istifadəçinin harada olduğunu bilirsə, çox şey mümkün olur: yaxınlıqdakı restoranı göstərmək, taksi çağırmaq, ya da sadəcə "sizə ən yaxın filial" kimi bir funksiya qurmaq. Bunun üçün React Native-də iki fərqli qat var: **Geolocation API** (koordinatları almaq üçün) və **react-native-maps** (o koordinatları xəritədə göstərmək üçün). Bu yazıda hər ikisini görəcəyik.

## Geolocation API — koordinat almaq

Veb-də tanış olduğumuz Geolocation API React Native-də də eyni məntiqlə işləyir, sadəcə mobil GPS-dən oxuyur. Amma özü-özlüyündə enlik/uzunluq (latitude/longitude) rəqəmləri istifadəçiyə heç nə demir — "40.4093, 49.8671" görəndə heç kim "aha, bu Bakıdır" demir. Bu rəqəmləri mənalı məlumata (ünvan, şəhər adı) çevirmək tətbiqin öz işidir.

Əvvəlcə Expo layihəsi yaradıb `expo-location` modulunu əlavə edirik:

```bash
npx create-expo-app where-am-i
npx expo install expo-location
```

### İcazə məsələsi

Mobil OS istifadəçinin yerini heç bir tətbiqə "avtomatik" vermir — hər dəfə açıq icazə tələb olunur. Bunu kodda `Location.requestForegroundPermissionsAsync()` çağırışı ilə edirik; bu, ekranda "İcazə ver / Rədd et" dialoqu açır.

Burada vacib incəlik: icazəni yalnız bir dəfə istəmək kifayət etmir — nəticəni də yoxlamaq lazımdır. İstifadəçi rədd edərsə, tətbiq çökməməli, sadəcə "yerinizi görə bilmirik" kimi başa düşülən bir vəziyyətə keçməlidir.

İcazəni real tətbiqdə əvvəlcədən `app.json`-da da elan etmək lazımdır ki, App Store/Play Store build zamanı bunu tanısın:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Tətbiq yerinizi göstərmək üçün icazə istəyir."
        }
      ]
    ]
  }
}
```

Bu konfiqurasiya faktiki icazə dialoqunu açmır — sadəcə build sisteminə "bu tətbiq location istəyəcək, ona görə mesaj mətni budur" deyir. Əsl sorğu yenə `requestForegroundPermissionsAsync()` ilə runtime-da olur, və bunu istifadəçi ilk dəfə location lazım olan ekrana düşən kimi (məsələn, app açılan kimi) etmək daha yaxşı təcrübədir — sonradan gözlənilmədən çıxan dialoq istifadəçini narahat edir.

### Koordinatı tutmaq

İki üsul var, və fərq vacibdir:

- `getCurrentPosition()` — bir dəfəlik "hazırda haradasan" sorğusu. Component mount olanda çağırılır.
- `watchPosition()` — istifadəçi hərəkət etdikcə callback-i təkrar-təkrar çağırır, canlı izləmə üçün.

Hər ikisi eyni callback-ə (məsələn `setPosition`) yönləndirilə bilər. Bu callback iki iş görür: birincisi, gələn latitude/longitude-u state-ə yazır; ikincisi, həmin koordinatları Google Maps Geocoding API-yə göndərib insan-oxunaqlı ünvana çevirir (API key `https://developers.google.com/maps/documentation/geocoding/start` ünvanından alınır).

> iOS simulyatorunda və Android Studio-da real cihaz olmadan da lokasiyanı menyudan dəyişmək mümkündür — hər dəfə fiziki telefona yükləməyə ehtiyac yoxdur.

Xam koordinatdan daha faydalısı — çevrilmiş ünvan mətnidir; bu, "yaxınlıqdakı bina/şirkət" kimi funksiyalar üçün işlək məlumatdır. Amma ən effektlisi koordinatı vizual olaraq xəritədə göstərməkdir — buna keçirik.

## MapView ilə xəritə render etmək

`react-native-maps` paketinin əsas komponenti `MapView`-dır. Marker, poliqon, heatmap kimi bir çox alət təqdim edir (ətraflı: `https://github.com/react-native-maps/react-native-maps`).

Minimal nümunə:

```jsx
import { View, StatusBar } from "react-native";
import MapView from "react-native-maps";
import styles from "./styles";

StatusBar.setBarStyle("dark-content");

export default () => (
  <View style={styles.container}>
    <MapView style={styles.mapView} showsUserLocation followsUserLocation />
  </View>
);
```

Bu iki boolean prop çox işi öz üzərinə götürür:

- `showsUserLocation` — cihazın fiziki mövqeyini xəritədə nöqtə ilə işarələyir.
- `followsUserLocation` — cihaz hərəkət etdikcə xəritəni həmin nöqtəyə görə yenidən mərkəzləşdirir (zoom edir).

> Praktik qayda: `showsUserLocation` işlədəndə demək olar həmişə `followsUserLocation`-u da yanına əlavə et — əks halda nöqtə görünür, amma xəritə istifadəçini "izləmir".

Default olaraq xəritə ətrafdakı obyektləri (points of interest) də göstərir — bunlar həmişə tətbiqin öz məzmununa uyğun gəlmir, ona görə növbəti addımda özümüzün annotasiyalarımızı əlavə edəcəyik.

## Öz nöqtələrini (marker) xəritəyə əlavə etmək

Fərz edək tətbiq yaxınlıqdakı pivə zavodlarını göstərir. `showsPointsOfInterest={false}` ilə default nöqtələri söndürüb, öz `Marker`-lərimizi əlavə edirik:

```jsx
<MapView
  style={styles.mapView}
  showsPointsOfInterest={false}
  showsUserLocation
  followsUserLocation
>
  <Marker
    title="Duff Brewery"
    description="Duff beer for me, Duff beer for you"
    coordinate={{
      latitude: 43.8418728,
      longitude: -79.086082,
    }}
  />
</MapView>
```

`Marker`-ə verilən `title` və `description` — istifadəçi nöqtəyə basanda çıxan callout balonunda göstərilən mətndir. Hər marker öz `coordinate`-i ilə xəritədə sabit yerdə qalır, `MapView`-in özü isə yalnız istifadəçinin mövqeyini izləməkdə davam edir.

## Overlay — region (ərazi) çəkmək

Bəzən tək nöqtə kifayət etmir, bütöv bir ərazini vurğulamaq lazımdır — məsələn, "bu məhəllədə IPA sevənlər çoxdur, o biri məhəllədə stout sevənlər". Region sadəcə bir neçə koordinat nöqtəsinin "nöqtədən-nöqtəyə" birləşməsidir, və `Polygon` komponenti ilə çəkilir:

```jsx
<MapView
  style={styles.mapView}
  showsPointsOfInterest={false}
  initialRegion={{
    latitude: 43.8486744,
    longitude: -79.0695283,
    latitudeDelta: 0.002,
    longitudeDelta: 0.04,
  }}
>
  {overlays.map((v, i) => (
    <Polygon
      key={i}
      coordinates={v.coordinates}
      strokeColor={v.strokeColor}
      strokeWidth={v.strokeWidth}
    />
  ))}
</MapView>
```

Burada `overlays` state dəyişənidir — hər element öz koordinat massivini, rəngini və xətt qalınlığını daşıyır. İki düymə (məsələn "IPA Fans" / "Stout Fans") bu state-i dəyişir, nəticədə köhnə poliqon xəritədən silinib yenisi çəkilir. Bu üsul, məsələn, "bu rayonda kirayə mənzil axtarışı" tipli tətbiqlərdə konkret nöqtə yox, bütöv ərazini vurğulamaq lazım olanda faydalıdır.

## Nəticə

Geolocation API xam koordinat verir, amma özü-özlüyündə mənasızdır — mənanı ona sən qatırsan (ünvana çevirmək, xəritədə göstərmək). `react-native-maps` isə bu koordinatları vizual formaya salır: `showsUserLocation`/`followsUserLocation` cütlüyü ilə "hardayam" sualına, `Marker` ilə "yaxınlıqda nə var" sualına, `Polygon` overlay ilə isə "hansı ərazi məni maraqlandırır" sualına cavab verirsən. Xam rəqəmdən tutmuş rəngli xəritəyə gedən yol elə bu üç addımdan keçir.

# React Native-də İstifadəçi Jestlərinə Necə Reaksiya Vermək Olar?

Veb tətbiqlərində demək olar hər şey siçanla idarə olunur — klik, hover, scroll təkəri. Mobil ekranda isə siçan yoxdur, hər şey barmaqla edilir: sürüşdürmə, toxunma, sağa-sola çəkmə. Bu, tamam fərqli reaksiya sistemi tələb edir.

Bu yazıda üç mövzuya baxacağıq: barmaqla scroll etmə, toxunmaya vizual geribildirim vermə, və sürüşdürülə (swipeable) bilən komponentlər qurma.

## Barmaqla scroll etmə

Veb tətbiqində scroll bar-ı siçanla sürüşdürürsən və ya təkəri fırladırsan. Mobil cihazda isə bunların heç biri yoxdur — hər şey ekrandakı jestlərlə idarə olunur. Aşağı scroll etmək istəyəndə barmağını ekranın üzərində yuxarı doğru hərəkət etdirirsən, məzmun da onunla bərabər sürüşür.

Bu, göründüyündən çətindir, çünki sadə sürüşdürmə deyil — sürətlə də hesablaşmaq lazımdır. Barmağını sürətlə çəkib buraxdıqda ekran həmin sürətlə "ətalətlə" (momentum) hərəkət etməyə davam edir, sonra barmağını yenidən toxundurduqda dayanır. Xoşbəxtlikdən, bütün bu mürəkkəbliyi `ScrollView` komponenti sənin əvəzinə həll edir.

`ScrollView`-i istənilən məzmunu (mətn, siyahı, digər komponentlər) əhatə etmək üçün istifadə edə bilərsən:

```jsx
export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        {new Array(20).fill(null).map((v, i) => (
          <View key={i}>
            <Text style={[styles.scrollItem, styles.text]}>Some text</Text>
            <ActivityIndicator style={styles.scrollItem} size="large" />
            <Switch style={styles.scrollItem} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
```

`ScrollView` tək başına işə yaramır — o, digər komponentləri əhatə etmək üçündür və düzgün işləməsi üçün hündürlüyə ehtiyacı var:

```js
scroll: {
  height: 1,
  alignSelf: "stretch",
},
```

`height: 1` qəribə görünsə də, `alignSelf: "stretch"` sayəsində elementlər düzgün göstərilir. Nəticədə ekranın sağında şaquli scroll zolağı görünür, məzmunu aşağı çəkdikcə o da hərəkət edir. İstəsən, məzmunu özbaşına sürüşdürüb sonra dayandıra bilərsən — sürət hissi tam saxlanılır.

> Jest sisteminin aşağı səviyyəli hissələrini "gesture responder" life-cycle metodları ilə özün də tənzimləyə bilərsən, amma bu, demək olar heç vaxt lazım olmur. Maraqlananlar üçün: reactnative.dev/docs/gesture-responder-system.

## Toxunmaya vizual geribildirim vermə

İndiyə qədərki nümunələrdə "düymə" kimi sadə mətndən istifadə edilib. Veb tətbiqində mətni kliklənə bilən etmək üçün sadəcə link (`<a>`) ilə əhatə edirsən. React Native-də isə link komponenti yoxdur — mətni düymə kimi göstərmək üçün stil vermək lazımdır.

Problem budur: mətni link kimi stilləndirmək mobil cihazda çətin basılan olur. Düymələr barmaq üçün daha böyük hədəf təqdim edir və toxunma geribildirimi tətbiq etmək daha asandır.

React Native bunun üçün üç fərqli komponent təklif edir:

- **TouchableOpacity** — basılanda düymənin şəffaflığı (opacity) azalır, bu vizual siqnal verir ki, toxunma qeydə alınıb.
- **TouchableHighlight** — şəffaflıq əvəzinə, düymənin üzərinə rəngli "highlight" qatı əlavə olunur.
- **Pressable API** — ən çevik variant. `onPressIn`, `onPressOut` və `onLongPress` kimi callback-lərlə istənilən toxunma effektini özün qura bilərsən.

Hansı yanaşmanı seçdiyinin fərqi yoxdur — vacib olan istifadəçiyə uyğun geribildirim verməkdir. Hətta eyni tətbiqdə fərqli məqsədlər üçün hamısından istifadə edə bilərsən.

Əvvəlcə `TouchableOpacity` və `TouchableHighlight` əsaslı iki komponent quraq:

```tsx
type ButtonProps = {
  label: string;
  onPress: () => void;
};

export const OpacityButton = ({ label, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export const HighlightButton = ({ label, onPress }: ButtonProps) => {
  return (
    <TouchableHighlight
      style={styles.button}
      underlayColor="rgba(112,128,144,0.3)"
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableHighlight>
  );
};
```

`activeOpacity={0.5}` basılan zaman şəffaflığın nə qədər azalacağını, `underlayColor` isə highlight rənginin nə olacağını təyin edir. Hər iki düymə eyni stildən istifadə edir:

```js
button: {
  padding: 10,
  margin: 5,
  backgroundColor: "azure",
  borderWidth: 1,
  borderRadius: 4,
  borderColor: "slategrey",
},
buttonText: {
  color: "slategrey",
},
```

İndi isə `Pressable` API əsaslı düyməyə baxaq — burada düymənin mətni toxunma vəziyyətinə görə dəyişir:

```tsx
const PressableButton = () => {
  const [text, setText] = useState("Not Pressed");
  return (
    <Pressable
      onPressIn={() => setText("Pressed")}
      onPressOut={() => setText("Press")}
      onLongPress={() => {
        setText("Long Pressed");
      }}
      delayLongPress={500}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        styles.button,
      ]}
    >
      <Text>{text}</Text>
    </Pressable>
  );
};
```

`onPressIn` barmaq düyməyə toxunan kimi, `onPressOut` isə barmaq çəkiləndə işə düşür. `delayLongPress={500}` — 500ms basılı saxlanılsa, `onLongPress` çağırılır. `style` prop-una funksiya ötürülür ki, `pressed` vəziyyətinə görə şəffaflıq dinamik hesablansın.

Üç düyməni də əsas `App` komponentində birləşdirmək belə görünür:

```jsx
export default function App() {
  return (
    <View style={styles.container}>
      <OpacityButton onPress={() => {}} label="Opacity" />
      <HighlightButton onPress={() => {}} label="Highlight" />
      <PressableButton />
    </View>
  );
}
```

Burada `onPress` callback-ləri boşdur, çünki onlar `ButtonProps`-un məcburi (required) sahəsi olduğu üçün ötürülüb — real tətbiqdə burada real məntiq olar.

## Sürüşdürülə bilən (Swipeable) və ləğv edilə bilən komponentlər

Nativ mobil tətbiqlərin veb tətbiqlərindən daha intuitiv olmasının bir səbəbi jestlərdir. Məsələn, bir elementi barmaqla ekrandan kənara sürüşdürmək çox yayılmış jestdir — amma bu jestin "kəşf edilə bilən" olması lazımdır.

Təsəvvür et: tətbiqdə nəyisə basıb sürüşdürməyə çalışırsan, element hərəkət etməyə başlayır. Nə baş verəcəyini bilmədən barmağını çəkirsən, element də yerinə geri qayıdır. Məhz bu anda tətbiqin bir hissəsinin necə işlədiyini kəşf etmiş olursan — sınamaqdan qorxmadan.

Bunu qurmaq üçün generic `Swipeable` komponenti yaradaq — istifadəçi mətni ekrandan sürüşdürüb çıxardanda callback funksiyası çağırılsın:

```tsx
export default function SwipableAndCancellable() {
  const [items, setItems] = useState(
    new Array(10).fill(null).map((v, id) => ({ id, name: "Swipe Me" }))
  );

  function onSwipe(id: number) {
    return () => {
      setItems(items.filter((item) => item.id !== id));
    };
  }

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <Swipeable
          key={item.id}
          onSwipe={onSwipe(item.id)}
          name={item.name}
          width={200}
        />
      ))}
    </View>
  );
}
```

Bu kod 10 ədəd `<Swipeable>` komponenti göstərir. Elementlərdən birini sola sürüşdürməyə başlayanda o hərəkət edir; kifayət qədər uzağa sürüşdürülməsə jest ləğv olunur və element yerinə qayıdır. Tam sonuna qədər sürüşdürülərsə, element siyahıdan tamamilə silinir və qalan elementlər boş yeri doldurur.

İndi `Swipeable` komponentinin özünə baxaq:

```tsx
type SwipeableProps = {
  name: string;
  width: number;
  onSwipe: () => void;
};

export default function Swipeable({ name, width, onSwipe }: SwipeableProps) {
  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    console.log(e.nativeEvent.contentOffset.x);
    e.nativeEvent.contentOffset.x >= width && onSwipe();
  }

  return (
    <View style={styles.swipeContainer}>
      <ScrollView
        horizontal
        snapToInterval={width}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={10}
        onScroll={onScroll}
      >
        <View style={[styles.swipeItem, { width }]}>
          <Text style={styles.swipeItemText}>{name}</Text>
        </View>
        <View style={[styles.swipeBlank, { width }]} />
      </ScrollView>
    </View>
  );
}
```

Komponent üç şeyi qəbul edir: `width` — özünün eninin nə qədər olacağı, `snapToInterval` — sayəsində sürüşdürmə "paging" kimi davranır və jest ləğv olunanda dəqiq yerinə oturur, `onScroll` isə sürüşdürmə məsafəsini izləyib lazımi anda `onSwipe` callback-ini çağırır.

Sola sürüşdürmə imkanı vermək üçün mətn olan komponentin yanına boş (görünməz) bir komponent əlavə etmək lazımdır. Stillər belədir:

```js
swipeContainer: {
  flex: 1,
  flexDirection: "row",
  width: 200,
  height: 30,
  marginTop: 50,
},
swipeItem: {
  height: 30,
  backgroundColor: "azure",
  justifyContent: "center",
  borderWidth: 1,
  borderRadius: 4,
  borderColor: "slategrey",
},
swipeItemText: {
  textAlign: "center",
  color: "slategrey",
},
swipeItemBlank: {
  height: 30,
},
```

`swipeItemBlank` stili `swipeItem` ilə eyni hündürlüyə malikdir, amma başqa heç nəyi yoxdur — sadəcə görünməzdir, boş yer rolunu oynayır.

## Nəticə

Mobil cihazlarda hər şey barmaqla idarə olunur, veb-dəki siçan məntiqi işləmir. `ScrollView` sürət və ətalət hesablamalarını sənin əvəzinə həll edir. `TouchableOpacity`, `TouchableHighlight` və `Pressable` istifadəçiyə "toxunmam qeydə alındı" hissini verir. `Swipeable` isə istifadəçinin jesti kəşf edə bilməsinə imkan yaradır — sürüşdür, kifayət qədər getməzsə geri qayıdar, tam gedərsə silinər.

Qısası: veb-də klik kifayətdir, mobil-də isə hər jestin öz emosional geribildirimi olmalıdır — əks halda istifadəçi tətbiqi "ölü" hiss edir.

# React Native-də İstifadəçiyə Proqresi Necə Göstərmək Olar?

Təsəvvür et: mikrodalğalı sobanın nə pəncərəsi var, nə də səsi. Yeganə əlaqə vasitəsi "bişir" yazılı düymədir. Absurd səslənir, elə deyilmi? Amma bir çox proqram istifadəçisi məhz bununla üzləşir: heç bir proqres göstəricisi yoxdur. Soba nəsə bişirir, ya yox? Bəs nə vaxt hazır olacaq?

Bu problemin veb və mobil tətbiqlərdə analoqu hər addımda var: düyməyə basdın, ekran donub qaldı, heç nə baş vermir kimi görünür. İstifadəçi əslində narahat olur — proqram asılıb, yoxsa işləyir? Bu yazıda React Native-in bu problemi həll etmək üçün təklif etdiyi komponentləri araşdıracağıq:

* Proqres və istifadəçi təcrübəsi (usability) əlaqəsi
* Qeyri-müəyyən (indeterminate) proqresi göstərmək — `ActivityIndicator`
* Naviqasiya zamanı proqres göstəricisi
* Dəqiq proqresi ölçmək — proqres zolağı (progress bar)
* Addım-addım (step) proqres

---

## Niyə Proqres Göstərmək Vacibdir?

Mikrodalğalı soba nümunəsinə qayıdaq. Bir səs siqnalı əlavə etsək, istifadəçi düyməni basdıqdan sonra heç olmasa nəyisə hiss edəcək — "bəli, qəbul olundu". Amma "yeməyim nə vaxt hazır olacaq?" sualı hələ də cavabsız qalır. Ona görə də mütləq bir proqres ölçmə vasitəsi — məsələn, taymer — lazımdır.

Bu, developerlərin əsas usability prinsiplərini bilmədiyi anlamına gəlmir — sadəcə vaxt azlığından bu detal çox vaxt unudulur. React Native-də bu problemi həll etmək üçün iki fərqli yanaşma var:

* **Qeyri-müəyyən (indeterminate) göstərici** — nəsə baş verdiyini bildirir, amma nə qədər qaldığını demir
* **Dəqiq ölçü (measured progress)** — istifadəçiyə faiz və ya addım sayı ilə real proqresi göstərir

> Yaxşı istifadəçi təcrübəsi istəyirsənsə, bu iki vasitəni tətbiqinin prioritet siyahısına sal — sonraya saxlama.

## Qeyri-müəyyən Proqres: `ActivityIndicator`

`ActivityIndicator` komponenti adından da bəlli olduğu kimi — nəsə baş verdiyini göstərmək üçün istifadə olunur. Real proqres qeyri-müəyyən ola bilər, amma heç olmasa istifadəçiyə "gözlə, iş gedir" mesajı ötürülür.

```jsx
import React from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "./styles";

export default function App() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}
```

`<ActivityIndicator />` platformadan asılı olmayan (platform-agnostic) komponentdir — həm iOS-da, həm Android-də işləyir, sadəcə hər platformada özünəməxsus görünüşdə göstərilir (iOS-da nazik fırlanan spinner, Android-də dairəvi animasiya). `size` prop-u ilə ölçünü `"large"` və ya `"small"` seçmək olar — kiçik ölçü, məsələn, düymə içində göstərmək üçün daha uyğundur.

Diqqət et: bu nümunə **əbədi fırlanır** — heç vaxt dayanmır, çünki heç bir şərtə bağlı deyil. Real tətbiqdə isə spinner müəyyən şərt (data yüklənməsi, sorğu bitməsi) tamamlananda gizlədilməlidir. Növbəti bölmədə bunu necə edəcəyimizə baxaq.

## Naviqasiya Zamanı Proqres Göstəricisi

Tutaq ki, istifadəçi bir ekrandan digərinə keçir, amma ikinci ekran açılmadan əvvəl API-dan data çəkməlidir. Bu network sorğusu davam edərkən boş, məzmunsuz ekran göstərməkdənsə, proqres göstəricisi göstərmək daha məntiqlidir.

Burda məqsəd:

* Naviqasiya komponentinin göstəriləcək ekran üçün API data-nı avtomatik çəkməsini təmin etmək
* API çağırışının qaytardığı promise-dən istifadə edərək spinner-i göstərmək, promise nəticələndikdə isə gizlətmək

Komponentlərin özü spinner-in göstərilib-göstərilməməsi ilə maraqlanmamalıdır — bu məntiqi ümumi (generic) bir `Wrapper` komponentinə çıxarmaq daha təmiz yanaşmadır:

```jsx
export function LoadingWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return children;
  }
}
```

`LoadingWrapper` `children`-i qəbul edir və `loading` state-inə görə ya spinner-i, ya da `children`-i render edir. `useEffect` içindəki `setTimeout` burda real API sorğusunu simulyasiya edir — 1 saniyə sonra `loading` `false`-a düşür və əsl məzmun görünür.

İndi bu wrapper-i `react-navigation` ilə istifadə olunan ekran komponentində tətbiq edək:

```jsx
const First = ({ navigation }) => (
  <LoadingWrapper>
    <View style={styles.container}>
      <Button title="Second" onPress={() => navigation.navigate("Second")} />
      <Button title="Third" onPress={() => navigation.navigate("Third")} />
    </View>
  </LoadingWrapper>
);
```

Bütün ekran `LoadingWrapper` ilə əhatələnib — `setTimeout` gözləyərkən spinner göstərilir. Bu yanaşmanın gözəlliyi ondadır ki, əlavə məntiqi bir yerdə gizlədib, hər səhifədə təkrar istifadə edə bilirsən. Real tətbiqdə `setTimeout` əvəzinə `LoadingWrapper`-ə əlavə prop-lar ötürüb, loading state-i həmin ekranın özündən idarə etmək olar.

## Dəqiq Proqresi Ölçmək: Proqres Zolağı

Sadəcə "nəsə baş verir" demənin problemi budur: istifadəçi üçün sonu görünmür. Bu, taymersiz mikrodalğalı soba qarşısında gözləməyə bənzəyir — narahatlıq yaradır. Nə qədər proqres edildiyini, nə qədər qaldığını bilmək isə rahatlıq verir. Ona görə mümkün olduqda **dəterministik (deterministic) proqres zolağı** istifadə etmək daha yaxşıdır.

`ActivityIndicator`-dan fərqli olaraq, React Native-in özündə platformadan asılı olmayan proqres zolağı komponenti yoxdur. Bunun üçün `react-native-progress` kitabxanasından istifadə olunur.

> Keçmişdə React Native-in özündə iOS və Android üçün ayrıca proqres zolağı komponentləri (`ProgressViewIOS`, `ProgressBarAndroid`) var idi. Amma Meta komandası kitabxananın ölçüsünü kiçiltmək üçün bu cür komponentləri ayrı paketlərə köçürüb — indi onlar əsas React Native kitabxanasının tərkibində deyil.

Əvvəlcə öz `ProgressBar` komponentimizi quraq:

```jsx
import * as Progress from "react-native-progress";

export default function ProgressBar({ progress }) {
  return (
    <View style={styles.progress}>
      <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
      <Progress.Bar width={200} useNativeDriver progress={progress} />
    </View>
  );
}
```

`ProgressBar` `progress` prop-unu qəbul edir və faiz mətni ilə birlikdə zolağı göstərir. `<Progress.Bar />` çoxlu prop qəbul etsə də, bizə yalnız `width`, `progress` və (daha rəvan animasiya üçün) `useNativeDriver` lazımdır.

İndi bu komponenti əsas `App` komponentində işə salaq:

```jsx
export default function MeasuringProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeoutRef = null;

    function updateProgress() {
      setProgress((currentProgress) => {
        if (currentProgress < 1) {
          return currentProgress + 0.01;
        } else {
          return 0;
        }
      });
      timeoutRef = setTimeout(updateProgress, 100);
    }

    updateProgress();
    return () => {
      timeoutRef && clearTimeout(timeoutRef);
    };
  }, []);

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} />
    </View>
  );
}
```

`<ProgressBar>` başlanğıcda 0%-dən başlayır. `useEffect` içindəki `updateProgress` funksiyası taymer vasitəsilə real bir prosesi simulyasiya edir — hər 100 millisaniyədə `progress` dəyəri 0.01 artır, 1-ə çatanda yenidən sıfırlanır.

> Real layihələrdə taymer simulyasiyasından çox nadir istifadə olunur. Amma statistik data göstərmək və ya fayl yükləmə (upload) prosesini izləmək kimi hallarda bu yanaşma faydalı ola bilər — birbaşa taymerə söykənməsən belə, yenə də əlində istifadə edə biləcəyin cari bir proqres dəyəri olacaq.

## Addım-Addım (Step) Proqres

Son nümunə: istifadəçinin əvvəlcədən müəyyən edilmiş neçə addımdan hansında olduğunu göstərən proqres zolağı. Məsələn, uzun bir formanı bir neçə məntiqi hissəyə bölmək və istifadəçi hər hissəni tamamladıqca növbəti addıma keçirmək məntiqli olar — bu zaman proqres zolağı əla geri bildirim (feedback) vasitəsidir.

Bu yanaşmada proqres zolağı naviqasiya paneli altına, başlığın altına yerləşdirilir ki, istifadəçi nə qədər irəlilədiyini, nə qədər qaldığını görsün. Əvvəlki bölmədə qurduğumuz `ProgressBar` komponenti burda da təkrar istifadə olunur.

Fikirləş: 4 ekranlı bir tətbiq var. Birinci ekranda proqres zolağı 25%-i göstərir (1-ci addım / 4 addım). Üçüncü ekranda isə artıq 75%-ə çatıb.

Bunu necə həyata keçirmək olar:

* Hər ekranı təmsil edən komponentlər bir `routes` massivində saxlanılır
* Bu massiv `createNativeStackNavigator()` ilə stack navigator-u konfiqurasiya etmək üçün istifadə olunur
* Hər route-a `initialParams` vasitəsilə `progress` parametri ötürülür
* Proqres belə hesablanır: **cari route-un indeksi / massivin uzunluğu**

Məsələn, `Second` massivdə 2-ci mövqedədir (indeks 1 + 1), massivin uzunluğu isə 4-dür. Bu, proqres zolağını 50%-ə qoyur.

Əlavə olaraq, "Next" və "Previous" düymələrinin `navigation.navigate()` çağırışlarına route adı ötürülməlidir — bunun üçün `screenOptions` handler-inə `nextRouteName` və `prevRouteName` dəyişənləri əlavə olunur.

## Nəticə

Bu fəsildə istifadəçiyə arxa planda nəyinsə baş verdiyini necə göstərməyi öyrəndik:

* Əvvəlcə proqres göstərməyin nə üçün istifadə rahatlığı (usability) baxımından vacib olduğunu gördük
* Sonra qeyri-müəyyən proqresi göstərən sadə bir ekran qurduq (`ActivityIndicator`)
* Ardınca dəqiq proqres miqdarlarını ölçmək üçün `ProgressBar` komponenti düzəltdik
* Naviqasiya zamanı, network sorğusu gedərkən proqres göstəricisi göstərən bir yanaşma tətbiq etdik
* Son bölmədə isə istifadəçinin əvvəlcədən müəyyən edilmiş addımlar içində harada olduğunu göstərən proqres zolağı qurduq

Qısaca: **göstəricilər (indicators)** qeyri-müəyyən proqres üçün, **zolaqlar (progress bars)** isə dəqiq, ölçülə bilən proqres üçün nəzərdə tutulub. İkisi arasındakı fərqi anlamaq və düzgün yerdə düzgününü seçmək — istifadəçini qaranlıqda saxlamamağın açarıdır.

# React Native-də Modal Ekranlar: İstifadəçini Cari Səhifədən Qopartmadan Necə Xəbərdar Etmək Olar?

Təsəvvür et: bank tətbiqində "Sil" düyməsinə basdın, heç bir sual-cavab olmadan, dərhal əməliyyat baş verdi. Yaxud əksinə — sadə bir "yadda saxlandı" mesajı üçün bütün ekran bağlanıb yenidən açılır. Hər iki hal pis təcrübədir: biri təhlükəli qərarı təsdiqsiz icra edir, digəri isə xırda məlumat üçün istifadəçini axından qoparır.

React Native-də səhifələr adətən `View` komponenti ilə qurulur və birbaşa ekrana render olunur. Amma bəzən istifadəçiyə vacib məlumat çatdırmaq lazım gəlir — onu isə cari səhifədən kənarlaşdırmadan etmək istəyirik. Bu yazıda bunun üçün React Native-in təklif etdiyi vasitələri araşdıracağıq:

* Terminologiya: alert, confirmation, notification arasındakı fərq
* İstifadəçidən təsdiq almaq (uğurlu və xəta ssenariləri)
* Passiv bildirişlər (toast)
* Fon prosesini göstərən activity modal

---

## Terminologiya: Nə Vaxt Nəyi İşlətmək Lazımdır?

Alert, confirmation və notification sözləri gündəlik danışıqda çox vaxt qarışdırılır. Amma bunları dəqiq ayırmaq vacibdir — çünki xətanı passiv bildirişlə göstərsən, istifadəçi onu asanlıqla gözdən qaçıra bilər:

* **Alert (xəbərdarlıq)** — vacib bir şey baş verib, istifadəçi mütləq görməlidir. Bəzən istifadəçi bunu təsdiqləməlidir.
* **Confirmation (təsdiq)** — alert-in bir hissəsidir. Məsələn, istifadəçi əməliyyat etdikdən sonra onun uğurlu olduğunu bilmək üçün modalı bağlamazdan əvvəl "gördüm" deməlidir. Confirmation həm də edəcəyi əməliyyat barədə əvvəlcədən xəbərdarlıq şəklində ola bilər.
* **Notification (bildiriş)** — nəsə baş verib, amma istifadəçinin işini tam dayandıracaq qədər vacib deyil. Adətən özü-özünə yox olur.

> Qaydası sadədir: məlumat bilinməli, amma kritik deyilsə — notification işlət. Funksionallıq istifadəçinin təsdiqi olmadan davam edə bilmirsə — yalnız o zaman confirmation tələb et.

## İstifadəçidən Təsdiq Almaq

### Uğurlu Əməliyyat Üçün Confirmation Modal

Bir əməliyyat uğurla bitəndə istifadəçiyə bunu göstərən modal komponentindən başlayaq:

```jsx
type Props = ModalProps & {
  onPressConfirm: () => void;
  onPressCancel: () => void;
};

export default function ConfirmationModal({
  onPressConfirm,
  onPressCancel,
  ...modalProps
}: Props) {
  return (
    <Modal transparent onRequestClose={() => {}} {...modalProps}>
      <View style={styles.modalContainer}>
        <View style={styles.modalInner}>
          <Text style={styles.modalText}>Dude, srsly?</Text>
          <Text style={styles.modalButton} onPress={onPressConfirm}>
            Yep
          </Text>
          <Text style={styles.modalButton} onPress={onPressCancel}>
            Nope
          </Text>
        </View>
      </View>
    </Modal>
  );
}
```

`ConfirmationModal`-a ötürülən bütün prop-lar (`...modalProps`) React Native-in öz `Modal` komponentinə ötürülür — səbəbini bir az sonra görəcəyik. Stil isə tamamilə sənin əlindədir:

```jsx
modalContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},
modalInner: {
  backgroundColor: "azure",
  padding: 20,
  borderWidth: 1,
  borderColor: "lightsteelblue",
  borderRadius: 2,
  alignItems: "center",
},
modalText: {
  fontSize: 16,
  margin: 5,
  color: "slategrey",
},
modalButton: {
  fontWeight: "bold",
  margin: 5,
  color: "slategrey",
},
```

`Modal` komponenti sadə bir `View` kimi düşünülə bilər — fərq təkcə odur ki, digər view-ların üzərində render olunur. Görünüşünü tamamilə özün müəyyən edirsən.

Amma çox vaxt öz stilini yazmaq istəməzsən. Veb brauzerdə sadəcə `alert()` çağırıb, brauzerin özünün stilləşdirdiyi pəncərəni göstərə bilərsən. React Native-də də bunun analoqu var: `Alert.alert()`.

```jsx
function toggleAlert() {
  Alert.alert("", "Failed to do the thing...", [
    {
      text: "Dismiss",
    },
  ]);
}
```

Funksionallıq baxımından fərq yoxdur — başlıq və mətn var, bunları modalda da asanlıqla əlavə edə bilərdin. Əsl fərq görünüşdədir: bu alert iOS-da iOS-a, Android-də isə Android-ə məxsus görünür, sən heç nə stilləşdirmədən.

Əksər hallarda modal əvəzinə alert seçmək daha yaxşı qərardır — platformanın öz native görünüşünə uyğun olduğu üçün istifadəçiyə tanış gəlir. Amma xəta təsdiqləri kimi hallarda görünüşə daha çox nəzarət lazım ola bilər — bunu növbəti bölmədə görəcəyik.

Nəzərə al: modal render etmə yanaşması alert-dən fərqlidir, amma ikisi də dəyişən prop dəyərlərinə görə yenilənən adi deklarativ komponentdir.

### Xəta Təsdiqi

Əvvəlki bölmədəki bütün prinsiplər xəta təsdiqinə də aiddir. Görünüşə daha çox nəzarət lazımdırsa, modal işlət — məsələn, xəta zamanı modalı qırmızı və "qorxulu" göstərmək istəyə bilərsən:

```jsx
modalInner: {
  backgroundColor: "azure",
  padding: 20,
  borderWidth: 1,
  borderColor: "lightsteelblue",
  borderRadius: 2,
  alignItems: "center",
},
modalInnerError: {
  backgroundColor: "lightcoral",
  borderColor: "darkred",
},
modalText: {
  fontSize: 16,
  margin: 5,
  color: "slategrey",
},
modalTextError: {
  fontSize: 18,
  color: "darkred",
},
modalButton: {
  fontWeight: "bold",
  margin: 5,
  color: "slategrey",
},
modalButtonError: {
  color: "black",
},
```

Uğur modalındakı əsas stillər burda da təkrarlanır, çünki xəta modalına da eyni baza stillər lazımdır. Fərqli olan hissə isə `*Error` adlı stillərdir ki, bunlar əsas stillərin üzərinə əlavə olunur:

```jsx
const innerViewStyle = [styles.modalInner, styles.modalInnerError];
const textStyle = [styles.modalText, styles.modalTextError];
const buttonStyle = [styles.modalButton, styles.modalButtonError];

type Props = ModalProps & {
  onPressConfirm: () => void;
  onPressCancel: () => void;
};

export default function ErrorModal({
  onPressConfirm,
  onPressCancel,
  ...modalProps
}: Props) {
  return (
    <Modal transparent onRequestClose={() => {}} {...modalProps}>
      <View style={styles.modalContainer}>
        <View style={innerViewStyle}>
          <Text style={textStyle}>Epic fail!</Text>
          <Text style={buttonStyle} onPress={onPressConfirm}>
            Fix it
          </Text>
          <Text style={buttonStyle} onPress={onPressCancel}>
            Ignore it
          </Text>
        </View>
      </View>
    </Modal>
  );
}
```

Stillər massiv şəklində birləşdirilib `style` prop-una ötürülür. `Error` stili həmişə massivin sonunda gəlir, çünki `backgroundColor` kimi ziddiyyətli xüsusiyyətlər massivdə sonra gələnin dəyəri ilə əvəzlənir.

Xəta təsdiqlərində istədiyin qədər əlavə idarəetmə (advanced controls) əlavə edə bilərsən — bu, tətbiqinin istifadəçiyə xətanı necə "yedizdirdiyindən" asılıdır: bəzən bir neçə fərqli hərəkət yolu təklif etmək lazım gəlir. Amma çox vaxt vəziyyət sadədir — nəsə səhv gedib, edə biləcəyin tək şey istifadəçini bundan xəbərdar etməkdir. Belə hallarda sadəcə alert kifayət edir.

İndi istifadəçidən reaksiya tələb edən bildirişləri gördük — sıra çatdı daha az aqressiv, işi pozmayan bildirişlərə.

## Passiv Bildirişlər (Toast)

İndiyə qədər gördüyümüz bildirişlərin hamısı istifadəçidən reaksiya tələb edirdi — bu qəsdən belədir, çünki vacib məlumatı gözünə soxmaq lazımdır. Amma bunu hər yerdə etmək olmaz. Vacib olub, amma gözardı edilsə də həyati fərq yaratmayan bildirişlər üçün **passiv bildirişlər** işlədilir. Bunlar modaldan daha az müdaxiləedicidir və bağlamaq üçün istifadəçidən heç bir hərəkət tələb etmir.

Bunun üçün `react-native-root-toast` kitabxanasının Toast API-ı işlədiləcək. Android-də toast artıq tanış komponentdir — istifadəçidən cavab tələb etməyən qısa məlumat göstərir. iOS-da native Toast API olmadığı üçün hər iki platformada işləyən bu kitabxanadan istifadə olunur:

```jsx
export default function PassiveNotifications() {
  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <Text
          onPress={() => {
            Toast.show("Something happened!", {
              duration: Toast.durations.LONG,
            });
          }}
        >
          Show Notification
        </Text>
      </View>
    </RootSiblingParent>
  );
}
```

Əvvəlcə tətbiqi `RootSiblingParent` komponenti ilə sarımaq lazımdır, sonra Toast API ilə işləməyə hazırsan. Toast açmaq üçün `Toast.show` metodunu çağırırsan — "Something happened!" mesajı ekranın altında görünür və qısa müddətdən sonra özü yox olur. Əsas məqam: bu bildiriş narahat etmir, işini kəsmir.

## Activity Modal: Arxa Planda Nəsə Baş Verdiyini Göstərmək

Son olaraq, progress indiqatoru göstərən bir modal quraq. Fikir sadədir: modalı göstər, promise nəticələndikdə isə gizlət. `ActivityIndicator`-lı ümumi `Activity` komponenti belə görünür:

```jsx
type ActivityProps = {
  visible: boolean;
  size?: "small" | "large";
};

export default function Activity({ visible, size = "large" }: ActivityProps) {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalContainer}>
        <ActivityIndicator size={size} />
      </View>
    </Modal>
  );
}
```

Bura promise-i birbaşa ötürüb, promise nəticələndikdə komponentin özünün modalı gizlətməsini təmin etmək fikri cəlbedici görünə bilər. Amma bu yaxşı fikir deyil — çünki onda state-i bu komponentin içinə soxmalı olardın, üstəlik komponent işləmək üçün promise-dən asılı olardı. Bunun əvəzinə `Activity` sadəcə `visible` prop-una görə göstərilir və ya gizlədilir — nə state saxlayır, nə də promise-dən asılıdır.

Modalın yarı-şəffaf arxa fonu belə qurulur:

```jsx
modalContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
},
```

`Modal` komponentinin özünü `transparent` etmək əvəzinə, şəffaflığı `backgroundColor`-da təyin etmək overlay effekti yaradır. İndi bu komponenti idarə edən koda baxaq:

```jsx
export default function App() {
  const [fetching, setFetching] = useState(false);
  const [promise, setPromise] = useState(Promise.resolve());

  function onPress() {
    setPromise(
      new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
        setFetching(false);
      })
    );
    setFetching(true);
  }

  return (
    <View style={styles.container}>
      <Activity visible={fetching} />
      <Text onPress={onPress}>Fetch Stuff...</Text>
    </View>
  );
}
```

"Fetch Stuff..." mətninə basılanda şəbəkə sorğusunu simulyasiya edən yeni bir promise yaradılır. Promise nəticələndikdə `fetching` state-i yenidən `false`-a düşür və activity modal avtomatik gizlənir.

## Nəticə

Bu yazıda mobil istifadəçiyə vacib məlumatı necə çatdırmağı öyrəndik:

* Bəzən istifadəçidən açıq təsdiq almaq lazımdır — bu, uğur və xəta ssenarilərinin hər ikisinə aiddir
* Digər hallarda passiv bildiriş kifayət edir, çünki confirmation modaldan daha az müdaxiləedicidir
* İki əsas vasitə var: **modal** və **alert**. Modal daha çevikdir — sadə `View` kimi, istədiyin görünüşü verə bilərsən. Alert isə sadə mətn göstərmək üçün ideal seçimdir — stilləşdirməni platformanın öz sisteminə həvalə edir
* Android-də əlavə olaraq `ToastAndroid` interfeysi də mövcuddur; iOS-da eyni effekti almaq üçün bir az əlavə iş lazımdır

Qısaca: **modal** — nə göstərildiyinə tam nəzarət istəyəndə, **alert** — platformaya uyğun sürətli həll lazım olanda, **toast** — istifadəçinin işini pozmadan xəbər vermək istəyəndə işə düşür. Doğru vasitəni doğru yerdə seçmək — istifadəçini nə darıxdırmadan, nə də qaranlıqda saxlamadan məlumatlandırmağın açarıdır.

# React Native-də Animasiyalarla Necə İşləmək Olar?

Instagram-da post-u bəyənəndə ürək animasiyası, ya Snapchat-i yeniləyəndə xəyal (ghost) animasiyası — bunlar təsadüfi bəzək deyil. Animasiya istifadəçiyə "nəsə dəyişdi" mesajını göz qırpımında ötürür, diqqəti vacib yerə yönəldir və tətbiqi canlı hiss etdirir. Yaxşı animasiya həm istifadəçi təcrübəsini, həm də məmnuniyyəti artırır.

React Native-də animasiyaları idarə etməyin bir neçə yolu var. Bu yazıda əvvəlcə mövcud alətlərə baxıb onları müqayisə edəcəyik, sonra iki real nümunə üzərində **React Native Reanimated** kitabxanasını tətbiq edəcəyik:

* Layout komponentlərinin animasiyası (görünmə/yox olma)
* Komponent stillərinin animasiyası (toxunma geribildirimi)

## Animated API — köhnə, amma hələ də geniş yayılmış

`Animated` React Native-in özündə gələn, ən çox istifadə olunan animasiya alətidir. Animasiya obyekti yaratmaq, onun vəziyyətini idarə etmək və emal etmək üçün bir sıra metodlar təqdim edir. Üstünlüyü budur ki, istənilən komponentlə işləyir — təkcə `Animated.View` və ya `Animated.Text` kimi xüsusi animasiya komponentləri ilə deyil.

Problem isə arxitekturasındadır: `Animated` API köhnə React Native arxitekturasına əsaslanır və JavaScript ilə UI native thread-ləri arasındakı əlaqə **asinxron** şəkildə qurulur. Bu, hər yeniləməni ən azı bir frame (təxminən 16ms) gecikdirir. JavaScript thread eyni zamanda React-in diff alqoritmini işlədir və ya network sorğularını emal edirsə, gecikmə daha da uzana bilər. Nəticə: buraxılmış (dropped) və ya gecikmiş frame-lər, yəni "sarsıntılı" animasiya.

## React Native Reanimated — problemi kökündən həll edir

**React Native Reanimated** məhz bu problemi həll etmək üçün yaranıb. Yeni arxitektura üzərində qurulub və bütün animasiya məntiqini JavaScript thread-dən **birbaşa UI thread-ə** köçürür — yəni frame gözləmək lazım deyil.

Kitabxana iki səviyyəli API təklif edir:

* **İmperativ API** — çoxmərhələli animasiyalar və xüsusi keçidlər (transitions) üçün
* **Deklarativ API** — CSS transition-larına bənzər sadə animasiya və keçidlər üçün

`Animated` API-nin üzərində qurulub və onu native thread daxilində yenidən implementasiya edir. Nəticədə tanış JavaScript sintaksisini saxlayaraq, yüksək performans əldə edirsən.

### Worklet nədir?

Reanimated-in əsasında **worklet** anlayışı durur — UI thread daxilində sinxron şəkildə icra oluna bilən sadə JavaScript funksiyaları. Funksiyanın əvvəlinə `"worklet"` direktivini əlavə etmək kifayətdir:

```js
function simpleWorklet() {
  "worklet";
  console.log("Hello from UI thread");
}
```

Bu qədər — `simpleWorklet` funksiyası artıq UI thread daxilində, yeni frame gözləmədən icra oluna bilər.

### Əsas hook və metodlar

Reanimated animasiyaları idarə etmək üçün bir neçə hook və köməkçi metod təqdim edir:

* **`useSharedValue`** — UI thread kontekstində yaşayan, dəyəri dəyişəndə animasiyanı tetikləyən əsas state obyektini qaytarır (`Animated.Value`-nin analoqudur). Ən böyük üstünlüyü: shared value-lar re-render tetiklmədən React Native və UI thread-ləri arasında sinxronlaşır — mürəkkəb animasiyalar JS thread-i bloklamadan 60 FPS-lə işləyə bilir.
* **`useDerivedValue`** — başqa shared value-lardan asılı olan, onlar dəyişəndə avtomatik yenilənən yeni bir shared value yaradır. Yəni bir dəyərin başqa dəyərdən "törəməsini" UI thread daxilində worklet kimi hesablamağa imkan verir — re-render olmadan.
* **`useAnimatedStyle`** — shared value-lara əsaslanan, animasiya oluna bilən stil obyekti qurur. Shared value dəyişdikcə müvafiq view xüsusiyyətlərini yeniləyir. Shared value-ları view-lara bağlamağın əsas yoludur.
* **`withTiming`, `withSpring`, `withDecay`** — shared value-nı müxtəlif əyri (curve) və fizika modelləri ilə hamar şəkildə yeniləyən utilit metodlardır. Hədəf dəyəri və konfiqurasiyanı təyin edərək animasiyanı deklarativ şəkildə təsvir etməyə imkan verirlər.

## Reanimated-in Quraşdırılması

Expo layihəsinin içində bu əmri işə sal:

```bash
expo install react-native-reanimated
```

Quraşdırma bitdikdən sonra `babel.config.js` faylına Babel plugin-ini əlavə et:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"],
  };
};
```

Bu plugin-in tək vəzifəsi — worklet funksiyalarını UI thread-də işləyə bilən formaya çevirməkdir.

Plugin-i əlavə etdikdən sonra development server-i yenidən başlat və bundler keşini təmizlə:

```bash
expo start --clear
```

## Layout Komponentlərinin Animasiyası

Ən çox rast gəlinən istifadə hallarından biri — komponentin ekrana ilk dəfə render olunanda (mount) və silinəndə (unmount) animasiyalı görünməsidir. Reanimated bunun üçün `FadeIn`, `BounceIn`, `ZoomIn` kimi hazır animasiyalar təqdim edir.

Bunun üçün adi `Animated` komponentindən (Animated API-dəki eyni komponent) istifadə olunur, sadəcə iki əlavə prop-la:

* **`entering`** — komponent mount olub render ediləndə işə düşən animasiya
* **`exiting`** — komponent unmount olanda işə düşən animasiya

Sadə bir to-do siyahısı quraq: tapşırıq əlavə edən düymə və üzərinə basanda tapşırığı silən funksionallıq.

> Animasiyaları skrinşotda görmək mümkün deyil — kodu özün işlədib nəticəyə baxmağını tövsiyə edirəm.

Bütün sehr `TodoItem` komponentində gizlənib:

```jsx
export const TodoItem = ({ id, title, onPress }) => {
  return (
    <Animated.View entering={SlideInLeft} exiting={SlideOutRight}>
      <TouchableOpacity onPress={() => onPress(id)} style={styles.todoItem}>
        <Text>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
```

Gördüyün kimi, mürəkkəb məntiq yoxdur — sadəcə `Animated.View`-i animasiyanın kökü kimi götürüb, Reanimated-in hazır `SlideInLeft` və `SlideOutRight` animasiyalarını `entering` və `exiting` prop-larına ötürürük. Nəticədə yeni tapşırıq əlavə edəndə element ekranın solundan içəri sürüşür, silinəndə isə sağa doğru sürüşüb yox olur.

İndi bütün mənzərəni görmək üçün `App` komponentinə baxaq:

```jsx
export default function App() {
  const [todoList, setTodoList] = useState([]);

  const addTask = () => {
    setTodoList([
      ...todoList,
      { id: String(new Date().getTime()), title: "New task" },
    ]);
  };

  const deleteTask = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {todoList.map(({ id, title }) => (
          <TodoItem key={id} id={id} title={title} onPress={deleteTask} />
        ))}
      </View>
      <Button onPress={addTask} title="Add" />
    </View>
  );
}
```

`todoList` state-i `useState` ilə saxlanılır, `addTask` və `deleteTask` isə əlavə etmə/silmə məntiqini idarə edir. Animasiyanın özü isə heç bir əlavə koda ehtiyac olmadan, sadəcə `TodoItem` daxilindəki `entering`/`exiting` prop-ları sayəsində işləyir.

## Komponent Stillərinin Animasiyası

Daha mürəkkəb nümunə: gözəl toxunma geribildirimi olan bir düymə. Bu düymə `Pressable` komponenti üzərində qurulacaq və `onPressIn`, `onLongPress`, `onPressOut` hadisələrindən istifadə ediləcək.

Əvvəlcə lazım olan shared value-ları və animasiya stilini təyin edək:

```jsx
const radius = useSharedValue(30);
const opacity = useSharedValue(1);
const scale = useSharedValue(1);
const color = useSharedValue(0);

const backgroundColor = useDerivedValue(() => {
  return interpolateColor(color.value, [0, 1], ["orange", "red"]);
});

const animatedStyles = useAnimatedStyle(() => {
  return {
    opacity: opacity.value,
    borderRadius: radius.value,
    transform: [{ scale: scale.value }],
    backgroundColor: backgroundColor.value,
  };
}, []);
```

Stil xüsusiyyətlərini animasiya etmək üçün `useSharedValue` ilə hər biri üçün ayrıca shared value yaradılıb (başlanğıc dəyəri arqument kimi ötürülür). Sonra `useAnimatedStyle` hook-u ilə stil obyekti qurulur — bu hook `useMemo`-ya bənzəyir, fərq ondadır ki, bütün hesablamalar UI thread-də aparılır və istənilən shared value dəyişəndə stil obyekti yenidən hesablanır. Düymənin fon rəngi isə `useDerivedValue` ilə narıncıdan qırmızıya hamar keçid (interpolasiya) şəklində qurulub.

İndi düymənin basılma vəziyyətinə uyğun stil dəyərlərini yeniləyən handler funksiyalarını yazaq:

```jsx
const onPressIn = () => {
  radius.value = withSpring(20);
  opacity.value = withSpring(0.7);
  scale.value = withSpring(0.9);
};

const onLongPress = () => {
  scale.value = withSpring(0.8);
  color.value = withSpring(1);
};

const onPressOut = () => {
  radius.value = withSpring(30);
  opacity.value = withSpring(1);
  scale.value = withSpring(1, { damping: 50 });
  color.value = withSpring(0);
};
```

`onPressIn` — barmaq düyməyə toxunanda `borderRadius`, `opacity` və `scale` dəyərlərini başlanğıc vəziyyətdən dəyişdirir; hamısı `withSpring` ilə yenilənir ki, keçid hamar olsun. `onLongPress` düyməni qırmızılaşdırır və kiçildir. `onPressOut` isə bütün dəyərləri ilkin vəziyyətinə qaytarır.

Bütün məntiqi artıq layout-a tətbiq edə bilərik:

```jsx
<View style={styles.container}>
  <Animated.View style={[styles.buttonContainer, animatedStyles]}>
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      style={styles.button}
    >
      <Text style={styles.buttonText}>Press me</Text>
    </Pressable>
  </Animated.View>
</View>
```

Nəticədə düymənin üç fərqli vəziyyəti alınır: adi, basılmış və uzun basılmış — hər biri fərqli radius, şəffaflıq, ölçü və rənglə.

## Nəticə

Bu yazıda React Native Reanimated kitabxanasının nə olduğunu və `Animated` API-dən nə ilə fərqləndiyini öyrəndik. Kitabxananın əsasında duran worklet anlayışına, UI thread-də sinxron işləmə prinsipinə nəzər saldıq.

İki real nümunə də gördük: birincisində hazır deklarativ animasiyalarla (`entering`/`exiting`) komponentin görünüb-yox olmasını animasiya etdik; ikincisində isə `useSharedValue` və `useAnimatedStyle` ilə düymənin stilini toxunma vəziyyətinə görə dinamik şəkildə dəyişdik.

Qısası: `Animated` API JS thread ilə UI thread arasında körpü qurur, amma bu körpüdə gecikmə qaçılmazdır. Reanimated isə bu körpünü aradan qaldırır — məntiq birbaşa UI thread-də işləyir, nəticə isə 60 FPS-lik hamar animasiyalardır.










