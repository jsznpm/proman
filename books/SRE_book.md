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

# SRE haqqında necə danışmalısan — və niyə bu bacarıq sənin karyerandan da vacibdir

Salam! Bu yazıda SRE kitabının 4-cü fəslinə baxırıq. Mövzu — **SRE təbliğatı**: SRE-ni başqalarına necə izah edirsən, hansı hekayələri seçirsən, niyə bu ümumiyyətlə vacibdir. Qəribə görünə bilər — "danışıq bacarığı" texniki kitabda niyə fəsil tutur? Amma müəllif israrlıdır: bu bacarıq həm fərdi karyerana, həm komandanın sağ qalmasına birbaşa təsir edir. Gəlin başlayaq.

---

## Niyə bu, işin lap əvvəlindən vacibdir?

Gec-tez qarşına çıxacaq: kiməsə SRE-nin nə olduğunu, niyə lazım olduğunu izah etmək lazım gələcək. Bu adam nənən-baban ola bilər, ya da CEO. Bəzən sadəcə kokteyl məclisində kiminsə marağını ödəyirsən, bəzənsə çörəyini qazanmaq üçün rəhbərliyə sübut etməlisən ki, bu sahəyə pul xərcləmək dəyər. Başqa şöbələrə də tez-tez izah etmək lazım gəlir — SR-mühəndisləri kimdir, niyə onlarla işləmək sənin öz xeyrinədir.

> Şirkətdə SRE-nin sağ qalması, böyük ölçüdə, onun nə qədər effektiv təbliğ olunmasından asılıdır.

Sağ qalma özü kifayət qədər güclü səbəbdir, amma daha bir səbəb var: **kimlik**. Özümüz haqqında danışdığımız hekayələr — kimlik formalaşdırmanın əsas alətlərindən biridir. SRE sənin üçün, həm fərdi, həm təşkilat səviyyəsində, əhəmiyyət kəsb edirsə (əks halda yanlış kitabı oxuyursan, dostum) — bu bacarığı öyrənməyə dəyər.

---

## Təbliğat hansı anlarda həlledicidir?

**Fərdi kontekstdə** — iş axtaranda və ya karyera dəyişəndə. Təkcə özünü satmaq kifayət deyil, izah etməlisən ki, sənin SRE yanaşman/mentalitetin real fərq yaradacaq. Əgər müsahibə verdiyin şirkətdə artıq SRE fəaliyyəti var (zəif və ya güclü) — çox diqqətlə izlə, onlar öz SRE sahəsini nə qədər aydın təsvir edə bilirlər. Aydın, ardıcıl izah edə bilmirlərsə — bu, sənə açıq siqnaldır: onlar bu məlumatı öz komandalarına da aydın çatdıra bilmirlər.

**Təşkilat kontekstində** iki an var:

1. **Erkən mərhələ** — SRE-ni təşkilata gətirəndə hər addımda izah və əsaslandırma lazımdır. Necə təqdim etdiyin, gələcəkdə insanların ona münasibətinə güclü təsir edir.
2. **Genişlənmə fazası** — "Əla, yeni SRE komandası topladın. İndi qalanlarını da sənlə işləməyə razı sal. Necə edəcəksən?" Effektiv təbliğat — bunun yoluıdır.

Bəli, bu "et, ya yox ol" kimi səslənir — çünki elədir. Amma yaxşı xəbər: bu fəsildə kifayət qədər ideya və resurs var, bacardığın qədər istifadə et.

> **Təbliğat, yoxsa təlqin?** Müəllif qəsdən "təbliğat" sözünü seçib, "təlqin" (moizə) yox — çünki təbliğat ikitərəfli müzakirədir, təlqin isə birtərəfli nəsihət. SR-mühəndisi təkcə təşkilata SRE-ni "satmır" — böyük təşkilatdan (yaxud sərt reallıqdan) geri əlaqə də alıb SRE sahəsinə ötürməlidir. Yenə də [[sre-medeniyyeti]] fəslindəki geri-əlaqə dövrələri fikri.

---

## Əvvəlcə hekayəni (və dinləyicini) tap

SRE təbliğatı bir hekayə seçməkdən başlayır. Səbəb sadədir: insan beyni hekayəyə açıqdır — mürəkkəb, çoxölçülü məlumatı bağlamağın ən yaxşı yolu elə budur. SRE-nin tərifi də əslində bir-birinə bağlı mürəkkəb ideyalar toplusudur, mövzuya girəndə hər kəs öz keçmişinə, təcrübəsinə görə fərqli tərəfə fokuslanır.

Ona görə müəllif qəsdən **yarımşəffaf** bir tərif işlədir — geniş auditoriyanı əhatə etsin, amma hər mühəndislik sahəsinə tətbiq oluna bilməsin qədər də boş olmasın:

> Etibarlılıq mühəndisliyi (SRE) — təşkilata öz sistemlərinin, servislərinin və məhsullarının **uyğun** səviyyədə **etibarlılığını** sabit şəkildə əldə etməyə kömək edən mühəndislik intizamıdır.

Bu tərifi kiməsə deyəndə, müəllif adətən soruşur: hansı söz diqqətini çəkdi? "Etibarlılıq"? "Uyğun"? Hər söz ayrı müzakirə qapısı açır — insanlar öz istədikləri qapını seçir. Təqdimatlarında vaxtın üçdə biri danışmaqdır, qalan üçdə ikisi açıq sual-cavab.

Maraqlısı budur: müəllif bir naxış görüb (bəlkə də sadəcə naxış axtarır, deyir özü də — insanlar naxış görməyə meyillidir hərşeydə). Kim seçir, hansı sözü?

- **"Sabit" və "uyğun"** — problemlərin içində boğulan, çətinliklə güc-bala çıxan komandalar.
- **"İntizam"** — hələ istədikləri hörməti qazanmayan qruplar.
- **"Mühəndislik"** — developer həmkarları arasında nüfuz istəyənlər.
- **"Etibarlılıq"** — yaxınlarda ard-arda sıradan çıxma yaşayanlar.

Bunun elmi diaqnostika olduğunu demirəm, amma praktik faydası var — mövzuyu necə çatdıracağını seçəndə.

### Dinləyicinin dilində danış, amma həddini aş

Auditoriyanın terminologiyasını, üslubunu təbii istifadə edə bilirsənsə — et. Şirkətdə maliyyəçilər önündə çıxış edirsənsə, maliyyə termini işlət, qorxma.

Amma limiti var. Prezentasiyaya "ağıllı sözlər" kartını hazırlamaq fikri ağlına gəlirsə — sürəti azalt. Bəzi ifadələr boş səslənirsə, öz hissinə güvən. Müəllifin özünün də sinir bozan sözləri var (məsələn "təlim" — heç sevmir onu). Sənin qulağını tıxayan söz nədir?

---

## Hekayə üçün bir neçə ideya

Yuxarıda "bu nədir?" hekayəsini gördük — tərif-hekayə. Başlamaq üçün yaxşıdır, amma nə əldə etmək istəyindən asılı olaraq çox başqa hekayə variantı var:

- **Effektivlik** — tərəfdaş qrup etibarlılıq problemi ilə boğuşurdu, SR-mühəndisləri X, Y, Z ilə köməyə gəldi, indi vəziyyət yaxşıdır.
- **Nüfuz** — məşhur şirkət X necə SRE tətbiq etdi. (Müəllifin ən az sevdiyi variant — sənin şirkətin X-dən içəridən çox fərqlidir, "onlar üçün işlədi, sənin üçün işləməyə bilər" tələsi var. İşlətsən, ehtiyatlı ol.)
- **İmkan** — sənə bənzər şirkət X SRE tətbiq etdi (yaxşı getdi, çətinlik oldu, aradan qaldırıldı). "Onlar bacardı, biz də bacararıq."
- **Sürpriz** — sıradan-çıxma zamanı SR-mühəndisinin diqqətli post-mortem prosesində gözlənilməz tapıntı.
- **Transformasiya** — əvvəl belə idi, N ay sonra indi belə vəziyyətdəyik.
- **Bir gün həyatdan** — seçilmiş bir gün/həftədə nə baş verdi, komanda uğuruna hansı işlər töhfə verdi.
- **Tapmaca** — X vəziyyəti absurd idi, addım-addım necə həll etdik.
- **İşdə ekspert** — ekspert probleme necə yaxınlaşdı, necə düşündü, hansı addımları atdı.

İlham gəlmirsə — SREcon konfrans qeydlərinə bax (əvvəlki illər), orda güclü material tapacaqsan.

**Tövsiyə**: hekayələri işlədikcə topla. SR-mühəndisinin həyatı, xoşbəxtlikdən ya bədbəxtlikdən, darıxdırıcı olmur. Sıradan-çıxma, "aha!" anı olan görüş, sual cavaba aparıb daha maraqlı sual doğuran texniki problem — hamısı material. Bunları qeyd et, fayl, sənəd, kağız — nə olur olsun, elə həmin an.

---

## Başqasının hekayəsi

Başqasının hekayəsini danışırsansa — açıq razılıq al. Çox təşkilatda public təqdimatlar üçün rəsmi qayda var, mütləq uyğunluğu yoxla.

**Necə soruş?** Sadə ola bilər: *"Bu vəziyyət gözlənilməz hadisə necə baş verdiyinin gözəl nümunəsidir. Uyğun şəkildə anonimləşdirib gələcək təqdimatlarımda deyə bilərəm? Etiraz edirsən?"* İnsanlar bilmək istəyir ki, özləri pis görünməyəcək, hekayə yaxşı niyyətlə deyilir, həssas heçnə açılmayacaq.

Daha bir addım da var — sadəcə hekayəni yox, adamın özünü "gətir". Kimsə öz hekayəsini özü danışsa, effekt qat-qat böyükdür. Hər dəfə iştirak edə bilmirsə — çıxışını video çəkib göstərə bilərsən.

### Efir vaxtını böl

Müəllif — yaşlı ağdərili kişi olaraq — fərq edir ki, ictimai forumlarda çıxış imkanı əsasən ona oxşar insanlara verilir. Bu, səs müxtəlifliyini azaldır. SRE və daha geniş texnoloji cəmiyyətdə bunu dəyişmək üçün, tanınmış natiq kimi aldığı efir vaxtından bir hissəsini başqalarına verməyə çalışır — onlar da "səhnəyə" çıxıb rol model olsun.

Bu, sosial ədalət arqumenti olaraq inandırıcı gəlmirsə, SRE məntiqi ilə bax: müxtəlif səslər, müxtəlif baxış bucaqları — daha çox "siqnal" (SR-mühəndislərinin çox sevdiyi söz), mövzunu daha dərin anlamaq deməkdir.

---

## Gizli motivli hekayələr

Hər hekayənin bir-iki gizli motivi ola bilər — hekayə güclü ötürücüdürsə, əsas mesajın yanında ikinci bir mesaj da aparıla bilər.

Nümunə: sıradan-çıxma post-mortemləri son vaxtlar çox rəsmi, məlumatsız yazılır — üç sonuncu sıradan-çıxmada da səbəb "insan faktoru" göstərilib. Növbəti dəfə rəhbərliyə sıradan-çıxma haqqında danışanda, "sürpriz" tipli hekayə seç, ortasına dramatik dönüş qoy: *"Əvvəlcə insan faktoruna yazacaqdıq, amma nəsə düz gəlmirdi..."* Sonda sual: *"İnsan faktoruna tələsik yazmasaydıq, daha nə öyrənə bilərdik?"*

Yaxın bir kateqoriya — "yaxşı ölçü, amma həddini keçmə": öz təcrübəndən bir hekayə, istədiyin davranışı özün nümayiş etdirdiyin an. "Uğursuz oldum, bundan öyrəndim" hekayəsi hər zaman populyardır — inandırıcıdır (ən yaxşı hekayə öz hekayəndir), düz aparılsa nəsihətçi görünmür. Təklif: prezentasiyanı çıxışdan əvvəl həmkarına göstər — bu tip hekayələrdə "şeytan detallarda gizlənir", nə qədər detal lazım olduğunu özündən kənar göz daha yaxşı görür.

---

## Hekayənin çətinlikləri

### Çətinlik 1: hürməyən it

SRE təbliğatının xüsusi problemi — bəzən **hürməyən it** haqqında hekayə danışmalı olursan. İşimizin dəyəri çox vaxt **baş verməyən** şeydə görünür — sistem çökmədi, kəsinti olmadı, data itkisi qarşısı alındı. Mənfi hadisə, ya da planlaşdırıldığı kimi işləyən şey haqqında inandırıcı hekayə danışmaq, real böhran haqqında danışmaqdan həmişə çətindir.

Cavab — **kontrast**. Fotoqrafiyanın neqativində nə olduğunu görmək üçün lazım olan əsas element budur. Vəzifə: obyekti (sistemi, onun işini) fonla (yük, asılılıqların davranışı, sistemi keçmişdə məhv edə biləcək şərtlər, sosiotexniki kontekst) qarşılaşdırıb qabartmaq.

Bəzən oxşar sıradan-çıxma təsviri ilə başlaya bilərsən, problemin dayandığı nöqtədə saxla, nə dəyişdirdiyini, hansı nəticəyə gətirdiyini izah et.

> **Yenə rezilyens mühəndisliyi?** Sıradan-çıxma haqqında faydalı sual dəsti: "Necə daha pis ola bilərdi? Nə pisləşməyə qoymadı? Nə baş vermədi, niyə?" Erik Hollnagel-in "Safety-II" (və Nancy Leveson-un davamı "Safety-III") yanaşması sual verir: diqqətimizi sıradan-çıxma saatına yox, hər şeyin yaxşı getdiyi çox daha uzun müddətə yönəltsək nə olar? Səbəbi axtarmaq yerinə: **"sıradan-çıxmadan əvvəlki gün niyə hər şey yaxşı gedirdi?"**

### Çətinlik 2: süjet inkişafı

Etibarlılıq işi nadir hallarda xətti gedir. Bir dəfə öldürülmüş əjdaha adətən ölü qalmır. SRE hekayələrinin xətti olmasını gözləmə — dövrələr (geri-əlaqə dövrələri, [[sre-medeniyyeti]]-də gördük), enib-qalxan etibarlılıq, mövsümi trafikdən pisləşən aylar var. Uzaqdan baxsan, tam mənzərə uşaq rəsmi kimi qarışıqdır.

İki yol var: qəbul et ki, sadələşdirmə edəcəksən (dinləyiciyə bunu söylə), yaxud aydın şəkildə vurğula ki, böyük mənzərənin seçilmiş bir parçasını göstərirsən. Nə qədər uzun işləsən, reallığın xəttilikdən nə qədər uzaq olduğu bir o qədər aydınlaşır.

### Çətinlik 3: düzgün dərs

"Qəhrəmanlıq" hekayələrinə həddindən artıq önəm vermə — gizli mənfi nəticələri var. Bir nəfər binadan iplə düşüb 30 saat yeməksiz-yuxusuz yanğınla vuruşub — cəlbedici səslənə bilər, amma "qəhrəman mədəniyyəti"ni tərifləmək sağlam olmayan, davamsız gözləntilər yaradır.

"30 saat yeməksiz-yuxusuz" eşidəndə, müəllif bunu sevinc səbəbi kimi görmür — insidentə cavab prosedurlarının **iflası** kimi görür. "Bütün həftəsonu işlədik", "bütün komandanı oyatdım", "80 saatlıq iş həftəsi" — bunlar da eyni cür xəbərdarlıq işarəsidir, sədaqət sübutu yox. Bu məqamları qeyd etməli olsan, post-mortemdə vurğula ki, onları **düzəltdin**, hansı əlavə tədbir gördüyünü də danış.

Bu mövzuda Emily Gorcenski-nin **"The Cult(ure) of Strength"** çıxışına baxmağı tövsiyə edir müəllif — texniki konfranslarda onu ağlamağa gətirən iki çıxışdan biri. Gorcenski "qəhrəman mədəniyyəti" tələsinə aparan düşüncə qırılmasını çox güclü tutur.

### Çətinlik 4: düzgün baş qəhrəman

SQL server sıradan-çıxma hekayənin yeganə əsas personajı deyil. Bütün sistemlərimiz **sosiotexnikidir** — böyük mürəkkəb sistemlər təcrid olunmuş işləmir, kontekstdə insanlar da var. Hekayəndə yalnız yanıb-sönən işıqlı cihazlar varsa, o hekayə demək olar tamamlanmayıb.

---

## Sona qədər

Müəllifin son məsləhəti — təkcə SRE təbliğatına aid deyil, ümumən public speaking üçün: illər ərzində verdiyi ən yaxşı çıxışlar, hazırlıq və ya təqdimat prosesində **özünün dəyişdiyi** çıxışlar olub.

Hekayə seçəndə, dinləyicini tapanda, çətin anları düşünəndə — bir sualı yadından çıxarma: bu hekayəni danışmaq səni özünü necə dəyişdirəcək? Çünki əgər sən dəyişmirsənsə, çox güman dinləyici də dəyişməyəcək.

Sən son dəfə SRE haqqında danışanda hansı hekayəni seçdin — və niyə elə onu?

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

# SRE-yə Necə Keçmək Olar, Elə Bir Sahədən Olsan Belə?

Salam! Bu yazıda sənə maraqlı sual üzərində dayanacağıq: tutaq ki, sən developer, sistem administratoru, tələbə, hətta texniki olmayan sahədə çalışan biriyəsən — SRE (Site Reliability Engineering, sistem etibarlılığı mühəndisliyi) sahəsinə necə keçə bilərsən? Yaxşı xəbər budur ki, bunun üçün tək bir "düzgün" yol yoxdur. Gəl addım-addım gedək.

## Bəlkə sən artıq SRE-sən, sadəcə bunu bilmirsən?

Qəribə səslənə bilər, amma bu sualla başlamaq lazımdır. Demək olar ki, hər təşkilatda ən azı bir-iki nəfər var ki, formal təlim və ya tanınma olmadan artıq SRE düşüncə tərzi ilə işləyir. Bu adamlar komanda yoldaşları ilə əməkdaşlıq edərək toxunduqları hər şeyin etibarlılığını artırmağa çalışır. İclaslarda düzgün sualları verir, insident nəticələrinin (postmortem) təhlilini təşəbbüs edir, lazımi alətləri yaradır. Bəziləri bunu açıq şəkildə edir, çoxu isə sakitcə öz küncündə.

Əgər bu sənsinsə — təbrik edirəm, ruhən sən artıq SRE-sən. Çətinlik ondadır ki, bunu ətrafdakılara qəbul etdirəsən və şirkət bunu rəsmiləşdirsin — beləliklə bu rol sənin tam ştatlı vəzifən olsun, sadəcə düşüncə tərzinin yan effekti kimi qalmasın. Bunun üçün ilk addım: SRE icmasına qoşul. SREcon konfranslarının keçmiş sessiyalarına bax, YouTube-da SRE mövzulu materiallara nəzər sal, Slack-də bu mövzuya yaxın kanallara qoşul, konfranslara (virtual və ya canlı) qatıl. Eyni müzakirələri aparmaq istəyən insanlarla tanış olmaq böyük dəstək ola bilər.

## Tələbədən SR-mühəndisə

Tələbəsənsə, məsləhətlər sənin ixtisasından asılı olacaq, amma əvvəlcə hamıya aid ümumi fikirlər:

- **İnfrastruktura yaxın iş axtar.** Tədqiqat hesablama sistemləri olan mərkəzlər, universitetlər yaxşı start nöqtəsidir. Kompüter elmləri və mühəndislik fakültələri də uyğundur.
- **Könüllü qruplara qoşul.** Universitetlərdə tələbələrin sistemlər üzərində işlədiyi könüllü qruplar (ya da hakaton kimi tədbirlər) var — bunlar real təcrübə qazandırır, bəzən hətta kollec infrastrukturunun bir hissəsinə çevrilir.
- **Bulud provayderlərinin tələbə proqramlarından istifadə et.** Böyük bulud şirkətləri tələbələr üçün pulsuz kredit/giriş təklif edir — bunu "sandbox" mühiti kimi istifadə et, istədiyin texnologiya ilə eksperiment et.
- **Konfranslara get.** Demək olar ki, bütün konfranslarda tələbələr üçün endirimli tariflər və ya tam qrant/təqaüdlər var. Bu, karyeranı bir pillə irəli aparmaq üçün əla fürsətdir.

> Konfransda ilk dəfə iştirak edəndə hamı bir-birini tanıyır kimi görünə bilər. Bu heç vaxt tam doğru deyil — həmişə yeni insanlar var, sadəcə sənə tanış görünmür.

İxtisasına görə konkret tövsiyələr:

- **Kompüter elmləri tələbələri:** Dərslərə diqqətli ol. Miqyaslama/performans, paylanmış hesablama, növbə nəzəriyyəsi və arxitektura kimi mövzuları öyrədən kursları ciddi qəbul et — hətta ən darıxdırıcı nəzəri dərslər olsa belə. Bunlar gələcəkdə mütləq işinə yarayacaq.
- **Mühəndislik tələbələri:** Fakültənizdə olmayan əlavə kompüter elmləri kursları götür, mühəndislik təhsilini tamamlasın.
- **Təbiət elmləri tələbələri:** Hesablama bioloji, bioinformatika, şəbəkə tədqiqatları, eksperimental fizika kimi sahələrdə demək olar ki hər yerdədir. Bu, sənin start nöqtən ola bilər.
- **Humanitar sahə tələbələri:** Musiqiçi, rəssam, dilçi, memar — fərqi yoxdur. Öyrəndiyin sahədəki bacarıqları SRE-nin ehtiyaclarına necə uyğunlaşdıra biləcəyini müəyyən et. Məsələn, yaxşı hekayə danışma bacarığı SRE-də çox dəyərlidir. Bununla yanaşı, Harvard-ın pulsuz CS50x kimi kurslarla texniki biliyini gücləndir.

## Developerlərdən SR-mühəndislərə

Əvvəlki fəsildə SRE-nin kod yazma tələblərindən danışmışdıq, ona görə düşünə bilərsən ki, developerlər SRE-yə iki addımlıq məsafədədir. Bəzi təşkilatlarda (məsələn, Google-da) bu doğrudur, amma əksəriyyət üçün yox — developer dünyasının stimulları adətən bu iki peşənin kəsişdiyi sahələrə fokuslanmağa təşviq etmir. Diqqətini bilərəkdən bu sahələrə yönəltməlisən:

- **İstehsalat mühitində davranış** — kodun real şəraitdə necə işlədiyi. Verilənlər bazası bağlantısı 30% yavaş olsa nə baş verər? Şəbəkə paket itirsə? Versiyaların paralel işləməsi zamanı qismən yenilənmələr necə idarə olunur? Miqyaslama və təhlükəsizlik — internet istənilən girişi göndərə bilsə kod necə davranar?
- **Uğursuzluq rejimləri** — kodun necə sıradan çıxa biləcəyini aydın bilirsənmi? Nə qədər yükə tab gətirir? Uğursuzluq yaxınlaşanda bunu necə anlaya bilərsən?
- **Sağlamlıq/müşahidə alətləri** — başqaları sənin kodunun yaxşı işlədiyini yoxlamalı, lazım gələrsə debaq etməli olacaq. Kod içində bunu asanlaşdıran nə var?
- **Versiyalaşdırma məsələləri** — yeniləmələri, sxem dəyişikliklərini, geri qaytarmaları (rollback) necə idarə edirsən?
- **Sənədləşdirmə** — SRE auditoriyası üçün keyfiyyətli sənəd yazmısan?

