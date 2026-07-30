# Șiruri Practice Sets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 100-exercise practice-set bank (10 sets × 10 exercises) for the `siruri` (Șiruri — arithmetic and geometric progressions) topic, matching the convention already shipped for `multimi-logica`, `functia-gradul-1`, and `functia-gradul-2`.

**Architecture:** One new file, `src/data/questions/siruriSets.ts`, exporting `siruriSetExercises: Exercise[]` (100 objects). Wired into `ALL_EXERCISES` in `src/data/index.ts` with a single import + spread (done once, in Task 1). Every other task only appends to `siruriSets.ts`.

**Tech Stack:** TypeScript, Vite, Vitest. No new dependencies.

## Global Constraints

- Base commit: `15de649` (design spec committed; baseline 40/40 tests passing).
- Exercise ids: `sr-s<SET>-<N>` (e.g. `sr-s1-1`, `sr-s10-10`) — note the base exercises use prefix `sr` (not `sir`), and set exercises follow the same `sr` prefix with an `s<N>-` infix.
- Every exercise: `topic: "siruri"`, `points: 6`, `set: <1..10>`.
- `type` is `"input"` or `"mcq"`. For `mcq`, `correctAnswer` must be character-for-character present in `options`, and all 4 options must be genuinely distinct claims/values (not reworded restatements of the same value).
- Inline LaTeX only (`$...$`), never display math (`$$...$$`).
- **LaTeX escaping (Critical):** every LaTeX command in a TS string literal needs a double backslash (`\\dfrac`, `\\cdot`, `\\Rightarrow`, `\\neq`, `\\ge`, etc.) because the string is parsed once by the TS/JS compiler before KaTeX ever sees it. A single backslash silently drops or corrupts the command and is invisible to the test suite. Before every commit: run `git diff --stat` (expect 0 deletions — this is a pure append) and a mojibake-marker scan (see Step 2 in every task below). Never use an external script (Python/sed/etc.) to generate or edit file content — use the file-editing tool directly.
- **Answer-variety discipline:** within each 10-exercise set, all `input`-type numeric `correctAnswer` values must be pairwise distinct. Already designed into every set below — do not let a transcription slip collapse two into the same value.
- **Content-duplication discipline:** none of the 100 exercises below duplicate the numeric parameters of the 7 existing base exercises (`sr-1`..`sr-7` in `src/data/questions/siruri.ts`) — already checked during plan-writing. Do not substitute different numbers than the ones given in each task's code block.
- **Romanian spelling:** proofread Romanian mathematical terminology as you transcribe (a prior round's final review caught a misspelling — "abciselor" instead of "absciselor" — that no automated check could see). Terms used here: rație, termen, șir, progresie aritmetică/geometrică, primul termen.
- No changes to `src/data/theory/siruri.ts` or the existing 7 base exercises in `src/data/questions/siruri.ts`. No changes to `examVariants.ts`. No new `Topic` entries.

---

### Task 1: Set 1 (Termenul general al progresiei aritmetice) + create file + wire index.ts

**Files:**
- Create: `src/data/questions/siruriSets.ts`
- Modify: `src/data/index.ts`

**Interfaces:**
- Consumes: `Exercise` type from `../../types` (see `src/data/questions/siruri.ts` for the exact import path pattern to copy).
- Produces: `siruriSetExercises: Exercise[]`, imported and spread into `ALL_EXERCISES` in `src/data/index.ts`.

- [ ] **Step 1: Create the file with Set 1's 10 exercises**

Create `src/data/questions/siruriSets.ts` with exactly this content:

```ts
import type { Exercise } from "../../types";

export const siruriSetExercises: Exercise[] = [
  // Set 1 — Termenul general al progresiei aritmetice
  {
    id: "sr-s1-1",
    topic: "siruri",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=3$ și rația $r=4$. Calculați $a_6$.",
    correctAnswer: "23",
    explanation: [
      "Aplicăm formula termenului general: $a_n=a_1+(n-1)r$.",
      "Înlocuim $n=6$: $a_6=3+5\\cdot4=3+20$.",
      "Rezultă $a_6=23$.",
    ],
  },
  {
    id: "sr-s1-2",
    topic: "siruri",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=15$ și rația $r=-2$. Calculați $a_7$.",
    correctAnswer: "3",
    explanation: [
      "Aplicăm formula termenului general: $a_n=a_1+(n-1)r$.",
      "Înlocuim $n=7$: $a_7=15+6\\cdot(-2)=15-12$.",
      "Rezultă $a_7=3$.",
    ],
  },
  {
    id: "sr-s1-3",
    topic: "siruri",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=-4$ și rația $r=6$. Calculați $a_5$.",
    correctAnswer: "20",
    explanation: [
      "Aplicăm formula termenului general: $a_n=a_1+(n-1)r$.",
      "Înlocuim $n=5$: $a_5=-4+4\\cdot6=-4+24$.",
      "Rezultă $a_5=20$.",
    ],
  },
  {
    id: "sr-s1-4",
    topic: "siruri",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=9$ și rația $r=-5$. Calculați $a_4$.",
    correctAnswer: "-6",
    explanation: [
      "Aplicăm formula termenului general: $a_n=a_1+(n-1)r$.",
      "Înlocuim $n=4$: $a_4=9+3\\cdot(-5)=9-15$.",
      "Rezultă $a_4=-6$.",
    ],
  },
  {
    id: "sr-s1-5",
    topic: "siruri",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=2$ și rația $r=3$. Valoarea lui $a_{10}$ este:",
    options: ["$29$", "$28$", "$30$", "$26$"],
    correctAnswer: "$29$",
    explanation: [
      "$a_{10}=a_1+9r=2+9\\cdot3=2+27=29$.",
    ],
  },
  {
    id: "sr-s1-6",
    topic: "siruri",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=20$ și rația $r=-7$. Calculați $a_5$.",
    correctAnswer: "-8",
    explanation: [
      "Aplicăm formula termenului general: $a_n=a_1+(n-1)r$.",
      "Înlocuim $n=5$: $a_5=20+4\\cdot(-7)=20-28$.",
      "Rezultă $a_5=-8$.",
    ],
  },
  {
    id: "sr-s1-7",
    topic: "siruri",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Formula termenului general al unei progresii aritmetice cu primul termen $a_1$ și rația $r$ este:",
    options: [
      "$a_n=a_1+(n-1)r$",
      "$a_n=a_1+nr$",
      "$a_n=a_1\\cdot r^{n-1}$",
      "$a_n=a_1+(n+1)r$",
    ],
    correctAnswer: "$a_n=a_1+(n-1)r$",
    explanation: [
      "Aceasta este formula uzuală a termenului general al unei progresii aritmetice.",
    ],
  },
  {
    id: "sr-s1-8",
    topic: "siruri",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=1$ și rația $r=11$. Calculați $a_4$.",
    correctAnswer: "34",
    explanation: [
      "Aplicăm formula termenului general: $a_n=a_1+(n-1)r$.",
      "Înlocuim $n=4$: $a_4=1+3\\cdot11=1+33$.",
      "Rezultă $a_4=34$.",
    ],
  },
  {
    id: "sr-s1-9",
    topic: "siruri",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=100$ și rația $r=-9$. Calculați $a_6$.",
    correctAnswer: "55",
    explanation: [
      "Aplicăm formula termenului general: $a_n=a_1+(n-1)r$.",
      "Înlocuim $n=6$: $a_6=100+5\\cdot(-9)=100-45$.",
      "Rezultă $a_6=55$.",
    ],
  },
  {
    id: "sr-s1-10",
    topic: "siruri",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=5$ și rația $r=4$. Valoarea lui $a_8$ este:",
    options: ["$33$", "$32$", "$34$", "$29$"],
    correctAnswer: "$33$",
    explanation: [
      "$a_8=a_1+7r=5+7\\cdot4=5+28=33$.",
    ],
  },
];
```

- [ ] **Step 2: Run the two encoding-safety checks.**

```bash
git diff --stat
node -e "const c=require('fs').readFileSync('src/data/questions/siruriSets.ts','utf8'); console.log('A-tilde:',c.includes(String.fromCharCode(196)),'E-grave-marker:',c.includes(String.fromCharCode(200)),'A-tilde2:',c.includes(String.fromCharCode(195)))"
```
Expect: the file is new (no deletions possible); the three markers all print `false`.

- [ ] **Step 3: Wire into `src/data/index.ts`**

Add this import line immediately after the existing `import { siruriExercises } from "./questions/siruri";` line:

```ts
import { siruriSetExercises } from "./questions/siruriSets";
```

Add this spread line immediately after the existing `...siruriExercises,` line inside `ALL_EXERCISES`:

```ts
  ...siruriSetExercises,
```

- [ ] **Step 4: Run data integrity test** — expect PASS.

```bash
npm test
```

- [ ] **Step 5: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises — use `node -e "..."` with `fs.readFileSync` to print `JSON.stringify` of substrings around `\\cdot`, confirming each is a literal double backslash followed by the command name in the source text.

- [ ] **Step 6: Verify no stray BOM.**

```bash
head -c 20 src/data/questions/siruriSets.ts | xxd
```
Expect first bytes NOT `ef bb bf`.

- [ ] **Step 7: Run the full test suite.**

```bash
npm test
```
Expect all test files pass (~40 tests).

- [ ] **Step 8: Commit**

```bash
git add src/data/questions/siruriSets.ts src/data/index.ts
git commit -m "Add practice Set 1 (Termenul general al progresiei aritmetice) for Șiruri"
```

---

### Task 2: Set 2 (Suma primilor n termeni — progresie aritmetică)

**Files:**
- Modify: `src/data/questions/siruriSets.ts`

**Interfaces:**
- Consumes: the file from Task 1.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 2's 10 exercises**

```ts
  // Set 2 — Suma primilor n termeni ai unei progresii aritmetice
  {
    id: "sr-s2-1",
    topic: "siruri",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=4$ și rația $r=3$. Calculați suma primilor $6$ termeni, $S_6$.",
    correctAnswer: "69",
    explanation: [
      "Determinăm $a_6=a_1+5r=4+15=19$.",
      "Aplicăm formula sumei: $S_6=\\dfrac{(a_1+a_6)\\cdot6}{2}=\\dfrac{(4+19)\\cdot6}{2}$.",
      "Calculăm: $S_6=\\dfrac{138}{2}=69$.",
    ],
  },
  {
    id: "sr-s2-2",
    topic: "siruri",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=10$ și rația $r=-2$. Calculați suma primilor $5$ termeni, $S_5$.",
    correctAnswer: "30",
    explanation: [
      "Determinăm $a_5=a_1+4r=10-8=2$.",
      "Aplicăm formula sumei: $S_5=\\dfrac{(a_1+a_5)\\cdot5}{2}=\\dfrac{(10+2)\\cdot5}{2}$.",
      "Calculăm: $S_5=\\dfrac{60}{2}=30$.",
    ],
  },
  {
    id: "sr-s2-3",
    topic: "siruri",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=1$ și rația $r=4$. Calculați suma primilor $7$ termeni, $S_7$.",
    correctAnswer: "91",
    explanation: [
      "Determinăm $a_7=a_1+6r=1+24=25$.",
      "Aplicăm formula sumei: $S_7=\\dfrac{(a_1+a_7)\\cdot7}{2}=\\dfrac{(1+25)\\cdot7}{2}$.",
      "Calculăm: $S_7=\\dfrac{182}{2}=91$.",
    ],
  },
  {
    id: "sr-s2-4",
    topic: "siruri",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=3$ și rația $r=5$. Calculați suma primilor $9$ termeni, $S_9$.",
    correctAnswer: "207",
    explanation: [
      "Determinăm $a_9=a_1+8r=3+40=43$.",
      "Aplicăm formula sumei: $S_9=\\dfrac{(a_1+a_9)\\cdot9}{2}=\\dfrac{(3+43)\\cdot9}{2}$.",
      "Calculăm: $S_9=\\dfrac{414}{2}=207$.",
    ],
  },
  {
    id: "sr-s2-5",
    topic: "siruri",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=6$ și rația $r=2$. Suma primilor $4$ termeni, $S_4$, este:",
    options: ["$36$", "$32$", "$40$", "$30$"],
    correctAnswer: "$36$",
    explanation: [
      "$a_4=a_1+3r=6+6=12$.",
      "$S_4=\\dfrac{(a_1+a_4)\\cdot4}{2}=\\dfrac{(6+12)\\cdot4}{2}=36$.",
    ],
  },
  {
    id: "sr-s2-6",
    topic: "siruri",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=0$ și rația $r=6$. Calculați suma primilor $10$ termeni, $S_{10}$.",
    correctAnswer: "270",
    explanation: [
      "Determinăm $a_{10}=a_1+9r=0+54=54$.",
      "Aplicăm formula sumei: $S_{10}=\\dfrac{(a_1+a_{10})\\cdot10}{2}=\\dfrac{(0+54)\\cdot10}{2}$.",
      "Calculăm: $S_{10}=\\dfrac{540}{2}=270$.",
    ],
  },
  {
    id: "sr-s2-7",
    topic: "siruri",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=-3$ și rația $r=4$. Calculați suma primilor $8$ termeni, $S_8$.",
    correctAnswer: "88",
    explanation: [
      "Determinăm $a_8=a_1+7r=-3+28=25$.",
      "Aplicăm formula sumei: $S_8=\\dfrac{(a_1+a_8)\\cdot8}{2}=\\dfrac{(-3+25)\\cdot8}{2}$.",
      "Calculăm: $S_8=\\dfrac{176}{2}=88$.",
    ],
  },
  {
    id: "sr-s2-8",
    topic: "siruri",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Formula sumei primilor $n$ termeni ai unei progresii aritmetice este:",
    options: [
      "$S_n=\\dfrac{(a_1+a_n)\\cdot n}{2}$",
      "$S_n=a_1\\cdot n$",
      "$S_n=\\dfrac{a_1\\cdot a_n}{2}$",
      "$S_n=a_1+(n-1)r$",
    ],
    correctAnswer: "$S_n=\\dfrac{(a_1+a_n)\\cdot n}{2}$",
    explanation: [
      "Aceasta este formula uzuală a sumei primilor $n$ termeni ai unei progresii aritmetice.",
    ],
  },
  {
    id: "sr-s2-9",
    topic: "siruri",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=5$ și rația $r=-1$. Calculați suma primilor $12$ termeni, $S_{12}$.",
    correctAnswer: "-6",
    explanation: [
      "Determinăm $a_{12}=a_1+11r=5-11=-6$.",
      "Aplicăm formula sumei: $S_{12}=\\dfrac{(a_1+a_{12})\\cdot12}{2}=\\dfrac{(5-6)\\cdot12}{2}$.",
      "Calculăm: $S_{12}=\\dfrac{-12}{2}=-6$.",
    ],
  },
  {
    id: "sr-s2-10",
    topic: "siruri",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=2$ și rația $r=7$. Calculați suma primilor $5$ termeni, $S_5$.",
    correctAnswer: "80",
    explanation: [
      "Determinăm $a_5=a_1+4r=2+28=30$.",
      "Aplicăm formula sumei: $S_5=\\dfrac{(a_1+a_5)\\cdot5}{2}=\\dfrac{(2+30)\\cdot5}{2}$.",
      "Calculăm: $S_5=\\dfrac{160}{2}=80$.",
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
git add src/data/questions/siruriSets.ts
git commit -m "Add practice Set 2 (Suma primilor n termeni) for Șiruri"
```

---

### Task 3: Set 3 (Condiția ca trei numere să fie în progresie aritmetică / determinarea rației)

**Files:**
- Modify: `src/data/questions/siruriSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–2.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 3's 10 exercises**

```ts
  // Set 3 — Condiția ca trei numere să fie în progresie aritmetică / determinarea rației
  {
    id: "sr-s3-1",
    topic: "siruri",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=10$ și $a_4=22$. Determinați rația $r$.",
    correctAnswer: "4",
    explanation: [
      "Aplicăm $a_4=a_1+3r$: $22=10+3r$.",
      "Rezultă $3r=12$, deci $r=4$.",
    ],
  },
  {
    id: "sr-s3-2",
    topic: "siruri",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=-6$ și $a_6=19$. Determinați rația $r$.",
    correctAnswer: "5",
    explanation: [
      "Aplicăm $a_6=a_1+5r$: $19=-6+5r$.",
      "Rezultă $5r=25$, deci $r=5$.",
    ],
  },
  {
    id: "sr-s3-3",
    topic: "siruri",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Numerele $5, x, 13$ sunt în progresie aritmetică dacă $x$ este egal cu:",
    options: ["$9$", "$8$", "$10$", "$18$"],
    correctAnswer: "$9$",
    explanation: [
      "Condiția de progresie aritmetică este $2x=5+13$.",
      "Rezultă $2x=18$, deci $x=9$.",
    ],
  },
  {
    id: "sr-s3-4",
    topic: "siruri",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Numerele $3, x, 15$ sunt în progresie aritmetică. Determinați $x$.",
    correctAnswer: "9",
    explanation: [
      "Condiția de progresie aritmetică este $2x=3+15$.",
      "Rezultă $2x=18$, deci $x=9$.",
    ],
  },
  {
    id: "sr-s3-5",
    topic: "siruri",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=8$ și $a_7=44$. Determinați rația $r$.",
    correctAnswer: "6",
    explanation: [
      "Aplicăm $a_7=a_1+6r$: $44=8+6r$.",
      "Rezultă $6r=36$, deci $r=6$.",
    ],
  },
  {
    id: "sr-s3-6",
    topic: "siruri",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Numerele $a,b,c$ sunt în progresie aritmetică dacă și numai dacă:",
    options: [
      "$2b=a+c$",
      "$b^2=a\\cdot c$",
      "$b=a+c$",
      "$2a=b+c$",
    ],
    correctAnswer: "$2b=a+c$",
    explanation: [
      "Această condiție exprimă faptul că $b$ este media aritmetică a lui $a$ și $c$.",
    ],
  },
  {
    id: "sr-s3-7",
    topic: "siruri",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Numerele $20, x, 4$ sunt în progresie aritmetică. Determinați $x$.",
    correctAnswer: "12",
    explanation: [
      "Condiția de progresie aritmetică este $2x=20+4$.",
      "Rezultă $2x=24$, deci $x=12$.",
    ],
  },
  {
    id: "sr-s3-8",
    topic: "siruri",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=15$ și $a_4=3$. Determinați rația $r$.",
    correctAnswer: "-4",
    explanation: [
      "Aplicăm $a_4=a_1+3r$: $3=15+3r$.",
      "Rezultă $3r=-12$, deci $r=-4$.",
    ],
  },
  {
    id: "sr-s3-9",
    topic: "siruri",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Numerele $x, 18, 26$ sunt în progresie aritmetică. Determinați $x$.",
    correctAnswer: "10",
    explanation: [
      "Condiția de progresie aritmetică este $2\\cdot18=x+26$.",
      "Rezultă $36=x+26$, deci $x=10$.",
    ],
  },
  {
    id: "sr-s3-10",
    topic: "siruri",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=-2$ și $a_5=26$. Determinați rația $r$.",
    correctAnswer: "7",
    explanation: [
      "Aplicăm $a_5=a_1+4r$: $26=-2+4r$.",
      "Rezultă $4r=28$, deci $r=7$.",
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
git add src/data/questions/siruriSets.ts
git commit -m "Add practice Set 3 (Condiția AP / determinarea rației) for Șiruri"
```

---

### Task 4: Set 4 (Termenul general al progresiei geometrice)

**Files:**
- Modify: `src/data/questions/siruriSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–3.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 4's 10 exercises**

```ts
  // Set 4 — Termenul general al progresiei geometrice
  {
    id: "sr-s4-1",
    topic: "siruri",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=3$ și rația $q=2$. Calculați $b_5$.",
    correctAnswer: "48",
    explanation: [
      "Aplicăm formula termenului general: $b_n=b_1\\cdot q^{n-1}$.",
      "Înlocuim $n=5$: $b_5=3\\cdot2^4=3\\cdot16$.",
      "Rezultă $b_5=48$.",
    ],
  },
  {
    id: "sr-s4-2",
    topic: "siruri",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=5$ și rația $q=2$. Calculați $b_4$.",
    correctAnswer: "40",
    explanation: [
      "Aplicăm formula termenului general: $b_n=b_1\\cdot q^{n-1}$.",
      "Înlocuim $n=4$: $b_4=5\\cdot2^3=5\\cdot8$.",
      "Rezultă $b_4=40$.",
    ],
  },
  {
    id: "sr-s4-3",
    topic: "siruri",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=1$ și rația $q=4$. Calculați $b_4$.",
    correctAnswer: "64",
    explanation: [
      "Aplicăm formula termenului general: $b_n=b_1\\cdot q^{n-1}$.",
      "Înlocuim $n=4$: $b_4=1\\cdot4^3$.",
      "Rezultă $b_4=64$.",
    ],
  },
  {
    id: "sr-s4-4",
    topic: "siruri",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=2$ și rația $q=5$. Calculați $b_3$.",
    correctAnswer: "50",
    explanation: [
      "Aplicăm formula termenului general: $b_n=b_1\\cdot q^{n-1}$.",
      "Înlocuim $n=3$: $b_3=2\\cdot5^2=2\\cdot25$.",
      "Rezultă $b_3=50$.",
    ],
  },
  {
    id: "sr-s4-5",
    topic: "siruri",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=4$ și rația $q=3$. Valoarea lui $b_4$ este:",
    options: ["$108$", "$96$", "$100$", "$120$"],
    correctAnswer: "$108$",
    explanation: [
      "$b_4=b_1\\cdot q^3=4\\cdot27=108$.",
    ],
  },
  {
    id: "sr-s4-6",
    topic: "siruri",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=10$ și rația $q=-2$. Calculați $b_4$.",
    correctAnswer: "-80",
    explanation: [
      "Aplicăm formula termenului general: $b_n=b_1\\cdot q^{n-1}$.",
      "Înlocuim $n=4$: $b_4=10\\cdot(-2)^3=10\\cdot(-8)$.",
      "Rezultă $b_4=-80$.",
    ],
  },
  {
    id: "sr-s4-7",
    topic: "siruri",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Formula termenului general al unei progresii geometrice cu primul termen $b_1$ și rația $q$ este:",
    options: [
      "$b_n=b_1\\cdot q^{n-1}$",
      "$b_n=b_1+(n-1)q$",
      "$b_n=b_1\\cdot q^n$",
      "$b_n=b_1^{n-1}\\cdot q$",
    ],
    correctAnswer: "$b_n=b_1\\cdot q^{n-1}$",
    explanation: [
      "Aceasta este formula uzuală a termenului general al unei progresii geometrice.",
    ],
  },
  {
    id: "sr-s4-8",
    topic: "siruri",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=6$ și rația $q=-1$. Calculați $b_5$.",
    correctAnswer: "6",
    explanation: [
      "Aplicăm formula termenului general: $b_n=b_1\\cdot q^{n-1}$.",
      "Înlocuim $n=5$: $b_5=6\\cdot(-1)^4=6\\cdot1$.",
      "Rezultă $b_5=6$.",
    ],
  },
  {
    id: "sr-s4-9",
    topic: "siruri",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=1$ și rația $q=10$. Calculați $b_3$.",
    correctAnswer: "100",
    explanation: [
      "Aplicăm formula termenului general: $b_n=b_1\\cdot q^{n-1}$.",
      "Înlocuim $n=3$: $b_3=1\\cdot10^2$.",
      "Rezultă $b_3=100$.",
    ],
  },
  {
    id: "sr-s4-10",
    topic: "siruri",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=7$ și rația $q=2$. Calculați $b_3$.",
    correctAnswer: "28",
    explanation: [
      "Aplicăm formula termenului general: $b_n=b_1\\cdot q^{n-1}$.",
      "Înlocuim $n=3$: $b_3=7\\cdot2^2=7\\cdot4$.",
      "Rezultă $b_3=28$.",
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
git add src/data/questions/siruriSets.ts
git commit -m "Add practice Set 4 (Termenul general al progresiei geometrice) for Șiruri"
```

---

### Task 5: Set 5 (Suma primilor n termeni — progresie geometrică)

**Files:**
- Modify: `src/data/questions/siruriSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–4.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 5's 10 exercises**

```ts
  // Set 5 — Suma primilor n termeni ai unei progresii geometrice
  {
    id: "sr-s5-1",
    topic: "siruri",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=2$ și rația $q=3$. Calculați suma primilor $4$ termeni, $S_4$.",
    correctAnswer: "80",
    explanation: [
      "Aplicăm formula: $S_4=b_1\\cdot\\dfrac{q^4-1}{q-1}=2\\cdot\\dfrac{81-1}{2}$.",
      "Calculăm: $S_4=2\\cdot40=80$.",
    ],
  },
  {
    id: "sr-s5-2",
    topic: "siruri",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=1$ și rația $q=2$. Calculați suma primilor $5$ termeni, $S_5$.",
    correctAnswer: "31",
    explanation: [
      "Aplicăm formula: $S_5=b_1\\cdot\\dfrac{q^5-1}{q-1}=1\\cdot\\dfrac{32-1}{1}$.",
      "Calculăm: $S_5=31$.",
    ],
  },
  {
    id: "sr-s5-3",
    topic: "siruri",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=3$ și rația $q=2$. Calculați suma primilor $4$ termeni, $S_4$.",
    correctAnswer: "45",
    explanation: [
      "Aplicăm formula: $S_4=b_1\\cdot\\dfrac{q^4-1}{q-1}=3\\cdot\\dfrac{16-1}{1}$.",
      "Calculăm: $S_4=3\\cdot15=45$.",
    ],
  },
  {
    id: "sr-s5-4",
    topic: "siruri",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=5$ și rația $q=1$. Calculați suma primilor $6$ termeni, $S_6$.",
    correctAnswer: "30",
    explanation: [
      "Pentru $q=1$, toți termenii sunt egali cu $b_1$, deci $S_n=n\\cdot b_1$.",
      "Calculăm: $S_6=6\\cdot5=30$.",
    ],
  },
  {
    id: "sr-s5-5",
    topic: "siruri",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=2$ și rația $q=2$. Suma primilor $5$ termeni, $S_5$, este:",
    options: ["$62$", "$60$", "$64$", "$58$"],
    correctAnswer: "$62$",
    explanation: [
      "$S_5=b_1\\cdot\\dfrac{q^5-1}{q-1}=2\\cdot\\dfrac{32-1}{1}=2\\cdot31=62$.",
    ],
  },
  {
    id: "sr-s5-6",
    topic: "siruri",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=4$ și rația $q=3$. Calculați suma primilor $3$ termeni, $S_3$.",
    correctAnswer: "52",
    explanation: [
      "Aplicăm formula: $S_3=b_1\\cdot\\dfrac{q^3-1}{q-1}=4\\cdot\\dfrac{27-1}{2}$.",
      "Calculăm: $S_3=4\\cdot13=52$.",
    ],
  },
  {
    id: "sr-s5-7",
    topic: "siruri",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=1$ și rația $q=5$. Calculați suma primilor $4$ termeni, $S_4$.",
    correctAnswer: "156",
    explanation: [
      "Aplicăm formula: $S_4=b_1\\cdot\\dfrac{q^4-1}{q-1}=1\\cdot\\dfrac{625-1}{4}$.",
      "Calculăm: $S_4=\\dfrac{624}{4}=156$.",
    ],
  },
  {
    id: "sr-s5-8",
    topic: "siruri",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Dacă $q=1$, suma primilor $n$ termeni ai unei progresii geometrice este:",
    options: [
      "$S_n=n\\cdot b_1$",
      "$S_n=b_1\\cdot\\dfrac{q^n-1}{q-1}$",
      "$S_n=n\\cdot q$",
      "$S_n=b_1^n$",
    ],
    correctAnswer: "$S_n=n\\cdot b_1$",
    explanation: [
      "Pentru $q=1$, toți termenii sunt egali cu $b_1$, deci suma este $S_n=n\\cdot b_1$.",
    ],
  },
  {
    id: "sr-s5-9",
    topic: "siruri",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=2$ și rația $q=4$. Calculați suma primilor $3$ termeni, $S_3$.",
    correctAnswer: "42",
    explanation: [
      "Aplicăm formula: $S_3=b_1\\cdot\\dfrac{q^3-1}{q-1}=2\\cdot\\dfrac{64-1}{3}$.",
      "Calculăm: $S_3=2\\cdot21=42$.",
    ],
  },
  {
    id: "sr-s5-10",
    topic: "siruri",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=10$ și rația $q=1$. Calculați suma primilor $7$ termeni, $S_7$.",
    correctAnswer: "70",
    explanation: [
      "Pentru $q=1$, toți termenii sunt egali cu $b_1$, deci $S_n=n\\cdot b_1$.",
      "Calculăm: $S_7=7\\cdot10=70$.",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises (check `\dfrac` carefully, and the `q=1` special case).
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Run the full test suite.**
- [ ] **Step 7: Commit**

```bash
git add src/data/questions/siruriSets.ts
git commit -m "Add practice Set 5 (Suma primilor n termeni GP) for Șiruri"
```

---

### Task 6: Set 6 (Condiția ca trei numere să fie în progresie geometrică / determinarea rației)

**Files:**
- Modify: `src/data/questions/siruriSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–5.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 6's 10 exercises**

```ts
  // Set 6 — Condiția ca trei numere să fie în progresie geometrică / determinarea rației
  {
    id: "sr-s6-1",
    topic: "siruri",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Numerele $9, x, 16$ sunt în progresie geometrică dacă $x$ este egal cu:",
    options: ["$12$ sau $-12$", "$12$", "$144$", "$25$"],
    correctAnswer: "$12$ sau $-12$",
    explanation: [
      "Condiția de progresie geometrică este $x^2=9\\cdot16=144$.",
      "Rezultă $x=12$ sau $x=-12$.",
    ],
  },
  {
    id: "sr-s6-2",
    topic: "siruri",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=3$ și $b_4=24$. Determinați rația pozitivă $q$.",
    correctAnswer: "2",
    explanation: [
      "Aplicăm $b_4=b_1\\cdot q^3$: $24=3\\cdot q^3$.",
      "Rezultă $q^3=8$, deci $q=2$.",
    ],
  },
  {
    id: "sr-s6-3",
    topic: "siruri",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=5$ și $b_4=135$. Determinați rația pozitivă $q$.",
    correctAnswer: "3",
    explanation: [
      "Aplicăm $b_4=b_1\\cdot q^3$: $135=5\\cdot q^3$.",
      "Rezultă $q^3=27$, deci $q=3$.",
    ],
  },
  {
    id: "sr-s6-4",
    topic: "siruri",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Numerele nenule $a,b,c$ sunt în progresie geometrică dacă și numai dacă:",
    options: [
      "$b^2=a\\cdot c$",
      "$2b=a+c$",
      "$b=a\\cdot c$",
      "$b^2=a+c$",
    ],
    correctAnswer: "$b^2=a\\cdot c$",
    explanation: [
      "Această condiție exprimă faptul că $b$ este media geometrică a lui $a$ și $c$.",
    ],
  },
  {
    id: "sr-s6-5",
    topic: "siruri",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Numerele pozitive $4, x, 25$ sunt în progresie geometrică. Determinați $x$.",
    correctAnswer: "10",
    explanation: [
      "Condiția de progresie geometrică este $x^2=4\\cdot25=100$.",
      "Cum $x$ este pozitiv, rezultă $x=10$.",
    ],
  },
  {
    id: "sr-s6-6",
    topic: "siruri",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu termeni pozitivi, $b_1=2$ și $b_3=50$. Determinați rația $q$.",
    correctAnswer: "5",
    explanation: [
      "Aplicăm $b_3=b_1\\cdot q^2$: $50=2\\cdot q^2$.",
      "Rezultă $q^2=25$, deci $q=5$ (rație pozitivă).",
    ],
  },
  {
    id: "sr-s6-7",
    topic: "siruri",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Numerele pozitive $9, x, 49$ sunt în progresie geometrică. Determinați $x$.",
    correctAnswer: "21",
    explanation: [
      "Condiția de progresie geometrică este $x^2=9\\cdot49=441$.",
      "Cum $x$ este pozitiv, rezultă $x=21$.",
    ],
  },
  {
    id: "sr-s6-8",
    topic: "siruri",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Numerele $1, x, 49$ sunt în progresie geometrică dacă $x$ este egal cu:",
    options: ["$7$ sau $-7$", "$7$", "$49$", "$24$"],
    correctAnswer: "$7$ sau $-7$",
    explanation: [
      "Condiția de progresie geometrică este $x^2=1\\cdot49=49$.",
      "Rezultă $x=7$ sau $x=-7$.",
    ],
  },
  {
    id: "sr-s6-9",
    topic: "siruri",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Numerele pozitive $5, x, 45$ sunt în progresie geometrică. Determinați $x$.",
    correctAnswer: "15",
    explanation: [
      "Condiția de progresie geometrică este $x^2=5\\cdot45=225$.",
      "Cum $x$ este pozitiv, rezultă $x=15$.",
    ],
  },
  {
    id: "sr-s6-10",
    topic: "siruri",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu termeni pozitivi, $b_1=2$ și $b_3=72$. Determinați rația $q$.",
    correctAnswer: "6",
    explanation: [
      "Aplicăm $b_3=b_1\\cdot q^2$: $72=2\\cdot q^2$.",
      "Rezultă $q^2=36$, deci $q=6$ (rație pozitivă).",
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
git add src/data/questions/siruriSets.ts
git commit -m "Add practice Set 6 (Condiția GP / determinarea rației) for Șiruri"
```

---

### Task 7: Set 7 (Determinarea lui a1 și r din condiții date)

**Files:**
- Modify: `src/data/questions/siruriSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–6.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 7's 10 exercises**

```ts
  // Set 7 — Determinarea lui a1 și r din condiții date
  {
    id: "sr-s7-1",
    topic: "siruri",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică $(a_n)$ cu $a_3=11$ și $a_7=23$. Determinați rația $r$.",
    correctAnswer: "3",
    explanation: [
      "Scădem: $a_7-a_3=4r$, adică $23-11=4r$.",
      "Rezultă $4r=12$, deci $r=3$.",
    ],
  },
  {
    id: "sr-s7-2",
    topic: "siruri",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică $(a_n)$ cu $a_2=12$ și $a_6=32$. Determinați primul termen $a_1$.",
    correctAnswer: "7",
    explanation: [
      "Scădem: $a_6-a_2=4r$, adică $32-12=4r$, deci $r=5$.",
      "Din $a_2=a_1+r$: $12=a_1+5$, deci $a_1=7$.",
    ],
  },
  {
    id: "sr-s7-3",
    topic: "siruri",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică $(a_n)$ cu $a_4=18$ și $a_9=38$. Determinați rația $r$.",
    correctAnswer: "4",
    explanation: [
      "Scădem: $a_9-a_4=5r$, adică $38-18=5r$.",
      "Rezultă $5r=20$, deci $r=4$.",
    ],
  },
  {
    id: "sr-s7-4",
    topic: "siruri",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică $(a_n)$ cu $a_3=5$ și $a_8=30$. Determinați primul termen $a_1$.",
    correctAnswer: "-5",
    explanation: [
      "Scădem: $a_8-a_3=5r$, adică $30-5=5r$, deci $r=5$.",
      "Din $a_3=a_1+2r$: $5=a_1+10$, deci $a_1=-5$.",
    ],
  },
  {
    id: "sr-s7-5",
    topic: "siruri",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Fie progresia aritmetică $(a_n)$ cu $a_2=9$ și $a_5=24$. Rația $r$ este:",
    options: ["$5$", "$4$", "$6$", "$3$"],
    correctAnswer: "$5$",
    explanation: [
      "$a_5-a_2=3r$, adică $24-9=3r=15$, deci $r=5$.",
    ],
  },
  {
    id: "sr-s7-6",
    topic: "siruri",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică $(a_n)$ cu $a_2=14$ și $a_7=39$. Determinați primul termen $a_1$.",
    correctAnswer: "9",
    explanation: [
      "Scădem: $a_7-a_2=5r$, adică $39-14=5r$, deci $r=5$.",
      "Din $a_2=a_1+r$: $14=a_1+5$, deci $a_1=9$.",
    ],
  },
  {
    id: "sr-s7-7",
    topic: "siruri",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică $(a_n)$ cu $a_5=27$ și $a_{10}=57$. Determinați rația $r$.",
    correctAnswer: "6",
    explanation: [
      "Scădem: $a_{10}-a_5=5r$, adică $57-27=5r$.",
      "Rezultă $5r=30$, deci $r=6$.",
    ],
  },
  {
    id: "sr-s7-8",
    topic: "siruri",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică $(a_n)$ cu $a_4=20$ și $a_6=30$. Determinați suma $a_1+r$.",
    correctAnswer: "10",
    explanation: [
      "Scădem: $a_6-a_4=2r$, adică $30-20=2r$, deci $r=5$.",
      "Din $a_4=a_1+3r$: $20=a_1+15$, deci $a_1=5$.",
      "Suma este $a_1+r=5+5=10$.",
    ],
  },
  {
    id: "sr-s7-9",
    topic: "siruri",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Fie progresia aritmetică $(a_n)$ cu $a_3=9$ și $a_6=21$. Rația $r$ este:",
    options: ["$4$", "$3$", "$6$", "$12$"],
    correctAnswer: "$4$",
    explanation: [
      "$a_6-a_3=3r$, adică $21-9=3r=12$, deci $r=4$.",
    ],
  },
  {
    id: "sr-s7-10",
    topic: "siruri",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică $(a_n)$ cu $a_2=5$ și $a_9=40$. Determinați primul termen $a_1$.",
    correctAnswer: "0",
    explanation: [
      "Scădem: $a_9-a_2=7r$, adică $40-5=7r$, deci $r=5$.",
      "Din $a_2=a_1+r$: $5=a_1+5$, deci $a_1=0$.",
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
git add src/data/questions/siruriSets.ts
git commit -m "Add practice Set 7 (Determinarea lui a1 si r) for Șiruri"
```

---

### Task 8: Set 8 (Determinarea lui b1 și q din condiții date)

**Files:**
- Modify: `src/data/questions/siruriSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–7.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 8's 10 exercises**

```ts
  // Set 8 — Determinarea lui b1 și q din condiții date
  {
    id: "sr-s8-1",
    topic: "siruri",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică $(b_n)$ cu $b_2=6$ și $b_5=48$. Determinați rația pozitivă $q$.",
    correctAnswer: "2",
    explanation: [
      "Împărțim: $\\dfrac{b_5}{b_2}=q^3$, adică $\\dfrac{48}{6}=q^3$.",
      "Rezultă $q^3=8$, deci $q=2$.",
    ],
  },
  {
    id: "sr-s8-2",
    topic: "siruri",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică $(b_n)$ cu $b_1=5$ și $b_4=135$. Determinați rația pozitivă $q$.",
    correctAnswer: "3",
    explanation: [
      "Împărțim: $\\dfrac{b_4}{b_1}=q^3$, adică $\\dfrac{135}{5}=q^3$.",
      "Rezultă $q^3=27$, deci $q=3$.",
    ],
  },
  {
    id: "sr-s8-3",
    topic: "siruri",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică $(b_n)$ cu $b_2=4$ și $b_4=64$. Determinați rația pozitivă $q$.",
    correctAnswer: "4",
    explanation: [
      "Împărțim: $\\dfrac{b_4}{b_2}=q^2$, adică $\\dfrac{64}{4}=q^2$.",
      "Rezultă $q^2=16$, deci $q=4$.",
    ],
  },
  {
    id: "sr-s8-4",
    topic: "siruri",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică $(b_n)$ cu $b_1=2$ și $b_3=50$. Determinați rația pozitivă $q$.",
    correctAnswer: "5",
    explanation: [
      "Împărțim: $\\dfrac{b_3}{b_1}=q^2$, adică $\\dfrac{50}{2}=q^2$.",
      "Rezultă $q^2=25$, deci $q=5$.",
    ],
  },
  {
    id: "sr-s8-5",
    topic: "siruri",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Fie progresia geometrică $(b_n)$ cu $b_1=3$ și $b_3=48$. Rația pozitivă $q$ este:",
    options: ["$4$", "$2$", "$8$", "$16$"],
    correctAnswer: "$4$",
    explanation: [
      "$\\dfrac{b_3}{b_1}=q^2$, adică $\\dfrac{48}{3}=16=q^2$, deci $q=4$.",
    ],
  },
  {
    id: "sr-s8-6",
    topic: "siruri",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică $(b_n)$ cu $b_2=10$ și $b_5=2160$. Determinați rația pozitivă $q$.",
    correctAnswer: "6",
    explanation: [
      "Împărțim: $\\dfrac{b_5}{b_2}=q^3$, adică $\\dfrac{2160}{10}=q^3$.",
      "Rezultă $q^3=216$, deci $q=6$.",
    ],
  },
  {
    id: "sr-s8-7",
    topic: "siruri",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică $(b_n)$ cu $b_1=4$ și $b_4=4000$. Determinați rația pozitivă $q$.",
    correctAnswer: "10",
    explanation: [
      "Împărțim: $\\dfrac{b_4}{b_1}=q^3$, adică $\\dfrac{4000}{4}=q^3$.",
      "Rezultă $q^3=1000$, deci $q=10$.",
    ],
  },
  {
    id: "sr-s8-8",
    topic: "siruri",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică $(b_n)$ cu $b_1=1$ și $b_3=49$. Determinați rația pozitivă $q$.",
    correctAnswer: "7",
    explanation: [
      "Împărțim: $\\dfrac{b_3}{b_1}=q^2$, adică $\\dfrac{49}{1}=q^2$.",
      "Rezultă $q^2=49$, deci $q=7$.",
    ],
  },
  {
    id: "sr-s8-9",
    topic: "siruri",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Fie progresia geometrică $(b_n)$ cu $b_2=8$ și $b_4=72$. Rația pozitivă $q$ este:",
    options: ["$3$", "$9$", "$6$", "$4{,}5$"],
    correctAnswer: "$3$",
    explanation: [
      "$\\dfrac{b_4}{b_2}=q^2$, adică $\\dfrac{72}{8}=9=q^2$, deci $q=3$.",
    ],
  },
  {
    id: "sr-s8-10",
    topic: "siruri",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică $(b_n)$ cu $b_1=2$ și $b_5=8192$. Determinați rația pozitivă $q$.",
    correctAnswer: "8",
    explanation: [
      "Împărțim: $\\dfrac{b_5}{b_1}=q^4$, adică $\\dfrac{8192}{2}=q^4$.",
      "Rezultă $q^4=4096$, deci $q=8$.",
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
git add src/data/questions/siruriSets.ts
git commit -m "Add practice Set 8 (Determinarea lui b1 si q) for Șiruri"
```

---

### Task 9: Set 9 (Comparații și aplicații mixte AP vs GP)

**Files:**
- Modify: `src/data/questions/siruriSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–8.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 9's 10 exercises**

```ts
  // Set 9 — Comparații și aplicații mixte AP vs GP
  {
    id: "sr-s9-1",
    topic: "siruri",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Șirul $3,7,11,15,\\ldots$ este:",
    options: [
      "progresie aritmetică cu rația $4$",
      "progresie geometrică cu rația $4$",
      "progresie aritmetică cu rația $3$",
      "niciuna dintre variante",
    ],
    correctAnswer: "progresie aritmetică cu rația $4$",
    explanation: [
      "Diferența dintre termeni consecutivi este constantă: $7-3=4$, $11-7=4$, $15-11=4$.",
      "Deci șirul este progresie aritmetică cu rația $r=4$.",
    ],
  },
  {
    id: "sr-s9-2",
    topic: "siruri",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Șirul $2,6,18,54,\\ldots$ este:",
    options: [
      "progresie geometrică cu rația $3$",
      "progresie aritmetică cu rația $4$",
      "progresie geometrică cu rația $2$",
      "niciuna dintre variante",
    ],
    correctAnswer: "progresie geometrică cu rația $3$",
    explanation: [
      "Raportul dintre termeni consecutivi este constant: $6/2=3$, $18/6=3$, $54/18=3$.",
      "Deci șirul este progresie geometrică cu rația $q=3$.",
    ],
  },
  {
    id: "sr-s9-3",
    topic: "siruri",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=4$, $r=3$ și progresia geometrică cu $b_1=1$, $q=2$. Calculați $a_6-b_6$.",
    correctAnswer: "-13",
    explanation: [
      "Calculăm $a_6=a_1+5r=4+15=19$.",
      "Calculăm $b_6=b_1\\cdot q^5=1\\cdot32=32$.",
      "Diferența este $a_6-b_6=19-32=-13$.",
    ],
  },
  {
    id: "sr-s9-4",
    topic: "siruri",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=1$, $r=2$ (deci $a_n=2n-1$) și progresia geometrică cu $b_1=1$, $q=2$ (deci $b_n=2^{n-1}$). Determinați cel mai mic $n$ pentru care $b_n>a_n$.",
    correctAnswer: "4",
    explanation: [
      "Comparăm termenii: pentru $n=1$: $a_1=1$, $b_1=1$ (egali).",
      "Pentru $n=2$: $a_2=3$, $b_2=2$ ($a_2>b_2$); pentru $n=3$: $a_3=5$, $b_3=4$ ($a_3>b_3$).",
      "Pentru $n=4$: $a_4=7$, $b_4=8$ ($b_4>a_4$) — acesta este cel mai mic astfel de $n$.",
    ],
  },
  {
    id: "sr-s9-5",
    topic: "siruri",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=5$, $r=2$ și progresia geometrică cu $b_1=2$, $q=3$. Calculați $a_4+b_4$.",
    correctAnswer: "65",
    explanation: [
      "Calculăm $a_4=a_1+3r=5+6=11$.",
      "Calculăm $b_4=b_1\\cdot q^3=2\\cdot27=54$.",
      "Suma este $a_4+b_4=11+54=65$.",
    ],
  },
  {
    id: "sr-s9-6",
    topic: "siruri",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele șiruri este progresie geometrică?",
    options: [
      "$5,10,20,40$",
      "$5,10,15,20$",
      "$5,10,16,20$",
      "$5,7,9,11$",
    ],
    correctAnswer: "$5,10,20,40$",
    explanation: [
      "Raportul dintre termeni consecutivi este constant: $10/5=2$, $20/10=2$, $40/20=2$.",
      "Celelalte șiruri au diferențe sau rapoarte neconstante, sau sunt progresii aritmetice.",
    ],
  },
  {
    id: "sr-s9-7",
    topic: "siruri",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=3$, $r=5$. Calculați produsul $a_1\\cdot a_2\\cdot a_3$.",
    correctAnswer: "312",
    explanation: [
      "Calculăm termenii: $a_1=3$, $a_2=8$, $a_3=13$.",
      "Produsul este $3\\cdot8\\cdot13=312$.",
    ],
  },
  {
    id: "sr-s9-8",
    topic: "siruri",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=1$, $q=2$. Calculați suma $b_1+b_2+b_3+b_4$.",
    correctAnswer: "15",
    explanation: [
      "Calculăm termenii: $b_1=1$, $b_2=2$, $b_3=4$, $b_4=8$.",
      "Suma este $1+2+4+8=15$.",
    ],
  },
  {
    id: "sr-s9-9",
    topic: "siruri",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Dacă $(a_n)$ este progresie aritmetică cu rația $r>0$, atunci șirul este:",
    options: ["strict crescător", "strict descrescător", "constant", "nu se poate preciza"],
    correctAnswer: "strict crescător",
    explanation: [
      "Cum $a_{n+1}-a_n=r>0$ pentru orice $n$, șirul este strict crescător.",
    ],
  },
  {
    id: "sr-s9-10",
    topic: "siruri",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=2$, $r=4$ și progresia geometrică cu $b_1=3$, $q=2$. Calculați $a_5-b_3$.",
    correctAnswer: "6",
    explanation: [
      "Calculăm $a_5=a_1+4r=2+16=18$.",
      "Calculăm $b_3=b_1\\cdot q^2=3\\cdot4=12$.",
      "Diferența este $a_5-b_3=18-12=6$.",
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
git add src/data/questions/siruriSets.ts
git commit -m "Add practice Set 9 (Comparatii AP vs GP) for Șiruri"
```

---

### Task 10: Set 10 (Recapitulare / aplicații mixte) + final verification

**Files:**
- Modify: `src/data/questions/siruriSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–9 (must have exactly 90 exercises, Sets 1–9, before this task starts).
- Produces: the completed 100-exercise file — no further tasks depend on this one.

- [ ] **Step 1: Append Set 10's 10 exercises**

```ts
  // Set 10 — Recapitulare / aplicații mixte
  {
    id: "sr-s10-1",
    topic: "siruri",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=6$ și rația $r=3$. Calculați $a_5$.",
    correctAnswer: "18",
    explanation: [
      "$a_5=a_1+4r=6+12=18$.",
    ],
  },
  {
    id: "sr-s10-2",
    topic: "siruri",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=2$ și rația $r=3$. Calculați suma primilor $6$ termeni, $S_6$.",
    correctAnswer: "57",
    explanation: [
      "$a_6=a_1+5r=2+15=17$.",
      "$S_6=\\dfrac{(a_1+a_6)\\cdot6}{2}=\\dfrac{(2+17)\\cdot6}{2}=57$.",
    ],
  },
  {
    id: "sr-s10-3",
    topic: "siruri",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Numerele $8, x, 20$ sunt în progresie aritmetică dacă $x$ este egal cu:",
    options: ["$14$", "$12$", "$16$", "$28$"],
    correctAnswer: "$14$",
    explanation: [
      "Condiția de progresie aritmetică este $2x=8+20$.",
      "Rezultă $2x=28$, deci $x=14$.",
    ],
  },
  {
    id: "sr-s10-4",
    topic: "siruri",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=3$ și rația $q=2$. Calculați $b_4$.",
    correctAnswer: "24",
    explanation: [
      "$b_4=b_1\\cdot q^3=3\\cdot8=24$.",
    ],
  },
  {
    id: "sr-s10-5",
    topic: "siruri",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=2$ și rația $q=2$. Calculați suma primilor $4$ termeni, $S_4$.",
    correctAnswer: "30",
    explanation: [
      "$S_4=b_1\\cdot\\dfrac{q^4-1}{q-1}=2\\cdot\\dfrac{16-1}{1}=2\\cdot15=30$.",
    ],
  },
  {
    id: "sr-s10-6",
    topic: "siruri",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Numerele pozitive $3, x, 27$ sunt în progresie geometrică dacă $x$ este egal cu:",
    options: ["$9$", "$15$", "$81$", "$12$"],
    correctAnswer: "$9$",
    explanation: [
      "Condiția de progresie geometrică este $x^2=3\\cdot27=81$.",
      "Cum $x$ este pozitiv, rezultă $x=9$.",
    ],
  },
  {
    id: "sr-s10-7",
    topic: "siruri",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică $(a_n)$ cu $a_2=5$ și $a_6=25$. Determinați rația $r$.",
    correctAnswer: "5",
    explanation: [
      "$a_6-a_2=4r$, adică $25-5=4r=20$, deci $r=5$.",
    ],
  },
  {
    id: "sr-s10-8",
    topic: "siruri",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică $(b_n)$ cu $b_1=4$ și $b_4=32$. Determinați rația pozitivă $q$.",
    correctAnswer: "2",
    explanation: [
      "$\\dfrac{b_4}{b_1}=q^3$, adică $\\dfrac{32}{4}=8=q^3$, deci $q=2$.",
    ],
  },
  {
    id: "sr-s10-9",
    topic: "siruri",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Șirul $10,7,4,1,\\ldots$ este:",
    options: [
      "progresie aritmetică cu rația $-3$",
      "progresie geometrică cu rația $-3$",
      "progresie aritmetică cu rația $3$",
      "niciuna dintre variante",
    ],
    correctAnswer: "progresie aritmetică cu rația $-3$",
    explanation: [
      "Diferența dintre termeni consecutivi este constantă: $7-10=-3$, $4-7=-3$, $1-4=-3$.",
      "Deci șirul este progresie aritmetică cu rația $r=-3$.",
    ],
  },
  {
    id: "sr-s10-10",
    topic: "siruri",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=1$, $r=4$ și progresia geometrică cu $b_1=1$, $q=3$. Calculați $a_4+b_4$.",
    correctAnswer: "40",
    explanation: [
      "Calculăm $a_4=a_1+3r=1+12=13$.",
      "Calculăm $b_4=b_1\\cdot q^3=1\\cdot27=27$.",
      "Suma este $a_4+b_4=13+27=40$.",
    ],
  },
];
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises.
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Verify the file has exactly 100 exercises across 10 sets**

Run: a count of `id: "sr-s` occurrences in `src/data/questions/siruriSets.ts` — expected output: `100`. Also verify each of the 10 sets has exactly 10 exercises (`id: "sr-sN-` prefix count for each N=1..10).

- [ ] **Step 7: Run typecheck and build**

Run: `npm run typecheck` — expect exit 0.
Run: `npm run build` — expect exit 0.

- [ ] **Step 8: Run the full test suite**

Run: `npm test` — expect all test files pass.

- [ ] **Step 9: Commit**

```bash
git add src/data/questions/siruriSets.ts
git commit -m "Add practice Set 10 (Recapitulare) — completes Șiruri practice bank"
```
