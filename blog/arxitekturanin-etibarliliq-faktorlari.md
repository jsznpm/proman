# Sistem gecə saat 3-də çökəndə kim yatmalıdır — siz, yoxsa sistem özü?

Təsəvvür edin: bank tətbiqisiniz gecə yarısı çökür. Müştəri kart pulunu köçürə bilmir. Səhər açılanda sizi gözləyən şey təkcə qəzəbli zənglər deyil — itirilmiş pul, korlanmış reputasiya və bəlkə də cərimələr. İndi başqa bir mənzərə: eyni sistem çökür, amma siz bunu heç hiss etmirsiniz, çünki sistem özü problemi görüb, özünü bərpa edib və müştəri heç nəyin fərqinə varmayıb.

İkinci mənzərəni mümkün edən şeyin adı **etibarlılıq**dır (reliability). Bu yazıda arxitekturanın etibarlılığını necə qurmaqdan danışacağıq — özünü bərpa edən sistemlərdən tutmuş, fəlakətdən bərpa (disaster recovery) strategiyalarına və bulud platformalarının bu işi necə asanlaşdırdığına qədər.

Gəlin başlayaq.

---

## Etibarlılıq nədir və nəyə görə hər bizneslə bağlıdır

**Etibarlılıq (reliability)** — sistemin nasazlıqlardan sonra özünü bərpa etmə qabiliyyətidir. Sadə dillə: tətbiq fault-tolerant (nasazlığa davamlı) olmalı və istənilən infrastruktur və ya server nasazlığından sonra istifadəçi təcrübəsinə zərər vurmadan ayağa qalxmalıdır. Sistem işini poza biləcək istənilən vəziyyətə hazır olmalıdır.

Bir vaxtlar "yüksək əlçatanlıq" (high availability) yalnız iri şirkətlərin dərdi idi. İndi isə hər şirkət internetdə işlədiyi üçün bu, onlayn tətbiqlər üçün məcburi meyara çevrilib. İstifadəçi tətbiqini istənilən an açıb alış-veriş etmək və ya bank əməliyyatı aparmaq istəyir — özünə əlverişli olan vaxtda, sizin server planınıza görə yox.

Fərqi ayırd edək:

- **Etibarlılıq** — sistemin **konkret şəraitdə və konkret müddət ərzində** düzgün işləmə qabiliyyətinə fokuslanır.
- **Yüksək əlçatanlıq** — servisin **istənilən anda** əlçatan olmasına fokuslanır.

Bu ikisi bir-birinə sıx bağlıdır. Etibarlılıq o deməkdir ki, sistemi elə layihələndirirsən ki, hər hansı nasazlıq **mümkün olan ən kiçik sahədə izolyasiya olunsun** — yəni bir yerdə yanğın çıxanda bütün bina yanmasın. Yüksək əlçatanlıq isə tək nöqtəli nasazlıqları (single point of failure) aradan qaldırmaq üçün **artıqlıq (redundancy)** yaratmaqdan bəhs edir — bir komponent çökəndə ehtiyat komponent dərhal işə düşsün.

> Etibarlılıq və yüksək əlçatanlığı sistem arxitekturasına birlikdə hörəndə, tətbiq nasazlıqlardan qorunur və xidmət səviyyəsini sabit saxlayır.

İndi bu etibarlılığı təmin edən layihələndirmə prinsiplərinə keçək. Görəcəksiniz ki, prinsiplərin hamısı bir-birini tamamlayır.

---

## Prinsip 1: Sistem özünü bərpa etsin — avtomatlaşdırma vasitəsilə

Ən güclü etibarlılıq prinsipi budur: sistemə **özünü bərpa etmə** (self-healing) və **avtomatlaşdırma** funksiyası hörmək. Belə sistem nasazlıqları qabaqcadan görür və onlardan avtomatik bərpa olur — insan müdaxiləsi gözləmədən.

Özünü bərpa edən sistem nasazlıqları sistemin müxtəlif səviyyələrində (istər hardware, istər şəbəkə, istər proqram) aktiv şəkildə aşkarlayır və aradan qaldırır. Bunun üçün əvvəlcə tətbiq və biznes üçün **kritik KPI-ları** (Key Performance Indicators — əsas performans göstəriciləri) təyin etmək lazımdır. Məsələn:

- Saniyədə emal olunan sorğu sayı
- Veb-səhifənin yüklənmə vaxtı
- İnfrastruktur səviyyəsində: CPU və yaddaş yükü hədləri (bunlar əvvəlcədən müəyyən limiti keçməməlidir)

