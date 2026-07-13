# Senior Frontend Handbook — Part 12: Testing

> Bu, "Senior Frontend Handbook" seriyasının 12-ci hissəsidir. Mövzu: frontend
> test strategiyası — Unit, Integration, E2E, Visual Regression, Contract
> Testing, Mock Server.

---

## 1. Niyə "Testing" senior səviyyəsində fərqli mövzudur

Mid-level developer "necə test yazmalıyam" sualına cavab axtarır. Senior
developer bambaşqa sualla məşğul olur: **"bu komanda hansı test növlərinə nə
qədər investisiya etməlidir, və niyə?"**

Bu fərq təsadüfi deyil — praktikada özünü belə göstərir:

- **Code review-da**: Junior/mid PR-ə "test var" görüb təsdiq verir. Senior
  soruşur: "bu test nə sınayır — implementation detail, yoxsa user-facing
  davranış? Refactor zamanı bu test pozulacaqmı, hansı halda pozulmalıdır?"
- **Incident retrospektivində**: Production-da bug çıxır, amma bütün testlər
  yaşıl idi. Senior "niyə bizim test suite bunu tutmadı" sualını verib test
  strategiyasının **gap**-ini (məsələn API contract-ı heç kim test etmirdi,
  yalnız hər tərəf öz mock-una qarşı test yazırdı) tapır.
- **Arxitektura qərarında**: Yeni feature — deyək ki checkout axını — üçün
  "hansı laylarda test yazaq" qərarı verilməlidir. Səhv qərar (hər şeyi E2E ilə
  örtmək, və ya hər şeyi unit test ilə heavy-mock etmək) CI-ni 40 dəqiqəyə
  uzadır və ya production-da inteqrasiya bugını gizlədir.
- **Yeni komandaya köçəndə**: Senior fərqli komandalarda fərqli test
  mədəniyyəti ilə rastlaşır (bəzisi "hər PR-ə E2E", bəzisi "yalnız unit").
  Bu mədəniyyətin **niyə** belə formalaşdığını başa düşmək və lazım gələndə
  dəyişdirmək bacarığı senior siqnalıdır.

Əsas fərq bir cümləyə sığır: **junior "necə test yazım" düşünür, senior "bu
testin ROI-si nədir, əvəzində nə itirirəm" düşünür.** ROI = confidence / cost,
burada cost həm icra vaxtı (CI dəqiqələri), həm də saxlama yükü (hər refactor-da
neçə test qırılır) deməkdir.

---

## 2. Konsepsiyalar — ilk prinsiplərdən

### 2.1 Testing Pyramid → Testing Trophy

Klassik **Testing Pyramid** modeli (Mike Cohn-dan gələn) belə deyir: çoxlu unit
test yaz (bazada, sürətli), az inteqrasiya testi, çox az E2E (təpədə, bahalı).
Məntiq: unit testlər sürətli və təcrid olunmuşdur, ona görə "əsas" test
qatı olmalıdır.

Kent C. Dodds bu modeli frontend üçün kifayət etməyən elan edib və
**Testing Trophy**-i təklif edib. Trophy-də dörd qat var (aşağıdan yuxarı):

1. **Static** — TypeScript, ESLint. Kod işə düşmədən səhvləri tutur (tip
   uyğunsuzluğu, unused variable, x.foo() where x undefined ola bilər).
2. **Unit** — təcrid olunmuş funksiya/komponent.
3. **Integration** — bir neçə komponentin/modulun birgə işləməsi (məsələn,
   forma + validation + submit handler, real DOM-a render olunmuş halda).
4. **E2E** — real brauzerdə, real (və ya real-ə yaxın) backend-lə tam axın.

Trophy-nin forması təsadüfi deyil — o, hər qatın **nisbi investisiya
miqdarını** göstərir. Pyramid-də "əsas" (ən çox) unit testlərdir; Trophy-də
"gövdə" (ən çox investisiya) integration testlərdir. Dodds-un öz sözləri ilə
(kentcdodds.com/blog/write-tests): 

> "The more your tests resemble the way your software is used, the more
> confidence they can give you."

Bu, həm Testing Trophy-nin, həm də Testing Library-nin əsas prinsipidir
(testing-library.com/docs/guiding-principles) — heç bir təsadüf deyil, Dodds
Testing Library-nin də müəllifidir.

**Niyə pyramid frontend üçün kifayət etmirdi?** Pyramid backend servislər üçün
formalaşıb, orada unit test = bir funksiyanı təcrid edib sınamaq həqiqətən
yüksək confidence verir (funksiya = biznes məntiqin özüdür). Frontend-də isə
"unit" çox vaxt bir React komponentini bütün asılılıqlarından (context,
API, router) təcrid edib mocklamaq deməkdir — və məhz bu təcrid confidence-i
aşağı salır, çünki real bug-lar məhz komponentlərin **bir-biri ilə** necə
qarşılıqlı əlaqədə olmasında yaranır.

