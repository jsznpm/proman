# React-da Test Yazmaq: Niyə "İşləyir" Kifayət Deyil?

Proqram təminatı hazırlayarkən ən çox atlanılan mərhələ testdir. Xüsusilə avtomatlaşdırılmış testlər — komanda "işə yaraşır, sonra baxarıq" deyib keçir. Amma nəticədə bir sətir kodu dəyişəndə tətbiqin harasınınsa sıradan çıxıb-çıxmadığını yalnız istifadəçilər bildirir.

Bu yazıda əvvəlcə ümumi testləşdirmə anlayışına, sonra unit testlərə, ən sonda isə ReactJS komponentlərinin necə test edildiyinə baxacağıq.

## Test Etmək Nə Deməkdir?

Testləşdirmə — məhsulda xətaları aşkar etmək və funksionallığın düzgün işlədiyini təsdiqləmək prosesidir. Bundan başqa, testlər sistemin müxtəlif şərtlər altında necə davrandığını yoxlamağa və yeni dəyişikliklərin köhnə funksionallığı sındırmadığını (regressiya olmadığını) təsdiqləməyə imkan verir.

Ən sadə yol — **manual test**: developer və ya tester tətbiqi əl ilə yoxlayır. Amma bu yanaşma vaxt aparır və heç bir zaman tətbiqin təhlükəsiz və kritik xətalardan azad olduğuna zəmanət vermir.

Buna alternativ olaraq **avtomatlaşdırılmış testlər** var — insan müdaxiləsi olmadan funksionallığı yoxlayan testlər. Adətən bunlar əvvəlcədən yazılmış test dəstindən və onları işə salıb nəticəni analiz edən bir proqramdan (buna **runner** deyilir) ibarətdir.

> Testdən qaçmaq heç vaxt yaxşı fikir deyil — əksinə, onu daha yaxşı öyrənib mümkün qədər çox layihədə tətbiq etmək dəyər.

## Test Növləri və Piramida

Testlər səviyyəsinə görə üç əsas qrupa bölünür:

* **Unit test** — proqramın ayrıca modulunu və ya komponentini yoxlayır. Adətən developer tərəfindən yazılır, konkret funksiya və ya metodu yoxlayır. Yazılması və işləməsi sürətlidir, amma komponentlərin bir-biri ilə əlaqəsində yaranan problemləri tuta bilmir. Misal: bir funksiyanın, React komponentinin və ya Hook-un test edilməsi.
* **İnteqrasiya testi** — müxtəlif modul və ya komponentlərin bir-biri ilə qarşılıqlı işini yoxlayır. Məqsəd — inteqrasiya olunan hissələr arasındakı interfeys və qarşılıqlı əlaqə xətalarını tapmaqdır. Misal: istifadəçi qeydiyyatının real REST API çağırışları ilə işlədiyini yoxlamaq.
* **End-to-End (E2E) test** — bütöv sistemi, tələblərə tam uyğunluq baxımından yoxlayır. Bu ən etibarlı test növüdür, çünki tətbiqin daxili strukturundan tamamilə asılı olmayaraq real brauzerdə düymələrə klikləmə, formaların doldurulması və səhifələr arası naviqasiya kimi real hərəkətləri simulyasiya edir.

İnteqrasiya və E2E testlər daha çox etibar versə də, mürəkkəb, yavaş və bahalıdır. Buna görə də yaxşı praktika — üstünlüyü unit testlərə vermək, çünki onları saxlamaq və işlətmək daha asandır. Sonra bütün əsas biznes proseslər inteqrasiya testləri ilə, ən kritik ssenarilər isə yalnız E2E testlərlə örtülür. Bu yanaşma **piramida** şəklində təsvir olunur:

```
        /\
       /E2E\        <- az sayda, bahalı, yavaş, maksimum etibar
      /------\
     /  İnteq. \    <- orta sayda
    /------------\
   /   Unit test   \  <- çox sayda, ucuz, sürətli
  /------------------\
```

Piramidanın əsasında unit test dayanır — kodu maksimum əhatə edir, yazılışı və işə salınması ən ucuz olanıdır. Ortada inteqrasiya testləri, yuxarıda isə ən yavaş, ən bahalı, amma ən etibarlı olan E2E testlər yerləşir.

İnteqrasiya və E2E testlər tətbiqin daxili strukturundan asılı olmadığından, bu yazıda onlara toxunmayacağıq. İndi unit testə daha ətraflı baxaq.

## Unit Test Nədir?

