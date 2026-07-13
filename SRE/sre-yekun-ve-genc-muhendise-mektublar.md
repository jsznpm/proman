# SRE Kitabına Vida: Gənc Mühəndisə Yazılmış Məktublar

Bu yazını yazmaq mənə bir az kədərli gəldi — çünki bu, kitabla vidalaşma anıdır. Amma əvvəl geriyə baxaq: birgə hansı yolu keçdik?

SR-mühəndisləri (Site Reliability Engineer) həm tək, həm də təşkilat daxilində, başqaları ilə əməkdaşlıq edərək, sistemlərin istənilən etibarlılıq səviyyəsində işləməsi üçün çalışır. Müəyyən düşüncə tərzinə malik, müəyyən mədəniyyət daxilində işləyən və bu rola hazırlaşmış SR-mühəndisləri təşkilat kontekstində məqsədə çatmaq üçün konkret metodlardan effektiv istifadə edə bilirlər.

> Və bu, əyləncəlidir. Həm də faydalı — həm insan, həm təşkilat üçün. Həmişə yox, amma ümumilikdə bu, əla ola bilər.

SRE-də xarakterinizi sınaqdan keçirmək, başqaları ilə əməkdaşlıq edib real nəticələr əldə etmək şansınız var. Etibarlılığın qarşınıza qoyduğu problemlər və onları həll etmək üçün gedəcəyiniz yol həmişə aydın olmur (elə kitabın yazılma səbəbi də budur) və çox nadir hallarda darıxdırıcı olur. Ümid edirəm, kitabı kənara qoyanda mənim SRE-yə qarşı hiss etdiyim həvəsin heç olmasa bir hissəsini siz də hiss edirsiniz.

## Sonra nə?

Hələ də mənimlə olduğunuz üçün çox minnətdaram. İstərdim ki, hər oxucuya çıxışda minnətdarlığımı ifadə etmək üçün hədiyyə səbəti verim. Bəlkə də edə biləcəyim ən yaxşı şey — sizə virtual hədiyyə bağışlamaqdır:

- Üzərində "Hər şey maraqdan başlayır... Sistem necə işləyir? Nasazlıq necə baş verir?" yazılan kiçik lövhə.
- "Dikersonun etibarlılıq iyerarxiyası" kart dəsti (üz tərəfində bəlkə mənim SRE tərifim yazılıb).
- Üzərində "Yorulmadan əməkdaşlıq edən" yazılı müvəqqəti (ya daimi — özünüz qərar verin) döymə.
- Əks-əlaqə dövrü formasında neon lövhə.
- SREcon video diski.
- Ayaqqabıdan qumu çıxarmaq üçün kürək — rutinanı təmizləmək üçün.
- Keks — çünki kim keks istəməz ki?

Bunların hər biri SRE ilə məşğul olmağa başlayanda işinizə yarayacaq. Kitabı oxuduğunuz üçün təşəkkürlər, uğurlar arzulayıram!

---

## Əlavə A: Gənc SR-mühəndisinə məktublar

Bir vaxtlar *Seeking SRE* kitabını nəşrə hazırlayarkən SRE-nin müxtəlif sahələrindən tanışlarımdan soruşmuşdum ki, SR-mühəndisləri ilə DevOps mütəxəssislərinin müqayisəsinə həsr olunmuş fəslin birgə yazılmasında iştirak etmək istərlərmi. Əks-səda inanılmaz oldu.

Bu kitab üçün də düşündüm ki, bugünkü təcrübəyə malik həmin insanlardan xahiş etmək əla olar — qoy kollektiv müdrikliklərini bölüşsünlər və yenicə SRE yoluna çıxan gənc mühəndislərə, yaxud təşkilatlara məsləhət versinlər.

Konkret olaraq soruşdum: "İki abzasda (ideal halda) ya da daha az sözlə, SRE yoluna yenicə çıxan insanlara ya da təşkilatlara hansı məsləhəti verərdiniz? Gələcəkdəki özünüzdən nə eşitmək istərdiniz? Nəyə diqqət yetirmək lazımdır, hansı şeylər göründüyü qədər vacib deyil, hansı təcrübələri daha tez tətbiq etmədiyinizə görə peşmansınız, hansı resurslar faydalı oldu, hansı dərsləri götürdünüz?" və s.

Təcrübələrini bu kitab üçün bölüşməyə razı olan insanlara çox minnətdaram. Aşağıda onların cavabları var (adlar və vəzifələr mənə təqdim olunduğu kimi saxlanılıb).

### Con Amori — DevOps/SR-mühəndisi

