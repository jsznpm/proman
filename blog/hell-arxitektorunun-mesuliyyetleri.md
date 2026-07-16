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
