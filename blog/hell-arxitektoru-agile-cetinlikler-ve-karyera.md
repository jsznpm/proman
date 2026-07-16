# Texnologiya seçimindən karyera yoluna: həll arxitektoru necə yetişir?

Əvvəlki yazılarda həll arxitektorunun kim olduğuna və gündəlik məsuliyyətlərinə baxdıq. Amma bir hissə hələ açılmayıb: arxitektor **düzgün texnologiyanı necə seçir**, məhsul canlıya çıxandan sonra nə edir, Agile komandada rolu nə dəyişir və ən əsası — bu peşəyə necə gəlinir?

Bu yazı seriyanın davamı və bir növ yekunudur. Gəlin arxitektorun işini əvvəldən sona qədər — texnologiya seçimindən tutmuş karyera pilləkənlərinə qədər — bir hekayə kimi izləyək.

Başlayaq.

---

## Texnologiya seçimi — ən çətin qərar

Həll arxitektorunun ən açar, həm də ən çətin işi budur: **hansı texnologiyanı seçmək?**

Problem seçimin çoxluğundadır. Bir tapşırığın onlarla düzgün həlli var — müxtəlif dillər, framework-lər, verilənlər bazaları, bulud servisləri. Arxitektor bu geniş diapazonda düz olanı tapmalıdır. Səhv seçdiyi stack birbaşa məhsulun son çatdırılmasına təsir edir.

> Ona görə arxitektorun texnologiya bilgisi həm geniş, həm dərin olmalıdır — bir sahədə səthi yox, çox sahədə həqiqi.

Düzgün seçim üçün arxitektor iki şeyi tərəziyə qoyur:

- **FT (funksional tələblər)** — sistem *nə etməlidir*;
- **NFT (qeyri-funksional tələblər)** — sistem *necə işləməlidir* (sürət, təhlükəsizlik, miqyaslanma).

Seçdiyi texnologiya təkcə məqsədə deyil, ətraf perspektivlərə də uyğun gəlməlidir: başqa framework və API-larla inteqrasiya oluna bilirmi, performans tələblərinə cavab verirmi, təhlükəsizlik ehtiyaclarını ödəyirmi.

Ən vacib meyar isə gələcəkdir. Yaxşı arxitektor bu günün tələbini ödəyən yox, **sabahın tələbinə də miqyaslanan** texnologiyanı seçir.

---

## POC və prototip — fikri sınaqdan keçirmək

Texnologiyanı kağız üzərində seçmək azdır. Onu sınamaq lazımdır. Burada işin ən maraqlı hissəsi başlayır.

Arxitektor müxtəlif texnologiya stack-lərində **POC** qurur.

> POC — Proof of Concept (konsepsiyanın sübutu). Kiçik, tez qurulan bir sınaq versiyasıdır ki, texnologiyanın işə yarayıb-yaramadığını göstərsin.

POC-un ideyası sadədir: texnologiyanı bir neçə kritik funksiya üzərində sınayıb, imkanlarına görə qərar vermək. POC-un ömrü qısadır — o, məhsul deyil, sadəcə komanda daxilində ekspertlərin qiymətləndirməsi üçün qurulur. İşini görüb kənara atılır.

Bir neçə platformanı POC ilə yoxlayandan sonra arxitektor **prototip** qurmağa keçir.

Prototip POC-dan bir addım irəlidir: nümayiş məqsədi daşıyır və çox vaxt sifarişçiyə göstərilir ki, layihəyə maliyyə ayrılsın. Amma diqqət — nə POC, nə prototip son məhsul deyil. Funksionallıqları məhduddur, ona görə real həllin qurulması hələ qarşıdadır.

Bunu belə təsəvvür et: POC — mühərriki işə salıb "işləyir" demək. Prototip — sükan və oturacaq qoyub sifarişçini qısa test sürüşünə çıxarmaq. Avtomobilin özü isə hələ konveyerdə deyil.

---

## Həllin dizaynı və çatdırılması

Arxitektor FT-ni, NFT-ni, mövcud məhdudiyyətləri anlayandan və texnologiyanı seçəndən sonra əsl dizayna keçir.

Agile mühitdə bu proses **iterativdir** — tələblər zamanla dəyişir və bu dəyişikliklər dizayna təsir edir. Ona görə arxitektor bir dəfə cızıb kənara qoyan yox, davamlı yenidən baxan biridir.

Əsas prinsip: dizayn **future-proof** olmalıdır — yəni zamanla köhnəlməməlidir.

Bu nə deməkdir konkret olaraq:

