# SRE-ni təşkilata necə "hopdurmaq" olar?

Əvvəlki yazıda SRE-ni tətbiq etməzdən əvvəl hansı hazırlıq işlərinin lazım olduğundan danışdıq. Tutaq ki, o hissəni oxumusan və nəticəyə gəlmisən: "Bəli, düşünürəm ki, bu işləyə bilər." Bu yazıda isə bir addım irəli gedirik: SRE-mühəndislərinin təşkilatın səviyyəsinə uyğunlaşmasına nə kömək edir? Bunun üçün bir neçə inteqrasiya modelinə, cəlbolunma nöqtələrinə, əks-əlaqə dövrəsinə və uğur əlamətlərinə baxacağıq.

> Vəzifə və komanda yaranmazdan əvvəl SRE təcrübələrini sınamaq olar — buna icazə, sertifikat, ya rəsmi status lazım deyil. Lazım olan tək şey — sağlam maraq və ağ lövhə qarşısında keçirilən bir neçə dəqiqə.

## Vəzifə və komanda yaranmazdan əvvəlki təcrübələr

Növbəti fəsillərdə SR-mühəndis komandalarını sıfırdan necə böyütmək barədə dəfələrlə danışacağıq. Amma məsələyə "SRE 0" vəziyyətindən — yəni təşkilatda ümumiyyətlə heç bir SR-mühəndis olmadığı vəziyyətdən — baxmağı da vacib sayıram.

SRE komandası işə götürülməzdən, hətta bu vəzifəyə bir nəfər təyin olunmazdan əvvəl belə, şirkətdə SRE təcrübələrini sınamağı çox sevirəm. Tikinti sənayəsi ilə müqayisə edək: orada tikintiyə başlamazdan əvvəl lisenziyalı, sertifikatlı mühəndis işə götürülməlidir. SRE-nin standart metodlarını mənimsəməyə başlamaq üçün belə tələb yoxdur. Lazım olan — servis və ya sistemə qarşı sağlam maraq və əsas SLI/SLO-ları müəyyənləşdirmək üçün ağ lövhə qarşısında keçirilən bir az vaxt. Növbəti addım — bu SLO-ları monitorinq sistemində izləmək və nəticələri müntəzəm görüşlərdə müzakirə etməkdir.

Təcrübəmə görə, hətta sınaq və ya eksperimental SRE işi belə fayda gətirir. Ümumi mənzərəyə baxsan, iş yerində etibarlılıqla bağlı SRE ruhunda işlər tapmaq mümkündür. Həmkarlar həvəslidirsə, servisin işində maraqlı tərəflər cəlb olunub və maraqlanırsa, mövcud monitorinq sistemində SLO-nu izləmək asandırsa — bunların hamısı ürəkaçan əlamətlərdir. Əgər işlər o qədər də hamar getmirsə, bəlkə gələcək problemlərin mənbəyini, hətta SRE-ni tətbiq etməzdən əvvəl iki dəfə düşünməli olduğunu göstərən qırmızı bayraqları aşkarlamısan.

Oxşar başlanğıc nöqtəsi ola bilər: insident təhlilləri. Komandanız SRE olmadan sıradan çıxmadan sonrakı təhlili yaxşılaşdırmaq üzərində işləyirsə və SRE üslubunda öyrənirsə — bu da doğru istiqamətdə əhəmiyyətli addımdır. Bu, təşkilati uyğunluq haqqında dəyərli kontekst məlumatı verəcək.

Amma bəzən şərait elə olur ki, kadr seçimi və ya komanda formalaşdırılması zamanı bu cür eksperiment mərhələsini keçmək lazım gəlir. Məsələn, yüksək rəhbərin SR-mühəndislərlə müəyyən təcrübəsi var və artıq gözləmədiyin işçilər dəstəsi toplayıb, ya da birləşmədən sonra bütün SRE şöbəsi və ya bir neçə SR-mühəndis qəflətən təşkilata qoşulur. Bu, sənin vəziyyətindirsə, yenə də vəziyyətə (özünlə və başqalarıyla ünsiyyətdə) eksperiment kimi yanaşmağı məsləhət görürəm. Sadəcə fərqli bir eksperimentdir.

## İnteqrasiya modelləri

