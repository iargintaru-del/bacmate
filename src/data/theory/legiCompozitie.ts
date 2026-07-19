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
  ],
};