- İstifadəçi tələbi on qat artsa, tətbiq arxitekturada ciddi dəyişiklik olmadan miqyaslana bilməlidir;
- Yeni texnologiya (məs. maşın öyrənməsi və ya blockchain) meydana çıxsa, arxitektura onu qəbul edə bilməlidir — məsələn, mövcud e-ticarət datası üzərində AI ilə tövsiyə sistemi qurmaq.

> Future-proof arxitekturanın klassik nümunəsi — RESTful API üzərində qurulmuş, zəif-bağlı (loosely coupled) mikroservis arxitekturasıdır. Belə sistemlər yeni tələblərə asan genişlənir və problemsiz inteqrasiya olunur.

Arxitektor tələblərdəki böyük dəyişikliklərə diqqət yetirir və risk azaldan planlar hazırlayır — çünki dəyişiklik gələcək, sual sadəcə nə vaxt.

---

## Buraxılışdan sonra: işləkliyi qorumaq

Məhsul canlıya çıxdı — arxitektorun işi bitdi? Xeyr. Buradan sonra rolu davam edir.

İstifadəçi bazası və yük artdıqca arxitektor məhsulu **necə miqyaslamağı** bilməlidir ki, tələbi qarşılasın və istifadəçini incitmədən yüksək əlçatanlıq (high availability) təmin etsin.

Gözlənilməz hadisələrdə — məsələn, elektrik kəsilməsində — arxitektor müxtəlif komandalara (infrastruktur, IT dəstək, deploy komandası) rəhbərlik edir və **fəlakətdən bərpa (disaster recovery)** planını işə salır ki, biznes prosesləri dayanmasın.

Burada iki vacib göstərici var:

- **RPO** (Recovery Point Objective) — təşkilat nə qədər data itkisinə dözə bilər. Məsələn, "15 dəqiqəlik data itkisi qəbul olunandır" deməkdir.
- **RTO** (Recovery Time Objective) — sistem normal işə nə qədər müddətə qayıtmalıdır.

Performans problemləri yaranırsa, arxitektor sistemi **horizontal** (tətbiqin dar boğazları üçün) və ya **vertikal** (verilənlər bazasının dar boğazları üçün) miqyaslamağa kömək edir.

Arxitektor həm də monitorinq datasına baxıb NFT-ni dəyişə bilər. Konkret nümunə: istifadəçilər səhifə 3 saniyədən çox yüklənəndə onu tərk edir. Arxitektor bu cür problemləri görür və həll edən komandaya rəhbərlik edir.

---

## Texnologiya evangelizmi

İndi işin ən şirin hissəsinə keçək — **evangelizm**.

Arxitektor məhsulun və platformanın qəbulunu sürətləndirmək üçün onlar haqqında açıq meydanlarda danışır: bloq yazır, seminar keçir, real dünyada faydalarını nümayiş etdirir.

Beləcə texnologiyaya dəstək yaranır, hətta sənaye standartına çevrilməsinə kömək edir. Amma bunun üçün arxitektor sadəcə texniki bilikli yox, həm də **yaxşı yazan və yaxşı danışan** biri olmalıdır. Susqun dahi burada işə yaramır — ideyanı yaymaq üçün onu satmağı bacarmalısan.

---

## Agile təşkilatlarda arxitektor

Agile modeli getdikcə populyarlaşır və ənənəvi layihə idarəçiliyindən köklü şəkildə uzaqlaşır.

Ənənəvi **şəlalə (waterfall)** modeli xətti və ardıcıldır — bir mərhələ bitməsə, o biri başlamır. Agile isə çevikliyə, birgə işə və uyğunlaşmağa üstünlük verir. Layihə kiçik hissələrə bölünür, hər hissə tez-tez yenidən nəzərdən keçirilir və adaptasiya olunur. Bu, davamlı geri-əlaqəni və sifarişçinin bütün proses boyunca iştirakını təşviq edir.

Dinamik təbiətinə görə Agile xüsusən elə layihələrə uyğundur ki, tələblərin dəyişəcəyi gözlənilir və ya başlanğıcda tam müəyyən deyil.

Agile və arxitektura barədə bir neçə **mif** var:

- "Arxitektura çox mürəkkəbdir, Agile-da dizaynı dərhal və ya növbəti sprintdə təqdim etməlisən";
- "Agile arxitekturası bu cür dizayn üçün kifayət qədər dayanıqlı deyil";
- "Onu test etmək mümkün deyil".

