# Maşın öyrənmə arxitekturası: modeldən məhsula qədər bütün yol

Əvvəlki yazılarda böyük data-nı necə toplamaq, emal etmək və bizness üçün faydalı analitikaya çevirmək barədə danışmışdıq. Ənənəvi bizness modelində qərar verən şəxs keçmiş dövrlərin datasına baxır, öz təcrübəsinə söykənərək şirkətin gələcək kursunu qurur. Amma məsələ təkcə istiqamət vermək deyil — həm də istifadəçi təcrübəsini yaxşılaşdırmaqdır: müştərinin ehtiyacını qabaqcadan görüb ödəmək, gündəlik qərarları (məsələn, kredit müraciətlərinin təsdiqi) avtomatlaşdırmaq.

Problem burada başlayır: mövcud data-nın həcmi o qədər böyükdür ki, insan beyni onu emal edib proqnoz vermək iqtidarında deyil. Məhz bu nöqtədə **süni intellekt (AI)** və **maşın öyrənmə (ML)** köməyə gəlir.

Bu yazıda ML-in nə olduğundan başlayıb, tam bir arxitektura yolunu gəzəcəyik — data hazırlığından, model seçimindən tutmuş MLOps, dərin öyrənmə və NLP-yə qədər. Uzun yoldur, amma sona çatanda ML pipeline-ının hər halqasını başa düşəcəksiniz.

---

## AI və ML — eyni şey deyil

Əvvəlcə bir qarışıqlığı aradan qaldıraq, çünki bu iki termin tez-tez bir-birinə qarışdırılır.

**Süni intellekt (AI)** daha geniş konsepsiyadır — maşınların müxtəlif tapşırıqları "ağıllı" şəkildə yerinə yetirməsidir. Siri və Alexa buna misaldır: sualı başa düşür, cavab formalaşdırır.

**Maşın öyrənmə (ML)** isə AI-ın alt çoxluğudur — kompüterin data əsasında öyrənmə və qərar vermə qabiliyyətinə aiddir.

> ML tarixi datanı analiz edərək gələcəyi proqnozlaşdırır. AI isə bu proqnozu "ağıllı davranışa" çevirən daha böyük çətirdir.

Bu gün bir çox korporasiya ML-ə investisiya qoyur — əsas motiv sürətdir, xüsusən generativ AI (GenAI) sayəsində. ML tez bir zamanda şirkətləri fərqləndirən texnologiyaya çevrilir: yeni məhsullar, xidmətlər və bizness modelləri yaratmağa, innovasiya ilə rəqabət üstünlüyü qazanmağa imkan verir.

---

## Maşın öyrənmə nədir və nə üçün lazımdır?

ML texnologiyadan istifadə edərək keçmiş faktiki data əsasında yeni tendensiyalar aşkarlayır və riyazi proqnoz modelləri qurur. Bəs hansı problemlərdə əsl işə yarayır?

- **Mürəkkəb qaydalar yaratmaq:** Koda dəqiq məntiq yazmağın mümkün olmadığı hallar. Məsələn, şəkil və ya nitqdə insan emosiyalarını tanımaq — bunu `if/else` ilə yaza bilməzsiniz.
- **Böyük həcmli data analizi:** İnformasiya insanın effektiv emal edə bilməyəcəyi qədər çoxdursa. İnsan spam-ı tanıya bilər, amma milyonlarla məktubu əl ilə yoxlaya bilməz.
- **Dinamik uyğunlaşma:** Personalizasiya üçün lazım olan data yalnız real vaxtda, dinamik gəlirsə. Məsələn, fərdi məhsul tövsiyələri və ya vebsayt personalizasiyası.
- **Axın (streaming) data emalı:** Böyük datanın ani analizi tələb olunan hallar — məsələn fırıldaqçılığın aşkarlanması və ya təbii dilin emalı (NLP).

### Real sənaye ssenariləri

ML-in harada işlədiyini görmək üçün bir neçə konkret nümunə:

- **Proqnozlaşdırılan texniki xidmət (predictive maintenance):** Sensor datası əsasında komponentlərin sıradan çıxmasını qabaqcadan görmək. Avtoparklarda, istehsalat avadanlığında və IoT sensorlarında qalıq istismar müddətini (RUL — Remaining Useful Life) qiymətləndirmək üçün istifadə olunur. Avtomobil sənayesində və istehsalatda geniş yayılıb.
- **Tələb proqnozu:** Tarixi datadan istifadə edərək istehsal, qiymət, ehtiyat idarəçiliyi barədə daha dəqiq qərarlar vermək. Artıq ehtiyatı azaldıb tullantını minimuma endirir. Maliyyə, istehsalat, pərakəndə satışda tez-tez rast gəlinir.
- **Fırıldaqçılıq aşkarlanması:** Mümkün fırıldaqçı əməliyyatları avtomatik tanıyıb yoxlama üçün işarələmək. Maliyyə xidmətləri və onlayn pərakəndə satışda tətbiq olunur.
- **Kredit riskinin proqnozu:** Fərdi kredit müraciətlərini analiz edib kreditin qaytarılma ehtimalını (kredit defoltu) qiymətləndirmək. Qərəzliliyi aşkarlayıb normativ uyğunluğu təmin edir.
- **Sənəd analizi və data çıxarışı:** Əlyazma və rəqəmsal sənədlərdəki mətni tanıyıb təsnifat üçün informasiya çıxarmaq. Səhiyyə, hüquq, mühəndislik və təhsildə geniş istifadə olunur.
- **Personalizasiya olunmuş tövsiyələr:** Tarixi data əsasında fərdi tövsiyələr. Pərakəndə satış və təhsildə.
- **Churn (müştəri itkisi) proqnozu:** Müştərilərin xidmətdən imtina etmə ehtimalını qiymətləndirmək. Pərakəndə satış, təhsil və SaaS provayderlərində.

ML-in əsas konsepsiyası sadədir: alqoritmə bir **öyrədici dataset** verirsən, sonra o, yeni data üzərində proqnoz qurur. Məsələn, fond bazarının tarixi trendlərini modelə versən, o, 6 ay – 1 illik bazar dəyişikliklərini proqnozlaşdıra bilər.

Amma vacib bir incəlik var: ML sistemlərində **data ilə kod sinxron olmalıdır**. Data zamanla dəyişir (çünki müxtəlif mənbələrdən gəlir), kod da onunla birlikdə dəyişməlidir. Sistematik yanaşma olmasa, kod və dəyişmiş data arasında uyğunsuzluq yaranır — bu isə modeli real işə salanda problemə çevrilir, nəticələri izləmək və təkrar etmək çətinləşir.

