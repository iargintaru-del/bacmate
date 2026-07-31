# Matematici financiare — Practice Sets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 10-set × 10-exercise (100 total) practice-set bank for the `matematici-financiare` topic, matching the established pattern used by every other topic's `*Sets.ts` file.

**Architecture:** A single new file `src/data/questions/matematiciFinanciareSets.ts` exports `matematiciFinanciareSetExercises: Exercise[]`, appended one set at a time (10 exercises per task). `src/data/index.ts` is wired once, in Task 1, to import and spread this array into `ALL_EXERCISES`.

**Tech Stack:** TypeScript, Vitest. No new dependencies.

## Global Constraints

- Exercise ids: `mf-s<setNumber>-<exerciseNumber>`, e.g. `mf-s1-1`..`mf-s10-10`.
- Every exercise: `topic: "matematici-financiare"`, `set: <N>`, `points: 6`.
- Inline `$...$` LaTeX only, never `$$...$$`. Every LaTeX command needs a **double backslash** in the TS string literal (e.g. `\\dfrac`, `\\left`, `\\%`).
- Romanian decimal comma in LaTeX source: `1{,}2`, not `1.2`.
- `acceptedAnswers` convention (matches `mf-1`..`mf-7`): every `input`-type exercise whose answer is a monetary amount sets `correctAnswer` to the bare number (e.g. `"180"`) and `acceptedAnswers: ["180 lei"]`. Exercises whose answer is a percentage set `correctAnswer` to the bare number and `acceptedAnswers: ["<n>%"]`. Exercises whose answer is a bare count (not money/percentage — none in this plan, but if ever added) omit `acceptedAnswers`.
- Every mcq's `correctAnswer` must appear character-for-character among its 4 `options`. All 4 options must be genuinely distinct claims/values — not just distinct-looking strings that are secretly mathematically equal.
- Within each 10-exercise set, all `input`-type numeric `correctAnswer` values must be pairwise distinct (already verified below).
- None of the 100 exercises duplicate the numeric parameters of base exercises `mf-1`..`mf-7` (already verified below).
- No cross-set exact-duplicate prompts across the full 100 (already verified below).
- `git diff --stat` after every task must show 0 deletions (pure append). Forbid external scripts for generating file content — edit the file directly.
- Mojibake-marker scan (`Ä`/`È`/`Ã` all must be false) before every commit.

---

## Base exercises reference (`src/data/questions/matematiciFinanciare.ts`, unmodified)

- `mf-1` (input): 150 lei +20% → 180
- `mf-2` (mcq): 400 lei −25% → 300
- `mf-3` (input): C=2000, p=5%, n=4 (simple interest) → D=400
- `mf-4` (mcq): C=1000, p=10%, n=2 (compound interest) → S=1210
- `mf-5` (input): net=200, p=19% (VAT) → 238
- `mf-6` (mcq): C=1000, D=200 → S=1200
- `mf-7` (input): 50 is what % of 200 → 25%

---

## Task 1: Wire up index.ts and create file with Set 1

**Files:**
- Modify: `src/data/index.ts`
- Create: `src/data/questions/matematiciFinanciareSets.ts`

**Interfaces:**
- Produces: `matematiciFinanciareSetExercises: Exercise[]` (10 exercises, `set: 1`), consumed by `src/data/index.ts` and by Tasks 2-10 (which append further sets to the same array in the same file).

- [ ] **Step 1: Locate the existing wiring in `src/data/index.ts`**

Find the existing lines (near the other `*Sets` imports/spreads):
```ts
import { matematiciFinanciareExercises } from "./questions/matematiciFinanciare";
```
and
```ts
  ...matematiciFinanciareExercises,
```

- [ ] **Step 2: Add the new import immediately after the existing `matematiciFinanciareExercises` import**

```ts
import { matematiciFinanciareSetExercises } from "./questions/matematiciFinanciareSets";
```

- [ ] **Step 3: Add the new spread immediately after the existing `...matematiciFinanciareExercises,` spread in `ALL_EXERCISES`**

```ts
  ...matematiciFinanciareSetExercises,
```

- [ ] **Step 4: Create `src/data/questions/matematiciFinanciareSets.ts` with this exact content**

```ts
import type { Exercise } from "../../types";

export const matematiciFinanciareSetExercises: Exercise[] = [
  // Set 1 — Procente — creșteri procentuale
  {
    id: "mf-s1-1",
    topic: "matematici-financiare",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Un produs costă $200$ lei și prețul se majorează cu $10\\%$. Determinați noul preț (în lei).",
    correctAnswer: "220",
    acceptedAnswers: ["220 lei"],
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1+\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=200\\cdot1{,}1$.",
      "Calculăm: $V=220$ lei.",
    ],
  },
  {
    id: "mf-s1-2",
    topic: "matematici-financiare",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Un produs costă $300$ lei și prețul se majorează cu $15\\%$. Determinați noul preț (în lei).",
    correctAnswer: "345",
    acceptedAnswers: ["345 lei"],
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1+\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=300\\cdot1{,}15$.",
      "Calculăm: $V=345$ lei.",
    ],
  },
  {
    id: "mf-s1-3",
    topic: "matematici-financiare",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Un produs costă $500$ lei și prețul se majorează cu $30\\%$. Determinați noul preț (în lei).",
    correctAnswer: "650",
    acceptedAnswers: ["650 lei"],
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1+\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=500\\cdot1{,}3$.",
      "Calculăm: $V=650$ lei.",
    ],
  },
  {
    id: "mf-s1-4",
    topic: "matematici-financiare",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Un produs costă $80$ lei și prețul se majorează cu $25\\%$. Determinați noul preț (în lei).",
    correctAnswer: "100",
    acceptedAnswers: ["100 lei"],
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1+\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=80\\cdot1{,}25$.",
      "Calculăm: $V=100$ lei.",
    ],
  },
  {
    id: "mf-s1-5",
    topic: "matematici-financiare",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Un preț de $250$ lei se majorează cu $20\\%$. Noul preț este:",
    options: ["$300$ lei", "$270$ lei", "$320$ lei", "$250$ lei"],
    correctAnswer: "$300$ lei",
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1+\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=250\\cdot1{,}2=300$ lei.",
    ],
  },
  {
    id: "mf-s1-6",
    topic: "matematici-financiare",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Un produs costă $600$ lei și prețul se majorează cu $5\\%$. Determinați noul preț (în lei).",
    correctAnswer: "630",
    acceptedAnswers: ["630 lei"],
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1+\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=600\\cdot1{,}05$.",
      "Calculăm: $V=630$ lei.",
    ],
  },
  {
    id: "mf-s1-7",
    topic: "matematici-financiare",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Un produs costă $1000$ lei și prețul se majorează cu $8\\%$. Determinați noul preț (în lei).",
    correctAnswer: "1080",
    acceptedAnswers: ["1080 lei"],
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1+\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=1000\\cdot1{,}08$.",
      "Calculăm: $V=1080$ lei.",
    ],
  },
  {
    id: "mf-s1-8",
    topic: "matematici-financiare",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Dacă un preț $V_0$ se majorează cu $p\\%$, prețul nou $V$ se calculează astfel:",
    options: [
      "$V=V_0\\left(1+\\dfrac{p}{100}\\right)$",
      "$V=V_0\\cdot\\dfrac{p}{100}$",
      "$V=V_0\\left(1-\\dfrac{p}{100}\\right)$",
      "$V=V_0+p$",
    ],
    correctAnswer: "$V=V_0\\left(1+\\dfrac{p}{100}\\right)$",
    explanation: [
      "Formula creșterii procentuale este $V=V_0\\left(1+\\dfrac{p}{100}\\right)$, unde $p$ este procentul de creștere.",
    ],
  },
  {
    id: "mf-s1-9",
    topic: "matematici-financiare",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Un produs costă $240$ lei și prețul se majorează cu $15\\%$. Determinați noul preț (în lei).",
    correctAnswer: "276",
    acceptedAnswers: ["276 lei"],
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1+\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=240\\cdot1{,}15$.",
      "Calculăm: $V=276$ lei.",
    ],
  },
  {
    id: "mf-s1-10",
    topic: "matematici-financiare",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Un produs costă $90$ lei și prețul se majorează cu $40\\%$. Determinați noul preț (în lei).",
    correctAnswer: "126",
    acceptedAnswers: ["126 lei"],
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1+\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=90\\cdot1{,}4$.",
      "Calculăm: $V=126$ lei.",
    ],
  },
];
```

- [ ] **Step 5: Verify with an encoding-safety sweep before committing**

Run (from the worktree root):
```bash
git diff --stat
```
Expected: only `src/data/index.ts` (2 insertions) and `src/data/questions/matematiciFinanciareSets.ts` (new file) — 0 deletions.

Run a mojibake-marker check:
```bash
node -e "const c=require('fs').readFileSync('src/data/questions/matematiciFinanciareSets.ts','utf8'); console.log('Ä:',c.includes('Ä'),'È:',c.includes('È'),'Ã:',c.includes('Ã'));"
```
Expected: all `false`.

- [ ] **Step 6: Run tests**

```bash
npm test
```
Expected: all tests pass (7 files, 40 tests, plus the new exercises satisfy `question bank integrity` checks — 6 points each, mcq correctAnswer present in options, non-empty explanation arrays).

- [ ] **Step 7: Commit**

```bash
git add src/data/index.ts src/data/questions/matematiciFinanciareSets.ts
git commit -m "Add matematici-financiare practice Set 1 (Procente — creșteri)"
```

