# React Native Tətbiqi Şəbəkəsiz Necə İşləyir?

Metroda, liftdə, ya da kənd yerində — internet bir anda yox olur. İstifadəçi bunu bilmir, sadəcə düyməyə basır və heç nə baş vermir. Əgər tətbiqin bu anı idarə etməyi bacarmırsa, istifadəçi sadəcə başqa tətbiqə keçəcək.

Şəbəkə olmayanda data-nı cihazda saxlamaq lazımdır. Bəzən isə tətbiqin ümumiyyətlə şəbəkəyə ehtiyacı olmur — o zaman da yenə lokal saxlama lazımdır. Bu yazıda React Native ilə üç şeyi öyrənəcəyik:

* Şəbəkə vəziyyətini necə aşkarlamaq olar
* Data-nı cihazda necə saxlamaq olar
* Şəbəkə kəsildiyi müddətdə saxlanan data-nı, şəbəkə qayıdanda necə sinxronlaşdırmaq olar

---

## Şəbəkə Vəziyyətini Aşkarlamaq

`fetch()` ilə şəbəkə sorğusu edərkən, əgər cihaz offline-dırsa, xəta baş verəcək. Bu cür xətalar üçün error-handling kodun onsuz da var — server də fərqli səbəblərdən xəta qaytara bilər axı. Amma şəbəkə problemi fərqli bir haldır: istifadəçi sorğu göndərməzdən **əvvəl** bunu bilmək daha yaxşıdır.

Bunu əvvəlcədən aşkarlamağın iki faydası var:

* İstifadəçini xəbərdar etmək olar — "şəbəkə yoxdur, hazırda heç nə edə bilməzsən" kimi mesajla
* Offline halda hansı əməliyyatların ediləcəyini hazırlamaq və şəbəkə qayıdanda state-i sinxronlaşdırmaq olar

`@react-native-community/netinfo` paketindəki `NetInfo` utiliti şəbəkə vəziyyətindəki dəyişiklikləri izləmək üçün istifadə olunur:

```jsx
const connectedMap = {
  none: "Disconnected",
  unknown: "Disconnected",
  cellular: "Connected",
  wifi: "Connected",
  bluetooth: "Connected",
  ethernet: "Connected",
  wimax: "Connected",
  vpn: "Connected",
  other: "Connected",
} as const;
```

`connectedMap` bütün mümkün connection tiplərini əhatə edir və ekranda göstərmək üçün istifadə olunur. İndi bunu `App` komponentində işə salaq:

```jsx
export default function App() {
  const [connected, setConnected] = useState("");

  useEffect(() => {
    function onNetworkChange(connection: NetInfoState) {
      const type = connection.type;
      setConnected(connectedMap[type]);
    }
    const unsubscribe = NetInfo.addEventListener(onNetworkChange);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>{connected}</Text>
    </View>
  );
}
```

`NetInfo.addEventListener` şəbəkə vəziyyəti dəyişəndə `onNetworkChange` funksiyasını çağırır, o da `connected` state-ini yeniləyir. Cihazın Wi-Fi-ını söndürsən, ekranda "Connected" yazısı dərhal "Disconnected"-ə dəyişəcək.

Bu, ən sadə istifadə nümunəsidir. İstifadəçini xəbərdar etməklə yanaşı, şəbəkə olmayanda API sorğularının qarşısını almaq da olar. Amma daha faydalı yanaşma — istifadəçinin daxil etdiyi məlumatları lokal saxlamaq və şəbəkə qayıdanda göndərməkdir. Növbəti bölmədə bunu araşdıraq.

## Data-nı Cihazda Saxlamaq: AsyncStorage

Cihazda data saxlamaq üçün cross-platform həll — `AsyncStorage` API-dır. Həm iOS-da, həm Android-da eyni işləyir. İki halda istifadə olunur: tətbiqin ümumiyyətlə şəbəkəyə ehtiyacı yoxdursa, ya da şəbəkə qayıdanda API ilə sinxronlaşdırılacaq data-nı müvəqqəti saxlamaq lazımdırsa.

Quraşdırmaq üçün:

```bash
npx expo install @react-native-async-storage/async-storage
```

İstifadəçi key/value cütü daxil edib saxlaya bilsin deyə state-lər lazımdır:

```jsx
export default function App() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [source, setSource] = useState<KeyValuePair[]>([]);
```

Data-nı saxlamaq, silmək və yükləmək üçün funksiyalar:

