import type { TheorySection } from "../../types";

export const functiaGradul1Theory: TheorySection = {
  topic: "functia-gradul-1",
  title: "Funcția de gradul I",
  concepts: [
    {
      heading: "Definiție și reprezentare grafică",
      body: [
        "Funcția de gradul I este $f:\\mathbb{R}\\to\\mathbb{R}$, $f(x)=ax+b$, cu $a,b\\in\\mathbb{R}$, $a\\neq0$.",
        "Graficul funcției de gradul I este o dreaptă; $a$ se numește panta (coeficientul unghiular), iar $b$ este ordonata la origine (valoarea $f(0)$).",
        "Pentru trasarea graficului este suficient să determinăm două puncte, de exemplu intersecțiile cu axele de coordonate.",
      ],
    },
    {
      heading: "Intersecția cu axele de coordonate",
      body: [
        "Graficul intersectează axa $Oy$ în punctul $(0,b)$.",
        "Graficul intersectează axa $Ox$ în soluția ecuației $f(x)=0$, adică în punctul $\\left(-\\dfrac{b}{a},0\\right)$.",
      ],
    },
    {
      heading: "Monotonia funcției de gradul I",
      body: [
        "Dacă $a>0$, funcția este strict crescătoare pe $\\mathbb{R}$.",
        "Dacă $a<0$, funcția este strict descrescătoare pe $\\mathbb{R}$.",
      ],
    },
    {
      heading: "Semnul funcției de gradul I",
      body: [
        "Funcția $f(x)=ax+b$ are semnul lui $a$ pentru $x>-\\dfrac{b}{a}$ și semnul opus lui $a$ pentru $x<-\\dfrac{b}{a}$ (când $a>0$).",
        "Această proprietate se folosește pentru rezolvarea inecuațiilor de forma $ax+b>0$, $ax+b<0$, $ax+b\\ge0$ sau $ax+b\\le0$.",
      ],
    },
    {
      heading: "Poziția relativă a două drepte",
      body: [
        "Două drepte $y=a_1x+b_1$ și $y=a_2x+b_2$ sunt paralele dacă $a_1=a_2$ și $b_1\\neq b_2$.",
        "Două drepte sunt confundate dacă $a_1=a_2$ și $b_1=b_2$.",
        "Două drepte se intersectează într-un singur punct dacă $a_1\\neq a_2$; abscisa punctului de intersecție este soluția ecuației $a_1x+b_1=a_2x+b_2$.",
      ],
    },
  ],
  examples: [
    {
      statement: "Fie $f(x)=2x-4$. Reprezentați grafic funcția, determinând intersecțiile cu axele de coordonate.",
      steps: [
        "Intersecția cu axa $Oy$: $f(0)=2\\cdot0-4=-4$, deci punctul $(0,-4)$.",
        "Intersecția cu axa $Ox$: rezolvăm $2x-4=0 \\Rightarrow x=2$, deci punctul $(2,0)$.",
        "Graficul este dreapta care trece prin punctele $(0,-4)$ și $(2,0)$.",
      ],
    },
    {
      statement: "Rezolvați inecuația $-3x+6\\le0$.",
      steps: [
        "Rezolvăm ecuația asociată: $-3x+6=0 \\Rightarrow x=2$.",
        "Cum coeficientul lui $x$ este $a=-3<0$, funcția $f(x)=-3x+6$ este strict descrescătoare, deci este negativă pentru $x>2$ și pozitivă pentru $x<2$.",
        "Inecuația $f(x)\\le0$ este verificată pentru $x\\ge2$, deci soluția este $[2,+\\infty)$.",
      ],
    },
    {
      statement: "Determinați punctul de intersecție al dreptelor $y=2x+1$ și $y=-x+7$.",
      steps: [
        "Punem condiția ca cele două expresii să fie egale: $2x+1=-x+7$.",
        "Rezolvăm: $3x=6 \\Rightarrow x=2$.",
        "Calculăm ordonata: $y=2\\cdot2+1=5$.",
        "Punctul de intersecție este $(2,5)$.",
      ],
    },
  ],
};