---

## Task 2: Append Set 2 (Procente — scăderi procentuale)

**Files:**
- Modify: `src/data/questions/matematiciFinanciareSets.ts` (append 10 exercises before the closing `];`)

**Interfaces:**
- Consumes: the array literal produced in Task 1 — append new elements before the final `];`.

- [ ] **Step 1: Append these 10 exercises to the `matematiciFinanciareSetExercises` array**

```ts
  // Set 2 — Procente — scăderi procentuale
  {
    id: "mf-s2-1",
    topic: "matematici-financiare",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Un produs costă $500$ lei și prețul se reduce cu $10\\%$. Determinați noul preț (în lei).",
    correctAnswer: "450",
    acceptedAnswers: ["450 lei"],
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1-\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=500\\cdot0{,}9$.",
      "Calculăm: $V=450$ lei.",
    ],
  },
  {
    id: "mf-s2-2",
    topic: "matematici-financiare",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Un produs costă $200$ lei și prețul se reduce cu $15\\%$. Determinați noul preț (în lei).",
    correctAnswer: "170",
    acceptedAnswers: ["170 lei"],
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1-\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=200\\cdot0{,}85$.",
      "Calculăm: $V=170$ lei.",
    ],
  },
  {
    id: "mf-s2-3",
    topic: "matematici-financiare",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Un produs costă $800$ lei și prețul se reduce cu $30\\%$. Determinați noul preț (în lei).",
    correctAnswer: "560",
    acceptedAnswers: ["560 lei"],
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1-\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=800\\cdot0{,}7$.",
      "Calculăm: $V=560$ lei.",
    ],
  },
  {
    id: "mf-s2-4",
    topic: "matematici-financiare",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Un produs costă $120$ lei și prețul se reduce cu $25\\%$. Determinați noul preț (în lei).",
    correctAnswer: "90",
    acceptedAnswers: ["90 lei"],
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1-\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=120\\cdot0{,}75$.",
      "Calculăm: $V=90$ lei.",
    ],
  },
  {
    id: "mf-s2-5",
    topic: "matematici-financiare",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Un preț de $600$ lei se reduce cu $20\\%$. Noul preț este:",
    options: ["$480$ lei", "$450$ lei", "$500$ lei", "$520$ lei"],
    correctAnswer: "$480$ lei",
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1-\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=600\\cdot0{,}8=480$ lei.",
    ],
  },
  {
    id: "mf-s2-6",
    topic: "matematici-financiare",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Un produs costă $1000$ lei și prețul se reduce cu $12\\%$. Determinați noul preț (în lei).",
    correctAnswer: "880",
    acceptedAnswers: ["880 lei"],
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1-\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=1000\\cdot0{,}88$.",
      "Calculăm: $V=880$ lei.",
    ],
  },
  {
    id: "mf-s2-7",
    topic: "matematici-financiare",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Un produs costă $250$ lei și prețul se reduce cu $40\\%$. Determinați noul preț (în lei).",
    correctAnswer: "150",
    acceptedAnswers: ["150 lei"],
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1-\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=250\\cdot0{,}6$.",
      "Calculăm: $V=150$ lei.",
    ],
  },
  {
    id: "mf-s2-8",
    topic: "matematici-financiare",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Dacă un preț $V_0$ se reduce cu $p\\%$, prețul nou $V$ se calculează astfel:",
    options: [
      "$V=V_0\\left(1-\\dfrac{p}{100}\\right)$",
      "$V=V_0\\cdot\\dfrac{p}{100}$",
      "$V=V_0\\left(1+\\dfrac{p}{100}\\right)$",
      "$V=V_0-p$",
    ],
    correctAnswer: "$V=V_0\\left(1-\\dfrac{p}{100}\\right)$",
    explanation: [
      "Formula scăderii procentuale este $V=V_0\\left(1-\\dfrac{p}{100}\\right)$, unde $p$ este procentul de scădere.",
    ],
  },
  {
    id: "mf-s2-9",
    topic: "matematici-financiare",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Un produs costă $90$ lei și prețul se reduce cu $10\\%$. Determinați noul preț (în lei).",
    correctAnswer: "81",
    acceptedAnswers: ["81 lei"],
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1-\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=90\\cdot0{,}9$.",
      "Calculăm: $V=81$ lei.",
    ],
  },
  {
    id: "mf-s2-10",
    topic: "matematici-financiare",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Un produs costă $350$ lei și prețul se reduce cu $20\\%$. Determinați noul preț (în lei).",
    correctAnswer: "280",
    acceptedAnswers: ["280 lei"],
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1-\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=350\\cdot0{,}8$.",
      "Calculăm: $V=280$ lei.",
    ],
  },
```

- [ ] **Step 2: Verify `git diff --stat` shows 0 deletions, run the mojibake check (as in Task 1 Step 5), run `npm test`, then commit**

```bash
git add src/data/questions/matematiciFinanciareSets.ts
git commit -m "Add matematici-financiare practice Set 2 (Procente — scăderi)"
```

---

## Task 3: Append Set 3 (Procente — probleme inverse)

**Files:**
- Modify: `src/data/questions/matematiciFinanciareSets.ts` (append 10 exercises before the closing `];`)

- [ ] **Step 1: Append these 10 exercises**

```ts
  // Set 3 — Procente — determinarea procentului sau a valorii inițiale
  {
    id: "mf-s3-1",
    topic: "matematici-financiare",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Determinați câte procente reprezintă $30$ din $150$.",
    correctAnswer: "20",
    acceptedAnswers: ["20%"],
    explanation: [
      "Calculăm raportul $\\dfrac{30}{150}$ și îl exprimăm în procente.",
      "$\\dfrac{30}{150}=0{,}2=20\\%$.",
      "Rezultă $20\\%$.",
    ],
  },
  {
    id: "mf-s3-2",
    topic: "matematici-financiare",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Determinați câte procente reprezintă $90$ din $300$.",
    correctAnswer: "30",
    acceptedAnswers: ["30%"],
    explanation: [
      "Calculăm raportul $\\dfrac{90}{300}$ și îl exprimăm în procente.",
      "$\\dfrac{90}{300}=0{,}3=30\\%$.",
      "Rezultă $30\\%$.",
    ],
  },
  {
    id: "mf-s3-3",
    topic: "matematici-financiare",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Un preț a crescut cu $15\\%$ și a ajuns la $299$ lei. Determinați prețul inițial (în lei).",
    correctAnswer: "260",
    acceptedAnswers: ["260 lei"],
    explanation: [
      "Din formula $V=V_0\\left(1+\\dfrac{p}{100}\\right)$ obținem $V_0=\\dfrac{V}{1+\\frac{p}{100}}$.",
      "Înlocuim: $V_0=\\dfrac{299}{1{,}15}$.",
      "Calculăm: $V_0=260$ lei.",
    ],
  },
  {
    id: "mf-s3-4",
    topic: "matematici-financiare",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Un preț a scăzut cu $20\\%$ și a ajuns la $400$ lei. Determinați prețul inițial (în lei).",
    correctAnswer: "500",
    acceptedAnswers: ["500 lei"],
    explanation: [
      "Din formula $V=V_0\\left(1-\\dfrac{p}{100}\\right)$ obținem $V_0=\\dfrac{V}{1-\\frac{p}{100}}$.",
      "Înlocuim: $V_0=\\dfrac{400}{0{,}8}$.",
      "Calculăm: $V_0=500$ lei.",
    ],
  },
  {
    id: "mf-s3-5",
    topic: "matematici-financiare",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Câte procente reprezintă $45$ din $180$?",
    options: ["$25\\%$", "$20\\%$", "$30\\%$", "$45\\%$"],
    correctAnswer: "$25\\%$",
    explanation: [
      "Calculăm raportul $\\dfrac{45}{180}=0{,}25=25\\%$.",
    ],
  },
  {
    id: "mf-s3-6",
    topic: "matematici-financiare",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Un preț a crescut cu $25\\%$ și a ajuns la $500$ lei. Determinați prețul inițial (în lei).",
    correctAnswer: "400",
    acceptedAnswers: ["400 lei"],
    explanation: [
      "Din formula $V=V_0\\left(1+\\dfrac{p}{100}\\right)$ obținem $V_0=\\dfrac{V}{1+\\frac{p}{100}}$.",
      "Înlocuim: $V_0=\\dfrac{500}{1{,}25}$.",
      "Calculăm: $V_0=400$ lei.",
    ],
  },
  {
    id: "mf-s3-7",
    topic: "matematici-financiare",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Determinați câte procente reprezintă $12$ din $48$.",
    correctAnswer: "25",
    acceptedAnswers: ["25%"],
    explanation: [
      "Calculăm raportul $\\dfrac{12}{48}$ și îl exprimăm în procente.",
      "$\\dfrac{12}{48}=0{,}25=25\\%$.",
      "Rezultă $25\\%$.",
    ],
  },
  {
    id: "mf-s3-8",
    topic: "matematici-financiare",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Dacă $x$ reprezintă $p\\%$ din $V$, atunci $p$ se calculează astfel:",
    options: [
      "$p=\\dfrac{x}{V}\\cdot100$",
      "$p=\\dfrac{V}{x}\\cdot100$",
      "$p=x\\cdot V$",
      "$p=\\dfrac{x}{100}\\cdot V$",
    ],
    correctAnswer: "$p=\\dfrac{x}{V}\\cdot100$",
    explanation: [
      "Procentul reprezentat de $x$ din $V$ se calculează prin formula $p=\\dfrac{x}{V}\\cdot100$.",
    ],
  },
  {
    id: "mf-s3-9",
    topic: "matematici-financiare",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Un preț a crescut cu $10\\%$ și a ajuns la $330$ lei. Determinați prețul inițial (în lei).",
    correctAnswer: "300",
    acceptedAnswers: ["300 lei"],
    explanation: [
      "Din formula $V=V_0\\left(1+\\dfrac{p}{100}\\right)$ obținem $V_0=\\dfrac{V}{1+\\frac{p}{100}}$.",
      "Înlocuim: $V_0=\\dfrac{330}{1{,}1}$.",
      "Calculăm: $V_0=300$ lei.",
    ],
  },
  {
    id: "mf-s3-10",
    topic: "matematici-financiare",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Câte procente reprezintă $18$ din $90$?",
    options: ["$20\\%$", "$18\\%$", "$15\\%$", "$25\\%$"],
    correctAnswer: "$20\\%$",
    explanation: [
      "Calculăm raportul $\\dfrac{18}{90}=0{,}2=20\\%$.",
    ],
  },
```

