# DevOps niyə sadəcə "moda söz" deyil — komandaları bir masaya oturdan mədəniyyət

Bu yazıda gəlin bir suala cavab verək: niyə iki komanda — biri kod yazan, digəri onu işlədən — illərlə bir-birindən xəbərsiz işləyib, sonra da təhvilat gecəsi bir-birini günahlandırıb? Və DevOps bu problemi necə həll edir?

Əgər siz backend, frontend, ya da infrastruktur tərəfindən gəlirsinizsə, bu hekayə tanış gələcək. Klassik ənənəvi mühitdə **development** (Dev) komandası biznes sahiblərindən tələbləri toplayır, tətbiqi yazır və "hazırdır" deyib təhvil verir. Sistem administratorları — yəni **operations** (Ops) komandası — isə yalnız o tətbiqi ayaqda saxlamaqla, əlçatanlıq (availability) tələblərini ödəməklə məşğuldur.

Problem burada başlayır: bu iki komanda inkişaf dövrü boyunca demək olar heç danışmır. Bir-birinin proseslərini, ehtiyaclarını anlamır. Hərəsi öz alətini, öz prosesini işlədir — və nəticədə eyni işi təkrar-təkrar görürlər.

> DevOps texnologiya deyil əvvəlcə — o, komandaların bir-birini eşitməsi haqqında mədəniyyətdir.

Konkret nümunə: Dev və QA (keyfiyyət nəzarəti) komandası tətbiqi əməliyyat sisteminin filan yamağı (patch) üzərində test edir. Hər şey işləyir. Sonra Ops komandası **eyni** buildi production-a — amma OS-un başqa versiyasında — deploy edir. Nəticə: sınıqlar, gecikən deadline-lar, bir-birinə barmaq tuşlayan komandalar.

DevOps məhz bu divarı sökür. O, Dev və Ops arasında əməkdaşlığı və koordinasiyanı təşviq edir ki, məhsul və ya servis **fasiləsiz** çatdırılsın. Xüsusən müxtəlif tətbiq, alət, texnologiya, platforma və verilənlər bazasından asılı olan təşkilatlarda çox işə yarayır.

DevOps mədəniyyətinə müxtəlif yanaşmalar var, amma hamısının bir hədəfi var: **məsuliyyəti bölüşdürərək əməliyyat mükəmməlliyini artırmaq və məhsulu mümkün qədər qısa müddətdə çatdırmaq.**

---

## Bəs təhlükəsizlik harada qalır? — DevSecOps

Təhlükəsizlik hər tətbiqin əsas prioritetlərindən biridir, çünki bir təhlükəsizlik insidenti biznesə ağır zərbə vura bilər. Amma ənənəvi yanaşmada təhlükəsizlik deploy prosesinin **sonunda** yada düşür — ayrıca bir "Sec" komandası reaktiv şəkildə buna baxır. Yəni problem yarandıqdan sonra.

Burada `DevSecOps` metodologiyası devreyə girir. Adındakı üç hissə — **Dev**elopment, **Sec**urity, **Op**erations. Fikir sadədir: təhlükəsizliyi proqram təminatının inkişaf dövrünün **əvvəlindən** və boyunca inteqrasiya et. Bu, komandalar arası izolyasiyanı sındırır və Dev, Ops, Security komandalarını birgə işlədir.

Nəticədə təhlükəsizlik keyfiyyət, etibarlılıq, stabillik və dayanıqlıqdan güzəştə getmədən təmin olunur.

---

## DevOps əslində nə verir? — sürət və etibarlılıq

DevOps-da Dev və Ops komandaları build və deploy mərhələlərində birlikdə işləyir, məsuliyyəti bölüşür və fasiləsiz geri əlaqə (feedback) verir. Buildlər çox vaxt production-a bənzər mühitlərdə test olunur — bu isə xətaları **erkən** aşkarlamağa imkan verir.

Vacib bir nüans: DevOps yalnız Dev və Ops-dan ibarət deyil. O, bütün təşkilatı işə salır — rəhbərlik, biznes sahibləri, QA mühəndisləri, relase menecerləri, əməliyyat komandası, sistem administratorları. Hamısı.

Bəzən eyni mühəndis komandası tətbiqi həm yazır, həm işlədir — bütün dövr boyunca. Belə komandanın bir funksiya ilə məhdudlaşmayan geniş bacarıq dəsti olmalıdır.

İndi isə maraqlı hissəyə keçək — DevOps-un konkret faydaları:

- **Sürət:** yeni funksionallığı daha tez buraxmaq dəyişən biznes ehtiyaclarına uyğunlaşmağa və bazar payını genişləndirməyə kömək edir.
- **Sürətli çatdırılma:** kod buildindən deploy-a qədər bütün pipeline-ın avtomatlaşdırılması effektivliyi artırır. Bug fix-lər və yeni funksiyalar daha tez çıxır — rəqabət üstünlüyü.
- **Etibarlılıq:** CI və CD kimi praktikalar test və təhlükəsizlik yoxlamalarını avtomatlaşdırır, son istifadəçi təcrübəsini yaxşılaşdırır.
- **Miqyaslana bilmə (scalability):** avtomatlaşdırma sayəsində infrastruktur və tətbiq ehtiyaca görə miqyaslanır.
- **Əməkdaşlıq:** DevOps "sahiblik mədəniyyəti" formalaşdırır — komandalar öz hərəkətlərinin nəticələrini nəzərə alır, bölüşdürülmüş məsuliyyət modeli ilə işləyir.
- **Təhlükəsizlik:** tez-tez dəyişikliklər ciddi yoxlama tələb edir. DevOps təhlükəsizlik və uyğunluq (compliance) praktikalarını avtomatlaşdırır və monitorinq edir.

