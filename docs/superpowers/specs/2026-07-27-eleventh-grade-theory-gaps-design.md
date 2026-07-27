# Eleventh-grade theory gaps — Design

## Purpose
Close the two 11th-grade curriculum gaps identified against the official **Programa M_tehnologic** (the Bacalaureat syllabus matching BacMate's M2 track, `CLASA a XI-a - 3 ore/spt.` section). Unlike the ninth- and tenth-grade rounds, 11th grade's content (Matrice, Determinanți, Sisteme de ecuații liniare, Limite de funcții, Funcții derivabile) already maps 1:1 onto 5 existing BacMate topics (`matrice`, `determinanti`, `sisteme`, `limite`, `derivate`), and most of that content — including asymptotes and continuity — is already covered across those topics' base theory and practice-set banks (`limiteSets.ts`, `derivateSets.ts`). Two specific pieces of syllabus content are absent anywhere in the app:

- **Regulile lui l'Hospital** (for `0/0` and `∞/∞` indeterminate forms)
- **Proprietatea lui Darboux** (a continuous function with a sign change on `[a,b]` has a root in `(a,b)`)

This round closes those two gaps only. No new `Topic` entries, no new chapters on the Home page.

## Scope
Extend two existing topics with one new concept + worked example(s) + one new base exercise each:

| Gap | Topic extended | Rationale |
|---|---|---|
| l'Hospital's rule | `derivate` | Programa places it directly after derivative rules ("Operații cu funcții derivabile... Regulile lui l'Hospital"); it's computed via derivatives. |
| Proprietatea lui Darboux | `limite` | BacMate already treats continuity as part of the `limite` topic (see `limiteSets.ts` Set 8 — "Continuitate folosind limite"); Darboux is a continuity property. |

Out of scope: new `Topic` entries, new practice-set (`*Sets.ts`) content, new Subiectul II/III `Problem` entries, any change to the 25 fixed `examVariants.ts` variants, and any other 11th-grade content (already covered elsewhere).

## Content

### `src/data/theory/derivate.ts` — new concept
**Heading:** "Regula lui l'Hospital"
**Body:** states the rule for `0/0` and `∞/∞` forms: if `f` and `g` are derivable near `x₀`, `g'(x) ≠ 0`, and `lim f'(x)/g'(x)` exists, then `lim f(x)/g(x) = lim f'(x)/g'(x)`.
**New worked examples (appended to existing 3):**
1. `lim_{x→0} (e^x - 1)/x` — `0/0` form; derivative of numerator is `e^x`, of denominator is `1`; limit is `e^0/1 = 1`.
2. `lim_{x→∞} ln(x)/x` — `∞/∞` form; derivative of numerator is `1/x`, of denominator is `1`; limit is `0`.

### `src/data/questions/derivate.ts` — new exercise `dv-5`
Input-type exercise: compute `lim_{x→0} (e^x - 1)/x` via l'Hospital's rule. `correctAnswer: "1"`. 6 points, explanation walks through the rule application matching the theory example.

### `src/data/formulaSheet.ts` — new entry in the existing `derivate` chapter
```ts
{
  label: "Regula lui l'Hospital",
  latex: "\\lim \\dfrac{f(x)}{g(x)} = \\lim \\dfrac{f'(x)}{g'(x)} \\text{ (pentru cazurile } \\tfrac{0}{0} \\text{ sau } \\tfrac{\\infty}{\\infty}\\text{)}",
  plain: "lim f(x)/g(x) = lim f'(x)/g'(x)  (pentru cazurile 0/0 sau ∞/∞)",
}
```
Darboux is an existence theorem, not an algebraic formula, so it is deliberately **not** added to the formula sheet. After this edit, `npm run generate:formulas` must be run once and both `public/formule-bacalaureat.pdf`/`.docx` committed, per that file's own header-comment contract. Since no new `Topic`/chapter is added this round, `formulaSheet.test.ts`'s topic-order invariant is untouched — this is a same-chapter content addition, not a new chapter.

### `src/data/theory/limite.ts` — new concept
**Heading:** "Proprietatea lui Darboux"
**Body:** states the property: if `f` is continuous on `[a,b]` and `f(a)·f(b) < 0`, then there exists `c ∈ (a,b)` such that `f(c) = 0` — explicitly notes it guarantees *existence*, not uniqueness, of a root.
**New worked example (appended to existing 3):** show `f(x) = x³ - 3x + 1` has a root in `(0,1)`: `f` is continuous (polynomial), `f(0) = 1 > 0`, `f(1) = -1 < 0`, so by Darboux there's a root in `(0,1)`.

### `src/data/questions/limite.ts` — new exercise `lm-5`
mcq-type exercise: "Fie $f$ o funcție continuă pe $[a,b]$ cu $f(a)\cdot f(b)<0$. Conform proprietății lui Darboux, ecuația $f(x)=0$:" with options including the correct "are cel puțin o soluție în $(a,b)$" and a deliberate distractor "are exact o soluție în $(a,b)$" (tests the existence-vs-uniqueness distinction). 6 points.

## Integration points
- `src/data/theory/derivate.ts` and `src/data/theory/limite.ts`: append new `concepts` and `examples` entries to the existing `TheorySection` objects (no structural change).
- `src/data/questions/derivate.ts` and `src/data/questions/limite.ts`: append `dv-5` and `lm-5` to the existing `Exercise[]` arrays (ids verified not to collide with any existing id across the codebase).
- `src/data/formulaSheet.ts`: append one entry to the existing `derivate` chapter's formula array.
- No changes to `src/types.ts`, `src/data/index.ts`'s `TOPICS`/`TOPIC_LABELS`, or `src/data/theory/index.ts` — both topics already exist and are already registered.

## Exam integration
Identical to prior rounds: `buildExam` draws Subiectul I from the full `ALL_EXERCISES` pool via `pickRandom`, so `dv-5` and `lm-5` become eligible there automatically. `buildVariantExam` (the 25 fixed variants) is unaffected.

## Non-goals
- No new `Topic` entries or Home-page chapters.
- No new practice-set (`*Sets.ts`) entries.
- No new Subiectul II/III `Problem` entries.
- No changes to `examVariants.ts`.
- No Darboux entry in `FORMULA_SHEET` (not a formula).
