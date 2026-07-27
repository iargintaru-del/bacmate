# Tenth-Grade Foundation Chapters Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four new BacMate chapters that close the remaining 10th-grade curriculum gaps against the official Programa M_tehnologic: powers/radicals/logarithms, the power/radical/exponential/logarithmic functions (including exponential and logarithmic equations), financial math, and statistics — each with a theory page and a base exercises file, matching every existing topic's file shape.

**Architecture:** Four new `Topic` union members, each wired into the same three integration points every existing topic already uses: `src/types.ts` (the `Topic` union), `src/data/index.ts` (`TOPICS`, `TOPIC_LABELS`, `ALL_EXERCISES`), and a `TheorySection` registered in `src/data/theory/index.ts`. No component changes. Additionally, each topic gets a matching chapter in `src/data/formulaSheet.ts` (an unrelated, earlier feature whose test, `formulaSheet.test.ts`, asserts an exact, order-sensitive equality between `FORMULA_SHEET` and `TOPICS` — this coupling is now documented by a comment above the `Topic` union and is planned in from the start this time, not discovered mid-implementation).

**Tech Stack:** Plain TypeScript data files, existing Vite/Vitest setup. No new dependencies.

## Global Constraints

- Every new `Exercise` is worth exactly 6 points (existing test `data/index.test.ts` → "every exercise is worth 6 points" enforces this across all topics).
- Every exercise `id` must be globally unique (existing test → "has unique exercise ids"). This plan uses prefixes `pl-`, `fe-`, `mf-`, `st-` (verified against the full codebase: no collisions with any existing id).
- Every `mcq` exercise's `correctAnswer` must appear verbatim in its `options` array (existing test → "every mcq item's correctAnswer is present among its options").
- Every theory section needs at least one concept and at least 2 worked examples (existing test `theory/index.test.ts`).
- The four new topics are appended to the end of `TOPICS` (after `siruri`) — no existing topic's position changes.
- **`src/data/formulaSheet.ts`'s `FORMULA_SHEET` array must gain a matching chapter for every new topic, in the same order as `TOPICS`**, or `src/data/formulaSheet.test.ts` fails (`FORMULA_SHEET.map(c => c.topic)` must `toEqual(TOPICS)` exactly). Each new topic's chapter is added in that topic's own task. The actual `npm run generate:formulas` regeneration and commit of `public/formule-bacalaureat.pdf`/`.docx` happens **once, in Task 4 only**, after all 4 chapters exist — not once per task (four regenerations would be redundant; the binaries only need to reflect final state before the branch is done).
- No `*Sets.ts` practice-set file for these four topics this round, no new `Problem` entries, no changes to `examVariants.ts`.
- All LaTeX must use the `$...$` / `$$...$$` delimiters `MathText` already parses, with the same escaping style as existing theory/exercise files. All quoted phrases (if any) use Romanian typographic quotes „…” (U+201E / U+201D), not escaped ASCII `\"…\"`.

---

### Task 1: Puteri, radicali și logaritmi (`puteri-radicali-logaritmi`)

**Files:**
- Modify: `src/types.ts`
- Modify: `src/data/index.ts`
- Create: `src/data/theory/puteriRadicaliLogaritmi.ts`
- Modify: `src/data/theory/index.ts`
- Create: `src/data/questions/puteriRadicaliLogaritmi.ts`
- Modify: `src/data/formulaSheet.ts`

**Interfaces:**
- Produces: `Topic` gains the member `"puteri-radicali-logaritmi"`; `puteriRadicaliLogaritmiTheory: TheorySection`; `puteriRadicaliLogaritmiExercises: Exercise[]` (ids `pl-1`..`pl-7`); a new chapter in `FORMULA_SHEET`.

- [ ] **Step 1: Add the topic to the `Topic` union and to `TOPICS`/`TOPIC_LABELS`**

In `src/types.ts`, replace:

```ts
  | "functia-gradul-2"
  | "siruri";
```

with:

```ts
  | "functia-gradul-2"
  | "siruri"
  | "puteri-radicali-logaritmi";
```

In `src/data/index.ts`, replace:

```ts
  "functia-gradul-2",
  "siruri",
];
```

with:

```ts
  "functia-gradul-2",
  "siruri",
  "puteri-radicali-logaritmi",
];
```

And replace:

```ts
  "functia-gradul-2": "Funcția de gradul al II-lea",
  siruri: "Șiruri",
};
```

with:

```ts
  "functia-gradul-2": "Funcția de gradul al II-lea",
  siruri: "Șiruri",
  "puteri-radicali-logaritmi": "Puteri, radicali și logaritmi",
};
```

- [ ] **Step 2: Run typecheck to verify it fails (RED)**

Run: `npm run typecheck`
Expected: FAIL — `THEORY: Record<Topic, TheorySection>` in `src/data/theory/index.ts` is missing the `"puteri-radicali-logaritmi"` key.

- [ ] **Step 3: Create the theory file**

Create `src/data/theory/puteriRadicaliLogaritmi.ts`:

```ts
import type { TheorySection } from "../../types";

export const puteriRadicaliLogaritmiTheory: TheorySection = {
  topic: "puteri-radicali-logaritmi",
  title: "Puteri, radicali și logaritmi",
  concepts: [
    {
      heading: "Puteri cu exponent rațional",
      body: [
        "Pentru $a>0$ și $n\\in\\mathbb{N}^*$, radicalul de ordin $n$ se poate scrie ca putere: $\\sqrt[n]{a}=a^{\\frac{1}{n}}$.",
        "Pentru $a>0$ și $\\dfrac{p}{q}\\in\\mathbb{Q}$ (cu $q>0$), puterea cu exponent rațional este $a^{\\frac{p}{q}}=\\sqrt[q]{a^p}$.",
        "Proprietăți ale puterilor: $a^m\\cdot a^n=a^{m+n}$, $\\dfrac{a^m}{a^n}=a^{m-n}$, $(a^m)^n=a^{mn}$, $(ab)^n=a^nb^n$, pentru $a,b>0$.",
      ],
    },
    {
      heading: "Puteri cu exponent real",
      body: [
        "Pentru $a>0$ și $x\\in\\mathbb{R}$, puterea $a^x$ se definește ca limită a unui șir de puteri cu exponent rațional care se apropie de $x$; proprietățile puterilor rămân valabile.",
        "Dacă $a>1$, funcția $x\\mapsto a^x$ este strict crescătoare; dacă $0<a<1$, este strict descrescătoare.",
      ],
    },
    {
      heading: "Radicali — proprietăți",
      body: [
        "Pentru $a,b\\ge0$ și $n\\in\\mathbb{N}^*$, $n\\ge2$: $\\sqrt[n]{a}\\cdot\\sqrt[n]{b}=\\sqrt[n]{ab}$ și $\\dfrac{\\sqrt[n]{a}}{\\sqrt[n]{b}}=\\sqrt[n]{\\dfrac{a}{b}}$ (pentru $b\\neq0$).",
        "$\\sqrt[n]{a^m}=\\left(\\sqrt[n]{a}\\right)^m$ și $\\sqrt[m]{\\sqrt[n]{a}}=\\sqrt[mn]{a}$.",
        "Pentru a elimina radicalul de la numitor, se amplifică fracția cu o expresie convenabilă (de exemplu, cu $\\sqrt{a}$ pentru $\\dfrac{1}{\\sqrt{a}}$).",
      ],
    },
    {
      heading: "Logaritmi — definiție și proprietăți",
      body: [
        "Pentru $a>0$, $a\\neq1$ și $x>0$, logaritmul în baza $a$ al lui $x$ este numărul $\\log_a x$ astfel încât $a^{\\log_a x}=x$.",
        "Proprietăți: $\\log_a(xy)=\\log_a x+\\log_a y$, $\\log_a\\dfrac{x}{y}=\\log_a x-\\log_a y$, $\\log_a(x^n)=n\\log_a x$, pentru $x,y>0$.",
        "Cazuri particulare: $\\log_a 1=0$ și $\\log_a a=1$.",
      ],
    },
    {
      heading: "Medii",
      body: [
        "Media aritmetică a numerelor $a$ și $b$ este $\\dfrac{a+b}{2}$.",
        "Media ponderată a numerelor $a_1,\\ldots,a_n$ cu ponderile $p_1,\\ldots,p_n$ este $\\dfrac{a_1p_1+\\cdots+a_np_n}{p_1+\\cdots+p_n}$.",
        "Media geometrică a numerelor nenegative $a$ și $b$ este $\\sqrt{ab}$.",
        "Media armonică a numerelor pozitive $a$ și $b$ este $\\dfrac{2}{\\frac{1}{a}+\\frac{1}{b}}=\\dfrac{2ab}{a+b}$.",
      ],
    },
  ],
  examples: [
    {
      statement: "Calculați $8^{\\frac{2}{3}}$.",
      steps: [
        "Scriem puterea ca radical: $8^{\\frac{2}{3}}=\\sqrt[3]{8^2}$.",
        "Calculăm $8^2=64$, deci obținem $\\sqrt[3]{64}$.",
        "Cum $4^3=64$, rezultă $8^{\\frac{2}{3}}=4$.",
      ],
    },
    {
      statement: "Simplificați expresia $\\sqrt{12}\\cdot\\sqrt{3}$.",
      steps: [
        "Folosim proprietatea $\\sqrt{a}\\cdot\\sqrt{b}=\\sqrt{ab}$: $\\sqrt{12}\\cdot\\sqrt{3}=\\sqrt{36}$.",
        "Calculăm $\\sqrt{36}=6$.",
      ],
    },
    {
      statement: "Calculați $\\log_2 32$.",
      steps: [
        "Căutăm exponentul $x$ astfel încât $2^x=32$.",
        "Observăm că $2^5=32$.",
        "Rezultă $\\log_2 32=5$.",
      ],
    },
    {
      statement: "Calculați media geometrică a numerelor $4$ și $9$.",
      steps: [
        "Media geometrică este $\\sqrt{4\\cdot9}=\\sqrt{36}$.",
        "Rezultă media geometrică $=6$.",
      ],
    },
  ],
};
```