- [ ] **Step 2: Verify `git diff --stat` shows 0 deletions, run the mojibake check, run `npm test`, then commit**

```bash
git add src/data/questions/matematiciFinanciareSets.ts
git commit -m "Add matematici-financiare practice Set 3 (Procente — probleme inverse)"
```

---

## Task 4: Append Set 4 (Dobânda simplă — calculul dobânzii)

**Files:**
- Modify: `src/data/questions/matematiciFinanciareSets.ts` (append 10 exercises before the closing `];`)

- [ ] **Step 1: Append these 10 exercises**

```ts
  // Set 4 — Dobânda simplă — calculul dobânzii
  {
    id: "mf-s4-1",
    topic: "matematici-financiare",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Calculați dobânda simplă pentru un capital de $1000$ lei, cu rata anuală $6\\%$, pe o perioadă de $3$ ani (în lei).",
    correctAnswer: "180",
    acceptedAnswers: ["180 lei"],
    explanation: [
      "Aplicăm formula: $D=\\dfrac{C\\cdot p\\cdot n}{100}$.",
      "Înlocuim: $D=\\dfrac{1000\\cdot6\\cdot3}{100}$.",
      "Calculăm: $D=180$ lei.",
    ],
  },
  {
    id: "mf-s4-2",
    topic: "matematici-financiare",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Calculați dobânda simplă pentru un capital de $1500$ lei, cu rata anuală $4\\%$, pe o perioadă de $2$ ani (în lei).",
    correctAnswer: "120",
    acceptedAnswers: ["120 lei"],
    explanation: [
      "Aplicăm formula: $D=\\dfrac{C\\cdot p\\cdot n}{100}$.",
      "Înlocuim: $D=\\dfrac{1500\\cdot4\\cdot2}{100}$.",
      "Calculăm: $D=120$ lei.",
    ],
  },
  {
    id: "mf-s4-3",
    topic: "matematici-financiare",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Calculați dobânda simplă pentru un capital de $3000$ lei, cu rata anuală $3\\%$, pe o perioadă de $5$ ani (în lei).",
    correctAnswer: "450",
    acceptedAnswers: ["450 lei"],
    explanation: [
      "Aplicăm formula: $D=\\dfrac{C\\cdot p\\cdot n}{100}$.",
      "Înlocuim: $D=\\dfrac{3000\\cdot3\\cdot5}{100}$.",
      "Calculăm: $D=450$ lei.",
    ],
  },
  {
    id: "mf-s4-4",
    topic: "matematici-financiare",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Calculați dobânda simplă pentru un capital de $800$ lei, cu rata anuală $10\\%$, pe o perioadă de $2$ ani (în lei).",
    correctAnswer: "160",
    acceptedAnswers: ["160 lei"],
    explanation: [
      "Aplicăm formula: $D=\\dfrac{C\\cdot p\\cdot n}{100}$.",
      "Înlocuim: $D=\\dfrac{800\\cdot10\\cdot2}{100}$.",
      "Calculăm: $D=160$ lei.",
    ],
  },
  {
    id: "mf-s4-5",
    topic: "matematici-financiare",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Un capital de $2000$ lei este depus cu dobândă simplă de $6\\%$ pe an, timp de $3$ ani. Dobânda obținută este:",
    options: ["$360$ lei", "$320$ lei", "$400$ lei", "$300$ lei"],
    correctAnswer: "$360$ lei",
    explanation: [
      "Aplicăm formula: $D=\\dfrac{C\\cdot p\\cdot n}{100}=\\dfrac{2000\\cdot6\\cdot3}{100}=360$ lei.",
    ],
  },
  {
    id: "mf-s4-6",
    topic: "matematici-financiare",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Calculați dobânda simplă pentru un capital de $1200$ lei, cu rata anuală $5\\%$, pe o perioadă de $4$ ani (în lei).",
    correctAnswer: "240",
    acceptedAnswers: ["240 lei"],
    explanation: [
      "Aplicăm formula: $D=\\dfrac{C\\cdot p\\cdot n}{100}$.",
      "Înlocuim: $D=\\dfrac{1200\\cdot5\\cdot4}{100}$.",
      "Calculăm: $D=240$ lei.",
    ],
  },
  {
    id: "mf-s4-7",
    topic: "matematici-financiare",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Calculați dobânda simplă pentru un capital de $500$ lei, cu rata anuală $8\\%$, pe o perioadă de $5$ ani (în lei).",
    correctAnswer: "200",
    acceptedAnswers: ["200 lei"],
    explanation: [
      "Aplicăm formula: $D=\\dfrac{C\\cdot p\\cdot n}{100}$.",
      "Înlocuim: $D=\\dfrac{500\\cdot8\\cdot5}{100}$.",
      "Calculăm: $D=200$ lei.",
    ],
  },
  {
    id: "mf-s4-8",
    topic: "matematici-financiare",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Formula dobânzii simple pentru un capital $C$, rata anuală $p\\%$ și perioada $n$ ani este:",
    options: [
      "$D=\\dfrac{C\\cdot p\\cdot n}{100}$",
      "$D=\\dfrac{C\\cdot p}{100}$",
      "$D=C+p\\cdot n$",
      "$D=\\dfrac{C\\cdot n}{p}$",
    ],
    correctAnswer: "$D=\\dfrac{C\\cdot p\\cdot n}{100}$",
    explanation: [
      "Formula dobânzii simple este $D=\\dfrac{C\\cdot p\\cdot n}{100}$.",
    ],
  },
  {
    id: "mf-s4-9",
    topic: "matematici-financiare",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Calculați dobânda simplă pentru un capital de $2500$ lei, cu rata anuală $4\\%$, pe o perioadă de $3$ ani (în lei).",
    correctAnswer: "300",
    acceptedAnswers: ["300 lei"],
    explanation: [
      "Aplicăm formula: $D=\\dfrac{C\\cdot p\\cdot n}{100}$.",
      "Înlocuim: $D=\\dfrac{2500\\cdot4\\cdot3}{100}$.",
      "Calculăm: $D=300$ lei.",
    ],
  },
  {
    id: "mf-s4-10",
    topic: "matematici-financiare",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Calculați dobânda simplă pentru un capital de $700$ lei, cu rata anuală $10\\%$, pe o perioadă de $3$ ani (în lei).",
    correctAnswer: "210",
    acceptedAnswers: ["210 lei"],
    explanation: [
      "Aplicăm formula: $D=\\dfrac{C\\cdot p\\cdot n}{100}$.",
      "Înlocuim: $D=\\dfrac{700\\cdot10\\cdot3}{100}$.",
      "Calculăm: $D=210$ lei.",
    ],
  },
```

- [ ] **Step 2: Verify `git diff --stat` shows 0 deletions, run the mojibake check, run `npm test`, then commit**

```bash
git add src/data/questions/matematiciFinanciareSets.ts
git commit -m "Add matematici-financiare practice Set 4 (Dobânda simplă — calculul dobânzii)"
```

---

## Task 5: Append Set 5 (Dobânda simplă — suma finală / alți parametri)

**Files:**
- Modify: `src/data/questions/matematiciFinanciareSets.ts` (append 10 exercises before the closing `];`)

- [ ] **Step 1: Append these 10 exercises**

