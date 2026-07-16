# Bacalaureat M2 Math Quiz Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a client-side React/Vite app for practicing Romanian Bacalaureat M2 math: topic-by-topic drilling and a full simulated exam with real Subiectul I/II/III scoring.

**Architecture:** Single-page React app (Vite + TypeScript, `react-router-dom`), all content as static TypeScript data, all state client-side (`localStorage` for the attempt log, in-memory for in-progress quiz/exam state), math rendered via KaTeX.

**Tech Stack:** React 18, Vite 5, TypeScript 5, `react-router-dom` 6, `react-katex` + `katex`, Vitest (+ `jsdom`) for logic tests.

## Global Constraints

- Romanian-language UI and content only (no i18n toggle).
- Client-side only: no backend, no accounts; persistence via `localStorage` only, on a single key, tolerant of missing/corrupt data (treat as empty, no user-facing error).
- Answer grading is literal-string matching: normalize (trim, lowercase, strip internal whitespace) and compare against `correctAnswer` or any of `acceptedAnswers`. No CAS/symbolic evaluation of equivalent algebraic forms beyond what's explicitly listed.
- No partial credit within a single `Exercise` or `Subpoint` — each is right/wrong for its full point value.
- No exam timer/duration simulation.
- Math content convention: inline LaTeX wrapped in single `$...$`, display/block LaTeX wrapped in `$$...$$`, rendered via the shared `MathText` component (Task 7). Every `prompt`/`explanation`/`options`/`statement` string containing math MUST follow this convention — plain Romanian text outside the delimiters, LaTeX only inside them.
- Every `Exercise` is worth exactly 6 points. Every `Problem` has exactly 3 `Subpoint`s (`a`, `b`, `c`) whose `points` sum to exactly 15.
- String literals use double quotes in every file listed below (avoids escaping conflicts with derivative-notation apostrophes like `f'(x)` in content files, and keeps style uniform across the codebase).

---

## Task 1: Project scaffold

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles/index.css`
- Create: `.gitignore`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: a working Vite dev/build/test pipeline. `App` (default export, `src/App.tsx`) is a placeholder that later tasks (Task 24) replace entirely. `src/styles/index.css` is a placeholder that Task 24 replaces entirely.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "bacmate",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "typecheck": "tsc -b --noEmit"
  },
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.26.0",
    "react-katex": "^3.0.1",
    "katex": "^0.16.11"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/react-katex": "^3.0.4",
    "@vitejs/plugin-react": "^4.3.0",
    "jsdom": "^25.0.0",
    "typescript": "^5.5.0",
    "vite": "^5.4.0",
    "vitest": "^2.0.0"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 3: Create `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 4: Create `vite.config.ts`**

```ts
/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
```

- [ ] **Step 5: Create `index.html`**

```html
<!doctype html>
<html lang="ro">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BacMate — Pregătire Bacalaureat M2</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Create `src/main.tsx`**

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

- [ ] **Step 7: Create placeholder `src/App.tsx`**

```tsx
export default function App() {
  return <div>BacMate</div>;
}
```

- [ ] **Step 8: Create placeholder `src/styles/index.css`**

```css
:root {
  color-scheme: light dark;
}
```

- [ ] **Step 9: Create `.gitignore`**

```
node_modules
dist
```

- [ ] **Step 10: Install dependencies**

Run: `npm install`
Expected: installs without errors, creates `node_modules/` and `package-lock.json`.

- [ ] **Step 11: Verify the build pipeline works**

Run: `npm run build`
Expected: completes without errors, produces a `dist/` directory.

- [ ] **Step 12: Commit**

```bash
git add package.json package-lock.json tsconfig.json tsconfig.node.json vite.config.ts index.html src/main.tsx src/App.tsx src/styles/index.css .gitignore
git commit -m "$(cat <<'EOF'
Scaffold Vite + React + TypeScript project

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Core types

**Files:**
- Create: `src/types.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `Topic`, `AnswerType`, `GradableItem`, `Exercise`, `Subpoint`, `Problem` — used by every subsequent task.

- [ ] **Step 1: Write `src/types.ts`**

```ts
export type Topic =
  | "numere-complexe"
  | "combinatorica"
  | "matrice"
  | "determinanti"
  | "sisteme"
  | "limite"
  | "derivate"
  | "integrale";

export type AnswerType = "mcq" | "input";

export interface GradableItem {
  id: string;
  type: AnswerType;
  prompt: string;
  options?: string[];
  correctAnswer: string;
  acceptedAnswers?: string[];
  explanation: string;
  points: number;
}

export interface Exercise extends GradableItem {
  topic: Topic;
}

export interface Subpoint extends GradableItem {
  label: "a" | "b" | "c";
}

