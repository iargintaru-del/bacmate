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
