# Geometrie, Legi de compoziție, and Probabilitate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two brand-new chapters (Geometrie, Legi de compoziție) at full parity with the existing 8 chapters, and fold probability content into the existing Combinatorică chapter — closing the gaps the official 2026 M_tehnologic model exam surfaced.

**Architecture:** Same shapes established by the earlier step-explanations-and-theory project: `Exercise[]` (base 4-item file + 100-item Sets file per new topic) and a `TheorySection` (concepts + worked examples, `explanation`/`steps` as `string[]`). No type changes beyond extending the `Topic` union. Everything wires through the same generic `TOPICS`/`TOPIC_LABELS`/`ALL_EXERCISES`/`THEORY` structures the Home page, quiz flow, and theory pages already render over — no UI/component/CSS changes are needed.

**Tech Stack:** React + Vite + TypeScript, `react-katex` for LaTeX (via `MathText`), Vitest for data-integrity tests. No new dependencies.

## Global Constraints

- **Language:** Romanian, matching existing tone/register.
- **Step convention** (exercise explanations and theory examples alike): `string[]`, each element a short sentence that may contain inline `$...$` LaTeX. Typical shape is 3-5 steps: name the applicable rule/formula → substitute the given values → compute → state the conclusion (matching `correctAnswer`).
- **Every new `Exercise` has `points: 6`** (an existing integrity test in `src/data/index.test.ts` asserts this for every item in `ALL_EXERCISES` — get this wrong and the whole suite fails, not just a new test).
- **Never touch** any existing item's `id`, `type`, `points`, `prompt`, `options`, `correctAnswer`, `acceptedAnswers`, `topic`, `set` in `combinatorica.ts` or the first 100 items of `combinatoricaSets.ts` — Task 3 only *appends* new content.
- **Verification commands** (run after every task): `npm run typecheck` and `npm test`. Run the full `npm run build` additionally at the end of Task 4.
- **Out of scope:** no changes to `src/lib/grading.ts`, `src/lib/examBuilder.ts`, `src/data/examVariants.ts`, `problems.ts`, `examProblemsAlgebra.ts`, `examProblemsAnalysis.ts`, or any UI component/route/CSS file.

---

### Task 1: Geometrie — new chapter (exercises, theory, wiring)

**Files:**
- Modify: `src/types.ts`
- Create: `src/data/questions/geometrie.ts`
- Create: `src/data/questions/geometrieSets.ts`
- Create: `src/data/theory/geometrie.ts`
- Modify: `src/data/index.ts`
- Modify: `src/data/theory/index.ts`

**Interfaces:**
- Consumes: `Topic`, `Exercise`, `TheorySection` from `src/types.ts`.
- Produces: `Topic` now includes `"geometrie"`; `geometrieExercises: Exercise[]`, `geometrieSetExercises: Exercise[]`; `geometrieTheory: TheorySection`. Consumed by Task 4's final verification (and, going forward, by every other task/file that iterates `TOPICS`/`ALL_EXERCISES`/`THEORY`).

- [ ] **Step 1: Extend the `Topic` union in `src/types.ts`**

Change:

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
```

to:

```ts
export type Topic =
  | "numere-complexe"
  | "combinatorica"
  | "matrice"
  | "determinanti"
  | "sisteme"
  | "limite"
  | "derivate"
  | "integrale"
  | "geometrie";
```

(Task 2 will append `"legi-compozitie"` after this.)

- [ ] **Step 2: Create `src/data/questions/geometrie.ts`** (4 base exercises)

```ts
import type { Exercise } from "../../types";

export const geometrieExercises: Exercise[] = [
  {
    id: "gm-1",
    topic: "geometrie",
    type: "input",
    points: 6,
    prompt: "Calculați distanța dintre punctele $A(1,2)$ și $B(4,6)$.",
    correctAnswer: "5",
    explanation: [
      "Pentru $A(x_1,y_1)$ și $B(x_2,y_2)$, distanța este $AB=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.",
      "Înlocuim: $AB=\\sqrt{(4-1)^2+(6-2)^2}=\\sqrt{3^2+4^2}$.",
      "Calculăm sub radical: $9+16=25$.",
      "Rezultă $AB=\\sqrt{25}=5$.",
    ],
  },
  {
    id: "gm-2",
    topic: "geometrie",
    type: "mcq",
    points: 6,
    prompt: "Mijlocul segmentului determinat de punctele $A(2,3)$ și $B(6,7)$ are coordonatele:",
    options: ["$(4,5)$", "$(3,4)$", "$(8,10)$", "$(2,3)$"],
    correctAnswer: "$(4,5)$",
    explanation: [
      "Mijlocul segmentului $AB$ are coordonatele $M\\left(\\dfrac{x_1+x_2}{2},\\dfrac{y_1+y_2}{2}\\right)$.",
      "Înlocuim: $M\\left(\\dfrac{2+6}{2},\\dfrac{3+7}{2}\\right)=M(4,5)$.",
    ],
  },
  {
    id: "gm-3",
    topic: "geometrie",
    type: "input",
    points: 6,
    prompt: "Calculați panta dreptei $AB$, unde $A(1,1)$ și $B(3,7)$.",
    correctAnswer: "3",
    explanation: [
      "Panta dreptei determinate de $A(x_1,y_1)$ și $B(x_2,y_2)$ este $m=\\dfrac{y_2-y_1}{x_2-x_1}$.",
      "Înlocuim: $m=\\dfrac{7-1}{3-1}=\\dfrac{6}{2}$.",
      "Rezultă $m=3$.",
    ],
  },
  {
    id: "gm-4",
    topic: "geometrie",
    type: "mcq",
    points: 6,
    prompt: "Un triunghi dreptunghic are catetele $6$ și $8$. Calculați lungimea ipotenuzei.",
    options: ["$10$", "$14$", "$48$", "$7$"],
    correctAnswer: "$10$",
    explanation: [
      "Aplicăm teorema lui Pitagora: ipotenuza$^2=$ cateta$_1^2+$ cateta$_2^2$.",
      "Înlocuim: ipotenuza$^2=6^2+8^2=36+64=100$.",
      "Rezultă ipotenuza $=\\sqrt{100}=10$.",
    ],
  },
];
```

- [ ] **Step 3: Create `src/data/questions/geometrieSets.ts`** (100 exercises, 10 sets of 10)

The 10 sets are thematic, in this order:

1. Distanța dintre două puncte / mijlocul unui segment
2. Panta unei drepte / ecuația dreptei prin două puncte
3. Drepte paralele și perpendiculare
4. Aria triunghiului (coordonate/determinant) și coliniaritate
5. Teorema lui Pitagora / relații metrice în triunghiul dreptunghic
6. Trigonometrie în triunghiul dreptunghic (sin, cos, tan)
7. Teorema sinusurilor
8. Teorema cosinusului
9. Vectori — adunare, vector de poziție
10. Vectori — coliniaritate / recapitulare

Set 1 is fully specified below — use it as the exact model for format, LaTeX conventions, and step-explanation depth. Author Sets 2-10 yourself (10 items each, ids `gm-s{N}-1`..`gm-s{N}-10`, `set: N`, `points: 6`), one thematic cluster per set as listed above, alternating `"input"`/`"mcq"` roughly as Set 1 does. Every item needs a correct, self-derived `correctAnswer` and a step-by-step `explanation` in the same convention — invent problems in the same style and difficulty as Set 1 (2-3 unknowns, small integer/simple-fraction answers, occasional conceptual/definitional item mixed in with computational ones), double-check each computation yourself before writing the explanation (there is no pre-existing terse answer to fall back on here — these are new problems, so you are both the author and the checker of the math).

```ts
import type { Exercise } from "../../types";

