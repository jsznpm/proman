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

**HTTPS** = HTTP + **TLS şifrələmə**. Adi HTTP-də məlumat açıq mətn (plain text) şəklində göndərilir — yəni kimsə şəbəkəni izləyirsə, şifrələri görə bilər. HTTPS-də isə məlumat şifrələnir, beləliklə təhlükəsiz olur.

Bu gün demək olar ki bütün saytlar HTTPS istifadə edir. Brauzerin ünvan zolağındakı **kilid işarəsi** məhz HTTPS-i göstərir.

### HTTP Versiyaları

- **HTTP/1.0** — hər sorğu üçün ayrıca TCP bağlantısı açır (yavaş).
- **HTTP/1.1** — davamlı bağlantılar (persistent connections), bir bağlantı təkrar istifadə olunur.
- **HTTP/2** — binary frame-lər, multiplexing (bir bağlantı üzərində paralel sorğular), header sıxılması.
- **HTTP/3 (QUIC)** — UDP üzərində qurulub, daha sürətli.

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

## Tez-tez verilən suallar

**S: GET və POST arasında fərq nədir?**
C: GET serverdən məlumat **almaq** üçündür və body daşımır (parametrlər URL-də gedir). POST isə serverə məlumat **göndərmək** üçündür və body daşıyır. GET təhlükəsiz hesab olunur (məlumatı dəyişmir), POST isə server tərəfdə dəyişiklik edə bilər.

**S: 404 və 500 fərqi nədir?**
C: **404** — client xətasıdır, istədiyin resurs tapılmadı (yanlış URL). **500** — server xətasıdır, serverin daxilində problem var, sənin sorğun düzgün ola bilər.

**S: HTTP stateless-dirsə, login necə yadda qalır?**
C: **Cookie** və ya **token**-lər vasitəsilə. Server login zamanı bir cookie/token verir, brauzer sonrakı hər sorğuda onu geri göndərir, beləliklə server səni tanıyır.

**S: Niyə HTTPS istifadə etməliyəm?**
C: Çünki HTTP-də məlumat şifrələnmir və oğurlana bilər. HTTPS məlumatı şifrələyir, parol və şəxsi məlumatları qoruyur.

## Xülasə

- **HTTP** — internetdə client (brauzer) və server arasında məlumat mübadiləsi protokoludur.
- Əlaqəni həmişə **client başladır**: sorğu (request) göndərir, server cavab (response) qaytarır.
- HTTP **stateless**-dir — sorğular bir-birindən asılı deyil; vəziyyət Cookie ilə saxlanılır.
- **Metodlar** (GET, POST, PUT, DELETE) sorğunun məqsədini bildirir.
- **Status kodları** nəticəni bildirir: 2xx uğur, 4xx client xətası, 5xx server xətası.
- **Başlıqlar** (headers) əlavə metadata daşıyır, **body** isə əsas məlumatı.
- **HTTPS** — şifrələnmiş, təhlükəsiz HTTP-dir.
- Front-end-də HTTP sorğuları **`fetch()`** ilə göndərilir.

## Əlavə mənbələr

- MDN — An overview of HTTP: <https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview>
- MDN — HTTP Messages: <https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages>
- javascript.info — Fetch: <https://javascript.info/fetch>
