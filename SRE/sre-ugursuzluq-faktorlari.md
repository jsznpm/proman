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
