# Rust Kursu — Hissə 6: Closures, Iterators, Testing, Concurrency

7 hissəlik Rust kursunun altıncı hissəsi. Əvvəlki hissədə
([rust-part5.md](rust-part5.md)) generics, traits və modullar öyrənildi.
Bu hissə funksional-tərz Rust-u (closures, iterators), test yazmağı və
paralel proqramlaşdırmanı əhatə edir.

## Ön tələblər

- [rust-part2.md](rust-part2.md) — ownership/borrowing (closure-lar
  dəyişənləri necə "tutduğunu" (capture) anlamaq üçün vacibdir).
- [rust-part5.md](rust-part5.md) — trait-lər (`Fn`/`FnMut`/`FnOnce`
  özləri trait-lərdir).

## Mündəricat

1. [Closure-lar](#closure-lar)
2. [Fn, FnMut, FnOnce](#fn-fnmut-fnonce)
3. [Iterator trait](#iterator-trait)
4. [map, filter, collect](#map-filter-collect)
5. [Unit test yazmaq](#unit-test-yazmaq)
6. [Threads](#threads)
7. [Mutex və Arc](#mutex-və-arc)
8. [Mesaj ötürmə (mpsc)](#mesaj-ötürmə-mpsc)
9. [Məşq](#məşq)
10. [Xülasə](#xülasə)
11. [Əlavə oxu](#əlavə-oxu)

## Closure-lar

Closure — anonim funksiya, ətrafındakı scope-dan dəyişənləri "tuta"
(capture) bilir (JS-dəki arrow function-a bənzəyir):

```rust
fn main() {
    let vergi_faizi = 18;

    // closure sintaksisi: |parametrlər| ifadə
    let vergi_hesabla = |məbləğ: f64| məbləğ * (vergi_faizi as f64) / 100.0;

    println!("Vergi: {}", vergi_hesabla(100.0));

    // tip annotasiyaları çox vaxt istəyə bağlıdır — compiler çıxarır:
    let cəm = |a, b| a + b;
    println!("{}", cəm(3, 4));
}
```

Fərq funksiyadan: closure ətraf mühitdəki (`vergi_faizi` kimi)
dəyişənlərə birbaşa çata bilir; adi `fn` isə yalnız öz parametrlərinə
çatır.

## Fn, FnMut, FnOnce

Closure-lar tutduqları dəyişənlərlə necə davrandığına görə 3 trait-dən
birini implement edir:

- **`Fn`** — dəyişənləri yalnız **oxuyur** (`&T` kimi tutur). Neçə dəfə
  çağırıla bilər.
- **`FnMut`** — dəyişənləri **dəyişir** (`&mut T` kimi tutur). Neçə dəfə
  çağırıla bilər.
- **`FnOnce`** — dəyişənlərin **sahibliyini alır** (move edir). Yalnız
  **bir dəfə** çağırıla bilər.

```rust
fn main() {
    let siyahı = vec![1, 2, 3];

    // Fn — yalnız oxuyur
    let çap_et = || println!("Siyahı: {:?}", siyahı);
    çap_et();
    çap_et(); // problemsiz — yalnız borrow edir

    let mut sayğac = 0;
    // FnMut — dəyişir
    let mut artır = || {
        sayğac += 1;
        println!("Sayğac: {sayğac}");
    };
    artır();
    artır();
}
```

Compiler closure-un hansı trait-ə uyğun olduğunu **avtomatik** çıxarır —
bunu əl ilə yazmırsınız, amma funksiya parametri kimi closure qəbul
edərkən hansı trait-i tələb etdiyinizi seçirsiniz:

```rust
fn əməliyyatı_icra_et<F: FnOnce() -> String>(f: F) -> String {
    f()
}

fn main() {
    let ad = String::from("Rust");
    let netice = əməliyyatı_icra_et(move || format!("Salam, {ad}!"));
    println!("{netice}");
}
```

`move` açar sözü closure-a bütün tutduğu dəyişənlərin sahibliyini
**məcburi köçürməyi** bildirir (adətən thread-lərə closure ötürərkən
lazım olur — aşağıda görəcəyik).

## Iterator trait

Iterator — kolleksiya üzərində "bir-bir keçid" abstraksiyasıdır:

```rust
trait Iterator {
    type Item; // associated type — hər implementasiya öz Item tipini təyin edir
    fn next(&mut self) -> Option<Self::Item>;
}
```

```rust
fn main() {
    let v = vec![1, 2, 3];
    let mut iter = v.iter();

    println!("{:?}", iter.next()); // Some(1)
    println!("{:?}", iter.next()); // Some(2)
    println!("{:?}", iter.next()); // Some(3)
    println!("{:?}", iter.next()); // None
}
```

`for` dövrü daxildə məhz bunu edir — `.iter()` çağırıb `None` gələnə
qədər `.next()` işlədir.

**Niyə vacibdir — "lazy evaluation":** iterator-lar **lazy**dir, yəni
`map`/`filter` kimi metodlar çağırılanda dərhal işləmir, yalnız
`collect()`, `for`, `sum()` kimi "istehlak edən" (consuming) bir metod
çağırılanda faktiki icra olunur. Bu, lazımsız aralıq siyahılar
yaratmadan effektiv zəncirləmə (chaining) imkanı verir.

## map, filter, collect

```rust
fn main() {
    let reqemler = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let cüt_kvadratlar: Vec<i32> = reqemler
        .iter()
        .filter(|&&r| r % 2 == 0)  // yalnız cüt ədədlər
        .map(|r| r * r)             // hər birinin kvadratı
        .collect();                 // yeni Vec-ə yığ

    println!("{:?}", cüt_kvadratlar); // [4, 16, 36, 64, 100]

    let cəm: i32 = reqemler.iter().sum();
    let ən_böyük = reqemler.iter().max();

    println!("Cəm: {cəm}, Ən böyük: {:?}", ən_böyük);
}
```

`|&&r| ...` — `filter` referansa referans (`&&i32`) ötürür (çünki
`.iter()` `&i32` verir, `filter` isə bunu daha da borrow edir); `&&r`
pattern-i hər iki səviyyəni "açır" (dereference edir).

**Performans qeydi:** iterator zənciri (`filter`+`map`+`collect`) əl ilə
yazılmış `for` dövrü qədər sürətlidir — Rust compiler-i bunları optimallaş
dıraraq "zero-cost abstraction" halına gətirir (heç bir əlavə runtime
xərci olmur).

## Unit test yazmaq

Rust-da testlər adətən eyni faylda, `#[cfg(test)]` modulu daxilində
yazılır:

```rust
fn topla(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*; // xarici moduldakı hər şeyi import edir (topla daxil)

    #[test]
    fn iki_musbet_edeed_toplanir() {
        assert_eq!(topla(2, 3), 5);
    }

    #[test]
    fn menfi_ve_musbet_toplanir() {
        assert_eq!(topla(-2, 5), 3);
    }

    #[test]
    #[should_panic]
    fn sifira_bolme_panik_edir() {
        let _ = 10 / (5 - 5);
    }
}
```

İşə salmaq:

```bash
cargo test
```

`#[cfg(test)]` — bu modulu yalnız `cargo test` çağırılanda compile edir,
normal `cargo build`-də test kodu binary-ə əlavə olunmur. `assert_eq!`,
`assert!`, `assert_ne!` — ən çox istifadə olunan assertion makroları.

**Niyə vacibdir:** Rust-un compiler-i çox şeyi (null-lar, data race-lər,
tip xətaları) tutsa da, **məntiq xətalarını** (biznes logikasının səhv
olması) tutmur — buna görə test yazmaq digər dillərdə olduğu kimi vacib
qalır.

## Threads

`std::thread` ilə paralel icra:

```rust
use std::thread;
use std::time::Duration;

fn main() {
    let əl = thread::spawn(|| {
        for i in 1..5 {
            println!("thread-dən: {i}");
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..3 {
        println!("əsas thread-dən: {i}");
        thread::sleep(Duration::from_millis(1));
    }

    əl.join().unwrap(); // əsas thread `əl` bitənə qədər gözləyir
}
```

`thread::spawn` yeni OS thread-i başladır. `.join()` çağırılmasa, əsas
proqram bitəndə digər thread-lər dərhal dayandırıla bilər (nəticələri
itirə bilərsiniz) — buna görə nəticəni gözləmək lazımdırsa `.join()`
mütləqdir.

## Mutex və Arc

Bir dəyəri **çoxlu thread arasında paylaşıb dəyişmək** lazımdırsa,
Rust-un ownership qaydaları buna icazə verməz (bir dəyərin bir sahibi
olmalıdır!) — ona görə xüsusi tiplər lazımdır:

- **`Mutex<T>`** — "mutual exclusion": eyni anda yalnız bir thread-in
  daxili dəyərə çatmasına icazə verir (`.lock()` ilə).
- **`Arc<T>`** — "atomic reference counted": thread-lər arasında
  **paylaşılan sahiblik** üçün (`Rc<T>`-nin thread-safe versiyası,
  Part 7-də `Rc` ətraflı izah olunacaq).

```rust
use std::sync::{Mutex, Arc};
use std::thread;

fn main() {
    let sayğac = Arc::new(Mutex::new(0));
    let mut əllər = vec![];

    for _ in 0..10 {
        let sayğac = Arc::clone(&sayğac); // Arc klonlamaq ucuzdur — yalnız reference count artır
        let əl = thread::spawn(move || {
            let mut dəyər = sayğac.lock().unwrap(); // digər thread-lər gözləyir
            *dəyər += 1;
        }); // lock burada avtomatik buraxılır (scope bitir)
        əllər.push(əl);
    }

    for əl in əllər {
        əl.join().unwrap();
    }

    println!("Nəticə: {}", *sayğac.lock().unwrap()); // 10
}
```

**Niyə vacibdir:** compiler `Mutex`/`Arc` olmadan bu kodu **compile
etməyəcək** — birbaşa `sayğac` dəyişənini bir neçə thread-ə ötürməyə
çalışsanız, "cannot move" xətası alarsınız. Bu, Rust-un ən güclü
vədlərindən biridir: **data race-lər runtime-da deyil, compile zamanı**
qarşısı alınır ("fearless concurrency" adlanır).

## Mesaj ötürmə (mpsc)

Paylaşılan yaddaş əvəzinə, thread-lər arasında **kanal** vasitəsilə mesaj
ötürmək olar (Go-nun channel-larına bənzəyir):

```rust
use std::sync::mpsc; // multiple producer, single consumer
use std::thread;

fn main() {
    let (göndərici, alıcı) = mpsc::channel();

    thread::spawn(move || {
        let mesajlar = vec![
            String::from("salam"),
            String::from("necəsən"),
            String::from("Rust-dan"),
        ];

        for mesaj in mesajlar {
            göndərici.send(mesaj).unwrap();
        }
    });

    for alınan in alıcı {
        println!("Alındı: {alınan}");
    }
}
```

`for alınan in alıcı` — göndərici tərəf bağlanana (thread bitənə) qədər
mesajları gözləyib alır. **Fəlsəfə (Go-dan götürülüb):** "yaddaşı
paylaşaraq ünsiyyət qurma yerinə, ünsiyyət qurmaqla yaddaşı paylaş."

## Məşq

Paralel say hesablama proqramı yazın: 4 thread, hər biri 1-dən 25-ə qədər
ədədlərin bir hissəsini toplasın, nəticələri `Mutex` ilə birləşdirsin.

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let ümumi_cəm = Arc::new(Mutex::new(0));
    let mut əllər = vec![];

    let intervallar = [(1, 25), (26, 50), (51, 75), (76, 100)];

    for (başlanğıc, son) in intervallar {
        let ümumi_cəm = Arc::clone(&ümumi_cəm);
        let əl = thread::spawn(move || {
            let yerli_cəm: i32 = (başlanğıc..=son).sum();
            let mut cəm = ümumi_cəm.lock().unwrap();
            *cəm += yerli_cəm;
        });
        əllər.push(əl);
    }

    for əl in əllər {
        əl.join().unwrap();
    }

    println!("1-dən 100-ə qədər cəm: {}", *ümumi_cəm.lock().unwrap());
}
```

Özünüz yoxlayın: iterator versiyası ilə müqayisə edin —
`(1..=100).sum::<i32>()` eyni nəticəni verir, çox daha sadədir. (Bu
məşqin məqsədi sadəlik deyil, thread/Mutex/Arc mexanikasını
göstərməkdir — real layihələrdə paralellik yalnız faktiki performans
qazancı olanda seçilməlidir.)

## Xülasə

- Closure — ətraf mühiti tuta bilən anonim funksiya; `Fn` (oxuyur),
  `FnMut` (dəyişir), `FnOnce` (sahiblik alır, bir dəfə çağırılır).
- Iterator-lar lazy-dir; `map`/`filter`/`collect`/`sum` zəncirlənir, zero-
  cost abstraction sayəsində əl ilə yazılmış dövr qədər sürətlidir.
- Testlər `#[cfg(test)] mod tests` daxilində, `#[test]` ilə işarələnir;
  `cargo test` ilə işə salınır.
- `thread::spawn` yeni OS thread yaradır; `.join()` nəticəni gözləyir.
- `Mutex<T>` — thread-lər arası təhlükəsiz mutasiya; `Arc<T>` — thread-lər
  arası paylaşılan sahiblik. Compiler bunlar olmadan paralel data race-ə
  icazə vermir.
- `mpsc::channel` — thread-lər arası mesaj ötürmə, paylaşılan yaddaşa
  alternativ.

## Əlavə oxu

- [The Book — Ch. 13: Functional Language Features (Iterators & Closures)](https://doc.rust-lang.org/book/ch13-00-functional-features.html)
- [The Book — Ch. 11: Writing Automated Tests](https://doc.rust-lang.org/book/ch11-00-testing.html)
- [The Book — Ch. 16: Fearless Concurrency](https://doc.rust-lang.org/book/ch16-00-concurrency.html)
- [Rust By Example — Testing](https://doc.rust-lang.org/rust-by-example/testing.html)

**Əvvəlki hissə:** [rust-part5.md](rust-part5.md)
**Növbəti hissə:** [rust-part7.md](rust-part7.md) — Smart Pointer-lər,
Unsafe, Mini Layihə (kursun sonuncu hissəsi).
