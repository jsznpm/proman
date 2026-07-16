# Yaxşı arxitektura təsadüf deyil: həll dizaynının 14 prinsipi

Bu yazıda gəlin bir az fərqli baxaq sistemlərə. Çox vaxt biz kod yazırıq, işləyir, deploy edirik — və düşünürük ki, iş bitdi. Amma sistem böyüyəndə, istifadəçilər çoxalanda, gecə yarısı bir server yıxılanda məlum olur ki, əsl sual heç vaxt "kod işləyirmi?" olmayıb. Əsl sual budur: **bu sistem sabah da ayaqda qalacaqmı?**

Solution architect (həll arxitektoru) məhz bu suala cavab verən adamdır. Onun işi konkret bir funksiyanı yazmaq yox, bütün sistemin ömrü boyu davranışını əvvəlcədən görmək və planlaşdırmaqdır. Bu yazı bir kitabın "Həll arxitekturalarının dizayn prinsipləri" fəslinin təfərrüatlı, canlı izahıdır — 14 fundamental prinsip, hər biri real nümunə ilə.

> Yaxşı arxitektura kod yazmaqla başlamır. O, "bu sistem necə sınacaq?" sualı ilə başlayır.

Bu prinsiplərin çoxu bir-birini tamamlayır. Miqyaslanma dayanıqlığı gətirir, dayanıqlıq təhlükəsizliyi tələb edir, hər şey isə avtomatlaşdırma olmadan çökür. Gəlin birinciylə başlayaq — bəlkə də ən çox danışılan, amma ən çox səhv başa düşülən prinsiplə.

---

## Miqyaslanan (scalable) arxitektura: yük artanda çökməmək

**Miqyaslanma (scalability)** — sistemin artan iş yükünün öhdəsindən gələ bilmə qabiliyyətidir. Yük app serverlərinə, veb tətbiqinə, verilənlər bazasına — istənilən səviyyəyə düşə bilər. Yaxşı miqyaslanan sistem istifadəçi sorğularını performansı korlamadan emal edir. Bu isə birbaşa gəlirə çevrilir: sürətli sayt = daha çox alıcı.

Müasir tətbiqlərin əksəriyyəti veb üzərində qurulduğu üçün burada bir termin daha vacibdir — **elastiklik (elasticity)**. Miqyaslanma sadəcə "böyümək" deməkdir. Elastiklik isə həm böyümək, həm də lazım olmayanda kiçilmək deməkdir ki, boş resurslara pul yanmasın. Bulud platformaları gələndən sonra artıq sadəcə "miqyaslanma" yox, məhz "elastiklik" əsas söhbətə çevrildi.

Tarixən iki cür miqyaslanma var:

- **Horizontal miqyaslanma (scale out):** yükü emal etmək üçün daha çox server əlavə edirsən. Təsəvvür et, tətbiqin 2 serverlə saniyədə 1000 sorğu emal edir. İstifadəçi bazası böyüyür, saniyədə 2000 sorğu gəlir — server sayını 4-ə qaldırırsan. Sadə.
- **Vertikal miqyaslanma (scale up):** mövcud serverə daha çox yaddaş, disk, CPU əlavə edirsən. Yeni server yox, olanı gücləndirirsən.

Vertikal miqyaslanmanın bir problemi var: baha başa gəlir. Əlavə güc və yaddaş üçün avadanlıq xərci **eksponensial** artır. Müəyyən həddən sonra bu yoldan imtina etmək lazımdır — məcbur qalmasan. Vertikal miqyaslanma daha çox relational (əlaqəli) verilənlər bazası serverlərində istifadə olunur. Amma o server də həddə çatanda **şardinq (sharding)** haqqında düşünmək vaxtıdır.

Şardinq — verilənlər bazasını bölüb bir neçə serverə paylayan miqyaslanma metodudur. Məlumat **şard açarı (shard key)** dəyərinə görə bölünür — bu açar hansı məlumatın hansı serverə düşəcəyini müəyyən edir. Məsələn, açar `user_name`-dirsə: A-dan E-yə qədər adlar bir şardda, F-dən I-yə qədər başqa şardda saxlanılır. Hər şard müstəqil böyüyür.

Miqyaslanma iki formada olur:

- **Proaktiv/qabaqlayıcı (predictive scaling):** yükü qabaqcadan bilirsən. İnternet mağazası bilir ki, "Qara cümə" günü trafik partlayacaq — resursları əvvəlcədən qaldırır. Tarixi məlumatları analiz edib trafik nümunələrini proqnozlaşdırırsan.
- **Reaktiv (reactive scaling):** gözlənilməz partlayış olur — qısa müddətli endirim, viral post — sistem yükə reaksiya verib özünü genişləndirir.

