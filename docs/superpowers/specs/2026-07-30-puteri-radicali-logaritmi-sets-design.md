# Puteri, radicali și logaritmi — practice sets — Design

## Purpose
`puteri-radicali-logaritmi` (Puteri, radicali și logaritmi, one of the tenth-grade foundation chapters added earlier) currently has theory + 7 base exercises (`pl-1`..`pl-7`) but no practice-set bank, per that round's explicit scope decision. Every topic that has practice sets follows a 10-set × 10-exercise (100 total) convention. This closes that gap for `puteri-radicali-logaritmi`, matching the pattern just completed for `multimi-logica`, `functia-gradul-1`, `functia-gradul-2`, and `siruri`.

## Scope
Add `src/data/questions/puteriRadicaliLogaritmiSets.ts`, exporting `puteriRadicaliLogaritmiSetExercises: Exercise[]`, spread into `ALL_EXERCISES` in `src/data/index.ts`. 10 sets of 10 exercises each (`set: 1` through `set: 10`), ids `pl-s1-1`..`pl-s10-10` (matching the existing base-exercise id prefix `pl`).

No changes to `src/data/theory/puteriRadicaliLogaritmi.ts` or the existing 7 base exercises in `src/data/questions/puteriRadicaliLogaritmi.ts`. No new `Topic` entries — `puteri-radicali-logaritmi` already exists and is already wired up.

## Set breakdown
Drawn from the topic's 5 existing theory concepts (Puteri cu exponent rațional, Puteri cu exponent real, Radicali — proprietăți, Logaritmi — definiție și proprietăți, Medii):

| Set | Theme |
|---|---|
| 1 | Puteri cu exponent rațional — calcul ($a^{p/q}$) |
| 2 | Puteri cu exponent rațional — proprietăți (simplificare exponenți) |
| 3 | Puteri cu exponent real — monotonie și comparații |
| 4 | Radicali — proprietăți (înmulțire/împărțire radicali) |
| 5 | Radicali — simplificare și raționalizarea numitorului |
| 6 | Logaritmi — calcul direct |
| 7 | Logaritmi — proprietăți (sumă/diferență/putere) |
| 8 | Logaritmi — cazuri particulare și aplicații |
| 9 | Medii (aritmetică, geometrică, ponderată, armonică) |
| 10 | Recapitulare / aplicații mixte |

## Content style
Matches `pl-1`..`pl-7`'s existing style exactly:
- 6 points per exercise, mix of `input`/`mcq` (roughly even split per set).
- Inline `$...$` LaTeX (never `$$...$$`).
- Every mcq's `correctAnswer` present character-for-character in `options`, with all 4 options genuinely distinct claims/values.
- **Answer-variety discipline** (carried forward from `functia-gradul-1-sets`'s final review finding, successfully maintained through `functia-gradul-2-sets` and `siruri-sets`): within each 10-exercise set, all `input`-type numeric answers must be pairwise distinct.
- **Content-duplication discipline** (carried forward from `functia-gradul-2-sets`'s final review Minor finding): when drafting exercises, cross-check chosen numeric parameters against the 7 existing base exercises (`pl-1`..`pl-7`) to avoid reproducing an identical problem.
- **Cross-set duplication discipline** (new — carried forward from `siruri-sets`'s final whole-branch review, which found two exercises with identical parameters/answers duplicated verbatim across two different sets, invisible to per-task reviewers since neither had visibility into the other set). This round's plan-writing step must run a full cross-set parameter-pair check across all 100 exercises before any task is dispatched, not just a per-set or per-base-exercise check.

## Integration points
- `setNumbersForTopic("puteri-radicali-logaritmi")`/`exercisesForSet` (in `src/data/index.ts`) are already generic over any `set` number present in `ALL_EXERCISES` — no changes needed there beyond spreading the new array in.
- `src/data/index.ts`: add `import { puteriRadicaliLogaritmiSetExercises } from "./questions/puteriRadicaliLogaritmiSets";` and spread it into `ALL_EXERCISES`, immediately after the existing `...puteriRadicaliLogaritmiExercises,` entry.
- No `formulaSheet.ts` changes.
- No `src/types.ts` changes.

## Lessons carried forward from prior *Sets rounds
- **LaTeX escaping**: every LaTeX command in a TS string literal needs a double backslash (`\\`). Two implementer failures occurred in the `multimi-logica-sets` round (one silently corrupted diacritics into mojibake, one got stuck and gave up); zero occurred in the `functia-gradul-1-sets`, `functia-gradul-2-sets`, and `siruri-sets` rounds after baking encoding-safety checks into every dispatch from the start. Continue that practice here.
- Every task dispatch must bake in an explicit `git diff --stat` (0 deletions expected) check and a mojibake-marker scan (Ä/È/Ã) before every commit, and forbid external scripts for generating file content.
- **Romanian spelling**: the `functia-gradul-2-sets` round's final review caught a 5× misspelling ("abciselor" instead of "absciselor") invisible to all automated checks. Proofread Romanian mathematical terminology carefully at every review step, especially topic-specific vocabulary here: rațional, exponent, radical, logaritm, medie ponderată/armonică.
- **Cross-set exact-duplicate exercises**: the `siruri-sets` round's final whole-branch review caught two pairs of exercises with byte-identical parameters and answers, reused verbatim across two different sets (Set 6 and Set 8), because the two sets' themes ("condiția / determinarea rației" and "determinarea lui b1 și q") overlapped in scope and no per-task reviewer had visibility into both sets. This round's set breakdown was designed with more clearly separated themes per set specifically to reduce this risk, but the plan-writing step must still run an explicit cross-set parameter check across the full 100-exercise draft before finalizing the plan.
- If any implementer produces a non-pure-append diff or gets blocked, the controller should apply that task's content directly (from this plan's verbatim text) rather than risk repeated failed attempts.

## Exam integration
Identical to prior rounds: `buildExam` draws Subiectul I from the full `ALL_EXERCISES` pool via `pickRandom`, so the new set exercises become eligible there automatically. `buildVariantExam` (the 25 fixed variants) is unaffected. The topic's Set Picker page automatically shows 10 sets once these exist.

## Non-goals
- No changes to the base theory or base exercises.
- No new Subiectul II/III `Problem` entries.
- No changes to `examVariants.ts`.
- No new `Topic` entries.
