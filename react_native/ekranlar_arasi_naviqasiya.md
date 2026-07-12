# Ekranlar Arasında Necə Naviqasiya Etməli?

Veb tətbiqində naviqasiya URL üzərində qurulur — brauzer ünvan zolağında kod görürsən, geriyə/irəli düymələr işləyir. Mobil tətbiqdə isə istifadəçi heç bir URL görmür. Ekran adı, parametrlər, geri qayıtma məntiqi — hamısı kodun içində idarə olunmalıdır. React Native-in köhnə versiyalarında bunun üçün `Navigator` və `NavigatorIOS` kimi primitiv komponentlər var idi, amma bunlar mürəkkəb, platformalar arası uyğunsuz və performans problemli idi.

Bugün standart həll `react-navigation` paketidir. Bu yazıda naviqasiyanın əsaslarını, ekranlara parametr ötürməni, header-in tənzimlənməsini, tab/drawer naviqasiyanı və nəhayət fayl-əsaslı (file-based) naviqasiya yanaşmasını görəcəyik.

## Naviqasiyanın əsasları

Əvvəlcə lazım olan paketləri quraşdırmaq lazımdır:

```bash
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
```

Sonra `App` komponentində "stack" naviqator qurulur — yəni ekranlar bir-birinin üstünə yığılan (stack) formada açılır, tam veb-dəki browser history-si kimi:

```jsx
import Home from "./Home";
import Settings from "./Settings";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

`createNativeStackNavigator()` iki şey qaytarır: `Screen` və `Navigator` komponentləri. `Stack.Screen` hər ekranı adıyla qeydiyyatdan keçirir, `Stack.Navigator` isə onları əhatə edir. `<NavigationContainer>` isə mütləq lazımdır — bütün ekranlara naviqasiya funksionallığını ötürən əsas "kontekst"dir.

İndi `Home` ekranına baxaq:

```jsx
type Props = NativeStackScreenProps<RootStackParamList>;

export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>Home Screen</Text>
      <Button
        title="Settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
}
```

Adi funksional komponentdir — state və ya lifecycle metoduna ehtiyac olmadığı üçün class-a lüzum yoxdur. Diqqət çəkən yer `navigation.navigate("Settings")` çağırışıdır: veb-də URL-ə keçdiyin yerdə, mobil-də ekranın adını naviqasiya API-sinə ötürürsən.

Tip təhlükəsizliyi üçün bütün marşrutları təsvir edən `RootStackParamList` tipi yaradılır:

```jsx
export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};
```

Hər marşruta `undefined` verilir, çünki bu misalda parametr yoxdur. Nəticədə `navigation.navigate()` yalnız `"Home"` və ya `"Settings"` adlarını qəbul edir — səhv ad yazsan, TypeScript xəbərdarlıq edəcək.

`Settings` ekranı demək olar eynidir, sadəcə geri `Home`-a qayıdır:

```jsx
type Props = NativeStackScreenProps<RootStackParamList>;