Sonra bu KPI-ları izləyən effektiv **monitorinq sistemi** qurulur. Kritik hədlərə çatanda sistem bildiriş verir. Bu bildirişlərin arxasında isə avtomatlaşdırma strategiyaları dayanır. Məsələn: CPU yükü maksimum limitə yaxınlaşanda sistem avtomatik olaraq əlavə serverlər işə salır.

Bu cür aktiv monitorinq və avtomatik reaksiya təkcə nasazlıqların qarşısını almır — həm də əl müdaxiləsi olmadan optimal performansı saxlayır.

Avtomatlaşdırmanı tətbiqin bütün həyat dövrünə — deployment və konfiqurasiyadan tutmuş infrastruktur miqyaslamasına qədər — hörmək daha uyğunlaşan və dayanıqlı mühit yaradır. Komanda yeni funksionallığı sürətlə yerləşdirə, daha sərbəst eksperiment edə bilir. Resursları planlaşdırılmış tələbə və ya gözlənilməz trafik sıçrayışına görə avtomatik miqyaslamaq tətbiqin cavabverici və əlçatan qalmasını təmin edir.

---

## Prinsip 2: Konfiqurasiyanı skriptlə, əllə yox

Bir səhnə tanışdır çoxlarına: developerin maşınında hər şey işləyir, amma QA (Quality Assurance — keyfiyyət nəzarəti) mühitində tətbiq açılmır. Səbəb? Resursların səhv konfiqurasiyası. Bu, test qrafikini gecikdirir. Daha pisi — eyni konfiqurasiya səhvi production serverində olsa, kütləvi çöküşə səbəb ola bilər.

Adətən bir neçə QA mühiti olur: funksional test, **UAT** (User Acceptance Testing — istifadəçi qəbul testi) və stress testi mühitləri. Hər birini developer mühitinə eyni cür qurmaq lazımdır.

Problem: **əl ilə** eyni addımları hər dəfə təkrarlamaq etibarsızdır. İnsan həmişə səhv edə bilər — məsələn, verilənlər bazasının adında bir hərf səhvi. Həll: bu addımları **skriptdə avtomatlaşdırmaq**.

Skriptin gözəl tərəfi ikiqatdır:

1. **Skriptin özü sənədləşdirmədir.** Kimsə "necə qururuq bu mühiti?" soruşanda cavab skriptin içindədir.
2. **Düzgün yazılmış skript əl konfiqurasiyasından etibarlıdır** və çox daha yaxşı təkrar-istehsal olunur (reproducible).

Nasaz resursları aşkarlamaq və ehtiyat resursları işə salmaq da avtomatlaşdırıla bilər ki, IT-əməliyyat komandası dəyişikliklərdən xəbərdar olsun.

> Avtomatlaşdırma xüsusi hal deyil — sistemin hər yerinə tətbiq olunmalı fundamental prinsipdir.

---

## Prinsip 3: Paylanmış sistem qur — yumurtaları bir səbətə qoyma

**Monolit tətbiqlər** iş vaxtı (uptime) baxımından zəif etibarlıdır. Səbəb sadədir: bir modulda kiçicik problem bütün sistemi yıxa bilər. Hər şey bir-birinə bağlıdır.

Həlli: tətbiqi **bir neçə kiçik servisə** bölmək. Bu, "zərər zonasını" (blast radius) daraldır. Tətbiqin bir hissəsi bütün sistemə təsir etmir, tətbiq isə kritik funksionallığını saxlayır.

Konkret nümunə: onlayn mağaza saytında **ödəniş servisi** ilə problem, müştərinin **sifariş verə bilməsinə** təsir etməməlidir — ödəniş sonra da edilə bilər. Yaxud anbar idarəetmə komponentinin çöküşü sifariş vermə imkanını pozmamalıdır.

Paylanmış arxitekturada sorğular müxtəlif komponentlər tərəfindən emal olunur və bir komponentin çöküşü digərlərinin işinə təsir etmir.

Amma bir "amma" var: **paylanmış sistemdə kommunikasiya mürəkkəbləşir.** Şəbəkəyə bağlı, hər biri fərqli əməliyyat sistemi işlədən, müxtəlif coğrafi regionlarda yerləşən kompüterlər arasında etibarlı data mübadiləsi qurmaq lazımdır. Problemlər sırasında:

