import type { Exercise } from "../../types";

export const integraleExercises: Exercise[] = [
  {
    id: "in-1",
    topic: "integrale",
    type: "input",
    points: 6,
    prompt: "Calculați $$\\int_0^1 x^2 \\, dx.$$",
    correctAnswer: "1/3",
    acceptedAnswers: ["0.33", "0,33"],
    explanation: "$\\int_0^1 x^2\\,dx = \\left[\\dfrac{x^3}{3}\\right]_0^1 = \\dfrac{1}{3}$.",
  },
  {
    id: "in-2",
    topic: "integrale",
    type: "mcq",
    points: 6,
    prompt: "O primitivă a funcției $f(x) = 2x$ este:",
    options: ["$x^2$", "$2x^2$", "$x^2/2$", "$2$"],
    correctAnswer: "$x^2$",
    explanation: "$(x^2)' = 2x$, deci $x^2$ este o primitivă a lui $2x$.",
  },
  {
    id: "in-3",
    topic: "integrale",
    type: "input",
    points: 6,
    prompt: "Calculați $$\\int_0^2 3 \\, dx.$$",
    correctAnswer: "6",
    explanation: "Pentru o funcție constantă, $\\int_0^2 3\\,dx = 3 \\cdot (2-0) = 6$.",
  },
  {
    id: "in-4",
    topic: "integrale",
    type: "mcq",
    points: 6,
    prompt: "Care este $\\int e^x \\, dx$?",
    options: ["$e^x + C$", "$xe^x + C$", "$\\dfrac{e^x}{x} + C$", "$\\ln x + C$"],
    correctAnswer: "$e^x + C$",
    explanation: "$(e^x)' = e^x$, deci $e^x$ este propria sa primitivă.",
  },
];
