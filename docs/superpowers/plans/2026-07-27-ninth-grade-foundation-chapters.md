# Ninth-Grade Foundation Chapters Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four new BacMate chapters that close the highest-priority 9th-grade gaps against the official Programa M_tehnologic: sets/mathematical logic, the linear function, the quadratic function, and sequences — each with a theory page and a base exercises file, matching every existing topic's file shape.

**Architecture:** Four new `Topic` union members, each wired into the same three integration points every existing topic already uses: `src/types.ts` (the `Topic` union), `src/data/index.ts` (`TOPICS`, `TOPIC_LABELS`, `ALL_EXERCISES`), and a `TheorySection` registered in `src/data/theory/index.ts`. No component changes — `TopicCard`'s `hasSets` conditional already renders correctly for a topic with no `*Sets.ts` file.

**Tech Stack:** Plain TypeScript data files, existing Vite/Vitest setup. No new dependencies.

## Global Constraints

- Every new `Exercise` is worth exactly 6 points (existing test `data/index.test.ts` → "every exercise is worth 6 points" enforces this across all topics).
- Every exercise `id` must be globally unique (existing test → "has unique exercise ids").
- Every `mcq` exercise's `correctAnswer` must appear verbatim in its `options` array (existing test → "every mcq item's correctAnswer is present among its options").
- Every theory section needs at least one concept and at least 2 worked examples (existing test `theory/index.test.ts`).
- The four new topics are appended to the end of `TOPICS` (after `legi-compozitie`) — no existing topic's position changes.
- No `*Sets.ts` practice-set file for these four topics this round, no new `Problem` (Subiectul II/III) entries, no changes to `src/data/examVariants.ts`.
- All LaTeX must use the `$...$` / `$$...$$` delimiters `MathText` already parses, with the same escaping style as existing theory/exercise files (e.g. `\\dfrac`, `\\Rightarrow`).

---

### Task 1: Mulțimi și logică matematică (`multimi-logica`)

**Files:**
- Modify: `src/types.ts`
- Modify: `src/data/index.ts`
- Create: `src/data/theory/multimiLogica.ts`
- Modify: `src/data/theory/index.ts`
- Create: `src/data/questions/multimiLogica.ts`

**Interfaces:**
- Produces: `Topic` gains the member `"multimi-logica"`; `multimiLogicaTheory: TheorySection` (topic `"multimi-logica"`); `multimiLogicaExercises: Exercise[]` (topic `"multimi-logica"`, ids `ml-1`..`ml-7`).

- [ ] **Step 1: Add the topic to the `Topic` union and to `TOPICS`/`TOPIC_LABELS`**

In `src/types.ts`, replace:

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

with:

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
  | "legi-compozitie"
  | "multimi-logica";
```

In `src/data/index.ts`, replace:

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
  "legi-compozitie",
];

export const TOPIC_LABELS: Record<Topic, string> = {
  "numere-complexe": "Numere complexe",
  combinatorica: "Combinatorică și probabilități",
  matrice: "Matrici",
  determinanti: "Determinanți",
  sisteme: "Sisteme de ecuații liniare",
  limite: "Limite de funcții",
  derivate: "Derivate și aplicații",
  integrale: "Primitive și integrale definite",
  geometrie: "Geometrie",
  "legi-compozitie": "Legi de compoziție",
};
```

with:

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
  "legi-compozitie",
  "multimi-logica",
];

export const TOPIC_LABELS: Record<Topic, string> = {
  "numere-complexe": "Numere complexe",
  combinatorica: "Combinatorică și probabilități",
  matrice: "Matrici",
  determinanti: "Determinanți",
  sisteme: "Sisteme de ecuații liniare",
  limite: "Limite de funcții",
  derivate: "Derivate și aplicații",
  integrale: "Primitive și integrale definite",
  geometrie: "Geometrie",
  "legi-compozitie": "Legi de compoziție",
  "multimi-logica": "Mulțimi și logică matematică",
};
```

- [ ] **Step 2: Run typecheck to verify it fails (RED)**

Run: `npm run typecheck`
Expected: FAIL — a TypeScript error in `src/data/theory/index.ts` because `THEORY: Record<Topic, TheorySection>` is missing the `"multimi-logica"` key.

- [ ] **Step 3: Create the theory file**

Create `src/data/theory/multimiLogica.ts`:

```ts
import type { TheorySection } from "../../types";

