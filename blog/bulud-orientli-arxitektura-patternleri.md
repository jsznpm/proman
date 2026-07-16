# Bulud üçün doğulmuş sistemlər: cloud-native arxitekturanın pattern kitabı

Bu yazıda gəlin bir şeyi düz danışaq: buludda tətbiq işlətmək və *bulud üçün* tətbiq qurmaq — iki fərqli şeydir. Çoxları köhnə monolitini götürüb virtual maşına atır, sonra da təəccüblənir ki, niyə fayda görmür. Cavab sadədir — bulud onlara sadəcə icarəyə verilmiş server oldu, o qədər.

Əsl fayda başqa yerdədir. Bulud üçün doğulmuş — yəni **cloud-native** — arxitektura buludun bütün gücünü (avtomatik miqyaslanma, ödə-nə-qədər-işlətdin modeli, qlobal əlçatanlıq) sonuna qədər sıxıb çıxarmaq üçün qurulur. Bu yazıda həmin arxitekturanın əsas pattern-lərini bir-bir gəzəcəyik: serverless-dən microservices-ə, Saga-dan Service mesh-ə, event-driven yanaşmadan BFF-ə qədər. Sonda da qaçmalı olduğunuz antipattern-lərə baxacağıq.

Uzun yoldur. Amma sonuna çatanda əlinizdə bulud sistemləri dizayn etmək üçün real bir alət dəsti olacaq.

---

## Cloud-native nədir, doğrudan?

**Cloud-native arxitektura** — tətbiqləri buludun imkanlarını maksimum istifadə edəcək şəkildə qurmaq və işlətmək metodologiyasıdır. Sadə dildə: dinamik bulud mühitində səmərəli, miqyaslanan və dözümlü işləyən tətbiqlər qurmaq.

Bunu bir neçə açar xüsusiyyət müəyyən edir:

- **Microservices** — böyük funksionallıq kiçik, zəif-bağlı (loosely coupled) servislərə bölünür. Hər biri müstəqil inkişaf edir, deploy olunur, miqyaslanır.
- **Serverless hesablama** — server idarə etmək dərdi yoxdur, developer yalnız koda və məntiqə fokuslanır. Avtomatik miqyaslanma, resursların səmərəli istifadəsi, aşağı əməliyyat xərci.
- **Elastiklik və miqyaslanma** — sistem cari tələbata görə böyüyür və kiçilir. Boş yerə resurs saxlamırsan.
- **Dözümlülük (resilience)** — sistem *sıradan çıxacağını nəzərə alaraq* qurulur. Redundancy, avtomatik bərpa, fault tolerance mexanizmləri.
- **Avtomatlaşdırma** — deploy, miqyaslanma, monitorinq, bərpa — hamısı əl dəyməsiz. İnsan səhvi azalır.
- **DevOps** — inkişaf və əməliyyat komandaları sıx işləyir. CI/CD, sürətli iterasiyalar.
- **Stateless dizayn** — komponentlər lokal server vəziyyətindən asılı deyil. Bu, horizontal miqyaslanmanı asanlaşdırır.
- **API-first** — servislər arası ünsiyyət aydın, sənədləşdirilmiş API-lərlə gedir.
- **Davamlı monitorinq** — sistem işlədikcə izlənir, data əsasında optimallaşdırılır.

> Buluda köçmək tətbiqi *olduğu kimi* daşımaq demək deyil. Buluda köçmək — onu bulud üçün *yenidən qurmaq* deməkdir.

Bir misalla aydınlaşdıraq. Streaming media servisi düşünün. Cloud-native versiyada autentifikasiya, kontent tövsiyəsi, video kodlaşdırma, data saxlama — hər biri ayrıca microservice-dir və serverless funksiyalara sarılıb. Yeni video yükləndikdə kodlaşdırma funksiyası avtomatik işə düşür; istifadəçi hərəkət edəndə tövsiyə funksiyası reaksiya verir.

Lokal (on-premise) versiyada isə hər şey — autentifikasiya, kontent, video emalı — bir monolitin içindədir, öz serverlərində oturur. Miqyaslanmaq üçün əl ilə server almaq lazımdır.

Bir tələ də var: **vendor lock-in**. AWS-ə xas alətlərlə qurduğun arxitekturanı sonradan başqa provayderə köçürmək çətin ola bilər — servislərin adları da, çağırış üsulları da fərqlidir. Güclü platforma imkanları ilə platformadan asılılıq arasında balansı gözlə.

İndi isə hər pattern-ə ayrıca baxaq. Başlayaq ən çox danışılandan — serverless.

---

## Serverless arxitektura

Ənənəvi ssenaridə tətbiq üçün server lazımdır: əməliyyat sistemi qur, proqramları yüklə, serverin işlədiyinə əmin ol, istifadəçi artdıqca yeni server əlavə et, autoscaling qur... Bu işlərin heç biri əslində sənin biznes məsələnə aid deyil. Sən sadəcə infrastruktura vaxt yandırırsan.

**"Serverless"** o deməkdir ki, kodu yerləşdirmək üçün server haqqında düşünməyə ehtiyac yoxdur. Autoscaling dərdi yox, xərc aşağı, bağlantı zəif. Sən yalnız funksionallığı yazırsan.

AWS-də serverless deyəndə ağla ilk gələn **AWS Lambda** — FaaS (Function as a Service) servisidir. Yanına bir neçə tikinti daşı:

- **Amazon API Gateway** — Lambda funksiyalarının qarşısına RESTful endpoint qoyur, onları microservice kimi təqdim edir.
- **Amazon DynamoDB** — tam serverless, yüksək miqyaslanan NoSQL data anbarı.
- **Amazon S3** — obyektlər üçün serverless saxlama.

### Nümunə: təhlükəsiz sorğu (survey) tətbiqi

AWS-də qurulmuş təhlükəsiz serverless survey tətbiqinin axını belədir:

