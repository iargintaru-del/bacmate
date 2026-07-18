import type { TheorySection } from "../../types";

export const determinantiTheory: TheorySection = {
  topic: "determinanti",
  title: "Determinanți",
  concepts: [
    {
      heading: "Determinantul unei matrice de ordinul 2",
      body: [
        "Pentru $$A=\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix},$$ determinantul este $\\det(A) = ad-bc$.",
      ],
    },
    {
      heading: "Determinantul unei matrice de ordinul 3 (regula lui Sarrus)",
      body: [
        "Se rescriu primele două coloane după matrice, apoi se adună produsele diagonalelor descendente și se scad produsele diagonalelor ascendente.",
      ],
    },
    {
      heading: "Proprietăți ale determinanților",
      body: [
        "Dacă două linii (sau coloane) sunt proporționale, $\\det(A)=0$.",
        "Pentru o matrice pătratică de ordin $n$: $\\det(kA) = k^n \\det(A)$.",
        "$\\det(A \\cdot B) = \\det(A) \\cdot \\det(B)$.",
        "O matrice este inversabilă dacă și numai dacă $\\det(A) \\neq 0$.",
      ],
    },
  ],
  examples: [
    {
      statement: "Calculați determinantul $$\\begin{vmatrix}3&5\\\\2&4\\end{vmatrix}.$$",
      steps: [
        "Aplicăm formula pentru ordinul 2: $\\det = ad-bc$.",
        "Înlocuim: $\\det = 3 \\cdot 4 - 5 \\cdot 2 = 12 - 10 = 2$.",
      ],
    },
    {
      statement:
        "Calculați determinantul $$\\begin{vmatrix}1&2&0\\\\0&1&3\\\\2&0&1\\end{vmatrix}$$ folosind regula lui Sarrus.",
      steps: [
        "Rescriem primele două coloane după matrice: $1,2,0,1,2 / 0,1,3,0,1 / 2,0,1,2,0$.",
        "Diagonalele descendente: $1\\cdot1\\cdot1 + 2\\cdot3\\cdot2 + 0\\cdot0\\cdot0 = 1+12+0=13$.",
        "Diagonalele ascendente: $2\\cdot1\\cdot0 + 0\\cdot3\\cdot1 + 1\\cdot0\\cdot2 = 0+0+0=0$.",
        "Determinantul este diferența: $13-0=13$.",
      ],
    },
    {
      statement: "Pentru ce valoare a lui $m$ matricea $$A=\\begin{pmatrix}m&2\\\\4&m\\end{pmatrix}$$ nu este inversabilă?",
      steps: [
        "O matrice nu este inversabilă exact atunci când determinantul ei este $0$.",
        "Calculăm $\\det(A) = m^2 - 8$.",
        "Punem condiția $m^2 - 8 = 0 \\Rightarrow m = \\pm 2\\sqrt{2}$.",
      ],
    },
  ],
};
