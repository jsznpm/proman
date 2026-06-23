**frontend arxitektura və performans mövzusunda senior developer bloqu** 

---

# Veb Renderinq: CSR, SSR, SSG və Müasir Performans Yanaşmaları

Bir istifadəçi brauzerdə linkə klikləyəndə əslində sadəcə bir səhifə açılmır.

Arxada bir çox proses baş verir:

* DNS sorğusu
* serverə bağlantı
* HTML-in gəlməsi
* CSS və JavaScript yüklənməsi
* render prosesi
* interaktiv vəziyyətə keçid

Bu proseslərin hamısı istifadəçinin "səhifə sürətli açıldı" və ya "gecikir" hissini formalaşdırır.

Məhz buna görə frontend dünyasında renderinq strategiyası çox vacib mövzudur.

---

# Əsas Web Performans Metrikaları

## TTFB (Time To First Byte)

TTFB istifadəçinin linkə klik etdiyi andan serverdən ilk məlumat baytının gəlməsinə qədər olan müddətdir.

Sadə desək:

> "Server mənə ilk cavabı nə qədər tez verdi?"

Bu göstəriciyə təsir edən faktorlar:

* server performansı
* database sorğuları
* backend optimizasiyası
* CDN istifadəsi

---

# FCP (First Contentful Paint)

FCP istifadəçinin ekranda ilk real məzmunu gördüyü andır.

Məsələn:

* başlıq
* şəkil
* mətn

İstifadəçi üçün ilk "səhifə gəlir" hissini yaradan əsas göstəricilərdən biridir.

---

# LCP (Largest Contentful Paint)

LCP səhifədə ən böyük elementin yüklənmə vaxtını ölçür.

Məsələn:

* hero image
* böyük başlıq
* əsas banner

Xüsusilə e-commerce saytlarında kritikdir.

Çünki istifadəçi əsas məhsulu nə qədər tez görürsə, təcrübə bir o qədər yaxşı olur.

---

# TBT (Total Blocking Time)

JavaScript browser-in əsas thread-ini bloklaya bilər.

Bu zaman:

* kliklər gec cavab verir
* animasiyalar donur
* UI yavaş hiss olunur

TBT göstərir:

> "Browser istifadəçi ilə əlaqəyə hazır olmaq üçün nə qədər gözlədi?"

---

# Əsas Renderinq Strategiyaları

Müasir frontend-də əsas suallardan biri:

**HTML harada hazırlanmalıdır?**

* serverdə?
* browser-də?
* build zamanı?

Cavab tətbiqdən asılıdır.

---

# CSR (Client-Side Rendering)

CSR yanaşmasında server brauzerə əsasən boş HTML və JavaScript göndərir.

Məsələn:

```html
<div id="root"></div>
```

Daha sonra React kimi framework bütün UI-ni browser-də yaradır.

---

## Üstünlükləri

✅ Səhifələr arası keçid çox sürətlidir

✅ Server yükü az olur

✅ Dashboard tipli tətbiqlər üçün rahatdır

---

## Çatışmazlıqları

❌ İlk açılış gec ola bilər

❌ SEO problemi yarana bilər

❌ Zəif cihazlarda performans aşağı düşə bilər

Məsələn:

Admin panel

CRM

Daxili şirkət sistemləri

üçün ideal seçim ola bilər.

---

# SSR (Server-Side Rendering)

SSR-də HTML server tərəfindən hazırlanır.

İstifadəçi artıq hazır səhifə alır.

Axın:

```
User
 ↓
Server
 ↓
HTML hazır
 ↓
Browser göstərir
```

---

## Üstünlükləri

✅ Daha yaxşı SEO

✅ İlk açılış daha sürətli hiss olunur

✅ Mobil cihazlarda daha rahatdır

---

## Çatışmazlıqları

❌ Server yükü artır

❌ Daha mürəkkəb arxitektura tələb edir

İstifadə:

* e-commerce
* xəbər saytları
* böyük kontent platformaları

---

# SSG (Static Site Generation)

SSG-də HTML əvvəlcədən build zamanı hazırlanır.

Məsələn:

```
npm run build

↓

HTML faylları yaranır
```

İstifadəçi gələndə server artıq hazır faylı verir.

---

## Üstünlükləri

✅ Çox sürətli

✅ Aşağı server xərci

✅ TTFB çox yaxşı olur

İdeal:

* blog
* portfolio
* dokumentasiya saytları

---

# Hydration nədir?

SSR ilə gələn HTML statikdir.

Amma React kimi framework-lər həmin HTML-ə JavaScript əlavə edib onu interaktiv edir.

Bu proses:

**Hydration**

adlanır.

Məsələn:

Server göndərir:

```html
<button>
Click
</button>
```

Browser JavaScript yükləyir və deyir:

"Bu düymə artıq işləyə bilər."

---

# Hydration problemləri

## 1. Uncanny Valley problemi

İstifadəçi düyməni görür.

Amma klik edir, işləməz.

Çünki JavaScript hələ hazır deyil.

---

## 2. "One app for the price of two"

Eyni UI iki dəfə yaranır:

1. Serverdə render olunur
2. Client-də yenidən işə salınır

Bu əlavə yük yaradır.

---

# Yeni Nəsil Yanaşmalar

## Island Architecture

Məsələn:

Astro yanaşması.

Fikir:

Bütün səhifəni interaktiv etmə.

Sadəcə lazım olan hissələri JavaScript ilə yüklə.

Məsələn:

Blog səhifəsi:

```
Header       → static

Article      → static

Comment box  → interactive island
```

---

# Resumability

Məsələn:

Qwik yanaşması.

Məqsəd:

Hydration etməmək.

Serverdə olan vəziyyəti browser davam etdirir.

Yəni:

"yenidən başlama"

əvəzinə

"qaldığın yerdən davam et"

---

# Hansı Renderinq Strategiyasını Seçmək Lazımdır?

Ən böyük səhv:

"Həmişə SSR istifadə edək"

və ya

"Həmişə CSR yaxşıdır"

deməkdir.

Doğru seçim məhsuldan asılıdır.

---

## E-commerce (Amazon tipli)

Tələb:

* SEO
* sürətli ilk açılış
* məhsul səhifələri

Uyğun:

SSR + Hydration

---

## Dashboard

Tələb:

* interaktivlik
* istifadəçi login olur
* SEO lazım deyil

Uyğun:

CSR

---

## Blog / Documentation

Tələb:

* sürət
* SEO
* sadə kontent

Uyğun:

SSG

---

## Sosial şəbəkə

Tələb:

* SEO
* realtime
* çox interaktiv hissələr

Uyğun:

* SSR
* Island Architecture
* Progressive Hydration

---

# Nəticə

Müasir frontend developer üçün əsas sual:

"React bilirəmmi?"

deyil.

Əsas sual:

**"Bu tətbiq üçün hansı renderinq strategiyası düzgün seçimdir?"**

Çünki yaxşı frontend yalnız UI yaratmır.

O, istifadəçinin gördüyü ilk saniyəni, performansı və bütün sistem davranışını dizayn edir.
