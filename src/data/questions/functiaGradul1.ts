import type { Exercise } from "../../types";

export const functiaGradul1Exercises: Exercise[] = [
  {
    id: "g1-1",
    topic: "functia-gradul-1",
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=3x-6$. Calculați $f(4)$.",
    correctAnswer: "6",
    explanation: [
      "Înlocuim $x=4$ în expresia funcției: $f(4)=3\\cdot4-6$.",
      "Calculăm: $12-6=6$.",
    ],
  },
  {
    id: "g1-2",
    topic: "functia-gradul-1",
    type: "mcq",
    points: 6,
    prompt: "Funcția $f(x)=-2x+5$ este:",
    options: ["strict descrescătoare pe $\\mathbb{R}$", "strict crescătoare pe $\\mathbb{R}$", "constantă", "nedefinită pentru $x<0$"],
    correctAnswer: "strict descrescătoare pe $\\mathbb{R}$",
    explanation: [
      "Coeficientul lui $x$ este $a=-2<0$.",
      "Cum $a<0$, funcția de gradul I este strict descrescătoare pe $\\mathbb{R}$.",
    ],
  },
  {
    id: "g1-3",
    topic: "functia-gradul-1",
    type: "input",
    points: 6,
    prompt: "Determinați soluția ecuației $4x-8=0$.",
    correctAnswer: "2",
    explanation: [
      "Rezolvăm ecuația: $4x=8$.",
      "Împărțim prin $4$: $x=2$.",
    ],
  },
  {
    id: "g1-4",
    topic: "functia-gradul-1",
    type: "mcq",
    points: 6,
    prompt: "Soluția inecuației $2x-6>0$ este:",
    options: ["$(3,+\\infty)$", "$(-\\infty,3)$", "$(-3,+\\infty)$", "$(-\\infty,-3)$"],
    correctAnswer: "$(3,+\\infty)$",
    explanation: [
      "Rezolvăm ecuația asociată: $2x-6=0 \\Rightarrow x=3$.",
      "Cum $a=2>0$, funcția este strict crescătoare, deci este pozitivă pentru $x>3$.",
      "Soluția inecuației este $(3,+\\infty)$.",
    ],
  },
  {
    id: "g1-5",
    topic: "functia-gradul-1",
    type: "input",
    points: 6,
    prompt: "Determinați ordonata la origine a funcției $f(x)=5x-7$ (valoarea $f(0)$).",
    correctAnswer: "-7",
    explanation: [
      "Ordonata la origine este valoarea funcției în $x=0$: $f(0)=5\\cdot0-7$.",
      "Rezultă $f(0)=-7$.",
    ],
  },
  {
    id: "g1-6",
    topic: "functia-gradul-1",
    type: "mcq",
    points: 6,
    prompt: "Dreptele $y=3x+2$ și $y=3x-5$ sunt:",
    options: ["paralele", "confundate", "perpendiculare", "concurente"],
    correctAnswer: "paralele",
    explanation: [
      "Cele două drepte au aceeași pantă, $a_1=a_2=3$.",
      "Cum $b_1=2\\neq-5=b_2$, dreptele sunt paralele (nu confundate).",
    ],
  },
  {
    id: "g1-7",
    topic: "functia-gradul-1",
    type: "input",
    points: 6,
    prompt: "Determinați abscisa punctului de intersecție al dreptelor $y=x+3$ și $y=-2x+9$.",
    correctAnswer: "2",
    explanation: [
      "Punem condiția $x+3=-2x+9$.",
      "Rezolvăm: $3x=6 \\Rightarrow x=2$.",
    ],
  },
];