Böyük təşkilata SRE-ni inteqrasiya etməyin fərqli modellərini artıq qısaca müzakirə etmişik, amma bu mövzuya birbaşa aiddir, ona görə sürətli icmal edək. Praktikada geniş istifadə olunan üç fərqli model görmüşəm: mərkəzləşdirilmiş/tərəfdaş, paylanmış/daxil edilmiş və hibrid.

### Mərkəzləşdirilmiş/tərəfdaş model

Daha yaxşı termin olmadığı üçün bunu ilkin model sayıram, çünki bu, Google bu sahəni ilk yaradıb populyarlaşdıranda qəbul etdiyi modeldir. Bu modeldə SR-mühəndislər — öz kadr işə götürmə qaydaları, ştatı və karyera pilləsi olan müstəqil bir təşkilatdır. SR-mühəndislər hansı komandalar üçün işlədiyindən asılı olmayaraq bu təşkilatda çalışır.

SR-mühəndislər komandalarda işləyir. Əksər komandalar məhsul yaradan komanda ilə (oxu: developer-lərlə) əməkdaşlıq edir və onların etibarlılıq ehtiyaclarına fokuslanır. Məsələn, Google Maps, Gmail, Ads və s. üçün SR-mühəndislər var. Bundan başqa, mərkəzləşdirilmiş alət və servislər üzərində işləyən SRE komandaları da var (Borg-da, BigTable-da SR-mühəndislər və s.).

**Deficit modeli.** Bu, mərkəzləşdirilmiş modelin məcburi əlaməti deyil, amma Google-un təşkilati modeli üçün kifayət qədər önəmlidir və ayrıca müzakirəyə dəyər. Google-dakı SRE modeli SRE-ni qənaətlə bölüşdürülməli olan qıt resurs kimi görür. Yeni Google servisləri yaradılır, sonra onları yaradan insanlar tərəfindən idarə olunur. Servis müəyyən yetkinlik səviyyəsinə çatmalı və SR-mühəndislərin cəlb olunmasının fayda gətirəcəyini sübut etməlidir — yalnız bundan sonra SRE təşkilatı onunla rəsmi işləməyə başlayır. Bu, Google-dakı SRE fəlsəfəsinə uyğundur — SRE-nin sublinear miqyaslanması.

Təşkilat baxımından mərkəzləşdirilmiş modelin (ən azı nəzəriyyədə — bunun haqqında bir az sonra) bir sıra üstünlükləri və mənfi cəhətləri var. Güclü paylanmış təşkilatdan fərqli olaraq, mərkəzləşdirilmiş təşkilatda ümumi metod, proses, alət, dəyər dəsti yaratmaq və saxlamaq daha asandır. Nəzəri olaraq SR-mühəndislər asanlıqla əvəzlənə bilər və başqa komandalara keçə bilər. Ayrılıq müəyyən qədər "işçilərin yenidən bölüşdürülməsi/vəzifədən uzaqlaşdırılması"na qarşı qoruma verə bilər (yəni mühəndislik rəhbəri artıq mövcud SR-mühəndisi developer vəzifəsinə keçirmək qərarına gələndə). Bu model ştat sayının yenidən bölüşdürülməsini çətinləşdirir, çünki bu kontekstdə SR-mühəndislər fərqli işçi kateqoriyası sayılır.

Bir çox baxımdan bu üstünlüklər mənfi cəhətlərin əks tərəfidir: SR-mühəndislər şirkətin qalan hissəsindən daha təcrid olunmuş olur; mərkəzi təşkilatın ehtiyacları ilə yerli developer komandası arasında alət uyğunsuzluqları yarana bilər; kadr işə götürmə prosesi çətinləşə bilər, ştat bölgüsü daha məhdud ola bilər.

Növbəti modelə keçməzdən əvvəl "nəzəri" şərhlərə qayıtmaq istəyirəm. Kifayət qədər Google SR-mühəndisi ilə danışsan, aydın olur ki, korporasiyanın daxilində belə Google modelinin reallığı üstünlüklərdən güman edildiyindən qat-qat mürəkkəbdir. Kifayət qədər böyük şirkətin bütün işçilərini (harada olmalarından asılı olmayaraq) vahid məntiqlə hərəkət etdirmə cəhdləri ilə bağlı adi problemləri kənara qoysaq belə, homojenliyə meydan oxuyan və böyük təşkilatlarda işləyən hər kəsə tanış olan şərait və qüvvələr həmişə mövcuddur. Məsələn, Google (və ya möhkəm SRE mədəniyyəti olan istənilən başqa şirkət) başqa şirkəti alanda, assimilyasiya prosesi və onun nəticələri uzun müddət qarışıq qala bilər. Bu qarışıqlığı aradan qaldırmağın yolu olduğunu düşünmürəm — o həmişə mərkəzləşdirilmiş modellərin adətən çəkilən parlaq şəklini mürəkkəbləşdirir.

