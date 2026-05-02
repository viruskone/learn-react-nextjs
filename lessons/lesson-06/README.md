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

When you add a new item, it needs a unique `id`. A simple option is `crypto.randomUUID()` — it's built into modern browsers and Node.js:

```tsx
const newItem = {
  id: crypto.randomUUID(),
  text: input.trim(),
};
```

## Clearing the Input After Submit

After submission, reset the input by setting state back to `""`:

```tsx
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  if (!text.trim()) return; // ignore empty input
  setItems([...items, { id: crypto.randomUUID(), text: text.trim() }]);
  setText(""); // clear the input
}
```

## Lifting the Submit Logic Up

The form component should not manage the parent's data array. Instead, it receives a callback:

```tsx
interface CommentFormProps {
  onSubmit: (text: string) => void;
}

function CommentForm({ onSubmit }: CommentFormProps) {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a comment..." />
      <button type="submit">Post</button>
    </form>
  );
}
```