- [ ] **Step 4: Register the theory file**

In `src/data/theory/index.ts`, replace:

```ts
import { siruriTheory } from "./siruri";

export const THEORY: Record<Topic, TheorySection> = {
```

with:

```ts
import { siruriTheory } from "./siruri";
import { puteriRadicaliLogaritmiTheory } from "./puteriRadicaliLogaritmi";

export const THEORY: Record<Topic, TheorySection> = {
```

Then replace:

```ts
  siruri: siruriTheory,
};
```

with:

```ts
  siruri: siruriTheory,
  "puteri-radicali-logaritmi": puteriRadicaliLogaritmiTheory,
};
```

- [ ] **Step 5: Run typecheck to verify it passes**

Run: `npm run typecheck`
Expected: exits 0.

- [ ] **Step 6: Run the theory integrity test**

Run: `npx vitest run src/data/theory/index.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 7: Run the data integrity test to verify it fails (RED for exercises)**

Run: `npx vitest run src/data/index.test.ts`
Expected: FAIL — "has at least one exercise per topic" fails for `puteri-radicali-logaritmi` (no exercises yet).

- [ ] **Step 8: Create the exercises file**

Create `src/data/questions/puteriRadicaliLogaritmi.ts`:

```ts
import type { Exercise } from "../../types";

export const puteriRadicaliLogaritmiExercises: Exercise[] = [
  {
    id: "pl-1",
    topic: "puteri-radicali-logaritmi",
    type: "input",
    points: 6,
    prompt: "Calculați $9^{\\frac{3}{2}}$.",
    correctAnswer: "27",
    explanation: [
      "Scriem puterea ca radical: $9^{\\frac{3}{2}}=\\sqrt{9^3}$.",
      "Calculăm $9^3=729$, iar $\\sqrt{729}=27$ (deoarece $27^2=729$).",
      "Rezultă $9^{\\frac{3}{2}}=27$.",
    ],
  },
  {
    id: "pl-2",
    topic: "puteri-radicali-logaritmi",
    type: "mcq",
    points: 6,
    prompt: "Expresia $\\sqrt{8}\\cdot\\sqrt{2}$ este egală cu:",
    options: ["$4$", "$16$", "$\\sqrt{10}$", "$2\\sqrt{4}$"],
    correctAnswer: "$4$",
    explanation: [
      "Folosim $\\sqrt{a}\\cdot\\sqrt{b}=\\sqrt{ab}$: $\\sqrt{8}\\cdot\\sqrt{2}=\\sqrt{16}$.",
      "Calculăm $\\sqrt{16}=4$.",
    ],
  },
  {
    id: "pl-3",
    topic: "puteri-radicali-logaritmi",
    type: "input",
    points: 6,
    prompt: "Calculați $\\log_3 81$.",
    correctAnswer: "4",
    explanation: [
      "Căutăm $x$ astfel încât $3^x=81$.",
      "Observăm că $3^4=81$.",
      "Rezultă $\\log_3 81=4$.",
    ],
  },
  {
    id: "pl-4",
    topic: "puteri-radicali-logaritmi",
    type: "mcq",
    points: 6,
    prompt: "Folosind proprietățile logaritmilor, $\\log_2 8+\\log_2 4$ este egal cu:",
    options: ["$5$", "$32$", "$12$", "$7$"],
    correctAnswer: "$5$",
    explanation: [
      "Aplicăm $\\log_a x+\\log_a y=\\log_a(xy)$: $\\log_2 8+\\log_2 4=\\log_2 32$.",
      "Calculăm $\\log_2 32=5$ (deoarece $2^5=32$).",
    ],
  },
  {
    id: "pl-5",
    topic: "puteri-radicali-logaritmi",
    type: "input",
    points: 6,
    prompt: "Calculați media aritmetică a numerelor $12$ și $18$.",
    correctAnswer: "15",
    explanation: [
      "Media aritmetică este $\\dfrac{12+18}{2}$.",
      "Calculăm $\\dfrac{30}{2}=15$.",
    ],
  },
  {
    id: "pl-6",
    topic: "puteri-radicali-logaritmi",
    type: "mcq",
    points: 6,
    prompt: "Media geometrică a numerelor $2$ și $8$ este:",
    options: ["$4$", "$5$", "$16$", "$10$"],
    correctAnswer: "$4$",
    explanation: [
      "Media geometrică este $\\sqrt{2\\cdot8}=\\sqrt{16}$.",
      "Rezultă media geometrică $=4$.",
    ],
  },
  {
    id: "pl-7",
    topic: "puteri-radicali-logaritmi",
    type: "input",
    points: 6,
    prompt: "Simplificați $\\dfrac{a^7}{a^3}$ (pentru $a\\neq0$) și scrieți exponentul rezultat.",
    correctAnswer: "4",
    explanation: [
      "Aplicăm proprietatea $\\dfrac{a^m}{a^n}=a^{m-n}$.",
      "Calculăm exponentul: $7-3=4$.",
      "Rezultă $\\dfrac{a^7}{a^3}=a^4$.",
    ],
  },
];
```

- [ ] **Step 9: Register the exercises in `ALL_EXERCISES`**

In `src/data/index.ts`, replace:

```ts
import { siruriExercises } from "./questions/siruri";
```

with:

```ts
import { siruriExercises } from "./questions/siruri";
import { puteriRadicaliLogaritmiExercises } from "./questions/puteriRadicaliLogaritmi";
```

Then replace:

```ts
  ...siruriExercises,
];
```

with:

```ts
  ...siruriExercises,
  ...puteriRadicaliLogaritmiExercises,
];
```

- [ ] **Step 10: Run the data integrity test to verify it passes**

Run: `npx vitest run src/data/index.test.ts`
Expected: PASS.

- [ ] **Step 11: Add the matching `FORMULA_SHEET` chapter**

In `src/data/formulaSheet.ts`, replace the file's final two lines:

```ts
  ]),
];
```

(this is the closing of the `siruri` chapter and the closing of the `FORMULA_SHEET` array — the last two lines of the file) with:

```ts
  ]),
  chapter("puteri-radicali-logaritmi", [
    {
      label: "Puteri cu exponent rațional",
      latex: "a^{\\frac{p}{q}}=\\sqrt[q]{a^p},\\ a>0",
      plain: "a^(p/q) = ᵍ√(a^p),  a > 0",
    },
    {
      label: "Proprietăți ale logaritmilor",
      latex: "\\log_a(xy)=\\log_a x+\\log_a y,\\ \\log_a\\dfrac{x}{y}=\\log_a x-\\log_a y",
      plain: "log_a(xy) = log_a x + log_a y,  log_a(x/y) = log_a x − log_a y",
    },
    {
      label: "Media geometrică",
      latex: "\\sqrt{ab}",
      plain: "√(ab)",
    },
  ]),
];
```

- [ ] **Step 12: Run the formula sheet integrity test**

Run: `npx vitest run src/data/formulaSheet.test.ts`
Expected: PASS (this topic's chapter now satisfies the `FORMULA_SHEET`/`TOPICS` order-sensitive equality check; the KaTeX-validity test also covers the 3 new `latex` strings).

- [ ] **Step 13: Run the full test suite**

Run: `npm test`
Expected: all suites pass, no regressions.

- [ ] **Step 14: Commit**

```bash
git add src/types.ts src/data/index.ts src/data/theory/puteriRadicaliLogaritmi.ts src/data/theory/index.ts src/data/questions/puteriRadicaliLogaritmi.ts src/data/formulaSheet.ts
git commit -m "Add Puteri, radicali și logaritmi chapter (theory + exercises)"
```

Do NOT run `npm run generate:formulas` or touch `public/formule-bacalaureat.pdf`/`.docx` in this task — that happens once, in Task 4, after all 4 new chapters exist.

---

### Task 2: Funcții putere, radical, exponențială și logaritmică (`functii-exponentiale-logaritmice`)

**Files:**
- Modify: `src/types.ts`
- Modify: `src/data/index.ts`
- Create: `src/data/theory/functiiExponentialeLogaritmice.ts`
- Modify: `src/data/theory/index.ts`
- Create: `src/data/questions/functiiExponentialeLogaritmice.ts`
- Modify: `src/data/formulaSheet.ts`

**Interfaces:**
- Consumes: file state left by Task 1 (all 6 files above already include `puteri-radicali-logaritmi`'s entries).
- Produces: `Topic` gains `"functii-exponentiale-logaritmice"`; `functiiExponentialeLogaritmiceTheory: TheorySection`; `functiiExponentialeLogaritmiceExercises: Exercise[]` (ids `fe-1`..`fe-7`); a new `FORMULA_SHEET` chapter.

- [ ] **Step 1: Add the topic to the `Topic` union and to `TOPICS`/`TOPIC_LABELS`**

In `src/types.ts`, replace:

```ts
  | "siruri"
  | "puteri-radicali-logaritmi";
