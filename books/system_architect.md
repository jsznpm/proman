# Həll arxitektoru: koddan yuxarıda dayanan adam

Bu yazıda gəlin bir suala cavab verək: bir proqram təmin təsadüfən deyil, planla ortaya çıxır — bəs o planı kim cızır? Cavab çox vaxt gözdən qaçır, çünki bu adam kod yazmaya da bilər. Söhbət **həll arxitektorundan** (solution architect) gedir — layihənin görünməz onurğa sütunu.

Əgər indiyə qədər "arxitektor" sözünü eşidəndə ağlınıza yalnız binalar gəlibsə, narahat olmayın. Sonda anlayacaqsınız ki, proqram təmin dünyasında da eyni məntiq işləyir: kimsə əvvəlcə bütün mənzərəni görməli, təməli qoymalı və hansı otağın harada olacağını qərara almalıdır. Kərpici sonra hörürlər.

Gəlin başlayaq.

---

## Həll arxitekturası nədir?

Bu sualın cavabı adama, şirkətə görə dəyişə bilər. Amma mahiyyət eynidir: **həll arxitekturası — biznes həllinin müxtəlif tərəflərini əvvəlcədən müəyyən etmək və planlaşdırmaqdır**, həm strateji, həm də taktiki amilləri nəzərə alaraq.

Bu iki baxış bucağını ayırmaq vacibdir, çünki çoxu onları qarışdırır:

- **Strateji baxış** — uzunmüddətli vizyon. Həll (yəni proqram təmin) illər sonra da aktual qalsın, gələcək dəyişikliklərə uyğunlaşsın, istifadəçi tələbləri və iş yükü artdıqca genişlənə bilsin.
- **Taktiki baxış** — bugünkü ehtiyac. Tətbiq indiki iş yükünü daşısın, təşkilatın gündəlik işini səmərəli görsün.

> Həll arxitekturası sadəcə kod deyil. O, bütün sistemi əhatə edir — infrastruktur, şəbəkə, təhlükəsizlik, compliance tələbləri, sistemin istismarı, xərclər və etibarlılıq.

Bütün bu suallara baxaraq həll arxitektoru ətraflı bir plan qurur. Bu plan həm bugünkü biznes ehtiyacını ödəyir, həm də sonrakı böyümə üçün təməl qoyur.

---

## Niyə vacibdir? Yaxşı arxitekturanın faydaları

Sadə bir analogiya: evi layihəsiz tikməyə başlasan, ilk mərtəbə hazır olanda anlayarsan ki, pilləkəni yanlış yerə qoymusan. Sökmək bahalıdır. Proqram təmində də eynidir — yaxşı arxitektura bu "sökülməni" qabaqcadan qarşısını alır.

Layihələr böyüyəndə, komandalar müxtəlif ölkələrə dağılanda aydın müəyyən edilmiş arxitektura birgə işin davamlı və səmərəli qalmasını təmin edir. Konkret faydalar:

- **Texnologiya biznes tələblərinə uyğun olur** — arxitektor hansı texnologiyanın gətirilməli olduğunu qiymətləndirir ki, uzunmüddətdə davamlılıq, saxlanabilirlik və komandanın lazımi bacarığı təmin olunsun.
- **Bazar potensialının qiymətləndirilməsi** — bazar trendləri fasiləsiz təhlil edilir ki, həll müştərinin və biznesin ehtiyacını ödəsin.
- **Vaxt itkisinin minimuma endirilməsi** — arxitektor bütün stakeholder-lərlə (maraqlı tərəflər: biznes komandası, müştərilər, developerlər) daim işləyir, buraxılış qrafiki pozulmasın.
- **Səmərəli birgə iş** — arxitektura bütün tərəflər üçün ortaq istinad nöqtəsidir. Aydın sənədləşdirmə komanda üzvlərinin eyni məqsədi eyni cür başa düşməsini təmin edir.
- **Miqyaslana bilmə (scalability) və çeviklik** — yaxşı dizayn edilmiş sistem biznes böyüdükcə, istifadəçi yükü artdıqca rahat genişlənir, bahalı dəyişikliklərə ehtiyac qalmır.
- **Biznes məqsədlərinə uyğunluq** — arxitektura biznes məqsədlərini texniki vizyona çevirir və yeni, sürətlə dəyişən tələblərə uyğunlaşacaq qədər çevik olmalıdır.
- **Daha yaxşı resurs planlaması** — təşkilat lazımi resursun növünü və miqdarını dəqiq müəyyən edə bilir; insan resursu, maliyyə və vaxt strateji planlanır.
- **Daha yaxşı büdcə proqnozu** — nələrin lazım olduğu aydın olduqda xərclər dəqiq proqnozlaşdırılır, büdcə aşımı riski azalır.
- **Risklərin azaldılması** — riskləri erkən mərhələdə görüb tədbir görmək olur: backup planları, redundancy (ehtiyat qat), təhlükəsizlik amilləri, fəlakətdən bərpa (disaster recovery) planları.
- **İnvestisiyanın qaytarılmasının (ROI) artması** — arxitektura avtomatlaşdırma ilə xərcləri azaltmağa, itkiləri aradan qaldırmağa təkan verir.
- **Layihə müddətlərinin müəyyən edilməsi** — dizayn mərhələsində hansı resurs və səyin lazım olacağını aşkarlayaraq real vaxt hesabı qurulur.

İndi isə maraqlı hissəyə keçək — bütün bunları edən adam gündəlik olaraq nə ilə məşğuldur?

---

## Həll arxitektorunun rolu

Əgər bir həllin necə düzgün təşkil olunub çatdırıldığı sizi maraqlandırırsa, bilin: bunu müəyyən edən əsas adam məhz həll arxitektorudur. O, sistemi bütöv halda layihələndirir və müxtəlif qrupların fərqli sistemlərinin bir-birinə necə qoşulacağını (inteqrasiya) həll edir.

Arxitektor gözlənilən nəticəni biznes-stakeholder-lərlə birlikdə müəyyən edir və texniki komandanın çatdırılma məqsədlərini dəqiq anlamasını təmin edir. Yəni o, **biznes dili ilə texniki dil arasında tərcüməçidir**.

### Həllin çatdırılma dövrü (delivery lifecycle)

Arxitektor həllin bütün mərhələlərində iştirak edir:

1. **Biznesin tələbləri və vizyonu** — arxitektor biznes-stakeholder-lərlə işləyib onların vizyonunu anlayır.
2. **Tələblərin təhlili və texniki vizyon** — biznes strategiyasını icra edəcək texniki vizyon müəyyən olunur.
3. **Prototipləmə və tövsiyələr** — texnologiya seçilir, konsepsiya yoxlaması (POC, proof of concept) aparılır, prototiplər göstərilir.
4. **Həllin dizaynı** — təşkilat standartlarına uyğun, digər maraqlı qruplarla əməkdaşlıqda həll işlənir.
5. **Development** — arxitektor developer komandası ilə birlikdə həlli qurur; biznes və texniki komandalar arasında körpü olur.
6. **İnteqrasiya və test** — yekun həllin bütün funksional və qeyri-funksional tələblərə uyğun işlədiyi yoxlanılır.
7. **Reallaşdırma (deployment)** — development və deployment komandaları ilə problemsiz buraxılış təmin olunur.
8. **İstismar və dəstək** — logging və monitorinq işləyir, lazım gələndə arxitektor miqyaslama və nasazlıqdan bərpa işini istiqamətləndirir.

Bu dövr **iterativdir** — dairəvi. Tətbiq production-a çıxıb istifadə olunmağa başlayanda müştəri geri-bildirimindən yeni tələblər doğur, bu da növbəti təkmilləşmələrin vizyonuna təsir edir.

Dizayn mərhələsində arxitektorun məsuliyyətləri:

- həll standartlarının sənədləşdirilməsi;
- yüksək səviyyəli dizaynın müəyyən edilməsi;
- sistemlərarası inteqrasiyanın təyini;
- həllin fazalarının müəyyən edilməsi;
- reallaşdırma yanaşmasının təyini;
- monitorinq və xəbərdarlıq üsulunun müəyyən edilməsi;
- dizaynın güclü və zəif tərəflərinin sənədləşdirilməsi;
- audit və compliance tələblərinin sənədləşdirilməsi.

Bundan əlavə arxitektor layihə rəhbərlərinə resurs və xərc qiymətləndirməsində, müddət və əsas nöqtələrin (milestone) təyinində, buraxılış və dəstək planında kömək edir.

---

## İki böyük tip: geniş profilli və ixtisaslaşmış arxitektorlar

Bütün həll arxitektorlarını iki qrupa bölmək olar:

- **Geniş profilli arxitektorlar (generalist)** — müxtəlif texniki sahələrdə geniş bilikləri var. Bütöv mənzərəni görürlər, kompleks rəhbərlik edə bilirlər.
- **İxtisaslaşmış həll arxitektorları (SSA, Specialist Solution Architect)** — konkret sahədə dərin bilik: Big Data, təhlükəsizlik, şəbəkə və ya sahəvi mövzular. Öz zonasında texniki lider olurlar.

Praktikada geniş profilli arxitektor tez-tez SSA ilə birgə işləyir — beləcə həm geniş, həm dərin bilik bir araya gəlir, arxitekturanın bütövlüyü qorunur.

İndi hər iki qrupun konkret rollarına baxaq.

---

## Geniş profilli arxitektor rolları

### Korporativ həll arxitektoru (Enterprise Architect)

Heç düşünmüsünüz ki, IT sənayesində məhsullar necə buraxılır? Burada korporativ həllər işə düşür — onlar best practice-ləri, mədəniyyəti və uyğun texnologiyaları müəyyən edir.

Korporativ arxitektor stakeholder-lər, sahə ekspertləri və rəhbərliklə sıx işləyir, təşkilat üçün IT strategiyalarını təyin edir. Ən vacib işlərdən biri — şirkətin istifadə edəcəyi texnologiyaların yekun seçimi və onların ardıcıl, bütöv tətbiqinə nəzarətdir.

Digər mühüm iş **biznes-arxitekturanın** müəyyən edilməsidir — o, təşkilat strategiyası ilə onun uğurlu tətbiqi arasındakı boşluğu doldurur, ümumi strategiyanı konkret icra edilə bilən addımlara çevirir.

> Fərq belədir: **həll arxitektoru** konkret layihəyə fokuslanır. **Korporativ arxitektor** strateji səviyyədə işləyir — bütün IT-infrastruktura və təşkilat strategiyasına nəzarət edir, müxtəlif şöbələrin arxitektorlarının nəticələrini bir araya gətirir.

### Tətbiq arxitektoru (Application Architect)

Bəzən **proqram arxitektoru** da deyilir. Proqram məhsullarının həm sənaye best practice-lərinə, həm də təşkilat standartlarına uyğunluğunu təmin edir. Fərqli komandalarla işləyib digər proqram modulları ilə inteqrasiya qaydasını müəyyən edir.

Nümunə: bir səhiyyə təşkilatında yeni xəstə idarəetmə sistemi mövcud elektron tarixçə sistemləri ilə problemsiz inteqrasiya etməlidir — həm qanunvericilik, həm daxili protokollara uyğun. Maliyyə qurumunda arxitektor yeni bank tətbiqinin mövcud transaction emalı sistemləri ilə **təhlükəsiz** inteqrasiyasına nəzarət edir.

Əsas məsuliyyətlər:

- dizayn edilən API-ların səmərəli və optimal işləməsinə nəzarət;
- scalability tələblərinin nəzərə alınması — məhsul artan yükü daşısın;
- digər komponentlərlə problemsiz inteqrasiya;
- mühəndis komandasından gələn texniki sorğular üçün əlaqə nöqtəsi olmaq.

Kiçik layihələrdə ayrıca tətbiq arxitektoru olmaya bilər — bu işi çox vaxt senior mühəndis öz üzərinə götürür. Arxitektor həm də **mentor** rolundadır: komandanı istiqamətləndirir, çətinlikləri həll edir.

### Bulud arxitektoru (Cloud Architect)

Bu rol yalnız son on ildə peyda oldu, amma korporativ mühitlərdə buluda keçidin sürətlənməsi ilə son dərəcə tələb olunan bir peşəyə çevrildi.

Bulud arxitektoru şirkətin cloud computing strategiyalarını hazırlayır və reallaşdırır. AWS (Amazon Web Services), Microsoft Azure və GCP (Google Cloud Platform) kimi ictimai platformaların populyarlığı bu rolu vacib etdi.

Əsas işlər:

- mövcud iş yüklərinin buluda köçürülməsi (migration) — tam migration strategiyaları qurur;
- hibrid bulud arxitekturaları — lokal tətbiqlərlə bulud resurslarının hamar inteqrasiyası;
- sıfırdan başlayan startaplar üçün **cloud-native** arxitekturalar — "istifadə etdikcə ödə" (pay-as-you-go) modeli ilə xərc optimizasiyası.

### Arxitektor-evangelist (Technology Evangelist)

Bu rol marketinqə güclü təsir edir, xüsusən mürəkkəb həll platformaları kontekstində. Rəqabətli mühitdə insanlar dərin bilikli ekspertin məsləhətini axtarır — bax bu ekspert arxitektor-evangelistdir.

O, arxitektura konsepsiyalarını, problemləri və bazar trendlərini dərin bilir, müştəri və partnyorlar üçün etibarlı məsləhətçiyə çevrilir. Platformanın bazardakı mövqeyini genişləndirərək gəlirin artmasına təkan verir.

Auditoriyanı cəlb etmək üçün: bloqlar, ağ sənədlər (white paper), məqalələr yazır; sammit, konfrans, texniki seminarlarda çıxış edir; öyrədici bələdçilər dərc edir. Əla yazılı və şifahi ünsiyyət bacarığı şərtdir. Onlar əslində **influencer-dir** — məhsulu geniş auditoriyaya tanıdan.

---

## İxtisaslaşmış həll arxitektorları (SSA)

İndi dərin biliyə söykənən rollara keçirik. Bunlar konkret sahələrə fokuslanır, spesifik problemləri həll edir.

### İnfrastruktur arxitektoru

Əsasən korporativ IT-infrastrukturun dizaynı, təhlükəsizlik və dата-mərkəzlərin (data center) işi ilə məşğuldur. Serverlərdən ayrı-ayrı iş sahələrinə qədər bütün IT resurslarını planlaşdırır: proqram standartları qoyur, sistem yeniləmələri və patch quraşdırmalarını koordinasiya edir.

Əsas məsuliyyət — **təhlükəsizlik**: bütün mühitləri virus hücumlarından qorumaq, disaster recovery planlaması və backup ilə biznesin fasiləsizliyini təmin etmək.

Klassik çətinlik nümunəsi — onlayn mağazalarda pik dövrlərin planlaşdırılması (ABŞ-da Thanksgiving, Kanada/Böyük Britaniyada Boxing Day, Hindistanda Diwali). Pik zamanı iş yükü adi haldan **10 dəfə** yüksək ola bilər. Arxitektor kifayət qədər server və storage gücü hazırlamalıdır — amma ilin qalan hissəsində bu sistem boş dayanacaq.

> Məhz buna görə bulud platformaları qurtarıcıdır: on-demand miqyaslama ilə pik dövrdə əlavə güc alırsan, sonra azaldırsan — xərci nəzarətdə saxlayırsan.

Bulud kontekstində **bulud infrastruktur arxitektoru** var — AWS, Azure, GCP üzərində IT-infrastrukturların dizaynı və idarəsi ilə məşğul olur. Ümumən infrastruktur arxitektoru data-mərkəz işini yaxşı bilməlidir: qızdırma, soyutma, təhlükəsizlik, montaj, serverlər, storage, backup, load balancer-lər, virtuallaşdırma və s.

### Şəbəkə arxitektoru (Network Architect)

Bir neçə ofisi olan böyük təşkilatlar necə uğurla ünsiyyət qurur? Bunu şəbəkə arxitektoru təmin edir.

O, kompüter şəbəkələrini layihələndirir: LAN (lokal şəbəkə), WAN (qlobal şəbəkə), intranet və digər kommunikasiya sistemləri. Aşağı gecikmə (latency) və yüksək performans təmin edir. İstifadəçi iş yerləri ilə daxili şəbəkə arasında VPN (virtual private network) ilə təhlükəsiz bağlantı qurur.

İnfrastruktur arxitektoru ilə sıx işləyir, bəzən rollar üst-üstə düşür. Təhlükəsizlik komandası ilə birgə firewall dizayn edir, şəbəkəni packet izləmə, port skanı, IDS (Intrusion Detection System) və IPS (Intrusion Prevention System) ilə qoruyur. DNS marşrutlaşdırmasını optimallaşdırır, load balancer-ləri konfiqurasiya edir.

### Data arxitektoru (Data Architect)

Məlumat həcminin partlayışlı artdığı bir dövrdəyik — hər həlldə mərkəzi yeri data tutur: müştəri məlumatı, məhsul təsviri və ya mürəkkəb data dəstlərindən çıxarılan nəticələr. Həcm gigabaytdan terabayta və yuxarı qalxdıqca data idarəetməsi kritik olur.

Bu rol bəzən **analitika arxitektoru** və ya **big data arxitektoru** adlanır. (Diqqət: bu, database arxitektoru deyil — o yalnız Oracle, RDS kimi relational bazalardakı struktur data ilə məşğuldur.)

Ənənəvi olaraq data struktur halında relational bazalarda saxlanırdı. Amma sosial media, IoT (Internet of Things — əşyaların interneti) və tətbiq logları kimi mənbələrdən **qeyri-struktur** data artdıqca vəziyyət dəyişdi. Data arxitektoru təşkilatın data strategiyasını formalaşdıran vizyonerdir: qayda, siyasət, standart və modelləri müəyyən edir.

Geniş dairə ilə işləyir — rəhbərlik, analitiklər, data mühəndisləri, data scientist-lər, developerlər. BI (Business Intelligence) alətləri ilə vizuallaşdırmadan tutmuş ML (maşın öyrənməsi) metodlarına qədər. Məsuliyyət diapazonu geniş: uyğun DB texnologiyası seçimi, struktur/qeyri-struktur data üçün saxlama variantları, streaming və batch emalı, **data lake** (mərkəzləşmiş data anbarı) dizaynı, data təhlükəsizliyi və şifrələmə, data warehouse və **data mart** qurulması.

### Maşın öyrənməsi arxitektoru (ML Architect)

AI (süni intellekt) və ML erasında bu rol nəhəng əhəmiyyət qazandı. Təşkilatlar həllərində ML-dən daha çox istifadə etdikcə etibarlı ML arxitekturaları qura biləcək ekspertlərə ehtiyac artdı.

ML arxitektoru sistem düşüncəsini tətbiq edərək ML-i korporativ proqram stack-inə daxil edir. Ən uyğun alət və texnologiyaları seçir, ML-i dəstəkləyən data arxitekturasını formalaşdırır — səmərəli data ingestion (udulma), emal və saxlama.

Əsas işlər:

- mövcud stack-i ML imkanları üçün dəyişmək: ML framework, kitabxana və API-ları ekosistemə daxil etmək;
- data ön-emalı, modelin öyrədilməsi (training) və deployment;
- **ML həllərinin istismarı** — modellərin fasiləsiz monitorinqi və təkmilləşdirilməsi mexanizmləri ki, performans, dəqiqlik və etibarlılıq zamanla optimal qalsın.

ML arxitektoru best practice-ləri, performans optimizasiyası, təhlükəsizlik, compliance, xərc optimizasiyası və operational excellence mövzularında dərin bilməlidir — həm də müasir ML stack-lərinin cloud-native yönümünü nəzərə almalıdır.

### Generativ AI arxitektoru (GenAI Architect)

ML-dən əlavə sürətlə inkişaf edən başqa bir sahə — **generativ süni intellekt (GenAI)**. O, insana bənzər idraki (koqnitiv) imkanlara malik intellektual sistemlər qurmağa fokuslanır.

Generativ AI arxitektoru konkret ssenaridən kənara çıxan qabaqcıl AI sistemlərini dizayn edir. Öyrəndiyi texnologiyalar: deep learning (dərin öyrənmə), reinforcement learning (gücləndirmə ilə öyrənmə), natural language processing (təbii dil emalı) və computer vision (kompüter görməsi). Məqsəd — real vaxtda mühakimə yürüdən, öyrənən və uyğunlaşan sistemlər.

Neyron şəbəkələr, koqnitivistika və hesablama modellərində təcrübəsini birləşdirərək maşınların mürəkkəb datanı anlaması, qərar verməsi və insan intellektini modelləşdirən şəkildə problem həll etməsini təmin edən arxitekturalar qurur.

Bu iş etika sualları, qeyri-müəyyənlik və çoxmənalılıqla üzləşir. Arxitektor məhdud datadan öyrənən, biliyi sahələr arası ötürən və dinamik, gözlənilməz mühitlərdə sabit işləyən sistemlər qurmağa çalışır.

---

## Sona qədər: koddan böyük şəkil

Başladığımız suala qayıdaq. **Əvvəl** ağlınıza yalnız kod yazan bir developer gəlirdisə, **indi** görürsünüz ki, bir həllin arxasında bütöv bir orkestr dayanır: kimsə strateji vizyonu cızır, kimsə serveri planlayır, kimsə şəbəkəni qurur, kimsə datanı, kimsə ML modelini, kimsə isə bunu bazara danışır.

Həll arxitektoru bu orkestrin dirijorudur. O, kod da yaza bilər, amma əsas dəyəri odur ki, **bütün sistemi bir bütöv kimi görür** — bu gün nə lazımdır və beş il sonra nə lazım olacaq.

Bir çox təşkilatda bu rollar üst-üstə düşür, bir adam bir neçə şapka geyinə bilər. Sizin komandanızda hansı arxitektor tipi çatışmır — sizcə?

