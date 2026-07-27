import type { TheorySection } from "../../types";

export const siruriTheory: TheorySection = {
  topic: "siruri",
  title: "Șiruri",
  concepts: [
    {
      heading: "Progresia aritmetică — definiție și termenul general",
      body: [
        "Un șir $(a_n)_{n\\ge1}$ este progresie aritmetică dacă există o rație $r\\in\\mathbb{R}$ astfel încât $a_{n+1}=a_n+r$, pentru orice $n\\ge1$.",
        "Termenul general al unei progresii aritmetice este $a_n=a_1+(n-1)r$.",
      ],
    },
    {
      heading: "Suma primilor n termeni ai unei progresii aritmetice",
      body: [
        "Suma primilor $n$ termeni este $S_n=\\dfrac{(a_1+a_n)\\cdot n}{2}$.",
        "Folosind termenul general, suma se poate scrie și $S_n=\\dfrac{[2a_1+(n-1)r]\\cdot n}{2}$.",
      ],
    },
    {
      heading: "Condiția ca trei numere să fie în progresie aritmetică",
      body: [
        "Numerele $a,b,c$ sunt în progresie aritmetică dacă și numai dacă $2b=a+c$ (adică $b$ este media aritmetică a lui $a$ și $c$).",
      ],
    },
    {
      heading: "Progresia geometrică — definiție și termenul general",
      body: [
        "Un șir $(b_n)_{n\\ge1}$ cu termeni nenuli este progresie geometrică dacă există o rație $q\\in\\mathbb{R}^*$ astfel încât $b_{n+1}=b_n\\cdot q$, pentru orice $n\\ge1$.",
        "Termenul general al unei progresii geometrice este $b_n=b_1\\cdot q^{n-1}$.",
      ],
    },
    {
      heading: "Suma primilor n termeni ai unei progresii geometrice",
      body: [
        "Pentru $q\\neq1$, suma primilor $n$ termeni este $S_n=b_1\\cdot\\dfrac{q^n-1}{q-1}$.",
        "Pentru $q=1$, toți termenii sunt egali cu $b_1$, deci $S_n=n\\cdot b_1$.",
      ],
    },
    {
      heading: "Condiția ca trei numere să fie în progresie geometrică",
      body: [
        "Numerele nenule $a,b,c$ sunt în progresie geometrică dacă și numai dacă $b^2=a\\cdot c$ (adică $b$ este media geometrică a lui $a$ și $c$).",
      ],
    },
  ],
  examples: [
    {
      statement: "Fie progresia aritmetică cu $a_1=5$ și rația $r=3$. Calculați $a_{10}$.",
      steps: [
        "Aplicăm formula termenului general: $a_n=a_1+(n-1)r$.",
        "Înlocuim $n=10$: $a_{10}=5+9\\cdot3$.",
        "Calculăm: $a_{10}=5+27=32$.",
      ],
    },
    {
      statement: "Calculați suma primilor $20$ de termeni ai progresiei aritmetice cu $a_1=2$ și $r=4$.",
      steps: [
        "Determinăm mai întâi termenul $a_{20}$: $a_{20}=a_1+19r=2+19\\cdot4=2+76=78$.",
        "Aplicăm formula sumei: $S_{20}=\\dfrac{(a_1+a_{20})\\cdot20}{2}$.",
        "Calculăm: $S_{20}=\\dfrac{(2+78)\\cdot20}{2}=\\dfrac{80\\cdot20}{2}=800$.",
      ],
    },
    {
      statement: "Fie progresia geometrică cu $b_1=3$ și rația $q=2$. Calculați $b_5$.",
      steps: [
        "Aplicăm formula termenului general: $b_n=b_1\\cdot q^{n-1}$.",
        "Înlocuim $n=5$: $b_5=3\\cdot2^4$.",
        "Calculăm: $b_5=3\\cdot16=48$.",
      ],
    },
    {
      statement: "Determinați $x\\in\\mathbb{R}$ astfel încât numerele $2, x, 18$ să fie în progresie geometrică.",
      steps: [
        "Punem condiția de progresie geometrică: $x^2=2\\cdot18$.",
        "Calculăm: $x^2=36$.",
        "Rezultă $x=6$ sau $x=-6$.",
      ],
    },
  ],
};
