# Printable Formula Sheet (PDF + Word) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give BacMate users a printable formula cheat-sheet, downloadable as PDF and Word, linked from the Home page below "Alege o variantă".

**Architecture:** A single curated TypeScript data file (`src/data/formulaSheet.ts`) is the source of truth for every formula. Two standalone dev-only scripts (run via `tsx`, never shipped to users) consume that data: one renders each formula through KaTeX and prints the result to PDF via headless Chrome (Puppeteer), the other builds a Word document with plain-text/Unicode formulas via the `docx` package. Both write into `public/`, which Vite copies verbatim into `dist/`. `Home.tsx` gets two plain download links pointing at those static files.

**Tech Stack:** TypeScript, Vite, React, Vitest, KaTeX (already a dependency), `tsx`, `puppeteer`, `docx` (new dev dependencies).

## Global Constraints

- Formula content is hand-curated, not auto-extracted — reuse the exact LaTeX already present in `src/data/theory/*.ts` wherever the theory file has that exact formula.
- `public/formule-bacalaureat.pdf` and `public/formule-bacalaureat.docx` are committed static files, regenerated manually via `npm run generate:formulas` — never part of the `build` script.
- No math typesetting library is added to the shipped app bundle — `puppeteer` and `docx` are `devDependencies` only, used solely by the two `scripts/*.ts` generators.
- Download links use `import.meta.env.BASE_URL` so they keep working under the app's `/bacmate/` base path.

---

### Task 1: Formula sheet data + integrity test

**Files:**
- Create: `src/data/formulaSheet.ts`
- Test: `src/data/formulaSheet.test.ts`

**Interfaces:**
- Produces: `FormulaEntry { label: string; latex: string; plain: string }`, `FormulaChapter { topic: Topic; title: string; formulas: FormulaEntry[] }`, and `FORMULA_SHEET: FormulaChapter[]` (exported from `src/data/formulaSheet.ts`), consumed by Tasks 3 and 4.

- [ ] **Step 1: Write the failing test**

Create `src/data/formulaSheet.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { TOPICS } from "./index";
import { FORMULA_SHEET } from "./formulaSheet";

describe("formula sheet integrity", () => {
  it("has exactly one chapter per topic, in TOPICS order", () => {
    expect(FORMULA_SHEET.map((chapter) => chapter.topic)).toEqual(TOPICS);
  });

  it("every chapter has a title and at least one formula with non-empty fields", () => {
    for (const chapter of FORMULA_SHEET) {
      expect(chapter.title.trim().length).toBeGreaterThan(0);
      expect(chapter.formulas.length).toBeGreaterThan(0);
      for (const formula of chapter.formulas) {
        expect(formula.label.trim().length).toBeGreaterThan(0);
        expect(formula.latex.trim().length).toBeGreaterThan(0);
        expect(formula.plain.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/data/formulaSheet.test.ts`
