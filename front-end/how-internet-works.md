# İnternet Necə İşləyir?

## Giriş

İnternet — dünya üzrə milyardlarla kompüteri bir-birinə bağlayan nəhəng texniki infrastrukturdur. Hər gün e-poçt göndərəndə, video baxanda və ya sayt açanda bu şəbəkədən istifadə edirik, amma arxa planda nə baş verdiyini çox az adam bilir.

Bu dərsdə internetin necə qurulduğunu — kabellərdən və routerlərdən tutmuş IP ünvanları, DNS və HTTP protokoluna qədər — addım-addım izah edəcəyik. Mövzunu sadədən mürəkkəbə doğru quracağıq: əvvəlcə iki kompüterin necə əlaqə saxladığını, sonra bunun milyardlarla cihaza necə miqyaslandığını öyrənəcəyik.

Vacib bir fərqi əvvəlcədən qeyd edək: **internet** və **veb (Web)** eyni şey deyil. İnternet — infrastrukturdur (yollar, körpülər). Veb isə bu infrastruktur üzərində işləyən xidmətlərdən sadəcə biridir (yollarda hərəkət edən maşınlar kimi). E-poçt, onlayn oyunlar və digər xidmətlər də eyni internetdən istifadə edir.

## Əsas anlayışlar

- **Şəbəkə (Network)** — bir-biri ilə əlaqə saxlaya bilən iki və ya daha çox kompüter.
- **Switch (kommutator)** — eyni lokal şəbəkədə mesajları düzgün cihaza yönləndirən qurğu.
- **Router** — fərqli şəbəkələr arasında mesajları ötürən qurğu. Poçt şöbəsinə bənzəyir.
- **Modem** — şəbəkə məlumatını telefon/kabel infrastrukturuna və əksinə çevirən qurğu.
- **ISP (Internet Service Provider)** — internet xidməti təminatçısı; routerləri vasitəsilə bizi qlobal şəbəkəyə bağlayır.
- **IP ünvanı** — şəbəkədəki hər cihazın unikal nömrəsi (məs: `192.0.2.172`).
- **DNS (Domain Name System)** — insan üçün anlaşıqlı adları (`google.com`) IP ünvanlarına çevirən sistem.
- **Paket (Packet)** — şəbəkədə ötürülən kiçik məlumat hissəsi.
- **Protokol** — kompüterlərin bir-birini başa düşməsi üçün razılaşdığı qaydalar toplusu (məs: TCP/IP, HTTP).
- **Client / Server** — istəyi göndərən tərəf (client, məs: brauzer) və cavab verən tərəf (server).

## Ətraflı izah

### 1. İki kompüter necə əlaqə saxlayır

Ən sadə şəbəkə iki kompürdən ibarətdir. Onları fiziki olaraq bağlamaq lazımdır — bu, **Ethernet kabeli**, **Wi-Fi** və ya **Bluetooth** ola bilər. Bağlandıqdan sonra bir-birinə məlumat göndərə bilirlər.

Amma problem ondadır ki, ikidən çox kompüter olanda hər birini ayrıca kabellə birləşdirmək praktiki deyil. Məsələn, 10 kompüteri bir-birinə birbaşa bağlamaq üçün **45 kabel** lazım gələrdi.

### 2. Switch — lokal şəbəkənin mərkəzi

Bu problemi həll etmək üçün **switch (kommutator)** istifadə olunur. Hər kompüter sadəcə switch-ə bağlanır. İndi 10 kompüter üçün cəmi **10 kabel** kifayətdir.

Switch belə işləyir: bir kompüter mesaj göndərmək istəyəndə onu switch-ə ötürür, switch isə mesajın yalnız təyinat kompüterinə çatmasını təmin edir. Belə qurulan şəbəkəyə **lokal şəbəkə (LAN — Local Area Network)** deyilir.

### 3. Router — şəbəkələri birləşdirir

İndi yüzlərlə, minlərlə şəbəkəni bir-birinə bağlamaq lazımdır. Switch-ləri sonsuz şəkildə birləşdirmək mümkün deyil. Burada **router** köməyə gəlir.

Router — fərqli şəbəkələr arasında mesaj ötürən xüsusi kompüterdir. O, poçt şöbəsi kimi işləyir: mesajın üzərindəki ünvanı oxuyur və onu düzgün istiqamətə yönləndirir. Beləliklə, internet əslində **"şəbəkələr şəbəkəsidir"** (network of networks).

