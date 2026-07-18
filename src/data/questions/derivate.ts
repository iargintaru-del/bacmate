import type { Exercise } from "../../types";

export const derivateExercises: Exercise[] = [
  {
    id: "dv-1",
    topic: "derivate",
    type: "input",
    points: 6,
    prompt: "Fie $f(x) = x^3$. Calculați $f'(2)$.",
    correctAnswer: "12",
    explanation: [
      "Aplicăm regula de derivare $(x^n)'=nx^{n-1}$: $f'(x)=3x^2$.",
      "Înlocuim $x=2$: $f'(2)=3\\cdot2^2=3\\cdot4$.",
      "Rezultă $f'(2)=12$.",
    ],
  },
  {
    id: "dv-2",
    topic: "derivate",
    type: "mcq",
    points: 6,
    prompt: "Derivata funcției $f(x) = \\sin x$ este:",
    options: ["$\\cos x$", "$-\\cos x$", "$-\\sin x$", "$\\tan x$"],
    correctAnswer: "$\\cos x$",
    explanation: [
      "Aceasta este una dintre regulile uzuale de derivare.",
      "$(\\sin x)'=\\cos x$.",
    ],
  },
  {
    id: "dv-3",
    topic: "derivate",
    type: "input",
    points: 6,
    prompt: "Fie $f(x) = x^2 - 4x + 3$. Determinați abscisa punctului de minim (soluția ecuației $f'(x) = 0$).",
    correctAnswer: "2",
    explanation: [
      "Calculăm derivata: $f'(x)=2x-4$.",
      "Punem condiția de punct critic: $f'(x)=0 \\Rightarrow 2x-4=0$.",
      "Rezolvăm: $x=2$.",
    ],
  },
  {
    id: "dv-4",
    topic: "derivate",
    type: "mcq",
    points: 6,
    prompt: "O funcție derivabilă $f$ este crescătoare pe un interval dacă:",
    options: [
      "$f'(x) \\geq 0$ pe acel interval",
      "$f'(x) \\leq 0$ pe acel interval",
      "$f''(x) = 0$ pe acel interval",
      "$f(x) = 0$ pe acel interval",
    ],
    correctAnswer: "$f'(x) \\geq 0$ pe acel interval",
    explanation: [
      "Legătura dintre semnul derivatei și monotonie este un rezultat fundamental de analiză.",
      "Dacă $f'(x)\\geq0$ pe un interval, atunci $f$ este crescătoare pe acel interval.",
    ],
  },
];
