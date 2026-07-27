# Teen-Preference Color Palette Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recolor BacMate's CSS variables to a four-tier palette ranked by documented 13-18-year-old color preferences (purple background, blue chapters, yellow sets, black/ink buttons), in both light and dark mode.

**Architecture:** This is a CSS-only change to `src/styles/index.css`. Two new custom properties (`--color-chapters`, `--color-sets`) are introduced; three existing properties (`--bg`, `--card-bg`, `--border`) get new values; `--accent`/`--accent-fg` get new values (and swap roles in dark mode so the black/white "ink" identity stays visible on a dark background). No component markup changes. No new dependencies — `puppeteer` is already a devDependency from a prior feature and is reused here only for one-off visual verification, not committed test infrastructure.

**Tech Stack:** Plain CSS custom properties, existing Vite build, `puppeteer` (already installed) for verification only.

## Global Constraints

- `--correct` and `--incorrect` (quiz right/wrong feedback, progress-ring strong/weak arcs) must NOT change — they are functional signal colors, out of scope per the design spec.
- No markup/component changes — every affected selector already exists in `src/styles/index.css`; only variable values and a handful of selector bodies change.
- Exact hex values below are copied verbatim from the design spec (`docs/superpowers/specs/2026-07-27-teen-color-palette-design.md`) — do not substitute similar-looking shades.

---

### Task 1: Apply the new palette and verify computed colors

**Files:**
- Modify: `src/styles/index.css`

**Interfaces:**
- Produces: two new CSS custom properties, `--color-chapters` and `--color-sets`, available on `:root` in both light and dark mode, for any future rule to consume.

- [ ] **Step 1: Replace the light-mode `:root` block**

In `src/styles/index.css`, replace:

```css
:root {
  color-scheme: light dark;
  --bg: #ffffff;
  --fg: #1a1a1a;
  --muted: #666666;
  --accent: #2f5fda;
  --accent-fg: #ffffff;
  --card-bg: #f5f6fa;
  --border: #d9dce3;
  --correct: #1f9254;
  --incorrect: #c0392b;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}
```

with:

```css
:root {
  color-scheme: light dark;
  --bg: #f6f0fb;
  --fg: #1a1a1a;
  --muted: #666666;
  --accent: #17181c;
  --accent-fg: #ffffff;
  --card-bg: #efe6fa;
  --border: #ded0f0;
  --color-chapters: #3454d1;
  --color-sets: #caa100;
  --correct: #1f9254;
  --incorrect: #c0392b;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}
```

- [ ] **Step 2: Replace the dark-mode `:root` override block**

Replace:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #14161c;
    --fg: #eceef2;
    --muted: #9aa0ac;
    --accent: #6f95ff;
    --accent-fg: #0c0d10;
    --card-bg: #1e2129;
    --border: #2c3038;
  }
}
```

with:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1b1522;
    --fg: #eceef2;
    --muted: #9aa0ac;
    --accent: #f2f0f6;
    --accent-fg: #17141c;
    --card-bg: #221c2c;
    --border: #352c40;
    --color-chapters: #8aa8ff;
    --color-sets: #e8c25a;
  }
}
```

- [ ] **Step 3: Point chapter-row links and the progress ring's mid arc at `--color-chapters`**

Replace:

```css
.chapter-row__action {
  font-size: 1.7rem;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  white-space: nowrap;
}
```

with:

```css
.chapter-row__action {
  font-size: 1.7rem;
  font-weight: 600;
  color: var(--color-chapters);
  text-decoration: none;
  white-space: nowrap;
}
```

Replace:

```css
.progress-ring__arc--mid {
  stroke: var(--accent);
}
```

with:

```css
.progress-ring__arc--mid {
  stroke: var(--color-chapters);
}
```

- [ ] **Step 4: Point set/variant cards at `--color-sets`**

Replace:

```css
.set-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--card-bg);
  color: inherit;
  text-decoration: none;
  text-align: center;
  font-weight: 600;
}
```

with:

```css
.set-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px;
  border: 1px solid var(--color-sets);
  border-radius: 10px;
  background: color-mix(in srgb, var(--color-sets) 12%, var(--card-bg));
  color: inherit;
  text-decoration: none;
  text-align: center;
  font-weight: 600;
}
```

Replace:

```css
.variant-card {
  display: block;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--card-bg);
  color: inherit;
  text-decoration: none;
  text-align: center;
  font-weight: 600;
}
```

with:

```css
.variant-card {
  display: block;
  padding: 12px;
  border: 1px solid var(--color-sets);
  border-radius: 10px;
  background: color-mix(in srgb, var(--color-sets) 12%, var(--card-bg));
  color: inherit;
  text-decoration: none;
  text-align: center;
  font-weight: 600;
}
```

