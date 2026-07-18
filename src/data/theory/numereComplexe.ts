import type { TheorySection } from "../../types";

export const numereComplexeTheory: TheorySection = {
  topic: "numere-complexe",
  title: "Numere complexe",
  concepts: [
    {
      heading: "Forma algebrică",
      body: [
        "Un număr complex se scrie sub forma $z = a + bi$, unde $a, b \\in \\mathbb{R}$ și $i$ este unitatea imaginară, cu proprietatea $i^2 = -1$.",
        "Numărul $a = \\mathrm{Re}(z)$ se numește partea reală, iar $b = \\mathrm{Im}(z)$ partea imaginară.",
      ],
    },
    {
      heading: "Operații cu numere complexe",
      body: [
        "Adunarea și scăderea se fac pe componente: $(a+bi) \\pm (c+di) = (a \\pm c) + (b \\pm d)i$.",
        "Înmulțirea: $(a+bi)(c+di) = (ac-bd) + (ad+bc)i$, folosind $i^2=-1$.",
        "Conjugatul lui $z=a+bi$ este $\\overline{z} = a-bi$; împărțirea se face amplificând cu conjugatul numitorului.",
      ],
    },
    {
      heading: "Modulul unui număr complex",
      body: [
        "Modulul lui $z=a+bi$ este $|z| = \\sqrt{a^2+b^2}$.",
        "Proprietăți utile: $|z_1 z_2| = |z_1||z_2|$ și $|\\overline{z}| = |z|$.",
      ],
    },
    {
      heading: "Puterile lui i",
      body: [
        "Puterile lui $i$ sunt periodice cu perioada 4: $i^1=i$, $i^2=-1$, $i^3=-i$, $i^4=1$.",
        "Pentru orice exponent $n$, se scrie $n = 4q+r$ (împărțire cu rest la 4) și atunci $i^n = i^r$.",
      ],
    },
    {
      heading: "Ecuații de gradul al doilea cu discriminant negativ",
      body: [
        "Pentru $ax^2+bx+c=0$ cu $\\Delta = b^2-4ac < 0$, soluțiile sunt numere complexe conjugate: $x_{1,2} = \\dfrac{-b \\pm i\\sqrt{-\\Delta}}{2a}$.",
      ],
    },
  ],
  examples: [
    {
      statement: "Fie $z = 5 + 12i$. Calculați $|z|$ și conjugatul $\\overline{z}$.",
      steps: [
        "Identificăm partea reală și imaginară: $a=5$, $b=12$.",
        "Aplicăm formula modulului: $|z| = \\sqrt{a^2+b^2} = \\sqrt{5^2+12^2} = \\sqrt{25+144} = \\sqrt{169} = 13$.",
        "Conjugatul se obține schimbând semnul părții imaginare: $\\overline{z} = 5 - 12i$.",
      ],
    },
    {
      statement: "Calculați $i^{57}$.",
      steps: [
        "Împărțim exponentul la 4 (perioada puterilor lui $i$): $57 = 4 \\cdot 14 + 1$.",
        "Restul împărțirii este $1$, deci $i^{57} = i^1$.",
        "Rezultatul este $i^{57} = i$.",
      ],
    },
    {
      statement: "Rezolvați ecuația $z^2 - 2z + 5 = 0$ în mulțimea numerelor complexe.",
      steps: [
        "Calculăm discriminantul: $\\Delta = (-2)^2 - 4 \\cdot 1 \\cdot 5 = 4 - 20 = -16$.",
        "Cum $\\Delta < 0$, soluțiile sunt complexe: $z_{1,2} = \\dfrac{2 \\pm \\sqrt{-16}}{2} = \\dfrac{2 \\pm 4i}{2}$.",
        "Simplificăm: $z_{1,2} = 1 \\pm 2i$.",
      ],
    },
  ],
};
