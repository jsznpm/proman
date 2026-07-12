# React Native-də Animasiyalarla Necə İşləmək Olar?

Instagram-da post-u bəyənəndə ürək animasiyası, ya Snapchat-i yeniləyəndə xəyal (ghost) animasiyası — bunlar təsadüfi bəzək deyil. Animasiya istifadəçiyə "nəsə dəyişdi" mesajını göz qırpımında ötürür, diqqəti vacib yerə yönəldir və tətbiqi canlı hiss etdirir. Yaxşı animasiya həm istifadəçi təcrübəsini, həm də məmnuniyyəti artırır.

React Native-də animasiyaları idarə etməyin bir neçə yolu var. Bu yazıda əvvəlcə mövcud alətlərə baxıb onları müqayisə edəcəyik, sonra iki real nümunə üzərində **React Native Reanimated** kitabxanasını tətbiq edəcəyik:

* Layout komponentlərinin animasiyası (görünmə/yox olma)
* Komponent stillərinin animasiyası (toxunma geribildirimi)

## Animated API — köhnə, amma hələ də geniş yayılmış

`Animated` React Native-in özündə gələn, ən çox istifadə olunan animasiya alətidir. Animasiya obyekti yaratmaq, onun vəziyyətini idarə etmək və emal etmək üçün bir sıra metodlar təqdim edir. Üstünlüyü budur ki, istənilən komponentlə işləyir — təkcə `Animated.View` və ya `Animated.Text` kimi xüsusi animasiya komponentləri ilə deyil.

Problem isə arxitekturasındadır: `Animated` API köhnə React Native arxitekturasına əsaslanır və JavaScript ilə UI native thread-ləri arasındakı əlaqə **asinxron** şəkildə qurulur. Bu, hər yeniləməni ən azı bir frame (təxminən 16ms) gecikdirir. JavaScript thread eyni zamanda React-in diff alqoritmini işlədir və ya network sorğularını emal edirsə, gecikmə daha da uzana bilər. Nəticə: buraxılmış (dropped) və ya gecikmiş frame-lər, yəni "sarsıntılı" animasiya.

## React Native Reanimated — problemi kökündən həll edir

**React Native Reanimated** məhz bu problemi həll etmək üçün yaranıb. Yeni arxitektura üzərində qurulub və bütün animasiya məntiqini JavaScript thread-dən **birbaşa UI thread-ə** köçürür — yəni frame gözləmək lazım deyil.

Kitabxana iki səviyyəli API təklif edir:

* **İmperativ API** — çoxmərhələli animasiyalar və xüsusi keçidlər (transitions) üçün
* **Deklarativ API** — CSS transition-larına bənzər sadə animasiya və keçidlər üçün

`Animated` API-nin üzərində qurulub və onu native thread daxilində yenidən implementasiya edir. Nəticədə tanış JavaScript sintaksisini saxlayaraq, yüksək performans əldə edirsən.

### Worklet nədir?

Reanimated-in əsasında **worklet** anlayışı durur — UI thread daxilində sinxron şəkildə icra oluna bilən sadə JavaScript funksiyaları. Funksiyanın əvvəlinə `"worklet"` direktivini əlavə etmək kifayətdir:

```js
function simpleWorklet() {
  "worklet";
  console.log("Hello from UI thread");
}
```

Bu qədər — `simpleWorklet` funksiyası artıq UI thread daxilində, yeni frame gözləmədən icra oluna bilər.

### Əsas hook və metodlar

Reanimated animasiyaları idarə etmək üçün bir neçə hook və köməkçi metod təqdim edir:

* **`useSharedValue`** — UI thread kontekstində yaşayan, dəyəri dəyişəndə animasiyanı tetikləyən əsas state obyektini qaytarır (`Animated.Value`-nin analoqudur). Ən böyük üstünlüyü: shared value-lar re-render tetiklmədən React Native və UI thread-ləri arasında sinxronlaşır — mürəkkəb animasiyalar JS thread-i bloklamadan 60 FPS-lə işləyə bilir.
* **`useDerivedValue`** — başqa shared value-lardan asılı olan, onlar dəyişəndə avtomatik yenilənən yeni bir shared value yaradır. Yəni bir dəyərin başqa dəyərdən "törəməsini" UI thread daxilində worklet kimi hesablamağa imkan verir — re-render olmadan.
* **`useAnimatedStyle`** — shared value-lara əsaslanan, animasiya oluna bilən stil obyekti qurur. Shared value dəyişdikcə müvafiq view xüsusiyyətlərini yeniləyir. Shared value-ları view-lara bağlamağın əsas yoludur.
* **`withTiming`, `withSpring`, `withDecay`** — shared value-nı müxtəlif əyri (curve) və fizika modelləri ilə hamar şəkildə yeniləyən utilit metodlardır. Hədəf dəyəri və konfiqurasiyanı təyin edərək animasiyanı deklarativ şəkildə təsvir etməyə imkan verirlər.

## Reanimated-in Quraşdırılması

Expo layihəsinin içində bu əmri işə sal:

```bash
expo install react-native-reanimated
```

