# JavaScript Interview: `curry()` Funksiyasını Implement Etmək

JavaScript interview-larında tez-tez verilən suallardan biri **curry funksiyasını implement etməkdir**. Bu sual sadəcə kod yazmaq deyil — aşağıdakı mövzuları yoxlayır:

* Closure anlayışı
* Higher-order functions
* Function properties
* Rest operator
* Partial application

---

## Problem

Bizdən bir `curry()` funksiyası yazmaq tələb olunur. Bu funksiya qəbul etdiyi funksiyanı curried versiyaya çevirməlidir.

Məsələn:

```js
const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};

const curriedJoin = curry(join);

curriedJoin(1, 2, 3);
// "1_2_3"

curriedJoin(1)(2, 3);
// "1_2_3"

curriedJoin(1, 2)(3);
// "1_2_3"

curriedJoin(1)(2)(3);
// "1_2_3"
```

---

## Curry nədir?

Normal funksiya:

```js
function add(a, b, c) {
  return a + b + c;
}

add(1, 2, 3);
```

Burada bütün argumentləri bir dəfə veririk.

Curry isə funksiyanı dəyişir:

```js
add(1)(2)(3);
```

Yəni argumentləri hissə-hissə göndərə bilirik.

---

## Əsas fikir

Əvvəl bilməliyik: **"Bu funksiya neçə argument gözləyir?"**

Bunu JavaScript-də belə öyrənə bilərik:

```js
function join(a, b, c) {}

console.log(join.length); // 3
```

`function.length` bizə parametr sayını verir.

---

## Həll

```js
function curry(fn) {
  return function curried(...args) {

    if (args.length >= fn.length) {
      return fn(...args);
    }

    return function (...nextArgs) {
      return curried(...args, ...nextArgs);
    };

  };
}
```

---

## Addım-addım izah

### 1. Funksiyanı qəbul edirik

```js
function curry(fn)
```

Burada `fn = join` olur.

### 2. Yeni funksiya qaytarırıq

```js
return function curried(...args)
```

Artıq bizim yeni funksiyamız var:

```js
const curriedJoin = curry(join);
```

### 3. Argumentləri toplayırıq

Məsələn:

```js
curriedJoin(1);
```

Burada `args = [1]` olur.

Yoxlayırıq:

```js
args.length >= fn.length
// 1 >= 3  →  false
```

Hələ kifayət deyil.

### 4. Yeni funksiya qaytarırıq

```js
return function (...nextArgs)
```

Bu funksiya gələcək argumentləri gözləyir.

Məsələn:

```js
curriedJoin(1)(2, 3);
```

İkinci çağırışda `nextArgs = [2, 3]` olur.

### 5. Köhnə və yeni argumentləri birləşdiririk

Bu hissə:

```js
curried(...args, ...nextArgs)
```

deməkdir — əvvəlkilər `[1]` və yenilər `[2, 3]` birləşir → `[1, 2, 3]`.

### 6. Artıq kifayət qədər argument varsa

İndi `args.length = 3` və `fn.length = 3` olur.

Şərt:

```js
3 >= 3  →  true
```

İşləyir:

```js
return fn(...args); // join(1, 2, 3)
```

Nəticə:

```
1_2_3
```

---

## Əsas JavaScript konseptləri

### Closure

Bu hissə:

```js
return function (...nextArgs) {
  return curried(...args, ...nextArgs);
};
```

`args` dəyişənini yadda saxlayır.

Məsələn, `curriedJoin(1)` çağırışında `1` yadda qalır. Sonra `(2, 3)` gələndə əvvəlki `1` itmir.

---

## Interview cavabı (qısa formada)

Əgər interview-da "Implement curry" soruşsalar, demək olar:

> Curry funksiyası verilən funksiyanın gözlədiyi argument sayını `fn.length` ilə yoxlayır. Argumentlər kifayət deyilsə closure vasitəsilə yeni funksiya qaytarır və gələn argumentləri əvvəlkilərlə birləşdirir. Argument sayı tamam olduqda isə original funksiyanı çağırır.

Bu sual əsasən **closure və functional programming anlayışını** yoxlayır.