export const multimiLogicaTheory: TheorySection = {
  topic: "multimi-logica",
  title: "Mulțimi și logică matematică",
  concepts: [
    {
      heading: "Operații cu mulțimi",
      body: [
        "Reuniunea mulțimilor $A$ și $B$ este $A\\cup B=\\{x \\mid x\\in A \\text{ sau } x\\in B\\}$.",
        "Intersecția mulțimilor $A$ și $B$ este $A\\cap B=\\{x \\mid x\\in A \\text{ și } x\\in B\\}$.",
        "Diferența mulțimilor $A$ și $B$ este $A\\setminus B=\\{x \\mid x\\in A \\text{ și } x\\notin B\\}$.",
        "Complementara mulțimii $A$ față de o mulțime totală $E$ este $C_EA=E\\setminus A$.",
      ],
    },
    {
      heading: "Intervale de numere reale",
      body: [
        "Pentru $a,b\\in\\mathbb{R}$, $a<b$, intervalul închis este $[a,b]=\\{x\\in\\mathbb{R} \\mid a\\le x\\le b\\}$, iar intervalul deschis este $(a,b)=\\{x\\in\\mathbb{R} \\mid a<x<b\\}$.",
        "Intervalele nemărginite se notează $(a,+\\infty)=\\{x\\in\\mathbb{R}\\mid x>a\\}$ și $(-\\infty,a)=\\{x\\in\\mathbb{R}\\mid x<a\\}$.",
      ],
    },
    {
      heading: "Propoziții și predicate",
      body: [
        "O propoziție este un enunț căruia i se poate atribui o valoare de adevăr: adevărat (1) sau fals (0).",
        "Un predicat este un enunț care depinde de una sau mai multe variabile și devine propoziție pentru fiecare valoare dată variabilelor.",
        "Cuantificatorul universal $\\forall$ se citește \"oricare ar fi\", iar cuantificatorul existențial $\\exists$ se citește \"există\".",
      ],
    },
    {
      heading: "Operatori logici",
      body: [
        "Negația propoziției $p$ este $\\bar{p}$ (sau $\\neg p$), adevărată exact atunci când $p$ este falsă.",
        "Conjuncția $p\\wedge q$ este adevărată doar când ambele propoziții $p$ și $q$ sunt adevărate.",
        "Disjuncția $p\\vee q$ este adevărată dacă cel puțin una dintre propozițiile $p$, $q$ este adevărată.",
        "Implicația $p\\Rightarrow q$ este falsă doar atunci când $p$ este adevărată și $q$ este falsă.",
        "Echivalența $p\\Leftrightarrow q$ este adevărată când $p$ și $q$ au aceeași valoare de adevăr.",
      ],
    },
    {
      heading: "Inducția matematică",
      body: [
        "Metoda inducției matematice se folosește pentru a demonstra că o proprietate $P(n)$ este adevărată pentru orice număr natural $n\\ge n_0$.",
        "Etapa de verificare: se arată că $P(n_0)$ este adevărată.",
        "Etapa de demonstrație: presupunând $P(k)$ adevărată (ipoteza de inducție), se arată că $P(k+1)$ este adevărată.",
      ],
    },
  ],
  examples: [
    {
      statement: "Fie $A=\\{1,2,3,4,5\\}$ și $B=\\{3,4,5,6,7\\}$. Determinați $A\\cup B$, $A\\cap B$ și $A\\setminus B$.",
      steps: [
        "Reuniunea conține toate elementele care apar în cel puțin una dintre mulțimi: $A\\cup B=\\{1,2,3,4,5,6,7\\}$.",
        "Intersecția conține elementele comune: $A\\cap B=\\{3,4,5\\}$.",
        "Diferența $A\\setminus B$ conține elementele din $A$ care nu sunt în $B$: $A\\setminus B=\\{1,2\\}$.",
      ],
    },
    {
      statement: "Determinați valoarea de adevăr a propoziției $p$: „3 este număr par” și scrieți negația ei.",
      steps: [
        "Propoziția $p$ este falsă, deoarece $3$ este număr impar.",
        "Negația este $\\bar p$: „3 nu este număr par”, care este adevărată.",
      ],
    },
    {
      statement: "Demonstrați prin inducție matematică faptul că $1+2+\\cdots+n=\\dfrac{n(n+1)}{2}$, pentru orice $n\\ge1$.",
      steps: [
        "Verificare pentru $n=1$: suma este $1$, iar formula dă $\\dfrac{1\\cdot2}{2}=1$, deci egalitatea este adevărată.",
        "Presupunem adevărată egalitatea pentru $n=k$: $1+2+\\cdots+k=\\dfrac{k(k+1)}{2}$ (ipoteza de inducție).",
        "Pentru $n=k+1$: $1+2+\\cdots+k+(k+1)=\\dfrac{k(k+1)}{2}+(k+1)=\\dfrac{(k+1)(k+2)}{2}$, adică formula rămâne adevărată.",
        "Conform principiului inducției matematice, egalitatea este adevărată pentru orice $n\\ge1$.",
      ],
    },
  ],
};
```

- [ ] **Step 4: Register the theory file**

In `src/data/theory/index.ts`, replace:

```ts
import type { Topic, TheorySection } from "../../types";
import { numereComplexeTheory } from "./numereComplexe";
import { combinatoricaTheory } from "./combinatorica";
import { matriceTheory } from "./matrice";
import { determinantiTheory } from "./determinanti";
import { sistemeTheory } from "./sisteme";
import { limiteTheory } from "./limite";
import { derivateTheory } from "./derivate";
import { integraleTheory } from "./integrale";
import { geometrieTheory } from "./geometrie";
import { legiCompozitieTheory } from "./legiCompozitie";

export const THEORY: Record<Topic, TheorySection> = {
  "numere-complexe": numereComplexeTheory,
  combinatorica: combinatoricaTheory,
  matrice: matriceTheory,
  determinanti: determinantiTheory,
  sisteme: sistemeTheory,
  limite: limiteTheory,
  derivate: derivateTheory,
  integrale: integraleTheory,
  geometrie: geometrieTheory,
  "legi-compozitie": legiCompozitieTheory,
};
```

with:

```ts
import type { Topic, TheorySection } from "../../types";
import { numereComplexeTheory } from "./numereComplexe";
import { combinatoricaTheory } from "./combinatorica";
import { matriceTheory } from "./matrice";
import { determinantiTheory } from "./determinanti";
import { sistemeTheory } from "./sisteme";
import { limiteTheory } from "./limite";
import { derivateTheory } from "./derivate";
import { integraleTheory } from "./integrale";
import { geometrieTheory } from "./geometrie";
import { legiCompozitieTheory } from "./legiCompozitie";
import { multimiLogicaTheory } from "./multimiLogica";

export const THEORY: Record<Topic, TheorySection> = {
  "numere-complexe": numereComplexeTheory,
  combinatorica: combinatoricaTheory,
  matrice: matriceTheory,
  determinanti: determinantiTheory,
  sisteme: sistemeTheory,
  limite: limiteTheory,
  derivate: derivateTheory,
  integrale: integraleTheory,
  geometrie: geometrieTheory,
  "legi-compozitie": legiCompozitieTheory,
  "multimi-logica": multimiLogicaTheory,
};
```

- [ ] **Step 5: Run typecheck to verify it passes**

Run: `npm run typecheck`
Expected: exits 0.

- [ ] **Step 6: Run the theory integrity test**

Run: `npx vitest run src/data/theory/index.test.ts`
Expected: PASS (3 tests) — `multimi-logica` now has a theory section with concepts and ≥2 examples.

- [ ] **Step 7: Run the data integrity test to verify it fails (RED for exercises)**

Run: `npx vitest run src/data/index.test.ts`
Expected: FAIL — "has at least one exercise per topic" fails for `multimi-logica` (it's in `TOPICS` but `ALL_EXERCISES` has no entries for it yet).

- [ ] **Step 8: Create the exercises file**

Create `src/data/questions/multimiLogica.ts`:

```ts
import type { Exercise } from "../../types";

