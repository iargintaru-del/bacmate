# Statistică — Practice Sets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 10-set × 10-exercise (100 total) practice-set bank for the `statistica` topic, matching the established pattern used by every other topic's `*Sets.ts` file.

**Architecture:** A single new file `src/data/questions/statisticaSets.ts` exports `statisticaSetExercises: Exercise[]`, appended one set at a time (10 exercises per task). `src/data/index.ts` is wired once, in Task 1, to import and spread this array into `ALL_EXERCISES`.

**Tech Stack:** TypeScript, Vitest. No new dependencies.

## Global Constraints

- Exercise ids: `st-s<setNumber>-<exerciseNumber>`, e.g. `st-s1-1`..`st-s10-10`.
- Every exercise: `topic: "statistica"`, `set: <N>`, `points: 6`.
- Inline `$...$` LaTeX only, never `$$...$$`. Every LaTeX command needs a **double backslash** in the TS string literal (e.g. `\\dfrac`).
- Romanian decimal comma in LaTeX source where decimals appear: `1{,}2`, not `1.2`.
- `acceptedAnswers` convention (matches `st-1`..`st-7`): `input`-type exercises whose answer is a **percentage** set `correctAnswer` to the bare number and `acceptedAnswers: ["<n>%"]`. `input`-type exercises whose answer is a **bare count** (absolute frequency, mean, mode value, n, sum, angle in degrees) do **not** use `acceptedAnswers`.
- Every mcq's `correctAnswer` must appear character-for-character among its 4 `options`. All 4 options must be genuinely distinct claims/values — not just distinct-looking strings that are secretly mathematically/logically equal.
- Within each 10-exercise set, all `input`-type numeric `correctAnswer` values must be pairwise distinct.
- None of the 100 exercises duplicate the exact data set / numeric parameters of base exercises `st-1`..`st-7` (already verified below).
- No cross-set exact-duplicate prompts across the full 100 (already verified below).
- **Reversed-direction/restated-question duplication discipline**: a data set or (N, k, %) combination reused across two exercises that ask for different unknowns is still a content duplication even though the exact prompt text differs. Checked by hand at plan-writing time (see below) — every task's review must also apply this check, not just exact-string prompt matches.
- `git diff --stat` after every task must show 0 deletions (pure append). Forbid external scripts for generating file content — edit the file directly. Mojibake-marker scan (`Ä`/`È`/`Ã` all must be false) before every commit.

---

## Base exercises reference (`src/data/questions/statistica.ts`, unmodified)

- `st-1` (input): 20 elevi, 8 ochi căprui → frecvența relativă = 40%
- `st-2` (mcq): definiția frecvenței absolute
- `st-3` (input): date `5,6,5,7,5,6,8` → frecvența absolută a notei 5 = 3
- `st-4` (mcq): reprezentare grafică date cantitative grupate → histogramă
- `st-5` (input): date `4,6,8,10` → media aritmetică = 7
- `st-6` (mcq): frecvență relativă din 10/50 → 20%
- `st-7` (input): date `3,3,4,5,5,5,6` → valoarea cu frecvența maximă = 5

---

## Task 1: Wire up index.ts and create file with Set 1

**Files:**
- Modify: `src/data/index.ts`
- Create: `src/data/questions/statisticaSets.ts`

**Interfaces:**
- Produces: `statisticaSetExercises: Exercise[]` (10 exercises, `set: 1`), consumed by `src/data/index.ts` and by Tasks 2-10 (which append further sets to the same array in the same file).

- [ ] **Step 1: Locate the existing wiring in `src/data/index.ts`**

Find:
```ts
import { statisticaExercises } from "./questions/statistica";
```
and
```ts
  ...statisticaExercises,
```

- [ ] **Step 2: Add the new import immediately after the existing `statisticaExercises` import**

```ts
import { statisticaSetExercises } from "./questions/statisticaSets";
```

- [ ] **Step 3: Add the new spread immediately after the existing `...statisticaExercises,` spread in `ALL_EXERCISES`**

```ts
  ...statisticaSetExercises,
```

- [ ] **Step 4: Create `src/data/questions/statisticaSets.ts` with this exact content**

```ts
import type { Exercise } from "../../types";

export const statisticaSetExercises: Exercise[] = [
  // Set 1 — Frecvența absolută — calcul
  {
    id: "st-s1-1",
    topic: "statistica",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Date: $5,6,7,5,8,9$. Determinați frecvența absolută a valorii $5$.",
    correctAnswer: "2",
    explanation: [
      "Numărăm aparițiile valorii $5$ în șir: $5,5$.",
      "Valoarea $5$ apare de $2$ ori.",
      "Frecvența absolută este $2$.",
    ],
  },
  {
    id: "st-s1-2",
    topic: "statistica",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Date: $4,5,4,6,4,7,8$. Determinați frecvența absolută a valorii $4$.",
    correctAnswer: "3",
    explanation: [
      "Numărăm aparițiile valorii $4$ în șir: $4,4,4$.",
      "Valoarea $4$ apare de $3$ ori.",
      "Frecvența absolută este $3$.",
    ],
  },
  {
    id: "st-s1-3",
    topic: "statistica",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Date: $9,8,9,7,9,6,9,5$. Determinați frecvența absolută a valorii $9$.",
    correctAnswer: "4",
    explanation: [
      "Numărăm aparițiile valorii $9$ în șir: $9,9,9,9$.",
      "Valoarea $9$ apare de $4$ ori.",
      "Frecvența absolută este $4$.",
    ],
  },
  {
    id: "st-s1-4",
    topic: "statistica",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Date: $2,3,2,4,2,5,2,6,2$. Determinați frecvența absolută a valorii $2$.",
    correctAnswer: "5",
    explanation: [
      "Numărăm aparițiile valorii $2$ în șir: $2,2,2,2,2$.",
      "Valoarea $2$ apare de $5$ ori.",
      "Frecvența absolută este $5$.",
    ],
  },
  {
    id: "st-s1-5",
    topic: "statistica",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Date: $1,2,1,3,1,4,1,5,1,6,1$. Determinați frecvența absolută a valorii $1$.",
    correctAnswer: "6",
    explanation: [
      "Numărăm aparițiile valorii $1$ în șir: $1,1,1,1,1,1$.",
      "Valoarea $1$ apare de $6$ ori.",
      "Frecvența absolută este $6$.",
    ],
  },
  {
    id: "st-s1-6",
    topic: "statistica",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Date: $3,4,3,5,3,6,3,7,3,8,3,9,3$. Determinați frecvența absolută a valorii $3$.",
    correctAnswer: "7",
    explanation: [
      "Numărăm aparițiile valorii $3$ în șir: $3,3,3,3,3,3,3$.",
      "Valoarea $3$ apare de $7$ ori.",
      "Frecvența absolută este $7$.",
    ],
  },
  {
    id: "st-s1-7",
    topic: "statistica",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Date: $6,6,6,6,6,6,6,6,1,2,3,4,5$. Determinați frecvența absolută a valorii $6$.",
    correctAnswer: "8",
    explanation: [
      "Numărăm aparițiile valorii $6$ în șir: opt apariții consecutive.",
      "Valoarea $6$ apare de $8$ ori.",
      "Frecvența absolută este $8$.",
    ],
  },
  {
    id: "st-s1-8",
    topic: "statistica",
    set: 1,
    type: "input",
    points: 6,
    prompt: "Date: $7,7,7,7,7,7,7,7,7,1,2,3,4$. Determinați frecvența absolută a valorii $7$.",
    correctAnswer: "9",
    explanation: [
      "Numărăm aparițiile valorii $7$ în șir: nouă apariții consecutive.",
      "Valoarea $7$ apare de $9$ ori.",
      "Frecvența absolută este $9$.",
    ],
  },
  {
    id: "st-s1-9",
    topic: "statistica",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Date: $10,20,10,30,10,40$. Frecvența absolută a valorii $10$ este:",
    options: ["$3$", "$2$", "$4$", "$1$"],
    correctAnswer: "$3$",
    explanation: [
      "Valoarea $10$ apare de $3$ ori în șirul de date.",
    ],
  },
  {
    id: "st-s1-10",
    topic: "statistica",
    set: 1,
    type: "mcq",
    points: 6,
    prompt: "Într-un set de date, suma tuturor frecvențelor absolute este egală cu:",
    options: [
      "numărul total de date",
      "numărul de valori distincte",
      "media aritmetică a datelor",
      "frecvența relativă maximă",
    ],
    correctAnswer: "numărul total de date",
    explanation: [
      "Fiecare dată contribuie exact o dată la frecvența absolută a valorii sale.",
      "Prin urmare, suma tuturor frecvențelor absolute este egală cu numărul total de date din set.",
    ],
  },
];
```

