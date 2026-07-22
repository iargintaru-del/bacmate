# Chapter list with progress ring — Design

## Purpose
Replace the Home page's chapter card grid with a denser, single-column list, and replace the plain "% correct" text with a small progress ring so mastery is visible at a glance.

## Scope
`src/pages/Home.tsx`, `src/components/TopicCard.tsx`, `src/styles/index.css`. A new `ProgressRing` component is added under `src/components/`. No changes to routing, data (`src/data`), or stats computation (`src/lib/stats.ts`) — only presentation.

## Layout
`Home.tsx` renders chapters in a new `.chapter-list` (single column, full width up to the existing 720px page max-width) instead of `.topic-grid`. Each chapter is one `.chapter-row`, a flex row with three zones:
1. Title (left, flexible width)
2. `ProgressRing` (fixed width, right of title)
3. Action links — Teorie / Exersează / Seturi de exerciții — at the far right, as plain text links exactly as today. Wraps onto a second line on narrow screens if the row doesn't fit.

Rows are separated by a 1px bottom hairline (`var(--border)`) instead of individual card borders/backgrounds. Vertical padding is reduced from the current card's 16px to ~10-12px to increase density.

`TopicCard` keeps its existing props (`topic`, `label`, `accuracy`, `attempted`, `hasSets`) — only its internal markup and CSS class names change from card to row layout, plus rendering a `ProgressRing` instead of the `.topic-card__stats` text line.

## ProgressRing component
New component at `src/components/ProgressRing.tsx`, props: `accuracy: number`, `attempted: number`. Renders a ~40px diameter SVG ring:
- **`attempted === 0`:** faint dashed outline, no fill arc, no percentage text. Visually distinct from "attempted but scored 0%."
- **`attempted > 0`:** filled arc proportional to `accuracy` (stroke-dasharray on a circle), with the rounded percentage as small centered text inside the ring.

Ring/text color by accuracy threshold, reusing the app's existing `--correct`/`--incorrect`/`--accent` CSS variables:
- `accuracy < 0.5` → `--incorrect` (red)
- `accuracy >= 0.8` → `--correct` (green)
- otherwise → `--accent` (neutral)

These are new percentage-based thresholds distinct from `set-card--weak`/`--strong` in `SetPicker.tsx`, which threshold on a raw correct-count out of a fixed 10-question set — that logic doesn't translate to a chapter's overall accuracy, which is a ratio over a variable number of attempts.

## Non-goals
- No changes to the exam CTA row, stats page, set picker, or any other page — this is Home-page chapter list presentation only.
- No new tests — no component-level tests exist elsewhere in the repo (only `lib`/`data` logic is unit-tested via vitest); verification is manual/visual (row wrapping, all three ring states, light and dark mode).
- No animation on the ring fill (e.g. no transition-in on mount) — static render only, matching the rest of the app's non-animated style.
