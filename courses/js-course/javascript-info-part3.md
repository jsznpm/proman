# JavaScript.info Kursu — Hissə 3: Funksiyalar, Prototiplər və Class-lar

Bu, [javascript.info](https://javascript.info/) əsaslı 6 hissəlik kursun üçüncü hissəsidir. Plan faylı: `javascript-info.plan.md`.

## Kimlər üçündür?

Part 1 və Part 2-ni tamamlamış, obyekt, `this` və array metodlarını bilən öyrənənlər üçün.

## Ön şərtlər

Part 1–2: funksiyalar, obyektlər, `this`.

## Məzmun

1. [Rekursiya](#rekursiya)
2. [Rest parametrlər və Spread sintaksisi](#rest-parametrlər-və-spread-sintaksisi)
3. [Closure (dəyişən bağlanması)](#closure-dəyişən-bağlanması)
4. [Arrow function və `this`](#arrow-function-və-this)
5. [`setTimeout` və `setInterval`](#settimeout-və-setinterval)
6. [Obyekt xüsusiyyət konfiqurasiyası](#obyekt-xüsusiyyət-konfiqurasiyası)
7. [Getter və Setter](#getter-və-setter)
8. [Prototiplər və varislik](#prototiplər-və-varislik)
9. [Class sintaksisi](#class-sintaksisi)
10. [Class varisliyi](#class-varisliyi)
11. [Praktika](#praktika)
12. [Xülasə](#xülasə)
13. [Əlavə oxu](#əlavə-oxu)

---

## Rekursiya

Rekursiya — funksiyanın özünü çağırması. Adətən "baza halı" (dayanma şərti) və "rekursiv addım" olur.

```js
function factorial(n) {
  if (n <= 1) return 1;      // baza halı
  return n * factorial(n - 1); // rekursiv addım
}

factorial(5); // 120
```

**Ümumi səhv:** Baza halı unudulduqda "stack overflow" xətası alınır — funksiya sonsuz özünü çağırır.

## Rest parametrlər və Spread sintaksisi

**Rest** (`...`) — funksiyaya qeyri-müəyyən sayda arqument ötürmək üçün, hamısını array şəklində toplayır:

```js
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3, 4); // 10
```

**Spread** — array və ya obyekti "açaraq" ayrı elementlərə çevirir:

```js
let nums = [1, 2, 3];
console.log(Math.max(...nums)); // 3 — Math.max(1, 2, 3) kimi çağırılır

let arr1 = [1, 2];
let arr2 = [3, 4];
let merged = [...arr1, ...arr2]; // [1, 2, 3, 4]

let obj1 = { a: 1 };
let obj2 = { b: 2 };
let mergedObj = { ...obj1, ...obj2 }; // { a: 1, b: 2 }
```

**Niyə vacibdir:** Part 2-də obyekt kopyalamaq üçün istifadə etdiyimiz `{...obj}` da məhz bu spread sintaksisidir.

## Closure (dəyişən bağlanması)

Closure — funksiyanın yaradıldığı mühitdəki dəyişənləri "yadda saxlaması", həmin mühit artıq mövcud olmasa belə.

```js
function makeCounter() {
  let count = 0; // xarici mühit
  return function() {
    count++;      // daxili funksiya xarici dəyişəni "yadda saxlayır"
    return count;
  };
}

let counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3 — count sıfırlanmır, çünki closure onu saxlayır
```

**Niyə vacibdir:** Closure JavaScript-də "private" (gizli) vəziyyət yaratmağın əsas üsuludur — `count` dəyişəni xaricdən birbaşa əlçatan deyil, yalnız qaytarılan funksiya vasitəsilə dəyişdirilə bilər.

**Ümumi səhv:** Dövr içində closure yaradarkən `var` istifadə etmək gözlənilməz nəticələr verir:

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3 — hamısı sonuncu dəyəri göstərir
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2 — hər iterasiya öz `i`sinə malikdir
}
```

Bu, `let`-in blok-səviyyəli scope-a malik olmasından qaynaqlanır — `var` isə funksiya-səviyyəlidir (Part 1-də qeyd edildi).

## Arrow function və `this`

Part 1-də qeyd olunduğu kimi, arrow function-ların öz `this` dəyəri yoxdur — əhatə edən (adi funksiya) kontekstdən götürür. Bu, metod daxilində callback yazarkən çox faydalıdır:

```js
let user = {
  name: 'Aygün',
  friends: ['Nərgiz', 'Elvin'],
  showFriends() {
    // arrow function `this`-i showFriends-in `this`-indən götürür (user)
    this.friends.forEach(friend => {
      console.log(`${this.name}-nin dostu: ${friend}`);
    });
  }
};

user.showFriends();
// Aygün-nin dostu: Nərgiz
// Aygün-nin dostu: Elvin
```

Əgər burada adi `function` istifadə edilsəydi, `this` `undefined` olardı (strict mode-da), çünki adi funksiyanın öz `this`-i "çağırış üsulundan" asılıdır, `forEach` isə funksiyanı obyekt konteksti olmadan çağırır.

## `setTimeout` və `setInterval`

```js
setTimeout(() => console.log('3 saniyə sonra'), 3000);

let intervalId = setInterval(() => console.log('Hər 1 saniyədə'), 1000);
setTimeout(() => clearInterval(intervalId), 5000); // 5 saniyə sonra dayandır
```

`setTimeout` bir dəfə, `setInterval` təkrarən icra edir. Hər ikisi ID qaytarır — `clearTimeout`/`clearInterval` ilə ləğv edilə bilər.

## Obyekt xüsusiyyət konfiqurasiyası

Hər obyekt xüsusiyyətinin görünməyən "flag"ları var: `writable` (yazıla bilər), `enumerable` (dövrdə görünür), `configurable` (silinə/dəyişdirilə bilər).

```js
let user = { name: 'Aygün' };

Object.defineProperty(user, 'name', {
  writable: false // artıq dəyişdirilə bilməz
});

user.name = 'Nərgiz'; // sakitcə uğursuz olur (strict mode-da xəta atır)
console.log(user.name); // Aygün
```

**Niyə vacibdir:** Bu, kitabxana yazarlarının API-larını "toxunulmaz" etmək üçün istifadə etdiyi mexanizmdir — praktikada gündəlik kodda az istifadə olunur, amma necə işlədiyini bilmək faydalıdır.

## Getter və Setter

Xüsusiyyətə giriş/yazma zamanı funksiya işə salmaq üçün:

```js
let user = {
  firstName: 'Aygün',
  lastName: 'Məmmədova',

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  set fullName(value) {
    [this.firstName, this.lastName] = value.split(' ');
  }
};

console.log(user.fullName); // Aygün Məmmədova — metod kimi yox, xüsusiyyət kimi çağırılır
user.fullName = 'Nərgiz Əliyeva';
console.log(user.firstName); // Nərgiz
```

## Prototiplər və varislik

JavaScript-də hər obyekt "prototip" adlanan başqa obyektə istinad edə bilər, ondan xüsusiyyət/metod "miras" alır.

```js
let animal = {
  eats: true,
  walk() {
    console.log('Heyvan gəzir');
  }
};

let rabbit = {
  jumps: true,
  __proto__: animal // rabbit indi animal-dan miras alır
};

rabbit.walk();    // Heyvan gəzir — öz metodu olmasa da, prototipdən götürür
console.log(rabbit.eats); // true
```

**Niyə vacibdir:** `class` sintaksisi (aşağıda) əslində bu prototip mexanizminin "üzərinə qurulmuş" daha oxunaqlı formasıdır — arxa planda hər şey prototip zənciri ilə işləyir.

## Class sintaksisi

```js
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHi() {
    console.log(`Salam, mən ${this.name}, ${this.age} yaşındayam`);
  }
}

let user = new User('Aygün', 25);
user.sayHi(); // Salam, mən Aygün, 25 yaşındayam
```

- `constructor` — `new User(...)` çağırıldıqda avtomatik icra olunur.
- Metodlar (`sayHi`) bütün instansiyalar arasında **paylaşılır** (prototipdə saxlanılır), hər instansiya üçün kopyalanmır.

**Private (gizli) sahələr** — `#` prefiksi ilə, yalnız class daxilindən əlçatan:

```js
class BankAccount {
  #balance = 0; // private field

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

let account = new BankAccount();
account.deposit(100);
console.log(account.getBalance()); // 100
console.log(account.#balance); // XƏTA — class xaricindən əlçatan deyil
```

**Statik metodlar** (`static`) — instansiyaya deyil, class-ın özünə bağlıdır:

```js
class MathHelper {
  static square(x) {
    return x * x;
  }
}

MathHelper.square(4); // 16 — instansiya yaratmağa ehtiyac yoxdur
```

## Class varisliyi

`extends` açar sözü ilə bir class digərindən miras alır:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  walk() {
    console.log(`${this.name} gəzir`);
  }
}

class Rabbit extends Animal {
  jump() {
    console.log(`${this.name} tullanır`);
  }
}

let rabbit = new Rabbit('Dovşan');
rabbit.walk(); // Dovşan gəzir — Animal-dan miras
rabbit.jump(); // Dovşan tullanır — öz metodu
```

`super()` — valideyn class-ın konstruktorunu çağırmaq üçün, adətən uşaq class-ın konstruktorunda ilk sətir olmalıdır:

```js
class Rabbit extends Animal {
  constructor(name, earLength) {
    super(name); // Animal-ın constructor-unu çağırır
    this.earLength = earLength;
  }
}
```

**Ümumi səhv:** Uşaq class-da `constructor` yazıldıqda `super()` çağırışı unudulduqda, `this`-ə giriş cəhdi xəta atır — JS uşaq class-ın `this`-i valideyn konstruktoru işə düşməmiş yaratmağa icazə vermir.

## Praktika

Sadə bank hesabı sistemi yazın: `Account` class-ı `#balance` private sahə ilə, `deposit`, `withdraw` (yetərli balans yoxlanışı ilə) metodları olsun, `SavingsAccount` bundan miras alıb faiz hesablasın.

```js
class Account {
  #balance;

  constructor(owner, initialBalance = 0) {
    this.owner = owner;
    this.#balance = initialBalance;
  }

  deposit(amount) {
    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount > this.#balance) {
      console.log('Yetərli balans yoxdur');
      return;
    }
    this.#balance -= amount;
  }

  getBalance() {
    return this.#balance;
  }
}

class SavingsAccount extends Account {
  constructor(owner, initialBalance, rate) {
    super(owner, initialBalance);
    this.rate = rate;
  }

  addInterest() {
    this.deposit(this.getBalance() * this.rate);
  }
}

let acc = new SavingsAccount('Aygün', 1000, 0.05);
acc.addInterest();
console.log(acc.getBalance()); // 1050
```

Özünüz sınayın: `Account` class-ına `transferTo(otherAccount, amount)` metodu əlavə edin — cari hesabdan çıxıb digərinə yatırsın, balans yetərsizdirsə əməliyyatı ləğv etsin.

## Xülasə

- Closure funksiyanın yaradıldığı mühitdəki dəyişənləri saxlamasıdır — private vəziyyət üçün əsas mexanizm.
- Arrow function öz `this`-i yoxdur, əhatə edən kontekstdən götürür — bu, callback-lərdə çox faydalıdır.
- `Object.defineProperty`, getter/setter xüsusiyyətlərə giriş/yazmanı incə idarə etməyə imkan verir.
- Prototip — JS-in miras mexanizminin təməli, `class` bunun üzərinə qurulmuş oxunaqlı sintaksisdir.
- `extends`/`super` class varisliyini təmin edir, `#` prefiksi private sahələr üçündür.

## Əlavə oxu

- Mənbə: [javascript.info](https://javascript.info/) — "The Modern JavaScript Tutorial"
- Əvvəlki hissə: `javascript-info-part2.md`
- Növbəti hissə: `javascript-info-part4.md` — Xətaların İdarə Olunması və Asinxron JavaScript