---

## Maşın öyrənmənin növləri

ML kompüterlərə hər şeyi proqramlaşdırmadan yeni informasiya öyrənməyə imkan verir. Əslində sən kompüterə *necə öyrənməyi* izah edirsən.

Bunu bir iti trik öyrətmək kimi düşün: nə etməli olduğunu göstərirsən, it öyrənir, sonra özü icra edir. ML də oxşardır — kompüter datadan öyrənir, sonra öyrəndiyini qərar vermək üçün istifadə edir.

İndi əsas paradiqmaları gəzək.

### Öyrədicili öyrənmə (supervised learning)

Alqoritmə datanın və düzgün cavabların (hədəflərin) məlum olduğu öyrədici nümunələr verilir. Alqoritm bu nümunələrdən girişi düzgün nəticə ilə əlaqələndirməyi öyrənir, sonra eyni atributlu yeni data üçün hədəf dəyəri proqnozlaşdırır.

Təsnifat və reqressiya məsələləri üçün istifadə olunur. Məsələn: məktubları spam və vacib olaraq ayırmaq, və ya evin xüsusiyyətlərinə görə qiymətini proqnozlaşdırmaq.

### Öyrədicisiz öyrənmə (unsupervised learning)

Alqoritm nəhəng həcmli data alır və orada özü qanunauyğunluq, əlaqə axtarır. İnsan iştirakı tələb olunmur — məsələn sənədlərin məzmununa görə avtomatik təsnifatı.

Model **etiketlənməmiş (unlabeled)** data üzərində öyrənir. Qruplaşdırma (clustering), ölçü azaltma (dimensionality reduction) və sıxlıq qiymətləndirməsində tətbiq olunur. Xəbər agentlikləri və hüquq firmaları böyük data həcmlərini avtomatik təsnif etmək, rəqəmsal arxivləri idarə etmək üçün bundan istifadə edir — məsələn oxucuya oxşar məqalələr tövsiyə etmək.

### Yarı-öyrədicili öyrənmə (semi-supervised learning)

Yuxarıdakı iki növü birləşdirir: az miqdarda **etiketlənmiş** və çoxlu **etiketlənməmiş** data. Etiketlənmiş data almaq baha və ya çox vaxt aparandırsa xüsusilə faydalıdır.

Biotibb bunun klassik nümunəsidir. Tibbi şəkillərin etiketlənməsi çox vaxt və resurs tələb edir. Model əvvəl kiçik etiketlənmiş şəkil dəsti üzərində öyrənir, sonra daha böyük etiketlənməmiş dəst üzərində tənzimlənir — minimum xərclə maksimum fayda.

### Gücləndirici öyrənmə (reinforcement learning)

Bu növ **agentləri** (kompüter proqramları) verilmiş mühitdə ardıcıl qərar verməyə öyrədir. Məqsəd: agent zamanla mümkün maksimum məcmu mükafatı əldə edəcək ən yaxşı hərəkətləri öyrənsin. Agent hərəkət edir, əks-əlaqə (mükafat və ya cəza) alır və strategiyasını korrektə edir.

Avtonom robototexnika, oyunlar (məsələn AlphaGo) və tövsiyə sistemlərində istifadə olunur. Sürücüsüz avtomobillər yolda hərəkət edərkən ətraf mühitə görə hərəkətlərini korrektə edir: təhlükəsiz, effektiv hərəkət üçün müsbət, arzuolunmaz hərəkət üçün mənfi gücləndirmə alır.

### Öz-özünə nəzarətli öyrənmə (self-supervised learning)

Öyrədicisiz öyrənmənin bir növüdür — alqoritm etiketləri data-nın özündən generasiya edir. Tez-tez "əskik data fraqmentlərini proqnozlaşdırmaq" kimi əməliyyatları əhatə edir.

NLP və şəkil tanımada populyardır: böyük dataset üzərində modeli əvvəlcədən öyrədib (pre-training), sonra konkret tapşırığa uyğunlaşdırmaq. Şəkil emalında ardıcıllığın növbəti kadrını proqnozlaşdırmaq üçün istifadə oluna bilər — bu, hərəkəti başa düşən modellər yaratmağı asanlaşdırır.

### Çox-nümunəli öyrənmə (multi-instance learning)

Burada hər data nöqtəsi bir **"torba" (bag)** olur — içində bir neçə nümunə (subdata nöqtələri) var. Məqsəd: yalnız torba səviyyəsindəki etiketlərə çıxışın olduğu halda torbalar üzərində öyrənmək. Yeni dərman axtarışı, şəkil təsnifatında tətbiq olunur.

E-ticarət nümunəsi: model müştərinin sessiya (torba) ərzində məhsul alacağını proqnozlaşdıra bilər — səhifə baxışları, kliklənən məhsullar, səhifədə keçirilən vaxt kimi nümunələrdən istifadə edir. Sessiya etiketi (torba səviyyəsi) alışın baş verib-vermədiyini göstərir.

> Bu qədər müxtəlif paradiqma ML-i universal sahəyə çevirir. Sirr düzgün növü seçməkdədir — mövcud data-ya və həll olunan məsələyə uyğun olanı.

---

## Data science və ML — ayrılmaz cütlük

ML-in bütün mahiyyəti data ilə işləməkdir. Öyrədici datanın keyfiyyəti modelin uğurunun ən vacib şərtidir. Keyfiyyətli data = daha dəqiq model = düzgün proqnoz.

Amma datada tez-tez nöqsanlar olur: əskik dəyərlər, səs-küy (noise), sürüşmə (bias), kənar dəyərlər. Data araşdırması bu problemləri aşkarlayır. Data science bunları əhatə edir: data toplama, hazırlıq, analiz, ilkin emal və **əlamət generasiyası (feature engineering)**.

### Data hazırlığı — vaxtın 80%-i

Data hazırlığı model qurmanın ilk addımıdır və bütün model işləmə vaxtının **80%-nə** qədərini alır. "Xam" data adətən "çirklidir" — boşluqlar, səhvlər, kənar dəyərlər.