Bu model haqqında (Google-da tətbiq edildiyi kimi) daha ətraflı məlumatı Google əməkdaşlarının müəllif olduğu SRE mövzusundakı kitabların fəsillərində tapa bilərsən.

> **Rotasiyanı düşün.** Mərkəzləşdirilmiş modeli tətbiq edirsənsə, rotasiya anlayışına xüsusi diqqət yetir. Rotasiya — SR-mühəndisin müəyyən müddət (ay, üç ay, altı ay) developer kimi işləməsinə icazə verilməsidir, "özünü başqasının yerinə qoymaq" üçün. Developer-lər müəyyən vaxt SR-mühəndis kimi işləmə imkanı alır, SR-mühəndislər isə müəyyən vaxt developer funksiyalarını yerinə yetirə bilir. Hər təşkilatın buna resursu və ya işə götürmə standartı yoxdur (və startaplarda bu, istəsələr də istəməsələr də, hər gün baş verir — orada bir işçi hər şeyi edir). Amma bu tapşırığın öhdəsindən gəlsən, hər iki işçi çoxlu dərs və praktik bacarıq öyrənəcək.

### Paylanmış/daxil edilmiş model

Paylanmış/daxil edilmiş model — əsas hərəkət üsulu SR-mühəndislərin (Facebook-da onlara "production engineer" deyilir) birbaşa developer komandalarına daxil edilməsi olan modeldir. Mərkəzləşdirilmiş modeldə olduğu kimi, burada da mərkəzi alət və infrastruktur üzərində işləyən (onları yaradan/saxlayan) production mühəndis komandaları var, amma əsas fərq — SR-mühəndislərin developer komandalarına qoşulma mexanizmidir. Bu modeldə hər inteqrasiya mərhələsinin müddəti daxil olmaqla çoxlu dəyişən tənzimlənə bilər.

Bu modelin üstünlükləri və mənfi cəhətləri sənin developer komandasının tərəfdaşı yoxsa birbaşa üzvü olmağından asılıdır. Bir tərəfdən, bir-birinlə mümkün qədər sıx işləmək imkanı yaranır; digər tərəfdən isə bu o deməkdir ki, SR-mühəndislərin öz prioritetlərinə və yol xəritəsinə təsir etmə imkanı həmişə eyni səviyyədə olmur. Aydınlıq üçün — burda vurğuladığım fərqlər daha çox və ya daha az dərəcədə özünü göstərir, sadəcə iki vəziyyət kimi yox. Daxil edilmə o demək deyil ki, SR-mühəndislər öz kimliklərini və ya müstəqil hərəkət etmə qabiliyyətini tam itirəcək — sadəcə dinamika potensial olaraq fərqli olacaq. Analoji şəkildə, mərkəzləşdirilmiş modeldəki tərəfdaş komandalar da inanılmaz dərəcədə sıx birləşmiş ola bilər.

Bu model haqqında (öz vaxtında Facebook-da tətbiq edilmiş) daha ətraflı məlumatı Pedro Kanauati-nin yazdığı *Seeking SRE* kitabının 13-cü fəslində tapa bilərsən.

### Hibrid model

Yəqin bunu gözləyirdin. Bəzi təşkilatlar əvvəlki iki modeli birləşdirməyi üstün tutur. Onlarda SR-mühəndislər mərkəzləşdirilmiş təşkilatda işləyir, amma şirkətin ayrı bölmələri öz SR-mühəndislərini işə götürüb özləri idarə edir. Bəzən bu vəziyyət daha əvvəl qeyd olunan alma/assimilyasiya nəticəsində yarana bilər — şirkət alınan şirkətin bir hissəsi kimi bütöv bir SRE təşkilatı əldə edəndə. Bəlkə bu təşkilatı toxunmadan saxlayıb baş şirkətdəki mərkəzləşdirilmiş SRE təşkilatından müstəqil işləməyə icazə verəcəklər. Hibrid modelin yaranmasına gətirib çıxaran başqa bir vəziyyət — biznesin elə ixtisaslaşmış və ya niş hissəsinin olması ki, onun SR-mühəndislərini daha böyük şirkətin hissəsi etməyin mənası yoxdur. Deyə bilərəm ki, hibrid model xüsusilə istiqamətlərin müxtəlifliyi tez-tez rastlanan daha böyük (və bəlkə daha köhnə) təşkilatlarda geniş yayılıb.

