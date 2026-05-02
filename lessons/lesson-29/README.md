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
// app/posts/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Latest Posts',
  description: 'Browse all articles',
}

export default function PostsPage() {
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
    template: '%s | My Blog',
    default: 'My Blog',
  },
  description: 'A blog built with Next.js',
}
```

Now when a page exports `title: 'Latest Posts'`, the browser tab shows **"Latest Posts | My Blog"**. The `default` is used when a page doesn't set a title.

---

## Dynamic Metadata with generateMetadata

For pages where the metadata depends on data (like a detail page), use `generateMetadata`:

```tsx
// app/posts/[slug]/page.tsx
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) return { title: 'Not Found' }

  return {
    title: post.title,
    description: `Published: ${post.published ? 'Yes' : 'Draft'}`,
  }
}

export default async function PostDetailPage({ params }: Props) {
  // ...
}
```

---

## Open Graph (Social Sharing)

Open Graph tags control how your page looks when shared on social media:

```tsx
export const metadata: Metadata = {
  title: 'Latest Posts',
  description: 'Browse all articles',
  openGraph: {
    title: 'Latest Posts',
    description: 'Browse all articles',
    url: 'https://my-blog.vercel.app/posts',
    siteName: 'My Blog',
    images: [
      {
        url: 'https://my-blog.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'My Blog preview',
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
    title: 'Latest Posts',
    description: 'Browse all articles',
    images: ['https://my-blog.vercel.app/og-image.png'],
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
    canonical: 'https://my-blog.vercel.app/posts',
  },
}
```

---

## Viewing the Generated Output

Run `npm run build` then inspect the HTML source of any page — you'll see all the `<meta>` tags Next.js generated in `<head>`. In dev mode, you can use browser DevTools → Elements → `<head>` to see them.
