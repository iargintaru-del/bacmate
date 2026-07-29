# Funcția de gradul al II-lea — practice sets — Design

## Purpose
`functia-gradul-2` (Funcția de gradul al II-lea, one of the ninth-grade foundation chapters added earlier) currently has theory + 7 base exercises (`g2-1`..`g2-7`) but no practice-set bank, per that round's explicit scope decision. Every topic that has practice sets follows a 10-set × 10-exercise (100 total) convention. This closes that gap for `functia-gradul-2`, matching the pattern just completed for `multimi-logica` and `functia-gradul-1`.

## Scope
Add `src/data/questions/functiaGradul2Sets.ts`, exporting `functiaGradul2SetExercises: Exercise[]`, spread into `ALL_EXERCISES` in `src/data/index.ts`. 10 sets of 10 exercises each (`set: 1` through `set: 10`), ids `g2-s1-1`..`g2-s10-10`.

No changes to `src/data/theory/functiaGradul2.ts` or the existing 7 base exercises in `src/data/questions/functiaGradul2.ts`. No new `Topic` entries — `functia-gradul-2` already exists and is already wired up.

## Set breakdown
Drawn from the topic's 6 existing theory concepts (Definiție și reprezentare grafică, Vârful parabolei, Rezolvarea ecuației de gradul al II-lea, Relațiile lui Viète, Semnul funcției de gradul al II-lea, Inecuații de gradul al II-lea):

| Set | Theme |
|---|---|
| 1 | Calculul valorilor funcției ($f(x_0)$ pentru diverse $x_0$) |
| 2 | Discriminantul și numărul de soluții |
| 3 | Rezolvarea ecuației de gradul al II-lea |
| 4 | Vârful parabolei |
| 5 | Relațiile lui Viète (sumă și produs) |
| 6 | Scrierea ecuației cunoscând rădăcinile (Viète invers) |
| 7 | Semnul funcției de gradul al II-lea |
| 8 | Inecuații de gradul al II-lea |
| 9 | Intersecția cu axele de coordonate |
| 10 | Recapitulare / aplicații mixte |

## Content style
Matches `g2-1`..`g2-7`'s existing style exactly:
- 6 points per exercise, mix of `input`/`mcq` (roughly even split per set).
- Inline `$...$` LaTeX (never `$$...$$`).
- Every mcq's `correctAnswer` present character-for-character in `options`, with all 4 options genuinely distinct claims/values.
- **Answer-variety discipline**: the prior round (`functia-gradul-1-sets`) drew a Minor finding for several exercises within the same set sharing the same numeric answer, letting a student pattern-match without computing. This round deliberately varies numeric answers across exercises within each set (distinct discriminants, distinct roots, distinct vertex coordinates, etc.), not just distinct problem statements.

## Integration points
- `setNumbersForTopic("functia-gradul-2")`/`exercisesForSet` (in `src/data/index.ts`) are already generic over any `set` number present in `ALL_EXERCISES` — no changes needed there beyond spreading the new array in.
- `src/data/index.ts`: add `import { functiaGradul2SetExercises } from "./questions/functiaGradul2Sets";` and spread it into `ALL_EXERCISES`, immediately after the existing `...functiaGradul2Exercises,` entry.
- No `formulaSheet.ts` changes.
- No `src/types.ts` changes.

## Lessons carried forward from prior *Sets rounds
- **LaTeX escaping**: every LaTeX command in a TS string literal needs a double backslash (`\\`). Two implementer failures occurred in the `multimi-logica-sets` round (one silently corrupted diacritics into mojibake, one got stuck and gave up); zero occurred in the `functia-gradul-1-sets` round after baking encoding-safety checks into every dispatch from the start. Continue that practice.
- Every task dispatch must bake in an explicit `git diff --stat` (0 deletions expected) check and a mojibake-marker scan (Ä/È/Ã) before every commit, and forbid external scripts for generating file content.
- If any implementer produces a non-pure-append diff or gets blocked, the controller should apply that task's content directly (from this plan's verbatim text) rather than risk repeated failed attempts.

## Exam integration
Identical to prior rounds: `buildExam` draws Subiectul I from the full `ALL_EXERCISES` pool via `pickRandom`, so the new set exercises become eligible there automatically. `buildVariantExam` (the 25 fixed variants) is unaffected. The topic's Set Picker page automatically shows 10 sets once these exist.

## Non-goals
- No changes to the base theory or base exercises.
- No new Subiectul II/III `Problem` entries.
- No changes to `examVariants.ts`.
- No new `Topic` entries.