Görəcəksiniz ki, bütün sistemlər istədiyiniz qədər ağıllı layihələndirilməyib, daha çoxu isə ümumiyyətlə sizin nəzarətinizdən kənardadır və onları yaxşılaşdıra bilmirsiniz. Yadda saxlayın: hər şeyi etmək mümkün deyil və bütün səylərinizə baxmayaraq, sonda nəsə hökmən sınacaq. Məhz burada sizi xəbərdar etmək istəyirəm: "Hazır olun." Demək asandır, amma real həyatda təcili ehtiyac yarananda bütün asılılıqları nəzərə alan, lazımi alət və resursları təmin edən aydın, icra oluna bilən tapşırıqlarla dolu müasir sənədləşmə saxlamaq çətindir. Yaxşı sənədləşdirmə vərdişlərinə vaxt ayırın, nəşr olunmuş postmortem-ləri oxuyun — bu, SR-mühəndislərinin praktikada üzləşdiyi problemləri anlamağa kömək edəcək.

Daim genişlənən çoxlu alət və texnologiya var. Onların nə etdiyini və niyə faydalı olduğunu bilmək xoşdur, amma yolun əvvəlində ehtiyac yaranana qədər onları öyrənmək o qədər də vacib deyil. SRE-yə yeni başlayanlara məsləhətim: ekosistemdə yorulub itmədən əvvəl sadəcə bir proqramlaşdırma dili (Python/Go) və Unix-bənzər əməliyyat sistemi (*nix) mənimsəyin. Görəcəksiniz ki, ən yaxşı SR-mühəndisləri belə iş üçün əsas komanda sətri alətlərindən və sadə skriptlərdən istifadə edir, çünki onlar yaxşı sənədləşdirilib və işlətməsi asandır. Əvvəl yerimək, sonra qaçmaq öyrənildiyi kimi, tələsməyin, bir dəfəyə bir alət/metod öyrənməyə çalışın, çünki çoxu bir-birindən asılıdır.

### Fred Hebert — Baş SR-mütəxəssis, Honeycomb.io

Həmişə yadda saxlayın: bütün sistemlərimiz sosiotexnikdir. Məqsəd, prioritet ya da təzyiq dəyişəndə onları tənzimləyən insanlar olmasa, sistemlər faydasız və kövrək olur. İnsan sağlamlığını sistemin bir hissəsi kimi qorumaq — mühiti uzunmüddətli perspektivdə ardıcıl saxlamağa imkan verən şeydir. Göstəricilər faydasızlaşır və dəyişdirilməli olur; sistemin kənarında qərar qəbul edən işçinin yadda saxlaya biləcəyindən daha çox məlumat mövcuddur. Sistemi donmuş texniki obyekt kimi deyil, böyüyən canlı varlıq kimi qəbul etməyə davam edin.

Qərar qəbulu kontekstdən asılıdır. İnsanların işi necə gördüyünü anlamağa çalışın. İşin təsəvvür etdiyimiz forması ilə real icra forması arasında həmişə uçurum var. Bu uçurum nə qədər kiçikdirsə, müdaxilələrimiz bir o qədər effektiv olar. Məqsəd və təzyiqlər dəyişmirsə, dəyişiklik gözləmək olmaz. SR-mühəndislərinin təşkilatda bu dəyişiklikləri təhrik edəcək əks-əlaqə dövrünün əsas həlqəsinə çevrilmək imkanı var.

### Aju Tamanq — DevOps/SR-mühəndisi

Sıradan çıxmalar zamanı insidentlərə reaksiyanı prioritet üzrə sıralayın, mühəndis və komanda kimi təkmilləşmək üçün növbətçiliyə qatılın. Tapşırıq siyahısına aid sənədləşdirmə — sizə və komandanıza gələcəkdə kömək edəcək uzunmüddətli investisiyadır. Tapşırıq mürəkkəb ola bilər və effektiv icra üçün özü də qiymətləndirilməmiş bacarıq dəsti tələb edə bilər.

SRE Məktəbini (School of SRE) yeni başlayanlara tövsiyə edirəm. Google Books-dakı SRE kitablarına baxın — orada prinsiplər, qabaqcıl praktikalar və real tətbiq araşdırmaları var. Açıq mənbəli SRE müsahibə hazırlıq bələdçisini də tövsiyə edirəm.

### Daniel Centlmen — Baş SR-mühəndis

Etibarlılıq mühəndisliyi dünyasına xoş gəldiniz! Biz körpü tikənlərik. Biz köməkçiyik. Hər kəsə həyatının ən yaxşı kodunu yazmağa imkan verən alət və öyrənmə imkanları vermək istəyirik. Hər kəsin kodu istehsalata qorxmadan yerləşdirə bilməsini, insident reaksiyasında iştirak edə bilməsini istəyirik.