---

## DevOps-un dörd sütunu

DevOps-un əsas komponentləri bunlardır:

- CI/CD
- Fasiləsiz monitorinq və təkmilləşdirmə
- Infrastructure as Code (kod kimi infrastruktur)
- Konfiqurasiya idarəetməsi

Hamısının ortaq nöqtəsi — **avtomatlaşdırma**. Yetkin DevOps mühitində infrastruktur kod şəklində idarə olunur. Avtomatlaşdırma komandaya test və production mühitlərini sürətlə qurmağa imkan verir.

Gəlin hər birinə baxaq.

### Fasiləsiz inteqrasiya / fasiləsiz deploy (CI/CD)

**Continuous Integration (CI)** — developerlər koda tez-tez commit edir. Kod müntəzəm build olunur və hər build avtomatlaşdırılmış unit və inteqrasiya testləri ilə yoxlanılır.

**Continuous Deployment (CD)** — proses bir addım da irəli gedir: kod production-a tez-tez deploy olunur. Buildlər test mühitlərində yoxlanır, uğurlu olanlar staging (aralıq) və ya production-a keçir.

Bir incəlik: CI proqram buraxılışının böyük hissəsini avtomatlaşdırır — build, test, sonra staging-ə deploy. Amma **canlı production-a son deploy-u developer özü işə salmalıdır**, bu addım avtomatik deyil. CD isə bunu da genişləndirir: bütün kod dəyişiklikləri build-dən sonra test və/və ya production mühitinə deploy olunur.

CD o demək deyil ki, hər dəyişiklik dərhal canlıya çıxır — sadəcə hər dəyişiklik **buna hazırdır**. Staging-də test bitəndə bir manual təsdiq addımı "yaşıl işıq" verir. Yəni CD-də production-a deploy bir **biznes qərarı** olur, alətlə avtomatlaşdırılır.

### Fasiləsiz monitorinq və təkmilləşdirmə

Monitorinq tətbiqin və infrastrukturun performansının müştəriyə necə təsir etdiyini qiymətləndirir. 24/7 işləyən servislərin dövründə aktiv monitorinq mütləqdir.

İzlənilə biləcək bəzi DevOps metrikaları:

- **Dəyişiklik həcmi:** yazılan user story sayı, yeni kod sətirləri, düzəldilən buglar.
- **Deploy tezliyi:** komanda nə qədər tez-tez deploy edir. Ümumən stabil qalmalı və ya artmalıdır.
- **Development-dən deploy-a qədər vaxt:** dövrün hansı mərhələsində əngəl var — bu göstərir.
- **Uğursuz deploy faizi:** aşağı olmalıdır. Dəyişiklik həcmi ilə birlikdə baxılmalıdır — az dəyişiklik, çox sınıq deploy varsa, potensial sınıq nöqtələrini araşdır.
- **Əlçatanlıq (availability):** neçə buraxılış SLA pozan sınığa səbəb oldu? Orta dayanma vaxtı nədir?
- **Müştəri şikayətlərinin həcmi:** açılan ticket sayı keyfiyyəti göstərir.
- **İstifadəçi sayının dəyişməsi:** yeni qeydiyyatlar və artan trafik infrastrukturu miqyaslamağa kömək edir.

### Infrastructure as Code (IaC)

İnfrastruktur almaq, idarə etmək, köhnəni ləğv etmək — hamısı insan iştirakı tələb edir. İnsan isə — istər təcrübəyə, istər sənədləşdirilmiş təlimata əsaslansın — statistik olaraq səhv edir.

Həlli: bu işi avtomatlaşdır. IaC-də infrastruktur **şablonlarla** təyin olunur. Bir şablon mühitin bir hissəsini, ya da bütününü təsvir edə bilər. Ən vacibi — həmin şablon eyni mühiti yenidən yaratmaq üçün təkrar işlədilə bilər.

İnfrastruktur kod şəklində olduğu üçün onu adi kod kimi işləyə bilərsən — versiya nəzarəti, alətlər, standartlaşdırılmış deploy. İnsan xətası minimuma enir.

Populyar IaC alətləri: Ansible, Terraform, Azure Resource Manager, Google Cloud Deployment Manager, Chef, Puppet, AWS CDK və AWS CloudFormation.

Aşağıda AWS CloudFormation ilə bir S3 obyekt anbarı (bucket) yaradan bir nümunə var. Diqqət et — istifadəçi bucket adını parametr kimi seçə bilir:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Create an S3 Storage with a parameter to choose own bucket name.'
Parameters:
  S3NameParam:
    Type: String
    Default: 'architect-book-storage'
    Description: 'Enter the S3 Bucket Name'
    MinLength: '5'
    MaxLength: '30'