export default function Settings({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>Settings Screen</Text>
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
```

> `react-navigation` avtomatik olaraq yuxarıda ağ naviqasiya paneli (header) çəkir, sol tərəfdə isə geri düyməsi görünür — brauzerin geri düyməsi kimi işləyir. Android-də isə cihazın öz fiziki/gesture geri düyməsi də eyni işi görür.

Bu sayədə tətbiqin layout-unda status bar-la üst-üstə düşmə problemini düşünməyə ehtiyac qalmır — hər ekran öz məzmununa fokuslana bilər.

## Marşrut parametrləri (route parameters)

Veb tətbiqlərində detal səhifəsinə keçəndə URL-ə identifikator əlavə edirsən (`/product/42` kimi). `react-navigation`-da da eyni konsepsiya var — sadəcə URL-ə yox, `navigate()` çağırışına ikinci arqument kimi ötürülür.

Əvvəlcə `RootStackParamList`-ə `Details` marşrutu üçün gözlənilən parametr formasını əlavə edirik:

```jsx
export type RootStackParamList = {
  Home: undefined;
  Details: { title: string };
};
```

`Home` ekranında üç düymə var, hər biri `Details`-ə fərqli `title` parametri ilə keçir:

```jsx
type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>Home Screen</Text>
      <Button
        title="First Item"
        onPress={() => navigation.navigate("Details", { title: "First Item" })}
      />
      <Button
        title="Second Item"
        onPress={() => navigation.navigate("Details", { title: "Second Item" })}
      />
      <Button
        title="Third Item"
        onPress={() => navigation.navigate("Details", { title: "Third Item" })}
      />
    </View>
  );
}
```

`Details` ekranı isə bu parametri `route.params`-dan oxuyur:

```jsx
type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function ({ route }: Props) {
  const { title } = route.params;
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>{title}</Text>
    </View>
  );
}
```

> Marşrut parametrlərini React komponentinə `props` ötürmək kimi düşünə bilərsən — sadəcə burada "prop"u `navigate()` çağırışı ötürür, valideyn komponent yox.

Bu misalda tək `title` ötürülür, amma istənilən sayda parametr əlavə etmək mümkündür — hər biri eyni `route.params` obyektinin daxilində gələcək. Bu üsul olmasaydı, hər məhsul üçün ayrı-ayrı komponent yazmaq lazım gələrdi.

## Naviqasiya header-i

İndiyə qədər gördüyümüz header-lər boşdur — sadəcə geri düyməsi var, çünki heç bir tənzimləmə vermədik. Hər ekran öz header məzmununu ayrıca konfiqurasiya edə bilər.

`App` komponentində `Details` ekranına `headerRight` əlavə edək — sağ tərəfdə "Buy" düyməsi:

```jsx
const Stack = createNativeStackNavigator<RoutesParams>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Details"
          component={Details}
          options={({ route }) => ({
            headerRight: () => {
              return (
                <Button
                  title="Buy"
                  onPress={() => {}}
                  disabled={route.params.stock === 0}
                />
              );
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

`Screen` komponenti `options` prop-unu obyekt və ya funksiya şəklində qəbul edir. Burada funksiya seçilib, çünki `route.params.stock` dəyərinə görə düyməni deaktiv etmək lazımdır — stok `0`-dırsa, "Buy" düyməsi basıla bilməz.

`Home` ekranı indi əlavə parametrlər ötürür — `content` və `stock`:

```jsx
type Props = NativeStackScreenProps<RoutesParams, "Home">;

export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Button
        title="First Item"
        onPress={() =>
          navigation.navigate("Details", {
            title: "First Item",
            content: "First Item Content",
            stock: 1,
          })
        }
      />
      {/* ... digər düymələr eyni məntiqlə */}
    </View>
  );
}
```

`Details` ekranı isə `navigation.setOptions()` ilə öz başlığını dinamik təyin edir:

```jsx
type Props = NativeStackScreenProps<RoutesParams, "Details">;

export default function Details({ route, navigation }: Props) {
  const { content, title } = route.params;

  React.useEffect(() => {
    navigation.setOptions({ title });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>{content}</Text>
    </View>
  );
}
```

Nəticə: header başlığı `title` parametrinə görə dəyişir, sağdakı "Buy" düyməsi isə `stock` dəyəri `1`-dirsə aktiv, `0`-dırsa deaktiv görünür. Yəni header-i həm `Screen`-in `options` prop-u ilə (statik/route-əsaslı), həm də ekranın öz içindən `setOptions()` ilə (dinamik) idarə etmək mümkündür.

## Tab və drawer naviqasiya

İndiyədək bütün nümunələr `Button`-la ekranlar arası keçid edirdi. Amma `react-navigation` ekran siyahısından avtomatik tab paneli və ya yan drawer (çəkmə) menyusu qura bilir.

Lazım olan paketlər:

```bash
npm install @react-navigation/bottom-tabs @react-navigation/drawer
npx expo install react-native-gesture-handler react-native-reanimated
```

Drawer üçün `babel.config.js`-ə plugin əlavə edilməlidir:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"],
  };
};
```

Bu misalda iOS-da alt tab naviqasiyası, Android-də isə drawer istifadə olunur — sırf fərqli üsulları göstərmək üçün, məcburiyyət deyil, hər iki platformada eyni üsulu seçmək tam mümkündür:

```jsx
const Tab = createBottomTabNavigator<Routes>();
const Drawer = createDrawerNavigator<Routes>();

export default function App() {
  return (
    <NavigationContainer>
      {Platform.OS === "ios" && (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="News" component={News} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      )}
      {Platform.OS === "android" && (
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="News" component={News} />
          <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}
```

`Platform.OS` dəyərinə görə hansı naviqatorun render olunacağı seçilir. Hər iki naviqator özündə `Navigator`/`Screen` cütünü saxlayır — struktur `Stack`-la eynidir, sadəcə vizual təqdimat fərqlidir.

Ekranların özü çox sadədir:

```jsx
export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Home Content</Text>
    </View>
  );
}
```

iOS-da nəticə: ekranın altında üç tab düyməsi, aktiv olan vurğulanır. Android-də isə drawer solda gizlidir — açmaq üçün ekranın sol kənarından sürüşdürmək (swipe) lazımdır; açıldıqdan sonra siyahıdan ekran seçilir.

> Drawer-in sol tərəfdən açılması defolt davranışdır, amma istənilən istiqamətdən açılacaq şəkildə konfiqurasiya etmək mümkündür.

## Fayl-əsaslı naviqasiya (Expo Router)

Bu yanaşma Next.js-in routing məntiqinə bənzəyir: yeni ekran əlavə etmək üçün sadəcə `app` qovluğuna yeni fayl qoyursan — heç bir `Stack.Screen` qeydiyyatı lazım deyil. Expo Router öz daxilində React Navigation üzərində qurulub, ona görə eyni options və parametrlər dəstəklənir.

Yeni layihəni "Navigation (TypeScript)" şablonuyla qurmaq kifayətdir:

```bash
npx create-expo-app –template
```

`app` qovluğu daxilində `_layout.tsx` — tətbiqin kök layer-i:

```jsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
```

`index.tsx` — Home ekranı. Diqqət: burda `navigation` prop-u yoxdur, əvəzinə veb-dəki kimi `href` qəbul edən `Link` komponenti işlədilir:

```jsx
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>Home Screen</Text>
      <Link href="/settings" asChild>
        <Button title="Settings" />
      </Link>
    </View>
  );
}
```

`settings.tsx` isə eyni məntiqlə geri `"/"` ünvanına keçir:

```jsx
import { Link } from "expo-router";

export default function Settings() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>Settings Screen</Text>
      <Link href="/" asChild>
        <Button title="Home" />
      </Link>
    </View>
  );
}
```

Fayl adı birbaşa marşrutu təyin edir — `settings.tsx` faylı `/settings` ünvanına çevrilir. Bunun əlavə bonusu: deep linking (tətbiqi birbaşa müəyyən ekrana açan xarici link) əlavə konfiqurasiya olmadan işləyir, çünki hər ekranın onsuz da URL-oxşar ünvanı var.

## Nəticə

Mobil tətbiqdə naviqasiya veb-dəki qədər tanış URL anlayışına söykənmir, amma konseptual olaraq eyni məsələni həll edir: istifadəçini bir ekrandan digərinə məntiqli, ardıcıl şəkildə aparmaq. `react-navigation` bunu stack, tab, drawer naviqatorları və marşrut parametrləri ilə təmin edir; `Expo Router` isə eyni əsasın üzərində fayl-əsaslı, veb-oxşar (`Link`, `href`) təcrübə təklif edir.

> Köhnə `Navigator`/`NavigatorIOS` komponentləri ilə əziyyət çəkməkdənsə, bu gün `react-navigation` (və ya onun fayl-əsaslı qatı Expo Router) mobil naviqasiyanı veb development qədər sadə və proqnozlaşdırıla bilən edir.