Komandaların ehtiyaclarını bilmək vacibdir və onlar qarşılıqlı güzəştə getməlidir. Məsələn, developerlər avtomasklanmanın (autoscaling) və konteyner orkestrasiyasının necə işlədiyini bilməyə bilər. Hər şeyi bilmək məcburi deyil, amma məhdudiyyətləri, alətləri və özlərinə açıq görünürlüyü bilməlidirlər. Eyni şəkildə infrastruktur mühəndisləri frontend kodunun və tapşırıq növbələrinin sehrini bilməyə bilər, amma yük açarları, aşırı yüklənmə, avtomasklanma və avtomatik açarlardan istifadə üçün bu sistemləri necə idarə edəcəklərini bilməlidirlər. Hər iki tərəfin ehtiyaclarını öyrənin, körpü qurmaq imkanları tapın, mümkün olan hər şeyi avtomatlaşdırın.

> SR-mühəndisləri köməkçidir.

Onlar developerlərə operativ vəzifələrdən qorxmadan daha effektiv kod yazmağa kömək edir, eyni zamanda infrastrukturaya uyğun olmayan kod yerləşdirməmələri üçün operativ vəzifələri kifayət qədər yaxşı anlamağa kömək edir. Rəhbərlərə və büdcə formalaşdıran işçilərə xərclər və infrastruktur haqqında ağıllı qərarlar qəbul etməyə kömək edirlər.

### Coanna Vijntyes — SR-mütəxəssis, Google

Otaqdakı ən səs-küylü və özünə əmin insanın ən yaxşı cavabı olmaya bilər, hətta tamamilə haqlı olmaya bilər. Əminliyi dəqiqliklə qarışdırmayın, ucadan danışan səslər sizi vermək istədiyiniz sualları verməkdən çəkindirməsin. Başqalarından fərqli fikir bölüşmək cəsarət tələb edir, amma bu cür ideyaları səsləndirmək işinizin ən vacib hissəsidir. Tez-tez yeganə SR-mühəndisi olduğunuz vəziyyətlərdə olacaqsınız və təşkilatınız gözləyir ki, siz etibarlılığın və qabaqcıl təcrübənin səsi olasınız. Eyni zamanda, əgər özünə əmin və ucadan danışan insansınızsa, həmişə yavaşlayın və daha sakit səslərə fikir və problemlərini bölüşmək üçün imkan verin.

Xəta büdcəsi (error budget) olmadan irəliləyiş əldə edə bilməzsiniz. İstər SLO adlandırın, istər başqa cür — ölçülə bilən, nümayiş etdirilə bilən xəta göstəricisi olmalıdır: "Xidmətin vəziyyəti belədir." Bu büdcə müştərilərin xidmətinizi necə gördüyünü əks etdirməlidir. Rəhbərlik heç vaxt fasilə və problem istəmir. Şirkətdəki hər mühəndisin hər nasazlıq üzərində işləməsini istəyən rəhbərlər, elə eyni zamanda tək bir sorğunu belə silməyə icazə verməkdən imtina edən insanlardır. Bu strategiyaların heç biri miqyaslana bilmir.

### Fabrisio Valdner — SR-mühəndis

Rutin barədə narahat olmayın, onunla barışın. Gənc sistem administratoru olanda hər şeyi avtomatlaşdırmağa çalışırdım. Avtomatlaşdırma yaxşı şeydir, amma hər şeyi avtomatlaşdırmaq mümkün deyil. Rutinlə bacarmaq və orada qanunauyğunluq tapmaq üçün açar qərar — onu idarə etmək üçün məsul işçi təyin etməkdir. Sonra ən çətin tapşırıqları avtomatlaşdırmaq üçün layihələr yaradın.

### Qrem Poulter — SR-mühəndis, Google korporasiyası

Kömək istəməkdə daha cəsarətli olmaq, digər SR-mühəndislərdən təcrübə götürmək və layihə rəhbəri ilə birgə işləmək istərdim. Akademik mühitdən gəlmişdim, orada kiçik sistemlərlə işlənirdi və mövzuya dərindən girib "hər şeyi özün həll etmək" məntiqli sayılırdı. İlk layihəm üçün asılılıqlar və sənədləşdirmə labirintində sonsuz dərinlik axtarışında itdiyimi görəndə çaşqın qaldım, haradan başlayacağım barədə heç bir təsəvvürüm yox idi. Böyük sistemlər tez-tez bir insan üçün həddindən artıq böyükdür — həmkarları müşahidə etmək və birgə işləmə zamanı onlardan öyrənmək metanavığı çox vacibdir.