Quraşdırma bitdikdən sonra `babel.config.js` faylına Babel plugin-ini əlavə et:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"],
  };
};
```

Bu plugin-in tək vəzifəsi — worklet funksiyalarını UI thread-də işləyə bilən formaya çevirməkdir.

Plugin-i əlavə etdikdən sonra development server-i yenidən başlat və bundler keşini təmizlə:

```bash
expo start --clear
```

## Layout Komponentlərinin Animasiyası

Ən çox rast gəlinən istifadə hallarından biri — komponentin ekrana ilk dəfə render olunanda (mount) və silinəndə (unmount) animasiyalı görünməsidir. Reanimated bunun üçün `FadeIn`, `BounceIn`, `ZoomIn` kimi hazır animasiyalar təqdim edir.

Bunun üçün adi `Animated` komponentindən (Animated API-dəki eyni komponent) istifadə olunur, sadəcə iki əlavə prop-la:

* **`entering`** — komponent mount olub render ediləndə işə düşən animasiya
* **`exiting`** — komponent unmount olanda işə düşən animasiya

Sadə bir to-do siyahısı quraq: tapşırıq əlavə edən düymə və üzərinə basanda tapşırığı silən funksionallıq.

> Animasiyaları skrinşotda görmək mümkün deyil — kodu özün işlədib nəticəyə baxmağını tövsiyə edirəm.

Bütün sehr `TodoItem` komponentində gizlənib:

```jsx
export const TodoItem = ({ id, title, onPress }) => {
  return (
    <Animated.View entering={SlideInLeft} exiting={SlideOutRight}>
      <TouchableOpacity onPress={() => onPress(id)} style={styles.todoItem}>
        <Text>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
```

Gördüyün kimi, mürəkkəb məntiq yoxdur — sadəcə `Animated.View`-i animasiyanın kökü kimi götürüb, Reanimated-in hazır `SlideInLeft` və `SlideOutRight` animasiyalarını `entering` və `exiting` prop-larına ötürürük. Nəticədə yeni tapşırıq əlavə edəndə element ekranın solundan içəri sürüşür, silinəndə isə sağa doğru sürüşüb yox olur.

İndi bütün mənzərəni görmək üçün `App` komponentinə baxaq:

```jsx
export default function App() {
  const [todoList, setTodoList] = useState([]);

  const addTask = () => {
    setTodoList([
      ...todoList,
      { id: String(new Date().getTime()), title: "New task" },
    ]);
  };

  const deleteTask = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {todoList.map(({ id, title }) => (
          <TodoItem key={id} id={id} title={title} onPress={deleteTask} />
        ))}
      </View>
      <Button onPress={addTask} title="Add" />
    </View>
  );
}
```

`todoList` state-i `useState` ilə saxlanılır, `addTask` və `deleteTask` isə əlavə etmə/silmə məntiqini idarə edir. Animasiyanın özü isə heç bir əlavə koda ehtiyac olmadan, sadəcə `TodoItem` daxilindəki `entering`/`exiting` prop-ları sayəsində işləyir.

## Komponent Stillərinin Animasiyası

Daha mürəkkəb nümunə: gözəl toxunma geribildirimi olan bir düymə. Bu düymə `Pressable` komponenti üzərində qurulacaq və `onPressIn`, `onLongPress`, `onPressOut` hadisələrindən istifadə ediləcək.

Əvvəlcə lazım olan shared value-ları və animasiya stilini təyin edək:

```jsx
const radius = useSharedValue(30);
const opacity = useSharedValue(1);
const scale = useSharedValue(1);
const color = useSharedValue(0);

const backgroundColor = useDerivedValue(() => {
  return interpolateColor(color.value, [0, 1], ["orange", "red"]);
});

const animatedStyles = useAnimatedStyle(() => {
  return {
    opacity: opacity.value,
    borderRadius: radius.value,
    transform: [{ scale: scale.value }],
    backgroundColor: backgroundColor.value,
  };
}, []);
```

Stil xüsusiyyətlərini animasiya etmək üçün `useSharedValue` ilə hər biri üçün ayrıca shared value yaradılıb (başlanğıc dəyəri arqument kimi ötürülür). Sonra `useAnimatedStyle` hook-u ilə stil obyekti qurulur — bu hook `useMemo`-ya bənzəyir, fərq ondadır ki, bütün hesablamalar UI thread-də aparılır və istənilən shared value dəyişəndə stil obyekti yenidən hesablanır. Düymənin fon rəngi isə `useDerivedValue` ilə narıncıdan qırmızıya hamar keçid (interpolasiya) şəklində qurulub.

İndi düymənin basılma vəziyyətinə uyğun stil dəyərlərini yeniləyən handler funksiyalarını yazaq:

```jsx
const onPressIn = () => {
  radius.value = withSpring(20);
  opacity.value = withSpring(0.7);
  scale.value = withSpring(0.9);
};

const onLongPress = () => {
  scale.value = withSpring(0.8);
  color.value = withSpring(1);
};

const onPressOut = () => {
  radius.value = withSpring(30);
  opacity.value = withSpring(1);
  scale.value = withSpring(1, { damping: 50 });
  color.value = withSpring(0);
};
```

`onPressIn` — barmaq düyməyə toxunanda `borderRadius`, `opacity` və `scale` dəyərlərini başlanğıc vəziyyətdən dəyişdirir; hamısı `withSpring` ilə yenilənir ki, keçid hamar olsun. `onLongPress` düyməni qırmızılaşdırır və kiçildir. `onPressOut` isə bütün dəyərləri ilkin vəziyyətinə qaytarır.

Bütün məntiqi artıq layout-a tətbiq edə bilərik:

```jsx
<View style={styles.container}>
  <Animated.View style={[styles.buttonContainer, animatedStyles]}>
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      style={styles.button}
    >
      <Text style={styles.buttonText}>Press me</Text>
    </Pressable>
  </Animated.View>
</View>
```

Nəticədə düymənin üç fərqli vəziyyəti alınır: adi, basılmış və uzun basılmış — hər biri fərqli radius, şəffaflıq, ölçü və rənglə.

## Nəticə

Bu yazıda React Native Reanimated kitabxanasının nə olduğunu və `Animated` API-dən nə ilə fərqləndiyini öyrəndik. Kitabxananın əsasında duran worklet anlayışına, UI thread-də sinxron işləmə prinsipinə nəzər saldıq.

İki real nümunə də gördük: birincisində hazır deklarativ animasiyalarla (`entering`/`exiting`) komponentin görünüb-yox olmasını animasiya etdik; ikincisində isə `useSharedValue` və `useAnimatedStyle` ilə düymənin stilini toxunma vəziyyətinə görə dinamik şəkildə dəyişdik.

Qısası: `Animated` API JS thread ilə UI thread arasında körpü qurur, amma bu körpüdə gecikmə qaçılmazdır. Reanimated isə bu körpünü aradan qaldırır — məntiq birbaşa UI thread-də işləyir, nəticə isə 60 FPS-lik hamar animasiyalardır.
