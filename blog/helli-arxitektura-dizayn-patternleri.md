# Böyük şirkətlər miqyaslanan sistemləri necə qurur? Həll arxitekturasının dizayn patternləri

Heç fikirləşmisiniz ki, Amazon kimi nəhəng şirkətlər milyonlarla istifadəçiyə eyni anda xidmət verən sistemləri necə layihələndirir? Kod yazmağa başlamazdan çox-çox əvvəl həll arxitektorları (solution architect) müxtəlif variantları müqayisə edir, ölçüb-biçir və biznesin ehtiyaclarına ən uyğun arxitekturanı seçir.

Bu yazıda gəlin birlikdə həll arxitekturasının ən populyar dizayn patternlərini gəzək — çoxsəviyyəli (n-tier) arxitekturadan tutmuş DDD, Circuit Breaker, konteynerlər və Clean Architecture-a qədər. Söhbət nəzəri quru siyahıdan getmir: hər pattern üçün konkret nümunə, real ssenari və "niyə vacibdir" izahı olacaq. Yolun sonunda antipattern-lərə də toxunacağıq — yəni "belə etmə" siyahısına.

Bu, sanki arxitekturanın mənəvi mərkəzidir: burada öyrəndikləriniz bütün gələcək dizayn qərarlarınıza təsir edəcək.

> Yaxşı arxitekt kod yazmır — o, variantları müqayisə edir və məhdudiyyətlər (xərc, performans, miqyas, əlçatanlıq) daxilində ən yaxşı kompromisi seçir.

---

## Hər şey təməldən başlayır: n-tier (çoxsəviyyəli) arxitektura

N-tier arxitektura — və ya çoxsəviyyəli arxitektura — zəif bağlı (loosely coupled), miqyaslanan və elastik sistemlərin əsasını təşkil edir. İdeya sadədir: məhsulun funksiyalarını **səviyyələrə** bölürsən — təqdimat, biznes, verilənlər bazası, servislər — və hər səviyyəni digərlərindən asılı olmadan qurub miqyaslaya bilirsən.

Bu bölünmə niyə bu qədər dəyərlidir?

- **Yeni texnologiya asan gəlir.** Bir səviyyədə funksiya əlavə edirsən, digər səviyyələr toxunulmaz qalır.
- **Təhlükəsizlik izolyasiyası.** Bir səviyyə hack olunsa, digərlərinə keçmir — hərəsinin öz şəbəkə sərhədi var.
- **Diaqnostika rahatlaşır.** Problem çıxanda hansı səviyyədə olduğunu tez tapırsan.

Ən geniş yayılmış variant — **üçsəviyyəli arxitektura**. Təsəvvür et ki, brauzerdən internet-mağazaya girib köynək alırsan və ya blog oxuyub şərh yazırsan. Arxada üç səviyyə işləyir.

### Web səviyyəsi (təqdimat səviyyəsi)

İstifadəçiyə baxan hissə. İstifadəçi interfeysi burada yaşayır — HTML, CSS, React, Angular kimi texnologiyalarla qurulur. İstifadəçidən məlumatı toplayır və application səviyyəsinə ötürür.

Şirkətlər vaxtının böyük hissəsini məhz bu səviyyədə — istifadəçi təcrübəsini (UX) yaxşılaşdırmağa sərf edir. Bir çox təşkilatda ayrıca UX komandaları var ki, istifadəçilərin tətbiqlə necə davrandığını araşdırır.

### Application səviyyəsi (məntiq səviyyəsi)

Bütün biznes-məntiq burada oturur. Web səviyyəsi məlumatı gətirir, bu səviyyə onu emal edir.

Nümunə: Amazon-da tarix intervalı seçib sifarişlərin xülasəsini istəyirsən. Web səviyyəsi tarixləri ötürür, application səviyyəsi hesablayır (neçə sifariş, ümumi məbləğ, neçə məhsul) və nəticəni geri qaytarır. Tövsiyə sistemləri, fərdiləşdirilmiş səhifələr — bütün mürəkkəb alqoritmlər buradadır. Serverin dilində yazılır: C++, Java, .NET, Node.js.

### Verilənlər bazası səviyyəsi (data səviyyəsi)

İstifadəçi profillərinə və əməliyyatlarına aid hər şey uzunmüddətli saxlanmaq üçün burada durur. Login edəndə application səviyyəsi sənin parolunu məhz bu səviyyədəki məlumatla tutuşdurur.

Arxitekt reляasion baza (PostgreSQL, MySQL, Oracle, Amazon Aurora) və ya NoSQL baza (DynamoDB, MongoDB, Cassandra) seçə bilər. Performans üçün qabağa Redis və ya Memcached kimi keş bazası qoya bilər.

> Data səviyyəsi ən çox təhlükəsizlik tələb edən yerdir. Məlumatı həm saxlanarkən (at rest), həm ötürülərkən (in transit) şifrələ.

Səviyyələrin sayı tətbiqin mürəkkəbliyindən asılıdır. Data-access səviyyəsi əlavə edib dörd- və ya beşsəviyyəli edə bilərsən — məntiqi bölünmə mürəkkəbliyi azaldır, xidmət və miqyaslanmanı asanlaşdırır.

---

## Bir kod bazası, çox müştəri: SaaS multi-tenant arxitektura

Yuxarıdakı çoxsəviyyəli arxitekturanı bir təşkilat üçün qursan, ona **single-tenant** (tək-icarəçi) deyilir. Amma bu gün moda başqadır — **multi-tenant** (çox-icarəçi).

SaaS (Software-as-a-Service) modeli məhz multi-tenant təməl üzərində qurulur: proqram məhsulunun bir nüsxəsi və onun infrastrukturu bir neçə müştəriyə xidmət edir. Müştərilər tətbiqi və bazanı **birlikdə** istifadə edir, amma bir-birlərini görmürlər — hər biri öz unikal konfiqurasiyası, profili və datası ilə izolyasiya olunub.

