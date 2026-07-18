# Step-by-Step Explanations + Per-Chapter Theory Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every terse one-line exercise `explanation` with a full numbered step-by-step walkthrough, and add a "Teorie" (theory) page per chapter with definitions/formulas and worked examples.

**Architecture:** `GradableItem.explanation` moves from `string` to `string[]` (one array element per solution step), rendered as an `<ol>`. A new `TheorySection` type (per `Topic`) holds concepts + worked examples in the same step-array shape, stored under `src/data/theory/`, aggregated into a `THEORY` map, and surfaced at a new `/theory/:topic` route linked from each Home topic card.

**Tech Stack:** React + Vite + TypeScript, `react-katex` for LaTeX (via the existing `MathText` component), Vitest for data-integrity tests. No new dependencies.

## Global Constraints

- **Language:** all new/edited content is in Romanian, matching the existing tone (see any current `prompt`/`explanation` string for register).
- **Step convention (exercises and theory examples alike):** `explanation`/`steps` is a `string[]`, each element one short sentence that may contain inline `$...$` LaTeX. Typical shape is 3-5 steps: name the applicable rule/formula → substitute the given values → compute → state the conclusion (matching `correctAnswer`). Use fewer steps only for genuinely one-fact items (e.g. "which rule applies") — never pad to hit a count, never collapse back to one step that just restates the old one-liner.
- **Never touch:** `id`, `type`, `points`, `prompt`, `options`, `correctAnswer`, `acceptedAnswers`, `topic`, `set`, `subject`, `statement`, `label` on any existing item. Only `explanation` is rewritten in content tasks; theory files are net-new.
- **Topic → file basename mapping** (already established by the existing question files, reuse it for theory files): `numere-complexe`→`numereComplexe`, `combinatorica`→`combinatorica`, `matrice`→`matrice`, `determinanti`→`determinanti`, `sisteme`→`sisteme`, `limite`→`limite`, `derivate`→`derivate`, `integrale`→`integrale`.
- **Verification commands** (run after every task): `npm run typecheck` and `npm test`. Run the full `npm run build` additionally at the end of Task 15.
- **Out of scope:** grading/scoring logic, exam-builder/variant machinery, CSS framework changes — none of this plan touches `src/lib/grading.ts`, `src/lib/examBuilder.ts`, or `src/data/examVariants.ts`.

---

### Task 1: Type foundation, explanation rendering, transitional data-integrity test

**Files:**
- Modify: `src/types.ts`
- Modify: `src/components/QuestionCard.tsx`
- Modify: `src/styles/index.css`
- Modify: `src/data/index.test.ts`

**Interfaces:**
- Produces: `GradableItem.explanation: string | string[]` (transitional union — tightened to `string[]` only in Task 15); `TheoryConcept { heading: string; body: string[] }`; `TheoryExample { statement: string; steps: string[] }`; `TheorySection { topic: Topic; title: string; concepts: TheoryConcept[]; examples: TheoryExample[] }` — all exported from `src/types.ts`, consumed by every later task.

- [ ] **Step 1: Update `src/types.ts`**

Change the `explanation` field and add the theory types:

```ts
export interface GradableItem {
  id: string;
  type: AnswerType;
  prompt: string;
  options?: string[];
  correctAnswer: string;
  acceptedAnswers?: string[];
  explanation: string | string[];
  points: number;
}
```

Append at the end of the file:

```ts
export interface TheoryConcept {
  heading: string;
  body: string[];
}

export interface TheoryExample {
  statement: string;
  steps: string[];
}

export interface TheorySection {
  topic: Topic;
  title: string;
  concepts: TheoryConcept[];
  examples: TheoryExample[];
}
```

- [ ] **Step 2: Update `QuestionCard.tsx` to render steps as an ordered list**

Replace:

```tsx
      {showExplanation && (
        <div className="question-card__explanation">
          <strong>Explicație:</strong> <MathText text={item.explanation} />
        </div>
      )}
```

with:

```tsx
      {showExplanation && (
        <div className="question-card__explanation">
          <strong>Explicație:</strong>
          <ol className="question-card__explanation-steps">
            {(Array.isArray(item.explanation) ? item.explanation : [item.explanation]).map((step, stepIndex) => (
              <li key={stepIndex}>
                <MathText text={step} />
              </li>
            ))}
          </ol>
        </div>
      )}
```

- [ ] **Step 3: Add step-list styling to `src/styles/index.css`**

Immediately after the existing `.question-card__explanation { ... }` rule, add:

```css
.question-card__explanation-steps {
  margin: 8px 0 0;
  padding-left: 20px;
}

.question-card__explanation-steps li {
  margin-bottom: 4px;
}
```

- [ ] **Step 4: Add a transitional data-integrity test to `src/data/index.test.ts`**

Add this new `describe` block at the end of the file:

```ts
describe("explanation format", () => {
  function isNonEmptyExplanation(explanation: string | string[]): boolean {
    if (Array.isArray(explanation)) {
      return explanation.length > 0 && explanation.every((step) => step.trim().length > 0);
    }
    return explanation.trim().length > 0;
  }

  it("every exercise explanation is non-empty", () => {
    for (const exercise of ALL_EXERCISES) {
      expect(isNonEmptyExplanation(exercise.explanation)).toBe(true);
    }
  });

  it("every problem subpoint explanation is non-empty", () => {
    for (const problem of ALL_PROBLEMS) {
      for (const subpoint of problem.subpoints) {
        expect(isNonEmptyExplanation(subpoint.explanation)).toBe(true);
      }
    }
  });
});
```

- [ ] **Step 5: Verify**

Run: `npm run typecheck && npm test`
Expected: both pass — existing single-string explanations still render fine (they get wrapped in a one-item array by the fallback), and the new tests pass against the unmodified data.

- [ ] **Step 6: Commit**

```bash
git add src/types.ts src/components/QuestionCard.tsx src/styles/index.css src/data/index.test.ts
git commit -m "Support step-array explanations and add theory content types"
```

---

### Task 2: Numere complexe — step-by-step explanations + theory

**Files:**
- Modify: `src/data/questions/numereComplexe.ts`
- Modify: `src/data/questions/numereComplexeSets.ts`
- Create: `src/data/theory/numereComplexe.ts`

**Interfaces:**
- Consumes: `TheorySection`, `TheoryConcept`, `TheoryExample` from `src/types.ts` (Task 1).
- Produces: `numereComplexeTheory: TheorySection`, consumed by Task 13's aggregator.

- [ ] **Step 1: Rewrite the 4 explanations in `numereComplexe.ts`**

Replace each `explanation` value (keep every other field untouched) with:

```ts
  {
    id: "nc-1",
    // ...unchanged fields...
    explanation: [
      "Pentru $z=a+bi$, modulul este $|z|=\\sqrt{a^2+b^2}$.",
      "Aici $a=3$, $b=4$, deci înlocuim: $|z|=\\sqrt{3^2+4^2}$.",
      "Calculăm sub radical: $3^2+4^2=9+16=25$.",
      "Rezultă $|z|=\\sqrt{25}=5$.",
    ],
  },
  {
    id: "nc-2",
    // ...unchanged fields...
    explanation: [
      "Conjugatul unui număr complex $a-bi$ este $a+bi$ (se schimbă semnul părții imaginare).",
      "Aici $z=2-5i$, cu $a=2$ și partea imaginară $-5$.",
      "Schimbăm semnul părții imaginare: $\\overline{z}=2+5i$.",
    ],
  },
  {
    id: "nc-3",
    // ...unchanged fields...
    explanation: [
      "Puterile lui $i$ se repetă cu perioada 4: $i^1=i,\\,i^2=-1,\\,i^3=-i,\\,i^4=1$.",
      "Împărțim exponentul la 4: $2023 = 4\\cdot505+3$.",
      "Restul împărțirii este $3$, deci $i^{2023}=i^3$.",
      "Rezultă $i^{2023}=-i$.",
    ],
  },
  {
    id: "nc-4",
    // ...unchanged fields...
    explanation: [
      "Recunoaștem produsul $(1+i)(1-i)$ ca fiind de forma $(a+b)(a-b)=a^2-b^2$ cu $a=1$, $b=i$.",
      "Calculăm: $(1+i)(1-i)=1-i^2$.",
      "Folosim $i^2=-1$: $1-(-1)=1+1=2$.",
      "Rezultă $z_1 \\cdot z_2 = 2$.",
    ],
  },
```

- [ ] **Step 2: Rewrite all 100 explanations in `numereComplexeSets.ts`**

Apply the identical convention to every item in this file (10 sets of 10 items each). Every item already has a correct `correctAnswer`/`options` and a terse `explanation`; expand each into 3-5 steps without changing the underlying mathematics, ids, prompts, or answers. Concrete model, using the two items already visible at the top of the file:

```ts
  {
    id: "nc-s1-1",
    // ...unchanged fields...
    explanation: [
      "Adunarea numerelor complexe se face pe componente: $(a+bi)+(c+di)=(a+c)+(b+d)i$.",
      "Aici $z_1=2+3i$, $z_2=1-4i$.",
      "Adunăm părțile reale: $2+1=3$. Adunăm părțile imaginare: $3+(-4)=-1$.",
      "Rezultă $z_1+z_2 = 3-i$.",
    ],
  },
  {
    id: "nc-s1-2",
    // ...unchanged fields...
    explanation: [
      "Scăderea numerelor complexe se face pe componente: $(a+bi)-(c+di)=(a-c)+(b-d)i$.",
      "Aici $z_1=5-2i$, $z_2=-3+i$.",
      "Scădem părțile reale: $5-(-3)=8$. Scădem părțile imaginare: $-2-1=-3$.",
      "Rezultă $z_1-z_2 = 8-3i$.",
    ],
  },
```

- [ ] **Step 3: Create `src/data/theory/numereComplexe.ts`**

```ts
import type { TheorySection } from "../../types";

export const numereComplexeTheory: TheorySection = {
  topic: "numere-complexe",
  title: "Numere complexe",
  concepts: [
    {
      heading: "Forma algebrică",
      body: [
        "Un număr complex se scrie sub forma $z = a + bi$, unde $a, b \\in \\mathbb{R}$ și $i$ este unitatea imaginară, cu proprietatea $i^2 = -1$.",
        "Numărul $a = \\mathrm{Re}(z)$ se numește partea reală, iar $b = \\mathrm{Im}(z)$ partea imaginară.",
      ],
    },
    {
      heading: "Operații cu numere complexe",
      body: [
        "Adunarea și scăderea se fac pe componente: $(a+bi) \\pm (c+di) = (a \\pm c) + (b \\pm d)i$.",
        "Înmulțirea: $(a+bi)(c+di) = (ac-bd) + (ad+bc)i$, folosind $i^2=-1$.",
        "Conjugatul lui $z=a+bi$ este $\\overline{z} = a-bi$; împărțirea se face amplificând cu conjugatul numitorului.",
      ],
    },
    {
      heading: "Modulul unui număr complex",
      body: [
        "Modulul lui $z=a+bi$ este $|z| = \\sqrt{a^2+b^2}$.",
        "Proprietăți utile: $|z_1 z_2| = |z_1||z_2|$ și $|\\overline{z}| = |z|$.",
      ],
    },
    {
      heading: "Puterile lui i",
      body: [
        "Puterile lui $i$ sunt periodice cu perioada 4: $i^1=i$, $i^2=-1$, $i^3=-i$, $i^4=1$.",
        "Pentru orice exponent $n$, se scrie $n = 4q+r$ (împărțire cu rest la 4) și atunci $i^n = i^r$.",
      ],
    },
    {
      heading: "Ecuații de gradul al doilea cu discriminant negativ",
      body: [
        "Pentru $ax^2+bx+c=0$ cu $\\Delta = b^2-4ac < 0$, soluțiile sunt numere complexe conjugate: $x_{1,2} = \\dfrac{-b \\pm i\\sqrt{-\\Delta}}{2a}$.",
      ],
    },
  ],
  examples: [
    {
      statement: "Fie $z = 5 + 12i$. Calculați $|z|$ și conjugatul $\\overline{z}$.",
      steps: [
        "Identificăm partea reală și imaginară: $a=5$, $b=12$.",
        "Aplicăm formula modulului: $|z| = \\sqrt{a^2+b^2} = \\sqrt{5^2+12^2} = \\sqrt{25+144} = \\sqrt{169} = 13$.",
        "Conjugatul se obține schimbând semnul părții imaginare: $\\overline{z} = 5 - 12i$.",
      ],
    },
    {
      statement: "Calculați $i^{57}$.",
      steps: [
        "Împărțim exponentul la 4 (perioada puterilor lui $i$): $57 = 4 \\cdot 14 + 1$.",
        "Restul împărțirii este $1$, deci $i^{57} = i^1$.",
        "Rezultatul este $i^{57} = i$.",
      ],
    },
    {
      statement: "Rezolvați ecuația $z^2 - 2z + 5 = 0$ în mulțimea numerelor complexe.",
      steps: [
        "Calculăm discriminantul: $\\Delta = (-2)^2 - 4 \\cdot 1 \\cdot 5 = 4 - 20 = -16$.",
        "Cum $\\Delta < 0$, soluțiile sunt complexe: $z_{1,2} = \\dfrac{2 \\pm \\sqrt{-16}}{2} = \\dfrac{2 \\pm 4i}{2}$.",
        "Simplificăm: $z_{1,2} = 1 \\pm 2i$.",
      ],
    },
  ],
};
```

- [ ] **Step 4: Verify**

Run: `npm run typecheck && npm test`
Expected: both pass.
Run: check no bare-string explanations remain — `grep -c "explanation: \"" src/data/questions/numereComplexe.ts src/data/questions/numereComplexeSets.ts` should print `0` for both files (every `explanation:` now opens with `[`).

- [ ] **Step 5: Commit**

```bash
git add src/data/questions/numereComplexe.ts src/data/questions/numereComplexeSets.ts src/data/theory/numereComplexe.ts
git commit -m "Add step-by-step explanations and theory for numere complexe"
```

---

### Task 3: Combinatorică — step-by-step explanations + theory

**Files:**
- Modify: `src/data/questions/combinatorica.ts`
- Modify: `src/data/questions/combinatoricaSets.ts`
- Create: `src/data/theory/combinatorica.ts`

**Interfaces:** same as Task 2, topic `combinatorica`.

- [ ] **Step 1: Rewrite the 4 explanations in `combinatorica.ts`**

```ts
  {
    id: "cb-1",
    // ...unchanged fields...
    explanation: [
      "Aplicăm formula combinărilor: $C_n^k=\\dfrac{n!}{k!(n-k)!}$, cu $n=5$, $k=2$.",
      "Înlocuim: $C_5^2=\\dfrac{5!}{2! \\cdot 3!}$.",
      "Simplificăm factorialele: $\\dfrac{5!}{3!}=5\\cdot4$, deci $C_5^2=\\dfrac{5\\cdot4}{2!}=\\dfrac{20}{2}$.",
      "Rezultă $C_5^2=10$.",
    ],
  },
  {
    id: "cb-2",
    // ...unchanged fields...
    explanation: [
      "Cum cifrele trebuie să fie distincte și ordinea contează (formăm un număr), folosim aranjamente.",
      "Numărul căutat este $A_4^3$, adică numărul de moduri de a alege și ordona 3 cifre din cele 4 disponibile.",
      "Aplicăm formula: $A_4^3 = 4\\cdot3\\cdot2$.",
      "Rezultă $A_4^3=24$.",
    ],
  },
  {
    id: "cb-3",
    // ...unchanged fields...
    explanation: [
      "Factorialul lui $n$ este produsul numerelor naturale de la $1$ la $n$: $n!=1\\cdot2\\cdots n$.",
      "Pentru $n=5$: $5!=5\\cdot4\\cdot3\\cdot2\\cdot1$.",
      "Calculăm produsul: $5\\cdot4=20$, $20\\cdot3=60$, $60\\cdot2=120$.",
      "Rezultă $5!=120$.",
    ],
  },
  {
    id: "cb-4",
    // ...unchanged fields...
    explanation: [
      "Termenul de rang $k+1$ din dezvoltarea $(x+y)^n$ este $T_{k+1}=C_n^k x^{n-k}y^k$.",
      "Termenul al treilea corespunde lui $k=2$ (al treilea termen are rangul $k+1=3$).",
      "Pentru $(x+1)^4$ avem $n=4$, $y=1$, deci $T_3 = C_4^2 x^{2} \\cdot 1^2 = C_4^2 x^2$.",
      "Calculăm $C_4^2 = \\dfrac{4!}{2! \\cdot 2!}=6$, deci coeficientul căutat este $6$.",
    ],
  },
```

- [ ] **Step 2: Rewrite all 100 explanations in `combinatoricaSets.ts`**

Apply the same convention (name the formula — permutări/aranjamente/combinări/binomul lui Newton as applicable — substitute, compute, conclude) to every item across all 10 sets, using each item's existing `explanation` as the ground truth for the final numeric/algebraic result.

- [ ] **Step 3: Create `src/data/theory/combinatorica.ts`**

