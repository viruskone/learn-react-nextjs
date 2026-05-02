# Lesson 14 — Layouts & Navigation

## Nested Layouts

Layouts in Next.js App Router are hierarchical. The root `app/layout.tsx` wraps everything. You can add more layouts for specific sections:

```
app/
  layout.tsx         ← wraps the entire app
  page.tsx
  about/
    page.tsx
  blog/
    layout.tsx       ← wraps all /blog/* pages only
    page.tsx
```

The root layout receives and renders `children` — those children are the nested layouts or pages.

## The Link Component

Never use `<a href="...">` for internal navigation in Next.js. Use `<Link>` from `next/link`:

```tsx
import Link from "next/link";

<Link href="/about">About</Link>
<Link href="/">Home</Link>
```

`<Link>` prefetches pages when they're in the viewport, making navigation instant. It also avoids full page reloads — only the changed content re-renders.

## useRouter (for programmatic navigation)

For navigation triggered by code (not a click on a link), use the `useRouter` hook:

```tsx
"use client"; // required for useRouter

import { useRouter } from "next/navigation";

function MyComponent() {
  const router = useRouter();

  function handleSuccess() {
    router.push("/about"); // navigate programmatically
  }
}
```

Note: import `useRouter` from `"next/navigation"` (not `"next/router"` — that's the old Pages Router).

## Active Link Styling

To highlight the current page's link, use `usePathname`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();

  return (
    <nav>
      <Link href="/" className={pathname === "/" ? "font-bold" : ""}>
        Home
      </Link>
      <Link href="/about" className={pathname === "/about" ? "font-bold" : ""}>
        About
      </Link>
    </nav>
  );
}
```

## Adding a Navbar to the Root Layout

The root layout is the right place for a persistent navbar. Since `usePathname` requires `"use client"`, extract the navbar into its own Client Component and import it into the layout:

```tsx
// app/layout.tsx (Server Component — no "use client")
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
```