### 4. Modem və ISP — qlobal qoşulma

Öz lokal şəbəkəmizi bütün dünya ilə bağlamaq üçün mövcud infrastrukturdan (telefon/kabel xətləri) istifadə edirik:

- **Modem** — şəbəkəmizin məlumatını telefon infrastrukturunun başa düşdüyü formata çevirir (və əksinə).
- **ISP (İnternet Xidməti Təminatçısı)** — xüsusi routerləri olan şirkətdir. O, həm öz müştərilərini birləşdirir, həm də digər ISP-lərin routerlərinə qoşulur. Bu ISP-lər bir-birinə bağlanaraq qlobal "onurğa" (backbone) əmələ gətirir və mesajları planetin istənilən nöqtəsinə çatdırır.

### 5. IP ünvanları və DNS

Mesajın doğru kompüterə çatması üçün hər cihazın unikal ünvanı olmalıdır — buna **IP ünvanı** deyilir. Məsələn: `192.0.2.172`.

Amma `142.250.190.78` kimi rəqəmləri yadda saxlamaq çətindir. Bu səbəbdən **domain adları** yaradıldı. Məsələn, `google.com` əslində bir IP ünvanının insan üçün anlaşıqlı adıdır.

Brauzerə `google.com` yazanda, **DNS (Domain Name System)** bu adı arxa planda IP ünvanına çevirir. DNS-i internetin telefon kitabçası kimi düşünə bilərsiniz: ad verirsən, nömrəni (IP) qaytarır.

### 6. Paketlər — məlumat necə ötürülür

Böyük məlumat (məs: bir şəkil və ya video) bütöv şəkildə göndərilmir. O, **paket** adlanan kiçik hissələrə bölünür. Hər paketin üzərində təyinat IP ünvanı yazılır.

Bu paketlər şəbəkədə müxtəlif yollarla hərəkət edir və təyinat nöqtəsində yenidən birləşdirilir. Bu yanaşmanın üstünlüyü budur: əgər bir router və ya switch sıradan çıxsa, paketlər alternativ yolla gedə bilir. Bu da interneti çox dayanıqlı edir.

Bu prosesi idarə edən əsas protokol **TCP/IP**-dir:
- **IP (Internet Protocol)** — paketin hara getməli olduğunu (ünvanlama) müəyyən edir.
- **TCP (Transmission Control Protocol)** — paketlərin itmədən, düzgün sıra ilə çatmasını təmin edir.

### 7. Veb necə işləyir — HTTP protokolu

İndi gəlin internetin üzərində qurulan ən populyar xidmətə — **vebə** baxaq. Veb **client-server** modeli üzərində işləyir və **HTTP (HyperText Transfer Protocol)** protokolundan istifadə edir.

- **Client** — adətən brauzer (Chrome, Firefox). O, **həmişə istəyi başladır**.
- **Server** — saytı saxlayan kompüter. O, gələn istəyə cavab verir.

HTTP bir **tətbiq səviyyəsi (application layer)** protokoludur və etibarlı ötürmə üçün **TCP**-nin üzərində işləyir.

#### Bir veb istəyinin tam axını

Brauzerə `https://example.com` yazdıqda baş verənlər:

1. **DNS sorğusu** — brauzer `example.com` adını IP ünvanına çevirir.
2. **TCP bağlantısı** — brauzer serverlə etibarlı bağlantı qurur.
3. **HTTP istəyi** — brauzer serverə istək göndərir (məs: "mənə ana səhifəni ver").
4. **HTTP cavabı** — server HTML faylını və status kodunu geri göndərir.
5. **Render** — brauzer HTML-i alır, sonra ona lazım olan əlavə faylları (CSS, JavaScript, şəkillər) ayrıca istəklərlə yükləyir və səhifəni ekranda göstərir.

### 8. HTTP-nin mühüm xüsusiyyətləri

- **Sadə (Simple)** — mesajlar insan tərəfindən oxuna bilən mətndir.
- **Genişlənə bilən (Extensible)** — **header**-lər vasitəsilə yeni imkanlar əlavə etmək olar.
- **Vəziyyətsiz (Stateless)** — hər istək müstəqildir, server əvvəlki istəyi "xatırlamır". Vəziyyəti saxlamaq üçün **cookie**-lərdən istifadə olunur.

## Kod nümunələri

### HTTP istəyinin strukturu

Brauzer serverə təxminən belə bir mətn göndərir:

```http
GET / HTTP/1.1
Host: example.com
Accept-Language: az
```

