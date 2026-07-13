# SR-mühəndisi vəzifəsini necə tapmaq olar?

Bu yazı iş axtaranlar üçündür, işəgötürənlər üçün yox — baxmayaraq ki, işəgötürənlər də burdan nəsə çıxara bilər. Əvvəlcə iş elanını necə oxumaq, sonra müsahibəyə necə hazırlaşmaq və onu uğurla keçmək barədə danışacağıq.

## Əvvəlcə çətin mövzu: hansı vəzifələr "əsl" SRE sayılmır

Bunu mümkün qədər ehtiyatla deyim: kitab boyu təkrarlanan həqiqət var — SRE adı altında gördüyün hər iş eyni deyil. Mən heç vaxt "SRE-nin yeganə düzgün tərifi budur" deməmişəm və indi də deməyəcəyəm. Amma bir sərhəd qoyuram: sadəcə vəzifə adını dəyişməklə "SR-mühəndisi" yaratmaq mənim üçün həddindən artıqdır. Bu vəzifədə işləyən insanları qınamıram, sadəcə öz daxili reytinqimdə "bu, SRE-dir, yoxsa yox?" sualında onlar aşağı sırada qalır.

Əgər elə bir vəzifəyə can atırsansa (uğurlar!), tövsiyəm budur: sistem administrasiyası/DevOps/IT service management/dəstək sahəsindəki son inkişaflardan xəbərdar ol. Jennifer Davis-in *Modern System Administration* kitabı və Jez Humble ilə David Farley-nin klassikası *Continuous Delivery* buna yaxşı başlanğıcdır.

## İş elanını necə oxumaq lazımdır

Bir vəzifənin "nə qədər SRE" olduğunu necə hiss edirəm — bunu izah etmədən yuxarıdakı ayrımı çəkmək ədalətsiz olardı. Elanda hansı məlumat var, hansı yoxdur — mən elə buna baxıram.

> Ümumi iş elanı məsləhəti vermək niyyətində deyiləm — bu mövzuda kifayət qədər resurs var. Burda yalnız SRE-yə xas nüansları paylaşıram.

### Texnologiyalar haqqında qeydlər

Aşağıdakılar "ilk təəssürat" səviyyəsindədir — vəzifəni tam təsvir etmir, amma axtardığın məlumata görə faydalı işarələr verir.

| Nəyə baxıram | Bundan nə öyrənirəm |
|---|---|
| Texnologiyaların müasirliyi | Şirkət hansı texnologiya nəslinin hansı mərhələsindədir |
| Elementlərin bir-birinə uyğunluğu | Kubernetes + Prometheus məntiqlidir; Kubernetes + Nagios isə mühitin "parçalanmış" olduğuna, müasir infrastrukturun köhnə (amma hələ işlək) alətlərlə yanaşı yaşadığına işarədir |
| "Sorğu emalı bacarıqları" ifadəsi | Mühit nə qədər tranzaksiyalıdır, əməliyyatlar nə sürətlə baş verməlidir |
| Konkret proqram versiyaları (məs. SuperCoolDB 2.4) | İndi konkret bir problemi həll etmək lazımdır; gələcək yeniləmələr önəmli ola bilər, ola bilməz də |
| Lokal + bulud qarışığı, çoxlu vendor, kommersiya + açıq mənbə qarışığı | Monokultura yoxdur — çeşidliliyə yoxsa sabitliyə üstünlük verirlər? |
| Proqramlaşdırma/skript dili qeydi | Kod yazmaq onlar üçün önəmlidir (kitabda dəfələrlə vurğuladığım kimi, SR-mühəndisi kod yaza bilməlidir) |
| Ənənəvi IT texnologiyaları (məs. "printer", "print server") | İşdə ənənəvi IT tərəfi var, bəlkə də əsas istiqamətdir |
| CI/CD və mühit təminatına güclü meyl | Əvvəlcə DevOps vəzifəsi olub, indi SRE mentalitetinə uyğunlaşdırılır |
| Monitorinq texnologiyasının olub-olmaması | Monitorinqin bu vəzifəyə nə dərəcədə aidiyyəti var (ipucu: olmalıdır) |
| İstifadə olunan xidmətlər (öz və ya üçüncü tərəf) | Asılılıqlar baxımından "nəyə girirəm" sualına əlavə məlumat — X vendoru ilə əvvəl problemin olubsa, X əsaslı mühitdə işləmək istəməyə bilərsən |

