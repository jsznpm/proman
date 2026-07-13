# SR-mühəndisinin bir günü necə keçir?

İnsanlar SRE-nin nə olduğunu az-çox anlayır, amma sonra qaçılmaz sual gəlir: "Bəs sən konkret nə edirsən?" Bu yazıda sənə yarı-uydurma qəhrəman haqqında dramatik hekayə danışmayacam — sualı düz cavablandırmağa çalışacam.

Amma əvvəlcə yaxın mövzuya toxunum: SR-mühəndisi üçün "orta statistik" iş günü deyilən şey varmı? Mən buna şübhə ilə yanaşıram. Axşam evə gəlib "vay, bu tam orta statistik gün idi" deyə düşündüyüm bir gün xatırlamıram. Vəzifə öhdəlikləri təşkilatdan təşkilata çox fərqlənir. Bunu bir kənara qoysaq belə, ən gərgin günlə ən sakit günü ortalayıb mənalı bir "orta gün" almaq mümkün deyil.

## Gün rejimləri

Mifik "kombinə edilmiş gün" uydurmaq yerinə, hər gün üzə çıxan bir neçə iş rejiminə baxaq. Bu rejimlər bir-birini istisna etmir — eyni anda bir neçəsində ola bilərsən, ya da aralarında sürətlə keçid edə bilərsən. İstəsən, onları "hər anda geydiyin papaqlar" kimi düşün.

### İnsident/qəza rejimi

Bəzi günlər iş vaxtının böyük hissəsini, bəzən hamısını insidentlə məşğul olaraq keçirirsən. Bu günlər sərbəst işlədiyin günlərdən kəskin fərqlənir — qorxu, narahatlıq, bəzən qəzəb, düzəldikdən sonra sevinc yaxud rahatlıq qarışığı, üstəlik "döyüş ya qaç" reaksiyası müşayiət edir. Emosional reaksiyanın dərinliyi adətən qəzanın ciddiliyi, insident-cavab prosesinin yetkinliyi və yanında işləyən insanlarla bağlıdır.

Növbətçi olduğun müddətdə bu, əsas rejimin olacaq. Bu rejimdə demək olar ki, bütün hərəkətlərin reaktivdir — planladığın iş yox, baş vermiş qəza nə üzərində işləyəcəyini diktə edir.

> Bəzən qəza günlərlə davam edir, "gün" anlayışı 24 saatı aşır. Belə vaxtlarda özünə və komanda yoldaşlarına qayğı göstərməyi unutma.

### İnsidentdən sonra öyrənmə rejimi

Bu rejimi məhz buradan sonra qeyd etməyimin səbəbi var — kiçik bərpa dövründən sonra (bax: yazının sonundakı "bərpa və özünə qayğı" bölməsi) qəzanı geriyə baxıb təhlil etmək, dərs çıxarmaq üçün lazım olan düşüncə tərzinə keçmək imkanı yaranır. Bu, araşdırma dövrüdür — qəza zamanı tam olaraq nə baş verdiyini geriyə dönüb, təfərrüatlı şəkildə üzə çıxarmağa çalışırsan. Öhdəliyin: nəticələri elə sənədləşdirmək ki, başqaları qəzanı bilavasitə yaşamadan nə baş verdiyini anlaya bilsin. Araşdırma adətən texniki sorğuların (monitorinq sistemlərində məlumat axtarışı) və insanlarla söhbətin (kolleqalarla — kim nə vaxt nə bilirdi, nəyi anladı) qarışığından ibarətdir. Bəzən insident nəticələri barədə öyrədici toplantıda təqdimat da edə bilərsən.

**Bu rejim niyə motivasiya verə bilər?**

Ola bilsin təşkilatında insident-sonrası təhlil prosesi az inkişaf edib, hətta səthi ola bilər. Bəzən bu prosesin keyfiyyətini şəxsən yüksəldə bilərsən; bəzən isə vəziyyəti yaxşılaşdıracaq mövqedə olmursan. İkinci variant sənin halına uyğundursa, iş axtarışına başla, CV-ni yenilə. Bu, çox radikal görünürsə, sadəcə prosesdə nəyin yaxşılaşa biləcəyini görmək belə çox vaxt müsbət effekt verir.

