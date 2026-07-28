# Funcția de gradul I — practice sets — Design

## Purpose
`functia-gradul-1` (Funcția de gradul I, one of the ninth-grade foundation chapters added earlier) currently has theory + 7 base exercises (`g1-1`..`g1-7`) but no practice-set bank, per that round's explicit scope decision. Every topic that has practice sets follows a 10-set × 10-exercise (100 total) convention. This closes that gap for `functia-gradul-1`, matching the pattern just completed for `multimi-logica`.

## Scope
Add `src/data/questions/functiaGradul1Sets.ts`, exporting `functiaGradul1SetExercises: Exercise[]`, spread into `ALL_EXERCISES` in `src/data/index.ts`. 10 sets of 10 exercises each (`set: 1` through `set: 10`), ids `g1-s1-1`..`g1-s10-10`.

No changes to `src/data/theory/functiaGradul1.ts` or the existing 7 base exercises in `src/data/questions/functiaGradul1.ts`. No new `Topic` entries — `functia-gradul-1` already exists and is already wired up.

## Set breakdown
Drawn from the topic's 5 existing theory concepts (Definiție și reprezentare grafică, Intersecția cu axele de coordonate, Monotonia funcției de gradul I, Semnul funcției de gradul I, Poziția relativă a două drepte):

| Set | Theme |
|---|---|
| 1 | Calculul valorilor funcției ($f(x_0)$ pentru diverse $x_0$) |
| 2 | Rezolvarea ecuațiilor de gradul I ($ax+b=0$) |
| 3 | Rezolvarea inecuațiilor de gradul I ($ax+b\gtrless0$) |
| 4 | Monotonia funcției de gradul I |
| 5 | Intersecția cu axele de coordonate |
| 6 | Semnul funcției de gradul I |
| 7 | Determinarea funcției din condiții date |
| 8 | Poziția relativă a două drepte |
| 9 | Puncte de intersecție a două drepte |
| 10 | Recapitulare / aplicații mixte |

## Content style
Matches `g1-1`..`g1-7`'s existing style exactly:
- 6 points per exercise, mix of `input`/`mcq` (roughly even split per set).
- Inline `$...$` LaTeX (never `$$...$$` — `functiaGradul1.ts` questions use inline math throughout).
- Every mcq's `correctAnswer` present character-for-character in `options`, with all 4 options genuinely distinct claims/values — the recurring bug class from every prior round of this project.

## Integration points
- `setNumbersForTopic("functia-gradul-1")`/`exercisesForSet` (in `src/data/index.ts`) are already generic over any `set` number present in `ALL_EXERCISES` — no changes needed there beyond spreading the new array in.
- `src/data/index.ts`: add `import { functiaGradul1SetExercises } from "./questions/functiaGradul1Sets";` and spread it into `ALL_EXERCISES`, immediately after the existing `...functiaGradul1Exercises,` entry.
- No `formulaSheet.ts` changes.
- No `src/types.ts` changes.

## Lessons carried forward from the multimi-logica-sets round
- **LaTeX escaping**: every LaTeX command in a TS string literal needs a double backslash (`\\`). A prior round's implementer subagent(s) twice failed on this — one silently corrupted the whole file's Romanian diacritics into mojibake, another got stuck and gave up. Every task dispatch must bake in an explicit `git diff --stat` (0 deletions expected) check and a mojibake-marker scan (Ä/È/Ã) before every commit, and forbid external scripts for generating file content.
- If any implementer produces a non-pure-append diff or gets blocked, the controller should apply that task's content directly (from this plan's verbatim text) rather than risk repeated failed attempts — this proved reliable twice in the prior round.

## Exam integration
Identical to prior rounds: `buildExam` draws Subiectul I from the full `ALL_EXERCISES` pool via `pickRandom`, so the new set exercises become eligible there automatically. `buildVariantExam` (the 25 fixed variants) is unaffected. The topic's Set Picker page automatically shows 10 sets once these exist.

## Non-goals
- No changes to the base theory or base exercises.
- No new Subiectul II/III `Problem` entries.
- No changes to `examVariants.ts`.
- No new `Topic` entries.