Nümunələr tanışdır: Salesforce CRM, Jira, Slack, Google Workspace.

Hər təşkilat — bir **tenant** (icarəçi). SaaS provayderi hər təşkilata unikal `tenant ID` verir. İzolyasiya üç səviyyədə ola bilər:

- **Baza səviyyəsində izolyasiya:** hər tenant öz ayrı bazasına bağlanır. Compliance/təhlükəsizlik səbəbindən ümumi baza olmazsa, bu variant lazımdır.
- **Cədvəl səviyyəsində izolyasiya:** hər tenant-a ayrı cədvəl. Cədvəlin adına tenant ID prefiks kimi əlavə olunur.
- **Sətir səviyyəsində izolyasiya:** hamı eyni cədvəli paylaşır, amma əlavə sütunda hər sətirin `tenant ID`-si saxlanır. Sorğu həmişə tenant ID ilə süzülür.

Niyə SaaS bu qədər populyarlaşır? Çünki əksər təşkilat üçün proqram məhsulu qurmaq **əsas ixtisas deyil**. SaaS onlara imkan verir ki, öz profil işlərinə fokuslansınlar, IT-ni isə ekspertlərə buraxsınlar. Mənfi tərəf: SaaS-ın fərdiləşdirmə imkanları çox vaxt məhduddur, ona görə korporativ müştəri əvvəlcə diqqətlə yoxlamalıdır ki, hazır həll onun spesifik tələblərinə uyğun gəlirmi.

---

## Monoliti parçalamaq: Servis-yönümlü arxitektura (SOA)

SOA patternində tətbiqin müxtəlif komponentləri şəbəkə üzərindən, bir kommunikasiya protokolu ilə danışır. Hər servis uçdan-uca bir funksiya təqdim edir — məsələn "sifariş tarixçəsini gətir".

Qısası: SOA monolit tətbiqi götürür, bəzi əməliyyatları ayrı, müstəqil işləyən servislərə çıxarır. Məqsəd — servislər arası bağlılığı zəiflətmək. Məsələn, ödəniş servisini əsas tətbiqdən ayırıb öz ayrı həllinə köçürmək.

Üstünlüklər: paralel inkişaf, ayrıca deploy, hər servisi ayrıca miqyaslamaq. Mənfi tərəf: idarəetmə çətinləşir, mürəkkəblik və xərc artır — ona görə monitoring və deploy-u avtomatlaşdırmaq şərtdir.

Vaxtilə SOAP (Simple Object Access Protocol) ən populyar mesajlaşma protokolu idi, amma o, hər şeyi XML-də ötürdüyü üçün "ağırdır". Bu gün SOAP köhnəlmiş sayılır, ona görə diqqətimizi REST-ə yönəldirik.

---

## İnternetin dilini danışmaq: RESTful arxitektura

RESTful web servis yüngül olduğu üçün daha yüksək performans verir. SOAP-dan fərqli olaraq təkcə XML deyil, müxtəlif formatları dəstəkləyir: JSON, düz mətn, HTML, XML. REST özü bir arxitektura üslubudur — zəif bağlı tətbiqlər üçün standart müəyyən edir və data ötürmək üçün HTTP protokolundan istifadə edir.

JSON (JavaScript Object Notation) REST-də data mübadiləsi üçün ən əlçatan formatdır — sadə, dilə bağlı deyil, `açar — dəyər` cütlərindən ibarətdir.

REST-in fundamental prinsiplərini internet-mağaza nümunəsində gəzək:

- **Stateless (vəziyyətsizlik):** hər sorğu serverin onu başa düşməsi üçün lazım olan bütün məlumatı özündə daşımalıdır. Server sessiya haqqında heç nə saxlamır. Səbətini görmək istəsən, sorğu səbətin ID-sini daşımalıdır.
- **Client-server:** iki ayrı hissə — client (interfeys, istifadəçi ilə iş) və server (backend, data emalı). Ayrı-ayrı inkişaf edə bilirlər.
- **Vahid interfeys:** REST standart HTTP metodları ilə CRUD əməliyyatlarını icra edir.

CRUD metodları belə işləyir:

```http
GET    https://example.com/api/products          # məhsulları oxu (Read)
POST   https://example.com/api/cart              # səbətə yeni məhsul əlavə et (Create)
PUT    https://example.com/api/cart/{productId}  # səbətdəki sayı yenilə (Update)
DELETE https://example.com/api/cart/{productId}  # səbətdən məhsulu sil (Delete)
```

Yuxarıda hər sətir bir HTTP metodunu bir URL-ə və CRUD əməliyyatına bağlayır. `POST` və `PUT`-da məhsulun detalları sorğunun **body**-sində gedir; `GET` və `DELETE`-də isə əsas məlumat URL-in özündədir. Bu standart sayəsində developer servisin daxili reallaşmasını bilmədən onunla işləyə bilir.

Digər prinsiplər:

- **Resurslar:** REST-də hər şey resursdur və hər resursun öz URL-i var, məs. `www.amazon.com/products/{product_id}`.
- **Resursların təqdimatı:** eyni resurs müxtəlif formatda ola bilər (JSON, XML, HTML). Eyni məhsul brauzerdə və mobil tətbiqdə fərqli görünə bilər.
- **Çoxsəviyyəli sistem:** client bilmədən sorğu load balancer və ya keş səviyyəsindən keçə bilər.
- **Code on demand:** server client-ə icra üçün kod göndərə bilər (məs. brauzerdə işləyən JavaScript).

---

## Praktikada: RESTful internet-mağaza