- `GET` — metoddur (məlumat istəyirik).
- `/` — istədiyimiz resursun yolu (ana səhifə).
- `HTTP/1.1` — protokol versiyası.
- `Host` və `Accept-Language` — əlavə məlumat verən **header**-lərdir.

### Serverin cavabı

```http
HTTP/1.1 200 OK
Date: Sat, 26 Jun 2026 14:28:02 GMT
Server: Apache
Content-Type: text/html
Content-Length: 29769

<!doctype html>...
```

- `200 OK` — **status kodu**: istək uğurlu oldu (`404` = tapılmadı, `500` = server xətası).
- `Content-Type` — qaytarılan məlumatın növü (burada HTML).
- Boş sətirdən sonrakı hissə — **body**, yəni faktiki məzmun.

### JavaScript ilə HTTP istəyi (Fetch API)

Müasir veb-də JavaScript-dən server ilə əlaqə saxlamaq üçün **Fetch API** istifadə olunur:

```javascript
// Serverə GET istəyi göndəririk
fetch('https://api.example.com/data')
  .then(response => response.json()) // cavabı JSON formatına çeviririk
  .then(data => console.log(data))   // məlumatı konsola yazırıq
  .catch(error => console.error('Xəta:', error)); // xəta olarsa tuturuq
```

Bu kod arxa planda yuxarıda izah etdiyimiz bütün addımları (DNS, TCP, HTTP) avtomatik yerinə yetirir. Biz sadəcə nəticəni alırıq.

## Praktiki nümunə / İstifadə halı

Təsəvvür edin, telefonunuzdan `youtube.com` saytını açırsınız:

1. Telefon Wi-Fi vasitəsilə evdəki **router**-ə qoşulur.
2. Router **modem** vasitəsilə **ISP**-nizə (məs: bir internet provayderi) bağlanır.
3. Brauzer **DNS**-dən soruşur: "`youtube.com`-un IP ünvanı nədir?" və cavab alır.
4. ISP-nin routerləri istəyinizi YouTube-un serverlərinə doğru yönləndirir.
5. YouTube serveri cavabı **paketlərə** bölüb geri göndərir.
6. Paketlər müxtəlif routerlərdən keçərək telefonunuza çatır və birləşdirilir.
7. Brauzer HTML, CSS, JavaScript və video məlumatını alıb səhifəni göstərir.

Bütün bu proses adətən bir neçə yüz millisaniyə çəkir.

## Tez-tez verilən suallar

**İnternet və veb eyni şeydir?**
Xeyr. İnternet — infrastrukturdur (kompüterləri birləşdirən şəbəkə). Veb isə bu infrastruktur üzərində işləyən xidmətdir. E-poçt, onlayn oyunlar da internetdən istifadə edir, amma veb deyil.

**Paketlər niyə bölünür?**
Çünki kiçik hissələri ötürmək daha etibarlıdır. Bir paket itsə, yalnız o yenidən göndərilir, bütün fayl yox. Həmçinin paketlər fərqli yollarla gedə bilər.

**Intranet və Extranet nədir?**
- **Intranet** — yalnız bir təşkilatın üzvlərinə açıq olan özəl şəbəkə.
- **Extranet** — intranet kimidir, amma kənar etibarlı tərəflərə (müştərilər, partnyorlar) da məhdud giriş verir.

**HTTPS nədir?**
HTTP-nin şifrələnmiş (təhlükəsiz) versiyasıdır. Məlumat **TLS** vasitəsilə şifrələnir ki, üçüncü tərəflər oxuya bilməsin.

## Xülasə

- İnternet — **"şəbəkələr şəbəkəsidir"**; switch lokal şəbəkədə, router isə şəbəkələr arasında mesaj yönləndirir.
- **Modem** və **ISP** lokal şəbəkəmizi qlobal internetə bağlayır.
- Hər cihazın unikal **IP ünvanı** var; **DNS** insan üçün anlaşıqlı adları IP-yə çevirir.
- Məlumat **paketlərə** bölünərək **TCP/IP** protokolu ilə ötürülür.
- **Veb**, internet üzərində işləyən xidmətdir və **HTTP** protokolu ilə **client-server** modelində işləyir.
- Bir veb istəyi: DNS → TCP → HTTP istəyi → HTTP cavabı → render addımlarından keçir.

## Əlavə mənbələr

- [MDN — How does the Internet work?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work)
- [MDN — An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)
- [MDN — What is a web server?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_web_server)
