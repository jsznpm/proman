# Senior Frontend Handbook — Hissə 9: DevOps üçün Frontend Baxışı

> Bu, "Senior Frontend Handbook" kursunun 9-cu hissəsidir. Əvvəlki hissələrdə
> (Part 1 — Onboarding, Part 3 — React Rendering Internals, Part 4 —
> Performance, Part 8 — Frontend System Design) izah olunan anlayışlara
> (hydration, streaming, caching, CDN referansları) burada təkrar giriş
> verilmir, birbaşa istinad olunur.

## Niyə bu hissə var

Senior frontend developer infrastruktur mühəndisi deyil — Kubernetes cluster
qurmayacaq, BGP route yazmayacaq. Amma aşağıdakı suallara cavab verə
bilməlidir, çünki bu qərarlar kodun necə yazılacağına birbaşa təsir edir:

- "Bu SPA-nı deploy edəndə niyə köhnə `index.html` bəzi istifadəçilərə hələ
  də göstərilir?" — CDN cache, TTL, `Cache-Control` başa düşülmədən cavablana
  bilməz.
- "Bu login redirect niyə production-da sonsuz loop-a düşür, local-da yox?"
  — TLS termination, `X-Forwarded-Proto`, reverse proxy başa düşülmədən
  debug oluna bilməz.
- "Niyə bu bundle strategiyası (çox kiçik chunk vs bir böyük fayl) 2015-də
  doğru idi, indi doğru deyil?" — HTTP/1.1 vs HTTP/2 multiplexing fərqi
  başa düşülmədən bu qərar səhv veriləcək.
- "WebSocket bağlantımız production-da təsadüfi kəsilir, local-da yox." —
  Load balancer-in sticky session/timeout davranışı başa düşülmədən bu
  incident həll oluna bilməz.

Bu, "dərin DevOps" bilgisi deyil — **sistem dizaynında düzgün sual vermək və
düzgün qərar vermək üçün kifayət dərinlik**dir. Hər bölmə "frontend-ə necə
təsir edir" sualına cavabla açılır.

---

## 1. Docker (frontend build/deploy kontekstində)

### 1.1 Niyə vacib

Frontend developer Docker-i "container yaradan alət" kimi tanıyır, amma
senior səviyyədə fərq edən şey budur: **Docker image-in ölçüsü və layer
strukturu CI/CD sürətinə, deploy vaxtına və rollback sürətinə birbaşa təsir
edir**. Node.js-in bütün `node_modules`-unu production image-ə daşımaq,
`npm run build`-i hər dəfə cache-siz işə salmaq, ya da root user ilə
container işə salmaq — bunlar code review-də deyil, production incident-də
üzə çıxan səhvlərdir. Bu bilik həmçinin "niyə bizim static SPA-nı Node.js
server-i ilə serve edirik, NGINX-lə yox?" sualına cavab vermək üçün lazımdır
— bu, resurs istifadəsi (memory footprint) və performansa (Node.js request
handling latency-si statik fayl üçün lazımsızdır) təsir edən arxitektura
qərarıdır.

### 1.2 Konsepsiyalar — ilk prinsiplərdən

Docker image **layer-lərin üst-üstə yığılmasıdır** (union filesystem —
overlay2). Hər `RUN`, `COPY`, `ADD` təlimatı yeni bir layer yaradır və bu
layer content-hash əsasında cache-lənir. Əgər bir layer-in girişi (məsələn,
`COPY` etdiyin fayl) dəyişməyibsə, Docker o layer-i təkrar build etmir —
əvvəlki nəticəni cache-dən götürür. Bu, **niyə `package.json`-u kodun
qalanından əvvəl copy etmək lazımdır** sualının cavabıdır: `npm install`
layer-i yalnız `package.json`/`package-lock.json` dəyişəndə invalidasiya
olunsun, hər kod dəyişikliyində yox.

**Multi-stage build** ayrı bir konsepsiyadır: bir Dockerfile daxilində bir
neçə `FROM` bloku ola bilər, və sonuncu stage yalnız əvvəlki stage-lərdən
lazım olan artefaktları `COPY --from=` ilə götürür. Nəticə: build alətləri
(Node.js, npm, dev dependencies, source code) final image-də **heç olmur** —
yalnız compile edilmiş statik fayllar və onları serve edən minimal runtime
(NGINX) qalır. Bu təkcə image ölçüsünü azaltmır (bir neçə yüz MB-dan
onlarla MB-a), həm də **attack surface**-i azaldır: production container-də
`npm`, `node`, source code, `.env`-lər olmadıqda, container compromise
olsa belə oradan çıxarıla biləcək şey az olur.

### 1.3 Praktiki nümunə

```dockerfile
# ---- Stage 1: dependencies (ayrıca cache layer) ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev=false

# ---- Stage 2: build ----
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

# ---- Stage 3: runtime (yalnız statik fayllar + nginx) ----
FROM nginx:1.27-alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Edge case: root olmayan user ilə işə sal
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html
USER nginx

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget --spider -q http://localhost:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
```

**Edge-case-lər:**

- `ARG` build-time-da lazımdır, `ENV` runtime-da. SPA-larda `VITE_API_URL`
  kimi dəyərlər **build zamanı bundle-a yazılır** — runtime-da container
  environment variable-ı dəyişsən belə, artıq compile olunmuş JS-də dəyişən
  heç nə yoxdur. Bu, "eyni image-i dev/staging/prod-a environment variable
  ilə fərqli config-lə deploy edərik" fikrini SPA-lar üçün yanlış edir (SSR
  app-lərdə fərqlidir, çünki server runtime-da environment oxuyur).
- `npm ci`, `npm install` yox — `package-lock.json`-a tam uyğun, sürətli,
  reproducible install. `npm install` lock file-ı dəyişə bilər, CI-də bu
  qeyri-deterministik nəticə deməkdir.
- `nginx` user ilə port 80 deyil, 8080 açılır, çünki 1024-dən aşağı portlara
  bind etmək root tələb edir; unprivileged user 80-ə bind edə bilməz (bu,
  "USER nginx yazdım, niyə container başlamır" tələsinin səbəbidir).

### 1.4 Senior-level tələlər

- **`.dockerignore` unudulması**: `node_modules`, `.git`, `.env` build
  context-ə daxil olur, build həm yavaşlayır, həm də secret sızma riski
  yaranır.
- **Cache invalidation sırası səhvi**: `COPY . .`-i `npm ci`-dən əvvəl
  yazmaq — nəticədə hər kod dəyişikliyi bütün dependency install-u yenidən
  tetikləyir, CI 5x-10x yavaşlayır.
</br>
- **SPA client-side routing üçün NGINX `try_files` unudulması**: statik
  fayl server-i default olaraq `/dashboard/settings` kimi bir path-ə 404
  qaytarır, çünki fiziki fayl yoxdur — SPA-nın client-side router-i heç
  vaxt işə düşmür. (Aşağıda NGINX bölməsində konfiqurasiya nümunəsi var.)
- **Build-time env vs runtime env qarışdırılması**: SPA-da "bir image, çox
  environment" pattern-i işləmir; SSR/Node.js server-də işləyir. Bu fərqi
  bilməmək production-da yanlış API endpoint-ə bağlanmaqla nəticələnir.
- **Layer-də secret sızması**: `RUN echo $NPM_TOKEN > .npmrc && npm install
  && rm .npmrc` — `rm` sonrakı layer-dədir, əvvəlki layer-də token qalır və
  `docker history`/image layer-ləri export edərək çıxarıla bilər.

### 1.5 Trade-off / dizayn sualları

1. SPA-nı NGINX ilə statik serve etmək əvəzinə Node.js (`serve`, Express)
   ilə serve etsək nə itiririk, nə qazanırıq?
2. Hansı halda multi-stage build əvəzinə build-i CI pipeline-da edib yalnız
   artefaktı runtime image-ə köçürmək daha məntiqlidir (build image-i heç
   registry-ə push etməmək)?
3. Bir monorepo-da 5 fərqli frontend app varsa, hər biri üçün ayrı Dockerfile
   yoxsa bir base image + fərqli `COPY` target-lər? Trade-off nədir (build
   vaxtı vs bağlılıq)?

### 1.6 Mock müsahibə sual-cavabları

**S: Multi-stage build image ölçüsünü necə azaldır, mexanizmi izah et.**
C: Hər `FROM` yeni, təmiz bir filesystem başladır. `COPY --from=<stage>`
yalnız göstərilən stage-in filesystem-indən konkret path-i köçürür, o
stage-in özü (və onun layer-ləri, alətləri) final image-ə heç vaxt daxil
olmur. Nəticə image yalnız son `FROM`-dan sonrakı layer-lərdən ibarətdir.

**S: SPA-nı deploy edəndən sonra istifadəçi köhnə `index.html`-i alır,
amma statik JS/CSS faylları yeni versiyadır. Bu necə mümkündür və necə
qarşısı alınır?**
C: Bu, cache invalidation ardıcıllığı problemidir — `index.html` uzun TTL
ilə cache-lənibsə, o hələ köhnə hash-li JS/CSS fayllara referans verir, bu
fayllar isə silinib (yeni deploy köhnələri saxlamayıbsa) 404 qayıdır, ya da
yeni deploy köhnə hash-li faylları saxlayırsa istifadəçi köhnə app versiyası
işlədir. Həll: `index.html`-ə `no-cache` (həmişə revalidate), hash-li statik
assetlərə `max-age=31536000, immutable`; deploy zamanı köhnə hash-li
assetləri azaldan müddət (məs. bir neçə deploy) saxlamaq.

**S: Niyə production Docker image-də `npm`/`node` binary-si olmamalıdır
(statik SPA halında)?**
C: Runtime-da JS icra olunmur, yalnız statik fayllar HTTP ilə verilir.
`node`/`npm`-in qalması yalnız attack surface artırır (CVE-lər, arbitrary
code execution riski) və image ölçüsünü şişirdir, funksional fayda vermir.

### 1.7 Mənbələr