Unit test — kodun ayrıca "vahidlərinin" (funksiya, metod) düzgün işlədiyini yoxlama prosesidir. Məqsəd — hər bir ayrıca vahidin öz vəzifəsini düzgün yerinə yetirdiyinə əmin olmaqdır ki, bu da bütün tətbiqin etibarlılığına inam artırır.

```js
export function sum(a, b) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Bu — iki ədədi toplayan ən sadə funksiyanın testidir. Test kodu özü `expect` adlı xüsusi metodu çağıran funksiyadır; `expect` bir dəyər alır və nəticəni yoxlamaq üçün bir sıra metodlar təqdim edir.

Belə üç sətirlik funksiya üçün üç sətirlik test yazmağa dəyərmi? Cavab birmənalı bəlidir. Tez-tez baş verir ki, testin özü test etdiyi funksiyadan həcmcə böyük olur — bunda pis heç nə yoxdur. Səbəbini görək.

Unit test **saf funksiyalarda** (xarici vəziyyətdən asılı olmayan, yan effekti olmayan funksiyalar) ən faydalı və effektivdir. Əksinə, test edilən funksiya xarici amillərdən (məsələn, serverdən məlumat çəkmək, `localStorage`-dan oxumaq, qlobal dəyişənlərdən asılı olmaq) asılı olub eyni girişə fərqli nəticə verə bilirsə, unit test faydasız olur.

Bundan çıxan nəticə: kodun testlə örtülməsini tələb edən yanaşma sizi avtomatik olaraq daha modul, müstəqil, təmiz və genişlənə bilən kod yazmağa sövq edir. Bu, böyük layihələrdə xüsusilə hiss olunur — testlə yazılmış layihə böyük refaktorinq və ya sıfırdan yenidən yazma ehtiyacı olmadan böyüyə bilir. Həmçinin testlər yeni gələn developerlər üçün əlavə sənədləşmə rolunu oynayır — testə baxaraq modulun nə etdiyini anlamaq olur.

### TDD vs Sonradan Test Yazmaq

Testin yazılma vaxtına görə iki əsas yanaşma var:

* **Ənənəvi yanaşma** — əvvəlcə kod, sonra test. Üstünlüyü — əsas funksionallığın sürətli inkişafı. Riski — testin təxirə salınması, örtülməmiş kodun yığılması.
* **Test-Driven Development (TDD)** — əvvəlcə test, sonra kod. Üstünlüyü — kod baştan testlə örtülür, deməli daha təmiz və etibarlı olur. Çatışmazlığı — tez-tez dəyişən tələbləri olan layihələr və ya prototiplər üçün uyğun olmaya bilər.

İkisi arasında seçim komanda mədəniyyəti, layihə tələbləri və developer üstünlüklərindən asılıdır. Vacib olan — heç bir yanaşmanın universal olmadığını anlamaq, amma test yazmamaq yanaşmasından tamamilə uzaq durmaqdır, çünki əksər hallarda belə kod sıfırdan yenidən yazılmağa məhkumdur.

## Test Mühitinin Qurulması: Vitest

Ən populyar test çərçivəsi Jest-dir. Amma biz Vite ilə tam uyğun işləyən, daha performanslı alternativ — **Vitest**-ə baxacağıq.

```bash
npm install -D vitest
```

Vitest əsas işləmək üçün əlavə konfiqurasiya tələb etmir, çünki Vite konfiqurasiya faylı ilə tam uyğundur.

Sonra `*.test.ts` uzantılı fayl yaradılır. Faylın yeri önəmli deyil, əsas odur ki, layihə daxilində olsun. Adətən test faylı test edilən faylla eyni qovluqda saxlanılır: `sum.ts` üçün `sum.test.ts`.

`package.json`-a script əlavə edin:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

```bash
npm run test
```

Bu, Vitest prosesini işə salır — layihədə `.test.` fayllarını tapıb hamısını icra edir, sonra dəyişiklikləri gözləyib yenidən işə salır (watch rejimi). Bir dəfəlik icra üçün:

```json
"test:run": "vitest run"
```

`run` parametri Vitest-ə testləri yalnız bir dəfə icra etməyi bildirir.

## Vitest-in Əsas İmkanları

Sadə bir `squared` funksiyasına baxaq:

```js
export const squared = (n) => n * n;
```

```js
import { expect, test } from 'vitest';

