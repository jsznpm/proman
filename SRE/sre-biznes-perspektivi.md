# SRE haqda danışanda niyə həmişə texnikadan başlayırıq, biznesdən yox?

Gəlin açıq danışaq — SRE (Site Reliability Engineering) haqda yazılan hər şey demək olar ki texniki tərəfə fokuslanır: alerting necə qurulur, SLO necə hesablanır, incident necə idarə olunur. Amma bir sual həmişə kənarda qalır: pulu ayıran, komanda ölçüsünə qərar verən adamla necə danışmalısın?

Bu, qəribədir, çünki hər SRE-mühəndisi qarşı-qarşıya gəlir bu sualla — gec-tez. Bu yazıda mən Google-da SRE-nin biznes tərəfini illərlə formalaşdıran iki nəfərin — Ben Latç (10 il Google SRE rəhbəri) və Deyv Rensin (Google Cloud müştəri etibarlılığı departamentinin yaradıcısı) — söhbətindən çıxardığım əsas fikirləri paylaşıram. Google-a xas detallar var, amma məsləhətlərin özü universal — istənilən şirkətə tətbiq olunur.

> Etibarlılıq sizin üçün nə qədər vacibdirsə, biznes tərəfdə də bir o qədər aydın dillə danışmaq lazımdır — SLO yox, onların anladığı rəqəmlərlə.

## Əvvəl bir sual: Google təcrübəsi mənə aiddir?

Müəllif bu sualı ilk özü verib, çünki təbii şübhə budur — "Google-da SRE artıq institusionallaşıb, maliyyə məsələsi çoxdan həll olunub, mənim şirkətimdə isə hər şey sıfırdan". Amma cavab gözlənilməz: Google-dakı biznes söhbətləri digər şirkətlərdəkindən əsla fərqlənmir. Eyni sual, eyni müqavimət, eyni arqumentlər.

## Etibarlılıq haqda danışanda haradan başlamalı

Deyv-in yanaşması sadə məntiqə əsaslanır: əvvəl etibarlılığın *funksiya* olduğunu qəbul etdirməlisən, sonra qalanı detaldır.

Söhbət belə axır:
- Etibarlılıq sizi maraqlandırır? — "Əlbəttə."
- Bu, məhsulunuzun funksiyasıdır? — "Bəli."
- Digər funksiyalarla bərabər əhəmiyyətlidir? Cavab "yox"-dursa, söhbət bitir — hazır deyilsiniz.
- Cavab "bəli"-dirsə davam: Bunu necə ölçürsünüz? Adətən cavab: "kim bugün sıxıntı çəkibsə, ona bax."

Burda önəmli məqam gəlir: mükəmməllik səhv hədəfdir, ona görə **error budget** (səhv büdcəsi) lazımdır. Əgər bu fəlsəfi çevrilişi qəbul edə bilirsinizsə, qalanı texniki detaldır.

İki yol var:
1. Developer-lərin özlərinə etibarlılıq bacarığı öyrətmək — bu, iş rejimi kimi növbətçilik (on-call) tələb edir.
2. Ayrıca "production engineer" komandası qurmaq — miqyabda idarəetmə bacarığı olan insanlar.

Bunlardan biri o birini əvəz etmir — miqyaqlana bilən məhsul yaratmaq bacarığı ilə miqyaqlanan məhsulu işlətmək bacarığı tam ayrı bacarıqlardır.

## SRE-ni necə "satmamalı"

Ben-in fikri bir az təəccüblü: onlar SRE-ni satmağa çalışmırlar. Əksinə deyirlər — SRE komandası sizə **əlavə mürəkkəblik** gətirəcək. Sistemin sağlamlığı və müştərilər üçün sizi indi etmədiyiniz şəkildə işləməyə məcbur edəcəyik.

> Sağlam qida yemək və idman kimidir — insan bunu özü üçün istəməlidir. Müştərini (məhsul komandasını) məcbur edə bilməzsiniz.

Əsas iş — dəyəri elə çatdırmaq ki, qarşı tərəf həvəslə "bəli" desin, qorxudaraq yox. Söhbət etdiyin insanın məqsədini anla, SRE onun məqsədinə necə xidmət edir — bunu göstər.