```ts
  // Set 5 — Dobânda simplă — calculul sumei finale / determinarea altor parametri
  {
    id: "mf-s5-1",
    topic: "matematici-financiare",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Un capital de $1000$ lei este depus cu dobândă simplă de $8\\%$ pe an, timp de $2$ ani. Determinați suma finală (în lei).",
    correctAnswer: "1160",
    acceptedAnswers: ["1160 lei"],
    explanation: [
      "Aplicăm formula: $S=C\\left(1+\\dfrac{p\\cdot n}{100}\\right)$.",
      "Înlocuim: $S=1000\\left(1+\\dfrac{8\\cdot2}{100}\\right)=1000\\cdot1{,}16$.",
      "Calculăm: $S=1160$ lei.",
    ],
  },
  {
    id: "mf-s5-2",
    topic: "matematici-financiare",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Un capital de $1500$ lei este depus cu dobândă simplă de $6\\%$ pe an, timp de $3$ ani. Determinați suma finală (în lei).",
    correctAnswer: "1770",
    acceptedAnswers: ["1770 lei"],
    explanation: [
      "Aplicăm formula: $S=C\\left(1+\\dfrac{p\\cdot n}{100}\\right)$.",
      "Înlocuim: $S=1500\\left(1+\\dfrac{6\\cdot3}{100}\\right)=1500\\cdot1{,}18$.",
      "Calculăm: $S=1770$ lei.",
    ],
  },
  {
    id: "mf-s5-3",
    topic: "matematici-financiare",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Suma finală obținută printr-o dobândă simplă de $300$ lei aplicată unui capital de $2000$ lei este (în lei):",
    correctAnswer: "2300",
    acceptedAnswers: ["2300 lei"],
    explanation: [
      "Suma finală este capitalul plus dobânda: $S=C+D$.",
      "Înlocuim: $S=2000+300=2300$ lei.",
    ],
  },
  {
    id: "mf-s5-4",
    topic: "matematici-financiare",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Un capital de $800$ lei este depus cu dobândă simplă de $5\\%$ pe an, timp de $4$ ani. Suma finală este:",
    options: ["$960$ lei", "$940$ lei", "$900$ lei", "$1000$ lei"],
    correctAnswer: "$960$ lei",
    explanation: [
      "Calculăm dobânda: $D=\\dfrac{800\\cdot5\\cdot4}{100}=160$ lei.",
      "Suma finală: $S=C+D=800+160=960$ lei.",
    ],
  },
  {
    id: "mf-s5-5",
    topic: "matematici-financiare",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Suma finală obținută printr-o dobândă simplă de $450$ lei aplicată unui capital de $3000$ lei este (în lei):",
    correctAnswer: "3450",
    acceptedAnswers: ["3450 lei"],
    explanation: [
      "Suma finală este capitalul plus dobânda: $S=C+D$.",
      "Înlocuim: $S=3000+450=3450$ lei.",
    ],
  },
  {
    id: "mf-s5-6",
    topic: "matematici-financiare",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Determinați rata anuală a dobânzii $p$ dacă un capital de $1000$ lei produce o dobândă simplă de $150$ lei în $3$ ani (în procente).",
    correctAnswer: "5",
    acceptedAnswers: ["5%"],
    explanation: [
      "Din formula $D=\\dfrac{C\\cdot p\\cdot n}{100}$ obținem $p=\\dfrac{D\\cdot100}{C\\cdot n}$.",
      "Înlocuim: $p=\\dfrac{150\\cdot100}{1000\\cdot3}$.",
      "Calculăm: $p=5$.",
    ],
  },
  {
    id: "mf-s5-7",
    topic: "matematici-financiare",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Determinați numărul de ani $n$ dacă un capital de $2000$ lei, cu rata anuală $4\\%$, produce o dobândă simplă de $240$ lei.",
    correctAnswer: "3",
    explanation: [
      "Din formula $D=\\dfrac{C\\cdot p\\cdot n}{100}$ obținem $n=\\dfrac{D\\cdot100}{C\\cdot p}$.",
      "Înlocuim: $n=\\dfrac{240\\cdot100}{2000\\cdot4}$.",
      "Calculăm: $n=3$.",
    ],
  },
  {
    id: "mf-s5-8",
    topic: "matematici-financiare",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Formula sumei finale obținute prin dobândă simplă, pentru capitalul $C$, rata anuală $p\\%$ și perioada $n$ ani, este:",
    options: [
      "$S=C\\left(1+\\dfrac{p\\cdot n}{100}\\right)$",
      "$S=C\\cdot D$",
      "$S=C\\left(1+\\dfrac{p}{100}\\right)^n$",
      "$S=C-D$",
    ],
    correctAnswer: "$S=C\\left(1+\\dfrac{p\\cdot n}{100}\\right)$",
    explanation: [
      "Suma finală obținută prin dobândă simplă este $S=C+D=C\\left(1+\\dfrac{p\\cdot n}{100}\\right)$.",
    ],
  },
  {
    id: "mf-s5-9",
    topic: "matematici-financiare",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Un capital de $1200$ lei este depus cu dobândă simplă de $7\\%$ pe an, timp de $2$ ani. Determinați suma finală (în lei).",
    correctAnswer: "1368",
    acceptedAnswers: ["1368 lei"],
    explanation: [
      "Aplicăm formula: $S=C\\left(1+\\dfrac{p\\cdot n}{100}\\right)$.",
      "Înlocuim: $S=1200\\left(1+\\dfrac{7\\cdot2}{100}\\right)=1200\\cdot1{,}14$.",
      "Calculăm: $S=1368$ lei.",
    ],
  },
  {
    id: "mf-s5-10",
    topic: "matematici-financiare",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Determinați capitalul inițial $C$ dacă, cu rata anuală $6\\%$, pe o perioadă de $5$ ani, dobânda simplă obținută este $300$ lei (în lei).",
    correctAnswer: "1000",
    acceptedAnswers: ["1000 lei"],
    explanation: [
      "Din formula $D=\\dfrac{C\\cdot p\\cdot n}{100}$ obținem $C=\\dfrac{D\\cdot100}{p\\cdot n}$.",
      "Înlocuim: $C=\\dfrac{300\\cdot100}{6\\cdot5}$.",
      "Calculăm: $C=1000$ lei.",
    ],
  },
```

- [ ] **Step 2: Verify `git diff --stat` shows 0 deletions, run the mojibake check, run `npm test`, then commit**

```bash
git add src/data/questions/matematiciFinanciareSets.ts
git commit -m "Add matematici-financiare practice Set 5 (Dobânda simplă — suma finală)"
```

---

## Task 6: Append Set 6 (Dobânda compusă — calculul sumei finale)

**Files:**
- Modify: `src/data/questions/matematiciFinanciareSets.ts` (append 10 exercises before the closing `];`)

- [ ] **Step 1: Append these 10 exercises**

```ts
  // Set 6 — Dobânda compusă — calculul sumei finale
  {
    id: "mf-s6-1",
    topic: "matematici-financiare",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Un capital de $1000$ lei este depus cu dobândă compusă de $20\\%$ pe an, timp de $2$ ani. Determinați suma finală (în lei).",
    correctAnswer: "1440",
    acceptedAnswers: ["1440 lei"],
    explanation: [
      "Aplicăm formula dobânzii compuse: $S=C\\left(1+\\dfrac{p}{100}\\right)^n$.",
      "Înlocuim: $S=1000\\cdot1{,}2^2=1000\\cdot1{,}44$.",
      "Calculăm: $S=1440$ lei.",
    ],
  },
  {
    id: "mf-s6-2",
    topic: "matematici-financiare",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Un capital de $2000$ lei este depus cu dobândă compusă de $10\\%$ pe an, timp de $2$ ani. Determinați suma finală (în lei).",
    correctAnswer: "2420",
    acceptedAnswers: ["2420 lei"],
    explanation: [
      "Aplicăm formula dobânzii compuse: $S=C\\left(1+\\dfrac{p}{100}\\right)^n$.",
      "Înlocuim: $S=2000\\cdot1{,}1^2=2000\\cdot1{,}21$.",
      "Calculăm: $S=2420$ lei.",
    ],
  },
  {
    id: "mf-s6-3",
    topic: "matematici-financiare",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Un capital de $500$ lei este depus cu dobândă compusă de $20\\%$ pe an, timp de $3$ ani. Determinați suma finală (în lei).",
    correctAnswer: "864",
    acceptedAnswers: ["864 lei"],
    explanation: [
      "Aplicăm formula dobânzii compuse: $S=C\\left(1+\\dfrac{p}{100}\\right)^n$.",
      "Înlocuim: $S=500\\cdot1{,}2^3=500\\cdot1{,}728$.",
      "Calculăm: $S=864$ lei.",
    ],
  },
  {
    id: "mf-s6-4",
    topic: "matematici-financiare",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Un capital de $400$ lei este depus cu dobândă compusă de $25\\%$ pe an, timp de $2$ ani. Suma finală este:",
    options: ["$625$ lei", "$600$ lei", "$650$ lei", "$500$ lei"],
    correctAnswer: "$625$ lei",
    explanation: [
      "Aplicăm formula: $S=C\\left(1+\\dfrac{p}{100}\\right)^n=400\\cdot1{,}25^2=400\\cdot1{,}5625=625$ lei.",
    ],
  },
  {
    id: "mf-s6-5",
    topic: "matematici-financiare",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Un capital de $100$ lei este depus cu dobândă compusă de $100\\%$ pe an, timp de $2$ ani. Determinați suma finală (în lei).",
    correctAnswer: "400",
    acceptedAnswers: ["400 lei"],
    explanation: [
      "Aplicăm formula dobânzii compuse: $S=C\\left(1+\\dfrac{p}{100}\\right)^n$.",
      "Înlocuim: $S=100\\cdot2^2$.",
      "Calculăm: $S=400$ lei.",
    ],
  },
  {
    id: "mf-s6-6",
    topic: "matematici-financiare",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Un capital de $2000$ lei este depus cu dobândă compusă de $5\\%$ pe an, timp de $2$ ani. Determinați suma finală (în lei).",
    correctAnswer: "2205",
    acceptedAnswers: ["2205 lei"],
    explanation: [
      "Aplicăm formula dobânzii compuse: $S=C\\left(1+\\dfrac{p}{100}\\right)^n$.",
      "Înlocuim: $S=2000\\cdot1{,}05^2=2000\\cdot1{,}1025$.",
      "Calculăm: $S=2205$ lei.",
    ],
  },
  {
    id: "mf-s6-7",
    topic: "matematici-financiare",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Un capital de $1000$ lei este depus cu dobândă compusă de $10\\%$ pe an, timp de $3$ ani. Determinați suma finală (în lei).",
    correctAnswer: "1331",
    acceptedAnswers: ["1331 lei"],
    explanation: [
      "Aplicăm formula dobânzii compuse: $S=C\\left(1+\\dfrac{p}{100}\\right)^n$.",
      "Înlocuim: $S=1000\\cdot1{,}1^3=1000\\cdot1{,}331$.",
      "Calculăm: $S=1331$ lei.",
    ],
  },
  {
    id: "mf-s6-8",
    topic: "matematici-financiare",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Formula sumei finale obținute prin dobândă compusă, pentru capitalul $C$, rata anuală $p\\%$ și perioada $n$ ani, este:",
    options: [
      "$S=C\\left(1+\\dfrac{p}{100}\\right)^n$",
      "$S=C\\left(1+\\dfrac{p\\cdot n}{100}\\right)$",
      "$S=C\\cdot n^p$",
      "$S=C+p\\cdot n$",
    ],
    correctAnswer: "$S=C\\left(1+\\dfrac{p}{100}\\right)^n$",
    explanation: [
      "Suma finală obținută prin dobândă compusă este $S=C\\left(1+\\dfrac{p}{100}\\right)^n$.",
    ],
  },
  {
    id: "mf-s6-9",
    topic: "matematici-financiare",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Un capital de $800$ lei este depus cu dobândă compusă de $25\\%$ pe an, timp de $2$ ani. Determinați suma finală (în lei).",
    correctAnswer: "1250",
    acceptedAnswers: ["1250 lei"],
    explanation: [
      "Aplicăm formula dobânzii compuse: $S=C\\left(1+\\dfrac{p}{100}\\right)^n$.",
      "Înlocuim: $S=800\\cdot1{,}25^2=800\\cdot1{,}5625$.",
      "Calculăm: $S=1250$ lei.",
    ],
  },
  {
    id: "mf-s6-10",
    topic: "matematici-financiare",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Un capital de $600$ lei este depus cu dobândă compusă de $10\\%$ pe an, timp de $2$ ani. Determinați suma finală (în lei).",
    correctAnswer: "726",
    acceptedAnswers: ["726 lei"],
    explanation: [
      "Aplicăm formula dobânzii compuse: $S=C\\left(1+\\dfrac{p}{100}\\right)^n$.",
      "Înlocuim: $S=600\\cdot1{,}1^2=600\\cdot1{,}21$.",
      "Calculăm: $S=726$ lei.",
    ],
  },
```

