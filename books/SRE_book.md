# SRE nədir və o haradan gəlib?

Salam! Bu yazıda "SRE" sözünü hər yerdə eşidib, amma tam nə demək olduğunu bilməyənlər üçün bir şey hazırladım — Google-da doğulmuş, indi bütün sənayeni formalaşdıran bu anlayışı sadə dildə açacağıq. Gəlin başlayaq.

## SRE nədir?

SRE — **site reliability engineering**, yəni informasiya sistemlərinin etibarlılığını təmin etmə mühəndisliyi. Bu sahənin ən yaxşı tərifi belədir:

> SRE — təşkilata öz sistemlərinin, servislərinin və məhsullarının uyğun etibarlılıq səviyyəsinə sabit şəkildə çatmasına kömək edən mühəndislik fənnidir.

Bu tərifdə üç söz var ki, onları düzgün anlasan, SRE-nin nə olduğu barədə kifayət qədər tam təsəvvür alırsan. Gəl əvvəl özün fikirləş — bu tərifi bir daha oxu və ən vacib üç sözü seç. Sonra mənim seçimimlə müqayisə et.

### 1. Etibarlılıq (Reliability)

Bu, ən açıq seçimdir. Etibarlılıq SRE-nin mərkəzindədir (adında birbaşa yazılıb). Fikirləş: şirkət ən müasir xüsusiyyətlərə malik proqram təminatına milyonlar xərcləyə bilər, əla satış komandası yığa bilər, gözəl dəstək xidməti qura bilər — amma məhsul müştəri istifadə etmək istəyəndə işləməzsə, bütün bu pul və əmək boşa gedir.

Etibarlılıqla bağlı problemlər yarananda şirkət itirir:

- **Pul** — xüsusilə sistem gəlir üçün kritikdirsə.
- **Vaxt** — planlaşdırılan iş əvəzinə komanda sıradan çıxma səbəblərini həll edir.
- **Reputasiya** — insanlar keyfiyyətsiz görünən xidmətdən imtina edib rəqibə keçir.
- **Sağlamlıq** — daimi gərginlik, gecə oyanmalar, ailəyə vaxt qalmaması işçilərin sağlamlığına ciddi zərbə vurur.
- **İnsanlar** — bu sahədə hamı bir-biri ilə danışır. Şirkətdə daimi avral olduğu bilinsə, yeni işçi tapmaq çox çətinləşir.

### 2. Uyğunluq (Sufficiency)

SRE mühəndislərinin əməliyyat metodları haqqında müzakirələrdə vurğuladığı əsas fikirlərdən biri budur: **100% etibarlılıq nadir hallar istisna olmaqla, nə arzuolunan, nə də mümkün hədəfdir.** Bizim bir-birinə bağlı dünyamızda asılılıqların (dependency) hamısının 100% etibarlı olması demək olar ki, mümkün deyil. Bəzən (amma həmişə yox) düşünülmüş planlaşdırma və kodla asılılıqlardan daha yüksək etibarlılıq səviyyəsinə çatmaq olar.

Bunun əvəzinə SRE sahəsi **SLI/SLO** (service level indicators / service level objectives — xidmət səviyyəsi göstəriciləri/hədəfləri) kimi metodlara fokuslanır ki, bu da sənə sistemin uyğun etibarlılıq səviyyəsini müəyyən etməyə, bunu ötürməyə və ona doğru işləməyə kömək edir.

### 3. Sabitlik (Stability)

Bu söz tərifə sonradan əlavə olunub — aydın olanda ki, uğur üçün əməliyyat metodları sabit olmalıdır. Sabitlik "sağlamlıq itkisi" problemini xatırladır. Etibarlı sistemləri insanlar yaradır. Şirkətdə insanlar tükənibsə, ailə/dostlarla vaxt keçirə bilmirsə, özlərinə qayğı göstərə bilmirsə — etibarlı sistem yarada bilməzlər. Bunu çoxları öz təcrübəsində öyrənir; mümkünsə, bu siyahıya sən özün düşmə.

> Tərifdə daha bir neçə söz var — mühəndislik, fənn, kömək, təşkilat — amma bunlar ayrı mövzudur, başqa yazıda toxunacam.

---

## SRE haradan gəlib?

SRE-nin yaranma tarixi Google-la bağlıdır (təxminən 2003-cü il). Amma daha maraqlısı odur ki, bu anlayış ilk dəfə geniş auditoriyaya necə təqdim olunub.

31 may 2014-cü ildə, Santa-Klara şəhərində, ilk **SREcon** konfransında Ben Treynor Sloss (SRE-nin yaradıcısı) "Keys to SRE" adlı əsas məruzəni edib. O məruzədə göstərdiyi bir slayd bütün sahəni anlamaq üçün açar rolunu oynayıb. Doqquz ildən sonra da həmin siyahının çoxu köhnəlməyib — sadəcə bəzi nüanslar (və ən azı üç kitab) əlavə olunub.