```ts
import type { TheorySection } from "../../types";

export const combinatoricaTheory: TheorySection = {
  topic: "combinatorica",
  title: "Combinatorică",
  concepts: [
    {
      heading: "Permutări",
      body: [
        "Numărul de moduri de a aranja $n$ elemente distincte într-un șir este $P_n = n! = 1 \\cdot 2 \\cdot 3 \\cdots n$.",
      ],
    },
    {
      heading: "Aranjamente",
      body: [
        "Numărul de moduri de a alege și ordona $k$ elemente din $n$ (contează ordinea) este $A_n^k = \\dfrac{n!}{(n-k)!} = n(n-1)\\cdots(n-k+1)$.",
      ],
    },
    {
      heading: "Combinări",
      body: [
        "Numărul de moduri de a alege $k$ elemente din $n$, fără a conta ordinea, este $C_n^k = \\dfrac{n!}{k!(n-k)!}$.",
        "Proprietăți: $C_n^k = C_n^{n-k}$ și $C_n^0 = C_n^n = 1$.",
      ],
    },
    {
      heading: "Binomul lui Newton",
      body: [
        "$(x+y)^n = \\sum_{k=0}^{n} C_n^k x^{n-k} y^k$.",
        "Termenul de rang $k+1$ este $T_{k+1} = C_n^k x^{n-k} y^k$.",
      ],
    },
  ],
  examples: [
    {
      statement: "Calculați $A_6^2$.",
      steps: [
        "Se folosește formula aranjamentelor: $A_n^k = n(n-1)\\cdots(n-k+1)$, cu $n=6$, $k=2$.",
        "Înlocuim: $A_6^2 = 6 \\cdot 5 = 30$.",
      ],
    },
    {
      statement: "Calculați $C_7^3$.",
      steps: [
        "Aplicăm formula combinărilor: $C_n^k = \\dfrac{n!}{k!(n-k)!}$, cu $n=7$, $k=3$.",
        "Înlocuim: $C_7^3 = \\dfrac{7!}{3! \\cdot 4!} = \\dfrac{7 \\cdot 6 \\cdot 5}{3 \\cdot 2 \\cdot 1} = \\dfrac{210}{6} = 35$.",
      ],
    },
    {
      statement: "Determinați coeficientul lui $x^3$ în dezvoltarea $(x+2)^5$.",
      steps: [
        "Termenul general este $T_{k+1} = C_5^k x^{5-k} 2^k$.",
        "Avem nevoie de puterea $x^3$, deci $5-k=3 \\Rightarrow k=2$.",
        "Coeficientul este $C_5^2 \\cdot 2^2 = 10 \\cdot 4 = 40$.",
      ],
    },
  ],
};
```

- [ ] **Step 4: Verify**

Run: `npm run typecheck && npm test`
Run: `grep -c "explanation: \"" src/data/questions/combinatorica.ts src/data/questions/combinatoricaSets.ts` — expect `0` for both.

- [ ] **Step 5: Commit**

```bash
git add src/data/questions/combinatorica.ts src/data/questions/combinatoricaSets.ts src/data/theory/combinatorica.ts
git commit -m "Add step-by-step explanations and theory for combinatorica"
```

---

### Task 4: Matrice — step-by-step explanations + theory

**Files:**
- Modify: `src/data/questions/matrice.ts`
- Modify: `src/data/questions/matriceSets.ts`
- Create: `src/data/theory/matrice.ts`

**Interfaces:** same as Task 2, topic `matrice`.

- [ ] **Step 1: Rewrite the 4 explanations in `matrice.ts`**

```ts
  {
    id: "mt-1",
    // ...unchanged fields...
    explanation: [
      "Urma unei matrice pătratice este suma elementelor de pe diagonala principală.",
      "Diagonala principală a lui $A$ este formată din elementele $2$ și $3$.",
      "Adunăm aceste elemente: $2+3=5$.",
    ],
  },
  {
    id: "mt-2",
    // ...unchanged fields...
    explanation: [
      "Elementul $(1,1)$ al produsului $A \\cdot B$ se obține înmulțind linia 1 din $A$ cu coloana 1 din $B$.",
      "Linia 1 din $A$ este $(1,2)$, iar coloana 1 din $B$ este $(1,2)$.",
      "Înmulțim și adunăm: $1\\cdot1 + 2\\cdot2 = 1+4$.",
      "Rezultă elementul $(1,1)$ este $5$.",
    ],
  },
  {
    id: "mt-3",
    // ...unchanged fields...
    explanation: [
      "Înmulțirea unei matrice cu un scalar înmulțește fiecare element cu acel scalar.",
      "Elementul de pe linia 2, coloana 2 al lui $A$ este $4$.",
      "În matricea $2A$, acest element devine $2\\cdot4=8$.",
    ],
  },
  {
    id: "mt-4",
    // ...unchanged fields...
    explanation: [
      "Matricea identitate $I_n$ are $1$ pe toată diagonala principală și $0$ în rest.",
      "Pentru ordinul 2, aceasta este $$I_2=\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}.$$",
    ],
  },
```

- [ ] **Step 2: Rewrite all 100 explanations in `matriceSets.ts`**

Apply the same convention (state which operation applies — adunare/înmulțire cu scalar/înmulțire de matrice/urmă/transpusă — then show the element-by-element computation, then conclude) to every item across all 10 sets, preserving each item's existing final answer.

- [ ] **Step 3: Create `src/data/theory/matrice.ts`**

```ts
import type { TheorySection } from "../../types";

export const matriceTheory: TheorySection = {
  topic: "matrice",
  title: "Matrice",
  concepts: [
    {
      heading: "Ce este o matrice",
      body: [
        "O matrice de tipul $m \\times n$ este un tablou dreptunghiular cu $m$ linii și $n$ coloane de numere reale.",
      ],
    },
    {
      heading: "Adunarea și înmulțirea cu un scalar",
      body: [
        "Două matrice de aceeași dimensiune se adună/scad element cu element.",
        "Înmulțirea cu un scalar $k$ înmulțește fiecare element al matricei cu $k$.",
      ],
    },
    {
      heading: "Înmulțirea matricelor",
      body: [
        "Produsul $A \\cdot B$ există doar dacă numărul de coloane al lui $A$ este egal cu numărul de linii al lui $B$.",
        "Elementul de pe linia $i$ și coloana $j$ al produsului este $(AB)_{ij} = \\sum_k A_{ik}B_{kj}$.",
      ],
    },
    {
      heading: "Matricea identitate și transpusa",
      body: [
        "Matricea identitate $I_n$ are $1$ pe diagonala principală și $0$ în rest; este element neutru la înmulțire: $A \\cdot I_n = I_n \\cdot A = A$.",
        "Transpusa $A^T$ se obține scriind liniile lui $A$ drept coloane.",
      ],
    },
  ],
  examples: [
    {
      statement:
        "Fie $$A=\\begin{pmatrix}2&1\\\\3&0\\end{pmatrix}, B=\\begin{pmatrix}1&4\\\\2&1\\end{pmatrix}.$$ Calculați $A+B$.",
      steps: [
        "Adunăm elementele aflate pe aceeași poziție.",
        "Linia 1: $2+1=3$, $1+4=5$. Linia 2: $3+2=5$, $0+1=1$.",
        "Rezultatul este $$A+B=\\begin{pmatrix}3&5\\\\5&1\\end{pmatrix}.$$",
      ],
    },
    {
      statement: "Pentru matricele de mai sus, calculați elementul de pe linia 2, coloana 1 al produsului $A \\cdot B$.",
      steps: [
        "Elementul $(2,1)$ al produsului se obține înmulțind linia 2 din $A$ cu coloana 1 din $B$.",
        "Linia 2 din $A$ este $(3,0)$, coloana 1 din $B$ este $(1,2)$.",
        "Calculăm: $3 \\cdot 1 + 0 \\cdot 2 = 3$.",
      ],
    },
    {
      statement: "Fie $$A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}.$$ Calculați $A^2$.",
      steps: [
        "$A^2 = A \\cdot A$, deci înmulțim matricea cu ea însăși.",
        "Elementul $(1,1)$: $1\\cdot1+1\\cdot0=1$. Elementul $(1,2)$: $1\\cdot1+1\\cdot1=2$.",
        "Elementul $(2,1)$: $0\\cdot1+1\\cdot0=0$. Elementul $(2,2)$: $0\\cdot1+1\\cdot1=1$.",
        "Rezultatul este $$A^2=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}.$$",
      ],
    },
  ],
};
```

- [ ] **Step 4: Verify**

Run: `npm run typecheck && npm test`
Run: `grep -c "explanation: \"" src/data/questions/matrice.ts src/data/questions/matriceSets.ts` — expect `0` for both.

- [ ] **Step 5: Commit**

```bash
git add src/data/questions/matrice.ts src/data/questions/matriceSets.ts src/data/theory/matrice.ts
git commit -m "Add step-by-step explanations and theory for matrice"
```

---

### Task 5: Determinanți — step-by-step explanations + theory

**Files:**
- Modify: `src/data/questions/determinanti.ts`
- Modify: `src/data/questions/determinantiSets.ts`
- Create: `src/data/theory/determinanti.ts`

**Interfaces:** same as Task 2, topic `determinanti`.

- [ ] **Step 1: Rewrite the 4 explanations in `determinanti.ts`**

```ts
  {
    id: "dt-1",
    // ...unchanged fields...
    explanation: [
      "Pentru o matrice $2\\times2$, $\\det=ad-bc$.",
      "Înlocuim: $\\det = 2\\cdot4 - 3\\cdot1$.",
      "Calculăm: $8-3=5$.",
    ],
  },
  {
    id: "dt-2",
    // ...unchanged fields...
    explanation: [
      "Matricea identitate are $1$ pe diagonala principală și $0$ în rest, indiferent de ordin.",
      "Determinantul matricei identitate de orice ordin este întotdeauna $1$.",
    ],
  },
  {
    id: "dt-3",
    // ...unchanged fields...
    explanation: [
      "Observăm că a doua linie este de $2$ ori prima linie: $(2,4)=2\\cdot(1,2)$.",
      "Când două linii sunt proporționale, determinantul este $0$.",
      "Verificăm direct: $\\det = 1\\cdot4-2\\cdot2=4-4=0$.",
    ],
  },
  {
    id: "dt-4",
    // ...unchanged fields...
    explanation: [
      "Pentru o matrice pătratică de ordin $n$, are loc proprietatea $\\det(kA)=k^n\\det(A)$.",
      "Aici $k=2$ și $n=2$ (matrice de ordinul 2).",
      "Înlocuim: $\\det(2A) = 2^2 \\cdot \\det(A) = 4\\cdot5$.",
      "Rezultă $\\det(2A)=20$.",
    ],
  },
```

