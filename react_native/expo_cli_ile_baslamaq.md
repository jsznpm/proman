# React Native layihəsinə necə sıfırdan başlamaq olar?

Əvvəlki fəsillərdə React Native-in nə olduğunu və "kapot altında" necə işlədiyini gördük. İndi nəzəriyyədən praktikaya keçmək vaxtıdır: real layihə yaratmaq, onu telefonda göstərmək və kodda dəyişiklik edərkən canlı yenilənməni izləmək.

Xoşbəxtlikdən, yeni layihə yaradarkən lazım olan bütün boilerplate kodu komanda xətti alətləri bizim əvəzimizə həll edir. Bu fəsildə React Native üçün mövcud CLI alətlərinə baxacaq, ilk sadə tətbiqimizi yaradacaq və onu birbaşa telefonumuzda işə salacağıq.

Bu fəsildə aşağıdakı mövzuları əhatə edəcəyik:

- React Native CLI alətlərinin araşdırılması
- Expo komanda xətti alətinin quraşdırılması və istifadəsi
- Tətbiqi telefonda görüntüləmək
- Tətbiqi Expo Snack-də görüntüləmək

## React Native üçün hansı CLI alətləri var?

İnkişaf prosesini sadələşdirmək və sürətləndirmək üçün xüsusi komanda xətti alətlərindən istifadə olunur — bunlar boş layihələri tətbiq şablonları, asılılıqlar (dependencies) və başlatma, build etmə, test etmə üçün digər alətlərlə birgə quraşdırır. Burada iki əsas yanaşma var:

- **React Native CLI**
- **Expo CLI**

**React Native CLI** — Meta tərəfindən yaradılmış alətdir. Layihə orijinal CLI alətinə əsaslanır və üç hissədən ibarətdir: native iOS layihəsi, native Android layihəsi və React Native JavaScript tətbiqi. Başlamaq üçün Xcode və ya Android Studio lazımdır. Bu yanaşmanın əsas üstünlüyü **çeviklik**dir — istənilən kitabxananı Native modul vasitəsilə qoşa, yaxud birbaşa native hissəyə kod yaza bilərsiniz. Amma bunun üçün ən azı mobil development-in əsaslarını bilmək tələb olunur.

**Expo CLI** isə React Native tətbiqləri qurmaq üçün böyük ekosistemin yalnız bir hissəsidir. Expo — React Native və native platformalar ətrafında qurulmuş, universal React tətbiqləri üçün framework və platformadır. O, tək bir JavaScript/TypeScript kod bazasından iOS, Android və veb üçün tətbiq qurmağa, deploy etməyə, test etməyə və sürətlə təkmilləşdirməyə imkan verir.

Expo framework-ü aşağıdakıları təqdim edir:

- **Expo CLI** — boş layihələr yaradan, sonra onları işə salan, build edən və yeniləyən komanda xətti aləti.
- **Expo Go** — layihələrinizi cihazınızda birbaşa işə salmaq üçün Android və iOS tətbiqi (native tətbiqi kompilyasiya və imzalamağa ehtiyac qalmadan) və komandanızla paylaşmaq imkanı.
- **Expo Snack** — React Native tətbiqlərini birbaşa brauzerdə yazmağa imkan verən onlayn oyun meydançası (playground).
- **Expo Application Services (EAS)** — Expo və React Native tətbiqləri üçün dərindən inteqrasiya olunmuş cloud xidmətləri toplusu. Tətbiqlər EAS vasitəsilə cloud-da kompilyasiya, imzalanma və mağazalara yüklənə bilir.

Expo hazır istifadəyə çox sayda funksiya ilə gəlir. Əvvəllər layihələrə müəyyən məhdudiyyət qoyurdu, çünki fərdi native modulları dəstəkləmirdi. Amma bu məhdudiyyət artıq mövcud deyil: Expo indi **development build**-lər və **config plugin**-lər vasitəsilə fərdi native kod əlavə etməyə və o native kodu (Android/Xcode layihələrini) fərdiləşdirməyə icazə verir.

> Qısası: Expo təcrübəsiz mobil developer üçün ideal başlanğıc nöqtəsidir, çünki native tərəfin mürəkkəbliyini bizdən gizlədir — məhz buna görə ilk React Native layihəmizi onunla quracağıq.

## Expo komanda xətti alətinin quraşdırılması və istifadəsi

