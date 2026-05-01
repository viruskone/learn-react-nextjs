# Lesson 29 — Metadata & SEO

## Why Metadata Matters

Metadata is what search engines, social media platforms, and browsers read to understand your page:
- The tab title and browser history entry
- The preview card when you share a link on Twitter/Slack/WhatsApp
- What Google indexes and shows in search results

Next.js has a first-class Metadata API that generates all of this from TypeScript — no manual `<head>` manipulation needed.

---

## Static Metadata

Export a `metadata` object from any page or layout:

```tsx
// app/todos/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Todos',
  description: 'Manage your todo list',
}

export default function TodosPage() {
  return <main>...</main>
}
```

Next.js merges metadata from layouts and pages — more specific pages override parent layouts.

---

## Root Layout Metadata (with Template)

Set a title template in the root layout so every page automatically gets the app name appended:

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    template: '%s | Todo App',
    default: 'Todo App',
  },
  description: 'A simple todo app built with Next.js',
}
```

Now when a page exports `title: 'My Todos'`, the browser tab shows **"My Todos | Todo App"**. The `default` is used when a page doesn't set a title.

---

## Dynamic Metadata with generateMetadata

For pages where the metadata depends on data (like a detail page), use `generateMetadata`:

```tsx
// app/todos/[id]/page.tsx
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const todo = await getTodoById(id)

  if (!todo) return { title: 'Not Found' }

  return {
    title: todo.text,
    description: `Todo: ${todo.text} — ${todo.completed ? 'completed' : 'pending'}`,
  }
}

export default async function TodoDetailPage({ params }: Props) {
  // ...
}
```

---

## Open Graph (Social Sharing)

Open Graph tags control how your page looks when shared on social media:

```tsx
export const metadata: Metadata = {
  title: 'My Todos',
  description: 'Manage your todo list',
  openGraph: {
    title: 'My Todos',
    description: 'Manage your todo list',
    url: 'https://my-todo-app.vercel.app/todos',
    siteName: 'Todo App',
    images: [
      {
        url: 'https://my-todo-app.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Todo App preview',
      },
    ],
    type: 'website',
  },
}
```

---

## Twitter / X Cards

```tsx
export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'My Todos',
    description: 'Manage your todo list',
    images: ['https://my-todo-app.vercel.app/og-image.png'],
  },
}
```

---

## Icons and Favicon

```tsx
export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}
```

Or place `icon.png` / `apple-icon.png` directly in the `app/` folder — Next.js picks them up automatically.

---

## Robots and Canonical

```tsx
export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://my-todo-app.vercel.app/todos',
  },
}
```

---

## Viewing the Generated Output

Run `npm run build` then inspect the HTML source of any page — you'll see all the `<meta>` tags Next.js generated in `<head>`. In dev mode, you can use browser DevTools → Elements → `<head>` to see them.
