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

const doc = new Document({
  creator: "BacMate",
  title: "Formule matematice (Bacalaureat M2)",
  description: "Formulele esențiale din toate capitolele de teorie — BacMate.",
  sections: [{ children }],
});

async function main() {
  const buffer = await Packer.toBuffer(doc);
  writeFileSync(outputPath, buffer);
  console.log(`Written ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