Vacib qayda: **data hazırlığı bizness-məsələni başa düşməkdən başlamalıdır.** Data science mütəxəssisləri tez-tez dərhal kod yazıb nəticə almağa can atır. Amma bizness-məsələni aydın anlamadan alınan nəticələr çox güman məsələyə uyğun gəlməyəcək. Əvvəl sadə istifadəçi hekayəsi və bizness-məqsəd, sonra data.

Data hazırlığı adətən bu addımları əhatə edir: təmizləmə, əskik dəyərlərin həlli, normalizasiya/standartizasiya, etiketləmə. Data çevrilməsi (transformation) valyuta konversiyası (dollar → avro) və ya ölçü vahidi dəyişməsi (kq → funt) kimi əməliyyatları əhatə edə bilər.

**Əlamət generasiyası** mövcud sütunlardan yeni data sütunları (əlamətlər) yaratmaqdır ki, datasetin modeli üçün informativliyi artsın. Məsələn, tarix sütunundan həftənin gününü və ya ayı çıxarmaq modelə zamanla bağlı qanunauyğunluqları tapmağa kömək edir.

### ML iş prosesi (workflow)

Data hazırlığı və model qurma sıx bağlıdır: data hazırlığı modelə təsir edir, model seçimi isə data hazırlığının növünə. Balans axtarışı çox iterativ prosesdir — sənət (və ya çoxsaylı sınaq-səhv) kimidir.

İş prosesinin əsas mərhələləri:

- **İlkin emal (preprocessing):** Data 3 dəstə bölünür — öyrədici (70%), validasiya (10%), test (20%). Model əvvəl öyrədici dəstdə öyrənir, sonra validasiya dəstində effektivliyi və ümumiləşdirmə (generalization) qabiliyyəti yoxlanır, ən sonda test dəstində sınanır. **Əlamətlər** datasetin nəticəyə təsir edə bilən müstəqil atributlarıdır, **etiket** isə hədəf nəticədir.
- **Öyrətmə (training):** Konkret bizness-ssenari üçün uyğun alqoritm və data seçilir. Ən vacib mərhələdir. Dəqiqliyi artırmaq üçün müxtəlif **hiperparametrlərlə** eksperiment aparılır. Hiperparametrlər — öyrətmə prosesini idarə edən konfiqurasiya tənzimləmələridir.
- **Qiymətləndirmə (evaluation):** Model öyrədildikdən sonra tanınan dataset üzərində dəqiqliyi (accuracy) yoxlanır. Validasiya dəstindən istifadə olunur.
- **Proqnoz (prediction / inference):** Model praktikada tətbiq olunur və proqnoz verməyə başlayır. Real vaxtda və ya paket (batch) rejimində baş verə bilər.

### Generativ AI dəyişikliyi

Generativ AI ML sahəsində paradiqma dəyişikliyi yaratdı. Onun əsasında GPT-4 kimi **fundamental modellər (FM)** dayanır — internet miqyaslı nəhəng datasetlərdə öyrədilmişlər. Bu texnologiya təşkilatlara fundamental modelləri optimallaşdırmağa, əl ilə görülən işin və data hazırlığı vaxtının böyük hissəsini azaltmağa imkan verir.

Amma generativ AI panasey deyil — bütün AI/ML problemlərini həll etmək üçün nəzərdə tutulmayıb. FM işləyib hazırlamaq böyük resurs tələb edir, ona görə çox şirkət hazır FM-ləri seçir: OpenAI, Google, Meta, Anthropic. Digər tərəfdən, ixtisaslaşmış model öyrətmək — xüsusi həllər lazım olan yerlərdə — hələ də cəlbedici variant olaraq qalır.

---

## Overfitting və underfitting — modelin iki dərdi

Modeli qiymətləndirəndə iki əsas problem çıxır. Hər ikisi düzgün nəticə üçün nəzərə alınmalıdır.

**Overfitting (həddindən artıq öyrənmə):** Model öyrədici datanı sanki əzbərləyir — səs-küyü də gizli qanunauyğunluqla birlikdə yadda saxlayır. Nəticədə öyrədici datada yüksək, amma yeni datada aşağı nəticə göstərir. Bu, **yüksək dispersiyaya (variance)** aparır: öyrədici datadakı kiçik dəyişiklik nəticələri kəskin dəyişir.

**Underfitting (kifayət qədər öyrənməmə):** Model öyrədici dəstdəki əsas qanunauyğunluqları belə tuta bilmir. Adətən model həddindən artıq sadədir və ya kifayət qədər müstəqil dəyişən yoxdur. Bu, **yüksək sürüşməyə (bias)** aparır.

> Yaxşı model bu ikisi arasında incə balansı tapır — nə əzbərləyir, nə də korlaşdıraraq sadələşdirir. Bunu bir sənət əsəri kimi düşün: dəqiq tənzimləmə (fine-tuning) ilə əldə olunur.

Təsəvvür et: model müştərinin məhsul alıb-almayacağını dairələr və çarpazlarla təsnif edir. Overfitting olan model bütün "dairə" nöqtələrindən keçir, amma öyrədici dəstdən kənarda ümumiləşdirə bilmir. Underfitting olan model isə bir neçə nöqtəni buraxır. Yaxşı model (ortada) aydın proqnoz verir.

---

## Populyar ML alqoritmləri

Alqoritmin populyarlığı tətbiq sahəsindən, effektivliyindən, başa düşülmə və miqyaslana bilmə qabiliyyətindən asılıdır. Ən çox işlənənləri gəzək — hər birinə gündəlik həyatdan analoji ilə.

**Xətti reqressiya (linear regression):** Bir faktorun (X) digərini (Y) nə dərəcədə proqnozlaşdırdığını aşkarlayır. Bazarda balqabaq qiymətlərini düşün — balqabaq böyüdükcə qiyməti artır. Xətti reqressiya bütün nöqtələrə mümkün qədər yaxın keçən düz xətt çəkməyə çalışır. Daşınmaz əmlakda ev qiymətini (otaq sayı, yerləşmə, tikinti ilinə görə) proqnozlaşdırmaq üçün istifadə olunur.

**Logistik reqressiya (logistic regression):** "Bəli/xeyr" səviyyəsində nəticə ehtimalını proqnozlaşdırır. Kitabın bestseller olub-olmayacağını (səhifə sayı, müəllif populyarlığı, janr → 0–1 ehtimalı) proqnozlaşdırmaq kimi. Səhiyyədə yaş, təzyiq, xolesterol əsasında ürək xəstəliyi ehtimalını hesablayır.

