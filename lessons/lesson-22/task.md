# Lesson 22 Task — Delete & Update

## Goal

Add the ability to delete todos, wiring it from the API through to the UI.

## Steps

### 1. Add deleteTodo to useTodos

Update `src/hooks/useTodos.ts`:

```ts
async function deleteTodo(id: string) {
  await fetch(`/api/todos/${id}`, { method: "DELETE" });
  setTodos((prev) => prev.filter((t) => t.id !== id));
}
```

Return it: `{ todos, isLoading, error, addTodo, toggleTodo, deleteTodo }`.

### 2. Add onDelete prop to TodoList

Update `src/components/TodoList.tsx`:
- Add `onDelete: (id: string) => void` to `TodoListProps`
- Pass it to each `<TodoItem />`

### 3. Add delete button to TodoItem

Update `src/components/TodoItem.tsx`:
- Add `onDelete: (id: string) => void` to `TodoItemProps`
- Add a delete button that calls `onDelete(id)` on click
- Optional: use `window.confirm("Delete this todo?")` before calling `onDelete`

### 4. Wire it up in TodoApp

Destructure `deleteTodo` from `useTodos` and pass it as `onDelete` to `<TodoList />`.

### 5. Verify in the browser

- Click delete on a todo — it should disappear from the list
- Reload the page — the todo should still be gone (from the in-memory store, until server restarts)

## Success Criteria

- [ ] `useTodos` has a `deleteTodo` function that calls `DELETE /api/todos/[id]`
- [ ] State is updated by filtering out the deleted todo
- [ ] `TodoItem` has a visible delete button
- [ ] Deleting a todo removes it from the UI without a page reload
- [ ] The callback chain is complete: `TodoItem` → `TodoList` → `TodoApp` → `useTodos`
- [ ] No TypeScript errors

## Bonus (optional)

Add inline editing: clicking the title text turns it into an `<input>`. On blur or Enter, call a `onEdit(id, newTitle)` callback that calls `PATCH /api/todos/[id]` with `{ title: newTitle }`.

This requires adding a `title` update to the PATCH handler in `app/api/todos/[id]/route.ts`.

When you're done, run `/review-lesson` to get feedback.
