# SRE komandan 0-dan 100+ nəfərə necə böyüyür — və hər addımda nə dəyişir

Bu yazıda infrastrukturun miqyaslanmasından danışmayacağıq. Server sayının artmasından, trafikin paylanmasından yox — insanların miqyaslanmasından. Şirkətində SR-mühəndis sayı sıfırdan (ya da bir nəfərin iş vaxtının bir hissəsindən) başlayıb necə 100-dən çox nəfərə çata bilər? Gəlin bu yolu addım-addım gəzək.

Əvvəlcədən deyim: bu, "əgər X etsən, Y alarsan" tərzli reseptlər toplusu deyil. SRE sahəsi (əslində, operasiya sahəsi bütövlükdə) situasiyadan çox asılıdır. Eyni toxum tamamilə fərqli torpaqda tamamilə fərqli cücərə bilər. Ona görə bu yazıda tövsiyədən çox, müxtəlif təşkilatlarda təkrarlanan naxışların təsviri olacaq. Sən öz şirkətinə uyğun gələni seç.

> Nə vaxt miqyaslanmaq lazımdır sualının cavabı ədəd artımı deyil — "nə üçün böyüyürük" sualının cavabıdır.

## Əvvəlcə sual: böyümək həmişə yaxşıdır?

Rəqəmlərə keçməzdən əvvəl, gizli fərziyyəni sual altına almaq istəyirəm: "nə qədər böyük, bir o qədər yaxşı." Bu fəsli oxumaq (və düzünü desəm, yazmaq) elə asandır ki, sanki son məqsəd SRE təşkilatını büdcənin icazə verdiyi maksimum ölçüyə çatdırmaqdır. Amma etibarlılıqda "uyğun səviyyə" konsepti necə var, miqyaslanmada da eynilə "uyğun səviyyə" var.

Məsələn, komandanı ilk növbədə üzərinə düşən yükün həcmi əsasında böyütmək ya bölmək cazibədar görünə bilər — komandanın işləməli olduğu sorğu ya çağırışların artması buna işarə edər. Amma bu, ən yaxşı qərar olmaya bilər. Əsas göstərici kimi "miqyasın dəyişməsini" izləmək daha yaxşı ola bilər. Bu tövsiyəni (başqa əla məsləhətlərlə birlikdə) Gustavo Frankonun SREcon konfransındakı *Scaling SRE Organizations: The Journey from 1 to Many Teams* çıxışında tapa bilərsən — izləməyi tövsiyə edirəm.

Bu qeyddən sonra, gəlin başlayaq.

## 0-dan 1-ə: ilk addım

Sıfırdan bir SR-mühəndisə keçid böyük sıçrayış görünür, amma əslində düşündüyün qədər binar deyil. Çox güman, ilk SR-mühəndisi işə götürməzdən əvvəl belə, təşkilatdakı digər əməkdaşlar artıq SRE mentalitetinin (bəlkə metodlarının da) bir hissəsini öz üzərinə götürüb. Bəlkə bir nəfər iş vaxtının müəyyən hissəsini (0.5, 0.25, 0.4 stavka?) bu işə sərf edir — Klark Kentin eynəyini çıxarması kimi, yaxından baxsan, SRE-yə meyilli əməkdaş artıq SR-mühəndisə çox oxşayır.

Amma tutaq ki, bizə tam ədəd — 1 — lazımdır. Bu, ya yeni işə götürmə olacaq, ya da mövcud vəzifənin bir hissəsinin ayrılıb transformasiyası. Bu adam nə ilə məşğul olacaq? Cavab situasiyadan asılıdır, amma ən sürətli və məntiqli başlanğıc nöqtəsi adətən **monitorinq/müşahidə** və **insident-sonrası təhlil proseslərinə qoşulma**dır.

> **Erkən SRE tətbiqi təhlükəsi.** Çox gənc startaplara, hətta böyük təşkilat daxilindəki yeni komandalara belə erkən ixtisaslaşma fayda verməyə bilər. Prioritet çox vaxt "hər şey sadəcə nəzarətdə olsun" olmalıdır. İdeal halda bu iş etibarlılıq nəzərə alınaraq (alətlər, avtomatlaşdırma və s. ilə) görülməlidir — amma bütün vaxtını mükəmməl SLO-lar qurmağa sərf edib, işləyən development mühiti təmin etməsən, əlində yalnız hələ yazılmamış proqram təminatının nəzəri hissəsi qalar.

## 1-dən 6-ya: ilk komanda hissi

