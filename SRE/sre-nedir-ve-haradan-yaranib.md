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
