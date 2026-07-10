# React Necə "Eşidir"? Hadisə İdarəetməsinin Pərdə Arxası

Düyməyə klik edəndə, input-a yazanda, ya da elementin üzərinə mouse aparanda React tətbiqi bunu necə "bilir"? Cavab sadə görünür — `onClick`, `onChange` kimi atributlar yazırsan və hazır. Amma bu sadəliyin arxasında maraqlı bir mexanizm dayanır: React heç də hər elementə ayrıca "qulaq" qoşmur, hadisələri xüsusi bir obyektə bükür və hətta performans naminə onları təkrar-təkrar istifadə edir. Bu yazıda React-in hadisə idarəetməsini əvvəldən sona — deklarativ sintaksisdən tutmuş, `SyntheticEvent`-in pool edilməsinə qədər — addım-addım açırıq.

## Niyə React fərqli yanaşır?

jQuery kimi ənənəvi kitabxanalarda hadisə idarəetməsi **imperativdir** — əvvəlcə lazımi DOM elementini `document.querySelector` ilə tapmalı, sonra ona `addEventListener` ilə funksiya "yapışdırmalısan". Kod hara baxsa, "bu elementə hansı funksiya bağlıdır" sualının cavabını tapmaq üçün ayrıca axtarış aparmaq lazımdır.

React isə **deklarativ** yanaşma seçib: hadisə handler-i birbaşa JSX markup-un içində, elementin özündə elan olunur.

> Deklarativ yanaşmanın faydası budur: hansı kodun nə vaxt işə düşəcəyini bilmək üçün heç yerə qaçmağa ehtiyac yoxdur — markup-un özü sənə cavabı verir.

## Sadə handler yazmaq

Ən bəsit nümunədən başlayaq — düyməyə klik olunanda konsola mesaj yazan komponent:

```jsx
function MyButton(props) {
  const clickHandler = () => {
    console.log("clicked");
  };

  return <button onClick={clickHandler}>{props.children}</button>;
}
```

Burda `clickHandler` adlı funksiya `<button>` elementinin `onClick` propertisinə ötürülüb. Markup-a baxan kimi görürsən ki, düyməyə basılanda məhz bu funksiya işə düşəcək — kodu izləmək üçün başqa fayla keçməyə ehtiyac yoxdur.

