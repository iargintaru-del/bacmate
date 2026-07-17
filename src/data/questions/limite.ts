import type { Exercise } from "../../types";

export const limiteExercises: Exercise[] = [
  {
    id: "lm-1",
    topic: "limite",
    type: "input",
    points: 6,
    prompt: "Calculați $$\\lim_{x \\to 2} \\dfrac{x^2 - 4}{x - 2}.$$",
    correctAnswer: "4",
    explanation: "$\\dfrac{x^2-4}{x-2} = \\dfrac{(x-2)(x+2)}{x-2} = x+2 \\to 4$.",
  },
  {
    id: "lm-2",
    topic: "limite",
    type: "mcq",
    points: 6,
    prompt: "Calculați $$\\lim_{x \\to \\infty} \\dfrac{3x^2 + 1}{x^2 + 5}.$$",
    options: ["$3$", "$0$", "$\\infty$", "$1$"],
    correctAnswer: "$3$",
    explanation: "Se împarte la $x^2$ (gradul maxim): raportul coeficienților dominanți este $\\dfrac{3}{1} = 3$.",
  },
  {
    id: "lm-3",
    topic: "limite",
    type: "input",
    points: 6,
    prompt: "Calculați $$\\lim_{x \\to 0} \\dfrac{\\sin x}{x}.$$",
    correctAnswer: "1",
    explanation: "Este limita fundamentală $\\lim_{x\\to 0} \\dfrac{\\sin x}{x} = 1$.",
  },
  {
    id: "lm-4",
    topic: "limite",
    type: "mcq",
    points: 6,
    prompt: "Calculați $$\\lim_{x \\to 1} \\dfrac{x^3 - 1}{x - 1}.$$",
    options: ["$3$", "$1$", "$0$", "$2$"],
    correctAnswer: "$3$",
    explanation: "$\\dfrac{x^3-1}{x-1} = x^2+x+1 \\to 1+1+1 = 3$.",
  },
];