Expected: FAIL — `Cannot find module './formulaSheet'` (the module doesn't exist yet).

- [ ] **Step 3: Write the formula sheet data**

Create `src/data/formulaSheet.ts`:

```ts
import type { Topic } from "../types";
import { TOPIC_LABELS } from "./index";

export interface FormulaEntry {
  label: string;
  latex: string;
  plain: string;
}

export interface FormulaChapter {
  topic: Topic;
  title: string;
  formulas: FormulaEntry[];
}

function chapter(topic: Topic, formulas: FormulaEntry[]): FormulaChapter {
  return { topic, title: TOPIC_LABELS[topic], formulas };
}

export const FORMULA_SHEET: FormulaChapter[] = [
  chapter("numere-complexe", [
    {
      label: "Forma algebrică",
      latex: "z = a + bi,\\ a,b \\in \\mathbb{R},\\ i^2=-1",
      plain: "z = a + bi,  a, b ∈ ℝ,  i² = −1",
    },
    {
      label: "Adunarea / scăderea",
      latex: "(a+bi) \\pm (c+di) = (a \\pm c) + (b \\pm d)i",
      plain: "(a+bi) ± (c+di) = (a±c) + (b±d)i",
    },
    {
      label: "Înmulțirea",
      latex: "(a+bi)(c+di) = (ac-bd) + (ad+bc)i",
      plain: "(a+bi)(c+di) = (ac−bd) + (ad+bc)i",
    },
    {
      label: "Modulul",
      latex: "|z| = \\sqrt{a^2+b^2}",
      plain: "|z| = √(a² + b²)",
    },
    {
      label: "Puterile lui i",
      latex: "i^1=i,\\ i^2=-1,\\ i^3=-i,\\ i^4=1",
      plain: "i¹ = i,  i² = −1,  i³ = −i,  i⁴ = 1",
    },
    {
      label: "Ecuație de gradul 2 (Δ < 0)",
      latex: "x_{1,2} = \\dfrac{-b \\pm i\\sqrt{-\\Delta}}{2a}",
      plain: "x1,2 = (−b ± i√(−Δ)) / 2a",
    },
  ]),
  chapter("combinatorica", [
    {
      label: "Permutări",
      latex: "P_n = n!",
      plain: "Pn = n!",
    },
    {
      label: "Aranjamente",
      latex: "A_n^k = \\dfrac{n!}{(n-k)!}",
      plain: "A(n,k) = n! / (n−k)!",
    },
    {
      label: "Combinări",
      latex: "C_n^k = \\dfrac{n!}{k!(n-k)!}",
      plain: "C(n,k) = n! / (k!·(n−k)!)",
    },
    {
      label: "Binomul lui Newton",
      latex: "(x+y)^n = \\sum_{k=0}^{n} C_n^k x^{n-k} y^k",
      plain: "(x+y)ⁿ = Σ C(n,k)·x^(n−k)·yᵏ,  k = 0..n",
    },
    {
      label: "Probabilitate clasică",
      latex: "P=\\dfrac{\\text{cazuri favorabile}}{\\text{cazuri posibile}}",
      plain: "P = (cazuri favorabile) / (cazuri posibile)",
    },
  ]),
  chapter("matrice", [
    {
      label: "Produsul a două matrice",
      latex: "(AB)_{ij} = \\sum_k A_{ik}B_{kj}",
      plain: "(A·B)ij = Σk Aik·Bkj",
    },
    {
      label: "Matricea identitate",
      latex: "A \\cdot I_n = I_n \\cdot A = A",
      plain: "A·In = In·A = A",
    },
    {
      label: "Transpusa",
      latex: "(A^T)_{ij} = A_{ji}",
      plain: "(Aᵀ)ij = Aji",
    },
  ]),
  chapter("determinanti", [
    {
      label: "Determinant de ordinul 2",
      latex: "\\det(A) = ad-bc",
      plain: "det(A) = ad − bc",
    },
    {
      label: "Determinant și scalar",
      latex: "\\det(kA) = k^n \\det(A)",
      plain: "det(k·A) = kⁿ · det(A)",
    },
    {
      label: "Determinantul produsului",
      latex: "\\det(A \\cdot B) = \\det(A) \\cdot \\det(B)",
      plain: "det(A·B) = det(A) · det(B)",
    },
    {
      label: "Condiția de inversabilitate",
      latex: "A \\text{ inversabilă} \\iff \\det(A) \\neq 0",
      plain: "A inversabilă  ⇔  det(A) ≠ 0",
    },
  ]),
  chapter("sisteme", [
    {
      label: "Sistem liniar 2×2",
      latex: "\\begin{cases}a_1x+b_1y=c_1\\\\a_2x+b_2y=c_2\\end{cases}",
      plain: "{ a1x + b1y = c1 ;  a2x + b2y = c2 }",
    },
    {
      label: "Determinantul sistemului",
      latex: "\\Delta = \\begin{vmatrix}a_1&b_1\\\\a_2&b_2\\end{vmatrix}",
      plain: "Δ = |a1 b1; a2 b2|",
    },
    {
      label: "Regula lui Cramer",
      latex: "x = \\dfrac{\\Delta_x}{\\Delta},\\ y = \\dfrac{\\Delta_y}{\\Delta}",
      plain: "x = Δx / Δ,  y = Δy / Δ",
    },
    {
      label: "Compatibilitate determinată",
      latex: "\\Delta \\neq 0 \\Rightarrow \\text{sistem compatibil determinat}",
      plain: "Δ ≠ 0  ⇒  sistem compatibil determinat",
    },
  ]),
  chapter("limite", [
    {
      label: "Limita fundamentală (sin x / x)",
      latex: "\\lim_{x\\to 0}\\dfrac{\\sin x}{x}=1",
      plain: "lim(x→0) sinx / x = 1",
    },
    {
      label: "Limita fundamentală (numărul e)",
      latex: "\\lim_{x\\to\\infty}\\left(1+\\dfrac{1}{x}\\right)^x = e",
      plain: "lim(x→∞) (1 + 1/x)ˣ = e",
    },
  ]),
  chapter("derivate", [
    {
      label: "Derivata puterii",
      latex: "(x^n)' = nx^{n-1}",
      plain: "(xⁿ)' = n · xⁿ⁻¹",
    },
    {
      label: "Derivate trigonometrice",
      latex: "(\\sin x)' = \\cos x,\\ (\\cos x)' = -\\sin x",
      plain: "(sin x)' = cos x,  (cos x)' = −sin x",
    },
    {
      label: "Derivate exponențială și logaritmică",
      latex: "(e^x)' = e^x,\\ (\\ln x)' = \\dfrac{1}{x}",
      plain: "(eˣ)' = eˣ,  (ln x)' = 1/x",
    },
    {
      label: "Derivata produsului",
      latex: "(u \\cdot v)' = u'v + uv'",
      plain: "(u · v)' = u'v + uv'",
    },
    {
      label: "Derivata câtului",
      latex: "\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v-uv'}{v^2}",
      plain: "(u / v)' = (u'v − uv') / v²",
    },
  ]),
  chapter("integrale", [
    {
      label: "Primitiva puterii",
      latex: "\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1}+C",
      plain: "∫xⁿ dx = xⁿ⁺¹ / (n+1) + C",
    },
    {
      label: "Primitiva lui 1/x",
      latex: "\\int \\dfrac{1}{x}\\,dx = \\ln|x|+C",
      plain: "∫(1/x) dx = ln|x| + C",
    },
    {
      label: "Primitiva exponențială",
      latex: "\\int e^x\\,dx = e^x+C",
      plain: "∫eˣ dx = eˣ + C",
    },
    {
      label: "Primitive trigonometrice",
      latex: "\\int \\sin x\\,dx = -\\cos x + C,\\ \\int \\cos x\\,dx = \\sin x + C",
      plain: "∫sinx dx = −cosx + C,  ∫cosx dx = sinx + C",
    },
    {
      label: "Formula Leibniz–Newton",
      latex: "\\int_a^b f(x)\\,dx = F(b)-F(a)",
      plain: "∫[a,b] f(x) dx = F(b) − F(a)",
    },
  ]),
  chapter("geometrie", [
    {
      label: "Distanța dintre două puncte",
      latex: "AB=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}",
      plain: "AB = √((x2−x1)² + (y2−y1)²)",
    },
    {
      label: "Mijlocul unui segment",
      latex: "M\\left(\\dfrac{x_1+x_2}{2},\\dfrac{y_1+y_2}{2}\\right)",
      plain: "M((x1+x2)/2, (y1+y2)/2)",
    },
    {
      label: "Panta unei drepte",
      latex: "m=\\dfrac{y_2-y_1}{x_2-x_1}",
      plain: "m = (y2−y1) / (x2−x1)",
    },
    {
      label: "Teorema lui Pitagora",
      latex: "BC^2=AB^2+AC^2",
      plain: "BC² = AB² + AC²",
    },
    {
      label: "Teorema sinusurilor",
      latex: "\\dfrac{a}{\\sin A}=\\dfrac{b}{\\sin B}=\\dfrac{c}{\\sin C}=2R",
      plain: "a/sinA = b/sinB = c/sinC = 2R",
    },
    {
      label: "Teorema cosinusului",
      latex: "a^2=b^2+c^2-2bc\\cos A",
      plain: "a² = b² + c² − 2bc·cosA",
    },
  ]),
  chapter("legi-compozitie", [
    {
      label: "Comutativitate",
      latex: "x\\circ y=y\\circ x",
      plain: "x∘y = y∘x",
    },
    {
      label: "Asociativitate",
      latex: "(x\\circ y)\\circ z=x\\circ(y\\circ z)",
      plain: "(x∘y)∘z = x∘(y∘z)",
    },
    {
      label: "Element neutru",
      latex: "x\\circ e=e\\circ x=x",
      plain: "x∘e = e∘x = x",
    },
    {
      label: "Element simetrizabil",
      latex: "x\\circ x'=x'\\circ x=e",
      plain: "x∘x' = x'∘x = e",
    },
  ]),
];
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/data/formulaSheet.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Run the full test suite to check for regressions**

Run: `npm test`
Expected: all existing suites still pass, plus the 2 new ones.

- [ ] **Step 6: Commit**

```bash
git add src/data/formulaSheet.ts src/data/formulaSheet.test.ts
git commit -m "Add curated formula sheet data for all theory chapters"
```

---

### Task 2: Install document-generation dev dependencies

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json` (auto-updated by npm)

- [ ] **Step 1: Install the packages**

Run: `npm install --save-dev tsx puppeteer docx @types/node`
Expected: exits 0; `package.json`'s `devDependencies` gains `tsx`, `puppeteer`, `docx`, and `@types/node` entries (puppeteer's postinstall also downloads a local Chromium build — this can take a few minutes).

