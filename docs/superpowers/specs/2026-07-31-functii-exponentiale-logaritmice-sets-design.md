# Funcții putere, radical, exponențială și logaritmică — practice sets — Design

## Purpose
`functii-exponentiale-logaritmice` (Funcții putere, radical, exponențială și logaritmică, one of the tenth-grade foundation chapters added earlier) currently has theory + 7 base exercises (`fe-1`..`fe-7`) but no practice-set bank, per that round's explicit scope decision. Every topic that has practice sets follows a 10-set × 10-exercise (100 total) convention. This closes that gap for `functii-exponentiale-logaritmice`, matching the pattern just completed for `multimi-logica`, `functia-gradul-1`, `functia-gradul-2`, `siruri`, and `puteri-radicali-logaritmi`.

## Scope
Add `src/data/questions/functiiExponentialeLogaritmiceSets.ts`, exporting `functiiExponentialeLogaritmiceSetExercises: Exercise[]`, spread into `ALL_EXERCISES` in `src/data/index.ts`. 10 sets of 10 exercises each (`set: 1` through `set: 10`), ids `fe-s1-1`..`fe-s10-10` (matching the existing base-exercise id prefix `fe`).

No changes to `src/data/theory/functiiExponentialeLogaritmice.ts` or the existing 7 base exercises in `src/data/questions/functiiExponentialeLogaritmice.ts`. No new `Topic` entries — `functii-exponentiale-logaritmice` already exists and is already wired up.

## Set breakdown
Drawn from the topic's 6 existing theory concepts (Funcția putere și funcția radical, Funcția exponențială, Funcția logaritmică, Injectivitate/surjectivitate/bijectivitate, Ecuații exponențiale, Ecuații logaritmice):

| Set | Theme |
|---|---|
| 1 | Funcția putere și funcția radical — domeniu și calcul valori |
| 2 | Funcția exponențială — proprietăți (monotonie, grafic, puncte) |
| 3 | Funcția logaritmică — proprietăți (monotonie, grafic, puncte) |
| 4 | Injectivitate, surjectivitate, bijectivitate |
| 5 | Ecuații exponențiale simple ($a^{f(x)}=a^{g(x)}$) |
| 6 | Ecuații exponențiale cu substituție ($a^{2x}+b\cdot a^x+c=0$) |
| 7 | Ecuații logaritmice simple ($\log_a f(x)=$ constantă) |
| 8 | Ecuații logaritmice cu proprietăți (sumă/diferență de logaritmi) |
| 9 | Comparații și aplicații mixte exponențială/logaritmică |
| 10 | Recapitulare / aplicații mixte |

## Content style
Matches `fe-1`..`fe-7`'s existing style exactly:
- 6 points per exercise, mix of `input`/`mcq` (roughly even split per set, adjusted per set where conceptual/mcq-heavy content makes sense, as in prior rounds).
- Inline `$...$` LaTeX (never `$$...$$`).
- Every mcq's `correctAnswer` present character-for-character in `options`, with all 4 options genuinely distinct claims/values — not just distinct-looking strings that are secretly mathematically equal (a Minor finding surfaced in the immediately preceding round; watch for this specifically when writing distractors involving equivalent algebraic forms).
- **Answer-variety discipline**: within each 10-exercise set, all `input`-type numeric answers must be pairwise distinct.
- **Content-duplication discipline (vs. base exercises)**: none of the 100 exercises should duplicate the numeric parameters/expressions of the 7 existing base exercises (`fe-1`..`fe-7`).
- **Cross-set exact-duplicate discipline** (carried forward from `siruri-sets`, where the final review caught two cross-set duplicate pairs, and successfully re-applied in `puteri-radicali-logaritmi-sets`, where a full 100-exercise cross-set scan at plan-writing time caught it before implementation — except for one base-vs-set slip that the final review still had to catch, since the base-exercise check remained a self-attested manual step rather than a script). This round's plan-writing step must run BOTH a scripted cross-set-within-the-100 check AND a scripted check against the 7 base exercises before finalizing the plan — not just an eyeballed/manual claim for the base-exercise side.

## Integration points
- `setNumbersForTopic("functii-exponentiale-logaritmice")`/`exercisesForSet` (in `src/data/index.ts`) are already generic over any `set` number present in `ALL_EXERCISES` — no changes needed there beyond spreading the new array in.
- `src/data/index.ts`: add `import { functiiExponentialeLogaritmiceSetExercises } from "./questions/functiiExponentialeLogaritmiceSets";` and spread it into `ALL_EXERCISES`, immediately after the existing `...functiiExponentialeLogaritmiceExercises,` entry.
- No `formulaSheet.ts` changes.
- No `src/types.ts` changes.

## Lessons carried forward from prior *Sets rounds
- **LaTeX escaping**: every LaTeX command in a TS string literal needs a double backslash (`\\`). Zero incidents across the last three rounds (`functia-gradul-2-sets`, `siruri-sets`, `puteri-radicali-logaritmi-sets`) after baking encoding-safety checks into every dispatch from the start. Continue that practice here.
- Every task dispatch must bake in an explicit `git diff --stat` (0 deletions expected) check and a mojibake-marker scan (Ä/È/Ã) before every commit, and forbid external scripts for generating file content.
- **Romanian spelling**: proofread carefully — this topic has dense vocabulary (exponențială, logaritmică, injectivitate, surjectivitate, bijectivitate, crescătoare/descrescătoare) that is easy to mistype and invisible to automated checks.
- **Cross-set AND base-exercise duplication**: run BOTH checks programmatically at plan-writing time (see above) — this is the specific gap that let one duplicate slip through in the immediately preceding round despite a cross-set-only scan.
- **mcq distractor equality trap**: watch for distractor options that look textually different but are mathematically/algebraically equal under the problem's stated domain (e.g. `$a$` vs `$\sqrt{a^2}$` for `$a>0$` — a Minor finding from the immediately preceding round). Double-check especially around injectivity/bijectivity concept mcqs and equation-solving mcqs in this round, where equivalent-looking symbolic forms are common.
- If any implementer produces a non-pure-append diff or gets blocked, the controller should apply that task's content directly (from this plan's verbatim text) rather than risk repeated failed attempts.

## Exam integration
Identical to prior rounds: `buildExam` draws Subiectul I from the full `ALL_EXERCISES` pool via `pickRandom`, so the new set exercises become eligible there automatically. `buildVariantExam` (the 25 fixed variants) is unaffected. The topic's Set Picker page automatically shows 10 sets once these exist.

## Non-goals
- No changes to the base theory or base exercises.
- No new Subiectul II/III `Problem` entries.
- No changes to `examVariants.ts`.
- No new `Topic` entries.
