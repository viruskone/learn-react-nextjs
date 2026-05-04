# Task — Lesson 8: useRef & DOM Refs

## Goal

Improve the Add Todo form's UX: after the user adds a todo, auto-focus the text input so they can immediately type the next one.

---

## Steps

1. **Open `TodoApp.tsx`** (or wherever your Add Todo form lives)

2. **Import `useRef`** from React

<details>
<summary>Show hint</summary>

```tsx
import { useState, useRef } from 'react'
```

</details>

3. **Create the ref** for the input element

<details>
<summary>Show hint</summary>

```tsx
const inputRef = useRef<HTMLInputElement>(null)
```

</details>

4. **Attach it** to the `<input>` element

<details>
<summary>Show hint</summary>

```tsx
<input ref={inputRef} value={text} onChange={...} />
```

</details>

5. **After adding a todo**, call `focus()` via the ref

<details>
<summary>Show hint</summary>

```tsx
function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  // your existing add-todo logic here
  setText('')
  inputRef.current?.focus()
}
```

</details>

---

## Success Criteria

- [ ] After submitting the form, the cursor automatically returns to the input
- [ ] The input ref is typed correctly as `useRef<HTMLInputElement>(null)`
- [ ] No TypeScript errors
- [ ] The `focus()` call uses optional chaining (`?.`) — don't assert `!`
- [ ] The existing add-todo behaviour (adding to list, clearing input) still works

---

## Hints

- `inputRef.current` will be `null` before the component mounts — that's why `?.focus()` is safer than `!.focus()`
- You don't need to call `focus()` on initial render; only after a submission
- If your form is in a separate `AddTodoForm` component rather than `TodoApp`, put the ref there

---

## Bonus (optional)

Use a second `useRef` to store whether the component has mounted, and only focus on submission (not on the very first render). This isn't needed here, but it's a common pattern.

---

When you're done, run `/review-lesson` to get feedback.