**Qərar ağacları (decision trees):** Suallara cavab verərək qərar zənciri qurur. Geyim seçmək kimi: "Çöldə yağış var?" → bəli → yağmurluq; xeyr → "İsti?" → uyğun geyim. Müştərinin alış davranışını proqnozlaşdırmaq üçün: "Son ay nəsə alıb?" sualından başlayır.

**Təsadüfi meşə (random forest):** Ad özü deyir — bir meşə, hər ağac isə qərar ağacıdır və nəticəyə "səs verir". Hər ağaca təsadüfi data alt-çoxluğu düşür, sonra hamı səs verir, çoxluğa görə qərar seçilir. Tək ağacdan daha dəqiq və stabildir. Maliyyədə kredit müraciətinin təsdiqi/rəddi üçün istifadə olunur.

**K ən yaxın qonşu (k-NN):** Tanımadığın obyekti tanıdığın oxşar obyektlərlə müqayisə edib xüsusiyyətini müəyyən etmək. Yeni gördüyün meyvənin şirin/turş olduğunu oxşar meyvələrlə müqayisə edərək təxmin edirsən. Tövsiyə sistemlərində geniş işlənir: detektiv roman alan istifadəçiyə həmin kitabı alanların digər kitabları tövsiyə olunur.

**Dəstək vektorları metodu (SVM):** Fərqli qrupları bir-birindən mümkün qədər geniş xətlə ayırır. Bir tərəfində alma, digərində banan olan masanı təsəvvür et — SVM ikisini ayıran ən geniş xətti tapır. Əlyazma rəqəm tanımada ("4"-ü "9"-dan ayırmaq) effektivdir.

**Neyron şəbəkələri (neural networks):** Kompüter içində mini-beyin kimi işləyir, çoxlu nümunədən öyrənir. Velosiped sürməyi öyrənmək kimi — əvvəl yıxılırsan, sonra balansı tutursan, keçmiş səhvləri düzəldirsən. Sosial şəbəkələr foto­da insanları tanımaq üçün istifadə edir (burun forması, göz rəngi kimi əlamətlər).

**K-means clustering:** Oxşar data nöqtələrini qruplaşdırır. Böyük ziyafətdə oxşar maraqlı dostları qruplara (kластерlərə) bölmək kimi. Marketinqdə müştəri seqmentasiyası üçün: bir kластерdə tez-tez az xərcləyənlər, digərində nadir amma böyük alış edənlər.

**XGBoost:** Keçmiş səhvlərdən öyrənib hər qərarla ağıllaşır. Riyaziyyat məsələsində səhv edəndə səhvi yadda saxlayıb növbəti dəfə oxşarında ondan qaçmaq kimi. Kredit sənayesində qaytarılmama (default) riskini proqnozlaşdırmaq üçün geniş işlənir.

Bəziləri (neyron şəbəkələri) böyük hesablama resursu tələb edir, digərləri (qərar ağacları, k-NN) kiçik datasetlə də işləyir. Seçim məsələdən və data növündən (mətn, qrafika, rəqəm) asılıdır.

---

## Alət və freymvorklar

ML müxtəlif mərhələlər üçün müxtəlif alətlərlə həyata keçirilir. Onları funksiyaya görə qruplaşdıraq.

**Data hazırlığı və analizi:**

- **NumPy** — Python-da elmi hesablamalar üçün əsas kitabxana. Çoxölçülü массив obyektləri saxlayır. Массив — yaddaşın bitişik sahələrində saxlanan eyni tipli data elementlərinin kolleksiyasıdır.
- **Pandas** — sadə, yüksək performanslı data strukturları verir: `Series` (bir sütun) və `DataFrame` (sütunlardan ibarət çoxölçülü cədvəl). NumPy əsasında qurulub. Data təmizləmə, analiz və vizuallaşdırmanı asanlaşdırır.
- **Scikit-learn** — Pandas və NumPy ilə işləyən proqnoz analiz aləti. Öyrədicili və öyrədicisiz öyrənmə metodlarını dəstəkləyir, model seçimi/qiymətləndirməsi üçün çoxlu hazır alət var.

**Vizuallaşdırma:**

- **Matplotlib** — statik, interaktiv və animasiyalı vizuallaşdırmalar. Xətti qrafik, səpələnmə (scatter), histoqram, dairəvi, 3D diaqram.
- **Seaborn** — Matplotlib əsasında statistik vizuallaşdırma. Hazır temalar və rəng palitraları ilə peşəkar qrafiklər. Çox dəyişənli mürəkkəb dataset (məsələn heatmap) üçün əla.
- **BI alətləri** — Tableau, Microsoft Power BI, Amazon QuickSight, MicroStrategy. Qrafik interfeys ilə drag-and-drop analiz; proqramlaşdırma bilməyənlər üçün ideal. Real vaxtda dashboard-lar qurur.

**Model işləmə və öyrətmə:**

- **TensorFlow** — açıq mənbəli tam funksiyalı ML platforması. Əsas xüsusiyyəti — data axını qrafları qurmaq. Qrafda hər düyün (node) riyazi əməliyyatdır, düyünlər arası əlaqələr (kənarlar) tenzorları — çoxölçülü data массivlərini təmsil edir.
- **PyTorch** — çevikliyi, sadəliyi və **dinamik hesablama qrafı** ilə populyar (dərin öyrənmə üçün xüsusilə faydalı). Dinamik qraf şəbəkənin davranışını iş vaxtı dəyişməyə imkan verir. Həm tədqiqatda, həm production-da işlənir.
- **Keras** — dərin öyrənmə modelləri qurmaq üçün rahat API. TensorFlow kimi kitabxanaların üstündə işləyə bilir. Sadəliyi və eksperiment rahatlığı ilə məşhurdur.
- **MLlib (Apache Spark)** — Big Data üçün miqyaslanan ML kitabxanası. Paylanmış hesablama sayəsində nəhəng data həcmini sürətlə emal edir. Real vaxtda kredit kartı fırıldaqçılığının aşkarlanması üçün ideal.

**Model deployment (yerləşdirmə):**

- **Docker** — konteynerlərdən istifadə edən tətbiqlərin qurulması/işə salınmasını asanlaşdırır. ML aləti deyil, amma modeli bütün asılılıqları (kitabxana, alət, skript) ilə birlikdə bir konteynerə qablaşdırıb hər mühitdə eyni işlətməyə imkan verir.
- **Flask** — Python-da micro-freymvork. Sadə, öyrənməsi asan; yüngül vebtətbiq və API deployment üçün populyar. Məsələn: mesajın spam olub-olmadığını təyin edən modeli veb-server kimi yerləşdirmək.