**"Not too many" — niyə?** Hər əlavə test iki qiymətə malikdir: icra vaxtı
(CI-ni gecikdirir) və saxlama yükü (hər refactor-da test də yenidən yazılmalı
ola bilər). 100% coverage hədəfi diminishing returns yaradır — Dodds qeyd edir
ki, ~70%-dən yuxarı coverage artımı əlavə confidence-ə nisbətən dəyəri azalan
investisiyadır. Trivial kodu (məsələn sadə getter) test etmək confidence
vermir, sadəcə saxlama yükü yaradır.

### 2.2 Unit Testing — nə üçün var, nəyi sınamalı

Unit test = **bir vahidi (funksiya, hook, xalis komponent) qalan sistemdən
təcrid edib** onun davranışını sınamaq.

İlk prinsipdən: unit testin dəyəri **vahidin təcrid oluna bilmə dərəcəsi** ilə
düz mütənasibdir. Xalis funksiya (aynı input → aynı output, side-effect yox)
üçün unit test demək olar ki pulsuz confidence verir — heç nə mocklamağa
ehtiyac yoxdur. Amma çoxlu asılılığı olan komponent üçün unit test yazmaq
demək olar ki hər şeyi mocklamaq deməkdir — nəticədə test "mock-ların düzgün
çağırıldığını" yoxlayır, real inteqrasiyanı yox.

Frontend-də unit testin ən yüksək ROI-li yerləri:
- Xalis util funksiyalar (formatlama, validasiya, hesablama)
- Custom hook-ların izolə edilmiş məntiqi (`renderHook` ilə)
- Reducer/state-machine funksiyaları (input state + action → output state)
- Data transformasiya laylari (API response → UI model)

### 2.3 Integration Testing — nə üçün var

Integration test = **bir neçə vahidin real şəkildə birgə işləməsini**, real
DOM-a render olunmuş halda, mümkün qədər az mock ilə sınamaq.

React Testing Library (RTL) məhz bu qat üçün nəzərdə tutulub. RTL-in guiding
principle-i (yenidən): tests "should deal with DOM nodes rather than component
instances" və "encourage tests that use components as they're intended to be
used" (testing-library.com/docs/guiding-principles). Bu o deməkdir ki, siz
`wrapper.state()` və ya `instance.someInternalMethod()` çağırmırsınız — siz
`screen.getByRole('button')`-u tapıb `userEvent.click()` edirsiniz, sonra
ekranda **istifadəçinin görəcəyi** nəticəni yoxlayırsınız.

Integration testin gövdə (ən çox investisiya) olmasının səbəbi: real
production bug-larının böyük hissəsi tək bir funksiyanın daxilində deyil,
**komponentlərin bir-biri ilə qarşılıqlı təsirində** yaranır (forma submit
edəndə loading state düzgün göstərilmirmi? error zamanı düzgün mesaj
çıxırmı? API cavabı gecikəndə race condition yaranırmı?). Bunları unit test
tuta bilməz (çünki hər hissə təcrid olunub), E2E tuta bilər amma çox bahalıdır.

### 2.4 E2E Testing — nə üçün var

E2E test = real (və ya real-ə çox yaxın) brauzerdə, real şəbəkə qatı ilə,
istifadəçinin başdan-sona keçəcəyi ssenarini sınamaq (login → səbətə əlavə et
→ checkout → ödəniş təsdiqi).

E2E-nin unikal dəyəri: o, **infrastrukturun özünü** də sınayır — routing
konfiqurasiyası, build prosesi, real network gecikməsi, browser-specific
davranış (Safari-də input autofill, Firefox-da CSS fərqi). Heç bir unit və ya
integration test bunları tuta bilməz, çünki onlar real brauzer/build-i işə
salmır.

Amma E2E-nin qiyməti yüksəkdir: icra vaxtı (dəqiqələrlə), flaky olma riski
(şəbəkə, timing, real backend state), və debug çətinliyi (uğursuzluq hansı
laydan qaynaqlanır — UI, API, yoxsa test infrastrukturu özü?).

Playwright və Cypress bu qatın iki əsas alətidir. Hər ikisi **auto-waiting**
konsepsiyasına əsaslanır: element klik olunmadan əvvəl görünür, enabled,
stable olduğunu avtomatik yoxlayır (playwright.dev/docs/actionability) —
bu, əl ilə `sleep(2000)` yazmaq ehtiyacını aradan qaldırır və flaky testin ən
böyük mənbəyini (sabit gözləmə vaxtları) doğuşdan həll edir.

### 2.5 Visual Regression Testing — nə üçün var

Visual regression testing = UI-nin ekran görüntüsünü (screenshot) əvvəlki
"baseline" ilə piksel-piksel (və ya struktur səviyyəsində) müqayisə edib,
gözlənilməyən vizual dəyişiklikləri (layout qırılması, rəng fərqi, overlap)
aşkarlamaq.

Bu qatın var olma səbəbi: funksional testlər (unit/integration/E2E) DOM-un
**strukturunu** və **davranışını** yoxlayır, amma CSS-in vizual nəticəsini
yox. Məsələn, `display: none` səhvən `display: block`-a çevrilsə, DOM
strukturu dəyişməz, `getByRole` testi keçər, amma UI vizual olaraq qırılmış
görünər. Yalnız screenshot müqayisəsi bunu tutur.

