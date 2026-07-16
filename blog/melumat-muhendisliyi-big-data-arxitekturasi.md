# Məlumatlarınız sizə nə deyir? Big Data arxitekturasına dürüst bir baxış

Bu yazıda gəlin bir az fərqli danışaq. Adətən "böyük məlumat" (Big Data) deyəndə hamının ağlına dağ boyda serverlər, mürəkkəb diaqramlar və başa düşülməsi çətin sözlər gəlir. Amma əslində məsələ çox sadədir: hər gün, hər saniyə ətrafımızda nəhəng həcmdə məlumat yaranır — və bu məlumatların içində biznesi irəli aparacaq cavablar gizlənib. Sual isə budur: bu cavabları necə, nə qədər tez və nə qədər ucuza çıxarmaq olar?

Əvvəlki mövzularda DevOps-dan danışmışdıq — kodun avtomatik olaraq necə deploy edildiyindən, komandaların bir yerdə necə işlədiyindən. İndi isə sıra məlumat mühəndisliyinə (data engineering) gəlib. Yəni tətbiqin müxtəlif yerlərindən məlumat toplamaq, saxlamaq, emal etmək və sonda ondan mənalı nəticələr çıxarmaq sənətinə.

> Big Data məlumatı sadəcə yığmaq deyil. Əsl dəyər — o məlumatdan çıxarılan, rəqiblərdən bir addım öndə saxlayan nəticələrdədir.

Gəlin başdan başlayaq.

---

## Niyə bu qədər çətindir?

İnternet və rəqəmsal dövr hər yerdə inanılmaz sürətlə məlumat istehsal edir. Bu məlumatdan tez və faydalı nəticə çıxarmaq isə asan iş deyil. Buludun (cloud) populyarlaşması tətbiqləri cloud platformalarına köçürməyi asanlaşdırdı, amma məlumatın özünü idarə etmək get-gedə çətinləşdi.

Məlumat üç istiqamətdə böyüyür — bunlara adətən **3V** deyirlər:

- **Volume (həcm)** — nə qədər çox məlumat var;
- **Velocity (sürət)** — məlumat nə qədər tez gəlir;
- **Variety (müxtəliflik)** — məlumat neçə fərqli formada gəlir.

Kompüterlərin özləri belə fərqli-fərqli məlumat istehsal edir. Nümunə üçün ən çox rast gəlinən mənbələr:

- **Tətbiq server logları** — proqramların və oyunların jurnalları;
- **Ziyarət logları (clickstream)** — saytdakı aktivlik, baxış tarixçəsi;
- **Sensor məlumatları** — hava, su, külək enerjisi, ağıllı şəbəkələr;
- **Qrafika və video** — küçə hərəkəti və təhlükəsizlik kameraları.

Bir tərəfdən kompüterin yaratdığı məlumat (loglar, ikili fayllar), o biri tərəfdən insanın yaratdığı məlumat var — e-poçt axtarışları, təbii dildə sorğular, tonallıq analizi (sentiment analysis), məhsul tövsiyələri. Məsələn, sosial qraf analizi sizin dostlar dairənizə, maraq dairənizə əsasən məhsul təklif edə bilər.

Amma bir çox komanda burada ilişib qalır. Ən tez-tez rast gəlinən maneələr:

- **İstifadəçi təcrübəsi haqqında məhdud məlumat** — məlumat toplamaq bahalı və mürəkkəb olduğundan şirkətlər nə qədər məlumat topladıqlarını məhdudlaşdırmağa məcbur olurlar;
- **Qərarların tez qəbul edilməsi zərurəti** — köhnə sistemlər yükün altında əzilir, halbuki bəzi qərarlar saniyələr içində verilməlidir;
- **Machine Learning (ML) əsaslı innovasiya** — data science komandalarına maneəsiz məlumat girişi lazımdır;
- **İnfrastruktur xərcləri** — hər şeyi öz serverində saxlayanlar miqyaslanma (scaling) ilə əziyyət çəkirlər.

---

## Big Data pipeline-i: baştan sona axın

Big Data arxitekturasında hər şey **məlumatdan** başlayır və **nəticə ilə** bitir. Aradakı yol isə bir neçə mərhələdən keçir. Standart pipeline belədir:

1. **Toplama (ingestion)** — məlumatı uyğun alətlə yığırsan;
2. **Saxlama (storage)** — məlumatı uzunmüddətli saxlayırsan;
3. **Emal / analiz (processing)** — məlumatı anbardan götürüb üzərində əməliyyatlar aparırsan, sonra yenidən saxlayırsan;
4. **İstifadə** — emal olunmuş məlumat başqa alətlər tərəfindən işlədilir;
5. **Vizuallaşdırma** — nəticələr BI (business intelligence) alətləri ilə göstərilir və ya ML alqoritminə ötürülür.

Burada ən vacib anlayış **latency** (gecikmə) — məlumatın yaranması ilə nəticənin əldə edilməsi arasındakı vaxtdır.

> Sürət pul deməkdir. Latency-ni azaldıb performansı artırdıqca xərc də qalxır. Ona görə düzgün dizayn — sürət, ötürmə qabiliyyəti (throughput) və xərc arasında balans tapmaqdır.

Bir analogiya: təsəvvür et ki, birja platforması qurursan. Brokerlərin bazar dəyişikliyinə dərhal reaksiya verməsi lazımdır. Deməli, bahalı olsa da, yaddaşda işləyən bazalar (in-memory databases) və real-time axın emalı gərəkdir. Burada real-time analitikaya ehtiyac yüksək xərci **doğruldur**. Amma aylıq hesabat çıxaran bir sistem üçün eyni bahalı arxitektura tam israfdır.

### Ən böyük səhv: hər şeyi bir alətlə etmək

Çoxlu Big Data arxitekturasında rast gəlinən ən ciddi səhv — pipeline-ın bütün mərhələlərini vahid bir alətlə həll etməkdir. Bir server parkı ilə həm saxlama, həm çevirmə, həm vizuallaşdırma etmək ən sadə həll kimi görünə bilər, amma:

- Bu cür **sıx bağlı (tightly coupled)** arxitekturalar sındırılmağa (breach) ən açıq olanlardır;
- Sürət/xərc balansı optimal olmur.

Bunun əvəzinə arxitektlər **FLAIR** prinsiplərini tövsiyə edir:

- **F — Findability (tapıla bilənlik):** mövcud məlumatı və onun metadata-sını (sahibi, təsnifatı və s.) asan tapmaq;
- **L — Lineage (mənşə):** məlumatın haradan gəldiyini, necə hərəkət etdiyini izləyə bilmək;
- **A — Accessibility (əlçatanlıq):** məlumata giriş üçün təhlükəsizlik sertifikatlarını ala bilmək;
- **I — Interoperability (uyğunluq):** məlumatı elə formatda saxlamaq ki, əksər daxili sistemlər ondan istifadə edə bilsin;
- **R — Reusability (təkrar istifadə):** məlumat sənədləşdirilmiş sxemə malik olsun, mənbəyi aydın olsun. Bura tez-tez **MDM (Master Data Management)** prinsipləri də daxil olur.

Ona görə mütəxəssislər toplama, saxlama, emal və analiz mərhələlərini bir-birindən **ayırmağı** məsləhət görür. Bu ayırma dözümlülüyü (fault tolerance) artırır: ikinci emal dövründə avadanlıq sıradan çıxsa, pipeline-ın əvvəlinə qayıtmaq lazım gəlmir — sistem ikinci saxlama mərhələsindən davam edir.

Alət seçəndə bunları nəzərə al: **məlumatın strukturu**, **maksimal icazə verilən latency**, **minimal throughput** və **son istifadəçilərin tipik giriş şablonları**.

---

## Toplama (Data Ingestion)

Toplama — məlumatı hərəkət etdirmək və saxlamaq üçün yığmaqdır. Mənbələr adətən dörd cürdür: **verilənlər bazaları, məlumat axınları (streams), loglar və fayllar.**

Ən populyar mənbə verilənlər bazalarıdır — adətən tətbiqin əsas anbarı olan tranzaksiyalı sistemlər. Data stream-lər isə zamanla bağlı bitməyən ardıcıllıqlardır (məsələn, sayt qarşılıqlı əlaqələri və ya IoT cihaz məlumatları), adətən sənin təqdim etdiyin API vasitəsilə dərc olunur.

Burada bir qayda var: **tranzaksiyalı anbar** məlumatı tez yazıb-oxumalıdır, ona görə application server-lər, web server-lər, NoSQL və relational bazalar (RDBMS) toplama üçün idealdır. **Fayl məlumatı** isə (adətən qoşulmuş cihazlardan gələn) tez saxlanma tələb etmir və çox vaxt tək istiqamətdə axır.

Axın məlumatını (streaming) toplamaq üçün xüsusi həllər lazımdır:

- **Apache Kafka** — güclü "publish–subscribe" (dərc et–abunə ol) funksionallığı ilə nəhəng həcmi emal edən populyar variant;
- **Fluentd** — əsasən log aqreqasiyası ilə tanınan alət.

Axın anbarı (məsələn Kafka) toplama sistemini (producer) emal sistemindən (consumer) ayırır və giriş məlumatı üçün uzunmüddətli **bufer** rolunu oynayır.

### Açıq mənbəli toplama alətləri

- **Apache DistCp** ("Distributed Copy") — Hadoop ekosisteminin bir hissəsi, klasterlər arası böyük həcmli məlumatı MapReduce paralel emalı ilə köçürür;
- **Apache Sqoop** — Hadoop ilə relational anbarlar arasında məlumat ötürür. Strukturlaşdırılmış anbardan **HDFS**-ə (Hadoop Distributed File System) import və əksinə export edir;
- **Apache Flume** — böyük həcmli log məlumatını toplamaq üçün, Hadoop-a etibarlı yığım təmin edir;
- **Apache Storm** və **Apache Samza** — bitməyən axınların etibarlı emalı üçün.

### Cloud-da toplama

Üç böyük provayder — AWS, GCP və Azure — hərəsi özünəməxsus xidmətlər təklif edir:

- **AWS:**
  - *Direct Connect* — AWS-ə yüksək sürətli, aşağı latency-li özəl şəbəkə bağlantısı;
  - *Snowball və Snowmobile* — nəhəng həcmi (terabayt–petabayt) fiziki cihazlarla köçürmək üçün. Snowmobile bir ötürmədə 100 PB-a qədər apara bilir;
  - *DMS (Database Migration Service)* — baza miqrasiyasını sadələşdirir, **CDC (change data capture)** ilə davamlı replikasiya təmin edir.
- **GCP:**
  - *Storage Transfer Service* — online mənbələrdən (S3, HTTP/HTTPS) böyük həcmi köçürür;
  - *Pub/Sub* — real-time axın toplama və mesajlaşma;
  - *Dataflow* — **ETL (extract, transform, load)** və real-time hadisə axınları üçün.
- **Azure:**
  - *Data Factory* — həm lokal, həm cloud data integration serveri;
  - *Event Hubs* — saniyədə milyonlarla hadisə emal edir;
  - *Import/Export* — fiziki disklərlə kütləvi ötürmə.

---

## Saxlama (Data Storage)

Ən çox rast gəlinən səhv — bütün ehtiyaclar üçün **tək bir həll** (adətən RDBMS) işlətməkdir. Reallıqda ideal seçim latency və xərc arasında balans saxlayan **kombinasiya**dır. Yəni: doğru iş üçün doğru alət.

Saxlama seçimini müəyyən edən suallar:

- **Məlumat nə qədər strukturlaşdırılıb?** Apache web logları kimi zəif strukturlu, yoxsa graphics/audio/video/PDF kimi ixtiyari ikili, yaxud JSON/CSV kimi yarı-strukturlu?
- **Nə qədər tez sorğulanmalıdır?** Real-time (hər yeni yazıda qərar verilir), yoxsa gündəlik/həftəlik/aylıq paketlər?
- **Nə həcmdə toplanır?** REST API-dən gələn bir neçə KB, yoxsa eyni anda gələn nəhəng yazı massivi?
- **Ümumi həcm və artım sürəti?** Gigabaytlar, terabaytlar, yoxsa petabayt-exabayt?
- **Nə qədərə başa gəlir?** Hər mühitdə **performans, dözümlülük və xərc** arasında üçbucaq (constraint triangle) var — biri artdıqca digərinə güzəşt edirsən.

