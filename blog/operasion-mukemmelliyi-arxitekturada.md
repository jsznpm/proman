# Tətbiq işə düşdü — indi kim onu ayaqda saxlayacaq?

Yeni layihə həmişə eyni cür başlayır: aylarla planlaşdırma, resursların ayrılması, komandanın gecə-gündüz kod yazması. Sonra gözlədiyimiz an gəlir — tətbiq nəhayət production-a çıxır. Amma çoxları burada bir şeyi unudur: **işə salmaq işin sadəcə yarısıdır.** Əsl çətinlik ondan sonra başlayır.

Bu yazıda gəlin operasion mükəmməllik (operational excellence) mövzusuna baxaq — yəni sistemin bütün komponentlərinin və qatlarının səmərəli işləməsini təmin etmək sənəti. Söhbət təkcə "serveri qaldırmaqdan" getmir. Söhbət ondan gedir ki, tətbiq işə düşəndən aylar, illər sonra da etibarlı işləsin, problemləri istifadəçi hiss etməmişdən əvvəl tapılıb həll edilsin.

> Operasion mükəmməllik — infrastruktur, təhlükəsizlik və proqram təminatının fasiləsiz monitorinqi, optimizasiyası və təkmilləşdirilməsidir.

Müasir mikroservis tətbiqlərində o qədər "hərəkət edən hissə" var ki, sistemi əl ilə idarə etmək praktiki olaraq mümkün deyil. Eksploatasiya (operations) komandası biznesin tələblərini anlamalı, hər gözlənilməz situasiyaya hazır olmalıdır. Gəlin bunun necə edildiyinə baxaq.

---

## Dizayn prinsipləri: mükəmməlliyin təməli

Operasion mükəmməlliyə birdən-birə çatmaq olmur. O, bir neçə dizayn prinsipinin üstündə qurulur və bu prinsiplər bir-birini tamamlayır. Gəlin hərəsinə ayrıca baxaq.

### 1. Əl işlərini avtomatlaşdır

Texnologiya sürətlə dəyişir, IT-operasiyalar da geridə qalmamalıdır — xüsusən avadanlıq və proqram təminatı bir neçə vendordan gələndə. Şirkətlər hibrid bulud (hybrid cloud) və multi-bulud (multi-cloud) sistemləri qurur, ona görə həm lokal, həm də bulud mühitlərində əməliyyatları bacarmaq lazımdır.

Təsəvvür et: milyonlarla cihaz, onlarla mikroservis, geniş istifadəçi bazası. Bunları əllə idarə etmək — sonu olmayan bir işdir. Həll — **avtomatlaşdırma.**

Yeni serverin qaldırılması, servislərin başladılıb-dayandırılması "infrastruktur kod kimi" (Infrastructure as Code, IaC) yanaşması ilə avtomatlaşdırılmalıdır. Bir misal: kimsə serverinə HTTP port 80 üzərindən giriş açanda avtomatik təhlükəsizlik bildirişi qura bilərsən. Demək olar ki, bütün infrastrukturu bir kliklə yenidən deploy etmək mümkündür.

Avtomatlaşdırma həm də **insan səhvlərinin** qarşısını alır — hətta eyni işi hər gün görən adam belə səhv edə bilər. IT-operasiyalar üçün avtomatlaşdırma artıq seçim deyil, məcburiyyətdir.

### 2. İnkremental və geri qaytarıla bilən dəyişikliklər

Operasiyaların optimizasiyası daimi prosesdir. Serverin əməliyyat sistemləri müntəzəm olaraq təhlükəsizlik yamaqları (security patch) ilə yenilənməlidir, proqramların versiyaları yenilənməlidir, bəzən yeni normativ tələblərə uyğunlaşmaq üçün sistemə dəyişiklik etmək lazım gəlir.

Burada əsas qayda: **kiçik addımlarla irəlilə.**