1. Client HTTPS ilə survey saytına sorğu göndərir. Statik səhifə (bütün client-side AJAX skriptləri ilə) birbaşa **Amazon S3**-dən verilir (web hosting üçün konfiqurasiya olunub).
2. İstifadəçi cavablarını göndərəndə brauzerdən **API Gateway**-ə AJAX çağırışı gedir. Gateway yalnız icazəli çağırışları emal edir.
3. API Gateway **AWS CloudTrail** ilə inteqrasiya olunub — bütün API sorğuları loglanır. Yəni hər survey göndərişi qeydə alınır, audit datası əldə edirsən (itmiş data diaqnostikası, şübhəli aktivlik təhlili üçün faydalı).
4. API Gateway gələn AJAX çağırışını **event**-ə çevirir, bu da **Lambda** funksiyasını işə salır. Funksiya datanı yoxlayır, çevirir, biznes məntiqini tətbiq edir.
5. Emaldan sonra Lambda nəticələri başqa bir **S3** kovuna (bucket) təhlükəsiz göndərir. Nəticələr server tərəfdə şifrələnir.
6. Paralel olaraq, həssas olmayan metadata (zaman ştampları, survey versiyası və s. — şəxsi məlumatsız) **DynamoDB** cədvəlində saxlanır.

Bu arxitekturanı əl ilə qurmaq əvəzinə **AWS SAM (Serverless Application Model)** ilə sadə sintaksislə funksiya, API və baza yarada bilərsən.

### Serverless dizaynında nəyə diqqət etməli

Serverless hər şey üçün ideal deyil. Yaxşı işlədiyi yer — tətbiqi müstəqil miqyaslanan, ayrı-ayrı servislərə bölmək mümkün olan hallar. Əgər layihə bir monolit modulda böyük, mürəkkəb məntiq tələb edirsə, ənənəvi server yanaşması daha uyğun ola bilər.

Bir də məşhur problem var: **cold start** ("soyuq başlanğıc"). İstifadəçiyə infrastruktur serverless görünsə də, provayder arxada dinamik olaraq server ayırır. Funksiya uzun müddət boş qalıbsa, ilk çağırışda bu ayırma vaxt aparır — gecikmə yaranır.

Real misal: sosial şəbəkə üçün real-time bildiriş sistemi. İstifadəçi like, şərh və ya dostluq sorğusu alanda dərhal bildiriş getməlidir. Belə sistemdə diqqət ediləsi kritik amillər:

- **Detallı funksiya strukturu** — məntiqi kiçik, təcrid olunmuş funksiyalara böl. Like, şərh, dostluq sorğusu üçün ayrı funksiyalar.
- **Stateless** — funksiyalar state saxlamamalı. Bütün state kənarda (baza, saxlama servisi) idarə olunmalı. Belə funksiyalar asanlıqla miqyaslanır və dəyişdirilir.
- **Event əsaslı dizayn** — funksiyalar konkret event-lərə (istifadəçi hərəkəti, data dəyişikliyi) reaksiya versin.
- **Cold start** — dedicated concurrency ilə müəyyən sayda funksiya nüsxəsini "isti" saxla ki, gələn sorğuya hazır olsun.
- **Miqyaslanma** — platforma tələbata görə avtomatik miqyaslanır, trafik sıçrayışlarını əl dəyməsiz udur.
- **Performans limitləri** — icra vaxtı və yaddaş məhdudiyyətlərini bil, funksiyanı optimallaşdır.
- **Distributed tracing və monitorinq** — funksiyaların performansını izlə, darboğazları tap.
- **Təhlükəsizlik** — autentifikasiya, avtorizasiya, saxlanan və ötürülən datanın şifrələnməsi.
- **Xərc idarəsi** — serverless-də icra vaxtına görə ödəyirsən, ona görə kodu qısalt. Büdcə siqnalları qur.
- **Data saxlama** — uyğun saxlama variantı seç, funksiya çağırışları arasında data qorunsun.
- **Asılılıqlar** — artıq kitabxanalar deploy paketini şişirdir. Minimuma sal.
- **Test və debug** — lokal emulyatorlardan istifadə et.
- **Managed servislər** — "serverless" hər komponentin funksiya olması demək deyil. Baza, növbə, autentifikasiya üçün managed servislərdən istifadə et.
- **Compliance** — həssas data ilə işləyəndə data qorunma normalarına uyğunluğu təmin et.

Serverless-də stateless dizayn açar rol oynayır. Gəlin ona ayrıca baxaq.

---

## Stateful və stateless: iki fərqli dünya

Bu iki yanaşma "client–server" qarşılıqlı əlaqəsini idarə etməyin iki fərqli yoludur.

**Stateless** arxitektura hər sorğunu ayrıca, müstəqil əməliyyat kimi görür — əvvəlki sorğular haqqında heç nə bilmək lazım deyil. Dizayn sadələşir, miqyaslanma yaxşılaşır, çünki *istənilən* server *istənilən* sorğuya cavab verə bilər.

**Stateful** arxitektura isə client sessiya məlumatını sorğular arası saxlayır. Qarşılıqlı əlaqə daha şəxsi və kontekstli olur, amma bunun bahası var: sessiya datasını idarə etmək mürəkkəbləşir, miqyaslanma problem yaradır, çünki state serverlər arasında sinxron saxlanmalıdır.

Bir e-ticarət saytı düşünün. İstifadəçi məhsulu səbətə atır, sifariş rəsmiləşdirir, çatdırılma seçir, ödəyir — üstəlik cihaz dəyişir (mobildə səbətə atır, noutbukda ödəyir). Bu axını saxlamaq üçün istifadəçi sessiyasını idarə etmək lazımdır. Həlli: sessiya məlumatını serverdə yox, baza səviyyəsində (məsələn NoSQL bazada) saxlamaq.

### Stateful arxitektura