```

with:

```ts
  | "siruri"
  | "puteri-radicali-logaritmi"
  | "functii-exponentiale-logaritmice";
```

In `src/data/index.ts`, replace:

```ts
  "siruri",
  "puteri-radicali-logaritmi",
];
```

with:

```ts
  "siruri",
  "puteri-radicali-logaritmi",
  "functii-exponentiale-logaritmice",
];
```

And replace:

```ts
  siruri: "Șiruri",
  "puteri-radicali-logaritmi": "Puteri, radicali și logaritmi",
};
```

with:

```ts
  siruri: "Șiruri",
  "puteri-radicali-logaritmi": "Puteri, radicali și logaritmi",
  "functii-exponentiale-logaritmice": "Funcții putere, radical, exponențială și logaritmică",
};
```

- [ ] **Step 2: Run typecheck to verify it fails (RED)**

Run: `npm run typecheck`
Expected: FAIL — `THEORY` is missing the `"functii-exponentiale-logaritmice"` key.

- [ ] **Step 3: Create the theory file**

Create `src/data/theory/functiiExponentialeLogaritmice.ts`:

```ts
import type { TheorySection } from "../../types";

export const functiiExponentialeLogaritmiceTheory: TheorySection = {
  topic: "functii-exponentiale-logaritmice",
  title: "Funcții putere, radical, exponențială și logaritmică",
  concepts: [
    {
      heading: "Funcția putere și funcția radical",
      body: [
        "Funcția putere este $f:\\mathbb{R}\\to\\mathbb{R}$, $f(x)=x^n$, cu $n\\in\\mathbb{N}$, $n\\ge2$.",
        "Funcția radical este $f:D\\to\\mathbb{R}$, $f(x)=\\sqrt[n]{x}$, cu $n\\ge2$; domeniul este $D=[0,+\\infty)$ pentru $n$ par și $D=\\mathbb{R}$ pentru $n$ impar.",
      ],
    },
    {
      heading: "Funcția exponențială",
      body: [
        "Funcția exponențială este $f:\\mathbb{R}\\to(0,+\\infty)$, $f(x)=a^x$, cu $a>0$, $a\\neq1$.",
        "Dacă $a>1$, funcția este strict crescătoare; dacă $0<a<1$, este strict descrescătoare.",
        "Graficul funcției exponențiale trece prin punctul $(0,1)$, deoarece $a^0=1$.",
      ],
    },
    {
      heading: "Funcția logaritmică",
      body: [
        "Funcția logaritmică este $f:(0,+\\infty)\\to\\mathbb{R}$, $f(x)=\\log_a x$, cu $a>0$, $a\\neq1$.",
        "Funcția logaritmică este inversa funcției exponențiale cu aceeași bază $a$.",
        "Graficul funcției logaritmice trece prin punctul $(1,0)$, deoarece $\\log_a 1=0$.",
      ],
    },
    {
      heading: "Injectivitate, surjectivitate, bijectivitate",
      body: [
        "O funcție $f$ este injectivă dacă $f(x_1)=f(x_2) \\Rightarrow x_1=x_2$, pentru orice $x_1,x_2$ din domeniu.",
        "O funcție $f:A\\to B$ este surjectivă dacă pentru orice $y\\in B$ există $x\\in A$ astfel încât $f(x)=y$.",
        "O funcție este bijectivă dacă este atât injectivă, cât și surjectivă; o funcție bijectivă este inversabilă.",
      ],
    },
    {
      heading: "Ecuații exponențiale",
      body: [
        "O ecuație exponențială conține necunoscuta la exponent, de exemplu $a^{f(x)}=a^{g(x)}$, cu $a>0$, $a\\neq1$; folosind injectivitatea funcției exponențiale, ecuația este echivalentă cu $f(x)=g(x)$.",
        "Ecuațiile de tipul $a^{2x}+ba^x+c=0$ se rezolvă prin substituția $t=a^x$, $t>0$, obținând o ecuație de gradul al II-lea în $t$.",
      ],
    },
    {
      heading: "Ecuații logaritmice",
      body: [
        "O ecuație logaritmică conține necunoscuta sub logaritm, de exemplu $\\log_a f(x)=\\log_a g(x)$; folosind injectivitatea funcției logaritmice, ecuația este echivalentă cu $f(x)=g(x)$, cu condiția $f(x)>0$ și $g(x)>0$.",
        "Este esențial să se verifice condițiile de existență a logaritmilor înainte de a accepta soluțiile.",
      ],
    },
  ],
  examples: [
    {
      statement: "Rezolvați ecuația $2^{x+1}=32$.",
      steps: [
        "Scriem $32$ ca putere a lui $2$: $32=2^5$.",
        "Ecuația devine $2^{x+1}=2^5$.",
        "Folosind injectivitatea funcției exponențiale: $x+1=5 \\Rightarrow x=4$.",
      ],
    },
    {
      statement: "Rezolvați ecuația $4^x-5\\cdot2^x+4=0$.",
      steps: [
        "Observăm că $4^x=(2^x)^2$, deci notăm $t=2^x$, $t>0$.",
        "Ecuația devine $t^2-5t+4=0$.",
        "Rezolvăm: $\\Delta=25-16=9$, $t_{1,2}=\\dfrac{5\\pm3}{2}$, deci $t_1=4$ și $t_2=1$.",
        "Din $2^x=4=2^2$ obținem $x=2$; din $2^x=1=2^0$ obținem $x=0$.",
      ],
    },
    {
      statement: "Rezolvați ecuația $\\log_3(x+2)=2$.",
      steps: [
        "Punem condiția de existență: $x+2>0 \\Rightarrow x>-2$.",
        "Scriem ecuația echivalentă: $x+2=3^2$.",
        "Rezolvăm: $x+2=9 \\Rightarrow x=7$, care verifică $x>-2$.",
      ],
    },
    {
      statement: "Determinați dacă funcția $f:\\mathbb{R}\\to(0,+\\infty)$, $f(x)=3^x$, este bijectivă.",
      steps: [
        "Funcția exponențială $f(x)=3^x$ este strict crescătoare pe $\\mathbb{R}$ (deoarece $3>1$), deci este injectivă.",
        "Funcția este surjectivă pe $(0,+\\infty)$, deoarece pentru orice $y>0$ există $x=\\log_3 y$ astfel încât $f(x)=y$.",
        "Fiind injectivă și surjectivă, funcția $f$ este bijectivă.",
      ],
    },
  ],
};
```

- [ ] **Step 4: Register the theory file**

In `src/data/theory/index.ts`, replace:

```ts
import { puteriRadicaliLogaritmiTheory } from "./puteriRadicaliLogaritmi";
```

with:

```ts
import { puteriRadicaliLogaritmiTheory } from "./puteriRadicaliLogaritmi";
import { functiiExponentialeLogaritmiceTheory } from "./functiiExponentialeLogaritmice";
```

Then replace:

```ts
  "puteri-radicali-logaritmi": puteriRadicaliLogaritmiTheory,
};
```

with:

```ts
  "puteri-radicali-logaritmi": puteriRadicaliLogaritmiTheory,
  "functii-exponentiale-logaritmice": functiiExponentialeLogaritmiceTheory,
};
```

- [ ] **Step 5: Run typecheck to verify it passes**

Run: `npm run typecheck`
Expected: exits 0.

- [ ] **Step 6: Run the theory integrity test**

Run: `npx vitest run src/data/theory/index.test.ts`
Expected: PASS.

- [ ] **Step 7: Run the data integrity test to verify it fails (RED for exercises)**

Run: `npx vitest run src/data/index.test.ts`
Expected: FAIL — no exercises yet for `functii-exponentiale-logaritmice`.

- [ ] **Step 8: Create the exercises file**

Create `src/data/questions/functiiExponentialeLogaritmice.ts`:

```ts
import type { Exercise } from "../../types";