- [ ] **Step 2: Verify the app still type-checks**

Run: `npm run typecheck`
Expected: exits 0 with no errors — `scripts/` isn't part of `tsconfig.json`'s `"include"`, so these new dev-only tools don't affect the app's type-check.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "Add tsx, puppeteer, docx, @types/node for formula sheet generation"
```

---

### Task 3: PDF generation script

**Files:**
- Create: `scripts/generate-formula-pdf.ts`

**Interfaces:**
- Consumes: `FORMULA_SHEET: FormulaChapter[]` from `../src/data/formulaSheet` (Task 1).
- Produces: `public/formule-bacalaureat.pdf` on disk.

- [ ] **Step 1: Write the script**

Create `scripts/generate-formula-pdf.ts`:

```ts
import { cpSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import katex from "katex";
import puppeteer from "puppeteer";
import { FORMULA_SHEET } from "../src/data/formulaSheet";

const __dirname = dirname(fileURLToPath(import.meta.url));
const katexDistDir = join(__dirname, "..", "node_modules", "katex", "dist");
const outputPath = join(__dirname, "..", "public", "formule-bacalaureat.pdf");

function renderHtml(): string {
  const sections = FORMULA_SHEET.map((chapter) => {
    const formulas = chapter.formulas
      .map((formula) => {
        const math = katex.renderToString(formula.latex, {
          throwOnError: false,
          displayMode: true,
        });
        return `
          <div class="formula">
            <div class="formula__label">${formula.label}</div>
            <div class="formula__math">${math}</div>
          </div>`;
      })
      .join("\n");
    return `
      <section class="chapter">
        <h2>${chapter.title}</h2>
        ${formulas}
      </section>`;
  }).join("\n");

  return `<!doctype html>
<html lang="ro">
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="katex.min.css" />
<style>
  @page { size: A4; margin: 18mm 16mm; }
  body { font-family: "Segoe UI", Arial, sans-serif; color: #1a1a1a; }
  h1 { font-size: 22px; margin-bottom: 4px; }
  .subtitle { color: #555; margin-top: 0; margin-bottom: 24px; font-size: 13px; }
  .chapter { break-inside: avoid; margin-bottom: 18px; }
  h2 { font-size: 16px; border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-bottom: 10px; }
  .formula { display: flex; align-items: baseline; gap: 12px; margin-bottom: 8px; page-break-inside: avoid; }
  .formula__label { flex: 0 0 220px; font-size: 12px; color: #444; }
  .formula__math { font-size: 15px; }
</style>
</head>
<body>
  <h1>BacMate — Formule matematice (Bacalaureat M2)</h1>
  <p class="subtitle">Formulele esențiale din toate capitolele de teorie.</p>
  ${sections}
</body>
</html>`;
}

async function main() {
  const html = renderHtml();
  const tmpDir = mkdtempSync(join(tmpdir(), "bacmate-formula-"));
  cpSync(katexDistDir, tmpDir, { recursive: true });
  const tmpHtmlPath = join(tmpDir, "formule.html");
  writeFileSync(tmpHtmlPath, html, "utf-8");

  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto(`file://${tmpHtmlPath.replace(/\\/g, "/")}`, { waitUntil: "networkidle0" });
    await page.pdf({ path: outputPath as `${string}.pdf`, format: "A4", printBackground: true });
  } finally {
    await browser.close();
    rmSync(tmpDir, { recursive: true, force: true });
  }

  console.log(`Written ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

- [ ] **Step 2: Run the script**

Run: `npx tsx scripts/generate-formula-pdf.ts`
Expected: prints `Written .../public/formule-bacalaureat.pdf`; exits 0.

- [ ] **Step 3: Verify the output file**

Run: `ls -la public/formule-bacalaureat.pdf`
Expected: file listed, size at least a few tens of KB (KaTeX-rendered math across all 10 chapters). Open it manually if possible to confirm all 10 chapter headings and readable typeset formulas appear, with no `\text{...}` or raw LaTeX leaking into the output.

- [ ] **Step 4: Commit**

```bash
git add scripts/generate-formula-pdf.ts
git commit -m "Add PDF generation script for the formula sheet"
```

(`public/formule-bacalaureat.pdf` stays untracked for now — Task 5 commits both generated files together once the DOCX script also exists.)

---

### Task 4: Word (DOCX) generation script

**Files:**
- Create: `scripts/generate-formula-docx.ts`

**Interfaces:**
- Consumes: `FORMULA_SHEET: FormulaChapter[]` from `../src/data/formulaSheet` (Task 1).
- Produces: `public/formule-bacalaureat.docx` on disk.

- [ ] **Step 1: Write the script**

Create `scripts/generate-formula-docx.ts`:

```ts
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";
import { FORMULA_SHEET } from "../src/data/formulaSheet";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = join(__dirname, "..", "public", "formule-bacalaureat.docx");

const children: Paragraph[] = [
  new Paragraph({
    text: "BacMate — Formule matematice (Bacalaureat M2)",
    heading: HeadingLevel.TITLE,
  }),
  new Paragraph({
    text: "Formulele esențiale din toate capitolele de teorie.",
    spacing: { after: 300 },
  }),
];

for (const chapter of FORMULA_SHEET) {
  children.push(
    new Paragraph({
      text: chapter.title,
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 150 },
    }),
  );
  for (const formula of chapter.formulas) {
    children.push(
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({ text: `${formula.label}: `, bold: true }),
          new TextRun({ text: formula.plain }),
        ],
      }),
    );
  }
}

