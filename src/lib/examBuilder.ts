import type { Exercise, ExamVariant, Problem } from "../types";
import { isCorrectAnswer } from "./grading";

export interface ExamSession {
  subiectI: Exercise[];
  subiectII: Problem[];
  subiectIII: Problem[];
}

export interface GradedItemResult {
  itemId: string;
  earned: number;
  possible: number;
  correct: boolean;
}

export interface ExamResult {
  subiectI: GradedItemResult[];
  subiectII: GradedItemResult[];
  subiectIII: GradedItemResult[];
  subtotalI: number;
  subtotalII: number;
  subtotalIII: number;
  oficiu: number;
  total: number;
  nota: number;
}

function pickRandom<T>(pool: T[], count: number): T[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function buildExam(exercises: Exercise[], problems: Problem[]): ExamSession {
  const algebraProblems = problems.filter((p) => p.subject === "II");
  const analysisProblems = problems.filter((p) => p.subject === "III");
  return {
    subiectI: pickRandom(exercises, 5),
    subiectII: pickRandom(algebraProblems, 2),
    subiectIII: pickRandom(analysisProblems, 2),
  };
}

export function buildVariantExam(variant: ExamVariant, exercises: Exercise[], problems: Problem[]): ExamSession {
  const findExercise = (id: string): Exercise => {
    const exercise = exercises.find((candidate) => candidate.id === id);
    if (!exercise) throw new Error(`Varianta ${variant.number}: exercițiul "${id}" nu a fost găsit.`);
    return exercise;
  };
  const findProblem = (id: string): Problem => {
    const problem = problems.find((candidate) => candidate.id === id);
    if (!problem) throw new Error(`Varianta ${variant.number}: problema "${id}" nu a fost găsită.`);
    return problem;
  };

  return {
    subiectI: variant.subiectIIds.map(findExercise),
    subiectII: variant.subiectIIIds.map(findProblem),
    subiectIII: variant.subiectIIIIds.map(findProblem),
  };
}

function sumEarned(items: GradedItemResult[]): number {
  return items.reduce((acc, item) => acc + item.earned, 0);
}

export function gradeExam(session: ExamSession, answers: Record<string, string>): ExamResult {
  const gradeExercise = (exercise: Exercise): GradedItemResult => {
    const userAnswer = answers[exercise.id] ?? "";
    const correct = isCorrectAnswer(userAnswer, exercise);
    return { itemId: exercise.id, earned: correct ? exercise.points : 0, possible: exercise.points, correct };
  };

  const gradeProblem = (problem: Problem): GradedItemResult[] =>
    problem.subpoints.map((subpoint) => {
      const userAnswer = answers[subpoint.id] ?? "";
      const correct = isCorrectAnswer(userAnswer, subpoint);
      return { itemId: subpoint.id, earned: correct ? subpoint.points : 0, possible: subpoint.points, correct };
    });

  const subiectI = session.subiectI.map(gradeExercise);
  const subiectII = session.subiectII.flatMap(gradeProblem);
  const subiectIII = session.subiectIII.flatMap(gradeProblem);

  const subtotalI = sumEarned(subiectI);
  const subtotalII = sumEarned(subiectII);
  const subtotalIII = sumEarned(subiectIII);
  const oficiu = 10;
  const total = subtotalI + subtotalII + subtotalIII + oficiu;

  return {
    subiectI,
    subiectII,
    subiectIII,
    subtotalI,
    subtotalII,
    subtotalIII,
    oficiu,
    total,
    nota: total / 10,
  };
}