export const geometrieSetExercises: Exercise[] = [
  // Set 1 — Distanța dintre două puncte / mijlocul unui segment
  {
    id: "gm-s1-1",
    topic: "geometrie",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Calculați distanța dintre punctele $A(0,0)$ și $B(6,8)$.",
    correctAnswer: "10",
    explanation: [
      "Aplicăm formula distanței: $AB=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.",
      "Înlocuim: $AB=\\sqrt{(6-0)^2+(8-0)^2}=\\sqrt{36+64}$.",
      "Rezultă $AB=\\sqrt{100}=10$.",
    ],
  },
  {
    id: "gm-s1-2",
    topic: "geometrie",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Calculați distanța dintre punctele $A(2,3)$ și $B(2,9)$.",
    correctAnswer: "6",
    explanation: [
      "Punctele au aceeași abscisă, deci segmentul $AB$ este vertical.",
      "Distanța este diferența ordonatelor: $AB=|9-3|=6$.",
    ],
  },
  {
    id: "gm-s1-3",
    topic: "geometrie",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Calculați distanța dintre punctele $A(-1,2)$ și $B(3,2)$.",
    correctAnswer: "4",
    explanation: [
      "Punctele au aceeași ordonată, deci segmentul $AB$ este orizontal.",
      "Distanța este diferența absciselor: $AB=|3-(-1)|=4$.",
    ],
  },
  {
    id: "gm-s1-4",
    topic: "geometrie",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Mijlocul segmentului determinat de punctele $A(2,4)$ și $B(8,10)$ are coordonatele:",
    options: ["$(5,7)$", "$(6,6)$", "$(10,14)$", "$(4,3)$"],
    correctAnswer: "$(5,7)$",
    explanation: [
      "Mijlocul segmentului $AB$ este $M\\left(\\dfrac{x_1+x_2}{2},\\dfrac{y_1+y_2}{2}\\right)$.",
      "Înlocuim: $M\\left(\\dfrac{2+8}{2},\\dfrac{4+10}{2}\\right)=M(5,7)$.",
    ],
  },
  {
    id: "gm-s1-5",
    topic: "geometrie",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Calculați distanța dintre punctele $A(1,-2)$ și $B(5,1)$.",
    correctAnswer: "5",
    explanation: [
      "Aplicăm formula distanței: $AB=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.",
      "Înlocuim: $AB=\\sqrt{(5-1)^2+(1-(-2))^2}=\\sqrt{4^2+3^2}$.",
      "Rezultă $AB=\\sqrt{16+9}=\\sqrt{25}=5$.",
    ],
  },
  {
    id: "gm-s1-6",
    topic: "geometrie",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Mijlocul segmentului determinat de punctele $A(-3,5)$ și $B(7,-1)$ are coordonatele:",
    options: ["$(2,2)$", "$(4,4)$", "$(2,3)$", "$(-2,-2)$"],
    correctAnswer: "$(2,2)$",
    explanation: [
      "Mijlocul segmentului $AB$ este $M\\left(\\dfrac{x_1+x_2}{2},\\dfrac{y_1+y_2}{2}\\right)$.",
      "Înlocuim: $M\\left(\\dfrac{-3+7}{2},\\dfrac{5+(-1)}{2}\\right)=M(2,2)$.",
    ],
  },
  {
    id: "gm-s1-7",
    topic: "geometrie",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Determinați abscisa punctului $B$, știind că $M(6,9)$ este mijlocul segmentului $AB$, iar $A(4,6)$.",
    correctAnswer: "8",
    explanation: [
      "Din formula mijlocului, $x_M=\\dfrac{x_A+x_B}{2}$, deci $x_B=2x_M-x_A$.",
      "Înlocuim: $x_B=2\\cdot6-4=12-4$.",
      "Rezultă $x_B=8$.",
    ],
  },
  {
    id: "gm-s1-8",
    topic: "geometrie",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Calculați distanța dintre punctele $A(0,5)$ și $B(12,0)$.",
    correctAnswer: "13",
    explanation: [
      "Aplicăm formula distanței: $AB=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.",
      "Înlocuim: $AB=\\sqrt{(12-0)^2+(0-5)^2}=\\sqrt{144+25}$.",
      "Rezultă $AB=\\sqrt{169}=13$.",
    ],
  },
  {
    id: "gm-s1-9",
    topic: "geometrie",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Formula distanței dintre punctele $A(x_1,y_1)$ și $B(x_2,y_2)$ este:",
    options: [
      "$\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$",
      "$(x_2-x_1)+(y_2-y_1)$",
      "$\\dfrac{x_2-x_1}{y_2-y_1}$",
      "$(x_2-x_1)^2+(y_2-y_1)^2$",
    ],
    correctAnswer: "$\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$",
    explanation: [
      "Distanța dintre două puncte se obține aplicând teorema lui Pitagora diferențelor de coordonate.",
      "Formula corectă este $AB=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.",
    ],
  },
  {
    id: "gm-s1-10",
    topic: "geometrie",
    set: 1,
    type: "input",
    points: 6,
    prompt:
      "Se consideră triunghiul cu vârfurile $A(0,0)$, $B(4,0)$, $C(0,3)$. Calculați perimetrul triunghiului $ABC$.",
    correctAnswer: "12",
    explanation: [
      "Calculăm fiecare latură: $AB=4$ (segment orizontal), $AC=3$ (segment vertical).",
      "Calculăm $BC=\\sqrt{(4-0)^2+(0-3)^2}=\\sqrt{16+9}=\\sqrt{25}=5$.",
      "Perimetrul este $AB+AC+BC=4+3+5=12$.",
    ],
  },

  // Sets 2-10: author yourself per the thematic list and conventions above.
];
```

- [ ] **Step 4: Create `src/data/theory/geometrie.ts`**

```ts
import type { TheorySection } from "../../types";

