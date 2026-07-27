# Eleventh-grade theory gaps Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the two 11th-grade M_tehnologic curriculum gaps (l'Hospital's rule, Proprietatea lui Darboux) by extending the existing `derivate` and `limite` topics — no new `Topic` entries.

**Architecture:** Append one new theory concept + worked example(s) to each of `src/data/theory/derivate.ts` and `src/data/theory/limite.ts`; append one new base exercise to each of `src/data/questions/derivate.ts` and `src/data/questions/limite.ts`; append one new formula entry to the existing `derivate` chapter in `src/data/formulaSheet.ts` (l'Hospital only — Darboux is not a formula) and regenerate the downloadable PDF/DOCX once.

**Tech Stack:** Vite + React + TypeScript + Vitest, existing `TheorySection`/`Exercise`/`FormulaChapter` data shapes.

## Global Constraints

- Every exercise is worth exactly 6 points (`src/data/index.test.ts`: "every exercise is worth 6 points").
- New exercise ids: `dv-5` (derivate), `lm-5` (limite) — verified unique against every existing id in the codebase.
- For every `mcq` exercise, `correctAnswer` must appear character-for-character in `options`, **and all options must be genuinely distinct values/statements** (not just distinct strings) — this exact bug class (an mcq distractor silently equal to another option) was found and fixed twice in the tenth-grade-foundation-chapters round; check for it explicitly in both new mcqs/inputs this round.
- `TheorySection.concepts` and `.examples` are arrays — new entries are **appended** to the existing arrays, never replacing existing content. `theory/index.test.ts` only asserts minimums (≥1 concept, ≥2 examples), so this is safe.
- No `src/types.ts`, `TOPICS`, `TOPIC_LABELS`, or `THEORY` registry changes — both topics already exist and are already wired up. Do not touch these files.
- `src/data/formulaSheet.ts`'s `FORMULA_SHEET.map(c => c.topic)` must still equal `TOPICS` exactly after this plan — since no topic is added or removed, and the new formula entry is appended *inside* the existing `derivate` chapter's array (not a new chapter), this invariant is untouched by construction. Do not add a `statistica`-style new `chapter(...)` call — there is no new topic this round.
- `npm run generate:formulas` must be run exactly once, in Task 1 (the only task touching `formulaSheet.ts`), and both `public/formule-bacalaureat.pdf` and `.docx` must be committed in that same task's commit.
- Romanian text uses proper typographic quotes „..." (not escaped ASCII `\"...\"`) — apply if any new content needs quoting (not expected to be needed here, but keep it in mind).
- All LaTeX uses the existing `$...$` (inline) / `$$...$$` (display) convention consumed by `MathText`, matching the surrounding code in each file exactly (inline vs. display use per the existing file's own style — `derivate.ts`/`derivate.ts` questions use `$...$` inline throughout; `limite.ts` questions use `$$...$$` display blocks, `limite.ts` theory uses `$...$` inline — match each file's own existing convention when appending).

---

### Task 1: l'Hospital's rule — `derivate` topic

**Files:**
- Modify: `src/data/theory/derivate.ts`
- Modify: `src/data/questions/derivate.ts`
- Modify: `src/data/formulaSheet.ts`
- Modify (regenerated binaries): `public/formule-bacalaureat.pdf`, `public/formule-bacalaureat.docx`

**Interfaces:**
- Consumes: existing `TheorySection`, `Exercise`, `FormulaChapter`/`chapter()` shapes from `src/types.ts` and `src/data/formulaSheet.ts` — no new types.
- Produces: nothing new consumed by later tasks (Task 2 is independent — different files).

- [ ] **Step 1: Add the l'Hospital concept and examples to the theory file**

Edit `src/data/theory/derivate.ts`. Add a new concept to the end of the `concepts` array (after "Puncte de extrem"):

```ts
    {
      heading: "Regula lui l'Hospital",
      body: [
        "Pentru limite de forma $\\frac{0}{0}$ sau $\\frac{\\infty}{\\infty}$: dacă $f$ și $g$ sunt derivabile în jurul lui $x_0$, $g'(x) \\neq 0$, și $\\lim \\frac{f'(x)}{g'(x)}$ există, atunci $\\lim \\frac{f(x)}{g(x)} = \\lim \\frac{f'(x)}{g'(x)}$.",
        "Regula se poate aplica din nou dacă noul raport este tot o formă nedeterminată $\\frac{0}{0}$ sau $\\frac{\\infty}{\\infty}$.",
      ],
    },
```

Add two new worked examples to the end of the `examples` array (after the existing 3):

```ts
    {
      statement: "Calculați $\\lim_{x\\to0}\\dfrac{e^x-1}{x}$ folosind regula lui l'Hospital.",
      steps: [
        "Înlocuirea directă $x=0$ dă forma nedeterminată $\\frac{0}{0}$.",
        "Derivăm numărătorul și numitorul separat: $(e^x-1)'=e^x$, $(x)'=1$.",
        "Aplicăm regula lui l'Hospital: $\\lim_{x\\to0}\\dfrac{e^x-1}{x}=\\lim_{x\\to0}\\dfrac{e^x}{1}$.",
        "Înlocuim $x=0$: $\\dfrac{e^0}{1}=\\dfrac{1}{1}=1$.",
      ],
    },
    {
      statement: "Calculați $\\lim_{x\\to\\infty}\\dfrac{\\ln x}{x}$ folosind regula lui l'Hospital.",
      steps: [
        "Pentru $x\\to\\infty$, atât $\\ln x$ cât și $x$ tind la $\\infty$, deci avem forma nedeterminată $\\frac{\\infty}{\\infty}$.",
        "Derivăm numărătorul și numitorul separat: $(\\ln x)'=\\dfrac{1}{x}$, $(x)'=1$.",
        "Aplicăm regula lui l'Hospital: $\\lim_{x\\to\\infty}\\dfrac{\\ln x}{x}=\\lim_{x\\to\\infty}\\dfrac{1/x}{1}=\\lim_{x\\to\\infty}\\dfrac{1}{x}$.",
        "Pe măsură ce $x\\to\\infty$, $\\dfrac{1}{x}\\to0$.",
      ],
    },
```

The full file after this step (for reference — apply as the two insertions above, do not retype the whole file from scratch):

```ts
import type { TheorySection } from "../../types";

export const derivateTheory: TheorySection = {
  topic: "derivate",
  title: "Derivate și aplicații",
  concepts: [
    {
      heading: "Reguli de derivare uzuale",
      body: [
        "$(x^n)' = nx^{n-1}$",
        "$(\\sin x)' = \\cos x$, $(\\cos x)' = -\\sin x$",
        "$(e^x)' = e^x$, $(\\ln x)' = \\dfrac{1}{x}$",
      ],
    },
    {
      heading: "Derivarea produsului și a câtului",
      body: [
        "$(u \\cdot v)' = u'v + uv'$",
        "$\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v-uv'}{v^2}$ (pentru $v \\neq 0$)",
      ],
    },
    {
      heading: "Monotonia unei funcții",
      body: [
        "Dacă $f'(x) > 0$ pe un interval, atunci $f$ este crescătoare pe acel interval.",
        "Dacă $f'(x) < 0$ pe un interval, atunci $f$ este descrescătoare pe acel interval.",
      ],
    },
    {
      heading: "Puncte de extrem",
      body: [
        "Punctele critice sunt soluțiile ecuației $f'(x)=0$.",
        "Un punct critic $x_0$ este punct de extrem dacă $f'$ își schimbă semnul în jurul lui $x_0$ (maxim dacă trece din $+$ în $-$, minim dacă trece din $-$ în $+$).",
      ],
    },
    {
      heading: "Regula lui l'Hospital",
      body: [
        "Pentru limite de forma $\\frac{0}{0}$ sau $\\frac{\\infty}{\\infty}$: dacă $f$ și $g$ sunt derivabile în jurul lui $x_0$, $g'(x) \\neq 0$, și $\\lim \\frac{f'(x)}{g'(x)}$ există, atunci $\\lim \\frac{f(x)}{g(x)} = \\lim \\frac{f'(x)}{g'(x)}$.",
        "Regula se poate aplica din nou dacă noul raport este tot o formă nedeterminată $\\frac{0}{0}$ sau $\\frac{\\infty}{\\infty}$.",
      ],
    },
  ],
  examples: [
    {
      statement: "Fie $f(x)=x^3-6x^2+9x$. Calculați $f'(x)$ și evaluați $f'(1)$.",
      steps: [
        "Derivăm termen cu termen folosind $(x^n)'=nx^{n-1}$: $f'(x) = 3x^2 - 12x + 9$.",
        "Înlocuim $x=1$: $f'(1) = 3 - 12 + 9 = 0$.",
      ],
    },
    {
      statement: "Calculați derivata funcției $f(x) = x^2 \\sin x$.",
      steps: [
        "Folosim regula produsului $(uv)'=u'v+uv'$, cu $u=x^2$ și $v=\\sin x$.",
        "Avem $u'=2x$ și $v'=\\cos x$.",
        "Rezultă $f'(x) = 2x\\sin x + x^2\\cos x$.",
      ],
    },
    {
      statement: "Determinați punctele de extrem ale funcției $f(x)=x^3-3x$.",
      steps: [
        "Calculăm derivata: $f'(x)=3x^2-3$.",
        "Rezolvăm $f'(x)=0$: $3x^2-3=0 \\Rightarrow x^2=1 \\Rightarrow x=\\pm1$.",
        "Studiem semnul lui $f'$: pentru $x<-1$, $f'>0$; pentru $-1<x<1$, $f'<0$; pentru $x>1$, $f'>0$.",
        "Deci $x=-1$ este punct de maxim, iar $x=1$ este punct de minim.",
      ],
    },
    {
      statement: "Calculați $\\lim_{x\\to0}\\dfrac{e^x-1}{x}$ folosind regula lui l'Hospital.",
      steps: [
        "Înlocuirea directă $x=0$ dă forma nedeterminată $\\frac{0}{0}$.",
        "Derivăm numărătorul și numitorul separat: $(e^x-1)'=e^x$, $(x)'=1$.",
        "Aplicăm regula lui l'Hospital: $\\lim_{x\\to0}\\dfrac{e^x-1}{x}=\\lim_{x\\to0}\\dfrac{e^x}{1}$.",
        "Înlocuim $x=0$: $\\dfrac{e^0}{1}=\\dfrac{1}{1}=1$.",
      ],
    },
    {
      statement: "Calculați $\\lim_{x\\to\\infty}\\dfrac{\\ln x}{x}$ folosind regula lui l'Hospital.",
      steps: [
        "Pentru $x\\to\\infty$, atât $\\ln x$ cât și $x$ tind la $\\infty$, deci avem forma nedeterminată $\\frac{\\infty}{\\infty}$.",
        "Derivăm numărătorul și numitorul separat: $(\\ln x)'=\\dfrac{1}{x}$, $(x)'=1$.",
        "Aplicăm regula lui l'Hospital: $\\lim_{x\\to\\infty}\\dfrac{\\ln x}{x}=\\lim_{x\\to\\infty}\\dfrac{1/x}{1}=\\lim_{x\\to\\infty}\\dfrac{1}{x}$.",
        "Pe măsură ce $x\\to\\infty$, $\\dfrac{1}{x}\\to0$.",
      ],
    },
  ],
};
```

- [ ] **Step 2: Run theory integrity test to verify it still passes**

Run: `npx vitest run src/data/theory/index.test.ts`
Expected: PASS (3/3) — the new concept/examples only add to existing minimums, they don't break them.

- [ ] **Step 3: Add exercise `dv-5` to the exercises file**

Edit `src/data/questions/derivate.ts`. Add a new exercise object to the end of the `derivateExercises` array (after `dv-4`):

```ts
  {
    id: "dv-5",
    topic: "derivate",
    type: "input",
    points: 6,
    prompt: "Calculați $\\lim_{x\\to0}\\dfrac{e^x-1}{x}$ folosind regula lui l'Hospital.",
    correctAnswer: "1",
    explanation: [
      "Înlocuirea directă $x=0$ dă forma nedeterminată $\\frac{0}{0}$.",
      "Derivăm numărătorul și numitorul separat: $(e^x-1)'=e^x$, $(x)'=1$.",
      "Aplicăm regula lui l'Hospital: limita devine $\\lim_{x\\to0}\\dfrac{e^x}{1}$.",
      "Înlocuim $x=0$: $e^0=1$.",
    ],
  },
```

The full file after this step:

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
    explanation: [
      "Aplicăm regula de derivare $(x^n)'=nx^{n-1}$: $f'(x)=3x^2$.",
      "Înlocuim $x=2$: $f'(2)=3\\cdot2^2=3\\cdot4$.",
      "Rezultă $f'(2)=12$.",
    ],
  },
  {
    id: "dv-2",
    topic: "derivate",
    type: "mcq",
    points: 6,
    prompt: "Derivata funcției $f(x) = \\sin x$ este:",
    options: ["$\\cos x$", "$-\\cos x$", "$-\\sin x$", "$\\tan x$"],
    correctAnswer: "$\\cos x$",
    explanation: [
      "Aceasta este una dintre regulile uzuale de derivare.",
      "$(\\sin x)'=\\cos x$.",
    ],
  },
  {
    id: "dv-3",
    topic: "derivate",
    type: "input",
    points: 6,
    prompt: "Fie $f(x) = x^2 - 4x + 3$. Determinați abscisa punctului de minim (soluția ecuației $f'(x) = 0$).",
    correctAnswer: "2",
    explanation: [
      "Calculăm derivata: $f'(x)=2x-4$.",
      "Punem condiția de punct critic: $f'(x)=0 \\Rightarrow 2x-4=0$.",
      "Rezolvăm: $x=2$.",
    ],
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
    explanation: [
      "Legătura dintre semnul derivatei și monotonie este un rezultat fundamental de analiză.",
      "Dacă $f'(x)\\geq0$ pe un interval, atunci $f$ este crescătoare pe acel interval.",
    ],
  },
  {
    id: "dv-5",
    topic: "derivate",
    type: "input",
    points: 6,
    prompt: "Calculați $\\lim_{x\\to0}\\dfrac{e^x-1}{x}$ folosind regula lui l'Hospital.",
    correctAnswer: "1",
    explanation: [
      "Înlocuirea directă $x=0$ dă forma nedeterminată $\\frac{0}{0}$.",
      "Derivăm numărătorul și numitorul separat: $(e^x-1)'=e^x$, $(x)'=1$.",
      "Aplicăm regula lui l'Hospital: limita devine $\\lim_{x\\to0}\\dfrac{e^x}{1}$.",
      "Înlocuim $x=0$: $e^0=1$.",
    ],
  },
];
```

- [ ] **Step 4: Run data integrity test to verify it passes**

Run: `npx vitest run src/data/index.test.ts`
Expected: PASS (all assertions, including unique ids and 6-points-per-exercise) — `dv-5` has a unique id and 6 points.

- [ ] **Step 5: Add the l'Hospital formula to the existing `derivate` chapter**

Edit `src/data/formulaSheet.ts`. Find the `chapter("derivate", [ ... ])` call. Add a new formula entry to the end of its array (after the last existing entry in that chapter — read the file first to find the exact closing `]` of the `derivate` chapter's array and insert before it):

```ts
    {
      label: "Regula lui l'Hospital",
      latex: "\\lim \\dfrac{f(x)}{g(x)} = \\lim \\dfrac{f'(x)}{g'(x)} \\text{ (cazurile } \\tfrac{0}{0} \\text{ sau } \\tfrac{\\infty}{\\infty}\\text{)}",
      plain: "lim f(x)/g(x) = lim f'(x)/g'(x)  (cazurile 0/0 sau ∞/∞)",
    },