Resources:
  Bucket:
    Type: 'AWS::S3::Bucket'
    DeletionPolicy: Retain
    Properties:
      AccessControl: Private
      BucketName:
        Ref: S3NameParam
      Tags:
        - Key: 'Name'
          Value: 'MyBucket'
Outputs:
  BucketName:
    Description: 'BucketName'
    Value:
      Ref: S3NameParam
```

Bu kod işləyəndə Amazon S3 bucket yaranır. Bir detala fikir ver: `DeletionPolicy: Retain`. Bu, infrastruktur söndürüləndə belə anbarın silinməməsini təmin edir — data təhlükəsiz qalır. Data kritik olduğu üçün administrator bilərəkdən bunu əlavə edib.

### Konfiqurasiya idarəetməsi (CM)

**Configuration Management** — infrastruktur və tətbiqlər boyunca resurs konfiqurasiyalarını avtomatik standartlaşdırmaq prosesidir. Chef, Puppet, Ansible kimi alətlər IaC-ni idarə etməyə və sistem administrasiyasının böyük hissəsini avtomatlaşdırmağa kömək edir.

Fayda: yanlış konfiqurasiyadan yaranan xətaları aradan qaldırır. Bir konfiqurasiyanı bir düymə ilə yüzlərlə serverə tətbiq edə bilirsən. Üstəlik konfiqurasiya versiyalanır, izlənir və audit olunur.

Bu alətlər bir **controller maşın** üzərindən server node-larını idarə edir. Fərqləri var:

| | Ansible | Puppet | Chef |
|---|---|---|---|
| **Mexanizm** | Controller maşın dəyişiklikləri SSH ilə serverlərə tətbiq edir | Master node dəyişiklikləri Puppet node-larla sinxronlaşdırır | Chef workstation serverlərdə dəyişiklik axtarır və node-a göndərir |
| **Arxitektura** | İstənilən server controller ola bilər | Master node üzərindən mərkəzləşdirilmiş | Chef server üzərindən mərkəzləşdirilmiş |
| **Skript dili** | YAML | Ruby əsaslı ixtisaslaşdırılmış | Ruby |
| **Terminologiya** | Playbook və roles | Manifests və modules | Recipes və cookbooks |
| **Test icrası** | Ardıcıl | Sərbəst sıra | Ardıcıl |

Sadə desək: Ansible **agentsiz** (decentralized) yanaşma işlədir — node-larda agent qurmaq lazım deyil. Puppet və Chef isə mərkəzləşdirilmiş serverlə işləyir və node-larda agent tələb edir. AWS-da Chef və Puppet-i buludda idarə etmək üçün **OpsWorks** platforması var.

---

## DevSecOps-u CI/CD ilə birləşdirmək

İndi təhlükəsizliyi dərinə aparaq. DevSecOps CI/CD pipeline-ın **hər mərhələsində** tətbiq olunmalıdır. Bu, hər serverə təyin olunmuş access və rol idarəetməsini, build serverlərinin (məsələn Jenkins) qorunmasını, bütün artefaktların və kodun yoxlanmasını əhatə edir.

Pipeline-ın hər inteqrasiya nöqtəsində fərqli problem tuta bilərsən:

- **Kod yazma mərhələsi:** bütün kod skan olunur ki, içində gizli açar (secret) və ya access key qalmasın.
- **Build mərhələsi:** təhlükəsizlik artefaktları (şifrələmə açarları, access token-lər) tag-lənir ki, asan tanınsın.
- **Test mərhələsi:** konfiqurasiya skan olunur — bütün təhlükəsizlik standartlarına uyğundurmu?
- **Deploy və provisioning:** bütün təhlükəsizlik komponentlərinin qeydiyyatı yoxlanılır. **Checksum** hesablanır ki, build faylları dəyişdirilməyib. OS-lər faylların ötürülmə zamanı dəyişmədiyini yoxlamaq üçün `checksum` əmri verir.
- **Monitorinq mərhələsi:** bütün standartlar izlənir, fasiləsiz avtomatik audit aparılır.

### AST — tətbiq təhlükəsizliyinin test edilməsi

**Application Security Testing (AST)** kritik komponentdir. Dörd kateqoriyaya bölünür:

- **SCA (Software Composition Analysis):** açıq mənbəli komponentlərin təhlükəsizlik səviyyəsini, lisenziya uyğunluğunu və kod keyfiyyətini qiymətləndirir. Layihənin asılılıqlarındakı (dependencies) zəiflikləri tapmağa çalışır. Alətlər: OWASP Dependency-Check, Synopsys Black Duck, WhiteSource, Snyk, GitLab.
- **SAST (Static Application Security Testing):** kodu **kompilyasiyadan əvvəl** skan edir. "Ağ qutu" (white box) testidir — mənbə kodu birbaşa təhlil olunur. Üstünlüyü: dövrün ən erkən mərhələsində — kod yazarkən — işə düşür, işləyən tətbiq və kod icrası tələb etmir. Alətlər: SonarQube, PHPStan, Coverity, Snyk, Klocwork, Checkmarx.
- **DAST (Dynamic Application Security Testing):** tətbiq **işləyərkən** kənardan hücumu simulyasiya edərək zəiflikləri tapır. "Qara qutu" (black box) testidir — tətbiqə xaricdən müraciət edir. SQL injection, XSS kimi problemləri tutur. Alətlər: OWASP ZAP, Netsparker, StackHawk, HCL AppScan, Checkmarx.
- **IAST (Interactive Application Security Testing):** tətbiq aktiv test olunarkən kodu real vaxtda təhlil edir, pipeline-a gecikmə əlavə etmir. Adətən QA mühitlərində avtomatlaşdırılmış funksional testlərlə birlikdə işləyir. Alətlər: GitLab, Veracode, Burp Suite, Acunetix, HCL AppScan.

---

## Deploy strategiyaları — hansı yol nə vaxt?

CD mövcud versiyadan yeni versiyaya sorunsuz keçidi təmin edir. Beş populyar strategiya var:

### In-place deployment (yerində deploy)

Yeni versiyanı mövcud server parkında işə salırsan. Yeniləmə bir dəfəyə olur və bir qədər dayanma (downtime) tələb edir. İnfrastrukturda demək olar heç dəyişiklik yoxdur, DNS qeydlərini yeniləmək lazım deyil. Sürətlidir. Amma uğursuz olsa, tək bərpa yolu — yenidən deploy etmək.

Sadə misal: v1-i v2 ilə əvəz edirsən. Ucuz və tez.

### Rolling deployment (yumşaq/tədricən deploy)

Server parkı qruplara bölünür ki, yeniləmə eyni anda olmasın. Prosesdə köhnə və yeni versiya eyni parkda, amma fərqli qruplarda işləyir. **Sıfır downtime** verir. Yeni versiya sınsa, yalnız bir qrup təsirlənir — risk minimaldır, çünki parkın qalanı işləyir.

Sine-yaşıldan fərqli olaraq, əlavə mühit dublikatı tələb etmir — mövcud resursları bir-bir yeniləyir. Yəni büdcəyə əlavə yük gətirmir. Deploy bir az daha uzun çəkə bilər, amma iqtisadi baxımdan çox səmərəlidir.

### Blue-green deployment (sine-yaşıl)

**Mavi (blue)** mühit — canlı trafiki emal edən mövcud production mühitidir. Paralel olaraq **yaşıl (green)** mühit yaradılır — mavi ilə eyni, amma yeni kod versiyası ilə. Deploy vaxtı gələndə trafik mavidən yaşıla yönləndirilir. Yaşılda problem çıxsa, trafik geri mavi mühitə qaytarılır.

Trafiki yönləndirmək üçün iki populyar üsul: **DNS switch** və **auto scaling qruplarının dəyişdirilməsi**.

Aşağıdakı sxemi təsəvvür et: yeni versiya yaşıl mühitdə hazırdır, DNS marşrutu ilə trafikin kiçik hissəsini (məsələn 30%) yeni mühitə göndərirsən, qalan 70% köhnədə qalır:

```
Route 53 (DNS)
   ├── 70% → Application Load Balancer → Server parkı (köhnə versiya)
   └── 30% → Application Load Balancer → Server parkı (yeni versiya)
                                              ↓
                                        Verilənlər bazası