export const geometrieTheory: TheorySection = {
  topic: "geometrie",
  title: "Geometrie",
  concepts: [
    {
      heading: "Distanța dintre două puncte",
      body: [
        "Pentru punctele $A(x_1,y_1)$ și $B(x_2,y_2)$, distanța dintre ele este $AB=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.",
      ],
    },
    {
      heading: "Mijlocul unui segment",
      body: [
        "Mijlocul segmentului $AB$, cu $A(x_1,y_1)$ și $B(x_2,y_2)$, are coordonatele $M\\left(\\dfrac{x_1+x_2}{2},\\dfrac{y_1+y_2}{2}\\right)$.",
      ],
    },
    {
      heading: "Panta unei drepte",
      body: [
        "Panta dreptei determinate de punctele $A(x_1,y_1)$ și $B(x_2,y_2)$ este $m=\\dfrac{y_2-y_1}{x_2-x_1}$ (pentru $x_1\\neq x_2$).",
        "Două drepte sunt paralele dacă au pante egale; sunt perpendiculare dacă produsul pantelor este $-1$.",
      ],
    },
    {
      heading: "Teorema lui Pitagora",
      body: [
        "Într-un triunghi dreptunghic, pătratul ipotenuzei este egal cu suma pătratelor catetelor: $BC^2=AB^2+AC^2$ (unde unghiul drept este în $A$).",
      ],
    },
    {
      heading: "Trigonometrie în triunghiul dreptunghic",
      body: [
        "Pentru un unghi ascuțit $\\alpha$ într-un triunghi dreptunghic: $\\sin\\alpha=\\dfrac{\\text{cateta opusă}}{\\text{ipotenuză}}$, $\\cos\\alpha=\\dfrac{\\text{cateta alăturată}}{\\text{ipotenuză}}$, $\\tan\\alpha=\\dfrac{\\text{cateta opusă}}{\\text{cateta alăturată}}$.",
      ],
    },
    {
      heading: "Teorema sinusurilor și teorema cosinusului",
      body: [
        "Teorema sinusurilor: $\\dfrac{a}{\\sin A}=\\dfrac{b}{\\sin B}=\\dfrac{c}{\\sin C}=2R$.",
        "Teorema cosinusului: $a^2=b^2+c^2-2bc\\cos A$.",
      ],
    },
    {
      heading: "Vectori",
      body: [
        "Vectorul de poziție al unui punct $A(x,y)$ este $\\overrightarrow{OA}=x\\vec{i}+y\\vec{j}$.",
        "Doi vectori nenuli sunt coliniari dacă unul este un multiplu scalar al celuilalt.",
      ],
    },
  ],
  examples: [
    {
      statement: "Calculați distanța dintre punctele $A(3,1)$ și $B(7,4)$ și determinați mijlocul segmentului $AB$.",
      steps: [
        "Aplicăm formula distanței: $AB=\\sqrt{(7-3)^2+(4-1)^2}$.",
        "Calculăm sub radical: $4^2+3^2=16+9=25$, deci $AB=\\sqrt{25}=5$.",
        "Mijlocul segmentului este $M\\left(\\dfrac{3+7}{2},\\dfrac{1+4}{2}\\right)=M\\left(5,\\dfrac{5}{2}\\right)$.",
      ],
    },
    {
      statement: "Un triunghi dreptunghic are cateta $AB=5$ și ipotenuza $BC=13$. Calculați cealaltă catetă $AC$ și $\\sin B$.",
      steps: [
        "Aplicăm teorema lui Pitagora: $BC^2=AB^2+AC^2$.",
        "Înlocuim: $13^2=5^2+AC^2 \\Rightarrow 169=25+AC^2 \\Rightarrow AC^2=144$.",
        "Rezultă $AC=12$.",
        "Calculăm $\\sin B=\\dfrac{\\text{cateta opusă lui }B}{\\text{ipotenuză}}=\\dfrac{AC}{BC}=\\dfrac{12}{13}$.",
      ],
    },
    {
      statement: "Într-un triunghi $ABC$ se cunosc $AB=6$, $AC=8$ și $\\cos A=\\dfrac12$. Calculați $BC$.",
      steps: [
        "Aplicăm teorema cosinusului: $BC^2=AB^2+AC^2-2\\cdot AB\\cdot AC\\cdot\\cos A$.",
        "Înlocuim: $BC^2=36+64-2\\cdot6\\cdot8\\cdot\\dfrac12$.",
        "Calculăm: $BC^2=100-48=52$.",
        "Rezultă $BC=\\sqrt{52}=2\\sqrt{13}$.",
      ],
    },
  ],
};
```

- [ ] **Step 5: Wire `geometrie` into `src/data/index.ts`**

Add these two imports next to the existing `numereComplexe`/`numereComplexeSets` imports:

```ts
import { geometrieExercises } from "./questions/geometrie";
import { geometrieSetExercises } from "./questions/geometrieSets";
```

Append `"geometrie"` to the end of the `TOPICS` array:

```ts
export const TOPICS: Topic[] = [
  "numere-complexe",
  "combinatorica",
  "matrice",
  "determinanti",
  "sisteme",
  "limite",
  "derivate",
  "integrale",
  "geometrie",
];
```

Add an entry to `TOPIC_LABELS`:

```ts
  geometrie: "Geometrie",
