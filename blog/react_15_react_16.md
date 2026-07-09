# React Fiber-i 5 dəqiqəyə başa düşək: React 15 niyə dəyişməli oldu?

React haqqında araşdırma edərkən yəqin ki, belə cümlələrlə qarşılaşmısınız:

> *"React 16 ilə Fiber təqdim edildi."*
>
> *"Fiber React-in yeni reconciliation engine-idir."*

İlk baxışdan bu cümlələr kifayət qədər texniki səslənir. Elə buna görə də bir çox frontend developer Fiber haqqında oxusa da, əslində **niyə yarandığını** tam anlamır.

Bu yazıda Fiber-in daxili implementasiyasından deyil, onun həll etdiyi problemi danışacağıq. Çünki problemi başa düşsəniz, Fiber-in niyə bu qədər vacib olduğunu da başa düşəcəksiniz.

---

# Gəlin React 15 dövrünə qayıdaq

Təsəvvür edin ki, belə bir tətbiqiniz var.

```jsx
<App>
  <Header />
  <Sidebar />
  <Content />
  <Footer />
</App>
```

React bu komponentləri bir ağac (Component Tree) kimi görür.

```
App
├── Header
├── Sidebar
├── Content
└── Footer
```

İndi istifadəçi bir düyməyə klik etdi.

React bu dəyişiklikdən sonra hansı komponentlərin yenilənməli olduğunu hesablayır.

Buraya qədər hər şey normaldır.

Problem isə bu hesablamanın necə aparılmasında idi.

---

# React 15 necə işləyirdi?

React 15 bütün işi bir nəfəsə edirdi.

Bunu marafona bənzədə bilərik.

Bir idmançı qaçmağa başlayır və finişə çatana qədər dayanmır.

React də eyni prinsiplə işləyirdi.

```
Start
 ↓
Header
 ↓
Sidebar
 ↓
Content
 ↓
Footer
 ↓
Finish
```

Render prosesi başladıqdan sonra artıq onu yarımçıq saxlamaq mümkün deyildi.

---

# Bu niyə problem idi?

İndi başqa bir nümunəyə baxaq.

Təsəvvür edin ki, siz restorandasınız.

Ofisianta deyirsiniz:

> "Mənə bu siyahıdakı 50 yeməyi gətirin."

Ofisiant mətbəxə gedir.

Elə bu anda siz fikrinizi dəyişirsiniz.

> "Bağışlayın, əvvəlcə sadəcə su gətirə bilərsiniz?"

Normal halda ofisiant dərhal su gətirər.

Amma React 15-dəki məntiq belə idi:

> "Yox. Əvvəlcə 50 sifarişi bitirəcəyəm. Sonra su gətirəcəyəm."

İstifadəçi baxımından bu çox pis təcrübədir.

---

# Browser də işləmək istəyir

React işləyərkən browser də boş dayanmır.

Onun da öz işi var.

* Klikləri emal etmək
* Scroll etmək
* Animasiyaları göstərmək
* Input-a yazılan simvolları ekrana çıxarmaq

Əgər React prosessoru uzun müddət məşğul saxlayırsa, browser bu işlərin heç birini görə bilmir.

İstifadəçi isə bunu belə hiss edir:

> "Sayt dondu."

Əslində sayt donmayıb.

Sadəcə React hələ öz işini bitirməyib.

---

# React komandası fərqli düşündü

React komandası özünə belə bir sual verdi.

> **"Niyə bütün işi bir dəfəyə etməliyik?"**

Bəlkə işi hissələrə bölmək olar?

Beləcə Fiber ideyası yarandı.

---

# Fiber necə düşünür?

Eyni restoran nümunəsinə qayıdaq.

İndi ofisiant belə işləyir.

Əvvəlcə bir neçə sifarişi hazırlayır.

Sonra müştərilərə baxır.

Kiminsə əlavə istəyi varsa, onu yerinə yetirir.

Sonra yenidən əvvəlki işinə davam edir.

Yəni artıq belə düşünür:

```
Bir az iş gör

↓

Dayan

↓

Ətrafda vacib iş varmı?

↓

Varsa onu et

↓

Sonra davam et
```

Bu kiçik dəyişiklik istifadəçi təcrübəsini tamamilə dəyişir.