export const functiiExponentialeLogaritmiceExercises: Exercise[] = [
  {
    id: "fe-1",
    topic: "functii-exponentiale-logaritmice",
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $3^{x-1}=27$ și scrieți valoarea lui $x$.",
    correctAnswer: "4",
    explanation: [
      "Scriem $27$ ca putere a lui $3$: $27=3^3$.",
      "Ecuația devine $3^{x-1}=3^3$.",
      "Folosind injectivitatea: $x-1=3 \\Rightarrow x=4$.",
    ],
  },
  {
    id: "fe-2",
    topic: "functii-exponentiale-logaritmice",
    type: "mcq",
    points: 6,
    prompt: "Funcția $f(x)=\\left(\\dfrac12\\right)^x$ este:",
    options: [
      "strict descrescătoare pe $\\mathbb{R}$",
      "strict crescătoare pe $\\mathbb{R}$",
      "constantă",
      "definită doar pentru $x>0$",
    ],
    correctAnswer: "strict descrescătoare pe $\\mathbb{R}$",
    explanation: [
      "Baza este $a=\\dfrac12$, cu $0<a<1$.",
      "Pentru $0<a<1$, funcția exponențială este strict descrescătoare pe $\\mathbb{R}$.",
    ],
  },
  {
    id: "fe-3",
    topic: "functii-exponentiale-logaritmice",
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $\\log_5(2x-1)=1$ și scrieți valoarea lui $x$.",
    correctAnswer: "3",
    explanation: [
      "Punem condiția $2x-1>0$.",
      "Scriem ecuația echivalentă: $2x-1=5^1=5$.",
      "Rezolvăm: $2x=6 \\Rightarrow x=3$, care verifică condiția.",
    ],
  },
  {
    id: "fe-4",
    topic: "functii-exponentiale-logaritmice",
    type: "mcq",
    points: 6,
    prompt: "Graficul funcției exponențiale $f(x)=a^x$ (cu $a>0$, $a\\neq1$) trece prin punctul:",
    options: ["$(0,1)$", "$(1,0)$", "$(0,0)$", "$(1,1)$"],
    correctAnswer: "$(0,1)$",
    explanation: [
      "Pentru orice bază $a>0$, avem $a^0=1$.",
      "Deci graficul trece prin punctul $(0,1)$.",
    ],
  },
  {
    id: "fe-5",
    topic: "functii-exponentiale-logaritmice",
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $9^x-4\\cdot3^x+3=0$, notând $t=3^x$; scrieți soluția mai mare pentru $x$.",
    correctAnswer: "1",
    explanation: [
      "Notăm $t=3^x$, $t>0$; cum $9^x=(3^x)^2$, ecuația devine $t^2-4t+3=0$.",
      "Rezolvăm: $\\Delta=16-12=4$, $t_{1,2}=\\dfrac{4\\pm2}{2}$, deci $t_1=3$ și $t_2=1$.",
      "Din $3^x=3$ obținem $x=1$; din $3^x=1$ obținem $x=0$.",
      "Soluția mai mare este $x=1$.",
    ],
  },
  {
    id: "fe-6",
    topic: "functii-exponentiale-logaritmice",
    type: "mcq",
    points: 6,
    prompt: "Care dintre funcțiile următoare este inversa funcției $f(x)=2^x$?",
    options: ["$g(x)=\\log_2 x$", "$g(x)=x^2$", "$g(x)=\\dfrac{1}{2^x}$", "$g(x)=2^{-x}$"],
    correctAnswer: "$g(x)=\\log_2 x$",
    explanation: [
      "Funcția logaritmică în baza $2$ este inversa funcției exponențiale cu aceeași bază.",
      "Deci inversa lui $f(x)=2^x$ este $g(x)=\\log_2 x$.",
    ],
  },
  {
    id: "fe-7",
    topic: "functii-exponentiale-logaritmice",
    type: "input",
    points: 6,
    prompt: "Rezolvați ecuația $\\log_2(x)+\\log_2(x-2)=3$ (cu $x>2$) și scrieți valoarea lui $x$.",
    correctAnswer: "4",
    explanation: [
      "Aplicăm proprietatea $\\log_a m+\\log_a n=\\log_a(mn)$: $\\log_2\\left(x(x-2)\\right)=3$.",
      "Scriem ecuația echivalentă: $x(x-2)=2^3=8$, adică $x^2-2x-8=0$.",
      "Rezolvăm: $\\Delta=4+32=36$, $x_{1,2}=\\dfrac{2\\pm6}{2}$, deci $x_1=4$ și $x_2=-2$.",
      "Cum $x>2$, soluția este $x=4$.",
    ],
  },
];
```

- [ ] **Step 9: Register the exercises in `ALL_EXERCISES`**

In `src/data/index.ts`, replace:

```ts
import { puteriRadicaliLogaritmiExercises } from "./questions/puteriRadicaliLogaritmi";
```

with:

```ts
import { puteriRadicaliLogaritmiExercises } from "./questions/puteriRadicaliLogaritmi";
import { functiiExponentialeLogaritmiceExercises } from "./questions/functiiExponentialeLogaritmice";
```

Then replace:

```ts
  ...puteriRadicaliLogaritmiExercises,
];
```

with:

```ts
  ...puteriRadicaliLogaritmiExercises,
  ...functiiExponentialeLogaritmiceExercises,
];
```

- [ ] **Step 10: Run the data integrity test to verify it passes**

Run: `npx vitest run src/data/index.test.ts`
Expected: PASS.

- [ ] **Step 11: Add the matching `FORMULA_SHEET` chapter**

In `src/data/formulaSheet.ts`, replace the file's final two lines (the closing of the `puteri-radicali-logaritmi` chapter added in Task 1, and the closing of the `FORMULA_SHEET` array):

```ts
  ]),
];
```

with:

```ts
  ]),
  chapter("functii-exponentiale-logaritmice", [
    {
      label: "Funcția exponențială",
      latex: "f(x)=a^x,\\ a>0,\\ a\\neq1",
      plain: "f(x) = aˣ,  a > 0,  a ≠ 1",
    },
    {
      label: "Funcția logaritmică",
      latex: "f(x)=\\log_a x,\\ a>0,\\ a\\neq1,\\ x>0",
      plain: "f(x) = log_a x,  a > 0,  a ≠ 1,  x > 0",
    },
    {
      label: "Rezolvarea ecuațiilor exponențiale prin substituție",
      latex: "a^{2x}+ba^x+c=0,\\ t=a^x,\\ t>0",
      plain: "a^(2x) + b·aˣ + c = 0,  t = aˣ,  t > 0",
    },
  ]),
];
```

- [ ] **Step 12: Run the formula sheet integrity test**

Run: `npx vitest run src/data/formulaSheet.test.ts`
Expected: PASS.

- [ ] **Step 13: Run the full test suite**

Run: `npm test`
Expected: all suites pass, no regressions.

- [ ] **Step 14: Commit**

```bash
git add src/types.ts src/data/index.ts src/data/theory/functiiExponentialeLogaritmice.ts src/data/theory/index.ts src/data/questions/functiiExponentialeLogaritmice.ts src/data/formulaSheet.ts
git commit -m "Add Funcții putere, radical, exponențială și logaritmică chapter (theory + exercises)"
```

Do NOT run `npm run generate:formulas` in this task.

---

### Task 3: Matematici financiare (`matematici-financiare`)

**Files:**
- Modify: `src/types.ts`
- Modify: `src/data/index.ts`
- Create: `src/data/theory/matematiciFinanciare.ts`
- Modify: `src/data/theory/index.ts`
- Create: `src/data/questions/matematiciFinanciare.ts`
- Modify: `src/data/formulaSheet.ts`

**Interfaces:**
- Consumes: file state left by Task 2.
- Produces: `Topic` gains `"matematici-financiare"`; `matematiciFinanciareTheory: TheorySection`; `matematiciFinanciareExercises: Exercise[]` (ids `mf-1`..`mf-7`); a new `FORMULA_SHEET` chapter.

- [ ] **Step 1: Add the topic to the `Topic` union and to `TOPICS`/`TOPIC_LABELS`**

In `src/types.ts`, replace:

```ts
  | "puteri-radicali-logaritmi"
  | "functii-exponentiale-logaritmice";
