import { describe, it, expect } from "vitest";
import { ALL_EXERCISES, ALL_PROBLEMS, EXAM_VARIANTS, TOPICS, exercisesByTopic } from "./index";
import { buildVariantExam } from "../lib/examBuilder";

describe("question bank integrity", () => {
  it("has unique exercise ids", () => {
    const ids = ALL_EXERCISES.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique problem and subpoint ids", () => {
    const ids = ALL_PROBLEMS.flatMap((p) => [p.id, ...p.subpoints.map((s) => s.id)]);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has at least one exercise per topic", () => {
    for (const topic of TOPICS) {
      expect(exercisesByTopic(topic).length).toBeGreaterThan(0);
    }
  });

  it("every exercise is worth 6 points", () => {
    for (const exercise of ALL_EXERCISES) {
      expect(exercise.points).toBe(6);
    }
  });

  it("has subpoints summing to 15 points per problem", () => {
    for (const problem of ALL_PROBLEMS) {
      const sum = problem.subpoints.reduce((acc, s) => acc + s.points, 0);
      expect(sum).toBe(15);
    }
  });

  it("has at least 2 algebra and 2 analysis problems", () => {
    expect(ALL_PROBLEMS.filter((p) => p.subject === "II").length).toBeGreaterThanOrEqual(2);
    expect(ALL_PROBLEMS.filter((p) => p.subject === "III").length).toBeGreaterThanOrEqual(2);
  });

  it("every mcq item's correctAnswer is present among its options", () => {
    const allGradable = [...ALL_EXERCISES, ...ALL_PROBLEMS.flatMap((p) => p.subpoints)];
    for (const item of allGradable) {
      if (item.type === "mcq") {
        expect(item.options).toBeDefined();
        expect(item.options).toContain(item.correctAnswer);
      }
    }
  });
});

describe("exam variants", () => {
  it("has exactly 25 numbered variants", () => {
    expect(EXAM_VARIANTS).toHaveLength(25);
    expect(EXAM_VARIANTS.map((v) => v.number).sort((a, b) => a - b)).toEqual(
      Array.from({ length: 25 }, (_, i) => i + 1)
    );
  });

  it("every variant's ids resolve against the real content pools without error", () => {
    for (const variant of EXAM_VARIANTS) {
      expect(() => buildVariantExam(variant, ALL_EXERCISES, ALL_PROBLEMS)).not.toThrow();
      const session = buildVariantExam(variant, ALL_EXERCISES, ALL_PROBLEMS);
      expect(session.subiectI).toHaveLength(5);
      expect(session.subiectII).toHaveLength(2);
      expect(session.subiectIII).toHaveLength(2);
      expect(session.subiectII.every((p) => p.subject === "II")).toBe(true);
      expect(session.subiectIII.every((p) => p.subject === "III")).toBe(true);
    }
  });

  it("no exercise or problem id is reused across any of the 25 variants", () => {
    const allExerciseIds = EXAM_VARIANTS.flatMap((v) => v.subiectIIds);
    const allIIIds = EXAM_VARIANTS.flatMap((v) => v.subiectIIIds);
    const allIIIIds = EXAM_VARIANTS.flatMap((v) => v.subiectIIIIds);
    expect(new Set(allExerciseIds).size).toBe(allExerciseIds.length);
    expect(new Set(allIIIds).size).toBe(allIIIds.length);
    expect(new Set(allIIIIds).size).toBe(allIIIIds.length);
  });
});

describe("explanation format", () => {
  function isNonEmptyExplanation(explanation: string | string[]): boolean {
    if (Array.isArray(explanation)) {
      return explanation.length > 0 && explanation.every((step) => step.trim().length > 0);
    }
    return explanation.trim().length > 0;
  }

  it("every exercise explanation is non-empty", () => {
    for (const exercise of ALL_EXERCISES) {
      expect(isNonEmptyExplanation(exercise.explanation)).toBe(true);
    }
  });

  it("every problem subpoint explanation is non-empty", () => {
    for (const problem of ALL_PROBLEMS) {
      for (const subpoint of problem.subpoints) {
        expect(isNonEmptyExplanation(subpoint.explanation)).toBe(true);
      }
    }
  });
});
