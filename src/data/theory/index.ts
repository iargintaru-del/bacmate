import type { Topic, TheorySection } from "../../types";
import { numereComplexeTheory } from "./numereComplexe";
import { combinatoricaTheory } from "./combinatorica";
import { matriceTheory } from "./matrice";
import { determinantiTheory } from "./determinanti";
import { sistemeTheory } from "./sisteme";
import { limiteTheory } from "./limite";
import { derivateTheory } from "./derivate";
import { integraleTheory } from "./integrale";
import { geometrieTheory } from "./geometrie";
import { legiCompozitieTheory } from "./legiCompozitie";
import { multimiLogicaTheory } from "./multimiLogica";
import { functiaGradul1Theory } from "./functiaGradul1";
import { functiaGradul2Theory } from "./functiaGradul2";
import { siruriTheory } from "./siruri";
import { puteriRadicaliLogaritmiTheory } from "./puteriRadicaliLogaritmi";

export const THEORY: Record<Topic, TheorySection> = {
  "numere-complexe": numereComplexeTheory,
  combinatorica: combinatoricaTheory,
  matrice: matriceTheory,
  determinanti: determinantiTheory,
  sisteme: sistemeTheory,
  limite: limiteTheory,
  derivate: derivateTheory,
  integrale: integraleTheory,
  geometrie: geometrieTheory,
  "legi-compozitie": legiCompozitieTheory,
  "multimi-logica": multimiLogicaTheory,
  "functia-gradul-1": functiaGradul1Theory,
  "functia-gradul-2": functiaGradul2Theory,
  siruri: siruriTheory,
  "puteri-radicali-logaritmi": puteriRadicaliLogaritmiTheory,
};

export function theoryForTopic(topic: Topic): TheorySection | undefined {
  return THEORY[topic];
}
