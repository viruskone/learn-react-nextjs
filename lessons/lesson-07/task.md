# Lesson 7 Task — useEffect & Side Effects

## Goal

Persist todos to `localStorage` so they survive page reloads.

## Steps

### 1. Initialize state from localStorage

Update `src/components/TodoApp.tsx`.

Change the `useState` call to use a lazy initializer:

<details>
<summary>Show hint</summary>

```tsx
const [todos, setTodos] = useState<Todo[]>(() => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem("todos");
  return raw ? (JSON.parse(raw) as Todo[]) : [];
});
```

</details>

This replaces your hardcoded array — but you can keep 3–4 hardcoded items as the fallback for when `localStorage` is empty.

Alternatively, seed `localStorage` with those items if nothing is stored yet.

### 2. Save todos to localStorage on change

Add a `useEffect` that writes to `localStorage` whenever `todos` changes:

<details>
<summary>Show hint</summary>

```tsx
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
```

</details>

### 3. Verify persistence

1. Open `http://localhost:3000`
2. Add a few todos
3. Hard-refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
4. Your todos should still be there

### 4. Verify cleanup

Open browser DevTools → Application → Local Storage → `http://localhost:3000`

You should see a `todos` key with a JSON array.

## Success Criteria

- [ ] `useState` uses a lazy initializer that reads from `localStorage`
- [ ] A `useEffect` with `[todos]` dependency saves to `localStorage` on change
- [ ] The `typeof window === "undefined"` guard is present
- [ ] Todos survive a full page reload
- [ ] Adding/toggling todos is still reflected in `localStorage`
- [ ] No TypeScript errors or hydration errors in the console

## Hints

- A hydration error means the server rendered something different from the client. The `typeof window` guard prevents this.
- `JSON.parse(raw) as Todo[]` is a type assertion — you're telling TypeScript "trust me, this is a `Todo[]`". It's fine here since we control the data.

When you're done, run `/review-lesson` to get feedback.