> Çoxu üçün sual sadədir: sistemləri idarə etmək haqqında nə qədər düşünürsən, sadəcə onları yaratmaqdan başqa?

Ən yaxşı məsləhət: operasiya komandası ilə vaxt keçir, xüsusən yük altında işləyən sistemləri, hətta bir-iki nasazlığı izləsən, kəllədə proses özü sıralanmağa başlayacaq. Şirkət rotasiya imkanı təklif edirsə (bir SR-mühəndislə və ya heç olmasa operasiya komandası üzvü ilə), mütləq qatıl. Kod yazmaq istəyirsənsə də narahat olma — heç bir SRE komandası görməmişəm ki, ən azı sistemin kənarında kod yazmaq tələb etməsin. Alət yaratmaq, "infra-kod" (konfiqurasiya alətlərinin dilində kod) yazmaq həmişə lazımdır.

## Sistem administratorlarından/İT mütəxəssislərindən SR-mühəndislərə

Bu keçid mənə şəxsən yaxındır, çünki özüm bu yolu keçmişəm. SRE sistem administrasiyasının "təkamül pilləsi" deyil, amma keçid üçün düşüncə tərzində sürüşmə (bəlkə genişlənmə) lazımdır.

Ortaq güclü tərəflər:
- **Xidmət etmə istəyi.** Hər iki peşə insanlara kömək etmək istəyi ilə başlayır — texnologiya ilə onu istifadə edən insanlar arasındakı boşluğu doldurmaq.
- **Nasazlıq axtarışı və debaq bacarığı.** Hər ikisi bu bacarıq olmadan işləyə bilməz. SadServers kimi platformalarda xüsusi sındırılmış virtual maşınlar/konteynerlərlə bu bacarığı məşq etmək olar.

Bundan başqa: sənədləşdirmənin əhəmiyyəti, geniş alət spektrini bilmək, təhlükəsizlik/məxfilik yönümlü düşüncə, güclü peşə etikası — bunların hamısı keçidə kömək edir.

### Ad dəyişikliyi ilə bağlı xəbərdarlıq

Burda ciddi məqamı ayrıca vurğulamaq lazımdır.

Komandanı sadəcə "SRE komandası" adlandırmaq strategiyası **işləmir**. Ad dəyişdirmək asandır, amma fokus, bacarıqlar, tapşırıq, prioritetlər eyni qalırsa, məyusluq qaçılmazdır. Nəticədə iki şeydən biri baş verir: ya SRE təcrübəsi olan insanlar bunu ilk müsahibədə 5 dəqiqəyə aşkarlayıb gedir, ya da sahəni bilməyən insanlar işə götürülür və eyni problemlər davam edir.

Amma əgər bu, daha böyük SRE tətbiq prosesinin bir hissəsidirsə (adlar dəyişib, hələ hər şey işləmir) — bu fərqli haldır. Belə vəziyyətdə vaxt lazımdır, tələsmə. Bu tip dəyişikliklər həmişə gözlədiyindən uzun çəkir.

İlk addım daxili olmalıdır — refleks olaraq SR-mühəndis kimi düşünməyə başlamaq. Fokus dəyişikliyi belə görünür:

- "Hər şeyi nəzarətdə saxlamaq" → "etibarlılığı komponentlər deyil, müştəri baxımından ölçmək"
- "Hər şeyi 24/7/365 işlək saxlamaq" → "münasib etibarlılıq səviyyəsi"
- "Tranzaksion sistem administrasiyası" → "təşkilatda geri bildirim dövrələri yaratmaq"

Sənin sorğu növbən (ticket queue) və e-poçt bildirişlərin əslində gizli məlumat mənbəyidir — hansı faktorların həm etibarlı işə, həm nasazlıqlara səbəb olduğunu göstərir. Bu məlumatı düzgün açıdan analiz etsən, təşkilatının etibarlılığı barədə zəngin mənbə əldə edirsən.

Daha aşkar mənbə — mühitindəki nasazlıqlar. Çoxu mühitdə ciddi postmortem mədəniyyəti yoxdur, ən yaxşı halda ittihamedici iclas olur. Sən (ideal olaraq həmkarlarınla birlikdə) bundan sonra ayrıca, daha dərin, qeyri-rəsmi təhlil apara bilərsən. Məqsəd rəhbərliyi ittiham iclasında "düzgün postmortem" dərsi ilə qıcıqlandırmaq deyil — sadəcə öz daxili fokusunu məşq etdirmək və dəyişdirmək.

Digər addım: nasazlıq və etibarlılıq müzakirələrində istifadə olunan ifadələrə diqqət yetir. "Kök səbəb" əvəzinə "töhfə verən amillər" demək — daxili və xarici qavrayışı dəyişə bilər.

### Konkret növbə addımı

SR-mühəndisliyə keçmək istəyən sistem administratoru üçün son məsləhət: bunu tək etmək lazım deyil. Bir çox addımı (arxitektura təhlili, postmortem bloqlarını oxumaq, sorğu növbəsini analiz etmək) həmkarla və ya qrup şəklində etmək olar. Kimsə tapsan, birlikdə dünyagörüşünü (bəlkə komanda mədəniyyətini) dəyişmək çox əyləncəli ola bilər.

## Digər texniki və qeyri-texniki peşələrdən

Şəbəkə idarəetmə mərkəzi işçisi, texniki dəstək, Windows server mütəxəssisi, test mühəndisi kimi rollarda olanlar üçün: bu işlərin hamısında etibarlılıq mövzusuna çox diqqət ayrılır, hətta indi bunu bu prizmadan görməsən belə. İlk addım: özünü etibarlılıqla necə əlaqələndirdiyini anla, hansı istiqamətə hərəkət etməli olduğunu tap. Kitabdakı hansı fikirlər səni maraqlandırdısa, elə oradan başla.

Qeyri-texniki sahədən gələnlər üçün: qeyri-ənənəvi öyrənmə yolları mövcuddur. Bir dayaq nöqtəsi tap, oradan inkişaf et. Məsələn, satış sahəsindəsənsə, müştəri problemlərini hər kəsdən yaxşı anlayırsan — bunu etibarlılıq üzərində işləməyə başlanğıc kimi istifadə et.

## Nəticə: irəliləyişini izlə

Bu yazıda danışdığımız hər kəs üçün son bir tövsiyə: yolun boyu irəliləyişini qeyd et, ki hərəkət hissini itirmə. Bu hiss səni irəli aparacaq — müsahibələr nəticəsiz qalanda, şirkət fikirlərinə laqeyd qalanda belə. Gündəliyinə yazdığın şey ciddi olmaq məcburiyyətində deyil — "bir fəsil də oxudum" və ya "ilk dəfə SRE konfransına getdim" kimi kiçik qeydlər belə əhəmiyyətlidir.

Sən hansı yoldan gəlirsən — developer, sysadmin, tələbə, ya tamam başqa sahə? Öz yolunu tapmısan, yoxsa hələ axtarışdasan?

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

# SR-mühəndisinin bir günü necə keçir?

İnsanlar SRE-nin nə olduğunu az-çox anlayır, amma sonra qaçılmaz sual gəlir: "Bəs sən konkret nə edirsən?" Bu yazıda sənə yarı-uydurma qəhrəman haqqında dramatik hekayə danışmayacam — sualı düz cavablandırmağa çalışacam.

Amma əvvəlcə yaxın mövzuya toxunum: SR-mühəndisi üçün "orta statistik" iş günü deyilən şey varmı? Mən buna şübhə ilə yanaşıram. Axşam evə gəlib "vay, bu tam orta statistik gün idi" deyə düşündüyüm bir gün xatırlamıram. Vəzifə öhdəlikləri təşkilatdan təşkilata çox fərqlənir. Bunu bir kənara qoysaq belə, ən gərgin günlə ən sakit günü ortalayıb mənalı bir "orta gün" almaq mümkün deyil.

## Gün rejimləri

Mifik "kombinə edilmiş gün" uydurmaq yerinə, hər gün üzə çıxan bir neçə iş rejiminə baxaq. Bu rejimlər bir-birini istisna etmir — eyni anda bir neçəsində ola bilərsən, ya da aralarında sürətlə keçid edə bilərsən. İstəsən, onları "hər anda geydiyin papaqlar" kimi düşün.

### İnsident/qəza rejimi

Bəzi günlər iş vaxtının böyük hissəsini, bəzən hamısını insidentlə məşğul olaraq keçirirsən. Bu günlər sərbəst işlədiyin günlərdən kəskin fərqlənir — qorxu, narahatlıq, bəzən qəzəb, düzəldikdən sonra sevinc yaxud rahatlıq qarışığı, üstəlik "döyüş ya qaç" reaksiyası müşayiət edir. Emosional reaksiyanın dərinliyi adətən qəzanın ciddiliyi, insident-cavab prosesinin yetkinliyi və yanında işləyən insanlarla bağlıdır.

Növbətçi olduğun müddətdə bu, əsas rejimin olacaq. Bu rejimdə demək olar ki, bütün hərəkətlərin reaktivdir — planladığın iş yox, baş vermiş qəza nə üzərində işləyəcəyini diktə edir.

> Bəzən qəza günlərlə davam edir, "gün" anlayışı 24 saatı aşır. Belə vaxtlarda özünə və komanda yoldaşlarına qayğı göstərməyi unutma.

### İnsidentdən sonra öyrənmə rejimi

Bu rejimi məhz buradan sonra qeyd etməyimin səbəbi var — kiçik bərpa dövründən sonra (bax: yazının sonundakı "bərpa və özünə qayğı" bölməsi) qəzanı geriyə baxıb təhlil etmək, dərs çıxarmaq üçün lazım olan düşüncə tərzinə keçmək imkanı yaranır. Bu, araşdırma dövrüdür — qəza zamanı tam olaraq nə baş verdiyini geriyə dönüb, təfərrüatlı şəkildə üzə çıxarmağa çalışırsan. Öhdəliyin: nəticələri elə sənədləşdirmək ki, başqaları qəzanı bilavasitə yaşamadan nə baş verdiyini anlaya bilsin. Araşdırma adətən texniki sorğuların (monitorinq sistemlərində məlumat axtarışı) və insanlarla söhbətin (kolleqalarla — kim nə vaxt nə bilirdi, nəyi anladı) qarışığından ibarətdir. Bəzən insident nəticələri barədə öyrədici toplantıda təqdimat da edə bilərsən.

**Bu rejim niyə motivasiya verə bilər?**

Ola bilsin təşkilatında insident-sonrası təhlil prosesi az inkişaf edib, hətta səthi ola bilər. Bəzən bu prosesin keyfiyyətini şəxsən yüksəldə bilərsən; bəzən isə vəziyyəti yaxşılaşdıracaq mövqedə olmursan. İkinci variant sənin halına uyğundursa, iş axtarışına başla, CV-ni yenilə. Bu, çox radikal görünürsə, sadəcə prosesdə nəyin yaxşılaşa biləcəyini görmək belə çox vaxt müsbət effekt verir.

### İnkişaf/öyrənmə rejimi

Bəli, bəzən oturub nəsə yaradırıq. Bəzən vaxtı öyrənməyə sərf edirik. Bir sıra imkanlar var, məsələn:

- SRE tapşırıqlarını yerinə yetirmək və ya istifadəçilərə özünəxidmət interfeysi vermək üçün tətbiq/servis kodu yazmaq;
- yeni mühit yaxud infrastruktur təmin etmək (çox vaxt "infrastructure as code" alətləri ilə, məs. Terraform);
- monitorinq/müşahidə/xəbərdarlıq sistemini yaxşılaşdırmaq;
- bəzi servisləri ləğv etmək;
- servisin işində və ya istifadəsində rutin əməliyyatları aradan qaldırmaq;
- release prosesinin ayrı-ayrı mərhələlərini yaxşılaşdırmaq (bəlkə insident zamanı öyrəndiyin şeyi aşkar edən testlər yazmaq);
- keçən həftə sıradan çıxmış servis hissəsinin kodunu düzəltmək;
- xaos-mühəndisliyi eksperimentləri aparmaq;
- sənədləşdirmə yazmaq;
- gələcəkdə lazım olacağını düşündüyün yeni texnologiyanı öyrənmək.

Bu, ağlıma gələn qismən siyahıdır, başlanğıc nöqtəsidir. Sənin şəxsi siyahın buna bənzəyə bilər, ya da təşkilatına və vəzifənə görə tamam fərqli ola bilər.

Siyahıya baxanda görürəm ki, ümumilikdə maraqlı işlərdən danışmışam. Açığını deyim — iş həmişə asan və xoş deyil. Bəzən Avgi tövləsini təmizləməyə bənzər cansıxıcı, ağır iş görməli olacaqsan. Məhz burda SR-mühəndislərinin "rutindən qurtulmaq" istəyi yerinə düşür. Ümid edirəm bunu öz siyahına əlavə edə biləcəksən.

### Arxitektura rejimi

Bu rejimin daha tez-tez baş verməsini istəyirəm — hazırki vəzifəndə bu, çox arzuolunandırsa, səni tam anlayıram. İdeal halda SR-mühəndisləri layihələndirmə mərhələsində öz bilik və təcrübəsini işə sala bilir, təkcə kimsə layihəni produksiyaya göndərmək istəyəndə yaxud artıq produksiyada qəza baş verəndə yox. Bu zaman SR-mühəndisi layihələndirmə və planlaşdırma iclaslarında iştirak edir, "etibarlılığın" nümayəndəsi və müdafiəçisi kimi çıxış edir. İdeal olaraq bu, elə təhlükəsizlik mütəxəssisini prosesin erkən mərhələsində söhbətə dəvət etməyə bənzəyir — kimsə yaradılan sistemin təhlükəsizliyinə göz qoysun deyə.

SRE-nin yeni və tanınmamış sahə olduğu, yaxud bu mütəxəssislərin sadəcə "zəngə cavab verən adamlar" sayıldığı təşkilatlarda erkən mərhələ iştiraki daha az rast gəlinir, ona görə bunun daha tez-tez baş verməsini istəyirəm. Belə vəziyyətdəsənsə, bəzən insident-sonrası təhlildən ustalıqla istifadə edərək müzakirə masasında yer qazana bilərsən. Xəbərdarlıq: burda ehtiyatlı və siyasi cəhətdən düzgün davranmaq son dərəcə vacibdir. Heç kim "əgər layihələndirmədə SR-mühəndisi iştirak etsəydi, bu qəza heç vaxt baş verməzdi" cümləsini eşitmək istəməz (nə qədər buna inansan da).

> SRE və etibarlılığın sirri budur: real dünyada problemlər həmişə texniki xarakter daşımır. Bəzən sırf siyasidir. Nə qədər xoşuna gəlməsə də, texniki bacarıqlarla yanaşı siyasi bacarıqlarını da inkişaf etdirmək öz xeyrinədir. Siyasi problemlərin siyasi həlli var — onları texniki həllərlə düzəltmək cəhdi demək olar ki, heç vaxt işləmir. Fərqi anla və ona uyğun hərəkət et.

Belə mövqedəsənsə ki, yuxarıdakı cümlə səni dərindən köks ötürtdürür, çünki erkən mərhələyə çıxış son dərəcə uzaq perspektiv kimi görünür — bütün mümkün yollarla irəliləməyə davam etməyə çağırıram. Arxitektura rejimi etibarlılığı artırmaq üçün çox böyük potensial verir. Real dünyada üzə çıxmazdan əvvəl tək nöqtə uğursuzluqlarını (single points of failure, SPOF) aşkar etmək kimi baza işlərdən başqa, daha çox şey etmək olar. Məsələn, ən yaxşı təcrübələr, standart infrastruktur tikinti blokları, keyfiyyətli monitorinq və s. yaratmaq istəyirsənsə, bunları inkişaf prosesinə daxil etmək üçün ən yaxşı an məhz budur.

### İdarəetmə rejimi

Bu rejimi bir səbəbə görə saxladım — etiraf etmək üçün ki, SR-mühəndisləri həmişə icraçı olmur. Bəzən insanları idarə edirik, ya da tex-lid kimi daha böyük idarəetmə funksiyaları yerinə yetiririk. LISA konfransında 1995-ci ildə dərc olunmuş, mən idarəetməyə yeni başlayanda oxuduğum bir məqalə var.

Gretchen Phillips "Something to Nothing (and Back)" məqaləsində belə deyir:

> Keçən payız qızlarımı özümlə ofisə apardım, günün sonunda evə qayıdanda dedilər: "Ana, sən bütün gün danışmaqdan başqa heç nə etmirsən. Sənin işin nədir?" Onlara iclaslara getdiyimi, insanlarla danışdığımı, elektron məktubları oxuduğumu (bəzən cavab da verdiyimi) izah etməyə çalışdım. Amma bunu deyəndən sonra hiss etdim ki, özüm də artıq heç nə "etmirəm" kimi düşünürəm... gündəlik gördüyüm işin həcmindən qətiyyən razı deyildim; təəssüf ki, menecer olmuşdum.

> İstədiyimdən çox vaxtımı sıxıntılı halda keçirdikdən sonra nəhayət anladım ki, sadəcə nəsə "etmirəm" — iclaslara gedir, insanlarla danışır, məktub oxuyuram (bəzən cavab da verirəm) — amma gördüyüm iş çox vacibdir. Bu anlayış xəstəlikdən sonra işə qayıdanda gəldi (evdən işləyə bilmirdim) — masamda və poçt qutumda diqqət tələb edən nəhəng sənəd yığını tapdım. Texniki mütəxəssislərimdən (sistem adminlərindən) heç biri onlarla məşğul olmurdu. Əslində bir neçə layihə mənim onları növbəti mərhələyə keçirməyimi gözləyirdi.

Deməli, SRE bölməsinin rəhbərinin "Sənin günün necə keçir?" sualına cavabı "İclaslara gedirəm" ola bilər — bu, heç də pis deyil.

### Planlaşdırma rejimi

SR-mühəndisi kimi hipotetik gününün bir hissəsini planlaşdırmaya sərf edəcəksən. Ediləcək çox şey var, o cümlədən:

- arxitektura rejimi yaxud inkişaf/öyrənmə rejimi ilə bağlı icra planları hazırlamaq;
- tutum planlaşdırması (capacity planning) aparmaq;
- özünütəyinetmə üzərində iş görmək (komanda kimi nə etməliyik, bu təşkilatda SRE-nin məqsədi nədir, onunla hara doğru getmək istəyirik və s.).

Bunlar standart məqamlardır, ona görə daha maraqlı — əməkdaşlıq rejiminə keçirəm.

### Əməkdaşlıq rejimi

Kitab boyu dəfələrlə deyirəm ki, SR-mühəndisləri "yorulmadan əməkdaşlıq edir" — amma bu real həyatda necə görünür? Əməkdaşlıq çoxşaxəlidir, ona görə bu sualın çox variantı var. Mənə göstərici görünən üç nümunə gətirim (arxitektura rejimindəki nümunələrə əlavə olaraq).

Birincisi, SLI/SLO təyin etmə və tətbiq praktikası (və onları dəstəkləyən monitorinq/müşahidə işi) demək olar ki, həmişə əməkdaşlıq tələb edir. Sistemi kifayət qədər yaxşı anlamaq, onun etibarlılığı barədə mühakimə yürütə bilmək və SLI/SLO yaratmaq üçün kolleqalarla — developerlər, məhsul/layihə menecerləri, maraqlı tərəflər, biznes insanları — işləmək əməkdaşlıqla sıx bağlıdır.

> İstisna nadir haldır: bəzən SLI/SLO yalnız sənin (bəlkə komandanla birgə) sahib olduğun və istifadə etdiyin daxili servislər üçün yaradılır — belə halda başqası ilə danışmağa ehtiyac qalmır. Amma bu, nadir və maraqsız haldır.

İkincisi, müxtəlif təşkilatlarda müxtəlif adlarla çağırılan təhlil prosesi. "Produksiyaya hazırlıq təhlili", "tətbiqə hazırlıq təhlili", "buraxılışdan əvvəl təhlil" kimi adlar eşitmişəm. Prosesin servis həyat dövründə harada baş verməsi və nəyi əhatə etməsində fərqlər olsa da, əsas fikir eynidir: SR-mühəndisi yeni servisin yaxud onun yeni versiyasının produksiyaya çıxarılmasından əvvəlki prosesdə bir müddət iştirak edir — servisin produksiyada etibarlı işləməsi üçün nə lazım olduğunu və standarta nə qədər yaxın olduğunu müəyyən etmək üçün. Bu iş adətən yoxlama siyahısı (checklist) və ya formadan istifadəni nəzərdə tutur. SR-mühəndisi standart checklisti məhsul komandası ilə müzakirənin əsası kimi işlədir. Birlikdə planlanan servisin işini buraxılışdan əvvəl yoxlayırlar.

> Bu nümunəni təsadüfən "əməkdaşlıq" bölməsinə qoymamışam, "nəzarətçi rejimi" adlı mövcud olmayan bölməyə yox. Çox vacibdir ki, sən və bu təhlili birgə aparan kolleqalar bu işi mümkün qədər əməkdaşlıq kimi qəbul edəsiniz. Bu cür iş asanlıqla "dişimizi qıcayaraq dözdüyümüz tələb" kateqoriyasına düşür, işi görən SR-mühəndisləri isə nəzarətçi roluna keçir. Adətən proses yorucu, həddindən artıq dəqiqlik tələb edən sayılanda, yaxud produksiyada etibarlılığın dəyəri qeyri-bərabər bölünəndə belə olur. Sadəlövh sayıla bilərəm, amma ürəkdən inanıram ki, məhsul yaradan insanlar öz kodlarının produksiyada düz işləməsini həqiqətən istəyir — hətta konkret vəziyyətdə stimullar həmişə buna kömək etməsə də. Bu ortaq istəkdən istifadə et. SR-mühəndislərinin öhdəliyi — əməkdaşlığı gücləndirmək üçün anlayışla ünsiyyət qurmaq və hərəkət etməkdir.

Üçüncü nümunə kitabın başqa yerində gətirilir, amma təkrarlanmağa dəyər bir həqiqətə əsaslanır: SR-mühəndisləri servis və sistemlərin işini davam etdirmək üçün çalışır ki, başqa insanlar onlardan istifadə etsin. Əsas vəzifəmiz — müştərilərimizin (xarici yaxud daxili) gözləntilərinə daim uyğun gəlmək və bu gözləntiləri anlamaqdır. Deməli, hipotetik gününün bir hissəsini müştərilərlə əməkdaşlıqda keçirməlisən (keçirməlisən). Bu praktikada necə işləyir?

Bütün mümkün servis/məhsul ssenarilərini əhatə edən cavab vermək çətindir, ona görə əsaslara qayıdıb deyim: birinci növbədə müştərini dinləmək lazımdır. Bəs SR-mühəndisləri müştəriləri necə dinləyir? Sadə cavab: monitorinq işimiz vasitəsilə. Doğru sualları vermək üçün istifadə etsən, monitorinq güclü siqnal mənbəyi olur. Üstəlik, SLI/SLO-nun əsasında müştəri ilə davamlı əməkdaşlıq durur.

### Bərpa və özünə qayğı rejimi

Bu rejimi siyahının sonuna qoydum, çünki digər bütün rejimlərə müşayiət etməlidir — az əhəmiyyətli olduğuna görə yox. SRE çox maraqlı, potensial olaraq hər şeyi udan bir işdir. Həyəcanlandırıcı tapşırıqlar məsuliyyət və özünəhörmət hissi ilə birləşir, bu da asanlıqla həddindən artıq gərginləşməyə səbəb olur. Bunun üstünə qəhrəman kultu, "yanğın zonasına paraşütlə tullanma" yaxud "hər kəsi xilas etmək üçün binadan iplə düşmə" kimi cəsur hərəkətləri romantikləşdirmə mədəni ənənəsi əlavə olunanda, SR-mühəndisləri asanlıqla sağlam olmayan, dayanıqsız iş qrafikinə sürüşür. Bunu etmə.