```

with:

```ts
  | "puteri-radicali-logaritmi"
  | "functii-exponentiale-logaritmice"
  | "matematici-financiare";
```

In `src/data/index.ts`, replace:

```ts
  "puteri-radicali-logaritmi",
  "functii-exponentiale-logaritmice",
];
```

with:

```ts
  "puteri-radicali-logaritmi",
  "functii-exponentiale-logaritmice",
  "matematici-financiare",
];
```

And replace:

```ts
  "puteri-radicali-logaritmi": "Puteri, radicali și logaritmi",
  "functii-exponentiale-logaritmice": "Funcții putere, radical, exponențială și logaritmică",
};
```

with:

```ts
  "puteri-radicali-logaritmi": "Puteri, radicali și logaritmi",
  "functii-exponentiale-logaritmice": "Funcții putere, radical, exponențială și logaritmică",
  "matematici-financiare": "Matematici financiare",
};
```

- [ ] **Step 2: Run typecheck to verify it fails (RED)**

Run: `npm run typecheck`
Expected: FAIL — `THEORY` is missing the `"matematici-financiare"` key.

- [ ] **Step 3: Create the theory file**

Create `src/data/theory/matematiciFinanciare.ts`:

```ts
import type { TheorySection } from "../../types";

export const matematiciFinanciareTheory: TheorySection = {
  topic: "matematici-financiare",
  title: "Matematici financiare",
  concepts: [
    {
      heading: "Procente",
      body: [
        "Un procent de $p\\%$ dintr-o cantitate $V$ reprezintă $\\dfrac{p}{100}\\cdot V$.",
        "Dacă o cantitate $V_0$ crește cu $p\\%$, noua valoare este $V=V_0\\left(1+\\dfrac{p}{100}\\right)$; dacă scade cu $p\\%$, noua valoare este $V=V_0\\left(1-\\dfrac{p}{100}\\right)$.",
      ],
    },
    {
      heading: "Dobânda simplă",
      body: [
        "Dobânda simplă pentru un capital $C$, depus cu o rată anuală a dobânzii $p\\%$, pe o perioadă de $n$ ani, este $D=\\dfrac{C\\cdot p\\cdot n}{100}$.",
        "Suma finală (capital plus dobândă) este $S=C+D=C\\left(1+\\dfrac{pn}{100}\\right)$.",
      ],
    },
    {
      heading: "Dobânda compusă",
      body: [
        "La dobânda compusă, dobânda obținută se adaugă la capital, iar dobânda din perioada următoare se calculează la noul capital.",
        "Suma finală după $n$ ani, cu rata anuală $p\\%$, este $S=C\\left(1+\\dfrac{p}{100}\\right)^n$.",
      ],
    },
    {
      heading: "TVA",
      body: [
        "TVA (taxa pe valoarea adăugată) este un procent aplicat prețului fără TVA (prețul net); prețul cu TVA este $P_{TVA}=P_{net}\\left(1+\\dfrac{p}{100}\\right)$, unde $p$ este cota de TVA.",
        "Pentru a determina prețul net dintr-un preț care include TVA, se calculează $P_{net}=\\dfrac{P_{TVA}}{1+\\frac{p}{100}}$.",
      ],
    },
  ],
  examples: [
    {
      statement: "Un produs costă $200$ lei și prețul se majorează cu $15\\%$. Determinați noul preț.",
      steps: [
        "Aplicăm formula creșterii cu procent: $V=V_0\\left(1+\\dfrac{p}{100}\\right)$.",
        "Înlocuim: $V=200\\left(1+\\dfrac{15}{100}\\right)=200\\cdot1{,}15$.",
        "Calculăm: $V=230$ lei.",
      ],
    },
    {
      statement: "Un capital de $1000$ lei este depus cu dobândă simplă de $6\\%$ pe an, timp de $3$ ani. Calculați dobânda obținută.",
      steps: [
        "Aplicăm formula dobânzii simple: $D=\\dfrac{C\\cdot p\\cdot n}{100}$.",
        "Înlocuim: $D=\\dfrac{1000\\cdot6\\cdot3}{100}$.",
        "Calculăm: $D=\\dfrac{18000}{100}=180$ lei.",
      ],
    },
    {
      statement: "Un capital de $500$ lei este depus cu dobândă compusă de $10\\%$ pe an, timp de $2$ ani. Calculați suma finală.",
      steps: [
        "Aplicăm formula dobânzii compuse: $S=C\\left(1+\\dfrac{p}{100}\\right)^n$.",
        "Înlocuim: $S=500\\left(1+\\dfrac{10}{100}\\right)^2=500\\cdot1{,}1^2$.",
        "Calculăm: $S=500\\cdot1{,}21=605$ lei.",
      ],
    },
    {
      statement: "Un produs are prețul net (fără TVA) de $100$ lei, iar cota de TVA este $19\\%$. Determinați prețul cu TVA.",
      steps: [
        "Aplicăm formula: $P_{TVA}=P_{net}\\left(1+\\dfrac{p}{100}\\right)$.",
        "Înlocuim: $P_{TVA}=100\\left(1+\\dfrac{19}{100}\\right)=100\\cdot1{,}19$.",
        "Calculăm: $P_{TVA}=119$ lei.",
      ],
    },
  ],
};
```

- [ ] **Step 4: Register the theory file**

In `src/data/theory/index.ts`, replace:

```ts
import { functiiExponentialeLogaritmiceTheory } from "./functiiExponentialeLogaritmice";
```

with:

```ts
import { functiiExponentialeLogaritmiceTheory } from "./functiiExponentialeLogaritmice";
import { matematiciFinanciareTheory } from "./matematiciFinanciare";
```

Then replace:

```ts
  "functii-exponentiale-logaritmice": functiiExponentialeLogaritmiceTheory,
};
```

with:

```ts
  "functii-exponentiale-logaritmice": functiiExponentialeLogaritmiceTheory,
  "matematici-financiare": matematiciFinanciareTheory,
};
```

- [ ] **Step 5: Run typecheck to verify it passes**

Run: `npm run typecheck`
Expected: exits 0.

- [ ] **Step 6: Run the theory integrity test**

Run: `npx vitest run src/data/theory/index.test.ts`
Expected: PASS.

- [ ] **Step 7: Run the data integrity test to verify it fails (RED for exercises)**

Run: `npx vitest run src/data/index.test.ts`
Expected: FAIL — no exercises yet for `matematici-financiare`.

- [ ] **Step 8: Create the exercises file**

Create `src/data/questions/matematiciFinanciare.ts`:

```ts
import type { Exercise } from "../../types";

