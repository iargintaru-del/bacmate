import type { Exercise, Problem, Topic } from "../types";
import { numereComplexeExercises } from "./questions/numereComplexe";
import { numereComplexeSetExercises } from "./questions/numereComplexeSets";
import { geometrieExercises } from "./questions/geometrie";
import { geometrieSetExercises } from "./questions/geometrieSets";
import { combinatoricaExercises } from "./questions/combinatorica";
import { combinatoricaSetExercises } from "./questions/combinatoricaSets";
import { matriceExercises } from "./questions/matrice";
import { matriceSetExercises } from "./questions/matriceSets";
import { determinantiExercises } from "./questions/determinanti";
import { determinantiSetExercises } from "./questions/determinantiSets";
import { sistemeExercises } from "./questions/sisteme";
import { sistemeSetExercises } from "./questions/sistemeSets";
import { limiteExercises } from "./questions/limite";
import { limiteSetExercises } from "./questions/limiteSets";
import { derivateExercises } from "./questions/derivate";
import { derivateSetExercises } from "./questions/derivateSets";
import { integraleExercises } from "./questions/integrale";
import { integraleSetExercises } from "./questions/integraleSets";
import { algebraProblems, analysisProblems } from "./questions/problems";
import { examAlgebraProblems } from "./questions/examProblemsAlgebra";
import { examAnalysisProblems } from "./questions/examProblemsAnalysis";
import { EXAM_VARIANTS } from "./examVariants";

export const TOPICS: Topic[] = [
  "numere-complexe",
  "combinatorica",
  "matrice",
  "determinanti",
  "sisteme",
  "limite",
  "derivate",
  "integrale",
  "geometrie",
];

export const TOPIC_LABELS: Record<Topic, string> = {
  "numere-complexe": "Numere complexe",
  combinatorica: "Combinatorică",
  matrice: "Matrici",
  determinanti: "Determinanți",
  sisteme: "Sisteme de ecuații liniare",
  limite: "Limite de funcții",
  derivate: "Derivate și aplicații",
  integrale: "Primitive și integrale definite",
  geometrie: "Geometrie",
};

export const ALL_EXERCISES: Exercise[] = [
  ...numereComplexeExercises,
  ...numereComplexeSetExercises,
  ...combinatoricaExercises,
  ...combinatoricaSetExercises,
  ...matriceExercises,
  ...matriceSetExercises,
  ...determinantiExercises,
  ...determinantiSetExercises,
  ...sistemeExercises,
  ...sistemeSetExercises,
  ...limiteExercises,
  ...limiteSetExercises,
  ...derivateExercises,
  ...derivateSetExercises,
  ...integraleExercises,
  ...integraleSetExercises,
  ...geometrieExercises,
  ...geometrieSetExercises,
];

export const ALL_PROBLEMS: Problem[] = [
  ...algebraProblems,
  ...analysisProblems,
  ...examAlgebraProblems,
  ...examAnalysisProblems,
];

export function exercisesByTopic(topic: Topic): Exercise[] {
  return ALL_EXERCISES.filter((exercise) => exercise.topic === topic);
}

export function setNumbersForTopic(topic: Topic): number[] {
  const sets = new Set<number>();
  for (const exercise of ALL_EXERCISES) {
    if (exercise.topic === topic && exercise.set !== undefined) {
      sets.add(exercise.set);
    }
  }
  return [...sets].sort((a, b) => a - b);
}

export function exercisesForSet(topic: Topic, setNumber: number): Exercise[] {
  return ALL_EXERCISES.filter((exercise) => exercise.topic === topic && exercise.set === setNumber);
}

export { EXAM_VARIANTS };

export function examVariantByNumber(number: number) {
  return EXAM_VARIANTS.find((variant) => variant.number === number);
}