- Şəbəkə gecikməsi (network latency)
- Mesaj çatdırılmasına zəmanət
- Node-lar arasında data sinxronizasiyası (uyğunluq üçün)
- Qismən nasazlıqları dəf etmək üçün fault-tolerance

Burada köməyə **Circuit Breaker** ("Predohranitel"/Elektrik açarı) patterni gəlir. İdeya sadədir: qorunan funksiya çağırışı bir "circuit breaker" obyektinə bükülür. Bu obyekt nasazlıqları izləyir və onların təsirini azaltmaq üçün avtomatik hərəkət edir — tıpkı elektrik açarının qısaqapanmada dövrəni kəsdiyi kimi.

---

## Prinsip 4: Monitorinq et və tələb olanda tutum əlavə et

Tətbiq çöküşlərinin əsas səbəbi — **resursların tükənməsi**. CPU, yaddaş və ya disk həddindən artıq yüklənəndə tətbiq sorğuları rədd etməyə başlayır.

Ənənəvi lokal (on-premise) mühitdə server tutumunu qabaqcadan təxminlə hesablamaq lazım gəlir. Amma bu, çətin işdir:

- Şəbəkə trafiki qeyri-proqnozlaşdırılandır və qlobal tendensiyalara görə dəyişir.
- Avadanlıq almaq adətən **3–6 ay** çəkir.
- Artıq avadanlıq alsan — resurslar boş dayanır, əlavə xərc.
- Az alsan — tətbiq etibarsız olur, biznes itirir.

Lazım olan şey: tutumu qabaqcadan proqnozlaşdırmağa ehtiyac olmayan, tələb olanda miqyaslanan mühit.

Məhz burada bulud oyunu dəyişir. AWS kimi publik bulud provayderi **infrastrukturu servis kimi** (IaaS — Infrastructure as a Service) təqdim edir. Buludda təchizatı və tələbi izləyə, resursları ehtiyaca görə avtomatik əlavə/silə bilərsən — nə artıq, nə əskik.

---

## Prinsip 5: Bərpanı sına — "happy path" səni aldatmasın

İnfrastrukturu yoxlayanda əksər təşkilatlar yalnız **"happy path"i** (hər şeyin işlədiyi ideal ssenari) sınayır. Bu, tələdir.

Əsl sınaq nasazlıqları və bərpa prosedurlarının effektivliyini yoxlamalıdır. Prinsip: **tətbiqi elə sına ki, sanki hər yerdə səhv baş verəcək.** Bərpa və failover strategiyalarının işləyəcəyini fərz etmə — müntəzəm test et. Onda nəsə tərs gedəndə bu, sürpriz olmaz.

Modelləşdirməyə əsaslanan sınaq potensial riskləri üzə çıxarır. Sistemi çökdürəcək ssenarini avtomatlaşdıra və uyğun insident reaksiyasını hazırlaya bilərsən.

Layihəçilər bəzən əlçatanlığın vacib bir tərəfini — **bərpa oluna bilməni** (recoverability) — gözdən qaçırır. Bunu yaxşılaşdırmaq üçün data, tətbiq və konfiqurasiyaların ehtiyat nüsxələrini maşın obrazı (machine image) şəklində saxlamaq lazımdır. Fəlakət nəticəsində bir neçə komponent əlçatmaz olsa və ya əsas data mənbəyi məhv olsa, servisi sürətlə və data itkisi olmadan bərpa edə bilməlisən.

Bu bizi növbəti mövzuya — **RTO və RPO**-ya gətirir.

---

## RPO və RTO: iki rəqəm ki, fəlakət planının bütün gedişatını təyin edir

Biznes tətbiqləri əlçatanlığı **SLA** (Service-Level Agreement — xidmət səviyyəsi razılaşması) formasında müəyyən etməlidir. Məsələn, SLA-da yazıla bilər: "tətbiq ildə 99.9% əlçatan olmalıdır" və ya "ayda maksimum 43 dəqiqə dayanmaya (downtime) icazə verilir".

SLA həm də tətbiq üçün iki kritik rəqəmi təyin edir:

**RPO (Recovery Point Objective — bərpa nöqtəsi hədəfi)** — təşkilatın itirməyə hazır olduğu **maksimum data həcmi** (vaxt ölçüsündə). Tutaq ki, tətbiq 15 dəqiqəlik data itkisinə dözə bilər. Müştəri sifarişləri hər 15 dəqiqədən bir emal olunursa, çöküş zamanı bu data təkrar emal oluna bilər. **RPO data ehtiyat nüsxə (backup) strategiyasını formalaşdırır** — nə qədər tez-tez backup almalısan.