const doc = new Document({ sections: [{ children }] });

async function main() {
  const buffer = await Packer.toBuffer(doc);
  writeFileSync(outputPath, buffer);
  console.log(`Written ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

- [ ] **Step 2: Run the script**

Run: `npx tsx scripts/generate-formula-docx.ts`
Expected: prints `Written .../public/formule-bacalaureat.docx`; exits 0.

- [ ] **Step 3: Verify the output file**

Run: `ls -la public/formule-bacalaureat.docx`
Expected: file listed, non-zero size (a few KB). Open it manually if possible to confirm all 10 chapter headings and formula lines are present and readable.

- [ ] **Step 4: Commit**

```bash
git add scripts/generate-formula-docx.ts
git commit -m "Add Word generation script for the formula sheet"
```

---

### Task 5: Wire up `npm run generate:formulas` and commit the generated files

**Files:**
- Modify: `package.json`
- Create (binary, committed): `public/formule-bacalaureat.pdf`
- Create (binary, committed): `public/formule-bacalaureat.docx`

- [ ] **Step 1: Add the combined npm script**

In `package.json`, add `"generate:formulas"` to the `"scripts"` block (keep every existing entry):

```json
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "typecheck": "tsc --noEmit",
    "generate:formulas": "tsx scripts/generate-formula-pdf.ts && tsx scripts/generate-formula-docx.ts"
  },
```

- [ ] **Step 2: Run it end-to-end**

Run: `npm run generate:formulas`
Expected: both `Written ...formule-bacalaureat.pdf` and `Written ...formule-bacalaureat.docx` lines printed; exits 0.

- [ ] **Step 3: Verify both files are new/untracked**

Run: `git status --short public/`
Expected: shows `?? public/formule-bacalaureat.pdf` and `?? public/formule-bacalaureat.docx`.

- [ ] **Step 4: Commit**

```bash
git add package.json public/formule-bacalaureat.pdf public/formule-bacalaureat.docx
git commit -m "Generate and commit the printable formula sheet (PDF + Word)"
```

---

### Task 6: Home page download links

**Files:**
- Create: `src/vite-env.d.ts`
- Modify: `src/pages/Home.tsx`
- Modify: `src/styles/index.css`

**Interfaces:**
- Consumes: the static files produced in Task 5 at `${import.meta.env.BASE_URL}formule-bacalaureat.pdf` / `.docx`.

- [ ] **Step 1: Add Vite client types**

Create `src/vite-env.d.ts` (this repo doesn't have one yet; without it, `import.meta.env.BASE_URL` doesn't type-check):

```ts
/// <reference types="vite/client" />
```

- [ ] **Step 2: Add the download links to Home.tsx**

In `src/pages/Home.tsx`, replace:

```tsx
      <div className="exam-cta-row">
        <Link to="/exam" className="exam-cta">
          Examen aleatoriu (Subiectul I, II, III)
        </Link>
        <Link to="/exam/variants" className="exam-cta exam-cta--secondary">
          Alege o variantă (1-25)
        </Link>
      </div>
    </div>
  );
}
```

with:

```tsx
      <div className="exam-cta-row">
        <Link to="/exam" className="exam-cta">
          Examen aleatoriu (Subiectul I, II, III)
        </Link>
        <Link to="/exam/variants" className="exam-cta exam-cta--secondary">
          Alege o variantă (1-25)
        </Link>
      </div>

      <p className="page__formula-links">
        Formule matematice:{" "}
        <a href={`${import.meta.env.BASE_URL}formule-bacalaureat.pdf`} download>
          Descarcă PDF
        </a>
        {" · "}
        <a href={`${import.meta.env.BASE_URL}formule-bacalaureat.docx`} download>
          Descarcă Word
        </a>
      </p>
    </div>
  );
}
```

- [ ] **Step 3: Style the new line**

In `src/styles/index.css`, replace:

```css
.page__intro,
.page__summary,
.page__progress {
  color: var(--muted);
}
```

with:

```css
.page__intro,
.page__summary,
.page__progress,
.page__formula-links {
  color: var(--muted);
}

