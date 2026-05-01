# Lesson 21 — Connecting Frontend to API

## Replacing localStorage with the API

So far, todos are stored in `localStorage` via the `useTodos` hook. Now we'll replace that with calls to our Route Handlers. The data source changes but the component tree stays the same.

## Client-Side Fetch Pattern

In a Client Component, use `useEffect` to fetch data on mount and update state:

```tsx
const [todos, setTodos] = useState<Todo[]>([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  fetch("/api/todos")
    .then((res) => res.json())
    .then((data: Todo[]) => {
      setTodos(data);
      setIsLoading(false);
    });
}, []);
```

## Sending Data to the API

```tsx
async function handleAdd(title: string) {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  const newTodo: Todo = await res.json();
  setTodos([...todos, newTodo]);
}
```

## Optimistic Updates

Rather than waiting for the server to respond before updating the UI, you can update immediately and roll back if the request fails. This makes the app feel instant:

```tsx
async function handleToggle(id: string) {
  // Update UI immediately
  setTodos(todos.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));

  // Then sync with server
  const todo = todos.find((t) => t.id === id)!;
  await fetch(`/api/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !todo.completed }),
  });
}
```

For simplicity in this lesson, non-optimistic updates are fine — just update state after the server responds.

## Error States

Always handle fetch failures:

```tsx
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  fetch("/api/todos")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    })
    .then(setTodos)
    .catch((err: Error) => setError(err.message))
    .finally(() => setIsLoading(false));
}, []);

if (isLoading) return <p>Loading...</p>;
if (error) return <p className="text-red-500">{error}</p>;
```

## Updating the useTodos Hook

The cleanest approach is to update `useTodos` to call the API instead of using `localStorage`. This keeps all the logic in one place and leaves the components unchanged.