**RTO (Recovery Time Objective — bərpa vaxtı hədəfi)** — tətbiqin dayanma vaxtı, yəni insidentdən sonra normal işə qayıtması üçün lazım olan **vaxt**.

Fərqi konkret rəqəmlə görək:

- Çöküş **saat 10:00-da** baş verdi.
- Son backup **saat 9:00-da** alınmışdı (backup saatbaşı alınır).
- → 1 saatlıq data itirilir. Deməli **RPO = 1 saat**.
- Sistemi backup-dan bərpa edib işə salmaq **30 dəqiqə** çəkir. → **RTO = 0.5 saat.** Yəni maksimum qəbuledilən dayanma vaxtı 30 dəqiqədir.

> RPO "nə qədər data itirə bilərəm?" sualına cavabdır. RTO "nə qədər müddət dayanıq qala bilərəm?" sualına.

Təşkilatlar bu iki dəyəri istifadəçi təcrübəsinə və dayanmanın maliyyə/reputasiya nəticələrinə görə təyin edir. Vaxt keçdikcə hədəf RTO/RPO-nu **azaltmağa** çalışmaq lazımdır — bu, birbaşa mənfəətə xidmət edir, çünki tətbiq daha çox işləyir.

Data isə bərpanın açarıdır. Onun itkisini azaltmağın yollarına baxaq.

---

## Data replikasiyası: nüsxəni harada və necə saxlamaq

**Replikasiya** — əsas anbardakı datanın ehtiyat anbarda (ehtiyat lokasiyada) surətini yaratmaqdır. Əsas sistem çökəndə tətbiq ehtiyata keçir və etibarlı işləməyə davam edir. Bu, NAS-da saxlanan fayllar, verilənlər bazası snapshot-ları və ya maşın obrazı ola bilər. Anbarlar coğrafi olaraq uzaq iki lokal sistem, eyni mühitdə iki fərqli qurğu, yaxud publik buludun fiziki ayrılmış elementləri ola bilər.

Replikasiya təkcə fəlakətdən bərpa (DR) üçün faydalı deyil — həm də test/development üçün sürətlə yeni mühit yaratmağa imkan verir.

Replikasiya iki cür olur: **sinxron** və **asinxron**.

### Sinxron vs asinxron

**Sinxron replikasiya** datanın surətini **real vaxtda** yaradır. Bu, RPO-nu azaldır və nasazlıq zamanı etibarlılığı artırır. Amma bahadır — əsas sistemdə fasiləsiz replikasiya üçün əlavə resurs tələb edir.

**Asinxron replikasiya** surətləri kiçik gecikmə ilə və ya müəyyən qrafik üzrə yaradır. Ucuzdur, çünki daha az resurs yeyir. Sistemin daha uzun RPO ilə işləyə bildiyi hallarda seçilir.

Nümunə: **Amazon RDS**-də sinxron replikasiya, bir neçə **Availability Zone** (AZ — əlçatanlıq zonası) ilə RDS yaratdıqda tətbiq olunur. Bu konfiqurasiyada əsas baza və onun başqa AZ-dəki replikası həmişə sinxrondur — yüksək əlçatanlıq və data sabitliyi təmin olunur. Əsas bazada problem yaransa, servis avtomatik replikaya keçir. **Read replica-lar** isə asinxron replikasiya işlədir və hesabat/oxu sorğuları üçün istifadə oluna bilər.

Fərq belədir: sinxron replikasiyada əsas və ehtiyat baza arasında **gecikmə = 0 ms**, asinxronda isə **gecikmə > 0 ms** ola bilər.

### Replikasiya metodları

Replikasiya metodu — datanı ilkin sistemdən çıxarıb bərpa üçün surət yaratma üsuludur. Dörd əsas yol var:

- **Storage array əsaslı replikasiya:** data quraşdırılmış proqram təminatı ilə avtomatik replikasiya olunur. Şərt: mənbə və qəbuledici array uyğun və homogen olmalıdır. İri təşkilatlar bunu deployment-i sadələşdirmək və host-sistemin hesablama gücünə qənaət üçün işlədir. Məhsullar: HP Storage, EMC SAN Copy, NetApp SnapMirror.
- **Şəbəkə (network) əsaslı replikasiya:** fərqli, heterogen storage array-lar arasında data kopyalayır. Uyğun olmayan array-lar arasında əlavə switch/komponent istifadə olunur. Xərci daha yüksək ola bilər, çünki prosesə bir neçə tərəf qoşulur. Məhsullar: NetApp Replication X, EMC RecoverPoint.
- **Host əsaslı replikasiya:** host-a proqram agenti quraşdırılır, o da datanı istənilən anbara (NAS, SAN, DAS) replikasiya edir. Aşağı ilkin xərc və heterogen qurğu uyğunluğuna görə kiçik və orta biznes tərəfindən çox seçilir. Mənfi tərəf: agent host-un ƏS-də işlədiyi üçün daha çox hesablama gücü tələb edir. Provayderlər: Symantec, Commvault, CA, Vision Solution.
- **Hypervisor əsaslı replikasiya:** virtual maşın (VM) səviyyəsində işləyir — bütöv VM-i bir host-dan digərinə kopyalayır. Təşkilatlar əsasən VM işlətdiyi üçün bu, RTO-nu azaltmaq baxımından çox effektivdir. Yüksək miqyaslanandır və host əsaslı metoddan az resurs yeyir. VMWare və Microsoft Windows-a inteqrasiya olunmuş sistemlərdə işləyir. Məhsul: Zerto.

İndi ən maraqlı hissəyə — sistemi fəlakətdən necə bərpa etmək məsələsinə keçək.

---

## Fəlakətdən bərpa (DR) planlaması: dörd ssenari, bir spektr

**Fəlakətdən bərpanın (DR — Disaster Recovery)** məqsədi: nasazlıqlar zamanı sistemin işini davam etdirmək. DR təşkilatı istənilən mümkün dayanmaya hazırlamalı və sistemi bu vəziyyətdən çıxarmaq imkanı verməlidir.

DR planlaması bir çox ölçünü əhatə edir. Nəzərə almalı olduğun risklər:

- Təşkilat fəaliyyəti ilə bağlı: elektrik kəsilməsi, şəbəkə çöküşü, istilik/soyutma sistemlərinin nasazlığı, fiziki təhlükəsizlik pozuntusu.
- Digər insidentlər: yanğın, daşqın, insan faktoru və s.

DR bir növ **sığorta polisidir** — istifadə etməsən də ödəyirsən, amma kritik anda biznesi xilas edir. Gəlir birbaşa yaradan tətbiq daim işləməlidir, çünki o, şirkətin imicinə və mənfəətinə təsir edir.

Dörd DR ssenarisi var. Onları RTO/RPO azalma sırası ilə düzək:

1. **Backup və bərpa** (Backup and Restore)
2. **Pilot light** ("Запал"/Alışdırıcı)
3. **Warm standby** (Isti ehtiyat)
4. **Hot standby** (Qaynar ehtiyat)

> Qanunauyğunluq belədir: aşağıdan yuxarı getdikcə RTO və RPO azalır, amma **xərc artır.** Etibarlılıq tələbləri ilə xərc arasında balans qurmaq lazımdır.

Hər birinə ayrıca baxaq. Qeyd: AWS kimi publik bulud platformaları bütün bu strategiyaları effektiv və qənaətli tətbiq etməyə imkan verir.

---

### 1. Backup və bərpa — ən ucuz, ən yavaş

Bu, ən ucuz üsuldur — RPO və RTO isə ən yüksək. Asan tətbiq olunur, çünki yalnız backup-ları saxlamaq üçün yer tələb edir. Backup-lar maqnit lentində, sərt diskdə və ya NAS-da saxlana bilər.

Problem: anbarı genişləndirmək lazım olsa, fərqli regionlarda yeni avadanlıq əlavə edib saxlamaq çətindir. Ən qənaətli və sadə həll — buludu anbar kimi işlətmək. Məsələn, **Amazon S3** limitsiz tutum və "istifadə etdiyin qədər ödə" modeli təqdim edir.

Tipik quruluş: data ənənəvi data-mərkəzdə saxlanır, backup-lar AWS-də. Datanı AWS-ə köçürmək üçün **AWS Import/Export** və ya **Snowball** sərt diskləri (8–100 TB) istifadə olunur, sonra məlumat **Amazon S3**-də saxlanır. Trafik marşrutlaşdırması üçün **Route 53**.

Bulud mühitində DR planlayanda platforma üstünlüklərindən istifadə etmək vacibdir. Ümumi prosedur (AWS, GCP, Azure üzrə):