Expo komanda xətti aləti tətbiqinizin işləməsi üçün lazım olan bütün scaffolding-i (baza struktur) yaradır. Bundan başqa, Expo development zamanı tətbiqi işlətməyi asanlaşdıran əlavə alətlərə də malikdir. Əvvəlcə mühiti və layihəni qurmaq lazımdır:

1. Expo-dan istifadə etməzdən əvvəl Node.js, Git və Watchman quraşdırılmalıdır. **Watchman** — layihədəki faylları izləyən və onlar dəyişəndə yenidən build kimi əməliyyatları tetikləyən alətdir. Bütün tələb olunan alətlər və detallar burada göstərilib: [docs.expo.dev/get-started/installation](https://docs.expo.dev/get-started/installation/#requirements).

2. Quraşdırma bitdikdən sonra aşağıdakı əmrlə yeni layihə başlada bilərik:

```bash
npx create-expo-app --template
```

Bu əmr sizin kompüterinizdə heç nə əvvəlcədən quraşdırılmasını tələb etmir — `npx` paketi müvəqqəti yükləyib bir dəfəlik icra edir.

3. Sonra CLI gələcək layihəniz haqqında suallar verəcək. Terminalda bunun kimi bir şey görəcəksiniz:

```
? Choose a template: › - Use arrow-keys. Return to submit.
    Blank
❯   Blank (TypeScript) - blank app with TypeScript enabled
    Navigation (TypeScript)
    Blank (Bare)
```

Biz **Blank (TypeScript)** seçimini edəcəyik — bu, TypeScript dəstəyi aktiv olan boş tətbiq şablonudur.

4. Növbəti addımda layihənin adı soruşulacaq:

```
? What is your app named? › my-project
```

Adını `my-project` qoyaq.

5. Bütün asılılıqlar quraşdırıldıqdan sonra Expo layihənizi sizin üçün tamamlayacaq:

```
✅ Your project is ready!
```

Boş React Native layihəsini yaratdıqdan sonra, indi Expo development server-ini kompüterinizdə necə işə salıb tətbiqi cihazlarınızdan birində necə görüntüləyəcəyinizi öyrənəcəyik.

## Tətbiqi telefonda görüntüləmək

React Native layihənizi development zamanı cihazınızda görmək üçün Expo development server-ini başlatmaq lazımdır:

1. Terminalda layihə qovluğunda olduğunuzdan əmin olun:

```bash
cd path/to/my-project
```

2. `my-project` qovluğuna daxil olduqdan sonra development server-i başlatmaq üçün bu əmri işlədin:

```bash
npm start
```

3. Bu, terminalda development server haqqında bəzi məlumat göstərəcək — QR kod və server ünvanı (məsələn, `exp://192.168.1.15:8081`), həmçinin klaviatura qısayolları: `a` — Android açmaq, `i` — iOS simulyator açmaq, `w` — veb açmaq, `r` — tətbiqi yenidən yükləmək və s.

4. Tətbiqi cihazlarımızda görmək üçün **Expo Go** tətbiqini quraşdırmaq lazımdır. Bunu Android üçün Play Store-da, iOS üçün isə App Store-da tapa bilərsiniz. Expo Go quraşdırıldıqdan sonra, cihazınızın kamerası ilə QR kodu skan edirsiniz.

   Əgər Expo Go və Expo CLI-a daxil olmusunuzsa, tətbiqi QR koda ehtiyac olmadan işlədə bilərsiniz — açılmış development sessiyaya sadəcə klikləmək kifayətdir.

5. QR kod skan olunan kimi (və ya açıq sessiyaya klikləndikdə) terminalda yeni log-lar və qoşulmuş yeni cihaz görünəcək:

```
iOS Bundling complete 205ms
```

6. Bundan sonra tətbiqiniz cihazda işə düşəcək.

Bu nöqtədə tətbiqinizi inkişaf etdirməyə hazırsınız. Əslində, eyni anda bir neçə fiziki cihazla işləmək istəyirsinizsə, bu prosesi hər biri üçün təkrarlaya bilərsiniz. Bu Expo qurğusunun ən yaxşı tərəfi odur ki, kompüterdə kod dəyişikliyi etdikcə fiziki cihazlarda **canlı yenilənmə** (live reloading) pulsuz təmin olunur. Gəlin bunu yoxlayaq:

1. `my-project` qovluğu daxilindəki `App.tsx` faylını açaq. Orada `App` component-ini görəcəksiniz:

```jsx
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
```

2. İndi şrifti qalın etmək üçün kiçik bir stil dəyişikliyi edək:

```jsx
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Open up App.tsx to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontWeight: "bold" },
});
```

Burada `text` adlı yeni stil əlavə edib onu `Text` component-inə tətbiq etdik. Faylı yadda saxlayıb cihazınıza qayıtsanız, dəyişikliyi dərhal görəcəksiniz — heç bir manual rebuild lazım deyil.

Tətbiqlərinizi fiziki cihazlarınızda lokal işlətməyi bacardığınıza görə, indi React Native tətbiqlərini **Expo Snack** xidməti vasitəsilə müxtəlif virtual cihaz emulyatorlarında işlətməyə baxaq.

## Tətbiqi Expo Snack-də görüntüləmək

Expo tərəfindən təqdim olunan **Snack** xidməti React Native kodunuz üçün bir oyun meydançasıdır. O, React Native layihə fayllarınızı elə kompüterinizdə olduğu kimi təşkil etməyə imkan verir. Üzərində işləmək dəyər gördüyünüz bir şey qurmusunuzsa, Snack-inizi export edə bilərsiniz. Həmçinin Expo hesabı yaradıb Snack-lərinizi saxlaya, üzərində işləməyə davam edə, yaxud başqaları ilə paylaşa bilərsiniz. Expo Snack-i bu linkdə tapa bilərsiniz: [snack.expo.dev](https://snack.expo.dev/).

React Native tətbiqini Expo Snack-də sıfırdan yarada bilərik — bu halda o, Expo hesabında saxlanılır — və ya mövcud layihələri Git repozitorisindən import edə bilərik. Repozitori import etməyin gözəl tərəfi ondadır ki, Git-ə dəyişiklik push etdikdə Snack-iniz də avtomatik yenilənir.

Snack layihə menyusundakı **Import git repository** düyməsinə klikləyib repozitori URL-ni yapışdıra bilərsiniz. Repozitori import olunub Snack saxlanıldıqdan sonra, Git repozitorisinin yerini əks etdirən yenilənmiş Snack URL-i alacaqsınız.

Bu URL-i açsanız, Snack interfeysi yüklənəcək və işə salmazdan əvvəl kodda dəyişiklik edib test edə biləcəksiniz. Snack-in əsas üstünlüyü onu virtual cihazlarda asanlıqla işlətmək imkanıdır. Tətbiqinizi virtual cihazda işlətmək üçün idarəetmə elementləri UI-nin sağ tərəfindədir:

- Yuxarıdakı idarəetmə elementi hansı cihaz tipinin emulyasiya olunacağını (Android, iOS, yaxud Web) təyin edir.
- **Tap to play** düyməsi seçilmiş virtual cihazı işə salır.
- **Run on your device** düyməsi tətbiqi QR kod üsulu ilə Expo Go-da işlətməyə imkan verir.

Bu nümunə tətbiq sadəcə mətn göstərir və ona bir neçə stil tətbiq edir, ona görə fərqli platformalarda demək olar eyni görünür. React Native fəsillərini davam etdirdikcə, Snack kimi bir alətin iki platforma arasındakı fərqləri anlamaq üçün müqayisələr aparmaqda nə qədər faydalı olduğunu görəcəksiniz.

## Nəticə

Bu fəsildə Expo komanda xətti aləti vasitəsilə React Native layihəsinə necə başlamağı öyrəndik. Əvvəlcə Expo alətini necə quraşdırmağı gördük. Sonra yeni React Native layihəsini necə başlatmağı öyrəndik. Ardınca Expo development server-ini işə saldıq və server UI-nin müxtəlif hissələri ilə tanış olduq.

Xüsusilə, development server-i tətbiqinizi test etmək istədiyiniz istənilən cihazdakı Expo tətbiqi ilə necə birləşdirməyi öyrəndik. Expo həmçinin kod parçaları və ya bütün Git repozitoriləri ilə eksperiment etməyə imkan verən Snack xidmətinə malikdir. Repozitorini necə import edib virtual iOS və Android cihazlarında işlətməyi gördük.

> Yəni bir neçə komanda ilə boş layihədən başlayaraq, telefonunuzda canlı işləyən, hər kod dəyişikliyi ilə ani yenilənən React Native tətbiqinə çatmaq mümkündür.

Əvvəllər native tətbiq görmək üçün Xcode/Android Studio ilə tam build tsikli lazım idi — indi isə `npm start` və bir QR kod skanı kifayətdir. Növbəti fəsildə React Native tətbiqlərimizdə responsive layout-ların necə qurulacağına baxacağıq.
