# Komponentin Yaddaşı Niyə Boş Yerə İşləməsin? Memoizasiya və Hooks

Function komponent hər render-də başdan-başa çağırılır — bunu əvvəlki yazılarda gördük. Bu, sadə komponentlər üçün problem deyil, amma komponent daxilində baha başa gələn hesablama var, ya da hər dəfə yeni funksiya yaradılırsa, bu, performansa mənfi təsir edə bilər. React bu problemi həll etmək üçün üç hook təklif edir: **useMemo**, **useCallback** və **useRef**. Bunlar müvafiq olaraq dəyəri, funksiyanı və reference-i **memoize** edir — yəni lazım olmadıqca yenidən yaratmır, əvvəlki nəticəni yadda saxlayıb təkrar istifadə edir.

## useMemo: baha hesablamanı yadda saxlamaq

`useMemo` bir hesablamanın nəticəsini memoize edir, yəni yalnız asılılıqlar (dependencies) dəyişəndə yenidən hesablanır. Arqument kimi funksiya və asılılıq array-i qəbul edir, nəticədə memoize olunmuş dəyəri qaytarır.

```jsx
import { useMemo } from "react";

const Component = () => {
  const expensiveResult = useMemo(() => {
    // Baha başa gələn hesablama
    return computeExpensiveValue(dependency);
  }, [dependency]);

  return <div>{expensiveResult}</div>;
};
```

Burda `expensiveResult` dəyəri `useMemo` ilə memoize olunub. Funksiyanın daxilindəki hesablama yalnız `dependency` dəyəri dəyişəndə icra olunur. Əgər `dependency` eyni qalıbsa, React hesablamanı təkrar etmir, sadəcə əvvəlcədən yadda saxlanmış nəticəni qaytarır.

> `useMemo`-nu belə düşün: aşpaz hər sifarişdə eyni sousu yenidən hazırlamır — bir dəfə hazırlayıb soyuducuda saxlayır, resept (asılılıq) dəyişməyincə həmin sousdan istifadə edir. Resept dəyişəndə isə yenidən hazırlayır.

Diqqət et: `useMemo` yalnız *baha* hesablamalar üçün mənalıdır — iki ədədi toplamaq kimi ucuz əməliyyatı memoize etmək faydadan çox artıq mürəkkəblik yaradır, çünki `useMemo`-nun özünün də iş yükü var (asılılıqları müqayisə etmək).

## useCallback: funksiya reference-ini sabit saxlamaq

Function komponent hər render olunanda onun daxilindəki bütün funksiyalar — o cümlədən inline callback-lər — yenidən yaradılır. Bu, uşaq komponentə callback prop kimi ötürüləndə problem yaradır: uşaq komponent həmin callback-i "yeni reference" kimi qəbul edir və nəticədə lazımsız yerə yenidən render olunur.

```jsx
const MyComponent = () => {
  return <MyButton onClick={() => console.log("click")} />;
};
```

Burda `onClick`-ə ötürülən inline funksiya `MyComponent` render olunan hər dəfə yenidən yaradılır. Yəni `MyButton` hər dəfə yeni funksiya reference-i alır, bu da `MyButton`-un yenidən render olunmasına səbəb olur — hətta funksiyanın "məzmunu" eyni qalsa belə.

`useCallback` bunu həll edir — funksiyanı memoize edir:

```jsx
const MyComponent = () => {
  const clickHandler = React.useCallback(() => {
    console.log("click");
  }, []);

  return <MyButton onClick={clickHandler} />;
};
```

Boş asılılıq array-i (`[]`) React-a deyir ki, bu funksiyanın heç bir asılılığı yoxdur, deməli komponentin bütün "ömrü" boyu sabit qalmalıdır. Nəticədə `MyComponent` hər render olunanda `MyButton`-a **eyni** funksiya reference-i ötürülür, uşaq komponent isə lazımsız yerə yenidən render olunmur.

> `useCallback` ilə `useMemo` arasındaki fərq sadədir: `useMemo` bir *dəyəri* yadda saxlayır, `useCallback` isə bir *funksiyanı*. Əslində `useCallback(fn, deps)` = `useMemo(() => fn, deps)`.

## useRef: render-lər arası yaşayan, amma render tetiklməyən dəyər

`useRef` render-lər arasında yaşayan, dəyişəndə isə komponentin yenidən render olunmasına səbəb olmayan mutable (dəyişə bilən) bir reference yaradır. Ən çox iki ssenaridə istifadə olunur: (1) DOM node-una, ya da React komponent instansına birbaşa çatmaq, (2) render-lər arasında "yadda qalmalı" olan, amma UI-yə təsir etməyən dəyəri saxlamaq (məsələn, əvvəlki bir dəyər, timer ID-si və s.).

```jsx
const Component = () => {
  const inputRef = useRef();

  const handleButtonClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleButtonClick}>Input-a fokuslan</button>
    </div>
  );
};
```

`inputRef` `useRef` ilə yaradılıb və `input` elementinin `ref` atributuna verilib. Bu, `inputRef.current` vasitəsilə birbaşa DOM node-una çatmağa imkan verir. `handleButtonClick` funksiyasında `inputRef.current.focus()` çağırılır — düyməyə basanda input sahəsi fokuslanır.

> `useState` ilə `useRef`-i qarışdırma: `state` dəyişəndə komponent yenidən render olunur, `ref.current` dəyişəndə isə heç nə baş vermir — sanki qeyd dəftərçəsinə yazırsan, kimsə oxumur, sadəcə lazım olanda özün baxırsan.

`useRef` sayəsində DOM node-una birbaşa çatmaq mümkün olur, komponentin əlavə render-inə ehtiyac qalmadan.

## Nəticə

`useMemo`, `useCallback` və `useRef` hook-ları ilə tətbiqin performansını optimallaşdırmaq mümkündür: lazımsız hesablamalardan qaçmaq, lazımsız yenidən render-lərin qarşısını almaq və render-lər arasında dəyər/reference-i saxlamaq. Nəticədə istifadəçi daha rəvan təcrübə yaşayır, resurslar isə daha səmərəli istifadə olunur.

Qısaca desək: **`useMemo` dəyəri, `useCallback` funksiyanı, `useRef` reference-i yadda saxlayır** — üçü də eyni məqsədə xidmət edir: React-ə "bunu təkrar yaratma, əvvəlkini istifadə et" demək.
