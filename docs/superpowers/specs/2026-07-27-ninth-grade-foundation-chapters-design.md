# Ninth-grade foundation chapters — Design

## Purpose
Close the highest-priority curriculum gaps identified against the official **Programa M_tehnologic** (the Bacalaureat syllabus matching BacMate's M2 track): four 9th-grade topics that currently have zero coverage anywhere in the app (verified against every theory file and every question bank) — sets/mathematical logic, the linear function, the quadratic function, and sequences (progressions).

## Scope
Four new topics, each with a theory page and a base exercises file only:

| Topic slug | `TOPIC_LABELS` text |
|---|---|
| `multimi-logica` | Mulțimi și logică matematică |
| `functia-gradul-1` | Funcția de gradul I |
| `functia-gradul-2` | Funcția de gradul al II-lea |
| `siruri` | Șiruri |

Out of scope this round: `*Sets.ts` practice-set banks (the ~100-question multi-set banks every existing topic has), new Subiectul II/III `Problem` entries, and any change to the 25 fixed `examVariants.ts` variants.

## Integration points (identical pattern to every existing topic)
- `src/types.ts`: add the 4 slugs to the `Topic` union.
- `src/data/index.ts`: append the 4 slugs to `TOPICS` (after `legi-compozitie`, so no existing topic's position changes) and add their labels to `TOPIC_LABELS`.
- `src/data/theory/<slug>.ts` + registered in `src/data/theory/index.ts`'s `THEORY` record: same `TheorySection` shape as existing chapters (`concepts: TheoryConcept[]`, `examples: TheoryExample[]`).
- `src/data/questions/<slug>.ts` + spread into `ALL_EXERCISES` in `src/data/index.ts`: same `Exercise[]` shape as existing base files (e.g. `derivate.ts`), 6 points each, `mcq`/`input` mix.
- No `setNumbersForTopic`/`hasSets` changes needed — a topic with no `*Sets.ts` file already renders without the "Seturi de exerciții" link (existing conditional in `TopicCard.tsx`).

## Content outline
- **Mulțimi și logică matematică**: set operations (union, intersection, difference, complement), intervals of real numbers, propositions/predicates, logical connectives (negation, conjunction, disjunction, implication, equivalence), mathematical induction.
- **Funcția de gradul I**: definition `f(x) = ax + b`, graph, monotonicity from the sign of `a`, sign study, linear equations/inequalities, relative position of two lines.
- **Funcția de gradul al II-lea**: definition `f(x) = ax² + bx + c`, parabola graph, Viète's relations, vertex/extremum point, sign study, quadratic inequalities.
- **Șiruri**: arithmetic progression (general term, sum of first n terms), geometric progression (general term, sum of first n terms), the condition for three numbers to be in arithmetic/geometric progression.

Exact worked examples and exercises (LaTeX-formatted, matching `MathText`'s `$...$`/`$$...$$` convention) are written out in full in the implementation plan.

## Exam integration
`buildExam` (the "Examen aleatoriu" random-exam mode) draws Subiectul I from the full `ALL_EXERCISES` pool via `pickRandom`, so the new exercises become eligible there automatically once added — no code change needed. `buildVariantExam` (the 25 fixed variants) references specific hardcoded exercise IDs and is unaffected either way.

## Non-goals
- No practice-set banks (`*Sets.ts`) for these 4 topics this round — a possible follow-up once the base content is validated.
- No new `Problem` (Subiectul II/III) entries for these topics.
- No changes to `examVariants.ts`.
- No reordering of the existing 10 topics in `TOPICS`.
