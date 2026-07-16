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