```

Append the two new exercise arrays to `ALL_EXERCISES`:

```ts
  ...geometrieExercises,
  ...geometrieSetExercises,
```

- [ ] **Step 6: Wire `geometrieTheory` into `src/data/theory/index.ts`**

Add the import:

```ts
import { geometrieTheory } from "./geometrie";
```

Add the entry to `THEORY`:

```ts
  geometrie: geometrieTheory,
```

- [ ] **Step 7: Verify**

Run: `npm run typecheck && npm test`
Expected: both pass. The existing `src/data/index.test.ts` and `src/data/theory/index.test.ts` integrity checks automatically cover `geometrie` now that it's in `TOPICS`/`ALL_EXERCISES`/`THEORY` — no test file changes needed.
Run: `grep -c "id: \"gm-" src/data/questions/geometrie.ts src/data/questions/geometrieSets.ts` — expect `4` and `100`.

- [ ] **Step 8: Commit**

```bash
git add src/types.ts src/data/questions/geometrie.ts src/data/questions/geometrieSets.ts src/data/theory/geometrie.ts src/data/index.ts src/data/theory/index.ts
git commit -m "Add Geometrie chapter (exercises, theory, wiring)"
```

---

### Task 2: Legi de compoziție — new chapter (exercises, theory, wiring)

**Files:**
- Modify: `src/types.ts`
- Create: `src/data/questions/legiCompozitie.ts`
- Create: `src/data/questions/legiCompozitieSets.ts`
- Create: `src/data/theory/legiCompozitie.ts`
- Modify: `src/data/index.ts`
- Modify: `src/data/theory/index.ts`

**Interfaces:** same shape as Task 1, topic `legi-compozitie`. Independent of Task 1's new files, but touches the same shared files (`types.ts`, `index.ts`, `theory/index.ts`) — make your edits additive (append), not replacing what Task 1 added.

- [ ] **Step 1: Extend the `Topic` union in `src/types.ts`**

Add `"legi-compozitie"` as one more member of the union (after `"geometrie"`, which Task 1 already added):

```ts
export type Topic =
  | "numere-complexe"
  | "combinatorica"
  | "matrice"
  | "determinanti"
  | "sisteme"
  | "limite"
  | "derivate"
  | "integrale"
  | "geometrie"
  | "legi-compozitie";
```

- [ ] **Step 2: Create `src/data/questions/legiCompozitie.ts`** (4 base exercises)

```ts
import type { Exercise } from "../../types";

export const legiCompozitieExercises: Exercise[] = [
  {
    id: "lc-1",
    topic: "legi-compozitie",
    type: "input",
    points: 6,
    prompt: "Pe mulțimea numerelor reale se definește legea de compoziție $x\\circ y=xy+4(x+y)$. Calculați $1\\circ 2$.",
    correctAnswer: "14",
    explanation: [
      "Înlocuim direct în formula legii: $1\\circ 2=1\\cdot2+4(1+2)$.",
      "Calculăm: $1\\cdot2=2$ și $4(1+2)=4\\cdot3=12$.",
      "Rezultă $1\\circ 2=2+12=14$.",
    ],
  },
  {
    id: "lc-2",
    topic: "legi-compozitie",
    type: "mcq",
    points: 6,
    prompt:
      "Care dintre următoarele afirmații justifică faptul că legea $x\\circ y=xy+4(x+y)$ este comutativă?",
    options: [
      "Înmulțirea și adunarea numerelor reale sunt comutative",
      "Legea are element neutru",
      "Legea este asociativă",
      "Ecuația $x\\circ x=x$ are soluție unică",
    ],
    correctAnswer: "Înmulțirea și adunarea numerelor reale sunt comutative",
    explanation: [
      "Legea este $x\\circ y=xy+4(x+y)$, construită doar din înmulțire și adunare de numere reale.",
      "Cum $xy=yx$ și $x+y=y+x$ pentru orice numere reale, rezultă $x\\circ y=y\\circ x$.",
    ],
  },
  {
    id: "lc-3",
    topic: "legi-compozitie",
    type: "input",
    points: 6,
    prompt: "Pentru legea $x\\circ y=xy+4(x+y)$, determinați numărul real $x$ pentru care $x\\circ 3=x$.",
    correctAnswer: "-2",
    explanation: [
      "Înlocuim în formula legii: $x\\circ3=3x+4(x+3)$.",
      "Desfacem paranteza: $3x+4x+12=7x+12$.",
      "Punem condiția $x\\circ3=x$: $7x+12=x \\Rightarrow 6x=-12$.",
      "Rezultă $x=-2$.",
    ],
  },
  {
    id: "lc-4",
    topic: "legi-compozitie",
    type: "mcq",
    points: 6,
    prompt: "Pe $\\mathbb{R}$ se definește legea $x\\circ y=x+y-3$. Elementul neutru al legii este:",
    options: ["$3$", "$0$", "$-3$", "$1$"],
    correctAnswer: "$3$",
    explanation: [
      "Elementul neutru $e$ verifică $x\\circ e=x$, pentru orice $x$.",
      "Înlocuim în formulă: $x+e-3=x$.",
      "Simplificăm: $e-3=0 \\Rightarrow e=3$.",
    ],
  },
];
```

- [ ] **Step 3: Create `src/data/questions/legiCompozitieSets.ts`** (100 exercises, 10 sets of 10)

The 10 sets are thematic, in this order:

1. Definiția legii de compoziție / calcul direct
2. Comutativitate
3. Asociativitate
4. Element neutru
5. Element simetrizabil
6. Tabla operației (mulțimi finite mici)
7. Ecuații de tipul $x\circ y=e$ / $x\circ a=b$
8. Proprietăți combinate (recapitulare parțială)
9. Legi de compoziție cu formule mai complexe
10. Recapitulare / aplicații mixte

Set 1 is fully specified below. Author Sets 2-10 yourself (ids `lc-s{N}-1`..`lc-s{N}-10`, `set: N`, `points: 6`), one cluster per set, alternating `"input"`/`"mcq"` roughly as Set 1 does. Invent a different concrete operation formula for each item (mostly of the shape $x\circ y=axy+b(x+y)+c$ or similar low-degree polynomial in $x,y$) so items don't repeat, compute each result yourself and double-check it before writing the explanation — there is no pre-existing terse answer to expand here, you are both author and checker.

```ts
import type { Exercise } from "../../types";

