# Funcții Exponențiale și Logaritmice Practice Sets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 100-exercise practice-set bank (10 sets × 10 exercises) for the `functii-exponentiale-logaritmice` (Funcții putere, radical, exponențială și logaritmică) topic, matching the convention already shipped for `multimi-logica`, `functia-gradul-1`, `functia-gradul-2`, `siruri`, and `puteri-radicali-logaritmi`.

**Architecture:** One new file, `src/data/questions/functiiExponentialeLogaritmiceSets.ts`, exporting `functiiExponentialeLogaritmiceSetExercises: Exercise[]` (100 objects). Wired into `ALL_EXERCISES` in `src/data/index.ts` with a single import + spread (done once, in Task 1). Every other task only appends to `functiiExponentialeLogaritmiceSets.ts`.

**Tech Stack:** TypeScript, Vite, Vitest. No new dependencies.

## Global Constraints

- Base commit: `0c4a30d` (design spec committed; baseline 40/40 tests passing).
- Exercise ids: `fe-s<SET>-<N>` (e.g. `fe-s1-1`, `fe-s10-10`) — note the base exercises use prefix `fe`, and set exercises follow the same `fe` prefix with an `s<N>-` infix.
- Every exercise: `topic: "functii-exponentiale-logaritmice"`, `points: 6`, `set: <1..10>`.
- `type` is `"input"` or `"mcq"`. For `mcq`, `correctAnswer` must be character-for-character present in `options`, and all 4 options must be genuinely distinct claims/values (not reworded restatements of the same value, and NOT algebraically/logically equal under the problem's stated domain — a Minor finding from a prior round's `puteri-radicali-logaritmi-sets` involved two mcq options that were secretly equal; double-check this especially for injectivity/bijectivity and equation-solving mcqs in this round).
- Inline LaTeX only (`$...$`), never display math (`$$...$$`).
- **LaTeX escaping (Critical):** every LaTeX command in a TS string literal needs a double backslash (`\\log`, `\\dfrac`, `\\left`, `\\right`, `\\Rightarrow`, `\\mathbb`, `\\neq`, `\\mapsto`) because the string is parsed once by the TS/JS compiler before KaTeX ever sees it. A single backslash silently drops or corrupts the command and is invisible to the test suite. Before every commit: run `git diff --stat` (expect 0 deletions — this is a pure append) and a mojibake-marker scan (see Step 2 in every task below). Never use an external script (Python/sed/etc.) to generate or edit file content — use the file-editing tool directly.
- **Answer-variety discipline:** within each 10-exercise set, all `input`-type numeric `correctAnswer` values must be pairwise distinct. Already designed into every set below — do not let a transcription slip collapse two into the same value.
- **Content-duplication discipline (vs. base exercises):** none of the 100 exercises below duplicate the numeric parameters/expressions of the 7 existing base exercises (`fe-1`..`fe-7` in `src/data/questions/functiiExponentialeLogaritmice.ts`) — already checked during plan-writing via a script (see Task 10, Step 6a). Do not substitute different numbers than the ones given in each task's code block.
- **Cross-set duplication discipline:** a prior round (`siruri-sets`) shipped two pairs of exercises with byte-identical parameters and answers, reused verbatim across two different sets; another round (`puteri-radicali-logaritmi-sets`) still had one base-exercise duplicate slip through despite a cross-set-only scan, because the base-exercise check was only manually claimed rather than scripted. This plan's 100 exercises were explicitly cross-checked against each other AND against the 7 base exercises at plan-writing time — do not substitute different numbers than the ones given, since that could reintroduce a collision the plan-writing pass already ruled out.
- **Romanian spelling:** proofread Romanian mathematical terminology as you transcribe (a prior round's final review caught a misspelling — "abciselor" instead of "absciselor" — that no automated check could see). Terms used here: exponențială, logaritmică, injectivă/injectivitate, surjectivă/surjectivitate, bijectivă/bijectivitate, crescătoare/descrescătoare, raționalizare (not used here but adjacent vocabulary), substituție.
- No changes to `src/data/theory/functiiExponentialeLogaritmice.ts` or the existing 7 base exercises in `src/data/questions/functiiExponentialeLogaritmice.ts`. No changes to `examVariants.ts`. No new `Topic` entries.

---

### Task 1: Set 1 (Funcția putere și funcția radical) + create file + wire index.ts

**Files:**
- Create: `src/data/questions/functiiExponentialeLogaritmiceSets.ts`
- Modify: `src/data/index.ts`

**Interfaces:**
- Consumes: `Exercise` type from `../../types` (see `src/data/questions/functiiExponentialeLogaritmice.ts` for the exact import path pattern to copy).
- Produces: `functiiExponentialeLogaritmiceSetExercises: Exercise[]`, imported and spread into `ALL_EXERCISES` in `src/data/index.ts`.

- [ ] **Step 1: Create the file with Set 1's 10 exercises**

Create `src/data/questions/functiiExponentialeLogaritmiceSets.ts` with exactly this content:

```ts
import type { Exercise } from "../../types";

export const functiiExponentialeLogaritmiceSetExercises: Exercise[] = [
  // Set 1 — Funcția putere și funcția radical
  {
    id: "fe-s1-1",
    topic: "functii-exponentiale-logaritmice",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Calculați $f(3)$ pentru $f(x)=x^4$.",
    correctAnswer: "81",
    explanation: [
      "Înlocuim $x=3$ în $f(x)=x^4$: $f(3)=3^4=81$.",
    ],
  },
  {
    id: "fe-s1-2",
    topic: "functii-exponentiale-logaritmice",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Calculați $f(-2)$ pentru $f(x)=x^3$.",
    correctAnswer: "-8",
    explanation: [
      "Înlocuim $x=-2$ în $f(x)=x^3$: $f(-2)=(-2)^3=-8$.",
    ],
  },
  {
    id: "fe-s1-3",
    topic: "functii-exponentiale-logaritmice",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Calculați $f(16)$ pentru $f(x)=\\sqrt[4]{x}$.",
    correctAnswer: "2",
    explanation: [
      "Căutăm numărul care ridicat la puterea $4$ dă $16$.",
      "Cum $2^4=16$, rezultă $f(16)=2$.",
    ],
  },
  {
    id: "fe-s1-4",
    topic: "functii-exponentiale-logaritmice",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Calculați $f(-27)$ pentru $f(x)=\\sqrt[3]{x}$.",
    correctAnswer: "-3",
    explanation: [
      "Căutăm numărul care ridicat la puterea $3$ dă $-27$.",
      "Cum $(-3)^3=-27$, rezultă $f(-27)=-3$.",
    ],
  },
  {
    id: "fe-s1-5",
    topic: "functii-exponentiale-logaritmice",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Domeniul funcției $f(x)=\\sqrt[4]{x}$ este:",
    options: ["$[0,+\\infty)$", "$\\mathbb{R}$", "$(0,+\\infty)$", "$(-\\infty,0]$"],
    correctAnswer: "$[0,+\\infty)$",
    explanation: [
      "Cum $4$ este par, domeniul funcției radical de ordin $4$ este $[0,+\\infty)$.",
    ],
  },
  {
    id: "fe-s1-6",
    topic: "functii-exponentiale-logaritmice",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Domeniul funcției $f(x)=\\sqrt[5]{x}$ este:",
    options: ["$\\mathbb{R}$", "$[0,+\\infty)$", "$(0,+\\infty)$", "$\\{0\\}$"],
    correctAnswer: "$\\mathbb{R}$",
    explanation: [
      "Cum $5$ este impar, domeniul funcției radical de ordin $5$ este $\\mathbb{R}$.",
    ],
  },
  {
    id: "fe-s1-7",
    topic: "functii-exponentiale-logaritmice",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Calculați $f(5)$ pentru $f(x)=x^2$.",
    correctAnswer: "25",
    explanation: [
      "Înlocuim $x=5$ în $f(x)=x^2$: $f(5)=5^2=25$.",
    ],
  },
  {
    id: "fe-s1-8",
    topic: "functii-exponentiale-logaritmice",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Calculați $f(64)$ pentru $f(x)=\\sqrt[3]{x}$.",
    correctAnswer: "4",
    explanation: [
      "Căutăm numărul care ridicat la puterea $3$ dă $64$.",
      "Cum $4^3=64$, rezultă $f(64)=4$.",
    ],
  },
  {
    id: "fe-s1-9",
    topic: "functii-exponentiale-logaritmice",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Câte soluții reale are ecuația $x^4=16$?",
    options: ["$2$", "$1$", "$4$", "$0$"],
    correctAnswer: "$2$",
    explanation: [
      "Ecuația $x^4=16$ are soluțiile $x=2$ și $x=-2$, deci $2$ soluții reale.",
    ],
  },
  {
    id: "fe-s1-10",
    topic: "functii-exponentiale-logaritmice",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Calculați $f(-1)$ pentru $f(x)=x^5$.",
    correctAnswer: "-1",
    explanation: [
      "Înlocuim $x=-1$ în $f(x)=x^5$: $f(-1)=(-1)^5=-1$.",
    ],
  },
];
```

- [ ] **Step 2: Run the two encoding-safety checks.**

```bash
git diff --stat
node -e "const c=require('fs').readFileSync('src/data/questions/functiiExponentialeLogaritmiceSets.ts','utf8'); console.log('A-tilde:',c.includes(String.fromCharCode(196)),'E-grave-marker:',c.includes(String.fromCharCode(200)),'A-tilde2:',c.includes(String.fromCharCode(195)))"
```
Expect: the file is new (no deletions possible); the three markers all print `false`.

- [ ] **Step 3: Wire into `src/data/index.ts`**

Add this import line immediately after the existing `import { functiiExponentialeLogaritmiceExercises } from "./questions/functiiExponentialeLogaritmice";` line:

```ts
import { functiiExponentialeLogaritmiceSetExercises } from "./questions/functiiExponentialeLogaritmiceSets";
```

Add this spread line immediately after the existing `...functiiExponentialeLogaritmiceExercises,` line inside `ALL_EXERCISES`:

```ts
  ...functiiExponentialeLogaritmiceSetExercises,
```

- [ ] **Step 4: Run data integrity test** — expect PASS.

```bash
npm test
```

- [ ] **Step 5: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises — use `node -e "..."` with `fs.readFileSync` to print `JSON.stringify` of substrings around `\\sqrt`, confirming each is a literal double backslash followed by the command name in the source text.

- [ ] **Step 6: Verify no stray BOM.**

```bash
head -c 20 src/data/questions/functiiExponentialeLogaritmiceSets.ts | xxd
```
Expect first bytes NOT `ef bb bf`.

- [ ] **Step 7: Run the full test suite.**

```bash
npm test
```
Expect all test files pass (~40 tests).

- [ ] **Step 8: Check for stray untracked files** (`git status --short`) and delete any before committing — a prior round's implementer left an untracked test-output file that had to be cleaned up.

- [ ] **Step 9: Commit**

```bash
git add src/data/questions/functiiExponentialeLogaritmiceSets.ts src/data/index.ts
git commit -m "Add practice Set 1 (Functia putere si functia radical) for Functii exponentiale si logaritmice"
```

---

### Task 2: Set 2 (Funcția exponențială — proprietăți)

**Files:**
- Modify: `src/data/questions/functiiExponentialeLogaritmiceSets.ts`

**Interfaces:**
- Consumes: the file from Task 1.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 2's 10 exercises**

```ts
  // Set 2 — Funcția exponențială — proprietăți
  {
    id: "fe-s2-1",
    topic: "functii-exponentiale-logaritmice",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Funcția $f(x)=5^x$ este:",
    options: [
      "strict crescătoare pe $\\mathbb{R}$",
      "strict descrescătoare pe $\\mathbb{R}$",
      "constantă",
      "definită doar pentru $x>0$",
    ],
    correctAnswer: "strict crescătoare pe $\\mathbb{R}$",
    explanation: [
      "Baza este $a=5>1$, deci funcția exponențială este strict crescătoare pe $\\mathbb{R}$.",
    ],
  },
  {
    id: "fe-s2-2",
    topic: "functii-exponentiale-logaritmice",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Funcția $f(x)=\\left(\\dfrac13\\right)^x$ este:",
    options: [
      "strict descrescătoare pe $\\mathbb{R}$",
      "strict crescătoare pe $\\mathbb{R}$",
      "constantă",
      "definită doar pentru $x>0$",
    ],
    correctAnswer: "strict descrescătoare pe $\\mathbb{R}$",
    explanation: [
      "Baza este $a=\\dfrac13$, cu $0<a<1$, deci funcția este strict descrescătoare pe $\\mathbb{R}$.",
    ],
  },
  {
    id: "fe-s2-3",
    topic: "functii-exponentiale-logaritmice",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Calculați $f(0)$ pentru $f(x)=7^x$.",
    correctAnswer: "1",
    explanation: [
      "Orice bază ridicată la puterea $0$ este $1$: $f(0)=7^0=1$.",
    ],
  },
  {
    id: "fe-s2-4",
    topic: "functii-exponentiale-logaritmice",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Calculați $f(2)$ pentru $f(x)=3^x$.",
    correctAnswer: "9",
    explanation: [
      "Înlocuim $x=2$: $f(2)=3^2=9$.",
    ],
  },
  {
    id: "fe-s2-5",
    topic: "functii-exponentiale-logaritmice",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Calculați $f(1)$ pentru $f(x)=4^x$.",
    correctAnswer: "4",
    explanation: [
      "Înlocuim $x=1$: $f(1)=4^1=4$.",
    ],
  },
  {
    id: "fe-s2-6",
    topic: "functii-exponentiale-logaritmice",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Care dintre funcțiile următoare este strict descrescătoare pe $\\mathbb{R}$?",
    options: [
      "$\\left(\\dfrac23\\right)^x$",
      "$2^x$",
      "$5^x$",
      "$\\left(\\dfrac32\\right)^x$",
    ],
    correctAnswer: "$\\left(\\dfrac23\\right)^x$",
    explanation: [
      "Doar baza $\\dfrac23$ satisface $0<a<1$, deci doar această funcție este strict descrescătoare.",
    ],
  },
  {
    id: "fe-s2-7",
    topic: "functii-exponentiale-logaritmice",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Calculați $f(3)$ pentru $f(x)=2^x$.",
    correctAnswer: "8",
    explanation: [
      "Înlocuim $x=3$: $f(3)=2^3=8$.",
    ],
  },
  {
    id: "fe-s2-8",
    topic: "functii-exponentiale-logaritmice",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Calculați $f(5)$ pentru $f(x)=2^x$.",
    correctAnswer: "32",
    explanation: [
      "Înlocuim $x=5$: $f(5)=2^5=32$.",
    ],
  },
  {
    id: "fe-s2-9",
    topic: "functii-exponentiale-logaritmice",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Graficul funcției $f(x)=a^x$ cu $0<a<1$ este situat:",
    options: [
      "deasupra axei $Ox$",
      "sub axa $Ox$",
      "intersectează axa $Ox$",
      "este axa $Ox$",
    ],
    correctAnswer: "deasupra axei $Ox$",
    explanation: [
      "Pentru orice $a>0$, avem $a^x>0$ pentru orice $x$, deci graficul este situat deasupra axei $Ox$.",
    ],
  },
  {
    id: "fe-s2-10",
    topic: "functii-exponentiale-logaritmice",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Calculați $f(2)$ pentru $f(x)=10^x$.",
    correctAnswer: "100",
    explanation: [
      "Înlocuim $x=2$: $f(2)=10^2=100$.",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises.
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Run the full test suite.**
- [ ] **Step 7: Check for stray untracked files** (`git status --short`) and delete any before committing.
- [ ] **Step 8: Commit**

```bash
git add src/data/questions/functiiExponentialeLogaritmiceSets.ts
git commit -m "Add practice Set 2 (Functia exponentiala - proprietati) for Functii exponentiale si logaritmice"
```

---

### Task 3: Set 3 (Funcția logaritmică — proprietăți)

**Files:**
- Modify: `src/data/questions/functiiExponentialeLogaritmiceSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–2.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 3's 10 exercises**

```ts
  // Set 3 — Funcția logaritmică — proprietăți
  {
    id: "fe-s3-1",
    topic: "functii-exponentiale-logaritmice",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Funcția $f(x)=\\log_3 x$ este:",
    options: [
      "strict crescătoare pe $(0,+\\infty)$",
      "strict descrescătoare pe $(0,+\\infty)$",
      "constantă",
      "definită pe $\\mathbb{R}$",
    ],
    correctAnswer: "strict crescătoare pe $(0,+\\infty)$",
    explanation: [
      "Baza este $a=3>1$, deci funcția logaritmică este strict crescătoare pe $(0,+\\infty)$.",
    ],
  },
  {
    id: "fe-s3-2",
    topic: "functii-exponentiale-logaritmice",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Funcția $f(x)=\\log_{1/4} x$ este:",
    options: [
      "strict descrescătoare pe $(0,+\\infty)$",
      "strict crescătoare pe $(0,+\\infty)$",
      "constantă",
      "definită pe $\\mathbb{R}$",
    ],
    correctAnswer: "strict descrescătoare pe $(0,+\\infty)$",
    explanation: [
      "Baza este $a=\\dfrac14$, cu $0<a<1$, deci funcția este strict descrescătoare pe $(0,+\\infty)$.",
    ],
  },
  {
    id: "fe-s3-3",
    topic: "functii-exponentiale-logaritmice",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Calculați $f(1)$ pentru $f(x)=\\log_5 x$.",
    correctAnswer: "0",
    explanation: [
      "$\\log_5 1=0$, deoarece $5^0=1$.",
    ],
  },
  {
    id: "fe-s3-4",
    topic: "functii-exponentiale-logaritmice",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Calculați $f(25)$ pentru $f(x)=\\log_5 x$.",
    correctAnswer: "2",
    explanation: [
      "Căutăm exponentul $y$ astfel încât $5^y=25$.",
      "Cum $5^2=25$, rezultă $f(25)=2$.",
    ],
  },
  {
    id: "fe-s3-5",
    topic: "functii-exponentiale-logaritmice",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Calculați $f(8)$ pentru $f(x)=\\log_2 x$.",
    correctAnswer: "3",
    explanation: [
      "Căutăm exponentul $y$ astfel încât $2^y=8$.",
      "Cum $2^3=8$, rezultă $f(8)=3$.",
    ],
  },
  {
    id: "fe-s3-6",
    topic: "functii-exponentiale-logaritmice",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Graficul funcției $f(x)=\\log_a x$ (cu $a>0$, $a\\neq1$) trece prin punctul:",
    options: ["$(1,0)$", "$(0,1)$", "$(0,0)$", "$(1,1)$"],
    correctAnswer: "$(1,0)$",
    explanation: [
      "$\\log_a 1=0$ pentru orice bază $a$, deci graficul trece prin punctul $(1,0)$.",
    ],
  },
  {
    id: "fe-s3-7",
    topic: "functii-exponentiale-logaritmice",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Calculați $f(81)$ pentru $f(x)=\\log_3 x$.",
    correctAnswer: "4",
    explanation: [
      "Căutăm exponentul $y$ astfel încât $3^y=81$.",
      "Cum $3^4=81$, rezultă $f(81)=4$.",
    ],
  },
  {
    id: "fe-s3-8",
    topic: "functii-exponentiale-logaritmice",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Domeniul de definiție al funcției $f(x)=\\log_a x$ este:",
    options: ["$(0,+\\infty)$", "$\\mathbb{R}$", "$[0,+\\infty)$", "$(-\\infty,0)$"],
    correctAnswer: "$(0,+\\infty)$",
    explanation: [
      "Funcția logaritmică este definită doar pentru argumente strict pozitive.",
    ],
  },
  {
    id: "fe-s3-9",
    topic: "functii-exponentiale-logaritmice",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Calculați $f(100000)$ pentru $f(x)=\\log_{10} x$.",
    correctAnswer: "5",
    explanation: [
      "Căutăm exponentul $y$ astfel încât $10^y=100000$.",
      "Cum $10^5=100000$, rezultă $f(100000)=5$.",
    ],
  },
  {
    id: "fe-s3-10",
    topic: "functii-exponentiale-logaritmice",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Care dintre funcțiile următoare este strict crescătoare pe $(0,+\\infty)$?",
    options: [
      "$\\log_7 x$",
      "$\\log_{1/5} x$",
      "$\\log_{0{,}3} x$",
      "$\\log_{1/9} x$",
    ],
    correctAnswer: "$\\log_7 x$",
    explanation: [
      "Doar baza $7$ satisface $a>1$, deci doar această funcție este strict crescătoare.",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises.
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Run the full test suite.**
- [ ] **Step 7: Check for stray untracked files** (`git status --short`) and delete any before committing.
- [ ] **Step 8: Commit**

```bash
git add src/data/questions/functiiExponentialeLogaritmiceSets.ts
git commit -m "Add practice Set 3 (Functia logaritmica - proprietati) for Functii exponentiale si logaritmice"
```

---

### Task 4: Set 4 (Injectivitate, surjectivitate, bijectivitate)

**Files:**
- Modify: `src/data/questions/functiiExponentialeLogaritmiceSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–3.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 4's 10 exercises**

```ts
  // Set 4 — Injectivitate, surjectivitate, bijectivitate
  {
    id: "fe-s4-1",
    topic: "functii-exponentiale-logaritmice",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "O funcție $f$ este injectivă dacă:",
    options: [
      "$f(x_1)=f(x_2)\\Rightarrow x_1=x_2$, pentru orice $x_1,x_2$ din domeniu",
      "pentru orice $y$ din codomeniu există $x$ cu $f(x)=y$",
      "$f$ este atât injectivă, cât și surjectivă",
      "$f(x_1)=f(x_2)$ pentru $x_1\\neq x_2$",
    ],
    correctAnswer: "$f(x_1)=f(x_2)\\Rightarrow x_1=x_2$, pentru orice $x_1,x_2$ din domeniu",
    explanation: [
      "Aceasta este definiția injectivității unei funcții.",
    ],
  },
  {
    id: "fe-s4-2",
    topic: "functii-exponentiale-logaritmice",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "O funcție $f:A\\to B$ este surjectivă dacă:",
    options: [
      "pentru orice $y\\in B$ există $x\\in A$ astfel încât $f(x)=y$",
      "$f(x_1)=f(x_2)\\Rightarrow x_1=x_2$",
      "$f$ este atât injectivă, cât și surjectivă",
      "$f$ este definită pe toată mulțimea $A$",
    ],
    correctAnswer: "pentru orice $y\\in B$ există $x\\in A$ astfel încât $f(x)=y$",
    explanation: [
      "Aceasta este definiția surjectivității unei funcții.",
    ],
  },
  {
    id: "fe-s4-3",
    topic: "functii-exponentiale-logaritmice",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "O funcție bijectivă este:",
    options: [
      "atât injectivă, cât și surjectivă",
      "doar injectivă",
      "doar surjectivă",
      "nici injectivă, nici surjectivă",
    ],
    correctAnswer: "atât injectivă, cât și surjectivă",
    explanation: [
      "Aceasta este definiția bijectivității: o funcție bijectivă este simultan injectivă și surjectivă.",
    ],
  },
  {
    id: "fe-s4-4",
    topic: "functii-exponentiale-logaritmice",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Funcția $f(x)=3^x$, $f:\\mathbb{R}\\to(0,+\\infty)$ este:",
    options: ["bijectivă", "doar injectivă", "doar surjectivă", "nici injectivă, nici surjectivă"],
    correctAnswer: "bijectivă",
    explanation: [
      "Funcția exponențială este strict monotonă (deci injectivă) și, restricționată la codomeniul $(0,+\\infty)$, este surjectivă. Este deci bijectivă.",
    ],
  },
  {
    id: "fe-s4-5",
    topic: "functii-exponentiale-logaritmice",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Funcția $f(x)=x^2$, $f:\\mathbb{R}\\to\\mathbb{R}$ este:",
    options: [
      "nici injectivă, nici surjectivă",
      "injectivă",
      "surjectivă",
      "bijectivă",
    ],
    correctAnswer: "nici injectivă, nici surjectivă",
    explanation: [
      "Nu este injectivă, deoarece $f(1)=f(-1)=1$ cu $1\\neq-1$.",
      "Nu este surjectivă pe $\\mathbb{R}$, deoarece valorile negative nu sunt atinse.",
    ],
  },
  {
    id: "fe-s4-6",
    topic: "functii-exponentiale-logaritmice",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Găsiți o valoare $x_2\\neq2$ astfel încât $f(x_2)=f(2)$ pentru $f(x)=x^2$ (demonstrând că $f$ nu este injectivă pe $\\mathbb{R}$).",
    correctAnswer: "-2",
    explanation: [
      "$f(2)=2^2=4$ și $f(-2)=(-2)^2=4$, deci $f(-2)=f(2)$ cu $-2\\neq2$.",
    ],
  },
  {
    id: "fe-s4-7",
    topic: "functii-exponentiale-logaritmice",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "O funcție inversabilă trebuie să fie:",
    options: ["bijectivă", "doar injectivă", "doar surjectivă", "continuă"],
    correctAnswer: "bijectivă",
    explanation: [
      "O funcție admite inversă dacă și numai dacă este bijectivă.",
    ],
  },
  {
    id: "fe-s4-8",
    topic: "functii-exponentiale-logaritmice",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Funcția $f(x)=\\log_2 x$, $f:(0,+\\infty)\\to\\mathbb{R}$ este:",
    options: ["bijectivă", "doar injectivă", "doar surjectivă", "nici injectivă, nici surjectivă"],
    correctAnswer: "bijectivă",
    explanation: [
      "Funcția logaritmică este strict monotonă (deci injectivă) și surjectivă pe $\\mathbb{R}$. Este deci bijectivă.",
    ],
  },
  {
    id: "fe-s4-9",
    topic: "functii-exponentiale-logaritmice",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Câte soluții $x$ diferite are ecuația $f(x)=1$ pentru $f(x)=x^2$?",
    correctAnswer: "2",
    explanation: [
      "Ecuația $x^2=1$ are soluțiile $x=1$ și $x=-1$, deci $2$ soluții diferite.",
    ],
  },
  {
    id: "fe-s4-10",
    topic: "functii-exponentiale-logaritmice",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Funcția $f(x)=x^3$, $f:\\mathbb{R}\\to\\mathbb{R}$ este:",
    options: ["bijectivă", "doar injectivă", "doar surjectivă", "nici injectivă, nici surjectivă"],
    correctAnswer: "bijectivă",
    explanation: [
      "Funcția $f(x)=x^3$ este strict crescătoare pe $\\mathbb{R}$ (deci injectivă) și ia toate valorile reale (deci surjectivă). Este deci bijectivă.",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises.
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Run the full test suite.**
- [ ] **Step 7: Check for stray untracked files** (`git status --short`) and delete any before committing.
- [ ] **Step 8: Commit**

```bash
git add src/data/questions/functiiExponentialeLogaritmiceSets.ts
git commit -m "Add practice Set 4 (Injectivitate surjectivitate bijectivitate) for Functii exponentiale si logaritmice"
```

---

### Task 5: Set 5 (Ecuații exponențiale simple)

**Files:**
- Modify: `src/data/questions/functiiExponentialeLogaritmiceSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–4.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 5's 10 exercises**

```ts
  // Set 5 — Ecuații exponențiale simple
  {
    id: "fe-s5-1",
    topic: "functii-exponentiale-logaritmice",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $2^{x+3}=32$ și scrieți valoarea lui $x$.",
    correctAnswer: "2",
    explanation: [
      "Scriem $32$ ca putere a lui $2$: $32=2^5$.",
      "Ecuația devine $2^{x+3}=2^5$.",
      "Folosind injectivitatea: $x+3=5 \\Rightarrow x=2$.",
    ],
  },
  {
    id: "fe-s5-2",
    topic: "functii-exponentiale-logaritmice",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $5^{2x+1}=125$ și scrieți valoarea lui $x$.",
    correctAnswer: "1",
    explanation: [
      "Scriem $125$ ca putere a lui $5$: $125=5^3$.",
      "Ecuația devine $5^{2x+1}=5^3$.",
      "Folosind injectivitatea: $2x+1=3 \\Rightarrow x=1$.",
    ],
  },
  {
    id: "fe-s5-3",
    topic: "functii-exponentiale-logaritmice",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $4^{x-2}=64$ și scrieți valoarea lui $x$.",
    correctAnswer: "5",
    explanation: [
      "Scriem $64$ ca putere a lui $4$: $64=4^3$.",
      "Ecuația devine $4^{x-2}=4^3$.",
      "Folosind injectivitatea: $x-2=3 \\Rightarrow x=5$.",
    ],
  },
  {
    id: "fe-s5-4",
    topic: "functii-exponentiale-logaritmice",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Soluția ecuației $7^{3x}=343$ este:",
    options: ["$1$", "$3$", "$\\dfrac13$", "$7$"],
    correctAnswer: "$1$",
    explanation: [
      "$343=7^3$, deci $7^{3x}=7^3 \\Rightarrow 3x=3 \\Rightarrow x=1$.",
    ],
  },
  {
    id: "fe-s5-5",
    topic: "functii-exponentiale-logaritmice",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $6^{x-1}=36$ și scrieți valoarea lui $x$.",
    correctAnswer: "3",
    explanation: [
      "Scriem $36$ ca putere a lui $6$: $36=6^2$.",
      "Ecuația devine $6^{x-1}=6^2$.",
      "Folosind injectivitatea: $x-1=2 \\Rightarrow x=3$.",
    ],
  },
  {
    id: "fe-s5-6",
    topic: "functii-exponentiale-logaritmice",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $2^{x-4}=4$ și scrieți valoarea lui $x$.",
    correctAnswer: "6",
    explanation: [
      "Scriem $4$ ca putere a lui $2$: $4=2^2$.",
      "Ecuația devine $2^{x-4}=2^2$.",
      "Folosind injectivitatea: $x-4=2 \\Rightarrow x=6$.",
    ],
  },
  {
    id: "fe-s5-7",
    topic: "functii-exponentiale-logaritmice",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $5^{x+3}=25$ și scrieți valoarea lui $x$.",
    correctAnswer: "-1",
    explanation: [
      "Scriem $25$ ca putere a lui $5$: $25=5^2$.",
      "Ecuația devine $5^{x+3}=5^2$.",
      "Folosind injectivitatea: $x+3=2 \\Rightarrow x=-1$.",
    ],
  },
  {
    id: "fe-s5-8",
    topic: "functii-exponentiale-logaritmice",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Ecuația $a^{f(x)}=a^{g(x)}$ (cu $a>0$, $a\\neq1$) este echivalentă cu:",
    options: [
      "$f(x)=g(x)$",
      "$f(x)=-g(x)$",
      "$f(x)\\cdot g(x)=1$",
      "nu se poate rezolva",
    ],
    correctAnswer: "$f(x)=g(x)$",
    explanation: [
      "Folosind injectivitatea funcției exponențiale, ecuația $a^{f(x)}=a^{g(x)}$ este echivalentă cu $f(x)=g(x)$.",
    ],
  },
  {
    id: "fe-s5-9",
    topic: "functii-exponentiale-logaritmice",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $2^{x+1}=32$ și scrieți valoarea lui $x$.",
    correctAnswer: "4",
    explanation: [
      "Scriem $32$ ca putere a lui $2$: $32=2^5$.",
      "Ecuația devine $2^{x+1}=2^5$.",
      "Folosind injectivitatea: $x+1=5 \\Rightarrow x=4$.",
    ],
  },
  {
    id: "fe-s5-10",
    topic: "functii-exponentiale-logaritmice",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Soluția ecuației $3^{2x}=81$ este:",
    options: ["$2$", "$4$", "$\\dfrac12$", "$81$"],
    correctAnswer: "$2$",
    explanation: [
      "$81=3^4$, deci $3^{2x}=3^4 \\Rightarrow 2x=4 \\Rightarrow x=2$.",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises.
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Run the full test suite.**
- [ ] **Step 7: Check for stray untracked files** (`git status --short`) and delete any before committing.
- [ ] **Step 8: Commit**

```bash
git add src/data/questions/functiiExponentialeLogaritmiceSets.ts
git commit -m "Add practice Set 5 (Ecuatii exponentiale simple) for Functii exponentiale si logaritmice"
```

---

### Task 6: Set 6 (Ecuații exponențiale cu substituție)

**Files:**
- Modify: `src/data/questions/functiiExponentialeLogaritmiceSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–5.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 6's 10 exercises**

```ts
  // Set 6 — Ecuații exponențiale cu substituție
  {
    id: "fe-s6-1",
    topic: "functii-exponentiale-logaritmice",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $4^x-5\\cdot2^x+4=0$ (notați $t=2^x$); scrieți soluția mai mare pentru $x$.",
    correctAnswer: "2",
    explanation: [
      "Notăm $t=2^x$, $t>0$; ecuația devine $t^2-5t+4=0$.",
      "Factorizăm: $(t-4)(t-1)=0$, deci $t_1=4$ și $t_2=1$.",
      "Din $2^x=4$ obținem $x=2$; din $2^x=1$ obținem $x=0$.",
      "Soluția mai mare este $x=2$.",
    ],
  },
  {
    id: "fe-s6-2",
    topic: "functii-exponentiale-logaritmice",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $9^x-28\\cdot3^x+27=0$ (notați $t=3^x$); scrieți soluția mai mare pentru $x$.",
    correctAnswer: "3",
    explanation: [
      "Notăm $t=3^x$, $t>0$; ecuația devine $t^2-28t+27=0$.",
      "Factorizăm: $(t-27)(t-1)=0$, deci $t_1=27$ și $t_2=1$.",
      "Din $3^x=27$ obținem $x=3$; din $3^x=1$ obținem $x=0$.",
      "Soluția mai mare este $x=3$.",
    ],
  },
  {
    id: "fe-s6-3",
    topic: "functii-exponentiale-logaritmice",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $25^x-6\\cdot5^x+5=0$ (notați $t=5^x$); scrieți soluția mai mare pentru $x$.",
    correctAnswer: "1",
    explanation: [
      "Notăm $t=5^x$, $t>0$; ecuația devine $t^2-6t+5=0$.",
      "Factorizăm: $(t-5)(t-1)=0$, deci $t_1=5$ și $t_2=1$.",
      "Din $5^x=5$ obținem $x=1$; din $5^x=1$ obținem $x=0$.",
      "Soluția mai mare este $x=1$.",
    ],
  },
  {
    id: "fe-s6-4",
    topic: "functii-exponentiale-logaritmice",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Rezolvați ecuația $4^x-6\\cdot2^x+8=0$; soluția mai mare pentru $x$ este:",
    options: ["$2$", "$1$", "$4$", "$8$"],
    correctAnswer: "$2$",
    explanation: [
      "Notăm $t=2^x$; ecuația devine $t^2-6t+8=0$, cu soluțiile $t_1=4$, $t_2=2$.",
      "Din $2^x=4$ obținem $x=2$; din $2^x=2$ obținem $x=1$. Soluția mai mare este $x=2$.",
    ],
  },
  {
    id: "fe-s6-5",
    topic: "functii-exponentiale-logaritmice",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $4^x-17\\cdot2^x+16=0$ (notați $t=2^x$); scrieți soluția mai mare pentru $x$.",
    correctAnswer: "4",
    explanation: [
      "Notăm $t=2^x$, $t>0$; ecuația devine $t^2-17t+16=0$.",
      "Factorizăm: $(t-16)(t-1)=0$, deci $t_1=16$ și $t_2=1$.",
      "Din $2^x=16$ obținem $x=4$; din $2^x=1$ obținem $x=0$.",
      "Soluția mai mare este $x=4$.",
    ],
  },
  {
    id: "fe-s6-6",
    topic: "functii-exponentiale-logaritmice",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $4^x-33\\cdot2^x+32=0$ (notați $t=2^x$); scrieți soluția mai mare pentru $x$.",
    correctAnswer: "5",
    explanation: [
      "Notăm $t=2^x$, $t>0$; ecuația devine $t^2-33t+32=0$.",
      "Factorizăm: $(t-32)(t-1)=0$, deci $t_1=32$ și $t_2=1$.",
      "Din $2^x=32$ obținem $x=5$; din $2^x=1$ obținem $x=0$.",
      "Soluția mai mare este $x=5$.",
    ],
  },
  {
    id: "fe-s6-7",
    topic: "functii-exponentiale-logaritmice",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Pentru a rezolva ecuația $a^{2x}+b\\cdot a^x+c=0$, se face substituția:",
    options: [
      "$t=a^x$, $t>0$",
      "$t=a^{2x}$",
      "$t=2a^x$",
      "$t=a^x$, $t\\in\\mathbb{R}$",
    ],
    correctAnswer: "$t=a^x$, $t>0$",
    explanation: [
      "Se notează $t=a^x$; cum $a>0$, avem întotdeauna $t>0$, condiție esențială la validarea soluțiilor.",
    ],
  },
  {
    id: "fe-s6-8",
    topic: "functii-exponentiale-logaritmice",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $4^x-65\\cdot2^x+64=0$ (notați $t=2^x$); scrieți soluția mai mare pentru $x$.",
    correctAnswer: "6",
    explanation: [
      "Notăm $t=2^x$, $t>0$; ecuația devine $t^2-65t+64=0$.",
      "Factorizăm: $(t-64)(t-1)=0$, deci $t_1=64$ și $t_2=1$.",
      "Din $2^x=64$ obținem $x=6$; din $2^x=1$ obținem $x=0$.",
      "Soluția mai mare este $x=6$.",
    ],
  },
  {
    id: "fe-s6-9",
    topic: "functii-exponentiale-logaritmice",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $4^x-129\\cdot2^x+128=0$ (notați $t=2^x$); scrieți soluția mai mare pentru $x$.",
    correctAnswer: "7",
    explanation: [
      "Notăm $t=2^x$, $t>0$; ecuația devine $t^2-129t+128=0$.",
      "Factorizăm: $(t-128)(t-1)=0$, deci $t_1=128$ și $t_2=1$.",
      "Din $2^x=128$ obținem $x=7$; din $2^x=1$ obținem $x=0$.",
      "Soluția mai mare este $x=7$.",
    ],
  },
  {
    id: "fe-s6-10",
    topic: "functii-exponentiale-logaritmice",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Rezolvați ecuația $9^x-12\\cdot3^x+27=0$; soluția mai mare pentru $x$ este:",
    options: ["$2$", "$1$", "$3$", "$9$"],
    correctAnswer: "$2$",
    explanation: [
      "Notăm $t=3^x$; ecuația devine $t^2-12t+27=0$, cu $\\Delta=144-108=36$, deci $t_{1,2}=\\dfrac{12\\pm6}{2}$.",
      "Rezultă $t_1=9$, $t_2=3$. Din $3^x=9$ obținem $x=2$; din $3^x=3$ obținem $x=1$. Soluția mai mare este $x=2$.",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises.
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Run the full test suite.**
- [ ] **Step 7: Check for stray untracked files** (`git status --short`) and delete any before committing.
- [ ] **Step 8: Commit**

```bash
git add src/data/questions/functiiExponentialeLogaritmiceSets.ts
git commit -m "Add practice Set 6 (Ecuatii exponentiale cu substitutie) for Functii exponentiale si logaritmice"
```

---

### Task 7: Set 7 (Ecuații logaritmice simple)

**Files:**
- Modify: `src/data/questions/functiiExponentialeLogaritmiceSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–6.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 7's 10 exercises**

```ts
  // Set 7 — Ecuații logaritmice simple
  {
    id: "fe-s7-1",
    topic: "functii-exponentiale-logaritmice",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $\\log_2(x+3)=4$ și scrieți valoarea lui $x$.",
    correctAnswer: "13",
    explanation: [
      "Punem condiția $x+3>0$.",
      "Scriem ecuația echivalentă: $x+3=2^4=16$.",
      "Rezolvăm: $x=13$, care verifică condiția.",
    ],
  },
  {
    id: "fe-s7-2",
    topic: "functii-exponentiale-logaritmice",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $\\log_3(x-1)=2$ și scrieți valoarea lui $x$.",
    correctAnswer: "10",
    explanation: [
      "Punem condiția $x-1>0$.",
      "Scriem ecuația echivalentă: $x-1=3^2=9$.",
      "Rezolvăm: $x=10$, care verifică condiția.",
    ],
  },
  {
    id: "fe-s7-3",
    topic: "functii-exponentiale-logaritmice",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $\\log_4(3x+1)=2$ și scrieți valoarea lui $x$.",
    correctAnswer: "5",
    explanation: [
      "Punem condiția $3x+1>0$.",
      "Scriem ecuația echivalentă: $3x+1=4^2=16$.",
      "Rezolvăm: $3x=15 \\Rightarrow x=5$, care verifică condiția.",
    ],
  },
  {
    id: "fe-s7-4",
    topic: "functii-exponentiale-logaritmice",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Soluția ecuației $\\log_2(x-2)=3$ este:",
    options: ["$10$", "$8$", "$6$", "$5$"],
    correctAnswer: "$10$",
    explanation: [
      "$x-2=2^3=8 \\Rightarrow x=10$.",
    ],
  },
  {
    id: "fe-s7-5",
    topic: "functii-exponentiale-logaritmice",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $\\log_5(4x+1)=2$ și scrieți valoarea lui $x$.",
    correctAnswer: "6",
    explanation: [
      "Punem condiția $4x+1>0$.",
      "Scriem ecuația echivalentă: $4x+1=5^2=25$.",
      "Rezolvăm: $4x=24 \\Rightarrow x=6$, care verifică condiția.",
    ],
  },
  {
    id: "fe-s7-6",
    topic: "functii-exponentiale-logaritmice",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $\\log_2(x-5)=5$ și scrieți valoarea lui $x$.",
    correctAnswer: "37",
    explanation: [
      "Punem condiția $x-5>0$.",
      "Scriem ecuația echivalentă: $x-5=2^5=32$.",
      "Rezolvăm: $x=37$, care verifică condiția.",
    ],
  },
  {
    id: "fe-s7-7",
    topic: "functii-exponentiale-logaritmice",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Condiția de existență pentru $\\log_a f(x)$ (cu $a>0$, $a\\neq1$) este:",
    options: ["$f(x)>0$", "$f(x)\\geq0$", "$f(x)\\neq0$", "$f(x)<0$"],
    correctAnswer: "$f(x)>0$",
    explanation: [
      "Logaritmul este definit doar pentru argumente strict pozitive.",
    ],
  },
  {
    id: "fe-s7-8",
    topic: "functii-exponentiale-logaritmice",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $\\log_3(x+7)=3$ și scrieți valoarea lui $x$.",
    correctAnswer: "20",
    explanation: [
      "Punem condiția $x+7>0$.",
      "Scriem ecuația echivalentă: $x+7=3^3=27$.",
      "Rezolvăm: $x=20$, care verifică condiția.",
    ],
  },
  {
    id: "fe-s7-9",
    topic: "functii-exponentiale-logaritmice",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $\\log_2(3x-1)=3$ și scrieți valoarea lui $x$.",
    correctAnswer: "3",
    explanation: [
      "Punem condiția $3x-1>0$.",
      "Scriem ecuația echivalentă: $3x-1=2^3=8$.",
      "Rezolvăm: $3x=9 \\Rightarrow x=3$, care verifică condiția.",
    ],
  },
  {
    id: "fe-s7-10",
    topic: "functii-exponentiale-logaritmice",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Soluția ecuației $\\log_4(x+12)=2$ este:",
    options: ["$4$", "$16$", "$28$", "$3$"],
    correctAnswer: "$4$",
    explanation: [
      "$x+12=4^2=16 \\Rightarrow x=4$.",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises.
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Run the full test suite.**
- [ ] **Step 7: Check for stray untracked files** (`git status --short`) and delete any before committing.
- [ ] **Step 8: Commit**

```bash
git add src/data/questions/functiiExponentialeLogaritmiceSets.ts
git commit -m "Add practice Set 7 (Ecuatii logaritmice simple) for Functii exponentiale si logaritmice"
```

---

### Task 8: Set 8 (Ecuații logaritmice cu proprietăți)

**Files:**
- Modify: `src/data/questions/functiiExponentialeLogaritmiceSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–7.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 8's 10 exercises**

```ts
  // Set 8 — Ecuații logaritmice cu proprietăți
  {
    id: "fe-s8-1",
    topic: "functii-exponentiale-logaritmice",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $\\log_2(x)+\\log_2(x-1)=1$ (cu $x>1$) și scrieți valoarea lui $x$.",
    correctAnswer: "2",
    explanation: [
      "Aplicăm proprietatea $\\log_a m+\\log_a n=\\log_a(mn)$: $\\log_2\\left(x(x-1)\\right)=1$.",
      "Scriem ecuația echivalentă: $x(x-1)=2^1=2$, adică $x^2-x-2=0$.",
      "Factorizăm: $(x-2)(x+1)=0$, deci $x=2$ sau $x=-1$.",
      "Cum $x>1$, soluția este $x=2$.",
    ],
  },
  {
    id: "fe-s8-2",
    topic: "functii-exponentiale-logaritmice",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $\\log_2(x)-\\log_2(x-3)=2$ (cu $x>3$) și scrieți valoarea lui $x$.",
    correctAnswer: "4",
    explanation: [
      "Aplicăm proprietatea $\\log_a m-\\log_a n=\\log_a\\dfrac{m}{n}$: $\\log_2\\dfrac{x}{x-3}=2$.",
      "Scriem ecuația echivalentă: $\\dfrac{x}{x-3}=2^2=4$.",
      "Rezolvăm: $x=4(x-3)=4x-12 \\Rightarrow -3x=-12 \\Rightarrow x=4$, care verifică $x>3$.",
    ],
  },
  {
    id: "fe-s8-3",
    topic: "functii-exponentiale-logaritmice",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $\\log_3(x)+\\log_3(x-2)=1$ (cu $x>2$) și scrieți valoarea lui $x$.",
    correctAnswer: "3",
    explanation: [
      "Aplicăm proprietatea $\\log_a m+\\log_a n=\\log_a(mn)$: $\\log_3\\left(x(x-2)\\right)=1$.",
      "Scriem ecuația echivalentă: $x(x-2)=3^1=3$, adică $x^2-2x-3=0$.",
      "Factorizăm: $(x-3)(x+1)=0$, deci $x=3$ sau $x=-1$.",
      "Cum $x>2$, soluția este $x=3$.",
    ],
  },
  {
    id: "fe-s8-4",
    topic: "functii-exponentiale-logaritmice",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Soluția ecuației $\\log_2(x)-\\log_2(x-7)=3$ (cu $x>7$) este:",
    options: ["$8$", "$7$", "$14$", "$56$"],
    correctAnswer: "$8$",
    explanation: [
      "$\\log_2\\dfrac{x}{x-7}=3 \\Rightarrow \\dfrac{x}{x-7}=8 \\Rightarrow x=8x-56 \\Rightarrow x=8$.",
    ],
  },
  {
    id: "fe-s8-5",
    topic: "functii-exponentiale-logaritmice",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $\\log_5(x)+\\log_5(x-4)=1$ (cu $x>4$) și scrieți valoarea lui $x$.",
    correctAnswer: "5",
    explanation: [
      "Aplicăm proprietatea $\\log_a m+\\log_a n=\\log_a(mn)$: $\\log_5\\left(x(x-4)\\right)=1$.",
      "Scriem ecuația echivalentă: $x(x-4)=5^1=5$, adică $x^2-4x-5=0$.",
      "Factorizăm: $(x-5)(x+1)=0$, deci $x=5$ sau $x=-1$.",
      "Cum $x>4$, soluția este $x=5$.",
    ],
  },
  {
    id: "fe-s8-6",
    topic: "functii-exponentiale-logaritmice",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $\\log_7(x)-\\log_7(x-6)=1$ (cu $x>6$) și scrieți valoarea lui $x$.",
    correctAnswer: "7",
    explanation: [
      "Aplicăm proprietatea $\\log_a m-\\log_a n=\\log_a\\dfrac{m}{n}$: $\\log_7\\dfrac{x}{x-6}=1$.",
      "Scriem ecuația echivalentă: $\\dfrac{x}{x-6}=7^1=7$.",
      "Rezolvăm: $x=7(x-6)=7x-42 \\Rightarrow -6x=-42 \\Rightarrow x=7$, care verifică $x>6$.",
    ],
  },
  {
    id: "fe-s8-7",
    topic: "functii-exponentiale-logaritmice",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Pentru ecuația $\\log_a f(x)+\\log_a g(x)=c$, condiția de existență necesară este:",
    options: [
      "$f(x)>0$ și $g(x)>0$",
      "$f(x)>0$ sau $g(x)>0$",
      "$f(x)\\cdot g(x)>0$",
      "nu este necesară nicio condiție",
    ],
    correctAnswer: "$f(x)>0$ și $g(x)>0$",
    explanation: [
      "Fiecare logaritm din sumă trebuie să aibă argumentul strict pozitiv, deci ambele condiții trebuie îndeplinite simultan.",
    ],
  },
  {
    id: "fe-s8-8",
    topic: "functii-exponentiale-logaritmice",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $\\log_2(x)+\\log_2(x-15)=4$ (cu $x>15$) și scrieți valoarea lui $x$.",
    correctAnswer: "16",
    explanation: [
      "Aplicăm proprietatea $\\log_a m+\\log_a n=\\log_a(mn)$: $\\log_2\\left(x(x-15)\\right)=4$.",
      "Scriem ecuația echivalentă: $x(x-15)=2^4=16$, adică $x^2-15x-16=0$.",
      "Factorizăm: $(x-16)(x+1)=0$, deci $x=16$ sau $x=-1$.",
      "Cum $x>15$, soluția este $x=16$.",
    ],
  },
  {
    id: "fe-s8-9",
    topic: "functii-exponentiale-logaritmice",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $\\log_3(x)+\\log_3(x-8)=2$ (cu $x>8$) și scrieți valoarea lui $x$.",
    correctAnswer: "9",
    explanation: [
      "Aplicăm proprietatea $\\log_a m+\\log_a n=\\log_a(mn)$: $\\log_3\\left(x(x-8)\\right)=2$.",
      "Scriem ecuația echivalentă: $x(x-8)=3^2=9$, adică $x^2-8x-9=0$.",
      "Factorizăm: $(x-9)(x+1)=0$, deci $x=9$ sau $x=-1$.",
      "Cum $x>8$, soluția este $x=9$.",
    ],
  },
  {
    id: "fe-s8-10",
    topic: "functii-exponentiale-logaritmice",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Soluția ecuației $\\log_2(x)-\\log_2(x-1)=1$ (cu $x>1$) este:",
    options: ["$2$", "$1$", "$4$", "$0{,}5$"],
    correctAnswer: "$2$",
    explanation: [
      "$\\log_2\\dfrac{x}{x-1}=1 \\Rightarrow \\dfrac{x}{x-1}=2 \\Rightarrow x=2x-2 \\Rightarrow x=2$.",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises.
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Run the full test suite.**
- [ ] **Step 7: Check for stray untracked files** (`git status --short`) and delete any before committing.
- [ ] **Step 8: Commit**

```bash
git add src/data/questions/functiiExponentialeLogaritmiceSets.ts
git commit -m "Add practice Set 8 (Ecuatii logaritmice cu proprietati) for Functii exponentiale si logaritmice"
```

---

### Task 9: Set 9 (Comparații și aplicații mixte exponențială/logaritmică)

**Files:**
- Modify: `src/data/questions/functiiExponentialeLogaritmiceSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–8.
- Produces: nothing consumed by later tasks beyond the shared file.

- [ ] **Step 1: Append Set 9's 10 exercises**

```ts
  // Set 9 — Comparații și aplicații mixte exponențială/logaritmică
  {
    id: "fe-s9-1",
    topic: "functii-exponentiale-logaritmice",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Care este mai mare, $2^{10}$ sau $3^7$?",
    options: ["$3^7$", "$2^{10}$", "sunt egale", "nu se poate compara"],
    correctAnswer: "$3^7$",
    explanation: [
      "Calculăm: $2^{10}=1024$ și $3^7=2187$.",
      "Cum $2187>1024$, rezultă că $3^7$ este mai mare.",
    ],
  },
  {
    id: "fe-s9-2",
    topic: "functii-exponentiale-logaritmice",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Care este mai mare, $\\log_2 100$ sau $\\log_3 100$?",
    options: ["$\\log_2 100$", "$\\log_3 100$", "sunt egale", "nu se poate compara"],
    correctAnswer: "$\\log_2 100$",
    explanation: [
      "Pentru același argument $>1$, cu cât baza este mai mică, cu atât valoarea logaritmului este mai mare.",
      "Cum $2<3$, rezultă $\\log_2 100>\\log_3 100$.",
    ],
  },
  {
    id: "fe-s9-3",
    topic: "functii-exponentiale-logaritmice",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Calculați $f(2)-g(2)$ pentru $f(x)=3^x$ și $g(x)=2^x$.",
    correctAnswer: "5",
    explanation: [
      "$f(2)=3^2=9$ și $g(2)=2^2=4$.",
      "Diferența este $9-4=5$.",
    ],
  },
  {
    id: "fe-s9-4",
    topic: "functii-exponentiale-logaritmice",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Determinați cel mai mic număr natural $n$ pentru care $2^n>1000$.",
    correctAnswer: "10",
    explanation: [
      "Calculăm: $2^9=512<1000$ și $2^{10}=1024>1000$.",
      "Cel mai mic astfel de $n$ este $10$.",
    ],
  },
  {
    id: "fe-s9-5",
    topic: "functii-exponentiale-logaritmice",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Funcțiile $f(x)=2^x$ și $g(x)=\\log_2 x$ sunt:",
    options: ["inverse una alteia", "identice", "independente", "opuse"],
    correctAnswer: "inverse una alteia",
    explanation: [
      "Funcția logaritmică în baza $2$ este inversa funcției exponențiale cu aceeași bază.",
    ],
  },
  {
    id: "fe-s9-6",
    topic: "functii-exponentiale-logaritmice",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Calculați $\\log_2 8+2^3$.",
    correctAnswer: "11",
    explanation: [
      "$\\log_2 8=3$ (deoarece $2^3=8$) și $2^3=8$.",
      "Suma este $3+8=11$.",
    ],
  },
  {
    id: "fe-s9-7",
    topic: "functii-exponentiale-logaritmice",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Pentru $x$ suficient de mare, care funcție crește mai repede: $f(x)=2^x$ sau $g(x)=x^2$?",
    options: ["$f(x)=2^x$", "$g(x)=x^2$", "cresc la fel", "nu se poate compara"],
    correctAnswer: "$f(x)=2^x$",
    explanation: [
      "Funcția exponențială depășește orice funcție polinomială pentru $x$ suficient de mare.",
    ],
  },
  {
    id: "fe-s9-8",
    topic: "functii-exponentiale-logaritmice",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Calculați $f(g(4))$ pentru $f(x)=\\log_2 x$ și $g(x)=2^x$.",
    correctAnswer: "4",
    explanation: [
      "Calculăm mai întâi $g(4)=2^4=16$.",
      "Apoi $f(16)=\\log_2 16=4$.",
    ],
  },
  {
    id: "fe-s9-9",
    topic: "functii-exponentiale-logaritmice",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Calculați $g(f(16))$ pentru $f(x)=\\log_2 x$ și $g(x)=2^x$.",
    correctAnswer: "16",
    explanation: [
      "Calculăm mai întâi $f(16)=\\log_2 16=4$.",
      "Apoi $g(4)=2^4=16$.",
    ],
  },
  {
    id: "fe-s9-10",
    topic: "functii-exponentiale-logaritmice",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Punctul $(2,4)$ aparține graficului funcției:",
    options: ["$f(x)=2^x$", "$f(x)=4^x$", "$f(x)=\\log_2 x$", "$f(x)=3^x$"],
    correctAnswer: "$f(x)=2^x$",
    explanation: [
      "Verificăm: $2^2=4$, deci punctul $(2,4)$ aparține graficului lui $f(x)=2^x$.",
      "Pentru celelalte funcții, $4^2=16\\neq4$, $\\log_2 2=1\\neq4$, $3^2=9\\neq4$.",
    ],
  },
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises.
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Run the full test suite.**
- [ ] **Step 7: Check for stray untracked files** (`git status --short`) and delete any before committing.
- [ ] **Step 8: Commit**

```bash
git add src/data/questions/functiiExponentialeLogaritmiceSets.ts
git commit -m "Add practice Set 9 (Comparatii si aplicatii mixte) for Functii exponentiale si logaritmice"
```

---

### Task 10: Set 10 (Recapitulare / aplicații mixte) + final verification

**Files:**
- Modify: `src/data/questions/functiiExponentialeLogaritmiceSets.ts`

**Interfaces:**
- Consumes: the file from Tasks 1–9 (must have exactly 90 exercises, Sets 1–9, before this task starts).
- Produces: the completed 100-exercise file — no further tasks depend on this one.

- [ ] **Step 1: Append Set 10's 10 exercises**

```ts
  // Set 10 — Recapitulare / aplicații mixte
  {
    id: "fe-s10-1",
    topic: "functii-exponentiale-logaritmice",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Calculați $f(2)$ pentru $f(x)=x^3$.",
    correctAnswer: "8",
    explanation: [
      "Înlocuim $x=2$ în $f(x)=x^3$: $f(2)=2^3=8$.",
    ],
  },
  {
    id: "fe-s10-2",
    topic: "functii-exponentiale-logaritmice",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Funcția $f(x)=6^x$ este:",
    options: [
      "strict crescătoare pe $\\mathbb{R}$",
      "strict descrescătoare pe $\\mathbb{R}$",
      "constantă",
      "definită doar pentru $x>0$",
    ],
    correctAnswer: "strict crescătoare pe $\\mathbb{R}$",
    explanation: [
      "Baza este $a=6>1$, deci funcția exponențială este strict crescătoare pe $\\mathbb{R}$.",
    ],
  },
  {
    id: "fe-s10-3",
    topic: "functii-exponentiale-logaritmice",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Calculați $\\log_3 27$.",
    correctAnswer: "3",
    explanation: [
      "Căutăm exponentul $y$ astfel încât $3^y=27$.",
      "Cum $3^3=27$, rezultă $\\log_3 27=3$.",
    ],
  },
  {
    id: "fe-s10-4",
    topic: "functii-exponentiale-logaritmice",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Funcția $f(x)=5^x$, $f:\\mathbb{R}\\to(0,+\\infty)$ este:",
    options: ["bijectivă", "doar injectivă", "doar surjectivă", "nici injectivă, nici surjectivă"],
    correctAnswer: "bijectivă",
    explanation: [
      "Funcția exponențială este strict monotonă (deci injectivă) și, restricționată la codomeniul $(0,+\\infty)$, este surjectivă. Este deci bijectivă.",
    ],
  },
  {
    id: "fe-s10-5",
    topic: "functii-exponentiale-logaritmice",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $2^{x+2}=64$ și scrieți valoarea lui $x$.",
    correctAnswer: "4",
    explanation: [
      "Scriem $64$ ca putere a lui $2$: $64=2^6$.",
      "Ecuația devine $2^{x+2}=2^6$.",
      "Folosind injectivitatea: $x+2=6 \\Rightarrow x=4$.",
    ],
  },
  {
    id: "fe-s10-6",
    topic: "functii-exponentiale-logaritmice",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $\\log_2(x+5)=4$ și scrieți valoarea lui $x$.",
    correctAnswer: "11",
    explanation: [
      "Punem condiția $x+5>0$.",
      "Scriem ecuația echivalentă: $x+5=2^4=16$.",
      "Rezolvăm: $x=11$, care verifică condiția.",
    ],
  },
  {
    id: "fe-s10-7",
    topic: "functii-exponentiale-logaritmice",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $9^x-10\\cdot3^x+9=0$ (notați $t=3^x$); scrieți soluția mai mare pentru $x$.",
    correctAnswer: "2",
    explanation: [
      "Notăm $t=3^x$, $t>0$; ecuația devine $t^2-10t+9=0$.",
      "Factorizăm: $(t-9)(t-1)=0$, deci $t_1=9$ și $t_2=1$.",
      "Din $3^x=9$ obținem $x=2$; din $3^x=1$ obținem $x=0$.",
      "Soluția mai mare este $x=2$.",
    ],
  },
  {
    id: "fe-s10-8",
    topic: "functii-exponentiale-logaritmice",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Soluția ecuației $\\log_4(x)-\\log_4(x-3)=1$ (cu $x>3$) este:",
    options: ["$4$", "$3$", "$7$", "$1$"],
    correctAnswer: "$4$",
    explanation: [
      "$\\log_4\\dfrac{x}{x-3}=1 \\Rightarrow \\dfrac{x}{x-3}=4 \\Rightarrow x=4x-12 \\Rightarrow x=4$.",
    ],
  },
  {
    id: "fe-s10-9",
    topic: "functii-exponentiale-logaritmice",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Calculați $\\log_2 16+3^2$.",
    correctAnswer: "13",
    explanation: [
      "$\\log_2 16=4$ (deoarece $2^4=16$) și $3^2=9$.",
      "Suma este $4+9=13$.",
    ],
  },
  {
    id: "fe-s10-10",
    topic: "functii-exponentiale-logaritmice",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Care este funcția inversă a funcției $g(x)=\\log_5 x$?",
    options: ["$f(x)=5^x$", "$f(x)=x^5$", "$f(x)=\\dfrac{1}{5^x}$", "$f(x)=\\log_{1/5}x$"],
    correctAnswer: "$f(x)=5^x$",
    explanation: [
      "Funcția exponențială în baza $5$ este inversa funcției logaritmice cu aceeași bază.",
    ],
  },
];
```

- [ ] **Step 2: Run the two encoding-safety checks.**
- [ ] **Step 3: Run data integrity test** — expect PASS.
- [ ] **Step 4: Verify LaTeX escaping at the runtime-string level** for at least 3 exercises.
- [ ] **Step 5: Verify no stray BOM.**
- [ ] **Step 6: Verify the file has exactly 100 exercises across 10 sets, AND run the two scripted duplication checks**

- [ ] **Step 6a (structural count):** Run: `grep -c 'id: "fe-s' src/data/questions/functiiExponentialeLogaritmiceSets.ts` — expected output: `100`. Also verify each of the 10 sets has exactly 10 exercises (`id: "fe-sN-` prefix count for each N=1..10).