Özünə (və başqalarına) qayğı göstər. Tükənmiş insanlar etibarlı sistem yarada bilmir, ya da onların yaradılmasında effektiv iştirak edə bilmir. Kimsə həftədə mütəmadi 60–75 saat işlədiyini eşidəndə (hətta qürurla desələr də) bunu artıq sevinməli yaxud müsbət qiymətləndirilməli bir şey saymıram. Əksinə, indi bunu düzəldilməli sistem xətası hesab edirəm.

Gördüyümüz iş bərpa və özünəqayğıya vaxt ayırmağı tələb edir. Rəhbər vəzifədəsənsə, əmin ol ki, əməkdaşların rahatlığı və bərpaya lazımi vaxt ayıra bilmələri şirkət mədəniyyətinin bir hissəsidir. Bu, sadəcə düzgün qərar olmaqla yanaşı, nəticədə sistemlərinin etibarlılığını da artıracaq.

## Tarazlıq

"SR-mühəndisləri çoxlu iş görür, bir rejimdən digərinə keçir" (bu doğrudur) deyib, rejimləri necə birləşdirib az-çox effektiv nəticə əldə etmək barədə demədən keçsəm, ədalətsizlik olar.

SR-mühəndislərinin gündəlik qarşılaşdığı bir sıra qütb-əks tapşırıqlar var. Bir neçə əkslik sadalayım:

- rutin iş və uzunmüddətli dəyəri olan iş;
- reaktiv rejimdə iş və proaktiv rejimdə iş (bəzən "cavab tədbirləri" ilə "layihə işi" qarşı-qarşıya qoyulur — yanğın söndürürsən, yoxsa servisi etibarlı etmək üçün kodunu düzəldirsən?);
- fasilə və axın (flow) vəziyyəti;
- tək işləmə və əməkdaşlıq;
- böhran və qeyri-kritik vəziyyət.

İşin xüsusiyyətinə görə bu siyahını davam etdirmək asandır, amma dayanıb bu kontekstdə tarazlıq müzakirəsini çətinləşdirən ekzistensial həqiqətlərdən bəhs etmək istəyirəm. Kaş Pollyanna kimi sadəcə "hər şeydə tarazlığa can at" deyib mövzunu bağlaya biləydim. Amma bu qədər sadə deyil.

İnsanlar "hər SR-mühəndisi vaxtının ən azı 50%-ini mühəndislik işinə" yaxud "50%-ini layihə işinə" sərf etməli kimi ifadələri sitat gətirməyi çox sevir, amma adətən sitatın qalan hissəsini buraxırlar. Əslində sitat belə davam edir: "...bir neçə rüb yaxud il ərzində ortalama olaraq. Rutin işin həcmi kəskin dəyişə bilər, ona görə ayrı-ayrı komandalar üçün 50% hədəfi icra olunmaya bilər, bəzən bu hədəfin altına düşə bilər." Sitat konkret rutin haqqındadır, amma reaktiv və proaktiv iş barədə də oxşar fikirlər var.

Qeyd olunmalı əsas məqam: tarazlığa can atmaq əla fikirdir, amma çox vaxt bu istiqamətdə işi çətinləşdirən situasiya faktorları olur. Məsələn, dəfələrlə qarşılaşdığım bir faktor — "yeni" və "yetkin" servislərlə işin fərqidir. Yeni servislər demək olar həmişə daha "səs-küylü" olur, daha çox reaktiv iş tələb edir və aradan qaldırılmalı daha çox rutin əməliyyat gətirir. Bunu ona görə deyirəm ki, SR-mühəndisləri istədikləri işə vaxtının 50%-dən azını ayıra bildikləri üçün stress keçirə bilər — özlərinin günahı olmadan. Bəzən sadəcə məşğul olmalı yeni servisin yaranır. Bəzən səni problemli yetkin servisə kömək üçün çağırırlar — və çox güman ki, proaktiv işdən çox düzəliş işinə vaxt sərf edəcəksən. Mənim üçün bu situasiya faktorları havanın dəyişməsinə bənzəyir, sadəcə servislərə tətbiq olunur. Bəzən uzun müddət güclü yağış yağacağını bilirəm, ona görə mənəvi olaraq hazıram.

> Hər şey ideal halda öz yerinə düşər. Düşməsə, məhz burda tarazlığa can atmaq (yaxud işdən çıxıb başqa iş axtarmaq) devrəyə girir. Bəzən tarazlığın yoxluğu situasiyaya bağlıdır, amma bəzən daha ciddi səbəblərdən — təşkilatında yaxud vəzifən kontekstində sonu görünməyən problem və çatışmazlıqlardan qaynaqlanır.

Vəziyyəti gözəlləşdirmək istəmirəm. SRE sahəsində pis iş yerləri var. Belə yerdəsənsə və maddi baxımdan işdən çıxa bilərsənsə, bunu dəstəkləyirəm. SRE-də xoşbəxt olmağı haqq edirsən.

## Sona qədər

Ancaq fəsli qəmgin notla bitirməyək — yuxarıdakı tutqun təsvirləri bir az yenidən düşünək. SRE sahəsinin çox qiymətləndirdiyim bir üstünlüyü budur: bu mövzu ümumiyyətlə qaldırılır və dəqiq mövqe təklif olunur. Kitabın əvvəlində deyildiyi kimi, SRE sabit əməliyyat praktikası olmağa çalışır. Tarazlıq bunun mühüm hissəsidir. Ümid edirəm öz SRE praktikanda onu tapa biləcəksən.

Fəsli başladığımız yerə qayıdaq. Seçim haqqında bir şey demək istəyirəm. Bu yazıda SR-mühəndisinin iş günündə qarşılaşa biləcəyi şeylər haqqında təsəvvüründəki boşluqları doldurmağa çalışdım. Üstəlik, ola bilən (və mənə görə olmalı) keyfiyyətləri — məsələn, tarazlığı — vurğulamağa çalışdım. Təcrübəmə görə, bu keyfiyyətlər və müsbət təcrübə məqsədyönlü inkişaf etdirilmədən özü-özünə istədiyimiz qədər parlaq görünmür. Səni bu yolu seçməyə çağırıram.

Sən necə fikirləşirsən?

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

Seçim sizindir.\

# SRE-də səhvlərdən öyrənmək: niyə "əsas səbəb" axtarışı sizi geri saxlayır?

Bu yazıda SRE kitablarının çoxunda yan keçilən, amma burada bütöv fəsil ayrılan bir mövzuya baxaq — səhvlərdən öyrənmək. Etibarlılığa aparan yolda bu, sadəcə "bir daha olmasın" demək deyil, məqsədyönlü təcrübə. Gəlin niyə vacib olduğunu və necə düzgün aparılacağını açaq.

## Üç yol kəsişməsi

Etibarlılıq işinin mərkəzində üç şey kəsişir:

- **Monitoring/observability** — sistemin hazırkı vəziyyəti haqqında aydın mənzərə. Nə **var**, onu göstərir.
- **SLI/SLO kimi metriklər** — niyyət və məqsədləri müəyyənləşdirir. Nə **olmalıdır**, onu göstərir.
- **İnsidentlər/nasazlıqlar** — "var" ilə "olmalıdır" arasında fərqin harada yarandığını göstərən data.

> Səhvlərdən öyrənmə təcrübələri məhz bu kəsişmədə yaşayır — mövcud vəziyyətdən istənilən vəziyyətə keçidi idarə edən geri-bildirim dövrəsi.

Amma bu dövrə yalnız hərəkətlər **məqsədyönlü** olanda işləyir. Təsadüfən "yaxşı niyyət" kifayət etmir.

## Sözlərin gücü: "əsas səbəb" niyə problemdir?

İlk baxışdan səhv — sadə fakt kimi görünür: onu necə adlandırsan da dəyişməz. Amma praktikada terminologiyadakı kiçik fərqlər böyük təsir yaradır.

Ən yaxşı nümunə — **"əsas səbəb" (root cause)** termini. İllərdir insident sonrası "əsas səbəbi" tapmaq üçün araşdırma açırıq, sonra onu qürurla RCA (root cause analysis) sənədinə yazırıq. Reallıqda isə əksər ciddi insidentlərdə tək bir səbəb-nəticə zənciri **yoxdur**.

Mürəkkəb sistemlər mürəkkəb yollarla sıradan çıxır. Buna görə sənaye "əsas səbəb" əvəzinə **"töhfə verən amillər"** ifadəsinə keçdi. Fərq nədən ibarətdir? Tək əsas səbəb axtarmaq davranışı formalaşdırır — və bu davranış sizi "Beş dəfə niyə?" kimi zərərli praktikalara aparır.

## Tələ: "Beş dəfə niyə?" sualı

Bu praktika sadədir: "Niyə?" sualını təkrar-təkrar verirsən (üç yaşlı uşaq kimi), "əsas səbəbə" çatana kimi:

```
Sistem çökdü.
Niyə? — Server dayandı.
Niyə? — Disk doldu.
Niyə? — Log faylı çox böyüdü.
Niyə? — Log limitləyicisi işləmirdi.
Niyə? — Konfiqurasiya faylından silinmişdi.
```

Nəticə: "Əsas səbəb — limitləyicinin konfiqurasiyadan silinməsidir. Bütün configlərdə limitləyici olduğunu yoxlayaq." Özünü təbrik et.

Problem nədədir? Bir zəncirə fokuslanaraq, insidenti anlamaq üçün **vacib olan digər məlumatları** itiririk. Məsələn: "Sistemdə nə **disk dolacaq qədər** log yazırdı?" Bu sual da vacib idi, amma zəncirdən kənarda qaldı.

Tövsiyə: "niyə" dən əvvəl bütün "**nə**" suallarına cavab ver ("Nə baş verdi?"), sonra "niyə"yə keç.

---

## İnsident sonrası baxışlar (postmortem) — nədir, nə deyil?

Bu, səhvlərdən öyrənmənin əsas fəaliyyətidir. Terminologiya müxtəlifdir: postmortem, öyrənmə baxışı, retrospektiv — bu yazıda "insident sonrası baxış" (PiR — postincident review) işlədəcəyik.

### Nə deyil?

- **Fəaliyyət/təmir siyahısı deyil.** Baxış nəticəsində fəaliyyət siyahısı çıxa bilər, amma əsas məqsəd — öyrənmə prosesidir.
- **Sənəd/hesabat deyil.** Yazmaq faydalıdır, amma barmaqla aya işarə edəndə barmağı ayla qarışdırma — sənədin özü məqsəd deyil.
- **Səbəb-nəticə zənciri qurma cəhdi deyil.** Detektiv hekayəsi yazmırıq. İnsidentlər bundan daha mürəkkəbdir.
- **Günahkar axtarışı deyil.** Bu qədər vacibdir ki, aşağıda ayrıca bəhs edəcəyik.

İnsident sonrası baxış — insidenti araşdırmaq, sənədləşdirmək və müzakirə etmək prosesidir; məqsəd ortaq anlayış yaratmaq və mümkün qədər çox öyrənməkdir. Çox vaxt bundan sonra təkrarlanma ehtimalını azaltmaq üçün təmir addımları müəyyənləşir.

### Nə vaxt başlamalı?

Mümkün qədər tez, amma **24–36 saatdan gec olmayaraq** — insanlar unudur. Ağır insidentdən sonra komanda yatmaq istəyəcək, amma əlindən gələni et.

### Hər sbboydan sonra lazımdırmı?

Ümumi fikir: hər əhəmiyyətli insidentdən sonra bəli. Əlavə meyar: **öyrənməyə dəyər bir şey varmı?** Əgər eyni tip təkrarlanan insidentdirsə, əvvəlki baxışdan çıxan dərsi **tətbiq etməyə** vaxt sərf etmək daha məhsuldar ola bilər, nəinki baxışı təkrarlamaq.

---

## Proses: xronologiya qurmaq

İlk və ən vacib addım — hadisənin ətraflı xronologiyasını qurmaq (əvvəl, zamanı, sonrası daxil olmaqla). Məqsəd — insidentdə olmayan işçinin belə sənədi oxuyandan sonra dəqiq təsəvvür əldə etməsi.

Xronologiya bunları əhatə etməlidir:

- hansı qərarlar qəbul edildi (hansı ideyalar rədd edildi);
- o an insanların əlində hansı məlumat vardı (monitoring/observability data və s.);
- kim iştirak etdi, kim gözlənildiyi halda etmədi (məs. "Pat, bu sahənin eksperti, məzuniyyətdə idi");
- hansı resurslar (sənədlər, insanlar) cəlb olundu.

Mümkünsə, ekran görüntüləri, əsas kanaldakı mesajlar da əlavə et — araşdırma zamanı qərarların niyə qəbul edildiyini anlamağa kömək edir.

> Bu böyük işdir, amma ən gözlənilməz kəşflər məhz bu araşdırma zamanı — "Dayan, bu nədir? Bu data nöqtəsini görməmişdim..." anında baş verir.

### Real-vaxt baxışı

Draft hazır olanda, insident iştirakçıları (ən azı) bir yerə yığılıb xronologiyanı canlı müzakirə edir, düzəliş və əlavə edirlər. Təcrübəli, **neytral** koordinator dəvət et — insidentdə birbaşa iştirak etməmiş biri.

Söhbətdə hansı sual sözünü işlətdiyin əhəmiyyətlidir: "**necə**" və "**nə**" sualları araşdırma rejimində saxlayır. "**Niyə**" sualı isə diaqnoza və gələcək addımlara keçirir — buna görə toplantının **sonunda** verilməlidir.

### Növbəti gün ikinci toplantı

Bu, çox təşkilatda praktik olunmur, amma faydalıdır: birinci toplantını "nə baş verdi"yə, növbəti günki (bəlkə daha kiçik) toplantını isə "bunun üçün nə edəcəyik?" sualına ayır. Bu, fəaliyyət siyahısını tələsik çıxarmaqdan qoruyur və iştirakçılara düşünmək üçün vaxt verir.

---

## Günahsız postmortem

Etibarlılığı işdən çıxarma ilə əldə etmək **olmur**. Səhv edən insanı işdən çıxarmaq sistemi etibarlı etmir — sadəcə komandanı bir (bəlkə vacib) üzv əskik edir. Belə mühitlərdə də səhvlərdən öyrənilir — sadəcə **yanlış** şey öyrənilir: səhvi gizlətməyi.

Səhv edib ondan öyrəndiyini paylaşan insanları təşviq edən təşkilatlar daha çox öyrənir.

---

## Beş ümumi tələ

Bunlar toplantıda tez-tez rast gəlinən, prosesə xas problemlərdir.

### Tələ 1: "İnsan faktoru" ilə kifayətlənmək

**Problem.** Konkret anda insan səhv edə bilər, amma "insan faktoru" etiketi ilə dayanıb daha dərinə getməmək problemdir.

**Həll.** O anda insan **düzgün** qərar verdiyini düşünürdü. Sual ver: "O zaman nə bilmirdi? Xəta mesajında/dashboard-da/sənəddə nə yox idi? Alətlərimiz və proseslərimiz niyə kifayət etmədi?"

### Tələ 2: fərziyyə əsaslı düşüncə ("edə bilərdi", "etməli idi")

**Problem.** "Dejurnal ehtiyat serverə keçə bilərdi", "developer konfiqurasiyanı dəyişməli idi" — bunlar **baş verməyən** hadisələri təsvir edir. Baş vermiş hadisəni anlamaq üçün baş verməmiş hekayə uydurmaq — ən yaxşı halda diqqəti yayındırır, ən pisdə isə iştirakçıları qınamaq üsuludur.

**Həll.** Faktiki baş verənə fokuslan, arzu olunanı yox.

### Tələ 3: nəticəyə görə qərarı mühakimə etmək (normativ dil)

**Problem.** "Tələsik", "səhlənkarcasına", "adekvat olmayan" kimi qınayıcı zərflər işlədirsənsə — normativ dilə keçmisən. Bu, insanların o anda **bilə bilməyəcəyi** nəticəyə görə onları mühakimə etməkdir.

**Həll.** O an insanların nəyi bildiyini, hansı dəstəyin (şəxsi, sistem, təşkilat) çatışmadığını araşdır.

### Tələ 4: maşının qüsursuzluğu fərziyyəsi (mexanistik izah)

**Problem.** Jessica DeVita buna "Scooby-Doo yanılması" deyir: "Sistem əla işləyərdi, əgər bu uşaqlar mane olmasaydı." İnsan xaos agenti kimi göstərilir, maşın isə qüsursuz.

Əslində idarə etdiyimiz servis — **sosiotexniki** konstruksiyadır: maşın + onunla qarşılıqlı əlaqədə olan insanlar. İnsanlar adətən zərərverici deyil, çox vaxt sistemin gözlənilməz problemlərə uyğunlaşmasını təmin edən **adaptasiya potensialının** mənbəyidir.

**Həll.** İnsanı günahlandırıb keçmək əvəzinə, ona dəstək üçün nə edilə biləcəyini soruş. Onu təkmilləşdirilməli sistemin **hissəsi** kimi gör.

### Tələ 5: müsbət tərəfləri görməzdən gəlmək

**Problem.** Baxışlarda demək olar heç vaxt soruşmuruq: "**Normalda** bu necə işləyir?" Yalnız sıradan çıxma anlarına fokuslanırıq, halbuki işləyən hissələrdən də çox şey öyrənmək olar.

> Eric Hollnagel-in "Safety-II" və Nancy Leveson-un "Safety-III" yanaşmaları — diqqəti nasazlıq anlarından yox, hər şeyin normal işlədiyi vaxta yönəltməyi təklif edir. Nə yaxşı işləyir, onu gücləndirmək insidentlərin qarşısını daha effektiv alır.

**Həll.** "Bu adətən necə işləyir?" və "Bu insidentin daha çox zərər verməsinə nə mane oldu?" kimi suallar soruş.

---

## Resilience engineering ilə əlaqə

David Woods "устойчивость/resilience" termininin dörd mənasını ayırır:

| Termin | Sistemin necə... |
|---|---|
| **Rebound** | ...travmatik hadisələrdən sonra normal fəaliyyətə qayıdır |
| **Robustness** | ...artan mürəkkəblik və stres amillərinə tab gətirir |
| **Graceful extensibility** | ...sərhədləri pozan gözlənilməz hadisələrdə əlavə adaptiv imkan gətirir |
| **Sustained adaptability** | ...şərtlər dəyişdikcə gələcək sürprizlərə uyğunlaşır |

Əksər SRE-lər rebound və robustness arasında işləyir, amma dayanmağa ehtiyac yoxdur.

## Chaos engineering ilə əlaqə

Tərif: *"Chaos engineering — sistemin production-dakı türbulent şəraitə davam gətirmə qabiliyyətini yoxlamaq üçün eksperiment aparan bir intizamdır."*

Vurğulanan sözlər — **"intizam"** və **"eksperiment"**: bu, təsadüfi "production-u sındırma" deyil, elmi metodla (hipotez → eksperiment) aparılan araşdırmadır.

Prinsiplərə görə struktur:

1. "Stabil vəziyyəti" ölçülə bilən normal davranış kimi müəyyənləşdir.
2. Bu stabil vəziyyətin həm nəzarət, həm eksperiment qrupunda saxlanacağını fərz et (hipotez).
3. Real hadisələri əks etdirən dəyişənlər daxil et (server nasazlığı, disk xətası, şəbəkə kəsilməsi).
4. İki qrup arasında fərq tapıb hipotezi təkzib etməyə çalış.

Netflix-in Simian Army (chaos monkey və s.) bu sahədə ilk açıq alətlərdən biri idi.

---

## Sonra nə etməli?

Baxışdan/eksperimentdən sonra öyrənilənləri **real tətbiq etmək** vacibdir, sənəd tozlanmasın:

- **Kitab klubu/seminar** — köhnə insidentləri (daxili və xarici) mütəmadi analiz et, korporativ mədəniyyəti gücləndir.
- **"Mühəndislik sürprizləri" bülleteni** — qısa mesaj: "Chaos eksperimentində gözlənilməz effekt tapdıq" və ya "Son load balancer nasazlığından öyrəndiyimiz top-3".
- **Production-readiness/design review yoxlaması** — öyrənilənləri development prosesinə köçür ki, təkrarlanmasın.
- **Metaanaliz və ML** — insident sənədləri toplananda, onların üzərində trend analizi (əsas kateqoriyaları müəyyənləşdirmək) apar.

## Nəticə

"Əsas səbəb" axtarışından "töhfə verən amillər"ə keçid sadə terminologiya oyunu deyil — düşüncə tərzini dəyişir. İnsident sonrası baxış sənəd yazmaq yox, **öyrənmə** prosesidir; beş tələdən qaçmaq (insan faktoru, fərziyyə dili, normativ dil, mexanistik izah, müsbətləri unutmaq) bu öyrənmənin keyfiyyətini müəyyənləşdirir.

Sizin komandada son insident baxışı hansı tələyə düşdü?


# Təşkilatında SRE niyə tutmur — və tutması üçün nə lazımdır?

Salam! SRE kitabının 11-ci fəslindəyik. Mövzu — **uğur faktorları**. 5-ci fəsildə fərd səviyyəsində SR-mühəndisin uğurlu olmasına kömək edən keyfiyyətlərdən danışmışdıq. İndi eyni sualı təşkilat səviyyəsində veririk: hansı şərtlər olmasa, SRE nə qədər səy göstərsən də, tutmur? Gəlin başlayaq.

Müəllif dərhal xəbərdarlıq edir: sehrli düstur yoxdur. "5-ci fəsildəki keyfiyyətləri təcəssüm etdirən adamları topla, SRE komandası özü-özünə yaransın" — xoş arzu, amma proses bundan qat-qat mürəkkəbdir. Aşağıdakı 8 faktor — təşkilatının SRE üçün münbit olub-olmadığını yoxlamaq üçün diaqnostik sual dəsti.

---

## 1-ci faktor: problem nədir?

Aydın görünür, amma təşkilatlar bu sualı özlərinə soruşmurlar:

> Bizdə SRE ilə həll oluna biləcək **problem** varmı?

Müəllif məhsul menecerliyi təlimindən öyrəndiyi bir vərdişi paylaşır: "Məhsulun həll etdiyi bazar problemi nədir?" sualını verəndə çox vaxt cavab problem yox, **xüsusiyyət** olur. Məsələn "məhsulumuz müxtəlif bulud provayderlərində infrastrukturu izləməyə imkan verir" — bu problem deyil, funksiyanın təsviridir. Sual təkrar-təkrar, fərqli formada verilməlidir, əsl problem səslənənə qədər.

Eyni dinamika SRE-də də var. "SR-mühəndis çatışmazlığı", "infrastrukturu idarə edəcək adam lazımdır", "qlobal genişlənəcəyik" — bunlar problem tərifi **deyil**. Əvəzinə, SRE-nin həqiqətən həll edə biləcəyi problemlər belə səslənir:

- Nasazlıqları aradan qaldırmağa həddən artıq vaxt sərf edirik.
- Qlobal genişlənmə uğursuz olacaq deyə narahatıq — mövcud sistemlərimiz tab gətirməyəcək.
- Sistemlərimizin nə qədər etibarlı olduğunu bilmirik, ona görə dəyişiklik etmək təhlükəsizdirmi — deyə bilmirik.
- İnsanlarımız sistemi idarə etməyə (yəni **rutinə**) həddən artıq vaxt xərcləyir.