- [Docker multi-stage build patterns üçün icmal axtarışı](https://dev.to/it-wibrc/guide-to-containerizing-a-modern-javascript-spa-vuevitereact-with-a-multi-stage-nginx-build-1lma) — SPA + NGINX multi-stage pattern
- [tiangolo/node-frontend — Node.js build + NGINX serve nümunəsi](https://github.com/tiangolo/node-frontend)
- Ümumi Docker layer-caching mexanizmi — Docker-in rəsmi build cache
  davranışı (layer content-hash əsaslı invalidasiya) geniş qəbul olunmuş,
  çoxsaylı mənbədə təsdiqlənmiş fakt kimi istifadə olunub.

---

## 2. NGINX

### 2.1 Niyə vacib

Frontend developer-in NGINX-i yalnız "reverse proxy alətidir" kimi tanıması
kifayət deyil. Senior səviyyədə NGINX konfiqurasiyası — `try_files`, MIME
type-lar, compression, cache header-lər — **frontend-in özünün bir
hissəsidir**, çünki SPA routing-in işləməsi, static asset-lərin düzgün
cache-lənməsi, security header-lərin (CSP, X-Frame-Options) tətbiqi məhz bu
qatda baş verir. Bir çox "frontend bug"ı əslində yanlış NGINX konfiqurasiya
nəticəsidir (404 on refresh, cache-lənməyən JS bundle, compress olunmayan
response).

### 2.2 Konsepsiyalar — ilk prinsiplərdən

NGINX **event-driven, asinxron** bir HTTP server/proxy-dir. Apache-nin
"hər request üçün bir thread/process" modelindən fərqli olaraq, NGINX bir
neçə worker process işlədir və hər worker minlərlə bağlantını epoll/kqueue
kimi OS event mexanizmləri ilə **non-blocking** şəkildə idarə edir. Bu, çox
sayda eyni zamanlı bağlantıda (statik fayl serve etmək, ya da minlərlə
keep-alive bağlantı saxlamaq) NGINX-in az resursla yüksək throughput
verməsinin səbəbidir — frontend üçün praktiki nəticə: statik asset-ləri
NGINX-lə serve etmək demək olar həmişə Node.js-dən daha effektivdir.

NGINX konfiqurasiyası **request-i location block-lara uyğunlaşdırma**
məntiqinə əsaslanır: hər `server` bloku bir host/port-u dinləyir, daxilində
`location` blokları URL path-lərinə görə fərqli davranış təyin edir (statik
fayl ver, proxy et, redirect et). SPA-larda ən kritik məntiq: server-də
fiziki olaraq mövcud olmayan path-lər (`/dashboard/settings`) üçün 404
qaytarmaq əvəzinə `index.html`-i qaytarmaq — bundan sonra client-side router
(React Router və s.) URL-i oxuyub düzgün komponenti render edir.

### 2.3 Praktiki nümunə

```nginx
server {
    listen 8080;
    server_name _;
    root /usr/share/nginx/html;

    # 1) SPA fallback — client-side routing üçün MƏCBURİ
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 2) Hash-lənmiş static asset-lər — sonsuz cache, çünki fayl adı
    #    məzmun dəyişəndə dəyişir (məs. main.a1b2c3.js)
    location ~* \.(?:js|css|woff2?|png|jpg|svg)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    # 3) index.html — HƏMİŞƏ revalidate, heç vaxt uzun cache
    location = /index.html {
        add_header Cache-Control "no-cache";
    }

    # 4) Security header-lər (edge-case: SPA-larda inline script/style
    #    olduğu üçün CSP-ni build tool-la uyğunlaşdırmaq lazımdır)
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # 5) Gzip — MDN/NGINX docs təsdiqlədiyi kimi default yalnız
    #    text/html-i sıxır, digər tipləri əlavə etmək lazımdır
    gzip on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript
               text/xml application/xml application/xml+rss text/javascript
               image/svg+xml;
    gzip_vary on;
}
```

**Edge-case-lər:**

- `try_files $uri $uri/ /index.html;` — əgər API sorğuları da eyni server
  block-dan keçirsə, `/api/*` üçün ayrıca `location /api/ { proxy_pass ...;
  }` bloku `location /`-dan **əvvəl** (daha spesifik prefix ilə) tərtib
  olunmalıdır, əks halda API 404-lər `index.html`-ə fallback edər (bu,
  "API 404 səhvi niyə HTML qaytarır" tələsidir — JSON parse xətası kimi
  görünür, əslində routing səhvidir).
- `gzip_types` siyahısına default daxil olmayan `application/javascript`,
  `application/json`, `image/svg+xml` əlavə edilməyibsə, bu tiplər
  sıxılmadan gedir — bundle ölçüsü 3-4x böyük transfer olunur.
- `expires 1y` + `immutable` yalnız **hash-lənmiş** fayl adları üçün
  təhlükəsizdir. Hash-siz statik fayl adına (`app.js`) bu qayda tətbiq
  olunarsa, deploy sonrası istifadəçilər köhnə versiyanı bir il görə bilər.

### 2.4 Senior-level tələlər

- **`location /` bloku ilə `location /api/` bloku sıra/spesifiklik
  səhvi** — yuxarıda izah edildi.
- **Brotli-ni default modul kimi güvənmək**: stock `nginx` (rəsmi Docker
  image daxil) `ngx_brotli`-ni default kompilə etmir — bu, NGINX-in açıq
  mənbə repo-larına ayrıca dynamic module kimi əlavə edilir, ya da NGINX
  Plus-ın kommersiya modulu kimi gəlir. `brotli on;` yazıb modul yüklü
  olmadığını fərq etməmək — NGINX `unknown directive "brotli"` xətası ilə
  başlamır belə.
- **Access log-u statik asset-lər üçün açıq saxlamaq**: yüksək trafikli
  SPA-da hər JS/CSS/font sorğusunu log-lamaq disk I/O və log ölçüsünü
  şişirdir, faydalı siqnal az verir — `access_log off;` static location-larda
  adi praktikadır.
- **`Vary: Accept-Encoding` unutmaq**: brotli/gzip fərqli client-lərə
  fərqli body qaytarır; bu header olmadan, aralıq cache (CDN) sıxılmış
  variantı sıxılmamış istəyən client-ə verə bilər.

### 2.5 Trade-off / dizayn sualları

1. Bütün security header-ləri (CSP, X-Frame-Options) NGINX-də, yoxsa CDN-də
   (Cloudflare/Fastly edge rule), yoxsa app-in özündə (meta tag) təyin
   etmək — hansı halda hansı daha doğrudur?
2. `try_files` ilə SPA fallback əvəzinə hər route üçün server-side render
   (Next.js) istifadə etsək, NGINX-in rolu necə dəyişir?
3. Statik asset-ləri birbaşa NGINX-dən, yoxsa NGINX-i keçib birbaşa CDN-dən
   (origin olaraq object storage) serve etmək — hansı halda NGINX artıq
   overhead-dir?

### 2.6 Mock müsahibə sual-cavabları

**S: SPA-da səhifəni refresh edəndə 404 alırsan, amma tətbiqin daxilində
naviqasiya işləyir. Səbəb nədir?**
C: Client-side router browser history API-ni (`pushState`) istifadə edir,
server-ə yeni request göndərmir — daxili naviqasiya heç vaxt server-ə
çatmır. Amma refresh/direct URL girişi server-ə əsl HTTP request göndərir,
server həmin path-də fiziki fayl axtarır, tapmır, 404 qaytarır. Həll:
`try_files $uri $uri/ /index.html;` ilə mövcud olmayan bütün path-ləri
`index.html`-ə yönləndirmək.

**S: NGINX worker process modeli Apache-dən nə üçün fərqlidir və bu fərq
nəyə görə əhəmiyyətlidir?**
C: Apache (prefork/worker MPM-də) hər bağlantı üçün ayrıca thread/process
ayıra bilər — yüksək eyni zamanlı bağlantı sayında memory/context-switch
overhead-i artır. NGINX az sayda worker process-lə, event loop (epoll)
əsaslı non-blocking I/O ilə minlərlə bağlantını idarə edir — C10K problemi
üçün dizayn edilib. Statik fayl serve etmək kimi I/O-bound işlərdə bu
fərq NGINX-i əhəmiyyətli dərəcədə daha effektiv edir.

**S: `gzip_proxied` niyə lazımdır, default davranış nədir?**
C: NGINX default olaraq **proxy edilmiş** (yəni `proxy_pass` ilə backend-dən
gələn) response-ları sıxmır, çünki backend artıq sıxıb ola bilər, ya da
response cache-lənə bilməyən məzmun ola bilər. `gzip_proxied` bu davranışı
açıq şəkildə idarə etməyə imkan verir (məs. `no-cache no-store private
expired auth` — bu response tiplərini sıx).

### 2.7 Mənbələr

- [NGINX Docs — Compression and Decompression](https://docs.nginx.com/nginx/admin-guide/web-server/compression/)
- [NGINX Docs — Reverse Proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)
- [NGINX Brotli Module Documentation](https://docs.nginx.com/nginx/admin-guide/dynamic-modules/brotli/)

---

## 3. Reverse Proxy

### 3.1 Niyə vacib

Frontend developer üçün reverse proxy, "niyə local-da işləyən CORS
konfiqurasiyası production-da fərqli davranır", "niyə cookie-lər
production-da göndərilmir", "niyə login redirect loop-a düşür" kimi
suallara aparan konseptdir. Reverse proxy client ilə əsl backend arasında
duran, request-ləri yönləndirən komponentdir — bu qatda header-lərin
(`Host`, `X-Forwarded-*`) düzgün ötürülməməsi frontend-in üzləşdiyi ən
gizli production bug-larından biridir.

### 3.2 Konsepsiyalar — ilk prinsiplərdən

Forward proxy client adından xarici dünyaya sorğu göndərir (client kimi
gizlənir). **Reverse proxy əksinədir** — server adından client-in sorğularını
qarşılayır, arxada olan bir və ya bir neçə backend-ə yönləndirir, client
bunun fərqinə varmır (backend-in özü gizlənir). Client-in gördüyü tək bir
"server" var, amma arxada bir NGINX/HAProxy/Envoy müxtəlif backend-lərə
(statik fayl server-i, API server-i, auth service) route edir.

Kritik mexanizm: reverse proxy backend-ə request-i **yeni bir bağlantı**
üzərindən ötürür. Bu o deməkdir ki, backend defolt olaraq əsl client IP-sini
yox, proxy-nin IP-sini görür, `Host` header-i proxy-nin öz konfiqurasiyasına
görə dəyişə bilər. Buna görə `X-Forwarded-For` (əsl client IP-si),
`X-Forwarded-Proto` (client HTTPS, yoxsa HTTP istifadə edib) və `X-Forwarded-Host`
header-ləri əl ilə ötürülməlidir — backend bu header-lərə güvənərək
düzgün URL generasiya edir, rate-limiting/logging üçün əsl IP-ni bilir.

### 3.3 Praktiki nümunə

```nginx
location /api/ {
    proxy_pass http://backend_upstream/;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Port $server_port;

    # Edge-case: WebSocket üçün Connection/Upgrade header-lərini
    # açıq şəkildə ötürmək lazımdır, default-da bunlar dəyişdirilir
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    # Slow client-lərdə buffering performansı yaxşılaşdırır,
    # amma real-time streaming response-larda gecikmə yaradır
    proxy_buffering on;
    proxy_read_timeout 60s;
}
```

**Edge-case-lər:**

- `X-Forwarded-Proto` ötürülməzsə, backend həmişə `http` düşünür, hətta
  client TLS ilə HTTPS-lə qoşulubsa belə (çünki proxy backend-ə plain
  HTTP ilə danışır). Backend bu məlumata əsasən "secure" cookie
  qoyursa, ya da `https://` ilə redirect generasiya edirsə, bu yanlış
  işləyər — nəticə tez-tez **infinite redirect loop**-dur (backend "mən
  http-yəm, https-ə redirect etməliyəm" deyir, proxy yenidən backend-ə
  http ilə göndərir, backend yenidən redirect edir).
- `proxy_http_version 1.1` və `Upgrade`/`Connection` header-ləri
  ötürülməzsə, WebSocket bağlantısı proxy səviyyəsində 400/502 ilə
  uğursuz olar — bu real-time frontend (chat, notification) üçün kritik
  bug-dır.
- `proxy_buffering on` default-dur və əksər halda yaxşıdır (slow client
  backend-i bloklamır), amma Server-Sent Events (SSE) kimi axın
  response-larda buffering-i söndürmək (`proxy_buffering off;`) lazımdır,
  əks halda client event-ləri real-time yox, batch şəklində alır.

### 3.4 Senior-level tələlər

- `X-Forwarded-Proto`-nu unutmaq və nəticədə redirect loop debug etməyə
  saatlarla vaxt sərf etmək — yuxarıda izah edildi.
- Cookie `Domain`/`SameSite` atributlarını reverse proxy-nin yönləndirdiyi
  fərqli subdomain-lərlə (məs. `api.example.com` vs `app.example.com`)
  uzlaşdırmamaq — cookie bir domain-də qoyulur, digərinə göndərilmir.
- CORS-u həm backend-də, həm də reverse proxy-də ayrıca konfiqurasiya edib
  ikiqat/uyğunsuz `Access-Control-Allow-Origin` header-i göndərmək (bəzən
  iki dəfə eyni header əlavə olunur, browser bunu invalid sayır).
- Timeout-ları yalnız bir qatda (məs. yalnız backend-də) təyin edib
  proxy-nin öz default timeout-unun (adətən 60s) daha qısa olduğunu
  görməmək — nəticə: uzun sürən sorğu backend-də hələ işləyir, amma
  client artıq 502/504 alıb.

### 3.5 Trade-off / dizayn sualları

1. CORS-u tamamilə aradan qaldırmaq üçün frontend-i reverse proxy vasitəsilə
   API ilə eyni origin-ə çıxarmaq (path-based routing) — bunun nə üstünlüyü,
   nə çatışmazlığı var (backend-lərin müstəqilliyi, deploy əlaqəsi)?
2. Auth-u reverse proxy qatında (məs. auth subrequest) yoxsa hər backend
   service-də ayrıca yoxlamaq — hansı halda hansı doğrudur?
3. Mikroservis arxitekturasında hər servisin öz path prefiksi (`/api/orders`,
   `/api/users`) reverse proxy-də saxlanılırsa, servislərin öz daxili
   route-larını dəyişməsi frontend-ə necə təsir edir?

### 3.6 Mock müsahibə sual-cavabları

**S: Login sonrası saytda "ERR_TOO_MANY_REDIRECTS" alırsan, yalnız
production-da, local-da yox. Ehtimal olunan səbəb?**
C: Çox güman TLS termination reverse proxy/load balancer-də olur, backend
plain HTTP alır və `X-Forwarded-Proto` ötürülmür. Backend "mən HTTP-yəm"
deyib HTTPS-ə redirect edir, proxy bu redirect-i client-ə ötürür, client
yenidən HTTPS ilə sorğu göndərir, proxy yenə backend-ə HTTP ilə ötürür —
sonsuz dövr. Həll: `proxy_set_header X-Forwarded-Proto $scheme;` əlavə
etmək və backend-in bunu oxumasını təmin etmək (məs. Express-də
`trust proxy`).

**S: Forward proxy ilə reverse proxy arasındakı fərqi bir cümlə ilə izah
et.**
C: Forward proxy client-i backend-lərdən gizlədir (client adından çıxır),
reverse proxy backend-i client-dən gizlədir (server adından qarşılayır).

**S: WebSocket bağlantısı reverse proxy arxasında niyə xüsusi
konfiqurasiya tələb edir?**
C: WebSocket HTTP `Upgrade` handshake-i ilə başlayır (HTTP-dən TCP
səviyyəsində davamlı bağlantıya keçir). Reverse proxy default olaraq hər
request-i müstəqil HTTP mübadiləsi kimi buffer edir/idarə edir; `Upgrade`
və `Connection: upgrade` header-ləri açıq şəkildə ötürülməzsə, proxy
bağlantını "adi" HTTP sorğusu kimi bağlayır, handshake uğursuz olur.

### 3.7 Mənbələr

- [NGINX Docs — Reverse Proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)
- [NGINX Module ngx_http_proxy_module — proxy_set_header, X-Forwarded-For](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)

---

## 4. Load Balancer

### 4.1 Niyə vacib

Frontend developer birbaşa load balancer konfiqurasiya etməyəcək, amma
onun davranışını bilməmək **real-time xüsusiyyətlərdə (WebSocket, SSE) və
session idarəçiliyində** incident yaradır. "İstifadəçi bəzən login-dən
sonra sessiyasını itirir", "WebSocket bağlantısı təsadüfi kəsilir" kimi
şikayətlərin kök səbəbi çox vaxt load balancer-in server seçim
strategiyasıdır (hər sorğu fərqli backend instance-a düşür).

### 4.2 Konsepsiyalar — ilk prinsiplərdən

Load balancer bir sorğunu neçə backend instance arasında **hansı
alqoritmlə** paylaşdıracağını qərar verir:

- **Round robin**: sorğular ardıcıl olaraq növbə ilə paylanır. Backend-lər
  bir-birinə bənzər gücdə və sorğular oxşar müddətdə işlənirsə kifayət
  edir.
- **Least connections**: yeni sorğu hazırda ən az aktiv bağlantısı olan
  backend-ə göndərilir. Sorğuların icra müddəti dəyişkən olduqda (bəziləri
  uzun sürən report generasiyası, bəziləri sürətli GET) daha ədalətli
  paylanma verir; uzunömürlü bağlantılar (WebSocket) üçün adətən üstünlük
  verilən strategiyadır.
- **IP hash / sticky session**: eyni client-in bütün sorğuları **eyni**
  backend-ə göndərilir — client IP-sinin hash-i əsasında (NGINX-in
  `ip_hash`-i client IP-nin ilk üç oktetini istifadə edir). Bu, server-side
  session (backend-in yaddaşında saxlanan session state) tələb edən
  sistemlərdə **məcburidir** — əks halda istifadəçi hər sorğuda fərqli
  backend-ə düşüb sessiyasını "itirə" bilər.

**Fərq niyə frontend üçün əhəmiyyətlidir**: WebSocket bir dəfə qurulan,
uzun ömürlü TCP bağlantısıdır — load balancer-in "hansı backend-ə
göndərim" qərarı yalnız **handshake zamanı** verilir. Əgər backend-lər
arasında sticky session yoxdursa və backend restart olarsa, ya da health
check səbəbindən backend siyahıdan çıxarsa, həmin backend-ə bağlı bütün
WebSocket-lər kəsilir — bu "təsadüfi disconnect" kimi görünür, əslində
load balancer-in normal davranışıdır.

### 4.3 Praktiki nümunə

```nginx
upstream app_backend {
    # WebSocket/uzunömürlü bağlantılar üçün least_conn — bağlantı
    # sayına görə balanslaşdırma, sorğu sayına görə yox
    least_conn;

    server 10.0.1.10:3000 max_fails=3 fail_timeout=30s;
    server 10.0.1.11:3000 max_fails=3 fail_timeout=30s;
    server 10.0.1.12:3000 backup;   # yalnız digərləri düşəndə işə düşür

    keepalive 32;
}

server {
    location /ws/ {
        proxy_pass http://app_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Edge-case: WebSocket adətən çox uzun yaşayır, default
        # timeout (60s) bağlantını gərəksiz kəsə bilər
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
    }
}
```

**Edge-case-lər:**

- Açıq mənbə (pulsuz) NGINX-də **aktiv health check yoxdur** — bu, yalnız
  NGINX Plus-ın (kommersiya) xüsusiyyətidir. Açıq mənbə versiyası yalnız
  **passiv** yoxlama edir: `max_fails`/`fail_timeout` — server real
  request-lərdə uğursuz olanda "sıradan çıxarılır". Nəticə: backend
  düşəndən sonra ilk bir neçə real istifadəçi sorğusu uğursuz olacaq,
  bundan sonra NGINX o server-i müvəqqəti siyahıdan çıxaracaq. Bunu
  "avtomatik, real-time health check var" kimi güvənmək səhvdir.
- `backup` server-lər yalnız digər bütün server-lər əlçatmaz olanda işə
  düşür — normal trafik heç vaxt ora getmir, bu "test edilməmiş fallback"
  riski yaradır (incident zamanı ilk dəfə trafik alan server-in özü də
  problemli ola bilər).
- Sticky session (`ip_hash`) NAT/korporativ şəbəkə arxasında olan çox
  istifadəçinin **eyni ictimai IP-dən** çıxdığı halda bütün onları bir
  backend-ə yönləndirir — bu backend digərlərindən daha çox yüklənə bilər
  (uneven load distribution).

### 4.4 Senior-level tələlər

- WebSocket/SSE üçün round-robin istifadə edib "bəzən bağlantı kəsilir"
  şikayətini debug edə bilməmək.
- Sticky session-u cookie əsaslı (backend-in özü təyin etdiyi) əvəzinə
  yalnız `ip_hash`-ə güvənmək — mobil şəbəkələrdə (carrier-grade NAT) IP
  tez-tez dəyişir, sessiya itir.
- Passiv health check-in "backend real vaxtda yoxlanılır" fikri ilə
  qarışdırılması — yuxarıda izah edildi.
- Load balancer-in özünün connection timeout-unu backend-in timeout-undan
  daha qısa təyin etmək — backend hələ cavab hazırlayarkən load balancer
  artıq 504 qaytarır.

### 4.5 Trade-off / dizayn sualları

1. Stateless backend (JWT-based auth, session state yoxdur) dizaynı
   seçsək, load balancer strategiyası sadələşir — bunun əvəzində hansı
   məsuliyyəti (token revocation, refresh) frontend/backend öz üzərinə
   götürür?
2. WebSocket üçün sticky session əvəzinə, bağlantı kəsiləndə client-in
   avtomatik reconnect + state-i server-dən yenidən sinxronlaşdırması
   strategiyası — hansı halda bu daha etibarlıdır?
3. Health check-i tətbiqin öz "readiness" endpoint-inə (DB bağlantısı,
   asılı servislərin vəziyyəti) bağlamaq — bunun sadə "server 200
   qaytarır" health check-dən fərqi nədir, hansı riskləri azaldır?

### 4.6 Mock müsahibə sual-cavabları

**S: Round robin ilə least connections arasındakı fərqi nə vaxt seçərsən?**
C: Sorğuların icra müddəti bir-birinə yaxındırsa (stateless API, kiçik
GET-lər) round robin kifayətdir və sadədir. Sorğu müddəti dəyişkəndirsə
(uzun hesabatlar, streaming, WebSocket kimi uzunömürlü bağlantılar), least
connections daha ədalətli paylanma verir, çünki hazırda az yüklənmiş
server-ə yönləndirir, əvəzinə "növbə"yə əsaslanmır.

**S: Sticky session nədir və nə üçün lazımdır?**
C: Eyni client-in bütün sorğularının (adətən client IP-nin hash-i və ya
cookie əsasında) həmişə eyni backend instance-a yönləndirilməsidir. Backend
sessiya state-ini yaddaşında (in-memory) saxlayırsa, sticky session olmadan
istifadəçi hər sorğuda fərqli instance-a düşüb "authenticated olmayan"
vəziyyətə keçə bilər.

**S: Açıq mənbə NGINX-də backend server-in "sağlam" olub-olmadığını necə
bilir?**
C: Passiv yoxlama ilə — real client sorğuları backend-ə göndərilir, əgər
`max_fails` sayda ardıcıl uğursuzluq `fail_timeout` müddətində baş verərsə,
server müvəqqəti siyahıdan çıxarılır. Aktiv (NGINX-in özünün müstəqil
probe göndərməsi) yoxlama açıq mənbə versiyada yoxdur, NGINX Plus və ya
üçüncü tərəf modul (`nginx_upstream_check_module`) tələb edir.

### 4.7 Mənbələr

- [NGINX Docs — HTTP Health Checks](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-health-check/)
- Load balancing alqoritmləri (round robin, least connections, ip_hash)
  üzrə ümumi konsensus — çoxsaylı sənədləşdirmə mənbəyində (NGINX rəsmi
  docs, HAProxy docs) təkrarlanan, yaxşı sənədləşdirilmiş fakt.

---

## 5. CDN

### 5.1 Niyə vacib

CDN frontend performansına (LCP, TTFB) birbaşa təsir edən ən böyük tək
qərardır — amma senior səviyyədə fərqləndirici bilik "CDN istifadə edirik"
deyil, **CDN-in cache invalidation modelini, edge-lər arasındakı
consistency-ni** başa düşməkdir. "Deploy etdik, amma dünyanın bəzi
hissələrində istifadəçilər hələ köhnə versiyanı görür" — bu, CDN cache
propagation-un necə işlədiyini bilmədən düzgün debug edilə bilməz.

### 5.2 Konsepsiyalar — ilk prinsiplərdən

CDN, coğrafi olaraq paylanmış edge server şəbəkəsidir — məzmun origin
server-in yerinə istifadəçiyə **fiziki olaraq daha yaxın** node-dan
verilir, bu latency-ni azaldır. Amma CDN-in əsl gücü sadəcə "yaxınlıq"
deyil, **origin-i tamamilə bypass edərək** cache-lənmiş cavabı vermək
qabiliyyətidir — origin heç bir request görmür, edge özü cavab verir.

Bunun tərsi tərəfi **cache invalidation**-dır: origin-də məzmun
dəyişəndə, dünya üzrə paylanmış hər edge node-un öz cache-ini "unutması"
lazımdır. Bu, sadə bir problem deyil — Cloudflare öz mühəndislik blog-unda
bunu açıq şəkildə "hard problem" adlandırır və bunun üçün ayrıca purge
infrastrukturu (coreless purge, "Instant Purge" — 150ms-dən az müddətdə
qlobal invalidasiya) qurduğunu izah edir. Purge adətən bir neçə formada
olur: **purge everything**, **purge by URL**, **purge by prefix**, **purge
by tag** (Cache-Tag header-i ilə işarələnmiş assetlər).

Frontend üçün praktiki nəticə: **CDN-ə güvənərək manual purge etməkdən
tamamilə çəkinmək** — hash-lənmiş fayl adları strategiyası (content-addressed
URL-lər) istifadə etsən, heç vaxt purge etməyə ehtiyac qalmır, çünki
məzmun dəyişəndə URL də dəyişir, köhnə URL-in cache-i sadəcə "yararsız"
qalır, təhlükəli olmur.

### 5.3 Praktiki nümunə

```
# Static asset (hash-lənmiş fayl adı) — CDN + browser-də sonsuz cache
Cache-Control: public, max-age=31536000, immutable

# index.html / app shell — CDN-də qısa cache, həmişə origin-ə revalidate
Cache-Control: public, max-age=0, s-maxage=60, must-revalidate

# API cavabı (public, tez-tez dəyişən) — qısa freshness + arxa planda yenilə
Cache-Control: public, max-age=30, stale-while-revalidate=300
```

Edge case — CDN edge rule (konsept nümunəsi, provayderdən asılı sintaksis
fərqli ola bilər):

```
# Cache-Tag ilə purge edilə bilən qruplaşdırma
Cache-Tag: build-2026-07-13, category:blog
```

**Edge-case-lər:**

- `Vary: Accept-Encoding` (compression bölməsi ilə əlaqəli) CDN-in
  **cache key**-inə təsir edir — əgər `Vary` header-i düzgün deyilsə, CDN
  bir client-ə brotli sıxılmış, digərinə sıxılmamış cavabı səhv qarışdıra
  bilər. Bəzi CDN-lər `Vary` dəyərlərini məhdud dəstəkləyir (məs. yalnız
  bilinən dəyərləri cache key-ə salır) — provayder-spesifik davranışı
  yoxlamaq lazımdır.
- `s-maxage` yalnız **shared cache** (CDN, proxy) üçün keçərlidir, browser
  bunu görməzdən gəlir və öz `max-age`-inə baxır. Bunu bilməmək "CDN-də
  cache düzgün işləyir, amma browser hər dəfə yenidən yükləyir" (və ya
  əksinə) tələsinə səbəb olur.
- SPA-larda `index.html`-i uzun müddət CDN-də cache-ləmək — yeni deploy
  edildikdə istifadəçilər `s-maxage` bitənə qədər köhnə app shell-i
  görməyə davam edir. Bu, "niyə production-da bəzi istifadəçilər hələ
  köhnə bug-lı versiyanı işlədir" sualının ən çox rast gəlinən səbəbidir.

### 5.4 Senior-level tələlər

- Hash-lənməmiş statik fayl adına uzun `max-age` qoyub, deploy sonrası
  manual purge-ə güvənmək (purge gecikə bilər, ya da unudulur).
- `s-maxage`/`max-age` fərqini bilməyib CDN-in davranışını browser-in
  davranışı ilə qarışdırmaq.
- CDN-i yalnız statik assetlər üçün düşünüb, API response-ları üçün
  (uyğun olduğu hallarda, `stale-while-revalidate` ilə) istifadə
  etməməyi — bu, backend-i lazımsız yükləyir.
- Cookie/`Authorization` header-i olan response-ları diqqətsizcə `public`
  edib, bir istifadəçinin şəxsi məzmununu digərinə CDN vasitəsilə
  "sızdırmaq" (CDN-lər defolt olaraq `Authorization` header-i olan
  response-ları shared-cache etmir, məhz bu risk üçün — `public` açıq
  şəkildə bunu "unlock" edir, ehtiyatsızlıqla istifadə təhlükəlidir).

### 5.5 Trade-off / dizayn sualları

1. Bütün trafiki CDN arxasına almaq (hətta dinamik API-lar üçün) — bunun
   origin yükünü azaltmaqdaki faydası ilə debug çətinliyi (edge-də baş
   verən problemi görmək çətinləşir) arasında trade-off nədir?
2. `stale-while-revalidate` istifadə etmək əvəzinə həmişə fresh məzmun
   tələb etmək (`no-cache`) — hansı biznes tələbi (real-time qiymət,
   inventory) bunu məcbur edir?
3. Multi-region deployment-də CDN-in origin-ə çatması üçün ən yaxın region-u
   seçmə strategiyası ilə istifadəçinin faktiki coğrafi yaxınlığı arasında
   uyğunsuzluq yaransa (məs. origin bir regiondadır, CDN edge digərində),
   bu latency-ə necə təsir edir?

### 5.6 Mock müsahibə sual-cavabları

**S: Yeni versiya deploy etdin, amma bəzi istifadəçilər hələ köhnə app-i
görür. Debug addımların?**
C: Əvvəlcə hansı qatda cache-ləndiyini müəyyənləşdirirəm: browser cache
(DevTools Network-də "from disk cache" işarəsi), CDN edge cache (response
header-lərdə `CF-Cache-Status`/`X-Cache` kimi provayder-spesifik header-lər
"HIT" göstərir), yoxsa origin-in özü köhnə build-i verir. Əgər CDN HIT
göstərirsə, `index.html`-in `Cache-Control`/`s-maxage` dəyərini yoxlayıram
— çox güman uzun müddətə cache-lənib, purge lazımdır və gələcək üçün
`s-maxage`-i qısaldıram.

**S: `Cache-Tag` header-i ilə purge-un URL-based purge-dan üstünlüyü nədir?**
C: URL-based purge hər dəyişən fayl üçün ayrıca URL bilmək tələb edir —
böyük saytlarda min-lərlə URL ola bilər. Tag-based purge, əlaqəli
resursları (məs. bir kateqoriyaya aid bütün səhifələr) bir tag altında
qruplaşdırır, bir purge çağırışı ilə hamısını invalid edir — dəyişikliyin
"nəyə təsir etdiyini" URL səviyyəsində izləmək məcburiyyətini aradan
qaldırır.

**S: `stale-while-revalidate` istifadəçi təcrübəsinə necə fayda verir?**
C: Cache müddəti bitəndə (stale olanda) istifadəçi origin-ə gedən sorğunun
latency-sini gözləmir — köhnəlmiş (amma hələ "yaxın keçmiş") cavab dərhal
verilir, arxa planda təzə cavab gətirilir və cache yenilənir. Nəticə:
istifadəçi heç vaxt "yavaş" sorğu hiss etmir, məzmun tədricən təzələnir.

### 5.7 Mənbələr

- [Cloudflare Blog — Instant Purge: invalidating cached content in under 150ms](https://blog.cloudflare.com/instant-purge/)
- [Cloudflare Blog — Rethinking Cache Purge (coreless purge)](https://blog.cloudflare.com/part1-coreless-purge/)
- [Cloudflare Cache Docs](https://developers.cloudflare.com/cache/)

---

## 6. Cache (HTTP / CDN cache qatları)

### 6.1 Niyə vacib

"Cache" tək bir qat deyil — browser cache, service worker cache, CDN edge
cache, reverse proxy cache, ola bilsin backend-in özündəki cache (Redis)
— hər biri **ayrı TTL, ayrı invalidation qaydası** ilə işləyir. Senior
developer bu qatları ayırd edə bilməli, "bu bug hansı cache qatında baş
verir" sualını verə bilməlidir. Bu bacarıq olmadan cache-lə bağlı hər bug
"random şəkildə işləyib-işləməyən" kimi görünür.

### 6.2 Konsepsiyalar — ilk prinsiplərdən

HTTP caching-in əsası **freshness** (təzəlik) və **validation**
(doğrulama) anlayışlarının ayrılmasıdır:

- **Freshness** — `max-age`/`s-maxage` ilə təyin olunan müddət ərzində
  cache heç bir şəbəkə sorğusu göndərmədən öz saxladığı cavabı verə bilər.
- **Validation** — müddət bitdikdə (stale), cache origin-ə "bu hələ
  keçərlidirmi?" sualını (`If-None-Match`/`ETag` və ya
  `If-Modified-Since`/`Last-Modified` ilə) verir; origin `304 Not Modified`
  qaytararsa, body yenidən göndərilmir, yalnız "hələ keçərlidir" təsdiqi
  gəlir — bu, tam response-u yenidən yükləməkdən qat-qat yüngüldür.

`no-cache` bu iki anlayışı qarışdıranların ən çox düşdüyü tələdir: adı
"cache-ləmə" desə də, əslində **cache-ləməyə icazə verir, sadəcə hər
istifadədən əvvəl validation məcbur edir**. Həqiqətən cache-ləməni
qadağan edən direktiv `no-store`-dur.

**Browser vs shared (CDN/proxy) cache fərqi** kritikdir: `private` yalnız
browser-də saxlanılır (şəxsi məzmun üçün), `public` isə CDN kimi paylaşılan
cache-lərdə də saxlanıla bilər. `s-maxage` yalnız paylaşılan cache-lər üçün
mənalıdır və mövcud olduqda `max-age`-i override edir — yəni browser-in
gördüyü təzəlik müddəti ilə CDN-in gördüyü fərqli ola bilər, bu **qəsdən**
belədir (CDN-i daha uzun/qısa saxlamaq üçün ayrıca kontrol).

### 6.3 Praktiki nümunə

```http
# Şəxsi, tez-tez dəyişən API cavabı (məs. istifadəçinin bildiriş sayı)
Cache-Control: private, no-cache

# Hash-lənmiş static bundle
Cache-Control: public, max-age=31536000, immutable

# Public, orta tezlikdə dəyişən content — CDN 1 saat, browser 5 dəqiqə
Cache-Control: public, max-age=300, s-maxage=3600

# Origin əlçatmaz olanda köhnə cavabı verməyə davam et (resilience)
Cache-Control: max-age=600, stale-if-error=86400
```

Validation nümunəsi (ETag ilə conditional request):

```http
# Server response
HTTP/1.1 200 OK
ETag: "a1b2c3-build-42"
Cache-Control: no-cache

# Sonrakı sorğuda browser
GET /api/config HTTP/1.1
If-None-Match: "a1b2c3-build-42"

# Server, dəyişməyibsə
HTTP/1.1 304 Not Modified
```

**Edge-case-lər:**

- `no-cache`/`must-revalidate` **back/forward (bfcache) naviqasiyasına**
  zəmanət vermir — spesifikasiya browser-in geri/irəli düymələrində
  saxlanmış snapshot-u revalidasiyasız bərpa etməsinə icazə verir. "Mən
  `no-cache` qoymuşam, niyə back düyməsi köhnə məzmunu göstərir"
  sualının cavabı budur.
- `Age` header-i — response-un aralıq cache-də (CDN) nə qədər saxlandığını
  göstərir; browser bunu öz `max-age`-indən çıxır. Yəni `max-age=604800`
  və `Age: 100` gələrsə, browser artıq 100 saniyəlik "yaşlanmış" cavab
  aldığını bilir, öz freshness hesablamasını buna görə aparır.
- `Authorization` header-i olan response-lar defolt **shared-cache
  olunmur** (təhlükəsizlik üçün) — `public` açıq şəkildə bu qorumanı
  aradan qaldırır. Bunu bilmədən `public` qoymaq, autentifikasiya olunmuş
  cavabın CDN-də başqa istifadəçiyə sızmasına yol aça bilər.

### 6.4 Senior-level tələlər

- `no-cache`-i `no-store` ilə qarışdırmaq — "cache-ləməsin" demək
  istəyəndə `no-cache` yazmaq, əslində cache-lənməsinə icazə vermək.
- Şəxsi məzmuna `private` əvəzinə default (heç nə) qoymaq — bəzi CDN-lər
  `Authorization` header-i olmasa, response-u ehtiyatsızlıqla shared-cache
  edə bilər.
- `s-maxage`-i unudub yalnız `max-age`-ə güvənmək, sonra "CDN nə üçün mənim
  gözlədiyimdən fərqli davranır" sualı vermək.
- Conditional request-lər (`ETag`) üçün backend-də doğru `ETag`
  generasiyası olmadığı halda, hər sorğunun "dəyişib" sayılıb tam body
  ilə cavablandırılması — validation-un faydasını sıfıra endirir.

### 6.5 Trade-off / dizayn sualları

1. Aqressiv cache (`immutable`, uzun `max-age`) ilə həmişə fresh məzmun
   arasında seçim — bu seçimi content tipi (statik asset vs API cavabı)
   necə müəyyənləşdirir?
2. `stale-while-revalidate` istifadə etmək, "bir az köhnə məzmun görmək
   riski"ni qəbul etməkdir — bu risk hansı domenlərdə (məs. maliyyə
   qiymətləri) qəbuledilməzdir?
3. ETag-based validation ilə `Last-Modified`-based validation arasında
   seçim — hansı halda ETag daha dəqiqdir (məs. eyni saniyədə çox dəfə
   dəyişən resurs)?

### 6.6 Mock müsahibə sual-cavabları

**S: `no-cache` və `no-store` fərqini izah et.**
C: `no-cache` cache-in response-u saxlamasına icazə verir, amma hər
istifadədən əvvəl origin-lə revalidasiya (conditional request) məcbur
edir — sıfır transfer olmasa da, ən azı bir round-trip yenə var (304
qayıdırsa body yoxdur). `no-store` cache-ləməni tamamilə qadağan edir —
cavab heç yerdə (disk, memory) saxlanmır, hər sorğu tam yeni cavab tələb
edir. Sensitiv məlumat (ödəniş, şəxsi data) üçün `no-store` istifadə
olunur.

**S: `s-maxage` niyə var, `max-age` kifayət deyilmi?**
C: `max-age` bütün cache tiplərinə (browser + CDN) tətbiq olunur.
Bəzən CDN-i daha uzun (backend yükünü azaltmaq üçün) və ya daha qısa
(daha tez fresh məzmun) saxlamaq istəyirik, browser-dən fərqli olaraq.
`s-maxage` yalnız shared cache-lərə tətbiq olunub `max-age`-i override
edir, bu iki qatı müstəqil idarə etməyə imkan verir.

**S: `Vary: Accept-Encoding` cache-in düzgün işləməsinə necə təsir edir?**
C: Eyni URL fərqli `Content-Encoding` (gzip, brotli, sıxılmamış) ilə
qayıda bilər, çünki client-in `Accept-Encoding` header-i fərqli ola bilər.
`Vary: Accept-Encoding` cache-ə deyir ki, bu URL üçün **fərqli
Accept-Encoding dəyərlərinə görə ayrı-ayrı cache entry-ləri saxla** —
əks halda bir client-ə brotli sıxılmış cavab, brotli dəstəkləməyən başqa
client-ə də səhvən göndərilə bilər.

### 6.7 Mənbələr

- [MDN — Cache-Control header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control)
- [web.dev — Keeping things fresh with stale-while-revalidate](https://web.dev/articles/stale-while-revalidate)

---

## 7. HTTP/2

### 7.1 Niyə vacib

HTTP/2, frontend-in **bundling strategiyasını köklü şəkildə dəyişən**
protokoldur. HTTP/1.1 dövründə "az sayda böyük fayl daha yaxşıdır" qaydası
(hər paralel bağlantı məhdud olduğu üçün) HTTP/2-də artıq mütləq doğru
deyil, çünki HTTP/2 bir bağlantı üzərində çoxlu axını **paralel** apara
bilir. Bu fərqi bilməyən developer 2015-ci ilin bundling məsləhətlərini
2026-cı ildə də tətbiq etməyə davam edir — bəzən performansa zərər verərək.

### 7.2 Konsepsiyalar — ilk prinsiplərdən

HTTP/1.1-də hər bir sorğu-cavab cütü öz bağlantısını (və ya "keep-alive"
bağlantı növbəsini) tələb edir, browser-lər domain-ə adətən 6 paralel
bağlantı limiti qoyur — bu "head-of-line blocking at the application
level" yaradır: 6-dan çox faylı eyni vaxtda yükləmək istəsən, qalanları
növbədə gözləyir.

**HTTP/2 bunu multiplexing ilə həll edir**: bir TCP bağlantı üzərində
çoxlu "stream" paralel aparıla bilər, hər stream öz sorğu/cavabını
daşıyır, amma hamısı eyni bağlantını bölüşür. Bundan əlavə **HPACK** header
sıxılması sorğu başlıqlarının təkrarlanan hissəsini (cookie-lər, user-agent)
hər sorğuda yenidən göndərməkdən qurtarır.

Bu, praktikada nə deyir: HTTP/1.1-də faydalı olan "bir çox kiçik faylı
bir böyük fayla birləştir" (concatenation, sprite sheet-lər) HTTP/2-də
artıq **məcburi deyil** — çoxlu kiçik fayl paralel yüklənə bilər, hər
biri öz cache TTL-i ilə müstəqil idarə oluna bilər (bir böyük bundle-un
bir hərfi dəyişəndə hamısını yenidən yükləmək məcburiyyəti yoxdur).

**Server Push** — HTTP/2-nin server-in client istəmədən resurs
"göndərə bilməsi" xüsusiyyəti idi, amma praktikada performans faydası
az idi (HTTP/2 sitələrinin təxminən 1.25%-i istifadə edirdi) və
Chrome bunu **106-cı versiyada (2022-ci ilin sentyabrında) default
olaraq sıfırladı**. Bu, "HTTP/2 Server Push ilə critical CSS-i push
edərik" kimi köhnə məsləhətlərin artıq etibarsız olduğunu göstərir.

### 7.3 Praktiki nümunə

```nginx
server {
    listen 443 ssl;
    http2 on;   # NGINX 1.25.1+ sintaksisi (köhnə: "listen 443 ssl http2;")

    # HTTP/2 aktiv olanda çoxlu kiçik chunk problem deyil —
    # code splitting-i bundle ölçüsünə görə deyil, route/feature-ə
    # görə aparmaq daha effektivdir
    location / {
        try_files $uri /index.html;
    }
}
```

Bundling strategiyası fərqi (konseptual):

```js
// HTTP/1.1 dövrü düşüncəsi: hər şeyi bir bundle-a yığ
// (paralel bağlantı sayı məhdud olduğu üçün)

// HTTP/2/3 dövrü düşüncəsi: route-based code splitting
// (hər chunk müstəqil paralel yüklənir, müstəqil cache-lənir)
const Dashboard = lazy(() => import("./routes/Dashboard"));
const Settings = lazy(() => import("./routes/Settings"));
```

**Edge-case-lər:**

- HTTP/2 üstünlükləri yalnız **TLS üzərindən** əksər browser-lərdə işə
  düşür (browser-lər HTTP/2-ni əməli olaraq yalnız HTTPS ilə dəstəkləyir,
  h2c/cleartext demək olar istifadə olunmur). Yəni HTTP/2-dən faydalanmaq
  TLS konfiqurasiyasını (aşağıdaki bölmə) düzgün qurmadan mümkün deyil.
- Çox kiçik chunk-lara bölmək də hədsiz aparıla bilər — hər stream açmaq
  sıfır dəyər deyil (HPACK state, stream idarəçiliyi overhead-i), ifrat
  micro-splitting nəticəni yaxşılaşdırmaya bilər. "Nə qədər çox
  splitting, bir o qədər yaxşı" sadələşdirilməsi doğru deyil.
- Köhnə NGINX versiyalarında `listen 443 ssl http2;` sintaksisi, yeni
  versiyalarda (1.25.1+) ayrıca `http2 on;` direktivi — konfiqurasiyanı
  NGINX versiyasına uyğunlaşdırmaq lazımdır.

### 7.4 Senior-level tələlər

- Hələ də "bütün JS-i bir bundle-a yığmaq performans üçün yaxşıdır" fikrini
  HTTP/2 mühitində tətbiq etmək — əslində route-based splitting adətən
  daha yaxşı nəticə verir (ilkin yüklənən JS ölçüsü azalır, HTTP/2
  paralelliyi bunu dəstəkləyir).
- HTTP/2 Server Push-a əsaslanan köhnə "performans hack"-lərini yeni
  layihədə tətbiq etməyə çalışmaq — artıq əksər browser-də işləmir.
- HTTP/2-nin özünün TLS-i əvəz etdiyini düşünmək — HTTP/2 TLS-dən
  müstəqil bir protokoldur, sadəcə browser-lər praktikada TLS-siz
  dəstəkləmir.

### 7.5 Trade-off / dizayn sualları

1. Route-based code splitting ilə "hər component öz chunk-ı" səviyyəsində
   micro-splitting arasında hədd haradadır — nə qədər splitting artıq
   fayda vermir, əksinə overhead yaradır?
2. HTTP/2 multiplexing sayəsində sprite sheet/icon font kimi "bir HTTP
   sorğusuna sıxma" texnikaları hələ də dəyərlidirmi, yoxsa ayrıca SVG
   fayllara keçmək daha doğrudur?
3. Bir domain-in bütün resursları HTTP/2 üzərindən bir bağlantı ilə
   gedirsə, üçüncü tərəf domain-lərdən (fonts, analytics) gələn resurslar
   üçün bu üstünlük tətbiq olunmur — bu, üçüncü tərəf asılılıqlarını
   minimuma endirmək qərarına necə təsir edir?

### 7.6 Mock müsahibə sual-cavabları

**S: HTTP/2 multiplexing nə deməkdir, HTTP/1.1-dən fərqi nədir?**
C: HTTP/1.1-də hər sorğu öz bağlantısını (və ya bağlantı növbəsini)
tələb edir, browser domain-ə paralel bağlantı sayını məhdudlaşdırır.
HTTP/2-də bir TCP bağlantı üzərində çoxlu müstəqil stream paralel
aparılır — sorğular bir-birini bloklamır, hamısı eyni bağlantını
bölüşür. Bu, HTTP/1.1-in "6 paralel bağlantı" məhdudiyyətini aradan
qaldırır.

**S: HTTP/2 Server Push niyə praktikada tərk edildi?**
C: Nəzəri fayda (server-in client istəmədən lazım olacaq resursu əvvəlcədən
göndərməsi) real dünyada çətin dəqiq idarə olunurdu — server hansı
resursun artıq browser cache-də olduğunu bilmirdi, nəticədə tez-tez
lazımsız təkrar göndərmə (bandwidth itkisi) yaranırdı. Real istifadə çox
aşağı idi, Chrome 2022-ci ildə (v106) default deaktiv etdi.

**S: HTTP/2-dən faydalanmaq üçün frontend bundling strategiyasını necə
dəyişdirərsiniz?**
C: Bir monolit bundle əvəzinə route/feature-based code splitting tətbiq
edərəm — hər chunk paralel yüklənə, müstəqil cache-lənə (bir hissə
dəyişəndə hamısını yenidən yükləmə məcburiyyəti olmadan) bilər. Amma
ifrat micro-splitting-dən çəkinərəm, çünki hər stream-in özünün overhead-i
var.

### 7.7 Mənbələr

- [HTTP/3 explained — Comparison with HTTP/2](https://http3-explained.haxx.se/en/h3/h3-h2)
- [Chrome for Developers — Removing HTTP/2 Server Push from Chrome](https://developer.chrome.com/blog/removing-push)
- [NGINX ngx_http_v2_module — http2 direktivi](https://nginx.org/en/docs/http/ngx_http_v2_module.html) *(direktiv adı, ümumi NGINX modul sənədləşdirmə konvensiyasına uyğun; konkret versiya nömrəsi üçün rəsmi changelog yoxlanmalıdır)*

---

## 8. HTTP/3

### 8.1 Niyə vacib

HTTP/3-ün frontend-ə təsiri əsasən **mobil və zəif şəbəkə** ssenarilərində
görünür — bu, "niyə bizim performans metrikaları desktop-da əla, mobil
4G-də zəifdir" sualının bir hissəsinə cavab verə bilər. Amma senior
səviyyədə vacib olan HTTP/3-ün **nə vaxt** fərq yaratdığını bilməkdir —
bu, hər layihədə eyni dərəcədə böyük fayda vermir, ötürücülüyün "situational"
(şəraitə bağlı) olduğunu bilmək lazımdır.

### 8.2 Konsepsiyalar — ilk prinsiplərdən

HTTP/2 TCP üzərində işləyir, HTTP/3 isə **QUIC** üzərində — QUIC UDP
əsaslı, öz multiplexing-ini **transport qatının özündə** aparan bir
protokoldur. Bu fərq nəyə görə əhəmiyyətlidir: HTTP/2-də multiplexing
yalnız HTTP qatında görünür, TCP-nin özü stream-lərin ayrı-ayrı olduğunu
bilmir — TCP bir paket itəndə, **bütün** stream-lər üçün ardıcıllığı
gözləyir (TCP-level head-of-line blocking), baxmayaraq ki itki yalnız bir
stream-ə aiddir. QUIC-də hər stream öz sırasını müstəqil idarə edir —
bir stream-də paket itsə, digər stream-lər bloklanmır.

Digər fərq: HTTP/3 **şifrələmədən mövcud deyil** — QUIC TLS 1.3-ü
protokolun özünə inteqrasiya edib, "əvvəl TCP handshake, sonra ayrıca TLS
handshake" ardıcıllığını sıxışdırır, nəticədə bağlantı qurulması daha
sürətli olur (0-RTT ilə əvvəlki bağlantıya əsaslanaraq ilk paketdə data
göndərmək mümkündür). HTTP/2 isə TLS-siz (nəzəri olaraq) mövcud ola bilər,
sadəcə browser-lər praktikada tələb edir.

QUIC həmçinin **connection migration**-ı dəstəkləyir — client Wi-Fi-dan
mobil şəbəkəyə keçəndə (IP dəyişəndə) bağlantı kəsilmir, çünki QUIC
bağlantını IP+port cütü ilə deyil, connection ID ilə izləyir.

**Vacib qeyd (situational fayda)**: performans qazancı hər yerdə eyni
deyil — ən böyük fərq yüksək-latency, itkili (lossy) mobil şəbəkələrdə
və geri qayıdan ziyarətçilərdə görünür. Sabit, aşağı-latency masaüstü
bağlantılarda fərq az nəzərə çarpır.

### 8.3 Praktiki nümunə

```nginx
server {
    listen 443 ssl;
    listen 443 quic reuseport;   # HTTP/3 üçün UDP dinləmə

    http2 on;
    http3 on;

    # Client-ə "mən HTTP/3 dəstəkləyirəm" məlumatını ötür,
    # növbəti dəfə birbaşa QUIC-ə keçsin
    add_header Alt-Svc 'h3=":443"; ma=86400';
}
```

**Edge-case-lər:**

- HTTP/3 **UDP** üzərində işlədiyi üçün, bəzi korporativ firewall-lar/proxy-lər
  UDP-ni (xüsusən qeyri-standart portlarda) bloklayır. Browser-lər bu halda
  avtomatik olaraq HTTP/2-yə (TCP) geri qayıdır — bu **fallback** davranışı
  gözlənilən, dizayn edilmiş davranışdır, "bug" deyil, amma performans
  ölçmələrində (bəzi istifadəçilər h2-yə düşür, bəziləri h3) nəticələri
  qarışdıra bilər.
- `Alt-Svc` header-i olmadan browser server-in HTTP/3 dəstəklədiyini
  bilmir — ilk bağlantı hələ HTTP/2 üzərindən gedir, yalnız server bu
  header-i göndərdikdən sonra **növbəti** bağlantılarda client birbaşa
  QUIC cəhd edə bilər (bu, HTTP/3-ün "kəşf edilməli" olduğunu göstərir,
  default deyil).
- HTTP/3-ün prioritization sxemi HTTP/2-dəkindən fərqlidir — əsl HTTP/3
  spesifikasiyası prioritization-u özündə saxlamayıb, ayrıca, hər iki
  protokola tətbiq oluna bilən sadə bir sxemə keçib. Server/CDN
  konfiqurasiyasında bu fərqi nəzərə almaq lazımdır (köhnə HTTP/2-yə
  spesifik prioritization tuning-i HTTP/3-də birbaşa keçmir).

### 8.4 Senior-level tələlər

- HTTP/3-ün hər layihədə "avtomatik böyük performans qazancı" verəcəyini
  güvənmək — masaüstü/sabit şəbəkədə fərq praktikada kiçikdir, marketinq
  gözləntisi ilə real ölçmə fərqli ola bilər.
- QUIC-in UDP olduğunu unudub, korporativ mühitlərdə istifadəçilərin
  faktiki necə bağlandığını (h2 fallback) ölçmədən "hamı HTTP/3
  istifadə edir" fərz etmək.
- `Alt-Svc` konfiqurasiyasını unutmaq və HTTP/3-ün "avtomatik aktivləşəcəyini"
  gözləmək.

### 8.5 Trade-off / dizayn sualları

1. HTTP/3-ə keçid CDN provayderin üzərindən (onlar artıq dəstəkləyir) asan
   olsa da, öz origin server-inizdə (NGINX/QUIC) tətbiq etmək əlavə
   operativ mürəkkəblik yaradır — bu mürəkkəbliyi nə vaxt üstələnməyə
   dəyər?
2. Performans testlərini yalnız yaxşı şəbəkə şəraitində aparıb HTTP/3-ün
   faydasını "görməmək" — test strategiyasını real istifadəçi şəbəkə
   profilinə (mobil, yüksək latency) uyğunlaşdırmaq nə üçün vacibdir?
3. Bir CDN provayderi HTTP/3-ü default aktivləşdirirsə, amma sizin analitika
   alətiniz bunu ayrıca izləmirsə, performans metrikalarınızdaki
   yaxşılaşmanın həqiqətən HTTP/3-dən, yoxsa başqa dəyişiklikdən
   gəldiyini necə ayırd edərsiniz?

### 8.6 Mock müsahibə sual-cavabları

**S: HTTP/3-ün HTTP/2-dən əsas fərqi nədir?**
C: Transport qatı — HTTP/2 TCP üzərində, HTTP/3 QUIC (UDP əsaslı) üzərində
işləyir. Bu, TCP-səviyyəli head-of-line blocking-i aradan qaldırır (bir
stream-də paket itkisi digərlərini bloklamır), TLS-i protokola inteqrasiya
edərək bağlantı qurulmasını sürətləndirir, və connection migration-a
(şəbəkə dəyişəndə bağlantının kəsilməməsi) imkan verir.

**S: HTTP/3-dən hər layihə eyni dərəcədə fayda görür?**
C: Xeyr. Fayda situational-dır — yüksək latency, itkili (mobil) şəbəkələrdə
və returning visitor-larda ən çox nəzərə çarpır. Sabit, aşağı-latency
masaüstü bağlantılarında fərq praktikada azdır. Ölçmələr real istifadəçi
şəbəkə profilinə görə interpretasiya olunmalıdır.

**S: Korporativ şəbəkədə UDP bloklanıbsa, HTTP/3 istifadəçiyə necə təsir
edir?**
C: Browser QUIC handshake-i uğursuz olduqda avtomatik HTTP/2-yə (TCP)
geri qayıdır — istifadəçi funksional fasilə görmür, sadəcə HTTP/3-ün
üstünlüklərindən (0-RTT, connection migration) faydalanmır. Bu, dizayn
edilmiş fallback davranışdır.

### 8.7 Mənbələr

- [HTTP/3 explained — Comparison with HTTP/2](https://http3-explained.haxx.se/en/h3/h3-h2)
- HTTP/3-ün performans qazancının "situational" olduğu iddiası ikinci
  dərəcəli mənbələrdə (performans ölçmə blog-ları) təkrarlanır; bu
  hissədə konkret faiz ədədi **qəsdən verilmir**, çünki mənbələr arasında
  dəqiq rəqəm üzərində uzlaşma yoxdur — yalnız istiqamət (mobil/yüksək-latency
  şəraitdə daha çox fayda) etibarlı hesab olunub.

---

## 9. TLS

### 9.1 Niyə vacib

TLS "https://" işarəsindən ibarət deyil — frontend developer üçün TLS-in
**harada bitdiyi** (termination point) production-da baş verən mixed
content xətalarının, redirect loop-ların və cookie `Secure` atributu ilə
bağlı bug-ların kök səbəbidir. Load balancer/CDN-də TLS-in "sonlanması"
və backend-ə plain HTTP ilə davam etməsi — bu memory modeli bilinmədən
Reverse Proxy bölməsindəki `X-Forwarded-Proto` problemi anlaşılmaz qalır.

### 9.2 Konsepsiyalar — ilk prinsiplərdən

TLS handshake-in məqsədi iki tərəf arasında (client-server) **şifrələnmiş,
autentifikasiya olunmuş kanal** qurmaqdır. TLS 1.3-də (əvvəlki
versiyalardan fərqli olaraq) handshake bir round-trip-ə sıxılıb: client
"hello" mesajında artıq dəstəklədiyi key exchange parametrlərini təxmin
edərək göndərir, server bunu qəbul edərsə (adətən qəbul edir), bir
əlavə round-trip səviyyəsində şifrələmə açarları razılaşdırılır. Bu,
TLS 1.2-yə nisbətən daha az round-trip, deməli daha sürətli bağlantı
qurulması deməkdir.

**TLS termination** — TLS handshake-in harada "bitdiyini", yəni trafikin
harada deşifrə olunduğunu bildirir. Adətən bu, load balancer/reverse
proxy/CDN qatında baş verir: client → (HTTPS) → load balancer, sonra
load balancer → (plain HTTP, daxili şəbəkədə) → backend. Bunun səbəbi
performansdır — TLS handshake və şifrələmə/deşifrələmə CPU-intensivdir,
bunu bir mərkəzi nöqtədə (load balancer) etmək, hər backend instance-ın
öz sertifikatını idarə etməsindən daha praktikdir.

Buradaki **frontend-ə təsir edən nəticə**: backend HTTP sorğusunu alanda
artıq "mən HTTPS ilə deyil, HTTP ilə danışıram" düşünür — çünki load
balancer-lə backend arasındaki bağlantı əslində plain HTTP-dir. Bu,
backend-in `req.protocol`/`req.secure` kimi məlumatlara güvənərək
"secure" cookie qoyub-qoymamağı, ya da HTTPS-ə redirect edib-etməməyi
qərar verməsini korlayır — `X-Forwarded-Proto` header-i olmadan backend
yanlış qərar verir.

### 9.3 Praktiki nümunə

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate     /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;

    # TLS 1.2 minimum saxlanılır (köhnə client dəstəyi üçün);
    # yalnız TLS 1.3 tələb etmək bəzi köhnə mobil brauzerləri kəsə bilər
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;   # TLS 1.3-də client-in seçimi üstünlük tutur

    # OCSP stapling — client-in sertifikat etibarlılığını ayrıca
    # bir sorğu ilə yoxlamaq əvəzinə server bunu əvvəlcədən əlavə edir
    ssl_stapling on;
    ssl_stapling_verify on;

    location / {
        proxy_pass http://backend_upstream;
        proxy_set_header X-Forwarded-Proto $scheme;  # backend-ə "mən HTTPS-əm" de
    }
}

# HTTP → HTTPS redirect (port 80 dinləyən ayrıca server bloku)
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}
```

**Edge-case-lər:**

- `ssl_prefer_server_ciphers` TLS 1.3-də əməli əhəmiyyətini itirir, çünki
  TLS 1.3-ün cipher suite dəsti kəskin şəkildə azaldılıb və client-in
  seçimi əsas götürülür — köhnə TLS 1.2-ə uyğun konfiqurasiya
  məsləhətlərini kor-koranə TLS 1.3-ə tətbiq etmək artıq mənasızdır.
- HTTP → HTTPS redirect (`return 301`) əgər `X-Forwarded-Proto`-ya baxmadan
  yazılıbsa, backend-in özü də HTTPS-ə redirect edən məntiqə malikdirsə,
  iki qat redirect layer-i (proxy + backend) uzlaşmadıqda infinite loop-a
  səbəb ola bilər.
- Sertifikat bitmə tarixini (expiry) monitor etməmək — frontend-ə birbaşa
  aid olmasa da, sertifikat bitəndə bütün sayt browser-lərdə "təhlükəsiz
  deyil" xəbərdarlığı ilə tamamilə əlçatmaz olur, bu "frontend bug"
  kimi report olunur, əslində infrastruktur məsələsidir.

### 9.4 Senior-level tələlər

- Backend-in "secure" cookie qoyub-qoymaması qərarını `req.protocol`-a
  əsaslandırıb, `X-Forwarded-Proto`-nu unutmaq — nəticə production-da
  cookie-lərin qoyulmaması (səssiz uğursuzluq, error atmır).
- TLS termination-ın harada olduğunu bilmədən "bizim trafik həmişə
  şifrələnib" fərz etmək — load balancer-dən backend-ə olan daxili
  trafik, şəbəkə perimetri kompromis olarsa, plain-text oxuna bilər (bu,
  bəzi compliance rejimlərində, məs. PCI-DSS-də, "end-to-end encryption"
  tələbini pozur).
- Mixed content: səhifə HTTPS-dən yüklənib, amma bir resurs (şəkil, script)
  hardcoded `http://` URL-lə çağırılırsa, browser bunu bloklayır/xəbərdarlıq
  verir — bu, TLS-in özündə səhv deyil, kod daxilindəki protokol
  hardcode-lanmasının nəticəsidir.

### 9.5 Trade-off / dizayn sualları

1. TLS termination-ı load balancer-də (client → LB HTTPS, LB → backend
   HTTP) yoxsa "TLS passthrough" (LB trafiki deşifrə etmədən backend-ə
   ötürür, backend özü TLS handshake edir) — hansı halda hansı doğrudur
   (performans vs backend-lərin öz sertifikatını idarə etmə yükü)?
2. Bütün daxili (servis-to-servis) trafiki də TLS ilə şifrələmək (mTLS)
   — bunun operativ mürəkkəbliyi hansı təhlükəsizlik tələbini (zero-trust)
   əsaslandırır?
3. TLS 1.2 dəstəyini tam kəsib yalnız TLS 1.3 saxlamaq — bu qərar hansı
   istifadəçi seqmentini (köhnə cihaz/browser) potensial itirmə riski
   yaradır?

### 9.6 Mock müsahibə sual-cavabları

**S: "Secure" cookie production-da qoyulmur, local-da qoyulur. Səbəb?**
C: Çox güman TLS termination load balancer-də olur, backend plain HTTP
alır. Backend "mən HTTP-yəm" düşünüb `Secure` atributlu cookie qoymur
(çünki Secure cookie-lər spesifikasiyaya görə yalnız HTTPS bağlantıda
göndərilməlidir, backend özü buna əsaslanaraq qərar verir). Həll:
`X-Forwarded-Proto` header-ini ötürmək və backend-i (`trust proxy` kimi
tənzimləmələrlə) bunu oxumağa məcbur etmək.

**S: TLS 1.3 handshake-in TLS 1.2-dən nə üçün daha sürətli olduğunu izah
et.**
C: TLS 1.2-də client və server bir neçə round-trip-də (ClientHello →
ServerHello+Certificate → key exchange → Finished) razılaşırdı. TLS 1.3
bunu sıxaraq, client ilk mesajında artıq təxmin etdiyi key share
parametrlərini göndərir — server bunu qəbul edərsə, handshake əməli
olaraq bir round-trip-ə düşür, nəticədə bağlantı qurulma vaxtı azalır.

**S: TLS termination nədir, niyə çoxu load balancer/CDN qatında edilir?**
C: TLS handshake və şifrələmə/deşifrələmə CPU-intensiv əməliyyatlardır.
Bunu bir mərkəzi qatda (load balancer/CDN) etmək, hər backend instance-ın
öz sertifikatını, öz TLS konfiqurasiyasını idarə etməsindən daha az
operativ yük yaradır — backend-lər daxili şəbəkədə sadə HTTP ilə
işləyə bilir, bu da onların CPU-sunu tətbiq məntiqinə saxlayır.

### 9.7 Mənbələr

- [DigitalOcean Docs — How to Configure SSL Termination](https://docs.digitalocean.com/products/networking/load-balancers/how-to/ssl-termination/)
- [AWS Blog — TLS Termination for Network Load Balancers](https://aws.amazon.com/blogs/aws/new-tls-termination-for-network-load-balancers/)
- TLS 1.3 handshake-in tək round-trip-ə sıxılması geniş qəbul olunmuş,
  çoxsaylı mənbədə (bulud provayderlərinin öz sənədləşdirməsi daxil)
  təsdiqlənən fakt kimi istifadə olunub.

---

## 10. DNS

### 10.1 Niyə vacib

DNS frontend-in "ilk addımı"dır — istifadəçi domain adını yazanda, bu ad
IP-yə çevrilmədən heç bir HTTP sorğusu getmir. Senior developer üçün bu
bilik "domain migration zamanı niyə bəzi istifadəçilər hələ köhnə server-ə
düşür" (TTL propagation), "niyə subdomain-lərarası cookie paylaşımı
işləmir" (domain scope) və resource hints (`dns-prefetch`, `preconnect`)-in
performansa necə təsir etdiyini izah etmək üçün lazımdır.

### 10.2 Konsepsiyalar — ilk prinsiplərdən

DNS resolution zəncirvari bir prosesdir: browser/OS əvvəlcə öz lokal
cache-inə baxır, tapmasa **recursive resolver**-ə (adətən ISP-nin, ya da
istifadəçinin özü seçdiyi 1.1.1.1/8.8.8.8 kimi public resolver) müraciət
edir. Recursive resolver özü cache-də yoxdursa, zənciri davam etdirir:
əvvəlcə **root nameserver**-ə (bu, TLD-nin — `.com`, `.az` — hansı
nameserver-ə aid olduğunu deyir), sonra **TLD nameserver**-ə (bu, domain-in
**authoritative nameserver**-inin ünvanını deyir), sonra son olaraq
**authoritative nameserver**-ə (bu, faktiki A/CNAME record-u — domain-in
həqiqi IP-sini — qaytarır) müraciət edir.

**TTL (Time to Live)** hər DNS record-un nə qədər müddət cache-lənə
biləcəyini müəyyən edir. Bu, aralıq resolver-lər (ISP-nin resolver-i),
browser, OS səviyyəsində müstəqil cache-lənir — hər qat öz TTL-ini
saxlayır. Bu, **domain miqrasiyası/infrastruktur dəyişikliyi zamanı**
kritikdir: DNS record-u dəyişəndə, bu dəyişiklik dərhal hər yerə
"yayılmır" — TTL bitənə qədər bəzi istifadəçilər köhnə IP-yə davam edə
bilər. Yüksək TTL az DNS sorğusu (az latency) deməkdir, amma dəyişiklik
üçün yavaş propagation deməkdir — bu, klassik bir trade-off-dur.

### 10.3 Praktiki nümunə

```html
<!-- Kritik olmayan üçüncü tərəf domain — yalnız DNS lookup-u əvvəlcədən apar -->
<link rel="dns-prefetch" href="https://analytics.example.com" />

<!-- Kritik, dəqiq istifadə olunacaq domain — DNS + TCP + TLS-i əvvəlcədən qur -->
<link rel="preconnect" href="https://api.example.com" crossorigin />
```

DNS dəyişikliyi əvvəli/sonrası TTL strategiyası (deploy/migration
konteksti):

```
# Miqrasiyadan bir neçə gün əvvəl TTL-i kəskin azalt (yayılmanı sürətləndirmək üçün)
example.com.  A   300   203.0.113.10     ; TTL 300s (5 dəqiqə) — miqrasiya öncəsi

# Miqrasiya günü — yeni IP-yə keç
example.com.  A   300   203.0.113.20     ; TTL hələ aşağı, sürətli propagation

# Sabitləşəndən sonra TTL-i normala qaytar
example.com.  A   3600  203.0.113.20     ; TTL 1 saat — normal rejim
```

**Edge-case-lər:**

- `preconnect` browser-in 10 saniyə ərzində istifadə olunmayan bağlantını
  bağladığını nəzərə almadan hər üçüncü tərəf domain-ə preconnect etmək —
  bu, faktiki istifadə olunmayan bağlantılar üçün DNS+TCP+TLS resurslarını
  hədər yerə sərf edir və digər kritik resursları gecikdirə bilər
  (bandwidth contention).
- Domain apex-də (`example.com`, `www` olmadan) CNAME record-u DNS
  spesifikasiyasına görə **qadağandır** (apex-də yalnız `A`/`AAAA`/`ALIAS`
  ola bilər) — CDN-ə keçəndə "apex domain-i birbaşa CDN-ə CNAME edərəm"
  fikri texniki olaraq mümkün deyil, bunun üçün provayder-spesifik "CNAME
  flattening"/`ALIAS` record tələb olunur.
- TTL-i miqrasiyadan **əvvəl** azaltmağı unutmaq — miqrasiya günü TTL hələ
  köhnə yüksək dəyərdədirsə (məs. 1 gün), bəzi istifadəçilər köhnə server-ə
  saatlarla/günlərlə davam edə bilər, halbuki köhnə server artıq
  söndürülüb.

### 10.4 Senior-level tələlər

- Domain miqrasiyası planlaşdırarkən TTL-in "əvvəlcədən azaldılması"
  addımını unutmaq — bu, "miqrasiya bitdi, amma bəzi istifadəçilər hələ
  404/xəta alır" incident-inin klassik səbəbidir.
- `preconnect`-i hədsiz istifadə edib faktiki performans faydası əvəzinə
  zərər yaratmaq (çoxlu ilkin bağlantı, bandwidth contention).
- Apex domain-də CNAME qoymaq cəhdi (DNS spesifikasiyasına zidd) — bu
  bəzən DNS provayderi tərəfindən sakitcə rədd edilir və ya gözlənilməz
  davranışla nəticələnir.
- Subdomain-lər arası cookie paylaşımı üçün `Domain` atributunu düzgün
  təyin etməmək — hər subdomain default olaraq öz cookie "jar"-ına
  malikdir, `Domain=.example.com` açıq şəkildə göstərilmədən paylaşılmır.

### 10.5 Trade-off / dizayn sualları

1. Aşağı TTL (sürətli dəyişiklik imkanı) ilə yüksək TTL (az DNS sorğusu,
   az latency) arasında seçim — bu seçimi hansı əməliyyat riski (tez-tez
   infrastruktur dəyişikliyi ehtiyacı) müəyyənləşdirir?
2. Çoxlu üçüncü tərəf domain-dən resurs yükləyən bir səhifədə, hansı
   domain-lərə `preconnect`, hansılarına `dns-prefetch`, hansılarına heç
   nə tətbiq etməyin qərar meyarı nədir?
3. Multi-region deployment-də GeoDNS (istifadəçinin coğrafi yerinə görə
   fərqli IP qaytarmaq) istifadə etmək — bunun CDN-in öz edge routing-i
   ilə üst-üstə düşən/rəqabətə düşən tərəfləri hansılardır?

### 10.6 Mock müsahibə sual-cavabları

**S: DNS resolution zəncirini addım-addım izah et.**
C: Browser/OS əvvəlcə lokal cache-ə baxır. Tapmasa, recursive resolver-ə
müraciət edir. Resolver öz cache-i yoxdursa, root nameserver-dən başlayıb
(TLD-ni tapmaq üçün), TLD nameserver-dən (authoritative nameserver-in
ünvanını tapmaq üçün), son olaraq authoritative nameserver-dən (faktiki
IP-ni almaq üçün) məlumat toplayır. Nəticə resolver tərəfindən TTL
müddətinə cache-lənir və client-ə qaytarılır.

**S: `dns-prefetch` və `preconnect` fərqi nədir, hansını nə vaxt
istifadə edərsiniz?**
C: `dns-prefetch` yalnız DNS lookup-unu əvvəlcədən aparır (ən yüngül
optimallaşdırma). `preconnect` DNS + TCP handshake + TLS handshake-in
hamısını əvvəlcədən qurur (daha ağır, amma faktiki istifadə olunacaqsa
daha faydalı). Kritik, mütləq istifadə olunacaq az sayda (4-6) domain
üçün `preconnect`, digər, ehtiyat kimi əlavə olunan üçüncü tərəf domain-lər
üçün `dns-prefetch` istifadə edərəm.

**S: TTL-i domain miqrasiyasından əvvəl azaltmağın məqsədi nədir?**
C: TTL DNS record-un nə qədər müddət cache-lənəcəyini idarə edir. Əgər
TTL yüksəkdirsə (məs. 1 gün) və IP-ni birdən dəyişsək, aralıq resolver-lər
köhnə IP-ni hələ saatlarla/günlərlə cache-də saxlayıb istifadəçiləri ora
yönləndirə bilər. TTL-i miqrasiyadan bir neçə gün əvvəl azaltmaqla (məs.
5 dəqiqəyə), faktiki keçid günü propagation sürətli olur, sonra TTL-i
normala qaytarırıq.

### 10.7 Mənbələr

- [MDN — Using dns-prefetch](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/dns-prefetch)
- [web.dev — Establish network connections early to improve perceived page speed](https://web.dev/articles/preconnect-and-dns-prefetch)
- DNS resolution zəncirinin (recursive resolver → root → TLD →
  authoritative) təsviri Cloudflare-in Learning Center səhifələrində
  (`cloudflare.com/learning/dns/what-is-dns/`,
  `what-is-recursive-dns/`) sənədləşdirilib; bu araşdırma zamanı həmin
  səhifələrə birbaşa WebFetch girişi bot-qorunması (403) səbəbindən
  mümkün olmadı, məzmun axtarış nəticələrində görünən sitatlar əsasında,
  DNS-in ümumi işləmə mexanizmini təsvir edən çoxsaylı digər mənbə ilə
  (RFC 1034/1035-ə əsaslanan ümumi texniki konsensus) çarpaz
  yoxlanılaraq istifadə olunub.

---

## 11. Compression: Brotli, Gzip

### 11.1 Niyə vacib

Compression, bundle ölçüsünü kiçiltmə səylərinin (tree shaking, code
splitting) sonuncu, amma çox vaxt ən az diqqət verilən qatıdır — düzgün
compression konfiqurasiyası olmadan minified/tree-shaken bundle belə şəbəkə
üzərindən lazımsız böyük gedir. Bu, TTFB və LCP-yə birbaşa təsir edən,
amma bir dəfə düzgün qurulduqdan sonra "unudulan" infrastruktur qərarıdır.

### 11.2 Konsepsiyalar — ilk prinsiplərdən

**Gzip** (LZ77 + Huffman coding əsaslı, 32-bit CRC ilə) uzun müddətdir
sənaye standardıdır, demək olar bütün browser/server tərəfindən dəstəklənir.
**Brotli** daha yeni bir alqoritmdir (RFC 7932), ümumiyyətlə **daha yaxşı
sıxma nisbəti** verir, xüsusən mətn-əsaslı content-də (HTML, CSS, JS, JSON)
— amma sıxma prosesinin özü daha çox CPU vaxtı tələb edir.

Compression browser ilə server arasında **content negotiation** vasitəsilə
razılaşdırılır: browser `Accept-Encoding: br, gzip` header-i ilə hansı
alqoritmləri, hansı üstünlük sırası ilə dəstəklədiyini bildirir, server
bunlardan birini seçib sıxılmış cavabı `Content-Encoding: br` (və ya
`gzip`) header-i ilə qaytarır. Bu seçimin **cache-lə** kəsişdiyi yer
kritikdir: server `Vary: Accept-Encoding` header-i əlavə etməzsə, aralıq
cache (CDN) bir client-in aldığı sıxılmış variantı, fərqli `Accept-Encoding`
göndərən başqa client-ə səhvən verə bilər.

Vacib prinsip: **artıq sıxılmış format-ları (JPEG, PNG, WebP, video, artıq
gzip-lənmiş fayl) yenidən sıxmaq faydasızdır, bəzən zərərlidir** — sıxma
alqoritmi öz overhead-ini (dictionary/header) əlavə edir, əgər input artıq
sıx isə, nəticə orijinaldan **böyük** ola bilər.

### 11.3 Praktiki nümunə

```nginx
http {
    # Gzip — bütün müasir browser dəstəkləyir, aşağı CPU cost
    gzip on;
    gzip_min_length 1024;     # NGINX default-u 20 bayt, çox aşağıdır — praktikada
                               # kiçik faylları sıxmağın faydası yoxdur (overhead)
    gzip_comp_level 6;        # 1-9 arası; 6 CPU/sıxma nisbəti üçün balanslı defolt
    gzip_types
        text/plain text/css application/json application/javascript
        text/javascript text/xml application/xml image/svg+xml;
    gzip_proxied no-cache no-store private expired auth;
    gzip_vary on;

    # Brotli — ayrıca modul (ngx_brotli) tələb edir, stock NGINX-də yoxdur
    brotli on;
    brotli_comp_level 5;      # dinamik content üçün aşağı səviyyə (CPU qənaəti);
                               # statik pre-compressed fayllar üçün 11 (maksimum)
                               # istifadə olunur, çünki sıxma bir dəfə build zamanı olur
    brotli_types
        text/plain text/css application/json application/javascript
        text/javascript text/xml application/xml image/svg+xml;
}
```

Build-time pre-compression (CDN/statik asset-lər üçün ən effektiv
yanaşma — runtime CPU sərf etmədən maksimum sıxma):

```bash
# CI/build addımı: hər statik asset üçün əvvəlcədən .br və .gz yarat
find dist -type f \( -name "*.js" -o -name "*.css" -o -name "*.svg" \) \
  -exec brotli --best --keep {} \; \
  -exec gzip --best --keep {} \;
```

```nginx
# NGINX-ə əvvəlcədən sıxılmış faylı runtime sıxmadan birbaşa serve etdirmək
location ~* \.(js|css|svg)$ {
    gzip_static on;    # .gz varsa onu ver, runtime sıxma
    brotli_static on;  # .br varsa onu ver (ngx_brotli modulunda mövcuddur)
}
```

**Edge-case-lər:**

- `brotli_comp_level 11` (maksimum) dinamik, hər sorğuda yenidən
  generasiya olunan content-də istifadə edilərsə, hər sorğu üçün
  əhəmiyyətli CPU vaxtı sərf olunur — bu, yüksək trafikli API-larda
  latency artımına səbəb olar. **Statik**, build zamanı bir dəfə sıxılan
  asset-lər üçünsə maksimum səviyyə tamamilə məntiqlidir (CPU cost
  build zamanı, deploy zamanı ödənilir, runtime-da sıfırdır).
- `gzip_static`/`brotli_static` istifadə edərkən, `.gz`/`.br` fayllar
  build pipeline-ında **avtomatik** generasiya olunmalıdır — əl ilə
  unudularsa, NGINX sadəcə sıxılmamış original-ı verir (səhv atmır),
  bu "compression işləmir" bug-unu sakitcə maskalayır.
- Şəkil formatlarını (`image/jpeg`, `image/png`) `gzip_types`/`brotli_types`
  siyahısına əlavə etmək — bu formatlar artıq öz daxili sıxmasına
  malikdir, əlavə compression cəhdi faydasız CPU sərfiyyatıdır, bəzən
  fayl ölçüsünü hətta böyüdür.

### 11.4 Senior-level tələlər

- Brotli-ni dinamik API response-larda maksimum səviyyədə (11) işlətmək —
  latency-ni yaxşılaşdırmaq əvəzinə pisləşdirir (CPU-bound sıxma vaxtı
  şəbəkə transfer qənaətini üstələyir).
- `gzip_min_length`-i default (20 bayt) səviyyəsində saxlamaq — çox kiçik
  response-ları sıxmağa çalışmaq, sıxma overhead-i faydadan çox olduğu
  üçün, nəticəni yaxşılaşdırmır.
- Brotli modulun stock NGINX-də olmadığını bilmədən `brotli on;` yazıb
  "compression işləmir" report etmək, əslində modul heç yüklənməyib.
- Pre-compressed statik fayl strategiyasını build pipeline-a inteqrasiya
  etməmək, yalnız runtime dinamik sıxmaya güvənmək — hər dəyişməyən
  statik fayl hər sorğuda təkrar-təkrar sıxılır (CPU hədər yerə sərf
  olunur, halbuki nəticə həmişə eynidir).

### 11.5 Trade-off / dizayn sualları

1. Runtime dinamik compression ilə build-time pre-compression arasında
   seçim — hansı content tipi (statik asset vs dinamik API cavabı) hansı
   yanaşmaya uyğundur?
2. Brotli-ni bütün trafik üçün defolt seçmək (gzip-i tamamilə tərk etmək)
   — bu, hansı köhnə client-ləri (Brotli-ni dəstəkləməyən) risk altına
   qoyur, bu risk hazırkı istifadəçi bazasında qəbul edilə bilərmi?
3. CDN-in özü compression-u idarə edirsə (origin-dən sıxılmamış alıb,
   edge-də sıxıb client-ə verirsə), origin server-də (NGINX) əlavə
   compression konfiqurasiyası artıq iş yükü, yoxsa lazımsız
   mürəkkəblikdir?

### 11.6 Mock müsahibə sual-cavabları

**S: Brotli gzip-dən nə üçün daha yaxşı sıxma verir, amma hər yerdə
default seçilmir?**
C: Brotli daha müasir alqoritmdir və xüsusən mətn-əsaslı content-də daha
yüksək sıxma nisbəti verir, amma sıxma prosesi özü daha çox CPU vaxtı
tələb edir. Dinamik, hər sorğuda yenidən generasiya olunan content üçün
bu CPU cost-u problemli ola bilər — buna görə çox vaxt gzip dinamik
content üçün, brotli isə (yüksək sıxma səviyyəsində, build-time
pre-compressed) statik asset-lər üçün seçilir.

**S: `Vary: Accept-Encoding` olmadan nə səhv gedə bilər?**
C: CDN/proxy kimi aralıq cache-lər eyni URL-in fərqli `Content-Encoding`
ilə (brotli, gzip, sıxılmamış) versiyalarını ayırd edə bilmir — bir
client-in aldığı sıxılmış cavab, fərqli `Accept-Encoding` göndərən başqa
client-ə (məsələn, brotli dəstəkləməyən köhnə browser-ə) səhvən
göndərilə bilər, bu da o client-in cavabı deşifrə edə bilməməsi ilə
nəticələnər.

**S: Niyə şəkil fayllarını (JPEG/PNG) gzip/brotli ilə sıxmırıq?**
C: Bu formatlar öz daxili sıxma alqoritmlərinə (DCT-based, ya da
PNG-nin özünün DEFLATE-i) malikdir — artıq sıx olan datanı yenidən
ümumi-məqsədli sıxma alqoritmi ilə sıxmağa çalışmaq adətən heç bir
qazanc vermir, çünki entropiya artıq aşağıdır, üstəlik sıxma
alqoritminin öz overhead-i (dictionary, header) nəticəni bəzən
böyüdə bilər.

### 11.7 Mənbələr

- [MDN — Compression in HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Compression)
- [MDN — Content-Encoding header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Encoding)
- [NGINX Docs — Compression and Decompression](https://docs.nginx.com/nginx/admin-guide/web-server/compression/)
- [NGINX Docs — Brotli Module](https://docs.nginx.com/nginx/admin-guide/dynamic-modules/brotli/)
- [MDN — Brotli compression (Glossary)](https://developer.mozilla.org/en-US/docs/Glossary/Brotli_compression)

---

## Ümumi xülasə — bu hissədən sonra nə bilməlisən

Bu 11 alt-mövzu ayrı-ayrı "alətlər" kimi görünsə də, real production
axınında bir-birinə bağlıdır: **DNS** istifadəçini **CDN**-ə,
CDN **cache**-lənməmiş sorğunu **load balancer**-ə, load balancer
**reverse proxy** (bəzən eyni qatda) vasitəsilə backend-ə yönləndirir;
bütün bu yol boyu **TLS** trafiki qoruyur (harada "termination" olduğu
kritikdir), **HTTP/2/3** transport səviyyəsində performansı təyin edir,
**compression** hər qatda transfer olunan bayt sayını azaldır, və
**Docker/NGINX** bu zəncirin sonunda (ya da əvvəlində, edge-də) tətbiqin
özünü işə salan konteyner mühitidir. Bir SPA deploy-unun uğurlu olması
üçün bu zəncirin **hər halqası** düzgün konfiqurasiya olunmalıdır — bir
halqadaki səhv (məs. `X-Forwarded-Proto` unudulması) digər hallarda
mükəmməl işləyən kodu production-da sındıra bilər.
