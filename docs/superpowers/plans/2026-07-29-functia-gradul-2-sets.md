# Funcția de gradul al II-lea practice sets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a full 10-set (100-exercise) practice bank for the `functia-gradul-2` topic, matching the established convention used by every other topic that has practice sets.

**Architecture:** Create `src/data/questions/functiaGradul2Sets.ts` exporting `functiaGradul2SetExercises: Exercise[]`, wired into `ALL_EXERCISES` in `src/data/index.ts` (Task 1 only). Tasks 2–10 append their set to the same file.

**Tech Stack:** Vite + React + TypeScript + Vitest, existing `Exercise` data shape.

## Global Constraints

- Every exercise is worth exactly 6 points.
- Ids: `g2-s1-1`..`g2-s10-10` (set number matches the id's `sN` segment and the `set:` field), verified unique against every existing id in the codebase.
- For every `mcq` exercise, `correctAnswer` must appear character-for-character in `options`, **and all options must be genuinely distinct values/statements** (not just distinct strings) — this exact bug class has recurred across every prior round of this project; check it explicitly for every mcq in every task.
- **Answer-variety discipline**: within each set of 10, all `input`-type numeric answers must be distinct from each other (this content has already been designed with this property — verify it's preserved when transcribing). This is a Minor-severity concern flagged in a prior round's final review (`functia-gradul-1-sets`), where several exercises in the same set shared the same numeric answer.
- Inline `$...$` LaTeX only (never `$$...$$`), matching `functiaGradul2.ts`'s existing convention.
- No changes to `src/types.ts`, `TOPICS`, `TOPIC_LABELS`, `THEORY` registry, `src/data/theory/functiaGradul2.ts`, or the existing 7 base exercises in `src/data/questions/functiaGradul2.ts`.
- No `formulaSheet.ts` changes — practice sets don't add new formulas.
- **LaTeX escaping — a Critical bug class that occurred twice in an earlier round of this exact project (`multimi-logica-sets`)**: every LaTeX command in a TS string literal needs a DOUBLE backslash (`\\cdot`, `\\dfrac`, `\\Delta`, `\\infty`, `\\emptyset`, `\\mathbb`, `\\leq`, `\\geq`, `\\neq`, etc.). Zero such failures occurred in the immediately following round (`functia-gradul-1-sets`) once every dispatch baked in explicit encoding-safety checks from the start — continue that practice here.
  - **Every task below MUST run these two checks before committing, and report their output:**
    1. `git diff --stat` — must show ONLY insertions (roughly 130–180 for a 10-exercise set), ZERO deletions. Any deletion means existing content was corrupted — STOP, do not commit, diagnose first.
    2. `node -e "const c=require('fs').readFileSync('src/data/questions/functiaGradul2Sets.ts','utf8'); console.log('Ä:',c.includes('Ä'),'È:',c.includes('È'),'Ã:',c.includes('Ã'))"` — all three must print `false`. Any `true` means mojibake corruption — STOP, do not commit.
  - Do NOT use any external script (Python, sed, etc.) to generate or write file content — edit directly with your file-editing tool, copying this plan's code verbatim.
  - After editing, verify the ACTUAL RUNTIME VALUE (not just source text) for at least 2-3 strings per task using an inline Node one-liner (not saved to a file).
- No stray UTF-8 BOM — verify with `head -c 20 <file> | xxd` after editing, confirm first bytes are NOT `ef bb bf`.

---

### Task 1: Create the file, wire into index.ts, add Set 1 (Calculul valorilor funcției)

**Files:**
- Create: `src/data/questions/functiaGradul2Sets.ts`
- Modify: `src/data/index.ts`

**Interfaces:**
- Consumes: existing `Exercise` shape from `src/types.ts`.
- Produces: `functiaGradul2SetExercises: Exercise[]`, imported and spread into `ALL_EXERCISES` by this task — all later tasks (2–10) append to this same array without touching `index.ts` again.

- [ ] **Step 1: Create the file with Set 1's 10 exercises**

Create `src/data/questions/functiaGradul2Sets.ts`:

```ts
import type { Exercise } from "../../types";

export const functiaGradul2SetExercises: Exercise[] = [
  // Set 1 — Calculul valorilor funcției
  {
    id: "g2-s1-1",
    topic: "functia-gradul-2",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=x^2-5x+6$. Calculați $f(4)$.",
    correctAnswer: "2",
    explanation: [
      "Înlocuim $x=4$: $f(4)=4^2-5\\cdot4+6$.",
      "Calculăm: $16-20+6=2$.",
    ],
  },
  {
    id: "g2-s1-2",
    topic: "functia-gradul-2",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=2x^2-3x+1$. Calculați $f(2)$.",
    correctAnswer: "3",
    explanation: [
      "Înlocuim $x=2$: $f(2)=2\\cdot2^2-3\\cdot2+1$.",
      "Calculăm: $8-6+1=3$.",
    ],
  },
  {
    id: "g2-s1-3",
    topic: "functia-gradul-2",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=x^2-2x-3$. Calculați $f(0)$.",
    correctAnswer: "-3",
    explanation: [
      "Înlocuim $x=0$: $f(0)=0^2-2\\cdot0-3$.",
      "Calculăm: $-3$.",
    ],
  },
  {
    id: "g2-s1-4",
    topic: "functia-gradul-2",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Fie $f(x)=x^2+2x-8$. Valoarea $f(2)$ este:",
    options: ["$0$", "$4$", "$-4$", "$8$"],
    correctAnswer: "$0$",
    explanation: [
      "Înlocuim $x=2$: $f(2)=2^2+2\\cdot2-8$.",
      "Calculăm: $4+4-8=0$.",
    ],
  },
  {
    id: "g2-s1-5",
    topic: "functia-gradul-2",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=-2x^2+5x-1$. Calculați $f(3)$.",
    correctAnswer: "-4",
    explanation: [
      "Înlocuim $x=3$: $f(3)=-2\\cdot3^2+5\\cdot3-1$.",
      "Calculăm: $-18+15-1=-4$.",
    ],
  },
  {
    id: "g2-s1-6",
    topic: "functia-gradul-2",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=x^2-x-6$. Calculați $f(0)$.",
    correctAnswer: "-6",
    explanation: [
      "Înlocuim $x=0$: $f(0)=0^2-0-6$.",
      "Calculăm: $-6$.",
    ],
  },
  {
    id: "g2-s1-7",
    topic: "functia-gradul-2",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Fie $f(x)=4x^2-4x+1$. Valoarea $f(1)$ este:",
    options: ["$1$", "$4$", "$-1$", "$9$"],
    correctAnswer: "$1$",
    explanation: [
      "Înlocuim $x=1$: $f(1)=4\\cdot1^2-4\\cdot1+1$.",
      "Calculăm: $4-4+1=1$.",
    ],
  },
  {
    id: "g2-s1-8",
    topic: "functia-gradul-2",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=-x^2+3x+4$. Calculați $f(2)$.",
    correctAnswer: "6",
    explanation: [
      "Înlocuim $x=2$: $f(2)=-2^2+3\\cdot2+4$.",
      "Calculăm: $-4+6+4=6$.",
    ],
  },
  {
    id: "g2-s1-9",
    topic: "functia-gradul-2",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Fie $f(x)=2x^2-7x+3$. Valoarea $f(-1)$ este:",
    options: ["$12$", "$-12$", "$2$", "$-2$"],
    correctAnswer: "$12$",
    explanation: [
      "Înlocuim $x=-1$: $f(-1)=2\\cdot(-1)^2-7\\cdot(-1)+3$.",
      "Calculăm: $2+7+3=12$.",
    ],
  },
  {
    id: "g2-s1-10",
    topic: "functia-gradul-2",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=x^2-4x+4$. Calculați $f(0)+f(4)$.",
    correctAnswer: "8",
    explanation: [
      "Calculăm $f(0)=0^2-4\\cdot0+4=4$.",
      "Calculăm $f(4)=4^2-4\\cdot4+4=4$.",
      "Suma este $4+4=8$.",
    ],
  },
];
```

- [ ] **Step 2: Wire the new file into `src/data/index.ts`**

Edit `src/data/index.ts`. Add this import immediately after the existing `import { functiaGradul2Exercises } from "./questions/functiaGradul2";` line:

```ts
import { functiaGradul2SetExercises } from "./questions/functiaGradul2Sets";
```

Add this spread entry immediately after the existing `...functiaGradul2Exercises,` line (in the `ALL_EXERCISES` array):

```ts
  ...functiaGradul2SetExercises,
```

- [ ] **Step 3: Run the two encoding-safety checks (see Global Constraints)**

Run `git diff --stat` — expect only insertions in `functiaGradul2Sets.ts` (new file) and a 2-line insertion in `index.ts`, zero deletions anywhere.
Run the mojibake-marker Node check — expect `Ä: false È: false Ã: false`.

- [ ] **Step 4: Run data integrity test to verify it passes**

Run: `npx vitest run src/data/index.test.ts`
Expected: PASS — all 10 new ids unique, 6 points each, every mcq's `correctAnswer` present in `options`.

- [ ] **Step 5: Verify LaTeX escaping at the runtime-string level**

For at least 3 of the 10 exercises above, verify the actual runtime string value using a Node one-liner that reads the file and evaluates the string literal, confirming a single backslash before each LaTeX command and no tab/newline control characters. Do not write this check to a file.

- [ ] **Step 6: Verify no stray BOM**

Run: `head -c 20 src/data/questions/functiaGradul2Sets.ts | xxd` — confirm the first bytes are NOT `ef bb bf`.

- [ ] **Step 7: Run the full test suite**

Run: `npm test`
Expected: all test files pass.

- [ ] **Step 8: Commit**

```bash
git add src/data/questions/functiaGradul2Sets.ts src/data/index.ts
git commit -m "Add practice Set 1 (Calculul valorilor funcției) for Funcția de gradul al II-lea"
```

---

### Task 2: Set 2 (Discriminantul și numărul de soluții)

**Files:**
- Modify: `src/data/questions/functiaGradul2Sets.ts`

**Interfaces:**
- Consumes: the file and `ALL_EXERCISES` wiring created by Task 1 (must already exist — do not recreate).
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 2's 10 exercises**

Edit `src/data/questions/functiaGradul2Sets.ts`. Add a comment header and 10 new exercise objects to the end of the `functiaGradul2SetExercises` array (after `g2-s1-10`, before the closing `];`):

```ts
  // Set 2 — Discriminantul și numărul de soluții
  {
    id: "g2-s2-1",
    topic: "functia-gradul-2",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Determinați discriminantul $\\Delta$ al ecuației $x^2-6x+8=0$.",
    correctAnswer: "4",
    explanation: [
      "Calculăm $\\Delta=b^2-4ac=(-6)^2-4\\cdot1\\cdot8$.",
      "Rezultă $\\Delta=36-32=4$.",
    ],
  },
  {
    id: "g2-s2-2",
    topic: "functia-gradul-2",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Determinați discriminantul $\\Delta$ al ecuației $x^2+2x+5=0$.",
    correctAnswer: "-16",
    explanation: [
      "Calculăm $\\Delta=2^2-4\\cdot1\\cdot5$.",
      "Rezultă $\\Delta=4-20=-16$.",
    ],
  },
  {
    id: "g2-s2-3",
    topic: "functia-gradul-2",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Determinați discriminantul $\\Delta$ al ecuației $2x^2-4x+2=0$.",
    correctAnswer: "0",
    explanation: [
      "Calculăm $\\Delta=(-4)^2-4\\cdot2\\cdot2$.",
      "Rezultă $\\Delta=16-16=0$.",
    ],
  },
  {
    id: "g2-s2-4",
    topic: "functia-gradul-2",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Ecuația $x^2-5x+6=0$ are:",
    options: [
      "două soluții reale distincte",
      "o soluție reală dublă",
      "nicio soluție reală",
      "patru soluții reale",
    ],
    correctAnswer: "două soluții reale distincte",
    explanation: [
      "Calculăm $\\Delta=(-5)^2-4\\cdot1\\cdot6=25-24=1$.",
      "Cum $\\Delta>0$, ecuația are două soluții reale distincte.",
    ],
  },
  {
    id: "g2-s2-5",
    topic: "functia-gradul-2",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Determinați discriminantul $\\Delta$ al ecuației $3x^2+x+2=0$.",
    correctAnswer: "-23",
    explanation: [
      "Calculăm $\\Delta=1^2-4\\cdot3\\cdot2$.",
      "Rezultă $\\Delta=1-24=-23$.",
    ],
  },
  {
    id: "g2-s2-6",
    topic: "functia-gradul-2",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Câte soluții reale (distincte) are ecuația $x^2-8x+16=0$?",
    correctAnswer: "1",
    explanation: [
      "Calculăm $\\Delta=(-8)^2-4\\cdot1\\cdot16=64-64=0$.",
      "Cum $\\Delta=0$, ecuația are o singură soluție reală (dublă).",
    ],
  },
  {
    id: "g2-s2-7",
    topic: "functia-gradul-2",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Ecuația $x^2+x+3=0$ are:",
    options: [
      "nicio soluție reală",
      "o soluție reală dublă",
      "două soluții reale distincte",
      "patru soluții reale",
    ],
    correctAnswer: "nicio soluție reală",
    explanation: [
      "Calculăm $\\Delta=1^2-4\\cdot1\\cdot3=1-12=-11$.",
      "Cum $\\Delta<0$, ecuația nu are soluții reale.",
    ],
  },
  {
    id: "g2-s2-8",
    topic: "functia-gradul-2",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Determinați discriminantul $\\Delta$ al ecuației $5x^2-2x-3=0$.",
    correctAnswer: "64",
    explanation: [
      "Calculăm $\\Delta=(-2)^2-4\\cdot5\\cdot(-3)$.",
      "Rezultă $\\Delta=4+60=64$.",
    ],
  },
  {
    id: "g2-s2-9",
    topic: "functia-gradul-2",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Ecuația $x^2-4x+4=0$ are:",
    options: [
      "o soluție reală dublă",
      "două soluții reale distincte",
      "nicio soluție reală",
      "trei soluții reale",
    ],
    correctAnswer: "o soluție reală dublă",
    explanation: [
      "Calculăm $\\Delta=(-4)^2-4\\cdot1\\cdot4=16-16=0$.",
      "Cum $\\Delta=0$, ecuația are o soluție reală dublă.",
    ],
  },
  {
    id: "g2-s2-10",
    topic: "functia-gradul-2",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Pentru ecuația $2x^2-4x+m=0$, determinați valoarea lui $m$ pentru care $\\Delta=0$.",
    correctAnswer: "2",
    explanation: [
      "Calculăm $\\Delta=(-4)^2-4\\cdot2\\cdot m=16-8m$.",
      "Punem condiția $16-8m=0 \\Rightarrow m=2$.",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — `npx vitest run src/data/index.test.ts`, expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises (check `\Delta`).
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Run the full test suite.**
- [ ] **Step 7: Commit**

```bash
git add src/data/questions/functiaGradul2Sets.ts
git commit -m "Add practice Set 2 (Discriminantul și numărul de soluții)"
```

---

### Task 3: Set 3 (Rezolvarea ecuației de gradul al II-lea)

**Files:**
- Modify: `src/data/questions/functiaGradul2Sets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–2.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 3's 10 exercises**

```ts
  // Set 3 — Rezolvarea ecuației de gradul al II-lea
  {
    id: "g2-s3-1",
    topic: "functia-gradul-2",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Soluțiile ecuației $x^2-3x+2=0$ sunt:",
    options: ["$x\\in\\{1,2\\}$", "$x\\in\\{-1,-2\\}$", "$x\\in\\{1,-2\\}$", "$x\\in\\{-1,2\\}$"],
    correctAnswer: "$x\\in\\{1,2\\}$",
    explanation: [
      "Factorizăm: $x^2-3x+2=(x-1)(x-2)$.",
      "Soluțiile sunt $x=1$ și $x=2$.",
    ],
  },
  {
    id: "g2-s3-2",
    topic: "functia-gradul-2",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Determinați soluția pozitivă a ecuației $x^2-9=0$.",
    correctAnswer: "3",
    explanation: [
      "Rezolvăm: $x^2=9 \\Rightarrow x=\\pm3$.",
      "Soluția pozitivă este $x=3$.",
    ],
  },
  {
    id: "g2-s3-3",
    topic: "functia-gradul-2",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Soluțiile ecuației $x^2+5x+6=0$ sunt:",
    options: ["$x\\in\\{-2,-3\\}$", "$x\\in\\{2,3\\}$", "$x\\in\\{-2,3\\}$", "$x\\in\\{2,-3\\}$"],
    correctAnswer: "$x\\in\\{-2,-3\\}$",
    explanation: [
      "Factorizăm: $x^2+5x+6=(x+2)(x+3)$.",
      "Soluțiile sunt $x=-2$ și $x=-3$.",
    ],
  },
  {
    id: "g2-s3-4",
    topic: "functia-gradul-2",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Determinați soluția nenulă a ecuației $x^2-4x=0$.",
    correctAnswer: "4",
    explanation: [
      "Factorizăm: $x(x-4)=0$.",
      "Soluțiile sunt $x=0$ și $x=4$; soluția nenulă este $x=4$.",
    ],
  },
  {
    id: "g2-s3-5",
    topic: "functia-gradul-2",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Soluțiile ecuației $x^2-2x-8=0$ sunt:",
    options: ["$x\\in\\{4,-2\\}$", "$x\\in\\{-4,2\\}$", "$x\\in\\{4,2\\}$", "$x\\in\\{-4,-2\\}$"],
    correctAnswer: "$x\\in\\{4,-2\\}$",
    explanation: [
      "Calculăm $\\Delta=(-2)^2-4\\cdot1\\cdot(-8)=4+32=36$.",
      "Soluțiile sunt $x=\\dfrac{2\\pm6}{2}$, adică $x=4$ și $x=-2$.",
    ],
  },
  {
    id: "g2-s3-6",
    topic: "functia-gradul-2",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Determinați soluția pozitivă a ecuației $2x^2-8=0$.",
    correctAnswer: "2",
    explanation: [
      "Rezolvăm: $x^2=4 \\Rightarrow x=\\pm2$.",
      "Soluția pozitivă este $x=2$.",
    ],
  },
  {
    id: "g2-s3-7",
    topic: "functia-gradul-2",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Soluția ecuației $x^2+6x+9=0$ este:",
    options: ["$x=-3$ (soluție dublă)", "$x=3$ (soluție dublă)", "$x\\in\\{-3,3\\}$", "nicio soluție"],
    correctAnswer: "$x=-3$ (soluție dublă)",
    explanation: [
      "Recunoaștem pătratul perfect: $x^2+6x+9=(x+3)^2$.",
      "Ecuația $(x+3)^2=0$ are soluția dublă $x=-3$.",
    ],
  },
  {
    id: "g2-s3-8",
    topic: "functia-gradul-2",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Determinați soluția mai mare a ecuației $x^2-7x+10=0$.",
    correctAnswer: "5",
    explanation: [
      "Factorizăm: $x^2-7x+10=(x-2)(x-5)$.",
      "Soluțiile sunt $x=2$ și $x=5$; cea mai mare este $x=5$.",
    ],
  },
  {
    id: "g2-s3-9",
    topic: "functia-gradul-2",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Soluțiile ecuației $x^2-x-12=0$ sunt:",
    options: ["$x\\in\\{4,-3\\}$", "$x\\in\\{-4,3\\}$", "$x\\in\\{4,3\\}$", "$x\\in\\{-4,-3\\}$"],
    correctAnswer: "$x\\in\\{4,-3\\}$",
    explanation: [
      "Calculăm $\\Delta=(-1)^2-4\\cdot1\\cdot(-12)=1+48=49$.",
      "Soluțiile sunt $x=\\dfrac{1\\pm7}{2}$, adică $x=4$ și $x=-3$.",
    ],
  },
  {
    id: "g2-s3-10",
    topic: "functia-gradul-2",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Determinați soluția (dublă) a ecuației $x^2-2x+1=0$.",
    correctAnswer: "1",
    explanation: [
      "Recunoaștem pătratul perfect: $x^2-2x+1=(x-1)^2$.",
      "Ecuația $(x-1)^2=0$ are soluția dublă $x=1$.",
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
git add src/data/questions/functiaGradul2Sets.ts
git commit -m "Add practice Set 3 (Rezolvarea ecuației de gradul al II-lea)"
```

---

### Task 4: Set 4 (Vârful parabolei)

**Files:**
- Modify: `src/data/questions/functiaGradul2Sets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–3.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 4's 10 exercises**

```ts
  // Set 4 — Vârful parabolei
  {
    id: "g2-s4-1",
    topic: "functia-gradul-2",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=x^2-6x+5$. Determinați abscisa vârfului parabolei.",
    correctAnswer: "3",
    explanation: [
      "Abscisa vârfului este $x_V=-\\dfrac{b}{2a}=-\\dfrac{-6}{2\\cdot1}$.",
      "Calculăm: $x_V=3$.",
    ],
  },
  {
    id: "g2-s4-2",
    topic: "functia-gradul-2",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=x^2-8x+12$. Determinați abscisa vârfului parabolei.",
    correctAnswer: "4",
    explanation: [
      "Abscisa vârfului este $x_V=-\\dfrac{-8}{2\\cdot1}$.",
      "Calculăm: $x_V=4$.",
    ],
  },
  {
    id: "g2-s4-3",
    topic: "functia-gradul-2",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=-x^2+4x-1$. Determinați abscisa vârfului parabolei.",
    correctAnswer: "2",
    explanation: [
      "Abscisa vârfului este $x_V=-\\dfrac{4}{2\\cdot(-1)}$.",
      "Calculăm: $x_V=2$.",
    ],
  },
  {
    id: "g2-s4-4",
    topic: "functia-gradul-2",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Fie $f(x)=2x^2-4x+1$. Coordonatele vârfului parabolei sunt:",
    options: ["$(1,-1)$", "$(-1,1)$", "$(1,1)$", "$(2,-1)$"],
    correctAnswer: "$(1,-1)$",
    explanation: [
      "Abscisa vârfului: $x_V=-\\dfrac{-4}{2\\cdot2}=1$.",
      "Ordonata vârfului: $y_V=f(1)=2-4+1=-1$.",
      "Vârful este $(1,-1)$.",
    ],
  },
  {
    id: "g2-s4-5",
    topic: "functia-gradul-2",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=x^2+2x-3$. Determinați ordonata vârfului parabolei.",
    correctAnswer: "-4",
    explanation: [
      "Abscisa vârfului: $x_V=-\\dfrac{2}{2\\cdot1}=-1$.",
      "Ordonata vârfului: $y_V=f(-1)=1-2-3=-4$.",
    ],
  },
  {
    id: "g2-s4-6",
    topic: "functia-gradul-2",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=x^2-10x+21$. Determinați abscisa vârfului parabolei.",
    correctAnswer: "5",
    explanation: [
      "Abscisa vârfului este $x_V=-\\dfrac{-10}{2\\cdot1}$.",
      "Calculăm: $x_V=5$.",
    ],
  },
  {
    id: "g2-s4-7",
    topic: "functia-gradul-2",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Fie $f(x)=-2x^2+8x-5$. Coordonatele vârfului parabolei sunt:",
    options: ["$(2,3)$", "$(-2,3)$", "$(2,-3)$", "$(4,3)$"],
    correctAnswer: "$(2,3)$",
    explanation: [
      "Abscisa vârfului: $x_V=-\\dfrac{8}{2\\cdot(-2)}=2$.",
      "Ordonata vârfului: $y_V=f(2)=-8+16-5=3$.",
      "Vârful este $(2,3)$.",
    ],
  },
  {
    id: "g2-s4-8",
    topic: "functia-gradul-2",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=x^2-4x+10$. Determinați ordonata vârfului parabolei.",
    correctAnswer: "6",
    explanation: [
      "Abscisa vârfului: $x_V=-\\dfrac{-4}{2\\cdot1}=2$.",
      "Ordonata vârfului: $y_V=f(2)=4-8+10=6$.",
    ],
  },
  {
    id: "g2-s4-9",
    topic: "functia-gradul-2",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Pentru $f(x)=ax^2+bx+c$ cu $a\\neq0$, abscisa vârfului parabolei este dată de formula:",
    options: [
      "$x_V=-\\dfrac{b}{2a}$",
      "$x_V=\\dfrac{b}{2a}$",
      "$x_V=-\\dfrac{c}{2a}$",
      "$x_V=\\dfrac{-b\\pm\\sqrt{\\Delta}}{2a}$",
    ],
    correctAnswer: "$x_V=-\\dfrac{b}{2a}$",
    explanation: [
      "Aceasta este formula standard pentru abscisa vârfului unei parabole.",
    ],
  },
  {
    id: "g2-s4-10",
    topic: "functia-gradul-2",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=x^2-2x-8$. Calculați suma dintre abscisa și ordonata vârfului parabolei.",
    correctAnswer: "-8",
    explanation: [
      "Abscisa vârfului: $x_V=-\\dfrac{-2}{2\\cdot1}=1$.",
      "Ordonata vârfului: $y_V=f(1)=1-2-8=-9$.",
      "Suma este $1+(-9)=-8$.",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises (check `\dfrac`).
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Run the full test suite.**
- [ ] **Step 7: Commit**

```bash
git add src/data/questions/functiaGradul2Sets.ts
git commit -m "Add practice Set 4 (Vârful parabolei)"
```

---

### Task 5: Set 5 (Relațiile lui Viète)

**Files:**
- Modify: `src/data/questions/functiaGradul2Sets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–4.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 5's 10 exercises**

```ts
  // Set 5 — Relațiile lui Viète
  {
    id: "g2-s5-1",
    topic: "functia-gradul-2",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Pentru ecuația $x^2-9x+20=0$, determinați suma soluțiilor $x_1+x_2$, folosind relațiile lui Viète.",
    correctAnswer: "9",
    explanation: [
      "Conform relațiilor lui Viète, $x_1+x_2=-\\dfrac{b}{a}$.",
      "Aici $a=1$, $b=-9$, deci $x_1+x_2=9$.",
    ],
  },
  {
    id: "g2-s5-2",
    topic: "functia-gradul-2",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Pentru ecuația $x^2-9x+20=0$, determinați produsul soluțiilor $x_1\\cdot x_2$, folosind relațiile lui Viète.",
    correctAnswer: "20",
    explanation: [
      "Conform relațiilor lui Viète, $x_1\\cdot x_2=\\dfrac{c}{a}$.",
      "Aici $a=1$, $c=20$, deci $x_1\\cdot x_2=20$.",
    ],
  },
  {
    id: "g2-s5-3",
    topic: "functia-gradul-2",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Pentru ecuația $2x^2-6x+4=0$, determinați suma soluțiilor $x_1+x_2$.",
    correctAnswer: "3",
    explanation: [
      "$x_1+x_2=-\\dfrac{b}{a}=-\\dfrac{-6}{2}$.",
      "Calculăm: $x_1+x_2=3$.",
    ],
  },
  {
    id: "g2-s5-4",
    topic: "functia-gradul-2",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Pentru ecuația $2x^2-6x+4=0$, determinați produsul soluțiilor $x_1\\cdot x_2$.",
    correctAnswer: "2",
    explanation: [
      "$x_1\\cdot x_2=\\dfrac{c}{a}=\\dfrac{4}{2}$.",
      "Calculăm: $x_1\\cdot x_2=2$.",
    ],
  },
  {
    id: "g2-s5-5",
    topic: "functia-gradul-2",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Pentru ecuația $x^2+5x-6=0$, suma soluțiilor $x_1+x_2$ este:",
    options: ["$-5$", "$5$", "$-6$", "$6$"],
    correctAnswer: "$-5$",
    explanation: [
      "$x_1+x_2=-\\dfrac{b}{a}=-\\dfrac{5}{1}=-5$.",
    ],
  },
  {
    id: "g2-s5-6",
    topic: "functia-gradul-2",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Pentru ecuația $x^2+5x-6=0$, produsul soluțiilor $x_1\\cdot x_2$ este:",
    options: ["$-6$", "$6$", "$-5$", "$5$"],
    correctAnswer: "$-6$",
    explanation: [
      "$x_1\\cdot x_2=\\dfrac{c}{a}=\\dfrac{-6}{1}=-6$.",
    ],
  },
  {
    id: "g2-s5-7",
    topic: "functia-gradul-2",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Pentru ecuația $3x^2-12x+9=0$, determinați suma soluțiilor $x_1+x_2$.",
    correctAnswer: "4",
    explanation: [
      "$x_1+x_2=-\\dfrac{b}{a}=-\\dfrac{-12}{3}$.",
      "Calculăm: $x_1+x_2=4$.",
    ],
  },
  {
    id: "g2-s5-8",
    topic: "functia-gradul-2",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Pentru ecuația $x^2-3x-10=0$, determinați produsul soluțiilor $x_1\\cdot x_2$.",
    correctAnswer: "-10",
    explanation: [
      "$x_1\\cdot x_2=\\dfrac{c}{a}=\\dfrac{-10}{1}=-10$.",
    ],
  },
  {
    id: "g2-s5-9",
    topic: "functia-gradul-2",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Dacă $x_1,x_2$ sunt soluțiile ecuației $ax^2+bx+c=0$ ($a\\neq0$), atunci $x_1+x_2$ este egal cu:",
    options: ["$-\\dfrac{b}{a}$", "$\\dfrac{b}{a}$", "$-\\dfrac{c}{a}$", "$\\dfrac{c}{a}$"],
    correctAnswer: "$-\\dfrac{b}{a}$",
    explanation: [
      "Aceasta este prima relație a lui Viète.",
    ],
  },
  {
    id: "g2-s5-10",
    topic: "functia-gradul-2",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Pentru ecuația $x^2-7x+12=0$, calculați $x_1^2+x_2^2$ folosind relațiile lui Viète (formula $x_1^2+x_2^2=(x_1+x_2)^2-2x_1x_2$).",
    correctAnswer: "25",
    explanation: [
      "Conform relațiilor lui Viète: $x_1+x_2=7$, $x_1\\cdot x_2=12$.",
      "Calculăm: $x_1^2+x_2^2=7^2-2\\cdot12=49-24=25$.",
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
git add src/data/questions/functiaGradul2Sets.ts
git commit -m "Add practice Set 5 (Relațiile lui Viète)"
```

---

### Task 6: Set 6 (Scrierea ecuației cunoscând rădăcinile)

**Files:**
- Modify: `src/data/questions/functiaGradul2Sets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–5.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 6's 10 exercises**

```ts
  // Set 6 — Scrierea ecuației cunoscând rădăcinile (Viète invers)
  {
    id: "g2-s6-1",
    topic: "functia-gradul-2",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Rădăcinile unei ecuații de gradul al II-lea sunt $x_1=2$ și $x_2=5$. Determinați suma $S=x_1+x_2$.",
    correctAnswer: "7",
    explanation: [
      "$S=x_1+x_2=2+5=7$.",
    ],
  },
  {
    id: "g2-s6-2",
    topic: "functia-gradul-2",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Pentru aceleași rădăcini ($x_1=2$, $x_2=5$), determinați produsul $P=x_1\\cdot x_2$.",
    correctAnswer: "10",
    explanation: [
      "$P=x_1\\cdot x_2=2\\cdot5=10$.",
    ],
  },
  {
    id: "g2-s6-3",
    topic: "functia-gradul-2",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Ecuația de gradul al II-lea cu rădăcinile $x_1=2$, $x_2=5$ este (folosind formula $x^2-Sx+P=0$):",
    options: ["$x^2-7x+10=0$", "$x^2+7x+10=0$", "$x^2-7x-10=0$", "$x^2-10x+7=0$"],
    correctAnswer: "$x^2-7x+10=0$",
    explanation: [
      "$S=x_1+x_2=7$, $P=x_1\\cdot x_2=10$.",
      "Ecuația este $x^2-Sx+P=0$, adică $x^2-7x+10=0$.",
    ],
  },
  {
    id: "g2-s6-4",
    topic: "functia-gradul-2",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Rădăcinile unei ecuații sunt $x_1=-3$, $x_2=4$. Determinați suma $S$.",
    correctAnswer: "1",
    explanation: [
      "$S=x_1+x_2=-3+4=1$.",
    ],
  },
  {
    id: "g2-s6-5",
    topic: "functia-gradul-2",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Pentru aceleași rădăcini ($x_1=-3$, $x_2=4$), determinați produsul $P$.",
    correctAnswer: "-12",
    explanation: [
      "$P=x_1\\cdot x_2=(-3)\\cdot4=-12$.",
    ],
  },
  {
    id: "g2-s6-6",
    topic: "functia-gradul-2",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Ecuația de gradul al II-lea cu rădăcinile $x_1=-3$, $x_2=4$ este:",
    options: ["$x^2-x-12=0$", "$x^2+x-12=0$", "$x^2-x+12=0$", "$x^2+x+12=0$"],
    correctAnswer: "$x^2-x-12=0$",
    explanation: [
      "$S=x_1+x_2=1$, $P=x_1\\cdot x_2=-12$.",
      "Ecuația este $x^2-Sx+P=0$, adică $x^2-x-12=0$.",
    ],
  },
  {
    id: "g2-s6-7",
    topic: "functia-gradul-2",
    set: 6,
    type: "input",
    points: 6,
    prompt: "O ecuație are rădăcina dublă $x_1=x_2=1$. Determinați suma $S=x_1+x_2$.",
    correctAnswer: "2",
    explanation: [
      "$S=x_1+x_2=1+1=2$.",
    ],
  },
  {
    id: "g2-s6-8",
    topic: "functia-gradul-2",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Ecuația de gradul al II-lea cu rădăcina dublă $x=1$ este:",
    options: ["$x^2-2x+1=0$", "$x^2+2x+1=0$", "$x^2-2x-1=0$", "$x^2-x+1=0$"],
    correctAnswer: "$x^2-2x+1=0$",
    explanation: [
      "$S=1+1=2$, $P=1\\cdot1=1$.",
      "Ecuația este $x^2-2x+1=0$, adică $(x-1)^2=0$.",
    ],
  },
  {
    id: "g2-s6-9",
    topic: "functia-gradul-2",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Suma rădăcinilor unei ecuații este $S=6$ și produsul este $P=8$. Pentru ecuația $x^2+bx+c=0$ (cu $a=1$, $b=-S$), determinați valoarea lui $b$.",
    correctAnswer: "-6",
    explanation: [
      "Din forma $x^2-Sx+P=0=x^2+bx+c$, rezultă $b=-S=-6$.",
    ],
  },
  {
    id: "g2-s6-10",
    topic: "functia-gradul-2",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Pentru aceeași ecuație (suma $S=6$, produsul $P=8$, cu $a=1$ și $c=P$), determinați valoarea lui $c$.",
    correctAnswer: "8",
    explanation: [
      "Din forma $x^2-Sx+P=0=x^2+bx+c$, rezultă $c=P=8$.",
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
git add src/data/questions/functiaGradul2Sets.ts
git commit -m "Add practice Set 6 (Scrierea ecuației cunoscând rădăcinile)"
```

---

### Task 7: Set 7 (Semnul funcției de gradul al II-lea)

**Files:**
- Modify: `src/data/questions/functiaGradul2Sets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–6.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 7's 10 exercises**

```ts
  // Set 7 — Semnul funcției de gradul al II-lea
  {
    id: "g2-s7-1",
    topic: "functia-gradul-2",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Fie $f(x)=x^2-5x+6$, cu rădăcinile $2$ și $3$. Semnul lui $f(x)$ pentru $x\\in(2,3)$ este:",
    options: ["negativ", "pozitiv", "zero", "nu se poate determina"],
    correctAnswer: "negativ",
    explanation: [
      "Cum $a=1>0$ și $\\Delta>0$, funcția este negativă între rădăcini.",
    ],
  },
  {
    id: "g2-s7-2",
    topic: "functia-gradul-2",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Pentru aceeași funcție $f(x)=x^2-5x+6$ (rădăcini $2$ și $3$), semnul lui $f(x)$ pentru $x<2$ sau $x>3$ este:",
    options: ["pozitiv", "negativ", "zero", "nu se poate determina"],
    correctAnswer: "pozitiv",
    explanation: [
      "Cum $a=1>0$, funcția este pozitivă în afara intervalului dintre rădăcini.",
    ],
  },
  {
    id: "g2-s7-3",
    topic: "functia-gradul-2",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=x^2-4x+4$ (cu $\\Delta=0$). Pentru ce valoare a lui $x$ este $f(x)=0$?",
    correctAnswer: "2",
    explanation: [
      "$f(x)=x^2-4x+4=(x-2)^2$, care se anulează pentru $x=2$ (rădăcină dublă).",
    ],
  },
  {
    id: "g2-s7-4",
    topic: "functia-gradul-2",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Fie $f(x)=-x^2+2x-1$ (cu $\\Delta=0$). Semnul lui $f(x)$ pentru orice $x\\neq1$ este:",
    options: ["negativ", "pozitiv", "zero", "depinde de $x$"],
    correctAnswer: "negativ",
    explanation: [
      "Cum $\\Delta=0$ și $a=-1<0$, funcția păstrează semnul lui $a$ (negativ) pentru orice $x\\neq1$.",
    ],
  },
  {
    id: "g2-s7-5",
    topic: "functia-gradul-2",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Fie $f(x)=x^2+x+1$ (cu $\\Delta<0$). Semnul lui $f(x)$ pe $\\mathbb{R}$ este:",
    options: [
      "pozitiv pe tot $\\mathbb{R}$",
      "negativ pe tot $\\mathbb{R}$",
      "depinde de $x$",
      "zero pentru anumite valori ale lui $x$",
    ],
    correctAnswer: "pozitiv pe tot $\\mathbb{R}$",
    explanation: [
      "Calculăm $\\Delta=1-4=-3<0$.",
      "Cum $\\Delta<0$ și $a=1>0$, funcția este pozitivă pe tot $\\mathbb{R}$.",
    ],
  },
  {
    id: "g2-s7-6",
    topic: "functia-gradul-2",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Fie $f(x)=-x^2-x-1$ (cu $\\Delta<0$). Semnul lui $f(x)$ pe $\\mathbb{R}$ este:",
    options: [
      "negativ pe tot $\\mathbb{R}$",
      "pozitiv pe tot $\\mathbb{R}$",
      "depinde de $x$",
      "zero pentru anumite valori ale lui $x$",
    ],
    correctAnswer: "negativ pe tot $\\mathbb{R}$",
    explanation: [
      "Calculăm $\\Delta=1-4=-3<0$.",
      "Cum $\\Delta<0$ și $a=-1<0$, funcția este negativă pe tot $\\mathbb{R}$.",
    ],
  },
  {
    id: "g2-s7-7",
    topic: "functia-gradul-2",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=x^2-1$. Determinați rădăcina pozitivă (unde $f(x)=0$).",
    correctAnswer: "1",
    explanation: [
      "Rezolvăm $x^2=1 \\Rightarrow x=\\pm1$.",
      "Rădăcina pozitivă este $x=1$.",
    ],
  },
  {
    id: "g2-s7-8",
    topic: "functia-gradul-2",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Fie $f(x)=x^2-6x+8$, cu rădăcinile $2$ și $4$. Semnul lui $f(x)$ pentru $x=5$ este:",
    options: ["pozitiv", "negativ", "zero", "nu se poate determina"],
    correctAnswer: "pozitiv",
    explanation: [
      "Cum $x=5$ este în afara intervalului $(2,4)$ dintre rădăcini și $a=1>0$, funcția este pozitivă.",
      "Verificare: $f(5)=25-30+8=3>0$.",
    ],
  },
  {
    id: "g2-s7-9",
    topic: "functia-gradul-2",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=x^2-6x+8$ (rădăcini $2$ și $4$). Câte valori întregi $x$ din intervalul $[2,4]$ satisfac $f(x)\\leq0$?",
    correctAnswer: "3",
    explanation: [
      "Valorile întregi din $[2,4]$ sunt $2,3,4$.",
      "Calculăm: $f(2)=0$, $f(3)=9-18+8=-1$, $f(4)=0$ — toate satisfac $f(x)\\leq0$.",
      "Sunt $3$ valori.",
    ],
  },
  {
    id: "g2-s7-10",
    topic: "functia-gradul-2",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Pentru $f(x)=ax^2+bx+c$ cu $a>0$ și $\\Delta>0$, semnul funcției între rădăcini este:",
    options: [
      "negativ (opus semnului lui $a$)",
      "pozitiv (semnul lui $a$)",
      "zero",
      "nu se poate determina",
    ],
    correctAnswer: "negativ (opus semnului lui $a$)",
    explanation: [
      "Regula semnului: între rădăcini, funcția are semn opus lui $a$; în afara rădăcinilor, are semnul lui $a$.",
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
git add src/data/questions/functiaGradul2Sets.ts
git commit -m "Add practice Set 7 (Semnul funcției de gradul al II-lea)"
```

---

### Task 8: Set 8 (Inecuații de gradul al II-lea)

**Files:**
- Modify: `src/data/questions/functiaGradul2Sets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–7.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 8's 10 exercises**

```ts
  // Set 8 — Inecuații de gradul al II-lea
  {
    id: "g2-s8-1",
    topic: "functia-gradul-2",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Soluția inecuației $x^2-5x+6>0$ este:",
    options: [
      "$(-\\infty,2)\\cup(3,+\\infty)$",
      "$(2,3)$",
      "$[2,3]$",
      "$(-\\infty,2]\\cup[3,+\\infty)$",
    ],
    correctAnswer: "$(-\\infty,2)\\cup(3,+\\infty)$",
    explanation: [
      "Rădăcinile sunt $2$ și $3$; cum $a=1>0$, funcția este pozitivă în afara intervalului $(2,3)$.",
    ],
  },
  {
    id: "g2-s8-2",
    topic: "functia-gradul-2",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Soluția inecuației $x^2-5x+6<0$ este:",
    options: ["$(2,3)$", "$(-\\infty,2)\\cup(3,+\\infty)$", "$[2,3]$", "$\\emptyset$"],
    correctAnswer: "$(2,3)$",
    explanation: [
      "Rădăcinile sunt $2$ și $3$; cum $a=1>0$, funcția este negativă între rădăcini.",
    ],
  },
  {
    id: "g2-s8-3",
    topic: "functia-gradul-2",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Soluția inecuației $x^2-4x+4\\geq0$ este:",
    options: ["$\\mathbb{R}$", "$\\{2\\}$", "$\\mathbb{R}\\setminus\\{2\\}$", "$\\emptyset$"],
    correctAnswer: "$\\mathbb{R}$",
    explanation: [
      "$x^2-4x+4=(x-2)^2\\geq0$ pentru orice $x$ real (pătrat perfect), inclusiv egalitate la $x=2$.",
    ],
  },
  {
    id: "g2-s8-4",
    topic: "functia-gradul-2",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Soluția inecuației $x^2-4x+4<0$ este:",
    options: ["$\\emptyset$", "$\\mathbb{R}$", "$\\{2\\}$", "$(-\\infty,2)$"],
    correctAnswer: "$\\emptyset$",
    explanation: [
      "$x^2-4x+4=(x-2)^2$ nu este niciodată negativ, deci inecuația nu are soluții.",
    ],
  },
  {
    id: "g2-s8-5",
    topic: "functia-gradul-2",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Soluția inecuației $x^2+x+1>0$ este:",
    options: ["$\\mathbb{R}$", "$\\emptyset$", "$(-1,1)$", "$(-\\infty,-1)\\cup(1,+\\infty)$"],
    correctAnswer: "$\\mathbb{R}$",
    explanation: [
      "$\\Delta=1-4=-3<0$ și $a=1>0$, deci funcția este pozitivă pe tot $\\mathbb{R}$.",
    ],
  },
  {
    id: "g2-s8-6",
    topic: "functia-gradul-2",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Soluția inecuației $-x^2+3x-2>0$ este:",
    options: ["$(1,2)$", "$(-\\infty,1)\\cup(2,+\\infty)$", "$[1,2]$", "$\\emptyset$"],
    correctAnswer: "$(1,2)$",
    explanation: [
      "Rădăcinile ecuației asociate sunt $1$ și $2$ (din $x^2-3x+2=0$).",
      "Cum $a=-1<0$, funcția este pozitivă între rădăcini.",
    ],
  },
  {
    id: "g2-s8-7",
    topic: "functia-gradul-2",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Determinați cel mai mic număr întreg pozitiv $x$ care satisface inecuația $x^2-9>0$.",
    correctAnswer: "4",
    explanation: [
      "Rezolvăm: $x^2>9 \\Rightarrow x>3$ sau $x<-3$.",
      "Cel mai mic număr întreg pozitiv cu $x>3$ este $x=4$.",
    ],
  },
  {
    id: "g2-s8-8",
    topic: "functia-gradul-2",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Determinați cel mai mare număr întreg din soluția inecuației $x^2-25\\leq0$.",
    correctAnswer: "5",
    explanation: [
      "Rezolvăm: $-5\\leq x\\leq5$.",
      "Cel mai mare număr întreg din acest interval este $5$.",
    ],
  },
  {
    id: "g2-s8-9",
    topic: "functia-gradul-2",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Soluția inecuației $2x^2-8x+6\\leq0$ este:",
    options: ["$[1,3]$", "$(1,3)$", "$(-\\infty,1]\\cup[3,+\\infty)$", "$\\emptyset$"],
    correctAnswer: "$[1,3]$",
    explanation: [
      "Simplificăm: $x^2-4x+3\\leq0$, cu rădăcinile $1$ și $3$.",
      "Cum $a=1>0$, funcția este negativă sau nulă între rădăcini, inclusiv capetele.",
    ],
  },
  {
    id: "g2-s8-10",
    topic: "functia-gradul-2",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Determinați numărul de soluții întregi ale inecuației $x^2-9\\leq0$.",
    correctAnswer: "7",
    explanation: [
      "Rezolvăm: $-3\\leq x\\leq3$.",
      "Numerele întregi din acest interval sunt $-3,-2,-1,0,1,2,3$, deci $7$ valori.",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises (check `\infty`, `\emptyset`, `\mathbb`).
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Run the full test suite.**
- [ ] **Step 7: Commit**

```bash
git add src/data/questions/functiaGradul2Sets.ts
git commit -m "Add practice Set 8 (Inecuații de gradul al II-lea)"
```

---

### Task 9: Set 9 (Intersecția cu axele de coordonate)

**Files:**
- Modify: `src/data/questions/functiaGradul2Sets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–8.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 9's 10 exercises**

```ts
  // Set 9 — Intersecția cu axele de coordonate
  {
    id: "g2-s9-1",
    topic: "functia-gradul-2",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=x^2-7x+10$. Determinați suma abciselor punctelor de intersecție a graficului cu axa $Ox$.",
    correctAnswer: "7",
    explanation: [
      "Conform relațiilor lui Viète, suma rădăcinilor este $x_1+x_2=-\\dfrac{b}{a}=7$.",
    ],
  },
  {
    id: "g2-s9-2",
    topic: "functia-gradul-2",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Pentru aceeași funcție $f(x)=x^2-7x+10$, determinați ordonata punctului de intersecție cu axa $Oy$.",
    correctAnswer: "10",
    explanation: [
      "Ordonata la origine este $f(0)=10$.",
    ],
  },
  {
    id: "g2-s9-3",
    topic: "functia-gradul-2",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Punctele de intersecție ale graficului funcției $f(x)=x^2-x-6$ cu axa $Ox$ sunt:",
    options: [
      "$(3,0)$ și $(-2,0)$",
      "$(-3,0)$ și $(2,0)$",
      "$(3,0)$ și $(2,0)$",
      "$(-3,0)$ și $(-2,0)$",
    ],
    correctAnswer: "$(3,0)$ și $(-2,0)$",
    explanation: [
      "Factorizăm: $x^2-x-6=(x-3)(x+2)$.",
      "Rădăcinile sunt $x=3$ și $x=-2$.",
    ],
  },
  {
    id: "g2-s9-4",
    topic: "functia-gradul-2",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=2x^2-3x-5$. Determinați ordonata punctului de intersecție cu axa $Oy$.",
    correctAnswer: "-5",
    explanation: [
      "Ordonata la origine este $f(0)=-5$.",
    ],
  },
  {
    id: "g2-s9-5",
    topic: "functia-gradul-2",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Graficul funcției $f(x)=x^2-2x+1$ intersectează axa $Ox$ în:",
    options: [
      "un singur punct, $(1,0)$",
      "două puncte, $(1,0)$ și $(-1,0)$",
      "niciun punct",
      "trei puncte",
    ],
    correctAnswer: "un singur punct, $(1,0)$",
    explanation: [
      "$f(x)=x^2-2x+1=(x-1)^2$, deci rădăcina dublă este $x=1$.",
      "Graficul este tangent axei $Ox$ în $(1,0)$.",
    ],
  },
  {
    id: "g2-s9-6",
    topic: "functia-gradul-2",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Graficul funcției $f(x)=x^2+x+1$ intersectează axa $Ox$ în:",
    options: ["niciun punct", "un singur punct", "două puncte", "trei puncte"],
    correctAnswer: "niciun punct",
    explanation: [
      "$\\Delta=1-4=-3<0$, deci ecuația $f(x)=0$ nu are soluții reale.",
      "Graficul nu intersectează axa $Ox$.",
    ],
  },
  {
    id: "g2-s9-7",
    topic: "functia-gradul-2",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=x^2-8x+15$. Determinați produsul abciselor punctelor de intersecție cu axa $Ox$.",
    correctAnswer: "15",
    explanation: [
      "Conform relațiilor lui Viète, produsul rădăcinilor este $x_1\\cdot x_2=\\dfrac{c}{a}=15$.",
    ],
  },
  {
    id: "g2-s9-8",
    topic: "functia-gradul-2",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=3x^2-6x$. Determinați suma abciselor punctelor de intersecție cu axa $Ox$.",
    correctAnswer: "2",
    explanation: [
      "Factorizăm: $3x^2-6x=3x(x-2)$, cu rădăcinile $x=0$ și $x=2$.",
      "Suma este $0+2=2$.",
    ],
  },
  {
    id: "g2-s9-9",
    topic: "functia-gradul-2",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Punctele de intersecție ale graficului funcției $f(x)=-2x^2+8$ cu axa $Ox$ sunt:",
    options: [
      "$(2,0)$ și $(-2,0)$",
      "$(4,0)$ și $(-4,0)$",
      "$(2,0)$ și $(4,0)$",
      "niciun punct",
    ],
    correctAnswer: "$(2,0)$ și $(-2,0)$",
    explanation: [
      "Rezolvăm $-2x^2+8=0 \\Rightarrow x^2=4 \\Rightarrow x=\\pm2$.",
    ],
  },
  {
    id: "g2-s9-10",
    topic: "functia-gradul-2",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=x^2-5x+4$. Calculați suma dintre ordonata intersecției cu $Oy$ și suma abciselor intersecțiilor cu $Ox$.",
    correctAnswer: "9",
    explanation: [
      "Ordonata intersecției cu $Oy$: $f(0)=4$.",
      "Suma abciselor intersecțiilor cu $Ox$ (Viète): $x_1+x_2=5$.",
      "Suma totală este $4+5=9$.",
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
git add src/data/questions/functiaGradul2Sets.ts
git commit -m "Add practice Set 9 (Intersecția cu axele de coordonate)"
```

---

### Task 10: Set 10 (Recapitulare / aplicații mixte) + final verification

**Files:**
- Modify: `src/data/questions/functiaGradul2Sets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–9 (must have exactly 90 exercises, Sets 1–9, before this task starts).
- Produces: the completed 100-exercise file — no further tasks depend on this one.

- [ ] **Step 1: Append Set 10's 10 exercises**

```ts
  // Set 10 — Recapitulare / aplicații mixte
  {
    id: "g2-s10-1",
    topic: "functia-gradul-2",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=x^2-6x+8$. Calculați $f(1)$.",
    correctAnswer: "3",
    explanation: [
      "Înlocuim $x=1$: $f(1)=1-6+8=3$.",
    ],
  },
  {
    id: "g2-s10-2",
    topic: "functia-gradul-2",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Determinați discriminantul $\\Delta$ al ecuației $x^2-3x-4=0$.",
    correctAnswer: "25",
    explanation: [
      "Calculăm $\\Delta=(-3)^2-4\\cdot1\\cdot(-4)=9+16=25$.",
    ],
  },
  {
    id: "g2-s10-3",
    topic: "functia-gradul-2",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Soluțiile ecuației $x^2-2x-3=0$ sunt:",
    options: ["$x\\in\\{3,-1\\}$", "$x\\in\\{-3,1\\}$", "$x\\in\\{3,1\\}$", "$x\\in\\{-3,-1\\}$"],
    correctAnswer: "$x\\in\\{3,-1\\}$",
    explanation: [
      "Factorizăm: $x^2-2x-3=(x-3)(x+1)$.",
      "Soluțiile sunt $x=3$ și $x=-1$.",
    ],
  },
  {
    id: "g2-s10-4",
    topic: "functia-gradul-2",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=x^2-8x+15$. Determinați abscisa vârfului parabolei.",
    correctAnswer: "4",
    explanation: [
      "Abscisa vârfului este $x_V=-\\dfrac{-8}{2\\cdot1}=4$.",
    ],
  },
  {
    id: "g2-s10-5",
    topic: "functia-gradul-2",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Pentru ecuația $x^2-6x+8=0$, determinați suma soluțiilor folosind relațiile lui Viète.",
    correctAnswer: "6",
    explanation: [
      "$x_1+x_2=-\\dfrac{b}{a}=6$.",
    ],
  },
  {
    id: "g2-s10-6",
    topic: "functia-gradul-2",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Fie $f(x)=x^2+4x+4$. Semnul lui $f(x)$ pentru $x\\neq-2$ este:",
    options: ["pozitiv", "negativ", "zero", "depinde de $x$"],
    correctAnswer: "pozitiv",
    explanation: [
      "$f(x)=(x+2)^2$, care este pozitiv pentru orice $x\\neq-2$ (rădăcină dublă la $x=-2$).",
    ],
  },
  {
    id: "g2-s10-7",
    topic: "functia-gradul-2",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Soluția inecuației $x^2-1<0$ este:",
    options: ["$(-1,1)$", "$(-\\infty,-1)\\cup(1,+\\infty)$", "$[-1,1]$", "$\\emptyset$"],
    correctAnswer: "$(-1,1)$",
    explanation: [
      "Rădăcinile sunt $-1$ și $1$; cum $a=1>0$, funcția este negativă între rădăcini.",
    ],
  },
  {
    id: "g2-s10-8",
    topic: "functia-gradul-2",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=x^2-2x-8$. Determinați ordonata punctului de intersecție a graficului cu axa $Oy$.",
    correctAnswer: "-8",
    explanation: [
      "Ordonata la origine este $f(0)=-8$.",
    ],
  },
  {
    id: "g2-s10-9",
    topic: "functia-gradul-2",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Rădăcinile unei ecuații sunt $x_1=3$, $x_2=-4$. Determinați suma $S=x_1+x_2$.",
    correctAnswer: "-1",
    explanation: [
      "$S=x_1+x_2=3+(-4)=-1$.",
    ],
  },
  {
    id: "g2-s10-10",
    topic: "functia-gradul-2",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Pentru funcția $f(x)=ax^2+bx+c$ ($a\\neq0$) cu $\\Delta<0$ și $a>0$, graficul este:",
    options: [
      "situat integral deasupra axei $Ox$",
      "situat integral sub axa $Ox$",
      "tangent axei $Ox$",
      "secant axei $Ox$ în două puncte",
    ],
    correctAnswer: "situat integral deasupra axei $Ox$",
    explanation: [
      "Cum $\\Delta<0$, parabola nu intersectează axa $Ox$; cum $a>0$, ramurile sunt orientate în sus, deci întregul grafic este deasupra axei $Ox$.",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises.
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Verify the file has exactly 100 exercises across 10 sets**

Run: `grep -c '"functia-gradul-2"' src/data/questions/functiaGradul2Sets.ts` — expected output: `100`. Also verify each of the 10 sets has exactly 10 exercises (`set: N,` count for each N=1..10).

- [ ] **Step 7: Run typecheck and build**

Run: `npm run typecheck` — expect exit 0.
Run: `npm run build` — expect exit 0.

- [ ] **Step 8: Run the full test suite**

Run: `npm test` — expect all test files pass.

- [ ] **Step 9: Commit**

```bash
git add src/data/questions/functiaGradul2Sets.ts
git commit -m "Add practice Set 10 (Recapitulare) — completes Funcția de gradul al II-lea practice bank"
```
