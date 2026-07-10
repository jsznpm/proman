# React-da Qlobal State: Komponentlər Arası Divarları Necə Yıxaq?

Əvvəlki yazılarda **state**-in nə olduğunu və `useState` hook-u ilə necə işlədiyini öyrəndik. State komponentin öz yaddaşıdır — dəyişəndə React UI-ni avtomatik yeniləyir. Amma bu, yalnız **bir komponentin daxilində** işləyir. Bəs tətbiqin fərqli, bir-birindən uzaq komponentləri eyni məlumatı paylaşmalı olanda nə etməli? Bu yazıda məhz bunu — **qlobal state** anlayışını — dərindən araşdıracağıq.

Bu yazıda aşağıdakı mövzular olacaq:

- Qlobal state nədir və niyə lazımdır?
- React Context API və `useReducer`
- Redux
- MobX

## Local state hardan çətinləşir?

`useState` bir komponent daxilində əla işləyir — sadə və effektivdir. Məsələn, iki input-u olan bir form komponenti təsəvvür et: hər input üçün ayrıca state yaradılıb, istifadəçi yazanda `onChange` işə düşür, state dəyişir, komponent yenidən render olunur və nəticə ekranda görünür. Hər şey sadədir.

Amma tətbiq böyüdükcə problem başlayır. Fərz et ki, formu doldurandan sonra serverə sorğu göndərib istifadəçini autentifikasiya etməli, sessiya açarı (session key) almalı, sonra həmin açarla istifadəçinin adı, soyadı və avatarı kimi məlumatlarını çəkməliyik. Sual dərhal ortaya çıxır: **bu məlumatları harada saxlayaq?**

İlk yol ağla gələn — məlumatı formun daxilində alıb, valideyn komponentə "yuxarı ötürmək" (lifting state up). Bunun üçün valideyn komponent (məsələn, login səhifəsi) özündə `session` və `user` üçün state yaradır, formuna isə `onSessionChange` və `onUserChange` kimi funksiyaları prop olaraq ötürür. Form öz daxilində `getSessionKey` və `getUser` funksiyalarını çağırır, server cavab verəndə isə məlumatı özündə saxlamır — valideyndən gələn funksiyaları çağırıb məlumatı yuxarı ötürür.

Bura qədər problemi həll etmiş kimi görünürük. Amma sonra istifadəçini uğurlu giriş nəticəsində tətbiqin ana səhifəsinə yönləndirməli oluruq. Eyni "yuxarı ötürmə" trikini bir də təkrarlaya bilərik, amma qabaqcadan düşünsək — istifadəçi məlumatını əldə etmək məntiqi yəqin ki, təkcə login formunun işi deyil, başqa səhifələrdə də lazım olacaq.

Nəticədə görürük ki, təkcə məlumatı deyil, **məlumatla işləmə məntiqini də** komponent ağacının daha yuxarısında saxlamalıyıq — çox vaxt lap kökdə (`App` komponentində). Bu şəkildə tətbiq getdikcə mürəkkəbləşir, çünki lazım olan bütün data və funksiyalar ən yuxarı komponentdən aşağı, bütün səhifə və komponentlərə ötürülməli olur.

Bu yanaşmanın iki əsas problemi var:

- **Həddindən artıq mürəkkəb komponent ağacı** — bütün vacib məlumat yuxarıdan aşağı props ilə ötürülməli olur. Bu, komponentləri bir-birinə sıx bağlayır (tightly coupled), kodu oxumağı və saxlamağı çətinləşdirir.
- **Performans problemi** — kök komponentdə `useState` ilə yaradılmış state hər dəyişəndə bütün tətbiq yenidən render olunur, çünki kök komponent yenidən çəkilir (re-render).

## Qlobal state nədir?

Yuxarıdakı şəkilə baxanda təbii sual yaranır: bəs komponentlər arasındakı bu sıx əlaqəni qırıb, bütün data və məntiqi komponentlərdən **kənara** çıxarmaq mümkündürmü? Məhz bu, qlobal state anlayışının mahiyyətidir.

