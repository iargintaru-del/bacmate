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
    explanation: [
      "Găsim o primitivă a lui $x^2$: folosind $\\int x^n\\,dx=\\dfrac{x^{n+1}}{n+1}+C$, obținem $F(x)=\\dfrac{x^3}{3}$.",
      "Aplicăm formula Leibniz-Newton: $\\int_0^1 x^2\\,dx = F(1)-F(0)$.",
      "Calculăm: $F(1)=\\dfrac{1}{3}$, $F(0)=0$.",
      "Rezultatul este $\\dfrac{1}{3}$.",
    ],
  },
  {
    id: "in-2",
    topic: "integrale",
    type: "mcq",
    points: 6,
    prompt: "O primitivă a funcției $f(x) = 2x$ este:",
    options: ["$x^2$", "$2x^2$", "$x^2/2$", "$2$"],
    correctAnswer: "$x^2$",
    explanation: [
      "O primitivă $F$ a lui $f$ verifică $F'=f$.",
      "Derivăm funcția propusă: $(x^2)'=2x$.",
      "Cum derivata coincide cu $f(x)=2x$, rezultă că $x^2$ este o primitivă a lui $2x$.",
    ],
  },
  {
    id: "in-3",
    topic: "integrale",
    type: "input",
    points: 6,
    prompt: "Calculați $$\\int_0^2 3 \\, dx.$$",
    correctAnswer: "6",
    explanation: [
      "Pentru o funcție constantă $f(x)=c$, integrala definită este $\\int_a^b c\\,dx = c\\cdot(b-a)$.",
      "Înlocuim: $\\int_0^2 3\\,dx = 3\\cdot(2-0)$.",
      "Rezultă $3\\cdot2=6$.",
    ],
  },
  {
    id: "in-4",
    topic: "integrale",
    type: "mcq",
    points: 6,
    prompt: "Care este $\\int e^x \\, dx$?",
    options: ["$e^x + C$", "$xe^x + C$", "$\\dfrac{e^x}{x} + C$", "$\\ln x + C$"],
    correctAnswer: "$e^x + C$",
    explanation: [
      "O primitivă a lui $f$ este o funcție $F$ cu $F'=f$.",
      "Derivăm funcția exponențială: $(e^x)'=e^x$.",
      "Cum derivata coincide cu funcția însăși, $e^x$ este propria sa primitivă.",
    ],
  },
];
