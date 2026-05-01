# Lesson 22 — Delete & Update

## Adding Delete

Adding delete is straightforward: add a PATCH for toggling (already done) and a DELETE for removing.

The DELETE endpoint returns 204 No Content — there's no body to parse. On the frontend, remove the todo from state directly after a successful response:

```tsx
async function deleteTodo(id: string) {
  await fetch(`/api/todos/${id}`, { method: "DELETE" });
  setTodos((prev) => prev.filter((t) => t.id !== id));
}
```

## Passing Delete Down Through the Tree

The delete handler needs to flow down just like the toggle handler did:

```
useTodos (deleteTodo function)
  → TodoApp (passes as prop)
    → TodoList (onDelete prop, passes to each item)
      → TodoItem (calls onDelete(id) on button click)
```

## Adding a Delete Button to TodoItem

```tsx
interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TodoItem({ id, title, completed, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center gap-2">
      <input type="checkbox" checked={completed} onChange={() => onToggle(id)} />
      <span className={completed ? "line-through flex-1" : "flex-1"}>{title}</span>
      <button onClick={() => onDelete(id)} className="text-red-500">
        Delete
      </button>
    </li>
  );
}
```

## Preventing Accidental Deletes

A common UX pattern is to ask for confirmation:

```tsx
<button
  onClick={() => {
    if (confirm("Delete this todo?")) onDelete(id);
  }}
>
  Delete
</button>
```

Or use a two-step "click to reveal delete button" approach for a cleaner UI. Keep it simple for now.

## Inline Editing (Optional)

Inline editing is more complex: you need local state in `TodoItem` to track the edit mode and input value. When the user confirms the edit, call a `onEdit(id, newTitle)` callback. This is good practice but optional at this stage.
