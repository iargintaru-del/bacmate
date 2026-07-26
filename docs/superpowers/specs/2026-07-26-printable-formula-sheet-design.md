# Printable formula sheet (PDF + Word) — Design

## Purpose
Give users a printable cheat sheet of the key math formulas covered across all `src/data/theory/*` chapters, downloadable as PDF and Word from the Home page.

## Scope
- New curated data file with the formulas.
- Two dev-only generation scripts that produce a PDF and a DOCX from that data.
- A small UI addition on `Home.tsx` linking to the generated files.
- Out of scope: generating the files at runtime in the browser, full theory text (prose/derivations/worked examples) in the sheet, true OOXML math typesetting in the Word file.

## Data — `src/data/formulaSheet.ts`
Single source of truth, hand-curated (not auto-extracted from theory prose), one chapter per `Topic`, in the same order as `TOPICS`:

```ts
export interface FormulaEntry {
  label: string; // short Romanian name, e.g. "Derivata puterii"
  latex: string; // exact LaTeX, reusing expressions already used in theory/*.ts where possible
  plain: string; // hand-written Unicode/plain-text form for Word, e.g. "(xⁿ)' = n·xⁿ⁻¹"
}

export interface FormulaChapter {
  topic: Topic;
  title: string; // matches TOPIC_LABELS[topic]
  formulas: FormulaEntry[];
}

export const FORMULA_SHEET: FormulaChapter[] = [ /* one entry per topic, ~4-7 formulas each */ ];
```

`src/data/formulaSheet.test.ts` (same pattern as `theory/index.test.ts`) asserts:
- every topic in `TOPICS` has exactly one chapter,
- every chapter has at least one formula,
- every formula has non-empty `label`, `latex`, and `plain`.

## Generation scripts (build-time only, not shipped to users)
New devDependencies: `tsx`, `puppeteer`, `docx`.

- **`scripts/generate-formula-pdf.ts`**: imports `FORMULA_SHEET`, uses `katex.renderToString` (displayMode, `throwOnError: false`) to pre-render each formula's `latex` to HTML. Assembles one HTML document grouped by chapter (chapter title as heading, each formula as label + rendered math), referencing the local `katex.min.css`/fonts from `node_modules/katex/dist`. Writes this to a temp HTML file, loads it in Puppeteer via a `file://` URL, and calls `page.pdf()` (A4, `printBackground: true`) to write `public/formule-bacalaureat.pdf`.
- **`scripts/generate-formula-docx.ts`**: imports `FORMULA_SHEET`, uses the `docx` package to build a `Document` with a title page heading, one `HeadingLevel.HEADING_2` per chapter, and one paragraph per formula (bold `label` run + plain `TextRun` with the `plain` field). Writes `public/formule-bacalaureat.docx` via `Packer.toBuffer`.

New npm script: `"generate:formulas": "tsx scripts/generate-formula-pdf.ts && tsx scripts/generate-formula-docx.ts"`. Run manually whenever `formulaSheet.ts` changes; not part of `build` (Puppeteer is heavy and this content changes rarely). Output files are committed to `public/` like any other static asset, so Vite copies them into `dist/` unchanged and they're served at `/bacmate/formule-bacalaureat.pdf` / `.docx`.

## UI change — `Home.tsx`
Below the existing `exam-cta-row` (which holds "Examen aleatoriu" / "Alege o variantă"), add:

```tsx
<p className="page__formula-links">
  Formule matematice:{" "}
  <a href={`${import.meta.env.BASE_URL}formule-bacalaureat.pdf`} download>Descarcă PDF</a>
  {" · "}
  <a href={`${import.meta.env.BASE_URL}formule-bacalaureat.docx`} download>Descarcă Word</a>
</p>
```

`src/styles/index.css`: add `.page__formula-links` to the existing muted-text rule group (alongside `.page__intro`, `.page__summary`, `.page__progress`) plus a small `margin-top`.

## Non-goals
- No in-app formula browsing UI — the sheet is download-only.
- No automatic regeneration on every build or on theory-content changes; regeneration is a manual step (`npm run generate:formulas`) whenever `formulaSheet.ts` is edited.
- No pixel-perfect math typesetting in the Word file — plain/Unicode approximations are accepted there.