**IDE-lər:**

- **Jupyter Notebook** — açıq mənbəli veb-tətbiq. Canlı kod, düstur, vizuallaşdırma və izahlı mətn saxlayan interaktiv sənədlər yaradır. Python, R, Julia dəstəkləyir. Data science-in özəyidir.
- **RStudio** — R dili üçün açıq mənbəli IDE. Statistik hesablama, vizuallaşdırma və skript işləmə üçün güclü.
- **Apache Zeppelin** — Jupyter-ə oxşar notebook mühiti. Apache Spark, Python, JDBC kimi müxtəlif backend-ləri dəstəkləyir. Daxili vizuallaşdırma güclü tərəfidir.

---

## ML buludda

ML modellərini işləmək mürəkkəb və bahalıdır. İş prosesinin hər addımında maneə var — darıxdırıcı data toplama/hazırlıqdan tutmuş düzgün alqoritm seçiminə (çox vaxt sınaq-səhv ilə), uzun və bahalı öyrətməyə qədər. Sonra modeli tənzimləmək lazımdır — tənzimləmə dövrü minlərlə kombinasiya tələb edə bilər.

Bu problemləri həll etmək üçün bütün əsas bulud provayderləri **idarə olunan ML platforması** təklif edir.

**Amazon SageMaker** — ən populyar uçdan-uca ML platformalarından biridir. SageMaker Studio bir mühitdə inteqrasiya olunmuş alət dəsti verir. Jupyter Notebook və JupyterLab mühitlərini ani işə salır, eksperiment idarəçiliyi, data hazırlığı, pipeline avtomatlaşdırması təklif edir. Miqyaslama, yamaq (patching), yüksək əlçatanlıq kimi bütün infrastruktur problemlərini üzərinə götürür.

Oxşar platformalar: GCP-dən **Google Cloud AI**, Microsoft Azure-dən **Azure ML Studio**.

İdarə olunan platformalardan başqa, bulud hazır **AI xidmətləri** də verir. Bunlar modeli proqramlaşdırma bacarığı olmadan istənilən tətbiqə intellekt əlavə etməyə imkan verir. Məsələn AWS-in **Amazon Comprehend** xidməti müxtəlif dillərdə açar ifadə aşkarlanması və tonallıq analizi üçün əvvəlcədən öyrədilmiş modellər verir.

Bulud həm də generativ AI-ın fundamental modelləri üçün əsas platformaya çevrilir. **Amazon Bedrock** API ilə stability.ai, Meta, Mistral, Anthropic, Amazon, AI21 kimi şirkətlərin FM-lərinə çıxış verir. Azure OpenAI GPT-4-ə, GCP isə öz Gemini modelinə API çıxışı verir.

---

## ML arxitekturasının qurulması

Dağınıq kod parçalarından etibarlı və miqyaslanan iş prosesi qurmaq mürəkkəb işdir, çox data science mütəxəssisinin bu təcrübəsi olmur. ML iş prosesi bir neçə mərhələnin koordinasiya olunmuş ardıcıllığıdır. Mütəxəssislər əvvəl kod fraqmentlərini qablaşdırmalı, sonra icra ardıcıllığını göstərməli, həm də kod, data və parametr asılılıqlarını izləməlidir.

ML arxitekturası model artefaktlarını qorumalı, işləmə/öyrətmə üçün self-service funksionallıq verməli, bütün həyat dövrünü avtomatik sənədləşdirməlidir. Həmçinin **CI/CD pipeline** (davamlı inteqrasiya/davamlı yerləşdirmə) tətbiq etməlidir.

Aşağıda AWS platformasında ML arxitekturasının komponentlərini gəzək.

### Hazırlıq və etiketləmə

Data-nı ML üçün hazırlamaq — əlamət generasiyası, data yoxlaması, model qiymətləndirmə və interpretasiya deməkdir. Əlamət generasiyası zamanı dataset alqoritmin gözlədiyi formata çevrilir.

- **SageMaker Data Wrangler** — data hazırlığını sadələşdirir: yükləmə, birləşdirmə, təmizləmə, çevirmə üçün vizual interfeys. Ümumi əməliyyatları kod yazmadan yerinə yetirir.
- **SageMaker Feature Store** — ML modelləri üçün əlamətləri saxlayan mərkəzi repozitoriya. Öyrətmə və inference üçün ardıcıl əlamət dəstini saxlayır.
- **Data etiketləmə** — üçüncü tərəf xidmətlərlə (Labelbox, CrowdAI, Docugami, Scale) və ya **SageMaker Ground Truth** ilə (şəkil etiketlənməsini avtomatlaşdırır) həyata keçirilir.

### Model seçimi və qurulması

Model qurmadan əvvəl bizness-məsələni aydın başa düşmək lazımdır — bu, alqoritm seçiminə kömək edir. Data science mütəxəssisləri əsasən Jupyter Notebook və RStudio-nu model qurma platforması kimi seçir. Bulud üçün SageMaker Studio və RStudio hazır vizual interfeys verir.

### Model öyrətmə və tənzimləmə

Öyrətməni sürətləndirmək üçün **paylanmış hesablama klasteri** məsləhətdir — iş yükünü bir neçə resursa bölür, paralel hesablama aparır. Nəticədə öyrətmə tez bitir, daha böyük dataset emal olunur.

**Hiperparametr tənzimləməsi** dəqiq nəticə üçün son dərəcə vacibdir. Ən effektiv model versiyasını tapmaq üçün müxtəlif hiperparametr diapazonları ilə öyrətmə tapşırıqları işə salınır. Debug alətləri real vaxt metrikləri (öyrətmə/validasiya dəqiqliyi, səhv matrisləri, qradiyentlər) müəyyən etməyə kömək edir. Bütün eksperimentlər — giriş parametrləri, konfiqurasiyalar, nəticələr — sənədləşdirilməlidir.

**SageMaker Autopilot** model işləmənin bəzi sahələrini avtomatlaşdırır: xam datanı analiz edir, əlamət emalı tətbiq edir, ən uyğun alqoritmləri seçir, öyrədir, tənzimləyir və performans metriklərinə görə sıralayır.

### Model deployment və idarəetmə

