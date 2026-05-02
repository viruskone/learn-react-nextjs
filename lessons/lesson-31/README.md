# Lesson 31 — Testing (Intro)

## Why Test?

Tests give you confidence that your code does what you expect — now and after future changes. Without tests, every refactor is a guessing game.

The three main benefits:
1. **Catch regressions** — a change in one place breaks something else; tests tell you immediately
2. **Document behaviour** — good test names describe what the code does better than comments
3. **Enable refactoring** — you can restructure code freely if tests stay green

---

## The Testing Pyramid

```
        /\
       /  \   E2E Tests (few, slow, expensive)
      /----\
     /      \  Integration Tests
    /--------\
   /          \  Unit Tests (many, fast, cheap)
  /____________\
```

- **Unit tests**: test one function or component in isolation
- **Integration tests**: test multiple pieces working together
- **E2E tests**: test the full app in a real browser

For this lesson, focus on unit and light integration tests.

---

## Tools

### Vitest

Vitest is the modern test runner for Vite-based projects (which Next.js uses). It's faster than Jest and has the same API.

```bash
npm install --save-dev vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### React Testing Library (RTL)

RTL renders components and lets you query the DOM the way a user would — by text, label, role — not by implementation details.

### @testing-library/jest-dom

Adds custom matchers like `.toBeInTheDocument()`, `.toHaveTextContent()`, `.toBeDisabled()`.

---

## Configuration

### `vitest.config.ts`

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

### `vitest.setup.ts`

```ts
import '@testing-library/jest-dom'
```

### `package.json`

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

---

## Writing a Component Test

```tsx
// components/Counter.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Counter } from './Counter'

test('renders initial count', () => {
  render(<Counter initialCount={0} />)
  expect(screen.getByText('0')).toBeInTheDocument()
})

test('increments count when + button clicked', async () => {
  render(<Counter initialCount={0} />)
  await userEvent.click(screen.getByRole('button', { name: '+' }))
  expect(screen.getByText('1')).toBeInTheDocument()
})

test('applies a CSS class when count is negative', () => {
  render(<Counter initialCount={-1} />)
  expect(screen.getByText('-1')).toHaveClass('text-red-500')
})
```

---

## Testing a Custom Hook

Use `renderHook` from RTL to test hooks in isolation:

```tsx
// hooks/useCounter.test.ts
import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

test('initializes with given value', () => {
  const { result } = renderHook(() => useCounter(5))
  expect(result.current.count).toBe(5)
})

test('increments count', () => {
  const { result } = renderHook(() => useCounter(0))
  act(() => { result.current.increment() })
  expect(result.current.count).toBe(1)
})
```

---

## Testing a Pure Reducer

If your reducer is a plain function (from Lesson 10), it's trivially testable without any React tooling:

```ts
// reducers/counterReducer.test.ts
import { counterReducer } from './counterReducer'

test('INCREMENT increases count by 1', () => {
  const state = counterReducer(0, { type: 'INCREMENT' })
  expect(state).toBe(1)
})

test('DECREMENT decreases count by 1', () => {
  const state = counterReducer(5, { type: 'DECREMENT' })
  expect(state).toBe(4)
})

test('RESET returns to zero', () => {
  const state = counterReducer(42, { type: 'RESET' })
  expect(state).toBe(0)
})
```

---

## What NOT to Test

- Implementation details (internal state names, private methods)
- The framework itself (React, Next.js routing)
- Things that would fail if you rename a CSS class — test behaviour, not styling specifics

---

## E2E Testing with Playwright (Brief)

Playwright runs a real browser and simulates real user interactions:

```bash
npm install --save-dev @playwright/test
```

```ts
// e2e/counter.spec.ts
import { test, expect } from '@playwright/test'

test('counter increments on button click', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.click('[aria-label="Increment"]')
  await expect(page.getByText('1')).toBeVisible()
})
```

E2E tests are slow and brittle. Write a few for critical user flows (login, key interactions) and rely on unit tests for everything else.