- [ ] **Step 2: Rewrite all 100 explanations in `determinantiSets.ts`**

Apply the same convention (state the formula/property used — regula de ordin 2, regula lui Sarrus, proporționalitate de linii, $\det(kA)=k^n\det(A)$, $\det(AB)=\det(A)\det(B)$, etc. — then substitute, compute, conclude) across all 10 sets, preserving each existing final answer.

- [ ] **Step 3: Create `src/data/theory/determinanti.ts`**

```ts
import type { TheorySection } from "../../types";

export const determinantiTheory: TheorySection = {
  topic: "determinanti",
  title: "Determinanți",
  concepts: [
    {
      heading: "Determinantul unei matrice de ordinul 2",
      body: [
        "Pentru $$A=\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix},$$ determinantul este $\\det(A) = ad-bc$.",
      ],
    },
    {
      heading: "Determinantul unei matrice de ordinul 3 (regula lui Sarrus)",
      body: [
        "Se rescriu primele două coloane după matrice, apoi se adună produsele diagonalelor descendente și se scad produsele diagonalelor ascendente.",
      ],
    },
    {
      heading: "Proprietăți ale determinanților",
      body: [
        "Dacă două linii (sau coloane) sunt proporționale, $\\det(A)=0$.",
        "Pentru o matrice pătratică de ordin $n$: $\\det(kA) = k^n \\det(A)$.",
        "$\\det(A \\cdot B) = \\det(A) \\cdot \\det(B)$.",
        "O matrice este inversabilă dacă și numai dacă $\\det(A) \\neq 0$.",
      ],
    },
  ],
  examples: [
    {
      statement: "Calculați determinantul $$\\begin{vmatrix}3&5\\\\2&4\\end{vmatrix}.$$",
      steps: [
        "Aplicăm formula pentru ordinul 2: $\\det = ad-bc$.",
        "Înlocuim: $\\det = 3 \\cdot 4 - 5 \\cdot 2 = 12 - 10 = 2$.",
      ],
    },
    {
      statement:
        "Calculați determinantul $$\\begin{vmatrix}1&2&0\\\\0&1&3\\\\2&0&1\\end{vmatrix}$$ folosind regula lui Sarrus.",
      steps: [
        "Rescriem primele două coloane după matrice: $1,2,0,1,2 / 0,1,3,0,1 / 2,0,1,2,0$.",
        "Diagonalele descendente: $1\\cdot1\\cdot1 + 2\\cdot3\\cdot2 + 0\\cdot0\\cdot0 = 1+12+0=13$.",
        "Diagonalele ascendente: $0\\cdot1\\cdot2 + 1\\cdot3\\cdot1 + 0\\cdot0\\cdot2 = 0+3+0=3$.",
        "Determinantul este diferența: $13-3=10$.",
      ],
    },
    {
      statement: "Pentru ce valoare a lui $m$ matricea $$A=\\begin{pmatrix}m&2\\\\4&m\\end{pmatrix}$$ nu este inversabilă?",
      steps: [
        "O matrice nu este inversabilă exact atunci când determinantul ei este $0$.",
        "Calculăm $\\det(A) = m^2 - 8$.",
        "Punem condiția $m^2 - 8 = 0 \\Rightarrow m = \\pm 2\\sqrt{2}$.",
      ],
    },
  ],
};
```

- [ ] **Step 4: Verify**

Run: `npm run typecheck && npm test`
Run: `grep -c "explanation: \"" src/data/questions/determinanti.ts src/data/questions/determinantiSets.ts` — expect `0` for both.

- [ ] **Step 5: Commit**

```bash
git add src/data/questions/determinanti.ts src/data/questions/determinantiSets.ts src/data/theory/determinanti.ts
git commit -m "Add step-by-step explanations and theory for determinanti"
```

---

### Task 6: Sisteme de ecuații — step-by-step explanations + theory

**Files:**
- Modify: `src/data/questions/sisteme.ts`
- Modify: `src/data/questions/sistemeSets.ts`
- Create: `src/data/theory/sisteme.ts`

**Interfaces:** same as Task 2, topic `sisteme`.

- [ ] **Step 1: Rewrite the 4 explanations in `sisteme.ts`**

```ts
  {
    id: "sy-1",
    // ...unchanged fields...
    explanation: [
      "Adunăm cele două ecuații pentru a elimina $y$: $(x+y)+(x-y)=5+1$.",
      "Simplificăm: $2x=6$.",
      "Împărțim la $2$: $x=3$.",
    ],
  },
  {
    id: "sy-2",
    // ...unchanged fields...
    explanation: [
      "Observăm că a doua ecuație este exact prima ecuație înmulțită cu $2$: $2(x+y)=2\\cdot3=6$.",
      "Cele două ecuații reprezintă aceeași dreaptă, deci au aceleași soluții.",
      "Sistemul este compatibil nedeterminat, adică are o infinitate de soluții.",
    ],
  },
  {
    id: "sy-3",
    // ...unchanged fields...
    explanation: [
      "Din prima ecuație exprimăm $x$ în funcție de $y$: $x=4-2y$.",
      "Înlocuim în a doua ecuație: $3(4-2y)-y=5$.",
      "Desfacem paranteza: $12-6y-y=5 \\Rightarrow 12-7y=5$.",
      "Rezolvăm: $-7y=-7 \\Rightarrow y=1$.",
    ],
  },
  {
    id: "sy-4",
    // ...unchanged fields...
    explanation: [
      "Grafic, fiecare ecuație liniară cu 2 necunoscute reprezintă o dreaptă.",
      "Sistemul nu are soluții exact atunci când cele două drepte nu se intersectează, adică sunt paralele și distincte.",
      "În acest caz nu există niciun punct comun celor două drepte.",
    ],
  },
```

- [ ] **Step 2: Rewrite all 100 explanations in `sistemeSets.ts`**

Apply the same convention (metoda reducerii, metoda substituției, sau metoda lui Cramer cu $\Delta,\Delta_x,\Delta_y$, plus clasificarea sistemului acolo unde e cazul) across all 10 sets, preserving each existing final answer.

- [ ] **Step 3: Create `src/data/theory/sisteme.ts`**

```ts
import type { TheorySection } from "../../types";

export const sistemeTheory: TheorySection = {
  topic: "sisteme",
  title: "Sisteme de ecuații liniare",
  concepts: [
    {
      heading: "Sisteme de două ecuații cu două necunoscute",
      body: [
        "Un sistem liniar $\\begin{cases}a_1x+b_1y=c_1\\\\a_2x+b_2y=c_2\\end{cases}$ se poate rezolva prin metoda substituției sau prin metoda reducerii (eliminării).",
      ],
    },
    {
      heading: "Metoda lui Cramer",
      body: [
        "Se definesc determinanții $\\Delta = \\begin{vmatrix}a_1&b_1\\\\a_2&b_2\\end{vmatrix}$, $\\Delta_x$ (se înlocuiește coloana lui $x$ cu termenii liberi) și $\\Delta_y$ (analog pentru $y$).",
        "Dacă $\\Delta \\neq 0$, sistemul are soluție unică: $x = \\dfrac{\\Delta_x}{\\Delta}$, $y = \\dfrac{\\Delta_y}{\\Delta}$.",
      ],
    },
    {
      heading: "Clasificarea sistemelor",
      body: [
        "Dacă $\\Delta \\neq 0$: sistem compatibil determinat (soluție unică).",
        "Dacă $\\Delta = 0$ și $\\Delta_x = \\Delta_y = 0$: sistem compatibil nedeterminat (infinite soluții).",
        "Dacă $\\Delta = 0$ și cel puțin unul dintre $\\Delta_x, \\Delta_y$ este nenul: sistem incompatibil (nicio soluție).",
      ],
    },
  ],
  examples: [
    {
      statement: "Rezolvați sistemul $$\\begin{cases}2x+y=7\\\\x-y=2\\end{cases}$$ prin metoda reducerii.",
      steps: [
        "Adunăm cele două ecuații pentru a elimina $y$: $(2x+y)+(x-y) = 7+2 \\Rightarrow 3x = 9$.",
        "Rezultă $x=3$.",
        "Înlocuim în a doua ecuație: $3 - y = 2 \\Rightarrow y = 1$.",
      ],
    },
    {
      statement: "Rezolvați sistemul $$\\begin{cases}x+2y=5\\\\3x-y=1\\end{cases}$$ folosind metoda lui Cramer.",
      steps: [
        "Calculăm $\\Delta = \\begin{vmatrix}1&2\\\\3&-1\\end{vmatrix} = 1\\cdot(-1)-2\\cdot3 = -7$.",
        "Calculăm $\\Delta_x = \\begin{vmatrix}5&2\\\\1&-1\\end{vmatrix} = -5-2=-7$, deci $x = \\dfrac{-7}{-7}=1$.",
        "Calculăm $\\Delta_y = \\begin{vmatrix}1&5\\\\3&1\\end{vmatrix} = 1-15=-14$, deci $y = \\dfrac{-14}{-7}=2$.",
      ],
    },
    {
      statement:
        "Pentru ce valoare a lui $m$ sistemul $$\\begin{cases}x+my=1\\\\2x+4y=2\\end{cases}$$ este compatibil nedeterminat?",
      steps: [
        "Calculăm $\\Delta = \\begin{vmatrix}1&m\\\\2&4\\end{vmatrix} = 4-2m$.",
        "Pentru compatibil nedeterminat avem nevoie de $\\Delta=0$: $4-2m=0 \\Rightarrow m=2$.",
        "Verificăm că și $\\Delta_x=\\Delta_y=0$ pentru $m=2$: a doua ecuație devine exact prima înmulțită cu $2$, deci sistemul are într-adevăr infinite soluții.",
      ],
    },
  ],
};
```