Real vaxt və ya paket proqnozu üçün öyrədilmiş model production mühitinə yerləşdirilir. Yüksək artıqlıq üçün müxtəlif yerlərdə avtomiqyaslama, tətbiq üçün **RESTful HTTPS endpoint**-lər qurulur. Belə yanaşma yeni modelin tez inteqrasiyasını asanlaşdırır — modeldəki dəyişiklik mütləq tətbiq kodunun dəyişməsini tələb etmir.

Data mövsümilik və ya gözlənilməz hadisələr səbəbindən tez dəyişir. Ona görə model həm dəqiqlik, həm bizness aktuallığı baxımından davamlı izlənməlidir. Kritik bir amil var:

> **Concept drift (konsepsiya sürüşməsi):** Proqnoz verilən data öyrətmə datasından fərqlənəndə. Modelin öyrəndiyi qanunauyğunluqlar cari data mühitində artıq doğru olmur.

Məsələn, iqtisadi şəraitin dəyişməsi faiz dərəcələrini dəyişir, bu da ev təsərrüfatları üçün alış proqnozlarına təsir edir. Həlli: yerləşdirilmiş modellərdə avtomatik concept drift aşkarlanması və detallı xəbərdarlıqlar qurmaq.

Bir də **model uyğunluğu (compatibility)** var. Model qurulub öyrədildikdən sonra hədəf aparat platforması (Intel, NVIDIA, ARM) seçilir. Model periferik (edge) qurğularda optimal işləməsi üçün kompilyasiya olunmalıdır.

### Referens arxitektura (AWS-də kredit təsdiqi)

Bir bank kredit müraciəti iş prosesini AWS-də təsəvvür edək. Müştəri datası buluda daxil olur, ML freymvorku müraciət barədə qərar verir. Əsas prinsiplər:

**Öyrətmə iş prosesi:**

1. Datasetlər **S3** ilə prosesə daxil olur (xam və ya ilkin emaldan keçmiş).
2. **Ground Truth** yüksək keyfiyyətli öyrədici dataset yaradır (lazım olsa etiketləyir).
3. **AWS Lambda** datanı SageMaker-ə ötürməzdən əvvəl inteqrasiya, hazırlıq, təmizləmə üçün istifadə olunur.
4. Data science mütəxəssisləri **SageMaker** ilə model öyrədir/test edir. Docker образları **ECR**-də saxlanır.
5. Model artefaktları **S3**-ə çıxarılır.
6. Yeni artefakt S3 bucket-inə düşəndə **AWS Lambda** təsdiq prosesini işə sala bilər.
7. **Amazon SNS** avtomatik və ya insan iştiraklı təsdiq prosesi verir.
8. **DynamoDB** bütün metadata, hərəkət və audit datasını saxlayır.
9. Yekun modeli yerləşdirmək üçün uyğun konfiqurasiya ilə **endpoint** qurulur.

**Build iş prosesi:**

10. **SageMaker Notebook** nümunələri data hazırlığı, öyrətmə və yerləşdirmə üçün istifadə olunur (VPC endpoint vasitəsilə).
11. **CodeCommit** mənbə kodu repozitoriyasıdır, build tapşırıqlarını işə salır.
12. **CodePipeline** qeyri-standart Docker образları üçün uçdan-uca build pipeline-ını idarə edir, **CodeBuild** ilə build/test aparır.
13. **CodeBuild** образı qurur, unit-test edir və **ECR**-ə yerləşdirir.

**Deployment iş prosesi:**

14. SageMaker endpoint-ləri privat olduğundan, **Amazon API Gateway** istifadəçilərə inference üçün model endpoint-i verir.

Paket çevirmə (batch transform) tapşırıqları bütün dataset üzərində inference almaq üçün lazımdır, nəticə S3-də saxlanır. **SageMaker Model Monitor** işləyən modelləri izləyib keyfiyyət problemlərində bildiriş göndərir.

---

## ML arxitekturasının dizayn prinsipləri

Effektiv arxitektura strateji yanaşma tələb edir. Peşəkarların rəhbər tutduğu əsas prinsiplər:

- **Modulluq (modularity):** Sistem ayrı, dəyişdirilə bilən modullara bölünür — biri data toplama, biri ilkin emal, biri öyrətmə, biri proqnoz. Daha yaxşı alqoritm çıxanda öyrətmə modulunu digərlərini pozmadan dəyişmək olar.
- **Miqyaslana bilmə (scalability):** İş yükü və ya istifadəçi tələbi artdıqda stabil performansı saxlamaq. Netflix-in tövsiyə sistemi artan istifadəçi sayına dəqiqlik itirmədən uyğunlaşmalıdır. Və ya "Qara cümə" endirimlərində eksponensial artan əməliyyat.
- **Təkrar istehsal oluna bilmə (reproducibility):** Eyni data, kod və parametrlərlə təkrar öyrətmə eyni nəticəni verməlidir. Tibbi diaqnostikada diaqnozların modelin fərqli nüsxələri arasında ardıcıl qalması vacibdir.
- **Data keyfiyyət nəzarəti:** Modelə ötürülən datanın dəqiqliyini (accuracy), tamlığını (completeness) və etibarlılığını (reliability) yoxlamaq mexanizmləri. Sürücüsüz avtomobildə data keyfiyyəti birbaşa təhlükəsizliyə təsir edir.
- **Çeviklik (flexibility):** Yeni data mənbələrini, data növlərini və alqoritmləri əsaslı yenidənişləmə olmadan inteqrasiya etmək. Kontent aqreqatoru yeni xəbər saytlarını və ya video/podkast tiplərini asan əlavə edə bilməlidir.
- **Robastlıq və etibarlılıq:** Giriş datasındakı dəyişikliyə davamlı, ardıcıl nəticə. Spam filtri spamerlərin dil və terminologiyanı dəyişməsinə baxmayaraq işləməlidir. Avtomatik birja ticarətində bazar səs-küyünü ayırd etmək həyati vacibdir.
- **Məxfilik və təhlükəsizlik (privacy & security):** Data və modelin icazəsiz çıxışdan qorunması, şəxsi datanın etika və uyğunluğa (compliance) əsasən emalı. Personalizasiya olunmuş marketinqdə istifadəçi datası ən yüksək təhlükəsizliklə emal olunmalıdır.
- **Effektivlik (efficiency):** Maksimum performans, minimum resurs. Mobil tətbiqdə ML funksiyası batareyanı həddindən artıq yormamalıdır. Real vaxt fırıldaqçılıq aşkarlanmasında sürət və resurs balansı əsasdır.
- **İnterpretasiya oluna bilmə (interpretability):** Modelin nəticələri insan üçün anlaşıqlı və izahlı olmalıdır. Tibbi platforma diaqnoz əsaslandırmasını verməlidir. Kredit skorinqində istifadəçi və tənzimləyici hansı amillərin bala təsir etdiyini bilməlidir.
- **Real vaxt qabiliyyəti:** Datanı real və ya real vaxta yaxın emal etmək. Sürücüsüz nəqliyyat sensor datası əsasında ani qərar verir (maneə tanımaq, optimal yol seçmək).
- **Nasazlığa dözümlülük (fault tolerance):** Bəzi komponentlər sıradan çıxsa belə funksionallığı saxlamaq. Pərakəndə tövsiyə sistemi bəzi data mənbələri müvəqqəti əlçatmaz olsa da məhsul tövsiyə etməlidir.

