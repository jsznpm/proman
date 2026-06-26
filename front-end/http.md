# HTTP Nədir?

## Giriş

**HTTP** (HyperText Transfer Protocol — yəni "Hipermətn Ötürmə Protokolu") internetdə məlumat mübadiləsinin əsasını təşkil edən bir protokoldur. Brauzerinizdə bir sayt açanda, şəkil yükləyəndə, formanı göndərəndə — bütün bunlar arxa planda HTTP vasitəsilə baş verir. Sadə dillə desək, HTTP brauzer (client) ilə server arasında "danışıq dili"dir: brauzer nəyisə **istəyir** (request), server isə **cavab verir** (response).

HTTP front-end developer üçün çox vacibdir, çünki yazdığınız hər kod — istər API-dən məlumat çəkmək, istər form göndərmək, istər şəkil yükləmək olsun — HTTP üzərində işləyir. Bu protokolu başa düşmədən şəbəkə (network) ilə əlaqəli problemləri (məsələn, niyə sorğu uğursuz oldu, niyə status 404 gəldi) həll etmək çətindir.

HTTP-nin əsas xüsusiyyətləri: **sadədir** (mesajları insan üçün oxunaqlıdır), **genişlənə biləndir** (yeni başlıqlarla yeni funksiyalar əlavə oluna bilər) və **etibarlıdır** (TCP kimi etibarlı nəqliyyat protokolu üzərində işləyir).

## Əsas anlayışlar

| Termin | İzah |
|--------|------|
| **Client (Müştəri)** | Sorğunu başladan tərəf. Adətən brauzerdir, amma istənilən proqram ola bilər (məsələn, mobil tətbiq). "User-Agent" də deyilir. |
| **Server** | Sorğuya cavab verən, resursları (HTML, şəkil, JSON və s.) qaytaran tərəf. |
| **Request (Sorğu)** | Client-in serverə göndərdiyi mesaj. |
| **Response (Cavab)** | Server-in client-ə qaytardığı mesaj. |
| **Resource (Resurs)** | İnternetdə əldə edilən hər şey: HTML səhifə, şəkil, video, JSON faylı. |
| **URL** | Resursun ünvanı (məsələn `https://example.com/index.html`). |
| **Method (Metod)** | Sorğunun məqsədini bildirir: GET, POST, PUT, DELETE və s. |
| **Status Code** | Sorğunun nəticəsini bildirən rəqəm (200, 404, 500 və s.). |
| **Header (Başlıq)** | Sorğu/cavab haqqında əlavə məlumat (metadata). |
| **Body (Gövdə)** | Mesajla göndərilən əsas məlumat (məsələn JSON, HTML). |

## Ətraflı izah

### Client-Server Modeli (Necə işləyir?)

HTTP **client-server** modeli üzərində qurulub. Bu o deməkdir ki, əlaqəni həmişə **client başladır**, server heç vaxt özü-özünə client-ə mesaj göndərmir (klassik HTTP-də).

Bir HTTP əlaqəsinin sadə axını belədir:

1. **TCP bağlantısı açılır** — client serverlə əlaqə qurur.
2. **HTTP sorğusu göndərilir** — client nə istədiyini bildirir.
3. **Cavab oxunur** — server resursu qaytarır.
4. **Bağlantı bağlanır və ya təkrar istifadə olunur.**

```
Client  →  [Proxy / Cache]  →  Server
(brauzer)    (aralıq tərəf)    (sayt)
```

Client ilə server arasında bəzən **proxy** adlanan aralıq tərəflər olur. Onlar caching (yaddaşda saxlama), filtrasiya, yük balanslaşdırma (load balancing) və ya autentifikasiya kimi işlər görür.

### Stateless (Vəziyyətsiz) Protokol

HTTP **stateless** (vəziyyətsiz) protokoldur. Bu o deməkdir ki, iki ardıcıl sorğu arasında server avtomatik olaraq heç bir əlaqə saxlamır — server hər sorğunu "ilk dəfə görürmüş kimi" qəbul edir.

Bəs onlayn mağazada səbətə əlavə etdiyiniz məhsullar necə yadda qalır? Bunun üçün **Cookie**-lərdən istifadə olunur. Cookie-lər sayəsində HTTP "stateful" (vəziyyətli) sessiyalar yarada bilir — yəni istifadəçinin kim olduğunu, hansı məhsulları seçdiyini xatırlaya bilir. Yəni: HTTP özü stateless-dir, amma **sessionless deyil**.

