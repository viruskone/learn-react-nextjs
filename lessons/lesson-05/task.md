# Lesson 5 Task — Lifting State Up

## Goal

Move the todo state up to `TodoApp` and wire up toggle callbacks so the whole component tree shares one source of truth.

## Steps

### 1. Move state to TodoApp

Update `src/components/TodoApp.tsx`:
- Move the `todos` array into `useState`:
  ```tsx
  const [todos, setTodos] = useState<Todo[]>([...your hardcoded todos...]);
  ```
- Write a `handleToggle(id: string)` function that updates the todo with the matching id, flipping its `completed` value.

### 2. Pass toggle callback through TodoList

Update `src/components/TodoList.tsx`:
- Add `onToggle: (id: string) => void` to `TodoListProps`
- Pass it down to each `<TodoItem />`

### 3. Remove local state from TodoItem

Update `src/components/TodoItem.tsx`:
- Remove the `useState` for `isCompleted`
- Add `id: string` and `onToggle: (id: string) => void` to `TodoItemProps`
- The `completed` prop now directly controls the checkbox's `checked` value
- Call `onToggle(id)` in the checkbox `onChange`

### 4. Show a completed count

In `TodoApp`, compute and display how many todos are completed:

```tsx
const completedCount = todos.filter((t) => t.completed).length;
```

Display it: `"You have {completedCount} of {todos.length} todos completed."`

## Success Criteria

- [ ] `todos` state lives in `TodoApp` (not in `TodoItem`)
- [ ] `TodoItem` no longer has any `useState`
- [ ] Toggling a checkbox in the browser updates the state in `TodoApp` (verifiable via the count updating)
- [ ] `handleToggle` creates a new array (does not mutate the original)
- [ ] The completed count updates when checkboxes are toggled
- [ ] No TypeScript errors

## Hints

- `{ ...todo, completed: !todo.completed }` is the pattern for updating one field of an object immutably.
- The data flow is: `TodoApp` (state) → `TodoList` (props) → `TodoItem` (props).
- The event flow is: `TodoItem` (calls `onToggle`) → `TodoList` (passes through) → `TodoApp` (updates state).

When you're done, run `/review-lesson` to get feedback.
