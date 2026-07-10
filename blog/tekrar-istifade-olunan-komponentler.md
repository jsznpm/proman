# Bir Komponent Hər Şeyi Etməli Deyil: Təkrar İstifadə Oluna Bilən Komponentlər Necə Qurulur?

Tətbiq böyüyəndə çox vaxt bir feature üçün bir komponent yazırıq — bütün state, bütün JSX, bütün event handler-lər eyni yerdə. Əvvəlcə rahat görünür, amma vaxt keçdikcə həmin komponent şişir, oxunmaz olur, başqa yerdə istifadə edə bilmirsən. Bu yazıda belə bir **monolit komponenti** addım-addım necə kiçik, təkrar istifadə oluna bilən parçalara böldüyümüzü göstərəcəyik — və yol boyu **render props** kimi vacib bir texnikanı da öyrənəcəyik.

## HTML elementləri: utility yoxsa feature?

Əvvəlcə sadə bir müşahidə ilə başlayaq. HTML elementlərinin bir qismi **feature-yönümlüdür**, bir qismi isə **utility-yönümlüdür** (yəni ümumi məqsədli).

`<section>` elementinə bax — bu, generic bir konteynerdir, demək olar hər yerdə istifadə edilə bilər, amma əsas rolu feature-in strukturunu (xarici qabığını və daxili bölmələrini) qurmaqdır.

`<p>`, `<span>`, `<button>` isə fərqlidir — bunlar hər yerdə eyni məqsədlə işlədilir: `<button>` həmişə klikləmək üçündür, kontekstdən asılı olmayaraq. Bu, feature-dən daha aşağı, daha universal bir səviyyədir.

React komponentlərində də eyni fərq var, sadəcə daha mürəkkəbdir — çünki HTML statik markup-dırsa, React komponenti markup-u **data** ilə birləşdirir. Sual budur: necə edək ki, həm feature-ə xas, həm də hər yerdə işlənə bilən komponentlər düzgün ayrılsın?

## Monolit komponentin problemi

Fərz et ki, bir feature üçün cəmi **bir** komponent yazmaq mümkündür — heç bir alt-komponentə ehtiyac yoxdur. İlk baxışda bu, işi asanlaşdırır kimi görünür: az komponent, az kommunikasiya yolu.

Amma praktikada bu, bir neçə səbəbdən işləmir:

- **Komanda işi çətinləşir** — versiya nəzarəti, merge conflict-lər, paralel inkişaf bir nəhəng fayl üzərində əziyyətli olur.
- **Refaktor getdikcə çətinləşir** — komponent böyüdükcə onu sonradan kiçik parçalara bölmək də çətinləşir.
- **Feature-lər üst-üstə düşür** — tətbiqdə tam unikal feature-lər az olur, oxşar hissələr təkrarlanır.
- **State idarəsi mürəkkəbləşir** — bir feature-in state-i digərinə təsir edəndə, hər şey bir komponentin içindəsə, bunu izləmək çox çətinləşir.

Bunu ən yaxşı başa düşmək üçün əvvəlcə monolit bir komponent yazaq, sonra onu addım-addım refaktor edək.

## Monolit komponent: məqalə siyahısı

Nümunə feature-imiz sadədir: istifadəçi məqalə əlavə edə bilir, siyahıdakı məqalənin xülasəsini aça/bağlaya bilir və məqaləni silə bilir.

JSX belə görünür:

```jsx
<section>
  <header>
    <h1>Articles</h1>
    <input placeholder="Title" value={title} onChange={onChangeTitle} />
    <input
      placeholder="Summary"
      value={summary}
      onChange={onChangeSummary}
    />
    <button onClick={onClickAdd}>Add</button>
  </header>
  <article>
    <ul>
      {articles.map((i) => (
        <li key={i.id}>
          <a
            href={`#${i.id}`}
            title="Toggle Summary"
            onClick={() => onClickToggle(i.id)}
          >
            {i.title}
          </a>
          &nbsp;
          <button
            title="Remove"
            onClick={() => onClickRemove(i.id)}
          >
            &#10007;
          </button>
          <p style={{ display: i.display }}>{i.summary}</p>
        </li>
      ))}
    </ul>
  </article>
