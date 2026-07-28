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
    {
      heading: "Integrarea prin părți",
      body: [
        "Formula de integrare prin părți: $\\int u\\,v'\\,dx = uv - \\int u'v\\,dx$.",
        "Se aplică atunci când integrandul este un produs de funcții, alegând $u$ astfel încât derivata sa să simplifice calculul (de exemplu $u=\\ln x$ sau $u=x^n$), iar $v'$ să fie ușor de integrat.",
      ],
    },
    {
      heading: "Integrarea prin schimbare de variabilă",
      body: [
        "Formula de schimbare de variabilă: $\\int f(g(x))\\,g'(x)\\,dx = F(g(x))+C$, unde $F$ este o primitivă a lui $f$.",
        "Se aplică atunci când integrandul conține o funcție compusă $f(g(x))$ înmulțită cu derivata funcției interioare $g'(x)$; se notează $t=g(x)$.",
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
    {
      statement: "Calculați $\\int_0^1 xe^x\\,dx$ folosind integrarea prin părți.",
      steps: [
        "Alegem $u=x$, $v'=e^x$, deci $u'=1$, $v=e^x$.",
        "Aplicăm formula: $\\int xe^x\\,dx = xe^x - \\int e^x\\,dx = xe^x - e^x + C = (x-1)e^x+C$.",
        "Evaluăm între $0$ și $1$: la $x=1$, $(1-1)e^1=0$; la $x=0$, $(0-1)e^0=-1$.",
        "Rezultatul este $0-(-1)=1$.",
      ],
    },
    {
      statement: "Calculați $\\int_0^1 3x^2e^{x^3}\\,dx$ folosind schimbarea de variabilă.",
      steps: [
        "Notăm $t=x^3$, deci $dt=3x^2\\,dx$.",
        "Integrala devine $\\int e^t\\,dt = e^t+C = e^{x^3}+C$.",
        "Evaluăm între $0$ și $1$: la $x=1$, $e^1=e$; la $x=0$, $e^0=1$.",
        "Rezultatul este $e-1$.",
      ],
    },
  ],
};