İş yükünü (workload) elə dizayn et ki, bütün komponentlər müntəzəm yenilənə bilsin. Dəyişiklikləri kiçik, inkremental hissələrə böl — ki, bir səhv bütün sistemi yıxmasın. Və ən önəmlisi: **hər dəyişiklik geri qaytarıla bilən (reversible) olmalıdır.** Problem çıxdı — bir addım geri qayıt, sistem işlək vəziyyətə dönsün.

Kiçik dəyişikliklər həm də test etməyi asanlaşdırır və ümumi etibarlılığı artırır.

### 3. Sıradan çıxmanı proqnozlaşdır və reaksiya ver

Sadə həqiqət: **sıradan çıxmalar (failures) qaçılmazdır.** Sual "olacaqmı?" deyil, "nə vaxt olacaq?"

Ona görə arxitekturanı elə qur ki, sanki sıradan çıxma hər yerdə və həmişə baş verəcək. Ehtiyat bərpa (recovery) planı hazırla. Müntəzəm təlimlər keçir ki, potensial problem mənbələrini əvvəlcədən aşkar edəsən.

SLA (Service Level Agreement — xidmət səviyyəsi razılaşması) əsasında test ssenarisi yarat. Bura iki əsas göstərici daxildir:

- **RTO (Recovery Time Objective)** — hədəf bərpa vaxtı, yəni sistemi nə qədər tez bərpa etməlisən.
- **RPO (Recovery Point Objective)** — hədəf bərpa nöqtəsi, yəni nə qədər məlumat itkisini qəbul edə bilərsən.

Reallığa yaxın şərtlər modelləşdir, reaksiya prosedurunu test et. Məqsəd — özünə güvənən, prosedurları əzbər bilən komanda formalaşdırmaq.

### 4. Səhvləri analiz et, nəticə çıxar

Sistemdə nasazlıq olanda öz səhvlərindən öyrənmək lazımdır. Ən effektiv üsullardan biri — **kök səbəb analizi (RCA, Root Cause Analysis).**

RCA-nın populyar formatı **"beş niyə" (5 Whys)** metodudur: komandanı yığırsan və ardıcıl beş dəfə "niyə?" soruşursan. Hər sual bir qat dərinə enir, sonuncudan sonra əsl kök səbəbə çatırsan. (Bunun konkret nümunəsini bir azdan görəcəyik.)

### 5. Runbook-u aktual saxla

Komandalar çox vaxt sənədləşdirməyə etinasız yanaşır və **runbook** (operasion sənədləşmə) köhnəlir. Runbook — daxili və ya xarici hadisələrdən yaranan problemlərin həlli üçün təlimatdır.

Aktual sənəd olmayanda operasiyalar insan faktorundan asılı olur — bu isə risklidir, çünki işçilər dəyişir. Qayda belədir: **sistem əməliyyatları konkret adamlardan asılı olmasın, hər şey sənədləşdirilsin.**

Runbook-a nələr düşməlidir: sistemin başladılması/dayandırılması addımları, yamaqların quraşdırılması, test nəticələri, hadisələrə reaksiya proseduru və SLA göstəriciləri (RTO/RPO, gecikmə, miqyaslanma, performans).

---

İndi prinsiplərdən praktikaya keçək. Operasiyaları üç mərhələyə bölmək olar — **planlaşdırma, funksionerlik və təkmilləşdirmə.** Hərəsinə uyğun texnologiyalara baxaq.

## Mərhələ 1: Planlaşdırma

İlk addım — prioritetləri müəyyən etmək. Bizneze ən çox təsir edən sahələrə fokuslan: avtomatlaşdırma, monitorinqin optimizasiyası, komandanın bacarıqlarının inkişafı, ümumi performansın artırılması.

Planlaşdırmada iki əsas sahə hazırlıq tələb edir: **IT-aktivlərin idarəsi** və **konfiqurasiya idarəsi.**

### IT-aktivlərin idarəsi (ITAM)