# Həll arxitektoru əslində nə iş görür? Məsuliyyətlərin içinə baxaq

Əvvəlki yazıda arxitektor tiplərini — bulud, data, ML, şəbəkə — bir-bir tanıdıq. Amma bir sual yarımçıq qaldı: bütün bu adamlar konkret olaraq **hər gün nə edir**? Bir layihə masaya qoyulanda ilk kim danışır, kim son sözü deyir?

Bu yazıda gəlin qalan üç ixtisas arxitektorunu — təhlükəsizlik, DevOps və sahəvi arxitektoru — tanıyaq, sonra isə əsas mövzuya keçək: **həll arxitektorunun real məsuliyyətləri**. Sonda görəcəksiniz ki, bu rol texniki bilikdən çox daha genişdir.

Başlayaq.

---

## Təhlükəsizlik arxitektoru (Security Architect)

Rəqəmsal dünyada təşkilatların və sistemlərin data təhlükəsizliyi birinci plana çıxır. Potensial təhdid və zəifliklərə (vulnerability) qarşı etibarlı müdafiə qurmaq üçün **təhlükəsizlik arxitektoru** açar fiqura çevrilir.

O, təşkilatda təhlükəsizliyi qorumaq üçün müxtəlif komandalar və xarici developerlərlə əməkdaşlıq edir. Şəbəkələr və kompüterlər üçün uyğun həllərin dizaynı və reallaşdırılması, şirkətin informasiya sistemləri, şəbəkələri və vebsaytlarının qorunması onun məsuliyyətidir.

Bundan əlavə açar rol oynadığı sahələr:

- **Zəiflik testi (vulnerability testing)** — sistemdəki gizli zəif nöqtələri aşkar etmək;
- **Risk təhlili** — nəyin necə səhv gedə biləcəyini qiymətləndirmək;
- **Təhlükəsizlik auditi** — potensial boşluqları tapıb onları aradan qaldırma strategiyası qurmaq.

Onun gündəlik işlərinə firewall, VPN, marşrutlaşdırıcı (router) və digər təhlükəsizlik tədbirlərinin quraşdırılmasını **rəy verib təsdiqləmək** daxildir. Təhlükəsizlik proseslərini ciddi test edir ki, effektivliyini yoxlasın və təhlükəsizlik komandalarına texniki rəhbərlik versin.

> Sənaye standartlarına və normalara uyğunluq (compliance) rolun ən vacib tərəflərindəndir — o, tətbiqlərin lazımi təhlükəsizlik protokollarına əməl etməsini, datanın düzgün şifrələnib əlçatan qalmasını təmin edir.

Təhlükəsizlik arxitektoru texnologiyaları, alətləri və ayrı-ayrı üsulları dərindən bilir. Həm də bütöv təhlükəsizlik arxitekturaları qurmağı — data, şəbəkə, infrastruktur və tətbiqləri əhatə edən — yaxşı bacarır. Onun təcrübəsi təşkilatı kiber-təhdidlərdən qorumaqda, konfidensiallıq, bütövlük və əlçatanlığı yoxlamaqda həlledicidir.

---

## DevOps arxitektoru (DevOps Architect)

Müasir dinamik və rəqabətli mühitdə təşkilatlar tətbiqləri daha sürətli, səmərəli və keyfiyyətli çatdırmaq istəyir. Bu nöqtədə **DevOps arxitektoru** önə çıxır.

DevOps — development və istismar (operations) komandalarını bir-birinə bağlayan, problemsiz birgə işi mümkün edən əməkdaşlıq metodologiyasıdır. DevOps arxitektoru bu əməkdaşlığı inkişaf etdirir və məhsul həyat dövrünü avtomatlaşdıran alət və praktikaları tətbiq edir.

Əsas məsuliyyət — **CI/CD pipeline-ları** qurmaq və optimallaşdırmaq:

> CI/CD — Continuous Integration / Continuous Deployment (davamlı inteqrasiya / davamlı reallaşdırma). Koddakı hər dəyişiklik avtomatik test olunur və problemsiz production-a çıxarılır.

Build, test və deployment proseslərini avtomatlaşdırmaq təşkilatlara səhvləri azaltmağa, buraxılış dövrünü sürətləndirməyə və çatdırılmanın etibarlılığını artırmağa imkan verir.

Digər mühüm sahə — **infrastrukturun kod kimi idarəsi**:

> IaC — Infrastructure as Code (infrastruktur kod kimi). Server, şəbəkə kimi resurslar əl ilə deyil, kodla — Chef, Puppet, Ansible, Terraform kimi alətlərlə — təyin və avtomatlaşdırılır.

Bu, komandaya mühitləri yaratmağı, replikasiya etməyi və idarə etməyi asanlaşdırır, daha çox çeviklik və scalability verir.

Digər məsuliyyətlər:

- **Monitorinq və xəbərdarlıq** — tətbiq, infrastruktur və təhlükəsizlik insidentlərini fasiləsiz izləyən həllər. Problem yaranan kimi avtomatik xəbərdarlıq lazımi komandaya gedir, cəld reaksiya təmin olunur.
- **Fəlakətdən bərpa (disaster recovery)** — sistem çökəndə minimum data itkisi və dayanma vaxtı ilə bərpanı təmin edən strategiyalar. Burada iki kritik parametr var:

> **RPO** (Recovery Point Objective, bərpa nöqtəsi hədəfi) — nə qədər data itkisinə dözmək olar. **RTO** (Recovery Time Objective, bərpa vaxtı hədəfi) — sistemi bərpa etmək üçün nə qədər vaxt qəbul ediləndir.

Qabaqlayıcı fəlakət planlaması təşkilata potensial pozuntuların təsirini minimuma endirməyə və biznesin fasiləsizliyini qorumağa imkan verir.

---

## Sahəvi arxitektor (Industry Architect)

Sahəvi arxitektor konkret bir sənayeyə və ya vertikala uyğunlaşdırılmış həllərin dizaynı ilə məşğul olan mütəxəssisdir. Konkret sahədə dərin bilik və təcrübəsi var, o sahəyə xas problemləri, tələbləri və qaydaları yaxşı anlayır.

O, stakeholder-lərlə — yüksək rəhbərlik, sahə ekspertləri və texnologiya komandaları — sıx işləyir ki, sənayenin konkret ehtiyaclarını və məqsədlərini dəqiq anlasın. Sahə trendlərini, yeni texnologiyaları və best practice-ləri təhlil edərək sənaye məqsədlərinə uyğun arxitektura strategiyaları qurur.

Əsas işi — biznes tələblərini konkret sahəyə xas texniki həllərə çevirməkdir. Sahədaxili tətbiqləri, sistemləri və platformaları dizayn edir. Bunu edərkən compliance, data konfidensiallığı, scalability və uyğunluq (compatibility) kimi amilləri nəzərə almalıdır.

Bundan əlavə təşkilatın sahədəki innovasiyalardan geri qalmamasını təmin edir — yeni texnologiya, alət və framework-ləri fasiləsiz qiymətləndirir ki, rəqabət üstünlüyü versin. Birgə iş və ünsiyyət bacarıqları burada kritikdir, çünki geniş dairə ilə — rəhbərlik, developerlər, data analitikləri və tənzimləyici orqanlarla — işləyir.

### Sahələr üzrə nümunələr

- **Maliyyə sahəvi arxitektoru** — maliyyə qurumları üçün həllər; mürəkkəb norma və standartları, təhlükəsizlik ehtiyaclarını anlayır. Risk idarəsi, fırıldaqçılığın aşkarı (fraud detection) və compliance həlləri qurur.
- **İstehsalat (manufacturing) sahəvi arxitektoru** — avtomobil sənayesi, istehlak malları kimi sektorlar üçün həllər. Fokus: tədarük zəncirinin (supply chain) optimizasiyası, istehsal planlaması və sənaye IoT (əşyaların interneti).
- **Pərakəndə (retail) sahəvi arxitektoru** — POS sistemləri, CRM, omni-kanal qarşılıqlı əlaqə. Fokus: data təhlükəsizliyi, fiziki və rəqəmsal satış kanallarının inteqrasiyası.
- **Səhiyyə sahəvi arxitektoru** — elektron tibbi kartlar, xəstə idarəetməsi və telemedisina sistemləri. Fokus: konfidensiallıq, təhlükəsizlik və səhiyyədə compliance.

Bunlar yalnız bir neçə nümunədir. Hər sənayenin özünəməxsus problemləri və texnoloji mühiti var, sahəvi arxitektor da bu spesifik ehtiyaclara cavab verən ixtisaslaşmış həllər qurur.

SSA (ixtisaslaşmış həll arxitektoru) rolu sahələrdən də kənara çıxır — konkret SaaS provayderləri (Salesforce, ServiceNow, Databricks, Snowflake), korporativ tətbiqlər (SAP, VMware, Microsoft, Oracle) və bulud platformaları (AWS, GCP, Azure) üzrə də ixtisaslar var.

İndi isə əsas mövzuya keçək — bütün bu rolların mərkəzində dayanan **həll arxitektorunun məsuliyyətləri**.

---

## Həll arxitektorunun məsuliyyətləri

Həll arxitektoru müştəri ilə birbaşa təmasda olan texniki liderdir — bu da onun məsuliyyət dairəsini genişləndirir. Baş məsuliyyəti: **təşkilatın biznes-vizyonunu texniki həllə çevirmək** və biznes ilə texnologiya stakeholder-ləri arasında körpü qurmaq.

Məsuliyyətlər təşkilatın təbiətinə görə dəyişir:

- **Konsaltinq şirkətlərində** arxitektor tez-tez konkret bir layihəyə və müştəriyə həsr olunur.
- **Məhsul yaradan şirkətlərdə** isə bir neçə müştəri ilə işləyə bilər — onları məhsula öyrədir, həll dizaynlarını qiymətləndirir.

Arxitektor tətbiq həyat dövrünün müxtəlif mərhələlərində fərqli işlər görür, hətta layihə başlamazdan **əvvəl** də:

1. **İlkin planlama** — biznes-stakeholder-lərlə birgə RFR (Request For Response, həll üçün sorğu) sənədini hazırlayıb qiymətləndirir.
2. **Layihə başlayanda** — tələbləri təhlil edib texniki reallaşma imkanını qiymətləndirir, eyni zamanda qeyri-funksional tələbləri (QFT) — scalability, yüksək əlçatanlıq, performans, təhlükəsizlik — müəyyən edir. Məhdudiyyətləri anlayıb texnologiya seçir, POC (Proof Of Concept, konsepsiya yoxlaması) qurur.
3. **Development başlayanda** — komandanın mentoru olur, həm texniki, həm biznes ehtiyaclarını tənzimləyir.
4. **Tətbiq buraxılandan sonra** — onun QFT-lərə uyğun işlədiyini yoxlayır və istifadəçi geri-bildirimi əsasında növbəti iterasiyanı müəyyən edir.

Ümumi məsuliyyət modeli belədir: funksional tələblərin təhlili → qeyri-funksional tələblərin müəyyəni → stakeholder-lərin anlaşılması və cəlbi → arxitektura məhdudiyyətlərinin anlaşılması → texnologiya seçimi → PoC və prototip → həllin dizaynı və çatdırılması → həllin miqyaslanması və texnologiya evangelizmi.

Gəlin bunları bir-bir açaq.

---

## Funksional tələblərin (FT) təhlili

Hər layihənin ilk mərhələsində biznes tələblərinin müəyyən olunması həll dizaynının ən vacib təməlidir. Bu ilkin təsvir müxtəlif profilli — o cümlədən texniki təcrübəli — komandanın cəlbini tələb edir ki, tələblər dəqiq anlaşılsın.

Tələbləri əvvəlcə biznes-stakeholder-lər qoyur. Layihə texnoloji cəhətdən inkişaf etdikcə onlara düzəliş lazım gəlir. Bax bu anda arxitektorun rolu təkcə tətbiqin dizaynında yox, **ümumi biznes nəticəsinin formalaşmasında** da önə çıxır.

Arxitektorlar texniki biliklə kifayətlənmir — biznesi dərin anlayaraq texnologiyanın biznes məqsədlərinə uyğunluğunu təmin edirlər. Layihə rəhbərləri və stakeholder-lərlə sıx işləyib funksional tələbləri texniki həllərlə bağlayır, etibarlı məsləhətçi rolu oynayırlar.

> Layihənin uğuru çox vaxt arxitektorun mürəkkəb tələbləri bütöv, funksional və effektiv həll arxitekturasına çevirmə bacarığından asılıdır.

İki termini ayıraq:

- **Funksional tələblər (FT)** — sistemin **nə etməli** olduğunu göstərir: davranış, funksiya və imkanların təsviri. Birbaşa istifadəçi ilə qarşılıqlı əlaqəyə və tətbiqin görəcəyi işlərə aiddir.
- **Qeyri-funksional tələblər (QFT)** — sistemin bu işləri **necə etməli** olduğunu, keyfiyyət atributlarını (performans, istifadə rahatlığı, etibarlılıq, təhlükəsizlik) müəyyən edir. Konkret davranışa yox, istismar şərtlərinə və istifadəçi təcrübəsinə təsir edən məhdudiyyətlərə aiddir.

---

## Qeyri-funksional tələblərin (QFT) müəyyəni

QFT-lər istifadəçiyə həmişə birbaşa görünmür, amma yoxluğu ümumi təcrübəni pisləşdirib biznesə zərər verə bilər. Kritik QFT-lər: performans, gecikmə (latency), scalability, yüksək əlçatanlıq, fəlakətdən bərpa.

Arxitektor QFT-ləri müəyyən edərkən bu suallara cavab verir:

- **Performans:** Tətbiqin yüklənmə vaxtı nə qədər olacaq? Şəbəkə gecikməsini necə həll edək?
- **Təhlükəsizlik və compliance:** İcazəsiz girişdən necə qoruyaq? Zərərvericilərin hücumundan necə müdafiə edək? Yerli qanunlara və audit tələblərinə necə əməl edək?
- **Bərpa olunabilirlik:** Sistem çökəndə necə bərpa edək? Bərpa vaxtını necə minimuma endirək? İtən datanı necə geri qaytaraq?
- **Xidmət rahatlığı:** Monitorinq və xəbərdarlığı necə qurmaq olar? Tətbiqin dəstəyini necə təmin edək?
- **Etibarlılıq:** Davranışın ardıcıllığına necə əmin olaq? Defektləri necə aşkar edib düzəldək?
- **Əlçatanlıq:** Yüksək əlçatanlığı necə təmin edək? Nasazlığa dözümlülüyü (fault tolerance) necə qursaq?
- **Scalability:** Artan resurs ehtiyacını necə ödəyək? Gözlənilməz yük sıçrayışında necə miqyaslanaq?
- **İstifadə rahatlığı:** İşi necə asanlaşdıraq? Problemsiz istifadəçi təcrübəsini necə təmin edək? Fərqli istifadəçi qruplarına necə əlçatan edək?

Layihənin təbiətinə görə bəzi QFT-lər yalnız konkret layihəyə aid ola bilər — məsələn, kontakt-mərkəz həllərində səsin aydın seçilməsi.

Arxitektor layihəyə çox erkən qoşulur — deməli həlli bütün stakeholder-lərdən topladığı tələblərlə dizayn etməlidir. Müxtəlif komponentlər arasında dizaynın ardıcıllığını təmin etməli, QFT-ləri bütün gruplar arası müəyyən etməlidir.

> QFT-lər həll dizaynının ayrılmaz və mühüm hissəsidir, amma komandalar biznes tələblərinə həddən artıq fokuslananda tez-tez gözdən qaçır — bu da istifadəçi təcrübəsinə zərbə vurur. Yaxşı arxitektor QFT-lərin vacibliyini çatdırıb onların çatdırılmaya daxil olmasını təmin edir.

---

## Stakeholder-lərin anlaşılması və cəlbi

Stakeholder (maraqlı tərəf) — layihəyə birbaşa və ya dolayı marağı olan istənilən şəxsdir. Müştəri və istifadəçilərdən başqa: development, satış, marketinq, infrastruktur, şəbəkə, dəstək komandaları və layihəni maliyyələşdirən qrup.

- **Daxili stakeholder-lər:** layihə komandası, sponsorlar, işçilər, yüksək menecment.
- **Xarici stakeholder-lər:** müştərilər, provayderlər, partnyorlar, səhmdarlar, auditorlar, ölkə hökuməti.

Stakeholder-lər eyni biznes-tələbi öz kontekstlərinə görə fərqli anlayır: developer proqramlaşdırma baxımından, auditor isə təhlükəsizlik və compliance baxımından baxır.

Arxitektor həm texniki, həm qeyri-texniki tərəflərlə işləməli, tələbi müxtəlif baxış bucaqlarından anlamalıdır. Mürəkkəb texniki konsepsiyaları qeyri-texniki tərəfə izah etməli, texniki komandanın isə biznes məqsədlərini anlamasını təmin etməlidir.

> Arxitektor texniki və qeyri-texniki tərəflər arasında körpüdür və ünsiyyət boşluqlarını aradan qaldırır. Çox vaxt məhz bu boşluqlar layihəni uğursuzluğa aparır.

Biznes tərəfi məsələyə funksionallıq və məhsul imkanları baxımından baxır, development komandası isə mümkün qədər texniki uyğun həll qurmağa çalışır — bu bəzən qeyri-funksional tərəfə toxunur. Arxitektor hər iki komandanın eyni dalğada olmasını və təklif olunan funksionallığın texniki reallaşana bilməsini təmin edir. Texniki komandaya mentorluq edir, konsepsiyaları hamının anladığı sadə dildə izah edir.

---

## Arxitektura məhdudiyyətləri

Arxitektura məhdudiyyətləri (constraints) həll dizaynının ən çətin hissələrindəndir — çevikliyi və innovasiyanı məhdudlaşdırır. Yeni həllərin mövcud sistemlərlə texniki uyğun qalması bu məhdudiyyətlər çərçivəsində ciddi səy və resurs tələb edir. Büdcə, resurs və müddət məhdudiyyətləri isə həllin keyfiyyət və miqyasına təsir edir.

Arxitektor bu məhdudiyyətləri diqqətlə idarə etməli və optimal həll üçün onları müzakirə edə bilməlidir. Çox vaxt məhdudiyyətlər bir-birindən asılıdır — birinə həddən artıq diqqət digərini gücləndirir.

Ən çox rast gəlinən məhdudiyyətlər və verilən suallar:

- **Xərclər:** Reallaşma üçün nə qədər maliyyə var? Gözlənilən rentabellik nədir?
- **Keyfiyyət:** Nəticə FT və QFT-lərə nə qədər uyğundur? Keyfiyyəti necə təmin edib izləyək?
- **Vaxt:** Nəticə nə vaxt çatdırılmalıdır? Müddəti dəyişmək mümkündürmü?
- **Miqyas (scope):** Biznesin dəqiq gözləntiləri və müştəri tələbi nədir? Tələblərdəki boşluğu dizaynda necə aradan qaldıraq?
- **Texnologiya:** Hansı texnologiya işlənə bilər? Köhnə (legacy) texnologiya yenisi ilə müqayisədə nə qədər çeviklik verir? İşi öz gücümüzlə görək, yoxsa xarici podratçıya verək?
- **Risk:** Nə səhv gedə bilər və necə həll edək? Stakeholder-lər hansı riski qəbul edir?
- **Resurs:** Çatdırılma üçün nə lazımdır? Reallaşmanı kim görəcək?
- **Compliance:** Yerli qanunvericilikdən hansı tələblər təsir edir? Audit və sertifikasiyada hansı tələblər var?

Arxitektor bu məhdudiyyətlər arasında balans saxlamalı və hər biri üzrə kompromisləri təhlil etməlidir. Məsələn: resursu azaldıb xərcə qənaət etmək çatdırılma vaxtına təsir edə bilər. Məhdud resursla müddəti tutmaq keyfiyyəti aşağı salar, bu da gözlənilməz bug düzəlişləri ilə xərci artırar. Ona görə **xərc, keyfiyyət, vaxt və miqyas arasında balans** kritikdir.

Ən çətin situasiyalardan biri — **miqyasın sürüşməsi (scope creep)**:

> Scope creep — layihənin məqsəd və nəticələrinin tədricən genişlənməsidir, çox vaxt resurs, vaxt və büdcə uyğun artmadan. Bu, bütün digər məhdudiyyətlərə mənfi təsir edir və çatdırılma riskini artırır.

Arxitektor bütün məhdudiyyətləri anlamalı, riskləri erkən görüb qarşısını almaq planı qurmalıdır. Scope creep-lə bacarmaq layihənin vaxtında çatdırılmasına birbaşa kömək edir.

---

## Sona qədər: texnikadan böyük şəkil

Başladığımız suala qayıdaq — arxitektor hər gün nə edir? **Əvvəl** ağlınıza bəlkə diaqram cızan bir texniki adam gəlirdi. **İndi** görürsünüz ki, işin yarısı ümumiyyətlə kod və ya diaqram deyil: stakeholder-ləri bir masaya yığmaq, biznes ilə developer arasında tərcümə etmək, xərc-keyfiyyət-vaxt-miqyas dördbucağında balans tapmaq, scope creep-i erkən tutmaq.

Təhlükəsizlik, DevOps, sahəvi — hər ixtisas öz dərinliyini gətirir. Amma hamısını bir yerdə tutan həll arxitektorudur: o, texniki spesifikasiyanın yox, **real biznes dəyərinin** çatdırılmasına cavabdehdir.

Sizin son layihənizdə bu məhdudiyyətlərdən — xərc, vaxt, keyfiyyət, miqyas — hansı ən çox sıxdı sizi?

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

