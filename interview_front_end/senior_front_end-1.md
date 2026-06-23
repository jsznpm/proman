
# Senior Developer Interview-də tez-tez verilən 15 sual və arxasındakı məntiq

Bir developer-i junior-dan senior səviyyəyə keçirən şey təkcə kod yazmaq deyil. Əsas fərq odur ki, o, sistemin arxasında nə baş verdiyini anlayır.

Interview-lərdə verilən sualların çoxu əslində sintaksis yox, **performans, arxitektura və qərar vermə bacarığını** yoxlayır.

Aşağıdakı suallar da məhz bu mövzular üzərindədir.

---

## 1. `<script>` tag-də async və defer fərqi nədir?

İlk baxışda hər ikisi JavaScript faylının HTML ilə paralel yüklənməsinə kömək edir.

Amma fərq icra zamanındadır.

### async

* Script paralel yüklənir
* Yüklənən kimi dərhal icra olunur
* HTML parsing prosesi dayana bilər

Bu daha çox müstəqil scriptlər üçün uyğundur:

Məsələn:

* Analytics
* Tracking scriptləri

### defer

* Script paralel yüklənir
* HTML tam parse olduqdan sonra işləyir
* Scriptlərin sırası qorunur

Frontend tətbiqlərində çox vaxt daha təhlükəsiz seçimdir.

---

# 2. JavaScript pass-by-value yoxsa pass-by-reference-dir?

Çox developer burada səhv edir.

JavaScript **pass-by-value** dilidir.

Amma obyektlərdə vəziyyət bir az fərqlidir.

Məsələn:

```js
const user = {
 name: "Cavid"
}

function change(obj){
 obj.name = "Ali"
}

change(user)

console.log(user.name)
```

Nəticə:

```
Ali
```

Niyə?

Çünki funksiyaya obyektin özü yox, onun reference dəyərinin kopyası ötürülür.

Yəni:

```
object address → copied value → same object
```

---

# 3. Closure niyə memory istifadə edir?

Closure o deməkdir ki, funksiya yaradıldığı mühiti yadda saxlayır.

Məsələn:

```js
function counter(){

 let count = 0

 return function(){
   count++
 }
}
```

Burada inner function `count` dəyişənini yadda saxlayır.

Bu yaxşıdır, amma:

* artıq istifadə olunmayan dəyişənlər yadda qala bilər
* Garbage Collector onları silə bilməz

Yəni closure güclü xüsusiyyətdir, amma düzgün istifadə edilməlidir.

---

# 4. CLS (Cumulative Layout Shift) necə yaxşılaşdırılır?

CLS istifadəçi səhifəyə baxarkən elementlərin gözlənilmədən yer dəyişməsidir.

Pis nümunə:

Şəkil gəlir və bütün layout aşağı sürüşür.

Həll:

✅ image ölçülərini əvvəlcədən vermək

```html
<img 
 width="500"
 height="300"
/>
```

✅ Skeleton istifadə etmək

✅ Critical CSS optimallaşdırmaq

---

# 5. Lazımsız re-render performansa necə təsir edir?

React kimi framework-lərdə çox render:

* CPU istifadəsini artırır
* UI gecikməsinə səbəb olur
* Interaction to Next Paint (INP) göstəricisini pisləşdirir

Optimallaşdırma:

* memo
* useMemo
* useCallback
* state strukturunu düzgün qurmaq

---

# 6. Git merge və git rebase fərqi nədir?

Hər ikisi branch birləşdirir.

## Merge

Tarixi saxlayır:

```
A---B---C
     \
      D---E

merge

A---B---C----M
     \      /
      D---E
```

## Rebase

Commit tarixçəsini yenidən yazır.

```
A---B---C

D---E

rebase

A---B---C---D---E
```

Nəticə:

Daha təmiz tarixçə.

---

# 7. 403 HTTP status nə deməkdir?

403:

**Forbidden**

Yəni:

* istifadəçi tanınır
* amma icazəsi yoxdur

Misal:

Admin panelinə adi user girməyə çalışır.

---

# 8. Preflight request nədir?

CORS zamanı brauzer əsas request-dən əvvəl yoxlama edir.

Bu request:

```
OPTIONS
```

olur.

Brauzer soruşur:

"Mən bu domenə belə request göndərə bilərəm?"

Server cavab verir:

"bəli" və ya "xeyr"

---

# 9. API versioning necə edilir?

Ən çox istifadə olunan yollar:

### URL

```
api.com/v1/users
api.com/v2/users
```

### Query

```
api.com/users?version=2
```

### Header

```
Accept: application/vnd.api.v2
```

---

# 10. WebSocket və SSE fərqi nədir?

## WebSocket

İkitərəfli əlaqə:

Client ↔ Server

İstifadə:

* chat
* multiplayer oyun
* realtime app

## SSE

Tək istiqamət:

Server → Client

İstifadə:

* notification
* live updates

---

# 11. Database index necə sürətləndirir?

Index database üçün kitabın içindəki "mündəricat" kimidir.

Index olmayanda:

```
1 milyon row yoxla
```

Index olduqda:

```
axtarış ağacı → doğru yer
```

Adətən B-tree istifadə edilir.

---

# 12. DDoS hücumlarından necə qorunmaq olar?

Əsas üsullar:

* Load balancer
* Rate limiting
* Traffic filtering
* CDN

Məqsəd:

zərərli trafiki backend-ə çatmadan bloklamaq.

---

# 13. SOLID Open/Closed prinsipi nədir?

Məna:

> Kod dəyişiklik üçün bağlı, genişlənmə üçün açıq olmalıdır.

Yəni yeni feature gələndə köhnə kodu dağıtmaq lazım deyil.

Pis:

```js
if(type==="pdf")
if(type==="excel")
```

Yaxşı:

Yeni class əlavə et.

---

# 14. Zero downtime deployment necə edilir?

Ən məşhur üsullardan biri:

## Blue/Green Deployment

İki mühit olur:

Blue:
köhnə versiya

Green:
yeni versiya

Yeni versiya hazır olduqda:

traffic dəyişdirilir.

İstifadəçi downtime hiss etmir.

---

# 15. Microservices Tax nədir?

Microservice hər problemi həll etmir.

Onun öz qiyməti var:

* network problemləri
* service communication
* monitoring
* security
* deployment çətinliyi

Yəni:

Monolith → sadədir

Microservice → daha elastikdir, amma daha mürəkkəbdir.

---

## Nəticə

Senior developer olmaq daha çox framework bilmək deyil.

Əsas sual budur:

**"Mən yazdığım kod sistemə necə təsir edir?"**

Interview-lərdə də məhz bunu ölçürlər.
