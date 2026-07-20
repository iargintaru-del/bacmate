# Return to home button in TopicQuiz — Design

## Purpose
Let the user leave a topic quiz mid-run without finishing it or relying on the browser back button.

## Scope
`src/pages/TopicQuiz.tsx` only. The `Exam.tsx` full-exam page is out of scope — it presents many questions on one page as a single form meant to be submitted as a whole, so a per-question home link doesn't apply there.

## Change
In the active-question render path (after `current = exercises[index]`), add a `<Link to="/">Înapoi acasă</Link>` — reusing the exact label already used on the quiz-completion screen — placed below the `page__progress` line and above the `QuestionCard`. It is always visible, regardless of whether the current question has been answered.

## Non-goals
- No confirmation dialog before leaving.
- No persistence of in-progress quiz state. Leaving abandons the current run, same as using the browser back button today.
