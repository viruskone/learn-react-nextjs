# Lesson 15 — Dynamic Routes

## Static vs Dynamic Routes

So far all your routes have been **static** — the URL is fixed:
- `/` → `app/page.tsx`
- `/posts` → `app/posts/page.tsx`

**Dynamic routes** match a variable segment in the URL. A single file handles many URLs:
- `/posts/1`, `/posts/2`, `/posts/react-hooks` → `app/posts/[slug]/page.tsx`

The `[slug]` in the folder name is the segment parameter.

---

## Folder Structure

```
app/
  posts/
    page.tsx          ← /posts (list of all posts)
    [slug]/
      page.tsx        ← /posts/:slug (single post detail)
```

---

## Accessing Params

The `params` prop contains the dynamic segment values. In Next.js 15, `params` is a **Promise** — you must await it:

```tsx
// app/posts/[slug]/page.tsx
type Props = {
  params: Promise<{ slug: string }>
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params

  // fetch the specific post using slug
  const post = await getPostBySlug(slug)

  return <div>{post.title}</div>
}
```

---

## notFound()

If the requested slug doesn't exist, call `notFound()` to render the nearest `not-found.tsx`:

```tsx
import { notFound } from 'next/navigation'

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  return <div>{post.title}</div>
}
```

Create `app/posts/[slug]/not-found.tsx` (or `app/not-found.tsx` as a fallback):

```tsx
export default function NotFound() {
  return <p>Post not found.</p>
}
```

---

## Linking to Dynamic Routes

Use `<Link>` with a dynamic `href`:

```tsx
import Link from 'next/link'

{posts.map(post => (
  <Link key={post.id} href={`/posts/${post.slug}`}>
    {post.title}
  </Link>
))}
```

---

## generateStaticParams (Optional Optimisation)

For a statically built site, you can tell Next.js all the possible slugs at build time so it pre-renders each page:

```tsx
// app/posts/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}
```

Without this, the page is rendered on-demand (dynamically) the first time it's requested. For a blog backed by a database, dynamic rendering is fine.

---

## Catch-All Segments

You can match multiple path segments with `[...slug]`:

```
app/docs/[...slug]/page.tsx
```
- matches `/docs/intro`
- matches `/docs/react/hooks`
- matches `/docs/next/routing/dynamic`

`params.slug` will be an array: `['react', 'hooks']`.

You'll use this in larger apps for documentation sites, file explorers, etc. Not needed for most apps but good to know.

---

## Route Groups (Bonus Context)

Folders wrapped in `(parentheses)` are **route groups** — they organise files without affecting the URL:

```
app/
  (marketing)/
    about/page.tsx   ← /about
    contact/page.tsx ← /contact
  (app)/
    todos/page.tsx   ← /todos
```

Route groups let you apply different layouts to different sections without polluting the URL.
