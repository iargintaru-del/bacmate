# Mulțimi și logică matematică practice sets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a full 10-set (100-exercise) practice bank for the `multimi-logica` topic, matching the established convention used by every other topic that has practice sets.

**Architecture:** Create `src/data/questions/multimiLogicaSets.ts` exporting `multimiLogicaSetExercises: Exercise[]`, wired into `ALL_EXERCISES` in `src/data/index.ts` (Task 1 only). Tasks 2–10 append their set to the same file.

**Tech Stack:** Vite + React + TypeScript + Vitest, existing `Exercise` data shape.

## Global Constraints

- Every exercise is worth exactly 6 points.
- Ids: `ml-s1-1`..`ml-s10-10` (set number matches the id's `sN` segment and the `set:` field), verified unique against every existing id in the codebase.
- For every `mcq` exercise, `correctAnswer` must appear character-for-character in `options`, **and all options must be genuinely distinct values/statements** (not just distinct strings) — this exact bug class has recurred across every prior round of this project; check it explicitly for every mcq in every task.
- Inline `$...$` LaTeX only (never `$$...$$`), matching `multimiLogica.ts`'s existing convention.
- Romanian typographic quotes „..." for quoted logical statements (not escaped ASCII `\"...\"`), matching `ml-4`'s existing style.
- No changes to `src/types.ts`, `TOPICS`, `TOPIC_LABELS`, `THEORY` registry, `src/data/theory/multimiLogica.ts`, or the existing 7 base exercises in `src/data/questions/multimiLogica.ts`.
- No `formulaSheet.ts` changes — practice sets don't add new formulas.
- **LaTeX escaping**: every LaTeX command in a TS string literal needs a DOUBLE backslash (`\\int`, `\\forall`, `\\exists`, `\\Rightarrow`, `\\Leftrightarrow`, `\\wedge`, `\\vee`, `\\overline`, `\\subseteq`, `\\subsetneq`, `\\emptyset`, `\\mathbb`, `\\dfrac`, `\\cdot`, `\\neq`, `\\geq`, `\\leq`, etc.) — a **Critical bug class** that already occurred once in this project (an implementer used single backslashes, silently corrupting LaTeX and, for `\text`/`\to`/`\neq`, injecting literal tab/newline control characters, invisible to the test suite because the corruption was applied identically to `correctAnswer` and its matching `options` entry). Every task below must independently verify the actual runtime string value (not just the source text) for at least 2-3 exercises before committing. Do NOT use any external script (Python, sed, etc.) to generate file content — edit directly with your file-editing tool, copying this plan's code verbatim.
- No stray UTF-8 BOM — verify with `head -c 20 <file> | xxd` after editing, confirm first bytes are NOT `ef bb bf`.

---

### Task 1: Create the file, wire into index.ts, add Set 1 (Operații cu mulțimi — reuniune, intersecție)

**Files:**
- Create: `src/data/questions/multimiLogicaSets.ts`
- Modify: `src/data/index.ts`

**Interfaces:**
- Consumes: existing `Exercise` shape from `src/types.ts`.
- Produces: `multimiLogicaSetExercises: Exercise[]`, imported and spread into `ALL_EXERCISES` by this task — all later tasks (2–10) append to this same array without touching `index.ts` again.

- [ ] **Step 1: Create the file with Set 1's 10 exercises**

Create `src/data/questions/multimiLogicaSets.ts`:

```ts
import type { Exercise } from "../../types";

export const multimiLogicaSetExercises: Exercise[] = [
  // Set 1 — Operații cu mulțimi (reuniune, intersecție)
  {
    id: "ml-s1-1",
    topic: "multimi-logica",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie $A=\\{1,2,3,4\\}$ și $B=\\{3,4,5,6\\}$. Câte elemente are mulțimea $A\\cup B$?",
    correctAnswer: "6",
    explanation: [
      "Reuniunea $A\\cup B$ conține toate elementele care apar în cel puțin una dintre mulțimi.",
      "Acestea sunt $1,2,3,4,5,6$, deci $6$ elemente.",
    ],
  },
  {
    id: "ml-s1-2",
    topic: "multimi-logica",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie $A=\\{1,3,5,7\\}$ și $B=\\{2,3,5,8\\}$. Câte elemente are mulțimea $A\\cap B$?",
    correctAnswer: "2",
    explanation: [
      "Intersecția $A\\cap B$ conține elementele comune celor două mulțimi.",
      "Acestea sunt $3$ și $5$, deci $2$ elemente.",
    ],
  },
  {
    id: "ml-s1-3",
    topic: "multimi-logica",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Fie $A=\\{a,b,c\\}$ și $B=\\{b,c,d\\}$. Mulțimea $A\\cup B$ este:",
    options: ["$\\{a,b,c,d\\}$", "$\\{b,c\\}$", "$\\{a,b,c,d,e\\}$", "$\\emptyset$"],
    correctAnswer: "$\\{a,b,c,d\\}$",
    explanation: [
      "Reuniunea conține toate elementele din $A$ și din $B$, fără repetiții.",
      "Rezultă $A\\cup B=\\{a,b,c,d\\}$.",
    ],
  },
  {
    id: "ml-s1-4",
    topic: "multimi-logica",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele afirmații este întotdeauna adevărată, pentru orice mulțimi $A$ și $B$?",
    options: [
      "$A\\cap B\\subseteq A\\cup B$",
      "$A\\cup B\\subseteq A\\cap B$",
      "$A\\cap B=A\\cup B$",
      "$A\\setminus B=B\\setminus A$",
    ],
    correctAnswer: "$A\\cap B\\subseteq A\\cup B$",
    explanation: [
      "Orice element din $A\\cap B$ aparține și lui $A$, deci aparține și lui $A\\cup B$ — relația este întotdeauna adevărată.",
      "Celelalte afirmații sunt adevărate doar în cazuri particulare (de exemplu, doar dacă $A=B$).",
    ],
  },
  {
    id: "ml-s1-5",
    topic: "multimi-logica",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie $A=\\{2,4,6,8,10\\}$ și $B=\\{1,2,3,4,5\\}$. Câte elemente are mulțimea $A\\cap B$?",
    correctAnswer: "2",
    explanation: [
      "Elementele comune sunt $2$ și $4$.",
      "Deci $A\\cap B=\\{2,4\\}$, care are $2$ elemente.",
    ],
  },
  {
    id: "ml-s1-6",
    topic: "multimi-logica",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie $A=\\{x,y,z\\}$ și $B=\\{y,z,w,v\\}$. Câte elemente are mulțimea $A\\cup B$?",
    correctAnswer: "5",
    explanation: [
      "Reuniunea conține toate elementele distincte din cele două mulțimi.",
      "Acestea sunt $x,y,z,w,v$, deci $5$ elemente.",
    ],
  },
  {
    id: "ml-s1-7",
    topic: "multimi-logica",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Dacă $A\\cap B=\\emptyset$, mulțimile $A$ și $B$ se numesc:",
    options: ["disjuncte", "egale", "incluse", "complementare"],
    correctAnswer: "disjuncte",
    explanation: [
      "Două mulțimi cu intersecția vidă (fără elemente comune) se numesc disjuncte.",
    ],
  },
  {
    id: "ml-s1-8",
    topic: "multimi-logica",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Fie $A=\\{1,2,3\\}$ și $B=\\{4,5,6\\}$. Câte elemente are mulțimea $A\\cap B$?",
    correctAnswer: "0",
    explanation: [
      "Mulțimile $A$ și $B$ nu au niciun element comun.",
      "Deci $A\\cap B=\\emptyset$, care are $0$ elemente.",
    ],
  },
  {
    id: "ml-s1-9",
    topic: "multimi-logica",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Fie $A=\\{1,2,3,4,5,6\\}$ și $B=\\{2,4,6,8,10\\}$. Mulțimea $A\\cap B$ este:",
    options: ["$\\{2,4,6\\}$", "$\\{1,3,5,8,10\\}$", "$\\{2,4,6,8,10\\}$", "$\\emptyset$"],
    correctAnswer: "$\\{2,4,6\\}$",
    explanation: [
      "Elementele comune celor două mulțimi sunt $2$, $4$ și $6$.",
      "Deci $A\\cap B=\\{2,4,6\\}$.",
    ],
  },
  {
    id: "ml-s1-10",
    topic: "multimi-logica",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Fie $A=\\{1,2,3,4\\}$, $B=\\{3,4,5,6\\}$, $C=A\\cup B$ și $D=A\\cap B$. Care dintre următoarele afirmații este adevărată?",
    options: [
      "$C$ are $6$ elemente și $D$ are $2$ elemente",
      "$C$ are $4$ elemente și $D$ are $2$ elemente",
      "$C$ are $6$ elemente și $D$ are $4$ elemente",
      "$C$ are $8$ elemente și $D$ are $0$ elemente",
    ],
    correctAnswer: "$C$ are $6$ elemente și $D$ are $2$ elemente",
    explanation: [
      "$C=A\\cup B=\\{1,2,3,4,5,6\\}$, care are $6$ elemente.",
      "$D=A\\cap B=\\{3,4\\}$, care are $2$ elemente.",
    ],
  },
];
```

- [ ] **Step 2: Wire the new file into `src/data/index.ts`**

Edit `src/data/index.ts`. Add this import at line 9, immediately after the existing `import { multimiLogicaExercises } from "./questions/multimiLogica";` (line 8):

```ts
import { multimiLogicaSetExercises } from "./questions/multimiLogicaSets";
```

Add this spread entry immediately after the existing `...multimiLogicaExercises,` line (in the `ALL_EXERCISES` array):

```ts
  ...multimiLogicaSetExercises,
```

- [ ] **Step 3: Run data integrity test to verify it passes**

Run: `npx vitest run src/data/index.test.ts`
Expected: PASS — all 10 new ids unique, 6 points each, every mcq's `correctAnswer` present in `options`.

- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level**

For at least 3 of the 10 exercises above (pick ones using different LaTeX commands, e.g. `\cup`, `\cap`, `\subseteq`), verify the actual runtime string value using a Node one-liner that reads the file and evaluates the string literal, confirming a single backslash before each LaTeX command and no tab/newline control characters. Do not write this check to a file.

- [ ] **Step 5: Verify no stray BOM**

Run: `head -c 20 src/data/questions/multimiLogicaSets.ts | xxd` — confirm the first bytes are NOT `ef bb bf`.

- [ ] **Step 6: Run the full test suite**

Run: `npm test`
Expected: all test files pass.

- [ ] **Step 7: Commit**

```bash
git add src/data/questions/multimiLogicaSets.ts src/data/index.ts
git commit -m "Add practice Set 1 (Operații cu mulțimi) for Mulțimi și logică matematică"
```

---

### Task 2: Set 2 (Diferență de mulțimi și complementară)

**Files:**
- Modify: `src/data/questions/multimiLogicaSets.ts`

**Interfaces:**
- Consumes: the file and `ALL_EXERCISES` wiring created by Task 1 (must already exist — do not recreate).
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 2's 10 exercises**

Edit `src/data/questions/multimiLogicaSets.ts`. Add a comment header and 10 new exercise objects to the end of the `multimiLogicaSetExercises` array (after `ml-s1-10`, before the closing `];`):

```ts
  // Set 2 — Diferență de mulțimi și complementară
  {
    id: "ml-s2-1",
    topic: "multimi-logica",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Fie $A=\\{1,2,3,4,5\\}$ și $B=\\{3,4,5,6,7\\}$. Câte elemente are mulțimea $A\\setminus B$?",
    correctAnswer: "2",
    explanation: [
      "$A\\setminus B$ conține elementele din $A$ care nu se regăsesc în $B$.",
      "Acestea sunt $1$ și $2$, deci $2$ elemente.",
    ],
  },
  {
    id: "ml-s2-2",
    topic: "multimi-logica",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Fie $A=\\{1,2,3,4,5\\}$ și $B=\\{3,4,5,6,7\\}$. Câte elemente are mulțimea $B\\setminus A$?",
    correctAnswer: "2",
    explanation: [
      "$B\\setminus A$ conține elementele din $B$ care nu se regăsesc în $A$.",
      "Acestea sunt $6$ și $7$, deci $2$ elemente.",
    ],
  },
  {
    id: "ml-s2-3",
    topic: "multimi-logica",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Fie $E=\\{1,2,\\ldots,10\\}$ și $A=\\{2,4,6,8,10\\}$. Complementara $C_EA$ este:",
    options: ["$\\{1,3,5,7,9\\}$", "$\\{2,4,6,8,10\\}$", "$\\{1,2,\\ldots,10\\}$", "$\\emptyset$"],
    correctAnswer: "$\\{1,3,5,7,9\\}$",
    explanation: [
      "Complementara $C_EA=E\\setminus A$ conține elementele din $E$ care nu sunt în $A$.",
      "Acestea sunt numerele impare din $E$: $1,3,5,7,9$.",
    ],
  },
  {
    id: "ml-s2-4",
    topic: "multimi-logica",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele afirmații este întotdeauna adevărată, pentru orice mulțimi $A$ și $B$?",
    options: [
      "$A\\setminus B$ și $B\\setminus A$ sunt disjuncte",
      "$A\\setminus B=B\\setminus A$",
      "$A\\setminus B=A\\cap B$",
      "$A\\setminus B=\\emptyset$",
    ],
    correctAnswer: "$A\\setminus B$ și $B\\setminus A$ sunt disjuncte",
    explanation: [
      "Un element din $A\\setminus B$ nu aparține lui $B$, deci nu poate aparține lui $B\\setminus A$ (care cere apartenența la $B$).",
      "Rezultă că cele două mulțimi nu au niciun element comun, deci sunt disjuncte — întotdeauna.",
    ],
  },
  {
    id: "ml-s2-5",
    topic: "multimi-logica",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Fie $E=\\{1,2,\\ldots,8\\}$ și $A=\\{1,3,5,7\\}$. Câte elemente are complementara $C_EA$?",
    correctAnswer: "4",
    explanation: [
      "$C_EA=E\\setminus A=\\{2,4,6,8\\}$.",
      "Aceasta are $4$ elemente.",
    ],
  },
  {
    id: "ml-s2-6",
    topic: "multimi-logica",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Fie $A=\\{a,b,c,d\\}$ și $B=\\{c,d,e,f\\}$. Câte elemente are mulțimea $A\\setminus B$?",
    correctAnswer: "2",
    explanation: [
      "$A\\setminus B$ conține elementele din $A$ care nu se regăsesc în $B$.",
      "Acestea sunt $a$ și $b$, deci $2$ elemente.",
    ],
  },
  {
    id: "ml-s2-7",
    topic: "multimi-logica",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Formula corectă pentru complementara mulțimii $A$ față de mulțimea totală $E$ (cu $A\\subseteq E$) este:",
    options: ["$C_EA=E\\setminus A$", "$C_EA=A\\setminus E$", "$C_EA=A\\cap E$", "$C_EA=A\\cup E$"],
    correctAnswer: "$C_EA=E\\setminus A$",
    explanation: [
      "Complementara lui $A$ față de $E$ este mulțimea elementelor din $E$ care nu aparțin lui $A$.",
    ],
  },
  {
    id: "ml-s2-8",
    topic: "multimi-logica",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Fie $E=\\{1,2,\\ldots,6\\}$ și $A=\\{2,3\\}$. Câte elemente are complementara $C_EA$?",
    correctAnswer: "4",
    explanation: [
      "$C_EA=E\\setminus A=\\{1,4,5,6\\}$.",
      "Aceasta are $4$ elemente.",
    ],
  },
  {
    id: "ml-s2-9",
    topic: "multimi-logica",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Fie $A=\\{1,2,3\\}$ și $B=\\{1,2,3\\}$. Mulțimea $A\\setminus B$ este:",
    options: ["$\\emptyset$", "$\\{1,2,3\\}$", "$\\{1\\}$", "nu se poate determina"],
    correctAnswer: "$\\emptyset$",
    explanation: [
      "Cum $A=B$, toate elementele lui $A$ se regăsesc în $B$.",
      "Deci $A\\setminus B=\\emptyset$.",
    ],
  },
  {
    id: "ml-s2-10",
    topic: "multimi-logica",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Fie $A=\\{1,2,3,4,5\\}$ și $E=\\{1,2,\\ldots,8\\}$. Complementara $C_EA$ are:",
    options: ["$3$ elemente", "$5$ elemente", "$8$ elemente", "$0$ elemente"],
    correctAnswer: "$3$ elemente",
    explanation: [
      "$C_EA=E\\setminus A=\\{6,7,8\\}$.",
      "Aceasta are $3$ elemente.",
    ],
  },
```

- [ ] **Step 2: Run data integrity test to verify it passes**

Run: `npx vitest run src/data/index.test.ts`
Expected: PASS — all 10 new ids unique, 6 points each, every mcq's `correctAnswer` present in `options`.

- [ ] **Step 3: Verify LaTeX escaping at the runtime-string level**

Same method as Task 1 Step 4, for at least 3 of this task's exercises.

- [ ] **Step 4: Verify no stray BOM**

Run: `head -c 20 src/data/questions/multimiLogicaSets.ts | xxd` — confirm unchanged (still not `ef bb bf`).

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: all test files pass.

- [ ] **Step 6: Commit**

```bash
git add src/data/questions/multimiLogicaSets.ts
git commit -m "Add practice Set 2 (Diferență de mulțimi și complementară)"
```

---

### Task 3: Set 3 (Incluziune, submulțimi, mulțimea părților)

**Files:**
- Modify: `src/data/questions/multimiLogicaSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–2 (must already have Sets 1–2).
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 3's 10 exercises**

Edit `src/data/questions/multimiLogicaSets.ts`. Add a comment header and 10 new exercise objects to the end of the array (after `ml-s2-10`, before the closing `];`):

```ts
  // Set 3 — Incluziune, submulțimi, mulțimea părților
  {
    id: "ml-s3-1",
    topic: "multimi-logica",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Fie $A=\\{1,2\\}$. Care dintre următoarele afirmații este adevărată?",
    options: [
      "$A\\subseteq\\{1,2,3\\}$",
      "$A\\subseteq\\{1,3\\}$",
      "$A\\subseteq\\{2,3\\}$",
      "$A\\subseteq\\emptyset$",
    ],
    correctAnswer: "$A\\subseteq\\{1,2,3\\}$",
    explanation: [
      "$A\\subseteq B$ dacă orice element din $A$ se regăsește în $B$.",
      "$\\{1,2,3\\}$ conține atât $1$ cât și $2$, deci $A\\subseteq\\{1,2,3\\}$.",
    ],
  },
  {
    id: "ml-s3-2",
    topic: "multimi-logica",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Câte submulțimi are o mulțime cu $3$ elemente?",
    correctAnswer: "8",
    explanation: [
      "O mulțime cu $n$ elemente are $2^n$ submulțimi.",
      "Pentru $n=3$: $2^3=8$.",
    ],
  },
  {
    id: "ml-s3-3",
    topic: "multimi-logica",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Câte submulțimi are o mulțime cu $4$ elemente?",
    correctAnswer: "16",
    explanation: [
      "O mulțime cu $n$ elemente are $2^n$ submulțimi.",
      "Pentru $n=4$: $2^4=16$.",
    ],
  },
  {
    id: "ml-s3-4",
    topic: "multimi-logica",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Mulțimea părților lui $A=\\{1,2\\}$, notată $\\mathcal{P}(A)$, este:",
    options: [
      "$\\{\\emptyset,\\{1\\},\\{2\\},\\{1,2\\}\\}$",
      "$\\{1,2\\}$",
      "$\\{\\emptyset,\\{1,2\\}\\}$",
      "$\\{\\{1\\},\\{2\\}\\}$",
    ],
    correctAnswer: "$\\{\\emptyset,\\{1\\},\\{2\\},\\{1,2\\}\\}$",
    explanation: [
      "Mulțimea părților conține toate submulțimile lui $A$, inclusiv mulțimea vidă și $A$ însăși.",
      "Pentru $A=\\{1,2\\}$, acestea sunt $\\emptyset,\\{1\\},\\{2\\},\\{1,2\\}$.",
    ],
  },
  {
    id: "ml-s3-5",
    topic: "multimi-logica",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Câte submulțimi cu exact $2$ elemente are mulțimea $A=\\{1,2,3,4\\}$?",
    correctAnswer: "6",
    explanation: [
      "Numărul submulțimilor cu $k$ elemente dintr-o mulțime cu $n$ elemente este $C_n^k$.",
      "Pentru $n=4$, $k=2$: $C_4^2=\\dfrac{4!}{2!\\cdot2!}=6$.",
    ],
  },
  {
    id: "ml-s3-6",
    topic: "multimi-logica",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Este adevărat că $\\emptyset\\subseteq A$, pentru orice mulțime $A$?",
    options: ["da, întotdeauna", "doar dacă $A=\\emptyset$", "nu, niciodată", "doar dacă $A$ are un singur element"],
    correctAnswer: "da, întotdeauna",
    explanation: [
      "Mulțimea vidă este submulțime a oricărei mulțimi, deoarece nu conține niciun element care ar putea contrazice incluziunea.",
    ],
  },
  {
    id: "ml-s3-7",
    topic: "multimi-logica",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Fie $A=\\{a,b\\}$, $B_1=\\{a,b,c\\}$, $B_2=\\{a,c\\}$, $B_3=\\{a,b\\}$, $B_4=\\{b,c,d\\}$. Pentru câte dintre mulțimile $B_1,B_2,B_3,B_4$ este adevărat că $A\\subseteq B_i$?",
    correctAnswer: "2",
    explanation: [
      "$A\\subseteq B_i$ cere ca atât $a$ cât și $b$ să aparțină lui $B_i$.",
      "Aceasta este adevărat pentru $B_1=\\{a,b,c\\}$ și $B_3=\\{a,b\\}$, deci pentru $2$ dintre ele.",
    ],
  },
  {
    id: "ml-s3-8",
    topic: "multimi-logica",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Dacă $A\\subseteq B$ și $B\\subseteq A$, atunci:",
    options: ["$A=B$", "$A\\cap B=\\emptyset$", "$A\\subsetneq B$", "nu există nicio relație între $A$ și $B$"],
    correctAnswer: "$A=B$",
    explanation: [
      "Dacă fiecare mulțime este submulțime a celeilalte, atunci ele conțin exact aceleași elemente, deci sunt egale.",
    ],
  },
  {
    id: "ml-s3-9",
    topic: "multimi-logica",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Câte elemente are mulțimea părților unei mulțimi cu $5$ elemente?",
    correctAnswer: "32",
    explanation: [
      "Mulțimea părților unei mulțimi cu $n$ elemente are $2^n$ elemente.",
      "Pentru $n=5$: $2^5=32$.",
    ],
  },
  {
    id: "ml-s3-10",
    topic: "multimi-logica",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele afirmații este FALSĂ?",
    options: [
      "Dacă $A\\subseteq B$ și $A\\neq B$, atunci $B\\subseteq A$",
      "$\\emptyset$ este submulțime a oricărei mulțimi",
      "Orice mulțime este submulțime a ei înseși",
      "O mulțime cu $n$ elemente are $2^n$ submulțimi",
    ],
    correctAnswer: "Dacă $A\\subseteq B$ și $A\\neq B$, atunci $B\\subseteq A$",
    explanation: [
      "O incluziune strictă ($A\\subseteq B$, $A\\neq B$) nu implică deloc incluziunea inversă — de exemplu $A=\\{1\\}\\subseteq B=\\{1,2\\}$, dar $B\\not\\subseteq A$.",
      "Celelalte trei afirmații sunt proprietăți adevărate ale incluziunii și ale mulțimii părților.",
    ],
  },
