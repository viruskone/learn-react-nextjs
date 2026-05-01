# Lesson 1 — Project Setup & First Component

## What is React?

React is a JavaScript library for building user interfaces. Instead of manually manipulating the DOM (`document.getElementById`, `innerHTML`, etc.), you describe **what the UI should look like** as a function of your data, and React handles updating the DOM for you.

The core idea: **UI = f(state)**. Your component is a function that receives data and returns a description of the UI.

## What is Next.js?

Next.js is a framework built on top of React. React alone is just a UI library — it doesn't tell you how to route between pages, fetch data, or serve HTML. Next.js gives you all of that, plus server-side rendering, file-based routing, and API routes out of the box.

Think of it this way: React is the engine, Next.js is the car.

## JSX vs TSX

JSX is the syntax that looks like HTML inside JavaScript:

```jsx
// This is JSX (JavaScript)
function Hello() {
  return <h1>Hello world</h1>;
}
```

TSX is the same thing but in TypeScript:

```tsx
// This is TSX (TypeScript) — same syntax, but the file ends in .tsx
function Hello() {
  return <h1>Hello world</h1>;
}
```

JSX/TSX is NOT HTML. It gets compiled down to `React.createElement()` calls. The main differences from HTML:
- Use `className` instead of `class`
- Use `htmlFor` instead of `for`
- All tags must be closed: `<img />` not `<img>`
- Expressions go in curly braces: `<p>{name}</p>`

## Functional Components

A React component is just a function that returns JSX. The name must start with a capital letter.

```tsx
function TodoApp() {
  return (
    <div>
      <h1>My Todos</h1>
    </div>
  );
}

export default TodoApp;
```

That's it. No classes, no lifecycle methods — just a function.

## The Render Tree

When React runs your app, it builds a tree of components. The root is usually `<App />` (or in Next.js, the root `layout.tsx`). Each component can contain other components, forming a tree:

```
<TodoApp>
  └── <TodoList>
        ├── <TodoItem />
        ├── <TodoItem />
        └── <TodoItem />
```

React re-renders parts of this tree when data changes — but only the parts that need to update.

## Next.js App Router

With the App Router (Next.js 13+), your pages live in the `app/` directory. A file called `app/page.tsx` becomes the `/` route. A file called `app/about/page.tsx` becomes the `/about` route. Simple.

```
app/
  layout.tsx    ← wraps every page (like a shell/frame)
  page.tsx      ← the / route
  about/
    page.tsx    ← the /about route
```

## Bootstrapping the Project

Run this command to create your Next.js project:

```bash
npx create-next-app@latest todo-app --typescript --tailwind --app --src-dir --import-alias "@/*"
```

Options explained:
- `--typescript` — use TypeScript
- `--tailwind` — include Tailwind CSS
- `--app` — use the App Router
- `--src-dir` — put source files in `src/`
- `--import-alias "@/*"` — lets you import with `@/components/...` instead of `../../components/...`
