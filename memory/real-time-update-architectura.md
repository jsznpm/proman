# Real-Time Yenilənmələrin Arxitekturası: Polling-dən WebSocket-ə qədər

Müasir tətbiqlərdə istifadəçi artıq "yenilə" düyməsini basmaq istəmir.

Chat mesajları, canlı bildirişlər, birja qiymətləri, oyunlar və Google Docs kimi əməkdaşlıq platformaları məlumatların saniyələr içində dəyişməsini tələb edir.

Bəs bu məlumatlar istifadəçiyə necə çatdırılır?

Burada əsas sual budur:

**Məlumatı client özü soruşmalıdır, yoxsa server göndərməlidir?**

Bu seçim tətbiqin performansına, miqyaslana bilməsinə və arxitekturasına birbaşa təsir edir.

---

# Pull və Push yanaşmaları

Real-time sistemlər əsasən iki model üzərində qurulur.

---

# 1. Pull Model (Client soruşur)

Bu modeldə client serverə deyir:

> "Məndə yeni məlumat varmı?"

Server cavab verir.

Nümunələr:

* Short Polling
* Long Polling

Axın:

```
Client → Server
        |
        ↓
     Yeni data?
```

---

# 2. Push Model (Server göndərir)

Burada server özü məlumat yaranan kimi client-ə göndərir.

Nümunələr:

* SSE
* WebSocket

Axın:

```
Server → Client
```

Bu daha real-time təcrübə yaradır.

---

# Short Polling: Sadə, amma bahalı yanaşma

Short polling ən sadə real-time həllərdən biridir.

Client müəyyən interval ilə serverə sorğu göndərir.

Məsələn:

```
Hər 5 saniyədən bir:

Client:
"Yeni mesaj varmı?"
```

---

## Üstünlükləri

✅ Çox sadədir

✅ Adi HTTP istifadə edir

✅ Daimi bağlantı tələb etmir

---

## Çatışmazlıqları

Problem:

Məlumat dəyişməsə belə request gedir.

Məsələn:

100 000 istifadəçi

hər 5 saniyə:

```
100000 / 5
```

sayda boş sorğu yaranır.

Bu:

* server yükü
* network istifadəsi
* lazımsız trafik

yaradır.

---

## Nə vaxt istifadə etmək olar?

Əgər məlumat çox kritik deyilsə:

* hava məlumatı
* status yoxlamaları
* periodik yenilənən məlumatlar

üçün kifayət edə bilər.

---

# Long Polling: Polling-in ağıllı versiyası

Long polling-də client sorğu göndərir, amma server dərhal cavab vermir.

Server gözləyir:

"Yeni məlumat gələndə cavab verəcəyəm."

Məsələn:

```
Client:
Yeni mesaj varmı?

Server:
Gözləyirəm...

(10 saniyə sonra)

Server:
Bəli, yeni mesaj var.
```

---

## Üstünlükləri

✅ Short polling-dən daha effektivdir

✅ Əksər brauzerlərdə işləyir

✅ Əlavə protokol tələb etmir

---

## Çatışmazlıqları

Hər mesajdan sonra:

* bağlantı bağlanır
* yeni bağlantı yaranır

Bu isə:

* latency
* əlavə server yükü

yarada bilər.

Böyük sistemlərdə sticky session ehtiyacı yarana bilər.

---

# Server-Sent Events (SSE): Serverdən Client-ə axın

SSE serverin client-ə davamlı məlumat göndərməsinə imkan verir.

Burada istiqamət:

```
Server → Client
```

dir.

Məsələn:

Xəbər saytı:

```
Yeni xəbər gəldi
↓
Server avtomatik göndərir
```

---

## Üstünlükləri

✅ Daimi HTTP bağlantısı

✅ Avtomatik reconnect

✅ Sadə implementasiya

✅ HTTP/2 ilə yaxşı işləyir

---

## Çatışmazlığı

Əsas limit:

Birtərəflidir.

