import type { Exercise, Problem, Topic } from "../types";
import { numereComplexeExercises } from "./questions/numereComplexe";
import { combinatoricaExercises } from "./questions/combinatorica";
import { matriceExercises } from "./questions/matrice";
import { determinantiExercises } from "./questions/determinanti";
import { sistemeExercises } from "./questions/sisteme";
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
  matrice: "Matrice",
  determinanti: "Determinanți",
  sisteme: "Sisteme de ecuații liniare",
  limite: "Limite de funcții",
  derivate: "Derivate și aplicații",
  integrale: "Primitive și integrale definite",
};

export const ALL_EXERCISES: Exercise[] = [
  ...numereComplexeExercises,
  ...combinatoricaExercises,
  ...matriceExercises,
  ...determinantiExercises,
  ...sistemeExercises,
  ...limiteExercises,
  ...derivateExercises,
  ...integraleExercises,
];

export const ALL_PROBLEMS: Problem[] = [...algebraProblems, ...analysisProblems];

export function exercisesByTopic(topic: Topic): Exercise[] {
  return ALL_EXERCISES.filter((exercise) => exercise.topic === topic);
}
