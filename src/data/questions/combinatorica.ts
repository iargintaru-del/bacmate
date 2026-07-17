import type { Exercise } from "../../types";

export const combinatoricaExercises: Exercise[] = [
  {
    id: "cb-1",
    topic: "combinatorica",
    type: "input",
    points: 6,
    prompt: "Calculați $C_5^2$ (numărul de submulțimi cu 2 elemente ale unei mulțimi cu 5 elemente).",
    correctAnswer: "10",
    explanation: "$C_5^2 = \\dfrac{5!}{2! \\cdot 3!} = \\dfrac{5 \\cdot 4}{2} = 10$.",
  },
  {
    id: "cb-2",
    topic: "combinatorica",
    type: "mcq",
    points: 6,
    prompt:
      "Câte numere de 3 cifre distincte se pot forma cu cifrele $1, 2, 3, 4$ (fiecare cifră utilizată o singură dată)?",
    options: ["$24$", "$12$", "$64$", "$4$"],
    correctAnswer: "$24$",
    explanation: "Este vorba de aranjamente: $A_4^3 = 4 \\cdot 3 \\cdot 2 = 24$.",
  },
  {
    id: "cb-3",
    topic: "combinatorica",
    type: "input",
    points: 6,
    prompt: "Calculați $5!$.",
    correctAnswer: "120",
    explanation: "$5! = 5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1 = 120$.",
  },
  {
    id: "cb-4",
    topic: "combinatorica",
    type: "mcq",
    points: 6,
    prompt: "Care este coeficientul termenului al treilea din dezvoltarea binomului $(x+1)^4$?",
    options: ["$6$", "$4$", "$12$", "$8$"],
    correctAnswer: "$6$",
    explanation: "Termenul al treilea (rangul $k=2$) este $C_4^2 x^2 = 6x^2$, deci coeficientul este $6$.",
  },
];