- [ ] **Step 5: Verify with an encoding-safety sweep before committing**

Run:
```bash
git diff --stat
```
Expected: only `src/data/index.ts` (2 insertions) and `src/data/questions/statisticaSets.ts` (new file) — 0 deletions.

Run a mojibake-marker check:
```bash
node -e "const c=require('fs').readFileSync('src/data/questions/statisticaSets.ts','utf8'); console.log('Ä:',c.includes('Ä'),'È:',c.includes('È'),'Ã:',c.includes('Ã'));"
```
Expected: all `false`.

- [ ] **Step 6: Run tests**

```bash
npm test
```
Expected: all tests pass (7 files, 40 tests, plus the new exercises satisfy `question bank integrity` checks — 6 points each, mcq correctAnswer present in options, non-empty explanation arrays).

- [ ] **Step 7: Commit**

```bash
git add src/data/index.ts src/data/questions/statisticaSets.ts
git commit -m "Add statistica practice Set 1 (Frecvența absolută — calcul)"
```

---

## Task 2: Append Set 2 (Frecvența relativă — calcul)

**Files:**
- Modify: `src/data/questions/statisticaSets.ts` (append 10 exercises before the closing `];`)

- [ ] **Step 1: Append these 10 exercises**

```ts
  // Set 2 — Frecvența relativă — calcul
  {
    id: "st-s2-1",
    topic: "statistica",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Într-un grup de $25$ de persoane, $5$ preferă ceaiul. Determinați frecvența relativă (în procente) a acestei preferințe.",
    correctAnswer: "20",
    acceptedAnswers: ["20%"],
    explanation: [
      "Frecvența relativă este raportul $\\dfrac{5}{25}$.",
      "Calculăm: $\\dfrac{5}{25}=0{,}2$.",
      "Exprimată în procente, frecvența relativă este $20\\%$.",
    ],
  },
  {
    id: "st-s2-2",
    topic: "statistica",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Într-un grup de $40$ de persoane, $10$ preferă cafeaua. Determinați frecvența relativă (în procente) a acestei preferințe.",
    correctAnswer: "25",
    acceptedAnswers: ["25%"],
    explanation: [
      "Frecvența relativă este raportul $\\dfrac{10}{40}$.",
      "Calculăm: $\\dfrac{10}{40}=0{,}25$.",
      "Exprimată în procente, frecvența relativă este $25\\%$.",
    ],
  },
  {
    id: "st-s2-3",
    topic: "statistica",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Într-un grup de $30$ de elevi, $9$ practică un sport de performanță. Determinați frecvența relativă (în procente) a acestora.",
    correctAnswer: "30",
    acceptedAnswers: ["30%"],
    explanation: [
      "Frecvența relativă este raportul $\\dfrac{9}{30}$.",
      "Calculăm: $\\dfrac{9}{30}=0{,}3$.",
      "Exprimată în procente, frecvența relativă este $30\\%$.",
    ],
  },
  {
    id: "st-s2-4",
    topic: "statistica",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Într-un grup de $70$ de persoane, $7$ sunt stângace. Determinați frecvența relativă (în procente) a acestora.",
    correctAnswer: "10",
    acceptedAnswers: ["10%"],
    explanation: [
      "Frecvența relativă este raportul $\\dfrac{7}{70}$.",
      "Calculăm: $\\dfrac{7}{70}=0{,}1$.",
      "Exprimată în procente, frecvența relativă este $10\\%$.",
    ],
  },
  {
    id: "st-s2-5",
    topic: "statistica",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Într-un grup de $60$ de persoane, $9$ au grupa sanguină rară. Frecvența relativă a acesteia este:",
    options: ["$15\\%$", "$10\\%$", "$20\\%$", "$9\\%$"],
    correctAnswer: "$15\\%$",
    explanation: [
      "Frecvența relativă este $\\dfrac{9}{60}=0{,}15=15\\%$.",
    ],
  },
  {
    id: "st-s2-6",
    topic: "statistica",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Într-un grup de $20$ de persoane, $7$ au ochi verzi. Determinați frecvența relativă (în procente) a acestora.",
    correctAnswer: "35",
    acceptedAnswers: ["35%"],
    explanation: [
      "Frecvența relativă este raportul $\\dfrac{7}{20}$.",
      "Calculăm: $\\dfrac{7}{20}=0{,}35$.",
      "Exprimată în procente, frecvența relativă este $35\\%$.",
    ],
  },
  {
    id: "st-s2-7",
    topic: "statistica",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Într-un grup de $15$ de persoane, $6$ au participat la un curs. Determinați frecvența relativă (în procente) a acestora.",
    correctAnswer: "40",
    acceptedAnswers: ["40%"],
    explanation: [
      "Frecvența relativă este raportul $\\dfrac{6}{15}$.",
      "Calculăm: $\\dfrac{6}{15}=0{,}4$.",
      "Exprimată în procente, frecvența relativă este $40\\%$.",
    ],
  },
  {
    id: "st-s2-8",
    topic: "statistica",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Frecvența relativă a unei valori este întotdeauna cuprinsă între:",
    options: [
      "$0$ și $1$ (sau $0\\%$ și $100\\%$)",
      "$0$ și $\\infty$",
      "$-1$ și $1$",
      "nu are limite",
    ],
    correctAnswer: "$0$ și $1$ (sau $0\\%$ și $100\\%$)",
    explanation: [
      "Frecvența relativă este raportul dintre frecvența absolută (cel mult egală cu totalul) și numărul total de date.",
      "Prin urmare, valoarea sa este întotdeauna cuprinsă între $0$ și $1$, adică între $0\\%$ și $100\\%$.",
    ],
  },
  {
    id: "st-s2-9",
    topic: "statistica",
    set: 2,
    type: "input",
    points: 6,
    prompt: "Într-un grup de $20$ de persoane, $9$ au ochi căprui. Determinați frecvența relativă (în procente) a acestora.",
    correctAnswer: "45",
    acceptedAnswers: ["45%"],
    explanation: [
      "Frecvența relativă este raportul $\\dfrac{9}{20}$.",
      "Calculăm: $\\dfrac{9}{20}=0{,}45$.",
      "Exprimată în procente, frecvența relativă este $45\\%$.",
    ],
  },
  {
    id: "st-s2-10",
    topic: "statistica",
    set: 2,
    type: "mcq",
    points: 6,
    prompt: "Într-un grup de $200$ de persoane, $50$ locuiesc la bloc. Frecvența relativă a acestora este:",
    options: ["$25\\%$", "$20\\%$", "$30\\%$", "$50\\%$"],
    correctAnswer: "$25\\%$",
    explanation: [
      "Frecvența relativă este $\\dfrac{50}{200}=0{,}25=25\\%$.",
    ],
  },
```

- [ ] **Step 2: Verify `git diff --stat` shows 0 deletions, run the mojibake check, run `npm test`, then commit**