```

Yaşıl mühiti trafikin bir hissəsində test et. Problem çıxsa dərhal xəbərin olur və trafiki geri qaytarırsan — istifadəçilərə ciddi təsir etməmiş. Metrikalar stabil olanda mavi mühiti rezervə keçir və resursları boşalt.

Blue-green sıfır downtime və asan rollback verir. Amma **bahalıdır** — iki eyni production mühiti (aktiv mavi + boş yaşıl) saxlamaq lazımdır. Yenə də risk azalması və istifadəçi fasiləsizliyi bu xərci çox vaxt bəraətləndirir.

### Red-black deployment (qırmızı-qara)

Yeni versiyanı qaldırmazdan əvvəl **canary testing** aparılır: canlı sistemin 1%-i yeni versiya ilə əvəz olunur və xətalar üçün monitorinq edilir. Canary test keçərsə, sistem deploy-a hazır sayılır.

Sonra DNS servisi ilə köhnədən yeniyə keçid olur. Bu andan köhnə versiya **qara** sayılır — hələ işləyir, amma trafik almır. Yeni versiyada problem çıxsa, geri dönüş sadədir: DNS-i köhnə versiyanın load balancer-inə yönləndir.

Blue-green ilə fərqi: red-black-da DNS keçidi **ani** olur (buna *dark launch* deyilir), blue-green-də isə DNS trafiki tədricən artırır. İkisi birləşə də bilər — hər iki versiya eyni anda mövcud olur, kodda iki fərqli yol olur, amma yalnız biri aktivdir. Digəri **feature flag** ilə açılır. Bu, beta test üçün əladır.

Xərc baxımından red-black da blue-green kimi iki eyni mühit tələb edir — keçid dövründə resurs tələbi faktiki ikiqat artır. Amma bu resurslar yalnız deploy pəncərəsi boyunca lazımdır, yəni müvəqqətidir — stabillik və etibarlılığa investisiya kimi.

### Immutable deployment (dəyişməz deploy)

Tətbiqin naməlum asılılıqları varsa, immutable ("birdəfəlik") yeniləmə daha sadə həll ola bilər. Zaman keçdikcə dəfələrlə dəyişdirilmiş köhnə infrastrukturu yeniləmək getdikcə çətinləşir.

Burada yeni versiya üçün **tamamilə yeni server instansları** dəsti deploy olunur, köhnələr dayandırılır. Chef, Puppet, Ansible, Terraform ilə klonlanmış mühit yaradılır, auto scaling ilə birləşdirilir.

---

## Hansı strategiyanı seçim? — praktik bələdçi

Deploy strategiyası seçimi uğurlu yeniləmə üçün kritikdir. Qısa qayda dəsti:

- **In-place** — sadəlik ən vacib olanda, tətbiq kiçik və ya məhdud istifadəçi bazası olanda idealdır. Məsələn, kiçik komandanın daxili alətini yeniləmək. Downtime ola bilər — böyük miqyaslı və ya yüksək əlçatanlıq tələb edən tətbiqlərə uyğun deyil. Rollback strategiyası hazır saxla.
- **Rolling** — minimal downtime lazım olanda, amma əlavə resurs istəməyəndə. Məsələn, onlayn mağazanın serverlərinə mərhələli yeniləmə. Çoxlu versiyanı eyni anda dəstəkləyə bilməyən tətbiqlərə uyğun deyil.
- **Blue-green** — **sıfır downtime kritik olanda**. Məsələn, maliyyə şirkətinin müştəri tətbiqi. İkiqat resurs tələb edir, amma fasiləsizlik və sürətli rollback verir. Load balancing və DNS switch etibarlı işləməlidir.
- **Red-black** — blue-green kimidir, amma yeni versiyaya **sürətli keçidə** yönəlib. Konteynerləşdirilmiş mühitlərdə tez-tez işlədilir. Məsələn, video striminq servisi yeni versiyasını dərhal bütün istifadəçilərə açmaq üçün. Yeni versiyanı diqqətlə test et — rollback köhnə mühitə qayıdış deməkdir.
- **Immutable** — buludda ardıcıllıq və etibarlılıq üçün. Hər deploy-da yeni serverlər — proqnozlaşdırıla bilən, stabil vəziyyət. Mürəkkəb asılılıqlı tətbiqlərdə "configuration drift" (konfiqurasiya sürüşməsi) problemini həll edir.

Hər halda tətbiqin mürəkkəbliyini, miqyasını, istifadəçi bazasını və potensial downtime-ın nəticələrini qiymətləndir.

---

## CI/CD pipeline-da fasiləsiz test

Keyfiyyətli məhsul üçün tətbiq hər mərhələdə test olunmalıdır. DevOps pipeline bunu avtomatlaşdırır.

**Unit testlər** test strategiyasının təməlidir — developer maşınında işləyir, tez və ucuzdur. Tövsiyə: test resurslarının **70%-ə qədərini** unit testlərə ayır. Bu mərhələdə tapılan xətalar asan düzəlir.

Sonra inteqrasiya və sistem testləri gəlir — bunlar öz mühitini tələb edir, xərc artır. Performans və compliance testləri production-a bənzər mühit istəyir, ona görə bahalıdır. UAT (User Acceptance Testing — istifadəçi qəbul testi) də production replikası tələb edir.

Test axını mərhələlər üzrə belədir:

```
Development       → Unit test (developer maşınında, static kod analizi)
Build (CI)        → İnteqrasiya + komponent testi, regression testi
Staging           → Sistem testi (UI, backend, API), performans (load + stress),
                    UAT, compliance testi
