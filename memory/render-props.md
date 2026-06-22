---
title: "Render Props Pattern"
description: "React-də komponentlər arasında kod paylaşmaq üçün Render Props pattern-i — izah, real nümunə və kod."
date: 2026-06-21
tags: [react, typescript, patterns, render-props]
---

# Render Props Pattern

## İzah

**Render Props** — React komponentləri arasında **kod paylaşmaq üçün istifadə olunan pattern**-dir. Bu yanaşmada, bir komponent `props` kimi **funksiya qəbul edir** və həmin funksiyanı çağıraraq içindəki UI və ya data-nı idarə etməyə imkan verir.

Əsas ideya: **komponentin nəyi render etməsini valideyn (parent) komponent müəyyənləşdirir.**

Bu, `children` və ya xüsusi `render` prop-u vasitəsilə edilə bilər.

---

## Niyə istifadə olunur?

- Reusable (təkrar istifadə olunan) məntiq yazmaq üçün.
- DRY prinsipinə əməl etmək üçün.
- Bir komponentin özündəki data və ya state-dən başqa komponentlər də faydalansın deyə.

---

## Real Həyat Nümunəsi

**Case:** Bizdə bir `MouseTracker` komponenti var. O, istifadəçinin mouse koordinatlarını izləyir.

Amma bu koordinatlardan **fərqli komponentlər** müxtəlif formada istifadə edə bilər:

- biri bu koordinatlarla şəkli hərəkət etdirə bilər,
- digəri koordinatları sadəcə ekrana göstərə bilər.

---

## Kod Nümunəsi

```tsx
// Render Props ilə reusable MouseTracker
import React, { useState } from "react";

type MouseTrackerProps = {
  children: (mouse: { x: number; y: number }) => React.ReactNode;
};

const MouseTracker: React.FC<MouseTrackerProps> = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div style={{ height: "200px", border: "1px solid gray" }} onMouseMove={handleMouseMove}>
      {children(position)}
    </div>
  );
};

// İstifadə nümunəsi #1: Koordinatları göstərmək
const ShowCoordinates = () => (
  <MouseTracker>
    {({ x, y }) => <p>Mouse koordinatları: {x}, {y}</p>}
  </MouseTracker>
);

// İstifadə nümunəsi #2: Şəkili mouse ilə hərəkət etdirmək
const MoveImage = () => (
  <MouseTracker>
    {({ x, y }) => (
      <img
        src="https://placekitten.com/50/50"
        alt="kitten"
        style={{ position: "absolute", left: x, top: y }}
      />
    )}
  </MouseTracker>
);

```

---

## Yekun

- Render Props pattern-i **kodun təkrar istifadəsini artırır**.
- Bu günlərdə bəzi hallarda **Custom Hook-lar** ilə əvəz olunur, amma hələ də **dinamik UI idarəsi** üçün güclü yanaşmadır.