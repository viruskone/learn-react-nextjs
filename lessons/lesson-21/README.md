# Lesson 21 — Connecting Frontend to API

## Replacing localStorage with the API

So far, data is stored in `localStorage` via a custom hook. Now we'll replace that with calls to our Route Handlers. The data source changes but the component tree stays the same.

## Client-Side Fetch Pattern

In a Client Component, use `useEffect` to fetch data on mount and update state:

```tsx
const [posts, setPosts] = useState<Post[]>([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  fetch("/api/posts")
    .then((res) => res.json())
    .then((data: Post[]) => {
      setPosts(data);
      setIsLoading(false);
    });
}, []);
```

## Sending Data to the API

```tsx
async function handleAdd(title: string) {
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  const newPost: Post = await res.json();
  setPosts([...posts, newPost]);
}
```

## Optimistic Updates

Rather than waiting for the server to respond before updating the UI, you can update immediately and roll back if the request fails. This makes the app feel instant:

```tsx
async function handleLike(id: string) {
  // Update UI immediately
  setPosts(posts.map((p) => p.id === id ? { ...p, liked: !p.liked } : p));

  // Then sync with server
  const post = posts.find((p) => p.id === id)!;
  await fetch(`/api/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ liked: !post.liked }),
  });
}
```

For simplicity in this lesson, non-optimistic updates are fine — just update state after the server responds.

## Error States

Always handle fetch failures:

```tsx
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  fetch("/api/posts")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    })
    .then(setPosts)
    .catch((err: Error) => setError(err.message))
    .finally(() => setIsLoading(false));
}, []);

if (isLoading) return <p>Loading...</p>;
if (error) return <p className="text-red-500">{error}</p>;
```

## Updating the Hook

The cleanest approach is to update your data hook to call the API instead of using `localStorage`. This keeps all the logic in one place and leaves the components unchanged.
