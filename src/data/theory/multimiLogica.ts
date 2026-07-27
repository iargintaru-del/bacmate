import type { TheorySection } from "../../types";

export const multimiLogicaTheory: TheorySection = {
  topic: "multimi-logica",
  title: "Mulțimi și logică matematică",
  concepts: [
    {
      heading: "Operații cu mulțimi",
      body: [
        "Reuniunea mulțimilor $A$ și $B$ este $A\\cup B=\\{x \\mid x\\in A \\text{ sau } x\\in B\\}$.",
        "Intersecția mulțimilor $A$ și $B$ este $A\\cap B=\\{x \\mid x\\in A \\text{ și } x\\in B\\}$.",
        "Diferența mulțimilor $A$ și $B$ este $A\\setminus B=\\{x \\mid x\\in A \\text{ și } x\\notin B\\}$.",
        "Complementara mulțimii $A$ față de o mulțime totală $E$ este $C_EA=E\\setminus A$.",
      ],
    },
    {
      heading: "Intervale de numere reale",
      body: [
        "Pentru $a,b\\in\\mathbb{R}$, $a<b$, intervalul închis este $[a,b]=\\{x\\in\\mathbb{R} \\mid a\\le x\\le b\\}$, iar intervalul deschis este $(a,b)=\\{x\\in\\mathbb{R} \\mid a<x<b\\}$.",
        "Intervalele nemărginite se notează $(a,+\\infty)=\\{x\\in\\mathbb{R}\\mid x>a\\}$ și $(-\\infty,a)=\\{x\\in\\mathbb{R}\\mid x<a\\}$.",
      ],
    },
    {
      heading: "Propoziții și predicate",
      body: [
        "O propoziție este un enunț căruia i se poate atribui o valoare de adevăr: adevărat (1) sau fals (0).",
        "Un predicat este un enunț care depinde de una sau mai multe variabile și devine propoziție pentru fiecare valoare dată variabilelor.",
        "Cuantificatorul universal $\\forall$ se citește \"oricare ar fi\", iar cuantificatorul existențial $\\exists$ se citește \"există\".",
      ],
    },
    {
      heading: "Operatori logici",
      body: [
        "Negația propoziției $p$ este $\\bar{p}$ (sau $\\neg p$), adevărată exact atunci când $p$ este falsă.",
        "Conjuncția $p\\wedge q$ este adevărată doar când ambele propoziții $p$ și $q$ sunt adevărate.",
        "Disjuncția $p\\vee q$ este adevărată dacă cel puțin una dintre propozițiile $p$, $q$ este adevărată.",
        "Implicația $p\\Rightarrow q$ este falsă doar atunci când $p$ este adevărată și $q$ este falsă.",
        "Echivalența $p\\Leftrightarrow q$ este adevărată când $p$ și $q$ au aceeași valoare de adevăr.",
      ],
    },
    {
      heading: "Inducția matematică",
      body: [
        "Metoda inducției matematice se folosește pentru a demonstra că o proprietate $P(n)$ este adevărată pentru orice număr natural $n\\ge n_0$.",
        "Etapa de verificare: se arată că $P(n_0)$ este adevărată.",
        "Etapa de demonstrație: presupunând $P(k)$ adevărată (ipoteza de inducție), se arată că $P(k+1)$ este adevărată.",
      ],
    },
  ],
  examples: [
    {
      statement: "Fie $A=\\{1,2,3,4,5\\}$ și $B=\\{3,4,5,6,7\\}$. Determinați $A\\cup B$, $A\\cap B$ și $A\\setminus B$.",
      steps: [
        "Reuniunea conține toate elementele care apar în cel puțin una dintre mulțimi: $A\\cup B=\\{1,2,3,4,5,6,7\\}$.",
        "Intersecția conține elementele comune: $A\\cap B=\\{3,4,5\\}$.",
        "Diferența $A\\setminus B$ conține elementele din $A$ care nu sunt în $B$: $A\\setminus B=\\{1,2\\}$.",
      ],
    },
    {
      statement: "Determinați valoarea de adevăr a propoziției $p$: \"3 este număr par\" și scrieți negația ei.",
      steps: [
        "Propoziția $p$ este falsă, deoarece $3$ este număr impar.",
        "Negația este $\\bar p$: \"3 nu este număr par\", care este adevărată.",
      ],
    },
    {
      statement: "Demonstrați prin inducție matematică faptul că $1+2+\\cdots+n=\\dfrac{n(n+1)}{2}$, pentru orice $n\\ge1$.",
      steps: [
        "Verificare pentru $n=1$: suma este $1$, iar formula dă $\\dfrac{1\\cdot2}{2}=1$, deci egalitatea este adevărată.",
        "Presupunem adevărată egalitatea pentru $n=k$: $1+2+\\cdots+k=\\dfrac{k(k+1)}{2}$ (ipoteza de inducție).",
        "Pentru $n=k+1$: $1+2+\\cdots+k+(k+1)=\\dfrac{k(k+1)}{2}+(k+1)=\\dfrac{(k+1)(k+2)}{2}$, adică formula rămâne adevărată.",
        "Conform principiului inducției matematice, egalitatea este adevărată pentru orice $n\\ge1$.",
      ],
    },
  ],
};
