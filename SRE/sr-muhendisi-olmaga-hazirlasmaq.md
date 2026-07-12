# SR-mühəndisi olmağa necə hazırlaşmaq olar?

Gəlin açıq danışaq: SRE-yə gedən tək bir "düzgün" yol yoxdur. Bu yazını "Deməli, SR-mühəndisi olmaq istəyirsən?" tərzli bir sual ilə başlamaq istəmirəm, çünki bu, yanlış təsəvvür yaradar — sanki qət olunmuş bir checklist var, onu bitirən "SRE" olur. Yox belə deyil. Bu yazıda bir neçə potensial "ön şərti" müzakirə edəcəyik (dırnaq içində yazıram, çünki bunlar məcburi deyil, sadəcə faydalı istiqamətlərdir). Bunları bilmək SRE olmağın "imtahanı" deyil — bunları bilməsən "keçə bilmirsən" demək deyil. Sadəcə SRE sahəsində öz yolunu tapmağa kömək edən elementlərdir.

> Bu fəsil sənin kim olduğunu yox, nəyi bilməli və necə hazırlaşmalı olduğunu göstərir.

Əgər "Mən əslində SRE xarakterinəm?" sualı səni maraqlandırırsa — maraqlısan? Problemləri hara aparıb-çıxarsa da həll etməkdən zövq alırsan? Servisin necə işlədiyi sənin üçün maraqlıdırmı? — bu, ayrı bir söhbətdir. Burda isə praktiki tərəfə baxırıq: nə bilməlisən, özünü necə hazırlaya bilərsən.

Bir analogiya ilə başlayaq. "Fear of Cooking" kitabının müəllifi Bob Şer deyirdi ki, o əslində "bişirmir" — o, yeməyin bişməsi üçün düzgün şərait yaradır və saxlayır. Mən də bu mövzuya belə yanaşıram: sənə SRE olmaq üçün lazım olan şəraiti yaratmaq barədə əlimdəki ən yaxşı məlumatı verə bilərəm, amma "yemək" tam istədiyin kimi çıxacaq deyə söz verə bilmərəm. Bu qeyd-şərtlə mövzuya keçək.

## Kod yazmağı bilmək lazımdırmı?

Bunu bir haşiyədə gizlətmək əvəzinə, birbaşa ən çox verilən sualla başlayaq: "SR-mühəndisi olmaq üçün kod yazmağı bilmək lazımdırmı?"

Qısa cavab: bəli, lazımdır.

Uzun illər bu cavabı qəbul etməmişəm. Google-un məşhur siyasətini bilsəm belə (SRE vəzifəsinə yalnız software engineer (SWE) səviyyəsində kod yaza bilənləri götürürlər), bu fikirdən yayınırdım. Səbəb sadə idi — özümü heç vaxt "developer" saymamışam, baxmayaraq ki, operasiya sahəsində kifayət qədər kod yazmışam. İnanmaq istəyirdim ki, SRE-yə gedən elə bir yol var ki, orada yalnız başqalarının yaratdığı komponentləri bir araya gətirmək bacarığı (assembly skill) kod yazma bacarığını tam əvəz edə bilər.

İndi gələcəkdən (texniki olaraq öz bugünümdən, yəni sənin keçmişindən) xəbər gətirirəm: artıq tam əminəm ki, kod yaza bilmək SRE sahəsi üçün **məcburi şərtdir**.

Niyə? Çünki bir şeyin necə qurulduğunu bilmirsənsə, onun necə sıradan çıxa biləcəyini anlamaq imkanın da məhduddur. SRE abbreviaturasındakı "reliability" (etibarlılıq) sözü demək olar həmişə **proqram sistemlərinin** etibarlılığına aiddir. Hara getdiyimi artıq anlayırsan.

