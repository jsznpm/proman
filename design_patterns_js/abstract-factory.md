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

## Xülasə

- **Abstract Factory** — ümumi mövzu ilə bağlı obyektləri yaradan yaradıcı patterndir.
- Obyekt yaratma məsuliyyətini birbaşa konstruktordan **fabrikə** köçürür.
- Faydalıdır: caching/sharing/reuse, mürəkkəb yaratma məntiqi, obyekt sayının izlənməsi, fərqli resurslarla iş.
- İştirakçılar: **ConcreteFactory** və **Products**. JavaScript-də **AbstractFactory/AbstractProduct istifadə olunmur**.
- JavaScript class əsaslı vərəsəlik təklif etmədiyindən, obyektlərin eyni interfeysi saxlaması developerin məsuliyyətidir.

## Mənbə

https://www.dofactory.com/javascript/design-patterns/abstract-factory