IT-aktivlər (IT assets) nədir? Qısaca — şirkətin biznes üçün istifadə etdiyi bütün sistemlər, avadanlıq və məlumat:

- **İnfrastruktur avadanlığı** — fiziki serverlər, şəbəkə cihazları, yaddaş sistemləri, son istifadəçi cihazları.
- **Proqram təminatı** — lisenziyalar, operasion məlumatlar.
- **Hüquqi aspektlər** — müqavilələr, normativ uyğunluq.

Böyük təşkilatda bu aktivləri idarə etmək asan deyil. Bunu asanlaşdıran alətlərə **ITAM (IT Asset Management)** deyilir. Populyar olanlar: SolarWinds, Freshservice, ServiceDesk Plus, Asset Panda, PagerDuty, Jira Service Desk.

ITAM prosesi aktivin bütün həyat dövrünü əhatə edir:

- **Planlaşdırma** — strateji analizlə aktivə ehtiyacı və onu necə əldə etməyi müəyyən edirsən. Bura TCO (Total Cost of Ownership — sahiblik dəyəri) hesablanması daxildir.
- **Əldə etmə (Acquisition)** — planlaşdırmanın nəticəsinə görə aktivi alırsan. Bəzi komponentləri (məsələn, öz monitorinq proqramını) özün də hazırlaya bilərsən.
- **İnteqrasiya** — aktiv IT-ekosistemə daxil edilir: konfiqurasiya, giriş hüquqlarının təyini, agentlərin quraşdırılması.
- **Xidmət (Maintenance)** — komanda aktivləri izləyir, yeniləyir və ya miqrasiya edir. Məsələn, Windows Server 2008-dən Windows 2022-yə keçidi planlaşdırmaq, çünki köhnə OS tezliklə dəstəklənməyəcək.
- **Silinmə (Retirement)** — ömrü bitmiş aktivlərdən qurtulursan, lazımi istifadəçiləri yeni serverə köçürürsən.

ITAM həm də ISO 19770 standartına uyğunluğa kömək edir və müxtəlif şöbələr (eksploatasiya, maliyyə, marketinq, müştəri dəstəyi) arası kommunikasiyanı yaxşılaşdırır.

### Konfiqurasiya idarəsi

Konfiqurasiya idarəsi **konfiqurasiya elementlərinin (CI, Configuration Items)** saxlanmasını təmin edir. Bu elementlər **CMDB (Configuration Management Database)** adlı bazada saxlanır.

CMDB-də nə var? Məsələn: server fizikidir yoxsa virtual, hansı OS və versiya işləyir (Windows 2022 və ya Red Hat Enterprise Linux 8.0), serverin sahibi kimdir (dəstək, marketinq və ya HR komandası), digər serverlərdən asılılıqları var ya yox.

Diqqət: **konfiqurasiya idarəsi ilə aktiv idarəsi eyni şey deyil.** Aktiv idarəsi bütün həyat dövrünü (planlaşdırmadan silinməyə qədər) əhatə edir; CMDB isə aktiv idarəsinin bir hissəsidir — konkret aktivlərin konfiqurasiya qeydlərini saxlayır. Yəni konfiqurasiya idarəsi aktiv idarəsinin **inteqrasiya və xidmət** hissəsini reallaşdırır.

Konfiqurasiya idarəsi ilə dəyişiklik idarəsi (change management) bir-birini tamamlayır: biri bütün komponentlərin dəqiq və aktual məlumatını saxlayır, digəri isə dəyişikliklərin koordinasiyalı, sistemli tətbiqini təmin edir.

Populyar konfiqurasiya idarəsi alətləri: **Chef, Puppet, Ansible, Bamboo.**

İş bulud platformasında (AWS, Azure, GCP) olanda bu daha asan olur. Məsələn, **AWS Config** bütün IT-resursları izləyir, **AWS Trusted Advisor** isə xərc, performans və təhlükəsizlik üçün optimizasiya tövsiyələri verir. (Sənədlərdə Trusted Advisor 12 təhlükəsizlik problemi tapıb göstərə bilir — sonra hər birini araşdırmaq mümkündür.)