---

## MLOps

ML iş prosesi real bir məsələni həll edən riyazi model formalaşdırmaq üçün əməliyyatlar kompleksidir. Amma bu modellər production-a yerləşdirilməyincə heç bir dəyəri yoxdur — konsepsiya sübutu (proof of concept) olaraq qalır.

**MLOps** eksperimental ML modelini tam funksional işlək sistemə çevirməyə yönəlib. Ənənəvi DevOps-dan fərqlənir, çünki ML həyat dövrü unikaldır və spesifik ML artefaktları istehsal edir. ML-də mərkəzi yer öyrədici datadakı qanunauyğunluqları aşkarlamaqdır — ona görə MLOps data dəyişikliklərinə, həcm və keyfiyyət dalğalanmalarına xüsusilə həssasdır.

### MLOps prinsipləri

Kod, öyrədici data və ya modeldə hər dəyişiklik build prosesini işə salmalıdır. Pipeline bu prinsiplərə uyğun olmalıdır:

- **Avtomatlaşdırma:** Production-a deployment avtomatik olmalıdır — data mühəndisliyindən model inference-ə qədər əl müdaxiləsiz. Pipeline öyrətmə/deployment-i cədvəl, mesaj, monitorinq, data dəyişikliyi kimi hadisələrlə işə sala bilər.
- **Versiya nəzarəti:** Hər model və əlaqəli skript versiya nəzarət sistemində (GitHub) saxlanmalıdır — təkrar istehsal və audit üçün.
- **Test:** Ən azı 3 sahə: (1) əlamət və data testləri (keyfiyyət yoxlaması, düzgün əlamət seçimi); (2) model işləmə testləri (bizness-metrik, aktuallıq, effektivlik); (3) infrastruktur testləri (ML API, bütün pipeline inteqrasiyası, server əlçatanlığı).
- **Təkrar istehsal:** Hər mərhələ təkrar istehsal oluna bilməlidir — oxşar girişdə oxşar nəticə.
- **Deployment:** MLOps DevOps mədəniyyəti ilə birləşir, CI/CD və **CT/CM** (davamlı öyrətmə / davamlı monitorinq) üzərində fokuslanır.
- **Monitorinq:** Zamanla model performansı data drift səbəbindən azala bilər. Yerləşdirmədən sonra monitorinq sistemi qurulmalıdır ki, model gözləntilər çərçivəsində işləsin.

### MLOps ən yaxşı praktikaları

"Hərəkət edən hissələr" (data, model, kod) çox olduğundan MLOps-u tətbiq etmək çətin ola bilər. Praktikalar:

- **Dizayn faktorları:** Arxitektura modul və mümkün qədər **zəif əlaqəli (loosely coupled)** olmalıdır. Zəif əlaqə komandaların müstəqil işləməsinə imkan verir.
- **Data yoxlaması:** Production data-nın statistik xüsusiyyətləri öyrədici datadan fərqlənə bilər. Data drift zamanla növbəti paketlərin statistik xüsusiyyətlərini dəyişir və model performansına təsir edir.
- **Model yoxlaması:** Model təkrar istifadəsi kod təkrar istifadəsindən fərqlidir — modeli hər yeni ssenari üçün tənzimləmək məsləhətdir. Production-a çıxmazdan əvvəl həm online, həm offline yoxlama.
- **Eksperiment izləmə:** Bütün eksperimentlər (kod, dataset, hiperparametr kombinasiyaları) sənədləşdirilməlidir. Hər unikal kombinasiya müqayisə olunası metriklər verir.
- **Kod keyfiyyət yoxlaması:** Hər ML spesifikasiyası (öyrətmə kodu) **code review**-dən keçməlidir — pull request ilə işə düşən pipeline yaxşı praktikadır.
- **Adlandırma konvensiyaları:** Python-da PEP8 kimi standartlara riayət **CACE** prinsipinin (Changing Anything Changes Everything — "hər şeyin dəyişməsi hər şeyi dəyişir") yaratdığı problemləri həll edir.
- **Model performans monitorinqi:** Proyekt metrikləri (məsələn RMSE) ilə yanaşı əməliyyat metriklərini (gecikmə, miqyaslanma) izləmək.
- **CT/CM prosesi:** CT (continuous training) modellərin ən yeni data ilə müntəzəm öyrədilməsini, CM (continuous monitoring) real vaxt performans izləməsini təmin edir. Birlikdə etibarlı freymvork yaradır.
- **Resurs istehlakı:** Öyrətmə və deployment mərhələlərində sistem tələblərini başa düşmək resurs optimallaşdırması və xərc qənaəti üçün vacibdir.

---

## Dərin öyrənmə (deep learning)

ML-in əsas məqsədi proqnoz və mürəkkəb məsələləri (NLP daxil) həll etməkdir. Öyrədicili öyrənmə əvvəlcədən etiketlənmiş data tələb edir, amma **dərin öyrənmə** etiketsiz öyrənmə üçün neyron şəbəkəsindən istifadə edir — insan beyninin davranışını böyük data həcmində modelləşdirir.

Dərin öyrənmə çoxlaylı neyron şəbəkəsi istifadə edir. Model bir-biri ilə əlaqəli düyünlərdən ibarətdir: **giriş qatı (input layer)** datanı müxtəlif düyünlərdən verir, data bir neçə **gizli qatdan (hidden layers)** keçir, **çıxış qatı (output layer)** yekun nəticəni (inference) verir. Giriş və çıxış qatları görünəndir, öyrənmə isə aralıq qatlarda çəki (weight) və sürüşmə (bias) ilə baş verir.

