import type { Exercise, Problem, Topic } from "../types";
import { numereComplexeExercises } from "./questions/numereComplexe";
import { numereComplexeSetExercises } from "./questions/numereComplexeSets";
import { combinatoricaExercises } from "./questions/combinatorica";
import { combinatoricaSetExercises } from "./questions/combinatoricaSets";
import { matriceExercises } from "./questions/matrice";
import { matriceSetExercises } from "./questions/matriceSets";
import { determinantiExercises } from "./questions/determinanti";
import { determinantiSetExercises } from "./questions/determinantiSets";
import { sistemeExercises } from "./questions/sisteme";
import { sistemeSetExercises } from "./questions/sistemeSets";
import { limiteExercises } from "./questions/limite";
import { derivateExercises } from "./questions/derivate";
import { integraleExercises } from "./questions/integrale";
import { algebraProblems, analysisProblems } from "./questions/problems";

export const TOPICS: Topic[] = [
  "numere-complexe",
  "combinatorica",
  "matrice",
  "determinanti",
  "sisteme",
  "limite",
  "derivate",
  "integrale",
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
  ...derivateExercises,
  ...integraleExercises,
];

export const ALL_PROBLEMS: Problem[] = [...algebraProblems, ...analysisProblems];

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
