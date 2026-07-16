import { describe, it, expect } from "vitest";
import { normalizeAnswer, isCorrectAnswer } from "./grading";

describe("normalizeAnswer", () => {
  it("trims whitespace and lowercases", () => {
    expect(normalizeAnswer("  Hello World  ")).toBe("helloworld");
  });

  it("strips internal whitespace", () => {
    expect(normalizeAnswer("1 / 2")).toBe("1/2");
  });
});

describe("isCorrectAnswer", () => {
  it("matches the exact correct answer", () => {
    const item = { correctAnswer: "5" };
    expect(isCorrectAnswer("5", item)).toBe(true);
  });

  it("matches case-insensitively and ignoring whitespace", () => {
    const item = { correctAnswer: "-2+2i\\sqrt{3}" };
    expect(isCorrectAnswer(" -2+2i\\sqrt{3} ", item)).toBe(true);
  });

  it("matches accepted alternate forms", () => {
    const item = { correctAnswer: "1/2", acceptedAnswers: ["0.5", "0,5"] };
    expect(isCorrectAnswer("0.5", item)).toBe(true);
    expect(isCorrectAnswer("0,5", item)).toBe(true);
  });

  it("rejects a wrong answer", () => {
    const item = { correctAnswer: "5" };
    expect(isCorrectAnswer("6", item)).toBe(false);
  });
});