---

## SRE, DevOps-la necə bağlıdır?

Bu, SRE haqqında danışanda mütləq gündəmə gələn sualdır: SRE ilə DevOps arasında fərq nədir? Bir şirkətdə hər ikisi ola bilərmi? Buna üç hissəli cavab var.

### Hissə 1 — SRE, yüksək səviyyəli DevOps təcrübəsidir

Google-un öz izahına görə SRE, DevOps fəlsəfəsinin bir realizasiyasıdır. Amma bu müqayisə tam dəqiq deyil — çünki DevOps konkret metodologiya və alətlərlə məhdudlaşmamağa çalışan, daha çevik bir yanaşmadır. Yenə də, bu iki sahə arasında kəsişmə nöqtələri danılmazdır.

### Hissə 2 — SRE etibarlılıqdır, DevOps çatdırılmadır (delivery)

Müəllif DevOps-u bir sözlə ifadə etməyə çalışıb və uğursuz olub — sonra Donovan Braun-dan cavab alıb: DevOps-un mahiyyəti **çatdırılmadadır** (dəyərin müştəriyə çatdırılması, proqram təminatının çatdırılması və s.).

> SRE — etibarlılıqdır. DevOps — çatdırılmadır.

### Hissə 3 — Fərq diqqətin istiqamətindədir

Tom Limonçelli-nin modeli bunu ən yaxşı izah edir:

1. **DevOps** developer-in noutbukunda kod yazmasından başlayır. DevOps mühəndisi kodu production-a (istehsal mühitinə) çatdırmaq üçün lazım olan işi görür. Diqqət noutbukdan production-a doğru yönəlib. Ona görə CI/CD (continuous integration/continuous delivery — davamlı inteqrasiya/davamlı çatdırma) DevOps alət dəstinin əsasını təşkil edir.
2. **SRE** əksinə, production-dan başlayır. SRE mühəndisi soruşur: etibarlı production mühiti üçün nə lazımdır? Bu sualı hər addımda geriyə doğru təkrarlayaraq, sonda developer-in noutbukuna qədər gedib çıxır.
3. **Eyni alət, fərqli məqsəd.** Hər iki sahə eyni CI/CD pipeline-ı qura bilər, amma fərqli səbəblərlə. Monitorinq sistemi hər iki tərəfdən aktiv qurula bilər — sadəcə fərqli şeyləri izləmək üçün.

Bu, əvvəlki sualın cavabıdır: bəli, SR-mühəndisləri və DevOps-mühəndisləri eyni təşkilatda birgə mövcud ola bilər (və olmalıdır) — münasib şərtlər altında (təşkilatın ölçüsü, mədəniyyəti, real ehtiyacları).

---

## Nəticə

İndi kimsə səndən "SRE nədir?" deyə soruşsa, cavabın hazırdır: **etibarlılıq, uyğunluq və sabitlik** üzərində qurulan mühəndislik fənni — production-dan başlayıb geriyə doğru düşünən yanaşma. DevOps isə əksinə, noutbukdan production-a doğru irəliləyir. İkisi rəqib deyil, tamamlayıcıdır.

Sən hansı tərəfdəsən — çatdırılma sürəti, yoxsa etibarlılıq?

# SR-mühəndisinin mentaliteti necə formalaşır?

Salam! Bu yazıda SRE kitabının 2-ci fəslinə baxırıq — SR-mühəndisini digərlərindən fərqləndirən əsas şey: **mentalitet**. Bu, alət yığını yox, dünyaya baxış tərzidir. Gəlin başlayaq.

Hər şey maraqdan başlayır. İki sual bütün fəsli idarə edir: **sistem necə işləyir?** və **onda niyə sıradan çıxır?** SRE-də əsas sual "necə işləməli idi?" yox, "istehsal mühitində real olaraq necə işləyir?" sualıdır.

Kiçik nümunə: client tətbiqin backend-i databaza qoşulur. Bəs qoşula bilməyəndə nə olur? Qoşulmamalı olan bir neçə instance eyni anda databaza müraciət edəndə nə baş verir? Databaza normal cavab vaxtından 20%, 34%, 60% gec cavab verirsə nə olur? Kod hansı databaza qoşulduğunu haradan bilir? Gizli asılılıqlar (dependency) nələrdir? Bu cür suallardan ibarət bütöv fəsil yazmaq olar — çünki sistemin real işləmə tərzini anlamaq, çox maraqlı adamların işidir.

---

## Ssenari: kabel, server, kaskad

Dave Rensin-in təklif etdiyi ssenariyə baxaq.

Pat data mərkəzinə girib güc kabelinə ilişir. (Oscar həmin kabeli yeni server quraşdırılarkən yerdə saxlayıb.) Kabel çıxır, server enerjisiz qalır.

