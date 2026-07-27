import type { Exercise } from "../../types";

export const multimiLogicaExercises: Exercise[] = [
  {
    id: "ml-1",
    topic: "multimi-logica",
    type: "input",
    points: 6,
    prompt: "Fie $A=\\{1,2,3,4\\}$ și $B=\\{2,4,6\\}$. Câte elemente are mulțimea $A\\cap B$?",
    correctAnswer: "2",
    explanation: [
      "Elementele comune celor două mulțimi sunt $2$ și $4$.",
      "Deci $A\\cap B=\\{2,4\\}$, care are $2$ elemente.",
    ],
  },
  {
    id: "ml-2",
    topic: "multimi-logica",
    type: "mcq",
    points: 6,
    prompt: "Mulțimea $A\\setminus B$, pentru $A=\\{1,2,3,4,5\\}$ și $B=\\{1,2,3\\}$, este:",
    options: ["$\\{4,5\\}$", "$\\{1,2,3\\}$", "$\\{1,2,3,4,5\\}$", "$\\emptyset$"],
    correctAnswer: "$\\{4,5\\}$",
    explanation: [
      "Diferența $A\\setminus B$ conține elementele din $A$ care nu se regăsesc în $B$.",
      "Acestea sunt $4$ și $5$.",
    ],
  },
  {
    id: "ml-3",
    topic: "multimi-logica",
    type: "input",
    points: 6,
    prompt: "Câte numere întregi conține intervalul $[-2,3]$?",
    correctAnswer: "6",
    explanation: [
      "Intervalul închis $[-2,3]$ conține toate numerele întregi de la $-2$ la $3$.",
      "Acestea sunt $-2,-1,0,1,2,3$, deci $6$ numere.",
    ],
  },
  {
    id: "ml-4",
    topic: "multimi-logica",
    type: "mcq",
    points: 6,
    prompt: "Negația propoziției „toate numerele naturale sunt pare” este:",
    options: [
      "Există cel puțin un număr natural care nu este par",
      "Toate numerele naturale sunt impare",
      "Niciun număr natural nu este par",
      "Există un număr natural par",
    ],
    correctAnswer: "Există cel puțin un număr natural care nu este par",
    explanation: [
      "Negația unei propoziții cu cuantificatorul universal $\\forall$ se obține folosind cuantificatorul existențial $\\exists$ pentru negația predicatului.",
      "Negația lui „$\\forall n, P(n)$” este „$\\exists n$ astfel încât $\\overline{P(n)}$”.",
    ],
  },
  {
    id: "ml-5",
    topic: "multimi-logica",
    type: "mcq",
    points: 6,
    prompt: "Dacă propoziția $p$ este adevărată și propoziția $q$ este falsă, atunci valoarea de adevăr a propoziției $p\\Rightarrow q$ este:",
    options: ["falsă", "adevărată", "nu se poate determina", "depinde de $p$ și $q$"],
    correctAnswer: "falsă",
    explanation: [
      "Implicația $p\\Rightarrow q$ este falsă exact atunci când $p$ este adevărată și $q$ este falsă.",
      "Cum aceasta este situația dată, $p\\Rightarrow q$ este falsă.",
    ],
  },
  {
    id: "ml-6",
    topic: "multimi-logica",
    type: "input",
    points: 6,
    prompt: "Folosind formula $1+2+\\cdots+n=\\dfrac{n(n+1)}{2}$, calculați suma $1+2+\\cdots+10$.",
    correctAnswer: "55",
    explanation: [
      "Aplicăm formula cu $n=10$: suma este $\\dfrac{10\\cdot11}{2}$.",
      "Calculăm: $\\dfrac{110}{2}=55$.",
    ],
  },
  {
    id: "ml-7",
    topic: "multimi-logica",
    type: "mcq",
    points: 6,
    prompt: "Complementara mulțimii $A=\\{1,2\\}$ față de mulțimea totală $E=\\{1,2,3,4,5\\}$ este:",
    options: ["$\\{3,4,5\\}$", "$\\{1,2\\}$", "$\\emptyset$", "$\\{1,2,3,4,5\\}$"],
    correctAnswer: "$\\{3,4,5\\}$",
    explanation: [
      "Complementara $C_EA=E\\setminus A$ conține elementele din $E$ care nu sunt în $A$.",
      "Acestea sunt $3,4,5$.",
    ],
  },
];