test('Squared', () => {
  expect(squared(2)).toBe(4);
  expect(squared(4)).toBe(16);
  expect(squared(25)).toBe(625);
});
```

`test` funksiyası birinci arqument olaraq test adını, ikinci arqument olaraq test funksiyasının özünü qəbul edir. `expect` metodu isə nəticəni yoxlamağın əsasını təşkil edir — çağırıldıqda nəticəni müxtəlif üsullarla yoxlamağa imkan verən metodlar dəsti olan obyekt qaytarır.

Uğurlu nəticədə terminalda belə görüntü olacaq:

```
✓ test/basic.test.ts (1)
   ✓ Squared
 Test Files  1 passed (1)
      Tests  1 passed (1)
```

Gözlənilən dəyəri `4`-dən `5`-ə dəyişsək, Vitest xətanın harada baş verdiyini, hansı nəticənin alındığını və hansının gözlənildiyini birbaşa göstərir:

```
FAIL  test/basic.test.ts > Squared
AssertionError: expected 4 to be 5
```

### Obyekt və Massivlərin Müqayisəsi

`toBe` sadə dəyərlərin birbaşa müqayisəsi üçün əladır, amma obyekt və massivlər üçün fərqli yanaşma lazımdır:

```js
test('objects', () => {
  const obj1 = { a: 1 };
  const obj2 = { a: 1 };
  expect(obj1).not.toBe(obj2);
  expect(obj1).toEqual(obj2);
});
```

İki eyni struktura malik, amma fərqli referansları olan obyekt yaratdıq — onlar dəyişən kimi bərabər deyil (`not.toBe`). Strukturun eyniliyini yoxlamaq üçün isə `toEqual` metodu var — o, obyektləri (və massivləri) rekursiv şəkildə müqayisə edir.

Massivlərdə element mövcudluğunu yoxlamaq üçün `toContain` var — string və hətta DOM elementinin `classList`-ində sinif axtarmaq üçün də işləyir:

```js
test('Array', () => {
  expect(['1', '2', '3']).toContain('3');
});
```

### Funksiyaların Casusluğu: `vi.fn` və `vi.spyOn`

Vitest funksiyaları "casus" (spy) edərək neçə dəfə və hansı arqumentlərlə çağırıldığını yoxlamağa imkan verir:

```js
const selector = (onSelect) => {
  onSelect('1');
  onSelect('2');
  onSelect('3');
};

test('selector', () => {
  const onSelect = vi.fn();
  selector(onSelect);
  expect(onSelect).toBeCalledTimes(3);
  expect(onSelect).toHaveBeenLastCalledWith('3');
});
```

`vi.fn()` ilə yaratdığımız fake funksiya neçə dəfə çağırıldığını (`toBeCalledTimes`) və sonuncu çağırışın arqumentini (`toHaveBeenLastCalledWith`) yoxlamağa imkan verir. `toHaveBeenCalledWith` isə hər çağırışı ayrıca yoxlaya bilər.

Real (obyektə bağlı) funksiyanı casus etmək üçün `vi.spyOn` işlədilir:

```js
test('spyOn', () => {
  const cart = {
    getProducts: () => 10,
  };
  const spy = vi.spyOn(cart, 'getProducts');
  expect(cart.getProducts()).toBe(10);
  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveReturnedWith(10);
});
```

`vi.spyOn` obyekti və metod adını qəbul edir, orijinal funksiyanı işlək saxlayaraq onun üzərində casusluq imkanı verir — `toHaveReturnedWith` isə funksiyanın nə qaytardığını yoxlayır.

## Mocking: Yan Effektli Funksiyaların Testi

Unit testin ən çətin hissəsi — yan effekti olan və ya xarici kitabxanadan asılı funksiyaların test edilməsidir. Əvvəllər deyildiyi kimi, yan effektli funksiyaları test etmək "faydasızdır" — amma bu tam doğru deyil. Bəzi hallarda saf funksiya yazmaq sadəcə mümkün deyil, lakin bu o demək deyil ki, test edilə bilməz. Bunun üçün **mocking** (saxta implementasiya) istifadə olunur: xarici davranışı emulyasiya etmək, ya da modulun/kitabxananın implementasiyasını əvəz etmək.

### Saxta Zamanlayıcılar (Fake Timers)

```js
function executeInMinute(func) {
  setTimeout(func, 1000 * 60);
}

function executeEveryMinute(func) {
  setInterval(func, 1000 * 60);
}