> **Qlobal state** — tətbiqin müxtəlif səviyyə və komponentlərindən əlçatan və dəyişdirilə bilən mərkəzləşdirilmiş data idarəetmə yanaşmasıdır. O, local state-in məhdudiyyətlərini aradan qaldırır, komponentlər arasında data mübadiləsini asanlaşdırır və böyük layihələrdə state-in idarə olunmasını yaxşılaşdırır.

Qlobal state modelində data komponent ağacından kənarda, müstəqil yaşayır. Yalnız o məlumata həqiqətən ehtiyacı olan komponentlər ona birbaşa qoşulur (subscribe) və dəyişikliklərdən xəbərdar olur. Bunu belə düşün: props ötürmə üsulu poçt zənciri kimidir — məktubu qonşudan-qonşuya ötürürsən, kimsə arada unudarsa, məlumat çatmır. Qlobal state isə hamının girişi olan lövhə (elan taxtası) kimidir — kimə lazımdırsa, birbaşa ora baxır.

Qlobal state tətbiq olunanda iki problem birdən həll olunur:

- Komponent ağacı və asılılıqlar sadələşir, bu da tətbiqi böyütməyi və saxlamağı asanlaşdırır.
- Performans artır, çünki artıq yalnız qlobal state-ə abunə olan komponentlər dəyişiklikdə yenidən render olunur — bütün ağac yox.

Amma diqqət: **local state öz gücünü itirmir**. Qlobal state yalnız data müxtəlif səviyyələr arasında paylaşılmalı olanda üstünlük verir. Əgər hər dəyişəni qlobal state-ə köçürsək, faydası olmadan tətbiqi sadəcə mürəkkəbləşdirmiş olarıq.

İndi isə sual budur: qlobal state-i necə idarə edək? **State manager** — tətbiqdə mürəkkəb qarşılıqlı əlaqələri və böyük data həcmini idarə etməyə kömək edən vasitədir. O, bütün tətbiqin state-i üçün mərkəzləşdirilmiş anbar yaradır və yenilənmələri qaydalı, proqnozlaşdırıla bilən şəkildə idarə edir. Praktikada state manager-lər çox vaxt npm paketi kimi gəlir, amma React-in öz API-si ilə kitabxanasız da qlobal state qurmaq mümkündür. Gəl əvvəlcə bu yolu araşdıraq.

## React Context API və useReducer

Qlobal state-i özün qurmaq üçün React ekosistemində artıq mövcud olan alətlərdən — **Context API** və **`useReducer`**-dan istifadə edə bilərsən. Bunlar üçüncü tərəf state manager-i həddindən artıq görünəndə əla işləyən güclü ikilikdir və kompakt tətbiqlərdə qlobal state yaratmaq üçün idealdır.

**React Context API** məlumatı komponent ağacı boyu, hər səviyyədə prop ötürmədən ötürməyə imkan verir. Bu, dərin yerləşmiş komponentlərdə data-ya çatmağı asanlaşdırır və **prop drilling**-i (props-u çoxlu səviyyədən keçirməyi) azaldır. Context API xüsusilə mövzu (theme) ayarları, dil seçimi və ya istifadəçi məlumatı kimi data üçün faydalıdır.

Mövzu ayarını context ilə saxlamaq belə görünür:

```jsx
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const theme = 'dark';
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
```

Burada `createContext` funksiyası ilə `ThemeContext` yaradılıb, sonra tətbiqin kök komponentini əhatə edəcək `ThemeProvider` komponenti qurulub. Bu, ağacın istənilən dərinliyindən `useTheme` hook-u ilə (özü də `useContext`-dən qurulub) mövzuya çatmağa imkan verir:

```jsx
const MyComponent = () => {
  const theme = useTheme();
  return (
    <div>
      <p>Hazırkı mövzu: {theme}</p>
    </div>
  );
};
```

Komponent ağacının istənilən səviyyəsindən `useTheme` hook-u ilə hazırkı mövzuya çatmaq mümkündür.

İndi isə ikinin digərinə — qlobal state qurmağa kömək edən xüsusi hook-a — baxaq. **`useReducer`** — mürəkkəb state-i **reducer**-lər vasitəsilə idarə etməyə imkan verən hook-dur. Reducer — hazırkı state-i və bir action alıb yeni state qaytaran funksiyadır. `useReducer` mürəkkəb məntiq və ya çoxlu alt-state tələb edən vəziyyətlər üçün idealdır. Sadə sayğac (counter) nümunəsinə baxaq:

```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Say: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
```

Burada reducer iki action-a malikdir: sayğacı artırmaq və azaltmaq.

Context API ilə `useReducer`-in birləşməsi qlobal state yaratmaq və idarə etmək üçün güclü mexanizmdir. Bu yanaşma kiçik tətbiqlər üçün rahatdır — hazır və daha böyük state manager-lər burada artıq olardı. Amma qeyd etmək lazımdır ki, bu, performans problemini tam həll etmir: `useTheme` nümunəsindəki mövzu ya da sayğac nümunəsindəki dəyər dəyişəndə, provider və onunla bərabər bütün komponent ağacı yenidən render olunur. Bunun qarşısını almaq mümkündür, amma əlavə məntiq və kod tələb edir.

Buna görə mürəkkəb tətbiqlər daha güclü alət tələb edir. Bunun üçün hər biri öz xüsusiyyətləri olan və fərqli hallara uyğun bir neçə hazır həll var.

## Redux

Bu alətlərin birincisi, əlbəttə, **Redux**-dur. Xüsusilə React ilə istifadə ediləndə mürəkkəb JavaScript tətbiqlərində state idarə etmək üçün ən populyar vasitələrdən biridir. Redux tətbiqin state-ini vahid qlobal obyektdə saxlayaraq proqnozlaşdırıla bilən state idarəetməsi təqdim edir, bu da dəyişiklikləri izləməyi və data idarəetməsini sadələşdirir.

Redux üç əsas prinsipə əsaslanır: **vahid həqiqət mənbəyi** (bir qlobal state), **state read-only-dur** (dəyişməzdir, immutable) və **dəyişikliklər pure funksiyalar** (reducer-lər) vasitəsilə edilir. Bu prinsiplər qaydalı və nəzarət olunan data axını təmin edir.

```js
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const store = createStore(counterReducer);
store.subscribe(() => console.log(store.getState()));
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
```

Burada sayğac nümunəsindəki tətbiqin state-i həyata keçirilib. `counterReducer` — hazırkı state-i və üzərində icra ediləcək action-ı qəbul edən adi funksiyadır. Reducer həmişə **yeni** state qaytarır.

Redux dünyasında asinxron əməliyyatlar həyata keçirmək çətin məsələdir, çünki qutudan çıxan zaman yalnız üçüncü tərəf həllərinin istifadə etdiyi middleware təklif edir. Bu həllərdən biri **redux-thunk**-dır.

`redux-thunk` — action obyekti əvəzinə funksiya qaytaran action creator funksiyalarını çağırmağa imkan verən middleware-dir. Bu, action-un dispatch edilməsini gecikdirmək və ya asinxron sorğular vasitəsilə bir neçə action-u dispatch etmək imkanı verir.

```js
function fetchUserData() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_USER_DATA' });
    fetch('/api/user')
      .then((response) => response.json())
      .then((data) => dispatch({ type: 'FETCH_USER_DATA_SUCCESS', payload: data }))
      .catch((error) => dispatch({ type: 'FETCH_USER_DATA_ERROR', error }));
  };
}

const store = createStore(reducer, applyMiddleware(thunk));
store.dispatch(fetchUserData());
```

Göründüyü kimi, `fetchUserData` funksiyası state-i dərhal dəyişmir. Əvəzinə `dispatch` arqumentli başqa funksiya qaytarır. Bu `dispatch`-dan state-i dəyişmək üçün lazım qədər dəfə istifadə etmək olar.

Redux mürəkkəb qlobal state-i idarə etmək üçün əla uyğun gəlir. O, **time travel** kimi güclü debug alətləri təklif edir. Data ilə onun emalı arasındakı aydın ayrılıq sayəsində Redux state və məntiqin test edilməsini də asanlaşdırır.

Redux-u React ilə inteqrasiya etmək üçün **React-Redux** kitabxanası istifadə olunur. O, `Provider` komponentini və Redux store-u tətbiqinə asanlıqla qoşmağa imkan verən `useSelector` və `useDispatch` hook-larını təqdim edir.

