# Matematici financiare — practice sets — Design

## Purpose
`matematici-financiare` (Matematici financiare, one of the tenth-grade foundation chapters added earlier) currently has theory + 7 base exercises (`mf-1`..`mf-7`) but no practice-set bank, per that round's explicit scope decision. Every topic that has practice sets follows a 10-set × 10-exercise (100 total) convention. This closes that gap for `matematici-financiare`, matching the pattern just completed for `multimi-logica`, `functia-gradul-1`, `functia-gradul-2`, `siruri`, `puteri-radicali-logaritmi`, and `functii-exponentiale-logaritmice`.

## Scope
Add `src/data/questions/matematiciFinanciareSets.ts`, exporting `matematiciFinanciareSetExercises: Exercise[]`, spread into `ALL_EXERCISES` in `src/data/index.ts`. 10 sets of 10 exercises each (`set: 1` through `set: 10`), ids `mf-s1-1`..`mf-s10-10` (matching the existing base-exercise id prefix `mf`).

No changes to `src/data/theory/matematiciFinanciare.ts` or the existing 7 base exercises in `src/data/questions/matematiciFinanciare.ts`. No new `Topic` entries — `matematici-financiare` already exists and is already wired up.

## Set breakdown
Drawn from the topic's 4 existing theory concepts (Procente, Dobânda simplă, Dobânda compusă, TVA):

| Set | Theme |
|---|---|
| 1 | Procente — creșteri procentuale (calculul valorii noi) |
| 2 | Procente — scăderi procentuale (calculul valorii noi) |
| 3 | Procente — determinarea procentului sau a valorii inițiale (probleme inverse) |
| 4 | Dobânda simplă — calculul dobânzii |
| 5 | Dobânda simplă — calculul sumei finale / determinarea altor parametri |
| 6 | Dobânda compusă — calculul sumei finale |
| 7 | Dobânda compusă — comparații dobândă simplă vs compusă |
| 8 | TVA — calculul prețului cu TVA |
| 9 | TVA — determinarea prețului net din prețul cu TVA |
| 10 | Recapitulare / aplicații mixte |

## Content style
Matches `mf-1`..`mf-7`'s existing style exactly:
- 6 points per exercise, mix of `input`/`mcq` (roughly even split per set).
- Inline `$...$` LaTeX (never `$$...$$`). Romanian decimal comma (e.g. `1{,}2` not `1.2`) matching base-exercise convention.
- **`acceptedAnswers` convention (new discipline for this topic — not used in prior *Sets rounds):** every `input`-type exercise whose answer is a monetary amount, following the base exercises' established pattern, sets `correctAnswer` to the bare number (e.g. `"180"`) and `acceptedAnswers: ["180 lei"]` to accept the "lei"-suffixed variant. Exercises whose answer is a percentage follow the base's `mf-7` pattern: `correctAnswer` bare number, `acceptedAnswers: ["25%"]`. This must be checked at every task's review step, since it is a structural field this project's other `*Sets` files have never used.
- Every mcq's `correctAnswer` present character-for-character in `options`, with all 4 options genuinely distinct claims/values — not just distinct-looking strings that are secretly mathematically/logically equal (a Minor finding surfaced in a prior round).
- **Answer-variety discipline**: within each 10-exercise set, all `input`-type numeric `correctAnswer` values must be pairwise distinct.
- **Content-duplication discipline (vs. base exercises)**: none of the 100 exercises should duplicate the numeric parameters of the 7 existing base exercises (`mf-1`..`mf-7`).
- **Cross-set exact-duplicate discipline**: carried forward from `functii-exponentiale-logaritmice-sets`, where this round's plan-writing step ran BOTH a scripted cross-set exact-prompt-duplicate scan AND a scripted base-exercise exact-prompt-duplicate scan (with CRLF normalization, since the base files in this project use CRLF line endings) before finalizing the plan, and confirmed 0 duplicates on both axes. This closed a two-round lineage of failures (`siruri-sets`' cross-set duplicate, `puteri-radicali-logaritmi-sets`' base-exercise duplicate) where the checks were previously done manually/by claim rather than by script. Continue that same scripted-check discipline for this round.

## Integration points
- `setNumbersForTopic("matematici-financiare")`/`exercisesForSet` (in `src/data/index.ts`) are already generic over any `set` number present in `ALL_EXERCISES` — no changes needed there beyond spreading the new array in.
- `src/data/index.ts`: add `import { matematiciFinanciareSetExercises } from "./questions/matematiciFinanciareSets";` and spread it into `ALL_EXERCISES`, immediately after the existing `...matematiciFinanciareExercises,` entry.
- No `formulaSheet.ts` changes.
- No `src/types.ts` changes.

## Lessons carried forward from prior *Sets rounds
- **LaTeX escaping**: every LaTeX command in a TS string literal needs a double backslash (`\\`). Zero incidents across the last four rounds after baking encoding-safety checks into every dispatch from the start. Continue that practice here.
- Every task dispatch must bake in an explicit `git diff --stat` (0 deletions expected) check and a mojibake-marker scan (Ä/È/Ã) before every commit, and forbid external scripts for generating file content.
- **Romanian spelling**: proofread carefully — this topic has terminology (dobândă, capital, cotă, creștere/scădere procentuală) that must be spelled correctly; also watch the Romanian decimal-comma convention (`1{,}2` in LaTeX, not `1.2`) used consistently in the base exercises.
- **Cross-set AND base-exercise duplication**: run BOTH checks programmatically at plan-writing time (see above), and again in the final Task 10 verification step.
- **mcq distractor equality trap**: watch for distractor options that look textually different but are mathematically equal (e.g. two different phrasings of the same percentage/amount).
- **Stray uncommitted files in the main repo**: the immediately preceding round had a stray Set-1-only leak into the main repo's working tree from an implementer subagent, discovered and safely stashed/dropped before merging. Continue checking `git status --short` in the main repo before merging any future round.
- If any implementer produces a non-pure-append diff or gets blocked, the controller should apply that task's content directly (from this plan's verbatim text) rather than risk repeated failed attempts.

## Exam integration
Identical to prior rounds: `buildExam` draws Subiectul I from the full `ALL_EXERCISES` pool via `pickRandom`, so the new set exercises become eligible there automatically. `buildVariantExam` (the 25 fixed variants) is unaffected. The topic's Set Picker page automatically shows 10 sets once these exist.

## Non-goals
- No changes to the base theory or base exercises.
- No new Subiectul II/III `Problem` entries.
- No changes to `examVariants.ts`.
- No new `Topic` entries.
