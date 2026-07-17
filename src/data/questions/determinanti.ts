import type { Exercise } from "../../types";

export const determinantiExercises: Exercise[] = [
  {
    id: "dt-1",
    topic: "determinanti",
    type: "input",
    points: 6,
    prompt: "Calculați determinantul matricei $$\\begin{pmatrix} 2 & 3 \\\\ 1 & 4 \\end{pmatrix}.$$",
    correctAnswer: "5",
    explanation: "$\\det = 2 \\cdot 4 - 3 \\cdot 1 = 8 - 3 = 5$.",
  },
  {
    id: "dt-2",
    topic: "determinanti",
    type: "mcq",
    points: 6,
    prompt: "Determinantul matricei identitate $I_3$ este:",
    options: ["$1$", "$0$", "$3$", "$-1$"],
    correctAnswer: "$1$",
    explanation: "Determinantul matricei identitate de orice ordin este întotdeauna $1$.",
  },
  {
    id: "dt-3",
    topic: "determinanti",
    type: "input",
    points: 6,
    prompt: "Calculați determinantul matricei $$\\begin{pmatrix} 1 & 2 \\\\ 2 & 4 \\end{pmatrix}.$$",
    correctAnswer: "0",
    explanation: "Liniile sunt proporționale ($L_2 = 2L_1$), deci $\\det = 1 \\cdot 4 - 2 \\cdot 2 = 0$.",
  },
  {
    id: "dt-4",
    topic: "determinanti",
    type: "mcq",
    points: 6,
    prompt: "Dacă $\\det(A) = 5$ pentru o matrice pătratică $A$ de ordinul 2, atunci $\\det(2A)$ este:",
    options: ["$20$", "$10$", "$5$", "$2$"],
    correctAnswer: "$20$",
    explanation:
      "Pentru o matrice de ordin $n$, $\\det(kA) = k^n \\det(A)$. Aici $n=2$, deci $\\det(2A) = 2^2 \\cdot 5 = 20$.",
  },
];