> Problemini dəqiq formalaşdırmaq üçün vaxt ayır — işə başlamazdan əvvəl bunun SRE-nin güclü (və zəif) tərəflərinə nə qədər uyğun olduğunu yoxla.

---

## 2-ci faktor: təşkilat məqsədə çatmaq üçün nədən keçə bilir?

"Etibarlılıq sizin üçün vacibdirmi?" sualını müəllif artıq vermir — hamı həvəslə baş yellədib etibarlılığı sevdiyini deyir. Bu, **səhv sualdır**.

Doğru sual: **"Təşkilat məqsədə çatmaq üçün nədən keçməyə hazırdır?"**

Bunu bilmək üçün bir neçə "şaşlıq söhbəti" sualı:

- Mühəndislərin vaxtını buna ayırmağa hazırdırlarmı?
- Layihəyə xüsusi olaraq etibarlılığı artıran iş növləri əlavə etməyə hazırdırlarmı?
- Lazım gələndə (yəni müəyyən sıradan çıxmalardan sonra) adamları funksionallıq işindən çəkib etibarlılıq problemlərinə yönəltməyə hazırdırlarmı?
- Xidmət səviyyəsi məqsədlərinə (SLO) çatılmayıbsa, yeni versiyanın buraxılışını ləğv etməyə hazırdırlarmı?
- İnsident icmallarının səthi keçirilməməsi üçün fəal işləməyə hazırdırlarmı?
- Növbətçilik qrafiki insani və sabitdir?
- SR-mühəndisləri inkişaf prosesinin erkən mərhələsindəki iclaslara qatılırmı?
- SR-mühəndislərinin mənbə kod repozitoriyalarına birbaşa girişi var ki, etibarlılıq üçün dəyişiklik edə bilsinlər?

Diqqət et: bu sualların **heç biri** texniki deyil. Yeni başlayan təşkilatlarla danışanda müəllif SLI/SLO-dan bəhs edir, amma **error budget**-dən (səhv büdcəsi) az danışır — çünki real error budget siyasəti tələb edir: büdcə aşılanda (daha vacibi, **tükənəndə**) təşkilat nə edəcək? Bu siyasə həmin nöqtəyə çatmazdan **əvvəl** razılaşdırılmalı və faktiki tətbiq olunmalıdır — etibarlılığın nəzəriyyəsi ilə praktikası burada üz-üzə gəlir.

---

## 3-cü faktor: təşkilatın səbri çatırmı?

DORA-nın (DevOps Research and Assessment) 2023 Accelerate hesabatına görə, etibarlılıq işinin faydaları görünməzdən əvvəl vaxt lazımdır. Tez qələbələr mümkündür (tövsiyə olunur), amma əyri adətən **"J" hərfi** formasındadır. DORA-dan Steve McGhee yazır: "Bu əyrilər sadəcə onu göstərir ki, nəticələr (faktiki etibarlılıq) yeni imkanlar (indi nə edə bilərik?) yığılana qədər görünməyəcək. Bəzən bunlara 'kumulyativ' deyirik."

Əyrinin yüksələn hissəsinə çatana qədər gözlədiyin müddət, düşündüyündən uzun olacaq. Təşkilatın vəziyyət nəzərəçarpacaq dərəcədə yaxşılaşana qədər gözləməyə hazırdırmı?

Ən yaxşı məsləhət:

- hər fürsətdə gözləntiləri düzgün formalaşdır;
- planlarını aydın çatdır ("faza", "aralıq dövr" kimi terminlər mərhələli irəliləyişi göstərir);
- mərhələ uğurlarını əldə etdikcə bildir — bu, insanların gözləməsini asanlaşdırır.

---

## 4-cü faktor: əməkdaşlıq mümkündürmü?

SR-mühəndisləri yorulmadan əməkdaşlıq edir. Səbəb yalnız cazibədarlıq deyil — etibarlılığı effektiv artırmağın başqa yolu yoxdur. Bulud mühitinə, tərtibatçılara, səhmdarlara yumruq göstərmək işə yaramır. Etibarlılıq məqsədlərinə doğru davamlı irəliləmək üçün hamısı ilə işləmək lazımdır.

Aydın görünür, amma müəllif təşkil daxilində sürtünmə (məsələn qapalılıq — silo), qarşılıqlı etimad və hörmət çatışmazlığı haqqında tez-tez eşidir. Yoxlama sualları:

- SR-mühəndis təşkilat üzrə işə qəbul meyarlarının/müsahibə suallarının hazırlanmasında iştirak edirmi (etibarlılıqla işləyə bilən adamların işə götürülməsini təmin etmək üçün)?
- Təşkilat "rotasiya" edir yaxud etməyə hazırdırmı — tərtibatçılar bir müddət SRE-də, SRE üzvləri başqa bölmələrdə işləsin?
- Başqa komanda ilə birgə iş üçün onlayn alət/kanala dəvət almaq nə qədər çətindir?
- Alət seçimi (monitorinq, müşahidə daxil) qərarlarını təşkilatda kim verir?

---

## 5-ci faktor: təşkilat məlumata əsaslanaraq qərar verirmi?

Bura da "təşkilat nədən keçməyə hazırdır?" sualının əks-sədası düşür, amma ayrıca araşdırmağa dəyər. SRE-nin ən yaxşı təcrübələrinin çoxu bir inanca əsaslanır: etibarlılıqla bağlı məlumatı diqqətlə toplayıb, sonra qərarı **bu məlumat əsasında** vermək. Maliyyə şöbəsi rəqəmlərlə işləməyi artıq bilir — amma hər şöbədə eyni təcrübə yoxdur.

Error budget bunun bir nümunəsidir, amma əvvəlcə təşkilatın məlumat toplamağa (monitorinq və müşahidə) həvəslə yanaşdığını yoxlamaq lazımdır. "X-i izləməliyikmi?" sualına cavab "narahat olma, onsuz da etibarlı olduğunu bilirik", ya "bu başqa komandanın işidir", ya "daha vacib işlərimiz var" — bu, SRE-nin tətbiqi üçün pis işarədir.

Ən faydalı başlanğıc sualı: **"İzləmə sisteminiz haqqında danışın..."**¹ Sonra standart jurnalist sualları: Nəyi izləyirsiniz? Haradan izləyirsiniz? Necə izləyirsiniz? Bunu kim edir? Və (bəlkə ən vacibi) **niyə** izləyirsiniz?

Vəziyyətə alışandan sonra dərinləşdir: "Bu məlumatla nə edirsiniz?" Buraya boş baxışa hazır ol. İlk cavab çox vaxt: "Hər şeyin qaydasında olduğuna əmin olmaq üçün baxırıq!" — bu, şəbəkə əməliyyat mərkəzi (NOC) tipli daimi izləmədir, geniş yayılmışdır və çox adamın ağlına ilk gələn budur.

İlk cavab belə olsa, məyus olma. Sıradan-çıxma tiplərinə görə apardıqları təhlil və mövcud monitorinq tənzimləmələrinin effektivliyi haqqında növbəti suallar səni məlumat-əsaslı hərəkətə daha yaxın cavablara aparar. Sənin işin — təşkilatın bu istiqamətdə irəli getməyə nə qədər maraqlı olduğunu öyrənmək.

¹ *Bu mövzuda söhbət qura bilmirsənsə, bu özü aydın mənfi göstəricidir.*

---

## 6-cı faktor: təşkilat öyrənə və öyrəndiyi əsasında hərəkət edə bilirmi?

Kitab boyu səhvlərdən öyrənmə mövzusu təkrarlanır — bu, SRE düşüncə tərzinin əsas xüsusiyyətidir. Problem: hər təşkilat səhvlərdən öyrənməyi bacarmır. Qəribə səslənir — bütün təşkilatlar öyrənir, ya da ən azı cəhd edir, elə deyilmi? Amma əməliyyat sahəsində uzun müddət işləmiş demək olar hər kəsin, səhvlərdən öyrənməyən indiki və ya keçmiş işəgötürən haqqında ən azı bir hekayəsi var.

Diaqnostik suallar:

- Təşkilat harada və nə vaxt qəsdən səhvlərdən öyrənməyə çalışır? İnsident icmalları/təhlillər/retrospektivlər aparırlar?
- Bu fəaliyyəti edərkən nə qədər formaldır? İnsanlar bu prosesi səbirsizliklə gözləyir, yoxsa vergi bəyannaməsi doldurmaq kimi zəruri iş sayır?
- Prosesə kim qatılır? İştirak nə qədər lokallaşıb?
- Sıradan-çıxma müzakirəsində kim iştirak edir (əgər ümumiyyətlə müzakirə olunursa)? Müzakirənin istiqaməti nədir — öyrənmək, yoxsa günahkar tapmaq? İnsanlar toplantıdan yaxşı, yoxsa pis hisslə çıxır?
- Məlumat qeyd olunurmu? Keçmiş qeydlərə kimsə baxırmı? (Əlavə sual: kimsə bu qeydləri təhlil edibmi?)
- Qeyd olunan məlumata təşkilatda kim baxa bilir? Rəhbərliyə çatdırılırmı (və rəhbər onu oxuyurmu)?
- Sonra ictiyyətə açılırmı? Həssas sual: açıq versiya nə qədər səthidir? Daxili və xarici versiyalar arasında böyük fərq varmı? İctimaiyyət dərsin götürüldüyünü necə anlayır?
- Prosesin hansı elementləri dəyişib (ideal halda — yaxşılaşıb)?
- Sıradan-çıxmaya birbaşa qatılmayan komandalar öz fəaliyyətlərində nəyisə dəyişib/yaxşılaşdırıbmı? Başqa komanda öyrənilən dərs əsasında öz işini dəyişibmi?²

Görürsən — sual iyerarxiyası pilləli: "ümumiyyətlə edirlərmi?" → "necə edirlər?" → "yaxşı edirlərmi?" → "işlədimi?" Təşkilatın bu eskalatora hələ ayaq basmadığını görsən, bu, SRE-ni tətbiq etməzdən əvvəl gözləməli olduğunu göstərən xəbərdarlıq siqnalıdır.

² *Bu, təşkilatda müəyyən inteqrasiya səviyyəsi tələb edən "irəli səviyyə" sualdır, hər zaman baş vermir.*

---

## 7-ci faktor: vəziyyəti dəyişə bilirsənmi?

Bölmə adını əvvəlcə "Vəziyyətə sahibsənmi?" qoymaq istəyirdi, amma bu, mürəkkəb sistemlərin sosioteknik reallığına ziddir. Fikir sadədir: SR-mühəndis etibarlılığı artıracağını düşündüyü hərəkəti (kod, infrastruktur, arxitektura, billinq və s. dəyişikliyi) **icra edə** bilirmi?

SRE — etibarlılığı artırmaq üçün ehtiyatlı, düşünülmüş, məhdud və izlənilə bilən dəyişikliklər deməkdir. Bu dəyişiklikləri etmək imkanı olmadan SRE boş sözdən başqa deyil. Özündən soruş, SRE-yə aid şəxsin təşkilatında aşağıdakılarda dəyişiklik etməsi nə qədər çətindir:

- sənədləşdirmə (komanda, təşkilat, məhsul);
- istehsalatda olan məhsul/xidmət kodu;
- development, test, istehsalat infrastrukturu;
- monitorinq, deployment və s. üçün istifadə olunan alətlər;
- reaktiv və proaktiv işə ayrılan vaxt nisbəti;
- tərtibatçı və əməliyyat mütəxəssislərinin işə qəbul təcrübəsi (məsələn müsahibə sualları).

Bu tam siyahı deyil, amma hamısını "mümkün deyil" mövqeyinə itələmisənsə, SRE mühitinə uyğun gəlmir deməkdir.

### Bəs bütün proqram təminatı alınıb ya abunə ilə əldə olunubsa?

Çox SRE bələdçisi fərz edir ki, təşkilatının öz tərtibatçıları var, SR-mühəndisləri onlarla işləyir. Həmişə belə deyil — bəzi təşkilatlar hər şeyi "hazır" alır ya SaaS-dan istifadə edir. Belə reallıqda SR-mühəndisə yer varmı?

Cavab yenə eyni sualdadır: "Nəyisə dəyişə bilirsənmi?" Burada suallar bu şəklə düşür: "Vəziyyəti dəyişmək üçün kifayət qədər rıçaq, konfiqurasiya, arxitektura girişin (keşləmə/yönləndirmə qatları, konfiqurasiya, diaqnostik interfeys) varmı? Bu vəziyyətdə etibarlılığı artıra bilərsənmi?" Hər ikisinə cavab mənfidirsə və sənə "olanla işlə, narahat olma" deyilirsə, SR-mühəndisdən bu şəraitdə çox az fayda gözlənilə bilər.

Amma **"heç fayda yoxdur"** demədim — SR-mühəndis yenə də təchizatçıdan hansı standart olmayan proqram təminatının istənilməli olduğunu məsləhət görə bilər, daha effektiv erkən xəbərdarlıq sistemi qura, ya da keyfiyyətli risk qiymətləndirməsi təqdim edə bilər.

---

## 8-ci faktor: sistemin ləngiməsini görə (və aradan qaldıra) bilirsənmi?

Bütün faktorlar arasında bu ən az zərərli görünür. Tez-tez düzgün sual vermək kifayətdir ki, davamlı yanan xəbərdarlıq işığı yansın. Məsələn: "Bu xidmətdəki nasazlıq bildirişini SRE komandasına çatdırmaq/yönləndirmək nə qədər vaxt aparır?", sonra "Bu xidmətin əlçatanlıq məqsədi nədir?"¹ Cavab "iddiaya ötürmə üçün cəmi iki saat", məqsəd isə "xidmət on dəqiqədən çox söndürülməməlidir" olsa — problem var.

Sistem yaxud təşkilat səviyyəsində ləngimə mənbələrini axtarmağa başlayan kimi, onları tapmaq adətən asan olur. Başqa bir sadə üsul: sıradan-çıxma vaxtının təxminən nəyə sərf olunduğunu təhlil etmək.

Sıradan-çıxma kontekstindən kənarda, etibarlılığa iterativ addımlarla çatmağın nə qədər çətin olduğunu müəyyən etmək üçün bu ifadələrlə başlayan suallar kömək edir:

- Nə etmək lazımdır ki...?
- Neçə addım lazımdır ki...?
- Kimin icazəsi var...? yaxud Nə üçün hansı icazə lazımdır?
- Nə qədər tez-tez (deploy edir, dəyişiklik edirsiniz və s.)...?

Bu sualları verməklə vəziyyəti anlamağa yarım addım yaxınlaşırsan, amma çətin sual budur: **"Prosesə qatılan insanlar onu dəyişməyə nə qədər hazırdır?"**

Keçmiş nəticələr gələcəyə zəmanət deyil, amma komanda üzvləri keçmişdə ləngiməni necə azaltdıqlarına dair nümunə göstərə bilirsə, bu yaxşı işarədir.

¹ *Sual verərkən yanında hər "doqquz"un icazə verdiyi ümumi dayanma vaxtını göstərən qrafik saxla. Dörd doqquz istəyirsən? Problem yox — ildə ~52 dəqiqə dayanma alacaqsan. İddianın işlənməsi üçün tək bir saat lazımdır? (Qrafikə bax.) Voy.*

---

## Tənzimlənən mühitdə SRE

Əks nöqteyi-nəzər üçün bir qeyd: yuxarıda "ləngimə = pisdir" mövqeyinə meyl edilib, guya ləngimə SRE səylərini boğur, uğur üçün təşkilat onu azaltmağa hazır olmalıdır. Amma bəzən proses ləngiməsi qəsdən yox, **xarici qüvvə** ilə şərtlənir və dəyişdirilə bilməz. Bu, tənzimlənən sahələrdəki dostlarımızın SRE-ni unutduğu deməkdirmi?

Tənzimlənən sahələrdə (maliyyə, fintech) SR-komandalarının uğurlu işi əksini göstərir. Sirri: hansı təcrübələrin **məcburi** məhdudiyyət, hansının isə sadəcə **ənənə** olduğunu daim soruşmaq. Məsələn, "vəzifə ayrılığı" tələb oluna bilər — iki fərqli vəzifədəki mütəxəssis dəyişiklikdən əvvəl icazə verməlidir. Bu halda SR-mühəndisləri həmin mərhələni ləğv etmək üçün deyil, tələbləri qoruyaraq onun rutinini maksimum azaltmaq üçün qoşulur.

Bu sahələrdən birində işləyirsənsə, SREcon konfransından oxşar mövzudakı çıxışlara baxmaq tövsiyə olunur.

---

## Xırda şrift

Bu fəsillərdə bir qeyd-şərt olmalıdır, budur: yuxarıdakı faktorların mümkün qədər çoxunu təmin etsən belə, SRE səylərinin uğurla nəticələnəcəyinə zəmanət yoxdur (ilk cəhddə mütləq deyil). SRE tətbiqini "bərkitməyin" bir çox yolu var (növbəti fəsil məhz buna həsr olunub) — bunlar xüsusilə təşkilat səviyyəsində aktualdır. Təşkilat səviyyəsində keyfiyyətli SRE işi tez-tez SRE komandalarının günahı olmadan iflasa uğrayır — məsələn, "yanlış" vitse-prezident ərazi müharibəsində qalib gələndə.

Kitab boyu (açıq deyilməsə də) bu cür "təbii fəlakətlərə" qarşı qorunmağa kömək edəcək fikirlər təklif olunub. Məsələn, rəhbərliyə (və başqalarına) müntəzəm SRE qələbələri/dəyərləri haqqında hesabat vermək etimad qurmağa və təşkilatda "bərkiməyə" kömək edir. Bunlar Olimp dağından atılan ildırımdan qorumur, amma şirkətin maliyyəsini xilas edən əsas tərəfdaş sayılsan, hədəf tutulması çox çətinləşir.¹

¹ *Bu mövzunu bir az genişləndirsək: SRE xərcləri azalda bilər, resursları effektiv istifadə edə bilər, avtomatlaşdırma və rutin azaltma ilə heyət xərclərini aşağı sala bilər, sıradan-çıxma xərclərini azalda, inkişaf sürətini artıra bilər və s. Bunlardan hər hansını edəndə ətrafa mütləq bildir (etmirsənsə, başlamağın vaxtıdır).*

---

## Hər şey təşkilatın dəyərlərindən asılıdır

Fəsli bitirərkən Narayan Desai-nin SREcon EMEA 2017-də etdiyi "Care and Feeding of SRE" çıxışına baxmağı tövsiyə edirəm. Bu çıxış müəllifin təşkilatda SRE-yə yanaşmasının təməlini qoyub. Desai Google-da SRE-ni bu qədər uğurlu (ümumiyyətlə mümkün) edən xüsusiyyətləri tutmağa çalışıb. Müəllif "Seeking SRE" kitabında və burada təşkilatını Google ilə müqayisə etməməyi xəbərdarlıq etsə də, onun təhlilindən çıxan əsas fikir aydındır:

> **Təşkilatın dəyərləri — SRE uğurunun açarıdır.**

Bu fəsildəki bütün suallar, açıq deyilməsə də, məhz bunun üçün nəzərdə tutulub: etibarlılıqla və SR-mühəndis kimi ambisiyalarınla kəsişən təşkilat dəyərlərini aydınlaşdırmaq.² Bu suallara bu perspektivdən yenidən baxmağı tövsiyə edirəm.

² *Desai-nin çıxışından sonra dinləyicilərdən biri təşkilatının müqəddəs prinsiplərindən birini paylaşıb: "X günü məhsul buraxacağımızı elan ediriksə, mütləq həmin gün buraxırıq." Bu, xidmət SLO-larına çatmayanda buraxılışları bloklayan geniş yayılmış error budget siyasəti ilə birbaşa ziddiyyət təşkil edir. Görürsən, təşkilat dəyərləri haqqında söhbət nə qədər tez maraqlı olur?*

---

Sənin təşkilatın bu 8 sualın neçəsinə müsbət cavab verə bilir? Cavab "çoxuna yox" olsa da, narahat olma — bu, sadəcə haradan başlamalı olduğunu göstərir.

# SRE səyləri necə iflasa uğrayır?

Salam! Kitab boyu səhvlərdən öyrənmənin dəyərini dəfələrlə vurğulamışdıq — bəs bu fikri SRE-nin özünə tətbiq etsək necə olar? Bu fəsildə real həyatda SRE səylərinin təşkilat səviyyəsində necə iflasa uğradığına baxacağıq, sonra bu iflasın bizə verdiyi dərsləri necə istifadə edəcəyimizi müzakirə edəcəyik. Material Bleyk Bissetin "Seeking SRE" kitabının 23-cü fəsli daxil olmaqla bir neçə mənbədən və real hekayələrdən götürülüb.

Əvvəlcə "iflas" dedikdə nəyi nəzərdə tutduğumu aydınlaşdıraq. Tolstoyun "Anna Karenina" romanının məşhur ilk cümləsi ("Bütün xoşbəxt ailələr bir-birinə bənzəyir, hər bədbəxt ailə isə öz-özünə bədbəxtdir") burada çox yerinə düşür, amma ümumiləşdirsək, iflas iki formadan birində özünü göstərir: 1) təşkilatda bir növ immun cavab yaranır və müəyyən vaxtdan sonra SRE səyləri tamamilə rədd edilir, ya da (bəlkə daha faciəvi) 2) SRE sahəsinin təklif edə biləcəyi heç bir üstünlük əldə olunmur və SR-mühəndislər sakit ümidsizlik içində yaşayır.¹

İndi isə SRE tətbiqinin iflasına səbəb olan amillərə keçək.

¹ *Ümid edirəm ki, əksəriyyət üçün bu şişirtmədir, amma kifayət qədər adamla danışmışam ki, bəzən vəziyyət həqiqətən acınacaqlı olur.*

---

## 1-ci amil: SR-mühəndis əldə etmək üçün vəzifə adını dəyişmək

Ən sadə məsələdən başlayaq. Bu, tez-tez rastlaşdığım bir şeydir, ona görə qısa keçəcəyəm. Tez-tez SRE şöbəsi ya da SR-mühəndis vəzifəsi sadəcə mövcud vəzifələrin və ya vakansiyaların adını dəyişməklə yaradılır. Bəzən bu, vəzifələri işə qəbul baxımından cəlbedici etmək, ya da komandanın təşkilatdakı statusunu qaldırmaq üçün edilir — axı "SRE" "sistem administratoru" ya da "ikinci səviyyə dəstək mühəndisi"ndən daha sərin/təzə/parlaq səslənir. Kiçik faizdə bu ad dəyişikliyi əsaslıdır² — təşkilat həqiqətən SR-mühəndis vəzifəsi yaratmaq istəyir və onu rəsmiləşdirməyə çalışır. Ad dəyişikliyindən sonra təşkilatın etdiyi hərəkətlər uğurun gələcəyini müəyyən edir.

Əgər sonradan təşkilat yeni vəzifənin öhdəliklərinə real işi — dəyərlər/prioritetlər, təlim, resurslar, ünsiyyət və mədəniyyət (siyahı tam deyil) — daxil etmək üçün ciddi səy göstərmirsə, ən yaxşı halda solğun və işlək olmayan bir SRE fəaliyyəti alınacaq. Ən pis halda (və düzünü desək, bu daha ehtimallı nəticədir) hər şey əvvəlki kimi davam edəcək, sadəcə daha böyük sinizmlə — bu da mövcud komandanın effektivliyini daha da azaldacaq.

