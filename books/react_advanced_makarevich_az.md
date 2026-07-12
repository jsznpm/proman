**Fəsil 1. Yenidən Render-lərə Giriş**

Gəlin dərhal başlayaq, tamam? Və dərhal performansdan danışaq: bu günlərdə tətbiqlər qurarkən ən vacib mövzulardan biridir və nəticə etibarilə bu kitabın ümumi mövzusudur.

React və React-də performans məsələsinə gəldikdə, **re-render-ləri** və onların təsirini başa düşmək çox vacibdir. Onlar necə tətiklənir, tətbiq boyunca necə yayılır, bir komponent yenidən render olunduqda nə baş verir və niyə baş verir, və onları niyə ümumiyyətlə istifadə edirik.

Bu fəsil bu anlayışları təqdim edir, növbəti fəsillərdə isə onlar daha ətraflı şəkildə araşdırılacaq. Və bunu daha maraqlı etmək üçün, gəlin bunu bir **tədqiqat** şəklində edək. Tətbiqlərdə çox yayılmış bir performans problemini təqdim edək, onun nəticələrinə baxaq və onu çox sadə bir kompozisiya texnikası ilə necə həll etmək olar göstərək. Bu prosesdə siz öyrənəcəksiniz:

- Re-render nədir və niyə bizə lazımdır.
- Bütün re-render-lərin ilkin mənbəyi nədir.
- React re-render-ləri tətbiq boyunca necə yayır.
- Böyük re-render mifləri və props-ların öz-özünə dəyişməsinin niyə əhəmiyyət daşımadığı.
- Performansı yaxşılaşdırmaq üçün "state-i aşağıya endirmək" texnikası.
- Hook-ların re-render-lərlə bağlı niyə təhlükəli ola biləcəyi.

### Problem

Təsəvvür edin ki, siz böyük, mürəkkəb və performans baxımından həssas bir tətbiqi miras almış bir developersiz. Orada çox şey baş verir, illər ərzində bir çox insan işləyib, indi milyonlarla müştəri istifadə edir.

İşə başladığınız ilk tapşırıq olaraq sizdən tətbiqin **ən yuxarısında bir modal dialoqu açan sadə bir düymə əlavə etmək** tələb olunur.

Koda baxırsınız və dialoqun tətiklənməli olduğu yeri tapırsınız:

```tsx
const App = () => {
			// lots of code here
			return (
			<div className="layout">
			{/* button should go somewhere here */}
			<VerySlowComponent />
			<BunchOfStuff />
			<OtherStuffAlsoComplicated />
			</div>
	);
};
```

Sonra onu tətbiq edirsiniz. Tapşırıq sadə görünür. Hamımız bunu yüzlərlə dəfə etmişik:

```tsx
const App = () => {
	 // add some state
	 const [isOpen, setIsOpen] = useState(false);
	 return (
	 <div className="layout">
	 {/* add the button */}
	 <Button onClick={() => setIsOpen(true)}>
	 Open dialog
	 </Button>
	 {/* add the dialog itself */}
	 {isOpen ? (
	 <ModalDialog onClose={() => setIsOpen(false)} />
	 ) : null}
	 <VerySlowComponent />
	  <BunchOfStuff />
	 <OtherStuffAlsoComplicated />
	 </div>
	 );
};
```

Sadəcə dialoqun açıq və ya bağlı olduğunu saxlayan bir state əlavə edin. Düyməni əlavə edin ki, kliklənəndə state yenilənsin. Və dialoqun özünü əlavə edin ki, state dəyişəni true olduqda render olunsun.

Tətbiqi işə salırsınız, sınayırsınız — və hop! Bu sadə dialoqu açmaq təxminən bir saniyə çəkir!

- Nümunə
    
    nümunə https://www.advanced-react.com/examples/01/01
    

React performansı ilə işləmək təcrübəsi olan insanlar belə deməyə meylli ola bilərlər: “Ah, əlbəttə! Burada bütün tətbiqi yenidən render edirsən, sadəcə hər şeyi `React.memo` ilə sarı və `useCallback` hook-larından istifadə et ki, bunu önlə.”

Texniki baxımdan bu doğrudur. Amma tələsməyin. Burada memoizasiya tamamilə lazım deyil və faydadan çox zərər verə bilər. Daha səmərəli bir yol var.

Amma əvvəlcə gəlin baxaq, burada dəqiq nə baş verir və niyə.

## **State yeniləməsi, daxili komponentlər və re-render-lər**

Gəlin əvvəlindən başlayaq: komponentimizin həyatı və performans barədə danışarkən diqqət yetirməli olduğumuz ən vacib mərhələlər. Bunlar: **mounting (yüklənmə), unmounting (çıxarılma) və re-rendering (yenidən render-lənmə)**.

Komponent ilk dəfə ekranda göründükdə, bunu **mounting** adlandırırıq. Bu zaman React həmin komponentin instansiyasını ilk dəfə yaradır, onun state-ni ilkinləşdirir, hook-larını işə salır və elementləri DOM-a əlavə edir.

Nəticədə ekranda həmin komponentdə render etdiyimiz hər şeyi görürük.

Sonra isə **unmounting** mərhələsi gəlir: bu, React-in komponentin artıq lazım olmadığını aşkar etdiyi zaman baş verir. Beləliklə, React son təmizləməni edir, komponentin instansiyasını və ona bağlı hər şeyi, məsələn, komponentin state-ni məhv edir və nəhayət onun DOM elementini silir.

Və nəhayət, **re-rendering** mərhələsi. Bu, React-in artıq mövcud olan komponenti yeni məlumatlarla yenilədiyi zamandır. Mounting ilə müqayisədə re-rendering yüngüldür: React mövcud instansiyanı yenidən istifadə edir, hook-ları işə salır, bütün lazımi hesablamaları edir və mövcud DOM elementini yeni atributlarla yeniləyir.

Hər re-render state-dən başlayır. React-də hər dəfə `useState`, `useReducer` və ya Redux kimi xarici state idarəetmə kitabxanalarından istifadə etdikdə komponentə interaktivlik əlavə edirik.

Beləliklə, komponentin həyat dövrü boyunca saxlanılan bir məlumat parçası yaranır. İstifadəçi düyməni kliklədikdə və ya xarici məlumat gəldikdə, bu yeni məlumatla state-i yeniləyirik.

Re-rendering React-də başa düşülməli olan ən vacib anlayışlardan biridir. Bu zaman React komponenti yeni məlumatlarla yeniləyir və həmin məlumatdan asılı bütün hook-ları tətikləyir. Bunlar olmadan React-də məlumat yenilənmələri baş verməz və nəticədə interaktivlik olmaz. Tətbiq tamamilə statik qalar.

**State yeniləməsi** React tətbiqlərində bütün re-render-lərin ilkin mənbəyidir. Məsələn, ilkin tətbiqimizi götürsək:

```tsx
import { useState } from "react";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open dialog
      </button>

      {isOpen && <p>Dialog is open!</p>}
    </div>
  );
};

export default App;
```

Düyməni kliklədikdə, `setIsOpen` setter funksiyasını tətikləyirik: `isOpen` state-ni **false-dan true-ya** yeniləyirik. Nəticədə, həmin state-i saxlayan **App** komponenti özünü yenidən render edir.

State yeniləndikdən və **App** komponenti re-render edildikdən sonra, yeni məlumat ona asılı digər komponentlərə çatdırılmalıdır. React bunu avtomatik edir: ilkin komponentin render etdiyi bütün komponentləri götürür, onları yenidən render edir, sonra onların içindəki daxili komponentləri yenidən render edir və bu proses komponent zəncirinin sonuna qədər davam edir.

Əgər tipik bir React tətbiqini bir **ağac** kimi təsəvvür etsək, state yeniləməsi başladığı yerdən aşağıya doğru hər şey yenidən render olunur.

!image.png

Bizim tətbiqimizdə isə state dəyişdikdə render etdiyi hər şey, yəni bütün **çox yavaş komponentlər də**  yenidən render olunacaq:

```tsx
const App = () => {
	 const [isOpen, setIsOpen] = useState(false);
	 // everything that is returned here will be re-rendered when the
	//state is updated
	 return (
	 <div className="layout">
	 <Button onClick={() => setIsOpen(true)}>
	 Open dialog
	 </Button>
	 {isOpen ? (
	 <ModalDialog onClose={() => setIsOpen(false)} />
	 ) : null}
	 <VerySlowComponent />
	 <BunchOfStuff />
	 <OtherStuffAlsoComplicated />
	 </div>
	 );
};
```

Nəticədə, dialoqu açmaq təxminən bir saniyə çəkir — React dialoqu ekranda göstərmədən əvvəl hər şeyi yenidən render etməlidir.

Burada yadda saxlamağa dəyər ki, React komponentləri re-render edərkən heç vaxt render ağacında "yuxarıya" getmir. Əgər state yeniləməsi komponent ağacının ortasında başlayıbsa, yalnız ağacın "aşağı" hissəsindəki komponentlər re-render olunacaq.

!image.png

Komponentlərin hierarxiyanın "aşağı" hissəsindəki komponentlərin "yuxarıdakı" komponentlərə təsir edə bilməsinin yeganə yolu, ya onların "yuxarıdakı" komponentlərdə state yeniləmə funksiyasını birbaşa çağırması, ya da komponentləri funksiyalar şəklində ötürməsidir.

## Böyük Re-render Mifi

Fərq etdinizmi, burada **props** barədə heç nə demədim?

Bəlkə də belə bir ifadə eşitmisiniz: “Komponent, props dəyişdikdə re-render olunur.” Bu, React-də ən yayılmış yanlış anlayışlardan biridir: hamı buna inanır, heç kim şübhə etmir və sadəcə doğru deyil.

Normal React davranışı belədir: əgər **state yenilənməsi** tətiklənirsə, React bütün daxili komponentləri **props-dan asılı olmayaraq** re-render edir. Və əgər state yenilənməsi tətiklənmirsə, props dəyişiklikləri sadəcə "udulur": React onları izləməz.

Əgər mənim bir komponentim props-lara malikdirsə və həmin props-ları **state yenilənməsi tətikləmədən** dəyişdirməyə çalışsam, bu cür bir vəziyyət yaranır:

```tsx
const App = () => {
 // local variable won't work
 let isOpen = false;
 return (
 <div className="layout">
 {/* nothing will happen */}
 <Button onClick={() => (isOpen = true)}>
 Open dialog
 </Button>
 {/* will never show up */}
 {isOpen ? (
 <ModalDialog onClose={() => (isOpen = false)} />
 ) : null}
 </div>
 );
};
```

Sadəcə işləməyəcək. Düymə kliklənəndə, lokal `isOpen` dəyişəni dəyişəcək. Amma React-in həyat dövrü tətiklənməyəcək, buna görə render nəticəsi yenilənməyəcək və **ModalDialog** heç vaxt görünməyəcək.

- Nümunə
    
    Interactive example and full code
    https://advanced-react.com/examples/01/02
    

Re-render kontekstində, bir komponentin props-ları dəyişib-dəyişməməsi yalnız bir halda əhəmiyyət kəsb edir: əgər həmin komponent **React.memo** higher-order komponenti ilə sarılıbsa.

O zaman və yalnız o zaman React öz təbii re-render zəncirini dayandıracaq və əvvəlcə props-ları yoxlayacaq. Əgər heç bir prop dəyişmirsə, re-render orada dayanacaq. Amma tək bir prop belə dəyişsə, re-render-lər adi qaydada davam edəcək.

!image.png

Re-render-lərin **memoization** ilə düzgün qarşısını almaq mürəkkəb bir mövzudur və bir neçə incəlikləri var. Daha ətraflı öyrənmək üçün **Fəsil 5**-ə baxın.

State-i Aşağıya Endirmək

İndi React-in komponentləri necə re-render etdiyini anladığımıza görə, bu bilikləri ilkin problemi həll etmək üçün tətbiq etməyin vaxtıdır. Gəlin koda daha yaxından baxaq, xüsusilə modal dialoq state-inin istifadə olunduğu yerə:

```tsx
const App = () => {
 // our state is declared here
 const [isOpen, setIsOpen] = useState(false);
 return (
	 <div className="layout">
		 {/* state is used here */}
		 <Button onClick={() => setIsOpen(true)}>
		 Open dialog
		 </Button>
		 {/* state is used here */}
		 {isOpen ? (
		 <ModalDialog onClose={() => setIsOpen(false)} />
		 ) : null}
		 <VerySlowComponent />
		 <BunchOfStuff />
		 <OtherStuffAlsoComplicated />
	 </div>
 );
};
```

Gördüyünüz kimi, bu state nisbətən izolyasiyalıdır: biz onu yalnız **Button** komponentində və **ModalDialog**-da istifadə edirik. Kodun qalan hissəsi, yəni bütün çox yavaş komponentlər, ona asılı deyil və bu səbəbdən state dəyişdikdə re-render olunmasına ehtiyac yoxdur. Bu, klassik bir **lazımsız re-render** nümunəsidir.

Bu komponentləri `React.memo` ilə sarmalamaq onları bu halda re-render olmaqdan qoruyar, bu doğru olsa da, `React.memo`-nun bir çox incəlikləri və mürəkkəblikləri var (ətraflı Fəsil 5-də: `useMemo`, `useCallback` və `React.memo` ilə memoization).

Daha yaxşı bir yol var. Bütün etməli olduğumuz, **o state-ə asılı olan komponentləri və state-i özünü daha kiçik bir komponentə çıxarmaqdır**:

```tsx
const ButtonWithModalDialog = () => {
 const [isOpen, setIsOpen] = useState(false);
 // render only Button and ModalDialog here
 return (
 <>
 <Button onClick={() => setIsOpen(true)}>
 Open dialog
 </Button>
 {isOpen ? (
 <ModalDialog onClose={() => setIsOpen(false)} />
 ) : null}
 </>
 );
};
```

Və sonra bu yeni komponenti sadəcə ilkin böyük **App**-də render edin:

```tsx
const App = () => {
return (
<div className="layout">
{/* here it goes, component with the state inside */}
<ButtonWithModalDialog />
<VerySlowComponent />
<BunchOfStuff />
<OtherStuffAlsoComplicated />
</div>
);
};
```

- Nümunə
    
    Interactive example and full code
    https://advanced-react.com/examples/01/03
    

İndi, düymə kliklənəndə state yenilənməsi hələ də tətiklənir və bəzi komponentlər buna görə re-render olunur. Amma! Bu yalnız **ButtonWithModalDialog** komponentinin içindəki komponentlərdə baş verir. Və render olunmalı olan sadə bir düymə və dialoqdan ibarətdir. Tətbiqin qalan hissəsi təhlükəsiz qalır.

Əsasən, biz render ağacımızda yeni bir **sub-branch** yaratdıq və state-i ora endirdik.

!image.png

Nəticədə, modal dialoq dərhal görünür. Biz sadə bir kompozisiya texnikası ilə böyük bir performans problemini həll etdik!

### Custom Hooks-un Təhlükəsi

State, re-render-lər və performansla işləyərkən unutulmamalı çox vacib anlayışlardan biri də **custom hooks**-dur. Axı, onlar məhz **state-ə bağlı loqikanı abstraktlaşdırmaq** üçün təqdim olunublar.

Yuxarıdakı nümunədəki kimi loqikanın `useModalDialog` hook-u şəklində çıxarılması çox yaygındır. Sadələşdirilmiş versiyası belə görünə bilər:

```tsx
const useModalDialog = () => {
const [isOpen, setIsOpen] = useState(false);
		return {
		isOpen,
		open: () => setIsOpen(true),
		close: () => setIsOpen(false),
  };
};
```

Və sonra bu hook-u App-də birbaşa state təyin etmək əvəzinə istifadə edirik:

```tsx
const App = () => {
 // state is in the hook now
 const { isOpen, open, close } = useModalDialog();
 return (
 <div className="layout">
 {/* just use "open" method from the hook */}
 <Button onClick={open}>Open dialog</Button>
 {/* just use "close" method from the hook */}
 {isOpen ? <ModalDialog onClose={close} /> : null}
 <VerySlowComponent />
 <BunchOfStuff />
 <OtherStuffAlsoComplicated />
 </div>
 );
};
```

Niyə bunu "təhlükə" adlandırdım? Bu, görünüşdə məntiqli bir nümunədir və kod bir qədər təmiz görünür. Amma hook **tətbiqdə state-in mövcudluğunu gizlədir**.

Amma state hələ də mövcuddur! Hər dəfə dəyişəndə, bu hook-u istifadə edən komponenti yenidən render edəcək. Hətta bu state App-də birbaşa istifadə olunursa və ya hook heç bir şey qaytarmırsa belə fərqi yoxdur.

- Nümunə
    
    Interactive example and full code
    https://advanced-react.com/examples/01/04
    

Məsələn, əgər bu dialoqun yerləşməsini daha da cəlbedici etmək istəyirəmsə və həmin hook-un içində **window resize**-ə qulaq asan bəzi state-lər əlavə edirəmsə:

```tsx
const useModalDialog = () => {
	 const [width, setWidth] = useState(0);
	 useEffect(() => {
		 const listener = () => {
		 setWidth(window.innerWidth);
		   }
	 window.addEventListener('resize', listener);
		 return () => window.removeEventListener('resize', listener);
	 }, []);
	 // return is the same
	 return ...
}
```

Bütün **App** komponenti hər **resize** zamanı yenidən render olunacaq, hətta bu dəyər hook-dan heç qaytarılmasa belə!

- Nümumə
    
    Interactive example and full code
    https://advanced-react.com/examples/01/05
    

Hook-lar əslində şalvar cib kisələrinə bənzəyir. Əgər əlinizdə **10 kiloqramlıq dumbbell** daşımaq əvəzinə onu cibinizə qoysanız, bu, qaçmaqda çətinlik çəkməyinizin qarşısını almaz: hələ də üzərinizdə 10 kilo əlavə yük var. Amma əgər o on kiloqramı **avtomatik hərəkət edən bir trolleydə** qoysanız, sərbəst şəkildə qaça bilərsiniz, hətta qəhvə də içə bilərsiniz: trolley özü ilə məşğul olacaq. State üçün komponentlər həmin trolley kimidir.

Eyni məntiq digər hook-lardan istifadə edən hook-lara da aiddir: zəncirin nə qədər dərinliyində baş verməsindən asılı olmayaraq, hər hansı bir dəyişiklik re-render-i tətikləyə bilər və nəticədə həmin ilk hook-u istifadə edən komponent də yenidən render olunacaq.

Əgər əlavə state-i `null` qaytaran bir hook-a çıxarsam belə, **App** hər **resize** zamanı yenidən render olunacaq:

```tsx
const useResizeDetector = () => {
 const [width, setWidth] = useState(0);
 useEffect(() => {
 const listener = () => {
 setWidth(window.innerWidth);
 };
 window.addEventListener('resize', listener);
 return () => window.removeEventListener('resize', listener);
 }, []);
 return null;
}
const useModalDialog = () => {
 // I don't even use it, just call it here
 useResizeDetector();
 // return is the same
 return ...
}
const App = () => {
 // this hook uses useResizeDetector underneath that triggers
state update on resize
 // the entire App will re-render on every resize!
 const { isOpen, open, close } = useModalDialog();
 return // same return
}
```

- Nümunə
    
    Interactive example and full code
    Page 25
    https://advanced-react.com/examples/01/06
    

Beləliklə, onlara diqqətli olmaq lazımdır.

Tətbiqimizi düzəltmək üçün, hələ də həmin **düymə**, **dialoq** və **custom hook**-u ayrıca bir komponentə çıxarmaq lazımdır:

```tsx
const ButtonWithModalDialog = () => {
 const { isOpen, open, close } = useModalDialog();
 // render only Button and ModalDialog here
 return (
 <>
 <Button onClick={open}>Open dialog</Button>
 {isOpen ? <ModalDialog onClose={close} /> : null}
 </>
 );
};
```

- Nümunə
    
    Interactive example and full code
    https://advanced-react.com/examples/01/07
    

Beləliklə, state-i harada yerləşdirdiyiniz çox vacibdir. İdeal olaraq, gələcək performans problemlərinin qarşısını almaq üçün, onu mümkün qədər **kiçik və yüngül komponentlərdə izolyasiya etmək** lazımdır. Növbəti fəsildə (**Fəsil 2. Elements, children as props və re-render-lər**) dəqiq olaraq buna kömək edən başqa bir nümunəyə baxacağıq.

### Əsas Nəticələr

- Re-render-lər React-in komponentləri yeni məlumatlarla yeniləmə üsuludur.
- Re-render-lər olmadan tətbiqlərimizdə heç bir interaktivlik olmayacaq.
- State yenilənməsi bütün re-render-lərin ilkin mənbəyidir.
- Əgər bir komponent re-render olunursa, həmin komponentin içindəki bütün nested komponentlər də re-render olunur.
- Normal React re-render dövründə (memoization istifadə edilmədən) props-ların dəyişməsi əhəmiyyət daşımır: komponentlərin props-u olmasa belə, onlar re-render olunacaq.
- Böyük tətbiqlərdə **"state-i aşağıya endirmək"** nümunəsi ilə lazımsız re-render-lərin qarşısını almaq mümkündür.
- Hook-dakı state yenilənməsi, həmin hook-u istifadə edən komponentin re-render olunmasına səbəb olur, hətta state birbaşa istifadə olunmasa belə.
- Digər hook-lardan istifadə edən hook-lar üçün, zəncirdəki hər hansı state yenilənməsi, ilk hook-u istifadə edən komponentin re-render olunmasını tətikləyəcək.

# **Fəsil 2. Elementlər, children kimi props və re-render-lər**

Əvvəlki fəsildə biz araşdırdıq ki, vəziyyət (state) dəyişiklikləri tətbiqimizdə aşağı axınlı (downstream) yenidən renderlənmələrə (re-render) səbəb olur və bunu “state-i aşağıya köçürmək” (moving state down) nümunəsi ilə necə həll etmək olar. Lakin oradakı nümunə nisbətən sadə idi və state kifayət qədər təcrid olunmuşdu. Buna görə də onu ayrıca komponentə köçürmək asan idi. Bəs vəziyyət bir az daha mürəkkəb olanda bizim seçimlərimiz nələrdir?

İndi isə re-renderlərin necə işlədiyini araşdırmağa davam etməyin, növbəti performans təhlilini aparmağın və detallara daha dərindən girməyin vaxtıdır. Bu fəsildə siz öyrənəcəksiniz:

- Komponentləri prop kimi ötürməyin tətbiqimizin performansını necə yaxşılaşdıra biləcəyini.
- React-ın re-renderləri dəqiq olaraq necə tətiklədiyini.
- Niyə komponentlərin prop kimi ötürülməsi re-renderlərdən təsirlənmir.
- Elementin nə olduğunu, onun Komponentdən nə ilə fərqləndiyini və bu fərqin niyə vacib olduğunu.
- React reconciliation və diffing-in əsaslarını.
- “Children as props” nümunəsinin nə olduğunu və onun necə re-renderlərin qarşısını ala biləcəyini.

### Problem

Təsəvvür edin ki, siz yenidən böyük, mürəkkəb və performansa çox həssas bir tətbiqi miras almısınız. Və həmin tətbiqin scroll edilə bilən (sürüşdürülə bilən) bir məzmun sahəsi var.

Yəqin ki, yuxarıda yapışqan (sticky) header, solda yığıla bilən (collapsible) sidebar və ortada isə qalan bütün funksionallıqlar olan mürəkkəb bir layout qurulub.

Həmin əsas scroll edilə bilən sahənin kodu təxminən belə görünür:

```tsx
const App = () => {
 return (
 <div className="scrollable-block">
	 <VerySlowComponent />
	 <BunchOfStuff />
	 <OtherStuffAlsoComplicated />
 </div>
 );
};
```

Sadəcə bir `div` — içində `className` olan və CSS-də `overflow: auto` təyin edilmiş.

Və həmin `div`-in içində çox yavaş işləyən komponentlər var. İşdəki ilk gününüzdə sizdən çox kreativ bir funksiya əlavə etməyinizi istəyirlər: istifadəçi bir az scroll etdikdə, sahənin aşağısında görünən və istifadəçi aşağıya doğru scroll etdikcə yavaş-yavaş yuxarı qalxan bir blok. Əksinə, istifadəçi yuxarı scroll etdikdə isə, həmin blok yavaş-yavaş aşağı enib yoxa çıxmalıdır. Məsələn, bəzi faydalı linklərin olduğu əlavə bir naviqasiya bloku kimi.

Və, təbii ki, scroll etmə prosesi və bununla bağlı hər şey hamar və lagsız olmalıdır.

Bu tələbləri yerinə yetirməyin ən sadə yolu scroll edilə bilən `div`-ə bir `onScroll` handler bağlamaq, scroll dəyərini götürmək və həmin dəyərə əsasən üzən `div`-in mövqeyini hesablamaq olardı:

```tsx
const MainScrollableArea = () => {
	 const [position, setPosition] = useState(300);
	 const onScroll = (e) => {
	 // calculate position based on the scrolled value
	 const calculated = getPosition(e.target.scrollTop);
	 // save it to state
	  setPosition(calculated);
	 };
	 return (
			 <div className="scrollable-block" onScroll={onScroll}>
					 {/* pass position value to the new movable component */}
					 <MovingBlock position={position} />
					 <VerySlowComponent />
					 <BunchOfStuff />
					 <OtherStuffAlsoComplicated />
			 </div>
	 );
};
```

- Nümumə
    
    Interactive example and full code
    https://advanced-react.com/examples/02/01
    

Amma performans və yenidən renderləmə baxımından bu, optimal deyil. Hər scroll bir state yenilənməsini tətikləmiş olacaq və artıq bildiyimiz kimi, state yenilənməsi `App` komponentinin və onun daxilindəki bütün nested komponentlərin yenidən renderlənməsinə səbəb olacaq. Nəticədə bütün o çox yavaş işləyən hissələr yenidən render olunacaq və scroll təcrübəsi ləng və ilişkən olacaq. Bu isə bizim tam olaraq istəmədiyimiz nəticədir.

Və gördüyünüz kimi, həmin state-i asanlıqla ayrıca bir komponentə çıxarmaq da olmur. Çünki `setPosition` funksiyası `onScroll` funksiyasında istifadə olunur və o da hər şeyi əhatə edən `div`-ə bağlanıb.

Bəs burada nə etmək olar? Memoization, ya da `Ref`-i ötürməklə hansısa sehrli hiylə? Heç də vacib deyil! Əvvəlki kimi, daha sadə bir seçim var. Həmin state-i və state-in işləməsi üçün lazım olan hər şeyi ayrıca bir komponentə çıxara bilərik:

```tsx
const ScrollableWithMovingBlock = () => {
		 const [position, setPosition] = useState(300);
		 const onScroll = (e) => {
		 const calculated = getPosition(e.target.scrollTop);
		 setPosition(calculated);
	 };
	 return (
		 <div className="scrollable-block" onScroll={onScroll}>
			 <MovingBlock position={position} />
			 {/* slow bunch of stuff used to be here, but not anymore */}
		 </div>
	 );
};
```

Və sonra həmin yavaş işləyən hissələri sadəcə olaraq props kimi həmin komponentə ötürmək olar. Təxminən belə:

```tsx
const App = () => {
 const slowComponents = (
 <>
 <VerySlowComponent />
 <BunchOfStuff />
 <OtherStuffAlsoComplicated />
 </>
 );
 return (
 <ScrollableWithMovingBlock content={slowComponents} />
 );
};
```

Sadəcə olaraq `ScrollableWithMovingBlock` komponentimizdə React Elementlərini qəbul edən bir **`content`** xüsusiyyəti yaradın (bu barədə daha ətraflı bir az sonra danışacağıq). Və sonra `ScrollableWithMovingBlock` daxilində həmin prop-u qəbul edib, render olunmalı olduğu yerə yerləşdirin:

```tsx
// add "content" property to the component
const ScrollableWithMovingBlock = ({ content }) => {
	const [position, setPosition] = useState(0);
	const onScroll = () => {...} // same as before
	return (
	<div className="scrollable-block" onScroll={onScroll}>
		<MovingBlock position={position} />
		{content}
	</div>
  )
}
```

İndi isə gəlin state yenilənməsi və re-renderlər məsələsinə baxaq. Əgər bir state yenilənməsi baş verirsə, hər zamankı kimi bir komponentin yenidən render olunmasını tətikləmiş olacağıq. Ancaq bu halda, bu komponent `ScrollableWithMovingBlock` olacaq — sadəcə hərəkət edən blokla birlikdə bir div. Yavaş işləyən digər komponentlər isə props vasitəsilə ötürülür, onlar həmin komponentin içində deyillər. “Hierarxik” komponent ağacında onlar valideynə məxsusdur. Və yadınızdadırmı? React heç vaxt bir komponenti yenidən render edərkən ağacda “yuxarı” qalxmır. Buna görə də state yeniləndikdə həmin yavaş komponentlər yenidən render olunmayacaq və scroll təcrübəsi hamar və ləngiməsiz olacaq.

- Nümunə
    
    Interactive example and full code
    https://advanced-react.com/examples/02/02
    

Bir dəqiqə, bəziləri burada belə düşünə bilər: Bu çox məntiqli görünmür. Bəli, həmin komponentlər valideyndə elan olunub, amma onlar hələ də state olan komponentin içində render olunur. Bəs niyə yenidən render olunmurlar? Bu, əslində, çox məntiqli bir sualdır.

Bütün bunları başa düşmək üçün bir neçə şeyi anlamaq lazımdır: React-da “re-render” dedikdə nə nəzərdə tutulur, Element ilə Component arasındakı fərq nədir və reconciliation və diffing alqoritmlərinin əsas prinsipləri nələrdir.

## Elementlər, Komponentlər və Yenidən Render-lər

Əvvəlcə, Komponent nədir? Budur ən sadə nümunəsi:

```tsx
const Parent = () => {
 return <Child />;
};
```

Gördüyünüz kimi, bu sadəcə bir funksiyadır. Bir komponenti digər funksiyalardan fərqləndirən cəhət odur ki, o, Elementləri qaytarır, React isə onları DOM elementlərinə çevirir və brauzerə ekran üzərində göstərmək üçün göndərir. Əgər komponentin props-ları varsa, onlar sadəcə həmin funksiyanın ilk arqumenti olacaq:

```tsx
const Parent = (props) => {
 return <Child />;
};
```

Bu funksiya `<Child />` qaytarır, bu isə Child Komponentinin bir Elementidir. Hər dəfə komponent üzərində bu mötərizələri istifadə etdikdə, bir Element yaradırıq. Parent komponentinin Elementi isə `<Parent />` olacaq.

Element sadəcə ekran üzərində render olunmalı olan komponenti təyin edən bir obyektdir. Əslində, HTML-ə bənzər gözəl sintaksis React.createElement funksiyası üçün sintaksis şəkərindən başqa bir şey deyil.

Biz hətta həmin elementi belə də əvəz edə bilərik:

```jsx
React.createElement(Child, null, null)

```

və hər şey gözlənildiyi kimi işləyəcək.

Bizim `<Child />` elementimizin obyekt tərifi təxminən belə görünəcək:

```tsx
{
 type: Child,
 props: {}, // if Child had props
 ... // lots of other internal React stuff
}
```

Bu bizə göstərir ki, Parent komponenti, həmin tərifi definition ve ya function referance qaytararaq, Child komponentini heç bir prop istifadə etmədən render etməyimizi istəyir. Child komponentinin qaytarışı öz təriflərinə sahib olacaq və s. — bu komponent zəncirinin sonuna çatana qədər davam edəcək.

Elementlər yalnız komponentlərlə məhdudlaşmır; onlar adi DOM elementləri də ola bilər. Məsələn, bizim Child `<h1>` teqi qaytara bilər:

```tsx
const Child = () => {
 return <h1>Some title</h1>;
};
```

Bu halda, tərif obyekti tam olaraq eyni olacaq və eyni şəkildə işləyəcək, yalnız `type` sahəsi string olacaq:

```tsx
{
type: "h1",
... // props and internal react stuff
}
```

İndi isə re-render məsələsinə keçək. Biz adətən “re-render” dedikdə React-in həmin funksiyaları çağırmasını və prosesdə icra olunmalı olan hər şeyi (məsələn, hook-ları) işə salmasını nəzərdə tuturuq. Bu funksiyaların geri qaytardığı dəyərlərdən React həmin obyektlərin bir ağacını qurur. Biz bunu indi Fiber Ağacı və ya bəzən Virtual DOM kimi tanıyırıq. Əslində, burada iki ağac mövcuddur: re-render öncəsi və re-render sonrası. Bu iki ağacı müqayisə edərək (“diffing”), React brauzerə hansı DOM elementlərinin yenilənməli, silinməli və ya əlavə olunmalı olduğunu müəyyən edir. Bu proses “reconciliation” (uzlaşma) alqoritmi kimi tanınır.

Bu fəsil üçün vacib olan hissə budur: əgər re-render öncəsi və sonrası obyekt (Element) tam eynidirsə, React həmin Elementin təmsil etdiyi Komponentin və onun daxilindəki nested komponentlərin re-render-lərini keçəcək. “Tam eyni” dedikdə mənim nəzərdə tutduğum budur ki, `Object.is(ElementBeforeRerender, ElementAfterRerender)` true qaytarırsa, React obyektlərin dərin müqayisəsini aparmır. Əgər bu müqayisənin nəticəsi true-dursa, React həmin komponenti sakit buraxır və növbəti komponentə keçir.

Əgər müqayisənin nəticəsi false-dursa, bu React üçün bir siqnaldır ki, nəsə dəyişib. React onda tipə baxır. Əgər tip eynidirsə, React həmin komponenti re-render edir. Əgər tip dəyişibsə, “köhnə” komponent silinir və “yeni” komponent mount edilir. Biz bunu daha ətraflı olaraq 6-cı fəsildə — “Diffing və reconciliation-in dərin təhlili” mövzusunda öyrənəcəyik.

Gəlin Parent/Child nümunəsinə yenidən baxaq və təsəvvür edək ki, Parent-in state-i var:

```tsx
const Parent = (props) => {
 const [state, setState] = useState();
 return <Child />;
};
```

`setState` çağırıldığında, React Parent komponentini re-render etməli olduğunu bilir. Beləliklə, Parent funksiyasını çağıracaq və state dəyişmədən əvvəl və sonra nə qaytardığını müqayisə edəcək. Bu funksiya lokal olaraq müəyyən edilmiş bir obyekt qaytarır. Hər funksiyanın çağırışı zamanı (yəni re-render zamanı) bu obyekt yenidən yaradılır və `<Child />` obyektlərinin “öncə” və “sonra” vəziyyəti üçün `Object.is` nəticəsi false olacaq. Nəticədə, hər dəfə Parent re-render edildikdə, Child komponenti də re-render edilir.

İndi təsəvvür edin: əgər bu Child komponentini birbaşa render etmək əvəzinə, onu prop kimi ötürsəm nə baş verər?

```tsx
const Parent = ({ child }) => {
 const [state, setState] = useState();
 return child;
};
// someone somewhere renders Parent component like this
<Parent child={<Child />} />;
```

Parent komponenti render olunduğu yerdə `<Child />` obyektinin tərifi yaradılır və ona `child` prop kimi ötürülür.

Parent-də state update tətiklənəndə, React Parent funksiyasının state dəyişmədən əvvəl və sonra nə qaytardığını müqayisə edəcək. Bu halda, qaytarılan child obyektinə bir referansdır: yəni Parent funksiyasının scope-u xaricində yaradılmış bir obyekt, buna görə də funksiyanı çağıranda dəyişmir. Nəticədə, child obyektinin “öncə” və “sonra” müqayisəsi true qaytaracaq və React bu komponentin re-renderini atlayacaq.

Və elə bu, bizim scroll komponentimiz üçün etdiyimiz üsuldur!

```tsx
const ScrollableWithMovingBlock = ({ content }) => {
 const [position, setPosition] = useState(300);
 const onScroll = () => {...} // same as before
 return (
 <div className="scrollable-block" onScroll={onScroll}>
	 <MovingBlock position={position} />
	 {content}
 </div>
 )
}
```

`ScrollableWithMovingBlock` içində `setPosition` tetiklənəndə və re-render baş verdikdə, React funksiyanın qaytardığı bütün obyekt təriflərini müqayisə edəcək, `content` obyektinin əvvəl və sonra tam eyni olduğunu görəcək və oradakı komponentlərin re-renderini atlayacaq. Bizim misalda bu, çox yavaş olan komponentlərdir.

Amma `<MovingBlock ... />` re-render olacaq: çünki o `ScrollableWithMovingBlock` içində yaradılıb. Obyekt hər re-render zamanı yenidən yaradılacaq və “öncə” və “sonra” müqayisəsi false qaytaracaq.

# Children as props

Bu pattern həm maraqlıdır, həm də tam düzgündür, amma bir kiçik problem var: görünüşcə qəribədir. Bütün səhifə məzmununu bir “random” prop-a ötürmək sadəcə… nədənsə səhv görünür. Ona görə bunu təkmilləşdirək.

İlk növbədə, props-un mahiyyətindən danışaq. Props sadəcə komponent funksiyasına ötürdüyümüz bir obyektdir. Obyektdən çıxardığımız hər şey bir prop-dur. Hər şey.

Parent/Child misalımızda, əgər `child` prop-un adını `children` ilə dəyişdirsək, heç nə dəyişməyəcək: funksionallıq eyni qalacaq.

```tsx
// before
const Parent = ({ child }) => {
 return child;
};
// after
const Parent = ({ children }) => {
 return children;
};
```

Və istifadəçi tərəfdə də vəziyyət eynidir: heç nə dəyişmir.

```tsx
// before
<Parent child={<Child />} />
// after
<Parent children={<Child />} />
```

Lakin, children props üçün JSX-də xüsusi bir sintaksisimiz var. HTML teqləri ilə hər zaman istifadə etdiyimiz o gözəl iç-içə tərtibatı sadəcə heç vaxt düşünməmişik və ona diqqət yetirməmişik:

```tsx
<Parent>
 <Child />
</Parent>
```

Bu, children prop-un birbaşa ötürülməsi ilə eyni şəkildə işləyəcək:

```tsx
<Parent children={<Child />} />
// exactly the same as above
<Parent>
 <Child />
</Parent>
```

Və bu obyekt kimi təmsil olunacaq:

```tsx
{
 type: Parent,
 props: {
 // element for Child here
 children: {
  type: Child,
 ...
 },
 }
}
```

Və bu, Elements-i prop kimi ötürməyin verdiyi performans üstünlükləri ilə tam eyni olacaq! Prop vasitəsilə ötürülən hər şey, həmin prop-u qəbul edən komponentin state-dəki dəyişiklikdən təsirlənməyəcək.

Beləliklə, App komponentimizi bu formada yenidən yaza bilərik:

```tsx
const App = () => {
 const slowComponents = (
 <>
 <VerySlowComponent />
 <BunchOfStuff />
 <OtherStuffAlsoComplicated />
 </>
 );
 return (
 <ScrollableWithMovingBlock content={slowComponents} />
 );
};
```

Daha gözəl və anlamaq üçün daha asan bir formaya:

```tsx
const App = () => {
 return (
 <ScrollableWithMovingBlock>
		 <VerySlowComponent />
		 <BunchOfStuff />
		 <OtherStuffAlsoComplicated />
 </ScrollableWithMovingBlock>
 );
};
```

ScrollableWithMovingBlock komponentində etməli olduğumuz tək şey content prop-un adını children olaraq dəyişdirməkdir, başqa heç nə! Əvvəlki vəziyyət:

```tsx
const ScrollableWithMovingBlock = ({ content }) => {
 // .. the rest of the code
 return (
	 <div ...>
	 ...
	 {content}
	 </div>
 )
}
```

Sonrakı vəziyyət:

```tsx
const ScrollableWithMovingBlock = ({ children }) => {
// .. the rest of the code
	return (
		<div ...>
		...
		{children}
		</div>
	)
	}
```

Və iş bitdi: sadə bir kompozisiya hiyləsi istifadə edərək çox yavaş bir tətbiqdə yüksək performanslı scrollable blok tətbiq olundu.

- Nümunə
    
    Interactive example and full code
    https://advanced-react.com/examples/02/03
    

Əsas nəticələr

Ümid edirəm ki, bu izah sizə aydın oldu və indi siz “komponentlər props kimi” və “children props kimi” nümunələrinə əminliklə yanaşa bilirsiniz. Növbəti fəsildə komponentlərin props kimi istifadəsinin performans xaricində necə faydalı ola biləcəyinə baxacağıq.

Bu arada yadda saxlamağa dəyər bir neçə məqam:

- **Komponent (Component)** sadəcə bir funksiyadır, hansı ki bir arqument (props) qəbul edir və ekrana render olunmalı olan **Elementləri** qaytarır. Məsələn:
    
    ```jsx
    const A = () => <B />
    
    ```
    
    bu bir komponentdir.
    
- **Element** ekranda nə render olunmalı olduğunu təsvir edən bir obyektidir. Tipi ya DOM elementləri üçün string, ya da komponentlər üçün komponentə referans olur. Məsələn:
    
    ```jsx
    const b = <B />
    
    ```
    
    bu bir elementdir.
    
- **Re-render** sadəcə React-in komponent funksiyasını çağırmasıdır.
- Bir komponent yalnız element obyektinin dəyişməsi halında re-render olunur; dəyişiklik `Object.is` müqayisəsi ilə müəyyən edilir.
- Elementlər props kimi bir komponentə ötürülürsə və bu komponent state yenilənməsi ilə re-render yaradırsa, props kimi ötürülən elementlər re-render olunmayacaq.
- **“children”** sadəcə digər props kimidir və JSX iç-içə yazılma sintaksisi vasitəsilə ötürüldükdə eyni davranışı göstərir.

# Fəsil 3. Konfiqurasiya məsələləri: elementlərin props kimi istifadəsi

Əvvəlki fəsildə biz elementləri props kimi ötürməyin tətbiqlərimizin performansını necə yaxşılaşdıra biləcəyini araşdırdıq. Lakin performansın artırılması bu pattern-in ən çox istifadə olunan tərəfi deyil. Əslində, bu daha çox xoş bir yan təsirdir və nisbətən az tanınır. Bu pattern-in həll etdiyi ən böyük istifadə halı isə komponentlərin elastikliyi və konfiqurasiyasıdır.

Gəlin React-in necə işlədiyini araşdırmağa davam edək. Bu dəfə sadə bir “ikonlu düymə” komponenti quracağıq. Görəsən, burada nə çətin ola bilər, elə deyilmi? Amma onu qurma prosesində siz öyrənəcəksiniz:

- Elementlərin props kimi istifadəsi belə komponentlərdə konfiqurasiya məsələlərini necə köklü şəkildə yaxşılaşdırır.
- Komponentlərin şərti renderlənməsinin performansa necə təsir edir.
- Props kimi ötürülən komponentin dəqiq nə vaxt render olunduğunu.
- cloneElement funksiyasından istifadə etməklə props kimi ötürülən komponentlər üçün default props-un necə təyin ediləcəyini və bunun hansı mənfi tərəflərinin olduğunu.

Hazırsınız? Başlayaq!

Problem

Təsəvvür edin ki, sizə bir **Button** komponenti hazırlamaq tapşırılıb. Tələblərdən biri odur ki, bu düymə “loading” kontekstində istifadə olunanda sağ tərəfdə **“loading” ikonasını** göstərə bilsin. Bu, formalar vasitəsilə məlumat göndərmədə kifayət qədər geniş yayılmış bir pattern-dir.

Heç bir problem yoxdur! Sadəcə olaraq düyməni implementasiya edib, **isLoading** prop-u əlavə edə bilərik. Bu prop-un dəyərinə əsasən isə ikon-u render edərik.

```tsx
const Button = ({ isLoading }) => {
 return (
 <button>Submit {isLoading ? <Loading /> : null}</button>
 );
};
```

Ertəsi gün bu düymənin yalnız **Loading** yox, kitabxananızdakı bütün ikonları dəstəkləməsi tələb olunur. Yaxşı, bunun üçün **iconName** prop-u əlavə edə bilərik. Bir gün sonra – istifadəçilər həmin ikonun rəngini idarə etmək istəyirlər ki, saytın rəng palitrasına uyğun olsun. Bunun üçün **iconColor** prop-u əlavə olunur. Sonra isə **iconSize** – ikonun ölçüsünü idarə etmək üçün. Daha sonra isə düymənin sol tərəfdə də ikonları dəstəkləməsi, hətta avatarları göstərməsi tələbi ortaya çıxır.

Nəticədə, **Button** üzərindəki prop-ların yarısı yalnız ikonları idarə etmək üçündür, heç kim içəridə nələrin baş verdiyini anlamır və hər dəyişiklik müştərilər üçün hansısa funksionallığın pozulması ilə nəticələnir.

```tsx
const Button = ({
 isLoading,
 iconLeftName,
 iconLeftColor,
 iconLeftSize,
 isIconLeftAvatar,
 ...
 }) => {
 // no one knows what's happening here and how all those props
//work
 return ...
}
```

Tanış gəlir? 🙂

Bu, real layihələrdə çox tez-tez rast gəlinən problemdir: başlanğıcda sadə görünən bir komponent zamanla çox sayda xüsusi **prop** ilə "şişir" və nəticədə istifadəsi də, dəstəklənməsi də çətinləşir.

Elementləri **prop** kimi ötürmək

Xoşbəxtlikdən, bu vəziyyəti kəskin şəkildə yaxşılaşdırmağın sadə yolu var.

Etməli olduğumuz tək şey — həmin bütün konfiqurasiya **prop**-larını atmaq və ikonanı **Element** kimi ötürməkdir:

```tsx
const Button = ({ icon }) => {
 return <button>Submit {icon}</button>;
};
```

Və sonra həmin ikonanın konfiqurasiyasını istənilən şəkildə etmək üçün məsuliyyəti **consumer**-ə buraxmaq lazımdır:

```tsx
// default Loading icon
<Button icon={<Loading />} />
// red Error icon
<Button icon={<Error color="red" />} />
// yellow large Warning icon
<Button icon={<Warning color="yellow" size="large" />} />
// avatar instead of icon
<Button icon={<Avatar />} />
```

- Nümunə
    
    Interactive example and full code
    https://advanced-react.com/examples/03/01
    

Button üçün bu cür yanaşmanın yaxşı fikir olub-olmaması, əlbəttə ki, bəzən müzakirə mövzusu ola bilər. Bu, çox vaxt dizaynınızın nə qədər sərt olduğundan və məhsul funksiyalarını implementasiya edənlərə nə qədər azadlıq verdiyindən asılıdır.

Amma təsəvvür edin ki, siz **başlıq**, **kontent sahəsi** və **footer**-də bəzi düymələr olan bir modal dialoq implementasiya edirsiniz. Dizaynerləriniz çox sərt və güclü deyilsə, böyük ehtimalla müxtəlif dialoqlarda düymələrin fərqli konfiqurasiyaları lazım olacaq: bir, iki, üç düymə; bir düymə link, digəri "primary"; fərqli mətnlər, fərqli ikonalar, fərqli tooltip-lər və s.

Bütün bunları **konfiqurasiya propları** ilə ötürməyi təsəvvür edin!

Amma **elements as props** ilə bu iş çox sadədir: sadəcə dialog üçün bir `footer` prop yaradın.

```tsx
const ModalDialog = ({ content, footer }) => {
 return (
 <div className="modal-dialog">
 <div className="content">{content}</div>
 <div className="footer">{footer}</div>
 </div>
 );
};
```

və sonra lazım olan hər şeyi ötürün:

- Nümunə
    
    Interactive example and full code
    https://advanced-react.com/examples/03/02
    

Və ya ThreeColumnsLayout komponenti kimi bir şey, ekran üzərində üç sütun ilə müəyyən məzmunu göstərir. Bu halda heç bir konfiqurasiya etmək mümkün deyil: o, həqiqətən də həmin sütunlarda hər şeyi göstərməli və göstərə bilər.

```tsx
<ThreeColumnsLayout
 leftColumn={<Something />}
 middleColumn={<OtherThing />}
 rightColumn={<SomethingElse />}
/>
```

- Nümunə
    
    Interactive example and full code
    https://advanced-react.com/examples/03/03
    

Əslində, komponent üçün elementin prop kimi verilməsi istehlakçıya deməyin bir yoludur: “Mənə istədiyini ver, mən nə olduğunu bilmirəm və vecimə deyil, mən sadəcə onu doğru yerə qoymaqdan məsulam. Qalanı sənə qalır.”

Və əlbəttə ki, əvvəlki fəsildə izah olunan “children” prop kimi istifadə nümunəsi də burada çox faydalıdır. Əgər komponentin “əsas” hissəsi saydığımız bir şeyi, məsələn, modal dialoqun “content” sahəsini və ya üç sütunlu düzəndə orta sütunu ötürmək istəyiriksə, bunu nested (daxili) sintaksislə edə bilərik:

```tsx
// before
<ModalDialog
 content={<SomeFormHere />}
 footer={<SubmitButton />}
/>
// after
<ModalDialog
 footer={<SubmitButton />}
>
 <SomeFormHere />
</ModalDialog>
```

ModalDialog baxımından etməli olduğumuz tək şey “content” prop-un adını “children” olaraq dəyişdirməkdir:

```tsx
const ModalDialog = ({ children, footer }) => {
 return (
 <div className="dialog">
 <div className="content">{children}</div>
 <div className="footer">{footer}</div>
 </div>
 );
};
```

Interactive example and full code
https://advanced-react.com/examples/03/04

Həmişə yadında saxla: bu kontekstdə “children” sadəcə bir prop-dur, və “nested” sintaksisi yalnız bunun üçün sintaksis şəkəridir!

Şərti render və performans
Bəzən bu pattern ilə bağlı ən böyük narahatlıqlardan biri onun performansıdır. Bu ironikdir, çünki əvvəlki fəsildə bu pattern-dən performansı yaxşılaşdırmaq üçün necə istifadə ediləcəyini müzakirə etmişdik. Bəs nə baş verir?

Tutaq ki, elementləri prop kimi qəbul edən komponenti şərti olaraq render edirik. Məsələn, bizim ModalDialog, adətən yalnız isDialogOpen dəyişəni true olduqda render ediləcək:

```tsx
const App = () => {
 const [isDialogOpen, setIsDialogOpen] = useState(false);
 // when is this one going to be rendered?
 const footer = <Footer />;
 return isDialogOpen ? (
 <ModalDialog footer={footer} />
 ) : null;
};
```

Burada, hətta çox təcrübəli developerlərin da bəzən çaşdığı sual belədir: biz Footer-i dialoqdan əvvəl elan edirik. Dialoq hələ bağlıdır və bir müddət açılmayacaq (bəlkə də heç vaxt). Bu o deməkdir ki, footer həmişə render olunacaq, hətta dialoq ekranda olmasa belə? Performans baxımından nə baş verir? Bu App komponentini yavaşlatmayacaqmı?

Xoşbəxtlikdən, burada narahat olmağa ehtiyac yoxdur. Yadınızdadırsa, 2-ci fəsildə – “Elements, children as props, and re-renders” – Elementin nə olduğunu müzakirə etmişdik. Footer dəyişənini elan etdiyimiz zaman (footer = <Footer />) etdiyimiz tək şey bir Element yaratmaq idi, başqa heç nə yox.

React və kod baxımından bu, yaddaşda sakitcə dayanan və heç nə etməyən bir obyekt kimi görünür. Obyekt yaratmaq isə ucuzdur (ən azı komponentləri render etməklə müqayisədə).

Bu Footer faktiki olaraq yalnız onu bir komponentin return obyektinə daxil etdikdə render olunacaq, daha əvvəl deyil. Bizim nümunədə bu, ModalDialog komponenti olacaq. <Footer /> elementi App-də yaradıldığı faktı əhəmiyyət daşımır. ModalDialog onu götürəcək və faktiki olaraq qaytaracaq:

```tsx
const ModalDialog = ({ children, footer }) => {
 return (
 <div className="dialog">
 <div className="content">{children}</div>
 {/* Whatever is coming from footer prop is going to be
rendered only when this entire component renders */}
 {/* not sooner */}
 <div className="footer">{footer}</div>
 </div>
 );
};
```

Bu, React router-in bəzi versiyalarındakı kimi routing nümunələrinin tamamilə təhlükəsiz olmasını təmin edir:

```tsx
const App = () => {
 return (
 <>
 <Route path="/some/path" element={<Page />} />
 <Route path="/other/path" element={<OtherPage />} />
 ...
 </>
 );
};
```

Burada heç bir şərt yoxdur, ona görə də elə gəlir ki, App həm <Page />, həm də <OtherPage /> komponentlərini eyni zamanda idarə edir və göstərir. Amma belə deyil. App yalnız həmin səhifələri təsvir edən kiçik obyektlər yaradır. Əsl render yalnız Route komponentindəki path URL ilə uyğun gəldikdə və element prop qaytarıldıqda baş verəcək.

Gəlin düyməmiz və onun ikonları haqqında bir az daha danışaq.

Bu ikonları props olaraq ötürməyə qarşı çıxan arqumentlərdən biri budur ki, bu pattern çox çevikdir. ThreeColumnsLayout komponenti üçün solColumn prop-da hər şeyi qəbul etmək problem deyil. Amma Button üçün belə deyil – həqiqi dünyada Button ikonlar üzərində müəyyən dərəcədə nəzarətə sahib olmalıdır. Məsələn, əgər düymənin isDisabled xassəsi varsa, ikon da “disabled” görünməlidir. Böyük düymələr üçün ikonlar da böyük olmalıdır. Mavi düymələr üçün ikonlar ağ, ağ düymələr üçün isə qara olmalıdır.

Əgər implementasiyanı indiki kimi buraxsaq, bu problem yaradacaq: bütün bunları xatırlamaq Button-un istifadəçilərinə düşəcək.

```tsx
// primary button should have white icons
<Button appearance="primary" icon={<Loading color="white" />} />
// secondary button should have black icons
<Button appearance="secondary" icon={<Loading color="black" />} />
// large button should have large icons
<Button size="large" icon={<Loading size="large" />} />
```

Yarım vaxt unutulur, yarısı isə səhv başa düşülür.

Burada lazım olan, Button-un idarə edə biləcəyi bəzi ikonlar üçün standart (default) dəyərlər təyin etməkdir, eyni zamanda pattern-in çevikliyini qorumaq.

Xoşbəxtlikdən bunu etmək mümkündür. Yadda saxlayın ki, props içindəki ikonlar sadəcə müəyyən və proqnozlaşdırıla bilən obyektlərdir. React isə bu obyektlərlə asanlıqla işləməyə imkan verən API-lərə malikdir. Bizim nümunədə, React.cloneElement funksiyasından istifadə edərək ikonun klonunu yarada bilərik və həmin yeni elementə istədiyimiz props-ları təyin edə bilərik. Beləliklə, heç nə bizə mane olmur: default ikon props-ları yaradıb, onları orijinal ikonun props-ları ilə birləşdirə və klonlanmış ikona təyin edə bilərik.

```tsx
const Button = ({ appearance, size, icon }) => {
 // create default props
 const defaultIconProps = {
 size: size === 'large' ? 'large' : 'medium',
 color: appearance === 'primary' ? 'white' : 'black',
 };
 const newProps = {
 ...defaultIconProps,
 // make sure that props that are coming from the icon override
//default if they exist
 ...icon.props,
 };
 // clone the icon and assign new props to it
 const clonedIcon = React.cloneElement(icon, newProps);
 return <button>Submit {clonedIcon}</button>;
};
```

Və indi, bütün Button ilə ikon nümunələrimiz sadəcə buna qədər sadələşdiriləcək:

```tsx
// primary button will have white icons
<Button appearance="primary" icon={<Loading />} />
// secondary button will have black icons
<Button appearance="secondary" icon={<Loading />} />
// large button will have large icons
<Button size="large" icon={<Loading />} />
```

Interactive example and full code
https://advanced-react.com/examples/03/05

Heç bir əlavə prop yoxdur, yalnız indi düymə tərəfindən idarə olunan standart prop-lar! Və əgər kiməsə həqiqətən standart dəyəri dəyişdirmək lazım olsa, bunu hələ də edə bilər: adi qaydada prop-u ötürməklə.

```tsx
// override the default black color with red icons
<Button
 appearance="secondary"
 icon={<Loading color="red" />}
/>
```

Əslində, Button-un istifadəçiləri standart prop-lardan xəbərdar belə olmayacaqlar. Onlar üçün ikon sadəcə sehrli şəkildə işləyəcək.

Niyə standart dəyərlərlə həddən artıq “çılğınlaşmamalıyıq”
Sehrdən danışarkən: standart dəyərlərin təyin olunmasının sanki sehrli işləməsi böyük bir çatışmazlıq ola bilər. Buradakı ən böyük problem odur ki, prop-ları düzgün şəkildə dəyişdirmədən asanlıqla səhv etmək mümkündür. Məsələn, əgər mən standart prop-ları əsl prop-larla əvəz etmədən birbaşa təyin etsəm:

```tsx
const Button = ({ appearance, size, icon }) => {
 // create default props
 const defaultIconProps = {
 size: size === 'large' ? 'large' : 'medium',
 color: appearance === 'primary' ? 'white' : 'black',
 };
 // clone the icon and assign the default props to it - don't do
//that!
 // it will override all the props that are passed to the icon
//from the outside!
 const clonedIcon = React.cloneElement(
 icon,
 defaultIconProps
 );
 return <button>Submit {clonedIcon}</button>;
};
```

Əsasən, ikonun API-sini məhv etmiş olacağam. İnsanlar ona fərqli ölçü və ya rəng prop-ları göndərməyə çalışacaqlar, amma bu heç vaxt məqsədə çatmayacaq:

```tsx
// color "red" won't work here - I never passed those props to the
//cloned icon
<Button appearance="secondary" icon={<Loading color="red" />} />
// but if I just render this icon outside the button, it will work
<Loading color="red" />
```

Interactive example and full code
https://advanced-react.com/examples/03/06

Hər kəsə uğurlar, xüsusilə də niyə ikonun rəngini düymədən kənarda təyin etməyin problemsiz işlədiyini, amma əgər ikon bu prop kimi ötürülürsə işləmədiyini anlamağa çalışanlara.

Bu səbəbdən bu nümunə ilə çox diqqətli olun və həmişə default prop-ları faktiki prop-larla əvəz etdiyinizə əmin olun. Əgər buna narahatlıq hiss edirsinizsə, narahat olmayın. React-də eyni nəticəyə çatmaq üçün milyonlarla yol var. Bu halda çox faydalı ola biləcək başqa bir nümunə də var: **render props**. Bu həmçinin faydalıdır, əgər ikonun prop-larını düymənin vəziyyətinə əsaslanaraq hesablamaq və ya sadəcə həmin vəziyyəti ikona geri ötürmək lazım olarsa. Növbəti fəsil tam olaraq bu nümunədən bəhs edir.

Əsas məqamlar
Render Props nümunəsinə keçməzdən əvvəl xatırlayaq:

Bir komponent başqa bir komponenti render edərkən, onun konfiqurasiyası prop-larla idarə olunursa, bütün komponent elementini prop kimi ötürə bilərik və konfiqurasiya məsələlərini istifadəçiyə buraxarıq.

```tsx
const Button = ({ icon }) => {
 return <button>Submit {icon}</button>;
};
// large red Error icon
<Button icon={<Error color="red" size="large" />} />;
```

Əgər elementi prop kimi qəbul edən bir komponent şərti olaraq render edilirsə, həmin elementlər şərt daxilində yaradılmasalar belə, yalnız şərti komponent render edildikdə göstəriləcəklər.

```tsx
const App = () => {
 // footer will be rendered only when the dialog itself renders
 // after isDialogOpen is set to "true"
 const footer = <Footer />;
 return isDialogOpen ? (
 <ModalDialog footer={footer} />
 ) : null;
};
```

Əgər prop-dan gələn elementə defolt dəyərlər vermək lazımdırsa, bunun üçün `cloneElement` funksiyasından istifadə edə bilərik. Lakin bu pattern çox həssasdır və orada səhv etmək çox asandır, ona görə yalnız çox sadə hallarda istifadə edin.

# Fəsil 4. Render props ilə irəli səviyyəli konfiqurasiya

Əvvəlki fəsildə biz elastiklik, komponentlərin konfiqurasiyası, bunu həll etmək üçün elementləri prop kimi necə ötürmək və onlar üçün defolt dəyərləri necə təyin etmək barədə danışdıq. Amma elementləri prop kimi istifadə etmək, nə qədər güclü olsa da, hər şeyi həll etmir. Əgər digər komponentləri prop vasitəsilə qəbul edən bir komponent onların prop-larına təsir etməli və ya onlara müəyyən vəziyyəti açıq, “sehrsiz” bir yolla ötürməlidirsə, onda elementlər prop kimi və **cloneElement** funksiyası burada kömək etmir.

Məhz burada **"render props"** adlanan pattern çox yararlı olur.

Bu fəsildə sən öyrənəcəksən:

- Render props pattern-in nə olduğunu və hansı konfiqurasiya problemlərini həll etdiyini, amma elementləri prop kimi istifadə etməklə həll edə bilmədiyimizi.
- Render props ilə vəziyyətə sahib məntiqi (stateful logic) necə paylaşmağı və “children as render props”un necə göründüyünü.
- Hooks mövcud olduğu halda, niyə bu günlərdə bunu əslində etməməli olduğumuzu.
- Render props ilə məntiq paylaşma pattern-inin hələ də faydalı ola biləcəyi halları, hətta hooks dövründə də.

Problem

Budur, əvvəlki fəsildə hazırladığımız **Button** komponenti:

```tsx
const Button = ({ appearance, size, icon }) => {
 // create def
 const defaultIconProps = {
 size: size === 'large' ? 'large' : 'medium',
 color: appearance === 'primary' ? 'white' : 'black',
 };
 const newProps = {
 ...defaultIconProps,
 // make sure that props that are coming from the icon override
//default if they exist
 ...icon.props,
 };
 // clone the icon and assign new props to it
 const clonedIcon = React.cloneElement(icon, newProps);
 return (
 <button className={`button ${appearance}`}>
 Submit {clonedIcon}
 </button>
 );
};
```

**Button** ikona **Element** qəbul edir və onun `size` və `color` prop-larını defolt olaraq təyin edir.

Bu yanaşma sadə hallarda yaxşı işləyir, amma daha mürəkkəb situasiyalar üçün o qədər də uyğun deyil.

Məsələn: əgər mən **Button**-a müəyyən bir state əlavə etmək və bu state-i **Button**-un istifadəçilərinə açıq saxlamaq istəsəm necə olsun?

— məsələn, hover zamanı ikonanı dəyişmək.

Bu state-i button daxilində implementasiya etmək kifayət qədər asandır:

```tsx
const Button = ({ ... }) => {
 const [isHovered, setIsHovered] = useState();
 return <button onMouseOver={() => setIsHovered(true)} />
}
```

Amma sonra nə olacaq? Bu state-i ikon ilə necə paylaşacağıq?

Bu yanaşmanın digər bir problemi isə ondan ibarətdir ki, biz **icon** propu vasitəsilə gələn **Element** haqqında böyük fərziyyələr edirik. Biz gözləyirik ki, onun ən azı **size** və **color** propları olsun. Bəs əgər biz ikonlar üçün başqa bir kitabxana istifadə etmək istəsək və həmin ikonların bu propları olmasa? O halda bizim default props məntiqimiz işləməyəcək və onu düzəltməyin heç bir yolu olmayacaq.

### Render props ilə Element-lərin render olunması

Xoşbəxtlikdən, daha əvvəl qeyd etdiyim kimi, React-də eyni problemi həll etməyin bir milyon yolu var. Bu halda, elementləri prop kimi ötürmək əvəzinə, biz onları render prop (və ya render funksiyası) kimi ötürə bilərik. **Render prop** sadəcə olaraq bir **Element qaytaran funksiya**dan başqa bir şey deyil. Bu funksiya demək olar ki, bir **Component** kimidir. Sadəcə fərq ondadır ki, Component-i birbaşa çağırmırsan – React özü çağırır. Amma render funksiyası isə sənin idarəndədir.

Button və onun icon-u nümunəsində, render funksiyası ilə bu belə görünəcək:

```tsx
// instead of "icon" that expects an Element
// we're receiving a function that returns an Element
const Button = ({ renderIcon }) => {
 // and then just calling this function where the icon should be
 //rendered
 return <button>Submit {renderIcon()}</button>;
};
```

Biz **renderIcon** funksiyasını qəbul edirik və sadəcə onu icon-un göstərilməli olduğu yerdə çağırırıq.

Sonra isə, istifadəçi tərəfində (consumer side), icon-u birbaşa ötürmək əvəzinə, onu qaytaran funksiyanı ötürürük:

```tsx
<Button renderIcon={() => <HomeIcon />} />
```

Və biz hələ də həmin icon-u öz ehtiyaclarımıza uyğunlaşdıra bilərik, əlbəttə ki, adi **Element** kimi:

```tsx
// red icon
<Button renderIcon={() => <HomeIcon color="red" /> } />
// large icon
<Button renderIcon={() => <HomeIcon size="large" /> } />
```

Bəs bu funksiyanı istifadə etməyin məqsədi nədir? Əvvəlcə, icon-ların **props**-ları. İndi isə, elementləri klonlamaq əvəzinə, ki bu da bir qədər problemli üsuldur, sadəcə obyekti funksiyaya ötürə bilərik:

```tsx
const Button = ({ appearance, size, renderIcon }) => {
 // create default props as before
 const defaultIconProps = {
 size: size === 'large' ? 'large' : 'medium',
 color: appearance === 'primary' ? 'white' : 'black',
 };
 // and just pass them to the function
 return (
 <button>Submit {renderIcon(defaultIconProps)}</button>
 );
};
```

Və sonra, icon tərəfdə, bu props-ları qəbul edib icon üzərinə yaymaq (spread) edə bilərik:

```tsx
<Button renderIcon={(props) => <HomeIcon {...props} />} />
```

Onlardan bəzilərini dəyişdirə bilərik:

```tsx
<Button
 renderIcon={(props) => (
 <HomeIcon {...props} size="large" color="red" />
 )}
/>
```

Və ya onları ikonumuzun əslində qəbul etdiyi prop-lara çevirə bilərik:

```tsx
<Button
 renderIcon={(props) => (
 <HomeIcon
 fontSize={props.size}
 style={{ color: props.color }}
 />
 )}
/>
```

Interactive example and full code
https://advanced-react.com/examples/04/01

Hər şey açıq-aydındır və heç nə gizli bir sehrlə üst-üstə düşmür. Verilənlərin axını, biraz dolaşıq olsa da, görünür və izlənilə bilər.

!image.png

State paylaşılması da artıq problem deyil. Sadəcə olaraq, həmin state dəyərini ikonaya ötürdüyümüz obyektə birləşdirə bilərik.

```tsx
const Button = ({ appearance, size, renderIcon }) => {
 const [isHovered, setIsHovered] = useState(false);
 const iconParams = {
 size: size === 'large' ? 'large' : 'medium',
 color: appearance === 'primary' ? 'white' : 'black',
 // add state here - it's just an object after all
 isHovered,
 }
 return <button ...>Submit {renderIcon(iconParams)}</button>
}
```

Və ya bir az daha mürəkkəb yanaşma tətbiq edib, onu ikinci arqument kimi ötürərək state və prop-ları açıq şəkildə ayıra bilərik. Hansı üsul bizim kod bazamız üçün mənalıdırsa, onu istifadə edə bilərik.

```tsx
const Button = ({ appearance, size, renderIcon }) => {
 const [isHovered, setIsHovered] = useState(false);
 const iconParams = {
 size: size === 'large' ? 'large' : 'medium',
 color: appearance === 'primary' ? 'white' : 'black',
 }
 // pass state here as a second argument
 return <button ...>Submit {renderIcon(iconParams, { isHovered })}
</button>
}
```

Və sonra ikon tərəfdə, həmin hover vəziyyəti ilə istədiyimiz hər şeyi edə bilərik. Məsələn, başqa bir ikon render edə bilərik:

```tsx
const icon = (props, state) => state.isHovered ? <HomeIconHovered
{...props} /> : <HomeIcon {...props} />
<Button renderIcon={icon} />
```

Fərqli bir className tətbiq etmək:

```tsx
const icon = (props, state) => <HomeIcon {...props} className=
{state.isHovered ? 'hovered' : ''} />
<Button renderIcon={icon} />
```

Və ya onu tamamilə nəzərə almamaq.

Interactive example and full code
https://advanced-react.com/examples/04/02

Stateful loqikanı paylaşmaq: render props kimi children

Render props-un başqa faydalı tətbiqi komponentlər arasında stateful loqikanı paylaşmaqdır və bu adətən "children as props" nümunəsi ilə birlikdə istifadə olunur. Əvvəlki fəsildə müzakirə edildiyi kimi, HTML-ə oxşar nested sintaksis kimi istifadə olunan "children" heç bir şeydən başqa bir prop deyil:

```tsx
<Parent>
 <Child />
</Parent>
// exactly the same as above
<Parent children={<Child />} />
```

Beləliklə, heç nə bizə children-i funksiyaya çevirməyə mane olmur. Hətta onu `render` ilə prefixləməyə ehtiyac yoxdur. `renderSomething` sadəcə adlandırma konvensiyasıdır.

```tsx
// make it a function
<Parent children={() => <Child />} />
```

Və Parent komponentində onu hər hansı digər render prop kimi çağıra bilərsiniz:

```tsx
const Parent = ({ children }) => {
 // it's just a function that returns an element, just call it
//here
 return children();
};
```

Gözəl, iç-içə (nested) JSX sintaksisi ilə bu da işləyəcək:

```tsx
<Parent>{() => <Child />}</Parent>
```

Interactive example and full code
https://advanced-react.com/examples/04/03

Niyə faydalı ola bilər? Məsələn, təsəvvür edin ki, siz bir "ölçü dəyişimi detektoru" (resize detector) komponenti hazırlayırsınız. Bu komponent brauzer pəncərəsindəki ölçü dəyişikliklərini izləyir:

```tsx
const ResizeDetector = () => {
 const [width, setWidth] = useState();
 useEffect(() => {
 const listener = () => {
 const width = window.innerWidth;
 setWidth(width)
 }
 window.addEventListener("resize", listener);
 // the rest of the code
 }, [])
 return ...
}
```

Və siz bunu ümumi hala gətirmək istəyirsiniz ki, tətbiqin müxtəlif komponentləri pəncərənin enini izləyə bilsin, hər yerdə həmin kodu yazmaq məcburiyyətində qalmadan. Beləliklə, `ResizeDetector` bu vəziyyəti digər komponentlərlə paylaşmalıdır. Texniki baxımdan bunu props vasitəsilə edə bilərik, sadəcə detector-a `onWidthChange` prop əlavə etməklə:

```tsx
const ResizeDetector = ({ onWidthChange }) => {
 const [width, setWidth] = useState();
 useEffect(() => {
 const listener = () => {
 const width = window.innerWidth;
 setWidth(width);
 // trigger onWidthChange prop here
 onWidthChange(width);
 }
 window.addEventListener("resize", listener);
 // the rest of the code
 }, [])
 return ...
}
```

Amma bu o deməkdir ki, bu komponenti istifadə etmək istəyən hər hansı bir komponent öz vəziyyətini (state) idarə etməli olacaq:

```tsx
const Layout = () => {
 const [windowWidth, setWindowWidth] = useState(0);
 return (
 <>
 <ResizeDetector onWidthChange={setWindowWidth} />
 {windowWidth > 600 ? (
 <WideLayout />
 ) : (
 <NarrowLayout />
 )}
 </>
 );
};
```

Bir az qarışıqdır.

Bunun əvəzinə edə biləcəyimiz şey, `ResizeDetector`-u `children` olaraq funksiya qəbul etməsi və həmin eni (`width`) birbaşa `children`-a ötürməsidir:

```tsx
const ResizeDetector = ({ children }) => {
 const [width, setWidth] = useState();
 // same code as before
 // pass width to children
 return children(width);
};
```

Beləliklə, həmin enə ehtiyacı olan hər bir komponent onu əlavə state yaratmadan birbaşa istifadə edə bilər:

```tsx
const Layout = () => {
 return (
 <ResizeDetector>
 {(windowWidth) => {
 // no more state! Get it directly from the resizer
 return windowWidth > 600 ? (
 <WideLayout />
 ) : (
 <NarrowLayout />
 );
 }}
 </ResizeDetector>
 );
};
```

Interactive example and full code
https://advanced-react.com/examples/04/04

Əsl həyatda, əlbəttə ki, burada bir re-render problemi yaranacaq: hər en dəyişdikdə state yeniləmələri tetiklenir. Beləliklə, ya layout-u detector daxilində hesablamaq, ya da debounce tətbiq etmək lazım gələcək. Amma state paylaşma prinsipi eyni qalır.

Həmçinin, müasir kodda, ehtimal ki, bunu ümumiyyətlə istifadə etməzdik, çünki…

Son iki ildə React ilə kod yazan hər kəs indi belə düşünür: "Bəs, nə üçün belə mürəkkəb bir şey edirsiniz, halbuki state paylaşılımı üçün hooks var?"

Və tamamilə haqlısınız! Hooks bu pattern-i təxminən 99% hallarda əvəz etdi. Və bu haqlıdır. Eyni istifadə halı hooks ilə belə yenidən yazıla bilər:

```tsx
const useResizeDetector = () => {
 const [width, setWidth] = useState();
 useEffect(() => {
 const listener = ()
 const width = ... // get window width here
 setWidth(width);
 }
 window.addEventListener("resize", listener);
 // the rest of the code
 }, [])
 return width;
}
```

Sadəcə ResizeDetector komponentinin bütün məntiqini bir hook-a çıxarın və sonra onu hər yerdə istifadə edin:

```tsx
const Layout = () => {
 const windowWidth = useResizeDetector();
 return windowWidth > 600 ? (
 <WideLayout />
 ) : (
 <NarrowLayout />
 );
};
```

Interactive example and full code
https://advanced-react.com/examples/04/05

Az kod, və baş verənləri anlamaq çox daha asandır.

Bəs bu pattern-ni niyə öyrənməliyik? Bir neçə səbəb var:

- Başlanğıcda izah olunan konfiqurasiya və elastiklik üçün render props istifadə hallar hələ də çox əlverişlidir.
- Əgər bir neçə illik layihə üzərində işləyirsinizsə, bu pattern kod bazasında çox geniş istifadə olunub. Hooks daxil olmadan əvvəl xüsusilə formaların doğrulama məntiqini kapsullaşdırmaq üçün çox populyar idi. Hələ də bir neçə məşhur kitabxana bu pattern-dən istifadə edir.
- Bu pattern müəyyən spesifik hallar üçün hələ də faydalı ola bilər, məsələn, paylaşmaq istədiyiniz məntiq və state bir DOM elementi ilə bağlı olduqda.
- Son istifadə nümunəsinə çox yayılmış bir misal sahədə scroll-u izləməkdir.

```tsx
const ScrollDetector = ({ children }) => {
 const [scroll, setScroll] = useState();
 return (
 <div
 onScroll={(e) => setScroll(e.currentTarget.scrollTop)}
 >
 {children}
 </div>
 );
};
```

Əvvəlki vəziyyətlə tam eyni: bir dəyəriniz var və onu digər komponentlərlə paylaşmaq istəyirsiniz. Props burada yenə qarışıq olar.

Və bunu hook-a çıxarmaq əvvəlki kimi sadə olmayacaq: bu dəfə `onScroll` listener-i `window` deyil, bir `div`-ə əlavə etməlisiniz. Beləliklə, ya bir Ref yaratmalı və onu ötürməlisiniz (Refs haqqında daha ətraflı Chapter 9-da “Refs: məlumat saxlama-dan imperativ API-yə” bölməsində). Ya da sadəcə render prop pattern-dən istifadə edə bilərsiniz:

```tsx
const ScrollDetector = ({ children }) => {
 const [scroll, setScroll] = useState();
 return (
 <div
 onScroll={(e) => setScroll(e.currentTarget.scrollTop)}
 >
 {children(scroll)}
 </div>
 );
};
```

Və istifadə edin orada, istifadəçinin nə qədər scroll etdiyinə əsaslanaraq bir şey etmək lazım olduqda:

```tsx
const Layout = () => {
 return (
 <ScrollDetector>
 {(scroll) => {
 return <>{scroll > 30 ? <SomeBlock /> : null}</>;
 }}
 </ScrollDetector>
 );
};
```

Interactive example and full code
https://advanced-react.com/examples/04/06

Əsas nəticələr

Ümid edirəm ki, bütün bunlar başa düşüləndir və bu nümunə indi aydın görünür. Bu fəsildən yadda saxlamağa dəyər bir neçə məqam:

Əgər elementləri prop kimi qəbul edən komponent həmin elementlərin prop-larına nəzarət etmək və ya onlara

```tsx
const Button = ({ renderIcon }) => {
 const [someState, setSomeState] = useState()
 const someProps = { ... };
 return <button>Submit {renderIcon(someProps, someState)}
</button>;
};
<Button renderIcon={(props, state) => <IconComponent {...props}
someProps={state} /> } />
```

“Children” də render prop ola bilər, o cümlədən “nested” (daxili) sintaksis istifadə edərək.

```tsx
const Parent = ({ children }) => {
 return children(somedata);
};
```

Render props komponentlər arasında state-lə bağlı məntiqi paylaşmaq lazım olduqda çox faydalı idi, üstə qaldırmadan.

Amma hooks bu istifadə halını 99% hallarda əvəz etdi.

State-lə bağlı məntiqi və məlumatı paylaşmaq üçün render props bu gün də faydalı ola bilər, məsələn, bu məntiq bir DOM elementinə bağlı olduqda.

5-ci fəsil. `useMemo`, `useCallback` və `React.memo` ilə Memoizasiya

İndi ən vacib kompozisiya nümunələrini və onların necə işlədiyini bildiyimizə görə, performans mövzusuna bir az daha dərindən baxmaq vaxtıdır. Daha dəqiq desək, React-da performansı yaxşılaşdırmaqla sıx bağlı olan, amma əslində biz gözlədiyimiz kimi işləməyən bir mövzunu müzakirə edək: Memoizasiya. Sevimli `useMemo` və `useCallback` hook-larımız və `React.memo` yüksək səviyyəli komponentimiz.

Və mən bunu şişirdərək demirəm – memoizasiyanı düzgün etmək çətindir, göründüyündən də çox çətindir. Bu fəslin sonunda ümid edirəm ki, mənimlə razılaşacaqsınız. Burada öyrənəcəksiniz:

- Memoizasiya ilə həll etməyə çalışdığımız problem nədir (və bu, əslində performans deyil!).
- `useMemo` və `useCallback` hook-ları daxildə necə işləyir və onların fərqi nədir.
- Bir komponentdə props-u memoizasiya etmək niyə anti-pattern hesab olunur.
- `React.memo` nədir, niyə lazımdır və onu uğurla istifadə etməyin əsas qaydaları hansılardır.
- "Elements as children" nümunəsində onu düzgün istifadə etmə üsulları.
- Bahalı hesablamalarda `useMemo`nun rolu nədir.

Problem: dəyərlərin müqayisəsi

Bütün məsələ JavaScript-də dəyərlərin müqayisəsindədir. Primitive (əsas) dəyərləri, məsələn, string və ya boolean-ları onların əsl dəyəri ilə müqayisə edirik:

```tsx
const a = 1;
const b = 1;
a === b; // will be true, values are exactly the same
```

Obyektlər və obyektlərdən törəyən hər hansı şeylər (məsələn, massivlər və ya funksiyalar) fərqli bir vəziyyətdir.

Bir obyektlə dəyişən yaratdığımız zaman, məsələn `const a = { id: 1 }`, orada saxlanılan dəyər əsl dəyər deyil. Bu, yalnız həmin obyektin yerləşdiyi yaddaş hissəsinə bir referansdır. Başqa bir dəyişən eyni məlumatla yaradıldığında, məsələn `const b = { id: 1 }`, bu başqa bir yaddaş hissəsində saxlanacaq. Və çünki fərqli bir hissədir, ona istinad edən referans da fərqli olacaq.

Beləliklə, bu obyektlər eyni görünməsinə baxmayaraq, `a` və `b` dəyişənlərindəki dəyərlər fərqlidir: onlar yaddaşda fərqli obyektlərə işarə edirlər. Nəticədə, onların sadə müqayisəsi həmişə `false` qaytaracaq:

```tsx
const a = { id: 1 };
const b = { id: 1 };
a === b; // will always be false
```

`a === b` müqayisəsinin `true` qaytarması üçün `b` dəyişənindəki referansın `a` dəyişənindəki referansla **tamamilə eyni** olduğundan əmin olmalıyıq. Belə bir vəziyyət yaradılmalıdır:

```tsx
const a = { id: 1 };
const b = a;
a === b; // now will be true
```

React hər dəfə bir komponent yenidən render olunanda dəyərləri müqayisə etməli olduğu zaman bu vəziyyətlə üzləşir. Bu müqayisəni hər dəfə asılılıqları olan hook-lardan istifadə etdikdə edir, məsələn `useEffect` zamanı:

```tsx
const Component = () => {
 const submit = () => {};
 useEffect(() => {
 // call the function here
 submit();
 // it's declared outside of the useEffect
 // so should be in the dependencies
 }, [submit]);
 return ...
}
```

Bu nümunədə `submit` funksiyası `useEffect` hook-unun xaricində elan olunub. Beləliklə, əgər onu hook daxilində istifadə etmək istəyiriksə, asılılıq olaraq qeyd olunmalıdır. Amma `submit` funksiyası `Component` daxilində elan olunduğundan, `Component` hər dəfə re-render olunanda yenidən yaradılacaq.

Xatırlayın, Bölmə 2-də (Elements, children as props, and re-renders) müzakirə etdiyimiz kimi, re-render sadəcə React-in komponentin funksiyasını çağırmasıdır. Hər lokal dəyişən həmin zaman yenidən yaradılacaq, tam olaraq JavaScript-dəki digər funksiyalar kimi.

Beləliklə, React `submit` funksiyasını re-render əvvəl və sonra müqayisə edəcək ki, bu dəfə `useEffect` hook-unun işləməli olub olmadığını müəyyən etsin. Bu müqayisə hər zaman `false` qaytaracaq, çünki hər dəfə yeni bir referans yaranır. Nəticədə, `useEffect` hook hər re-render zamanı tətiklenəcək.

Buna qarşı mübarizə aparmaq üçün, re-renderlər arasında `submit` funksiyasının referansını qoruyacaq bir üsula ehtiyacımız var. Beləliklə, müqayisə `true` qaytaracaq və hook lazımsız yerə tetiklenməyəcək. İşdə burada `useMemo` və `useCallback` hook-ları işə düşür. Hər ikisi oxşar API-yə malikdir və oxşar məqsəd üçün istifadə olunur: bu hook-lara təyin olunmuş dəyişənin referansının yalnız hook-un asılılığı dəyişdikdə dəyişməsini təmin etmək.

Əgər `submit` funksiyasını `useCallback` ilə əhatə etsək:

```tsx
const submit = useCallback(() => {
 // no dependencies, reference won't change between re-renders
}, []);
```

Beləliklə, `submit` dəyişənindəki dəyər re-renderlər arasında eyni referans olacaq, müqayisə `true` qaytaracaq və ona asılı olan `useEffect` hook hər dəfə tetiklenməyəcək:

```tsx
const Component = () => {
 const submit = useCallback(() => {
 // submit something here
 }, [])
 useEffect(() => {
 submit();
 // submit is memoized, so useEffect won't be triggered on
//every re-render
 }, [submit]);
 return ...
}
```

Tam eyni vəziyyət `useMemo` üçün də keçərlidir, yalnız bu halda, yadda saxlamaq istədiyimiz funksiyanı geri qaytarmalıyıq:

```tsx
const submit = useMemo(() => {
 return () => {
 // this is out submit function - it's returned from the
//function that is passed to memo
 };
}, []);
```

Interactive example and full code
https://advanced-react.com/examples/05/01

Gördüyünüz kimi, API-də kiçik bir fərq var. `useCallback` yadda saxlamaq istədiyimiz funksiyanı birinci arqument kimi qəbul edir, `useMemo` isə bir funksiyanı qəbul edir və onun qaytarılan dəyərini yadda saxlayır.

Bu səbəbdən onların davranışında da kiçik fərq var. Hər iki hook bir funksiyanı birinci arqument kimi qəbul etdiyindən və biz bu funksiyaları React komponenti daxilində elan etdiyimizdən, hər re-render zamanı bu funksiyanın birinci arqument kimi yenidən yaradılması baş verir.

Bu normal JavaScript qaydasıdır, React ilə əlaqəsi yoxdur. Məsələn, bir funksiyanı elan edib ona başqa bir funksiyanı arqument kimi verirsinizsə və sonra onu bir neçə dəfə inline funksiyaları ilə çağırırsınızsa, həmin inline funksiya hər çağırışda sıfırdan yenidən yaradılacaq.

```tsx
// function that accepts a function as a first argument
const func = (callback) => {
 // do something with this callback here
};
// function as an argument - first call
func(() => {});
// function as an argument - second call, new function as an
//argument
func(() => {});
```

Və bizim hook-lar sadəcə React həyat dövrünə inteqrasiya olunmuş funksiyalardır, bundan başqa heç nə deyil.

Beləliklə, `useCallback` hook-un içində dəqiq eyni referansı qaytarmaq üçün React aşağıdakı kimi işləyir:

```tsx
let cachedCallback;
const func = (callback) => {
 if (dependenciesEqual()) {
 return cachedCallback;
 }
 cachedCallback = callback;
 return callback;
};
```

O, arqument kimi verilən ilk funksiyanı yaddaşa alır və hook-un asılılıqları dəyişməyibsə, hər dəfə sadəcə onu qaytarır. Əgər asılılıqlar dəyişibsə, yaddaşı yeniləyir və yenilənmiş funksiyanı qaytarır.

`useMemo` ilə vəziyyət demək olar ki, eynidir, yalnız funksiyanı qaytarmır, əvəzinə onu çağırır və nəticəsini qaytarır:

```tsx
let cachedResult;
const func = (callback) => {
 if (dependenciesEqual()) {
 return cachedResult;
 }
 cachedResult = callback();
 return cachedResult;
};
```

Həqiqi implementasiya  əlbəttə ki, bir az daha mürəkkəbdir, amma əsas ideya budur.

Bütün bunlar niyə vacibdir? Real dünya tətbiqlərində əsasən API fərqini başa düşməkdən başqa çox vacib deyil. Lakin bəzən belə bir fikir yaranır ki, `useMemo` performans üçün `useCallback`-dən daha yaxşıdır, çünki `useCallback` hər re-render zamanı funksiyanı yenidən yaradır, `useMemo` isə bunu etmir. Gördüyünüz kimi, bu doğru deyil. Hər iki halda arqument kimi verilən funksiya yenidən yaradılır.

Teorik olaraq vacib ola biləcək yeganə hal budur ki, birinci arqument kimi funksiyanın özü deyil, başqa bir funksiyanın icrasının nəticəsi inline olaraq verilsin. Məsələn:

```jsx
const submit = useCallback(something(), []);

```

Bu halda, `something` funksiyası hər re-render zamanı çağırılacaq, baxmayaraq ki, `submit` referansı dəyişməyəcək. Buna görə də bu funksiyalarda bahalı hesablamalardan çəkinin.

Antipattern: propsların memoizasiyası
Memoizasiyalı dəyərləri asılılıqlar kimi istifadə etdikdən sonra, memoizasiya hook-larının ikinci ən populyar istifadəsi onları props-lara ötürməkdir. Siz mütləq belə kodu görmüsünüz:

```tsx
const Component = () => {
 const onClick = useCallback(() => {
  // do something on click
 }, []);
 return <button onClick={onClick}>click me</button>;
};
```

Təəssüf ki, burada istifadə olunan useCallback sadəcə faydasızdır. Geniş yayılmış bir inanış var ki, hətta ChatGPT də buna inanır, yəni props-ları memoizə etmək komponentlərin re-render olunmasının qarşısını alır. Amma əvvəllki fəsillərdən artıq bilirik ki, əgər bir komponent re-render olunursa, həmin komponentin içindəki bütün komponentlər də re-render olunur.

Beləliklə, onClick funksiyamızı useCallback ilə bükməyimiz və ya etməməyimiz burada heç bir əhəmiyyət daşımır. Yalnız React-ə bir az daha çox iş gördürdük və kodumuzu bir qədər oxunması çətin etdik. Əgər yalnız bir useCallback varsa, o qədər də pis görünmür. Amma heç vaxt yalnız bir useCallback olmur, elə deyilmi? Daha sonra biri, sonra başqası gələcək, onlar bir-birinə bağlı olacaq, və bir də baxacaqsınız ki, app-dəki məntiq sadəcə useMemo və useCallback-in anlaşılmaz və debug edilməyən qarışıqlığının altında qalıb.

Həqiqətən props-ları memoizə etməyə ehtiyac olan yalnız iki əsas istifadə halı var. Birincisi, bu prop downstream komponentdə başqa bir hook-un asılılığı kimi istifadə olunursa.

```tsx
const Parent = () => {
 // this needs to be memoized!
 // Child uses it inside useEffect
 const fetch = () => {};
 return <Child onMount={fetch} />;
};
const Child = ({ onMount }) => {
 useEffect(() => {
 onMount();
 }, [onMount]);
};
```

Bu öz-özünə aydın olmalıdır: əgər qeyri-primitiv bir dəyər dependency-yə daxil olursa, o, re-renderlər arasında sabit bir referansa sahib olmalıdır, hətta prop zəncirindən gəlirsə belə.

İkincisi isə, komponent React.memo ilə büküldükdə baş verir.

React.memo və ya sadəcə memo, React-in bizə verdiyi çox faydalı bir utilitidir. O, komponentin özünü memoizasiya etməyə imkan verir. Əgər bir komponentin re-renderi yalnız valideynindən tetiklenirsə və bu komponent React.memo ilə bükülmüşdürsə, o zaman və yalnız o zaman React dayanar və props-larını yoxlayar. Əgər props-lardan heç biri dəyişməyibsə, komponent re-render olunmayacaq və re-render zənciri dayandırılacaq.

!image.png

Bu, yenidən React-in fəsildə əvvəlcə danışdığımız müqayisəni etdiyi haldır. Əgər props-lardan ən azı biri dəyişibsə, React.memo ilə bükülmüş komponent adi qaydada re-render olunacaq.

```tsx
const Child = ({ data, onChange }) => {};
const ChildMemo = React.memo(Child);
const Component = () => {
 // object and function declared inline
 // will change with every re-render
 return <ChildMemo data={{ ...some_object }} onChange={() =>
{...}} />
}
```

Və yuxarıdakı nümunədə, `data` və `onChange` inline olaraq elan edildiyindən, hər re-render zamanı dəyişəcəklər. Elə burada `useMemo` və `useCallback` işə yarayır.

```tsx
const Child = ({ data, onChange }) => {};
const ChildMemo = React.memo(Child);
const Component = () => {
 const data = useMemo(() => ({ ... }), []); // some object
 const onChange = useCallback(() => {}, []); // some callback
 // data and onChange now have stable reference
 // re-renders of ChildMemo will be prevented
 return <ChildMemo data={data} onChange={onChange} />
}
```

`data` və `onChange`-i memoizə etməklə, biz bu obyektlərin referanslarını re-render-lər arasında saxlayırıq. İndi, React `ChildMemo` komponentinin props-larını müqayisə etdikdə, yoxlama uğurla keçəcək və komponent yenidən render edilməyəcək.

Interactive example and full code
https://advanced-react.com/examples/05/02

Amma bütün props-ların memoizə olunduğundan əmin olmaq göründüyü qədər asan deyil. Biz bunu çox hallarda səhv edirik! Və yalnız bir kiçik səhv props yoxlamasının pozulmasına səbəb olur və nəticədə hər bir React.memo, useCallback və useMemo tamamilə faydasız olur.

# React.memo və props-dan gələn props-lar

Memoizasiyanın pozulmasının birinci və ən sadə halı props-ların başqa props-dan ötürülməsidir. Xüsusilə komponentlər arasında props-un spread olunması baş verirsə. Tutaq ki, sizdə belə bir komponent zənciri var:

```tsx
const Child = () => {};

const ChildMemo = React.memo(Child);

const Component = (props) => {
 return <ChildMemo {...props} />;
};

const ComponentInBetween = (props) => {
 return <Component {...props} />;
};

const InitialComponent = (props) => {
	 // this one will have state and will trigger re-render of
	//Component
	 return (
	 <ComponentInBetween {...props} data={{ id: '1' }} />
	 );
};
```

Sizcə, InitialComponent-ə əlavə məlumat əlavə etməli olanlar hər bir komponentin içindən, daha da dərinlərə gedərək, hansının React.memo ilə əhatə olunduğunu yoxlayacaq? Xüsusilə də bunların hamısı fərqli fayllarda yayılıbsa və implementasiyası kifayət qədər mürəkkəbdirsə — bu, demək olar ki, heç vaxt baş verməyəcək.

Nəticədə isə, InitialComponent ChildMemo komponentinin memoizasiyasını pozur, çünki ona memoizə edilməmiş `data` prop-u ötürür.

Interactive example and full code
https://advanced-react.com/examples/05/03

Beləliklə, əgər hər bir prop-un hər yerdə memoizə olunmasını təmin etməyə hazır və qadir deyilsinizsə, onda komponentlərdə React.memo funksiyasından istifadə müəyyən qaydalara tabe olmalıdır.

**Qayda 1:** başqa komponentlərdən gələn prop-ları heç vaxt spread (`...props`) etməyin.

Bunun əvəzinə:

```tsx
const Component = (props) => {
 return <ChildMemo {...props} />;
};
```

bu, aşağıdakı kimi açıq şəkildə olmalıdır:

```tsx
const Component = (props) => {
 return <ChildMemo some={prop.some} other={props.other} />;
};
```

Qayda 2: digər komponentlərdən gələn non-primitive props-ları ötürməkdən çəkinin
Yuxarıdakı kimi açıq yazılmış nümunə belə hələ də kifayət qədər kövrəkdir. Əgər həmin props-lardan hər hansı biri memoize olunmamış obyekt və ya funksiya olarsa, memoizasiya yenə də pozulacaq.

Qayda 3: custom hook-lardan gələn non-primitive dəyərləri ötürməkdən çəkinin.
Bu, çox qəbul olunmuş stateful məntiqi custom hook-lara çıxarma praktikasına bir az zidd kimi görünə bilər. Amma onların rahatlığı ikitərəfli qılıncdır: onlar əlbəttə ki, mürəkkəbliyi gizlədirlər, amma eyni zamanda verilənlərin və ya funksiyaların sabit reference-ə sahib olub-olmadığını da gizlədirlər.
Nümunəyə baxaq:

```tsx
const Component = () => {
 const { submit } = useForm();
 return <ChildMemo onChange={submit} />;
};
```

Submit funksiyası useForm adlı xüsusi hook-un içində gizlənib. Və hər bir xüsusi hook hər re-render zamanı işə düşəcək. Yuxarıdakı koddakı görünüşə əsasən həmin submit-i ChildMemo-ya ötürməyin təhlükəsiz olub-olmadığını deyə bilərsinizmi?
Xeyr, deyə bilməzsiniz. Və çox güman ki, bu, belə görünəcək:

```tsx
const useForm = () => {
 // lots and lots of code to control the form state
 const submit = () => {
 // do something on submit, like data validation
 };
 return {
 submit,
 };
};
```

submit funksiyasını ChildMemo-ya ötürməklə biz onun memoizasiyasını pozduq – artıq o, sanki React.memo ilə bükülməmiş kimi re-render olacaq.

Interactive example and full code
https://advanced-react.com/examples/05/04

Artıq bu pattern-in nə qədər kövrək olduğunu görürsən? Bu, daha da pisləşir.

### React.memo və children

Gəlin bu koda baxaq:

```tsx
const ChildMemo = React.memo(Child);
const Component = () => {
 return (
 <ChildMemo>
 <div>Some text here</div>
 </ChildMemo>
 );
};
```

Kifayət qədər sadə görünür: heç bir prop-u olmayan, içində sadəcə bir div render edən memoizə olunmuş komponent, düzdür? Amma burada memoizasiya yenidən pozulur və React.memo wrapper-i tamamilə faydasızdır.
Xatırla ki, biz bunu 2-ci fəsildə müzakirə etmişdik: Elementlər, children prop-u kimi və re-renderlər. Bu gözəl nested sintaksis sadəcə children prop-u üçün sintaksis şəkəridir. Mən bu kodu sadəcə belə yaza bilərəm:

```tsx
const Component = () => {
 return <ChildMemo children={<div>Some text here</div>} />;
};
```

və bu tam olaraq eyni cür davranacaq. Və biz bunu 2-ci fəsildə müzakirə etmişdik: Elementlər, children prop-u kimi və re-renderlər – hər bir JSX sadəcə React.createElement üçün sintaksis şəkəridir və əslində sadəcə bir obyekt deməkdir. Bu halda isə, bu "div" tipində bir obyekt olacaq:

```tsx
{
 type: "div",
 ... // the rest of the stuff
}
```

Beləliklə, burada memoizasiya və prop-lar baxımından əldə etdiyimiz şey odur ki, React.memo ilə bükülmüş bir komponentimiz var və onun içində memoizasiya olunmamış obyekt olan bir prop var!
Bunu düzəltmək üçün isə, həmin div-i də memoizasiya etməliyik:

```tsx
const Component = () => {
 const content = useMemo(
 () => <div>Some text here</div>,
 [],
 );
 return <ChildMemo children={content} />;
};
```

və ya, yenidən daha gözəl sintaksisə qayıdaq:

```tsx
const Component = () => {
 const content = useMemo(
 () => <div>Some text here</div>,
 []
 );
 return <ChildMemo>{content}</ChildMemo>;
};
```

Interactive example and full code
https://advanced-react.com/examples/05/05

Eyni hekayə render prop kimi children üçün də keçərlidir, yeri gəlmişkən.
Bu pozulacaq:

```tsx
const Component = () => {
 return (
 <ChildMemo>{() => <div>Some text here</div>}</ChildMemo>
 );
};
```

Buradakı children hər re-render zamanı yenidən yaradılan bir funksiyadır.
Onu da useMemo ilə yaddaşlaşdırmaq lazımdır:

```tsx
const Component = () => {
 const content = useMemo(
 () => () => <div>Some text here</div>,
 [],
 );
 return <ChildMemo>{content}</ChildMemo>;
};
```

Yaxud sadəcə useCallback istifadə etmək olar:

```tsx
const Component = () => {
 const content = useCallback(
 () => <div>Some text here</div>,
 [],
 );
 return <ChildMemo>{content}</ChildMemo>;
};
```

Interactive example and full code
https://advanced-react.com/examples/05/06

İndi tətbiqinizə baxın. Bunlardan neçəsi gözünüzdən qaçıb?

## React.memo və memoizə edilmiş children

(təxminən)
Əgər tətbiqinizi nəzərdən keçirdiniz, bütün bu nümunələri düzəltdiniz və memoizasiyanın indi yaxşı vəziyyətdə olduğuna əminsinizsə, tələsməyin. Həyat heç vaxt bu qədər asan olubmu! Bu haqda nə düşünürsünüz? Yaxşıdır, yoxsa pozulub?

```tsx
const ChildMemo = React.memo(Child);
const ParentMemo = React.memo(Parent);
const Component = () => {
 return (
 <ParentMemo>
 <ChildMemo />
 </ParentMemo>
 );
};
```

Hər ikisi memoizə edilib, deməli hər şey qaydasındadır, elə deyilmi? Yanlış.
ParentMemo elə davranacaq kimi, sanki React.memo ilə bükülməyib – onun uşaqları əslində memoizə olunmayıb!
Gəlin baş verənlərə daha yaxından baxaq. Bildiyimiz kimi,
Elementlər sadəcə React.createElement üçün sintaksis şəkəridir və bu, komponentə işarə edən type ilə bir obyekt qaytarır. Əgər mən <Parent /> Elementi yaratsaydım, bu belə olardı:

```tsx
{
 type: Parent,
 ... // the rest of React stuff
}
```

Memoizə edilmiş komponentlərlə vəziyyət tam eynidir. <ParentMemo /> elementi oxşar formaya malik bir obyektə çevriləcək. Yalnız "type" xüsusiyyəti ParentMemo haqqında məlumat saxlayacaq.
Və bu obyekt sadəcə bir obyektdir, özü memoizə olunmayıb. Yenə də, memoizasiya və props baxımından, bizdə children prop-u memoizə olunmamış obyektə sahib olan ParentMemo komponenti var. Beləliklə, ParentMemo-da memoizasiya pozulub.
Bunu düzəltmək üçün, obyektin özünü memoizə etməliyik:

```tsx
const Component = () => {
 const child = useMemo(() => <ChildMemo />, []);
 return <ParentMemo>{child}</ParentMemo>;
};
```

Və onda ChildMemo-ya ümumiyyətlə ehtiyacımız olmaya bilər. Təbii ki, bu, onun məzmunundan və niyyətlərimizdən asılıdır. Ən azı ParentMemo-nun yenidən render olunmasının qarşısını almaq məqsədilə, ChildMemo lazım deyil və o, sadəcə normal Child-a qayıda bilər:

```tsx
const Component = () => {
 const child = useMemo(() => <Child />, []);
 return <ParentMemo>{child}</ParentMemo>;
};
```

Interactive example and full code
https://advanced-react.com/examples/05/07

# useMemo və bahalı hesablamalar

Və useMemo üçün son, olduqca populyar performansla bağlı istifadə nümunəsi “bahalı hesablamaların” memoizə edilməsidir. Tırnaq işarəsində yazılıb, çünki əslində tez-tez səhv istifadə olunur.

Əvvəlcə, “bahalı hesablamа” nədir? Sətirləri birləşdirmək bahalıdırmı? Yoxsa 300 elementlik bir array-i sıralamaq? Və ya 5000 sözlü mətndə müntəzəm ifadəni işlətmək? Mən bilmirəm. Siz də bilmirsiniz. Heç kim də bilmir, əslində ölçülməyincə:

- istifadəçi bazanızı təmsil edən cihazda
- kontekstdə
- eyni vaxtda baş verən digər şeylərlə müqayisədə
- əvvələ və ya ideal vəziyyətə nisbətən
    
    Mənim noutbukda, hətta CPU 6 dəfə yavaşlamış olsa belə, 300 elementlik bir array-i sıralamaq 2ms-dən az vaxt aparır. Amma köhnə Android 2 mobil telefonda bu, bir saniyə çəkə bilər.
    

100ms çəkən bir mətndə müntəzəm ifadəni işlətmək yavaş görünür. Amma əgər bu, nadir hallarda, düyməyə kliklə işə düşürsə, məsələn, ayar ekranının dərinliklərindədirsə, demək olar ki, dərhal olur. 30ms çəkən bir müntəzəm ifadə kifayət qədər sürətli görünür. Amma əgər bu, əsas səhifədə hər siçan hərəkəti və ya scroll hadisəsində işə düşürsə, bağışlanmaz dərəcədə yavaşdır və təkmilləşdirilməlidir.
Həmişə kontekstdən asılıdır. “Əvvəl ölçün” prinsipi, bir şeyi useMemo ilə bükmək istəyi yarananda, “bahalı hesablamadır” düşüncəsi üçün standart yanaşma olmalıdır.

Düşünüləsi ikinci məsələ React-dir. Xüsusilə, komponentlərin render olunması ilə xam JavaScript hesablamalarını müqayisə edərkən. Çox güman ki, useMemo daxilində hesablanan hər şey real elementlərin yenidən render olunmasından qat-qat daha sürətli olacaq. Məsələn, mənim noutbukda 300 elementlik array-i sıralamaq 2ms-dən az vaxt aldı. Amma həmin array-dən list elementlərini yenidən render etmək, hətta sadə düymələr və bir az mətn olsa belə, 20ms-dən çox çəkdi. Əgər həmin komponentin performansını artırmaq istəyirəmsə, ən yaxşı yol, 2ms-dən az vaxt aparan bir şeyi memoizə etmək deyil, hər şeyin lazımsız yenidən render olunmasını aradan qaldırmaq olardı.

Beləliklə, memoizasiya ilə bağlı “əvvəl ölçün” qaydasına əlavə olaraq belə bir prinsip də olmalıdır: “komponent elementlərinin yenidən render olunmasının nə qədər vaxt apardığını da ölçməyi unutmayın.” Və əgər hər JavaScript hesablamasını useMemo ilə büküb 10ms qazanırsınızsa, amma real komponentlərin yenidən render olunması hələ də təxminən 200ms çəkirsə, bunun mənası nədir? Yalnız kodu mürəkkəbləşdirir, amma heç bir görünən fayda vermir.

Və nəhayət, useMemo yalnız yenidən renderlər üçün faydalıdır. Məqsədi və işləmə prinsipi budur. Əgər komponentiniz heç vaxt yenidən render olunmursa, useMemo heç bir iş görmür.

Heç olmasa deyil, amma bu, React-i ilkin render zamanı əlavə iş görməyə məcbur edir. Unutmayın: useMemo hook-u ilk dəfə işlədikdə, komponent ilk dəfə mount olunduqda, React onu cache etməlidir. Bunun üçün bir az yaddaş və hesablama gücü istifadə olunacaq, halbuki başqa halda bu pulsuz olardı. Təbii ki, yalnız bir useMemo ilə təsir ölçülməz olacaq. Amma böyük tətbiqlərdə, yüzlərlə useMemo hər tərəfə səpələnmişsə, bu, ilkin renderi ölçülə biləcək dərəcədə yavaşlada bilər. Nəticədə bu, “min kəsiklə ölüm” olacaq.

Əsas məqamlar

Bax, bu bir az ürəksizdir. Bütün bunlar o deməkdirmi ki, memoizasiyadan istifadə etməməliyik? Heç də yox. Bu, performans mübarizəmizdə çox dəyərli bir alət ola bilər. Amma ətrafındakı çoxsaylı qeydləri və mürəkkəblikləri nəzərə alaraq, mən əvvəlcə kompozisiya əsaslı optimizasiya texnikalarından mümkün qədər istifadə etməyi tövsiyə edərdim. React.memo yalnız bütün digər üsullar uğursuz olduqda son çarə olmalıdır.

Və unutmayaq:

- React obyektləri/array-ləri/funksiyaları onların dəyəri ilə deyil, referansı ilə müqayisə edir. Bu müqayisə hook-ların dependencies-lərində və React.memo ilə bükülmüş komponentlərin props-larında baş verir.
- useMemo və ya useCallback-ə arqument kimi verilən inline funksiya hər re-render zamanı yenidən yaradılacaq.
- useCallback həmin funksiyanı özünü memoizə edir, useMemo isə onun icrasının nəticəsini memoizə edir.
- Komponentdə props-ları memoizə etmək yalnız aşağıdakı hallarda məntiqlidir:
    - Bu komponent React.memo ilə bükülüb.
    - Bu komponent həmin props-ları hook-ların dependencies-i kimi istifadə edir.
    - Bu komponent həmin props-ları digər komponentlərə ötürür və onlar yuxarıdakı hallardan birinə sahibdir.
- Əgər komponent React.memo ilə bükülüb və onun yenidən render olunması parent komponent tərəfindən tetiklenirsə, props dəyişməyibsə, React bu komponenti yenidən render etməyəcək. Hər digər halda, yenidən render normal şəkildə davam edəcək.
- React.memo ilə bükülmüş bir komponentdə bütün props-ları memoizə etmək göründüyündən çətindir. Digər props-lardan və ya hook-lardan gələn qeyri-primitiv dəyərləri ona ötürməkdən çəkinin.
- Props-ları memoizə edərkən “children”ın da qeyri-primitiv bir prop olduğunu və memoizə edilməyə ehtiyacı olduğunu unutmayın.

# Fəsil 6. Diffing və reconciliation-ə dərin dalış

Əvvəlki fəsillərdə biz React-in reconciliation və diffing alqoritmlərinin əsaslarını əhatə etdik. İndi bilirik ki, məsələn, const a = <Child /> kimi React Elementləri yaratdığımız zaman, əslində obyektlər yaradırıq. HTML-ə bənzər sintaksis (JSX) yalnız sintaksis şəkəridir və React.createElement funksiyasına çevrilir. Bu funksiya, type xüsusiyyəti komponentə, memoizə edilmiş komponentə və ya HTML tag-ı ilə olan bir sətirə işarə edən təsvir obyektini qaytarır.

Həmçinin bilirik ki, əgər obyektin öz referansı re-renderlər arasında dəyişirsə, type eyni qalarsa və type-dakı komponent React.memo ilə memoizə olunmayıbsa, React bu Elementi yenidən render edəcək.

Amma bu yalnız başlanğıcdır. Burada daha çox dəyişən və hərəkətli parçalar var, və bu prosesi detallı şəkildə başa düşmək çox vacibdir. Bu, bizə bir çox açıq-aşkar görünməyən səhvləri düzəltməyə, ən performanslı listləri həyata keçirməyə, lazım olduqda state-i sıfırlamağa və React-dəki ən böyük performans problemlərindən birindən qaçmağa imkan verəcək. Hamısı bir yerdə. İlk baxışdan bunlar əlaqəsiz görünə bilər, amma bütün bunlar eyni hekayənin bir hissəsidir: React hansı komponentlərin yenidən render olunmalı olduğunu, hansılarının silinməli olduğunu və hansılarının ekrana əlavə olunmalı olduğunu necə müəyyən edir.

Bu fəsildə biz bir neçə çox maraqlı səhvi araşdıracaq, işlərin “pərdə arxasında”də necə işlədiyinə dərindən dalacaq və bunu edərkən aşağıdakıları öyrənəcəyik:

React-in Diffing və Reconciliation alqoritminin necə işlədiyi.
State yeniləməsi tetikləndikdə və React-in komponentləri yenidən render etməsi lazım olduqda nə baş verdiyi.
Niyə komponentləri digər komponentlərin içində yaratmamalıyıq.
İki fərqli komponentin eyni state-i paylaşması səhvini necə həll etmək olar.
React-in array-ləri necə render etdiyi və bunu necə təsir edə biləcəyimiz.
"key" atributunun məqsədi nədir.
Mümkün olan ən performanslı listləri necə yazmaq olar.
Dinamik listlərdən kənarda niyə "key" atributundan istifadə edərdik.

Gizli Səhv
Maraqlı saxlamaq üçün kiçik bir sirr ilə başlayaq.
Tutaq ki, bir komponenti şərti olaraq render edirsiniz. Əgər "bir şey" doğru olsa, bu komponenti göstər. Əks halda, başqa bir şeyi göstər.

Məsələn, mən veb saytım üçün “sign up” formu hazırlayıram və həmin formun bir hissəsi, qeydiyyatdan keçənlərin şirkət olub-olmaması və ya sadəcə adi insan olmasıdır (bəzi qəribə vergi səbəblərinə görə). Ona görə də, “Company Tax ID” input sahəsini yalnız istifadəçi “bəli, mən şirkət kimi qeydiyyatdan keçirəm” checkbox-ını kliklədikdən sonra göstərmək istəyirəm. İnsanlar üçün isə “Vergi ID-nizi verməyiniz lazım deyil, şanslı insansınız” mətnini göstərmək istəyirəm.

Bu tətbiqin kodu təxminən belə görünəcək:

```tsx
const Form = () => {
 const [isCompany, setIsCompany] = useState(false);
 return (
 <>
 {/* checkbox somewhere here */}
 {isCompany ? (
 <Input id="company-tax-id-number" placeholder="Enter you
company ID" ... />
 ) : (
 <TextPlaceholder />
 )}
 </>
 )
}
```

Burada, istifadəçi əslində şirkət olduğunu iddia edib isCompany dəyəri default false-dan true-a dəyişərsə, render və mount baxımından nə baş verəcək?
Heç bir təəccüblü hal yoxdur, cavab olduqca intuitivdir: Form komponenti özünü yenidən render edəcək, TextPlaceholder komponenti unmount olunacaq və Input komponenti mount olunacaq. Əgər checkbox-u geri çevirsəm, Input yenidən unmount olunacaq və TextPlaceholder mount olunacaq.

Davranış baxımından bu o deməkdir ki, əgər Input-a bir şey yazsam, checkbox-u çevirsəm və sonra geri çevirsəm, orada yazdıqlarım itəcək. Input-un öz daxili state-i var və unmount olunduqda məhv olunur, mount olunduqda isə sıfırdan yaradılır.

Amma əgər mən insanlardan da vergi ID-lərini toplamalı olsam nə baş verəcək? Və sahə tam olaraq eyni görünməli və eyni davranmalıdır, amma fərqli bir id, fərqli onChange callback və digər fərqli parametrləri olacaq. Təbii ki, mən belə bir şey edərdim:

```tsx
const Form = () => {
 const [isCompany, setIsCompany] = useState(false);
 return (
 <>
 {/* checkbox somewhere here */}
 {isCompany ? (
 <Input id="company-tax-id-number" placeholder="Enter you
company Tax ID" ... />
) : (
 <Input id="person-tax-id-number" placeholder="Enter you
personal Tax ID" ... />
 )}
 </>
 )
}
```

Burada indi nə baş verəcək?
Cavab, əlbəttə, yenə olduqca intuitivdir və hər hansı ağıllı bir insanın gözlədiyi kimidir… Unmount baş vermir! Əgər sahəyə bir şey yazsam və sonra checkbox-u çevirsəm, mətn hələ də qalır! React hər iki input-un əslində eyni olduğunu düşünür və birincini unmount edib ikincini mount etmək əvəzinə, birincini ikinci input-dan gələn yeni məlumatla yenidən render edir.

Interactive example and full code
https://advanced-react.com/examples/06/01

Əgər bu sizi heç də təəccübləndirmirsə və heç tərəddüd etmədən “Ah, bəli, səbəb \[bu səbəbdir]” deyə bilirsinizsə, vay, mən sizin autografa sahib ola bilərəmmi?

Qalanlarımız üçün isə, bu davranışdan göz qırpılması və yüngül baş ağrısı almışıqsa, cavabı tapmaq üçün React-in reconciliation prosesinə dərindən dalmaq vaxtıdır.

Diffing və Reconciliation
Bütün bunlar DOM-dandır\[5]. Yaxud dəqiq desək, React kodu yazarkən onunla birbaşa məşğul olmağa ehtiyacımız olmamasıdır. Bu bizim üçün çox rahatdır: appendChild etmək və ya atributları əl ilə müqayisə etmək əvəzinə, sadəcə komponentlər yazırıq. Və sonra React verdiyimiz hər şeyi ekranda uyğun məlumatlarla DOM elementlərinə çevirir. Belə bir kod yazdığımız zaman:

```tsx
const Input = ({ placeholder }) => {
 return (
 <input
 type="text"
 id="input-id"
 placeholder={placeholder}
 />
 );
};
// somewhere else
<Input placeholder="Input something here" />;
```

Biz gözləyirik ki, React normal HTML input tag-ını placeholder ilə birlikdə DOM strukturunda uyğun yerə əlavə etsin. Əgər React komponentində placeholder dəyərini dəyişdirsək, React-in DOM elementimizi yeni dəyərlə yeniləməsini və həmin dəyəri ekranda görməyi gözləyirik. İdeal halda, dərhal.

Beləliklə, React sadəcə əvvəlki input-u silib, yeni məlumatla yeni bir input əlavə edə bilməz. Bu çox yavaş olar. Əvəzinə, artıq mövcud olan input DOM elementini müəyyənləşdirib yalnız atributlarını yeniləməlidir. Əgər React olmasaydı, bunu belə etməli olardıq:

```tsx
const input = document.getElementById('input-id');
input.placeholder = 'new data';
```

React-də bunu etmək məcburiyyətində deyilik; React bunu bizim üçün idarə edir. Bunu bəzən "Virtual DOM" adlandırdığımız şeyi yaradaraq və dəyişdirərək edir. Bu Virtual DOM sadəcə render olunmalı bütün komponentləri, onların bütün props-larını və uşaqlarını – eyni formaya malik obyektləri – saxlayan böyük bir obyektidir. Yalnız bir ağacdır. Yuxarıdakı nümunədəki Input komponentinin render etməli olduğu şey belə bir şəkildə təmsil olunacaq:

```tsx
{
 type: "input", // type of element that we need to render
 props: {...}, // input's props like id or placeholder
 ... // bunch of other internal stuff
}
```

Əgər bizim Input komponentimiz daha çox şey render edirdisə:

```tsx
const Input = () => {
 return (
 <>
 <label htmlFor="input-id">{label}</label>
 <input type="text" id="input-id" />
 </>
 );
};
```

onda React-in baxımından label və input sadəcə həmin obyektlərin array-i olardı:

```tsx
[
 {
 type: 'label',
 ... // other stuff
 },
 {
 type: 'input',
 ... // other stuff
 }
]
```

input və label kimi DOM elementlərinin "type" xüsusiyyəti string olacaq və React onları birbaşa DOM elementlərinə çevirməyi biləcək. Amma əgər React komponentlərini render ediriksə, onlar birbaşa DOM elementləri ilə əlaqəli deyillər, buna görə React bunun ətrafında nəsə etməlidir.

```tsx
const Component = () => {
 return <Input />;
};
```

Bu halda, komponentin funksiyasını "type" kimi yerləşdirəcək. Sadəcə Input komponenti olaraq bildiyimiz bütün funksiyanı götürüb ora qoyur:

```tsx
{
 type: Input, // reference to that Input function we declared
 //earlier
 ... // other stuff
}
```

Və sonra, React tətbiqi mount etmək əmri aldıqda (ilk render), o həmin ağac üzərində iterasiya edir və aşağıdakılar baş verir:

- Əgər "type" stringdirsə, həmin tipdə HTML elementi yaradır.
- Əgər "type" funksiya isə (yəni bizim komponent), onu çağırır və bu funksiyanın qaytardığı ağac üzərində iterasiya edir.

Nəticədə, ekrana göstərilməyə hazır bütün DOM node-larının tam ağacını alır. Məsələn, belə bir komponent:

```tsx
const Component = () => {
 return (
 <div>
 <Input placeholder="Text1" id="1" />
 <Input placeholder="Text2" id="2" />
 </div>
 );
};
```

belə bir şəkildə təmsil olunacaq:

```tsx
{
	 type: 'div',
	 props: {
	 // children are props!
		 children: [
			 {
				 type: Input,
				 props: { id: "1", placeholder: "Text1" }
			 },
			 {
				 type: Input,
				 props: { id: "2", placeholder: "Text2" }
			 }
		 ]
	 }
}
```

Bu isə mount edildikdə belə bir HTML-ə çevriləcək:

```tsx
<div>
 <input placeholder="Text1" id="1" />
 <input placeholder="Text2" id="2" />
</div>
```

Reconciliation və state yeniləməsi
Bundan sonra əyləncə başlayır. Tutaq ki, həmin ağacdakı komponentlərdən birinin state-i var və onun yenilənməsi tetikləndi (re-render tetikləndi). React ekrandakı bütün elementləri həmin state yeniləməsindən gələn yeni məlumatlarla yeniləməlidir. Və ya bəlkə bəzi yeni elementləri əlavə etməli və ya silməlidir.

Beləliklə, React yenidən həmin ağac üzərində səyahətinə başlayır, state yeniləməsinin baş verdiyi yerdən başlayaraq. Əgər bizim belə bir kodumuz varsa:

```tsx
const Component = () => {
 // return just one element
 return <Input />;
};
```

React başa düşəcək ki, Component render olunduqda bu obyekt qaytarır:

```tsx
{
 type: Input,
 ... // other internal stuff
}
```

O, həmin obyektin "type" sahəsini state yeniləməsindən əvvəl və sonra müqayisə edəcək. Əgər type eynidirsə, Input komponenti "yenilənməli" kimi işarələnəcək və onun re-renderi tetiklənsin. Əgər type dəyişibsə, onda React re-render dövründə "əvvəlki" komponenti siləcək (unmount) və "növbəti" komponenti əlavə edəcək (mount). Bizim halda, type eyni qalacaq, çünki bu, sadəcə funksiyaya referansdır və həmin referans dəyişməyib.

Əgər mən Input ilə şərti bir şey edirdimsə, məsələn, başqa bir komponent qaytarırdımsa:

```tsx
const Component = () => {
 if (isCompany) return <Input />;
 return <TextPlaceholder />;
};
```

onda, tutaq ki, yenilənmə isCompany dəyərinin true-dan false-a çevrilməsi ilə tetikləndi, React-in müqayisə edəcəyi obyektlər

```tsx
// Before update, isCompany was "true"
{
 type: Input,
 ...
}
// After update, isCompany is "false"
{
 type: TextPlaceholder,
 ...
}
```

Nəticəni təxmin etdiniz, elə deyilmi? "Type" Input-dan TextPlaceholder referansına dəyişib, buna görə React Input-u unmount edəcək və onunla əlaqəli hər şeyi DOM-dan siləcək. Və yeni TextPlaceholder komponentini mount edəcək və onu DOM-a ilk dəfə əlavə edəcək. Input sahəsi ilə əlaqəli hər şey, o cümlədən onun state-i və ora yazdığınız hər şey məhv edilir.

Niyə komponentləri digər komponentlərin içində təyin edə bilmərik
İndi bu davranış aydın oldu, bir çox vacib suala cavab verə bilərik: niyə komponentləri digər komponentlərin içində yaratmamalıyıq? Niyə belə kod adətən anti-pattern hesab olunur?

```tsx
const Component = () => {
 const Input = () => <input />;
 return <Input />;
};
```

Əgər bu koda reconciliation və definition obyekt baxımından baxsaq, Component-in qaytardığı şey belə olacaq:

```tsx
{
 type: Input,
}
```

Bu sadəcə "type" xüsusiyyətinə sahib bir obyektdir və bu xüsusiyyət bir funksiyaya işarə edir.

Amma həmin funksiya Component-in içində yaradılıb. O, ona məxsusdur və hər re-render nəticəsində yenidən yaradılacaq. Beləliklə, React bu type-ları müqayisə etməyə çalışdıqda, iki fərqli funksiyanı müqayisə edəcək: biri re-render-dən əvvəl, digəri re-render-dən sonra. Və Chapter 5-dən bildiyimiz kimi, useMemo, useCallback və React.memo ilə memoizasiya mövzusunda, JavaScript-də funksiyaları bu şəkildə müqayisə edə bilmərik.

```tsx
const a = () => {};
const b = () => {};
a === b; // will always be false
```

Nəticədə, həmin uşağın "type" xüsusiyyəti hər re-render zamanı fərqli olacaq, buna görə React "əvvəlki" komponenti siləcək və "növbəti" komponenti mount edəcək.
Əgər komponent kifayət qədər ağırdırsa, ekranda hətta "flicker" effekti görəcəyik: o qısa müddət yox olacaq və sonra yenidən görünəcək. Buna adətən re-mounting deyirik. Adətən bu niyyətli deyil və performans üçün pisdir – re-mounting normal re-render-dən ən azı iki dəfə uzun çəkir. Bundan əlavə, "əvvəlki" komponent və onunla əlaqəli hər şey məhv olunduğu üçün, nəticədə olduqca maraqlı və izləməsi çətin səhvlər görəcəyik. Əgər həmin komponent state və ya focus saxlamalıdırsa, məsələn, bunlar hər re-render zamanı yox olacaq.

Interactive example and full code
https://advanced-react.com/examples/06/02

Yuxarıdakı əlaqəli kod nümunəsində bunun necə davrandığını görə bilərsiniz: input komponenti hər düymə basışında re-render tetiklədir və "ComponentWithState" yenidən mount olunur. Nəticədə, əgər həmin komponenti klikləyərək onun state-in "active" olaraq dəyişməsini təmin etsəniz və sonra yazmağa başlasanız, bu state yox olacaq.

Komponentləri belə digər komponentlərin içində təyin etmək React-də ən böyük performans problemlərindən biri ola bilər.

## Sirrə cavab

İndi gəlin başlanğıcdakı gizli koda qayıdaq və həmin səhvi həll edək:

```tsx
const Form = () => {
 const [isCompany, setIsCompany] = useState(false);
 return (
 <>
 {/*checkbox somewhere here*/}
 {isCompany ? (
 <Input id="company-tax-id-number" placeholder="Enter you
company Tax ID" ... />
 ) : (
 <Input id="person-tax-id-number" placeholder="Enter you
personal Tax ID" ... />
 )}
 </>
 )
}
```

Əgər burada isCompany dəyişəni true-dan false-a çevrilərsə, hansı obyektlər müqayisə olunacaq?
Əvvəl, isCompany true idi:

```tsx
{
 type: Input,
 ... // the rest of the stuff, including props like id="companytax-id-number"
}
```

Sonra, isCompany false oldu:

```tsx
{
 type: Input,
 ... // the rest of the stuff, including props like id="persontax-id-number"
}
```

React baxımından, "type" dəyişməyib. Hər ikisi də eyni funksiya olan Input komponentinə referans edir.
Yeganə dəyişən, React-in düşündüyü kimi, props-lardır: id "company-tax-id-number"-dən "person-tax-id-number"-ə dəyişib, placeholder dəyişib və s.

Beləliklə, bu halda React öyrədildiyi kimi davranır: mövcud Input komponentini götürür və onu yeni məlumatlarla yeniləyir, yəni re-render edir. Mövcud Input ilə əlaqəli hər şey, məsələn DOM elementi və ya state, hələ də mövcuddur. Heç nə məhv olmur. Bu, gördüyümüz davranışa səbəb olur: input-a bir şey yazıram, checkbox-u çevirirəm və mətn hələ də qalır.

Bu davranış mütləq pis deyil. Re-mount etmək əvəzinə re-render etmək istədiyim vəziyyət ola bilər. Amma bu halda, mən ehtimal ki, bunu düzəltmək və input-ların hər dəyişiklikdə sıfırlanmasını və yenidən mount olunmasını təmin etmək istərdim: onlar biznes məntiqi baxımından fərqli varlıqlardır, buna görə onları təkrar istifadə etmək istəmirəm.

Bunu düzəltməyin ən azı iki asan yolu var: array-lər və keys.

```tsx
const Form = () => {
 const [isCompany, setIsCompany] = useState(false);
 return (
 <>
 {/*checkbox somewhere here*/}
 {isCompany ? (
 <Input id="company-tax-id-number" ... />
 ) : (
 <Input id="person-tax-id-number" ... />
 )}
 </>
 )
}
```

O, bir Fragment qaytarır (bu şey: <>...\</>), və orada bir array şəklində children var: orada gizli bir checkbox var. Əsl kod isə belə görünür:

```tsx
const Form = () => {
 const [isCompany, setIsCompany] = useState(false);
 return (
 <>
 <Checkbox onChange={() => setIsCompany(!isCompany)} />
 {isCompany ? (
 <Input id="company-tax-id-number" ... />
 ) : (
 <Input id="person-tax-id-number" ... />
 )}
 </>
 )
}
```

Re-render zamanı, React tək bir element əvəzinə bir array şəklində children gördükdə, sadəcə onun üzərində iterasiya edir və sonra elementləri və onların "type" xüsusiyyətlərini array-dəki mövqelərinə görə "əvvəl" və "sonra" ilə müqayisə edir.

Əsasən, əgər checkbox-u çevirib Form-un re-render olunmasını tetiklətsəm, React bu array-i görəcək:

```tsx
[
 {
 type: Checkbox,
 },
 {
 type: Input, // our conditional input
 },
];
```

və onları bir-bir yoxlayacaq. Birinci element. "Type" əvvəl: Checkbox, "type" sonra: yenə Checkbox. Onu təkrar istifadə edir və re-render edir.
İkinci element. Eyni prosedur. Və belə davam edir.

Hətta həmin elementlərin bəziləri belə şərti render olunursa belə:

```tsx
isCompany ? <Input /> : null;
```

React hələ də həmin array-də sabit sayda elementə sahib olacaq. Sadəcə bəzən həmin elementlər null olacaq. Əgər Form-u belə yenidən yazsam:

```tsx
const Form = () => {
 const [isCompany, setIsCompany] = useState(false);
 return (
 <>
 <Checkbox onChange={() => setIsCompany(!isCompany)} />
 {isCompany ? <Input id="company-tax-id-number" ... /> : null}
 {!isCompany ? <Input id="person-tax-id-number" ... /> : null}
 </>
 )
}
```

O, həmişə üç elementdən ibarət bir array olacaq: Checkbox, Input və ya null, və Input və ya null.

Beləliklə, burada state dəyişəndə və re-render Form boyunca işə düşəndə nə baş verəcək?
Əvvəl, isCompany false idi:

```tsx
[{ type: Checkbox }, null, { type: Input }];
```

Sonra, isCompany true oldu:

```tsx
[{ type: Checkbox }, { type: Input }, null];
```

Və React onları bir-bir müqayisə etməyə başlayanda belə olacaq:

- Birinci element: Checkbox əvvəl və sonra → re-render Checkbox
- İkinci element: əvvəl null, sonra Input → mount Input
- Üçüncü element: əvvəl Input, sonra null → unmount Input

Və voila! Sehrli şəkildə, render çıxışında input-ların mövqeyini dəyişməklə, loqikada başqa heç nəyi dəyişdirmədən, səhv düzəlir və input-lar tam olaraq gözlədiyim kimi davranır!

Interactive example and full code
https://advanced-react.com/examples/06/03

Reconciliation və "key"
Eyni səhvi düzəltməyin başqa bir yolu var: "key" atributunun köməyi ilə.
"Key" React-də hər hansı bir list yazanlara tanış olmalıdır. React array-lər üzərində iterasiya edərkən onu əlavə etməyimizi tələb edir:

```tsx
const data = ['1', '2'];
const Component = () => {
 // "key" is mandatory here!
 return data.map((value) => <Input key={value} />);
};
```

Bu komponentin çıxışı indi aydın olmalıdır: sadəcə "type" Input olan obyektlərdən ibarət bir array:

```tsx
[
 { type: Input }, // "1" data item
 { type: Input }, // "2" data item
];
```

Amma belə dinamik listlərlə problem odur ki, onlar, necə deyərlər, dinamikdir. Onları yenidən sıralaya, əvvəlinə və ya sonuna yeni elementlər əlavə edə və ümumiyyətlə qarışdıra bilərik.

İndi React maraqlı bir tapşırıqla üzləşir: həmin array-dəki bütün komponentlər eyni tipdədir. Hər birinin hansını hansı olduğunu necə müəyyən etmək olar? Əgər həmin elementlərin sırası dəyişsə:

```tsx
[
 { type: Input }, // "2" data item now, but React doesn't know
that
 { type: Input }, // "1" data item now, but React doesn't know
that
];
```

Doğru mövcud elementin təkrar istifadə olunduğundan necə əmin olmaq olar? Çünki əgər sadəcə array-də elementlərin sırasına güvənirsə, birinci elementin nümunəsini ikinci elementin məlumatı üçün istifadə edəcək və əksinə. Bu, əgər həmin elementlərin state-i varsa, qəribə davranışa səbəb olacaq: state birinci elementdə qalacaq. Əgər birinci input sahəsinə bir şey yazıb array-i yenidən sıralasaq, yazılan mətn birinci input-da qalacaq.

!image.png

Buna görə də "key"-ə ehtiyacımız var: bu, əslində React-in children array-dəki bir element üçün unikal identifikatorudur və re-renderlər arasında istifadə olunur. Əgər bir elementin "type" ilə yanaşı bir "key"-i varsa, re-render zamanı React mövcud elementləri, onların bütün əlaqəli state və DOM-u ilə birlikdə, "key" və "type" əvvəl və sonra uyğun gəldikdə təkrar istifadə edəcək.

Array-də data belə görünəcək. Yenidən sıralamadan əvvəl:

```tsx
[
 { type: Input, key: '1' }, // "1" data item
 { type: Input, key: '2' }, // "2" data item
];
```

Yenidən sıralamadan sonra:

```tsx
[
 { type: Input, key: '2' }, // "2" data item, React knows that
because of "key"
 { type: Input, key: '1' }, // "1" data item, React knows that
because of "key"
];
```

İndi, key mövcud olduqda, React re-renderdən sonra birinci mövqedə olan artıq yaradılmış elementi təkrar istifadə etməli olduğunu biləcək.
Beləliklə, input DOM node-larını sadəcə yerlərini dəyişəcək. Və birinci elementə yazdığımız mətn ikinci mövqeyə onunla birlikdə köçəcək.

!image.png

Interactive example and full code
https://advanced-react.com/examples/06/04

"Key" atributu və memoized list
Key atributu və listlər barədə ən yayılmış yanlış təsəvvürlərdən biri odur ki, key performans səbəblərinə görə lazımdır. Yəni, dinamik array-ə key əlavə etmək array elementlərinin re-render olunmasının qarşısını alır. Yuxarıdakı nümunədən göründüyü kimi, key belə işləmir. Key React-ə re-render zamanı hansı mövcud nümunəni təkrar istifadə etməli olduğunu müəyyən etməyə kömək edir. Re-render hələ də baş verəcək, başqa komponentlərdə olduğu kimi.

Əgər elementlərin re-render olunmasının qarşısını almaq istəyiriksə, bunun üçün React.memo istifadə etməliyik. Statik array-lər üçün (elementlərini və ya mövqelərini dəyişməyənlər), çox asandır: sadəcə item elementi nədirsə onu React.memo ilə bükün və key-də ya həmin item-in id xüsusiyyətini, ya da array-in indeksini istifadə edin. Re-renderlər arasında sabit olan hər şey işləyəcək.

```tsx
const data = [
 { id: 'business', placeholder: 'Business Tax' },
 { id: 'person', placeholder: 'Person Tax' },
];
const InputMemo = React.memo(Input);
const Component = () => {
 // array's index is fine here, the array is static
 return data.map((value, index) => (
 <InputMemo
 key={index}
 placeholder={value.placeholder}
 />
 ));
};
```

Əgər Parent-in re-renderi tetiklənsə, heç bir InputMemo komponenti re-render olunmayacaq: onlar React.memo ilə bükülüb və hər hansı bir item üçün key dəyişməyib.

Dinamik array-lərdə vəziyyət bir az maraqlıdır və burada key çox vacib rol oynayır. Əgər re-render-i tetikləmiş şey həmin array-in yenidən sıralanmasıdırsa, burada nə baş verəcək?

```tsx
// array before re-render
[
 { id: 'business', placeholder: 'Business Tax' },
 { id: 'person', placeholder: 'Person Tax' },
]
// array after re-render
[
 { id: 'person', placeholder: 'Person Tax' },
 { id: 'business', placeholder: 'Business Tax' },
]
```

Əgər array-in indeksini yenidən key kimi istifadə etsək, React baxımından key="0" olan element re-renderdən əvvəl və sonra array-də birinci element olacaq. Amma prop olan placeholder dəyişəcək: "Business Tax"-dan "Person Tax"-a keçəcək. Nəticədə, hətta bu element memoized olsa belə, React baxımından onun prop-u dəyişib, buna görə memoizasiya mövcud olmamış kimi onu re-render edəcək!

!image.png

Bunun həlli sadədir: key-in onu müəyyən edən elementlə uyğun olduğundan əmin olmalıyıq. Bizim halda, sadəcə id-i ora qoymaq kifayətdir:

```tsx
const Parent = () => {
 // if array can be sorted, or number of its items can change,
//then "index" as "key" is not a good idea
 // we need to use something that identifies an array item instead
 return sortedData.map((value, index) => (
 <InputMemo
 key={value.id}
 placeholder={value.placeholder}
 />
 ));
};
```

Əgər datada id kimi unikal bir şey yoxdursa, onda həmin array üzərində komponentdən kənarda iterasiya etməli və ora id-i əl ilə əlavə etməliyik.

Bizim input-lar üçün, əgər key üçün id istifadə etsək, key="business" olan element hələ də prop placeholder="Business Tax" saxlayacaq, sadəcə array-də fərqli bir mövqedə olacaq. Beləliklə, React yalnız əlaqəli DOM node-larının yerlərini dəyişəcək, amma əsl komponent re-render olunmayacaq.

!image.png

Və tam eyni vəziyyət baş verəcək, əgər array-in əvvəlinə başqa bir input əlavə etsək. Əgər array-in indeksini key kimi istifadə etsək, React baxımından key="0" olan element sadəcə placeholder prop-unı "Business Tax"-dan "New Tax"-a dəyişəcək; key="1" element isə "Person Tax"-dan "Business Tax"-a keçəcək. Beləliklə, hər ikisi re-render olunacaq. Və key="2" olan yeni element və "Person Tax" mətnli input sıfırdan mount ediləcək.

!image.png

Və əgər key kimi id istifadə etsək, həm "Business Tax", həm də "Person Tax" öz key-lərini saxlayacaq və memoized olduqları üçün re-render olunmayacaqlar. Yeni element isə, key="New tax", sıfırdan mount ediləcək.

!image.png

Interactive example and full code
https://advanced-react.com/examples/06/05

State-in sıfırlanması texnikası
Bütün bu key loqikası niyə bizim Form komponentimiz və fəsilin əvvəlindəki səhv üçün vacibdir? Maraqlı fakt: "key" sadəcə bir elementin atributudur, yalnız dinamik array-lərlə məhdudlaşmır. Hər hansı bir children array-də tam eyni şəkildə davranacaq. Və artıq öyrəndiyimiz kimi, fəsilin əvvəlindəki səhvli Form-un obyekt təyini belədir:

```tsx
const Form = () => {
 const [isCompany, setIsCompany] = useState(false);
 return (
 <>
 <Checkbox onChange={() => setIsCompany(!isCompany)} />
 {isCompany ? (
 <Input id="company-tax-id-number" ... />
 ) : (
 <Input id="person-tax-id-number" ... />
 )}
 </>
 )
}
```

children-lardan ibarət bir array-ə sahibdir:

```tsx
[
 { type: Checkbox },
 { type: Input }, // react thinks it's the same input between rerenders
];
```

İlkin səhvi düzəltmək üçün lazım olan tək şey React-ə göstərməkdir ki, re-renderlər arasında olan həmin Input komponentləri əslində fərqli komponentlərdir və təkrar istifadə olunmamalıdır. Əgər bu input-lara "key" əlavə etsək, məhz bunu əldə edəcəyik.

```tsx
{isCompany ? (
 <Input id="company-tax-id-number" key="company-tax-id-number" ...
/>
) : (
 <Input id="person-tax-id-number" key="person-tax-id-number" ...
/>
)}
```

İndi, re-renderdən əvvəl və sonra children array-i dəyişəcək.
Əvvəl, isCompany false idi:

```tsx
[
 { type: Checkbox },
 {
 type: Input,
 key: 'person-tax-id-number',
 },
];
```

Sonra, isCompany true oldu:

```tsx
[
 { type: Checkbox },
 {
 type: Input,
 key: 'company-tax-id-number',
 },
];
```

Voila, key-lər fərqlidir! React birinci Input-u siləcək və ikinci Input-u sıfırdan mount edəcək. Input-lar arasında keçdikdə state indi boş olacaq.

Interactive example and full code
https://advanced-react.com/examples/06/06

Bu texnika "state reset" olaraq tanınır. Bu, state ilə birbaşa əlaqəli deyil, amma bəzən uncontrolled komponentin (məsələn, input sahəsi) state-in default dəyərə sıfırlanması lazım olduqda istifadə olunur. Bunun üçün yuxarıdakı kimi iki komponentə ehtiyac yoxdur; bir komponent kifayətdir. Key-də şərtlərinizdən asılı olaraq dəyişən hər hansı unikal dəyər işləyəcək. Məsələn, URL dəyişdikdə state-i sıfırlamağa məcbur etmək istəyirsinizsə, bu qədər sadə ola bilər:

```tsx
const Component = () => {
// grab the current url from our router solution
 const { url } = useRouter();
 // I want to reset that input field when the page URL changes
 return <Input id="some-id" key={url} />;
};
```

Amma burada diqqətli olmaq lazımdır. Göründüyü kimi, bu sadəcə "state reset" deyil. Bu, React-i komponenti tamamilə unmount etməyə və sıfırdan yeni bir komponent mount etməyə məcbur edir. Böyük komponentlər üçün bu, performans problemlərinə səbəb ola bilər. State-in sıfırlanması isə bu tam məhv etmənin sadəcə yan məhsuludur.

Mövcud elementin təkrar istifadəsini məcbur etmək üçün "key" istifadə etmək
Başqa bir maraqlı fakt: əgər əslində mövcud elementi təkrar istifadə etməyə ehtiyacımız olsa, "key" bunun üçün də kömək edə bilər. Xatırlayın bu kodu, səhvi uşaqlar array-də Input elementini fərqli mövqelərdə render etməklə düzəltdiyimiz yeri?

```tsx
const Form = () => {
 const [isCompany, setIsCompany] = useState(false);
 return (
 <>
 <Checkbox onChange={() => setIsCompany(!isCompany)} />
 {isCompany ? <Input id="company-tax-id-number" ... /> : null}
 {!isCompany ? <Input id="person-tax-id-number" ... /> : null}
 </>
 )
}
```

isCompany state dəyişəni dəyişəndə, Input komponentləri array-də fərqli mövqelərdə olduqları üçün unmount və mount olunacaq.
Amma! Əgər bu iki input-a eyni dəyərdə "key" atributu əlavə etsəm, sehr baş verir.

```tsx
<>
 <Checkbox onChange={() => setIsCompany(!isCompany)} />
 {isCompany ? <Input id="company-tax-id-number" key="tax-input"
... /> : null}
 {!isCompany ? <Input id="person-tax-id-number" key="tax-input"
... /> : null}
</>
```

Data və re-render baxımından indi belə olacaq:
Əvvəl, isCompany false idi:

```tsx
[
 { type: Checkbox },
 null,
 {
 type: Input,
 key: 'tax-input',
 },
];
```

Sonra, isCompany true oldu:

```tsx
[
 { type: Checkbox },
 { type: Input, key: "tax-input" }
 null
]
```

React children array-i görür və re-renderdən əvvəl və sonra Input type və eyni "key"-ə malik bir element olduğunu görür. Beləliklə, React düşünəcək ki, Input komponenti sadəcə array-də mövqeyini dəyişib və mövcud nümunəni təkrar istifadə edəcək. Əgər bir şey yazsaq, state saxlanacaq, hətta texniki olaraq Input-lar fərqli olsa belə.

Interactive example and full code
https://advanced-react.com/examples/06/07

Bu xüsusi nümunə üçün bu, əlbəttə ki, sadəcə maraqlı bir davranışdır və praktikada çox faydalı deyil. Amma mən bunu, məsələn, accordion-lar, tab-ların məzmunu və ya bəzi qalereyalar kimi komponentlərin performansını incə tənzimləmək üçün istifadə oluna biləcəyini təsəvvür edə bilərəm.

Niyə array-lərdən kənarda key-lərə ehtiyac yoxdur?
Gəlin reconciliation ilə bir az daha əylənək, indi ki, sirr həll olunub və alqoritm təxminən aydındır. Hələ bir neçə mini sual və sirr var. Məsələn, siz fərq etmisiniz ki, React heç vaxt sizdən key əlavə etməyi tələb etməyib, yalnız array üzərində iterasiya etmədiyiniz müddətcə?

Bunun obyekt təyini belədir:

```tsx
const data = ['1', '2'];
const Component = () => {
 // "key" is mandatory here!
 return (
 <>
 {data.map((value) => (
 <Input key={value} />
 ))}
 </> );
};
```

və bu

```tsx
const Component = () => {
 // no-one cares about "key" here
 return (
 <>
 <Input />
 <Input />
 </>
 );
};
```

Tam olaraq eyni olacaq, sadəcə children array-də iki input olan bir fragment:

```tsx
[{ type: Input }, { type: Input }];
```

Bəs niyə bir halda React-in düzgün işləməsi üçün "key" lazımdır, başqa halda isə yox?
Fərq ondadır ki, birinci nümunə dinamik arraydır. React bilmir növbəti re-render zamanı bu arraydə nə baş verəcək: elementləri siləcəksiniz, əlavə edəcəksiniz, sıralayacaqsınız, yoxsa olduğu kimi saxlayacaqsınız. Bu səbəbdən React, arraydə işləyərkən problemlərin qarşısını almaq üçün ehtiyat tədbiri olaraq "key" əlavə etməyinizi tələb edir.

Burada maraqlı nöqtə haradadır deyə soruşa bilərsiniz? Budur: arraydə olmayan, lakin eyni "key" dəyərinə malik olan input-ları şərti olaraq render etməyə çalışın:

```tsx
const Component = () => {
 const [isReverse, setIsReverse] = useState(false);
 // no-one cares about "key" h
 return (
 <>
 <Input key={isReverse ? 'some-key' : null} />
 <Input key={!isReverse ? 'some-key' : null} />
 </>
 );
};
```

Cəhd edin və proqnoz verin: əgər həmin input-lara bir şey yazsam və boolean-u on/off etsəm, nə baş verəcək?

React baxımından hər bir input eyni "key"-ə malik olduğundan, re-render zamanı React hər iki input-u eyni komponent nümunəsi kimi qəbul edəcək. Nəticədə:

- Boolean-u dəyişdirəndə input-un mövqeyi dəyişsə belə, əvvəl yazdığınız mətn saxlanacaq.
- Texniki olaraq fərqli elementlər olsa da, React onları eyni "key" ilə təkrar istifadə edəcək.

Yəni, state qorunacaq, input-un məzmunu itməyəcək.

Interactive example and full code
https://advanced-react.com/examples/06/08

Dinamik array-lər və normal elementlərin birlikdə istifadəsi
Əgər fəsili diqqətlə oxumusunuzsa, indi kiçik bir ürək sıxıntısı yaşamış ola bilərsiniz. Mən isə bunu araşdıranda belə olmuşdum. Çünki…

Əgər dinamik elementlər children array-ə çevrilirsə və bu array normal elementlərin bir yerdə olduğu vəziyyətdən fərqlənmirsə, və əgər mən normal elementləri dinamik array-dən sonra qoysam və array-ə bir element əlavə edib ya da çıxarsam, bu o deməkdirmi ki, array-dən sonra gələn elementlər həmişə özlərini re-mount edəcəklər?

Əsas sual: bu kod performans fəlakəti yaradır, yoxsa yox?

```tsx
const data = ['1', '2'];
const Component = () => {
 return (<>
 {data.map((i) => (
 <Input key={i} id={i} />
 ))}
 {/* will this input re-mount if I add a new item in the
array above? */}
 <Input id="3" />
 </>
 );
};
```

Çünki əgər bu, üç children-lik bir array-ə çevrilirsə — ilk ikisi dinamik, sonuncusu statik — belə olacaq. Əgər vəziyyət belədirsə, obyekt təyini belə olacaq:

```tsx
[
 { type: Input, key: 1 }, // input from the array
 { type: Input, key: 2 }, // input from the array
 { type: Input }, // input after the array
];
```

Və əgər data array-ə başqa bir element əlavə etsək, üçüncü mövqedə array-dən key="3" olan bir Input elementi olacaq və "manual" input dördüncü mövqeyə keçəcək. Bu isə React baxımından onun yeni bir element olduğunu və mount edilməli olduğunu göstərərdi.

Xoşbəxtlikdən, belə deyil. Puff… React bundan daha ağıllıdır.

Dinamik və statik elementləri qarışdıranda, yuxarıdakı kod kimi, React sadəcə həmin dinamik elementlərin bir array-ini yaradır və bu array-i children array-də ilk child kimi yerləşdirir. Bu kod üçün obyekt təyini belə olacaq:

```tsx
[
 // the entire dynamic array is the first position in the
//children's array
 [
 { type: Input, key: 1 },
 { type: Input, key: 2 },
 ],
 {
 type: Input, // this is our manual Input after the array
 },
];
```

Bizim manual Input həmişə burada ikinci mövqedə olacaq. Heç bir re-mount baş verməyəcək. Heç bir performans fəlakəti yoxdur. Ürək sıxıntısı isə əsassız imiş.

Əsas nəticələr

Uff, bu uzun fəsil oldu! Ümid edirəm ki, araşdırma və sirlərlə əylənmisiniz və bununla yanaşı maraqlı şeylər öyrənmisiniz. Bütün bunlardan yadda saxlamaq lazım olan bir neçə məqam:

- React, re-renderlər arasında elementləri, geri qaytarılmış array-də eyni mövqedə olan elementlərlə müqayisə edəcək. Birinci birinci ilə, ikinci ikinci ilə və s.
- Əgər elementin tipi və array-dəki mövqeyi eynidirsə, React həmin elementi re-render edəcək. Əgər o mövqedə tip dəyişirsə, React əvvəlki komponenti unmount edəcək və yenisini mount edəcək.
- Children array-i həmişə eyni sayda elementə malik olacaq (əgər dinamik deyilsə). Şərti elementlər (isSomething ? : ) yalnız bir mövqeni tutur, hətta onlardan biri null olsa belə.
- Array dinamikdirsə, React re-renderlər arasında həmin elementləri etibarlı şəkildə tanıya bilməz. Ona kömək etmək üçün key atributundan istifadə edirik. Bu, array elementlərinin sayı və ya mövqeyi dəyişə bilərsə (yenidən sıralama, əlavə etmə, silmə) xüsusilə vacibdir, və əgər həmin elementlər React.memo ilə qablaşdırılıbsa daha da vacibdir.
- Key-dən dinamik array-lərdən kənarda da istifadə edə bilərik ki, React-i eyni tipə malik elementləri eyni mövqedə fərqli kimi tanımağa və ya fərqli mövqedə eyni tipə malik elementləri eyni kimi tanımağa məcbur edək.
- Key dəyişirsə, komponenti unmount etməyə də məcbur edə bilərik; bu bəzən "state reset" adlanır.

# Fəsil 7. Müasir dünyada yüksək-səviyyəli komponentlər

İrəli getməzdən əvvəl React-in digər hissələrinə keçmədən müzakirə etməli olduğumuz son bir kompozisiya texnikası var: yüksək-səviyyəli komponentlər (Higher-order components – HOC)! Hooks ortaya çıxmazdan əvvəl bu, **stateful məntiqi** və **kontekst məlumatlarını** paylaşmaq üçün ən populyar nümunələrdən biri idi. Hətta bu gün də bəzi yerlərdə, xüsusilə köhnə kitabxanalarda və ya hooks-dan əvvəl başlamış layihələrdə istifadə olunur. Buna görə də yeni yazılan kodlarda HOC tətbiq etmək yaxşı fikir olmasa da, onların nə olduğunu və necə işlədiyini anlamaq demək olar ki, vacibdir.

Gəlin əvvəldən başlayaq və prosesdə öyrənək:

- Yüksək-səviyyəli komponent (HOC) nümunəsi nədir?
- Callback-ləri və React lifecycle hadisələrini təkmilləşdirmək üçün HOC-lardan necə istifadə edə bilərik?
- Məlumatı HOC-lara ötürməyin müxtəlif yolları.
- DOM və klaviatura hadisələrini qarşılayan yenidən istifadə oluna bilən komponentləri necə yaratmaq olar.

### Yüksək-səviyyəli komponent (Higher-Order Component) nədir?

React sənədlərinə görə, **Yüksək-səviyyəli komponent (HOC)** komponent məntiqini təkrar istifadə etmək üçün tətbiq olunan inkişaf etmiş bir texnikadır və adətən müxtəlif komponentlər arasında ortaq olan məsələlərdə (cross-cutting concerns) istifadə olunur.

Sadə dillə desək, bu — bir **funksiya**dır ki, arqument olaraq bir komponent qəbul edir, müəyyən məntiq icra edir və sonra həmin komponenti göstərən **başqa bir komponent** qaytarır.

Onun heç nə etməyən ən sadə variantı belədir:

```tsx
// accept a Component as an argument
const withSomeLogic = (Component) => {
 // do something
 // return a component that renders the component from the
// argument
 return (props) => <Component {...props} />;
};
```

Burada əsas məqam funksiyanın **return hissəsidir** – o, sadəcə başqa komponentlər kimi bir komponentdir.

Sonra isə, ondan istifadə etmək vaxtı çatanda, bu şəkildə görünəcək:

```tsx
// just a button
const Button = ({ onClick }) => (
 <button onClick={onClick}>Button</button>
);
// same button, but with enhanced functionality
const ButtonWithSomeLogic = withSomeLogic(Button);
```

Sən **Button** komponentini funksiyaya ötürürsən və o, yüksək-səviyyəli komponentdə (HOC) müəyyən edilmiş məntiqi özündə birləşdirən **yeni Button** qaytarır. Daha sonra bu düyməni adi bir **button** kimi istifadə edə bilərsən:

```tsx
const SomePage = () => {
 return (
 <>
 <Button />
 <ButtonWithSomeLogic />
 </>
 );
};
```

Ən sadə və ən geniş yayılmış istifadə nümunəsi komponentlərə **props əlavə etməkdir**.

Məsələn, biz **withTheming** adlı bir komponent yaza bilərik ki, o, saytın cari mövzusunu (dark və ya light rejim) götürsün və həmin dəyəri **theme** props-u vasitəsilə ötürsün. Bu isə təxminən belə görünəcək:

```tsx
const withTheme = (Component) => {
 // isDark will come from something like context
 const theme = isDark ? 'dark' : 'light';
 // making sure that we pass all props to the component back
 // and also inject the new one: theme
 return (props) => <Component {...props} theme={theme} />;
};
```

Və indi biz bunu **button** üzərində tətbiq etsək, həmin komponentdə istifadə üçün **theme** props-u mövcud olacaq:

```tsx
const Button = ({ theme }) => {
 // theme prop here will come from withTheme HOC below
 return <button className={theme} ...>Button</button>
}
const ButtonWithTheme = withTheme(Button);
```

Interactive example and full code
https://advanced-react.com/examples/07/01

Hooks təqdim olunana qədər, yüksək-səviyyəli komponentlər kontekstə və hər hansı xarici məlumat abunəliklərinə (subscriptions) giriş üçün geniş istifadə olunurdu. Məsələn, **Redux**-un köhnə **connect** funksiyası və ya **React Router**-in **withRouter** funksiyaları yüksək-səviyyəli komponentlərdir: onlar bir komponent qəbul edir, ona bəzi props əlavə edir və geri qaytarır.

Gördüyünüz kimi, yüksək-səviyyəli komponentləri yazmaq və başa düşmək olduqca mürəkkəbdir. Buna görə də hooks təqdim olunanda hamının onlara keçməsi təəccüblü deyil.

İndi isə, hansı props-un haraya getdiyini izləmək və theme-in props-a necə daxil olduğunu anlamaq üçün mürəkkəb mental xəritələr yaratmaq əvəzinə, sadəcə belə yaza bilərik:

```tsx
const Button = () => {
 // we see immediately where the theme is coming from
 const { theme } = useTheme();
 return <button appearance={theme} ...>Button</button>
};
```

Komponentdə baş verən hər şeyi yuxarıdan aşağıya oxumaq mümkündür və bütün məlumatların mənbəyi açıqdır, bu da **debug** etməyi və inkişaf prosesini əhəmiyyətli dərəcədə sadələşdirir.

Hooks demək olar ki, **paylaşılan məntiqin 99%-ini** və kontekstə giriş üçün olan bütün halların **100%-ni** əvəz etmiş olsa da, yüksək-səviyyəli komponentlər hələ də müasir kodda faydalı ola bilər. Əsasən:

- Callback-ləri təkmilləşdirmək,
- React lifecycle hadisələrini zənginləşdirmək,
- DOM və klaviatura hadisələrini ələ keçirmək üçün.

Əlbəttə, əgər bir az “şık” olmaq istəyirsənsə. Bu hallar **hooks** ilə də həyata keçirilə bilər, amma hər zaman bu qədər səliqəli olmur.

Gəlin indi onlara nəzər salaq.

**Callback-ləri təkmilləşdirmək**

Tutaq ki, bəzi callback-lərdə inkişaf etmiş **logging** həyata keçirməlisiniz. Məsələn, bir düyməyə kliklədikdə müəyyən məlumatlarla log hadisələri göndərmək istəyirsiniz.

Bunu **hooks** ilə necə edərdiniz? Yəqin ki, belə bir **Button** komponentiniz olardı və onun **onClick** callback-i mövcud olardı:

```tsx
const Button = ({ onClick, children }) => {
 return <button onClick={onClick}>{children}</button>;
};
```

Və sonra istifadəçi tərəfində, həmin callback-ə qoşularaq log hadisələrini göndərərdiniz:

```tsx
const SomePage = () => {
 const log = useLoggingSystem();
 const onClick = () => {
 log('Button was clicked');
 };
 return <Button onClick={onClick}>Click here</Button>;
};
```

Bu, əgər sadəcə bir-iki hadisə göndərmək istəyirsinizsə, problem deyil. Amma əgər istəyirsinizsə ki, düyməyə kliklənən hər yerdə log hadisələri **bütün tətbiq boyunca ardıcıl şəkildə** göndərilsin?

Bu halda, yəqin ki, onu birbaşa **Button** komponentinin özünə inteqrasiya edə bilərik:

```tsx
const Button = ({ onClick }) => {
 const log = useLoggingSystem();
 const onButtonClick = () => {
 log('Button was clicked');
 onClick();
 };
 return <button onClick={onButtonClick}>Click me</button>;
};
```

Amma sonra nə edək? Düzgün log üçün müəyyən məlumatları da göndərmək lazım olacaq.

Əlbəttə, **Button** komponentini **loggingData** props-u ilə genişləndirə və onu aşağıya ötürə bilərik:

```tsx
const Button = ({ onClick, loggingData }) => {
 const onButtonClick = () => {
 log('Button was clicked', loggingData);
 onClick();
 };
 return <button onClick={onButtonClick}>Click me</button>;
};
```

Amma əgər eyni hadisələri digər komponentlərdə də baş verməsini istəyirsinizsə nə olacaq?

Button adətən tətbiqimizdə kliklənə bilən tək element deyil. Məsələn, eyni loglamanı **ListItem** komponentinə də əlavə etmək istəsəniz nə edərsiniz? Eyni məntiqi oraya **copy-paste** etmək lazımdırmı?

```tsx
const ListItem = ({ onClick, loggingData }) => {
 const onListItemClick = () => {
 log('List item was clicked', loggingData);
 onClick();
 };
 return <Item onClick={onListItemClick}>Click me</Item>;
};
```

Çoxlu **copy-paste** etmək lazım gəlir, bu isə səhvlərə yol açır və kiminsə nəyisə dəyişməyi unutması ehtimalı yüksəkdir.

Əslində mən istəyirəm ki, "**onClick callback işə düşdü → bəzi log hadisələri göndərildi**" məntiqini **haradasa bir yerdə kapsullaşdırım** və sonra istədiyim komponentdə **heç bir komponent kodunu dəyişmədən** təkrar istifadə edim.

Bu, hooks-un işə yaramadığı ilk istifadə nümunəsidir, amma **yüksək-səviyyəli komponentlər (HOC)** burada çox faydalı ola bilər.

“Klik oldu → məlumatı qeyd et” məntiqini hər yerdə copy-paste etmək əvəzinə, mən **withLoggingOnClick** adlı funksiya yarada bilərəm ki:

- Komponenti arqument kimi qəbul etsin.
- Onun **onClick** callback-ini tutub qarşılasın.
- Lazım olan məlumatı loq üçün istifadə olunan xarici framework-ə göndərsin.
- Komponenti **onClick** callback-i olduğu kimi saxlanılmış halda geri qaytarsın ki, sonrakı istifadəyə uyğun olsun.

Bu, təxminən belə görünərdi:

```tsx
// just a function that accepts Component as an argument
export const withLoggingOnClick = (Component) => {
 return (props) => {
 const onClick = () => {
 console.log('Log on click something');
 // don't forget to call onClick that is coming from props!
 // we're overriding it below
 props.onClick();
 };
 // return original component with all the props
 // and overriding onClick with our own callback
 return <Component {...props} onClick={onClick} />;
 };
};
```

İndi mən bunu istədiyim istənilən komponentə əlavə edə bilərəm. Məsələn, daxilində loq funksionallığı olan bir **Button** yarada bilərəm:

```tsx
export const ButtonWithLoggingOnClick =
 withLoggingOnClick(SimpleButton);
```

Və ya onu siyahı elementində istifadə edə bilərəm:

```tsx
export const ListItemWithLoggingOnClick =
 withLoggingOnClick(ListItem);
```

Və ya izləmək istədiyim **onClick** callback-i olan istənilən başqa komponentdə istifadə edə bilərəm. Həm **Button**, həm də **ListItem** komponentlərində bircə sətir kod belə dəyişmədən!

Interactive example and full code
https://advanced-react.com/examples/07/02

Datanı higher-order komponentə əlavə etmək
İndi qalan iş loq funksiyasına kənardan bir az data əlavə etməkdir. Nəzərə alsaq ki, higher-order komponent sadəcə bir funksiyadan ibarətdir, bunu asanlıqla edə bilərik. Sadəcə funksiyaya bir neçə əlavə arqument əlavə etmək kifayətdir:

```tsx
export const withLoggingOnClickWithParams = (
 Component,
 // adding some params as a second argument to the function
 params,
) => {
 return (props) => {
 const onClick = () => {
 // accessing params that we passed as an argument here
 // everything else stays the same
 console.log('Log on click: ', params.text);
 props.onClick();
 };
 return <Component {...props} onClick={onClick} />;
 };
};
```

İndi isə, düyməmizi higher-order komponentlə bükəndə, loqa yazmaq istədiyimiz mətni ötürə bilərik:

```tsx
const ButtonWithLoggingOnClickWithParams =
 withLoggingOnClickWithParams(SimpleButton, {
 text: 'button component',
 })
```

İstifadəçi tərəfində isə biz bu düyməni adi bir düymə komponenti kimi istifadə edəcəyik, loq mətni barədə narahat olmadan:

```tsx
const Page = () => {
 return (
 <ButtonWithLoggingOnClickWithParams
 onClick={onClickCallback}
 >
 Click me
 </ButtonWithLoggingOnClickWithParams>
 );
};
```

Amma əgər biz həqiqətən bu mətni nəzərə almaq istəsək nə olar? Əgər düymənin istifadə olunduğu müxtəlif kontekstlərdə fərqli mətnlər göndərmək istəsək? Hər istifadə halı üçün milyonlarla bükülmüş düymə yaratmaq istəmərik.

Bu da çox asan həll olunur: həmin mətni funksiyanın arqumenti kimi ötürmək əvəzinə, onu nəticədə alınan düyməyə **prop** kimi ötürə bilərik. Kod təxminən belə görünərdi:

```tsx
<ButtonWithLoggingOnClickWithProps
 onClick={onClickCallback}
 logText="this is Page button"
>
 Click me
</ButtonWithLoggingOnClickWithProps>
```

Və sonra biz sadəcə həmin **logText**-i düyməyə göndərilmiş **props**-lardan çıxara bilərik:

```tsx
export const withLoggingOnClickWithProps = (Component) => {
 // it will be in the props here, just extract it
 return ({ logText, ...props }) => {
 const onClick = () => {
 // and then just use it here
 console.log('Log on click: ', logText);
 props.onClick();
 };
 return <Component {...props} onClick={onClick} />;
 };
};
```

Interactive example and full code
https://advanced-react.com/examples/07/03

React həyat dövrü hadisələrini təkmilləşdirmək
Burada yalnız kliklər və callback-lərlə məhdudlaşmırıq. Unutmayaq ki, bunlar sadəcə komponentlərdir, istədiyimiz və ehtiyac duyduğumuz hər şeyi edə bilərik. React-in təklif etdiyi hər şeyi istifadə edə bilərik. Məsələn, komponent mount olunduqda loq hadisələrini göndərə bilərik:

```tsx
export const withLoggingOnMount = (Component) => {
 return (props) => {
 // no more overriding onClick
 // use normal useEffect - it's just a component!
 useEffect(() => {
 console.log('log on mount');
 }, []);
 // and pass back props intact
 return <Component {...props} />;
 };
};
```

Və ya props-ları oxuyub, müəyyən bir prop dəyişdikdə, re-render zamanı onları göndərə bilərik:

```tsx
export const withLoggingOnReRender = (Component) => {
 return ({ id, ...props }) => {
 // fire logging every time "id" prop changes
 useEffect(() => {
 console.log('log on id change');
 }, [id]);
 // and pass back props intact
 return <Component {...props} />;
 };
};
```

Interactive example and full code
https://advanced-react.com/examples/07/04

DOM hadisələrini tutmaq

Higher-order komponentlərin digər çox faydalı tətbiqi müxtəlif DOM və klaviatura hadisələrini tutmaqdır. Məsələn, təsəvvür edin ki, səhifəniz üçün klaviatura qısayolları funksionallığını həyata keçirirsiniz. Müəyyən düymələr basıldıqda, müxtəlif əməliyyatlar etmək istəyirsiniz, məsələn, dialoqları açmaq, məsələlər yaratmaq və s. Bunun üçün ehtimal ki, belə bir şey üçün **window**-a event listener əlavə edərdiniz:

```tsx
useEffect(() => {const keyPressListener = (event) => {
 // do stuff
 };
 window.addEventListener('keypress', keyPressListener);
 return () =>
 window.removeEventListener(
 'keypress',
 keyPressListener,
 );
}, []);
```

Və sonra, tətbiqinizin müxtəlif hissələri, məsələn modal dialoqlar, dropdown menyular, drawer-lər və s., olur ki, dialoq açıq olduğu zaman həmin qlobal listener-i bloklamaq istəyirsiniz. Əgər bu yalnız bir dialoq olsaydı, **onKeyPress**-i birbaşa dialoqa əlavə edib orada **event.stopPropagation()** edə bilərdiniz:

```tsx
export const Modal = ({ onClose }) => {
 const onKeyPress = (event) => event.stopPropagation();
 return (
 <div onKeyPress={onKeyPress}>...// dialog code</div>
 );
};
```

Amma **onClick** loqinqində olduğu kimi eyni problem yaranır – əgər bu məntiqi bir neçə komponentdə görmək istəsəniz nə edərsiniz? Hər yerdə **event.stopPropagation()**-u copy-paste etmək? Yaxşı deyil.

Bunun əvəzinə yenə bir higher-order komponent tətbiq edə bilərik. Bu dəfə komponenti qəbul edəcək, onu **onKeyPress** callback əlavə olunmuş bir **div**-ə bükəcək və komponenti dəyişmədən geri qaytaracaq.

```tsx
export const withSuppressKeyPress = (Component) => {
return (props) => {
 const onKeyPress = (event) => {
 event.stopPropagation();
 };
 return (
 <div onKeyPress={onKeyPress}>
 <Component {...props} />
 </div>
 );
 };
};
```

Bəli, bu qədər! İndi istənilən komponenti onun içində bükə bilərik:

```tsx
const ModalWithSuppressedKeyPress =
 withSuppressKeyPress(Modal);
const DropdownWithSuppressedKeyPress =
 withSuppressKeyPress(Dropdown);
// etc
```

Və sadəcə onu hər yerdə istifadə edə bilərik:

```tsx
const Component = () => {
 return <ModalWithSuppressedKeyPress />;
};
```

İndi isə, bu modal açıq və fokuslanmış olduqda, hər hansı bir düymə basılması hadisəsi elementlərin hierarxiyası üzrə yuxarı doğru yayılacaq, ta ki **withSuppressKeyPress**-də modalı bükən div-ə çatana qədər və orada dayandırılacaq.

Vəzifə yerinə yetirildi və Modal komponentini həyata keçirən inkişafçılar bunun haqqında bilmək və ya narahat olmaq məcburiyyətində deyillər.

Interactive example and full code
https://advanced-react.com/examples/07/05

Əsas məqamlar

Düşünürəm ki, kitab üçün tarix dərsi kifayətdir. Növbəti fəsilə, React-in ən həyəcanlı və ən mübahisəli hissəsi olan **state idarəetməsi**-yə keçməzdən əvvəl bir neçə şeyi yadda saxlamaq lazımdır:

- Higher-order komponent sadəcə bir funksiyadır ki, komponenti arqument kimi qəbul edir və yeni bir komponent qaytarır.
- Bu yeni komponent arqument kimi verilən komponenti render edir.
- Higher-order komponentdə bükülmüş komponentlərə **props** və ya əlavə məntiq əlavə edə bilərik.

```tsx
// accept a Component as an argument
const withSomeLogic = (Component) => {
 // inject some logic here
 // return a component that renders the component from the
//argument
 // inject some prop to it
 return (props) => {
 // or inject some logic here
 // can use React hooks here, it's just a component
 return <Component {...props} some="data" />;
 };
};
```

Higher-order komponentə əlavə məlumatları ötürə bilərik, ya funksiyanın arqumenti vasitəsilə, ya da **props** vasitəsilə.

# Fəsil 8. React Context və performans

“React-də re-render” bulmacasının son və çox vacib hissəsi **Context**-dir. Context, re-render mövzusunda pis bir reputasiyaya sahibdir. Mən belə bir hiss edirəm ki, bəzən insanlar Context-i elə bir pis xortum kimi qəbul edirlər ki, sadəcə tətbiqdə dolaşır və sadəcə bacardığı üçün spontan və dayanıqsız re-render-lərə səbəb olur. Nəticədə, inkişafçılar bəzən Context-dən hər qiymətə qaçmağa çalışırlar.

Bu reputasiyanın bir hissəsi haqlıdır, əlbəttə: Context-in müəyyən problemləri var. Lakin çox vaxt qiymətləndirilməyən və ya ümumiyyətlə bilinməyən bir şey odur ki, Context lazımsız re-render-lərin qarşısını ala və nəticədə tətbiqimizin performansını əhəmiyyətli dərəcədə yaxşılaşdıra bilər. Təbii ki, düzgün və diqqətli tətbiq olunduqda.

Ən önəmlisi isə odur ki, Context-i başa düşmək **Redux** kimi xarici state idarəetmə kitabxanalarında çox faydalıdır. Mental model tam olaraq eynidir. Context-i öyrənsəniz, hər hansı bir state idarəetmə kitabxanasını minimal səy ilə ən optimal şəkildə istifadə edə biləcəksiniz.

Gəlin indi bir tətbiqi Context ilə və Context-siz həyata keçirək, imkanları araşdıraq və bu prosesdə öyrənək:

Context-in təmin edə biləcəyi performans yaxşılaşmaları.

Context-dən istifadə zamanı nəzərə alınmalı məqamlar.

Context-dən maksimum yararlanmaq və onun səbəb olduğu lazımsız re-render-lərin qarşısını necə almaq.

Problem
Təsəvvür edin ki, siz iki sütunlu layout-a sahib bir səhifə həyata keçirirsiniz: solda sidebar, sağda isə “əsas” hissə. Sol tərəfdəki sidebar yığıla bilən olmalıdır: bir düyməsi olacaq və ona kliklədikdə sidebar “darıx” görünüşünə yığılacaq və ya geri açılaraq “geniş” görünüşə qayıdacaq. Nəticədə əsas hissə də böyüyə və ya kiçilə bilər. Və həmin əsas hissənin aşağısında bir blok var ki, orada sidebar yığılanda nəyisə üç sütunda, açıq olduqda isə iki sütunda göstərmək istəyirsiniz. Məsələn, bir şəkil qalereyası və ya reklam blokları.

!image.png

Kod baxımından tətbiq təxminən belə görünərdi. Bütün tətbiqi bir araya gətirən **Page** komponenti olardı:

```tsx
const Page = () => {
 return (
 <Layout>
 <Sidebar />
 <MainPart />
 </Layout>
 );
};
```

**Sidebar** komponenti isə bir neçə link, plagin, menyu və s. render edir, həmçinin “aç/bağla” düyməsinə sahib olur:

```tsx
const Sidebar = () => {
 return (
 <div className="sidebar">
 {/* this one will control the expand/collapse */}
 <ExpandButton />
 {/* ... other sidebar stuff */}
 <Link ... />
 <Plugin ... />
 </div>
 )
}
```

Və **MainPart** komponenti — çoxlu “ağır” (yavaş işləyən) şeyləri render edir və ən aşağısında isə bir blok var ki, Sidebar açıq və ya yığılmış olmasına görə iki və ya üç sütunu render edəcək:

```tsx
const MainPart = () => {
 return (
 <>
 <VerySlowComponent />
 <AnotherVerySlowComponent />
 {/* this one needs to know whether the sidebar is expanded
or collapsed */}
 {/* it will render two or three columns, depending on this
information */}
 <AdjustableColumnsBlock />
 </>
  );
};
```

İndi isə, “aç/bağla” davranışını necə həyata keçirərdik? Bunun üçün bir **isNavExpanded** state əlavə edib həmin məlumatı orada saxlamalıyıq. Həm Sidebar komponentindəki **ExpandButton**, həm də MainPart-dakı **AdjustableColumnsBlock** bu state-ə çıxışa malik olmalıdır. Bunu nəzərə alsaq, əgər biz bunu sadə (naiv) şəkildə həyata keçirsəydik, həmin state-i bu iki komponentin ən yaxın parent-i olan **Page**-də saxlamaqdan başqa seçimimiz qalmazdı.

```tsx
const Page = () => {
 const [isNavExpanded, setIsNavExpanded] = useState();
 return ...
}
```

Və sonra **set** funksiyasını və state-in özünü **Sidebar** və **MainPart** komponentlərinin **props**-ları vasitəsilə **ExpandButton**-a ötürməliyik:

```tsx
const Sidebar = ({ isNavExpanded, toggleNav }) => {
 return (
 <div className="sidebar">
 {/* pass the props here */}
 <ExpandButton
 isExpanded={isNavExpanded}
 onClick={toggleNav}
 />
 {/* ... // the rest of the stuff */}
 </div>
 );
};
```

və **AdjustableColumnsBlock**-a da:

```tsx
const MainPart = ({ isNavExpanded }) => {
return (
 <>
 <VerySlowComponent />
 <AnotherVerySlowComponent />
 <AdjustableColumnsBlock
 isNavExpanded={isNavExpanded}
 />
 </>
 );
};
```

Beləliklə, **Page** komponentinin tam kodu təxminən belə görünəcək:

```tsx
const Page = () => {
 const [isNavExpanded, setIsNavExpanded] = useState();
 return (
 <Layout>
 <Sidebar
 isNavExpanded={isNavExpanded}
 toggleNav={() => setIsNavExpanded(!isNavExpanded)}
 />
 <MainPart isNavExpanded={isNavExpanded} />
 </Layout>
 );
};
```

Texniki baxımdan bu işləyəcək, amma ən yaxşı həll deyil. İlk növbədə, Sidebar və MainPart indi istifadə etmədikləri, sadəcə alt komponentlərə ötürdükləri props-lara sahibdirlər – bu onların API-sini şişirdir və oxunmasını çətinləşdirir.

İkincisi, performans olduqca zəif olacaq. Re-render baxımından nə baş verəcək? Hər dəfə düyməyə kliklədikdə və naviqasiya açılıb/yığılarkən, **Page** komponentindəki state dəyişəcək. Və Fəsil 1-də “Re-render-lərə giriş”dən bildiyimiz kimi, state update bu komponenti və içindəki bütün komponentləri, o cümlədən onların uşaqlarını yenidən render etməyə səbəb olacaq. Həm Sidebar, həm də MainPart çoxlu komponentlərə malikdir, bəziləri isə kifayət qədər yavaşdır. Nəticədə, bütün səhifənin yenidən render olunması yavaş olacaq və naviqasiyanın açılıb/yığılması gecikməli və laglı olacaq.

Interactive example and full code
https://advanced-react.com/examples/08/01

Təəssüf ki, əvvəlki fəsillərdəki kompozisiya üsullarından heç birini bunu önləmək üçün sadəcə istifadə edə bilmərik: onların hamısı əslində re-render-ə səbəb olan state-ə bağlıdır. Ola bilsin ki, bu state-dən asılı olmayan yavaş ara komponentləri **memoize** edə bilərik. Amma bunun kodu daha da şişəcək: hamısı **memoize** edilməlidir!

Daha yaxşı bir yol var: **Context**.

Context necə kömək edə bilər

Belə vəziyyətlərdə **Context** (və ya hər hansı kontekst-əsaslı state idarəetmə kitabxanası) çox güclüdür. Onlar bizə imkan verir ki, komponentlər ağacından “qaçaq” və məlumatı **props** vasitəsilə ötürmək əvəzinə, ən yuxarıdakı komponentdən birbaşa ən aşağıdakı komponentə göndərək.

!image.png

Bu cür işləyəcək. Biz expand/collapse funksionallığını `Page` komponentindən kənara çıxara bilərik. Yalnız state və toggle funksiyası, başqa heç nə:

```tsx
const NavigationController = () => {
 const [isNavExpanded, setIsNavExpanded] = useState();
 const toggle = () => setIsNavExpanded(!isNavExpanded);
};
```

Sonra isə, `Page` üzərində render olunmalı olan hər şeyi `children` kimi ötürürük (bu pattern-i ətraflı şəkildə 2-ci Fəsildə müzakirə etmişdik: **Elementlər, children kimi props və re-render-lər**):

```tsx
const NavigationController = ({ children }) => {
 const [isNavExpanded, setIsNavExpanded] = useState();
 const toggle = () => setIsNavExpanded(!isNavExpanded);
 return children;
};
```

Bu, "children kimi props" pattern-dir. Sonra `Page` bütün digər şeylərin üstündə həmin controller-dan istifadə edir:

```tsx
const Page = () => {
 return (
 <NavigationController>
 <Layout>
 <Sidebar />
 <MainPart />
 </Layout>
 </NavigationController>
 );
};
```

Bütün props yox olacaq və ən əsası, `Page` içindəki `Layout` və `Sidebar` kimi komponentlər `NavigationController` içindəki state dəyişikliklərindən təsirlənməyəcək. 2-ci Fəsildə **Elementlər, children kimi props və re-render-lər** mövzusunda qeyd etdiyimiz kimi, belə ötürülmüş children heç nə digər props-dan fərqli deyil və props state dəyişikliklərindən təsirlənmir.

Nəhayət, `NavigationController`-də Context-i tətbiq edirik, bu Context navigation state-ni və onu dəyişmək üçün API-ni (yəni toggle funksiyasını) saxlayacaq:

```tsx
// creating context with default values
const Context = React.createContext({
 isNavExpanded: true,
 toggle: () => {},
});
```

`NavigationController` daxilində həmin Context provider-i render edin:

```tsx
const NavigationController = ({ children }) => {
 const [isNavExpanded, setIsNavExpanded] = useState();
 const toggle = () => setIsNavExpanded(!isNavExpanded);
 return <Context.Provider>{children}</Context.Provider>;
};
```

Və nəhayət, işləməsini təmin edən addım: bu Context-ə `value` property-ni ötürürük. Sadəcə `isNavExpanded` state dəyərini və `toggle` funksiyasını ehtiva edən bir obyekt.

```tsx
const NavigationController = ({ children }) => {
 const [isNavExpanded, setIsNavExpanded] = useState();
 const toggle = () => setIsNavExpanded(!isNavExpanded);
  const value = { isNavExpanded, toggle };
 return (
 <Context.Provider value={value}>
 {children}
 </Context.Provider>
 );
};
```

İndi, həmin provider-dən aşağıya render olunan hər bir komponent (hətta `children` kimi ötürülənlər belə!) artıq `useContext` hook-u vasitəsilə həmin dəyərə çıxış əldə edəcək.

Biz gözəl bir `useNavigation` hook-u təqdim edə bilərik:

```tsx
// pass that Context to the useContext hook
const useNavigation = () => useContext(Context);
```

Sonra həmin hook-dan istifadə edərək, bu məlumatlara birbaşa çıxış əldə edirik, yalnız bu məlumatlara ehtiyacı olan komponentlərdə. Biz bunu expand/collapse düyməsində tətbiq edəcəyik:

```tsx
const ExpandButton = () => {
 const { isNavExpanded, toggle } = useNavigation();
 return (
 <button onClick={toggle}>
 {isNavExpanded ? 'Collapse' : 'Expand'}
 </button>
 );
};
```

Və navigation state-ə əsaslanaraq fərqli sayda sütun render etmək istədiyimiz blokda birbaşa istifadə edirik:

```tsx
const AdjustableColumnsBlock = () => {
const { isNavExpanded } = useNavigation();
 return isNavExpanded ? <TwoColumns /> : <ThreeColumns />;
};
```

İndi heç bir yerdə props ötürməyə ehtiyac qalmadı! İndi state dəyişdikdə, Context provider-dəki `value` prop dəyişəcək və yalnız `useNavigation` hook-dan istifadə edən komponentlər re-render olacaq. `Sidebar` və `MainBlock` içindəki digər komponentlər isə bunu istifadə etmədiyindən təhlükəsiz qalacaq və re-render olmayacaq. Beləcə, Context-in sadə istifadəsi ilə bütün tətbiqin performansını kəskin şəkildə artırmış olduq.

Interactive example and full code
https://advanced-react.com/examples/08/02

Əlbəttə, Context ilə işləyərkən hər şey həmişə ideal olmur. Əks halda, onun belə pis bir nüfuzu olmazdı. Context-i tətbiqə daxil edərkən üç əsas məqamı yaxşı bilmək lazımdır:

1. Context consumer-lar Provider-dəki `value` dəyişdikdə re-render olacaq.
2. Hətta `value`nun yalnız bir hissəsini istifadə etsələr belə, hamısı re-render olur.
3. Bu re-render-ləri memoization ilə asanlıqla qarşısını almaq mümkün deyil.

Gəlin bu məqamları daha yaxından nəzərdən keçirək və necə yumşaldıla biləcəyini öyrənək.

**Context dəyərinin dəyişməsi**

Hər dəfə Context provider-dəki `value` prop dəyişdikdə, bu Context-dən istifadə edən bütün komponentlər re-render olacaq.

Gəlin Context kodumuza bir daha nəzər salaq:

```tsx
const NavigationController = ({ children }) => {
 const [isNavExpanded, setIsNavExpanded] = useState();
 const toggle = () => setIsNavExpanded(!isNavExpanded);
 const value = { isNavExpanded, toggle };
 return (
 <Context.Provider value={value}>
 {children}
 </Context.Provider>
 );
};
const useNavigation = () => useContext(Context);
```

Hər dəfə state-i dəyişdirdikdə, `value` obyekti dəyişir, buna görə `useNavigation` vasitəsilə bu Context-dən istifadə edən hər bir komponent yenidən render olunur. Bu təbii və gözlənilən haldır: biz hamının ən son dəyərə çıxış əldə etməsini istəyirik və React-də komponentləri yeniləməyin yeganə yolu re-render-dır.

Amma, əgər `NavigationController` başqa səbəbdən, öz state dəyişikliklərindən başqa, re-render olsa nə olar? Məsələn, bu re-render valideyn komponent tərəfindən tetiklənirsə?

`NavigationController` da re-render olacaq: bu React-in təbii re-render zənciridir. `value` obyekti yenidən yaradılacaq və yenidən React obyektləri re-renderlər arasında müqayisə etməlidir. Burada **referential equality** problemi yenidən ortaya çıxır (bunu 6-cı Fəsildə **Deep dive into diffing and reconciliation** mövzusunda ətraflı izah etmişdik). Nəticədə, provider-ə ötürdüyümüz `value` dəyişəcək və bu Context-dən istifadə edən bütün komponentlər səbəbsiz yerə re-render olacaq.

Kiçik tətbiqimizdə bu problem deyil: provider ən üst səviyyədə yerləşir, yəni onun üstündə heç nə re-render ola bilməz. Lakin bu həmişə belə olmur. Böyük və mürəkkəb tətbiqlərdə, bir gün kimsə həmin provider-in re-render olunmasına səbəb olacaq bir dəyişiklik edə bilər.

Məsələn, `Page` komponentində bir gün provider-i `Layout` komponentinin içərisinə köçürtməyə qərar verə bilərəm ki, `Page`-i sadələşdirim:

```tsx
const Page = () => {
 return (
 <Layout>
 <Sidebar />
 <MainPart />
 </Layout>
 );
};
```

və indi `Layout` Context-i render edəcək:

```tsx
const Layout = ({ children }) => {
 return (
 <NavigationController>
 <div className="layout">{children}</div>
 </NavigationController>
 );
};
```

Hər şey əvvəlki kimi mükəmməl işləyir, yalnız kompozisiya bir az daha təmizləşmiş olur. Amma əgər mən `Layout`-a bəzi state-lər əlavə etsəm nə olar? Məsələn, orada səhifədə scroll-u izləmək istəyirəmsə:

```tsx
const Layout = ({ children }) => {
 const [scroll, setScroll] = useState();
 useEffect(() =>{
  window.addEventListener('scroll', () => {
 setScroll(window.scrollY);
 });
 }, []);
 return (
 <NavigationController>
 <div className="layout">{children}</div>
 </NavigationController>
 );
};
```

Normalda bu problem olmazdı: bu, "children kimi props" pattern-dir, state yalnız `Layout` ilə məhdudlaşır və `Page`-də başqaları təsirlənmir.

Amma bu halda, `NavigationController` komponenti də içəridə render olunur. Beləliklə, scroll zamanı state dəyişməsi onu re-render edəcək, provider-dəki `value` dəyişəcək və bu Context-dən istifadə edən bütün komponentlər yenidən render olunacaq.

Əgər həmin Context ağır bir komponentdə və ya çoxlu children-i olan komponentdə istifadə olunursa, o zaman – ups, hər scroll zamanı tətbiqin yarısı re-render olacaq və hər şey çox yavaşlayacaq.

Interactive example and full code
https://advanced-react.com/examples/08/03

Xoşbəxtlikdən, bütün bunların qarşısını asanlıqla almaq mümkündür. Biz sadəcə provider-ə ötürülən `value`-nu **useMemo** və **useCallback** ilə memoizə etməliyik:

```tsx
const NavigationController = ({ children }) => {
 const [isNavExpanded, setIsNavExpanded] = useState();
 const toggle = useCallback(() => {
 setIsNavExpanded(!isNavExpanded);
 }, [isNavExpanded]);
 const value = useMemo(() => {
 return { isNavExpanded, toggle };
 }, [isNavExpanded, toggle]);
 return (
 <Context.Provider value={value}>
 {children}
 </Context.Provider>
 );
};
```

Interactive example and full code
https://advanced-react.com/examples/08/04

Bu, həqiqətən də default olaraq hər zaman memoizə etməyin **premature optimization** olmadığı nadir hallardan biridir. Bu, gələcəkdə demək olar ki, qaçılmaz olaraq yaranacaq daha böyük problemlərin qarşısını alacaq.

**Lazımsız Context re-render-lərinin qarşısını almaq: provider-ləri bölmək**

Bütün context consumer-lar value dəyişdikdə re-render olurlar, amma vacib olan təkcə "value dəyişir" deyil, həm də **hamısı bunu edəcək**. Əgər mən navigation API-ya state-dən asılı olmayan open və close funksiyalarını əlavə etsəm:

```tsx
const SomeComponent = () => {
 // no dependencies, open won't change
 const open = useCallback(() => setIsNavExpanded(true), []);
 // no dependencies, close won't change
 const close = useCallback(() => setIsNavExpanded(false), []);
 const value = useMemo(() => {
 return { isNavExpanded, open, close };
 }, [isNavExpanded, open, close]);
 return ...
}
```

Və onları haradansa istifadə etməyə çalışın:

```tsx
const SomeComponent = () => {
 const { open } = useNavigation();
 return ...
}
```

`SomeComponent` Context provider-dəki value dəyişdikdə re-render olacaq, baxmayaraq ki, `open` funksiyası əslində dəyişmir.

Və heç bir memoization bunu qarşısını ala bilməz. Məsələn, bu işə yaramayacaq:

```tsx
const useNavOpen = () => {
 const { open } = useNavigation();
 return useCallback(open, []);
};
```

Amma biz istədiyimiz nəticəyə çatmaq üçün "splitting providers" adlanan maraqlı texnikadan istifadə edə bilərik.

Belə işləyir: tək bir Context-də hər şeyi saxlamaq əvəzinə, iki Context yarada bilərik: biri dəyişən value-ları, digəri isə dəyişməyənləri saxlayacaq.

```tsx
// store the state here
const ContextData = React.createContext({
 isNavExpanded: false,
});
// store the open/close functions here
const ContextApi = React.createContext({
 open: () => {},
 close: () => {},
});
```

Və `NavigationController`-də tək bir provider əvəzinə iki provider render edəcəyik:

```tsx
const NavigationController = ({ children }) => {
 ...
 return (
 <ContextData.Provider value={data}>
 <ContextApi.Provider value={api}>
 {children}
 </ContextApi.Provider>
 </ContextData.Provider>
 )
}
```

Biz həmin provider-lərə ötürdüyümüz dəyərlər state-i saxlayan və yalnız `open` və `close` funksiyalarına referansları ehtiva edən API olacaq.

```tsx
const NavigationController = ({ children }) => {
 ...
  // that one has a dependency on state
 const data = useMemo(() => ({ isNavExpanded }), [isNavExpanded]);
 // that one never changes - no dependencies
 const api = useMemo(() => ({ open, close }), [close, open]);
 return (
 <ContextData.Provider value={data}>
 <ContextApi.Provider value={api}>
 {children}
 </ContextApi.Provider>
 </ContextData.Provider>
 )
}
```

Təəssüf ki, burada `toggle` funksiyasını çıxarmalıyıq. O state-dən asılıdır, ona görə onu API-ya daxil etmək mümkün deyil və dataya əlavə etmək də mənalı deyil.

İndi isə Context-i abstraktlaşdırmaq üçün iki hook təqdim etməliyik:

```tsx
const useNavigationData = () => useContext(ContextData);
const useNavigationApi = () => useContext(ContextApi);
```

Sonra `SomeComponent`-də `open` funksiyasından sərbəst istifadə edə bilərik. O expand/collapse-u nəzərdə tutulduğu kimi tetiklayacaq, amma `SomeComponent` bunun səbəbindən re-render olmayacaq:

```tsx
const SomeComponent = () => {
 const { open } = useNavigationApi();
 return ...
}
```

Exactly, doğru olaraq. Bu dəyişiklik yalnız state-ə çıxış üçün hook-u əvəz edir, digər komponentlər və render məntiqi eyni qalır.

```tsx
const AdjustableColumnsBlock = () => {
 const { isNavExpanded } = useNavigationData();
 return isNavExpanded ? <TwoColumns /> : <ThreeColumns />;
};
```

Interactive example and full code
https://advanced-react.com/examples/08/05

Əlbəttə, bu provider-ləri istədiyimiz qədər incə şəkildə bölə bilərik. Bu tamamilə tətbiqiniz üçün nə məntiqlidirsə və Context-dən yaranan re-render-lərin həqiqətən zərərli olub-olmamasına bağlıdır.

**Reducers və split provider-lər**

Yuxarıda görmüsünüzsə, toggle funksiyasını tətbiqdən çıxarmalı oldum. Təəssüf ki, toggle state-dən asılıdır, ona görə onu API provider-ə əlavə etsəydim, o da state-dən asılı olacaqdı və split artıq məntiqi olmazdı:

```tsx
const NavigationController = ({ children }) => {
 ...
 // depends on isNavExpanded
 const toggle = useCallback(() =>
setIsNavExpanded(!isNavExpanded), [isNavExpanded]);
 // with toggle it has to depend on isNavExpanded through toggle
function
 // so will change with every state update
 const api = useMemo(() => ({ open, close, toggle }), [open,
close, toggle]);
 return (
 <ContextData.Provider value={data}>
 <ContextApi.Provider value={api}>
 {children}
 </ContextApi.Provider>
 </ContextData.Provider>
 )
```

Bu isə ideal deyil. İndi, həmin state-dən istifadə etmək istəyən hər kəs toggle funksionallığını özü implementasiya etməli olacaq:

```tsx
const ExpandButton = () => {
 const { isNavExpanded, open, close } = useNavigation();
 return (
 <button onClick={isNavExpanded ? close : open}>
 {isNavExpanded ? 'Collapse' : 'Expand'}
 </button>
 );
};
```

Bu çox da məntiqli görünmür. Əslində, naviqasiyanın API-si belə ümumi halları özü idarə edə bilməlidir.

Və edə də bilər! Bizim etməli olduğumuz yeganə şey adi state idarəsini **useState** hook-undan **useReducer**-ə keçirməkdir.

**useReducer** komponentin state-ini idarə etməyin fərqli bir yoludur. State-in necə dəyişəcəyini bilib onu əl ilə idarə etmək əvəzinə, reducer nümunəsi bizə sadəcə adlandırılmış “action”ları göndərməyə imkan verir. Bu, adətən state mürəkkəb olduqda və ya həmin state üzərində çətin əməliyyatlar aparmaq lazım olduqda, onları idarə etmək üçün daha strukturlaşdırılmış yanaşma təmin edir.

Bizim halda isə bu təxminən belə görünəcək: **isNavExpanded** state-i və onu əl ilə dəyişən **open**, **close** və **toggle** funksiyaları əvəzinə...

```tsx
const [isNavExpanded, setIsNavExpanded] = useState();
const toggle = () => setIsNavExpanded(!isNavExpanded);
const open = () => setIsNavExpanded(true);
const close = () => setIsNavExpanded(false);
```

Biz bir **reducer** təqdim edəcəyik:

```tsx
const [state, dispatch] = useReducer(reducer, {
 isNavExpanded: true,
});
```

Və funksiyalarımızı belə elan edəcəyik:

```tsx
const toggle = () => dispatch({ type: 'toggle-sidebar' });
const open = () => dispatch({ type: 'open-sidebar' });
const close = () => dispatch({ type: 'close-sidebar' });
```

Diqqət edin ki, funksiyalardan heç biri artıq state-dən asılı deyil, **toggle** da daxil olmaqla. Onların etdikləri tək şey bir **action** göndərməkdir.

Sonra biz **reducer** funksiyasını təqdim edəcəyik və onun daxilində bütün action-larımız üçün state manipulyasiyalarını həyata keçirəcəyik. **Reducer** funksiyası həmin state-i idarə edir və dəyişdirir. Funksiya transformasiya etməli olduğu state-i və yuxarıda **dispatch**-də istifadə etdiyimiz “action” dəyərini qəbul edir.

```tsx
const reducer = (state, action) => {
 ...
}
```

Bunu həyata keçirmək üçün sadə bir **switch/case** əməliyyatından istifadə edəcəyik:

```tsx
const reducer = (state, action) => {
 switch (action.type) {
 case 'open-sidebar':
 return { ...state, isNavExpanded: true };
 case 'close-sidebar':
 return { ...state, isNavExpanded: false };
 case 'toggle-sidebar':
 // we'll have access to the old value here - it's our "state"
 // so just flip it around
 return {
 ...state,
 isNavExpanded: !state.isNavExpanded,
 };
 }
};
```

İndi etməli olduğumuz tək şey bu funksiyaları **API**-mizə əlavə etməkdir:

```tsx
const NavigationController = () => {
 // state and dispatch are returned from the useReducer
 const [state, dispatch] = useReducer(reducer, { ... });
 const api = useMemo(() => {
 return {
 open: () => dispatch({ type: 'open-sidebar' }),
 close: () => dispatch({ type: 'close-sidebar' }),
 toggle: () => dispatch({ type: 'toggle-sidebar' }),
 }
 // don't depend on the state directly anymore!
 }, []);
}
```

Və indi, həmin **api** dəyərini **provider**-ə ötürdüyümüz zaman, bu **Context**-in heç bir istifadəçisi state dəyişdikdə yenidən render olunmayacaq: dəyər heç vaxt dəyişmir! Və biz **toggle** funksiyasını tətbiqin istənilən yerində təhlükəsiz şəkildə istifadə edə bilərik, performans problemləri yaratmaqdan qorxmadan.

Interactive example and full code
https://advanced-react.com/examples/08/06

Bu **reducer** nümunəsi xüsusilə faydalıdır, əgər birdən çox state dəyişəni varsa və state üzərində daha mürəkkəb əməliyyatlar aparmaq lazımdırsa, sadəcə boolean dəyəri **false**-dan **true**-ya dəyişdirmək əvəzinə. Amma **re-render** baxımından bu, **useState** ilə eynidir: state-i **dispatch** vasitəsilə yeniləmək komponentin yenidən render olunmasına səbəb olur.

**Context selector-lar**

Amma əgər state-i **reducer**-lərə keçirmək və ya provider-ları bölmək istəmirsinizsə nə olacaq? Yalnız bəzən **Context**-dən bir dəyəri performans baxımından həssas bir sahədə istifadə etməyiniz lazım olsa və tətbiqin qalan hissəsi problemsiz işləsə, nə etməli? Məsələn, ağır bir editor komponentinə fokuslandığım zaman naviqasiyanı bağlayıb səhifəni fullscreen rejimə keçirmək istəyirəmsə?

Provider-ları bölmək və **reducer**-lərlə işləmək yalnız bir dəfə **Context**-dən **open** funksiyasını istifadə etmək üçün çox ekstremal dəyişiklik kimi görünür.

**Redux** kimi bir sistemdə bu halda **memoized state selector**-lardan istifadə edərdik. Təəssüf ki, **Context** üçün bu işləməyəcək – **context value** dəyişdiyi zaman hər bir consumer komponent yenidən render olunacaq.

```tsx
**const useOpen = () => {
 const { open } = useContext(Context);
 // even if we additionally memoize it here, it won't help
 // change in Context value will trigger re-render of the
component that uses useOpen
 return useMemo(() => open, []);
};**
```

Amma bir hiylə var ki, istədiyimiz davranışı təqlid edə bilər və **Context**-dən komponentin yenidən render olunmasına səbəb olmayan bir dəyəri seçməyə imkan verər. Bunun üçün **Higher Order Components (HOC)** gücündən istifadə edə bilərik!

Hiylə belədir: əvvəlcə bir **withNavigationOpen** adlı higher-order komponent yaradırıq:

```tsx
// it's a HOC, so it accepts a component and returns another
component
const withNavigationOpen = (AnyComponent) => {
 return (props) => <AnyComponent {...props} />;
};
```

İkincisi, **Context**-dən **open** funksiyasını provider-dən çıxarıb, onu argument olaraq verilən komponentə prop kimi ötürəcəyik:

```tsx
const withNavigationOpen = (AnyComponent) => {
 return (props) => {
 // access Context here - it's just another component
 const { open } = useContext(Context);
 return <AnyComponent {...props} openNav={open} />;
 };
};
```

İndi, həmin **HOC** ilə əhatə olunan hər bir komponentdə **openNav** prop-u olacaq:

```tsx
// openNav is coming from HOC
const SomeHeavyComponent = withNavigationOpen(
 ({ openNav }) => {
 return <button onClick={openNav} />;
 },
);
```

Amma bu hələ heç nə həll etmir: ağır komponent **Context**-in dəyəri dəyişdikcə yenidən render olunmağa davam edəcək. Burada son addım lazımdır: HOC-ə argument olaraq verdiyimiz komponenti **memoize** etmək:

```tsx
const withNavigationOpen = (AnyComponent) => {
 // wrap the component from the arguments in React.memo here
 const AnyComponentMemo = React.memo(AnyComponent);
 return (props) => {
 const { open } = useContext(Context);
 // return memoized component here
 // now it won't re-render because of Context changes
 // make sure that whatever is passed as props here don't
change between re-renders!
 return <AnyComponentMemo {...props} openNav={open} />;
 };
};
```

İndi, **Context** dəyəri dəyişdikdə, **Context**-dən hər hansı bir şey istifadə edən komponent hələ də yenidən render olunacaq: **withNavigationOpen** funksiyasından qaytardığımız naməlum komponent. Amma bu komponent başqa bir memoized komponenti render edir. Beləliklə, əgər onun prop-ları dəyişməzsə, bu re-render səbəbindən yenidən render olunmayacaq.

Prop-lar dəyişməyəcək: çünki **spread** olunan prop-lar "xaricdən" gəlir və context dəyişikliyindən təsirlənməyəcək. Və **open** funksiyası özündə **Context provider** daxilində memoized edilib.

Bizim **SomeHeavyComponent** təhlükəsiz şəkildə **openNav** funksiyasını istifadə edə bilər: **Context** dəyəri dəyişdikdə yenidən render olunmayacaq.

Interactive example and full code
https://advanced-react.com/examples/08/07

**Əsas nəticələr**

Ümid edirəm bu fəsil sizə **Context**-in re-render-lər zamanı nə qədər faydalı ola biləcəyinə dair bir fikir verib. Eyni zamanda komponentlərdə prop-ları azaltmaq üçün də faydalıdır. Əlbəttə, mən hər yerdə **Context** istifadə etməyi tövsiyə etmirəm: onun çatışmazlıqları kifayət qədər ciddi ola bilər. Daha böyük və mürəkkəb tətbiqlər üçün dərhal xarici state idarəetmə həllinə keçmək daha yaxşıdır — xüsusən **memoized selector** dəstəyi olan həllər.

Amma daha kiçik tətbiqlərdə işləyə bilər, yəni yalnız bir neçə yerdə **Context**-in mental modelindən fayda götürmək mümkündür.

Və unutmayın:

**Context** (və ya hər hansı context-ə oxşar state idarəetmə kitabxanası) ilə məlumatı render ağacında bir komponentdən digərinə birbaşa ötürə bilərik, prop-lar vasitəsilə ötürməyə ehtiyac olmadan. Bu üsulla məlumat ötürmək tətbiqimizin performansını yaxşılaşdıra bilər, çünki aradakı bütün komponentlərin yenidən render olunmasının qarşısını alırıq.

Amma **Context** təhlükəli ola bilər: onu istifadə edən bütün komponentlər **Context provider**-dəki dəyər dəyişdikdə yenidən render olunur. Bu re-render-i standart **memoization** üsulları ilə dayandırmaq mümkün deyil.

**Context** re-render-lərini minimuma endirmək üçün:

- Provider-ə verdiyimiz dəyəri həmişə memoize etməliyik.
- Provider-ları bir neçə hissəyə bölmək re-render-ləri daha da azaltmağa kömək edə bilər.
- **useState**dən **useReducer**ə keçid bunu asanlaşdırır.

Hətta **Context** üçün proper selector-lar olmasa da, onların funksionallığını **higher-order component** və **React.memo** ilə təqlid edə bilərik.

# 9-cu fəsil. Refs: məlumatların saxlanmasından imperative API-yə qədər

React-in ən gözəl cəhətlərindən biri odur ki, o, real DOM ilə işləməyin mürəkkəbliyini bizdən gizlədir. Elementləri əl ilə axtarmaq, həmin elementlərə necə class əlavə edəcəyimizi düşünmək və ya brauzerlər arasındakı uyğunsuzluqlarla mübarizə aparmaq əvəzinə, sadəcə komponentlər yazıb istifadəçi təcrübəsinə fokuslana bilirik.

Amma elə hallar da olur (çox az olsa da!) ki, bizə real DOM-a çıxış lazım olur.

Bunun üçün isə **Refs**-dən istifadə etməliyik. Bu dəfə heç bir sirr yoxdur, sadəcə input sahəsinin sadə validasiyası ilə maraqlı bir forma hazırlayaq. Bu prosesdə öyrənəcəyik:

- Niyə hələ də DOM elementlərinə çıxışa ehtiyacımız var.
- Ref nədir və Ref ilə state arasındakı fərq.
- Refs-dən istifadə edərək UI elementlərinə necə çıxış etmək olar.
- forwardRef nədir, onu necə istifadə etmək və hansı hallarda istifadə etməmək lazımdır (niyə olduğunu görəcəksiniz!).
- Niyə React-də hələ də imperative API-lərə ehtiyac var və onları useImperativeHandle ilə və ya onsuz necə implement etmək olar.

React-də DOM-a çıxış
Tutaq ki, təşkil etdiyim bir konfrans üçün qeydiyyat forması hazırlamaq istəyirəm. İstəyirəm ki, insanlar mənə adlarını, email ünvanlarını və Twitter hesablarını versinlər ki, onlara ətraflı məlumat göndərə bilim. “Ad” və “email” sahələrini məcburi etmək istəyirəm. Amma istəmirəm ki, insanlar bu sahələri boş buraxıb göndərməyə çalışanda onların ətrafında qıcıqlandırıcı qırmızı çərçivələr görünsün. Formanın “cool” görünməsini istəyirəm. Ona görə də, bunun əvəzinə boş sahəyə fokuslanmaq və diqqəti çəkmək üçün onu bir az “silkələmək” istəyirəm, sadəcə əyləncə olsun deyə.

İndi, React bizə çox şey verir, amma hər şeyi yox. Məsələn, “elementə əl ilə fokuslanmaq” və ya “elementi silkələmək” kimi şeylər paketdə yoxdur. Bunun üçün biz köhnə native JavaScript API bacarıqlarımızı işə salmalıyıq. Və bunun üçün real DOM elementinə çıxış lazımdır.

React-siz dünyada bunu təxminən belə edərdik:

```tsx
const element = document.getElementById('bla');
```

Bundan sonra isə biz həmin elementə fokuslana bilərik:

```tsx
element.focus();
```

Və ya həmin elementə sürüşdürə bilərik:

```tsx
element.scrollIntoView();
```

Və ya ürəyimizin istədiyi başqa hər şeyi edə bilərik. React dünyasında native DOM API-dən istifadə üçün tipik hallar bunlardır:

- Render olunduqdan sonra elementə əl ilə fokuslanmaq, məsələn, formadakı input sahəsi.
- Popup tipli elementlər göstərilərkən komponentin xaricində klik edilməsini aşkar etmək.
- Ekranda göründükdən sonra elementə əl ilə sürüşdürmək.
- Komponentlərin ölçülərini və sərhədlərini hesablamaq ki, məsələn, tooltip-i düzgün yerləşdirmək mümkün olsun.

Texniki cəhətdən, bu gün belə getElementById istifadə etməyimizə heç nə mane olmur. Amma React bizə həmin elementə çıxış üçün bir qədər daha güclü bir yol təqdim edir — hər yerə id-lər yaymaq və ya DOM-un daxili quruluşundan xəbərdar olmaq tələb olunmur: **Refs**.

Ref nədir?
Ref — React-in re-render-lər arasında saxladığı dəyişdirilə bilən (mutable) obyekt deməkdir.

Xatırlayırsınızsa, komponentin içində elan edilən hər bir şey hər dəfə yenidən yaradılır, düzdür?

```tsx
const Component = () => {
 // "data" object will be new with every re-render
 const data = { id: 'test' };
};
```

Komponentlər sadəcə funksiyalardır, yəni onların içində olan hər şey əslində həmin funksiyanın lokal dəyişənidir. Refs bizə bu məhdudiyyəti keçməyə imkan verir.

Ref yaratmaq üçün isə `useRef` hook-dan istifadə edə bilərik və Ref-ə ilkin dəyəri ötürə bilərik:

```tsx
const Component = () => {
 const ref = useRef({ id: 'test' });
};
```

O ilkin dəyər artıq **ref.current** xüsusiyyəti vasitəsilə əlçatan olacaq: Ref-ə ötürdüyümüz hər şey orada saxlanılır.

```tsx
const Component = () => {
 // pass initial value here
 const ref = useRef({ id: 'test' });
 useEffect(() => {
 // access it here
 console.log(ref.current);
 });
};
```

İlkin dəyər cache-lənir, yəni re-render-lər arasında **ref.current**-i müqayisə etsək, istinad eyni qalacaq. Bu, sanki həmin obyekt üçün `useMemo` istifadə etmişik kimi işləyir.

Ref yaradıldıqdan sonra isə biz `useEffect` və ya event handler-lərin içində ona istənilən şeyi təyin edə bilərik. Bu sadəcə bir obyekt-dir, xüsusi heç nə yoxdur:

```tsx
const Component = () => {
 useEffect(() => {
 // assign url as an id, when it changes
 ref.current = { id: url };
 }, [url]);
};
```

Bütün bunlar state-ə çox bənzəyir, düzdür? Yeganə fərq API-dədir. Bəs hiylə nədir? Niyə hər yerdə state istifadə edirik, amma Ref “escape hatch” kimi qəbul olunur və onu tez-tez istifadə etmək tövsiyə edilmir? Gəlin əvvəl bunu aydınlaşdıraq, formamızı çox mürəkkəbləşdirməzdən əvvəl. Bəlkə orada ümumiyyətlə state-ə ehtiyac yoxdur?

### **Ref və state arasındakı fərq**

Gəlin formadan başlayaq və submit düyməsi ilə birlikdə ilk input sahəsini implementasiya edək.

```tsx
**const Form = () => {
 return (
 <>
 <input type="text" />
 <button onClick={submit}>submit</button>
 </>
  );
};**
```

İndi isə submit düyməmizin işləməsi üçün input sahəsinin məzmununu bir şəkildə əldə etməliyik. React-də adətən bunu belə edirik: input-a `onChange` callback əlavə edirik, həmin məlumatı state-də saxlayırıq ki, re-render-lər arasında qorunsun, və sonra submit funksiyasında ona çıxış edirik:

```tsx
const Form = () => {
 const [value, setValue] = useState();
 const onChange = (e) => {
 setValue(e.target.value);
 };
 const submit = () => {
 // send to the backend here
 console.log(value);
 };
 return (
 <>
 <input type="text" onChange={onChange} />
 <button onClick={submit}>submit</button>
 </>
 );
};
```

Amma mən bir neçə dəfə qeyd etmişəm ki, Ref-də saxladığımız hər şey də re-render-lər arasında qorunur. Və rahatlıq olsun deyə, Ref-ə istənilən şeyi təyin etmək olar. Bəs nə olar əgər input-dan gələn dəyəri state əvəzinə Ref-də saxlasam?

```tsx
const Form = () => {
 const ref = useRef();
 const onChange = (e) => {
 // save it to ref instead of state
 ref.current = e.target.value;
 };
 const submit = () => {
 // get it from ref instead of state
 console.log(ref.current);
 };
 return (
 <>
 <input type="text" onChange={onChange} />
 <button onClick={submit}>submit</button>
 </>
 );
};
```

Görünür ki, bu, state ilə eyni şəkildə işləyir: input sahəsinə bir şey yazıram, düyməni basıram və dəyər göndərilir.

Interactive example and full code
https://advanced-react.com/examples/09/01

Bəs fərq nədir? Və niyə bu pattern-i adətən tətbiqlərimizdə görmürük? Bunun bir neçə səbəbi var.

## Ref-in yenilənməsi re-render-i tetikləmir.

Refs və state arasındakı ən böyük və görünən fərqlərdən biri budur ki, Refs yeniləndikdə re-render baş vermir. Əgər hər iki formaya `console.log` qoysaq, görərik ki, state istifadə edən Form hər bir klaviatura basması ilə re-render olur, amma Ref istifadə edən Form sakit qalır.

```tsx
useEffect(() => {
 console.log('Form component re-renders');
});
```

Üzərində baxanda bu, gözəl xəbər kimi görünür. Bu kitabın yarısı re-render-lər və onlardan necə qaçmaq haqqında deyilsə? Əgər Refs re-render törətmirsə, bəs onlar bütün performans problemlərimizin həlli deyilmi?

Əsla. Əgər birinci fəsildən xatırlayırsınızsa, re-render React həyat dövrünün vacib hissəsidir. Bu yolla React komponentlərimizi yeni məlumatlarla yeniləyir. Məsələn, əgər mən input sahəsinin altında yazılan hərflərin sayını göstərmək istəyirəmsə, bunu Ref-lərlə edə bilmərəm.

```tsx
const Form = () => {
 const ref = useRef();
 const numberOfLetters = ref.current?.length ?? 0;
 return (
 <>
 <input type="text" onChange={onChange} />
 {/* Not going to work */}
 Characters count: {numberOfLetters}
 <button onClick={submit}>submit</button>
 </>
 );
};
```

Ref-lərin yenilənməsi re-render törətmir, ona görə də `numberOfLetters` üçün return çıxışı həmişə 0 göstərəcək.

Hətta 0-dan daha maraqlıdır ki, əgər həmin input-la heç bir əlaqəsi olmayan bir hadisə Form komponentinin re-render-lənməsinə səbəb olarsa, dəyər birdən sonuncu vəziyyətə yenilənəcək. Ref bu dəyəri re-render-lər arasında saxlayır, xatırlayırsınız?

Məsələn, əgər formaya sadə bir modal dialoq əlavə etsəm, dialoqun açılması komponenti yeniləməyə və `numberOfLetters`-in dəyişməsinə səbəb olacaq.

```tsx
const Form = () => {
 // state for the dialog
 const [isOpen, setIsOpen] = useState(false);
 const ref = useRef();
 const numberOfLetters = ref.current?.length ?? 0;
 return (
 <>
 <input type="text" onChange={onChange} />
 {/* This will not change when you type in the field */}
 {/* Only when you open/close the dialog */}
 Characters count: {numberOfLetters}
 <button onClick={submit}>submit</button>
 {/* Adding dialog here */}
 <button onClick={() => setIsOpen(true)}>
 Open dialog
 </button>
 {isOpen ? <ModalDialog onClose={() => setIsOpen(false)} /> :
null}
 </>
 );
};
```

Interactive example and full code
https://advanced-react.com/examples/09/02

Daha da maraqlısı budur ki, əgər həmin dəyəri primitiv tip kimi prop vasitəsilə downstream komponentlərinə ötürsək, dəyişiklik orada da əks olunmayacaq.

Tutaq ki, mən “axtarış nəticələri” komponenti yaratmaq istəyirəm. Bu komponent həmin mətn dəyərini prop olaraq qəbul edəcək və istifadəçi “nəticələri göstər” düyməsini basdıqda asinxron axtarış nəticələrini göstərəcək:

```tsx
const SearchResults = ({ search }) => {
 const [showResults, setShowResults] = useState(false);
 return (
 <>
 Searching for: {search} <br />
 {/*This will trigger re-render*/}
 <button onClick={() => setShowResults(!showResults)}>
 show results
 </button>
 </>
 );
};
```

Əgər həmin komponenti Ref-də saxladığımız dəyəri olan Form-da istifadə etsəm, sadəcə işləməyəcək.

```tsx
const Form = () => {
 const ref = useRef();
 const onChange = (e) => {
 ref.current = e.target.value;
 };
 return (
 <>
 <input type="text" onChange={onChange} />
 {/* will never be updated */}
 <SearchResults search={ref.current} />
 </>
 );
};
```

Ref-in yenilənməsi heç vaxt re-render tetikləmir, ona görə də `SearchResults` komponentindəki `search` prop-u heç vaxt açıq şəkildə yenilənmir. Hətta “nəticələri göstər” düyməsini klikləməklə `SearchResults` daxilində re-render tetikləsək belə, `search` dəyəri boş string olaraq qalır.

Interactive example and full code
https://advanced-react.com/examples/09/03

## Ref-in yenilənməsi sinxron və dəyişdirilə biləndir (mutable).

İkinci böyük fərq isə Ref-in yenilənməsinin sinxron olmasıdır. Axı biz sadəcə bir obyekti dəyişdiririk və bu, JavaScript-də sinxron əməliyyatdır.

State isə adətən asinxrondur. Hətta sadəcə asinxron deyil: state yeniləmələri “snapshot”larda icra olunur. React bunu idarə edən mürəkkəb bir sistemə malikdir və məlumatın və komponentlərin bir “snapshot” daxilində ardıcıl və düzgün yeniləndiyinə əmin olur.

Ref-də isə belə bir şey yoxdur: biz obyekt üzərində birbaşa dəyişiklik edirik və iş bitdi.

Bu fərq çox açıq görünür, əgər həm state, həm də Ref dəyərlərinə `onChange` callback-də daxil olmağa çalışsaq.

```tsx
const Form = () => {
 const [value, setValue] = useState();
 const onChange = (e) => {
 console.log('before', value);
 setValue(e.target.value);
 console.log('after', value); // same as before
 };
};
```

Yuxarıdakı kodda həm “before”, həm də “after” dəyərlər eyni olacaq. `setValue` çağırdığımız zaman state dərhal yenilənmir. Biz sadəcə React-ə bildiririk ki, o, hal-hazırda gördüyü işi bitirdikdən sonra yeni məlumatla state yeniləməsini planlaşdırmalıdır.

Ref-də isə vəziyyət tam tərsdir:

```tsx
const Form = () => {
 const ref = useRef();
 const onChange = (e) => {
 console.log('before', ref.current);
 ref.current = e.target.value;
 console.log('after', ref.current); // already changed
 };
};
```

Biz bir obyekti dəyişdirdik, həmin obyektin içindəki məlumat dərhal əlçatan olur, amma React həyat dövründən heç bir proses tetikləmir.

## Bəs Ref-i nə zaman istifadə edə bilərik?

Beləliklə, bu fərqləri nəzərə alaraq, Ref-i nələri saxlamaq üçün istifadə etmək məqbuldur, nələri isə state ilə idarə etmək daha yaxşıdır? Özünüzə bu sualları verin:

- Bu dəyər komponentlərin render olunmasında istifadə olunurmu, indi və ya gələcəkdə?
- Bu dəyər hər hansı şəkildə digər komponentlərə prop kimi ötürülürmü, indi və ya gələcəkdə?

Əgər hər iki suala cavab “xeyr”dirsə, Ref istifadə etmək olar.

Məsələn, Ref-i komponentlər haqqında bəzi “developer” məlumatlarını saxlamaq üçün istifadə edə bilərik. Məsələn, komponentin neçə dəfə render olunduğunu saymaqla maraqlana bilərik:

```tsx
useEffect(() => {
 ref.current = ref.current + 1;
 console.log('Render number', ref.current);
});
```

Və ya bəlkə əvvəlki state dəyərinə çıxışımızın olmasını istəyirik:

```tsx
const usePrevious = (value) => {
 const ref = useRef();
 useEffect(() => {
 // this will be changed after the value is returned
 ref.current = value;
 }, [value]);
 return ref.current;
};
```

Və sonra `useEffect`-də şərtli olaraq bir şey tetikləyə bilərik:

```tsx
useEffect(() => {
 if (previuosValue.length > value.length) {
 console.log('Text was deleted');
 } else {
 console.log('Text was added');
 }
}, [previuosValue, value]);
```

```tsx
Interactive example and full code
https://advanced-react.com/examples/09/04
```

Və əlbəttə, DOM elementlərini Ref-ə təyin etmək. Bu, Ref-in ən vacib və ən populyar istifadə hallarından biridir.

## DOM elementlərini Ref-ə təyin etmək

Bunu elə sadə edə bilərik ki, əvvəl `useRef` hook ilə Ref yaradırıq və sonra həmin Ref-i DOM elementinə `ref` atributu vasitəsilə ötürürük:

```tsx
const Component = () => {
 const ref = useRef(null);
 // assing ref to an input element
 return <input ref={ref} />;
};
```

Bu input komponenti render olunduqdan sonra mən əsl input DOM elementini görə biləcəyəm, yəni `getElementById`-dən əldə edəcəyim elementin eynisi, **ref.current** dəyərində olacaq:

```tsx
const Component = () => {
 const ref = useRef(null);
 useEffect(() => {
 // this will be a reference to input DOM element!
 // exactly the same as if I did getElementById for it
 console.log(ref.current);
 });
 return <input ref={ref} />;
};
```

Burada yadda saxlamağımız vacib olan məqam odur ki, Ref yalnız element React tərəfindən render olunduqdan və ona aid DOM elementi yaradıldıqdan sonra təyin olunacaq. Biz Ref-ə təyin etmək üçün nəyəsə ehtiyacımız var, düzdür? Bu o deməkdir ki, **ref.current** dəyəri dərhal əlçatan olmayacaq və belə bir məntiq işləməyəcək:

```tsx
const Component = () => {
const ref = useRef(null);
 // trying to access ref value before it was actually assigned
 // input will never be rendered here
 if (!ref.current) return null;
 return <input ref={ref} />;
};
```

Biz **ref.current**-i yalnız `useEffect` hook-də və ya callback-lərdə oxumalı və yazmalıyıq.

Nəhayət, əvvəlki fikrimizə, yəni maraqlı qeydiyyat formasına qayıdaq. Əgər bunu böyük bir komponent kimi implementasiya etsəydim, belə edə bilərdim:

```tsx
const Form = () => {
 const [name, setName] = useState('');
 const inputRef = useRef(null);
 const onSubmitClick = () => {
 if (!name) {
 // focus the input field if someone tries to submit the
//empty name
 inputRef.current.focus();
 } else {
 // submit the data here!
 }
 };
 return (
 <>
 ...
 <input
 onChange={(e) => setName(e.target.value)}
 ref={inputRef}
 />
 <button onClick={onSubmitClick}>
 Submit the form
 </button>
 </>
 );
};
```

Input-lardan gələn dəyərləri state-də saxlayır, bütün inputlar üçün Ref-lər yaradırdım və “submit” düyməsi kliklənəndə dəyərlərin boş olub-olmadığını yoxlayardım. Əgər boşdursa, lazım olan input-a fokuslanardım.

Interactive example and full code
https://advanced-react.com/examples/09/05

## Parent-dən child-a Ref-i prop kimi ötürmək

Əsl həyatda isə əlbəttə ki, bütününü bir böyük komponentdə yığmazdım. Daha çox ehtimal ki, həmin input-u öz ayrıca komponentinə çıxarmaq istərdim: beləliklə, onu bir neçə formada təkrar istifadə etmək olar, üslublarını kapsullaya və idarə edə bilər, bəlkə əlavə xüsusiyyətlər əlavə etmək olar, məsələn, üstündə label və ya sağ tərəfdə ikon.

```tsx
const InputField = ({ onChange, label }) => {
 return (
 <>
 {label}
 <br />
 <input
 type="text"
 onChange={(e) => onChange(e.target.value)}
 />
 </>
 );
};
```

Amma error handling və submit funksionallığı hələ də Form komponentində qalacaq, input-da yox!

```tsx
const Form = () => {
 const [name, setName] = useState('');
 const onSubmitClick = () => {
 if (!name) {
 // deal with empty name
 } else {
 // submit the data here!
 }
 };
 return (
 <>
 <InputField label="name" onChange={setName} />
 <button onClick={onSubmitClick}>
 Submit the form!
 </button>
 </>
 );
};
```

Form komponentindən input-a “özünü fokuslasın” demək üçün nə edə bilərəm? React-də məlumatı və davranışı idarə etməyin “normal” yolu komponentlərə prop-lar ötürmək və callback-lərə qulaq asmaqdır. Mən `focusItself` prop-unı `InputField`-ə ötürə bilərdim və onu false-dan true-ya dəyişdirərdim, amma bu yalnız bir dəfə işləyərdi.

```tsx
// don't do this! just to demonstate how it could work in theory
const InputField = ({ onChange, focusItself }) => {
 const inputRef = useRef(null);
 useEffect(() => {
 if (focusItself) {
 // focus input if the focusItself prop changes
 // will work only once, when false changes to true
 inputRef.current.focus();
 }
 }, [focusItself]);
 // the rest is the same here
};
```

Mən `onBlur` callback əlavə edib input fokusunu itirdikdə `focusItself` prop-unı false-a sıfırlamağı sınaya bilərdim, ya da boolean əvəzinə random dəyərlərlə oynaya bilərdim, yaxud başqa yaradıcı bir həll tapa bilərdim.

Xoşbəxtlikdən, başqa bir yol var. Prop-larla oynamaqdansa, bir komponentdə (Form) Ref yaradıb onu digər komponentə (InputField) ötürə və orada underlying DOM elementinə qoşa bilərik. Axı Ref sadəcə dəyişdirilə bilən bir obyekt-dir.

Form normal şəkildə Ref-i belə yaradardı:

```tsx
const Form = () => {
 // create the Ref in Form component
 const inputRef = useRef(null);
 ...
}
```

Və `InputField` komponenti Ref-i qəbul edən bir prop-a sahib olacaq və həmçinin Ref gözləyən bir input sahəsi render edəcək. Orada Ref `InputField`-də yaradılmayacaq, əksinə prop vasitəsilə gələcək:

```tsx
const InputField = ({ inputRef }) => {
 // the rest of the code is the same
 // pass ref from prop to the internal input component
  return <input ref={inputRef} ... />
}
```

Ref dəyişdirilə bilən (mutable) bir obyekt-dir və belə dizayn edilib. Biz onu bir elementə ötürdükdə, React əslində sadəcə onu dəyişdirir. Və dəyişdiriləcək obyekt Form komponentində elan olunub. Beləliklə, `InputField` render olunduğu anda Ref obyekti dəyişəcək və Form komponenti input DOM elementinə **inputRef.current** vasitəsilə çıxış əldə edəcək:

```tsx
const Form = () => {
 // create the Ref in Form component
 const inputRef = useRef(null);
 useEffect(() => {
 // the "input" element, that is rendered inside InputField,
//will be here
 console.log(inputRef.current);
 }, []);
 return (
 <>
 {/* Pass Ref as prop to the input field component */}
 <InputField inputRef={inputRef} />
 </>
 );
};
```

Və ya submit callback-də `inputRef.current.focus()` çağıra bilərik, əvvəlki kimi eyni kodla.

Interactive example and full code
https://advanced-react.com/examples/09/06

## Parent-dən child-a Ref ötürmək

Əgər niyə prop-u `inputRef` adlandırdığımı merak edirsinizsə, sadəcə `ref` adlandırmaq o qədər də sadə deyil. `ref` əsl prop deyil; bir növ “reserved” ad sayılır.

Keçmişdə, hələ class komponentləri yazanda, əgər bir Ref-i class komponentə ötürsək, həmin komponentin instance-i Ref-in `.current` dəyəri olardı.

Amma functional komponentlərin class instance-ları yoxdur. Buna görə də konsolda belə bir xəbərdarlıq alırıq:

*"Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?"*

```tsx
const Form = () => {
 const inputRef = useRef(null);
 // if we just do this, we'll get a warning in console
 return <InputField ref={inputRef} />;
};
```

Bunun işləməsi üçün React-ə bildirməliyik ki, bu Ref əslində məqsədli olaraq istifadə olunur və biz onunla bir şeylər etmək istəyirik. Bunu `forwardRef` funksiyasının köməyi ilə edə bilərik: bu funksiya bizim komponenti qəbul edir və `ref` atributundan gələn Ref-i komponent funksiyasının ikinci arqumenti kimi ötürür, props-dan dərhal sonra.

```tsx
// normally, we'd have only props there
// but we wrapped the component's function with forwardRef
// which injects the second argument - ref
// if it's passed to this component by its consumer
const InputField = forwardRef((props, ref) => {
 // the rest of the code is the same
 return <input ref={ref} />;
 });
```

Üstündəki kodu oxunaqlılığı artırmaq üçün hətta iki ayrı dəyişənə bölmək də olar:

```tsx
const InputFieldWithRef = (props, ref) => {
 // the rest is the same
};
// this one will be used by the form
export const InputField = forwardRef(InputFieldWithRef);
```

Və indi Form, Ref-i InputField komponentinə elə ötürə bilər ki, sanki adi DOM elementi kimi davranır:

```tsx
return <InputField ref={inputRef} />;
```

`forwardRef` istifadə etməliyik, yoxsa Ref-i sadəcə prop kimi ötürməliyik, bu, şəxsi zövq məsələsidir: nəticə eyni olacaq.

Interactive example and full code
https://advanced-react.com/examples/09/07

Imperative API ilə

`useImperativeHandle`

Yaxşı, Form komponentindən input-a fokuslanma məsələsi nisbətən həll olundu.

Amma bizim “cool” formamız hələ bitməyib. Xatırlayırsınız, error baş verəndə input-a fokuslanmaqla yanaşı onu “silkələmək” də istəyirdik? Native JavaScript API-də `element.shake()` kimi bir şey yoxdur, ona görə DOM elementinə çıxış burada kömək etməyəcək.

Amma bunu çox asanlıqla CSS animasiyası ilə implementasiya etmək olar:

```tsx
const InputField = () => {
 // store whether we should shake or not in state
 const [shouldShake, setShouldShake] = useState(false);
 // just add the classname when it's time to shake it - css will
//it
 const className = shouldShake ? 'shake-animation' : '';
 // when animation is done - transition state back to false, so
//we can start again if needed
 return (
 <input
 className={className}
 onAnimationEnd={() => setShouldShake(false)}
 />
 );
};
```

Amma bunu necə tetikləyək? Yenə əvvəlki fokus məsələsi kimi: prop-lardan istifadə edərək yaradıcı bir həll tapa bilərdim, amma bu, Form-u qəribə göstərər və əhəmiyyətli dərəcədə mürəkkəbləşdirərdi. Xüsusilə fokusu Ref vasitəsilə idarə etdiyimizi nəzərə alsaq, eyni problemin iki həlli yaranır. Kaş burada bir şey edə bilsəydik: `InputField.shake()` və `InputField.focus()`!

Fokus məsələsinə gəlincə, niyə Form komponenti hələ də bunu tetik etmək üçün native DOM API ilə məşğul olmalıdır? Bu, InputField-in məsuliyyəti deyilmi və əsl məqsədi bu cür mürəkkəbliyi gizlətmək deyilmi? Form-un underlying DOM elementinə çıxışı niyə var – əslində bu, daxili implementasiya detalları sızdırmaq kimidir. Form komponenti istifadə etdiyimiz DOM elementi və ya ümumiyyətlə DOM elementi istifadə edib-etməməyimizlə maraqlanmamalıdır. Məsuliyyətlərin ayrılması prinsipi, bilirsiniz.

Görünür ki, InputField komponentimiz üçün düzgün bir imperative API implementasiya etməyin zamanı gəlib çatıb. React deklarativdir və kodumuzu ona uyğun yazmağımızı gözləyir. Amma bəzən bir şeyi imperativ şəkildə tetikləmək lazım olur. Xoşbəxtlikdən, React bunun üçün bizə bir çıxış yolu təqdim edir: `useImperativeHandle` hook-u.

Bu hook bir qədər başa düşülməsi çətin ola bilər. Mən sənədləri iki dəfə oxumaq, bir neçə dəfə sınamaq və hətta React-in faktiki implementasiyasını gözdən keçirmək məcburiyyətində qaldım ki, nə etdiyini tam anlayım. Amma əsasən bizə iki şey lazımdır: imperative API-nin necə görünəcəyinə qərar vermək və onu qoşmaq üçün bir Ref. Bizim input üçün isə sadədir: API kimi `.focus()` və `.shake()` funksiyalarına ehtiyacımız var və Ref-lər haqqında artıq hər şeyi bilirik.

```tsx
// this is how our API could look like
const InputFieldAPI = {
 focus: () => {
 // do the focus here magic
 },
 shake: () => {
 // trigger shake here
 },
};
```

`useImperativeHandle` hook-u sadəcə bu obyekti Ref obyektinin **current** xüsusiyyətinə qoşur, başqa heç nə. Belə edir:

```tsx
const InputField = () => {
 useImperativeHandle(
 someRef,
 () => ({
 focus: () => {},
 shake: () => {},
 }),
 [],
 );
};
```

Birinci arqument bizim Ref-dir, hansı ki, ya komponentin özündə yaradılıb, ya prop-lardan ötürülüb, ya da `forwardRef` vasitəsilə gəlir. İkinci arqument isə obyekt qaytaran bir funksiya-dır — məhz bu obyekt **inputRef.current** olaraq əlçatan olacaq. Üçüncü arqument isə asılılıqlar array-idir, digər React hook-ları kimi.

Bizim komponent üçün Ref-i açıq şəkildə `apiRef` prop-u kimi ötürək.

Və yeganə qalan iş faktiki API-ni implementasiya etməkdir. Bunun üçün InputField daxilində başqa bir Ref-ə ehtiyacımız olacaq, belə ki, onu input DOM elementinə qoşub fokus tetikləyişi həyata keçirə bilək:

```tsx
// pass the Ref that we'll use as our imperative API as a prop
const InputField = ({ apiRef }) => {
 // create another Ref - internal to Input component
 const inputRef = useRef(null);
 // "merge" our API into the apiRef
 // the returned object will be available for use as
//apiRef.current
 useImperativeHandle(
 apiRef,
 () => ({
 focus: () => {
 // just trigger focus on internal Ref that is attached to
//the DOM object
 inputRef.current.focus();
 },
 shake: () => {},
 }),
 [],
 );
 return <input ref={inputRef} />;
};
```

Və “shake” üçün sadəcə state yenilənməsini tetikləyəcəyik:

```tsx
// pass the Ref that we'll use as our imperative API as a prop
const InputField = ({ apiRef }) => {
 // remember our state for shaking?
 const [shouldShake, setShouldShake] = useState(false);
 useImperativeHandle(apiRef, () => ({
 focus: () => {},
 shake: () => {
 // trigger state update here
 setShouldShake(true);
 },
 }), [])
 return ...
}
```

Voila! Form sadəcə bir Ref yarada, onu InputField-ə ötürə və inputRef.current.focus() və inputRef.current.shake() kimi sadə əməliyyatları həyata keçirə bilər, daxili implementasiyası ilə maraqlanmadan!

```tsx
const Form = () => {
 const inputRef = useRef(null);
 const [name, setName] = useState('');
 const onSubmitClick = () => {
 if (!name) {
 // focus the input if the name is empty
 inputRef.current.focus();
 // and shake it off!
 inputRef.current.shake();
 } else {
 // submit the data here!
 }
 };
 return (<>
 <InputField
 label="name"
 onChange={setName}
 apiRef={inputRef}
 />
 <button onClick={onSubmitClick}>
 Submit the form!
 </button>
 </>
 );
};
```

## Imperative API `useImperativeHandle` istifadə etmədən

Əgər `useImperativeHandle` hook-u hələ də sizə mürəkkəb görünürsə — narahat olmayın, mənim də başım qarışır! Amma əslində, yalnız bu funksionallığı implementasiya etmək üçün onu istifadə etmək məcburiyyətində deyilik. Biz artıq bilirik ki, Ref sadəcə dəyişdirilə bilən bir obyekt-dir və ora istənilən şeyi təyin edə bilərik. Beləliklə, sadəcə lazım olan Ref-in **ref.current**-inə API obyektimizi təyin etmək kifayətdir, məsələn:

```tsx
const InputField = ({ apiRef }) => {
 useEffect(() => {
 apiRef.current = {
 focus: () => {},
 shake: () => {},
 };
 }, [apiRef]);
 };
```

Bu, əslində `useImperativeHandle`-in altında baş verənlərin demək olar ki, eyni versiyasıdır. Və əvvəlki kimi işləyəcək.

Interactive example and full code
https://advanced-react.com/examples/09/09

Çox maraqlı bir hiylədir, düzdür? Sadəcə yadda saxlayın: bir şeyi imperativ şəkildə tetikləmək React-də daha çox “escape hatch” kimidir. 99% hallarda normal props/callback data axını tam yetərlidir.

Əsas nəticələr:

- Ref sadəcə dəyişdirilə bilən (mutable) obyekt-dir və istənilən dəyəri saxlaya bilər. Bu dəyər re-render-lər arasında qorunur.
- Ref-in yenilənməsi re-render tetikləmir və sinxrondur.
- Ref-i DOM elementinə `ref` atributu vasitəsilə təyin edə bilərik.
- Element render olunduqdan sonra həmin elementi **ref.current** vasitəsilə görə bilərik.
- Ref-ləri istənilən komponentə adi prop kimi ötürmək olar.
- Əgər onu əsl `ref` prop-u kimi ötürmək istəyiriksə, həmin komponenti `forwardRef` ilə əhatə etməliyik. Əks halda functional komponentlərdə işləməyəcək. Komponentin ikinci arqumenti ref-in özü olacaq və onu istədiyimiz DOM elementinə ötürməliyik.

```tsx
// second argument, next to props, is ref that is injected by
"forwardRef"
const InputField = forwardRef((props, ref) => {
 return <input ref={ref} />;
});
```

Biz komponentin implementasiya detalları gizlədə və onun public API-sini `useImperativeHandle` hook-u ilə təqdim edə bilərik.

Bunun üçün həmin komponentə Ref ötürməliyik, və bu Ref API xüsusiyyətləri ilə dəyişdiriləcək:

```tsx
const InputField = () => {
 useImperativeHandle(
 ousideRef,
 () => ({
 focus: () => {},
 shake: () => {},
 }),
 [],
 );
};
```

Və ya istədiyimiz zaman sadəcə `useEffect` hook-də həmin Ref-i əl ilə dəyişdirə bilərik:
const InputField = ({ apiRef }) => {
 useEffect(() => {
 ousideRef.current = {
 focus: () => {},
 shake: () => {},
 };
 }, [ousideRef]);
};

# Fəsil 10. React-də Bağlanmalar (Closures)

Əvvəlki fəsildə biz Reflər haqqında hər şeyi öyrəndik: onların nə olduğunu, niyə lazım olduğunu, nə vaxt istifadə edilməli və nə vaxt edilməməli olduğunu. Ancaq renderlər arasında nəyisə qorumağa gəlincə, xüsusilə də Reflərdə, müzakirə etməli olduğumuz əlavə bir mövzu var: funksiyalar. Daha dəqiq desək, bağlanmalar (closures) və onların mövcudluğunun kodumuza necə təsir göstərməsi.

Gəlin bir neçə çox maraqlı və olduqca tipik səhvlərə baxaq, onların necə yarandığını araşdıraq və bu prosesdə öyrənək:

- Bağlanmalar nədir, necə yaranır və niyə bizə lazımdır.
- Köhnəlmiş (stale) bağlanma nədir və niyə baş verir.
- React-də köhnəlmiş bağlanmalara səbəb olan ümumi ssenarilər hansılardır və onlarla necə mübarizə aparmaq olar.

⚠️ Xəbərdarlıq: əgər sən heç vaxt React-də bağlanmalarla işləməmisənsə, bu fəsil beynini partlada bilər. Oxuyarkən beyin hüceyrələrini stimullaşdırmaq üçün kifayət qədər şokoladın olduğundan əmin ol. 🍫

Problem

Təsəvvür et ki, bir neçə input sahəsi olan bir form hazırlayırsan. Bu sahələrdən biri xarici kitabxanadan gələn çox ağır bir komponentdir. Onun daxili işləməsinə girişin yoxdur, buna görə də performans problemlərini düzəldə bilmirsən. Amma onu formunda mütləq istifadə etməlisən, buna görə də qərara gəlirsən ki, onu `React.memo` ilə bükəsən ki, formanındakı state dəyişəndə onun təkrar render olunması minimuma endirilsin. Təxminən belə:

```tsx
const HeavyComponentMemo = React.memo(HeavyComponent);

const Form = () => {
 const [value, setValue] = useState();
 return (
 <>
 <input
 type="text"
 value={value}
 onChange={(e) => setValue(e.target.value)}
 />
 <HeavyComponentMemo />
 </>
 );
};
```

İndiyə qədər hər şey yaxşı gedir. Bu `Heavy` komponenti sadəcə bir `string` tipli prop qəbul edir, məsələn `title`, və bir də `onClick` callback. Bu callback həmin komponentin içindəki "done" düyməsinə klikləyəndə işə düşür. Sənin məqsədin isə bu klik baş verəndə formanı submit etməkdir. Bu da kifayət qədər asandır: sadəcə `title` və `onClick` proplarını ona ötürmək lazımdır.

```tsx
const HeavyComponentMemo = React.memo(HeavyComponent);
const Form = () => {
 const [value, setValue] = useState();
 const onClick = () => {
 // submit our form data here
 console.log(value);
 };
 return (
 <>
 <input
 type="text"
 value={value}
 onChange={(e) => setValue(e.target.value)}
 />
 <HeavyComponentMemo
 title="Welcome to the form"
 onClick={onClick}
 />
 </>
 );
};
```

Və indi sən bir dilemma ilə üz-üzə qalacaqsan. 5-ci fəsildən — **useMemo, useCallback və React.memo ilə Memoizasiya** bölməsindən bildiyimiz kimi, `React.memo` ilə bükülmüş bir komponentin hər bir prop-u ya primitiv dəyər olmalıdır, ya da rerender-lər arasında sabit qalmalıdır. Əks halda memoizasiya işləməyəcək. Buna görə də, texniki cəhətdən bizim `onClick` funksiyamızı `useCallback` ilə bükməyimiz lazımdır:

```tsx
const onClick = useCallback(() => {
 // submit data here
}, []);
```

Amma biz həmçinin bilirik ki, `useCallback` hook-u bütün asılılıqları **dependencies array**-də elan etməlidir. Buna görə də, əgər biz form məlumatlarını içəridə submit etmək istəyiriksə, o məlumatları da asılılıq kimi göstərməliyik:

```tsx
const onClick = useCallback(() => {
 // submit data here
 console.log(value);
 // adding value to the dependency
}, [value]);
```

Və budur dilemma: bizim `onClick` memoizə olunmasına baxmayaraq, hər dəfə input-da nəsə yazıldıqda yenidən dəyişir. Beləliklə, performans optimizasiyamız faydasız olur.

Yaxşı, problem deyil, başqa həll yollarına baxaq. `React.memo`-nun **comparison function** adlı bir xüsusiyyəti var. Bu funksiya bizə `React.memo`-da propların müqayisəsinə daha incə nəzarət etməyə imkan verir. Normalda React bütün “əvvəlki” propları bütün “sonrakı” proplarla özü müqayisə edir. Əgər biz bu funksiyanı versək, React nəticəsinə əsaslanacaq. Əgər funksiya `true` qaytararsa, React başa düşəcək ki, proplar eynidir və komponent yenidən render olunmamalıdır. Bu isə bizə lazım olan şeydir.

Bizim orada diqqət etdiyimiz yalnız bir prop var — `title`, buna görə də iş o qədər də çətin olmayacaq:

```tsx
const HeavyComponentMemo = React.memo(
 HeavyComponent,
 (before, after) => {
 return before.title === after.title;
 },
);
```

Bütün formanı kodla yazsaq, təxminən belə görünəcək:

```tsx
const HeavyComponentMemo = React.memo(
 HeavyComponent,
 (before, after) => {
 return before.title === after.title;
 },
);
const Form = () => {
 const [value, setValue] = useState();
 const onClick = () => {
 // submit our form data here
 console.log(value);
 };
 return (
 <>
 <input
 type="text"
 value={value}
 onChange={(e) => setValue(e.target.value)}
 />
 <HeavyComponentMemo
 title="Welcome to the form"
 onClick={onClick}
 />
 </>
 );
};

```

```tsx

```

Və işləyir! Input-a nəsə yazırıq, ağır komponent (`Heavy`) yenidən render olunmur və performans zərər görmür.

Sadəcə kiçik bir problem var: əslində **işləmir**. Əgər input-a nəsə yazıb sonra düyməni bassaq, `onClick` içində log etdiyimiz dəyər `undefined` olur.

Amma `undefined` ola bilməz — input normal işləyir və əgər `console.log`-u `onClick`-dən kənarda yazsam, düzgün dəyəri göstərir. Sadəcə `onClick` içində düzgün işləmir.

👉 Bu, artıq **closure problemi**nin klassik nümunəsidir. İstəyirsən indi izah edim ki, niyə belə olur?

```tsx
// those one logs it correctly
console.log(value);
const onClick = () => {
 // this is always undefined
 console.log(value);
};
```

Interactive example and full code
https://advanced-react.com/examples/10/01

Nə baş verir?

Bu, **“stale closure”** (köhnəlmiş closure) problemi kimi tanınır. Və bunu düzəltmək üçün əvvəlcə JavaScript-də bəlkə də ən çox qorxulan mövzuya bir az dərindən baxmaq lazımdır: **closure-lar və onların necə işlədiyi**.

## JavaScript, scope və closure-lar

Gəlin funksiyalar və dəyişənlərlə başlayaq. JavaScript-də bir funksiyanı elan etdikdə — istər adi funksiyadan istifadə etməklə, istərsə də arrow function ilə — nə baş verir?

```tsx
function something() {
 //
}
const something = () => {};
```

Bunu etdiyimiz zaman biz **local scope** (yerli əhatə dairəsi) yaratmış oluruq: yəni həmin kod sahəsində elan olunan dəyişənlər çöldən görünməyəcək.

```tsx
const something = () => {
 const value = 'text';
};
console.log(value); // not going to work, "value" is local to
//"something" function
```

Bəli, bu hər dəfə funksiya yaratdığımızda baş verir. Bir funksiyanın içində yaradılan başqa bir funksiya da öz **lokal scope**-una sahib olur və onun daxilində elan olunan dəyişənlər xaricdəki funksiyadan görünmür.

```tsx
const something = () => {
 const inside = () => {
 const value = 'text';
 };
 console.log(value); // not going to work, "value" is local to
//"inside" function
};
```

Tam olaraq! 🚀 JavaScript-də **scope chain** qaydası belə işləyir: daxildəki (inner) funksiya öz scope-unda elan olunmuş dəyişənləri görür, həmçinin bütün üst (outer) funksiyaların scope-unda elan olunmuş dəyişənlərə də çıxışı olur.

Buna görə də, ən iç funksiyadan başlayaraq global scope-a qədər dəyişənlərə “yuxarıya doğru” çıxış mümkündür. Amma əksinə – yuxarıdakı funksiyalar aşağıdakının lokal dəyişənlərini görə bilmirlər.

```tsx
const something = () => {
 const value = 'text';
 const inside = () => {
 // perfectly fine, value is available here
 console.log(value);
 };
};
```

Bu, **closure** adlanan mexanizm vasitəsilə əldə olunur. Daxildəki funksiya bütün xarici məlumatları “yığıb saxlayır” — yəni, funksiyanın daxilindəki bağlanma (closure) xaricdəki dəyişənlərin anlıq surətini yaddaşda ayrıca saxlayır.

Əgər həmin dəyəri `something` funksiyasının içində yaratmaq əvəzinə, onu arqument kimi ötürsəm və daxilindəki funksiyanı qaytarsam:

```tsx
const something = (value) => {
 const inside = () => {
 // perfectly fine, value is available here
 console.log(value);
 };
 return inside;
};
```

Biz bu davranışı əldə edəcəyik:

```tsx
const first = something('first');
const second = something('second');
first(); // logs "first"
second(); // logs "second"
```

Biz `something` funksiyasını `"first"` dəyəri ilə çağırırıq və nəticəni bir dəyişkənə təyin edirik. Nəticə daxilində elan olunmuş funksiyaya bir referansdır. Beləliklə, bir **closure** yaranır. Bundan sonra, həmin referansı saxlayan `first` dəyişkəni mövcud olduğu müddətcə, ona ötürdüyümüz `"first"` dəyəri “donmuş” qalır və daxil funksiyanın ona çıxışı olacaq.

Eyni vəziyyət ikinci çağırış üçün də keçərlidir: fərqli bir dəyər ötürürük, closure yaranır və qaytarılan funksiya əbədi olaraq həmin dəyişkənə çıxışa sahib olur.

Bu, `something` funksiyasının daxilində lokal elan olunmuş hər hansı dəyişən üçün doğrudur:

```tsx
const something = (value) => {
 const r = Math.random();
 const inside = () => {
 // ...
 };
 return inside;
};
const first = something('first');
const second = something('second');
first(); // logs random number
second(); // logs another random number
```

Bu, sanki dinamik bir səhnənin şəklini çəkmək kimidir: düyməni basdığınız anda bütün səhnə şəkil içində **əbədi “donur”**. Növbəti düymə basışı əvvəl çəkilmiş şəkli dəyişdirmir.

!image.png

React-də biz bağlanmaları (closures) daim yaradırıq, hətta fərqində olmadan. Hər bir callback funksiyası, hansı ki, komponentin içində elan olunur, bir closure-dur:

```tsx
const Component = () => {
 const onClick = () => {
 // closure!
 };
 return <button onClick={onClick} />;
};
```

`useEffect` və `useCallback` hook-larının içində olan hər şey bir closure-dur:

```tsx
const Component = () => {
 const onClick = useCallback(() => {
 // closure!
 });
 useEffect(() => {
 // closure!
 });
};
```

Bunların hamısı komponentin içində elan olunmuş state-ə, props-a və lokal dəyişənlərə çıxışa sahib olacaq:

```tsx
const Component = () => {
 const [state, setState] = useState();
 const onClick = useCallback(() => {
 // perfectly fine
 console.log(state);
 });
 useEffect(() => {
 // perfectly fine
 console.log(state);
 });
};
```

Hər bir funksiya, hansı ki, komponentin içindədir, closure-dur, çünki komponent özü sadəcə bir funksiyadır.

# Köhnəlmiş closure problemi

Amma yuxarıdakıların hamısı, əgər closure-ları dəstəkləməyən bir dildən gəlirsinizsə, bir qədər qəribə görünə bilər, amma nisbətən sadədir. Bir neçə funksiyanı bir neçə dəfə yaradırsınız və bu təbii hala gəlir. React-də illərlə tətbiq yazmaq üçün hətta "closure" anlayışını başa düşmək də zəruri deyil.

Bəs problem nədir? Niyə closure-lar JavaScript-də ən qorxulu mövzulardan biri hesab olunur və bir çox tərtibatçılar üçün baş ağrısı mənbəyidir?

Çünki closure-lar onu yaradan funksiyaya olan referans mövcud olduğu müddətcə yaşayır. Və funksiyaya olan referans sadəcə hər hansı bir dəyərə təyin oluna bilən bir dəyərdir. Gəlin bunu bir az dərin düşünək. Yuxarıdakı funksiyamız var, hansı ki, tamamilə günahsız bir closure qaytarır:

```tsx
const something = (value) => {
 const inside = () => {
 console.log(value);
 };
 return inside;
};
```

Amma daxilindəki funksiya hər `something` çağırışı ilə yenidən yaradılır. Bəs əgər mən buna qarşı çıxıb onu keşikləməyə (cache etməyə) qərar versəm, nə baş verəcək? Təxminən belə:

```tsx
const cache = {};
const something = (value) => {
 if (!cache.current) {
 cache.current = () => {
 console.log(value);
 };
 }
 return cache.current;
};
```

Yüzeydə kod görünüşcə zərərsizdir. Biz sadəcə `cache` adlı xarici bir dəyişən yaratdıq və daxil funksiyanı `cache.current`-ə təyin etdik. İndi, bu funksiya hər dəfə yenidən yaradılmaq əvəzinə, sadəcə artıq saxlanmış dəyəri qaytarır.

Amma əgər biz bunu bir neçə dəfə çağırmağa çalışsaq, qəribə bir şey baş verəcək:

```tsx
const first = something('first');
const second = something('second');
const third = something('third');
first(); // logs "first"
second(); // logs "first"
third(); // logs "first"
```

Fərqli arqumentlərlə `something` funksiyasını nə qədər çağırsaq da, loglanan dəyər həmişə **ilk dəyər** olur!

Biz sadəcə **“stale closure”** adlanan şeyi yaratdıq. Hər bir closure yaradıldığı anda donur (frozen). İlk dəfə `something` funksiyasını çağıranda, `value` dəyişənində `"first"` olan bir closure yaratdıq. Sonra isə onu `something` funksiyasının xaricində yerləşən bir obyektə saxladıq.

Növbəti dəfə `something` funksiyasını çağırdığımızda isə, yeni bir closure yaratmaq əvəzinə, əvvəldən yaratdığımız closure-u qaytarırıq. Yəni `"first"` dəyişəni ilə əbədi donmuş olan closure-u.

!image.png

Bu davranışı düzəltmək üçün funksiyanı və onun closure-unı hər dəfə dəyər dəyişdikdə yenidən yaratmaq istəyirik. Təxminən belə:

```tsx
const cache = {};
let prevValue;
const something = (value) => {
 // check whether the value has changed
 if (!cache.current || value !== prevValue) {
 cache.current = () => {
 console.log(value);
 };
 }
 // refresh it
 prevValue = value;
 return cache.current;
};
```

Dəyəri bir dəyişəndə saxla ki, növbəti dəyəri əvvəlki ilə müqayisə edə bilək. Və sonra dəyişən dəyişibsə, cache.current bağlamasını yenilə.
İndi dəyişənlər düzgün şəkildə log ediləcək və əgər eyni dəyərə malik funksiyaları müqayisə etsək, bu müqayisə true qaytaracaq.

```tsx
const first = something('first');
const anotherFirst = something('first');
const second = something('second');
first(); // logs "first"
second(); // logs "second"
console.log(first === anotherFirst); // will be true
```

Interactive example and full code
https://advanced-react.com/examples/10/02

Köhnəlmiş bağlamalar (stale closures) React-də: useCallback
Əgər useMemo, useCallback və React.memo ilə Memoizasiya bölməsini xatırlayırsınızsa, yuxarıdakı kod sizə tanış görünməlidir. Və həqiqətən də, biz məhz useCallback hook-un bizim üçün etdiyi şeyi həyata keçirdik.
Hər dəfə useCallback istifadə etdikdə, bir bağlama yaradırıq və ona ötürdüyümüz funksiya keşlənir:

```tsx
// that inline function is cached exactly as in the section before
const onClick = useCallback(() => {}, []);
```

Əgər bu funksiyanın içində state və ya props-a çıxışa ehtiyacımız varsa, onları dependencies massivinə əlavə etməliyik:

```tsx
const Component = () => {
const [state, setState] = useState();
 const onClick = useCallback(() => {
 // access to state inside
 console.log(state);
 // need to add this to the dependencies array
 }, [state]);
};
```

Bu dependencies massivi React-in keşlənmiş bağlamanı yeniləməsini təmin edir, tam olaraq value !== prevValue müqayisəsi etdiyimiz kimi. Əgər mən bu massivi unutsam, bağlamamız köhnəlmiş olur:

```tsx
const Component = () => {
 const [state, setState] = useState();
 const onClick = useCallback(() => {
 // state will always be the initial state value here
 // the closure is never refreshed
 console.log(state);
 // forgot about dependencies
 }, []);
};
```

**Və hər dəfə həmin callback-i işə salanda, loglanacaq tək şey undefined olacaq.**

Interactive example and full code
https://advanced-react.com/examples/10/03

Köhnəlmiş bağlamalar React-də: Refs
useCallback və useMemo hook-larından sonra, köhnəlmiş bağlama problemini yaratmağın ikinci ən yaygın yolu Refs-dir.
Əgər həmin onClick callback üçün useCallback hook əvəzinə Ref istifadə etməyə çalışsam, nə baş verəcək? Bəzən internetdəki məqalələr komponentlərdə props-u memoizasiya etmək üçün bunu tövsiyə edir. Görünüşdə bu sadə görünür: sadəcə funksiyanı useRef-ə ötür və ona ref.current vasitəsilə çıxış et. Heç bir dependencies, heç bir problem yoxdur.

```tsx
const Component = () => {
 const ref = useRef(() => {
 // click handler
 });
 // ref.current stores the function and is stable between rerenders
 return <HeavyComponent onClick={ref.current} />;
};
```

Lakin, komponentimizin içindəki hər funksiya bir bağlama yaradacaq, o cümlədən useRef-ə ötürdüyümüz funksiya da. Ref yalnız yaradıldıqda bir dəfə inicializasiya olunacaq və özü tərəfindən yenilənməyəcək. Əsasən bu, əvvəlcə yaratdığımız məntiqdir. Yalnız value əvəzinə, qorumaq istədiyimiz funksiyanı ötürürük. Belə bir şey:

```tsx
const useRef = (callback) => {
 if (!ref.current) {
 ref.current = callback;
 }
 return ref.current;
};
```

Beləliklə, bu halda, komponent yeni yaradıldığı zaman formalaşan bağlama qorunacaq və heç vaxt yenilənməyəcək. Ref-də saxlanılan funksiyanın içində state və ya props-a çıxış etməyə çalışdıqda, yalnız onların ilkin dəyərlərini əldə edəcəyik:

```tsx
const Component = ({ someProp }) => {
 const [state, setState] = useState();
 const ref = useRef(() => {
 // both of them will be stale and will never change
 console.log(someProp);
 console.log(state);
 });
}
```

Bunu düzəltmək üçün, Ref dəyərini içində çıxış etməyə çalışdığımız hər şey dəyişdikdə yenilədiyimizə əmin olmalıyıq. Əsasən, useCallback hook üçün dependencies massivinin etdiyi funksionallığı həyata keçirməliyik.

```tsx
const Component = ({ someProp }) => {
 // initialize ref - creates closure!
 const ref = useRef(() => {
 // both of them will be stale and will never change
 console.log(someProp);
 console.log(state);
 });
 useEffect(() => {
 // update the closure when state or props change
 ref.current = () => {
 console.log(someProp);
 console.log(state);
 };
 }, [state, someProp]);
};
```

Interactive example and full code
https://advanced-react.com/examples/10/04

Köhnəlmiş bağlamalar React-də:
React.memo
Və nəhayət, biz fəsilin əvvəlinə və bütün bunları başlatan sirrə qayıtdıq. Gəlin problemli koda bir daha baxaq:

```tsx
const HeavyComponentMemo = React.memo(
 HeavyComponent,
 (before, after) => {
 return before.title === after.title;
 },
);
const Form = () => {
 const [value, setValue] = useState();
 const onClick = () => {
 // submit our form data here
 console.log(value);
 };
 return (
 <>
 <input
 type="text"
 value={value}
 onChange={(e) => setValue(e.target.value)}
 />
 <HeavyComponentMemo
 title="Welcome to the form"
 onClick={onClick}
 />
 </>
 );
};
```

Hər dəfə düyməyə kliklədikdə, "undefined" loglanır. onClick içindəki dəyərimiz heç vaxt yenilənmir. İndi niyə olduğunu deyə bilərsən?
Əlbəttə, bu yenidən köhnəlmiş bağlamadır. onClick yaratdığımız zaman, bağlama əvvəlcə default state dəyəri ilə, yəni "undefined" ilə formalaşır. Biz həmin bağlamanı title prop ilə birlikdə memoizə edilmiş komponentə ötürürük. Müqayisə funksiyasının içində yalnız title müqayisə olunur. O heç vaxt dəyişmir, sadəcə bir stringdir. Müqayisə funksiyası həmişə true qaytarır, HeavyComponent heç vaxt yenilənmir və nəticədə, çox əvvəlki onClick bağlamasının referansını saxlayır, "undefined" dəyəri isə donmuş qalır.
İndi problemin nə olduğunu bildik, bunu necə düzəldək? Burada demək asandır, etmək çətindir…
İdealda, müqayisə funksiyasında hər prop-u müqayisə etməliyik, ona görə onClick-i də oraya daxil etməliyik:

```tsx
(before, after) => {
 return (
 before.title === after.title &&
 before.onClick === after.onClick
 );
};

```

Lakin, bu halda, bu, sadəcə React-in default davranışını yenidən tətbiq etmək və React.memo müqayisə funksiyası olmadan etdiyi şeyi etmək deməkdir. Ona görə də, bunu atıb yalnız React.memo(HeavyComponent) olaraq saxlaya bilərik.
Amma bunu etmək onClick-i useCallback içində bükməyimizi tələb edir. Lakin o state-ə bağlıdır, yəni hər düymə basdığında dəyişəcək. Yenidən başlanğıca qayıtdıq: ağır komponentimiz hər state dəyişdikdə yenidən render olunacaq, məhz qaçmağa çalışdığımız şey.
Kompozisiya ilə oynayıb ya state-i, ya da HeavyComponent-i çıxarıb izolə etməyə çalışa bilərik. İlk bir neçə fəsildə öyrəndiyimiz texnikalar. Amma bu asan olmayacaq: input və HeavyComponent hər ikisi həmin state-ə bağlıdır.
Başqa çox şeyləri sınaya bilərik. Amma o bağlama tələsindən qaçmaq üçün ağır refaktorinq etmək lazım deyil. Burada bizə kömək edə biləcək bir maraqlı üsul var.

Bağlama tələsindən Refs ilə qaçmaq
Bu üsul tamamilə heyrətamizdir: çox sadədir, amma React-də funksiyaları memoizasiya etmə üsulumuzu əbədi dəyişdirə bilər. Yaxud bəlkə də yox… Hər halda, növbəti fəsil üçün vacib olacaq, ona görə də dərinə gedək.
İndilikdə React.memo və onClick implementasiyasında müqayisə funksiyasını aradan qaldıraq. Sadəcə state və memoizə edilmiş HeavyComponent olan saf bir komponent:

```tsx
const HeavyComponentMemo = React.memo(HeavyComponent);
const Form = () => {
 const [value, setValue] = useState();
 return (
 <>
 <input type="text" value={value} onChange={(e) =>
setValue(e.target.value)} />
 <HeavyComponentMemo title="Welcome to the form" onClick=
{...} />
 </>
 );
 }
```

İndi hər render arasında stabil olan, amma eyni zamanda özünü yenidən yaratmadan ən son state-ə çıxışı olan bir onClick funksiyası əlavə etməliyik.
Bunu Ref-də saxlayacağıq, ona görə əlavə edək. İndilikdə boş:

```tsx
const Form = () => {
 const [value, setValue] = useState();
 // adding an empty ref
 const ref = useRef();
};
```

Funksiyanın ən son state-ə çıxışı olması üçün, hər render zamanı yenidən yaradılması lazımdır. Bundan qaçmaq mümkün deyil, bu bağlamaların təbiətidir, React ilə əlaqəsi yoxdur. Ref-ləri birbaşa renderdə deyil, useEffect içində dəyişdirməliyik, ona görə də bunu edək.

```tsx
const Form = () => {
 const [value, setValue] = useState();
 // adding an empty ref
 const ref = useRef();
 useEffect(() => {
 // our callback that we want to trigger
 // with state
 ref.current = () => {
 console.log(value);
 };
 // no dependencies array!
 });
};
```

Dependency massivi olmayan useEffect hər render-də işə düşəcək. Bu da məhz istədiyimiz şeydir. İndi ref.current içində hər render ilə yenidən yaradılan bir bağlama var, ona görə də orada loglanan state həmişə ən son olacaq.
Amma biz ref.current-i birbaşa memoizə edilmiş komponentə ötürə bilmərik. Bu dəyər hər render-də fərqlənəcək, ona görə memoizasiya işləməyəcək.

```tsx
const Form = () => {
 const ref = useRef();
 useEffect(() => {
 ref.current = () => {
 console.log(value);
 };
 });
 return (
 <>
 {/* Can't do that, will break memoization */}
 <HeavyComponentMemo onClick={ref.current} />
 </>
 );
};
```

Bunun əvəzinə, useCallback ilə heç bir dependency olmayan kiçik boş bir funksiya yaradaq.

```tsx
const Form = () => {
 const ref = useRef();
 useEffect(() => {
 ref.current = () => {
 console.log(value);
 };
 });
 const onClick = useCallback(() => {
 // empty dependency! will never change
 }, []);
 return (
 <>
 {/* Now memoization will work, onClick never changes */}
 <HeavyComponentMemo onClick={onClick} />
 </>
 );
};
```

İndi memoizasiya mükəmməl işləyir — onClick heç vaxt dəyişmir. Amma bir problem var: heç bir iş görmür.
Və işin sehrli tərəfi budur: onu işlətmək üçün yalnız memoizə edilmiş callback içində ref.current-i çağırmaq kifayətdir:

```tsx
useEffect(() => {
ref.current = () => {
console.log(value);
};
});
const onClick = useCallback(() => {
// call the ref here
ref.current();
// still empty dependencies array!
}, []);
```

Diqqət edin, ref useCallback-in dependencies massivində deyil? Buna ehtiyac yoxdur. ref özü heç vaxt dəyişmir. Sadəcə useRef hook-un qaytardığı dəyişkən obyektə bir referansdır.
Amma bir bağlama ətrafındakı hər şeyi dondurduqda, obyektləri dəyişməz və ya donmuş etmir. Obyektlər yaddaşın fərqli hissəsində saxlanılır və bir neçə dəyişən eyni obyektə referans saxlaya bilər.

```tsx
const a = { value: 'one' };
// b is a different variable that references the same object
const b = a;
```

Əgər obyektə referanslardan birisi vasitəsilə dəyişiklik etsəm və sonra onu başqa bir referansla əldə etsəm, dəyişikliklər orada olacaq:

```tsx
a.value = 'two';
console.log(b.value); // will be "two"
```

Bizim halda isə bu belə də baş vermir: useCallback və useEffect içində tam eyni referans var. Ona görə də useEffect içində ref obyektinin current xüsusiyyətini dəyişdirdikdə, həmin dəqiq xüsusiyyətə useCallback içində çıxış edə bilərik. Bu xüsusiyyət ən son state məlumatını ələ keçirən bir bağlamadır.
Tam kod belə görünəcək:

```tsx
const Form = () => {
 const [value, setValue] = useState();
 const ref = useRef();
 useEffect(() => {
 ref.current = () => {
 // will be latest
 console.log(value);
 };
 });
 const onClick = useCallback(() => {
 // will be latest
 ref.current?.();
 }, []);
 return (
 <>
 <input
 type="text"
 value={value}
 onChange={(e) => setValue(e.target.value)}
 />
 <HeavyComponentMemo
 title="Welcome closures"
 onClick={onClick}
 />
 </>
 );
};
```

İndi hər iki dünyanın ən yaxşısına sahibik: ağır komponent düzgün memoizə olunub və hər state dəyişkənliyi ilə yenidən render olunmur. Və onun onClick callback-i komponentdəki ən son məlumatlara çıxış əldə edir, memoizasiyanı pozmadan. İndi ehtiyacımız olan hər şeyi təhlükəsiz şəkildə backend-ə göndərə bilərik!

Interactive example and full code
https://advanced-react.com/examples/10/05

Əsas məqamlar

Ümid edirəm, bütün bunlar aydın oldu və artıq bağlamalar (closures) sizin üçün çox asan görünür. Növbəti fəsildə, bağlama tələsindən qaçmaq üçün başqa çox faydalı bir istifadə halına baxacağıq: callback-lərin debouncing və throttling-i. Amma ondan əvvəl, xatırlayaq:

- Hər dəfə bir funksiya başqa bir funksiyanın içində yaradıldıqda, bağlama formalaşır.
- React komponentləri sadəcə funksiyalar olduğu üçün, içində yaradılan hər funksiya bağlama yaradır, buna useCallback və useRef kimi hook-lar da daxildir.
- Bağlama yaradan funksiya çağırıldıqda, onun ətrafındakı bütün məlumatlar “donur”, sanki bir snapshot kimi.
- Həmin məlumatı yeniləmək üçün, “bağlanmış” funksiyanı yenidən yaratmaq lazımdır. Hook-ların dependencies massivləri (məsələn, useCallback) bizə bunu etməyə imkan verir.
- Əgər dependency-ni unutsaq və ya ref.current-ə təyin olunan “bağlanmış” funksiyanı yeniləməsək, bağlama “köhnəlmiş” (stale) olur.
- React-də “köhnəlmiş bağlama” tələsindən Ref-in dəyişkən obyekt olmasından istifadə edərək qaça bilərik. Biz ref.current-i köhnəlmiş bağlamanın xaricində dəyişdirə bilərik və sonra ona daxil ola bilərik. Bu isə ən son məlumat olacaq.
# Fəsil 11. Ref-lərlə inkişaf etmiş debouncing və throttling-in həyata keçirilməsi

Əvvəlki fəsillərdə Ref-in nə olduğunu, necə istifadə ediləcəyini və necə istifadə edilməməli olduğunu ətraflı öyrəndik. Lakin Reflərin hələ toxunmadığımız çox vacib və kifayət qədər geniş yayılmış bir istifadə halı var. Bu da setInterval və ya debounce kimi funksiyalarla işləyərkən müxtəlif taymerlərin və timeout id-lərin saxlanılmasıdır. Bu, müxtəlif form elementləri üçün çox geniş yayılmış bir ssenaridir. Məsələn, input-ların onChange callback-lərini debounce/throttle etmək istəyə bilərik ki, forma hər düymə basıldıqda yenidən render olunmasın.

React-də debounce/throttle-i düzgün şəkildə həyata keçirmək isə əslində kifayət qədər çətindir. Sadəcə lodash kitabxanasından debounce import edib onChange callback-in ətrafına bükmək və hər şeyin işləyəcəyini gözləmək olmaz. Ona görə də, bu fəsildə yaxşı bir useDebounce hook-u yaratmağa çalışaq və bu yolda bizi hansı çətinliklərin və geniş yayılmış tələlərin gözlədiyini görək.

Mən burada Lodash kitabxanasından debounce və throttle funksiyalarından istifadə edəcəyəm və diqqəti daha çox React-ə xas məsələlərə yönəldəcəyəm.

Bunu edərkən öyrənəcəyik:

- Debouncing və throttling nədir və onların arasındakı fərq nədir (çox qısa bir bilik yeniləməsi).
- Niyə debounce-u birbaşa event handler-lərimizdə istifadə edə bilmirik.
- Bunun üçün useMemo və ya useCallback-dan necə istifadə etmək olar və onların mənfi cəhətləri nədir.
- Debouncing üçün Ref-lərdən necə istifadə etmək olar və Ref-lərlə useMemo və useCallback istifadəsi arasındakı fərq nədir.
- Debouncing-i həyata keçirmək üçün bağlama tələsindən qaçış üsulundan necə istifadə etmək olar.

Debouncing və throttling nədir?
Gəlin qısaca xatırlayaq, əgər hələ onları istifadə etmək imkanınız olmayıbsa. “Debouncing” və “Throttling”\[13] müəyyən zaman intervalında funksiya çox tez-tez çağırıldıqda onun icrasını atlamağa imkan verən texnikalardır.

Məsələn, sadə bir asinxron axtarış funksionallığı həyata keçirdiyimizi təsəvvür edin: istifadəçi nəsə yaza biləcəyi bir input sahəsi və istifadəçi yazarkən mətn backend-ə göndərilir, backend isə uyğun axtarış nəticələrini qaytarır.
Əlbəttə, biz bunu “sadəlövh” şəkildə də həyata keçirə bilərik — sadəcə bir input sahəsi və onChange callback ilə:

```tsx
const Input = () => {
 const onChange = (e) => {
 // send data from input field to the backend here
 // will be triggered on every keystroke
 };
 return <input onChange={onChange} />;
};
```

Amma sürətli yazan biri dəqiqədə 70 söz yaza bilər ki, bu da təxminən saniyədə 6 düymə basma deməkdir. Bu implementasiyada nəticə 6 onChange hadisəsi, yəni saniyədə 6 server sorğusu olacaq! Hər backend bunu idarə edə bilməz. Həm də buna ehtiyac yoxdur.

Hər düymə basıldıqda sorğu göndərmək əvəzinə, bir az gözləyib istifadəçi yazmağı dayandırdıqda bütün dəyəri birdən göndərə bilərik. Məhz bunu debouncing edir. Əgər onChange funksiyama debounce tətbiq etsəm, o, funksiyanı çağırmaq üçün etdiyim hər cəhdi aşkar edəcək və əgər gözləmə…

interval hələ keçməyibsə, əvvəlki çağırışı atacaq və “gözləmə” saatını yenidən işə salacaq.

```tsx
const Input = () => {
 const onChange = (e) => {
 // send data from input field to the backend here
 // will be triggered 500 ms after the user stopped typing
 };
 const debouncedOnChange = debounce(onChange, 500);
 return <input onChange={debouncedOnChange} />;
};
```

Əvvəllər, axtarış sahəsində “React” yazanda, backend-ə sorğular hər düymə basıldığında dərhal göndərilirdi, dəyərlər isə “R”, “Re”, “Rea”, “Reac”, “React” olurdu. İndi isə onu debounced etdikdən sonra, “React” yazmağı dayandırdıqdan 500 ms sonra yalnız bir sorğu göndərəcək, dəyər isə “React” olacaq.

Əslində, debounce sadəcə funksiyanı qəbul edən, başqa bir funksiyanı qaytaran və daxilində ötürülən funksiyanın verilmiş intervaldan əvvəl çağırılıb-çağırılmadığını aşkar edən bir izləyici (tracker) olan bir funksiyadır. Əgər erkən çağırılıbsa — icranı atlayır və saatı yenidən işə salır. Interval keçibsə, ötürülən funksiyanı çağırır. Əsasən belə bir şeydir:

```tsx
const debounce = (callback, wait) => {
 // initialize the timer
 let timer;
 // lots of code here involving the actual implementation of timer
 // to track the time passed since the last callback call
 const debouncedFunc = () => {
 // checking whether the waiting time has passed
 if (shouldCallCall)
  callback();
 } else {
 // if time hasn't passed yet, restart the timer
 timer = startTimer(callback);
 }
 };
 return debouncedFunc;
};
```

Əsl implementasiya əlbəttə bir az daha mürəkkəbdir. Onu anlamaq üçün lodash debounce koduna\[14] baxa bilərsiniz.

Throttle çox oxşardır və daxili izləyici (tracker) və funksiyanı qaytaran funksiya ideyası eynidir. Fərq ondadır ki, throttle callback funksiyasını hər wait intervalında müntəzəm çağırmağı təmin edir, debounce isə davamlı olaraq taymeri sıfırlayır və sona qədər gözləyir.

Fərq aydın olacaq, əgər asinxron axtarış nümunəsi əvəzinə, avtomatik yaddaş (auto-save) funksiyası olan redaktə sahəsi istifadə etsək: istifadəçi sahədə nəsə yazırsa, biz yazdıqlarını backend-ə “canlı” şəkildə saxlamaq üçün sorğular göndərmək istəyirik, “save” düyməsini birbaşa basmadan. İstifadəçi çox sürətlə bir şeir yazırsa, “debounced” onChange callback yalnız bir dəfə işə düşəcək. Və əgər yazarkən bir problem baş verərsə, bütün şeir itəcək. “Throttled” callback isə periodik işə düşəcək, şeir müntəzəm saxlanacaq və fəlakət baş verərsə, yalnız şeirin son bir neçə millisekundluq hissəsi itəcək. Bu, daha təhlükəsiz yanaşmadır.

Interactive example and full code
https://advanced-react.com/examples/11/01

React-də debounced callback:
yenidən render-lərlə işləmək

İndi debounce və throttle nədir, niyə onlara ehtiyacımız var və necə implementasiya olunurlar bir az daha aydındır, gəlin React-də necə istifadə olunmalı olduqlarını dərindən araşdıraq. Və ümid edirəm ki, indi düşünmürsünüz: “Ah, bu nə qədər çətin ola bilər ki, sadəcə bir funksiyadır”, elə deyilmi? Həyatımız bəzən gözlənilməz sürprizlər olmadan maraqsız olardı.

İlk növbədə, debounced onChange callback-ə malik Input implementasiyasına yaxından baxaq (bundan sonra bütün nümunələrdə yalnız debounce istifadə edəcəyəm; təsvir olunan hər bir konsept throttle üçün də eyni dərəcədə keçərlidir).

```tsx
const Input = () => {
 const onChange = (e) => {
 // send data from input to the backend here
 };
 const debouncedOnChange = debounce(onChange, 500);
 return <input onChange={debouncedOnChange} />;
};
```

Nümunə mükəmməl işləsə də və adi React kodu kimi görünə bilər, təəssüf ki, real həyatla əlaqəsi yoxdur. Real həyatda çox güman ki, input-dan gələn dəyəri yalnız backend-ə göndərməkdən başqa bir şey etmək istəyərsiniz. Bəlkə bu input böyük bir formanı təşkil edəcək. Yaxud ora “clear” düyməsi əlavə etmək istəyə bilərsiniz. Və ya input tag əslində xarici bir kitabxanadan olan komponentdir və mütləq value sahəsini tələb edir.

Burada demək istədiyim odur ki, bir nöqtədə həmin dəyəri state-ə saxlamaq istəyə bilərsiniz, ya Input komponentinin özündə, ya da onu...

valideyn/xarici state idarəetməsində saxlamaq əvəzinə. Sadəlik üçün bunu Input komponentində edək.

```tsx
const Input = () => {
 // adding state for the value
 const [value, setValue] = useState();
 const onChange = (e) => {};
 const debouncedOnChange = debounce(onChange, 500);
 // turning input into controlled component by passing value from
//state there
 return (
 <input onChange={debouncedOnChange} value={value} />
 );
};
```

Mən useState hook vasitəsilə bir state dəyəri əlavə etdim və həmin dəyəri input sahəsinə ötürdüm. Qalan tək iş, input-un yazarkən həmin state-i yeniləməsidir. Əks halda, input işləməyəcək. Adətən, debounce olmadan, bunu onChange callback-də edərdik:

```tsx
const Input = () => {
 const [value, setValue] = useState();
 const onChange = (e) => {
 // set state value from onChange event
 setValue(e.target.value);
 };
 return <input onChange={onChange} value={value} />;
};
```

Mən bunu debounced onChange-də edə bilmərəm: çağırışı təbiət etibarilə gecikdirilmişdir, ona görə də state-dəki dəyər vaxtında yenilənməyəcək və input sadəcə işləməyəcək.

```tsx
const Input = () => {
 const [value, setValue] = useState();
 const onChange = (e) => {
 // just won't work, this callback is debounced
 setValue(e.target.value);
 };
 const debouncedOnChange = debounce(onChange, 500);
 return (
 <input onChange={debouncedOnChange} value={value} />
 );
};
```

Mən input öz onChange funksiyasını çağıranda dərhal setValue çağırmalıyam. Bu o deməkdir ki, onChange funksiyasını tam şəkildə artıq debounce edə bilmərəm və yalnız həqiqətən yavaşlatmaq istədiyim hissəni, yəni backend-ə sorğu göndərməyi debounce edə bilərəm.
Yəqin ki, belə bir şey olmalıdır, elə deyil?

```tsx
const Input = () => {
 const [value, setValue] = useState();
 const sendRequest = (value) => {
 // send value to the backend
 };
 // now send request is debounced
 const debouncedSendRequest = debounce(sendRequest, 500);
 // onChange is not debounced anymore, it just calls debounced
function
 const onChange = (e) => {
 const value = e.target.value;
 // state is updated on every value change, so input will work
 setValue(value);
 // call debounced request here
 debouncedSendRequest(value);
 };
 return <input onChange={onChange} value={value} />;
};
```

Məntiqlidir. Amma… bu da işləmir! İndi sorğu ümumiyyətlə debounce olunmur, sadəcə bir az gecikir. Əgər mən bu sahədə “React” yazsam, hələ də bütün “R”, “Re”, “Rea”, “Reac”, “React” sorğuları göndəriləcək, düzgün debounce edilmiş funksiya kimi yalnız bir “React” göndərilməli olduğu halda, sadəcə yarım saniyə gecikmə ilə.

Interactive example and full code
https://advanced-react.com/examples/11/02

Cavab əlbəttə ki, yenidən render-lərdir (React-də adətən belə olur). İlk fəsildən bildiyimiz kimi, state dəyişkənliyi komponentin özünü yenidən render etməsinə səbəb olur. Value-ni idarə etmək üçün state əlavə etdikdə, indi hər düymə basıldığında bütün Input komponenti yenidən render olunur.

Nəticədə, hər düymə basıldığında yalnız debounced callback deyil, həqiqi debounce funksiyasını da çağırırıq. Və, necə ki, az öncə müzakirə etdik, debounce funksiyası çağırıldığında:

- yeni bir taymer yaradır
- daxilində ötürülən callback-in taymer bitdikdə çağırılacağı bir funksiya yaradır və qaytarır

Beləliklə, hər re-render-də debounce(sendRequest, 500) çağırdığımız zaman, hər şeyi yenidən yaradırıq: yeni çağırış, yeni taymer, callback ilə yeni return funksiyası. Amma köhnə funksiya heç vaxt təmizlənmir, sadəcə yaddaşda qalır və taymerinin bitməsini gözləyir.

Taymer bitdikdə, callback funksiyasını işə salır və sonra sadəcə “ölür” və nəticədə garbage collector tərəfindən təmizlənir.

Nəticədə əldə etdiyimiz sadəcə sadə bir gecikmə funksiyasıdır, düzgün debounce deyil. İndi bunun düzəlişi aydın görünməlidir: debounce(sendRequest, 500) yalnız bir dəfə çağırılmalıdır ki, daxili taymer və qaytarılan funksiya qorunsun.

Bunu etmək üçün ən asan yol onu Input komponentinin xaricinə köçürməkdir:

```tsx
const sendRequest = (value) => {
 // send value to the backend
};
const debouncedSendRequest = debounce(sendRequest, 500);
const Input = () => {
 const [value, setValue] = useState();
 const onChange = (e) => {
 const value = e.target.value;
 setValue(value);
 // debouncedSendRequest is created once, so state caused rerenders won't affect it anymore
 debouncedSendRequest(value);
 };
 return <input onChange={onChange} value={value} />;
};
```

Amma bu işləməyəcək, əgər həmin funksiyalar komponentin lifecycle-ı içində baş verən nəsnələrə, yəni state və ya props-a bağlıdır. Heç bir problem yoxdur, eyni nəticəyə çatmaq üçün memoizasiya hook-larından istifadə edə bilərik:

```tsx
const Input = () => {
const [value, setValue] = useState('initial');
 // memoize the callback with useCallback
 // we need it since it's a dependency in useMemo below
 const sendRequest = useCallback((value: string) => {
 console.log('Changed value:', value);
 }, []);
 // memoize the debounce call with useMemo
 const debouncedSendRequest = useMemo(() => {
 return debounce(sendRequest, 1000);
 }, [sendRequest]);
 const onChange = (e) => {
 const value = e.target.value;
 setValue(value);
 debouncedSendRequest(value);
 };
 return <input onChange={onChange} value={value} />;
};
```

Interactive example and full code
https://advanced-react.com/examples/11/03

İndi hər şey gözlənildiyi kimi işləyir! Input komponenti state-ə malikdir, onChange-dəki backend çağırışı debounced edilmişdir və debounce düzgün şəkildə davranır.

Amma bu vəziyyət həmişə belə davam etməyə bilər…

İndi isə bu debouncing bulmacasının son hissəsinə keçək. Gəlin bu koda baxaq:

```tsx
const sendRequest = useCallback((value: string) => {
 console.log('Changed value:', value);
}, []);
```

Adi memoizə edilmiş bir funksiya, value qəbul edir və sonra onunla nəsə edir. Value birbaşa input-dan debounced funksiyası vasitəsilə gəlir. Biz onu onChange callback-də debounced funksiyanı çağırarkən ötürürük:

```tsx
const onChange = (e) => {
 const value = e.target.value;
 setValue(value);
 // value is coming from input change event directly
 debouncedSendRequest(value);
};
```

Amma bizdə bu value state-də də var. Oradan istifadə edə bilmərəm?
Bəlkə mənim bir neçə belə callback zəncirim var və bu dəyəri hər dəfə callback vasitəsilə ötürmək çətindir. Bəlkə başqa bir state dəyişkəninə də çıxışım olmasını istəyirəm. Belə bir şeyi callback vasitəsilə ötürmək məntiqli olmaz. Yaxud sadəcə callback-ləri və arqumentləri sevmirəm və state-dən istifadə etmək istəyirəm. Yetərincə sadə olmalıdır, elə deyilmi?

Və əlbəttə, yenə də heç nə göründüyü qədər sadə deyil. Əgər arqumenti aradan qaldırıb value-dan state vasitəsilə istifadə etsəm, onu useCallback hook-un dependencies massivinə əlavə etməli olardım:

```tsx
const Input = () => {
 const [value, setValue] = useState('initial');
 const sendRequest = useCallback(() => {
 // value is now coming from state
 console.log('Changed value:', value);
 // adding it to dependencies
 }, [value]);
};
```

Buna görə də, sendRequest funksiyası hər dəyər dəyişdikdə dəyişəcək. Memoizasiyanın işləmə prinsipi belədir. Dəyər, asılılıq dəyişənə qədər bütün yenidən renderlərdə eyni qalır. Bu isə o deməkdir ki, memoizə olunmuş debounce çağırışı da indi davamlı olaraq dəyişəcək: çünki onun asılılığı sendRequest-dir və bu da hər vəziyyət yenilənməsində dəyişir.

```tsx
// this will now change on every state update
// because sendRequest has dependency on state
const debouncedSendRequest = useMemo(() => {
 return debounce(sendRequest, 1000);
}, [sendRequest]);
```

Biz Input komponentinə ilk dəfə state əlavə etdiyimiz zamankı vəziyyətə qayıtmışıq: debounce sadəcə gecikməyə çevrilib.

Interactive example and full code
https://advanced-react.com/examples/11/04

Burada nə isə etmək olarmı? Əlbəttə! Bu, Refs üçün mükəmməl bir istifadə nümunəsidir. Əgər debouncing və React haqqında məqalələr axtarsanız, onların yarısında hər renderdə debounce funksiyasını yenidən yaratmamaq üçün useRef-dən istifadə etməkdən bəhs olunacaq.
Adətən, nümunə belə olur:

```tsx
const Input = () => {
// creating ref and initializing it with the debounced backend
//call
 const ref = useRef(
 debounce(() => {
 // this is our old "debouncedSendRequest" function
 }, 500),
 );
 const onChange = (e) => {
 const value = e.target.value;
 // calling the debounced function
 ref.current();
 };
};
```

Bu, əslində useMemo və useCallback əsasında olan əvvəlki həllə yaxşı bir alternativ ola bilər. Bilmirəm sən necə düşünürsən, amma həmin hook zəncirləri bəzən mənə baş ağrısı verir. Ref-əsaslı həll isə daha sadə görünür.
Təəssüf ki, bu yalnız əvvəlki istifadə halı üçün işləyəcək: yəni callback-in içində state olmadıqda. Əvvəlki fəsli və closure problemini xatırlayırsan? Ref-in ilkin dəyəri keşlənir və heç vaxt yenilənmir. O, komponent mount olunanda və ref init ediləndə “dondurulur”.
Artıq bildiyimiz kimi, Ref-lərdə funksiyalardan istifadə etdikdə onları useEffect içində yeniləməliyik. Əks halda, closure köhnəlmiş olur.

```tsx
const Input = () => {
 const [value, setValue] = useState();
 // creating ref and initializing it with the debounced backend
//call
 const ref = useRef(
 debounce(() => {
  // send request to the backend here
 }, 500),
 );
 useEffect(() => {
 // updating ref when state changes
 ref.current = debounce(() => {
 // send request to the backend here
 }, 500);
 }, [value]);
 const onChange = (e) => {
 const value = e.target.value;
 // calling the debounced function
 ref.current();
 };
};
```

Amma təəssüf ki, bu, asılılıqlarla birlikdə useCallback həllindən fərqlənmir: debounce funksiyası hər dəfə yenidən yaradılır, içindəki taymer hər dəfə yenidən qurulur və debounce sadəcə adını dəyişmiş bir gecikmədən başqa bir şey deyil.

Interactive example and full code
https://advanced-react.com/examples/11/05

Bunu həll etməyin bir yolu useEffect-də cleanup funksiyasından istifadə etməkdir (bunlar haqqında 15-ci fəsildə — Data fetching və race conditions mövzusunda daha ətraflı danışacağıq) və yenidən təyin etməzdən əvvəl debounce olunmuş callback-i sıfırlamaqdır.
Təxminən belə:

```tsx
useEffect(() => {
 // updating ref when state changes
 ref.current = debounce(() => {}, 500);
 // cancel the debounce callback before
 return () => ref.current.cancel();
}, [value]);
```

Bu halda, hər yeniləmədə “köhnə” debounce olunmuş closure-dan qurtuluruq və yenisini başladırıq. Debouncing üçün yaxşı həlldir. Amma təəssüf ki, throttling üçün işləməyəcək. Əgər onu davamlı ləğv etsəm, o, intervaldan sonra işə düşmək şansını heç vaxt əldə edə bilməyəcək, halbuki throttle-da bu olmalıdır. Mən daha universal bir şey istəyirəm.
Closure-lardan qaçmaq üçün başqa yaxşı istifadə nümunəsi də var, onu əvvəlki fəsildə ətraflı öyrəndik! Sadəcə sendRequest-i Ref-ə təyin etməliyik, useEffect-də həmin Ref-i yeniləməliyik ki, ən son closure-a çıxışımız olsun, və sonra closure içində ref.current-i çağırmalıyıq. Yadda saxla: ref-lər dəyişkəndir və closure-lar dərin klonlama etmir. Yalnız mutable obyektə olan referans “dondurulur”, biz hələ də onun göstərdiyi obyekt üzərində hər dəfə dəyişiklik edə bilərik.
Closure-lar haqqında düşünmək başımı ağrıdır, amma əslində işləyir və kodda bu məntiqi izləmək daha asandır:

```tsx
const Input = () => {
 const [value, setValue] = useState();
 const sendRequest = () => {
 // send request to the backend here
 // value is coming from state
 console.log(value);
 };
 // creating ref and initializing it with the sendRequest function
 const ref = useRef(sendRequest);
 useEffect(() => {
 // updating ref when state changes
 // now, ref.current will have the latest sendRequest with
 //access to the latest state
 ref.current = sendRequest;
 }, [value]);
 // creating debounced callback only once - on mount
 const debouncedCallback = useMemo(() => {
 // func will be created only once - on mount
 const func = () => {
 // ref is mutable! ref.current is a reference to the latest
sendRequest
 ref.current?.();
 };
 // debounce the func that was created once, but has access to
the latest sendRequest
 return debounce(func, 1000);
 // no dependencies! never gets updated
 }, []);
 const onChange = (e) => {
 const value = e.target.value;
 // calling the debounced function
 debouncedCallback();
 };
};
```

İndi isə, closure-ların başgicəlləndirici qarışıqlığını bir kiçik hook-a çıxarmaq, onu ayrıca fayla qoymaq və görməzdən gəlmək kifayətdir.

```tsx
const useDebounce = (callback) => {
 const ref = useRef();
 useEffect(() => {
 ref.current = callback;
 }, [callback]);
 
 const debouncedCallback = useMemo(() => {
 const func = () => {
 ref.current?.();
 };
 return debounce(func, 1000);
 }, []);
 return debouncedCallback;
};
```

Sonra isə, bizim production kodu onu useMemo və useCallback zənciri olmadan istifadə edə bilər, asılılıqlardan narahat olmadan və ən son state və props-a daxil olaraq!

```tsx
const Input = () => {
 const [value, setValue] = useState();
 const debouncedRequest = useDebounce(() => {
 // send request to the backend
 // access to the latest state here
 console.log(value);
 });
 const onChange = (e) => {
 const value = e.target.value;
 setValue(value);
 debouncedRequest();
 };
 return <input onChange={onChange} value={value} />;
};
```

Interactive example and full code
https://advanced-react.com/examples/11/06

Əsas nəticələr

Bu əyləncəli oldu, deyilmi? JavaScript-in closure-ları internetdə ən çox sevilən xüsusiyyət olmalıdır. Növbəti fəsildə onlarla məşğul olmaqdan qurtulmağa çalışacağıq və əvəzinə bəzi UI təkmilləşdirmələri ilə oynayacağıq. Daha dəqiq desək, yerləşdirilmiş elementlər üçün “flickering” effektindən necə qurtulmağı öyrənəcəyik. Amma əvvəlcə, bu fəsli tez bir xülasə edək:

- Debounce və throttle funksiyalarını çox tez-tez işə düşən funksiyaların çağırışlarını keçmək istəyəndə istifadə edirik.
- Bu funksiyaların düzgün işləməsi üçün, adətən komponent mount olunduqda, yalnız bir dəfə çağırılmalıdırlar.
- Əgər onları birbaşa komponentin render funksiyasında çağırsaq, içindəki taymer hər renderdə yenidən yaradılacaq və funksiyalar gözlənildiyi kimi işləməyəcək.
- Bunu düzəltmək üçün useMemo ilə və ya Refs istifadə edərək memoizasiya edə bilərik.
- Əgər onları sadəcə memoizə etsək və ya Ref-ləri “sadə” istifadə etsək, komponentin ən son məlumatlarına, məsələn state və props-a çıxışımız olmayacaq. Bu, Ref init edilərkən closure yaradıldığı və həmin vaxt dəyərlərin “dondurulduğu” üçün baş verir.
- Closure tələsindən çıxmaq üçün, Ref obyektinin dəyişkən təbiətindən istifadə edə bilərik və useEffect içində ref.current-də “bağlanmış” funksiyanı davamlı yeniləyərək ən son məlumatlara çıxış əldə edə bilərik.

# **Fəsil 12. useLayoutEffect ilə UI-də Flickering-dən Qurtulmaq**

Gəlin React-də DOM-a giriş mövzusundan bir az daha danışaq. Əvvəlki fəsillərdə bunu Ref ilə necə etmək lazım olduğunu öyrəndik və Ref haqqında hər şeyi bonus olaraq öyrəndik. Amma DOM ilə işləyərkən çox vacib, baxmayaraq ki, nadir mövzu olan başqa bir məsələ var: elementin ölçüsü və ya mövqeyi kimi real DOM ölçmələrinə əsaslanaraq elementləri dəyişdirmək.

Bəs problemin özü nədir və niyə “normal” taktika kifayət etmir? Gəlin kodlaşdıraq və bunu başa düşək. Bu prosesdə öyrənəcəyik:

- useLayoutEffect haqqında bilməli olduğumuz hər şey.
- Nə vaxt və niyə useEffect əvəzinə onu istifadə etmək istəyə bilərik.
- Brauzerlərin React kodumuzu necə render etdiyini.
- Painting nədir və bütün bunlar niyə önəmlidir.
- SSR-in burada rolu nədir.

# useEffect ilə problem nədir?

Kodlama vaxtıdır! Gəlin bir az maraqlı şey edək: responsiv navigation komponenti. O, bir sıra linkləri render edə bilər və container ölçüsünə əsaslanaraq bu linklərin sayını tənzimləyə bilər.

!image.png

Əgər bəzi linklər sığmazsa, onları açmaq üçün kliklədikdə dropdown menyuda göstəriləcək bir “more” düyməsi göstər.

!image.png

İndi isə komponentin özü. Bu, sadəcə bir array məlumat qəbul edən və uyğun linkləri render edən bir komponent olacaq:

```tsx
const Component = ({ items }) => {
 return (
 <div className="navigation">
 {items.map((item) => (
 <a href={item.href}>{item.name}</a>
 ))}
 </div>
 );
};
```

İndi isə, bunu necə responsiv edək? Problemin özü ondadır ki, mövcud məkana neçə element sığacağını hesablamaq lazımdır. Bunu etmək üçün, elementlərin render olunduğu container-in genişliyini və hər bir elementin ölçülərini bilmək lazımdır. Burada əvvəlcədən heç nəyi fərz edə bilmərik, məsələn, hərfləri saymaqla: brauzerdə mətnin necə render olunacağı istifadə olunan fonta, dilə, brauzerə və bəlkə də ayın fazalarına çox bağlıdır.

Əsl ölçüləri əldə etməyin yeganə yolu, elementləri brauzerdə render etdirmək və sonra ölçüləri native JavaScript API-si, məsələn, getBoundingClientRect vasitəsilə çıxarmaqdır.

Bunu bir neçə addımda etməliyik. İlk olaraq, elementlərə çıxış əldə etmək. Biz bir Ref yarada və onu həmin elementləri əhatə edən div-ə təyin edə bilərik:

```tsx
const Component = ({ items }) => {
 const ref = useRef(null);
 return (
 <div className="navigation" ref={ref}>
 ...
 </div>
 );
};
```

İkincisi, useEffect içində div elementini götür və onun ölçüsünü al.

```tsx
const Component = ({ items }) => {
 useEffect(() => {
 const div = ref.current;
 const { width } = div.getBoundingClientRect();
 }, [ref]);
 return ...
}
```

Üçüncüsü, div-in uşaqları üzərində iterasiya et və onların genişliklərini bir array-ə çıxar.

```tsx
const Component = ({ items }) => {
 useEffect(() => {
 // same code as before
 // convert div's children into an array
 const children = [...div.childNodes];
 // all the widths
 const childrenWidths = children.map(child =>
child.getBoundingClientRect().width)
 }, [ref]);
 return ...
}
```

İndi isə, sadəcə həmin array üzərində iterasiya etmək, uşaqların genişliklərini toplamaq, bu cəmləri parent div ilə müqayisə etmək və nəticə olaraq son görünən elementi tapmaq qalır.
Amma dayan, bir şeyi unutmuşuq: “more” düyməsi. Onun genişliyini də nəzərə almalıyıq. Əks halda, bir neçə element sığar, amma “more” düyməsi sığmaya bilər.

!image.png

Yenə də, onun genişliyini yalnız brauzerdə render etdikdə əldə edə bilərik. Buna görə də, düyməni ilkin render zamanı açıq şəkildə əlavə etməliyik:

```tsx
const Component = ({ items }) => {
 return (
 <div className="navigation">
 {items.map((item) => (
 <a href={item.href}>{item.name}</a>
 ))}
 {/* add the "more" button after the links explicitly */}
 <button id="more">...</button>
 </div>
 );
};
```

Əgər bütün genişlik hesablaması loqikasını bir funksiyaya abstrakt etsək, useEffect içində belə bir nəticə əldə edəcəyik:

```tsx
useEffect(() => {
 const itemIndex = getLastVisibleItem(ref.current);
}, [ref]);
```

getLastVisibleItem funksiyası bütün hesablamaları edir və bizə tək bir ədəd qaytarır — mövcud məkana sığa biləcək son link-in indeksini. Mən logikanın özünə girməyəcəyəm. Bunu etmək üçün milyonlarla yol var və final kod nümunəsində daha sonra göstəriləcək.

Əsas məsələ odur ki, biz həmin ədədi əldə etdik. React baxımından növbəti addım nə olmalıdır? Əgər onu olduğu kimi buraxsaq, bütün linklər və “more” düyməsi görünəcək. Burada tək həll yolu var — komponenti yeniləməliyik və orada olmamalı olan bütün elementləri çıxarmalıyıq.

Və bunu etmək üçün yeganə yol: həmin ədədi əldə etdiyimiz zaman state-də saxlamaqdır:

```tsx
const Component = ({ items }) => {
 // set the initial value to -1, to indicate that we haven't run
//he calculations yet
 const [lastVisibleMenuItem, setLastVisibleMenuItem] =
 useState(-1);
 useEffect(() => {
 const itemIndex = getLastVisibleItem(ref.current);
 // update state with the actual number
 setLastVisibleMenuItem(itemIndex);
 }, [ref]);
};
```

Və sonra, menyunu render edərkən bunu nəzərə al:

```tsx
const Component = ({ items }) => {
 // render everything if it's the first pass and the value is
//still the default
 if (lastVisibleMenuItem === -1) {
 // render all of them here, same as before
 return ...
 }
 // show "more" button if the last visible item is not the last
//one in the array
 const isMoreVisible = lastVisibleMenuItem < items.length - 1;
 // filter out those items which index is more than the last
//visible
 const filteredItems = items.filter((item, index) => index <=
lastVisibleMenuItem);
 return (
 <div className="navigation">
 {/*render only visible items*/}
 {filteredItems.map(item => <a href={item.href}>{item.name}
</a>)}
{/*render "more" conditionally*/}
 {isMoreVisible && <button id="more">...</button>}
 </div>
 )
}
```

Beləliklə, işin əsas məğzi budur! İndi, state real ədəd ilə yeniləndikdən sonra, navigation komponenti yenidən render olunacaq və React elementləri yenidən render edib görünməyənləri çıxaracaq. “Düzgün” responsiv təcrübə üçün, həmçinin resize event-ini dinləyib ədədi yenidən hesablamaq lazım olacaq, amma bunu implementasiyanı sənə buraxıram.

Aşağıdakı linkdə tam işlək nümunəni tapa bilərsən. Resize ilə birlikdə.

Amma hələ çox həyəcanlanma: burada istifadəçi təcrübəsində böyük bir çatışmazlıq var.

Interactive example and full code

https://advanced-react.com/examples/12/01

Birkaç dəfə yenilə, xüsusilə CPU-nu yavaşlatdıqda. Təəssüf ki, orada nəzərəçarpan bir kontent flash-ı var. Başlanğıc renderi — menyudakı bütün elementlər və “more” düyməsi görünəndə — aydın görə bilməlisən. Bunu production-a göndərmədən əvvəl mütləq düzəltməliyik.

# useLayoutEffect ilə düzəltmək

O flash-ın səbəbi olduqca açıq olmalıdır: biz həmin elementləri render edirik və lazımsız elementləri çıxarmadan əvvəl onları görünən edirik. Və əvvəlcə render etməliyik, əks halda maraqlı responsivlik işləməyəcək. Beləliklə, mümkün bir həll yolu: həmin ilkin pass-i hələ də render etmək, amma görünməz şəkildə — opacity 0 ilə və ya görünən sahədən kənarda bir div-də. Və yalnız ölçüləri və magic number-ı çıxardıqdan sonra onları görünən etmək. Keçmişdə bu cür halları belə həll edirdik.

Amma React \~16.8 versiyasından (hooks ilə olan) etibarən, sadəcə useEffect hook-un yerinə useLayoutEffect istifadə etmək kifayətdir.

```tsx
const Component = ({ items }) => {
 // everything is exactly the same, only the hook name is
//different
 useLayoutEffect(() => {
 // the code is still the same
 }, [ref]);
};
```

Bu tam magiyadır, artıq ilkin flash yoxdur.

Interactive example and full code
https://advanced-react.com/examples/12/02

Bunu etmək təhlükəsizdirmi? Niyə useEffect əvəzinə hər yerdə onu istifadə etmirik? Dokumentasiyada açıq şəkildə deyilir ki, useLayoutEffect performansa zərər verə bilər və ondan çəkinmək lazımdır. Niyə belədir? Həmçinin deyilir ki, o “brauzer ekranı yenidən çəkməzdən əvvəl” işə düşür, bu isə useEffect-in ekran yeniləndikdən sonra işə düşdüyünü göstərir. Amma praktiki baxımdan bunun mənası nədir? İndi sadə dropdown-lar yazarkən brauzerin painting kimi aşağı səviyyəli konseptləri barədə düşünməliyəm?

Bu suallara cavab vermək üçün, bir anlıq React-dən kənara çıxmalı və brauzerlər və klassik JavaScript haqqında danışmalıyıq.

Niyə bu düzəliş işləyir: render, painting və brauzerlər
Əvvəlcə bizə “brauzer renderi” lazımdır. React dünyasında bunu “painting” də adlandırırlar ki, React-in renderindən fərqləndirilsin — bunlar tamamilə fərqlidir! İdeya nisbətən sadədir. Brauzerlər ekranda göstərilməsi lazım olan hər şeyi real vaxtda davamlı yeniləmirlər. Bu, bir ağ lövhədə çəkmək, silmək, mətn yazmaq və ya bir bayquş eskizi çəkmək kimi deyil.

Əksinə, bu, insanlara slayd göstərmək kimidir: bir slaydı göstərirsən, onların oradakı ideyanı başa düşməsini gözləyirsən, sonra növbəti slayda keçirsən və s.

Amma bunu çox, çox sürətli edirlər. Adətən, müasir brauzerlər 60 FPS sürətini qorumağa çalışır — saniyədə 60 frame. Bir slayd təxminən hər 13 millisekundda dəyişir. Biz React-də buna “painting” deyirik.

Bu slaydləri yeniləyən məlumat “task”lara bölünür. Task-lar növbəyə qoyulur. Brauzer növbədən bir task götürür və onu icra edir. Əgər vaxtı varsa, növbəti task-ı icra edir və s., təxminən 13ms-lik boşluq qurtarana qədər, sonra ekranı yeniləyir. Və dayanmadan, yorulmadan işləyir ki, biz Twitter-də doom-scrolling kimi vacib işləri heç fərqinə varmadan edə bilək.

“Task” nədir? Normal JavaScript baxımından, script tag-də qoyduğumuz və sinxron icra etdiyimiz hər şey task hesab olunur. Məsələn, bu kodu nəzərdən keçir:

```tsx
const app = document.getElementById('app');
const child = document.createElement('div');
child.innerHTML = '<h1>Heyo!</h1>';
app.appendChild(child);
child.style = 'border: 10px solid red';
child.style = 'border: 20px solid green';
child.style = 'border: 30px solid black';
```

Mən bir elementi id-si ilə götürürəm, onu app dəyişənində saxlayıram, bir div yaradıram, HTML-ni yeniləyirəm, həmin div-i app-ə əlavə edirəm və div-in border-inə üç dəfə dəyişiklik edirəm. Bütün bunlar brauzer üçün yalnız bir task hesab olunacaq. Yəni, brauzer hər sətiri icra edəcək və yalnız sonra nəticəni — qara border-li div-i — çəkmək üçün paint edəcək.

Ekranda bu qırmızı-yaşıl-qara keçidi görə bilməyəcəksiniz.

Peki, əgər bir “task” 13ms-dən uzun çəkirsə nə olar? Təəssüf ki, brauzer bunu dayandıra və ya bölə bilməz. Task bitənə qədər davam edəcək və sonra nəticəni paint edəcək. Əgər border dəyişiklikləri arasında 1 saniyəlik sinxron gecikmələr əlavə etsəm:

```tsx
const waitSync = (ms) => {
 let start = Date.now(),
 now = start;
 while (now - start < ms) {
 now = Date.now();
 }
};
child.style = 'border: 10px solid red';
waitSync(1000);
child.style = 'border: 20px solid green';
waitSync(1000);
child.style = 'border: 30px solid black';
waitSync(1000);
```

Hələ də “aralıq” nəticəni görə bilməyəcəyik. Sadəcə brauzerin bunu həll etməsini gözləyərək boş ekrana baxacağıq və nəticədə qara border-i görəcəyik. Buna “blocking render” və ya “blocking painting” kodu deyirik.

Interactive example and full code
Page 246
https://advanced-react.com/examples/12/03

İndi, baxmayaraq ki, React sadəcə JavaScript-dir, əlbəttə ki, o tək bir task kimi icra edilmir. Əgər belə olsaydı, internet dözülməz olardı. Hər kəs məcburən çöldə oynayacaq və insanlarla ünsiyyət qurmalı olardı, və bunu kim istərdi ki?

Böyük bir task-ı, məsələn, bütün app-in renderini, kiçik task-lara “bölməyin” yolu müxtəlif “asynchronous” metodlardan istifadə etməkdir: callback-lər, event handler-lar, promise-lər və s.

Əgər mən sadəcə həmin style dəyişikliklərini setTimeout içində büksəm, hətta 0 gecikmə ilə belə:

```tsx
setTimeout(() => {
 child.style = 'border: 10px solid red';
 wait(1000);
 setTimeout(() => {
 child.style = 'border: 20px solid green';
 wait(1000);
 setTimeout(() => {
 child.style = 'border: 30px solid black';
 wait(1000);
 }, 0);
 }, 0);
}, 0);
```

O zaman həmin time-out-ların hər biri yeni bir “task” hesab olunacaq. Beləliklə, brauzer bir task-ı bitirdikdən sonra ekranı yenidən paint edə biləcək və növbəti task-a başlamazdan əvvəl nəticəni göstərəcək. Nəticədə, qırmızıdan yaşıl və yenidən qara keçidi yavaş-yavaş, amma gözəl şəkildə görə biləcəyik, əksinə, üç saniyə boyunca ağ ekrana baxıb meditasiyada qalmaq əvəzinə.

Interactive example and full code
https://advanced-react.com/examples/12/04

React bizim üçün bunu edir. Əsasən, bu, çox mürəkkəb və çox effektiv bir mühərrikdir ki, yüzlərlə npm dependency-lərimiz və öz kodlarımızla birlikdə olan böyük, böyük kod bloklarını brauzerlərin 13 ms-dən az müddətdə emal edə biləcəyi ən kiçik hissələrə bölür (ideal olaraq).

useEffect vs useLayoutEffect-ə qayıdaq
İndi nəhayət, useEffect və useLayoutEffect-ə qayıdaq və əvvəlcə verdiyimiz suallara necə cavab verəcəyimizi izah edək.

useLayoutEffect React-in komponent yenilənmələri zamanı sinxron şəkildə işlədiyi bir hook-dur. Bu kodda:

```tsx
const Component = () => {
 useLayoutEffect(() => {
 // do something
 })
 return ...
}
```

Component içində render etdiyimiz hər şey useLayoutEffect ilə eyni “task” kimi işlədiləcək. React buna zəmanət verir. Hətta useLayoutEffect içində state-i yeniləsək belə, adətən bunu asinxron bir task kimi düşünürük, React bütün axının sinxron şəkildə işlədilməsini təmin edəcək.

Əgər əvvəldə implementasiya etdiyimiz “navigation” nümunəsinə qayıtsaq, brauzerin baxımından bu, yalnız bir “task” olacaq.

!image.png

Bu vəziyyət tam olaraq əvvəl görə bilmədiyimiz qırmızı-yaşıl-qara border keçidi ilə eynidir!

useEffect ilə isə axın iki task-a bölünəcək:

!image.png

Birinci task navigation-in “ilk” passını bütün düymələrlə render edir.
İkinci task isə lazım olmayan uşaqları çıxarır. Arada ekran yenilənir! Tam olaraq time-out içindəki border-lar ilə eyni vəziyyət.

Beləliklə, əvvəlki suallara cavab: useLayoutEffect istifadə etmək təhlükəsizdirmi? Bəli! Performansa zərər verə bilərmi? Tamamilə! Son istədiyimiz şey bütün React app-in bir böyük sinxron “task”a çevrilməsidir.

useLayoutEffect yalnız elementlərin real ölçülərinə görə UI-ni tənzimləmək lazım olan vizual “glitches”-dən qurtulmaq üçün istifadə olunmalıdır. Hər şey üçün isə useEffect istifadə etmək lazımdır. Bəlkə də onu belə istifadə etməyə də ehtiyac yoxdur.

useEffect haqqında bir az daha
useEffect-in setTimeout içində işlədiyi mental modeli fərqi başa düşmək üçün rahatdır, amma texniki baxımdan doğru deyil.

Əvvəlcə, implementasiya detallarını aydınlaşdırmaq üçün, React əslində postMessage-i requestAnimationFrame ilə birləşdirən bir trick istifadə edir.

İkincisi, onun həqiqətən asinxron işləyəcəyi zəmanət verilmir. React onu mümkün qədər optimallaşdırmağa çalışsa da, bəzi hallarda brauzer paint-dən əvvəl işləyə bilər və nəticədə paint-i bloklaya bilər. Bu hallardan biri, update zəncirində artıq useLayoutEffect-in olmasıdır.

Məsələ belədir: React re-render-ləri “snapshot”lar və ya dövrlər şəklində icra edir. Hər re-render dövrü təxminən belə görünəcək:
“State update triggered -> useLayoutEffect triggered -> useEffect triggered”.

Əgər bunlardan hər hansı biri state update-i tetiklesə, yeni bir re-render dövrü başlayacaq. Amma bunu etməzdən əvvəl, React state update-i başlatmış dövrü bitirməlidir. Beləliklə, useEffect yeni dövr başlamazdan əvvəl işləməlidir. Buna görə də, əgər state update useLayoutEffect içində tetiklənsə, və useLayoutEffect sinxron olduğu üçün, React-in başqa seçimi yoxdur — useEffect-i də sinxron şəkildə işlətməlidir.

useLayoutEffect Next.js və digər SSR framework-lərdə
Aşağı səviyyəli JavaScript və brauzer işlərindən kifayət qədər, gəlin production kodumuza qayıdaq. Çünki “real həyat”da, bütün bunlarla çox vaxt məşğul olmaq lazım deyil. “Real həyat”da biz sadəcə gözəl responsiv navigation kodlamaq və onu Next.js kimi maraqlı bir framework-də istifadəçi təcrübəsi yaratmaq istəyirik.

Amma bunu etməyə çalışanda, ilk nəzərə çarpan şey budur ki, işləməyəcək. Heç işləməyəcək. Glitching hələ də qalır, heç bir magiya yoxdur. Bunu təkrarlamaq üçün sadəcə əvvəlcə düzəltdiyimiz navigation-u Next.js app-inə copy-paste et, əgər varsa.

Nə baş verir?
SSR var. Server-side rendering. Bəzi framework-lərin default olaraq dəstəklədiyi gözəl bir xüsusiyyət. Amma belə hallarda əsl problem yaradır.

Görürsünüz, SSR aktiv olduqda, React komponentlərinin render-inin ilk pass-ı və bütün lifecycle event-lərin çağırılması serverdə baş verir, kod brauzerə çatmadan əvvəl. SSR-in necə işlədiyini bilmirsinizsə, bu deməkdir ki, backend-də bir metod React.renderToString(<App />) kimi bir şey çağırır.

React sonra app-dəki bütün komponentləri keçir, onları “render” edir (yəni funksiyalarını sadəcə çağırır) və həmin komponentlərin təmsil etdiyi HTML-i çıxarır.

!image.png

Sonra, bu HTML brauzerə göndəriləcək səhifəyə əlavə olunur və işə düşür. Köhnə yaxşı zamanlardakı kimi, hər şey serverdə yaradılırdı və biz JavaScript-i yalnız menyuları açmaq üçün istifadə edirdik. Daha sonra brauzer səhifəni yükləyir, göstərir, bütün script-ləri (React daxil olmaqla) yükləyir, onları icra edir (React daxil olmaqla yenidən), React əvvəlcədən yaradılmış HTML-i keçir, üzərinə interaktivlik əlavə edir və səhifəmiz yenidən canlı olur.

Problem ondadır ki, ilkin HTML-i yaratdığımız zaman hələ brauzer yoxdur. Beləliklə, elementlərin real ölçülərini hesablamaq tələb edən hər şey (məsələn, useLayoutEffect-də etdiyimiz kimi) serverdə işləməyəcək: hələ ölçülü elementlər yoxdur, sadəcə string-lər var. Və useLayoutEffect-in bütün məqsədi elementlərin ölçülərinə çıxış əldə etmək olduğundan, onu serverdə işlətməyin çox mənası yoxdur. React də bunu etmir.

Nəticədə, brauzer ilk dəfə səhifəni göstərərkən və hələ interaktiv olmayan vəziyyətdə gördüyümüz şey komponentdə “ilk pass” mərhələsində render etdiyimizdir: bütün düymələrin sırası, “more” düyməsi daxil olmaqla. Brauzer hər şeyi icra etdikdən və React yenidən işləməyə başladıqdan sonra useLayoutEffect işə düşə bilər və düymələr sonunda gizlədilir. Amma vizual glitch hələ də qalır.

Bunu düzəltmək istifadəçi təcrübəsi məsələsidir və tamamilə göstərmək istədiyiniz şeydən asılıdır. Məsələn, menyu əvəzinə bir “loading” state göstərə bilərsiniz. Və ya ən vacib bir-iki menyu elementini göstərə bilərsiniz. Və ya elementləri tamamilə gizlədib yalnız client-də render edə bilərsiniz. Bu sizin seçiminizə bağlıdır.

Bunu etmək üçün bir yol, sadəcə “shouldRender” adlı state dəyişəni yaratmaq və onu useEffect içində “true”-ya çevirməkdir:

```tsx
const Component = () => {
 const [shouldRender, setShouldRender] = useState(false);
 useEffect(() => {
 setShouldRender(true);
 }, []);
 if (!shouldRender) return <SomeNavigationSubstitude />;
 return <Navigation />;
};
```

useEffect yalnız client-də işləyəcək, buna görə ilkin SSR pass bizə əvəzedici komponenti göstərəcək. Sonra client kodu işə düşəcək, useEffect işləyəcək, state dəyişəcək və React onu normal responsiv navigation ilə əvəz edəcək.

Burada state əlavə etməkdən qorxmayın və conditional rendering-i belə etməyə çalışmayın:

```tsx
const Component = () => {
 // Detectign SSR by checking whether window is there
 if (typeof window === "undefined")
 return <SomeNavigationSubstitude />;
 return <Navigation />;
};
```

Texniki baxımdan, typeof window === "undefined" SSR mühitini göstərir (serverdə window yoxdur), amma bu, bizim use-case üçün işləməyəcək. React-ə SSR-dən gələn HTML və client-də ilkin renderdən gələn HTML-in tam olaraq eyni olması lazımdır.

Əks halda, app sanki sərxoş kimi davranacaq: stillər pozulacaq, bloklar səhv yerləşdiriləcək, kontent qəribə yerlərdə görünəcək.

Əsas məqamlar

İndilik üçün “flickering” mövzusu bu qədər. Növbəti fəsildə UI barədə söhbətimizi davam etdirəcək, Portals-larla necə işləməyi və niyə istifadə olunduğunu öyrənəcəyik. Bu müddətdə yadda saxlamağa dəyər bir neçə məqam:

- useEffect içində elementlərin ölçülərini hesablamaq və sonra onları gizlətmək və ya ölçülərini tənzimləmək vizual “glitch”-ə səbəb ola bilər.
- Bu, adətən useEffect-in asinxron işləməsi ilə bağlıdır. Asinxron kod brauzer baxımından ayrı bir task-dır. Beləliklə, brauzer dəyişiklikdən əvvəl və sonra vəziyyəti paint etmək imkanı əldə edir və glitch yaranır.
- Bu davranışı useLayoutEffect ilə önləyə bilərik. Bu hook sinxron işləyir. Brauzer baxımından bir böyük, bölünməz task olacaq. Beləliklə, brauzer gözləyəcək və task bitib son ölçülər hesablanana qədər heç nə paint etməyəcək.
- SSR mühitində useLayoutEffect işləmir, çünki React SSR modunda onu icra etmir və “glitch” yenidən görünəcək.
- Bunu həmin xüsusiyyət üçün SSR-dən imtina edərək düzəltmək olar.

# 13-cü Fəsil: React Portalları və Niyə Onlara Ehtiyacımız Var

Gəlin UI haqqında daha çox danışaq. Əvvəlki fəsildə "flickering" problemini həll etdik. İndi isə başqa bir maraqlı UI xətasına, yəni məzmunun kəsilməsinə baxaq.
Bəlkə də, elementləri overflow: hidden olan elementlərin içində render edərkən ondan qaçmaq üçün React-da Portallara ehtiyacımız olduğunu eşitmisiniz. İnternetdə Portallar haqqında hər ikinci məqalədə bu nümunə var. Bu, əslində doğru deyil: biz məzmunun "kəsilməsindən" sadəcə saf CSS ilə qaça bilərik.
Portallara başqa səbəblər üçün ehtiyacımız var. Bu "overflow problemi" də yanlış bir təhlükəsizlik hissi yarada bilər: əgər tətbiqdə overflow: hidden yoxdursa, hər şeyi asanlıqla hər yerdə təhlükəsiz şəkildə yerləşdirə bilərik. Bu da doğru deyil.
İndi bunların hamısına dərindən baxaq və öyrənək:

Elementlərin CSS ilə yerləşdirilməsi necə işləyir.
Yığılma Konteksti nədir.
CSS ilə məzmunun kəsilməsindən necə qaçmaq olar.
Niyə hər şeyi CSS ilə edə bilmirik və Portallara ehtiyac var.
Portalların necə işlədiyi və onların çatışmazlıqları.

İstənilən halda: bu, CSS ağırlıqlı bir fəsildir. Onun ilk yarısı yalnız CSS ilə bağlı konseptləri ətraflı şəkildə əhatə edir, çünki hər React inkişaf etdiricisi CSS-də peşəkar deyil.

# CSS: absolute positioning

Gəlin ən sadə tətbiqdən başlayaq və əksər insanların artıq bildiyi bəzi əsasları nəzərdən keçirək.
Bizim bir səhifəmiz var, bəzi funksionallıqlar və ortada bir düymə var. Düyməyə basıldıqda, əlavə məlumat göstərmək istəyirəm:

```tsx
const App = () => {
 const [isVisible, setIsVisible] = useState(false);
 return (
 <>
 <SomeComponent />
 <button onClick={() => setIsVisible(true)}>
 show more
 </button>
 {isVisible && <ModalDialog />}
 <AnotherComponent />
 </>
 );
};
```

Bu tətbiqetmə ilə əlavə məzmun göründüyü zaman "AnotherComponent"dan aşağı doğru "itələyəcək". Bu, hər hansı bir HTML sənədinin normal axınıdır və "block" HTML elementlərinin (div, p, bütün h etiketləri və s.) standart davranışıdır.
Amma biz əlavə məzmunu modal dialoq kimi həyata keçirmək istəyirik və modal dialoqlar adətən səhifə məzmununun üstündə görünür. Mənim istədiyim, ModalDialog komponentinin normal sənəd axınından qaçmağıdır. Bunu əldə etməyin ən yaygın yolu CSS xüsusiyyəti "position" vasitəsilədir.
Position xüsusiyyəti, sənəd axınından çıxmağa imkan verən iki dəyəri dəstəkləyir: absolute və fixed. Gəlin absolute ilə başlayaq və dialoqu tətbiq etməyə çalışaq. Bunu etmək üçün, ModalDialog komponentindəki div-ə position: absolute CSS tətbiq etmək kifayətdir:

```tsx
// somewhere where you declare your css
.modal {
 position: absolute;
}
// our React component
const ModalDialog = () => {
 return (
 <div className="modal">
 some additional info
 </div>
 )
}
```

Və budur! Məzmun artıq sənədin əsas yerləşimindən çıxarılıb və yuxarıda görünür. İndi isə sadəcə onu düzgün şəkildə yerləşdirmək üçün `top` və `left` CSS xüsusiyyətlərinə uyğun dəyərlər vermək lazımdır.

Əgər dialoqu ekranın ortasında yerləşdirmək istəsəm, bunun üçün CSS təxminən belə görünərdi:

```tsx
.modal {
 position: absolute;
 width: 300px;
 top: 100px;
 left: 50%;
 margin-left: -150px;
}
```

Bu dialoq ekranın ortasında görünəcək, yuxarıdan isə 100px boşluq qalacaq.

Interactive example and full code
https://advanced-react.com/examples/13/01

Texniki baxımdan bu işləyir. Amma əgər proqramınızdakı mövcud dialoqlara və ya hər hansı UI kitabxanasına baxsanız, orada `position: absolute` istifadə olunması çox da mümkün deyil. Hətta tooltips, açılan menyular (dropdown) və ya digər “pop-up” elementlərdə də bu yanaşma demək olar ki, tətbiq edilmir.

Bunun səbəbləri var.

Absolute, əslində, o qədər də “absolute” deyil

Əvvəlcə onu qeyd edək ki, `absolute` mövqeyi tam olaraq mütləq deyil. O, əslində nisbidir: ən yaxın `position` təyin olunmuş elementə nisbətən işləyir. Bizim nümunədə bu təsadüfən düzgün işləyir — çünki modal dialoq ilə tətbiqin kök elementi arasında heç bir `position` verilmiş element yoxdur.

Əgər dialoq `position: relative` (və ya `sticky`, yaxud `absolute`) təyin olunmuş bir `div` daxilində render olunarsa və həmin `div` səhifənin ortasında olmazsa, onda hər şey pozular. Modal ekranın ortasında yox, məhz həmin `div`in ortasında yerləşəcək.

!image.png

Interactive example and full code
https://advanced-react.com/examples/13/02

Deməli, ekrana nisbətən yerləşdirilməsi nəzərdə tutulan elementlər üçün `absolute` ən yaxşı seçim deyil. Bəli, bunu hesablamaq mümkündür, amma təkcə CSS ilə deyil.

Bəs tooltip və ya açılan menyu (dropdown) kimi elementlər necə? Onlardan gözlədiyimiz budur ki, onlar çıxdıqları elementə nisbətən yerləşsinlər, elə deyilmi? Bu halda `absolute`-un “nisbi” olması əslində əladır: sadəcə `offsetLeft` və `offsetTop` dəyərlərini götürərək həmin trigger elementlə valideyn arasındakı məsafəni hesablaya bilərik və nəticədə dialoq/tooltip/menyu həmişə trigger-ə nisbətən düzgün yerləşəcək.

Texniki olaraq, bəli, bu işləyir.

Ta ki **Stacking Context** qaydaları işə düşənə qədər.

**Stacking Context-i anlamaq**

`Stacking Context` anlayışı, yerləşdirilmiş elementlərdə `z-index` istifadə etməyə çalışan hər kəs üçün əsl kabus ola bilər. Stacking Context HTML elementlərinə üçölçülü baxış bucağı gətirir. Yəni, bizim standart X və Y ölçülərinə (pəncərənin eni və hündürlüyü) əlavə olaraq bir də Z oxu mövcuddur. Bu Z oxu ekranda elementlər render olunarkən hansının digərlərinin üstündə, hansının isə altında görünəcəyini müəyyənləşdirir.

Məsələn, əgər bir elementin kölgəsi (shadow) varsa və həmin kölgə ətrafdakı elementlərin üzərinə düşürsə, o zaman bu kölgə onların üstündə göstərilməlidir, yoxsa altında? Bunun cavabını `Stacking Context` qaydaları müəyyən edir.

Stacking Context-in susmaya görə (default) qaydaları isə kifayət qədər mürəkkəbdir. Normalda elementlər DOM-da yerləşmə sırasına görə üst-üstə yığılırlar. Məsələn, belə bir kodda:

```tsx
<div>grey</div>
<div>red</div>
<div>green</div>
```

Yaşıl `div` qırmızıdan sonra gəldiyi üçün `Stacking Context` qaydalarına görə “ön tərəfdə” görünəcək, qırmızı isə boz rəngin qarşısında olacaq. Əgər onlara kiçik mənfi margin əlavə etsək, belə bir mənzərə görəcəyik:

!image.png

`position: absolute` və ya `position: relative` təyin olunmuş elementlər isə həmişə irəli çəkilirlər. Məsələn, əgər qırmızı `div`-ə sadəcə `position: relative` versəm, onda yaşıl dərhal onun altında görünəcək.

```tsx
<div style={{ position: "relative" }}>red</div>
<div>green</div>
```

!image.png

Bizim `absolute` mövqeləndirilmiş dialoq üçün bu o deməkdir ki, əgər o qırmızı `div` daxilindədirsə və `position` təyin olunubsa, hər şey qaydasında olacaq və dialoq hər şeyin üstündə görünəcək.

Amma əgər dialoq boz `div` daxilindədirsə, o zaman qırmızı `div` dialoqun üstündə olacaq.

!image.png

Bəli, tam olaraq belədir. `z-index` eyni `Stacking Context` daxilində elementlərin ön və arxa planda necə yerləşəcəyini idarə etməyə imkan verir. Susmaya görə `z-index` dəyəri `auto` olur (element öz stacking context-ini yaratmır).

- Mənfi dəyər (`z-index: -1` və s.) elementin digər elementlərin arxasında qalmasını təmin edir.
- Müsbət dəyər (`z-index: 10` və s.) isə elementin digər elementlərin üzərində görünməsini təmin edir.

Beləliklə, `absolute` və ya `relative` mövqeləndirilmiş elementlər üçün `z-index` düzgün təyin etmək vacibdir ki, dialoqlar və pop-up elementlər gözlənilən ardıcıllıqla göstərilsin.

!image.png

Əsas məsələ odur ki, bu bütün eyni `Stacking Context` daxilində işləyir. Əgər bir element yeni `Stacking Context` yaradırsa, onun `z-index` dəyəri artıq yeni kontekstə nisbətən hesablanacaq. Yəni, tamamilə izolyasiya olunmuş bir baloncuk yaranır. Yeni `Stacking Context` valideyn kontekstinin qaydaları ilə öz-özünə idarə olunan bir “qara qutu” kimi olur və içində baş verənlər yalnız o kontekst daxilində qalır.

Məsələn, eyni elementdə `position` və `z-index` birləşməsi yeni `Stacking Context` yaradır. Bizim rəngli `div`lər nümunəsinə baxsaq: əgər boz `div`ə `position: relative; z-index: 1`, qırmızı `div`ə isə `position: relative; z-index: 2` versəm, hər ikisi öz `Stacking Context`-lərinin valideyni olacaq.

Nəticədə, boz `div` və içindəkilər qırmızı `div`in altında qalacaq, hətta bizim modal dialoq da daxil olmaqla. Dialoqun `z-index`-ini 9999 kimi sehrli bir dəyərə dəyişsək belə, fərqi olmayacaq — dialoq hələ də qırmızı `div`in altında görünəcək.

!image.png

Kod nümunəsində boz `div`-in `z-index`-i ilə oynayın; bu, həqiqətən çox maraqlıdır. Əgər onu silsəm, yeni `Stacking Context` yox olur və dialoq artıq qlobal kontekstin bir hissəsi olur, onun qaydalarına tabe olur və qırmızı `div`in üstündə görünməyə başlayır.

Amma boz `div`-ə qırmızı `div`dən kiçik bir `z-index` əlavə etsəm, dialoq yenidən onun altında qalır.

Və bu yalnız `position` və `z-index` birləşməsi ilə baş vermir. Məsələn, `transform` xüsusiyyəti də eyni effekti yarada bilər. Bu o deməkdir ki, qalan CSS animasiyalarınız yerləşdirilmiş elementləri qarışdıra bilər. Eyni şey Flex və Grid daxilində `z-index` üçün də keçərlidir, eləcə də bir çox digər CSS xüsusiyyətləri.

Interactive example and full code
https://advanced-react.com/examples/13/03

Və əlbəttə, overflow xüsusiyyətinə malik elementləri də unutmayaq. Yalnız `overflow` təyin etmək yetərli deyil — `absolute` mövqeləndirilmiş `div`i kəsmək üçün onu `position: relative` ilə birlikdə istifadə etmək lazımdır.

Beləliklə, əgər `absolute` mövqeləndirilmiş dialoq overflow və position təyin olunmuş bir `div` daxilində render olunarsa, o, həmin konteyner tərəfindən kəsiləcək (clipped) və yalnız konteynerin görünən hissəsində qalacaq.

!image.png

Interactive example and full code
https://advanced-react.com/examples/13/04

Bütün bunlarla bağlı nə isə edə bilərikmi? Bəli, əlbəttə. Tam yox, amma qismən həll mümkündür. Ən azından overflow problemini çox qısa zamanda düzəldə bilərik.

**Position: fixed – Overflow-dan qaçış**

Normal sənəd axınından çıxmaq üçün istifadə edə biləcəyimiz başqa bir `position` dəyəri də var: `fixed`. Bu, `absolute`-a oxşardır, amma elementləri valideynlərinə nisbətən yox, viewport-a nisbətən yerləşdirir. Ekranın ortasında görünməsi lazım olan modal dialoq üçün bu dəyər çox faydalıdır, çünki valideynlərdən asılı deyil.

Bundan əlavə, ekran nisbətində yerləşdiyi üçün `fixed` overflow tələsindən də qaçmağa imkan verir. Nəzəri olaraq, bunu dialoqlar və tooltip-lər üçün istifadə edə bilərdik.

Amma, unutmayaq ki, `position: fixed` belə `Stacking Context` qaydalarından qaça bilmir. Heç nə qaça bilmir. Bu, bir növ “qara dəlik” kimidir: bir dəfə yaranırsa, onun cazibə sahəsindəki hər şey içində qalır, heç kim çıxa bilmir.

Məsələn, əgər boz `div`-in `z-index: 1` və qırmızı `div`-in `z-index: 2` varsa, modallar üçün iş bitdi — onlar qırmızı `div`in altında görünəcək.

!image.png

Interactive example and full code
https://advanced-react.com/examples/13/05

`Position: fixed` ilə bağlı başqa bir məsələ isə budur ki, o həmişə viewport-a nisbətən yerləşmir. Əslində, o, **Containing Block** adlanan bir elementə nisbətən yerləşir. Çox vaxt təsadüfən viewport olur, amma valideynlərdən bəzilərinə müəyyən CSS xüsusiyyətləri tətbiq olunubsa, element həmin valideynə nisbətən yerləşdiriləcək. Bu zaman yenidən `position: absolute` ilə başladığımız vəziyyətlə qarşılaşırıq.

`Position: fixed` üçün yeni **Containing Block** yaradan xüsusiyyətlər nisbətən nadirdir, amma bunlara `transform` da daxildir — və bu xüsusiyyət animasiyalarda geniş istifadə olunur.

**Stacking Context real tətbiqlərdə**

Bütün bunlar əyləncəli olsa da, bir az nəzəridir. Bəs Stacking Context tələsi real tətbiqlərdə baş verə bilərmi? Əlbəttə! Hətta çox asanlıqla.

Ən çox problem yaradanlar müxtəlif animasiyalar və ya “sticky” bloklar, məsələn header-lər və sütunlar olur. Bu elementlərdə çox vaxt `position` ilə birlikdə `z-index` və ya `translate` istifadə etməyə məcbur oluruq və nəticədə yeni `Stacking Context` yaranır.

Sevdiyiniz populyar vebsaytlarda bunu yoxlaya bilərsiniz: Chrome DevTools-u açın, DOM-un dərinliyində bir blok seçin, ona `position: fixed` və yüksək `z-index` verin və biraz hərəkət etdirin. Mən yoxladım: Facebook, Airbnb, Gmail, OpenAI və LinkedIn-də əsas sahədə belə tələlər var — hər hansı bir blok `position: fixed` və `z-index: 9999` ilə olsa belə, sticky header-in altında qalır.

Bu tələdən çıxmağın yeganə yolu odur ki, modal dialoq həmin Stacking Context yaradan DOM elementləri daxilində render olunmasın. React olmayan dünyada bunu belə edərdik: modalı birbaşa `body`-yə və ya tətbiqin kökündəki `div`-ə əlavə etmək. Məsələn:

```tsx
const modalDialog = ... // get the dialog where the button is
//clicked
document.getElementByClassName('body')[0].appendChild(modalDialog);
```

React-da biz bu **Stacking Context tələsindən** `Portal` adlı vasitə ilə qaça bilərik. Nəhayət, React zamanı gəldi!

**React Portal bunun necə həll edir**

Tələ yaratmaq üçün sadəcə rəngli `div`lərdən istifadə etmək əvəzinə, kodumuzu daha realist etmək üçün maraqlı bir nümunə yaradaq. Sonra isə bu problemi tam həll edək.

Çox sadə bir tətbiq edək:

- `position: sticky` olan bir header
- Sol tərəfdə “collapsible” naviqasiya
- Əsas sahədə isə modal dialoq

Portal vasitəsilə modalı DOM-un kökündə render edərək bütün `Stacking Context` problemlərindən qaça bilərik.

```tsx
const App = () => {
 const [isVisible, setIsVisible] = useState(false);
 return (
 <>
 <div className="header"></div>
 <div className="layout">
 <div className="sidebar">// some links here</div>
 <div className="main">
 <button onClick={() => setIsVisible(true)}>
 show more
 </button>
 {isVisible && <ModalDialog />}
 </div>
 </div>
 </>
 );
};
```

Header-i **sticky** etmək üçün ona `position: sticky` təyin edəcəyik:

```tsx
.header {
 position: sticky;
}
```

Və mən istəyirəm ki, naviqasiya **“collapsed”** vəziyyətə hamar şəkildə keçsin, heç bir sıçrayış və ya blokların yox olması olmadan. Buna görə həm naviqasiyaya, həm də əsas sahəyə `transition` xüsusiyyətini təyin edəcəyik:

```tsx
.main {
 transition: all 0.3s ease-in;
}
.sidebar {
 transition: all 0.3s ease-in;
}
```

Və naviqasiya **collapsed** olduqda onu sola sürüşdürmək, genişləndikdə isə geri qaytarmaq üçün `transform: translateX` xüsusiyyətindən istifadə edəcəyik:

```tsx
const App = () => {
 // hold navigation state here
 const [isNavExpanded, setIsNavExpanded] = useState(true);
 return (
 <>
 <div className="header"></div>
 <div className="layout">
 <div
 className="sidebar"
 // translate the nav to the left if collapsed, and back
 style={{
 transform: isNavExpanded
 ? 'translate(0, 0)'
 : 'translate(-300px, 0)',
 }}
 >
 ...
 </div>
 <div
 className="main"
 // translate the main to the left if nav is collapsed,
//and back
 style={{
 transform: isNavExpanded
 ? 'translate(0, 0)'
 : 'translate(-300px, 0)',
 }}
 >
 {/*main here*/}
 </div>
 </div>
 </>
 );
};
```

Bu artıq gözəl işləyir, amma bir məsələ var: skrol etdikdə header sidebar və əsas sahənin altında görünür. Bu problem deyil, necə həll edəcəyimizi artıq bilirik: sadəcə header-ə `z-index: 2` vermək kifayətdir. İş bitdi! İndi header həmişə üst tərəfdə görünür və expand/collapse funksiyası mükəmməl işləyir.

```tsx
Interactive example and full code
https://advanced-react.com/examples/13/06
```

Amma bir məsələ var: əsas sahədəki modal dialoq indi tamamilə pozulub. Əvvəllər ekranın ortasında yerləşirdi, amma artıq yox. Həmçinin, dialoq açıq vəziyyətdə skrol edərkən header-in altında görünür. Koddakı hər şey məntiqlidir, heç bir təsadüfi `position: relative` yoxdur, amma yenə də bu baş verdi — **Stacking Context tələsi**.

Bunu düzəltmək üçün modal dialoqu **əsas sahənin xaricində render** etməliyik. Sadə tətbiqimizdə onu komponentin sonunda yerləşdirmək olar: button, state və dialoq eyni komponentdədir. Amma real tətbiqlərdə bu o qədər də sadə deyil — çox vaxt button render ağacının dərinliyində olur və state-i yuxarıya ötürmək həm çətin, həm də performans üçün zərərli ola bilər. Context istifadə edə bilərik, amma onun da öz problemləri var.

Əvəzinə, React-in bizə verdiyi `createPortal` funksiyasından istifadə edə bilərik (texniki olaraq `react-dom` kitabxanasından, amma import yolundan başqa fərqi yoxdur). Bu funksiya iki arqument qəbul edir:

Biz nəyi “teleport” etmək istəyirik: bir **React Element** şəklində (`<ModalDialog />`).

Hara teleport etmək istəyirik: bir **DOM elementi** şəklində.

Vacib məqam: burada id yox, **öz DOM elementi** olmalıdır. Bunun üçün JavaScript biliklərimizi bir az təzələməli olacağıq və belə bir kod yazmalıyıq:

```jsx
document.getElementById("root")

```

```tsx
import { createPortal } from 'react-dom';
const App = () => {
 return (
 <>
 ... // the rest of the code with the button
 {isVisible &&
 createPortal(
 <ModalDialog />,
 document.getElementById('root'),
 )}
 </>
 );
};
```

Beləliklə, tələ artıq yoxdur! Biz hələ də developer təcrübəsi baxımından dialoqu button ilə birlikdə **render** edirik, amma nəticədə o `id="root"` olan elementin içində yerləşir. Chrome Developer Tools-u açsanız, onu oranın tam aşağı hissəsində görə bilərsiniz.

Interactive example and full code
https://advanced-react.com/examples/13/07

**React lifecycle, re-renderlər, Context və Portallar**

React baxımından, bu modal dialoq `<ModalDialog />` elementini yaratmış komponentin render ağacının bir hissəsidir. Bizim nümunədə bu `App` komponentidir.

- Əgər `App` komponentini yenidən render etsəm, onun içində render olunmuş bütün komponentlər də yenidən render olunacaq, açıq olan dialoq da daxil.
- Əgər `App` Context-ə çıxış imkanı varsa, dialoq da tam olaraq eyni Context-ə çıxış əldə edəcək.
- Əgər dialoqun yaradıldığı app hissəsi unmount olarsa, dialoq da yox olacaq.
- Modalda baş verən klik hadisəsini ələ keçirmək istəyirəmsə, `main` div-dəki `onClick` handler bunu edə bilər. Buradakı “click” React-in **synthetic events**inə aiddir, yəni onlar React ağacı üzrə “bubble” olur, normal DOM ağacı üzrə deyil. Eyni prinsip React tərəfindən idarə olunan digər synthetic event-lər üçün də keçərlidir.

Interactive example and full code
https://advanced-react.com/examples/13/08

**CSS, native JavaScript, form submit və Portallar**

DOM baxımından, bu dialoq artıq “main” tətbiqin bir hissəsi deyil. Buna görə DOM-a bağlı bütün davranışlar dəyişir.

Məsələn: əgər dialoqu “main” hissədəki CSS inheritance və cascading vasitəsilə stil verməyə çalışırsınızsa, bu artıq işləməyəcək. Dialoq artıq ayrı bir yerə teleport olunduğu üçün valideynin CSS qaydaları ona təsir etməyəcək.

```tsx
// won't work with portalled modal
.main .dialog {
 background: red;
}
```

Əgər “native” event-lərin yayılmasına (propagation) güvənirsinizsə, bu da işləməyəcək. Yəni, əgər `main` div-dəki `onClick` callback əvəzinə, modalda baş verən hadisələri `element.addEventListener` vasitəsilə tutmağa çalışsanız, bu işləməyəcək. Portalla modal artıq DOM-un başqa yerində yerləşdiyi üçün belə native event-lər əsas div-ə “bubble” olmayacaq.

```tsx
const App = () => {
 const ref = useRef(null);
 useEffect(() => {
 const el = ref.current;
 el.addEventListener("click", () => {
 // trying to catch events, originated in the portalled modal
  // not going to work!!
 });
 }, []);
 // the rest of the app
 return <div ref={ref} ... />
}
```

Əgər modalın valideynini `parentElement` vasitəsilə əldə etməyə çalışsanız, o, artıq **root div**-i qaytaracaq, `main` tətbiqi yox. Eyni vəziyyət DOM elementləri üzərində işləyən digər native JavaScript funksiyaları üçün də keçərlidir.

Və nəhayət, `<form>` elementindəki `onSubmit`. Bu ən az gözə çarpan məsələdir. İlk baxışda `onClick`-lə eyni kimi görünür, amma əslində submit hadisəsi React tərəfindən idarə olunmur — bu native API və DOM hadisəsidir.

Məsələn, əgər tətbiqin əsas hissəsini `<form>` ilə sarırsınızsa, dialoq içindəki button-lara klik etmək **submit** hadisəsini tetikleməyəcək! DOM baxımından, həmin button-lar artıq formun xaricindədir.

Əgər dialoq içində form istifadə etmək və `onSubmit` callback-ə güvənmək istəyirsinizsə, `<form>` tag-i dialoqun içində olmalıdır.

Interactive example and full code
https://advanced-react.com/examples/13/09

**Əsas məqamlar**

CSS və Portallar haqqında kifayət qədər danışdıq. Elementləri yerləşdirərkən yadda saxlamağa dəyər bəzi vacib nüanslar:

- `position: absolute` elementi **valideynin position-a** nisbətən yerləşdirir.
- `position: fixed` elementi **viewport-a** nisbətən yerləşdirir, əgər yeni Containing Block yaranmayıbsa.
- `position: absolute` elementləri `overflow: hidden` olan konteynerin içində **kəsilə** bilər.
- `position: fixed` elementləri `overflow: hidden` problemindən qaça bilər, amma **Stacking Context**dən qaça bilməz.
- **Stacking Context-dən heç nə qaça bilmir**. Tələdə qalsanız, iş bitdi.
- Stacking Context aşağıdakı hallarla yaranır: `position` və `z-index` təyin etmək, `translate` tətbiq etmək və digər bir çox xüsusiyyətlər.
- **Portallar** modal dialoqlar kimi elementləri mövcud DOM mövqelərinin xaricində render etməyə imkan verir ki, Stacking Context onları tutsun deyə problem yaranmasın.

**Portallar istifadə edərkən qaydalar:**

- React daxilində baş verənlər React ağacı daxilində qalır.
- React xaricində baş verənlər isə DOM strukturu qaydalarına tabe olur.

# Fəsil 14. Client tərəfində data çəkmə və performans

React-də performans yalnız re-render-lərlə bağlı deyil. Əsas data-nı çəkmək iki saniyə çəkirsə, instant re-render-lər sizə kömək etməyəcək. Və ya səhifə data çəkilərkən o qədər “qarışıq” görünürsə ki, istifadəçilər üçün baş ağrısı yaradırsa — bütün UI elementləri hərəkət edir, spinner-lar fırlanır — bu da performans problemini göstərir.

Frontend dünyasında data çəkmək çətindir və təəssüf ki, React istisna deyil.

Son zamanlar data fetching-in son vəziyyətini başa düşməyə çalışdınızmı? Sonsuz data idarəetmə kitabxanalarının kaosu, GraphQL və ya GraphQL deyil, useEffect-in zərəri (çünki waterfalls yaradır), Suspense bütün dünyanı xilas etməlidir, amma bu kitab yayımlandığı zaman hələ rəsmi olaraq data fetching üçün hazır deyil. Və sonra fetch-on-render, fetch-then-render, render-as-you-fetch kimi pattern-lər var ki, hətta bu mövzuda yazan insanları da çaşdırır. Bəs nələr baş verir? Sadə bir GET sorğusu etmək üçün niyə birdən PhD tələb olunur?

React-də data çəkməyin “doğru” yolu nədir? Bu fəsildə öyrənəcəksiniz:

- Frontend-də data fetching növləri.
- Yalnız sadə fetch istifadə etmək mümkündürmü?
- “Performant” tətbiq nə deməkdir?
- Data çəkmədə brauzer məhdudiyyətləri nələrdir?
- Request waterfalls nədir və necə yaranır?
- Request waterfalls probleminin bir neçə həlli.

**Data fetching növləri**

Ümumiyyətlə, müasir frontend dünyasında “data fetching” anlayışını iki kateqoriyaya ayırmaq olar: **initial data fetching** və **data fetching on demand**.

- **Data on demand** — istifadəçi səhifə ilə qarşılıqlı əlaqədə olduqda çəkilən datadır, istifadəçi təcrübəsini yeniləmək üçün istifadə olunur. Bütün autocomplete-lər, dinamik formalar və axtarış funksiyaları bu kateqoriyaya daxildir. React-də bu data adətən callback-lərdə çəkilir.
- **Initial data** — səhifəni açanda dərhal görməyinizi gözlədiyiniz datadır. Bu, komponent ekran üzərinə gəlmədən əvvəl çəkilməli olan datadır. İstifadəçiyə mümkün qədər tez mənalı bir təcrübə göstərmək üçün lazımdır. React-də SSR (Server-Side Rendering) yoxdursa, bu data adətən `useEffect` (class komponentlərdə `componentDidMount`) vasitəsilə çəkilir.
    
    Qeyd etmək maraqlıdır ki, bu anlayışlar tam fərqli görünsə də, data fetching-in əsas prinsipləri və fundamental pattern-ləri hər iki kateqoriya üçün eynidir. Lakin **initial data fetching** əksər hallarda ən vacib mərhələdir. Bu mərhələdə istifadəçilərin tətbiqiniz haqqında ilk təəssüratı — “çox yavaş” və ya “çox sürətli” — formalaşır.d
    
    Buna görə də fəsilin qalan hissəsi yalnız initial data fetching-ə və onun performans yönümlü düzgün icrasına fokuslanacaq.
    

**React-də data çəkmək üçün həqiqətən xarici kitabxanaya ehtiyac varmı?**

Əvvəlcə bir şeyi qeyd edək: React-də data fetching üçün xarici kitabxanalar — bəli yox?

Qısa cavab: **xeyr də, bəli də.** Bu, sizin istifadə halınıza bağlıdır. Əgər sadəcə bir dəfə az miqdarda data çəkmək və sonra unutmaq istəyirsinizsə, xarici kitabxanaya ehtiyac yoxdur. `useEffect` hook-u içində sadə bir `fetch` kifayət edir:

```tsx
const Component = () => {
 const [data, setData] = useState();
 useEffect(() => {
 // fetch data
 const dataFetch = async () => {
 const data = await (
 await fetch(
 'https://run.mocky.io/v3/b3bcb9d2-d8e9-43c5-bfb7-
0062c85be6f9',
 )
 ).json();
 // set state when the data received
 setData(data);
 };
 dataFetch();
 }, []);
 return <>...</>;
};
```

Amma istifadə halınız “bir dəfə fetch et və unut” səviyyəsindən çıxanda, çətin suallarla üzləşəcəksiniz:

- Error handling necə olacaq?
- Eyni endpoint-dən bir neçə komponent data çəkmək istəyirsə nə etməliyəm?
- Bu datanı cache-ləməliyəm? Nə qədər müddət üçün?
- Race condition-lər necə idarə olunacaq?
- Komponenti ekrandan çıxarmaq istəsəm, bu request-i ləğv etməliyəm?
- Memory leak problemləri necə həll olunacaq? və s.

Bu siyahıdakı heç bir sual React-ə xas deyil; bu, şəbəkə üzərindən data çəkməyin ümumi problemidir. Bu problemləri həll etmək üçün yalnız iki yol var:

1. Təkərini yenidən ixtira etmək və çoxlu kod yazmaq.
2. İllərlə bu işi görmüş mövcud kitabxanalara güvənmək.

Məsələn, **Axios** bəzi məsələləri abstraktlaşdırır, məsələn request-lərin ləğvi, amma React-ə xas API haqqında fikir bildirmir. **SWR** isə demək olar ki, hər şeyi idarə edir, cache daxil olmaqla.

Amma texnologiya seçimi burada çox önəmli deyil. Heç bir kitabxana və ya Suspense tək başına tətbiqinizin performansını artırmayacaq. Sadəcə bəzi işləri asanlaşdırır, bəzilərini isə çətinləşdirir. Performant tətbiqlər yazmaq üçün data fetching-in əsas prinsiplərini, data orkestrasiya pattern-lərini və texnikalarını başa düşmək həmişə vacibdir.

**“Performant” React tətbiqi nədir?**

Konkret pattern-lərə və kod nümunələrinə keçməzdən əvvəl, gəlin bir tətbiqin “performance” anlayışı haqqında danışaq. Bir tətbiqin “performant” olub-olmadığını necə bilmək olar?

Sadə bir komponent üçün bu nisbətən asandır: render-in nə qədər vaxt aldığını ölçürsünüz. Kiçik rəqəm o qədər “performant” (yəni sürətli) olduğunu göstərir.

Amma async əməliyyatlarla, yəni data fetching ilə və böyük tətbiqlər və istifadəçi təcrübəsi kontekstində bu o qədər də aydın deyil.

Tutaq ki, bir issue tracker üçün issue view tətbiq edirik. Sol tərəfdə linklərlə sidebar navigation, mərkəzdə əsas issue məlumatları — başlıq, təsvir, təyin olunan şəxs və altında şərhlər bölməsi olacaq.

!image.png

Tutaq ki, tətbiq üç fərqli şəkildə implementasiya olunub:

1. Bütün data yüklənənə qədər loading state göstərir, sonra hamısını bir anda render edir. Təxminən **3 saniyə** çəkir.
2. Sidebar data yüklənənə qədər loading state göstərir, sonra sidebar render olunur və əsas hissə üçün loading davam edir. Sidebar görünməsi təxminən **1 saniyə**, tətbiqin qalan hissəsi isə təxminən **3 saniyə** çəkir. Ümumilikdə **4 saniyə**.
3. Əsas issue data yüklənənə qədər loading state göstərir, sonra onu render edir, sidebar və şərhlər üçün loading davam edir. Sidebar yükləndikdə render olunur, şərhlər hələ loading state-dədir. Əsas hissə təxminən **2 saniyə**, sidebar ondan sonra **1 saniyə**, şərhlər isə əlavə **2 saniyə** sonra görünür. Ümumilikdə **5 saniyə**.

Interactive example and full code for the App 1
https://advanced-react.com/examples/14/01

Interactive example and full code for the App 2
https://advanced-react.com/examples/14/02
Interactive example and full code for the App 3
https://advanced-react.com/examples/14/03

Burada hansı tətbiq ən performatlıdır? Cavab əlbəttə ki, bir qədər mürəkkəbdir və ən performatlı app sizin seçdiyiniz app deyil, bəlkə də… heç biri. Və ya hamısı. Yoxsa hər hansı biri. Bu, kontekstdən asılıdır.

- **Birinci app** yalnız 3 saniyəyə yüklənir — rəqəmsal baxımdan ən sürətlidir. Amma istifadəçilərə bu 3 saniyə ərzində heç nə göstərmir — yəni vizual təcrübə baxımından ən zəifdir.
- **İkinci app** yan menyunu yalnız 1 saniyəyə göstərir. İstifadəçiyə mümkün qədər tez bir şey göstərmək baxımından ən yaxşıdır. Amma əsas məlumatın göstərilməsi üçün ən uzun müddət çəkir.
- **Üçüncü app** əvvəlcə əsas Issue məlumatını göstərir. Əsas hissəni birinci göstərmək baxımından yaxşıdır. Amma soldan sağa oxunan dillər üçün “təbii” məlumat axını pozulur, və təcrübə daha “qarışıq” olur. Üstəlik, ümumi yüklənmə müddəti də ən uzundur.

Nəticə: Hər şey istifadəçiyə hansı mesajı vermək istədiyinizdən asılıdır. Özünüzü bir nağılçı kimi düşünün, tətbiq isə sizin hekayənizdir. Hekayənin ən vacib hissəsi nədir? İkinci vacib hissəsi nədir? Hekayənin axını varmı? Hekayəni hissələrə bölərək təqdim etmək istəyirsiniz, yoxsa istifadəçilərin bütün hekayəni dərhal, aralıq mərhələlər olmadan görməsini istəyirsiniz?

Sadəcə və yalnız hekayənizin necə görünməli olduğunu anladığınız zaman tətbiqi qurub hekayəni mümkün qədər sürətli etmək vaxtıdır. Və həqiqi güc burada müxtəlif kitabxanalardan, GraphQL-dən və ya Suspense-dən deyil, aşağıdakı biliklərdən gəlir:

- Data çəkməyə nə vaxt başlamaq düzgündür?
- Data çəkmə prosesi gedərkən nə edə bilərik?
- Data çəkmə tamamlandıqda nə etməliyik?
- Data fetching-in bu üç mərhələsini idarə etməyə imkan verən bir neçə texnikanı bilmək.

Amma faktiki texnikalara keçməzdən əvvəl iki çox fundamental şeyi başa düşməliyik: **React lifecycle** və **brauzer resursları**, həmçinin onların məqsədimizə təsiri.

**React lifecycle və data fetching**

Data fetching strategiyanızı planlayarkən ən vacib bilmək və yadda saxlamaq lazım olan şey, React komponentinin **lifecycle**-ının nə vaxt işə düşdüyüdür.

3-cü fəsildə conditional rendering-i müzakirə etmişdik. Elementlərin prop-lar vasitəsilə konfiqurasiyası da önəmlidir, amma bunu burada da xatırlatmaq faydalıdır.

Məsələn, aşağıdakı kod nümunəsinə baxın:

```tsx
const Child = () => {
 useEffect(() => {
 // do something here, like fetching data for the Child
 }, []);
 return <div>Some child</div>;
};
const Parent = () => {
 // set loading to true initially
 const [isLoading, setIsLoading] = useState(true);
  if (isLoading) return 'loading';
 return <Child />;
};
```

Bizdə **Parent** komponenti var, hansı ki state-ə əsaslanaraq **Child** komponentini şərti olaraq render edir.

Sual: **Child**-ın `useEffect`-i və oradakı fetch request işə düşəcəkmi?

İntuitiv cavab doğrudur — **işə düşməyəcək**. Yalnız **Parent**-ın `isLoading` state-i `false`-a dəyişdikdən sonra **Child** render olunacaq və onun bütün effect-ləri işə düşəcək.

Parent üçün aşağıdakı kod nümunəsi haqqında nə demək olar:

```tsx
const Parent = () => {
 // set loading to true initially
 const [isLoading, setIsLoading] = useState(true);
 // child is now here! before return
 const child = <Child />;
 if (isLoading) return 'loading';
 return child;
};
```

Funksionallıq eynidir: `isLoading` `false`-a təyin olunubsa, **Child** göstərilir, əks halda loading state göstərilir. Amma bu dəfə `<Child />` elementi `if` şərtindən əvvəldir. Sual: bu dəfə **Child**-ın `useEffect`-i işə düşəcəkmi?

Cavab daha az intuitivdir, amma yenə eynidir — **işə düşməyəcək**.

`const child = <Child />` yazanda biz **Child** komponentini "render" etmirik. `<Child />` yalnız gələcək bir elementin təsvirini yaradan sintaksis şəkəridir. Bu təsvir yalnız real render ağacına daxil olduqda — yəni komponentdən return olunduqda — render olunur. O vaxta qədər sadəcə obyekt kimi oturur və heç nə etmir.

Əlbəttə, React lifecycle haqqında daha çox şey bilmək lazımdır: bütün trigger-ların sırası, nə paint-dən əvvəl və ya sonra işə düşür, nə nələri ləngidir, `useLayoutEffect` hook-u və s. Amma bunlar yalnız hər şeyi mükəmməl orkestrlədikdən sonra və çox böyük, mürəkkəb tətbiqlərdə millisaniyələr üçün yarışarkən əhəmiyyətli olur.

**Brauzer məhdudiyyətləri və data fetching**

Bu nöqtədə düşünə bilərsiniz:

*"Vay, bu çox mürəkkəbdir. Niyə bütün request-ləri mümkün qədər tez göndərməyək, məlumatı qlobal store-a yığıb hazır olduqda istifadə etməyək? Lifecycle və orchestration ilə niyə məşğul olmalıyıq?"*

Bunu başa düşürəm. Sadə tətbiqlərdə və yalnız bir neçə request-lə işləyirsinizsə, əlbəttə ki, bu yanaşma işləyə bilər. Amma böyük tətbiqlərdə, onlarla data fetching request-ləri ola bilər və bu strategiya əks təsir göstərə bilər. Burada server yükündən danışmırıq; fərz edək ki, server bu yükü qaldıra bilir. Problem brauzerdədir.

Bildinizmi ki, brauzerlərin eyni host-a paralel göndərə biləcəyi request-lərin sayı məhduddur? HTTP1 istifadə edildiyi halda (hələ internetin ~70%-i), bu rəqəm çox böyük deyil. Məsələn, **Chrome**-da yalnız **6 request** paralel göndərilə bilər. Əgər daha çox request göndərsəniz, qalanları növbəyə alınır və ilk boş “slot” üçün gözləməli olurlar.

Və böyük bir tətbiqdə ilkin data fetching üçün 6 request heç də çox deyil. Bizim sadə “issue tracker” tətbiqimizdə artıq üç request var, və hələ heç bir dəyərli funksionallıq əlavə etməmişik. Təsəvvür edin ki, tətbiqin əvvəlində heç bir iş görməyən, amma bir qədər yavaş olan analytics request-i əlavə etsəniz, bütün istifadəçi təcrübəsini necə yavaşladacağını görəcəksiniz.

Bunu praktikada görmək istəyirsiniz? Ən sadə kod nümunəsi belədir:

```tsx
const App = () => {
 // I extracted fetching and useEffect into a hook
 const { data } = useData('/fetch-some-data');
 if (!data) return 'loading...';
 return <div>I'm an app</div>;
};
```

Tutaq ki, fetch request çox sürətlidir və yalnız ~50ms çəkir. Amma əgər tətbiqin əvvəlində **6 request** əlavə edilsə və hər biri **10 saniyə** çəkirsə, və onları gözləmədən və ya resolve etmədən göndərsək, bütün tətbiqin yüklənməsi həmin **10 saniyə** çəkəcək (əlbəttə, Chrome-da).

```tsx
// no waiting, no resolving, just fetch and drop it
fetch('https://some-url.com/url1');
fetch('https://some-url.com/url2');
fetch('https://some-url.com/url3');
fetch('https://some-url.com/url4');
fetch('https://some-url.com/url5');
fetch('https://some-url.com/url6');
const App = () => {
 ... same app code
}
```

Interactive example and full code
https://advanced-react.com/examples/14/04

**Request waterfalls: necə yaranır**

Nəhayət ciddi kod yazmaq vaxtıdır! İndi bütün lazım olan parçaları topladıq və onların necə uyğunlaşdığını bilirik, tətbiqimizin “issue tracking” hekayəsini yazmaq vaxtıdır. Gəlin fəsilin əvvəlindəki nümunələri tətbiq edək və nə mümkün olduğunu görək.

Əvvəlcə komponentləri yerləşdirək, sonra data fetching-i qoşaq. Tətbiqdə belə bir struktura sahib olacağıq:

- **App** komponenti: `Sidebar` və `Issue` komponentlərini render edir.
- **Issue** komponenti: `Comments` komponentini render edir.

```tsx
const App = () => {
 return (
 <>
 <Sidebar />
 <Issue />
 
 </>
 );
};
const Sidebar = () => {
 return; // some sidebar links
};
const Issue = () => {
 return (
 <>
 // some issue data
 <Comments />
 </>
 );
 
 };
const Comments = () => {
 return; // some issue comments
};
```

İndi data fetching-ə keçək. Əvvəlcə faktiki fetch, `useEffect` və state idarəsini **xüsusi bir hook**-a çıxaraq nümunələri sadələşdirək:

```tsx
export const useData = (url) => {
 const [state, setState] = useState();
 useEffect(() => {
 const dataFetch = async () => {
 const data = await (await fetch(url)).json();
 setState(data);
 };
 dataFetch();
 }, [url]);
 return { data: state };
};
```

Sonra təbii olaraq fetch request-lərini böyük komponentlərlə **yaxın yerləşdirmək** istərdim: məsələn, Issue komponentində issue məlumatı, Comments komponentində isə comments siyahısı. Və əlbəttə ki, gözləyərkən **loading state** göstərmək istəyərdim!

```tsx
const Comments = () => {
 // fetch is triggered in useEffect there, as normal
 const { data } = useData('/get-comments');
 // show loading state while waiting for the data
 if (!data) return 'loading';
  // rendering comments now that we have access to them!
 return data.map((comment) => <div>{comment.title}</div>);
};
```

Və eyni kodu **Issue** üçün tətbiq edirik, yalnız burada **loading tamamlandıqdan sonra Comments** komponenti render olunacaq:

```tsx
const Issue = () => {
 // fetch is triggered in useEffect there, as normal
 const { data } = useData('/get-issue');
 // show loading state while waiting for the data
 if (!data) return 'loading';
 // render actual issue now that the data is here!
 return (
 <div>
 <h3>{data.title}</h3>
 <p>{data.description}</p>
 <Comments />
 </div>
 );
};
```

Və tətbiqin özü belə görünəcək:

```tsx
const App = () => {
 // fetch is triggered in useEffect there, as normal
 const { data } = useData('/get-sidebar');
 // show loading state while waiting for the data
 if (!data) return 'loading';
 return (
 <>
 <Sidebar data={data} />
 <Issue />
 </>
 );
};
```

Hazırdır, iş bitdi!

Interactive example and full code
https://advanced-react.com/examples/14/05

Burada yalnız kiçik bir problem var: tətbiq **çox yavaşdır**. Hətta əvvəlki nümunələrimizdən də yavaşdır!

Burada etdiyimiz şey klassik **request waterfall**-ı tətbiq etməkdir.

React lifecycle hissəsini xatırlayın: yalnız faktiki return olunan komponentlər **mount**, **render** olunur və nəticədə `useEffect` və oradakı data fetching işə düşür.

Bizim nümunədə isə hər bir komponent **data gələnə qədər "loading" state** göstərir. Data gəldikdən sonra növbəti komponent render olunur, öz data fetching-ini işə salır, yenə "loading" göstərir və bu proses belə davam edir.

!image.png

Belə **waterfall-lar** tətbiqi mümkün qədər tez göstərmək istədiyiniz zaman ən yaxşı həll deyil. Xoşbəxtlikdən, onlarla məşğul olmağın bir neçə yolu var (amma Suspense bu halda kömək etmir, onun haqqında sonra danışacağıq).

**Request waterfall-ı necə həll etmək olar**

**Promise.all həlli**

İlk və ən asan həll yolu, bütün data-fetch request-lərini **render ağacında mümkün qədər yuxarıya çəkməkdir**. Bizim nümunədə bu, root komponentimiz olan **App**-dir.

Amma bir problem var: onları sadəcə “köçürə” bilməzsiniz və olduğu kimi buraxmaq olmaz. Məsələn, belə bir yanaşma işləməyəcək:

```tsx
useEffect(async () => {
 const sidebar = await fetch('/get-sidebar');
 const issue = await fetch('/get-issue');
 const comments = await fetch('/get-comments');
}, []);
```

Bu, sadəcə başqa bir **waterfall**-dır, amma bu dəfə tək komponentdə cəmlənib.

Biz sidebar məlumatını fetch edirik, gözləyirik, sonra issue fetch, yenə gözləyirik, sonra comments fetch, yenə gözləyirik. Bütün məlumatların render üçün hazır olma vaxtı **bütün gözləmə vaxtlarının cəmi** olacaq: 1s + 2s + 3s = 6 saniyə.

Əvəzində, onları **eyni anda göndərmək**, yəni paralel fetch etmək lazımdır. Bu halda, bütün request-lər üçün gözləmə müddəti **ən uzun request-in müddətindən** artıq olmayacaq: 3 saniyə. Yəni **50% performans artırımı!**

Bunu etmək üçün **Promise.all** istifadə etmək olar.

```tsx
useEffect(async () => {
 const [sidebar, issue, comments] = await Promise.all([
 fetch('/get-sidebar'),
 fetch('/get-issue'),
 fetch('/get-comments'),
 ]);
}, []);
```

Sonra bütün bu məlumatları **parent komponentin state**-inə saxlayırıq və onları **props** vasitəsilə child komponentlərə ötürürük:

```tsx
const useAllData = () => {
 const [sidebar, setSidebar] = useState();
 const [comments, setComments] = useState();
 const [issue, setIssue] = useState();
 useEffect(() => {
 const dataFetch = async () => {
 // waiting for allthethings in parallel
 const result = (
 await Promise.all([
 fetch(sidebarUrl),
 fetch(issueUrl),
 fetch(commentsUrl),
 ])
 ).map((r) => r.json());
 // and waiting a bit more - fetch API is cumbersome
 const [sidebarResult, issueResult, commentsResult] =
 await Promise.all(result);
 // when the data is ready, save it to state
 setSidebar(sidebarResult);
 setIssue(issueResult);
 setComments(commentsResult);
 };
 dataFetch();
 }, []);
 return { sidebar, comments, issue };
};
const App = () => {
 // all the fetches were triggered in parallel
 const { sidebar, comments, issue } = useAllData();
 // show loading state while waiting for all the data
 if (!sidebar || !comments || !issue) return 'loading';
  // render the actual app here and pass data from state to
//children
 return (
 <>
 <Sidebar data={state.sidebar} />
 <Issue
 comments={state.comments}
 issue={state.issue}
 />
 </>
 );
};
```

Interactive example and full code
https://advanced-react.com/examples/14/06

Beləliklə, bu, fəsilin əvvəlindəki testdəki **ilk tətbiqin** implementasiyasıdır.

!image.png

**Parallel promises həlli**

Amma bəs əgər **hamısını gözləmək istəmirsinizsə**? Məsələn, comments səhifənin ən yavaş və ən az vacib hissəsidir. Onları gözləyərkən sidebar-in render olunmasını bloklamaq çox mənalı deyil.

Bəs, bütün request-ləri **paralel göndərib**, onları **müstəqil olaraq** gözləyə bilərikmi?

Əlbəttə ki! Bunun üçün fetch-ləri `async/await` sintaksisindən çıxarıb, **klassik promise**-lərə çevirmək və məlumatları `then` callback-i daxilində saxlamaq kifayətdir:

```tsx
fetch('/get-sidebar')
 .then((data) => data.json())
 .then((data) => setSidebar(data));
fetch('/get-issue')
 .then((data) => data.json())
  .then((data) => setIssue(data));
fetch('/get-comments')
 .then((data) => data.json())
 .then((data) => setComments(data));
```

İndi hər bir fetch request **paralel işləyir**, amma **müstəqil olaraq resolve** olunur.

Və indi **App**-in renderində belə gözəl şeylər edə bilərik: Sidebar və Issue komponentlərini **onların məlumatları state-ə düşən kimi** render etmək:

```tsx
const App = () => {
 const { sidebar, issue, comments } = useAllData();
 // show loading state while waiting for sidebar
 if (!sidebar) return 'loading';
 // render sidebar as soon as its data is available
 // but show loading state instead of issue and comments while
//we're waiting for them
 return (
 <>
 <Sidebar data={sidebar} />
 {/*render local loading state for issue here if its data not
available*/}
 {/*inside Issue component we'd have to render 'loading' for
empty comments as well*/}
 {issue ? <Issue comments={comments} issue={issue} /> :
'loading''}
 </>
 )
}
```

Burada Sidebar, Issue və Comments komponentlərini **məlumatları mövcud olduqca** render edirik — bu, ilkin waterfall ilə eyni davranışdır.

Amma indi request-ləri **paralel göndərdiyimiz üçün**, ümumi gözləmə müddəti **6 saniyədən 3 saniyəyə** düşür. Beləliklə, tətbiqin performansını **xüsusi olaraq artırmış** olduq və davranışını dəyişdirmədik!

Interactive example and full code
https://advanced-react.com/examples/14/07

!image.png

Qeyd etmək lazımdır ki, bu həll yolunda **state dəyişiklikləri müstəqil olaraq üç dəfə** tetiklenir və bu, parent komponentin **üç dəfə re-render** olunmasına səbəb olur.

Tətbiqin yuxarı hissəsində baş verdiyi üçün belə **lazımsız re-render-lər** tətbiqin yarısının boşuna render olunmasına gətirə bilər. Performansa təsir, əlbəttə ki, komponentlərin sırası və ölçüsündən asılıdır, amma bunu nəzərə almaq vacibdir.

**Data provider-lər ilə fetching-i abstraktlaşdırmaq**

Yuxarıdakı nümunələrdə olduğu kimi data loading-i yuxarıya qaldırmaq performans üçün yaxşı olsa da, tətbiq arxitekturası və kod oxunaqlılığı üçün pisdir.

Birdən, əvvəlcə komponentlərlə yaxın yerləşən data fetch request-ləri əvəzinə, **hər şeyi fetch edən böyük bir komponent** və bütün tətbiqdə **geniş props drilling** yaranır.

Xoşbəxtlikdən, bunun sadə(ə qədər) bir həlli var: tətbiqə **data provider** anlayışını daxil etmək. Burada **data provider**, data fetching ətrafında bir abstraksiya olacaq və bizə məlumatı **tətbiqin bir yerində fetch edib, başqa bir yerində əldə etmək imkanı** verəcək, aradakı bütün komponentləri atlayaraq.

Əslində, bu hər request üçün kiçik bir **caching layer** kimidir. "Sade" React-də bu, sadəcə **context**-dir:

```tsx
const Context = React.createContext();
export const CommentsDataProvider = ({ children }) => {
 const [comments, setComments] = useState();
 useEffect(async () => {
 fetch('/get-comments')
 .then((data) => data.json())
 .then((data) => setComments(data));
 }, []);
 return (
 <Context.Provider value={comments}>
 {children}
 </Context.Provider>
 );
};
export const useComments = () => useContext(Context);
```

Eyni məntiq bütün **üç request** üçün tətbiq olunur. Və nəticədə bizim böyük **App** komponentimiz belə sadə bir formaya çevrilir:

```tsx
const App = () => {
 const sidebar = useSidebar();
 const issue = useIssue()
 // show loading state while waiting for sidebar
 if (!sidebar) return 'loading';
 // no more props drilling for any of those
 return (
 <>
 <Sidebar />
 {issue ? <Issue /> : 'loading''}
 </>
 )
}
```

Bizim üç provider **App komponentini wrap** edəcək və mount olunduğu kimi **fetch request-ləri paralel şəkildə** işə salacaq:

```tsx
export const VeryRootApp = () => {
 return (
 <SidebarDataProvider>
 <IssueDataProvider>
 <CommentsDataProvider>
 <App />
 </CommentsDataProvider>
 </IssueDataProvider>
 </SidebarDataProvider>
 );
};
```

Və sonra, məsələn **Comments** kimi komponentdə (yəni root app-dən çox, çox dərin render ağacında), biz sadəcə həmin məlumatı **data provider**-dən əldə edəcəyik:

```tsx
const Comments = () => {
 // Look! No props drilling!
 const comments = useComments();
};
```

Interactive example and full code
https://advanced-react.com/examples/14/08

Əgər **Context**-in böyük fanatı deyilsinizsə, narahat olmayın — eyni konsept seçdiyiniz hər hansı **state management** həlli ilə işləyəcək.

**React başlamazdan əvvəl data fetch etmək**

Waterfall-larla mübarizədə öyrəniləsi son bir hiylə var. Bu, çox vacibdir, çünki PR review-lərdə həmkarlarınızın bunu istifadə etməsinin qarşısını ala bilərsiniz. Demək istədiyim odur ki, bu **çox təhlükəli bir üsuldur**, ona görə də ağıllı istifadə edin.

Gəlin **Comments** komponentinə baxaq, ilk implementasiya etdiyimiz waterfall zamanı data **öz-özünə fetch edən** (getData hook-u içəriyə köçürmüşdüm) komponent:

```tsx
const Comments = () => {
 const [data, setData] = useState();
 useEffect(() => {
 const dataFetch = async () => {
 const data = await (
 await fetch('/get-comments')
 ).json();
 setData(data);
 };
 dataFetch();
 }, [url]);
 if (!data) return 'loading';
 return data.map((comment) => <div>{comment.title}</div>);
};
```

Orada 6-cı sətrə **xüsusi diqqət yetirin**. `fetch('/getcomments')` nədir? Bu, sadəcə **await** etdiyimiz bir promise-dir, useEffect içərisində. Bu halda React-in heç bir xüsusiyyətindən asılı deyil — nə props, nə state, nə də daxili dəyişənlər.

Bəs, əgər onu **Comments komponentini elan etməzdən əvvəl**, yəni çox yuxarıya köçürsək, və sonra useEffect içərisində sadəcə həmin promise-i await etsək, nə baş verəcək?

```tsx
const commentsPromise = fetch('/get-comments');
const Comments = () => {
 useEffect(() => {
 const dataFetch = async () => {
 // just await the variable here
 const data = await (await commentsPromise).json();
 setState(data);
 };
 dataFetch();
 }, [url]);
};
```

Çox maraqlı bir məqam: bizim fetch çağırışımız əslində **bütün React lifecycle-dan "qaçır"** və səhifədə JavaScript yüklənən kimi işə düşür, **useEffect** hələ heç bir yerdə çağırılmamışdan əvvəl. Hətta root App komponentindəki ilk request-dən əvvəl.

Bu çağırış işləyəcək, JavaScript isə digər işləri icra etməyə davam edəcək, və data **sakitcə gözləyəcək** ki, kimsə onu həqiqətən resolve etsin — yəni bizim Comments komponentindəki useEffect-də etdiyimiz kimi.

Xatırlayırsınızsa, əvvəlki **waterfall şəkilimiz**?

!image.png

Sadəcə **fetch çağırışını Comments komponentindən çıxarmaq** belə bir nəticə verdi:

!image.png

Interactive example and full code
https://advanced-react.com/examples/14/09

Texniki baxımdan, bütün promise-ləri komponentlərin xaricinə çıxarsaydıq, **waterfall** problemi həll olunardı və fetch-ləri yuxarı qaldırmaq və ya data provider-lərlə məşğul olmaq lazım olmazdı.

Bəs niyə bunu etmədik və niyə bu, çox yayılmış bir pattern deyil?

Sadədir. **Browser-ların məhdudiyyətlərini** xatırlayın: paralel olaraq yalnız 6 request göndərmək mümkündür, növbəti request isə **queue**-ya düşür. Belə fetch-lər dərhal və tamamilə nəzarətsiz işləyəcək.

Bir komponent nadir hallarda render olunursa və ağır data fetch edirsə, ənənəvi waterfall yanaşmasında heç kəsi narahat etməz. Amma bu hack ilə, o, **kritik ilkin data fetch-lərinin qiymətli millisekundlarını oğurlaya bilər**. Və təxmin etmək çətindir ki, ekranın heç bir yerində görünməyən bir komponent bütün app-i necə ləngidə bilər.

Bu pattern üçün mənim ağlıma gələn yalnız iki “legit” istifadə halları var:

1. **Router səviyyəsində bəzi kritik resursların pre-fetch edilməsi** — burada data mümkün qədər tez fetch olunmalıdır və onun kritik olduğunu bilirsiniz.
2. **Lazy-loaded komponentlərdə data pre-fetch** — burada JavaScript yalnız render tree-yə düşəndə yüklənir və icra olunur, yəni bütün kritik data artıq fetch olunub render edilib. Bu səbəbdən təhlükəsizdir.

Əgər data fetch etmək üçün kitabxanalardan istifadə etsəm nə olar?

İndiyə qədər bütün kod nümunələrində yalnız **native fetch** istifadə etmişəm. Bu məqsədli idi: React-də **əsas data fetch nümunələrini** göstərmək istədim və bunlar **kitabxanadan asılı deyil**. İstifadə etdiyiniz və ya istifadə etmək istədiyiniz hər hansı kitabxanadan asılı olmayaraq, **waterfall prinsipi** və React lifecycle daxilində və ya xaricində data fetch etmə qaydası eyni qalır.

**React-dan asılı olmayan** kitabxanalar, məsələn, **Axios**, sadəcə fetch ilə bağlı mürəkkəblikləri gizlədir, başqa bir şey etmir. Kod nümunələrində bütün fetch-ləri `axios.get` ilə əvəz etsək də, nəticə eyni olacaq.

**React-ə inteqrasiya olunmuş** kitabxanalar (hooks və query-tipli API-larla), məsələn, **swr**, əlavə olaraq `useCallback`, state, error handling və caching kimi məsələləri də sadələşdirir. Beləliklə, hələ də istehsalata hazır olmaq üçün çox iş tələb edən bu kod yığınına ehtiyac qalmır:

```tsx
const Comments = () => {
 const [data, setData] = useState();
 useEffect(() => {
 const dataFetch = async () => {
 const data = await (
 await fetch('/get-comments')
 ).json();
 setState(data);
 };
 dataFetch();
 }, [url]);
 // the rest of comments code
};
```

**swr** istifadə edərək bunu sadəcə belə yaza bilərəm:

```tsx
const Comments = () => {
 const { data } = useSWR('/get-comments', fetcher);
 // the rest of comments code
};
```

Əslində, bütün bunların hamısı **useEffect** və ya ekvivalentindən istifadə edərək data fetch edir və state-i yeniləyir, bu da host komponentin yenidən render olunmasını tetikləir.

Suspense haqqında nə demək olar?

React-də data fetch mövzusunu **Suspense**-i ən azından qeyd etmədən başa çatdırmaq mümkün deyil. Bəs Suspense necədir? Yaxşı, heç nə. Kitabın nəşr olunduğu vaxtda, **Suspense for data fetching** hələ sənədləşdirilməmiş bir xüsusiyyət idi və React tərəfindən rəsmi olaraq dəstəklənmir və ya tövsiyə olunmur. Yalnız Next.js kimi opinionated framework-lərdə istifadə etmək mümkündür.

!image.png

Beləliklə, əgər siz həmin framework-lərdən birini istifadə edirsinizsə, Suspense ilə data fetch etməyi öyrənmək üçün onların sənədlərinə baxmalısınız.

Amma təsəvvür edin ki, sabah Suspense ümumi istifadə üçün əlçatan olsun. Bu, data fetching-i fundamental olaraq həll edəcək və yuxarıda danışılanları köhnəldəcəkmi? Heç də yox.

Suspense sadəcə **loading state-lərlə əlləşməyi** əvəz edən, ağıllı və cəlbedici bir üsuldur. Məsələn, bu yerinə:

```tsx
const Comments = ({ commments }) => {
 if (!comments) return 'loading';
 // render comments
};
```

biz həmin **loading state**-i yuxarı qaldırıb bunu edirik:

```tsx
const Issue = () => {
 return (
 <>
 {/*issue data*/}
 <Suspense fallback="loading">
 <Comments />
 </Suspense>
 </>
 );
};
```

Digər hər şey, məsələn, brauzerin məhdudiyyətləri, React həyat dövrü və request waterfalls-ın təbiəti, olduğu kimi qalır.

**Əsas məqamlar**

Frontend-də data fetch etmək mürəkkəb bir mövzudur. Bəlkə bu barədə ayrıca bir kitab belə yazıla bilər. Növbəti fəsildə data fetch etməyi davam etdirəcəyik və race condition-lardan danışacağıq. Amma bu fəsildən götürüləcək əsas məqamlar:

- Müştəri tərəfdə data fetch etməni iki geniş kateqoriyaya ayıra bilərik: ilkin (initial) və tələb əsasında (on demand).
- Data fetching kitabxanalarından istifadə etmək əvəzinə sadə `fetch` istifadə edə bilərik, amma bir çox məsələləri özümüz manuel olaraq idarə etməli olacağıq.
- "Performant" app subyektivdir və istifadəçilərə vermək istədiyimiz mesaja bağlıdır.
- Data fetch edərkən, xüsusilə ilkin mərhələdə, brauzerin paralel request-lərə qoyduğu məhdudiyyətləri nəzərə almalıyıq.
- Waterfall-lar, data fetch etməni paralel deyil, şərti və ya ardıcıl şəkildə trigger etdikdə yaranır.
- Waterfall-lardan qaçmaq üçün `Promise.all`, paralel promises və ya Context ilə data provider texnikalarından istifadə edə bilərik.
- Reakt başlamazdan əvvəl kritik resursları pre-fetch edə bilərik, amma bunu edərkən brauzerin məhdudiyyətlərini nəzərə almalıyıq.

# Fəsil 15. Data fetch etmə və **race condition-lar**

Frontend-də data fetch edərkən digər böyük və ayrıca fəsil tələb edən mövzu **race condition-lardır**. Bunlar gündəlik həyatımızda nisbətən nadir rast gəlinir və kifayət qədər mürəkkəb tətbiqlər hazırlayanda belə onlarla üzləşməmək mümkündür. Amma baş verdikdə, onları araşdırmaq və düzəltmək həqiqətən çətin ola bilər. JavaScript-də `fetch` və ya digər asinxron əməliyyatlar çox vaxt sadəcə Promise olduğu üçün, bu fəsilin əsas diqqət nöqtəsi Promiselər olacaq.

Bu fəsildə öyrənəcəyimiz mövzular:

- Promiselər nədir və necə görünüşcə təhlükəsiz kodlar gözlənilmədən race condition yarada bilər.
- Race condition-ların yaranma səbəbləri.
- Onları ən azı dörd fərqli üsulla necə düzəltmək olar.

Promise nədir?

Race condition-lara keçmədən əvvəl Promise-lərin nə olduğunu və niyə onlara ehtiyacımız olduğunu xatırlayaq.

Əsasən, Promise bir… **söz və ya vəd** kimidir. JavaScript kodu adətən sinxron şəkildə, yəni addım-addım icra edir. Promise isə icranı **asinxron** həyata keçirməyin ən az sayda yollarından biridir. Promise ilə bir tapşırığı işə sala və dərhal növbəti addıma keçə bilərik, tapşırığın bitməsini gözləmədən. Promise isə vəd edir ki, tapşırıq bitdikdə bizə xəbər verəcək — və həqiqətən də belə edir, çox etibarlıdır.

Promise-lərin ən vacib və geniş istifadə olunan hallardan biri **data fetch etməkdir**. Əsas `fetch` çağırışı olsun, ya Axios kimi bir abstraksiya, Promise davranışı eynidir.

Kod baxımından sadəcə belə görünür:

```tsx
console.log('first step'); // will log FIRST
fetch('/some-url') // create promise here
 .then(() => {
 // wait for Promise to be done
 // log stuff after the promise is done
 console.log('second step'); // will log THIRD (if successful)
 })
 .catch(() => {
 console.log('something bad happened'); // will log THIRD (if
error happens)
 });
console.log('third step'); // will log SECOND
```

Əsasən axın belədir: `fetch('/some-url')` ilə bir promise yaradırsınız və nəticə gələndə `.then` blokunda nə isə edirsiniz, səhv baş verərsə `.catch` blokunda onu idarə edirsiniz.

Əlbəttə, promise-ləri tam mənimsəmək üçün bir neçə əlavə detal var, amma bu axının əsas prinsipi qalan fəsli anlamaq üçün kifayətdir.

!image.png

Promise-lərin ən maraqlı tərəflərindən biri onlardan yaranan race condition-lardır. Bu hissə üçün, kodun dərinliyinə getməzdən əvvəl təcrübə etmək üçün çox sadə bir app yaratdım.

Interactive example and full code
https://advanced-react.com/examples/15/01

App-ın sol tərəfində tablar sütunu var. Tablar arasında keçid edərkən fetch request göndərilir və nəticədə gələn data sağ tərəfdə render olunur. Əgər tablar arasında sürətlə keçid etsək, istifadəçi təcrübəsi pis olur: məzmun yanıb-sönür və data təsadüfi görünür — bəzən ilk tabın məzmunu görünür, sonra sürətlə ikinci tabın məzmunu ilə əvəz olunur, bəzən isə müəyyən bir “carousel” effekti yaranır. Hər şey qəribə davranır.

Bu app-ın implementasiyası təxminən belədir: iki komponentimiz var. Biri root App komponentidir, hansı ki aktiv “page” state-in idarəsini aparır və navigasiya düymələrini və faktiki Page komponentini render edir.

```tsx
const App = () => {
 const [page, setPage] = useState('1');
 return (
 <>
 {/*left column buttons*/}
 <button onClick={() => setPage('1')}>Issue 1</button>
 <button onClick={() => setPage('2')}>Issue 2</button>
 {/*the actual content*/}
 <Page id={page} />
 </>
 );
};
```

Page komponenti aktiv səhifənin `id`-sini prop olaraq qəbul edir, həmin səhifənin datasını əldə etmək üçün fetch request göndərir və sonra nəticəni render edir. Sadələşdirilmiş implementasiya (loading state olmadan) belə görünür:

```tsx
const Page = ({ id }: { id: string }) => {
 const [data, setData] = useState({});
 // pass id to fetch relevant data
 const url = `/some-url/${id}`;
 useEffect(() => {
 fetch(url)
 .then((r) => r.json())
 .then((r) => {
 // save data from fetch request to state
 setData(r);
 });
 }, [url]);
 // render data
 return (
 <>
 <h2>{data.title}</h2>
 <p>{data.description}</p>
 </>
 );
};
```

`id` ilə hansı URL-dən data fetch edəcəyimizi müəyyən edirik. Sonra `useEffect` içində fetch request göndəririk və nəticəni state-də saxlayırıq — hər şey standartdır.

Race condition və qəribə davranış burada yaranır ki, istifadəçi tab-lar arasında çox sürətlə keçid edirsə, əvvəlki fetch hələ tamamlanmamış ola bilər, sonra yeni fetch işə düşür. Promise-lər tamamlandıqca state-i yeniləyir, amma tamamlanma sırası istifadəçinin gördüyü aktiv tab ilə uyğun gəlmir. Nəticədə səhifədə data qarışır, əvvəlki tab-in məzmunu sonra yeni tab-in məzmunu ilə əvəz olunur — göz qırpımında “blink” və ya qarışıq görünən nəticələr yaranır.

Bütün səbəb iki məqamdan ibarətdir: Promise-lərin təbiəti və React həyat dövrü (lifecycle).

Lifecycle baxımından belə baş verir:

1. `App` komponenti mount olunur.
2. `Page` komponenti default prop dəyəri `"1"` ilə mount olunur.
3. `Page` komponentindəki `useEffect` ilk dəfə işə düşür.

Sonra Promise-lərin təbiəti işə girir:

- `useEffect` içindəki `fetch` promise-dir, yəni asinxron əməliyyatdır.
- Əsl request göndərilir, React isə nəticəni gözləmədən normal işinə davam edir.
- Təxminən 2 saniyə sonra request tamamlanır, promise-in `.then` callback-i işə düşür, içində `setData` çağırılır və data state-də saxlanılır. `Page` komponenti yenilənir və ekranda görünür.

Əgər hər şey render olunduqdan sonra istifadəçi navigation düyməsini klikləyərsə, belə olur:

1. `App` komponenti state-i başqa page-ə dəyişir.
2. State dəyişməsi `App` komponentinin yenidən render olunmasına səbəb olur.

Buna görə də:

- `Page` komponenti də yenidən render olunacaq.
- `Page` komponentindəki `useEffect` `id`ə bağlıdır, `id` dəyişib, `useEffect` yenidən işə düşür.
- `useEffect` içindəki `fetch` yeni `id` ilə işə düşür, təxminən 2 saniyə sonra `setData` çağırılır, `Page` komponenti yenilənir və ekranda yeni data görünür.

!image.png

Amma nə baş verir əgər siz navigasiya düyməsini klikləyib `id`-ni dəyişdirirsiniz və ilk fetch hələ tamamlanmayıb? Maraqlı bir vəziyyət yaranır:

1. `App` komponenti `Page` komponentini yenidən render edir.
2. `useEffect` yenidən işə düşür (`id` dəyişib!).
3. Yeni `fetch` çağırılır və React adi qaydada işləməyə davam edir.
4. Sonra, ilk fetch tamamlanır. Hələ də eyni `Page` komponentinin `setData` referansına sahibdir.
5. İlk fetch tamamlandıqdan sonra `setData` çağırılır, `Page` komponenti özünü ilk fetch-in datası ilə yeniləyir.
6. Daha sonra ikinci fetch tamamlanır. O da eyni `setData` referansına malikdir və `Page` komponentini yenidən ikinci fetch-in datası ilə yeniləyir.

Nəticədə, race condition yaranır: yeni səhifəyə keçdikdən sonra əvvəlcə bir flash görürük — əvvəlcə ilk fetch-in datası göstərilir, sonra isə ikinci fetch-in datası ilə əvəz olunur.

!image.png

Bu effekt daha da maraqlıdır əgər ikinci fetch, birincidən əvvəl tamamlanırsa. O zaman əvvəlcə növbəti səhifənin düzgün məzmununu görürük, amma sonra o, əvvəlki səhifənin səhv məzmunu ilə əvəz olunur.

!image.png

Bu davranışı aşağıdakı nümunədə görə bilərsiniz. İlk dəfə hər şey yüklənənə qədər gözləyin, sonra ikinci səhifəyə keçin və tez bir zamanda yenidən ilk səhifəyə qayıdın.

Interactive example and full code
https://advanced-react.com/examples/15/02

Bu tamamilə təhlükəlidir: kod sadə görünür, amma tətbiq pozulub. Bunu necə həll etmək olar?

Race condition-ları həll etmək: komponentin **yenidən mount** olunmasını təmin etmək

İlk həll həqiqətən tam həll sayılmır, daha çox izahatdır ki, bu race condition-lar niyə əslində çox vaxt baş vermir və niyə adi səhifə naviqasiyası zamanı onları görmürük. Tutaq ki, yuxarıdakı implementasiya əvəzinə belə bir şeyimiz var:

```tsx
const App = () => {
 const [page, setPage] = useState('issue');
 return (
 <>
 {page === 'issue' && <Issue />}
 {page === 'about' && <About />}
 </>
 );
};
```

Props ötürülmür, `Issue` və `About` komponentlərinin özünəməxsus URL-ləri var və onlar həmin URL-dən data fetch edirlər. Data fetch prosesi yenə `useEffect` hook-da baş verir, əvvəlki kimi:

```tsx
const About = () => {
 const [about, setAbout] = useState();
 useEffect(() => {
 fetch("/some-url-for-about-page")
 .then((r) => r.json())
 .then((r) => setAbout(r));
 }, []);
 ...
}
```

Bu dəfə app-də navigation zamanı heç bir race condition baş vermir. İstədiyiniz qədər və sürətlə keçid edin: app normal şəkildə işləyir.

Interactive example and full code
https://advanced-react.com/examples/15/03

Niyə? Cavab buradadır: `{page === 'issue' && <Issue />}`. Issue və About səhifələri page dəyəri dəyişdikdə **re-render** olunmur, onlar **re-mount** olunur. Dəyər `issue`-dan `about`-a dəyişəndə:

- Issue komponenti **unmount** olunur,
- About komponenti onun yerinə **mount** olunur.

Fetch baxımından baş verənlər belədir:

1. App komponenti ilk render olunur və Issue komponenti mount olunur, data fetching işə düşür.
2. Fetch hələ davam edərkən növbəti səhifəyə keçəndə App komponenti Issue səhifəsini unmount edir və About komponentini mount edir, onun öz data fetching-i işə düşür.

Və React komponenti **unmount** etdikdə, demək ki, o komponent tamamilə yox olur. Ekrandan itir, heç kim ona əl gədə bilmir, içində baş verən hər şey, o cümlədən state, itir.

Bunu əvvəlki kodla müqayisə edin: `<Page id={page} />`. Bu Page komponenti heç vaxt unmount olunmurdu. Sadəcə onu və onun state-ni təkrar istifadə edirdik.

Unmouting vəziyyətinə qayıdaq: Issue komponentinin fetch request-i About səhifəsindəykən bitərsə, Issue komponentinin `.then` callback-i `setIssue` state-ini çağırmağa çalışacaq. Amma komponent artıq yoxdur. React baxımından o mövcud deyil. Beləliklə, promise sadəcə yox olur və əldə etdiyi data boşluğa itir.

!image.png

Yeri gəlmişkən, “**Can't perform a React state update on an unmounted component**” qorxulu xəbərdarlığını xatırlayırsınız? Bu xəbərdarlıq məhz belə situasiyalarda yaranırdı: asinxron əməliyyat (məsələn, data fetch) komponent artıq yox olduqdan sonra bitəndə. “Keçmişdə”, çünki bu xəbərdarlıq artıq silinib, yenilənmiş React versiyalarında yoxdur.

Nəzəri cəhətdən, bu davranış original app-dəki race condition-u həll etmək üçün istifadə oluna bilər: sadəcə Page komponentinin navigation zamanı **yenidən mount** olunmasını təmin etmək kifayətdir. Bunun üçün React-də **`key` atributu** istifadə edə bilərik:

```tsx
<Page id={page} key={page} />
```

Bildiğimiz kimi, **Fəsil 6: Diffing və reconciliation-ə dərindən baxış**-dan, elementin `"key"`-ini dəyişmək React-i məcbur edir ki, köhnə `"key"`-ə malik elementi silsin və yeni `"key"`-ə malik elementi mount etsin, hətta onların tipi eyni olsa belə.

Lakin, bu, ümumi race condition problemlərini həll etmək üçün tövsiyə edilən bir üsul deyil. Bir neçə ciddi məqam var: performans zərər görə bilər, focus və state ilə bağlı gözlənilməz səhvlər, render tree boyunca useEffect-lərin gözlənilməz tetiklenməsi. Yəni, bu problemi sadəcə “altına süpürmək” kimidir.

Race condition-larla daha düzgün mübarizə üsulları mövcuddur (aşağıya baxın). Amma diqqətlə istifadə olunarsa, bəzi hallarda arsenalınızda istifadə edilə biləcək bir alət ola bilər.

Race condition-ları həll etməyin daha yumşaq yolu, Page komponentini tamamilə silmək əvəzinə, `.then` callback-də gələn nəticənin hazırda aktiv olan `id` ilə uyğun gəldiyinə əmin olmaqdır.

Əgər nəticə URL-i yaratmaq üçün istifadə olunan `id`-yə uyğundursa, onu saxlaya bilərik. Uyğunsuzdursa, sadəcə ignor edirik.

Buradakı hiylə, React həyat dövründən çıxmaq və lokal funksiyalarda saxlanılan məlumatı istifadə edərək, useEffect-in bütün iterasiyalarında, hətta “stale” olanlarda belə, ən son `id`-yə çıxış əldə etməkdir. Bunun üçün **Refs** istifadə olunur — Fəsil 9-da Refs: məlumat saxlamaqdan imperative API-yə keçid mövzusunda bunu müzakirə etmişdik.

```tsx
const Page = ({ id }) => {
 // create ref
 const ref = useRef(id);
 useEffect(() => {
 // update ref value with the latest id
 ref.current = id;
 fetch(`/some-data-url/${id}`)
 .then((r) => r.json())
 .then((r) => {
 // compare the latest id with the result
 // only update state if the result actually belongs to
//that id
 if (ref.current === r.id) {
 setData(r);
 }
 });
 }, [id]);
};
```

Interactive example and full code
https://advanced-react.com/examples/15/04

Əgər nəticələr heç bir etibarlı identifikator qaytarmırsa, problem deyil — biz sadəcə URL-i müqayisə edə bilərik.

```tsx
const Page = ({ id }) => {
 // create ref
 const ref = useRef(id);
 useEffect(() => {
 // update ref value with the latest url
 ref.current = url;
 fetch(`/some-data-url/${id}`).then((result) => {
 // compare the latest url with the result's url
 // only update state if the result actually belongs to that
 // url
 if (result.url === ref.current) {
 result.json().then((r) => {
 setData(r);
 });
 }
 });
 }, [url]);
};
```

Interactive example and full code
https://advanced-react.com/examples/15/05

Race condition-ları düzəltmək: bütün əvvəlki nəticələri ləğv etmək

Əvvəlki həlli bəyənmirsinizsə və ya ref istifadə etmək qəribə görünürsə, problem deyil — başqa bir yol var. `useEffect`-in “cleanup” adlı bir funksiyası mövcuddur, burada abunəliklər kimi şeyləri təmizləyə bilərik. Bizim halda isə bu, aktiv fetch request-ləri olacaq.

Sintaksis belə görünür:

```tsx
// normal useEffect
useEffect(() => {
 // "cleanup" function - function that is returned in useEffect
 return () => {
 // clean something up here
 };
 // dependency - useEffect will be triggered every time url has
//changed
}, [url]);
```

`cleanup` funksiyası komponent unmount edildikdən sonra və ya hər re-render zamanı, dəyişmiş dependencies-dən əvvəl çalışır. Beləliklə, re-render zamanı əməliyyatların sırası belə olacaq:

1. URL dəyişir
2. `cleanup` funksiyası işə düşür
3. `useEffect`in əsas məzmunu işə düşür

Bu, JavaScript-in funksiyaları və closures təbiəti ilə birlikdə bizə imkan verir ki, belə bir şey edə bilək:

```tsx
useEffect(() => {
 // local variable for useEffect's run
 let isActive = true;
 // do fetch here
 return () => {
 // local variable from above
 isActive = false;
 };
}, [url]);
```

Biz `isActive` adlı lokal boolean dəyişəni təqdim edirik və `useEffect` işə düşəndə onu `true`, `cleanup` funksiyası işə düşəndə isə `false` edirik. `useEffect`-dəki funksiya hər re-render zamanı yenidən yaradılır, buna görə də sonuncu `useEffect` işə düşdükdə `isActive` həmişə `true` olacaq. Amma! `cleanup` funksiyası, əvvəl işə düşən, hələ köhnə closure-un scope-nuna çıxışa malikdir və onu `false`-a təyin edəcək. Bu JavaScript closures-in necə işlədiyini göstərir.

`fetch` Promise-i asinxron olmasına baxmayaraq, yalnız həmin closure daxilində mövcuddur və yalnız o `useEffect`-i başladan lokal dəyişənlərə çıxışı var. `.then` callback-də `isActive`-i yoxladığımız zaman yalnız sonuncu iş, hələ cleanup-lənməmiş olan, `true`-ya malik olacaq. Beləliklə, indi yalnız aktiv closure-da olub-olmadığımızı yoxlamaq kifayətdir: əgər aktivdirsə, state-i yeniləyirik; əks halda heç nə etmirik. Data sadəcə "void"-a yox olur.

```tsx
useEffect(() => {
 // set this closure to "active"
 let isActive = true;
 fetch(`/some-data-url/${id}`)
 .then((r) => r.json())
 .then((r) => {
 // if the closure is active - update state
 if (isActive) {
 setData(r);
 }
 });
 return () => {
 // set this closure to not active before next re-render
 isActive = false;
 };
}, [id]);
```

Interactive example and full code
https://advanced-react.com/examples/15/06

Daha sadə və ağrısız yanaşma: əvvəlki bütün request-ləri **cancel** etmək. Əgər onlar heç vaxt tamamlanmazsa, state-i köhnə data ilə yeniləməyə çalışmayacaq və race condition yaranmayacaq.

Bunu etmək üçün `AbortController` interfeysindən istifadə edə bilərik.

Məsələn:

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`/some-url`, { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      if (err.name === 'AbortError') {
        // Request cancel edilib, narahat olma
        return;
      }
      // Digər error-ları handle et
      console.error(err);
    });

  return () => {
    // Cleanup zamanı request-i cancel et
    controller.abort();
  };
}, [url]);

```

Beləliklə:

- Hər re-render əvvəlki request-i dayandırır.
- `fetch` tamamlanmasa, `.then` içində state update baş vermir.
- Race condition-lar effektiv şəkildə aradan qaldırılır.

```tsx
useEffect(() => {
 // create controller here
 const controller = new AbortController();
 // pass controller as signal to fetch
 fetch(url, { signal: controller.signal })
 .then((r) => r.json())
 .then((r) => {
 setData(r);
 });
 return () => {
 // abort the request here
 controller.abort();
 };
}, [url]);
```

Tamamilə. `AbortController` istifadə etməklə yalnız **ən son sorğu** tamamlanıb state-i yeniləyə bilər.

Əsas məqamlar:

1. **Re-render zamanı ləğv** – Hər dəfə `useEffect`in dependency-ləri dəyişdikdə, cleanup funksiyası işləyir və əvvəlki sorğunu ləğv edir. Yalnız ən yeni sorğu tamamlanmağa icazə alır.
2. **Promise rejection** – Fetch-i ləğv etmək rejection yaradır. Əks halda, konsolda xəbərdarlıqlar və ya uncaught error-lar görünə bilər.
3. **Düzgün catch** – Həmişə `.catch` əlavə edin ki, rejection-ları idarə edə biləsiniz. Abort səhvlərini rahatlıqla atmaq üçün `err.name === 'AbortError'` yoxlaya bilərsiniz.
4. **Ümumi yaxşı təcrübə** – AbortController istifadə etməsəniz belə, promise rejection-larını idarə etmək tövsiyə olunur. Bu, gizli xətaların və gözlənilməz konsol xəbərdarlıqlarının qarşısını alır.

Bu yanaşma React-də async data fetching zamanı race condition-lardan qaçmaq üçün ən təmiz üsullardan biri hesab olunur.

```tsx
fetch(url, { signal: controller.signal })
 .then((r) => r.json())
 .then((r) => {
 setData(r)
  })
 .catch((error) => {
 // error because of AbortController
 if (error.name === 'AbortError') {
 // do nothing
 } else {
 // do something, it's a real error!
 }
 });
```

Interactive example and full code
https://advanced-react.com/examples/15/07

Async/await heç nəyi əsasən dəyişdirmir. Async/await sadəcə eyni Promises-i daha “oxunaqlı” yazmaq üsuludur.

Əsas məqamlar:

- **Execution flow** baxımından, async/await kodu daha sanki sinxron kimi görünür.
- Amma **asynchronous təbiəti** dəyişmir – fetch hələ də promise olaraq işləyir, React lifecycle və race condition-lar eyni qaydada qalır.

Yəni:

```jsx
fetch('/data').then(data => setData(data))

```

və

```jsx
const data = await fetch('/data');
setData(data);

```

Davranış baxımından eyni şeydir. Asinxron təbiət hələ də mövcuddur və cleanup, isActive yoxlaması və ya AbortController kimi üsullar hələ də lazımdır.

```tsx
fetch('/some-url')
 .then((r) => r.json())
 .then((r) => setData(r));
```

Biz belə yazardıq:

```tsx
const response = await fetch('/some-url');
const result = await response.json();
setData(result);
```

Eyni app, "ənənəvi" promises yerinə async/await istifadə edilərək implementasiya olunsa da, tam olaraq eyni race condition-a malik olacaq.

```tsx
Interactive example and full code
https://advanced-react.com/examples/15/08
```

Əsas məqamlar

Ümid edirəm ki, race condition-ların necə maraqlı və sadə göründüyünü gördünüz və onları asanlıqla aşkar edib qarşısını almağı öyrəndiniz. Son fəsildə isə "nəsə pis gedərsə nə etməli?" mövzusuyla inkişaf etmiş React nümunələrini yekunlaşdıracağıq. Amma əvvəlcə Promises və race condition-lar haqqında yadda saxlamalı olduğunuz bir neçə məsələ:

- Race condition, eyni React komponentində promise həll olunduqdan sonra state-i bir neçə dəfə yenilədikdə baş verə bilər.

```jsx
useEffect(() => {
 fetch(url)
 .then((r) => r.json())
 .then((r) => {
   // bu hissə race condition-lara həssasdır
   setData(r);
 });
}, [url]);

```

- Bunu aşağıdakı yollarla düzəldə bilərik:
    - Komponenti yenidən mount etmək, artıq lazım olmayan "köhnə" datanı atmaq.
    - Promise-i trigger edən dəyişənlə qaytarılan nəticəni müqayisə etmək və uyğun deyilsə state-i yeniləməmək.
    - useEffect-də clean-up funksiyası vasitəsilə son promise-i izləmək və bütün "köhnə" promise-lərin nəticəsini atmaq.
    - AbortController istifadə edərək bütün əvvəlki request-ləri ləğv etmək.

# Fəsil 16. React-də universal səhv idarəsi

Biz hamımız istəyirik ki, tətbiqlərimiz sabit işləsin, mükəmməl funksional olsun və mümkün olan bütün kənar halları idarə etsin, düzdür? Amma təəssüf ki, reallıq belədir ki, biz hamımız insanıq (ən azı mənim fərziyyəm budur), səhvlər edirik və “səhvsiz kod” adlı bir şey yoxdur. Neçə ehtiyatlı olmağımızdan və ya nə qədər avtomatlaşdırılmış test yazmağımızdan asılı olmayaraq, həmişə bir vəziyyət olacaq ki, hər şey fəlakətli şəkildə səhv gedəcək. İstifadəçi təcrübəsi baxımından vacib olan budur ki, bu fəlakətli hadisəni proqnozlaşdırasınız, onu mümkün qədər lokalizə edin və həqiqətən düzəldilə bilənə qədər onu zərif şəkildə idarə edin.

Son fəsildə gəlin React-də səhv idarəsini nəzərdən keçirək:

- Səhv baş verərsə nə edə bilərik.
- Səhv tutmağın fərqli yanaşmalarının çatışmazlıqları hansılardır.
- Onları necə azaltmaq olar.

Amma əvvəlcə əsas məsələ: React-də niyə səhvləri tutmaq üçün bir həll yolu olması həyati əhəmiyyətlidir?

Cavab sadədir: 16-cı versiyadan başlayaraq, React həyat dövründə atılan bir səhv dayandırılmasa, bütün tətbiqin unmount olunmasına səbəb olur. Ondan əvvəl isə, komponentlər ekran üzərində qalırdı, hətta pozulmuş və düzgün işləməyən olsa belə. İndi isə, UI-nin kiçik bir hissəsində baş verən tutulan səhvsiz bir səhv və ya sizin nəzarətinizdə olmayan xarici bir kitabxana, bütün səhifəni məhv edib hamı üçün boş ekran göstərməyə səbəb ola bilər.

Frontend inkişaf etdiriciləri heç vaxt bu qədər dağıdıcı gücə malik olmamışdılar!

**JavaScript-də səhvləri necə tutmağı xatırlamaq**

Adi JavaScript-də bu pis sürprizləri tutmaq üçün vasitələr kifayət qədər sadədir.

Bizdə qədim `try/catch` ifadəmiz var, özü-özünü izah edir: bir şey etməyə çalış, əgər uğursuz olarsa — səhvi tut və onu yüngülləşdirmək üçün bir şey et:

```tsx
try {
 // if we're doing something wrong, this might throw an error
 doSomething();
} catch (e) {
 // if error happened, catch it and do something with it without
//stopping the app
 // like sending this error to some logging service
}
```

Bu, eyni sintaksis ilə `async` funksiyalar üçün də işləyir:

```tsx
try {
 await fetch('/bla-bla');
} catch (e) {
 // oh no, the fetch failed! We should do something about it!
}
```

Və ya, əgər köhnə üsul `Promise` istifadə ediriksə, onlar üçün xüsusi `catch` metodu var. Beləliklə, əvvəlki `fetch` nümunəsini `promise` əsaslı API ilə yenidən yazsaq, bu şəkildə görünəcək:

```tsx
fetch('/bla-bla')
.then((result) => {
 // if a promise is successful, the result will be here
 // we can do something useful with it
 })
 .catch((e) => {
 // oh no, the fetch failed! We should do something about it!
 });
```

Eyni konseptdir, sadəcə tətbiq üsulu bir az fərqlidir, buna görə də fəsilin qalan hissəsində bütün xətalar üçün sadəcə `try/catch` sintaksisini istifadə edəcəyəm.

React-də sadə `try/catch`: necə və nələrə diqqət etmək lazımdır

Xəta tutulduqda, onunla bir şey etmək lazımdır, düzdür? Beləliklə, dəqiq desək, istifadəçilərimiz üçün nə edə bilərik? Sadəcə boş ekran və ya pozulmuş interfeys qoymaq istifadəçi üçün rahat deyil.

Ən aydın və intuitiv cavab, düzəlişi gözləyərkən bir şey göstərmək olar. Xoşbəxtlikdən, `catch` blokunda istədiyimiz hər şeyi edə bilərik, o cümlədən state-i yeniləmək. Beləliklə, bunu bu şəkildə edə bilərik:

```tsx
const SomeComponent = () => {
 const [hasError, setHasError] = useState(false);
 useEffect(() => {
 try {
 // do something like fetching some data
 } catch (e) {
 // oh no! the fetch failed, we have no data to render!
 setHasError(true);
 }
 });
  // something happened during fetch, lets render some nice error
//screen
 if (hasError) return <SomeErrorScreen />;
 // all's good, data is here, let's render it
 return <SomeComponentContent {...datasomething} />;
};
```

Biz fetch request göndərməyə çalışırıq, əgər uğursuz olarsa — `error` state-i təyin edirik, və əgər `error` state-i true-dursa, istifadəçilər üçün əlavə məlumat (məsələn, dəstək nömrəsi) göstərən bir xəta ekranı render edirik.

Bu yanaşma olduqca sadədir və uğursuz fetch request-i tutmaq kimi sadə, proqnozlaşdırıla bilən və dar istifadə halları üçün mükəmməl işləyir.

Amma əgər bir komponentdə baş verə biləcək bütün xətaları tutmaq istəyirsinizsə, bəzi problemlərlə və ciddi məhdudiyyətlərlə üzləşəcəksiniz.

**Məhdudiyyət 1:** `useEffect` hook ilə çətinlik yaşayacaqsınız.

Əgər `useEffect`-i `try/catch` ilə əhatə etsək, sadəcə işləməyəcək:

```tsx
try {
 useEffect(() => {
 throw new Error('Hulk smash!');
 }, []);
} catch (e) {
 // useEffect throws, but this will never be called
}
```

Bu baş verir, çünki `useEffect` render-dən sonra asinxron olaraq çağırılır, ona görə də `try/catch` baxımından hər şey uğurla başa çatmış kimi görünür. Bu, Hissə 15-də müzakirə etdiyimiz Promise-lərlə eyni hekayədir: əgər nəticəni gözləməsək, JavaScript öz işinə davam edəcək, Promise tamamlandıqda ona qayıdacaq və yalnız `useEffect` (və ya Promise-in `then`) içindəki kodu icra edəcək. `try/catch` bloku isə artıq icra olunub bitmiş olacaq.

`useEffect` içindəki xətaların tutulması üçün `try/catch`-i də həmin hook daxilində yerləşdirmək lazımdır:

```tsx
useEffect(() => {
 try {
 throw new Error('Hulk smash!');
 } catch (e) {
 // this one will be caught
 }
}, []);
```

Interactive example and full code
https://advanced-react.com/examples/16/01

Bu, `useEffect`-dən istifadə edən hər hansı hook-a və ya əslində hər hansı asinxron əməliyata aiddir. Nəticədə, hər şeyi əhatə edən bir `try/catch` əvəzinə, onu bir neçə blokaya bölmək lazımdır: hər hook üçün ayrıca.

Məhdudiyyət 2: child komponentlər.

`try/catch` child komponentlərdə baş verən heç bir xətanı tuta bilməyəcək. Belə edə bilməzsiniz:

```tsx
const Component = () => {
 let child;
 try {
 child = <Child />;
 } catch (e) {
 // useless for catching errors inside Child component, won't
//be triggered
 }
 return child;
};
```

ya da hətta belə

```tsx
const Component = () => {
 try {
 return <Child />;
 } catch (e) {
 // still useless for catching errors inside Child component,
// won't be triggered
 }
};
```

Interactive example and full code
https://advanced-react.com/examples/16/02

Bu, `<Child />` yazdığımız zaman əslində həmin komponenti render etmədiyimiz üçün baş verir. Biz sadəcə komponentin definisiyasını əks etdirən bir Element yaradırıq. Bu, komponentin tipi və props kimi sonradan React tərəfindən istifadə olunacaq lazımi məlumatları ehtiva edən obyekt kimi bir şeydir. React sonra əsl render-i icra edəcək. Biz bunu ətraflı olaraq Chapter 2 (Elements, children as props, and re-renders), Chapter 3 (Configuration concerns with elements as props) və Chapter 6 (Deep dive into diffing and reconciliation) bölmələrində müzakirə etmişdik.

Render, `try/catch` bloku uğurla icra edildikdən sonra baş verəcək — promises və `useEffect` hook ilə eyni hekayə.

**Məhdudiyyət 3: Render zamanı state dəyişdirmək olmaz**

Əgər `useEffect` və müxtəlif callback-lər xaricində (yəni komponent render zamanı) xətaları tutmağa çalışırsınızsa, onları düzgün idarə etmək artıq bir o qədər də asan deyil: render zamanı state update-lərinə icazə verilmir.

Məsələn, belə sadə bir kod error baş verərsə, sonsuz re-render dövrünə səbəb olacaq:

```tsx
const Component = () => {
 const [hasError, setHasError] = useState(false);
 try {
 doSomethingComplicated();
 } catch (e) {
 // don't do that! will cause infinite loop in case of an error
 // see codesandbox below with live example
 setHasError(true);
 }
};
```

Interactive example and full code
https://advanced-react.com/examples/16/03

Əlbəttə, burada state-i dəyişmək əvəzinə birbaşa error ekranını return edə bilərik:

```tsx
const Component = () => {
 try {
 doSomethingComplicated();
 } catch (e) {
 // this allowed
 return <SomeErrorScreen />;
 }
};
```

Amma, düşündüyünüz kimi, bu bir qədər əlverişsizdir və bizi səhvləri eyni komponentdə fərqli şəkildə idarə etməyə məcbur edir: useEffect və callback-lər üçün state, digər hallarda isə birbaşa return.

```tsx
// while it will work, it's super cumbersome and hard to maitain,
// don't do that
const SomeComponent = () => {
 const [hasError, setHasError] = useState(false);
 useEffect(() => {
 try {
 // do something like fetching some data
 } catch (e) {
 // can't just return in case of errors in useEffect or
// callbacks
 // so have to use state
 setHasError(true);
 }
 });
 try {
 // do something during render
 } catch (e) {
 // but here we can't use state, so have to return directly in
// case of an error
 return <SomeErrorScreen />;
 }
 // and still have to return in case of error state here
 if (hasError) return <SomeErrorScreen />;
 return <SomeComponentContent {...datasomething} />;
};
```

Bu bölməni yekunlaşdırmaq üçün: əgər React-də yalnız try/catch-ə güvənəcəyiksə, ya əksər səhvləri qaçıracağıq, ya da hər komponenti başa düşülməsi çətin, öz-özünə səhvlər yarada biləcək kod qarışığına çevirəcəyik. Şükürlər olsun ki, başqa bir yol da var.

React ErrorBoundary komponenti
Yuxarıdakı məhdudiyyətləri aradan qaldırmaq üçün React bizə “Error Boundaries” adlanan xüsusiyyət təqdim edir: bu, normal komponenti müəyyən mənada try/catch blokuna çevirən xüsusi bir API-dir, amma yalnız React-in deklarativ kodu üçün.
Tipik istifadə, React sənədlərində də gördüyünüz kimi, belə görünür:

```tsx
const Component = () => {
 return (
 <ErrorBoundary>
 <SomeChildComponent />
 <AnotherChildComponent />
 </ErrorBoundary>
 );
};
```

İndi, əgər bu komponentlərin və ya onların uşaqlarının render prosesi zamanı nəsə səhv gedərsə, həmin səhv tutulacaq və idarə olunacaq.
Amma React bizə komponenti özü vermir, sadəcə onu yaratmaq üçün bir vasitə təqdim edir. Ən sadə implementasiya belə görünə bilər:

```tsx
class ErrorBoundary extends React.Component {
 constructor(props) {
 super(props);
 // initialize the error state
 this.state = { hasError: false };
 }
 // if an error happened, set the state to true
 static getDerivedStateFromError(error) {
 return { hasError: true };
 }
 render() {
 // if error happened, return a fallback component
 if (this.state.hasError) {
 return <>Oh no! Epic fail!</>;
 }
 return this.props.children;
 }
}
```

Biz adi bir class komponent yaradırıq (burada köhnə üsulla gedirik, error boundary üçün hook-lar mövcud deyil) və `getDerivedStateFromError` metodunu implement edirik – bu, komponenti düzgün bir error boundary-yə çevirir.

Səhvlərlə məşğul olarkən vacib olan başqa bir məsələ də səhv məlumatını belə bir yerə göndərməkdir ki, on-call vəziyyətdə olan hər kəs xəbərdar olsun. Bunun üçün error boundary-lər bizə `componentDidCatch` metodunu təqdim edir:

```tsx
class ErrorBoundary extends React.Component {
 // everything else stays the same
 componentDidCatch(error, errorInfo) {
 // send error to somewhere here
 log(error, errorInfo);
 }
}
```

Error boundary qurulduqdan sonra, onu istədiyimiz kimi istifadə edə bilərik, adi komponent kimi. Məsələn, onu daha təkrar istifadə oluna bilən etmək üçün `fallback`-i prop kimi ötürə bilərik:

```tsx
render() {
// if error happened, return a fallback component
 if (this.state.hasError) {
 return this.props.fallback;
 }
 return this.props.children;
}
```

Və onu belə istifadə edirik:

```tsx
const Component = () => {
 return (
 <ErrorBoundary fallback={<>Oh no! Do something!</>}>
 <SomeChildComponent />
 <AnotherChildComponent />
 </ErrorBoundary>
 );
};
```

Və ya lazım ola biləcək hər hansı başqa şey, məsələn, düyməyə klikləyərək state-i sıfırlamaq, səhv növlərini fərqləndirmək və ya həmin səhvi bir kontekstə ötürmək.

Interactive example and full code
https://advanced-react.com/examples/16/04

ErrorBoundary komponenti: məhdudiyyətlər

Error boundaries yalnız React həyat dövrü zamanı baş verən səhvləri tutur. Həyat dövrünün xaricində baş verənlər, məsələn, həll olunmuş promises, `setTimeout` ilə asinxron kod, müxtəlif callback-lər və event handler-lar, açıq şəkildə idarə olunmasa, itəcək.

```tsx
const Component = () => {
 useEffect(() => {
 // this one will be caught by ErrorBoundary component
 throw new Error('Destroy everything!');
 }, []);
 const onClick = () => {
 // this error will just disappear into the void
 throw new Error('Hulk smash!');
 };
 useEffect(() => {
 // if this one fails, the error will also disappear
 fetch('/bla');
 }, []);
 return <button onClick={onClick}>click me</button>;
};
const ComponentWithBoundary = () => {
 return (
 <ErrorBoundary>
 <Component />
 </ErrorBoundary>
 );
};
```

Ümumi tövsiyə belədir: bu tip səhvlər üçün adi `try/catch` istifadə etmək. Və ən azından burada state-i nisbətən təhlükəsiz istifadə edə bilərik: event handler-lərin callback-ləri əslində adətən state-i yenilədiyimiz yerlərdir. Texniki olaraq, biz sadəcə iki yanaşmanı birləşdirib belə bir şey edə bilərik:

```tsx
const Component = () => {
 const [hasError, setHasError] = useState(false);
 // most of the errors in this component and in children will be
// caught by the ErrorBoundary
 const onClick = () => {
 try {
 // this error will be caught by catch
 throw new Error('Hulk smash!');
 } catch (e) {
 setHasError(true);
 }
 };
 if (hasError) return 'something went wrong';
 return <button onClick={onClick}>click me</button>;
};
const ComponentWithBoundary = () => {
 return (
 <ErrorBoundary fallback={'Oh no! Something went wrong'}>
 <Component />
 </ErrorBoundary>
 );
};
```

Amma yenidən eyni vəziyyətə qayıtdıq: hər komponent öz "error" state-inə sahib olmalı və daha önəmlisi, onunla nə edəcəyinə qərar verməlidir.

Əlbəttə, biz bu səhvlərlə hər bir komponent səviyyəsində məşğul olmaq əvəzinə, onları `ErrorBoundary`-ə sahib olan valideyn komponentə props və ya Context vasitəsilə ötürə bilərik. Bu yolla ən azı bir yerdə yalnız bir "fallback" komponentimiz ola bilər:

```tsx
const Component = ({ onError }) => {
 const onClick = () => {
 try {
 throw new Error('Hulk smash!');
 } catch (e) {
 // just call a prop instead of maintaining state here
 onError();
 }
 };
 return <button onClick={onClick}>click me</button>;
};
const ComponentWithBoundary = () => {
 const [hasError, setHasError] = useState();
 const fallback = 'Oh no! Something went wrong';
 if (hasError) return fallback;
 return (
 <ErrorBoundary fallback={fallback}>
 <Component onError={() => setHasError(true)} />
 </ErrorBoundary>
 );
};
```

Amma bu çox əlavə kod deməkdir! Bunu render ağacındakı hər bir child komponent üçün etməli olardıq. Üstəlik, əslində indi iki error state saxlayırıq: biri valideyn komponentdə, digəri isə ErrorBoundary-də. Halbuki ErrorBoundary artıq səhvləri ağac boyunca yuxarı ötürmək üçün bütün mexanizmlərə sahibdir, yəni biz burada ikiqat iş görürük.

Async kod və event handler-lardakı səhvləri də ErrorBoundary ilə tutmaq olmazmı?

Qeyri-adi olsa da, əslində bütün səhvləri ErrorBoundary ilə tuta bilərik! Bunun üçün maraqlı bir üsul var.

Metod belədir: əvvəlcə həmin səhvləri try/catch ilə tuturuq. Daha sonra catch blokunun içində normal bir React re-render-i trigger edirik və səhvləri yenidən re-render həyat dövrünə atırıq. Beləliklə, ErrorBoundary onları adi səhv kimi tuta bilir. Və çünki state update re-render-i trigger etmək üçün istifadə olunur və state set funksiyası updater funksiyasını arqument kimi qəbul edə bilir, bu üsul tam olaraq sehr kimidir.

```tsx
const Component = () => {
 // create some random state that we'll use to throw errors
 const [state, setState] = useState();
 const onClick = () => {
 try {
 // something bad happened
 } catch (e) {
 // trigger state update, with updater function as an argument
 setState(() => {
 // re-throw this error within the updater function
 // it will be triggered during state update
 throw e;
 });
 }
 };
};
```

Interactive example and full code
https://advanced-react.com/examples/16/05

Son addım bu "hack"-i abstraktlaşdırmaqdır ki, hər komponentdə təsadüfi state yaratmağa ehtiyac qalmasın. Burada yaradıcılığımızı istifadə edib, bizə async səhvləri atmağa imkan verən bir hook yarada bilərik:

```tsx
const useThrowAsyncError = () => {
 const [state, setState] = useState();
 return (error) => {
 setState(() => throw error)
 }
}
```

Və bunu belə istifadə edirik:

```tsx
const Component = () => {
 const throwAsyncError = useThrowAsyncError();
 useEffect(() => {
 fetch('/bla')
 .then()
 .catch((e) => {
 // throw async error here!
 throwAsyncError(e);
 });
 });
};
```

Yaxud, biz callback-lər üçün belə bir wrapper yarada bilərik:

```tsx
const useCallbackWithErrorHandling = (callback) => {
 const [state, setState] = useState();
 return (...args) => {
 try {
 callback(...args);
 } catch(e) {
 setState(() => throw e);
  }
}}
```

And use it like this:

```tsx
const Component = () => {
 const onClick = () => {
 // do something dangerous here
 };
 const onClickWithErrorHandler =
 useCallbackWithErrorHandling(onClick);
 return (
 <button onClick={onClickWithErrorHandler}>
 click me!
 </button>
 );
};
```

Və ya app-in tələb etdiyi hər hansı digər şey, ürəyiniz istədiyi kimi. Artıq heç bir səhv qaçmayacaq.

Interactive example and full code
https://advanced-react.com/examples/16/06

React-errorboundary kitabxanasından istifadə edə bilərəmmi?
Əgər çarxı yenidən ixtira etməkdən xoşlanmırsınızsa və ya artıq həll olunmuş problemlər üçün kitabxanalardan istifadə etməyi üstün tutursunuzsa, "react-errorboundary" adlı gözəl bir kitabxana var. Bu kitabxana çevik bir ErrorBoundary komponenti təmin edir və yuxarıda izah edilən bir neçə faydalı utiliti də özündə birləşdirir.

İstifadə edib-etməmək yalnız şəxsi üstünlüklərdən, kodlaşdırma üslubundan və komponentlərinizdəki xüsusi vəziyyətlərdən asılıdır.

Əsas məqamlar

Beləliklə, səhvlər və bu fəsil, hətta bütövlükdə bu kitab üçün əsas məqamlar bunlardır! Ümid edirəm ki, bu sizin üçün faydalı və maraqlı oldu. React-də səhvlərlə işləyərkən yadda saxlamaq lazım olanlar:

- React 16-cı versiyadan sonra React həyat dövründə baş verən uncaught səhvlər bütün tətbiqi unmount edəcək. Ona görə də strateji yerlərdə bir neçə ErrorBoundary mütləq olmalıdır.
- Sadə try/catch callback-lərdə və ya Promise-lərdə baş verən səhvləri tutacaq, amma nested komponentlərdən gələn səhvləri tuta bilməyəcək və useEffect və ya komponentin return hissəsini try/catch ilə əhatə edə bilməyəcəksiniz.
- ErrorBoundary komponenti bunun əksidir: render ağacında hər hansı bir komponentdən yaranan səhvləri tutur, amma Promise-lər və callback-ləri (hər hansı async əməliyyatları) keçəcək.
- Async səhvləri try/catch ilə tutub normal React həyat dövrünə yenidən atsaq, onları birləşdirərək “uber” ErrorBoundary komponenti yarada bilərik.
- Bunun üçün sadə bir useAsyncError hook-u implementasiya edə bilərik və ya oxşar prinsiplərə əsaslanan react-error-boundary kitabxanasından istifadə edə bilərik.

Footnotes
[1] React.createEement function documentation:
https://reactjs.org/docs/react-api.html#createelement
[2] React.cloneElement function documentation:
https://react.dev/reference/react/cloneElement
[3] Real implementation of useMemo hook:
https://github.com/facebook/react/blob/main/packages/reactreconciler/src/ReactFiberHooks.js#L2273
[4] DOM documentation: https://developer.mozilla.org/enUS/docs/Web/API/Document_Object_Model/Introduction
[5] JavaScript appendChild documentation:
https://developer.mozilla.org/enUS/docs/Web/API/Node/appendChild
[6] Higher-Order Components in React documentation:
https://reactjs.org/docs/higher-order-components.html
[7] Redux 'connect' documentation: https://reactredux.js.org/api/connect
[8] React router 'withRouter' documentation:
https://v5.reactrouter.com/web/api/withRouter
[9] useImperativeHandle documentation:
https://react.dev/reference/react/useImperativeHandle
[10] React.memo comparison function documentation:
https://react.dev/reference/react/memo#specifying-a-customcomparison-function
Page 344
[11] Lodash library: https://lodash.com/
[12] Debouncing and throttling explained: https://csstricks.com/debouncing-throttling-explained-examples/
[13] Implementation of 'debounce' function in lodash:
https://github.com/lodash/lodash/blob/master/debounce.js
[14] useLayoutEffect documentation:
https://react.dev/reference/react/useLayoutEffect
[15] You Might Not Need an Effect: https://react.dev/learn/you-mightnot-need-an-effect
[16] 'postMessage' and 'requestAnimationFrame' trick in React:
https://stackoverflow.com/questions/56727477/react-how-does-reactmake-sure-that-useeffect-is-called-after-the-browser-hash/56727837#56727837
[17] CSS 'position' property: https://developer.mozilla.org/enUS/docs/Web/CSS/position
[18] Stacking Context documentation: https://developer.mozilla.org/enUS/docs/Web/CSS/CSS_positioned_layout/Understanding_zindex/Stacking_context
[19] Stacking Context documentation: https://developer.mozilla.org/enUS/docs/Web/CSS/CSS_positioned_layout/Understanding_zindex/Stacking_context
[20] Containing Block documentation:
https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block
[21] How React responds to events, documentation:
https://react.dev/learn/responding-to-events#event-propagation
[22] Explanation of submit event behavior in React:
https://github.com/facebook/react/issues/22470

Axios library: https://github.com/axios/axios
[24] swr library: https://swr.vercel.app/docs/getting-started
[25] Chrome network documentation:
https://developer.chrome.com/docs/devtools/network/reference/?
utm_source=devtools#timing-explanation
[26] Promise.all documentation: https://developer.mozilla.org/enUS/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
[27] Promise documentation: https://developer.mozilla.org/enUS/docs/Web/JavaScript/Reference/Global_Objects/Promise
[28] Axios library: https://github.com/axios/axios
[29] swr library: https://swr.vercel.app/docs/getting-started
[30] Suspense documentation:
https://react.dev/reference/react/Suspense
[31] Promise documentation: https://developer.mozilla.org/enUS/docs/Web/JavaScript/Reference/Global_Objects/Promise
[32] Axios library: https://github.com/axios/axios
[33] Promise documentation: https://developer.mozilla.org/enUS/docs/Web/JavaScript/Reference/Global_Objects/Promise
[34] Issue on github: https://github.com/facebook/react/pull/22114
[35] useEffect cleanup function:
https://react.dev/reference/react/useEffect#my-cleanup-logic-runseven-though-my-component-didnt-unmount
[36] Closures documentation: https://developer.mozilla.org/enUS/docs/Web/JavaScript/Closures
Page 346
[37] JavaScript Closure documentation:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/

JavaScript Closure documentation:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
[38] AbortController documentation: https://developer.mozilla.org/enUS/docs/Web/API/AbortController
[39] try...catch documentation: https://developer.mozilla.org/enUS/docs/Web/JavaScript/Reference/Statements/try...catch
[40] ErrorBoundaries documentation: https://reactjs.org/docs/errorboundaries.html
[41] Dan Abramov describes the ErrorBoundary async trick:
https://github.com/facebook/react/issues/14981#issuecomment468460187
[42] Updater function documentation:
https://react.dev/reference/react/useState#updating-state-based-onthe-previous-state
[43] react-error-boundary library: https://github.com/bvaughn/reacterror-boundary