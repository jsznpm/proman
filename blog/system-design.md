# Sistem Dizaynı (System Design): Senior Mühəndislər üçün Tam Bələdçi

Müasir proqram təminatı dünyasında sadəcə kod yazmaq artıq kifayət etmir. Xüsusilə AI alətlərinin kod yaratma prosesini sürətləndirdiyi dövrdə mühəndisdən gözlənilən əsas bacarıqlardan biri böyük sistemlərin necə dizayn edildiyini, komponentlərin bir-biri ilə necə əlaqələndiyini və düzgün texniki qərarların necə verildiyini anlamaqdır.

Senior və Staff səviyyəli mühəndislər yalnız funksional kod yazmır, onlar sistemin gələcəkdə milyonlarla istifadəçini necə dəstəkləyəcəyini, hansı problemlərlə qarşılaşacağını və hansı trade-off qərarlarının verilməli olduğunu düşünürlər.

System Design əsas olaraq aşağıdakı suallara cavab verir:

* Sistem necə miqyaslanacaq?
* Yüksək trafik necə idarə olunacaq?
* Məlumat necə saxlanılacaq?
* Sistem xətalara necə davam gətirəcək?
* Performans necə optimallaşdırılacaq?
* Təhlükəsizlik necə təmin ediləcək?

---

# 1. Sistem Dizaynının Əsas Prinsipləri

Yaxşı sistem dizaynı yalnız texnologiya seçimi deyil. Əsas məsələ düzgün balans yaratmaqdır.

Məsələn:

Daha sürətli sistem istəyirsinizsə, cache əlavə edə bilərsiniz. Lakin məlumatların köhnəlməsi problemi yarana bilər.

Daha təhlükəsiz sistem istəyirsinizsə, əlavə yoxlamalar əlavə edə bilərsiniz. Lakin performans azala bilər.

Bu seçimlərə **trade-off** deyilir.

Senior mühəndisin əsas fərqi:

"Bu texnologiyanı istifadə edirəm" demək deyil,

"Niyə bu texnologiyanı seçdim və hansı problemləri qəbul etdim?" sualına cavab verə bilməkdir.

---

# 2. Scaling: Sistemi Böyütmək

Sistem böyüdükcə əsas problem performans və resurs idarəsi olur.

İki əsas scaling yanaşması mövcuddur.

## Vertical Scaling (Şaquli Scaling)

Mövcud serverin gücünü artırmaqdır.

Məsələn:

* Daha çox RAM
* Daha güclü CPU
* Daha sürətli disk

Üstünlükləri:

* Sadədir
* Kod dəyişiklikləri tələb etmir
* Kiçik sistemlər üçün effektivdir

Çatışmazlıqları:

* Hardware limiti var
* Single point of failure yaradır
* Böyük sistemlər üçün kifayət etmir

---

## Horizontal Scaling

Yeni serverlər əlavə etməklə yükü bölməkdir.

Məsələn:

Əvvəl:

```
User
 |
Server
```

Sonra:

```
          Load Balancer

       /       |       \

   Server1 Server2 Server3
```

Üstünlükləri:

* Daha çox istifadəçi dəstəkləyir
* Fault tolerance artır
* Serverlərdən biri düşsə sistem işləməyə davam edir

Lakin bunun üçün:

* Session idarəsi
* Database scaling
* Load balancing

kimi problemlər həll edilməlidir.

---

# 3. Load Balancer və Traffic İdarəsi

Load Balancer istifadəçi sorğularını müxtəlif serverlər arasında paylayır.

Əsas strategiyalar:

## Round Robin

Sorğuları ardıcıl serverlərə göndərir.

Sadədir, lakin serverlərin gücü fərqli olduqda effektiv deyil.

---

## Least Connections

Ən az aktiv bağlantısı olan server seçilir.

Real sistemlərdə daha effektiv ola bilər.

---

## IP Hash

Eyni istifadəçinin eyni serverə düşməsini təmin edir.

Session-based sistemlərdə istifadə edilə bilər.

---

## Health Check

Load balancer serverlərin vəziyyətini yoxlayır.

Əgər server işləmirsə:

* Trafik göndərmir
* Digər serverlərə yönləndirir

---

# 4. Database Dizaynı: SQL və NoSQL

Məlumat bazası seçimi sistem dizaynında ən vacib qərarlardan biridir.

## SQL Database

Nümunələr:

* PostgreSQL
* MySQL

Məlumat cədvəllərdə saxlanılır.

Əsas xüsusiyyət:

ACID prinsipləri.

### Atomicity

Əməliyyat ya tam baş verir, ya heç baş vermir.

### Consistency

Məlumat qaydaları qorunur.

### Isolation

Parallel əməliyyatlar bir-birinə mane olmur.

### Durability

Yazılan məlumat itmir.

İstifadə sahələri:

* Bank sistemləri
* Ödəniş sistemləri
* ERP sistemləri

---

## NoSQL Database

Nümunələr:

* MongoDB
* Redis
* Cassandra

Üstünlükləri:

* Böyük həcmli məlumat
* Yüksək sürət
* Flexible schema

İstifadə sahələri:

* Real-time tətbiqlər
* Cache sistemləri
* Analitika

---

# 5. Database Scaling

Database də böyüdükcə problemlər yaranır.

Əsas yanaşmalar:

## Replication

Database kopyaları yaradılır.