const mock = vi.fn(() => console.log('done'));
```

```js
describe('delayed execution', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should execute the function', () => {
    executeInMinute(mock);
    vi.runAllTimers();
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('should not execute the function', () => {
    executeInMinute(mock);
    vi.advanceTimersByTime(2);
    expect(mock).not.toHaveBeenCalled();
  });

  it('should execute every minute', () => {
    executeEveryMinute(mock);
    vi.advanceTimersToNextTimer();
    expect(mock).toHaveBeenCalledTimes(1);
    vi.advanceTimersToNextTimer();
    expect(mock).toHaveBeenCalledTimes(2);
  });
});
```

Burada `test` əvəzinə `describe` və `it` işlədildi. `describe` öz konteksti və lifecycle-ı olan test dəsti (suite) yaradır — `beforeEach`/`afterEach` metodları hər testdən əvvəl saxta zamanlayıcıları qurur, sonra hər testdən sonra hər şeyi əvvəlki vəziyyətə qaytarır. `it` sadəcə `test`-in oxunaqlılıq üçün alias-ıdır (`describe('delayed execution') > it('should execute...')` nəticədə oxunaqlı görünür).

`vi.runAllTimers()` bütün taymerləri dərhal "ötürür" — real vaxt gözləmədən nəticəni yoxlamağa imkan verir. `vi.advanceTimersByTime(2)` isə vaxtı yalnız müəyyən millisaniyə qədər irəli aparır. `vi.advanceTimersToNextTimer()` isə hər addımda növbəti taymerə qədər irəliləyərək dəqiq nəzarət verir.

### Modul Mocking

Xüsusilə React Native-də cihazın native funksiyalarından asılı kitabxanaları test edərkən modulun saxta versiyasını yaratmaq lazım gəlir:

```js
export function getSteps() {
  // NATIVE MƏNTİQ
  return 100;
}
```

```js
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { getSteps } from './ios-health-kit';

describe('IOS Health Kit', () => {
  beforeAll(() => {
    vi.mock('./ios-health-kit', () => ({
      getSteps: vi.fn().mockImplementation(() => 2000),
    }));
  });

  it('should return steps', () => {
    expect(getSteps()).toBe(2000);
    expect(getSteps).toHaveBeenCalled();
  });
});
```

`vi.mock` orijinal modulun importunu saxta implementasiya ilə əvəz edir — `getSteps` funksiyası əvəzinə `2000` qaytaran fake versiya işə düşür.

### Şəbəkə Sorğularının Mocking-i (MSW)

Demək olar ki, bütün tətbiqlər serverdən məlumat çəkir. Unit testdə bu problemdir, çünki test vahidi xarici mühitdən təcrid olunmalıdır. Bunun üçün **Mock Service Worker (MSW)** kitabxanası REST və GraphQL sorğularını çevik şəkildə mock etməyə imkan verir:

```js
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';

const server = setupServer(
  http.get('https://api.github.com/users', () => {
    return HttpResponse.json({
      firstName: 'Mikhail',
      lastName: 'Sakhniuk',
    });
  })
);

describe('Mocked fetch', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should returns test data', async () => {
    const response = await fetch('https://api.github.com/users');
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(await response.json()).toEqual({
      firstName: 'Mikhail',
      lastName: 'Sakhniuk',
    });
  });
});
```

`setupServer` verilmiş marşrut üçün saxta server yaradır; `beforeAll`/`afterEach`/`afterAll` isə serverin lifecycle-ını idarə edir. Nəticədə adi `fetch` çağırışı real şəbəkəyə çıxmadan qabaqcadan təyin olunmuş data qaytarır — status kodu, xəta halları və s. bütün ssenariləri yoxlamaq mümkün olur.

## ReactJS Komponentlərinin Test Edilməsi

React komponentləri əslində bir node qaytaran `createElement` funksiyalarıdır — `render` nəticəsində bu node brauzerdə HTML elementlərinə çevrilir. Unit testdə brauzer yoxdur, amma bu problem deyil, çünki React-ın render hədəfi demək olar ki, istənilən şey ola bilər. Komponentləri **JSDOM** formatına (DOM-un tam analoqu) render edərək test edəcəyik — buna **React Testing Library (RTL)** kömək edir.

### Mühitin Qurulması

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest jsdom
```

`tests/setup.ts` faylı yaradılır:

```ts
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

`vite.config.ts`-ə əlavə edilir:

```ts
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './tests/setup.ts',
},
```

Bu, Vitest-ə əlavə mühit (jsdom) istifadə etməyi və testlərdən əvvəl setup skriptini icra etməyi bildirir.

### Sadə Render Yoxlaması

```jsx
export function App() {
  return <h1>Hello world</h1>;
}
```

```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('should be in document', () => {
    render(<App />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });
});
```

`render` komponenti JSDOM-a yerləşdirir, `screen` isə virtual DOM ağacı ilə işləmək və elementləri müxtəlif üsullarla axtarmaq üçündür. `getByText` mətni ehtiva edən elementi tapır, `toBeInTheDocument` isə onun sənəddə mövcud olduğunu təsdiqləyir.

### Klik Hadisəsi: `fireEvent`

```jsx
export function ClassCheck() {
  const [clicked, setClicked] = useState(false);
  return (
    <button
      className={clicked ? 'active' : ''}
      onClick={() => setClicked(true)}
    >
      Click me
    </button>
  );
}
```

```jsx
describe('ClassCheck', () => {
  it('should have class active when button was clicked', () => {
    render(<ClassCheck />);
    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('active');
    fireEvent.click(button);
    expect(button).toHaveClass('active');
  });
});
```

`getByRole('button')` düyməni tapır — diqqət: sənəddə birdən çox düymə varsa, bu metod xəta verər, ona görə situasiyaya uyğun sorğu metodu seçmək vacibdir. `fireEvent.click` klik hadisəsini simulyasiya edir; sonra sinifin əlavə olunduğu yoxlanılır.

`fireEvent` klik, drag, play, focus, blur və s. bütün mümkün hadisələri yarada bilər. Formalarda ən çox rast gəlinən hadisə isə `change`-dir:

```jsx
export function Input() {
  return <input type="text" data-testid="userName" />;
}
```

```jsx
describe('Input', () => {
  it('should handle change event', () => {
    render(<Input />);
    const input = screen.getByTestId('userName');
    fireEvent.change(input, { target: { value: 'Mikhail' } });
    expect(input.value).toBe('Mikhail');
  });
});
```

`data-testid` atributu elementi kontentindən və ya rolundan asılı olmadan tapmağa imkan verir — layihə inkişaf etdikcə `h1`-i `h2`-yə, `div`-i semantik elementə dəyişəndə testlərin sınmasının qarşısını alır. `getByTestId` ilə input tapılır, `fireEvent.change` ilə dəyər dəyişdirilir, nəticə isə `input.value` üzərindən yoxlanılır. Bu yanaşma ilə validasiya və formatlaşdırma məntiqi olan böyük formaları da test etmək olar.

### Hook-ların Test Edilməsi

RTL komponentlərdən başqa Hook-ları da test etməyə imkan verir — bu, komponentdən təcrid olunmuş şəkildə yalnız custom məntiqi yoxlamağa şərait yaradır:

```js
export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  return { count, increment, decrement };
}
```

```js
test('useCounter', () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment();
  });
  expect(result.current.count).toBe(1);

  act(() => {
    result.current.decrement();
  });
  expect(result.current.count).toBe(0);
});
```

`render` əvəzinə `renderHook` işlədilir, `result` obyekti Hook-dan qaytarılan dəyəri oxumağa imkan verir. `increment`/`decrement` kimi metodları sadəcə çağırmaq kifayət etmir, çünki Hook-lar öz təbiətinə görə saf funksiya deyil və daxildə çoxlu məntiq daşıyır — buna görə çağırış `act()` içinə alınır ki, metod icra olunsun və Hook yenidən render olunsun. Bundan sonra nəticə adi qaydada yoxlanılır.

## Nəticə

Test yazmaq əlavə yük deyil, gələcək vaxtın qabaqcadan alınmasıdır. Kiçicik `sum` funksiyası üçün üç sətirlik test yazmaq gülünc görünə bilər, amma məhz bu vərdiş sizi daha modul, təmiz və dəyişikliyə davamlı kod yazmağa öyrədir.

> Testsiz kod — sabah sındırılmayacağına heç kimin zəmanət verə bilmədiyi koddur.

Unit test, inteqrasiya testi və E2E testin hər birinin öz yeri var: piramidanın əsasında çox sayda ucuz və sürətli unit test, ortada əsas biznes proseslərini örtən inteqrasiya testləri, təpədə isə yalnız ən kritik ssenariləri yoxlayan az sayda E2E test. Vitest və React Testing Library ilə bu piramidanın ən geniş, ən vacib hissəsini — React komponentləri və Hook-ları daxil olmaqla — asanlıqla qura bilərsiniz.