² *Bu faizin nə qədər olduğunu bilmək istərdim, amma bu sahədə real araşdırmalardan xəbərim yoxdur. Təəssüf ki, bu iddia illər boyu toplanan pərakəndə müşahidələrə əsaslanır, real məlumata yox.*

---

## 2-ci amil: üçüncü səviyyə dəstək komandasının SRE şöbəsinə çevrilməsi

Tez-tez rastlaşdığım bir ad dəyişikliyi variantı — üçüncü səviyyə (ya da hər hansı digər) dəstək komandasının SR-mühəndis komandasına çevrilməsi. Təşkilat adətən birinci ya ikinci səviyyədən ötürülən daha mürəkkəb və ya vaxt aparan sorğuları həll edən mövcud böyük mütəxəssis qrupunu götürür və onları "SR-mühəndis komandası" adlandırır. Bununla belə, komandanın faktiki funksiyası ya missiyası dəyişmir.

Problemin kökü elə bu son cümlədədir. Məsələ insanların təcrübəsində, infrastruktura giriş səviyyəsində, təşkilat üzrə geniş problem spektrini həll etmə zərurətində, hətta onların (ideal halda) yaxşı cilalanmış nasazlıq aradan qaldırma bacarıqlarında deyil. Bunların hamısı SR-mühəndis komandasının ixtisasının bir hissəsi ola biləcək əla ingredientlərdir. Problem — nə üçün işlədikləridir. Üçüncü səviyyə komandanın təşkilat üçün dəyəri böyükdür, amma onların vəzifəsi təşkilatda etibarlılığın artmasına adətən gətirib çıxaran əks-əlaqə dövrünü yaratmaq və inkişaf etdirmək deyil.³

> **DİQQƏT: AYAQSIZ TABURET**
>
> Gizli nasazlıq rejimi haqqında kiçik bir qeyd: bu fəsildə indiyə qədər mövcud işçilərin SR-mühəndis vəzifəsinə keçirilməsi ilə bağlı təhlükələrdən danışdıq. Bu fikrə qarşı kəskin danışsam da (səthi cəhdlər uğursuzluğa məhkumdur), qapını yarıaçıq saxlamağa çalışdım — ehtiyatla və kifayət qədər səy göstərməklə belə keçid nəzəri baxımdan mümkündür.
>
> Amma bu, mövcud komandanı çevirərkən diqqət etməli olduğun başqa bir tələni ortaya çıxarır: komandanın hazırda yerinə yetirdiyi lazımlı funksiyanı görməzdən gəlmək. Asılılıq üzrə məsləhətçilər deyəcək ki, insanın həyatından hansısa maddəni sadəcə çıxarmağa çalışmaq, o maddənin hansı məqsədə xidmət etdiyini düşünmədən, ağılsızlıqdır. Kimsə heroindən asılıdırsa, bu (bütün mənfi nəticələrinə baxmayaraq) demək olar həmişə həyatında müəyyən məqsədə xidmət edir. Bu amili nəzərə almadan tamamilə imtina etmək taburetin ayağını qırmaq kimidir.
>
> Eynilə, mövcud komandanı SR-mühəndis funksiyalarını yerinə yetirmək üçün uğurla yenidən profilləşdirsən belə, yadda saxla ki, əvvəlki funksiya çox güman ki, müəyyən səbəbdən yerinə yetirilirdi və təşkilat həmin ehtiyacı ödəməyə hazır olmalıdır. Bunun uğurlu transformasiyanı çətinləşdirdiyini bilirəm. Bu (daha da çətin) xəbəri çatdırdığım üçün üzr istəyirəm, amma bunu kimdən eşitmək istərdin — məndən, yoxsa narazı iş yoldaşlarından?

³ *Bu, təhlükəsizlik sahəsi üçün də doğrudur. Üçüncü səviyyə dəstək komandası təhlükəsizlik problemlərini ortaya çıxdıqca aradan qaldıra bilər, amma sadəcə onlara təhlükəsizliklə bağlı şık yeni ad verdiyin üçün təşkilatda təhlükəsizlik səviyyəsini qaldıracaqlarını gözləməmək lazımdır.*

---

## 3-cü amil: yalnız növbətçilik

Bu amil ziddiyyətli məsləhətlər üçün böyük potensial daşıyır, ona görə bu çətin məsələyə çox ehtiyatla yanaşacağam. 3-cü fəsildə demişdim ki, kifayət qədər yaxşı iş nümunəsi olduqda, insidentlərdən və onların idarə edilməsindən başlayaraq SRE mədəniyyəti formalaşdırmaq mümkündür. Dəqiq sitat: "[Con] Riz hesab edir ki, təşkilatda SRE mədəniyyəti yaradan bir 'fabrik' strukturu qurmaq istəyirsənsə, ən yaxşısı <...> insident reaksiyasına və onların icmallarına fokuslanmaqdır".

Bu məsləhət səni bütün SRE təşəbbüslərini üzərinə götürməyə və bu tərəfdaşlıqda növbətçilik işini öz üzərinə almağa apara bilər. Həvəsini bir az soyutmaq istəyirəm.⁴ Bu, "az olsun, keyfiyyətli olsun" prinsipinin başqa bir nümunəsidir. Bu yanaşmanın əks nəticə verdiyi çoxlu hallarla rastlaşmışam, çünki növbətçiliklə bağlı mühəndislik rəhbərləri onun məqsədini yanlış anlayırlar. 2-ci və 3-cü fəsillərdə tamamilə aydın demişəm ki, növbətçiliyin əsas məqsədi sistem haqqında daha çox öyrənmək və bu bilikdən onun etibarlılığını artırmaq üçün istifadə etməkdir.

Bəzən bu məqsəd itir. Bəzən rəhbər düşünür ki, növbətçilikdə SR-mühəndisin əsas məqsədi tərtibatçını əsəbiləşmədən ya xərcdən qorumaqdır. Şəxsən məndən soruşublar ki, SR-mühəndisləri çağırışlara xidmət üçün daha ucuz istisna emalı mənbəyi kimi istifadə etmək olarmı, "bahalı tərtibatçılar isə funksiya inkişafına fokuslana bilsin..."

Bildiyim başqa layihələr də var — orada SR-mühəndis komandası sadəcə "peycer daşıyırdı", səhvlərdən öyrənmə ilə heç bir əlaqəsi yox idi və sistemi daha etibarlı etmək üçün dəyişiklik etmək imkanı yox idi. Fikrimcə, hər ikisi iflasdır.

Bəs bu kimin iflasıdır? Bu hekayədəki mühəndislik rəhbəri bunu qəsdən iflasa apara bilər ("Bunu hamısını bilirəm, amma vecimə deyil"; "Çağırışlarla başqası məşğul olsun, biz yox"), amma daha ehtimallısı budur ki, təsvir olunan SR-mühəndislər maarifləndirmə işini kifayət qədər keyfiyyətlə yerinə yetirməyib və SRE-nin dəyəri barədə ortaq anlayış əsasında konsensusa çatmayıb.

Bu kitabı SR-mühəndislər üçün elə-belə yazmamışam — SRE haqqında dərin anlayış qazanmaq o qədər də asan deyil. Bəlkə mühəndislik rəhbərləri ilə müzakirələrdə kitabın fraqmentlərini sitat gətirmək lazımdır. Qaçmaq mümkündürsə, "yalnız növbətçilik" variantına razılaşma. SR-mühəndislər çox daha böyük ola bilər və olmalıdır. Qarşılıqlı fəaliyyət qaydalarını birgə elə müəyyənləşdir ki, bütün iştirakçılar üçün faydalı olsun və təşkilatın lazım olan istiqamətdə etibarlılığı inkişaf etdirməyə imkan versin.

⁴ *Əgər həqiqətən ayılmaq üçün əks arqumentlərə ehtiyacın varsa, "Seeking SRE" kitabının Neil Merfinin yazdığı 30-cu fəslini oxumağı məsləhət görürəm.*

---

## 4-cü amil: səhv təşkilat strukturu

Anlayıram ki, bu vəziyyəti təşkilat strukturuna görə həll etmək səndən asılı olmaya bilər. Bu struktur, xüsusilə böyük şirkətlərdə, "sənin səviyyəndən çox-çox yuxarıda" olan uzaq rəhbərliyin qərarı ilə müəmmalı şəkildə müəyyən edilə bilər. Belə hallarda bunu faydalı xəbərdarlıq kimi qəbul et: gündəlik fəaliyyətdə istədiyindən daha çox yavaşlama ilə qarşılaşacaqsan.

Bu amilin mahiyyəti belədir: təşkilat çox vaxt mühəndislik işini sıfır məcmulu oyun kimi görür, mühəndislik qərarlarını "ya-ya" seçimi hesab edir. Bizim vəziyyətimizdə tərtibatçıların proqram təminatına yeni funksiya əlavə etməyə sərf etdiyi səylə etibarlılıq sahəsində qeyri-funksional təkmilləşdirmələrə sərf olunan səy arasında seçim etmək lazım gəlir. Belə qərarlar daim qəbul edilməlidir. Məsələn: "Növbəti buraxılış üçün nə üzərində işləyəcəyik — parlaq yeni funksiya, yoxsa istehsalat mühitində daha effektiv göstəricilər verə bilsin deyə kodun restrukturizasiyası?" Nəzərdə tutduğum amil əslində sonsuz qərarlar dəsti ilə yox, bu qərarları qəbul edənlərlə və onların təşkilat strukturundakı yeri ilə bağlıdır.

"Seeking SRE" kitabı üzərində işləyərkən mənə Facebook-da o zaman texnologiya inkişafı şöbəsinə rəhbərlik edən Pedro Kanauati ilə müsahibə götürmək qismət oldu.⁵ Çox yaxşı xatırlayıram: o, açıq dedi ki, həm öz, həm də texnologiya inkişafının uğurunun əsas amillərindən biri onun məhsullara funksiya əlavə edən komandalara rəhbərlik edən şəxslə eyni mühəndislik rəhbərinə hesabat verməsi idi. Bu o deməkdir ki, mühəndislik şöbəsinin hansı işi görəcəyi barədə həlledici sözü olan adamı tapmaq üçün təşkilat strukturunda çox yuxarı qalxmaq lazım deyildi.⁶

Bütün bu qərarlar (yol xəritəsi, problemə/böhrana reaksiya, resursların bölüşdürülməsi, kadr seçimi və s.) kifayət qədər ətraflı müzakirə edilməlidir. Müzakirəyə nə qədər çox adam qatılırsa və zəncir boyu nə qədər yuxarı qalxmaq lazım gəlirsə (hər keçiddə məlumat itdiyi halda), qərar qəbul etmək bir o qədər çətinləşir. "Gündəlik fəaliyyətdə yavaşlama" dedikdə məhz bunu nəzərdə tuturdum. Bəlkə vəzifən təşkilat strukturuna hər hansı təsir göstərməyə imkan vermir, amma hər qərar üçün "iyerarxiya boyu yuxarı qalxmaq" lazım olduğunu görürsənsə, öz təşkilat səviyyəndə qarşılıqlı fəaliyyəti sürətləndirəcək dəyişiklik etmək imkanının olub-olmadığını araşdırmaq faydana olar.

⁵ *"Seeking SRE" kitabındakı 13-cü fəslini mütləq oxu; çox yaxşıdır.*
⁶ *İdeal halda bu adam həm də stimulların yanlış bölüşdürülməsindən sığorta edir. SRE fəaliyyətinin niyə uğursuz olduğunu müzakirə edərkən eşitdiyim şikayətlərin ilk üçlüyündə daim "prioritet həmişə etibarlılığa yox, funksiyalara verilir" variantı olur.*

---

## 5-ci amil: SRE təcrübələrinin mexaniki kopyalanması

Hazırda Google-da işləyirsənsə, növbəti bölməyə keç. Qalanları xəbərdar edirəm: təşkilat çox asanlıqla (və mən bunu daim görürəm) Google-un indiki ya keçmiş əməkdaşlarının yazdığı əla SRE kitablarını əldə edib orada yazılan hər şeyi eynilə etməyə çalışa bilər. Mayls Deyvis demişdir: "Dediklərimin hamısını başa düşsəydin, mən olardın". Eyni ilə, Google-un etdiyi hər şeyi tam olaraq eyni şəkildə tətbiq edə bilsəydin, sən Google olardın (amma əminəm ki, belə deyil). Google-un və onun SRE-sinin özünəməxsus mühəndislik mədəniyyəti və tarixi var — əminəm ki, sənin təşkilatında bu yoxdur.

11-ci fəsildə yazmışdım, amma burada da aktual olduğu üçün təkrarlayıram: SREcon konfransında Narayan Desainin "Care and Feeding of SRE" çıxışına baxmaq təşkilat dəyərlərinin SRE tətbiqindəki rolunu daha yaxşı anlamağa kömək edir. Çıxış əsasən SR-mühəndislərin Google-da necə uğur qazandığından bəhs etsə də, orada həqiqətən vacib müşahidələr var, o cümlədən "SRE müəyyən dəyərlər toplusunun əksidir" fikri.

Düşünürəm ki, Google-un kitablarından ilham almaq və ayrı-ayrı üsulları mənimsəmək olar, amma orada yazılan hər şeyi təkrarlamağa çalışmaq mümkün deyil. SRE haqqında kitablardan danışarkən insanlara oxuduqlarına tənqidi yanaşmağı məsləhət görməyimin səbəbi budur. SRE müxtəlif torpaqda müxtəlif şəkildə cücərir; öz vəziyyətində effektiv olan üsulları tapmaq lazımdır, uğurunu kitablardan neçə fəsli tətbiq edə bildiyinlə ölçmədən.

---

## 6-cı amil: qapıçı funksiyaları

Bu mövzu 16-cı fəsildə ətraflı araşdırılır, amma SRE-nin iflası kontekstində də müzakirə etmək vacibdir. Təşkilatda SR-mühəndis təəccüblü dərəcədə asanlıqla qapıçıya çevrilə bilər. Bunun üçün əsaslandırma var (istehsalat etibarlılığının qorunması); üsullar var (istehsalata hazırlıq/tətbiq icmalları, bəzi potensial səhv büdcəsi siyasətləri, istehsalata məhdud giriş); stimullar var (SRE — qıt resursdur, "yox" demək "bəli, və..." ya da "bəli, amma..." deməkdən daha asandır); tarixi presedentlər var (dəyişiklik şuraları, uyğunluq tələbləri, aradan qaldırılmalı maneə kimi qəbul edilən əməliyyatlar) və s.

Bu ehtimal ssenariyə qarşı fəal şəkildə müdafiə olunmasan, ayıldığında güzgüdə özünü tanımayacaqsan, ehtimalı yüksəkdir. Qapıçı yerini möhkəm tutan kimi, SRE-nin iflasa uğraya biləcəyi saysız-hesabsız variant ortaya çıxır. Çoxlu potensial münaqişəli qarşıduran struktur yaratmaqdan başqa, insanların istədiklərinə çatmaq üçün lazım olan hər yerdə "xərcləri dolaşmağa" çalışacağı faktı da var. Bu baş verəndə SRE-nin bəhrələrindən yararlanmaq çox çətinləşir.

---

## 7-ci amil: uğurdan ölüm

Təşkilatda SRE şöbəsi yaradıldıqdan sonra onu çox asanlıqla dərhal həddindən artıq yükləmək olar. Bütün istehsalatı (xüsusilə bütün növbətçilik öhdəliklərini daxil etməklə) SR-mühəndislərə⁷ ötürsən, bu, komandanın bütün iş dövrələrini tuta bilər. Belə vəziyyətlərdə proqnozlaşdırıla bilən nəticə — tükənmədir (burnout).

SRE komandasını ya funksiyasını miqyaslandırmaq asan deyil, qismən çünki lazımi adamları tapmaq çətin ola bilir. Yüklənmənin qarşısını almaq üçün buna arxalanmamaq vacibdir. Stiven Torn "Getting Started with SRE" çıxışında qeyd edir ki, şirkət üçün SR-mühəndis komandasının öz yükünü tənzimləyə bilməsi və lazım olduqda əks çıxa bilməsi çox vacibdir. SRE tətbiqi planına bu məqsəd üçün etibarlı mexanizm nadir hallarda daxil edilir.

⁷ *Bu kitabın rəyçilərindən Kurt Andersen qeyd edir: "Bu özü-özlüyündə narahatedici işarədir. Məsuliyyətdən imtina nəticədə ondan qaçmağa çevrilir və məsuliyyətsiz davranış özünü göstərir."*

---

## 8-ci amil: kiçik amillərin məcmusu

Bu bölməni "Min kağız kəsiyindən ölüm" ya da "Ördəklərin ölümcül dimdikləməsi" adlandırmaq olar. Bu bölmədəki kiçik amillər özlüyündə çox güman ki, SRE tətbiqini məhv etməyəcək, amma çox güman ki, ona zərər vuracaq. Sürətli raunda başlayaq.

**Görünməyən iş.** SR-mühəndis komandası nə üzərində işlədiyini və hansı uğurlara çatdığını başqalarına aydın şəkildə çatdırmırsa, çox vaxt onun dəyəri qiymətləndirilmir. Əməliyyat mütəxəssisləri (və digər xidmət növləri) onilliklərdir bu qəribə dinamikanı bilir: işlər nə qədər yaxşı gedərsə, insanlar bir o qədər az nəzərə çarpır, hətta onların sayəsində etibarlılıq artsa belə. Avtomobil əla işləyəndə insanlar mexanikin (ya zavod işçilərinin) nə qədər böyük iş gördüyünü düşünmür. Bunu "yaxşı" problemlər kateqoriyasına aid edirəm, amma həll edilməzsə, problem olaraq qalır.

**"Krallığı xilas etməyə gəldim" (superqəhrəman pozasında dayan).** Riçard Klousonun SREcon konfransındakı "The Why, What and How of Starting an SRE Engagement" çıxışını öyrənmək dəyər, çünki orada SR-mühəndislərin bu sahəyə başlayarkən yanlış siqnal verdiyi üçün necə iflasa uğraya biləcəyi araşdırılır. Onun SRE-yə cəlb olunmanın "krallığı xilas etmək" missiyası kimi qəbul edildiyi üçün uğursuz olduğu hekayəsinə diqqət yetirməyi tövsiyə edirəm. Bu tələyə düşmək asandır, o isə davamlı əməkdaşlıq bacarığımızı zəiflədir.

**Çatışmazlıq...** Özünü təhlil (səhvlərdən öyrənmə), tarazlıq (reaktiv və proaktiv iş, rutin və qeyri-rutin fəaliyyət və s.), bilik həvəsi ya bu kitabın digər fəsillərində qeyd olunan qadağan edici elementlərin çatışmazlığı bir gün mütləq sənə zərər verəcək.

**Müştərilərin nəzərə alınmaması.**⁸ Bu, çox müxtəlif, sinsi yollarla özünü göstərə bilər. Xidmətləri təşkil edən resursların performans göstəricilərini öyrənməyə böyük vaxt sərf edib, heç vaxt "Müştəri onlardan istifadə etməyə çalışanda nə görür?" sualını verməyə bilərik. Çox vaxt monitorinqi komponentlərə yönləndirərək qururuq, müştərilərə yox. İstifadəçilərin sistemdən gözləntilərini tamamilə nəzərə almayan SLI/SLO tətbiq edə bilərik. Bu baş verəndə çox yaxşı niyyətlə edilir və o an insana məntiqli görünür, ona görə bu tələni göstərərkən həddindən artıq sərt görünmək istəmirəm. Sadəcə səni və ətrafındakıları müəyyən hadisənin müştəri baxımından necə əks olunduğunu ya onlara necə təsir etdiyini daim soruşmağa çağırıram. Bu, dərin kök salmış vərdişə çevrilənə qədər belə et. Sən ya komandan həmişə müştəri gözləntiləri və təcrübəsi ilə maraqlanan adamlar kimi ad çıxarsanız — bu pis reputasiya deyil.

**Müsbət emosiyaların olmaması.** Anlayıram ki, işdən zövq almaq həmişə korporativ obraza uyğun gəlmir, amma bunun 1-ci fəsildə qeyd olunan SRE tərifinin ən vacib hissəsinə toxunduğunu düşünürəm — əməliyyat təcrübəsinin sabitləşdiyi hissə. SRE-yə cəlb olunma ya onu qəbul etmə prosesinin fasiləsiz ziyafət olduğunu, ya da SR-mühəndisin həyatının tam əyləncə olduğunu demək istəmirəm. Amma düşünürəm ki, sən və ya komandan işin sənə son dəfə nə vaxt sevinc gətirdiyini xatırlaya bilmirsinizsə, bu siqnala diqqət yetirmək lazımdır — çox vacibdir. SRE tapşırığını zövqsüz yerinə yetirmək problemdirmi? Çox güman ki, yox. Amma bütün işi zövqsüz edirsənsə — bu, iflasdır.

> **"HƏDDİNDƏN ARTIQ ETİBARLILIQ" TƏLƏSİ**
>
> Görünməyən iş probleminin içində gizli bir tələ var. Uğurlarını başqa əməkdaşlara çatdırmaq məsləhətimə qulaq assan, zamanla getdikcə daha böyük nailiyyətlər bildirmək istəyəcəksən. Hamı ay-ay yuxarı-sağa doğru artan qrafiklər göstərmək istəyir. Hamı işlərin getdikcə yaxşılaşdığını nümayiş etdirmək istəyir. Bu, çox vaxt növbəti etibarlılıq "doqquzuna" çatmaq kimi təqdim olunur.
>
> Bu, əvvəldə danışdığımız təməl fikirlə — uyğun etibarlılıq səviyyəsinə çatmaq üçün işləməklə — ziddiyyət təşkil edə bilər. Aylıq hesabatlarda daimi irəliləyiş göstərmə istəyi səni xidməti uyğun etibarlılıq səviyyəsinin xaricinə itələməyə vadar edirsə, bu problemdir.
>
> Problem nə qədər böyükdür? "Xidmətin planlaşdırılandan daha etibarlı olması nə üçün pisdir?" — deyə soruşa bilərsən. Bunun problemə çevrilməsinin bir neçə yolu var. Bu yenilənmiş, saxlamağın lazım olacaq, amma çatmağı planlaşdırmadığın standartı qorumaq üçün lazım olan potensial olaraq lazımsız resurs/heyəti kənara qoysaq belə, daha ciddi problem gözləntilərlə bağlıdır. Bu daha yüksək etibarlılıq səviyyəsini saxlayacağını açıq şəkildə bəyan etməsən belə, insanlar bunu görəcək və artıq bunu saxladığını düşünərək sənə güvənməyə başlayacaqlar. Onlar etibarlılığı və işləməsi sənin bu standartı saxlamandan asılı olan xidmətlər ya təcrübələr yaratmağa başlayacaqlar. Müəyyən anda hansısa səbəbdən bu nəzərdə tutulan standarta cavab verə bilməyəndə (bəlkə yeni böyük versiya buraxacaqsan), bütün təşkilat ciddi problemlərlə üzləşəcək. Əvvəllər vəd etdiyin səviyyədə işi həmişə uğurla yerinə yetirmiş olsan belə, bu kifayət etməyəcək. Asılılıqlarına sənin (məqbul) dayanmanla mübarizə aparmağa imkan verən lazımi mexanizmlər daxil edilməyəcək, çünki digərləri bunu etməli olacaqlarını gözləməmişdilər və hamı əziyyət çəkəcək.
>
> Bu tələnin klassik nümunəsi "Site Reliability Engineering" kitabının 4-cü fəslində qeyd olunur və Google-un hazırladığı paylanmış kilidləmə sistemi Chubby ilə bağlıdır.
>
> Məlum oldu ki, Chubby-nin özünün sıradan çıxmaları o qədər nadir idi ki, digər xidmətlərin sahibləri onun sıradan çıxma ehtimalını heç nəzərə almadan ona müraciətlərdən istifadə etməyə başladılar. Xidmətin yüksək etibarlılığı yalançı təhlükəsizlik hissi yaratdı və nəticədə digər xidmətlər Chubby əlçatan olmayanda düzgün işləyə bilmirdi, baxmayaraq ki, bu nadir hallarda baş verirdi.
>
> Bu problem üçün maraqlı həll tapıldı: SR-mühəndislər Chubby-nin qlobal xidmətinin ümumilikdə öz SLO-larına uyğun olmasını, bəlkə müəyyən limitləri cüzi aşmasını təmin edir. Hər hansı rübdə real sıradan çıxma xidmətin əlçatanlığını hədəf səviyyədən aşağı salmayıbsa, sistemi qəsdən söndürən süni nasazlıq yaradılırdı. Bu nasazlıq Chubby-dən düzgün tətbiq olunmayan asılılıqları onlar ortaya çıxdıqdan qısa müddət sonra aradan qaldırmağa imkan verirdi. Bu, xidmət sahiblərini paylanmış sistemlərin real xüsusiyyətləri ilə hesablaşmağa məcbur edir, çox güman ki, hələ inkişafın erkən mərhələlərində.⁹