> Bir kiçik etiraf: elanda "ninja" və ya "rock star" sözü keçirsə, ya da "biz çox işləyib sərt oynayırıq!" havası hiss olunursa, əks istiqamətə qaçmağı üstün tuturam. Bu, adətən "toksik mədəniyyətimiz var, sadəcə toksik deməyəcəyik" deməkdir.

### İnsan qarşılıqlı əlaqəsi

Burda əməkdaşlar və maraqlı tərəflər haqqında istənilən işarəni axtarırsan. Bu, "onlar bunu elanda niyə yazmayıblar?" düşüncəsinə bənzəyir, amma bir az daha yumşaq. Bu mövzu adətən vəzifə təsvirində yer almır, müsahibədə müzakirə olunur.

### Miqyas və nailiyyətlər

Böyük mühitə, geniş müştəri bazasına, ciddi gəlir axınına, yüksək yükə malik təşkilatlar bunu elanlarında tez-tez vurğulayır. Mənim buna münasibətim ikili: miqyas sənin güclü tərəfindirsə, bu faydalı işarədir. Əgər belə öyünmə səni itələyirsə və "insanlara kömək" hissinə yaxın iş, ya da kimə xidmət edəcəyinin aydın olması sənin üçün daha vacibdirsə, bunu da nəzərə al. SRE-nin əsasında başqalarına xidmət ideyası dayanır — bu dəyəri paylaşırsansa, elanda təşkilatın bunu tanıdığına dair işarə axtar.

### Çeşidlilik və inklüzivlik

Kitab boyu dəfələrlə vurğulamışam: çeşidlilik və inklüzivlik sağlam SRE sistemi üçün həlledicidir. Şəxsən işəgötürənin bunu tanıdığına və söylədiyinə real vəsait qoyduğuna dair işarə görmək istəyirəm. İnsan qarşılıqlı əlaqəsi kimi, bu da elanda tez-tez yer almır. Formal görünmək üçün deyil, həqiqətən bunu deyən elanlara üstünlük verirəm.

Bunlardan başqa nəzərə alınası kontekstual detallar da var — çoxu təkcə SRE-yə xas deyil. Şirkət haqqında nə eşitmisən (uğursansa, konkret SRE işi haqqında)? Vəzifə adı dəyişikliyi izlərini görürsənmi (keçən həftə eyni təsvirlə fərqli adla yerləşdirilib)? Elan nə vaxtdan qoyulub? Bu şirkətin SR-mühəndisləri geniş peşəkar cəmiyyətdə (məs. SREcon konfransında) görünübmü?

Bu suallar cavabına görə vəzifəyə müraciət etmək lehinə ya əleyhinə çəki əlavə edə bilər. İndi birbaşa müsahibəyə keçək.

> **Şirkət keyfiyyətli açıq postmortem-lər nəşr edirmi?**
>
> Bu sualı ayrıca vurğulayıram, çünki dinamit kimidir — güclü, amma qeyri-sabit, ehtiyatlı olmaq lazımdır. Elanı qiymətləndirmənin bir yolu — şirkətin açıq şəkildə nəşr etdiyi insident postmortem-lərini axtarmaqdır. Yaxşı postmortem-dən çıxara biləcəyin məlumat həcmi böyükdür (pis postmortem-lərdən çıxan mənfi nəticələr də az deyil). Tez-tez texnologiya stack-i və sistem arxitekturası, o cümlədən fault tolerance-in necə dizayn olunduğu barədə birbaşa detal tapılır. Dolayı yolla şirkətin problem tapma/həll etmə prosesi, daxili kommunikasiyası haqqında da fikir formalaşır.
>
> Amma bu məlumat qeyri-sabitdir — ehtiyatla istifadə et, çünki şirkət hələ insidentin təsirindən çıxmamış ola bilər. Müsahibədə "yaxşı hazırlaşdığımı göstərmək" niyyəti ilə bu mövzunu qaldırsan, şərhin səhv anlaşıla bilər. Ən mühafizəkar məsləhət: "vəziyyəti anlamaq üçün postmortem-lərini mütləq oxu, amma müsahibədə bu mövzunu qaldırma."

