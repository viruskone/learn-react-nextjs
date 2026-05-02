Start or advance to a lesson in the React/Next.js course.

## Usage
- `/start-lesson` — advance to the next lesson (mark current as completed, start next)
- `/start-lesson 5` — jump to a specific lesson number

## Steps

1. Read `todo-app/lesson-progress.json` to get the current state.
   - If the file doesn't exist yet, create it with lesson 1 as `"in_progress"`.

2. Check the current lesson status, if it's `In progress` ask the User about aborting the lesson.  

2. Determine the target lesson:
   - If an argument (number) was provided, use that as the target.
   - Otherwise, use `currentLesson + 1`.

3. Update the registry:
   - Mark the old `currentLesson` as `"aborted"` (only if its status was `"in_progress"`).
   - Set `currentLesson` to the target lesson number.
   - Set the target lesson's status to `"in_progress"` with `startedAt` = today's date (ISO format).
   - Add entries for any lessons not yet in the registry with `"not_started"`.

4. Write the updated JSON back to `todo-app/lesson-progress.json`.

5. Load the lesson content:
   - Read `lessons/lesson-NN/README.md` (theory)
   - Read `lessons/lesson-NN/task.md` (task)
   - Where NN is the zero-padded lesson number (e.g., `01`, `09`, `15`)

6. Present the lesson to the student in this format:

---
## Lesson N — [Title]

### Theory
[Paste the full README.md content here]

### Your Task
[Paste the task.md content here without details]

### See in browser
Theory: [Build link by template: https://github.com/viruskone/learn-react-nextjs/blob/main/lessons/lesson-NN/README.md where NN is zero-padden lesson number]
Theory: [Build link by template: https://github.com/viruskone/learn-react-nextjs/blob/main/lessons/lesson-NN/task.md where NN is zero-padden lesson number]

---
Good luck! When you're done, run `/review-lesson` to get feedback.

## Important
- If the student tries to skip ahead more than 2 lessons without completing prior ones, warn them and recommend going in order.
- If the student is already on lesson 20 and tries to advance, congratulate them on finishing the course.