```jsx
  function setItem() {
    return AsyncStorage.setItem(key, value)
      .then(() => {
        setKey("");
        setValue("");
      })
      .then(loadItems);
  }

  function clearItems() {
    return AsyncStorage.clear();
  }

  async function loadItems() {
    const keys = await AsyncStorage.getAllKeys();
    const values = await AsyncStorage.multiGet(keys);
    setSource([...values]);
  }

  useEffect(() => {
    loadItems();
  }, []);
```

`setItem` yeni cütü yazır, input-ları təmizləyir, sonra siyahını yenidən yükləyir. `loadItems` isə iki addımlı asinxron əməliyyatdır: əvvəl bütün key-ləri, sonra onların value-larını alır. `useEffect` tətbiq açılanda saxlanmış data-nı avtomatik yükləyir.

Markup tərəfi — input-lar, düymələr və siyahı:

```jsx
  return (
    <View style={styles.container}>
      <Text>Key:</Text>
      <TextInput
        style={styles.input}
        value={key}
        onChangeText={(v) => {
          setKey(v);
        }}
      />
      <Text>Value:</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(v) => {
          setValue(v);
        }}
      />
      <View style={styles.controls}>
        <Button label="Add" onPress={setItem} />
        <Button label="Clear" onPress={clearItems} />
      </View>
      <View style={styles.list}>
        <FlatList
          data={source.map(([key, value]) => ({
            key: key.toString(),
            value,
          }))}
          renderItem={({ item: { value, key } }) => (
            <Text>
              {value} ({key})
            </Text>
          )}
        />
      </View>
    </View>
  );
```

"Add" düyməsi yeni cütü saxlayır, "Clear" isə hamısını silir. `FlatList` isə saxlanmış bütün key/value cütlərini göstərir.

> `AsyncStorage` iOS-da və Android-da tamam fərqli mexanizmlərlə işləyir, amma React Native eyni sadə API-nı üzə çıxarır — çünki API özü sadəcə key-value cütüdür. Bundan artıq mürəkkəblik (məsələn, sorğulama, indekslənmə) developerin öz üzərinə düşür.

`setItem` niyə iki `.then()` zənciri ilə yazılıb? Çünki UI-nı responsive saxlamaq lazımdır — disk-ə yazma davam edərkən ekranın bloklanmaması vacibdir. Elə buna görə `loadItems` da key-ləri və value-ları iki ayrı asinxron addımda alır.

## Data-nı Sinxronlaşdırmaq

İndi bu iki mövzunu birləşdirək: şəbəkə kəsiləndə tətbiq işləməyə davam etsin, qayıdanda isə saxlanan dəyişiklikləri özü göndərsin.

Əsas fikir sadədir: cihaz online-dırsa, sorğunu birbaşa şəbəkəyə göndər. Offline-dırsa, dəyişikliyi lokal saxla. Sonra şəbəkə qayıdanda, saxlanmış dəyişiklikləri remote API-a göndər.

Bunun üçün React komponentləri ilə şəbəkə çağırışları arasında bir abstraksiya lazımdır — `store.ts` adlı modul:

```jsx
export function set(key: Key, value: boolean) {
  return new Promise((resolve, reject) => {
    if (connected) {
      fakeNetworkData[key] = value;
      resolve(true);
    } else {
      AsyncStorage.setItem(key, value.toString()).then(
        () => {
          unsynced.push(key);
          resolve(false);
        },
        (err) => reject(err)
      );
    }
  });
}
```

`set()` `connected` dəyişəninə baxır: online-dırsa, data birbaşa (bu nümunədə mock edilmiş) `fakeNetworkData`-ya yazılır və `true` qaytarılır. Offline-dırsa, `AsyncStorage`-a yazılır, key `unsynced` siyahısına əlavə olunur və `false` qaytarılır — beləliklə çağıran tərəf nəticənin online, yoxsa offline saxlandığını bilir.

`get()` da eyni məntiqlə işləyir:

```jsx
export function get(key?: Key): Promise<boolean | typeof fakeNetworkData> {
  return new Promise((resolve, reject) => {
    if (connected) {
      resolve(key ? fakeNetworkData[key] : fakeNetworkData);
    } else if (key) {
      AsyncStorage.getItem(key)
        .then((item) => resolve(item === "true"))
        .catch((err) => reject(err));
    } else {
      AsyncStorage.getAllKeys()
        .then((keys) =>
          AsyncStorage.multiGet(keys).then((items) =>
            resolve(Object.fromEntries(items) as any)
          )
        )
        .catch((err) => reject(err));
    }
  });
}
```