Effektiv arqument texniki və konkretdir: bir incident götür, onu düzəltmək üçün nə qədər iş lazım olduğunu hesabla, sonra bunu bənzər hadisələrin sayına vur. Bu, "sıradan çıxma baha başa gəlir" kimi mücərrəd sığorta arqumentindən qat-qat güclüdür.

### "Bəli, əgər..." komandaları

Uğurlu komandalar həmişə şərtli razılaşırlar:

> "Bəli, sistemi iki həftəyə 10 dəfə çox istifadəçi tutumuna keçirə bilərik, əgər koda tanış olan 20 developer-i dərhal bura yönləndirə bilsək."

SRE-mühəndisinin işi "otaqdakı böyük yaşlı" rolunu oynamaq, həvəsi söndürmək deyil. İş — arzunun gerçəkləşməsi üçün şərtləri söyləmək, sonra bu şərtlərin mümkün olub-olmadığını müzakirə etmək.

## Uğuru biznes sahiblərinə necə çatdırmalı

Ben-in tövsiyəsi: biznesin əhəmiyyət verdiyi parametrləri öyrən. Servis necə miqyaqlanır (ölçü, istifadəçi sayı, saxlanılan məlumat həcmi)? Göstər ki, SRE xərcləri biznes üçün önəmli göstəricilərlə müqayisədə davamlı azalır.

Google-da real nümunə var: bir komanda trafiki 1000 dəfə artırıb, resurs tələbi 1000 dəfə çoxalıb, amma komanda ölçüsü 14-dən 16-ya qalxıb — cəmi.

Deyv əlavə edir: biznes sahibləri SLO-nu, SLO-ya riayət olunmasını maraqlandırmır. Sən onların dilində danışmalısan. Onun üçün ən effektiv üsul — **error budget** anlayışını ayda neçə dəqiqə narazı müştəri ilə danışmağa hazır olduqları sualına çevirmək:

> "Bu göstərici sıfır olmalıdır" deyən rəhbər — pis rəhbərdir, məhsul da müvəffəqiyyətsiz olacaq. Təcrübəli rəhbərlər bilir ki, arabir narazı müştəri ilə danışmaq qaçılmazdır.

Bu rəqəm ölçülə bilər, kalendarına yaza bilər, hər rəhbər başa düşə bilər.

## SRE-nin uğurunu sübut etmək — düzgün hədəf deyil

Bu, mənə ən maraqlı fikirlərdən biri gəldi. Deyv deyir: SRE-nin uğurunu başqalarına sübut etmək məqsəd olmamalıdır. Bu, SRE komandasının şirkətdə mövcudluğunu davam etdirmək üçün özünü sübut etmə söhbətinə çevrilir — biz belə söhbət istəmirik.

> Biz istəyirik ki, xidmətlərimizə ehtiyac qalmasın. İstəyirik ki, problem həll olunsun və başqa işlərə keçək — həmişə başqa iş var.

Rəhbər sual verəndə — "Niyə developer-lərimin özü uğur qazanmayıb?" və ya sinik şəkildə "Sizin ştatları developer-lərlə əvəz etsəm nə olar?" — cavab eynidir: "Yaxşı, yoxlayaq. Developer-ləri növbətçilik rotasiyasına qatın, bizim komandanı başqa yerə köçürün." 99 haldan 99-da rəhbər bundan imtina edir — bu, əslində sənin arqumentindir.

Yaxşı SRE komandaları öz varlığını əsaslandırmaq üçün söhbətə girmir — əksinə, artıq lazım olmayacaqları yolu axtarırlar. İllik (ya iki dəfə illik) bu sualı rəhbərlə müzakirə etmək vacibdir.

## SRE-ni büdcələşdirmək

### Birinci sorğu

Heç kim SRE-ni abstrakt şəkildə müzakirə etmir. Söhbət həmişə belə başlayır: "Nəyəsə nail olmağa çalışıram, amma indiki imkanlar buna imkan vermir." Adətən səbəb — ardıcıl ciddi kəsilmələr, müştərilərin bundan xəbərdar olub qəzəblənməsi.