### Strukturlaşdırılmış məlumat: sətir vs sütun

Əksər tranzaksiyalı bazalar (Oracle, MySQL, SQL Server, PostgreSQL) **sətir səviyyəsində** işləyir. Sətir formatları məlumatı sətirlərlə saxlayır — diskə yazmaq üçün ən sürətli, amma oxumaq üçün yox, çünki çoxlu lazımsız məlumatı atlamaq lazım gəlir.

**Sütun (columnar) formatlar** isə bir sütunun bütün dəyərlərini bir yerdə saxlayır. Bu, sıxılmanı (compression) yaxşılaşdırır və oxu performansını artırır.

Bir misalla aydınlaşdıraq: təsəvvür et ki, 50 sütunlu sifariş cədvəlindən müəyyən ayın ümumi satışını öyrənmək istəyirsən.

- **Sətir yönümlü arxitekturada** sorğu bütün 50 sütunu ilə cədvəli tam skan edir.
- **Sütun yönümlü arxitekturada** sorğu yalnız satış sütununu skan edir — nəticədə performans dəfələrlə artır.

### Relational bazalar (OLTP)

RDBMS **real-time tranzaksiya emalı (OLTP)** üçün ən uyğundur. İnternet mağazalar, bank tətbiqləri, otel rezervasiya sistemləri relational bazalar üzərində qurulur. Tranzaksiyalı məlumat üçün baza **ACID** prinsiplərinə əməl etməlidir:

- **Atomicity (atomarlıq):** tranzaksiya ya tam icra olunur, ya tam geri qaytarılır;
- **Consistency (uyğunluq):** tranzaksiya bitəndə bütün məlumat bazada saxlanılır;
- **Isolation (təcrid):** eyni vaxtda gedən tranzaksiyalar bir-birinə mane olmur;
- **Durability (dözümlülük):** sistem/enerji kəsilsə də, tranzaksiya sonuncu məlum vəziyyətdən davam edir.

### Data warehouse-lar (OLAP)

Data warehouse — bir və ya bir neçə mənbədən yığılmış məlumatın mərkəzləşdirilmiş anbarıdır. Onlar **yalnız strukturlaşdırılmış relational məlumatla** işləyir və **OLAP (analitik emal)** üçün optimallaşdırılıb.

Bir bank ssenarisi: bank müştəri hesabları, tranzaksiyalar, kredit şərtləri və filiallar haqqında məlumatı warehouse-da saxlayır. Sonra ən populyar hesab tiplərini, zamanla tranzaksiya həcmini analiz edir və əsaslı qərarlar qəbul edir.

Müasir warehouse-lar sürəti üçün **sütun bazalarından** istifadə edir. Məsələn, **Amazon Redshift, Snowflake, Google BigQuery** — sütun saxlama və **MPP (massively parallel processing)** sayəsində yüksək sürət verir. MPP-də fərqli prosessorlar eyni vaxtda fərqli məlumat seqmentləri üzərində işləyir.

Amma warehouse-ların məhdudiyyəti var: paketlərlə yüklənmə tələb edir, deməli real-time analitika verə bilmir. Həmçinin korporativ məlumatın müxtəlifliyi artdıqca (mətn, IoT, qrafika, audio, video) və ML/AI populyarlaşdıqca ənənəvi warehouse modelinin çərçivəsi dar gəlməyə başladı.

### NoSQL bazalar

NoSQL bazalar (DynamoDB, Cassandra, MongoDB) relational bazaların miqyaslanma və performans problemlərini həll edir. Adından göründüyü kimi, onlar relational deyil — cədvəllər arası açıq əlaqə mexanizmi (join, foreign key, məcburi normallaşdırma) yoxdur.

NoSQL bir neçə modeldən istifadə edir:

- **Sütun (columnar):** Apache Cassandra, Apache HBase — sorğuda yalnız konkret sütunu skan edir;
- **Sənəd yönümlü (document):** MongoDB, Couchbase, MarkLogic, DynamoDB, DocumentDB — JSON/XML kimi yarı-strukturlu məlumat üçün;
- **Qraf (graph):** Amazon Neptune, JanusGraph, Neo4j, OrientDB — təpə (vertex) və kənarları (edge) saxlayır;
- **Yaddaşda "açar–dəyər" (in-memory key–value):** Redis, Memcached — intensiv oxu üçün məlumatı yaddaşda saxlayır. Sorğu əvvəl cache-ə düşür; məlumat cache-də varsa, əsas bazaya getməyə ehtiyac qalmır.

### SQL vs NoSQL müqayisəsi

| Xüsusiyyət | SQL bazalar | NoSQL bazalar |
|---|---|---|
| **Məlumat modeli** | Relational model — məlumatı sətir və sütunlu cədvəllərə normallaşdırır. Sxem cədvəlləri, sütunları, əlaqələri, indeksləri əhatə edir | Sabit sxem tələb etmir, çeviklik verir. Çox vaxt partition key işlədir. JSON, XML və digər sənəd formatları üçün əla uyğundur |
| **Tranzaksiya** | ACID xüsusiyyətlərinə tam əməl edir | Horizontal miqyaslanma naminə bəzi ACID xüsusiyyətlərindən güzəştə gedir |
| **Performans** | Əsasən diskdən asılıdır; sorğu optimallaşdırma indeks tələb edir | Aparat klasterinin ölçüsü, şəbəkə latency-si və tətbiqin sxemindən asılıdır |
| **Miqyaslanma** | Ən asan **vertical** (aparat gücünü artırmaqla). Distributed sistemlər (sharding) əlavə səy tələb edir | **Horizontal** miqyaslanma üçün dizayn olunub — ucuz aparatın distributed klasterləri ilə |

### Axtarış anbarları (Search)