Playwright-in `toHaveScreenshot()` funksiyası `pixelmatch` kitabxanasından
istifadə edir və nəticəni referans şəkillə müqayisə edir
(playwright.dev/docs/test-snapshots). Kritik məhdudiyyət: brauzer render-i
host OS, versiya, hardware, headless rejim kimi faktorlardan asılı olaraq
dəyişə bilər — buna görə Playwright screenshot fayl adına brauzer və platform
adını qatır (`example-test-1-chromium-darwin.png`) və rəsmi tövsiyə budur:
**baseline yaradılan mühitin eynisi ilə test icra et** (adətən CI-də Docker
konteyneri).

### 2.6 Contract Testing — nə üçün var

Contract testing = consumer (frontend) və provider (backend/API) arasındaki
inteqrasiya nöqtəsini, **hər tərəfi ayrı-ayrılıqda test edərək**, amma paylaşılan
"contract" sənədinə qarşı yoxlamaqla sınamaq.

Problem, klassik yanaşmada belədir: frontend komandası backend-i mock edir,
backend komandası öz API-sini sərbəst test edir. Hər iki tərəfin testi yaşıl
keçir, amma real inteqrasiyada API response formatı dəyişib və heç kim bunu
tutmayıb — çünki heç bir test **hər iki tərəfin gözləntisini birgə** yoxlamayıb.

Pact bunu belə həll edir (docs.pact.io): consumer öz testini yazanda, Pact bu
testin icrası zamanı **avtomatik olaraq bir "contract" faylı** generasiya edir
— consumer-in API-dən konkret olaraq nə istifadə etdiyini sənədləşdirən fayl.
Sonra bu contract provider-in test suite-inə verilir və provider-in real
cavabının bu contract-a uyğun olduğu yoxlanılır ("provider verification").

Pact-ın rəsmi analogiyası: full E2E inteqrasiya testi ilə hər inteqrasiyanı
yoxlamaq — "yanğın siqnalını sınamaq üçün evi yandırmaq" kimidir. Contract
test bunun əvəzinə hər tərəfi təcrid edib, yalnız **paylaşılan interfeys**
üzərində razılaşma olduğunu təsdiqləyir.

Mühüm nüans (consumer-driven contract-ın əsas gücü): contract yalnız
consumer-in **həqiqətən istifadə etdiyi** sahələri əhatə edir. Əgər provider
30 sahə qaytarırsa, amma consumer yalnız 4-nü oxuyursa, contract yalnız bu
4 sahəni sınayır — provider qalan 26 sahəni sərbəst dəyişə bilər, heç bir
consumer-i qırmadan. Bu, contract testing-i həm OpenAPI schema validasiyasından
(bütün sahələri statik yoxlayır), həm də sadə mock-lardan fərqləndirir.

Pact Broker-in `can-i-deploy` əmri bunu CI/CD-yə inteqrasiya edir: consumer
və ya provider-i deploy etməzdən əvvəl, Broker-dən "bu versiya digər tərəfin
hazırkı production versiyası ilə uyğundurmu" sualı soruşulur
(docs.pact.io/pact_broker/can_i_deploy). Bu, mikroservis mühitində "kim kimin
üstündə nə vaxt deploy edə bilər" sualını avtomatlaşdırır.

### 2.7 Mock Server — nə üçün var

Mock server = real backend-i əvəz edən, öncədən müəyyənləşdirilmiş cavablar
qaytaran server (və ya şəbəkə interception qatı).

**Niyə lazımdır?** Real backend-ə bağımlı testlər üç problemi yaradır:
(1) sürət — real şəbəkə çağırışı testi saniyələrlə gecikdirir, (2) sabitlik —
backend down olarsa, ya da test data dəyişərsə test flaky olur, (3) edge-case
əhatəsi — 500 error, timeout, boş cavab kimi halları real backend-də
təkrarlamaq çətindir.

**Mock Service Worker (MSW)** bu problemi fərqli bir yolla həll edir —
klassik `jest.mock()` və ya `fetch`-i patch etmək əvəzinə, MSW **şəbəkə
səviyyəsində** interception edir: brauzerdə Service Worker API-dən istifadə
edərək real çıxan sorğuları tutur, Node-da isə interceptor mexanizmi ilə
(mswjs.io/docs). Bunun praktiki üstünlüyü: tətbiqinizin kodu **real fetch/axios
çağırışı** edir — heç nə mocklanmır, sadəcə həmin sorğu şəbəkəni tərk etməzdən
əvvəl tutulur. Nəticədə eyni mock tərif (request handler) həm testlərdə, həm
Storybook-da, həm lokal development-də istifadə oluna bilər — client
kitabxanasından (fetch, axios, React Query, Apollo) asılı olmadan.