### İnkişaf/öyrənmə rejimi

Bəli, bəzən oturub nəsə yaradırıq. Bəzən vaxtı öyrənməyə sərf edirik. Bir sıra imkanlar var, məsələn:

- SRE tapşırıqlarını yerinə yetirmək və ya istifadəçilərə özünəxidmət interfeysi vermək üçün tətbiq/servis kodu yazmaq;
- yeni mühit yaxud infrastruktur təmin etmək (çox vaxt "infrastructure as code" alətləri ilə, məs. Terraform);
- monitorinq/müşahidə/xəbərdarlıq sistemini yaxşılaşdırmaq;
- bəzi servisləri ləğv etmək;
- servisin işində və ya istifadəsində rutin əməliyyatları aradan qaldırmaq;
- release prosesinin ayrı-ayrı mərhələlərini yaxşılaşdırmaq (bəlkə insident zamanı öyrəndiyin şeyi aşkar edən testlər yazmaq);
- keçən həftə sıradan çıxmış servis hissəsinin kodunu düzəltmək;
- xaos-mühəndisliyi eksperimentləri aparmaq;
- sənədləşdirmə yazmaq;
- gələcəkdə lazım olacağını düşündüyün yeni texnologiyanı öyrənmək.

Bu, ağlıma gələn qismən siyahıdır, başlanğıc nöqtəsidir. Sənin şəxsi siyahın buna bənzəyə bilər, ya da təşkilatına və vəzifənə görə tamam fərqli ola bilər.

Siyahıya baxanda görürəm ki, ümumilikdə maraqlı işlərdən danışmışam. Açığını deyim — iş həmişə asan və xoş deyil. Bəzən Avgi tövləsini təmizləməyə bənzər cansıxıcı, ağır iş görməli olacaqsan. Məhz burda SR-mühəndislərinin "rutindən qurtulmaq" istəyi yerinə düşür. Ümid edirəm bunu öz siyahına əlavə edə biləcəksən.

### Arxitektura rejimi

Bu rejimin daha tez-tez baş verməsini istəyirəm — hazırki vəzifəndə bu, çox arzuolunandırsa, səni tam anlayıram. İdeal halda SR-mühəndisləri layihələndirmə mərhələsində öz bilik və təcrübəsini işə sala bilir, təkcə kimsə layihəni produksiyaya göndərmək istəyəndə yaxud artıq produksiyada qəza baş verəndə yox. Bu zaman SR-mühəndisi layihələndirmə və planlaşdırma iclaslarında iştirak edir, "etibarlılığın" nümayəndəsi və müdafiəçisi kimi çıxış edir. İdeal olaraq bu, elə təhlükəsizlik mütəxəssisini prosesin erkən mərhələsində söhbətə dəvət etməyə bənzəyir — kimsə yaradılan sistemin təhlükəsizliyinə göz qoysun deyə.

SRE-nin yeni və tanınmamış sahə olduğu, yaxud bu mütəxəssislərin sadəcə "zəngə cavab verən adamlar" sayıldığı təşkilatlarda erkən mərhələ iştiraki daha az rast gəlinir, ona görə bunun daha tez-tez baş verməsini istəyirəm. Belə vəziyyətdəsənsə, bəzən insident-sonrası təhlildən ustalıqla istifadə edərək müzakirə masasında yer qazana bilərsən. Xəbərdarlıq: burda ehtiyatlı və siyasi cəhətdən düzgün davranmaq son dərəcə vacibdir. Heç kim "əgər layihələndirmədə SR-mühəndisi iştirak etsəydi, bu qəza heç vaxt baş verməzdi" cümləsini eşitmək istəməz (nə qədər buna inansan da).