export const matematiciFinanciareExercises: Exercise[] = [
  {
    id: "mf-1",
    topic: "matematici-financiare",
    type: "input",
    points: 6,
    prompt: "Un produs costă $150$ lei și prețul se majorează cu $20\\%$. Determinați noul preț (în lei).",
    correctAnswer: "180",
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1+\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=150\\cdot1{,}2$.",
      "Calculăm: $V=180$ lei.",
    ],
  },
  {
    id: "mf-2",
    topic: "matematici-financiare",
    type: "mcq",
    points: 6,
    prompt: "Dacă un preț de $400$ lei se reduce cu $25\\%$, noul preț este:",
    options: ["$300$ lei", "$100$ lei", "$350$ lei", "$320$ lei"],
    correctAnswer: "$300$ lei",
    explanation: [
      "Aplicăm formula scăderii cu procent: $V=V_0\\left(1-\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=400\\cdot0{,}75=300$ lei.",
    ],
  },
  {
    id: "mf-3",
    topic: "matematici-financiare",
    type: "input",
    points: 6,
    prompt: "Calculați dobânda simplă pentru un capital de $2000$ lei, cu rata anuală $5\\%$, pe o perioadă de $4$ ani (în lei).",
    correctAnswer: "400",
    explanation: [
      "Aplicăm formula: $D=\\dfrac{C\\cdot p\\cdot n}{100}$.",
      "Înlocuim: $D=\\dfrac{2000\\cdot5\\cdot4}{100}$.",
      "Calculăm: $D=\\dfrac{40000}{100}=400$ lei.",
    ],
  },
  {
    id: "mf-4",
    topic: "matematici-financiare",
    type: "mcq",
    points: 6,
    prompt: "Un capital de $1000$ lei este depus cu dobândă compusă de $10\\%$ pe an, timp de $2$ ani. Suma finală este:",
    options: ["$1210$ lei", "$1200$ lei", "$1100$ lei", "$1000$ lei"],
    correctAnswer: "$1210$ lei",
    explanation: [
      "Aplicăm formula dobânzii compuse: $S=C\\left(1+\\dfrac{p}{100}\\right)^n$.",
      "Înlocuim: $S=1000\\cdot1{,}1^2=1000\\cdot1{,}21$.",
      "Calculăm: $S=1210$ lei.",
    ],
  },
  {
    id: "mf-5",
    topic: "matematici-financiare",
    type: "input",
    points: 6,
    prompt: "Un produs are prețul net $200$ lei, iar cota de TVA este $19\\%$. Determinați prețul cu TVA (în lei).",
    correctAnswer: "238",
    explanation: [
      "Aplicăm formula: $P_{TVA}=P_{net}\\left(1+\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $P_{TVA}=200\\cdot1{,}19$.",
      "Calculăm: $P_{TVA}=238$ lei.",
    ],
  },
  {
    id: "mf-6",
    topic: "matematici-financiare",
    type: "mcq",
    points: 6,
    prompt: "Suma finală obținută printr-o dobândă simplă de $200$ lei aplicată unui capital de $1000$ lei este:",
    options: ["$1200$ lei", "$1000$ lei", "$200$ lei", "$800$ lei"],
    correctAnswer: "$1200$ lei",
    explanation: [
      "Suma finală este capitalul plus dobânda: $S=C+D$.",
      "Înlocuim: $S=1000+200=1200$ lei.",
    ],
  },
  {
    id: "mf-7",
    topic: "matematici-financiare",
    type: "input",
    points: 6,
    prompt: "Determinați câte procente reprezintă $50$ din $200$.",
    correctAnswer: "25",
    explanation: [
      "Calculăm raportul $\\dfrac{50}{200}$ și îl exprimăm în procente.",
      "$\\dfrac{50}{200}=0{,}25=25\\%$.",
      "Rezultă $25\\%$.",
    ],
  },
];
```

- [ ] **Step 9: Register the exercises in `ALL_EXERCISES`**

In `src/data/index.ts`, replace:

```ts
import { functiiExponentialeLogaritmiceExercises } from "./questions/functiiExponentialeLogaritmice";
```

with:

```ts
import { functiiExponentialeLogaritmiceExercises } from "./questions/functiiExponentialeLogaritmice";
import { matematiciFinanciareExercises } from "./questions/matematiciFinanciare";
```

Then replace:

```ts
  ...functiiExponentialeLogaritmiceExercises,
];
```

with:

```ts
  ...functiiExponentialeLogaritmiceExercises,
  ...matematiciFinanciareExercises,
];
```

- [ ] **Step 10: Run the data integrity test to verify it passes**

Run: `npx vitest run src/data/index.test.ts`
Expected: PASS.

- [ ] **Step 11: Add the matching `FORMULA_SHEET` chapter**

In `src/data/formulaSheet.ts`, replace the file's final two lines (the closing of the `functii-exponentiale-logaritmice` chapter added in Task 2, and the closing of the `FORMULA_SHEET` array):

```ts
  ]),
];
```

with:

```ts
  ]),
  chapter("matematici-financiare", [
    {
      label: "Dobânda simplă",
      latex: "D=\\dfrac{C\\cdot p\\cdot n}{100}",
      plain: "D = C · p · n / 100",
    },
    {
      label: "Dobânda compusă",
      latex: "S=C\\left(1+\\dfrac{p}{100}\\right)^n",
      plain: "S = C · (1 + p/100)ⁿ",
    },
    {
      label: "Prețul cu TVA",
      latex: "P_{TVA}=P_{net}\\left(1+\\dfrac{p}{100}\\right)",
      plain: "P_TVA = P_net · (1 + p/100)",
    },
  ]),
];
```

- [ ] **Step 12: Run the formula sheet integrity test**

Run: `npx vitest run src/data/formulaSheet.test.ts`
Expected: PASS.

- [ ] **Step 13: Run the full test suite**

Run: `npm test`
Expected: all suites pass, no regressions.

- [ ] **Step 14: Commit**

```bash
git add src/types.ts src/data/index.ts src/data/theory/matematiciFinanciare.ts src/data/theory/index.ts src/data/questions/matematiciFinanciare.ts src/data/formulaSheet.ts
git commit -m "Add Matematici financiare chapter (theory + exercises)"
```

Do NOT run `npm run generate:formulas` in this task.

---

### Task 4: Statistică (`statistica`)

**Files:**
- Modify: `src/types.ts`
- Modify: `src/data/index.ts`
- Create: `src/data/theory/statistica.ts`
- Modify: `src/data/theory/index.ts`
- Create: `src/data/questions/statistica.ts`
- Modify: `src/data/formulaSheet.ts`

**Interfaces:**
- Consumes: file state left by Task 3.
- Produces: `Topic` gains `"statistica"`; `statisticaTheory: TheorySection`; `statisticaExercises: Exercise[]` (ids `st-1`..`st-7`); a new `FORMULA_SHEET` chapter. This is the final task — after it, all 18 topics (10 original + 4 ninth-grade + 4 tenth-grade) are fully wired, and this task also does the one consolidated formula-sheet regeneration.

- [ ] **Step 1: Add the topic to the `Topic` union and to `TOPICS`/`TOPIC_LABELS`**

In `src/types.ts`, replace:

```ts
  | "functii-exponentiale-logaritmice"
  | "matematici-financiare";