# Şirkətinizi buluda köçürmək: haradan başlamalı və nələri səhv etməmək lazımdır?

Təsəvvür edin: bir startap yaratmısınız və birdən-birə milyonlarla istifadəçi qapınızı döyür. Ənənəvi dünyada bu, xoşbəxtlik yox, panika deməkdir — serverlər çatmır, data-mərkəzdə yer yoxdur, yeni avadanlıq almaq həftələr çəkir. Bax elə bu problem üçün bulud (cloud) texnologiyaları icad olundu.

Bu yazıda gəlin bir kitab fəslini birlikdə açaq — bulud miqrasiyasının bütün mərhələləri, strategiyaları və tələləri haqqında. Sonda siz təkcə "bulud nədir" sualına yox, "öz tətbiqimi buluda necə köçürərəm" sualına da cavab verə biləcəksiniz.

> Bulud, işıq kimidir: düyməni basırsınız, işlədikcə pul verirsiniz, söndürəndə ödəniş də dayanır. Turbin işlətmək, xətt çəkmək sizin dərdiniz deyil.

---

## Əvvəlcə: bulud modelinin üç növü

Buluda keçməzdən əvvəl bilməlisiniz ki, "bulud" bir şey deyil — üç fərqli model var.

**Public cloud (ictimai bulud)** — provayder (AWS, Azure, GCP) resursları internet üzərindən sizə icarəyə verir. Bunu belə təsəvvür edin: bir çoxmərtəbəli binada mənzil icarəyə götürürsünüz. Bina sizin deyil, amma öz mənzilinizin içində tam sahibsiniz. Bir fiziki serveri bir neçə müştəri paylaşır (buna **multi-tenancy** deyilir — çoxkiracılıq), amma proqram və şəbəkə səviyyəsində hər kəsin işi bir-birindən təcrid olunub.

**Private cloud (özəl/lokal bulud)** — bütöv infrastruktur yalnız bir təşkilata məxsusdur. Öz data-mərkəzinizin surəti və ya davamıdır. Daha çox nəzarət, amma bütün yükü özünüz daşıyırsınız.

**Hybrid cloud (hibrid bulud)** — ikisinin qarışığı. Böyük korporasiyalar üçün ən real ssenari budur. Niyə? Çünki köhnə bir tətbiq var ki, onu birbaşa buluda köçürmək mümkün deyil, ya da lisenziya/qanunvericilik (compliance) tələbləri hansısa datanı lokal saxlamağa məcbur edir. Nəticədə şirkət bir hissəni lokalda saxlayır, qalanını buluda köçürür.

Bazarda çoxlu provayder olduğu üçün dördüncü bir meyl də yaranır — **multi-cloud** (çoxbuludlu) həllər. Bu barədə sonda danışacağıq.

---

## Public cloud arxitekturası və üç xidmət modeli

İndi maraqlı hissəyə keçək — bulud xidmətləri hansı səviyyələrdə gəlir? Burada məsuliyyətin sizinlə provayder arasında necə bölündüyünü başa düşmək açardır.

Lokal (on-premises) mühitdə **hər şeyə** özünüz cavabdehsiniz: şəbəkə, server, virtualizasiya, əməliyyat sistemi, tətbiq, data. Bulud modellərində isə bu yükün bir hissəsini provayderə ötürürsünüz:

- **IaaS (Infrastructure as a Service — infrastruktur xidmət kimi):** Provayder serverləri, şəbəkəni, yaddaşı idarə olunan xidmət kimi verir. Siz data-mərkəzin istiliyi, soyudulması, fiziki təhlükəsizliyi ilə məşğul olmursunuz. Qalan hər şey (OS, tətbiq) sizindir.
- **PaaS (Platform as a Service — platforma xidmət kimi):** Bir qat da əlavə olunur. İndi əməliyyat sistemi, proqram təminatının yenilənməsi də provayderin işidir. Siz yalnız biznes-məntiq yazırsınız. Developerlər platforma dərdindən azad olur.
- **SaaS (Software as a Service — proqram xidmət kimi):** Ən yuxarı abstraksiya. Hazır proqram alırsınız, sadəcə istifadə edirsiniz. Gmail buna klassik nümunədir — sizin poçt qutunuz var, amma nə serveri, nə də tətbiqi düşünürsünüz.

Dördüncü, hələ formalaşmaqda olan model də var: **FaaS (Function as a Service — funksiya xidmət kimi)**. AWS Lambda kimi xidmətlərlə serversiz (serverless) arxitektura qurmaq üçün populyarlaşır.

> Sadə düstur: IaaS-dən SaaS-a doğru getdikcə sizin məsuliyyətiniz azalır, amma çevikliyiniz də azalır. Balansı biznes ehtiyacınız təyin edir.

### Bazarda kim lider?

Statista-nın 2023 hesabatına görə bazar mənzərəsi belədir:

- **AWS** — 32% payla lider. Kitabdakı bütün nümunələr də AWS əsasında qurulub.
- **Microsoft Azure** — 24%, xüsusən korporativ tətbiqlərdə və hibrid buludda güclüdür.
- **Google Cloud (GCP)** — 11%, maşın öyrənmə və süni intellektdə (AI) ad çıxarıb.
- **Alibaba Cloud** — 4%, Asiya-Sakit Okean regionunda lider.

Bu dördü bazarın 70%-dən çoxuna nəzarət edir. Digər oyunçular: Oracle, IBM Cloud, Tencent Cloud, Salesforce.

---

## Cloud-native düşüncə: buludda hostinq etməklə buludu istifadə etmək fərqli şeydir

Ən çox səhv salınan məqam budur. Tətbiqinizi buluda atmaq — sadəcə köçürməkdir. **Cloud-native (buluda-yönəlik)** yanaşma isə tətbiqi baş-ayağı buludun imkanlarını istifadə edəcək şəkildə yenidən qurmaq deməkdir.

Lokal arxitektura adətən **sabit infrastruktur** üçün qurulur — çünki yeni server əlavə etmək vaxt, pul və əziyyət istəyir. Buludda isə ödəniş faktiki istifadəyə görədir və avtomatlaşdırma dəyişiklikləri asanlaşdırır. Cloud-native arxitektura üç şeyə fokuslanır:

1. Tələbə görə miqyaslama (scaling on demand)
2. Paylanmış (distributed) həllər
3. Xarab olan komponenti təmir yox, **əvəz etmək**

Praktikada cloud-native nə deməkdir? Məsələn:

- Monolit tətbiqi mikroservislərə (microservices) parçalayıb konteynerləşdirmək, CI/CD pipeline qurmaq;
- AWS Lambda (FaaS) və Amazon DynamoDB (idarə olunan NoSQL baza) ilə serversiz tətbiq qurmaq;
- Amazon S3, AWS Glue və Amazon Athena ilə serversiz data-göl (data lake) yaratmaq;
- Amazon CloudWatch ilə monitorinq, AWS CloudTrail ilə audit.

### Real nümunə: mikrobloq tətbiqi

Gəlin bir mikrobloq tətbiqinin cloud-native arxitekturasına baxaq:

- **Amazon Route 53** (idarə olunan DNS xidməti) istifadəçi sorğularını yönləndirir.
- **AWS Lambda** funksiyaları üç işi görür: istifadəçini yoxlayır, profili gətirir, bloq səhifəsini hazırlayır.
- **Amazon S3** bütün bloq resurslarını (şəkil, video, statik HTML) saxlayır.
- **Amazon DynamoDB** istifadəçi profil datalarını saxlayır.

İstifadəçi sorğu göndərəndə Lambda onu yoxlayır, DynamoDB-dən profili götürür, S3-dən resursları çəkir və göstərir. Bu arxitektura **limitsiz miqyaslana bilir**, çünki bütün xidmətlər idarə olunandır — siz infrastruktura toxunmursunuz.

Ən gözəli maliyyə tərəfidir: gecə heç kim bloqa baxmırsa, kod hostinqinə **heç nə ödəmirsiniz**. Yalnız yaddaşın simvolik dəyərini ödəyirsiniz.

Cloud-native arxitekturanın digər üstünlükləri:

- **Sürətli miqyaslama:** Yalnız istifadə etdiyinizə görə ödəyirsiniz.
- **Sürətli replikasiya:** "Infrastructure as Code" (infrastruktur kod kimi) — bir dəfə qurursunuz, sonra istədiyiniz qədər təkrar yaradırsınız.
- **Yaratmaq/silmək asanlığı:** Böyük eksperimental sistem qurub, iş bitəndən sonra silib xərci azaltmaq çox rahatdır.

---

## Miqrasiya strategiyaları: 7R modeli

İndi əsas mövzuya keçək — köhnə tətbiqləri buluda **necə** köçürək? Sənayedə bunun üçün 7 strategiya var, hamısı "R" hərfi ilə başlayır: **Retain, Retire, Relocate, Rehost, Repurchase, Replatform, Refactor**.

Bunları iki böyük qrupa bölmək olar: sürətli "lift-and-shift" (qaldır-köçür) metodları və dərin "cloud-native" yanaşmalar.

### Lift-and-shift qrupu (sürətli, minimum dəyişiklik)

**Rehosting (yenidən hostinq):** Ən sürətli və proqnozlaşdırıla bilən metod. Server və ya tətbiqi lokaldan buluda "olduğu kimi" köçürürsünüz. Müştərilər çox vaxt əvvəl rehost edir, buludda işə düşəndən sonra optimallaşdırma ilə məşğul olurlar. Uyğun ssenarilər: müvəqqəti test/development mühiti, SAP və ya SharePoint kimi paket proqramlar, aktiv yol xəritəsi olmayan tətbiqlər.

**Replatforming (platforma dəyişikliyi):** OS, server və ya bazanın ömrü bitəndə işə düşür. Məsələn, veb-server OS-ni Windows 2022-yə, bazanı Oracle 23c-yə yeniləyirsiniz — arxitekturaya toxunmadan. Səbəblər: 32-bitdən 64-bitə keçid, baza mühərrikinin dəyişməsi, idarə olunan xidmətlərdən yararlanmaq. **Diqqət:** tətbiqi yenidən qurmaq lazım gələ bilər, ona görə köçürmədən sonra hərtərəfli test edin.

**Relocation (relokasiya):** Konteyner və ya VMware əsaslı iş yüklərini buluda köçürmək üçün ən sürətli yol. Yüzlərlə tətbiqi bir neçə gündə köçürmək olar. VMware-in **VMotion** texnologiyası ilə virtual instansı bir fiziki hostdan başqasına **xidməti dayandırmadan** (live migration) köçürə bilərsiniz.

### Cloud-native qrupu (dərin, uzunmüddətli qazanc)

**Refactoring (refaktorinq):** Tətbiqi köçürməzdən əvvəl yenidən layihələndirib yazmaq. Monolitdən mikroservisə keçid buna klassik nümunədir. Bu, kiçik müstəqil komandaların öz kod hissəsinə tam sahib olmasına imkan verir — innovasiya sürəti artır.

Refaktorinq **çox vaxt və resurs** istəyir. Adətən buludda təcrübəsi olan və ya yüksək ixtisaslı komandası olan təşkilatlar seçir. Nümunələr: AIX-dən Unix-ə keçid, ənənəvi bazanı bulud bazasına çevirmək, middleware əvəzləmək, konteynerləşdirmə və ya serverless-ə keçid.

Mikroservis, yoxsa konteyner/serverless? Bu qərar diqqətli təhlil istəyir:

- **Mikroservis** miqyaslamanı və çevikliyi artırır (hər servis müstəqil), amma ciddi refaktorinq və servislərarası koordinasiya çətinliyi yaradır.
- **Konteyner/serverless** cari əməliyyatları optimallaşdırır, infrastruktur yükünü azaldır, amma ilkin developer investisiyası istəyir.

**Repurchase (yenidən satınalma):** Bəzən köhnə tətbiqi yenidən qurmaqdansa hazır SaaS həlli almaq daha yüksək ROI (investisiyanın qaytarılması) verir. Məsələn, köhnə CRM-i buraxıb Salesforce-a keçmək. Lisenziya məsələləri də burada həll olunur — köhnə lokal lisenziyanı silib bulud lisenziyası alırsınız.

**Retain (saxlamaq):** Bəzi tətbiqlər texniki səbəblərdən köçürülə bilmir — məsələn, OS bulud platformasında dəstəklənmir. Onları lokalda saxlayırsınız, amma köçürülən tətbiqlərlə əlaqəsi qaldığı üçün hibrid bağlantı lazım olur.

**Retire (istismardan çıxarmaq):** Miqrasiya zamanı çox vaxt istifadə olunmayan, artıq server tutan, sahibsiz "ruh serverlər" tapılır. Onları silmək — inventarizasiya üçün əla fürsətdir.

> Miqrasiya strategiyasını biznes prioriteti təyin edir: əsas məqsəd **qənaətdirsə**, lift-and-shift üstündür; **çeviklik və innovasiyadırsa**, cloud-native (refaktorinq) seçilir.

---

## Miqrasiyanın riskləri (bunları bilməsəniz, yanacaqsınız)

Bulud çoxlu üstünlük verir, amma risklərini bilmək vacibdir:

- **Data itkisi/sızması:** Şifrələnməmiş data miqrasiya zamanı təhlükədə olur.
- **Downtime (dayanma):** Sistemin dayanması biznesə təsir edir. Mərhələli və ya aşağı yük vaxtı köçürmə bunu azaldır.
- **Xərc aşımı:** Ödəniş modellərini başa düşmədən gözlənilməz xərclər çıxa bilər.
- **Performans problemləri:** Arxitektura fərqləri gözlənilməz uyğunsuzluq yarada bilər.
- **Bacarıq çatışmazlığı:** Bulud təcrübəsinin olmaması prosesi ləngidir.
- **Uyğunluq və inteqrasiya problemləri**, **compliance** çətinlikləri.
- **Vendor lock-in (provayderə bağlılıq):** Bir provayderə çox bağlanmaq gələcəkdə keçidi çətinləşdirir.

Ən vacib məsləhət: **mərhələli hərəkət edin**. Əvvəl köçürün, sonra optimallaşdırın. Məsələn, MS SQL istifadə edən tətbiqi köçürərkən — birinci mərhələdə tətbiqi köçürün, ikinci mərhələdə bazanı Amazon Aurora/Azure SQL-ə keçirin.

---

## Miqrasiyanın 9 mərhələsi

Bir neçə tətbiqi idarə etmək lazımdırsa, **Cloud CoE (Center of Excellence — mükəmməllik mərkəzi)** yaratmaq və **cloud migration factory** (miqrasiya fabriki) ilə prosesi standartlaşdırmaq faydalıdır. Miqrasiya bu mərhələlərdən keçir:

1. **İnventarizasiya (Inventory):** Portfeli və lokal iş yüklərini aşkarlamaq.
2. **Analiz (Analysis):** Aşkarlanan datanı təhlil etmək.
3. **Planlaşdırma (Planning):** Strategiya və plan hazırlamaq.
4. **Layihələndirmə (Design):** Seçilmiş strategiyaya görə tətbiqi dizayn etmək.
5. **Miqrasiya (Migration):** Köçürməni icra etmək.
6. **İnteqrasiya (Integration):** Digər tətbiq və asılılıqlarla birləşdirmək.
7. **Yoxlama (Validation):** Funksionallığı test etmək.
8. **İstismar (Operation):** Buludda işi təşkil etmək.
9. **Optimallaşdırma (Optimization):** İş yükünü buluda uyğunlaşdırmaq.

### 1. İnventarizasiya

Portfelin detallı mənzərəsini çıxarırsınız. Hər iş yükü üçün bilməli olduqlarınız:

- **Saxlanan data:** Həcm və tip (məs. baza üçün 1 TB blok yaddaş).
- **Şəbəkə konfiqurasiyaları:** Alt-şəbəkələr, firewall-lar, yük balanslaşdırıcıları.
- **Təhlükəsizlik və compliance:** Məs. GDPR tələbləri, data şifrələməsi.
- **Relizlərin tezliyi:** Məs. hər iki həftədən bir.
- **DevOps modeli:** Məs. Jenkins ilə CI/CD.
- **Eskalasiya yolu, OS xidməti, lisenziya tələbləri, digər asılılıqlar** (məs. xarici ödəniş servisi).

Ən böyük çətinliklərdən biri tətbiqlərarası **asılılıqları** (xüsusən I/O və kommunikasiya) tapmaqdır. Alətlər iki qrupa bölünür:

- **Agent əsaslı:** Serverə proqram klienti quraşdırılır (məs. monitorinq agenti).
- **Agent-siz:** Proqram quraşdırmadan məlumat toplayır (məs. şəbəkə skaneri — açıq portları, işləyən servisləri uzaqdan yoxlayır).

Bu mərhələ adətən ən azı iki həftə çəkir.

### 2. Analiz

Toplanan datanı təhlil edib hansı tətbiqin köçürülməyə uyğun olduğunu, buludla uyğunluğunu və optimal xidmətləri müəyyən edirsiniz. Serverin performans göstəricilərinə baxın:

- Serverə **artıq resurs** ayrılıbsa — miqyaslama parametrlərini düzəldin.
- Resurs **çatmırsa** — miqrasiya prioritetini qaldırın.

### 3-4. Planlaşdırma və layihələndirmə

Planlaşdırmada **miqrasiya dalğaları** (waves) yaradılır — ardıcıl köçürülə bilən resurs qruplaşmaları. Hər tətbiq üçün strategiya seçilir, prioritet təyin olunur, sıralanmış növbə yaranır.

Tətbiq sırasını təyin etmək üçün üç addım:

1. Hər tətbiqi bir neçə ölçüdə (biznes və texnologiya) qiymətləndirin.
2. Asılılıqları müəyyən edin və təsnif edin (sabit, güclü, zəif əlaqələr).
3. Düzgün prioritet strategiyası seçin.

Layihələndirmə mərhələsində arxitektura boşluğunu (architectural gap) tapıb tətbiqin tələblərinə uyğunlaşdırırsınız. Şəbəkə dizaynında nəzərə alınmalı faktorlar: paket axınları, marşrutlaşdırma, firewall qaydaları, təcridolunma, DDoS qoruması, audit jurnalları və s.

### Real dizayn nümunəsi: lokaldan AWS-ə

Klassik lokal arxitektura belədir: istifadəçi → yük balanslaşdırıcı → veb-server klasteri → tətbiq server qatı → baza (+ ehtiyat baza).

AWS-ə köçürəndə bu, belə çevrilir:

- **Veb-serverlər** rehost olunur, **Auto Scaling** ilə elastiklik əlavə edilir.
- **Elastic Load Balancer** trafiki paylayır.
- **Tətbiq serverləri** refaktorinq olunur.
- **Baza qatı** ənənəvidən **Amazon RDS**-ə (idarə olunan relyasion baza) keçir.
- Bütün arxitektura bir neçə **Availability Zone**-a (əlçatanlıq zonası) paylanır, baza ikinci zonada replikasiya olunur — yüksək əlçatanlıq (high availability) üçün.

---

## Data və server miqrasiyası

Strategiyadan asılı olaraq ya bütün serveri (tətbiq + infrastruktur), ya da yalnız datanı köçürürsünüz.

### Data miqrasiyası

Yanaşma data həcmindən, şəbəkə buraxma qabiliyyətindən (bandwidth), data təsnifatından və icazə verilən vaxtdan asılıdır.

Böyük data arxivləriniz və aşağı bandwidth-iniz varsa — datanı fiziki olaraq (məs. sərt diskdə) provayderin data-mərkəzinə göndərin.

**Kiçik bazalar üçün bir addımlı miqrasiya:** Tətbiqi bir müddət (bir neçə saatdan bir neçə günə) söndürürsünüz, datanı çıxarıb bulud bazasına köçürürsünüz.

**Minimum downtime lazımdırsa — iki mərhələli miqrasiya:**

1. Məlumat mənbə bazadan çıxarılır.
2. Miqrasiya baza işlədiyi halda edilir. **CDC (Change Data Capture — dəyişən datanın izlənməsi)** mexanizmi ilə bütün dataların köçdüyünə əmin olursunuz.

**Kritik bazalar, sıfır downtime lazımdırsa:** Fasiləsiz replikasiya alətləri — **AWS DataSync, Oracle GoldenGate, NetApp SnapMirror**. Qeyd: sinxron replikasiya mənbə bazanın gecikməsinə (latency) təsir edə bilər. Bir neçə dəqiqə downtime qəbuldursa — asinxron replikasiya işlədin.

### Server miqrasiyası metodları

- **OS klonlama:** Agent OS образını klonlayır, snapshot köçürülür. Birdəfəlik miqrasiyalar üçün.
- **OS kopyalama:** Bütün OS faylları köçürülür.
- **Disaster recovery replikasiyası:** Agent datanı fayl və ya blok səviyyəsində fasiləsiz replikasiya edir.
- **Disk kopyalama:** Bütün disk həcmi köçürülüb bulud instansına qoşulur.
- **VM kopyalama (agent-siz):** VMware/OpenStack образını export/import edirsiniz. Üstünlük: təkrar işə düşə bilən ehtiyat образlar.
- **İstifadəçi datası kopyalama:** Yalnız tətbiq datası köçürülür. **OS-dən asılı deyil**, amma tətbiqin daxili quruluşunu bilmək lazımdır.
- **Konteynerləşdirmə:** Həm binar faylları, həm istifadəçi datasını köçürür. Platforma dəyişdiyi üçün bu, replatform sayılır.

Alətlər: hər böyük provayderin öz aləti var, əlavə olaraq CloudEndure, NetApp, Dynatrace, Carbonite, OpenText.

---

## İnteqrasiya, yoxlama və cutover

