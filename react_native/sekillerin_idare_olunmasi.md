# React Native-də Şəkilləri Necə İdarə Etmək Olar?

Təsəvvür et: mobil tətbiq açırsan, amma ekranda tək mətn var — heç bir şəkil, heç bir ikon. Boş, cansız görünür, elə deyilmi? Veb tətbiqlər onsuz da çoxlu şəkil göstərir, amma mobil tətbiqlər üçün bu, hətta daha vacibdir — ekranın sahəsi məhduddur, ona görə hər piksel qiymətlidir və şəkillər az yerdə çox məna ötürməyin ən güclü vasitəsidir.

Bu yazıda React Native-in `Image` komponentini araşdıracağıq — şəkilləri müxtəlif mənbələrdən yükləməkdən tutmuş, ölçüsünü dəyişməyə, "lazy loading" ilə performansı qorumağa və `@expo/vector-icons` paketi ilə ikonlar göstərməyə qədər. Bu bölmələr mobil tətbiqlərdə şəkil və ikon işlətməyin ən çox rast gəlinən ssenarilərini əhatə edir:

* Şəkillərin yüklənməsi
* Şəkillərin ölçüsünün dəyişdirilməsi
* Lazy (tənbəl) şəkil yükləmə
* İkonların göstərilməsi

---

## Şəkillərin Yüklənməsi

`<Image>` komponenti digər React komponentləri kimi prop qəbul edir, amma bir fərqi var — işləməsi üçün mütləq şəkil datası (blob) lazımdır. **BLOB** (Binary Large Object — böyük ikili obyekt) termini böyük, strukturlaşdırılmamış ikili data saxlamaq üçün işlədilən data tipini bildirir. Şəkil, audio, video kimi media fayllar məhz BLOB şəklində saxlanılır.

Kod nümunəsinə baxaq:

```jsx
const reactLogo = "https://reactnative.dev/docs/assets/favicon.png";
const relayLogo = require("./assets/relay.png");

export default function App() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: reactLogo }} />
      <Image style={styles.image} source={relayLogo} />
    </View>
  );
}
```

Şəkil datasını `<Image>` komponentinə ötürməyin iki yolu var. Birinci yanaşma şəkli şəbəkədən (network) yükləyir — bunun üçün `source` prop-una `uri` sahəsi olan obyekt ötürülür. İkinci `<Image>` isə lokal şəkil faylından istifadə edir — bu, `require()` funksiyasını çağırıb, nəticəni birbaşa `source`-a ötürməklə edilir.

Bu şəkillərlə işlədilən stil belədir:

```js
image: {
  width: 100,
  height: 100,
  margin: 20,
},
```

Diqqət et: `width` və `height` stil xüsusiyyətləri olmadan şəkil ekranda ümumiyyətlə görünməyəcək. Növbəti bölmədə bu iki dəyər dəyişdikcə şəklin necə ölçüləndiyinə baxacağıq.

## Şəkillərin Ölçüsünün Dəyişdirilməsi

`Image` komponentinin `width` və `height` stil xüsusiyyətləri ekranda göstəriləcək ölçünü müəyyən edir. Məsələn, real layihələrdə çox vaxt orijinal ölçüsü lazım olandan qat-qat böyük şəkillərlə işləməli olursan — sadəcə `width`/`height` təyin etmək şəkli düzgün miqyaslamaq üçün kifayətdir.

Aşağıdakı nümunədə slider vasitəsilə şəklin ölçüsünü dinamik dəyişdirmək mümkündür:

```jsx
export default function App() {
  const source = require("./assets/flux.png");
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  return (
    <View style={styles.container}>
      <Image source={source} style={{ width, height }} />
      <Text>Width: {width}</Text>
      <Text>Height: {height}</Text>
      <Slider
        style={styles.slider}
        minimumValue={50}
        maximumValue={150}
        value={width}
        onValueChange={(value) => {
          setWidth(value);
          setHeight(value);
        }}
      />
    </View>
  );
}
```

Slider dəyəri dəyişən kimi həm `width`, həm də `height` state-i yenilənir və şəkil canlı olaraq böyüyür və ya kiçilir — heç bir əlavə render məntiqi lazım deyil, React özü halledir.

> `Image` komponentinə həmçinin `resizeMode` prop-u ötürmək mümkündür — bu, miqyaslanmış şəklin komponentin ölçüləri daxilində necə yerləşəcəyini müəyyən edir (məs. kəsilsin, tam sığsın, təkrarlansın). Bu xüsusiyyəti "İkonların Göstərilməsi" bölməsində əməli şəkildə görəcəyik.

Göründüyü kimi, şəklin ölçüsünü tam olaraq `width` və `height` idarə edir — hətta tətbiq işləyərkən bu dəyərləri dəyişməklə şəkli real vaxtda yenidən ölçüləndirmək mümkündür. İndi isə şəkillərin tənbəl (lazy) yüklənməsinə keçək.

## Lazy (Tənbəl) Şəkil Yükləmə

Bəzən şəklin məhz render olunduğu anda yüklənməsini istəmirsən — məsələn, hələ ekranda görünməyən bir elementi render edirsənsə. Əksər hallarda şəkil mənbəyini şəbəkədən əvvəlcədən çəkmək problem deyil, amma çoxlu şəkli eyni anda yükləmək performans problemi yaradırsa, lazy loading strategiyası köməyə çatır.

Mobil kontekstdə daha çox rast gəlinən ssenari isə budur: şəkil artıq ekranda göründüyü halda, şəbəkə cavab verməkdə gecikir. Bu zaman istifadəçiyə boş yer göstərmək əvəzinə, dərhal bir placeholder (yer tutucu) şəkil göstərmək daha məntiqlidir.