```

with:

```ts
  | "functii-exponentiale-logaritmice"
  | "matematici-financiare"
  | "statistica";
```

In `src/data/index.ts`, replace:

```ts
  "functii-exponentiale-logaritmice",
  "matematici-financiare",
];
```

with:

```ts
  "functii-exponentiale-logaritmice",
  "matematici-financiare",
  "statistica",
];
```

And replace:

```ts
  "functii-exponentiale-logaritmice": "Funcții putere, radical, exponențială și logaritmică",
  "matematici-financiare": "Matematici financiare",
};
```

with:

```ts
  "functii-exponentiale-logaritmice": "Funcții putere, radical, exponențială și logaritmică",
  "matematici-financiare": "Matematici financiare",
  statistica: "Statistică",
};
```

- [ ] **Step 2: Run typecheck to verify it fails (RED)**

Run: `npm run typecheck`
Expected: FAIL — `THEORY` is missing the `"statistica"` key.

- [ ] **Step 3: Create the theory file**

Create `src/data/theory/statistica.ts`:

```ts
import type { TheorySection } from "../../types";

export const statisticaTheory: TheorySection = {
  topic: "statistica",
  title: "Statistică",
  concepts: [
    {
      heading: "Culegerea și clasificarea datelor statistice",
      body: [
        "O cercetare statistică începe cu culegerea datelor referitoare la o populație statistică (mulțimea unităților observate).",
        "Datele culese pot fi clasificate în date calitative (categorii, de exemplu culoarea) și date cantitative (valori numerice, de exemplu înălțimea).",
      ],
    },
    {
      heading: "Frecvențe",
      body: [
        "Frecvența absolută a unei valori (sau categorii) este numărul de apariții ale acesteia în setul de date.",
        "Frecvența relativă este raportul dintre frecvența absolută și numărul total de date, adesea exprimată în procente.",
      ],
    },
    {
      heading: "Reprezentarea grafică a datelor statistice",
      body: [
        "Datele calitative se reprezintă adesea prin diagrame cu bare sau diagrame circulare (de tip „plăcintă”).",
        "Datele cantitative se reprezintă adesea prin histograme (bare adiacente, pentru date grupate pe intervale) sau poligoane de frecvențe.",
      ],
    },
    {
      heading: "Interpretarea datelor statistice",
      body: [
        "Interpretarea unei reprezentări grafice presupune identificarea valorii (sau categoriei) cu frecvența cea mai mare, a celei cu frecvența cea mai mică și a tendinței generale a datelor.",
        "Media aritmetică a unui set de date este suma valorilor împărțită la numărul de date și oferă o valoare reprezentativă pentru întregul set.",
      ],
    },
  ],
  examples: [
    {
      statement: "La un test, notele obținute de $10$ elevi au fost: $7,8,9,7,10,8,7,9,8,7$. Determinați frecvența absolută a notei $7$.",
      steps: [
        "Numărăm de câte ori apare nota $7$ în șirul de date: $7,7,7,7$.",
        "Nota $7$ apare de $4$ ori.",
        "Frecvența absolută a notei $7$ este $4$.",
      ],
    },
    {
      statement: "Pentru datele din exemplul anterior, determinați frecvența relativă a notei $8$ (exprimată în procente).",
      steps: [
        "Nota $8$ apare de $3$ ori din totalul de $10$ note.",
        "Frecvența relativă este $\\dfrac{3}{10}=0{,}3$.",
        "Exprimată în procente, frecvența relativă este $30\\%$.",
      ],
    },
    {
      statement: "Calculați media aritmetică a notelor $7,8,9,7,10,8,7,9,8,7$.",
      steps: [
        "Calculăm suma notelor: $7+8+9+7+10+8+7+9+8+7=80$.",
        "Împărțim suma la numărul de note: $\\dfrac{80}{10}$.",
        "Media aritmetică este $8$.",
      ],
    },
  ],
};
```

- [ ] **Step 4: Register the theory file**

In `src/data/theory/index.ts`, replace:

```ts
import { matematiciFinanciareTheory } from "./matematiciFinanciare";
```

with:

```ts
import { matematiciFinanciareTheory } from "./matematiciFinanciare";
import { statisticaTheory } from "./statistica";
```

Then replace:

```ts
  "matematici-financiare": matematiciFinanciareTheory,
};
```

with:

```ts
  "matematici-financiare": matematiciFinanciareTheory,
  statistica: statisticaTheory,
};
```

- [ ] **Step 5: Run typecheck to verify it passes**

Run: `npm run typecheck`
Expected: exits 0.

- [ ] **Step 6: Run the theory integrity test**

Run: `npx vitest run src/data/theory/index.test.ts`
Expected: PASS.

- [ ] **Step 7: Run the data integrity test to verify it fails (RED for exercises)**

Run: `npx vitest run src/data/index.test.ts`
Expected: FAIL — no exercises yet for `statistica`.

- [ ] **Step 8: Create the exercises file**

Create `src/data/questions/statistica.ts`:

```ts
import type { Exercise } from "../../types";