Server söndükdə, o serverdə işləyən databaza instance-i (Susan-ın qurduğu avtomatlaşdırma ilə yaradılmışdı) sıradan çıxır. Bu databazada tətbiq üçün vacib data fraqmenti saxlanılırdı — fraqmentasiyanı Yasmin konfiqurasiya edib.

Tətbiqin backup prosesi (Niraj yazmışdı) yavaş-yavaş bloklanmağa başlayır — thread-lər lazım olan datanı gözləyərək asılı qalır. Sara-nın yazdığı client tətbiqin cavab vaxtı artmağa davam edir, çünki backend-ə qoşulmalar asılı qalıb sonra timeout-la kəsilir. Liz-in qurduğu monitorinq sistemi problemi görüb komandaya bildiriş göndərir, amma bəzilərinə gecikmə ilə çatır. Nəhayət, Sam-ın konfiqurasiya etdiyi load balancer hər tərəfə "500 Error" paylamağa başlayır.

Saytdan widget almaq istəyən müştəri əsəbləşib vaz keçir, rəqibdən alır.

**Sual: bu sıradan çıxmaya (və satış itkisinə) kim məsuliyyət daşıyır?**

> Fikirləş, müzakirə et. Cavab bir qədər sonra.

---

## Miqyası kiçilt, bütöv şəklə bax

Fəslin əvvəlindəki databaza sualları çaşdırıcı ola bilər — çünki çox dar bir detaldan başladım. Databaza qoşulmasının kiçik detallarına fokuslanmaq əsaslı ola bilər, amma "sistem necə işləyir?" deyəndə mən daha çoxunu nəzərdə tuturam:

- tətbiqin özü, onun development və deployment prosesləri;
- bütöv servis — tətbiq kodu, həm də köməkçi avtomatlaşdırılmış proseslər (log toplayıcılar, təmizləmə skriptləri);
- servis və onun işlədiyi infrastruktur;
- infrastrukturun fiziki əhatəsi (dünyanın neçə regionunda işləyir?) və regionlar arası əlaqələr;
- servis və infrastrukturun işlədiyi sosiotexniki kontekst;
- bu kontekstin daxil olduğu təşkilati kontekst.

SR-mühəndisi həm böyük, həm kiçik şəklə baxır. Sistemi anlamaq üçün tez-tez mikro səviyyəyə zoom edir, sonra makro səviyyəyə qayıdır. Lazım olan detal səviyyəsində problemi araşdırmağa hazırdır.

### Feedback loop yaratmaq və inkişaf etdirmək

Etibarlılıq feedback loop (əks-əlaqə dövrü) sayəsində artır. SR-mühəndisinin işi — mümkün olan hər yerdə belə bir dövr yaratmaq və inkişaf etdirməkdir. SRE mentalitetli insan həmişə bu iterativ hərəkəti dəstəkləyəcək yer axtarır.

---

## Müştəriyə fokuslan

"Sistem necə işləyir, niyə sıradan çıxır" sualına daha bir açıdan baxmaq lazımdır: **müştəri nöqteyi-nəzərindən** necə işləyir? Müştəri nöqteyi-nəzərindən niyə sıradan çıxır?

> Etibarlılıq komponent tərəfində yox, müştəri tərəfində ölçülür.

Bunu izah etmək üçün kiçik təcrübə: fərz et 100 web-server ayırmısan, servisin frontend pool-u kimi işləyir. Data mərkəzində problem yaranır — güc problemi və ya səhv firmware, nəticədə 14 server (metaforik olaraq) "yanır", işləmir. İndi 86 server işləkdir, 14-ü ölüb.

**Test:** 86 server işlək, 14-ü avariyadadır. Bu vəziyyət:

1. problem deyil, sakit vaxtda həll edilə bilər;
2. dərhal diqqət tələb edir, hər şeyi dayandırıb bununla məşğul olmaq lazımdır;
3. eksistensial böhrandır — gecə saat ikidə olsa belə, top-menecerlər daxil hamını yığıb problem həll olunana qədər buraxmamaq lazımdır.

Cavab? **Vəziyyətdən asılıdır.** Sistem elə qurulubsa ki, heç bir müştəri problemi hiss etmir — 1-ci variant düzgündür. Servisin zəifləməsi müştəriyə görünürsə — 2-ci variant. Sistem elə qurulubsa ki, servis dayanıb, kritik anda gəlir dayanır — deməli, CEO-nu evdə oyadacaqsan.

Verilən məlumat özü düzgündür (86 işlək, 14 ölü) — məhz bunu monitorinq sistemi ilk növbədə göstərəcək. Amma müştəriyə fokuslanan SRE mentaliteti ilə düzgün cavaba gəlirsən: **"asılıdır."** Bu da onu deməkdir ki, monitorinq sistemi problemi müştəri nöqteyi-nəzərindən əks etdirməlidir.

---

## Cavab: sistem

Yuxarıdakı kabel ssenarisinə qayıdaq — kim məsuliyyət daşıyır?

