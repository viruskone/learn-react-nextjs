Grade the student's work for their current lesson.

## Steps

1. Read `todo-app/lesson-progress.json`.
   - Get `currentLesson` to know which lesson to grade.
   - If the file doesn't exist, ask the student which lesson they're on.

2. Read `lessons/lesson-NN/task.md` to get the exact requirements.
   - NN = zero-padded current lesson number.

3. Read the student's code in `todo-app/`:
   - Explore relevant files based on what the task requires (components, pages, hooks, etc.)
   - Use `find todo-app/src -name "*.tsx" -o -name "*.ts"` to discover files or LSP to find references and code
   - Read each relevant file carefully

4. Compare the student's code to the task requirements and produce a grading report:

---
## Review: Lesson N — [Title]

### ✅ What you did well
[List specific things the student did correctly — be concrete, name files/functions]

### ❌ What needs work
[List specific gaps or errors — be precise, reference line numbers or file names if possible]

### 💡 Hint
[Give ONE targeted hint toward the most important missing piece — do NOT give the full solution]

### 🎯 Score
[Choose one: **Needs Work** / **Good** / **Excellent**]

---

5. After delivering the report, update `todo-app/lesson-progress.json`:
   - If score is **Good** or **Excellent**: mark the lesson as `"completed"` with `completedAt` = today's date.
   - If score is **Needs Work**: leave the status as `"in_progress"`.

6. After updating the progress file, follow up based on the score:
   - If score is **Excellent**: Offer to show the full reference approach and suggest running `/start-lesson` to move on.
   - If score is **Good**: Congratulate the student, note any remaining polish items, and suggest running `/start-lesson` to move on.
   - If score is **Needs Work**: Be encouraging but honest. Point to the most important thing to fix first and ask them to re-run `/review-lesson`.

## Rules
- Never show the full solution unless the score is Excellent OR the student explicitly asks "show me the solution".
- Never be harsh. The student is learning. Frame problems as opportunities.
- Keep the report concise — use bullet points.
- If the `todo-app/` folder doesn't have a Next.js project yet (Lessons 1+), prompt the student to run `npx create-next-app@latest todo-app --typescript --tailwind --app --src-dir --import-alias "@/*"` first.