export const legiCompozitieSetExercises: Exercise[] = [
  // Set 1 — Definiția legii de compoziție / calcul direct
  {
    id: "lc-s1-1",
    topic: "legi-compozitie",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Pe $\\mathbb{R}$ se definește legea $x\\circ y=xy+x+y$. Calculați $2\\circ 3$.",
    correctAnswer: "11",
    explanation: [
      "Înlocuim în formula legii: $2\\circ3=2\\cdot3+2+3$.",
      "Calculăm: $2\\cdot3=6$, iar $6+2+3=11$.",
    ],
  },
  {
    id: "lc-s1-2",
    topic: "legi-compozitie",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Pe $\\mathbb{R}$ se definește legea $x\\circ y=x+y+2xy$. Calculați $1\\circ 4$.",
    correctAnswer: "13",
    explanation: [
      "Înlocuim în formula legii: $1\\circ4=1+4+2\\cdot1\\cdot4$.",
      "Calculăm: $2\\cdot1\\cdot4=8$, iar $1+4+8=13$.",
    ],
  },
  {
    id: "lc-s1-3",
    topic: "legi-compozitie",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Pe $\\mathbb{R}$ se definește legea $x\\circ y=2xy-x-y$. Calculați $3\\circ 2$.",
    correctAnswer: "7",
    explanation: [
      "Înlocuim în formula legii: $3\\circ2=2\\cdot3\\cdot2-3-2$.",
      "Calculăm: $2\\cdot3\\cdot2=12$, iar $12-3-2=7$.",
    ],
  },
  {
    id: "lc-s1-4",
    topic: "legi-compozitie",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Pe $\\mathbb{R}$ se definește legea $x\\circ y=x+y-xy$. Calculați $2\\circ 2$.",
    options: ["$0$", "$4$", "$2$", "$-2$"],
    correctAnswer: "$0$",
    explanation: [
      "Înlocuim în formula legii: $2\\circ2=2+2-2\\cdot2$.",
      "Calculăm: $2+2-4=0$.",
    ],
  },
  {
    id: "lc-s1-5",
    topic: "legi-compozitie",
    set: 1,
    type: "mcq",
    points: 6,
    prompt:
      "Legea $x\\circ y=x^2+y^2$ definită pe $\\mathbb{R}$ este o lege de compoziție internă deoarece:",
    options: [
      "pentru orice $x,y\\in\\mathbb{R}$, $x^2+y^2\\in\\mathbb{R}$",
      "legea este comutativă",
      "legea are element neutru",
      "ecuația $x\\circ x=0$ are soluție",
    ],
    correctAnswer: "pentru orice $x,y\\in\\mathbb{R}$, $x^2+y^2\\in\\mathbb{R}$",
    explanation: [
      "O lege de compoziție pe o mulțime $M$ este internă dacă rezultatul rămâne mereu în $M$.",
      "Cum $x^2+y^2$ este întotdeauna un număr real, legea este internă pe $\\mathbb{R}$.",
    ],
  },
  {
    id: "lc-s1-6",
    topic: "legi-compozitie",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Pe $\\mathbb{R}$ se definește legea $x\\circ y=3xy+1$. Calculați $(-1)\\circ 2$.",
    correctAnswer: "-5",
    explanation: [
      "Înlocuim în formula legii: $(-1)\\circ2=3\\cdot(-1)\\cdot2+1$.",
      "Calculăm: $3\\cdot(-1)\\cdot2=-6$, iar $-6+1=-5$.",
    ],
  },
  {
    id: "lc-s1-7",
    topic: "legi-compozitie",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Pe $\\mathbb{R}$ se definește legea $x\\circ y=xy+x-y$. Calculați $5\\circ 1$.",
    correctAnswer: "9",
    explanation: [
      "Înlocuim în formula legii: $5\\circ1=5\\cdot1+5-1$.",
      "Calculăm: $5\\cdot1=5$, iar $5+5-1=9$.",
    ],
  },
  {
    id: "lc-s1-8",
    topic: "legi-compozitie",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Pe $\\mathbb{R}$ se definește legea $x\\circ y=\\dfrac{x+y}{2}$. Calculați $4\\circ 10$.",
    options: ["$7$", "$14$", "$6$", "$40$"],
    correctAnswer: "$7$",
    explanation: [
      "Înlocuim în formula legii: $4\\circ10=\\dfrac{4+10}{2}$.",
      "Calculăm: $\\dfrac{14}{2}=7$.",
    ],
  },
  {
    id: "lc-s1-9",
    topic: "legi-compozitie",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Pe $\\mathbb{R}$ se definește legea $x\\circ y=x+y+5$. Calculați $0\\circ 0$.",
    correctAnswer: "5",
    explanation: [
      "Înlocuim în formula legii: $0\\circ0=0+0+5$.",
      "Rezultă $0\\circ0=5$.",
    ],
  },
  {
    id: "lc-s1-10",
    topic: "legi-compozitie",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Pe $\\mathbb{R}$ se definește legea $x\\circ y=xy-2(x+y)$. Calculați $3\\circ 4$.",
    correctAnswer: "-2",
    explanation: [
      "Înlocuim în formula legii: $3\\circ4=3\\cdot4-2(3+4)$.",
      "Calculăm: $3\\cdot4=12$ și $2(3+4)=14$.",
      "Rezultă $3\\circ4=12-14=-2$.",
    ],
  },

  // Sets 2-10: author yourself per the thematic list and conventions above.
];
```

- [ ] **Step 4: Create `src/data/theory/legiCompozitie.ts`**

```ts
import type { TheorySection } from "../../types";