```

- [ ] **Step 2: Run data integrity test to verify it passes**

Run: `npx vitest run src/data/index.test.ts`
Expected: PASS.

- [ ] **Step 3: Verify LaTeX escaping at the runtime-string level**

Same method as Task 1 Step 4, for at least 3 of this task's exercises (this set has the highest density of special commands — `\subseteq`, `\emptyset`, `\mathcal`, `\subsetneq` — verify all appear correctly).

- [ ] **Step 4: Verify no stray BOM**

Run: `head -c 20 src/data/questions/multimiLogicaSets.ts | xxd`.

- [ ] **Step 5: Run the full test suite**

Run: `npm test`

- [ ] **Step 6: Commit**

```bash
git add src/data/questions/multimiLogicaSets.ts
git commit -m "Add practice Set 3 (Incluziune, submulțimi, mulțimea părților)"
```

---

### Task 4: Set 4 (Intervale de numere reale — operații cu intervale)

**Files:**
- Modify: `src/data/questions/multimiLogicaSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–3.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 4's 10 exercises**

```ts
  // Set 4 — Intervale de numere reale (operații cu intervale)
  {
    id: "ml-s4-1",
    topic: "multimi-logica",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Câte numere întregi conține intervalul $(0,5)$?",
    correctAnswer: "4",
    explanation: [
      "Intervalul deschis $(0,5)$ conține numerele întregi strict cuprinse între $0$ și $5$.",
      "Acestea sunt $1,2,3,4$, deci $4$ numere.",
    ],
  },
  {
    id: "ml-s4-2",
    topic: "multimi-logica",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Câte numere întregi conține intervalul $[-3,2]$?",
    correctAnswer: "6",
    explanation: [
      "Intervalul închis $[-3,2]$ conține numerele întregi de la $-3$ la $2$.",
      "Acestea sunt $-3,-2,-1,0,1,2$, deci $6$ numere.",
    ],
  },
  {
    id: "ml-s4-3",
    topic: "multimi-logica",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Intersecția intervalelor $[1,5]$ și $[3,8]$ este:",
    options: ["$[3,5]$", "$[1,8]$", "$[1,3]$", "$\\emptyset$"],
    correctAnswer: "$[3,5]$",
    explanation: [
      "Intersecția conține valorile comune ambelor intervale.",
      "Acestea sunt valorile de la $3$ la $5$, deci $[3,5]$.",
    ],
  },
  {
    id: "ml-s4-4",
    topic: "multimi-logica",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Reuniunea intervalelor $[1,3]$ și $[3,5]$ este:",
    options: ["$[1,5]$", "$(1,5)$", "$\\{3\\}$", "$\\emptyset$"],
    correctAnswer: "$[1,5]$",
    explanation: [
      "Cele două intervale au un punct comun ($3$), deci reuniunea lor formează un singur interval continuu.",
      "Rezultă $[1,3]\\cup[3,5]=[1,5]$.",
    ],
  },
  {
    id: "ml-s4-5",
    topic: "multimi-logica",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Câte numere naturale conține intervalul $[0,4]$?",
    correctAnswer: "5",
    explanation: [
      "Intervalul $[0,4]$ conține numerele naturale $0,1,2,3,4$.",
      "Acestea sunt $5$ numere.",
    ],
  },
  {
    id: "ml-s4-6",
    topic: "multimi-logica",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Intersecția intervalelor $(-\\infty,3)$ și $(0,\\infty)$ este:",
    options: ["$(0,3)$", "$(-\\infty,\\infty)$", "$(3,\\infty)$", "$\\emptyset$"],
    correctAnswer: "$(0,3)$",
    explanation: [
      "Intersecția conține valorile comune ambelor intervale: mai mari ca $0$ și mai mici ca $3$.",
      "Rezultă $(0,3)$.",
    ],
  },
  {
    id: "ml-s4-7",
    topic: "multimi-logica",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Câte numere întregi conține intervalul $[5,5]$?",
    correctAnswer: "1",
    explanation: [
      "Intervalul $[5,5]$ conține un singur număr: $5$.",
    ],
  },
  {
    id: "ml-s4-8",
    topic: "multimi-logica",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Intersecția intervalelor $[1,4]$ și $[6,9]$ este:",
    options: ["$\\emptyset$", "$[1,9]$", "$[4,6]$", "$[1,4]$"],
    correctAnswer: "$\\emptyset$",
    explanation: [
      "Cele două intervale nu au nicio valoare comună (cel mai mare din primul, $4$, este mai mic decât cel mai mic din al doilea, $6$).",
      "Deci intersecția este mulțimea vidă.",
    ],
  },
  {
    id: "ml-s4-9",
    topic: "multimi-logica",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Câte numere întregi conține intervalul $(-5,-1]$?",
    correctAnswer: "4",
    explanation: [
      "Intervalul $(-5,-1]$ conține numerele întregi strict mai mari ca $-5$ și cel mult egale cu $-1$.",
      "Acestea sunt $-4,-3,-2,-1$, deci $4$ numere.",
    ],
  },
  {
    id: "ml-s4-10",
    topic: "multimi-logica",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Reuniunea intervalelor $[1,3]$ și $[5,7]$ este:",
    options: [
      "$[1,3]\\cup[5,7]$ (nu se poate scrie ca un singur interval)",
      "$[1,7]$",
      "$[3,5]$",
      "$\\emptyset$",
    ],
    correctAnswer: "$[1,3]\\cup[5,7]$ (nu se poate scrie ca un singur interval)",
    explanation: [
      "Cele două intervale nu au niciun punct comun și nici nu se ating (există un gol între $3$ și $5$).",
      "Reuniunea lor rămâne o reuniune de două intervale disjuncte, nu poate fi scrisă ca un singur interval.",
    ],
  },
```

