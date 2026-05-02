# Lesson 3 Task — State & Event Handling

## Goal

Make `TodoItem` interactive — clicking a checkbox should toggle its `completed` state locally.

## Steps

### 1. Add local state to TodoItem

Update `src/components/TodoItem.tsx`.

Add a `useState` hook that tracks `isCompleted` locally, initialized from the `completed` prop:

<details>
<summary>Show hint</summary>

```tsx
const [isCompleted, setIsCompleted] = useState(completed);
```

</details>

### 2. Add a checkbox

Replace your completion indicator with an `<input type="checkbox" />`:
- Its `checked` attribute should reflect `isCompleted`
- Its `onChange` should toggle `isCompleted` using `setIsCompleted`

### 3. Add visual feedback for completed state

When `isCompleted` is true, apply a strikethrough style to the title.

You can use a Tailwind class: `line-through` or inline style `{ textDecoration: 'line-through' }`.

Use a ternary or conditional class:
<details>
<summary>Show hint</summary>

```tsx
<span className={isCompleted ? "line-through" : ""}>
  {title}
</span>
```

</details>

### 4. Verify in the browser

Start the dev server and check that:
- Each todo item has a checkbox
- Clicking the checkbox toggles the strikethrough on the title
- Each todo item's state is independent (checking one doesn't affect others)

## Success Criteria

- [ ] `TodoItem` uses `useState` to track `isCompleted`
- [ ] A checkbox is rendered and its `checked` is bound to `isCompleted`
- [ ] Toggling the checkbox updates the visual state of the title
- [ ] Each `TodoItem` manages its own independent state
- [ ] No TypeScript errors
- [ ] `React.ChangeEvent<HTMLInputElement>` is used as the type for the checkbox onChange handler (or you're using an inline arrow function)

## Hints

- The `onChange` on a checkbox gives you `event.target.checked` (not `.value`).
- Alternatively: `onChange={() => setIsCompleted(!isCompleted)}` is simpler.
- Don't remove `completed` from `TodoItemProps` — it's still needed to initialize state.

When you're done, run `/review-lesson` to get feedback.
