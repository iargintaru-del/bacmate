# Tenth-grade foundation chapters — Design

## Purpose
Close the remaining curriculum gaps identified against the official **Programa M_tehnologic** (the Bacalaureat syllabus matching BacMate's M2 track): four 10th-grade topics with zero coverage anywhere in the app. This is the second and final round closing gaps found in the same original gap analysis that produced the ninth-grade foundation chapters (see `docs/superpowers/specs/2026-07-27-ninth-grade-foundation-chapters-design.md`).

## Scope
Four new topics, each with a theory page and a base exercises file only (same depth as the ninth-grade round):

| Topic slug | `TOPIC_LABELS` text |
|---|---|
| `puteri-radicali-logaritmi` | Puteri, radicali și logaritmi |
| `functii-exponentiale-logaritmice` | Funcții putere, radical, exponențială și logaritmică |
| `matematici-financiare` | Matematici financiare |
| `statistica` | Statistică |

Out of scope this round: `*Sets.ts` practice-set banks, new Subiectul II/III `Problem` entries, any change to the 25 fixed `examVariants.ts` variants — same non-goals as the ninth-grade round, for the same reasons.

## Integration points (identical pattern to every existing topic, including the four just added)
- `src/types.ts`: add the 4 slugs to the `Topic` union, appended after `"siruri"`. The existing comment above `export type Topic =` already documents the next constraint.
- `src/data/index.ts`: append the 4 slugs to `TOPICS` and their labels to `TOPIC_LABELS`.
- `src/data/theory/<slug>.ts` + registered in `src/data/theory/index.ts`'s `THEORY` record: same `TheorySection` shape as every existing chapter.
- `src/data/questions/<slug>.ts` + spread into `ALL_EXERCISES` in `src/data/index.ts`: same `Exercise[]` shape as every existing base file, 6 points each, `mcq`/`input` mix. Exercise id prefixes: `pl-`, `fe-`, `mf-`, `st-` (verified no collisions with any existing id in the codebase).
- **Carried forward from the ninth-grade round, baked in from the start this time:** `src/data/formulaSheet.test.ts` asserts `FORMULA_SHEET.map(chapter => chapter.topic)` equals `TOPICS` exactly (same topics, same order) — a cross-cutting constraint from an earlier, unrelated feature (the printable formula sheet). Each of these 4 new topics also needs a matching chapter appended to `FORMULA_SHEET` in `src/data/formulaSheet.ts`, in the same order as `TOPICS`. Once all 4 chapters exist there, `npm run generate:formulas` must be run once and its output (`public/formule-bacalaureat.pdf`/`.docx`) committed, per that file's own header-comment contract.
- No `setNumbersForTopic`/`hasSets` changes needed — already handled generically by existing code.

## Content outline
- **Puteri, radicali și logaritmi**: properties of powers with rational/irrational/real exponents, radical properties and operations, logarithm definition and properties, the four means (arithmetic, weighted, geometric, harmonic).
- **Funcții putere, radical, exponențială și logaritmică**: definitions and graphs of the power, radical, exponential, and logarithmic functions; injectivity/surjectivity/bijectivity and invertible functions; solving exponential and logarithmic equations (including substitution methods).
- **Matematici financiare**: percentages, simple and compound interest, VAT — applications specific to the M_tehnologic track (profit, cost price, investment amortization, credit types, personal/family budgets, per the official programa's own note).
- **Statistică**: collecting and classifying statistical data, graphical representation of statistical data, interpreting data through graphical reading — distinct from probability, which `combinatorica` already covers.

Exact worked examples and exercises (LaTeX-formatted, matching `MathText`'s `$...$`/`$$...$$` convention) are written out in full in the implementation plan.

## Exam integration
Identical to the ninth-grade round: `buildExam` draws Subiectul I from the full `ALL_EXERCISES` pool via `pickRandom`, so the new exercises become eligible there automatically. `buildVariantExam` (the 25 fixed variants) is unaffected.

## Non-goals
- No practice-set banks (`*Sets.ts`) for these 4 topics this round.
- No new `Problem` (Subiectul II/III) entries for these topics.
- No changes to `examVariants.ts`.
- No reordering of the existing 14 topics in `TOPICS`.