.page__formula-links {
  margin-top: 16px;
}
```

- [ ] **Step 4: Run the full build**

Run: `npm run build`
Expected: exits 0 (`tsc --noEmit` passes with the new `import.meta.env.BASE_URL` usage, `vite build` succeeds).

- [ ] **Step 5: Verify the static files land in dist/**

Run: `ls -la dist/formule-bacalaureat.pdf dist/formule-bacalaureat.docx`
Expected: both files listed (Vite copies `public/` verbatim into `dist/`).

- [ ] **Step 6: Manual smoke test in the browser**

Run: `npm run preview`, open the printed local URL, and on the Home page confirm:
- A line "Formule matematice: Descarcă PDF · Descarcă Word" appears below the "Alege o variantă (1-25)" button, styled as muted secondary text.
- Clicking "Descarcă PDF" downloads a working PDF with all 10 chapters and typeset formulas.
- Clicking "Descarcă Word" downloads a working .docx with all 10 chapters and readable formula lines.

- [ ] **Step 7: Run the full test suite**

Run: `npm test`
Expected: all suites pass (no test touches `Home.tsx` directly, so this just guards against regressions elsewhere).

- [ ] **Step 8: Commit**

```bash
git add src/vite-env.d.ts src/pages/Home.tsx src/styles/index.css
git commit -m "Link the printable formula sheet from the Home page"
```