İkisinin birləşməsi ən yaxşısıdır. Məsələn, bir **Auto Scaling** qrupu: minimum 3 server, maksimum 6 server. Normal trafikdə 3 server işləyir, pik zamanı 6-ya qalxır. Qayda belə ola bilər: "CPU 60%-i keçəndə bir server əlavə et, amma ümumi say 6-nı keçməsin".

### Statik kontentin miqyaslanması

Statik kontent (şəkil, video) istifadəçini saytda saxlayan əsas şeydir. Amma səhv idarə olunsa, tətbiqi ciddi yavaşladır. İnternet mağazasını götürək: hər məhsulun bir neçə şəkli, bəlkə videosu var. Bu, nəhəng həcmdə **read-intensive** (oxumaya yönəlik) yük deməkdir — çünki istifadəçilər vaxtlarının çoxunu məhsullara baxmaqla keçirir.

Bu kontenti veb serverdə saxlamaq iki problem yaradır: yaddaş bahalaşır və böyük fayllar istifadəçi tərəfində gecikmə (latency) yaradır. Həll — **CDN (Content Distribution Network)**. CDN kontenti istifadəçiyə yaxın nöqtələrdə keşləyir, beləcə gecikmə azalır, yüklənmə sürətlənir. Akamai, Amazon CloudFront, Azure CDN, Google CDN — hamısı dünya üzrə mərkəzlər şəbəkəsi qurur.

Statik kontenti isə obyekt anbarında (məsələn, Amazon S3) saxlamaq tövsiyə olunur — o, kompüterlərin yaddaşından asılı olmadan böyüyür və ucuzdur.

### Sessiya idarəsi: app serverlərini miqyaslamaq

App səviyyəsi veb səviyyədən sorğu alır, biznes məntiqini hesablayır, bazayla danışır. Yük artanda genişlənməli, azalanda kiçilməlidir. Amma bir problem var: istifadəçi **sessiya**ya bağlıdır — məsələn, mobil telefonda məhsula baxıb, kompüterdə alır. Sessiya dəstəyi olmadan horizontal miqyaslama etsən, istifadəçinin əvvəlki addımları itir.

Həll: sessiyanı app serverindən ayır. Sessiyaları müstəqil səviyyədə — məsələn NoSQL bazada saxla.

**NoSQL bazaları** dəyişkən sxemli, yarı-strukturlaşmış məlumat üçün idealdır. Bir istifadəçi ad və ünvan yazır, başqası əlavə olaraq telefon, cins, ailə vəziyyəti də yazır. Atributlar fərqlidir, amma NoSQL (Amazon DynamoDB, MongoDB) bunu rahat saxlayır və sürətli axtarış verir. Sessiyalar NoSQL-də olanda, app serverin horizontal miqyaslanır — qarşısına load balancer qoyursan, o yükü serverlər arasında paylayır.

### Verilənlər bazasının miqyaslanması

Relational bazalar tranzaksiya bütövlüyü (transaction integrity) verir — çoxlu tətbiqə lazım olan şey. Amma çatışmazlığı: horizontal miqyaslanmır (şardinq və app dəyişikliyi olmadan). Daha ağıllı yol — bazanın yükünü qabaqcadan azaltmaq:

- Sessiyaları ayrı NoSQL bazada saxla
- Statik kontenti obyekt anbarında saxla
- Xarici keş istifadə et
- **Read replica** işlət: əsas node yalnız yazı/yeniləmə üçün, oxu sorğuları isə replica-lardan. Amazon RDS for MySQL 15-ə qədər read replica verir.

Diqqət: read replica-lar əsas node ilə sinxronlaşarkən millisaniyəlik gecikmə yaradır — bunu dizaynda nəzərə al. Tez-tez təkrarlanan sorğular üçün isə **Memcached** və ya **Redis** keşi qoy.

---

## Yüksək əlçatanlıq və dayanıqlıq: nasazlığı gözləməklə dizayn et

İndi maraqlı hissəyə keçək — sistem yıxılanda nə olur? Çünki yıxılacaq. Sual "yıxılacaqmı" yox, "yıxılanda istifadəçi biləcəkmi" sualıdır.

### Yüksək əlçatanlıq (high availability, HA)

Heç bir təşkilat downtime (dayanma) istəmir. Dayanma biznesin və istifadəçinin etimadını itirir. HA-nın əsas prinsipi belə səslənir:

> "Nasazlığı nəzərə alaraq dizayn et — və nasazlıq olmayacaq."

