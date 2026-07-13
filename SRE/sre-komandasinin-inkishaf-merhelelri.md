# SR-mühəndis komandan neçə mərhələdən keçəcək — və niyə bu, sənin əlində deyil

Yeni SRE komandasının menecerləri ilə danışanda görürəm ki, onları ən çox narahat edən sual budur: komanda vaxtla necə dəyişəcək? Hazırda nə etdiklərini, şirkətin qalan hissəsi ilə necə əlaqəli olduqlarını yaxşı bilirlər — amma gələcək o qədər də aydın deyil.

Rastlaşdığım ən yaxşı konseptual sxem — LinkedIn-in keçmiş işçisi Benjamin Purqasonun *The Evolution of Site Reliability Engineering* adlı çıxışından gəlir (ilk dəfə SREcon Asia 2018-də təqdim olunub). Ben çoxsaylı komandaları idarə etmə təcrübəsinə əsaslanaraq, SR-mühəndis komandalarının vaxtla keçdiyi beş mərhələni müəyyənləşdirib — amma qeyd edim ki, ciddi xətti ardıcıllıqla yox. Bu yazıda müəllifin icazəsi ilə onun çıxışının əhəmiyyətli hissələrini öz şərhlərimlə birlikdə paylaşıram.

> Bu mərhələləri "yetkinlik modeli" adlandırmaqdan qaçıram, çünki insanlar bunu son nöqtəyə çatmaq lazım olan vəziyyət diaqramı kimi görməyə meyllidir. Reallıq xətti deyil.

## Mərhələ 1: Yanğınsöndürən

Bilirsən ki, insanlar adətən SR-mühəndislərə narahat edici etibarlılıq problemi yaranandan sonra müraciət edir. Bəlkə tez-tez sıradan çıxma baş verir, ya da eyni sahədə işləyən başqa şirkət mediada uzun downtime-a görə xatırlanıb. Bir az daha optimist ssenari: mühəndislik rəhbərləri aydın anlayır ki, inkişaf sürətini artırmaq mümkün deyil, əgər sıradan çıxma tezliyi də artmayacaqsa. Nə sürətin azalması, nə də etibarlılığın azalması şirkət üçün qəbulediləndir, ona görə rəhbərlik SR-mühəndislərə müraciət edir — onları xilas edəcəklərinə ümid edərək. Beləliklə SR-mühəndisin ilk rolunu alırıq: **yanğınsöndürən**.

Demək olar ki, hamı buradan başlayır. Etibarlılıqla bağlı problemlər var, SR-mühəndislər bu problemləri aradan qaldırmaq üzərində işləyir (ideal halda onlara səbəb olan faktorları da aradan qaldıraraq, ki, problemlər az təkrarlansın). Sonra yeni problemlər yaranır, SR-mühəndislər onları həll etməyə başlayır. Beləcə davam edir — yanğınların miqyası və vurduğu zərər ciddi təhlükə olmaqdan çıxana və başqa işlərlə məşğul olmaq üçün vaxt yaranana qədər.

Bu mərhələdə ən çox eşitdiyim sual: "Bu nə vaxt bitəcək?" Təəssüf ki, dəqiq bitmə müddəti yoxdur. Tolstoyun sözü ilə desək — "bütün xoşbəxt ailələr bir-birinə bənzəyir, hər bədbəxt ailə öz yolu ilə bədbəxtdir." Bunun səni nə qədər rahatlaşdıracağını bilmirəm, amma bu mərhələdən danışanda demək olar ki, hər kəs illərdən söz açır (ən yaxşı halda ildən bir az az, ən pis halda bir neçə il). Əminliklə demək olar ki, bu mərhələni keçmək üçün lazım olan vaxt həftələrlə ölçülmür.

Amma bu mərhələdə daha ürəkaçan bir fikir də var: Ben güman edir ki, yanğınlar arasındakı fəaliyyət həlledici əhəmiyyət daşıya bilər. Onun fikrini bəyənirəm — Dikersonun ierarxiyasının ilk iki səviyyəsinə (monitorinq/müşahidə və insidentə reaksiya) əlavə olaraq, bu, komandanın aşağıdakıları etməsi üçün yaxşı andır:

- Qayğısına qaldığı mürəkkəb sistemin bütün dəyişən komponentləri haqqında daha çox öyrənmək (üstünlüklər, çatışmazlıqlar, yük altında davranış və asılılıqlar — istəsən, sistem "kinesiologiyasını" öyrənmək).
- Benin "avtomatik yanğınsöndürmə sistemi" adlandırdığı şeyi yaratmaq. Terminin metaforikliyini kənara qoysaq, burada mənə çox xoş gələn fikir — sistemin öz problemlərinə reaksiya verib onların effektini yumşalda bilməsi üçün lazım olan mexanizmlərin yaradılmasına fokuslanmaqdır. Bəlkə autoscaling tətbiq edəcəksən, yükü paylaşdıracaqsan, yük balanslaşdırmasını/trafik idarəetməsini yaxşılaşdıracaqsan, ya da production-dakı problemlərə avtomatik reaksiya verib onları yumşaldan başqa alətlər yaradacaqsan. Bu da SR-mühəndislərin adətən məşğul olduğu rutini aradan qaldırmağın başqa bir yoludur.

## Mərhələ 2: Qapıçı

Ben öz çıxışında deyir ki, bu mərhələni keçmək olar (hətta arzuolunandır). Amma çoxlu insanla ünsiyyətim məni bir az fərqli nəticəyə gətirib. Təcrübəmə görə, insanlar bu mərhələni "tullansalar" belə, ən azı nəzarət sistemi haqqında və onu necə tətbiq edə biləcəkləri barədə çox düşünüblər.

Bu iddianın arxasında real hekayə dayanır. Görək özünü orada tanıyacaqsan.

Komandamızdan çoxlu etibarlılıq problemi ilə mübarizədə kömək istədilər. Bütün ili production-dakı yanğınları söndürməyə və etibarlılıq problemlərini həll etməyə sərf etdik. Nəhayət işlər yaxşılaşmağa başladı. İndi mövcud vəziyyəti qorumaq üçün nə etməliyik?

Ən təbii cavab: "vestqotları nəzarətdə saxla" — yəni prosesə zərər verən qüvvələri production-dan uzaq tut. Təkcə qüvvələri yox, bu dağıdıcı dəyişikliklərin mənbəyi və ya daşıyıcısı ola biləcək insanları da uzaq tut. Sərhədi nəzarətdə saxla.

Bu cavab, sistemin etibarlılığını qorumaqla tapşırılan, "gəmini az əvvəl təmir edib" SR-mühəndis nöqteyi-nəzərindən məntiqlidir. Amma təşkilat nöqteyi-nəzərindən, bütün sosiotexniki sistemlər nöqteyi-nəzərindən bu böyük problemdir: qapıçı kimi davranmağa başlayan SR-mühəndislər adətən başqa insanların həyatını daha da narahatedici edir. Bu, dost qazanmağın ən yaxşı yolu deyil və işyerində xoşməramlı, məhsuldar atmosfera yaratmağa kömək etmir. Qapıçını təsəvvür edəndə mənim gözümdə hava limanındakı gömrük məmuru canlanır.

Sərhəd qoruyan gömrük məmuru obrazı sənə də uğursuz görünürsə — deməli problemi tapmısan. SR-mühəndis komandası dəyişiklikləri nəzarət edən hakimlərə ya da güc strukturlarına çevriləndə, uzunmüddətli perspektivdə nə sənə, nə də təşkilata fayda verməyəcək vəziyyət yaranır. Bu, komandada narazılıq yarada, əməkdaşlığa mane ola və məhsuldarlığı poza bilər.