Production (CD)    → A/B test, canary test
```

Staging mühiti production-un güzgü kopyasıdır — burada uçdan-uca (end-to-end) test aparılır.

### A/B test — istifadəçidən birbaşa cavab

Bəzən hansı funksionallıq reallaşdırmasının daha uğurlu olacağı aydın olmur. Bu suala cavab verən ayrıca elm sahəsi var — **HCI (Human/Computer Interface)**. UI ekspertlərinin tövsiyələri olsa da, ən yaxşı dizaynı çox vaxt yalnız bir yolla bilirsən: onu istifadəçilərə göstər və bax gör işlərini həll edə bilirlərmi.

A/B test-də funksiyanın iki və ya daha çox versiyası fərqli istifadəçi qruplarına təqdim olunur, sonra hər birinin metrikaları toplanıb müqayisə edilir.

Sxem belədir:

```
Application Load Balancer
   ├── 90% → V1.1 (stabil — kontrol qrup)
   ├──  7% → V1.2 (test qrup)
   └──  3% → V1.3 (test qrup)
        ↓
   Ortaq verilənlər bazası
```

Üç əsas prinsip:

1. **Trafik bölgüsü:** Load balancer daxil olan trafiki versiyalar arasında bölür. Böyük hissə (90%) stabil versiyaya (kontrol qrup), qalanı test versiyalarına gedir.
2. **Server parkı:** hər versiya ayrı server qrupunda işləyir. İzolyasiya vacibdir — bir versiyadakı dəyişiklik digərinə təsir etməsin, nəticələr dəqiq olsun.
3. **Verilənlər bazası:** bütün versiyalar **eyni** backend bazası ilə işləyir. Amma schema uyğunluğunu yoxla ki, versiyalar arası data əməliyyatları qarışmasın.

Bütün proses boyunca performans metrikalarını (cavab vaxtı, xəta tezliyi, resurs istifadəsi) izlə. Kifayət qədər data toplananda hansı versiyanın daha yaxşı olduğuna qərar ver — tam deploy et, dəyişikliyə davam et, ya da ləğv et.

---

## CI/CD üçün DevOps alətləri

Pipeline qurmaq üçün lazım olan alət dəsti:

**Kod redaktoru** — DevOps-da mühit avtomatlaşdırması üçün çox skript yazılır. Ace redaktoru, ya da bulud IDE-si AWS Cloud9 işlədilə bilər. Cloud9 AWS ilə inteqrasiya olunur, serverless tətbiq qurmağı asanlaşdırır, birgə proqramlaşdırmanı dəstəkləyir. Desktop tərəfdə VS Code və Eclipse populyardır.

**Mənbə kod idarəetməsi (SCM)** — öz Git serverini qura bilərsən, ya da GitHub/Bitbucket kimi hosting servisi işlədə bilərsən. Bulud həlli üçün AWS CodeCommit var. Kod anbarı üçün autentifikasiya və avtorizasiya qurulmalıdır. Data həm ötürülərkən (transit), həm saxlanarkən (at rest) şifrələnə bilər. `git push` zamanı data şifrələnib saxlanır, `git pull` zamanı deşifrə olunur. Şifrələmə üçün HTTPS və ya SSH işlət.

**CI server (build server)** — komandalar müxtəlif branch-larda işləyəndə main branch-a birləşdirmə (merge) çətinləşir. CI burada açar rol oynayır. **Hook**-lar (versiya nəzarət sistemlərinə quraşdırılmış xüsusi skriptlər) kod anbarındakı hadisələrə görə build işə salır — client tərəfdə və ya server tərəfdə.

Developerlər adətən **pull request** işlədir — main-a merge etməzdən əvvəl bildiriş və qarşılıqlı kod review üçün. CI server dəyişiklikləri baxmaq üçün veb interfeys verir. Problem varsa, kod developerə qaytarılır.

`post-receive` hook-u ilə yeni branch-lara CI serverdə test işə salmağı göstərə bilərsən — beləcə buildin düzgün inteqrasiya olunduğunu təsdiqləyirsən. İnteqrasiya və unit testləri merge risklərini ciddi azaldır.

**Jenkins** CI server qurmaq üçün ən populyar alətdir. Jenkins klasterini AWS EC2 parkında yerləşdirib yükə görə avtomatik miqyaslaya bilərsən:

```
Jenkins Controller
   ├── Jenkins Agent
   ├── Jenkins Agent
   └── Jenkins Agent