### HTTP Sorğusunun (Request) Quruluşu

Bir HTTP sorğusu aşağıdakı hissələrdən ibarətdir:

1. **Start-line (Başlanğıc sətri)** — metod, resurs yolu və HTTP versiyası.
2. **Headers (Başlıqlar)** — əlavə məlumatlar.
3. **Boş sətir** — başlıqların bitdiyini bildirir.
4. **Body (Gövdə)** — yalnız bəzi sorğularda olur (POST, PUT, PATCH).

Nümunə sorğu:

```http
POST /users HTTP/1.1
Host: example.com
Content-Type: application/json
Content-Length: 49

{ "name": "Cavid", "email": "cavid@example.com" }
```

Burada:
- `POST` — metod (məlumat göndərmək üçün).
- `/users` — resurs yolu.
- `HTTP/1.1` — protokol versiyası.
- `Host`, `Content-Type`, `Content-Length` — başlıqlar.
- Sonuncu sətir — body (göndərilən JSON məlumat).

### HTTP Cavabının (Response) Quruluşu

Cavab da oxşar quruluşa malikdir:

1. **Status-line** — protokol versiyası, status kodu, izah mətni.
2. **Headers** — başlıqlar.
3. **Boş sətir.**
4. **Body** — qaytarılan resurs.

Nümunə cavab:

```http
HTTP/1.1 200 OK
Date: Sat, 09 Oct 2010 14:28:02 GMT
Content-Type: text/html
Content-Length: 29769

<!doctype html>
<html>...</html>
```

Burada `200 OK` — sorğunun uğurlu olduğunu bildirir.

### HTTP Metodları

Metodlar serverdən nə istədiyimizi bildirir:

| Metod | Məqsəd |
|-------|--------|
| `GET` | Resursu **almaq** (oxumaq). Ən çox istifadə olunan metod. |
| `POST` | Serverə yeni məlumat **göndərmək** (məsələn form). |
| `PUT` | Mövcud resursu tam **əvəz etmək**. |
| `PATCH` | Resursu **qismən yeniləmək**. |
| `DELETE` | Resursu **silmək**. |
| `HEAD` | GET kimidir, amma yalnız başlıqları qaytarır (body olmadan). |
| `OPTIONS` | Serverin hansı əməliyyatları dəstəklədiyini öyrənmək. |

### HTTP Status Kodları

Status kodları cavabın nəticəsini bildirir və 5 qrupa bölünür:

| Aralıq | Kateqoriya | Nümunələr |
|--------|-----------|-----------|
| **1xx** | Məlumatverici (Informational) | 100 Continue |
| **2xx** | Uğurlu (Success) | **200 OK**, 201 Created, 204 No Content |
| **3xx** | Yönləndirmə (Redirection) | 301 Moved Permanently, 304 Not Modified |
| **4xx** | Client xətası (Client Error) | **400 Bad Request**, 401 Unauthorized, **403 Forbidden**, **404 Not Found** |
| **5xx** | Server xətası (Server Error) | **500 Internal Server Error**, 503 Service Unavailable |

**Yadda saxla:** 4xx — səhv səndədir (sorğuda problem), 5xx — səhv serverdədir.

### HTTP Başlıqları (Headers)

Başlıqlar sorğu və cavab haqqında əlavə məlumat daşıyır. Format: `Başlıq-Adı: dəyər`.

**Sorğu başlıqları:**
- `Host` — serverin domeni.
- `User-Agent` — client haqqında məlumat (hansı brauzer və s.).
- `Accept-Language` — istənilən dil.
- `Cookie` — sessiya məlumatı.
- `Content-Type` — göndərilən body-nin tipi.

**Cavab başlıqları:**
- `Content-Type` — qaytarılan resursun tipi (`text/html`, `application/json`).
- `Content-Length` — body-nin ölçüsü.
- `Set-Cookie` — client-də cookie saxlamaq üçün.
- `Cache-Control` — caching qaydaları.

### HTTP vs HTTPS