export const multimiLogicaExercises: Exercise[] = [
  {
    id: "ml-1",
    topic: "multimi-logica",
    type: "input",
    points: 6,
    prompt: "Fie $A=\\{1,2,3,4\\}$ și $B=\\{2,4,6\\}$. Câte elemente are mulțimea $A\\cap B$?",
    correctAnswer: "2",
    explanation: [
      "Elementele comune celor două mulțimi sunt $2$ și $4$.",
      "Deci $A\\cap B=\\{2,4\\}$, care are $2$ elemente.",
    ],
  },
  {
    id: "ml-2",
    topic: "multimi-logica",
    type: "mcq",
    points: 6,
    prompt: "Mulțimea $A\\setminus B$, pentru $A=\\{1,2,3,4,5\\}$ și $B=\\{1,2,3\\}$, este:",
    options: ["$\\{4,5\\}$", "$\\{1,2,3\\}$", "$\\{1,2,3,4,5\\}$", "$\\emptyset$"],
    correctAnswer: "$\\{4,5\\}$",
    explanation: [
      "Diferența $A\\setminus B$ conține elementele din $A$ care nu se regăsesc în $B$.",
      "Acestea sunt $4$ și $5$.",
    ],
  },
  {
    id: "ml-3",
    topic: "multimi-logica",
    type: "input",
    points: 6,
    prompt: "Câte numere întregi conține intervalul $[-2,3]$?",
    correctAnswer: "6",
    explanation: [
      "Intervalul închis $[-2,3]$ conține toate numerele întregi de la $-2$ la $3$.",
      "Acestea sunt $-2,-1,0,1,2,3$, deci $6$ numere.",
    ],
  },
  {
    id: "ml-4",
    topic: "multimi-logica",
    type: "mcq",
    points: 6,
    prompt: "Negația propoziției „toate numerele naturale sunt pare” este:",
    options: [
      "Există cel puțin un număr natural care nu este par",
      "Toate numerele naturale sunt impare",
      "Niciun număr natural nu este par",
      "Există un număr natural par",
    ],
    correctAnswer: "Există cel puțin un număr natural care nu este par",
    explanation: [
      "Negația unei propoziții cu cuantificatorul universal $\\forall$ se obține folosind cuantificatorul existențial $\\exists$ pentru negația predicatului.",
      "Negația lui „$\\forall n, P(n)$” este „$\\exists n$ astfel încât $\\overline{P(n)}$”.",
    ],
  },
  {
    id: "ml-5",
    topic: "multimi-logica",
    type: "mcq",
    points: 6,
    prompt: "Dacă propoziția $p$ este adevărată și propoziția $q$ este falsă, atunci valoarea de adevăr a propoziției $p\\Rightarrow q$ este:",
    options: ["falsă", "adevărată", "nu se poate determina", "depinde de $p$ și $q$"],
    correctAnswer: "falsă",
    explanation: [
      "Implicația $p\\Rightarrow q$ este falsă exact atunci când $p$ este adevărată și $q$ este falsă.",
      "Cum aceasta este situația dată, $p\\Rightarrow q$ este falsă.",
    ],
  },
  {
    id: "ml-6",
    topic: "multimi-logica",
    type: "input",
    points: 6,
    prompt: "Folosind formula $1+2+\\cdots+n=\\dfrac{n(n+1)}{2}$, calculați suma $1+2+\\cdots+10$.",
    correctAnswer: "55",
    explanation: [
      "Aplicăm formula cu $n=10$: suma este $\\dfrac{10\\cdot11}{2}$.",
      "Calculăm: $\\dfrac{110}{2}=55$.",
    ],
  },
  {
    id: "ml-7",
    topic: "multimi-logica",
    type: "mcq",
    points: 6,
    prompt: "Complementara mulțimii $A=\\{1,2\\}$ față de mulțimea totală $E=\\{1,2,3,4,5\\}$ este:",
    options: ["$\\{3,4,5\\}$", "$\\{1,2\\}$", "$\\emptyset$", "$\\{1,2,3,4,5\\}$"],
    correctAnswer: "$\\{3,4,5\\}$",
    explanation: [
      "Complementara $C_EA=E\\setminus A$ conține elementele din $E$ care nu sunt în $A$.",
      "Acestea sunt $3,4,5$.",
    ],
  },
];
```

- [ ] **Step 9: Register the exercises in `ALL_EXERCISES`**

In `src/data/index.ts`, replace:

```ts
import { legiCompozitieExercises } from "./questions/legiCompozitie";
import { legiCompozitieSetExercises } from "./questions/legiCompozitieSets";
```

with:

```ts
import { legiCompozitieExercises } from "./questions/legiCompozitie";
import { legiCompozitieSetExercises } from "./questions/legiCompozitieSets";
import { multimiLogicaExercises } from "./questions/multimiLogica";
```

Then replace:

```ts
export const ALL_EXERCISES: Exercise[] = [
  ...numereComplexeExercises,
  ...numereComplexeSetExercises,
  ...combinatoricaExercises,
  ...combinatoricaSetExercises,
  ...matriceExercises,
  ...matriceSetExercises,
  ...determinantiExercises,
  ...determinantiSetExercises,
  ...sistemeExercises,
  ...sistemeSetExercises,
  ...limiteExercises,
  ...limiteSetExercises,
  ...derivateExercises,
  ...derivateSetExercises,
  ...integraleExercises,
  ...integraleSetExercises,
  ...geometrieExercises,
  ...geometrieSetExercises,
  ...legiCompozitieExercises,
  ...legiCompozitieSetExercises,
];
```

with:

```ts
export const ALL_EXERCISES: Exercise[] = [
  ...numereComplexeExercises,
  ...numereComplexeSetExercises,
  ...combinatoricaExercises,
  ...combinatoricaSetExercises,
  ...matriceExercises,
  ...matriceSetExercises,
  ...determinantiExercises,
  ...determinantiSetExercises,
  ...sistemeExercises,
  ...sistemeSetExercises,
  ...limiteExercises,
  ...limiteSetExercises,
  ...derivateExercises,
  ...derivateSetExercises,
  ...integraleExercises,
  ...integraleSetExercises,
  ...geometrieExercises,
  ...geometrieSetExercises,
  ...legiCompozitieExercises,
  ...legiCompozitieSetExercises,
  ...multimiLogicaExercises,
];
```

- [ ] **Step 10: Run the data integrity test to verify it passes**

Run: `npx vitest run src/data/index.test.ts`
Expected: PASS (all tests, including "has at least one exercise per topic" and "every exercise is worth 6 points" now covering `multimi-logica`).

- [ ] **Step 11: Run the full test suite**

Run: `npm test`
Expected: all suites pass, no regressions.

- [ ] **Step 12: Commit**

```bash
git add src/types.ts src/data/index.ts src/data/theory/multimiLogica.ts src/data/theory/index.ts src/data/questions/multimiLogica.ts
git commit -m "Add Mulțimi și logică matematică chapter (theory + exercises)"
```

---

### Task 2: Funcția de gradul I (`functia-gradul-1`)

**Files:**
- Modify: `src/types.ts`
- Modify: `src/data/index.ts`
- Create: `src/data/theory/functiaGradul1.ts`
- Modify: `src/data/theory/index.ts`
- Create: `src/data/questions/functiaGradul1.ts`

**Interfaces:**
- Consumes: same `Topic`/`TheorySection`/`Exercise` types as Task 1; builds on the file state Task 1 left (the `Topic` union, `TOPICS`, `TOPIC_LABELS`, `THEORY`, and `ALL_EXERCISES` all already include the `multimi-logica` entries added there).
- Produces: `Topic` gains `"functia-gradul-1"`; `functiaGradul1Theory: TheorySection`; `functiaGradul1Exercises: Exercise[]` (ids `g1-1`..`g1-7`).

- [ ] **Step 1: Add the topic to the `Topic` union and to `TOPICS`/`TOPIC_LABELS`**

In `src/types.ts`, replace:

```ts
  | "legi-compozitie"
  | "multimi-logica";
```

with:

```ts
  | "legi-compozitie"
  | "multimi-logica"
  | "functia-gradul-1";
```

In `src/data/index.ts`, replace:

```ts
  "legi-compozitie",
  "multimi-logica",
];
```

with:

```ts
  "legi-compozitie",
  "multimi-logica",
  "functia-gradul-1",
];
```

And replace:

```ts
  "legi-compozitie": "Legi de compoziție",
  "multimi-logica": "Mulțimi și logică matematică",
};
```

with:

```ts
  "legi-compozitie": "Legi de compoziție",
  "multimi-logica": "Mulțimi și logică matematică",
  "functia-gradul-1": "Funcția de gradul I",
};
```

- [ ] **Step 2: Run typecheck to verify it fails (RED)**

Run: `npm run typecheck`
Expected: FAIL — `THEORY` in `src/data/theory/index.ts` is missing the `"functia-gradul-1"` key.

- [ ] **Step 3: Create the theory file**

Create `src/data/theory/functiaGradul1.ts`:

```ts
import type { TheorySection } from "../../types";