Bu modelin bəzən yuxarıda qeyd olunan səbəblərdən (məsələn, tarixi səbəblərdən) tətbiq olunduğunu bir kənara qoysaq, üstünlüyü — nəzəri olaraq ən çox çevikliyi təmin etməsidir. Mənfi cəhəti — sıxlıq və ardıcıllığa nail olmaq, ümumi kimlik hissini saxlamaq çox çətin ola bilər.

## Modeli necə seçmək olar

Seçim etmək mümkündürmü? Sərt olmaq istəmirəm, amma tez-tez seçim olmadığını qeyd edirəm. Məsələn, böyük, köklü şirkət kontekstində yeni SRE şöbəsinin işini təşkil edərkən, mövcud işə götürmə və ya cəlbetmə sxemlərinə uyğunlaşmalı ola bilərsən. Belədirsə, seçimi (ən azı müvəqqəti) sənin əvəzinə edərlər və sən növbəti bölməyə keçirsən.

> **İlk cəhddə düzgün modeli tapmaq alınmaya bilər.** Bilirəm, bu ciddi qərar kimi görünür (çünki elədir də), amma rahatlığın üçün kiçik bir şərh əlavə etmək istəyirəm. Bəlkə təşkilat üçün doğru qərarı anlamazdan əvvəl səhvlər edəcəksən. Uyğun model tapılana qədər SRE-ni tətbiq etmək üçün bir neçə cəhd (oxu: uğursuz olub yenidən sınamaq) lazım gəldiyini görmüşəm. Bu, sadəcə normal deyil, bəzi hallarda zəruridir də — bəlkə sənin vəziyyətində də. SRE-nin mahiyyəti — vəziyyət yaxşılaşana qədər cəhdi təkrarlamaqdır və uyğun modelin axtarışı bunun istisnası deyil.

Bu baxımdan dünyan daha çox "sıfırdan yaradılırsa", qərar qəbuletmə prosesi uzaqda deyil. Bu qərarla bağlı verdiyim ilk iki sual belədir: "Təşkilatın strukturu (ağacı) hazırda necədir?" və "İxtisaslaşmış bir qol yaratma prosedenti varmı (məsələn, təhlükəsizliklə məşğul olan təşkilat)?"

Birinci sual SRE-ni həm təşkilat xəritəsində konkret yerə görə, həm də idarəetmə iyerarxiyasında haraya qoymalı olduğunu anlamağa kömək edir. Bu, işin təşkili zamanı "qüvvələrin" necə yönləndiriləcəyini müəyyənləşdirməyə kömək edir: yuxarıdan aşağı, yoxsa aşağıdan yuxarı. Bu tam dəqiq olmasa da, mərkəzləşdirilmiş model mənim üçün şirkət ağacında daha yüksək mövqedə təmsil olunmaqla assosiasiya olunur. İlkin daxil edilmiş model üçün mərkəzləşdirilmiş modeldən daha çox "görünməz qalmaq" xarakterikdir. Bütün bu modellər üçün təşkilatda güc və təsir lazımdır, amma onların mənbəyi və təbiəti dəyişə bilər.

İkinci sual gözlənildiyi kimi SRE ilə bağlıdır. Uğur və ya uğursuzluğu proqnozlaşdırmaq üçün az da olsa faydalı ola biləcək məlumatlar varsa, onlar qərarqəbuletmə prosesinin hissəsi olmalıdır. Bunu təsdiqləyən real məlumatım yoxdur, amma güman edirəm ki, SRE-nin şirkətdə ixtisaslaşmanın ilk real tətbiqi olması hadisəsi "heç vaxt"dan "son dərəcə nadir"ə qədər terminlərlə xarakterizə olunur. Səni bunu şəxsən yaşamamış olsan belə, daha erkən presedenti xatırlamağa çalışmağa çağırıram.

