# Twelfth-grade gaps Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close two 12th-grade M_tehnologic curriculum gaps — algebraic structures (Grupuri, Inele, Corpuri, morfisme/izomorfisme) and integration techniques (integrare prin părți, schimbare de variabilă) — by extending the existing `legi-compozitie` and `integrale` topics with new theory, new base exercises, and a new practice set (Set 11) each.

**Architecture:** Append new `TheorySection` concepts/examples and new `Exercise` entries to 6 existing files across the two topics; append 2 new formula entries to the existing `integrale` chapter in `src/data/formulaSheet.ts` and regenerate the downloadable PDF/DOCX once. No new `Topic` entries — both topics already exist and are already wired up in `TOPICS`/`TOPIC_LABELS`/`THEORY`.

**Tech Stack:** Vite + React + TypeScript + Vitest, existing `TheorySection`/`Exercise`/`FormulaChapter` data shapes.

## Global Constraints

- Every exercise is worth exactly 6 points.
- New base exercise ids: `lc-5`, `lc-6`, `lc-7` (legi-compozitie), `in-5`, `in-6` (integrale) — verified unique against every existing id in the codebase.
- New practice-set ids: `lc-s11-1`..`lc-s11-10` (`set: 11`), `in-s11-1`..`in-s11-10` (`set: 11`) — each set has exactly 10 exercises, matching the SetPicker UI copy ("Alege un set de 10 întrebări") and the convention of every existing set (Sets 1–10 in both files).
- For every `mcq` exercise, `correctAnswer` must appear character-for-character in `options`, **and all options must be genuinely distinct values/statements** (not just distinct strings) — this exact bug class has recurred across every prior round of this project; check it explicitly for every new mcq in this plan.
- `TheorySection.concepts`/`.examples` are arrays — new entries are **appended**, never replacing existing content.
- No `src/types.ts`, `TOPICS`, `TOPIC_LABELS`, or `THEORY` registry changes — both topics already exist. Do not touch these files.
- New practice sets require **no** `src/data/index.ts` changes: `setNumbersForTopic`/`exercisesForSet` (in `src/data/index.ts`) are generic over any `set` number present in `ALL_EXERCISES`, and `legiCompozitieSetExercises`/`integraleSetExercises` are already spread into `ALL_EXERCISES`. Appending to those existing arrays is sufficient.
- `src/data/formulaSheet.ts`'s `FORMULA_SHEET.map(c => c.topic)` must still equal `TOPICS` exactly after this plan — no chapter is added or removed, only two entries appended inside the existing `integrale` chapter's array. Do not add a `legi-compozitie` formula-sheet chapter — structural definitions (group/ring/field) are not algebraic formulas, per the design spec.
- `npm run generate:formulas` must be run exactly once, in Task 3 (the only task touching `formulaSheet.ts`), and both `public/formule-bacalaureat.pdf` and `.docx` must be committed in that same task's commit.
- Romanian typographic quotes „..." (not escaped ASCII `\"...\"`) if any new content needs quoting.
- Match each file's own existing LaTeX convention exactly when appending: `legiCompozitie.ts`/`legiCompozitieSets.ts` use inline `$...$` throughout (never `$$...$$`); `integrale.ts`/`integraleSets.ts` use `$$...$$` display blocks for standalone integral prompts (see each file's existing entries for the exact pattern) and inline `$...$` within explanation prose.
- $\mathbb{Z}_n$ notation: use `\mathbb{Z}_n` in LaTeX (renders as $\mathbb{Z}_n$), and `\hat{k}` for a residue class element (renders as $\hat{k}$), matching standard Romanian textbook notation for classes of residues.

---

### Task 1: Algebraic structures — theory + base exercises (`legi-compozitie`)

**Files:**
- Modify: `src/data/theory/legiCompozitie.ts`
- Modify: `src/data/questions/legiCompozitie.ts`

**Interfaces:**
- Consumes: existing `TheorySection`, `Exercise` shapes from `src/types.ts` — no new types.
- Produces: nothing consumed by later tasks (Task 2 modifies a different file in the same topic; Tasks 3–4 are a different topic entirely — all four tasks are file-independent and can be reviewed in any order, though this plan dispatches them in order 1–4).

- [ ] **Step 1: Add the 4 new concepts to the theory file**

Edit `src/data/theory/legiCompozitie.ts`. Add four new concepts to the end of the `concepts` array (after "Tabla operației"):