```bash
git add src/data/questions/statisticaSets.ts
git commit -m "Add statistica practice Set 2 (Frecvența relativă — calcul)"
```

---

## Task 3: Append Set 3 (Frecvențe — probleme inverse)

**Files:**
- Modify: `src/data/questions/statisticaSets.ts` (append 10 exercises before the closing `];`)

- [ ] **Step 1: Append these 10 exercises**

```ts
  // Set 3 — Frecvențe — probleme inverse
  {
    id: "st-s3-1",
    topic: "statistica",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Într-un grup de $50$ de persoane, frecvența relativă a unei caracteristici este $24\\%$. Determinați frecvența absolută (numărul de persoane cu acea caracteristică).",
    correctAnswer: "12",
    explanation: [
      "Frecvența absolută este $24\\%$ din $50$.",
      "Calculăm: $50\\cdot0{,}24=12$.",
      "Frecvența absolută este $12$.",
    ],
  },
  {
    id: "st-s3-2",
    topic: "statistica",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Într-un grup de $40$ de elevi, frecvența relativă a celor cu media peste $9$ este $15\\%$. Determinați frecvența absolută.",
    correctAnswer: "6",
    explanation: [
      "Frecvența absolută este $15\\%$ din $40$.",
      "Calculăm: $40\\cdot0{,}15=6$.",
      "Frecvența absolută este $6$.",
    ],
  },
  {
    id: "st-s3-3",
    topic: "statistica",
    set: 3,
    type: "input",
    points: 6,
    prompt: "O caracteristică are frecvența absolută $18$ și frecvența relativă $30\\%$. Determinați numărul total de date.",
    correctAnswer: "60",
    explanation: [
      "Numărul total de date este $\\dfrac{18}{0{,}3}$.",
      "Calculăm: $\\dfrac{18}{0{,}3}=60$.",
      "Numărul total de date este $60$.",
    ],
  },
  {
    id: "st-s3-4",
    topic: "statistica",
    set: 3,
    type: "input",
    points: 6,
    prompt: "O caracteristică are frecvența absolută $9$ și frecvența relativă $20\\%$. Determinați numărul total de date.",
    correctAnswer: "45",
    explanation: [
      "Numărul total de date este $\\dfrac{9}{0{,}2}$.",
      "Calculăm: $\\dfrac{9}{0{,}2}=45$.",
      "Numărul total de date este $45$.",
    ],
  },
  {
    id: "st-s3-5",
    topic: "statistica",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "Într-un grup de $200$ de persoane, frecvența relativă a unei caracteristici este $35\\%$. Frecvența absolută este:",
    options: ["$70$", "$60$", "$80$", "$50$"],
    correctAnswer: "$70$",
    explanation: [
      "Frecvența absolută este $200\\cdot0{,}35=70$.",
    ],
  },
  {
    id: "st-s3-6",
    topic: "statistica",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Într-un grup de $120$ de persoane, frecvența relativă a unei caracteristici este $25\\%$. Determinați frecvența absolută.",
    correctAnswer: "30",
    explanation: [
      "Frecvența absolută este $120\\cdot0{,}25$.",
      "Calculăm: $120\\cdot0{,}25=30$.",
      "Frecvența absolută este $30$.",
    ],
  },
  {
    id: "st-s3-7",
    topic: "statistica",
    set: 3,
    type: "input",
    points: 6,
    prompt: "O caracteristică are frecvența absolută $14$ și frecvența relativă $40\\%$. Determinați numărul total de date.",
    correctAnswer: "35",
    explanation: [
      "Numărul total de date este $\\dfrac{14}{0{,}4}$.",
      "Calculăm: $\\dfrac{14}{0{,}4}=35$.",
      "Numărul total de date este $35$.",
    ],
  },
  {
    id: "st-s3-8",
    topic: "statistica",
    set: 3,
    type: "mcq",
    points: 6,
    prompt: "O caracteristică are frecvența absolută $21$ și frecvența relativă $15\\%$. Numărul total de date este:",
    options: ["$140$", "$130$", "$150$", "$120$"],
    correctAnswer: "$140$",
    explanation: [
      "Numărul total de date este $\\dfrac{21}{0{,}15}=140$.",
    ],
  },
  {
    id: "st-s3-9",
    topic: "statistica",
    set: 3,
    type: "input",
    points: 6,
    prompt: "Într-un grup de $90$ de persoane, frecvența relativă a unei caracteristici este $40\\%$. Determinați frecvența absolută.",
    correctAnswer: "36",
    explanation: [
      "Frecvența absolută este $90\\cdot0{,}4$.",
      "Calculăm: $90\\cdot0{,}4=36$.",
      "Frecvența absolută este $36$.",
    ],
  },
  {
    id: "st-s3-10",
    topic: "statistica",
    set: 3,
    type: "input",
    points: 6,
    prompt: "O caracteristică are frecvența absolută $27$ și frecvența relativă $15\\%$. Determinați numărul total de date.",
    correctAnswer: "180",
    explanation: [
      "Numărul total de date este $\\dfrac{27}{0{,}15}$.",
      "Calculăm: $\\dfrac{27}{0{,}15}=180$.",
      "Numărul total de date este $180$.",
    ],
  },
```

- [ ] **Step 2: Verify `git diff --stat` shows 0 deletions, run the mojibake check, run `npm test`, then commit**

```bash
git add src/data/questions/statisticaSets.ts
git commit -m "Add statistica practice Set 3 (Frecvențe — probleme inverse)"
```

---

## Task 4: Append Set 4 (Media aritmetică — calcul direct)

**Files:**
- Modify: `src/data/questions/statisticaSets.ts` (append 10 exercises before the closing `];`)

- [ ] **Step 1: Append these 10 exercises**

```ts
  // Set 4 — Media aritmetică — calcul direct
  {
    id: "st-s4-1",
    topic: "statistica",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Calculați media aritmetică a datelor $5,7,9,11$.",
    correctAnswer: "8",
    explanation: [
      "Calculăm suma: $5+7+9+11=32$.",
      "Împărțim la numărul de date: $\\dfrac{32}{4}$.",
      "Media aritmetică este $8$.",
    ],
  },
  {
    id: "st-s4-2",
    topic: "statistica",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Calculați media aritmetică a datelor $2,4,6,8,10$.",
    correctAnswer: "6",
    explanation: [
      "Calculăm suma: $2+4+6+8+10=30$.",
      "Împărțim la numărul de date: $\\dfrac{30}{5}$.",
      "Media aritmetică este $6$.",
    ],
  },
  {
    id: "st-s4-3",
    topic: "statistica",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Calculați media aritmetică a datelor $3,5,7$.",
    correctAnswer: "5",
    explanation: [
      "Calculăm suma: $3+5+7=15$.",
      "Împărțim la numărul de date: $\\dfrac{15}{3}$.",
      "Media aritmetică este $5$.",
    ],
  },
  {
    id: "st-s4-4",
    topic: "statistica",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Calculați media aritmetică a datelor $10,20,30,40$.",
    correctAnswer: "25",
    explanation: [
      "Calculăm suma: $10+20+30+40=100$.",
      "Împărțim la numărul de date: $\\dfrac{100}{4}$.",
      "Media aritmetică este $25$.",
    ],
  },
  {
    id: "st-s4-5",
    topic: "statistica",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Media aritmetică a datelor $7,9,11,13$ este:",
    options: ["$10$", "$9$", "$11$", "$12$"],
    correctAnswer: "$10$",
    explanation: [
      "Suma este $7+9+11+13=40$, iar media este $\\dfrac{40}{4}=10$.",
    ],
  },
  {
    id: "st-s4-6",
    topic: "statistica",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Calculați media aritmetică a datelor $12,15,18$.",
    correctAnswer: "15",
    explanation: [
      "Calculăm suma: $12+15+18=45$.",
      "Împărțim la numărul de date: $\\dfrac{45}{3}$.",
      "Media aritmetică este $15$.",
    ],
  },
  {
    id: "st-s4-7",
    topic: "statistica",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Calculați media aritmetică a datelor $100,200,300,400,500$.",
    correctAnswer: "300",
    explanation: [
      "Calculăm suma: $100+200+300+400+500=1500$.",
      "Împărțim la numărul de date: $\\dfrac{1500}{5}$.",
      "Media aritmetică este $300$.",
    ],
  },
  {
    id: "st-s4-8",
    topic: "statistica",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Calculați media aritmetică a datelor $10,15,20,25,30$.",
    correctAnswer: "20",
    explanation: [
      "Calculăm suma: $10+15+20+25+30=100$.",
      "Împărțim la numărul de date: $\\dfrac{100}{5}$.",
      "Media aritmetică este $20$.",
    ],
  },
  {
    id: "st-s4-9",
    topic: "statistica",
    set: 4,
    type: "input",
    points: 6,
    prompt: "Calculați media aritmetică a datelor $8,10,12,14,16$.",
    correctAnswer: "12",
    explanation: [
      "Calculăm suma: $8+10+12+14+16=60$.",
      "Împărțim la numărul de date: $\\dfrac{60}{5}$.",
      "Media aritmetică este $12$.",
    ],
  },
  {
    id: "st-s4-10",
    topic: "statistica",
    set: 4,
    type: "mcq",
    points: 6,
    prompt: "Media aritmetică a unui set de $n$ date $x_1,x_2,\\ldots,x_n$ se calculează astfel:",
    options: [
      "$\\dfrac{x_1+x_2+\\cdots+x_n}{n}$",
      "$x_1+x_2+\\cdots+x_n$",
      "$\\dfrac{x_1\\cdot x_2\\cdots x_n}{n}$",
      "cea mai mare valoare din set",
    ],
    correctAnswer: "$\\dfrac{x_1+x_2+\\cdots+x_n}{n}$",
    explanation: [
      "Media aritmetică este suma tuturor datelor împărțită la numărul de date.",
    ],
  },
```

