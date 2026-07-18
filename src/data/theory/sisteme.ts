import type { TheorySection } from "../../types";

export const sistemeTheory: TheorySection = {
  topic: "sisteme",
  title: "Sisteme de ecuații liniare",
  concepts: [
    {
      heading: "Sisteme de două ecuații cu două necunoscute",
      body: [
        "Un sistem liniar $\\begin{cases}a_1x+b_1y=c_1\\\\a_2x+b_2y=c_2\\end{cases}$ se poate rezolva prin metoda substituției sau prin metoda reducerii (eliminării).",
      ],
    },
    {
      heading: "Metoda lui Cramer",
      body: [
        "Se definesc determinanții $\\Delta = \\begin{vmatrix}a_1&b_1\\\\a_2&b_2\\end{vmatrix}$, $\\Delta_x$ (se înlocuiește coloana lui $x$ cu termenii liberi) și $\\Delta_y$ (analog pentru $y$).",
        "Dacă $\\Delta \\neq 0$, sistemul are soluție unică: $x = \\dfrac{\\Delta_x}{\\Delta}$, $y = \\dfrac{\\Delta_y}{\\Delta}$.",
      ],
    },
    {
      heading: "Clasificarea sistemelor",
      body: [
        "Dacă $\\Delta \\neq 0$: sistem compatibil determinat (soluție unică).",
        "Dacă $\\Delta = 0$ și $\\Delta_x = \\Delta_y = 0$: sistem compatibil nedeterminat (infinite soluții).",
        "Dacă $\\Delta = 0$ și cel puțin unul dintre $\\Delta_x, \\Delta_y$ este nenul: sistem incompatibil (nicio soluție).",
      ],
    },
  ],
  examples: [
    {
      statement: "Rezolvați sistemul $$\\begin{cases}2x+y=7\\\\x-y=2\\end{cases}$$ prin metoda reducerii.",
      steps: [
        "Adunăm cele două ecuații pentru a elimina $y$: $(2x+y)+(x-y) = 7+2 \\Rightarrow 3x = 9$.",
        "Rezultă $x=3$.",
        "Înlocuim în a doua ecuație: $3 - y = 2 \\Rightarrow y = 1$.",
      ],
    },
    {
      statement: "Rezolvați sistemul $$\\begin{cases}x+2y=5\\\\3x-y=1\\end{cases}$$ folosind metoda lui Cramer.",
      steps: [
        "Calculăm $\\Delta = \\begin{vmatrix}1&2\\\\3&-1\\end{vmatrix} = 1\\cdot(-1)-2\\cdot3 = -7$.",
        "Calculăm $\\Delta_x = \\begin{vmatrix}5&2\\\\1&-1\\end{vmatrix} = -5-2=-7$, deci $x = \\dfrac{-7}{-7}=1$.",
        "Calculăm $\\Delta_y = \\begin{vmatrix}1&5\\\\3&1\\end{vmatrix} = 1-15=-14$, deci $y = \\dfrac{-14}{-7}=2$.",
      ],
    },
    {
      statement:
        "Pentru ce valoare a lui $m$ sistemul $$\\begin{cases}x+my=1\\\\2x+4y=2\\end{cases}$$ este compatibil nedeterminat?",
      steps: [
        "Calculăm $\\Delta = \\begin{vmatrix}1&m\\\\2&4\\end{vmatrix} = 4-2m$.",
        "Pentru compatibil nedeterminat avem nevoie de $\\Delta=0$: $4-2m=0 \\Rightarrow m=2$.",
        "Verificăm că și $\\Delta_x=\\Delta_y=0$ pentru $m=2$: a doua ecuație devine exact prima înmulțită cu $2$, deci sistemul are într-adevăr infinite soluții.",
      ],
    },
  ],
};