React-in dəstəklədiyi bütün hadisə adlarının tam siyahısını [rəsmi React sənədlərində](https://react.dev/reference/react-dom/components/common) tapa bilərsən.

## Bir elementə bir neçə handler

Deklarativ sintaksisin əsl gücü elementə birdən çox handler bağlamaq lazım gələndə görünür. İmperativ kodda hər əlavə handler üçün yeni `addEventListener` çağırışı yazmalısan; JSX-də isə sadəcə bir prop daha əlavə edirsən:

```jsx
function MyInput() {
  const onChange = () => {
    console.log("changed");
  };
  const onBlur = () => {
    console.log("blured");
  };

  return <input onChange={onChange} onBlur={onBlur} />;
}
```

Bu `<input>` elementinə istəsən daha beş handler də əlavə et — kod eyni dərəcədə oxunaqlı qalacaq. Elementin nə qədər handler-ə "sahib" olduğunu görmək üçün sadəcə JSX-ə baxmaq kifayətdir.

## Inline handler-lər: adı olmayan funksiyalar

Adətən handler-ə ayrıca ad verib yuxarıda təyin edirsən. Amma bəzən funksiyanı birbaşa JSX-in içində, arrow function şəklində yazmaq daha rahatdır:

```jsx
function MyButton(props) {
  return (
    <button onClick={(e) => console.log("clicked", e)}>
      {props.children}
    </button>
  );
}
```

Inline handler-in ən praktik istifadə yeri — sabit (statik) bir parametri başqa funksiyaya ötürmək lazım gələndə. Yuxarıdakı nümunədə `console.log`-a `"clicked"` sətri ötürülür. Bunun üçün ayrıca adlı funksiya, ya da **higher-order function** (funksiya qaytaran funksiya) yaza bilərdin — amma bu, hər dəfə yeni bir ad tapmaq deməkdir. Inline yazmaq bəzən sadəcə daha sürətli yoldur.

## Pərdə arxasında: React handler-i DOM-a necə bağlayır?

Budur maraqlı hissə. JSX-də elementə `onClick` yazanda, React əslində **DOM elementinin özünə heç bir event listener qoşmur.** Bunun əvəzinə funksiyanı öz daxili "xəritə"sinə (internal mapping) əlavə edir. Bütün səhifə üçün React cəmi **bir dənə** hadisə dinləyicisi saxlayır — `document` obyektinin üzərində.

Hadisə baş verəndə (məsələn, klik) o, DOM ağacı boyunca yuxarı doğru "qabarır" (bubbling) və nəhayət `document`-ə çatır. Elə burda React öz xəritəsinə baxıb "bu hadisəyə uyğun hansı komponentin handler-i var?" sualına cavab tapır və uyğun funksiyanı çağırır.

> Bunu min mərtəbəli binaya bənzət: hər mənzilin qapısında ayrıca zəngçi qoymaq əvəzinə, binanın giriş qapısında tək bir təhlükəsizlik məntəqəsi olsun. Kimsə hansısa mənzilin zənginə basanda, siqnal əvvəlcə bu mərkəzi məntəqəyə gəlir, oradan da düzgün mənzilə yönləndirilir.

Niyə React bu qədər əlavə zəhmətə girir? Səbəb əvvəlki fəsillərdə gördüyümüz eyni prinsipdir: **deklarativ UI strukturunu DOM-dan mümkün qədər ayrı saxlamaq.** DOM React üçün sadəcə "render hədəfidir" — React-in memarlığı ona son render yerindən və hadisə sistemindən asılı olmadan işləmək imkanı verir.

Praktikada bu belə işləyir:
- Yeni komponent render olunanda onun handler funksiyaları React-in daxili xəritəsinə əlavə olunur.
- Hadisə `document`-ə çatanda React onu xəritədəki uyğun handler-lə eşləşdirir və tapılsa çağırır.
- Komponent silinəndə (unmount) onun handler-i xəritədən sadəcə çıxarılır.

Bunların heç biri əslində DOM-a toxunmur — hamısı tək bir mərkəzi listener vasitəsilə idarə olunur. Bu, həm performans, həm də memarlıq baxımından faydalıdır: render hədəfi (DOM) tətbiqin məntiqindən ayrı qalır.

## SyntheticEvent: React-in öz "event zərfi"

Native `addEventListener` istifadə etsən, callback-ə brauzerin öz event obyekti ötürülür. React-də isə handler-ə ötürülən obyekt fərqlidir — ona **SyntheticEvent** deyilir, native event-in üzərinə çəkilmiş yüngül "zərf"dir (wrapper).

SyntheticEvent iki məqsədə xidmət edir:

- **Brauzerlər arası fərqləri normallaşdırır** — eyni kod Chrome-da da, Safari-də də eyni cür işləyir.
- **Component-hierarchy əsaslı propagasiya üçün lazımi məlumatı daşıyır** (aşağıda izah olunur).

SyntheticEvent-in native event-lərlə tanış olan xüsusiyyətləri var:

- `event.target` — hadisəni yaradan DOM elementi göstərir.
- `event.currentTarget` — handler-in bağlı olduğu elementi göstərir.
- `event.preventDefault()` — default davranışın (məsələn, form submit, link keçidi) qarşısını alır.
- `event.stopPropagation()` — hadisənin komponent ağacı boyunca yuxarı yayılmasını dayandırır.

### Propagasiya: DOM-a görə yox, komponent ağacına görə

Native JavaScript-də hadisə propagasiyası **DOM iyerarxiyasına** görə işləyir — hadisə valideyn DOM elementlərinə doğru qabarır. React-də isə propagasiya **komponent iyerarxiyasına** görə işləyir: uşaq komponentdə baş verən hadisəni React komponent ağacının kökündə tutur, sonra həmin hadisəni yaradan konkret komponentə qədər aşağı süzür. Bu yanaşma **event delegation** adlanır və bütün hadisə məntiqini ağacın kökündə mərkəzləşdirir.

Bunun praktik faydaları:

- Hər ayrı DOM elementinə listener qoşulmadığı üçün performans yaxşılaşır.
- Dinamik yaradılan və ya silinən elementlər üçün listener əlavə/silmə ilə əl-ələ məşğul olmağa ehtiyac qalmır — React bunu avtomatik idarə edir.

## Event pooling: performans üçün "təkrar istifadə"

Hər hadisə üçün yeni bir SyntheticEvent obyekti yaratmaq və sonra onu **garbage collector**-a (yaddaş təmizləyicisinə) tapşırmaq — özü də bahalı əməliyyatdır.

> Garbage collector işləyərkən heç bir JavaScript kodu işləyə bilmir. Ona görə yaddaş baxımından səmərəli olmaq vacibdir — tez-tez təmizlənən yaddaş o qədər az CPU vaxtı deməkdir, tətbiqin istifadəçi hadisələrinə cavab vermək üçün istifadə edə biləcəyi.

Tətbiq az sayda hadisə idarə edirsə, bu problem hiss olunmaz. Amma orta ölçülü tətbiqlərdə belə saysız-hesabsız hadisə tetiklənir — handler-lər real iş görməsə belə. React bunun qarşısını **synthetic instance pool** yaradaraq alır: hadisə tetiklənəndə pool-dan hazır bir instance götürülür, onun xüsusiyyətləri doldurulur; handler bitəndən sonra isə həmin instance yenidən pool-a qaytarılır və xüsusiyyətləri sıfırlanır.

Bunu bənzətmə ilə izah etsək: hər müştəri üçün təzə fincan istehsal etmək əvəzinə, kafedə fincanları yuyub təkrar istifadə etmək kimidir — istehsal (allocation) və zibil (garbage collection) xərcindən qaçırsan.

### Pooling-in qarşısına qoyduğu tələ: asinxron kod

Burda diqqətli olmalı olduğun bir məqam var. Handler bitən kimi SyntheticEvent instance-ı pool-a qayıdır və **bütün xüsusiyyətləri təmizlənir.** Əgər handler daxilində asinxron kod yazmısansa (`.then()`, `setTimeout` və s.) və o kod event obyektinə sonradan müraciət etməyə çalışırsa — problem yaranır:

```jsx
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

function MyButton(props) {
  function onClick(e) {
    console.log("clicked", e.currentTarget.style);
    fetchData().then(() => {
      console.log("callback", e.currentTarget.style);
    });
  }

  return <button onClick={onClick}>{props.children}</button>;
}
```

Birinci `console.log` normal işləyir, çünki handler hələ bitməyib, event obyekti hələ "canlıdır". Amma ikinci `console.log` — `fetchData().then()` daxilində — handler artıq bitdikdən **sonra**, 1 saniyə gecikmə ilə işə düşür. O ana qədər `e` pool-a qaytarılıb, xüsusiyyətləri təmizlənib. Nəticədə `e.currentTarget.style` `undefined` qaytarır və konsolda xəbərdarlıq görürsən.

> Qayda sadədir: **event obyektinə heç vaxt asinxron kod daxilində müraciət etmə.** Lazım olan dəyəri (məsələn, `e.currentTarget.style`) handler hələ işləyərkən, sinxron şəkildə ayrıca dəyişənə köçür, sonra həmin dəyişəni asinxron kodda istifadə et.

## Nəticə

React-in hadisə idarəetməsi üç qatdan ibarətdir: **JSX-də deklarativ elan** (`onClick={handler}`), **pərdə arxasında mərkəzləşdirilmiş event delegation** (tək `document` listener-i, komponent ağacına görə propagasiya) və **performans üçün SyntheticEvent pooling**. Sən yalnız birinci qatı — hansı funksiyanın hansı hadisəyə bağlı olduğunu — yazırsan; qalan ikisini React öz üzərinə götürür.

**Qısaca:** JSX-də `onClick` yazmaq sadə görünə bilər, amma arxada React sənin əvəzinə minlərlə DOM elementinə listener yapışdırmaqdan, hər hadisə üçün təzə obyekt yaratmaqdan səni xilas edir. Yeganə şərt budur — event obyektindən lazım olanı dərhal götür, asinxron dünyaya "boş fincan" aparma.
