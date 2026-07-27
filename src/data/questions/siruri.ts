import type { Exercise } from "../../types";

export const siruriExercises: Exercise[] = [
  {
    id: "sr-1",
    topic: "siruri",
    type: "input",
    points: 6,
    prompt: "Fie progresia aritmetică cu $a_1=4$ și rația $r=5$. Calculați $a_6$.",
    correctAnswer: "29",
    explanation: [
      "Aplicăm formula termenului general: $a_n=a_1+(n-1)r$.",
      "Înlocuim $n=6$: $a_6=4+5\\cdot5=4+25$.",
      "Rezultă $a_6=29$.",
    ],
  },
  {
    id: "sr-2",
    topic: "siruri",
    type: "mcq",
    points: 6,
    prompt: "Șirul $2,5,8,11,\\ldots$ este:",
    options: [
      "progresie aritmetică cu rația $3$",
      "progresie geometrică cu rația $3$",
      "progresie aritmetică cu rația $2$",
      "niciuna dintre variante",
    ],
    correctAnswer: "progresie aritmetică cu rația $3$",
    explanation: [
      "Diferența dintre termeni consecutivi este constantă: $5-2=3$, $8-5=3$, $11-8=3$.",
      "Deci șirul este progresie aritmetică cu rația $r=3$.",
    ],
  },
  {
    id: "sr-3",
    topic: "siruri",
    type: "input",
    points: 6,
    prompt: "Calculați suma primilor $10$ termeni ai progresiei aritmetice cu $a_1=1$ și $r=2$ (adică $1+3+5+\\cdots$).",
    correctAnswer: "100",
    explanation: [
      "Determinăm $a_{10}=a_1+9r=1+18=19$.",
      "Aplicăm formula sumei: $S_{10}=\\dfrac{(a_1+a_{10})\\cdot10}{2}=\\dfrac{(1+19)\\cdot10}{2}$.",
      "Calculăm: $S_{10}=\\dfrac{200}{2}=100$.",
    ],
  },
  {
    id: "sr-4",
    topic: "siruri",
    type: "input",
    points: 6,
    prompt: "Fie progresia geometrică cu $b_1=2$ și rația $q=3$. Calculați $b_4$.",
    correctAnswer: "54",
    explanation: [
      "Aplicăm formula termenului general: $b_n=b_1\\cdot q^{n-1}$.",
      "Înlocuim $n=4$: $b_4=2\\cdot3^3=2\\cdot27$.",
      "Rezultă $b_4=54$.",
    ],
  },
  {
    id: "sr-5",
    topic: "siruri",
    type: "mcq",
    points: 6,
    prompt: "Numerele $4, x, 9$ sunt în progresie geometrică dacă $x$ este egal cu:",
    options: ["$6$ sau $-6$", "$6$", "$36$", "$13$"],
    correctAnswer: "$6$ sau $-6$",
    explanation: [
      "Condiția de progresie geometrică este $x^2=4\\cdot9=36$.",
      "Rezultă $x=6$ sau $x=-6$.",
    ],
  },
  {
    id: "sr-6",
    topic: "siruri",
    type: "input",
    points: 6,
    prompt: "Determinați rația progresiei aritmetice în care $a_1=7$ și $a_5=19$.",
    correctAnswer: "3",
    explanation: [
      "Aplicăm formula termenului general: $a_5=a_1+4r$.",
      "Înlocuim: $19=7+4r \\Rightarrow 4r=12$.",
      "Rezultă $r=3$.",
    ],
  },
  {
    id: "sr-7",
    topic: "siruri",
    type: "mcq",
    points: 6,
    prompt: "Suma primilor $n$ termeni ai unei progresii geometrice cu rația $q\\neq1$ se calculează cu formula:",
    options: [
      "$S_n=b_1\\cdot\\dfrac{q^n-1}{q-1}$",
      "$S_n=\\dfrac{(b_1+b_n)\\cdot n}{2}$",
      "$S_n=b_1\\cdot n\\cdot q$",
      "$S_n=b_1^n$",
    ],
    correctAnswer: "$S_n=b_1\\cdot\\dfrac{q^n-1}{q-1}$",
    explanation: [
      "Aceasta este formula uzuală a sumei primilor $n$ termeni ai unei progresii geometrice cu rația $q\\neq1$.",
    ],
  },
];