export const functiaGradul1Theory: TheorySection = {
  topic: "functia-gradul-1",
  title: "Funcția de gradul I",
  concepts: [
    {
      heading: "Definiție și reprezentare grafică",
      body: [
        "Funcția de gradul I este $f:\\mathbb{R}\\to\\mathbb{R}$, $f(x)=ax+b$, cu $a,b\\in\\mathbb{R}$, $a\\neq0$.",
        "Graficul funcției de gradul I este o dreaptă; $a$ se numește panta (coeficientul unghiular), iar $b$ este ordonata la origine (valoarea $f(0)$).",
        "Pentru trasarea graficului este suficient să determinăm două puncte, de exemplu intersecțiile cu axele de coordonate.",
      ],
    },
    {
      heading: "Intersecția cu axele de coordonate",
      body: [
        "Graficul intersectează axa $Oy$ în punctul $(0,b)$.",
        "Graficul intersectează axa $Ox$ în soluția ecuației $f(x)=0$, adică în punctul $\\left(-\\dfrac{b}{a},0\\right)$.",
      ],
    },
    {
      heading: "Monotonia funcției de gradul I",
      body: [
        "Dacă $a>0$, funcția este strict crescătoare pe $\\mathbb{R}$.",
        "Dacă $a<0$, funcția este strict descrescătoare pe $\\mathbb{R}$.",
      ],
    },
    {
      heading: "Semnul funcției de gradul I",
      body: [
        "Funcția $f(x)=ax+b$ are semnul lui $a$ pentru $x>-\\dfrac{b}{a}$ și semnul opus lui $a$ pentru $x<-\\dfrac{b}{a}$ (când $a>0$).",
        "Această proprietate se folosește pentru rezolvarea inecuațiilor de forma $ax+b>0$, $ax+b<0$, $ax+b\\ge0$ sau $ax+b\\le0$.",
      ],
    },
    {
      heading: "Poziția relativă a două drepte",
      body: [
        "Două drepte $y=a_1x+b_1$ și $y=a_2x+b_2$ sunt paralele dacă $a_1=a_2$ și $b_1\\neq b_2$.",
        "Două drepte sunt confundate dacă $a_1=a_2$ și $b_1=b_2$.",
        "Două drepte se intersectează într-un singur punct dacă $a_1\\neq a_2$; abscisa punctului de intersecție este soluția ecuației $a_1x+b_1=a_2x+b_2$.",
      ],
    },
  ],
  examples: [
    {
      statement: "Fie $f(x)=2x-4$. Reprezentați grafic funcția, determinând intersecțiile cu axele de coordonate.",
      steps: [
        "Intersecția cu axa $Oy$: $f(0)=2\\cdot0-4=-4$, deci punctul $(0,-4)$.",
        "Intersecția cu axa $Ox$: rezolvăm $2x-4=0 \\Rightarrow x=2$, deci punctul $(2,0)$.",
        "Graficul este dreapta care trece prin punctele $(0,-4)$ și $(2,0)$.",
      ],
    },
    {
      statement: "Rezolvați inecuația $-3x+6\\le0$.",
      steps: [
        "Rezolvăm ecuația asociată: $-3x+6=0 \\Rightarrow x=2$.",
        "Cum coeficientul lui $x$ este $a=-3<0$, funcția $f(x)=-3x+6$ este strict descrescătoare, deci este negativă pentru $x>2$ și pozitivă pentru $x<2$.",
        "Inecuația $f(x)\\le0$ este verificată pentru $x\\ge2$, deci soluția este $[2,+\\infty)$.",
      ],
    },
    {
      statement: "Determinați punctul de intersecție al dreptelor $y=2x+1$ și $y=-x+7$.",
      steps: [
        "Punem condiția ca cele două expresii să fie egale: $2x+1=-x+7$.",
        "Rezolvăm: $3x=6 \\Rightarrow x=2$.",
        "Calculăm ordonata: $y=2\\cdot2+1=5$.",
        "Punctul de intersecție este $(2,5)$.",
      ],
    },
  ],
};
```

- [ ] **Step 4: Register the theory file**

In `src/data/theory/index.ts`, replace:

```ts
import { multimiLogicaTheory } from "./multimiLogica";
```

with:

```ts
import { multimiLogicaTheory } from "./multimiLogica";
import { functiaGradul1Theory } from "./functiaGradul1";
```

Then replace:

```ts
  "multimi-logica": multimiLogicaTheory,
};
```

with:

```ts
  "multimi-logica": multimiLogicaTheory,
  "functia-gradul-1": functiaGradul1Theory,
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
Expected: FAIL — no exercises yet for `functia-gradul-1`.

- [ ] **Step 8: Create the exercises file**

Create `src/data/questions/functiaGradul1.ts`:

```ts
import type { Exercise } from "../../types";

export const functiaGradul1Exercises: Exercise[] = [
  {
    id: "g1-1",
    topic: "functia-gradul-1",
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=3x-6$. Calculați $f(4)$.",
    correctAnswer: "6",
    explanation: [
      "Înlocuim $x=4$ în expresia funcției: $f(4)=3\\cdot4-6$.",
      "Calculăm: $12-6=6$.",
    ],
  },
  {
    id: "g1-2",
    topic: "functia-gradul-1",
    type: "mcq",
    points: 6,
    prompt: "Funcția $f(x)=-2x+5$ este:",
    options: ["strict descrescătoare pe $\\mathbb{R}$", "strict crescătoare pe $\\mathbb{R}$", "constantă", "nedefinită pentru $x<0$"],
    correctAnswer: "strict descrescătoare pe $\\mathbb{R}$",
    explanation: [
      "Coeficientul lui $x$ este $a=-2<0$.",
      "Cum $a<0$, funcția de gradul I este strict descrescătoare pe $\\mathbb{R}$.",
    ],
  },
  {
    id: "g1-3",
    topic: "functia-gradul-1",
    type: "input",
    points: 6,
    prompt: "Determinați soluția ecuației $4x-8=0$.",
    correctAnswer: "2",
    explanation: [
      "Rezolvăm ecuația: $4x=8$.",
      "Împărțim prin $4$: $x=2$.",
    ],
  },
  {
    id: "g1-4",
    topic: "functia-gradul-1",
    type: "mcq",
    points: 6,
    prompt: "Soluția inecuației $2x-6>0$ este:",
    options: ["$(3,+\\infty)$", "$(-\\infty,3)$", "$(-3,+\\infty)$", "$(-\\infty,-3)$"],
    correctAnswer: "$(3,+\\infty)$",
    explanation: [
      "Rezolvăm ecuația asociată: $2x-6=0 \\Rightarrow x=3$.",
      "Cum $a=2>0$, funcția este strict crescătoare, deci este pozitivă pentru $x>3$.",
      "Soluția inecuației este $(3,+\\infty)$.",
    ],
  },
  {
    id: "g1-5",
    topic: "functia-gradul-1",
    type: "input",
    points: 6,
    prompt: "Determinați ordonata la origine a funcției $f(x)=5x-7$ (valoarea $f(0)$).",
    correctAnswer: "-7",
    explanation: [
      "Ordonata la origine este valoarea funcției în $x=0$: $f(0)=5\\cdot0-7$.",
      "Rezultă $f(0)=-7$.",
    ],
  },
  {
    id: "g1-6",
    topic: "functia-gradul-1",
    type: "mcq",
    points: 6,
    prompt: "Dreptele $y=3x+2$ și $y=3x-5$ sunt:",
    options: ["paralele", "confundate", "perpendiculare", "concurente"],
    correctAnswer: "paralele",
    explanation: [
      "Cele două drepte au aceeași pantă, $a_1=a_2=3$.",
      "Cum $b_1=2\\neq-5=b_2$, dreptele sunt paralele (nu confundate).",
    ],
  },
  {
    id: "g1-7",
    topic: "functia-gradul-1",
    type: "input",
    points: 6,
    prompt: "Determinați abscisa punctului de intersecție al dreptelor $y=x+3$ și $y=-2x+9$.",
    correctAnswer: "2",
    explanation: [
      "Punem condiția $x+3=-2x+9$.",
      "Rezolvăm: $3x=6 \\Rightarrow x=2$.",
    ],
  },
];
```