Client serverə eyni kanal ilə məlumat göndərə bilmir.

---

## İstifadə sahələri

Uyğundur:

* xəbər lentləri
* canlı statistika
* idman nəticələri
* birja qiymətləri

---

# WebSocket: Tam real-time əlaqə

WebSocket ən güclü real-time texnologiyalardan biridir.

Burada əlaqə:

```
Client ↔ Server
```

şəklindədir.

Hər iki tərəf istənilən vaxt məlumat göndərə bilər.

---

Məsələn chat:

```
User A yazır

↓

Server

↓

User B dərhal alır
```

---

## Üstünlükləri

✅ Çox aşağı gecikmə

✅ İkitərəfli əlaqə

✅ Binary data dəstəyi

✅ Real-time sistemlər üçün ideal

---

## Çatışmazlıqları

WebSocket adi HTTP request deyil.

Yeni protokoldur:

```
ws://
wss://
```

Buna görə:

* proxy problemləri
* firewall problemləri

yarana bilər.

Ən böyük çətinlik:

**Scaling**

---

# Real-Time Sistemlərdə Scaling problemi

Bir serverdə:

```
User A
   |
Server 1
```

asan işləyir.

Amma:

```
User A
User B
User C

Server 1
Server 2
Server 3
```

olanda problem yaranır.

Çünki WebSocket bağlantısı state saxlayır.

---

# Həll 1: Sticky Sessions

Eyni istifadəçi həmişə eyni serverə gedir.

Məsələn:

```
User A

↓

Server 2 həmişə
```

Üstünlük:

Sadədir.

Çatışmazlıq:

Balanslama çətinləşir.

---

# Həll 2: Shared Storage

State serverdə saxlanılmır.

Məsələn:

Redis istifadə olunur.

Axın:

```
Server 1
   |
 Redis
   |
Server 2
```

Beləliklə bütün serverlər eyni məlumatı görür.

---

# WebSocket Authentication

WebSocket bağlantılarında autentifikasiya diqqətli qurulmalıdır.

Yanaşmalar:

* qısaömürlü token
* ilk mesajda token göndərmək
* handshake zamanı yoxlama

Məqsəd:

açıq və uzunömürlü bağlantıları təhlükəsiz saxlamaqdır.

---

# Qısa müqayisə

| Texnologiya   | İstiqamət       | Üstünlük              | Mənfi tərəf      |
| ------------- | --------------- | --------------------- | ---------------- |
| Short Polling | Client → Server | Sadə                  | Çox boş request  |
| Long Polling  | Client → Server | Daha effektiv polling | Yenidən bağlantı |
| SSE           | Server → Client | Sadə push             | Tək istiqamət    |
| WebSocket     | Client ↔ Server | Ən aşağı latency      | Scaling çətindir |

---

# Hansını seçmək lazımdır?

Ən böyük səhv:

"Hər yerdə WebSocket istifadə edək"

deməkdir.

Düzgün seçim tətbiqdən asılıdır.

---

## Chat tətbiqi

Məsələn:

Telegram, Discord

Seçim:

✅ WebSocket

Çünki:

* ikitərəfli əlaqə
* minimal gecikmə

lazımdır.

---

## Canlı xəbər və statistika

Seçim:

✅ SSE

Çünki:

Server məlumat verir, client sadəcə izləyir.

---

## Sadə status yoxlaması

Seçim:

✅ Polling

Çünki:

əlavə mürəkkəblik lazım deyil.

---

# Nəticə

Real-time arxitekturada əsas məqsəd ən yeni texnologiyanı seçmək deyil.

Əsas sual:

**"Bu sistemə həqiqətən nə lazımdır?"**

Əgər ikitərəfli əlaqə tələb olunmursa, WebSocket əvəzinə SSE və ya Long Polling daha düzgün seçim ola bilər.

Yaxşı mühəndislik texnologiyanı deyil, problemi həll edən yanaşmanı seçməkdir.
