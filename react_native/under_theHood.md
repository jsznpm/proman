# React Native "kapot altında" necə işləyir?

Əvvəlki fəsildə React Native-in nə olduğunu və istifadəçinin React Native UI ilə mobil brauzer arasında hiss etdiyi fərqi qısaca gördük. Bu dəfə daha dərinə enirik: React Native mobil cihazda necə işləyir, bu framework-lə işə başlamazdan əvvəl nə bilmək lazımdır. Həmçinin JavaScript-in native funksionallıqla necə əlaqələndiyinə və bunun hansı məhdudiyyətləri olduğuna baxacağıq.

Bu fəsildə aşağıdakıları öyrənəcəyik:

- React Native arxitekturası necə qurulub
- JavaScript və Native modullar nə fərqlənir
- React Native-in əsas component və API-ları

## Əvvəllər veb və mobil tətbiqlərin vəziyyəti necə idi?

React Native-in necə işlədiyini anlamazdan əvvəl, React arxitekturasının tarixinə və veb ilə native mobil tətbiqlər arasındakı fərqlərə qısaca baxaq.

Meta (o zamankı adı ilə Facebook) React-i 2013-cü ildə component yanaşması və virtual DOM-la işləyən monolit alət kimi buraxdı. Bu, brauzerin daxili proseslərini — JS-in parse olunması, DOM-un qurulması, layer-lərin idarəsi və render — düşünmədən veb tətbiq yazmaq imkanı verdi. Developer sadəcə state və props ilə interfeys qurur, CSS ilə stil verir, backend-dən data çəkir, local storage-da saxlayırdı.

React brauzerlə birlikdə az vaxtda performanslı tətbiq yazmağa imkan verdi. Bu deklarativ yanaşma sürətli inkişafı və yeni başlayanlar üçün aşağı giriş həddini təmin etdiyinə görə populyar oldu. Üstəlik, backend Node.js-də qurulubsa, bütün layihəni bir dildə saxlamaq asanlaşırdı.

Eyni vaxtda mobil tətbiq yazmaq daha mürəkkəb idi. Android və iOS üçün şirkətlər üç fərqli komanda saxlamalı idi:

- Veb developer HTML, CSS, JS və React bilməli idi.
- Android developer Java və ya Kotlin SDK təcrübəsinə malik olmalı idi.
- iOS developer Objective-C və ya Swift, həmçinin CocoaPods bilməli idi.

Prototipdən buraxılışa qədər hər addım fərqli bacarıq tələb edirdi. Cross-platform həllərdən əvvəl veb və mobil inkişaf belə görünürdü: eyni biznes məntiqi üç dəfə yazılırdı, komandalar arasında kod paylaşmağın alternativi yox idi, resurs paylaşımı da mümkün deyildi (Android developer iOS üçün kod yaza bilməzdi, əksinə də).

Bu problemlər test resurslarının artmasına (bug üçün daha çox yer), inkişaf sürətinin fərqli olmasına (mobil eyni funksiyanı daha uzun müddətdə çıxarırdı) səbəb oldu — nəticədə şirkətlər üçün böyük və bahalı problemə çevrildi. Bir çoxu tək kod bazası yazmaq və ya mövcud olanı bir neçə ekosistemdə istifadə etmək yollarını axtarmağa başladı. Ən sadə yol — veb tətbiqi brauzer vasitəsilə mobil üçün "wrap" etmək idi, amma bu, toxunma və gesture idarəetməsində məhdud idi (əvvəlki fəsildə gördüyümüz kimi).

Bu problemlərə cavab olaraq Meta cross-platform framework üzərində işə başladı və 2015-ci ildə React Native kitabxanasını buraxdı. Bununla React iki ayrı kitabxanaya bölündü: brauzerdə render üçün indi **ReactDOM** istifadə olunur.

React artıq yalnız component ağacını idarə edir. Bu yanaşma bütün render API-larını əhatə edir və platforma-spesifik metodların çoxunu bizdən gizlədir — biz sadəcə interfeys qurmağa fokuslana bilirik, render necə baş verəcəyi barədə düşünməyə ehtiyac qalmır.

