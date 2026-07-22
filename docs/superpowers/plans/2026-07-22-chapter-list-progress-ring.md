# Chapter List with Progress Ring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Home page's chapter card grid with a denser single-column list, and replace the plain "% correct" text with a small SVG progress ring.

**Architecture:** A new presentational `ProgressRing` component renders a small SVG ring driven by `accuracy`/`attempted` props. `TopicCard` is restructured from a grid card to a flex row and renders `ProgressRing` in place of its old stats text. `Home.tsx` swaps its wrapping `<div className="topic-grid">` for `<div className="chapter-list">`. No data, routing, or stats-computation changes.

**Tech Stack:** React 18 + TypeScript, plain CSS (`src/styles/index.css`), Vite, vitest (logic tests only — no component test harness in this repo).

## Global Constraints

- Reuse existing CSS variables for ring color: `--incorrect`, `--correct`, `--accent` (defined in `src/styles/index.css:3-24`, with light/dark values).
- Ring color thresholds: `accuracy < 0.5` → `--incorrect`; `accuracy >= 0.8` → `--correct`; otherwise → `--accent`. These are new, chapter-level thresholds — do not reuse or modify `set-card--weak`/`set-card--strong` (`src/styles/index.css:131-147`), which threshold on a raw correct-count out of a fixed 10-question set.
- `attempted === 0` renders a dashed empty-outline ring: no fill arc, no percentage text.
- No new automated tests: this repo has no component-render test harness (no `@testing-library/react` in `package.json`) — only `src/lib/*` and `src/data/*` logic is unit-tested via vitest. Verification for UI tasks is `npm run typecheck` plus a manual dev-server check in the final task.
- No CSS transition/animation on ring fill — static render, matching the rest of the app.
- `TopicCard`'s public props (`topic`, `label`, `accuracy`, `attempted`, `hasSets`) do not change.

---

### Task 1: Create the ProgressRing component

**Files:**
- Create: `src/components/ProgressRing.tsx`
- Modify: `src/styles/index.css` (insert after line 97, immediately before the `.set-grid` rule at line 99)

**Interfaces:**
- Produces: `ProgressRing({ accuracy, attempted }: { accuracy: number; attempted: number })` — named export, default-exported nowhere (matches `TopicCard`'s named-export convention). `accuracy` is a 0-1 ratio (matches `computeStats` output already used in `Home.tsx:31`). Consumed by `TopicCard` in Task 2.

- [ ] **Step 1: Write `src/components/ProgressRing.tsx`**

```tsx
interface ProgressRingProps {
  accuracy: number;
  attempted: number;
}

const SIZE = 40;
const STROKE = 4;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CENTER = SIZE / 2;

export function ProgressRing({ accuracy, attempted }: ProgressRingProps) {
  if (attempted === 0) {
    return (
      <svg className="progress-ring" width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle
          className="progress-ring__track progress-ring__track--empty"
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          strokeWidth={STROKE}
        />
      </svg>
    );
  }

  const percent = Math.round(accuracy * 100);
  const offset = CIRCUMFERENCE * (1 - accuracy);
  const arcClass =
    accuracy < 0.5
      ? "progress-ring__arc--weak"
      : accuracy >= 0.8
        ? "progress-ring__arc--strong"
        : "progress-ring__arc--mid";

  return (
    <svg className="progress-ring" width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
      <circle className="progress-ring__track" cx={CENTER} cy={CENTER} r={RADIUS} strokeWidth={STROKE} />
      <circle
        className={`progress-ring__arc ${arcClass}`}
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        strokeWidth={STROKE}
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${CENTER} ${CENTER})`}
      />
      <text className="progress-ring__label" x={CENTER} y={CENTER} textAnchor="middle" dominantBaseline="central">
        {percent}
      </text>
    </svg>
  );
}
```

- [ ] **Step 2: Run typecheck to verify the new file compiles cleanly**

Run: `npm run typecheck`
Expected: exits 0, no errors referencing `ProgressRing.tsx`.

- [ ] **Step 3: Insert ring CSS into `src/styles/index.css`**

Insert immediately after the existing line 97 (`}` closing `.topic-card__action`) and before line 99 (`.set-grid {`):

```css

.progress-ring {
  flex-shrink: 0;
}

.progress-ring__track,
.progress-ring__arc {
  fill: none;
}

.progress-ring__track {
  stroke: var(--border);
}

.progress-ring__track--empty {
  stroke-dasharray: 3 4;
}

.progress-ring__arc--weak {
  stroke: var(--incorrect);
}

.progress-ring__arc--strong {
  stroke: var(--correct);
}

.progress-ring__arc--mid {
  stroke: var(--accent);
}

.progress-ring__label {
  font-size: 11px;
  font-weight: 600;
  fill: var(--fg);
}
```

- [ ] **Step 4: Run typecheck again**

Run: `npm run typecheck`
Expected: exits 0.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProgressRing.tsx src/styles/index.css
git commit -m "Add ProgressRing component"
```

---

### Task 2: Restructure TopicCard into a chapter row

**Files:**
- Modify: `src/components/TopicCard.tsx` (full rewrite)
- Modify: `src/styles/index.css:58-97` (replace `.topic-grid`/`.topic-card*` rules with `.chapter-list`/`.chapter-row*` rules)

**Interfaces:**
- Consumes: `ProgressRing` from Task 1 (`import { ProgressRing } from "./ProgressRing"`).
- Produces: `TopicCard` renders a `.chapter-row` root (was `.topic-card`) with child classes `.chapter-row__title`, `.chapter-row__actions`, `.chapter-row__action`. Props unchanged. Consumed by `Home.tsx` (Task 3), which currently wraps `TopicCard` instances in a `.topic-grid` div that must become `.chapter-list` for the new row CSS to apply.

- [ ] **Step 1: Rewrite `src/components/TopicCard.tsx`**

```tsx
import { Link } from "react-router-dom";
import type { Topic } from "../types";
import { ProgressRing } from "./ProgressRing";

interface TopicCardProps {
  topic: Topic;
  label: string;
  accuracy: number;
  attempted: number;
  hasSets?: boolean;
}

export function TopicCard({ topic, label, accuracy, attempted, hasSets }: TopicCardProps) {
  return (
    <div className="chapter-row">
      <div className="chapter-row__title">{label}</div>
      <ProgressRing accuracy={accuracy} attempted={attempted} />
      <div className="chapter-row__actions">
        <Link to={`/theory/${topic}`} className="chapter-row__action">
          Teorie
        </Link>
        <Link to={`/quiz/${topic}`} className="chapter-row__action">
          Exersează
        </Link>
        {hasSets && (
          <Link to={`/quiz/${topic}/sets`} className="chapter-row__action">
            Seturi de exerciții
          </Link>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Replace lines 58-97 of `src/styles/index.css`**

Replace the existing block (from `.topic-grid {` through the closing `}` of `.topic-card__action`) with:

```css
.chapter-list {
  display: flex;
  flex-direction: column;
  margin: 24px 0;
}

.chapter-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  padding: 10px 4px;
  border-bottom: 1px solid var(--border);
}

