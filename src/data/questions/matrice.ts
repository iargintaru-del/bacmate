import type { Exercise } from "../../types";

export const matriceExercises: Exercise[] = [
  {
    id: "mt-1",
    topic: "matrice",
    type: "input",
    points: 6,
    prompt:
      "Fie matricea $$A = \\begin{pmatrix} 2 & 0 \\\\ 1 & 3 \\end{pmatrix}.$$ Calculați urma matricei $A$ (suma elementelor de pe diagonala principală).",
    correctAnswer: "5",
    explanation: "Urma este $2 + 3 = 5$.",
  },
  {
    id: "mt-2",
    topic: "matrice",
    type: "mcq",
    points: 6,
    prompt:
      "Fie $$A = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}, \\quad B = \\begin{pmatrix} 1 & 0 \\\\ 2 & 1 \\end{pmatrix}.$$ Elementul de pe linia 1, coloana 1 al produsului $A \\cdot B$ este:",
    options: ["$5$", "$2$", "$1$", "$3$"],
    correctAnswer: "$5$",
    explanation: "Elementul $(1,1)$ este $1 \\cdot 1 + 2 \\cdot 2 = 1 + 4 = 5$.",
  },
  {
    id: "mt-3",
    topic: "matrice",
    type: "input",
    points: 6,
    prompt:
      "Fie $$A = \\begin{pmatrix} 3 & 1 \\\\ 2 & 4 \\end{pmatrix}.$$ Calculați elementul de pe linia 2, coloana 2 al matricei $2A$.",
    correctAnswer: "8",
    explanation: "Elementul $(2,2)$ al lui $A$ este $4$, deci în $2A$ este $2 \\cdot 4 = 8$.",
  },
  {
    id: "mt-4",
    topic: "matrice",
    type: "mcq",
    points: 6,
    prompt: "Care este matricea unitate (identitate) de ordinul 2?",
    options: [
      "$\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$",
      "$\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$",
      "$\\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}$",
      "$\\begin{pmatrix} 0 & 0 \\\\ 0 & 0 \\end{pmatrix}$",
    ],
    correctAnswer: "$\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$",
    explanation: "Matricea identitate are $1$ pe diagonala principală și $0$ în rest.",
  },
];
