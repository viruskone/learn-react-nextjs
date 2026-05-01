# Task — Lesson 11: useContext

## Goal

Lift the todo state out of `useTodos` and into a `TodoContext` + `TodoProvider`. Any component in the tree can then access todos and actions via `useTodoContext()` — no prop drilling needed.

---

## Steps

1. **Create `src/context/TodoContext.tsx`**

   Define:
   - `TodoContextValue` type (todos + the three action functions)
   - `TodoContext` created with `createContext<TodoContextValue | null>(null)`
   - `TodoProvider` component that holds the `useReducer` state (from Lesson 10) and wraps children with `<TodoContext.Provider>`
   - `useTodoContext()` custom hook that reads the context and throws if used outside the Provider

2. **Move the reducer** (`todoReducer` + `Action` type) from `useTodos.ts` into `TodoContext.tsx` or a shared `reducers/todoReducer.ts` file

3. **Wrap the app** with `TodoProvider`
   - If you're still in pure React: wrap in `main.tsx` or `App.tsx`
   - If you've reached the Next.js phase: wrap in `app/layout.tsx`

4. **Update components** to use `useTodoContext()` instead of receiving `todos` / callbacks as props

5. **Delete or simplify `useTodos.ts`** — the state now lives in context, so the hook is no longer needed (or keep it as a thin wrapper that calls `useTodoContext()`)

---

## Success Criteria

- [ ] `TodoContext` created with `createContext<TodoContextValue | null>(null)`
- [ ] `TodoProvider` uses `useReducer` internally and provides the value
- [ ] `useTodoContext()` throws a helpful error if called outside the provider
- [ ] At least one component (`TodoList` or `TodoItem`) consumes context instead of props
- [ ] No prop drilling: `todos` and action functions are not passed through intermediate components
- [ ] App still works: add, toggle, delete all function correctly

---

## Hints

- Start by getting context working with just `todos` and `addTodo`, then add the rest
- The `throw new Error(...)` guard in `useTodoContext` is not optional — it saves you from confusing "undefined is not iterable" crashes
- Context doesn't replace all props — props are still fine for component-specific config (like a `className` or a label)

---

## Bonus (optional)

Split the context into two: one for reading state (`TodoStateContext`) and one for dispatching (`TodoDispatchContext`). This is a pattern from the React docs — components that only dispatch don't re-render when todos change.

---

When you're done, run `/review-lesson` to get feedback.