- [ ] **Step 2: Run data integrity test** — `npx vitest run src/data/index.test.ts`, expect PASS.
- [ ] **Step 3: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises (check `\infty`, `\emptyset`).
- [ ] **Step 4: Verify no stray BOM.**
- [ ] **Step 5: Run the full test suite** — `npm test`.
- [ ] **Step 6: Commit**

```bash
git add src/data/questions/multimiLogicaSets.ts
git commit -m "Add practice Set 4 (Intervale de numere reale)"
```

---

### Task 5: Set 5 (Propoziții și valori de adevăr)

**Files:**
- Modify: `src/data/questions/multimiLogicaSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–4.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 5's 10 exercises**

```ts
  // Set 5 — Propoziții și valori de adevăr
  {
    id: "ml-s5-1",
    topic: "multimi-logica",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Propoziția „$2+2=4$” are valoarea de adevăr:",
    options: ["adevărat", "fals", "nu este propoziție", "depinde de context"],
    correctAnswer: "adevărat",
    explanation: [
      "$2+2=4$ este un fapt matematic adevărat, deci propoziția este adevărată.",
    ],
  },
  {
    id: "ml-s5-2",
    topic: "multimi-logica",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele enunțuri NU este propoziție (nu are o valoare de adevăr unică)?",
    options: [
      "„$x+1=5$”",
      "„$2$ este număr par”",
      "„$3>5$”",
      "„Bucureștiul este capitala României”",
    ],
    correctAnswer: "„$x+1=5$”",
    explanation: [
      "„$x+1=5$” conține o variabilă liberă $x$, deci valoarea sa de adevăr depinde de $x$ — este un predicat, nu o propoziție.",
      "Celelalte trei enunțuri au o valoare de adevăr fixă (adevărat sau fals), deci sunt propoziții.",
    ],
  },
  {
    id: "ml-s5-3",
    topic: "multimi-logica",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Câte dintre propozițiile următoare sunt adevărate: „$3+3=6$”, „$5<2$”, „$7$ este impar”, „$10$ este divizibil cu $3$”?",
    correctAnswer: "2",
    explanation: [
      "„$3+3=6$” este adevărată; „$5<2$” este falsă; „$7$ este impar” este adevărată; „$10$ este divizibil cu $3$” este falsă.",
      "Sunt $2$ propoziții adevărate.",
    ],
  },
  {
    id: "ml-s5-4",
    topic: "multimi-logica",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Dacă propoziția $p$ este falsă, atunci negația $\\overline{p}$ este:",
    options: ["adevărată", "falsă", "nu se poate determina", "depinde de $p$"],
    correctAnswer: "adevărată",
    explanation: [
      "Negația inversează valoarea de adevăr: dacă $p$ este falsă, $\\overline{p}$ este adevărată.",
    ],
  },
  {
    id: "ml-s5-5",
    topic: "multimi-logica",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Propoziția „$4$ este număr prim” este:",
    options: ["falsă", "adevărată", "nu este propoziție", "depinde de context"],
    correctAnswer: "falsă",
    explanation: [
      "$4=2\\cdot2$ are un divizor propriu ($2$), deci nu este prim — propoziția este falsă.",
    ],
  },
  {
    id: "ml-s5-6",
    topic: "multimi-logica",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Câte dintre numerele $2,3,4,5,6,7$ fac propoziția „$n$ este număr prim” adevărată?",
    correctAnswer: "4",
    explanation: [
      "Numerele prime dintre acestea sunt $2,3,5,7$.",
      "Sunt $4$ numere.",
    ],
  },
  {
    id: "ml-s5-7",
    topic: "multimi-logica",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Valoarea de adevăr a propoziției „$\\sqrt{4}=2$ și $\\sqrt{9}=3$” este:",
    options: ["adevărat", "fals", "nu se poate determina", "depinde de context"],
    correctAnswer: "adevărat",
    explanation: [
      "Ambele propoziții componente sunt adevărate ($\\sqrt4=2$, $\\sqrt9=3$), deci conjuncția lor este adevărată.",
    ],
  },
  {
    id: "ml-s5-8",
    topic: "multimi-logica",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Valoarea de adevăr a propoziției „$2>3$ sau $5>1$” este:",
    options: ["adevărat", "fals", "ambele false", "nu se poate determina"],
    correctAnswer: "adevărat",
    explanation: [
      "„$2>3$” este falsă, dar „$5>1$” este adevărată — pentru o disjuncție, este suficient ca una dintre propoziții să fie adevărată.",
      "Deci disjuncția este adevărată.",
    ],
  },
  {
    id: "ml-s5-9",
    topic: "multimi-logica",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Câte propoziții adevărate sunt printre: „$1<2$”, „$2<1$”, „$3=3$”, „$4\\neq4$”?",
    correctAnswer: "2",
    explanation: [
      "„$1<2$” este adevărată; „$2<1$” este falsă; „$3=3$” este adevărată; „$4\\neq4$” este falsă.",
      "Sunt $2$ propoziții adevărate.",
    ],
  },
  {
    id: "ml-s5-10",
    topic: "multimi-logica",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele afirmații despre propoziții este adevărată?",
    options: [
      "O propoziție are exact o valoare de adevăr (adevărat sau fals)",
      "O propoziție poate fi și adevărată și falsă simultan",
      "Orice enunț matematic este o propoziție",
      "Un enunț cu o variabilă liberă are întotdeauna o valoare de adevăr unică",
    ],
    correctAnswer: "O propoziție are exact o valoare de adevăr (adevărat sau fals)",
    explanation: [
      "Aceasta este chiar definiția unei propoziții logice.",
      "Un enunț cu variabile libere (predicat) nu are o valoare de adevăr fixă, deci nu este propoziție.",
    ],
  },