</section>
```

Görürsən ki, bir yerdə həm form (başlıq və xülasə daxil etmək üçün input-lar), həm də siyahının render-i qarışıb. Bu, artıq "çox JSX bir yerdə" siqnalıdır.

İndi state-ə baxaq:

```jsx
const [articles, setArticles] = React.useState([
  { id: id.next(), title: "Article 1", summary: "Article 1 Summary", display: "none" },
  { id: id.next(), title: "Article 2", summary: "Article 2 Summary", display: "none" },
]);
const [title, setTitle] = React.useState("");
const [summary, setSummary] = React.useState("");
```

`articles` array-dir, hər elementdə `title`, `summary`, `display` sahələri və unikal `id` var. `id` isə belə yaradılır:

```js
const id = (function* () {
  let i = 1;
  while (true) {
    yield i;
    i += 1;
  }
})();
```

Bura diqqət et: bu, çağırılıb dərhal icra edilən bir **generator function**-dır. `id.next()` çağıranda, birinci dəfə 1, ikinci dəfə 2 qaytarır — sonsuza qədər. Yəni hər yeni məqaləyə unikal ID vermək üçün rahat bir utility.

İndi event handler-lərə baxaq:

```jsx
const onChangeTitle = useCallback((e) => {
  setTitle(e.target.value);
}, []);

const onChangeSummary = useCallback((e) => {
  setSummary(e.target.value);
}, []);
```

Bunlar sadəcə input-a yazılan dəyəri müvafiq state-ə yazır.

```jsx
const onClickAdd = useCallback(() => {
  setArticles((state) => [
    ...state,
    { id: id.next(), title: title, summary: summary, display: "none" },
  ]);
  setTitle("");
  setSummary("");
}, [summary, title]);
```

`onClickAdd` yeni məqaləni `articles` array-inə əlavə edir. Diqqət et — `[...state, yeniElement]` ilə **yeni array** qurulur, köhnəsi birbaşa dəyişdirilmir. Bu qəsdən belədir: React-də state-i **immutable** (dəyişməz) rəftar etmək lazımdır ki, eyni state-ə toxunan başqa kod gözlənilməz nəticəylə qarşılaşmasın.

```jsx
const onClickRemove = useCallback((id) => {
  setArticles((state) => state.filter((article) => article.id !== id));
}, []);
```

`filter()` da yeni array qaytarır — verilən ID-li məqalə çıxarılıb qalanları saxlanılır.

```jsx
const onClickToggle = useCallback((id) => {
  setArticles((state) => {
    const articles = [...state];
    const index = articles.findIndex((article) => article.id === id);
    articles[index] = {
      ...articles[index],
      display: articles[index].display ? "" : "none",
    };
    return articles;
  });
}, []);
```

`onClickToggle` məqalənin xülasəsini aç/bağla edir. Burda iki immutable əməliyyat var: əvvəlcə array-in kopyası çıxarılır, sonra müvafiq index-dəki obyektin özü də spread operator (`{...articles[index]}`) ilə köçürülüb, yalnız `display` sahəsi dəyişdirilir.

Bu komponent işini görür, amma **monolitdir** — tətbiqin başqa yerində bu hissələrdən (siyahı, ya da forma) təkrar istifadə etmək istəsən, hər şeyi yenidən yazmalısan. İndi bunu düzəldək.

## Refaktor: JSX-dən başlamaq

Monolit komponenti kiçildəndə ən yaxşı başlanğıc nöqtəsi JSX-in özüdür — struktura bax və təbii sərhədləri tap.

JSX-in yuxarı hissəsi — forma elementləri — öz komponenti ola bilər:

```jsx
<header>
  <h1>Articles</h1>
  <input placeholder="Title" value={title} onChange={onChangeTitle} />
  <input placeholder="Summary" value={summary} onChange={onChangeSummary} />
  <button onClick={onClickAdd}>Add</button>
</header>
```

Aşağı hissə isə — məqalə siyahısı — başqa bir namizəddir. Onun içindəki `<li>` isə özü ayrıca komponent ola bilər. Bunları bir-bir çıxaraq.

## ArticleList komponenti

```jsx
function ArticleList({ articles, onClickToggle, onClickRemove }) {
  return (
    <ul>
      {articles.map((i) => (
        <li key={i.id}>
          <a
            href={`#${i.id}`}
            title="Toggle Summary"
            onClick={() => onClickToggle(i.id)}
          >
            {i.title}
          </a>
          &nbsp;
          <button title="Remove" onClick={() => onClickRemove(i.id)}>
            &#10007;
          </button>
          <p style={{ display: i.display }}>{i.summary}</p>
        </li>
      ))}
    </ul>
  );
}
```

Sadəcə monolit komponentin siyahı hissəsi buraya köçürülüb. Əsas feature komponenti indi belədir:

```jsx
<section>
  <header>
    <h1>Articles</h1>
    <input placeholder="Title" value={title} onChange={onChangeTitle} />
    <input placeholder="Summary" value={summary} onChange={onChangeSummary} />
    <button onClick={onClickAdd}>Add</button>
  </header>
  <ArticleList
    articles={articles}
    onClickRemove={onClickRemove}
    onClickToggle={onClickToggle}
  />