- [ ] **Step 6b (cross-set exact-duplicate scan):** Write a small Node script that reads the file, extracts every exercise's `prompt` field via regex, and checks for exact string duplicates across the whole 100-exercise array. Expected: 0 duplicates. Delete the script after use.

- [ ] **Step 6c (base-exercise duplicate scan):** Write a small Node script that reads BOTH `src/data/questions/functiiExponentialeLogaritmice.ts` (the 7 base exercises) and `src/data/questions/functiiExponentialeLogaritmiceSets.ts` (the new 100), extracts every `prompt` field from both, and checks whether any of the 100 new prompts exactly match any of the 7 base prompts. Expected: 0 matches. This check is scripted specifically because a prior round's plan made an unscripted, self-attested claim about base-exercise non-duplication that turned out to be false — do not skip this step or treat it as already done. Delete the script after use.

- [ ] **Step 7: Run typecheck and build**

Run: `npm run typecheck` — expect exit 0.
Run: `npm run build` — expect exit 0.

- [ ] **Step 8: Run the full test suite**

Run: `npm test` — expect all test files pass.

- [ ] **Step 9: Check for stray untracked files** (`git status --short`) and delete any before committing.

- [ ] **Step 10: Commit**

```bash
git add src/data/questions/functiiExponentialeLogaritmiceSets.ts
git commit -m "Add practice Set 10 (Recapitulare) — completes Functii exponentiale si logaritmice practice bank"
```
