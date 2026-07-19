import type { TheorySection } from "../../types";

export const geometrieTheory: TheorySection = {
  topic: "geometrie",
  title: "Geometrie",
  concepts: [
    {
      heading: "Distanța dintre două puncte",
      body: [
        "Pentru punctele $A(x_1,y_1)$ și $B(x_2,y_2)$, distanța dintre ele este $AB=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.",
      ],
    },
    {
      heading: "Mijlocul unui segment",
      body: [
        "Mijlocul segmentului $AB$, cu $A(x_1,y_1)$ și $B(x_2,y_2)$, are coordonatele $M\\left(\\dfrac{x_1+x_2}{2},\\dfrac{y_1+y_2}{2}\\right)$.",
      ],
    },
    {
      heading: "Panta unei drepte",
      body: [
        "Panta dreptei determinate de punctele $A(x_1,y_1)$ și $B(x_2,y_2)$ este $m=\\dfrac{y_2-y_1}{x_2-x_1}$ (pentru $x_1\\neq x_2$).",
        "Două drepte sunt paralele dacă au pante egale; sunt perpendiculare dacă produsul pantelor este $-1$.",
      ],
    },
    {
      heading: "Teorema lui Pitagora",
      body: [
        "Într-un triunghi dreptunghic, pătratul ipotenuzei este egal cu suma pătratelor catetelor: $BC^2=AB^2+AC^2$ (unde unghiul drept este în $A$).",
      ],
    },
    {
      heading: "Trigonometrie în triunghiul dreptunghic",
      body: [
        "Pentru un unghi ascuțit $\\alpha$ într-un triunghi dreptunghic: $\\sin\\alpha=\\dfrac{\\text{cateta opusă}}{\\text{ipotenuză}}$, $\\cos\\alpha=\\dfrac{\\text{cateta alăturată}}{\\text{ipotenuză}}$, $\\tan\\alpha=\\dfrac{\\text{cateta opusă}}{\\text{cateta alăturată}}$.",
      ],
    },
    {
      heading: "Teorema sinusurilor și teorema cosinusului",
      body: [
        "Teorema sinusurilor: $\\dfrac{a}{\\sin A}=\\dfrac{b}{\\sin B}=\\dfrac{c}{\\sin C}=2R$.",
        "Teorema cosinusului: $a^2=b^2+c^2-2bc\\cos A$.",
      ],
    },
    {
      heading: "Vectori",
      body: [
        "Vectorul de poziție al unui punct $A(x,y)$ este $\\overrightarrow{OA}=x\\vec{i}+y\\vec{j}$.",
        "Doi vectori nenuli sunt coliniari dacă unul este un multiplu scalar al celuilalt.",
      ],
    },
  ],
  examples: [
    {
      statement: "Calculați distanța dintre punctele $A(3,1)$ și $B(7,4)$ și determinați mijlocul segmentului $AB$.",
      steps: [
        "Aplicăm formula distanței: $AB=\\sqrt{(7-3)^2+(4-1)^2}$.",
        "Calculăm sub radical: $4^2+3^2=16+9=25$, deci $AB=\\sqrt{25}=5$.",
        "Mijlocul segmentului este $M\\left(\\dfrac{3+7}{2},\\dfrac{1+4}{2}\\right)=M\\left(5,\\dfrac{5}{2}\\right)$.",
      ],
    },
    {
      statement: "Un triunghi dreptunghic are cateta $AB=5$ și ipotenuza $BC=13$. Calculați cealaltă catetă $AC$ și $\\sin B$.",
      steps: [
        "Aplicăm teorema lui Pitagora: $BC^2=AB^2+AC^2$.",
        "Înlocuim: $13^2=5^2+AC^2 \\Rightarrow 169=25+AC^2 \\Rightarrow AC^2=144$.",
        "Rezultă $AC=12$.",
        "Calculăm $\\sin B=\\dfrac{\\text{cateta opusă lui }B}{\\text{ipotenuză}}=\\dfrac{AC}{BC}=\\dfrac{12}{13}$.",
      ],
    },
    {
      statement: "Într-un triunghi $ABC$ se cunosc $AB=6$, $AC=8$ și $\\cos A=\\dfrac12$. Calculați $BC$.",
      steps: [
        "Aplicăm teorema cosinusului: $BC^2=AB^2+AC^2-2\\cdot AB\\cdot AC\\cdot\\cos A$.",
        "Înlocuim: $BC^2=36+64-2\\cdot6\\cdot8\\cdot\\dfrac12$.",
        "Calculăm: $BC^2=100-48=52$.",
        "Rezultă $BC=\\sqrt{52}=2\\sqrt{13}$.",
      ],
    },
  ],
};