Qapıçı rolunu (uzunmüddətli perspektivdə əl ilə və/ya işi ləngidərək) icra etmək — təşkilatda SRE sahəsinin vaxtla mövcud olmaqdan çıxmasına nail olmağın əla üsuludur. Üstəlik, bu yanaşma təkcə işləmir, həm də miqyaslanmır. İnsanlar çətinlikləri dolaşacaq — hətta çətinlik yaxşı niyyətli, production-da yenidən yanğın çıxmamasına çalışan SR-mühəndis komandasının mövcudluğu olsa belə. Bütün işçilər işini görmək üçün SRE komandasından keçməli olanda, çox güman ki, qapıçı roluna kifayət qədər insan işə götürə bilməyəcəksən.

> **Bütün qapıçılar zərərli deyil (hələ ki).** Bütün qapıçıların (qısamüddətli nəzarətçilər daxil olmaqla) mütləq zərərli olduğu təəssüratı yaranmasın istəyirəm. Bəzən bu hərəkətlər doğrudur — resurs məhdudiyyəti ya da müqavilə/normativ tələblərə riayət şərti ilə. Həlledici faktor — vəziyyəti dövri olaraq yenidən qiymətləndirməyə hazır olmaq, onu yaxşılaşdırmaq, ya da heç olmasa daha az ağır etmək mümkün olub-olmadığını müəyyənləşdirmək üçün. Amma nəzarət SR-mühəndislərinin məşğul olduğu yeganə şeydirsə — bu, çox narahatedici siqnaldır.

Bu kitab sənə gec çatıbsa və artıq qapıçı mərhələsində möhkəm ilişmisənsə, nə etməli? Bu mərhələni dəfələrlə tənqid etdim, ona görə səni belə qaranlıq yerdə atmaq düz olmazdı. Eşitdiyim ən yaxşı çıxış yolu tövsiyəsi yenə Bendən gəlir. O, insanlarla yox, problemlə vuruşmağı təklif edir.

Şirkətdəki digər işçilərlə birgə production ətrafında divar yaranmasına səbəb olan problemləri aşkarlaya bilsən və sonra bu problemləri aşkarlamaq üçün aydın, obyektiv üsullar tapa bilsənsə — qapı gözətçisi vəzifəsindən qurtulmaq üçün kod yaza bilərsən. Məsələn, son üç sıradan çıxmanın səbəbi proqramın yaddaş sahələrini müntəzəm buraxmaması idisə və hamı razıdırsa ki, production-da işə düşəcək hər bir binary bu problemə görə yoxlanılmalıdır — kompüter bunu deployment bitməzdən əvvəl özü yoxlasın. Kimsə bu problemi olan yoxlanılmamış binary ilə gəlib production-da işə salmağı xahiş edərsə, kod insana faylın deploy olunmasına icazə verilməzdən əvvəl nə etməli olduğunu yumşaq şəkildə bildirə bilər.

Hamı qayda/təlimat/siyasətlə razılaşır, kompüter (bəlkə SR-mühəndisin yazdığı kodun köməyilə) qaydaların davamlı icrasını təmin edir, SR-mühəndis isə rahatca başqa işlərlə məşğul ola bilir. Başqa sözlə, bunu belə ifadə etmək olar: "Budur, X şərtinə riayət etməklə lazım olanı asanlıqla etməyə imkan verən hərəkət" — burda X təşkilat üçün əhəmiyyətli konkret şərt ya da standartdır.

SR-mühəndislər hansı başqa işlər üçün azad olur? Növbəti mərhələyə keçib görək.

## Mərhələ 3: Müdafiəçi

Bilirsən ki, SRE öz təbiətinə görə yorulmaz əməkdaşlığı nəzərdə tutur. Bu, əməkdaşlığın sadəcə özbaşına yaranması yox, məqsədyönlü şəkildə baş verə biləcəyi ilk mərhələdir. Yanğınsöndürən mərhələsində zərurətdən əməkdaşlıq edirsən — yanğını söndürərkən ekspert həmkarlarla məsləhətləşərək. Qapıçı mərhələsindən keçmisənsə, həmkarlarınla münasibətin əməkdaşlıqdan çox mübarizəyə bənzəyə bilər. Belədirsə, münasibətləri düzəltmək və SRE sahəsinin qavranılmasını yaxşılaşdırmaq üçün vaxt və güc sərf etmək lazım gələcək.

