# React Native-də İstifadəçiyə Proqresi Necə Göstərmək Olar?

Təsəvvür et: mikrodalğalı sobanın nə pəncərəsi var, nə də səsi. Yeganə əlaqə vasitəsi "bişir" yazılı düymədir. Absurd səslənir, elə deyilmi? Amma bir çox proqram istifadəçisi məhz bununla üzləşir: heç bir proqres göstəricisi yoxdur. Soba nəsə bişirir, ya yox? Bəs nə vaxt hazır olacaq?

Bu problemin veb və mobil tətbiqlərdə analoqu hər addımda var: düyməyə basdın, ekran donub qaldı, heç nə baş vermir kimi görünür. İstifadəçi əslində narahat olur — proqram asılıb, yoxsa işləyir? Bu yazıda React Native-in bu problemi həll etmək üçün təklif etdiyi komponentləri araşdıracağıq:

* Proqres və istifadəçi təcrübəsi (usability) əlaqəsi
* Qeyri-müəyyən (indeterminate) proqresi göstərmək — `ActivityIndicator`
* Naviqasiya zamanı proqres göstəricisi
* Dəqiq proqresi ölçmək — proqres zolağı (progress bar)
* Addım-addım (step) proqres

---

## Niyə Proqres Göstərmək Vacibdir?

Mikrodalğalı soba nümunəsinə qayıdaq. Bir səs siqnalı əlavə etsək, istifadəçi düyməni basdıqdan sonra heç olmasa nəyisə hiss edəcək — "bəli, qəbul olundu". Amma "yeməyim nə vaxt hazır olacaq?" sualı hələ də cavabsız qalır. Ona görə də mütləq bir proqres ölçmə vasitəsi — məsələn, taymer — lazımdır.

Bu, developerlərin əsas usability prinsiplərini bilmədiyi anlamına gəlmir — sadəcə vaxt azlığından bu detal çox vaxt unudulur. React Native-də bu problemi həll etmək üçün iki fərqli yanaşma var:

* **Qeyri-müəyyən (indeterminate) göstərici** — nəsə baş verdiyini bildirir, amma nə qədər qaldığını demir
* **Dəqiq ölçü (measured progress)** — istifadəçiyə faiz və ya addım sayı ilə real proqresi göstərir

> Yaxşı istifadəçi təcrübəsi istəyirsənsə, bu iki vasitəni tətbiqinin prioritet siyahısına sal — sonraya saxlama.

## Qeyri-müəyyən Proqres: `ActivityIndicator`

`ActivityIndicator` komponenti adından da bəlli olduğu kimi — nəsə baş verdiyini göstərmək üçün istifadə olunur. Real proqres qeyri-müəyyən ola bilər, amma heç olmasa istifadəçiyə "gözlə, iş gedir" mesajı ötürülür.

```jsx
import React from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "./styles";

export default function App() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}
```

`<ActivityIndicator />` platformadan asılı olmayan (platform-agnostic) komponentdir — həm iOS-da, həm Android-də işləyir, sadəcə hər platformada özünəməxsus görünüşdə göstərilir (iOS-da nazik fırlanan spinner, Android-də dairəvi animasiya). `size` prop-u ilə ölçünü `"large"` və ya `"small"` seçmək olar — kiçik ölçü, məsələn, düymə içində göstərmək üçün daha uyğundur.

Diqqət et: bu nümunə **əbədi fırlanır** — heç vaxt dayanmır, çünki heç bir şərtə bağlı deyil. Real tətbiqdə isə spinner müəyyən şərt (data yüklənməsi, sorğu bitməsi) tamamlananda gizlədilməlidir. Növbəti bölmədə bunu necə edəcəyimizə baxaq.

## Naviqasiya Zamanı Proqres Göstəricisi

Tutaq ki, istifadəçi bir ekrandan digərinə keçir, amma ikinci ekran açılmadan əvvəl API-dan data çəkməlidir. Bu network sorğusu davam edərkən boş, məzmunsuz ekran göstərməkdənsə, proqres göstəricisi göstərmək daha məntiqlidir.

