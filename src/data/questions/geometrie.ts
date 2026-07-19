import type { Exercise } from "../../types";

export const geometrieExercises: Exercise[] = [
  {
    id: "gm-1",
    topic: "geometrie",
    type: "input",
    points: 6,
    prompt: "Calculați distanța dintre punctele $A(1,2)$ și $B(4,6)$.",
    correctAnswer: "5",
    explanation: [
      "Pentru $A(x_1,y_1)$ și $B(x_2,y_2)$, distanța este $AB=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.",
      "Înlocuim: $AB=\\sqrt{(4-1)^2+(6-2)^2}=\\sqrt{3^2+4^2}$.",
      "Calculăm sub radical: $9+16=25$.",
      "Rezultă $AB=\\sqrt{25}=5$.",
    ],
  },
  {
    id: "gm-2",
    topic: "geometrie",
    type: "mcq",
    points: 6,
    prompt: "Mijlocul segmentului determinat de punctele $A(2,3)$ și $B(6,7)$ are coordonatele:",
    options: ["$(4,5)$", "$(3,4)$", "$(8,10)$", "$(2,3)$"],
    correctAnswer: "$(4,5)$",
    explanation: [
      "Mijlocul segmentului $AB$ are coordonatele $M\\left(\\dfrac{x_1+x_2}{2},\\dfrac{y_1+y_2}{2}\\right)$.",
      "Înlocuim: $M\\left(\\dfrac{2+6}{2},\\dfrac{3+7}{2}\\right)=M(4,5)$.",
    ],
  },
  {
    id: "gm-3",
    topic: "geometrie",
    type: "input",
    points: 6,
    prompt: "Calculați panta dreptei $AB$, unde $A(1,1)$ și $B(3,7)$.",
    correctAnswer: "3",
    explanation: [
      "Panta dreptei determinate de $A(x_1,y_1)$ și $B(x_2,y_2)$ este $m=\\dfrac{y_2-y_1}{x_2-x_1}$.",
      "Înlocuim: $m=\\dfrac{7-1}{3-1}=\\dfrac{6}{2}$.",
      "Rezultă $m=3$.",
    ],
  },
  {
    id: "gm-4",
    topic: "geometrie",
    type: "mcq",
    points: 6,
    prompt: "Un triunghi dreptunghic are catetele $6$ și $8$. Calculați lungimea ipotenuzei.",
    options: ["$10$", "$14$", "$48$", "$7$"],
    correctAnswer: "$10$",
    explanation: [
      "Aplicăm teorema lui Pitagora: ipotenuza$^2=$ cateta$_1^2+$ cateta$_2^2$.",
      "Înlocuim: ipotenuza$^2=6^2+8^2=36+64=100$.",
      "Rezultă ipotenuza $=\\sqrt{100}=10$.",
    ],
  },
];
