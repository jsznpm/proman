# Flexbox ilə Responsive Layout Necə Qurulur?

Mobil ekranda component-ləri düzgün yerləşdirmək veb-dəki CSS təcrübəsindən fərqlidir. Xoşbəxtlikdən React Native köhnə CSS layout üsullarını (float, table-based layout) yox, birbaşa **Flexbox** modelini polyfill edir — yəni veb development-dən tanış olan bacarıqlar burada da işləyir, sadəcə bir neçə fərqlə.

Bu yazıda əvvəlcə Flexbox-un məntiqini, sonra React Native-də stil yazma üsullarını, ardından Styled Components alternativini, nəhayət bir neçə real layout nümunəsini görəcəyik.

## Flexbox nədir?

Flexbox-dan əvvəl layout qurmaq üçün float kimi əslində başqa məqsəd üçün (mətnin şəkil ətrafında dolanması) yaradılmış üsullardan istifadə olunurdu — bu da xətalara açıq, qarışıq kod demək idi. Flexbox bunu həll edir: layout üçün lazım olan bütün hesablamaları öz üzərinə götürür.

Konseptual olaraq Flexbox sadədir: bir **container** var, onun daxilində **child element**-lər var. Həm container, həm də child-lar ekranda necə render olunacağına görə "flexible"dir.

> Flexbox container-lərinin bir **direction**-u var: `column` (yuxarı/aşağı) və ya `row` (sol/sağ). Diqqət: bu, elementlərin ekranda necə düzüləcəyini yox, "box"un hansı istiqamətdə uzanacağını göstərir.

Bura çox adamı çaşdıran yerdir: `flexDirection: "row"` desək, elementlər bir-birinin **yanında** (soldan sağa) düzülür — sətirlər bir-birinin üstünə yığılmır. Yəni "row" — elementlərin axdığı istiqamətdir, ekranda vizual sətir demək deyil.

## React Native-də stillər necə yazılır?

React Native stil faylı CSS faylı deyil — sadə JavaScript obyektidir:

```jsx
import { Platform, StyleSheet, StatusBar } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "ghostwhite",
    ...Platform.select({
      ios: { paddingTop: 20 },
      android: { paddingTop: StatusBar.currentHeight },
    }),
  },
  box: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
  },
  boxText: {
    color: "darkslategray",
    fontWeight: "bold",
  },
});
```

Diqqət edin: property adları veb CSS-ə çox bənzəyir, sadəcə camelCase yazılır (`justify-content` yox, `justifyContent`). `StyleSheet.create()` çağırıb export etmək kifayətdir.

Burada maraqlı hissə `Platform.select()`-dır:

```jsx
...Platform.select({
  ios: { paddingTop: 20 },
  android: { paddingTop: StatusBar.currentHeight },
})
```

Bu funksiya cihazın platformasına (iOS/Android) uyğun fərqli stil qaytarır. Məqsəd sadədir: container-in üst hissəsi status bar-ın altında qalmasın. iOS-da sabit `20`, Android-də isə `StatusBar.currentHeight` dəyəri istifadə olunur — çünki hər ikisində eyni API mövcud olsaydı, bu workaround-a ehtiyac qalmazdı.

Stillər component-lərə `style` prop-u ilə verilir:

```jsx
import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.boxText}>I'm in a box</Text>
      </View>
    </View>
  );
}
```

Analoji üçün: `<View>` veb-dəki `<div>`-ə, `<Text>` isə `<p>`-yə bənzəyir — sadəcə mobil render mühitində.

## Styled Components alternativi

Stil yazmağın yeganə yolu obyekt deyil — `styled-components` kitabxanası ilə CSS-in-JS yanaşması da mövcuddur. Quraşdırmaq üçün:

```bash
npm install --save styled-components
```

Yuxarıdakı `Box` komponentini bununla yenidən yazsaq:

```jsx
import styled from "styled-components/native";

const Box = styled.View`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
`;

const BoxText = styled.Text`
  color: darkslategray;
  font-weight: bold;
`;
```

İstifadəsi də sadədir — əlavə `style` prop-u lazım deyil:

```jsx
const App = () => {
  return (
    <Box>
      <BoxText>I'm in a box</BoxText>
    </Box>
  );
};
```

> Qeyd: performans səbəbindən sonrakı nümunələrdə `StyleSheet` obyektlərinə sadiq qalınacaq, `styled-components` isə seçim olaraq qalır.

## Flexbox layout nümunələri

### Sadə üç-sütunlu layout

Üç bölmənin yuxarıdan aşağı (`column`) düzüldüyü sadə layout:

```jsx
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.boxText}>#1</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>#2</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>#3</Text>
      </View>
    </View>
  );
}
```

```jsx
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "ghostwhite",
  },
  box: {
    width: 300,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "darkslategray",
  },
  boxText: {
    color: "darkslategray",
    fontWeight: "bold",
  },
});
```