Həqiqətdə isə Agile mühitdə arxitektor **iterativ yenidən baxma** konsepsiyasına əməl edir: həllini təhlil edir, tələb dəyişikliklərinə uyğunlaşdırır.

İş bunlara gəlib çıxır: korporativ mühit üçün düzgün həll seçmək, kommunikasiyanı sazlamaq, davamlı geri-əlaqə almaq və adaptiv modelləşdirmə. Komandaya həm möhkəm arxitektura təməli, həm dəyişən tələblərə uyğunlaşma bacarığı lazımdır — bunun üçün onlara arxitektorun rəhbərliyi və mentorluğu gərəkdir.

> Agile arxitekturası dəyişikliyin qiymətini azaltmaqdır: lazımsız tələbi yenidən baxandan sonra atmaq, səhv tələbi tez ləğv etmək üçün çərçivə qurmaq.

Agile arxitektor prototiplər qurur ki, riskləri anlasın və minimuma endirsin, bütün steykholderlərin ehtiyacları arasında balans saxlasın və digər modullarla asan inteqrasiya olunan zəif-bağlı arxitektura qursun. Praktikada bu — mikroservis arxitekturaları, test framework-lərinin avtomatlaşdırılması və davamlı deploy pipeline-ı deməkdir.

---

## İşin tipik çətinlikləri

Rol maraqlı və dinamikdir, amma çətinliksiz deyil. Bunları anlamaq və aşmaq bacarığı uğur üçün mütləqdir. Ən çox rast gəlinənlər:

- **Biznes və texniki tələblər arasında balans** — biznes məqsədini ödəmək, eyni zamanda texniki cəhətdən yaşaya bilən həll qurmaq. Hər iki tərəfi anlayıb optimal nöqtəni tapmaq lazımdır.
- **Mürəkkəbliyi idarə etmək** — arxitektor tez-tez başa düşülməsi və inteqrasiyası çətin olan sistemlərlə işləyir. Müxtəlif komponentlər arasında problemsiz qarşılıqlı təsir təmin etməlidir.
- **Texnoloji yenilikləri izləmək** — hər gün yeni alət, framework və metodologiya çıxır. Arxitektor gündəmdə qalmalıdır ki, innovativ həllər versin.
- **Steykholderlərlə iş** — biznes rəhbərləri, developerlər, layihə menecerləri, son istifadəçilər. Fərqli gözləntiləri, tələbləri və prioritetləri idarə etmək çətindir. Effektiv kommunikasiya və danışıqlar bacarığı burada həlledicidir.
- **Miqyaslanma və performans** — artan data həcmi, istifadəçi yükü və dəyişən biznes tələbləri ilə başa çıxan həllər qurmaq.
- **Təhlükəsizlik və uyğunluq (compliance)** — etibarlı təhlükəsizlik tədbirləri, şifrələmə üsulları və konfidensial datanı qoruyan çərçivələr tətbiq etmək.
- **Ziddiyyətli tələbləri həll etmək** — müxtəlif steykholderlərin tələbləri çox vaxt toqquşur. Arxitektor plüs-minusları təhlil edib ümumi məqsədə uyğun kompromis seçməlidir.
- **Layihə məhdudiyyətlərini idarə etmək** — məhdud büdcə, vaxt və resursla işləmək, resursları optimallaşdırmaq.
- **Buluda miqrasiya** — bulud platformalarını və servislərini səmərəli istifadə etmək, dizayn nüanslarını bilmək.
- **Davamlı öyrənmə** — texnologiya sürətlə dəyişir, ona görə arxitektor daim öyrənməyə vaxt ayırmalıdır.

> Bu problemləri əvvəlcədən görüb tədbir alan arxitektor həm biznes məqsədlərinə, həm texniki tələblərə uyğun uğurlu həllər çatdıra bilir.

---

## Karyera yolu: bu peşəyə necə gəlinir?

İndi əsas suala keçək: bir insan həll arxitektoru olana qədər hansı pillələrdən keçir? Yol təşkilatdan, sahədən və şəxsi məqsədlərdən asılıdır, amma ümumi istiqamət belədir.

**Təhsil.** Adətən computer science, proqram mühəndisliyi və ya yaxın sahədə bakalavr dərəcəsi tələb olunur. Proqram təminatının işlənməsi, sistem dizaynı və IT konsepsiyalarında möhkəm təməl vacibdir.

**Peşəkar təcrübə.** Arxitektorlar çox vaxt karyeraya **developer**, sistem analitiki və ya texniki məsləhətçi kimi başlayır. Real proqram həllərinin dizaynı və reallaşdırılması təcrübəsi tətbiqlərin necə qurulduğunu və IT infrastrukturunu dərindən anlamağa kömək edir.

