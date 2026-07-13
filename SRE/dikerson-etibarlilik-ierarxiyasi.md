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