Modelin seçimi haqqında son bir qeyd, davam etməzdən əvvəl. Mövzunu ört-basdır etmək istəmirəm, amma şirkətlərdə çox vaxt tamamilə müstəqil şöbə və ya vəzifə yaratmaq sualı ortaya çıxır ki, bu da əsasən mövcud strukturlar çərçivəsində mövcud olacaq. Şirkətlər gündə milyard dəfə belə qərarlar qəbul edir: "Bunun üçün yeni komanda yaradaqmı? Onu haraya yerləşdirək?" SRE ilə bağlı bu qərarın qəbulu az fərqlənir və eyni qanunlara tabedir.

## Doğru əks-əlaqə dövrələrinin yaradılması və inkişafı

Təşkilatda SR-mühəndisin işinin vacib hissəsi — bu təşkilatın sistem, servis və məhsullarının etibarlılığını artırmağa yönəlmiş əks-əlaqə konturlarının yaradılması və inkişaf etdirilməsidir. Bu barədə mücərrəd fikirlərimi söyləməzdən əvvəl, yəqin, SR-mühəndislərin təşkilatında əks-əlaqə dövrəsini ümumi struktura necə daxil edə biləcəyi barədə bir neçə dəqiqə düşünməyə dəyər.

### Əks-əlaqə dövrəsi və məlumat

Təşkilat kontekstində əks-əlaqə dövrələri barədə düşünəndə, ilk növbədə soruşduğum sual — məlumat haradan gələcək. Məlumat — bu dövrələrin işini dəstəkləyəcək yanacaqdır. Bu kitabda etibarlılığı müzakirə edərkən dəfələrlə açıq mənbələri qeyd edirik — insidentlər/nasazlıqlar (insidentin nəticələrinin təhlili şəklində təqdim olunan) və monitorinq məlumatları. Daha az aydın mənbələr də var — müştəri dəstəyi sorğuları/kejsləri, CI/CD məlumatları (test yaratma/uğursuzluq tendensiyaları, deployment nəticələri), istehsala/tətbiqə hazırlıq təhlilinin nəticələri, icra olunmamış tapşırıqların statistikası, zəng baxışlarının məlumatları, işdən çıxan işçilərlə müsahibələr — bunlar sadəcə bir neçəsidir.

Planlaşdırarkən burada dayanıb qeyd olunan sahələrə fokuslanıb təşkilati uyğunluğa nail olmaqda böyük irəliləyiş etmək olardı. İlk baxışda əhəmiyyətsiz görünən nümunələr gətirim. Təşkilatında toplanan monitorinq məlumatları bütün işçilər üçün nə qədər əlçatandır? Əlçatanlıq dedikdə həm fiziki (başqa insanlar sistemə "daxil olub" məlumatları görə bilirmi?), həm də koqnitiv (insanlar giriş əldə edən kimi, bu sənədləşdirilib, dərin ixtisaslaşmış sahə biliyi olmayan işçilər üçün məlumat anlaşıqlıdırmı?) mənasını nəzərdə tuturam. Bu araşdırma xəttini bir sualda ümumiləşdirsək, o belə səslənə bilər: "Təşkilatınızda X-in etibarlılığı ilə bağlı sual versəm, cavab almaq mənə nə qədər çətin olardı?" Məlumat — yaratmağa çalışdığımız kəsişmənin əhəmiyyətli komponenti və elementidir.

### Əks-əlaqə dövrəsi və iterasiya

Təşkilatda əks-əlaqə dövrələri haqqında düşünərkən, məlumat sualından sonra bu sual gəlməlidir: "İterasiya nə qədər sürətli icra oluna bilər?" və ya (optimist ya pessimist olmağından asılı olaraq) "Nə işi ləngidir?" Həqiqətən dinamikası olmayan əks-əlaqə dövrəsi, ya da iterasiyaların baş vermədiyi sistem, proqnoz və hesabatlar üçün əladır (hadisələrin necə pis inkişaf edəcəyini bilirsən), amma bütün digər baxımlardan dəhşətlidir. Şeyi ağırlaşdırmaq istəmirəm, amma bu halda entropiya əks-əlaqə dövrəsini əks istiqamətdə işə salacaq.