> SRE və etibarlılığın sirri budur: real dünyada problemlər həmişə texniki xarakter daşımır. Bəzən sırf siyasidir. Nə qədər xoşuna gəlməsə də, texniki bacarıqlarla yanaşı siyasi bacarıqlarını da inkişaf etdirmək öz xeyrinədir. Siyasi problemlərin siyasi həlli var — onları texniki həllərlə düzəltmək cəhdi demək olar ki, heç vaxt işləmir. Fərqi anla və ona uyğun hərəkət et.

Belə mövqedəsənsə ki, yuxarıdakı cümlə səni dərindən köks ötürtdürür, çünki erkən mərhələyə çıxış son dərəcə uzaq perspektiv kimi görünür — bütün mümkün yollarla irəliləməyə davam etməyə çağırıram. Arxitektura rejimi etibarlılığı artırmaq üçün çox böyük potensial verir. Real dünyada üzə çıxmazdan əvvəl tək nöqtə uğursuzluqlarını (single points of failure, SPOF) aşkar etmək kimi baza işlərdən başqa, daha çox şey etmək olar. Məsələn, ən yaxşı təcrübələr, standart infrastruktur tikinti blokları, keyfiyyətli monitorinq və s. yaratmaq istəyirsənsə, bunları inkişaf prosesinə daxil etmək üçün ən yaxşı an məhz budur.

### İdarəetmə rejimi

Bu rejimi bir səbəbə görə saxladım — etiraf etmək üçün ki, SR-mühəndisləri həmişə icraçı olmur. Bəzən insanları idarə edirik, ya da tex-lid kimi daha böyük idarəetmə funksiyaları yerinə yetiririk. LISA konfransında 1995-ci ildə dərc olunmuş, mən idarəetməyə yeni başlayanda oxuduğum bir məqalə var.

Gretchen Phillips "Something to Nothing (and Back)" məqaləsində belə deyir:

> Keçən payız qızlarımı özümlə ofisə apardım, günün sonunda evə qayıdanda dedilər: "Ana, sən bütün gün danışmaqdan başqa heç nə etmirsən. Sənin işin nədir?" Onlara iclaslara getdiyimi, insanlarla danışdığımı, elektron məktubları oxuduğumu (bəzən cavab da verdiyimi) izah etməyə çalışdım. Amma bunu deyəndən sonra hiss etdim ki, özüm də artıq heç nə "etmirəm" kimi düşünürəm... gündəlik gördüyüm işin həcmindən qətiyyən razı deyildim; təəssüf ki, menecer olmuşdum.

> İstədiyimdən çox vaxtımı sıxıntılı halda keçirdikdən sonra nəhayət anladım ki, sadəcə nəsə "etmirəm" — iclaslara gedir, insanlarla danışır, məktub oxuyuram (bəzən cavab da verirəm) — amma gördüyüm iş çox vacibdir. Bu anlayış xəstəlikdən sonra işə qayıdanda gəldi (evdən işləyə bilmirdim) — masamda və poçt qutumda diqqət tələb edən nəhəng sənəd yığını tapdım. Texniki mütəxəssislərimdən (sistem adminlərindən) heç biri onlarla məşğul olmurdu. Əslində bir neçə layihə mənim onları növbəti mərhələyə keçirməyimi gözləyirdi.

Deməli, SRE bölməsinin rəhbərinin "Sənin günün necə keçir?" sualına cavabı "İclaslara gedirəm" ola bilər — bu, heç də pis deyil.

### Planlaşdırma rejimi

SR-mühəndisi kimi hipotetik gününün bir hissəsini planlaşdırmaya sərf edəcəksən. Ediləcək çox şey var, o cümlədən:

- arxitektura rejimi yaxud inkişaf/öyrənmə rejimi ilə bağlı icra planları hazırlamaq;
- tutum planlaşdırması (capacity planning) aparmaq;
- özünütəyinetmə üzərində iş görmək (komanda kimi nə etməliyik, bu təşkilatda SRE-nin məqsədi nədir, onunla hara doğru getmək istəyirik və s.).