**Cavab: sistem.**

Konkret bir insanı günahlandırmaq nə problemi daha yaxşı anlamağa, nə də düzəlişə haradan başlamağa kömək edir. Bu ssenari göstərir ki, SR-mühəndisinin mentalitetinin ən vacib komponenti **sistem düşüncəsidir**.

Bəzi oxucular deyəcək ki, bu nümunə qeyri-real və uydurmadır — eyni anda həm hamı, həm heç kim günahkar ola bilməz. Qismən haqlısınız.

Amma 2018-ci ildə Microsoft-un ABŞ-ın cənub-mərkəz bölgəsindəki nasazlığına (ən ciddi hadisələrdən biri) bax. Rəsmi açıqlamalara görə, hava şəraiti elektrik kəsintisinə səbəb olub, bu da data mərkəzlərinin soyutma sistemində nasazlıq yaradıb. Bu, avadanlıq problemlərinə, sonra server və servis sıradan çıxmalarına səbəb olub — nəticədə region xaricindəki əsas servislərə də təsir edən gözlənilməz kaskad effekti yaranıb (məsələn, Outlook-un retry məntiqindəki xətalar vəziyyəti daha da pisləşdirib).

Hesabatı oxuyanda dəfələrlə diksinəcəksən — çoxlu ayrı komponent düz işləyib, amma bütöv sistem çöküb.

Növbəti təbii addım — səbəb-nəticə zəncirini araşdırmaq və Microsoft-un nə etməli olduğunu düşünmək. San-Antonio-dakı pis hava mı bütün dünyada servisləri saldı? Soyutma problemi Outlook-un mesaj serverlərinə DDoS həyata keçirməsinə səbəb oldu? Patoloji dar baxış "problem HVAC-dır, 2018-in qalan hissəsini soyutma sisteminə həsr etməli idilər" nəticəsinə gətirər — gülüncdür, elə deyilmi?

Müəyyən nöqtədə eyni nəticəyə gələcəksən: **məsuliyyət sistemdədir.**

---

## Münasibətlər — insanlarla və şeylərlə

SR-mühəndisinin mentaliteti müştərilərlə müəyyən növ münasibətlə də xarakterizə olunur. Bir neçə əlavə münasibət növünə baxaq.

### Digər insanlarla

SR-mühəndisləri **daim əməkdaşlıq edir.** Etibarlılığın real dünyadakı təzahürü — komanda işidir. Müxtəlif komandalarla çiyin-çiyinə işləmədən bu işi görmək mümkün deyil. SRE mentalitetində əməkdaşlıq standartdır — həm də müştərilərlə birgə, etibarlılıq mövzusunda.

> Nevrotipik olmayan (məsələn, DEHB-li) insanlar bu sahədə çox güclü ola bilər — kiminsə fikrincə, DEHB bu iş üçün əla uyğunlaşma yaradır. Əgər sən nevrotipik deyilsənsə və etibarlılıq mühəndisliyi ilə maraqlanırsansa — xoş gəldin!

### Uğursuzluqlara və xətalara münasibət

SRE mentaliteti xüsusilə xəta və uğursuzluqlara münasibətdə fərqlənir. Xəta axtarılmır, amma **xəta öyrənmə şansı kimi görülür.**

Bir hekayə: SREcon konfransında naharda tanımadığım biri yeni qurduqları CI/CD platformasından danışırdı — xüsusilə xətaları azaltmaq, ideal halda tamamilə aradan qaldırmaq üçün əlavə etdikləri funksiyalarla fəxr edirdi. O gedəndən sonra John Looney dedi: "Mən belə platforma qursaydım, qəsdən bir neçə xəta buraxardım. Servisimin harada zəif olduğunu bilmək istərdim."

Bu fikir SR-mühəndislərinin xətaya münasibətini göstərir: xəta düşmən deyil. Xəta sistemdə var idi, həmişə də olacaq. Xətaları **aşkar etmək** lazımdır, təkcə aradan qaldırmaq yox — çünki bu, sistemi anlamağa xidmət edir.

### Sahiblik (ownership)

SR-mühəndisləri sistemin hər guşəsini araşdıracaq — problemi tapmaq üçün, ya sadəcə anlamaq üçün. "Bu kod mənim deyil, problem mənim deyil" — bunu nadir eşidəcəksən. Servisdə problem varsa, bu onların problemidir, hara aparırsa, ora gedəcəklər.

> SRE-də məşhur bir kəlam var: "heç bir kabuslu qəbiristanlıq" (no haunted graveyards). Yaxşı anlaşılmamış sistem problemləri gizlədə bilər — bunlar ən yersiz anlarda çıxıb səni izləyəcək.

