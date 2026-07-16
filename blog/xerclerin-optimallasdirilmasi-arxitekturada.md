# Niyə ucuz arxitektura sizə baha başa gələ bilər?

Bu yazıda gəlin bir mövzudan danışaq ki, adətən layihənin sonuna saxlanılır, amma əslində ilk gündən düşünülməlidir — **xərclərin optimallaşdırılması**.

Çoxları xərc optimallaşdırmasını belə başa düşür: "gəl xərcləri kəsək, ucuz serverlər alaq, hər şeyi minimuma salaq". Bu, yanlış yanaşmadır. Optimallaşdırma xərci azaltmaq deyil — **biznes riskini azaldıb yatırımın gəlirliliyini (ROI) maksimuma qaldırmaqdır**. Bəzən keyfiyyət üçün daha çox ödəmək məhz optimal qərardır.

Əvvəlki mövzuda avtomatlaşdırmadan söhbət açmışdıq. Avtomatlaşdırma insan səhvi riskini azaldır, effektivliyi artırır və nəticədə xərci aşağı salır. İndi isə gəlin bütün şəkilə baxaq: arxitekturanı elə qurmaq ki, o həm performans tələblərini ödəsin, həm də maliyyə hədəflərinə uyğun gəlsin.

> Optimallaşdırma — birdəfəlik hərəkət deyil, davamlı prosesdir. İstifadəçi təcrübəsinə zərər vermədən idarə olunmalıdır.

---

## Əvvəlcə müştərini anla

İstənilən optimallaşdırma strategiyasından əvvəl bir şeyi başa düşmək lazımdır: **müştərinin nəyə ehtiyacı var?**

Bəzən keyfiyyət axtaran müştəri daha yüksək qiymət ödəməyə hazırdır. Əgər sən xidmətin keyfiyyətini kəsib qiyməti aşağı salsan, müştəri rəqibə gedər. Buna görə hər hansı "qənaət" addımı atmazdan əvvəl sual ver: bu addım biznes dəyərini artırırmı, yoxsa sadəcə rəqəmi kiçildir?

İndi isə arxitektura qurarkən xərcə necə yanaşmaq lazım olduğunu — yəni **dizayn prinsiplərini** — bir-bir gözdən keçirək.

---

## Prinsip 1: Sahibolmanın tam dəyərini hesabla (TCO)

Şirkətlər ən çox buraxdıqları səhv budur: qərarı yalnız **ilkin alış qiymətinə** görə verirlər. Buna kapital xərci deyilir — **CapEx (Capital Expenditure)**.

Amma uzunmüddətli perspektivdə əsas olan **TCO (Total Cost of Ownership)** — sahibolmanın tam dəyəridir. TCO həm CapEx-i, həm də əməliyyat xərcini (**OpEx, Operating Expenditure**) əhatə edir.

Fərqi anlamaq üçün sadə misal — **soyuducu**. Soyuducu 24/7 işləyəcək. Sən enerji qənaətinə diqqət edirsən, çünki bilirsən ki, ilk gün bir az baha ödəsən də, elektrik hesabındakı qənaət uzunmüddətdə ümumi xərci aşağı salacaq. Data-mərkəz də eynidir: avadanlıq almaq CapEx-dir, amma soyutma, idarəetmə, təhlükəsizlik — bunlar davamlı OpEx-dir.

TCO üç böyük komponentdən ibarətdir:

**1. Alış və quraşdırma xərcləri** (birdəfəlik):
- proqram təminatının lisenziyalarla birlikdə alınması
- avadanlıq — server və yerləşmə üçün yer
- reallaşdırma — proqramı işə salmaq üçün vaxt və zəhmət
- miqrasiya — məlumatları yeni sistemə köçürmək

**2. Əməliyyat və dəstək xərcləri** (davamlı):
- baxım və dəstək
- vendor tərəfindən buraxılan yeniləmələr və patch-lər
- şirkətin ehtiyacına uyğun xüsusi dəyişikliklər
- data-mərkəzdə fiziki serveri saxlamaq
- təhlükəsizlik və lisenziya uzatması

**3. Personal və ixtisasartırma xərcləri**:
- tətbiq administratorları, texdəstək əməkdaşları
- funksional və texniki məsləhətçilər
- təlim və təlim vasitələri