Sonra kimsə SRE konseptini "kəşf edir": "Bizə bu lazımdır, SRE-mühəndisləri lazımdır." Bu, adətən konkret 1-2 layihə ilə başlayır: "Bu işi görmək üçün 4 ay ərzində 3 nəfər lazımdır, faydası bu."

> Etibarlılıq işi heç vaxt "development-ə vergi" kimi görülməməlidir. Bu, sadəcə funksiya üzərində işdir — digər funksiyalar kimi.

Paylanmış sistemin **emergent xüsusiyyətləri** koddan daha sürətli inkişaf edir — çünki bunlar kod bazasının, istifadəçilərin və istifadə ssenarilərinin dəyişməsinin nəticəsidir. Kodu heç dəyişməsən belə, sistemi işlək saxlamaq üçün daim güc sərf etməli olacaqsan.

### Maliyyələşdirmə modelləri

Ben iki fərqli ssenari izah edir:

**1. Miqyab genişlənməsi** — servis böyüyür, amma SRE komandası eyni ölçüdə qala bilər. Bu, komanda üçün cəlbedicidir (iş daha maraqlı olur), məhsul üçün əlverişlidir (xərc sabit qalır).

**2. Tədricən genişlənmə** — bir məhsul ikiyə çevrilir, yeni funksiyalar əlavə olunur, başqa məhsulla birləşir. Bu halda əlaqə nöqtələri (interaction points) diqqət tələb edir — məhz bu nöqtələrdə çatlar yaranır.

> Heç vaxt "sıradan çıxma bir daha baş verməyəcək" vədi verməyin. İnsanlar sehrli həll istəyir — SR-mühəndisi bütün problemləri yox edəcək nağılı. Bu tələyə düşməyin.

### Təkrar söhbətlər — "Niyə bunu davam etdirməliyəm?"

Komanda işini yaxşı görəndə, problemlər azalır, hamı razı qalır. Sonra rəhbər gəlir: "Problem yoxdur, niyə maliyyələşdirməyi davam etməliyəm?"

Deyv-in cavabı: heç bir mühit statik deyil. İstifadəçi sayı artacaq (azalmayacaq), qarşınıza yeni miqyab problemi çıxacaq — hələ bilmədiyiniz. Nəticə — sistemdə **entropiya**. Minimum səviyyədə davamlı güc sərf etməsəniz, entropiya üstünlük alacaq və başladığınız yerə qayıdacaqsınız.

Google-da bunu ölçmək üçün **ProdEx** (Production Excellence) adlı rüblük review aparılır. Əsas göstəricilərdən biri — error budget-in nə qədər istifadə olunduğu:
- Büdcəni aşmısınız? — narahat söhbət qarşıdadır.
- Büdcəyə dəqiq uyğunsunuz? — "yaxşı işləyirsiniz" deyilir.
- Büdcəni çox az istifadə etmisiniz? — "bəlkə ştat çoxdur?" sualı gəlir.

## SRE-ni necə qurmalı — daxili yoxsa ayrıca komanda?

Ben izah edir: Google-da SRE ayrıca təşkilat kimi qurulub, çünki paylaşılan production infrastrukturu insanların layihələr arası keçidinə imkan verir. Amma bunun mənfi tərəfi də var — Deyv qeyd edir: 20 developer-lik komandada tək SRE-mühəndisi işləyirsə, karyera yolu necə olacaq? Təbii olaraq o, tərfi almaq üçün development işi görmək istəyəcək.

> Google-da SRE-dən əvvəl SysAdmin komandası olub — klassik operations komandası. SRE yaranmasının səbəbi — bunun miqyaqlanmadığını görmək idi.

Sual: pager-i geri qaytarıb "sizinlə işləmirik" demək olar? Bəli, amma çox nadir hallarda — Deyv 9 ildə bunu cəmi 3 dəfə xatırlayır.

## "Pager tutan oğlan" tələsindən necə qaçmalı

Bu, məncə ən dürüst hissə. Ben deyir: bəzi rəhbərlər SRE-dən əslində sadəcə "istənilən vaxt zəng edə bildiyimiz adam" istəyir — amma bunu açıq demirlər. Onlar aşağıdakını düşünür: "Bu adamlara pul verim, frontend developer-lərim production-a görə narahat olmasın."