```ts
    {
      heading: "Grup",
      body: [
        "$(G,\\circ)$ este grup dacă legea $\\circ$ este asociativă, admite element neutru, și orice element din $G$ este simetrizabil.",
        "Exemple: $(\\mathbb{Z},+)$ este grup; mulțimea claselor de resturi modulo $n$ împreună cu adunarea, $(\\mathbb{Z}_n,+)$, este de asemenea grup (grupul aditiv al claselor de resturi modulo $n$).",
      ],
    },
    {
      heading: "Morfism și izomorfism de grupuri",
      body: [
        "O funcție $f:(G,\\circ)\\to(H,*)$ este morfism de grupuri dacă $f(x\\circ y)=f(x)*f(y)$, pentru orice $x,y\\in G$.",
        "Un morfism care este și bijectiv se numește izomorfism de grupuri.",
      ],
    },
    {
      heading: "Inel",
      body: [
        "$(A,+,\\cdot)$ este inel dacă $(A,+)$ este grup abelian, legea $\\cdot$ este asociativă, iar $\\cdot$ este distributivă față de $+$.",
        "Exemple: $(\\mathbb{Z},+,\\cdot)$, $(\\mathbb{Z}_n,+,\\cdot)$ sunt inele.",
      ],
    },
    {
      heading: "Corp",
      body: [
        "Un inel $(A,+,\\cdot)$ cu $1\\neq0$ este corp dacă orice element nenul al lui $A$ este simetrizabil (inversabil) față de $\\cdot$.",
        "Exemple: $(\\mathbb{Q},+,\\cdot)$, $(\\mathbb{R},+,\\cdot)$ sunt corpuri; $(\\mathbb{Z}_p,+,\\cdot)$ este corp dacă și numai dacă $p$ este număr prim.",
      ],
    },
```

- [ ] **Step 2: Add 3 new worked examples**

Add three new examples to the end of the `examples` array (after the existing 3):

```ts
    {
      statement: "Verificați că $(\\mathbb{Z}_4,+)$ este grup.",
      steps: [
        "Adunarea claselor de resturi modulo $4$ este asociativă (moștenită din asociativitatea adunării întregilor).",
        "Elementul neutru este $\\hat{0}$, deoarece $\\hat{x}+\\hat{0}=\\hat{x}$ pentru orice $\\hat{x}\\in\\mathbb{Z}_4$.",
        "Fiecare element are simetric: $\\hat{0}$ cu $\\hat{0}$, $\\hat{1}$ cu $\\hat{3}$, $\\hat{2}$ cu $\\hat{2}$, $\\hat{3}$ cu $\\hat{1}$ (suma fiecărei perechi este $\\hat{0}$).",
        "Fiind îndeplinite toate condițiile, $(\\mathbb{Z}_4,+)$ este grup.",
      ],
    },
    {
      statement: "Arătați că $f:(\\mathbb{Z},+)\\to(\\mathbb{Z},+)$, $f(x)=2x$, este morfism, dar nu este izomorfism.",
      steps: [
        "Verificăm proprietatea de morfism: $f(x+y)=2(x+y)=2x+2y=f(x)+f(y)$, pentru orice $x,y\\in\\mathbb{Z}$. Rezultă că $f$ este morfism.",
        "Verificăm surjectivitatea: valorile lui $f$ sunt exact numerele întregi pare, deci un număr impar (de exemplu $1$) nu are nicio preimagine.",
        "Cum $f$ nu este surjectivă, $f$ nu este bijectivă, deci nu este izomorfism.",
      ],
    },
    {
      statement: "Arătați că $(\\mathbb{Z}_5,+,\\cdot)$ este corp, dar $(\\mathbb{Z}_4,+,\\cdot)$ nu este corp.",
      steps: [
        "Pentru $(\\mathbb{Z}_5,+,\\cdot)$: fiecare element nenul are invers față de înmulțire — $\\hat{1}\\cdot\\hat{1}=\\hat{1}$, $\\hat{2}\\cdot\\hat{3}=\\hat{6}=\\hat{1}$, $\\hat{4}\\cdot\\hat{4}=\\hat{16}=\\hat{1}$. Cum $5$ este prim, $(\\mathbb{Z}_5,+,\\cdot)$ este corp.",
        "Pentru $(\\mathbb{Z}_4,+,\\cdot)$: elementul $\\hat{2}$ nu are invers — $\\hat{2}\\cdot\\hat{0}=\\hat{0}$, $\\hat{2}\\cdot\\hat{1}=\\hat{2}$, $\\hat{2}\\cdot\\hat{2}=\\hat{0}$, $\\hat{2}\\cdot\\hat{3}=\\hat{2}$, niciodată $\\hat{1}$.",
        "Cum $4$ nu este prim, $(\\mathbb{Z}_4,+,\\cdot)$ nu este corp.",
      ],
    },
```

- [ ] **Step 3: Run theory integrity test to verify it still passes**

Run: `npx vitest run src/data/theory/index.test.ts`
Expected: PASS (3/3).

- [ ] **Step 4: Add exercises `lc-5`, `lc-6`, `lc-7`**

