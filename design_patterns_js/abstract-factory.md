# Abstract Factory (Abstrakt Fabrik) Dizayn Patterni — JavaScript

## Giriş

**Abstract Factory** yaradıcı (creational) dizayn patternlərindən biridir. Onun əsas məqsədi **ümumi mövzu (theme) ilə bir-birinə bağlı olan obyektləri yaratmaqdır**. Obyekt-yönümlü proqramlaşdırmada **Factory** (fabrik) — başqa obyektləri yaradan obyektdir.

Adi halda obyekt yaratmaq üçün konstruktor funksiyasını `new` açar sözü ilə birbaşa çağırırıq. Lakin bəzən obyektin yaradılması üzərində daha çox nəzarətə ehtiyac olur. Bu zaman yaratma məsuliyyətini birbaşa konstruktora vermək əvəzinə, prosesin ümumi mənzərəsini daha yaxşı bilən **fabriklərə** ötürürük.

Bu pattern, xüsusilə bir-biri ilə əlaqəli obyekt ailələri yaradılarkən və müştəri (client) kodun yaradılan konkret tipləri bilmədən onlarla eyni cür işləməsi lazım olduqda faydalıdır.

## Əsas məzmun

### Pattern hansı problemi həll edir?

Abstract Factory konstruktorların təkbaşına verə bilmədiyi nəzarəti təmin edir. Aşağıdakı ssenarilərdə işə yarayır:

- **Obyektlərin keşlənməsi (caching), paylaşılması (sharing) və ya yenidən istifadəsi (reuse)**
- **Mürəkkəb yaratma məntiqi** olduqda
- Tətbiqin **obyekt və tip saylarını izləməsi** lazım olduqda
- Obyektlər **fərqli resurslar və ya qurğularla** qarşılıqlı işlədikdə

Yəni `new` ilə birbaşa çağırış əvəzinə, yaratma məsuliyyəti fabrikə həvalə olunur.

### İştirakçılar (Participants)

- **ConcreteFactory** (məs: `EmployeeFactory`, `VendorFactory`) — `create()` metodu vasitəsilə yeni məhsul (product) istehsal edir.
- **Products** (məs: `Employee`, `Vendor`) — fabriklərin yaratdığı instansiyalar (obyektlər).
- **AbstractFactory və AbstractProduct** — JavaScript implementasiyalarında **istifadə edilmir**.

> Qeyd: JavaScript-də klassik class əsaslı vərəsəlik (inheritance) olmadığına görə, konkret obyektlərin **eyni interfeysə** (eyni metod adlarına və imzalara) malik olmasını developer **əl ilə** təmin etməlidir.

## Kod nümunələri

Aşağıdakı nümunədə iki konkret fabrik (`EmployeeFactory` və `VendorFactory`) fərqli məhsul tipləri yaradır, lakin hər ikisi eyni interfeysi (`create` metodu və `say` metodu) saxlayır. Bu sayədə müştəri kod hər iki obyekt növü ilə eyni cür işləyə bilir.

```javascript
function Employee(name) {
    this.name = name;
    this.say = function () {
        console.log("I am employee " + name);
    };
}

function EmployeeFactory() {
    this.create = function (name) {
        return new Employee(name);
    };
}

function Vendor(name) {
    this.name = name;
    this.say = function () {
        console.log("I am vendor " + name);
    };
}

function VendorFactory() {
    this.create = function (name) {
        return new Vendor(name);
    };
}

function run() {
    var persons = [];
    var employeeFactory = new EmployeeFactory();
    var vendorFactory = new VendorFactory();

    persons.push(employeeFactory.create("Joan DiSilva"));
    persons.push(employeeFactory.create("Tim O'Neill"));
    persons.push(vendorFactory.create("Gerald Watson"));
    persons.push(vendorFactory.create("Nicole McNight"));

    for (var i = 0, len = persons.length; i < len; i++) {
        persons[i].say();
    }
}
```

### Kodun izahı

- **`Employee` və `Vendor`** — iki məhsul (product) tipidir. Hər ikisinin `name` xassəsi və `say()` metodu var (eyni interfeys).
- **`EmployeeFactory` və `VendorFactory`** — iki konkret fabrikdir. Hər biri `create(name)` metodu ilə öz məhsulunu qaytarır.
- **`run()`** — müştəri kod. Hər iki fabrikdən obyektlər yaradılır və `persons` massivinə yığılır. Sonra dövrdə hər bir obyektin `say()` metodu çağırılır — müştəri obyektin konkret tipini bilmədən onlarla **eyni cür** işləyir.

## ES6 `class` Məntiqi (MDN + javascript.info)

