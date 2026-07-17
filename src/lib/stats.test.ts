import { describe, it, expect } from "vitest";
import { computeStats } from "./stats";
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