Məsələn:

```
        Master DB

       /        \

 Replica1   Replica2
```

Oxuma əməliyyatları replica-lara göndərilir.

---

## Sharding

Məlumat hissələrə bölünür.

Məsələn:

User ID:

1-1M → Server A

1M-2M → Server B

Bu böyük sistemlərdə istifadə olunur.

---

# 6. Cache və Performans Optimallaşdırması

Cache sistem performansını artırmaq üçün istifadə olunur.

Məsələn:

İstifadəçi profilini hər dəfə database-dən almaq əvəzinə:

```
Request

↓

Cache

↓

Database
```

istifadə olunur.

Ən məşhur cache sistemi:

Redis

Cache strategiyaları:

## Cache Aside

Əvvəl cache yoxlanılır.

Yoxdursa database-dən alınır.

---

## Write Through

Məlumat həm cache, həm database-ə yazılır.

---

# 7. CDN və Static Content

Dünyanın müxtəlif yerlərində istifadəçilər olduqda CDN istifadə edilir.

CDN:

* Şəkilləri
* Videoları
* JS/CSS fayllarını

istifadəçiyə yaxın serverdən verir.

Nəticə:

* Daha az latency
* Daha sürətli yüklənmə

---

# 8. API Dizaynı

## REST

Ən geniş istifadə olunan yanaşmadır.

Məsələn:

GET:

```
/users/123
```

POST:

```
/users
```

Üstünlükləri:

* Sadədir
* HTTP ilə uyğundur
* Stateless işləyir

---

## GraphQL

Client hansı məlumatı istəyirsə onu alır.

Problem:

Over-fetching və Under-fetching azalır.

---

## gRPC

Yüksək performanslı kommunikasiya üçündür.

İstifadə:

* Microservices
* Internal communication

Protocol Buffers istifadə edir.

---

# 9. Message Queue və Asinxron Sistemlər

Böyük sistemlərdə bütün əməliyyatları sinxron etmək düzgün deyil.

Məsələn:

Email göndərmək.

Səhv yanaşma:

```
User Request

↓

Send Email

↓

Response
```

Daha yaxşı:

```
User Request

↓

Queue

↓

Email Service
```

Texnologiyalar:

* Kafka
* RabbitMQ

Üstünlüklər:

* Sistem daha stabil olur
* Traffic spike idarə olunur

---

# 10. Microservices və Monolith

## Monolith

Bütün sistem bir tətbiqdir.

Üstünlük:

* Sadədir
* Başlamaq rahatdır

Çatışmazlıq:

* Böyüdükcə idarəsi çətinləşir

---

## Microservices

Sistem kiçik servislərə bölünür.

Məsələn:

* User Service
* Payment Service
* Notification Service

Üstünlüklər:

* Müstəqil deploy
* Ayrı scaling

Çətinlik:

* Network problemləri
* Monitoring
* Data consistency

---

# 11. TCP və UDP

## TCP

Etibarlı əlaqə yaradır.

Xüsusiyyətləri:

* Paket sırası qorunur
* Data itkisinin qarşısı alınır

İstifadə:

* Bank
* Web
* Email

---

## UDP

Daha sürətlidir.

Lakin paket itkisi mümkündür.

İstifadə:

* Video call
* Online oyunlar
* Live streaming

---

# 12. Təhlükəsizlik

Senior mühəndis sistem dizaynında təhlükəsizliyi əvvəldən düşünməlidir.

Əsas mövzular:

## Authentication

Kim olduğunun yoxlanılması.

Məsələn:

* JWT
* Session
* OAuth

---

## Authorization

Nə edə biləcəyinin yoxlanılması.

Yanaşmalar:

RBAC:

Role əsaslı icazə.

ABAC:

Attribute əsaslı icazə.

ACL:

Resource səviyyəsində icazə.

---

## Digər müdafiələr

### Rate Limiting

Çox sorğu göndərilməsinin qarşısını alır.

### CORS

Frontend domain icazələrini idarə edir.

### SQL Injection Protection

Prepared statements istifadə olunur.

### Firewall

Şəbəkə səviyyəsində qoruma təmin edir.

---

# 13. Reliability və Observability

Böyük sistemlərdə sadəcə işləmək kifayət deyil.

Sistem izlənilə bilməlidir.

Əsas anlayışlar:

## Logging

Sistemdə baş verən hadisələrin qeyd olunması.

## Monitoring

Sistemin vəziyyətinin izlənməsi.

## Metrics

Məsələn:

* CPU istifadəsi
* Response time
* Error rate

## Tracing

Request-in sistem daxilində hansı servislərdən keçdiyini göstərir.

---

# Nəticə

Senior mühəndis olmaq yalnız framework və proqramlaşdırma dili bilmək deyil.

Senior mühəndis:

* Sistemi miqyaslaya bilir
* Trade-off qərarları verir
* Performans problemlərini anlayır
* Təhlükəsizlik risklərini görür
* Böyük arxitekturaları dizayn edə bilir

Müasir proqram sistemləri bir neçə komponentin birləşməsindən yaranır:

* Load Balancer
* Database
* Cache
* Queue
* API Gateway
* Authentication sistemi
* Monitoring

Bu komponentləri düzgün birləşdirmək və gələcək ehtiyacları əvvəlcədən düşünmək sistem dizaynının əsas məqsədidir.