Dofactory nümunəsi köhnə üslubda — **konstruktor funksiyaları** (`function Employee(){}`) ilə yazılıb. Müasir JavaScript-də (ES6+) eyni iş **`class`** açar sözü ilə daha təmiz görünür. `class` — prototip əsaslı vərəsəliyin üstündə **sintaksis şəkəridir** (syntactic sugar), amma əlavə qaydalar gətirir.

### `class` vs `function` konstruktor — fərqlər

- **`new` məcburidir** — class adi funksiya kimi `new`-siz çağırıla bilməz.
- **Metodlar prototip üzərindədir** — bütün instansiyalar paylaşır, `for...in`-də görünmür (non-enumerable).
- **Strict mode** — class daxili kod avtomatik `"use strict"` rejimində işləyir.
- **Hoisting yoxdur** — `let`/`const` kimi temporal dead zone qaydasına tabedir.
- **`#` ilə private sahələr** — xaricdən əlçatmaz olan gizli sahələr.

### Əsas sintaksis

```javascript
class Rectangle {
    constructor(height, width) {  // new ilə avtomatik işə düşür
        this.height = height;
        this.width = width;
    }

    calcArea() {                  // instance metodu (prototipdə)
        return this.height * this.width;
    }

    get area() {                  // getter
        return this.calcArea();
    }

    static displayName = "Rectangle";  // static sahə (class özündə, instansiyada yox)
}

const sq = new Rectangle(10, 10);
console.log(sq.area);            // 100
```

### Vərəsəlik — `extends` və `super`

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name);             // valideyn konstruktoru çağır
    }
    speak() {
        super.speak();           // valideyn metodunu çağır
        console.log(`${this.name} barks.`);
    }
}

new Dog("Mitzie").speak();
// Mitzie makes a noise.
// Mitzie barks.
```

> **Vacib qayda:** subclass-da `constructor` varsa, `this`-dən istifadədən **əvvəl** mütləq `super()` çağırılmalıdır.

### Abstract Factory — `class` ilə yenidən yazılmış versiya

Yuxarıdakı dofactory nümunəsinin `class` ekvivalenti:

```javascript
// Products
class Employee {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log("I am employee " + this.name);
    }
}

class Vendor {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log("I am vendor " + this.name);
    }
}

// Factories
class EmployeeFactory {
    create(name) {
        return new Employee(name);
    }
}

class VendorFactory {
    create(name) {
        return new Vendor(name);
    }
}

// Client
function run() {
    const persons = [];
    const employeeFactory = new EmployeeFactory();
    const vendorFactory = new VendorFactory();

    persons.push(employeeFactory.create("Joan DiSilva"));
    persons.push(employeeFactory.create("Tim O'Neill"));
    persons.push(vendorFactory.create("Gerald Watson"));
    persons.push(vendorFactory.create("Nicole McNight"));

    persons.forEach(p => p.say());
}

run();
```

### Daha da irəli — ortaq `abstract` baza ilə

JavaScript-də həqiqi abstract class yoxdur, amma baza class + xəta atmaqla təqlid etmək olar. Bu, dofactory-nin "AbstractFactory/AbstractProduct JS-də istifadə olunmur" qeydinə alternativ yanaşmadır:

```javascript
class Person {
    constructor(name) {
        if (new.target === Person) {
            throw new Error("Person abstract-dır, birbaşa yaradıla bilməz");
        }
        this.name = name;
    }
    say() {
        throw new Error("say() override edilməlidir");
    }
}

class Employee extends Person {
    say() { console.log("I am employee " + this.name); }
}

class Vendor extends Person {
    say() { console.log("I am vendor " + this.name); }
}

// Ortaq fabrik interfeysi
class Factory {
    create(name) {
        throw new Error("create() override edilməlidir");
    }
}

class EmployeeFactory extends Factory {
    create(name) { return new Employee(name); }
}

class VendorFactory extends Factory {
    create(name) { return new Vendor(name); }
}
```

Burada `Person` və `Factory` **AbstractProduct** və **AbstractFactory** rolunu oynayır — `extends` ilə interfeys məcburiyyəti `class` mexanizmi tərəfindən təmin olunur (köhnə üslubda bunu developer əl ilə saxlamalı idi).

## Xülasə

- **Abstract Factory** — ümumi mövzu ilə bağlı obyektləri yaradan yaradıcı patterndir.
- Obyekt yaratma məsuliyyətini birbaşa konstruktordan **fabrikə** köçürür.
- Faydalıdır: caching/sharing/reuse, mürəkkəb yaratma məntiqi, obyekt sayının izlənməsi, fərqli resurslarla iş.
- İştirakçılar: **ConcreteFactory** və **Products**. JavaScript-də **AbstractFactory/AbstractProduct istifadə olunmur**.
- JavaScript class əsaslı vərəsəlik təklif etmədiyindən, obyektlərin eyni interfeysi saxlaması developerin məsuliyyətidir.

## Mənbə

https://www.dofactory.com/javascript/design-patterns/abstract-factory
