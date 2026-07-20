# Return to Home Button in TopicQuiz Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an always-visible "Înapoi acasă" (return to home) link above each active question in the TopicQuiz practice flow, so the user can leave the quiz mid-run.

**Architecture:** Single-file change to `src/pages/TopicQuiz.tsx`. `react-router-dom`'s `Link` is already imported and already used for the same purpose (`to="/"`, label "Înapoi acasă") on the "unknown topic" and "quiz complete" screens further down in the same file — the new link reuses that exact pattern for the in-progress screen.

**Tech Stack:** React 18 + TypeScript, react-router-dom v6, Vite, Vitest.

## Global Constraints

- Reuse the exact existing label text `"Înapoi acasă"` — do not introduce a new translation/wording.
- Scope is `src/pages/TopicQuiz.tsx` only. Do not touch `src/pages/Exam.tsx` (out of scope per spec).
- No confirmation dialog, no state persistence — this is a plain navigation link, matching how the existing "Înapoi acasă" links behave elsewhere in this file.
- This codebase has no component/page-level test suite (existing `*.test.ts` files under `src/lib` and `src/data` only cover pure logic, not JSX). Do not invent a testing setup that doesn't exist in the repo — verify this change with `npm run typecheck`, `npm test` (regression check on existing suite), and a manual check in the running dev server, per the project's own guidance to verify UI changes by hand in a browser.

---

### Task 1: Add "Înapoi acasă" link to the active-question view

**Files:**
- Modify: `src/pages/TopicQuiz.tsx:65-78`

**Interfaces:**
- Consumes: `Link` from `react-router-dom` (already imported at `src/pages/TopicQuiz.tsx:2`).
- Produces: no new exports; purely a render-path addition inside the existing `TopicQuiz` component.

- [ ] **Step 1: Add the link to the active-question return block**

Current code (`src/pages/TopicQuiz.tsx:65-78`):

```tsx
  return (
    <div className="page page--quiz">
      <h1>{heading}</h1>
      <p className="page__progress">
        Întrebarea {index + 1} din {exercises.length}
      </p>
      <QuestionCard key={current.id} item={current} mode="practice" onSubmit={handleSubmit} />
      {currentAnswered && (
        <button type="button" onClick={handleNext}>
          {index + 1 < exercises.length ? "Următoarea întrebare" : "Vezi rezultatul"}
        </button>
      )}
    </div>
  );
```

Replace with:

```tsx
  return (
    <div className="page page--quiz">
      <h1>{heading}</h1>
      <p className="page__progress">
        Întrebarea {index + 1} din {exercises.length}
      </p>
      <p>
        <Link to="/">Înapoi acasă</Link>
      </p>
      <QuestionCard key={current.id} item={current} mode="practice" onSubmit={handleSubmit} />
      {currentAnswered && (
        <button type="button" onClick={handleNext}>
          {index + 1 < exercises.length ? "Următoarea întrebare" : "Vezi rezultatul"}
        </button>
      )}
    </div>
  );
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: exits with no errors (no new type issues introduced by the JSX-only change).

- [ ] **Step 3: Run existing test suite as a regression check**

Run: `npm test`
Expected: all existing tests in `src/lib/*.test.ts` and `src/data/*.test.ts` still pass (this change doesn't touch any file they cover, so this is a no-regression check).

- [ ] **Step 4: Manually verify in the dev server**

Run: `npm run dev`, open the app in a browser, navigate to any topic quiz (Home → pick a topic → practice mode).
Expected:
- "Înapoi acasă" is visible immediately when a question loads, before answering.
- Clicking it navigates back to the home page (`/`).
- It remains visible after answering the question, alongside "Următoarea întrebare" / "Vezi rezultatul".
- The final "quiz complete" screen (already existing) and the "unknown topic" screen still show their own "Înapoi acasă" links unchanged.

Stop the dev server after verifying (Ctrl+C).

- [ ] **Step 5: Commit**

```bash
git add src/pages/TopicQuiz.tsx
git commit -m "$(cat <<'EOF'
Add return-to-home link to active quiz question

Lets the user leave a topic quiz mid-run instead of finishing it or
relying on the browser back button.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Self-Review Notes

- **Spec coverage:** Spec requires (1) scope limited to TopicQuiz.tsx — Task 1 only touches that file; (2) link always visible regardless of answered state — placed above `QuestionCard`, outside the `currentAnswered` conditional; (3) reuse existing "Înapoi acasă" label — done verbatim; (4) no confirmation/persistence — none added. All covered by the single task.
- **Placeholder scan:** none — full before/after code shown, exact commands with expected output given.
- **Type consistency:** no new types, functions, or props introduced; `Link` usage matches its existing usage 12 lines below in the same file.