```

- [ ] **Step 2: Run data integrity test** — `npx vitest run src/data/index.test.ts`, expect PASS.
- [ ] **Step 3: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises (check `\neq`, `\sqrt`).
- [ ] **Step 4: Verify no stray BOM.**
- [ ] **Step 5: Run the full test suite** — `npm test`.
- [ ] **Step 6: Commit**

```bash
git add src/data/questions/multimiLogicaSets.ts
git commit -m "Add practice Set 5 (Propoziții și valori de adevăr)"
```

---

### Task 6: Set 6 (Predicate și cuantificatori)

**Files:**
- Modify: `src/data/questions/multimiLogicaSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–5.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 6's 10 exercises**

```ts
  // Set 6 — Predicate și cuantificatori
  {
    id: "ml-s6-1",
    topic: "multimi-logica",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Predicatul $P(x): x^2=4$, definit pe $\\mathbb{Z}$, este adevărat pentru:",
    options: ["$x\\in\\{-2,2\\}$", "$x\\in\\{2\\}$", "$x\\in\\{-2\\}$", "$x\\in\\{4\\}$"],
    correctAnswer: "$x\\in\\{-2,2\\}$",
    explanation: [
      "Ecuația $x^2=4$ are soluțiile $x=2$ și $x=-2$.",
      "Predicatul este adevărat exact pentru aceste valori.",
    ],
  },
  {
    id: "ml-s6-2",
    topic: "multimi-logica",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Propoziția „$\\exists x\\in\\mathbb{N}, x+3=10$” este:",
    options: ["adevărată", "falsă", "nu este propoziție", "depinde de $x$"],
    correctAnswer: "adevărată",
    explanation: [
      "Pentru $x=7$, avem $7+3=10$, deci există un $x$ natural care satisface ecuația.",
      "Propoziția existențială este adevărată.",
    ],
  },
  {
    id: "ml-s6-3",
    topic: "multimi-logica",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Propoziția „$\\forall x\\in\\mathbb{N}, x+1>x$” este:",
    options: ["adevărată", "falsă", "adevărată doar pentru $x$ par", "nu se poate determina"],
    correctAnswer: "adevărată",
    explanation: [
      "Pentru orice număr natural $x$, adunarea lui $1$ produce întotdeauna un număr mai mare.",
      "Propoziția universală este adevărată.",
    ],
  },
  {
    id: "ml-s6-4",
    topic: "multimi-logica",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Propoziția „$\\forall x\\in\\mathbb{R}, x^2\\geq0$” este:",
    options: ["adevărată", "falsă", "adevărată doar pentru $x>0$", "adevărată doar pentru $x$ întreg"],
    correctAnswer: "adevărată",
    explanation: [
      "Pătratul oricărui număr real este întotdeauna nenegativ.",
      "Propoziția universală este adevărată pentru toate valorile reale ale lui $x$.",
    ],
  },
  {
    id: "ml-s6-5",
    topic: "multimi-logica",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Propoziția „$\\exists x\\in\\mathbb{R}, x^2=-1$” este:",
    options: ["falsă", "adevărată", "adevărată doar pentru $x=0$", "nu se poate determina"],
    correctAnswer: "falsă",
    explanation: [
      "Pătratul unui număr real nu poate fi negativ, deci nu există niciun $x$ real cu $x^2=-1$.",
      "Propoziția existențială este falsă.",
    ],
  },
  {
    id: "ml-s6-6",
    topic: "multimi-logica",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Câte numere naturale $n$, cu $1\\leq n\\leq10$, satisfac predicatul $P(n):$ „$n$ este divizibil cu $3$”?",
    correctAnswer: "3",
    explanation: [
      "Numerele din intervalul $[1,10]$ divizibile cu $3$ sunt $3,6,9$.",
      "Sunt $3$ astfel de numere.",
    ],
  },
  {
    id: "ml-s6-7",
    topic: "multimi-logica",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Negația propoziției „$\\exists x\\in\\mathbb{R}, x^2<0$” este:",
    options: [
      "$\\forall x\\in\\mathbb{R}, x^2\\geq0$",
      "$\\forall x\\in\\mathbb{R}, x^2<0$",
      "$\\exists x\\in\\mathbb{R}, x^2\\geq0$",
      "$\\exists x\\in\\mathbb{R}, x^2>0$",
    ],
    correctAnswer: "$\\forall x\\in\\mathbb{R}, x^2\\geq0$",
    explanation: [
      "Negația lui „$\\exists x, P(x)$” este „$\\forall x,\\overline{P(x)}$”.",
      "Negația lui $x^2<0$ este $x^2\\geq0$, deci negația propoziției este „$\\forall x\\in\\mathbb{R}, x^2\\geq0$”.",
    ],
  },
  {
    id: "ml-s6-8",
    topic: "multimi-logica",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Negația propoziției „$\\forall x\\in\\mathbb{N}, x\\geq0$” este:",
    options: [
      "$\\exists x\\in\\mathbb{N}, x<0$",
      "$\\forall x\\in\\mathbb{N}, x<0$",
      "$\\exists x\\in\\mathbb{N}, x\\geq0$",
      "$\\forall x\\in\\mathbb{N}, x\\leq0$",
    ],
    correctAnswer: "$\\exists x\\in\\mathbb{N}, x<0$",
    explanation: [
      "Negația lui „$\\forall x, P(x)$” este „$\\exists x,\\overline{P(x)}$”.",
      "Negația lui $x\\geq0$ este $x<0$, deci negația propoziției este „$\\exists x\\in\\mathbb{N}, x<0$”.",
    ],
  },
  {
    id: "ml-s6-9",
    topic: "multimi-logica",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Pentru predicatul $P(x): x^2-5x+6=0$, definit pe $\\mathbb{Z}$, câte valori ale lui $x$ fac $P(x)$ adevărat?",
    correctAnswer: "2",
    explanation: [
      "Rezolvăm ecuația: $x^2-5x+6=(x-2)(x-3)=0$.",
      "Soluțiile sunt $x=2$ și $x=3$, deci $2$ valori.",
    ],
  },
  {
    id: "ml-s6-10",
    topic: "multimi-logica",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele reguli de negare a cuantificatorilor este corectă?",
    options: [
      "$\\overline{\\forall x, P(x)}\\equiv\\exists x,\\overline{P(x)}$",
      "$\\overline{\\forall x, P(x)}\\equiv\\forall x,\\overline{P(x)}$",
      "$\\overline{\\exists x, P(x)}\\equiv\\exists x,\\overline{P(x)}$",
      "$\\overline{\\forall x, P(x)}\\equiv\\exists x, P(x)$",
    ],
    correctAnswer: "$\\overline{\\forall x, P(x)}\\equiv\\exists x,\\overline{P(x)}$",
    explanation: [
      "Negarea unui cuantificator universal produce un cuantificator existențial aplicat negației predicatului.",
    ],
  },
```

