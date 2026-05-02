# Lesson 23 — Error Handling & Loading UI

## loading.tsx — Automatic Suspense Boundary

When a page (or segment) is loading, Next.js shows `loading.tsx` automatically. You don't need to wire this up — just create the file:

```tsx
// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center p-8">
      <p className="text-gray-500">Loading...</p>
    </div>
  );
}
```

This works because Next.js wraps async Server Components in a `<Suspense>` boundary and uses `loading.tsx` as the fallback.

## error.tsx — Error Boundaries

When a Server Component throws, Next.js shows `error.tsx` for that route segment. It **must** be a Client Component:

```tsx
// app/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

The `reset` function re-renders the route segment — useful for transient errors.

## Client-Side Error Handling

For errors in Client Components (like failed fetch calls), you handle them yourself with try/catch and local state — `error.tsx` doesn't catch client-side errors.

Pattern:
```tsx
const [error, setError] = useState<string | null>(null);

async function addComment(text: string) {
  try {
    const res = await fetch("/api/comments", { ... });
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const comment = await res.json();
    setComments((prev) => [...prev, comment]);
  } catch (err) {
    setError(err instanceof Error ? err.message : "Unknown error");
  }
}
```

## Skeleton Loaders

A skeleton loader is a placeholder that mimics the shape of the content before it loads. Better UX than a spinner:

```tsx
function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
    </div>
  );
}
```

Show it when `isLoading` is true.

## Not Found Pages

Create `app/not-found.tsx` to customize the 404 page:

```tsx
export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
}
```
