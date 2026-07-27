import type { TheorySection } from "../../types";

export const derivateTheory: TheorySection = {
  topic: "derivate",
  title: "Derivate și aplicații",
  concepts: [
    {
      heading: "Reguli de derivare uzuale",
      body: [
        "$(x^n)' = nx^{n-1}$",
        "$(\\sin x)' = \\cos x$, $(\\cos x)' = -\\sin x$",
        "$(e^x)' = e^x$, $(\\ln x)' = \\dfrac{1}{x}$",
      ],
    },
    {
      heading: "Derivarea produsului și a câtului",
      body: [
        "$(u \\cdot v)' = u'v + uv'$",
        "$\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v-uv'}{v^2}$ (pentru $v \\neq 0$)",
      ],
    },
    {
      heading: "Monotonia unei funcții",
      body: [
        "Dacă $f'(x) > 0$ pe un interval, atunci $f$ este crescătoare pe acel interval.",
        "Dacă $f'(x) < 0$ pe un interval, atunci $f$ este descrescătoare pe acel interval.",
      ],
    },
    {
      heading: "Puncte de extrem",
      body: [
        "Punctele critice sunt soluțiile ecuației $f'(x)=0$.",
        "Un punct critic $x_0$ este punct de extrem dacă $f'$ își schimbă semnul în jurul lui $x_0$ (maxim dacă trece din $+$ în $-$, minim dacă trece din $-$ în $+$).",
      ],
    },
    {
      heading: "Regula lui l'Hospital",
      body: [
        "Pentru limite de forma $\\frac{0}{0}$ sau $\\frac{\\infty}{\\infty}$: dacă $f$ și $g$ sunt derivabile în jurul lui $x_0$, $g'(x) \\neq 0$, și $\\lim \\frac{f'(x)}{g'(x)}$ există, atunci $\\lim \\frac{f(x)}{g(x)} = \\lim \\frac{f'(x)}{g'(x)}$.",
        "Regula se poate aplica din nou dacă noul raport este tot o formă nedeterminată $\\frac{0}{0}$ sau $\\frac{\\infty}{\\infty}$.",
      ],
    },
  ],
  examples: [
    {
      statement: "Fie $f(x)=x^3-6x^2+9x$. Calculați $f'(x)$ și evaluați $f'(1)$.",
      steps: [
        "Derivăm termen cu termen folosind $(x^n)'=nx^{n-1}$: $f'(x) = 3x^2 - 12x + 9$.",
        "Înlocuim $x=1$: $f'(1) = 3 - 12 + 9 = 0$.",
      ],
    },
    {
      statement: "Calculați derivata funcției $f(x) = x^2 \\sin x$.",
      steps: [
        "Folosim regula produsului $(uv)'=u'v+uv'$, cu $u=x^2$ și $v=\\sin x$.",
        "Avem $u'=2x$ și $v'=\\cos x$.",
        "Rezultă $f'(x) = 2x\\sin x + x^2\\cos x$.",
      ],
    },
    {
      statement: "Determinați punctele de extrem ale funcției $f(x)=x^3-3x$.",
      steps: [
        "Calculăm derivata: $f'(x)=3x^2-3$.",
        "Rezolvăm $f'(x)=0$: $3x^2-3=0 \\Rightarrow x^2=1 \\Rightarrow x=\\pm1$.",
        "Studiem semnul lui $f'$: pentru $x<-1$, $f'>0$; pentru $-1<x<1$, $f'<0$; pentru $x>1$, $f'>0$.",
        "Deci $x=-1$ este punct de maxim, iar $x=1$ este punct de minim.",
      ],
    },
    {
      statement: "Calculați $\\lim_{x\\to0}\\dfrac{e^x-1}{x}$ folosind regula lui l'Hospital.",
      steps: [
        "Înlocuirea directă $x=0$ dă forma nedeterminată $\\frac{0}{0}$.",
        "Derivăm numărătorul și numitorul separat: $(e^x-1)'=e^x$, $(x)'=1$.",
        "Aplicăm regula lui l'Hospital: $\\lim_{x\\to0}\\dfrac{e^x-1}{x}=\\lim_{x\\to0}\\dfrac{e^x}{1}$.",
        "Înlocuim $x=0$: $\\dfrac{e^0}{1}=\\dfrac{1}{1}=1$.",
      ],
    },
    {
      statement: "Calculați $\\lim_{x\\to\\infty}\\dfrac{\\ln x}{x}$ folosind regula lui l'Hospital.",
      steps: [
        "Pentru $x\\to\\infty$, atât $\\ln x$ cât și $x$ tind la $\\infty$, deci avem forma nedeterminată $\\frac{\\infty}{\\infty}$.",
        "Derivăm numărătorul și numitorul separat: $(\\ln x)'=\\dfrac{1}{x}$, $(x)'=1$.",
        "Aplicăm regula lui l'Hospital: $\\lim_{x\\to\\infty}\\dfrac{\\ln x}{x}=\\lim_{x\\to\\infty}\\dfrac{1/x}{1}=\\lim_{x\\to\\infty}\\dfrac{1}{x}$.",
        "Pe măsură ce $x\\to\\infty$, $\\dfrac{1}{x}\\to0$.",
      ],
    },
  ],
};