Bunlar standart məqamlardır, ona görə daha maraqlı — əməkdaşlıq rejiminə keçirəm.

### Əməkdaşlıq rejimi

Kitab boyu dəfələrlə deyirəm ki, SR-mühəndisləri "yorulmadan əməkdaşlıq edir" — amma bu real həyatda necə görünür? Əməkdaşlıq çoxşaxəlidir, ona görə bu sualın çox variantı var. Mənə göstərici görünən üç nümunə gətirim (arxitektura rejimindəki nümunələrə əlavə olaraq).

Birincisi, SLI/SLO təyin etmə və tətbiq praktikası (və onları dəstəkləyən monitorinq/müşahidə işi) demək olar ki, həmişə əməkdaşlıq tələb edir. Sistemi kifayət qədər yaxşı anlamaq, onun etibarlılığı barədə mühakimə yürütə bilmək və SLI/SLO yaratmaq üçün kolleqalarla — developerlər, məhsul/layihə menecerləri, maraqlı tərəflər, biznes insanları — işləmək əməkdaşlıqla sıx bağlıdır.

> İstisna nadir haldır: bəzən SLI/SLO yalnız sənin (bəlkə komandanla birgə) sahib olduğun və istifadə etdiyin daxili servislər üçün yaradılır — belə halda başqası ilə danışmağa ehtiyac qalmır. Amma bu, nadir və maraqsız haldır.

İkincisi, müxtəlif təşkilatlarda müxtəlif adlarla çağırılan təhlil prosesi. "Produksiyaya hazırlıq təhlili", "tətbiqə hazırlıq təhlili", "buraxılışdan əvvəl təhlil" kimi adlar eşitmişəm. Prosesin servis həyat dövründə harada baş verməsi və nəyi əhatə etməsində fərqlər olsa da, əsas fikir eynidir: SR-mühəndisi yeni servisin yaxud onun yeni versiyasının produksiyaya çıxarılmasından əvvəlki prosesdə bir müddət iştirak edir — servisin produksiyada etibarlı işləməsi üçün nə lazım olduğunu və standarta nə qədər yaxın olduğunu müəyyən etmək üçün. Bu iş adətən yoxlama siyahısı (checklist) və ya formadan istifadəni nəzərdə tutur. SR-mühəndisi standart checklisti məhsul komandası ilə müzakirənin əsası kimi işlədir. Birlikdə planlanan servisin işini buraxılışdan əvvəl yoxlayırlar.

> Bu nümunəni təsadüfən "əməkdaşlıq" bölməsinə qoymamışam, "nəzarətçi rejimi" adlı mövcud olmayan bölməyə yox. Çox vacibdir ki, sən və bu təhlili birgə aparan kolleqalar bu işi mümkün qədər əməkdaşlıq kimi qəbul edəsiniz. Bu cür iş asanlıqla "dişimizi qıcayaraq dözdüyümüz tələb" kateqoriyasına düşür, işi görən SR-mühəndisləri isə nəzarətçi roluna keçir. Adətən proses yorucu, həddindən artıq dəqiqlik tələb edən sayılanda, yaxud produksiyada etibarlılığın dəyəri qeyri-bərabər bölünəndə belə olur. Sadəlövh sayıla bilərəm, amma ürəkdən inanıram ki, məhsul yaradan insanlar öz kodlarının produksiyada düz işləməsini həqiqətən istəyir — hətta konkret vəziyyətdə stimullar həmişə buna kömək etməsə də. Bu ortaq istəkdən istifadə et. SR-mühəndislərinin öhdəliyi — əməkdaşlığı gücləndirmək üçün anlayışla ünsiyyət qurmaq və hərəkət etməkdir.

Üçüncü nümunə kitabın başqa yerində gətirilir, amma təkrarlanmağa dəyər bir həqiqətə əsaslanır: SR-mühəndisləri servis və sistemlərin işini davam etdirmək üçün çalışır ki, başqa insanlar onlardan istifadə etsin. Əsas vəzifəmiz — müştərilərimizin (xarici yaxud daxili) gözləntilərinə daim uyğun gəlmək və bu gözləntiləri anlamaqdır. Deməli, hipotetik gününün bir hissəsini müştərilərlə əməkdaşlıqda keçirməlisən (keçirməlisən). Bu praktikada necə işləyir?

