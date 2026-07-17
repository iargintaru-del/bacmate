import { describe, it, expect } from "vitest";
import { ALL_EXERCISES, ALL_PROBLEMS, TOPICS, exercisesByTopic } from "./index";

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
