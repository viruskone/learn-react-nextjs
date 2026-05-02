# Lesson 9 — Custom Hooks

## What is a Custom Hook?

A custom hook is a regular JavaScript function whose name starts with `use` and that calls other hooks inside it. That's the whole definition — no magic.

Custom hooks let you **extract and reuse stateful logic** across components, without duplicating code or using inheritance.

## When to Write One

If you find yourself copying the same `useState` + `useEffect` block into multiple components, that's a signal to extract it into a custom hook.

Even if you only use it in one place, it can make a component much cleaner by moving the "how" out of the "what".

## Example: useCounter

Imagine a component that has a count, can increment, decrement, and reset. All of that logic can move into a `useCounter` hook:

```tsx
// src/hooks/useCounter.ts
import { useState } from "react";

export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);

  function increment() {
    setCount((c) => c + 1);
  }

  function decrement() {
    setCount((c) => c - 1);
  }

  function reset() {
    setCount(initial);
  }

  return { count, increment, decrement, reset };
}
```

Now the component that uses it becomes clean:

```tsx
function CounterWidget() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

## Rules of Hooks

All hooks (including custom ones) must follow these rules:
1. **Only call hooks at the top level** — not inside loops, conditions, or nested functions.
2. **Only call hooks from React functions** — not from regular utility functions.

These rules exist because React relies on the order hooks are called to track state correctly.

## What Can a Custom Hook Return?

Anything you want — an object, an array, a single value, or nothing. The common convention is to return an object with named properties (like `{ count, increment, decrement }`) because it makes usage at the call site self-documenting.
