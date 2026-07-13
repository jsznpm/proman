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