Edit `src/data/questions/legiCompozitie.ts`. Add three new exercises to the end of the `legiCompozitieExercises` array (after `lc-4`):

```ts
  {
    id: "lc-5",
    topic: "legi-compozitie",
    type: "input",
    points: 6,
    prompt: "În grupul aditiv al claselor de resturi modulo $5$, $(\\mathbb{Z}_5,+)$, determinați simetricul (opusul) elementului $\\hat{3}$.",
    correctAnswer: "2",
    explanation: [
      "Simetricul elementului $\\hat{3}$ este elementul $\\hat{x}$ pentru care $\\hat{3}+\\hat{x}=\\hat{0}$.",
      "Cum $3+2=5\\equiv0\\ (\\text{mod}\\ 5)$, rezultă $\\hat{x}=\\hat{2}$.",
    ],
  },
  {
    id: "lc-6",
    topic: "legi-compozitie",
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele structuri $(\\mathbb{Z}_n,+,\\cdot)$ este corp?",
    options: [
      "$(\\mathbb{Z}_4,+,\\cdot)$",
      "$(\\mathbb{Z}_5,+,\\cdot)$",
      "$(\\mathbb{Z}_6,+,\\cdot)$",
      "$(\\mathbb{Z}_8,+,\\cdot)$",
    ],
    correctAnswer: "$(\\mathbb{Z}_5,+,\\cdot)$",
    explanation: [
      "$(\\mathbb{Z}_n,+,\\cdot)$ este corp dacă și numai dacă $n$ este număr prim.",
      "Dintre $4$, $5$, $6$, $8$, doar $5$ este prim, deci doar $(\\mathbb{Z}_5,+,\\cdot)$ este corp.",
    ],
  },
  {
    id: "lc-7",
    topic: "legi-compozitie",
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele proprietăți NU este obligatorie pentru ca $(G,\\circ)$ să fie grup?",
    options: [
      "Comutativitatea legii $\\circ$",
      "Asociativitatea legii $\\circ$",
      "Existența elementului neutru",
      "Orice element din $G$ este simetrizabil",
    ],
    correctAnswer: "Comutativitatea legii $\\circ$",
    explanation: [
      "Un grup cere doar asociativitate, element neutru și simetrizabilitatea fiecărui element.",
      "Comutativitatea nu este obligatorie — un grup în care legea este și comutativă se numește grup abelian, dar există grupuri necomutative.",
    ],
  },
```

- [ ] **Step 5: Run data integrity test to verify it passes**

Run: `npx vitest run src/data/index.test.ts`
Expected: PASS — `lc-5`, `lc-6`, `lc-7` have unique ids, 6 points each, and both mcqs' `correctAnswer` is present in `options`.

- [ ] **Step 6: Run the full test suite**

Run: `npm test`
Expected: all test files pass.

- [ ] **Step 7: Commit**

```bash
git add src/data/theory/legiCompozitie.ts src/data/questions/legiCompozitie.ts
git commit -m "Add algebraic structures (group, ring, field) to Legi de compoziție topic"
```

---

### Task 2: Algebraic structures — practice set 11 (`legi-compozitie`)

**Files:**
- Modify: `src/data/questions/legiCompozitieSets.ts`

**Interfaces:**
- Consumes: existing `Exercise` shape. Independent of Task 1 — different file, no shared state (Task 1 edits `legiCompozitie.ts`/`legiCompozitie.ts` questions; this task only edits `legiCompozitieSets.ts`).
- Produces: nothing consumed elsewhere. `setNumbersForTopic("legi-compozitie")` will automatically include `11` once this task's exercises exist — no other file needs to change.

- [ ] **Step 1: Add Set 11 (10 exercises) to the end of the file**

Edit `src/data/questions/legiCompozitieSets.ts`. Add a comment header and 10 new exercise objects to the end of the `legiCompozitieSetExercises` array (after the existing `lc-s10-10`, before the closing `];`):

