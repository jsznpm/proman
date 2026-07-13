# Rutinlə sağlam münasibət necə qurulur?

SRE dünyasında "rutin" (toil) sözü hər yerdə keçir, amma qəribədir — çoxumuz onun barəsində dəqiq danışa bilmirik. Bu yazıda "Site Reliability Engineering" kitabının 5-ci fəslini və "Site Reliability Workbook"un 6-cı fəslini təkrarlamaq əvəzinə, bir addım irəli gedib soruşacağıq: əsas anlayışları bildikdən sonra, rutinə qarşı **fərqləndirilmiş və sağlam** münasibəti necə formalaşdırmaq olar?

Əvvəlcə qısa bir tərif xatırladacağam, sonra onu tramplin kimi istifadə edib daha dərinə gedəcəyik.

Bunun ilk addımı — rutin haqqında danışarkən daha dəqiq dil işlətməkdir. Məsələn, bəzi dillərdə "qar" sözünün onlarla variantı var, çünki qarın fərqli növləri fərqli reaksiya tələb edir. Rutini nüanslarla təsvir etmək bacarığı bizə ona qarşı daha çox reaksiya variantı verir.

## Rutinin tərifini dəqiqləşdirək

İlk tələ — "rutin" sözünü gündəlik mənasında (“zəhləmizi tökən iş”) qəbul edib ilişib qalmaqdır. Bunun qarşısını almaq üçün Vivek Rau-nun "Site Reliability Engineering" kitabında verdiyi "Google tərifi"nə baxaq. Ona görə, rutin fəaliyyət aşağıdakı xüsusiyyətləri daşıyır:

- əl ilə yerinə yetirilir;
- təkrarlanandır;
- avtomatlaşdırıla bilər;
- operativdir (uzunmüddətli strateji dəyəri yoxdur);
- uzunmüddətli dəyər yaratmır;
- servisin böyüməsi ilə **O(n)** artır.

> Bütün bu əlamətlərin hamısının eyni anda olması vacib deyil — nə qədər çoxu üst-üstə düşürsə, bu fəaliyyətin rutin olma ehtimalı bir o qədər yüksəkdir.

Rau bunu açıq yazmasa da, rutinin mənfi yan təsirlərini (karyerada durğunluq, moral düşkünlüyü, qarışıqlıq, tərəqqinin ləngiməsi, işdən çıxma tempinin artması, etimadın sarsılması) müşahidə etməyə başlasanız, bu da əlavə sübutdur. Amma diqqətli olun — bunlar **gecikən göstəricilərdir**. Onları hiss edəndə artıq zərər dəymiş olur (elə bil göbələyin zəhərli olub-olmadığını dadına baxaraq öyrənirsiniz).

### İnsidentlər rutindir? Bəs sorğular?

"Site Reliability Engineering" kitabının 5-ci fəslində Google mühəndislərinin növbətçilikdə (on-call) keçirdiyi vaxt rutin mənbələri siyahısında ikinci yerdə göstərilir (birinci yer — işin kəsilməsi/interruption-lardır). Bu sizi belə bir nəticəyə apara bilər ki, növbətçilik daim rutin yaradır. Gəlin əsas sualı verək: **"İnsidentlər/sıradan çıxmalar rutindir?"** və ondan doğan sual: **"Sorğular rutindir?"**

Xeyirxah əhval-ruhiyyədə desəm: "Vəziyyətdən asılıdır". Daha az xeyirxah desəm: ikisi də "çox vaxt" rutindir. Sorğularla işləyəndə, adətən, Rau-nun tərifinə uyğun gələn adi rutin əməliyyatlar görürük. Əvvəlki insidentin təkrarı olan insidentlər də şübhəsiz rutindir — amma bunlar maraqlı deyil.

Daha maraqlısı — servis itkisinə səbəb olan vəziyyətin **əvvəllər heç baş verməməsi**dir. Belə bir fikir var ki, növbətçilikdə iş təcrübəsi qiymətlidir, çünki başqa heç yerdə əldə edə bilməyəcəyiniz sistem və istehsalat mühiti biliyi qazandırır. Güman ki, söhbət məhz **yeni** insidentlərlə bağlı təcrübədən gedir. Yeni sorğular (“tiketlər”) də nəzəri olaraq eyni ideyanın kiçik miqyaslı versiyası ola bilər. Bu bizi qəribə bir nəticəyə aparır: bəzən fəaliyyət başlanğıcda rutin olmur, amma sonradan rutinə çevrilə bilər.

