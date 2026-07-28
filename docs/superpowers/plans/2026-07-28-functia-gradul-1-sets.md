# Funcția de gradul I practice sets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a full 10-set (100-exercise) practice bank for the `functia-gradul-1` topic, matching the established convention used by every other topic that has practice sets.

**Architecture:** Create `src/data/questions/functiaGradul1Sets.ts` exporting `functiaGradul1SetExercises: Exercise[]`, wired into `ALL_EXERCISES` in `src/data/index.ts` (Task 1 only). Tasks 2–10 append their set to the same file.

**Tech Stack:** Vite + React + TypeScript + Vitest, existing `Exercise` data shape.

## Global Constraints

- Every exercise is worth exactly 6 points.
- Ids: `g1-s1-1`..`g1-s10-10` (set number matches the id's `sN` segment and the `set:` field), verified unique against every existing id in the codebase.
- For every `mcq` exercise, `correctAnswer` must appear character-for-character in `options`, **and all options must be genuinely distinct values/statements** (not just distinct strings) — this exact bug class has recurred across every prior round of this project; check it explicitly for every mcq in every task.
- Inline `$...$` LaTeX only (never `$$...$$`), matching `functiaGradul1.ts`'s existing convention.
- No changes to `src/types.ts`, `TOPICS`, `TOPIC_LABELS`, `THEORY` registry, `src/data/theory/functiaGradul1.ts`, or the existing 7 base exercises in `src/data/questions/functiaGradul1.ts`.
- No `formulaSheet.ts` changes — practice sets don't add new formulas.
- **LaTeX escaping — a Critical bug class that has occurred twice in this exact project already**: every LaTeX command in a TS string literal needs a DOUBLE backslash (`\\cdot`, `\\dfrac`, `\\mathbb`, `\\infty`, `\\Rightarrow`, `\\neq`, etc.). A prior round had two implementer failures: one silently corrupted the WHOLE file's Romanian diacritics into mojibake while adding its own content (an encoding mismatch in its write path — e.g. "și" became "È™i"), the other got stuck mid-task and gave up, leaving a broken staged edit with single backslashes. Both were caught via `git diff --stat` showing unexpected deletions or wrong line counts, before any test run.
  - **Every task below MUST run these two checks before committing, and report their output:**
    1. `git diff --stat` — must show ONLY insertions (roughly 130–170 for a 10-exercise set), ZERO deletions. Any deletion means existing content was corrupted — STOP, do not commit, diagnose first.
    2. `node -e "const c=require('fs').readFileSync('src/data/questions/functiaGradul1Sets.ts','utf8'); console.log('Ä:',c.includes('Ä'),'È:',c.includes('È'),'Ã:',c.includes('Ã'))"` — all three must print `false`. Any `true` means mojibake corruption — STOP, do not commit.
  - Do NOT use any external script (Python, sed, etc.) to generate or write file content — edit directly with your file-editing tool, copying this plan's code verbatim.
  - After editing, verify the ACTUAL RUNTIME VALUE (not just source text) for at least 2-3 strings per task using an inline Node one-liner (not saved to a file).
- No stray UTF-8 BOM — verify with `head -c 20 <file> | xxd` after editing, confirm first bytes are NOT `ef bb bf`.

---

### Task 1: Create the file, wire into index.ts, add Set 1 (Calculul valorilor funcției)

**Files:**
- Create: `src/data/questions/functiaGradul1Sets.ts`
- Modify: `src/data/index.ts`

**Interfaces:**
- Consumes: existing `Exercise` shape from `src/types.ts`.
- Produces: `functiaGradul1SetExercises: Exercise[]`, imported and spread into `ALL_EXERCISES` by this task — all later tasks (2–10) append to this same array without touching `index.ts` again.

- [ ] **Step 1: Create the file with Set 1's 10 exercises**

Create `src/data/questions/functiaGradul1Sets.ts`:

```ts
import type { Exercise } from "../../types";

export const functiaGradul1SetExercises: Exercise[] = [
  // Set 1 — Calculul valorilor funcției
  {
    id: "g1-s1-1",
    topic: "functia-gradul-1",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=2x+3$. Calculați $f(5)$.",
    correctAnswer: "13",
    explanation: [
      "Înlocuim $x=5$ în expresia funcției: $f(5)=2\\cdot5+3$.",
      "Calculăm: $10+3=13$.",
    ],
  },
  {
    id: "g1-s1-2",
    topic: "functia-gradul-1",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=-3x+4$. Calculați $f(2)$.",
    correctAnswer: "-2",
    explanation: [
      "Înlocuim $x=2$: $f(2)=-3\\cdot2+4$.",
      "Calculăm: $-6+4=-2$.",
    ],
  },
  {
    id: "g1-s1-3",
    topic: "functia-gradul-1",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=5x-1$. Calculați $f(0)$.",
    correctAnswer: "-1",
    explanation: [
      "Înlocuim $x=0$: $f(0)=5\\cdot0-1$.",
      "Calculăm: $0-1=-1$.",
    ],
  },
  {
    id: "g1-s1-4",
    topic: "functia-gradul-1",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Fie $f(x)=4x-7$. Valoarea $f(3)$ este:",
    options: ["$5$", "$-5$", "$12$", "$19$"],
    correctAnswer: "$5$",
    explanation: [
      "Înlocuim $x=3$: $f(3)=4\\cdot3-7$.",
      "Calculăm: $12-7=5$.",
    ],
  },
  {
    id: "g1-s1-5",
    topic: "functia-gradul-1",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=-2x+6$. Calculați $f(-1)$.",
    correctAnswer: "8",
    explanation: [
      "Înlocuim $x=-1$: $f(-1)=-2\\cdot(-1)+6$.",
      "Calculăm: $2+6=8$.",
    ],
  },
  {
    id: "g1-s1-6",
    topic: "functia-gradul-1",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=7x-3$. Calculați $f(1)$.",
    correctAnswer: "4",
    explanation: [
      "Înlocuim $x=1$: $f(1)=7\\cdot1-3$.",
      "Calculăm: $7-3=4$.",
    ],
  },
  {
    id: "g1-s1-7",
    topic: "functia-gradul-1",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Fie $f(x)=\\dfrac{x}{2}+1$. Valoarea $f(4)$ este:",
    options: ["$3$", "$2$", "$4$", "$5$"],
    correctAnswer: "$3$",
    explanation: [
      "Înlocuim $x=4$: $f(4)=\\dfrac{4}{2}+1$.",
      "Calculăm: $2+1=3$.",
    ],
  },
  {
    id: "g1-s1-8",
    topic: "functia-gradul-1",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=-x+10$. Calculați $f(10)$.",
    correctAnswer: "0",
    explanation: [
      "Înlocuim $x=10$: $f(10)=-10+10$.",
      "Calculăm: $0$.",
    ],
  },
  {
    id: "g1-s1-9",
    topic: "functia-gradul-1",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Fie $f(x)=6x$. Valoarea $f(-2)$ este:",
    options: ["$-12$", "$12$", "$-4$", "$4$"],
    correctAnswer: "$-12$",
    explanation: [
      "Înlocuim $x=-2$: $f(-2)=6\\cdot(-2)$.",
      "Calculăm: $-12$.",
    ],
  },
  {
    id: "g1-s1-10",
    topic: "functia-gradul-1",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=2x-5$. Calculați $f(3)+f(0)$.",
    correctAnswer: "-4",
    explanation: [
      "Calculăm $f(3)=2\\cdot3-5=1$.",
      "Calculăm $f(0)=2\\cdot0-5=-5$.",
      "Suma este $1+(-5)=-4$.",
    ],
  },
];
```

- [ ] **Step 2: Wire the new file into `src/data/index.ts`**

Edit `src/data/index.ts`. Add this import immediately after the existing `import { functiaGradul1Exercises } from "./questions/functiaGradul1";` line:

```ts
import { functiaGradul1SetExercises } from "./questions/functiaGradul1Sets";
```

Add this spread entry immediately after the existing `...functiaGradul1Exercises,` line (in the `ALL_EXERCISES` array):

```ts
  ...functiaGradul1SetExercises,
```

- [ ] **Step 3: Run the two encoding-safety checks (see Global Constraints)**

Run `git diff --stat` — expect only insertions in `functiaGradul1Sets.ts` (new file, so it'll show as a large insertion-only addition) and a 2-line insertion in `index.ts`, zero deletions anywhere.
Run the mojibake-marker Node check — expect `Ä: false È: false Ã: false`.

- [ ] **Step 4: Run data integrity test to verify it passes**

Run: `npx vitest run src/data/index.test.ts`
Expected: PASS — all 10 new ids unique, 6 points each, every mcq's `correctAnswer` present in `options`.

- [ ] **Step 5: Verify LaTeX escaping at the runtime-string level**

For at least 3 of the 10 exercises above, verify the actual runtime string value using a Node one-liner that reads the file and evaluates the string literal, confirming a single backslash before each LaTeX command and no tab/newline control characters. Do not write this check to a file.

- [ ] **Step 6: Verify no stray BOM**

Run: `head -c 20 src/data/questions/functiaGradul1Sets.ts | xxd` — confirm the first bytes are NOT `ef bb bf`.

- [ ] **Step 7: Run the full test suite**

Run: `npm test`
Expected: all test files pass.

- [ ] **Step 8: Commit**

```bash
git add src/data/questions/functiaGradul1Sets.ts src/data/index.ts
git commit -m "Add practice Set 1 (Calculul valorilor funcției) for Funcția de gradul I"
```

---

### Task 2: Set 2 (Rezolvarea ecuațiilor de gradul I)

**Files:**
- Modify: `src/data/questions/functiaGradul1Sets.ts`

**Interfaces:**
- Consumes: the file and `ALL_EXERCISES` wiring created by Task 1 (must already exist — do not recreate).
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 2's 10 exercises**

Edit `src/data/questions/functiaGradul1Sets.ts`. Add a comment header and 10 new exercise objects to the end of the `functiaGradul1SetExercises` array (after `g1-s1-10`, before the closing `];`):

```ts
  // Set 2 — Rezolvarea ecuațiilor de gradul I
  {
    id: "g1-s2-1",
    topic: "functia-gradul-1",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Determinați soluția ecuației $5x-10=0$.",
    correctAnswer: "2",
    explanation: [
      "Rezolvăm ecuația: $5x=10$.",
      "Împărțim prin $5$: $x=2$.",
    ],
  },
  {
    id: "g1-s2-2",
    topic: "functia-gradul-1",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Determinați soluția ecuației $-3x+9=0$.",
    correctAnswer: "3",
    explanation: [
      "Rezolvăm ecuația: $-3x=-9$.",
      "Împărțim prin $-3$: $x=3$.",
    ],
  },
  {
    id: "g1-s2-3",
    topic: "functia-gradul-1",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Determinați soluția ecuației $2x+8=0$.",
    correctAnswer: "-4",
    explanation: [
      "Rezolvăm ecuația: $2x=-8$.",
      "Împărțim prin $2$: $x=-4$.",
    ],
  },
  {
    id: "g1-s2-4",
    topic: "functia-gradul-1",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Soluția ecuației $4x-12=0$ este:",
    options: ["$3$", "$-3$", "$4$", "$12$"],
    correctAnswer: "$3$",
    explanation: [
      "Rezolvăm ecuația: $4x=12$.",
      "Împărțim prin $4$: $x=3$.",
    ],
  },
  {
    id: "g1-s2-5",
    topic: "functia-gradul-1",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Determinați soluția ecuației $6x=18$.",
    correctAnswer: "3",
    explanation: [
      "Împărțim ambii membri prin $6$: $x=\\dfrac{18}{6}$.",
      "Calculăm: $x=3$.",
    ],
  },
  {
    id: "g1-s2-6",
    topic: "functia-gradul-1",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Determinați soluția ecuației $3x-2=13$.",
    correctAnswer: "5",
    explanation: [
      "Rezolvăm ecuația: $3x=15$.",
      "Împărțim prin $3$: $x=5$.",
    ],
  },
  {
    id: "g1-s2-7",
    topic: "functia-gradul-1",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Soluția ecuației $2x+5=1$ este:",
    options: ["$-2$", "$2$", "$-3$", "$3$"],
    correctAnswer: "$-2$",
    explanation: [
      "Rezolvăm ecuația: $2x=-4$.",
      "Împărțim prin $2$: $x=-2$.",
    ],
  },
  {
    id: "g1-s2-8",
    topic: "functia-gradul-1",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Determinați soluția ecuației $7x+14=0$.",
    correctAnswer: "-2",
    explanation: [
      "Rezolvăm ecuația: $7x=-14$.",
      "Împărțim prin $7$: $x=-2$.",
    ],
  },
  {
    id: "g1-s2-9",
    topic: "functia-gradul-1",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Soluția ecuației $5(x-1)=10$ este:",
    options: ["$3$", "$2$", "$1$", "$5$"],
    correctAnswer: "$3$",
    explanation: [
      "Desfacem paranteza: $5x-5=10$.",
      "Rezolvăm: $5x=15 \\Rightarrow x=3$.",
    ],
  },
  {
    id: "g1-s2-10",
    topic: "functia-gradul-1",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Determinați soluția ecuației $3x-9=0$, apoi calculați $2x$ (dublul soluției).",
    correctAnswer: "6",
    explanation: [
      "Rezolvăm ecuația: $3x=9 \\Rightarrow x=3$.",
      "Calculăm $2x=2\\cdot3=6$.",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks** — `git diff --stat` (only insertions, 0 deletions), mojibake-marker Node check (all `false`).
- [ ] **Step 3: Run data integrity test** — `npx vitest run src/data/index.test.ts`, expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises.
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Run the full test suite** — `npm test`.
- [ ] **Step 7: Commit**

```bash
git add src/data/questions/functiaGradul1Sets.ts
git commit -m "Add practice Set 2 (Rezolvarea ecuațiilor de gradul I)"
```

---

### Task 3: Set 3 (Rezolvarea inecuațiilor de gradul I)

**Files:**
- Modify: `src/data/questions/functiaGradul1Sets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–2.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 3's 10 exercises**

```ts
  // Set 3 — Rezolvarea inecuațiilor de gradul I
  {
    id: "g1-s3-1",
    topic: "functia-gradul-1",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Soluția inecuației $3x-6>0$ este:",
    options: ["$(2,+\\infty)$", "$(-\\infty,2)$", "$(-2,+\\infty)$", "$(-\\infty,-2)$"],
    correctAnswer: "$(2,+\\infty)$",
    explanation: [
      "Rezolvăm ecuația asociată: $3x-6=0 \\Rightarrow x=2$.",
      "Cum coeficientul lui $x$ este pozitiv, funcția este pozitivă pentru $x>2$.",
    ],
  },
  {
    id: "g1-s3-2",
    topic: "functia-gradul-1",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Soluția inecuației $-2x+4>0$ este:",
    options: ["$(-\\infty,2)$", "$(2,+\\infty)$", "$(-\\infty,-2)$", "$(-2,+\\infty)$"],
    correctAnswer: "$(-\\infty,2)$",
    explanation: [
      "Rezolvăm: $-2x>-4$.",
      "Împărțim prin $-2$ (schimbăm sensul inegalității): $x<2$.",
    ],
  },
  {
    id: "g1-s3-3",
    topic: "functia-gradul-1",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Soluția inecuației $5x-15\\geq0$ este:",
    options: ["$[3,+\\infty)$", "$(3,+\\infty)$", "$(-\\infty,3]$", "$(-\\infty,3)$"],
    correctAnswer: "$[3,+\\infty)$",
    explanation: [
      "Rezolvăm: $5x\\geq15 \\Rightarrow x\\geq3$.",
    ],
  },
  {
    id: "g1-s3-4",
    topic: "functia-gradul-1",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Soluția inecuației $4x-8<0$ se scrie sub forma $x<a$. Determinați valoarea lui $a$.",
    correctAnswer: "2",
    explanation: [
      "Rezolvăm: $4x<8 \\Rightarrow x<2$.",
      "Deci $a=2$.",
    ],
  },
  {
    id: "g1-s3-5",
    topic: "functia-gradul-1",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Soluția inecuației $-3x-9\\leq0$ este:",
    options: ["$[-3,+\\infty)$", "$(-\\infty,-3]$", "$[3,+\\infty)$", "$(-\\infty,3]$"],
    correctAnswer: "$[-3,+\\infty)$",
    explanation: [
      "Rezolvăm: $-3x\\leq9$.",
      "Împărțim prin $-3$ (schimbăm sensul): $x\\geq-3$.",
    ],
  },
  {
    id: "g1-s3-6",
    topic: "functia-gradul-1",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Soluția inecuației $2x+6>0$ se scrie sub forma $x>a$. Determinați valoarea lui $a$.",
    correctAnswer: "-3",
    explanation: [
      "Rezolvăm: $2x>-6 \\Rightarrow x>-3$.",
      "Deci $a=-3$.",
    ],
  },
  {
    id: "g1-s3-7",
    topic: "functia-gradul-1",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Soluția inecuației $6x-18>0$ este:",
    options: ["$(3,+\\infty)$", "$(-\\infty,3)$", "$(-3,+\\infty)$", "$(6,+\\infty)$"],
    correctAnswer: "$(3,+\\infty)$",
    explanation: [
      "Rezolvăm: $6x>18 \\Rightarrow x>3$.",
    ],
  },
  {
    id: "g1-s3-8",
    topic: "functia-gradul-1",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Soluția inecuației $-4x+8<0$ este:",
    options: ["$(2,+\\infty)$", "$(-\\infty,2)$", "$(-2,+\\infty)$", "$(-\\infty,-2)$"],
    correctAnswer: "$(2,+\\infty)$",
    explanation: [
      "Rezolvăm: $-4x<-8$.",
      "Împărțim prin $-4$ (schimbăm sensul): $x>2$.",
    ],
  },
  {
    id: "g1-s3-9",
    topic: "functia-gradul-1",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Soluția inecuației $3x-12\\geq0$ se scrie sub forma $x\\geq a$. Determinați valoarea lui $a$.",
    correctAnswer: "4",
    explanation: [
      "Rezolvăm: $3x\\geq12 \\Rightarrow x\\geq4$.",
      "Deci $a=4$.",
    ],
  },
  {
    id: "g1-s3-10",
    topic: "functia-gradul-1",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Soluția inecuației $5x+10<0$ este:",
    options: ["$(-\\infty,-2)$", "$(-2,+\\infty)$", "$(-\\infty,2)$", "$(2,+\\infty)$"],
    correctAnswer: "$(-\\infty,-2)$",
    explanation: [
      "Rezolvăm: $5x<-10 \\Rightarrow x<-2$.",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises (this set has dense `\infty`/`\geq`/`\leq`/`\Rightarrow` — verify carefully).
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Run the full test suite.**
- [ ] **Step 7: Commit**

```bash
git add src/data/questions/functiaGradul1Sets.ts
git commit -m "Add practice Set 3 (Rezolvarea inecuațiilor de gradul I)"
```

---

### Task 4: Set 4 (Monotonia funcției de gradul I)

**Files:**
- Modify: `src/data/questions/functiaGradul1Sets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–3.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 4's 10 exercises**

```ts
  // Set 4 — Monotonia funcției de gradul I
  {
    id: "g1-s4-1",
    topic: "functia-gradul-1",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Funcția $f(x)=3x-1$ este:",
    options: [
      "strict crescătoare pe $\\mathbb{R}$",
      "strict descrescătoare pe $\\mathbb{R}$",
      "constantă",
      "nedefinită pentru $x<0$",
    ],
    correctAnswer: "strict crescătoare pe $\\mathbb{R}$",
    explanation: [
      "Coeficientul lui $x$ este $a=3>0$.",
      "Cum $a>0$, funcția de gradul I este strict crescătoare pe $\\mathbb{R}$.",
    ],
  },
  {
    id: "g1-s4-2",
    topic: "functia-gradul-1",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Funcția $f(x)=-5x+2$ este:",
    options: [
      "strict descrescătoare pe $\\mathbb{R}$",
      "strict crescătoare pe $\\mathbb{R}$",
      "constantă",
      "nedefinită pentru $x<0$",
    ],
    correctAnswer: "strict descrescătoare pe $\\mathbb{R}$",
    explanation: [
      "Coeficientul lui $x$ este $a=-5<0$.",
      "Cum $a<0$, funcția de gradul I este strict descrescătoare pe $\\mathbb{R}$.",
    ],
  },
  {
    id: "g1-s4-3",
    topic: "functia-gradul-1",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Funcția $f(x)=x+7$ este:",
    options: [
      "strict crescătoare pe $\\mathbb{R}$",
      "strict descrescătoare pe $\\mathbb{R}$",
      "constantă",
      "nedefinită pentru $x<0$",
    ],
    correctAnswer: "strict crescătoare pe $\\mathbb{R}$",
    explanation: [
      "Coeficientul lui $x$ este $a=1>0$.",
      "Cum $a>0$, funcția este strict crescătoare pe $\\mathbb{R}$.",
    ],
  },
  {
    id: "g1-s4-4",
    topic: "functia-gradul-1",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Funcția $f(x)=-x-3$ este:",
    options: [
      "strict descrescătoare pe $\\mathbb{R}$",
      "strict crescătoare pe $\\mathbb{R}$",
      "constantă",
      "nedefinită pentru $x<0$",
    ],
    correctAnswer: "strict descrescătoare pe $\\mathbb{R}$",
    explanation: [
      "Coeficientul lui $x$ este $a=-1<0$.",
      "Cum $a<0$, funcția este strict descrescătoare pe $\\mathbb{R}$.",
    ],
  },
  {
    id: "g1-s4-5",
    topic: "functia-gradul-1",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Pentru ce valori ale lui $m$ funcția $f(x)=(m-2)x+3$ este strict crescătoare pe $\\mathbb{R}$?",
    options: ["$m>2$", "$m<2$", "$m=2$", "$m\\neq2$"],
    correctAnswer: "$m>2$",
    explanation: [
      "Funcția este strict crescătoare dacă și numai dacă coeficientul lui $x$ este pozitiv: $m-2>0$.",
      "Rezolvăm: $m>2$.",
    ],
  },
  {
    id: "g1-s4-6",
    topic: "functia-gradul-1",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Pentru ce valori ale lui $m$ funcția $f(x)=(3-m)x-1$ este strict descrescătoare pe $\\mathbb{R}$?",
    options: ["$m>3$", "$m<3$", "$m=3$", "$m\\neq3$"],
    correctAnswer: "$m>3$",
    explanation: [
      "Funcția este strict descrescătoare dacă și numai dacă coeficientul lui $x$ este negativ: $3-m<0$.",
      "Rezolvăm: $m>3$.",
    ],
  },
  {
    id: "g1-s4-7",
    topic: "functia-gradul-1",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=4x-9$. Calculați $f(2)-f(1)$.",
    correctAnswer: "4",
    explanation: [
      "Calculăm $f(2)=4\\cdot2-9=-1$.",
      "Calculăm $f(1)=4\\cdot1-9=-5$.",
      "Diferența este $-1-(-5)=4$ (egală cu panta $a=4$, confirmând că funcția este crescătoare).",
    ],
  },
  {
    id: "g1-s4-8",
    topic: "functia-gradul-1",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=-2x+5$. Calculați $f(3)-f(1)$.",
    correctAnswer: "-4",
    explanation: [
      "Calculăm $f(3)=-2\\cdot3+5=-1$.",
      "Calculăm $f(1)=-2\\cdot1+5=3$.",
      "Diferența este $-1-3=-4$ (negativă, confirmând că funcția este descrescătoare).",
    ],
  },
  {
    id: "g1-s4-9",
    topic: "functia-gradul-1",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Fie $f(x)=ax+b$ cu $a<0$. Care este monotonia funcției?",
    options: [
      "strict descrescătoare pe $\\mathbb{R}$",
      "strict crescătoare pe $\\mathbb{R}$",
      "constantă",
      "depinde de $b$",
    ],
    correctAnswer: "strict descrescătoare pe $\\mathbb{R}$",
    explanation: [
      "Monotonia funcției de gradul I depinde exclusiv de semnul lui $a$, nu de $b$.",
      "Dacă $a<0$, funcția este strict descrescătoare pe $\\mathbb{R}$.",
    ],
  },
  {
    id: "g1-s4-10",
    topic: "functia-gradul-1",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Care dintre funcțiile următoare este strict crescătoare pe $\\mathbb{R}$?",
    options: ["$f(x)=2x-3$", "$f(x)=-4x+1$", "$f(x)=-x$", "$f(x)=-7x+2$"],
    correctAnswer: "$f(x)=2x-3$",
    explanation: [
      "O funcție de gradul I este strict crescătoare dacă și numai dacă coeficientul lui $x$ este pozitiv.",
      "Dintre variante, doar $f(x)=2x-3$ are coeficientul lui $x$ pozitiv ($a=2$); celelalte au $a<0$.",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises.
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Run the full test suite.**
- [ ] **Step 7: Commit**

```bash
git add src/data/questions/functiaGradul1Sets.ts
git commit -m "Add practice Set 4 (Monotonia funcției de gradul I)"
```

---

### Task 5: Set 5 (Intersecția cu axele de coordonate)

**Files:**
- Modify: `src/data/questions/functiaGradul1Sets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–4.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 5's 10 exercises**

```ts
  // Set 5 — Intersecția cu axele de coordonate
  {
    id: "g1-s5-1",
    topic: "functia-gradul-1",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=3x-9$. Determinați abscisa punctului de intersecție a graficului cu axa $Ox$.",
    correctAnswer: "3",
    explanation: [
      "Punctul de intersecție cu axa $Ox$ satisface $f(x)=0$: $3x-9=0$.",
      "Rezolvăm: $x=3$.",
    ],
  },
  {
    id: "g1-s5-2",
    topic: "functia-gradul-1",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=2x+8$. Determinați ordonata punctului de intersecție a graficului cu axa $Oy$.",
    correctAnswer: "8",
    explanation: [
      "Punctul de intersecție cu axa $Oy$ are ordonata $f(0)$.",
      "Calculăm: $f(0)=2\\cdot0+8=8$.",
    ],
  },
  {
    id: "g1-s5-3",
    topic: "functia-gradul-1",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=-4x+12$. Determinați abscisa punctului de intersecție a graficului cu axa $Ox$.",
    correctAnswer: "3",
    explanation: [
      "Punem $f(x)=0$: $-4x+12=0$.",
      "Rezolvăm: $x=3$.",
    ],
  },
  {
    id: "g1-s5-4",
    topic: "functia-gradul-1",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=5x-20$. Determinați abscisa punctului de intersecție a graficului cu axa $Ox$.",
    correctAnswer: "4",
    explanation: [
      "Punem $f(x)=0$: $5x-20=0$.",
      "Rezolvăm: $x=4$.",
    ],
  },
  {
    id: "g1-s5-5",
    topic: "functia-gradul-1",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=-x+6$. Determinați ordonata punctului de intersecție a graficului cu axa $Oy$.",
    correctAnswer: "6",
    explanation: [
      "Ordonata la origine este $f(0)=-0+6=6$.",
    ],
  },
  {
    id: "g1-s5-6",
    topic: "functia-gradul-1",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Graficul funcției $f(x)=2x-4$ intersectează axa $Ox$ în punctul:",
    options: ["$(2,0)$", "$(0,2)$", "$(-2,0)$", "$(4,0)$"],
    correctAnswer: "$(2,0)$",
    explanation: [
      "Punem $f(x)=0$: $2x-4=0 \\Rightarrow x=2$.",
      "Punctul de intersecție cu $Ox$ este $(2,0)$.",
    ],
  },
  {
    id: "g1-s5-7",
    topic: "functia-gradul-1",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Graficul funcției $f(x)=-3x+9$ intersectează axa $Oy$ în punctul:",
    options: ["$(0,9)$", "$(9,0)$", "$(0,3)$", "$(3,0)$"],
    correctAnswer: "$(0,9)$",
    explanation: [
      "Ordonata la origine este $f(0)=9$.",
      "Punctul de intersecție cu $Oy$ este $(0,9)$.",
    ],
  },
  {
    id: "g1-s5-8",
    topic: "functia-gradul-1",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=6x-18$. Determinați abscisa punctului de intersecție a graficului cu axa $Ox$.",
    correctAnswer: "3",
    explanation: [
      "Punem $f(x)=0$: $6x-18=0$.",
      "Rezolvăm: $x=3$.",
    ],
  },
  {
    id: "g1-s5-9",
    topic: "functia-gradul-1",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Care este ordonata la origine a funcției $f(x)=7x-2$?",
    options: ["$-2$", "$7$", "$2$", "$-7$"],
    correctAnswer: "$-2$",
    explanation: [
      "Ordonata la origine este valoarea $f(0)=7\\cdot0-2=-2$.",
    ],
  },
  {
    id: "g1-s5-10",
    topic: "functia-gradul-1",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=4x-16$. Determinați suma dintre abscisa punctului de intersecție cu $Ox$ și ordonata punctului de intersecție cu $Oy$.",
    correctAnswer: "-12",
    explanation: [
      "Abscisa intersecției cu $Ox$: $4x-16=0 \\Rightarrow x=4$.",
      "Ordonata intersecției cu $Oy$: $f(0)=-16$.",
      "Suma este $4+(-16)=-12$.",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises.
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Run the full test suite.**
- [ ] **Step 7: Commit**

```bash
git add src/data/questions/functiaGradul1Sets.ts
git commit -m "Add practice Set 5 (Intersecția cu axele de coordonate)"
```

---

### Task 6: Set 6 (Semnul funcției de gradul I)

**Files:**
- Modify: `src/data/questions/functiaGradul1Sets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–5.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 6's 10 exercises**

```ts
  // Set 6 — Semnul funcției de gradul I
  {
    id: "g1-s6-1",
    topic: "functia-gradul-1",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Pentru ce valori ale lui $x$ este $f(x)=2x-6$ pozitivă?",
    options: ["$x>3$", "$x<3$", "$x>-3$", "$x<-3$"],
    correctAnswer: "$x>3$",
    explanation: [
      "Rădăcina funcției este $x=3$ (din $2x-6=0$).",
      "Cum $a=2>0$, funcția este pozitivă pentru $x>3$.",
    ],
  },
  {
    id: "g1-s6-2",
    topic: "functia-gradul-1",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Pentru ce valori ale lui $x$ este $f(x)=-3x+9$ pozitivă?",
    options: ["$x<3$", "$x>3$", "$x<-3$", "$x>-3$"],
    correctAnswer: "$x<3$",
    explanation: [
      "Rădăcina funcției este $x=3$ (din $-3x+9=0$).",
      "Cum $a=-3<0$, funcția este pozitivă pentru $x<3$.",
    ],
  },
  {
    id: "g1-s6-3",
    topic: "functia-gradul-1",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Pentru ce valori ale lui $x$ este $f(x)=4x-12$ negativă?",
    options: ["$x<3$", "$x>3$", "$x<-3$", "$x>-3$"],
    correctAnswer: "$x<3$",
    explanation: [
      "Rădăcina funcției este $x=3$ (din $4x-12=0$).",
      "Cum $a=4>0$, funcția este negativă pentru $x<3$.",
    ],
  },
  {
    id: "g1-s6-4",
    topic: "functia-gradul-1",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Pentru ce valori ale lui $x$ este $f(x)=-2x+8$ negativă?",
    options: ["$x>4$", "$x<4$", "$x>-4$", "$x<-4$"],
    correctAnswer: "$x>4$",
    explanation: [
      "Rădăcina funcției este $x=4$ (din $-2x+8=0$).",
      "Cum $a=-2<0$, funcția este negativă pentru $x>4$.",
    ],
  },
  {
    id: "g1-s6-5",
    topic: "functia-gradul-1",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=5x-25$. Determinați valoarea lui $x$ pentru care $f(x)=0$.",
    correctAnswer: "5",
    explanation: [
      "Rezolvăm ecuația: $5x-25=0 \\Rightarrow x=5$.",
    ],
  },
  {
    id: "g1-s6-6",
    topic: "functia-gradul-1",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Semnul funcției $f(x)=x-7$ pentru $x=10$ este:",
    options: ["pozitiv", "negativ", "zero", "nu se poate determina"],
    correctAnswer: "pozitiv",
    explanation: [
      "Calculăm $f(10)=10-7=3>0$.",
      "Funcția este pozitivă în acest punct.",
    ],
  },
  {
    id: "g1-s6-7",
    topic: "functia-gradul-1",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Semnul funcției $f(x)=-2x+4$ pentru $x=5$ este:",
    options: ["negativ", "pozitiv", "zero", "nu se poate determina"],
    correctAnswer: "negativ",
    explanation: [
      "Calculăm $f(5)=-2\\cdot5+4=-6<0$.",
      "Funcția este negativă în acest punct.",
    ],
  },
  {
    id: "g1-s6-8",
    topic: "functia-gradul-1",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=3x-9$. Pentru câte dintre valorile $x=1,2,3,4,5$ este $f(x)$ pozitiv?",
    correctAnswer: "2",
    explanation: [
      "Calculăm: $f(1)=-6$, $f(2)=-3$, $f(3)=0$, $f(4)=3$, $f(5)=6$.",
      "Valori pozitive sunt pentru $x=4$ și $x=5$, deci $2$ valori.",
    ],
  },
  {
    id: "g1-s6-9",
    topic: "functia-gradul-1",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Fie $f(x)=ax+b$ cu $a>0$ și rădăcina $x_0$. Funcția este negativă pentru:",
    options: ["$x<x_0$", "$x>x_0$", "toate valorile lui $x$", "nicio valoare a lui $x$"],
    correctAnswer: "$x<x_0$",
    explanation: [
      "Când $a>0$, funcția este negativă înainte de rădăcină (pentru $x<x_0$) și pozitivă după ($x>x_0$).",
    ],
  },
  {
    id: "g1-s6-10",
    topic: "functia-gradul-1",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Semnul funcției $f(x)=-5x+15$ pentru $x=1$ este:",
    options: ["pozitiv", "negativ", "zero", "nu se poate determina"],
    correctAnswer: "pozitiv",
    explanation: [
      "Calculăm $f(1)=-5\\cdot1+15=10>0$.",
      "Funcția este pozitivă în acest punct.",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises.
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Run the full test suite.**
- [ ] **Step 7: Commit**

```bash
git add src/data/questions/functiaGradul1Sets.ts
git commit -m "Add practice Set 6 (Semnul funcției de gradul I)"
```

---

### Task 7: Set 7 (Determinarea funcției din condiții date)

**Files:**
- Modify: `src/data/questions/functiaGradul1Sets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–6.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 7's 10 exercises**

```ts
  // Set 7 — Determinarea funcției din condiții date
  {
    id: "g1-s7-1",
    topic: "functia-gradul-1",
    set: 7,
    type: "input",
    points: 6,
    prompt: "O funcție de gradul I $f(x)=ax+b$ are $f(0)=5$ și $f(1)=8$. Determinați $a$.",
    correctAnswer: "3",
    explanation: [
      "Din $f(0)=b=5$ rezultă $b=5$.",
      "Din $f(1)=a+b=8$ rezultă $a=8-5=3$.",
    ],
  },
  {
    id: "g1-s7-2",
    topic: "functia-gradul-1",
    set: 7,
    type: "input",
    points: 6,
    prompt: "O funcție de gradul I $f(x)=ax+b$ are $f(0)=5$ și $f(1)=8$. Determinați $b$.",
    correctAnswer: "5",
    explanation: [
      "Din $f(0)=b$ rezultă direct $b=5$.",
    ],
  },
  {
    id: "g1-s7-3",
    topic: "functia-gradul-1",
    set: 7,
    type: "input",
    points: 6,
    prompt: "O funcție de gradul I are $f(1)=4$ și $f(2)=7$. Determinați panta $a$.",
    correctAnswer: "3",
    explanation: [
      "Panta este $a=\\dfrac{f(2)-f(1)}{2-1}=\\dfrac{7-4}{1}$.",
      "Calculăm: $a=3$.",
    ],
  },
  {
    id: "g1-s7-4",
    topic: "functia-gradul-1",
    set: 7,
    type: "input",
    points: 6,
    prompt: "O funcție de gradul I are $f(1)=4$, $f(2)=7$ și panta $a=3$. Determinați $b$.",
    correctAnswer: "1",
    explanation: [
      "Din $f(1)=a+b=4$ și $a=3$, rezultă $3+b=4$.",
      "Rezolvăm: $b=1$.",
    ],
  },
  {
    id: "g1-s7-5",
    topic: "functia-gradul-1",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "O funcție de gradul I trece prin punctele $(0,2)$ și $(1,5)$. Expresia funcției este:",
    options: ["$f(x)=3x+2$", "$f(x)=2x+3$", "$f(x)=5x+2$", "$f(x)=3x-2$"],
    correctAnswer: "$f(x)=3x+2$",
    explanation: [
      "Din $(0,2)$: $b=2$.",
      "Panta: $a=\\dfrac{5-2}{1-0}=3$.",
      "Rezultă $f(x)=3x+2$.",
    ],
  },
  {
    id: "g1-s7-6",
    topic: "functia-gradul-1",
    set: 7,
    type: "input",
    points: 6,
    prompt: "O funcție de gradul I are $f(2)=1$ și $f(4)=7$. Determinați panta $a$.",
    correctAnswer: "3",
    explanation: [
      "Panta este $a=\\dfrac{f(4)-f(2)}{4-2}=\\dfrac{7-1}{2}$.",
      "Calculăm: $a=3$.",
    ],
  },
  {
    id: "g1-s7-7",
    topic: "functia-gradul-1",
    set: 7,
    type: "input",
    points: 6,
    prompt: "O funcție de gradul I are $f(2)=1$, $f(4)=7$ și panta $a=3$. Determinați $b$.",
    correctAnswer: "-5",
    explanation: [
      "Din $f(2)=2a+b=1$ și $a=3$, rezultă $6+b=1$.",
      "Rezolvăm: $b=-5$.",
    ],
  },
  {
    id: "g1-s7-8",
    topic: "functia-gradul-1",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "O funcție de gradul I are $f(0)=-1$ și panta $a=4$. Expresia funcției este:",
    options: ["$f(x)=4x-1$", "$f(x)=-x+4$", "$f(x)=4x+1$", "$f(x)=-4x-1$"],
    correctAnswer: "$f(x)=4x-1$",
    explanation: [
      "Din $f(0)=b=-1$ rezultă $b=-1$.",
      "Cu panta $a=4$, rezultă $f(x)=4x-1$.",
    ],
  },
  {
    id: "g1-s7-9",
    topic: "functia-gradul-1",
    set: 7,
    type: "input",
    points: 6,
    prompt: "O funcție de gradul I trece prin punctele $(1,0)$ și $(0,-3)$. Determinați panta $a$.",
    correctAnswer: "3",
    explanation: [
      "Panta este $a=\\dfrac{0-(-3)}{1-0}$.",
      "Calculăm: $a=3$.",
    ],
  },
  {
    id: "g1-s7-10",
    topic: "functia-gradul-1",
    set: 7,
    type: "input",
    points: 6,
    prompt: "O funcție de gradul I are $f(-1)=2$ și $f(1)=8$. Determinați panta $a$.",
    correctAnswer: "3",
    explanation: [
      "Panta este $a=\\dfrac{f(1)-f(-1)}{1-(-1)}=\\dfrac{8-2}{2}$.",
      "Calculăm: $a=3$.",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises (check `\dfrac` carefully).
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Run the full test suite.**
- [ ] **Step 7: Commit**

```bash
git add src/data/questions/functiaGradul1Sets.ts
git commit -m "Add practice Set 7 (Determinarea funcției din condiții date)"
```

---

### Task 8: Set 8 (Poziția relativă a două drepte)

**Files:**
- Modify: `src/data/questions/functiaGradul1Sets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–7.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 8's 10 exercises**

```ts
  // Set 8 — Poziția relativă a două drepte
  {
    id: "g1-s8-1",
    topic: "functia-gradul-1",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Dreptele $y=2x+1$ și $y=2x-4$ sunt:",
    options: ["paralele", "confundate", "concurente", "perpendiculare"],
    correctAnswer: "paralele",
    explanation: [
      "Cele două drepte au aceeași pantă, $a_1=a_2=2$.",
      "Cum $b_1=1\\neq-4=b_2$, dreptele sunt paralele (nu confundate).",
    ],
  },
  {
    id: "g1-s8-2",
    topic: "functia-gradul-1",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Dreptele $y=3x+5$ și $y=3x+5$ sunt:",
    options: ["confundate", "paralele", "concurente", "perpendiculare"],
    correctAnswer: "confundate",
    explanation: [
      "Cele două drepte au aceeași pantă și aceeași ordonată la origine — sunt identice, deci confundate.",
    ],
  },
  {
    id: "g1-s8-3",
    topic: "functia-gradul-1",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Dreptele $y=2x+1$ și $y=-x+4$ sunt:",
    options: ["concurente", "paralele", "confundate", "perpendiculare"],
    correctAnswer: "concurente",
    explanation: [
      "Pantele sunt diferite ($2\\neq-1$), deci dreptele se intersectează într-un punct — sunt concurente.",
      "Produsul pantelor este $2\\cdot(-1)=-2\\neq-1$, deci nu sunt perpendiculare.",
    ],
  },
  {
    id: "g1-s8-4",
    topic: "functia-gradul-1",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Dreptele $y=x+2$ și $y=-x+6$ sunt:",
    options: ["perpendiculare", "paralele", "confundate", "nu se intersectează"],
    correctAnswer: "perpendiculare",
    explanation: [
      "Produsul pantelor este $1\\cdot(-1)=-1$.",
      "Cum produsul pantelor este $-1$, dreptele sunt perpendiculare.",
    ],
  },
  {
    id: "g1-s8-5",
    topic: "functia-gradul-1",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Determinați panta unei drepte paralelă cu $y=5x-3$.",
    correctAnswer: "5",
    explanation: [
      "Două drepte paralele au aceeași pantă.",
      "Panta căutată este $5$.",
    ],
  },
  {
    id: "g1-s8-6",
    topic: "functia-gradul-1",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Determinați panta unei drepte perpendiculare pe $y=x+5$.",
    correctAnswer: "-1",
    explanation: [
      "Pentru drepte perpendiculare, produsul pantelor este $-1$.",
      "Panta căutată este $-\\dfrac{1}{1}=-1$.",
    ],
  },
  {
    id: "g1-s8-7",
    topic: "functia-gradul-1",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Pentru ce valoare a lui $m$ sunt dreptele $y=mx+1$ și $y=3x-2$ paralele?",
    options: ["$3$", "$-3$", "$\\dfrac{1}{3}$", "$-\\dfrac{1}{3}$"],
    correctAnswer: "$3$",
    explanation: [
      "Pentru ca dreptele să fie paralele, pantele trebuie să fie egale: $m=3$.",
    ],
  },
  {
    id: "g1-s8-8",
    topic: "functia-gradul-1",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Pentru ce valoare a lui $m$ sunt dreptele $y=mx+2$ și $y=2x-1$ perpendiculare?",
    options: ["$-\\dfrac{1}{2}$", "$\\dfrac{1}{2}$", "$-2$", "$2$"],
    correctAnswer: "$-\\dfrac{1}{2}$",
    explanation: [
      "Pentru drepte perpendiculare, produsul pantelor este $-1$: $m\\cdot2=-1$.",
      "Rezolvăm: $m=-\\dfrac{1}{2}$.",
    ],
  },
  {
    id: "g1-s8-9",
    topic: "functia-gradul-1",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Dreptele $y=-2x+3$ și $y=-2x+3$ sunt:",
    options: ["confundate", "paralele", "concurente", "perpendiculare"],
    correctAnswer: "confundate",
    explanation: [
      "Cele două drepte au aceeași expresie — sunt identice, deci confundate.",
    ],
  },
  {
    id: "g1-s8-10",
    topic: "functia-gradul-1",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Dreptele $y=4x-1$ și $y=4x+7$ sunt:",
    options: ["paralele", "confundate", "concurente", "perpendiculare"],
    correctAnswer: "paralele",
    explanation: [
      "Cele două drepte au aceeași pantă, $a_1=a_2=4$, dar ordonate la origine diferite.",
      "Sunt paralele (nu confundate).",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises.
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Run the full test suite.**
- [ ] **Step 7: Commit**

```bash
git add src/data/questions/functiaGradul1Sets.ts
git commit -m "Add practice Set 8 (Poziția relativă a două drepte)"
```

---

### Task 9: Set 9 (Puncte de intersecție a două drepte)

**Files:**
- Modify: `src/data/questions/functiaGradul1Sets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–8.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 9's 10 exercises**

```ts
  // Set 9 — Puncte de intersecție a două drepte
  {
    id: "g1-s9-1",
    topic: "functia-gradul-1",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Determinați abscisa punctului de intersecție al dreptelor $y=x+1$ și $y=3x-5$.",
    correctAnswer: "3",
    explanation: [
      "Punem condiția $x+1=3x-5$.",
      "Rezolvăm: $6=2x \\Rightarrow x=3$.",
    ],
  },
  {
    id: "g1-s9-2",
    topic: "functia-gradul-1",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Pentru dreptele $y=x+1$ și $y=3x-5$ (care se intersectează la $x=3$), determinați ordonata punctului de intersecție.",
    correctAnswer: "4",
    explanation: [
      "Înlocuim $x=3$ în $y=x+1$: $y=3+1=4$.",
    ],
  },
  {
    id: "g1-s9-3",
    topic: "functia-gradul-1",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Determinați abscisa punctului de intersecție al dreptelor $y=2x-3$ și $y=-x+9$.",
    correctAnswer: "4",
    explanation: [
      "Punem condiția $2x-3=-x+9$.",
      "Rezolvăm: $3x=12 \\Rightarrow x=4$.",
    ],
  },
  {
    id: "g1-s9-4",
    topic: "functia-gradul-1",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Pentru dreptele $y=2x-3$ și $y=-x+9$ (care se intersectează la $x=4$), determinați ordonata punctului de intersecție.",
    correctAnswer: "5",
    explanation: [
      "Înlocuim $x=4$ în $y=2x-3$: $y=2\\cdot4-3=5$.",
    ],
  },
  {
    id: "g1-s9-5",
    topic: "functia-gradul-1",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Determinați abscisa punctului de intersecție al dreptelor $y=5x+1$ și $y=2x+10$.",
    correctAnswer: "3",
    explanation: [
      "Punem condiția $5x+1=2x+10$.",
      "Rezolvăm: $3x=9 \\Rightarrow x=3$.",
    ],
  },
  {
    id: "g1-s9-6",
    topic: "functia-gradul-1",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Punctul de intersecție al dreptelor $y=x-2$ și $y=-2x+7$ este:",
    options: ["$(3,1)$", "$(1,3)$", "$(3,-1)$", "$(-3,1)$"],
    correctAnswer: "$(3,1)$",
    explanation: [
      "Punem condiția $x-2=-2x+7 \\Rightarrow 3x=9 \\Rightarrow x=3$.",
      "Calculăm $y=3-2=1$. Punctul este $(3,1)$.",
    ],
  },
  {
    id: "g1-s9-7",
    topic: "functia-gradul-1",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Punctul de intersecție al dreptelor $y=4x-3$ și $y=x+6$ este:",
    options: ["$(3,9)$", "$(9,3)$", "$(3,-9)$", "$(-3,9)$"],
    correctAnswer: "$(3,9)$",
    explanation: [
      "Punem condiția $4x-3=x+6 \\Rightarrow 3x=9 \\Rightarrow x=3$.",
      "Calculăm $y=3+6=9$. Punctul este $(3,9)$.",
    ],
  },
  {
    id: "g1-s9-8",
    topic: "functia-gradul-1",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Determinați abscisa punctului de intersecție al dreptelor $y=6x-4$ și $y=2x+8$.",
    correctAnswer: "3",
    explanation: [
      "Punem condiția $6x-4=2x+8$.",
      "Rezolvăm: $4x=12 \\Rightarrow x=3$.",
    ],
  },
  {
    id: "g1-s9-9",
    topic: "functia-gradul-1",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Câte puncte de intersecție au dreptele $y=3x+2$ și $y=3x-1$?",
    correctAnswer: "0",
    explanation: [
      "Dreptele au aceeași pantă ($a=3$) dar ordonate la origine diferite ($2\\neq-1$), deci sunt paralele.",
      "Drepte paralele distincte nu au niciun punct de intersecție.",
    ],
  },
  {
    id: "g1-s9-10",
    topic: "functia-gradul-1",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Determinați abscisa punctului de intersecție al dreptelor $y=x+4$ și $y=-3x+12$.",
    correctAnswer: "2",
    explanation: [
      "Punem condiția $x+4=-3x+12$.",
      "Rezolvăm: $4x=8 \\Rightarrow x=2$.",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises.
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Run the full test suite.**
- [ ] **Step 7: Commit**

```bash
git add src/data/questions/functiaGradul1Sets.ts
git commit -m "Add practice Set 9 (Puncte de intersecție a două drepte)"
```

---

### Task 10: Set 10 (Recapitulare / aplicații mixte) + final verification

**Files:**
- Modify: `src/data/questions/functiaGradul1Sets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–9 (must have exactly 90 exercises, Sets 1–9, before this task starts).
- Produces: the completed 100-exercise file — no further tasks depend on this one.

- [ ] **Step 1: Append Set 10's 10 exercises**

```ts
  // Set 10 — Recapitulare / aplicații mixte
  {
    id: "g1-s10-1",
    topic: "functia-gradul-1",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=3x-9$. Calculați $f(5)$.",
    correctAnswer: "6",
    explanation: [
      "Înlocuim $x=5$: $f(5)=3\\cdot5-9=15-9=6$.",
    ],
  },
  {
    id: "g1-s10-2",
    topic: "functia-gradul-1",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $7x-21=0$.",
    correctAnswer: "3",
    explanation: [
      "Rezolvăm: $7x=21 \\Rightarrow x=3$.",
    ],
  },
  {
    id: "g1-s10-3",
    topic: "functia-gradul-1",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Soluția inecuației $2x-10>0$ este:",
    options: ["$(5,+\\infty)$", "$(-\\infty,5)$", "$(-5,+\\infty)$", "$(-\\infty,-5)$"],
    correctAnswer: "$(5,+\\infty)$",
    explanation: [
      "Rezolvăm: $2x>10 \\Rightarrow x>5$.",
    ],
  },
  {
    id: "g1-s10-4",
    topic: "functia-gradul-1",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Funcția $f(x)=-3x+1$ este:",
    options: [
      "strict descrescătoare pe $\\mathbb{R}$",
      "strict crescătoare pe $\\mathbb{R}$",
      "constantă",
      "nedefinită",
    ],
    correctAnswer: "strict descrescătoare pe $\\mathbb{R}$",
    explanation: [
      "Coeficientul lui $x$ este $a=-3<0$, deci funcția este strict descrescătoare pe $\\mathbb{R}$.",
    ],
  },
  {
    id: "g1-s10-5",
    topic: "functia-gradul-1",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=4x-8$. Determinați abscisa punctului de intersecție a graficului cu axa $Ox$.",
    correctAnswer: "2",
    explanation: [
      "Punem $f(x)=0$: $4x-8=0 \\Rightarrow x=2$.",
    ],
  },
  {
    id: "g1-s10-6",
    topic: "functia-gradul-1",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Semnul funcției $f(x)=2x-6$ pentru $x=1$ este:",
    options: ["negativ", "pozitiv", "zero", "nu se poate determina"],
    correctAnswer: "negativ",
    explanation: [
      "Calculăm $f(1)=2\\cdot1-6=-4<0$.",
    ],
  },
  {
    id: "g1-s10-7",
    topic: "functia-gradul-1",
    set: 10,
    type: "input",
    points: 6,
    prompt: "O funcție de gradul I are $f(0)=3$ și $f(1)=7$. Determinați panta $a$.",
    correctAnswer: "4",
    explanation: [
      "Din $f(0)=b=3$ și $f(1)=a+b=7$, rezultă $a=7-3=4$.",
    ],
  },
  {
    id: "g1-s10-8",
    topic: "functia-gradul-1",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Dreptele $y=5x-2$ și $y=5x+3$ sunt:",
    options: ["paralele", "confundate", "concurente", "perpendiculare"],
    correctAnswer: "paralele",
    explanation: [
      "Cele două drepte au aceeași pantă ($a=5$), dar ordonate la origine diferite — sunt paralele.",
    ],
  },
  {
    id: "g1-s10-9",
    topic: "functia-gradul-1",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Determinați abscisa punctului de intersecție al dreptelor $y=2x+1$ și $y=x+4$.",
    correctAnswer: "3",
    explanation: [
      "Punem condiția $2x+1=x+4$.",
      "Rezolvăm: $x=3$.",
    ],
  },
  {
    id: "g1-s10-10",
    topic: "functia-gradul-1",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele afirmații despre funcția de gradul I $f(x)=ax+b$ (cu $a\\neq0$) este adevărată?",
    options: [
      "Dacă $a>0$, funcția este strict crescătoare pe $\\mathbb{R}$",
      "Dacă $a>0$, funcția este strict descrescătoare pe $\\mathbb{R}$",
      "Graficul funcției este întotdeauna o parabolă",
      "Funcția nu are rădăcini dacă $a\\neq0$",
    ],
    correctAnswer: "Dacă $a>0$, funcția este strict crescătoare pe $\\mathbb{R}$",
    explanation: [
      "Aceasta este proprietatea fundamentală de monotonie a funcției de gradul I.",
      "Celelalte afirmații sunt false: graficul este o dreaptă (nu o parabolă), iar funcția are întotdeauna exact o rădăcină când $a\\neq0$.",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises.
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Verify the file has exactly 100 exercises across 10 sets**

Run: `grep -c '"functia-gradul-1"' src/data/questions/functiaGradul1Sets.ts` — expected output: `100`. Also run `grep -c 'set: N,$'` (for each N=1..10, adjusting the pattern) to confirm each of the 10 sets has exactly 10 exercises.

- [ ] **Step 7: Run typecheck and build**

Run: `npm run typecheck` — expect exit 0.
Run: `npm run build` — expect exit 0.

- [ ] **Step 8: Run the full test suite**

Run: `npm test` — expect all test files pass.

- [ ] **Step 9: Commit**

```bash
git add src/data/questions/functiaGradul1Sets.ts
git commit -m "Add practice Set 10 (Recapitulare) — completes Funcția de gradul I practice bank"
```