- **Backup həlli:** AWS → Amazon S3, GCP → Google Cloud Storage, Azure → Azure Blob Storage.
- **Maşın obrazları və konfiqurasiya:** ƏS, tətbiq və konfiqurasiyanı özündə saxlayan obrazlar. AWS → AMI (Amazon Machine Image), GCP → Compute Engine obrazları, Azure → Azure Virtual Machine obrazları. Bunları lazımi patch-lərlə deployment-ə hazır saxla.
- **Bərpa sənədləşdirməsi:** hər platformada sistemi backup-dan bərpa addımlarını aydın sənədləşdir.
- **Trafik marşrutlaşdırması və failover:** AWS → Route 53, GCP → Cloud DNS və Traffic Director, Azure → Traffic Manager və DNS Zone.
- **Runbook (tapşırıq siyahısı):** deployment konfiqurasiyalarını, potensial problemləri və həll yollarını təsvir edən sənəd. **Cloud-neytral** olsun ki, komanda hansı platformadan asılı olmayaraq hərəkət edə bilsin.

Hazırlıq mərhələsində maşın obrazlarını və backup-ları uyğun bulud anbarlarında saxla, verilənlər bazası snapshot-larını və kritik faylları hazırla. Bu proaktiv yanaşma çöküş zamanı minimal dayanma və data itkisi ilə sürətli bərpanı təmin edir.

Mənfi tərəf: RTO backup-dan bərpa vaxtına bərabərdir, RPO isə backup tezliyindən asılıdır — hər ikisi yüksəkdir.

---

### 2. Pilot light — kiçik alov ki, böyük odu alışdırır

**Pilot light** ("Alışdırıcı") — qaz kolonkasındakı kiçik, daim yanan alova bənzəyir: özü balacadır, amma lazım olanda bütün kolonkanı bir anda alışdırır. Bu metodda müxtəlif regionlarda **minimal sayda baza servis** daim işləyir. Çöküş olanda əlavə resurslar tez işə salınır.

Quruluş: verilənlər bazası səviyyəsi **aktiv replikasiya olunur**, veb-server və tətbiq server ekzemplyarları (Amazon EC2) isə **hazırdır, amma işə salınmayıb**. İnfrastrukturu "infrastructure as code" (CloudFormation, Terraform, Ansible) prinsipi ilə qura bilərsən.

Backup-dan fərqi: komponentlərin çoxu passiv saxlanır, amma **kritik komponentlər** (məsələn, baza serveri, autentifikasiya serveri) — işə salınması vaxt aparanlar — aşağı tutumda aktiv işləyir. Əsas hissələr artıq işlədiyi üçün bərpa backup-dan sürətlidir. Ucuzdur, çünki resursların yalnız bir hissəsi tam güclə işləyir.

Kritik datanın DR-lokasiyaya (AWS buludu) replikasiyasına icazə verilməlidir. Lokal və bulud bazaları arasında **AWS Data Migration Service**, fayl datası üçün **Amazon File Gateway** istifadə oluna bilər. Üçüncü tərəf alətlər: Attunity, Quest, Syncsort, Alooma, JumpMind.

Çöküş baş verəndə addımlar:

1. Ehtiyat rejimdəki tətbiq və veb-serverləri işə sal. Load balancer ilə tətbiq serverlərini üfüqi miqyasla.
2. Aşağı güclə işləyən verilənlər bazası ekzemplyarını **şaquli miqyasla** (vertical scaling).
3. Router-dəki DNS yazısını yeni lokasiyaya yönəlt.

Mənfi tərəf: əvəzedici sistemin avtomatik işə salınması vaxt aparır (RTO artır), RPO isə replikasiya tipindən çox asılıdır.

---

### 3. Warm standby — həmişə işləyir, amma yarım güclə

**Warm standby** (isti ehtiyat) — tam işlək, amma kiçik tutumlu ehtiyatdır. Pilot light-ı təkmilləşdirir: servislərin bir alt dəstini **daim işlək** vəziyyətdə saxlayır, sadəcə production-dan az tutumla.

Əsas üstünlük — **xərc qənaəti ilə bərpa hazırlığı arasında balans.** Əsas servislər artıq işlədiyi (kiçik miqyasda olsa da) üçün bərpa vaxtı, resurs ayrılması/miqyaslanması tələb edən cold standby və pilot light-a nisbətən xeyli qısadır.

Təşkilat warm standby mühitini production trafikinin konkret faizini (məsələn, 20%, 30%, 50%) emal edəcək şəkildə qura bilər — bərpa məqsədlərinə və büdcəyə görə. Üstəlik, bu mühit təkcə DR üçün deyil — test, staging və ya development platforması kimi də işlədilə bilər. Bu ikili təbiət DR investisiyasının dəyərini maksimuma çatdırır.

