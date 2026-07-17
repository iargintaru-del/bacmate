import type { Exercise } from "../../types";

export const numereComplexeExercises: Exercise[] = [
  {
    id: "nc-1",
    topic: "numere-complexe",
    type: "input",
    points: 6,
    prompt: "Se consideră numărul complex $z = 3 + 4i$. Calculați $|z|$.",
    correctAnswer: "5",
    explanation: "$|z| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.",
  },
  {
    id: "nc-2",
    topic: "numere-complexe",
    type: "mcq",
    points: 6,
    prompt: "Care este conjugatul numărului complex $z = 2 - 5i$?",
    options: ["$2 + 5i$", "$-2 + 5i$", "$2 - 5i$", "$-2 - 5i$"],
    correctAnswer: "$2 + 5i$",
    explanation: "Conjugatul lui $a - bi$ este $a + bi$, deci $\\overline{2 - 5i} = 2 + 5i$.",
  },
  {
    id: "nc-3",
    topic: "numere-complexe",
    type: "input",
    points: 6,
    prompt: "Calculați $i^{2023}$.",
    correctAnswer: "-i",
    explanation: "$2023 = 4 \\cdot 505 + 3$, deci $i^{2023} = i^3 = -i$.",
  },
  {
    id: "nc-4",
    topic: "numere-complexe",
    type: "mcq",
    points: 6,
    prompt: "Fie $z_1 = 1 + i$ și $z_2 = 1 - i$. Calculați $z_1 \\cdot z_2$.",
    options: ["$2$", "$2i$", "$0$", "$-2$"],
    correctAnswer: "$2$",
    explanation: "$z_1 \\cdot z_2 = (1+i)(1-i) = 1 - i^2 = 1 + 1 = 2$.",
  },
];