---

# React-də bu necə görünür?

Əvvəllər React belə işləyirdi.

```
1000 komponent

↓

Hamısını render et

↓

Bitir
```

Fiber isə bunu belə edir.

```
100 komponent

↓

Dayan

↓

Browser işləsin

↓

100 komponent

↓

Dayan

↓

Yenə davam et
```

Bu proses o qədər sürətli baş verir ki, istifadəçi bunu hiss etmir.

Amma hiss etdiyi bir şey var.

Sayt artıq daha axıcı işləyir.

---

# Browser niyə rahatlayır?

60 FPS-lə işləyən bir ekranda browser-in hər kadr üçün təxminən **16 millisaniyə** vaxtı olur.

Əgər React həmin vaxtın hamısını istifadə etsə,

browser:

* klikləri gec qəbul edir,
* scroll gecikir,
* animasiyalar qırılır.

Fiber isə deyir:

> "Mən bir az işləyəcəyəm, sonra browser-ə də növbə verəcəyəm."

Bu səbəbdən React tətbiqləri daha responsiv görünür.

---

# Fiber əslində nədir?

Bir çox məqalədə belə yazılır:

> **Fiber yeni məlumat strukturudur.**

Bu doğrudur.

Amma yeni başlayan üçün bu cümlə çox şey ifadə etmir.

Daha sadə desək,

Fiber React-in hər komponent haqqında saxladığı kiçik "iş kartı"dır.

Məsələn:

```
App

↓

Header

↓

Sidebar

↓

Content
```

Artıq React hər komponenti ayrıca idarə edə bilir.

Bu isə ona imkan verir ki,

* lazım olsa dayansın,
* sonra davam etsin,
* vacib işləri önə çəksin,
* az vacib işləri sonraya saxlasın.

---

# Prioritet anlayışı

Təsəvvür edin ki, eyni anda üç hadisə baş verdi.

* İstifadəçi klik etdi.
* 10 min elementlik siyahı yenilənməlidir.
* Analytics serverinə məlumat göndərilməlidir.

React 15 üçün bunların hamısı eyni idi.

Fiber isə belə düşünür.

1. Əvvəl klik.
2. Sonra kiçik UI yenilənməsi.
3. Daha sonra böyük siyahı.
4. Ən sonda analytics.

İstifadəçi üçün vacib olan hər zaman birinci gəlir.

---

# Fiber React-i sürətləndirdi?

Burada maraqlı bir məqam var.

Fiber-in məqsədi React-i mütləq daha sürətli etmək deyildi.

Əsas məqsəd React-i **daha ağıllı işlətmək** idi.

Bəzən Fiber klassik renderdən daha uzun da çəkə bilər.

Amma istifadəçi bunu hiss etmir.

Çünki kliklər, scroll və animasiyalar artıq gözləmək məcburiyyətində qalmır.

Başqa sözlə desək:

**Fiber performansı deyil, istifadəçi təcrübəsini optimallaşdırır.**

---

# React 18 niyə Fiber olmadan mümkün deyildi?

Bu gün istifadə etdiyimiz bir çox React xüsusiyyəti əslində Fiber-in üzərində qurulub.

Məsələn:

* Concurrent Rendering
* `startTransition()`
* Suspense
* Streaming SSR

Bunların hamısı yalnız ona görə mümkündür ki, React artıq işi yarımçıq dayandıra və sonra davam etdirə bilir.

Əgər React hələ də React 15-dəki kimi işləsəydi, bu imkanların heç biri mümkün olmazdı.

---

## Son söz

Fiber haqqında danışarkən insanlar adətən belə deyirlər:

> "Fiber React-in yeni reconciliation engine-idir."

Bu texniki baxımdan doğrudur.

Amma mənim üçün Fiber-i izah edən ən sadə cümlə budur:

> **React 15 deyirdi: "Əvvəl işi bitirim, sonra istifadəçiyə cavab verim." React Fiber isə deyir: "Əvvəl istifadəçiyə cavab verim, işi sonra davam etdirərəm."**

Məhz bu düşüncə tərzi React-i daha responsiv, daha çevik və gələcək xüsusiyyətlər üçün hazır bir platformaya çevirdi.
