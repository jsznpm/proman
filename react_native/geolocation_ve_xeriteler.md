# React Native-də Geolocation və Xəritələr Necə İşləyir?

Tətbiq istifadəçinin harada olduğunu bilirsə, çox şey mümkün olur: yaxınlıqdakı restoranı göstərmək, taksi çağırmaq, ya da sadəcə "sizə ən yaxın filial" kimi bir funksiya qurmaq. Bunun üçün React Native-də iki fərqli qat var: **Geolocation API** (koordinatları almaq üçün) və **react-native-maps** (o koordinatları xəritədə göstərmək üçün). Bu yazıda hər ikisini görəcəyik.

## Geolocation API — koordinat almaq

Veb-də tanış olduğumuz Geolocation API React Native-də də eyni məntiqlə işləyir, sadəcə mobil GPS-dən oxuyur. Amma özü-özlüyündə enlik/uzunluq (latitude/longitude) rəqəmləri istifadəçiyə heç nə demir — "40.4093, 49.8671" görəndə heç kim "aha, bu Bakıdır" demir. Bu rəqəmləri mənalı məlumata (ünvan, şəhər adı) çevirmək tətbiqin öz işidir.

Əvvəlcə Expo layihəsi yaradıb `expo-location` modulunu əlavə edirik:

```bash
npx create-expo-app where-am-i
npx expo install expo-location
```

### İcazə məsələsi

Mobil OS istifadəçinin yerini heç bir tətbiqə "avtomatik" vermir — hər dəfə açıq icazə tələb olunur. Bunu kodda `Location.requestForegroundPermissionsAsync()` çağırışı ilə edirik; bu, ekranda "İcazə ver / Rədd et" dialoqu açır.

Burada vacib incəlik: icazəni yalnız bir dəfə istəmək kifayət etmir — nəticəni də yoxlamaq lazımdır. İstifadəçi rədd edərsə, tətbiq çökməməli, sadəcə "yerinizi görə bilmirik" kimi başa düşülən bir vəziyyətə keçməlidir.

İcazəni real tətbiqdə əvvəlcədən `app.json`-da da elan etmək lazımdır ki, App Store/Play Store build zamanı bunu tanısın:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Tətbiq yerinizi göstərmək üçün icazə istəyir."
        }
      ]
    ]
  }
}
```

Bu konfiqurasiya faktiki icazə dialoqunu açmır — sadəcə build sisteminə "bu tətbiq location istəyəcək, ona görə mesaj mətni budur" deyir. Əsl sorğu yenə `requestForegroundPermissionsAsync()` ilə runtime-da olur, və bunu istifadəçi ilk dəfə location lazım olan ekrana düşən kimi (məsələn, app açılan kimi) etmək daha yaxşı təcrübədir — sonradan gözlənilmədən çıxan dialoq istifadəçini narahat edir.

### Koordinatı tutmaq

İki üsul var, və fərq vacibdir:

- `getCurrentPosition()` — bir dəfəlik "hazırda haradasan" sorğusu. Component mount olanda çağırılır.
- `watchPosition()` — istifadəçi hərəkət etdikcə callback-i təkrar-təkrar çağırır, canlı izləmə üçün.

Hər ikisi eyni callback-ə (məsələn `setPosition`) yönləndirilə bilər. Bu callback iki iş görür: birincisi, gələn latitude/longitude-u state-ə yazır; ikincisi, həmin koordinatları Google Maps Geocoding API-yə göndərib insan-oxunaqlı ünvana çevirir (API key `https://developers.google.com/maps/documentation/geocoding/start` ünvanından alınır).

> iOS simulyatorunda və Android Studio-da real cihaz olmadan da lokasiyanı menyudan dəyişmək mümkündür — hər dəfə fiziki telefona yükləməyə ehtiyac yoxdur.

Xam koordinatdan daha faydalısı — çevrilmiş ünvan mətnidir; bu, "yaxınlıqdakı bina/şirkət" kimi funksiyalar üçün işlək məlumatdır. Amma ən effektlisi koordinatı vizual olaraq xəritədə göstərməkdir — buna keçirik.

## MapView ilə xəritə render etmək

`react-native-maps` paketinin əsas komponenti `MapView`-dır. Marker, poliqon, heatmap kimi bir çox alət təqdim edir (ətraflı: `https://github.com/react-native-maps/react-native-maps`).

