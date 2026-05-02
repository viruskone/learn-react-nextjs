# Lesson 2 — Props & TypeScript Interfaces

## What are Props?

Props (short for "properties") are how you pass data **into** a component. They work like function arguments.

```tsx
// Parent passes data to child via props
<BookCard title="Clean Code" author="Robert Martin" />
```

Inside the component, props come in as a single object parameter:

```tsx
function BookCard(props) {
  return <p>{props.title}</p>;
}
```

Usually you destructure them for convenience:

```tsx
function BookCard({ title, author }) {
  return <p>{title} by {author}</p>;
}
```

## Typing Props with TypeScript

TypeScript shines with React because it catches mistakes at compile time. You define the shape of your props with an `interface`:

```tsx
interface BookCardProps {
  title: string;
  author: string;
}

function BookCard({ title, author }: BookCardProps) {
  return (
    <div>
      <span>{title}</span>
      <span>{author}</span>
    </div>
  );
}
```

Now if you forget to pass `title`, or pass a number instead of a string, TypeScript will tell you before you even run the code.

## Optional Props

Add `?` to mark a prop as optional:

```tsx
interface BookCardProps {
  title: string;
  author: string;
  year?: number; // optional
}
```

You can also provide a default value using destructuring defaults:

```tsx
function BookCard({ title, author, year = 0 }: BookCardProps) {
  // ...
}
```

## React.FC vs Plain Functions

Two common ways to write components:

```tsx
// Option A: plain function (recommended)
function BookCard({ title }: BookCardProps) {
  return <p>{title}</p>;
}

// Option B: React.FC (older style, avoid)
const BookCard: React.FC<BookCardProps> = ({ title }) => {
  return <p>{title}</p>;
};
```

Prefer Option A — it's simpler, works better with TypeScript, and is the modern convention.

## Data Flows Down

A key rule in React: **data flows down, events bubble up**. A parent passes props to a child. The child cannot modify those props — they are read-only from the child's perspective.

```
<BookshelfApp>          ← owns the data
  └── <BookList>
        └── <BookCard title="Clean Code" author="Robert Martin" />   ← receives data
```

If a child needs to change something, it calls a function passed down as a prop (you'll see this in Lesson 5).
