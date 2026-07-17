import { describe, it, expect } from "vitest";
import { buildExam, gradeExam } from "./examBuilder";
import type { Exercise, Problem } from "../types";

function makeExercise(id: string): Exercise {
  return {
    id,
    topic: "limite",
    type: "input",
    points: 6,
    prompt: `prompt ${id}`,
    correctAnswer: "42",
    explanation: "because",
  };
}

function makeProblem(id: string, subject: "II" | "III"): Problem {
  return {
    id,
    topic: subject === "II" ? "matrice" : "derivate",
    subject,
    statement: `statement ${id}`,
    subpoints: [
      { id: `${id}-a`, label: "a", type: "input", points: 5, prompt: "a", correctAnswer: "1", explanation: "e" },
      { id: `${id}-b`, label: "b", type: "input", points: 5, prompt: "b", correctAnswer: "2", explanation: "e" },
      { id: `${id}-c`, label: "c", type: "input", points: 5, prompt: "c", correctAnswer: "3", explanation: "e" },
    ],
  };
}

const exercises = Array.from({ length: 8 }, (_, i) => makeExercise(`ex-${i}`));
const problems = [
  makeProblem("p2-1", "II"),
  makeProblem("p2-2", "II"),
  makeProblem("p3-1", "III"),
  makeProblem("p3-2", "III"),
];

describe("buildExam", () => {
  it("picks 5 exercises, 2 algebra problems, 2 analysis problems", () => {
    const session = buildExam(exercises, problems);
    expect(session.subiectI).toHaveLength(5);
    expect(session.subiectII).toHaveLength(2);
    expect(session.subiectIII).toHaveLength(2);
    expect(session.subiectII.every((p) => p.subject === "II")).toBe(true);
    expect(session.subiectIII.every((p) => p.subject === "III")).toBe(true);
  });

  it("never picks the same exercise twice", () => {
    const session = buildExam(exercises, problems);
    const ids = session.subiectI.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("gradeExam", () => {
  it("grades exercises and subpoints, computes subtotals, total, and nota", () => {
    const session = buildExam(exercises, problems);
    const answers: Record<string, string> = {};
    for (const ex of session.subiectI) answers[ex.id] = "42"; // all correct, 6 pts each = 30
    for (const problem of [...session.subiectII, ...session.subiectIII]) {
      answers[`${problem.id}-a`] = "1"; // correct, 5
      answers[`${problem.id}-b`] = "wrong"; // incorrect, 0
      answers[`${problem.id}-c`] = "3"; // correct, 5
    }

    const result = gradeExam(session, answers);
    expect(result.subtotalI).toBe(30);
    expect(result.subtotalII).toBe(20); // 2 problems * (5+0+5)
    expect(result.subtotalIII).toBe(20);
    expect(result.oficiu).toBe(10);
    expect(result.total).toBe(30 + 20 + 20 + 10);
    expect(result.nota).toBeCloseTo(result.total / 10);
  });

  it("scores missing answers as 0", () => {
    const session = buildExam(exercises, problems);
    const result = gradeExam(session, {});
    expect(result.subtotalI).toBe(0);
    expect(result.subtotalII).toBe(0);
    expect(result.subtotalIII).toBe(0);
    expect(result.total).toBe(10); // just oficiu
  });
});