```jsx
function Counter() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  return (
    <div>
      <div>Say: {count}</div>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}
```

Yuxarıdakı nümunədə `Counter` komponenti `useSelector` vasitəsilə Redux state-inə abunə olaraq işləyir. Bu abunəlik daha dəqiqdir (granular) — sayğacın dəyişməsi bütün tətbiqin deyil, yalnız bu hook-u çağıran spesifik komponentin yenidən render olunmasına səbəb olur.

Amma Redux-un çatışmazlıqlarını da qeyd etmək vacibdir. Ən populyar həll olsa da, şəxsi seçimimə mənfi təsir edən əhəmiyyətli problemləri var:

- **Redux çox söz tələb edir (verbose).** Böyük qlobal state yaratmaq reducer, action, selector və s. şəklində xeyli boilerplate kod yazmağı tələb edir.
- Layihə böyüdükcə Redux state-inin saxlanması və miqyaslanması mürəkkəbliyi qeyri-mütənasib şəkildə artır.
- State və layihə böyüdükcə tətbiqin performansı əhəmiyyətli dərəcədə azalır — hətta bir dəyəri `false`-dan `true`-ya dəyişmək belə çoxlu hesablama tələb edə bilər.
- Asinxron əməliyyatların icrası Redux-un qutudan çıxan versiyasında dəstəklənmir və əlavə həllər tələb edir, bu da layihəni anlamağı və saxlamağı daha da çətinləşdirir.
- State və biznes məntiqini lazy loading üçün hissələrə bölmək xeyli əmək tələb edir. Nəticədə tətbiqin ölçüsü, deməli ilkin yüklənmə sürəti də təsirlənir.

Bu çatışmazlıqlara baxmayaraq, bir çox şirkət və developer bu həlli hələ də istifadə edir, çünki əksər biznes tapşırıqlarına uyğundur — buna görə bu aləti tanımaq və onunla işləyə bilmək vacibdir.

## MobX

Qlobal state idarəetməsi üçün digər populyar həll **MobX** kitabxanasıdır. Bu kitabxana Redux-dan konsepsiya baxımından xeyli fərqlənir — bəzi cəhətdən hətta əksinədir.

MobX — data ilə reaktiv və çevik qarşılıqlı əlaqə təmin edən state idarəetmə kitabxanasıdır. Əsas ideyası tətbiq state-ini mümkün qədər sadə və şəffaf etməkdir — istənilən qədər yaradıla bilən və bir-birinin içinə yerləşdirilə bilən kiçik obyekt və class-lar vasitəsilə.

Texniki cəhətdən kitabxana təkcə bir qlobal state deyil, tətbiqin müəyyən funksionallığına birbaşa bağlı çoxlu kiçik obyekt yaratmağa imkan verir, bu da böyük tətbiqlərlə işləyəndə əhəmiyyətli üstünlük verir.

MobX-də tətbiqin state-i **observable** metodu ilə idarə olunur — bu, dəyişiklikləri avtomatik izləyir və bağlı **computed** dəyərlər ilə **reaction**-ları xəbərdar edir. Bu, tətbiqin state dəyişikliklərinə avtomatik reaksiya verməsinə imkan verir, data axınını sadələşdirir və çevikliyi artırır.

```js
class Store {
  @observable accessor count = 0;

  @computed get doubleCount() {
    return this.count * 2;
  }

  @action increment() {
    this.count += 1;
  }

  @action decrement() {
    this.count -= 1;
  }
}

const myStore = new Store();
```

Bu nümunədə eyni sayğac MobX ilə həyata keçirilib. Bir class-ın daxilində həm real data, həm hesablanmış (computed) data, həm də state-i dəyişmək üçün action-lar mövcuddur.

Asinxron əməliyyatlar barədə desək, MobX-də heç bir problem yoxdur — adi class daxilində işləyib promise qaytaran yeni metod əlavə etmək kifayətdir:

```js
class Store {
  @observable count = 0;

  @computed get doubleCount() {
    return this.count * 2;
  }

  @action increment() {
    this.count += 1;
  }

  @action decrement() {
    this.count -= 1;
  }

  @action async fetchCountFromServer() {
    const response = await fetch('/count');
    const data = await response.json();
    this.count = data.count;
  }
}

const myStore = new Store();
```