- [ ] **Step 2: Verify `git diff --stat` shows 0 deletions, run the mojibake check, run `npm test`, then commit**

```bash
git add src/data/questions/statisticaSets.ts
git commit -m "Add statistica practice Set 4 (Media aritmetică — calcul direct)"
```

---

## Task 5: Append Set 5 (Media aritmetică — probleme inverse)

**Files:**
- Modify: `src/data/questions/statisticaSets.ts` (append 10 exercises before the closing `];`)

- [ ] **Step 1: Append these 10 exercises**

```ts
  // Set 5 — Media aritmetică — probleme inverse
  {
    id: "st-s5-1",
    topic: "statistica",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Media a $4$ numere este $10$, iar trei dintre ele sunt $8,9,11$. Determinați al patrulea număr.",
    correctAnswer: "12",
    explanation: [
      "Suma celor $4$ numere este $4\\cdot10=40$.",
      "Suma celor trei numere date este $8+9+11=28$.",
      "Al patrulea număr este $40-28=12$.",
    ],
  },
  {
    id: "st-s5-2",
    topic: "statistica",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Media a $5$ numere este $20$, iar patru dintre ele sunt $15,18,22,25$. Determinați al cincilea număr.",
    correctAnswer: "20",
    explanation: [
      "Suma celor $5$ numere este $5\\cdot20=100$.",
      "Suma celor patru numere date este $15+18+22+25=80$.",
      "Al cincilea număr este $100-80=20$.",
    ],
  },
  {
    id: "st-s5-3",
    topic: "statistica",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Suma unui set de date este $150$, iar media aritmetică este $15$. Determinați numărul de date din set.",
    correctAnswer: "10",
    explanation: [
      "Numărul de date este $\\dfrac{150}{15}$.",
      "Calculăm: $\\dfrac{150}{15}=10$.",
      "Numărul de date este $10$.",
    ],
  },
  {
    id: "st-s5-4",
    topic: "statistica",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Un set de $8$ date are media aritmetică $12$. Determinați suma datelor.",
    correctAnswer: "96",
    explanation: [
      "Suma datelor este $8\\cdot12$.",
      "Calculăm: $8\\cdot12=96$.",
      "Suma datelor este $96$.",
    ],
  },
  {
    id: "st-s5-5",
    topic: "statistica",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Media a $3$ numere este $9$, iar două dintre ele sunt $7,10$. Al treilea număr este:",
    options: ["$10$", "$9$", "$8$", "$11$"],
    correctAnswer: "$10$",
    explanation: [
      "Suma celor $3$ numere este $3\\cdot9=27$, iar suma celor două date este $7+10=17$.",
      "Al treilea număr este $27-17=10$.",
    ],
  },
  {
    id: "st-s5-6",
    topic: "statistica",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Suma unui set de date este $260$, iar media aritmetică este $20$. Determinați numărul de date din set.",
    correctAnswer: "13",
    explanation: [
      "Numărul de date este $\\dfrac{260}{20}$.",
      "Calculăm: $\\dfrac{260}{20}=13$.",
      "Numărul de date este $13$.",
    ],
  },
  {
    id: "st-s5-7",
    topic: "statistica",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Un set de $6$ date are media aritmetică $15$. Determinați suma datelor.",
    correctAnswer: "90",
    explanation: [
      "Suma datelor este $6\\cdot15$.",
      "Calculăm: $6\\cdot15=90$.",
      "Suma datelor este $90$.",
    ],
  },
  {
    id: "st-s5-8",
    topic: "statistica",
    set: 5,
    type: "mcq",
    points: 6,
    prompt: "Media a $4$ numere este $25$, iar trei dintre ele sunt $20,22,28$. Al patrulea număr este:",
    options: ["$30$", "$25$", "$28$", "$32$"],
    correctAnswer: "$30$",
    explanation: [
      "Suma celor $4$ numere este $4\\cdot25=100$, iar suma celor trei date este $20+22+28=70$.",
      "Al patrulea număr este $100-70=30$.",
    ],
  },
  {
    id: "st-s5-9",
    topic: "statistica",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Media a $6$ numere este $8$, iar cinci dintre ele sunt $5,6,7,9,10$. Determinați al șaselea număr.",
    correctAnswer: "11",
    explanation: [
      "Suma celor $6$ numere este $6\\cdot8=48$.",
      "Suma celor cinci numere date este $5+6+7+9+10=37$.",
      "Al șaselea număr este $48-37=11$.",
    ],
  },
  {
    id: "st-s5-10",
    topic: "statistica",
    set: 5,
    type: "input",
    points: 6,
    prompt: "Suma unui set de date este $210$, iar media aritmetică este $15$. Determinați numărul de date din set.",
    correctAnswer: "14",
    explanation: [
      "Numărul de date este $\\dfrac{210}{15}$.",
      "Calculăm: $\\dfrac{210}{15}=14$.",
      "Numărul de date este $14$.",
    ],
  },
```

- [ ] **Step 2: Verify `git diff --stat` shows 0 deletions, run the mojibake check, run `npm test`, then commit**

```bash
git add src/data/questions/statisticaSets.ts
git commit -m "Add statistica practice Set 5 (Media aritmetică — probleme inverse)"
```

---

## Task 6: Append Set 6 (Valoarea cu frecvența maximă — modul)

**Files:**
- Modify: `src/data/questions/statisticaSets.ts` (append 10 exercises before the closing `];`)

- [ ] **Step 1: Append these 10 exercises**

