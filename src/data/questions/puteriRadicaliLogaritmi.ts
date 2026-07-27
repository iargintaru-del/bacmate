import type { Exercise } from "../../types";

export const puteriRadicaliLogaritmiExercises: Exercise[] = [
  {
    id: "pl-1",
    topic: "puteri-radicali-logaritmi",
    type: "input",
    points: 6,
    prompt: "Calculați $9^{\\frac{3}{2}}$.",
    correctAnswer: "27",
    explanation: [
      "Scriem puterea ca radical: $9^{\\frac{3}{2}}=\\sqrt{9^3}$.",
      "Calculăm $9^3=729$, iar $\\sqrt{729}=27$ (deoarece $27^2=729$).",
      "Rezultă $9^{\\frac{3}{2}}=27$.",
    ],
  },
  {
    id: "pl-2",
    topic: "puteri-radicali-logaritmi",
    type: "mcq",
    points: 6,
    prompt: "Expresia $\\sqrt{8}\\cdot\\sqrt{2}$ este egală cu:",
    options: ["$4$", "$16$", "$\\sqrt{10}$", "$2\\sqrt{4}$"],
    correctAnswer: "$4$",
    explanation: [
      "Folosim $\\sqrt{a}\\cdot\\sqrt{b}=\\sqrt{ab}$: $\\sqrt{8}\\cdot\\sqrt{2}=\\sqrt{16}$.",
      "Calculăm $\\sqrt{16}=4$.",
    ],
  },
  {
    id: "pl-3",
    topic: "puteri-radicali-logaritmi",
    type: "input",
    points: 6,
    prompt: "Calculați $\\log_3 81$.",
    correctAnswer: "4",
    explanation: [
      "Căutăm $x$ astfel încât $3^x=81$.",
      "Observăm că $3^4=81$.",
      "Rezultă $\\log_3 81=4$.",
    ],
  },
  {
    id: "pl-4",
    topic: "puteri-radicali-logaritmi",
    type: "mcq",
    points: 6,
    prompt: "Folosind proprietățile logaritmilor, $\\log_2 8+\\log_2 4$ este egal cu:",
    options: ["$5$", "$32$", "$12$", "$7$"],
    correctAnswer: "$5$",
    explanation: [
      "Aplicăm $\\log_a x+\\log_a y=\\log_a(xy)$: $\\log_2 8+\\log_2 4=\\log_2 32$.",
      "Calculăm $\\log_2 32=5$ (deoarece $2^5=32$).",
    ],
  },
  {
    id: "pl-5",
    topic: "puteri-radicali-logaritmi",
    type: "input",
    points: 6,
    prompt: "Calculați media aritmetică a numerelor $12$ și $18$.",
    correctAnswer: "15",
    explanation: [
      "Media aritmetică este $\\dfrac{12+18}{2}$.",
      "Calculăm $\\dfrac{30}{2}=15$.",
    ],
  },
  {
    id: "pl-6",
    topic: "puteri-radicali-logaritmi",
    type: "mcq",
    points: 6,
    prompt: "Media geometrică a numerelor $2$ și $8$ este:",
    options: ["$4$", "$5$", "$16$", "$10$"],
    correctAnswer: "$4$",
    explanation: [
      "Media geometrică este $\\sqrt{2\\cdot8}=\\sqrt{16}$.",
      "Rezultă media geometrică $=4$.",
    ],
  },
  {
    id: "pl-7",
    topic: "puteri-radicali-logaritmi",
    type: "input",
    points: 6,
    prompt: "Simplificați $\\dfrac{a^7}{a^3}$ (pentru $a\\neq0$) și scrieți exponentul rezultat.",
    correctAnswer: "4",
    explanation: [
      "Aplicăm proprietatea $\\dfrac{a^m}{a^n}=a^{m-n}$.",
      "Calculăm exponentul: $7-3=4$.",
      "Rezultă $\\dfrac{a^7}{a^3}=a^4$.",
    ],
  },
];