Amazon kimi mağazaların bütün dünyada istifadəçisi və milyonlarla məhsuldan ibarət nəhəng kataloqu var. Hər məhsulun şəkli, rəyi, videosu. Belə kataloqu qlobal auditoriya üçün saxlamaq asan iş deyil. Gəlin AWS üzərində RESTful prinsiplərinə uyğun tipik axını izləyək:

- İstifadəçi ünvanı yazanda sorğu DNS-ə gedir. **Amazon Route 53** sorğunu web tətbiqin oturduğu serverə yönləndirir.
- Auditoriya qlobaldır, kataloq statik şəkil və videolarla doludur. **Amazon CloudFront** (CDN) bu statik resursları istifadəçiyə yaxın nöqtələrdə keşləyib çatdırır.
- Statik məzmun və loglar **Amazon S3**-də saxlanır.
- İstifadəçi müxtəlif cihazlardan girə bilər (səbətə mobildən əlavə edir, kompüterdən ödəyir). Sessiya datası üçün uzunmüddətli anbar lazımdır — **DynamoDB** (sxem tələb etməyən NoSQL, kataloq üçün ideal).
- **Amazon ElastiCache** məhsul keşi kimi işləyir — bazaya oxuma/yazma sayını azaldır, gecikməni endirir.
- Axtarış satış üçün kritikdir — **Amazon CloudSearch** və ya AI dəstəkli **Amazon Kendra**.
- Tövsiyələr ayrıca servisdə — S3-dəki logları oxuyub istifadəçiyə təklif verir.
- Deploy tezliyi yüksək olan komponentlər üçün **AWS Elastic Beanstalk** infrastrukturu avtomatik ayırır və monitorinq edir.

Diqqət yetir: hər servis mümkün qədər müstəqil işləyir. Məhz bu müstəqillik REST-in gücüdür.

---

## Sürət lazımdırsa — keş: keş əsaslı arxitektura

Keşləmə — datanı və ya faylları müvəqqəti olaraq, sorğu mənbəyi ilə uzunmüddətli anbar arasında bir ara-anbarda saxlamaqdır. Məqsəd: gələcək sorğuları sürətləndirmək, kanala düşən yükü azaltmaq. Nəticə: daha sürətli tətbiq, daha az xərc.

Keş arxitekturanın hər səviyyəsində tətbiq oluna bilər. Gəlin səviyyə-səviyyə baxaq:

- **Client tərəfdə keş:** brauzer əvvəl baxılan məzmunu saxlayır. `cache-control` HTTP başlığı harada və nə qədər (TTL — Time To Live) saxlanacağını təyin edir. Cookie-lər də bura aiddir.
- **DNS keşi:** ünvanın IP-yə çevrilməsi keşlənir, sayt tez açılır.
- **Web məzmunu keşi:** qrafika, video, HTML — CDN vasitəsilə istifadəçiyə yaxın "edge location"-larda keşlənir. Oyunlar, bloglar, kataloq səhifələri üçün əladır.
- **Application səviyyəsi keşi:** mürəkkəb, təkrarlanan sorğuların nəticəsini saxlayır — biznes-məntiq və bazaya təkrar müraciəti aradan qaldırır.
- **Verilənlər bazası keşi:** bazanın buraxma qabiliyyətini artırır, gecikməni azaldır.

İki ən populyar sistem — **Redis** və **Memcached**. Memcached daha sürətlidir (aşağı strukturlu, açar-dəyər data üçün), Redis isə daha dayanıqlıdır və mürəkkəb data strukturları ilə işləyir.

İndi maraqlı hissəyə — konkret keş patternlərinə keçək.

### Cache distribution (Paylanmış keşləmə)

Ənənəvi üçsəviyyəli web-hostinq modelində keş **hər üç səviyyədə** tətbiq olunur. Məqsəd: bazaya müraciəti minimuma endirmək. AWS-də bu belə görünür:

- **Route 53** — DNS↔IP uyğunluğunu keşləyir.
- **S3** — statik məzmun (yüksək dəqiqlikli qrafika, video) anbarı.
- **CloudFront** — yüksək trafikli məzmun üçün edge keşi.
- **DynamoDB** — sessiya anbarı.
- **Elastic Load Balancing** — trafiki Auto Scaling qrupları arasında bölür.
- **ElastiCache** — application keşi, baza yükünü azaldır.

### Rename distribution (Adı dəyişməklə paylama)

Problem: CDN-də data TTL bitənə qədər yenilənmir. Bəs məhsulun səhv təsvirini **dərhal** düzəltmək lazımdırsa?

Həll: faylı serverdə üstünə yazıb TTL bitməsini gözləmək əvəzinə, server yenilənmiş faylı **yeni adla** göndərir və səhifədəki URL-i yeniləyir. İstifadəçi köhnə URL-i istəyəndə CloudFront köhnə (bayat) faylı verir; yeni URL isə mənbədən təzə versiyanı çəkir.

Alternativ — köhnə faylı dərhal invalidasiya etmək, amma bu bahadır. Seçim biznes tələbindən və büdcədən asılıdır.

### Cache proxy (Keşləyən proksi-server)

Keş səviyyəsi web tətbiq serverindən **yuxarıda** yerləşir. Üstünlükləri:

- web/application serverdə heç nəyi dəyişmədən məzmunu keşdən çatdırır;
- dinamik məzmun yaratma yükünü azaldır;
- keşi brauzer səviyyəsində və ya ayrıca keş səviyyəsində qura bilərsən.

Diqqət: single point of failure olmamaq üçün keşin bir neçə nüsxəsini saxla.

### Rewrite proxy (Əvəzləyən proksi-server)

Mövcud sistemləri dəyişmədən statik məzmuna gedən linkləri dəyişmək lazımdırsa. Proksi-serveri web serverlərin qabağına qoyub URL-ləri yenidən yazırsan. AWS-də addımlar:

1. EC2-də proksi-server qaldır — o, load balancer ilə S3 arasında məzmunu yenidən yaza bilər.
2. URL-i yenidən yazan qaydalar əlavə et. Məsələn, `https://cdn/test.jpg` → `/test.jpg`:

```html
<!-- Proksi qaydasından ƏVVƏL: -->
<img src="https://cdn/test.jpg"/>

<!-- Proksi qaydasından SONRA: -->
<img src="/test.jpg"/>
```

Yuxarıdakı iki sətir eyni şəkli göstərir, amma proksi qaydası ELB-yə (Elastic Load Balancing) məzmunun yeni yerini göstərir — tətbiqin özündə heç nə dəyişmir.

3. Proksi-serverlərə auto-scaling tətbiq et.

### App caching (Application səviyyəsində keşləmə)

Keş səviyyəsi application serverləri ilə baza arasına qoyulur. Ən tez-tez gələn sorğular keşdən qarşılanır, baza yükü azalır.

Data ilə işləmənin iki yolu var:

- **Lazy caching (cache aside):** keşdə data yoxdursa, bazadan çəkilir və keşə yazılır. Oxuma-intensiv tətbiqlər üçün. Nümunə: məhsul kataloqu — tez-tez oxunur, nadir yenilənir.
- **Write-through:** data eyni anda həm keşə, həm bazaya yazılır. Dərhal ardıcıllıq (consistency) lazım olanda. Nümunə: istifadəçi rəyləri — yazan kimi məhsul səhifəsində görünməlidir.

### Memcached vs Redis — hansını seçmək?

| Memcached | Redis |
|-----------|-------|
| Çoxsaplı (multithreaded) | Təksaplı icra |
| Əlavə CPU nüvələrindən istifadə edir | Çoxnüvədən istifadə edə bilmir, nisbətən yavaş |
| `açar — dəyər` data | Mürəkkəb, qabaqcıl data strukturları |
| Uzunmüddətli saxlama yoxdur — sbой olsa data itir | Uzunmüddətli saxlama var (built-in read replica + failover) |
| Xidməti sadə | Kluster tələb etdiyi üçün xidmət mürəkkəb |
| Struktursuz string data üçün əla (HTML, JSON) | Oyun liderlər cədvəli, real-time səsvermə üçün əla |

Sadə seç: keşə Redis-in qabaqcıl funksiyaları lazım deyilsə — **Memcached** (ucuz, sadə). Uzunmüddətli saxlama, mürəkkəb tiplər lazımdırsa — **Redis**.

> Keş effektiv olmaq üçün **cache hit** (data keşdə var) nisbəti yüksək olmalıdır. **Cache miss** (data yoxdur) baza yükünü artırır. Keş həcmi məhduddur — TTL təyin et, köhnə datanı sıxışdır.

---

## Məsuliyyəti bölmək: MVC arxitekturası

MVC — ən populyar dizayn patternlərindən biridir. Tətbiqi üç bir-biri ilə əlaqəli komponentə bölür:

- **Model:** tətbiqin daxili vəziyyəti, qaydaları, məntiqi və datası. View və Controller-dən asılı deyil — interfeys dəyişəndə data işi pozulmur. Məsuliyyətləri: data idarəetməsi, biznes-qaydaların tətbiqi, dəyişiklik barədə xəbərdarlıq.
- **View:** modelin datasının vizual təqdimatı. Data dəyişəndə avtomatik yenilənir. Bir datadan çox View yaratmaq olar (cədvəl, diaqram). Məsuliyyətləri: datanı göstərmək, UI-ni idarə etmək.
- **Controller:** Model ilə View arasında vasitəçi. İstifadəçinin daxiletməsini alır, emal edir (bəlkə modeli yeniləyir), nəticəni View-ə qaytarır. Model və View-in sinxron qalmasını təmin edir.

Üstünlükləri: məsuliyyət bölgüsü, təkrar istifadə, xidmət rahatlığı, çeviklik (bir hissəni digərinə toxunmadan dəyişmək olar).

### MVC nümunə: kitab internet-mağazası

- **Model:** kitablar, müəlliflər, kateqoriyalar, rəylər. Əməliyyatlar: konkret kitabın detalını gətir, alışdan sonra anbarı yenilə, kataloqa yeni kitab əlavə et.
- **View:** kitab siyahısı səhifəsi, kitab detalı səhifəsi, səbət səhifəsi.
- **Controller:** kitab axtar (Model-ə sorğu → View-i yenilə), səbətə əlavə et (Model-i yenilə → səbət View-ini yenilə), sifariş rəsmiləşdir (əməliyyatı emal et, anbarı yenilə, təsdiq göstər).

---

## Reallığı modelləşdirmək: Domain-Driven Design (DDD)

DDD — mürəkkəbliyi anlamaq və həll etmək üçün metodologiya. Proqram məhz **predmet sahəsi (domain)** — biznesin əsas məntiqi və konsepsiyaları — üzərində qurulur. Vahid terminologiya və aydın kontekstlərə bölmə sayəsində DDD problemi dərindən anlamağa kömək edir.

Gəlin **səhiyyə idarəetmə sistemi** nümunəsində baxaq — xəstəlik tarixçələri, həkim qəbulları, müalicə kursları, xəstə hesabları.

