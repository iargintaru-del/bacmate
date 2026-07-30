# Șiruri — practice sets — Design

## Purpose
`siruri` (Șiruri — arithmetic and geometric progressions, one of the ninth-grade foundation chapters added earlier) currently has theory + 7 base exercises (`sr-1`..`sr-7`) but no practice-set bank, per that round's explicit scope decision. Every topic that has practice sets follows a 10-set × 10-exercise (100 total) convention. This closes that gap for `siruri`, matching the pattern just completed for `multimi-logica`, `functia-gradul-1`, and `functia-gradul-2`.

## Scope
Add `src/data/questions/siruriSets.ts`, exporting `siruriSetExercises: Exercise[]`, spread into `ALL_EXERCISES` in `src/data/index.ts`. 10 sets of 10 exercises each (`set: 1` through `set: 10`), ids `sr-s1-1`..`sr-s10-10` (matching the existing base-exercise id prefix `sr`, not `sir`).

No changes to `src/data/theory/siruri.ts` or the existing 7 base exercises in `src/data/questions/siruri.ts`. No new `Topic` entries — `siruri` already exists and is already wired up.

## Set breakdown
Drawn from the topic's 6 existing theory concepts (Progresia aritmetică — definiție și termenul general, Suma primilor n termeni ai unei progresii aritmetice, Condiția ca trei numere să fie în progresie aritmetică, Progresia geometrică — definiție și termenul general, Suma primilor n termeni ai unei progresii geometrice, Condiția ca trei numere să fie în progresie geometrică):

| Set | Theme |
|---|---|
| 1 | Termenul general al progresiei aritmetice |
| 2 | Suma primilor $n$ termeni (progresie aritmetică) |
| 3 | Condiția ca trei numere să fie în progresie aritmetică / determinarea rației |
| 4 | Termenul general al progresiei geometrice |
| 5 | Suma primilor $n$ termeni (progresie geometrică) |
| 6 | Condiția ca trei numere să fie în progresie geometrică / determinarea rației |
| 7 | Determinarea lui $a_1$ și $r$ din condiții date |
| 8 | Determinarea lui $b_1$ și $q$ din condiții date |
| 9 | Comparații și aplicații mixte AP vs GP |
| 10 | Recapitulare / aplicații mixte |

## Content style
Matches `sr-1`..`sr-7`'s existing style exactly:
- 6 points per exercise, mix of `input`/`mcq` (roughly even split per set).
- Inline `$...$` LaTeX (never `$$...$$`).
- Every mcq's `correctAnswer` present character-for-character in `options`, with all 4 options genuinely distinct claims/values.
- **Answer-variety discipline** (carried forward from the `functia-gradul-1-sets` round's final review finding, and successfully maintained with zero findings through the `functia-gradul-2-sets` round): within each 10-exercise set, all `input`-type numeric answers must be pairwise distinct, so a student can't pattern-match a repeated answer without computing.
- **Content-duplication discipline** (new — carried forward from the `functia-gradul-2-sets` round's final review Minor finding, where two set exercises coincidentally reused the exact same function/coefficients and answer as pre-existing base exercises): when drafting exercises, cross-check chosen numeric parameters (e.g. $a_1$, $r$, $b_1$, $q$) against the 7 existing base exercises (`sr-1`..`sr-7`) to avoid reproducing an identical problem. This check happens at plan-writing time, not implementation time.

## Integration points
- `setNumbersForTopic("siruri")`/`exercisesForSet` (in `src/data/index.ts`) are already generic over any `set` number present in `ALL_EXERCISES` — no changes needed there beyond spreading the new array in.
- `src/data/index.ts`: add `import { siruriSetExercises } from "./questions/siruriSets";` and spread it into `ALL_EXERCISES`, immediately after the existing `...siruriExercises,` entry.
- No `formulaSheet.ts` changes.
- No `src/types.ts` changes.

## Lessons carried forward from prior *Sets rounds
- **LaTeX escaping**: every LaTeX command in a TS string literal needs a double backslash (`\\`). Two implementer failures occurred in the `multimi-logica-sets` round (one silently corrupted diacritics into mojibake, one got stuck and gave up); zero occurred in the `functia-gradul-1-sets` and `functia-gradul-2-sets` rounds after baking encoding-safety checks into every dispatch from the start. Continue that practice here — every task dispatch below bakes them in.
- Every task dispatch must bake in an explicit `git diff --stat` (0 deletions expected) check and a mojibake-marker scan (Ä/È/Ã) before every commit, and forbid external scripts for generating file content.
- If any implementer produces a non-pure-append diff or gets blocked, the controller should apply that task's content directly (from this plan's verbatim text) rather than risk repeated failed attempts.
- **Romanian spelling**: the `functia-gradul-2-sets` round's final review caught a 5× misspelling ("abciselor" instead of "absciselor") that no automated check (backslash scan, mojibake scan, typecheck, test suite) could see. The plan-writing step and every task/final review should visually proofread Romanian mathematical terminology, especially recurring/repeated phrases across a set.

## Exam integration
Identical to prior rounds: `buildExam` draws Subiectul I from the full `ALL_EXERCISES` pool via `pickRandom`, so the new set exercises become eligible there automatically. `buildVariantExam` (the 25 fixed variants) is unaffected. The topic's Set Picker page automatically shows 10 sets once these exist.

## Non-goals
- No changes to the base theory or base exercises.
- No new Subiectul II/III `Problem` entries.
- No changes to `examVariants.ts`.
- No new `Topic` entries.