Bu çevrilməni mümkün edən sehrli komponent — insidentdən **dərs çıxarmaq bacarığımızdır**. Rutindən təcrübə əldə etməyə imkan verən əbədi dəyər elə budur.

## Kimin rutinindən danışırıq?

Rutini tərif edərkən çox sadə, amma gözdən qaçırılan sual var: **"Bu, kimin rutinidir?"** Demək olar ki, həmişə burada söhbət **öz** rutinimizdən — sistem operatorlarının yerinə yetirdiyi, istehlakçıların yox — əməliyyatlardan gedir.

Bu, bir az qəribədir, çünki kitab boyu sizi müştəri nöqteyi-nəzərindən baxmağa təşviq edirəm: sistemləri müştəri perspektivindən izləmək, etibarlılığı müştəri gözləntilərinin ödənməsi meyarı kimi görmək və s. Müştərinin rutinini yüngülləşdirmək adətən məhsul idarəetməsinin və məhsulu hazırlayan insanların sahəsinə aiddir. Bu qaydanın maraqlı bir istisnası var — ona "Rutinlə necə mübarizə aparmalı" bölməsində qayıdacağıq.

> Fərz edin ki, hər hansı sadə operativ addımın — məsələn, hesab yaratmağın — arxasında üç ayrı sorğu (kompüter, saxlama, şəbəkə) dayanır. Bu, əməliyyat rutininin müştəri tərəfinə sızmasıdır. Konvey qanunu deyil, amma ona çox bənzəyir.

## Niyə SR-mühəndisləri rutindən narahat olur?

Daha iki fundamental sual: SR-mühəndisləri niyə ümumiyyətlə rutinlə maraqlanır və bu münasibətin təbiəti nədir?

SRE — etibarlılığa həsr olunmuş bir mühəndislik fənni olduğuna görə, düşünmək olar ki, rutinlə mübarizənin əsas səbəbi sistemin etibarlılığına təsirdir. Bu fərziyyə mübahisəlidir və mənim fikrimcə, həqiqətə uyğun deyil.

Əksər məqalələr rutini aradan qaldırmaq üçün avtomatlaşdırmanın zəruri olduğunu sübut etməyə çalışır: az xəta → yüksək etibarlılıq. Rutin, həqiqətən, SRE ilə bağlıdır, amma avtomatlaşdırma vasitəsilə etibarlılıq əldə etmək **əsas hərəkətverici qüvvə deyil**. Son sıradan çıxmanın günahkarı kimi avtomatlaşdırmanı görmüş və ya avtomatlaşdırmanın necə sıradan çıxmaya səbəb ola biləcəyinin incəliklərinə varmış hər kəs bu arqumentin nə qədər zəif olduğunu bilir. Gəlin üç fərqli amil təklif edim — ikincisini rəhbərliyinizə də danışa bilərsiniz.

**Estetika.** Ən çox inandığım bağlantı budur. SR-mühəndisləri rutini aradan qaldırmaq istəyir, çünki rutin onların estetik hisslərini incidir. Sadəcə desək, rutini kobud, səmərəsiz, lazımsız, qeyri-optimal və iyrənc hesab edirlər. Bu, beynimizin işləmə tərzinin əksidir — mükəmməl eşitmə qabiliyyəti olan insanın konsertdə köklənməmiş piano ilə üzləşməsinə bənzəyir (çox vaxt elə belə də olur).

**Pul.** Bunu deməyin daha nəzakətli yolu var, amma insanlar puldur. SRE (və SWE) kimi yüksək ixtisaslı mütəxəssisləri işə götürmək və maaş ödəmək baha başa gəlir. Təşkilatlar bu baha mütəxəssislərin dünyanı irəli aparan, gəlir gətirən işlə — yəni rutinin **əksi** ilə — məşğul olmasını istəyir. Onlar Rau-nun siyahısındakı son əlamətdən (xidmətin böyüməsi ilə mütənasib əmək tutumu) qaçmaqda maliyyə cəhətdən çox maraqlıdır, çünki mümkün qədər az adamla mümkün qədər çox servisə xidmət etmək istəyirlər.