Bu, Testing Trophy-nin "stop mocking so much" prinsipi ilə ziddiyyət təşkil
etmir — əksinə, onu tamamlayır: siz komponentin/hook-un **daxili
implementasiyasını** mocklamırsınız (bu, implementation detail test etmək
olardı), siz yalnız **xarici sərhədi** (network boundary) mocklayırsınız və
tətbiqin qalan hissəsi tam real işləyir.

---

## 3. Praktiki nümunələr

### 3.1 Unit test — xalis funksiya

```javascript
// price.js
export function applyDiscount(price, discountPercent) {
  if (discountPercent < 0 || discountPercent > 100) {
    throw new RangeError('discountPercent must be between 0 and 100');
  }
  return Math.round(price * (1 - discountPercent / 100) * 100) / 100;
}
```

```javascript
// price.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyDiscount } from './price.js';

test('applies a 20% discount correctly', () => {
  assert.equal(applyDiscount(100, 20), 80);
});

test('handles floating point rounding (edge case)', () => {
  // 19.99 * 0.85 = 16.9915 -> should round to 16.99, not 16.991500000000002
  assert.equal(applyDiscount(19.99, 15), 16.99);
});

test('rejects out-of-range discount', () => {
  assert.throws(() => applyDiscount(100, 150), RangeError);
});

test('zero discount returns original price unchanged', () => {
  assert.equal(applyDiscount(49.5, 0), 49.5);
});
```

Diqqət: floating-point rounding edge-case-i real bug mənbəyidir — JS-də
`0.1 + 0.2 !== 0.3` kimi problemlər qiymət hesablamalarında sürünə bilər.
Senior testin "happy path"dən başqa məhz bu cür edge-case-ləri hədəf alması
gözlənilir.

### 3.2 Integration test — Testing Library ilə forma

```jsx
// LoginForm.jsx
export function LoginForm({ onSubmit }) {
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      await onSubmit(new FormData(e.target));
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" required />
      <button type="submit" disabled={pending}>
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
```

```jsx
// LoginForm.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, vi } from 'vitest';
import { LoginForm } from './LoginForm';

test('shows an error message when submit fails (edge case: rejected promise)', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn().mockRejectedValue(new Error('Invalid credentials'));

  render(<LoginForm onSubmit={onSubmit} />);

  await user.type(screen.getByLabelText('Email'), 'test@example.com');
  await user.type(screen.getByLabelText('Password'), 'wrong-pass');
  await user.click(screen.getByRole('button', { name: /sign in/i }));

  // getByRole('alert') gözləyir, çünki error DOM-a asinxron gəlir —
  // findBy* auto-retry edir, getBy* etmir.
  expect(await screen.findByRole('alert')).toHaveTextContent('Invalid credentials');
  expect(screen.getByRole('button', { name: /sign in/i })).not.toBeDisabled();
});

test('disables the submit button while the request is pending (edge case: race)', async () => {
  const user = userEvent.setup();
  let resolveSubmit;
  const onSubmit = vi.fn(() => new Promise((resolve) => { resolveSubmit = resolve; }));

  render(<LoginForm onSubmit={onSubmit} />);
  await user.type(screen.getByLabelText('Email'), 'a@b.com');
  await user.type(screen.getByLabelText('Password'), 'secret');
  await user.click(screen.getByRole('button', { name: /sign in/i }));

  expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled();
  resolveSubmit();
});
```

Diqqət yetirin: test `getByRole`, `getByLabelText` istifadə edir — DOM
strukturuna (`.form-group > input`) yox, istifadəçinin görəcəyi rol/label-ə
əsaslanır. Bu, Testing Library-nin "resemble the way software is used"
prinsipinin birbaşa tətbiqidir.

### 3.3 E2E test — Playwright

```typescript
// checkout.spec.ts
import { test, expect } from '@playwright/test';

test('user can complete checkout with a valid card', async ({ page }) => {
  await page.goto('/cart');
  await page.getByRole('button', { name: 'Checkout' }).click();

  await page.getByLabel('Card number').fill('4242424242424242');
  await page.getByLabel('Expiry').fill('12/30');
  await page.getByLabel('CVC').fill('123');
  await page.getByRole('button', { name: 'Pay now' }).click();

  // Web-first assertion: Playwright avtomatik retry edir, sabit gözləmə lazım deyil
  await expect(page.getByRole('heading', { name: 'Order confirmed' })).toBeVisible();
});

test('shows an inline error for a declined card (edge case)', async ({ page }) => {
  // Xarici ödəniş provayderini test etmirik (playwright.dev best-practices:
  // "don't test third party servers you don't control") — şəbəkə cavabını
  // özümüz kontrol edirik.
  await page.route('**/api/payments', (route) =>
    route.fulfill({ status: 402, json: { error: 'card_declined' } })
  );

  await page.goto('/checkout');
  await page.getByRole('button', { name: 'Pay now' }).click();

  await expect(page.getByRole('alert')).toHaveText(/card was declined/i);
});
```