> Növbətçilik stress doludur. Sistemi çox yaxşı bilməli, təzyiq altında rahat olmalısınız.

Amma digər tərəfi də var: dünyanın ən böyük production mühitlərinin bir hissəsi olursunuz. Nə qədər kod yazsanız da, real sistem gözlənilməz səbəbdən çökəndə nə olacağına heç vaxt tam hazır ola bilməzsiniz. Kitabda yazılmayan şeyi öyrənirsiniz.

## Komanda ölçüsü necə müəyyənləşir

Ben açıq deyir: əvvəldən heç nə dəqiq planlaşdırılmayıb. Real yanaşma — **exchange rate** (ştat sayı ↔ nəticə) anlayışını tapıb şüurlu qərar vermək:

- Kifayət qədər insan olmalı ki, heç kim yanmasın (burnout).
- Kifayət qədər time zone olmalı ki, iş vaxtı düzgün bölünsün.
- Karyera cəlbedici və maaş adekvat olmalıdır.

> Komanda çox kiçikdirsə, insanlar daim od söndürür, sistemi yaxşılaşdırmaq üçün vaxt tapmır.

Google-da təcrübə göstərir — 13-14 nəfərdən çox komanda qurmurlar, servisləri ayrı komandalara bölürlər — əks halda kommunikasiya yükü çox artır.

## Xəbərdarlıq siqnalları — komanda nə vaxt problemə düşür?

İki növ siqnal var:

**1. Komanda səviyyəsi** — developer-lər növbətçilik istəmir. Bu, lokal problemdir və pisləşməyə davam edəcək.

**2. Ekzistensial problem** — SRE komandası öz məqsədinə (lazım olmamaq) çatanda, komanda üzvləri (şüurlu ya qeyri-şüurlu) bu vəziyyəti qorumağa çalışa bilər.

Alert-lərin sayı da göstərici: 
- Az alert, hamısı önəmli → əla, sistem sağlamdır.
- Çox əhəmiyyətsiz alert → SRE-lər əsas işdən yayınır, ya da "90%-i önəmsizdir" deyib hamısını görməzdən gəlirlər. Hər ikisi pisdir.
- Rübdən-rübə artan alert qrafiki → komanda dayanıqsız vəziyyətə yaxınlaşır.

## Komandadan imtina — nə vaxt və necə

Ben deyir: ideal ssenari — komanda işini elə yaxşı görüb ki, problem elə kiçilib ki, artıq bütün gücü ora sərf etməyə dəyməz. Bu, uğur əlamətidir.

Pis ssenari — münasibət problemidir. SRE uzun müddət xəbərdarlıq edib ki, operativ iş həcmi komandanın bacarığından sürətli artır, amma dinlənilməyib. Nəticədə "divar üzərindən" ötürülən məhsullar production üçün uyğun deyil.

> SRE komandaları developer-lərin arxasınca "yığışdırmaq" üçün deyil. Onların işi — məhsulu yaradanlarla birgə işləməyə uyğun etməkdir.

## Sona qədər

Bu söhbətdən çıxan əsas fikir sadədir: **SRE-ni satma, izah et.** Qorxutma, şantaj etmə — şərtləri göstər, nəticəni göstər, seçimi qarşı tərəfə burax. Error budget kimi ölçülə bilən metrikalar olmadan bu söhbətin heç biri mümkün deyil — mücərrəd "etibarlılıq vacibdir" arqumenti heç kimi inandırmır, konkret rəqəm inandırır.

Və bəlkə ən gözlənilməz fikir: SRE-nin son məqsədi özünü əbədiləşdirmək deyil, lazım olmamaqdır. Bu, ilk baxışda əks-intuitiv görünür, amma məhz bu mövqe SRE-ni "pager tutan oğlan" statusundan xilas edir və onu real mühəndislik funksiyasına çevirir.

Sizin komandanızda bu söhbət necə keçir? Error budget anlayışı biznes tərəflə ortaq dil tapmağa kömək edibmi?