Daha sıx əməkdaşlığa keçmək üçün növbəti mərhələdə **müdafiəçi** rolunu üzərinə götürmək lazımdır — təşkilatda etibarlılığı təbliğ etmək. Komandanla birlikdə məqsədləri aydın formalaşdırmağa başla, onları həyata keçir və etibarlılığı saxlamaq üçün sistemlər yarat (əvvəl qeyd etdiyim monitorinq kimi standart öhdəliklərə əlavə olaraq).

Praktikada müdafiə nə deməkdir? Bu mərhələdə SR-mühəndislər proqram təminatının həyat dövrünün bütün mərhələlərində etibarlılıqla məşğul olmağa başlayır — təkcə mövcud sistemlərdə yanğın söndürərkən yox. Onlar dizayn və arxitektura müzakirələrində iştirak etmək üçün ideal namizəddir. Bu zaman prosesin erkən mərhələlərində təhlükəsizlik nümayəndələrinin də müzakirədə iştirak etməsi arzuolunandır.

Bəlkə də sistemlərin deploy olunmasından əvvəl production-a hazırlıq yoxlamasına rəhbərlik etməyə kömək edirlər. Developer həmkarlarının fəaliyyətini diqqətlə izləyirlər ki, yeni funksiyalar, buraxılışlar və s. üçün müvafiq dəstəyi deploy-dan əvvəl planlaşdıra bilsinlər (dəyişiklik və ya hadisələr barədə ilk dəfə sıradan çıxma zamanı öyrənmək əvəzinə).

Məhz bu mərhələdə SR-mühəndislər başqa işçilərə servis yaratmaq, tətbiq etmək və idarə etməkdə kömək edən daha geniş özünəxidmət imkanları verən sistemlər/alətlər/proseslər yaradır (Ben bunu "məsuliyyəti artıran sistemlərin yaradılması" adlandırır). Xatırla ki, qapıçı mərhələsindən çıxış yolu daha aktiv əməkdaşlığa və nəzarət/siyasətə riayət prosesinin avtomatlaşdırılmasına imkan verən sistemlərin yaradılması idi. Bu, körpünün digər ucu və onun apardığı yerdir. İdeal halda bu mərhələdə production müdafiəsi siyasəti SR-mühəndislər və developer-lər tərəfindən birgə hazırlanır, çünki hamı birlikdə arzu olunan production mühiti yaratmaq üzərində işləyir.

Bu, daha tam partnyorluğa doğru addıma bənzəyirmi? Ümid edirəm ki, bəli — çünki bu, növbəti mərhələdir.

## Mərhələ 4: Tərəfdaş

Bu ana qədər hara getdiyimizi artıq bilirik, bu isə doğru istiqamətdə növbəti addımdır.

Əvvəlki mərhələdə SR-mühəndisi developer həmkarlarının fəaliyyətinə diqqətlə fikir verməyə vadar etdik ki, adekvat reaksiya verə bilsin. Daha yaxşılaşdırılmış variant — iki komandanın yol xəritəsini birlikdə, tərəfdaş kimi planlaşdırıb tərtib etdiyi vəziyyətdir.

Bu mərhələdə SR-mühəndislər hamının istifadə etdiyi tikinti bloklarının komponentlərinə çevrilə bilən sistemlər/alətlər/proseslər yaratmağa davam edir. Məsələn, SR-mühəndislər bütün layihələrə tətbiq olunan monitorinq kitabxanalarına cavabdeh ola və onları inkişaf etdirə bilər, ya da təşkilatda qəbul edilmiş standart RPC mexanizminə görə məsuliyyət daşıya bilər. Düşünməyi xoşlayıram ki, SR-mühəndislər ümumi "etibarlılıq pillələri dəsti", ya da "etibarlılıq platforması" yaratmaq və inkişaf etdirməkdə məsuliyyət daşımağa başlayır.