- [ ] **Step 4: Verify**

Run: `npm run typecheck && npm test`
Run: `grep -c "explanation: \"" src/data/questions/sisteme.ts src/data/questions/sistemeSets.ts` — expect `0` for both.

- [ ] **Step 5: Commit**

```bash
git add src/data/questions/sisteme.ts src/data/questions/sistemeSets.ts src/data/theory/sisteme.ts
git commit -m "Add step-by-step explanations and theory for sisteme"
```

---

### Task 7: Limite de funcții — step-by-step explanations + theory

**Files:**
- Modify: `src/data/questions/limite.ts`
- Modify: `src/data/questions/limiteSets.ts`
- Create: `src/data/theory/limite.ts`

**Interfaces:** same as Task 2, topic `limite`.

- [ ] **Step 1: Rewrite the 4 explanations in `limite.ts`**

```ts
  {
    id: "lm-1",
    // ...unchanged fields...
    explanation: [
      "Înlocuirea directă $x=2$ dă forma nedeterminată $\\frac{0}{0}$, deci factorizăm.",
      "Numărătorul se factorizează: $x^2-4=(x-2)(x+2)$.",
      "Simplificăm factorul comun $x-2$: expresia devine $x+2$.",
      "Calculăm limita expresiei simplificate: $2+2=4$.",
    ],
  },
  {
    id: "lm-2",
    // ...unchanged fields...
    explanation: [
      "Numărătorul și numitorul au același grad (2), deci limita la infinit este raportul coeficienților termenilor de grad maxim.",
      "Coeficientul lui $x^2$ la numărător este $3$, la numitor este $1$.",
      "Limita este $\\dfrac{3}{1}=3$.",
    ],
  },
  {
    id: "lm-3",
    // ...unchanged fields...
    explanation: [
      "Aceasta este una dintre limitele fundamentale ale analizei matematice.",
      "Prin rezultat cunoscut, $\\lim_{x\\to0}\\dfrac{\\sin x}{x}=1$.",
    ],
  },
  {
    id: "lm-4",
    // ...unchanged fields...
    explanation: [
      "Înlocuirea directă $x=1$ dă forma nedeterminată $\\frac{0}{0}$.",
      "Factorizăm numărătorul folosind $a^3-b^3=(a-b)(a^2+ab+b^2)$: $x^3-1=(x-1)(x^2+x+1)$.",
      "Simplificăm factorul comun $x-1$: expresia devine $x^2+x+1$.",
      "Calculăm limita: $1^2+1+1=3$.",
    ],
  },
```

- [ ] **Step 2: Rewrite all 100 explanations in `limiteSets.ts`**

Apply the same convention (identify form 0/0, ∞/∞, or direct substitution; factor/simplify or compare degrees or use a fundamental limit; compute; conclude) across all 10 sets, preserving each existing final answer.

- [ ] **Step 3: Create `src/data/theory/limite.ts`**

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
  ],
};
```

- [ ] **Step 4: Verify**

Run: `npm run typecheck && npm test`
Run: `grep -c "explanation: \"" src/data/questions/limite.ts src/data/questions/limiteSets.ts` — expect `0` for both.

- [ ] **Step 5: Commit**

```bash
git add src/data/questions/limite.ts src/data/questions/limiteSets.ts src/data/theory/limite.ts
git commit -m "Add step-by-step explanations and theory for limite"
```

---

### Task 8: Derivate și aplicații — step-by-step explanations + theory

**Files:**
- Modify: `src/data/questions/derivate.ts`
- Modify: `src/data/questions/derivateSets.ts`
- Create: `src/data/theory/derivate.ts`

**Interfaces:** same as Task 2, topic `derivate`.

- [ ] **Step 1: Rewrite the 4 explanations in `derivate.ts`**

```ts
  {
    id: "dv-1",
    // ...unchanged fields...
    explanation: [
      "Aplicăm regula de derivare $(x^n)'=nx^{n-1}$: $f'(x)=3x^2$.",
      "Înlocuim $x=2$: $f'(2)=3\\cdot2^2=3\\cdot4$.",
      "Rezultă $f'(2)=12$.",
    ],
  },
  {
    id: "dv-2",
    // ...unchanged fields...
    explanation: [
      "Aceasta este una dintre regulile uzuale de derivare.",
      "$(\\sin x)'=\\cos x$.",
    ],
  },
  {
    id: "dv-3",
    // ...unchanged fields...
    explanation: [
      "Calculăm derivata: $f'(x)=2x-4$.",
      "Punem condiția de punct critic: $f'(x)=0 \\Rightarrow 2x-4=0$.",
      "Rezolvăm: $x=2$.",
    ],
  },
  {
    id: "dv-4",
    // ...unchanged fields...
    explanation: [
      "Legătura dintre semnul derivatei și monotonie este un rezultat fundamental de analiză.",
      "Dacă $f'(x)\\geq0$ pe un interval, atunci $f$ este crescătoare pe acel interval.",
    ],
  },
```

- [ ] **Step 2: Rewrite all 100 explanations in `derivateSets.ts`**

Apply the same convention (state the derivation rule(s) used — putere, produs, cât, funcții uzuale — substitute, compute, conclude; for monotonie/extreme, include the sign-study step) across all 10 sets, preserving each existing final answer.

- [ ] **Step 3: Create `src/data/theory/derivate.ts`**

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
  ],
};
```

- [ ] **Step 4: Verify**

Run: `npm run typecheck && npm test`
Run: `grep -c "explanation: \"" src/data/questions/derivate.ts src/data/questions/derivateSets.ts` — expect `0` for both.

- [ ] **Step 5: Commit**

```bash
git add src/data/questions/derivate.ts src/data/questions/derivateSets.ts src/data/theory/derivate.ts
git commit -m "Add step-by-step explanations and theory for derivate"
```

---

### Task 9: Primitive și integrale definite — step-by-step explanations + theory

**Files:**
- Modify: `src/data/questions/integrale.ts`
- Modify: `src/data/questions/integraleSets.ts`
- Create: `src/data/theory/integrale.ts`

**Interfaces:** same as Task 2, topic `integrale`.

- [ ] **Step 1: Rewrite the 4 explanations in `integrale.ts`**

```ts
  {
    id: "in-1",
    // ...unchanged fields...
    explanation: [
      "Găsim o primitivă a lui $x^2$: folosind $\\int x^n\\,dx=\\dfrac{x^{n+1}}{n+1}+C$, obținem $F(x)=\\dfrac{x^3}{3}$.",
      "Aplicăm formula Leibniz-Newton: $\\int_0^1 x^2\\,dx = F(1)-F(0)$.",
      "Calculăm: $F(1)=\\dfrac{1}{3}$, $F(0)=0$.",
      "Rezultatul este $\\dfrac{1}{3}$.",
    ],
  },
  {
    id: "in-2",
    // ...unchanged fields...
    explanation: [
      "O primitivă $F$ a lui $f$ verifică $F'=f$.",
      "Derivăm funcția propusă: $(x^2)'=2x$.",
      "Cum derivata coincide cu $f(x)=2x$, rezultă că $x^2$ este o primitivă a lui $2x$.",
    ],
  },
  {
    id: "in-3",
    // ...unchanged fields...
    explanation: [
      "Pentru o funcție constantă $f(x)=c$, integrala definită este $\\int_a^b c\\,dx = c\\cdot(b-a)$.",
      "Înlocuim: $\\int_0^2 3\\,dx = 3\\cdot(2-0)$.",
      "Rezultă $3\\cdot2=6$.",
    ],
  },
  {
    id: "in-4",
    // ...unchanged fields...
    explanation: [
      "O primitivă a lui $f$ este o funcție $F$ cu $F'=f$.",
      "Derivăm funcția exponențială: $(e^x)'=e^x$.",
      "Cum derivata coincide cu funcția însăși, $e^x$ este propria sa primitivă.",
    ],
  },
```

- [ ] **Step 2: Rewrite all 100 explanations in `integraleSets.ts`**

Apply the same convention (find/verify a primitive using the standard formulas, then apply Leibniz-Newton for definite integrals) across all 10 sets, preserving each existing final answer.

- [ ] **Step 3: Create `src/data/theory/integrale.ts`**