```ts
  // Set 11 — Grupuri, inele și corpuri
  {
    id: "lc-s11-1",
    topic: "legi-compozitie",
    set: 11,
    type: "input",
    points: 6,
    prompt: "În grupul aditiv $(\\mathbb{Z}_6,+)$, determinați simetricul elementului $\\hat{4}$.",
    correctAnswer: "2",
    explanation: [
      "Căutăm $\\hat{x}$ astfel încât $\\hat{4}+\\hat{x}=\\hat{0}$.",
      "Cum $4+2=6\\equiv0\\ (\\text{mod}\\ 6)$, rezultă $\\hat{x}=\\hat{2}$.",
    ],
  },
  {
    id: "lc-s11-2",
    topic: "legi-compozitie",
    set: 11,
    type: "input",
    points: 6,
    prompt: "În grupul aditiv $(\\mathbb{Z}_7,+)$, determinați simetricul elementului $\\hat{5}$.",
    correctAnswer: "2",
    explanation: [
      "Căutăm $\\hat{x}$ astfel încât $\\hat{5}+\\hat{x}=\\hat{0}$.",
      "Cum $5+2=7\\equiv0\\ (\\text{mod}\\ 7)$, rezultă $\\hat{x}=\\hat{2}$.",
    ],
  },
  {
    id: "lc-s11-3",
    topic: "legi-compozitie",
    set: 11,
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele structuri este grup?",
    options: ["$(\\mathbb{N},+)$", "$(\\mathbb{Z},+)$", "$(\\mathbb{Z},\\cdot)$", "$(\\mathbb{N},\\cdot)$"],
    correctAnswer: "$(\\mathbb{Z},+)$",
    explanation: [
      "$(\\mathbb{Z},+)$ este grup: adunarea e asociativă, elementul neutru este $0$, iar orice întreg $x$ are simetric $-x\\in\\mathbb{Z}$.",
      "$(\\mathbb{N},+)$ nu este grup — de exemplu $1$ nu are simetric în $\\mathbb{N}$. $(\\mathbb{Z},\\cdot)$ și $(\\mathbb{N},\\cdot)$ nu sunt grupuri — majoritatea elementelor nu au invers față de înmulțire.",
    ],
  },
  {
    id: "lc-s11-4",
    topic: "legi-compozitie",
    set: 11,
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele structuri $(\\mathbb{Z}_n,+,\\cdot)$ este corp?",
    options: [
      "$(\\mathbb{Z}_4,+,\\cdot)$",
      "$(\\mathbb{Z}_6,+,\\cdot)$",
      "$(\\mathbb{Z}_7,+,\\cdot)$",
      "$(\\mathbb{Z}_9,+,\\cdot)$",
    ],
    correctAnswer: "$(\\mathbb{Z}_7,+,\\cdot)$",
    explanation: [
      "$(\\mathbb{Z}_n,+,\\cdot)$ este corp dacă și numai dacă $n$ este prim.",
      "Dintre $4$, $6$, $7$, $9$, doar $7$ este prim.",
    ],
  },
  {
    id: "lc-s11-5",
    topic: "legi-compozitie",
    set: 11,
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele structuri $(\\mathbb{Z}_n,+,\\cdot)$ NU este corp?",
    options: [
      "$(\\mathbb{Z}_3,+,\\cdot)$",
      "$(\\mathbb{Z}_5,+,\\cdot)$",
      "$(\\mathbb{Z}_8,+,\\cdot)$",
      "$(\\mathbb{Z}_{11},+,\\cdot)$",
    ],
    correctAnswer: "$(\\mathbb{Z}_8,+,\\cdot)$",
    explanation: [
      "$(\\mathbb{Z}_n,+,\\cdot)$ este corp dacă și numai dacă $n$ este prim.",
      "Dintre $3$, $5$, $8$, $11$, doar $8$ nu este prim, deci $(\\mathbb{Z}_8,+,\\cdot)$ nu este corp.",
    ],
  },
  {
    id: "lc-s11-6",
    topic: "legi-compozitie",
    set: 11,
    type: "input",
    points: 6,
    prompt: "În $(\\mathbb{Z}_5,+,\\cdot)$, determinați inversul (simetricul față de înmulțire) elementului $\\hat{3}$.",
    correctAnswer: "2",
    explanation: [
      "Căutăm $\\hat{x}$ astfel încât $\\hat{3}\\cdot\\hat{x}=\\hat{1}$.",
      "Cum $3\\cdot2=6\\equiv1\\ (\\text{mod}\\ 5)$, rezultă $\\hat{x}=\\hat{2}$.",
    ],
  },
  {
    id: "lc-s11-7",
    topic: "legi-compozitie",
    set: 11,
    type: "mcq",
    points: 6,
    prompt: "Funcția $f:(\\mathbb{Z},+)\\to(\\mathbb{Z},+)$, $f(x)=3x$, este:",
    options: [
      "morfism, dar nu izomorfism",
      "izomorfism",
      "nu este morfism",
      "element neutru",
    ],
    correctAnswer: "morfism, dar nu izomorfism",
    explanation: [
      "$f(x+y)=3(x+y)=3x+3y=f(x)+f(y)$, deci $f$ este morfism.",
      "$f$ nu este surjectivă (de exemplu $1$ nu are preimagine), deci $f$ nu este izomorfism.",
    ],
  },
  {
    id: "lc-s11-8",
    topic: "legi-compozitie",
    set: 11,
    type: "mcq",
    points: 6,
    prompt: "Funcția $f:(\\mathbb{Z},+)\\to(\\mathbb{Z},+)$, $f(x)=x+1$, este:",
    options: [
      "morfism și izomorfism",
      "morfism, dar nu izomorfism",
      "nu este morfism",
      "automorfism",
    ],
    correctAnswer: "nu este morfism",
    explanation: [
      "Verificăm: $f(x+y)=x+y+1$, dar $f(x)+f(y)=(x+1)+(y+1)=x+y+2$.",
      "Cum $x+y+1\\neq x+y+2$, proprietatea de morfism nu este satisfăcută, deci $f$ nu este morfism.",
    ],
  },
  {
    id: "lc-s11-9",
    topic: "legi-compozitie",
    set: 11,
    type: "input",
    points: 6,
    prompt: "În grupul aditiv $(\\mathbb{Z}_8,+)$, determinați simetricul elementului $\\hat{5}$.",
    correctAnswer: "3",
    explanation: [
      "Căutăm $\\hat{x}$ astfel încât $\\hat{5}+\\hat{x}=\\hat{0}$.",
      "Cum $5+3=8\\equiv0\\ (\\text{mod}\\ 8)$, rezultă $\\hat{x}=\\hat{3}$.",
    ],
  },
  {
    id: "lc-s11-10",
    topic: "legi-compozitie",
    set: 11,
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele afirmații este adevărată?",
    options: [
      "Orice inel este corp",
      "Orice corp este inel",
      "Orice grup este corp",
      "$(\\mathbb{Z},+,\\cdot)$ este corp",
    ],
    correctAnswer: "Orice corp este inel",
    explanation: [
      "Un corp este, prin definiție, un inel cu $1\\neq0$ în care orice element nenul este inversabil față de $\\cdot$ — deci orice corp este inel.",
      "Reciproca e falsă: $(\\mathbb{Z},+,\\cdot)$ este inel, dar nu e corp, deoarece doar $\\hat{1}$ și $-1$ au invers față de înmulțire în $\\mathbb{Z}$.",
    ],
  },
```

