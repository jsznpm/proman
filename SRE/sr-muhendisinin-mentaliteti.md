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
