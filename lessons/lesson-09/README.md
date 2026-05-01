# Lesson 9 — Custom Hooks

## What is a Custom Hook?

A custom hook is a regular JavaScript function whose name starts with `use` and that calls other hooks inside it. That's the whole definition — no magic.

Custom hooks let you **extract and reuse stateful logic** across components, without duplicating code or using inheritance.

## When to Write One

If you find yourself copying the same `useState` + `useEffect` block into multiple components, that's a signal to extract it into a custom hook.

Even if you only use it in one place, it can make a component much cleaner by moving the "how" out of the "what".

## Example: useTodos

Your `TodoApp` has grown to contain quite a bit of logic: state initialization, persistence, toggle handler, add handler. All of that can move into a `useTodos` hook:

```tsx
// src/hooks/useTodos.ts
import { useState, useEffect } from "react";
import type { Todo } from "@/types/todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem("todos");
    return raw ? (JSON.parse(raw) as Todo[]) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title: string) {
    setTodos([...todos, { id: crypto.randomUUID(), title, completed: false }]);
  }

  function toggleTodo(id: string) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  return { todos, addTodo, toggleTodo };
}
```

Now `TodoApp` becomes clean:

```tsx
function TodoApp() {
  const { todos, addTodo, toggleTodo } = useTodos();

  return (
    <div>
      <h1>My Todos</h1>
      <AddTodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} />
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

Anything you want — an object, an array, a single value, or nothing. The common convention is to return an object with named properties (like `{ todos, addTodo, toggleTodo }`) because it makes usage at the call site self-documenting.
