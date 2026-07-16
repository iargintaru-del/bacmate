# Bacalaureat M2 Math Quiz — Design

Date: 2026-07-16

## Purpose

A personal, offline-capable web app for practicing Romanian Bacalaureat
Matematică M2 (tehnologic track) problems: practice by topic, or take a
full simulated exam with the real Subiectul I/II/III structure and scoring.

## Stack

- React + Vite + TypeScript
- `react-router-dom` for navigation
- `react-katex` (KaTeX) for math notation rendering — question authors write
  LaTeX inline in prompt strings (e.g. `\\frac{1}{2}`, `\\int_0^1 x\\,dx`)
- Plain CSS, no UI framework
- `localStorage` for progress persistence (no backend)
- Vitest for unit-testing the grading/normalization logic only

## Content scope

Romanian-language UI and content. Topics (M2 tehnologic syllabus):

1. Numere complexe
2. Combinatorică (permutări, aranjamente, combinări, binomul lui Newton)
3. Matrice
4. Determinanți
5. Sisteme de ecuații liniare
6. Limite de funcții
7. Derivate și aplicații (studiul funcțiilor)
8. Primitive și integrale definite

## Data model

Two content shapes:

```ts
type Topic = 'numere-complexe' | 'combinatorica' | 'matrice'
  | 'determinanti' | 'sisteme' | 'limite' | 'derivate' | 'integrale';

type AnswerType = 'mcq' | 'input';

interface GradableItem {
  id: string;
  type: AnswerType;
  prompt: string;              // LaTeX-capable text
  options?: string[];          // mcq only
  correctAnswer: string;       // mcq: exact option text; input: canonical answer
  acceptedAnswers?: string[];  // input only: equivalent accepted forms
  explanation: string;         // shown after grading
  points: number;
}

// Single-part item: topic practice pool + Subiectul I pool
interface Exercise extends GradableItem {
  topic: Topic;
  points: 6;
}

// Multi-part item: Subiectul II (algebra) / III (analysis)
interface Problem {
  id: string;
  topic: Topic;
  subject: 'II' | 'III';
  statement: string;           // shared context, LaTeX-capable
  subpoints: (GradableItem & { label: 'a' | 'b' | 'c' })[]; // points sum to 15
}
```

Grading has no partial credit within a single `Exercise` or `Subpoint` —
each is right/wrong for its full point value. This keeps auto-grading
tractable without a CAS/expression evaluator.

**Input-answer matching**: normalize the typed answer (trim, lowercase,
strip whitespace) and match against `correctAnswer` or any of
`acceptedAnswers`. This handles simple equivalent forms (e.g. `"1/2"` vs
`"0.5"`) listed explicitly per question, but does not understand arbitrary
algebraic rewrites.

## Content bank (initial size)

- ~30 `Exercise`s across the 8 topics (~4 each)
- 4 algebra `Problem`s (topics: numere-complexe / combinatorica / matrice /
  determinanti / sisteme — pick 4 of these 5), 3 subpoints each
- 4 analysis `Problem`s (topics: limite / derivate / integrale), 3 subpoints
  each
- Total ~54 individually-authored gradable prompts

## App structure

```
BacMate/
  index.html
  package.json, vite.config.ts, tsconfig.json
  src/
    main.tsx, App.tsx
    types.ts
    data/
      questions/
        numere-complexe.ts, combinatorica.ts, matrice.ts, ... (Exercise[] per topic)
        problems.ts (Problem[])
      index.ts               // combines + exports pools
    lib/
      storage.ts              // localStorage read/write, attempt log
      stats.ts                // derive overall/per-topic accuracy from attempt log
      grading.ts              // answer normalization + matching (unit tested)
      examBuilder.ts          // picks 5 Exercises + 2+2 Problems for a session
    pages/
      Home.tsx                // topic grid w/ per-topic accuracy, "Examen mixt" entry, overall stats
      TopicQuiz.tsx            // /quiz/:topic — one Exercise at a time, instant feedback
      Exam.tsx                 // /exam — whole-paper view, submit-all, then graded review
      Stats.tsx                // /stats — all-time progress dashboard
    components/
      MathText.tsx             // wraps react-katex for inline/block LaTeX-in-text rendering
      QuestionCard.tsx          // renders one Exercise/Subpoint prompt + answer control
      TopicCard.tsx
    styles/*.css
```

## Flows

**Topic practice** (`/quiz/:topic`): pulls that topic's `Exercise`s
(shuffled), shows one at a time. User answers (mcq click or input submit),
immediately sees correct/incorrect + explanation, advances. Each attempt is
logged to localStorage.

**Mixed exam** (`/exam`): `examBuilder` picks 5 random `Exercise`s
(Subiectul I, 30p), 2 random algebra `Problem`s (Subiectul II, 30p), 2
random analysis `Problem`s (Subiectul III, 30p). All three subjects render
on one scrollable page, labeled and answerable in any order — matching how
the real paper is taken. A single "Predă lucrarea" button grades everything
at once: per-item correctness, per-subject subtotal, +10p oficiu, final
**Nota = total / 10**, plus explanations for review. The full session is
logged to localStorage (topic-tagged per item) so exam attempts also feed
topic-level stats.

**Stats** (`/stats`): reads the attempt log, computes overall accuracy and
per-topic accuracy/count, renders as simple progress bars — no charting
library needed.

## Persistence

Single localStorage array of attempt records:

```ts
interface Attempt {
  itemId: string;
  topic: Topic;
  correct: boolean;
  timestamp: number;
}
```

Stats are always derived from this log on read, never stored redundantly.
If the stored JSON is missing or fails to parse, treat it as an empty log
(no user-facing error — this is a personal tool).

## Testing

Vitest covers `lib/grading.ts` (answer normalization/matching) — the one
piece of non-trivial logic. No component or end-to-end test suite.

## Explicit non-goals (scope boundaries)

- No CAS/symbolic evaluation of free-text math answers — only literal
  string matching against author-provided accepted forms.
- No partial credit within a single exercise/subpoint.
- No timer/exam-duration simulation.
- No backend, accounts, or cross-device sync — localStorage only, single
  browser/profile.
- No English content — Romanian only (no i18n toggle).