Konfiqurasiya idarəsinin faydaları:

- **Fasiləsiz monitorinq** — konfiqurasiya dəyişikliklərinin daimi izlənməsi.
- **Dəyişiklik idarəsi** — resurslar arası asılılıqların analizi.
- **Fasiləsiz qiymətləndirmə** — müntəzəm audit və siyasətə uyğunluq yoxlaması.
- **Uyğunluq monitorinqi** — bütün təşkilat miqyasında.
- **Üçüncü tərəf resurslarının idarəsi** — GitHub repozitoriyaları, Active Directory, lokal və bulud serverləri.
- **Operasion diaqnostika** — konfiqurasiya dəyişikliklərinin tam tarixçəsi.

Bunlar **ITIL (Information Technology Infrastructure Library)** frameworkunun bir hissəsidir. ITIL isə **ITSM (IT Service Management)** proseslər dəstini reallaşdırır — gündəlik IT-operasiyaları idarə etməyə kömək edir.

---

## Mərhələ 2: Funksionerlik — sistemi ayaqda saxlamaq

Planlaşdırdıq, indi sistem işləyir. Operasion mükəmməllik burada **proaktiv monitorinq** və nasazlıq zamanı **sürətli reaksiya-bərpa** ilə əldə edilir.

Bir vacib prinsip: **komponentləri əvəzlənə bilən (replaceable) dizayn et.** Nasaz komponenti düzəltməyə vaxt itirmə — onu etibarlı, məlum versiya ilə əvəz et, bərpa vaxtını qısalt. Nasaz resursu isə sonra, production-a toxunmadan analiz et.

Bu mərhələdə iki sahə vacibdir: **sistem sağlamlığının monitorinqi** və **alert-lər + hadisələrə reaksiya.**

### Sistem sağlamlığının monitorinqi

Ənənəvi olaraq monitorinq yalnız infrastruktur qatı ilə məhdudlaşırdı — serverlərdə yaddaş və prosessor yükü. Amma monitorinq **hər qatda** aparılmalıdır. Gəlin əsas qatlara baxaq.

**İnfrastruktur monitorinqi** — ən çox tələb olunan növdür. Metrikalar:

- **Prosessor yükü** — CPU istifadəsi faizi.
- **Yaddaş yükü** — RAM istifadəsi faizi.
- **Şəbəkə istifadəsi** — daxil/xaric olan paketlərin sayı.
- **Disk istifadəsi** — oxu/yazma buraxma qabiliyyəti və saniyədəki I/O əməliyyatları (IOPS).
- **Load balancer** — müəyyən dövrdə sorğu sayğacları.

**Tətbiq monitorinqi** — bəzən infrastruktur tam sağlamdır, amma problem kodda və ya üçüncü tərəf proqramdadır. Metrikalar:

- **Endpoint çağırışları** — sorğu sayı.
- **Cavab vaxtı (response time)** — orta cavab müddəti.
- **Throttling** — sistemin əlavə yükü qaldıra bilmədiyi üçün rədd edilən düzgün sorğuların sayı.
- **Xətalar** — sorğuların emalında nasazlıqlar.

Texnologiyadan asılı olaraq başqa metrikalar da olur: Java tətbiqləri üçün garbage collection yaddaş xərci, RESTful servis üçün HTTP POST/GET sorğuları, 4XX müştəri xətaları və 5XX server xətaları sayğacları.

**Platforma monitorinqi** — tətbiqin istifadə etdiyi üçüncü tərəf alətlər:

- **Yaddaş keşi** — Redis, Memcached.
- **Relyasiya DB** — Oracle, MS SQL Server, Amazon RDS, PostgreSQL.
- **NoSQL DB** — Amazon DynamoDB, Apache Cassandra, MongoDB.
- **Big data** — Apache Hadoop, Spark, Hive, Impala, Amazon EMR.
- **Konteynerlər** — Docker, Kubernetes, OpenShift.
- **BI alətləri** — Tableau, MicroStrategy, Kibana, Amazon QuickSight.
- **Mesajlaşma** — MQSeries, JMS, RabbitMQ, Amazon SQS.
- **Axtarış** — OpenSearch, Solr.

**Jurnal (log) monitorinqi** — əvvəllər jurnallar əl ilə, yalnız problem çıxandan sonra yoxlanırdı. İndi rəqabət və istifadəçi gözləntiləri buna imkan vermir. Proaktiv olmaq üçün jurnalları mərkəzləşdirilmiş anbara göndərib sorğu ilə problemləri aşkar etmək lazımdır.

Misal: bir məhsul səhifəsi xəta verirsə, istifadəçilər şikayət etməmişdən əvvəl onu tapıb düzəltmək lazımdır — yoxsa pul itirirsən. Şəbəkə hücumu olanda isə jurnalı analiz edib şübhəli IP-ləri bloklayırsan.

AWS CloudWatch, Logstash, Splunk, Google Stackdriver kimi sistemlər serverə agent quraşdırır, agent jurnalları mərkəzi anbara göndərir. Sonra sorğu ilə, məsələn, ən çox rədd edilmiş sorğuya malik top-10 IP-ni tapıb, müəyyən həddi (məsələn 5000) keçəndə alert qura bilərsən.

**Təhlükəsizlik monitorinqi** — hər qatda aparılmalıdır:

- **Şəbəkə təhlükəsizliyi** — icazəsiz port açılmaları, şübhəli IP-lər.
- **İstifadəçi girişi** — icazəsiz müraciətlər, şübhəli aktivlik.
- **Tətbiq təhlükəsizliyi** — zərərli proqram və virus hücumları.
- **Veb təhlükəsizliyi** — DDoS, SQL injection, XSS hücumları.
- **Server təhlükəsizliyi** — quraşdırılmamış yamaqlar.
- **Komplayns (compliance)** — məsələn ödəniş tətbiqləri üçün PCI, səhiyyə üçün HIPAA yoxlaması.
- **Məlumat təhlükəsizliyi** — icazəsiz məlumat girişi, maskalanma, şifrələmə (həm saxlanmada, həm ötürülmədə).

AWS platformasında **Amazon GuardDuty** buna kömək edir. Digər alətlər: Imperva, McAfee, Qualys, Palo Alto Networks, Sophos, Symantec.

> Vacib incəlik: monitorinq sisteminin özünü də monitorinq et. Əgər sistem Amazon EC2-də yerləşibsə, EC2-nin sağlamlığını AWS CloudWatch ilə izlə.

### Alert-lər və hadisələrə reaksiya

Monitorinq mükəmməlliyin yalnız bir hissəsidir. İkinci hissə — **alert sistemi və reaksiya.**

Hədd (threshold) və şərtlər təyin edirsən. Məsələn: server yükü 5 dəqiqə ərzində 70%-ə çatırsa, sistem alert göndərir. Avtomatlaşdırma varsa, auto-scaling özü əlavə server qaldırır və komandaya bildiriş göndərir.

Alert-ləri prioritetə görə kateqoriyalara bölmək faydalıdır. Bir nümunə klassifikasiya:

- **Səviyyə 1** — kritik problem. Bütün tətbiq sıradan çıxıb. Reaksiya vaxtı: 15 dəqiqə, 24/7 rejimdə.
- **Səviyyə 2** — yüksək prioritet. Məsələn, tətbiq işləyir amma rəy/qiymətləndirmə sistemi işləmir. Reaksiya: 24 saat, iş saatlarında.
- **Səviyyə 3** — orta prioritet. Məsələn, serverin diski 2 gün sonra dolacaq. Reaksiya: 72 saat, iş saatlarında.
- **Səviyyə 4** — aşağı prioritet. Məsələn, SSL sertifikatı 2 həftəyə bitəcək. Reaksiya: bir həftə.
- **Səviyyə 5** — sadəcə bildiriş, eskalasiya tələb etmir. Məsələn, deploy tamamlandı. Reaksiya lazım deyil.