⁸ *Təcrübəmə görə, son iki bənd o qədər nadir və kiçik miqyasda rast gəlinir ki, adətən tam mənada təşkilat iflası sayılmır; onlar daha çox mikro-iflaslara bənzəyir. Yenə də, belə hallar kifayət qədər çox olsa, SRE-li təşkilat yoldan çıxa bilər, ona görə diqqətli ol.*

⁹ *Beyer və b., 2022. — S. 80.*

---

## SRE iflasının qarşısını necə almaq olar

Fəsli bitirmədən əvvəl, yuxarıda sadalanan amillərdən hər hansı biri ilə həqiqətən qarşılaşanda nə etmək lazım olduğundan danışmaq istəyirəm.¹⁰ İlk növbədə bu sual verilməlidir: "Bizim ssenaridə SRE şöbəsi artıq iflasa uğrayıb, yoxsa hələ düşmə prosesindədir?" Hər iki halda əsas fikir — SRE mentalitetini və bacarıqlarını mümkün qədər effektiv tətbiq etməkdir. Məsələn, SRE iflasının aktiv fazasındasınızsa, bu, zəifləmiş vəziyyətdə işləyən sistemin epicentrində olmaqdan o qədər də fərqlənməyə bilər. İnsident reaksiyasının mahiyyəti — lazımi adamları bir yerə toplayıb, lazım gəldikdə nəticələri sıralamaq və yumşaltmaqdan ibarət koordinasiyalı hərəkətdir. Belə şəraitdə iflas qarşılaşdığın əksər digər problemlərdən daha yavaş özünü göstərə bilər (və çox güman ki, bu texniki nasazlıq deyil), amma eyni üsulları məqsədyönlü tətbiq etməklə onunla mübarizə apara biləcəyinə əminəm.

Əgər özünü "iflasa uğramış" mövqedə tapmısansa (belədirsə, çox təəssüf edirəm), hansı analogiyanı nəzərdə tutduğumu artıq təxmin etmisən (nasazlıq baş verib) və SR-mühəndisin bu halda nə etdiyini də (insidentin nəticələrinin icmalını keçirir). Bəxtin gətirsə, bu icmaldan çıxarılan dərsləri bir daha möhkəmləndirmək və növbəti SRE tapşırığına tətbiq etmək imkanı əldə edəcəksən. Gətirməsə, çox güman ki, bu işdə ya növbətidə uyğun şəraitin yaranmasını gözləyib yenidən cəhd etmək lazım gələcək.

¹⁰ *Bu fərziyyə əsas fikri çatdırmaq üçün çox ümumi şəkildə təsvir olunub. Sistemi yenidən işə salmaq üçün institusional dəstəyin zəruriliyi, işçinin menecer ya direktordan fərqli öhdəliklər yerinə yetirməli olması kimi bir çox detalı buraxıram. Bir insident icmalı iclası problemi həll etməyəcək, amma SRE təcrübəsini, hətta analogiya kimi tətbiq etmək, kifayət qədər əhəmiyyətli kömək edə bilər.*

---

Sənin təşkilatında bu 8 amildən hansılarını tanıyırsan? Cavab narahatedicidirsə, unutma — 11-ci fəsildəki uğur faktorları elə buna qarşı çəkidir.

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

# Dikersonun etibarlılıq iyerarxiyası: haradan başlamalı?

Təsəvvür edin: rəhbərlik bir gün gəlib deyir — "bizə SRE lazımdır". Niyə? Çünki rəqib şirkətin sistemi çökdü, xəbərlərə düşdü, hamı danışdı, və indi sizin rəhbərlik də qorxub. Epik treyler musiqisi işə düşür — amma sonra nə olacaq?

Bu yazıda məhz bu sualın cavabından danışacağıq: SRE-yə yeni başlayan komanda hardan başlamalı, hansı sırayla getməli? Çünki problem "nə iş görmək lazımdır" deyil — potensial iş çoxdur, addımbaşı qarşınıza çıxır. Əsl problem: **nədən əvvəl, nədən sonra?**

## Dikersonun iyerarxiyası nədir

Ən aydın cavab — Maiki Dikersonun (Mikey Dickerson, Google-un keçmiş mühəndisi, ABŞ Rəqəmsal Xidmətinin qurucusu) təklif etdiyi **etibarlılıq iyerarxiyası**. Bu, Maslounun ehtiyaclar iyerarxiyasının SRE versiyasıdır — piramida şəklində təsvir olunur, aşağıdan yuxarıya doğru gedir, və hər səviyyə "tam mənimsənilməyincə" növbəti səviyyəyə keçmək olmaz.

> Fikir sadədir: əvvəl özünüzü görməyi öyrənin, sonra reaksiya verməyi, sonra dərslər çıxarmağı, sonra qabaqlayıcı tədbir görməyi.

Gəlin səviyyə-səviyyə keçək.

## Səviyyə 1: Monitorinq / müşahidə

Piramidanın ən əsası — və bir çox SR-mühəndisi (müəllif də daxil) deyir ki, bu ən vacib səviyyədir. Niyə?

**Naviqasiya üçün mövqe təyini.** Bu səviyyəni bir sualla ifadə etmək olar: "vəziyyət yaxşılaşır, yoxsa pisləşir?" Monitorinq — sisteminizin etibarlılığı haqqında ən obyektiv məlumat mənbəyidir. Etdiyiniz dəyişikliyin (yeni versiya, konfiqurasiya, mühit dəyişikliyi) müsbət, mənfi, yoxsa neytral təsir etdiyini bilmək üçün ona ehtiyacınız var.

**Həqiqət və müzakirə mənbəyi.** Etibarlı monitorinq olmadan söhbətlər belə keçir:

> — Sizcə X sistemi indi necə işləyir?
> — Dəqiq bilmirəm, elə bil lazımi qədər etibarlı deyil.
> — Maraqlıdır, mən əksini düşünürdüm — neçə gündür məni heç nəyi düzəltməyə çağırmayıblar.

Bu cür dialoqun özü — monitorinqin zəif olduğuna işarədir. Daha pis hal: sistem var, amma ona heç kim inanmır. Kitab müəllifi bir müsahibədə eşitdiyi cavabı xatırlayır — bir şirkətdə monitorinq sistemi var idi, iki nəfər onu idarə edirdi, amma o qədər "səs-küylü" (yəni yersiz xəbərdarlıqlarla dolu) idi ki, heç kim ona məhəl qoymurdu. Onun cavabı sadə idi: "işə başlasaydım, ilk növbədə monitorinqi düzəldərdim."

**SLI/SLO üçün əsas.** Etibarlılıq danışıqlarının ortaq dili SLI (Service Level Indicator) və SLO (Service Level Objective) üzərində qurulur. Amma bunlar üçün əsl, etibarlı məlumat lazımdır — saxta rəqəmlərlə real söhbət olmaz.

**Təşkilatın güzgüsü.** Monitorinq sisteminizin necə qurulduğu, təşkilatınızın strukturunu da əks etdirir. Konvey qanununu xatırlayın: *"Sistem hazırlayan hər təşkilat, öz kommunikasiya strukturuna bənzər struktur yaradır."* İki komanda bir sistemə cavabdehdirsə — böyük ehtimalla iki ayrı monitorinq (və ya iki fərqli metrik dəsti) olacaq.

## Səviyyə 2: İnsidentlərə reaksiya

İndi maraqlı hissəyə keçək — çünki hər sistemdə gec-tez planlaşdırılmamış nasazlıq olacaq. Bu, SRE-nin qəbul etdiyi ekzistensial həqiqətdir. Sual "olacaqmı" deyil — **"necə reaksiya verəcəyik"**.

Bu səviyyədə qiymətləndirməli olduğunuz: sizdə insidenti idarə etmək üçün proses, plan, sənədləşdirmə varmı? Yoxsa hər kəsilmədə başı bədəndən ayrılmış toyuq kimi qaçırsınız?

Bu səviyyə həm də ən çox **insan yanma sindromuna** (burnout) səbəb olan səviyyədir. "Dejurluq" (on-call) sözünü desəniz, hər kəsin danışacağı hekayəsi var. İnsidentə reaksiya — SRE-nin "sabit/dayanıqlı" olma tərifiylə ən çox üst-üstə düşən hissədir.

## Səviyyə 3: İnsidentdən sonrakı təhlil (post-mortem)

Bu — müəllifin ən sevdiyi səviyyə. Nasazlıq şirkətə pul, vaxt, nüfuz və işçi sağlamlığı baxımından bahaya oturur. Bu səviyyə — həmin "lənətdən qorunma zirehidir".

**Post-mortem** (həm də "insidentdən öyrənmə icmalı", "kök səbəb təhlili" və s. adlandırılır) — nasazlıqdan nəyisə qazanmağın yeganə real yoludur. Əgər sizin post-mortem-lərinizin yeganə nəticəsi sadəcə "görüləcək işlər siyahısı"dırsa — prosesi yenidən düşünməyin vaxtıdır, çünki bundan qat-qat çox şey çıxara bilərsiniz.

Müəllif burada maraqlı bir məqam qeyd edir — **"dayanıqlılıq mühəndisliyi"** (resilience engineering) sahəsindən. Ənənəvi "kök səbəb təhlili" (root cause analysis) — "niyə" sualını dəfələrlə təkrarlayaraq bir tək səbəbə qədər enməyə çalışır. Amma bir konfrans məruzəçisinin sözü onun bu prosesə inamını sarsıtdı:

> "Kəsilmədən bir gün əvvəl... hər şey normal işləyirdi. Bəs onda bu vəziyyətin kök səbəbi nə idi?"

Yəni: sistem uğurla işləyəndə də eyni "səbəblər" mövcud idi — sadəcə fərqli combination-la fəlakətə çevrilmədi. Bu, "Safety-II" (Erik Hollnagel) və "Safety-III" (Nensi Levson) yanaşmalarının əsasını təşkil edir: təkcə "niyə pozuldu" yox, "niyə adətən işləyir" sualı da vacibdir.

## Səviyyə 4: Test/relizasiya (deployment)

2-ci səviyyədə dediyimiz kimi — nasazlıqlar qaçılmazdır, amma **hamısı** yox. Burda söhbət relizasiya və inkişaf proseslərindən gedir — problemi production-a çatmazdan əvvəl aşkar etmək.

Burada "potensial olaraq" sözü önəmlidir — heç bir CI/CD pipeline "bir başdan saman qoyub, o biri başdan qızıl çıxarmır". İdeal olaraq pipeline zamanla "ağıllaşır" — əvvəlki uğursuzluqları təhlil edən proses (yəni 3-cü səviyyə!) ilə iterativ inkişaf edir.

## Səviyyə 5: Resurs planlaması / tutum

Başqa bir ekzistensial həqiqət: **uğur da eyni nasazlıq qədər təhlükəli ola bilər.** Müştəri saytınızın niyə işləmədiyini ayırd edə bilməz — bug ucbatındanmı, yoxsa populyarlığınızın artması ilə kifayət qədər resurs ayrılmadığındanmı?

Müəllif qeyd edir ki, bu mövzuda digər səviyyələrə nisbətən daha az material var — axtarmaq istəyirsinizsə, "performans" (performance) açar sözü ilə axtarın.

## Səviyyə 6-7: İnkişaf prosesi və məhsul dizaynı

Dikerson bu iki səviyyəni piramidaya daxil edib, amma müəllif deyir ki, bunlar SRE-yə **yeni başlayanlar** üçün az aktualdır. Piramidanın ən təpəsi — Məhsul Dizaynı (Product Design / UX) — əslində bir **xəbərdarlıq** kimi mövcuddur.

Çox vaxt insanlar sistem qurmağa "düymələr hansı mavi tonda olsun" sualından başlayır — halbuki əvvəlcə soruşmalıdırlar: "məhsulun etibarlılığı haqqında dəqiq məlumat almaq üçün praktikada nə etməliyik?" Əgər bu sual dizayn prosesinin lap əvvəlində gündəmə gəlirsə — deməli SR-mühəndisini komandaya vaxtında qoşmusunuz.

---

## İyerarxiya kifayət deyil

Burda vacib bir haşiyə çıxaq. Müəllif açıq deyir: Dikersonun iyerarxiyası əla, gözəl, işıqlı bir başlanğıc xəritəsidir — amma **SRE-nin hamısı deyil**. O, SR-mühəndisinin bütün fəaliyyətlərinin siyahısı deyil, təşkilat üçün "dəyər" siyahısı da deyil.

Piramidada olmayan, amma vacib olan şeylər:

- **Arxitektura dizaynına qatılım** — yaxşı təhlükəsizlik mütəxəssisinin erkən arxitektura müzakirələrində iştirakı təhlükəsizliyi necə artırırsa, yaxşı SR-mühəndisinin iştirakı da eyni şəkildə etibarlılığı artırır.
- **Təşkilat üçün "etibarlılıq təbəqələri" yaratmaq** — developerlərin mərkəzi monitorinq və ya RPC sisteminə tez qoşulmasını asanlaşdıran kitabxanalar, best-practice-lər. "Düzgün yol"u "asan yol"a çevirmək.
- **Rutinin (toil) azaldılması** — piramidada bu barədə heç nə deyilmir.
- **Bütün production mühitlərinə unikal baxış bucağı** — SR-mühəndisləri bir mühitdəki yaxşı praktikaları digərinə yaya bilər, mühitlər arası ardıcıllığı qoruya bilər.

## Səhv yollar — nələrdən qaçmalı

Kitabda gördüyü ən çox rast gəlinən "səhv döngələr":

1. **Yalnız "dejurluq həll edən adam" olmaq.** Komandanız/tək özünüz yalnız call-lara cavab vermək üçün dəyərləndirilirsə — bu, alçaldıcı termini ilə "**pager monkey**" statusudur. Adətən günahsız başlayır ("gəlin sistemi öyrənmək üçün dejur olaq"), amma orada donub qalır.
2. **Yalnız post-mortem yazmaq.** Qəribə görünür (axı müəllif bu səviyyəni sevir!), amma tam vaxtınızı yalnız buna sərf etmək o deməkdir ki, siz hələ də proqram təminatı həyat dövrünün başqa mərhələlərinə töhfə vermirsiniz.
3. **Yalnız "yanğınsöndürən" olmaq.** Üç səbəbdən problemlidir: (a) dəyəriniz məhdudlaşır, (b) əslində "3-cü səviyyə dəstək" roluna düşürsünüz, SRE yox, (c) bu, daimi böhran mühitinin əlamətidir — bəlkə də başqa iş axtarmağın vaxtıdır.
4. **SR-mühəndislərinin "sadəcə mühəndis" sayılması.** Bu, ikitərəfli bıçaqdır: bir tərəfdən Google-da SRE ↔ software engineer keçidi asan olması müsbətdir; digər tərəfdən, rəhbərlik SR-mühəndislərini sadəcə "əlavə iş qüvvəsi" kimi əsas komandaya köçürmək istəyirsə — bu, pis işarədir.

## Yaxşı işarələr

Sona doğru — SRE-nin düzgün işlədiyinin əlamətləri:

- **"Çəkmə" yerinə "itələmə".** Əvvəllər SR-mühəndisləri müzakirəyə qatılmaq üçün çabalayırdısa, indi insanlar "niyə bizdə SR-mühəndisi yoxdur?" deyə şikayətlənirsə — bu, dəyişikliyin işarəsidir.
- **SLO terminologiyası öz-özünə yayılır.** Heç kimin təşviqi olmadan insanlar monitorinq statistikasına istinad edir, "bu servisin SLO-su nədir?" kimi suallar verir.
- **Product repolarına PR sayı artır və qiymətləndirilir.** SR-mühəndisləri əsas repolara yazma icazəsi alır — bu, əməkdaşlıq və etimadın göstəricisidir.
- **"Hürməyən itlər."** Ən çətin fərqləndirilən əlamət — çünki yoxluğu görmək çətindir. Amma ideal halda: nasazlıqlar azalır, dejurluq sakit keçir, rutin iş həcmi düşür.

## Sona qədər

Beləliklə: SRE-yə başlayarkən ilk sual "nə edim" deyil — **"nədən başlayım, hansı sırayla"**. Dikerson iyerarxiyası bunun üçün ən aydın xəritədir: monitorinqdən başla, insidentə reaksiyaya keç, post-mortemlə öyrən, test/relizasiya ilə qabaqla, resurs planlaması ilə uğuru idarə et.

Amma unutma — piramida xəritədir, ərazi deyil. Arxitekturaya qatıl, rutini azalt, "asan yolu" düzgün yol et. Və ən əsası: əgər gördüyünüz yeganə dəyər "dejurluqda problem həll etməkdir" — bu, xəbərdarlıq işarəsidir, məqsəd deyil.

Sizin komandanız hansı səviyyədədir?

# SRE-ni təşkilata necə "hopdurmaq" olar?

Əvvəlki yazıda SRE-ni tətbiq etməzdən əvvəl hansı hazırlıq işlərinin lazım olduğundan danışdıq. Tutaq ki, o hissəni oxumusan və nəticəyə gəlmisən: "Bəli, düşünürəm ki, bu işləyə bilər." Bu yazıda isə bir addım irəli gedirik: SRE-mühəndislərinin təşkilatın səviyyəsinə uyğunlaşmasına nə kömək edir? Bunun üçün bir neçə inteqrasiya modelinə, cəlbolunma nöqtələrinə, əks-əlaqə dövrəsinə və uğur əlamətlərinə baxacağıq.

> Vəzifə və komanda yaranmazdan əvvəl SRE təcrübələrini sınamaq olar — buna icazə, sertifikat, ya rəsmi status lazım deyil. Lazım olan tək şey — sağlam maraq və ağ lövhə qarşısında keçirilən bir neçə dəqiqə.

## Vəzifə və komanda yaranmazdan əvvəlki təcrübələr

Növbəti fəsillərdə SR-mühəndis komandalarını sıfırdan necə böyütmək barədə dəfələrlə danışacağıq. Amma məsələyə "SRE 0" vəziyyətindən — yəni təşkilatda ümumiyyətlə heç bir SR-mühəndis olmadığı vəziyyətdən — baxmağı da vacib sayıram.

SRE komandası işə götürülməzdən, hətta bu vəzifəyə bir nəfər təyin olunmazdan əvvəl belə, şirkətdə SRE təcrübələrini sınamağı çox sevirəm. Tikinti sənayəsi ilə müqayisə edək: orada tikintiyə başlamazdan əvvəl lisenziyalı, sertifikatlı mühəndis işə götürülməlidir. SRE-nin standart metodlarını mənimsəməyə başlamaq üçün belə tələb yoxdur. Lazım olan — servis və ya sistemə qarşı sağlam maraq və əsas SLI/SLO-ları müəyyənləşdirmək üçün ağ lövhə qarşısında keçirilən bir az vaxt. Növbəti addım — bu SLO-ları monitorinq sistemində izləmək və nəticələri müntəzəm görüşlərdə müzakirə etməkdir.

Təcrübəmə görə, hətta sınaq və ya eksperimental SRE işi belə fayda gətirir. Ümumi mənzərəyə baxsan, iş yerində etibarlılıqla bağlı SRE ruhunda işlər tapmaq mümkündür. Həmkarlar həvəslidirsə, servisin işində maraqlı tərəflər cəlb olunub və maraqlanırsa, mövcud monitorinq sistemində SLO-nu izləmək asandırsa — bunların hamısı ürəkaçan əlamətlərdir. Əgər işlər o qədər də hamar getmirsə, bəlkə gələcək problemlərin mənbəyini, hətta SRE-ni tətbiq etməzdən əvvəl iki dəfə düşünməli olduğunu göstərən qırmızı bayraqları aşkarlamısan.

Oxşar başlanğıc nöqtəsi ola bilər: insident təhlilləri. Komandanız SRE olmadan sıradan çıxmadan sonrakı təhlili yaxşılaşdırmaq üzərində işləyirsə və SRE üslubunda öyrənirsə — bu da doğru istiqamətdə əhəmiyyətli addımdır. Bu, təşkilati uyğunluq haqqında dəyərli kontekst məlumatı verəcək.

Amma bəzən şərait elə olur ki, kadr seçimi və ya komanda formalaşdırılması zamanı bu cür eksperiment mərhələsini keçmək lazım gəlir. Məsələn, yüksək rəhbərin SR-mühəndislərlə müəyyən təcrübəsi var və artıq gözləmədiyin işçilər dəstəsi toplayıb, ya da birləşmədən sonra bütün SRE şöbəsi və ya bir neçə SR-mühəndis qəflətən təşkilata qoşulur. Bu, sənin vəziyyətindirsə, yenə də vəziyyətə (özünlə və başqalarıyla ünsiyyətdə) eksperiment kimi yanaşmağı məsləhət görürəm. Sadəcə fərqli bir eksperimentdir.

## İnteqrasiya modelləri

Böyük təşkilata SRE-ni inteqrasiya etməyin fərqli modellərini artıq qısaca müzakirə etmişik, amma bu mövzuya birbaşa aiddir, ona görə sürətli icmal edək. Praktikada geniş istifadə olunan üç fərqli model görmüşəm: mərkəzləşdirilmiş/tərəfdaş, paylanmış/daxil edilmiş və hibrid.

### Mərkəzləşdirilmiş/tərəfdaş model

Daha yaxşı termin olmadığı üçün bunu ilkin model sayıram, çünki bu, Google bu sahəni ilk yaradıb populyarlaşdıranda qəbul etdiyi modeldir. Bu modeldə SR-mühəndislər — öz kadr işə götürmə qaydaları, ştatı və karyera pilləsi olan müstəqil bir təşkilatdır. SR-mühəndislər hansı komandalar üçün işlədiyindən asılı olmayaraq bu təşkilatda çalışır.

SR-mühəndislər komandalarda işləyir. Əksər komandalar məhsul yaradan komanda ilə (oxu: developer-lərlə) əməkdaşlıq edir və onların etibarlılıq ehtiyaclarına fokuslanır. Məsələn, Google Maps, Gmail, Ads və s. üçün SR-mühəndislər var. Bundan başqa, mərkəzləşdirilmiş alət və servislər üzərində işləyən SRE komandaları da var (Borg-da, BigTable-da SR-mühəndislər və s.).