**Elasticsearch** — Big Data (ziyarət məlumatı, log analizi) üçün ən populyar axtarış sistemlərindəndir. "İsti" (warm) məlumatla, istənilən atributla situativ (ad hoc) sorğularla yaxşı işləyir.

**Amazon OpenSearch Service** açıq mənbəli Elasticsearch klasterlərini idarə edir, **Kibana** vizuallaşdırma mexanizmi ilə gəlir. Log axtarışı və analizi — bank, oyun, marketinq, fırıldaqçılıq aşkarlanması kimi sahələrdə geniş istifadə olunur. NLP (natural language processing) əsaslı axtarış üçün **Amazon Kendra** kimi ML servisləri də var.

### Strukturlaşdırılmamış məlumat: Hadoop

Strukturlaşdırılmamış məlumat üçün **Hadoop** ideal variantdır — yaxşı miqyaslanır, çevikdir, adi istifadəçi avadanlığında işləyə bilir və ucuzdur. Hadoop **əsas və törəmə node (master/slave)** modelindən istifadə edir: məlumat törəmə node-lar arasında paylanır, əsas node isə sorğuları koordinasiya edir.

Klaster qurulanda hər törəmə node **HDFS lokal disk anbarı** alır. Məlumata Hive, Pig, Spark kimi framework-lərlə sorğu göndərmək olar. Amma diqqət: lokal diskdəki məlumat yalnız həmin instansın ömrü boyu mövcud olur.

Bir vacib nüans: HDFS-də saxlama edəndə **saxlamanı hesablama ilə bağlayırsan**. Anbarı genişləndirmək üçün yeni maşın əlavə etmək lazımdır, bu da hesablama gücünü də artırır. Maksimal çeviklik üçün **hesablamanı saxlamadan ayırmaq** və hərəsini müstəqil miqyaslamaq lazımdır. Məhz burada object storage köməyə gəlir.

### Object storage

Object storage məlumatı **object** adlı vahidlərlə **bucket**-larda saxlayır. Fayllar bloklara bölünmür — məlumat və metadata birgə saxlanılır. Bucket-dakı object sayı limitsizdir, onlara giriş API çağırışları (adətən HTTP GET/PUT) ilə edilir.

Object storage düz ad məkanı (flat namespace) və miqyaslanma işlədir, idarəetmə xərcini azaldır. Cloud-da ən populyar data lake əsasıdır. Nümunələr: **Amazon S3, Azure Blob Storage, Google Cloud Storage.**

### Vektor bazalar (VectorDB)

Generativ AI və ML-in yüksəlişi ilə vektor bazalar çox populyarlaşdı. **Vektor məlumat** — çoxölçülü nöqtələrdir. Məsələn, şəkil, mətn və ya audio faylı **vektor təsvirinə** (rəqəmlər siyahısı) çevrilə bilər — bu təsvir orijinalın ən vacib xüsusiyyətlərini əks etdirir.

Bu vektorlar oxşarlıq axtarışı (similarity search), qruplaşdırma, təsnifat kimi ML tapşırıqlarında işlədilir. Məsələn, müştəri təsnifatı sistemində vektor embedding-lər müştəriləri davranışına görə qruplaşdıra bilər — nəticədə fərdiləşdirilmiş təkliflər vermək olur.

Üstünlükləri:

- **Sürət və effektivlik:** oxşarlıq axtarışını ənənəvi bazalardan xeyli tez edir;
- **Miqyaslanma:** böyük ML datasetləri üçün;
- **ML/AI pipeline inteqrasiyası:** vektor məlumata birbaşa sorğu.

Çatışmazlıqları:

- **Mürəkkəblik:** çoxölçülü vektorların idarəsi çətindir;
- **Resurs tələbi:** böyük datasetlərdə əhəmiyyətli hesablama gücü gərəkir;
- **Yetkinliyin çatışmaması:** texnologiya nisbətən yenidir, ekosistem ənənəvi bazalar qədər yetkin deyil.

### Blockchain anbarı

Blockchain adətən kriptovalyutalarla assosiasiya olunsa da, məlumat idarəçiliyində inqilabi yanaşma təklif edir — **mərkəzsizləşdirilmiş məlumat yoxlaması.** Məsələn, blockchain əsaslı kadastr sistemində hər əmlak alqı-satqısı ümumi reyestrdə qeydə alınır və bütün iştirakçılar üçün dərhal yoxlanıla bilən olur.

İki əsas xüsusiyyəti: **dəyişməzlik (immutability)** və **təhlükəsizlik.** Səhiyyədə blockchain xəstə məlumatının dəyişməz və təhlükəsiz qalmasını təmin edir. Tranzaksiyalar bloklara qruplaşır, hər blok əvvəlkinə bağlanaraq zəncir yaradır — bu da məlumatı sonradan dəyişməyi çox çətinləşdirir.

Növləri:

- **Public (açıq):** Ethereum — mərkəzsizləşdirilmiş tətbiqlər (DApps) və smart-kontraktlar üçün; hər kəs qoşula bilər;
- **Private (özəl):** girişi məhdud, bir təşkilat idarə edir; məsələn, dərman istehsalının izlənməsi;
- **Consortium (konsorsium):** bir neçə təşkilat birgə idarə edir; məsələn, yük daşıyan şirkətlərin qlobal yük izləmə şəbəkəsi.

AWS blockchain-i servis kimi təklif edir: **Amazon QLDB** (dəyişməz reyestr bazası), **AMB (Amazon Managed Blockchain)**, R3 Corda, Ethereum, Hyperledger.

### Axın anbarları (Streaming storage)

Axın məlumatı fasiləsiz gəlir — başı və sonu yoxdur. Birja qiymətləri, sürücüsüz avtomobillər, ağıllı evlər, e-ticarət, oyunlar — hamısı real-time məlumat istehsal edir. Netflix baxdığınız kontentə əsasən real-time tövsiyə verir, Lyft sərnişini sürücü ilə real-time bağlayır.

Bu məlumatı saxlamaq çətindir, çünki anbar tutumunu qabaqcadan bilmək olmur və sürət çox yüksəkdir. Ən populyar servislər:

- **Amazon Kinesis** — üç əsas servis:
  - *KDS (Kinesis Data Streams)* — xam axını saxlayır, sonrakı emal üçün;
  - *KDF (Kinesis Data Firehose)* — yazıları S3, Elasticsearch, Redshift, Splunk kimi mühitlərə köçürür, avtomatik buferləyir;
  - *KDA (Kinesis Data Analytics)* — Apache Flink ilə axın analitikası aparır;
- **Amazon MSK (Managed Streaming for Kafka)** — cloud-da idarə olunan Kafka klasteri;
- **Apache Flink** — həm məhdud, həm bitməyən axınları emal edən açıq mənbəli platforma;
- **Apache Spark Streaming** — giriş axınlarını paketlərə bölüb Spark nüvəsinə göndərir, **DStream** abstraksiyalarından istifadə edir;
- **Apache Kafka** — producer topic-ə məlumat dərc edir, consumer abunə olub çıxarır.

### Cloud saxlama variantları qısaca

- **AWS:** S3 (object), EBS (block-level, EC2 üçün), RDS (idarə olunan relational), S3 Glacier (arxiv);
- **GCP:** Cloud Storage (object), Persistent Disk (block), Cloud SQL (idarə olunan relational), Bigtable (NoSQL);
- **Azure:** Blob Storage (object), File Storage (SMB fayl paylaşımı), SQL Database (idarə olunan relational), Disk Storage (block).

---

## Emal və Analiz (Processing & Analytics)

Data analytics — məlumatı toplama, çevirmə və vizuallaşdırma vasitəsilə dəyərli nəticələr (insights) çıxarma prosesidir. İki əsas emal tərzi var:

- **Batch (paket) emal** — böyük həcmli "soyuq" (cold) məlumat sorğulanır, cavab saatlarla gələ bilər. Məsələn, aylıq hesabat çıxarmaq. **MapReduce əsaslı** sistemlər (Hadoop) bunun nümunəsidir;
- **Real-time / streaming emal** — kiçik həcmli "isti" (hot) məlumat sorğulanır, cavab tez gəlir. Hər yeni yazıya cavab olaraq funksiyalar inkremental yenilənir (sensor, monitorinq, audit logları).

### Bir AWS ETL pipeline nümunəsi

Tipik data lake ETL pipeline-ında hadisələr belə gedir: müxtəlif mənbələr (məsələn, web app serverləri) log faylları yaradır, bunlar **S3**-də saxlanılır. Sonra **Amazon EMR (Elastic MapReduce)** ilə çevrilir (Hive, Pig, Spark istifadə edərək) və yenidən S3-ə yüklənir. Çevrilmiş fayllar `COPY` əmri ilə **Redshift**-ə yüklənib **QuickSight** ilə vizuallaşdırılır. **Amazon Athena** isə S3-dəki məlumatı birbaşa, mövcud axını dəyişmədən sorğulamağa imkan verir.

### Populyar emal alətləri

- **Apache Hadoop** — distributed emal arxitekturası; tapşırığı server klasterinə ötürür, böyük işi kiçik tapşırıqlara bölüb paralel emal edir. Dözümlülük üçün dizayn olunub — hər işçi node statusunu əsas node-a bildirir;
- **Apache Spark** — yaddaşda (in-memory) emal framework-ü; MPP sistemidir. **DAG (directed acyclic graph)** ilə mərhələləri təsvir edir, məlumat kadrlarını yaddaşda saxlayaraq I/O-nu minimuma endirir;
- **HUE (Hadoop User Experience)** — brauzer UI-dan sorğu və skript işlətmək üçün; komanda sətri əvəzinə;
- **Pig** — xam məlumatı strukturlaşdırılmış formata çevirmədən əvvəl emal etmək üçün; ETL əməliyyatlarına yaxşı uyğundur; **Pig Latin** skript dilindən istifadə edir;
- **Hive** — Hadoop klasteri üzərində işləyən açıq mənbəli data warehouse; **HQL (Hive Query Language)** — SQL-ə oxşar dil işlədir; Java kimi dillərdə proqram yazma mürəkkəbliyini abstraktlaşdırır;
- **Presto** — Hive-a oxşar, amma çox daha sürətli sorğu nüvəsi; **ANSI SQL** dəstəkləyir, sorğuları yaddaşda icra edir. Diqqət: çoxlu yaddaş tələb edir, yaddaş dolanda iş yenidən başladılır;
- **HBase** — Hadoop layihəsinin NoSQL bazası; HDFS üzərində işləyir, məlumatı sütun formatında sıxılmış saxlayır;
- **Apache Zeppelin** — Hadoop üzərində qurulmuş web-redaktor ("Zeppelin notebook"); backend dil interpretatoru konsepti ilə istənilən dili qoşmaq olar;
- **Ganglia** — Hadoop klaster monitorinq aləti; performansa təsir etmədən klaster serverlərini izləyir;
- **JupyterHub** — Jupyter-in çoxistifadəçili variantı; data science mütəxəssisləri üçün web-IDE.

### Cloud-da emal servisləri

- **AWS:** EMR (cloud Hadoop), Glue (idarə olunan ETL, data catalog), Athena (serverless SQL sorğu);
- **GCP:** BigQuery (serverless warehouse), Cloud Dataflow (Apache Beam əsaslı, batch+stream), Cloud Dataprep (vizual məlumat hazırlığı);
- **Azure:** HDInsight (idarə olunan open-source framework-lər), Databricks (Apache Spark əsaslı), Synapse Analytics (Big Data + warehouse birləşməsi).

---

## Vizuallaşdırma (Data Visualization)

Analitika biznes suallarına cavab verir: müştəri üzrə gəlir, region üzrə mənfəət, reklam trafiki və s. İki əsas problem: **həllin qiyməti** və **hazırlanma vaxtı.** Populyar alətlər:

- **Amazon QuickSight** — cloud BI aləti; **SPICE** (Super-fast, Parallel, In-memory Calculation Engine) cache nüvəsi işlədir; ML əsaslı avtoproqnoz verir;
- **Kibana** — açıq mənbəli; Elasticsearch ilə inteqrasiya; log analizi və geospatial dəstək;
- **Tableau** — ən populyar BI alətlərindən; vizual sorğu nüvəsi, **drag-and-drop** interfeys;
- **Spotfire** — yaddaşda emal; məlumatı coğrafi xəritəyə salıb dərc edə bilir; avtomatik vizuallaşdırma tövsiyəsi;
- **Jaspersoft** — self-service hesabat və analitika, drag-and-drop konstruktor;
- **Power BI** — Microsoft-un populyar BI aləti; self-service analitika.

---

## Big Data arxitekturasını layihələndirmək

İndi isə maraqlı hissəyə keçək — bütün bu komponentləri necə birləşdirmək. Əvvəlcə hansı arxitektura üslubunun sənə uyğun olduğunu anlamaq lazımdır. Bunun üçün **biznes ssenarisindən geriyə doğru** hərəkət et və şərti bir istifadəçi personası yarat.

Persona müəyyən etmək üçün suallar: hansı komandada işləyirlər? Data analiz bacarıqları nə səviyyədədir? Hansı alətlərdən istifadə edirlər? İşçilərə, müştərilərə, yoxsa partnyorlara fokuslanmalısan?

Bir ticarət şəbəkəsi nümunəsində personalar belə ola bilər:

- **Product manager:** yalnız öz məhsulunun satış həcmini görür;
- **Mağaza direktoru:** yalnız öz mağazasını görür;
- **Administrator:** bütün məlumata giriş;
- **Data analitik:** şəxsi məlumat istisna olmaqla hər şeyə giriş;
- **Müştəri saxlama meneceri:** müştəri trafiki qanunauyğunluqlarını anlamalıdır;
- **Data science mütəxəssisi:** xam və emal olunmuş məlumata giriş — tövsiyə və proqnoz üçün.

Sonra bu personalar üçün biznes ssenariləri yaz: alış aktivliyi trendləri, xərci artan/azalan müştərilər üzrə kateqoriyalar, demoqrafiyanın xərcə təsiri, direkt marketinqin effektivliyi.

Növbəti mərhələ — **giriş şablonları və saxlama siyasətlərini** anlamaq: hesabatlar nə tezliklə sorğulanır? Aktuallıq gözləntisi nədir? Məlumat nə qədər saxlanmalıdır? Nə vaxt "köhnəlmiş" sayılır?

**Compliance** (normativ uyğunluq) da vacibdir: hansı compliance tələbləri var? Data locality/gizlilik tələbləri? Kim hansı yazıları görə bilər? Tələb üzrə silinmə necə təmin olunur? Məlumat harada saxlanılır (lokal/regional/qlobal)?

Nəhayət, **ROI (okupasiya)**: hansı əsas biznes prosesləri dəstəklənir? Latency biznes qərarlarına necə təsir edir? Uğuru necə ölçəcəksən?

> Son nəticədə sənə çevik, paralelizm tətbiq edən, komponentləri müstəqil miqyaslana bilən (həm yuxarı, həm aşağı) bir arxitektura lazımdır.

İndi əsas arxitektura pattern-lərinə baxaq.

---

## Data Lake (məlumat gölü)

Data lake — korporasiyanın strukturlaşdırılmış və strukturlaşdırılmamış müxtəlif tipli məlumatını yığan **mərkəzi anbardır.** Konsept bütün korporativ məlumatı ucuz saxlama sisteminə (məsələn S3) köçürmək üçün yarandı. Məlumata ümumiləşdirilmiş API-lər və açıq fayl formatları (**Apache Parquet, ORC**) ilə giriş olur. Məlumat **olduğu kimi** ("as is"), qabaqcadan sxemə çevrilmədən saxlanılır — bu da toplama sürətini artırır.

Data lake təşkilatda **vahid həqiqət mənbəyi (single source of truth)** olur. Əsas üstünlükləri:

- **Müxtəlif mənbələrdən toplama:** relational, non-relational bazalar və axınlar — hamısı bir mərkəzi qəbulediciyə;
- **Effektiv saxlama:** istənilən struktur, məcburi sxem olmadan;
- **Həcm üzrə miqyaslanma:** saxlama və hesablama qatları ayrıldığından hər komponent ayrıca miqyaslanır;
- **Müxtəlif mənbələrə analitika:** "schema on read" ilə mərkəzi data catalog yaradıb tez ad hoc analiz.

AWS-də tipik data lake: məlumat müxtəlif mənbələrdən S3-ə toplanır. Xam qatda hər şey orijinal formatda saxlanılır. Sonra **AWS Glue** (Spark əsaslı serverless kataloqlaşdırma və ETL) ilə kataloqlaşdırılıb çevrilir. **Glue bot** mənbələri avtomatik skan edir, formatları müəyyən edir, sxemləri təyin edir və data catalog-u metadata ilə doldurur. Data mühəndisləri **Athena** ilə ad hoc sorğu, BI analitikləri **QuickSight/Tableau/Power BI** ilə vizuallaşdırma, data analitikləri isə **SageMaker** ilə ML edir.

### Data lake-ın problemi: "bataqlıq"

Zamanla məlum oldu ki, data lake-lərin məhdudiyyəti var. Ucuz saxlama olduğundan şirkətlər ora nə qədər çox məlumat yığmağa çalışır və **məlumat keyfiyyəti + giriş idarəçiliyi** problemləri ucbatından göllər tez "bataqlığa" (data swamp) çevrilir.

Bunu həll etmək üçün təşkilatlar məlumatın kiçik hissələrini aşağıdakı bir warehouse-da emal etməyə başladı. Amma bu **iki-sistemli arxitektura** (data lake + data warehouse) davamlı data engineering tələb edir, hər emal mərhələsində sıradan çıxma riski var və məlumat iki dəfə saxlandığından **xərc iki qat** olur. Məhz burada növbəti pattern doğuldu.

---

## Data Lakehouse (göl-anbar)