Bunun nəticəsi — SR-mühəndisləri adətən **universaldır** (Narayan Desai buna "ixtisaslaşmaya qarşı müdafiə" deyir). Etibarlılıq — sistemin **emerjent xüsusiyyətidir** (təhlükəsizlik kimi). Emerjent xüsusiyyətlərlə işləmək problemi harada, nə vaxt yaransa da həll etməyi tələb edir.

### Yak qırxımı (yak shaving)

SR-mühəndisliyi mentalitetinin bir zəif tərəfi də var — **"yak qırxımına"** meyillik. Bir tapşırıq üçün proqram qurmalısan → bunun üçün ümumi kitabxananı yeniləməlisən → bunun üçün OS yenilənməlidir → yeni OS versiyası üçün disk yeri lazımdır → disk yerini boşaltmaq üçün resurs idarəetmə proqramını yeniləməlisən → yeni versiya virtual şəbəkə konfiqurasiyanla uyğun gəlmir → ...

Nəticədə əlində elektrik qırxım maşını, qarşında isə yak durur. Sahiblik hissi və "problemi harada olsa da tap" instinkti bəzən bizi yak qırxımına aparır. Vaxtla nə vaxt yak qırxmağın vacib olduğunu, nə vaxt olmadığını daha yaxşı ayırd edəcəksən.

---

## Suallar necə dəyişir

SRE-də dərinləşdikcə əsas suallar da təkamül edir:

- **"Sistem necə işləyir?" → "Sistemi miqyaslandırsaq necə işləyəcək?"** Servisləri miqyaslandırmaq SR-mühəndislərinin əsas üstünlüklərindən biridir — amma böyük miqyasdan başlamaq şərt deyil, kiçik sistemlərlə başlamaq tövsiyə olunur.
- **"Sistem necə işləyir?" → "Sistem daha az əməliyyat yükü ilə necə işləyə bilər?"** Burada **rutin** (toil) problemi ortaya çıxır. SR-mühəndisləri rutin işə demək olar allergikdir — onu aşkar edib mümkün qədər azaltmağa çalışırlar.
- **"Sistem necə işləyir?" → "Sistem daha çox insan üçün etibarlı işləyə bilərmi?"** — bura empatiya, "dünyanı yaxşılaşdırıb başqalarını da dəvət etmək", "bar-ı aşağı salmaq" kimi fikirlər daxildir.
- **"Niyə sıradan çıxır?" → "Servis uğurlu olanda sistem niyə sıradan çıxır?"** Uğur da etibarlılıq üçün eyni qədər təhlükəli ola bilər — müştəri üçün xəta ilə yükün öhdəsindən gələ bilməmək arasında fərq yoxdur.
- **"Niyə sıradan çıxa bilər?" → "Nə vaxt lazım olduğu kimi işləməyi dayandıracaq?"** Hər sistemin bir gün istifadə imkanları tükənir. SR-mühəndisi bu prosesi izləyib, sistem tükənmədən onu (ideal olaraq daha yaxşısı ilə) əvəz etməyi düşünür.

---

## Sona qədər

SR-mühəndisinin mentaliteti — uzun oyun üçündür. Sistem düşüncəsi, müştəriyə fokus, xətaya öyrənmə fürsəti kimi baxış, sahiblik hissi — bunların hamısı qat-qat inkişaf edir, illər boyu formalaşır. Konkret insanı günahlandırmaq asandır, amma cavab həmişə eynidir: **sistem.**

Sən öz komandanda son sıradan çıxmanı necə izah etdin — insan, yoxsa sistem?

# SRE mədəniyyəti nədir — və niyə bu qədər çətin izah olunur?

Salam! Bu yazıda SRE kitabının 3-cü fəslinə baxırıq. Mövzu — **mədəniyyət**. Qəribədir: hamı "mədəniyyət" sözünü işlədir, kontekstdə hamı anlayır, amma kimsə dəqiq tərif istəsə, çətinliyə düşürsən. Gəlin başlayaq.

Müəllif üç çətinlikdən danışır: mədəniyyəti tərif etmək çətindir, SRE mədəniyyətini digər mədəniyyətlərdən (DevOps, sistem administratorları) ayırmaq çətindir, və ümumiyyətlə bu mövzunun niyə vacib olduğunu izah etmək çətindir. Amma bunlar müəllifin problemidir — bizim üçün maraqlısı: **niyə SRE mədəniyyəti sənə aid olmalıdır?**

---

## Xoşbəxt balıqlar, bağışlayın, insanlar

SRE mədəniyyəti niyə vacibdir? Çünki komandandakı SR-mühəndislərinin inkişaf etməsinin yeganə yolu — onlara lazım olan mühiti anlamaq və yaratmaqdır. Yeni akvarium balığı aldığında eyni narahatlığı yaşayırsan: nə yeyir, su hansı temperaturda olmalıdır, akvariumda başqa nə olmalıdır, ölçüsü nə qədər olmalıdır ki, rahat yaşasın.