Bunu nəzərə alaraq, SR-mühəndisləri iterasiyalara kömək üçün (onları sürətləndirmə və ümumilikdə) cəlb etmək olan/olmayan bütün yerləri müəyyənləşdirmək faydalıdır. Release inkişafı ilə bağlı fəaliyyət (CI/CD və deployment əməliyyatları daxil olmaqla) proqram təminatının iterasiyası üçün çox vacibdir; bu tamamilə aydındır. Rutinin aradan qaldırılması oxşar təsir göstərir. İnandırıcıyam ki, effektiv insidentə reaksiya və təhlil prosedurları təcrübə qazanmağa, sonra nasazlıqlardan öyrənmə prosesini sürətləndirməyə imkan verir, beləliklə iterasiyaları sürətləndirir. Bu istiqamətdə öyrənmək və təkmilləşdirmək üçün daha nadir seçim — layiq olduğu diqqəti almayan, amma iterasiyalara güclü təsir göstərən — servislərin deprekasiyası/istismardan çıxarılması və silinməsidir.

> **Əks-əlaqə dövrəsinin işinə mane olan antişablonlar.** Bir əvvəlki fəsildə SRE tətbiqinə mane olan antişablonlardan danışmışdıq. Orada bunu qeyd etməsəm də, antişablonları aşkarlamağın əsas üsullarından biri — burada müzakirə etdiyimiz məlumata/axına çıxışa ya da əks-əlaqə dövrəsinin iterasiyalarının icrasına mane olan metodları öyrənməkdir.

Məsələn, SRE sahəsi sorğu və rütbələr əsasında inkişaf edəndə, SR-mühəndis "yeni üçüncü səviyyə dəstək" sayılanda, bu SR-mühəndis şərti kiçik fil sümüyü qülləsində qalır — burada məlumatın əlçatanlığı və servis iterasiyaları ciddi məhdudlaşdırılıb (ən yaxşı halda). SR-mühəndis onlar haqqında məlumatlı olmaya bilər, bu isə müzakiramızın kontekstində əhəmiyyətli nəticələrə səbəb ola bilər, çünki bu işi ciddi ləngidə bilər.

### Əks-əlaqə dövrəsi və iterasiya planlaşdırması

Kiçik bir dönüş — və yuxarıda ifadə olunan iterasiyalarda işin ləngiməsi fikri tamam başqa istiqamət alır. Əvvəlki bölmədə əks-əlaqə dövrəsi yaratmaq üçün lazım olan vacib iterativ prosesləri ləngidən bir sıra sosiotexniki faktorları müzakirə etdik. Amma budur çaşdırıcı müşahidə: bu dövrəni pozmağın başqa yolu — onu əvvəlcə işə salmamaqdır.

Şübhə etmirəm ki, təşkilatında servis sistemləri və məhsulları üçün müəyyən planlaşdırma prosesi var. Ən çox ehtimal ki, bu planlar üçün yeni planlaşdırılan imkanların tam və ətraflı təsviri olan yol xəritəsi var. Kitabda müzakirə etdiyimiz etibarlılıq işi bu yol xəritəsinə daxil deyilsə və onu dəyişmək üçün asan müəyyənləşdirilə bilən proses yoxdursa, ciddi problemin var deməkdir.

Təşkilatda effektiv SRE tətbiqi yol xəritəsini idarə edən insanlarla açıq və işlək əlaqə kanalının olmasından asılı olacaq. Bu, etibarlılıq sahəsində iş aparmaq üçün çox vacibdir. Hər hansı başqa vəziyyət SRE tətbiqindən az fayda verəcək. Məsələn, əsas mühəndislik komandasından tamamilə müstəqil hərəkət edən, ya da onların işinə qoşulmağa çalışan işçilər (hər iki variant son dərəcə geniş yayılıb) çox məhdud nəticələr əldə edə bilər.

## Əks-əlaqə dövrəsini təşkilatda necə və harada tətbiq etmək

Bu fəslin əsas fikri — SR-mühəndislərin öz işinin effektivliyini təmin etmək üçün yaratmalı və inkişaf etdirməli olduğu əks-əlaqə dövrələrinin mövcudluğudur. Bu işlə şirkətdə məşğul olma imkanı böyük ölçüdə orada təşkilati uyğunluq səviyyəsini müəyyənləşdirir. Biz bu dövrələri əsasən təcrid olunmuş şəkildə, sanki artıq tam formalaşmış şəkildə ortaya çıxıblarmış kimi araşdırdıq və onları təşkilata tətbiq etmə mexanizmlərini müzakirə etmədik. Bölməni yekunlaşdıraraq, SRE tətbiqinin nisbətən gec mərhələsində diqqətə alınmağa başlanan, əks-əlaqə dövrələri əlavə etmək üçün tanıdığım bir imkandan bəhs etmək istəyirəm.