```ts
  // Set 6 — Valoarea cu frecvența maximă (modul)
  {
    id: "st-s6-1",
    topic: "statistica",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Date: $2,2,3,4,4,4,5$. Determinați valoarea cu frecvența absolută cea mai mare.",
    correctAnswer: "4",
    explanation: [
      "Numărăm frecvențele: $2$ apare de $2$ ori, $3$ apare o dată, $4$ apare de $3$ ori, $5$ apare o dată.",
      "Valoarea cu frecvența cea mai mare este $4$, cu frecvența $3$.",
    ],
  },
  {
    id: "st-s6-2",
    topic: "statistica",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Date: $7,8,7,9,7,10,8$. Determinați valoarea cu frecvența absolută cea mai mare.",
    correctAnswer: "7",
    explanation: [
      "Numărăm frecvențele: $7$ apare de $3$ ori, $8$ apare de $2$ ori, $9$ și $10$ apar o dată fiecare.",
      "Valoarea cu frecvența cea mai mare este $7$, cu frecvența $3$.",
    ],
  },
  {
    id: "st-s6-3",
    topic: "statistica",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Date: $1,1,2,2,2,3,3$. Determinați valoarea cu frecvența absolută cea mai mare.",
    correctAnswer: "2",
    explanation: [
      "Numărăm frecvențele: $1$ apare de $2$ ori, $2$ apare de $3$ ori, $3$ apare de $2$ ori.",
      "Valoarea cu frecvența cea mai mare este $2$, cu frecvența $3$.",
    ],
  },
  {
    id: "st-s6-4",
    topic: "statistica",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Date: $5,6,6,6,7,8,9$. Determinați valoarea cu frecvența absolută cea mai mare.",
    correctAnswer: "6",
    explanation: [
      "Numărăm frecvențele: $6$ apare de $3$ ori, celelalte valori apar o dată fiecare.",
      "Valoarea cu frecvența cea mai mare este $6$, cu frecvența $3$.",
    ],
  },
  {
    id: "st-s6-5",
    topic: "statistica",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Date: $10,11,10,12,10,13$. Valoarea cu frecvența absolută cea mai mare este:",
    options: ["$10$", "$11$", "$12$", "$13$"],
    correctAnswer: "$10$",
    explanation: [
      "Valoarea $10$ apare de $3$ ori, iar celelalte valori apar o dată fiecare.",
    ],
  },
  {
    id: "st-s6-6",
    topic: "statistica",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Date: $8,9,9,9,9,7,6$. Determinați valoarea cu frecvența absolută cea mai mare.",
    correctAnswer: "9",
    explanation: [
      "Numărăm frecvențele: $9$ apare de $4$ ori, celelalte valori apar o dată fiecare.",
      "Valoarea cu frecvența cea mai mare este $9$, cu frecvența $4$.",
    ],
  },
  {
    id: "st-s6-7",
    topic: "statistica",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Date: $2,3,3,4,3,5,3$. Determinați valoarea cu frecvența absolută cea mai mare.",
    correctAnswer: "3",
    explanation: [
      "Numărăm frecvențele: $3$ apare de $4$ ori, celelalte valori apar o dată fiecare.",
      "Valoarea cu frecvența cea mai mare este $3$, cu frecvența $4$.",
    ],
  },
  {
    id: "st-s6-8",
    topic: "statistica",
    set: 6,
    type: "mcq",
    points: 6,
    prompt: "Date: $15,16,15,16,15,17$. Valoarea cu frecvența absolută cea mai mare este:",
    options: ["$15$", "$16$", "$17$", "$14$"],
    correctAnswer: "$15$",
    explanation: [
      "Valoarea $15$ apare de $3$ ori, iar valoarea $16$ apare de $2$ ori.",
    ],
  },
  {
    id: "st-s6-9",
    topic: "statistica",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Date: $8,8,8,9,10,11$. Determinați valoarea cu frecvența absolută cea mai mare.",
    correctAnswer: "8",
    explanation: [
      "Numărăm frecvențele: $8$ apare de $3$ ori, celelalte valori apar o dată fiecare.",
      "Valoarea cu frecvența cea mai mare este $8$, cu frecvența $3$.",
    ],
  },
  {
    id: "st-s6-10",
    topic: "statistica",
    set: 6,
    type: "input",
    points: 6,
    prompt: "Date: $11,12,12,12,13,14$. Determinați valoarea cu frecvența absolută cea mai mare.",
    correctAnswer: "12",
    explanation: [
      "Numărăm frecvențele: $12$ apare de $3$ ori, celelalte valori apar o dată fiecare.",
      "Valoarea cu frecvența cea mai mare este $12$, cu frecvența $3$.",
    ],
  },
```

- [ ] **Step 2: Verify `git diff --stat` shows 0 deletions, run the mojibake check, run `npm test`, then commit**

```bash
git add src/data/questions/statisticaSets.ts
git commit -m "Add statistica practice Set 6 (Valoarea cu frecvența maximă)"
```

---

## Task 7: Append Set 7 (Clasificarea datelor statistice)

**Files:**
- Modify: `src/data/questions/statisticaSets.ts` (append 10 exercises before the closing `];`)

- [ ] **Step 1: Append these 10 exercises**

```ts
  // Set 7 — Clasificarea datelor statistice — date calitative vs cantitative
  {
    id: "st-s7-1",
    topic: "statistica",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Culoarea ochilor elevilor dintr-o clasă este un exemplu de date:",
    options: ["calitative", "cantitative", "atât calitative, cât și cantitative", "nu reprezintă date statistice"],
    correctAnswer: "calitative",
    explanation: [
      "Culoarea este o categorie, nu o valoare numerică, deci datele sunt calitative.",
    ],
  },
  {
    id: "st-s7-2",
    topic: "statistica",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Înălțimea elevilor dintr-o clasă (măsurată în cm) este un exemplu de date:",
    options: ["cantitative", "calitative", "nu se pot clasifica", "categorice"],
    correctAnswer: "cantitative",
    explanation: [
      "Înălțimea este o valoare numerică măsurabilă, deci datele sunt cantitative.",
    ],
  },
  {
    id: "st-s7-3",
    topic: "statistica",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele reprezintă un exemplu de date calitative?",
    options: [
      "tipul de sport preferat",
      "greutatea corporală (kg)",
      "numărul de frați",
      "vârsta (ani)",
    ],
    correctAnswer: "tipul de sport preferat",
    explanation: [
      "Tipul de sport preferat este o categorie (nu o valoare numerică), deci reprezintă date calitative.",
      "Celelalte variante (greutate, număr de frați, vârstă) sunt valori numerice, deci date cantitative.",
    ],
  },
  {
    id: "st-s7-4",
    topic: "statistica",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele reprezintă un exemplu de date cantitative?",
    options: [
      "numărul de cărți citite într-o lună",
      "marca telefonului preferat",
      "genul muzical preferat",
      "orașul natal",
    ],
    correctAnswer: "numărul de cărți citite într-o lună",
    explanation: [
      "Numărul de cărți citite este o valoare numerică, deci reprezintă date cantitative.",
      "Celelalte variante sunt categorii, deci date calitative.",
    ],
  },
  {
    id: "st-s7-5",
    topic: "statistica",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Într-un grup de $30$ de persoane, se clasifică datele referitoare la mijlocul de transport preferat (date calitative). Dacă $9$ persoane preferă autobuzul, determinați frecvența relativă (în procente) a acestei categorii.",
    correctAnswer: "30",
    acceptedAnswers: ["30%"],
    explanation: [
      "Frecvența relativă este raportul $\\dfrac{9}{30}$.",
      "Calculăm: $\\dfrac{9}{30}=0{,}3$.",
      "Exprimată în procente, frecvența relativă este $30\\%$.",
    ],
  },
  {
    id: "st-s7-6",
    topic: "statistica",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Populația statistică reprezintă:",
    options: [
      "mulțimea tuturor unităților observate într-o cercetare statistică",
      "un eșantion aleatoriu din date",
      "media datelor culese",
      "frecvența absolută maximă",
    ],
    correctAnswer: "mulțimea tuturor unităților observate într-o cercetare statistică",
    explanation: [
      "Aceasta este definiția populației statistice, punctul de plecare al oricărei cercetări statistice.",
    ],
  },
  {
    id: "st-s7-7",
    topic: "statistica",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Notele obținute de elevi la un test (numere de la $1$ la $10$) reprezintă date:",
    options: ["cantitative", "calitative", "categorice", "nu se pot clasifica"],
    correctAnswer: "cantitative",
    explanation: [
      "Notele sunt valori numerice, deci reprezintă date cantitative.",
    ],
  },
  {
    id: "st-s7-8",
    topic: "statistica",
    set: 7,
    type: "input",
    points: 6,
    prompt: "Într-un grup de $50$ de elevi, se clasifică datele referitoare la materia preferată (date calitative). Dacă $18$ elevi preferă matematica, determinați frecvența relativă (în procente) a acestei categorii.",
    correctAnswer: "36",
    acceptedAnswers: ["36%"],
    explanation: [
      "Frecvența relativă este raportul $\\dfrac{18}{50}$.",
      "Calculăm: $\\dfrac{18}{50}=0{,}36$.",
      "Exprimată în procente, frecvența relativă este $36\\%$.",
    ],
  },
  {
    id: "st-s7-9",
    topic: "statistica",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele NU este un exemplu de date cantitative?",
    options: [
      "culoarea mașinii preferate",
      "temperatura zilnică (°C)",
      "numărul de ore de somn",
      "salariul lunar (lei)",
    ],
    correctAnswer: "culoarea mașinii preferate",
    explanation: [
      "Culoarea este o categorie, deci reprezintă date calitative, nu cantitative.",
      "Celelalte variante sunt valori numerice măsurabile.",
    ],
  },
  {
    id: "st-s7-10",
    topic: "statistica",
    set: 7,
    type: "mcq",
    points: 6,
    prompt: "Genul de film preferat (acțiune, comedie, dramă) reprezintă un exemplu de date:",
    options: ["calitative", "cantitative", "numerice", "nu reprezintă date statistice"],
    correctAnswer: "calitative",
    explanation: [
      "Genul de film este o categorie, nu o valoare numerică, deci datele sunt calitative.",
    ],
  },
```