> Ona görə də React tez-tez "renderer-agnostik" kitabxana adlandırılır. Veb üçün ReactDOM element yaradır və birbaşa brauzer DOM-una tətbiq edir; mobil üçün isə React Native interfeysi birbaşa telefon ekranına render edir.

Bəs React Native bütün brauzer API-sını necə əvəz edir və bizə tanış kodu mobil üzərində işlətməyə imkan verir?

## React Native-in cari arxitekturası

React Native kitabxanası native building block-lardan istifadə edərək React və JS ilə native tətbiq yaratmağa imkan verir. Məsələn, `<Image/>` component-i arxa planda iki fərqli native component-i təmsil edir: Android-də `ImageView`, iOS-da `UIImageView`. Bu, React Native-in iki ayrı layer-dən — JS thread və Native thread-dən — ibarət arxitekturası sayəsində mümkündür.

Növbəti bölmələrdə hər thread-i və onların bir-biri ilə necə əlaqələndiyini araşdıracağıq.

### JS thread

Brauzer JS-i V8, SpiderMonkey kimi JS engine-lər vasitəsilə icra etdiyi kimi, React Native də öz JS virtual machine-inə malikdir. Burada bizim JS kodumuz icra olunur, API çağırışları edilir, toxunma (touch) hadisələri emal olunur və s.

Əvvəlcə React Native yalnız Apple-ın JavaScriptCore virtual machine-ini dəstəkləyirdi. iOS-da bu VM built-in gəlir. Android-də isə JavaScriptCore React Native ilə birgə paketlənir — bu da tətbiqin ölçüsünü artırır. Nəticədə Android-də sadə "Hello World" React Native tətbiqi təxminən 3-4 MB yer tuturdu.

0.60 versiyasından React Native yeni **Hermes** virtual machine-inə keçdi, 0.64-dən isə iOS üçün də dəstək verildi. Hermes hər iki platformada bir sıra yaxşılaşdırma gətirdi:

- Tətbiqin start vaxtının qısalması
- Endirilən tətbiqin ölçüsünün azalması
- Yaddaş istifadəsinin azalması
- Built-in proxy dəstəyi (`react-native-firebase` və `mobx` kimi kitabxanaların işləməsi üçün)

