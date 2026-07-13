# Rust Kursu — Hissə 4: Kolleksiyalar və Xəta İdarəetməsi

7 hissəlik Rust kursunun dördüncü hissəsi. Əvvəlki hissədə
([rust-part3.md](rust-part3.md)) struct, enum və pattern matching
öyrənildi. Bu hissədə dinamik kolleksiyaları (`Vec`, `String`, `HashMap`)
və Rust-un exception-suz xəta idarəetmə modelini öyrənəcəksiniz.

## Ön tələblər

- [rust-part2.md](rust-part2.md) — ownership/borrowing (kolleksiyalarla
  işləyərkən daim qarşımıza çıxacaq).
- [rust-part3.md](rust-part3.md) — `Option<T>` və `match` (`Result<T, E>`
  eyni məntiqlə işləyir).

## Mündəricat

1. [Vec\<T\>](#vect)
2. [String](#string)
3. [HashMap\<K, V\>](#hashmapk-v)
4. [panic! ilə bərpaolunmaz xətalar](#panic-ilə-bərpaolunmaz-xətalar)
5. [Result\<T, E\> ilə bərpaolunan xətalar](#resultt-e-ilə-bərpaolunan-xətalar)
6. [? operatoru](#-operatoru)
7. [Nə vaxt panic, nə vaxt Result](#nə-vaxt-panic-nə-vaxt-result)
8. [Məşq: mətn emalı proqramı](#məşq-mətn-emalı-proqramı)
9. [Xülasə](#xülasə)
10. [Əlavə oxu](#əlavə-oxu)

## Vec\<T\>

`Vec<T>` — ölçüsü runtime-da dəyişə bilən, heap üzərində saxlanan,
eyni-tipli elementlərin siyahısı (JS-dəki array-in analoqu).

```rust
fn main() {
    let mut reqemler: Vec<i32> = Vec::new();
    reqemler.push(1);
    reqemler.push(2);
    reqemler.push(3);

    // qısa yaratma yolu:
    let reqemler2 = vec![1, 2, 3];

    println!("{:?}", reqemler);

    // element oxumaq — 2 üsul:
    let ucuncu: &i32 = &reqemler[2];        // index — sərhəddən çıxarsa panic
    let ucuncu_opt: Option<&i32> = reqemler.get(2); // .get() — sərhəddən çıxarsa None

    println!("Üçüncü: {ucuncu}, Option: {:?}", ucuncu_opt);

    for r in &reqemler {
        println!("{r}");
    }
}
```

**Niyə `.get()` daha təhlükəsizdir:** `reqemler[10]` mövcud olmayan
index-lə çağırılsa proqram **panic** edir (dayanır). `reqemler.get(10)`
isə `None` qaytarır — proqram davam edir, siz qərar verirsiniz. İstifadəçi
girişindən gələn index-lərlə işləyəndə həmişə `.get()` üstünlük təşkil
etməlidir.

## String

`String` — böyüyə bilən, heap üzərində UTF-8 kodlaşdırılmış mətn. `&str`
isə (Part 2-də gördüyümüz kimi) bu mətnə reference-dir.

```rust
fn main() {
    let mut s = String::from("salam");
    s.push_str(", dünya"); // sətir əlavə edir
    s.push('!');           // tək simvol əlavə edir

    let s2 = String::from("!!!");
    let birləşmiş = s + &s2; // + operatoru — s-in sahibliyini alır

    println!("{birləşmiş}");

    // format! — birləşdirmə üçün daha oxunaqlı, heç bir sahiblik köçürmür:
    let cümlə = format!("{birləşmiş} - Rust ilə");
    println!("{cümlə}");
}
```

**Diqqət:** `String` UTF-8 olduğu üçün index ilə (`s[0]`) simvol almaq
**olmur** — bu compile xətasıdır. Səbəb: UTF-8-də bir simvol bir neçə bayt
tuta bilər (məsələn Azərbaycan hərfləri `ə`, `ö`, `ğ`), ona görə "3-cü
bayt" ilə "3-cü simvol" fərqli şeylərdir. Simvollar üzərində iterasiya
üçün:

```rust
fn main() {
    let s = "salam əziz dünya";
    for simvol in s.chars() {
        print!("{simvol}-");
    }
}
```

## HashMap\<K, V\>

Açar-dəyər (key-value) saxlamaq üçün (JS-dəki `Map`/obyektin analoqu):

```rust
use std::collections::HashMap;

fn main() {
    let mut ballar: HashMap<String, i32> = HashMap::new();
    ballar.insert(String::from("Mavi komanda"), 10);
    ballar.insert(String::from("Qırmızı komanda"), 50);

    let komanda = String::from("Mavi komanda");
    match ballar.get(&komanda) {
        Some(bal) => println!("Bal: {bal}"),
        None => println!("Komanda tapılmadı"),
    }

    // yalnız açar yoxdursa əlavə et:
    ballar.entry(String::from("Yaşıl komanda")).or_insert(0);

    for (açar, dəyər) in &ballar {
        println!("{açar}: {dəyər}");
    }
}
```

`use std::collections::HashMap;` — `HashMap` standart kitabxanadadır, amma
`Vec`/`String`-dən fərqli olaraq avtomatik import edilmir (bunlar
"prelude"də yoxdur), ona görə `use` ilə əlavə edilməlidir. Modul sistemi
Part 5-də ətraflı izah olunacaq.

## panic! ilə bərpaolunmaz xətalar

`panic!` — proqramı dərhal dayandıran, bərpaolunmaz xəta bildirişidir:

```rust
fn main() {
    let v = vec![1, 2, 3];
    println!("{}", v[99]); // panic: index out of bounds
}
```

Öz panic-inizi əl ilə də çağıra bilərsiz:

```rust
fn bol(a: i32, b: i32) -> i32 {
    if b == 0 {
        panic!("sıfıra bölmə mümkün deyil!");
    }
    a / b
}
```

`panic!` proqramı çıxarmadan əvvəl stack-i "unwind" edir (təmizləyir).
Bu, əsl proqramçı xətasını (bug) göstərir — məsələn, kodun heç vaxt baş
verməyəcəyini düşündüyünüz bir hal.

## Result\<T, E\> ilə bərpaolunan xətalar

Əməliyyat uğursuz ola bilər, amma proqram bunu **gözləyir** və davam edə
bilərsə (fayl tapılmadı, şəbəkə xətası, yanlış format) — `Result<T, E>`
istifadə olunur:

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

```rust
use std::fs::File;

fn main() {
    let fayl_neticesi = File::open("hello.txt");

    let fayl = match fayl_neticesi {
        Ok(f) => f,
        Err(xeta) => {
            println!("Fayl açılmadı: {xeta:?}");
            return;
        }
    };

    println!("Fayl açıldı: {:?}", fayl);
}
```

Öz `Result` qaytaran funksiyanız:

```rust
fn böl(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("sıfıra bölmə xətası"))
    } else {
        Ok(a / b)
    }
}

fn main() {
    match böl(10.0, 2.0) {
        Ok(netice) => println!("Nəticə: {netice}"),
        Err(mesaj) => println!("Xəta: {mesaj}"),
    }
}
```

## ? operatoru

Bir neçə `Result` qaytaran əməliyyatı ardıcıl çağıranda, hər dəfə `match`
yazmaq yorucu olur. `?` operatoru bunu qısaldır: **əgər `Err`-dirsə, dərhal
funksiyadan `Err`-i qaytar; `Ok`-dursa, içindəki dəyəri çıxar və davam
et.**

```rust
use std::fs::File;
use std::io::{self, Read};

fn faylı_oxu() -> Result<String, io::Error> {
    let mut fayl = File::open("hello.txt")?; // xəta varsa, dərhal geri qaytarır
    let mut mətn = String::new();
    fayl.read_to_string(&mut mətn)?;
    Ok(mətn)
}

fn main() {
    match faylı_oxu() {
        Ok(mətn) => println!("Oxunan mətn: {mətn}"),
        Err(xəta) => println!("Xəta baş verdi: {xəta}"),
    }
}
```

`?` yalnız `Result` (və ya `Option`) qaytaran funksiyalar daxilində
işləyir. Bu, `try/catch`-in daha aşkar (explicit) və tip-təhlükəsizli
alternatividir — xətanın haradan gəldiyi kod oxuyanda dərhal görünür.

## Nə vaxt panic, nə vaxt Result

Ümumi qayda (rəsmi Rust kitabından):

- **`panic!`** — proqramçı səhvi, bərpa mümkün olmayan hal, yaxud
  "bu heç vaxt baş verməməlidir" güman etdiyiniz vəziyyət. Prototip/nümunə
  kodda, test-lərdə `unwrap()`/`expect()` ilə tez-tez istifadə olunur.
- **`Result<T, E>`** — çağıran tərəfin qərar vermə haqqı olmalı olan hər
  bərpaolunan xəta: fayl tapılmadı, şəbəkə vaxtı bitdi, istifadəçi yanlış
  giriş verdi. Kitabxana/production kodunda əsas yanaşma budur.

**Ümumi səhv:** `unwrap()` production kodda hər yerdə istifadə etmək.
`unwrap()` `Err`/`None` halında dərhal panic edir — sürətli prototip üçün
əlverişlidir, amma production-da gözlənilməz çökmələrə səbəb ola bilər.
Onun yerinə `match`, `?`, yaxud `unwrap_or`/`unwrap_or_else` kimi daha
yumşaq metodlar üstünlük təşkil etməlidir.

## Məşq: mətn emalı proqramı

Mətndə söz tezliyini hesablayan proqram yazın (`Vec`, `HashMap`,
`Result` birlikdə istifadə olunur):

```rust
use std::collections::HashMap;

fn söz_tezliyi(mətn: &str) -> HashMap<String, u32> {
    let mut tezlik: HashMap<String, u32> = HashMap::new();

    for söz in mətn.split_whitespace() {
        let təmiz_söz = söz.to_lowercase();
        let sayğac = tezlik.entry(təmiz_söz).or_insert(0);
        *sayğac += 1;
    }

    tezlik
}

fn ən_tez_rast_gəlinən(tezlik: &HashMap<String, u32>) -> Option<(&String, &u32)> {
    tezlik.iter().max_by_key(|(_, say)| *say)
}

fn main() {
    let mətn = "rust rust dili çox güclüdür rust təhlükəsizdir";
    let tezlik = söz_tezliyi(mətn);

    match ən_tez_rast_gəlinən(&tezlik) {
        Some((söz, say)) => println!("Ən çox rast gəlinən söz: '{söz}' ({say} dəfə)"),
        None => println!("Mətn boşdur"),
    }

    for (söz, say) in &tezlik {
        println!("{söz}: {say}");
    }
}
```

Özünüz əlavə edin: bu proqramı `Vec<&str>` qəbul edib bir neçə cümləni
emal edən versiyaya çevirin, nəticələri birləşdirin.

## Xülasə

- `Vec<T>` — dinamik ölçülü siyahı; `.get()` təhlükəsiz, `[index]`
  sərhəddən çıxarsa panic edir.
- `String` UTF-8-dir, index ilə simvol almaq olmur — `.chars()` istifadə
  edin.
- `HashMap<K, V>` açar-dəyər saxlayır; `use std::collections::HashMap`
  ilə import olunur; `.entry().or_insert()` şərti əlavəetmə üçün əlverişlidir.
- `panic!` — bərpaolunmaz proqramçı xətası; proqramı dayandırır.
- `Result<T, E>` (`Ok`/`Err`) — bərpaolunan xətalar üçün, exception
  yoxdur, hər çağırışda aşkar idarə olunur.
- `?` operatoru `Result`/`Option` zəncirini qısaldır — xəta varsa dərhal
  yuxarı ötürür.
- Qayda: proqramçı xətası → `panic!`; gözlənilən, bərpaolunan xəta →
  `Result`.

## Əlavə oxu

- [The Book — Ch. 8: Common Collections](https://doc.rust-lang.org/book/ch08-00-common-collections.html)
- [The Book — Ch. 9: Error Handling](https://doc.rust-lang.org/book/ch09-00-error-handling.html)
- [Rust By Example — Error handling](https://doc.rust-lang.org/rust-by-example/error.html)

**Əvvəlki hissə:** [rust-part3.md](rust-part3.md)
**Növbəti hissə:** [rust-part5.md](rust-part5.md) — Generics, Traits,
Modullar.