Erkən öyrənmək istədiyim başqa şey — layihə seçimi və formalaşdırma sənəti idi. Tapşırıqların yuxarıdan aşağı verildiyi şirkətdən gəlmişdim. Planlaşdırmanın daha çox aşağıdan yuxarı getdiyi mühitə keçəndə mənə uyğun olmayan, aşağı dəyərli ya da təklif olunan formada icra olunmaz layihə ideyalarının "qalıqları" qalırdı. Vaxtla hansı işin xoşuma gəldiyini anladım, üstünlüklərimi ifadə etməyi, ideyalar tapıb süzgəcdən keçirməyi, imkanlılıq və təsirin müstəqil qiymətləndirməsini aparmağı, öz meyarlarımı müəyyən etməyi öyrəndim.

### Ceymi Uilkinson — SR-mühəndis

Çoxlu bələdçidə SR-mühəndislərinin insident reaksiyası, avtomatlaşdırma, müşahidəolunanlıq (observability) və s. haqqında danışılır, sizsə maraqlanırsınız ki, SR-mühəndisləri platforma mühəndislərindən, DevOps mütəxəssislərindən ya da 1990-cı illərin klassik sistem administratorlarından nə ilə fərqlənir. Sadə: SR-mühəndisinin müəyyənedici xüsusiyyəti — sistemin müvafiq etibarlılığını ölçmək, sonra isə onu qorumaqdır. Hamısı budur.

> Bütün digər "klassik operasiya" kimi görünən fəaliyyətlər — sadəcə alət dəstindəki alətlərdir.

Növbətçilik SR-mühəndisinin işini müəyyənləşdirmir — bu, obyekt etibarlılığını qorumaq üçün vaxtaşırı zəruri olan hərəkətdir. Kodlaşdırma, avtomatlaşdırma yaxud nasazlığın qarşısını almaq üçün sistemin yenidən layihələndirilməsi bacarığı da SR-mühəndisini müəyyənləşdirmir. Sistemin etibarlılığını artırmaq üçün yaxşı öyrənilmiş metodlar sizi bacarıqlı SR-mühəndisi edir.

### Endryu Hauden — Aparıcı mühəndis

Təşkilatda SRE-nin uğuru üçün kifayət qədər çox şey etmək olar: işçi seçimi, komanda idarəçiliyi, məqsəd və vəzifələrin formalaşdırılması, aydın maraqlı tərəf gözləntiləri, struktur təşkilati dəyişiklik modeli, baş rəhbərlərlə müntəzəm görüşlər — bunların hamısı etibarlılığın artmasına təkan verir.

Amma bunu əvvəldən bilmirdim, kimsə mənə desəydi belə, yeni biliyi tətbiq edə biləcəyimə əmin deyiləm. Əvəzinə "daxil edilmiş SR-mühəndisini işlətmək" ifadəsinin qeyri-müəyyənlikdən aydın yola çevrildiyi məqam — komandam üçün strategiya müəyyənləşdirmək üzrə baş rəhbərlə birgə iş oldu. Bu strategiya məqsədi və qarşılıqlı təsir modelini aydın müəyyənləşdirdi, maraqlı tərəf gözləntilərini formalaşdırdı.

> Qısa xülasə: "Nəyə malik olduğunuzu və nə etmək niyyətində olduğunuzu kağız üzərində aydın ifadə edin, istehsalat mühitindəki problemlərə intuitiv reaksiyalara güvənməyin."

### Pedro Alves — SR-mühəndis

SRE-ni böyük şirkətə tətbiq etmək asan deyil. Əvvəlki şirkətimdə SRE toxumlarını beş mühəndisdən ibarət kiçik komanda yaradaraq əkdik. Komanda "məişət" rejimində işlədi, digər komandalarla birgə praktiki məsləhətçi kimi müxtəlif layihələr üzərində çalışdı.

Komandanın effektivliyi iki əsas amillə bağlı idi: 1) mühəndislərin geniş bacarıq dəstinə malik olması, 2) mühəndislərin şirkətdə iş stajı və kifayət qədər sosial kapitala malik olması. Bir neçə uğurlu layihədən sonra komandanın nüfuzu artdı, SRE modelinə etibar yüksəldi. Nəticələr əsasında rəhbərlik komandanın genişləndirilməsinə razılıq verdi. Ancaq bütün şirkətə təsir üçün SR-mühəndisləri komandasını şöbəyə çevirmək lazım gəldi — bu isə yalnız komandaların birləşdirici mühəndislik dünyagörüşü və strategiyası olanda mənalı idi. Bizdə bu, müşahidəolunanlığa fokuslanma idi.

### Balasundaram N — Aparıcı SR-mühəndis

Mümkün qədər çox daxili prosesi sənədləşdirin və tətbiq edin, amma hər şeyi əhatə etməyə çalışmayın. Baza prosesinin icmalını müntəzəm təkrarlayın, xüsusən insidentlər zamanı. Sənədləşdirmə tərtib olunar-olunmaz saytda yerləşdirilməlidir.

