# Lesson 5 — Lifting State Up

## The Problem

In Lesson 3, each `TodoItem` managed its own `isCompleted` state. That worked for toggling the visual state, but it means the parent has no idea whether a todo is actually completed. If you want to show "You have 2 completed todos", you can't — the data is locked inside each `TodoItem`.

This is a common React problem: **sibling or parent components need to share state**.

## The Solution: Lift State Up

Move the state to the **closest common ancestor** of the components that need it. Pass the data down as props, and pass callback functions down so children can request changes.

```
Before:
  <TodoApp>
    <TodoList>
      <TodoItem> [isCompleted state lives here] </TodoItem>

After:
  <TodoApp> [todos state lives here]
    <TodoList todos={todos} onToggle={handleToggle}>
      <TodoItem completed={todo.completed} onToggle={() => handleToggle(todo.id)}>
```

## Passing Callbacks as Props

A child component can't modify the parent's state directly. Instead, the parent passes down a function, and the child calls it when something happens:

```tsx
interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle: (id: string) => void;  // callback
}

function TodoItem({ id, title, completed, onToggle }: TodoItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />
      <span className={completed ? "line-through" : ""}>{title}</span>
    </li>
  );
}
```

## Immutable State Updates

When toggling an item in an array, you can't mutate the array. Create a new one:

```tsx
function handleToggle(id: string) {
  setTodos(
    todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
}
```

The spread `{ ...todo }` copies all properties, then `completed: !todo.completed` overrides just the one you need.

## Single Source of Truth

The state now lives in one place (`TodoApp`). Every component that needs the data reads it from props. This makes the data flow predictable and easy to debug — you always know where to look.
