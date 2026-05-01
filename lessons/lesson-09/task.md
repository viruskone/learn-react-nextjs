# Lesson 9 Task — Custom Hooks

## Goal

Extract all todo state management logic from `TodoApp` into a custom `useTodos` hook.

## Steps

### 1. Create the hook

Create `src/hooks/useTodos.ts` (note: `.ts` not `.tsx` — no JSX here).

Move the following from `TodoApp` into `useTodos`:
- The `useState` with localStorage initialization
- The `useEffect` for persistence
- The `handleAdd` function (rename to `addTodo`)
- The `handleToggle` function (rename to `toggleTodo`)

The hook should return: `{ todos, addTodo, toggleTodo }`

### 2. Simplify TodoApp

Update `src/components/TodoApp.tsx`:
- Remove the state, effects, and handler functions
- Call `const { todos, addTodo, toggleTodo } = useTodos();`
- Pass `addTodo` to `<AddTodoForm onAdd={addTodo} />`
- Pass `toggleTodo` to `<TodoList onToggle={toggleTodo} />`

### 3. Verify everything still works

Everything that worked before should still work:
- Adding todos
- Toggling todos
- Persistence on reload
- Completed count

## Success Criteria

- [ ] `src/hooks/useTodos.ts` exists and exports `useTodos`
- [ ] The hook manages all state and effects (nothing state-related left in `TodoApp`)
- [ ] `TodoApp` is noticeably simpler — just UI composition
- [ ] `useTodos` returns `{ todos, addTodo, toggleTodo }`
- [ ] All functionality is preserved (add, toggle, persist)
- [ ] No TypeScript errors

## Hints

- The file extension is `.ts` (not `.tsx`) because hooks contain no JSX.
- Name the file `useTodos.ts` to match the hook naming convention.
- If you also want a `deleteTodo` function, this is a great time to add it (optional bonus).

## Bonus (optional)

Add a `deleteTodo(id: string)` function to `useTodos` that removes a todo by id. Wire it up with a delete button in `TodoItem`.

When you're done, run `/review-lesson` to get feedback.
