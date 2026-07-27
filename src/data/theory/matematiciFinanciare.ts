import type { TheorySection } from "../../types";

export const matematiciFinanciareTheory: TheorySection = {
  topic: "matematici-financiare",
  title: "Matematici financiare",
  concepts: [
    {
      heading: "Procente",
      body: [
        "Un procent de $p\\%$ dintr-o cantitate $V$ reprezintă $\\dfrac{p}{100}\\cdot V$.",
        "Dacă o cantitate $V_0$ crește cu $p\\%$, noua valoare este $V=V_0\\left(1+\\dfrac{p}{100}\\right)$; dacă scade cu $p\\%$, noua valoare este $V=V_0\\left(1-\\dfrac{p}{100}\\right)$.",
      ],
    },
    {
      heading: "Dobânda simplă",
      body: [
        "Dobânda simplă pentru un capital $C$, depus cu o rată anuală a dobânzii $p\\%$, pe o perioadă de $n$ ani, este $D=\\dfrac{C\\cdot p\\cdot n}{100}$.",
        "Suma finală (capital plus dobândă) este $S=C+D=C\\left(1+\\dfrac{pn}{100}\\right)$.",
      ],
    },
    {
      heading: "Dobânda compusă",
      body: [
        "La dobânda compusă, dobânda obținută se adaugă la capital, iar dobânda din perioada următoare se calculează la noul capital.",
        "Suma finală după $n$ ani, cu rata anuală $p\\%$, este $S=C\\left(1+\\dfrac{p}{100}\\right)^n$.",
      ],
    },
    {
      heading: "TVA",
      body: [
        "TVA (taxa pe valoarea adăugată) este un procent aplicat prețului fără TVA (prețul net); prețul cu TVA este $P_{TVA}=P_{net}\\left(1+\\dfrac{p}{100}\\right)$, unde $p$ este cota de TVA.",
        "Pentru a determina prețul net dintr-un preț care include TVA, se calculează $P_{net}=\\dfrac{P_{TVA}}{1+\\frac{p}{100}}$.",
      ],
    },
  ],
  examples: [
    {
      statement: "Un produs costă $200$ lei și prețul se majorează cu $15\\%$. Determinați noul preț.",
      steps: [
        "Aplicăm formula creșterii cu procent: $V=V_0\\left(1+\\dfrac{p}{100}\\right)$.",
        "Înlocuim: $V=200\\left(1+\\dfrac{15}{100}\\right)=200\\cdot1{,}15$.",
        "Calculăm: $V=230$ lei.",
      ],
    },
    {
      statement: "Un capital de $1000$ lei este depus cu dobândă simplă de $6\\%$ pe an, timp de $3$ ani. Calculați dobânda obținută.",
      steps: [
        "Aplicăm formula dobânzii simple: $D=\\dfrac{C\\cdot p\\cdot n}{100}$.",
        "Înlocuim: $D=\\dfrac{1000\\cdot6\\cdot3}{100}$.",
        "Calculăm: $D=\\dfrac{18000}{100}=180$ lei.",
      ],
    },
    {
      statement: "Un capital de $500$ lei este depus cu dobândă compusă de $10\\%$ pe an, timp de $2$ ani. Calculați suma finală.",
      steps: [
        "Aplicăm formula dobânzii compuse: $S=C\\left(1+\\dfrac{p}{100}\\right)^n$.",
        "Înlocuim: $S=500\\left(1+\\dfrac{10}{100}\\right)^2=500\\cdot1{,}1^2$.",
        "Calculăm: $S=500\\cdot1{,}21=605$ lei.",
      ],
    },
    {
      statement: "Un produs are prețul net (fără TVA) de $100$ lei, iar cota de TVA este $19\\%$. Determinați prețul cu TVA.",
      steps: [
        "Aplicăm formula: $P_{TVA}=P_{net}\\left(1+\\dfrac{p}{100}\\right)$.",
        "Înlocuim: $P_{TVA}=100\\left(1+\\dfrac{19}{100}\\right)=100\\cdot1{,}19$.",
        "Calculăm: $P_{TVA}=119$ lei.",
      ],
    },
  ],
};