İdeal halda kod yazmağı öyrənmək bunları da özündə ehtiva edir:
- **Effektivlik** — alqoritm, yaddaş, performans, resurs istifadəsi baxımından
- **Xəta idarəetməsi** (error handling)
- **Abstraksiya**
- **Konfiqurasiya**
- **Arxitektura**
- **Dekompozisiya**
- **İnteqrasiya və asılılıqlar** (dependencies)
- **Dokumentasiya**
- Əmrlərin ifadə gözəlliyi

Bunların hamısını öyrənməli və bunlarla bağlı problemləri həll edə bilməlisən ki, SRE sahəsində özünü rahat hiss edəsən.

Kod yazmağı öyrənmək eyni zamanda **debug etmək və problemi aşkarlamaq** bacarığını da inkişaf etdirir. Bunu illüstrasiya edən şəxsi bir hekayəm var:

> **Çoxdan öyrənilmiş dərs**
>
> İlk informatika kursumda idim. Sabaha təhvil verməli olduğum tapşırıqda bir bug-ı saatlarla düzəltməyə çalışırdım. Kodu işə salır, bug-ı reproduksiya edir, sonra source code-da dəyişiklik edirdim. İşə sal, reproduksiya et, düzəlt cəhdi et — təkrar-təkrar. Heç nə kömək etmirdi.
>
> Bu, çox uzun çəkdi (kəsin bir saatdan çox).
>
> Nəhayət hündürdən bir "aaah!" ilə başa düşdüm ki, mən proqramı işə salarkən istifadə olunan source fayl əvəzinə **tamamilə başqa bir fayla** dəyişiklik edirmişəm. Son bir saatda etdiyim bütün dəyişikliklərin işlətdiyim proqramla heç bir əlaqəsi yox imiş.
>
> O gün bir neçə vacib dərs aldım. Bu dərslərin sənin karyerandə nə qədər tez-tez faydalı olacağına təəccüblənəcəksən. Bəlkə də yox.

Proqramlaşdırma dünyasının bir çox aləti və data formatı artıq SR-mühəndisinin gündəlik həyatının ayrılmaz hissəsidir. Ən sadə nümunə — version control (versiya idarəetmə sistemi). Amma JSON, YAML kimi data formatlarını da artıq "aydındır" kimi qəbul edirik.

Bu, kifayət qədər inandırıcı bir arqumentin yalnız bir hissəsidir: SR-mühəndisi olmaq üçün kod yazmağı bilmək lazımdır.

İndi isə narahatlıq dolu növbəti sual gəlir: "Nə qədər yaxşı kod yazmalıyam? Skript yazmaq kifayətdirmi, yoxsa OS-level kod yazmalıyam? Software engineer olmalıyammı?"

Bu suallara cavab vermək bir az daha çətindir və vəziyyətdən çox asılıdır. İki fərqli izah var.

**Birinci izah — şəxsi:** Yuxarıdakı siyahı tam deyil, sadə skript yazmaqda da tətbiq oluna bilər (mən özüm möhtəşəm shell skriptlər görmüşəm). Amma effektivlik, abstraksiya, arxitektura, dekompozisiya kimi mühəndislik bilikləri sadə skriptlərdə adətən tələb olunmur və prioritet deyil. Kod yazma təcrübən yoxdursa və bu xüsusiyyətlərlə mübarizə aparmalı olursansa, bu, SRE olaraq sistemlərlə işləmə səviyyəni məhdudlaşdırır.

**İkinci izah — təşkilati:** Əgər təşkilatın SRE komandasının kod səviyyəsində dəyişiklik təklif edə və ya edə bilməsini gözləyirsə — dostum, kod yazmağı bilməlisən. Təşkilatın vahidliyinin göstəricilərindən biri — SR-mühəndisinin əsas source control repository-də kod yazmaq/commit etmək səviyyəsində icazəyə malik olmasıdır. Kodla işləməyi bacarmasan, bu icazəni almayacaqsan (və bəlkə də alınmamalısan da).

Nəticə: kod yazma təcrübən sənə və ya təşkilatına hansı səviyyəli SRE əlçatan olduğunu müəyyən edən mühüm amil ola bilər.

## Kompüter elmləri diplomu lazımdırmı?