### Eduardo Spotti — Texniki direktor, Crubyt şirkəti

Peşəkar həyatımızda xoşbəxtlik yolunu axtaranda aydın vəzifə dəsti, yaxşı maaş və əla iş komandası olan rol axtarırıq. SR-mühəndisi vəzifəsi yolun başlanğıcı deyil — texniki xüsusiyyətlərin daimi öyrənilməsinin, mədəniyyət və praktika dəstini tətbiq edən komandaların yaradılmasının nəticəsidir. Maaş məsuliyyət götürmək və niyyəti həyata keçirməyin nəticəsi olacaq.

Komanda yaratmağın reseptı yoxdur, amma aktiv dinləməyi, nümunə göstərməyi, Agile prinsiplərini, DevOps dəyərlərini (culture, automation, lean, measurement, sharing — CALMS) və SR-mühəndisi rolunu birləşdirməyə çalışın. "Rol" deyirəm, çünki SRE komandasında platformanı istismar edən etibarlılıq operatorundan tutmuş, müşahidəolunanlıq, insident idarəetməsi, tətbiq performansı, biznes KPI-ları yaxud fəlakətdən bərpa üzrə mütəxəssis olan SR-mühəndisinə qədər çox rol tapmaq olar.

### Yan Bartolomyu — Aparıcı SR-mühəndis

Qeydlər aparın. Etibarlılıq mühəndisliyi o qədər çox metodu əhatə edir ki — xüsusən başlanğıcda — bütün şablon, konsepsiya, qanun, praktika, ideyaları mənimsəmək çətindir. Ona görə bilmədiyiniz hər şeyi yazın. Qeyd tətbiqi ya da şəxsi bilik bazası (məs. Obsidian) tapın, naməlum ya da maraq doğuran nəyəsə rast gələndə qeyd edin. Sonra gündəlik vaxt ayırıb həmin mövzuları öyrənin, tapdığınız məlumatı yazıb sistemləşdirin.

Bunu edərək təkcə yeni şey öyrənməyəcəksiniz, həm də istifadə edə biləcəyiniz və istinad edə biləcəyiniz ideya və konsepsiya ehtiyatı toplayacaqsınız.

### Olivye Dükeyn — SR-mühəndis, Techsys şirkəti

İlk növbədə izah etmək lazımdır ki, SR-mühəndisi DevOps mütəxəssisinin yeni adı, hətta sistem operatorunun yeni adı deyil. SRE istismar işi deyil — istismardan çox keyfiyyət yaxşılaşdırmasına yaxındır. SR-mühəndisi bütün yeni texniki konsepsiyaları bildiyi üçün dünyanı xilas edəcək superqəhrəman deyil.

Hər şey (rutina, postmortem, avtomatlaşdırma) keyfiyyət haqqında düşünmək üçün ölçülə bilər. SR-mühəndisi məhsul sahibləri ilə texniki komandalar arasında çatışmayan həlqə olacaq. SRE — komandaları əməkdaşlığa məcbur edən yeni dildir.

### Ralf Pritçard — Baş platforma mühəndisi

Heç bir sirr olmamalıdır. Proqram təminatımız və infrastrukturumuz həmişə şəffaf və anlaşılan olmalıdır. Nəyisə izah edə biləcəyimiz proqnozlaşdırıla bilən nəticələr istəyirik, hətta gözlənilməz bir şey (insident kimi) baş versə belə. Bu məqsədə çatmaq üçün baş verənlərin səbəblərini diqqətlə anlamaq lazımdır.

Monitorinq alətləriniz düzgün istifadə olunanda lazımi sübutları təmin edəcək. Uğursuzluqları qəbul edin və onlardan öyrənin, ideal halda qeyri-istehsalat mühitində. Eksperimentlər aparın, nəticələri yazın, hansı addımların atıldığını qeyd edin. Öyrənilən dərsləri tapşırıq siyahısına yazın ki, oxşar insidentlər istehsalatda rast gələndə asanlıqla işləyə biləsiniz.

### David Kaudill — Aparıcı SR-mütəxəssis, Capital One şirkəti

Uğur üçün mükəmməl SLI-yə çatmaq zəruri kimi görünə bilər. Bu mərhələdə ilişib qalmaq çox asandır, çünki bütün prosesin əvvəldən sona necə işlədiyini hələ görməmisiniz. Mükəmməl olmayan SLI-ləri olan komandalarla müntəzəm işləyirəm, amma onlar yenə də çox faydalıdır. Etibarlılıq mühəndisliyi sistemli düşüncə tələb edir, prioritetiniz komandalarınız üçün sistemin işləməsini təmin etmək olmalıdır.

