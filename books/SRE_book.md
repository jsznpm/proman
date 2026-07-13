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
