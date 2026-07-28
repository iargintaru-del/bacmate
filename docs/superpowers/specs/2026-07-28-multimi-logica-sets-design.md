# Mulțimi și logică matematică — practice sets — Design

## Purpose
`multimi-logica` (Mulțimi și logică matematică, one of the ninth-grade foundation chapters added earlier) currently has theory + 7 base exercises (`ml-1`..`ml-7`) but no practice-set bank — the ninth-grade round explicitly scoped that out ("theory + base exercises only, no practice sets yet"). Every other topic that has practice sets follows a 10-set × 10-exercise (100 total) convention (`legi-compozitie`, `integrale`, `limite`, `derivate`, `combinatorica`, etc.). This closes that gap for `multimi-logica`, bringing it to parity.

## Scope
Add `src/data/questions/multimiLogicaSets.ts`, exporting `multimiLogicaSetExercises: Exercise[]`, spread into `ALL_EXERCISES` in `src/data/index.ts`. 10 sets of 10 exercises each (`set: 1` through `set: 10`), ids `ml-s1-1`..`ml-s10-10`.

No changes to `src/data/theory/multimiLogica.ts` or the existing 7 base exercises in `src/data/questions/multimiLogica.ts`. No new `Topic` entries — `multimi-logica` already exists and is already wired up.

## Set breakdown
Drawn from the topic's 5 existing theory concepts (Operații cu mulțimi, Intervale de numere reale, Propoziții și predicate, Operatori logici, Inducția matematică), split into 10 thematically focused sets, ending with a recap set — the same structure used by `legiCompozitieSets.ts`:

| Set | Theme |
|---|---|
| 1 | Operații cu mulțimi — reuniune, intersecție |
| 2 | Diferență de mulțimi și complementară |
| 3 | Incluziune, submulțimi, mulțimea părților |
| 4 | Intervale de numere reale — operații cu intervale |
| 5 | Propoziții și valori de adevăr |
| 6 | Predicate și cuantificatori ($\forall$, $\exists$) |
| 7 | Operatori logici — negație, conjuncție, disjuncție |
| 8 | Implicație și echivalență logică |
| 9 | Inducția matematică |
| 10 | Recapitulare / aplicații mixte |

## Content style
Matches `ml-1`..`ml-7`'s existing style exactly:
- 6 points per exercise, mix of `input`/`mcq` (roughly even split per set, matching the base exercises' ~40/60 input/mcq ratio).
- Inline `$...$` LaTeX (never `$$...$$` — `multimiLogica.ts` questions use inline math throughout).
- Romanian typographic quotes „..." for quoted logical statements (e.g. „toate numerele naturale sunt pare"), matching `ml-4`'s existing style.
- Every mcq's `correctAnswer` present character-for-character in `options`, with all 4 options genuinely distinct claims/values — the recurring bug class from every prior round of this project.

## Integration points
- `setNumbersForTopic("multimi-logica")`/`exercisesForSet` (in `src/data/index.ts`) are already generic over any `set` number present in `ALL_EXERCISES` — no changes needed there beyond spreading the new array in.
- `src/data/index.ts`: add `import { multimiLogicaSetExercises } from "./questions/multimiLogicaSets";` and spread it into `ALL_EXERCISES` (this is the one small addition needed, since this is a brand-new file rather than an extension of an existing one — unlike the last round's Set-11 additions, which appended to already-imported files).
- No `formulaSheet.ts` changes — practice sets don't add new formulas.
- No `src/types.ts` changes.

## Exam integration
Identical to every prior round: `buildExam` draws Subiectul I from the full `ALL_EXERCISES` pool via `pickRandom`, so the new set exercises become eligible there automatically. `buildVariantExam` (the 25 fixed variants) is unaffected. The topic's Set Picker page automatically shows 10 sets once these exist (generic over `setNumbersForTopic`).

## Non-goals
- No changes to the base theory or base exercises.
- No new Subiectul II/III `Problem` entries.
- No changes to `examVariants.ts`.
- No new `Topic` entries.