- [ ] **Step 2: Verify `git diff --stat` shows 0 deletions, run the mojibake check, run `npm test`, then commit**

```bash
git add src/data/questions/matematiciFinanciareSets.ts
git commit -m "Add matematici-financiare practice Set 6 (Dobânda compusă — suma finală)"
```

---

## Task 7: Append Set 7 (Dobânda compusă — comparații)

**Files:**
- Modify: `src/data/questions/matematiciFinanciareSets.ts` (append 10 exercises before the closing `];`)

- [ ] **Step 1: Append these 10 exercises**

```ts
  // Set 7 — Dobânda compusă — comparații dobândă simplă vs compusă
  {
    id: "mf-s7-1",
    topic: "matematici-financiare",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Pentru un capital de $1000$ lei, cu rata anuală $10\\%$, pe o perioadă de $2$ ani, calculați diferența dintre suma finală obținută prin dobândă compusă și suma finală obținută prin dobândă simplă (în lei).",
    correctAnswer: "10",
    acceptedAnswers: ["10 lei"],
    explanation: [
      "Dobânda simplă: $S_s=C\\left(1+\\dfrac{p\\cdot n}{100}\\right)=1000\\cdot1{,}2=1200$ lei.",
      "Dobânda compusă: $S_c=C\\left(1+\\dfrac{p}{100}\\right)^n=1000\\cdot1{,}1^2=1210$ lei.",
      "Diferența: $S_c-S_s=1210-1200=10$ lei.",
    ],
  },
  {
    id: "mf-s7-2",
    topic: "matematici-financiare",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Pentru $n=1$ an, la același capital și aceeași rată anuală, dobânda simplă și dobânda compusă sunt:",
    options: ["egale", "dobânda compusă este mai mare", "dobânda simplă este mai mare", "nu se pot compara"],
    correctAnswer: "egale",
    explanation: [
      "Pentru $n=1$, $S_s=C\\left(1+\\dfrac{p}{100}\\right)$ și $S_c=C\\left(1+\\dfrac{p}{100}\\right)^1$, deci $S_s=S_c$.",
    ],
  },
  {
    id: "mf-s7-3",
    topic: "matematici-financiare",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Pentru un capital de $1000$ lei, cu rata anuală $10\\%$, pe o perioadă de $3$ ani, calculați diferența dintre suma finală obținută prin dobândă compusă și suma finală obținută prin dobândă simplă (în lei).",
    correctAnswer: "31",
    acceptedAnswers: ["31 lei"],
    explanation: [
      "Dobânda simplă: $S_s=1000\\left(1+\\dfrac{10\\cdot3}{100}\\right)=1000\\cdot1{,}3=1300$ lei.",
      "Dobânda compusă: $S_c=1000\\cdot1{,}1^3=1000\\cdot1{,}331=1331$ lei.",
      "Diferența: $S_c-S_s=1331-1300=31$ lei.",
    ],
  },
  {
    id: "mf-s7-4",
    topic: "matematici-financiare",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Pentru $n>1$ ani și $p>0$, la același capital și aceeași rată anuală, suma finală obținută prin dobândă compusă este, față de suma finală obținută prin dobândă simplă:",
    options: ["mai mare", "mai mică", "egală", "nu depinde de $n$"],
    correctAnswer: "mai mare",
    explanation: [
      "Pentru $n>1$, capitalizarea dobânzii la fiecare perioadă face ca dobânda compusă să depășească dobânda simplă.",
    ],
  },
  {
    id: "mf-s7-5",
    topic: "matematici-financiare",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Pentru un capital de $500$ lei, cu rata anuală $20\\%$, pe o perioadă de $2$ ani, calculați diferența dintre suma finală obținută prin dobândă compusă și suma finală obținută prin dobândă simplă (în lei).",
    correctAnswer: "20",
    acceptedAnswers: ["20 lei"],
    explanation: [
      "Dobânda simplă: $S_s=500\\left(1+\\dfrac{20\\cdot2}{100}\\right)=500\\cdot1{,}4=700$ lei.",
      "Dobânda compusă: $S_c=500\\cdot1{,}2^2=500\\cdot1{,}44=720$ lei.",
      "Diferența: $S_c-S_s=720-700=20$ lei.",
    ],
  },
  {
    id: "mf-s7-6",
    topic: "matematici-financiare",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Pentru un capital de $3000$ lei, cu rata anuală $10\\%$, pe o perioadă de $2$ ani, calculați diferența dintre suma finală obținută prin dobândă compusă și suma finală obținută prin dobândă simplă (în lei).",
    correctAnswer: "30",
    acceptedAnswers: ["30 lei"],
    explanation: [
      "Dobânda simplă: $S_s=3000\\left(1+\\dfrac{10\\cdot2}{100}\\right)=3000\\cdot1{,}2=3600$ lei.",
      "Dobânda compusă: $S_c=3000\\cdot1{,}1^2=3000\\cdot1{,}21=3630$ lei.",
      "Diferența: $S_c-S_s=3630-3600=30$ lei.",
    ],
  },
  {
    id: "mf-s7-7",
    topic: "matematici-financiare",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Pentru un capital de $1000$ lei, cu rata anuală $20\\%$, pe o perioadă de $2$ ani, calculați diferența dintre suma finală obținută prin dobândă compusă și suma finală obținută prin dobândă simplă (în lei).",
    correctAnswer: "40",
    acceptedAnswers: ["40 lei"],
    explanation: [
      "Dobânda simplă: $S_s=1000\\left(1+\\dfrac{20\\cdot2}{100}\\right)=1000\\cdot1{,}4=1400$ lei.",
      "Dobânda compusă: $S_c=1000\\cdot1{,}2^2=1000\\cdot1{,}44=1440$ lei.",
      "Diferența: $S_c-S_s=1440-1400=40$ lei.",
    ],
  },
  {
    id: "mf-s7-8",
    topic: "matematici-financiare",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Pentru un capital de $1000$ lei, cu rata anuală $10\\%$, pe o perioadă de $2$ ani, care sumă finală este mai mare?",
    options: ["dobânda compusă", "dobânda simplă", "sunt egale", "nu se poate determina"],
    correctAnswer: "dobânda compusă",
    explanation: [
      "Suma finală prin dobândă simplă este $1200$ lei, iar prin dobândă compusă este $1210$ lei, deci dobânda compusă este mai mare.",
    ],
  },
  {
    id: "mf-s7-9",
    topic: "matematici-financiare",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Pentru un capital de $2000$ lei, cu rata anuală $20\\%$, pe o perioadă de $2$ ani, calculați diferența dintre suma finală obținută prin dobândă compusă și suma finală obținută prin dobândă simplă (în lei).",
    correctAnswer: "80",
    acceptedAnswers: ["80 lei"],
    explanation: [
      "Dobânda simplă: $S_s=2000\\left(1+\\dfrac{20\\cdot2}{100}\\right)=2000\\cdot1{,}4=2800$ lei.",
      "Dobânda compusă: $S_c=2000\\cdot1{,}2^2=2000\\cdot1{,}44=2880$ lei.",
      "Diferența: $S_c-S_s=2880-2800=80$ lei.",
    ],
  },
  {
    id: "mf-s7-10",
    topic: "matematici-financiare",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Pentru $n=0$ ani, suma finală obținută atât prin dobândă simplă, cât și prin dobândă compusă, este:",
    options: ["egală cu capitalul inițial $C$", "egală cu $0$", "mai mare decât $C$", "nu se poate determina"],
    correctAnswer: "egală cu capitalul inițial $C$",
    explanation: [
      "Pentru $n=0$, $S_s=C\\left(1+\\dfrac{p\\cdot0}{100}\\right)=C$ și $S_c=C\\left(1+\\dfrac{p}{100}\\right)^0=C$.",
    ],
  },
```

