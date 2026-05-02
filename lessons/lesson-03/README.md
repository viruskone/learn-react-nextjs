# Lesson 3 — State & Event Handling

## What is State?

Props are data passed in from outside. State is data that lives **inside** a component and can change over time.

When state changes, React automatically re-renders the component to reflect the new value. This is the magic of React — you update state and the UI updates itself.

## useState Hook

```tsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

`useState(0)` returns a tuple: `[currentValue, setterFunction]`. The setter triggers a re-render.

**Never mutate state directly:**
```tsx
// Wrong
count = count + 1;

// Correct
setCount(count + 1);
```

React won't know anything changed if you mutate directly.

## Typing State

TypeScript can usually infer the type from the initial value:

```tsx
const [count, setCount] = useState(0);         // inferred as number
const [name, setName] = useState("");           // inferred as string
const [done, setDone] = useState(false);        // inferred as boolean
```

When the type can't be inferred (e.g., initial value is `null`), be explicit:

```tsx
const [user, setUser] = useState<User | null>(null);
```

## Event Handling

React uses camelCase event names and passes a synthetic event object:

```tsx
function MyInput() {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
  }

  return <input onChange={handleChange} />;
}
```

Common event types:
| Element | Event | Type |
|---------|-------|------|
| `<button>` | `onClick` | `React.MouseEvent<HTMLButtonElement>` |
| `<input>` | `onChange` | `React.ChangeEvent<HTMLInputElement>` |
| `<form>` | `onSubmit` | `React.FormEvent<HTMLFormElement>` |

You can also use inline arrow functions for simple cases:

```tsx
<button onClick={() => setCompleted(!completed)}>Toggle</button>
```

## Immutability

React state must be treated as immutable — you never modify it directly, you always create a new value:

```tsx
// Wrong: mutating an array directly
items.push(newItem);
setItems(items);

// Correct: create a new array
setItems([...items, newItem]);
```

This is important because React uses reference equality to detect changes. If you mutate the original, React sees the same reference and skips re-rendering.