export const legiCompozitieTheory: TheorySection = {
  topic: "legi-compozitie",
  title: "Legi de compoziție",
  concepts: [
    {
      heading: "Legea de compoziție",
      body: [
        "O lege de compoziție (operație) pe o mulțime $M$ este o funcție $\\circ: M\\times M\\to M$, care asociază fiecărei perechi $(x,y)$ un unic element $x\\circ y\\in M$.",
        "Legea este internă dacă rezultatul $x\\circ y$ rămâne întotdeauna în $M$, pentru orice $x,y\\in M$.",
      ],
    },
    {
      heading: "Comutativitate și asociativitate",
      body: [
        "Legea $\\circ$ este comutativă dacă $x\\circ y=y\\circ x$, pentru orice $x,y\\in M$.",
        "Legea $\\circ$ este asociativă dacă $(x\\circ y)\\circ z=x\\circ(y\\circ z)$, pentru orice $x,y,z\\in M$.",
      ],
    },
    {
      heading: "Element neutru",
      body: [
        "Elementul $e\\in M$ este element neutru pentru legea $\\circ$ dacă $x\\circ e=e\\circ x=x$, pentru orice $x\\in M$.",
      ],
    },
    {
      heading: "Element simetrizabil",
      body: [
        "Elementul $x\\in M$ este simetrizabil dacă există $x'\\in M$ astfel încât $x\\circ x'=x'\\circ x=e$ (elementul neutru).",
        "Elementul $x'$ se numește simetricul lui $x$.",
      ],
    },
    {
      heading: "Tabla operației",
      body: [
        "Pentru o mulțime finită, legea de compoziție poate fi descrisă printr-un tabel (tabla operației), în care la intersecția liniei $x$ cu coloana $y$ se află $x\\circ y$.",
      ],
    },
  ],
  examples: [
    {
      statement:
        "Pe $\\mathbb{R}$ se definește legea $x\\circ y=xy+4(x+y)$. Calculați $1\\circ 2$ și $2\\circ 1$, apoi comparați rezultatele.",
      steps: [
        "Înlocuim în formulă: $1\\circ2=1\\cdot2+4(1+2)=2+12=14$.",
        "Calculăm și $2\\circ1=2\\cdot1+4(2+1)=2+12=14$.",
        "Rezultatele coincid, ceea ce ilustrează comutativitatea legii (înmulțirea și adunarea numerelor reale sunt comutative).",
      ],
    },
    {
      statement: "Pe $\\mathbb{R}$ se definește legea $x\\circ y=x+y-2$. Determinați elementul neutru $e$ al legii.",
      steps: [
        "Elementul neutru $e$ verifică $x\\circ e=x$, pentru orice $x$.",
        "Înlocuim în formulă: $x+e-2=x$.",
        "Simplificăm: $e-2=0 \\Rightarrow e=2$.",
      ],
    },
    {
      statement:
        "Pentru legea $x\\circ y=x+y-2$ (cu elementul neutru $e=2$, din exemplul anterior), determinați simetricul $x'$ al numărului $x=5$.",
      steps: [
        "Simetricul $x'$ verifică $x\\circ x'=e$, adică $5\\circ x'=2$.",
        "Înlocuim în formulă: $5+x'-2=2$.",
        "Rezolvăm: $x'+3=2 \\Rightarrow x'=-1$.",
      ],
    },
  ],
};
```

- [ ] **Step 5: Wire `legi-compozitie` into `src/data/index.ts`**

Add these two imports next to Task 1's `geometrie` imports:

```ts
import { legiCompozitieExercises } from "./questions/legiCompozitie";
import { legiCompozitieSetExercises } from "./questions/legiCompozitieSets";
```

Append `"legi-compozitie"` to the end of the `TOPICS` array (after `"geometrie"`):

```ts
  "geometrie",
  "legi-compozitie",
];
```

Add an entry to `TOPIC_LABELS`:

```ts
  "legi-compozitie": "Legi de compoziție",
```

Append the two new exercise arrays to `ALL_EXERCISES` (after Task 1's `geometrie` entries):

```ts
  ...legiCompozitieExercises,
  ...legiCompozitieSetExercises,
```

- [ ] **Step 6: Wire `legiCompozitieTheory` into `src/data/theory/index.ts`**

Add the import:

```ts
import { legiCompozitieTheory } from "./legiCompozitie";
```

Add the entry to `THEORY`:

```ts
  "legi-compozitie": legiCompozitieTheory,