Burada bir termin qeyd edim: **off-the-shelf** (hazır kommersiya) proqram — Oracle, MS SQL kimi geniş auditoriyaya kütləvi buraxılan hazır məhsullar. Onun əksi **custom** (fərdi) proqramdır — konkret biznesə uyğunlaşdırılmış həll.

Optimallaşdırma variantlarından biri **SaaS (Software as a Service)** abunəsidir — məsələn, Salesforce-un CRM platforması. SaaS adətən istifadəçi sayına görə abunə ilə işləyir. Çox istifadəçi olduqda hibrid metod da seçmək olar: buludda **IaaS (Infrastructure as a Service)** ilə avadanlığı idarə edib üstündə off-the-shelf proqram quraşdırmaq. Hansı ssenari olursa-olsun, TCO-nu hesabla — hara maksimum ROI verir orada dayan.

---

## Prinsip 2: Büdcə planla, proqnoz qur

Hər biznes xərclərini planlamalı və ROI hesablamalıdır. Amma "büdcə" və "proqnoz" tez-tez qarışdırılır. Fərqi aydınlaşdıraq.

| Parametr | Büdcə | Proqnoz |
|----------|-------|---------|
| **Nədir** | Gözlənilən gəlir, xərc və resurs bölgüsünü təsvir edən detallı maliyyə planı | Cari trendlərə əsaslanan yenilənən maliyyə proqnozu |
| **Dövr** | Uzunmüddətli — məs. bir il | Dinamik — aylıq/rüblük yenilənir |
| **Düzəliş tezliyi** | Nadir — ildə bir dəfə | Müntəzəm, cari vəziyyətə görə |
| **Məqsəd** | Strateji planlaşdırma, resurs bölgüsü | Operativ qərarlar, düzəlişlər |
| **Effektivlik ölçüsü** | Planlanan vs faktiki müqayisə | Hədəflərlə müqayisə olunmur, gələcəyi anlamaq üçündür |

Sadə desək: **proqnoz dərhal hərəkət etməyə kömək edir**, büdcə isə bazar dəyişəndə çatılmaz ola bilər.

Misal: aylıq $450 büdcə ilə xərclər noyabr 2024-ün sonuna tükənəcək. Proqnoz bunu əvvəlcədən görüb növbəti ayın xərcini tənzimləməyə imkan verir.

---

## Prinsip 3: Tələbatı və xidmət kataloqunu idarə et

Demək olar hər şirkətdə mərkəzləşmiş İT komandası var — o, proqram, avadanlıq və dəstək xərclərini idarə edir. Problem burda yaranır: **development komandaları tez-tez dev/test mühitlərinə artıq xərcləyir**.

Həll — tələbatları bir yerə toplamaq. Bütün bölmələrin ehtiyacını konsolidasiya edəndə şirkət **miqyas hesabına qənaət** edir. Məsələn, AWS, GCP və ya Azure kimi bulud platformalarında bunu **PPA (Private Pricing Agreement)** və ya **EDP (Enterprise Discount Program)** ilə etmək olar — müəyyən istifadə həcminə öhdəlik götürüb daha ucuz qiymət almaq.

İki yanaşma var:

- **Tələbatın idarəsi (demand management)**: mövcud İT mühitlərində (artıq xərcin çox olduğu yerlərdə) tarixi məlumatı analiz edib tələbatı idarə etmək. Qısamüddətli qənaət üçün yaxşıdır.
- **Xidmət kataloqunun idarəsi (service catalog)**: tarixi məlumat azdırsa, tez-tez istifadə olunan xidmətlərdən kataloq qurmaq. Məsələn, development komandası "MySQL-li Linux server" istəyir — İT komandası kiçik Linux server + verilənlər bazası olan hazır xidmət kataloqu yaradır.

---

## Prinsip 4: Xərcləri izlə — kim xərcləyir bilinsin

Ayrı-ayrı sistemlərin xərcini bilmək üçün izləməni **sistem və ya biznes sahibinə bağla**. Xərc azaltmaq — ümumi məsuliyyətdir, hər bölmənin hesabatlılığını təmin edən mexanizm lazımdır.

İki əsas mexanizm var:

- **Show-back** (xərc nümayişi): hər bölmənin xərci mərkəzi hesabda göstərilir, amma faktiki ödəniş alınmır. Sadəcə "bax, sən bu qədər xərcləyirsən" mesajıdır.
- **Charge-back** (xərc kompensasiyası): hər bölmə öz büdcəsini idarə edir, faktiki istifadəyə görə ana hesabdan xərci geri çıxarılır.

> Xərc nəzarəti tətbiq edərkən əvvəl **show-back**-dən başla, təşkilat modeli yetkinləşdikcə **charge-back**-ə keç.

Komandalar büdcəyə/proqnoza yaxınlaşanda **xəbərdarlıqlar (alerts)** qur. Şəffaflıq hər komandada məsuliyyət formalaşdırır.

---

## Prinsip 5: Optimallaşdırma heç vaxt dayanmır

Xərc optimallaşdırmasını nə vaxta qədər davam etdirmək lazımdır? **Qənaət imkanını tapmağa çəkilən xərc, qənaət ediləcək məbləğdən çox olana qədər.**

Klassik misal — **boşdayanan (idle) resurslar**. Tutaq ki, şirkət dev/test mühiti üçün bulud xidmətindən istifadə edir. Xərci izləyəndə görür ki, bir neçə instans gecələr və həftəsonu boş dayanır. Həll — bu instansları avtomatik söndürən qrafik qurmaq. Resurslar yalnız işlədikdə ödənilir, xərc kəskin düşür.

Amma diqqət — **metrikaları kontekstsiz oxumaq təhlükəlidir**. Əgər sən "Qara cümə" (Black Friday) pik günlərinin datasını əsas götürsən, çoxlu artıq resurs ayırarsan. Az yüklü dövrlərdə isə həmin resurslar boş qalar. Metrikanı həmişə **kontekstlə** analiz et.

---

İndi prinsiplərdən **praktik üsullara** keçək. Prinsiplər təməldir, üsullar isə divarlardır.

---

## Üsul 1: Arxitektura mürəkkəbliyini azalt

Çox şirkət mərkəzləşmiş İT arxitekturası istəyir, amma praktikada hər bölmə öz alət dəstini qurmağa çalışır. Nəticə: üst-üstə düşən sistemlər, dublikat tətbiqlər, uzlaşmayan məlumatlar. Bu, həm baha başa gəlir, həm risklidir.

Aşağıdakı sxem fərqi göstərir — solda hər bölmə ayrı-ayrı dublikat tətbiqlərlə işləyir (mürəkkəb, bahalı), sağda isə monolit/standartlaşdırılmış struktur:

```
MÜRƏKKƏB (standartsız)          STANDARTLAŞDIRILMIŞ
─────────────────────          ────────────────────
İstifadəçi                     İstifadəçi
  ├─ Frontend                    │
  ├─ Verilənlər bazası           ▼
  ├─ Artıq tətbiq            Veb-server
  └─ Backend                     ├─ Frontend
İstifadəçi (dublikat)           ├─ Backend
  ├─ Frontend                    └─ Verilənlər bazası
  ├─ Verilənlər bazası        (Monolit / vahid tətbiq)
  └─ Backend
```

Nə etməli:

- **Dublikatı aradan qaldır**, bölmələr arası təkrar istifadə imkanlarını tap.
- Təkrar istifadə olunan komponentləri **xidmət kataloquna** sal — mərkəzi repozitori kimi işləyir, komandalar hazır pattern və resursları oradan götürür.
- **Gap-analiz** (boşluq analizi) apar — mövcud arxitekturalarda təkrar istifadə oluna bilən çoxlu kod tapacaqsan.
- Yeni tətbiqi **RESTful arxitektura** ilə mövcud sistemə inteqrasiya et.
- **Mikroservis arxitekturası** ilə modul qur — bir komponent sınsa, bütün tətbiqə təsir etmədən dəyişdirilir. Məsələn, internet-mağaza üçün qurulan ödəniş servisi, təchizatçı idarəetmə sistemində də istifadə oluna bilər.

Fərdi məhsul hazırlamaq **son variant** olmalıdır — əvvəl hazır həll axtar.

---

## Üsul 2: İT effektivliyini artır