Miqrasiya, inteqrasiya və yoxlama bir-birindən ayrılmazdır.

**Yoxlama (Validation):** Əvvəl bulud funksionallığını yoxlayın — tətbiq düzgün şəbəkə konfiqurasiyası (düzgün geolokasiya) və trafiklə işləyirmi? Server konfiqurasiyası (yaddaş, prosessor, disk) gözləntiyə uyğundurmu?

**İnteqrasiya:** Xarici asılılıqlarla əlaqəni test edirsiniz — Active Directory, CRM servisləri, ümumi servislər. Sonra unit testlər, smoke testlər və **UAT (User Acceptance Test — istifadəçi qəbulu testi)** keçirilir.

**Cutover (keçid):** Trafiki lokal mühitdən bulud mühitinə yönləndirmə prosesi. Nəzərə alınacaq faktorlar: qəbuledilən downtime, data yenilənmə tezliyi, data növü, DNS ad həlli, biznes məhdudiyyətləri.

### Blue-green ilə canlı miqrasiya (live migration)

Kritik iş yükləri üçün ən populyar model. Prinsip belədir: **mavi (blue)** mühit — hazırkı işləyən mühit; **yaşıl (green)** mühit — yeni versiyalı, demək olar ki eyni mühit.

Diaqramdakı nümunə kontekstində necə işləyir:

1. **Mavi mühit:** Lokal data-mərkəz (İrlandiya) trafikin 20%-ni emal edir.
2. **Yaşıl mühit:** AWS (Şimali Virciniya) — trafikin 80%-ni almağa hazır yeni mühit (EC2 klasterləri + Amazon RDS).
3. **Route 53** trafiki iki mühit arasında paylayır.
4. **Data replikasiyası** lokal bazadan RDS-ə fasiləsiz gedir.
5-6. Test təsdiqlənəndən sonra Route 53 **bütün** trafiki tədricən yaşıl mühitə keçirir.
7. Lokal mühit **ehtiyatda** qalır — problem olsa trafik geri qaytarıla bilər (rollback).
8. Uğurlu keçiddən sonra lokal infrastruktur istismardan çıxarılır.

Bu yanaşma downtime və riski minimuma endirir, çünki yeni mühit köhnə mühit söndürülməzdən əvvəl **canlı trafiklə** tam test olunur.

---

## İstismar və daimi optimallaşdırma

Miqrasiya bitəndə iş bitmir. Buludda görüləcək əməliyyatlar: server yeniləmələri, jurnal aparma, monitorinq, hadisə idarəetməsi, təhlükəsizlik əməliyyatları, konfiqurasiya idarəetməsi, dəyişiklik idarəetməsi, disaster recovery.

Bunun üçün **ITIL** və **ITSM** kimi standartlar var. ITSM IT-xidmətlərin planlaşdırma/idarəetmə proseslərini təsvir edir, ITIL isə ITSM üçün ən yaxşı praktikaları tətbiq edir.

Optimallaşdırma — **daimi təkmilləşmədir**. Əsas sahələr: **performans, təhlükəsizlik, etibarlılıq (reliability), operational excellence (əməliyyat mükəmməlliyi), xərclər**.

Praktik optimallaşdırma nümunələri:

- Resursları düzgün ölçüləndirin (right-sizing), auto-scaling tətbiq edin.
- Bir neçə kiçik instans çox vaxt bir neçə böyükdən sərfəlidir.
- Veb-serverlərdə **keşləmə** (caching) — qrafika, JavaScript, hətta bütöv səhifələri keşləyib istifadəçi təcrübəsini yaxşılaşdırın.
- n-səviyyəli və servis-yönümlü arxitekturalarla hər qatı müstəqil miqyaslayın.

---

## Hibrid bulud arxitekturası

Çox vaxt bir gündə tam buluda keçmək mümkün olmur. Belə hallarda hibrid model lazımdır — lokal iş yükü bulud modulu ilə əlaqə saxlayır.

Hibrid arxitektura səbəbləri:

- Blue-green refaktorinq zamanı köhnə tətbiqləri lokalda işlək saxlamaq;
- Mainframe kimi köhnə tətbiqin bulud variantı olmaması;
- Compliance tələbləri;
- Miqrasiyanı sürətləndirmək üçün bazanı lokalda saxlayıb tətbiq serverini köçürmək;
- Lokaldan buluda analitika üçün data çəkmək.

### AWS Direct Connect nümunəsi

**AWS Direct Connect** ilə data-mərkəz və AWS buludu arasında aşağı gecikməli, sürətli kanal qurulur. Necə işləyir:

- Direct Connect **location** (məntəqə) lokal data-mərkəzlə AWS-i birləşdirir.
- Müştəri üçüncü tərəf provayderdən (AT&T, Verizon və s.) ayrılmış optik xətt sifariş edir.
- Optik xətt AWS-in özəl şəbəkəsi ilə birləşir, **10 Gbit/s-ə qədər** sürət verir.
- Trafiki qorumaq üçün **IPSec şifrələməli VPN** qurmaq olar.

Diaqram terminləri: **VPC** (Amazon Virtual Private Cloud), **VLAN** (virtual lokal şəbəkə), **VGW** (Virtual Private Gateway — virtual özəl şlüz), **WAN** (qlobal şəbəkə).

### Hibrid modelin üstünlük və riskləri

**Üstünlüklər:** çeviklik və nəzarət, tələbə görə miqyaslama, artırılmış dayanıqlıq (resilience), innovasiya/eksperiment imkanı.

**Risklər:** mürəkkəblik (orkestrləşdirmə tələb edir), genişlənmiş hücum səthi (təhlükəsizlik), compliance çətinliyi, xərc idarəetməsi problemləri.

---

## Multi-cloud həllər

Bulud texnologiyalarından əvvəl də təşkilatlar bir provayderə bağlanmamaq üçün müxtəlif şirkətlərin məhsullarını istifadə edirdilər. **Multi-cloud** — iki və ya daha çox public cloud provayderinin istifadəsidir. AWS, GCP, Azure, Oracle, IBM təkliflərini coğrafi əlçatanlığa, texniki imkanlara və xərclərə görə qarışdıra bilərsiniz.

**Üstünlüklər:**

- **Provayder çevikliyi:** SLA (Service-Level Agreement — xidmət səviyyəsi razılaşması) pozulanda başqa provayderə keçmək olar.
- **Disaster recovery:** Bir provayderdə sıradan çıxma olsa, digərinə söykənmək olar. Hər provayderin güclü tərəfini seçirsiniz.

**Çatışmazlıqlar:**

- **Bacarıq problemi:** Bir neçə bulud stekini dərindən bilən mütəxəssis tapmaq çətindir. Konsultant və ya global sistem inteqratoru cəlb etmək düşünülə bilər.
- **Koordinasiya:** Data əlçatanlığı, təhlükəsizlik və performansı bir neçə bulud arasında koordinasiya etmək mürəkkəbdir. Ümumi məsuliyyət yenə təşkilatın üzərindədir.

---

## CloudOps: buludu idarə etmək üçün əməliyyat modeli

**CloudOps (Cloud Operations)** — xərcləri idarə etmək, effektivliyi artırmaq və bulud infrastrukturunun risklərini aradan qaldırmaq üçün təşkilatların qurduğu qaydalar toplusudur. Məqsəd: işçilərin bacarıqlarını, prosesləri və texnologiyaları bulud məqsədlərinə uyğunlaşdırmaq.

**Üstünlüklər:** sürət və çeviklik, avtomatlaşdırma ilə effektivlik, təşkilat miqyasında ardıcıl idarəetmə, bacarıqların səmərəli istifadəsi, xərc azalması.

Avtomatlaşdırma CloudOps-un ürəyidir. Bulud resurslarını avtomatik yaratmaq/dəyişmək/silmək olar. Əl ilə proseslər əmək tutumunu, səhvləri və xərcləri artırır. Avtomatlaşdırmanın konkret faydaları: təhlükəsizliyin artması (insan səhvinin azalması), backup proseslərinin sadələşməsi, idarəetmə imkanlarının genişlənməsi.

### CloudOps-un 6 əsas prinsipi

1. **İdarəetmənin təşkili (Governance):** Qoruyucu tədbirlərlə (guardrails) yaxşı layihələndirilmiş bulud mühiti qurmaq.
2. **Compliance:** Standartlara uyğunluğu və konfiqurasiyaları fasiləsiz monitorinq etmək, audit datası toplamaq.
3. **Təminat və koordinasiya (Provisioning):** IaC (Infrastructure-as-Code) prinsipləri ilə tətbiq və resursları sürətli təmin etmək.
4. **Monitorinq və müşahidə (Observability):** Metrikaları effektiv toplamaq, problemləri tez aşkarlamaq.
5. **Əməliyyatların mərkəzləşdirilməsi:** Bütün portfel üzrə əməliyyatları sadələşdirmək və avtomatlaşdırmaq.
6. **Xərc idarəetməsi (Cost management):** Xərc şəffaflığı, nəzarət tədbirləri və optimallaşdırma strategiyaları.

---

## Sona qədər: nəyi yadda saxlamalı?

Gəlin başa gəldiyimiz yolu bir cümlə ilə yığcamlaşdıraq. **Əvvəl** vəziyyət belə idi: milyonlarla istifadəçi qapını döyəndə server almaq üçün həftələr gözləyirdiniz, kapital qoyuluşu üzürdü, gecə boşa işləyən serverə pul verirdiniz. **İndi** isə buludda düyməni basırsınız, resurs anında gəlir, yalnız istifadə etdiyinizə ödəyirsiniz, gecə heç kim baxmayanda ödəniş dayanır.

Amma əsl fərq texnologiyada yox, **düşüncədədir**. Tətbiqi buluda atmaq bir şeydir — buludu həqiqətən istifadə etmək (cloud-native düşüncə) tam başqa şey. 7R strategiyalarını bilmək, mərhələli köçmək, riskləri əvvəlcədən görmək və CloudOps ilə idarəetməni qurmaq — sizi "buludda hostinq edən" şirkətdən "buludun gücündən yararlanan" şirkətə çevirir.

Sizcə öz komandanız hansı R-lə başlamalıdır — sürətli lift-and-shift, yoxsa dərin refaktorinq?

---

## Əlavə mənbələr

- **Amazon Web Services** — https://aws.amazon.com | AWS Well-Architected Framework: https://aws.amazon.com/architecture/well-architected/
- **Google Cloud Platform** — https://cloud.google.com | Cloud Architecture Framework: https://cloud.google.com/architecture/framework
- **Microsoft Azure** — https://azure.microsoft.com | Azure Well-Architected
- **Oracle Cloud (OCI)** — https://www.oracle.com/cloud/
- **Alibaba Cloud** — https://us.alibabacloud.com
- **IBM Cloud** — https://www.ibm.com/cloud

Demək olar ki hər provayder yeni istifadəçilərə pulsuz sınaq (free-tier) təklif edir — poçtunuzla qeydiyyatdan keçib seçim etməzdən əvvəl sınaya bilərsiniz.

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

# Niyə hər saniyə gecikmə sizə pul itirdirir: performansın arxitektura anatomiyası

Bir təsəvvür edin. İstifadəçi sizin tətbiqinizi açır, düyməyə basır — və gözləyir. Bir saniyə. İki saniyə. Üçüncüdə isə artıq başqa tabı açıb sizi tərk edir. Təcrübələr dəfələrlə göstərib ki, tətbiqin yüklənməsində hər əlavə saniyə təşkilatların gəlirini ciddi şəkildə azaldır. Yəni performans sadəcə "yaxşı olardı" kateqoriyasından deyil — o, məhsulun istifadəçilər tərəfindən qəbul edilib-edilməməsini birbaşa müəyyən edən parametrdir.

Bu yazıda gəlin performansı bir arxitektor gözü ilə sökək. Söhbət yalnız "kodu sürətləndirməkdən" getmir — performans arxitekturanın hər qatına toxunur: şəbəkə, hesablama, yaddaş, verilənlər bazası. Baxacağıq ki, gecikmə (latency) və ötürmə qabiliyyəti (throughput) nədir, konkurentlik necə işləyir, hansı texnologiyanı hansı səviyyədə seçmək lazımdır, mobil tətbiqlərdə nəyə fikir vermək gərəkdir, və nəhayət — bütün bunları necə test edib monitorinq etmək olar.

> Performans heç vaxt pulsuz gəlmir. Onu qazanmaq üçün hər səviyyədə şüurlu seçim etməlisiniz — və hər seçimin öz güzəşti (trade-off) var.

Gəlin yüksək performanslı arxitekturaların təməl prinsiplərindən başlayaq.

---

## Yüksək performanslı arxitekturanın təməl prinsipləri

Arxitekturanın performansı — tətbiqin infrastrukturunu və mövcud resursları elə istifadə etməkdir ki, həm bugünkü tələbatı ödəyəsən, həm də sabahkı böyüməyə və texnoloji dəyişikliklərə hazır olasan. Yaxşı arxitektor sistemi elə qurur ki, o təkcə indiki yükü daşımasın, həm də miqyaslana (scale) və inkişaf edə bilsin — performans isə istifadəçi gözləntilərinə uyğun sabit qalsın.

Gəlin əsas prinsiplərə tək-tək baxaq.

### Gecikməni (latency) azaltmaq

**Gecikmə** — bir data paketinin bir nöqtədən başqasına ötürülməsi üçün lazım olan vaxtdır. Daha sadə desək: hərəkəti başlatdığınız andan cavabın cihazda görünməsinə qədər keçən müddət. İstifadəçilər ən sürətli tətbiqi seçir, ona görə gecikmə birbaşa məhsulun populyarlığına təsir edir.

Gecikməyə bir neçə amil təsir edir: klient və server arasındakı fiziki məsafə, ötürmə mühitinin sürəti (optik lif kabel, yoxsa simsiz siqnal), və şəbəkənin yüklülüyü.

Bir misal. Deyək ki, mesajın cihazdan serverə çatması **600 millisaniyə (ms)** çəkir — bu, ya fiziki məsafə ilə, ya da paketlərin bir neçə aralıq cihazdan (router, kommutator) keçməsi ilə bağlıdır. Server bu sorğunu emal edib cavab qaytarmağa daha **900 ms** sərf edirsə, ümumi faktiki gecikmə **1,5 saniyə (1500 ms)** olur. Bu, veb-səhifə açılanda gözlə görünəcək qədər bir ləngimədir.

Müasir tətbiqin qlobal auditoriyaya çıxışı üçün internetə çıxışı olmalıdır, istifadəçilər isə coğrafi mövqelərindən asılı olmayaraq sabit performans gözləyir. Bu, həmişə asan deyil — çünki datanın dünyanın bir ucundan digərinə hərəkəti vaxt aparır. Şəbəkə gecikməsinə ötürmə mühiti, router keçidləri və siqnalın yayılması təsir edir. Korporativ mühitlərdə şəbəkəni buludla birləşdirmək üçün adətən optik lif xətti işlədilir ki, datada uyğunsuzluq olmasın. Ağır qrafik və video data isə istifadəçiyə yaxın saxlanmaq üçün **CDN** (Content Delivery Network — kontent çatdırılma şəbəkəsi) vasitəsilə yerləşdirilir — bu, həm şəbəkə gecikməsini azaldır, həm performansı yaxşılaşdırır.

Gecikmə təkcə şəbəkədə yaranmır — arxitekturanın komponentlərinin içində də var:

- **Hesablama serverində** — data prosessorla operativ yaddaş arasında nisbətən ləng ötürülür.
- **Diskdə** — ləng oxu/yazı əməliyyatları. HDD-də (sərt disk) gecikmə diskin fırlanaraq oxuma başlığını lazımi sektora çatdırması vaxtından asılıdır. Disk daim fırlandığı üçün data ora gözlənilməz ardıcıllıqla düşür, oxu zamanı başlıq lazımi sektorun altına gələnə qədər gözləməli olur.
- **Verilənlər bazası səviyyəsində** — aparat "dar boğazları" (bottleneck) və ya ləng sorğu emalı. Datanı segmentasiya və şardinq (sharding) ilə paylayaraq bazaya düşən yükü azaltmaq gecikməni salır.

Gecikmə və ötürmə qabiliyyəti birbaşa bağlıdır: aşağı gecikmə = yüksək ötürmə qabiliyyəti. Gəlin bu ikinci anlayışa yaxından baxaq.

### Ötürmə qabiliyyətini (throughput) artırmaq

**Ötürmə qabiliyyəti** — müəyyən vaxt ərzində şəbəkə üzərindən uğurla ötürülə bilən data həcmidir. Ona şəbəkənin tutumu (capacity), bağlantının keyfiyyəti və istifadə olunan protokollar təsir edir.

Bunu bir analogiya ilə anlayaq. Tutaq ki, şəbəkə kanalları **çoxzolaqlı bir avtomagistraldır**, data paketləri isə maşınlar. İki şəhəri 16 zolaqlı yol birləşdirir. Hər maşın vaxtında çatmır — tıxac, zolaq bağlanması, qəza olur. Bu misalda **gecikmə** — bir maşının bir şəhərdən o birinə nə qədər tez çatdığıdır, **ötürmə qabiliyyəti** isə — ümumilikdə neçə maşının məqsədə çata bildiyidir. Tam tutumu istifadə etmək çətindir, çünki xətalar və tıxaclar mane olur.

Şəbəkə ötürmə qabiliyyəti bit/saniyə (bit/s) ilə ölçülür. Bu anlayış disk yaddaşına da aiddir. Disk ötürmə qabiliyyəti MB/saniyə ilə ölçülür və iki amildən asılıdır: saniyədəki giriş/çıxış əməliyyatlarının sayı (**IOPS**) və hər əməliyyatın ölçüsü.

Formula belədir:

```
Ötürmə qabiliyyəti (MB/s) = (orta I/O ölçüsü [bayt] × IOPS) / (1024 × 1024)
```

Gəlin konkret rəqəmlə hesablayaq. Diskin IOPS = 20 000, I/O ölçüsü = 4 KB (4 × 1024 = 4096 bayt) olsun.

**1-ci addım** — I/O ölçüsünü baytdan meqabayta çeviririk:

```
4096 / (1024 × 1024) = 0.00390625 MB
```

**2-ci addım** — nəticəni IOPS-a vururuq:

```
0.00390625 MB × 20 000 = 78.125 MB/s
```

Yəni bu şərtlərdə disk saniyədə təxminən **78,125 MB** oxuya və ya yaza bilir.

Ötürmə qabiliyyəti hər səviyyədə fərqli mənaya gəlir:
- **ƏS (əməliyyat sistemi) səviyyəsində** — prosessorla RAM arasında saniyədə ötürülən data həcmi.
- **Verilənlər bazası səviyyəsində** — saniyədə emal olunan tranzaksiyaların sayı.
- **Tətbiq səviyyəsində** — kodun saniyədə emal etdiyi tranzaksiyalar; burada zibil yığımı (garbage collection) ilə yaddaşı idarə etmək və in-memory keşdən səmərəli istifadə vacibdir.

Gecikmə, ötürmə qabiliyyəti və tutumdan danışanda daha bir amili nəzərə almalıyıq — konkurentliyi.

### Konkurentlik (concurrency) və paralellik (parallelism)

**Konkurentlik** — tətbiqin bir neçə işi eyni vaxtda görməsinə imkan verən mexanizmdir. Bir işin bitməsini gözləmədən növbətisini başlada bilirsən, sistem resursları daha səmərəli istifadə olunur. Bu, minlərlə istifadəçiyə xidmət edən veb-tətbiqlərdə və böyük həcmli data emalında xüsusilə vacibdir.

**Paralellik** isə konkurentliyi tamamlayan, amma ondan fərqli bir anlayışdır. Fərqi belə anlamaq olar:

- **Konkurentlik** — bir neçə iş "eyni vaxtda" görünür, amma əslində tək nüvəli prosessorda işlər sürətlə növbələşir ki, eyni anda işləyirmiş kimi görünsün.
- **Paralellik** — işlər həqiqətən eyni anda, çoxnüvəli prosessorlarda və ya paylanmış sistemlərdə icra olunur. İş kiçik bloklara bölünür, bloklar paralel emal olunur.

Analogiya ilə: **konkurentlik** — dörd zolaqlı yolu idarə edən svetofordur. Bir zolağa icazə veriləndə qalan zolaqlar dayanır. **Paralellik**də isə zolaqlar bir-birindən asılı deyil — bütün maşınlar eyni anda, bir-birinə mane olmadan hərəkət edir.

Verilənlər bazası həmişə arxitekturanın mərkəzindədir və konkurentlik burada həlledicidir. Baza eyni anda çoxlu sorğuya cavab verə bilməlidir. Çətinlik ondadır ki, bir istifadəçi qeydi oxuyanda başqası onu yeniləməyə çalışa bilər. Baza datanı yalnız **tam yadda saxlandıqdan sonra** göstərməyə icazə verməlidir — başqası onu yeniləməzdən əvvəl data bütöv olmalıdır.

### Keşləmə (caching)

Keşləmə performansı gözlə görünəcək qədər artırır. Maraqlısı budur ki, keşləmə təkcə CDN kimi xarici mexanizmlərdə deyil — tətbiqin demək olar hər komponentinin və infrastruktur elementinin öz keş mexanizmi var:

- **Prosessorda (CPU)** — aparat keşi (komanda keşi + data keşi). Data keşində tez-tez işlədilən data saxlanır, əsas yaddaşa müraciət gecikməsi azalır. CPU keşinin idarəsi tamamilə aparat səviyyəsindədir.
- **Diskdə** — ƏS-nin idarə etdiyi səhifə keşi (page cache). Tez-tez işlədilən data əsas yaddaşın boş hissəsində saxlanır.
- **Verilənlər bazasında** — bir sorğu birdən çox dəfə icra olunubsa, nəticə serverin RAM-ında saxlanan sorğu keşi. Cədvəldə data dəyişəndə bu keş təmizlənir; yaddaş çatmayanda ən köhnə sorğunun nəticəsi silinir.
- **Şəbəkədə** — DNS keşi. Domen adları və uyğun IP ünvanları lokal saxlanır ki, eyni sayta təkrar girəndə ad→IP çevrilməsi tez getsin.

