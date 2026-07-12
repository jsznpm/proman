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