**Vaxt/əməyin bölüşdürülməsindən məmnunluq.** Bu, əvvəlki bəndin alt-bəndi kimi görünsə də (sonda hər şey puldur), ayrıca qeyd etməyə dəyər. Əksər texniki mütəxəssis günü rutinə yox, yaradıcılığa sərf etmək istəyir. Rutin komandanın xoşbəxtliyinə, deməli, komandanın saxlanmasına birbaşa təsir edir. Diqqətsiz buraxılan rutin tez bir zamanda yüngül əsəbiləşdirmə səbəbindən real təhlükəyə çevrilə bilər.

Bu üç amil gözəl uzlaşır: SR-mühəndislərinin xarakteri onları rutinlə mübarizəyə sövq edir, təşkilatın maliyyə maraqları isə bu işi stimullaşdırır — bu, etibarlılıqla birbaşa bağlı olmasa belə.

## Rutinin dinamikası: yeni yaranan vs. kök salmış

İndi rutinin daha dəqiq tərifini və niyə əhəmiyyətli olduğunu bildiyimizə görə, ona müstəqil bir sistem kimi baxa bilərik.

Sağlam münasibətə mane olan bir şey — rutinin necə yarandığını, dəyişdiyini təsvir edərkən işlətdiyimiz kobud dilimizdir. Adətən hekayə belə nəql olunur: "Müəyyən rutin var idi, biz onu azaltmaq üçün işlədik". Burada bir nüans əskikdir — **vəziyyətin dinamikası**.

Bu dinamikaya nümunə — servisin yetkinliyi ilə rutin arasındaki əlaqədir. Əksər hallarda yeni servislərdə daha çox rutin olur. Niyə?

- Yeni servislərdə monitorinq və xəbərdarlıq sistemləri hələ tənzimlənmə mərhələsindədir. Nəticədə daha tez-tez sıradan çıxırlar.
- Servisin işləməsi üçün lazım olan proseslər demək olar həmişə "funksional olmayan tələblər" kateqoriyasına düşür — yəni servisin mövcudluq səbəbi olan əsas funksiyaların bir hissəsi deyil. Layihələndirmə mərhələsində əməliyyat tərəfini əvvəlcədən düşünmək əla olardı, amma diqqət əsas funksionallığa yönəlir. Rutini azaldan avtomatlaşdırma çox vaxt yalnız daha sonrakı mərhələlərdə (əgər ümumiyyətlə) koda yazılır. Bu, kitabdakı "SR-mühəndislərini inkişafın erkən mərhələsinə cəlb etmək vacibdir" tezisinin ən güclü arqumentlərindən biridir.
- Nə qədər hər şeyi əvvəlcədən bilirik desək də, istehsalat mühitində sistemin necə işləyəcəyinin kontekstual tərəfləri adətən yalnız istehsalata keçdikdən və gizli fərziyyələrin/məhdudiyyətlərin mənfi nəticələrini hiss etdikdən sonra aydın olur. ("Ah, demək bir endpoint cəmi 100 fərqli marşrutu işləyə bilər — əla!"). Sonra özümüzü qayıqdan vedrə ilə su boşaldan adam (rutin) rolunda tapırıq — bir tərəfdən sızmanı tapmağa, digər tərəfdən daha yaxşı qayıq qurmağa çalışırıq.
- Daha az ehtimal olunan, amma "gözlədiyinizdən tez-tez rast gəlinən" variant — müştərilərin yeni servisdən gözlənilməz şəkildə istifadə etməyə başlamasıdır. Bir az mübaliğəli, amma real nümunə: təsəvvür edin insanlar yeni e-poçt sistemini sənəd arxivləşdirmək və ya böyük fayl ötürmək üçün istifadə etməyə başlayır. Nəticədə heç kimin gözləmədiyi saxlama paylanması və idarəetmə rutini yaranır.

Niyə "yeni servislər daha çox əməyə ehtiyac duyur" amili vacibdir? Birincisi, gözləntiləri realist qurmağa kömək edir. Yüksək rutin dövrünə mental hazır ola bilərik (və onu komandanın vəzifələrinə daxil edə bilərik). Bu, gözlənilməz yağışın altında qalmaqla, yerli iqlimi bildiyinizdən dolayı gün yağışlı olacağını əvvəlcədən bilmək arasındakı fərqdir. Gələcək işlərin yeni servisdəki rutini azaldacağına arxalana bilirsinizsə, başlanğıcdakı rutin həcmi **sonlu** sayıla bilər — bu da onu qat-qat asan dözülən edir.