- **Domain (predmet sahəsi):** məhsulun həll etdiyi konkret problemlər toplusu. Bizim halda — səhiyyə idarəetməsi (xəstələr, tibbi personal, qəbullar, müalicə, hesablaşma).
- **Vahid dil (ubiquitous language):** developer və qeyri-texniki stейkholderlərin ortaq dili. Hamı "xəstə", "qəbul", "müalicə" terminlərini eyni başa düşür.
- **Bounded contexts (məhdud kontekstlər):** tətbiq aydın sərhədli kontekstlərə bölünür. Xəstə idarəetmə konteksti, qəbul planlaşdırma konteksti, hesablaşma konteksti — hərəsi öz konsepsiyaları ilə.
- **Entity-lər (sущностlər):** zaman içində qalan aydın kimlikli obyektlər — xəstə (unikal ID), tibbi işçi (unikal identifikator).
- **Value object-lər:** kimliyi olmayan, xarakteristika təsvir edən obyektlər. Dəyişməzdir (immutable), asan əvəzlənir — ünvan, doğum tarixi, xəstəlik tarixçəsi.
- **Aggregate-lər (aqreqatlar):** vahid tam kimi baxılan əlaqəli obyektlər toplusu. Bir kök entity var, xarici keçidlər yalnız köklə. Nümunə: "qəbul" aqreqatı — xəstə, tibbi işçi, kabinet, vaxt intervalı. "Qəbul" kökdür, bütün dəyişikliklər onun üzərindən gedir.
- **Repository-lər:** aqreqatları data anbarından çəkmək üçün abstraksiya. "Xəstə" repository, "qəbul" repository.
- **Factory-lər:** mürəkkəb obyekt və aqreqatların yaradılma məntiqini əhatələyir, düzgün ilkin vəziyyəti təmin edir.
- **Servislər:** əməliyyat məntiqi bir entity-yə və ya value object-ə aid deyilsə, servis kimi təyin olunur. Nümunə: hesablaşma servisi — ümumi məbləği hesablayır, sığorta endirimini tətbiq edir.
- **Domain event-lər:** domain-də mühüm bir şeyin baş verdiyini bildirir. Nümunə: qəbul planlaşdırma hadisəsi tibbi işçiyə xəbər verir; ödəniş bitmə hadisəsi çek yaratmağı işə salır.
- **Anti-corruption layer (ACL):** fərqli dil/model işlədən sistemlər arasında çevirmə aparır. Hesablaşma sistemi xarici ödəniş şlüzü ilə danışanda ACL modelləri çevirir.

> DDD mürəkkəb sahələrdə əladır — proqramı təmsil etdiyi real dünya konsepsiyalarına yaxınlaşdırır. Ekspertlər və developerlər arasında ortaq dil və anlayış yaradır.

---

## Xətanı təcrid etmək: Circuit Breaker (Predoxranitel) patterni

Paylanmış sistemdə tez-tez aşağı səviyyəli servislərə çağırışlar gedir. Bəzən çağırış uğursuz olur və ya servis cavab əvəzinə donub qalır. Kod uğursuz çağırışı dəfələrlə təkrar edir — bu isə fəlakətdir: uzaq servisin bərpası dəqiqələr, hətta saatlar çəkə bilər, dərhal təkrar isə növbəti sıradan çıxmaya səbəb olur. Nəticədə istifadəçi xəta cavabını daha uzun gözləyir, təkrar cəhdlər isə proqram saplarını yeyib **kaskad sıradan çıxmaya** aparır.

Circuit Breaker (həm də "prerıvatel" və ya "pereklyuçatel") aşağı asılılıqların sağlamlığını yoxlayır. Problem aşkarlayanda sorğuları yumşaq şəkildə rədd edir — asılılıq bərpa olana qədər. Necə işləyir:

1. Müəyyən müddət ərzində sağlam/xəstə sorğular izlənir.
2. Xəstə sorğuların faizi eşiyi keçəndə (və ya ümumi istisna sayı həddi aşanda) "keçirici" **açıq** işarələnir.
3. Bu vəziyyətdə bütün sorğular asılılığa toxunmadan dərhal istisna atır — timeout müddəti boyu.
4. Timeout bitəndə kiçik bir pay sorğu asılılığa toxunmağa çalışır — bərpa olubmu deyə.
5. Kifayət qədər sorğu sağlamsa, keçirici yenidən **bağlanır**, hər şey normala qayıdır.

Əsasda bir sonlu avtomat (state machine) durur. Servislərin vəziyyəti DynamoDB, Redis/Memcached kimi aşağı gecikməli anbarda saxlanıla bilər.

---

## Gəmidən öyrənmək: Bulkhead (Pereborka) patterni

Bulkhead — gəminin gövdəsindəki su keçirməz arakəsmələr. Məqsədi: deşik açılanda suyun bütün gəmiyə yayılmasının qarşısını almaq. Bir bölmə su alır, gəmi batmır.

Eyni ideya arxitekturada: sistemi bölmələrə ayır ki, **bir sıradan çıxma bütün sistemi sıradan çıxarmasın**. Tətbiqin elementləri yüksək asılılıqlı servis pool-larında izolyasiya olunur. Biri sıradan çıxsa, digərləri sonrakı servislərə xidmət etməyə davam edir.

Nümunə: Servis 3 iki pool-a bölünüb. Servis 3 sıradan çıxsa, Servis 1 və Servis 2-ə təsir yalnız onların hansı pool-dan asılı olmasından asılıdır — bütün sistem yıxılmır.

Bulkhead tətbiq edərkən yadda saxla:

- Bir servisin sıradan çıxması bütün tətbiqi yıxmamalıdır.
- Resursdan bir az az səmərəli istifadə qəbul olunandırmı — qərar ver.
- Faydalı detallaşma seç — pool-lar idarə oluna bilən olsun.
- Hər seqmentin performansını izlə, SLA-ya riayət et, bir pool-un sıradan çıxmasını test et.

Məqsəd: kaskad sıradan çıxmaların qarşısını almaq, kritik istehlakçıları standartlardan təcrid etmək.

---

## Ünvanı sabit saxlamaq: Floating IP patterni