```

Do NOT add a new `chapter(...)` call — this is an addition to the existing `derivate` chapter's array, not a new chapter. Do NOT touch any other chapter in the file.

- [ ] **Step 6: Run formula sheet test to verify it passes**

Run: `npx vitest run src/data/formulaSheet.test.ts`
Expected: PASS (3/3) — `FORMULA_SHEET.map(c => c.topic)` still equals `TOPICS` exactly (unchanged — no chapter added or removed), and the new entry's `latex` is valid KaTeX.

- [ ] **Step 7: Regenerate the downloadable formula sheet**

Run: `npm run generate:formulas`
Expected: exits 0. Then run `git status --short public/` and confirm both `public/formule-bacalaureat.pdf` and `public/formule-bacalaureat.docx` show as modified.

- [ ] **Step 8: Run the full test suite**

Run: `npm test`
Expected: all test files pass (41 tests: the pre-existing 40 plus `dv-5`'s presence covered by the same assertions, no new test files added this round).

- [ ] **Step 9: Commit**

```bash
git add src/data/theory/derivate.ts src/data/questions/derivate.ts src/data/formulaSheet.ts public/formule-bacalaureat.pdf public/formule-bacalaureat.docx
git commit -m "Add l'Hospital's rule to Derivate topic (theory, exercise, formula sheet)"
```

---

### Task 2: Proprietatea lui Darboux — `limite` topic

**Files:**
- Modify: `src/data/theory/limite.ts`
- Modify: `src/data/questions/limite.ts`

**Interfaces:**
- Consumes: existing `TheorySection`, `Exercise` shapes — no new types. Independent of Task 1 (different files, no shared state).
- Produces: nothing consumed elsewhere.

- [ ] **Step 1: Add the Darboux concept and example to the theory file**

Edit `src/data/theory/limite.ts`. Add a new concept to the end of the `concepts` array (after "Limite fundamentale"):

```ts
    {
      heading: "Proprietatea lui Darboux",
      body: [
        "Dacă $f$ este continuă pe $[a,b]$ și $f(a)\\cdot f(b) < 0$ (adică $f(a)$ și $f(b)$ au semne opuse), atunci există $c \\in (a,b)$ astfel încât $f(c) = 0$.",
        "Proprietatea garantează doar existența unei soluții, nu și unicitatea ei — pot exista mai multe puncte $c$ cu $f(c)=0$ în $(a,b)$.",
      ],
    },