**Dizayn və arxitekturaya keçid.** Karyera böyüdükcə peşəkar həll dizaynı və arxitektura rollarına keçir: steykholderlərlə sıx işləyir, biznes tələblərini təhlil edir, miqyaslanan və qənaətli həllər dizayn edir. Burada **TOGAF** (The Open Group Architecture Framework) və ya **Zachman Framework** kimi metodologiyalar iş verir.

---

## Hansı bacarıqları inkişaf etdirmək lazımdır?

Karyera perspektivini yüksəltmək üçün arxitektor bu sahələrdə özünü çəkməlidir:

- **Texniki biliklər** — tətbiq işləməsi, verilənlər bazası, şəbəkələr, bulud, təhlükəsizlik. Geniş spektr lazımdır və daim genişlənməlidir.
- **Kommunikasiya və birgə iş** — texniki konsepti qeyri-texniki steykholderə başa salmaq, müzakirələrdə fasilitator olmaq, konsensus qurmaq. Bu, kross-funksional komandalar üçün həyati vacibdir.
- **Biznes anlayışı** — texnoloji qərarları biznes məqsədləri ilə koordinasiya etmək. Təşkilatın strategiyasını və sahə dinamikasını anlamaq.
- **Liderlik və idarəetmə** — arxitektor komandalara və layihələrə rəhbərlik edə bilər. Layihə idarəçiliyi və strateji planlama bacarıqları gərəkdir.
- **Davamlı öyrənmə** — yeni texnologiyalar, sənaye praktikaları və arxitektura pattern-ləri. Sertifikatlar və konfranslar burada kömək edir.

---

## Bulud biliyi — müasir arxitektorun mütləqi

Bu gün bulud (cloud) həll arxitekturalarının ayrılmaz hissəsidir. Bulud platformaları miqyaslanma, çeviklik və qənaət verir, üstəlik AI, big data analitikası və IoT kimi müasir texnologiyalara qapı açır.

Arxitektorun bilməli olduğu bulud sahələri:

- **Bulud platformaları** — AWS, Microsoft Azure, Google Cloud Platform (GCP). Əsas servisləri, pattern-ləri, miqyaslanma və təhlükəsizlik vasitələrini bilmək.
- **Bulud arxitekturası** — yüksək əlçatanlıq və miqyaslanma ilə dizayn, xətadan qorunan sistemlər, xərc və performans optimallaşdırması.
- **Bulud təhlükəsizliyi** — şifrələmə, identifikasiya və giriş idarəçiliyi (IAM), buluda xas uyğunluq standartları.
- **Bulud yaddaşı və bazaları** — obyekt, blok və fayl yaddaşları arasında düz seçim; Amazon RDS, Azure SQL Database, Google Cloud Spanner kimi servislər.
- **Bulud sertifikatları** — AWS Certified Solutions Architect, Microsoft Certified: Azure Solutions Architect Expert, Google Cloud Certified — Professional Cloud Architect. Bunlar buludda dizayn və reallaşdırma peşəkarlığını sübut edir.

> Bulud biliyi və sertifikatları arxitektorun bacarıq dəstini genişləndirir, güvəni artırır və getdikcə buluda yönələn sənayedə rəqabət üstünlüyü verir.

---

## Sona qədər

Gəlin geriyə baxaq. Bu seriyaya "həll arxitektoru kimdir?" sualı ilə başladıq, sonra rolun tiplərini və gündəlik məsuliyyətlərini gördük. Bu yazıda isə dövrəni tamamladıq: texnologiya seçimi → POC və prototip → dizayn → buraxılışdan sonrakı qayğı → evangelizm, üstünə Agile, çətinliklər və karyera yolu.

Əvvəl bəlkə arxitektoru sadəcə "diaqram cızan texniki adam" kimi təsəvvür edirdin. İndi mənzərə fərqlidir: bu, biznes və texnologiyanı bir masada tutan, gələcəyi bu günə qatan, həm kod, həm insanlarla danışan bir rol.

Növbəti fəsillərdə miqyaslanan, dayanıqlı və yüksək performanslı arxitekturaların prinsiplərinə keçəcəyik — təhlükəsizlik tədbirləri, məhdudiyyət altında planlaşdırma, test və avtomatlaşdırma ilə dəyişikliyin reallaşdırılması.

Bəs sən özünü bu yolun harasında görürsən — developer pilləsində, yoxsa artıq arxitektura haqqında düşünən yerdə?