`key` verilibsə, yalnız o key üçün dəyər qaytarılır; verilməyibsə, bütün data — ya `fakeNetworkData`-dan, ya da `AsyncStorage`-dan — qaytarılır.

Modulun daha iki vəzifəsi var: `connected` state-ini izləmək və şəbəkə qayıdanda avtomatik sinxronizasiya etmək:

```jsx
NetInfo.fetch().then(
  (connection) => {
    connected = ["wifi", "unknown"].includes(connection.type);
  },
  () => {
    connected = false;
  }
);

NetInfo.addEventListener((connection) => {
  connected = ["wifi", "unknown"].includes(connection.type);
  if (connected && unsynced.length) {
    AsyncStorage.multiGet(unsynced).then((items) => {
      items.forEach(([key, val]) => set(key as Key, val === "true"));
      unsynced.length = 0;
    });
  }
});
```

`NetInfo.fetch()` başlanğıc `connected` dəyərini təyin edir. `NetInfo.addEventListener` isə hər dəyişiklikdə işə düşür: şəbəkə qayıtdıqda, `unsynced` siyahısındakı hər key yenidən `set()` ilə göndərilir — beləliklə offline saxlanan dəyişikliklər özü-özünə remote-a çatır.

> Diqqət: bu modulu istifadə edən komponent əvvəlcə şəbəkə vəziyyətini yoxlamalıdır. Əks halda `get()` funksiyası, şəbəkə əslində varkən belə, offline sayıla bilər.

İndi bu funksiyaları istifadə edən `App` komponentinə baxaq. Üç `Switch` komponentinin state-ini idarə edəcəyik:

```jsx
export default function App() {
  const [message, setMessage] = useState<string | null>(null);
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const setters = new Map([
    ["first", setFirst],
    ["second", setSecond],
    ["third", setThird],
  ]);
```

`save()` funksiyası hər üç `Switch` üçün təkrar istifadə oluna bilən bir handler yaradır:

```jsx
  function save(key: Key) {
    return (value: boolean) => {
      set(key, value).then(
        (connected) => {
          setters.get(key)?.(value);
          setMessage(connected ? null : "Saved Offline");
        },
        (err) => {
          setMessage(err);
        }
      );
    };
  }
```

`set()` `true` qaytarsa (online), mesaj təmizlənir. `false` qaytarsa (offline), istifadəçiyə "Saved Offline" mesajı göstərilir — beləliklə istifadəçi dəyişikliyin itmədiyini, sadəcə növbəyə düşdüyünü bilir.

Tətbiq açılanda saxlanmış data-nı yükləmək üçün:

```jsx
  useEffect(() => {
    NetInfo.fetch().then(() =>
      get().then(
        (items) => {
          for (let [key, value] of Object.entries(items)) {
            setters.get(key)?.(value);
          }
        },
        (err) => {
          setMessage(err);
        }
      )
    );
  }, []);
```

Əvvəlcə `NetInfo.fetch()` ilə şəbəkə vəziyyəti təyin olunur, yalnız bundan sonra `get()` çağırılır — çünki əks halda `get()` səhv olaraq offline rejimi güman edərdi.

Son olaraq markup:

```jsx
  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <View>
        <Text>First</Text>
        <Switch value={first} onValueChange={save("first")} />
      </View>
      <View>
        <Text>Second</Text>
        <Switch value={second} onValueChange={save("second")} />
      </View>
      <View>
        <Text>Third</Text>
        <Switch value={third} onValueChange={save("third")} />
      </View>
    </View>
  );
```

Nəticədə: üç `Switch`, hər biri öz key-i ilə `save()`-ə bağlıdır. İstifadəçi hansını dəyişsə, arxada `set()`/`get()` abstraksiyası online/offline fərqini gizlədir — komponentin özü heç vaxt bununla məşğul olmur.

> "Saved Offline" mesajını yalnız UI-da nəsə dəyişəndən sonra görəcəksən — açılışda avtomatik göstərilmir.

## Nəticə

Bu yazıda offline dəstəyinin üç qatını gördük:

* `NetInfo` ilə şəbəkə vəziyyətini real-time izləmək
* `AsyncStorage` ilə cihazda key-value data saxlamaq
* `set()`/`get()` abstraksiyası ilə online/offline məntiqini komponentlərdən gizlətmək, şəbəkə qayıdanda isə saxlanmış dəyişiklikləri avtomatik sinxronlaşdırmaq

> Şəbəkəni həmişə var sayan tətbiq — bir gün istifadəçisini itirir. Offline-ı əvvəlcədən düşünən tətbiq isə, şəbəkə kəsiləndə belə, işini davam etdirir.
