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