> **Hər maddəni işarələmək məcburi deyil**
>
> Kitabın rəyçilərindən Jess Males-in məsləhəti: bütün bəndləri "tam" qarşılamalı olduğunu düşünmə. Həddindən artıq konkret və uzun "tələb olunan" texnologiya siyahıları çox vaxt insanları vəzifəyə müraciət etməkdən vaz keçirir. Vəzifə təsviri yazma praktikasında hələ təkmilləşdiriləcək çox şey var, amma müsahibəçilərdən soruşa bilərik: bu uzun "tələblər" siyahısı doğrudanmı zəruridir?

## Müsahibəyə hazırlıq

Hazırlıq detalları vəzifədən və təşkilatdan çox asılıdır. Software engineer vəzifəsi ilə eyni tələblərə malik SRE müsahibəsinə hazırlaşırsansa, kod yazma bacarıqlarını təzələmək və informatika bilgilərini yeniləmək lazım ola bilər. Relizlərə güclü meyl edən SRE vəzifəsi üçünsə test mühiti və CI/CD alətləri ilə vaxt keçirmək faydalı olar.

Bəs vəzifə spesifikasından asılı olmayaraq universal tövsiyə varmı? Bəli — hər SRE müsahibəsində hazır olmalı olduğun dörd mövzu var. Bunları aşağıda ətraflandırıram.

### Non-Abstract Large System Design (NALSD)

Miqyaslanma ilə bir şəkildə bağlı SRE vəzifələrinə (bunların çoxu belədir) müraciət edirsənsə, Google-un NALSD adlandırdığı sahəni öyrənmək ən yaxşı seçimdir. Google-a müraciət etməsən belə bu, bacarıqlarını genişləndirir və düşüncəni doğru istiqamətə yönəldir.

> Məsləhət 1: böyük ağ lövhə tap və onunla işləmək üçün vaxt ayır. Praktika üçün faydalı olmaqdan başqa, NALSD müsahibəsində demək olar həmişə — şəxsən ya virtual — lövhə qarşısında dayanacaqsan.
>
> Məsləhət 2: NALSD müsahibəsində heç vaxt tələsmə — dizayn ediləcək sistemin parametrlərini düzgün anladığını dəqiqləşdir, yoxla, təkrar yoxla.

**Resurslar:** *Site Reliability Workbook* kitabında bu mövzuya ayrılmış əla fəsil var. SREcon konfransında da bu mövzuda yaxşı çıxışlar olub (YouTube-da pulsuz mövcuddur). Google-un *SRE Classroom* açıq materialları da tövsiyə olunur. Ödənişli olsa da NALSD-ə yaxşı giriş verən müsahibə hazırlığı kursları da var (məs. *Grokking Modern System Design Interview* və Alex Xu-nun *System Design Interview* kitabı).

### Monitorinq/Observability

Bu mövzunun SR-mühəndisi üçün əhəmiyyəti kitab boyu dəfələrlə vurğulanıb — müsahibəyə getməzdən əvvəl bunu mükəmməl bilməlisən. Siyahıya mühəndislər üçün statistikanı da əlavə edirəm, çünki bu kontekstdə ən çox məhz o keçir.

**Resurslar:** Mike Julian-ın *Practical Monitoring* və Charity Majors-ın *Observability Engineering* kitabları başlanğıc üçün yaxşıdır. SLI/SLO müzakirə edəcəksənsə, Alex Hidalgo-nun *Implementing Service Level Objectives* kitabına bax. Monitorama konfransının YouTube-dakı çıxışları da praktiki tövsiyələr üçün faydalıdır.