Klient tərəfdə (brauzer keşi) və Memcached/Redis kimi alətlər də bu ailəyə daxildir.

Bura qədər öyrəndik ki, hər arxitektura komponenti müəyyən gecikmə səviyyəsi və konkurentlik problemi ilə gəlir. Vacib bir qeyd: tətbiqi həmişə **istədiyiniz performansa hesablayaraq** qurun. Birja tətbiqi millisaniyəlik gecikməyə belə dözmür; internet-mağaza saytı üçünsə bir neçə saniyə kritik deyil. Arxitektura həllinizin təbiəti səyi yönləndirməlidir.

İndi keçək praktik hissəyə — hansı texnologiyanı harada seçmək lazımdır.

---

## Performans üçün texnologiya seçimi

Əvvəlki fəsillərdə mikroservis, hadisə-yönümlü (event-driven), keş-əsaslı və vəziyyətsiz (stateless) arxitektura paternləri ilə tanış olduq. Təşkilat yükdən asılı olaraq bunları birləşdirir. Strategiya seçildikdən sonra növbəti addım — **optimallaşdırmadır**. Bunun üçün yük testi (load testing) və benchmarking ilə performans tələblərinə dair məlumat toplamaq lazımdır.

Optimallaşdırma birdəfəlik iş deyil — dizayndan istismara qədər davam edən fasiləsiz prosesdir. Resursları yükə uyğun seçməlisiniz. Məsələn: sessiya vəziyyətini saxlamaq üçün NoSQL, tranzaksiyaları saxlamaq üçün relyasion baza seçmək olar; analitika üçün isə işlək bazanı yükdən azad edib məlumatı ayrıca anbara boşaldıb hesabatları oradan qurmaq olar.

Əsas resurs tipini seçməlisiniz: **hesablama, yaddaş, baza, yoxsa şəbəkə**. Gəlin hər birinə baxaq.

### Hesablama resursunun seçimi

Bilərəkdən "server" yox, "hesablama resursu" deyirik — çünki bu gün deployment yalnız serverlərlə məhdudlaşmır. Bulud platformalarında (AWS və s.) server ümumiyyətlə lazım olmayan **serversiz (serverless)** təkliflər var. Ən məşhur **FaaS** (Function as a Service — funksiya kimi xidmət) nümunəsi AWS Lambda-dır; Azure Functions və Google Cloud Functions də var.

Yenə də təşkilatlar çox vaxt standart variantı — virtual maşınlı serverləri seçir. Konteynerlər isə, xüsusilə mikroservis deploymentində, get-gedə üstünlük qazanır.

Aşağıdakı cədvəl dörd hesablama resursu tipini müqayisə edir. Əvvəlcə terminlər:

- **CPU** (Central Processing Unit) — kompüterin mərkəzi prosessoru, əməliyyatların çoxunu görür; "kompüterin beyni".
- **GPU** (Graphic Processing Unit) — ekrana çıxış üçün təsvirlərin sürətli yaradılmasına yönəlmiş ixtisaslaşmış mikrosxem.
- **FPGA** (Field Programmable Gate Array) — istehsaldan sonra müştəri tərəfindən konfiqurasiya edilə bilən (ona görə "proqramlaşdırıla bilən") inteqral sxem.
- **ASIC** (Application-Specific Integrated Circuit) — konkret, universal olmayan tapşırıq üçün ixtisaslaşmış mikrosxem.

| Xüsusiyyət | CPU | GPU | FPGA | ASIC |
|---|---|---|---|---|
| Əsas tətbiq | Ümumi təyinatlı | Qrafika, böyük data | Xüsusi tapşırıqlar üçün proqramlaşdırılan cihaz | Konkret məqsədli inteqral sxem |
| Proqramlaşdırma | Sadə | Xüsusi kitabxana (məs. CUDA) tələb edir | Çətin, aparat proqramlaşdırma bacarığı lazımdır | — (tək məqsəd üçün dizayn olunur) |
| Çoxtapşırıqlıq | Var | Dizaynda paralelizm dəstəyi ilə məhdud | Var — konfiqurasiya dəyişəndə | Yox — dar ixtisaslı |
| Universallıq | Yüksək | Orta | Orta, konfiqurasiya oluna bilər | Aşağı, tətbiqə bağlı |
| Performans metrikası | GHz | TFLOP | FLOP | Enerji/performans üçün optimallaşır |
| Nüvə strukturu | Bir neçə böyük nüvə | Minlərlə kiçik nüvə | Yenidən qurula bilən məntiq elementləri | — |
| Paralel emal | Məhdud | Yüksək (MPP) | MPP dəstəkləyir, CPU kimi qurulur | Konkret tətbiqə optimallaşır |
| Xərc | Aşağı | CPU-dan yüksək | CPU və GPU-dan yüksək | Ən yüksək |
| Enerji sərfi | Orta | Yüksək | Aşağı | Tətbiqə optimallaşdırılıb |
| Çeviklik | Geniş spektrdə universal | Hesablama-intensiv tətbiqlərə | Yenidən qurula bilər, amma iş tələb edir | Sabit, dəyişiklik üçün yenidən dizayn |
| İnkişaf dövrü | Qısa | Qısa–orta | Uzun | Ən uzun |

Xülasə: **ASIC** ən səmərəlisidir, amma inkişaf dövrü ən uzundur və yenidən profilləşdirmə çevikliyi ən azdır. **CPU** isə son dərəcə çevikdir və bir çox ssenariyə uyğundur. Bu gün CPU ümumi təyinatlı cihazlarda hər yerdə, GPU hesablama-intensiv tətbiqlərdə, FPGA dar ixtisaslı vəziyyətlərdə üstünlük təşkil edir.

Başqa tiplər də var — məsələn **APU** (Accelerated Processing Unit) CPU, GPU və rəqəmsal siqnal prosessorunu (DSP) birləşdirir; analoq siqnalların real vaxtda emalı üçün ideal.

### Konteynerlərlə iş

Konteynerlər mürəkkəb mikroservis tətbiqlərinin deploymentində normaya çevrilir — avtomatlaşdırma asanlığı və resurs səmərəliliyinə görə. Platformadan asılı olmadıqları üçün bulud-müstəqil (cloud-agnostic) platformaların əsas vasitəsidirlər: lokal data mərkəzində yerləşdirib buluddan idarə etmək, və ya tətbiqə heç toxunmadan lokaldan buluda köçürmək olar.

#### Docker

**Docker** tətbiqi və onun asılılıqlarını bir konteynerə qablaşdırıb istənilən ƏS-də işə salmağa imkan verir. Bu, platformadan-müstəqil funksionallıq deməkdir — inkişaf, test və deployment sadələşir.

Docker mürəkkəb çoxqatlı tətbiqlər qurmağa kömək edir. Tutaq ki, eyni vaxtda tətbiq serveri, verilənlər bazası və mesaj növbəsi işə salmalısınız. Bunları fərqli Docker imiclərindən paralel işə salıb aralarında bağlantı qura bilərsiniz. Hər qatda kitabxanaların fərqli versiyaları ola bilər — Docker onların bir hesablama resursunda **münaqişəsiz** işləməsinə imkan verir.

Docker imicləri reyestrdə saxlanmalıdır (kod GitHub-da saxlandığı kimi). **Docker Hub** ictimai reyestrdir; bulud provayderlərinin öz reyestrləri də var (AWS ECR, Azure Container Registry). Öz lokal privat reyestrinizi də qura bilərsiniz. İmicə etdiyiniz dəyişiklik problem yaradıbsa, asanlıqla işlək versiyaya qayıtmaq olar — bu, nasazlıqların aradan qaldırılmasını çox asanlaşdırır.

AWS konteyner idarəetmə platforması **Amazon ECS** təqdim edir (Docker konteynerlərini bulud VM-i EC2 üzərində idarə edir). **Amazon Fargate** isə VM olmadan konteyner deploymentinə imkan verən serversiz variantdır.

Mürəkkəb korporativ tətbiqlər bir neçə konteynerə yayılan mikroservislərdən qurulur. Onları idarə etmək çətindir — burada **Kubernetes** köməyə gəlir.

#### Kubernetes

**Kubernetes** — hərtərəfli konteyner orkestrasiya sistemidir; işlək mühitdə bir neçə konteyneri idarə edib koordinasiya edir. Docker konteynerlərini fiziki serverlərdə və ya VM qovşaqlarında (adətən **işçi qovşaqlar** — worker nodes deyilir) yerləşdirir, deployment, miqyaslama və idarəni avtomatlaşdırır.

Kubernetes-in verdikləri:
- **Özünü bərpa** — tətbiq xətasına görə cavab verməyən konteynerlər avtomatik əvəzlənir.
- **Üfüqi miqyaslama** və **mavi-yaşıl (blue-green) deployment** — dayanma vaxtının qarşısını almaq üçün.
- İstifadəçi trafikini konteynerlər arasında paylayır, ortaq yaddaş sahəsini idarə edir.

Docker və Kubernetes birlikdə necə işləyir? Docker tətbiqin ayrıca hissəsi kimi işləyir, Kubernetes isə orkestrasiya ilə hər hissənin dizaynerin nəzərdə tutduğu kimi işləməsinə zəmanət verir. Docker-də konteynerlər qovşaqlarda yerləşir və eyni qovşaqdakı bütün konteynerlər bir IP ünvan sahəsini paylaşır — IP münaqişələrini özün həll etməlisən. Kubernetes bunu **əsas (primary) nüsxə** yaradaraq həll edir: bütün qovşaqları və orada yerləşən podları izləyir.

Əsas Kubernetes qovşağı IP təyin edir, konfiqurasiya üçün "açar–dəyər" anbarı saxlayır və konteynerləri idarə edən **kubelet** agentini işə salır. Kubelet — hər qovşaqda işləyən "qovşaq agenti"dir, podlarda təyin olunmuş konteynerlərin işə düşüb işləməkdə davam etməsinə nəzarət edir. Docker konteynerləri bir IP paylaşan **podlara** qruplaşır, bütün qrup isə **Kubernetes klasteri** adlanır.

Kubernetes-in saxlanması çətindir, ona görə bulud provayderləri hazır idarəetmə xidmətləri verir: AWS **EKS**, Microsoft Azure **AKS**, GCP **GKE**. Red Hat-in **OpenShift** distributu isə PaaS (Platform as a Service) formasında gəlir.

Ümumən konteynerlər infrastruktura virtuallaşma qatı əlavə edir — resurs səmərəliliyi üçün faydalıdır. Amma tətbiqiniz **ultra-aşağı gecikmə** tələb edirsə, deployment üçün fiziki maşın seçin.

#### Serversiz (serverless) həllər

Serversiz hesablama developerə infrastruktur haqqında düşünmədən yalnız koda fokuslanmağa imkan verir — miqyaslama, resurs ayrılması və konfiqurasiya arxa planda qalır. Bu, bizi **FaaS** (Function as a Service) anlayışına gətirir.

FaaS təklifləri: AWS Lambda, Azure Functions, Google Cloud Functions. Məsələn, kodu bulud redaktorunda yazırsan, AWS Lambda isə funksiyaların icrası və miqyaslanması üçün alt infrastrukturu öz üzərinə götürür. **Amazon API Gateway** ilə API son nöqtəsi əlavə edib hadisə-yönümlü arxitektura və ya RESTful mikroservislər qurmaq olar (API Gateway RESTful və WebSocket API-ləri Lambda funksiyaları üçün frontend kimi əlavə edir).

FaaS-ın böyük üstünlüyü: **boş dayanan resurslara heç vaxt pul verməzsiniz**. Bütün servisi yox, yalnız lazım olan funksiyaları müstəqil miqyaslaya bilərsiniz — daxili əlçatanlıq və nasazlığa davamlılıqla. Amma minlərlə komponenti orkestrasiya etmək lazım olanda avtomiqyaslama xərcini proqnozlaşdırmaq çətinləşir. İdeal ssenarilər: tapşırıq planlaması, veb-sorğuların emalı, mesaj növbələri.

**Seçim yekunu:** monolit tətbiqlər üçün — virtual/fiziki maşın; mürəkkəb mikroservislər üçün — konteynerlər; sadə tapşırıqlar və ya hadisə-yönümlü tətbiqlər üçün — serversiz funksiyalar. Universal qayda yoxdur; hər şey təşkilatın texnologiya stekindən, innovasiya sürətindən və tətbiqin təbiətindən asılıdır.

### Yaddaş tipinin seçimi

Yaddaş performansda açar rol oynayır və burada **data lokallığı (data affinity)** anlayışı çox vacibdir. Bu, datanı onu istifadə edən tətbiqə yaxın yerləşdirmək strategiyasıdır — gecikməni azaltmaq və oxu səmərəliliyini artırmaq üçün.

Multibulud və hibrid mühitlərdə "bütün data server yaxınında olmalıdır" fikri həmişə doğru deyil. Müasir paylanmış sistemlər datanın müxtəlif yerlərdə — lokal və başqa bulud provayderlərində — saxlanmasına imkan verir, məqbul gecikməni saxlamaqla. Bu çeviklik, məsələn, datanın müəyyən coğrafi/qanuni sərhədlərdə qalmasını tələb edən təşkilatlar üçün kritikdir.

Data harada saxlanmalıdır — qərar verərkən bu amilləri ölçün:

- **Gecikmə tələbləri** — real-vaxt data lazımdırsa, minimal gecikməli (fiziki/şəbəkə cəhətdən yaxın) saxlama.
- **Data suverenliyi və komplayens** — hüquqi tələblər datanın harada saxlanacağını diktə edə bilər.
- **Xərclər** — fərqli yerlərdə/platformalarda saxlama əlavə xərc yaradır; buludda **çıxan data (egress) ödənişini** unutmayın.
- **Tutum və ötürmə qabiliyyəti** — server ilə yaddaş arasındakı şəbəkə. Yüksək tutum bəzi gecikmə problemlərini həll edib daha çevik variantlar açır.
- **Müraciət şablonları** — hansı dataya tez-tez, hansına nadir müraciət olunur? Tez-tez işlədilən data yaxın olsa, giriş sürətlənir.
- **Fəlakətdən bərpa və əlçatanlıq** — data davamlılığı üçün müxtəlif yerlərə replikasiya lazım ola bilər.

Multibulud strategiyalarda keşləmə, data replikasiyası və ya periferiya hesablamaları kömək edir — kritik datanın sinxron nüsxəsini tətbiqə yaxın saxlamaqla, əsas mənbə uzaqda olsa belə minimal gecikmə əldə edilir.

İlk qərar: data **blok**, **fayl**, yoxsa **obyekt** anbarında saxlanmalıdır? Bunların hər biri datanı fərqli formada saxlayır.

#### Blok anbarları və SAN

**Blok anbarı** datanı bloklara bölüb saxlayır. Hər blokun unikal identifikatoru var; bloklarda fayl haqqında metadata saxlanmadığı üçün sistem datanı ən əlçatan yerdə yerləşdirir. Server ƏS-i bu blokları idarə edir; sorğu gələndə anbar lazımi blokları yığıb nəticəni qaytarır.

**SAN** (Storage Area Network — data saxlama şəbəkəsi) üzərində yerləşən blok anbarı böyük həcmli, tez-tez müraciət olunan data üçün səmərəlidir (verilənlər bazası, e-poçt serverləri, tətbiq, VM). SAN mürəkkəb, kritik tətbiqlərə xidmət edən yüksək performanslı sistemdir — amma bahadır və yalnız aşağı gecikmə tələb edən iri korporativ tətbiqlər üçün işlədilməlidir.

Blok anbarında **SSD** və **HDD** arasında seçim edirsiniz:
- **HDD** (sərt disk) — köhnə texnologiya, ucuz, amma ləng; enerji və soyutma tələb edir.
- **SSD** (bərk-vəziyyətli disk) — yarımkeçirici mikrosxemlərlə işləyir, HDD-dən sürətlidir, bahadır, amma enerji/soyutma tələbi az olduğu üçün getdikcə populyarlaşır.

#### Fayl anbarları və NAS

**Fayl anbarı** datanı iyerarxik struktur şəklində saxlayır. Dataya çatmaq üçün yolu (path) göstərirsən. Çoxqatlı iyerarxiyalarda yollar mürəkkəbləşə bilər. Hər qeyddə məhdud metadata var (fayl adı, yaradılma və yenilənmə vaxtı).

Analogiya: kitablar rəflərdə duran, kartotekada isə hər kitabın yerini göstərən kartların saxlandığı **kitabxana**.

**NAS** (Network Attached Storage) — şəbəkəyə qoşulmuş fayl saxlama sistemi. Giriş imtiyazlarını, fayl kilidləməsini və digər təhlükəsizlik mexanizmlərini idarə edir. Faylmübadilə sistemləri və lokal arxivlər üçün yaxşıdır. Amma milyardlarla fayl üçün **obyekt anbarları** daha yaxşıdır.

#### Obyekt və bulud anbarları

**Obyekt anbarında** data unikal identifikator və konfiqurasiya oluna bilən metadata ilə tamamlanır. **Düz (flat) ünvan sahəsi** işlədir — fayl anbarındakı iyerarxik ünvanlardan fərqli. Bu, datanı yerindən asılı olmadan tez tapmağa və **qeyri-məhdud miqyaslamaya** imkan verir.

Metadata çoxlu detal saxlaya bilər (ad, ölçü, vaxt möhürü), istifadəçi onu özü fərdiləşdirə bilər. Dataya sadə API çağırışı ilə müraciət olunur, iqtisadi cəhətdən çox səmərəlidir. Böyük həcmli **strukturlaşmamış data** üçün ən yaxşısıdır. Diqqət: obyektlər dəyişdirilə bilməz — yalnız əvəz olunur, ona görə baza kimi işləmir.

Bulud anbarları (məsələn **Amazon S3**) qeyri-məhdud, yüksək əlçatanlı və uzunömürlü obyekt saxlama sahəsi verir.

Üç sistemin xülasəsi:
- **Blok anbarı** — bir nüsxənin inhisar girişi lazım olan ssenarilər (bazalar, yüksək performans tələb edən tətbiqlər).
- **Fayl anbarı** — bir neçə nüsxə eyni anda müraciət etməlidirsə (kiçik əlavə gecikmə ilə).
- **Obyekt anbarı** — statik kontent (qrafika, video), böyük data emalı və analizi.

Digər tiplər:
- **DAS** (Direct-Attached Storage) — host-serverə birbaşa qoşulur; miqyaslama və tutumu çox məhduddur.
- **Maqnit lentlər** — ucuz, yüksək əlçatanlı arxivləmə/ehtiyat nüsxə üçün; amma yüksək gecikməyə görə birbaşa istifadəyə uyğun deyil.

Bulud qarşılıqları: AWS-də **EBS** (SAN kimi blok), **EFS** (NAS kimi fayl), **S3** (obyekt). Azure-da: **Disk Storage** (SAN), **Files** (NAS), **Blob Storage**.

#### Bazalar üçün yaddaş mexanizmləri

Baza yaddaş texnologiyasının seçimi iş yükünün konkret tələblərindən asılıdır: IOPS, baza ölçüsü, coğrafi yer və əməliyyatın təbiəti — **OLTP** (Online Transaction Processing) yoxsa **OLAP** (Online Analytical Processing).

| Texnologiya | IOPS | Baza ölçüsü | Yer seçimi | Ən yaxşı ssenari |
|---|---|---|---|---|
| SSD | Yüksək | Kiçik–böyük | Serverə yaxın | OLTP və OLAP; yüksək IOPS və aşağı gecikmə kritik olanda əksər bazalar üçün |
| HDD | Orta–yüksək | Böyük | Serverə yaxın | Böyük OLAP; nadir müraciətli və ya xərc-məhdud bazalar; yüksək performanslı OLTP üçün tövsiyə olunmur |
| NAS | Aşağı–orta | Kiçik–orta | Çevik, qeyri-lokal ola bilər | OLAP və ehtiyat nüsxə/arxivləmə |
| SAN | Yüksək | Böyük | Çevik, yaxın arzuolunandır | OLTP və OLAP; yüksək IOPS, ötürmə və miqyaslama tələb edən böyük bazalar |
| Bulud anbarı | Dəyişkən | Dəyişkən | Lokal və ya buludda | OLTP və OLAP; geniş diapazon, konkret bulud təklifindən asılı |

Multibulud/hibrid ssenarilərdə data suverenliyi, müraciət şablonları (oxu-, yoxsa yazı-intensiv), şəbəkə gecikməsi, tutum və xərclər də böyük əhəmiyyət qazanır — xüsusilə bazalara **WAN** (Wide Area Network) üzərindən müraciət olunanda.

İndi növbəti kritik komponentə — verilənlər bazasının özünə keçək.

### Verilənlər bazasının seçimi

Çox vaxt idarə asanlığı üçün vahid platforma standartlaşdırmaq istəyirsən — amma data tələblərinə görə fərqli həllər işlətməyə çalış. Yanlış baza seçimi gecikmə və performansa vurur.

Seçim əlçatanlıq, miqyaslanma, data strukturu, ötürmə qabiliyyəti və stabillik tələblərindən asılıdır. Müraciət şablonları texnologiya seçiminə ciddi təsir edir — bazanı bu şablonlara görə optimallaşdırın. Bazaların adətən yükü optimallaşdırmaq üçün konfiqurasiya parametrləri olur: yaddaş, keş, saxlama optimallaşdırması. Miqyaslama, ehtiyat nüsxə, bərpa və saxlama xüsusiyyətlərini də öyrənin.