Əvvəlcə, əsl şəkli "sarıyan" bir abstraksiya yaradaq:

```tsx
const placeholder = require("./assets/placeholder.png");

type PlaceholderProps = {
  loaded: boolean;
  style: StyleProp<ImageStyle>;
};

function Placeholder({ loaded, style }: PlaceholderProps) {
  if (loaded) {
    return null;
  } else {
    return <Image style={style} source={placeholder} />;
  }
}
```

Burada placeholder şəkli yalnız əsl şəkil hələ yüklənməyibsə göstərilir:

```tsx
type Props = {
  style: StyleProp<ImageStyle>;
  resizeMode: ImageProps["resizeMode"];
  source: ImageSourcePropType | null;
};

export default function LazyImage({ style, resizeMode, source }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={style}>
      {!!source ? (
        <Image
          source={source}
          resizeMode={resizeMode}
          style={style}
          onLoad={() => {
            setLoaded(true);
          }}
        />
      ) : (
        <Placeholder loaded={loaded} style={style} />
      )}
    </View>
  );
}
```

Bu komponent daxilində iki `Image` olan bir `View` render edir. `loaded` adlı state başlanğıcda `false`-dur — bu müddətdə placeholder göstərilir. Əsl şəkil yükləndikdə `onLoad()` işə düşür, `loaded` `true`-ya çevrilir, placeholder yox olur və əsl şəkil görünür.

İndi `LazyImage` komponentini işə salaq. Əvvəlcə şəkli mənbəsiz render edəcəyik — placeholder görünəcək. Sonra düyməyə basanda əsl mənbə veriləcək və yükləndikdə placeholder əvəz olunacaq:

```tsx
const remote = "https://reactnative.dev/docs/assets/favicon.png";

export default function LazyLoading() {
  const [source, setSource] = useState<ImageSourcePropType | null>(null);

  return (
    <View style={styles.container}>
      <LazyImage
        style={{ width: 200, height: 150 }}
        resizeMode="contain"
        source={source}
      />
      <Button
        label="Load Remote"
        onPress={() => {
          setSource({ uri: remote });
        }}
      />
    </View>
  );
}
```

Şəbəkə sürətindən asılı olaraq, "Load Remote" düyməsini basdıqdan sonra da placeholder bir müddət ekranda qala bilər. Bu, bilərəkdən belədir — əsl şəklin göstərilməyə tam hazır olduğuna əmin olmayana qədər placeholder-i silmək istəmirik. Yarımçıq yüklənmiş şəkil göstərməkdənsə, sabit placeholder daha yaxşı təcrübədir.

## İkonların Göstərilməsi

Sonuncu bölmədə React Native komponentlərində ikon göstərməyi öyrənəcəyik. Veb tətbiqlərdə ikonlar mənanı daha aydın çatdırır və istifadəçi təcrübəsini yaxşılaşdırır — mobil tətbiqlərdə də fərq yoxdur.

Bunun üçün `@expo/vector-icons` paketindən istifadə edəcəyik — bu paket müxtəlif vektor font dəstlərini React Native tətbiqinə gətirir. Expo əsaslı layihələrdə bu paket artıq mövcuddur, sadəcə `Icon` komponentlərini import edib göstərmək kifayətdir.

Seçilmiş kateqoriyaya əsasən FontAwesome ikonlarını göstərən nümunəyə baxaq:

```tsx
export default function RenderingIcons() {
  const [selected, setSelected] = useState<IconsType>("web_app_icons");
  const [listSource, setListSource] = useState<IconName[]>([]);
  const categories = Object.keys(iconNames);

  function updateListSource(selected: IconsType) {
    const listSource = iconNames[selected] as any;
    setListSource(listSource);
    setSelected(selected);
  }

  useEffect(() => {
    updateListSource(selected);
  }, []);

  // ...
}
```

Burada ikon datasını saxlamaq və yeniləmək üçün lazım olan bütün məntiq təyin olunub. İndi bunu görünüş (layout) qatına tətbiq edək:

```tsx
return (
  <View style={styles.container}>
    <View style={styles.picker}>
      <Picker selectedValue={selected} onValueChange={updateListSource}>
        {categories.map((category) => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>
    </View>
    <FlatList
      style={styles.icons}
      data={listSource.map((value, key) => ({ key: key.toString(), value }))}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Icon name={item.value} style={styles.itemIcon} />
          <Text style={styles.itemText}>{item.value}</Text>
        </View>
      )}
    />
  </View>
);
```

`Picker` istifadəçiyə kateqoriya seçməyə imkan verir, seçim dəyişəndə `updateListSource` çağırılıb `listSource` yenilənir. `FlatList` isə həmin siyahını sadalayır — hər sətirdə `Icon` komponenti ilə ikonun özü, yanında da adı (`itemText`) göstərilir.

> Bir `Picker` + bir `FlatList` — bax bu qədər sadə şəkildə yüzlərlə ikonu kateqoriyalara bölüb, axtarıla bilən formada göstərmək mümkündür.

## Nəticə

Şəkillər mobil tətbiqdə də veb qədər, bəlkə daha da vacibdir — istifadəçi təcrübəsini zənginləşdirir. Bu yazıda dörd fərqli bacarığı gördük: şəkilləri həm şəbəkədən, həm lokal fayldan yükləməyi, `width`/`height` ilə ölçüləndirməyi, yavaş şəbəkədə placeholder göstərməklə "lazy" yükləməni, və nəhayət `@expo/vector-icons` ilə ikonları render etməyi.

Qısası: **boş ekran əvəzinə — hətta yüklənərkən belə — istifadəçiyə həmişə nəyisə göstər.** Növbəti mövzu isə tətbiqin oflayn işləməsinə imkan verən lokal storage olacaq.