Hər təşkilat öz ehtiyacına görə səviyyələri fərqli təyin edə bilər.

Alert qurarkən **ad və qısa təsvir mənalı və lakonik** olsun — çünki tez-tez mobil cihaza SMS və ya pager mesajı kimi gedir. Metrikanı da mesajın içinə sal. Yəni:

> "Diск doldu" ❌
> "production-web-1 serverində disk 90% doludur" ✅

**İncident** — sistemi və müştərini mənfi təsir edən hər planlanmamış pozuntudur. İlk reaksiya — **sistemi bərpa etmək.** Kök səbəbi sonra, sistem işə düşəndən sonra həll edərsən. Məsələn, bütün sistem çökəndə ehtiyat bərpa (disaster recovery) meydançasına keçirsən, əsas sistemi isə sonra düzəldirsən.

Maraqlı bir nümunə — **Netflix və "Simian Army" (Meymun Ordusu).** Bu, sistem dayanıqlığını test etmək üçün alətlər dəstidir. Ən məşhuru **Chaos Monkey** ("xaos meymunu") — təsadüfi şəkildə production serverlərini söndürür ki, sistemin son istifadəçiyə təsir etmədən reaksiya verib-vermədiyini yoxlasın. Digərləri: **Security Monkey** (təhlükəsizlik zəiflikləri), **Latency Monkey** (şəbəkə gecikmələri), **Chaos Gorilla** (bütöv bir availability zone-un çökməsini modelləşdirir).

---

## Mərhələ 3: Təkmilləşdirmə — daim yaxşılaşmaq

Fasiləsiz təkmilləşdirmə hər proses üçün vacibdir. Operasion mükəmməllik də zamanla yetkinliyə çatmaq üçün buna ehtiyac duyur. Bu mərhələdə üç sahə önəmlidir: **ITOA, RCA və audit.**

### IT-operasiyalarının analitikası (ITOA)

**ITOA (IT Operations Analytics)** — müxtəlif mənbələrdən məlumat toplayıb qərar qəbul etmək və problemləri qabaqcadan proqnozlaşdırmaq praktikasıdır.

Böyük təşkilatda yüzlərlə sistem nəhəng həcmdə məlumat yaradır. Hadisə jurnallarını, iş aktivliyini və infrastruktur dəyişikliklərini müəyyən müddət (məsələn 90 və ya 180 gün) saxla. ITOA terabaytlarla məlumatı saxlamaq və analiz etmək üçün **big data** arxitekturasından istifadə edir.

Fayda: ayrı-ayrı alətlərlə tapıla bilməyən problemləri aşkar edir və sistemlər arası asılılıqları müəyyən edərək bütöv mənzərəni formalaşdırır.

Operasion analitika sistemi qurmaq üçün tipik pipeline belədir:

1. Hər serverə agent (məsələn Amazon CloudWatch agent) quraşdırılır, jurnalları mərkəzi anbara göndərir. ExtraHop, Splunk kimi alətlər fərqli sistemlərdən məlumat çıxarmağa kömək edir.
2. Məlumat miqyaslana bilən anbarda (məsələn Amazon S3 və ya lokal Hadoop klasteri) toplanır.
3. Spark, MapReduce, AWS Glue ilə çevrilir və təmizlənir.
4. Tableau, MicroStrategy, Amazon QuickSight ilə vizuallaşdırılır.

Bu, əslində **ETL (Extract, Transform, Load) pipeline**-dır. Sonra maşın öyrənməsi (machine learning) tətbiq edib gələcək hadisələri proqnozlaşdıra bilərsən.