Uptime tələbi tətbiqdən asılıdır. İnternet mağazası və ya sosial şəbəkə — 100% işləklik lazımdır. Daxili tətbiq (məsələn, kadr uçotu sistemi) — qısa müddətli dayanmanı dözə bilər. HA birbaşa xərclə bağlıdır, ona görə həmişə digər tələblərlə birlikdə planlaşdırılmalıdır.

Ən yaxşı yol: iş yükü üçün izolə olunmuş fiziki məkan ayır — bir yerdə nasazlıq olsa, tətbiqin replikası başqa yerdən işləsin.

### Dayanıqlı (resilient) arxitektura

Dayanıqlıq o deməkdir ki, tətbiq nasazlıqdan bərpa olunarkən də istifadəçiyə əlçatan qalır. Dayanıqlıq bütün səviyyələrdə olmalıdır: infrastruktur, tətbiq, baza, təhlükəsizlik, şəbəkə.

### Ehtiyatlılığa (redundancy) çatmaq

Ehtiyatlılıq dayanıqlı sistemlərin özəyidir. Çoxsəviyyəli strategiya lazımdır: server klasterlərini eyni data-mərkəzdə fərqli rəflərə, sonra bir regionda bir neçə data-mərkəzə, sonra fərqli coğrafi regionlara yay. Coğrafi paylanma yerli və regional fəlakətlərdən qoruyur və qlobal istifadəçilər üçün gecikməni azaldır.

Serverlər fərqli fiziki məkanlarda olanda, trafikin ilk marşrutlaşdırılması hətta load balancer-ə çatmazdan əvvəl **DNS server** səviyyəsində baş verə bilər. Bütün region yıxılsa belə, tətbiq işləyər. Praktikalar:

- Statik kontent üçün **CDN** — istifadəçiyə yaxın keşlə
- Region daxilində **load balancer** — bir node yıxılsa, digərinə yönəlt
- **Auto scaling** — tələbə görə server əlavə et/sil
- **Backup baza** — əsas baza yıxılsa, tətbiq əlçatan qalsın

### Komponent nasazlıqlarını idarə etmək

Load balancer və DNS marşrutlaşdırıcıları **health check** (sağlamlıq yoxlaması) edir ki, trafik yalnız işlək instansiyalara getsin. Yoxlama iki cür olur:

- **Səthi (shallow):** yalnız lokal host nasazlıqlarını izləyir. Sürətli, ucuz.
- **Dərin (deep):** asılılıq nasazlıqlarını da yoxlayır. Yavaş, resurs tələb edir.

App səviyyəsində **kaskad nasazlıqlardan** (cascading failures) qaçmaq vacibdir — bir komponentin yıxılması bütün sistemi çökürtməsin. Mexanizmlər:

- **Timeout:** əməliyyata maksimum vaxt təyin et — sonsuz gözləmə resursu tükəndirir.
- **Trafiki rədd etmə (load shedding):** yüklənmiş sistem yeni sorğuları aktiv rədd edir ki, mövcud proseslər sabit qalsın.
- **İdempotent əməliyyatlar:** əməliyyatı təkrar etmək əlavə təsir yaratmır — aralıq nasazlıqdan bərpa asanlaşır.
- **Circuit breaker (kəsici):** nasazlıq əlamətlərini aşkar edib problemli servisə sorğuları bloklayır — servis bərpa olsun, nasazlıq yayılmasın deyə.

### Fault-tolerance (nasazlığa dözümlülük)

Burada incə bir fərq var. HA o deməkdir ki, tətbiq əlçatandır — amma **aşağı performansla** işləyə bilər. Nümunə: trafikə 4 server lazımdır. İki izolə data-mərkəzə 2-2 qoyursan. Bir mərkəz yıxılır — trafik digərinə keçir. Amma indi cəmi 2 server var — yəni ilkin gücün **50%-i**. İstifadəçi performans problemi görə bilər.

Bu ssenaridə tətbiq **100% HA-ya**, amma yalnız **50% fault-tolerance-ə** malikdir.

100% fault-tolerance üçün tam ehtiyatlılıq lazımdır — server sayını **ikiqat** saxlamalısan ki, bir zona yıxılanda istifadəçi heç nə hiss etməsin. Bu bahadır. Lazımdırmı? Asılıdır:

- İnternet mağazası: bəli, çünki performans düşüşü birbaşa gəlirə vurur.
- Daxili maaş sistemi: yox, işçilər ayda bir dəfə baxır, qısa yavaşlamanı dözər.

---

## Performans üçün dizayn: sürət = gəlir

Sürətli internet gələndən sonra istifadəçilər minimal yüklənmə vaxtı tələb edir. Təşkilatlar gördü ki, gəlir birbaşa tətbiqin performansına mütənasibdir — yavaş yüklənmə alıcı aktivliyini kəskin azaldır.