`container`-in `flex` və `flexDirection` property-ləri sətirlərin yuxarıdan aşağı axmasını təmin edir. `alignItems` child-ları mərkəzə düzür, `justifyContent: "space-around"` isə onların arasına bərabər boşluq əlavə edir.

Bu layout-un problemi: cihaz landscape (üfüqi) mövqeyə çevriləndə sol-sağ tərəflərdə çoxlu boş yer qalır — çünki `box` sabit `width: 300` dəyərinə bağlıdır.

### Təkmilləşdirilmiş üç-sütunlu layout

Sabit `width` əvəzinə `alignSelf: "stretch"` istifadə etsək, box-lar mövcud sahəni tam tutur:

```jsx
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "ghostwhite",
    justifyContent: "space-around",
  },
  box: {
    height: 100,
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: "lightgray",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "darkslategray",
  },
  boxText: {
    color: "darkslategray",
    fontWeight: "bold",
  },
});
```

Əsas dəyişiklik `alignSelf: "stretch"`-dir — bu, container-in `flexDirection`-una uyğun olaraq (bu halda `column` olduğu üçün) box-un **genişliyini** avtomatik doldurmasını təmin edir. Nəticədə həm portrait, həm landscape rejimdə bütün ekran genişliyi istifadə olunur, boş yer qalmır.

Təkrarlanan stilləri yığcamlaşdırmaq üçün ayrıca `Box` komponenti çıxarmaq məntiqlidir:

```jsx
export default function Box({ children }) {
  return (
    <View style={styles.box}>
      <Text style={styles.boxText}>{children}</Text>
    </View>
  );
}
```

### Flexible row-lar

İndi əks istiqamətə keçək: bölmələr soldan sağa düzülsün, amma yuxarıdan aşağı uzansın.

```jsx
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "ghostwhite",
    alignItems: "center",
    justifyContent: "space-around",
  },
  box: {
    width: 100,
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: "lightgray",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "darkslategray",
  },
  boxText: {
    color: "darkslategray",
    fontWeight: "bold",
  },
});
```

```jsx
export default function App() {
  return (
    <View style={styles.container}>
      <Box>#1</Box>
      <Box>#2</Box>
    </View>
  );
}
```

Burada `alignSelf: "stretch"` istiqamət göstərmir — sadəcə "mövcud oxda uzan" deyir. Container `row` olduğu üçün box-lar yuxarıdan aşağı uzanır; `flexDirection: "row"` sayəsində aralarındaki boşluq isə soldan sağa yerləşir.

### Flexible grid

Bəzən neçə sütun olacağını əvvəldən bilmirsiniz — sadəcə mövcud sahəyə uyğun sığan qədər element bir sətirdə, qalanı növbəti sətirdə göstərilsin istəyirsiniz. Flexbox bunu avtomatik edir:

```jsx
const boxes = new Array(10).fill(null).map((v, i) => i + 1);

export default function App() {
  return (
    <View style={styles.container}>
      {boxes.map((i) => (
        <Box key={i}>#{i}</Box>
      ))}
    </View>
  );
}
```

Hər child-ın ölçüsü həmin sətirdə neçəsinin sığacağını təyin edir — sətir sayını əvvəldən hesablamağa ehtiyac yoxdur.

### Flexible row + column birləşməsi

Sonuncu addım: row-ları column-lar daxilində (və ya əksinə) nest etmək. Bunun üçün iki köməkçi komponent kifayətdir:

```jsx
export default function Row({ children }) {
  return <View style={styles.row}>{children}</View>;
}
```

```jsx
export default function Column({ children }) {
  return <View style={styles.column}>{children}</View>;
}
```

Fərq yalnız tətbiq olunan stildədir (`row` və `column`) — hər ikisi sadəcə JSX-i daha oxunaqlı etmək üçün abstraksiyadır. Bu yanaşmayla, məsələn, `#1` və `#2`-ni bir `<Column>` daxilinə qoysanız, `#2` `#1`-in yanında yox, altında görünür — çünki ikisi də eyni column-un içindədir, bu column-lar isə öz növbəsində bir row-un daxilindədir.

## Nəticə

Flexbox React Native-də əsas layout mexanizmidir — veb-də öyrəşdiyiniz `flexDirection`, `justifyContent`, `alignItems`, `alignSelf` kimi property-lər burada da işləyir, sadəcə stillər CSS faylı yox, JavaScript obyekti şəklində yazılır.

> Sabit ölçülərlə (`width: 300`) qurulan layout portrait-də yaxşı görünsə də, landscape-də boş yer yaradır — `alignSelf: "stretch"` bu problemi aradan qaldırır və layout-u istənilən ekran ölçüsünə uyğunlaşdırır.

Növbəti fəsildə React Native tətbiqlərində naviqasiyanın necə qurulacağına baxılacaq.