### Kök səbəb analizi — "beş niyə" praktikada

İndi əvvəl vəd etdiyim nümunə. Problem: tətbiqin dashboard-unda məlumat görünmür. Gəlin beş dəfə "niyə?" soruşaq:

**Problem:** Tətbiq dashboard-unda məlumat çıxmır.

1. **Niyə?** Çünki tətbiq bazaya qoşula bilmir.
2. **Niyə?** Çünki qoşulmaq cəhdində xəta alır.
3. **Niyə?** Çünki şəbəkə brauzeri baza portuna konfiqurasiya olunmayıb.
4. **Niyə?** Çünki port ayarı əl ilə edilir, infrastruktur komandası isə unudub.
5. **Niyə?** Çünki komandada avtomatlaşdırma alətləri yoxdur.

**Kök səbəb:** İnfrastruktur qurulanda əl ilə konfiqurasiya səhvi.
**Həll:** Avtomatlaşdırılmış infrastruktur yaratma alətləri tətbiq etmək.

Bax burada gözəllik ondadır: ilk baxışda problem "tətbiqdə" görünürdü. Amma beş "niyə"-dən sonra məlum olur ki, əsl problem daha dərindədir — avtomatlaşdırma çatışmır. Nəticələri runbook-a yaz və komandada payla.

### Audit və hesabatlar

Audit — sistemdəki zərərli aktivliyi (daxili və ya xarici) aşkar etmək üçün vacibdir. Xüsusən tətbiq PCI, HIPAA, FedRAMP, ISO kimi tənzimləyici tələblərə cavab verməlidirsə.

Nəyə görə audit lazımdır:

- **Təhlükəsizlik incidentlərini** aşkar etmək — hücumçu sistemə sakitcə girib məlumat oğurlaya bilər; müntəzəm audit bu gizli təhlükəni tapır.
- **Boş işləyən resursları** aşkar etmək — lazım olmayanda işləyən resursları tapıb bağlamaq.
- **IT-aktivləri və lisenziyaları** qorumaq, məlumat bütövlüyünü təmin etmək.

AWS-də **Amazon Macie** — maşın öyrənməsi əsaslı məlumat təhlükəsizliyi servisi — S3 bucket-larında məxfi məlumatı tapıb qoruyur. Audit hesabatına məlumatın əlçatanlığı, şifrələnməsi, birgə istifadəsi və saxlanma detalları daxil olur.

Audit proseduru dörd mərhələdən ibarətdir: **planlaşdırma, hazırlıq, qiymətləndirmə, hesabat.** Hesabatda bütün risk elementləri qeyd olunmalı və açıq problemlərin həlli üçün sonrakı addımlar müəyyən edilməlidir.

---

## Bulud platformalarında operasion mükəmməllik

AWS, GCP, Azure kimi provayderlər bulud üçün hazır alətlər təqdim edir. Nümunə olaraq AWS servislərinə mərhələlər üzrə baxaq:

**Planlaşdırma mərhələsi:**

- **AWS Trusted Advisor** — iş yükünü best practice-lərə görə yoxlayır, tövsiyələr verir.
- **AWS CloudFormation** — bütün iş yükünü kod kimi baxmağa imkan verir (tətbiq, infrastruktur, siyasət, idarəetmə).
- **AWS Systems Manager** — bulud serverlərini kütləvi yamaq və yeniləmə üçün idarə edir.

**Funksionerlik mərhələsi:**

- **Amazon CloudWatch** — yüzlərlə hazır metrika, mərkəzi jurnal idarəsi, avtomatik reaksiya.
- **AWS Lambda** — operasion hadisələrə reaksiyanı avtomatlaşdırır.

**Təkmilləşdirmə mərhələsi:**

- **Amazon OpenSearch** — jurnal analizi və təcrübədən öyrənmə.
- **AWS CodeCommit** — təcrübədən əldə edilən biliyi kod kimi mərkəzi repozitoriyada saxlayır.