**Deficit modeli.** Bu, mərkəzləşdirilmiş modelin məcburi əlaməti deyil, amma Google-un təşkilati modeli üçün kifayət qədər önəmlidir və ayrıca müzakirəyə dəyər. Google-dakı SRE modeli SRE-ni qənaətlə bölüşdürülməli olan qıt resurs kimi görür. Yeni Google servisləri yaradılır, sonra onları yaradan insanlar tərəfindən idarə olunur. Servis müəyyən yetkinlik səviyyəsinə çatmalı və SR-mühəndislərin cəlb olunmasının fayda gətirəcəyini sübut etməlidir — yalnız bundan sonra SRE təşkilatı onunla rəsmi işləməyə başlayır. Bu, Google-dakı SRE fəlsəfəsinə uyğundur — SRE-nin sublinear miqyaslanması.

Təşkilat baxımından mərkəzləşdirilmiş modelin (ən azı nəzəriyyədə — bunun haqqında bir az sonra) bir sıra üstünlükləri və mənfi cəhətləri var. Güclü paylanmış təşkilatdan fərqli olaraq, mərkəzləşdirilmiş təşkilatda ümumi metod, proses, alət, dəyər dəsti yaratmaq və saxlamaq daha asandır. Nəzəri olaraq SR-mühəndislər asanlıqla əvəzlənə bilər və başqa komandalara keçə bilər. Ayrılıq müəyyən qədər "işçilərin yenidən bölüşdürülməsi/vəzifədən uzaqlaşdırılması"na qarşı qoruma verə bilər (yəni mühəndislik rəhbəri artıq mövcud SR-mühəndisi developer vəzifəsinə keçirmək qərarına gələndə). Bu model ştat sayının yenidən bölüşdürülməsini çətinləşdirir, çünki bu kontekstdə SR-mühəndislər fərqli işçi kateqoriyası sayılır.

Bir çox baxımdan bu üstünlüklər mənfi cəhətlərin əks tərəfidir: SR-mühəndislər şirkətin qalan hissəsindən daha təcrid olunmuş olur; mərkəzi təşkilatın ehtiyacları ilə yerli developer komandası arasında alət uyğunsuzluqları yarana bilər; kadr işə götürmə prosesi çətinləşə bilər, ştat bölgüsü daha məhdud ola bilər.

Növbəti modelə keçməzdən əvvəl "nəzəri" şərhlərə qayıtmaq istəyirəm. Kifayət qədər Google SR-mühəndisi ilə danışsan, aydın olur ki, korporasiyanın daxilində belə Google modelinin reallığı üstünlüklərdən güman edildiyindən qat-qat mürəkkəbdir. Kifayət qədər böyük şirkətin bütün işçilərini (harada olmalarından asılı olmayaraq) vahid məntiqlə hərəkət etdirmə cəhdləri ilə bağlı adi problemləri kənara qoysaq belə, homojenliyə meydan oxuyan və böyük təşkilatlarda işləyən hər kəsə tanış olan şərait və qüvvələr həmişə mövcuddur. Məsələn, Google (və ya möhkəm SRE mədəniyyəti olan istənilən başqa şirkət) başqa şirkəti alanda, assimilyasiya prosesi və onun nəticələri uzun müddət qarışıq qala bilər. Bu qarışıqlığı aradan qaldırmağın yolu olduğunu düşünmürəm — o həmişə mərkəzləşdirilmiş modellərin adətən çəkilən parlaq şəklini mürəkkəbləşdirir.

Bu model haqqında (Google-da tətbiq edildiyi kimi) daha ətraflı məlumatı Google əməkdaşlarının müəllif olduğu SRE mövzusundakı kitabların fəsillərində tapa bilərsən.

> **Rotasiyanı düşün.** Mərkəzləşdirilmiş modeli tətbiq edirsənsə, rotasiya anlayışına xüsusi diqqət yetir. Rotasiya — SR-mühəndisin müəyyən müddət (ay, üç ay, altı ay) developer kimi işləməsinə icazə verilməsidir, "özünü başqasının yerinə qoymaq" üçün. Developer-lər müəyyən vaxt SR-mühəndis kimi işləmə imkanı alır, SR-mühəndislər isə müəyyən vaxt developer funksiyalarını yerinə yetirə bilir. Hər təşkilatın buna resursu və ya işə götürmə standartı yoxdur (və startaplarda bu, istəsələr də istəməsələr də, hər gün baş verir — orada bir işçi hər şeyi edir). Amma bu tapşırığın öhdəsindən gəlsən, hər iki işçi çoxlu dərs və praktik bacarıq öyrənəcək.

### Paylanmış/daxil edilmiş model

Paylanmış/daxil edilmiş model — əsas hərəkət üsulu SR-mühəndislərin (Facebook-da onlara "production engineer" deyilir) birbaşa developer komandalarına daxil edilməsi olan modeldir. Mərkəzləşdirilmiş modeldə olduğu kimi, burada da mərkəzi alət və infrastruktur üzərində işləyən (onları yaradan/saxlayan) production mühəndis komandaları var, amma əsas fərq — SR-mühəndislərin developer komandalarına qoşulma mexanizmidir. Bu modeldə hər inteqrasiya mərhələsinin müddəti daxil olmaqla çoxlu dəyişən tənzimlənə bilər.

Bu modelin üstünlükləri və mənfi cəhətləri sənin developer komandasının tərəfdaşı yoxsa birbaşa üzvü olmağından asılıdır. Bir tərəfdən, bir-birinlə mümkün qədər sıx işləmək imkanı yaranır; digər tərəfdən isə bu o deməkdir ki, SR-mühəndislərin öz prioritetlərinə və yol xəritəsinə təsir etmə imkanı həmişə eyni səviyyədə olmur. Aydınlıq üçün — burda vurğuladığım fərqlər daha çox və ya daha az dərəcədə özünü göstərir, sadəcə iki vəziyyət kimi yox. Daxil edilmə o demək deyil ki, SR-mühəndislər öz kimliklərini və ya müstəqil hərəkət etmə qabiliyyətini tam itirəcək — sadəcə dinamika potensial olaraq fərqli olacaq. Analoji şəkildə, mərkəzləşdirilmiş modeldəki tərəfdaş komandalar da inanılmaz dərəcədə sıx birləşmiş ola bilər.

Bu model haqqında (öz vaxtında Facebook-da tətbiq edilmiş) daha ətraflı məlumatı Pedro Kanauati-nin yazdığı *Seeking SRE* kitabının 13-cü fəslində tapa bilərsən.

### Hibrid model

Yəqin bunu gözləyirdin. Bəzi təşkilatlar əvvəlki iki modeli birləşdirməyi üstün tutur. Onlarda SR-mühəndislər mərkəzləşdirilmiş təşkilatda işləyir, amma şirkətin ayrı bölmələri öz SR-mühəndislərini işə götürüb özləri idarə edir. Bəzən bu vəziyyət daha əvvəl qeyd olunan alma/assimilyasiya nəticəsində yarana bilər — şirkət alınan şirkətin bir hissəsi kimi bütöv bir SRE təşkilatı əldə edəndə. Bəlkə bu təşkilatı toxunmadan saxlayıb baş şirkətdəki mərkəzləşdirilmiş SRE təşkilatından müstəqil işləməyə icazə verəcəklər. Hibrid modelin yaranmasına gətirib çıxaran başqa bir vəziyyət — biznesin elə ixtisaslaşmış və ya niş hissəsinin olması ki, onun SR-mühəndislərini daha böyük şirkətin hissəsi etməyin mənası yoxdur. Deyə bilərəm ki, hibrid model xüsusilə istiqamətlərin müxtəlifliyi tez-tez rastlanan daha böyük (və bəlkə daha köhnə) təşkilatlarda geniş yayılıb.

Bu modelin bəzən yuxarıda qeyd olunan səbəblərdən (məsələn, tarixi səbəblərdən) tətbiq olunduğunu bir kənara qoysaq, üstünlüyü — nəzəri olaraq ən çox çevikliyi təmin etməsidir. Mənfi cəhəti — sıxlıq və ardıcıllığa nail olmaq, ümumi kimlik hissini saxlamaq çox çətin ola bilər.

## Modeli necə seçmək olar

Seçim etmək mümkündürmü? Sərt olmaq istəmirəm, amma tez-tez seçim olmadığını qeyd edirəm. Məsələn, böyük, köklü şirkət kontekstində yeni SRE şöbəsinin işini təşkil edərkən, mövcud işə götürmə və ya cəlbetmə sxemlərinə uyğunlaşmalı ola bilərsən. Belədirsə, seçimi (ən azı müvəqqəti) sənin əvəzinə edərlər və sən növbəti bölməyə keçirsən.

> **İlk cəhddə düzgün modeli tapmaq alınmaya bilər.** Bilirəm, bu ciddi qərar kimi görünür (çünki elədir də), amma rahatlığın üçün kiçik bir şərh əlavə etmək istəyirəm. Bəlkə təşkilat üçün doğru qərarı anlamazdan əvvəl səhvlər edəcəksən. Uyğun model tapılana qədər SRE-ni tətbiq etmək üçün bir neçə cəhd (oxu: uğursuz olub yenidən sınamaq) lazım gəldiyini görmüşəm. Bu, sadəcə normal deyil, bəzi hallarda zəruridir də — bəlkə sənin vəziyyətində də. SRE-nin mahiyyəti — vəziyyət yaxşılaşana qədər cəhdi təkrarlamaqdır və uyğun modelin axtarışı bunun istisnası deyil.

Bu baxımdan dünyan daha çox "sıfırdan yaradılırsa", qərar qəbuletmə prosesi uzaqda deyil. Bu qərarla bağlı verdiyim ilk iki sual belədir: "Təşkilatın strukturu (ağacı) hazırda necədir?" və "İxtisaslaşmış bir qol yaratma prosedenti varmı (məsələn, təhlükəsizliklə məşğul olan təşkilat)?"

Birinci sual SRE-ni həm təşkilat xəritəsində konkret yerə görə, həm də idarəetmə iyerarxiyasında haraya qoymalı olduğunu anlamağa kömək edir. Bu, işin təşkili zamanı "qüvvələrin" necə yönləndiriləcəyini müəyyənləşdirməyə kömək edir: yuxarıdan aşağı, yoxsa aşağıdan yuxarı. Bu tam dəqiq olmasa da, mərkəzləşdirilmiş model mənim üçün şirkət ağacında daha yüksək mövqedə təmsil olunmaqla assosiasiya olunur. İlkin daxil edilmiş model üçün mərkəzləşdirilmiş modeldən daha çox "görünməz qalmaq" xarakterikdir. Bütün bu modellər üçün təşkilatda güc və təsir lazımdır, amma onların mənbəyi və təbiəti dəyişə bilər.

İkinci sual gözlənildiyi kimi SRE ilə bağlıdır. Uğur və ya uğursuzluğu proqnozlaşdırmaq üçün az da olsa faydalı ola biləcək məlumatlar varsa, onlar qərarqəbuletmə prosesinin hissəsi olmalıdır. Bunu təsdiqləyən real məlumatım yoxdur, amma güman edirəm ki, SRE-nin şirkətdə ixtisaslaşmanın ilk real tətbiqi olması hadisəsi "heç vaxt"dan "son dərəcə nadir"ə qədər terminlərlə xarakterizə olunur. Səni bunu şəxsən yaşamamış olsan belə, daha erkən presedenti xatırlamağa çalışmağa çağırıram.

Modelin seçimi haqqında son bir qeyd, davam etməzdən əvvəl. Mövzunu ört-basdır etmək istəmirəm, amma şirkətlərdə çox vaxt tamamilə müstəqil şöbə və ya vəzifə yaratmaq sualı ortaya çıxır ki, bu da əsasən mövcud strukturlar çərçivəsində mövcud olacaq. Şirkətlər gündə milyard dəfə belə qərarlar qəbul edir: "Bunun üçün yeni komanda yaradaqmı? Onu haraya yerləşdirək?" SRE ilə bağlı bu qərarın qəbulu az fərqlənir və eyni qanunlara tabedir.

## Doğru əks-əlaqə dövrələrinin yaradılması və inkişafı

Təşkilatda SR-mühəndisin işinin vacib hissəsi — bu təşkilatın sistem, servis və məhsullarının etibarlılığını artırmağa yönəlmiş əks-əlaqə konturlarının yaradılması və inkişaf etdirilməsidir. Bu barədə mücərrəd fikirlərimi söyləməzdən əvvəl, yəqin, SR-mühəndislərin təşkilatında əks-əlaqə dövrəsini ümumi struktura necə daxil edə biləcəyi barədə bir neçə dəqiqə düşünməyə dəyər.

### Əks-əlaqə dövrəsi və məlumat

Təşkilat kontekstində əks-əlaqə dövrələri barədə düşünəndə, ilk növbədə soruşduğum sual — məlumat haradan gələcək. Məlumat — bu dövrələrin işini dəstəkləyəcək yanacaqdır. Bu kitabda etibarlılığı müzakirə edərkən dəfələrlə açıq mənbələri qeyd edirik — insidentlər/nasazlıqlar (insidentin nəticələrinin təhlili şəklində təqdim olunan) və monitorinq məlumatları. Daha az aydın mənbələr də var — müştəri dəstəyi sorğuları/kejsləri, CI/CD məlumatları (test yaratma/uğursuzluq tendensiyaları, deployment nəticələri), istehsala/tətbiqə hazırlıq təhlilinin nəticələri, icra olunmamış tapşırıqların statistikası, zəng baxışlarının məlumatları, işdən çıxan işçilərlə müsahibələr — bunlar sadəcə bir neçəsidir.

Planlaşdırarkən burada dayanıb qeyd olunan sahələrə fokuslanıb təşkilati uyğunluğa nail olmaqda böyük irəliləyiş etmək olardı. İlk baxışda əhəmiyyətsiz görünən nümunələr gətirim. Təşkilatında toplanan monitorinq məlumatları bütün işçilər üçün nə qədər əlçatandır? Əlçatanlıq dedikdə həm fiziki (başqa insanlar sistemə "daxil olub" məlumatları görə bilirmi?), həm də koqnitiv (insanlar giriş əldə edən kimi, bu sənədləşdirilib, dərin ixtisaslaşmış sahə biliyi olmayan işçilər üçün məlumat anlaşıqlıdırmı?) mənasını nəzərdə tuturam. Bu araşdırma xəttini bir sualda ümumiləşdirsək, o belə səslənə bilər: "Təşkilatınızda X-in etibarlılığı ilə bağlı sual versəm, cavab almaq mənə nə qədər çətin olardı?" Məlumat — yaratmağa çalışdığımız kəsişmənin əhəmiyyətli komponenti və elementidir.

### Əks-əlaqə dövrəsi və iterasiya

Təşkilatda əks-əlaqə dövrələri haqqında düşünərkən, məlumat sualından sonra bu sual gəlməlidir: "İterasiya nə qədər sürətli icra oluna bilər?" və ya (optimist ya pessimist olmağından asılı olaraq) "Nə işi ləngidir?" Həqiqətən dinamikası olmayan əks-əlaqə dövrəsi, ya da iterasiyaların baş vermədiyi sistem, proqnoz və hesabatlar üçün əladır (hadisələrin necə pis inkişaf edəcəyini bilirsən), amma bütün digər baxımlardan dəhşətlidir. Şeyi ağırlaşdırmaq istəmirəm, amma bu halda entropiya əks-əlaqə dövrəsini əks istiqamətdə işə salacaq.

Bunu nəzərə alaraq, SR-mühəndisləri iterasiyalara kömək üçün (onları sürətləndirmə və ümumilikdə) cəlb etmək olan/olmayan bütün yerləri müəyyənləşdirmək faydalıdır. Release inkişafı ilə bağlı fəaliyyət (CI/CD və deployment əməliyyatları daxil olmaqla) proqram təminatının iterasiyası üçün çox vacibdir; bu tamamilə aydındır. Rutinin aradan qaldırılması oxşar təsir göstərir. İnandırıcıyam ki, effektiv insidentə reaksiya və təhlil prosedurları təcrübə qazanmağa, sonra nasazlıqlardan öyrənmə prosesini sürətləndirməyə imkan verir, beləliklə iterasiyaları sürətləndirir. Bu istiqamətdə öyrənmək və təkmilləşdirmək üçün daha nadir seçim — layiq olduğu diqqəti almayan, amma iterasiyalara güclü təsir göstərən — servislərin deprekasiyası/istismardan çıxarılması və silinməsidir.

> **Əks-əlaqə dövrəsinin işinə mane olan antişablonlar.** Bir əvvəlki fəsildə SRE tətbiqinə mane olan antişablonlardan danışmışdıq. Orada bunu qeyd etməsəm də, antişablonları aşkarlamağın əsas üsullarından biri — burada müzakirə etdiyimiz məlumata/axına çıxışa ya da əks-əlaqə dövrəsinin iterasiyalarının icrasına mane olan metodları öyrənməkdir.

Məsələn, SRE sahəsi sorğu və rütbələr əsasında inkişaf edəndə, SR-mühəndis "yeni üçüncü səviyyə dəstək" sayılanda, bu SR-mühəndis şərti kiçik fil sümüyü qülləsində qalır — burada məlumatın əlçatanlığı və servis iterasiyaları ciddi məhdudlaşdırılıb (ən yaxşı halda). SR-mühəndis onlar haqqında məlumatlı olmaya bilər, bu isə müzakiramızın kontekstində əhəmiyyətli nəticələrə səbəb ola bilər, çünki bu işi ciddi ləngidə bilər.

### Əks-əlaqə dövrəsi və iterasiya planlaşdırması

Kiçik bir dönüş — və yuxarıda ifadə olunan iterasiyalarda işin ləngiməsi fikri tamam başqa istiqamət alır. Əvvəlki bölmədə əks-əlaqə dövrəsi yaratmaq üçün lazım olan vacib iterativ prosesləri ləngidən bir sıra sosiotexniki faktorları müzakirə etdik. Amma budur çaşdırıcı müşahidə: bu dövrəni pozmağın başqa yolu — onu əvvəlcə işə salmamaqdır.

Şübhə etmirəm ki, təşkilatında servis sistemləri və məhsulları üçün müəyyən planlaşdırma prosesi var. Ən çox ehtimal ki, bu planlar üçün yeni planlaşdırılan imkanların tam və ətraflı təsviri olan yol xəritəsi var. Kitabda müzakirə etdiyimiz etibarlılıq işi bu yol xəritəsinə daxil deyilsə və onu dəyişmək üçün asan müəyyənləşdirilə bilən proses yoxdursa, ciddi problemin var deməkdir.

Təşkilatda effektiv SRE tətbiqi yol xəritəsini idarə edən insanlarla açıq və işlək əlaqə kanalının olmasından asılı olacaq. Bu, etibarlılıq sahəsində iş aparmaq üçün çox vacibdir. Hər hansı başqa vəziyyət SRE tətbiqindən az fayda verəcək. Məsələn, əsas mühəndislik komandasından tamamilə müstəqil hərəkət edən, ya da onların işinə qoşulmağa çalışan işçilər (hər iki variant son dərəcə geniş yayılıb) çox məhdud nəticələr əldə edə bilər.

## Əks-əlaqə dövrəsini təşkilatda necə və harada tətbiq etmək

Bu fəslin əsas fikri — SR-mühəndislərin öz işinin effektivliyini təmin etmək üçün yaratmalı və inkişaf etdirməli olduğu əks-əlaqə dövrələrinin mövcudluğudur. Bu işlə şirkətdə məşğul olma imkanı böyük ölçüdə orada təşkilati uyğunluq səviyyəsini müəyyənləşdirir. Biz bu dövrələri əsasən təcrid olunmuş şəkildə, sanki artıq tam formalaşmış şəkildə ortaya çıxıblarmış kimi araşdırdıq və onları təşkilata tətbiq etmə mexanizmlərini müzakirə etmədik. Bölməni yekunlaşdıraraq, SRE tətbiqinin nisbətən gec mərhələsində diqqətə alınmağa başlanan, əks-əlaqə dövrələri əlavə etmək üçün tanıdığım bir imkandan bəhs etmək istəyirəm.

SR-mühəndislər məhsul yaratma mərhələsində belə təşkilatın etibarlılığına təsir etmək üçün böyük qabiliyyətə malikdir. Onlara ilkin arxitektura müzakirəsində iştirak etməyə icazə veriləndə, resurs təminatının ən yaxşı praktikalarını (nə təmin etməli, bunu necə etməli) təklif etmə imkanı olanda, sənədləşdirmə yaradılmasına konstruktiv kömək edə bildikdə, etibarlılığı təsdiqləyən metodları təbliğ edə bildikdə və s., təşkilat bundan yalnız qazanır. Spotify və digər şirkətlər "qızıl yol" terminini "şirkətlərində müxtəlif fikirlər nəzərə alınmaqla və dəstəklə nəyisə yaratma üsulu"nu təsvir etmək üçün istifadə edir. Beləliklə, bizim əvvəldən pozitiv əks-əlaqə dövrələrinin formalaşmasını asanlaşdıran şərait yaratmaq imkanımız var.

## Uğur əlamətləri

Fəsli yekunlaşdıraraq, düşündüm ki, bu sualı vermək faydalı olardı: "Bu işləyirmi, necə bilmək olar?" Yəni istənilən təşkilati uyğunluğa nail olursanmı? Əlamətlər siyahısına keçməzdən əvvəl, bəlkə səylərini müqayisə edə biləcəyin başqa təşkilatların praktika nümunələrini araşdırmaq istəyərsən. Ən yaxşı mənbəyim — SREcon konfransında müxtəlif sənaye və müxtəlif təşkilatlardan insanların kifayət qədər uzun çıxış siyahısıdır.

Praktik nümunələrin təhlili sənin işin deyilsə və daha kiçik məsələ lazımdırsa, verə biləcəyin bir neçə sadələşdirilmiş sual təklif edərdim:

- İnsanlar səni görməyə (ümumilikdə) sevinirmi?
- Qapıçı roluna görə irəli getməyi bacardınmı, ya da ümumiyyətlə bundan qaça bildinmi?
- Münasibətlər "itələmə"dən (vəziyyətə özün qoşulma) "daxil olma"ya (insanlar sənin iştirakını istəyir) dəyişdimi?
- SR-mühəndis komandası yol xəritəsi planlaşdırmasında məcburi iştirak edirmi?
- Reaktiv və proaktiv işin nisbəti yaxşı tərəfə dəyişdimi?
- Rutini əlavə etdiyindən çox aradan qaldırdığını iddia edə bilərsənmi?

Bu siyahını oxuyan SR-mühəndis (haqlı olaraq) qeyd edə bilər ki, bu ölçülə bilən məqsədlər dəstindən daha çox "əhval-ruhiyyə yoxlaması"dır. "Özünə iş" verməyin böyük tərəfdarı deyiləm, amma bu halda düşünürəm ki, sənin və komandan üçün bu sualları təşkilatının SLI/SLO-larına xas göstəricilərə və məqsədlərə çevirmək son dərəcə faydalı olacaq. SLI/SLO ilə bağlı bir çox digər məşğələ kimi, bunun da təşkilati uyğunluq və SRE tətbiqinə işıq salacağına əminəm.

---

Bu fəsildən çıxan əsas fikir sadədir: SRE-ni təşkilata inteqrasiya etmək tək bir "düzgün" model tapmaqdan çox, hansı modelin sənin təşkilatının strukturuna, mədəniyyətinə və hazırlıq səviyyəsinə uyğun gəldiyini anlamaqdır. Mərkəzləşdirilmiş, paylanmış, yoxsa hibrid — heç biri obyektiv olaraq "ən yaxşısı" deyil. Amma ölçülə bilən əks-əlaqə dövrələri olmadan, hansı modeli seçsən də, uğuru izləmək mümkün olmayacaq.

