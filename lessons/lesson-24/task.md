# Lesson 24 Task — Styling with Tailwind CSS

## Goal

Style the entire Todo App to look clean and polished using Tailwind CSS.

## Steps

### 1. Install clsx

```bash
npm install clsx
```

### 2. Style TodoItem

Update `src/components/TodoItem.tsx` to look like a proper list item:
- Use `flex items-center gap-3` for the row layout
- Style the checkbox
- Apply `line-through text-gray-400` when `completed` is true (use `clsx`)
- Style the delete button with `text-red-400 hover:text-red-600 ml-auto`

### 3. Style TodoList

Update `src/components/TodoList.tsx`:
- Wrap items in `<ul className="space-y-2">`
- Add a subtle divider or border between items

### 4. Style AddTodoForm

Update `src/components/AddTodoForm.tsx`:
- Style the input: `border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400`
- Style the button: `bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:scale-95`
- Use `flex gap-2` for the form layout

### 5. Style TodoApp

Update `src/components/TodoApp.tsx`:
- Wrap in a card: `bg-white rounded-xl shadow-md p-6 max-w-lg w-full mx-auto mt-8`
- Style the heading: `text-2xl font-bold text-gray-800 mb-4`
- Add spacing between form and list: `space-y-6`

### 6. Style the Navbar

Update `src/components/Navbar.tsx`:
- Add a `bg-white border-b shadow-sm` navbar
- Style links: `text-gray-600 hover:text-gray-900 px-4 py-3`
- Active link: `font-semibold text-blue-600`

### 7. Add a background to the page

Update `src/app/page.tsx` to give the page a background:
```tsx
<div className="min-h-screen bg-gray-50 p-4">
  <TodoApp />
</div>
```

## Success Criteria

- [ ] `clsx` is installed and used for conditional classes
- [ ] `TodoItem` looks polished — good spacing, clear completed state styling
- [ ] `AddTodoForm` has a styled input and button
- [ ] `TodoApp` is in a centered card
- [ ] Navbar looks professional
- [ ] The app looks good on both mobile and desktop (test by resizing the window)
- [ ] No TypeScript errors

## Design Tips

- Consistency matters — use the same spacing scale (multiples of 4px: `p-1`=4px, `p-2`=8px, `p-4`=16px)
- Gray-100 to gray-900 for neutral elements
- Blue-500 as your primary action color
- Red for destructive actions (delete)

When you're done, run `/review-lesson` to get feedback.