Niyə məhz 6? Çünki bu ədəd bir coğrafi zonada insani növbə qrafiki (on-call rotation) qurmaq üçün rahat vahiddir. Bu ədədi 10 əvəzinə işlədirəm — səni əsəbləşdirirsə, 5-ə ya 10-a yuvarlaqlaşdıra bilərsən.

Bu miqyasda SR-mühəndislər çox güman kiçik, bir-biri ilə bağlı olmayan tapşırıqlar görəcək, lazım gəldikcə digər komandalarla məsləhətləşəcək. Bir nəfər ya iki-üç nəfərlik alt-qrup konkret servis üçün monitorinqi yaxşılaşdıra, SLI/SLO sınaqdan keçirə bilər. Başqaları sıradan çıxmaların həllində iştirak edib insident-sonrası təhlillər aparır. Servislərin ümumi yetkinlik səviyyəsindən asılı olaraq, bu ilk müddətdə iş komandanın istədiyindən bir az çox reaktiv ola bilər.

> **Menecerlər, layihə rəhbərləri, biznes-administratorlar da SR-mühəndisdirmi?** Bu miqyasda (5+) komandanın tərkibini müəyyənləşdirmək lazımdır. 100 nəfərlik SRE komandasını 100 eyni işi görən mühəndis kimi təsəvvür etmək asandır — amma real SRE komandalarında rol qarışığı olur: layihə rəhbərləri, menecerlər, biznes-administratorlar. Məsələn, 7 nəfərlik komandada 5 SR-mühəndis, 1 layihə/məhsul meneceri, 1 texniki rəhbər ola bilər.

## 6-dan 18-ə: "bu artıq ciddi komandadır" hissi

Yenə də qəribə ədəd, amma 18 nəfərdə "günəşi izləyən" (follow-the-sun) növbə modelini nəzərdən keçirmək mümkün olur — 24/7 əhatəni fərqli saat qurşaqlarındakı komandalara növbə ilə ötürməklə təmin etmək. Bu, kimisə yatmalı olduğu vaxtda insidentə cavab verməyə məcbur etməkdən qat-qat insanidir. (Diqqət: bu, şirkətin artıq bir neçə saat qurşağında işçi götürməsini tələb edir — 18 nəfər eyni coğrafiyada olsa, "günəşi izləmək" işləməz.)

Say tərəfindən yanaşsaq, 10 sərhədini keçib 20-yə yaxınlaşırıq — "bu artıq ciddi komandadır" hissi yaranır. Praktikada bu, paralel tapşırıqlar görmək və ya "komandaya daxil edilmiş üzv" modeli tətbiq edilirsə təsir dairəsinin artması demək ola bilər. SR-mühəndis sayı artdıqca, tapşırıq səviyyəsində ixtisaslaşma imkanları da artır — bir nəfər monitorinq üzrə təcrübə toplayır, bir cüt nəfər production-a keçid yoxlamalarının çoxunu öz üzərinə götürür.

> **Sublinear miqyaslanma.** SRE sahəsinin başından bəri məqsədi "sublinear" böyümək olub — yəni "hər yeni servis üçün yeni adam işə götürmürük" və ya "servisə yük artsa da, işçi sayını artırmırıq." Sadə səslənir, amma real həyatda çox nüanslıdır. Avtomatlaşdırma, alət/metod ortaqlığı, texnologiya müxtəlifliyi və koqnitiv yük kimi faktorlar "sublinearlığı" hesablamağı çətinləşdirir. Məqsəd bəzən SR-mühəndisləri daha maraqlı işə azad etmək üçün qoyulur — bəzən sadəcə az adam işə götürüb pul qənaət etmək üçün. SRE-nin yaradıcıları məqsədi qoyanda birincini nəzərdə tutub, ikincini yox.

## 18-dən 48-ə: bir komandadan çoxlu komandaya

Bu miqyasda artıq "SRE komandası"ndan yox, bir neçə SRE komandasından ibarət **SRE təşkilatı**ndan danışırıq. Komandalara necə bölünəcəyi tamamilə situasiyaya bağlıdır. Rast gəldiyim modellər:

- Standart layihə komandaları + ümumi infrastrukturla məşğul olan ayrıca SR-mühəndis komandası.
- Konkret böyük məhsul qruplarıyla işləmək üçün yaradılan komandalar (məsələn, Google Maps üçün SRE komandası).
- Mərkəzi ofisin yerləşdiyi coğrafiyaya görə bölünmüş komandalar (Dublin SRE komandası, Avropa SRE komandası).
- N nəfərlik "əvəzedilə bilən" layihə komandaları (komanda 1, komanda 2, komanda 3 — heç kim belə adlandırmasa da).

