# React Native-də İstifadəçi Jestlərinə Necə Reaksiya Vermək Olar?

Veb tətbiqlərində demək olar hər şey siçanla idarə olunur — klik, hover, scroll təkəri. Mobil ekranda isə siçan yoxdur, hər şey barmaqla edilir: sürüşdürmə, toxunma, sağa-sola çəkmə. Bu, tamam fərqli reaksiya sistemi tələb edir.

Bu yazıda üç mövzuya baxacağıq: barmaqla scroll etmə, toxunmaya vizual geribildirim vermə, və sürüşdürülə (swipeable) bilən komponentlər qurma.

## Barmaqla scroll etmə

Veb tətbiqində scroll bar-ı siçanla sürüşdürürsən və ya təkəri fırladırsan. Mobil cihazda isə bunların heç biri yoxdur — hər şey ekrandakı jestlərlə idarə olunur. Aşağı scroll etmək istəyəndə barmağını ekranın üzərində yuxarı doğru hərəkət etdirirsən, məzmun da onunla bərabər sürüşür.

Bu, göründüyündən çətindir, çünki sadə sürüşdürmə deyil — sürətlə də hesablaşmaq lazımdır. Barmağını sürətlə çəkib buraxdıqda ekran həmin sürətlə "ətalətlə" (momentum) hərəkət etməyə davam edir, sonra barmağını yenidən toxundurduqda dayanır. Xoşbəxtlikdən, bütün bu mürəkkəbliyi `ScrollView` komponenti sənin əvəzinə həll edir.

`ScrollView`-i istənilən məzmunu (mətn, siyahı, digər komponentlər) əhatə etmək üçün istifadə edə bilərsən:

```jsx
export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        {new Array(20).fill(null).map((v, i) => (
          <View key={i}>
            <Text style={[styles.scrollItem, styles.text]}>Some text</Text>
            <ActivityIndicator style={styles.scrollItem} size="large" />
            <Switch style={styles.scrollItem} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
```

`ScrollView` tək başına işə yaramır — o, digər komponentləri əhatə etmək üçündür və düzgün işləməsi üçün hündürlüyə ehtiyacı var:

```js
scroll: {
  height: 1,
  alignSelf: "stretch",
},
```

`height: 1` qəribə görünsə də, `alignSelf: "stretch"` sayəsində elementlər düzgün göstərilir. Nəticədə ekranın sağında şaquli scroll zolağı görünür, məzmunu aşağı çəkdikcə o da hərəkət edir. İstəsən, məzmunu özbaşına sürüşdürüb sonra dayandıra bilərsən — sürət hissi tam saxlanılır.

> Jest sisteminin aşağı səviyyəli hissələrini "gesture responder" life-cycle metodları ilə özün də tənzimləyə bilərsən, amma bu, demək olar heç vaxt lazım olmur. Maraqlananlar üçün: reactnative.dev/docs/gesture-responder-system.

## Toxunmaya vizual geribildirim vermə

İndiyə qədərki nümunələrdə "düymə" kimi sadə mətndən istifadə edilib. Veb tətbiqində mətni kliklənə bilən etmək üçün sadəcə link (`<a>`) ilə əhatə edirsən. React Native-də isə link komponenti yoxdur — mətni düymə kimi göstərmək üçün stil vermək lazımdır.

Problem budur: mətni link kimi stilləndirmək mobil cihazda çətin basılan olur. Düymələr barmaq üçün daha böyük hədəf təqdim edir və toxunma geribildirimi tətbiq etmək daha asandır.

React Native bunun üçün üç fərqli komponent təklif edir:

- **TouchableOpacity** — basılanda düymənin şəffaflığı (opacity) azalır, bu vizual siqnal verir ki, toxunma qeydə alınıb.
- **TouchableHighlight** — şəffaflıq əvəzinə, düymənin üzərinə rəngli "highlight" qatı əlavə olunur.
- **Pressable API** — ən çevik variant. `onPressIn`, `onPressOut` və `onLongPress` kimi callback-lərlə istənilən toxunma effektini özün qura bilərsən.

Hansı yanaşmanı seçdiyinin fərqi yoxdur — vacib olan istifadəçiyə uyğun geribildirim verməkdir. Hətta eyni tətbiqdə fərqli məqsədlər üçün hamısından istifadə edə bilərsən.

Əvvəlcə `TouchableOpacity` və `TouchableHighlight` əsaslı iki komponent quraq:

```tsx
type ButtonProps = {
  label: string;
  onPress: () => void;
};

export const OpacityButton = ({ label, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export const HighlightButton = ({ label, onPress }: ButtonProps) => {
  return (
    <TouchableHighlight
      style={styles.button}
      underlayColor="rgba(112,128,144,0.3)"
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableHighlight>
  );
};
```

`activeOpacity={0.5}` basılan zaman şəffaflığın nə qədər azalacağını, `underlayColor` isə highlight rənginin nə olacağını təyin edir. Hər iki düymə eyni stildən istifadə edir:

```js
button: {
  padding: 10,
  margin: 5,
  backgroundColor: "azure",
  borderWidth: 1,
  borderRadius: 4,
  borderColor: "slategrey",
},
buttonText: {
  color: "slategrey",
},
```

İndi isə `Pressable` API əsaslı düyməyə baxaq — burada düymənin mətni toxunma vəziyyətinə görə dəyişir:

```tsx
const PressableButton = () => {
  const [text, setText] = useState("Not Pressed");
  return (
    <Pressable
      onPressIn={() => setText("Pressed")}
      onPressOut={() => setText("Press")}
      onLongPress={() => {
        setText("Long Pressed");
      }}
      delayLongPress={500}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        styles.button,
      ]}
    >
      <Text>{text}</Text>
    </Pressable>
  );
};
```