Bir gözəl nümunə: blog səhifəsini elə dizayn et ki, sürətli internetdə 500 millisaniyəyə yüklənsin. Amma yavaş bağlantıda — əvvəlcə **mətni yüklə** ki, istifadəçi oxusun, şəkil və video arxada yüklənsin. İstifadəçi gözləmir.

Server səviyyəsində iş yükünə uyğun server seç. Yaddaş həcmini test et — yaddaş daşması tətbiqi yavaşladır, hətta serveri çökürdür. Anbar üçün uyğun **IOPS** seç.

> IOPS (Input/Output Operations Per Second) — yaddaş qurğusunun saniyədə neçə oxu/yazı əməliyyatı edə bildiyini ölçən metrikdir. Write-intensive tətbiqlərə yüksək IOPS lazımdır.

Performansın açarı — **hər səviyyədə keşləmə**:

- Tez-tez baxılan səhifələr üçün → istifadəçinin sistemində **browser keşi**
- Sürətli sayt axtarışı üçün → **DNS keşi**
- Yüksək keyfiyyətli şəkil/video üçün → **CDN keşi**
- Tez-tez sorğular üçün → **baza keşi** və **Redis/Memcached**

Keşdə iki anlayışı nəzərə al: **cache expiration** (keş məlumatı köhnəlir, yenilənməyə işarələnir) və **cache eviction** (yeni məlumata yer açmaq üçün keşdən məlumat silinir).

---

## Dəyişməz (immutable) arxitektura: serverlər ev heyvanı deyil

Təşkilatlar avadanlığa investisiya edir, serverləri müntəzəm yeniləyir. Nəticədə zamanla fərqli serverlər fərqli konfiqurasiyalarda işləyir — problemləri diaqnoz etmək çətinləşir. Bəzən heç kim bilmir hansı serveri söndürmək olar ki, tətbiq çökməsin.

Həll — serverə **dəyişdirilə bilən (replaceable) resurs** kimi baxmaq. Buradan **dəyişməzlik (immutability)** prinsipi çıxır: tətbiqi yeniləyəndə həm proqram, həm də avadanlıq hissəsi əvəzlənməlidir.

Bu, məşhur **"cattle, not pets"** (mal-qara, ev heyvanı yox) yanaşmasıdır:

> Serverə ev heyvanı kimi baxma — adını qoyub, xəstələnəndə müalicə etmə. Ona mal-qara kimi bax — problem olsa, əvəz et.

Yəni ayrı-ayrı serverləri diqqətlə "müalicə etmək" yox. Serverlər sürətli əlavə, vahid idarə və ağrısız silinmə/əvəzlənmə üçün dizayn olunur. Bunun üçün:

- Tətbiqi **stateless** (vəziyyət saxlamayan) dizayn et
- Server IP-lərini və ya baza DNS adlarını **hardcode etmə**
- İnfrastruktura kod kimi bax (infrastructure as code), avadanlıq kimi yox
- İşləyən sistemə yeniləmə tətbiq etmə

Virtual maşınlar bunu asanlaşdırır. **Etalon şəkil (golden image)** yaradırsan — bütün təhlükəsizlik və proqram komponentləri olan şablon. Yeni versiya lazım olanda, mövcudu yeniləmək yox, etalondan yeni instansiya deploy edirsən. Problemli serveri isə sadəcə atırsan, etalondan yenisini yaradırsan. (Atmadan əvvəl **log-un backup-unu saxla** — root cause analizi üçün.)

---

## Zəif bağlılıq (loose coupling): bir komponent yıxılsa, hamısı yıxılmasın

Ənənəvi tətbiqlər sıx inteqrasiyalı server parkında deploy olunurdu — hər serverin konkret vəzifəsi var, hamısı bir-birindən asılı.

**Sıx bağlı (tightly coupled) arxitektura:** veb serverlər parkı bütün app serverlərindən birbaşa asılıdır. Bir app server yıxılsa, bütün veb serverlər xəta almağa başlayır — çünki sorğu yıxılmış serverə gedir. Bütün sistem çökə bilər. Üstəlik, server əlavə/silmə bütün əlaqələri yenidən qurmağı tələb edir — böyük əziyyət.

**Zəif bağlı arxitektura** arada bir vasitəçi qat qoyur. İki formada:

**1. Load balancer əsaslı:** veb və app serverlər arasında load balancer. Bir app server yıxılsa, load balancer avtomatik olaraq trafiki qalan işlək serverlərə yönəldir. Xəta radiusu (blast radius) yalnız bir instansiya ilə məhdudlaşır.

**2. Növbə (queue) əsaslı:** Nümunə — şəkil emal edən sayt. İstifadəçi şəkil saxlayır, sonra sistem onu kodlaşdırır, miniatür yaradır, copyright su nişanı əlavə edir:

```
Şəkil saxla → [Növbə] → Kodlaşdır → [Növbə] → Miniatür yarat → [Növbə] → Su nişanı
```

Növbə **asinxron** bağlantı yaradır — bir server digərinin cavabını gözləmir, müstəqil işləyir. Emal edən serverlərin sayını paralel artıra bilərsən. Şəkil qalmayanda auto scaling artıq serverləri söndürür.

Mürəkkəb sistemdə zəif bağlılıq **mikroservis arxitekturası** ilə həyata keçirilir. Bu, bizi növbəti prinsipə gətirir.

---

## Serverlər yox, servislər

Servis-yönümlü yanaşma zəif bağlı arxitekturaya çatmağa kömək edir. Server-yönümlü yanaşma isə avadanlıqdan asılılığa və sıx bağlılığa aparır.

**RESTful arxitekturada** mesaj XML, JSON və ya adi mətn formatında olur və sadə HTTP ilə göndərilir. RESTful populyardır, çünki maksimum yüngüldür. Mikroservislər RESTful üzərində qurulur və müstəqil miqyaslanır.

Fərqi görək:

- **Monolit arxitektura:** bütün komponentlər bir servisə yığılır, bir serverdə deploy olunur, bir bazaya bağlanır. Sıx asılılıq.
- **Mikroservis arxitektura:** hər komponent müstəqildir, öz bazasını istifadə edir, müstəqil miqyaslanır.

İnternet mağazası nümunəsi. Monoliti mikroservisə çevirəndə hər komponent ayrı servis olur:

- **Login servisi** — müstəqil miqyaslanır, çünki müştərilər tez-tez daxil olub kataloqa baxır (yüksək trafik)
- **Sifariş servisi** və **səbət servisi** — az trafik alır, çünki sifariş nadir hallarda verilir

Üstünlüklər: saxlanılacaq kod həcmi azalır, avtonomluq artır, nasazlıqda təsir zonası (blast radius) kiçilir. Çatışmazlıq: monitoring daha **qranulyar** olmalıdır — həm ayrı servis səviyyəsində, həm də ümumi sistem səviyyəsində, çünki mikroservislər paylanmış təbiətə malikdir.

---

## Məlumat əsaslı (data-driven) dizayn

Hər proqram həllinin mərkəzində məlumatın toplanması və idarəsi durur. İnternet mağazası: istifadəçi məlumatı ilə başlayır, ödəniş metodu əlavə edir, sifariş məlumatını saxlayır, satış oldukca anbar uçotu aparır. Bank tətbiqi: maliyyə məlumatını bütövlük və uyğunluqla idarə edir.

> İstənilən tətbiqdə ən vacib şey — məlumatın düzgün emalı, saxlanması və qorunması.

Məlumat həm dizaynın, həm istismarın, həm də biznes qərarlarının mərkəzindədir. Monitorinq üçün serverdən log məlumatını al, metrikləri göstərən dashboard yarat. Fasiləsiz monitorinq və problem zamanı xəbərdarlıq — auto-recovery ilə sürətli bərpaya kömək edir.

> Məlumat sənin sərvətindir. Data analitikasını toplamaq təşkilatın gəlirini ciddi artıra bilər.

---

## Bütün səviyyələrdə təhlükəsizlik

Təhlükəsizlik — ən vacib dizayn məsələsidir. Hər boşluq biznes üçün fəlakət ola bilər. Çoxlu şirkət hack nəticəsində müştəri etimadını itirib.

Sənaye normalarına uyğunluq açardır:

- **PCI** (Payment Card Industry) — kredit kartı məlumatını qoruyur
- **HIPAA** — səhiyyədə xəstə məlumatını qoruyur
- **GDPR** — Avropada məlumat məxfiliyini artırır
- **SOC** (System and Organization Controls) — xidmət təşkilatlarında məlumat idarəsinin təhlükəsizliyi

Dizayn mərhələsində əsas məqamlar:

- **Fiziki təhlükəsizlik:** data-mərkəz resursları icazəsiz girişdən qorunmalı
- **Şəbəkə təhlükəsizliyi:** serverlərə icazəsiz giriş cəhdləri qarşısı alınmalı
- **IAM (Identity and Access Management):** yalnız autentifikasiyadan keçmiş istifadəçi giriş edir, yalnız avtorizasiya səviyyəsinə uyğun əməliyyat aparır
- **Ötürülərkən təhlükəsizlik (data in transit):** şəbəkə/internet üzərində məlumat qorunmalı
- **Saxlanarkən təhlükəsizlik (data at rest):** bazada/anbarda məlumat qorunmalı
- **Təhlükəsizlik monitorinqi:** hər insident aşkarlanmalı, komanda xəbərdar edilməli

