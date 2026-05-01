# Lesson 4 — Lists & Keys

## Rendering Arrays

In React, you render lists by calling `.map()` on an array and returning JSX for each item:

```tsx
const fruits = ["apple", "banana", "cherry"];

function FruitList() {
  return (
    <ul>
      {fruits.map((fruit) => (
        <li>{fruit}</li>
      ))}
    </ul>
  );
}
```

The `{}` in JSX is an **expression slot** — any valid JavaScript expression can go there.

## The Key Prop

React needs a way to identify each item in a list for efficient re-rendering. That's what the `key` prop is for.

```tsx
{fruits.map((fruit) => (
  <li key={fruit}>{fruit}</li>
))}
```

**Rules for keys:**
- Must be unique among siblings (not globally unique)
- Should be stable (don't use array index if the list can be reordered or filtered)
- Best source: a unique `id` from your data

```tsx
interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

{todos.map((todo) => (
  <TodoItem key={todo.id} title={todo.title} completed={todo.completed} />
))}
```

Why does React need keys? When a list re-renders, React compares old and new elements. Without keys, it has to assume items moved around and re-renders everything. With keys, it can surgically update only what changed.

## Typing Arrays

```tsx
const todos: Todo[] = [
  { id: "1", title: "Buy milk", completed: false },
  { id: "2", title: "Read a book", completed: true },
];
```

Or equivalently: `Array<Todo>`.

## Conditional Rendering

Show different UI based on a condition:

```tsx
// Using ternary
{isLoading ? <Spinner /> : <TodoList todos={todos} />}

// Using && (renders nothing if condition is false)
{todos.length === 0 && <p>No todos yet!</p>}

// Using early return
if (isLoading) return <Spinner />;
return <TodoList todos={todos} />;
```

The `&&` pattern is concise but can cause issues if the left side is `0` (renders "0"). Use ternary when in doubt.

## Defining the Todo Type

It's good practice to define shared types in a dedicated file:

```tsx
// src/types/todo.ts
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
```

Then import it wherever needed. This keeps your types DRY and co-located.