Minimal nümunə:

```jsx
import { View, StatusBar } from "react-native";
import MapView from "react-native-maps";
import styles from "./styles";

StatusBar.setBarStyle("dark-content");

export default () => (
  <View style={styles.container}>
    <MapView style={styles.mapView} showsUserLocation followsUserLocation />
  </View>
);
```

Bu iki boolean prop çox işi öz üzərinə götürür:

- `showsUserLocation` — cihazın fiziki mövqeyini xəritədə nöqtə ilə işarələyir.
- `followsUserLocation` — cihaz hərəkət etdikcə xəritəni həmin nöqtəyə görə yenidən mərkəzləşdirir (zoom edir).

> Praktik qayda: `showsUserLocation` işlədəndə demək olar həmişə `followsUserLocation`-u da yanına əlavə et — əks halda nöqtə görünür, amma xəritə istifadəçini "izləmir".

Default olaraq xəritə ətrafdakı obyektləri (points of interest) də göstərir — bunlar həmişə tətbiqin öz məzmununa uyğun gəlmir, ona görə növbəti addımda özümüzün annotasiyalarımızı əlavə edəcəyik.

## Öz nöqtələrini (marker) xəritəyə əlavə etmək

Fərz edək tətbiq yaxınlıqdakı pivə zavodlarını göstərir. `showsPointsOfInterest={false}` ilə default nöqtələri söndürüb, öz `Marker`-lərimizi əlavə edirik:

```jsx
<MapView
  style={styles.mapView}
  showsPointsOfInterest={false}
  showsUserLocation
  followsUserLocation
>
  <Marker
    title="Duff Brewery"
    description="Duff beer for me, Duff beer for you"
    coordinate={{
      latitude: 43.8418728,
      longitude: -79.086082,
    }}
  />
</MapView>
```

`Marker`-ə verilən `title` və `description` — istifadəçi nöqtəyə basanda çıxan callout balonunda göstərilən mətndir. Hər marker öz `coordinate`-i ilə xəritədə sabit yerdə qalır, `MapView`-in özü isə yalnız istifadəçinin mövqeyini izləməkdə davam edir.

## Overlay — region (ərazi) çəkmək

Bəzən tək nöqtə kifayət etmir, bütöv bir ərazini vurğulamaq lazımdır — məsələn, "bu məhəllədə IPA sevənlər çoxdur, o biri məhəllədə stout sevənlər". Region sadəcə bir neçə koordinat nöqtəsinin "nöqtədən-nöqtəyə" birləşməsidir, və `Polygon` komponenti ilə çəkilir:

```jsx
<MapView
  style={styles.mapView}
  showsPointsOfInterest={false}
  initialRegion={{
    latitude: 43.8486744,
    longitude: -79.0695283,
    latitudeDelta: 0.002,
    longitudeDelta: 0.04,
  }}
>
  {overlays.map((v, i) => (
    <Polygon
      key={i}
      coordinates={v.coordinates}
      strokeColor={v.strokeColor}
      strokeWidth={v.strokeWidth}
    />
  ))}
</MapView>
```

Burada `overlays` state dəyişənidir — hər element öz koordinat massivini, rəngini və xətt qalınlığını daşıyır. İki düymə (məsələn "IPA Fans" / "Stout Fans") bu state-i dəyişir, nəticədə köhnə poliqon xəritədən silinib yenisi çəkilir. Bu üsul, məsələn, "bu rayonda kirayə mənzil axtarışı" tipli tətbiqlərdə konkret nöqtə yox, bütöv ərazini vurğulamaq lazım olanda faydalıdır.

## Nəticə

Geolocation API xam koordinat verir, amma özü-özlüyündə mənasızdır — mənanı ona sən qatırsan (ünvana çevirmək, xəritədə göstərmək). `react-native-maps` isə bu koordinatları vizual formaya salır: `showsUserLocation`/`followsUserLocation` cütlüyü ilə "hardayam" sualına, `Marker` ilə "yaxınlıqda nə var" sualına, `Polygon` overlay ilə isə "hansı ərazi məni maraqlandırır" sualına cavab verirsən. Xam rəqəmdən tutmuş rəngli xəritəyə gedən yol elə bu üç addımdan keçir.