Diqqət: şifrələmə (encryption) performansa təsir edir — məlumatı istifadə üçün deşifrə etmək lazımdır. Ona görə balans saxla: yalnız konfidensial məlumatı şifrələ.

**DDoS (Distributed Denial of Service)** hücumu əlçatanlığı hədəf alır — serverə saxta trafik göndərib yükləyir, legitim istifadəçi girə bilmir. Qabaqlayıcı tədbir: iş yükünün mümkün qədər çox hissəsini private şəbəkədə saxla, endpoint-ləri internetdən mümkünsə açma.

Və **təhlükəsizlik avtomatlaşdırması** — real vaxtda monitorinq və təhdid aşkarlanması ilə hack cəhdlərinə sürətli reaksiya.

---

## İstifadə rahatlığı və əlçatanlıq

Ən geniş funksiyalı məhsul belə, istifadəsi çətindirsə, xoşa gəlmir.

**Usability (istifadə rahatlığı):** istifadəçi tətbiqlə nə qədər sadə və intuitiv işləyir — aydın interfeys, məntiqli naviqasiya, effektiv proseslər. İstifadəçi səhv edəndən sonra nə qədər tez normal işə qayıdır. İstifadəçi tədqiqatı və test burada vacibdir.

**Accessibility (əlçatanlıq):** inklüzivlik — tətbiq hamıya əlçatan olmalı: yavaş internetli, köhnə cihazlı, məhdud imkanlı istifadəçilər. Komponentlər: səs tanıma, səsli naviqasiya, ekran lupası, ekran diktoru (zəif görənlər üçün). **Lokalizasiya** isə tətbiqi regional dildə (ispan, alman, hind, yapon) əlçatan edir.

> Usability + Accessibility = İstifadəçi məmnuniyyəti

Məhsul buraxılışında **A/B testing** planlaşdır: kiçik istifadəçi qrupu yeni funksiyaya çıxış alır, reaksiyaları analiz olunur. İki versiya müqayisə edilir, hansının daha yaxşı olduğu **məlumat əsasında** qərarlaşır. İşləyən tətbiqdə isə fasiləsiz feedback mexanizmi (forma və ya dəstək) olmalıdır.

---

## Genişlənə bilən və future-proof arxitektura

Şirkət böyüdükcə tətbiq yeni funksiyalarla zənginləşir. Arxitektura genişlənə bilən (extensible) və gələcəyə davamlı (future-proof) olmalıdır.

Bunun üçün mümkün olan hər yerdə zəif bağlı arxitektura istifadə et — RESTful və ya növbə əsaslı. Nümunə: API əsaslı internet mağazası arxitekturası. Müstəqil servislər: **Məhsul kataloqu**, **Sifariş**, **Ödəniş**, **Çatdırılma**.

- Veb və mobil tətbiq → kataloq + sifariş + ödəniş servislərini istifadə edir
- Fiziki mağaza (POS sistemi) → kataloq + sifariş + ödəniş istifadə edir, amma **çatdırılma servisi lazım deyil** (müştəri malı mağazadan götürür)

Burada bir **Bonus API** də var — üçüncü tərəf API-lərini inteqrasiya etmək üçün. Bu, mövcud həlli genişləndirir. Diqqət: **ödəniş servisi** həm saytda, həm mağazada təkrar istifadə olunur. Başqa servis (hədiyyə kartı, ərzaq çatdırılması) da onu təkrar istifadə edə bilər.

Genişlənmə və təkrar istifadə yalnız servis səviyyəsində qalmır — API səviyyəsinə enir. Burada arxitektor **OOAD** (obyekt-yönümlü analiz və dizayn) konsepsiyalarını — məsələn, **inheritance (vərəsəlik)** — istifadə edib API freymvork qurur.

> OOAD — proqram mühəndisliyinin fundamental metodudur: modulyarlıq, miqyaslanma və dəstəklənə bilənlik verir.

---

## İnteroperabilliyik və köçürülə bilənlik

**İnteroperabilliyik (interoperability):** bir tətbiqin başqaları ilə standart format/protokol üzərində qarşılıqlı işləmə qabiliyyəti. İnternet mağazası tədarük zənciri ekosistemindəki tətbiqlərlə (ERP, daşıma idarəsi, anbar, kadr) danışmalıdır. Sorunsuz uçtan-uca yol üçün hamısı problemsiz məlumat mübadiləsi etməlidir. Ümumi qayda: **JSON və ya XML** kimi populyar format seç — müasir RESTful API və mikroservislər onları defolt dəstəkləyir.