Stateful tətbiqdə state-i server idarə edir. İstifadəçi konkret serverə qoşulanda tranzaksiya bitənə qədər həmin serverlə işləməlidir. Qarşısına load balancer qoya bilərsən, amma **sticky session** (yapışqan sessiya) aktivləşdirmək lazımdır.

Sticky session — istifadəçinin bütün sorğularını ilk sorğunu emal etmiş serverə yönləndirən üsuldur. Load balancer adi round-robin paylanmasından uzaqlaşıb sorğuları həmin serverə göndərir. Uzun sessiyaları saxlayır, amma problem var: bir server həddindən artıq yüklənə bilər. Buna görə sessiya timeout mexanizmi vacibdir.

Problem odur ki, stateful tətbiq horizontal miqyaslanmanı yaxşı dəstəkləmir — state əvəzedilməz serverdə ilişib qalır. Kiçik baza üçün əla işləyir, amma milyonlarla aktiv istifadəçi olanda darboğaza çevrilir.

### Stateless arxitektura

Stateless yanaşmada dizayn ümumi (shared) sessiya state-inə fokuslanır ki, horizontal miqyaslanma mümkün olsun.

AWS-də tipik stateless web tətbiq arxitekturası belədir: iki availability zone arasında yüksək əlçatanlıqlı, üç-səviyyəli (three-tier) mühit.

- **Elastic Load Balancer** trafiki iki EC2 klasteri arasında paylayır; **Auto Scaling** onları tələbata görə dinamik miqyaslayır.
- Baza səviyyəsi **Amazon RDS** üzərindədir — sorğuları miqyaslamaq üçün read replica, nasazlıq üçün standby nüsxə.
- Statik kontent **S3**-dən verilir, **CloudFront** ilə çatdırılır, **Route 53** DNS idarə edir.
- Bütün istifadəçi sessiyaları **DynamoDB** kimi NoSQL bazada saxlanır.

Sessiya identifikatoru üçün client tərəfdə saxlamadan (məsələn cookie) istifadə olunur. Belə arxitekturada yeni server əlavə edib horizontal miqyaslanırsan, state itkisindən qorxmadan. Server tərəfdə yaddaş xərci azalır, sessiya timeout problemi aradan qalxır.

Bahası isə bir az əlavə mürəkkəblikdir: sessiya üçün əlavə baza komponentləri, state-i serverlər arası ötürən köməkçi səviyyə. Amma düzgün qurulanda nəticə əladır.

Bir xəbərdarlıq: sessiya datası bir data anbarından xidmət olunduğu üçün, həmin anbarın performansı sistemin darboğazına çevrilməsin — diqqətli ol.

---

## Microservices: böyüyü kiçiklərə bölmək

Cloud-native-də microservices böyük funksionallığı kiçik, idarəolunan, müstəqil miqyaslanan bloklara bölür. Bir komponenti miqyaslamaq üçün bütün sistemi əlləmək lazım gəlmir. Sistem *fault-tolerant* qurulur — sıradan çıxmanı nəzərə alır, nasazlığı bütün sistemə yaymır.

Aşkar üstünlük: hər servis az kod saxlayır və müstəqildir. Xarici asılılıq minimuma enir, bağlantı zəifləyir.

Digər əsas konsept — **bounded context** (məhdudlaşdırılmış kontekst). Bu, biznes sahəsini formalaşdıran bloklardır. E-ticarət platformasında məsələn:

- **İstifadəçi hesabları konteksti** — qeydiyyat, profil idarəsi, giriş, autentifikasiya. Başqa heç bir microservice bu əməliyyatları idarə etmir.
- **Məhsul kataloqu konteksti** — məhsul siyahısı, kateqoriyalar, təsvirlər. İstifadəçi hesablarından tam müstəqil.
- **Sifariş emalı konteksti** — sifariş, izləmə, ödəniş. Kataloqdan (məhsul ID, qiymət) və istifadəçi kontekstindən (müştəri məlumatı) data alır, amma öz əməliyyatlarını (sifariş statusu, qaytarma) özü idarə edir.

Hər bounded context öz məntiqi və bazası olan avtonom sistemdir, digərləri ilə aydın API-lər vasitəsilə əlaqə qurur. Bir kontekstdə dəyişiklik (məsələn yeni ödəniş üsulu) digərlərinə təsir etmir.

### Microservices üçün best practice

- **Ayrı data anbarı** — hər komanda öz servisinə ən uyğun bazanı seçsin. Trafik komandası miqyaslanan NoSQL, sifariş komandası tranzaksiya bütövlüyü üçün relational baza. Zəif bağlantı təmin olunur.
- **Stateless serverlər** — state serverdə saxlanmırsa, miqyaslanma və server dəyişdirilməsi asanlaşır.
- **Ayrı build** — hər microservice üçün ayrı build; komanda yalnız öz servisinin kodunu yazır, başqasına təsir etmir.
- **Konteynerdə deploy** — bütün komponentləri eyni standart üsulla deploy et. İnfrastruktur dərdi olmadan konteyner idarəsi üçün **Amazon Fargate** kimi serverless servislər.
- **Serverless yanaşma** — sadə microservice-lər üçün AWS Lambda kimi platformalar infrastruktur yükünü aradan qaldırır.
- **Blue-green deployment** — işlək mühitin kopyasını yarat, yeni funksionallığı orada aç, trafikin kiçik faizini yönləndir, hər şey qaydasındadırsa trafiki artır.
- **Mühitin monitorinqi** — yaxşı monitorinq nasazlığa reaksiyadan, onun qarşısını almağa keçid verir. Servislər öz sağlamlıq məlumatını monitorinq səviyyəsinə göndərsin. Axı servisin statusunu servisin özündən yaxşı kim bilir?

### Nümunə: real-time səsvermə tətbiqi

Microservice + serverless birlikdə. İstifadəçi mobil cihazdan səs verir, tətbiq hər səsi qeydə alıb DynamoDB-də saxlayır. Axın:

1. İstifadəçi səsini SMS ilə üçüncü tərəfin (məsələn Twilio) nömrəsinə göndərir.
2. Üçüncü tərəf mesaj məzmununu **API Gateway** endpoint-inə göndərir, o da **Lambda**-ya ötürür.
3. Funksiya səsi çıxarıb metadata ilə birlikdə **DynamoDB** cədvəlinə yazır.
4. Cədvəldə **DynamoDB Streams** aktivdir — dəyişiklikləri izləyir.
5. Stream ikinci **Lambda**-ya siqnal verir; o, səsləri (hər saniyə) aqreqasiya edib başqa DynamoDB cədvəlinə yazır. İkinci cədvəldə yalnız kateqoriya üzrə cəmi saxlanır.
6. **HTML + JavaScript** dashboard **S3**-də statik sayt kimi yerləşir, AWS JavaScript SDK ilə xülasə cədvəlini sorğulayıb nəticələri real-time göstərir.
7. **Route 53** DNS provayder kimi domeni S3 kovuna yönləndirir.

Microservice-lərin faydası: dəyişikliyin xərci, ölçüsü və riski azalır, dəyişiklik sürəti artır.

Amma paylanmış sistemdə çoxlu servisin əlaqələndirilməsi problem yaradır. Bunun üçün bir neçə pattern var — gəlin başlayaq Saga-dan.

---

## Saga pattern: uzun tranzaksiyaların dirijoru

**Saga** — uzun, mürəkkəb biznes tranzaksiyalarını idarə etmək üçün pattern-dir. Bir biznes əməliyyatına bir neçə microservice qoşulanda əla işləyir.

Ənənəvi ikifazalı commit əvəzinə Saga tranzaksiyanı bir neçə kiçik, təcrid olunmuş tranzaksiyaya bölür. Hər biri ayrı servisdə emal olunur, əlaqələndirilir. Biri uğursuz olarsa, **kompensasiya tranzaksiyaları** əvvəlki addımları geri qaytarır.

İş prinsipi:

- **Dekompozisiya** — əməliyyat kiçik addımlara bölünür, hər addım konkret microservice-in işidir.
- **Kompensasiya hərəkətləri** — hər addım üçün geri-qaytarma hərəkəti təyin olunur. Addım uğursuz olarsa, sistem ardıcıl vəziyyətə qaytarılır.
- **Koordinator** — ardıcıllığı orkestrləşdirir, gedişatı izləyir, lazımda kompensasiyanı işə salır.
- **Lokal tranzaksiyalar** — hər addım öz microservice-ində lokal tranzaksiyaya sarılır (atomarlıq).
- **Eventual consistency** (nəticədə ardıcıllıq) — sistem dərhal yox, zamanla ardıcıl vəziyyətə gəlir.

### Nümunə: e-ticarət sifarişi

Servislər event yaradıb dinləyir:

1. **Sifariş servisi** sifariş yaratma sorğusu alır.
2. Sifarişi "emalda" statusunda yaradıb `OrderCreated` event-ini yayımlayır.
3. **Ödəniş servisi** `OrderCreated`-i dinləyir, ödənişi emal edir, `PaymentProcessed` yayımlayır.
4. **Anbar servisi** `PaymentProcessed`-i dinləyir, məhsulu yoxlayıb rezerv edir, `StockReserved` yayımlayır.
5. **Çatdırılma servisi** `StockReserved`-i dinləyir, çatdırılmanı planlayır, `ShipmentScheduled` yayımlayır.
6. **Sifariş servisi** `ShipmentScheduled`-i dinləyir, sifarişi "tamamlandı" statusuna keçirir.

Əgər hansısa servis işini bitirə bilmirsə, kompensasiya event-i yayımlayır. Məsələn anbar kifayət deyilsə, `StockInsufficient` yayımlanır — ödəniş servisi bunu dinləyib ödənişi geri qaytarır, sifariş servisi sifarişi "ləğv olundu" statusuna keçirir.

Saga eventual consistency gətirir — vəziyyət zamanla ardıcıllaşır, dərhal yox. Reallaşdırması mürəkkəbdir: nasazlıq ssenarilərini idarə etmək, kompensasiyaların düzgün geri qaytardığından əmin olmaq lazımdır. Amma paylanmış sistemdə data bütövlüyünü qorumaq üçün güclü strategiyadır.

Bəs data çoxlu microservice-dən emal olunub, sonra vahid analitikaya konsolidasiya olunmalıdırsa? Onda Fan-out/Fan-in köməyə gəlir.

---

## Fan-out/Fan-in: yaymaq və toplamaq

**Fan-out/Fan-in** (Şaxələnmə/Birləşmə) paylanmış sistemdə bir neçə mənbədən datanı səmərəli emal edib aqreqasiya etmək üçün istifadə olunur. Adı da buradan gəlir: data bir neçə mənbəyə *yayılır* (fan-out), sonra aqreqasiya üçün *birləşir* (fan-in).

Sosial şəbəkə üçün real-time analitika sistemi düşünün:

- **Fan-out fazası** — data müxtəlif mənbələrdən (microservice, API, data axını) yığılır. Post, şərh, like, izləyicilər real-time data axını yaradır. Hər mənbə ayrı emal komponentinə göndərir, hamısı *paralel və müstəqil* işləyir. Hər aktivlik növünün öz emalçısı var: engagement əmsalı, populyar kontent, trend mövzular.
- **Fan-in fazası** — ayrı emaldan sonra bütün nəticələr aqreqasiya olunur (məsələn platformanın ümumi engagement metrikaları). Nəticə dashboard-da real-time göstərilir.

### Üstünlüklər

- **Paralellik** — data yığımı və aqreqasiyası sürətlənir.
- **Səmərəlilik** — ardıcıl əvəzinə eyni vaxtda emal.
- **Miqyaslanma** — hər mənbə müstəqil emal olunur, mənbə sayı artdıqca sistem asan miqyaslanır.
- **Modulluq** — yığım fazası aqreqasiyadan ayrılır, obslujivaniye asanlaşır.