Quruluş: iki sistem (mərkəzi + aşağı tutumlu ehtiyat) AWS buludunda işləyir. Sorğuları paylamaq üçün Route 53. Verilənlər bazasında warm standby pilot light kimi işləyir — data fasiləsiz replikasiya olunur. Fərq: warm standby-də bütün komponentlər **24/7** işləyir, sadəcə production trafiki üçün miqyaslanmır.

Kritik yük üçün seçildiyindən DR-lokasiyanın sağlamlığını fasiləsiz test etmək lazımdır. Ən yaxşısı **A/B testi**: trafikin kiçik hissəsini (təxminən **1–5%**) DR-lokasiyaya yönəlt. Bu, həmin lokasiyanın əsas çökəndə trafiki daşıya biləcəyinə zəmanət verir. Patch və yeniləmələri müntəzəm quraşdırmağı da unutma.

Çöküş baş verəndə addımlar:

1. Kritik yükün trafikini dərhal DR-lokasiyaya köçür — ikinci lokasiyanın payını 5%-dən 100%-ə qaldır. (Məsələn bankda: əvvəlcə müştəri işləyən saytı "ayağa qaldır".)
2. Aşağı güclə işləyən mühiti miqyasla — baza üçün şaquli, serverlər üçün üfüqi.
3. Miqyaslama gedərkən digər qeyri-kritik yükləri (anbar, çatdırılma) köçür.

Alətlər: **Terraform** (HashiCorp-un açıq mənbəli IaC aləti), **Veeam** (backup/replikasiya, multi-cloud), **Zerto** (DR, backup, workload mobility).

Mənfi tərəf: mürəkkəb və bahadır. Kritik yük üçün RTO pilot light-dan çox aşağıdır, qeyri-kritik yük üçün miqyaslama sürətindən asılıdır, RPO isə replikasiya tipindən.

---

### 4. Hot standby — sıfıra yaxın dayanma, amma ən baha

Nəhayət, **hot standby** (qaynar ehtiyat) — RTO və RPO-nu **sıfıra yaxın** endirir. Burada DR-lokasiya əsas lokasiyanın tam replikasıdır: fasiləsiz data replikasiyası və lokasiyalar arası trafik axını ilə. Trafik regionlar arasında və ya lokal/bulud mühitləri arasında avtomatik paylandığı üçün bu arxitektura **multi-site** (paylanmış) da adlanır.

Üstünlük: ehtiyat sistem istənilən an tam production yükünü qəbul etməyə hazırdır. Warm standby-ə bənzəyir, amma **tam tutumda.** Əsas lokasiya çökəndə bütün trafik dərhal keçir — warm standby-dəki miqyaslama gecikməsi olmadan.

Alətlər və texnologiyalar:

- **Bulud idarəetmə platformaları:** VMware vRealize Automation, Microsoft Azure Site Recovery — VM və data replikasiyasını koordinasiya edir.
- **Load balancer və qlobal trafik idarəetməsi:** F5 BIG-IP, AWS Route 53 — trafiki lokasiya əlçatanlığı və yükə görə dinamik yönəldir.
- **IaC:** Terraform, AWS CloudFormation — infrastrukturu operativ təchiz və miqyaslamaq üçün.
- **Şəbəkə monitorinqi:** SolarWinds, Nagios — real vaxtda şəbəkə sağlamlığı analitikası.

Mənfi tərəf: **ən bahalı üsul**, çünki bütün komponentlər üçün artıqlıq tələb edir. Amma dayanmaya dözməyən biznes üçün (maliyyə qurumları, səhiyyə, e-ticarət) bu investisiya potensial dayanma itkilərinin qarşısını almaqla özünü doğruldur. RTO bütün yüklər üçün çox aşağıdır, RPO isə replikasiya tipindən əhəmiyyətli asılıdır.

---

## Ən yaxşı DR təcrübələri

DR-i planlayanda bu faktorları nəzərə al:

