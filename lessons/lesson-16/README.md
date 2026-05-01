# Lesson 16 — Server vs Client Components

## The Big Idea

Next.js App Router introduces **React Server Components (RSC)**. This changes the fundamental mental model of React.

**Before RSC**: All React components ran in the browser.

**With RSC**: Components can run on the server. They render to HTML and stream to the client — no JavaScript bundle sent for the component itself.

## Server Components (default)

By default, every file in `app/` is a Server Component. They:
- Run on the server (or at build time)
- Can `async/await` — they can fetch data directly
- Can access server-only resources (databases, file system, env vars)
- **Cannot** use hooks (`useState`, `useEffect`, etc.)
- **Cannot** use browser APIs (`localStorage`, `window`, etc.)
- **Cannot** add event listeners (`onClick`, `onChange`, etc.)

```tsx
// app/page.tsx — Server Component (no "use client")
export default async function Page() {
  const data = await fetch("https://api.example.com/data");
  const json = await data.json();

  return <div>{json.title}</div>;
}
```

## Client Components

Add `"use client"` at the top of the file to make it a Client Component:

```tsx
"use client"; // must be the FIRST line

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

Client Components:
- Run in the browser (and also during SSR for the initial HTML)
- Can use hooks
- Can use browser APIs
- **Cannot** directly await in the component body

## The Boundary Rule

`"use client"` marks a **boundary**. Everything below that component in the tree also becomes client-side, unless you explicitly pass Server Components as props/children.

This means: keep Server Components as high as possible, and only push the `"use client"` boundary down to the component that actually needs interactivity.

## The Composition Pattern

You can pass Server Components as `children` to Client Components:

```tsx
// Server Component
import ClientWrapper from "./ClientWrapper";

export default function Page() {
  return (
    <ClientWrapper>
      <ServerContent />   {/* This stays a server component */}
    </ClientWrapper>
  );
}
```

## Practical Rule of Thumb

Ask: "Does this component need to react to user interaction or browser state?"
- **Yes** → `"use client"`
- **No** → leave it as a Server Component

Examples:
- `<Navbar>` with `usePathname` → Client Component
- `<TodoList>` that renders interactive checkboxes → Client Component
- `<Page>` that just fetches data and lays out components → Server Component
- `<Footer>` with static links → Server Component