#### OLTP

Ənənəvi relyasion bazaların çoxu **OLTP** (Online Transactional Processing) işlədir. Tranzaksion bazalar — datanın saxlanması və emalının ən köhnə və məşhur üsuludur: Oracle, Microsoft SQL Server, MySQL, PostgreSQL, Amazon RDS. Müraciət şablonu — identifikatora görə kiçik data seçimidir. **Tranzaksiya** o deməkdir ki, ya bütün əlaqəli yeniləmələr uğurla tamamlanır, ya da heç biri.

Relyasion model mürəkkəb biznes-əməliyyatları emal edir (bank, ticarət) — datanı aqreqasiya edib bir neçə cədvəli birləşdirən mürəkkəb sorğular qurmağa imkan verir.

Relyasion baza optimallaşdırılarkən nəzərə alınmalıdır:
- **Server və parametrləri** — hesablama gücü, yaddaş, saxlama, şəbəkə.
- **ƏS səviyyəsi** — saxlama tomları (volume), tom idarəsi, blok ölçüsü.
- **Baza nüvəsi** — konfiqurasiya və seksiyalaşdırma (partitioning).
- **Baza vasitələri** — sxemlər, indekslər, təsvirlər (views).

Relyasion bazaları miqyaslamaq çətindir, çünki onlar **şaquli (vertical)** miqyaslanır və sistemin yuxarı həddinə çatır. Həll yolları:
- **Oxu replikaları (read replicas)** — oxu sorğularını əsas bazadan replikalara sürüşdürüb ümumi oxu ötürmə qabiliyyətini artırır.
- **Şardinq (sharding)** — böyük bazanı kiçik, idarəolunan hissələrə (şardlara) bölüb yazı yükünü bir neçə server arasında paylayır, yazı səmərəliliyini artırır.

OLTP böyük və mürəkkəb tranzaksion tətbiqlər üçün yaxşıdır. Amma böyük data aqreqasiyası və internetdən gələn strukturlaşmamış data ilə relyasion bazalar orijinal formada səmərəli işləyə bilmir. Burada **NoSQL** köməyə gəlir.

#### Qeyri-relyasion (NoSQL) bazalar

Sosial şəbəkələr, IoT, baxış tarixçəsi və jurnallar çox dinamik sxemli, strukturlaşmamış/yarı-strukturlaşmış data yaradır. Belə datanı relyasion bazada saxlamaq əziyyətlidir — hər şeyi sabit sxemə çevirmək ya çoxlu **null** dəyər, ya da data itkisi yaradır.

**NoSQL** ("Not Only SQL" — yalnız SQL deyil) çevik yanaşma verir: datanı əvvəlcədən müəyyən sxem məhdudiyyəti olmadan saxlaya bilərsən. Fərqli sayda sütunu olan qeydlər bir cədvəldə saxlana bilər.

NoSQL böyük data həcmi saxlayır, aşağı gecikmə verir və yeni qovşaqlar əlavə etməklə asan **üfüqi (horizontal)** miqyaslanır. İstifadəçi sessiya datası saxlamaq və vəziyyətsiz (stateless) tətbiqə keçmək üçün əladır. Diqqət: NoSQL mürəkkəb sorğuları (cədvəl/varlıq birləşmələri) dəstəkləmir — sorğu birləşdirmələri **tətbiq səviyyəsində** həll olunmalıdır.

Nümunələr: Cassandra, HBase, MongoDB (VM klasterində qurula bilər). AWS-in idarə olunan NoSQL bazası **Amazon DynamoDB** submillisaniyəlik gecikmə və qeyri-məhdud miqyaslama verir.

OLTP relyasion bazalarla işləyir, amma saxlama tutumu ilə məhduddur. Böyük data sorğularına və analitik ehtiyaclara isə **OLAP** cavab verir.

#### OLAP

OLTP və NoSQL tətbiq deploymenti üçün faydalıdır, amma iri miqyaslı analiz imkanları məhduddur. Data anbarları (data warehouse) əsasən **OLAP** (Online Analytical Processing) işlədir. Böyük həcmli strukturlaşmış datanın analiz üçün sorğulanması, strukturlaşmış dataya girişi sürətləndirmək üçün dizayn olunmuş anbar platformasında daha yaxşı işləyir.

Müasir data anbarları **kolonlu (columnar)** saxlama və **MPP** (massively parallel processing — kütləvi-paralel emal) işlədir. Ənənəvi **sətir-əsaslı** bazalardan fərqli olaraq, kolonlu anbarda data sütunlar üzrə strukturlaşır.

Kolonlu format nə deməkdir? Deyək ki, yalnız bir sütunu — məsələn, verilmiş ayın satış həcmini aqreqasiya etmək istəyirsən. Sifariş cədvəlində yüzlərlə sütun ola bilər, amma sənə yalnız satış sütunu lazımdır. Kolonlu formatda **yalnız bir sütunu skan etmək** kifayətdir — bu, skan olunan datanı azaldıb sorğu səmərəliliyini artırır.

**MPP** necə işləyir: data uşaq qovşaqlar arasında paylanmış saxlanır, sorğu isə aparıcı (leader) qovşağa göndərilir. Aparıcı qovşaq segmentasiya açarına görə sorğuları uşaq qovşaqlar arasında paylayır. Hər qovşaq sorğunun bir hissəsini paralel icra edir, sonra aparıcı qovşaq nəticələri yığıb aqreqat cavabı qaytarır.

Nümunələr: VM-də quraşdırılan Netezza və ya Microsoft SQL Server; bulud-yönümlü Snowflake; AWS-in petabayt miqyaslı **Amazon Redshift** (kolonlu format + MPP).

#### Data axtarışı funksionallığı

Çox vaxt böyük data həcmində tez axtarış lazımdır — jurnalda konkret xətanı tapmaq və ya sənəd axtarış mexanizmi qurmaq. Aşağı gecikmə və yüksək ötürmə ilə axtarış üçün **axtarış sistemi** lazımdır.

**Elasticsearch** — ən məşhur axtarış platformalarından biridir, açıq mənbəli **Apache Lucene** kitabxanası üzərində qurulub. **ELK** steki (Elasticsearch, Logstash, Kibana) ilə iri miqyaslı datanı emal edib indeksləşdirmək asandır:
- **Logstash** — böyük həcmli jurnal datasını toplayıb çevirir və analiz edir.
- **Kibana** — Elasticsearch ilə hazır bağlayıcısı olan, dashboard qurub indeksləşən datanı analiz edən alət.

Elasticsearch VM-də deploy olunub üfüqi miqyaslanır. AWS-in idarə olunan **Amazon OpenSearch** xidməti buludda Elasticsearch klasterini asan idarə etməyə imkan verir.

**Baza seçimi yekunu:** mürəkkəb tranzaksiyalar üçün — OLTP relyasion baza; strukturlaşmamış/yarı-strukturlaşmış data üçün — NoSQL; bir neçə coğrafi regionda çox aşağı gecikmə və tətbiq səviyyəsində mürəkkəb sorğular üçün (məs. oyunlar) — NoSQL; iri miqyaslı strukturlaşmış data analizi üçün — OLAP.

İndi arxitekturanın onurğa sütununa — şəbəkəyə keçək.

---

## Şəbəkə performansını artırmaq

Sürətli internet dövründə tətbiq dünyanın demək olar hər guşəsində hər istifadəçidə normal işləməlidir. Sistem cavabındakı gecikmə həm sorğu yükündən, həm də istifadəçinin serverdən uzaqlığından asılıdır. Sistem sorğulara tez cavab vermirsə, zəncirvari reaksiya baş verir: bütün resurslar məşğul qalır, emal olunmamış sorğular yığılır, ümumi performans düşür.

Gecikməni azaltmaq üçün istifadəçinin yerini və mühitini modelləşdirin, boşluqları aşkarlayın. Nəticələrə əsasən serverin fiziki yerini və keşləmə mexanizmini dizayn edin. Qlobal auditoriyalı tətbiq istifadəçilərlə sürətli bağlantıya malik olmalıdır — CDN-in verdiyi **periferiya lokasiyaları (edge locations)** ağır kontenti lokallaşdırıb ümumi gecikməni azaldır.

CDN çoxlu statik kontenti olan tətbiqlər üçün işlədilir (istifadəçiyə çoxlu qrafika/video). Məşhur həllər: Akamai, Cloudflare, Amazon CloudFront.

### Periferiya hesablamaları (edge computing)

**Periferiya hesablamaları** — hesablama və datanı istifadə yerinə yaxınlaşdıran paylanmış hesablama paradiqmasıdır. IT infrastrukturunu istifadə yerinə yaxın verən mini-data mərkəzlərində reallaşır. Gecikmə, ötürmə qabiliyyəti və real-vaxt data emalı kritik olan yerlərdə tətbiq performansını artırmaq üçün nestandart strategiya kimi formalaşıb.

Bir ssenari təsəvvür edin. Facebook, X və ya TikTok kimi qlobal sosial şəbəkənin saytı real-vaxt hadisəsi (mühüm idman matçı, ya selebrити xəbəri) üzündən istifadəçi aktivliyi pikini yaşayır. Ənənəvi mərkəzləşmiş modeldə serverlər sorğu axınını çətin daşıyır — yüklənmə yavaşlayır, nasazlıqlar mümkündür. CDN-lər köməyə gəlir; bu sahədə Akamai, Cloudflare, Imperva, Amazon CloudFront kimi nəhənglər dominantdır.

Akamai — CDN pionerlərindən biridir; dünya üzrə strateji yerləşdirilmiş geniş periferiya server şəbəkəsinə malikdir. Tokiodan (Yaponiya) istifadəçi yüksək trafikli hadisə vaxtı sosial şəbəkəyə girəndə Akamai-nin **Tokiodakı periferiya serverləri** işə düşür. Bu serverlər tez-tez sorğulanan kontenti (qrafika, video, statik fayllar) istifadəçiyə mərkəzi data mərkəzlərindən qat-qat yaxın nöqtədən verir — nəticədə ildırım sürətli yüklənmə, azaldılmış gecikmə və hamar kontent çatdırılması.

Bundan başqa, Akamai periferiya serverləri təhlükəsizlik vasitələri də verir: DDoS-hücumlardan qoruma və **WAF** (Web Application Firewall) funksionallığı.

Periferiya hesablamaları başqa sahələrdə də işlədilir:
- **Sürücüsüz avtomobillər** — periferiya cihazları sensor datasını real vaxtda emal edir, qərarlar saniyənin bir hissəsində qəbul olunur, yolda təhlükəsizlik təmin edilir.
- **IoT** — ağıllı cihazlar datanı lokal analiz edir. Ağıllı termostat mərkəzi serverlə daim əlaqə saxlamadan lokal sensor datasına görə temperaturu tənzimləyir.
- **Səhiyyə** — pasiyentlərin distant müşahidəsi. Geyilə bilən cihazlar datanı real vaxtda analiz edir, kənaraçıxma olanda tibb müəssisələrinə və ya pasiyentə xəbərdarlıq göndərir.

### DNS marşrutlaşdırma strategiyası

Tətbiqi qlobal əhatə üçün bir neçə coğrafi regionda deploy etmək olar. İstifadəçi sorğuları isə ən yaxın və sürətli serverə marşrutlaşdırılmalıdır. **DNS marşrutlaşdırıcı** domen adları ilə IP ünvanlar arasında çevirmə edir — istifadəçi `amazon.com` yazanda sorğu həmişə Amazon tətbiq serverinin DNS xidmətinə yönəlir.

AWS-in DNS xidməti **Amazon Route 53**-dür. Əsas marşrutlaşdırma siyasətləri:

- **Sadə (simple)** — şərtsiz, ən düz siyasət. Trafiki bir resursa yönləndirmək üçün faydalıdır.
- **Nasazlığa keçid (failover)** — "aktiv–passiv" konfiqurasiya ilə yüksək əlçatanlıq. Tətbiq bir regionda sıradan çıxanda bütün trafik avtomatik başqa regiona yönlənir.
- **Geolokasiya (geolocation)** — istifadəçini konkret regiona görə yönləndirir.
- **Coğrafi yaxınlıq (geoproximity)** — geolokasiyaya oxşar, amma trafik lazım olanda ən yaxın yerlərə keçə bilər.
- **Gecikmə-əsaslı (latency-based)** — bir neçə regionda işləyən tətbiqdə trafiki gecikmənin ən az olduğu regiondan xidmət edir.
- **Çəkili (weighted)** — A/B testi üçün; trafikin müəyyən hissəsi ayrıca regiona yönlənir və test uğurlu getdikcə genişlənir.

Route 53 həmçinin DNS sorğularının mənbə/həcmindəki anomaliyaları aşkarlayır, etibarlı istifadəçilərə üstünlük verir və tətbiqi DDoS-hücumlardan qoruyur.

### Yük balanslaşdırıcı (load balancer)

DNS-dən sonra trafik çox vaxt **yük balanslaşdırıcıdan** keçir — o, trafiki server klasteri arasında paylayaraq konkurentliyi, etibarlılığı artırır və gecikməni azaldır. Balanslaşdırıcı fiziki və ya virtual ola bilər. İki əsas tip:

- **Şəbəkə balanslaşdırıcısı (4-cü səviyyə / Layer 4)** — paketləri başlıq (header) məlumatına görə marşrutlaşdırır (IP ünvanları, portlar). Paketin məzmununu analiz etmir, ona görə az hesablama tələb edir və 7-ci səviyyədən sürətlidir. Saniyədə milyonlarla sorğu emal edə bilər.
- **Tətbiq balanslaşdırıcısı (7-ci səviyyə / Layer 7)** — paketləri tam məzmununa görə analiz edib marşrutlaşdırır. HTTP sorğuları ilə işlədilir; qərarlar HTTP başlıqları, URI yolu, kontent tipi əsasında qəbul olunur. Daha güclü marşrutlaşdırma qaydaları, amma marşrutlaşdırma daha uzun çəkir. Sorğuları port nömrəsinə görə klasterdəki konteynerlərə də yönləndirə bilər.

Aparat balanslaşdırıcıları: F5, Cisco. Proqram balanslaşdırıcısı: Nginx. AWS-in idarə olunan virtual balanslaşdırıcısı **Amazon ELB** (Elastic Load Balancing) — həm 7-ci (tətbiq), həm 4-cü (şəbəkə) səviyyədə işləyir.

Balanslaşdırıcı sorğuları yalnız **sağlam (healthy)** nüsxələrə göndərməklə tətbiqi qoruyur və yüksək əlçatanlıq verir. Avtomiqyaslama ilə birlikdə işləyir.

### Avtomiqyaslama (autoscaling)

Bulud platformaları ilə avtomiqyaslama arxitekturanın hər səviyyəsində tətbiq oluna bilər. Veb-server parkı təqdimat səviyyəsindəki sorğu sayına görə, tətbiq səviyyəsi isə serverin yaddaşı və prosessor yükünə görə miqyaslanır. Trafik şablonları məlumdursa, **planlı (scheduled)** miqyaslama da etmək olar. Baza səviyyəsində: relyasion Amazon Aurora Serverless və Azure SQL Database, NoSQL Amazon DynamoDB (ötürmə qabiliyyətinə görə) avtomiqyaslana bilir.

Avtomiqyaslama üçün server nüsxələrinin **maksimum və minimum** tutumunu təyin etməlisiniz. Nümunə konfiqurasiya: normalda 3 veb-server nüsxəsi işləyir; prosessor yükü **50%-i keçəndə 5 nüsxəyə** genişlənir, yük **20%-dən aşağı düşəndə 2 nüsxəyə** sıxılır. Nüsxə sağlamdan çıxanda balanslaşdırıcı bunu izləyib avtomiqyaslama ilə yeni nüsxə təqdim edir.

> Avtomiqyaslama faydalıdır, amma düzgün konfiqurasiya olunmalıdır — çünki gözlənilməz trafik pikində (məs. DDoS-hücum) xərcləri kəskin artıra bilər.

Sistemi belə hadisələrdən qoruyun (bu barədə "Təhlükəsizlik faktorları" fəslində daha çox var).

İndi mobil tərəfə keçək — bu gün istifadəçilərin çoxu tətbiqə məhz telefondan girir.

---

## Mobil tətbiqlərdə performans faktorları

İstifadəçilər artıq desktopdan çox mobil tətbiqə girir və trafikin böyük hissəsi mobildən gəlir. Ona görə mobil tətbiqin performansı, təhlükəsizliyi və rahatlığı prioritetdir. Əsas praktikalar:

- **Yüklənmə vaxtının optimallaşdırılması** — şəkil ölçülərini optimallaşdır, elementləri gecikmiş (lazy) yüklə, ilk görünən elementləri əvvəl yüklə.
- **Resurslardan səmərəli istifadə** — mobil cihazda prosessor, yaddaş, batareya məhduddur. Səmərəli alqoritmlər, yaddaş sızmalarının azaldılması, yalnız lazımi datanı çəkən sorğular.
- **İnterfeys cavabdehliyi (UI responsiveness)** — hesablama-intensiv proseslər (data çəkmə, şəkil emalı) fon rejimində işləməlidir ki, UI donmasın. Asinxron proqramlaşdırma və çoxsaplılıq (multithreading) interfeysi cavabdeh saxlayır.
- **Şəbəkə səmərəliliyi** — mobil şəbəkələr qeyri-stabil ola bilər. Nadir dəyişən data üçün keşləmə, API çağırışlarının optimallaşdırılması, şəbəkə sıradançıxmalarının düzgün işlənməsi.
- **Batareya sərfi** — çox batareya yeyən tətbiq tez tərk edilir. GPS, Bluetooth və digər ağır proseslər ehtiyatla işlədilməli, lazımsız olanda söndürülməlidir.
- **Kross-platforma uyğunluğu** — müxtəlif cihaz, ƏS, ekran ölçüləri üçün kross-platforma freymvorklar və müxtəlif cihazlarda diqqətli test.
- **UX-dizayn** — istifadəçi-yönümlü dizayn, sadə naviqasiya; istifadəçi işi minimal səylə görsün.
- **Səmərəli data idarəsi** — tez-tez işlədilən data üçün lokal saxlama, lokal və uzaq data arasında hamar sinxronizasiya.
- **Test və keyfiyyət nəzarəti** — müxtəlif şərait və cihazlarda performans testi, avtomatlaşdırılmış test və CI (davamlı inteqrasiya) ilə problemləri erkən aşkarlamaq.

Yüksək performanslı mobil tətbiq — istifadəçi-yönümlülüklə texniki kompetensiyanın harmoniyasıdır. Hər cəhəti (interfeys, yüklənmə vaxtı, data idarəsi, təhlükəsizlik) optimallaşdıranda tətbiq müxtəlif şəraitdə yaxşı işləyir.

Bütün bu strategiyalar isə diqqətlə test olunmalıdır. Növbəti bölmə buna həsr olunub.

---

## Performans testi

**Performans testi** tətbiqin müxtəlif iş yükləri altında yaxşı işləyəcəyini yoxlayır — stabillik, sürət, cavabdehlik və miqyaslanmanı qiymətləndirir. Diqqət: performans testi **xəta axtarmır** — o, tətbiqin fərqli tələb səviyyələrinə necə reaksiya verəcəyini müəyyən edir.

Niyə vacibdir? Çünki birbaşa istifadəçi məmnuniyyətinə təsir edir. Ləngimə və ya tez-tez baş verən sıradançıxmalar istifadəçini tətbiqdən uzaqlaşdırıb rəqibə göndərir.

Bir misal: "qara cümə"yə (Black Friday) hazırlaşan populyar internet-mağaza. Sayta minlərlə, bəlkə milyonlarla alıcı gələcək. Sistem sıradan çıxmamalı, tranzaksiyalar tez emal olunmalı, qarşılıqlı əməliyyatlar pik vaxtı belə hamar qalmalıdır. Belə halda performans testi sadəcə faydalı deyil — **zəruridir**.

### Performans testinin növləri

- **Yük testi (load testing)** — sistemin gözlənilən, real yük altında davranışını göstərir. Analogiya: üstünə tədricən çəki əlavə olunan körpünü nəzərdə tutulan maksimum maşın sayına qədər test etmək. Məsələn, internet-mağaza bayram satışında 10 000 ziyarətçi gözləyirsə, yük testi bu 10 000 ziyarətçini imitasiya etməlidir.
- **Stress testi (stress testing)** — sistemi son həddə qədər aparıb, ən pis ssenaridə belə sıradançıxmanın fəlakətə çevrilmədiyini yoxlayır. Analogiya: lifti dolduraraq həddi aşıb işləyəcəyini, yoxsa sınacağını görmək. Məsələn, bank tətbiqinə eyni anda 1 000 000 istifadəçinin (adi trafikdən qat-qat çox) girməsini test etmək.
- **Dözümlülük testi (endurance/soak testing)** — sistemin gözlənilən yük altında **uzun müddət** səmərəli işləyə biləcəyini yoxlayır. Məsələn, striminq xidmətini bütün həftəsonu keyfiyyət və sürət düşmədən film/serial yayımlaya biləcəyinə görə test etmək.
- **Pik testi (spike testing)** — trafikin qəfil, gözlənilməz sıçrayışını yoxlayır. Analogiya: istidə hamının eyni anda kondisioneri işə saldığı elektrik şəbəkəsi. Məsələn, xəbər saytının böyük hadisə (Olimpiya oyunları) vaxtı davranışı.
- **Həcm testi (volume testing)** — diqqət **dataya** yönəlir. Analogiya: kitabxananın milyonlarla kitabı nizamlayıb verməklə necə başa çıxdığını yoxlamaq. Məsələn, bazada milyardlarla qeyd olanda sistem davranışı, və ya qlobal e-poçt xidmətinin nəhəng mesaj həcmində axtarış cavabdehliyi.

