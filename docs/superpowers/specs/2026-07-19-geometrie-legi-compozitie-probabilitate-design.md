# Geometrie, Legi de compoziție, and Probabilitate — Design

Date: 2026-07-19

## Purpose

The official 2026 M_tehnologic Bacalaureat model exam
(`docs/superpowers/specs/E_c_matematica_M_tehnologic_2026_var_model.pdf`)
surfaced three gaps against BacMate's current 8-chapter question bank:

1. **Geometrie** — completely absent. The model exam has two geometry
   items in Subiectul I alone (analytic geometry: points, midpoint,
   distances, isosceles-triangle proof; and classic geometry: right
   triangle, Pythagorean theorem). The only geometry-flavored content
   that exists today is two narrow borrowed applications (triangle
   area via determinant, in `determinanti`; triangle area via complex
   affixes, in `numere-complexe`) — neither teaches the actual
   distance/midpoint/trig content tested.
2. **Legi de compoziție** (binary operations / algebraic structures) —
   completely absent, despite being a standard, recurring Subiectul II
   problem type (the model exam's Subiectul II.2 is built entirely
   around a custom operation `x∘y = xy + 4(x+y)`).
3. **Probabilitate** — not covered as its own concept. Subiectul I.4 is
   a probability problem; `combinatorica` currently only has
   permutări/aranjamente/combinări/binomul lui Newton, no probability
   formula or theory.

## Scope decisions

- **Probability folds into the existing `combinatorica` topic** rather
  than becoming a 9th `Topic` value — this matches how M_tehnologic
  textbooks teach the two together ("Combinatorică și probabilități"),
  and avoids touching the `Topic` union type for it. It is a pure
  *addition*: the already-approved 100 `combinatoricaSets.ts` items and
  4 `combinatorica.ts` items are untouched.
- **Geometrie and Legi de compoziție are two brand-new topics**, built
  at full parity with the existing 8 chapters: a 4-item base exercise
  file, a 100-item practice-Sets file (10 sets of 10), and a theory
  page — wired through `Topic`, `TOPICS`, `TOPIC_LABELS` exactly like
  every existing chapter.
- **Exam integration is Subiectul I only, for now.** All three feed the
  random Subiectul I pool automatically once their exercises exist in
  `ALL_EXERCISES` (see `src/lib/examBuilder.ts`'s
  `pickRandom(exercises, 5)`) — no code change needed for that part.
  No new Subiectul II/III problems are authored for
  Geometrie/Legi de compoziție in this round, and the 25 fixed
  `EXAM_VARIANTS` are left untouched. Revisit later.
- **Topic ordering:** both new topics are appended at the end of
  `TOPICS` (after `integrale`) — lowest-risk, no reordering of
  existing entries, no risk to any code or test that iterates `TOPICS`
  in order.

## Data model

No changes to `GradableItem`, `Exercise`, `Problem`, or the theory
types (`TheorySection`/`TheoryConcept`/`TheoryExample`) established in
the step-explanations-and-theory project. This is purely new `Topic`
values plus content in the existing shapes:

```ts
export type Topic =
  | "numere-complexe"
  | "combinatorica"
  | "matrice"
  | "determinanti"
  | "sisteme"
  | "limite"
  | "derivate"
  | "integrale"
  | "geometrie"        // new
  | "legi-compozitie"; // new
```

## Content scope

### Geometrie (new topic, full parity: 4 + 100 items + theory)

Concept clusters (spread across the 10 practice sets):

1. Distanța dintre două puncte / mijlocul unui segment
2. Panta unei drepte / ecuația dreptei prin două puncte
3. Drepte paralele și perpendiculare (condiții pe pantă)
4. Aria unui triunghi (formula cu coordonate / determinant) — brief
   cross-reference to the `determinanti` chapter's identical formula,
   framed here as a geometry application
5. Teorema lui Pitagora și relații metrice în triunghiul dreptunghic
6. Trigonometrie în triunghiul dreptunghic (sin, cos, tan pentru un
   unghi ascuțit)
7. Teorema sinusurilor și teorema cosinusului
8. Vectori: adunarea vectorilor, vector de poziție, coliniaritate