Bölünmə üsulunu seçərkən ən aydın sual budur: "SR-mühəndislərdən nəyə nail olmaq istəyirik?" Adətən təşkilat bir neçə konfiqurasiyanı (ardıcıl, bəzən paralel) sınayır, uyğun olanını tapana qədər.

Bu miqyasda "SRE nədir?" və "böyüyəndə nə etmək istəyirik?" söhbətləri kəskin artacaq. Diqqət nöqtəsi **reaktiv yanğınsöndürmədən** **proaktiv seçimə** keçir. Amma diqqətli ol: bu miqyasda təşkilatın **bütövlüyü** (cohesion) əsas problemə çevrilir. Missiya, alət seçimi, sənədləşdirmə standartları, işə götürmə standartları, tərəfdaş münasibətləri, mədəni normalar — hamısı deformasiyaya başlaya bilər. Səhvlərdən öyrənmənin yayılması da artıq özbaşına baş vermir (eyni insidentlərlə birgə məşğul olmursunuz) — bunun üçün məqsədyönlü metod və praktika lazımdır.

## 48-dən 108-ə (və artıq): giriş kitabının hüdudlarından kənar

Bu sıçrayışla artıq giriş kitablarının çərçivəsindən çıxırıq. Amma SRE-nin bu miqyasda hansı istiqamətdə inkişaf edə biləcəyini görmək faydalıdır:

- **Daha dar ixtisaslaşmış komandalar** (yalnız data saxlama üçün SRE komandası, release engineering-ə fokuslanmış komanda).
- **Texnologiya ya əsas funksiya ətrafında qurulan komandalar** (məsələn, Kubernetes SRE komandası).
- **Effektiv təlimə** (həm SR-mühəndislər, həm də tərəfdaş komandalar üçün) fokus artımı.
- **Ümumi standart və praktikaları** yaradıb yayan komandaların yaranması — bəzən həm SRE, həm daha geniş mühəndislik üçün alət/platforma yaratmaq da bura daxildir.

Bu miqyasda əhəmiyyətli prinsip: SR-mühəndislər **əlaqə və körpü qurmağa** xidmət etməlidir — konformizmə, fərqlərin silinməsinə yox.

### SRE platform engineering-lə tanış olur

Böyük SRE təşkilatlarında tez-tez rast gəldiyim ssenari: komanda inkişaf etdirdiyi alət xüsusi bir daxili platformaya çevrilir. Bu, tədricən baş verir. SR-mühəndis komandası öz işini görmək üçün alət yaradır → alət komandadan kənarda da işlədilməyə başlayır → indi komandanın "müştəriləri" var. Bir addım sonra, komanda bilərəkdən etibarlılıq məqsədləri üçün daxili platforma yaratmağa, inkişaf etdirməyə başlayır. Bu, SRE-nin "platform engineering" hərəkatı ilə kəsişdiyi nöqtədir. Nümunələr:

- Servislərin mərkəzi monitorinq sisteminə asanlıqla qoşulmasını təmin edən kitabxananın dəstəklənməsi.
- Avtorizasiya/giriş nəzarəti üçün standart kitabxanaların yaradılması ("İstifadəçi X, Y əməliyyatını edə bilər?" sualına cavab).
- Production-da canary deployment üçün standart alətlər.
- Standart RPC formatı/kitabxanası (çox güman, hazır həll — məsələn gRPC — istifadə etmək daha ağıllı seçimdir, yalnız çox ciddi səbəb yoxdursa).

Bütün bu nümunələrdə komanda "hamının istifadə etdiyi" əsas qatı yaradır — nəticədə bütün təşkilatın etibarlılığı artır.

## Rəhbərlikdə təmsilçiliyin böyüməsi

Sonda bir nüansı qeyd etmək istəyirəm ki, çox vaxt gözdən qaçır: sayı (və effektivliyi) artırmaqla yanaşı, **rəhbərlikdə təmsilçiliyi** də miqyaslandırmaq lazımdır. SR-mühəndisləriniz biznes rəhbərləri ilə danışıqlarda iştirak edirmi? Mühəndislik (və digər) qərarları qəbul edilərkən SR-mühəndislər masada varmı? SRE böyüdükcə buna diqqət yetirmək lazımdır — effektiv qalmaq üçün.

---

Bütün bu yol xəritəsi yalnız məqsədyönlü rəhbərlik sayəsində reallaşır. Sadəcə say artırmaq kifayət etmir — hər addımda **nə üçün** böyüdüyünü aydın saxlamaq lazımdır. Sənin şirkətində SRE hansı mərhələdədir? Növbəti addımın nə olduğunu bilirsən?