- [ ] **Step 9: Register the exercises in `ALL_EXERCISES`**

In `src/data/index.ts`, replace:

```ts
import { multimiLogicaExercises } from "./questions/multimiLogica";
```

with:

```ts
import { multimiLogicaExercises } from "./questions/multimiLogica";
import { functiaGradul1Exercises } from "./questions/functiaGradul1";
```

Then replace:

```ts
  ...multimiLogicaExercises,
];
```

with:

```ts
  ...multimiLogicaExercises,
  ...functiaGradul1Exercises,
];
```

- [ ] **Step 10: Run the data integrity test to verify it passes**

Run: `npx vitest run src/data/index.test.ts`
Expected: PASS.

- [ ] **Step 11: Run the full test suite**

Run: `npm test`
Expected: all suites pass, no regressions.

- [ ] **Step 12: Commit**

```bash
git add src/types.ts src/data/index.ts src/data/theory/functiaGradul1.ts src/data/theory/index.ts src/data/questions/functiaGradul1.ts
git commit -m "Add Funcția de gradul I chapter (theory + exercises)"
```

---

### Task 3: Funcția de gradul al II-lea (`functia-gradul-2`)

**Files:**
- Modify: `src/types.ts`
- Modify: `src/data/index.ts`
- Create: `src/data/theory/functiaGradul2.ts`
- Modify: `src/data/theory/index.ts`
- Create: `src/data/questions/functiaGradul2.ts`

