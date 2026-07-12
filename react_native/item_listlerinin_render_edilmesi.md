# React Native-də Siyahıları Necə Render Etməli?

Veb tətbiqdə siyahı qurmaq asandır — `<ul>` və `<li>` yaz, qurtardı. Mobil dünyada isə bu qədər sadə deyil: min ədəd elementi eyni anda ekrana çəksən, tətbiq donar, yaddaş dolar, scroll sıçrayır. React Native bu problemi `FlatList` komponenti ilə həll edir — iOS və Android-də eyni cür işləyən, hazır scroll və performans məntiqi olan siyahı komponenti.

Bu yazıda FlatList-in əsaslarından başlayıb, siyahını filtrləmə/sıralama idarəetmələri ilə zənginləşdirməyə, şəbəkədən (API-dan) məlumat çəkməyə, sonsuz scroll (infinite scroll) qurmağa və "dartıb yeniləmə" (pull-to-refresh) jestinə qədər gedəcəyik.

## FlatList əslində nə edir?

`FlatList` `data` prop-u qəbul edir — obyektlərdən ibarət array. Hər obyektin `key` xassəsi olmalıdır (React-də `<li>`-lərə `key` verməli olduğun kimi — React siyahı dəyişəndə hansı elementin dəyişdiyini bununla bilir). `key` yoxdursa, `keyExtractor` prop-u ilə hansı sahədən key çıxarılacağını özün göstərə bilərsən.

100 elementlik sadə siyahı belə qurulur:

```jsx
const data = new Array(100)
  .fill(null)
  .map((v, i) => ({ key: i.toString(), value: `Item ${i}` }));

export default function App() {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text style={styles.item}>{item.value}</Text>}
      />
    </View>
  );
}
```

`data` — 100 `null` dəyərlə doldurulmuş array-i map edərək yaradılan obyektlər toplusu. Hər obyektdə məcburi `key`, əlavə olaraq öz istədiyin `value` xassəsi var. `FlatList` mütləq `<View>` içində olmalıdır, çünki scroll işləməsi üçün konteynerin hündürlüyü (height) olmalıdır.

Stil tərəfi belədir:

```js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 40,
  },
  item: {
    margin: 5,
    padding: 5,
    color: "slategrey",
    backgroundColor: "ghostwhite",
    textAlign: "center",
  },
});
```

`container.flex: 1` konteynerə mövcud bütün hündürlüyü verir — bu olmasa scroll işləməz. `item` stili isə hər sətri fərqləndirir, əks halda hamısı sadəcə mətn kimi bir-birinə qarışardı.

> `FlatList` qəsdən "gic-gic" komponentdir — necə görünəcəyini o həll etmir, sənə buraxır. Onun işi yalnız: data dəyişəndə səmərəli yenidən render et, scroll ver.

## Filtrləmə və sıralama idarəetmələri

Sadə siyahı üzərinə axtarış və sıralama düymələri əlavə etmək istəyəndə, komponentləri parçalamaq mənalı olur. Struktur belədir:

- **ListContainer** — bütün state-i saxlayan əsas konteyner (React-in tanış "container pattern"-i)
- **List** — state-siz komponent, `ListControls`-a və `FlatList`-a lazımi parçaları ötürür
- **ListControls** — filtr və sıralama idarəetmələrini bir yerə yığan komponent
- **ListFilter** — mətnlə filtrləmə üçün input
- **ListSort** — sıralama istiqamətini (artan/azalan) dəyişən düymə
- **FlatList** — elementləri faktiki render edən React Native komponenti

Əgər siyahına idarəetmə lazımdırsa, bu bölünmə artıq yük deyil — əksinə, yaxşı düşünülmüş komponent arxitekturasından fayda görəcəksən.

Əvvəlcə köməkçi funksiyalar və data massivi:

```js
function mapItems(items) {
  return items.map((value, i) => ({ key: i.toString(), value }));
}

const array = new Array(100).fill(null).map((v, i) => `Item ${i}`);

function filterAndSort(text, asc) {
  return array
    .filter((i) => text.length === 0 || i.includes(text))
    .sort(
      asc
        ? (a, b) => (a > b ? 1 : a < b ? -1 : 0)
        : (a, b) => (b > a ? 1 : b < a ? -1 : 0)
    );
}
```

`ListContainer`-də `asc` (sıralama istiqaməti) və `filter` (axtarış mətni) state kimi saxlanır, nəticə isə `useMemo` ilə hesablanır:

```jsx
export default function ListContainer() {
  const [asc, setAsc] = useState(true);
  const [filter, setFilter] = useState("");

  const data = useMemo(() => {
    return filterAndSort(filter, asc);
  }, [filter, asc]);

  return (
    <List
      data={mapItems(data)}
      asc={asc}
      onFilter={(text) => setFilter(text)}
      onSort={() => setAsc(!asc)}
    />
  );
}
```

`useMemo` sayəsində `filter` və ya `asc` dəyişməyəndə nəticə yenidən hesablanmır — lazımsız iş görülmür. `ListContainer`-in tək işi: state-i saxlamaq və onu dəyişən funksiyaları uşaq komponentlərə ötürmək.

`List` komponenti sadədir — `FlatList`-i render edir, idarəetmələri isə `ListHeaderComponent` prop-u ilə siyahının başına yerləşdirir:

```jsx
export default function List({ data, ...props }) {
  return (
    <FlatList
      data={data}
      ListHeaderComponent={<ListControls {...props} />}
      renderItem={({ item }) => <Text style={styles.item}>{item.value}</Text>}
    />
  );
}
```

`ListHeaderComponent`-in üstünlüyü budur: idarəetmələr scroll olunan hissədən kənarda qalır, yəni istifadəçi nə qədər aşağı scroll etsə də, filtr və sıralama düymələri həmişə görünən qalır.

`ListControls` iki alt-idarəetməni birləşdirir:

```jsx
export default function ListControls({ onFilter, onSort, asc }) {
  return (
    <View style={styles.controls}>
      <ListFilter onFilter={onFilter} />
      <ListSort onSort={onSort} asc={asc} />
    </View>
  );
}
```

`ListFilter` sadə mətn inputudur:

```jsx
export default function ListFilter({ onFilter }) {
  return (
    <View>
      <TextInput
        autoFocus
        placeholder="Search"
        style={styles.filter}
        onChangeText={onFilter}
      />
    </View>
  );
}
```

`ListSort` isə ox işarəsinə basılanda sıralamanı dəyişən kiçik komponentdir:

```jsx
const arrows = new Map([
  [true, "▼"],
  [false, "▲"],
]);

export default function ListSort({ onSort, asc }) {
  return <Text onPress={onSort}>{arrows.get(asc)}</Text>;
}
```

Nəticədə: default olaraq siyahı artan sırada göstərilir, axtarış boşdursa placeholder "Search" görünür. İstifadəçi həm filtri, həm sıralamanı istənilən ardıcıllıqla dəyişə bilər — hər ikisi eyni `ListContainer` state-inin parçasıdır.

## Siyahı məlumatını API-dan çəkmək

Real layihədə data adətən backend-dən gəlir. Yaxşı xəbər budur ki, `fetch()` React Native-də veb-dəki kimi işləyir — kod demək olar eynidir.

Əvvəlcə `fetch()`-i təqlid edən mock API:

```js
const items = new Array(100).fill(null).map((v, i) => `Item ${i}`);

function filterAndSort(data, text, asc) {
  return data
    .filter((i) => text.length === 0 || i.includes(text))
    .sort(
      asc
        ? (a, b) => (b > a ? -1 : a === b ? 0 : 1)
        : (a, b) => (a > b ? -1 : a === b ? 0 : 1)
    );
}

export function fetchItems(filter, asc) {
  return new Promise((resolve) => {
    resolve({
      json: () =>
        Promise.resolve({
          items: filterAndSort(items, filter, asc),
        }),
    });
  });
}
```

İndi `ListContainer` lokal data yerinə `fetchItems()`-dən istifadə edir — komponent ilk yüklənəndə `useEffect` ilə data çəkilir:

```jsx
export default function ListContainer() {
  const [asc, setAsc] = useState(true);
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchItems(filter, asc)
      .then((resp) => resp.json())
      .then(({ items }) => {
        setData(mapItems(items));
      });
  }, []);

  return (
    <List
      data={data}
      asc={asc}
      onFilter={(text) => {
        fetchItems(text, asc)
          .then((resp) => resp.json())
          .then(({ items }) => {
            setFilter(text);
            setData(mapItems(items));
          });
      }}
      onSort={() => {
        fetchItems(filter, !asc)
          .then((resp) => resp.json())
          .then(({ items }) => {
            setAsc(!asc);
            setData(mapItems(items));
          });
      }}
    />
  );
}
```