MobX yüksək performans və mürəkkəb data asılılıqlarının sadə idarəsini tələb edən tətbiqlər üçün əla uyğun gəlir. Mürəkkəb state-i idarə etmək üçün zərif və intuitiv yol təklif edir, developer-lərin state idarəetməsi əvəzinə biznes məntiqinə fokuslanmasına imkan verir.

Bu kitabxananın bir çatışmazlığı — state-i təşkil etməkdə verdiyi əhəmiyyətli sərbəstlikdir, bu da təcrübəsiz əllərdə çətinlik və miqyaslanma problemlərinə səbəb ola bilər. Məsələn, MobX obyekt datasına birbaşa müdaxiləyə imkan verir, bu komponent yenilənməsini tetikləyə bilər, amma böyük layihələrdə gözlənilməz state dəyişikliklərinə və debug çətinliklərinə də gətirib çıxara bilər. Eynilə, bu sərbəstlik çox vaxt kiçik, təmiz MobX class-larının bir-birinə sıx bağlanmasına səbəb olur, bu da testləməni və layihənin inkişafını çətinləşdirir.

MobX-i React ilə inteqrasiya etmək üçün **mobx-react** kitabxanası istifadə olunur, bu da `observer` funksiyasını təqdim edir. Bu, React komponentlərinin izlənən (observed) datadakı dəyişikliklərə avtomatik reaksiya verməsinə imkan verir.

```jsx
import React from 'react';
import { observer } from 'mobx-react';
import myStore from './myStore';

const Counter = observer(() => {
  return (
    <div>
      <div>Say: {myStore.count}</div>
      <div>İkiqat: {myStore.doubleCount}</div>
      <button onClick={() => myStore.increment()}>-</button>
      <button onClick={() => myStore.decrement()}>+</button>
    </div>
  );
});
```

Bu nümunədə eyni sayğac MobX ilə həyata keçirilib. Göründüyü kimi, state-ə çatmaq üçün nə hook, nə də onu tətbiqin context-ində saxlamaq üçün provider istifadə olunmur. Sadəcə dəyişəni fayldan import edib istifadə edirik. `Store` class-ından yaradılan `myStore` — state-in özüdür. Obyektin izlənən (observed) dəyərini komponentdə istifadə etmək çox asandır, çünki komponent həmin dəyərin bütün dəyişikliklərinə dərhal abunə olur və hər dəyişəndə yenidən render olunur.

Nümunələrdən görmək olar ki, MobX state idarəetməsi üçün nə qədər sadə və rahatdır. Sadəcə obyekt olduğundan, lazım gəldikdə onu lazy yükləmək və data artıq lazım olmayanda tətbiqin keş və yaddaşını təmizləmək çətin deyil. Bu güclü bir state idarəetmə alətidir və real layihədə sınamağı tövsiyə edirəm.

## Nəticə

Bu yazıda qlobal state-in nə olduğunu və onu necə idarə etməyi öyrəndik. Məhdud local state nümunəsi üzərindən — data tətbiqin müxtəlif səviyyələrindəki komponentlər arasında paylaşılmalı olanda qlobal state-in niyə vacib olduğunu müzakirə etdik.

React Context API və `useReducer` nümunəsini araşdırdıq və nə vaxt bunu, nə vaxt daha güclü state manager həllərinə üstünlük verməyi müəyyənləşdirdik. Sonra bu cür iki həlli — Redux və MobX-i — nəzərdən keçirdik.

Qısaca: local state — bir otağın öz açarı, qlobal state isə bütün binanın giriş kodudur. Kiçik tapşırıq üçün hər otağa ayrıca açar kifayətdir; amma bütün mərtəbələr eyni məlumata çatmalıdırsa, mərkəzi bir sistem qurmaq daha ağıllı seçimdir — sual yalnız bu sistemi hansı alətlə (Context+useReducer, Redux, yoxsa MobX) qurmağındadır.

Növbəti fəsildə server-side rendering-i və onun tətbiqlərimizə gətirdiyi üstünlükləri müzakirə edəcəyik.