</section>
```

Siyahının render-i artıq `ArticleList`-in işidir. Ona lazım olan data və iki event handler prop kimi ötürülür.

## ArticleItem komponenti: bir addım da irəli

`ArticleList`-i də daha da kiçiltmək olar. Hər `<li>` özü ayrıca komponent ola bilər:

```jsx
function ArticleItem({ article, onClickRemove }) {
  const [isOpened, setIsOpened] = React.useState(article.display !== "none");

  const onClickToggle = React.useCallback(() => {
    setIsOpened((state) => !state);
  }, []);

  return (
    <li>
      <a href={`#${article.id}`} title="Toggle Summary" onClick={onClickToggle}>
        {article.title}
      </a>
      &nbsp;
      <button title="Remove" onClick={() => onClickRemove(article.id)}>
        &#10007;
      </button>
      <p style={{ display: isOpened ? "block" : "none" }}>{article.summary}</p>
    </li>
  );
}
```

Burda diqqət çəkən əsas dəyişiklik: aç/bağla məntiqi (`isOpened` state-i) artıq **yerli olaraq** `ArticleItem`-in daxilindədir, valideyn komponentə heç bir aidiyyəti yoxdur. Bunun iki faydası var:

1. Əsas feature komponenti (`articles` state-ini saxlayan) artıq xülasənin açıq olub-olmamasından xəbərsizdir — sadəcə data axınına baxır.
2. **Performans yaxşılaşır**: xülasəni açanda artıq bütün `articles` array-i spread operator ilə yenidən qurulmur, yalnız `ArticleItem`-in öz lokal state-i dəyişir. Nəticədə siyahı özü təkrar render olunmur, sadəcə klikləniən element yenilənir.

> Niyə event handler-ləri uşaq komponentə ötürürük? Çünki `ArticleList` state-in necə dəyişdiyi ilə maraqlanmamalıdır — onun işi sadəcə düzgün elementləri render edib, düzgün DOM node-larına düzgün callback-ləri bağlamaqdır. Bu, **container komponent** anlayışının əsasıdır — aşağıda bunu daha ətraflı görəcəyik.

`ArticleList` isə indi sadəcə map edir:

```jsx
function ArticleList({ articles, onClickRemove }) {
  return (
    <ul>
      {articles.map((article) => (
        <ArticleItem
          key={article.id}
          article={article}
          onClickRemove={onClickRemove}
        />
      ))}
    </ul>
  );
}
```

Bu, `ArticleItem`-i başqa kontekstdə (məsələn, filtrlənmiş bir siyahıda) də təkrar istifadə etməyə imkan verir.

## AddArticle komponenti

Sıra formaya (yeni məqalə əlavə etmək üçün input-lara) çatdı:

```jsx
function AddArticle({ name, title, summary, onChangeTitle, onChangeSummary, onClickAdd }) {
  return (
    <section>
      <h1>{name}</h1>
      <input placeholder="Title" value={title} onChange={onChangeTitle} />
      <input placeholder="Summary" value={summary} onChange={onChangeSummary} />
      <button onClick={onClickAdd}>Add</button>
    </section>
  );
}
```

İndi əsas feature komponenti sadəcə iki komponenti render edir:

```jsx
<section>
  <AddArticle
    name="Articles"
    title={title}
    summary={summary}
    onChangeTitle={onChangeTitle}
    onChangeSummary={onChangeSummary}
    onClickAdd={onClickAdd}
  />
  <ArticleList articles={articles} onClickRemove={onClickRemove} />
</section>
```

Diqqət et — nə qədər dəyişdi. Əsas komponent artıq **data-ya** fokuslanıb (state, handler-lər), UI-nin özünü isə başqa komponentlərə həvalə edib.

## Render props: komponentləri property kimi ötürmək

İndi başqa bir sual: bu feature-i tətbiqin fərqli yerlərində istifadə etmək istəsən, amma hər yerdə `ArticleList` ya da `AddArticle`-ın fərqli versiyasını işlətmək lazımdırsa, nə edirsən? Problem budur: bir komponenti başqası ilə **əvəz etmək**.

**Render props** bunun üçün rahat bir üsuldur. Fikir sadədir: komponentə bir property ötürürsən, dəyəri isə render ediləcək JSX-i qaytaran bir **funksiyadır**. Beləliklə, feature komponenti uşaq komponentlərini birbaşa import edib asılı olmaq yerinə, onları bayırdan property kimi qəbul edir.

Əsas komponent (`MyFeature`) belə görünür:

```jsx
<section>
  {addArticle({
    title,
    summary,
    onChangeTitle,
    onChangeSummary,
    onClickAdd,
  })}
  {articleList({ articles, onClickRemove })}