Hər şirkət artıq serverlərə, noutbuklara, proqram lisenziyalarına və yüksək saxlanc həcminə çox pul xərcləyir. Lisenziyalar isə tez-tez az istifadə olunur, itir və ya yanlış quraşdırılır.

Konkret metodlar:

- Yüksək xərcli layihələri **yenidən qiymətləndir**, biznes vizyonuna uyğunlaşdır.
- Minimal biznes dəyəri olan layihələrin **prioritetini aşağı sal** (İT strategiyasına uyğun olsa belə).
- Biznes dəyəri aşağı, komplayensə uyğun olmayan layihələri **ləğv et**.
- İstifadə olunmayan tətbiqləri **istismardan çıxar**.
- Köhnə legacy sistemləri **modernləşdir**.
- Buluda keçib **ödə-nə-qədər-istifadə-etsən (pay-as-you-go)** modelindən yararlan. Məsələn, developerin desktop sistemini həftəsonu söndürmək iş yeri xərcini **70%-ə qədər** azalda bilər.
- **Avtomatlaşdır** — server ayrılması, monitorinq, məlumat emalı və s.

Amma balansı gözlə. Misal: **əyləncə parkı**. Çoxlu maraqlı attraksionu varsa, giriş üçün baha ödəməyə razısan. Sahib qiyməti aşağı salıb attraksionları azaltsa, başqa parka gedərsən. Yəni xərci kəsmək biznes riskini artırırsa — bu, pis optimallaşdırmadır.

Hədəflərin **ölçüləbilən** olsun. Məsələn: "rübdə tranzaksiya başına xərci 10% azalt" və ya "hər 6 ayda 15% azalt".

---

## Üsul 3: Standartlaşdırma və idarəetmə tətbiq et

Rasional idarəetmə üçün təşkilat daxilində **resurs limitləri** qoy. Məsələn, AWS-də development komandasının 10-dan çox server istifadə etməsinin qarşısını almaq olar.

Burada əsas alət — **IaC (Infrastructure as Code)**. Şəbəkədən serverlərə, verilənlər bazalarından tətbiq servislərinə qədər bütün infrastruktur YAML və ya JSON kimi dillərdə kod faylı ilə təsvir olunur:

```yaml
# Sadələşdirilmiş IaC nümunəsi — resurs limitli server tərifi
resource:
  type: compute_instance
  name: dev-server-01
  size: t3.medium
  tags:
    Environment: Dev
    Department: Marketing
    BusinessUnit: Finance
  limits:
    max_instances: 10   # dev komandası 10-dan çox aça bilməz
```

Bu fayllar version control sistemində saxlanır — komandalar dəyişikliyi izləyir, əvvəlki konfiqurasiyaya qayıda bilir, müxtəlif mühitdə eyni konfiqurasiyanı tətbiq edir. Bu, **konfiqurasiya dreyfini** (drift) azaldır. Populyar alətlər: **Terraform, AWS CloudFormation, Ansible**.

### Hesab strukturu ilə xərci böl

Hesabları bölmələrə görə strukturlaşdırmaq olar — **OU (Organizational Unit)**: kadrlar, maliyyə, marketinq. Hər şöbənin öz hesabı olur:

```
Şirkət (ana hesab)
├─ HR (OU)
│   ├─ Əmək haqqı hesabı
│   └─ Marketinq hesabı
└─ Maliyyə (OU)
    ├─ Satış hesabı
    └─ Marketinq hesabı
```

Belə struktur həm hər səviyyədə xərc idarəsinə, həm də təhlükəsizlik və komplayens standartlarına imkan verir.

---

## Üsul 4: Resursları teqlə (tagging)

Demək olar hər bulud provayderi hazır **tagging** funksionallığı verir. Teqləmə resursları layihə, mühit, şöbə və xərc mərkəzinə görə təsnif edir.

Nümunə teq strategiyası:

```
Type: AppServer          # tətbiq serveri
Environment: Dev         # development komandası
Department: Marketing    # sahib şöbə
BusinessUnit: Finance    # maliyyə bölməsi
```

Belə yanaşma ilə xərc detallaşır. Komanda səviyyəsində **show-back**, şöbə/bölmə səviyyəsində **charge-back** tətbiq edə bilərsən.