Amma bahası da var: paralel tapşırıqları əlaqələndirmək və aqreqasiya etmək mürəkkəbdir; xəta idarəsi çətinləşir (bütün şaxələrdə nasazlıq nəzərə alınmalı); resurs tələbkardır; aqreqasiya fazası özü darboğaz ola bilər; yalnız eventual consistency verir (real-time tələb edən tətbiqlər üçün problem); debug və monitorinq çətindir. Diqqətli dizaynla yenə də güclü strategiyadır.

Microservice sayı artdıqca əlaqələndirmə daha da çətinləşir. Burada Service mesh köməyə gəlir.

---

## Service mesh: microservices üçün yol polisi

Təsəvvür et: sıx yol ayrıcı, bir neçə zolaq. Hər maşın bir microservice-dir. Qəza olmasın deyə svetofor, yol nişanları, hərəkət qaydaları lazımdır. **Service mesh** microservices üçün elə həmin "yol polisidir" — qarşılıqlı əlaqəni idarə edir, harmonik iş təmin edir.

Texniki dildə: service mesh — bulud tətbiqində servislər arası əlaqəni idarə edən infrastruktur səviyyəsidir. Mesajların etibarlı çatdırılmasını təmin edir. Developer əsas tətbiqə fokuslanır, mesh isə şəbəkə ötürməsi və təhlükəsizliyi öz üzərinə götürür.

### AWS App Mesh nümunəsi (addım-addım)

1. **EC2 Servis A** — Amazon EC2 nüsxəsində işləyən servis.
2. Servis A, Servis B-yə çağırış edir.
3. **Kommunikasiya səviyyəsi** — Servis A-nın sorğusu mesh üzərindən marşrutlaşdırmaq üçün tutulur.
4. Sorğu **AWS App Mesh**-dən keçir — tətbiq səviyyəli şəbəkə əlaqəsi verən service mesh.
5. App Mesh sorğunu Servis B-yə marşrutlaşdırır.
6. **ECS Servis B** — Amazon ECS (Elastic Container Service) tapşırığı, Docker konteynerləri.
7. Servis B işini bitirib Servis C-yə çağırır.
8. App Mesh çağırışı Servis C-yə marşrutlaşdırır.
9. **Lambda Servis C** — AWS Lambda funksiyası.

### Service mesh nə verir

- **Trafik idarəsi** — detallı marşrutlaşdırma qaydaları, retry, fault handling, fault injection.
- **Observability** — vizualizasiya, tracing, monitorinq, trafik logları.
- **Təhlükəsizlik** — servislər arası avtomatik qarşılıqlı TLS (mTLS) şifrələməsi.
- **Siyasət (policy)** — bütün servislər üçün vahid siyasətlər.
- **Dözümlülük** — genişlənmiş load balancing, timeout, retry.

Populyar reallaşdırma üsulu — **sidecar proxy**. Hər servis nüsxəsinə köməkçi proxy əlavə olunur, bütün şəbəkə əlaqəsini o idarə edir. Bu proxy-lər bir-birinə bağlanıb "mesh" (tor) yaradır — adı buradan gəlir.

Məşhur reallaşdırmalar:

- **Istio** — geniş imkanlı, detallı marşrutlaşdırma və siyasət, dözümlülük pattern-ləri, analitika.
- **Linkerd** — sadəlik və performans, açıq mənbə, yüngül, minimal iz.
- **AWS App Mesh** — AWS istifadəçiləri üçün managed servis.
- **Consul Connect** (HashiCorp) — avtomatik TLS və identity-əsaslı avtorizasiya, platformadan asılı olmayan.

> Service mesh güclüdür, amma pulsuz deyil — infrastruktura mürəkkəblik və əməliyyat xərci gətirir. Qərar verməzdən əvvəl faydanı əlavə mürəkkəbliklə müqayisə et.

Nasazlıqdan bərpa böyük sistemlərin əsas şərtidir. Bunun üçün reaktiv arxitekturaya baxaq.

---

## Reaktiv arxitektura

Bulud arxitekturasında çoxlu microservice və kiçik modul olduğu üçün "hərəkət edən hissələr" çoxdur — onları nasazlıqdan qorumaq lazımdır. **Reaktiv arxitektura** dəyişikliklərlə səmərəli baş edən və müxtəlif şəraitdə responsive qalan sistemlər qurmaq üçün metoddur.

