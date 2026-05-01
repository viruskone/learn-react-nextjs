# Lesson 6 — Forms & Controlled Inputs

## Controlled vs Uncontrolled Inputs

In HTML, an input manages its own value internally. In React, you can take control of that value by tying it to state — this is called a **controlled input**.

```tsx
// Uncontrolled: React doesn't know the value
<input type="text" />

// Controlled: React owns the value
const [text, setText] = useState("");
<input type="text" value={text} onChange={(e) => setText(e.target.value)} />
```

With a controlled input:
- `value` is always the React state
- `onChange` updates the state on every keystroke
- The input re-renders on every state change

This gives React full control — you can validate, transform, or react to the value at any point.

## Handling Form Submission

Use `onSubmit` on a `<form>` element. Always call `event.preventDefault()` to stop the browser from reloading the page:

```tsx
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  // do something with the input value
}

return <form onSubmit={handleSubmit}>...</form>;
```

## Generating Unique IDs

When you add a new todo, it needs a unique `id`. A simple option is `crypto.randomUUID()` — it's built into modern browsers and Node.js:

```tsx
const newTodo: Todo = {
  id: crypto.randomUUID(),
  title: text.trim(),
  completed: false,
};
```

## Clearing the Input After Submit

After adding a todo, reset the input by setting state back to `""`:

```tsx
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  if (!text.trim()) return; // don't add empty todos
  setTodos([...todos, { id: crypto.randomUUID(), title: text.trim(), completed: false }]);
  setText(""); // clear the input
}
```

## Lifting the Add Logic Up

The form component should not manage the todos array — that lives in `TodoApp`. Instead, the form receives an `onAdd` callback:

```tsx
interface AddTodoFormProps {
  onAdd: (title: string) => void;
}

function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a todo..." />
      <button type="submit">Add</button>
    </form>
  );
}
```
