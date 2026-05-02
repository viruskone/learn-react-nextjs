# Lesson 13 — Intro to Next.js & App Router

## What Next.js Adds Over React

React is a UI library — it only handles rendering components. Next.js is a full-stack framework that adds:

| Feature | React alone | Next.js |
|---------|-------------|---------|
| Routing | Need React Router | Built-in (file-based) |
| Server rendering | Manual setup | Built-in (SSR, SSG, RSC) |
| API routes | Need a separate server | Built-in (`app/api/`) |
| Code splitting | Manual | Automatic |
| Image optimization | Manual | Built-in (`<Image />`) |
| Fonts | Manual | Built-in (`next/font`) |

## File-Based Routing

In the App Router, the file system is your route map. Files named `page.tsx` become routes:

```
app/
  page.tsx          → /
  about/
    page.tsx        → /about
  blog/
    page.tsx        → /blog
    [slug]/
      page.tsx      → /blog/my-post (dynamic segment)
```

No route configuration files. No imports. Just files.

## The app/ Directory

Special files in the `app/` directory:

| File | Purpose |
|------|---------|
| `layout.tsx` | Wraps all child routes (persistent shell, navbar, etc.) |
| `page.tsx` | The actual page content for a route |
| `loading.tsx` | Shown while the page is loading (auto Suspense boundary) |
| `error.tsx` | Shown when an error occurs in the route |
| `not-found.tsx` | Shown for 404s |

## Layouts

`layout.tsx` wraps its `children`. The root `layout.tsx` wraps the entire app:

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Nested layouts work too — create a `layout.tsx` in any subfolder and it wraps that folder's pages.

## Metadata

Next.js has a built-in metadata API for setting `<title>` and `<meta>` tags:

```tsx
// app/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Blog",
  description: "A blog built with Next.js",
};
```

## Server Components vs Client Components

**This is the biggest conceptual shift with Next.js.** By default, all components in the `app/` directory are **Server Components** — they render on the server and send HTML to the browser. They can't use hooks or browser APIs.

Components that need interactivity must opt into being **Client Components** with `"use client"` at the top of the file. You'll explore this in depth in Lesson 16.

For now: your interactive components will need `"use client"`. Your pages (which just compose components) can stay as server components.