Qayda sadədir: state-i dəyişən istənilən əməliyyat əvvəlcə `fetchItems()`-i çağırır, promise nəticələnəndə isə uyğun state yenilənir.

## Sonsuz scroll (lazy loading)

Bəzən istifadəçi konkret nə axtardığını bilmir — filtr/sıralama kömək etmir. Facebook lentini düşün: giriş edəndə axtarış deyil, scroll edərək kəşf edirsən. Bunun üçün `FlatList` siyahının sonuna çatanda yeni data çəkməlidir.

Test üçün sonsuz data mənbəyi lazımdır — generator bura mükəmməl uyğun gəlir:

```js
function* genItems() {
  let cnt = 0;
  while (true) {
    yield `Item ${cnt++}`;
  }
}

let items = genItems();

export function fetchItems({ refresh }) {
  if (refresh) {
    items = genItems();
  }
  return Promise.resolve({
    json: () =>
      Promise.resolve({
        items: new Array(30).fill(null).map(() => items.next().value),
      }),
  });
}
```

`ListContainer` isə hər çağırışda köhnə data-nın üstünə yenisini əlavə edir (əvəz etmir):

```jsx
import * as api from "./api";
import List from "./List";

export default function ListContainer() {
  const [data, setData] = useState([]);

  function fetchItems() {
    return api
      .fetchItems({})
      .then((resp) => resp.json())
      .then(({ items }) => {
        setData([
          ...data,
          ...items.map((value) => ({ key: value, value })),
        ]);
      });
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return <List data={data} fetchItems={fetchItems} />;
}
```

`List` komponenti isə `onEndReached` prop-unu istifadə edir — istifadəçi siyahının sonuna scroll edəndə bu funksiya avtomatik çağırılır:

```jsx
export default function List({ data, fetchItems }) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Text style={styles.item}>{item.value}</Text>}
      onEndReached={fetchItems}
    />
  );
}
```

Nəticədə: ekranın aşağısına yaxınlaşdıqca siyahı özü-özünə böyüyür. (Real layihədə əlbəttə hardasa dayanmalı, yəni backend-dən "daha data yoxdur" siqnalı gəlməlidir — amma məntiqin özü budur.)

## Dartıb yeniləmə (pull to refresh)

"Dartıb yeniləmə" jesti — ekranı barmaqla aşağı dartıb buraxanda content-in yenilənməsi — mobil dünyada çox tanış bir davranışdır. Bunu ilk dəfə Loren Brichter (Tweetie/Twitter for iPhone və Letterpress-in müəllifi) 2009-cu ildə tətbiq edib, sonra Apple bunu öz SDK-sına `UIRefreshControl` kimi daxil edib.

`FlatList`-də bunu aktivləşdirmək üçün cəmi iki prop kifayətdir:

```jsx
export default function List({ data, fetchItems, refreshItems, isRefreshing }) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Text style={styles.item}>{item.value}</Text>}
      onEndReached={fetchItems}
      onRefresh={refreshItems}
      refreshing={isRefreshing}
    />
  );
}
```

`onRefresh` — istifadəçi siyahını dartanda çağırılan funksiya. `refreshing` — `true` olanda yüklənmə spinner-i göstərir. `ListContainer`-də bunun üçün `isRefreshing` state-i saxlanır: API çağırışından əvvəl `true`, nəticə gələndən sonra `false` edilir. Beləcə `FlatList`-ə "yükləmə bitdi" siqnalı ötürülür.

## Nəticə

`FlatList` özü heç bir görünüş qərarı vermir — o, sadəcə data-nı səmərəli render etməyi və scroll-u idarə etməyi öz üzərinə götürür, qalan hər şeyi (necə göründüyünü) sənə buraxır. Bu yazıda gördün ki, eyni komponent üzərinə header-lə idarəetmə əlavə etmək (`ListHeaderComponent`), API-dan data çəkmək (`fetch`), sonsuz scroll qurmaq (`onEndReached`) və dartıb-yeniləmə (`onRefresh`/`refreshing`) əlavə etmək — hamısı bir neçə prop-la mümkündür.

Qısası: veb-də `<ul>`/`<li>` yazıb keçirsən, mobil-də isə `FlatList`-in verdiyi bu primitivləri necə birləşdirdiyin siyahının nə qədər "canlı" hiss olunacağını müəyyən edir.