Köhnə və yeni arxitektura arasındakı fərqləri anlamaq müsahibələrdə tez-tez soruşulan mövzudur. Hermes haqqında ətraflı: [reactnative.dev/docs/hermes](https://reactnative.dev/docs/hermes).

JS, brauzerdə olduğu kimi, React Native-də də **tək thread**-də icra olunur. Bu thread JS-in icrasına cavabdehdir — yazdığımız biznes məntiqi burada işləyir. Yəni component-lər, state, Hook-lar, REST API çağırışları kimi bütün adi kod tətbiqin JS hissəsində idarə olunur.

Bütün tətbiq strukturu **Metro bundler** vasitəsilə tək fayla paketlənir. Metro həmçinin JSX kodunu JS-ə transpile etməyə cavabdehdir. TypeScript istifadə etmək istəsək, Babel bunu dəstəkləyir — heç bir əlavə konfiqurasiya lazım deyil.

### Native hissə

Burada native kod icra olunur. React Native bu hissəni hər platforma üçün öz native dilində reallaşdırır: Android üçün Java, iOS üçün Objective-C. Native layer əsasən Android/iOS SDK ilə əlaqə saxlayan **Native modullardan** ibarətdir və tətbiqlərə unifikasiya olunmuş API vasitəsilə native funksionallıq təqdim edir. Məsələn, alert dialoq göstərmək lazımdırsa, Native layer hər iki platforma üçün eyni API təqdim edir və biz onu JS thread-dən çağırırıq.

Bu thread interfeysi yeniləmək və ya native funksiyaları çağırmaq lazım olanda JS thread ilə əlaqə saxlayır. Onun iki hissəsi var:

- **React Native UI** — native interfeys formalaşdırma vasitələrini istifadə edir.
- **Native Modules** — tətbiqlərə işlədiyi platformanın spesifik imkanlarına çıxış verir.

### Thread-lər arasında əlaqə: bridge

Hər React Native layer-i tətbiqdəki hər native və UI xüsusiyyəti üçün özünəməxsus API reallaşdırır. Layer-lər arasındakı əlaqə **bridge** vasitəsilə həyata keçir. Bu modul C++ ilə yazılıb və asinxron növbəyə (queue) əsaslanır. Bridge bir tərəfdən data alanda onu serializasiya edir, JSON string-ə çevirir və növbədən keçirir. Data təyinat yerinə çatanda deserializasiya olunur.

Alert nümunəsində olduğu kimi, native hissə JS-dən gələn çağırışı qəbul edib dialoqu göstərir. Əslində, çağırılan JS metodu bridge-ə mesaj göndərir, bridge bu mesajı aldıqda Native hissə tapşırığı icra edir. Native mesajlar da JS layer-ə ötürülə bilər — məsələn, düyməyə klikləndikdə Native layer JS-ə `onClick` hadisəsi ilə mesaj göndərir.

JS və Native hissə, bridge ilə birlikdə, veb tətbiqlərin server və client tərəflərinə bənzəyir — onlar REST API-lar vasitəsilə əlaqə saxlayır kimi. Native hissənin hansı dildə və necə reallaşdırıldığı bizim üçün fərq etmir, çünki JS-dəki kod izolə olunub — biz sadəcə bridge-ə mesaj göndərir, cavab alırıq.

> Bu, həm böyük üstünlükdür, həm də böyük çatışmazlıq: bir tərəfdən tək kod bazası ilə cross-platform tətbiq yazmağa imkan verir, digər tərəfdən isə çox biznes məntiqi olan tətbiqdə bottleneck-ə çevrilə bilər.

Tətbiqdəki bütün hadisə və əməliyyatlar asinxron JSON-bridge mesajlarına əsaslanır. Hər tərəf mesaj göndərir və gələcəkdə hansısa vaxt cavab gözləyir (bu, zəmanətli deyil). Bu cür data mübadiləsi sxemi ilə əlaqə kanalının yüklənmə riski var.

Bunun performans problemi yaratmasına klassik nümunə: istifadəçi böyük siyahını scroll edir. Native mühitdə `onScroll` hadisəsi baş verəndə, məlumat asinxron şəkildə JS mühitinə ötürülür. Amma native mexanizmlər JS hissənin işini bitirib nəticəni bildirməsini gözləmir. Bunun nəticəsində siyahıda məzmun görünməzdən əvvəl boş sahə görünür və gecikmə yaranır. Bu cür adi problemlərdən qaçmaq üçün xüsusi üsullar var — məsələn, limitsiz siyahılarda paginated `FlatList` istifadə etmək. Cari arxitekturanın bu məhdudiyyətini yadda saxlamaq vacibdir.

### Stilləşdirmə

Hər platformanın interfeys yaratmaq və stilləşdirmək üçün öz texnologiyası var. Bunu unifikasiya etmək üçün React Native CSS-in-JS sintaksisindən istifadə edir. Flexbox vasitəsilə component-lər öz uşaqlarının layout-unu təyin edə bilir — bu, müxtəlif ekran ölçülərində ardıcıl layout təmin edir. Ümumilikdə veb-də CSS-in işləmə məntiqinə bənzəyir, sadəcə adlar camelCase yazılır (məsələn, `background-color` yox, `backgroundColor`).

JS tərəfində bu, sadə obyektdir (stil xüsusiyyətləri ilə); native kodda isə **Shadow** adlanan ayrı thread-dir. Bu thread Meta-nın hazırladığı **Yoga engine** vasitəsilə tətbiqin layout-unu hesablayır. Nəticələr interfeysi göstərməyə cavabdeh olan Native UI thread-ə göndərilir.

Bütün bu hissələr birləşəndə React Native-in cari arxitekturası formalaşır: bu arxitektura mühüm biznes problemlərini həll edir — eyni komanda ilə həm veb, həm mobil tətbiq yaratmaq mümkündür, çox miqdarda biznes məntiqi kodu təkrar istifadə oluna bilər, mobil təcrübəsi olmayan developer-lər belə React Native-i rahat istifadə edə bilir.

## Gələcək arxitektura: bridge-siz React Native

Cari arxitektura ideal deyil. Son bir neçə ildir React Native komandası bridge bottleneck-i həll etmək üzərində işləyir. Yeni arxitektura məhz bunun üçündür.

React Native-in yenidən qurulması bridge-i tədricən ləğv edib əvəzinə **JS Interface (JSI)** adlanan yeni komponent gətirir. Bu element, öz növbəsində, yeni Fabric component-lərini və TurboModule-ları mümkün edir.

JSI-nin istifadəsi bir sıra yaxşılaşdırma imkanı açır:

1. **JS bundle artıq JavaScriptCore VM-dən asılı deyil.** İndi hər iki platformada yeni Hermes JS engine-i işlətmək mümkündür — yəni JavaScriptCore engine-i asanlıqla daha performanslı başqa bir şeylə əvəz oluna bilər.
2. **JSI JS-ə native metod və funksiyaları birbaşa çağırmağa imkan verir.** Bu, native metod və xüsusiyyətlərə istinadları saxlayan `HostObject` C++ obyekti sayəsində mümkün olub. `HostObject` JS-də native metod və props-ları qlobal obyektə bağlayır — beləliklə JS funksiyalarına birbaşa çağırış Java və ya Objective-C API-larını işə salır.
3. **TurboModule-lar** native modulları tam idarə etməyə imkan verir. Bütün modullar eyni anda başlamır — tətbiq onlara yalnız lazım olanda müraciət edir.
4. **Fabric** — yeni UI manager (Renderer) — bridge-ə ehtiyacı aradan qaldıraraq render layer-ini transformasiya edir. İndi Shadow Tree birbaşa C++-da yaradıla bilir, bu da sürəti artırır və bir elementi render etmək üçün addım sayını azaldır.
5. **CodeGen** — React Native və Native hissə arasında rahat əlaqəni təmin etmək üçün Meta üzərində işlədiyi alət. Güclü tipli native kodla dinamik tipli JS-in uyğunluğunu avtomatlaşdıracaq — hər iki thread üçün kodu təkrarlamağa ehtiyac qalmayacaq.

Yeni arxitektura, əvvəlki React Native tətbiqlərində mümkün olmayan yeni dizaynların yolunu aça bilər — çünki indi C++-ın gücündən istifadə etmək mümkündür. Bu, gələcəkdə React Native ilə əvvəlkindən daha çox müxtəliflikdə tətbiq yaratmağa imkan verəcək.

## JS və Native modullar

React Native bütün native imkanları qutudan çıxdığı kimi əhatə etmir — yalnız əsas tətbiqdə lazım olan ən ümumi funksiyaları təqdim edir. Üstəlik, Meta komandası tətbiqin ümumi ölçüsünü azaltmaq üçün bəzi funksiyaları öz ayrıca modullarına köçürüb. Məsələn, cihazda data saxlamaq üçün `AsyncStorage` ayrıca paketə köçürülüb və istifadə etmək üçün ayrıca quraşdırılmalıdır.

Bununla belə, React Native genişlənə bilən framework-dür. Öz native modullarımızı əlavə edib eyni bridge və ya JSI vasitəsilə JS API-nı ifşa edə bilərik. Native modul yazmaq Objective-C və ya Java təcrübəsi tələb etdiyi üçün bu kitabda fokuslanılan mövzu deyil — üstəlik buna ehtiyac da azdır, çünki React community demək olar hər ehtiyac üçün hazır modul yaradıb.

Ən populyar native modullardan bir neçəsi:

- **React Navigation** — naviqasiya menyuları və ekranlar yaratmaq üçün ən yaxşı React Native naviqasiya kitabxanalarından biri. Stabil, sürətli və az bug-lıdır, sənədləşməsi yaxşıdır.
- **UI component kitabxanaları** — layout-u sıfırdan yazmadan tez qurmağa imkan verir, adətən daha stabil və ardıcıl nəticə verir:
  - **NativeBase** — Android, iOS və veb üçün universal dizayn sistemi.
  - **React Native Elements** — hazır UI kit.
  - **UI Kitten** — Eva Design System-in React Native reallaşdırması.
  - **React Native Paper** — Google Material Design-a uyğun component-lər.
  - **Tamagui** — həm mobil, həm veb üçün işləyən component-lər.
- **Splash screen** — `react-native-bootsplash` şəkil və fon rəngi verməklə splash screen-i komanda xəttindən yaradır (JS thread başlamazdan əvvəl göstərilməli olduğu üçün bu, əl ilə çətin işdir).
- **Icons** — `react-native-vector-icons` ikonları unifikasiya edir, `react-native-svg` isə SVG render etməyə imkan verir.

### Xəta idarəetməsi

Veb tətbiqdə xətalar adətən JS-in hüdudlarından kənara çıxmır — tətbiq işə düşmürsə, səbəbi DevTools log-larında asanlıqla görmək olur. React Native-də isə Native komponent də əlavə olunduğundan, xəta icra zamanı orada da baş verə bilər. Nəticədə xəta baş verəndə tətbiq dərhal bağlanır və səbəbi tapmaq çətinləşir.

`react-native-exception-handler` native və JS xətalarını idarə etmək üçün sadə üsul təqdim edir. İşlətmək üçün modulu quraşdırıb link etmək, sonra JS və native exception-lar üçün qlobal handler qeydiyyatdan keçirmək lazımdır:

```js
import { setJSExceptionHandler, setNativeExceptionHandler }
  from "react-native-exception-handler";

setJSExceptionHandler((error, isFatal) => {
  // JS xətası baş verəndə görüləcək əməliyyat
});

const exceptionhandler = (exceptionString) => {
  // native xəta üçün handler kodu
};

setNativeExceptionHandler(
  exceptionhandler,
  forceAppQuit,
  executeDefaultHandler
);
```

`setJSExceptionHandler` və `setNativeExceptionHandler` xüsusi qlobal xəta handler-lərdir. Crash baş verəndə xəta mesajı göstərmək, Google Analytics ilə izləmək və ya öz API-nız vasitəsilə development komandasına bildiriş göndərmək mümkündür.

### Push bildirişlər

Bildirişlər indi tətbiqlərin ayrılmaz hissəsidir. Push bildirişlər adətən istifadəçi cihazlarına mesaj göndərən gateway provayderinə bağlıdır. Tətbiqə push bildiriş əlavə etmək üçün istifadə oluna bilən kitabxanalar:

- **react-native-onesignal** — OneSignal (push, email, SMS)
- **react-native-firebase** — Google Firebase
- **@aws-amplify/pushnotification** — AWS Amplify

### Over-the-air (OTA) yeniləmələr

Adi tətbiq yeniləməsində yeni versiya build edilib app store-a yüklənir. React Native bundle tək fayl olduğundan, onu **over-the-air** (hava üzərindən) əvəz etmək çətin deyil — Apple və ya Google-un təsdiqini gözləmədən tətbiqi istədiyiniz qədər tez-tez yeniləyə bilərsiniz. Bu, React Native-in real gücüdür.

Bunun üçün Microsoft-un **CodePush** servisindən istifadə edilə bilər ([sənəd](https://docs.microsoft.com/en-gb/appcenter/distribution/codepush/)). Expo də `expo-updates` paketi ilə OTA yeniləmələri dəstəkləyir.

### JS kitabxanaları

Native olmayan JS modulları üçün demək olar heç bir məhdudiyyət yoxdur — istisna DOM və Node.js kimi dəstəklənməyən API-lardan istifadə edən kitabxanalardır. Moment, Lodash, Axios, Redux, MobX və minlərlə digər JS paketini rahatlıqla istifadə etmək olar.

React Native-in minlərlə kitabxanası olduğundan hamısını sadalamaq mənasızdır. Lazım olan paketi tapmaq üçün geniş və reytinqləşdirilmiş siyahı toplayan [React Native Directory](https://reactnative.directory/) layihəsi var.

## React Native-in əsas component və API-ları

İndi React Native-in daxildə necə qurulduğunu və funksionallığını necə genişləndirə biləcəyimizi bilirik. Növbəti addım — bu framework-ün təqdim etdiyi API və component-lərə baxmaqdır.

Demək olar bütün tətbiqlər aşağıdakı əsas building block-lardan ən azı birini istifadə edir:

- **View** — hər tətbiqin əsas kərpici. Veb-də `<div>`-in ekvivalentidir, mobil-də `UIView` (iOS) və ya `android.view` (Android) kimi təmsil olunur. `<View/>` başqa `<View/>`-in içində nest oluna bilər, sıfır və ya çoxlu istənilən tipdə uşağa malik ola bilər.
- **Text** — mətn göstərmək üçün React component-i. `View` kimi nest olunma, stil və toxunma idarəetməsini dəstəkləyir.
- **Image** — şəbəkə şəkilləri, statik resurslar, müvəqqəti local şəkillər və kamera roll-undan olan şəkillər daxil olmaqla müxtəlif mənbələrdən görüntü göstərir.
- **TextInput** — istifadəçiyə klaviatura ilə mətn daxil etməyə imkan verir. Props avtokorreksiya, avto-böyük hərf, placeholder mətni, fərqli klaviatura tipləri (məsələn, rəqəm klaviaturası) kimi bir sıra xüsusiyyəti konfiqurasiya etməyə imkan verir.
- **ScrollView** — bir neçə view və component-i scroll etmək üçün ümumi konteyner. `horizontal` property ilə həm şaquli, həm üfüqi scroll mümkündür. Böyük və ya limitsiz siyahı render etmək lazımdırsa, **FlatList** istifadə edilməlidir — bu, "Pull to Refresh" və lazy-loading kimi xüsusi props dəstləri təqdim edir. Siyahı bölmələrə ayrılmalıdırsa, **SectionList** var.
- **Button** — React Native fərdi düymələr və digər toxunulabilən component-lər (`TouchableHighlight`, `TouchableOpacity`, `TouchableWithoutFeedback`) yaratmaq üçün inkişaf etmiş component-lərə malikdir.
- **Pressable** — React Native 0.63-dən etibarən daha dəqiq toxunma nəzarəti verir. Əslində toxunmanı aşkar etmək üçün wrapper-dir; `TouchableOpacity` və `Button` kimi touchable component-lər əvəzinə istifadə edilə bilən yaxşı müəyyən olunmuş component-dir.
- **Switch** — checkbox-a bənzəyir, amma mobil cihazlarda tanış olduğumuz switch formasında təqdim olunur.

Növbəti fəsillərdə bu ümumi component-lərə və onların xüsusiyyətlərinə daha dərindən baxacaq, az istifadə olunan yeni component-ləri də araşdıracağıq. Bütün mövcud component-lər haqqında ətraflı məlumat: [reactnative.dev/docs/components-and-apis](https://reactnative.dev/docs/components-and-apis).

## Nəticə

Bu fəsildə cross-platform framework React Native-in tarixinə və şirkətlər üçün hansı problemi həll etdiyinə baxdıq. Onunla şirkətlər tək universal developer komandası ilə bir biznes məntiqi yaza və bunu bütün platformalarda eyni anda tətbiq edə bilir — bu da çox vaxt və pul qənaəti deməkdir.

> React Native-in kapot altında necə işlədiyini ətraflı bilmək planlaşdırma mərhələsində potensial problemləri əvvəlcədən görməyə və həll etməyə imkan verir.

Qısası: bridge (JS ↔ Native arasında JSON mesajlaşan asinxron körpü) React Native-i mümkün etdi, amma həm də onun bottleneck-inə çevrildi. Yeni JSI-əsaslı arxitektura (Fabric, TurboModules, CodeGen) məhz bu bottleneck-i aradan qaldırmaq üçün qurulur. Növbəti fəsildə yeni React Native layihələrinə necə başlanacağını öyrənəcəyik.