Qısa cavab: məcburi deyil, amma diplomun yoxdursa, bəzi işəgötürənlər praktiki bilik və bacarıqlarının diplomu "əvəz edə biləcək" səviyyədə olmasını gözləyəcək.

Misal üçün, SR-mühəndisi müsahibəsində sənə **Big O notation** haqqında sual verilsə, heç təəccüblənmərəm. Onlar aslında bunu bilmək istəyirlər: çoxlu data ilə işləyərkən bir prosesin nə qədər effektiv ola biləcəyini anlaya bilirsənmi? Proses ağlabatan vaxtda bitəcək, yoxsa kainatın istilik ölümünə qədər davam edəcək?

> Əgər kod parçası data setinin hamısı üzərindən dövri olaraq bir və ya bir neçə dəfə keçməlidirsə (O(n) və ya daha çox), böyük data həcmi ilə qarşılaşanda işləməyəcək. SR-mühəndisi bunu ən azı miqyaslanma məhdudiyyəti kimi qeyd edə bilməli, ideal halda isə daha effektiv bir yol tapmalıdır.

Real işində kimsə sənə "Big O nədir?" deyə yaxınlaşacaqmı? Ehtimal ki, işin heç vaxt bu qədər "maraqlı" olmayacaq. Amma qulluq etdiyin servis mövcud implementasiya səbəbindən overload olmağa başlayanda, bu ssenari birdən-birə real olacaq və nə edəcəyini anlamalı olacaqsan.

Bilməli olduğun kompüter elmləri anlayışlarının siyahısı yuxarıdakı "Kod yazmağı bilmək lazımdırmı" bölməsindəki siyahı ilə demək olar eynidir. Beləliklə, bu mövzuları kod yazma təcrübəndən, universitetdəki informatika dərslərindən, ya da başqa bir yoldan öyrənəcəksən. Seçim sənindir.

## Əsaslar

Kod yazmaq bölməsində əsas mövzuların aktual (amma tam olmayan) siyahısını verdim. Bunu təkrarlamayacağam — sadəcə deyim ki, bu anlayışları kod təcrübən vasitəsilə və ya informatika kursunda öyrənməmisənsə, bu bölmə elə bu səbəbdən yazılıb: hələ mənimsəmədiyin şeylər.

### Tək/əsas sistemlər (və onların sıradan çıxma vəziyyətləri)

Əsasları anlamadan heç nə öyrənmək olmaz. SR-mühəndisləri əsas sistemləri və onların necə işlədiyini bilməlidir. Operating system anlayışları, şəbəkə qarşılıqlı əlaqəsi, icazələr (permissions) və protokollar, bunların necə sıradan çıxdığı — bunlar olmadan daha böyük, miqyaslanan sistemləri qura bilməzsən. Sistem administratorlarına da işləmək üçün eyni əsaslar lazımdır.

### Paylanmış sistemlər (və onların sıradan çıxma vəziyyətləri)

Kompüterlərin kömürlə işlədiyi qədim dövrlərdə bir düzbucaqlıya işarə edib "budur, mənim sistemim" demək mümkün idi. Nostalgiya oyatmaq istəmirəm, sadəcə vurğulamaq istəyirəm ki, "paylanmamış" (non-distributed) sistemlərlə işləmə dövrü, nadir istisnalar xaric, bitib. Onların yerini artan miqyas problemlərinin həlli kimi paylanmış sistemlər tutub — istər belə adlandırılsınlar, istərsə yox. Bu gün SR-mühəndisi olaraq mikroservis arxitekturasına və ya coğrafi olaraq dağınıq sistemə xidmət etmə ehtimalın kifayət qədər yüksəkdir. Primary/secondary komponentlərlə fault-tolerant sistem üzərində işləmə şansın da çox yüksəkdir.