export interface Problem {
  id: string;
  topic: Topic;
  subject: "II" | "III";
  statement: string;
  subpoints: Subpoint[];
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run typecheck`
Expected: PASS with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/types.ts
git commit -m "$(cat <<'EOF'
Add core content types

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Grading logic

**Files:**
- Create: `src/lib/grading.ts`
- Test: `src/lib/grading.test.ts`

**Interfaces:**
- Consumes: nothing beyond a structural `{ correctAnswer: string; acceptedAnswers?: string[] }` shape (matches `GradableItem` from Task 2).
- Produces: `normalizeAnswer(raw: string): string`, `isCorrectAnswer(userAnswer: string, item: { correctAnswer: string; acceptedAnswers?: string[] }): boolean` — used by Task 6 (`examBuilder`) and Task 18 (`QuestionCard`).

- [ ] **Step 1: Write the failing test — `src/lib/grading.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { normalizeAnswer, isCorrectAnswer } from "./grading";

describe("normalizeAnswer", () => {
  it("trims whitespace and lowercases", () => {
    expect(normalizeAnswer("  Hello World  ")).toBe("helloworld");
  });

  it("strips internal whitespace", () => {
    expect(normalizeAnswer("1 / 2")).toBe("1/2");
  });
});

describe("isCorrectAnswer", () => {
  it("matches the exact correct answer", () => {
    const item = { correctAnswer: "5" };
    expect(isCorrectAnswer("5", item)).toBe(true);
  });

  it("matches case-insensitively and ignoring whitespace", () => {
    const item = { correctAnswer: "-2+2i\\sqrt{3}" };
    expect(isCorrectAnswer(" -2+2i\\sqrt{3} ", item)).toBe(true);
  });

  it("matches accepted alternate forms", () => {
    const item = { correctAnswer: "1/2", acceptedAnswers: ["0.5", "0,5"] };
    expect(isCorrectAnswer("0.5", item)).toBe(true);
    expect(isCorrectAnswer("0,5", item)).toBe(true);
  });

  it("rejects a wrong answer", () => {
    const item = { correctAnswer: "5" };
    expect(isCorrectAnswer("6", item)).toBe(false);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/lib/grading.test.ts`
Expected: FAIL — `Cannot find module './grading'` (file doesn't exist yet).

- [ ] **Step 3: Write `src/lib/grading.ts`**

```ts
export function normalizeAnswer(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, "");
}

export function isCorrectAnswer(
  userAnswer: string,
  item: { correctAnswer: string; acceptedAnswers?: string[] }
): boolean {
  const normalizedUser = normalizeAnswer(userAnswer);
  const candidates = [item.correctAnswer, ...(item.acceptedAnswers ?? [])];
  return candidates.some((candidate) => normalizeAnswer(candidate) === normalizedUser);
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/lib/grading.test.ts`
Expected: PASS, 4 tests passing.

- [ ] **Step 5: Commit**

```bash
git add src/lib/grading.ts src/lib/grading.test.ts
git commit -m "$(cat <<'EOF'
Add answer normalization and grading logic

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Attempt storage (localStorage)

**Files:**
- Create: `src/lib/storage.ts`
- Test: `src/lib/storage.test.ts`

**Interfaces:**
- Consumes: `Topic` from `src/types.ts` (Task 2).
- Produces: `interface Attempt { itemId: string; topic: Topic; correct: boolean; timestamp: number }`, `getAttempts(): Attempt[]`, `logAttempt(attempt: Attempt): void`, `clearAttempts(): void` — used by Task 5 (`stats`), Task 20 (`TopicQuiz`), Task 21 (`Exam`).

- [ ] **Step 1: Write the failing test — `src/lib/storage.test.ts`**

```ts
import { describe, it, expect, beforeEach } from "vitest";
import { getAttempts, logAttempt, clearAttempts, type Attempt } from "./storage";

beforeEach(() => {
  localStorage.clear();
});

describe("storage", () => {
  it("returns an empty array when nothing is stored", () => {
    expect(getAttempts()).toEqual([]);
  });

  it("logs and retrieves an attempt", () => {
    const attempt: Attempt = { itemId: "ex-1", topic: "limite", correct: true, timestamp: 123 };
    logAttempt(attempt);
    expect(getAttempts()).toEqual([attempt]);
  });

  it("appends multiple attempts in order", () => {
    logAttempt({ itemId: "a", topic: "limite", correct: true, timestamp: 1 });
    logAttempt({ itemId: "b", topic: "derivate", correct: false, timestamp: 2 });
    expect(getAttempts().map((a) => a.itemId)).toEqual(["a", "b"]);
  });

  it("clears all attempts", () => {
    logAttempt({ itemId: "a", topic: "limite", correct: true, timestamp: 1 });
    clearAttempts();
    expect(getAttempts()).toEqual([]);
  });

  it("returns an empty array when stored data is corrupt", () => {
    localStorage.setItem("bacmate:attempts", "not json");
    expect(getAttempts()).toEqual([]);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/lib/storage.test.ts`
Expected: FAIL — `Cannot find module './storage'`.

- [ ] **Step 3: Write `src/lib/storage.ts`**

```ts
import type { Topic } from "../types";

const STORAGE_KEY = "bacmate:attempts";

export interface Attempt {
  itemId: string;
  topic: Topic;
  correct: boolean;
  timestamp: number;
}

export function getAttempts(): Attempt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Attempt[];
  } catch {
    return [];
  }
}

export function logAttempt(attempt: Attempt): void {
  const attempts = getAttempts();
  attempts.push(attempt);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
}

export function clearAttempts(): void {
  localStorage.removeItem(STORAGE_KEY);
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/lib/storage.test.ts`
Expected: PASS, 5 tests passing.

- [ ] **Step 5: Commit**

```bash
git add src/lib/storage.ts src/lib/storage.test.ts
git commit -m "$(cat <<'EOF'
Add localStorage-backed attempt log

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Stats computation

**Files:**
- Create: `src/lib/stats.ts`
- Test: `src/lib/stats.test.ts`

**Interfaces:**
- Consumes: `Attempt` from `src/lib/storage.ts` (Task 4), `Topic` from `src/types.ts` (Task 2).
- Produces: `interface TopicStats { topic: Topic; total: number; correct: number; accuracy: number }`, `interface OverallStats { total: number; correct: number; accuracy: number; byTopic: TopicStats[] }`, `computeStats(attempts: Attempt[], topics: Topic[]): OverallStats` — used by Task 20 (`Home`), Task 23 (`Stats` page).

- [ ] **Step 1: Write the failing test — `src/lib/stats.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { computeStats } from "./stats";
import type { Attempt } from "./storage";
import type { Topic } from "../types";

const topics: Topic[] = ["limite", "derivate"];

describe("computeStats", () => {
  it("returns zeroed stats for an empty attempt list", () => {
    const result = computeStats([], topics);
    expect(result.total).toBe(0);
    expect(result.accuracy).toBe(0);
    expect(result.byTopic).toEqual([
      { topic: "limite", total: 0, correct: 0, accuracy: 0 },
      { topic: "derivate", total: 0, correct: 0, accuracy: 0 },
    ]);
  });

  it("computes overall and per-topic accuracy", () => {
    const attempts: Attempt[] = [
      { itemId: "a", topic: "limite", correct: true, timestamp: 1 },
      { itemId: "b", topic: "limite", correct: false, timestamp: 2 },
      { itemId: "c", topic: "derivate", correct: true, timestamp: 3 },
    ];
    const result = computeStats(attempts, topics);
    expect(result.total).toBe(3);
    expect(result.correct).toBe(2);
    expect(result.accuracy).toBeCloseTo(2 / 3);

    const limite = result.byTopic.find((t) => t.topic === "limite")!;
    expect(limite).toEqual({ topic: "limite", total: 2, correct: 1, accuracy: 0.5 });

    const derivate = result.byTopic.find((t) => t.topic === "derivate")!;
    expect(derivate).toEqual({ topic: "derivate", total: 1, correct: 1, accuracy: 1 });
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/lib/stats.test.ts`
Expected: FAIL — `Cannot find module './stats'`.

- [ ] **Step 3: Write `src/lib/stats.ts`**

```ts
import type { Attempt } from "./storage";
import type { Topic } from "../types";

export interface TopicStats {
  topic: Topic;
  total: number;
  correct: number;
  accuracy: number;
}

export interface OverallStats {
  total: number;
  correct: number;
  accuracy: number;
  byTopic: TopicStats[];
}

export function computeStats(attempts: Attempt[], topics: Topic[]): OverallStats {
  const total = attempts.length;
  const correct = attempts.filter((a) => a.correct).length;

  const byTopic: TopicStats[] = topics.map((topic) => {
    const topicAttempts = attempts.filter((a) => a.topic === topic);
    const topicCorrect = topicAttempts.filter((a) => a.correct).length;
    return {
      topic,
      total: topicAttempts.length,
      correct: topicCorrect,
      accuracy: topicAttempts.length === 0 ? 0 : topicCorrect / topicAttempts.length,
    };
  });

  return {
    total,
    correct,
    accuracy: total === 0 ? 0 : correct / total,
    byTopic,
  };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/lib/stats.test.ts`
Expected: PASS, 2 tests passing.

- [ ] **Step 5: Commit**

```bash
git add src/lib/stats.ts src/lib/stats.test.ts
git commit -m "$(cat <<'EOF'
Add overall and per-topic stats computation

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Exam builder and grader

**Files:**
- Create: `src/lib/examBuilder.ts`
- Test: `src/lib/examBuilder.test.ts`

**Interfaces:**
- Consumes: `Exercise`, `Problem` from `src/types.ts` (Task 2); `isCorrectAnswer` from `src/lib/grading.ts` (Task 3).
- Produces: `interface ExamSession { subiectI: Exercise[]; subiectII: Problem[]; subiectIII: Problem[] }`, `interface GradedItemResult { itemId: string; earned: number; possible: number; correct: boolean }`, `interface ExamResult { subiectI: GradedItemResult[]; subiectII: GradedItemResult[]; subiectIII: GradedItemResult[]; subtotalI: number; subtotalII: number; subtotalIII: number; oficiu: number; total: number; nota: number }`, `buildExam(exercises: Exercise[], problems: Problem[]): ExamSession`, `gradeExam(session: ExamSession, answers: Record<string, string>): ExamResult` — used by Task 21 (`Exam` page).

- [ ] **Step 1: Write the failing test — `src/lib/examBuilder.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { buildExam, gradeExam } from "./examBuilder";
import type { Exercise, Problem } from "../types";

function makeExercise(id: string): Exercise {
  return {
    id,
    topic: "limite",
    type: "input",
    points: 6,
    prompt: `prompt ${id}`,
    correctAnswer: "42",
    explanation: "because",
  };
}

function makeProblem(id: string, subject: "II" | "III"): Problem {
  return {
    id,
    topic: subject === "II" ? "matrice" : "derivate",
    subject,
    statement: `statement ${id}`,
    subpoints: [
      { id: `${id}-a`, label: "a", type: "input", points: 5, prompt: "a", correctAnswer: "1", explanation: "e" },
      { id: `${id}-b`, label: "b", type: "input", points: 5, prompt: "b", correctAnswer: "2", explanation: "e" },
      { id: `${id}-c`, label: "c", type: "input", points: 5, prompt: "c", correctAnswer: "3", explanation: "e" },
    ],
  };
}

const exercises = Array.from({ length: 8 }, (_, i) => makeExercise(`ex-${i}`));
const problems = [
  makeProblem("p2-1", "II"),
  makeProblem("p2-2", "II"),
  makeProblem("p3-1", "III"),
  makeProblem("p3-2", "III"),
];

describe("buildExam", () => {
  it("picks 5 exercises, 2 algebra problems, 2 analysis problems", () => {
    const session = buildExam(exercises, problems);
    expect(session.subiectI).toHaveLength(5);
    expect(session.subiectII).toHaveLength(2);
    expect(session.subiectIII).toHaveLength(2);
    expect(session.subiectII.every((p) => p.subject === "II")).toBe(true);
    expect(session.subiectIII.every((p) => p.subject === "III")).toBe(true);
  });

  it("never picks the same exercise twice", () => {
    const session = buildExam(exercises, problems);
    const ids = session.subiectI.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("gradeExam", () => {
  it("grades exercises and subpoints, computes subtotals, total, and nota", () => {
    const session = buildExam(exercises, problems);
    const answers: Record<string, string> = {};
    for (const ex of session.subiectI) answers[ex.id] = "42"; // all correct, 6 pts each = 30
    for (const problem of [...session.subiectII, ...session.subiectIII]) {
      answers[`${problem.id}-a`] = "1"; // correct, 5
      answers[`${problem.id}-b`] = "wrong"; // incorrect, 0
      answers[`${problem.id}-c`] = "3"; // correct, 5
    }

    const result = gradeExam(session, answers);
    expect(result.subtotalI).toBe(30);
    expect(result.subtotalII).toBe(20); // 2 problems * (5+0+5)
    expect(result.subtotalIII).toBe(20);
    expect(result.oficiu).toBe(10);
    expect(result.total).toBe(30 + 20 + 20 + 10);
    expect(result.nota).toBeCloseTo(result.total / 10);
  });

  it("scores missing answers as 0", () => {
    const session = buildExam(exercises, problems);
    const result = gradeExam(session, {});
    expect(result.subtotalI).toBe(0);
    expect(result.subtotalII).toBe(0);
    expect(result.subtotalIII).toBe(0);
    expect(result.total).toBe(10); // just oficiu
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/lib/examBuilder.test.ts`
Expected: FAIL — `Cannot find module './examBuilder'`.

- [ ] **Step 3: Write `src/lib/examBuilder.ts`**

```ts
import type { Exercise, Problem } from "../types";
import { isCorrectAnswer } from "./grading";

export interface ExamSession {
  subiectI: Exercise[];
  subiectII: Problem[];
  subiectIII: Problem[];
}

export interface GradedItemResult {
  itemId: string;
  earned: number;
  possible: number;
  correct: boolean;
}

export interface ExamResult {
  subiectI: GradedItemResult[];
  subiectII: GradedItemResult[];
  subiectIII: GradedItemResult[];
  subtotalI: number;
  subtotalII: number;
  subtotalIII: number;
  oficiu: number;
  total: number;
  nota: number;
}

function pickRandom<T>(pool: T[], count: number): T[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function buildExam(exercises: Exercise[], problems: Problem[]): ExamSession {
  const algebraProblems = problems.filter((p) => p.subject === "II");
  const analysisProblems = problems.filter((p) => p.subject === "III");
  return {
    subiectI: pickRandom(exercises, 5),
    subiectII: pickRandom(algebraProblems, 2),
    subiectIII: pickRandom(analysisProblems, 2),
  };
}

function sumEarned(items: GradedItemResult[]): number {
  return items.reduce((acc, item) => acc + item.earned, 0);
}

export function gradeExam(session: ExamSession, answers: Record<string, string>): ExamResult {
  const gradeExercise = (exercise: Exercise): GradedItemResult => {
    const userAnswer = answers[exercise.id] ?? "";
    const correct = isCorrectAnswer(userAnswer, exercise);
    return { itemId: exercise.id, earned: correct ? exercise.points : 0, possible: exercise.points, correct };
  };

  const gradeProblem = (problem: Problem): GradedItemResult[] =>
    problem.subpoints.map((subpoint) => {
      const userAnswer = answers[subpoint.id] ?? "";
      const correct = isCorrectAnswer(userAnswer, subpoint);
      return { itemId: subpoint.id, earned: correct ? subpoint.points : 0, possible: subpoint.points, correct };
    });

  const subiectI = session.subiectI.map(gradeExercise);
  const subiectII = session.subiectII.flatMap(gradeProblem);
  const subiectIII = session.subiectIII.flatMap(gradeProblem);

  const subtotalI = sumEarned(subiectI);
  const subtotalII = sumEarned(subiectII);
  const subtotalIII = sumEarned(subiectIII);
  const oficiu = 10;
  const total = subtotalI + subtotalII + subtotalIII + oficiu;

  return {
    subiectI,
    subiectII,
    subiectIII,
    subtotalI,
    subtotalII,
    subtotalIII,
    oficiu,
    total,
    nota: total / 10,
  };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/lib/examBuilder.test.ts`
Expected: PASS, 4 tests passing.

- [ ] **Step 5: Commit**

```bash
git add src/lib/examBuilder.ts src/lib/examBuilder.test.ts
git commit -m "$(cat <<'EOF'
Add exam session builder and scoring logic

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: MathText component (KaTeX rendering)

**Files:**
- Create: `src/components/MathText.tsx`

**Interfaces:**
- Consumes: `react-katex`'s `InlineMath`/`BlockMath` (Task 1 dependency), `katex/dist/katex.min.css`.
- Produces: `MathText({ text }: { text: string }): JSX.Element` — splits `text` on `$$...$$` (block) and `$...$` (inline) delimiters and renders each segment; used by Task 18 (`QuestionCard`) and Task 21 (`Exam`).

- [ ] **Step 1: Write `src/components/MathText.tsx`**

```tsx
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

interface MathTextProps {
  text: string;
}

export function MathText({ text }: MathTextProps) {
  const parts = text.split(/(\$\$[^$]+\$\$|\$[^$]+\$)/g).filter((part) => part !== "");

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
          return <BlockMath key={index} math={part.slice(2, -2)} />;
        }
        if (part.startsWith("$") && part.endsWith("$")) {
          return <InlineMath key={index} math={part.slice(1, -1)} />;
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run typecheck`
Expected: PASS with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/MathText.tsx
git commit -m "$(cat <<'EOF'
Add MathText component for inline/block KaTeX rendering

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Numere complexe exercises

**Files:**
- Create: `src/data/questions/numereComplexe.ts`

**Interfaces:**
- Consumes: `Exercise` from `src/types.ts` (Task 2).
- Produces: `numereComplexeExercises: Exercise[]` (4 items) — used by Task 17 (`data/index.ts`).

- [ ] **Step 1: Write `src/data/questions/numereComplexe.ts`**

```ts
import type { Exercise } from "../../types";

export const numereComplexeExercises: Exercise[] = [
  {
    id: "nc-1",
    topic: "numere-complexe",
    type: "input",
    points: 6,
    prompt: "Se consideră numărul complex $z = 3 + 4i$. Calculați $|z|$.",
    correctAnswer: "5",
    explanation: "$|z| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.",
  },
  {
    id: "nc-2",
    topic: "numere-complexe",
    type: "mcq",
    points: 6,
    prompt: "Care este conjugatul numărului complex $z = 2 - 5i$?",
    options: ["$2 + 5i$", "$-2 + 5i$", "$2 - 5i$", "$-2 - 5i$"],
    correctAnswer: "$2 + 5i$",
    explanation: "Conjugatul lui $a - bi$ este $a + bi$, deci $\\overline{2 - 5i} = 2 + 5i$.",
  },
  {
    id: "nc-3",
    topic: "numere-complexe",
    type: "input",
    points: 6,
    prompt: "Calculați $i^{2023}$.",
    correctAnswer: "-i",
    explanation: "$2023 = 4 \\cdot 505 + 3$, deci $i^{2023} = i^3 = -i$.",
  },
  {
    id: "nc-4",
    topic: "numere-complexe",
    type: "mcq",
    points: 6,
    prompt: "Fie $z_1 = 1 + i$ și $z_2 = 1 - i$. Calculați $z_1 \\cdot z_2$.",
    options: ["$2$", "$2i$", "$0$", "$-2$"],
    correctAnswer: "$2$",
    explanation: "$z_1 \\cdot z_2 = (1+i)(1-i) = 1 - i^2 = 1 + 1 = 2$.",
  },
];
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run typecheck`
Expected: PASS with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/questions/numereComplexe.ts
git commit -m "$(cat <<'EOF'
Add numere complexe exercise bank

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Combinatorică exercises

**Files:**
- Create: `src/data/questions/combinatorica.ts`

**Interfaces:**
- Consumes: `Exercise` from `src/types.ts` (Task 2).
- Produces: `combinatoricaExercises: Exercise[]` (4 items) — used by Task 17 (`data/index.ts`).

- [ ] **Step 1: Write `src/data/questions/combinatorica.ts`**

```ts
import type { Exercise } from "../../types";

export const combinatoricaExercises: Exercise[] = [
  {
    id: "cb-1",
    topic: "combinatorica",
    type: "input",
    points: 6,
    prompt: "Calculați $C_5^2$ (numărul de submulțimi cu 2 elemente ale unei mulțimi cu 5 elemente).",
    correctAnswer: "10",
    explanation: "$C_5^2 = \\dfrac{5!}{2! \\cdot 3!} = \\dfrac{5 \\cdot 4}{2} = 10$.",
  },
  {
    id: "cb-2",
    topic: "combinatorica",
    type: "mcq",
    points: 6,
    prompt:
      "Câte numere de 3 cifre distincte se pot forma cu cifrele $1, 2, 3, 4$ (fiecare cifră utilizată o singură dată)?",
    options: ["$24$", "$12$", "$64$", "$4$"],
    correctAnswer: "$24$",
    explanation: "Este vorba de aranjamente: $A_4^3 = 4 \\cdot 3 \\cdot 2 = 24$.",
  },
  {
    id: "cb-3",
    topic: "combinatorica",
    type: "input",
    points: 6,
    prompt: "Calculați $5!$.",
    correctAnswer: "120",
    explanation: "$5! = 5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1 = 120$.",
  },
  {
    id: "cb-4",
    topic: "combinatorica",
    type: "mcq",
    points: 6,
    prompt: "Care este coeficientul termenului al treilea din dezvoltarea binomului $(x+1)^4$?",
    options: ["$6$", "$4$", "$12$", "$8$"],
    correctAnswer: "$6$",
    explanation: "Termenul al treilea (rangul $k=2$) este $C_4^2 x^2 = 6x^2$, deci coeficientul este $6$.",
  },
];
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run typecheck`
Expected: PASS with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/questions/combinatorica.ts
git commit -m "$(cat <<'EOF'
Add combinatorică exercise bank

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: Matrice exercises

**Files:**
- Create: `src/data/questions/matrice.ts`

**Interfaces:**
- Consumes: `Exercise` from `src/types.ts` (Task 2).
- Produces: `matriceExercises: Exercise[]` (4 items) — used by Task 17 (`data/index.ts`).

- [ ] **Step 1: Write `src/data/questions/matrice.ts`**

```ts
import type { Exercise } from "../../types";

export const matriceExercises: Exercise[] = [
  {
    id: "mt-1",
    topic: "matrice",
    type: "input",
    points: 6,
    prompt:
      "Fie matricea $$A = \\begin{pmatrix} 2 & 0 \\\\ 1 & 3 \\end{pmatrix}.$$ Calculați urma matricei $A$ (suma elementelor de pe diagonala principală).",
    correctAnswer: "5",
    explanation: "Urma este $2 + 3 = 5$.",
  },
  {
    id: "mt-2",
    topic: "matrice",
    type: "mcq",
    points: 6,
    prompt:
      "Fie $$A = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}, \\quad B = \\begin{pmatrix} 1 & 0 \\\\ 2 & 1 \\end{pmatrix}.$$ Elementul de pe linia 1, coloana 1 al produsului $A \\cdot B$ este:",
    options: ["$5$", "$2$", "$1$", "$3$"],
    correctAnswer: "$5$",
    explanation: "Elementul $(1,1)$ este $1 \\cdot 1 + 2 \\cdot 2 = 1 + 4 = 5$.",
  },
  {
    id: "mt-3",
    topic: "matrice",
    type: "input",
    points: 6,
    prompt:
      "Fie $$A = \\begin{pmatrix} 3 & 1 \\\\ 2 & 4 \\end{pmatrix}.$$ Calculați elementul de pe linia 2, coloana 2 al matricei $2A$.",
    correctAnswer: "8",
    explanation: "Elementul $(2,2)$ al lui $A$ este $4$, deci în $2A$ este $2 \\cdot 4 = 8$.",
  },
  {
    id: "mt-4",
    topic: "matrice",
    type: "mcq",
    points: 6,
    prompt: "Care este matricea unitate (identitate) de ordinul 2?",
    options: [
      "$\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$",
      "$\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$",
      "$\\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}$",
      "$\\begin{pmatrix} 0 & 0 \\\\ 0 & 0 \\end{pmatrix}$",
    ],
    correctAnswer: "$\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$",
    explanation: "Matricea identitate are $1$ pe diagonala principală și $0$ în rest.",
  },
];
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run typecheck`
Expected: PASS with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/questions/matrice.ts
git commit -m "$(cat <<'EOF'
Add matrice exercise bank

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: Determinanți exercises

**Files:**
- Create: `src/data/questions/determinanti.ts`

**Interfaces:**
- Consumes: `Exercise` from `src/types.ts` (Task 2).
- Produces: `determinantiExercises: Exercise[]` (4 items) — used by Task 17 (`data/index.ts`).

- [ ] **Step 1: Write `src/data/questions/determinanti.ts`**

```ts
import type { Exercise } from "../../types";

export const determinantiExercises: Exercise[] = [
  {
    id: "dt-1",
    topic: "determinanti",
    type: "input",
    points: 6,
    prompt: "Calculați determinantul matricei $$\\begin{pmatrix} 2 & 3 \\\\ 1 & 4 \\end{pmatrix}.$$",
    correctAnswer: "5",
    explanation: "$\\det = 2 \\cdot 4 - 3 \\cdot 1 = 8 - 3 = 5$.",
  },
  {
    id: "dt-2",
    topic: "determinanti",
    type: "mcq",
    points: 6,
    prompt: "Determinantul matricei identitate $I_3$ este:",
    options: ["$1$", "$0$", "$3$", "$-1$"],
    correctAnswer: "$1$",
    explanation: "Determinantul matricei identitate de orice ordin este întotdeauna $1$.",
  },
  {
    id: "dt-3",
    topic: "determinanti",
    type: "input",
    points: 6,
    prompt: "Calculați determinantul matricei $$\\begin{pmatrix} 1 & 2 \\\\ 2 & 4 \\end{pmatrix}.$$",
    correctAnswer: "0",
    explanation: "Liniile sunt proporționale ($L_2 = 2L_1$), deci $\\det = 1 \\cdot 4 - 2 \\cdot 2 = 0$.",
  },
  {
    id: "dt-4",
    topic: "determinanti",
    type: "mcq",
    points: 6,
    prompt: "Dacă $\\det(A) = 5$ pentru o matrice pătratică $A$ de ordinul 2, atunci $\\det(2A)$ este:",
    options: ["$20$", "$10$", "$5$", "$2$"],
    correctAnswer: "$20$",
    explanation:
      "Pentru o matrice de ordin $n$, $\\det(kA) = k^n \\det(A)$. Aici $n=2$, deci $\\det(2A) = 2^2 \\cdot 5 = 20$.",
  },
];
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run typecheck`
Expected: PASS with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/questions/determinanti.ts
git commit -m "$(cat <<'EOF'
Add determinanți exercise bank

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 12: Sisteme de ecuații liniare exercises

**Files:**
- Create: `src/data/questions/sisteme.ts`

**Interfaces:**
- Consumes: `Exercise` from `src/types.ts` (Task 2).
- Produces: `sistemeExercises: Exercise[]` (4 items) — used by Task 17 (`data/index.ts`).

- [ ] **Step 1: Write `src/data/questions/sisteme.ts`**

```ts
import type { Exercise } from "../../types";

export const sistemeExercises: Exercise[] = [
  {
    id: "sy-1",
    topic: "sisteme",
    type: "input",
    points: 6,
    prompt:
      "Rezolvați sistemul $$\\begin{cases} x + y = 5 \\\\ x - y = 1 \\end{cases}$$ și determinați valoarea lui $x$.",
    correctAnswer: "3",
    explanation: "Adunând cele două ecuații: $2x = 6 \\Rightarrow x = 3$.",
  },
  {
    id: "sy-2",
    topic: "sisteme",
    type: "mcq",
    points: 6,
    prompt: "Sistemul $$\\begin{cases} x + y = 3 \\\\ 2x + 2y = 6 \\end{cases}$$ are:",
    options: ["o infinitate de soluții", "soluție unică", "nicio soluție", "exact două soluții"],
    correctAnswer: "o infinitate de soluții",
    explanation:
      "A doua ecuație este de $2$ ori prima, deci cele două drepte coincid și sistemul este compatibil nedeterminat.",
  },
  {
    id: "sy-3",
    topic: "sisteme",
    type: "input",
    points: 6,
    prompt: "Pentru sistemul $$\\begin{cases} x + 2y = 4 \\\\ 3x - y = 5 \\end{cases}$$ determinați valoarea lui $y$.",
    correctAnswer: "1",
    explanation:
      "Din prima ecuație $x = 4 - 2y$. Înlocuind în a doua: $3(4-2y) - y = 5 \\Rightarrow 12 - 7y = 5 \\Rightarrow y = 1$.",
  },
  {
    id: "sy-4",
    topic: "sisteme",
    type: "mcq",
    points: 6,
    prompt: "Un sistem liniar de 2 ecuații cu 2 necunoscute este incompatibil (fără soluții) atunci când:",
    options: [
      "dreptele reprezentate sunt paralele și distincte",
      "dreptele reprezentate sunt confundate",
      "dreptele se intersectează într-un punct",
      "coeficienții necunoscutelor sunt toți nuli",
    ],
    correctAnswer: "dreptele reprezentate sunt paralele și distincte",
    explanation: "Două drepte paralele și distincte nu au niciun punct comun, deci sistemul nu are soluție.",
  },
];
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run typecheck`
Expected: PASS with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/questions/sisteme.ts
git commit -m "$(cat <<'EOF'
Add sisteme de ecuații liniare exercise bank

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 13: Limite de funcții exercises

**Files:**
- Create: `src/data/questions/limite.ts`

**Interfaces:**
- Consumes: `Exercise` from `src/types.ts` (Task 2).
- Produces: `limiteExercises: Exercise[]` (4 items) — used by Task 17 (`data/index.ts`).

- [ ] **Step 1: Write `src/data/questions/limite.ts`**

```ts
import type { Exercise } from "../../types";

export const limiteExercises: Exercise[] = [
  {
    id: "lm-1",
    topic: "limite",
    type: "input",
    points: 6,
    prompt: "Calculați $$\\lim_{x \\to 2} \\dfrac{x^2 - 4}{x - 2}.$$",
    correctAnswer: "4",
    explanation: "$\\dfrac{x^2-4}{x-2} = \\dfrac{(x-2)(x+2)}{x-2} = x+2 \\to 4$.",
  },
  {
    id: "lm-2",
    topic: "limite",
    type: "mcq",
    points: 6,
    prompt: "Calculați $$\\lim_{x \\to \\infty} \\dfrac{3x^2 + 1}{x^2 + 5}.$$",
    options: ["$3$", "$0$", "$\\infty$", "$1$"],
    correctAnswer: "$3$",
    explanation: "Se împarte la $x^2$ (gradul maxim): raportul coeficienților dominanți este $\\dfrac{3}{1} = 3$.",
  },
  {
    id: "lm-3",
    topic: "limite",
    type: "input",
    points: 6,
    prompt: "Calculați $$\\lim_{x \\to 0} \\dfrac{\\sin x}{x}.$$",
    correctAnswer: "1",
    explanation: "Este limita fundamentală $\\lim_{x\\to 0} \\dfrac{\\sin x}{x} = 1$.",
  },
  {
    id: "lm-4",
    topic: "limite",
    type: "mcq",
    points: 6,
    prompt: "Calculați $$\\lim_{x \\to 1} \\dfrac{x^3 - 1}{x - 1}.$$",
    options: ["$3$", "$1$", "$0$", "$2$"],
    correctAnswer: "$3$",
    explanation: "$\\dfrac{x^3-1}{x-1} = x^2+x+1 \\to 1+1+1 = 3$.",
  },
];
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run typecheck`
Expected: PASS with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/questions/limite.ts
git commit -m "$(cat <<'EOF'
Add limite de funcții exercise bank

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 14: Derivate și aplicații exercises

**Files:**
- Create: `src/data/questions/derivate.ts`

**Interfaces:**
- Consumes: `Exercise` from `src/types.ts` (Task 2).
- Produces: `derivateExercises: Exercise[]` (4 items) — used by Task 17 (`data/index.ts`).

- [ ] **Step 1: Write `src/data/questions/derivate.ts`**

```ts
import type { Exercise } from "../../types";

export const derivateExercises: Exercise[] = [
  {
    id: "dv-1",
    topic: "derivate",
    type: "input",
    points: 6,
    prompt: "Fie $f(x) = x^3$. Calculați $f'(2)$.",
    correctAnswer: "12",
    explanation: "$f'(x) = 3x^2$, deci $f'(2) = 3 \\cdot 4 = 12$.",
  },
  {
    id: "dv-2",
    topic: "derivate",
    type: "mcq",
    points: 6,
    prompt: "Derivata funcției $f(x) = \\sin x$ este:",
    options: ["$\\cos x$", "$-\\cos x$", "$-\\sin x$", "$\\tan x$"],
    correctAnswer: "$\\cos x$",
    explanation: "$(\\sin x)' = \\cos x$.",
  },
  {
    id: "dv-3",
    topic: "derivate",
    type: "input",
    points: 6,
    prompt: "Fie $f(x) = x^2 - 4x + 3$. Determinați abscisa punctului de minim (soluția ecuației $f'(x) = 0$).",
    correctAnswer: "2",
    explanation: "$f'(x) = 2x - 4 = 0 \\Rightarrow x = 2$.",
  },
  {
    id: "dv-4",
    topic: "derivate",
    type: "mcq",
    points: 6,
    prompt: "O funcție derivabilă $f$ este crescătoare pe un interval dacă:",
    options: [
      "$f'(x) \\geq 0$ pe acel interval",
      "$f'(x) \\leq 0$ pe acel interval",
      "$f''(x) = 0$ pe acel interval",
      "$f(x) = 0$ pe acel interval",
    ],
    correctAnswer: "$f'(x) \\geq 0$ pe acel interval",
    explanation: "Semnul pozitiv al derivatei pe un interval arată că funcția este crescătoare acolo.",
  },
];
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run typecheck`
Expected: PASS with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/questions/derivate.ts
git commit -m "$(cat <<'EOF'
Add derivate și aplicații exercise bank

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 15: Primitive și integrale definite exercises

**Files:**
- Create: `src/data/questions/integrale.ts`

**Interfaces:**
- Consumes: `Exercise` from `src/types.ts` (Task 2).
- Produces: `integraleExercises: Exercise[]` (4 items) — used by Task 17 (`data/index.ts`).

- [ ] **Step 1: Write `src/data/questions/integrale.ts`**

```ts
import type { Exercise } from "../../types";

export const integraleExercises: Exercise[] = [
  {
    id: "in-1",
    topic: "integrale",
    type: "input",
    points: 6,
    prompt: "Calculați $$\\int_0^1 x^2 \\, dx.$$",
    correctAnswer: "1/3",
    acceptedAnswers: ["0.33", "0,33"],
    explanation: "$\\int_0^1 x^2\\,dx = \\left[\\dfrac{x^3}{3}\\right]_0^1 = \\dfrac{1}{3}$.",
  },
  {
    id: "in-2",
    topic: "integrale",
    type: "mcq",
    points: 6,
    prompt: "O primitivă a funcției $f(x) = 2x$ este:",
    options: ["$x^2$", "$2x^2$", "$x^2/2$", "$2$"],
    correctAnswer: "$x^2$",
    explanation: "$(x^2)' = 2x$, deci $x^2$ este o primitivă a lui $2x$.",
  },
  {
    id: "in-3",
    topic: "integrale",
    type: "input",
    points: 6,
    prompt: "Calculați $$\\int_0^2 3 \\, dx.$$",
    correctAnswer: "6",
    explanation: "Pentru o funcție constantă, $\\int_0^2 3\\,dx = 3 \\cdot (2-0) = 6$.",
  },
  {
    id: "in-4",
    topic: "integrale",
    type: "mcq",
    points: 6,
    prompt: "Care este $\\int e^x \\, dx$?",
    options: ["$e^x + C$", "$xe^x + C$", "$\\dfrac{e^x}{x} + C$", "$\\ln x + C$"],
    correctAnswer: "$e^x + C$",
    explanation: "$(e^x)' = e^x$, deci $e^x$ este propria sa primitivă.",
  },
];
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run typecheck`
Expected: PASS with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/questions/integrale.ts
git commit -m "$(cat <<'EOF'
Add primitive și integrale definite exercise bank

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 16: Multi-part problems (Subiectul II / III)

**Files:**
- Create: `src/data/questions/problems.ts`

**Interfaces:**
- Consumes: `Problem` from `src/types.ts` (Task 2).
- Produces: `algebraProblems: Problem[]` (4 items, `subject: "II"`), `analysisProblems: Problem[]` (4 items, `subject: "III"`) — used by Task 17 (`data/index.ts`).

- [ ] **Step 1: Write `src/data/questions/problems.ts`**

```ts
import type { Problem } from "../../types";

export const algebraProblems: Problem[] = [
  {
    id: "pb-a1",
    topic: "numere-complexe",
    subject: "II",
    statement: "Se consideră numărul complex $z = 1 + i\\sqrt{3}$.",
    subpoints: [
      {
        id: "pb-a1-a",
        label: "a",
        type: "input",
        points: 5,
        prompt: "Calculați modulul $|z|$.",
        correctAnswer: "2",
        explanation: "$|z| = \\sqrt{1^2 + (\\sqrt{3})^2} = \\sqrt{1+3} = 2$.",
      },
      {
        id: "pb-a1-b",
        label: "b",
        type: "mcq",
        points: 5,
        prompt: "Calculați $z^2$.",
        options: ["$-2 + 2i\\sqrt{3}$", "$2 + 2i\\sqrt{3}$", "$-2 - 2i\\sqrt{3}$", "$4$"],
        correctAnswer: "$-2 + 2i\\sqrt{3}$",
        explanation:
          "$z^2 = (1+i\\sqrt{3})^2 = 1 + 2i\\sqrt{3} + i^2 \\cdot 3 = 1 + 2i\\sqrt{3} - 3 = -2 + 2i\\sqrt{3}$.",
      },
      {
        id: "pb-a1-c",
        label: "c",
        type: "input",
        points: 5,
        prompt: "Determinați partea reală a lui $z^2$, adică $\\mathrm{Re}(z^2)$.",
        correctAnswer: "-2",
        explanation: "Din $z^2 = -2 + 2i\\sqrt{3}$, partea reală este $-2$.",
      },
    ],
  },
  {
    id: "pb-a2",
    topic: "combinatorica",
    subject: "II",
    statement: "La un concurs se alege o echipă de 3 elevi dintr-o clasă de 20 de elevi.",
    subpoints: [
      {
        id: "pb-a2-a",
        label: "a",
        type: "input",
        points: 5,
        prompt: "Calculați numărul de moduri în care poate fi formată echipa, dacă ordinea nu contează, adică $C_{20}^3$.",
        correctAnswer: "1140",
        explanation: "$C_{20}^3 = \\dfrac{20!}{3! \\cdot 17!} = \\dfrac{20 \\cdot 19 \\cdot 18}{6} = 1140$.",
      },
      {
        id: "pb-a2-b",
        label: "b",
        type: "mcq",
        points: 5,
        prompt: "Dacă se aleg 3 elevi cu roluri distincte (căpitan, secretar, membru), numărul de moduri este:",
        options: ["$A_{20}^3 = 6840$", "$C_{20}^3 = 1140$", "$20^3 = 8000$", "$3! = 6$"],
        correctAnswer: "$A_{20}^3 = 6840$",
        explanation:
          "Rolurile fiind distincte, ordinea contează, deci se folosesc aranjamente: $A_{20}^3 = 20 \\cdot 19 \\cdot 18 = 6840$.",
      },
      {
        id: "pb-a2-c",
        label: "c",
        type: "input",
        points: 5,
        prompt: "Calculați $A_{20}^3 - C_{20}^3$.",
        correctAnswer: "5700",
        explanation: "$6840 - 1140 = 5700$.",
      },
    ],
  },
  {
    id: "pb-a3",
    topic: "matrice",
    subject: "II",
    statement: "Se consideră matricea $$A = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}.$$",
    subpoints: [
      {
        id: "pb-a3-a",
        label: "a",
        type: "input",
        points: 5,
        prompt: "Calculați elementul de pe linia 1, coloana 2 al matricei $A^2$.",
        correctAnswer: "4",
        explanation: "$A^2 = A \\cdot A = \\begin{pmatrix} 1 & 4 \\\\ 0 & 1 \\end{pmatrix}$, deci elementul $(1,2)$ este $4$.",
      },
      {
        id: "pb-a3-b",
        label: "b",
        type: "mcq",
        points: 5,
        prompt: "Matricea $A^2$ este:",
        options: [
          "$\\begin{pmatrix} 1 & 4 \\\\ 0 & 1 \\end{pmatrix}$",
          "$\\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}$",
          "$\\begin{pmatrix} 2 & 4 \\\\ 0 & 2 \\end{pmatrix}$",
          "$\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$",
        ],
        correctAnswer: "$\\begin{pmatrix} 1 & 4 \\\\ 0 & 1 \\end{pmatrix}$",
        explanation: "Înmulțind $A$ cu ea însăși se obține $\\begin{pmatrix} 1 & 4 \\\\ 0 & 1 \\end{pmatrix}$.",
      },
      {
        id: "pb-a3-c",
        label: "c",
        type: "input",
        points: 5,
        prompt: "Calculați urma matricei $A^2$ (suma elementelor de pe diagonala principală).",
        correctAnswer: "2",
        explanation: "Diagonala principală a lui $A^2$ este $1, 1$, deci urma este $1+1=2$.",
      },
    ],
  },
  {
    id: "pb-a4",
    topic: "determinanti",
    subject: "II",
    statement:
      "Se consideră matricea $$A = \\begin{pmatrix} m & 1 \\\\ 2 & m \\end{pmatrix},$$ unde $m$ este un parametru real.",
    subpoints: [
      {
        id: "pb-a4-a",
        label: "a",
        type: "input",
        points: 5,
        prompt: "Calculați $\\det(A)$ pentru $m = 3$.",
        correctAnswer: "7",
        explanation: "$\\det(A) = m^2 - 2$. Pentru $m=3$: $9 - 2 = 7$.",
      },
      {
        id: "pb-a4-b",
        label: "b",
        type: "mcq",
        points: 5,
        prompt: "Expresia $\\det(A)$ în funcție de $m$ este:",
        options: ["$m^2 - 2$", "$m^2 + 2$", "$2m - 1$", "$m - 2$"],
        correctAnswer: "$m^2 - 2$",
        explanation: "$\\det(A) = m \\cdot m - 1 \\cdot 2 = m^2 - 2$.",
      },
      {
        id: "pb-a4-c",
        label: "c",
        type: "input",
        points: 5,
        prompt: "Determinați soluția pozitivă a ecuației $\\det(A) = 0$.",
        correctAnswer: "sqrt(2)",
        acceptedAnswers: ["√2", "radical(2)", "1.41"],
        explanation: "$m^2 - 2 = 0 \\Rightarrow m = \\pm\\sqrt{2}$. Soluția pozitivă este $\\sqrt{2}$.",
      },
    ],
  },
];

export const analysisProblems: Problem[] = [
  {
    id: "pb-b1",
    topic: "derivate",
    subject: "III",
    statement: "Se consideră funcția $f: \\mathbb{R} \\to \\mathbb{R}$, $f(x) = x^3 - 3x + 2$.",
    subpoints: [
      {
        id: "pb-b1-a",
        label: "a",
        type: "input",
        points: 5,
        prompt: "Calculați $f'(x)$ și evaluați $f'(1)$.",
        correctAnswer: "0",
        explanation: "$f'(x) = 3x^2 - 3$, deci $f'(1) = 3 - 3 = 0$.",
      },
      {
        id: "pb-b1-b",
        label: "b",
        type: "mcq",
        points: 5,
        prompt: "Punctele critice ale funcției (soluțiile ecuației $f'(x) = 0$) sunt:",
        options: ["$x = -1$ și $x = 1$", "$x = 0$", "$x = 3$", "$x = -3$ și $x = 3$"],
        correctAnswer: "$x = -1$ și $x = 1$",
        explanation: "$3x^2 - 3 = 0 \\Rightarrow x^2 = 1 \\Rightarrow x = \\pm 1$.",
      },
      {
        id: "pb-b1-c",
        label: "c",
        type: "input",
        points: 5,
        prompt: "Calculați $f(1)$.",
        correctAnswer: "0",
        explanation: "$f(1) = 1 - 3 + 2 = 0$.",
      },
    ],
  },
  {
    id: "pb-b2",
    topic: "limite",
    subject: "III",
    statement: "Se consideră funcția $f: \\mathbb{R} \\setminus \\{1\\} \\to \\mathbb{R}$, $f(x) = \\dfrac{x^2 - 1}{x - 1}$.",
    subpoints: [
      {
        id: "pb-b2-a",
        label: "a",
        type: "input",
        points: 5,
        prompt: "Calculați $\\lim_{x \\to 1} f(x)$.",
        correctAnswer: "2",
        explanation: "$f(x) = \\dfrac{(x-1)(x+1)}{x-1} = x+1 \\to 2$.",
      },
      {
        id: "pb-b2-b",
        label: "b",
        type: "mcq",
        points: 5,
        prompt: "Pentru ca $f$ să poată fi prelungită prin continuitate în $x=1$, valoarea $f(1)$ trebuie definită ca:",
        options: ["$2$", "$1$", "$0$", "nu poate fi continuă"],
        correctAnswer: "$2$",
        explanation: "Limita în $x=1$ este $2$, deci prelungirea prin continuitate cere $f(1) = 2$.",
      },
      {
        id: "pb-b2-c",
        label: "c",
        type: "input",
        points: 5,
        prompt: "Calculați $\\lim_{x \\to \\infty} \\dfrac{f(x)}{x}$.",
        correctAnswer: "1",
        explanation: "$\\dfrac{f(x)}{x} = \\dfrac{x+1}{x} \\to 1$.",
      },
    ],
  },
  {
    id: "pb-b3",
    topic: "integrale",
    subject: "III",
    statement: "Se consideră funcția $f: \\mathbb{R} \\to \\mathbb{R}$, $f(x) = 3x^2 - 2x$.",
    subpoints: [
      {
        id: "pb-b3-a",
        label: "a",
        type: "input",
        points: 5,
        prompt: "Determinați primitiva $F$ a lui $f$ cu $F(0) = 0$ și calculați $F(1)$.",
        correctAnswer: "0",
        explanation: "$F(x) = x^3 - x^2 + C$, iar $F(0)=0 \\Rightarrow C=0$. Deci $F(1) = 1 - 1 = 0$.",
      },
      {
        id: "pb-b3-b",
        label: "b",
        type: "mcq",
        points: 5,
        prompt: "O primitivă generală a funcției $f$ este:",
        options: ["$x^3 - x^2 + C$", "$3x^3 - 2x^2 + C$", "$x^3 + x^2 + C$", "$6x - 2 + C$"],
        correctAnswer: "$x^3 - x^2 + C$",
        explanation: "$(x^3 - x^2)' = 3x^2 - 2x = f(x)$.",
      },
      {
        id: "pb-b3-c",
        label: "c",
        type: "input",
        points: 5,
        prompt: "Calculați $$\\int_0^2 f(x)\\, dx.$$",
        correctAnswer: "4",
        explanation: "$\\int_0^2 (3x^2-2x)\\,dx = \\left[x^3 - x^2\\right]_0^2 = (8-4) - 0 = 4$.",
      },
    ],
  },
  {
    id: "pb-b4",
    topic: "derivate",
    subject: "III",
    statement: "Se consideră funcția $f: (0, \\infty) \\to \\mathbb{R}$, $f(x) = \\ln x - x$.",
    subpoints: [
      {
        id: "pb-b4-a",
        label: "a",
        type: "input",
        points: 5,
        prompt: "Calculați $f'(x)$ și evaluați $f'(1)$.",
        correctAnswer: "0",
        explanation: "$f'(x) = \\dfrac{1}{x} - 1$, deci $f'(1) = 1 - 1 = 0$.",
      },
      {
        id: "pb-b4-b",
        label: "b",
        type: "mcq",
        points: 5,
        prompt: "Semnul derivatei $f'(x) = \\dfrac{1}{x} - 1$ pentru $x \\in (0,1)$ este:",
        options: [
          "pozitiv, deci $f$ este crescătoare pe $(0,1)$",
          "negativ, deci $f$ este descrescătoare pe $(0,1)$",
          "nul pe tot intervalul",
          "nu se poate determina",
        ],
        correctAnswer: "pozitiv, deci $f$ este crescătoare pe $(0,1)$",
        explanation: "Pentru $x \\in (0,1)$ avem $\\dfrac{1}{x} > 1$, deci $f'(x) > 0$.",
      },
      {
        id: "pb-b4-c",
        label: "c",
        type: "input",
        points: 5,
        prompt: "Știind că $x=1$ este punct de maxim, calculați valoarea maximă $f(1)$.",
        correctAnswer: "-1",
        explanation: "$f(1) = \\ln 1 - 1 = 0 - 1 = -1$.",
      },
    ],
  },
];
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run typecheck`
Expected: PASS with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/questions/problems.ts
git commit -m "$(cat <<'EOF'
Add multi-part algebra and analysis problems for Subiectul II/III

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 17: Content bank index and integrity tests

**Files:**
- Create: `src/data/index.ts`
- Test: `src/data/index.test.ts`

**Interfaces:**
- Consumes: all exercise arrays from Tasks 8-15, `algebraProblems`/`analysisProblems` from Task 16, `Topic`/`Exercise`/`Problem` from `src/types.ts` (Task 2).
- Produces: `TOPICS: Topic[]`, `TOPIC_LABELS: Record<Topic, string>`, `ALL_EXERCISES: Exercise[]`, `ALL_PROBLEMS: Problem[]`, `exercisesByTopic(topic: Topic): Exercise[]` — used by Task 20 (`Home`), Task 21 (`TopicQuiz`), Task 22 (`Exam`), Task 23 (`Stats`).

- [ ] **Step 1: Write `src/data/index.ts`**

```ts
import type { Exercise, Problem, Topic } from "../types";
import { numereComplexeExercises } from "./questions/numereComplexe";
import { combinatoricaExercises } from "./questions/combinatorica";
import { matriceExercises } from "./questions/matrice";
import { determinantiExercises } from "./questions/determinanti";
import { sistemeExercises } from "./questions/sisteme";
import { limiteExercises } from "./questions/limite";
import { derivateExercises } from "./questions/derivate";
import { integraleExercises } from "./questions/integrale";
import { algebraProblems, analysisProblems } from "./questions/problems";

export const TOPICS: Topic[] = [
  "numere-complexe",
  "combinatorica",
  "matrice",
  "determinanti",
  "sisteme",
  "limite",
  "derivate",
  "integrale",
];

export const TOPIC_LABELS: Record<Topic, string> = {
  "numere-complexe": "Numere complexe",
  combinatorica: "Combinatorică",
  matrice: "Matrice",
  determinanti: "Determinanți",
  sisteme: "Sisteme de ecuații liniare",
  limite: "Limite de funcții",
  derivate: "Derivate și aplicații",
  integrale: "Primitive și integrale definite",
};

export const ALL_EXERCISES: Exercise[] = [
  ...numereComplexeExercises,
  ...combinatoricaExercises,
  ...matriceExercises,
  ...determinantiExercises,
  ...sistemeExercises,
  ...limiteExercises,
  ...derivateExercises,
  ...integraleExercises,
];

export const ALL_PROBLEMS: Problem[] = [...algebraProblems, ...analysisProblems];

export function exercisesByTopic(topic: Topic): Exercise[] {
  return ALL_EXERCISES.filter((exercise) => exercise.topic === topic);
}
```

- [ ] **Step 2: Write `src/data/index.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { ALL_EXERCISES, ALL_PROBLEMS, TOPICS, exercisesByTopic } from "./index";

describe("question bank integrity", () => {
  it("has unique exercise ids", () => {
    const ids = ALL_EXERCISES.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique problem and subpoint ids", () => {
    const ids = ALL_PROBLEMS.flatMap((p) => [p.id, ...p.subpoints.map((s) => s.id)]);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has at least one exercise per topic", () => {
    for (const topic of TOPICS) {
      expect(exercisesByTopic(topic).length).toBeGreaterThan(0);
    }
  });

  it("every exercise is worth 6 points", () => {
    for (const exercise of ALL_EXERCISES) {
      expect(exercise.points).toBe(6);
    }
  });

  it("has subpoints summing to 15 points per problem", () => {
    for (const problem of ALL_PROBLEMS) {
      const sum = problem.subpoints.reduce((acc, s) => acc + s.points, 0);
      expect(sum).toBe(15);
    }
  });

  it("has at least 2 algebra and 2 analysis problems", () => {
    expect(ALL_PROBLEMS.filter((p) => p.subject === "II").length).toBeGreaterThanOrEqual(2);
    expect(ALL_PROBLEMS.filter((p) => p.subject === "III").length).toBeGreaterThanOrEqual(2);
  });

  it("every mcq item's correctAnswer is present among its options", () => {
    const allGradable = [...ALL_EXERCISES, ...ALL_PROBLEMS.flatMap((p) => p.subpoints)];
    for (const item of allGradable) {
      if (item.type === "mcq") {
        expect(item.options).toBeDefined();
        expect(item.options).toContain(item.correctAnswer);
      }
    }
  });
});
```

- [ ] **Step 3: Run the tests**

Run: `npx vitest run src/data/index.test.ts`
Expected: PASS, 6 tests passing. If any test fails, it points to an authoring mistake in Tasks 8-16 (e.g. an `mcq` option string that doesn't exactly match `correctAnswer`, or a subpoint point total that isn't 15) — go back and fix the offending content file.

- [ ] **Step 4: Verify the whole project type-checks**

Run: `npm run typecheck`
Expected: PASS with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/data/index.ts src/data/index.test.ts
git commit -m "$(cat <<'EOF'
Wire up combined question bank with integrity tests

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 18: QuestionCard component

**Files:**
- Create: `src/components/QuestionCard.tsx`

**Interfaces:**
- Consumes: `GradableItem` from `src/types.ts` (Task 2), `isCorrectAnswer` from `src/lib/grading.ts` (Task 3), `MathText` from `src/components/MathText.tsx` (Task 7).
- Produces: `QuestionCard(props: QuestionCardProps): JSX.Element` with:
  ```ts
  interface QuestionCardProps {
    item: GradableItem;
    label?: string;
    mode: "practice" | "collect" | "review";
    value?: string;
    onChange?: (value: string) => void;
    onSubmit?: (value: string, correct: boolean) => void;
    reviewResult?: { correct: boolean; earned: number; possible: number };
  }
  ```
  - `mode: "practice"` — self-contained: tracks its own input state, shows a submit button (input type) or grades on click (mcq type), locks and reveals feedback + explanation after answering, calls `onSubmit(value, correct)` once.
  - `mode: "collect"` — controlled: renders `value`/`onChange` for the parent to track answers without grading or feedback (used mid-exam, before submission).
  - `mode: "review"` — read-only: renders the given `value`, always shows the explanation and `reviewResult` (used after exam grading).

  Used by Task 20 (`Home` — no, `Home` doesn't use it), Task 21 (`TopicQuiz`, `mode="practice"`), Task 22 (`Exam`, `mode="collect"`/`"review"`).

- [ ] **Step 1: Write `src/components/QuestionCard.tsx`**

```tsx
import { useState } from "react";
import type { GradableItem } from "../types";
import { isCorrectAnswer } from "../lib/grading";
import { MathText } from "./MathText";

interface QuestionCardProps {
  item: GradableItem;
  label?: string;
  mode: "practice" | "collect" | "review";
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string, correct: boolean) => void;
  reviewResult?: { correct: boolean; earned: number; possible: number };
}

export function QuestionCard({ item, label, mode, value, onChange, onSubmit, reviewResult }: QuestionCardProps) {
  const [practiceValue, setPracticeValue] = useState("");
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);
  const [practiceCorrect, setPracticeCorrect] = useState(false);

  const currentValue = mode === "collect" ? value ?? "" : practiceValue;
  const isLocked = mode === "practice" && practiceSubmitted;

  const submitPractice = (answer: string) => {
    if (isLocked) return;
    const correct = isCorrectAnswer(answer, item);
    setPracticeValue(answer);
    setPracticeCorrect(correct);
    setPracticeSubmitted(true);
    onSubmit?.(answer, correct);
  };

  const showExplanation = mode === "review" || practiceSubmitted;

  return (
    <div className="question-card">
      {label && <div className="question-card__label">{label})</div>}
      <div className="question-card__prompt">
        <MathText text={item.prompt} />
      </div>

      {item.type === "mcq" ? (
        <div className="question-card__options">
          {item.options?.map((option) => {
            const selected = currentValue === option;
            return (
              <button
                key={option}
                type="button"
                className={"question-card__option" + (selected ? " question-card__option--selected" : "")}
                disabled={isLocked}
                onClick={() => {
                  if (mode === "collect") {
                    onChange?.(option);
                  } else {
                    submitPractice(option);
                  }
                }}
              >
                <MathText text={option} />
              </button>
            );
          })}
        </div>
      ) : (
        <div className="question-card__input-row">
          <input
            type="text"
            value={currentValue}
            disabled={isLocked}
            onChange={(event) => {
              if (mode === "collect") {
                onChange?.(event.target.value);
              } else {
                setPracticeValue(event.target.value);
              }
            }}
          />
          {mode === "practice" && (
            <button type="button" onClick={() => submitPractice(practiceValue)} disabled={isLocked}>
              Verifică
            </button>
          )}
        </div>
      )}

      {mode === "practice" && practiceSubmitted && (
        <div
          className={practiceCorrect ? "question-card__feedback--correct" : "question-card__feedback--incorrect"}
        >
          {practiceCorrect ? "Corect!" : "Greșit."}
        </div>
      )}

      {mode === "review" && reviewResult && (
        <div
          className={reviewResult.correct ? "question-card__feedback--correct" : "question-card__feedback--incorrect"}
        >
          {reviewResult.correct ? "Corect" : "Greșit"} ({reviewResult.earned}/{reviewResult.possible} puncte)
        </div>
      )}

      {showExplanation && (
        <div className="question-card__explanation">
          <strong>Explicație:</strong> <MathText text={item.explanation} />
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run typecheck`
Expected: PASS with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/QuestionCard.tsx
git commit -m "$(cat <<'EOF'
Add QuestionCard component with practice/collect/review modes

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 19: TopicCard component

**Files:**
- Create: `src/components/TopicCard.tsx`

**Interfaces:**
- Consumes: `Topic` from `src/types.ts` (Task 2), `Link` from `react-router-dom`.
- Produces: `TopicCard(props: { topic: Topic; label: string; accuracy: number; attempted: number }): JSX.Element`, a link to `/quiz/:topic` — used by Task 20 (`Home`).

- [ ] **Step 1: Write `src/components/TopicCard.tsx`**

```tsx
import { Link } from "react-router-dom";
import type { Topic } from "../types";

interface TopicCardProps {
  topic: Topic;
  label: string;
  accuracy: number;
  attempted: number;
}

export function TopicCard({ topic, label, accuracy, attempted }: TopicCardProps) {
  return (
    <Link to={`/quiz/${topic}`} className="topic-card">
      <div className="topic-card__title">{label}</div>
      <div className="topic-card__stats">
        {attempted === 0 ? "Neîncercat încă" : `${Math.round(accuracy * 100)}% corect (${attempted} întrebări)`}
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run typecheck`
Expected: PASS with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/TopicCard.tsx
git commit -m "$(cat <<'EOF'
Add TopicCard component

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 20: Home page

**Files:**
- Create: `src/pages/Home.tsx`

**Interfaces:**
- Consumes: `TOPICS`, `TOPIC_LABELS` from `src/data/index.ts` (Task 17); `getAttempts` from `src/lib/storage.ts` (Task 4); `computeStats` from `src/lib/stats.ts` (Task 5); `TopicCard` from `src/components/TopicCard.tsx` (Task 19).
- Produces: `Home(): JSX.Element` (named export) — used by Task 24 (`App.tsx` routing) at path `/`.

- [ ] **Step 1: Write `src/pages/Home.tsx`**

```tsx
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { TOPICS, TOPIC_LABELS } from "../data";
import { getAttempts } from "../lib/storage";
import { computeStats } from "../lib/stats";
import { TopicCard } from "../components/TopicCard";

export function Home() {
  const stats = useMemo(() => computeStats(getAttempts(), TOPICS), []);

  return (
    <div className="page page--home">
      <h1>BacMate — Pregătire Bacalaureat M2</h1>
      <p className="page__intro">Alege un capitol pentru exersare, sau susține un examen simulat complet.</p>

      {stats.total > 0 && (
        <p className="page__summary">
          Progres general: {Math.round(stats.accuracy * 100)}% corect din {stats.total} întrebări.{" "}
          <Link to="/stats">Vezi statistici detaliate</Link>
        </p>
      )}

      <div className="topic-grid">
        {TOPICS.map((topic) => {
          const topicStats = stats.byTopic.find((t) => t.topic === topic)!;
          return (
            <TopicCard
              key={topic}
              topic={topic}
              label={TOPIC_LABELS[topic]}
              accuracy={topicStats.accuracy}
              attempted={topicStats.total}
            />
          );
        })}
      </div>

      <Link to="/exam" className="exam-cta">
        Susține un examen simulat (Subiectul I, II, III)
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run typecheck`
Expected: PASS with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "$(cat <<'EOF'
Add Home page with topic grid and progress summary

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 21: TopicQuiz page

**Files:**
- Create: `src/pages/TopicQuiz.tsx`

**Interfaces:**
- Consumes: `Topic` from `src/types.ts` (Task 2); `TOPIC_LABELS`, `exercisesByTopic` from `src/data/index.ts` (Task 17); `logAttempt` from `src/lib/storage.ts` (Task 4); `QuestionCard` from `src/components/QuestionCard.tsx` (Task 18); `useParams`, `Link` from `react-router-dom`.
- Produces: `TopicQuiz(): JSX.Element` (named export), reads `topic` from the route param — used by Task 24 (`App.tsx` routing) at path `/quiz/:topic`.

- [ ] **Step 1: Write `src/pages/TopicQuiz.tsx`**

```tsx
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Topic } from "../types";
import { TOPIC_LABELS, exercisesByTopic } from "../data";
import { logAttempt } from "../lib/storage";
import { QuestionCard } from "../components/QuestionCard";

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export function TopicQuiz() {
  const { topic } = useParams<{ topic: Topic }>();
  const exercises = useMemo(() => (topic ? shuffle(exercisesByTopic(topic)) : []), [topic]);
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentAnswered, setCurrentAnswered] = useState(false);

  if (!topic || exercises.length === 0) {
    return (
      <div className="page">
        <p>Capitol necunoscut.</p>
        <Link to="/">Înapoi acasă</Link>
      </div>
    );
  }

  if (index >= exercises.length) {
    return (
      <div className="page page--quiz">
        <h1>{TOPIC_LABELS[topic]}</h1>
        <p>
          Ai terminat! Scor: {correctCount}/{exercises.length}.
        </p>
        <Link to="/">Înapoi acasă</Link>
      </div>
    );
  }

  const current = exercises[index];

  const handleSubmit = (_value: string, correct: boolean) => {
    logAttempt({ itemId: current.id, topic, correct, timestamp: Date.now() });
    if (correct) setCorrectCount((c) => c + 1);
    setCurrentAnswered(true);
  };

  const handleNext = () => {
    setCurrentAnswered(false);
    setIndex((i) => i + 1);
  };

  return (
    <div className="page page--quiz">
      <h1>{TOPIC_LABELS[topic]}</h1>
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
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run typecheck`
Expected: PASS with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/TopicQuiz.tsx
git commit -m "$(cat <<'EOF'
Add TopicQuiz page for one-at-a-time topic practice

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 22: Exam page

**Files:**
- Create: `src/pages/Exam.tsx`

**Interfaces:**
- Consumes: `ALL_EXERCISES`, `ALL_PROBLEMS` from `src/data/index.ts` (Task 17); `buildExam`, `gradeExam`, `ExamSession`, `ExamResult` from `src/lib/examBuilder.ts` (Task 6); `logAttempt` from `src/lib/storage.ts` (Task 4); `QuestionCard` from `src/components/QuestionCard.tsx` (Task 18); `MathText` from `src/components/MathText.tsx` (Task 7); `Problem` from `src/types.ts` (Task 2).
- Produces: `Exam(): JSX.Element` (named export) — used by Task 24 (`App.tsx` routing) at path `/exam`.

- [ ] **Step 1: Write `src/pages/Exam.tsx`**

```tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Problem } from "../types";
import { ALL_EXERCISES, ALL_PROBLEMS } from "../data";
import { buildExam, gradeExam, type ExamResult, type ExamSession } from "../lib/examBuilder";
import { logAttempt } from "../lib/storage";
import { QuestionCard } from "../components/QuestionCard";
import { MathText } from "../components/MathText";

function findResult(result: ExamResult, itemId: string) {
  const all = [...result.subiectI, ...result.subiectII, ...result.subiectIII];
  return all.find((r) => r.itemId === itemId);
}

function ProblemBlock({
  problem,
  answers,
  onChange,
  result,
}: {
  problem: Problem;
  answers: Record<string, string>;
  onChange: (id: string, value: string) => void;
  result: ExamResult | null;
}) {
  return (
    <div className="problem-block">
      <div className="problem-block__statement">
        <MathText text={problem.statement} />
      </div>
      {problem.subpoints.map((subpoint) => (
        <QuestionCard
          key={subpoint.id}
          item={subpoint}
          label={subpoint.label}
          mode={result ? "review" : "collect"}
          value={answers[subpoint.id]}
          onChange={(value) => onChange(subpoint.id, value)}
          reviewResult={result ? findResult(result, subpoint.id) : undefined}
        />
      ))}
    </div>
  );
}

export function Exam() {
  const [session] = useState<ExamSession>(() => buildExam(ALL_EXERCISES, ALL_PROBLEMS));
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ExamResult | null>(null);

  const handleChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitExam = () => {
    const graded = gradeExam(session, answers);
    setResult(graded);

    const allProblems = [...session.subiectII, ...session.subiectIII];
    for (const itemResult of [...graded.subiectI, ...graded.subiectII, ...graded.subiectIII]) {
      const exercise = session.subiectI.find((e) => e.id === itemResult.itemId);
      const topic =
        exercise?.topic ?? allProblems.find((p) => p.subpoints.some((sp) => sp.id === itemResult.itemId))?.topic;
      if (topic) {
        logAttempt({ itemId: itemResult.itemId, topic, correct: itemResult.correct, timestamp: Date.now() });
      }
    }
  };

  return (
    <div className="page page--exam">
      <h1>Examen simulat — Bacalaureat M2</h1>

      <section>
        <h2>SUBIECTUL I ({result ? result.subtotalI : 30} puncte)</h2>
        {session.subiectI.map((exercise) => (
          <QuestionCard
            key={exercise.id}
            item={exercise}
            mode={result ? "review" : "collect"}
            value={answers[exercise.id]}
            onChange={(value) => handleChange(exercise.id, value)}
            reviewResult={result ? findResult(result, exercise.id) : undefined}
          />
        ))}
      </section>

      <section>
        <h2>SUBIECTUL II ({result ? result.subtotalII : 30} puncte)</h2>
        {session.subiectII.map((problem) => (
          <ProblemBlock key={problem.id} problem={problem} answers={answers} onChange={handleChange} result={result} />
        ))}
      </section>

      <section>
        <h2>SUBIECTUL III ({result ? result.subtotalIII : 30} puncte)</h2>
        {session.subiectIII.map((problem) => (
          <ProblemBlock key={problem.id} problem={problem} answers={answers} onChange={handleChange} result={result} />
        ))}
      </section>

      {!result ? (
        <button type="button" className="exam-submit" onClick={handleSubmitExam}>
          Predă lucrarea
        </button>
      ) : (
        <div className="exam-result">
          <p>
            Total: {result.total}/100 (din care {result.oficiu} puncte din oficiu). Nota:{" "}
            <strong>{result.nota.toFixed(2)}</strong>
          </p>
          <Link to="/">Înapoi acasă</Link>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run typecheck`
Expected: PASS with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Exam.tsx
git commit -m "$(cat <<'EOF'
Add Exam page with full Subiectul I/II/III structure and grading

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 23: Stats page

**Files:**
- Create: `src/pages/Stats.tsx`

**Interfaces:**
- Consumes: `TOPICS`, `TOPIC_LABELS` from `src/data/index.ts` (Task 17); `getAttempts` from `src/lib/storage.ts` (Task 4); `computeStats` from `src/lib/stats.ts` (Task 5).
- Produces: `Stats(): JSX.Element` (named export) — used by Task 24 (`App.tsx` routing) at path `/stats`.

- [ ] **Step 1: Write `src/pages/Stats.tsx`**

```tsx
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { TOPICS, TOPIC_LABELS } from "../data";
import { getAttempts } from "../lib/storage";
import { computeStats } from "../lib/stats";

export function Stats() {
  const stats = useMemo(() => computeStats(getAttempts(), TOPICS), []);

  return (
    <div className="page page--stats">
      <h1>Statistici</h1>
      {stats.total === 0 ? (
        <p>Nu ai răspuns încă la nicio întrebare.</p>
      ) : (
        <>
          <p>
            Total: {stats.correct}/{stats.total} răspunsuri corecte ({Math.round(stats.accuracy * 100)}%).
          </p>
          <ul className="stats-list">
            {stats.byTopic.map((topicStats) => (
              <li key={topicStats.topic} className="stats-list__item">
                <span>{TOPIC_LABELS[topicStats.topic]}</span>
                <div className="stats-bar">
                  <div
                    className="stats-bar__fill"
                    style={{ width: `${topicStats.total === 0 ? 0 : Math.round(topicStats.accuracy * 100)}%` }}
                  />
                </div>
                <span>
                  {topicStats.total === 0
                    ? "—"
                    : `${Math.round(topicStats.accuracy * 100)}% (${topicStats.correct}/${topicStats.total})`}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
      <Link to="/">Înapoi acasă</Link>
    </div>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run typecheck`
Expected: PASS with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Stats.tsx
git commit -m "$(cat <<'EOF'
Add Stats page with overall and per-topic accuracy

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 24: Routing and final styling

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles/index.css`

**Interfaces:**
- Consumes: `Home` (Task 20), `TopicQuiz` (Task 21), `Exam` (Task 22), `Stats` (Task 23); `Routes`/`Route` from `react-router-dom`.
- Produces: the final routed `App` default export, replacing the Task 1 placeholder. `src/styles/index.css` fully replaces the Task 1 placeholder with real styling for every class name used by `Home`, `TopicQuiz`, `Exam`, `Stats`, `QuestionCard`, `TopicCard`.

- [ ] **Step 1: Replace `src/App.tsx`**

```tsx
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { TopicQuiz } from "./pages/TopicQuiz";
import { Exam } from "./pages/Exam";
import { Stats } from "./pages/Stats";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz/:topic" element={<TopicQuiz />} />
      <Route path="/exam" element={<Exam />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  );
}
```

- [ ] **Step 2: Replace `src/styles/index.css`**

```css
:root {
  color-scheme: light dark;
  --bg: #ffffff;
  --fg: #1a1a1a;
  --muted: #666666;
  --accent: #2f5fda;
  --accent-fg: #ffffff;
  --card-bg: #f5f6fa;
  --border: #d9dce3;
  --correct: #1f9254;
  --incorrect: #c0392b;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #14161c;
    --fg: #eceef2;
    --muted: #9aa0ac;
    --accent: #6f95ff;
    --accent-fg: #0c0d10;
    --card-bg: #1e2129;
    --border: #2c3038;
  }
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
}

.page {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 16px 64px;
}

.page__intro,
.page__summary,
.page__progress {
  color: var(--muted);
}

.topic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  margin: 24px 0;
}

.topic-card {
  display: block;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--card-bg);
  color: inherit;
  text-decoration: none;
}

.topic-card__title {
  font-weight: 600;
  margin-bottom: 6px;
}

.topic-card__stats {
  color: var(--muted);
  font-size: 0.9rem;
}

.exam-cta,
.exam-submit {
  display: inline-block;
  margin-top: 16px;
  padding: 12px 20px;
  background: var(--accent);
  color: var(--accent-fg);
  border: none;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
}

.question-card {
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
  margin: 16px 0;
  background: var(--card-bg);
}

.question-card__label {
  font-weight: 600;
  margin-bottom: 4px;
}

.question-card__options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}

.question-card__option {
  text-align: left;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  color: inherit;
  cursor: pointer;
}

.question-card__option--selected {
  border-color: var(--accent);
  outline: 2px solid var(--accent);
}

.question-card__input-row {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.question-card__input-row input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  color: inherit;
}

.question-card__feedback--correct {
  margin-top: 12px;
  color: var(--correct);
  font-weight: 600;
}

.question-card__feedback--incorrect {
  margin-top: 12px;
  color: var(--incorrect);
  font-weight: 600;
}

.question-card__explanation {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed var(--border);
  color: var(--muted);
}

.problem-block {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  margin: 20px 0;
}

.problem-block__statement {
  font-weight: 500;
  margin-bottom: 12px;
}

.stats-list {
  list-style: none;
  padding: 0;
}

.stats-list__item {
  display: grid;
  grid-template-columns: 180px 1fr 120px;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.stats-bar {
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.stats-bar__fill {
  height: 100%;
  background: var(--accent);
}

.exam-result {
  margin-top: 24px;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--card-bg);
}
```

- [ ] **Step 3: Verify it type-checks and builds**

Run: `npm run typecheck && npm run build`
Expected: both PASS with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/styles/index.css
git commit -m "$(cat <<'EOF'
Wire up routing and add full app styling

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 25: Final verification

**Files:** none (verification only).

**Interfaces:**
- Consumes: the entire app.
- Produces: nothing new — confirms the whole pipeline (types, tests, build) is green.

- [ ] **Step 1: Run the full test suite**

Run: `npm run test`
Expected: PASS — all tests from Tasks 3, 4, 5, 6, and 17 pass (18 tests total).

- [ ] **Step 2: Run the full type-check**

Run: `npm run typecheck`
Expected: PASS with no errors.

- [ ] **Step 3: Run the production build**

Run: `npm run build`
Expected: PASS, produces `dist/`.

- [ ] **Step 4: Manual smoke check (for the user, not automatable here)**

Run: `npm run dev`, open the printed local URL in a browser, and check:
- Home page lists all 8 topics and an "Examen simulat" link.
- Clicking a topic shows one question at a time with working MCQ/input answering, instant feedback, and explanations rendering LaTeX correctly (fractions, matrices, integrals).
- `/exam` shows all three subjects at once, lets you answer in any order, and "Predă lucrarea" reveals per-item grading, subtotals, and a final nota out of 10.
- `/stats` shows accuracy after answering a few questions, and resets to "Nu ai răspuns încă" in a fresh incognito window (confirms `localStorage` scoping).

- [ ] **Step 5: Commit (only if Step 4 uncovered fixes)**

If manual testing required code fixes, stage and commit them with a descriptive message following the same `Co-Authored-By` convention as other tasks in this plan. If no fixes were needed, skip this step — there is nothing to commit.