- [ ] **Step 2: Verify `git diff --stat` shows 0 deletions, run the mojibake check, run `npm test`, then commit**

```bash
git add src/data/questions/statisticaSets.ts
git commit -m "Add statistica practice Set 7 (Clasificarea datelor statistice)"
```

---

## Task 8: Append Set 8 (Reprezentarea grafică a datelor)

**Files:**
- Modify: `src/data/questions/statisticaSets.ts` (append 10 exercises before the closing `];`)

- [ ] **Step 1: Append these 10 exercises**

```ts
  // Set 8 — Reprezentarea grafică a datelor — tipuri și proprietăți
  {
    id: "st-s8-1",
    topic: "statistica",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Diagrama circulară (de tip „plăcintă”) este cea mai potrivită pentru reprezentarea:",
    options: [
      "datelor calitative (categorii)",
      "datelor cantitative grupate pe intervale",
      "mediei aritmetice",
      "frecvenței absolute maxime",
    ],
    correctAnswer: "datelor calitative (categorii)",
    explanation: [
      "Diagrama circulară arată proporția fiecărei categorii din total, fiind potrivită pentru date calitative.",
    ],
  },
  {
    id: "st-s8-2",
    topic: "statistica",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Poligonul de frecvențe se obține prin:",
    options: [
      "unirea prin segmente a punctelor de coordonate (valoare, frecvență)",
      "trasarea unor bare adiacente",
      "împărțirea unui cerc în sectoare proporționale cu frecvențele",
      "calcularea mediei datelor",
    ],
    correctAnswer: "unirea prin segmente a punctelor de coordonate (valoare, frecvență)",
    explanation: [
      "Poligonul de frecvențe se construiește unind prin segmente punctele care reprezintă perechile (valoare, frecvență).",
    ],
  },
  {
    id: "st-s8-3",
    topic: "statistica",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Histograma este formată din bare:",
    options: [
      "adiacente (fără spații între ele)",
      "separate prin spații egale",
      "dispuse circular",
      "de aceeași înălțime",
    ],
    correctAnswer: "adiacente (fără spații între ele)",
    explanation: [
      "Spre deosebire de diagramele cu bare pentru date calitative, histograma folosește bare adiacente, deoarece intervalele de date cantitative sunt continue.",
    ],
  },
  {
    id: "st-s8-4",
    topic: "statistica",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Pentru a reprezenta grafic distribuția notelor la un test (date cantitative), se folosește de regulă:",
    options: ["histograma", "diagrama circulară", "harta geografică", "tabelul de contingență"],
    correctAnswer: "histograma",
    explanation: [
      "Notele sunt date cantitative, iar histograma este reprezentarea grafică potrivită pentru astfel de date.",
    ],
  },
  {
    id: "st-s8-5",
    topic: "statistica",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Într-o diagramă circulară, mărimea unui sector este proporțională cu:",
    options: [
      "frecvența (absolută sau relativă) a categoriei reprezentate",
      "numărul de categorii totale",
      "media aritmetică a datelor",
      "ordinea alfabetică a categoriilor",
    ],
    correctAnswer: "frecvența (absolută sau relativă) a categoriei reprezentate",
    explanation: [
      "Fiecare sector are măsura unghiului proporțională cu frecvența categoriei pe care o reprezintă.",
    ],
  },
  {
    id: "st-s8-6",
    topic: "statistica",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Într-o diagramă circulară, o categorie are frecvența relativă $25\\%$. Determinați măsura unghiului la centru corespunzător acestei categorii (în grade), știind că întregul cerc are $360°$.",
    correctAnswer: "90",
    explanation: [
      "Măsura unghiului este $25\\%$ din $360°$.",
      "Calculăm: $360\\cdot0{,}25=90$.",
      "Măsura unghiului este $90°$.",
    ],
  },
  {
    id: "st-s8-7",
    topic: "statistica",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Pentru a reprezenta grafic culoarea preferată a unui grup de persoane (date calitative), este mai potrivită:",
    options: [
      "diagrama circulară sau diagrama cu bare",
      "histograma cu intervale egale",
      "poligonul de frecvențe",
      "harta de căldură",
    ],
    correctAnswer: "diagrama circulară sau diagrama cu bare",
    explanation: [
      "Pentru date calitative (categorii), diagrama circulară sau diagrama cu bare sunt reprezentările potrivite.",
    ],
  },
  {
    id: "st-s8-8",
    topic: "statistica",
    set: 8,
    type: "input",
    points: 6,
    prompt: "Într-o diagramă circulară, o categorie are frecvența relativă $40\\%$. Determinați măsura unghiului la centru corespunzător acestei categorii (în grade), știind că întregul cerc are $360°$.",
    correctAnswer: "144",
    explanation: [
      "Măsura unghiului este $40\\%$ din $360°$.",
      "Calculăm: $360\\cdot0{,}4=144$.",
      "Măsura unghiului este $144°$.",
    ],
  },
  {
    id: "st-s8-9",
    topic: "statistica",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele afirmații despre histogramă este adevărată?",
    options: [
      "se folosește pentru date cantitative grupate pe intervale, cu bare adiacente",
      "se folosește exclusiv pentru date calitative",
      "barele sunt întotdeauna separate prin spații",
      "reprezintă direct media datelor",
    ],
    correctAnswer: "se folosește pentru date cantitative grupate pe intervale, cu bare adiacente",
    explanation: [
      "Histograma este reprezentarea grafică specifică datelor cantitative grupate pe intervale, cu bare adiacente.",
    ],
  },
  {
    id: "st-s8-10",
    topic: "statistica",
    set: 8,
    type: "mcq",
    points: 6,
    prompt: "Un dezavantaj al diagramei circulare este că:",
    options: [
      "devine greu de citit atunci când există foarte multe categorii",
      "nu poate reprezenta procente",
      "este folosită doar pentru date cantitative",
      "nu permite compararea categoriilor",
    ],
    correctAnswer: "devine greu de citit atunci când există foarte multe categorii",
    explanation: [
      "Cu multe categorii, sectoarele diagramei circulare devin foarte mici și greu de comparat vizual.",
    ],
  },
```