AWS-də xərcləri `aws:createdBy` kimi teqə görə çeşidləyib hər resursun avtomatik hesablanan xərcini görmək olar. Bu, hansı komandanın nə qədər xərclədiyini şəffaf edir.

---

## Üsul 5: Xərci izlə və hesabatlaşdır

Optimallaşdırma üçün əvvəl **xərc paternlərini** bilmək lazımdır. Vizualizasiya bu ssenarilərdə lazımdır:

- ən böyük resurs investisiyalarını müəyyən etmək
- xərc və istifadə datasını analiz etmək
- büdcə və proqnoz qurmaq
- büdcə/proqnoz həddi aşılanda xəbərdarlıq almaq

**Reaktiv vs proaktiv** fərqinə diqqət:

- **Reaktiv yanaşma**: 6 aylıq hesabatda görürsən ki, EC2 serverinə may-iyulda çox xərclənib. Admin serverləri dayandırır, avqustda xərc düşür. Amma bu, gecikmiş reaksiyadır — gizli xərclər artıq baş verib.
- **Proaktiv yanaşma**: proqnoz gələcəkdə xərcin artacağını əvvəlcədən göstərir, sən qabaqlayıcı qərar verirsən.

Büdcənin 50% və ya 80%-i xərclənəndə **email/SMS xəbərdarlığı** qur. Məsələn, təxmini xərc $500 həddini aşanda alert getsin (əlavə $300, $400 həddləri də qurmaq olar).

### Right-sizing (optimal ölçüləndirmə)

Xərc nəzarətinin bir yolu — resursları optimal ölçüdə saxlamaq, həddindən çox və ya az yüklənəndə xəbərdarlıq almaq. Alətlər: **Splunk, CloudWatch**. Analiz olunan metrikalar: CPU və yaddaş yükü, şəbəkə keçiriciliyi, tətbiqə qoşulma sayı.

Right-sizing üçün ən yaxşı praktikalar:

- Monitorinq son istifadəçi təcrübəsini əks etdirsin. Məsələn, orta cavab vaxtı deyil, **99% istifadəçi vaxtını** ölç.
- Düzgün monitorinq siklini seç — saatlıq/günlük/həftəlik. Günlük analiz aylıq pik siklini qaçıra bilər.
- Dəyişiklik xərcini qənaətlə müqayisə et.
- Yükü biznes tələbləri ilə tutuşdur (məs. ay sonu neçə sorğu gözlənilir).

> Buludda hər saniyə xərci artırır — optimallaşdırmada buraxılan boşluq baha başa gələ bilər.

---

## Bulud platformalarında optimallaşdırma

AWS, Azure, GCP — **pay-as-you-go** modeli ilə əla imkanlar verir. Bu model CapEx-i dəyişən xərcə çevirir: resursu istifadə etdikcə ödəyirsən.

Buludda bütün infrastruktur əl altındadır — bu, daha çox nəzarət tələb edir. AWS-də limitlər qoymaq olar: development 10 serverdən çox aça bilməz, əməliyyat komandasına isə buferlə lazımi qədər ayrılır.

**AWS Trusted Advisor** bütün resursları gəzir və qənaət tövsiyələri verir. Məsələn: boş dayanan yük balanslaşdırıcı tapır və söndürülməsini tövsiyə edir (aylıq $40 qənaət). Yaxud yüksək səhv tezliyi olan Lambda funksiyasını aşkarlayır.

Başlanğıc üçün **hibrid bulud** həlli qur — lokal data-mərkəzlə buludu birləşdir. Dev/test serverlərini buluda köçür, xərc strukturunu öyrən, sonra digər yükləri **xərc-fayda analizi** əsasında köçür.

**Managed servislər** — infrastruktur baxım xərcini aradan qaldırır, TCO-nu azaldır.

**Savings Plans / reserved instances** — müəyyən istifadə həcminə öhdəlik götürüb on-demand qiymətdən xeyli ucuz almaq. Dəyişkən yüklər üçün pay-as-you-go elastikliyini saxla, sabit yüklər üçün Savings Plans-dən yararlan.

---

## Yaşıl İT və xərcə təsiri

**Green IT (yaşıl İT)** — kompüter və İT resurslarını ekoloji cəhətdən dayanıqlı və effektiv istifadə etməkdir. Ekologiya ilə qənaət burada üst-üstə düşür:

- **Enerji effektivliyi**: Energy Star avadanlığı, optimal data-mərkəz soyutması → elektrik xərci aşağı.
- **Virtuallaşdırma**: fiziki avadanlıq ehtiyacı azalır → enerji və soyutma xərci düşür.
- **Bulud hesablamaları**: modern bulud data-mərkəzləri lokaldan daha effektivdir → karbon izi və xərc azalır.
- **Avadanlığın təkrar istifadəsi**: köhnə avadanlığı satmaq/yenidən emal etmək ilkin yatırımın bir hissəsini qaytarır.
- **Uzaqdan iş**: ofis, enerji, gediş-gəliş xərci azalır.
- **Elektron sənəd dövriyyəsi**: kağız, çap, saxlanc xərci düşür.
- **Dayanıqlı resurs alışı**: uzun zəmanətli məhsul baha görünsə də, TCO-su aşağıdır.
- **Karbon kreditləri**: karbon buraxılışını azaldan şirkət kredit qazanıb sata bilər.

---

## Nümunə: AWS-də ucuz və yaşıl veb-tətbiq

Təsəvvür et, dəyişkən trafikli veb-tətbiq yerləşdirirsən. Həm xərci optimallaşdırıb, həm yaşıl İT prinsiplərinə əməl etmək üçün sxem:

**1. Planlaşdırma və dizayn**
- AWS seçilir — ekoloji, enerji-qənaətli infrastruktur.
- **Serverless** memarlıq: **AWS Lambda** ilə hesablama. Server ayırmağa ehtiyac yoxdur — az yüklü serverlər aradan qalxır.

**2. Reallaşdırma**
- Frontend **Amazon S3**-də, qlobal çatım **Amazon CloudFront** ilə. Gecikmə azalır, istifadəçiyə yaxın data-mərkəzdən kontent çatdırılır.
- Backend **AWS Lambda + Amazon DynamoDB** — yükə görə avtomatik miqyaslanan serverless verilənlər bazası.

**3. Optimallaşdırma**
- CI/CD üçün **AWS CodePipeline + CodeBuild** — ayrıca build serveri saxlamaq xərcindən azad edir.

**4. Monitorinq**
- **AWS CloudWatch** performansı və resurs istifadəsini izləyir.
- **AWS Trusted Advisor** əlavə optimallaşdırma tövsiyələri verir.

**5. Xərc idarəsi**
- **AWS Budgets** — xərc həddi qoyub büdcə aşılanda alert göndərir.
- **AWS Cost Explorer** — xərci və istifadəni zamanla analiz edir.

Nəticə: şirkət tətbiqi miqyaslanan, ucuz infrastrukturda yerləşdirir, karbon izini azaldır və yalnız faktiki istifadə etdiyi resursa görə ödəyir.

---

## Sona qədər

Gəlin əvvələ qayıdaq. **Əvvəl** — layihə sonunda "gəl xərci kəsək" deyib ucuz serverlər alan, dublikat sistemlərlə boğulan, pik günlərin datasına görə artıq resurs ayıran şirkət. **Sonra** — ilk gündən TCO hesablayan, büdcə və proqnozla işləyən, xərci teqlə izləyən, boş resursları avtomatik söndürən, buludun pay-as-you-go modelindən və Savings Plans-dən yararlanan şirkət.

Fərq — sadəcə pul deyil. Fərq **davamlılıqdır**: birincisi hər ay gizli xərclərlə mübarizə aparır, ikincisi isə xərci biznes dəyərinə bağlayıb sakit inkişaf edir.

Xərc optimallaşdırması PoC-dən (konsepsiyanın həyat qabiliyyəti sübutu) tutmuş buraxılışdan sonrakı dəstəyə qədər — **davamlı prosesdir**. Heç vaxt "bitdi" demirsən, həmişə növbəti qənaət imkanını axtarırsan. Amma bir şərtlə: istifadəçi təcrübəsinə və biznes dəyərinə zərər vermədən.

Növbəti addım isə avtomatlaşdırma və adaptivlikdir — **DevOks** metodologiyası burada işi əhəmiyyətli dərəcədə asanlaşdırır.

Bəs sizin arxitekturada ən çox pul hara "sızır" — bilirsiniz?