**HTTPS** = HTTP + **TLS şifrələmə**. Adi HTTP-də məlumat açıq mətn (plain text) şəklində göndərilir — yəni kimsə şəbəkəni izləyirsə (məsələn, açıq Wi-Fi-da), şifrələri görə bilər. HTTPS-də isə məlumat şifrələnir, beləliklə təhlükəsiz olur.

Bu gün demək olar ki bütün saytlar HTTPS istifadə edir. Brauzerin ünvan zolağındakı **kilid işarəsi** məhz HTTPS-i göstərir. HTTP standart olaraq **80**-ci portda, HTTPS isə **443**-cü portda işləyir. (HTTPS-in necə işlədiyi aşağıda "HTTPS Necə İşləyir" bölməsində ətraflı izah olunur.)

## Kod nümunələri

Front-end-də HTTP sorğularını JavaScript-in **`fetch()`** funksiyası ilə göndəririk.

### Sadə GET sorğusu

```javascript
// Serverdən məlumat almaq (GET)
let response = await fetch('https://api.example.com/users');

// Status uğurludursa (200-299 arası), JSON-u oxu
if (response.ok) {
  let users = await response.json();
  console.log(users);
} else {
  console.log('Xəta baş verdi, status: ' + response.status);
}
```

İzah:
- `fetch(url)` — sorğunu başladır və `Promise` qaytarır.
- `response.ok` — status 200–299 arasındadırsa `true` olur.
- `response.status` — status kodunu verir (məsələn 404).
- `response.json()` — body-ni JSON kimi oxuyur (bu da `Promise` qaytarır).

### POST sorğusu (məlumat göndərmək)

```javascript
// Serverə yeni istifadəçi göndərmək (POST)
let user = { name: 'Cavid', surname: 'Salimov' };

let response = await fetch('https://api.example.com/users', {
  method: 'POST',                                    // metod
  headers: { 'Content-Type': 'application/json' },   // body tipi
  body: JSON.stringify(user)                          // obyekti JSON mətnə çevir
});

let result = await response.json();
console.log(result);
```

İzah:
- `method: 'POST'` — məlumat göndərmək üçün metodu seçirik.
- `headers` — serverə body-nin JSON olduğunu bildiririk.
- `body: JSON.stringify(user)` — JavaScript obyektini JSON mətnə çeviririk, çünki body mətn şəklində göndərilir.

### Başlıqları oxumaq

```javascript
let response = await fetch('https://api.example.com/data');

// Cavab başlığını oxu
let contentType = response.headers.get('Content-Type');
console.log(contentType); // məsələn: "application/json"
```

## Praktiki nümunə / İstifadə halı

Təsəvvür et ki, bir hava proqnozu (weather) tətbiqi düzəldirsən. İstifadəçi şəhər adını yazır, sən də API-dən həmin şəhərin havasını çəkib göstərirsən:

```javascript
async function getWeather(city) {
  try {
    let response = await fetch(`https://api.weather.com/v1/${city}`);

    if (!response.ok) {
      throw new Error(`Server xətası: ${response.status}`);
    }

    let data = await response.json();
    console.log(`${city} havası: ${data.temperature}°C`);
  } catch (error) {
    console.log('Sorğu uğursuz oldu:', error.message);
  }
}