Lakehouse arxitekturası ənənəvi data lake ilə data warehouse arasındakı boşluğu doldurur — hər ikisinin güclü tərəflərini birləşdirir. Data lake-in nəhəng tutumunu (açıq formatlarda saxlama) warehouse-un SQL sadəliyi və etibarlılığı ilə birləşdirir. Əsas xüsusiyyətləri:

- **Açıq formatlarda saxlama** — qarşılıqlı əlaqə və çeviklik;
- **Saxlama və hesablamanın ayrılması** — müstəqil miqyaslanma;
- **Tranzaksiya zəmanətləri** — ənənəvi bazalar kimi etibarlı konkurent giriş;
- **Müxtəlif istifadə ehtiyaclarının dəstəyi** — batch-dən real-time-a qədər;
- **Təhlükəsizlik və rasional idarəçilik** — giriş nəzarəti və compliance;
- **Vahid platforma** — ETL, ML, BI, hesabat — hamısı bir yerdə;
- **Yaxşılaşdırılmış sorğu performansı** — indeksləmə, cache, qruplaşdırma;
- **Ucuz miqyaslanma** və **çevik məlumat idarəçiliyi.**

AWS-də bir nümunə **Redshift Spectrum** işlədir — bu, məlumatı warehouse-a köçürmədən data lake-dən (S3) sorğulamağa imkan verir. Yəni Redshift işlədirsənsə, bütün məlumatı klasterə yükləmədən Spectrum ilə birbaşa S3-dən sorğulaya və warehouse məlumatı ilə birləşdirə bilərsən.

Konkret ssenari: məlumat lokal **EDW (Enterprise Data Warehouse)**-dan S3 API ilə S3-ə toplanır. AWS Glue metadata-nı, həmçinin kredit tarixçəsi və kredit məlumatını ayrıca saxlayır. Kreditləşmə şöbəsi kredit məlumatına yalnız-oxu (read-only), skoring şöbəsi kredit tarixçəsinə read-only giriş alır. Kredit risk analitikinə kredit məlumatı lazım olsa, məhdud sahə dəsti ilə read-only sxem verilir.

Amma coğrafi olaraq bölünmüş biznes bölmələri olan mürəkkəb təşkilatlar üçün lakehouse da az gəlir. Bu bölmələr artıq öz göl və anbarlarını qurub. Mərkəzi korporativ göl yaratmaq çətindir, çünki dəyişikliklər yavaş yayılır. Həll — **domen yönümlü, mərkəzsizləşdirilmiş** yanaşma. Bax burada data mesh gəlir.

---

## Data Mesh (məlumat şəbəkəsi)

Data mesh-in lakehouse-dan əsas fərqi: məlumat qəsdən **paylanmış** qalır — bir mərkəzdə birləşmir. Data mesh iri təşkilata bir neçə daxili göl/göl-anbarı bağlamağa və məlumatı partnyorlar, elmi mühit, hətta rəqiblərlə paylaşmağa imkan verir.

Data mesh dörd fundamental prinsipə əsaslanır:

- **Domen əsaslı mərkəzsizləşdirilmiş sahiblik:** məlumat sahibliyi və arxitektura qərarları konkret biznes sahələrinə verilir. Hər sahə öz məlumatına cavabdehdir;
- **Məlumata məhsul kimi baxmaq (data as a product):** məlumat adi resurs deyil, son istifadəçiyə fayda verən **dəyərli aktiv** kimi qulluq görür;
- **Federativ idarəçilik + mərkəzləşdirilmiş audit:** mərkəzsiz idarəçiliklə ümumi nəzarət arasında balans; sahələr öz məlumatını idarə edir, mərkəz audit və compliance üçün nəzarəti saxlayır;
- **Ümumi giriş (self-service):** məlumatın təşkilat daxilində əlçatan və istifadəyə yararlı olması.

Əsas konsept: **məlumat domenləri data lake-də node kimi təmsil olunur.** Producer bir və ya bir neçə data product-u mərkəzi kataloqa yazır. Product paylaşımı federativ nəzarətə tabedir. Consumer isə kataloqda axtarış aparıb data product-a giriş alır. AWS-də bu, mərkəzi hesab (product qeydiyyatı), giriş teq-ləri, icazə saxlama və producer/consumer hesablarına təhlükəsizlik siyasəti ilə qurulur.

---

## Streaming (axın) arxitekturası

Real-time analitika artıq hər biznes üçün vacibdir. Axın məlumatı — video/audio, tətbiq logları, sayt ziyarətləri, IoT telemetriyası — hamısı sürətli toplama və real-time emal tələb edir. Tipik ssenari beş mərhələdən ibarətdir:

1. **Data generation:** mənbələr fasiləsiz məlumat istehsal edir;
2. **Ingestion:** məlumat toplama mərhələsindən axın anbarına keçir;
3. **Streaming storage:** giriş məlumatı etibarlı saxlanılır, real-time emala açıq olur;
4. **Stream processing:** filtrasiya, aqreqasiya, analiz aparılır;
5. **Data output:** emal olunmuş məlumat təyinat yerinə (baza, göl və s.) göndərilir.

Streaming arxitekturasının fərqi — fasiləsiz, çox yüksək sürətli axını emal etməkdir. Məlumat çox vaxt yarı-strukturludur və mürəkkəb emal tələb edir. Real-time-da qanunauyğunluqları (xüsusən zaman sıraları — time series) müəyyən etmək kritik vacibdir.

AWS-də bir külək stansiyası nümunəsi: külək mühərriklərinin işini və sürətini analiz etmək üçün məlumat **AWS IoT Greengrass** ilə **Kinesis Data Streams**-ə toplanır (bu, məlumatı bir ilə qədər saxlaya və yenidən oynada bilir). Məlumat **Lambda** ilə emal olunub **S3**-ə saxlanılır (sonra **Firehose** ilə analitika). Real-time sorğular **Kinesis Data Analytics for SQL** ilə göndərilir, pipeline **Kinesis Data Analytics for Java Flink** ilə avtomatlaşdırılır, nəticə **OpenSearch**-ə saxlanılır. **Kibana** ilə real-time vizuallaşdırma edilir.

---