> Özündən soruş: hansı şərait, hansı mühit SR-mühəndislərini ən çox xoşbəxt edər? Bu sualı həm təşkilat, həm fərd səviyyəsində daim vermək lazımdır.

Sosioloq Ron Westrum mədəniyyəti belə tərif edir: "təşkilatın qarşılaşdığı problemlərə və imkanlara reaksiya modeli." Bu tərif adi danışıq dilindəki "mədəniyyət" anlayışından dərindir — çoxumuz mədəniyyəti sadəcə ümumi davranış və dəyərlər kimi görürük.

---

## SR-mühəndisləri üçün münbit mühit necə yaradılır?

Sirli bir düstur yoxdur. Müəllif təklif edir: 2-ci fəsldəki mentalitet keyfiyyətlərinin hər birini yenidən oxu, hər bölmədən sonra soruş — "bu keyfiyyəti inkişaf etdirmək üçün hansı şərait lazımdır?" Bu, "mədəniyyət yaratmaq oxucunun tapşırığıdır" kimi səslənə bilər, amma səbəbi var: **mədəniyyət çox situativdir, hər təşkilat üçün fərqlidir.**

Konkret nümunə: [[sr-muhendisinin-mentaliteti]] fəslində gördük ki, SR-mühəndisləri rutinə (toil) qarşı demək olar fizioloji ikrah hiss edir. Sağlam SRE mədəniyyəti bunu belə dəstəkləyir:

- planlaşdırma zamanı rutindən qurtulmağı **aydın məqsəd** kimi formalaşdıraraq;
- rutindən qurtulmanı komanda daxilində **qeyd edərək** (ayın ən yaxşı rutin-döyüşçüsü mükafatı?) və bunu rəhbərliyə açıq şəkildə çatdıraraq;
- rutini aradan qaldıran alət və platformaları **araşdıraraq və yaradaraq** — açıq mənbəli alətlərə icazə verilirsə, ekosistemdə nə var, öyrən; "hər şey öz evimizdə yaradılmalıdır" prinsipi varsa, oxşar alətləri özün yarat.

Komanda yoxdursa, təkbaşına və ya bir yoldaşla işləyirsənsə — təqvimində vaxt ayır, konkret bir rutin problemi həll et. Sonra **öz nəticəni bölüş.** Bilirəm, "öz işini göstərmək" bəzilərinə xoşagəlməz görünür — səssizcə arxa planda yaxşılaşdırma etmək daha rahatdır. Amma özün qeyd etməsən, heç kim etməyəcək. Bu göstərmə, SRE yolunda ilk addımların uğuruna ciddi təsir edir.

> Hər hansı yaratdığın SRE mədəniyyəti (qəsdən və ya təsadüfən) **maraq** (curiosity) təşviq etməlidir. Bu, ən vacib imperativdir — maraq varsa, yenilik özü gəlir.

---

## Mədəniyyət — nəqliyyat vasitəsi kimi

İkinci səbəb bir az daha praqmatikdir. Joseph Bironas bunu **"nəqliyyat"** adlandırıb — mədəniyyət, təşkilatı (yaxud özünü) istədiyin nöqtəyə aparan vasitədir. SR-mühəndislərinin real işi (məsələn, etibarlılıq üzərində) təşkilata birbaşa fayda verir. Əlavə olaraq, düzgün SRE mədəniyyəti yetişdirsən, bu da təşkilata müsbət təsir edir — dünyanı hərəkətə gətirən başqa bir rıçaqdır.

### Yeni işçinin ilk tapşırıqları

Müəllif universitetdə komanda rəhbəri olanda yeni işçilərə iki tapşırıq verirmiş:

1. Onlayn sənədləşmədə nə çatışmır, nə anlaşılmır — tap və yaxşılaşdır.
2. **"Kart günü"** — şəbəkədəki bütün maşınların elektron bazasını binanın hər yerini gəzib real vəziyyətlə tutuşdurmaqla yoxla.

Birinci tapşırığın bütün üstünlükləri var idi: yeni işçi sənədləri dərindən öyrənir, standartları mənimsəyir, dərhal faydalı iş görür. İkinci tapşırıq yorucu görünsə də, yeni işçini şəbəkənin hər guşəsi, hər real istifadəçi ilə tanış edirdi — infrastrukturun necə təşkil olunduğunu **əl ilə toxunaraq** öyrənirdilər.

> Yeni işçinin ilk layihələri çox vaxt təşkilatın mədəniyyətini əks etdirir — ona görə diqqətlə seç.

Sadə nümunə: **sənədləşmə.** Hər SR-mühəndisinin sənəd əskikliyi ucbatından etibarlılığın necə zərbə aldığına dair ən azı bir hekayəsi var. Bu bilgi mədəni imperativə çevrilir: **"iş sənədləşdirilməyənə qədər bitməyib."** Bu düşüncə tərzi ilə hərəkət edən SRE komandaları bütün təşkilatı daha yaxşı sənədləşməyə sövq edir. Budur — mədəniyyət nəqliyyat vasitəsi kimi işləyir.