Bir-iki açıq mənbəli monitorinq alətini (Grafana, Prometheus) və/yaxud kommersiya təkliflərini sınamaq da faydalıdır — ideal halda production mühitini imitasiya edəcək konfiqurasiya qur. Bunu edərkən müxtəlif alətlərin bir-birinə oxşar və fərqli tərəflərinə diqqət yetir. Statistika bilgilərini təzələyirsənsə, hesablamaya yönəlməyən onlayn kurslara bax; Heinrich Hartmann-ın mühəndislər üçün statistika seminarları da tövsiyə olunur.

### Praktiki əsaslı informatika

Burda geniş çərçivə nəzərdə tutulur: informatika, kompüter arxitekturası/əməliyyat sistemləri, paylanmış hesablama, şəbəkə əsasları və kod yazma. "Praktiki əsaslı" dedikdə real dünyada tətbiqi nəzərdə tuturam — məsələn, kompüter arxitekturasını öyrənərkən Linux-un və Linux nüvəsinin əməliyyat sistemi səviyyəsində necə işlədiyini araşdırmaq çox faydalıdır. Şəbəkədə OSI modeli kimi mövzuları öyrənmək faydalıdır, amma real şəbəkə protokollarını ev laboratoriyasında analiz edib praktika etmək daha yaxşıdır.

### Problem həlli/debug

İş prosesində şəbəkədə problem həll edə biləcəyini və bunu əvvəllər etdiyini göstərməyə hazırlaş. Müsahibədə sənə bir ssenari verib reaksiyanı modelləşdirməyini istəmə ehtimalı yüksəkdir. İnternetdə bu bacarığı inkişaf etdirmək üçün kifayət qədər resurs var — bunlara nəzər salmaq faydalı olar. Böyük ehtimalla bu bacarıqları artıq işdə və ya gündəlik həyatda inkişaf etdirmisən (texnologiya dünyasında olub bu təcrübədən qaçmaq çətindir).

## Müsahibədə nə soruşmalı

Təbrik! Ilkin seçim mərhələsindən keçdin, əsas müsahibə mərhələsinə çatdın. Hazırlığın sayəsində bütün suallara rahat cavab verdin, indi növbə sənə keçdi. Bu, vəzifənin və təşkilatın sənə uyğun olub-olmadığını öyrənmək fürsətidir. Nə soruşacaqsan?

> **Çətin anlara hazır ol**
>
> Müsahibənin ortasında müraciət etdiyini düşündüyün vəzifənin əslində fərqli olduğunu görə bilərsən. Elan reallıqla uyğun gəlməyə bilər — səbəbləri müxtəlifdir. Müsahibədə küləkdə dalğalanan qırmızı bayraq görsən, böyük ehtimalla haqlısan. "Bir tərəkəmə görmüsənsə, demək o tək deyil" prinsipi burda da işləyir. Anladığın anda nə edəcəyin sənin qərarındır, amma ehtiyatlı və sərinqanlı qalmağı tövsiyə edirəm.

Aşağıda söhbət mövzuları üçün bir neçə təklif var. Qeyd: bir müsahibə seansının on-on beş dəqiqəsində bunların hamısını soruşmaq mümkün deyil. Strateji düşün — səni ən çox maraqlandıran mövzularla bağlı sualları seç və/yaxud onları müsahibənin fərqli mərhələlərinə paylaşdır.

### Monitorinq sisteminizdən danış

Kitabda əvvəllər bu sualı öz müsahibələrimdə necə verdiyimi və hansı təəccüblü cavabları aldığımı paylaşmışdım. Hələ də düşünürəm ki, bu sual observability-nin rolu, təşkilat strukturu/əməkdaşlıq/sahiblik, data əsaslı qərar qəbulu, monitorinqin/etibarlılığın şirkət prosesinə nə qədər erkən inteqrasiya olunduğu barədə çox müxtəlif məlumat verir. Monitorinq haqqında soruşarkən həm deyilənlərə, həm də deyilməyənlərə diqqət et.