**Köçürülə bilənlik (portability):** tətbiqin fərqli mühitlərdə dəyişiklik olmadan (və ya minimal dəyişikliklə) işləməsi. Fərqli OS və avadanlıqda işləməlidir. Nümunə: fərqli OS-lərdə deploy edəcəksənsə, **Java** kimi dil seç — bütün OS-lər dəstəkləyir. Mobil üçün — **React Native** kimi JavaScript əsaslı freymvork ilə cross-platform.

---

## Hər yerdə avtomatlaşdırma

İnsident-lərin çoxu insan səhvindən yaranır — bunlardan avtomatlaşdırma ilə qaçmaq olar. Avtomatlaşdırılası komponentlər:

- **Tətbiq testi:** hər dəyişiklikdə test et. Əl ilə test vaxt aparır. Rolling deployment metodları işlət — **canary** və **A/B testing**. Canary: dəyişikliyi kiçik istifadəçi qrupuna burax, problemləri tam relizə qədər tut — erkən xəbərdarlıq sistemi kimi.
- **IT infrastruktur:** infrastructure-as-code skriptləri — Ansible, Terraform, CloudFormation. Mühitləri günlərlə yox, dəqiqələrlə yarat. Konfiqurasiya səhvindən qaçır, dəqiq nüsxə yaradır.
- **Log, monitoring, alert:** böyük sistemdə yalnız avtomatik monitoring mümkündür. Monitoring məlumatına görə avtomatik hərəkət — miqyaslama və ya komandaya xəbərdarlıq.
- **Deployment avtomatlaşdırması:** **CI/CD** (continuous integration/continuous deployment) pipeline. Agile metodologiyaya kömək edir, kiçik mərhələli dəyişikliklər verir.
- **Təhlükəsizlik avtomatlaşdırması:** hack cəhdində dərhal bil, tez hərəkət et.

---

## Biznes davamlılığının planlaşdırılması

Risk var ki, bütöv region — elektrik kəsintisi, zəlzələ, daşqın, hücum — yıxıla bilər. Amma qlobal biznes işləməyə davam etməlidir. Bunun üçün **disaster recovery (fəlakət bərpası)** planı lazımdır: başqa regionda (bəlkə başqa qitədə) kifayət qədər IT resursu.

İki əsas metrik:

- **RTO (Recovery Time Objective):** biznes nə qədər dayanmanı ciddi nəticəsiz dözə bilər
- **RPO (Recovery Point Objective):** təşkilat nə qədər məlumat itkisini dözə bilər

RTO və RPO-nu azaltmaq xərci artırır. Birja tətbiqi bir data nöqtəsini belə itirə bilməz. Dəmiryol siqnal sistemi bir saniyə də dayana bilməz — insan həyatı asılıdır.

Ən çox yayılmış disaster recovery planları (ən ucuzdan ən bahaya):

1. **Backup & store:** ən ucuz, RTO/RPO ən yüksək. Bütün server imic-ləri və baza snapshot-ları DR node-da saxlanılır. Fəlakətdə backup-dan bərpa.
2. **Pilot light (yüngül versiya):** server imic-ləri backup-da, DR node-da kiçik baza serveri fasiləsiz sinxronlaşır. Fəlakətdə imic-dən bərpa + bazanı miqyasla. Daha baha, RTO/RPO daha aşağı.
3. **Warm standby (isti ehtiyat):** bütün server və baza instansiyaları DR node-da (aşağı gücdə) işləyir, əsas node ilə sinxron. Fəlakətdə hamısını miqyasla. Daha baha, RTO/RPO daha aşağı.
4. **Multi-site (çoxsahəli):** ən baha, RTO/RPO sıfıra yaxın. DR node əsas node-un eyni güclü replikasıdır, aktiv trafik xidmət edir. Fəlakətdə bütün trafik başqa məkana yönəlir.

Nümunə: əsas data-mərkəz İrlandiyada (Avropa), DR node ABŞ-da (Virciniya), AWS-də. Avropa regionu yıxılsa belə, biznes işləyir.

---

## İstismar üçün dizayn (operational excellence)

**Operational excellence (istismar mükəmməlliyi)** tətbiqini rəqiblərdən fərqləndirir — minimal dayanma ilə yüksək keyfiyyət. **Maintainability (dəstəklənə bilənlik)** bununla ayrılmaz bağlıdır — xərci azaldır, səhvdən qaçır, rəqabət üstünlüyü verir.

Log, monitoring, alert planlaşdırması vacibdir. Mümkün hər yerdə avtomatlaşdır — insan faktorundan qaç. Deployment metodları və avtomatlaşdırma strategiyası bazara çıxış vaxtını azaldır, cari istismara təsir etmədən.