`onPressIn` barmaq düyməyə toxunan kimi, `onPressOut` isə barmaq çəkiləndə işə düşür. `delayLongPress={500}` — 500ms basılı saxlanılsa, `onLongPress` çağırılır. `style` prop-una funksiya ötürülür ki, `pressed` vəziyyətinə görə şəffaflıq dinamik hesablansın.

Üç düyməni də əsas `App` komponentində birləşdirmək belə görünür:

```jsx
export default function App() {
  return (
    <View style={styles.container}>
      <OpacityButton onPress={() => {}} label="Opacity" />
      <HighlightButton onPress={() => {}} label="Highlight" />
      <PressableButton />
    </View>
  );
}
```

Burada `onPress` callback-ləri boşdur, çünki onlar `ButtonProps`-un məcburi (required) sahəsi olduğu üçün ötürülüb — real tətbiqdə burada real məntiq olar.

## Sürüşdürülə bilən (Swipeable) və ləğv edilə bilən komponentlər

Nativ mobil tətbiqlərin veb tətbiqlərindən daha intuitiv olmasının bir səbəbi jestlərdir. Məsələn, bir elementi barmaqla ekrandan kənara sürüşdürmək çox yayılmış jestdir — amma bu jestin "kəşf edilə bilən" olması lazımdır.

Təsəvvür et: tətbiqdə nəyisə basıb sürüşdürməyə çalışırsan, element hərəkət etməyə başlayır. Nə baş verəcəyini bilmədən barmağını çəkirsən, element də yerinə geri qayıdır. Məhz bu anda tətbiqin bir hissəsinin necə işlədiyini kəşf etmiş olursan — sınamaqdan qorxmadan.

Bunu qurmaq üçün generic `Swipeable` komponenti yaradaq — istifadəçi mətni ekrandan sürüşdürüb çıxardanda callback funksiyası çağırılsın:

```tsx
export default function SwipableAndCancellable() {
  const [items, setItems] = useState(
    new Array(10).fill(null).map((v, id) => ({ id, name: "Swipe Me" }))
  );

  function onSwipe(id: number) {
    return () => {
      setItems(items.filter((item) => item.id !== id));
    };
  }

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <Swipeable
          key={item.id}
          onSwipe={onSwipe(item.id)}
          name={item.name}
          width={200}
        />
      ))}
    </View>
  );
}
```

Bu kod 10 ədəd `<Swipeable>` komponenti göstərir. Elementlərdən birini sola sürüşdürməyə başlayanda o hərəkət edir; kifayət qədər uzağa sürüşdürülməsə jest ləğv olunur və element yerinə qayıdır. Tam sonuna qədər sürüşdürülərsə, element siyahıdan tamamilə silinir və qalan elementlər boş yeri doldurur.

İndi `Swipeable` komponentinin özünə baxaq:

```tsx
type SwipeableProps = {
  name: string;
  width: number;
  onSwipe: () => void;
};

export default function Swipeable({ name, width, onSwipe }: SwipeableProps) {
  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    console.log(e.nativeEvent.contentOffset.x);
    e.nativeEvent.contentOffset.x >= width && onSwipe();
  }

  return (
    <View style={styles.swipeContainer}>
      <ScrollView
        horizontal
        snapToInterval={width}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={10}
        onScroll={onScroll}
      >
        <View style={[styles.swipeItem, { width }]}>
          <Text style={styles.swipeItemText}>{name}</Text>
        </View>
        <View style={[styles.swipeBlank, { width }]} />
      </ScrollView>
    </View>
  );
}
```

Komponent üç şeyi qəbul edir: `width` — özünün eninin nə qədər olacağı, `snapToInterval` — sayəsində sürüşdürmə "paging" kimi davranır və jest ləğv olunanda dəqiq yerinə oturur, `onScroll` isə sürüşdürmə məsafəsini izləyib lazımi anda `onSwipe` callback-ini çağırır.

Sola sürüşdürmə imkanı vermək üçün mətn olan komponentin yanına boş (görünməz) bir komponent əlavə etmək lazımdır. Stillər belədir:

```js
swipeContainer: {
  flex: 1,
  flexDirection: "row",
  width: 200,
  height: 30,
  marginTop: 50,
},
swipeItem: {
  height: 30,
  backgroundColor: "azure",
  justifyContent: "center",
  borderWidth: 1,
  borderRadius: 4,
  borderColor: "slategrey",
},
swipeItemText: {
  textAlign: "center",
  color: "slategrey",
},
swipeItemBlank: {
  height: 30,
},
```

`swipeItemBlank` stili `swipeItem` ilə eyni hündürlüyə malikdir, amma başqa heç nəyi yoxdur — sadəcə görünməzdir, boş yer rolunu oynayır.

## Nəticə

Mobil cihazlarda hər şey barmaqla idarə olunur, veb-dəki siçan məntiqi işləmir. `ScrollView` sürət və ətalət hesablamalarını sənin əvəzinə həll edir. `TouchableOpacity`, `TouchableHighlight` və `Pressable` istifadəçiyə "toxunmam qeydə alındı" hissini verir. `Swipeable` isə istifadəçinin jesti kəşf edə bilməsinə imkan yaradır — sürüşdür, kifayət qədər getməzsə geri qayıdar, tam gedərsə silinər.

Qısası: veb-də klik kifayətdir, mobil-də isə hər jestin öz emosional geribildirimi olmalıdır — əks halda istifadəçi tətbiqi "ölü" hiss edir.
