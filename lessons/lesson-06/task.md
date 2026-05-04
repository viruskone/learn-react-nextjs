# Lesson 6 Task — Forms & Controlled Inputs

## Goal

Add a form that lets the user type a new todo title and add it to the list.

## Steps

### 1. Create AddTodoForm component

Create `src/components/AddTodoForm.tsx`:
- Props: `onAdd: (title: string) => void`
- Local state: `text` (string, initialized to `""`)
- Controlled `<input>` bound to `text`
- `<form>` with `onSubmit` handler that:
  - Calls `event.preventDefault()`
  - Ignores empty/whitespace-only input
  - Calls `onAdd(text.trim())`
  - Clears the input (`setText("")`)
- A `<button type="submit">` to submit the form

### 2. Handle adding in TodoApp

Update `src/components/TodoApp.tsx`:
- Write a `handleAdd(title: string)` function that appends a new `Todo` to the state:

<details>
<summary>Show hint</summary>

```ts
{ id: crypto.randomUUID(), title, completed: false }
```

</details>

- Render `<AddTodoForm onAdd={handleAdd} />` above `<TodoList />`

### 3. Verify in the browser

- Type something and click Add (or press Enter)
- The new todo should appear in the list
- The input should clear after adding
- Adding an empty string should do nothing

## Success Criteria

- [ ] `AddTodoForm.tsx` exists with correct props interface
- [ ] Input is controlled (value + onChange)
- [ ] `event.preventDefault()` is called in the submit handler
- [ ] Empty input is ignored
- [ ] New todos appear in the list without a page reload
- [ ] Input clears after adding
- [ ] New todos use `crypto.randomUUID()` for the id
- [ ] No TypeScript errors

## Hints

- The form component does NOT manage `todos` — it only manages its own input text.
- Press Enter in an input inside a `<form>` triggers the form's `onSubmit` automatically.
- `text.trim()` removes leading/trailing spaces; `!text.trim()` is falsy for empty strings.

When you're done, run `/review-lesson` to get feedback.
