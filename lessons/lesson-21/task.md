# Lesson 21 Task — Connecting Frontend to API

## Goal

Update `useTodos` to fetch from and write to `/api/todos` instead of `localStorage`.

## Steps

### 1. Refactor useTodos to use the API

Update `src/hooks/useTodos.ts`. Replace the `useState` + `useEffect` localStorage logic with:

**State:**
<details>
<summary>Show hint</summary>

```ts
const [todos, setTodos] = useState<Todo[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
```

</details>

**Fetch on mount:**
<details>
<summary>Show hint</summary>

```ts
useEffect(() => {
  fetch("/api/todos")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load todos");
      return res.json() as Promise<Todo[]>;
    })
    .then(setTodos)
    .catch((err: Error) => setError(err.message))
    .finally(() => setIsLoading(false));
}, []);
```

</details>

**addTodo:**
<details>
<summary>Show hint</summary>

```ts
async function addTodo(title: string) {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  const newTodo: Todo = await res.json();
  setTodos((prev) => [...prev, newTodo]);
}
```

</details>

**toggleTodo:**
<details>
<summary>Show hint</summary>

```ts
async function toggleTodo(id: string) {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;
  const res = await fetch(`/api/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !todo.completed }),
  });
  const updated: Todo = await res.json();
  setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
}
```

</details>

Return `{ todos, isLoading, error, addTodo, toggleTodo }`.

### 2. Update TodoApp to handle loading/error

Update `src/components/TodoApp.tsx` to destructure and use `isLoading` and `error`:

<details>
<summary>Show hint</summary>

```tsx
const { todos, isLoading, error, addTodo, toggleTodo } = useTodos();

if (isLoading) return <p>Loading todos...</p>;
if (error) return <p className="text-red-500">Error: {error}</p>;
```

</details>

### 3. Verify in the browser

- Open the app — it should load the in-memory todos from the API
- Add a new todo — it should appear without a page reload
- Toggle a todo — it should update

Note: Todos will reset when you restart the dev server (in-memory storage). That's expected.

## Success Criteria

- [ ] `useTodos` no longer uses `localStorage`
- [ ] Todos are fetched from `GET /api/todos` on mount
- [ ] Adding a todo calls `POST /api/todos` and updates state with the server response
- [ ] Toggling calls `PATCH /api/todos/[id]` and updates state with the server response
- [ ] Loading state is shown while fetching
- [ ] Error state is handled and displayed
- [ ] No TypeScript errors

## Hints

- Remove the `typeof window` check — it was only needed for `localStorage` (a browser-only API).
- `setTodos((prev) => ...)` uses the functional form of state update — safer when the update depends on the previous state.

When you're done, run `/review-lesson` to get feedback.