SR-mühəndislər məhsul yaratma mərhələsində belə təşkilatın etibarlılığına təsir etmək üçün böyük qabiliyyətə malikdir. Onlara ilkin arxitektura müzakirəsində iştirak etməyə icazə veriləndə, resurs təminatının ən yaxşı praktikalarını (nə təmin etməli, bunu necə etməli) təklif etmə imkanı olanda, sənədləşdirmə yaradılmasına konstruktiv kömək edə bildikdə, etibarlılığı təsdiqləyən metodları təbliğ edə bildikdə və s., təşkilat bundan yalnız qazanır. Spotify və digər şirkətlər "qızıl yol" terminini "şirkətlərində müxtəlif fikirlər nəzərə alınmaqla və dəstəklə nəyisə yaratma üsulu"nu təsvir etmək üçün istifadə edir. Beləliklə, bizim əvvəldən pozitiv əks-əlaqə dövrələrinin formalaşmasını asanlaşdıran şərait yaratmaq imkanımız var.

## Uğur əlamətləri

Fəsli yekunlaşdıraraq, düşündüm ki, bu sualı vermək faydalı olardı: "Bu işləyirmi, necə bilmək olar?" Yəni istənilən təşkilati uyğunluğa nail olursanmı? Əlamətlər siyahısına keçməzdən əvvəl, bəlkə səylərini müqayisə edə biləcəyin başqa təşkilatların praktika nümunələrini araşdırmaq istəyərsən. Ən yaxşı mənbəyim — SREcon konfransında müxtəlif sənaye və müxtəlif təşkilatlardan insanların kifayət qədər uzun çıxış siyahısıdır.

Praktik nümunələrin təhlili sənin işin deyilsə və daha kiçik məsələ lazımdırsa, verə biləcəyin bir neçə sadələşdirilmiş sual təklif edərdim:

- İnsanlar səni görməyə (ümumilikdə) sevinirmi?
- Qapıçı roluna görə irəli getməyi bacardınmı, ya da ümumiyyətlə bundan qaça bildinmi?
- Münasibətlər "itələmə"dən (vəziyyətə özün qoşulma) "daxil olma"ya (insanlar sənin iştirakını istəyir) dəyişdimi?
- SR-mühəndis komandası yol xəritəsi planlaşdırmasında məcburi iştirak edirmi?
- Reaktiv və proaktiv işin nisbəti yaxşı tərəfə dəyişdimi?
- Rutini əlavə etdiyindən çox aradan qaldırdığını iddia edə bilərsənmi?

Bu siyahını oxuyan SR-mühəndis (haqlı olaraq) qeyd edə bilər ki, bu ölçülə bilən məqsədlər dəstindən daha çox "əhval-ruhiyyə yoxlaması"dır. "Özünə iş" verməyin böyük tərəfdarı deyiləm, amma bu halda düşünürəm ki, sənin və komandan üçün bu sualları təşkilatının SLI/SLO-larına xas göstəricilərə və məqsədlərə çevirmək son dərəcə faydalı olacaq. SLI/SLO ilə bağlı bir çox digər məşğələ kimi, bunun da təşkilati uyğunluq və SRE tətbiqinə işıq salacağına əminəm.

---

Bu fəsildən çıxan əsas fikir sadədir: SRE-ni təşkilata inteqrasiya etmək tək bir "düzgün" model tapmaqdan çox, hansı modelin sənin təşkilatının strukturuna, mədəniyyətinə və hazırlıq səviyyəsinə uyğun gəldiyini anlamaqdır. Mərkəzləşdirilmiş, paylanmış, yoxsa hibrid — heç biri obyektiv olaraq "ən yaxşısı" deyil. Amma ölçülə bilən əks-əlaqə dövrələri olmadan, hansı modeli seçsən də, uğuru izləmək mümkün olmayacaq.

Sənin təşkilatında SRE hansı modellə işləyir? Uğur əlamətlərindən neçəsi tanış gəldi?