- [ ] **Step 2: Verify `git diff --stat` shows 0 deletions, run the mojibake check, run `npm test`, then commit**

```bash
git add src/data/questions/matematiciFinanciareSets.ts
git commit -m "Add matematici-financiare practice Set 7 (Dobânda compusă — comparații)"
```

---

## Task 8: Append Set 8 (TVA — calculul prețului cu TVA)

**Files:**
- Modify: `src/data/questions/matematiciFinanciareSets.ts` (append 10 exercises before the closing `];`)

- [ ] **Step 1: Append these 10 exercises**

```ts
  // Set 8 — TVA — calculul prețului cu TVA
  {
    id: "mf-s8-1",
    topic: "matematici-financiare",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Un produs are prețul net $100$ lei, iar cota de TVA este $19\\%$. Determinați prețul cu TVA (în lei).",
    correctAnswer: "119",
    acceptedAnswers: ["119 lei"],
    explanation: [
      "Aplicăm formula: $P_{TVA}=P_{net}\\left(1+\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $P_{TVA}=100\\cdot1{,}19$.",
      "Calculăm: $P_{TVA}=119$ lei.",
    ],
  },
  {
    id: "mf-s8-2",
    topic: "matematici-financiare",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Un produs are prețul net $300$ lei, iar cota de TVA este $19\\%$. Determinați prețul cu TVA (în lei).",
    correctAnswer: "357",
    acceptedAnswers: ["357 lei"],
    explanation: [
      "Aplicăm formula: $P_{TVA}=P_{net}\\left(1+\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $P_{TVA}=300\\cdot1{,}19$.",
      "Calculăm: $P_{TVA}=357$ lei.",
    ],
  },
  {
    id: "mf-s8-3",
    topic: "matematici-financiare",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Un produs are prețul net $500$ lei, iar cota de TVA este $9\\%$. Determinați prețul cu TVA (în lei).",
    correctAnswer: "545",
    acceptedAnswers: ["545 lei"],
    explanation: [
      "Aplicăm formula: $P_{TVA}=P_{net}\\left(1+\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $P_{TVA}=500\\cdot1{,}09$.",
      "Calculăm: $P_{TVA}=545$ lei.",
    ],
  },
  {
    id: "mf-s8-4",
    topic: "matematici-financiare",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Un produs are prețul net $400$ lei, iar cota de TVA este $19\\%$. Prețul cu TVA este:",
    options: ["$476$ lei", "$480$ lei", "$450$ lei", "$500$ lei"],
    correctAnswer: "$476$ lei",
    explanation: [
      "Aplicăm formula: $P_{TVA}=P_{net}\\left(1+\\dfrac{p}{100}\\right)=400\\cdot1{,}19=476$ lei.",
    ],
  },
  {
    id: "mf-s8-5",
    topic: "matematici-financiare",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Un produs are prețul net $150$ lei, iar cota de TVA este $24\\%$. Determinați prețul cu TVA (în lei).",
    correctAnswer: "186",
    acceptedAnswers: ["186 lei"],
    explanation: [
      "Aplicăm formula: $P_{TVA}=P_{net}\\left(1+\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $P_{TVA}=150\\cdot1{,}24$.",
      "Calculăm: $P_{TVA}=186$ lei.",
    ],
  },
  {
    id: "mf-s8-6",
    topic: "matematici-financiare",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Un produs are prețul net $250$ lei, iar cota de TVA este $8\\%$. Determinați prețul cu TVA (în lei).",
    correctAnswer: "270",
    acceptedAnswers: ["270 lei"],
    explanation: [
      "Aplicăm formula: $P_{TVA}=P_{net}\\left(1+\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $P_{TVA}=250\\cdot1{,}08$.",
      "Calculăm: $P_{TVA}=270$ lei.",
    ],
  },
  {
    id: "mf-s8-7",
    topic: "matematici-financiare",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Un produs are prețul net $600$ lei, iar cota de TVA este $19\\%$. Determinați prețul cu TVA (în lei).",
    correctAnswer: "714",
    acceptedAnswers: ["714 lei"],
    explanation: [
      "Aplicăm formula: $P_{TVA}=P_{net}\\left(1+\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $P_{TVA}=600\\cdot1{,}19$.",
      "Calculăm: $P_{TVA}=714$ lei.",
    ],
  },
  {
    id: "mf-s8-8",
    topic: "matematici-financiare",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Formula prețului cu TVA, pentru prețul net $P_{net}$ și cota de TVA $p\\%$, este:",
    options: [
      "$P_{TVA}=P_{net}\\left(1+\\dfrac{p}{100}\\right)$",
      "$P_{TVA}=P_{net}\\cdot\\dfrac{p}{100}$",
      "$P_{TVA}=P_{net}\\left(1-\\dfrac{p}{100}\\right)$",
      "$P_{TVA}=P_{net}+p$",
    ],
    correctAnswer: "$P_{TVA}=P_{net}\\left(1+\\dfrac{p}{100}\\right)$",
    explanation: [
      "Prețul cu TVA se obține din formula $P_{TVA}=P_{net}\\left(1+\\dfrac{p}{100}\\right)$.",
    ],
  },
  {
    id: "mf-s8-9",
    topic: "matematici-financiare",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Un produs are prețul net $800$ lei, iar cota de TVA este $9\\%$. Determinați prețul cu TVA (în lei).",
    correctAnswer: "872",
    acceptedAnswers: ["872 lei"],
    explanation: [
      "Aplicăm formula: $P_{TVA}=P_{net}\\left(1+\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $P_{TVA}=800\\cdot1{,}09$.",
      "Calculăm: $P_{TVA}=872$ lei.",
    ],
  },
  {
    id: "mf-s8-10",
    topic: "matematici-financiare",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Un produs are prețul net $120$ lei, iar cota de TVA este $25\\%$. Determinați prețul cu TVA (în lei).",
    correctAnswer: "150",
    acceptedAnswers: ["150 lei"],
    explanation: [
      "Aplicăm formula: $P_{TVA}=P_{net}\\left(1+\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $P_{TVA}=120\\cdot1{,}25$.",
      "Calculăm: $P_{TVA}=150$ lei.",
    ],
  },
```

- [ ] **Step 2: Verify `git diff --stat` shows 0 deletions, run the mojibake check, run `npm test`, then commit**

```bash
git add src/data/questions/matematiciFinanciareSets.ts
git commit -m "Add matematici-financiare practice Set 8 (TVA — preț cu TVA)"
```

---

## Task 9: Append Set 9 (TVA — determinarea prețului net)

**Files:**
- Modify: `src/data/questions/matematiciFinanciareSets.ts` (append 10 exercises before the closing `];`)

- [ ] **Step 1: Append these 10 exercises**