## Hansı arxitekturanı seçməli?

Seçim biznes tələblərindən, məlumat strategiyasından və texniki imkanlardan asılıdır. Qısa xülasə:

- **Data Lake** — böyük həcmli xam məlumatı orijinal formatda saxlamaq üçün.
  - *Üstünlük:* yüksək miqyaslanma, çeviklik, ucuz saxlama;
  - *Çatışmazlıq:* nəzarətsiz qalanda "bataqlığa" çevrilir;
  - *Ssenari:* Big Data analitikası, ML, ucuz saxlamada strukturlaşdırılmış+strukturlaşdırılmamış məlumat.
- **Data Lakehouse** — göl və anbar elementlərini birləşdirir.
  - *Üstünlük:* ucuz miqyaslanma + güclü sxem dəstəyi + ACID tranzaksiya;
  - *Çatışmazlıq:* realizasiyası mürəkkəbdir;
  - *Ssenari:* Big Data emalı + ənənəvi BI-ın bir platformada olması, real-time analitika.
- **Data Mesh** — mərkəzsizləşdirilmiş arxitektura və sahiblik.
  - *Üstünlük:* dinamik, çevik idarəçilik, məlumatın demokratikləşməsi;
  - *Çatışmazlıq:* idarəçilik yanaşmasını dəyişmək tələb edir;
  - *Ssenari:* bir neçə müstəqil komandalı böyük təşkilatlar.

Qərar üçün əsas faktorlar:

- **Təşkilat strukturu:** mərkəzləşmiş, yoxsa mərkəzsizləşmiş (data mesh ikinciyə uyğundur);
- **Həcm və müxtəliflik:** çox müxtəlif üçün göl, strukturlu mühit üçün göl-anbar;
- **Analitik ehtiyaclar:** real-time + Big Data birləşməsi lazımdırsa — lakehouse;
- **İdarəçilik və compliance:** lakehouse adətən güclü mexanizm verir;
- **Texniki kvalifikasiya:** mesh və lakehouse xüsusi bacarıq tələb edir.

> Ən yaxşı seçim çox vaxt **hibrid yanaşma** ola bilər — hər arxitekturanın güclü tərəfini götürmək.

---

## Ən yaxşı təcrübələr (Best Practices)

AWS referens data lake arxitekturasını yoxlamaq üçün istifadə olunan meyarlar beş kateqoriyaya bölünür:

**Təhlükəsizlik:**
- Məlumatı təsnif et və resurs əsaslı giriş nəzarəti ilə qoruma siyasəti təyin et;
- SSO (single sign-on) ilə etibarlı identifikasiya əsası qur;
- Audit üçün mühit və məlumat trassirovkası aç;
- Bütün qatlarda SSL və şifrələmə tətbiq et (həm ötürmədə, həm saxlamada);
- Production bazalara yazma girişini blokla.

**Etibarlılıq (Reliability):**
- Kataloqlaşdırma əsaslı avtomatik profilləmə ilə məlumat gigiyenasını saxla;
- Aktiv həyat dövrünü (lifecycle) idarə et;
- Kataloqda hərəkət tarixçəsi saxlayaraq məlumat mənşəyini (lineage) qoru;
- ETL tapşırıqlarında avtomatik bərpa ilə dözümlülük layihələndir.

**Performans:**
- Təmizlik qatı formalaşdırmaq üçün məlumat profilləmə et;
- Saxlamanı davamlı optimallaşdır — Parquet sıxılma, secləşdirmə (partitioning), fayl ölçüsü optimallaşdırması.

**Xərc optimizasiyası:**
- İstehlak modeli qəbul et, sorğu tipini müəyyən et (ad hoc vs sürətli);
- İstifadə olunmayan məlumatı sil, saxlama qaydaları təyin et;
- Göl həllərində hesablamanı saxlamadan ayır;
- Fərqli mənbələr üçün fərqli miqrasiya strategiyaları;
- İdarə olunan servislərdən istifadə edərək sahiblik xərcini azalt.

**Əməliyyat mükəmməlliyi:**
- "Operations as code" strategiyası — CloudFormation, Terraform, Ansible;
- Prosesləri avtomatlaşdır — Step Functions və ya Apache Airflow ilə orkestrasiya qatı;
- Davamlı monitorinq ilə sıradan çıxmanı erkən proqnozlaşdır;
- İş yükünün vəziyyətinə nəzarət et.

AWS referens arxitekturasında əlavə komponentlər: **KMS** (şifrələmə), **IAM** (giriş idarəsi), **Macie** (şəxsi məlumat aşkarlanması — PCI DSS kimi normativlər üçün), **CloudWatch** (monitorinq), **CloudTrail** (audit).

---

## Sona qədər: xam məlumatdan qərara

Gəlin yolu bir daha yığcam gözdən keçirək. **Əvvəl** — hər yerdən nəhəng, dağınıq, mənasız görünən məlumat axını gəlirdi; nə saxlamağı, nə oxumağı bilmirdin. **Sonra** — düzgün pipeline ilə həmin xaos toplanır, saxlanılır, emal olunur, vizuallaşır və nəticədə biznesi irəli aparan qərara çevrilir.

Əsas dərs isə budur: **tək bir alət hər şeyi həll etmir.** Hər tapşırıq üçün doğru alət var — və data lake, lakehouse, data mesh kimi arxitekturalar sənə bu alətləri düzgün birləşdirmək çevikliyini verir. Latency, throughput və xərc — bu üç qüvvə arasında balans tapmaq sənin əsas işindir.

Bu fəsildə məlumatın toplanmasından tutmuş referens arxitekturaya qədər bütün komponentləri gördük. Növbəti mərhələ isə daha maraqlıdır: topladığın tarixi məlumat əsasında **gələcəyi proqnozlaşdırmaq** — yəni machine learning. Çünki məlumatın əsl gücü keçmişi görməkdə yox, gələcəyi təxmin etməkdədir.

Bəs sizin təşkilatınız məlumatını hansı arxitektura ilə saxlayır — göl, göl-anbar, yoxsa hələ də tək bir RDBMS-in yükü altında əzilir?
