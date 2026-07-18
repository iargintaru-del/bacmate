import type { Exercise } from "../../types";

export const determinantiExercises: Exercise[] = [
  {
    id: "dt-1",
    topic: "determinanti",
    type: "input",
    points: 6,
    prompt: "Calculați determinantul matricei $$\\begin{pmatrix} 2 & 3 \\\\ 1 & 4 \\end{pmatrix}.$$",
    correctAnswer: "5",
    explanation: [
      "Pentru o matrice $2\\times2$, $\\det=ad-bc$.",
      "Înlocuim: $\\det = 2\\cdot4 - 3\\cdot1$.",
      "Calculăm: $8-3=5$.",
    ],
  },
  {
    id: "dt-2",
    topic: "determinanti",
    type: "mcq",
    points: 6,
    prompt: "Determinantul matricei identitate $I_3$ este:",
    options: ["$1$", "$0$", "$3$", "$-1$"],
    correctAnswer: "$1$",
    explanation: [
      "Matricea identitate are $1$ pe diagonala principală și $0$ în rest, indiferent de ordin.",
      "Determinantul matricei identitate de orice ordin este întotdeauna $1$.",
    ],
  },
  {
    id: "dt-3",
    topic: "determinanti",
    type: "input",
    points: 6,
    prompt: "Calculați determinantul matricei $$\\begin{pmatrix} 1 & 2 \\\\ 2 & 4 \\end{pmatrix}.$$",
    correctAnswer: "0",
    explanation: [
      "Observăm că a doua linie este de $2$ ori prima linie: $(2,4)=2\\cdot(1,2)$.",
      "Când două linii sunt proporționale, determinantul este $0$.",
      "Verificăm direct: $\\det = 1\\cdot4-2\\cdot2=4-4=0$.",
    ],
  },
  {
    id: "dt-4",
    topic: "determinanti",
    type: "mcq",
    points: 6,
    prompt: "Dacă $\\det(A) = 5$ pentru o matrice pătratică $A$ de ordinul 2, atunci $\\det(2A)$ este:",
    options: ["$20$", "$10$", "$5$", "$2$"],
    correctAnswer: "$20$",
    explanation: [
      "Pentru o matrice pătratică de ordin $n$, are loc proprietatea $\\det(kA)=k^n\\det(A)$.",
      "Aici $k=2$ și $n=2$ (matrice de ordinul 2).",
      "Înlocuim: $\\det(2A) = 2^2 \\cdot \\det(A) = 4\\cdot5$.",
      "Rezultă $\\det(2A)=20$.",
    ],
  },
];
