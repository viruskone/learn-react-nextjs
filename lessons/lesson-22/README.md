# Lesson 22 — Delete & Update

## Adding Delete

Adding delete is straightforward: add a PATCH for updating (already done) and a DELETE for removing.

The DELETE endpoint returns 204 No Content — there's no body to parse. On the frontend, remove the item from state directly after a successful response:

```tsx
async function removePost(id: string) {
  await fetch(`/api/posts/${id}`, { method: "DELETE" });
  setPosts((prev) => prev.filter((p) => p.id !== id));
}
```

## Passing Delete Down Through the Tree

The delete handler needs to flow down just like any other callback:

```
usePosts (removePost function)
  → App (passes as prop)
    → PostList (onRemove prop, passes to each item)
      → PostCard (calls onRemove(id) on button click)
```

## Adding a Delete Button to the Item Component

```tsx
interface PostCardProps {
  id: string;
  title: string;
  published: boolean;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

function PostCard({ id, title, published, onToggle, onRemove }: PostCardProps) {
  return (
    <li className="flex items-center gap-2">
      <input type="checkbox" checked={published} onChange={() => onToggle(id)} />
      <span className={published ? "line-through flex-1" : "flex-1"}>{title}</span>
      <button onClick={() => onRemove(id)} className="text-red-500">
        Remove
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
    if (confirm("Remove this post?")) onRemove(id);
  }}
>
  Remove
</button>
```

Or use a two-step "click to reveal delete button" approach for a cleaner UI. Keep it simple for now.

## Inline Editing (Optional)

Inline editing is more complex: you need local state in the item component to track edit mode and input value. When the user confirms the edit, call an `onEdit(id, newTitle)` callback. This is good practice but optional at this stage.