Monolit tətbiqlər çox vaxt işlədikləri serverdən asılıdır — konfiqurasiyada və kodda DNS adları və IP-lər sərt kodlaşdırılıb (hardcoded). Bu problem yaradır: köhnə serveri əvəz etmək lazım olsa, ünvan dəyişir və tətbiq işini dayandıra bilər.

Həll: köhnə serverin IP və DNS adı ilə yeni server yaratmaq. Bu, şəbəkə interfeysini köhnə (işləməyən) nüsxədən yeniyə köçürməklə olur. Şəbəkə interfeysi adətən NIC (Network Interface Card) üzərində qurulur — həm aparat, həm proqram ola bilər. İnterfeysi köçürmək = yeni server köhnənin bütün funksiyalarını üzərinə götürür. Tətbiq eyni DNS adı və IP ilə işləməyə davam edir, geri qaytarmaq da asandır.

AWS bunu asanlaşdırır: **EIP (Elastic IP)** və **ENI (Elastic Network Interface)**. Bir nüsxə sıradan çıxsa, EIP-i bir serverdən digərinə köçürürsən — DNS yeniləmə lazım olmaya bilər. Həm publik, həm privat IP-ni köçürmək lazımdırsa, daha çevik ENI-dən istifadə et.

---

## Virtual maşından konteynerə: tətbiqin konteynerdə deploy-u

Dünyada daim yeni proqramlaşdırma dilləri, yeni texnologiyalar yaranır. Fərqli texnoloji steklər fərqli deploy mühiti tələb edir. Bizə elə format lazımdır ki, hər yerdə işləsin, üstəlik bütöv, yüngül və portativ olsun.

Necə ki, yük konteynerləri daşımanı standartlaşdırdı, proqram konteynerləri tətbiq daşımanı standartlaşdırır. **Docker** — tətbiqin işləməsi üçün lazım olan hər şeyi (fayl sistemi strukturu, demons, kitabxanalar, asılılıqlar) bir konteynerdə paketləyən alət.

Fərq önəmlidir: **virtual maşınlar əməliyyat sistemi səviyyəsində, konteynerlər isə nüvə (kernel) səviyyəsində** izolyasiya olunur. Bu, bir host OS-də çox tətbiqin işləməsinə imkan verir — hərəsinin öz fayl sistemi, yaddaşı, kitabxanaları ilə.

Konteynerlər bir VM-də çox tətbiqi deploy etməyə imkan verir. Hər tətbiqin öz icra mühiti var, hamısı host-un nüvəsini paylaşır. Nəticə: sürətli başlanğıc, səmərəli resurs istifadəsi. Konteyner образları fayl sistemi qatlarından qurulur və ümumi faylları paylaşa bilər — disk yükünü azaldır, yükləməni sürətləndirir.

### Konteynerlərin üstünlükləri

Tez-tez soruşulur: "Nüsxələr (instances) varsa, konteyner nəyə lazımdır? Nüsxələr onsuz da izolyasiya vermir?" Docker bir sıra üstünlük verir:

- **Portativ icra mühiti:** bir dəfə qur, istənilən OS-də işlət.
- **Sürətli inkişaf/deploy tsikli:** dəyişiklik et, saniyələr içində hər yerdə işlət.
- **Asılılıqlar + tətbiq bir artefaktda:** kodu kitabxanalarla birlikdə paketlə.
- **Fərqli versiyalar birlikdə:** fərqli asılılıqlı tətbiqlər bir serverdə eyni anda.
- **Tam avtomatlaşdırma:** konteyner idarəetməsi skriptlərlə — az xərc, az səhv.
- **Səmərəli resurs istifadəsi:** bir serverdə eyni konteynerin çox nüsxəsi.
- **Təhlükəsizlik idarəetməsi rahatlığı:** konteyner platformadan asılıdır, tətbiqdən yox.

Docker Linux nüvəsinin imkanlarından (namespaces və cgroups) istifadə edir ki, prosesləri tam izolyasiya etsin. Bir maşında fərqli Java runtime versiyaları tələb edən iki tətbiq işləyə bilər — çünki hər Docker konfiqurasiyasının öz Java versiyası və kitabxanaları var.

### Konteyner orkestrasiyası

Mürəkkəb, çox-mikroservisli tətbiqləri konteyner deploy mexanizmi ilə tez qaldırmaq olar. Konteyner qur (dev), test mühitinə keçir, sonra prod-a burax — mühit dəyişməz qalır.

- **Docker** — yüngül konteyner virtuallaşdırma platforması. Avtonom versiyasını istənilən kompüterə qurmaq olar.
- **Kubernetes** — konteyner orkestrasiya servisi. Docker və digər platformalarla işləyir, avtomatlaşdırılmış idarəetmə, təhlükəsizlik, şəbəkə, miqyaslanma verir.

AWS bunları genişləndirir: **Amazon ECS** (Elastic Container Service) — Docker konteynerlərini avtomatik miqyaslayıb koordinasiya edən tam idarə olunan servis; **Amazon EKS** (Elastic Kubernetes Service) — Kubernetes üçün.

### Konteyner əsaslı arxitektura

Konteynerlərlə işə başlamaq üçün əvvəlcə pilot iş yükü müəyyən et, orkestrasiya ilə idarə et. Mövcud mikroservis komponentlərini konteynerlərə köçür.

Diqqət: **miqrasiya asan deyil**, əgər tətbiq əvvəldən konteyner mühiti üçün nəzərdə tutulmayıbsa. Çox tətbiq faylları lokal saxlayır və vəziyyətli (stateful) sessiyalara arxalanır. Köçürəndə bu spesifik tələblərə diqqət yetir.