İkinci səbəb — bu amil bizə **yeni yaranan** rutin (servisin ilk günlərinə aid) ilə **kök salmış** rutini fərqləndirməyə imkan verir. Nəzəri olaraq yeni yaranan rutin servis yetkinləşdikcə azalmalıdır. Kök salmış rutin isə daha məkirlidir — bu, servis yaradılarkən heç aradan qaldırılmağa cəhd edilməmiş və sadəcə komandanın üzərinə yük olaraq qalmış, ya da (daha pisi) servisin ayrılmaz hissəsinə çevrilmiş rutindir. Kök salmış rutinin mənbəyini müəyyənləşdirmək, onu aradan qaldırmaq üçün lazım olan işin həcmini (bəzən kodun tam yenidən yazılmasına qədər) qiymətləndirməyə imkan verir.

## Rutinlə necə mübarizə aparmalı?

Əksər nəşrlər (əsasən Google-dan kənar yazılmış) rutindən qurtulmağı belə təsvir edir: mühitinizdə rutini aşkarlayın. Onu avtomatlaşdırma və ya özünəxidmət mexanizmi ilə aradan qaldırın. Hazır. Sadə görünür, elə deyil?

Hələ əsas qanun formalaşdırmağa hazır deyiləm, amma aşağıdakı iddianı irəli sürməyə kifayət qədər dəlil var: rutin **yaradıla və (ən vacibi) yox edilə bilməz** — onu ən yaxşı halda yalnız **çevirmək** olar. İstəsəniz, buna "rutinin qorunması qanunu" deyin.

> Rutin yox edilmir — o, çevrilir. Nəyə? **Mürəkkəbliyə.**

Avtomatlaşdırmanın rutin probleminin xilaskarı olduğu nağılda tez-tez unudulan narahatedici həqiqət budur ki, rutin aradan qaldırılmır — çevrilir. Artıq "rutini aradan qaldırmaq" üçün işləyən yeni kod qatımız var, qarşımızda isə yeni vəzifə: bu kodun uğursuzluq rejimlərini idarə etmək, planlaşdırmada nəzərə almaq, aşkarlamaq/reaksiya vermək. Səhv başa düşməyin — əksər hallarda, tam anlayışla və şüurlu şəkildə kompromisi qəbul edərək gedirsinizsə, bu, kainatla ağıllı sövdələşmədir.

Eyni şəkildə, özünəxidmət mexanizmlərinin bizi (ən azı öz rutinimizdən) azad etdiyi nağılda da unudulan həqiqət — rutin silinmir, sadəcə əməliyyat heyətinin çiynindən götürülüb sistemin istifadəçiləri arasında kiçik-kiçik hissələrə bölünərək paylanır, onlar da indi bunu kollektiv daşıyır. Bəs rutinin çevrilməsindəki kompromis haradadır? Maksimum paylanmış/mərkəzləşdirilməmiş sistemə keçirik — burada hər istifadəçinin öz "birdəfəlik" rutin stəkanı və bu rutinlə bağlı problemləri (yenə mürəkkəblik) var. Əvvəlki kimi, bu problemlərlə yaşamağa hazırsınızsa, adətən düzgün qərardır.

Bunun geniş mənada əhəmiyyəti odur ki, rutinlə sağlam münasibət üçün "rutindən qurtulanda" əslində nə baş verdiyini aydın görmək vacibdir.

### Rutinin qorunması haqqında əlavə suallar

**Sual 1.** Rutin necə yaradılmır? Axı yeni servislər özləri ilə yeni rutin gətirir demədinizmi?

Çox yaxşı sual. Düşünürəm ki, servis yaradarkən müəyyən arxitektura qərarları qəbul edəndə, həmin şablonun içində əvvəlcədən mövcud olan rutini işə salırıq (o, həmişə şablonun bir hissəsi olub, biz onu yaratmırıq). Məsələn, servisdə ayrıca "istifadəçi" və ya "hesab" identifikatorları olacağına qərar veririksə, bu, kainatın rutin saxladığı otağın qapısını açır.

**Sual 2.** Tutaq ki, servisi yenidən yazdım və artıq istifadəçiləri yoxdur — bu, o rutini aradan qaldırmaq deyilmi?

Bu suala cavab vermək üçün, əvvəlcə sehrbazdan bu trüku mürəkkəbliyə toxunmadan (və ya onu başqa yerə köçürmədən) necə etdiyini soruşardım. Həmçinin, yenidən yazma nəticəsində alınan sistemin **eyni servis** olduğunu dəqiq deyə bilərikmi, deyə maraqlanardım (bu, açıq-aydın ilkin sualı cavablandırmır, sadəcə onu aradan götürür).