> Bu, velosiped sürməyə çox bənzəyir. Bir hissəni mükəmməlləşdirməkdən daha vacibi — işlədiyiniz komandaların tam dövrü nə cür olsa da tamamlamasıdır.

Zəif SLI-si olan komanda onu düzəldə bilər. Səhv SLO-su olan komanda onu korrektə edə bilər. Xəta büdcəsini düzəltməyə çalışarkən səhvə yol verən komanda ondan dərs çıxara bilər.

### Aleks Hidalqo — Nobl9 şirkətində baş etibarlılıq müdafiəçisi, *Implementing Service Level Objectives* kitabının müəllifi

SREcon EMEA 2022 konfransındakı plenar məruzəm üçün "SR-mühəndislərinin gördüyü işlər" siyahısını topladım, nəticədə 50-dən çox aydın ayrı maddə alındı. Bu çoxdur! Sahənin nə qədər geniş (və dərin!) ola biləcəyini göstərir. Amma bu, həm də başlanğıcda SR-mühəndisinin yolunun qorxudan ola biləcəyini göstərir.

Xoşbəxtlikdən bu kimi kitablar başlamağa kömək edir, amma illər boyu mənə xidmət edən bir konkret məsləhət vermək istəyirəm: **mənalı olun**. Təşkilatın həqiqətən SRE ilə məşğul olması üçün yenidən edilməli olan işlərlə üzləşəndə çox görünə bilər. Amma məlum olur ki, əslində hamısını etmək məcburi deyil. Mənimsədiyiniz hər fəlsəfə qırıntısı, tanış olduğunuz hər alət ya da proses, oxuduğunuz hər kitabla (bu daxil olmaqla!) özünüzdən soruşun: "Bu, mənim üçün, komandam, təşkilatım və istifadəçilərim üçün nə deməkdir? Həqiqətən bunu etməyim lazımdır?"

### Effi Muzeli — Vikimediya Fondu

Əziz gələcək SR-mühəndisi, cəmiyyətə xoş gəldin! SRE — nəfəs kəsən mənzərələri (ön şüşədən) olan, bəzən güclü hisslər yaşadan uzun, dolanbaclı yoldur. İşin texniki tərəfini nə cür olsa mənimsəyəcəksiniz, amma yaxşı SR-mühəndisi olmaq təkcə texnoloji tapmacaları həll etmək bacarığı deyil. SR-mühəndislərinin adətən kifayət qədər diqqət yetirmədiyi bacarıqlar var — yaxşı ünsiyyət bacarıqları.

Fikirlərinizi düzgün ifadə etmək bacarığını yazı bacarığını təkmilləşdirməkdən başlayın. Həmkarlarınız yaxşı yazılmış layihə sənədini, aydın yazılmış postmortemi ya da faydalı transaksiya tamamlanma mesajını həmişə məmnuniyyətlə oxuyacaq. Təəssüf ki, yazı bacarıqları yalnız praktikada təkmilləşir (üzr istəyirəm, burada qısa yol yoxdur).

---

## Əlavə B: SRE-ni tərk edənlərin məsləhətləri

"SR-mühəndisi" yazılan qapını arxasınca bağlayan insanlardan, həmin qapını açmaq istəyənlərə ünvanlanmış məlumat əlavə etmək bir az qəribə görünə bilər, amma təcrübəmə görə peşəni tərk edən insanlar kənardan baxaraq əldə edilə bilən unikal görüş qazanır. Bu fikri təsdiqləmək üçün bir neçə keçmiş SR-mühəndisini tapıb onlarla söhbət etdim: indi nə ilə məşğul olurlar, peşədən getdikdən sonra nə qalır, yeni başlayan gənc SR-mühəndislərinə hansı diqqəti tövsiyə edərdilər?

### Dina Levitan

SRE təcrübəsi: Google Ads (2012–2014), Google Apps/Gmail/Calendar (2014–2017), Google Cloud SRE (2017–2018), Google SRE EDU təlim proqramı (2018–2019). SRE-dən sonra: məhsul idarəçiliyi, konsaltinq, opioid epidemiyası kimi geniş miqyaslı ictimai problemlərin həlli, COVID vaksin yayılma planlaması (JitVax qeyri-kommersiya təşkilatının qurucusu), valideynlik.

