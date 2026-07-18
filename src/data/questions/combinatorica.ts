import type { Exercise } from "../../types";

export const combinatoricaExercises: Exercise[] = [
  {
    id: "cb-1",
    topic: "combinatorica",
    type: "input",
    points: 6,
    prompt: "Calculați $C_5^2$ (numărul de submulțimi cu 2 elemente ale unei mulțimi cu 5 elemente).",
    correctAnswer: "10",
    explanation: [
      "Aplicăm formula combinărilor: $C_n^k=\\dfrac{n!}{k!(n-k)!}$, cu $n=5$, $k=2$.",
      "Înlocuim: $C_5^2=\\dfrac{5!}{2! \\cdot 3!}$.",
      "Simplificăm factorialele: $\\dfrac{5!}{3!}=5\\cdot4$, deci $C_5^2=\\dfrac{5\\cdot4}{2!}=\\dfrac{20}{2}$.",
      "Rezultă $C_5^2=10$.",
    ],
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
    explanation: [
      "Cum cifrele trebuie să fie distincte și ordinea contează (formăm un număr), folosim aranjamente.",
      "Numărul căutat este $A_4^3$, adică numărul de moduri de a alege și ordona 3 cifre din cele 4 disponibile.",
      "Aplicăm formula: $A_4^3 = 4\\cdot3\\cdot2$.",
      "Rezultă $A_4^3=24$.",
    ],
  },
  {
    id: "cb-3",
    topic: "combinatorica",
    type: "input",
    points: 6,
    prompt: "Calculați $5!$.",
    correctAnswer: "120",
    explanation: [
      "Factorialul lui $n$ este produsul numerelor naturale de la $1$ la $n$: $n!=1\\cdot2\\cdots n$.",
      "Pentru $n=5$: $5!=5\\cdot4\\cdot3\\cdot2\\cdot1$.",
      "Calculăm produsul: $5\\cdot4=20$, $20\\cdot3=60$, $60\\cdot2=120$.",
      "Rezultă $5!=120$.",
    ],
  },
  {
    id: "cb-4",
    topic: "combinatorica",
    type: "mcq",
    points: 6,
    prompt: "Care este coeficientul termenului al treilea din dezvoltarea binomului $(x+1)^4$?",
    options: ["$6$", "$4$", "$12$", "$8$"],
    correctAnswer: "$6$",
    explanation: [
      "Termenul de rang $k+1$ din dezvoltarea $(x+y)^n$ este $T_{k+1}=C_n^k x^{n-k}y^k$.",
      "Termenul al treilea corespunde lui $k=2$ (al treilea termen are rangul $k+1=3$).",
      "Pentru $(x+1)^4$ avem $n=4$, $y=1$, deci $T_3 = C_4^2 x^{2} \\cdot 1^2 = C_4^2 x^2$.",
      "Calculăm $C_4^2 = \\dfrac{4!}{2! \\cdot 2!}=6$, deci coeficientul căutat este $6$.",
    ],
  },
];