Alətlər: JMeter, LoadRunner, WebLoad — müxtəlif ssenari və yükləri imitasiya edir.

Test və monitorinq iki fərqli məqsədə xidmət edir: **test** problemləri istifadəçilərə çatmazdan **əvvəl** aşkarlayır; **monitorinq** isə deploymentdən **sonra** sistemə nəzarət edib problemlərə tez reaksiya verir. Gəlin monitorinqə baxaq.

---

## Performans monitorinqi

Monitorinq performans problemlərinin son istifadəçiyə təsirinin qarşısını proaktiv almaq üçündür.

**Etalon (baseline) performans göstəricisi** təyin edin və pozulduqda komandaya xəbərdarlıq göndərilməsini qurun — məsələn, mobil tətbiqin yüklənmə vaxtı 3 saniyəni keçməməlidir. Xəbərdarlıq avtomatlaşdırılmış cavab hərəkəti başlatmalıdır — məsələn, veb-tətbiq klasterinə əlavə qovşaqlar əlavə edərək sorğu yükünü azaltmaq.

Alətlər: üçüncü tərəf (məs. Splunk) və ya AWS-in **Amazon CloudWatch** xidməti. Monitorinq iki kateqoriyaya bölünür:

- **Aktiv (active) monitorinq** — istifadəçi aktivliyini imitasiya edib performans çatışmazlığını **əvvəlcədən** aşkarlayırsan. Data və iş yükü daim dəyişir, ona görə fasiləsiz proaktiv monitorinq lazımdır. Məlum ssenariləri işə salıb istifadəçi əməliyyatlarını təkrarlayırsan. Bütün mühitlərdə (dev, test, işlək) aparılmalıdır ki, problem istifadəçidə görünməzdən əvvəl tapılsın.
- **Passiv (passive) monitorinq** — real vaxtda **naməlum** qanunauyğunluqları aşkarlayır. Veb-tətbiqlərdə bu, brauzerdən mühüm metrikaları almaq deməkdir: istifadəçi geolokasiyası, brauzer və cihaz tipləri — qarşılıqlı əməliyyatları və coğrafi səmərəliliyi anlamağa kömək edir. Data-yönümlüdür: böyük data həcminin udulması (ingestion), emalı və vizuallaşdırması.

> Performans heç vaxt pulsuz gəlmir, və arxitektor kimi düzgün yanaşmanı seçmək üçün güzəştləri düşünməlisiniz.

Təşkilatın daxili tətbiqləri (məs. iş vaxtı uçotu, HR məhsulları) xarici məhsullar (internet-mağaza) qədər yüksək performans tələb etməyə bilər. Digər tərəfdən, birja tətbiqi çox yüksək performans — deməli, böyük xərc — tələb edir. Tətbiqinizin ehtiyaclarına uyğun **etibarlılıq, ardıcıllıq, xərc və performans** balansını saxlamağa çalışın.

---

## Nəticə: əvvəl və sonra

Bu yazının əvvəlində bir saniyəlik gecikmənin necə pul itirdiyindən danışdıq. İndi isə əlimizdə tam bir alət dəsti var.

**Əvvəl** — performansı "kodu sürətləndirmək" kimi qavrayırdıq, adətən problem yaranandan sonra düşünürdük. **Sonra** — bilirik ki, performans arxitekturanın hər qatına toxunan, dizaynın ilk günündən nəzərə alınmalı olan bir prinsipdir:

- **Gecikmə** və **ötürmə qabiliyyəti** birbaşa bağlıdır — hər səviyyədə aşağı gecikmə, yüksək ötürmə hədəfləyin.
- **Konkurentlik** çoxlu sorğunu daşımağa, **keşləmə** isə hər səviyyədə performansı artırmağa kömək edir.
- Hesablama üçün **CPU/GPU/FPGA/ASIC** arasında, deployment üçün **VM / konteyner / serversiz** arasında yükə uyğun seçim edin.
- Yaddaşda **blok/fayl/obyekt**, bazada **OLTP/NoSQL/OLAP** — hər biri konkret ssenari üçün.
- Şəbəkədə **CDN, periferiya hesablamaları, DNS marşrutlaşdırma, yük balanslaşdırıcı, avtomiqyaslama** qlobal istifadəçiyə sürətli xidmət verir.
- **Mobil** tərəfi ayrıca optimallaşdırın, sonra hər şeyi **test edin** və **monitorinq** qurun.

Növbəti fəsildə isə tətbiqi autentifikasiya və avtorizasiya ilə necə qorumaqdan — data təhlükəsizliyindən, təhlükəsizlik auditindən, xəbərdarlıq və monitorinqdən danışacağıq.

Bəs sizin arxitekturanızda ən zəif performans halqası hansıdır — şəbəkə, baza, yoxsa kod? Yazın, müzakirə edək.

# Sistem təhlükəsizdirsə niyə hələ də narahat olmalısan? Arxitekturada təhlükəsizlik faktorları

Təsəvvür et: bir səhər oyanırsan, xəbərlərdə şirkətinin adını görürsən — amma yaxşı səbəbdən yox. Müştəri məlumatları sızıb. Kredit kartı nömrələri, ünvanlar, şəxsiyyət sənədləri. Bir gecədə həm müştərilərin etimadını, həm də bəzən bütün biznesi itirirsən.

Bu yazıda arxitekturanın ən çox göz ardı edilən, amma ən bahalı hissəsindən danışacağıq — **təhlükəsizlik**. Söhbət yalnız serverin ətrafına divar çəkməkdən getmir. Gəlin bir az dərinə enək: təhlükəsizlik hər səviyyədə, hər komponentdə qurulmalıdır. Sistemin bir hissəsi partlayanda qalan hissələr sağ qalsın deyə.

> Təhlükəsizlik bir dəfəlik iş deyil — bu, davamlı və planlı bir prosesdir. Hər insident tətbiqi yaxşılaşdırmaq üçün bir fürsətdir.

Bu yazının yol xəritəsi belədir:

- Təhlükəsiz arxitektura dizayn prinsipləri
- Təhlükəsizlik texnologiyalarının seçimi (istifadəçi idarəetməsi, web, infrastruktur, data)
- Təhlükəsizlik və uyğunluq sertifikasiyası (compliance)
- Buludda ümumi məsuliyyət modeli
- Təhdid modelləşdirməsi

---

## Niyə "hər yerdə" təhlükəsizlik? Divar analogiyası

Çox şirkət bütün enerjisini bir yerə yönəldir: data-mərkəzin fiziki qorunması və xarici şəbəkə qatını hücumdan qorumaq. Bu, qala qapısına dəmir qapı qoyub içəridəki bütün otaqları açıq qoymağa bənzəyir. Hücumçu qapını keçdisə — hər şey onundur.

Düzgün yanaşma **Defense-in-Depth (DiD — dərinliyə müdafiə)** adlanır: qat-qat müdafiə. Bir qat aşılsa belə, arxasında başqa bir qat dayanır. Serverdə firewall qoyursan — hansı data içəri girə, hansı çölə çıxa bilər, onu idarə edir. Beləliklə bir hissədəki problem digərlərinə yayılmır.

İndi əsas prinsiplərə keçək.

---

## Autentifikasiya vs Avtorizasiya — qarışdırma

İki söz oxşar səslənir, amma fərqli işlər görür:

- **Autentifikasiya** — sən kimsən? İstifadəçi verilən login məlumatı ilə sistemə girə bilərmi?
- **Avtorizasiya** — girdikdən sonra nə edə bilərsən? Hansı resurslara icazən var?

İdarəni **mərkəzləşdir**. Mərkəzi istifadəçi idarəetmə sistemi sənə imkan verir: kimin nə etdiyini izləmək, sistemdən çıxan istifadəçini deaktiv etmək, parol rotasiyası kimi qaydaları bir yerdən tətbiq etmək.

Avtorizasiyanı **ən az imtiyaz (least privilege)** prinsipi ilə qur. İstifadəçinin başlanğıcda heç bir hüququ olmasın — yalnız işini görmək üçün lazım olanı ver. İş rollarına görə qruplar yarat:

- Developer qrupu → dev mühitinə tam giriş, prod-a yalnız oxu
- Yeni developer gələndə sadəcə qrupa əlavə et — bütün icazələr avtomatik

**SSO (Single Sign-On)** çoxlu parol saxlamağa ehtiyacı aradan qaldırır. Üstünə **MFA (multi-factor authentication)** əlavə et — istifadəçi iki və daha çox sübut göstərməlidir (parol + barmaq izi, üz tanıma, təhlükəsizlik tokeni). Parol oğurlansa belə, ikinci qat qalır.

Böyük təşkilatlar bunun üçün Active Directory kimi mərkəzi vasitələr istifadə edir. Müştəriyə baxan tətbiqlərdə (internet-mağaza, sosial şəbəkə) isə **OpenID** — açıq standartlara əsaslanan autentifikasiya protokolu.

---

## Partlayış radiusunu kiçilt (blast radius)

Hərbi termindən götürülüb: bomba partlayanda nə qədər sahəni vurur? Təhlükəsizlikdə də eyni sual. Hücumçu sistemin bir hissəsinə girsə, ziyanı **mümkün qədər kiçik sahə** ilə məhdudlaşdır.

Web tətbiqində:

- Load balancer ayrı şəbəkədə olsun — çünki internetə açıqdır
- Web qatı, tətbiq qatı, verilənlər bazası qatı — hər biri ayrı şəbəkədə
- Bir qatda hücum olsa, digərlərinə yayılmasın

Eyni qayda avtorizasiyaya da aiddir: ən az imtiyaz, müvəqqəti login məlumatları (qısa müddət açıq qalsın), tez-tez açar rotasiyası olan təhlükəsizlik tokenləri.

---

## Loqla, izlə, avtomatlaşdır

**Daimi monitorinq və audit.** Sistemdəki bütün aktivlik loqlanmalıdır — hər tranzaksiya, hər API çağırışı. Mərkəzi monitorinq sistemi qur. Loq hesabına girişi məhdudlaşdır ki, heç kim izləri silə bilməsin. Proaktiv ol — insident istifadəçiyə təsir etməmişdən əvvəl hazır dur.

**Hər yerdə avtomatlaşdırma.** Kimsə sistemə admin imtiyazlı istifadəçi əlavə etdi, ya da firewall-da icazəsiz port açdı? Avtomatlaşdırma bu dəyişiklikləri geri qaytara və təhlükəsizlik komandasını xəbərdar edə bilər.

Bu, **DevSecOps** konsepsiyasının özəyidir: təhlükəsizliyi tətbiq inkişafının və əməliyyatların hər hissəsinə daxil etmək. Təhlükəsizliyi də kod kimi yaz, versiya nəzarətinə qoy, dəyişiklikləri izlə.

---

## Data — sistemin ürəyi, ona görə əsas hədəf

Hücumların böyük hissəsi istifadəçi datasını oğurlamağa yönəlib. Datanı **həssaslıq səviyyəsinə görə təsnif et**:

- Kredit kartı məlumatı → ən həssas, xüsusi ehtiyatla
- Müştəri adı → o qədər gizli deyil

Data üç vəziyyətdə mövcud ola bilər, hər biri fərqli qorunma tələb edir:

- **Saxlanan data (at rest):** disk, noutbuk, USB, bulud saxlanması. Qorunma: **şifrələmə** — açar olmadan data oxunmaz, media başqasının əlinə keçsə belə.
- **Ötürülən data (in transit):** şəbəkə üzərində hərəkət edir. Qorunma: **TLS** kimi şifrələmə protokolları — məlumat tutulsa belə oxunmaz.
- **İstifadə olunan data (in use):** ən çətini. Data yaddaşa yüklənib tətbiq tərəfindən işlənəndə açıq mətn kimi durur, zəifdir. Yeni texnologiyalar var: **TEE (Trusted Execution Environment)** və homomorfik şifrələmə — şifrəli data üzərində açmadan əməliyyat aparmağa imkan verir.

---

## Texnologiya seçimi: istifadəçi kimlik və giriş idarəetməsi

Prinsipləri bildik. İndi maraqlı hissəyə keçək — bunları real dünyada necə tətbiq edirik?

İstifadəçiləri üç kateqoriyaya ayır:

- **Korporativ istifadəçilər:** işçilər, podratçılar, təchizatçılar. Dev/test/deploy imtiyazları, ERP və HR sistemlərinə giriş. Yüzlərlə minlərlə say.
- **Son istifadəçilər (end users):** müştərilər — oyunçular, sosial şəbəkə istifadəçiləri, alıcılar. Milyonlara çata bilər.

Korporativ istifadəçilər üçün mərkəzi repozitori lazımdır: güclü parol, parol rotasiyası, MFA. Populyar MFA təchizatçıları: Google Authenticator, YubiKey, RSA SecurID, Duo, Microsoft Authenticator.

**RBA (Role-Based Authentication)** idarəni sadələşdirir. Üç qrup yarat — admin, developer, tester — hər birinə uyğun giriş siyasəti təyin et:

| Qrup | Giriş |
|------|-------|
| Admin | Bütün mühitlər, o cümlədən prod |
| Developer | Yalnız dev mühiti |
| Tester | Yalnız test mühiti |

Yeni işçi gələndə roluna uyğun qrupa düşür, standart hüquqlar avtomatik gəlir.

### FIM və SSO — parolsuz giriş

**FIM (Federated Identity Management)** istifadəçi məlumatı üçüncü tərəf **IdP (Identity Provider)** də saxlananda işə düşür. İstifadəçi autentifikasiya məlumatını yalnız IdP-yə verir, IdP-nin isə servislə əvvəlcədən etibar münasibəti var.

İstifadəçi servisə girmək istəyəndə, servis təchizatçısı login məlumatını birbaşa istifadəçidən yox, **IdP-dən** alır. Active Directory IdP funksiyasını yerinə yetirə bilər. FIM SSO kimidir, amma parolsuz — federativ server istifadəçini artıq tanıyır.

İndi konkret IAM (Identity and Access Management) variantlarına baxaq.

### Kerberos — bilet sistemi

Kerberos autentifikasiya protokoludur, iki sistemin bir-birini təhlükəsiz tanımasına imkan verir. **Client-server** modelində işləyir, **bilet (ticket)** sistemi ilə. Mərkəzdə **KDC (Key Distribution Center)** durur, iki hissədən ibarətdir: **AS (Authentication Server)** və **TGS (Ticket-Granting Server)**.

Servisə giriş belə addımlanır:

1. Kompüterin (client) AS-dən bilet istəyir.
2. AS səni bazasında yoxlayır. Tapsa, **TGT (Ticket-Granting Ticket)** və session açarı göndərir. Session açarını parolunla açırsan, amma TGT-ni yox — o, yalnız TGS-də olan açarla bağlıdır.
3. Kompüterin TGT-ni götürüb TGS-dən servis bileti istəyir.
4. TGS TGT-ni yoxlayır, problem yoxdursa servis bileti qaytarır.
5. Bileti servisə göstərirsən, servis qəbul edərsə — giriş açılır.

Kerberos faydalıdır, amma açıq kodludur. Böyük təşkilatlar güclü dəstəkli idarə olunan proqramı üstün tutur — məsələn, Active Directory.

### Microsoft Active Directory

AD — Microsoft-un istifadəçilər və maşınlar üçün kimlik servisi. **Domain controller (AD DS)** istifadəçi məlumatı, giriş kimlikləri saxlayır. Proses sadədir:

1. İstifadəçi login məlumatını daxil edir.
2. AD kimliyi yoxlayır, autentifikasiya tokeni qaytarır (ADAL — Active Directory Authentication Library vasitəsilə).
3. İstifadəçiyə session saxlamaq üçün giriş tokeni verilir.

AD-nin ətrafındakı servislər: **AD LDS** (LDAP interfeysi), **AD CS** (açar infrastrukturu, fayl/şəbəkə şifrələməsi), **AD FS** (xarici resurslara giriş — məsələn web tətbiq login-ləri). AD **LDAP** protokolu üzərində qurulub — ağac formalı iyerarxik struktur.

### AWS Directory Service

Bulud servislərinə keçən təşkilatlar üçün: AWS Directory Service AWS resurslarını mövcud lokal AD ilə bağlayır. Buludda yeni istifadəçi kataloqu yaradır, lokal kataloqla təhlükəsiz əlaqə qurur.

- **AWS AD Connector** — mövcud Microsoft AD-ni AWS-ə bağlayır, ayrı sinxronizasiya aləti lazım deyil. YubiKey, Gemalto, RSA kimi MFA infrastrukturunu dəstəkləyir.
- **Simple AD** — kiçik baza üçün (5000-dən az istifadəçi), Samba 4 əsaslı idarə olunan kataloq.

Digər variantlar: Okta, Centrify, Ping Identity, Oracle IDCS.

### SAML — XML ilə etibar körpüsü

**SAML (Security Assertion Markup Language)** IdP və servis təchizatçısı arasında **XML** vasitəsilə etibar münasibəti qurur. SAML **assertion** — istifadəçi avtorizasiyası olan XML sənədidir, IdP servis təchizatçısına göndərir.

Proses (məsələn Salesforce CRM-ə giriş):

1. İstifadəçi servisə giriş sorğusu göndərir.
2. Servis təchizatçısı (CRM) SAML IdP-yə SAML sorğusu göndərir.
3. IdP SSO login səhifəsini açır, istifadəçi məlumat daxil edir.
4. Məlumat istifadəçi bazasına (kimlik anbarı, məsələn AD) yoxlanmağa gedir.
5. Kimlik anbarı yoxlama statusunu IdP-yə qaytarır.
6. IdP SAML assertion-u servis təchizatçısına göndərir.
7. Servis girişi açır.

Bütün müasir kimlik anbarları **SAML 2.0** ilə uyğundur — bu, qırıqsız inteqrasiya deməkdir. SAML korporativ istifadəçilər üçün əladır. Amma böyük istifadəçi bazaları (sosial şəbəkə, internet-mağaza) üçün **OAuth** və **OpenID** daha uyğundur.

### OAuth — parol paylaşmadan giriş

**OAuth** avtorizasiya protokoludur, açıq standart. Parol məlumatı mübadilə etmir — **avtorizasiya tokeni** istifadə edir. İstifadəçi məlumatına giriş verir, amma login məlumatını vermir.

**OIDC (OpenID Connect)** OAuth 2.0 üzərinə autentifikasiya qatı əlavə edir. OAuth resursa giriş verir; OIDC üstəlik istifadəçinin kim olduğunu yoxlayır.

Klassik nümunə — LinkedIn Facebook-dan profil şəklini götürür:

1. İstifadəçi LinkedIn-dən Facebook-dakı profil şəklini istəyir.
2. LinkedIn Facebook şəkillərinə giriş üçün avtorizasiya sorğusu göndərir.
3. Avtorizasiya serveri (Facebook) razılıq ekranı göstərir.
4. İstifadəçi yalnız şəkillərə giriş üçün razılıq verir.
5. Facebook LinkedIn-ə **avtorizasiya kodu** göndərir.
6. LinkedIn bu kodla giriş tokeni istəyir.
7. Facebook kodu yoxlayır, düzdürsə **giriş tokeni** verir.
8. LinkedIn tokenlə şəkillərə çıxış edir.

> Diqqət: müasir dünyada OAuth 2.0 istifadə olunur — OAuth 1.0-dan sürətli və rahat.

### JWT — kompakt token

**JWT (JSON Web Token)** tərəflər arasında məlumatı JSON obyekti kimi təhlükəsiz ötürən kompakt mexanizmdir. Rəqəmsal imza ilə gəlir, ona görə etibar oluna bilər. Üç hissədən ibarətdir, nöqtələrlə ayrılır:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNhdmlkIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

- **Header** — token tipi (JWT) və imza alqoritmi (HS256, RSA)
- **Payload** — claim-lər (istifadəçi haqqında bloklar)
- **Signature** — rəqəmsal imza, tokenin dəyişmədiyini təsdiqləyir

JSON XML-dən sadə və kiçikdir, ona görə JWT SAML-dan kompaktdır. Mikroservis arxitekturasında istifadəçi kimliyini servislər arasında ötürmək üçün ideal. Xüsusən mobil və web tətbiqlərdə.

Bu protokolları əldən qurmaq çətindir. Hazır məhsullar var: **Amazon Cognito** (SAML 2.0, OIDC, OAuth 2.0 dəstəyi + AD inteqrasiyası), Okta, Ping Identity.

---

## Web təhlükəsizliyi: düşmən qapıdadır

İnternet-bankçılıq, internet-mağaza — 24/7 açıq, həssas data ilə işləyir. Bina kimi web tətbiqi də qıfıllanmalı, qorunmalıdır. Əvvəlcə düşməni tanıyaq.

### Kiberhücum növləri

**DoS və DDoS.** DoS (Denial of Service) saytı istifadəçilər üçün əlçatmaz edir — şəbəkə və sistem resurslarını tükədir. **DDoS (Distributed DoS)** çoxlu ələ keçirilmiş sistemdən (**botnet**) istifadə edir, bir hədəfi sorğularla boğur.

> Botnet — zərərli proqramla yoluxdurulmuş və uzaqdan idarə olunan cihazlar şəbəkəsi.