getWeather('Baku');
```

Bu nümunədə bütün HTTP konseptləri bir yerdədir: GET sorğusu, status yoxlaması (`response.ok`), JSON body-nin oxunması və xətaların idarə olunması.

## HTTP-nin Təkamülü və Performans (Dərindən)

HTTP illər ərzində xeyli inkişaf edib. Versiyalar arasındakı fərqi başa düşmək performans problemlərini həll etmək üçün vacibdir.

### TCP və "Three-Way Handshake"

HTTP, əsasən **TCP** (etibarlı nəqliyyat protokolu) üzərində işləyir. Hər TCP bağlantısı **üç addımlı əl-sıxma (three-way handshake)** ilə başlayır:

1. Client serverə təsadüfi rəqəm (x) göndərir.
2. Server təsdiqləyir və öz rəqəmini (y) göndərir.
3. Client y+1 ilə təsdiqi geri göndərir.

Bu əl-sıxma vaxt aparır — ona görə də hər sorğu üçün yeni bağlantı açmaq performansı aşağı salır. Versiyaların təkamülü əsasən bu problemi həll etmək üzərində qurulub.

### Versiyalar arası fərq

| Versiya | İl | Əsas yeniliklər |
|---------|-----|-----------------|
| **HTTP/0.9** | 1991 | Yalnız `GET`, yalnız HTML, başlıq yox, status kodu yox. |
| **HTTP/1.0** | 1996 | Çoxlu kontent tipləri (şəkil, video), `POST`/`HEAD`, başlıqlar, status kodları, caching. Amma **hər sorğu yeni TCP bağlantısı** açır. |
| **HTTP/1.1** | 1999 | **Persistent connections** (davamlı bağlantı), pipelining, chunked encoding, `PUT`/`PATCH`/`DELETE`/`OPTIONS`, `Host` başlığı məcburi. |
| **HTTP/2** | 2015 | Binary protokol, **multiplexing**, header sıxılması (HPACK), server push, prioritetləşdirmə. |
| **HTTP/3** | 2022 | QUIC (UDP üzərində), transport səviyyəsində head-of-line blocking aradan qaldırılır. |

### Persistent Connections (HTTP/1.1)

HTTP/1.0-da hər sorğudan sonra bağlantı bağlanırdı. HTTP/1.1 bağlantını **açıq saxlayır** — beləliklə bir neçə ardıcıl sorğunu eyni bağlantı üzərində göndərmək olur. `Connection: close` başlığı serverə işi bitirəndən sonra bağlantını bağlamağı bildirir.

### Head-of-Line Blocking (Növbənin başının bloklanması)

HTTP/1.1-də bir bağlantıda eyni anda yalnız bir sorğu "gözləyə" bilərdi. Əgər ön sorğu yavaş gedirdisə, arxadakı sorğular **gözləməli olurdu** — buna *head-of-line blocking* deyilir. Bu, böyük problem idi.

### HTTP/2 necə həll etdi?

- **Multiplexing** — bir TCP bağlantısı üzərində eyni anda çoxlu sorğu/cavab paralel gedir (hər biri unikal *stream ID* ilə). Beləliklə HTTP səviyyəsində head-of-line blocking aradan qalxır.
- **Binary frames** — mətn əvəzinə ikilik (binary) format; daha sürətli analiz olunur (amma insan üçün oxunaqlı deyil).
- **HPACK** — təkrarlanan başlıqlar sıxılır, şəbəkədə az yer tutur.
- **Server Push** — server client istəməmiş lazımi resursları əvvəlcədən göndərə bilir.

> **Qeyd:** HTTP/2 HTTP səviyyəsində bloklamağı həll etsə də, hələ TCP üzərində işlədiyi üçün **TCP səviyyəsində** head-of-line blocking qalırdı. Bunu HTTP/3 həll edir.

## HTTPS Necə İşləyir (Dərindən)

HTTPS məlumatı **TLS** (köhnə adı SSL) ilə şifrələyir. Bunun arxasında iki növ şifrələmə dayanır:

### Simmetrik vs Asimmetrik Şifrələmə

**Simmetrik şifrələmə** — şifrələmək və açmaq üçün **eyni bir açar** istifadə olunur. Sürətlidir, amma problem var: açarı qarşı tərəfə təhlükəsiz necə çatdırmaq? Açarı şəbəkə ilə göndərsən, kimsə tuta bilər.

**Asimmetrik şifrələmə** — bu problemi həll edir. İki açar var:
- **Public key (açıq açar)** — hamı ilə paylaşıla bilər.
- **Private key (gizli açar)** — yalnız sahibində qalır.

Məntiq belədir: public key ilə şifrələnmiş mesajı **yalnız** ona uyğun private key aça bilər. Beləliklə kimsə sənin public key-inlə mesaj şifrələyirsə, onu yalnız sən (private key sahibi) oxuya bilərsən.

### TLS Handshake (Əl-sıxma)

HTTPS bağlantısı qurularkən brauzer və server **TLS handshake** edir. Sadələşdirilmiş məntiq:

1. Brauzer serverə qoşulur və TLS başlatmaq istəyir.
2. Server öz **sertifikatını** (içində public key var) göndərir.
3. Brauzer sertifikatın etibarlı olduğunu yoxlayır (aşağıya bax).
4. **Asimmetrik şifrələmə** ilə tərəflər təhlükəsiz şəkildə bir **simmetrik açar** üzərində razılaşır.
5. Bundan sonra bütün məlumat sürətli **simmetrik açarla** şifrələnərək göndərilir.

Yəni: asimmetrik şifrələmə yalnız əvvəldə təhlükəsiz açar mübadiləsi üçün, sonrakı bütün ünsiyyət isə sürətli simmetrik açarla aparılır.

### Sertifikat və Certificate Authority (CA)

Bəs brauzer serverə necə **güvənir**? Burada **Certificate Authority (CA)** — yəni etibarlı "sertifikat orqanı" devreyə girir. CA-lar (məsələn Let's Encrypt, DigiCert) serverin həqiqətən iddia etdiyi sayt olduğunu təsdiq edən sertifikatlar imzalayır. Brauzer bu CA-lara güvənir, ona görə də CA-nın imzaladığı sertifikata da güvənir. Əgər sertifikat etibarsızdırsa, brauzer **xəbərdarlıq** göstərir ("Your connection is not private").

## HTTP/3 və QUIC

**HTTP/3** ən yeni versiyadır (2022-də standart oldu) və əvvəlki versiyalardan əsaslı şəkildə fərqlənir: o, TCP yerinə **QUIC** protokolu (UDP üzərində) istifadə edir.

### Niyə UDP?

TCP paketlərin **ardıcıllıqla** çatdırılmasını tələb edir. Bir paket itərsə, arxadakı bütün paketlər həmin itən paket yenidən gələnə qədər **gözləyir** — bu, TCP səviyyəsində head-of-line blocking-dir. HTTP/2 belə işləyirdi.

QUIC isə UDP üzərində qurulub və hər data axını (stream) **müstəqil** ardıcıllığa malikdir. Yəni #5 axında paket itsə, yalnız #5 dayanır — #1–4 və #6–100 axınları məlumatı dərhal çatdırmağa davam edir. Beləliklə **transport səviyyəsində** head-of-line blocking tamamilə aradan qalxır.

### HTTP/3-ün üstünlükləri

- **Daha sürətli bağlantı** — QUIC kriptoqrafik və nəqliyyat əl-sıxmalarını **birləşdirir**, beləliklə bağlantı HTTP/2-yə nisbətən 50%-ə qədər tez qurulur.
- **Paket itkisinə davamlılıq** — yüksək itkili şəbəkələrdə (məsələn mobil internet) gecikmə 55%-ə qədər azalır.
- **Connection migration** — şəbəkə dəyişəndə (Wi-Fi-dan mobil internetə keçəndə) bağlantı kəsilmir.

### HTTP/3-ü necə aktivləşdirmək olar?

HTTP/3 server tərəfdə qurulur (front-end developer adətən bunu konfiqurasiya etmir, amma bilməyi faydalıdır):

- **Nginx** (1.25.0+) — `listen` direktivinə `quic` parametri əlavə olunur, TLSv1.3 lazımdır, UDP 443 portu açılmalıdır və `Alt-Svc` başlığı ilə brauzerə HTTP/3-ün mövcudluğu bildirilir.
- **LiteSpeed** — standart olaraq aktivdir; sadəcə UDP 443 portunu açmaq kifayətdir.
- **Caddy** — HTTP/3 standart olaraq aktivdir, əlavə konfiqurasiya tələb etmir.

## HTTP və Təhlükəsizlik (HTTP Flood / DDoS)

HTTP açıq və geniş yayılmış protokol olduğu üçün hücumlar üçün də hədəf ola bilər. Ən çox rast gəlinənlərdən biri **HTTP Flood** adlı **DDoS** (Distributed Denial of Service) hücumudur.

Bu hücumda hücumçu çoxlu kompüterdən (botnet) serverə eyni anda minlərlə "qanuni görünən" HTTP sorğusu (məsələn səhifəni təkrar-təkrar yükləmək) göndərir. Server bu sorğuları emal etməyə çalışıb resurslarını tükədir və **real istifadəçilərə xidmət edə bilmir**.

HTTP Flood təhlükəlidir, çünki sorğular normal trafikə bənzəyir — onları zərərsiz sorğulardan ayırmaq çətindir. Qorunma üsulları: rate limiting (sorğu sayını məhdudlaşdırmaq), CAPTCHA, Web Application Firewall (WAF) və Cloudflare kimi CDN/qoruma xidmətləri.

## Tez-tez verilən suallar

**S: GET və POST arasında fərq nədir?**
C: GET serverdən məlumat **almaq** üçündür və body daşımır (parametrlər URL-də gedir). POST isə serverə məlumat **göndərmək** üçündür və body daşıyır. GET təhlükəsiz hesab olunur (məlumatı dəyişmir), POST isə server tərəfdə dəyişiklik edə bilər.

**S: 404 və 500 fərqi nədir?**
C: **404** — client xətasıdır, istədiyin resurs tapılmadı (yanlış URL). **500** — server xətasıdır, serverin daxilində problem var, sənin sorğun düzgün ola bilər.

**S: HTTP stateless-dirsə, login necə yadda qalır?**
C: **Cookie** və ya **token**-lər vasitəsilə. Server login zamanı bir cookie/token verir, brauzer sonrakı hər sorğuda onu geri göndərir, beləliklə server səni tanıyır.

**S: Niyə HTTPS istifadə etməliyəm?**
C: Çünki HTTP-də məlumat şifrələnmir və oğurlana bilər. HTTPS məlumatı şifrələyir, parol və şəxsi məlumatları qoruyur.

**S: HTTP/2 və HTTP/3 arasında əsas fərq nədir?**
C: HTTP/2 hələ **TCP** üzərində işləyir, ona görə TCP səviyyəsində head-of-line blocking qalır. HTTP/3 isə **QUIC (UDP)** üzərində işləyir və bu problemi tam həll edir — bir axında paket itsə, digər axınlar dayanmır. HTTP/3 həmçinin daha tez bağlantı qurur.

**S: TLS və SSL eyni şeydir?**
C: Demək olar. SSL köhnə adıdır və artıq köhnəlmişdir; bugünkü təhlükəsizlik faktiki olaraq **TLS** ilə təmin olunur. Amma insanlar adət üzrə hələ də "SSL sertifikatı" deyir.

**S: Simmetrik açar varsa, niyə asimmetrik açara ehtiyac var?**
C: Simmetrik şifrələmə sürətlidir, amma açarı təhlükəsiz çatdırmaq problemdir. Asimmetrik şifrələmə məhz bu açarı təhlükəsiz mübadilə etmək üçün istifadə olunur; sonra sürətli simmetrik açara keçilir.

## Xülasə

- **HTTP** — internetdə client (brauzer) və server arasında məlumat mübadiləsi protokoludur.
- Əlaqəni həmişə **client başladır**: sorğu (request) göndərir, server cavab (response) qaytarır.
- HTTP **stateless**-dir — sorğular bir-birindən asılı deyil; vəziyyət Cookie ilə saxlanılır.
- **Metodlar** (GET, POST, PUT, DELETE) sorğunun məqsədini bildirir.
- **Status kodları** nəticəni bildirir: 2xx uğur, 4xx client xətası, 5xx server xətası.
- **Başlıqlar** (headers) əlavə metadata daşıyır, **body** isə əsas məlumatı.
- **HTTPS** — şifrələnmiş, təhlükəsiz HTTP-dir; simmetrik + asimmetrik şifrələmə və CA sertifikatları üzərində qurulub.
- HTTP versiyaları performans üçün təkmilləşib: 1.1 (persistent connections) → 2 (multiplexing) → 3 (QUIC/UDP, head-of-line blocking yoxdur).
- Front-end-də HTTP sorğuları **`fetch()`** ilə göndərilir.

## Əlavə mənbələr

- MDN — An overview of HTTP: <https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview>
- MDN — HTTP Messages: <https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages>
- javascript.info — Fetch: <https://javascript.info/fetch>
- cs.fyi — HTTP in Depth: <https://cs.fyi/guide/http-in-depth>
- Cloudflare — What is HTTP?: <https://www.cloudflare.com/learning/ddos/glossary/hypertext-transfer-protocol-http/>
- Cloudflare — What is HTTP/3?: <https://www.cloudflare.com/learning/performance/what-is-http3/>
- How HTTPS Works: <https://howhttps.works/>
- The New Stack — HTTP/3 Is Now a Standard: <https://thenewstack.io/http-3-is-now-a-standard-why-use-it-and-how-to-get-started/>
- Nginx — QUIC/HTTP3 dəstəyi: <https://nginx.org/en/docs/quic.html>