Benin çıxışındakı ən sevdiyim terminlərdən biri o vaxt ortaya çıxır ki, o güman edir bu mərhələdə SR-mühəndislər "intellektual risk ilhamlandıran" alətlər də yarada bilər. Bu fikri bəyənirsənsə, *Seeking SRE* kitabının kontekst və nəzarətin qarşılaşdırılmasına həsr olunmuş 1-ci fəslini oxumağa dəyər — orada deyilir ki, bütün işçilər ağıllı qərar verə bilsin (nəzarət mexanizmlərinə vaxt sərf etmək əvəzinə) deyə, kifayət qədər kontekst (dashboard-lar, qiymətləndirmə cədvəlləri və s.) təmin etmək lazımdır.

Nəhayət, məhz tərəfdaşlıq mərhələsində SR-mühəndislər və developer-lərin növbətçilik (on-call) öhdəliklərini bölüşməli olduğu fikri həqiqətən aktual olur. Tərəfdaşlıq mərhələsində bu təcrübə hər iki şöbə tərəfindən qarşılanır — SR-mühəndislərin arzuladığı bir növ "cəza" kimi yox. (Artıq "developer gecə saat üçdə çağırılan kimi, production-da xətalar bitəcək" deyə düşünmürlər.)

## Mərhələ 5: Mühəndis

Bu son mərhələdə etibarlılığa əsaslanan SR-mühəndis prioritetləri ilə qalan mühəndislərin prioritetləri arasındakı fərq çox bulanıqlaşır. Hamı sistemin həyat dövrünün bütün mərhələlərində etibarlılığı təmin etmək üçün lazım olan tədbirlərdə iştirak edir — arxitektura yaratmaq, müxtəlif production-öncəsi yoxlamalar, növbətçilik, insident nəticələrinin təhlili, yol xəritəsi tərtibi, alət hazırlığı və s.

Kitabda əvvəl "ştatın çevrilməsi" təhlükəsi haqqında xəbərdarlıqları nəzərə alaraq — SR-mühəndislər funksiya tətbiq edən mühəndislərə çevriləndə — vacib nəticə çıxarmalıyam: məsələ o deyil ki, SR-mühəndislər gündəlik işində digər mühəndislərdən fərqlənməz olub və bütün mühəndislər birdən əvəzlənə bilər olub. SR-mühəndislər sistemin ayrı komponentlərinə görə funksiya yaradan şöbələrdən daha çox işləməyə və əsas məsuliyyət daşımağa davam edir. Onlar digər işçilərdən fərqli olaraq etibarlılığa diqqətlə fikir verməyə davam edir. Əslində baş verən — yüksək sıxlıq və əvvəllər görülməmiş əməkdaşlıq səviyyəsinə nail olunmasıdır.

Bu mərhələdə özündən soruşa biləcəyin vacib sual: "Bu mərhələ sadəcə boş xəyaldırmı — real dünyada belə şey olurmu?" Təcrübəmə görə, belə şey real dünyada baş verir (nadir hallarda), amma müntəzəm yox. Bu mərhələnin əsasında stimullların qurulması və xüsusi təşkilati struktur dayanır. Hər ikisini adi dəyişikliklər — reorganizasiya, büdcə yenidən bölgüsü kimi — asanlıqla poza bilər.

DevOps icmasında funksiya üzərində iş və istismarın əks stimullar səbəbindən tez-tez fərqli prioritet aldığı barədə çox yazılır. Analoji şəkildə, həm etibarlılıq dizaynı (SRE), həm də etibarlılıqla bağlı olmayan sahədə (funksiya inkişafı) qərar qəbul etməyə səlahiyyəti olan kiməsə çatmaq üçün təşkilat strukturunda nə qədər uzun yol getmək lazımdırsa, təşkilata lazım olan fəaliyyət ardıcıllığının xas olma ehtimalı bir o qədər azdır. Stimullar da, struktur da tamamilə əlaqəsiz səbəblərdən dəyişə bilər — bu isə bu mərhələ üçün lazım olan sıxlıq və əməkdaşlığa mənfi təsir göstərir.

