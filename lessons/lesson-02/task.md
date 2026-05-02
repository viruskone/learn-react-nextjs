# Lesson 2 Task — Props & TypeScript Interfaces

## Goal

Create a `<TodoItem />` component with typed props and use it in your app.

## Steps

### 1. Create the TodoItem component

Create `src/components/TodoItem.tsx`.

Define a `TodoItemProps` interface with:
- `title: string`
- `completed: boolean`

Write a `TodoItem` functional component that:
- Accepts `TodoItemProps`
- Renders the `title` in a `<span>`
- Renders either "✓" or "○" depending on whether `completed` is true or false
- Wraps everything in a `<li>` element

### 2. Create the TodoList component

Create `src/components/TodoList.tsx`.

For now, hardcode 3 `<TodoItem />` components inside a `<ul>`:

<details>
<summary>Show hint</summary>

```tsx
<ul>
  <TodoItem title="Buy milk" completed={false} />
  <TodoItem title="Read a book" completed={true} />
  <TodoItem title="Go for a walk" completed={false} />
</ul>
```

</details>

### 3. Wire it up

Update `src/components/TodoApp.tsx` to render `<TodoList />` instead of the placeholder paragraph.

## Success Criteria

- [ ] `TodoItem.tsx` has a `TodoItemProps` interface with `title: string` and `completed: boolean`
- [ ] `TodoItem` renders both `title` and a completion indicator
- [ ] `TodoList.tsx` renders a `<ul>` with 3 `<TodoItem />` components
- [ ] `TodoApp.tsx` renders `<TodoList />`
- [ ] No TypeScript errors
- [ ] The page displays 3 todo items in the browser

## Hints

- Import components with the `@/` alias: `import TodoItem from "@/components/TodoItem";`
- The completion indicator can be any visual distinction — a checkmark, a strikethrough, a different color. Keep it simple for now.

When you're done, run `/review-lesson` to get feedback.
