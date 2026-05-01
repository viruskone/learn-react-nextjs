# Task — Lesson 31: Testing (Intro)

## Goal

Set up Vitest and React Testing Library. Write unit tests for `TodoItem` and the `todoReducer`.

---

## Steps

1. **Install testing dependencies**:
   ```bash
   npm install --save-dev vitest @vitejs/plugin-react jsdom \
     @testing-library/react @testing-library/jest-dom @testing-library/user-event
   ```

2. **Create `vitest.config.ts`** at the project root:
   ```ts
   import { defineConfig } from 'vitest/config'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     test: {
       environment: 'jsdom',
       setupFiles: ['./vitest.setup.ts'],
       globals: true,
     },
   })
   ```

3. **Create `vitest.setup.ts`** at the project root:
   ```ts
   import '@testing-library/jest-dom'
   ```

4. **Add test scripts to `package.json`**:
   ```json
   "scripts": {
     "test": "vitest",
     "test:run": "vitest run"
   }
   ```

5. **Write tests for `TodoItem`**

   Create `components/TodoItem.test.tsx`:
   - Test that it renders the todo text
   - Test that clicking calls `onToggle` with the correct ID
   - Test that a completed todo has a visual difference (class, style, or strikethrough text)

6. **Write tests for `todoReducer`**

   Create `reducers/todoReducer.test.ts` (or alongside wherever your reducer lives):
   - Test `ADD_TODO` adds an item with the correct text and `completed: false`
   - Test `TOGGLE_TODO` flips the completed flag
   - Test `DELETE_TODO` removes the item

7. **Run the tests**:
   ```bash
   npm test
   ```
   All tests should pass.

---

## Success Criteria

- [ ] `vitest.config.ts` and `vitest.setup.ts` exist at the project root
- [ ] `npm test` runs and all tests pass
- [ ] At least 2 tests for `TodoItem` (renders, click handler)
- [ ] At least 3 tests for `todoReducer` (add, toggle, delete)
- [ ] Tests use `screen.getBy*` queries, not `container.querySelector`
- [ ] No TypeScript errors in test files

---

## Hints

- `vi.fn()` creates a mock function (like `jest.fn()`) — use it for `onToggle` and `onDelete` callbacks
- `userEvent.click()` is async — always `await` it
- If `todoReducer` is inside a hook and not exported separately, export it first — pure functions are easy to test independently
- The `globals: true` config in vitest means you don't need to import `test`, `expect`, `vi` — they're available globally (same as Jest behaviour)
- If TypeScript complains about `vi` not being found, add `"types": ["vitest/globals"]` to `tsconfig.json`

---

## Bonus (optional)

Add one test using `renderHook` for `useTodos` (or `useTodoContext`). Test that `addTodo` adds an item to the list.

---

When you're done, run `/review-lesson` to get feedback.
