# Statistică — practice sets — Design

## Purpose
`statistica` (Statistică, one of the tenth-grade foundation chapters added earlier) currently has theory + 7 base exercises (`st-1`..`st-7`) but no practice-set bank, per that round's explicit scope decision. Every topic that has practice sets follows a 10-set × 10-exercise (100 total) convention. This closes that gap for `statistica`, matching the pattern just completed for `multimi-logica`, `functia-gradul-1`, `functia-gradul-2`, `siruri`, `puteri-radicali-logaritmi`, `functii-exponentiale-logaritmice`, and `matematici-financiare`. `statistica` is the last topic in the `TOPICS` array (`src/data/index.ts`), so this closes the practice-set gap for every topic currently in the app.

## Scope
Add `src/data/questions/statisticaSets.ts`, exporting `statisticaSetExercises: Exercise[]`, spread into `ALL_EXERCISES` in `src/data/index.ts`. 10 sets of 10 exercises each (`set: 1` through `set: 10`), ids `st-s1-1`..`st-s10-10` (matching the existing base-exercise id prefix `st`).

No changes to `src/data/theory/statistica.ts` or the existing 7 base exercises in `src/data/questions/statistica.ts`. No new `Topic` entries — `statistica` already exists and is already wired up.

## Set breakdown
Drawn from the topic's 4 existing theory concepts (Culegerea și clasificarea datelor statistice, Frecvențe, Reprezentarea grafică a datelor statistice, Interpretarea datelor statistice) — approved via AskUserQuestion:

| Set | Theme |
|---|---|
| 1 | Frecvența absolută — calcul (numărarea aparițiilor într-un șir de date) |
| 2 | Frecvența relativă — calcul (raport față de total, exprimat procentual) |
| 3 | Frecvențe — probleme inverse (determinarea frecvenței absolute sau a totalului, cunoscând frecvența relativă) |
| 4 | Media aritmetică — calcul direct |
| 5 | Media aritmetică — probleme inverse (determinarea unei valori lipsă sau a numărului de date, cunoscând media) |
| 6 | Valoarea cu frecvența maximă (modul) — determinare |
| 7 | Clasificarea datelor statistice — date calitative vs cantitative (concepte) |
| 8 | Reprezentarea grafică a datelor — tipuri și proprietăți (histogramă, diagramă circulară, poligon de frecvențe) |
| 9 | Interpretarea datelor statistice — aplicații mixte (frecvențe + medie combinate pe același set de date) |
| 10 | Recapitulare / aplicații mixte |

## Content style
Matches `st-1`..`st-7`'s existing style exactly:
- 6 points per exercise, mix of `input`/`mcq` (roughly even split per set, adjusted where conceptual/mcq-heavy content makes sense — Sets 6-8 lean conceptual/definitional and will carry more mcq than the computational sets).
- Inline `$...$` LaTeX (never `$$...$$`). Romanian decimal comma convention (e.g. `1{,}2` not `1.2`) where decimals appear — matches base file's use in `0{,}4`, `0{,}3`.
- **`acceptedAnswers` convention** (matches base exercises' established pattern, confirmed from `st-1`..`st-7`): `input`-type exercises whose answer is a **percentage** (relative-frequency answers) set `correctAnswer` to the bare number and `acceptedAnswers: ["<n>%"]` (matching `st-1`'s pattern). `input`-type exercises whose answer is a **bare count** (absolute frequency, mean, mode value, missing-value-in-mean problems) do **not** use `acceptedAnswers` (matching `st-3`, `st-5`, `st-7`, which have none).
- Every mcq's `correctAnswer` present character-for-character in `options`, with all 4 options genuinely distinct claims/values — not just distinct-looking strings that are secretly mathematically/logically equal.
- **Answer-variety discipline**: within each 10-exercise set, all `input`-type numeric `correctAnswer` values must be pairwise distinct.
- **Content-duplication discipline (vs. base exercises)**: none of the 100 exercises should duplicate the exact data set / numeric parameters of the 7 existing base exercises (`st-1`..`st-7`).
- **Cross-set exact-duplicate discipline**: run a scripted cross-set exact-prompt-duplicate scan AND a scripted base-exercise exact-prompt-duplicate scan (CRLF-normalized, since the base files in this project use CRLF line endings) before finalizing the plan — the standing discipline established across the last several rounds.
- **Reversed-direction/restated-question duplication discipline** (new explicit carry-forward from the `matematici-financiare-sets` round, where this exact failure mode was caught twice by task reviewers and once proactively by the controller): a data set or (mean, count) / (frequency, total) combination reused across two exercises that ask for different unknowns (e.g. "given data set X, find the mean" vs "given the mean and n-1 values, find the missing value") is still a content duplication even though the exact prompt text differs. Every task's review — and the plan-writing pass itself — must explicitly check for this pattern, not just exact-string prompt matches.

## Integration points
- `setNumbersForTopic("statistica")`/`exercisesForSet` (in `src/data/index.ts`) are already generic over any `set` number present in `ALL_EXERCISES` — no changes needed there beyond spreading the new array in.
- `src/data/index.ts`: add `import { statisticaSetExercises } from "./questions/statisticaSets";` and spread it into `ALL_EXERCISES`, immediately after the existing `...statisticaExercises,` entry.
- No `formulaSheet.ts` changes.
- No `src/types.ts` changes.

## Lessons carried forward from prior *Sets rounds
- **LaTeX escaping**: every LaTeX command in a TS string literal needs a double backslash (`\\`). Zero incidents across the last five rounds after baking encoding-safety checks into every dispatch from the start.
- Every task dispatch must bake in an explicit `git diff --stat` (0 deletions expected) check and a mojibake-marker scan (Ä/È/Ã) before every commit, and forbid external scripts for generating file content.
- **Romanian spelling**: proofread carefully — this topic has terminology (frecvență, populație statistică, calitativ/cantitativ, histogramă, poligon de frecvențe, medie aritmetică) that must be spelled correctly.
- **Cross-set AND base-exercise duplication**: run BOTH checks programmatically at plan-writing time (see above), and again in the final Task 10 verification step, on the real generated file (not just the plan draft).
- **Reversed-direction duplication**: explicitly check every new exercise's underlying data/parameters against every other set and the base exercises for the *same relationship asked a different way* — not just exact prompt-text matches. This was the single most common defect class in the `matematici-financiare-sets` round (caught 3 times).
- **mcq distractor equality trap**: watch for distractor options that look textually different but are mathematically/logically equal.
- **Stray uncommitted files in the main repo**: a recurring implementer-subagent quirk in prior rounds. Continue checking `git status --short` in the main repo before merging any future round.
- If any implementer produces a non-pure-append diff or gets blocked, the controller should apply that task's content directly (from this plan's verbatim text) rather than risk repeated failed attempts.
- **Subagent spawn limits**: the previous round hit the per-session subagent spawn cap partway through. If that recurs, the controller completes remaining tasks directly with its own tools, applying the identical verification rigor (diff-stat, mojibake/backslash scans, fresh test runs, hand-recomputed math, duplicate-triple cross-checks) rather than skipping steps.

## Exam integration
Identical to prior rounds: `buildExam` draws Subiectul I from the full `ALL_EXERCISES` pool via `pickRandom`, so the new set exercises become eligible there automatically. `buildVariantExam` (the 25 fixed variants) is unaffected. The topic's Set Picker page automatically shows 10 sets once these exist.

## Non-goals
- No changes to the base theory or base exercises.
- No new Subiectul II/III `Problem` entries.
- No changes to `examVariants.ts`.
- No new `Topic` entries.