- [ ] **Step 2: Run data integrity test** — `npx vitest run src/data/index.test.ts`, expect PASS.
- [ ] **Step 3: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises (check `\forall`, `\exists`, `\overline`, `\equiv` — this set has the highest density of quantifier/logic symbols so far, verify carefully).
- [ ] **Step 4: Verify no stray BOM.**
- [ ] **Step 5: Run the full test suite** — `npm test`.
- [ ] **Step 6: Commit**

```bash
git add src/data/questions/multimiLogicaSets.ts
git commit -m "Add practice Set 6 (Predicate și cuantificatori)"
```

---

### Task 7: Set 7 (Operatori logici — negație, conjuncție, disjuncție)

**Files:**
- Modify: `src/data/questions/multimiLogicaSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–6.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 7's 10 exercises**

```ts
  // Set 7 — Operatori logici (negație, conjuncție, disjuncție)
  {
    id: "ml-s7-1",
    topic: "multimi-logica",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Dacă propoziția $p$ este adevărată, atunci negația $\\overline{p}$ este:",
    options: ["falsă", "adevărată", "nu se poate determina", "depinde de $p$"],
    correctAnswer: "falsă",
    explanation: [
      "Negația inversează valoarea de adevăr: dacă $p$ este adevărată, $\\overline{p}$ este falsă.",
    ],
  },
  {
    id: "ml-s7-2",
    topic: "multimi-logica",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Conjuncția $p\\wedge q$ este adevărată exact atunci când:",
    options: [
      "$p$ și $q$ sunt ambele adevărate",
      "cel puțin una dintre $p,q$ este adevărată",
      "$p$ și $q$ sunt ambele false",
      "exact una dintre $p,q$ este adevărată",
    ],
    correctAnswer: "$p$ și $q$ sunt ambele adevărate",
    explanation: [
      "Conjuncția (,,și'') este adevărată doar când ambele propoziții componente sunt adevărate.",
    ],
  },
  {
    id: "ml-s7-3",
    topic: "multimi-logica",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Disjuncția $p\\vee q$ este falsă exact atunci când:",
    options: [
      "$p$ și $q$ sunt ambele false",
      "$p$ și $q$ sunt ambele adevărate",
      "cel puțin una dintre $p,q$ este adevărată",
      "exact una dintre $p,q$ este falsă",
    ],
    correctAnswer: "$p$ și $q$ sunt ambele false",
    explanation: [
      "Disjuncția (,,sau'') este falsă doar când ambele propoziții componente sunt false.",
    ],
  },
  {
    id: "ml-s7-4",
    topic: "multimi-logica",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Dacă $p$ este falsă și $q$ este falsă, câte dintre propozițiile $p\\wedge q$ și $p\\vee q$ sunt adevărate?",
    correctAnswer: "0",
    explanation: [
      "$p\\wedge q$: falsă și falsă $\\Rightarrow$ falsă. $p\\vee q$: falsă sau falsă $\\Rightarrow$ falsă.",
      "Niciuna dintre cele două nu este adevărată, deci $0$.",
    ],
  },
  {
    id: "ml-s7-5",
    topic: "multimi-logica",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Dacă $p$ este adevărată și $q$ este adevărată, câte dintre propozițiile $p\\wedge q$, $p\\vee q$, $\\overline{p}$ sunt adevărate?",
    correctAnswer: "2",
    explanation: [
      "$p\\wedge q$: adevărată. $p\\vee q$: adevărată. $\\overline{p}$: falsă (deoarece $p$ este adevărată).",
      "Sunt $2$ propoziții adevărate dintre cele trei.",
    ],
  },
  {
    id: "ml-s7-6",
    topic: "multimi-logica",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Dacă $p$ este adevărată și $q$ este falsă, valoarea de adevăr a lui $p\\wedge q$ este:",
    options: ["falsă", "adevărată", "nu se poate determina", "depinde de alte propoziții"],
    correctAnswer: "falsă",
    explanation: [
      "Conjuncția cere ca ambele propoziții să fie adevărate; cum $q$ este falsă, $p\\wedge q$ este falsă.",
    ],
  },
  {
    id: "ml-s7-7",
    topic: "multimi-logica",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Conform legilor lui De Morgan, propoziția $\\overline{p\\wedge q}$ este echivalentă cu:",
    options: ["$\\overline{p}\\vee\\overline{q}$", "$\\overline{p}\\wedge\\overline{q}$", "$p\\vee q$", "$p\\wedge q$"],
    correctAnswer: "$\\overline{p}\\vee\\overline{q}$",
    explanation: [
      "Legea lui De Morgan: negația unei conjuncții este disjuncția negațiilor.",
    ],
  },
  {
    id: "ml-s7-8",
    topic: "multimi-logica",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Conform legilor lui De Morgan, propoziția $\\overline{p\\vee q}$ este echivalentă cu:",
    options: ["$\\overline{p}\\wedge\\overline{q}$", "$\\overline{p}\\vee\\overline{q}$", "$p\\wedge q$", "$p\\vee q$"],
    correctAnswer: "$\\overline{p}\\wedge\\overline{q}$",
    explanation: [
      "Legea lui De Morgan: negația unei disjuncții este conjuncția negațiilor.",
    ],
  },
  {
    id: "ml-s7-9",
    topic: "multimi-logica",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Fie $p$: „$5$ este par” (falsă) și $q$: „$5$ este impar” (adevărată). Care este valoarea de adevăr a lui $p\\vee q$, exprimată ca $1$ (adevărat) sau $0$ (fals)?",
    correctAnswer: "1",
    explanation: [
      "$p\\vee q$: falsă sau adevărată $\\Rightarrow$ adevărată (este suficient ca una dintre ele să fie adevărată).",
      "Exprimată numeric, valoarea este $1$.",
    ],
  },
  {
    id: "ml-s7-10",
    topic: "multimi-logica",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele propoziții este o tautologie (întotdeauna adevărată, indiferent de valoarea de adevăr a lui $p$)?",
    options: ["$p\\vee\\overline{p}$", "$p\\wedge\\overline{p}$", "$p\\wedge q$", "$p\\vee q$"],
    correctAnswer: "$p\\vee\\overline{p}$",
    explanation: [
      "Fie $p$ adevărată, fie $\\overline{p}$ este adevărată — cel puțin una dintre ele este mereu adevărată, deci $p\\vee\\overline{p}$ este întotdeauna adevărată.",
      "Celelalte depind de valorile de adevăr ale lui $p$ și/sau $q$.",
    ],
  },
