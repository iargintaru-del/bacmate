import type { TheorySection } from "../../types";

export const functiaGradul2Theory: TheorySection = {
  topic: "functia-gradul-2",
  title: "Funcția de gradul al II-lea",
  concepts: [
    {
      heading: "Definiție și reprezentare grafică",
      body: [
        "Funcția de gradul al II-lea este $f:\\mathbb{R}\\to\\mathbb{R}$, $f(x)=ax^2+bx+c$, cu $a,b,c\\in\\mathbb{R}$, $a\\neq0$.",
        "Graficul funcției de gradul al II-lea este o parabolă; parabola este orientată în sus dacă $a>0$ și în jos dacă $a<0$.",
      ],
    },
    {
      heading: "Vârful parabolei",
      body: [
        "Coordonatele vârfului parabolei sunt $V\\left(-\\dfrac{b}{2a},-\\dfrac{\\Delta}{4a}\\right)$, unde $\\Delta=b^2-4ac$.",
        "Vârful este punct de minim dacă $a>0$ și punct de maxim dacă $a<0$.",
      ],
    },
    {
      heading: "Rezolvarea ecuației de gradul al II-lea",
      body: [
        "Pentru ecuația $ax^2+bx+c=0$ cu $a\\neq0$, se calculează $\\Delta=b^2-4ac$.",
        "Dacă $\\Delta>0$, ecuația are două soluții reale distincte $x_{1,2}=\\dfrac{-b\\pm\\sqrt{\\Delta}}{2a}$.",
        "Dacă $\\Delta=0$, ecuația are o soluție reală dublă $x_1=x_2=-\\dfrac{b}{2a}$.",
        "Dacă $\\Delta<0$, ecuația nu are soluții reale.",
      ],
    },
    {
      heading: "Relațiile lui Viète",
      body: [
        "Dacă $x_1,x_2$ sunt soluțiile ecuației $ax^2+bx+c=0$, atunci $x_1+x_2=-\\dfrac{b}{a}$ și $x_1\\cdot x_2=\\dfrac{c}{a}$.",
      ],
    },
    {
      heading: "Semnul funcției de gradul al II-lea",
      body: [
        "Dacă $\\Delta<0$, funcția are semn constant, egal cu semnul lui $a$, pe tot $\\mathbb{R}$.",
        "Dacă $\\Delta=0$, funcția are semnul lui $a$ pentru orice $x\\neq-\\dfrac{b}{2a}$.",
        "Dacă $\\Delta>0$, funcția are semn opus lui $a$ între rădăcini și semnul lui $a$ în afara lor.",
      ],
    },
    {
      heading: "Inecuații de gradul al II-lea",
      body: [
        "Rezolvarea unei inecuații de forma $ax^2+bx+c \\gtrless 0$ se face determinând rădăcinile ecuației asociate și apoi aplicând regula semnului funcției de gradul al II-lea.",
      ],
    },
  ],
  examples: [
    {
      statement: "Fie $f(x)=x^2-4x+3$. Determinați coordonatele vârfului parabolei.",
      steps: [
        "Calculăm $\\Delta=b^2-4ac=(-4)^2-4\\cdot1\\cdot3=16-12=4$.",
        "Abscisa vârfului este $x_V=-\\dfrac{b}{2a}=-\\dfrac{-4}{2\\cdot1}=2$.",
        "Ordonata vârfului este $y_V=-\\dfrac{\\Delta}{4a}=-\\dfrac{4}{4}=-1$.",
        "Vârful parabolei este $V(2,-1)$.",
      ],
    },
    {
      statement: "Rezolvați ecuația $x^2-5x+6=0$ și verificați rezultatul cu relațiile lui Viète.",
      steps: [
        "Calculăm $\\Delta=(-5)^2-4\\cdot1\\cdot6=25-24=1$.",
        "Cum $\\Delta>0$, soluțiile sunt $x_{1,2}=\\dfrac{5\\pm1}{2}$, adică $x_1=3$ și $x_2=2$.",
        "Verificăm cu Viète: $x_1+x_2=5=-\\dfrac{b}{a}$ și $x_1\\cdot x_2=6=\\dfrac{c}{a}$, ceea ce confirmă rezultatul.",
      ],
    },
    {
      statement: "Rezolvați inecuația $x^2-x-6\\le0$.",
      steps: [
        "Rezolvăm ecuația asociată: $x^2-x-6=0$, cu $\\Delta=1+24=25$.",
        "Rădăcinile sunt $x_{1,2}=\\dfrac{1\\pm5}{2}$, adică $x_1=-2$ și $x_2=3$.",
        "Cum $a=1>0$, funcția este negativă (sau nulă) între rădăcini, deci soluția inecuației este $[-2,3]$.",
      ],
    },
    {
      statement: "Pentru ce valori ale lui $m$ ecuația $x^2-2x+m=0$ are două soluții reale distincte?",
      steps: [
        "Condiția pentru două soluții reale distincte este $\\Delta>0$.",
        "Calculăm $\\Delta=(-2)^2-4\\cdot1\\cdot m=4-4m$.",
        "Punem condiția $4-4m>0 \\Rightarrow m<1$.",
      ],
    },
  ],
};