---

## SR-mühəndisi nə olmalıdır, nə etməlidir?

"Mədəniyyət nəqliyyatdır" fikrini qəbul etsən, tez-bir özünütəyin sualları ilə üzləşəcəksən. Məsələ ikinci və üçüncü dərəcəli nəticələrə əsaslanır — bir hərəkət nəyəsə təsir edir, o da başqa şeyə, sonda istədiyin nəticəyə gətirib çıxarır. Çətinlik ondadır ki, **hara çatmaq istədiyini özün qərar verməlisən.**

Kimsə desə "nəqliyyat vasitəsi tap", ilk sualın olar: "Hara getmək istəyirsən, niyə lazımdır? Qayıq lazımdır? Sürətli çatmaq lazımdır? Neçə adam gedəcək?" Bu sualları axşama qədər vermək olar. SRE-nin effektiv olması üçün bu ekzistensial suallara cavab tapmaq lazımdır.

"Mən SRE-ni necə görmək istəyirəm?" (fərd üçün) və "SR-mühəndislərimiz nə etməlidir?" (təşkilat üçün) — bunlar kitabın sonrakı fəsillərində daha ətraflı işlənir. İndilik fərz edək ki, bu suallara cavabın var və indi onu münbit mədəniyyətə necə çevirmək lazım olduğunu araşdırırıq.

---

## İstədiyin mədəniyyəti necə formalaşdırırsan?

Karl Sagan 1980-ci ildə "Cosmos" serialında deyib: "Sıfırdan alma piroqu bişirmək istəyirsənsə, əvvəlcə Kainatı ixtira etməlisən." Sadə piroq belə çox sadə komponentlərdən (un, şəkər, yağ, meyvə) ibarətdir, onlar da daha kiçik elementlərdən, sonda hidrogen atomlarına qədər gedir.

Bu sitat mədəniyyət qurarkən faydalıdır — obyektləri kiçik parçalara bölməklə yanaşı, **onları birləşdirən proseslərə** fokuslanmağa kömək edir. "Meyvə ağacı böyütmək üçün nə lazımdır?" sualı səni inanılmaz uzun yola aparır. Bənzər şəkildə, "etibarlı və faydalı development mühiti üçün nə lazımdır?" sualı tez bir neçə lövhə dolusu cavaba çevrilir.

Bu məşqi real lövhə ilə sınasan (tövsiyə olunur), maraqlı bir şey baş verə bilər.

### Bəs biz pis adamlarıqmı?

Bəzən lövhəni doldurduqdan sonra geri baxıb görürsən ki, prioritet siyahısında az arzuolunan yanaşmalar var — və ya SRE dəyərlərindən biri **tamamilə yoxdur.** Bu, əslində **yaxşı xəbərdir** — indi planlarında SRE mədəniyyəsinin çatışmadığına dair aydın siqnal var. SR-mühəndisləri aydın siqnallarla uğur qazanır — bu problemi həll etmək üçün SRE-dən istifadə et.

Nəticədə lövhədə belə sözlər görə bilərsən: **özünəxidmət, dəqiq sənədləşdirilmiş, genişlənə bilən, praktiki icra oluna bilən/müşahidə oluna bilən, istehsalı əks etdirən, əlçatan.** Bu keyfiyyətlərə can atmaqla SRE mədəniyyət qatını axtarırsan. Bu qatı tapdıqdan sonra sual dəyişir: **"bu qatın həyatımızda daha çox olmasını necə təmin edirik?"**

Təbrik olunursan — mədəniyyət yaratmağa başlamısan. Mədəniyyət, etibarlılıq kimi, **emerjent xüsusiyyət** ola bilər.

---

## Konkret olaraq haradan başlamaq?

Google-ın ilk SR-mühəndislərindən John Reese-in fikri: SRE mədəniyyəti "fabriki" qurmaq istəyirsənsə, ən yaxşı yol — **insidentlərə reaksiya və onların təhlilinə** diqqətlə fokuslanmaqdır. İnsidentlər (aradan qaldırılması, təhlili, icmalı, qarşısının alınması) — Sagan-ın "meyvə ağacı" sualının SRE analoqudur.

> **Sizif dumana baxırdı** — burada gizli fərziyyə var: sən (yaxud təşkilatın) həqiqətən etibarlılığı artırmaq istəyirsən, statuskvonu qorumaq yox. Həmişə belə olmur. Bu vəziyyətə düşəndə özünə bu sualları ver: Hansı siqnallar mənə bunu deyir? Daha geniş kontekst nədir (təşkilati, maliyyə, siyasi)? Hansı asılılıqlar və stimullar var? Hansı rıçaqları birbaşa, hansını dolayı işlədə bilərəm?