Sənin təşkilatında SRE hansı modellə işləyir? Uğur əlamətlərindən neçəsi tanış gəldi?

# SR-mühəndis komandan neçə mərhələdən keçəcək — və niyə bu, sənin əlində deyil

Yeni SRE komandasının menecerləri ilə danışanda görürəm ki, onları ən çox narahat edən sual budur: komanda vaxtla necə dəyişəcək? Hazırda nə etdiklərini, şirkətin qalan hissəsi ilə necə əlaqəli olduqlarını yaxşı bilirlər — amma gələcək o qədər də aydın deyil.

Rastlaşdığım ən yaxşı konseptual sxem — LinkedIn-in keçmiş işçisi Benjamin Purqasonun *The Evolution of Site Reliability Engineering* adlı çıxışından gəlir (ilk dəfə SREcon Asia 2018-də təqdim olunub). Ben çoxsaylı komandaları idarə etmə təcrübəsinə əsaslanaraq, SR-mühəndis komandalarının vaxtla keçdiyi beş mərhələni müəyyənləşdirib — amma qeyd edim ki, ciddi xətti ardıcıllıqla yox. Bu yazıda müəllifin icazəsi ilə onun çıxışının əhəmiyyətli hissələrini öz şərhlərimlə birlikdə paylaşıram.

> Bu mərhələləri "yetkinlik modeli" adlandırmaqdan qaçıram, çünki insanlar bunu son nöqtəyə çatmaq lazım olan vəziyyət diaqramı kimi görməyə meyllidir. Reallıq xətti deyil.

## Mərhələ 1: Yanğınsöndürən

Bilirsən ki, insanlar adətən SR-mühəndislərə narahat edici etibarlılıq problemi yaranandan sonra müraciət edir. Bəlkə tez-tez sıradan çıxma baş verir, ya da eyni sahədə işləyən başqa şirkət mediada uzun downtime-a görə xatırlanıb. Bir az daha optimist ssenari: mühəndislik rəhbərləri aydın anlayır ki, inkişaf sürətini artırmaq mümkün deyil, əgər sıradan çıxma tezliyi də artmayacaqsa. Nə sürətin azalması, nə də etibarlılığın azalması şirkət üçün qəbulediləndir, ona görə rəhbərlik SR-mühəndislərə müraciət edir — onları xilas edəcəklərinə ümid edərək. Beləliklə SR-mühəndisin ilk rolunu alırıq: **yanğınsöndürən**.

Demək olar ki, hamı buradan başlayır. Etibarlılıqla bağlı problemlər var, SR-mühəndislər bu problemləri aradan qaldırmaq üzərində işləyir (ideal halda onlara səbəb olan faktorları da aradan qaldıraraq, ki, problemlər az təkrarlansın). Sonra yeni problemlər yaranır, SR-mühəndislər onları həll etməyə başlayır. Beləcə davam edir — yanğınların miqyası və vurduğu zərər ciddi təhlükə olmaqdan çıxana və başqa işlərlə məşğul olmaq üçün vaxt yaranana qədər.

Bu mərhələdə ən çox eşitdiyim sual: "Bu nə vaxt bitəcək?" Təəssüf ki, dəqiq bitmə müddəti yoxdur. Tolstoyun sözü ilə desək — "bütün xoşbəxt ailələr bir-birinə bənzəyir, hər bədbəxt ailə öz yolu ilə bədbəxtdir." Bunun səni nə qədər rahatlaşdıracağını bilmirəm, amma bu mərhələdən danışanda demək olar ki, hər kəs illərdən söz açır (ən yaxşı halda ildən bir az az, ən pis halda bir neçə il). Əminliklə demək olar ki, bu mərhələni keçmək üçün lazım olan vaxt həftələrlə ölçülmür.

Amma bu mərhələdə daha ürəkaçan bir fikir də var: Ben güman edir ki, yanğınlar arasındakı fəaliyyət həlledici əhəmiyyət daşıya bilər. Onun fikrini bəyənirəm — Dikersonun ierarxiyasının ilk iki səviyyəsinə (monitorinq/müşahidə və insidentə reaksiya) əlavə olaraq, bu, komandanın aşağıdakıları etməsi üçün yaxşı andır:

- Qayğısına qaldığı mürəkkəb sistemin bütün dəyişən komponentləri haqqında daha çox öyrənmək (üstünlüklər, çatışmazlıqlar, yük altında davranış və asılılıqlar — istəsən, sistem "kinesiologiyasını" öyrənmək).
- Benin "avtomatik yanğınsöndürmə sistemi" adlandırdığı şeyi yaratmaq. Terminin metaforikliyini kənara qoysaq, burada mənə çox xoş gələn fikir — sistemin öz problemlərinə reaksiya verib onların effektini yumşalda bilməsi üçün lazım olan mexanizmlərin yaradılmasına fokuslanmaqdır. Bəlkə autoscaling tətbiq edəcəksən, yükü paylaşdıracaqsan, yük balanslaşdırmasını/trafik idarəetməsini yaxşılaşdıracaqsan, ya da production-dakı problemlərə avtomatik reaksiya verib onları yumşaldan başqa alətlər yaradacaqsan. Bu da SR-mühəndislərin adətən məşğul olduğu rutini aradan qaldırmağın başqa bir yoludur.

## Mərhələ 2: Qapıçı

Ben öz çıxışında deyir ki, bu mərhələni keçmək olar (hətta arzuolunandır). Amma çoxlu insanla ünsiyyətim məni bir az fərqli nəticəyə gətirib. Təcrübəmə görə, insanlar bu mərhələni "tullansalar" belə, ən azı nəzarət sistemi haqqında və onu necə tətbiq edə biləcəkləri barədə çox düşünüblər.

Bu iddianın arxasında real hekayə dayanır. Görək özünü orada tanıyacaqsan.

Komandamızdan çoxlu etibarlılıq problemi ilə mübarizədə kömək istədilər. Bütün ili production-dakı yanğınları söndürməyə və etibarlılıq problemlərini həll etməyə sərf etdik. Nəhayət işlər yaxşılaşmağa başladı. İndi mövcud vəziyyəti qorumaq üçün nə etməliyik?

Ən təbii cavab: "vestqotları nəzarətdə saxla" — yəni prosesə zərər verən qüvvələri production-dan uzaq tut. Təkcə qüvvələri yox, bu dağıdıcı dəyişikliklərin mənbəyi və ya daşıyıcısı ola biləcək insanları da uzaq tut. Sərhədi nəzarətdə saxla.

Bu cavab, sistemin etibarlılığını qorumaqla tapşırılan, "gəmini az əvvəl təmir edib" SR-mühəndis nöqteyi-nəzərindən məntiqlidir. Amma təşkilat nöqteyi-nəzərindən, bütün sosiotexniki sistemlər nöqteyi-nəzərindən bu böyük problemdir: qapıçı kimi davranmağa başlayan SR-mühəndislər adətən başqa insanların həyatını daha da narahatedici edir. Bu, dost qazanmağın ən yaxşı yolu deyil və işyerində xoşməramlı, məhsuldar atmosfera yaratmağa kömək etmir. Qapıçını təsəvvür edəndə mənim gözümdə hava limanındakı gömrük məmuru canlanır.

Sərhəd qoruyan gömrük məmuru obrazı sənə də uğursuz görünürsə — deməli problemi tapmısan. SR-mühəndis komandası dəyişiklikləri nəzarət edən hakimlərə ya da güc strukturlarına çevriləndə, uzunmüddətli perspektivdə nə sənə, nə də təşkilata fayda verməyəcək vəziyyət yaranır. Bu, komandada narazılıq yarada, əməkdaşlığa mane ola və məhsuldarlığı poza bilər.

Qapıçı rolunu (uzunmüddətli perspektivdə əl ilə və/ya işi ləngidərək) icra etmək — təşkilatda SRE sahəsinin vaxtla mövcud olmaqdan çıxmasına nail olmağın əla üsuludur. Üstəlik, bu yanaşma təkcə işləmir, həm də miqyaslanmır. İnsanlar çətinlikləri dolaşacaq — hətta çətinlik yaxşı niyyətli, production-da yenidən yanğın çıxmamasına çalışan SR-mühəndis komandasının mövcudluğu olsa belə. Bütün işçilər işini görmək üçün SRE komandasından keçməli olanda, çox güman ki, qapıçı roluna kifayət qədər insan işə götürə bilməyəcəksən.

> **Bütün qapıçılar zərərli deyil (hələ ki).** Bütün qapıçıların (qısamüddətli nəzarətçilər daxil olmaqla) mütləq zərərli olduğu təəssüratı yaranmasın istəyirəm. Bəzən bu hərəkətlər doğrudur — resurs məhdudiyyəti ya da müqavilə/normativ tələblərə riayət şərti ilə. Həlledici faktor — vəziyyəti dövri olaraq yenidən qiymətləndirməyə hazır olmaq, onu yaxşılaşdırmaq, ya da heç olmasa daha az ağır etmək mümkün olub-olmadığını müəyyənləşdirmək üçün. Amma nəzarət SR-mühəndislərinin məşğul olduğu yeganə şeydirsə — bu, çox narahatedici siqnaldır.

Bu kitab sənə gec çatıbsa və artıq qapıçı mərhələsində möhkəm ilişmisənsə, nə etməli? Bu mərhələni dəfələrlə tənqid etdim, ona görə səni belə qaranlıq yerdə atmaq düz olmazdı. Eşitdiyim ən yaxşı çıxış yolu tövsiyəsi yenə Bendən gəlir. O, insanlarla yox, problemlə vuruşmağı təklif edir.

Şirkətdəki digər işçilərlə birgə production ətrafında divar yaranmasına səbəb olan problemləri aşkarlaya bilsən və sonra bu problemləri aşkarlamaq üçün aydın, obyektiv üsullar tapa bilsənsə — qapı gözətçisi vəzifəsindən qurtulmaq üçün kod yaza bilərsən. Məsələn, son üç sıradan çıxmanın səbəbi proqramın yaddaş sahələrini müntəzəm buraxmaması idisə və hamı razıdırsa ki, production-da işə düşəcək hər bir binary bu problemə görə yoxlanılmalıdır — kompüter bunu deployment bitməzdən əvvəl özü yoxlasın. Kimsə bu problemi olan yoxlanılmamış binary ilə gəlib production-da işə salmağı xahiş edərsə, kod insana faylın deploy olunmasına icazə verilməzdən əvvəl nə etməli olduğunu yumşaq şəkildə bildirə bilər.

Hamı qayda/təlimat/siyasətlə razılaşır, kompüter (bəlkə SR-mühəndisin yazdığı kodun köməyilə) qaydaların davamlı icrasını təmin edir, SR-mühəndis isə rahatca başqa işlərlə məşğul ola bilir. Başqa sözlə, bunu belə ifadə etmək olar: "Budur, X şərtinə riayət etməklə lazım olanı asanlıqla etməyə imkan verən hərəkət" — burda X təşkilat üçün əhəmiyyətli konkret şərt ya da standartdır.

SR-mühəndislər hansı başqa işlər üçün azad olur? Növbəti mərhələyə keçib görək.

## Mərhələ 3: Müdafiəçi

Bilirsən ki, SRE öz təbiətinə görə yorulmaz əməkdaşlığı nəzərdə tutur. Bu, əməkdaşlığın sadəcə özbaşına yaranması yox, məqsədyönlü şəkildə baş verə biləcəyi ilk mərhələdir. Yanğınsöndürən mərhələsində zərurətdən əməkdaşlıq edirsən — yanğını söndürərkən ekspert həmkarlarla məsləhətləşərək. Qapıçı mərhələsindən keçmisənsə, həmkarlarınla münasibətin əməkdaşlıqdan çox mübarizəyə bənzəyə bilər. Belədirsə, münasibətləri düzəltmək və SRE sahəsinin qavranılmasını yaxşılaşdırmaq üçün vaxt və güc sərf etmək lazım gələcək.

Daha sıx əməkdaşlığa keçmək üçün növbəti mərhələdə **müdafiəçi** rolunu üzərinə götürmək lazımdır — təşkilatda etibarlılığı təbliğ etmək. Komandanla birlikdə məqsədləri aydın formalaşdırmağa başla, onları həyata keçir və etibarlılığı saxlamaq üçün sistemlər yarat (əvvəl qeyd etdiyim monitorinq kimi standart öhdəliklərə əlavə olaraq).

Praktikada müdafiə nə deməkdir? Bu mərhələdə SR-mühəndislər proqram təminatının həyat dövrünün bütün mərhələlərində etibarlılıqla məşğul olmağa başlayır — təkcə mövcud sistemlərdə yanğın söndürərkən yox. Onlar dizayn və arxitektura müzakirələrində iştirak etmək üçün ideal namizəddir. Bu zaman prosesin erkən mərhələlərində təhlükəsizlik nümayəndələrinin də müzakirədə iştirak etməsi arzuolunandır.

Bəlkə də sistemlərin deploy olunmasından əvvəl production-a hazırlıq yoxlamasına rəhbərlik etməyə kömək edirlər. Developer həmkarlarının fəaliyyətini diqqətlə izləyirlər ki, yeni funksiyalar, buraxılışlar və s. üçün müvafiq dəstəyi deploy-dan əvvəl planlaşdıra bilsinlər (dəyişiklik və ya hadisələr barədə ilk dəfə sıradan çıxma zamanı öyrənmək əvəzinə).

Məhz bu mərhələdə SR-mühəndislər başqa işçilərə servis yaratmaq, tətbiq etmək və idarə etməkdə kömək edən daha geniş özünəxidmət imkanları verən sistemlər/alətlər/proseslər yaradır (Ben bunu "məsuliyyəti artıran sistemlərin yaradılması" adlandırır). Xatırla ki, qapıçı mərhələsindən çıxış yolu daha aktiv əməkdaşlığa və nəzarət/siyasətə riayət prosesinin avtomatlaşdırılmasına imkan verən sistemlərin yaradılması idi. Bu, körpünün digər ucu və onun apardığı yerdir. İdeal halda bu mərhələdə production müdafiəsi siyasəti SR-mühəndislər və developer-lər tərəfindən birgə hazırlanır, çünki hamı birlikdə arzu olunan production mühiti yaratmaq üzərində işləyir.

Bu, daha tam partnyorluğa doğru addıma bənzəyirmi? Ümid edirəm ki, bəli — çünki bu, növbəti mərhələdir.

## Mərhələ 4: Tərəfdaş

Bu ana qədər hara getdiyimizi artıq bilirik, bu isə doğru istiqamətdə növbəti addımdır.

Əvvəlki mərhələdə SR-mühəndisi developer həmkarlarının fəaliyyətinə diqqətlə fikir verməyə vadar etdik ki, adekvat reaksiya verə bilsin. Daha yaxşılaşdırılmış variant — iki komandanın yol xəritəsini birlikdə, tərəfdaş kimi planlaşdırıb tərtib etdiyi vəziyyətdir.

Bu mərhələdə SR-mühəndislər hamının istifadə etdiyi tikinti bloklarının komponentlərinə çevrilə bilən sistemlər/alətlər/proseslər yaratmağa davam edir. Məsələn, SR-mühəndislər bütün layihələrə tətbiq olunan monitorinq kitabxanalarına cavabdeh ola və onları inkişaf etdirə bilər, ya da təşkilatda qəbul edilmiş standart RPC mexanizminə görə məsuliyyət daşıya bilər. Düşünməyi xoşlayıram ki, SR-mühəndislər ümumi "etibarlılıq pillələri dəsti", ya da "etibarlılıq platforması" yaratmaq və inkişaf etdirməkdə məsuliyyət daşımağa başlayır.

Benin çıxışındakı ən sevdiyim terminlərdən biri o vaxt ortaya çıxır ki, o güman edir bu mərhələdə SR-mühəndislər "intellektual risk ilhamlandıran" alətlər də yarada bilər. Bu fikri bəyənirsənsə, *Seeking SRE* kitabının kontekst və nəzarətin qarşılaşdırılmasına həsr olunmuş 1-ci fəslini oxumağa dəyər — orada deyilir ki, bütün işçilər ağıllı qərar verə bilsin (nəzarət mexanizmlərinə vaxt sərf etmək əvəzinə) deyə, kifayət qədər kontekst (dashboard-lar, qiymətləndirmə cədvəlləri və s.) təmin etmək lazımdır.

Nəhayət, məhz tərəfdaşlıq mərhələsində SR-mühəndislər və developer-lərin növbətçilik (on-call) öhdəliklərini bölüşməli olduğu fikri həqiqətən aktual olur. Tərəfdaşlıq mərhələsində bu təcrübə hər iki şöbə tərəfindən qarşılanır — SR-mühəndislərin arzuladığı bir növ "cəza" kimi yox. (Artıq "developer gecə saat üçdə çağırılan kimi, production-da xətalar bitəcək" deyə düşünmürlər.)

## Mərhələ 5: Mühəndis

Bu son mərhələdə etibarlılığa əsaslanan SR-mühəndis prioritetləri ilə qalan mühəndislərin prioritetləri arasındakı fərq çox bulanıqlaşır. Hamı sistemin həyat dövrünün bütün mərhələlərində etibarlılığı təmin etmək üçün lazım olan tədbirlərdə iştirak edir — arxitektura yaratmaq, müxtəlif production-öncəsi yoxlamalar, növbətçilik, insident nəticələrinin təhlili, yol xəritəsi tərtibi, alət hazırlığı və s.

Kitabda əvvəl "ştatın çevrilməsi" təhlükəsi haqqında xəbərdarlıqları nəzərə alaraq — SR-mühəndislər funksiya tətbiq edən mühəndislərə çevriləndə — vacib nəticə çıxarmalıyam: məsələ o deyil ki, SR-mühəndislər gündəlik işində digər mühəndislərdən fərqlənməz olub və bütün mühəndislər birdən əvəzlənə bilər olub. SR-mühəndislər sistemin ayrı komponentlərinə görə funksiya yaradan şöbələrdən daha çox işləməyə və əsas məsuliyyət daşımağa davam edir. Onlar digər işçilərdən fərqli olaraq etibarlılığa diqqətlə fikir verməyə davam edir. Əslində baş verən — yüksək sıxlıq və əvvəllər görülməmiş əməkdaşlıq səviyyəsinə nail olunmasıdır.

Bu mərhələdə özündən soruşa biləcəyin vacib sual: "Bu mərhələ sadəcə boş xəyaldırmı — real dünyada belə şey olurmu?" Təcrübəmə görə, belə şey real dünyada baş verir (nadir hallarda), amma müntəzəm yox. Bu mərhələnin əsasında stimullların qurulması və xüsusi təşkilati struktur dayanır. Hər ikisini adi dəyişikliklər — reorganizasiya, büdcə yenidən bölgüsü kimi — asanlıqla poza bilər.

DevOps icmasında funksiya üzərində iş və istismarın əks stimullar səbəbindən tez-tez fərqli prioritet aldığı barədə çox yazılır. Analoji şəkildə, həm etibarlılıq dizaynı (SRE), həm də etibarlılıqla bağlı olmayan sahədə (funksiya inkişafı) qərar qəbul etməyə səlahiyyəti olan kiməsə çatmaq üçün təşkilat strukturunda nə qədər uzun yol getmək lazımdırsa, təşkilata lazım olan fəaliyyət ardıcıllığının xas olma ehtimalı bir o qədər azdır. Stimullar da, struktur da tamamilə əlaqəsiz səbəblərdən dəyişə bilər — bu isə bu mərhələ üçün lazım olan sıxlıq və əməkdaşlığa mənfi təsir göstərir.

Bunları bu mərhələyə çatmağa can atmağını söndürmək üçün yox, sadəcə xəbərdar etmək üçün deyirəm ki, bu mərhələ bəzən artıq çatılmış kimi görünə bilər, bəzən əlçatmaz.

## Xəbərdarlıqlar icraçısı

Əvvəlki fəsillərin bəziləri kimi, bu da xəbərdarlıqlarla bitir.

Birincisi, vacibdir ki, bu mərhələlərə DEFCON səviyyələri kimi, sən ya da komandan/təşkilatın keçdiyi homojen vəziyyətlər dəsti kimi baxma. Böyük təşkilatda bəzi SR-mühəndis komandaları yanğınsöndürən, digərləri isə müdafiəçi ola bilər — tamamilə mümkündür.

Əslində, əminliklə demirəm ki, vahidlik həqiqətən məqsəd olmalıdır. Etibarlılıq üçün "uyğun səviyyə" kateqoriyamız olduğu kimi, SRE-komandasının inkişafı üçün də, təşkilatın unikal vəziyyətindən asılı "uyğun səviyyə" kateqoriyası lazım ola bilər. Başqa sözlə, "Mərhələ 5: Mühəndis" son hədəf kimi hər SRE komandasına uyğun olmaya bilər.

İkincisi, Elizabet Kübler-Ross haqqında eşitdiyim hekayə yadıma düşür. Ən məşhur kitabı *On Death & Dying*-də ("Ölüm və Ölüm haqqında") "qəmin beş mərhələsi" modelini təqdim etdi — bu, böyük populyarlıq qazandı. Bu modellə bağlı bir yanlış anlama — hər insanın bütün mərhələlərdən müəyyən xətti ardıcıllıqla keçdiyi təsəvvürü idi.

Görünür, həyatının son günlərində Elizabet bu təsəvvürlə mübarizəyə xeyli vaxt və güc sərf edib. O, modeli nəşr edərkən ilkin niyyətinin belə olmadığını çox aydın izah edirdi.

Bu fəsildə təsvir olunan SR-mühəndis təkamülünü Kübler-Ross modeli ilə müqayisə etmək bir az iddialıdır, amma ortaq bir cəhətləri var — xəttilik olmaması. Bəlkə sən ya da komandan bu fəsildə sadalanan sırayla mərhələlərdən keçəcəksiniz, bəlkə də sənin halında ardıcıllıq fərqli olacaq. Ona görə bunları "SRE yetkinlik modeli" adlandırmamağa çalışıram — insanlar bunları son nöqtəyə çatmaq məqsədi olan vəziyyət diaqramı kimi görməyə meyllidir. Tamamilə mümkündür ki, komandan tərəfdaşlıq mərhələsindədir, sən isə hələ də gecə soyuq tərdə oyanıb öhdəliklərinin bir hissəsinin adi qapıçı işi olduğunu anlayırsan. Ya da yeni mərhələyə çatırsan, sonra tərəfdaşlıq münasibətləri dəyişdikcə geri sürüşürsən. Deməyi sevməsəm də — küncdə həmişə yanğınsöndürən tələb edən yanğınlar gözləyir...

Keçə biləcəyin, ya da keçməyəcəyin müxtəlif mərhələlərin mövcudluğu fikrini qəbul edə bilsən, bu sənə yaxşı xidmət edəcək.

---

Bu fəslin əsas mesajı sadədir: SRE komandan yanğınsöndürəndən mühəndisə xətti yol boyu irəliləməyəcək. Bəzi komandalar qapıçı mərhələsində ilişib qalır, bəziləri heç vaxt tam "mühəndis" mərhələsinə çatmır — və bu, uğursuzluq demək deyil, sadəcə sənin təşkilatının reallığıdır. Vacib olan — hansı mərhələdə olduğunu tanımaq, qapıçı rolunun tələsinə düşməmək, mərhələ 5-i yeganə qəbuledilən son nöqtə saymamaq.

Sənin komandan hazırda hansı mərhələdədir? Geriyə sürüşmə hiss etmisənmi?


