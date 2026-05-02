# Lesson 7 — useEffect & Side Effects

## What is a Side Effect?

A React component's job is to render UI. Anything that reaches outside of that — network requests, timers, DOM manipulation, reading/writing localStorage — is a **side effect**.

You can't do side effects directly in the component body because the body runs on every render. `useEffect` is the hook that lets you run side-effect code at the right time.

## useEffect Basics

```tsx
import { useEffect } from "react";

useEffect(() => {
  // runs after render
  console.log("Component rendered");
});
```

## The Dependency Array

The second argument controls **when** the effect runs:

```tsx
// No array: runs after EVERY render
useEffect(() => { ... });

// Empty array: runs ONCE after mount (like componentDidMount)
useEffect(() => { ... }, []);

// With deps: runs after mount AND whenever any dep changes
useEffect(() => { ... }, [value]);
```

If you read a variable inside the effect, it should be in the dependency array. The linter will warn you if you miss one.

## localStorage Persistence

`localStorage` is a browser API that stores key-value pairs that survive page reloads.

```ts
// Write
localStorage.setItem("notes", JSON.stringify(notes));

// Read
const raw = localStorage.getItem("notes");
const notes = raw ? JSON.parse(raw) : [];
```

Since it's a side effect, both read and write go inside `useEffect`.

## Restoring State on Mount

To load from `localStorage` when the app starts, use a **lazy initializer** in `useState`:

```tsx
const [notes, setNotes] = useState<string[]>(() => {
  if (typeof window === "undefined") return [];  // SSR guard
  const raw = localStorage.getItem("notes");
  return raw ? (JSON.parse(raw) as string[]) : [];
});
```

The function passed to `useState` runs only once (on mount), which is exactly what you want for initialization.

## Persisting on Change

Use `useEffect` with the state variable as a dependency to save whenever it changes:

```tsx
useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(notes));
}, [notes]);
```

## Cleanup

Effects can return a cleanup function. React calls it before the effect runs again and before the component unmounts:

```tsx
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id); // cleanup
}, []);
```

For localStorage, no cleanup is needed.

## SSR Gotcha

Next.js renders components on the server too. `localStorage` doesn't exist on the server. Always guard against it:

```tsx
if (typeof window === "undefined") return [];
```
