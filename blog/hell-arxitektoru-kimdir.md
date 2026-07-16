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