```

Yük artanda controller buildi agent node-a həvalə edir, yük azalanda agentləri avtomatik dayandırır. Amma təhlükəsizlik və yamalar (patch) sənin öz üzərindədir. Alternativ — AWS CodeBuild kimi idarə olunan servis: server administrasiyası yoxdur, faktiki istifadəyə görə ödəniş, avtomatik miqyaslama.

---

## Kod deploy — həyat dövrü hadisələri

Build bitəndən sonra Jenkins-lə, ya da bulud servisi AWS CodeDeploy ilə deploy edə bilərsən. Deploy konfiqurasiya variantları:

- **OneAtATime:** hər an yalnız bir instans deploy edir. Bir instansda uğursuzluq olsa, skript dayanır və neçə uğurlu/uğursuz quraşdırma olduğunu bildirir.
- **HalfAtATime:** instansların yarısı eyni anda deploy olur. Yarısı uğurla quraşdırsa, deploy uğurlu sayılır. Yarısı köhnə versiyada işləməyə davam etdiyi üçün prod/test mühitlərinə yaxşı uyğundur.
- **AllAtOnce:** hər instans növbəti sorğuda son versiyanı quraşdırır. Yalnız dev/test mühitləri üçün — hamıya birdən işləməyən versiya quraşdıra bilər.
- **Custom:** sabit sayda sağlam host tələb edən fərqləşdirilmiş konfiqurasiya. OneAtATime-ın daha çevik versiyası.

Deploy agent-i bir sıra mərhələdən keçir — bunlar **həyat dövrü hadisələridir (lifecycle events)**:

```
Deploy agent (başlanğıc)
   ↓
1. ApplicationStop    → tətbiq serverini dayandır (Tomcat, JBoss, WebSphere)
   ↓
2. DownloadBundle     → artefakt anbarından (JFrog Artifactory) build paketini yüklə
   ↓
3. BeforeInstall      → quraşdırmadan əvvəl işlər (backup, konfiqurasiya yeniləmə)
   ↓
