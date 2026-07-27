import type { TheorySection } from "../../types";

export const puteriRadicaliLogaritmiTheory: TheorySection = {
  topic: "puteri-radicali-logaritmi",
  title: "Puteri, radicali și logaritmi",
  concepts: [
    {
      heading: "Puteri cu exponent rațional",
      body: [
        "Pentru $a>0$ și $n\\in\\mathbb{N}^*$, radicalul de ordin $n$ se poate scrie ca putere: $\\sqrt[n]{a}=a^{\\frac{1}{n}}$.",
        "Pentru $a>0$ și $\\dfrac{p}{q}\\in\\mathbb{Q}$ (cu $q>0$), puterea cu exponent rațional este $a^{\\frac{p}{q}}=\\sqrt[q]{a^p}$.",
        "Proprietăți ale puterilor: $a^m\\cdot a^n=a^{m+n}$, $\\dfrac{a^m}{a^n}=a^{m-n}$, $(a^m)^n=a^{mn}$, $(ab)^n=a^nb^n$, pentru $a,b>0$.",
      ],
    },
    {
      heading: "Puteri cu exponent real",
      body: [
        "Pentru $a>0$ și $x\\in\\mathbb{R}$, puterea $a^x$ se definește ca limită a unui șir de puteri cu exponent rațional care se apropie de $x$; proprietățile puterilor rămân valabile.",
        "Dacă $a>1$, funcția $x\\mapsto a^x$ este strict crescătoare; dacă $0<a<1$, este strict descrescătoare.",
      ],
    },
    {
      heading: "Radicali — proprietăți",
      body: [
        "Pentru $a,b\\ge0$ și $n\\in\\mathbb{N}^*$, $n\\ge2$: $\\sqrt[n]{a}\\cdot\\sqrt[n]{b}=\\sqrt[n]{ab}$ și $\\dfrac{\\sqrt[n]{a}}{\\sqrt[n]{b}}=\\sqrt[n]{\\dfrac{a}{b}}$ (pentru $b\\neq0$).",
        "$\\sqrt[n]{a^m}=\\left(\\sqrt[n]{a}\\right)^m$ și $\\sqrt[m]{\\sqrt[n]{a}}=\\sqrt[mn]{a}$.",
        "Pentru a elimina radicalul de la numitor, se amplifică fracția cu o expresie convenabilă (de exemplu, cu $\\sqrt{a}$ pentru $\\dfrac{1}{\\sqrt{a}}$).",
      ],
    },
    {
      heading: "Logaritmi — definiție și proprietăți",
      body: [
        "Pentru $a>0$, $a\\neq1$ și $x>0$, logaritmul în baza $a$ al lui $x$ este numărul $\\log_a x$ astfel încât $a^{\\log_a x}=x$.",
        "Proprietăți: $\\log_a(xy)=\\log_a x+\\log_a y$, $\\log_a\\dfrac{x}{y}=\\log_a x-\\log_a y$, $\\log_a(x^n)=n\\log_a x$, pentru $x,y>0$.",
        "Cazuri particulare: $\\log_a 1=0$ și $\\log_a a=1$.",
      ],
    },
    {
      heading: "Medii",
      body: [
        "Media aritmetică a numerelor $a$ și $b$ este $\\dfrac{a+b}{2}$.",
        "Media ponderată a numerelor $a_1,\\ldots,a_n$ cu ponderile $p_1,\\ldots,p_n$ este $\\dfrac{a_1p_1+\\cdots+a_np_n}{p_1+\\cdots+p_n}$.",
        "Media geometrică a numerelor nenegative $a$ și $b$ este $\\sqrt{ab}$.",
        "Media armonică a numerelor pozitive $a$ și $b$ este $\\dfrac{2}{\\frac{1}{a}+\\frac{1}{b}}=\\dfrac{2ab}{a+b}$.",
      ],
    },
  ],
  examples: [
    {
      statement: "Calculați $8^{\\frac{2}{3}}$.",
      steps: [
        "Scriem puterea ca radical: $8^{\\frac{2}{3}}=\\sqrt[3]{8^2}$.",
        "Calculăm $8^2=64$, deci obținem $\\sqrt[3]{64}$.",
        "Cum $4^3=64$, rezultă $8^{\\frac{2}{3}}=4$.",
      ],
    },
    {
      statement: "Simplificați expresia $\\sqrt{12}\\cdot\\sqrt{3}$.",
      steps: [
        "Folosim proprietatea $\\sqrt{a}\\cdot\\sqrt{b}=\\sqrt{ab}$: $\\sqrt{12}\\cdot\\sqrt{3}=\\sqrt{36}$.",
        "Calculăm $\\sqrt{36}=6$.",
      ],
    },
    {
      statement: "Calculați $\\log_2 32$.",
      steps: [
        "Căutăm exponentul $x$ astfel încât $2^x=32$.",
        "Observăm că $2^5=32$.",
        "Rezultă $\\log_2 32=5$.",
      ],
    },
    {
      statement: "Calculați media geometrică a numerelor $4$ și $9$.",
      steps: [
        "Media geometrică este $\\sqrt{4\\cdot9}=\\sqrt{36}$.",
        "Rezultă media geometrică $=6$.",
      ],
    },
  ],
};