- [ ] **Step 2: Run data integrity test to verify it passes**

Run: `npx vitest run src/data/index.test.ts`
Expected: PASS — all 10 new ids are unique, 6 points each, mcqs' `correctAnswer` present in `options`.

- [ ] **Step 3: Manually verify Set 11 is now reachable**

Run: `npx vitest run -t "legi-compozitie"` (or simply re-run the full suite in Step 4) — there is no dedicated set-count test, so this step is a manual sanity check: confirm via a quick Node/ts-node snippet or by reading the file that exactly 10 objects have `set: 11` in this file (`grep -c "set: 11" src/data/questions/legiCompozitieSets.ts` should print `10`).

- [ ] **Step 4: Run the full test suite**

Run: `npm test`
Expected: all test files pass.

- [ ] **Step 5: Commit**

```bash
git add src/data/questions/legiCompozitieSets.ts
git commit -m "Add practice Set 11 (Grupuri, inele și corpuri) to Legi de compoziție"
```

---

### Task 3: Integration techniques — theory + base exercises + formula sheet (`integrale`)

**Files:**
- Modify: `src/data/theory/integrale.ts`
- Modify: `src/data/questions/integrale.ts`
- Modify: `src/data/formulaSheet.ts`
- Modify (regenerated binaries): `public/formule-bacalaureat.pdf`, `public/formule-bacalaureat.docx`

**Interfaces:**
- Consumes: existing `TheorySection`, `Exercise`, `FormulaChapter`/`chapter()` shapes — no new types.
- Produces: nothing consumed by Task 4 beyond the shared file `integrale.ts` conventions (Task 4 only touches `integraleSets.ts`, a different file).

- [ ] **Step 1: Add the 2 new concepts to the theory file**

Edit `src/data/theory/integrale.ts`. Add two new concepts to the end of the `concepts` array (after "Integrala definită — formula Leibniz-Newton"):

```ts
    {
      heading: "Integrarea prin părți",
      body: [
        "Formula de integrare prin părți: $\\int u\\,v'\\,dx = uv - \\int u'v\\,dx$.",
        "Se aplică atunci când integrandul este un produs de funcții, alegând $u$ astfel încât derivata sa să simplifice calculul (de exemplu $u=\\ln x$ sau $u=x^n$), iar $v'$ să fie ușor de integrat.",
      ],
    },
    {
      heading: "Integrarea prin schimbare de variabilă",
      body: [
        "Formula de schimbare de variabilă: $\\int f(g(x))\\,g'(x)\\,dx = F(g(x))+C$, unde $F$ este o primitivă a lui $f$.",
        "Se aplică atunci când integrandul conține o funcție compusă $f(g(x))$ înmulțită cu derivata funcției interioare $g'(x)$; se notează $t=g(x)$.",
      ],
    },
```

- [ ] **Step 2: Add 2 new worked examples**

Add two new examples to the end of the `examples` array (after the existing 3):