**SRE-dən götürülən dərslər.** Tək nasazlıq nöqtələrinin (SPOF) azaldılması — sistemli/qlobal və lokallaşdırılmış SPOF-ların müqayisəsi, uğursuzluğa aparan hadisələr kaskadı, yükü necə bölmək və layihədə əvvəlcədən yük bölgüsü/azaldılmasını nəzərdə tutmaq. "Hərəkətlərinizi avtomatlaşdırılmış olanlarla əvəz edin" — ekosistemin dayanıqlığını artırmaq üçün sistem və proseslərin necə tətbiq ediləcəyi. Çeklist (Instruction) — fövqəladə vəziyyətlərdə koqnitiv yükün azaldılması dəyəri (bax: Atul Qavande, *The Checklist Manifesto*). Rutinanın aradan qaldırılması — çox vaxt/enerji tələb edən, amma dəyərli olmayan sahələri müəyyənləşdirib avtomatlaşdırın. Problem həlli — "Uğursuzluq çarxı" yanaşması: birgə dərin araşdırma, beyin fırtınası ilə növbəti addımı müəyyənləşdirmək, az riskli anlarda məşq etmək.

> İlk illəri necə yaşamaq. Növbətçilik rotasiyasına qatılın — sıradan çıxmalarda "dərhal müraciət et" prinsipinə əməl edin. Problemi qalmasına icazə verməkdənsə əlavə resurs cəlb etmək daha yaxşıdır.

### Sara Smollett

Google-da on yeddi il (SR-mühəndisi, sonra korporativ tətbiqlər, təhlükəsizlik infrastrukturu, hesablar, Google Reader, Google Calendar, Spanner üzrə SRE-menecer). SRE-dən sonra: fasilə götürdü.

**Hələ də aktual sayılan dərslər.** Miqyaslama, miqyaslama, miqyaslama — təkcə xidmətlərə deyil, hər şeyə aiddir (mən Google-a girəndə ~5000, çıxanda ~190 min tam ştat işçi var idi). Skeptisizm — xidmət/məhsul/proseslərdəki mümkün nasazlıq nöqtələrini aşkarlamaq. Səhvlərdən öyrənmə — heç vaxt ciddi sıradançıxmanın boşa getməsinə icazə verməyin, düşünülmüş postmortem/retrospektivlər yazıb bölüşün. İstifadəçi rahatlığı və uçdan-uca axını nəzərə alın — sorğu onlarla (mikro)xidmətdən keçə bilər, hər birini fərqli mühəndis idarə edir; problemlərin çoxu heç kimin ümumi mənzərəni anlamamasından/məsuliyyət götürməməsindən yaranır. Kəmiyyət məlumatları — "Bunu göstərən diaqram və qrafiklərimiz var" hələ də doğrudur.

### Endryu Fonq

AOL-da sistem administratoru (Nullsoft, Winamp, Shoutcast). SRE təcrübəsi: YouTube video xidməti, Dropbox-un ilk SR-mühəndisi/SRE-menecer. SRE-dən sonra: Dropbox Infrastructure-də vitse-prezident, Vise-da texniki direktor, startap həmtəsisçisi/baş direktor.

**Texniki dərslər.** İlk prinsiplər metodundan istifadə edin. Miqyası deyil, problemi sevin — hər miqyasda maraqlı problem tapmaq olar. Vəziyyət saxlayan (stateful) sistemlərə qarşı saxlamayanlar — vəziyyət saxlamayan sistemlər SR-mühəndisinin qarşılaşdığı ən mürəkkəb texniki çətinlikdir.

**Rəhbərlik dərsləri.** Özünüzü idarə etməkdən başlayın — düşüncə tərziniz hər şeyi müəyyənləşdirir, bütün dünyanın sizə qarşı olduğuna əmin olmaq çox asandır. Öz düşüncənizi idarə edin, yalnız siz onu dəyişə bilərsiniz. Optimist olun, sinik yox. Maraq göstərin ("Bu məhdudiyyətlər niyə var?" deyə soruşun). Qələbələri qiymətləndirin, təcrübəyə minnətdar olun.

### Skott Makfiqqen

Facebook 2007–2014 (ilk tam ştatlı SR-mühəndisi), Dropbox 2014–2018 (Magic Pocket saxlama sisteminin aparıcı SR-mühəndisi). SRE-dən sonra: Sosie Wines şərab evinin qurucusu və şərabçısı.

**SRE-dən götürülən dərslər.** Effektivliyə fokuslanın — SR-mühəndisi/adi mühəndis nisbəti həmişə ikincilərin xeyrinədir, ən böyük effekti verən layihələri seçmək lazımdır. Problemləri görməzdən gəlməyin — böyük miqyasda nasazlığın səbəbi var, hər problemi araşdırın. Qapıçı olun — xidmətinizlə yanaşı nəyin yerləşdirilməsinə icazə verdiyinizi ciddi izləyin. Əlaqələr qurun — SR-mühəndisi kimi asanlıqla həmkarlardan təcrid oluna bilərsiniz, vəzifəniz əsasən kross-funksionaldır. Yol xəritələrinin erkən mərhələsinə qoşulun — ən son istədiyiniz şey, etibarlılıq və miqyaslanma tələbləri nəzərə alınmadan yaradılmış xidmətin istismarının sizə həvalə edilməsidir.