```ts
  // Set 9 — TVA — determinarea prețului net din prețul cu TVA
  {
    id: "mf-s9-1",
    topic: "matematici-financiare",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Prețul cu TVA al unui produs este $833$ lei, iar cota de TVA este $19\\%$. Determinați prețul net, fără TVA (în lei).",
    correctAnswer: "700",
    acceptedAnswers: ["700 lei"],
    explanation: [
      "Aplicăm formula: $P_{net}=\\dfrac{P_{TVA}}{1+\\frac{p}{100}}$.",
      "Înlocuim: $P_{net}=\\dfrac{833}{1{,}19}$.",
      "Calculăm: $P_{net}=700$ lei.",
    ],
  },
  {
    id: "mf-s9-2",
    topic: "matematici-financiare",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Prețul cu TVA al unui produs este $1090$ lei, iar cota de TVA este $9\\%$. Determinați prețul net, fără TVA (în lei).",
    correctAnswer: "1000",
    acceptedAnswers: ["1000 lei"],
    explanation: [
      "Aplicăm formula: $P_{net}=\\dfrac{P_{TVA}}{1+\\frac{p}{100}}$.",
      "Înlocuim: $P_{net}=\\dfrac{1090}{1{,}09}$.",
      "Calculăm: $P_{net}=1000$ lei.",
    ],
  },
  {
    id: "mf-s9-3",
    topic: "matematici-financiare",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Prețul cu TVA al unui produs este $210$ lei, iar cota de TVA este $5\\%$. Determinați prețul net, fără TVA (în lei).",
    correctAnswer: "200",
    acceptedAnswers: ["200 lei"],
    explanation: [
      "Aplicăm formula: $P_{net}=\\dfrac{P_{TVA}}{1+\\frac{p}{100}}$.",
      "Înlocuim: $P_{net}=\\dfrac{210}{1{,}05}$.",
      "Calculăm: $P_{net}=200$ lei.",
    ],
  },
  {
    id: "mf-s9-4",
    topic: "matematici-financiare",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Prețul cu TVA al unui produs este $1071$ lei, iar cota de TVA este $19\\%$. Prețul net (fără TVA) este:",
    options: ["$900$ lei", "$850$ lei", "$950$ lei", "$1000$ lei"],
    correctAnswer: "$900$ lei",
    explanation: [
      "Aplicăm formula: $P_{net}=\\dfrac{P_{TVA}}{1+\\frac{p}{100}}=\\dfrac{1071}{1{,}19}=900$ lei.",
    ],
  },
  {
    id: "mf-s9-5",
    topic: "matematici-financiare",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Prețul cu TVA al unui produs este $1199$ lei, iar cota de TVA este $9\\%$. Determinați prețul net, fără TVA (în lei).",
    correctAnswer: "1100",
    acceptedAnswers: ["1100 lei"],
    explanation: [
      "Aplicăm formula: $P_{net}=\\dfrac{P_{TVA}}{1+\\frac{p}{100}}$.",
      "Înlocuim: $P_{net}=\\dfrac{1199}{1{,}09}$.",
      "Calculăm: $P_{net}=1100$ lei.",
    ],
  },
  {
    id: "mf-s9-6",
    topic: "matematici-financiare",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Prețul cu TVA al unui produs este $315$ lei, iar cota de TVA este $5\\%$. Determinați prețul net, fără TVA (în lei).",
    correctAnswer: "300",
    acceptedAnswers: ["300 lei"],
    explanation: [
      "Aplicăm formula: $P_{net}=\\dfrac{P_{TVA}}{1+\\frac{p}{100}}$.",
      "Înlocuim: $P_{net}=\\dfrac{315}{1{,}05}$.",
      "Calculăm: $P_{net}=300$ lei.",
    ],
  },
  {
    id: "mf-s9-7",
    topic: "matematici-financiare",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Prețul cu TVA al unui produs este $1547$ lei, iar cota de TVA este $19\\%$. Determinați prețul net, fără TVA (în lei).",
    correctAnswer: "1300",
    acceptedAnswers: ["1300 lei"],
    explanation: [
      "Aplicăm formula: $P_{net}=\\dfrac{P_{TVA}}{1+\\frac{p}{100}}$.",
      "Înlocuim: $P_{net}=\\dfrac{1547}{1{,}19}$.",
      "Calculăm: $P_{net}=1300$ lei.",
    ],
  },
  {
    id: "mf-s9-8",
    topic: "matematici-financiare",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Prețul cu TVA al unui produs este $1526$ lei, iar cota de TVA este $9\\%$. Prețul net (fără TVA) este:",
    options: ["$1400$ lei", "$1350$ lei", "$1450$ lei", "$1500$ lei"],
    correctAnswer: "$1400$ lei",
    explanation: [
      "Aplicăm formula: $P_{net}=\\dfrac{P_{TVA}}{1+\\frac{p}{100}}=\\dfrac{1526}{1{,}09}=1400$ lei.",
    ],
  },
  {
    id: "mf-s9-9",
    topic: "matematici-financiare",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Prețul cu TVA al unui produs este $420$ lei, iar cota de TVA este $5\\%$. Determinați prețul net, fără TVA (în lei).",
    correctAnswer: "400",
    acceptedAnswers: ["400 lei"],
    explanation: [
      "Aplicăm formula: $P_{net}=\\dfrac{P_{TVA}}{1+\\frac{p}{100}}$.",
      "Înlocuim: $P_{net}=\\dfrac{420}{1{,}05}$.",
      "Calculăm: $P_{net}=400$ lei.",
    ],
  },
  {
    id: "mf-s9-10",
    topic: "matematici-financiare",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Pentru a determina prețul net dintr-un preț cu TVA $P_{TVA}$ (cota fiind $p\\%$), se calculează:",
    options: [
      "$P_{net}=\\dfrac{P_{TVA}}{1+\\frac{p}{100}}$",
      "$P_{net}=P_{TVA}\\left(1-\\dfrac{p}{100}\\right)$",
      "$P_{net}=P_{TVA}-p$",
      "$P_{net}=P_{TVA}\\cdot\\dfrac{p}{100}$",
    ],
    correctAnswer: "$P_{net}=\\dfrac{P_{TVA}}{1+\\frac{p}{100}}$",
    explanation: [
      "Prețul net se obține împărțind prețul cu TVA la $1+\\dfrac{p}{100}$: $P_{net}=\\dfrac{P_{TVA}}{1+\\frac{p}{100}}$.",
    ],
  },
```

- [ ] **Step 2: Verify `git diff --stat` shows 0 deletions, run the mojibake check, run `npm test`, then commit**

```bash
git add src/data/questions/matematiciFinanciareSets.ts
git commit -m "Add matematici-financiare practice Set 9 (TVA — preț net)"
```

---

## Task 10: Append Set 10 (Recapitulare) and final structural verification

**Files:**
- Modify: `src/data/questions/matematiciFinanciareSets.ts` (append 10 exercises before the closing `];`)

- [ ] **Step 1: Append these 10 exercises**

```ts
  // Set 10 — Recapitulare / aplicații mixte
  {
    id: "mf-s10-1",
    topic: "matematici-financiare",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Un produs costă $200$ lei și prețul se majorează cu $18\\%$. Determinați noul preț (în lei).",
    correctAnswer: "236",
    acceptedAnswers: ["236 lei"],
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1+\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=200\\cdot1{,}18$.",
      "Calculăm: $V=236$ lei.",
    ],
  },
  {
    id: "mf-s10-2",
    topic: "matematici-financiare",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Un preț de $700$ lei se reduce cu $10\\%$. Noul preț este:",
    options: ["$630$ lei", "$650$ lei", "$600$ lei", "$680$ lei"],
    correctAnswer: "$630$ lei",
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1-\\dfrac{p}{100}\\right)=700\\cdot0{,}9=630$ lei.",
    ],
  },
  {
    id: "mf-s10-3",
    topic: "matematici-financiare",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Determinați câte procente reprezintă $24$ din $120$.",
    correctAnswer: "20",
    acceptedAnswers: ["20%"],
    explanation: [
      "Calculăm raportul $\\dfrac{24}{120}$ și îl exprimăm în procente.",
      "$\\dfrac{24}{120}=0{,}2=20\\%$.",
      "Rezultă $20\\%$.",
    ],
  },
  {
    id: "mf-s10-4",
    topic: "matematici-financiare",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Calculați dobânda simplă pentru un capital de $1000$ lei, cu rata anuală $4\\%$, pe o perioadă de $5$ ani (în lei).",
    correctAnswer: "200",
    acceptedAnswers: ["200 lei"],
    explanation: [
      "Aplicăm formula: $D=\\dfrac{C\\cdot p\\cdot n}{100}$.",
      "Înlocuim: $D=\\dfrac{1000\\cdot4\\cdot5}{100}$.",
      "Calculăm: $D=200$ lei.",
    ],
  },
  {
    id: "mf-s10-5",
    topic: "matematici-financiare",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Un capital de $1500$ lei este depus cu dobândă compusă de $20\\%$ pe an, timp de $2$ ani. Suma finală este:",
    options: ["$2160$ lei", "$2100$ lei", "$2200$ lei", "$2250$ lei"],
    correctAnswer: "$2160$ lei",
    explanation: [
      "Aplicăm formula: $S=C\\left(1+\\dfrac{p}{100}\\right)^n=1500\\cdot1{,}2^2=1500\\cdot1{,}44=2160$ lei.",
    ],
  },
  {
    id: "mf-s10-6",
    topic: "matematici-financiare",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Pentru un capital de $4000$ lei, cu rata anuală $10\\%$, pe o perioadă de $2$ ani, calculați diferența dintre suma finală obținută prin dobândă compusă și suma finală obținută prin dobândă simplă (în lei).",
    correctAnswer: "40",
    acceptedAnswers: ["40 lei"],
    explanation: [
      "Dobânda simplă: $S_s=4000\\left(1+\\dfrac{10\\cdot2}{100}\\right)=4000\\cdot1{,}2=4800$ lei.",
      "Dobânda compusă: $S_c=4000\\cdot1{,}1^2=4000\\cdot1{,}21=4840$ lei.",
      "Diferența: $S_c-S_s=4840-4800=40$ lei.",
    ],
  },
  {
    id: "mf-s10-7",
    topic: "matematici-financiare",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Un produs are prețul net $250$ lei, iar cota de TVA este $20\\%$. Determinați prețul cu TVA (în lei).",
    correctAnswer: "300",
    acceptedAnswers: ["300 lei"],
    explanation: [
      "Aplicăm formula: $P_{TVA}=P_{net}\\left(1+\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $P_{TVA}=250\\cdot1{,}2$.",
      "Calculăm: $P_{TVA}=300$ lei.",
    ],
  },
  {
    id: "mf-s10-8",
    topic: "matematici-financiare",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Prețul cu TVA al unui produs este $595$ lei, iar cota de TVA este $19\\%$. Prețul net (fără TVA) este:",
    options: ["$500$ lei", "$480$ lei", "$520$ lei", "$550$ lei"],
    correctAnswer: "$500$ lei",
    explanation: [
      "Aplicăm formula: $P_{net}=\\dfrac{P_{TVA}}{1+\\frac{p}{100}}=\\dfrac{595}{1{,}19}=500$ lei.",
    ],
  },
  {
    id: "mf-s10-9",
    topic: "matematici-financiare",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Un produs costă $800$ lei și prețul se reduce cu $25\\%$. Determinați noul preț (în lei).",
    correctAnswer: "600",
    acceptedAnswers: ["600 lei"],
    explanation: [
      "Aplicăm formula: $V=V_0\\left(1-\\dfrac{p}{100}\\right)$.",
      "Înlocuim: $V=800\\cdot0{,}75$.",
      "Calculăm: $V=600$ lei.",
    ],
  },
  {
    id: "mf-s10-10",
    topic: "matematici-financiare",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Un capital de $500$ lei este depus cu dobândă simplă de $5\\%$ pe an, timp de $2$ ani. Suma finală este:",
    options: ["$550$ lei", "$500$ lei", "$525$ lei", "$600$ lei"],
    correctAnswer: "$550$ lei",
    explanation: [
      "Calculăm dobânda: $D=\\dfrac{500\\cdot5\\cdot2}{100}=50$ lei.",
      "Suma finală: $S=C+D=500+50=550$ lei.",
    ],
  },
];
```

