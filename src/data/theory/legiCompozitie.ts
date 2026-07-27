import type { TheorySection } from "../../types";

export const legiCompozitieTheory: TheorySection = {
  topic: "legi-compozitie",
  title: "Legi de compoziție",
  concepts: [
    {
      heading: "Legea de compoziție",
      body: [
        "O lege de compoziție (operație) pe o mulțime $M$ este o funcție $\\circ: M\\times M\\to M$, care asociază fiecărei perechi $(x,y)$ un unic element $x\\circ y\\in M$.",
        "Legea este internă dacă rezultatul $x\\circ y$ rămâne întotdeauna în $M$, pentru orice $x,y\\in M$.",
      ],
    },
    {
      heading: "Comutativitate și asociativitate",
      body: [
        "Legea $\\circ$ este comutativă dacă $x\\circ y=y\\circ x$, pentru orice $x,y\\in M$.",
        "Legea $\\circ$ este asociativă dacă $(x\\circ y)\\circ z=x\\circ(y\\circ z)$, pentru orice $x,y,z\\in M$.",
      ],
    },
    {
      heading: "Element neutru",
      body: [
        "Elementul $e\\in M$ este element neutru pentru legea $\\circ$ dacă $x\\circ e=e\\circ x=x$, pentru orice $x\\in M$.",
      ],
    },
    {
      heading: "Element simetrizabil",
      body: [
        "Elementul $x\\in M$ este simetrizabil dacă există $x'\\in M$ astfel încât $x\\circ x'=x'\\circ x=e$ (elementul neutru).",
        "Elementul $x'$ se numește simetricul lui $x$.",
      ],
    },
    {
      heading: "Tabla operației",
      body: [
        "Pentru o mulțime finită, legea de compoziție poate fi descrisă printr-un tabel (tabla operației), în care la intersecția liniei $x$ cu coloana $y$ se află $x\\circ y$.",
      ],
    },
    {
      heading: "Grup",
      body: [
        "$(G,\\circ)$ este grup dacă legea $\\circ$ este asociativă, admite element neutru, și orice element din $G$ este simetrizabil.",
        "Exemple: $(\\mathbb{Z},+)$ este grup; mulțimea claselor de resturi modulo $n$ împreună cu adunarea, $(\\mathbb{Z}_n,+)$, este de asemenea grup (grupul aditiv al claselor de resturi modulo $n$).",
      ],
    },
    {
      heading: "Morfism și izomorfism de grupuri",
      body: [
        "O funcție $f:(G,\\circ)\\to(H,*)$ este morfism de grupuri dacă $f(x\\circ y)=f(x)*f(y)$, pentru orice $x,y\\in G$.",
        "Un morfism care este și bijectiv se numește izomorfism de grupuri.",
      ],
    },
    {
      heading: "Inel",
      body: [
        "$(A,+,\\cdot)$ este inel dacă $(A,+)$ este grup abelian, legea $\\cdot$ este asociativă, iar $\\cdot$ este distributivă față de $+$.",
        "Exemple: $(\\mathbb{Z},+,\\cdot)$, $(\\mathbb{Z}_n,+,\\cdot)$ sunt inele.",
      ],
    },
    {
      heading: "Corp",
      body: [
        "Un inel $(A,+,\\cdot)$ cu $1\\neq0$ este corp dacă orice element nenul al lui $A$ este simetrizabil (inversabil) față de $\\cdot$.",
        "Exemple: $(\\mathbb{Q},+,\\cdot)$, $(\\mathbb{R},+,\\cdot)$ sunt corpuri; $(\\mathbb{Z}_p,+,\\cdot)$ este corp dacă și numai dacă $p$ este număr prim.",
      ],
    },
  ],
  examples: [
    {
      statement:
        "Pe $\\mathbb{R}$ se definește legea $x\\circ y=xy+4(x+y)$. Calculați $1\\circ 2$ și $2\\circ 1$, apoi comparați rezultatele.",
      steps: [
        "Înlocuim în formulă: $1\\circ2=1\\cdot2+4(1+2)=2+12=14$.",
        "Calculăm și $2\\circ1=2\\cdot1+4(2+1)=2+12=14$.",
        "Rezultatele coincid, ceea ce ilustrează comutativitatea legii (înmulțirea și adunarea numerelor reale sunt comutative).",
      ],
    },
    {
      statement: "Pe $\\mathbb{R}$ se definește legea $x\\circ y=x+y-2$. Determinați elementul neutru $e$ al legii.",
      steps: [
        "Elementul neutru $e$ verifică $x\\circ e=x$, pentru orice $x$.",
        "Înlocuim în formulă: $x+e-2=x$.",
        "Simplificăm: $e-2=0 \\Rightarrow e=2$.",
      ],
    },
    {
      statement:
        "Pentru legea $x\\circ y=x+y-2$ (cu elementul neutru $e=2$, din exemplul anterior), determinați simetricul $x'$ al numărului $x=5$.",
      steps: [
        "Simetricul $x'$ verifică $x\\circ x'=e$, adică $5\\circ x'=2$.",
        "Înlocuim în formulă: $5+x'-2=2$.",
        "Rezolvăm: $x'+3=2 \\Rightarrow x'=-1$.",
      ],
    },
    {
      statement: "Verificați că $(\\mathbb{Z}_4,+)$ este grup.",
      steps: [
        "Adunarea claselor de resturi modulo $4$ este asociativă (moștenită din asociativitatea adunării întregilor).",
        "Elementul neutru este $\\hat{0}$, deoarece $\\hat{x}+\\hat{0}=\\hat{x}$ pentru orice $\\hat{x}\\in\\mathbb{Z}_4$.",
        "Fiecare element are simetric: $\\hat{0}$ cu $\\hat{0}$, $\\hat{1}$ cu $\\hat{3}$, $\\hat{2}$ cu $\\hat{2}$, $\\hat{3}$ cu $\\hat{1}$ (suma fiecărei perechi este $\\hat{0}$).",
        "Fiind îndeplinite toate condițiile, $(\\mathbb{Z}_4,+)$ este grup.",
      ],
    },
    {
      statement: "Arătați că $f:(\\mathbb{Z},+)\\to(\\mathbb{Z},+)$, $f(x)=2x$, este morfism, dar nu este izomorfism.",
      steps: [
        "Verificăm proprietatea de morfism: $f(x+y)=2(x+y)=2x+2y=f(x)+f(y)$, pentru orice $x,y\\in\\mathbb{Z}$. Rezultă că $f$ este morfism.",
        "Verificăm surjectivitatea: valorile lui $f$ sunt exact numerele întregi pare, deci un număr impar (de exemplu $1$) nu are nicio preimagine.",
        "Cum $f$ nu este surjectivă, $f$ nu este bijectivă, deci nu este izomorfism.",
      ],
    },
    {
      statement: "Arătați că $(\\mathbb{Z}_5,+,\\cdot)$ este corp, dar $(\\mathbb{Z}_4,+,\\cdot)$ nu este corp.",
      steps: [
        "Pentru $(\\mathbb{Z}_5,+,\\cdot)$: fiecare element nenul are invers față de înmulțire — $\\hat{1}\\cdot\\hat{1}=\\hat{1}$, $\\hat{2}\\cdot\\hat{3}=\\hat{6}=\\hat{1}$, $\\hat{4}\\cdot\\hat{4}=\\hat{16}=\\hat{1}$. Cum $5$ este prim, $(\\mathbb{Z}_5,+,\\cdot)$ este corp.",
        "Pentru $(\\mathbb{Z}_4,+,\\cdot)$: elementul $\\hat{2}$ nu are invers — $\\hat{2}\\cdot\\hat{0}=\\hat{0}$, $\\hat{2}\\cdot\\hat{1}=\\hat{2}$, $\\hat{2}\\cdot\\hat{2}=\\hat{0}$, $\\hat{2}\\cdot\\hat{3}=\\hat{2}$, niciodată $\\hat{1}$.",
        "Cum $4$ nu este prim, $(\\mathbb{Z}_4,+,\\cdot)$ nu este corp.",
      ],
    },
  ],
};
