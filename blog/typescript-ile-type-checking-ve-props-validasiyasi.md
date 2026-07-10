# Komponentin Nə Gözlədiyini Bilmirsənsə, Bug Səni Tapır: TypeScript ilə Type-Checking

Hər tətbiqdə proqnozlaşdırıla bilənlik (predictability) vacibdir. Proqnozlaşdırıla bilən tətbiq gözlənilən şəkildə davranır — az bug, yaxşı user experience, asan saxlanma. React kontekstində proqnozlaşdırıla bilənlik çox vaxt komponentlərin aldıqları **props**-lara görə necə davrandığı ilə bağlıdır. Props (properties-in qısası) komponentə giriş məlumatıdır, onun davranışını və render-ini müəyyən edir. Məhz burda **props validasiyası** anlayışı işə düşür.

## Props validasiyası niyə vacibdir

Props validasiyası komponentin düzgün tipdə məlumat aldığını təmin etmə üsuludur. Bu, komponentlər arası bir növ müqavilədir: komponent hansı tip props gözlədiyini bildirəndə, əslində "bu tip props alsam, belə davranacam" deyə söz verir.

Props validasiyası bir neçə səbəbə görə vacibdir:

- **Xətaları erkən tutur** — komponent gözlənilməz tipdə prop alanda gözlənilməz davranır, tapılması çətin bug-lara səbəb olur. Validasiya ilə bu xətaları problem yaratmazdan əvvəl tuturuq.
- **Kod oxunaqlılığını artırır** — komponentin prop tiplərinə baxaraq nə tip məlumat gözlədiyini tez anlayırsan. Bu, komponenti tətbiq boyu istifadə etməyi və təkrar istifadə etməyi asanlaşdırır.
- **Komponenti proqnozlaşdırıla bilən edir** — komponent hansı tip props gözlədiyini aydın bildirəndə, onun necə davranacağını anlamaq daha asan olur.

### Validasiya olmadan nə baş verir

Kifayət qədər props validasiyası olmadan komponentlər proqnozlaşdırılmaz və bug-a meyilli olur. Bu komponentə bax:

```jsx
const MyList = ({ list }) => (
  <ul>
    {list.map((user) => (
      <li key={user.name}>
        {user.name} ({user.email})
      </li>
    ))}
  </ul>
);
```

Burda komponent `list` adlı prop gözləyir — `name` və `email` sahələri olan obyektlərdən ibarət array. Əgər bu komponentə `list` kimi string, rəqəm, hətta obyektsiz array göndərilsə, komponent `user.name` ya da `user.email`-ə çatmağa çalışacaq və xəta verəcək.

Bu cür xətaların debug edilməsi, xüsusən çoxlu komponenti olan böyük tətbiqlərdə, çətindir. Komponentin hər sətirini oxumadan ona nə göndərməli olduğunu anlamaq da çətinləşir. Nəticədə tətbiq çökə, ya da gözlənilməz davrana bilər. Bəs komponentlərə elə bir props validasiyası əlavə etsək ki, bu xətaları erkən tutsun və komponentin gözlənilən kimi davranmasını təmin etsin?

## Props validasiyası üçün seçimlər

React və React Native-də props validasiyası üçün bir neçə alət var. Biri **PropTypes** — komponentin gözlədiyi prop tiplərini müəyyən edən kitabxana. Digəri **TypeScript** — JavaScript-in statik tip yoxlaması (static type-checking) üçün güclü alətlər təqdim edən superset-i.

PropTypes ilə `MyList` komponenti belə görünür:

```jsx
import PropTypes from 'prop-types';

const MyList = ({ list }) => (
  <ul>
    {list.map((user) => (
      <li key={user.name}>
        {user.name} ({user.email})
      </li>
    ))}
  </ul>
);

MyList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
};
```

Burda PropTypes ilə deyirik ki, `list` prop-u obyektlərdən ibarət array olmalıdır, hər obyektin isə string tipli `name` və `email` sahəsi olmalıdır.

İndi eyni komponentin TypeScript versiyasına bax:

