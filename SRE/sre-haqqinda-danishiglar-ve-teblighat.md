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