Burda məqsəd:

* Naviqasiya komponentinin göstəriləcək ekran üçün API data-nı avtomatik çəkməsini təmin etmək
* API çağırışının qaytardığı promise-dən istifadə edərək spinner-i göstərmək, promise nəticələndikdə isə gizlətmək

Komponentlərin özü spinner-in göstərilib-göstərilməməsi ilə maraqlanmamalıdır — bu məntiqi ümumi (generic) bir `Wrapper` komponentinə çıxarmaq daha təmiz yanaşmadır:

```jsx
export function LoadingWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return children;
  }
}
```

`LoadingWrapper` `children`-i qəbul edir və `loading` state-inə görə ya spinner-i, ya da `children`-i render edir. `useEffect` içindəki `setTimeout` burda real API sorğusunu simulyasiya edir — 1 saniyə sonra `loading` `false`-a düşür və əsl məzmun görünür.

İndi bu wrapper-i `react-navigation` ilə istifadə olunan ekran komponentində tətbiq edək:

```jsx
const First = ({ navigation }) => (
  <LoadingWrapper>
    <View style={styles.container}>
      <Button title="Second" onPress={() => navigation.navigate("Second")} />
      <Button title="Third" onPress={() => navigation.navigate("Third")} />
    </View>
  </LoadingWrapper>
);
```

Bütün ekran `LoadingWrapper` ilə əhatələnib — `setTimeout` gözləyərkən spinner göstərilir. Bu yanaşmanın gözəlliyi ondadır ki, əlavə məntiqi bir yerdə gizlədib, hər səhifədə təkrar istifadə edə bilirsən. Real tətbiqdə `setTimeout` əvəzinə `LoadingWrapper`-ə əlavə prop-lar ötürüb, loading state-i həmin ekranın özündən idarə etmək olar.

## Dəqiq Proqresi Ölçmək: Proqres Zolağı

Sadəcə "nəsə baş verir" demənin problemi budur: istifadəçi üçün sonu görünmür. Bu, taymersiz mikrodalğalı soba qarşısında gözləməyə bənzəyir — narahatlıq yaradır. Nə qədər proqres edildiyini, nə qədər qaldığını bilmək isə rahatlıq verir. Ona görə mümkün olduqda **dəterministik (deterministic) proqres zolağı** istifadə etmək daha yaxşıdır.

`ActivityIndicator`-dan fərqli olaraq, React Native-in özündə platformadan asılı olmayan proqres zolağı komponenti yoxdur. Bunun üçün `react-native-progress` kitabxanasından istifadə olunur.

> Keçmişdə React Native-in özündə iOS və Android üçün ayrıca proqres zolağı komponentləri (`ProgressViewIOS`, `ProgressBarAndroid`) var idi. Amma Meta komandası kitabxananın ölçüsünü kiçiltmək üçün bu cür komponentləri ayrı paketlərə köçürüb — indi onlar əsas React Native kitabxanasının tərkibində deyil.

Əvvəlcə öz `ProgressBar` komponentimizi quraq:

```jsx
import * as Progress from "react-native-progress";

export default function ProgressBar({ progress }) {
  return (
    <View style={styles.progress}>
      <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
      <Progress.Bar width={200} useNativeDriver progress={progress} />
    </View>
  );
}
```

`ProgressBar` `progress` prop-unu qəbul edir və faiz mətni ilə birlikdə zolağı göstərir. `<Progress.Bar />` çoxlu prop qəbul etsə də, bizə yalnız `width`, `progress` və (daha rəvan animasiya üçün) `useNativeDriver` lazımdır.

İndi bu komponenti əsas `App` komponentində işə salaq:

```jsx
export default function MeasuringProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeoutRef = null;

    function updateProgress() {
      setProgress((currentProgress) => {
        if (currentProgress < 1) {
          return currentProgress + 0.01;
        } else {
          return 0;
        }
      });
      timeoutRef = setTimeout(updateProgress, 100);
    }

    updateProgress();
    return () => {
      timeoutRef && clearTimeout(timeoutRef);
    };
  }, []);

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} />
    </View>
  );
}
```

