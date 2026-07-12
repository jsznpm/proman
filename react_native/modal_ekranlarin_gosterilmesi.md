# React Native-də Modal Ekranlar: İstifadəçini Cari Səhifədən Qopartmadan Necə Xəbərdar Etmək Olar?

Təsəvvür et: bank tətbiqində "Sil" düyməsinə basdın, heç bir sual-cavab olmadan, dərhal əməliyyat baş verdi. Yaxud əksinə — sadə bir "yadda saxlandı" mesajı üçün bütün ekran bağlanıb yenidən açılır. Hər iki hal pis təcrübədir: biri təhlükəli qərarı təsdiqsiz icra edir, digəri isə xırda məlumat üçün istifadəçini axından qoparır.

React Native-də səhifələr adətən `View` komponenti ilə qurulur və birbaşa ekrana render olunur. Amma bəzən istifadəçiyə vacib məlumat çatdırmaq lazım gəlir — onu isə cari səhifədən kənarlaşdırmadan etmək istəyirik. Bu yazıda bunun üçün React Native-in təklif etdiyi vasitələri araşdıracağıq:

* Terminologiya: alert, confirmation, notification arasındakı fərq
* İstifadəçidən təsdiq almaq (uğurlu və xəta ssenariləri)
* Passiv bildirişlər (toast)
* Fon prosesini göstərən activity modal

---

## Terminologiya: Nə Vaxt Nəyi İşlətmək Lazımdır?

Alert, confirmation və notification sözləri gündəlik danışıqda çox vaxt qarışdırılır. Amma bunları dəqiq ayırmaq vacibdir — çünki xətanı passiv bildirişlə göstərsən, istifadəçi onu asanlıqla gözdən qaçıra bilər:

* **Alert (xəbərdarlıq)** — vacib bir şey baş verib, istifadəçi mütləq görməlidir. Bəzən istifadəçi bunu təsdiqləməlidir.
* **Confirmation (təsdiq)** — alert-in bir hissəsidir. Məsələn, istifadəçi əməliyyat etdikdən sonra onun uğurlu olduğunu bilmək üçün modalı bağlamazdan əvvəl "gördüm" deməlidir. Confirmation həm də edəcəyi əməliyyat barədə əvvəlcədən xəbərdarlıq şəklində ola bilər.
* **Notification (bildiriş)** — nəsə baş verib, amma istifadəçinin işini tam dayandıracaq qədər vacib deyil. Adətən özü-özünə yox olur.

> Qaydası sadədir: məlumat bilinməli, amma kritik deyilsə — notification işlət. Funksionallıq istifadəçinin təsdiqi olmadan davam edə bilmirsə — yalnız o zaman confirmation tələb et.

## İstifadəçidən Təsdiq Almaq

### Uğurlu Əməliyyat Üçün Confirmation Modal

Bir əməliyyat uğurla bitəndə istifadəçiyə bunu göstərən modal komponentindən başlayaq:

```jsx
type Props = ModalProps & {
  onPressConfirm: () => void;
  onPressCancel: () => void;
};

export default function ConfirmationModal({
  onPressConfirm,
  onPressCancel,
  ...modalProps
}: Props) {
  return (
    <Modal transparent onRequestClose={() => {}} {...modalProps}>
      <View style={styles.modalContainer}>
        <View style={styles.modalInner}>
          <Text style={styles.modalText}>Dude, srsly?</Text>
          <Text style={styles.modalButton} onPress={onPressConfirm}>
            Yep
          </Text>
          <Text style={styles.modalButton} onPress={onPressCancel}>
            Nope
          </Text>
        </View>
      </View>
    </Modal>
  );
}
```

`ConfirmationModal`-a ötürülən bütün prop-lar (`...modalProps`) React Native-in öz `Modal` komponentinə ötürülür — səbəbini bir az sonra görəcəyik. Stil isə tamamilə sənin əlindədir:

```jsx
modalContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},
modalInner: {
  backgroundColor: "azure",
  padding: 20,
  borderWidth: 1,
  borderColor: "lightsteelblue",
  borderRadius: 2,
  alignItems: "center",
},
modalText: {
  fontSize: 16,
  margin: 5,
  color: "slategrey",
},
modalButton: {
  fontWeight: "bold",
  margin: 5,
  color: "slategrey",
},
```

`Modal` komponenti sadə bir `View` kimi düşünülə bilər — fərq təkcə odur ki, digər view-ların üzərində render olunur. Görünüşünü tamamilə özün müəyyən edirsən.