Bunları bu mərhələyə çatmağa can atmağını söndürmək üçün yox, sadəcə xəbərdar etmək üçün deyirəm ki, bu mərhələ bəzən artıq çatılmış kimi görünə bilər, bəzən əlçatmaz.

## Xəbərdarlıqlar icraçısı

Əvvəlki fəsillərin bəziləri kimi, bu da xəbərdarlıqlarla bitir.

Birincisi, vacibdir ki, bu mərhələlərə DEFCON səviyyələri kimi, sən ya da komandan/təşkilatın keçdiyi homojen vəziyyətlər dəsti kimi baxma. Böyük təşkilatda bəzi SR-mühəndis komandaları yanğınsöndürən, digərləri isə müdafiəçi ola bilər — tamamilə mümkündür.

Əslində, əminliklə demirəm ki, vahidlik həqiqətən məqsəd olmalıdır. Etibarlılıq üçün "uyğun səviyyə" kateqoriyamız olduğu kimi, SRE-komandasının inkişafı üçün də, təşkilatın unikal vəziyyətindən asılı "uyğun səviyyə" kateqoriyası lazım ola bilər. Başqa sözlə, "Mərhələ 5: Mühəndis" son hədəf kimi hər SRE komandasına uyğun olmaya bilər.

İkincisi, Elizabet Kübler-Ross haqqında eşitdiyim hekayə yadıma düşür. Ən məşhur kitabı *On Death & Dying*-də ("Ölüm və Ölüm haqqında") "qəmin beş mərhələsi" modelini təqdim etdi — bu, böyük populyarlıq qazandı. Bu modellə bağlı bir yanlış anlama — hər insanın bütün mərhələlərdən müəyyən xətti ardıcıllıqla keçdiyi təsəvvürü idi.

Görünür, həyatının son günlərində Elizabet bu təsəvvürlə mübarizəyə xeyli vaxt və güc sərf edib. O, modeli nəşr edərkən ilkin niyyətinin belə olmadığını çox aydın izah edirdi.

Bu fəsildə təsvir olunan SR-mühəndis təkamülünü Kübler-Ross modeli ilə müqayisə etmək bir az iddialıdır, amma ortaq bir cəhətləri var — xəttilik olmaması. Bəlkə sən ya da komandan bu fəsildə sadalanan sırayla mərhələlərdən keçəcəksiniz, bəlkə də sənin halında ardıcıllıq fərqli olacaq. Ona görə bunları "SRE yetkinlik modeli" adlandırmamağa çalışıram — insanlar bunları son nöqtəyə çatmaq məqsədi olan vəziyyət diaqramı kimi görməyə meyllidir. Tamamilə mümkündür ki, komandan tərəfdaşlıq mərhələsindədir, sən isə hələ də gecə soyuq tərdə oyanıb öhdəliklərinin bir hissəsinin adi qapıçı işi olduğunu anlayırsan. Ya da yeni mərhələyə çatırsan, sonra tərəfdaşlıq münasibətləri dəyişdikcə geri sürüşürsən. Deməyi sevməsəm də — küncdə həmişə yanğınsöndürən tələb edən yanğınlar gözləyir...

Keçə biləcəyin, ya da keçməyəcəyin müxtəlif mərhələlərin mövcudluğu fikrini qəbul edə bilsən, bu sənə yaxşı xidmət edəcək.

---

Bu fəslin əsas mesajı sadədir: SRE komandan yanğınsöndürəndən mühəndisə xətti yol boyu irəliləməyəcək. Bəzi komandalar qapıçı mərhələsində ilişib qalır, bəziləri heç vaxt tam "mühəndis" mərhələsinə çatmır — və bu, uğursuzluq demək deyil, sadəcə sənin təşkilatının reallığıdır. Vacib olan — hansı mərhələdə olduğunu tanımaq, qapıçı rolunun tələsinə düşməmək, mərhələ 5-i yeganə qəbuledilən son nöqtə saymamaq.

Sənin komandan hazırda hansı mərhələdədir? Geriyə sürüşmə hiss etmisənmi?