**Interfaces:**
- Consumes: file state left by Task 2 (Topic union, `TOPICS`, `TOPIC_LABELS`, `THEORY`, `ALL_EXERCISES` all include `functia-gradul-1`'s entries).
- Produces: `Topic` gains `"functia-gradul-2"`; `functiaGradul2Theory: TheorySection`; `functiaGradul2Exercises: Exercise[]` (ids `g2-1`..`g2-7`).

- [ ] **Step 1: Add the topic to the `Topic` union and to `TOPICS`/`TOPIC_LABELS`**

In `src/types.ts`, replace:

```ts
  | "multimi-logica"
  | "functia-gradul-1";
```

with:

```ts
  | "multimi-logica"
  | "functia-gradul-1"
  | "functia-gradul-2";
```

In `src/data/index.ts`, replace:

```ts
  "multimi-logica",
  "functia-gradul-1",
];
```

with:

```ts
  "multimi-logica",
  "functia-gradul-1",
  "functia-gradul-2",
];
```

And replace:

```ts
  "multimi-logica": "Mulțimi și logică matematică",
  "functia-gradul-1": "Funcția de gradul I",
};
```

with:

```ts
  "multimi-logica": "Mulțimi și logică matematică",
  "functia-gradul-1": "Funcția de gradul I",
  "functia-gradul-2": "Funcția de gradul al II-lea",
};
```

- [ ] **Step 2: Run typecheck to verify it fails (RED)**

Run: `npm run typecheck`
Expected: FAIL — `THEORY` is missing the `"functia-gradul-2"` key.

- [ ] **Step 3: Create the theory file**

Create `src/data/theory/functiaGradul2.ts`:

```ts
import type { TheorySection } from "../../types";

export const functiaGradul2Theory: TheorySection = {
  topic: "functia-gradul-2",
  title: "Funcția de gradul al II-lea",
  concepts: [
    {
      heading: "Definiție și reprezentare grafică",
      body: [
        "Funcția de gradul al II-lea este $f:\\mathbb{R}\\to\\mathbb{R}$, $f(x)=ax^2+bx+c$, cu $a,b,c\\in\\mathbb{R}$, $a\\neq0$.",
        "Graficul funcției de gradul al II-lea este o parabolă; parabola este orientată în sus dacă $a>0$ și în jos dacă $a<0$.",
      ],
    },
    {
      heading: "Vârful parabolei",
      body: [
        "Coordonatele vârfului parabolei sunt $V\\left(-\\dfrac{b}{2a},-\\dfrac{\\Delta}{4a}\\right)$, unde $\\Delta=b^2-4ac$.",
        "Vârful este punct de minim dacă $a>0$ și punct de maxim dacă $a<0$.",
      ],
    },
    {
      heading: "Rezolvarea ecuației de gradul al II-lea",
      body: [
        "Pentru ecuația $ax^2+bx+c=0$ cu $a\\neq0$, se calculează $\\Delta=b^2-4ac$.",
        "Dacă $\\Delta>0$, ecuația are două soluții reale distincte $x_{1,2}=\\dfrac{-b\\pm\\sqrt{\\Delta}}{2a}$.",
        "Dacă $\\Delta=0$, ecuația are o soluție reală dublă $x_1=x_2=-\\dfrac{b}{2a}$.",
        "Dacă $\\Delta<0$, ecuația nu are soluții reale.",
      ],
    },
    {
      heading: "Relațiile lui Viète",
      body: [
        "Dacă $x_1,x_2$ sunt soluțiile ecuației $ax^2+bx+c=0$, atunci $x_1+x_2=-\\dfrac{b}{a}$ și $x_1\\cdot x_2=\\dfrac{c}{a}$.",
      ],
    },
    {
      heading: "Semnul funcției de gradul al II-lea",
      body: [
        "Dacă $\\Delta<0$, funcția are semn constant, egal cu semnul lui $a$, pe tot $\\mathbb{R}$.",
        "Dacă $\\Delta=0$, funcția are semnul lui $a$ pentru orice $x\\neq-\\dfrac{b}{2a}$.",
        "Dacă $\\Delta>0$, funcția are semn opus lui $a$ între rădăcini și semnul lui $a$ în afara lor.",
      ],
    },
    {
      heading: "Inecuații de gradul al II-lea",
      body: [
        "Rezolvarea unei inecuații de forma $ax^2+bx+c \\gtrless 0$ se face determinând rădăcinile ecuației asociate și apoi aplicând regula semnului funcției de gradul al II-lea.",
      ],
    },
  ],
  examples: [
    {
      statement: "Fie $f(x)=x^2-4x+3$. Determinați coordonatele vârfului parabolei.",
      steps: [
        "Calculăm $\\Delta=b^2-4ac=(-4)^2-4\\cdot1\\cdot3=16-12=4$.",
        "Abscisa vârfului este $x_V=-\\dfrac{b}{2a}=-\\dfrac{-4}{2\\cdot1}=2$.",
        "Ordonata vârfului este $y_V=-\\dfrac{\\Delta}{4a}=-\\dfrac{4}{4}=-1$.",
        "Vârful parabolei este $V(2,-1)$.",
      ],
    },
    {
      statement: "Rezolvați ecuația $x^2-5x+6=0$ și verificați rezultatul cu relațiile lui Viète.",
      steps: [
        "Calculăm $\\Delta=(-5)^2-4\\cdot1\\cdot6=25-24=1$.",
        "Cum $\\Delta>0$, soluțiile sunt $x_{1,2}=\\dfrac{5\\pm1}{2}$, adică $x_1=3$ și $x_2=2$.",
        "Verificăm cu Viète: $x_1+x_2=5=-\\dfrac{b}{a}$ și $x_1\\cdot x_2=6=\\dfrac{c}{a}$, ceea ce confirmă rezultatul.",
      ],
    },
    {
      statement: "Rezolvați inecuația $x^2-x-6\\le0$.",
      steps: [
        "Rezolvăm ecuația asociată: $x^2-x-6=0$, cu $\\Delta=1+24=25$.",
        "Rădăcinile sunt $x_{1,2}=\\dfrac{1\\pm5}{2}$, adică $x_1=-2$ și $x_2=3$.",
        "Cum $a=1>0$, funcția este negativă (sau nulă) între rădăcini, deci soluția inecuației este $[-2,3]$.",
      ],
    },
    {
      statement: "Pentru ce valori ale lui $m$ ecuația $x^2-2x+m=0$ are două soluții reale distincte?",
      steps: [
        "Condiția pentru două soluții reale distincte este $\\Delta>0$.",
        "Calculăm $\\Delta=(-2)^2-4\\cdot1\\cdot m=4-4m$.",
        "Punem condiția $4-4m>0 \\Rightarrow m<1$.",
      ],
    },
  ],
};
```

- [ ] **Step 4: Register the theory file**

In `src/data/theory/index.ts`, replace:

```ts
import { functiaGradul1Theory } from "./functiaGradul1";
```

with:

```ts
import { functiaGradul1Theory } from "./functiaGradul1";
import { functiaGradul2Theory } from "./functiaGradul2";
```

Then replace:

```ts
  "functia-gradul-1": functiaGradul1Theory,
};
```

with:

```ts
  "functia-gradul-1": functiaGradul1Theory,
  "functia-gradul-2": functiaGradul2Theory,
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
Expected: FAIL — no exercises yet for `functia-gradul-2`.

- [ ] **Step 8: Create the exercises file**

Create `src/data/questions/functiaGradul2.ts`:

```ts
import type { Exercise } from "../../types";

export const functiaGradul2Exercises: Exercise[] = [
  {
    id: "g2-1",
    topic: "functia-gradul-2",
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=x^2-6x+8$. Calculați discriminantul $\\Delta$.",
    correctAnswer: "4",
    explanation: [
      "Calculăm $\\Delta=b^2-4ac=(-6)^2-4\\cdot1\\cdot8$.",
      "Rezultă $\\Delta=36-32=4$.",
    ],
  },
  {
    id: "g2-2",
    topic: "functia-gradul-2",
    type: "mcq",
    points: 6,
    prompt: "Ecuația $x^2+2x+5=0$ are:",
    options: ["nicio soluție reală", "o soluție reală dublă", "două soluții reale distincte", "trei soluții reale"],
    correctAnswer: "nicio soluție reală",
    explanation: [
      "Calculăm $\\Delta=2^2-4\\cdot1\\cdot5=4-20=-16$.",
      "Cum $\\Delta<0$, ecuația nu are soluții reale.",
    ],
  },
  {
    id: "g2-3",
    topic: "functia-gradul-2",
    type: "input",
    points: 6,
    prompt: "Determinați abscisa vârfului parabolei asociate funcției $f(x)=x^2-8x+12$.",
    correctAnswer: "4",
    explanation: [
      "Abscisa vârfului este $x_V=-\\dfrac{b}{2a}=-\\dfrac{-8}{2\\cdot1}$.",
      "Calculăm: $x_V=4$.",
    ],
  },
  {
    id: "g2-4",
    topic: "functia-gradul-2",
    type: "mcq",
    points: 6,
    prompt: "Dacă $x_1$ și $x_2$ sunt soluțiile ecuației $x^2-7x+10=0$, atunci $x_1+x_2$ este:",
    options: ["$7$", "$10$", "$-7$", "$3$"],
    correctAnswer: "$7$",
    explanation: [
      "Conform relațiilor lui Viète, $x_1+x_2=-\\dfrac{b}{a}$.",
      "Aici $a=1$, $b=-7$, deci $x_1+x_2=7$.",
    ],
  },
  {
    id: "g2-5",
    topic: "functia-gradul-2",
    type: "input",
    points: 6,
    prompt: "Determinați produsul soluțiilor ecuației $x^2-2x-15=0$, folosind relațiile lui Viète.",
    correctAnswer: "-15",
    explanation: [
      "Conform relațiilor lui Viète, produsul soluțiilor este $x_1\\cdot x_2=\\dfrac{c}{a}$.",
      "Aici $a=1$, $c=-15$, deci $x_1\\cdot x_2=-15$.",
    ],
  },
  {
    id: "g2-6",
    topic: "functia-gradul-2",
    type: "mcq",
    points: 6,
    prompt: "Semnul funcției $f(x)=-x^2+4x-4$ pe $\\mathbb{R}$ este:",
    options: [
      "negativ sau nul pe tot $\\mathbb{R}$",
      "pozitiv pe tot $\\mathbb{R}$",
      "negativ pentru $x<2$ și pozitiv pentru $x>2$",
      "pozitiv pentru $x<2$ și negativ pentru $x>2$",
    ],
    correctAnswer: "negativ sau nul pe tot $\\mathbb{R}$",
    explanation: [
      "Calculăm $\\Delta=4^2-4\\cdot(-1)\\cdot(-4)=16-16=0$.",
      "Cum $\\Delta=0$ și $a=-1<0$, funcția are semnul lui $a$ (negativ) pentru orice $x\\neq2$, deci este negativă sau nulă pe tot $\\mathbb{R}$.",
    ],
  },
  {
    id: "g2-7",
    topic: "functia-gradul-2",
    type: "input",
    points: 6,
    prompt: "Pentru ce valoare a lui $m$ ecuația $x^2-4x+m=0$ are soluție reală dublă?",
    correctAnswer: "4",
    explanation: [
      "Condiția pentru soluție dublă este $\\Delta=0$.",
      "Calculăm $\\Delta=(-4)^2-4\\cdot1\\cdot m=16-4m$.",
      "Punem $16-4m=0 \\Rightarrow m=4$.",
    ],
  },
];
```

- [ ] **Step 9: Register the exercises in `ALL_EXERCISES`**

In `src/data/index.ts`, replace:

```ts
import { functiaGradul1Exercises } from "./questions/functiaGradul1";
```

with:

```ts
import { functiaGradul1Exercises } from "./questions/functiaGradul1";
import { functiaGradul2Exercises } from "./questions/functiaGradul2";
```

Then replace:

```ts
  ...functiaGradul1Exercises,
];
```

with:

```ts
  ...functiaGradul1Exercises,
  ...functiaGradul2Exercises,
];
```

- [ ] **Step 10: Run the data integrity test to verify it passes**

Run: `npx vitest run src/data/index.test.ts`
Expected: PASS.

- [ ] **Step 11: Run the full test suite**

Run: `npm test`
Expected: all suites pass, no regressions.

- [ ] **Step 12: Commit**

```bash
git add src/types.ts src/data/index.ts src/data/theory/functiaGradul2.ts src/data/theory/index.ts src/data/questions/functiaGradul2.ts
git commit -m "Add Funcția de gradul al II-lea chapter (theory + exercises)"
```

---

### Task 4: Șiruri (`siruri`)

**Files:**
- Modify: `src/types.ts`
- Modify: `src/data/index.ts`
- Create: `src/data/theory/siruri.ts`
- Modify: `src/data/theory/index.ts`
- Create: `src/data/questions/siruri.ts`

**Interfaces:**
- Consumes: file state left by Task 3 (Topic union, `TOPICS`, `TOPIC_LABELS`, `THEORY`, `ALL_EXERCISES` all include `functia-gradul-2`'s entries).
- Produces: `Topic` gains `"siruri"`; `siruriTheory: TheorySection`; `siruriExercises: Exercise[]` (ids `sr-1`..`sr-7`). This is the final task — after it, all 14 topics (10 original + 4 new) are fully wired.

- [ ] **Step 1: Add the topic to the `Topic` union and to `TOPICS`/`TOPIC_LABELS`**

In `src/types.ts`, replace:

```ts
  | "functia-gradul-1"
  | "functia-gradul-2";