```tsx
type User = {
  name: string;
  email: string;
};

type MyListProps = {
  list: User[];
};

const MyList = ({ list }: MyListProps) => (
  <ul>
    {list.map((user) => (
      <li key={user.name}>
        {user.name} ({user.email})
      </li>
    ))}
  </ul>
);
```

Burda `User` və `MyListProps` tiplərini müəyyən edirik. `User` — `name` və `email` sahəsi olan (hər ikisi string) obyekt. `MyListProps` isə `User` obyektlərindən ibarət array olan `list` sahəsi olan obyekt.

PropTypes də, TypeScript də props validasiyası üçün dəyərlidir, amma TypeScript daha geniş və güclü tip yoxlama yanaşması təqdim edir və React/React Native community-də getdikcə populyarlaşır. Ona görə bundan sonra TypeScript-ə fokuslanacağıq.

## TypeScript nədir

TypeScript — Microsoft tərəfindən inkişaf etdirilib saxlanılan, JavaScript-in statik tipli superset-idir. Yəni JavaScript-ə əlavə xüsusiyyətlər qatır, bunların ən önəmlisi **statik tipləmə**-dir. JavaScript dinamik tipli olduğu halda, TypeScript sənə dəyişənlərin, funksiya parametrlərinin və qaytarılan dəyərlərin hansı tip data ola biləcəyini açıq şəkildə müəyyən etmə imkanı verən tip sistemi təqdim edir.

TypeScript tam JavaScript-lə uyğundur — istənilən düzgün JavaScript kodu eyni zamanda düzgün TypeScript kodudur. TypeScript transpiler (bir növ compiler) istifadə edərək browser-in birbaşa anlamadığı TypeScript kodunu, JavaScript-in işlədiyi istənilən mühitdə işləyə bilən JavaScript koduna çevirir.

Bu JavaScript funksiyasına bax:

```js
function greet(name) {
  return "Hello, " + name;
}

console.log(greet("Mike")); // "Hello, Mike"
console.log(greet(32)); // "Hello, 32"
```

Bu funksiya string arqument verəndə gözlənilən kimi işləyir. Amma rəqəm versən, məntiqsiz olsa da, xəta vermir.

İndi eyni funksiyanı TypeScript-də necə yazacağımıza bax:

```ts
function greet(name: string) {
  return "Hello, " + name;
}

console.log(greet("Mike")); // "Hello, Mike"
console.log(greet(32)); // Xəta: 'number' tipli arqument 'string' tipli parametrə uyğun deyil.
```

TypeScript versiyasında `name` parametrinə tip annotasiyası əlavə etmişik. Bu, TypeScript-ə deyir ki, `name` həmişə string olmalıdır. `greet`-i rəqəmlə çağırmağa çalışsaq, TypeScript xəta verəcək. Bu, kodu işə salmazdan əvvəl belə səhvi tutmağa kömək edir.

> Bunu belə düşün: TypeScript, kodun daxilinə girib "bura elə bax, bu problemli ola bilər" deyən köməkçi bir ko-pilot kimidir — problem böyüməzdən əvvəl onu göstərir.

### TypeScript niyə istifadə etməli

- **Xətaları erkən tutur** — compile zamanı, hətta kodu işə salmadan əvvəl xətaları tuta bilir. Bu, adi JavaScript-də runtime-a qədər tutulmayan bir çox ümumi xətanın qarşısını alır.
- **Kod oxunaqlılığını artırır** — tip annotasiyaları funksiyanın hansı tip arqument gözlədiyini və nə qaytardığını aydın göstərir. Bu, eyni kod bazası üzərində işləyən digər developer-lər üçün kodu daha anlaşıqlı edir.
- **Refactoring-i asanlaşdırır** — statik tipləmə sayəsində dəyişənin tipini ya da funksiyanın signature-ini dəyişəndə, TypeScript kodun harada uyğun dəyişiklik lazım olduğunu tapmağa kömək edir.
- **Community və tooling dəstəyi** — Microsoft, Google, Airbnb kimi böyük şirkətlər TypeScript istifadə edir. Bu, böyük community dəstəyi və resurs deməkdir. Çoxlu code editor autocompletion, type inference, error highlighting kimi xüsusiyyətlərlə TypeScript-i əla dəstəkləyir.
- **Müasir framework və kitabxanalarla inteqrasiya** — React və React Native kimi framework-lər built-in TypeScript definition-ları ilə gəlir. Populyar JavaScript kitabxanalarının böyük əksəriyyətinin də TypeScript definition-ları var.
- **İş bazarında artan tələb** — TypeScript-ə tələb, xüsusən React/React Native rollarında, sürətlə artır. TypeScript öyrənmək həm layihələrin, həm də karyeranın üçün dəyərli investisiyadır.