</section>
```

`addArticle()` və `articleList()` — özləri property olaraq gələn funksiyalardır, çağırılanda müvafiq JSX-i qaytarırlar. Fərq budur: bu modul artıq `AddArticle` ya `ArticleList`-i import etmir — onlardan tamamilə asılı deyil.

`MyFeature`-i render edən yerdə (məsələn, `main.js`) isə bunları render prop kimi ötürürük:

```jsx
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <MyFeature
    addArticle={({ title, summary, onChangeTitle, onChangeSummary, onClickAdd }) => (
      <AddArticle
        name="Articles"
        title={title}
        summary={summary}
        onChangeTitle={onChangeTitle}
        onChangeSummary={onChangeSummary}
        onClickAdd={onClickAdd}
      />
    )}
    articleList={({ articles, onClickRemove }) => (
      <ArticleList articles={articles} onClickRemove={onClickRemove} />
    )}
  />
);
```

Burda `addArticle` və `articleList` — `MyFeature`-dan gələn arqumentləri qəbul edən funksiyalardır (məsələn, `onClickRemove` `MyFeature`-in öz state-ini dəyişən funksiyadır). Funksiyanın **qaytardığı** JSX isə sonda faktiki render olunan şeydir.

> Render prop-un mahiyyəti budur: `MyFeature` artıq "mən mütləq `ArticleList` işlədəcəm" demir, sadəcə "mənə bir siyahı render edən funksiya ver" deyir. Hansı komponentin işlədiləcəyini isə çağıran tərəf seçir.

Bu yanaşma sənə asılılıqları hardcode etmədən feature-i fərqli kontekstlərdə fərqli komponentlərlə istifadə etmək imkanı verir — adətən bir modulun öz asılılıqlarını dəyişməkdən qat-qat asandır.

## Komponent ağacları necə qurulur?

Gəl bir addım geri çəkilib gördüklərimizə baxaq. Əvvəlcə monolit olan feature komponenti indi demək olar tamamilə **data**-ya fokuslanır: initial state-i saxlayır, state-i transform edir, lazım gələrsə şəbəkə sorğuları edir. Bu, React tətbiqində tipik **container komponent** rolu — data-nın başlanğıc nöqtəsi.

Yeni yaratdığımız komponentlər isə bu data-nın **alıcılarıdır**. Fərq budur: onlar yalnız render olunduqları anda aldıqları property-lərlə maraqlanır — yəni müəyyən zaman anındakı data "şəklinə" (snapshot) baxırlar. Onlar da öz növbəsində bu data-nı öz uşaq komponentlərinə property kimi ötürə bilər.

Ümumi nümunə belədir: data container-dən aşağı — detal komponentinə ya siyahı komponentinə, oradan da utility komponentlərinə — bir istiqamətdə axır. Adətən 3 səviyyəli komponent kompozisiyası kifayət edir.

> 3 səviyyədən çox qat əlavə etsən, arxitektura başa düşülməsi çətin olur. Bəzən 4-cü qat lazım ola bilər, amma qayda olaraq bundan çəkin.

## Feature komponentləri vs utility komponentləri

Fəsli monolit komponentlə başladıq — o, tam feature-ə fokuslanmışdı, ona görə də tətbiqin başqa yerində demək olar heç bir utility-si yox idi.

Səbəbi sadədir: yuxarı səviyyəli komponentlər tətbiqin state-i ilə məşğul olur, state-li komponentləri isə başqa kontekstdə istifadə etmək çətindir. Monolit komponenti refaktor etdikcə, yaratdığımız yeni komponentlər getdikcə state-dən uzaqlaşdı. Ümumi qayda budur:

> Komponent state-li data-dan nə qədər uzaqlaşırsa, onun utility-si bir o qədər artır — çünki property dəyərləri tətbiqin istənilən yerindən ötürülə bilər.

## Nəticə

Bu yazıda monolit bir React komponentini necə sürdürülə bilən (sustainable) bir dizayna çevirdiyimizi gördük:

- HTML elementləri kimi, komponentlər də feature-yönümlü ya utility-yönümlü ola bilər — məqsəd düzgün balansı tapmaqdır.
- Monolit komponentlər başlanğıcda rahatdır, amma komanda işini, refaktoru və performansı çətinləşdirir.
- JSX-in strukturu refaktor üçün ən yaxşı başlanğıc nöqtəsidir — təbii sərhədləri göstərir.
- Container komponent yalnız **state**-lə məşğul olmalı, kiçik komponentlər isə property-lərini istənilən yerdən ala bilməlidir ki, utility-ləri artsın.
- Render props asılılıqları property kimi ötürməyə imkan verir — bir komponenti başqası ilə əvəz etmək asanlaşır.

Qısaca: monolit komponentdə hər şey bir yerdədir və heç nə təkrar istifadə edilmir; refaktor edilmiş komponent ağacında isə hər parça öz işini görür, data bir istiqamətdə axır, və istənilən parçanı başqa yerdə, başqa kontekstdə yenidən işlədə bilərsən.