Buna görə paylanmış sistemləri və onların sıradan çıxma yollarını öyrənməyə vaxt sərf etmək sənin xeyrinədir. Fault-tolerant primary/secondary sistem ideyasına qayıdaq, çünki bu nisbətən tanışdır və tez mürəkkəbləşir. Aktiv/passiv və ya primary/secondary konfiqurasiyalarında redundant komponentlərlə arxitektura necə qurulur, bunlarda hansı sıradan çıxmalar baş verə bilər — bunu bilməlisən.

Sonra active/active və ya çox-primary sistemlər gəlir. Bu, yazma (write) əməliyyatlarının harada baş verəcəyi (fault tolerance, performans və ya yük bölgüsü üçün) və bununla bağlı qərarların komponentlər arasında necə koordinasiya oluna biləcəyi barədə suallara aparır.

Və artıq gecikmə (latency), konsensus alqoritmləri, paylanmış vaxt ölçümü (distributed timing) və data consistency dünyasına xoş gəldin.

Davam edə bilərəm, sən də (bacarmalısan). Hər addımda yaradılan sistemlərdə müəyyən xarakterli sıradan çıxmalar olacaq, sən bunları aşkarlamalı, debug edib düzəltməli, sistemi yenidən dizayn edib yaxşılaşdırmalısan. Bu misalda yalnız bir aspekti (yazma) götürüb bir neçə səviyyə mürəkkəbləşdirdim. SR-mühəndisi olaraq başqa sistem xarakteristikalarını seçib paylanmış sistemlər kontekstində sıradan çıxma haqqında oxşar şəkildə düşünə bilməlisən.

### Statistika və data vizuallaşdırma

Təəssüf ki, məktəbdə beynim tər-təzə və neyroplastik olanda statistika öyrənməmişəm. Kitab boyu bir neçə yerdə iddia edirəm ki, monitorinq/observability təşkilatda SR-mühəndisinin əsas fəaliyyəti/qayğısıdır. Öz təcrübəmdən bilirəm ki, bu sahədə səthi əməliyyatlardan çətin olan hər şey üçün əminlik dolu statistika bacarıqları lazımdır. Aktuari olmalısan demirəm, amma percentile, standart statistik aqreqasiya əməliyyatları, trend analizi kimi terminləri bilməlisən. Hələ də statistikada zəif olduğuma təəssüflənirəm.

Mühəndislər və yeni başlayanlar üçün statistika üzrə bir çox dərslik var. Mövzunu sənə ən effektiv şəkildə açan kitabı tapmağı tövsiyə edərdim. Bundan əlavə, Heinrich Hartmann-ın SRE community-ə ünvanlanmış mühazirə və məqalələrinə baxmağı da tövsiyə edirəm.

Statistika data-nı anlamağa və onunla işləməyə kömək edir, amma bir də əlaqəli bacarıq var: data-nı effektiv vizuallaşdırma qabiliyyəti. Bu, SR-mühəndisinin gündəlik işini effektiv edən bacarıqlar arasında az adı çəkilən biridir. Amma vacibdir, çünki etibarlılıq əksər hallarda obyektiv data haqqında məzmunlu danışıq apara bilmək bacarığına söykənir. Bu danışıqlara data-nın necə təqdim olunduğu (yaxşı və ya pis) böyük təsir göstərir. Data-da və data haqqında bir hekayə var (bu barədə bir az sonra) — onu danışmağı öyrən.

Data vizuallaşdırma mövzusunda bir neçə həqiqətən yaxşı iş nəşr olunub. Başlanğıc üçün Edward Tufte-nin yazıb nəşr etdirdiyi kitablar əla seçimdir.

> Kiçik bir xəbərdarlıq: keyfiyyətli data təqdimatına diqqət etməyə başlayınca və bununla bağlı problemləri görməyə başlayınca, bu, birdən-birə mükəmməl musiqi eşitmə qabiliyyəti qazanmağa bənzəyir. Getdiyin hər yerdə köklənməmiş pianolar eşidəcəksən. Bu, reallığı qavrama baxımından inanılmaz dəyərli bir keyfiyyətdir, amma həm də deməkdir ki, iclaslarda "Xeyr, bura xətti qrafik uyğun deyil, bu data setləri arasında əlaqə yoxdur, bu qrafik yanıltıcıdır" deyən sən olacaqsan, digərləri isə gözlərini çevirəcək. Bağışla.