```

- [ ] **Step 2: Run data integrity test** — `npx vitest run src/data/index.test.ts`, expect PASS.
- [ ] **Step 3: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises (check `\wedge`, `\vee`, `\overline`).
- [ ] **Step 4: Verify no stray BOM.**
- [ ] **Step 5: Run the full test suite** — `npm test`.
- [ ] **Step 6: Commit**

```bash
git add src/data/questions/multimiLogicaSets.ts
git commit -m "Add practice Set 7 (Operatori logici)"
```

---

### Task 8: Set 8 (Implicație și echivalență logică)

**Files:**
- Modify: `src/data/questions/multimiLogicaSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–7.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 8's 10 exercises**

```ts
  // Set 8 — Implicație și echivalență logică
  {
    id: "ml-s8-1",
    topic: "multimi-logica",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Implicația $p\\Rightarrow q$ este falsă exact atunci când:",
    options: [
      "$p$ este adevărată și $q$ este falsă",
      "$p$ este falsă și $q$ este adevărată",
      "$p$ și $q$ sunt ambele false",
      "$p$ și $q$ sunt ambele adevărate",
    ],
    correctAnswer: "$p$ este adevărată și $q$ este falsă",
    explanation: [
      "Implicația este falsă doar în cazul în care ipoteza ($p$) este adevărată, dar concluzia ($q$) este falsă.",
      "În toate celelalte trei cazuri, implicația este adevărată.",
    ],
  },
  {
    id: "ml-s8-2",
    topic: "multimi-logica",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Dacă $p$ este falsă, pentru câte dintre cele două valori posibile ale lui $q$ (adevărat, fals) este $p\\Rightarrow q$ adevărată?",
    correctAnswer: "2",
    explanation: [
      "Dacă $p$ este falsă, implicația $p\\Rightarrow q$ este adevărată indiferent de valoarea lui $q$.",
      "Deci este adevărată pentru ambele valori posibile ale lui $q$: $2$.",
    ],
  },
  {
    id: "ml-s8-3",
    topic: "multimi-logica",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Echivalența $p\\Leftrightarrow q$ este adevărată exact atunci când:",
    options: [
      "$p$ și $q$ au aceeași valoare de adevăr",
      "$p$ este adevărată",
      "$q$ este adevărată",
      "cel puțin una dintre $p,q$ este adevărată",
    ],
    correctAnswer: "$p$ și $q$ au aceeași valoare de adevăr",
    explanation: [
      "Echivalența logică este adevărată exact atunci când ambele propoziții sunt simultan adevărate sau simultan false.",
    ],
  },
  {
    id: "ml-s8-4",
    topic: "multimi-logica",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Reciproca implicației $p\\Rightarrow q$ este:",
    options: ["$q\\Rightarrow p$", "$\\overline{p}\\Rightarrow\\overline{q}$", "$\\overline{q}\\Rightarrow\\overline{p}$", "$\\overline{p}\\Rightarrow q$"],
    correctAnswer: "$q\\Rightarrow p$",
    explanation: [
      "Reciproca unei implicații se obține inversând ipoteza cu concluzia.",
    ],
  },
  {
    id: "ml-s8-5",
    topic: "multimi-logica",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Contrapoziția implicației $p\\Rightarrow q$ (echivalentă logic cu aceasta) este:",
    options: ["$\\overline{q}\\Rightarrow\\overline{p}$", "$q\\Rightarrow p$", "$\\overline{p}\\Rightarrow\\overline{q}$", "$p\\Rightarrow\\overline{q}$"],
    correctAnswer: "$\\overline{q}\\Rightarrow\\overline{p}$",
    explanation: [
      "Contrapoziția se obține negând și inversând ipoteza cu concluzia; este singura dintre cele patru variante logic echivalentă cu implicația inițială.",
    ],
  },
  {
    id: "ml-s8-6",
    topic: "multimi-logica",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Fie $p$: „$6$ este par” (adevărată) și $q$: „$6$ este divizibil cu $3$” (adevărată). Care este valoarea de adevăr a lui $p\\Rightarrow q$, exprimată ca $1$ sau $0$?",
    correctAnswer: "1",
    explanation: [
      "$p$ adevărată și $q$ adevărată $\\Rightarrow$ implicația este adevărată.",
      "Exprimată numeric, valoarea este $1$.",
    ],
  },
  {
    id: "ml-s8-7",
    topic: "multimi-logica",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Propoziția „$x=2\\Rightarrow x^2=4$”, pentru $x\\in\\mathbb{R}$, este:",
    options: ["adevărată", "falsă", "nu este propoziție", "depinde de $x$"],
    correctAnswer: "adevărată",
    explanation: [
      "Ori de câte ori $x=2$, calculăm $x^2=4$ — implicația este adevărată pentru orice valoare a lui $x$.",
    ],
  },
  {
    id: "ml-s8-8",
    topic: "multimi-logica",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Propoziția „$x^2=4\\Rightarrow x=2$”, pentru $x\\in\\mathbb{R}$, este:",
    options: ["falsă", "adevărată", "nu este propoziție", "depinde de $x$"],
    correctAnswer: "falsă",
    explanation: [
      "Pentru $x=-2$, avem $x^2=4$, dar $x\\neq2$ — implicația este falsă în acest caz, deci propoziția nu este adevărată pentru orice $x$.",
    ],
  },
  {
    id: "ml-s8-9",
    topic: "multimi-logica",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Câte dintre implicațiile următoare sunt adevărate: „$2<3\\Rightarrow4<5$”, „$3<2\\Rightarrow4<5$”, „$2<3\\Rightarrow5<4$”?",
    correctAnswer: "2",
    explanation: [
      "Prima: adevărat $\\Rightarrow$ adevărat = adevărată. A doua: fals $\\Rightarrow$ adevărat = adevărată. A treia: adevărat $\\Rightarrow$ fals = falsă.",
      "Sunt $2$ implicații adevărate.",
    ],
  },
  {
    id: "ml-s8-10",
    topic: "multimi-logica",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele afirmații despre implicație este adevărată?",
    options: [
      "$p\\Rightarrow q$ este echivalentă logic cu $\\overline{p}\\vee q$",
      "$p\\Rightarrow q$ este echivalentă logic cu $p\\wedge q$",
      "$p\\Rightarrow q$ este echivalentă logic cu $q\\Rightarrow p$",
      "$p\\Rightarrow q$ este întotdeauna adevărată",
    ],
    correctAnswer: "$p\\Rightarrow q$ este echivalentă logic cu $\\overline{p}\\vee q$",
    explanation: [
      "Aceasta este o echivalență logică standard: implicația $p\\Rightarrow q$ are exact aceeași valoare de adevăr ca $\\overline{p}\\vee q$, pentru orice $p,q$.",
    ],
  },
```