```

with:

```ts
  | "functia-gradul-1"
  | "functia-gradul-2"
  | "siruri";
```

In `src/data/index.ts`, replace:

```ts
  "functia-gradul-1",
  "functia-gradul-2",
];
```

with:

```ts
  "functia-gradul-1",
  "functia-gradul-2",
  "siruri",
];
```

And replace:

```ts
  "functia-gradul-1": "Funcția de gradul I",
  "functia-gradul-2": "Funcția de gradul al II-lea",
};
```

with:

```ts
  "functia-gradul-1": "Funcția de gradul I",
  "functia-gradul-2": "Funcția de gradul al II-lea",
  siruri: "Șiruri",
};
```

- [ ] **Step 2: Run typecheck to verify it fails (RED)**

Run: `npm run typecheck`
Expected: FAIL — `THEORY` is missing the `"siruri"` key.

- [ ] **Step 3: Create the theory file**

Create `src/data/theory/siruri.ts`:

```ts
import type { TheorySection } from "../../types";

export const siruriTheory: TheorySection = {
  topic: "siruri",
  title: "Șiruri",
  concepts: [
    {
      heading: "Progresia aritmetică — definiție și termenul general",
      body: [
        "Un șir $(a_n)_{n\\ge1}$ este progresie aritmetică dacă există o rație $r\\in\\mathbb{R}$ astfel încât $a_{n+1}=a_n+r$, pentru orice $n\\ge1$.",
        "Termenul general al unei progresii aritmetice este $a_n=a_1+(n-1)r$.",
      ],
    },
    {
      heading: "Suma primilor n termeni ai unei progresii aritmetice",
      body: [
        "Suma primilor $n$ termeni este $S_n=\\dfrac{(a_1+a_n)\\cdot n}{2}$.",
        "Folosind termenul general, suma se poate scrie și $S_n=\\dfrac{[2a_1+(n-1)r]\\cdot n}{2}$.",
      ],
    },
    {
      heading: "Condiția ca trei numere să fie în progresie aritmetică",
      body: [
        "Numerele $a,b,c$ sunt în progresie aritmetică dacă și numai dacă $2b=a+c$ (adică $b$ este media aritmetică a lui $a$ și $c$).",
      ],
    },
    {
      heading: "Progresia geometrică — definiție și termenul general",
      body: [
        "Un șir $(b_n)_{n\\ge1}$ cu termeni nenuli este progresie geometrică dacă există o rație $q\\in\\mathbb{R}^*$ astfel încât $b_{n+1}=b_n\\cdot q$, pentru orice $n\\ge1$.",
        "Termenul general al unei progresii geometrice este $b_n=b_1\\cdot q^{n-1}$.",
      ],
    },
    {
      heading: "Suma primilor n termeni ai unei progresii geometrice",
      body: [
        "Pentru $q\\neq1$, suma primilor $n$ termeni este $S_n=b_1\\cdot\\dfrac{q^n-1}{q-1}$.",
        "Pentru $q=1$, toți termenii sunt egali cu $b_1$, deci $S_n=n\\cdot b_1$.",
      ],
    },
    {
      heading: "Condiția ca trei numere să fie în progresie geometrică",
      body: [
        "Numerele nenule $a,b,c$ sunt în progresie geometrică dacă și numai dacă $b^2=a\\cdot c$ (adică $b$ este media geometrică a lui $a$ și $c$).",
      ],
    },
  ],
  examples: [
    {
      statement: "Fie progresia aritmetică cu $a_1=5$ și rația $r=3$. Calculați $a_{10}$.",
      steps: [
        "Aplicăm formula termenului general: $a_n=a_1+(n-1)r$.",
        "Înlocuim $n=10$: $a_{10}=5+9\\cdot3$.",
        "Calculăm: $a_{10}=5+27=32$.",
      ],
    },
    {
      statement: "Calculați suma primilor $20$ de termeni ai progresiei aritmetice cu $a_1=2$ și $r=4$.",
      steps: [
        "Determinăm mai întâi termenul $a_{20}$: $a_{20}=a_1+19r=2+19\\cdot4=2+76=78$.",
        "Aplicăm formula sumei: $S_{20}=\\dfrac{(a_1+a_{20})\\cdot20}{2}$.",
        "Calculăm: $S_{20}=\\dfrac{(2+78)\\cdot20}{2}=\\dfrac{80\\cdot20}{2}=800$.",
      ],
    },
    {
      statement: "Fie progresia geometrică cu $b_1=3$ și rația $q=2$. Calculați $b_5$.",
      steps: [
        "Aplicăm formula termenului general: $b_n=b_1\\cdot q^{n-1}$.",
        "Înlocuim $n=5$: $b_5=3\\cdot2^4$.",
        "Calculăm: $b_5=3\\cdot16=48$.",
      ],
    },
    {
      statement: "Determinați $x\\in\\mathbb{R}$ astfel încât numerele $2, x, 18$ să fie în progresie geometrică.",
      steps: [
        "Punem condiția de progresie geometrică: $x^2=2\\cdot18$.",
        "Calculăm: $x^2=36$.",
        "Rezultă $x=6$ sau $x=-6$.",
      ],
    },
  ],
};
```

- [ ] **Step 4: Register the theory file**

In `src/data/theory/index.ts`, replace:

```ts
import { functiaGradul2Theory } from "./functiaGradul2";
```

with:

```ts
import { functiaGradul2Theory } from "./functiaGradul2";
import { siruriTheory } from "./siruri";
```

Then replace:

```ts
  "functia-gradul-2": functiaGradul2Theory,
};
```

with:

```ts
  "functia-gradul-2": functiaGradul2Theory,
  siruri: siruriTheory,
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
Expected: FAIL — no exercises yet for `siruri`.

