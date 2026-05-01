# Lesson 17 — Data Fetching

## Fetching in Server Components

Server Components can be `async`. This means you can `await` a fetch directly in the component body — no `useEffect`, no loading state:

```tsx
// app/posts/page.tsx
export default async function PostsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return (
    <ul>
      {posts.map((post: { id: number; title: string }) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

The fetch happens on the server. The client receives fully rendered HTML — no loading flicker, no JavaScript bundle for the fetch.

## Next.js Fetch Caching

Next.js extends the native `fetch` with caching options:

```tsx
// Cache forever (static — great for rarely-changing data)
fetch(url, { cache: "force-cache" });

// Never cache (always fresh — great for frequently-changing data)
fetch(url, { cache: "no-store" });

// Revalidate every N seconds (ISR — incremental static regeneration)
fetch(url, { next: { revalidate: 60 } }); // fresh every 60s
```

For a Todo App with user-specific data, use `no-store` (or rely on the dynamic rendering that happens automatically when you read cookies/headers).

## The loading.tsx File

Create `app/loading.tsx` (or `app/todos/loading.tsx` for a specific route) and Next.js will automatically show it while the page is streaming/loading:

```tsx
// app/loading.tsx
export default function Loading() {
  return <p>Loading...</p>;
}
```

This works because Next.js wraps async pages in a `<Suspense>` boundary automatically.

## Typing Fetched Data

Define an interface for your API data and type the response:

```tsx
interface Post {
  id: number;
  title: string;
  body: string;
}

const posts: Post[] = await res.json();
```

## Error Handling

If the fetch fails, you want to show an error instead of crashing the page. Use `error.tsx`:

```tsx
// app/error.tsx
"use client"; // error boundaries must be client components

export default function Error({ error }: { error: Error }) {
  return <p>Something went wrong: {error.message}</p>;
}
```

Or handle it explicitly with try/catch in the page component.