Do not touch `.set-card--weak`, `.set-card--strong`, or any other rule — they are unaffected by this task and must keep referencing `--correct`/`--incorrect`.

- [ ] **Step 5: Build to confirm no CSS/type errors**

Run: `npm run build`
Expected: exit 0.

- [ ] **Step 6: Verify computed colors in both color schemes**

This app has no existing CSS test infrastructure, and jsdom (the project's `vitest` environment) doesn't reliably compute real stylesheet cascades or `color-mix()`, so verify with a real browser engine instead: `puppeteer` is already a devDependency (installed for the formula-sheet PDF generator). Write a throwaway script, run it, then delete it — it is not part of the deliverable.

Create a temporary file `verify-colors.mjs` at the repo root. Each check navigates to its own `path` (the Home page `/` has chapter rows and the exam CTAs; `.set-card` only exists on a topic's Sets page, e.g. `/quiz/derivate/sets`, since `derivate` has sets per `src/data/questions/derivateSets.ts`):

```js
import puppeteer from "puppeteer";

const checks = [
  { scheme: "light", path: "/", selector: "body", prop: "background-color", expected: "rgb(246, 240, 251)" },
  { scheme: "light", path: "/", selector: ".chapter-row__action", prop: "color", expected: "rgb(52, 84, 209)" },
  { scheme: "light", path: "/quiz/derivate/sets", selector: ".set-card", prop: "border-color", expected: "rgb(202, 161, 0)" },
  { scheme: "light", path: "/", selector: ".exam-cta", prop: "background-color", expected: "rgb(23, 24, 28)" },
  { scheme: "light", path: "/", selector: ".exam-cta", prop: "color", expected: "rgb(255, 255, 255)" },
  { scheme: "dark", path: "/", selector: "body", prop: "background-color", expected: "rgb(27, 21, 34)" },
  { scheme: "dark", path: "/", selector: ".chapter-row__action", prop: "color", expected: "rgb(138, 168, 255)" },
  { scheme: "dark", path: "/quiz/derivate/sets", selector: ".set-card", prop: "border-color", expected: "rgb(232, 194, 90)" },
  { scheme: "dark", path: "/", selector: ".exam-cta", prop: "background-color", expected: "rgb(242, 240, 246)" },
  { scheme: "dark", path: "/", selector: ".exam-cta", prop: "color", expected: "rgb(23, 20, 28)" },
];

const browser = await puppeteer.launch();
const page = await browser.newPage();
let failures = 0;

for (const { scheme, path, selector, prop, expected } of checks) {
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: scheme }]);
  await page.goto(`http://localhost:4173/bacmate${path}`, { waitUntil: "networkidle0" });
  const actual = await page.$eval(selector, (el, p) => getComputedStyle(el)[p], prop).catch(() => null);
  const pass = actual === expected;
  console.log(`[${scheme}] ${path} ${selector} ${prop}: expected ${expected}, got ${actual} — ${pass ? "PASS" : "FAIL"}`);
  if (!pass) failures++;
}

await browser.close();
if (failures > 0) {
  console.error(`${failures} check(s) failed`);
  process.exit(1);
}
console.log("All color checks passed");
```

Then run:

```bash
npm run build
npx vite preview --port 4173 &
sleep 2
node verify-colors.mjs
kill %1
rm verify-colors.mjs
```

Expected: `All color checks passed`, exit 0.

If any check reports FAIL, re-read the corresponding CSS rule from Steps 1-4 for a typo (e.g. wrong hex digit) before concluding the verification script itself is wrong. If `/quiz/derivate/sets` 404s or has no `.set-card` (e.g. `derivate`'s sets data changed), check `src/data/index.ts`'s `setNumbersForTopic` — any topic it returns a non-empty array for has a working `/quiz/<topic>/sets` route.

- [ ] **Step 7: Manual visual sanity check**

Run `npm run preview` (or reuse the one from Step 6) and open `http://localhost:4173/bacmate/` in a real browser if available in this environment. Confirm at a glance: the page background reads as a soft lavender (not jarring bright purple), chapter links read blue, set/variant cards have a warm yellow-tinted border, and the exam buttons are black with white text. Toggle the OS/browser dark mode setting and confirm the equivalent dark-mode look (dark purple page, light blue links, gold-tinted cards, white/light "ink" buttons with dark text). If no real browser is available in this environment, rely on Step 6's computed-style checks as sufficient evidence and note that in your report.

- [ ] **Step 8: Commit**

```bash
git add src/styles/index.css
git commit -m "Recolor app to a teen-preference palette (purple/blue/yellow/black)"
```
