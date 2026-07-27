import type { Exercise } from "../../types";

export const functiaGradul2Exercises: Exercise[] = [
  {
    id: "g2-1",
    topic: "functia-gradul-2",
    type: "input",
    points: 6,
    prompt: "Fie $f(x)=x^2-6x+8$. Calculați discriminantul $\\Delta$.",
    correctAnswer: "4",
    explanation: [
      "Calculăm $\\Delta=b^2-4ac=(-6)^2-4\\cdot1\\cdot8$.",
      "Rezultă $\\Delta=36-32=4$.",
    ],
  },
  {
    id: "g2-2",
    topic: "functia-gradul-2",
    type: "mcq",
    points: 6,
    prompt: "Ecuația $x^2+2x+5=0$ are:",
    options: ["nicio soluție reală", "o soluție reală dublă", "două soluții reale distincte", "trei soluții reale"],
    correctAnswer: "nicio soluție reală",
    explanation: [
      "Calculăm $\\Delta=2^2-4\\cdot1\\cdot5=4-20=-16$.",
      "Cum $\\Delta<0$, ecuația nu are soluții reale.",
    ],
  },
  {
    id: "g2-3",
    topic: "functia-gradul-2",
    type: "input",
    points: 6,
    prompt: "Determinați abscisa vârfului parabolei asociate funcției $f(x)=x^2-8x+12$.",
    correctAnswer: "4",
    explanation: [
      "Abscisa vârfului este $x_V=-\\dfrac{b}{2a}=-\\dfrac{-8}{2\\cdot1}$.",
      "Calculăm: $x_V=4$.",
    ],
  },
  {
    id: "g2-4",
    topic: "functia-gradul-2",
    type: "mcq",
    points: 6,
    prompt: "Dacă $x_1$ și $x_2$ sunt soluțiile ecuației $x^2-7x+10=0$, atunci $x_1+x_2$ este:",
    options: ["$7$", "$10$", "$-7$", "$3$"],
    correctAnswer: "$7$",
    explanation: [
      "Conform relațiilor lui Viète, $x_1+x_2=-\\dfrac{b}{a}$.",
      "Aici $a=1$, $b=-7$, deci $x_1+x_2=7$.",
    ],
  },
  {
    id: "g2-5",
    topic: "functia-gradul-2",
    type: "input",
    points: 6,
    prompt: "Determinați produsul soluțiilor ecuației $x^2-2x-15=0$, folosind relațiile lui Viète.",
    correctAnswer: "-15",
    explanation: [
      "Conform relațiilor lui Viète, produsul soluțiilor este $x_1\\cdot x_2=\\dfrac{c}{a}$.",
      "Aici $a=1$, $c=-15$, deci $x_1\\cdot x_2=-15$.",
    ],
  },
  {
    id: "g2-6",
    topic: "functia-gradul-2",
    type: "mcq",
    points: 6,
    prompt: "Semnul funcției $f(x)=-x^2+4x-4$ pe $\\mathbb{R}$ este:",
    options: [
      "negativ sau nul pe tot $\\mathbb{R}$",
      "pozitiv pe tot $\\mathbb{R}$",
      "negativ pentru $x<2$ și pozitiv pentru $x>2$",
      "pozitiv pentru $x<2$ și negativ pentru $x>2$",
    ],
    correctAnswer: "negativ sau nul pe tot $\\mathbb{R}$",
    explanation: [
      "Calculăm $\\Delta=4^2-4\\cdot(-1)\\cdot(-4)=16-16=0$.",
      "Cum $\\Delta=0$ și $a=-1<0$, funcția are semnul lui $a$ (negativ) pentru orice $x\\neq2$, deci este negativă sau nulă pe tot $\\mathbb{R}$.",
    ],
  },
  {
    id: "g2-7",
    topic: "functia-gradul-2",
    type: "input",
    points: 6,
    prompt: "Pentru ce valoare a lui $m$ ecuația $x^2-4x+m=0$ are soluție reală dublă?",
    correctAnswer: "4",
    explanation: [
      "Condiția pentru soluție dublă este $\\Delta=0$.",
      "Calculăm $\\Delta=(-4)^2-4\\cdot1\\cdot m=16-4m$.",
      "Punem $16-4m=0 \\Rightarrow m=4$.",
    ],
  },
];
