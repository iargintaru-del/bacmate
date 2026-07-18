import type { TheorySection } from "../../types";

export const combinatoricaTheory: TheorySection = {
  topic: "combinatorica",
  title: "Combinatorică",
  concepts: [
    {
      heading: "Permutări",
      body: [
        "Numărul de moduri de a aranja $n$ elemente distincte într-un șir este $P_n = n! = 1 \\cdot 2 \\cdot 3 \\cdots n$.",
      ],
    },
    {
      heading: "Aranjamente",
      body: [
        "Numărul de moduri de a alege și ordona $k$ elemente din $n$ (contează ordinea) este $A_n^k = \\dfrac{n!}{(n-k)!} = n(n-1)\\cdots(n-k+1)$.",
      ],
    },
    {
      heading: "Combinări",
      body: [
        "Numărul de moduri de a alege $k$ elemente din $n$, fără a conta ordinea, este $C_n^k = \\dfrac{n!}{k!(n-k)!}$.",
        "Proprietăți: $C_n^k = C_n^{n-k}$ și $C_n^0 = C_n^n = 1$.",
      ],
    },
    {
      heading: "Binomul lui Newton",
      body: [
        "$(x+y)^n = \\sum_{k=0}^{n} C_n^k x^{n-k} y^k$.",
        "Termenul de rang $k+1$ este $T_{k+1} = C_n^k x^{n-k} y^k$.",
      ],
    },
  ],
  examples: [
    {
      statement: "Calculați $A_6^2$.",
      steps: [
        "Se folosește formula aranjamentelor: $A_n^k = n(n-1)\\cdots(n-k+1)$, cu $n=6$, $k=2$.",
        "Înlocuim: $A_6^2 = 6 \\cdot 5 = 30$.",
      ],
    },
    {
      statement: "Calculați $C_7^3$.",
      steps: [
        "Aplicăm formula combinărilor: $C_n^k = \\dfrac{n!}{k!(n-k)!}$, cu $n=7$, $k=3$.",
        "Înlocuim: $C_7^3 = \\dfrac{7!}{3! \\cdot 4!} = \\dfrac{7 \\cdot 6 \\cdot 5}{3 \\cdot 2 \\cdot 1} = \\dfrac{210}{6} = 35$.",
      ],
    },
    {
      statement: "Determinați coeficientul lui $x^3$ în dezvoltarea $(x+2)^5$.",
      steps: [
        "Termenul general este $T_{k+1} = C_5^k x^{5-k} 2^k$.",
        "Avem nevoie de puterea $x^3$, deci $5-k=3 \\Rightarrow k=2$.",
        "Coeficientul este $C_5^2 \\cdot 2^2 = 10 \\cdot 4 = 40$.",
      ],
    },
  ],
};
