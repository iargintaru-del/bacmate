import type { TheorySection } from "../../types";

export const integraleTheory: TheorySection = {
  topic: "integrale",
  title: "Primitive și integrale definite",
  concepts: [
    {
      heading: "Primitive uzuale",
      body: [
        "$\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1}+C$ (pentru $n \\neq -1$)",
        "$\\int \\dfrac{1}{x}\\,dx = \\ln|x|+C$",
        "$\\int e^x\\,dx = e^x+C$",
        "$\\int \\sin x\\,dx = -\\cos x + C$, $\\int \\cos x\\,dx = \\sin x + C$",
      ],
    },
    {
      heading: "Liniaritatea integralei",
      body: [
        "$\\int [f(x)+g(x)]\\,dx = \\int f(x)\\,dx + \\int g(x)\\,dx$",
        "$\\int k\\cdot f(x)\\,dx = k\\int f(x)\\,dx$ pentru orice constantă $k$.",
      ],
    },
    {
      heading: "Integrala definită — formula Leibniz-Newton",
      body: [
        "Dacă $F$ este o primitivă a lui $f$, atunci $\\int_a^b f(x)\\,dx = F(b)-F(a)$.",
      ],
    },
  ],
  examples: [
    {
      statement: "Determinați o primitivă a funcției $f(x)=4x^3-2x$.",
      steps: [
        "Aplicăm formula $\\int x^n\\,dx=\\dfrac{x^{n+1}}{n+1}+C$ pentru fiecare termen.",
        "Pentru $4x^3$: primitiva este $4\\cdot\\dfrac{x^4}{4}=x^4$.",
        "Pentru $-2x$: primitiva este $-2\\cdot\\dfrac{x^2}{2}=-x^2$.",
        "O primitivă a lui $f$ este $F(x)=x^4-x^2+C$.",
      ],
    },
    {
      statement: "Calculați $\\int_0^2(x^2+1)\\,dx$.",
      steps: [
        "Găsim o primitivă: $F(x)=\\dfrac{x^3}{3}+x$.",
        "Aplicăm formula Leibniz-Newton: $\\int_0^2(x^2+1)\\,dx = F(2)-F(0)$.",
        "Calculăm $F(2) = \\dfrac{8}{3}+2 = \\dfrac{14}{3}$ și $F(0)=0$.",
        "Rezultatul este $\\dfrac{14}{3}$.",
      ],
    },
    {
      statement: "Calculați $\\int_0^{\\pi} \\sin x\\,dx$.",
      steps: [
        "O primitivă a lui $\\sin x$ este $-\\cos x$.",
        "Aplicăm Leibniz-Newton: $\\int_0^\\pi \\sin x\\,dx = [-\\cos x]_0^\\pi = -\\cos\\pi - (-\\cos 0)$.",
        "Calculăm: $-(-1) - (-1) = 1+1=2$.",
      ],
    },
  ],
};