## Layihədə TypeScript qurulması

Vite React-TypeScript template-i ilə yeni layihə yaratmaq üçün:

```bash
npm create vite@latest my-react-app -- --template react-ts
```

Bu, TypeScript daxil olan `react-ts` template-i ilə yeni Vite layihəsi yaradır. Layihənin kökündə TypeScript-i konfiqurasiya edən `tsconfig.json` faylı olacaq:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

Bu ayarlar TypeScript-ə deyir ki, kodu JavaScript-in ən son versiyasına compile et (`target: "esnext"`), ən son module sistemini istifadə et (`module: "esnext"`), React 17-də tanıdılan yeni JSX transform-u istifadə et (`jsx: "react-jsx"`). `strict: true` isə daha çox xətanı tutmaq üçün geniş tip-yoxlama davranışını aktivləşdirir.

TypeScript JavaScript-dən fərqli fayl uzantıları istifadə edir: JSX olmayan fayllar üçün `.ts`, JSX olanlar üçün `.tsx`. İlk TypeScript React komponentimizi yaradaq:

```tsx
type AppProps = {
  message: string;
};

function App({ message }: AppProps) {
  return <div>{message}</div>;
}
```

Burda `App` komponentinin props-u üçün `AppProps` tipini müəyyən etmişik. Bu, TypeScript-ə deyir ki, `message` prop-u string olmalıdır.

Layihəni işə salmaq üçün:

```bash
npm run dev
```

Bu, Vite dev server-ini başladır. Kodda tip xətası varsa, TypeScript bunu console-da da göstərəcək.

## TypeScript-in əsas tipləri

TypeScript-in ən güclü xüsusiyyətlərindən biri zəngin tip sistemidir. Dəyişənin tipini müəyyən etmək üçün dəyişən adından sonra iki nöqtə (`:`) qoyub tipi yazırsan.

- **Boolean** — true/false dəyər:
  ```ts
  let isDone: boolean = false;
  ```
- **Number** — JavaScript-də olduğu kimi bütün rəqəmlər floating point dəyərdir, `number` tipini alır:
  ```ts
  let age: number = 32;
  ```
- **String** — mətn (textual) data üçün:
  ```ts
  let color: string = "blue";
  ```
- **Array** — element tipindən sonra `[]` yazaraq, ya da generic `Array<elemType>` şəklində:
  ```ts
  let list: number[] = [1, 2, 3];
  let list2: Array<number> = [1, 2, 3];
  ```
- **Tuple** — sayı sabit olan, amma elementlərin tipi eyni olmaq məcburiyyətində olmayan array. Məsələn string və number cütü:
  ```ts
  let x: [string, number];
  x = ["hello", 10]; // OK
  ```
- **Enum** — rəqəm dəstlərinə daha "dostluq" ad vermə üsulu:
  ```ts
  enum Color {
    Red,
    Green,
    Blue,
  }
  let c: Color = Color.Green;
  ```
- **Any** — yazarkən tipini bilmədiyimiz dəyişənlər üçün (məsələn, user-dən ya da 3-cü tərəf kitabxanadan gələn dinamik data). Bu tiplə compile-time yoxlamasından tam çıxırsan:
  ```ts
  let notSure: any = 4;
  notSure = "maybe a string instead";
  notSure = false; // OK, kəsinliklə boolean
  ```
- **Unknown** — `any`-nin tip-təhlükəsiz qarşılığı. Hər şey `unknown`-a assign oluna bilər, amma `unknown` özündən başqa heç nəyə (type assertion ya da narrowing olmadan) assign oluna bilməz:
  ```ts
  let notSure: unknown = 4;
  notSure = "maybe a string instead";
  notSure = false; // OK, structural typing sayəsində

  let surelyNotAString: string = notSure; // Xəta: 'unknown' 'string'-ə assign oluna bilməz
  ```
  Tipik istifadə sahəsi `catch` bloklarıdır, çünki error obyektinin tipi əvvəlcədən bilinmir:
  ```ts
  try {
    // xəta verə biləcək əməliyyat
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
  ```
