import type { TheorySection } from "../../types";

export const statisticaTheory: TheorySection = {
  topic: "statistica",
  title: "Statistică",
  concepts: [
    {
      heading: "Culegerea și clasificarea datelor statistice",
      body: [
        "O cercetare statistică începe cu culegerea datelor referitoare la o populație statistică (mulțimea unităților observate).",
        "Datele culese pot fi clasificate în date calitative (categorii, de exemplu culoarea) și date cantitative (valori numerice, de exemplu înălțimea).",
      ],
    },
    {
      heading: "Frecvențe",
      body: [
        "Frecvența absolută a unei valori (sau categorii) este numărul de apariții ale acesteia în setul de date.",
        "Frecvența relativă este raportul dintre frecvența absolută și numărul total de date, adesea exprimată în procente.",
      ],
    },
    {
      heading: "Reprezentarea grafică a datelor statistice",
      body: [
        "Datele calitative se reprezintă adesea prin diagrame cu bare sau diagrame circulare (de tip „plăcintă”).",
        "Datele cantitative se reprezintă adesea prin histograme (bare adiacente, pentru date grupate pe intervale) sau poligoane de frecvențe.",
      ],
    },
    {
      heading: "Interpretarea datelor statistice",
      body: [
        "Interpretarea unei reprezentări grafice presupune identificarea valorii (sau categoriei) cu frecvența cea mai mare, a celei cu frecvența cea mai mică și a tendinței generale a datelor.",
        "Media aritmetică a unui set de date este suma valorilor împărțită la numărul de date și oferă o valoare reprezentativă pentru întregul set.",
      ],
    },
  ],
  examples: [
    {
      statement: "La un test, notele obținute de $10$ elevi au fost: $7,8,9,7,10,8,7,9,8,7$. Determinați frecvența absolută a notei $7$.",
      steps: [
        "Numărăm de câte ori apare nota $7$ în șirul de date: $7,7,7,7$.",
        "Nota $7$ apare de $4$ ori.",
        "Frecvența absolută a notei $7$ este $4$.",
      ],
    },
    {
      statement: "Pentru datele din exemplul anterior, determinați frecvența relativă a notei $8$ (exprimată în procente).",
      steps: [
        "Nota $8$ apare de $3$ ori din totalul de $10$ note.",
        "Frecvența relativă este $\\dfrac{3}{10}=0{,}3$.",
        "Exprimată în procente, frecvența relativă este $30\\%$.",
      ],
    },
    {
      statement: "Calculați media aritmetică a notelor $7,8,9,7,10,8,7,9,8,7$.",
      steps: [
        "Calculăm suma notelor: $7+8+9+7+10+8+7+9+8+7=80$.",
        "Împărțim suma la numărul de note: $\\dfrac{80}{10}$.",
        "Media aritmetică este $8$.",
      ],
    },
  ],
};
