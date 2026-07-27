# Teen-preference color palette — Design

## Purpose
Recolor the app using a palette ranked by documented color preferences among 13-18 year-olds (a 2021 survey of 1,200 teens: purple 52%, blue 25%, yellow 18%; the same age bracket shows ~25% higher preference for black than other age groups), mapped to four visual tiers: page background, chapter navigation, sets/variants, and other action buttons.

## Scope
`src/styles/index.css` only — no component markup changes. Functional/semantic colors (`--correct`, `--incorrect`, used for quiz right/wrong feedback and progress-ring strong/weak arcs) are explicitly out of scope: they signal correctness, not brand, and recoloring them would hurt usability rather than reflect a preference ranking.

## Palette

| Variable | Role | Light mode | Dark mode |
|---|---|---|---|
| `--bg` | page background (tier 1: purple) | `#f6f0fb` | `#1b1522` |
| `--card-bg` | neutral card surfaces, retinted to match `--bg` | `#efe6fa` | `#221c2c` |
| `--border` | neutral borders, retinted to match `--bg` | `#ded0f0` | `#352c40` |
| `--color-chapters` *(new)* | tier 2: blue | `#3454d1` | `#8aa8ff` |
| `--color-sets` *(new)* | tier 3: yellow | `#caa100` | `#e8c25a` |
| `--accent` | tier 4: black/ink (other buttons) | bg `#17181c`, fg `#ffffff` | bg `#f2f0f6`, fg `#17141c` (inverted so the same monochrome-ink identity stays visible on a dark page) |

`--fg` and `--muted` are unchanged in both modes.

## Element mapping

- **`--bg`**: `body` background (already wired via the existing `background: var(--bg)` rule — no selector change needed, only the variable's value).
- **`--card-bg` / `--border`**: no selector changes; every rule already consuming these (`.set-card`, `.variant-card`, `.question-card`, `.theory-page__example`, `.exam-result`, `.progress-ring__track`) inherits the new tinted values automatically.
- **`--color-chapters`**: applied to `.chapter-row__action` (`color`) and `.progress-ring__arc--mid` (`stroke`) — both live inside the Home page's chapter rows.
- **`--color-sets`**: applied to `.set-card` and `.variant-card` as a `border-color` plus a `color-mix(in srgb, var(--color-sets) 12%, var(--card-bg))` background tint — the same tinting technique already used by `.set-card--weak`/`.set-card--strong`. Those two more-specific weak/strong rules are declared after `.set-card` in the stylesheet, so red/green performance tinting continues to take precedence over the new default yellow tint wherever it applies — no change needed to their declarations.
- **`--accent` / `--accent-fg`**: no selector changes — every existing consumer (`.exam-cta`, `.exam-submit`, `.exam-cta--secondary`, `.stats-bar__fill`, `.question-card__option--selected`) keeps referencing `--accent`/`--accent-fg`; only the variable's value changes to black/ink (and its dark-mode inversion).

## Non-goals
- No change to `--correct`/`--incorrect` or anything that signals quiz correctness.
- No component/markup changes — this is a CSS variable and selector-value change only.
- No manual light/dark theme toggle — the app has none today; this palette rides the existing `prefers-color-scheme` media query.
