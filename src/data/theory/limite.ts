import type { TheorySection } from "../../types";

export const limiteTheory: TheorySection = {
  topic: "limite",
  title: "Limite de funcții",
  concepts: [
    {
      heading: "Limite prin înlocuire directă",
      body: [
        "Dacă funcția este continuă în punctul $x_0$ (de exemplu o funcție polinomială), limita se calculează prin înlocuirea directă a lui $x_0$.",
      ],
    },
    {
      heading: "Forma nedeterminată $\\frac{0}{0}$",
      body: [
        "Când înlocuirea directă dă $\\frac{0}{0}$, se factorizează numărătorul și numitorul (de obicei folosind faptul că $x_0$ este rădăcină) și se simplifică factorul comun.",
      ],
    },
    {
      heading: "Limite la infinit ale funcțiilor raționale",
      body: [
        "Se compară gradul numărătorului cu gradul numitorului.",
        "Dacă gradele sunt egale, limita este raportul coeficienților dominanți; dacă gradul numărătorului e mai mare, limita este $\\pm\\infty$; dacă e mai mic, limita este $0$.",
      ],
    },
    {
      heading: "Limite fundamentale",
      body: [
        "$\\lim_{x\\to 0}\\dfrac{\\sin x}{x}=1$",
        "$\\lim_{x\\to\\infty}\\left(1+\\dfrac{1}{x}\\right)^x = e$",
        "Aceste limite se folosesc adesea prin substituție, atunci când argumentul funcției tinde tot la $0$ (respectiv $\\infty$).",
      ],
    },
  ],
  examples: [
    {
      statement: "Calculați $\\lim_{x\\to3}\\dfrac{x^2-9}{x-3}$.",
      steps: [
        "Înlocuirea directă $x=3$ dă forma nedeterminată $\\frac{0}{0}$.",
        "Factorizăm numărătorul: $x^2-9=(x-3)(x+3)$.",
        "Simplificăm factorul comun: $\\dfrac{(x-3)(x+3)}{x-3}=x+3$.",
        "Calculăm limita expresiei simplificate: $3+3=6$.",
      ],
    },
    {
      statement: "Calculați $\\lim_{x\\to\\infty}\\dfrac{2x^2+x}{5x^2-1}$.",
      steps: [
        "Numărătorul și numitorul au același grad (2), deci limita este raportul coeficienților termenilor de grad maxim.",
        "Coeficientul lui $x^2$ la numărător este $2$, la numitor este $5$.",
        "Limita este $\\dfrac{2}{5}$.",
      ],
    },
    {
      statement: "Calculați $\\lim_{x\\to0}\\dfrac{\\sin 3x}{x}$.",
      steps: [
        "Scriem expresia astfel încât să apară limita fundamentală: $\\dfrac{\\sin 3x}{x} = 3\\cdot\\dfrac{\\sin 3x}{3x}$.",
        "Cum $3x\\to0$ când $x\\to0$, avem $\\lim_{x\\to0}\\dfrac{\\sin 3x}{3x}=1$ (limita fundamentală).",
        "Rezultă limita cerută: $3 \\cdot 1 = 3$.",
      ],
    },
  ],
};