Prinsiplər [Reactive Manifesto](https://www.reactivemanifesto.org/)-ya əsaslanır:

- **Responsiveness** — sistemin yükündən asılı olmayaraq istifadəçi sorğusuna sürətli reaksiya.
- **Resilience** (dözümlülük) — nasazlığı yumşaq idarə edir, komponentlərdən bəziləri sıradan çıxsa da işləyir.
- **Elasticity** — tələbata görə miqyaslanır.
- **Message-driven** — komponentlər asinxron mesajlarla əlaqə qurur, bu da zəif bağlantı və təcrid verir.

Reaktiv arxitektura microservice-lərə güclü söykənir. Kommunikasiya event-driven-dir. Data idarəsi mərkəzsizdir — hər microservice öz datasını idarə edir. İzolyasiya və avtonomluq mərkəzdədir. Miqyaslanma horizontaldır. Circuit breaker, timeout, retry kimi dözümlülük pattern-ləri tətbiq olunur.

### Nümunə: oyun platforması

Minlərlə oyunçu eyni vaxtda virtual dünyalarla əlaqədə:

- **Responsiveness** — oyunçu hərəkətlərinə (personaj hərəkəti, sehr, obyektlə əlaqə) real-time reaksiya.
- **Resilience** — server düşərsə, yük avtomatik sağlam serverlərə yönlənir, oyun davam edir.
- **Elasticity** — pik dövrdə əlavə server resursu ayrılır, oyunçu azalanda artıq resurs buraxılır.
- **Message-driven** — oyunçu hərəkətləri mesajlarla ötürülür, asinxron kommunikasiya darboğazları minimuma salır.

### Necə reallaşdırmalı

- Komponentləri message queue ilə asinxron əlaqə üçün dizayn et.
- **Actor model** tətbiq et — komponentlər (aktorlar) mesajlarla əlaqə qurur, hər aktor mesajları ardıcıl emal edir (concurrency problemi olmur).
- Dözümlülük pattern-ləri (**Circuit Breaker**, **Bulkhead**) əlavə et — kaskad xətaların qarşısını al.
- Autoscaling ilə dinamik resurs ayrılması.
- Reaktiv kitabxanalar/freymvorklar: **Akka**, **Spring WebFlux**, **ReactiveX**.

### AWS nümunəsi: reklam trekingi (ad-tech)

İstifadəçi reklama baxıb və ya klikləyəndə:

- **Application Load Balancer** sorğunu tutub əsas tətbiqdəki uyğun servisə yönləndirir.
- Tətbiq hər sorğunu müstəqil, dərhal bazaya yazmadan emal edir.
- **Amazon Kinesis Data Streams** event-ləri yığır, **Lambda** məlumatı **DynamoDB** cədvəlinə yazır. Kinesis burada "qoruyucu vasitəçi" rolunu oynayır — yüksək trafikdə data itmir.
- Kritik dataya sürətli çıxış üçün **ElastiCache for Redis** birincil keş kimi işləyir. Əsas data yeniləmələri mesajlaşma arxitekturası ilə sinxronlaşdırılır.

Bu servislər responsiveness, resilience, elasticity, message-driven prinsiplərinə tam uyğun gəlir.

Zəif bağlantı asan miqyaslanan sistemlərin açarıdır — burada message queue-lar vacibdir. Növbə əsaslı arxitekturaya baxaq.

---

## Növbə (queue) əsaslı arxitektura

Əvvəldə RESTful microservice dizaynını gördük. RESTful servis aşkarlanmasını asanlaşdırır, amma servis düşərsə nə olur? RESTful modeldə client servis əsas servisdən cavab gözləyir — HTTP sorğusu API-ni bloklayır. Bəzən aşağıdakı servis əlçatan olmadığı üçün məlumat itə bilər. Bunun üçün retry məntiqi yazmaq lazımdır.

**Növbə əsaslı arxitektura** bu problemi servislər arasına message queue əlavə edərək həll edir. Mesajlar məlumatı servislərin adından saxlayır. Tam asinxron, zəif bağlı. Server düşsə də, mesaj servis əlçatan olan kimi emal olunur.

Terminologiya:

- **Mesaj** — başlıq (metadata) + gövdə (əsl məzmun).
- **Növbə (queue)** — mesajları saxlayır.
- **Producer** — mesaj yaradıb növbəyə yerləşdirən servis.
- **Consumer** — mesajları istehlak edən servis.
- **Message broker** — mesajları yığıb marşrutlaşdıran, paylayan vasitəçi.

### Queuing Chain pattern (Növbələr zənciri)

Ardıcıl emal bir neçə bağlı sistemdə getməli olanda işlədilir. Şəkil emalı pipeline-ı düşünün: şəkli tut → serverdə saxla → müxtəlif rezolyusiyada kopyalar yarat → su nişanı vur → miniatür yarat. Bir hissədə nasazlıq bütün əməliyyatı poza bilər.

Sistemlər arasına növbə qoyaraq single point of failure aradan qalxır, əsl zəif-bağlı sistem alınır. AWS-də bu növbə **Amazon SQS** (Simple Queue Service) adlanır.

Axın:

1. Emal olunmamış şəkil serverə yüklənir. Bir dəstə **EC2** serveri batch job işlədib su nişanı vurur, emal olunmuş şəkli **SQS** növbəsinə qoyur.
2. İkinci EC2 dəstəsi su nişanlı şəkilləri SQS-dən götürür.
3. Onları emal edib müxtəlif rezolyusiyalı variantlar yaradır.
4. Kodlaşdırmadan sonra başqa **SQS** növbəsinə miniatür yaratmaq üçün mesaj göndərir.
5. Emaldan sonra job mesajı əvvəlki növbədən silir (yer boşaltmaq üçün).
6. Sonuncu EC2 dəstəsi kodlaşmış mesajları alıb miniatür və müəllif hüququ nişanları yaradır.

Üstünlüklər:

- Zəif-bağlı asinxron emal — başqa servisdən təsdiq gözləmədən sürətli cavab.
- SQS ilə EC2 nüsxələri/konteynerləri zəif bağlanır.
- EC2 nüsxəsi düşsə də mesaj növbədə qalır — data bütövlüyü qorunur, server bərpa olanda emal davam edir.

Bəs iş yükündə kəskin sıçrayışlar olanda? Job Observer köməyə gəlir.

### Job Observer pattern (Tapşırıq müşahidəçisi)

Sorğu sayı dəyişəndə hesablama gücünü tələbata görə tənzimləmək lazımdır. Job Observer-də növbədə gözləyən mesaj sayına əsasən autoscaling qrupu yaradırsan.

Sxem: sol tərəfdəki birinci EC2 dəstəsi batch job işlədib mesajları növbəyə qoyur. Sağdakı ikinci dəstə onları istehlak edir (məsələn şəkil kodlaşdırma). Mesaj sayı müəyyən həddə çatanda **Amazon CloudWatch** autoscaling-i işə salır — consumer dəstəsinə əlavə server qoşur. Növbə həddən aşağı düşəndə isə artıq serverləri silir.

Hesablama tapşırığın ölçüsünə görə miqyaslanır — səmərəli və qənaətli. Server düşsə də emal kəsilmir.

Növbə arxitekturası əsasən asinxron **pull** metodu ilə işləyir — consumer mesajları görünən kimi çəkir. Bəzən isə bir event digər event-ləri işə salmalıdır. Bunun üçün Pipes-and-Filters-ə baxaq.

---

## Pipes-and-Filters (Kanallar və filtrlər)

Bu pattern mürəkkəb tapşırığı bir sıra mərhələyə — kiçik, müstəqil emal addımlarına bölür. Hər mərhələ giriş datası üzərində əməliyyat aparır, çevrilmiş datanı **kanal (pipe)** vasitəsilə növbətiyə ötürür. Mərhələlər **filtr (filter)** adlanır.

- **Filtrlər** — data üzərində konkret əməliyyat aparan bloklar. Giriş oxuyur, emal edir, çıxış verir. Hər biri müstəqil işləyir, ayrıca test olunur.
- **Kanallar** — filtrlər arası data ötürən əlaqələr. Sadə data axını və ya buferləşdirmə/sinxronizasiya olan message queue.

Əsas üstünlük — məsuliyyət bölgüsü və modulluq. Filtrlər təkrar istifadə olunur, kompozisiya edilir, ardıcıl emal və miqyaslanma verir. Filtrləri yerlərini dəyişməklə mürəkkəb emal zəncirləri qurmaq olar.

### Nümunə: mətn emalı pipeline-ı

Mətn faylını oxuyub stop-word-ları silir, stemming edir, hər sözün sayını hesablayır:

1. **Filtr 1 — fayl oxu:** mətn faylını oxuyub sətirlər verir.
2. **Filtr 2 — bölmə:** sətirləri ayrı sözlərə bölür.
3. **Filtr 3 — stop-word silmə:** "and", "the", "is" kimi xidməti sözləri atır.
4. **Filtr 4 — stemming:** sözü kökünə endirir ("walking" → "walk").
5. **Filtr 5 — söz sayı:** hər sözün təkrar sayını hesablayır.

Filtrlər kanallarla bağlanır, pipeline datanı addım-addım emal edib söz tezliyini çıxarır.

İndi isə event-driven arxitekturaya keçək — proqram icrasının ardıcıllığını event-lər (istifadəçi hərəkəti, digər proqramların mesajları) müəyyən edir.

---

## Event-Driven Architecture (EDA)

EDA cloud-native mühitdə tətbiq olunanda sistemin real-time dataya və event-lərə reaksiya qabiliyyətini artırır. Bulud dinamik resurs ayrılması ilə dəyişkən yükü udur, EDA isə sürətli, reaktiv emal mexanizmi verir.

EDA funksional axını tamamlamaq üçün **event zənciri** qurur. Məsələn: e-ticarətdə ödəniş edirsən, dərhal çek yaranır və emailə gəlir. Ödəniş event-i başqa tapşırığı işə salır. Çox vaxt message queue-lar EDA-nın mərkəzində durur. İki əsas model var.

### Publisher/Subscriber (pub/sub)

Event yayımlananda *bütün* abunəçilərə bildiriş gedir, hər abunəçi öz tələbatına uyğun hərəkət edir.

Nümunə — fotoya filtr tətbiq edib istifadəçiyə bildirən foto emalı tətbiqi:

1. İstifadəçi fotonu web/mobil tətbiqdən **S3** kovuna göndərir.
2. S3 **Amazon SNS** (Simple Notification Service)-ə bildiriş göndərir. SNS bir neçə abunəçili topic təqdim edir:
   - **Birinci abunəçi** email servisi — yükləmə bitən kimi istifadəçiyə email gedir.
   - **İkinci abunəçi** **SQS** növbəsi — SNS topic-dən mesaj alıb **Lambda** kodunda filtrlər tətbiq edir (şəkil keyfiyyətini artırır).
   - **Üçüncü abunəçi** **Lambda** funksiyası — miniatür yaradır.

Burada S3 producer kimi SNS topic-ə mesaj yayımlayır, bir neçə abunəçi istehlak edir. SQS-ə mesaj gələn kimi şəkil emalı Lambda-sı üçün event işə düşür.

### Event Stream (Event axını)

Bu modeldə consumer producer-dən *davamlı* event axınını oxuyur. Məsələn, gəzinti (clickstream) tarixçəsi axınını tutmaq və anomaliya aşkarlananda xəbərdarlıq göndərmək:

- Müxtəlif istifadəçilərin klikləri e-ticarət tətbiqlərində event axını yaradır.
- Gəzinti event-ləri **API Gateway** vasitəsilə analitika tətbiqinə göndərilir.
- **Amazon Kinesis Data Analytics** konversiya göstəricilərini hesablayır (məsələn son 5 dəqiqədə neçə nəfər alış etdi). Real-time aqreqasiyadan sonra nəticələri **Kinesis Data Firehose**-a göndərir, o da faylları **S3**-də saxlayır.
- **Lambda** axından datanı oxuyub anomaliya yoxlayır. Konversiya metrikalarında anomaliya tapılarsa, reklam şöbəsinə email xəbərdarlığı göndərir.

> EDA-da producer və consumer müstəqil işləyir, event-lər ünsiyyət mühitidir. Producer kimin emal edəcəyini bilmir, consumer kimin yaratdığını bilmir. Bu, çevik, genişlənən sistem verir — mövcud producer-ləri dəyişmədən yeni consumer əlavə edə bilərsən.

Amma EDA öz problemlərini gətirir:

- **Təkrar emalın qarşısı** — bir event şəbəkə retry-ları və ya servis nasazlığı ucbatından bir neçə dəfə çatdırıla bilər. Consumer-lərdə **idempotency** təmin et ki, təkrar emal yanlış davranışa səbəb olmasın.
- **Xəta mesajlarının idarəsi** — **dead-letter queue** (emal olunmayan event-lər sonrakı analiz/retry üçün saxlanır) və consumer-lərdə xəta məntiqi.
- **Event sıralaması** — düzgün sıra vacib ola bilər; sıralama pattern-ləri və ya event sourcing.
- **İzləmə və monitorinq** — sistem böyüdükcə event axınını izlə, logging/tracing/alerting qur.
- **Event schema idarəsi** — sxemlər dəyişəndə schema registry və versiyalaşdırma strategiyası ilə uyğunluğu qoru.

Modulluğu bütün səviyyələrdə təmin etmək üçün son pattern-ə — BFF-ə baxaq.

---

## BFF (Backend for Frontend)

**BFF** — backend servislərini hər konkret frontend növünə uyğunlaşdıran cloud-native pattern-dir. Müasir mobil və web tətbiqlərin artan mürəkkəbliyinə cavab olaraq yarandı: hər frontend üçün ayrı, uyğunlaşdırılmış backend servisi qurulur.

Əsas xüsusiyyətlər:

- **Uyğunlaşdırılmış API-lər** — hər frontend (web, mobil, smart-TV) öz BFF-inə malikdir. BFF yalnız həmin frontend-ə lazım olan datanı, uyğun formatda verir. Frontend-də data çevirmə ehtiyacı azalır.
- **Frontend inkişafının sadələşməsi** — BFF-i frontend-lə eyni dildə yazmaq olar, developer-lər backend-i asan başa düşür və dəyişir.
- **Mürəkkəbliyin delegasiyası** — autentifikasiya, data aqreqasiyası, xəta idarəsi kimi işləri frontend əvəzinə BFF görür.
- **Müstəqil inkişaf** — hər BFF müstəqil təkamül edir, biri dəyişəndə digərinə təsir etmir. BFF frontend ilə əsas backend arasında adapter kimi işləyir.

E-ticarət nümunəsi:

- **Web BFF** — detallı məhsul təsviri, rəylər, tövsiyələr. Bir neçə backend servisindən (məhsul, profil, tövsiyə sistemi) data aqreqasiya edir, brauzer üçün formatlaşdırır.
- **Mobil BFF** — sadələşdirilmiş təsvirlər, kiçik ekranlar üçün şəkil miqyaslama, mobil üçün optimallaşdırma.
- **Smart-TV BFF** — böyük ekran üçün uyğunlaşdırılmış data, sadələşdirilmiş naviqasiya.

Hər frontend üçün ayrı BFF ilə e-ticarət tətbiqi hər platformada optimallaşdırılmış təcrübə verir, eyni zamanda frontend inkişafını sadələşdirir və backend mürəkkəbliyini azaldır.

---

## Antipattern-lər: nədən qaçmalı

Pattern-ləri gördük. İndi **antipattern-lərə** baxaq — ilk baxışda faydalı görünən, amma adətən özünü doğrultmayan, hətta zərər verən metodlar.

- **Single point of failure** — bir komponentin nasazlığı bütün sistemi dayandırır. Backup/replikasiyasız tək baza nüsxəsi buna misaldır. Həll: redundancy + avtomatik failover.
- **Əl ilə miqyaslanma** — resursu əl ilə artırıb-azaltmaq yavaş, etibarsız, səmərəsizdir. Popular tədbir zamanı streaming servisi pik yükə əl ilə çatmaya bilər. Həll: serverless + autoscaling.
- **Sıx-bağlı servislər** — microservice-lər zəif bağlı olmalıdır. Ödəniş və çatdırılma servisləri sıx bağlıdırsa, birindəki dəyişiklik digərini pozar. Həll: aydın sərhədlər və API-lər.
- **Təhlükəsizlik best practice-lərini görməzdən gəlmək** — parolları açıq mətn saxlayan tətbiq hakerə açıqdır. Həll: hashing, salt, düzgün təhlükəsizlik tədbirləri.
- **Monitorinq/logging olmaması** — problem diaqnostikası, performans optimallaşdırması üçün vacibdir. Detallı monitorinq şəbəkə gecikməsini, resurs limitini, tətbiq xətalarını üzə çıxarır.
- **Şəbəkə gecikməsini görməzdən gəlmək** — paylanmış sistemdə servislər arası gecikmə istifadəçi təcrübəsini yavaşladır. Həll: keşləmə, data replikasiyası, asinxron əlaqə.
- **Kifayət qədər test etməmək** — unit, inteqrasiya və end-to-end testlər data itkisinin/pozulmasının qarşısını alır.
- **Həddindən artıq optimallaşdırma** — vaxtından əvvəl, ifrat optimallaşdırma kodu mürəkkəbləşdirir, obslujivaniyəni çətinləşdirir.
- **Xərcləri görməzdən gəlmək** — dəyişkən yüklü tətbiq üçün böyük nüsxələri 24/7 işlətmək bahadır. Həll: autoscaling + serverless.

---

## Sona qədər

Uzun yol keçdik. Gəlin kontrastı bir də vuraq:

**Əvvəl** — köhnə monolit, öz serverində oturur, əl ilə miqyaslanır, bir hissə düşəndə hamısı düşür, buludu sadəcə icarə server kimi işlədir.

**Sonra** — kiçik, müstəqil microservice-lər; serverless funksiyalar; stateless dizayn; Saga ilə əlaqələndirilən tranzaksiyalar; Service mesh ilə idarə olunan trafik; event-lərlə bağlanan reaktiv, dözümlü sistem; hər frontend üçün uyğun BFF. Tələbata görə böyüyür-kiçilir, nasazlıqdan özü bərpa olur, yalnız işlətdiyin qədər ödəyirsən.

Fərq gecə-gündüzdür. Amma sehr yoxdur — hər pattern konkret problemi həll edir və özü ilə mürəkkəblik gətirir. Ustalıq da elə budur: hansı pattern-i harada işlətməyi bilmək, faydanı əlavə mürəkkəbliklə düzgün müqayisə etmək.

Bəs sizin sistemlərinizdə hansı pattern ən çox işə yarayıb — yoxsa hələ də buludu "icarə server" kimi işlədirsiniz?