Bütün mümkün servis/məhsul ssenarilərini əhatə edən cavab vermək çətindir, ona görə əsaslara qayıdıb deyim: birinci növbədə müştərini dinləmək lazımdır. Bəs SR-mühəndisləri müştəriləri necə dinləyir? Sadə cavab: monitorinq işimiz vasitəsilə. Doğru sualları vermək üçün istifadə etsən, monitorinq güclü siqnal mənbəyi olur. Üstəlik, SLI/SLO-nun əsasında müştəri ilə davamlı əməkdaşlıq durur.

### Bərpa və özünə qayğı rejimi

Bu rejimi siyahının sonuna qoydum, çünki digər bütün rejimlərə müşayiət etməlidir — az əhəmiyyətli olduğuna görə yox. SRE çox maraqlı, potensial olaraq hər şeyi udan bir işdir. Həyəcanlandırıcı tapşırıqlar məsuliyyət və özünəhörmət hissi ilə birləşir, bu da asanlıqla həddindən artıq gərginləşməyə səbəb olur. Bunun üstünə qəhrəman kultu, "yanğın zonasına paraşütlə tullanma" yaxud "hər kəsi xilas etmək üçün binadan iplə düşmə" kimi cəsur hərəkətləri romantikləşdirmə mədəni ənənəsi əlavə olunanda, SR-mühəndisləri asanlıqla sağlam olmayan, dayanıqsız iş qrafikinə sürüşür. Bunu etmə.

Özünə (və başqalarına) qayğı göstər. Tükənmiş insanlar etibarlı sistem yarada bilmir, ya da onların yaradılmasında effektiv iştirak edə bilmir. Kimsə həftədə mütəmadi 60–75 saat işlədiyini eşidəndə (hətta qürurla desələr də) bunu artıq sevinməli yaxud müsbət qiymətləndirilməli bir şey saymıram. Əksinə, indi bunu düzəldilməli sistem xətası hesab edirəm.

Gördüyümüz iş bərpa və özünəqayğıya vaxt ayırmağı tələb edir. Rəhbər vəzifədəsənsə, əmin ol ki, əməkdaşların rahatlığı və bərpaya lazımi vaxt ayıra bilmələri şirkət mədəniyyətinin bir hissəsidir. Bu, sadəcə düzgün qərar olmaqla yanaşı, nəticədə sistemlərinin etibarlılığını da artıracaq.

## Tarazlıq

"SR-mühəndisləri çoxlu iş görür, bir rejimdən digərinə keçir" (bu doğrudur) deyib, rejimləri necə birləşdirib az-çox effektiv nəticə əldə etmək barədə demədən keçsəm, ədalətsizlik olar.

SR-mühəndislərinin gündəlik qarşılaşdığı bir sıra qütb-əks tapşırıqlar var. Bir neçə əkslik sadalayım:

- rutin iş və uzunmüddətli dəyəri olan iş;
- reaktiv rejimdə iş və proaktiv rejimdə iş (bəzən "cavab tədbirləri" ilə "layihə işi" qarşı-qarşıya qoyulur — yanğın söndürürsən, yoxsa servisi etibarlı etmək üçün kodunu düzəldirsən?);
- fasilə və axın (flow) vəziyyəti;
- tək işləmə və əməkdaşlıq;
- böhran və qeyri-kritik vəziyyət.

İşin xüsusiyyətinə görə bu siyahını davam etdirmək asandır, amma dayanıb bu kontekstdə tarazlıq müzakirəsini çətinləşdirən ekzistensial həqiqətlərdən bəhs etmək istəyirəm. Kaş Pollyanna kimi sadəcə "hər şeydə tarazlığa can at" deyib mövzunu bağlaya biləydim. Amma bu qədər sadə deyil.