- [ ] **Step 2: Run data integrity test** — `npx vitest run src/data/index.test.ts`, expect PASS.
- [ ] **Step 3: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises (check `\Rightarrow`, `\Leftrightarrow`, `\overline`).
- [ ] **Step 4: Verify no stray BOM.**
- [ ] **Step 5: Run the full test suite** — `npm test`.
- [ ] **Step 6: Commit**

```bash
git add src/data/questions/multimiLogicaSets.ts
git commit -m "Add practice Set 8 (Implicație și echivalență logică)"
```

---

### Task 9: Set 9 (Inducția matematică)

**Files:**
- Modify: `src/data/questions/multimiLogicaSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–8.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 9's 10 exercises**

```ts
  // Set 9 — Inducția matematică
  {
    id: "ml-s9-1",
    topic: "multimi-logica",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Folosind formula $1+2+\\cdots+n=\\dfrac{n(n+1)}{2}$, calculați suma $1+2+\\cdots+20$.",
    correctAnswer: "210",
    explanation: [
      "Aplicăm formula cu $n=20$: suma este $\\dfrac{20\\cdot21}{2}$.",
      "Calculăm: $\\dfrac{420}{2}=210$.",
    ],
  },
  {
    id: "ml-s9-2",
    topic: "multimi-logica",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Folosind formula $1+2+\\cdots+n=\\dfrac{n(n+1)}{2}$, calculați suma $1+2+\\cdots+15$.",
    correctAnswer: "120",
    explanation: [
      "Aplicăm formula cu $n=15$: suma este $\\dfrac{15\\cdot16}{2}$.",
      "Calculăm: $\\dfrac{240}{2}=120$.",
    ],
  },
  {
    id: "ml-s9-3",
    topic: "multimi-logica",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Metoda inducției matematice se folosește pentru a demonstra:",
    options: [
      "o afirmație adevărată pentru toate numerele naturale (începând de la un anumit rang)",
      "o afirmație adevărată pentru un singur număr natural",
      "o afirmație falsă pentru toate numerele naturale",
      "o afirmație adevărată doar pentru numere pare",
    ],
    correctAnswer: "o afirmație adevărată pentru toate numerele naturale (începând de la un anumit rang)",
    explanation: [
      "Inducția matematică este o metodă de demonstrație pentru afirmații de forma $P(n)$, valabile pentru toate numerele naturale $n$ de la un anumit rang încolo.",
    ],
  },
  {
    id: "ml-s9-4",
    topic: "multimi-logica",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Pasul de bază (verificarea) al inducției matematice constă în:",
    options: [
      "verificarea afirmației pentru primul rang (de obicei $n=0$ sau $n=1$)",
      "verificarea afirmației pentru toate rangurile simultan",
      "presupunerea că afirmația este adevărată pentru $n=k$",
      "demonstrarea afirmației pentru $n=k+1$ folosind $n=k$",
    ],
    correctAnswer: "verificarea afirmației pentru primul rang (de obicei $n=0$ sau $n=1$)",
    explanation: [
      "Pasul de bază confirmă că afirmația este adevărată chiar la punctul de plecare al inducției.",
    ],
  },
  {
    id: "ml-s9-5",
    topic: "multimi-logica",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Pasul inductiv al demonstrației prin inducție matematică constă în:",
    options: [
      "a demonstra că, presupunând afirmația adevărată pentru $n=k$, rezultă adevărată pentru $n=k+1$",
      "a verifica afirmația doar pentru $n=1$",
      "a demonstra afirmația pentru toate numerele simultan, fără nicio ipoteză",
      "a alege un $n$ oarecare și a calcula direct",
    ],
    correctAnswer: "a demonstra că, presupunând afirmația adevărată pentru $n=k$, rezultă adevărată pentru $n=k+1$",
    explanation: [
      "Pasul inductiv leagă rangul $k$ de rangul următor $k+1$, folosind ipoteza de inducție.",
    ],
  },
  {
    id: "ml-s9-6",
    topic: "multimi-logica",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Folosind formula $1^2+2^2+\\cdots+n^2=\\dfrac{n(n+1)(2n+1)}{6}$, calculați $1^2+2^2+3^2+4^2$.",
    correctAnswer: "30",
    explanation: [
      "Aplicăm formula cu $n=4$: suma este $\\dfrac{4\\cdot5\\cdot9}{6}$.",
      "Calculăm: $\\dfrac{180}{6}=30$.",
    ],
  },
  {
    id: "ml-s9-7",
    topic: "multimi-logica",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Folosind formula pentru suma primelor $n$ numere impare, $1+3+5+\\cdots+(2n-1)=n^2$, calculați suma primelor $6$ numere impare.",
    correctAnswer: "36",
    explanation: [
      "Aplicăm formula cu $n=6$: suma este $6^2=36$.",
    ],
  },
  {
    id: "ml-s9-8",
    topic: "multimi-logica",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Ce reprezintă ipoteza de inducție, atunci când se demonstrează o afirmație $P(n)$ prin inducție matematică?",
    options: [
      "presupunerea că $P(k)$ este adevărată, pentru un $k$ fixat",
      "presupunerea că $P(n)$ este falsă pentru toți $n$",
      "verificarea lui $P(1)$",
      "demonstrarea directă a lui $P(n)$ pentru orice $n$",
    ],
    correctAnswer: "presupunerea că $P(k)$ este adevărată, pentru un $k$ fixat",
    explanation: [
      "Ipoteza de inducție este presupunerea (folosită doar în pasul inductiv) că afirmația este deja adevărată la rangul $k$.",
    ],
  },
  {
    id: "ml-s9-9",
    topic: "multimi-logica",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Folosind formula $1+2+\\cdots+n=\\dfrac{n(n+1)}{2}$, determinați cel mai mic număr natural $n$ pentru care suma $1+2+\\cdots+n$ depășește $50$.",
    correctAnswer: "10",
    explanation: [
      "Pentru $n=9$: suma este $\\dfrac{9\\cdot10}{2}=45$, care nu depășește $50$.",
      "Pentru $n=10$: suma este $\\dfrac{10\\cdot11}{2}=55$, care depășește $50$.",
      "Cel mai mic astfel de $n$ este $10$.",
    ],
  },
  {
    id: "ml-s9-10",
    topic: "multimi-logica",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele afirmații despre inducția matematică este FALSĂ?",
    options: [
      "Inducția matematică poate demonstra afirmații pentru toate numerele reale",
      "Inducția matematică necesită verificarea unui pas de bază",
      "Inducția matematică necesită demonstrarea unui pas inductiv",
      "Inducția matematică se aplică, de regulă, mulțimii numerelor naturale",
    ],
    correctAnswer: "Inducția matematică poate demonstra afirmații pentru toate numerele reale",
    explanation: [
      "Inducția matematică se aplică mulțimilor discrete, numărabile (de obicei numerele naturale), nu mulțimii numerelor reale, care nu are o structură de „rang următor”.",
      "Celelalte trei afirmații descriu corect structura unei demonstrații prin inducție.",
    ],
  },