### Storytelling (hekayə danışma)

Bunu əsaslar siyahısına əlavə etmək qəribə görünə bilər, amma bir cümlə ilə səni inandıra biləcəyimə əminəm ki, hekayə danışma sənətinə diqqət yetirməlisən:

> İnsident təhlili / postmortem, əslində, bir gün yaxşı danışmalı olacağın bir hekayədir.

Təsir etdimi? Effekti gücləndirmək üçün səni yaxın gələcəyə aparıb deyə bilərəm: "Növbəti dəfə bir kəsilmənin (outage) mərkəzində olub kollektiv və ya rəhbərinə nə baş verdiyini izah etməli olanda — bu, bir hekayə olacaq." Ya da yuxarıda müzakirə etdiyimiz data vizuallaşdırma mövzusunu və hekayəni mövcud data ilə qurub əlaqələndirmə zərurətini xatırlaya bilərəm.

İnsanlar məlumatı hekayələr vasitəsilə almağa öyrəşiblər. Tufte-nin kitabları səni inandıracaq ki, hekayələr, etibarlılıqla bağlı olanlar kimi mürəkkəb, çoxölçülü informasiya dəstlərini ötürmək, qəbul etmək və anlamaq üçün ən yaxşı yollardan biridir. Həm daha yaxşı hekayəçi, həm də daha yaxşı dinləyici olmaq sənin xeyrinədir.

### Yaxşı insan ol

Bilirəm — "yaxşı insan ol" bölməsi əlavə etmək gözlənilməzdir, amma məni dinlə. SR-mühəndisləri daim və aktiv şəkildə öyrənməli, özünü inkişaf etdirməli və bacardıqca konfidensiallıq, etika, inklüzivlik və bərabərlik məsələlərində ən yaxşısı olmağa çalışmalıdır.

Səbəbi budur.

Bizə planetin ən böyük və vacib sistemlərini idarə etmək etibar olunur. Komiks klişesi — "böyük gücə böyük məsuliyyət yaraşır" — hələ də doğrudur.

Tez-tez məhz biz data emalı, əhatə/təmsil, hesabatlılıq kimi məsələlərdə qeyri-qəsdi çatışmazlıqları görə bilən şəxslərik. Bu sahədə problemləri aşkarlamağa və həll etməyə hazır olmaq üçün özümüzü daim təhsilləndirməliyik. Bəzi böyük təşkilatlarda privacy engineer-lar olur; sizdə yoxdursa, bəlkə uyğun təcrübə qazanmaq üçün nə etmək lazım olduğunu düşünmək dəyər.

İstifadəçilərimiz üçün əlçatmaz olan sistem etibarlı deyil. Konfidensiallığı qorumayan sistem etibarlı deyil. Yalnız bir demoqrafik qrupu təmsil edən, repressiv seçim olmayan data-ya söykənərək yanlış qərarlar verən sistem etibarlı deyil. İstifadəçiyə yanlış əvəzlik və ya ad ilə müraciət edən sistem etibarlı deyil. Davam edə bilərəm (və etməlisən), amma fikri anladın.

SR-mühəndisləri sistemlər kateqoriyasında düşünür. Bunun bizə sistemli zülmü görməyə imkan verməsi məntiqlidir. Bundan sonra nə edəcəyini sənə buraxıram, əziz oxucu.

## Bonus bölmə

Bu bölmədə, SRE sahəsinə başlamağına mane olmayacaq, amma böyük ehtimalla bir gün qarşılaşacağın mövzuları qeyd etmək istəyirəm.

### Non-Abstract Large System Design (NALSD)

