# Lesson 4 Task — Lists & Keys

## Goal

Replace the hardcoded `<TodoItem />` components with a dynamic list rendered from an array.

## Steps

### 1. Create the Todo type

Create `src/types/todo.ts`:

<details>
<summary>Show hint</summary>

```ts
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
```

</details>

### 2. Update TodoList to accept an array prop

Update `src/components/TodoList.tsx`:
- Add a `TodoListProps` interface with `todos: Todo[]`
- Accept `todos` as a prop
- Use `.map()` to render a `<TodoItem />` for each todo
- Pass the `todo.id` as the `key` prop
- Remove the hardcoded items

### 3. Define the data in TodoApp

Update `src/components/TodoApp.tsx`:
- Define a hardcoded `todos` array of type `Todo[]` with at least 4 items (mix of completed and not)
- Pass it to `<TodoList todos={todos} />`

### 4. Handle the empty state

In `TodoList`, if the `todos` array is empty, render:
<details>
<summary>Show hint</summary>

```tsx
<p>No todos yet!</p>
```

</details>
instead of the `<ul>`.

### 5. Update the count in TodoApp

Update the text to show the real count:
<details>
<summary>Show hint</summary>

```tsx
<p>You have {todos.length} todos.</p>
```

</details>

## Success Criteria

- [ ] `src/types/todo.ts` exists with a `Todo` interface
- [ ] `TodoList` accepts `todos: Todo[]` as a prop
- [ ] List is rendered with `.map()` and each item has a unique `key` (using `todo.id`)
- [ ] No hardcoded `<TodoItem />` in `TodoList`
- [ ] Empty state is handled
- [ ] The count in `TodoApp` reflects the actual array length
- [ ] No TypeScript errors

## Hints

- Import your type: `import type { Todo } from "@/types/todo";`
- The `key` prop goes on the outermost element returned from `.map()`, which is `<TodoItem />`.
- If you use the array index as a key, the review will flag it — use `todo.id` instead.

When you're done, run `/review-lesson` to get feedback.