---

## Əlavə C: SRE üzrə əlavə resurslar

Kitabın məqsədlərindən biri SRE mövzusunda ən faydalı mövcud resursların siyahısını təqdim etməkdir.

### Əsas kitablar

- Beyer B., Jones C., Murphy N. R., Petoff J. — *Site Reliability Engineering: How Google Runs Production Systems* (O'Reilly, 2016).
- Beyer B., Murphy N. R., Rensin D. K., Kawahara K., Thorne S. — *The Site Reliability Workbook: Practical Ways to Implement SRE* (O'Reilly, 2018).
- Blank-Edelman D. N. — *Seeking SRE: Conversations About Running Production Systems at Scale* (O'Reilly, 2018).

Bu iki əsas Google kitabından başlamaq ümumi tövsiyədir — ikisi də pulsuz olaraq sre.google/books ünvanında mövcuddur. Amma unutmayın: hər iki kitab əhəmiyyətli dərəcədə Google-un dəyərləri, resursları və unikal mühəndislik mədəniyyəti ilə formalaşıb. Google-da işləmirsinizsə, ideyaları öz mühitinizə tətbiq edilə bilməsini tənqidi qiymətləndirməlisiniz.

### "SRE-yə yaxın" kitablar

- Adkins H., Beyer B., Blankinship P., Lewandowski P., Oprea A., Stubblefield A. — *Building Secure and Reliable Systems* (O'Reilly, 2020).
- Chen C., Murphy N. R., Parisa K., Sculley D., Underwood T. — *Reliable Machine Learning* (O'Reilly, 2022).
- Campbell L., Majors C. — *Database Reliability Engineering* (O'Reilly, 2017).

### Tədbirlər

**SREcon** — USENIX-in SRE-yə həsr olunmuş qlobal konfransı, bütün qeydə alınmış iclaslar USENIX-in YouTube kanalında pulsuz izlənilə bilər. Bundan başqa satıcıların təşkil etdiyi birgünlük tədbirlər, DevOps Enterprise Summit və All Day DevOps kimi DevOps tədbirlərindəki SRE kursları, yerli istifadəçi qrupları/görüşlər (San-Fransisko, Sietl, Google-un Nyu-York seminarları) və xaos-mühəndisliyi, buraxılış hazırlığı, insident reaksiyası kimi mövzulara həsr olunmuş nişə tədbirlər də faydalıdır.

### Video, podkast və email resursları

Bütün qeydə alınmış SREcon iclasları YouTube-da mövcuddur. Podkastlardan: *Google SRE Podcast*, *Slight Reliability* (Stiven Taunsend), *SREpath* (Aş Patel və Sebastyan Vyets). Email bülletenlərindən ən çox tövsiyə olunan — Lex Neva-nın həftəlik *SRE Weekly* bülletenidir.

### Onlayn forumlar

- r/SRE (Reddit)
- r/SRE (Discord)
- #sre kanalı, Hangops Slack
- SREcon Slack iş sahəsi
- Chaos Engineering Slack (yaxın mövzu üçün)

### Tarixi sənəd

2023-cü ilin yanvarında bir çox böyük texnologiya şirkətində işdənçıxarma dalğaları oldu, bir çox SR-mühəndisi işini itirdi. Google-dan işdən çıxarılanlar üçün xüsusi yazılan *SRE in the Real World* bələdçisi (Neyl Mörfi və Murali Suriar tərəfindən) bu dövrün ən təsirli təşəbbüslərindən biri oldu — Google-dan kənarda SRE-nin necə tətbiq edildiyinə unikal baxış təqdim edir.

### Son bir siyahı

Pavlos Ratisin tərtib etdiyi *Awesome Site Reliability Engineering* siyahısı əlavə araşdırma üçün əla resursdur.

---

## Müəllif haqqında

Devid N. Blank-Edelman Microsoft-da texniki proqram meneceri kimi çalışır, işində etibarlılıq mühəndisliyi və müasir istismar metodlarına xüsusi diqqət yetirir. Böyük çoxplatformalı mühitlərdə SRE/DevOps/sistem administrasiyası sahəsində təxminən qırx illik təcrübəyə malikdir. O, həmçinin USENIX tərəfindən dünya üzrə keçirilən məşhur SREcon konfranslarının həmtəsisçilərindən biri, *Seeking SRE* (2018) kitabının redaktoru-tərtibçisi və *Automating Systems Administration with Perl* (2017) kitabının müəllifidir.

---

Kitabın son səhifəsini çevirəndə bir sual qalır ortada: **siz SRE yolunda hansı "virtual hədiyyəni" özünüzlə aparacaqsınız?**
