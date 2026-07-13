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