```ts
    {
      statement: "Calculați $\\int_0^1 xe^x\\,dx$ folosind integrarea prin părți.",
      steps: [
        "Alegem $u=x$, $v'=e^x$, deci $u'=1$, $v=e^x$.",
        "Aplicăm formula: $\\int xe^x\\,dx = xe^x - \\int e^x\\,dx = xe^x - e^x + C = (x-1)e^x+C$.",
        "Evaluăm între $0$ și $1$: la $x=1$, $(1-1)e^1=0$; la $x=0$, $(0-1)e^0=-1$.",
        "Rezultatul este $0-(-1)=1$.",
      ],
    },
    {
      statement: "Calculați $\\int_0^1 3x^2e^{x^3}\\,dx$ folosind schimbarea de variabilă.",
      steps: [
        "Notăm $t=x^3$, deci $dt=3x^2\\,dx$.",
        "Integrala devine $\\int e^t\\,dt = e^t+C = e^{x^3}+C$.",
        "Evaluăm între $0$ și $1$: la $x=1$, $e^1=e$; la $x=0$, $e^0=1$.",
        "Rezultatul este $e-1$.",
      ],
    },
```

- [ ] **Step 3: Run theory integrity test to verify it still passes**

Run: `npx vitest run src/data/theory/index.test.ts`
Expected: PASS (3/3).

- [ ] **Step 4: Add exercises `in-5`, `in-6`**

Edit `src/data/questions/integrale.ts`. Add two new exercises to the end of the `integraleExercises` array (after `in-4`):

```ts
  {
    id: "in-5",
    topic: "integrale",
    type: "input",
    points: 6,
    prompt: "Calculați $$\\int_0^1 xe^x\\,dx.$$",
    correctAnswer: "1",
    explanation: [
      "Aplicăm integrarea prin părți cu $u=x$, $v'=e^x$: $\\int xe^x\\,dx=(x-1)e^x+C$.",
      "Evaluăm: la $x=1$, $(1-1)e^1=0$; la $x=0$, $(0-1)e^0=-1$.",
      "Rezultatul este $0-(-1)=1$.",
    ],
  },
  {
    id: "in-6",
    topic: "integrale",
    type: "mcq",
    points: 6,
    prompt: "Calculați $$\\int_0^1 3x^2e^{x^3}\\,dx.$$",
    options: ["$e-1$", "$e$", "$e^3-1$", "$1$"],
    correctAnswer: "$e-1$",
    explanation: [
      "Notăm $t=x^3$, $dt=3x^2\\,dx$: integrala devine $\\int_0^1 e^t\\,dt$ (limitele rămân $0$ și $1$, deoarece $t=x^3$ variază tot de la $0$ la $1$).",
      "Calculăm $\\int_0^1 e^t\\,dt = e^1-e^0=e-1$.",
    ],
  },
```

- [ ] **Step 5: Run data integrity test to verify it passes**

Run: `npx vitest run src/data/index.test.ts`
Expected: PASS — `in-5`, `in-6` have unique ids, 6 points each, and `in-6`'s `correctAnswer` is present in `options`.

- [ ] **Step 6: Add 2 new formula entries to the existing `integrale` chapter**