Alt-suallar:
- Təşkilatda monitorinqlə kim məşğul olur?
- Neçə monitorinq sistemi aktiv istifadə olunur?
- Bu sistemlərə hansı tətbiq/xidmətlər/komandalar data göndərir, kim monitorinq datasına baxa bilir?
- Yeni tətbiq/xidməti monitorinq sisteminə əlavə etmək nə qədər asandır?
- Bu sistemin datasına əsasən hansı qərarlar qəbul olunur?
- Bu sistemdə alert generasiya olunurmu? (Necə işləyir, insanları əsəbləşdirmirmi, istifadəyə yararlıdırmı?)
- Cari sistemdə nə səni sevindirir, nə narahat edir?

### Postmortem prosesinizdən danış

Burda anlamaq istədiyin — şirkət səhvlərindən nə dərəcədə məqsədyönlü və effektiv öyrənir. Bu mövzu adətən komanda və təşkilat səviyyəsindəki dinamikanı (bəzən bürokratiyanı) tam təsvir edir. Yuxarıda deyildiyi kimi, bu, etibarlılığa can atmanın əsas göstəricisi ola bilər — beləliklə şirkətdə etibarlılığın nə dərəcədə prioritet olduğu barədə fikir formalaşdırırsan.

Alt-suallar:
- Postmortem edirsinizmi (necə keçir)?
- Məqsədi nədir?
- Kim iştirak edir?
- Sıradançıxmaları necə sənədləşdirirsiniz? Bu sənədlərə sonradan baxırsınızmı?
- Yaxın vaxtlarda olmuş bir sıradançıxma haqqında (istədiyin detal səviyyəsində) danışa bilərsənmi?
- Sıradançıxma zamanı koordinasiya necə olur? (Bunun üçün alət varmı, hər kəs bridge/chat açırmı? Bütün insidentlər üçün ortaq chat varmı?)
- Son N ayda ən çox rast gəlinən sıradançıxma sinifləri haqqında fikriniz varmı? (Konfiqurasiya xətaları, kaskad sıradançıxmalar, resurs yetərsizliyi, kod xətaları?)

### Növbətçilik (on-call) necə işləyir

Bu mövzu digərlərindən az vacib görünə bilər, amma iş-həyat balansı və işə ümumi münasibətin üzərinə güclü təsir göstərdiyi üçün əlavə etməyə dəyər. Həm də şirkətin işçilərinə ümumi münasibətini göstərir.

Alt-suallar:
- Növbətçilik bu vəzifənin bir hissəsidirmi, iş qrafikinə necə əks olunur? Növbətçilik necə kompensasiya edilir? İnsident sonrası istirahət günü verilirmi?
- Növbətçilik rotasiyasında kim iştirak edir? (Yalnız SRE-lər? Developer-lər də? Menecerlər?)
- Ən son sənin (və digər növbətçilərin) çağırıldığı vaxt nə vaxt idi? Heç çağırılmayıb? Bu müddət günlərlə, həftələrlə, aylarla, yoxsa dəqiqələrlə ölçülür?
- İş saatları ilə iş saatı xaricində çağırılma tezliyi eyni ölçüdədirmi?

### SR-mühəndisləriniz hansı problemi/problemləri həll etməlidir (indi həll edir)?

Bu suala yaxşı, aydın cavab eşitmək istərdim, amma çox ümid etmə. Təcrübəmə görə insanlar buna nadir hallarda birbaşa cavab verir. Soruşulduğunda problemi az adam formalaşdıra bilir. Demək olar həmişə daha dərinə getmək lazımdır: "Bunun vacib olduğuna tam qatılıram, amma cavabınızdan konkret hansı problemi həll etməyə çalışdığınızı tam anlamadım. SR-mühəndisinin həll etməyə çalışdığı problem(lər) hansıdır?"

Ola bilər bu suala adekvat cavabları olmasın — bu, özlüyündə vəzifə haqqında dəyərli məlumatdır. Aşağıdakı "burda sualları mən verirəm" qeydinə diqqət et. Belə olarsa, "Son 6-12 ayda SR-mühəndisləriniz hansı qələbələr qazandı?" tipli suala qayıda bilərsən. Buna belə cavab tapa bilmirsənsə, ya da o dövr üçün heç bir uğurdan danışa bilmirlərsə, bu vəzifə sənə uyğun olmaya bilər.

### SR-mühəndisləri şirkətin əsas repository-lərində kod yoxlaya (review) bilirmi?

