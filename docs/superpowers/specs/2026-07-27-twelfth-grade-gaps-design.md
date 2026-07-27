# Twelfth-grade gaps — Design

## Purpose
Close the two 12th-grade curriculum gaps identified against the official **Programa M_tehnologic** (the Bacalaureat syllabus matching BacMate's M2 track, `CLASA a XII-a - 3 ore/spt.` section, "ELEMENTE DE ALGEBRĂ" and "ELEMENTE DE ANALIZĂ MATEMATICĂ"). Unlike 11th grade's two one-line theorem additions, both gaps here are substantive: an entirely absent subject area (algebraic structures) and a missing pair of named integration techniques whose 100-exercise practice-set bank currently never uses them.

- **Structuri algebrice** (Grupuri, Inele, Corpuri, morfisme/izomorfisme de grupuri) — zero coverage anywhere in the app (base theory, exercises, practice sets, or exam problems). The existing `legi-compozitie` topic covers only the prerequisite building blocks (composition law, associativity, commutativity, identity element, symmetrizable elements) but never names or builds up to the structures the syllabus requires.
- **Tehnici de integrare** (integrare prin părți, integrare prin schimbare de variabilă) — the existing `integrale` topic's base theory and its 100-exercise `integraleSets.ts` bank cover only direct antiderivative lookup and the Leibniz-Newton formula; neither named technique appears anywhere.

This round closes both gaps by extending the two existing topics — no new `Topic` entries, no new chapters on the Home page.

## Scope
Extend two existing topics, each with new theory concepts + worked examples, new base exercises, a new practice set (Set 11), and a new `FORMULA_SHEET` entry for the genuinely reusable formulas:

| Gap | Topic extended | Formula sheet? |
|---|---|---|
| Grupuri, inele, corpuri | `legi-compozitie` | No — these are structural definitions, not algebraic formulas (consistent with skipping Darboux last round). |
| Integrare prin părți / schimbare de variabilă | `integrale` | Yes — both are genuine reusable formulas, appended to the existing `integrale` chapter. |

Out of scope: new `Topic` entries, new Subiectul II/III `Problem` entries, any change to the 25 fixed `examVariants.ts` variants, and any other 12th-grade content (Primitive/Integrala definită's core formula is already well covered).

## Content

### `src/data/theory/legiCompozitie.ts` — 4 new concepts, 3 new examples
**New concepts (appended after "Tabla operației"):**
1. **Grup** — $(G,\circ)$ is a group if $\circ$ is associative, has an identity element, and every element is symmetrizable. Examples: $(\mathbb{Z},+)$; the additive group of residue classes modulo $n$, $(\mathbb{Z}_n,+)$.
2. **Morfism și izomorfism de grupuri** — $f:(G,\circ)\to(H,*)$ is a morphism if $f(x\circ y)=f(x)*f(y)$ for all $x,y\in G$; an isomorphism if additionally $f$ is bijective.
3. **Inel** — $(A,+,\cdot)$ is a ring if $(A,+)$ is an abelian group, $\cdot$ is associative, and $\cdot$ distributes over $+$. Examples: $(\mathbb{Z},+,\cdot)$, $(\mathbb{Z}_n,+,\cdot)$.
4. **Corp** — a ring $(A,+,\cdot)$ with $1\neq0$ where every nonzero element is invertible under $\cdot$. Examples: $(\mathbb{Q},+,\cdot)$, $(\mathbb{R},+,\cdot)$, $(\mathbb{Z}_p,+,\cdot)$ for prime $p$.

**New worked examples (appended):**
1. Verify $(\mathbb{Z}_4,+)$ is a group (identity $\hat0$; inverses $\hat0\leftrightarrow\hat0$, $\hat1\leftrightarrow\hat3$, $\hat2\leftrightarrow\hat2$).
2. Show $f:(\mathbb{Z},+)\to(\mathbb{Z},+)$, $f(x)=2x$, is a morphism ($f(x+y)=f(x)+f(y)$) but not an isomorphism (not surjective — odd integers aren't reached).
3. Show $(\mathbb{Z}_5,+,\cdot)$ is a field: every nonzero class has a multiplicative inverse ($\hat1\cdot\hat1=\hat1$, $\hat2\cdot\hat3=\hat6=\hat1$, $\hat4\cdot\hat4=\hat{16}=\hat1$), contrasted with $(\mathbb{Z}_4,+,\cdot)$, which is not a field since $\hat2$ has no inverse (4 isn't prime).

### `src/data/questions/legiCompozitie.ts` — new exercises `lc-5`, `lc-6`, `lc-7`
- `lc-5` (input): find the inverse (opusul) of $\hat3$ in $(\mathbb{Z}_5,+)$ → `"2"`.
- `lc-6` (mcq): which of $(\mathbb{Z}_4,+,\cdot)$, $(\mathbb{Z}_5,+,\cdot)$, $(\mathbb{Z}_6,+,\cdot)$, $(\mathbb{Z}_8,+,\cdot)$ is a field → the prime-modulus one, testing the prime/composite distinction directly.
- `lc-7` (mcq): definition-recognition — which property is NOT required for $(G,\circ)$ to be a group (distractor: commutativity, which is required for an *abelian* group specifically, not a group in general).

### `src/data/questions/legiCompozitieSets.ts` — new Set 11 (10 exercises, `lc-s11-1`..`lc-s11-10`)
"Grupuri, inele și corpuri" — drills: identity/inverse-finding in various $\mathbb{Z}_n$, classifying candidate structures as group/ring/field, verifying the morphism property algebraically for simple linear maps, and the prime-modulus-is-a-field distinction across several $n$.

### `src/data/theory/integrale.ts` — 2 new concepts, 2 new examples
**New concepts (appended after "Integrala definită — formula Leibniz-Newton"):**
1. **Integrarea prin părți** — $\int u\,v'\,dx = uv - \int u'v\,dx$.
2. **Integrarea prin schimbare de variabilă** — $\int f(g(x))g'(x)\,dx = F(g(x))+C$, where $F$ is an antiderivative of $f$.

**New worked examples (appended):**
1. $\int_0^1 xe^x\,dx$ via integration by parts ($u=x$, $v'=e^x$): $=[xe^x-e^x]_0^1 = (e-e)-(0-1)=1$.
2. $\int_0^1 3x^2e^{x^3}\,dx$ via substitution $t=x^3$, $dt=3x^2\,dx$: $=\int_0^1 e^t\,dt = e-1$.

### `src/data/questions/integrale.ts` — new exercises `in-5`, `in-6`
- `in-5` (input): $\int_0^1 xe^x\,dx$ via parts → `"1"` (clean integer, matches the theory example).
- `in-6` (mcq): $\int_0^1 3x^2e^{x^3}\,dx$ via substitution → `"$e-1$"`, distractors `"$e$"`, `"$e^3-1$"`, `"$1$"` (numerically distinct: $\approx1.718$, $\approx2.718$, $\approx19.09$, $1$) — mcq rather than input since the answer isn't a clean integer.

### `src/data/questions/integraleSets.ts` — new Set 11 (10 exercises, `in-s11-1`..`in-s11-10`)
"Tehnici de integrare (prin părți și schimbare de variabilă)" — mix of both techniques: polynomial×exponential and polynomial×trig integration by parts, and chain-rule-recognizable substitutions, increasing in difficulty across the set.

### `src/data/formulaSheet.ts` — 2 new entries in the existing `integrale` chapter
```ts
{
  label: "Integrarea prin părți",
  latex: "\\int u\\,v'\\,dx = uv - \\int u'v\\,dx",
  plain: "∫u·v' dx = u·v − ∫u'·v dx",
},
{
  label: "Integrarea prin schimbare de variabilă",
  latex: "\\int f(g(x))g'(x)\\,dx = F(g(x))+C",
  plain: "∫f(g(x))·g'(x) dx = F(g(x)) + C",
},
```
No `legi-compozitie` chapter changes — structural definitions (group/ring/field) aren't algebraic formulas. After this edit, `npm run generate:formulas` must run once and both `public/formule-bacalaureat.pdf`/`.docx` committed, per that file's own header-comment contract. Since no new `Topic`/chapter is added, `formulaSheet.test.ts`'s topic-order invariant is unaffected.

## Integration points
- Both new practice sets (Set 11 for each topic) require **no** `src/data/index.ts` changes: `setNumbersForTopic`/`exercisesForSet` are generic over any `set` number present in `ALL_EXERCISES`, and `legiCompozitieSetExercises`/`integraleSetExercises` are already spread into `ALL_EXERCISES` — appending new entries to those existing arrays is sufficient.
- New base exercise ids (`lc-5`..`lc-7`, `in-5`..`in-6`) and new set ids (`lc-s11-*`, `in-s11-*`) verified not to collide with any existing id.
- No changes to `src/types.ts`, `TOPICS`, `TOPIC_LABELS`, or `THEORY` registry — both topics already exist and are already wired up.

## Exam integration
Identical to prior rounds: `buildExam` draws Subiectul I from the full `ALL_EXERCISES` pool via `pickRandom` (base exercises only, not set exercises — consistent with existing behavior), so `lc-5`..`lc-7` and `in-5`..`in-6` become eligible there automatically. The new practice sets are reachable via each topic's Set Picker like every other set. `buildVariantExam` (the 25 fixed variants) is unaffected.

## Non-goals
- No new `Topic` entries or Home-page chapters.
- No new Subiectul II/III `Problem` entries (e.g. no algebra-subject exam problems built around group/ring/field proofs this round).
- No changes to `examVariants.ts`.
- No `legi-compozitie` entry in `FORMULA_SHEET` (structural definitions, not formulas).
