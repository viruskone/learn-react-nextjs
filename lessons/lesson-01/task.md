# Lesson 1 Task — Project Setup & First Component

## Goal

Bootstrap the Next.js project and create your first React component.

## Steps

### 1. Bootstrap the project

Inside the `todo-app/` folder (which already exists), run:

```bash
cd todo-app
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
```

Note the `.` — this creates the project in the current folder instead of a subfolder.

Answer the prompts (just hit Enter for defaults if unsure).

### 2. Start the dev server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser. You should see the default Next.js welcome page.

### 3. Clean up the default page

Open `src/app/page.tsx`. Delete everything inside the returned JSX and replace it with a simple heading:

```tsx
export default function Home() {
  return (
    <main>
      <h1>My Todo App</h1>
    </main>
  );
}
```

### 4. Create your first component

Create a new file: `src/components/TodoApp.tsx`

In it, write a functional component called `TodoApp` that renders:
- An `<h1>` with the text "My Todos"
- A `<p>` with the text "You have 0 todos."

Export it as the default export.

### 5. Use the component in the page

Import `<TodoApp />` into `src/app/page.tsx` and render it inside `<main>`.

## Success Criteria

- [ ] `npm run dev` runs without errors
- [ ] `http://localhost:3000` shows your component (not the default Next.js page)
- [ ] `TodoApp.tsx` exists in `src/components/`
- [ ] `TodoApp` is a functional component that renders valid JSX
- [ ] The page renders "My Todos" and "You have 0 todos."
- [ ] No TypeScript errors

## Hints

- Component names must start with a capital letter.
- The file extension for React + TypeScript files is `.tsx`.
- To import a component: `import TodoApp from "@/components/TodoApp";`

When you're done, run `/review-lesson` to get feedback.