- [ ] **Step 8: Create the exercises file**

Create `src/data/questions/siruri.ts`:

```ts
import type { Exercise } from "../../types";

export const siruriExercises: Exercise[] = [
  {
    id: "sr-1",
    topic: "siruri",
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=4$ și rația $r=5$. Calculați $a_6$.",
    correctAnswer: "29",
    explanation: [
      "Aplicăm formula termenului general: $a_n=a_1+(n-1)r$.",
      "Înlocuim $n=6$: $a_6=4+5\\cdot5=4+25$.",
      "Rezultă $a_6=29$.",
    ],
  },
  {
    id: "sr-2",
    topic: "siruri",
    type: "mcq",
    points: 6,
    prompt: "Șirul $2,5,8,11,\\ldots$ este:",
    options: [
      "progresie aritmetică cu rația $3$",
      "progresie geometrică cu rația $3$",
      "progresie aritmetică cu rația $2$",
      "niciuna dintre variante",
    ],
    correctAnswer: "progresie aritmetică cu rația $3$",
    explanation: [
      "Diferența dintre termeni consecutivi este constantă: $5-2=3$, $8-5=3$, $11-8=3$.",
      "Deci șirul este progresie aritmetică cu rația $r=3$.",
    ],
  },
  {
    id: "sr-3",
    topic: "siruri",
    type: "input",
    points: 6,
    prompt: "Calculați suma primilor $10$ termeni ai progresiei aritmetice cu $a_1=1$ și $r=2$ (adică $1+3+5+\\cdots$).",
    correctAnswer: "100",
    explanation: [
      "Determinăm $a_{10}=a_1+9r=1+18=19$.",
      "Aplicăm formula sumei: $S_{10}=\\dfrac{(a_1+a_{10})\\cdot10}{2}=\\dfrac{(1+19)\\cdot10}{2}$.",
      "Calculăm: $S_{10}=\\dfrac{200}{2}=100$.",
    ],
  },
  {
    id: "sr-4",
    topic: "siruri",
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=2$ și rația $q=3$. Calculați $b_4$.",
    correctAnswer: "54",
    explanation: [
      "Aplicăm formula termenului general: $b_n=b_1\\cdot q^{n-1}$.",
      "Înlocuim $n=4$: $b_4=2\\cdot3^3=2\\cdot27$.",
      "Rezultă $b_4=54$.",
    ],
  },
  {
    id: "sr-5",
    topic: "siruri",
    type: "mcq",
    points: 6,
    prompt: "Numerele $4, x, 9$ sunt în progresie geometrică dacă $x$ este egal cu:",
    options: ["$6$ sau $-6$", "$6$", "$36$", "$13$"],
    correctAnswer: "$6$ sau $-6$",
    explanation: [
      "Condiția de progresie geometrică este $x^2=4\\cdot9=36$.",
      "Rezultă $x=6$ sau $x=-6$.",
    ],
  },
  {
    id: "sr-6",
    topic: "siruri",
    type: "input",
    points: 6,
    prompt: "Determinați rația progresiei aritmetice în care $a_1=7$ și $a_5=19$.",
    correctAnswer: "3",
    explanation: [
      "Aplicăm formula termenului general: $a_5=a_1+4r$.",
      "Înlocuim: $19=7+4r \\Rightarrow 4r=12$.",
      "Rezultă $r=3$.",
    ],
  },
  {
    id: "sr-7",
    topic: "siruri",
    type: "mcq",
    points: 6,
    prompt: "Suma primilor $n$ termeni ai unei progresii geometrice cu rația $q\\neq1$ se calculează cu formula:",
    options: [
      "$S_n=b_1\\cdot\\dfrac{q^n-1}{q-1}$",
      "$S_n=\\dfrac{(b_1+b_n)\\cdot n}{2}$",
      "$S_n=b_1\\cdot n\\cdot q$",
      "$S_n=b_1^n$",
    ],
    correctAnswer: "$S_n=b_1\\cdot\\dfrac{q^n-1}{q-1}$",
    explanation: [
      "Aceasta este formula uzuală a sumei primilor $n$ termeni ai unei progresii geometrice cu rația $q\\neq1$.",
    ],
  },
];
```

- [ ] **Step 9: Register the exercises in `ALL_EXERCISES`**

In `src/data/index.ts`, replace:

```ts
import { functiaGradul2Exercises } from "./questions/functiaGradul2";
```

with:

```ts
import { functiaGradul2Exercises } from "./questions/functiaGradul2";
import { siruriExercises } from "./questions/siruri";
```

Then replace:

```ts
  ...functiaGradul2Exercises,
];
```

with:

```ts
  ...functiaGradul2Exercises,
  ...siruriExercises,
];
```

- [ ] **Step 10: Run the data integrity test to verify it passes**

Run: `npx vitest run src/data/index.test.ts`
Expected: PASS — all 14 topics now have theory and exercises.

- [ ] **Step 11: Run the full test suite**

Run: `npm test`
Expected: all suites pass, no regressions.

- [ ] **Step 12: Run the full build**

Run: `npm run build`
Expected: exits 0 (`tsc --noEmit` + `vite build`).

- [ ] **Step 13: Manual smoke test in the browser**

Run `npm run dev`, open the app, and on the Home page confirm all 4 new chapters appear in the chapter list (Mulțimi și logică matematică, Funcția de gradul I, Funcția de gradul al II-lea, Șiruri), each showing an empty/unattempted progress ring (no `hasSets` link, since there's no practice-set bank yet). Open each chapter's "Teorie" page and confirm the concepts and worked examples render correctly (LaTeX renders as typeset math, not raw `$...$` text). Open each chapter's "Exersează" quiz and confirm all 7 exercises are answerable and grade correctly.

- [ ] **Step 14: Commit**

```bash
git add src/types.ts src/data/index.ts src/data/theory/siruri.ts src/data/theory/index.ts src/data/questions/siruri.ts
git commit -m "Add Șiruri chapter (theory + exercises)"
```