export const statisticaExercises: Exercise[] = [
  {
    id: "st-1",
    topic: "statistica",
    type: "input",
    points: 6,
    prompt: "Într-o clasă de $20$ de elevi, $8$ au ochii căprui. Determinați frecvența relativă (în procente) a elevilor cu ochii căprui.",
    correctAnswer: "40",
    explanation: [
      "Frecvența relativă este raportul $\\dfrac{8}{20}$.",
      "Calculăm: $\\dfrac{8}{20}=0{,}4$.",
      "Exprimată în procente, frecvența relativă este $40\\%$.",
    ],
  },
  {
    id: "st-2",
    topic: "statistica",
    type: "mcq",
    points: 6,
    prompt: "Frecvența absolută a unei valori dintr-un set de date reprezintă:",
    options: [
      "numărul de apariții ale valorii în setul de date",
      "raportul dintre valoare și numărul total de date",
      "media aritmetică a datelor",
      "valoarea maximă din setul de date",
    ],
    correctAnswer: "numărul de apariții ale valorii în setul de date",
    explanation: [
      "Aceasta este definiția frecvenței absolute.",
      "Frecvența relativă, în schimb, este raportul dintre frecvența absolută și numărul total de date.",
    ],
  },
  {
    id: "st-3",
    topic: "statistica",
    type: "input",
    points: 6,
    prompt: "Datele $5,6,5,7,5,6,8$ reprezintă notele unor elevi. Determinați frecvența absolută a notei $5$.",
    correctAnswer: "3",
    explanation: [
      "Numărăm aparițiile notei $5$ în șir: $5,5,5$.",
      "Nota $5$ apare de $3$ ori.",
      "Frecvența absolută este $3$.",
    ],
  },
  {
    id: "st-4",
    topic: "statistica",
    type: "mcq",
    points: 6,
    prompt: "Datele cantitative grupate pe intervale se reprezintă grafic, de regulă, prin:",
    options: ["histogramă", "diagramă circulară", "tabel de valori", "niciuna dintre variante"],
    correctAnswer: "histogramă",
    explanation: [
      "Histograma folosește bare adiacente pentru a reprezenta frecvențele datelor grupate pe intervale.",
      "Diagrama circulară este mai potrivită pentru date calitative (categorii).",
    ],
  },
  {
    id: "st-5",
    topic: "statistica",
    type: "input",
    points: 6,
    prompt: "Calculați media aritmetică a datelor $4,6,8,10$.",
    correctAnswer: "7",
    explanation: [
      "Calculăm suma: $4+6+8+10=28$.",
      "Împărțim la numărul de date: $\\dfrac{28}{4}$.",
      "Media aritmetică este $7$.",
    ],
  },
  {
    id: "st-6",
    topic: "statistica",
    type: "mcq",
    points: 6,
    prompt: "Într-un set de $50$ de date, o valoare are frecvența absolută $10$. Frecvența relativă a acesteia este:",
    options: ["$20\\%$", "$10\\%$", "$50\\%$", "$5\\%$"],
    correctAnswer: "$20\\%$",
    explanation: [
      "Frecvența relativă este $\\dfrac{10}{50}$.",
      "Calculăm: $\\dfrac{10}{50}=0{,}2=20\\%$.",
    ],
  },
  {
    id: "st-7",
    topic: "statistica",
    type: "input",
    points: 6,
    prompt: "Datele $3,3,4,5,5,5,6$ reprezintă un set statistic. Determinați valoarea cu frecvența absolută cea mai mare.",
    correctAnswer: "5",
    explanation: [
      "Numărăm frecvențele: $3$ apare de $2$ ori, $4$ apare o dată, $5$ apare de $3$ ori, $6$ apare o dată.",
      "Valoarea cu frecvența cea mai mare este $5$, cu frecvența $3$.",
    ],
  },
];
```

- [ ] **Step 9: Register the exercises in `ALL_EXERCISES`**

In `src/data/index.ts`, replace:

```ts
import { matematiciFinanciareExercises } from "./questions/matematiciFinanciare";
```

with:

```ts
import { matematiciFinanciareExercises } from "./questions/matematiciFinanciare";
import { statisticaExercises } from "./questions/statistica";
```

Then replace:

```ts
  ...matematiciFinanciareExercises,
];
```

with:

```ts
  ...matematiciFinanciareExercises,
  ...statisticaExercises,
];
```

- [ ] **Step 10: Run the data integrity test to verify it passes**

Run: `npx vitest run src/data/index.test.ts`
Expected: PASS — all 18 topics now have theory and exercises.

- [ ] **Step 11: Add the matching `FORMULA_SHEET` chapter**

In `src/data/formulaSheet.ts`, replace the file's final two lines (the closing of the `matematici-financiare` chapter added in Task 3, and the closing of the `FORMULA_SHEET` array):

```ts
  ]),
];
```

with:

```ts
  ]),
  chapter("statistica", [
    {
      label: "Frecvența relativă",
      latex: "f_r=\\dfrac{\\text{frecvența absolută}}{\\text{numărul total de date}}",
      plain: "fr = (frecvența absolută) / (numărul total de date)",
    },
    {
      label: "Media aritmetică a unui set de date",
      latex: "\\bar{x}=\\dfrac{x_1+x_2+\\cdots+x_n}{n}",
      plain: "x̄ = (x1 + x2 + ... + xn) / n",
    },
  ]),
];
```

- [ ] **Step 12: Run the formula sheet integrity test**

Run: `npx vitest run src/data/formulaSheet.test.ts`
Expected: PASS — all 18 chapters now match `TOPICS` exactly, in order.

- [ ] **Step 13: Run the full test suite**

Run: `npm test`
Expected: all suites pass, no regressions.

- [ ] **Step 14: Regenerate the formula sheet (the one consolidated regeneration for all 4 new chapters)**

Run: `npm run generate:formulas`
Expected: both `Written ...formule-bacalaureat.pdf` and `Written ...formule-bacalaureat.docx` lines printed; exits 0.

Verify: `git status --short public/` shows both `public/formule-bacalaureat.pdf` and `public/formule-bacalaureat.docx` as modified.

- [ ] **Step 15: Run the full build**

Run: `npm run build`
Expected: exits 0 (`tsc --noEmit` + `vite build`).

- [ ] **Step 16: Manual smoke test in the browser**

Run `npm run dev`, open the app, and on the Home page confirm all 4 new chapters appear in the chapter list (Puteri, radicali și logaritmi; Funcții putere, radical, exponențială și logaritmică; Matematici financiare; Statistică), each showing an empty/unattempted progress ring and no `hasSets` link. Open each chapter's "Teorie" page and confirm LaTeX renders as typeset math. Open each chapter's "Exersează" quiz and confirm all 7 exercises are answerable and grade correctly. Open the Home page's "Descarcă PDF" / "Descarcă Word" links and confirm the downloaded files include all 8 new chapters (4 from the ninth-grade round, 4 from this round) with consistent Romanian wording. If no real browser is available in this environment, rely on the build success plus a text-extraction check of the regenerated PDF/DOCX for the new chapter titles, and note the limitation in your report.

- [ ] **Step 17: Commit**

```bash
git add src/types.ts src/data/index.ts src/data/theory/statistica.ts src/data/theory/index.ts src/data/questions/statistica.ts src/data/formulaSheet.ts public/formule-bacalaureat.pdf public/formule-bacalaureat.docx
git commit -m "$(cat <<'EOF'
Add Statistică chapter (theory + exercises)

Also syncs the printable formula sheet (public/formule-bacalaureat.pdf
and .docx) to include the 4 new tenth-grade chapters added across this
plan (puteri-radicali-logaritmi, functii-exponentiale-logaritmice,
matematici-financiare, statistica), since editing
src/data/formulaSheet.ts requires regenerating those files per its own
header comment.
EOF
)"
```