Obslujivaniye (dəstək) iki cür:

- **Proaktiv:** yeni OS versiyası çıxanda dərhal platformanı yenilə
- **Reaktiv:** sistem sağlamlığını izlə, məhsulun ömrü bitənə qədər gözlə

Hər halda dəyişikliklər **inkremental**, **rollback imkanı** ilə olmalıdır. **Blue-green deployment** (xidmət kəsintisiz yeniləmə) və ya A/B testing işlət. Sənədləşdirmə: **runbook** (tipik tapşırıqlar üçün addım-addım təlimat) və **playbook** (tipik insidentlərə reaksiya ardıcıllığı). Problem olanda **root cause analysis** ilə səbəbi tap, təkrarlanmasının qarşısını al.

---

## Arxitektura məhdudiyyətlərini aşmaq

Dizaynda əsas məhdudiyyətlər: xərc, vaxt, büdcə, çatdırılma həcmi, qrafik, resurs.

> Məhdudiyyətlərə maneə kimi yox, çağırış kimi bax — çağırış həmişə innovasiyaya təkan verir.

Arxitektor icazə verilən kompromisləri (trade-off) müəyyən etməlidir. Yüksək performanslı tətbiqin xərci artır (çoxlu keşləmə səviyyəsi). Amma bəzən xərc performansdan vacibdir — xüsusən daxili sistemlərdə. Bəzən bazar payı tutmaq tam funksiyalı məhsuldan vacibdir — burada **MVP** modeli seçilir.

Texnoloji məhdudiyyət böyük təşkilatlarda aktualdır. Tövsiyə: təşkilatda ən çox yayılmış texnologiyanı işlət. **RESTful servis modeli** rahatdır — komandalara istənilən texnologiya işlətmək icazəsi verir, sadəcə URL ver. Hətta legacy sistemlər (mainframe) **API wrapper** ilə inteqrasiya oluna bilər.

### MVP metodu

**MVP (Minimum Viable Product)** — yeni məhsulu minimal funksiya ilə qurma strategiyası: ilk istifadəçiləri razı salmaq və konsepsiyanı erkən mərhələdə yoxlamaq üçün. Məqsəd: tez dəyər ver, xərci minimallaşdır, tez feedback al.

Tələbləri prioritetləşdirmə üçün **MoSCoW** metodu:

- **Must have:** kritik, olmadan reliz mümkün deyil
- **Should have:** çox arzuolunan
- **Could have:** olsa yaxşıdır, olmasa funksiya pozulmur
- **Won't have:** yoxluğunu istifadəçi hiss belə etməyəcək

MVP-ni must-have tələblərlə planlaşdır. Nümunə — yük maşını istehsalı:

> Müştəriyə əvvəlcə işlək bir maşın ver. O, sınayıb deyəcək daha güclü/böyük lazımdır. Onda 6, 10, hətta 18 təkərli maşın qur. 18 təkərli maşın qurub sonra bilmək ki, müştəriyə 6 təkərli bəs edirmiş — resurs israfıdır.

Erkən mərhələdə işlək məhsul vermək göstərir ki, səyi hara yönəltmək lazımdır. Tətbiq artıq gəlir gətirdiyi üçün əlavə resurs tələb etmək asanlaşır.

---

## Sona qədər

Başladıq bu sualla: "bu sistem sabah da ayaqda qalacaqmı?" İndi cavab aydındır — təsadüfən yox, dizaynla.

Miqyaslanma yükə hazır olmaqdır. Dayanıqlıq və HA nasazlığı gözləməkdir. Fault-tolerance nasazlıqda da performansı saxlamaqdır. Dəyişməzlik serverə mal-qara kimi baxmaqdır. Zəif bağlılıq bir komponentin yıxılışını təcrid etməkdir. Servislər monolitin zəncirini qırır. Məlumat mərkəzdədir, təhlükəsizlik hər səviyyədədir, avtomatlaşdırma insan səhvini silir. MVP isə müştərini mərkəzə qoyub resursu israf etməməkdir.

**Əvvəl:** kod işləyir, deploy olunur, gecə yarısı bir server yıxılır, hər şey çökür.
**Sonra:** kod işləyir, bir server yıxılır — load balancer trafiki yönəldir, auto scaling yenisini qaldırır, istifadəçi heç nə hiss etmir.

Fərq — bu 14 prinsip.

Növbəti fəsildə bulud miqrasiyası strategiyaları və hibrid bulud arxitekturası haqqında danışacağıq — şirkətlər infrastruktur, tətbiq və məlumatı buluda necə köçürür.

Sizcə öz sisteminizdə bu prinsiplərdən hansı ən zəif nöqtədir?