Edit `src/data/formulaSheet.ts`. Find the `chapter("integrale", [ ... ])` call. Add two new formula entries to the end of its array (read the file first to find the exact closing `]` of the `integrale` chapter's array and insert before it):

```ts
    {
      label: "Integrarea prin părți",
      latex: "\\int u\\,v'\\,dx = uv - \\int u'v\\,dx",
      plain: "∫u·v' dx = u·v − ∫u'·v dx",
    },
    {
      label: "Integrarea prin schimbare de variabilă",
      latex: "\\int f(g(x))g'(x)\\,dx = F(g(x))+C",
      plain: "∫f(g(x))·g'(x) dx = F(g(x)) + C",
    },
```

Do NOT add a new `chapter(...)` call — this is an addition to the existing `integrale` chapter's array. Do NOT touch any other chapter or add a `legi-compozitie` chapter (structural definitions are not formulas, per the design spec).

- [ ] **Step 7: Run formula sheet test to verify it passes**

Run: `npx vitest run src/data/formulaSheet.test.ts`
Expected: PASS — `FORMULA_SHEET.map(c => c.topic)` still equals `TOPICS` exactly (unchanged), and both new entries' `latex` is valid KaTeX.

- [ ] **Step 8: Regenerate the downloadable formula sheet**

Run: `npm run generate:formulas`
Expected: exits 0. Then run `git status --short public/` and confirm both `public/formule-bacalaureat.pdf` and `public/formule-bacalaureat.docx` show as modified.

- [ ] **Step 9: Run the full test suite**

Run: `npm test`
Expected: all test files pass.

- [ ] **Step 10: Commit**

```bash
git add src/data/theory/integrale.ts src/data/questions/integrale.ts src/data/formulaSheet.ts public/formule-bacalaureat.pdf public/formule-bacalaureat.docx
git commit -m "Add integration techniques (by parts, substitution) to Integrale topic (theory, exercises, formula sheet)"
```

---

### Task 4: Integration techniques — practice set 11 (`integrale`)

**Files:**
- Modify: `src/data/questions/integraleSets.ts`

**Interfaces:**
- Consumes: existing `Exercise` shape. Independent of Task 3 — different file (Task 3 edits `integrale.ts`, `formulaSheet.ts`; this task only edits `integraleSets.ts`).
- Produces: nothing consumed elsewhere. `setNumbersForTopic("integrale")` will automatically include `11` once this task's exercises exist.

- [ ] **Step 1: Add Set 11 (10 exercises) to the end of the file**

Edit `src/data/questions/integraleSets.ts`. Add a comment header and 10 new exercise objects to the end of the `integraleSetExercises` array (after the existing `in-s10-10`, before the closing `];`):

```ts
  // Set 11 — Tehnici de integrare (prin părți și schimbare de variabilă)
  {
    id: "in-s11-1",
    topic: "integrale",
    set: 11,
    type: "input",
    points: 6,
    prompt: "Calculați $$\\int_0^1 2xe^x\\,dx.$$",
    correctAnswer: "2",
    explanation: [
      "Aplicăm integrarea prin părți cu $u=2x$, $v'=e^x$ (echivalent, scoatem factorul $2$): $\\int xe^x\\,dx=(x-1)e^x+C$.",
      "Evaluăm $2\\int_0^1 xe^x\\,dx = 2\\left[(x-1)e^x\\right]_0^1 = 2\\left(0-(-1)\\right)=2$.",
    ],
  },
  {
    id: "in-s11-2",
    topic: "integrale",
    set: 11,
    type: "mcq",
    points: 6,
    prompt: "Calculați $$\\int_0^{\\pi} x\\sin x\\,dx.$$",
    options: ["$\\pi$", "$2\\pi$", "$-\\pi$", "$0$"],
    correctAnswer: "$\\pi$",
    explanation: [
      "Aplicăm integrarea prin părți cu $u=x$, $v'=\\sin x$, deci $u'=1$, $v=-\\cos x$: $\\int x\\sin x\\,dx = -x\\cos x+\\sin x+C$.",
      "Evaluăm: la $x=\\pi$, $-\\pi\\cos\\pi+\\sin\\pi=-\\pi(-1)+0=\\pi$; la $x=0$, $-0\\cdot\\cos0+\\sin0=0$.",
      "Rezultatul este $\\pi-0=\\pi$.",
    ],
  },
  {
    id: "in-s11-3",
    topic: "integrale",
    set: 11,
    type: "input",
    points: 6,
    prompt: "Calculați $$\\int_1^e \\ln x\\,dx.$$",
    correctAnswer: "1",
    explanation: [
      "Aplicăm integrarea prin părți cu $u=\\ln x$, $v'=1$, deci $u'=\\dfrac{1}{x}$, $v=x$: $\\int\\ln x\\,dx = x\\ln x - x + C$.",
      "Evaluăm: la $x=e$, $e\\cdot1-e=0$; la $x=1$, $1\\cdot0-1=-1$.",
      "Rezultatul este $0-(-1)=1$.",
    ],
  },
  {
    id: "in-s11-4",
    topic: "integrale",
    set: 11,
    type: "input",
    points: 6,
    prompt: "Calculați $$\\int_0^1 6x^2(x^3+1)\\,dx.$$",
    correctAnswer: "3",
    explanation: [
      "Notăm $t=x^3+1$, $dt=3x^2\\,dx$, deci $6x^2\\,dx=2\\,dt$. Când $x=0$, $t=1$; când $x=1$, $t=2$.",
      "Integrala devine $\\int_1^2 2t\\,dt = \\left[t^2\\right]_1^2 = 4-1=3$.",
    ],
  },
  {
    id: "in-s11-5",
    topic: "integrale",
    set: 11,
    type: "input",
    points: 6,
    prompt: "Calculați $$\\int_0^{\\pi/2} \\sin x\\cos x\\,dx.$$",
    correctAnswer: "0.5",
    acceptedAnswers: ["0,5", "1/2"],
    explanation: [
      "Notăm $t=\\sin x$, $dt=\\cos x\\,dx$. Când $x=0$, $t=0$; când $x=\\pi/2$, $t=1$.",
      "Integrala devine $\\int_0^1 t\\,dt = \\left[\\dfrac{t^2}{2}\\right]_0^1 = \\dfrac{1}{2}$.",
    ],
  },
  {
    id: "in-s11-6",
    topic: "integrale",
    set: 11,
    type: "input",
    points: 6,
    prompt: "Calculați $$\\int_0^1 2(2x+1)^3\\,dx.$$",
    correctAnswer: "20",
    explanation: [
      "Notăm $t=2x+1$, $dt=2\\,dx$. Când $x=0$, $t=1$; când $x=1$, $t=3$.",
      "Integrala devine $\\int_1^3 t^3\\,dt = \\left[\\dfrac{t^4}{4}\\right]_1^3 = \\dfrac{81-1}{4}=\\dfrac{80}{4}=20$.",
    ],
  },
  {
    id: "in-s11-7",
    topic: "integrale",
    set: 11,
    type: "mcq",
    points: 6,
    prompt: "Calculați $$\\int_0^1 x^2e^x\\,dx.$$",
    options: ["$e-2$", "$e$", "$2e-2$", "$1$"],
    correctAnswer: "$e-2$",
    explanation: [
      "Aplicăm integrarea prin părți de două ori: $\\int x^2e^x\\,dx = x^2e^x-2\\int xe^x\\,dx = x^2e^x-2(x-1)e^x = e^x(x^2-2x+2)+C$.",
      "Evaluăm: la $x=1$, $e^1(1-2+2)=e$; la $x=0$, $e^0(0-0+2)=2$.",
      "Rezultatul este $e-2$.",
    ],
  },
  {
    id: "in-s11-8",
    topic: "integrale",
    set: 11,
    type: "mcq",
    points: 6,
    prompt: "Calculați $$\\int_0^{\\pi/2} x\\cos x\\,dx.$$",
    options: ["$\\dfrac{\\pi}{2}-1$", "$\\dfrac{\\pi}{2}$", "$\\dfrac{\\pi}{2}+1$", "$-1$"],
    correctAnswer: "$\\dfrac{\\pi}{2}-1$",
    explanation: [
      "Aplicăm integrarea prin părți cu $u=x$, $v'=\\cos x$, deci $u'=1$, $v=\\sin x$: $\\int x\\cos x\\,dx = x\\sin x+\\cos x+C$.",
      "Evaluăm: la $x=\\pi/2$, $\\dfrac{\\pi}{2}\\cdot1+0=\\dfrac{\\pi}{2}$; la $x=0$, $0+1=1$.",
      "Rezultatul este $\\dfrac{\\pi}{2}-1$.",
    ],
  },
  {
    id: "in-s11-9",
    topic: "integrale",
    set: 11,
    type: "input",
    points: 6,
    prompt: "Calculați $$\\int_0^3 \\dfrac{x}{\\sqrt{x^2+16}}\\,dx.$$",
    correctAnswer: "1",
    explanation: [
      "Notăm $t=x^2+16$, $dt=2x\\,dx$. Când $x=0$, $t=16$; când $x=3$, $t=25$.",
      "Integrala devine $\\int_{16}^{25} \\dfrac{1}{2\\sqrt{t}}\\,dt = \\left[\\sqrt{t}\\right]_{16}^{25} = 5-4=1$.",
    ],
  },
  {
    id: "in-s11-10",
    topic: "integrale",
    set: 11,
    type: "mcq",
    points: 6,
    prompt: "Pentru calculul integralei $\\int x\\ln x\\,dx$, metoda potrivită este:",
    options: [
      "integrarea prin părți, cu $u=\\ln x$",
      "schimbarea de variabilă $t=x^2$",
      "integrarea prin părți, cu $u=x$",
      "nu se poate calcula",
    ],
    correctAnswer: "integrarea prin părți, cu $u=\\ln x$",
    explanation: [
      "Alegem $u=\\ln x$ (a cărei derivată, $\\dfrac{1}{x}$, simplifică integrala) și $v'=x$.",
      "Alegerea $u=x$ ar face calculul mai greu, deoarece ar rămâne de integrat $\\ln x$ fără simplificare.",
    ],
  },
```

- [ ] **Step 2: Run data integrity test to verify it passes**

Run: `npx vitest run src/data/index.test.ts`
Expected: PASS — all 10 new ids unique, 6 points each, every mcq's `correctAnswer` present in `options`. For `in-s11-5`, the `acceptedAnswers` field does not affect this test (it only checks `correctAnswer` for mcq items).

- [ ] **Step 3: Manually verify Set 11 has exactly 10 exercises**

Run: `grep -c "set: 11" src/data/questions/integraleSets.ts` — expected output: `10`.

- [ ] **Step 4: Run the full test suite**

Run: `npm test`
Expected: all test files pass.

- [ ] **Step 5: Run typecheck and build**

Run: `npm run typecheck`
Expected: exits 0.

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 6: Commit**

```bash
git add src/data/questions/integraleSets.ts
git commit -m "Add practice Set 11 (Tehnici de integrare) to Integrale"
```