```

Add one new worked example to the end of the `examples` array (after the existing 3):

```ts
    {
      statement: "Arătați că ecuația $x^3-3x+1=0$ are cel puțin o soluție în intervalul $(0,1)$.",
      steps: [
        "Notăm $f(x)=x^3-3x+1$; $f$ este o funcție polinomială, deci continuă pe $\\mathbb{R}$, inclusiv pe $[0,1]$.",
        "Calculăm $f(0)=0-0+1=1>0$.",
        "Calculăm $f(1)=1-3+1=-1<0$.",
        "Cum $f(0)\\cdot f(1)<0$, prin proprietatea lui Darboux există $c\\in(0,1)$ astfel încât $f(c)=0$.",
      ],
    },
```

The full file after this step:

```ts
import type { TheorySection } from "../../types";

export const limiteTheory: TheorySection = {
  topic: "limite",
  title: "Limite de funcții",
  concepts: [
    {
      heading: "Limite prin înlocuire directă",
      body: [
        "Dacă funcția este continuă în punctul $x_0$ (de exemplu o funcție polinomială), limita se calculează prin înlocuirea directă a lui $x_0$.",
      ],
    },
    {
      heading: "Forma nedeterminată $\\frac{0}{0}$",
      body: [
        "Când înlocuirea directă dă $\\frac{0}{0}$, se factorizează numărătorul și numitorul (de obicei folosind faptul că $x_0$ este rădăcină) și se simplifică factorul comun.",
      ],
    },
    {
      heading: "Limite la infinit ale funcțiilor raționale",
      body: [
        "Se compară gradul numărătorului cu gradul numitorului.",
        "Dacă gradele sunt egale, limita este raportul coeficienților dominanți; dacă gradul numărătorului e mai mare, limita este $\\pm\\infty$; dacă e mai mic, limita este $0$.",
      ],
    },
    {
      heading: "Limite fundamentale",
      body: [
        "$\\lim_{x\\to 0}\\dfrac{\\sin x}{x}=1$",
        "$\\lim_{x\\to\\infty}\\left(1+\\dfrac{1}{x}\\right)^x = e$",
        "Aceste limite se folosesc adesea prin substituție, atunci când argumentul funcției tinde tot la $0$ (respectiv $\\infty$).",
      ],
    },
    {
      heading: "Proprietatea lui Darboux",
      body: [
        "Dacă $f$ este continuă pe $[a,b]$ și $f(a)\\cdot f(b) < 0$ (adică $f(a)$ și $f(b)$ au semne opuse), atunci există $c \\in (a,b)$ astfel încât $f(c) = 0$.",
        "Proprietatea garantează doar existența unei soluții, nu și unicitatea ei — pot exista mai multe puncte $c$ cu $f(c)=0$ în $(a,b)$.",
      ],
    },
  ],
  examples: [
    {
      statement: "Calculați $\\lim_{x\\to3}\\dfrac{x^2-9}{x-3}$.",
      steps: [
        "Înlocuirea directă $x=3$ dă forma nedeterminată $\\frac{0}{0}$.",
        "Factorizăm numărătorul: $x^2-9=(x-3)(x+3)$.",
        "Simplificăm factorul comun: $\\dfrac{(x-3)(x+3)}{x-3}=x+3$.",
        "Calculăm limita expresiei simplificate: $3+3=6$.",
      ],
    },
    {
      statement: "Calculați $\\lim_{x\\to\\infty}\\dfrac{2x^2+x}{5x^2-1}$.",
      steps: [
        "Numărătorul și numitorul au același grad (2), deci limita este raportul coeficienților termenilor de grad maxim.",
        "Coeficientul lui $x^2$ la numărător este $2$, la numitor este $5$.",
        "Limita este $\\dfrac{2}{5}$.",
      ],
    },
    {
      statement: "Calculați $\\lim_{x\\to0}\\dfrac{\\sin 3x}{x}$.",
      steps: [
        "Scriem expresia astfel încât să apară limita fundamentală: $\\dfrac{\\sin 3x}{x} = 3\\cdot\\dfrac{\\sin 3x}{3x}$.",
        "Cum $3x\\to0$ când $x\\to0$, avem $\\lim_{x\\to0}\\dfrac{\\sin 3x}{3x}=1$ (limita fundamentală).",
        "Rezultă limita cerută: $3 \\cdot 1 = 3$.",
      ],
    },
    {
      statement: "Arătați că ecuația $x^3-3x+1=0$ are cel puțin o soluție în intervalul $(0,1)$.",
      steps: [
        "Notăm $f(x)=x^3-3x+1$; $f$ este o funcție polinomială, deci continuă pe $\\mathbb{R}$, inclusiv pe $[0,1]$.",
        "Calculăm $f(0)=0-0+1=1>0$.",
        "Calculăm $f(1)=1-3+1=-1<0$.",
        "Cum $f(0)\\cdot f(1)<0$, prin proprietatea lui Darboux există $c\\in(0,1)$ astfel încât $f(c)=0$.",
      ],
    },
  ],
};
```

- [ ] **Step 2: Run theory integrity test to verify it still passes**

Run: `npx vitest run src/data/theory/index.test.ts`
Expected: PASS (3/3).

- [ ] **Step 3: Add exercise `lm-5` to the exercises file**

Edit `src/data/questions/limite.ts`. Add a new exercise object to the end of the `limiteExercises` array (after `lm-4`):

```ts
  {
    id: "lm-5",
    topic: "limite",
    type: "mcq",
    points: 6,
    prompt: "Fie $f$ o funcție continuă pe $[a,b]$ cu $f(a)\\cdot f(b)<0$. Conform proprietății lui Darboux, ecuația $f(x)=0$:",
    options: [
      "are cel puțin o soluție în $(a,b)$",
      "nu are nicio soluție în $(a,b)$",
      "are exact o soluție în $(a,b)$",
      "nu se poate preciza dacă are soluții în $(a,b)$",
    ],
    correctAnswer: "are cel puțin o soluție în $(a,b)$",
    explanation: [
      "Proprietatea lui Darboux garantează existența a cel puțin unei soluții $c\\in(a,b)$ cu $f(c)=0$, atunci când $f$ este continuă pe $[a,b]$ și $f(a)\\cdot f(b)<0$.",
      "Proprietatea nu garantează unicitatea — pot exista mai multe astfel de soluții, deci varianta „exact o soluție” nu este corectă în general.",
    ],
  },