File basenames: `geometrie.ts` / `geometrieSets.ts` (matching the
existing `src/data/questions/` convention). Exercise id prefixes:
`gm-` (base), `gm-s{N}-{M}` (sets). Theory file:
`src/data/theory/geometrie.ts` exporting `geometrieTheory`.

### Legi de compoziție (new topic, full parity: 4 + 100 items + theory)

Concept clusters:

1. Definiția unei legi de compoziție pe o mulțime (operație internă,
   verificarea că rezultatul rămâne în mulțime)
2. Comutativitate
3. Asociativitate
4. Element neutru
5. Element simetrizabil (invers) față de o lege
6. Tabla operației (pentru mulțimi finite mici)
7. Rezolvarea de ecuații de tipul `x∘y = e` sau `x∘a = b` folosind
   legea de compoziție dată

File basenames: `legiCompozitie.ts` / `legiCompozitieSets.ts`.
Exercise id prefixes: `lc-` (base), `lc-s{N}-{M}` (sets). Theory file:
`src/data/theory/legiCompozitie.ts` exporting `legiCompozitieTheory`.

### Probabilitate (addition to the existing `combinatorica` topic)

- `TOPIC_LABELS.combinatorica` becomes `"Combinatorică și
  probabilități"` (only the label changes; the `Topic` value itself
  stays `"combinatorica"`, so no exercise ids need to move).
- New **Set 11** (10 items, ids `cb-s11-1`..`cb-s11-10`) appended to
  `combinatoricaSets.ts`, covering: probabilitate clasică
  (`P = cazuri favorabile / cazuri posibile`), probabilitate cu
  combinări/aranjamente ca instrument de numărare, evenimente
  independente (regula produsului), evenimentul contrar.
- `combinatorica.ts` (the 4-item base file) is **not** modified — the
  existing 4 items and their ids stay exactly as they are.
- The existing `combinatorica` theory file
  (`src/data/theory/combinatorica.ts`) gets one new concept
  ("Probabilitate clasică", with the formula and the
  independent-events/complementary-event properties) and 2 new worked
  examples appended to its `examples` array (bringing it from 3 to 5),
  following the same step-array convention as its existing 3 examples.

## Wiring

- `src/types.ts`: extend the `Topic` union with `"geometrie"` and
  `"legi-compozitie"`.
- `src/data/index.ts`: import the two new topics' exercise arrays,
  append `"geometrie"` and `"legi-compozitie"` to `TOPICS`, add their
  labels to `TOPIC_LABELS` (and update `combinatorica`'s label), spread
  their exercises into `ALL_EXERCISES`.
- `src/data/theory/index.ts`: import and register
  `geometrieTheory`/`legiCompozitieTheory` in the `THEORY` map (the
  existing `Record<Topic, TheorySection>` type makes a missing entry a
  compile error, so this is self-enforcing).
- No changes to `App.tsx`, `TopicCard.tsx`, `QuestionCard.tsx`,
  `Theory.tsx`, or any CSS — the Home page, quiz flow, and theory pages
  already render generically over whatever `TOPICS` contains.

## Testing

- `src/data/index.test.ts`'s existing integrity checks (unique ids,
  "at least one exercise per topic", "every exercise is worth 6
  points", non-empty step-array explanations) automatically cover the
  two new topics once they're in `TOPICS`/`ALL_EXERCISES` — no test
  changes needed there.
- `src/data/theory/index.test.ts`'s existing integrity checks
  (every topic has a theory section with concepts + ≥2 examples)
  likewise automatically cover the two new topics once registered in
  `THEORY`.
- No new test files needed; this is additive content within the
  existing, already-tested shapes.

## Out of scope (this round)

- No new Subiectul II/III exam problems for any of the three
  (`examProblemsAlgebra.ts`, `examProblemsAnalysis.ts`, `problems.ts`
  are untouched).
- No changes to the 25 fixed `EXAM_VARIANTS`.
- No UI/routing/CSS changes — the existing generic rendering already
  covers new topics.
- No changes to grading/scoring logic or the exam-builder.
