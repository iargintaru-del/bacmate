# Step-by-Step Explanations + Per-Chapter Theory — Design

Date: 2026-07-18

## Purpose

Two related content/UX upgrades to BacMate:

1. Exercise explanations currently are a single terse LaTeX one-liner
   (e.g. `"$|z| = \sqrt{3^2+4^2}=...=5$."`). Replace them with a full,
   user-friendly, numbered step-by-step walkthrough so a student can
   actually follow *how* to solve the problem, not just see the final
   compressed computation.
2. Add a "Teorie" (theory) page per chapter, reachable from the Home
   topic cards, containing the key definitions/formulas for that chapter
   plus several fully worked examples — a mini study reference to read
   before or between practice sessions.

## Scope

Applies to every gradable item in the question bank: base topic
exercises, the 100-question practice sets per topic, and the exam
problems (`examProblemsAlgebra.ts` / `examProblemsAnalysis.ts`), and
their subpoints — roughly 950 items across 18 question-bank files and
8 topics. All of it gets rewritten; nothing is left in the old
one-liner format.

## Data model changes

`src/types.ts`:

```ts
interface GradableItem {
  // ...unchanged fields...
  explanation: string[]; // was: string — ordered list of solution steps
}
```

Each step is a short sentence, optionally containing inline `$...$`
LaTeX, rendered in order. Convention: 3-5 steps per item, roughly
"name the rule/formula" → "substitute the given values" → "compute" →
"state the result" (fewer steps for genuinely trivial items, more for
multi-stage ones — no padding to hit a count).

New theory types, also in `types.ts`:

```ts
interface TheoryConcept {
  heading: string;   // e.g. "Modulul unui număr complex"
  body: string[];    // one or more explanatory paragraphs/formulas (LaTeX-capable)
}

interface TheoryExample {
  statement: string; // the worked problem's statement (LaTeX-capable)
  steps: string[];   // same step-list convention as GradableItem.explanation
}

interface TheorySection {
  topic: Topic;
  title: string;
  concepts: TheoryConcept[];
  examples: TheoryExample[]; // 2-3 fully worked examples
}
```

## Content changes

- Every `explanation: string` in the 18 files under
  `src/data/questions/` (and subpoints in `problems.ts`,
  `examProblemsAlgebra.ts`, `examProblemsAnalysis.ts`) is rewritten to
  `explanation: string[]`.
- 8 new files under `src/data/theory/` (one per `Topic`), each
  exporting a `TheorySection` covering that chapter's syllabus
  content: formulas/definitions as `concepts`, plus 2-3 `examples`.
- `src/data/theory/index.ts` aggregates them into
  `THEORY: Record<Topic, TheorySection>` and exports a
  `theoryForTopic(topic)` accessor, mirroring the existing
  `exercisesByTopic` pattern in `src/data/index.ts`.

## UI changes

- `QuestionCard.tsx`: the explanation block renders an ordered list
  (`<ol>`) of steps (each wrapped in `MathText`) instead of a single
  `MathText` call.
- New page `src/pages/Theory.tsx` at route `/theory/:topic`: renders
  the chapter title, each concept (heading + body paragraphs), then
  each worked example (statement + numbered steps) — reusing
  `MathText` throughout for consistency with the rest of the app.
- `TopicCard.tsx`: add a second link "Teorie" next to the existing
  "Exersează" link/stats block, pointing to `/theory/:topic`.
- `App.tsx`: add `<Route path="/theory/:topic" element={<Theory />} />`.

## Testing

- `src/data/index.test.ts`: add an integrity check that every
  `explanation` (on exercises and on problem subpoints) is a non-empty
  array of non-empty strings.
- New `src/data/theory/index.test.ts` (or extend the existing
  integrity test file): every `Topic` has a corresponding
  `TheorySection` with at least one concept and at least one example,
  and every example's `steps` array is non-empty.
- No changes to grading logic (`explanation` is display-only, never
  used for grading/matching).

## Execution approach

This is primarily a large, mechanical-but-judgment-requiring content
rewrite (~950 explanations + 8 theory files), not an architecturally
complex change. Implementation will proceed topic-by-topic: for each
of the 8 topics, rewrite that topic's exercise/set explanations and
write its theory file together, so the person (or subagent) writing
the theory content is holding the same mental model used for that
topic's worked-example explanations. These per-topic batches are
independent of each other and suited to parallel subagent dispatch
once a plan exists.

## Out of scope

- No change to grading/scoring logic or point values.
- No change to the exam-builder or exam-variant machinery.
- No UI framework changes; continues using plain CSS + react-katex.
