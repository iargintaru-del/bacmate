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
  {
    id: "lc-5",
    topic: "legi-compozitie",
    type: "input",
    points: 6,
    prompt: "În grupul aditiv al claselor de resturi modulo $5$, $(\\mathbb{Z}_5,+)$, determinați simetricul (opusul) elementului $\\hat{3}$.",
    correctAnswer: "2",
    explanation: [
      "Simetricul elementului $\\hat{3}$ este elementul $\\hat{x}$ pentru care $\\hat{3}+\\hat{x}=\\hat{0}$.",
      "Cum $3+2=5\\equiv0\\ (\\text{mod}\\ 5)$, rezultă $\\hat{x}=\\hat{2}$.",
    ],
  },
  {
    id: "lc-6",
    topic: "legi-compozitie",
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele structuri $(\\mathbb{Z}_n,+,\\cdot)$ este corp?",
    options: [
      "$(\\mathbb{Z}_4,+,\\cdot)$",
      "$(\\mathbb{Z}_5,+,\\cdot)$",
      "$(\\mathbb{Z}_6,+,\\cdot)$",
      "$(\\mathbb{Z}_8,+,\\cdot)$",
    ],
    correctAnswer: "$(\\mathbb{Z}_5,+,\\cdot)$",
    explanation: [
      "$(\\mathbb{Z}_n,+,\\cdot)$ este corp dacă și numai dacă $n$ este număr prim.",
      "Dintre $4$, $5$, $6$, $8$, doar $5$ este prim, deci doar $(\\mathbb{Z}_5,+,\\cdot)$ este corp.",
    ],
  },
  {
    id: "lc-7",
    topic: "legi-compozitie",
    type: "mcq",
    points: 6,
    prompt: "Care dintre următoarele proprietăți NU este obligatorie pentru ca $(G,\\circ)$ să fie grup?",
    options: [
      "Comutativitatea legii $\\circ$",
      "Asociativitatea legii $\\circ$",
      "Existența elementului neutru",
      "Orice element din $G$ este simetrizabil",
    ],
    correctAnswer: "Comutativitatea legii $\\circ$",
    explanation: [
      "Un grup cere doar asociativitate, element neutru și simetrizabilitatea fiecărui element.",
      "Comutativitatea nu este obligatorie — un grup în care legea este și comutativă se numește grup abelian, dar există grupuri necomutative.",
    ],
  },
];