## Rutinin azaldılması: orta səviyyədən qabaqcıl səviyyəyə

Adətən rutinin azaldılması müzakirəsi tək sistem nümunələri ətrafında cəmlənir. Hekayə belə səslənir: "X əl əməliyyatı tələb edən sistem var idi. Biz bu addımı avtomatlaşdırdıq. Yaşasın!" və ya "X üçün sorğuları süzmək və təsdiqləməkdə çox vaxt itirirdik, ona görə bizi bu işdən azad edən özünəxidmət sistemi qurduq. Yaşasın!" Bütün bu hekayələr yaxşıdır və hər biri qeyd olunmağa dəyər. Əslində, rutini azaltmaq üçün mühəndislik resurslarını ayırmağa insanları inandıracaq qədər nüfuz toplamazdan əvvəl bu cür hekayələrin bütöv bir seriyasını yığmalı ola bilərsiniz.

Tək sistem qələbələrindən növbəti addım — mühitdən bütöv rutin **siniflərini** aşkarlamaq və aradan qaldırmaq səylərinin genişləndirilməsidir. Məsələn, yeni servisi mərkəzi monitorinq sisteminə qoşmaq ənənəvi olaraq ardıcıl tapşırıqlarla dolu zəhmətli proses idisə, yeni servis sahibinə telemetriyanı asanlıqla monitorinq sisteminizə ötürməyə imkan verən layihə ikiqat qələbə olacaq. O, təkcə "düzgün işi" asan tapşırığa çevirmir, həm də mühitinizdəki bütöv bir monitorinq rutini sinfini adlayıb keçməyə imkan verir.

Tək sistem daxilində rutinin azaldılması səylərinin daha da inkişafına — rutini xronoloji kontekstdə müzakirə etməyin dəyərindən danışarkən — işarə etmişdim. Mühəndislik gücü (praqmatik yanaşsaq) son dərəcə məhduddur. Vaxtı rutinlə əlaqələndirəndə, təbii ki, vacib sual meydana çıxır: "Sonsuz olmayan potensialımı köhnə (kök salmış), cari (yeni yaranan) yoxsa gələcək rutinə həsr etməliyəm?" Ən perspektivli rutin azaltma tədbirləri, adətən, **gələcək** rutinin həcmini azaltmağa yönəlir.

Kiçik miqyasda rutinin azaldılmasında orta səviyyədən qabaqcıl səviyyəyə son bir addım da var — rutini aşkarlamağa, çox vaxt (təşkilat üçün xərc baxımından) kəmiyyətcə qiymətləndirməyə yönəlmiş tədqiqatlar aparmaq. Bu sizə "görəndə tanıyıram" yanaşmasından uzaqlaşıb, biznesin başa düşdüyü standart/təcrübə və rəqəmlərə yaxınlaşmağa imkan verir.

Bu, adətən iki yolla edilir: insanlardan soruşmaq və ya kompüterlərdən soruşmaq. Sorğular, müsahibələr və işi müşahidə etmək birinci kateqoriyaya aiddir. Sorğu sistemi məlumatlarının təhlili, insident icmallarının taksonomiyası və əl alətlərinin istifadə statistikası — "kompüterdən soruş" metodunun nümunələridir.

Təcrübəmə görə, insanlarla ünsiyyət qurmadan yalnız məlumat toplamaq və təhlil etmək istəsək belə, hər iki yanaşma lazımdır. Düzgün suallar versəniz, sorğular sizə maşın məlumatlarındakı boşluqları aşkarlamaqda və ya rutinlə bağlı insan qərar qəbuletmə proseslərini müəyyənləşdirməkdə kömək edə bilər. Onlar "bəzən avtomatlaşdırılmış yerləşdirmə sistemi konkret ssenarini idarə edə bilmədiyi üçün istifadə olunmur" kimi vəziyyətləri üzə çıxara bilər.

## Nə edəcəksiniz?

Fəsli bitirərkən vurğulamaq istəyirəm — hamımız SRE-yə aid rutinlə sağlam münasibət qurmalıyıq: həm fərd, həm də təşkilat kimi. Bu münasibət zamanla dəyişə bilər, amma bu, həmişə ya **şüurlu**, ya da **şüursuz** şəkildə baş verəcək.

Seçim sizindir.
