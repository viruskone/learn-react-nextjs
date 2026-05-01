# Task — Lesson 12: Performance & Memoization

## Goal

Apply `React.memo`, `useCallback`, and `useMemo` to the Todo App. Then use React DevTools Profiler to verify that memoized `TodoItem` components no longer re-render when an unrelated todo is toggled.

---

## Steps

1. **Wrap `TodoItem` in `React.memo`**

   ```tsx
   const TodoItem = React.memo(function TodoItem({ todo, onToggle, onDelete }: Props) {
     // ... existing JSX
   })
   ```

2. **Stabilise the callbacks** passed to `TodoItem`

   In the component that renders `TodoItem` (e.g. `TodoList` or `TodoApp`), wrap `toggleTodo` and `deleteTodo` with `useCallback`:
   ```tsx
   const handleToggle = useCallback((id: string) => {
     toggleTodo(id)
   }, [toggleTodo])
   ```

3. **Add a `useMemo` for a derived value**

   Somewhere in `TodoApp` (or the context provider), compute the completed count:
   ```tsx
   const completedCount = useMemo(
     () => todos.filter(t => t.completed).length,
     [todos]
   )
   ```
   Display it somewhere visible (e.g. `"2 / 5 completed"`).

4. **Verify in React DevTools Profiler**
   - Install the React DevTools browser extension if you haven't
   - Open DevTools → Profiler → Record
   - Toggle one todo
   - Stop recording
   - Check: only the toggled `TodoItem` should show a re-render, not all of them

---

## Success Criteria

- [ ] `TodoItem` is wrapped in `React.memo`
- [ ] Toggle and delete callbacks are wrapped in `useCallback`
- [ ] `useMemo` is used for at least one derived value (e.g. completed count)
- [ ] React DevTools Profiler shows that non-toggled `TodoItem` components do **not** re-render when another todo is toggled
- [ ] No TypeScript errors
- [ ] App still works correctly

---

## Hints

- If using `useTodoContext()`, the dispatch function from `useReducer` has a stable identity — you can list it as a dependency without worrying it'll change
- `React.memo` alone is not enough if you pass new function references on each render — you need `useCallback` too
- If the Profiler shows all items still re-rendering, the likely cause is an unstabilised callback

---

## Bonus (optional)

Move the `useMemo` calculation into a dedicated custom hook: `useStats()` that returns `{ total, completedCount, pendingCount }`.

---

When you're done, run `/review-lesson` to get feedback.