`<ProgressBar>` başlanğıcda 0%-dən başlayır. `useEffect` içindəki `updateProgress` funksiyası taymer vasitəsilə real bir prosesi simulyasiya edir — hər 100 millisaniyədə `progress` dəyəri 0.01 artır, 1-ə çatanda yenidən sıfırlanır.

> Real layihələrdə taymer simulyasiyasından çox nadir istifadə olunur. Amma statistik data göstərmək və ya fayl yükləmə (upload) prosesini izləmək kimi hallarda bu yanaşma faydalı ola bilər — birbaşa taymerə söykənməsən belə, yenə də əlində istifadə edə biləcəyin cari bir proqres dəyəri olacaq.

## Addım-Addım (Step) Proqres

Son nümunə: istifadəçinin əvvəlcədən müəyyən edilmiş neçə addımdan hansında olduğunu göstərən proqres zolağı. Məsələn, uzun bir formanı bir neçə məntiqi hissəyə bölmək və istifadəçi hər hissəni tamamladıqca növbəti addıma keçirmək məntiqli olar — bu zaman proqres zolağı əla geri bildirim (feedback) vasitəsidir.

Bu yanaşmada proqres zolağı naviqasiya paneli altına, başlığın altına yerləşdirilir ki, istifadəçi nə qədər irəlilədiyini, nə qədər qaldığını görsün. Əvvəlki bölmədə qurduğumuz `ProgressBar` komponenti burda da təkrar istifadə olunur.

Fikirləş: 4 ekranlı bir tətbiq var. Birinci ekranda proqres zolağı 25%-i göstərir (1-ci addım / 4 addım). Üçüncü ekranda isə artıq 75%-ə çatıb.

Bunu necə həyata keçirmək olar:

* Hər ekranı təmsil edən komponentlər bir `routes` massivində saxlanılır
* Bu massiv `createNativeStackNavigator()` ilə stack navigator-u konfiqurasiya etmək üçün istifadə olunur
* Hər route-a `initialParams` vasitəsilə `progress` parametri ötürülür
* Proqres belə hesablanır: **cari route-un indeksi / massivin uzunluğu**

Məsələn, `Second` massivdə 2-ci mövqedədir (indeks 1 + 1), massivin uzunluğu isə 4-dür. Bu, proqres zolağını 50%-ə qoyur.

Əlavə olaraq, "Next" və "Previous" düymələrinin `navigation.navigate()` çağırışlarına route adı ötürülməlidir — bunun üçün `screenOptions` handler-inə `nextRouteName` və `prevRouteName` dəyişənləri əlavə olunur.

## Nəticə

Bu fəsildə istifadəçiyə arxa planda nəyinsə baş verdiyini necə göstərməyi öyrəndik:

* Əvvəlcə proqres göstərməyin nə üçün istifadə rahatlığı (usability) baxımından vacib olduğunu gördük
* Sonra qeyri-müəyyən proqresi göstərən sadə bir ekran qurduq (`ActivityIndicator`)
* Ardınca dəqiq proqres miqdarlarını ölçmək üçün `ProgressBar` komponenti düzəltdik
* Naviqasiya zamanı, network sorğusu gedərkən proqres göstəricisi göstərən bir yanaşma tətbiq etdik
* Son bölmədə isə istifadəçinin əvvəlcədən müəyyən edilmiş addımlar içində harada olduğunu göstərən proqres zolağı qurduq

Qısaca: **göstəricilər (indicators)** qeyri-müəyyən proqres üçün, **zolaqlar (progress bars)** isə dəqiq, ölçülə bilən proqres üçün nəzərdə tutulub. İkisi arasındakı fərqi anlamaq və düzgün yerdə düzgününü seçmək — istifadəçini qaranlıqda saxlamamağın açarıdır.