4. Install            → quraşdırma (məs. Maven/Ant skripti ilə Java tətbiqi)
   ↓
5. AfterInstall       → quraşdırmadan sonra konfiqurasiya (memory, log parametrləri)
   ↓
6. ApplicationStart   → tətbiqi başlat, Ops komandasına uğur/uğursuzluq bildir
   ↓
7. ValidateService    → validasiya: health check + inteqrasiya testləri
   ↓
Son
```

---

## Kod pipeline — hər şeyi birləşdirmək

Kod pipeline bütün komponentləri CD üçün birləşdirir. Buraxılış prosesi tam avtomatlaşır — build və production deploy daxil. Koordinasiya üçün AWS CodePipeline kimi bulud servisi, ya da Jenkins işlədilir.

Pipeline-a müxtəlif mərhələlərdə yeni fəaliyyət əlavə edə bilərsən. Əsas fəaliyyət kateqoriyaları və provayder nümunələri:

- **Source (mənbə):** kod mərkəzi versiyalı anbarda saxlanmalıdır. Nümunələr: AWS CodeCommit, Bitbucket, GitHub, Subversion (SVN).
- **Build:** sistem koddan binar paket yaradır. Nümunələr: AWS CodeBuild, Jenkins, Solano CI. Binarlar JFrog kimi artefakt anbarında saxlanır.
- **Deploy:** binarları serverə yerləşdirir. Nümunələr: AWS Elastic Beanstalk, AWS CodeDeploy, Chef, Puppet, Jenkins.
- **Test:** deploy sonrası avtomatik yoxlama. Nümunələr: Jenkins, BlazeMeter, Ghost Inspector.
- **Yardımçı əməliyyatlar:** backup, bildiriş kimi işlər üçün hadisə əsaslı skript (shell, PowerShell, Python).
- **Təsdiq (approval):** CD-nin kritik mərhələsi. Manual təsdiq (e-poçt ilə) və ya alət səviyyəsində avtomatlaşdırma.

---

## DevOps best practice-ləri və anti-pattern-lər

Pipeline qurarkən nələri nəzərə al:

- **Mərhələ sayı:** əsas mərhələlər — deploy, inteqrasiya, sistem, istifadəçi təsdiqi, production. Bəzi təşkilatlarda development, alfa, beta, release də var.
- **Hər mərhələdə test tipləri:** unit, inteqrasiya, sistem, UAT, ümumi sağlamlıq, load, production-da A/B.
- **Test icra sırası:** paralel və ya ardıcıl.
- **Monitorinq və hesabat:** sistemdəki defekt və sınıqları izlə, bildiriş göndər.
- **İnfrastruktur provisioning:** hər mərhələ üçün üsul.
- **Rollback:** əvvəlki versiyaya qayıdış strategiyasını təyin et.

İndi diqqət — **anti-pattern-lər** (səhv nümunələr):

Birincisi — qaçılmaz olmayan yerdə manual müdaxilə. Bu, inkişafı yavaşladır. Həlli: CD ilə avtomatlaşdır.

İkincisi — build konfiqurasiya datasını **kodun içində** saxlamaq, üstəlik developerlərin fərqli build alətləri işlətməsi. Nəticə: bir mühitdə işləyən build başqasında işləmir, səbəbini tapmaq çox vaxt aparır. Həlli: build konfiqurasiyalarını **kodun kənarında** saxla.

> CD-ni "fail fast" (tez sın) prinsipi ilə dizayn et — son anda çıxan xoşagəlməz sürprizlərin riskini azaldır.

Mühitə xas konfiqurasiyaları kənarda saxlamağı asanlaşdıran alətlər:

- **AWS Systems Manager Parameter Store:** konfiqurasiya datası və secret-lər üçün təhlükəsiz, iyerarxik anbar (parol, DB connection string, lisenziya kodları).
- **Kubernetes ConfigMaps və Secrets:** konfiqurasiya artefaktlarını image məzmunundan ayırır, konteynerləri portativ saxlayır.
- **Docker Swarm Secrets:** Docker konteynerlərində məxfi data idarəetməsi.
- **HashiCorp Consul:** paylanmış key-value anbarı ilə şəbəkə konfiqurasiya avtomatlaşdırması.

### İzlənməli KPI-lar

CI/CD-nin təsirini qiymətləndirmək üçün əsas göstəricilər:

- **Deploy tezliyi** — yeniləmələr nə qədər tez production-a çatır; buraxılış çevikliyini göstərir.
- **Ümumi dəyişiklik vaxtı** — commit-dən canlı deploy-a qədər müddət; nə qədər qısa, o qədər yaxşı.
- **Dəyişiklik sınıq tezliyi** — sınığa səbəb olan deploy-ların payı; nə qədər aşağı, o qədər stabil.
- **MTTR (Mean Time To Recovery)** — sınıqdan bərpanın orta müddəti; tez bərpa yaxşı incident idarəetməsi deməkdir.
- **Avtomatik test keçmə tezliyi** — hər CI/CD dövründə testlərin uğur faizi.

Ayrıca **Twelve-Factor App** metodologiyası ([12factor.net](https://12factor.net/)) veb tətbiqlərin uçdan-uca inkişafı üçün best practice dəstidir — istənilən proqramlaşdırma dilində işləyir.

---

## Buludda DevOps və DevSecOps qurmaq

CI/CD pipeline qurmaq çoxlu alət tələb edir, təhlükəsizlik avtomatlaşdırması isə mürəkkəbliyi daha da artırır. AWS kimi bulud provayderləri lazımi çevikliyi verir — həm bulud-yönümlü, həm üçüncü tərəf alətlərini asan inteqrasiya, təhlükəsizlik nəticələrinin effektiv aqreqasiyası.

DevSecOps pipeline arxitekturası CI/CD praktikalarını SCA, SAST, DAST alətləri ilə birləşdirir. Tam axın belədir:

```
Developer commit → GitHub
   ↓ (CloudWatch hadisəni tutur)
