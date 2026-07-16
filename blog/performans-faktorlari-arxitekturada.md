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