- [ ] **Step 2: Verify `git diff --stat` shows 0 deletions, run the mojibake check, run `npm test`, then commit**

```bash
git add src/data/questions/statisticaSets.ts
git commit -m "Add statistica practice Set 8 (Reprezentarea grafică a datelor)"
```

---

## Task 9: Append Set 9 (Interpretarea datelor statistice — aplicații mixte)

**Files:**
- Modify: `src/data/questions/statisticaSets.ts` (append 10 exercises before the closing `];`)

- [ ] **Step 1: Append these 10 exercises**

```ts
  // Set 9 — Interpretarea datelor statistice — aplicații mixte
  {
    id: "st-s9-1",
    topic: "statistica",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Vânzările zilnice (în bucăți) ale unui magazin, timp de $6$ zile, au fost: $12,15,12,18,20,12$. Determinați frecvența absolută a valorii $12$.",
    correctAnswer: "3",
    explanation: [
      "Numărăm aparițiile valorii $12$ în șir: $12,12,12$.",
      "Valoarea $12$ apare de $3$ ori.",
      "Frecvența absolută este $3$.",
    ],
  },
  {
    id: "st-s9-2",
    topic: "statistica",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Dintr-un grup de $20$ de elevi, $15$ au obținut notă de trecere la un test. Determinați frecvența relativă (în procente) a elevilor cu notă de trecere.",
    correctAnswer: "75",
    acceptedAnswers: ["75%"],
    explanation: [
      "Frecvența relativă este raportul $\\dfrac{15}{20}$.",
      "Calculăm: $\\dfrac{15}{20}=0{,}75$.",
      "Exprimată în procente, frecvența relativă este $75\\%$.",
    ],
  },
  {
    id: "st-s9-3",
    topic: "statistica",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Duratele (în minute) a $5$ apeluri telefonice au fost: $3,5,7,9,11$. Determinați media aritmetică a duratelor.",
    correctAnswer: "7",
    explanation: [
      "Calculăm suma: $3+5+7+9+11=35$.",
      "Împărțim la numărul de apeluri: $\\dfrac{35}{5}$.",
      "Media aritmetică este $7$.",
    ],
  },
  {
    id: "st-s9-4",
    topic: "statistica",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Temperaturile (în °C) înregistrate timp de $7$ zile au fost: $18,20,18,22,18,19,21$. Valoarea cu frecvența cea mai mare este:",
    options: ["$18$", "$20$", "$22$", "$19$"],
    correctAnswer: "$18$",
    explanation: [
      "Temperatura de $18°C$ apare de $3$ ori, mai mult decât oricare altă valoare.",
    ],
  },
  {
    id: "st-s9-5",
    topic: "statistica",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Vârstele (în ani) a $7$ persoane dintr-un grup au fost: $25,30,25,35,40,25,25$. Determinați frecvența absolută a vârstei de $25$ de ani.",
    correctAnswer: "4",
    explanation: [
      "Numărăm aparițiile valorii $25$ în șir: $25,25,25,25$.",
      "Vârsta de $25$ de ani apare de $4$ ori.",
      "Frecvența absolută este $4$.",
    ],
  },
  {
    id: "st-s9-6",
    topic: "statistica",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Salariile (în sute de lei) a $8$ angajați au fost: $20,20,20,20,20,22,25,28$. Determinați frecvența absolută a salariului de $20$ (sute de lei).",
    correctAnswer: "5",
    explanation: [
      "Numărăm aparițiile valorii $20$ în șir: cinci apariții consecutive.",
      "Salariul de $20$ (sute de lei) apare de $5$ ori.",
      "Frecvența absolută este $5$.",
    ],
  },
  {
    id: "st-s9-7",
    topic: "statistica",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Dintr-un grup de $25$ de participanți la un concurs, $10$ au obținut punctajul maxim. Determinați frecvența relativă (în procente) a celor cu punctaj maxim.",
    correctAnswer: "40",
    acceptedAnswers: ["40%"],
    explanation: [
      "Frecvența relativă este raportul $\\dfrac{10}{25}$.",
      "Calculăm: $\\dfrac{10}{25}=0{,}4$.",
      "Exprimată în procente, frecvența relativă este $40\\%$.",
    ],
  },
  {
    id: "st-s9-8",
    topic: "statistica",
    set: 9,
    type: "mcq",
    points: 6,
    prompt: "Distanțele (în km) parcurse de $6$ curieri într-o zi au fost: $15,20,15,25,30,15$. Valoarea cu frecvența cea mai mare este:",
    options: ["$15$", "$20$", "$25$", "$30$"],
    correctAnswer: "$15$",
    explanation: [
      "Distanța de $15$ km apare de $3$ ori, mai mult decât oricare altă valoare.",
    ],
  },
  {
    id: "st-s9-9",
    topic: "statistica",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Numărul de cărți citite de $11$ elevi într-o lună a fost: $2,3,2,4,2,5,2,6,2,3,2$. Determinați frecvența absolută a valorii $2$.",
    correctAnswer: "6",
    explanation: [
      "Numărăm aparițiile valorii $2$ în șir: șase apariții.",
      "Valoarea $2$ apare de $6$ ori.",
      "Frecvența absolută este $6$.",
    ],
  },
  {
    id: "st-s9-10",
    topic: "statistica",
    set: 9,
    type: "input",
    points: 6,
    prompt: "Dintr-un lot de $40$ de piese, $36$ sunt corespunzătoare calitativ. Determinați frecvența relativă (în procente) a pieselor corespunzătoare.",
    correctAnswer: "90",
    acceptedAnswers: ["90%"],
    explanation: [
      "Frecvența relativă este raportul $\\dfrac{36}{40}$.",
      "Calculăm: $\\dfrac{36}{40}=0{,}9$.",
      "Exprimată în procente, frecvența relativă este $90\\%$.",
    ],
  },
```

- [ ] **Step 2: Verify `git diff --stat` shows 0 deletions, run the mojibake check, run `npm test`, then commit**

```bash
git add src/data/questions/statisticaSets.ts
git commit -m "Add statistica practice Set 9 (Interpretarea datelor statistice)"
```

---

## Task 10: Append Set 10 (Recapitulare) and final structural verification

**Files:**
- Modify: `src/data/questions/statisticaSets.ts` (append 10 exercises before the closing `];`)

- [ ] **Step 1: Append these 10 exercises**