- **Void** — heç bir dəyər qaytarmayan funksiyanın return tipi kimi:
  ```ts
  function warnUser(): void {
    console.log("This is my warning message");
  }
  ```
- **Null və undefined** — hər ikisinin öz adında tipi var. `undefined` optional tiplərdə önəmli rol oynayır — tip adından sonra `?` qoysan, dəyər ya həmin tip, ya da `undefined` ola bilər:
  ```ts
  function greet(name?: string) {
    return `Hello ${name}`;
  }

  greet("Mike");
  greet(undefined); // OK
  greet(); // Bu da OK
  ```
- **Never** — heç vaxt baş verməyən dəyər tipini təmsil edir. Funksiya heç vaxt dəyər qaytarmırsa (məsələn, xəta atırsa ya da sonsuz loop-dursa), `never` istifadə olunur:
  ```ts
  function throwError(errorMsg: string): never {
    throw new Error(errorMsg);
  }

  function infiniteLoop(): never {
    while (true) {}
  }
  ```

## Interface və type alias

Sadə tiplər sadə data üçün kifayətdir, amma daha mürəkkəb data strukturları üçün **interface** və **type alias** lazımdır — mürəkkəb tipləri müəyyən edib ad vermə üsulları.

### Interface

Interface obyektin necə görünəcəyini təsvir edən müqavilədir:

```ts
interface User {
  name: string;
  email: string;
}

const user: User = {
  name: "Alice",
  email: "alice@example.com",
};
```

Bu `User` interface-inə uyğun olmayan obyekti `user` dəyişəninə assign etməyə çalışsaq, TypeScript xəta verəcək.

### Type alias

Type alias interface-ə çox bənzəyir, amma yalnız obyektlər üçün deyil, digər tiplər üçün də istifadə oluna bilir:

```ts
type Point = {
  x: number;
  y: number;
};

type ID = number | string;

const point: Point = {
  x: 10,
  y: 20,
};

const id: ID = 100;
```

Burda iki ölçülü nöqtəni təmsil edən `Point` tipi, string ya da number ola bilən `ID` tipi müəyyən olunub.

### Interface yoxsa type alias?

Çox halda ikisi bir-birini əvəz edir, seçim şəxsi zövqdür. Amma fərqlər var: interface-lər daha genişlənə bilir, çünki bir neçə dəfə elan oluna bilir və birləşdirilir (merge). Type alias-lar isə yeni sahə əlavə etmək üçün yenidən açıla bilmir. Digər tərəfdən, type alias union tip, intersection tip, tuple kimi interface-də hələ olmayan tipləri təmsil edə bilir.

Ümumi qayda: obyektin formasını təsvir edirsənsə, interface ya da type alias — hər ikisi işləyir. Obyektdən başqa bir şeyi təsvir edirsənsə (union, tuple və s.), type alias lazımdır.

## TypeScript-i React-də istifadə

### Props-un tip yoxlaması

```tsx
type GreetingProps = {
  name: string;
};

const Greeting = ({ name }: GreetingProps) => {
  return <h1>Hello, {name}!</h1>;
};
```

Burda `GreetingProps` tipi `Greeting` komponentinin gözlədiyi props-un formasını müəyyən edir. Bu, sadə bir prop-lu misaldır, amma eyni yanaşma daha mürəkkəb props-u olan komponentlər üçün də işləyir. Məsələn, komponent obyekt ya da array prop alırsa, həmin obyektin/array-in formasını təsvir edən tip müəyyən edirik:

```tsx
type UserProps = {
  user: {
    name: string;
    email: string;
  };
};

const UserCard = ({ user }: UserProps) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};
```

Digər çox rast gəlinən ssenari — optional props. Bəzən komponentin həmişə lazım olmayan props-u olur. Bu halda default dəyər verib, tip müəyyənatında prop-u optional işarələyirik:

```tsx
type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
};

const Button = ({ children, disabled = false }: ButtonProps) => {
  return <button disabled={disabled}>{children}</button>;
};
```

`ButtonProps`-da `children` üçün `React.ReactNode` istifadə olunub — React-in təqdim etdiyi, string, rəqəm, JSX elementi, bunların array-i, hətta bu tipləri qaytaran funksiyalar daxil olmaqla, istənilən render oluna bilən content-i qəbul edən xüsusi tip. `disabled` isə optional-dır (`?` işarəsi ilə) və default dəyəri `false`-dur:

```tsx
<Button>Click me!</Button> {/* OK */}
<Button disabled>Don't click me!</Button> {/* OK */}
```

### State-in tip yoxlaması

```tsx
const Counter = () => {
  const [count, setCount] = React.useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>
    </div>
  );
};
```

`React.useState<number>(0)` ilə `count` state dəyişənini `number` tipli müəyyən etmişik. Əslində `<number>`-i buraxa bilərik, çünki TypeScript başlanğıc dəyərin tipindən `count`-un `number` olduğunu özü çıxara bilir (type inference). Bu həm də deməkdir ki, `setCount` yalnız rəqəm qəbul edəcək — başqa tip arqumentlə çağırsaq, TypeScript xəta verəcək.

### Event handler-lərin tip yoxlaması

```tsx
const InputField = () => {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return <input value={value} onChange={handleChange} />;
};
```

`event` parametri üçün `React.ChangeEvent<HTMLInputElement>` tipi istifadə olunub — bu, funksiyanın input sahəsindən change event alacağını göstərir. Bu tip `event.target.value` kimi input change event-inin bütün gözlənilən sahələrini özündə saxlayır. Bu tipdə olmayan sahəyə çatmağa çalışsaq, TypeScript xəta verəcək.

### Context-in tip yoxlaması

```tsx
type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = React.createContext<ThemeContextType | null>(null);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
```

`React.createContext`-ə `ThemeContextType`-i tip arqumenti kimi vermişik — bu, context dəyərinin formasını müəyyən edir: `theme` string-i və `setTheme` funksiyası. `ThemeProvider` bu dəyərləri context-ə ötürür. `useTheme` hook-u isə `React.useContext` ilə context-i istifadə edir; context `null`-dursa, xəta atır — bu, context-in provider daxilində istifadə olunduğunu təmin edən ümumi bir pattern-dir.

> Diqqət et: `useTheme`-in özündə tip müəyyən etməmişik. Amma o, `null` yoxlaması sayəsində TypeScript-ə context-in artıq `null` olmadığını "sübut edir" — nəticədə `useTheme`-i istifadə edən hər yerdə TypeScript avtomatik düzgün, `null`-suz context tipini təqdim edir.

### Ref-lərin tip yoxlaması

Ref-lər DOM node-una ya da React komponent instansına birbaşa çatmaq üçün istifadə olunur. TypeScript burda da köməyə çatır:

```tsx
const InputWithRef = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus the input</button>
    </div>
  );
};
```

`React.useRef`-ə tip arqumenti kimi `HTMLInputElement` verilib — bu, TypeScript-in built-in DOM tip tərifidir və DOM-dakı input elementini təmsil edir. Bu tip sayəsində `inputRef.current`-in tipi `HTMLInputElement | null` olur, TypeScript isə onun `focus` metodu olduğunu bilir.

## Nəticə

Props validasiyası olmadan komponent bir qara qutudur — nə gözlədiyini yalnız kodun hər sətrini oxuyaraq anlaya bilərsən, səhv data ötürəndə isə xəta runtime-da, çox vaxt ən əlverişsiz anda üzə çıxır. TypeScript bu müqaviləni komponentin özünə yazdırır: props, state, event, context, ref — hamısı üçün tip elan edirsən, TypeScript isə kodu işə salmazdan əvvəl bu müqaviləni pozan hər yeri sənə göstərir.

Qısası: PropTypes runtime-da xəbərdarlıq edir, TypeScript isə compile-time-da, hətta kodu işə salmadan qabaq. Nəticə — daha etibarlı, daha asan saxlanan, refactor edərkən səni qorxutmayan komponentlər.