Kubernetes get-gedə populyarlaşır. AWS-də bulud servisləri "control plane" (idarəetmə müstəvisi) təklif edir — self-managed node, managed node, və ya serversiz **AWS Fargate**. Control plane konteynerləşdirilmiş tətbiqlərin orkestrasiyası və nəzarəti üçün mərkəzi interfeysdir.

Nümunə: vəziyyətli (stateful) servisi Amazon EKS-də Java və ya .NET-də işlədirsən, sessiya vəziyyətini isə Redis bazasında idarə edirsən. Belə arxitekturanın komponentləri:

- **Amazon VPC** — təyin olunmuş subnet-lərlə. Publik subnet — load balancer hostinqi; privat subnet-lər — tətbiq və baza deploy-u.
- **Load balancer** — konteynerlərdəki sayta girişi təmin edir.
- **Amazon EKS klasteri** — Kubernetes-də idarə olunan node qrupu, çox konteyner işlədir.
- **Amazon ElastiCache Redis** — istifadəçi sessiya vəziyyətini saxlayır.

Sessiyaları Redis-də saxlamaqla tətbiqi miqyaslamaq olur. Amma diqqət: bu həll tətbiq kodunda dəyişiklik tələb edə bilər, bu isə bəzi ssenaridə qəbul olunmaya bilər.

---

## Data hər şeydir: arxitekturada verilənlər bazası ilə iş

Data hər tətbiqin mərkəzindədir və onun miqyaslanması həmişə problem yaradır. Səmərəli data işi gecikməni azaldır, performansı artırır.

Keş fəslində gördük: tez-tez istənən datanı bazanın qabağına Redis/Memcached keşi qoyaraq sürətləndirmək olar. Amma istifadəçi sayı artdıqca relaasion baza böyük data həcmi ilə üzləşir. Nə etmək olar?

- **Şaquli miqyaslama (vertical scaling):** serverə yaddaş və CPU gücü əlavə et. Sadə, amma məhdud.
- **Read replica (oxuma nüsxəsi):** oxuma-intensiv tətbiqlərdə. Bütün oxuma sorğuları replika-lara gedir, əsas node isə yazma/yeniləmə ilə məşğuldur. Replika asinxron replikasiya işlətdiyi üçün kiçik gecikmə ola bilər — millisaniyəlik gecikmə qəbul olunandırsa, uyğundur.

### Şardinq (sharding)

Şardinq relaasion baza üçün multi-master sxem yaradır və üfüqi miqyaslama gətirir. Baza eyni tipli hissələrə (şardlara) bölünür, cədvəlin müvafiq sütunları yazmanı paylamaq üçün açar rolunu oynayır.

Şardsız bütün data bir bölmədədir. Şardinq ilə data böyük bloklara — şardlara bölünür:

```
Ad = A-dan I-yə   →  Şard 1  (Amazon RDS MySQL)
Ad = J-dan R-yə   →  Şard 2  (Amazon RDS MySQL)
Ad = S-dən Z-yə   →  Şard 3  (Amazon RDS MySQL)
```

Yuxarıda istifadəçi adının ilk hərfi şardı təyin edir — beləcə yazma yükü üç ayrı baza serverinə bölünür. AWS-də backend şardinq üçün EC2-də MySQL + Spider storage engine qurulur.

### High-availability Database (Yüksək əlçatanlıqlı baza)

Bəs əsas baza nüsxəsi sıradan çıxsa? Relaasion bazaların üfüqi miqyaslanması çətin olduğu üçün bu, mürəkkəbləşir. Həll: əsas nüsxənin **standby (rezerv) replikası**.

- Əsas nüsxə sıradan çıxanda tətbiq server rezerv nüsxəyə keçir.
- Read replica əsas nüsxənin yükünü götürür ki, artıq gecikmə olmasın.
- Əsas və rezerv **fərqli availability zone-larda** durur — bütöv zona sıradan çıxsa belə tətbiq işləyir.
- Sıfır dayanma (zero downtime): əsas nüsxə xidmət üçün offline olanda tətbiq rezervə keçir.

Fəlakətdən bərpa (disaster recovery) üçün iki metrik vacibdir:

- **RPO (Recovery Point Objective):** nə qədər data itkisi qəbul olunur. RPO = 30 dəqiqə → hər yarım saatdan bir backup.
- **RTO (Recovery Time Objective):** bərpanın nə qədər çəkməsi qəbul olunur. RTO = 60 dəqiqə → şəbəkən backup-ı bir saat içində oxuyub bərpa edə bilməlidir.

Datanı təsnif et (məs. konfidensial məlumat: email, ünvan, şəxsi data) və uyğun şifrələmə strategiyası seç.

Tətbiq böyüdükcə RSUBD-dən NoSQL-ə miqrasiyanı nəzərdən keçir — daha yaxşı miqyaslanma, idarəetmə, performans. Amma miqrasiya vaxt və səy aparır.

---

## Dəyişikliyə hazır olmaq: Clean Architecture patterni

Clean Architecture (həm də **Hexagonal Architecture** və ya **Ports and Adapters**) — Robert C. Martin-in təklif etdiyi arxitektura patterni. Ön plana çəkir: məsuliyyət bölgüsü, xidmət rahatlığı, testlənə bilmə.

Tətbiq beş əsas komponentə bölünür. Kitab mağazası nümunəsində:

1. **Entity-lər (daxili qat):** əsas biznes-qaydaları əhatələyən biznes-obyektlər. Konkret texnologiya, baza, freymvorkdan asılı deyil. "Kitab" entity-si — xassələr (ad, müəllif, qiymət) və metodlar (mövcudluğu yoxla, endirim tətbiq et).
2. **Use case-lər (istifadə ssenariləri):** tətbiqə spesifik qaydalar. Entity-lərin konkret ssenari üçün necə qarşılıqlı işlədiyini təyin edir. Texnologiyaya neytral. "Sifariş rəsmiləşdir" use case-i — səbəti yoxla, endirim tətbiq et, çatdırılma qiymətini hesabla, ödənişi emal et.
3. **İnterfeyslər (portlar):** qatlar arası qarşılıqlı iş üçün kontraktlar. Daxili qatları (entity, use case) xarici qatlardan (adapter, freymvork) ayıran sərhəd. Nümunə: ödəniş emalı interfeysi — köçürmə və geri qaytarma metodları.
4. **Adapter-lər:** interfeysləri reallaşdırır, daxili və xarici qatlar arası çevirmə aparır. Tətbiqi baza, API, üçüncü tərəf kitabxanaları ilə əlaqələndirir. Baza adapteri konkret baza texnologiyası ilə işi təmin edir.
5. **Freymvorklar və draйverlər (xarici qat):** bütün texniki detallar və alətlər — web serverlər, bazalar, UI freymvorkları, üçüncü tərəf kitabxanaları. Adapter-lərlə əlaqələnir.

Hər qat müstəqil yaşayır — birində dəyişiklik digərlərinə təsir etmir. Bazanı, UI freymvorkunu, biznes-məntiqi kaskad effekt olmadan dəyişmək olar. Aydın interfeyslər test üçün mock və stub yaratmağı asanlaşdırır.

> Diqqət: **over-engineering** tələsi. Kiçik və ya sadə layihələr üçün bu arxitekturanın xərci özünü doğrultmaya bilər. Tətbiq etməzdən əvvəl ölç: üstünlüklər artan mürəkkəbliyə dəyərmi?

---

## Nə etməmək lazımdır: arxitektura antipatternləri

Komandalar vaxt və ya resurs çatışmazlığından tez-tez ən yaxşı praktikalardan sapır. Antipatternlər pis dizayn olunmuş sistemin əlamətidir. Bunlardan qaç:

- **Reaktiv, əl ilə miqyaslama.** Serverlər tavana çatanda istifadəçilərin girişi kəsilir, admin isə yalnız şikayət gələndə xəbər tutur. Yeni nüsxə qaldırmaq dəqiqələr çəkir, bu ara istifadəçi əziyyət çəkir. → **Proaktiv ol:** auto-scaling qur, məs. CPU 60% və ya yaddaş 60%-ə çatanda güc əlavə et.
- **Avtomatlaşdırma yoxdur.** Server sıradan çıxanda admin əl ilə yeni server qurur, əl ilə xəbər verir. → İşləməyən resursların aşkarı və əvəzləyicinin qaldırılmasını avtomatlaşdır, avtomatik bildiriş əlavə et.
- **Uzun müddət hardcoded IP.** Zamanla server konfiqurasiyaları uyğunsuzlaşır, resurslar səmərəsiz paylanır. → Bütün serverlər eyni olsun, yeni IP-yə keçə bilsin; istifadə olunmayan resurslar avtomatik dayansın.
- **Monolit qurma.** Web, application, data səviyyələri sıx bağlıdır və serverdən asılıdır. Bir server yıxılsa, hər şey yıxılır. → Application və web səviyyəsini müstəqil saxla, aralarına load balancer qoy — biri yıxılsa trafik sağlamlara yönlənir.
- **Serverlər bir-biri ilə birbaşa danışır, sessiya lokal saxlanır.** → Servis-yönümlü RESTful arxitektura qur (servislər HTTP ilə danışsın). Autentifikasiya və sessiyanı paylanmış, aşağı gecikməli anbarda saxla. Statik resursları serverdən ayrı, mərkəzi obyekt anbarında saxla.
- **Hər şey üçün bir relaasion baza.** → İşə uyğun anbar seç: sessiya üçün NoSQL, aşağı gecikmə üçün keş, hesabatlar üçün ayrıca anbar, əməliyyatlar üçün relaasion baza.
- **Single point of failure.** Bir baza nüsxəsi bütün tətbiqə xidmət edir. → İkinci (rezerv) server qur, data replikasiya et. Əsas yıxılsa, rezerv işi götürsün.
- **Statik məzmun keşsiz, birbaşa serverdən.** → Ağır məzmunu istifadəçiyə yaxın keşləmək üçün CDN işlət.
- **Detallı təhlükəsizlik siyasəti olmadan açıq giriş.** → Həmişə **ən az imtiyaz (least privilege) prinsipini** tətbiq et: ilkin olaraq giriş qadağandır, yalnız açıq göstərilən qrupa verilir.

---

## Sona qədər

Bir fəsildə çox yol getdik. Gəlin əsas fikri "əvvəl vs sonra" kontrastı ilə yığaq.

**Əvvəl:** monolit tətbiq, bir serverə bağlı, bir bazaya arxalanan, hardcoded IP-lərlə, əl ilə miqyaslanan, keşsiz, single point of failure ilə dolu sistem. Bir server yıxılanda hər şey yıxılır.

**Sonra:** n-tier və ya konteyner əsaslı, servisləri zəif bağlı, RESTful API ilə danışan, hər səviyyəsi ayrıca miqyaslanan, keşlə sürətləndirilmiş, Circuit Breaker və Bulkhead ilə xətadan qorunan, Floating IP və rezerv baza ilə yüksək əlçatanlıqlı sistem. Bir hissə yıxılsa, qalanları işləyir.

Fərq təsadüfi deyil — o, düzgün pattern seçimindən doğur. Heç bir pattern "həmişə düzgün" deyil; hər biri müəyyən problem, müəyyən məhdudiyyət üçün alətdir. Yaxşı arxitekt onları bilir və doğru anda çıxarır.

Bəs sizin layihənizdə hansı antipattern hələ də yaşayır — və onu hansı patternlə əvəz edərdiniz?