```

- [ ] **Step 7: Verify**

Run: `npm run typecheck && npm test`
Expected: both pass.
Run: `grep -c "id: \"lc-" src/data/questions/legiCompozitie.ts src/data/questions/legiCompozitieSets.ts` — expect `4` and `100`.

- [ ] **Step 8: Commit**

```bash
git add src/types.ts src/data/questions/legiCompozitie.ts src/data/questions/legiCompozitieSets.ts src/data/theory/legiCompozitie.ts src/data/index.ts src/data/theory/index.ts
git commit -m "Add Legi de compoziție chapter (exercises, theory, wiring)"
```

---

### Task 3: Probabilitate — addition to the existing Combinatorică chapter

**Files:**
- Modify: `src/data/questions/combinatoricaSets.ts`
- Modify: `src/data/theory/combinatorica.ts`
- Modify: `src/data/index.ts`

**Interfaces:** none new. Pure content addition — does not touch the existing 4 items in `combinatorica.ts` or the existing 100 items (Sets 1-10) in `combinatoricaSets.ts`.

- [ ] **Step 1: Append Set 11 (10 probability items) to `src/data/questions/combinatoricaSets.ts`**

Add these 10 items to the end of the `combinatoricaSetExercises` array (before the closing `];`):

```ts
  // Set 11 — Probabilități
  {
    id: "cb-s11-1",
    topic: "combinatorica",
    set: 11,
    type: "input",
    points: 6,
    prompt: "Se consideră mulțimea $A=\\{1,2,3,4,5,6\\}$. Alegând un număr $n$ din $A$, determinați probabilitatea ca $n$ să fie multiplu de $3$.",
    correctAnswer: "1/3",
    acceptedAnswers: ["0.33", "0,33"],
    explanation: [
      "Numărul cazurilor posibile este $6$ (câte elemente are mulțimea $A$).",
      "Multiplii lui $3$ din $A$ sunt $3$ și $6$, deci $2$ cazuri favorabile.",
      "Probabilitatea este $P=\\dfrac{2}{6}=\\dfrac13$.",
    ],
  },
  {
    id: "cb-s11-2",
    topic: "combinatorica",
    set: 11,
    type: "mcq",
    points: 6,
    prompt: "Se aruncă un zar. Probabilitatea de a obține o față cu număr par este:",
    options: ["$\\dfrac12$", "$\\dfrac13$", "$\\dfrac23$", "$\\dfrac16$"],
    correctAnswer: "$\\dfrac12$",
    explanation: [
      "Fețele posibile sunt $1,2,3,4,5,6$, deci $6$ cazuri posibile.",
      "Fețele pare sunt $2,4,6$, deci $3$ cazuri favorabile.",
      "Probabilitatea este $P=\\dfrac{3}{6}=\\dfrac12$.",
    ],
  },
  {
    id: "cb-s11-3",
    topic: "combinatorica",
    set: 11,
    type: "input",
    points: 6,
    prompt: "O urnă conține $4$ bile roșii și $6$ bile albastre. Se extrage o bilă la întâmplare. Determinați probabilitatea ca bila extrasă să fie roșie.",
    correctAnswer: "2/5",
    acceptedAnswers: ["0.4", "0,4"],
    explanation: [
      "Numărul cazurilor posibile este numărul total de bile: $4+6=10$.",
      "Numărul cazurilor favorabile este numărul bilelor roșii: $4$.",
      "Probabilitatea este $P=\\dfrac{4}{10}=\\dfrac25$.",
    ],
  },
  {
    id: "cb-s11-4",
    topic: "combinatorica",
    set: 11,
    type: "input",
    points: 6,
    prompt: "Probabilitatea ca un elev să promoveze un examen este $0{,}8$. Determinați probabilitatea ca elevul să nu promoveze.",
    correctAnswer: "0.2",
    acceptedAnswers: ["0,2"],
    explanation: [
      "Evenimentul \"nu promovează\" este evenimentul contrar celui \"promovează\".",
      "Probabilitatea evenimentului contrar este $P(\\bar A)=1-P(A)$.",
      "Rezultă $P(\\bar A)=1-0{,}8=0{,}2$.",
    ],
  },
  {
    id: "cb-s11-5",
    topic: "combinatorica",
    set: 11,
    type: "mcq",
    points: 6,
    prompt: "Dintr-un grup de $5$ băieți și $3$ fete se aleg simultan $2$ persoane. Probabilitatea ca ambele persoane alese să fie fete este:",
    options: ["$\\dfrac{3}{28}$", "$\\dfrac{1}{8}$", "$\\dfrac{3}{8}$", "$\\dfrac{2}{28}$"],
    correctAnswer: "$\\dfrac{3}{28}$",
    explanation: [
      "Numărul cazurilor posibile este $C_8^2$ (alegem $2$ persoane din cele $8$ în total): $C_8^2=\\dfrac{8\\cdot7}{2}=28$.",
      "Numărul cazurilor favorabile este $C_3^2$ (alegem $2$ fete din cele $3$): $C_3^2=\\dfrac{3\\cdot2}{2}=3$.",
      "Probabilitatea este $P=\\dfrac{3}{28}$.",
    ],
  },
  {
    id: "cb-s11-6",
    topic: "combinatorica",
    set: 11,
    type: "input",
    points: 6,
    prompt: "Se aruncă două zaruri. Determinați probabilitatea ca ambele zaruri să arate fața cu numărul $6$.",
    correctAnswer: "1/36",
    explanation: [
      "Cele două aruncări sunt evenimente independente.",
      "Probabilitatea ca un zar să arate $6$ este $\\dfrac16$ pentru fiecare zar.",
      "Pentru evenimente independente, $P(A\\cap B)=P(A)\\cdot P(B)$, deci $P=\\dfrac16\\cdot\\dfrac16=\\dfrac1{36}$.",
    ],
  },
  {
    id: "cb-s11-7",
    topic: "combinatorica",
    set: 11,
    type: "input",
    points: 6,
    prompt: "Se consideră mulțimea $A=\\{1,2,3,4,5,6,7,8,9,10\\}$. Determinați probabilitatea ca, alegând un număr $n$ din $A$, numărul $n^2$ să fie mai mare decât $50$.",
    correctAnswer: "3/10",
    acceptedAnswers: ["0.3", "0,3"],
    explanation: [
      "Numărul cazurilor posibile este $10$.",
      "Punem condiția $n^2>50$: cum $7^2=49$ și $8^2=64$, condiția este îndeplinită pentru $n\\in\\{8,9,10\\}$.",
      "Numărul cazurilor favorabile este $3$, deci $P=\\dfrac{3}{10}$.",
    ],
  },
  {
    id: "cb-s11-8",
    topic: "combinatorica",
    set: 11,
    type: "mcq",
    points: 6,
    prompt: "Dacă evenimentul $A$ are probabilitatea $P(A)=0{,}3$, probabilitatea evenimentului contrar $\\bar A$ este:",
    options: ["$0{,}7$", "$0{,}3$", "$1$", "$0$"],
    correctAnswer: "$0{,}7$",
    explanation: [
      "Probabilitatea evenimentului contrar este $P(\\bar A)=1-P(A)$.",
      "Înlocuim: $P(\\bar A)=1-0{,}3=0{,}7$.",
    ],
  },
  {
    id: "cb-s11-9",
    topic: "combinatorica",
    set: 11,
    type: "input",
    points: 6,
    prompt: "Dintr-o urnă cu $6$ bile numerotate de la $1$ la $6$ se extrag simultan $3$ bile. Determinați probabilitatea ca suma numerelor extrase să fie $6$.",
    correctAnswer: "1/20",
    acceptedAnswers: ["0.05", "0,05"],
    explanation: [
      "Numărul cazurilor posibile este $C_6^3=\\dfrac{6\\cdot5\\cdot4}{6}=20$.",
      "Suma minimă posibilă a $3$ numere distincte din $\\{1,\\ldots,6\\}$ este $1+2+3=6$, obținută doar de submulțimea $\\{1,2,3\\}$.",
      "Orice altă alegere de $3$ numere are suma strict mai mare, deci există un singur caz favorabil.",
      "Probabilitatea este $P=\\dfrac{1}{20}$.",
    ],
  },
  {
    id: "cb-s11-10",
    topic: "combinatorica",
    set: 11,
    type: "mcq",
    points: 6,
    prompt: "Care este formula probabilității clasice a unui eveniment $A$?",
    options: [
      "$P(A)=\\dfrac{\\text{cazuri favorabile}}{\\text{cazuri posibile}}$",
      "$P(A)=\\text{cazuri favorabile}\\cdot\\text{cazuri posibile}$",
      "$P(A)=\\text{cazuri favorabile}-\\text{cazuri posibile}$",
      "$P(A)=\\dfrac{\\text{cazuri posibile}}{\\text{cazuri favorabile}}$",
    ],
    correctAnswer: "$P(A)=\\dfrac{\\text{cazuri favorabile}}{\\text{cazuri posibile}}$",
    explanation: [
      "Probabilitatea clasică a unui eveniment se definește ca raportul dintre numărul cazurilor favorabile și numărul cazurilor posibile.",
    ],
  },