```ts
import type { TheorySection } from "../../types";

export const integraleTheory: TheorySection = {
  topic: "integrale",
  title: "Primitive și integrale definite",
  concepts: [
    {
      heading: "Primitive uzuale",
      body: [
        "$\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1}+C$ (pentru $n \\neq -1$)",
        "$\\int \\dfrac{1}{x}\\,dx = \\ln|x|+C$",
        "$\\int e^x\\,dx = e^x+C$",
        "$\\int \\sin x\\,dx = -\\cos x + C$, $\\int \\cos x\\,dx = \\sin x + C$",
      ],
    },
    {
      heading: "Liniaritatea integralei",
      body: [
        "$\\int [f(x)+g(x)]\\,dx = \\int f(x)\\,dx + \\int g(x)\\,dx$",
        "$\\int k\\cdot f(x)\\,dx = k\\int f(x)\\,dx$ pentru orice constantă $k$.",
      ],
    },
    {
      heading: "Integrala definită — formula Leibniz-Newton",
      body: [
        "Dacă $F$ este o primitivă a lui $f$, atunci $\\int_a^b f(x)\\,dx = F(b)-F(a)$.",
      ],
    },
  ],
  examples: [
    {
      statement: "Determinați o primitivă a funcției $f(x)=4x^3-2x$.",
      steps: [
        "Aplicăm formula $\\int x^n\\,dx=\\dfrac{x^{n+1}}{n+1}+C$ pentru fiecare termen.",
        "Pentru $4x^3$: primitiva este $4\\cdot\\dfrac{x^4}{4}=x^4$.",
        "Pentru $-2x$: primitiva este $-2\\cdot\\dfrac{x^2}{2}=-x^2$.",
        "O primitivă a lui $f$ este $F(x)=x^4-x^2+C$.",
      ],
    },
    {
      statement: "Calculați $\\int_0^2(x^2+1)\\,dx$.",
      steps: [
        "Găsim o primitivă: $F(x)=\\dfrac{x^3}{3}+x$.",
        "Aplicăm formula Leibniz-Newton: $\\int_0^2(x^2+1)\\,dx = F(2)-F(0)$.",
        "Calculăm $F(2) = \\dfrac{8}{3}+2 = \\dfrac{14}{3}$ și $F(0)=0$.",
        "Rezultatul este $\\dfrac{14}{3}$.",
      ],
    },
    {
      statement: "Calculați $\\int_0^{\\pi} \\sin x\\,dx$.",
      steps: [
        "O primitivă a lui $\\sin x$ este $-\\cos x$.",
        "Aplicăm Leibniz-Newton: $\\int_0^\\pi \\sin x\\,dx = [-\\cos x]_0^\\pi = -\\cos\\pi - (-\\cos 0)$.",
        "Calculăm: $-(-1) - (-1) = 1+1=2$.",
      ],
    },
  ],
};
```

- [ ] **Step 4: Verify**

Run: `npm run typecheck && npm test`
Run: `grep -c "explanation: \"" src/data/questions/integrale.ts src/data/questions/integraleSets.ts` — expect `0` for both.

- [ ] **Step 5: Commit**

```bash
git add src/data/questions/integrale.ts src/data/questions/integraleSets.ts src/data/theory/integrale.ts
git commit -m "Add step-by-step explanations and theory for integrale"
```

---

### Task 10: `problems.ts` — step-by-step explanations for Subiectul II/III sample problems

**Files:**
- Modify: `src/data/questions/problems.ts`

**Interfaces:** none new — pure content edit.

- [ ] **Step 1: Rewrite all 24 subpoint explanations**

Replace each subpoint's `explanation` (all other fields unchanged):

```ts
// pb-a1 (z = 1 + i*sqrt(3))
explanation: [
  "Pentru $z=a+bi$, modulul este $|z|=\\sqrt{a^2+b^2}$.",
  "Aici $a=1$, $b=\\sqrt{3}$, deci $|z|=\\sqrt{1^2+(\\sqrt3)^2}$.",
  "Calculăm sub radical: $1+3=4$.",
  "Rezultă $|z|=\\sqrt4=2$.",
], // pb-a1-a

explanation: [
  "Ridicăm la pătrat folosind $(a+b)^2=a^2+2ab+b^2$ cu $a=1$, $b=i\\sqrt3$.",
  "Calculăm: $z^2=1^2+2\\cdot1\\cdot i\\sqrt3+(i\\sqrt3)^2=1+2i\\sqrt3+i^2\\cdot3$.",
  "Folosim $i^2=-1$: $1+2i\\sqrt3-3$.",
  "Rezultă $z^2=-2+2i\\sqrt3$.",
], // pb-a1-b

explanation: [
  "Din subpunctul anterior, $z^2=-2+2i\\sqrt3$.",
  "Partea reală este coeficientul termenului fără $i$, adică $-2$.",
], // pb-a1-c

// pb-a2 (echipa de 3 din 20 elevi)
explanation: [
  "Cum ordinea nu contează la formarea echipei, folosim combinări: $C_n^k=\\dfrac{n!}{k!(n-k)!}$.",
  "Înlocuim $n=20$, $k=3$: $C_{20}^3=\\dfrac{20!}{3! \\cdot 17!}$.",
  "Simplificăm: $\\dfrac{20!}{17!}=20\\cdot19\\cdot18$, deci $C_{20}^3=\\dfrac{20\\cdot19\\cdot18}{6}$.",
  "Calculăm: $20\\cdot19\\cdot18=6840$, iar $6840/6=1140$.",
], // pb-a2-a

explanation: [
  "Rolurile fiind distincte (căpitan, secretar, membru), ordinea contează, deci folosim aranjamente.",
  "Aplicăm formula: $A_n^k=n(n-1)\\cdots(n-k+1)$, cu $n=20$, $k=3$.",
  "Calculăm: $A_{20}^3=20\\cdot19\\cdot18=6840$.",
], // pb-a2-b

explanation: [
  "Din subpunctele anterioare avem $A_{20}^3=6840$ și $C_{20}^3=1140$.",
  "Scădem: $6840-1140=5700$.",
], // pb-a2-c

// pb-a3 (A = [[1,2],[0,1]])
explanation: [
  "Calculăm $A^2=A\\cdot A$ înmulțind matricea cu ea însăși.",
  "Elementul $(1,2)$ se obține înmulțind linia 1 din $A$, adică $(1,2)$, cu coloana 2 din $A$, adică $(2,1)$.",
  "Calculăm: $1\\cdot2+2\\cdot1=2+2=4$.",
], // pb-a3-a

explanation: [
  "Înmulțim matricea $A$ cu ea însăși, element cu element.",
  "Elementele de pe diagonala principală rămân $1$.",
  "Elementul $(1,2)$ calculat anterior este $4$, iar elementul $(2,1)$ rămâne $0$.",
  "Rezultă $$A^2=\\begin{pmatrix}1&4\\\\0&1\\end{pmatrix}.$$",
], // pb-a3-b

explanation: [
  "Urma unei matrice este suma elementelor de pe diagonala principală.",
  "Diagonala principală a lui $A^2$ este $1,1$.",
  "Suma este $1+1=2$.",
], // pb-a3-c

// pb-a4 (A = [[m,1],[2,m]])
explanation: [
  "Determinantul unei matrice $2\\times2$ este $\\det=ad-bc$.",
  "Aici $\\det(A)=m\\cdot m - 1\\cdot2=m^2-2$.",
  "Înlocuim $m=3$: $3^2-2=9-2=7$.",
], // pb-a4-a

explanation: [
  "Aplicăm formula determinantului pentru ordinul 2: $\\det=ad-bc$.",
  "Cu $a=m$, $b=1$, $c=2$, $d=m$, obținem $\\det(A)=m\\cdot m-1\\cdot2$.",
  "Simplificăm: $\\det(A)=m^2-2$.",
], // pb-a4-b

explanation: [
  "Din subpunctele anterioare, $\\det(A)=m^2-2$.",
  "Punem condiția $\\det(A)=0$: $m^2-2=0 \\Rightarrow m^2=2$.",
  "Soluțiile sunt $m=\\pm\\sqrt2$; soluția pozitivă este $\\sqrt2$.",
], // pb-a4-c

// pb-b1 (f(x) = x^3 - 3x + 2)
explanation: [
  "Derivăm folosind $(x^n)'=nx^{n-1}$: $f'(x)=3x^2-3$.",
  "Înlocuim $x=1$: $f'(1)=3\\cdot1-3$.",
  "Rezultă $f'(1)=0$.",
], // pb-b1-a

explanation: [
  "Punctele critice sunt soluțiile ecuației $f'(x)=0$.",
  "Din subpunctul anterior, $f'(x)=3x^2-3$, deci rezolvăm $3x^2-3=0 \\Rightarrow x^2=1$.",
  "Soluțiile sunt $x=-1$ și $x=1$.",
], // pb-b1-b

explanation: [
  "Înlocuim $x=1$ direct în expresia funcției: $f(1)=1^3-3\\cdot1+2$.",
  "Calculăm: $1-3+2=0$.",
], // pb-b1-c

// pb-b2 (f(x) = (x^2-1)/(x-1))
explanation: [
  "Înlocuirea directă $x=1$ dă forma nedeterminată $\\frac{0}{0}$, deci factorizăm.",
  "Numărătorul se factorizează: $x^2-1=(x-1)(x+1)$.",
  "Simplificăm factorul comun $x-1$: expresia devine $x+1$.",
  "Limita este $1+1=2$.",
], // pb-b2-a

explanation: [
  "Pentru ca $f$ să fie prelungită prin continuitate în $x=1$, $f(1)$ trebuie definită ca limita funcției în acel punct.",
  "Din subpunctul anterior, limita este $2$.",
  "Deci valoarea care asigură continuitatea este $f(1)=2$.",
], // pb-b2-b

explanation: [
  "Pentru $x\\neq1$, avem $f(x)=x+1$ (din simplificarea de mai sus).",
  "Deci $\\dfrac{f(x)}{x}=\\dfrac{x+1}{x}=1+\\dfrac{1}{x}$.",
  "Când $x\\to\\infty$, termenul $\\dfrac1x\\to0$, deci limita este $1$.",
], // pb-b2-c

// pb-b3 (f(x) = 3x^2 - 2x)
explanation: [
  "Găsim o primitivă generală: $F(x)=x^3-x^2+C$ (verificăm că $F'(x)=3x^2-2x=f(x)$).",
  "Condiția $F(0)=0$ dă $0-0+C=0 \\Rightarrow C=0$.",
  "Deci $F(x)=x^3-x^2$, iar $F(1)=1-1=0$.",
], // pb-b3-a

explanation: [
  "O primitivă $F$ verifică $F'=f$.",
  "Derivăm funcția propusă: $(x^3-x^2)'=3x^2-2x$.",
  "Cum aceasta coincide cu $f(x)=3x^2-2x$, primitiva generală este $x^3-x^2+C$.",
], // pb-b3-b

explanation: [
  "Folosim primitiva $F(x)=x^3-x^2$ găsită anterior.",
  "Aplicăm Leibniz-Newton: $\\int_0^2 f(x)\\,dx=F(2)-F(0)$.",
  "Calculăm $F(2)=8-4=4$ și $F(0)=0$.",
  "Rezultatul este $4$.",
], // pb-b3-c

// pb-b4 (f(x) = ln x - x)
explanation: [
  "Derivăm folosind $(\\ln x)'=\\dfrac1x$ și $(x)'=1$: $f'(x)=\\dfrac1x-1$.",
  "Înlocuim $x=1$: $f'(1)=1-1$.",
  "Rezultă $f'(1)=0$.",
], // pb-b4-a

explanation: [
  "Din subpunctul anterior, $f'(x)=\\dfrac1x-1$.",
  "Pentru $x\\in(0,1)$ avem $\\dfrac1x>1$, deci $f'(x)>0$.",
  "Cum derivata este pozitivă pe $(0,1)$, funcția este crescătoare pe acest interval.",
], // pb-b4-b

explanation: [
  "Știind că $x=1$ este punct de maxim, calculăm valoarea maximă direct din expresia funcției.",
  "Înlocuim $x=1$: $f(1)=\\ln1-1$.",
  "Cum $\\ln1=0$, rezultă $f(1)=-1$.",
], // pb-b4-c
```