DDoS növləri:
- **DNS flood** — DNS server resurslarını həddindən artıq sorğu ilə tükətmək (flood = daşqın)
- **SSL negotiation attack** — SSL şifrəni açmaq üçün oxunmaz data göndərmək, hesablama resurslarını yormaq
- **UDP reflection** — hədəf serverin IP-sini saxtalaşdırıb "əks etdirən" serverdən böyük cavab almaq
- **SYN flood** — TCP servisini çoxlu yarımçıq bağlantı ilə bloklamaq

**SQLi (SQL injection).** Hücumçu zərərli SQL kodu yeridir, bazaya nəzarəti ələ alır. Nümunə — kredit tətbiqi:

```sql
SELECT * FROM loans WHERE loanId = 117 or '1=1'
```

Şərt həmişə doğru olduğu üçün hücumçu bütün müştəri bazasına çıxış əldə edir. `'1=1'` hər zaman `true` — bu, filtri tamamilə keçir.

**XSS (Cross-Site Scripting).** Fişinq mesajı ilə tanış saytın kopyasına aparan link. Hücumçu real sayta zərərli kod yeridir. Səhifə yüklənəndə client-side JavaScript işə düşür və brauzer cookie-lərini oğurlayır. Cookie-də giriş tokeni, bank autentifikasiyası ola bilər — hücumçu hesabına girib pulunu götürür.

**CSRF (Cross-Site Request Forgery).** Autentifikasiya olunmuş istifadəçini state dəyişən əməliyyata məcbur edir — parol dəyişmək, pul köçürmək. XSS-dən fərqi: skript yeritmir, **sorğunu saxtalaşdırır**. Emaildə link göndərir, istifadəçi klikləyir, bank sorğunu alıb pulu hücumçuya köçürür. Admin hesabına çıxsa — xüsusən dağıdıcı.

**Buffer overflow.** Proqram müvəqqəti yaddaş sahəsinə (buffer) data yazır. Hücumçu buffer-ə bitişik yaddaşı qəsdən üzərinə yazır, orada saxlanan icra kodunu öz proqramı ilə əvəz edir, bütün sistemə nəzarət alır.

### Web-i necə qorumalı: WAF

**WAF (Web Application Firewall)** HTTP/HTTPS trafikinə (port 80 və 443) konkret qaydalar tətbiq edən firewall-dur. Web trafikini analiz edir, gözlənilən davranışa uyğunluğunu yoxlayır.

**AWS WAF** nümunə: HTTP başlıqları, geolokasiya, zərərli IP-lər, xüsusi URI əsasında qaydalar. XSS və SQLi kimi tipik hücumları bloklayır. Bir qayda dəstini müxtəlif tətbiqlərdə təkrar istifadə edə bilərsən.

### DDoS bloklama

Əsas prinsip: **hücum səthini kiçilt**. Sadə deyilişlə — instans açıq olmalı deyilsə, açıq etmə.

Strategiyalar:
- İnternet giriş nöqtələrini azalt — load balancer-ə giriş aç, web serverlərə yox
- Lazımsız giriş nöqtələrini aradan qaldır
- Zəruri giriş nöqtələrini etibarsız istifadəçilərdən gizlət
- Giriş nöqtəsini izolyasiya et, xüsusi məhdudiyyət siyasəti tətbiq et

Əsas hədəf: DDoS-u **CDN sərhədində** blokla. Tətbiq serverlərinə çatan DDoS-la mübarizə daha çətin və bahalıdır. Üçqatlı strategiya: WAF iki load balancer arasında yerləşir. **Amazon CloudFront** yalnız düzgün formalaşdırılmış bağlantıları qəbul edir, SYN flood və UDP reflection hücumçu serverlərə çatmamışdan qarşısını alır.

DDoS-a qarşı miqyaslama:
1. Uyğun server ölçüsü və konfiqurasiya seç
2. Load balancer + auto-scaling (server əlavə/sil)
3. CDN və DNS server — miqyaslanan trafik üçün yaradılıb

> Diqqət: DDoS serverləri həddindən artıq miqyaslaya bilər — çox baha başa gələr, amma əlçatanlığa zəmanət verməz. Ağıllı **maksimum server limiti** təyin et ki, DDoS maliyyə zərəri vurmasın.

---

## Tətbiq və infrastrukturun qorunması

### OS və tətbiq hardening

Zəiflikdən tam qaçmaq mümkün deyil, amma **hardening** (möhkəmləndirmə) ilə riski azalt:

- Fayl, qovluq, bölmə səviyyəsində uyğun icazələr ver
- Tətbiqə və istifadəçilərinə **root** hüququ vermə
- Hər tətbiq üçün ayrı kataloq
- Proses səviyyəsində maksimum yaddaş/CPU limiti qoy — DoS qarşısını alır
- Tətbiq restartını avtomatlaşdır (DAEMON Tools, Supervisord, systemd)

### Təhlükəsiz kod

OS təchizatçısının son təhlükəsizlik yamalarını (patch) həmişə tətbiq et. Prosesi avtomatlaşdır. Amma yama bəzən işləyən tətbiqi poza bilər — ona görə avtomatlaşdırılmış test və deploy ilə **CI/CD pipeline** qur.

AWS **Systems Manager** yamaları tətbiq edir və server parkını izləyir. Kod yazanda **OWASP** (Open Web Application Security Project) təhlükəsiz proqramlaşdırma praktikalarını inteqrasiya et.

### Şəbəkə təhlükəsizliyi

İnfrastruktur qorunmasının əsası şəbəkədir. Data-mərkəzin fiziki təhlükəsizliyi provayderin işidir; **şəbəkə təhlükəsizliyi sənin işindir**. AWS nümunəsində komponentlər:

- **VPC (Virtual Private Cloud)** — buludda məntiqi izolyasiya olunmuş şəbəkə. IP diapazonu **CIDR** ilə təyin olunur. Məsələn `10.0.0.0/16` bloku `10.0.0.0`-dan `10.0.255.255`-ə qədər 65 535 IP əhatə edir.
- **Subnet-lər** — şəbəkənin CIDR ilə bölünmüş hissələri. Tətbiqə görə yox, **internetə girişə görə** təşkil et: xüsusi (private) və açıq (public).
- Açıq subnet: internet girişi lazım olan resurslar (load balancer, NAT, bastion host). Xüsusi subnet: baza və tətbiqlər. Xüsusi subnet-lərə daha çox IP ayır.
- **Route table (marşrut cədvəli)** — hansı serverin trafik alacağını təyin edən qaydalar. Hər subnet üçün ayrı cədvəl tövsiyə olunur.
- **Security group** — bir və ya bir neçə instansın trafikini idarə edən virtual firewall. **Stateful** (vəziyyət saxlayan). Ən az imtiyaz üzrə default olaraq bütün gələn trafiki rədd edir.
- **NACL (Network Access Control List)** — subnet səviyyəsində virtual firewall. **Stateless** (vəziyyət saxlamayan) — hər sorğu müstəqil baxılır. Gələn sorğu icazəli olsa belə, ona uyğun gedən cavab da açıq şəkildə icazələnməlidir.
- **IGW (Internet Gateway)** — subnet-i açıq etmək üçün internet trafikini yönləndirir. VPC-yə qoşulmalı.
- **NAT Gateway** — xüsusi subnet-dəki instansa çölə çıxış (yama yükləmək üçün) verir, amma gələn internet trafikindən qoruyur.
- **Bastion host** — xüsusi subnet resurslarına aralıq giriş serveri. Girişdə həmişə açıq açar şifrələməsi (user/parol yox).

**VPC Flow Logs** — trafiki izləyən təhlükəsizlik aləti. Qəbul/rədd edilən trafik haqqında məlumat verir. Naməlum IP-dən gözlənilməz sorğu artımı görsən — xəbərdarlıq qurub erkən reaksiya verə bilərsən.

### IDS və IPS

- **IDS (Intrusion Detection System)** — şəbəkə trafikindəki hücum şablonlarını aşkarlayır. Yalnız aşkarlama və monitorinq.
- **IPS (Intrusion Prevention System)** — daha irəli gedir, zərərli trafiki proaktiv dayandırır.

IPS-in iki aşkarlama metodu:
- **Signature-based** — bütün məlum hücumların unikal şablonlarını (imzalarını) saxlayan baza
- **Statistical anomaly-based** — normal şəbəkə etalonu qurur, təsadüfi nümunələrlə müqayisə edir; ciddi kənarlaşmada müdaxilə edir

İki kateqoriya:

**HIDS (Host-based IDS)** — hər host-da işləyir. Fayl sistemini, host bağlantılarını izləyir. Üstünlük: dərin analiz, üfüqi miqyaslama, tətbiq performansına təsir etmir. Çatışmazlıq: çoxlu serverdə agent idarəsi əlavə xərc; hər agent təcrid işlədiyi üçün əlaqələndirilmiş hücumları aşkarlamaq çətin.

**NIDS (Network-based IDS)** — şəbəkə qırığına qoyulur, bütün trafik yoxlanış üçün oradan keçir. Üstünlük: tək komponent, host-lardan ayrı idarə, vahid monitorinq nöqtəsi. Çatışmazlıq: əlavə şəbəkə sıçrayışı performansı azaldır; şifrəni açıb-bağlamaq yavaşladır və şəbəkə komponentini cazibədar hədəfə çevirir.

---

## Data təhlükəsizliyi: dərinə enək

Data hər şeyin mərkəzindədir — tibbi kartlar, ödəniş məlumatı, şəxsiyyət sənədləri. Qorunma metodları:

### Data təsnifatı

Yüksək səviyyədə üç kateqoriya:

- **Restricted (məhdud/konfidensial)** — yanlış əllərə keçsə müştəriyə birbaşa ziyan. PII: sosial sığorta nömrəsi, pasport, kredit kartı, ödəniş məlumatı.
- **Private (şəxsi)** — həssas, konfidensial datanı oğurlamaq üçün istifadə oluna bilər: email, telefon, tam ad, ünvan.
- **Public (açıq)** — hamıya açıq, minimal qorunma: müştəri rəyləri, ictimai nick.

> İstifadəçilərə heç vaxt datanın birbaşa girişini vermə — yalnız-oxu hesabat alətləri istifadə et.

### Data at rest şifrələmə

Saxlanan data (SAN, NAS, bulud). Şifrələmədən başqa: maskalama, tokenizasiya. İki kriptoqrafik kateqoriya:

- **Simmetrik açar:** eyni açar həm şifrələmə, həm açma üçün. Köhnə: **DES** (56-bit). İndi: **AES** (128/192/256-bit).
- **Asimmetrik açar (açıq açar şifrələməsi):** iki fərqli açar — açıq (public) şifrələyir, xüsusi (private) açır. Yalnız private açar sahibi datanı aça bilər. **RSA** (Rivest-Shamir-Adleman) — ən populyar.

> 256-bit AES ilə şifrələnmiş datanı sındırmaq praktiki olaraq mümkünsüzdür. Amma yalnız açarla açılır — açar təhlükəsiz yerdə saxlanmalıdır.

Şifrələmə performansa təsir edir (əlavə emal qatı). Yalnız həqiqətən lazım olan yerdə tətbiq et.

### Açar idarəetməsi

**Envelope encryption (zərf şifrələməsi)** — data açarı açıq mətni şifrələyir, master açar isə data açarını şifrələyir. İki açar = əlavə qat.

**AWS KMS (Key Management Service)** envelope encryption verir, mərkəzi nəzarət, açar rotasiyası. Analoqlar: GCP Cloud Key Management, Azure Key Vault.

Normativ tələblərə görə bəzən **HSM (Hardware Security Module)** — kriptoqrafik açarları qorumaq üçün xüsusi cihaz. Sındırma cəhdlərini aşkarlayıb açarları silir. AWS CloudHSM nümunədir. Yüksək əlçatanlıq üçün bir neçə yerdə deploy et.

### Data in transit şifrələmə

Şifrələnməmiş protokolla (HTTP) ötürülən data tutula bilər:
- **Eavesdropping (qulaqasma)** — kiçik paket tutub başqa məlumat axtarır
- **MITM (Man-In-The-Middle)** — saxtakarlıq, hücumçu gizli müdaxilə edib alıcı adından cavab verir

Qarşısı: SSL/TLS ilə ötürmə. Bugün əksər saytlar **HTTPS** istifadə edir. **SSL/TLS handshake** prosesi (RSA açar mübadiləsi):

1. **Client Hello** — client SSL versiya, şifr parametrləri, session datası göndərir.
2. **Server Hello** — server razılaşır, versiyanı yoxlayır, açıq açarı olan sertifikatı göndərir.
3. **Autentifikasiya və pre-secret:** client sertifikatı yoxlayır (ad, müddət, verən orqan), pre-master secret yaradıb serverin açıq açarı ilə şifrələyir.
4. **Dešifr və master secret:** server öz xüsusi açarı ilə açır. Hər iki tərəf pre-secret-dən master secret yaradır.
5. **Session açarı:** hər ikisi bundan sonra session açarı (ümumi sirr) ilə şifrələyəcəklərini bildirir.

Sertifikat **CA (Certification Authority)** — məsələn Verisign — tərəfindən verilir, **PKI (Public Key Infrastructure)** ilə qorunur.

Web-dən kənar ötürmə də şifrələnməlidir: **SSH** (server bağlantısı), **IPsec** (VPN üzərində korporativ trafik), **SFTP/FTPS** (fayl ötürmə), **SMTPS/IMAP** (email).

---

## API təhlükəsizliyi: restoran ofisiantı analogiyası

API-ni restoran ofisiantı kimi düşün. Sən (tətbiq) sifarişini (sorğu) ofisianta (API) verirsən, o mətbəxdən (başqa sistem/baza) yeməyi (data/cavab) gətirir.

API-lər bulud və mikroservis arxitekturalarında mərkəzi rol oynadığı üçün cazibədar hədəfdir. Bir API-dəki zəiflik bütün tətbiq ailəsini təhlükəyə ata bilər. Ən yaxşı praktikalar:

- **Autentifikasiya və avtorizasiya:** güclü metodlar (OAuth, JWT). Autentifikasiya olunmuş istifadəçi belə yalnız icazəli dataya çıxa bilsin. Bank tətbiqi OAuth ilə yalnız sahibin öz hesab detallarını göstərir.
- **Rate limiting (tezlik məhdudiyyəti):** brute-force qarşısı. Verilən müddətdə istifadəçi/IP-dən sorğu sayını məhdudlaşdır. Məsələn: dəqiqədə 10 sorğudan çox olmaz.
- **Input validation (giriş yoxlaması):** göndərilən datanı yoxla və təmizlə. SQLi kimi hücumların qarşısını alır. Rəy formu zərərli skript ehtiva etmədiyini yoxlayır.
- **Şifrələmə:** TLS. Paket tutulsa belə oxunmaz. Analogiya: şərti dildə danışmaq — qulaq assalar da, dili bilməsələr başa düşməzlər.
- **Monitorinq və audit:** anomal şablonlar (gözlənilməz sorğu artımı) hücumun erkən əlaməti ola bilər. Analogiya: mağazadakı təhlükəsizlik kameraları.
- **API gateway:** əlavə qorunma qatı. Sorğu marşrutlaşdırma, yalnız yoxlanmış sorğuların backend-ə çatması. Analogiya: mehmanxana portyesi bronu təsdiqləyir.
- **Error handling:** xəta mesajında həssas məlumat açma. Parol reset-də "email tapılmadı" demə — ümumi mesaj ver, fişinq cəhdlərini çətinləşdirir.
- **WAF:** API endpoint-lərinə gələn trafiki analiz edib SQLi/XSS bloklayır.
- **Versionlaşdırma:** v2-də zəiflik tapılsa, v1 və v3-ə təsir etmədən düzəlt.
- **Dövri təhlükəsizlik testi:** penetrasiya testi, zəiflik qiymətləndirməsi. Musiqi streaming platforması API-ni test edir ki, kənar istifadəçilər abunəsiz premium funksiyalara çıxa bilməsin.

---

## Compliance: qaydalar oyunu

Müştəri məxfiliyi və data təhlükəsizliyinə yönəlik uyğunluq sertifikatları sənaye və coğrafiyaya görə dəyişir. Kateqoriyalar:

- **Qlobal:** ISO 9001, ISO 27001/27017/27018, SOC 1/2/3, CSA STAR (bulud).
- **ABŞ hökuməti:** FedRAMP, DoD SRG, FIPS 140, NIST SP 800, IRS 1075, ITAR, VPAT, CJIS.
- **Sənaye:** PCI DSS (ödəniş), HIPAA (səhiyyə), FERPA, MPAA, FDA, GLBA, FISC (Yaponiya).
- **Regional:** GDPR (Aİ), G-Cloud (BB), MTCS (Sinqapur), IRAP (Avstraliya), MeitY (Hindistan), Privacy Shield (ABŞ).

> Tətbiqi **dizayndan əvvəl** uyğunluq tələblərinə görə qiymətləndir — bu tələblər şifrələmə növünə, loq/audit sisteminə və iş yükünün yerinə ciddi təsir edir.

---

## Buludda ümumi məsuliyyət modeli

Bulud standarta çevrildikcə əsas sual: təhlükəsizlikdən kim məsuldur? Cavab: **hər ikisi** — müştəri və provayder. Xətt haradadır?

**Müştəri məsuliyyəti (buludda təhlükəsizlik):**
- Server OS — yama və dəstək
- Tətbiq — parol siyasəti, giriş idarəsi
- OS/host firewall — IDS/IPS tətbiqi
- Şəbəkə konfiqurasiyası və security group — firewall qaydaları
- Müştəri datası və şifrələmə — datanı qorumaq

**Provayder məsuliyyəti (buludun təhlükəsizliyi):**
- Data-mərkəzlər — 24/7 fiziki təhlükəsizlik, iki faktorlu giriş, videomüşahidə, təhlükəsiz disk utilizasiyası (demaqnitləşdirmə, fiziki məhv)
- Hardware infrastruktur — server, disk
- Software infrastruktur — host OS, virtualizasiya
- Şəbəkə infrastrukturu — router, switch, load balancer, kabel

Sadə deyilişlə: provayder **buludun özünü** qoruyur (fiziki infrastruktur), sən **buludun içindəkini** qoruyursan (tətbiq və data). Bu model AWS-dən başqa Azure, GCP, Oracle, IBM, Alibaba üçün də keçərlidir.

Praktik məsləhət: təhlükəsizlik standartları hopdurulmuş **etalon virtual server imici** yarat, hər yeni serverdə istifadə et — homogen təhlükəsizlik. Bütün infrastrukturu şablonla dizayn et ki, öyrənilmiş praktikaları hər yeni mühitdə təkrarlayasan.

---

## Təhdid modelləşdirməsi: problemi problem olmadan tut

**Təhdid modelləşdirməsi** — potensial təhdidləri aşkarlamaq, qiymətləndirmək və prioritetləşdirmək üçün strukturlaşdırılmış mexanizm. Komandaya proaktiv olmağa imkan verir. Komponentləri (internet-mağazaya yeni "çoxlu çatdırılma ünvanı saxlama" funksiyası əlavə etmək nümunəsində):

1. **Sistem təsviri:** təhdidlərdən əvvəl sistemi aydın anla. Arxitektura, komponentlər, data axını, giriş nöqtələri diaqramları qur. Komanda yeni funksiyanın mövcud sistemlə necə əlaqələndiyini göstərən data axını diaqramı çəkir.
2. **Təhdid identifikasiyası:** potensial təhdidlər siyahısı. **STRIDE** metodikası: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege. Nümunədə: ünvan saxlamaq data sızmasında ünvanların açılmasına gətirə bilər — siyahıya düşür.
3. **Təhdid analizi:** hər təhdidin nəticəsini və ehtimalını qiymətləndir, prioritetləşdir. Ünvan sızması etimad itkisinə gətirə bilər — yüksək ciddilik təyin olunur.
4. **Risk azaltma strategiyası:** hər təhdid üçün ən yaxşı hərəkət. SQLi-yə qarşı parametrləşdirilmiş sorğular, fişinqə qarşı 2FA, ünvanları bazada şifrələmək, şübhəli aktivlik üçün xəbərdarlıq.
5. **Sənədləşdirmə:** təhdidlər, ciddilik, seçilmiş strategiyalar. Altı ay sonra başqa bazaya keçid tələbi gələndə sənəd yeni komandaya mövcud tədbirləri başa salır.
6. **Nəzərdən keçirmə və yeniləmə:** birdəfəlik iş deyil. Sistem inkişaf etdikcə yeni təhdidlər çıxır. Chat-bot əlavə etməzdən əvvəl komanda modelə baxır — yeni funksiya yeni zəiflik yaradırmı?

---

## Sona qədər: əvvəl vs sonra

Bu yazının əvvəlində qorxulu bir mənzərə çəkdik — xəbərlərdə şirkətinin adı, sızmış müştəri datası. İndi geri baxaq.

**Əvvəl:** bütün diqqət qala qapısında — xarici sərhəd. İçəri açıq. Bir qat aşılanda hər şey itir.

**Sonra:** hər qatda müdafiə. Autentifikasiya və avtorizasiya. Ən az imtiyaz. Kiçildilmiş partlayış radiusu. Şifrələnmiş data — istirahətdə, ötürmədə, istifadədə. WAF, IDS/IPS, izolyasiya olunmuş subnet-lər. Loqlanan hər hərəkət. Təhdid modeli hər yeni funksiyadan əvvəl.

Təhlükəsizlik bir dəfə qurub unudulan divar deyil — davamlı, planlı iş. Hər insident bir dərs, hər dərs bir yaxşılaşma.

Növbəti kritik xüsusiyyət **etibarlılıqdır (reliability)** — daim əlçatan, iş yükü dalğalanmasına dözən sistem. Amma bu, başqa yazının mövzusudur.

Sən öz sistemində neçə qat müdafiə qurmusan? Bir qat aşılsa, arxasında nə qalır?

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