AWS CodePipeline (koordinator)
   ↓
CodeCommit → CodeBuild → CodeArtifact (artefakt saxlanır)
                 ↑
        Parameter Store (skan alətləri üçün token/auth)
   ↓
Test (SCA, SAST) → Deploy (staging) → Test (DAST, IAST)
   ↓
DAST zəiflik tapsa → Lambda işə düşür → Security Hub-a qeyd
   ↓
DAST təmizdirsə → Manual təsdiq → Production deploy (AWS ECS)
```

Prosesin işləmə məntiqi:

1. GitHub-a commit gedəndə AWS CloudWatch hadisə yaradır, bu da CodePipeline-ı işə salır.
2. CodePipeline bütün pipeline-ı koordinasiya edir — kod saxlama, build, deploy.
3. CodeBuild buildi kompilyasiya edir, artefaktları CodeArtifact-a göndərir. Skan alətləri üçün autentifikasiya detallarını (token-lər) Parameter Store-dan alır.
4. Uğurlu deploy-dan sonra CodeBuild **DAST** prosesini işə salır. Zəiflik tapılsa, Lambda funksiyası işə düşür və problemi AWS Security Hub-a qeyd edir.
5. DAST təmiz çıxsa, build təsdiqə keçir. Pipeline təsdiq məsulunu xəbərdar edir ki, buildi production ECS mühitinə buraxsın.
6. Boyunca **CloudWatch** bütün dəyişiklikləri izləyir, **SNS** vasitəsilə komandaya e-poçt bildirişi göndərir.
7. **CloudTrail** kritik dəyişiklikləri (pipeline yeniləmə, silmə, yaratma) audit üçün izləyir. **AWS Config** isə bütün konfiqurasiya dəyişikliklərini izləyir.

Təhlükəsizlik tərəfdən: pipeline **AWS IAM** rolları ilə qorunur (access məhdudlaşdırılır), data həm saxlanarkən, həm ötürülərkən şifrələmə və SSL ilə qorunur. Məxfi data (API token, parol) Parameter Store-da saxlanır.

Ən güclü hissə — nəticələrin Security Hub-da mərkəzləşdirilməsi bərpanı avtomatlaşdırır. Məsələn, təsadüfən SSH portu açılsa, sistem avtomatik serverə internet çıxışını məhdudlaşdıra bilər. Bu, DevOps və təhlükəsizlik komandasının yükünü azaldır — bir alətlə həll, bir neçə dashboard idarə etmək əvəzinə.

> Təhlükəsizlik problemini dövrün **erkən** mərhələsində həll etmək dəyişiklik xərcini kəskin azaldır. Bu prosesi avtomatlaşdırmaq — DevSecOps pipeline-ı tətbiq inkişafının ayrılmaz şərtinə çevirir.

---

## Sona qədər

Gəlin başladığımız yerə qayıdaq. **Əvvəl:** iki ayrı komanda, bir-birindən xəbərsiz, təhvilat gecəsi bir-birini günahlandıran, təhlükəsizliyi sonda yada salan.

**İndi:** Dev, Ops və Security bir masada, bölüşdürülmüş məsuliyyətlə, hər addımı avtomatlaşdırılmış, təhlükəsizliyi ilk gündən kodun içinə hörülmüş bir sistem.

DevOps mədəniyyəti, praktikaları və alətləri birləşdirir — inkişaf və əməliyyatı inteqrasiya edir, yeni funksionallığı sürətləndirir. DevSecOps isə bu konsepti təhlükəsizliklə genişləndirir — sürətli, təhlükəsiz, compliance-ə uyğun çatdırılma.

Xülasə olaraq gördük: CI/CD-nin çevikliyi yalnız **hərtərəfli avtomatlaşdırma** ilə əldə olunur. IaC və konfiqurasiya idarəetməsi bunun təməlidir. Chef, Puppet, Ansible konfiqurasiyanı idarə edir. Deploy strategiyaları — rolling, blue-green, red-black, immutable — hərəsi öz yerində. A/B test məhsulu birbaşa istifadəçi rəyi ilə yaxşılaşdırır.

Bir sual sənə: sənin komandanda təhlükəsizlik hələ də "sonda yada düşən" bir şeydirmi, yoxsa artıq pipeline-ın birinci mərhələsinə köçüb? Sizcə necə?