Flaky test-in ən çox rast gəlinən konkret səbəbləri (Playwright/Cypress rəsmi
sənədlərindən):
1. **Sabit `sleep`/`wait(ms)`** — CI mühiti lokal mühitdən daha yavaş ola
   bilər; sabit rəqəm həm çox qısa (flaky), həm çox uzun (yavaş) olur.
2. **CSS class-a bağlı selector** — dizayner class adını dəyişəndə test
   funksional olaraq düzgün UI-nı "tapa bilmir" deyə fail olur.
3. **Test isolation-un olmaması** — bir test digərinin buraxdığı state-dən
   (localStorage, cookie, DB sətri) asılı olur; testlər ayrı-ayrı keçir, birgə
   fail olur.
4. **Retry-sız assertion** (`isVisible()` dərhal yoxlayır, `toBeVisible()`
   gözləyib retry edir) — asinxron render zamanı birincisi "hələ render
   olunmayıb" görüb yanlış fail verir.
5. **Xarici/kontrol olunmayan asılılıq** (real ödəniş provayderi, real 3-cü
   tərəf widget) — onların öz gecikməsi/uyğunsuzluğu sizin test nəticənizi
   korlayır.

### 3.4 Visual Regression test — Playwright

```typescript
// button.visual.spec.ts
import { test, expect } from '@playwright/test';

test('primary button renders consistently', async ({ page }) => {
  await page.goto('/storybook/iframe.html?id=button--primary');

  await expect(page.locator('[data-testid="primary-button"]')).toHaveScreenshot(
    'primary-button.png',
    {
      maxDiffPixels: 50, // font antialiasing üçün kiçik tolerantlıq
    }
  );
});

test('dashboard page ignores dynamic timestamp (edge case)', async ({ page }) => {
  await page.goto('/dashboard');

  await expect(page).toHaveScreenshot('dashboard.png', {
    // "Last updated: 14:32:07" kimi dinamik mətni maskalayırıq —
    // əks halda test hər çağırışda fail olar, çünki vaxt həmişə fərqlidir.
    mask: [page.getByTestId('last-updated-timestamp')],
  });
});
```

Kritik pitfall: baseline şəkil bir mühitdə (məsələn developer-in Mac-i)
yaradılıb, CI Linux konteynerində icra olunursa, font rendering fərqi görə
şəkillər heç vaxt uyğunlaşmayacaq. Playwright buna görə screenshot fayl adına
platform məlumatını qatır və CI-də Docker vasitəsilə sabit mühit tövsiyə edir.

### 3.5 Contract Testing — Pact (consumer tərəfi)

```javascript
// pact/consumer.pact.test.js
import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { fetchUser } from '../src/api/userClient';

const { like, string } = MatchersV3;
const provider = new PactV3({ consumer: 'WebApp', provider: 'UserService' });

test('fetchUser returns the fields the UI actually consumes', () => {
  provider
    .given('user 42 exists')
    .uponReceiving('a request for user 42')
    .withRequest({ method: 'GET', path: '/users/42' })
    .willRespondWith({
      status: 200,
      body: {
        id: 42,
        // yalnız UI-nin istifadə etdiyi sahələr contract-a düşür —
        // provider əlavə sahə qaytarsa da (məs. internalNotes), bu sınmır
        name: like(string('Jane Doe')),
      },
    });

  return provider.executeTest(async (mockServer) => {
    const user = await fetchUser(mockServer.url, 42);
    expect(user.name).toBeDefined();
  });
});
```

Bu test icra olunanda Pact avtomatik `pacts/WebApp-UserService.json` faylını
yaradır. Bu fayl Pact Broker-ə göndərilir; `UserService` komandası öz CI-ində
bu contract-a qarşı **provider verification** işlədir (real endpoint-i çağırıb
cavabın contract-a uyğun olduğunu yoxlayır). Deploy-dan əvvəl:

```bash
pact-broker can-i-deploy \
  --pacticipant WebApp --version $GIT_SHA \
  --to-environment production
```

Bu əmr Broker-in "Matrix"-inə sorğu göndərir: "WebApp-in bu versiyası,
production-da hazırda olan UserService versiyası ilə verifikasiya olunubmu?"
Cavab yoxdursa, deploy dayandırılır — real inteqrasiya problemi production-a
çatmazdan əvvəl.

### 3.6 Mock Server — MSW ilə

```javascript
// mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/users/:id', ({ params }) => {
    if (params.id === '404') {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return HttpResponse.json({ id: params.id, name: 'Jane Doe' });
  }),

  // Edge case: gecikmiş cavab simulyasiyası — loading state-i test etmək üçün
  http.get('/api/slow-report', async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return HttpResponse.json({ status: 'ready' });
  }),
];
```