NALSD — Google-un ortaya atdığı, böyük sistemlərin dizaynı və əsaslandırılması prosesini ifadə edən termin. Sistemlərlə işləmək istəyirsənsə və ya təşkilatına yüksək miqyaslana bilən sistemlər lazımdırsa, bu maddəni "Əsaslar" bölməsinə köçürməlisən. Miqyaslanma sənin üçün prioritet deyilsə, bu mövzunu yaxın gələcəkdə ətraflı öyrənməyə vaxt ayır, çünki, istəsən də istəməsən də, bu mövzu böyük ehtimalla səni özü tapacaq.

Bu mövzuda keyfiyyətli məlumat tapmaq çətin ola bilər. Site Reliability Workbook kitabının 12-ci fəslində bundan bəhs olunur. "So You Want to Get an SRE Job at Google?" hazırlıq kursundan bəzi müsahibələri yenidən nəzərdən keçirmək mənim üçün gözlənilmədən faydalı oldu. highscalability.com bloqu da böyük miqyaslı arxitekturaların düşünülmüş təsvirləri ilə çox faydalıdır. Bir arxitektura nümunəsi seçib "Bu komponent niyə buradadır?" və "<təsadüfi komponent> sıradan çıxsa/bərpa olunsa nə olar?" suallarına mümkün qədər ətraflı cavab verməyə vaxt sərf etməyi tövsiyə edirəm. Bu məşqi kiçik qrupda etmək maraqlı ola bilər.

### Resilience Engineering (dayanıqlılıq mühəndisliyi)

Bu mövzuya olan sevgimi kitab boyu etiraf edirəm, amma burda da qeyd etməyə dəyər. Resilience engineering — dayanıqlılığı əsasən qeyri-kompüter sahələrində (məsələn, aviasiya və tibb) uzun müddət araşdıran akademik bir intizamdır. Nisbətən yaxın vaxtlarda dayanıqlılıq dizaynı ideyaları SRE community-də böyük həvəs yaratdı, çünki bunun sistemlərimizdə də dayanıqlılığın əsas aspektlərini öyrənməyə kömək edə biləcəyini anladıq. Seeking SRE kitabının 28-ci fəslini oxumağı və SREcon konfransındakı bu mövzudakı çıxışların videolarına baxmağı tövsiyə edirəm. Bu mövzuya həsr olunmuş əla kitablar, məqalələr və tədris proqramları var. Resilience engineering səni dayanıqlılıq və etibarlılıq haqqında hər mənada düşündürəcək.

> Kiçik xəbərdarlıq: resilience engineering öyrənmək, sənəyə bu terminin çoxlarının "resilient" (dayanıqlı) sözünü əslində "fault-tolerant", "redundant" və ya ən yaxşı halda "robust" mənasında istifadə etdiyini eşidəndə əsəbləşməyə başlayacaqsan. John Allspaw-ın bir çıxışını dinlədikdən sonra dünyagörüşüm geri dönməz şəkildə dəyişdi: "Dayanıqlılıq sınmış maşın üçün ehtiyat təkər deyil — bu, öz maşınını tanımaq və onu elə idarə etmək bacarığıdır ki, yenə də təyinat nöqtəsinə çata biləsən."

### Chaos Engineering və performans idarəetməsi

Keçmiş yazılarımda chaos engineering-in (əsil variantının — "Principles of Chaos Engineering"də təsvir olunan elmi araşdırma, "production-u xarab etmək" yox) fanı olduğumu aydın etmişəm. Burda ilk dəfə onu performans idarəetməsi ilə birləşdirirəm və buna ciddi səbəb var. Bir müddət sonra daim reaksiya verməkdən yorulacaqsan. Sıradan çıxmalardan sistemlər haqqında əldə edilən məlumatı nə qədər dəyərli bilsən də (dəyərlidir), sistemlərin anlayışın sərhədində necə davranacağını bilməyin başqa yolu olduğunu düşünməyə başlayacaqsan. Məhz burda chaos engineering və performans idarəetməsi elementləri (məsələn, load testing) heç ağlına gəlməyən suallara cavab verə bilər. Eksperimentlərdə və öz gözləntilərində diqqətli olsan (sıradan çıxmalar yenə də olacaq), hər ikisi inanılmaz faydalı alət ola bilər.