İnsidentlər özləri stimul rolunu oynayır. Sənədləşmə əskikliyi ucbatından uzanan kəsintilər — komandanı SR-mühəndislərinin sənədləşməyə rəhbərlik etməsi qərarına gətirə bilər.

### Xəbərdarlıq: "pager meymunu" tələsi

İnsident təhlili güclü mədəniyyət yaratma vasitəsidir, amma bir qeyd-şərtlə. SR-mühəndisləri təşkilatda **əsasən** insident idarəetməsi ilə məşğul olsalar — xüsusən başqa komandalarla qarşılıqlı əlaqə olmadan — nəticə: SR-mühəndisləri **"pager meymunlarına"** çevrilir, işi gecə saat ikidə skript oxumaqdan ibarət olur. Bu nəzəri xəbərdarlıq deyil — müəllif bunu görüb, hətta ən xeyirxah niyyətlə belə baş verə bilər.

Ən vacib xəbərdarlıq sualı: **"kim ağıllanır, bununla nə edirik?"** İnsident icmalları yeni, faydalı bilgi verirmi? Bu bilgidən **kim öyrənir?**

- Cavab "yalnız SR-mühəndisləri" — birinci xəbərdarlıq işarəsi. Dayan, bu problemi həll et — mədəniyyət geriyə gedir.
- Cavab "SR-mühəndisləri və digər mühəndislik heyəti öyrənir" — sonra sual: **bu bilgi ilə nə edilir?** Cavab "demək olar heç nə" — ikinci xəbərdarlıq. Burada SR-mühəndislərinin **giriş və dəyişiklik etmə imkanına** dair məsələ var — sadəcə "giriş və hava ilə oynamaq" yox.

> Ən qısa profilaktika strategiyası: **"danış, xüsusən prosesin erkən mərhələsində."** Nə istədiyini, nə istəmədiyini aydınlaşdırdıqdan sonra, bunu tez-tez və aydın şəkildə hərəkətlərinlə bildir.

---

## Yaranmaqda olan mədəniyyəti necə inkişaf etdirmək olar?

Müəllif iki üsul təklif edir.

### 1. "Kitab klubu" və ya "məzunlar seminarı"

Çox təşkilat "Ayın postmortemi" və ya "Ayın layihə sənədi" toplantıları edir — maraqlı qrup bir hadisəni yaxud arxitekturanı diqqətlə öyrənib müzakirə edir. Vacib qeyd: bu müzakirə adi insident icmalından **ayrı** olmalıdır — rəhbərlik, məsuliyyət və emosional yük ucbatından obyektiv öyrənmə çətinləşir.

Prosedur sadədir: təşkilatçı müzakirə mövzusu seçir, materialları əvvəlcədən paylaşır. Toplantıda qrup ilk N dəqiqəni faktları izah etməyə həsr edir, sonra sual vaxtı gəlir. Müəllifin sevimli üç sualı:

- Təsvirdə **nə çatışmır**?
- Nəyi hələ bilmirik, bəlkə heç vaxt bilməyəcəyik?
- **Niyə daha pis olmadı?** (John Allspaw-ın məsləhəti.)

### 2. "Rotasiyalar" və ya "mübadilə proqramları"

Bu daha çətin — daha çox rəhbərlik dəstəyi və təşkilati bağlılıq tələb edir, amma SRE mədəniyyətini bütün şirkətə "peyvənd etmək" üçün daha yaxşı yol yoxdur. Fikir: SR-mühəndisləri növbə ilə başqa komandalarda işləyir, başqa komandaların üzvləri bir müddət SRE komandasında işləyir.

İki dəyişəni tənzimləyə bilərsən:

- **Rotasiya müddəti** — Google-un Mission Control proqramı software engineer-ə 6 ay SRE olaraq işləməyə imkan verir. Bir günlük "iş yoldaşını özünlə gətir" formatı mədəniyyət yaratmır — ən azı bir aylıq rotasiya lazımdır.
- **Tətbiq səviyyəsi** — ideal halda rotasiyaya gələn kimsə birinin yerini əvəz etməlidir, sadəcə "kölgə" olmaq deyil (bu diqqəti yayındırır). Rotasiya edən şəxs yeni işçi səviyyəsində komanda üzvü kimi qəbul edilməlidir.

---

## Sona qədər

SRE mədəniyyəti üzərində iş **bitməz.** Emerjent xüsusiyyət olduğu üçün, demək olar həyatın hər tərəfinə toxunur. Amma uğurlu tətbiqin bir müddətindən sonra öz işinin əks-sədasını başqa şöbələrdə görməyə başlayacaqsan — başqaları sənin təklif etdiyini götürəcək, daha çoxunu istəyəcək.

Sənin komandanda son sıradan çıxma insidentindən sonra kim, nə öyrəndi? Cavab yalnız "SR-mühəndisləri" idisə — indi bilirsən, bu, mədəniyyət qurmağa başlamaq üçün ən yaxşı işarədir.