- [ ] **Step 2: Verify**

Run: `npm run typecheck && npm test`
Run: `grep -c "explanation: \"" src/data/questions/problems.ts` — expect `0`.

- [ ] **Step 3: Commit**

```bash
git add src/data/questions/problems.ts
git commit -m "Add step-by-step explanations to sample Subiectul II/III problems"
```

---

### Task 11: `examProblemsAlgebra.ts` — step-by-step explanations (Subiectul II exam pool)

**Files:**
- Modify: `src/data/questions/examProblemsAlgebra.ts`

**Interfaces:** none new — pure content edit.

- [ ] **Step 1: Rewrite the first problem's 3 explanations (concrete model)**

```ts
// ea-nc-1 (z = 3+4i)
explanation: [
  "Pentru $z=a+bi$, modulul este $|z|=\\sqrt{a^2+b^2}$.",
  "Aici $a=3$, $b=4$: $|z|=\\sqrt{3^2+4^2}=\\sqrt{9+16}=\\sqrt{25}$.",
  "Rezultă $|z|=5$.",
], // ea-nc-1-a

explanation: [
  "Ridicăm la pătrat: $z^2=(3+4i)^2=3^2+2\\cdot3\\cdot4i+(4i)^2$.",
  "Calculăm fiecare termen: $9+24i+16i^2$, iar $i^2=-1$ dă $9+24i-16$.",
  "Rezultă $z^2=-7+24i$.",
], // ea-nc-1-b

explanation: [
  "Din subpunctul anterior, $z^2=-7+24i$.",
  "Partea reală este coeficientul termenului fără $i$, adică $-7$.",
], // ea-nc-1-c
```

- [ ] **Step 2: Rewrite the remaining ~49 problems' explanations (150 total across the file)**