Ayrıca **AWS CloudTrail** sistem əməliyyatlarının tam tarixçəsini yaradır, **Amazon GuardDuty** və **Amazon Detective** isə təhlükəsizlik auditi üçün dərin analitika verir.

---

## CloudOps ilə səmərəliliyi artırmaq

**CloudOps** — bulud mühitlərinin səmərəli idarəsi üçün proseslər, alətlər və best practice-lər toplusudur. Faydaları: yüksək səmərəlilik, aşağı xərc, təhlükəsizlik və komplayns, sürətli bərpa, tez miqyaslanma.

CloudOps-un əsas prinsipləri (hansı provayderdən asılı olmayaraq):

- **İdarəetmə (governance)** — AWS Organizations, Azure Management Groups və ya GCP Resource Manager ilə hesabları təşkil et; AWS Control Tower, Azure Blueprints ilə siyasətləri tətbiq et.
- **Komplayns** — AWS Config, Azure Policy, GCP Security Command Center ilə fasiləsiz monitorinq; uyğunluq yoxlamalarını avtomatlaşdır.
- **Resurs ayırma və orkestrasiya** — IaC alətləri (CloudFormation, Azure Resource Manager, GCP Deployment Manager) ilə mühiti sürətli qur.
- **Monitorinq və müşahidə** — CloudWatch, Azure Monitor, Google Cloud Operations Suite ilə observability təmin et.
- **Operasiyaların mərkəzləşdirilməsi** — AWS Systems Manager, Azure Automation ilə miqyasda idarə et.
- **Xərc idarəsi** — AWS Cost Explorer, Azure Cost Management ilə büdcə planla, anomaliyaları tap.

> Avtomatlaşdırma CloudOps-un təməlidir. Əllə edildikdə yüksək səhv riski olan infrastruktur dəyişiklikləri CloudFormation ilə ardıcıl və sürətli aparılır.

CloudOps-a keçid idarəetmə və komplayns əsaslarından başlayır. Məsələn, bir rəqəmsal marketinq agentliyi əvvəl bulud mühitini best practice-lərə görə qoruyur, sonra deploy pipeline-larını tam avtomatlaşdırmağa keçir. Agentlik böyüdükcə komandalar arası əməkdaşlıq best practice-lərin yayılması üçün həlledici olur.

---

## Sona qədər: fərqi görürsən?

Gəlin əvvəl və sonranı müqayisə edək.

**Operasion mükəmməllik olmadan:** tətbiq işə düşür, sonra problemlər üstümüzə tökülür, komanda yanğın söndürməklə məşğul olur, hər nasazlıq eyni cür təkrarlanır, sənəd köhnəlib, hər şey bir-iki "qəhrəman"ın yaddaşında qalıb.

**Operasion mükəmməlliklə:** əl işləri avtomatlaşdırılıb, dəyişikliklər kiçik və geri qaytarıla biləndir, nasazlıqlar qabaqcadan proqnozlaşdırılır, hər incident RCA ilə analiz olunub kök səbəbi həll edilir, runbook aktualdır, hər qat monitorinq edilir, alert-lər prioritetə görə düzülüb, təcrübə komanda arasında paylaşılır.

Fərq — **reaktivlik ilə proaktivlik arasındakı fərqdir.** Birincidə problem səni tapır. İkincidə sən problemi.

Bu yolçuluq üç mərhələdən keçir: planlaşdır (ITAM, konfiqurasiya idarəsi) → funksioner et (monitorinq, alert, reaksiya) → təkmilləşdir (ITOA, RCA, audit). Və bunu bir dəfə deyil, **fasiləsiz** et — çünki iş yükü daim dəyişir, mükəmməllik isə heç vaxt "bitmiş" statusa çatmır.

Bəs sizin sistemləriniz hansı mərhələdədir — hələ də yanğın söndürürsünüz, yoxsa artıq problemi qabaqlayırsınız?
