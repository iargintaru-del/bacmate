import type { Exercise } from "../../types";

export const limiteExercises: Exercise[] = [
  {
    id: "lm-1",
    topic: "limite",
    type: "input",
    points: 6,
    prompt: "Calculați $$\\lim_{x \\to 2} \\dfrac{x^2 - 4}{x - 2}.$$",
    correctAnswer: "4",
    explanation: [
      "Înlocuirea directă $x=2$ dă forma nedeterminată $\\frac{0}{0}$, deci factorizăm.",
      "Numărătorul se factorizează: $x^2-4=(x-2)(x+2)$.",
      "Simplificăm factorul comun $x-2$: expresia devine $x+2$.",
      "Calculăm limita expresiei simplificate: $2+2=4$.",
    ],
  },
  {
    id: "lm-2",
    topic: "limite",
    type: "mcq",
    points: 6,
    prompt: "Calculați $$\\lim_{x \\to \\infty} \\dfrac{3x^2 + 1}{x^2 + 5}.$$",
    options: ["$3$", "$0$", "$\\infty$", "$1$"],
    correctAnswer: "$3$",
    explanation: [
      "Numărătorul și numitorul au același grad (2), deci limita la infinit este raportul coeficienților termenilor de grad maxim.",
      "Coeficientul lui $x^2$ la numărător este $3$, la numitor este $1$.",
      "Limita este $\\dfrac{3}{1}=3$.",
    ],
  },
  {
    id: "lm-3",
    topic: "limite",
    type: "input",
    points: 6,
    prompt: "Calculați $$\\lim_{x \\to 0} \\dfrac{\\sin x}{x}.$$",
    correctAnswer: "1",
    explanation: [
      "Aceasta este una dintre limitele fundamentale ale analizei matematice.",
      "Prin rezultat cunoscut, $\\lim_{x\\to0}\\dfrac{\\sin x}{x}=1$.",
    ],
  },
  {
    id: "lm-4",
    topic: "limite",
    type: "mcq",
    points: 6,
    prompt: "Calculați $$\\lim_{x \\to 1} \\dfrac{x^3 - 1}{x - 1}.$$",
    options: ["$3$", "$1$", "$0$", "$2$"],
    correctAnswer: "$3$",
    explanation: [
      "Înlocuirea directă $x=1$ dă forma nedeterminată $\\frac{0}{0}$.",
      "Factorizăm numărătorul folosind $a^3-b^3=(a-b)(a^2+ab+b^2)$: $x^3-1=(x-1)(x^2+x+1)$.",
      "Simplificăm factorul comun $x-1$: expresia devine $x^2+x+1$.",
      "Calculăm limita: $1^2+1+1=3$.",
    ],
  },
  {
    id: "lm-5",
    topic: "limite",
    type: "mcq",
    points: 6,
    prompt: "Fie $f$ o funcție continuă pe $[a,b]$ cu $f(a)\\cdot f(b)<0$. Conform proprietății lui Darboux, ecuația $f(x)=0$:",
    options: [
      "are cel puțin o soluție în $(a,b)$",
      "nu are nicio soluție în $(a,b)$",
      "are exact o soluție în $(a,b)$",
      "nu se poate preciza dacă are soluții în $(a,b)$",
    ],
    correctAnswer: "are cel puțin o soluție în $(a,b)$",
    explanation: [
      "Proprietatea lui Darboux garantează existența a cel puțin unei soluții $c\\in(a,b)$ cu $f(c)=0$, atunci când $f$ este continuă pe $[a,b]$ și $f(a)\\cdot f(b)<0$.",
      "Proprietatea nu garantează unicitatea — pot exista mai multe astfel de soluții, deci varianta 'exact o soluție' nu este corectă în general.",
    ],
  },
];