Every problem in this file belongs to one of the 5 algebra topics (`numere-complexe`, `combinatorica`, `matrice`, `determinanti`, `sisteme` — check each problem's `topic` field). For each subpoint, apply the same convention used for that topic in Tasks 2/3/4/5/6 and in Step 1 above: name the rule/formula for that topic, substitute the problem's specific numbers, compute, and conclude with the existing `correctAnswer`. Use the corresponding topic's theory file (`src/data/theory/<topic>.ts`, created in Tasks 2-6) as the source of correct terminology and formula statements for consistency.

- [ ] **Step 3: Verify**

Run: `npm run typecheck && npm test`
Run: `grep -c "explanation: \"" src/data/questions/examProblemsAlgebra.ts` — expect `0`.

- [ ] **Step 4: Commit**

```bash
git add src/data/questions/examProblemsAlgebra.ts
git commit -m "Add step-by-step explanations to Subiectul II exam problem pool"
```

---

### Task 12: `examProblemsAnalysis.ts` — step-by-step explanations (Subiectul III exam pool)

**Files:**
- Modify: `src/data/questions/examProblemsAnalysis.ts`

**Interfaces:** none new — pure content edit.

- [ ] **Step 1: Rewrite the first problem's 3 explanations (concrete model)**

```ts
// ea-lm-1 (f(x) = (x^2-4)/(x-2))
explanation: [
  "Înlocuirea directă $x=2$ dă forma nedeterminată $\\frac00$, deci factorizăm.",
  "Numărătorul se factorizează: $x^2-4=(x-2)(x+2)$.",
  "Simplificăm factorul comun $x-2$: expresia devine $x+2$, iar limita este $2+2=4$.",
], // ea-lm-1-a

explanation: [
  "Pentru ca $f$ să fie prelungită prin continuitate în $x=2$, $f(2)$ trebuie definită ca limita funcției în acel punct.",
  "Din subpunctul anterior, limita este $4$.",
  "Deci valoarea care asigură continuitatea este $f(2)=4$.",
], // ea-lm-1-b

explanation: [
  "Pentru $x\\ne2$, $f(x)=x+2$ (din simplificarea anterioară).",
  "Atunci $f(x)-x = (x+2)-x = 2$ pentru orice $x\\ne2$.",
  "Limita unei funcții constante este chiar acea constantă: $2$.",
], // ea-lm-1-c
```

- [ ] **Step 2: Rewrite the remaining ~49 problems' explanations (150 total across the file)**

Every problem in this file belongs to one of the 3 analysis topics (`limite`, `derivate`, `integrale` — check each problem's `topic` field). For each subpoint, apply the same convention used for that topic in Tasks 7/8/9 and in Step 1 above: name the rule/formula for that topic, substitute the problem's specific numbers, compute, and conclude with the existing `correctAnswer`. Use the corresponding topic's theory file (`src/data/theory/<topic>.ts`, created in Tasks 7-9) as the source of correct terminology and formula statements for consistency.

- [ ] **Step 3: Verify**

Run: `npm run typecheck && npm test`
Run: `grep -c "explanation: \"" src/data/questions/examProblemsAnalysis.ts` — expect `0`.

- [ ] **Step 4: Commit**

```bash
git add src/data/questions/examProblemsAnalysis.ts
git commit -m "Add step-by-step explanations to Subiectul III exam problem pool"
```

---

### Task 13: Theory aggregator + integrity test

**Files:**
- Create: `src/data/theory/index.ts`
- Create: `src/data/theory/index.test.ts`

**Interfaces:**
- Consumes: `numereComplexeTheory`, `combinatoricaTheory`, `matriceTheory`, `determinantiTheory`, `sistemeTheory`, `limiteTheory`, `derivateTheory`, `integraleTheory` (Tasks 2-9); `Topic`, `TheorySection` from `src/types.ts`.
- Produces: `THEORY: Record<Topic, TheorySection>`, `theoryForTopic(topic: Topic): TheorySection` — consumed by Task 14.

- [ ] **Step 1: Write the failing test**

Create `src/data/theory/index.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { TOPICS } from "../index";
import { THEORY, theoryForTopic } from "./index";

describe("theory content integrity", () => {
  it("has a theory section for every topic", () => {
    for (const topic of TOPICS) {
      const section = theoryForTopic(topic);
      expect(section).toBeDefined();
      expect(section.topic).toBe(topic);
    }
  });

  it("every theory section has at least one concept with non-empty body", () => {
    for (const topic of TOPICS) {
      const section = THEORY[topic];
      expect(section.concepts.length).toBeGreaterThan(0);
      for (const concept of section.concepts) {
        expect(concept.heading.trim().length).toBeGreaterThan(0);
        expect(concept.body.length).toBeGreaterThan(0);
      }
    }
  });

  it("every theory section has at least 2 worked examples with steps", () => {
    for (const topic of TOPICS) {
      const section = THEORY[topic];
      expect(section.examples.length).toBeGreaterThanOrEqual(2);
      for (const example of section.examples) {
        expect(example.statement.trim().length).toBeGreaterThan(0);
        expect(example.steps.length).toBeGreaterThan(0);
      }
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- index.test.ts` (or `npx vitest run src/data/theory/index.test.ts`)
Expected: FAIL — `./index` (the aggregator) does not exist yet.

- [ ] **Step 3: Create the aggregator `src/data/theory/index.ts`**

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

export const THEORY: Record<Topic, TheorySection> = {
  "numere-complexe": numereComplexeTheory,
  combinatorica: combinatoricaTheory,
  matrice: matriceTheory,
  determinanti: determinantiTheory,
  sisteme: sistemeTheory,
  limite: limiteTheory,
  derivate: derivateTheory,
  integrale: integraleTheory,
};

export function theoryForTopic(topic: Topic): TheorySection {
  return THEORY[topic];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- index.test.ts`
Expected: PASS (all three assertions, across all 8 topics).

- [ ] **Step 5: Run full verification**

Run: `npm run typecheck && npm test`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/data/theory/index.ts src/data/theory/index.test.ts
git commit -m "Add theory content aggregator with integrity test"
```

---

### Task 14: Theory page, route, and Home topic-card link

**Files:**
- Create: `src/pages/Theory.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/TopicCard.tsx`
- Modify: `src/styles/index.css`

**Interfaces:**
- Consumes: `theoryForTopic` from `src/data/theory` (Task 13); `TOPIC_LABELS` from `src/data/index.ts`; `MathText` from `src/components/MathText.tsx`.

- [ ] **Step 1: Create `src/pages/Theory.tsx`**

```tsx
import { Link, useParams } from "react-router-dom";
import type { Topic } from "../types";
import { TOPIC_LABELS } from "../data";
import { theoryForTopic } from "../data/theory";
import { MathText } from "../components/MathText";

export function Theory() {
  const { topic } = useParams<{ topic: Topic }>();
  const section = topic ? theoryForTopic(topic) : undefined;

  if (!topic || !section) {
    return (
      <div className="page">
        <p>Capitol necunoscut.</p>
        <Link to="/">Înapoi acasă</Link>
      </div>
    );
  }

  return (
    <div className="page page--theory">
      <h1>{TOPIC_LABELS[topic]} — Teorie</h1>

      {section.concepts.map((concept) => (
        <div className="theory-page__concept" key={concept.heading}>
          <div className="theory-page__concept-heading">{concept.heading}</div>
          {concept.body.map((paragraph, index) => (
            <p key={index}>
              <MathText text={paragraph} />
            </p>
          ))}
        </div>
      ))}

      <h2>Exemple rezolvate</h2>
      {section.examples.map((example, index) => (
        <div className="theory-page__example" key={index}>
          <div className="theory-page__example-statement">
            <MathText text={example.statement} />
          </div>
          <ol>
            {example.steps.map((step, stepIndex) => (
              <li key={stepIndex}>
                <MathText text={step} />
              </li>
            ))}
          </ol>
        </div>
      ))}

      <p>
        <Link to={`/quiz/${topic}`}>Exersează acest capitol</Link>
      </p>
      <p>
        <Link to="/">Înapoi acasă</Link>
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Add the route in `src/App.tsx`**

Add the import:

```tsx
import { Theory } from "./pages/Theory";
```

Add the route (next to the `/quiz/:topic` route):

```tsx
      <Route path="/theory/:topic" element={<Theory />} />
```

- [ ] **Step 3: Add the "Teorie" link to `src/components/TopicCard.tsx`**

Replace the return block:

```tsx
  return (
    <div className="topic-card">
      <Link to={`/quiz/${topic}`} className="topic-card__link">
        <div className="topic-card__title">{label}</div>
        <div className="topic-card__stats">
          {attempted === 0 ? "Neîncercat încă" : `${Math.round(accuracy * 100)}% corect (${attempted} întrebări)`}
        </div>
      </Link>
      <div className="topic-card__actions">
        <Link to={`/theory/${topic}`} className="topic-card__theory-link">
          Teorie
        </Link>
        {hasSets && (
          <Link to={`/quiz/${topic}/sets`} className="topic-card__sets-link">
            Seturi de exerciții
          </Link>
        )}
      </div>
    </div>
  );
```

- [ ] **Step 4: Add styling to `src/styles/index.css`**

Append after the existing `.topic-card__sets-link { ... }` rule:

```css
.topic-card__actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.topic-card__theory-link {
  font-size: 0.85rem;
  color: var(--accent);
  text-decoration: none;
}
```

Append after the existing `.problem-block__statement { ... }` rule:

```css
.theory-page__concept {
  margin: 16px 0;
}

.theory-page__concept-heading {
  font-weight: 600;
  margin-bottom: 6px;
}

.theory-page__example {
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
  margin: 16px 0;
  background: var(--card-bg);
}

.theory-page__example-statement {
  font-weight: 500;
  margin-bottom: 10px;
}
```

- [ ] **Step 5: Verify**

Run: `npm run typecheck && npm test`
Expected: both pass.
Run: `npm run dev`, open the app, click "Teorie" on a topic card (e.g. Numere complexe), confirm the page renders concepts and worked examples with LaTeX rendered correctly, and that "Exersează acest capitol" and "Înapoi acasă" links work. Stop the dev server afterward.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Theory.tsx src/App.tsx src/components/TopicCard.tsx src/styles/index.css
git commit -m "Add theory page per chapter, linked from Home topic cards"
```

---

### Task 15: Tighten explanation type to `string[]` only

**Files:**
- Modify: `src/types.ts`
- Modify: `src/components/QuestionCard.tsx`
- Modify: `src/data/index.test.ts`

**Interfaces:**
- Consumes: completion of Tasks 1-12 (every `explanation` in the codebase must already be a `string[]` — this task's typecheck step is what proves that).
- Produces: `GradableItem.explanation: string[]` (final, non-transitional).

- [ ] **Step 1: Tighten the type in `src/types.ts`**

```ts
  explanation: string[];
```

- [ ] **Step 2: Simplify `QuestionCard.tsx` (drop the transitional normalization)**

Replace:

```tsx
      {showExplanation && (
        <div className="question-card__explanation">
          <strong>Explicație:</strong>
          <ol className="question-card__explanation-steps">
            {(Array.isArray(item.explanation) ? item.explanation : [item.explanation]).map((step, stepIndex) => (
              <li key={stepIndex}>
                <MathText text={step} />
              </li>
            ))}
          </ol>
        </div>
      )}
```

with:

```tsx
      {showExplanation && (
        <div className="question-card__explanation">
          <strong>Explicație:</strong>
          <ol className="question-card__explanation-steps">
            {item.explanation.map((step, stepIndex) => (
              <li key={stepIndex}>
                <MathText text={step} />
              </li>
            ))}
          </ol>
        </div>
      )}
```

- [ ] **Step 3: Tighten the integrity test in `src/data/index.test.ts`**

Replace the `describe("explanation format", ...)` block added in Task 1 with:

```ts
describe("explanation format", () => {
  function isNonEmptyExplanation(explanation: string[]): boolean {
    return explanation.length > 0 && explanation.every((step) => step.trim().length > 0);
  }

  it("every exercise explanation is a non-empty step array", () => {
    for (const exercise of ALL_EXERCISES) {
      expect(isNonEmptyExplanation(exercise.explanation)).toBe(true);
    }
  });

  it("every problem subpoint explanation is a non-empty step array", () => {
    for (const problem of ALL_PROBLEMS) {
      for (const subpoint of problem.subpoints) {
        expect(isNonEmptyExplanation(subpoint.explanation)).toBe(true);
      }
    }
  });
});
```

- [ ] **Step 4: Full verification**

Run: `npm run build`
Expected: PASS. If `tsc` reports a type error on any `explanation: "..."` still left as a bare string in any question-bank file, that file was missed in an earlier task — go fix it (convert to a `string[]`) before proceeding.
Run: `npm test`
Expected: all suites PASS, including the tightened `explanation format` tests and the theory integrity tests from Task 13.

- [ ] **Step 5: Manual smoke test**

Run: `npm run dev`, open the app, complete one exercise in "practice" mode in at least 2 different topics, confirm the step list renders correctly (numbered, LaTeX intact) and the "Teorie" pages for the same 2 topics still render correctly. Stop the dev server afterward.

- [ ] **Step 6: Commit**

```bash
git add src/types.ts src/components/QuestionCard.tsx src/data/index.test.ts
git commit -m "Tighten explanation type to string[] now that all content is migrated"
```