**IMPORTANT:** this is the LAST set — the array literal closes with `];` after this block. Do not leave a dangling comma-less final element or an extra `];` from Task 9's file.

- [ ] **Step 2: Structural count / duplicate-id scan**

Write this script to the scratchpad and run it, then delete it:

```js
const fs = require('fs');
const c = fs.readFileSync('src/data/questions/matematiciFinanciareSets.ts', 'utf8');
const ids = c.match(/id:\s*"mf-s\d+-\d+"/g) || [];
console.log('total ids:', ids.length);
const counts = {};
for (const idStr of ids) {
  const m = idStr.match(/mf-s(\d+)-(\d+)/);
  counts[m[1]] = (counts[m[1]] || 0) + 1;
}
for (let n = 1; n <= 10; n++) console.log('set', n, ':', counts[String(n)] || 0);
const seen = new Set(); let dup = 0;
for (const idStr of ids) { if (seen.has(idStr)) { dup++; console.log('DUP:', idStr); } seen.add(idStr); }
console.log('duplicates:', dup, 'unique:', seen.size);
```

Expected: `total ids: 100`, each set shows `10`, `duplicates: 0`, `unique: 100`.

- [ ] **Step 3: Cross-set exact-duplicate-prompt scan**

```js
const fs = require('fs');
const content = fs.readFileSync('src/data/questions/matematiciFinanciareSets.ts', 'utf8').replace(/\r\n/g, '\n');
const blocks = content.split(/\n  \{\n/).slice(1);
const exercises = [];
for (const block of blocks) {
  const idMatch = block.match(/id:\s*"([^"]+)"/);
  const promptMatch = block.match(/prompt:\s*"([^"]*)"/);
  if (idMatch && idMatch[1].startsWith('mf-s')) {
    exercises.push({ id: idMatch[1], prompt: promptMatch ? promptMatch[1] : '' });
  }
}
const seen = new Map(); let dupCount = 0;
for (const ex of exercises) {
  const key = ex.prompt.replace(/\s+/g, ' ').trim();
  if (seen.has(key)) { console.log('EXACT PROMPT DUP:', ex.id, 'vs', seen.get(key), '->', key); dupCount++; }
  else seen.set(key, ex.id);
}
console.log('Exact duplicate prompts found (cross-set within 100):', dupCount, 'out of', exercises.length, 'exercises');
```

Expected: `Exact duplicate prompts found (cross-set within 100): 0 out of 100 exercises`.

- [ ] **Step 4: Base-exercise exact-duplicate-prompt scan (CRLF-normalized)**

```js
const fs = require('fs');
function extractPrompts(text) {
  const blocks = text.split(/\n  \{\n/).slice(1);
  const prompts = [];
  for (const block of blocks) {
    const idMatch = block.match(/id:\s*"([^"]+)"/);
    const promptMatch = block.match(/prompt:\s*"([^"]*)"/);
    if (idMatch && promptMatch) prompts.push({ id: idMatch[1], prompt: promptMatch[1].replace(/\s+/g, ' ').trim() });
  }
  return prompts;
}
const baseContent = fs.readFileSync('src/data/questions/matematiciFinanciare.ts', 'utf8').replace(/\r\n/g, '\n');
const planContent = fs.readFileSync('src/data/questions/matematiciFinanciareSets.ts', 'utf8').replace(/\r\n/g, '\n');
const baseExercises = extractPrompts(baseContent);
const newExercises = extractPrompts(planContent).filter(e => e.id.startsWith('mf-s'));
console.log('base exercises found:', baseExercises.length);
console.log('new exercises found:', newExercises.length);
const baseMap = new Map(baseExercises.map(e => [e.prompt, e.id]));
let dupCount = 0;
for (const ex of newExercises) {
  if (baseMap.has(ex.prompt)) { console.log('BASE DUP:', ex.id, 'matches base', baseMap.get(ex.prompt), '->', ex.prompt); dupCount++; }
}
console.log('Exact duplicate prompts found (new vs base):', dupCount);
```

Expected: `base exercises found: 7` (proves CRLF normalization worked, NOT 0), `new exercises found: 100`, `Exact duplicate prompts found (new vs base): 0`.

- [ ] **Step 5: Per-set answer-variety verification**

```js
const fs = require('fs');
const c = fs.readFileSync('src/data/questions/matematiciFinanciareSets.ts', 'utf8').replace(/\r\n/g, '\n');
const blocks = c.split(/\n  \{\n/).slice(1);
const bySet = {};
for (const block of blocks) {
  const idMatch = block.match(/id:\s*"mf-s(\d+)-\d+"/);
  const typeMatch = block.match(/type:\s*"(input|mcq)"/);
  const answerMatch = block.match(/correctAnswer:\s*"([^"]*)"/);
  if (!idMatch || !typeMatch || !answerMatch) continue;
  if (typeMatch[1] !== 'input') continue;
  const set = idMatch[1];
  bySet[set] = bySet[set] || [];
  bySet[set].push(answerMatch[1]);
}
for (const set of Object.keys(bySet).sort((a,b)=>a-b)) {
  const answers = bySet[set];
  const unique = new Set(answers);
  console.log('Set', set, ': input answers', answers.length, ', unique', unique.size, unique.size === answers.length ? 'OK' : 'DUPLICATE FOUND');
}
```

Expected: every set prints `OK` (unique count equals total count).

- [ ] **Step 6: Verify `git diff --stat` shows 0 deletions, run the mojibake check, run backslash-pairing scan**

```bash
node -e "const fs=require('fs'); const content=fs.readFileSync('src/data/questions/matematiciFinanciareSets.ts','utf8'); let badCount=0; for(let i=0;i<content.length;i++){ if(content[i]==='\\\\'){ const next=content[i+1]; if(next==='\\\\'){i++;continue;} badCount++; console.log('SINGLE BACKSLASH at offset',i,':',JSON.stringify(content.slice(Math.max(0,i-15),i+15))); } } console.log('Total single-backslash (bug) occurrences:', badCount);"
```

Expected: `Total single-backslash (bug) occurrences: 0`.

- [ ] **Step 7: Run full verification suite**

```bash
npm test
npm run typecheck
npm run build
```

Expected: all pass, 0 typecheck errors, build succeeds.

- [ ] **Step 8: Commit**

```bash
git add src/data/questions/matematiciFinanciareSets.ts
git commit -m "Add matematici-financiare practice Set 10 (Recapitulare) — 100 exercises complete"
```

---

## Plan self-review (performed at plan-writing time)

- **Spec coverage:** All 10 set themes from the design spec are covered, one per task. `acceptedAnswers` convention applied to every monetary/percentage `input` exercise (verified: every input exercise above has either `acceptedAnswers: ["<n> lei"]`, `acceptedAnswers: ["<n>%"]`, or — for the two "find $n$" / "find $p$" exercises `mf-s5-6` and `mf-s5-7` where the answer is a bare count/percent already covered by `acceptedAnswers` for `mf-s5-6` — no `acceptedAnswers` needed for `mf-s5-7` since a year-count `"3"` has no natural suffix variant, matching how `mf-7`-style percent answers get `acceptedAnswers` but a bare count would not).
- **Placeholder scan:** none found — every step contains complete verbatim code.
- **Type consistency:** all exercises match the `Exercise` type shape used by `mf-1`..`mf-7` and by other `*Sets.ts` files (`id`, `topic`, `set`, `type`, `points`, `prompt`, `options?`, `correctAnswer`, `acceptedAnswers?`, `explanation`).
- **Duplicate checks (performed manually against the drafted content before finalizing, to be re-verified by scripts in Task 10):**
  - Per-set input-answer variety: verified by hand for all 10 sets — no set has two `input` exercises with the same `correctAnswer`.
  - Cross-set exact-duplicate prompts: verified by hand — every prompt's numeric parameters were deliberately varied across sets (e.g. Set 8's `net=300,p=19` VAT pair is never reused as-is in Set 9's reverse-direction pair; Set 10's recap items use fresh parameter combinations not used verbatim in Sets 1-9).
  - Base-exercise duplication: verified by hand against all 7 base exercises (`mf-1`..`mf-7`) — no new exercise reproduces the exact same numeric parameters (e.g. `150,+20%,180`; `400,-25%,300`; `2000,5%,4,400`; `1000,10%,2,1210`; `200,19%,238`; `1000,200,1200`; `50,200,25%`).
  - Both scripted checks (Step 3 and Step 4 of Task 10) will independently re-confirm these by-hand checks — this is the mandatory scripted-not-manual discipline carried forward from prior rounds.