.chapter-row:last-child {
  border-bottom: none;
}

.chapter-row__title {
  font-weight: 600;
  font-size: 2rem;
  flex: 1 1 auto;
  min-width: 200px;
}

.chapter-row__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px 16px;
}

.chapter-row__action {
  font-size: 1.7rem;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  white-space: nowrap;
}
```

- [ ] **Step 3: Run typecheck**

Run: `npm run typecheck`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/TopicCard.tsx src/styles/index.css
git commit -m "Restructure TopicCard into a chapter row with ProgressRing"
```

---

### Task 3: Wire up Home.tsx and verify

**Files:**
- Modify: `src/pages/Home.tsx:23`

**Interfaces:**
- Consumes: `.chapter-list` CSS class from Task 2 (no prop or component API changes).

- [ ] **Step 1: Change the wrapping div's class name**

In `src/pages/Home.tsx`, change:

```tsx
      <div className="topic-grid">
```

to:

```tsx
      <div className="chapter-list">
```

- [ ] **Step 2: Run typecheck and the existing test suite**

Run: `npm run typecheck && npm test`
Expected: both exit 0. `npm test` output should be unchanged from before this plan (no new/removed test files touch this code — only `src/lib`/`src/data` are covered).

- [ ] **Step 3: Manual visual verification via dev server**

Run: `npm run dev`, open the printed local URL.

Check on the Home page:
- Chapters with 0 attempted questions show a dashed, unfilled ring (no number inside).
- Answer a few questions in one chapter (`Exersează`), return to Home, and confirm that chapter's ring is now filled proportionally and shows a numeric percentage.
- Confirm ring color: red if the chapter's accuracy is under 50%, green if 80%+, otherwise the default accent color.
- Narrow the browser window (or use device toolbar at ~360px width) and confirm rows wrap sensibly (title first, actions wrapping to a second line) without overlapping the ring.
- Toggle OS/browser dark mode (or emulate `prefers-color-scheme: dark` in devtools) and confirm ring track, arc colors, and label text remain legible.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "Switch Home page chapter grid to chapter-list layout"
```

---

## Self-Review Notes

- **Spec coverage:** Layout (single column, hairline rows, reduced padding) → Task 2/3. ProgressRing states and thresholds → Task 1. `TopicCard` props unchanged → Task 2. No new tests / manual verification → Task 3. All spec sections covered.
- **Placeholder scan:** No TBD/TODO markers; all steps contain full code or exact commands.
- **Type consistency:** `ProgressRing` props (`accuracy: number`, `attempted: number`) match how `TopicCard` calls it in Task 2 (`accuracy={accuracy} attempted={attempted}`), which in turn match the untouched `TopicCardProps` already fed by `Home.tsx` (`topicStats.accuracy`, `topicStats.total`... note `TopicCard`'s existing prop is `attempted`, fed from `topicStats.total` in `Home.tsx:32` — unchanged from current code, not introduced by this plan).
