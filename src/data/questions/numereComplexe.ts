import type { Exercise } from "../../types";

export const numereComplexeExercises: Exercise[] = [
  {
    id: "nc-1",
    topic: "numere-complexe",
    type: "input",
    points: 6,
    prompt: "Se consideră numărul complex $z = 3 + 4i$. Calculați $|z|$.",
    correctAnswer: "5",
    explanation: [
      "Pentru $z=a+bi$, modulul este $|z|=\\sqrt{a^2+b^2}$.",
      "Aici $a=3$, $b=4$, deci înlocuim: $|z|=\\sqrt{3^2+4^2}$.",
      "Calculăm sub radical: $3^2+4^2=9+16=25$.",
      "Rezultă $|z|=\\sqrt{25}=5$.",
    ],
  },
  {
    id: "nc-2",
    topic: "numere-complexe",
    type: "mcq",
    points: 6,
    prompt: "Care este conjugatul numărului complex $z = 2 - 5i$?",
    options: ["$2 + 5i$", "$-2 + 5i$", "$2 - 5i$", "$-2 - 5i$"],
    correctAnswer: "$2 + 5i$",
    explanation: [
      "Conjugatul unui număr complex $a-bi$ este $a+bi$ (se schimbă semnul părții imaginare).",
      "Aici $z=2-5i$, cu $a=2$ și partea imaginară $-5$.",
      "Schimbăm semnul părții imaginare: $\\overline{z}=2+5i$.",
    ],
  },
  {
    id: "nc-3",
    topic: "numere-complexe",
    type: "input",
    points: 6,
    prompt: "Calculați $i^{2023}$.",
    correctAnswer: "-i",
    explanation: [
      "Puterile lui $i$ se repetă cu perioada 4: $i^1=i,\\,i^2=-1,\\,i^3=-i,\\,i^4=1$.",
      "Împărțim exponentul la 4: $2023 = 4\\cdot505+3$.",
      "Restul împărțirii este $3$, deci $i^{2023}=i^3$.",
      "Rezultă $i^{2023}=-i$.",
    ],
  },
  {
    id: "nc-4",
    topic: "numere-complexe",
    type: "mcq",
    points: 6,
    prompt: "Fie $z_1 = 1 + i$ și $z_2 = 1 - i$. Calculați $z_1 \\cdot z_2$.",
    options: ["$2$", "$2i$", "$0$", "$-2$"],
    correctAnswer: "$2$",
    explanation: [
      "Recunoaștem produsul $(1+i)(1-i)$ ca fiind de forma $(a+b)(a-b)=a^2-b^2$ cu $a=1$, $b=i$.",
      "Calculăm: $(1+i)(1-i)=1-i^2$.",
      "Folosim $i^2=-1$: $1-(-1)=1+1=2$.",
      "Rezultă $z_1 \\cdot z_2 = 2$.",
    ],
  },
];