```

- [ ] **Step 2: Append probability content to `src/data/theory/combinatorica.ts`**

Add a 5th concept to the `concepts` array (after `"Binomul lui Newton"`):

```ts
    {
      heading: "Probabilitate clasică",
      body: [
        "Probabilitatea clasică a unui eveniment este $P=\\dfrac{\\text{numărul cazurilor favorabile}}{\\text{numărul cazurilor posibile}}$.",
        "Probabilitatea evenimentului contrar este $P(\\bar A)=1-P(A)$.",
        "Pentru evenimente independente, probabilitatea ca ambele să se producă este produsul probabilităților lor: $P(A\\cap B)=P(A)\\cdot P(B)$.",
      ],
    },
```

Add 2 more examples to the `examples` array (after the existing 3):

```ts
    {
      statement:
        "Se consideră mulțimea $A=\\{1,2,3,4,5,6,7,8,9,10\\}$. Alegând un număr $n$ din $A$, determinați probabilitatea ca $n$ să fie număr par.",
      steps: [
        "Numărul cazurilor posibile este $10$ (câte elemente are mulțimea $A$).",
        "Numerele pare din $A$ sunt $2,4,6,8,10$, deci $5$ cazuri favorabile.",
        "Probabilitatea este $P=\\dfrac{5}{10}=\\dfrac12$.",
      ],
    },
    {
      statement:
        "Se aleg simultan $2$ bile dintr-o urnă cu $3$ bile albe și $2$ bile negre. Determinați probabilitatea ca ambele bile alese să fie albe.",
      steps: [
        "Numărul cazurilor posibile este $C_5^2$ (alegem $2$ bile din cele $5$ în total): $C_5^2=\\dfrac{5\\cdot4}{2}=10$.",
        "Numărul cazurilor favorabile este $C_3^2$ (alegem $2$ bile albe din cele $3$): $C_3^2=\\dfrac{3\\cdot2}{2}=3$.",
        "Probabilitatea este $P=\\dfrac{C_3^2}{C_5^2}=\\dfrac{3}{10}$.",
      ],
    },
```

- [ ] **Step 3: Rename the chapter label in `src/data/index.ts`**

Change:

```ts
  combinatorica: "Combinatorică",
```

to:

```ts
  combinatorica: "Combinatorică și probabilități",
```

- [ ] **Step 4: Verify**

Run: `npm run typecheck && npm test`
Expected: both pass.
Run: `grep -c "id: \"cb-s11-" src/data/questions/combinatoricaSets.ts` — expect `10`.
Run: `grep -c "id: \"cb-" src/data/questions/combinatorica.ts src/data/questions/combinatoricaSets.ts` combined should now total `114` (4 base + 110 sets).

- [ ] **Step 5: Commit**

```bash
git add src/data/questions/combinatoricaSets.ts src/data/theory/combinatorica.ts src/data/index.ts
git commit -m "Add probability content and Set 11 to Combinatorică chapter"
```

---

### Task 4: Final verification

**Files:** none — this task only runs commands and, if something is found broken, fixes the smallest thing necessary in whichever file is actually wrong.

**Interfaces:**
- Consumes: completion of Tasks 1-3 (every new topic/content must already be wired and passing its own task's tests — this task's `npm run build` is what proves the whole thing hangs together end-to-end).

- [ ] **Step 1: Full verification**

Run: `npm run build` (full `tsc --noEmit && vite build`)
Expected: PASS. If it fails, the error will point at the specific file/line — fix only that, following the surrounding convention in that file, then re-run until it passes.
Run: `npm test`
Expected: all suites PASS — this includes `src/data/index.test.ts` (now validating 10 topics instead of 8: unique ids, ≥1 exercise per topic, every exercise worth 6 points, non-empty step-array explanations) and `src/data/theory/index.test.ts` (now validating 10 `TheorySection`s instead of 8).

- [ ] **Step 2: Manual smoke test**

Run: `npm run dev`, open the app, confirm:
- The Home page now shows 10 topic cards, including "Geometrie" and "Legi de compoziție", and the Combinatorică card now reads "Combinatorică și probabilități".
- Clicking "Exersează" on Geometrie loads a practice question with correctly-rendered LaTeX.
- Clicking "Teorie" on Geometrie renders its concepts and 3 worked examples.
- Clicking "Exersează" on Legi de compoziție loads a practice question with correctly-rendered LaTeX.
- Clicking "Teorie" on Legi de compoziție renders its concepts and 3 worked examples.
- Clicking "Seturi de exerciții" on Combinatorică shows 11 sets now (not 10).

Stop the dev server afterward. If you have browser/screenshot tooling, use it for real verification; otherwise say explicitly what you could and couldn't verify.

- [ ] **Step 3: Commit** (only if Step 1 required a fix)

If Step 1's `npm run build` found and required fixing a missed item, commit that fix separately:

```bash
git add -A
git commit -m "Fix missed item found during final geometrie/legi-compozitie/probabilitate verification"
```

If no fix was needed, there is nothing to commit for this task.
