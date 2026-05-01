# Lesson 2 — Props & TypeScript Interfaces

## What are Props?

Props (short for "properties") are how you pass data **into** a component. They work like function arguments.

```tsx
// Parent passes data to child via props
<TodoItem title="Buy milk" completed={false} />
```

Inside the component, props come in as a single object parameter:

```tsx
function TodoItem(props) {
  return <p>{props.title}</p>;
}
```

Usually you destructure them for convenience:

```tsx
function TodoItem({ title, completed }) {
  return <p>{title}</p>;
}
```

## Typing Props with TypeScript

TypeScript shines with React because it catches mistakes at compile time. You define the shape of your props with an `interface`:

```tsx
interface TodoItemProps {
  title: string;
  completed: boolean;
}

function TodoItem({ title, completed }: TodoItemProps) {
  return (
    <div>
      <span>{title}</span>
      <span>{completed ? "Done" : "Pending"}</span>
    </div>
  );
}
```

Now if you forget to pass `title`, or pass a number instead of a string, TypeScript will tell you before you even run the code.

## Optional Props

Add `?` to mark a prop as optional:

```tsx
interface TodoItemProps {
  title: string;
  completed: boolean;
  description?: string; // optional
}
```

You can also provide a default value using destructuring defaults:

```tsx
function TodoItem({ title, completed, description = "No description" }: TodoItemProps) {
  // ...
}
```

## React.FC vs Plain Functions

Two common ways to write components:

```tsx
// Option A: plain function (recommended)
function TodoItem({ title }: TodoItemProps) {
  return <p>{title}</p>;
}

// Option B: React.FC (older style, avoid)
const TodoItem: React.FC<TodoItemProps> = ({ title }) => {
  return <p>{title}</p>;
};
```

Prefer Option A — it's simpler, works better with TypeScript, and is the modern convention.

## Data Flows Down

A key rule in React: **data flows down, events bubble up**. A parent passes props to a child. The child cannot modify those props — they are read-only from the child's perspective.

```
<TodoApp>          ← owns the data
  └── <TodoList>
        └── <TodoItem title="Buy milk" completed={false} />   ← receives data
```

If a child needs to change something, it calls a function passed down as a prop (you'll see this in Lesson 5).