```

- [ ] **Step 2: Run data integrity test** — `npx vitest run src/data/index.test.ts`, expect PASS.
- [ ] **Step 3: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises (check `\dfrac`, `\cdots`).
- [ ] **Step 4: Verify no stray BOM.**
- [ ] **Step 5: Run the full test suite** — `npm test`.
- [ ] **Step 6: Commit**

```bash
git add src/data/questions/multimiLogicaSets.ts
git commit -m "Add practice Set 9 (Inducția matematică)"
```

---

### Task 10: Set 10 (Recapitulare / aplicații mixte) + final verification

**Files:**
- Modify: `src/data/questions/multimiLogicaSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–9 (must have exactly 90 exercises, Sets 1–9, before this task starts).
- Produces: the completed 100-exercise file — no further tasks depend on this one.

- [ ] **Step 1: Append Set 10's 10 exercises**

```ts
  // Set 10 — Recapitulare / aplicații mixte
  {
    id: "ml-s10-1",
    topic: "multimi-logica",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Fie $A=\\{1,2,3,4,5,6\\}$ și $B=\\{4,5,6,7,8\\}$. Câte elemente are mulțimea $A\\cup B$?",
    correctAnswer: "8",
    explanation: [
      "Reuniunea conține toate elementele distincte din cele două mulțimi: $1,2,3,4,5,6,7,8$.",
      "Sunt $8$ elemente.",
    ],
  },
  {
    id: "ml-s10-2",
    topic: "multimi-logica",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Fie $A=\\{1,2,3,4,5,6\\}$ și $B=\\{4,5,6,7,8\\}$. Câte elemente are mulțimea $A\\setminus B$?",
    correctAnswer: "3",
    explanation: [
      "$A\\setminus B$ conține elementele din $A$ care nu sunt în $B$: $1,2,3$.",
      "Sunt $3$ elemente.",
    ],
  },
  {
    id: "ml-s10-3",
    topic: "multimi-logica",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Câte submulțimi are o mulțime cu $6$ elemente?",
    options: ["$64$", "$36$", "$12$", "$6$"],
    correctAnswer: "$64$",
    explanation: [
      "O mulțime cu $n$ elemente are $2^n$ submulțimi.",
      "Pentru $n=6$: $2^6=64$.",
    ],
  },
  {
    id: "ml-s10-4",
    topic: "multimi-logica",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Câte numere întregi conține intervalul $[-4,4]$?",
    correctAnswer: "9",
    explanation: [
      "Intervalul $[-4,4]$ conține numerele întregi $-4,-3,-2,-1,0,1,2,3,4$.",
      "Sunt $9$ numere.",
    ],
  },
  {
    id: "ml-s10-5",
    topic: "multimi-logica",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Propoziția „$9$ este pătrat perfect” este:",
    options: ["adevărată", "falsă", "nu este propoziție", "depinde de context"],
    correctAnswer: "adevărată",
    explanation: [
      "$9=3^2$, deci $9$ este pătrat perfect — propoziția este adevărată.",
    ],
  },
  {
    id: "ml-s10-6",
    topic: "multimi-logica",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Propoziția „$\\forall x\\in\\mathbb{N}, x^2\\geq x$” este:",
    options: ["adevărată", "falsă", "adevărată doar pentru $x\\geq2$", "nu se poate determina"],
    correctAnswer: "adevărată",
    explanation: [
      "Pentru $x=0$: $0\\geq0$; pentru $x=1$: $1\\geq1$; pentru $x\\geq2$: $x^2$ crește mai repede decât $x$.",
      "Inegalitatea este adevărată pentru orice număr natural $x$.",
    ],
  },
  {
    id: "ml-s10-7",
    topic: "multimi-logica",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Conform legilor lui De Morgan, negația propoziției $p\\wedge q$ este:",
    options: ["$\\overline{p}\\vee\\overline{q}$", "$\\overline{p}\\wedge\\overline{q}$", "$p\\vee q$", "$p\\wedge\\overline{q}$"],
    correctAnswer: "$\\overline{p}\\vee\\overline{q}$",
    explanation: [
      "Legea lui De Morgan: negația unei conjuncții este disjuncția negațiilor.",
    ],
  },
  {
    id: "ml-s10-8",
    topic: "multimi-logica",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Implicația $p\\Rightarrow q$, atunci când $p$ este falsă, este:",
    options: [
      "întotdeauna adevărată",
      "întotdeauna falsă",
      "adevărată doar dacă $q$ este adevărată",
      "nu se poate determina fără a cunoaște $q$",
    ],
    correctAnswer: "întotdeauna adevărată",
    explanation: [
      "Implicația este falsă doar când ipoteza este adevărată și concluzia falsă; dacă ipoteza ($p$) este falsă, implicația este automat adevărată, indiferent de $q$.",
    ],
  },
  {
    id: "ml-s10-9",
    topic: "multimi-logica",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Folosind formula $1+2+\\cdots+n=\\dfrac{n(n+1)}{2}$, calculați suma $1+2+\\cdots+12$.",
    correctAnswer: "78",
    explanation: [
      "Aplicăm formula cu $n=12$: suma este $\\dfrac{12\\cdot13}{2}$.",
      "Calculăm: $\\dfrac{156}{2}=78$.",
    ],
  },
  {
    id: "ml-s10-10",
    topic: "multimi-logica",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele afirmații este adevărată?",
    options: [
      "Mulțimea vidă este submulțime a oricărei mulțimi",
      "Orice propoziție este și adevărată și falsă",
      "Inducția matematică se aplică mulțimii numerelor reale",
      "Reuniunea a două mulțimi disjuncte este întotdeauna mulțimea vidă",
    ],
    correctAnswer: "Mulțimea vidă este submulțime a oricărei mulțimi",
    explanation: [
      "Aceasta este o proprietate fundamentală a incluziunii de mulțimi, adevărată pentru orice mulțime.",
      "Celelalte trei afirmații sunt false: o propoziție are o singură valoare de adevăr; inducția se aplică numerelor naturale, nu reale; reuniunea a două mulțimi disjuncte conține toate elementele lor, nu este vidă (decât dacă ambele sunt vide).",
    ],
  },
```

- [ ] **Step 2: Run data integrity test** — `npx vitest run src/data/index.test.ts`, expect PASS.
- [ ] **Step 3: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises.
- [ ] **Step 4: Verify no stray BOM.**
- [ ] **Step 5: Verify the file has exactly 100 exercises across 10 sets**

Run: `grep -c '"set:' src/data/questions/multimiLogicaSets.ts` — this may not match if formatting differs; more reliably run `grep -c "topic: \"multimi-logica\"" src/data/questions/multimiLogicaSets.ts` — expected output: `100`. Also run `grep -c "set: 1,$" src/data/questions/multimiLogicaSets.ts` through `grep -c "set: 10,$" src/data/questions/multimiLogicaSets.ts` (adjust pattern as needed for exact formatting) to confirm each of the 10 sets has exactly 10 exercises.

- [ ] **Step 6: Run typecheck and build**

Run: `npm run typecheck` — expect exit 0.
Run: `npm run build` — expect exit 0.

- [ ] **Step 7: Run the full test suite**

Run: `npm test` — expect all test files pass.

- [ ] **Step 8: Commit**

```bash
git add src/data/questions/multimiLogicaSets.ts
git commit -m "Add practice Set 10 (Recapitulare) — completes Mulțimi și logică matematică practice bank"
```
