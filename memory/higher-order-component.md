---
title: "Higher-Order Component (HOC)"
description: "React-də HOC dizayn pattern-i — izahı, SOLID ilə əlaqəsi və auth qorunması üçün real nümunə."
date: 2026-06-21
tags: [react, hoc, design-pattern, solid, typescript]
---

# Higher-Order Component (HOC)

## İzah

**Higher-Order Component (HOC)** → React-də bir **dizayn pattern**-dir.

Sadə dillə:

➡️ **Bir komponenti götürüb, əlavə funksionallıq verərək yeni komponent qaytaran funksiya**dır.

Formula:

```tsx
const EnhancedComponent = HOC(WrappedComponent);
```

🔑 Əsas məqsəd:

- Kodun təkrar yazılmasının qarşısını almaq
- Ayrı-ayrı komponentlərə **şərtli render**, **auth yoxlaması**, **data logging** və s. kimi ortaq funksionallıq əlavə etmək

## SOLID ilə əlaqə

- **S (Single Responsibility)** → HOC yalnız “funksionallıq əlavə etmək” işini görür, əsas komponent isə UI-dən məsuldur.
- **O (Open/Closed)** → Yeni davranış əlavə etmək üçün komponenti dəyişmirik, sadəcə HOC ilə bükürük.
- **D (Dependency Inversion)** → Komponent konkret implementasiyaya bağlı olmur, HOC ona injection edir.

## Real Nümunə: Auth qorunması (Protected Route)

**HOC yaradılır (`withAuth.tsx`)**

```tsx
import { ComponentType } from "react";
import { Navigate } from "react-router-dom";

export function withAuth<T>(WrappedComponent: ComponentType<T>) {
  return function ProtectedComponent(props: T) {
    const isAuthenticated = Boolean(localStorage.getItem("token"));

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return <WrappedComponent {...props} />;
  };
}
```

**Sadə bir səhifə (`Dashboard.tsx`)**

```tsx
export const Dashboard = () => {
  return <h1>Admin Panel</h1>;
};
```

**HOC ilə bükülmüş variant (`App.tsx`)**

```tsx
import { withAuth } from "./withAuth";
import { Dashboard } from "./Dashboard";

const ProtectedDashboard = withAuth(Dashboard);

function App() {
  return (
    <div>
      <ProtectedDashboard />
    </div>
  );
}

export default App;
```

## Nəticə

- Əgər istifadəçi login olmayıbsa → `/login`-ə yönləndirilir.
- Əgər login olubsa → `Dashboard` göstərilir.

## Əsas Faydalar

- **Kod təkrarı yoxdur** → Hər səhifədə ayrı-ayrı auth yoxlaması yazılmır.
- **SOLID uyğundur** → Komponent yalnız öz UI işi ilə məşğuldur, auth isə ayrıca HOC pattern-ə ötürülüb.
- **Yenidən istifadə edilə bilər** → Eyni `withAuth` HOC istənilən səhifəni qorumaq üçün tətbiq oluna bilər.
