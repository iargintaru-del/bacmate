import type { Exercise } from "../../types";

export const legiCompozitieExercises: Exercise[] = [
  {
    id: "lc-1",
    topic: "legi-compozitie",
    type: "input",
    points: 6,
    prompt: "Pe mulțimea numerelor reale se definește legea de compoziție $x\\circ y=xy+4(x+y)$. Calculați $1\\circ 2$.",
    correctAnswer: "14",
    explanation: [
      "Înlocuim direct în formula legii: $1\\circ 2=1\\cdot2+4(1+2)$.",
      "Calculăm: $1\\cdot2=2$ și $4(1+2)=4\\cdot3=12$.",
      "Rezultă $1\\circ 2=2+12=14$.",
    ],
  },
  {
    id: "lc-2",
    topic: "legi-compozitie",
    type: "mcq",
    points: 6,
    prompt:
      "Care dintre următoarele afirmații justifică faptul că legea $x\\circ y=xy+4(x+y)$ este comutativă?",
    options: [
      "Înmulțirea și adunarea numerelor reale sunt comutative",
      "Legea are element neutru",
      "Legea este asociativă",
      "Ecuația $x\\circ x=x$ are soluție unică",
    ],
    correctAnswer: "Înmulțirea și adunarea numerelor reale sunt comutative",
    explanation: [
      "Legea este $x\\circ y=xy+4(x+y)$, construită doar din înmulțire și adunare de numere reale.",
      "Cum $xy=yx$ și $x+y=y+x$ pentru orice numere reale, rezultă $x\\circ y=y\\circ x$.",
    ],
  },
  {
    id: "lc-3",
    topic: "legi-compozitie",
    type: "input",
    points: 6,
    prompt: "Pentru legea $x\\circ y=xy+4(x+y)$, determinați numărul real $x$ pentru care $x\\circ 3=x$.",
    correctAnswer: "-2",
    explanation: [
      "Înlocuim în formula legii: $x\\circ3=3x+4(x+3)$.",
      "Desfacem paranteza: $3x+4x+12=7x+12$.",
      "Punem condiția $x\\circ3=x$: $7x+12=x \\Rightarrow 6x=-12$.",
      "Rezultă $x=-2$.",
    ],
  },
  {
    id: "lc-4",
    topic: "legi-compozitie",
    type: "mcq",
    points: 6,
    prompt: "Pe $\\mathbb{R}$ se definește legea $x\\circ y=x+y-3$. Elementul neutru al legii este:",
    options: ["$3$", "$0$", "$-3$", "$1$"],
    correctAnswer: "$3$",
    explanation: [
      "Elementul neutru $e$ verifică $x\\circ e=x$, pentru orice $x$.",
      "Înlocuim în formulă: $x+e-3=x$.",
      "Simplificăm: $e-3=0 \\Rightarrow e=3$.",
    ],
  },
];
