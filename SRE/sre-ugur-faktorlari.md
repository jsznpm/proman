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