### Machine Learning və Süni İntellekt

Bu, bəlkə də SRE sahəsi üçün ən əlaqəsiz görünən fikirdir, amma məni dinlə. Az kəslə bölüşdüyüm bir hekayə danışım. Seeking SRE kitabını hazırlayarkən SRE və ML haqqında yaza biləcək müəlliflər axtarırdım. Bu axtarış zamanı çox böyük bir sosial media şirkətində ML operasiyasından məsul bir şəxslə uzun söhbət etdim (adsız qalacaq). Söhbət zamanı bu şəxs bir neçə fərqli yolla mənə izah etdi ki, operasiya baxımından ML iş yükləri onlar üçün başqa iş yüklərindən heç fərqlənmir. Əlbəttə, model yaratma/öyrətmə, paylama və qiymətləndirməni fərqli aparmalı ola bilərsən (bəlkə fərqli həcmdə resurslarla), amma bundan başqa gündəlik iş eynidir.

Bir neçə il bu baxış mənim üçün norma oldu. Sonra bir gün bir neçə tanış, parlaq software architect ilə müzakirədə anladım ki, bu dünyagörüşü, bəlkə də diqqətə daha çox layiq olan əsas bir məqamı gözdən qaçırır. Bir çox ML vəziyyətində (ya da əksəriyyətində?) sistemin bir komponenti, sistemləri dizayn edərkən gözlədiyimiz kimi əvvəlcədən müəyyən olunmuş şəkildə işləmir. Əvəzinə, sistemin davranışı ona ehtimal əsaslı şəkildə gələn data-dan asılı olur. Keçmişdə komponentlər proqramladığımız məntiqə əsasən konkret davranırdı. ML dünyasında isə davranışını özlərinə gələn data-dan öyrənən modellərə əsasən dəyişən komponentlər var. Bu düşüncə dəyişikliyini "Software 2.0" kimi təsvir etdiklərini eşitmişəm — mən belə hündürperdə terminlər işlətməsəm də, bunun etibarlılığa tamam fərqli nöqteyi-nəzərdən baxmağımıza səbəb olacağını düşünürəm. Eyni zamanda, böyük dil modellərinə (LLM) əsaslanan süni intellekt sistemlərinin geniş yayılması ilə bu sahədə seysmik dəyişikliklərin tam ortasındayıq — bu sətirləri yazdığım anda belə.

Buna görə SR-mühəndisi kimi bu mövzu ilə qarşılaşanda dayana biləcəyin bir baza qurmaq üçün ML və AI-ın heç olmasa əsaslarını öyrənməyə vaxt ayırmağı tövsiyə edirəm. Bu istiqamətdə əla addım — "Reliable Machine Learning" kitabını oxumaq.

## Sona qədər

Sistem etibarlılığı dizaynının ən çox sevdiyim tərəflərindən biri budur: yeni vəziyyətlər və texnologiyalar ortaya çıxdıqca bizi etibarlılıq anlayışımızı araşdırmağa, formalaşdırmağa və təkmilləşdirməyə vadar edir. Bu fəsildə buna imkan verən ön şərtlər haqqında öz fikirlərimi paylaşdım, amma şübhəsiz sənin də əlavə fikirlərin var.

Kod yazmaq, sistem əsasları, statistika, hekayə danışma, yaxşı insan olmaq — bunların heç biri tək başına səni SR-mühəndisi etmir. Amma hamısı birlikdə həmin "şəraiti" — Bob Şer-in dediyi kimi — yaradır. Yemək tam istədiyin kimi çıxacaqmı, bunu vəd edə bilmərəm. Amma bu siyahı olmadan mətbəxə girməyin daha çətin olacağını rahatlıqla deyə bilərəm.

Bu fəsildə olmayan, amma sənin SRE ilə əlaqəni müəyyən edən vacib bir şey tapsan — bölüş. Sən necə düşünürsən?