İnsanlar "hər SR-mühəndisi vaxtının ən azı 50%-ini mühəndislik işinə" yaxud "50%-ini layihə işinə" sərf etməli kimi ifadələri sitat gətirməyi çox sevir, amma adətən sitatın qalan hissəsini buraxırlar. Əslində sitat belə davam edir: "...bir neçə rüb yaxud il ərzində ortalama olaraq. Rutin işin həcmi kəskin dəyişə bilər, ona görə ayrı-ayrı komandalar üçün 50% hədəfi icra olunmaya bilər, bəzən bu hədəfin altına düşə bilər." Sitat konkret rutin haqqındadır, amma reaktiv və proaktiv iş barədə də oxşar fikirlər var.

Qeyd olunmalı əsas məqam: tarazlığa can atmaq əla fikirdir, amma çox vaxt bu istiqamətdə işi çətinləşdirən situasiya faktorları olur. Məsələn, dəfələrlə qarşılaşdığım bir faktor — "yeni" və "yetkin" servislərlə işin fərqidir. Yeni servislər demək olar həmişə daha "səs-küylü" olur, daha çox reaktiv iş tələb edir və aradan qaldırılmalı daha çox rutin əməliyyat gətirir. Bunu ona görə deyirəm ki, SR-mühəndisləri istədikləri işə vaxtının 50%-dən azını ayıra bildikləri üçün stress keçirə bilər — özlərinin günahı olmadan. Bəzən sadəcə məşğul olmalı yeni servisin yaranır. Bəzən səni problemli yetkin servisə kömək üçün çağırırlar — və çox güman ki, proaktiv işdən çox düzəliş işinə vaxt sərf edəcəksən. Mənim üçün bu situasiya faktorları havanın dəyişməsinə bənzəyir, sadəcə servislərə tətbiq olunur. Bəzən uzun müddət güclü yağış yağacağını bilirəm, ona görə mənəvi olaraq hazıram.

> Hər şey ideal halda öz yerinə düşər. Düşməsə, məhz burda tarazlığa can atmaq (yaxud işdən çıxıb başqa iş axtarmaq) devrəyə girir. Bəzən tarazlığın yoxluğu situasiyaya bağlıdır, amma bəzən daha ciddi səbəblərdən — təşkilatında yaxud vəzifən kontekstində sonu görünməyən problem və çatışmazlıqlardan qaynaqlanır.

Vəziyyəti gözəlləşdirmək istəmirəm. SRE sahəsində pis iş yerləri var. Belə yerdəsənsə və maddi baxımdan işdən çıxa bilərsənsə, bunu dəstəkləyirəm. SRE-də xoşbəxt olmağı haqq edirsən.

## Sona qədər

Ancaq fəsli qəmgin notla bitirməyək — yuxarıdakı tutqun təsvirləri bir az yenidən düşünək. SRE sahəsinin çox qiymətləndirdiyim bir üstünlüyü budur: bu mövzu ümumiyyətlə qaldırılır və dəqiq mövqe təklif olunur. Kitabın əvvəlində deyildiyi kimi, SRE sabit əməliyyat praktikası olmağa çalışır. Tarazlıq bunun mühüm hissəsidir. Ümid edirəm öz SRE praktikanda onu tapa biləcəksən.

Fəsli başladığımız yerə qayıdaq. Seçim haqqında bir şey demək istəyirəm. Bu yazıda SR-mühəndisinin iş günündə qarşılaşa biləcəyi şeylər haqqında təsəvvüründəki boşluqları doldurmağa çalışdım. Üstəlik, ola bilən (və mənə görə olmalı) keyfiyyətləri — məsələn, tarazlığı — vurğulamağa çalışdım. Təcrübəmə görə, bu keyfiyyətlər və müsbət təcrübə məqsədyönlü inkişaf etdirilmədən özü-özünə istədiyimiz qədər parlaq görünmür. Səni bu yolu seçməyə çağırıram.

Sən necə fikirləşirsən?
