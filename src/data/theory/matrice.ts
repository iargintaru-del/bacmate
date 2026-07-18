import type { TheorySection } from "../../types";

export const matriceTheory: TheorySection = {
  topic: "matrice",
  title: "Matrice",
  concepts: [
    {
      heading: "Ce este o matrice",
      body: [
        "O matrice de tipul $m \\times n$ este un tablou dreptunghiular cu $m$ linii și $n$ coloane de numere reale.",
      ],
    },
    {
      heading: "Adunarea și înmulțirea cu un scalar",
      body: [
        "Două matrice de aceeași dimensiune se adună/scad element cu element.",
        "Înmulțirea cu un scalar $k$ înmulțește fiecare element al matricei cu $k$.",
      ],
    },
    {
      heading: "Înmulțirea matricelor",
      body: [
        "Produsul $A \\cdot B$ există doar dacă numărul de coloane al lui $A$ este egal cu numărul de linii al lui $B$.",
        "Elementul de pe linia $i$ și coloana $j$ al produsului este $(AB)_{ij} = \\sum_k A_{ik}B_{kj}$.",
      ],
    },
    {
      heading: "Matricea identitate și transpusa",
      body: [
        "Matricea identitate $I_n$ are $1$ pe diagonala principală și $0$ în rest; este element neutru la înmulțire: $A \\cdot I_n = I_n \\cdot A = A$.",
        "Transpusa $A^T$ se obține scriind liniile lui $A$ drept coloane.",
      ],
    },
  ],
  examples: [
    {
      statement:
        "Fie $$A=\\begin{pmatrix}2&1\\\\3&0\\end{pmatrix}, B=\\begin{pmatrix}1&4\\\\2&1\\end{pmatrix}.$$ Calculați $A+B$.",
      steps: [
        "Adunăm elementele aflate pe aceeași poziție.",
        "Linia 1: $2+1=3$, $1+4=5$. Linia 2: $3+2=5$, $0+1=1$.",
        "Rezultatul este $$A+B=\\begin{pmatrix}3&5\\\\5&1\\end{pmatrix}.$$",
      ],
    },
    {
      statement: "Pentru matricele de mai sus, calculați elementul de pe linia 2, coloana 1 al produsului $A \\cdot B$.",
      steps: [
        "Elementul $(2,1)$ al produsului se obține înmulțind linia 2 din $A$ cu coloana 1 din $B$.",
        "Linia 2 din $A$ este $(3,0)$, coloana 1 din $B$ este $(1,2)$.",
        "Calculăm: $3 \\cdot 1 + 0 \\cdot 2 = 3$.",
      ],
    },
    {
      statement: "Fie $$A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}.$$ Calculați $A^2$.",
      steps: [
        "$A^2 = A \\cdot A$, deci înmulțim matricea cu ea însăși.",
        "Elementul $(1,1)$: $1\\cdot1+1\\cdot0=1$. Elementul $(1,2)$: $1\\cdot1+1\\cdot1=2$.",
        "Elementul $(2,1)$: $0\\cdot1+1\\cdot0=0$. Elementul $(2,2)$: $0\\cdot1+1\\cdot1=1$.",
        "Rezultatul este $$A^2=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}.$$",
      ],
    },
  ],
};
