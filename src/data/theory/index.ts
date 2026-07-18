import type { Topic, TheorySection } from "../../types";
import { numereComplexeTheory } from "./numereComplexe";
import { combinatoricaTheory } from "./combinatorica";
import { matriceTheory } from "./matrice";
import { determinantiTheory } from "./determinanti";
import { sistemeTheory } from "./sisteme";
import { limiteTheory } from "./limite";
import { derivateTheory } from "./derivate";
import { integraleTheory } from "./integrale";

export const THEORY: Record<Topic, TheorySection> = {
  "numere-complexe": numereComplexeTheory,
  combinatorica: combinatoricaTheory,
  matrice: matriceTheory,
  determinanti: determinantiTheory,
  sisteme: sistemeTheory,
  limite: limiteTheory,
  derivate: derivateTheory,
  integrale: integraleTheory,
};

export function theoryForTopic(topic: Topic): TheorySection | undefined {
  return THEORY[topic];
}
