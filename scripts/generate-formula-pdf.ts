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