- **Kiçikdən başla, ehtiyaca görə əlavə et.** Əvvəlcə biznesə ən çox təsir edən kritik yükləri "ayağa qaldır", sonra tədricən az kritik olanları əlavə et.
- **Backup həyat dövrünü tətbiq et.** Bütün datanı backup-la, amma çoxlu aktiv backup saxlamaq xərci artırır. Life-cycle siyasəti qur: məsələn, aktiv backup-ları 90 gün saxla, sonra ucuz arxiv daşıyıcısına (maqnit lent və ya Amazon Glacier) köçür, 1–2 ildən sonra sil. Bəzi standartlar (PCI-DSS) datanı **7 il** saxlamağı tələb edə bilər — o zaman arxiv anbarı seç.
- **Lisenziyaları yoxla.** Mikroservis mühitində lisenziya idarəetməsi çətindir. Lisenziyalar quraşdırma, prosessor və ya istifadəçi sayına bağlana bilər — bu, miqyaslamada problem yaradır. Nə az, nə artıq lisenziya al.
- **Miqyaslamanı planla.** Üfüqi üçün əlavə ekzemplyar, şaquli üçün əlavə CPU/yaddaş. Lisenziya şərtlərini bil.
- **Həllini tez-tez test et.** DR-lokasiyalar nadir hadisələr üçün qurulur, ona görə tez-tez diqqətdən kənar qalır. SLA pozuntusu müqavilə öhdəliyi, pul və müştəri etimadı itkisi deməkdir.
- **Game day-lər keçir.** Yükün az olduğu gün seç, komandanı topla, insident simulyasiya et — production-un bir hissəsini çökdür və komandanın necə davrandığına bax. Bu, işlək backup, snapshot və maşın obrazlarının mövcudluğunu təsdiqləyir.
- **Fasiləsiz resurs monitorinqi apar.** Avtomatik failover üçün monitorinq sistemi işə sal. Tutum izləmə resurs tükənməsi problemini aradan qaldırır.

---

## Bulud etibarlılığı necə asanlaşdırır

Bir çox təşkilat etibarlılığı artırmaq üçün buludu DR-lokasiya kimi seçməyə başlayıb. Səbəblər:

- **Coğrafi seçim:** bulud platforması müxtəlif coğrafi regionlarda data-mərkəzlər verir. Başqa qitədə etibarlı lokasiya yaratmaq az qala zəhmətsizdir.
- **Hazır monitorinq:** buludda log və metrikalar hazır gəlir. Məsələn, **AWS CloudWatch** logları toplayır, metrikalar yaradır və miqyaslama üçün avtomatlaşdırılmış prosesləri işə sala bilər. Həddlər pozulanda komandaya bildiriş göndərir və ya self-healing avtomatlaşdırmasını tetikleyir.
- **Dəyişiklik idarəetməsi:** bulud provayderləri tətbiqləri kontrollü şəkildə patch/əvəz etməyə imkan verir. Məsələn, **AWS Systems Manager** kütləvi patch və yeniləmə funksionallığı təqdim edir.
- **Elastik miqyaslama:** resursları cari tələbə görə avtomatik əlavə/silmək.
- **Hazır backup/replikasiya:** maşın obrazları, bazalar və fayllar üçün. Fəlakət zamanı buludda bütün datanın backup-ı vaxtında saxlanır və sistem sürətlə bərpa olur.

Bulud, RPO/RTO tələbləri, xərc və IT-resurslar arasında **detallı nəzarət** verir. DR planını test etmək də sadə və effektivdir.

---

## Sona qədər: fərq nədədir?

Bu yazıda bir sualla başladıq: sistem gecə çökəndə kim oyanmalıdır — siz, yoxsa sistem özü?

**Əvvəl:** monolit tətbiq, bir modul çökəndə bütün sistem yıxılır. Konfiqurasiya əllə edilir, insan səhvi hər an mümkündür. Fəlakət zamanı komanda təlaş içində əllə bərpaya çalışır, saatlarla data itir, müştəri qəzəbli.

**Sonra:** paylanmış sistem, hər nasazlıq öz kiçik zonasında izolyasiya olunur. Konfiqurasiya skriptdədir — təkrar-istehsal olunan, sənədləşdirilmiş. Sistem KPI-ları izləyir, həddi keçəndə özünü bərpa edir. Fəlakət zamanı — biznes tələbinə uyğun seçilmiş DR strategiyası (backup-dan hot standby-ə qədər) trafiki avtomatik ehtiyata keçirir. Müştəri heç nəyin fərqinə varmır.

Etibarlılıq bir dəfəlik "quraşdırıb unutmaq" işi deyil. Layihələndirmə və işə salma vaxtaşırı olur, amma **saxlama (maintenance) həmişədir.** DR planını qur, müntəzəm test et, RTO/RPO-nu tədricən azalt.

Bəs sizin sistemin bu gecə çöksə — kim oyanacaq?
