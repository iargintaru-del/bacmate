import { describe, it, expect } from "vitest";
import { computeStats, computeSetScore } from "./stats";
import type { Attempt } from "./storage";
import type { Topic } from "../types";

const topics: Topic[] = ["limite", "derivate"];

describe("computeStats", () => {
  it("returns zeroed stats for an empty attempt list", () => {
    const result = computeStats([], topics);
    expect(result.total).toBe(0);
    expect(result.accuracy).toBe(0);
    expect(result.byTopic).toEqual([
      { topic: "limite", total: 0, correct: 0, accuracy: 0 },
      { topic: "derivate", total: 0, correct: 0, accuracy: 0 },
    ]);
  });

  it("computes overall and per-topic accuracy", () => {
    const attempts: Attempt[] = [
      { itemId: "a", topic: "limite", correct: true, timestamp: 1 },
      { itemId: "b", topic: "limite", correct: false, timestamp: 2 },
      { itemId: "c", topic: "derivate", correct: true, timestamp: 3 },
    ];
    const result = computeStats(attempts, topics);
    expect(result.total).toBe(3);
    expect(result.correct).toBe(2);
    expect(result.accuracy).toBeCloseTo(2 / 3);

    const limite = result.byTopic.find((t) => t.topic === "limite")!;
    expect(limite).toEqual({ topic: "limite", total: 2, correct: 1, accuracy: 0.5 });

    const derivate = result.byTopic.find((t) => t.topic === "derivate")!;
    expect(derivate).toEqual({ topic: "derivate", total: 1, correct: 1, accuracy: 1 });
  });
});

describe("computeSetScore", () => {
  const itemIds = ["a", "b", "c"];

  it("reports zero attempted and zero correct when the set has never been attempted", () => {
    const result = computeSetScore([], itemIds);
    expect(result).toEqual({ correct: 0, attempted: 0 });
  });

  it("counts each item's most recent attempt only, ignoring earlier retries", () => {
    const attempts: Attempt[] = [
      { itemId: "a", topic: "limite", correct: false, timestamp: 1 },
      { itemId: "a", topic: "limite", correct: true, timestamp: 2 }, // retried and fixed
      { itemId: "b", topic: "limite", correct: true, timestamp: 1 },
      { itemId: "b", topic: "limite", correct: false, timestamp: 2 }, // retried and got wrong
    ];
    const result = computeSetScore(attempts, itemIds);
    expect(result).toEqual({ correct: 1, attempted: 2 }); // a=correct(latest), b=incorrect(latest), c=untouched
  });

  it("ignores attempts for items outside the given set", () => {
    const attempts: Attempt[] = [
      { itemId: "a", topic: "limite", correct: true, timestamp: 1 },
      { itemId: "not-in-set", topic: "limite", correct: true, timestamp: 1 },
    ];
    const result = computeSetScore(attempts, itemIds);
    expect(result).toEqual({ correct: 1, attempted: 1 });
  });
});