### Çəkilər necə işləyir

**Çəki (weight)** neyron şəbəkəsinin parametridir — girişin gizli qatlardan keçərkən necə çevrildiyinə təsir edir. Yəni verilmiş girişin çıxışa nə dərəcədə təsir edəcəyini müəyyən edir. Düyünlər arası əlaqənin gücü kimi düşün.

- A → B kənarının çəkisi yüksəkdirsə, A neyronu B-yə daha güclü təsir edir.
- Sıfıra yaxın çəki: bu girişin dəyişməsi çıxışa demək olar təsir etmir.
- Mənfi çəki: əks əlaqə — giriş artdıqca çıxış azalır.

### İki öyrənmə metodu

**İrəli yayılma (forward propagation):** Data giriş qatından çıxış qatına doğru hərəkət edir. Bir qatın çıxışı növbəti qatın girişinə ötürülür, yekun nəticəyə qədər.

**Geri yayılma (backpropagation):** Şəbəkənin proqnozundakı səhv (proqnoz ilə faktiki nəticə arasındakı fərq) hesablanır. Sonra şəbəkə daxili parametrlərini — çəki və sürüşmələri — bu səhvə əsasən korrektə edir. Korrektə çıxış qatından geriyə doğru gedir, ona görə "geri" adlanır.

> İrəli + geri yayılmanın kombinasiyası ilə şəbəkə öyrənir: datanı emal edir (irəli), qeyri-dəqiqlikləri aşkarlayır (geri), parametrləri dəyişir. Bu dövr neyron şəbəkəsinin öyrənməsinin əsasıdır.

### İki populyar tip

- **Konvolyusiya neyron şəbəkələri (CNN):** Şəbəkə topologiyasında data (məsələn şəkillər) emalında əladır. Kompüter görməsi (computer vision) və şəkil təsnifatı üçün yüksək effektivdir.
- **Rekurrent neyron şəbəkələri (RNN):** Ardıcıl (sequential) data emalında güclüdür. Dil və nitq başa düşməsi (NLP, nitq tanıma) üçün ideal.

Freymvorklar: TensorFlow, MXNet (effektivlik və miqyaslanma ilə tanınır), həmçinin PyTorch, Chainer, Caffe2, ONNX, Keras, Gluon.

### Dərin öyrənmə real həyatda

- **Səhiyyə:** Modellər tibbi şəkillərdə xəstəlik əlamətlərini tanıyır, ikinci rəy verir. Google DeepMind göz xəstəliklərini 3D skanlarda aşkar edən model işləyib.
- **Sürücüsüz nəqliyyat:** Tesla, Waymo çoxlu sensor datası ilə obyekt tanıma, yol nişanları anlama, təhlükəsiz sürmə qərarları verir.
- **İstehsalat:** General Electric avadanlıq datasını analiz edib nasazlıqları qabaqcadan görür, dayanma vaxtını azaldır.

---

## NLP (Təbii dilin emalı)

NLP təbii dilləri başa düşmək və oxumaq üçündür. AI-ı hesablama dilçiliyi ilə birləşdirir ki, kompüter nitq və ya mətn şəklində təbii dili emal edə bilsin. Praktik ssenariləri gəzək.

**Çat-botlar və virtual köməkçilər:** NLP-nin ən geniş tətbiqi. Siri, Alexa və saytlardakı dəstək botları. İstifadəçi girişini (sual/əmr) başa düşür, mənalı cavab generasiya edir.

**Tonallıq analizi (sentiment analysis):** Şirkətlər brend, məhsul və ya xidmətə münasibəti qiymətləndirmək üçün müştəri rəylərini analiz edir. Emosiyaları müsbət, neytral, mənfi olaraq təsnif edir. Amazon Connect kimi müasir kontakt-mərkəz həlləri real vaxtda səsli ünsiyyəti analiz edib müştəri emosiyalarını təyin edir.

**Mətn referatlaşdırması (text summarization):** Uzun sənəd və məqalələrin kompakt xülasəsini generasiya edir. Kritik informasiyanı itirmədən həcmi azaldır. Hüquq və elmi tədqiqatda — böyük sənəd həcmindən vacib informasiyanı tez çıxarmaq üçün faydalıdır.

**Maşın tərcüməsi:** Google Translate NLP ilə mətnin orijinal dildəki məzmununu qavrayır və tərcümə dilində ekvivalent mətn generasiya edir. Qrammatik/sintaktik qaydalara riayət edir, məna və kontekstı saxlayır.

**Böyük dil modelləri (LLM):** GPT (Generative Pretrained Transformer) kimi modellər transformer arxitekturası kimi formalaşıb. Mətni başa düşmək və insanabənzər mətn generasiya etmək üçün işlənib — avtotamamlama, referatlaşdırma, tərcümə kimi tapşırıqlarla məşğul olur.

---

## Sona qədər: modeldən dəyərə

Uzun bir yol gəzdik. Gəlin əsas ideyanı bir daha yığcam saxlayaq.

**Əvvəl** ML sadəcə bir riyazi model idi — dağınıq kod, notebook-da eksperiment, "işləyir amma laboratoriyada qalır". **Sonra** — düzgün arxitektura ilə — o, production-da işləyən, avtomatik yenilənən, dreyfi izlənən, təhlükəsiz və miqyaslanan bir sistemə çevrilir.

Fərqi yaradan bir neçə şeydir:

- **Data hər şeydir** — vaxtın 80%-i orada gedir, keyfiyyət modelin taleyini həll edir.
- **Balans sənətdir** — overfitting və underfitting arasında düzgün nöqtəni tapmaq.
- **MLOps körpüdür** — eksperimenti işlək məhsula çevirən, CI/CD və CT/CM ilə onu canlı saxlayan disiplin.
- **Prinsiplər kompas** — modulluq, miqyaslanma, robastlıq, interpretasiya olunma... bunlar olmasa sistem real dünyada dağılır.

ML və AI nəhəng mövzulardır — hər birinə ayrıca kitab lazımdır. Bu yazı yalnız əsas modellərin, tiplərin və iş proseslərinin xəritəsidir. Növbəti addım isə generativ AI-dır — fundamental modellər və mövcud həllər.

Bəs sən öz proyektində ilk hansı prinsipdən başlayardın — dataya, yoxsa arxitekturaya?