```javascript
// mocks/server.js (Node/Vitest üçün)
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

```javascript
// UserProfile.test.jsx
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import { render, screen } from '@testing-library/react';
import { beforeAll, afterEach, afterAll, test, expect } from 'vitest';
import { UserProfile } from '../UserProfile';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('shows a 404 message when the user does not exist (edge case override)', async () => {
  // Bu testə xas olaraq default handler-i override edirik —
  // qalan bütün testlər dəyişməz qalır, çünki afterEach reset edir.
  server.use(
    http.get('/api/users/:id', () => HttpResponse.json({ error: 'Not found' }, { status: 404 }))
  );

  render(<UserProfile userId="404" />);

  expect(await screen.findByText(/user not found/i)).toBeInTheDocument();
});
```

Diqqət: `UserProfile` komponenti daxilində heç nə mocklanmır — o, real
`fetch('/api/users/404')` çağırışı edir. MSW bu sorğunu şəbəkə səviyyəsində
tutub cavab verir. Bu, komponentin daxili implementasiyasından (hansı HTTP
client istifadə etdiyi) tam asılı olmayan test yaradır.

---

## 4. Senior-level tələlər

**1. Implementation detail test etmək.** Ən geniş yayılmış səhv: komponentin
daxili state-ini, private metodunu, ya da render-in "necə" olduğunu (məsələn
`wrapper.find('.internal-class')` və ya bir hook-un neçə dəfə çağırıldığını)
test etmək. Nəticə: refactor (kodun **davranışını** dəyişmədən strukturunu
dəyişmək) hər dəfə testi qırır, komanda "testlər bizə mane olur" deyib
testləri tədricən silməyə başlayır. Testing Library bunun qarşısını
arxitektura səviyyəsində alır — o, sadəcə DOM node-lara çıxış verir, instance-a
yox.

**2. Over-mocking.** Hər asılılığı mocklamaq (API client, hər custom hook,
hər context) test yazmağı asanlaşdırır, amma confidence-i sıfıra endirir —
test artıq "mocklar düzgün çağırılıb" yoxlayır, real inteqrasiyanı yox. Kent
C. Dodds-un sözü ilə: "when you mock something you're removing all confidence
in the integration between what you're testing and what's being mocked."
Qayda: yalnız **sərhədləri** (network, timer, random, external SDK) mockla,
öz kodunuzun daxili modullarını yox.

**3. `cy.wait(5000)` / `sleep(2000)` tipli sabit gözləmələr.** Bu, ən çox
rast gəlinən flaky test səbəbidir. CI mühiti dəyişkəndir (paralel job-lar,
resurs limitləri) — sabit rəqəm ya lazımsız yerə testi yavaşladır, ya da
kifayət etməyib flaky fail yaradır. Əvəzinə: route alias-a (`cy.wait('@getUsers')`)
və ya auto-retry edən assertion-lara (`toBeVisible()`, `findBy*`) etibar et.

**3.1. `isVisible()` kimi dərhal-qaytaran metodları assertion kimi işlətmək.**
`expect(await el.isVisible()).toBe(true)` dərhal bir dəfə yoxlayır və render
hələ bitməyibsə false qaytarır. `expect(el).toBeVisible()` isə auto-retry
edir. Bu iki forma sətir səviyyəsində oxşar görünür, amma davranışı köklü
fərqlidir.

**4. Screenshot testini "hər piksel eyni olmalıdır" səviyyəsində qurmaq.**
Font antialiasing, GPU render fərqləri, OS-lar arası kiçik fərqlər real,
qaçılmaz "noise"dur. `maxDiffPixels`/threshold təyin etmədən visual test
qurmaq, komandanı hər PR-də "false positive" fail-ları review etməyə
məcbur edir — nəticədə komanda screenshot testlərini görməzdən gəlməyə
başlayır (alert fatigue).

**5. Contract testi "hər ikisi öz mockuna qarşı yaşıl" illuziyası ilə
əvəz etmək.** Frontend öz fake backend-inə qarşı test yazır, backend öz
sənədləşməsinə (bəlkə köhnəlmiş OpenAPI faylına) qarşı test yazır — heç kim
real-time-da hər ikisinin **eyni fikirdə olduğunu** yoxlamır. Contract
testinin məqsədi elə budur; onu buraxıb "hər ikisi yaşıldır" ilə kifayətlənmək
production-da inteqrasiya bug-ı riskini gizli saxlayır.

**6. E2E-ni unit testin əvəzinə istifadə etmək.** Sadə bir validasiya
qaydasını ("email formatı düzgün olmalıdır") E2E test ilə sınamaq — brauzeri
açıb, formaya yazıb, submit edib — mümkündür, amma 50-100x daha bahalıdır
eyni confidence üçün. Bu, "hər şeyi ən yuxarı qatda test et" refleksinin
nəticəsidir və CI vaxtını israf edir.

**7. Flaky testi "retry ilə yaşıllaşdırmaq".** Cypress Cloud və bənzər
alətlər flaky testi aşkarlamaq üçün retry mexanizmindən istifadə edir, amma
bu, **diaqnostika** vasitəsidir, həll yolu deyil. Retry-ı sadəcə CI-ni
yaşıllaşdırmaq üçün artırmaq (məsələn 1-dən 3-ə) əsl kök səbəbi (race
condition, test isolation-un olmaması) gizlədir və gec-tez daha bahalı formada
üzə çıxır.

---

## 5. Trade-off / dizayn sualları

**S1. Bir feature üçün test büdcəniz məhduddur (məsələn CI-də 10 dəqiqə).
Hansı laylara nə qədər ayırardınız, və niyə?**
Çərçivə: əvvəlcə "bu feature-da hansı bug production-da ən bahalı olardı"
sualını ver. Checkout axını üçün cavab çox güman E2E-yə üstünlük (pul
itkisi riski yüksək), sadə bir daxili admin panel üçün cavab əksinə
(integration-a üstünlük, aşağı risk). Ümumi qayda yoxdur — trade-off hər dəfə
feature-in **blast radius**-ına (uğursuzluğun nə qədər bahalı olduğuna) görə
yenidən qiymətləndirilməlidir.

**S2. E2E-yə nə qədər investisiya edərsiniz? Hansı nöqtədə "artıq bəsdir"
deyərsiniz?**
E2E-nin marjinal dəyəri sürətlə azalır — ilk bir neçə "kritik axın" testi
(login, checkout, əsas CRUD) böyük confidence verir, amma hər əlavə edge-case-i
E2E ilə örtmək (məsələn "email boşdursa error göstərilir") cost/benefit-i
tərsinə çevirir — bunu integration test daha sürətli, daha stabil sınayır.
Qayda: E2E-ni "happy path + ən bahalı risk nöqtələri" ilə məhdudlaşdır, qalan
variasiyaları aşağı qata köçür.

**S3. Contract testing-ə investisiya etməyə dəyərmi, yoxsa bu, kiçik komanda
üçün həddindən artıq mürəkkəblikdir?**
Contract testing-in ROI-si komanda sayı və deploy tezliyi ilə bağlıdır. Tək
monorepo-da, frontend və backend eyni PR-də birgə deploy olunursa, contract
test-in gücü azdır (E2E kifayət edə bilər). Çoxlu müstəqil mikroservis,
müstəqil deploy tsikli, çoxlu consumer olan API-lərdə isə contract testing
"hansı consumer-i qırmadan API-ni dəyişə bilərəm" sualına verdiyi cavabla
əvəzolunmazdır. Kiçik komanda üçün Pact-ın broker infrastrukturunu qurmaq
overhead ola bilər — bu halda sadə schema-based contract check (OpenAPI
diff) daha yüngül alternativ ola bilər (qeyd: bu, consumer-driven deyil,
provider-driven yanaşmadır — fərqli təminat verir).

**S4. Visual regression testing-i bütün komponent kitabxanasına, yoxsa
yalnız kritik səhifələrə tətbiq edərdiniz?**
Bütün komponentə tətbiq etmək (hər Storybook story-si üçün screenshot)
geniş əhatə verir, amma "noise" də artırır — hər kiçik, qəsdən edilmiş dizayn
dəyişikliyi çoxlu screenshot-un yenilənməsini tələb edir, bu da review yükünü
artırır. Trade-off: dizayn sisteminin özü (buttons, inputs — nadir dəyişən,
geniş istifadə olunan) üçün visual test yüksək dəyərlidir; tez-tez dəyişən
məhsul səhifələri üçün threshold-u boşaltmaq və ya bu testi seçmə əsasda
saxlamaq daha praqmatikdir.

---

## 6. Mock müsahibə sual-cavabları

**S: Testing Pyramid ilə Testing Trophy arasında fərq nədir, və frontend üçün
niyə Trophy daha uyğun sayılır?**
C: Pyramid unit testi əsas (ən çox) qat kimi görür — bu, backend-də (funksiya
= biznes məntiq) işləyir. Trophy isə integration testi əsas qat edir, çünki
frontend-də bug-ların çoxu komponentlərin qarşılıqlı təsirindən yaranır və
unit test bunun üçün çox təcrid olunmuş, over-mocked ssenari yaradır. Trophy-nin
əlavə fərqi: bazasına "static" (TypeScript/ESLint) qatını əlavə edir, çünki
müasir tooling bunu demək olar ki pulsuz confidence mənbəyi edib.

**S: Niyə `getByRole` `getByClassName` və ya `querySelector`-dan üstündür?**
C: Çünki `getByRole` istifadəçinin real qarşılaşdığı interfeysi (accessibility
tree-ni) əks etdirir — CSS class adı dəyişəndə test qırılmır, amma düymə
görünməz olsa/rolü dəyişsə (məs. `button`-dan `link`-ə) test bunu tutur. Bu,
həm Testing Library-nin, həm Playwright-in rəsmi tövsiyəsidir və əlavə fayda
olaraq accessibility-ni "pulsuz" yoxlayır — əgər `getByRole('button')` elementi
tapa bilmirsə, çox güman ki, o element screen reader üçün də düzgün
işarələnməyib.

**S: Bir komanda yeni gəldiyiniz layihədə bütün testlər E2E ilə yazılıb və
CI 45 dəqiqə çəkir. Necə yanaşardınız?**
C: Əvvəlcə hansı E2E testlərin əslində aşağı qatda (integration/unit) daha
sürətli və stabil sınana biləcəyini müəyyənləşdirərdim — xüsusən sadə
validasiya, edge-case variasiyaları, error-handling ssenariləri. "Kritik axın"
(login, checkout) E2E-də saxlanılır, qalanı Testing Library ilə integration
testə köçürülür. Paralel olaraq, E2E-lərin CI-də paralel shard-larla
işlədilməsi (browser-lar arası, test fayllar arası) də icra vaxtını azaldar —
bu struktur dəyişikliyi deyil, sadəcə infrastruktur optimallaşdırmasıdır.

**S: Contract testing nə üçündür, və onu niyə sadəcə "hər iki tərəf öz
mockuna qarşı test yazsın" ilə əvəz edə bilmərik?**
C: Çünki hər tərəfin öz mocku statik və köhnəlmiş ola bilər — frontend
mock-u API-nin 6 ay əvvəlki formasını əks etdirə bilər, backend bunu
bilmədən dəyişib. Hər iki test yaşıl keçir, amma real inteqrasiyada uyğunsuzluq
var. Contract testing bunun qarşısını konkret mexanizmlə alır: consumer-in
real istifadə etdiyi sahələri sənədləşdirən "contract" faylı generasiya olunur
və provider bu konkret contract-a qarşı verify olunur — bu, hər iki tərəfin
**eyni sənədə** qarşı yoxlanılması deməkdir, ayrı-ayrı fərziyyələrə yox.

**S: MSW-nin `jest.mock('axios')` kimi klassik mocking-dən fərqi nədir?**
C: `jest.mock()` modul səviyyəsində patch edir — komponentin daxilində
`axios.get` çağırışının özü əvəz olunur, bu da implementasiya detalına (hansı
HTTP client istifadə olunduğuna) test-i bağlayır. MSW isə şəbəkə səviyyəsində
işləyir — komponent real `fetch`/`axios` çağırışı edir, sorğu MSW tərəfindən
"yolda" tutulur. Nəticədə test client kitabxanasından asılı olmur (sabah
axios-dan fetch-ə keçsəniz, mock handler-lər dəyişməz qalır) və production-a
daha yaxın davranış sınanır.

**S: Kod: Bu test niyə flaky ola bilər, necə düzəldərdiniz?**
```javascript
cy.get('.user-list').should('have.length', 3);
cy.wait(1000);
cy.get('.delete-btn').first().click();
```
C: İki problem var: (1) `.user-list` CSS class-a bağlıdır — dizayn dəyişəndə
qırılar, `data-cy` atributuna keçirilməli. (2) `cy.wait(1000)` sabit
gözləmədir — silmə əməliyyatının nəticəsini (API cavabını) gözləmək əvəzinə
"1 saniyə kifayətdir" fərz edir; CI-də bu, ya lazımsız yavaşlıq, ya da kifayət
etməyən gözləmə (flaky fail) yaradır. Düzəliş: `cy.intercept` ilə silmə
sorğusuna alias qoyub `cy.wait('@deleteUser')` istifadə etmək, selector-ları
`data-cy` ilə əvəz etmək.

---

## 7. Mənbələr

- [Write tests. Not too many. Mostly integration. — Kent C. Dodds](https://kentcdodds.com/blog/write-tests)
- [The Testing Trophy and Testing Classifications — Kent C. Dodds](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)
- [Guiding Principles — Testing Library](https://testing-library.com/docs/guiding-principles/)
- [Best Practices — Playwright](https://playwright.dev/docs/best-practices)
- [Auto-waiting — Playwright](https://playwright.dev/docs/actionability)
- [Visual comparisons (toHaveScreenshot) — Playwright](https://playwright.dev/docs/test-snapshots)
- [Best Practices — Cypress](https://docs.cypress.io/app/core-concepts/best-practices)
- [Introduction to contract testing — Pact Docs](https://docs.pact.io/)
- [Can I Deploy — Pact Docs](https://docs.pact.io/pact_broker/can_i_deploy)
- [Introduction — Mock Service Worker (MSW)](https://mswjs.io/docs/)

**Qeyd — kasıb/qeyri-müəyyən sahələr:** Pact-ın rəsmi `docs.pact.io` giriş
səhifəsindən Pact Broker-in daxili memorial mexanizmi (Matrix) barədə detallı
texniki izahat məhdud idi; bu bölmə üçün `can_i_deploy` səhifəsindəki rəsmi
məlumatla tamamlandı. Həmçinin, Visual Regression Testing üzrə Percy/Chromatic
üçün rəsmi sənəd birbaşa fetch edilməyib (WebSearch nəticələri ilə kifayətləndi)
— Playwright-ın öz screenshot mexanizmi isə rəsmi sənəddən (playwright.dev)
birbaşa doğrulanıb. Percy/Chromatic-ə xas konkret threshold API-ləri bu
sənəddə göstərilmir, çünki birbaşa doğrulanmayıb; onların əvəzinə Playwright-ın
doğrulanmış `maxDiffPixels`/`mask` API-si nümunə kimi istifadə olunub.