```

Note the deliberate mcq distractor design here: "are exact o soluție în $(a,b)$" (exactly one solution) is a plausible-sounding wrong answer distinct from the correct "at least one solution" — verify before committing that this option is textually and conceptually distinct from the correct answer (it is: "exact" vs "cel puțin" state different, non-equal claims), and that none of the 4 options collide.

The full file after this step:

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
    explanation: [
      "Înlocuirea directă $x=2$ dă forma nedeterminată $\\frac{0}{0}$, deci factorizăm.",
      "Numărătorul se factorizează: $x^2-4=(x-2)(x+2)$.",
      "Simplificăm factorul comun $x-2$: expresia devine $x+2$.",
      "Calculăm limita expresiei simplificate: $2+2=4$.",
    ],
  },
  {
    id: "lm-2",
    topic: "limite",
    type: "mcq",
    points: 6,
    prompt: "Calculați $$\\lim_{x \\to \\infty} \\dfrac{3x^2 + 1}{x^2 + 5}.$$",
    options: ["$3$", "$0$", "$\\infty$", "$1$"],
    correctAnswer: "$3$",
    explanation: [
      "Numărătorul și numitorul au același grad (2), deci limita la infinit este raportul coeficienților termenilor de grad maxim.",
      "Coeficientul lui $x^2$ la numărător este $3$, la numitor este $1$.",
      "Limita este $\\dfrac{3}{1}=3$.",
    ],
  },
  {
    id: "lm-3",
    topic: "limite",
    type: "input",
    points: 6,
    prompt: "Calculați $$\\lim_{x \\to 0} \\dfrac{\\sin x}{x}.$$",
    correctAnswer: "1",
    explanation: [
      "Aceasta este una dintre limitele fundamentale ale analizei matematice.",
      "Prin rezultat cunoscut, $\\lim_{x\\to0}\\dfrac{\\sin x}{x}=1$.",
    ],
  },
  {
    id: "lm-4",
    topic: "limite",
    type: "mcq",
    points: 6,
    prompt: "Calculați $$\\lim_{x \\to 1} \\dfrac{x^3 - 1}{x - 1}.$$",
    options: ["$3$", "$1$", "$0$", "$2$"],
    correctAnswer: "$3$",
    explanation: [
      "Înlocuirea directă $x=1$ dă forma nedeterminată $\\frac{0}{0}$.",
      "Factorizăm numărătorul folosind $a^3-b^3=(a-b)(a^2+ab+b^2)$: $x^3-1=(x-1)(x^2+x+1)$.",
      "Simplificăm factorul comun $x-1$: expresia devine $x^2+x+1$.",
      "Calculăm limita: $1^2+1+1=3$.",
    ],
  },
  {
    id: "lm-5",
    topic: "limite",
    type: "mcq",
    points: 6,
    prompt: "Fie $f$ o funcție continuă pe $[a,b]$ cu $f(a)\\cdot f(b)<0$. Conform proprietății lui Darboux, ecuația $f(x)=0$:",
    options: [
      "are cel puțin o soluție în $(a,b)$",
      "nu are nicio soluție în $(a,b)$",
      "are exact o soluție în $(a,b)$",
      "nu se poate preciza dacă are soluții în $(a,b)$",
    ],
    correctAnswer: "are cel puțin o soluție în $(a,b)$",
    explanation: [
      "Proprietatea lui Darboux garantează existența a cel puțin unei soluții $c\\in(a,b)$ cu $f(c)=0$, atunci când $f$ este continuă pe $[a,b]$ și $f(a)\\cdot f(b)<0$.",
      "Proprietatea nu garantează unicitatea — pot exista mai multe astfel de soluții, deci varianta „exact o soluție” nu este corectă în general.",
    ],
  },
];
```

- [ ] **Step 4: Run data integrity test to verify it passes**

Run: `npx vitest run src/data/index.test.ts`
Expected: PASS — `lm-5` has a unique id, 6 points, and its `correctAnswer` is present in `options`.

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: all test files pass (41 tests, up from 40 after Task 1's `dv-5`; `lm-5` doesn't add a new test file, just more coverage of existing assertions).

- [ ] **Step 6: Run typecheck and build**

Run: `npm run typecheck`
Expected: exits 0.

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 7: Commit**

```bash
git add src/data/theory/limite.ts src/data/questions/limite.ts
git commit -m "Add Proprietatea lui Darboux to Limite topic (theory, exercise)"
```