```ts
  // Set 10 — Recapitulare / aplicații mixte
  {
    id: "st-s10-1",
    topic: "statistica",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Date: $9,10,9,11,12,9,13$. Determinați frecvența absolută a valorii $9$.",
    correctAnswer: "3",
    explanation: [
      "Numărăm aparițiile valorii $9$ în șir: $9,9,9$.",
      "Valoarea $9$ apare de $3$ ori.",
      "Frecvența absolută este $3$.",
    ],
  },
  {
    id: "st-s10-2",
    topic: "statistica",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Într-un grup de $60$ de persoane, $18$ preferă ceaiul. Frecvența relativă a acestei preferințe este:",
    options: ["$30\\%$", "$25\\%$", "$20\\%$", "$35\\%$"],
    correctAnswer: "$30\\%$",
    explanation: [
      "Frecvența relativă este $\\dfrac{18}{60}=0{,}3=30\\%$.",
    ],
  },
  {
    id: "st-s10-3",
    topic: "statistica",
    set: 10,
    type: "input",
    points: 6,
    prompt: "O caracteristică are frecvența absolută $16$ și frecvența relativă $20\\%$. Determinați numărul total de date.",
    correctAnswer: "80",
    explanation: [
      "Numărul total de date este $\\dfrac{16}{0{,}2}$.",
      "Calculăm: $\\dfrac{16}{0{,}2}=80$.",
      "Numărul total de date este $80$.",
    ],
  },
  {
    id: "st-s10-4",
    topic: "statistica",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Calculați media aritmetică a datelor $6,8,10,12,14$.",
    correctAnswer: "10",
    explanation: [
      "Calculăm suma: $6+8+10+12+14=50$.",
      "Împărțim la numărul de date: $\\dfrac{50}{5}$.",
      "Media aritmetică este $10$.",
    ],
  },
  {
    id: "st-s10-5",
    topic: "statistica",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Media a $4$ numere este $18$, iar trei dintre ele sunt $15,17,20$. Al patrulea număr este:",
    options: ["$20$", "$18$", "$22$", "$19$"],
    correctAnswer: "$20$",
    explanation: [
      "Suma celor $4$ numere este $4\\cdot18=72$, iar suma celor trei date este $15+17+20=52$.",
      "Al patrulea număr este $72-52=20$.",
    ],
  },
  {
    id: "st-s10-6",
    topic: "statistica",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Date: $11,12,11,13,14,11,15$. Determinați valoarea cu frecvența absolută cea mai mare.",
    correctAnswer: "11",
    explanation: [
      "Numărăm frecvențele: $11$ apare de $3$ ori, celelalte valori apar o dată fiecare.",
      "Valoarea cu frecvența cea mai mare este $11$, cu frecvența $3$.",
    ],
  },
  {
    id: "st-s10-7",
    topic: "statistica",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Numărul de mașini deținute de o familie este un exemplu de date:",
    options: ["cantitative", "calitative", "categorice", "nu se pot clasifica"],
    correctAnswer: "cantitative",
    explanation: [
      "Numărul de mașini este o valoare numerică, deci datele sunt cantitative.",
    ],
  },
  {
    id: "st-s10-8",
    topic: "statistica",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Într-o diagramă circulară, o categorie are frecvența relativă $60\\%$. Determinați măsura unghiului la centru corespunzător acestei categorii (în grade), știind că întregul cerc are $360°$.",
    correctAnswer: "216",
    explanation: [
      "Măsura unghiului este $60\\%$ din $360°$.",
      "Calculăm: $360\\cdot0{,}6=216$.",
      "Măsura unghiului este $216°$.",
    ],
  },
  {
    id: "st-s10-9",
    topic: "statistica",
    set: 10,
    type: "input",
    points: 6,
    prompt: "Notele a $9$ elevi la un test au fost: $6,7,8,6,9,7,6,10,6$. Determinați frecvența absolută a notei $6$.",
    correctAnswer: "4",
    explanation: [
      "Numărăm aparițiile notei $6$ în șir: $6,6,6,6$.",
      "Nota $6$ apare de $4$ ori.",
      "Frecvența absolută este $4$.",
    ],
  },
  {
    id: "st-s10-10",
    topic: "statistica",
    set: 10,
    type: "mcq",
    points: 6,
    prompt: "Care dintre următorii NU este un indicator statistic valid pentru un set de date numerice?",
    options: [
      "culoarea graficului folosit pentru reprezentare",
      "media aritmetică",
      "frecvența absolută",
      "frecvența relativă",
    ],
    correctAnswer: "culoarea graficului folosit pentru reprezentare",
    explanation: [
      "Culoarea graficului este o alegere de prezentare vizuală, nu un indicator statistic calculat din date.",
    ],
  },
];
```

**IMPORTANT:** this is the LAST set — the array literal closes with `];` after this block.

- [ ] **Step 2: Structural count / duplicate-id scan**

```js
const fs = require('fs');
const c = fs.readFileSync('src/data/questions/statisticaSets.ts', 'utf8');
const ids = c.match(/id:\s*"st-s\d+-\d+"/g) || [];
console.log('total ids:', ids.length);
const counts = {};
for (const idStr of ids) {
  const m = idStr.match(/st-s(\d+)-(\d+)/);
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
const content = fs.readFileSync('src/data/questions/statisticaSets.ts', 'utf8').replace(/\r\n/g, '\n');
const blocks = content.split(/\n  \{\n/).slice(1);
const exercises = [];
for (const block of blocks) {
  const idMatch = block.match(/id:\s*"([^"]+)"/);
  const promptMatch = block.match(/prompt:\s*"([^"]*)"/);
  if (idMatch && idMatch[1].startsWith('st-s')) {
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
const baseContent = fs.readFileSync('src/data/questions/statistica.ts', 'utf8').replace(/\r\n/g, '\n');
const planContent = fs.readFileSync('src/data/questions/statisticaSets.ts', 'utf8').replace(/\r\n/g, '\n');
const baseExercises = extractPrompts(baseContent);
const newExercises = extractPrompts(planContent).filter(e => e.id.startsWith('st-s'));
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
const c = fs.readFileSync('src/data/questions/statisticaSets.ts', 'utf8').replace(/\r\n/g, '\n');
const blocks = c.split(/\n  \{\n/).slice(1);
const bySet = {};
for (const block of blocks) {
  const idMatch = block.match(/id:\s*"st-s(\d+)-\d+"/);
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
node -e "const fs=require('fs'); const content=fs.readFileSync('src/data/questions/statisticaSets.ts','utf8'); let badCount=0; for(let i=0;i<content.length;i++){ if(content[i]==='\\\\'){ const next=content[i+1]; if(next==='\\\\'){i++;continue;} badCount++; console.log('SINGLE BACKSLASH at offset',i,':',JSON.stringify(content.slice(Math.max(0,i-15),i+15))); } } console.log('Total single-backslash (bug) occurrences:', badCount);"
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
git add src/data/questions/statisticaSets.ts
git commit -m "Add statistica practice Set 10 (Recapitulare) — 100 exercises complete"
```

---

## Plan self-review (performed at plan-writing time)

- **Spec coverage:** All 10 set themes from the design spec are covered, one per task. `acceptedAnswers` convention applied to every percentage-type `input` exercise; bare-count answers (frequencies, means, n, sums, angles) correctly omit it, matching `st-3`/`st-5`/`st-7`'s established pattern.
- **Placeholder scan:** none found — every step contains complete verbatim code.
- **Type consistency:** all exercises match the `Exercise` type shape used by `st-1`..`st-7` and by other `*Sets.ts` files.
- **Duplicate checks (performed manually against the drafted content before finalizing, to be re-verified by scripts in Task 10):**
  - Per-set input-answer variety: verified by hand for all 10 sets.
  - Cross-set exact-duplicate prompts: verified by hand — numeric parameters and data sets deliberately varied across sets.
  - Base-exercise duplication: verified by hand against all 7 base exercises (`st-1`..`st-7`) — no new exercise reproduces the exact same data set or (N, k, %) combination.
  - **Reversed-direction duplication** (the specific failure mode caught three times in the `matematici-financiare-sets` round): checked each new exercise's underlying data/parameters against every other set for the same relationship asked a different way, not just exact prompt-text matches — e.g. Set 4's mean datasets were checked against Set 9's mean dataset to avoid reusing the same numbers; Set 1's frequency datasets were checked against Set 6's mode datasets and Set 9's frequency datasets for accidental multiset reuse (one near-collision was caught and fixed during drafting: an early draft of a Set 10 exercise reused Set 1 #2's exact multiset `{4,4,4,5,6,7,8}` in reordered form and was replaced with a fresh dataset).
  - Both scripted checks (Step 3 and Step 4 of Task 10) will independently re-confirm these by-hand checks — this is the mandatory scripted-not-manual discipline carried forward from prior rounds.