Bununla SR-mühəndislərinə tətbiq/xidmət etibarlılığına birbaşa təsir etmə icazəsinin nə dərəcədə verildiyini öyrənirsən. Həmçinin SR-mühəndisləri ilə developer/xidmət sahibləri arasındakı etimad və əməkdaşlıq səviyyəsi haqqında fikir formalaşdırırsan. Bu vəzifədə səndən gözlənilən kod yazma bacarığı və SR-mühəndisləri ilə developer-lər arasındakı vəzifə bölgüsü haqqında da öyrənirsən.

> **Burda sualları mən verirəm**
>
> Alacağın cavablara hazır olmaq üçün xəbərdar edim. Bəzən eşidə bilərsən: "Bu vəzifəyə götürəcəyimiz insanın sənin verdiyin suallara özü cavab tapmasını istəyirik." Bu, onların SRE səylərinin yetkinlik səviyyəsi və sənin bu prosesdə oynayacağın rol haqqında aydın fikir verir.
>
> Bunu etmək istəyirsənsə (və ya artıq formalaşmış komandaya qoşulmaq istəyirsənsə), sual istiqamətini dəyişib bu ideyanın bu kontekstdə nə qədər real olduğunu anlamağa yönəl. Ən azı bunları dəqiqləşdir:
> - onları bu vəziyyətə gətirən tarixçə,
> - SR-mühəndisliyinə olan dəstəyin həcmi: təşkilati, institusional, kadr və maliyyə baxımından,
> - bu istiqamətdə əvvəlki cəhdlər haqqında məlumat (SRE praktikalarını əvvəllər tətbiq etməyə çalışıblarmı?),
> - vaxt gözləntiləri — nə vaxta qədər nə edilməli hesab olunur,
> - uğur necə ölçüləcək,
> - bu işin təşkilat strukturunda tutacağı yer. Tez-tez feature işi ilə etibarlılıq işi prioritetlərinin nisbətini müzakirə etmək lazım gəlir. SRE işi görən insanlarla feature üzərində işləyən insanlar strukturda bir-birindən çox uzaqdırsa (məsələn, sözü keçən adama çatmaq üçün iyerarxiyada üç səviyyə qalxmalısansa), bu müzakirə çox yorucu prosesə çevrilə bilər. Bunu etmək sənə xoş gələcəkmi?
>
> Yuxarıdakıların hamısı əslində "bu vəzifəyə götürəcəyimiz insan bunu özü tapsın" cavabının ən təhlükəli hissəsi deyil.
>
> Hiylə burdadır: sonra səndən soruşa bilərlər — "Bəs sən bu suallara özün necə cavab verərdin?" Nəticədə öz çətin suallarına özün cavab verməli olursan. Buna hazır ol. Heç olmasa təxmini cavablar hazırla ki, deyə biləsən: "Sizin konkret mühitiniz haqqında daha çox bilmədən dəqiq cavab verə bilmərəm, amma bir çox mühitdə (təxminən) X edilir və mən bundan başlardım..."

## Qələbə!

Təbrik edirəm, işi aldın! Ya da:

Uf, səni götürmədilər!

İkincisi baş veribsə, (incikliyin keçməsindən sonra) SRE mentalitetini işə salıb bunu sistemin gözləntiləri qarşılamadığı adi bir sıradançıxma kimi qəbul etməyi tövsiyə edirəm. Nə qədər gülünc səslənsə də, məhz bu konkret iş üçün olan işə qəbul prosesinin öz postmortem-ini yazmaq pis fikir olmazdı. Bu, yaxşı təcrübə olacaq, həm də olub-keçəni obyektiv qiymətləndirib hansı dərsin çıxarıla biləcəyini görməyə kömək edəcək.

> Nümunə istəyirsənsə, Michael Kehoe-nun SREcon-dakı "A Postmortem of SRE Interviewing" çıxışına bax. Orda işə qəbulla məşğul olanlar üçün də dəyərli məsləhətlər var, sənə SRE prosesini anlamaqda kömək edə bilər.

Uğurlar. Sənə inanıram!