Amma çox vaxt öz stilini yazmaq istəməzsən. Veb brauzerdə sadəcə `alert()` çağırıb, brauzerin özünün stilləşdirdiyi pəncərəni göstərə bilərsən. React Native-də də bunun analoqu var: `Alert.alert()`.

```jsx
function toggleAlert() {
  Alert.alert("", "Failed to do the thing...", [
    {
      text: "Dismiss",
    },
  ]);
}
```

Funksionallıq baxımından fərq yoxdur — başlıq və mətn var, bunları modalda da asanlıqla əlavə edə bilərdin. Əsl fərq görünüşdədir: bu alert iOS-da iOS-a, Android-də isə Android-ə məxsus görünür, sən heç nə stilləşdirmədən.

Əksər hallarda modal əvəzinə alert seçmək daha yaxşı qərardır — platformanın öz native görünüşünə uyğun olduğu üçün istifadəçiyə tanış gəlir. Amma xəta təsdiqləri kimi hallarda görünüşə daha çox nəzarət lazım ola bilər — bunu növbəti bölmədə görəcəyik.

Nəzərə al: modal render etmə yanaşması alert-dən fərqlidir, amma ikisi də dəyişən prop dəyərlərinə görə yenilənən adi deklarativ komponentdir.

### Xəta Təsdiqi

Əvvəlki bölmədəki bütün prinsiplər xəta təsdiqinə də aiddir. Görünüşə daha çox nəzarət lazımdırsa, modal işlət — məsələn, xəta zamanı modalı qırmızı və "qorxulu" göstərmək istəyə bilərsən:

```jsx
modalInner: {
  backgroundColor: "azure",
  padding: 20,
  borderWidth: 1,
  borderColor: "lightsteelblue",
  borderRadius: 2,
  alignItems: "center",
},
modalInnerError: {
  backgroundColor: "lightcoral",
  borderColor: "darkred",
},
modalText: {
  fontSize: 16,
  margin: 5,
  color: "slategrey",
},
modalTextError: {
  fontSize: 18,
  color: "darkred",
},
modalButton: {
  fontWeight: "bold",
  margin: 5,
  color: "slategrey",
},
modalButtonError: {
  color: "black",
},
```

Uğur modalındakı əsas stillər burda da təkrarlanır, çünki xəta modalına da eyni baza stillər lazımdır. Fərqli olan hissə isə `*Error` adlı stillərdir ki, bunlar əsas stillərin üzərinə əlavə olunur:

```jsx
const innerViewStyle = [styles.modalInner, styles.modalInnerError];
const textStyle = [styles.modalText, styles.modalTextError];
const buttonStyle = [styles.modalButton, styles.modalButtonError];

type Props = ModalProps & {
  onPressConfirm: () => void;
  onPressCancel: () => void;
};

export default function ErrorModal({
  onPressConfirm,
  onPressCancel,
  ...modalProps
}: Props) {
  return (
    <Modal transparent onRequestClose={() => {}} {...modalProps}>
      <View style={styles.modalContainer}>
        <View style={innerViewStyle}>
          <Text style={textStyle}>Epic fail!</Text>
          <Text style={buttonStyle} onPress={onPressConfirm}>
            Fix it
          </Text>
          <Text style={buttonStyle} onPress={onPressCancel}>
            Ignore it
          </Text>
        </View>
      </View>
    </Modal>
  );
}
```

Stillər massiv şəklində birləşdirilib `style` prop-una ötürülür. `Error` stili həmişə massivin sonunda gəlir, çünki `backgroundColor` kimi ziddiyyətli xüsusiyyətlər massivdə sonra gələnin dəyəri ilə əvəzlənir.

Xəta təsdiqlərində istədiyin qədər əlavə idarəetmə (advanced controls) əlavə edə bilərsən — bu, tətbiqinin istifadəçiyə xətanı necə "yedizdirdiyindən" asılıdır: bəzən bir neçə fərqli hərəkət yolu təklif etmək lazım gəlir. Amma çox vaxt vəziyyət sadədir — nəsə səhv gedib, edə biləcəyin tək şey istifadəçini bundan xəbərdar etməkdir. Belə hallarda sadəcə alert kifayət edir.

İndi istifadəçidən reaksiya tələb edən bildirişləri gördük — sıra çatdı daha az aqressiv, işi pozmayan bildirişlərə.

## Passiv Bildirişlər (Toast)

İndiyə qədər gördüyümüz bildirişlərin hamısı istifadəçidən reaksiya tələb edirdi — bu qəsdən belədir, çünki vacib məlumatı gözünə soxmaq lazımdır. Amma bunu hər yerdə etmək olmaz. Vacib olub, amma gözardı edilsə də həyati fərq yaratmayan bildirişlər üçün **passiv bildirişlər** işlədilir. Bunlar modaldan daha az müdaxiləedicidir və bağlamaq üçün istifadəçidən heç bir hərəkət tələb etmir.

Bunun üçün `react-native-root-toast` kitabxanasının Toast API-ı işlədiləcək. Android-də toast artıq tanış komponentdir — istifadəçidən cavab tələb etməyən qısa məlumat göstərir. iOS-da native Toast API olmadığı üçün hər iki platformada işləyən bu kitabxanadan istifadə olunur:

```jsx
export default function PassiveNotifications() {
  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <Text
          onPress={() => {
            Toast.show("Something happened!", {
              duration: Toast.durations.LONG,
            });
          }}
        >
          Show Notification
        </Text>
      </View>
    </RootSiblingParent>
  );
}
```

Əvvəlcə tətbiqi `RootSiblingParent` komponenti ilə sarımaq lazımdır, sonra Toast API ilə işləməyə hazırsan. Toast açmaq üçün `Toast.show` metodunu çağırırsan — "Something happened!" mesajı ekranın altında görünür və qısa müddətdən sonra özü yox olur. Əsas məqam: bu bildiriş narahat etmir, işini kəsmir.

## Activity Modal: Arxa Planda Nəsə Baş Verdiyini Göstərmək

Son olaraq, progress indiqatoru göstərən bir modal quraq. Fikir sadədir: modalı göstər, promise nəticələndikdə isə gizlət. `ActivityIndicator`-lı ümumi `Activity` komponenti belə görünür:

```jsx
type ActivityProps = {
  visible: boolean;
  size?: "small" | "large";
};

export default function Activity({ visible, size = "large" }: ActivityProps) {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalContainer}>
        <ActivityIndicator size={size} />
      </View>
    </Modal>
  );
}
```

Bura promise-i birbaşa ötürüb, promise nəticələndikdə komponentin özünün modalı gizlətməsini təmin etmək fikri cəlbedici görünə bilər. Amma bu yaxşı fikir deyil — çünki onda state-i bu komponentin içinə soxmalı olardın, üstəlik komponent işləmək üçün promise-dən asılı olardı. Bunun əvəzinə `Activity` sadəcə `visible` prop-una görə göstərilir və ya gizlədilir — nə state saxlayır, nə də promise-dən asılıdır.

Modalın yarı-şəffaf arxa fonu belə qurulur:

```jsx
modalContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
},
```

`Modal` komponentinin özünü `transparent` etmək əvəzinə, şəffaflığı `backgroundColor`-da təyin etmək overlay effekti yaradır. İndi bu komponenti idarə edən koda baxaq:

```jsx
export default function App() {
  const [fetching, setFetching] = useState(false);
  const [promise, setPromise] = useState(Promise.resolve());

  function onPress() {
    setPromise(
      new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
        setFetching(false);
      })
    );
    setFetching(true);
  }

  return (
    <View style={styles.container}>
      <Activity visible={fetching} />
      <Text onPress={onPress}>Fetch Stuff...</Text>
    </View>
  );
}
```

"Fetch Stuff..." mətninə basılanda şəbəkə sorğusunu simulyasiya edən yeni bir promise yaradılır. Promise nəticələndikdə `fetching` state-i yenidən `false`-a düşür və activity modal avtomatik gizlənir.

## Nəticə

Bu yazıda mobil istifadəçiyə vacib məlumatı necə çatdırmağı öyrəndik:

* Bəzən istifadəçidən açıq təsdiq almaq lazımdır — bu, uğur və xəta ssenarilərinin hər ikisinə aiddir
* Digər hallarda passiv bildiriş kifayət edir, çünki confirmation modaldan daha az müdaxiləedicidir
* İki əsas vasitə var: **modal** və **alert**. Modal daha çevikdir — sadə `View` kimi, istədiyin görünüşü verə bilərsən. Alert isə sadə mətn göstərmək üçün ideal seçimdir — stilləşdirməni platformanın öz sisteminə həvalə edir
* Android-də əlavə olaraq `ToastAndroid` interfeysi də mövcuddur; iOS-da eyni effekti almaq üçün bir az əlavə iş lazımdır

Qısaca: **modal** — nə göstərildiyinə tam nəzarət istəyəndə, **alert** — platformaya uyğun sürətli həll lazım olanda, **toast** — istifadəçinin işini pozmadan xəbər vermək istəyəndə işə düşür. Doğru vasitəni doğru yerdə seçmək — istifadəçini nə darıxdırmadan, nə də qaranlıqda saxlamadan məlumatlandırmağın açarıdır.
