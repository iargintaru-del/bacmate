import type { TheorySection } from "../../types";

export const functiiExponentialeLogaritmiceTheory: TheorySection = {
  topic: "functii-exponentiale-logaritmice",
  title: "Funcții putere, radical, exponențială și logaritmică",
  concepts: [
    {
      heading: "Funcția putere și funcția radical",
      body: [
        "Funcția putere este $f:\\mathbb{R}\\to\\mathbb{R}$, $f(x)=x^n$, cu $n\\in\\mathbb{N}$, $n\\ge2$.",
        "Funcția radical este $f:D\\to\\mathbb{R}$, $f(x)=\\sqrt[n]{x}$, cu $n\\ge2$; domeniul este $D=[0,+\\infty)$ pentru $n$ par și $D=\\mathbb{R}$ pentru $n$ impar.",
      ],
    },
    {
      heading: "Funcția exponențială",
      body: [
        "Funcția exponențială este $f:\\mathbb{R}\\to(0,+\\infty)$, $f(x)=a^x$, cu $a>0$, $a\\neq1$.",
        "Dacă $a>1$, funcția este strict crescătoare; dacă $0<a<1$, este strict descrescătoare.",
        "Graficul funcției exponențiale trece prin punctul $(0,1)$, deoarece $a^0=1$.",
      ],
    },
    {
      heading: "Funcția logaritmică",
      body: [
        "Funcția logaritmică este $f:(0,+\\infty)\\to\\mathbb{R}$, $f(x)=\\log_a x$, cu $a>0$, $a\\neq1$.",
        "Funcția logaritmică este inversa funcției exponențiale cu aceeași bază $a$.",
        "Graficul funcției logaritmice trece prin punctul $(1,0)$, deoarece $\\log_a 1=0$.",
      ],
    },
    {
      heading: "Injectivitate, surjectivitate, bijectivitate",
      body: [
        "O funcție $f$ este injectivă dacă $f(x_1)=f(x_2) \\Rightarrow x_1=x_2$, pentru orice $x_1,x_2$ din domeniu.",
        "O funcție $f:A\\to B$ este surjectivă dacă pentru orice $y\\in B$ există $x\\in A$ astfel încât $f(x)=y$.",
        "O funcție este bijectivă dacă este atât injectivă, cât și surjectivă; o funcție bijectivă este inversabilă.",
      ],
    },
    {
      heading: "Ecuații exponențiale",
      body: [
        "O ecuație exponențială conține necunoscuta la exponent, de exemplu $a^{f(x)}=a^{g(x)}$, cu $a>0$, $a\\neq1$; folosind injectivitatea funcției exponențiale, ecuația este echivalentă cu $f(x)=g(x)$.",
        "Ecuațiile de tipul $a^{2x}+ba^x+c=0$ se rezolvă prin substituția $t=a^x$, $t>0$, obținând o ecuație de gradul al II-lea în $t$.",
      ],
    },
    {
      heading: "Ecuații logaritmice",
      body: [
        "O ecuație logaritmică conține necunoscuta sub logaritm, de exemplu $\\log_a f(x)=\\log_a g(x)$; folosind injectivitatea funcției logaritmice, ecuația este echivalentă cu $f(x)=g(x)$, cu condiția $f(x)>0$ și $g(x)>0$.",
        "Este esențial să se verifice condițiile de existență a logaritmilor înainte de a accepta soluțiile.",
      ],
    },
  ],
  examples: [
    {
      statement: "Rezolvați ecuația $2^{x+1}=32$.",
      steps: [
        "Scriem $32$ ca putere a lui $2$: $32=2^5$.",
        "Ecuația devine $2^{x+1}=2^5$.",
        "Folosind injectivitatea funcției exponențiale: $x+1=5 \\Rightarrow x=4$.",
      ],
    },
    {
      statement: "Rezolvați ecuația $4^x-5\\cdot2^x+4=0$.",
      steps: [
        "Observăm că $4^x=(2^x)^2$, deci notăm $t=2^x$, $t>0$.",
        "Ecuația devine $t^2-5t+4=0$.",
        "Rezolvăm: $\\Delta=25-16=9$, $t_{1,2}=\\dfrac{5\\pm3}{2}$, deci $t_1=4$ și $t_2=1$.",
        "Din $2^x=4=2^2$ obținem $x=2$; din $2^x=1=2^0$ obținem $x=0$.",
      ],
    },
    {
      statement: "Rezolvați ecuația $\\log_3(x+2)=2$.",
      steps: [
        "Punem condiția de existență: $x+2>0 \\Rightarrow x>-2$.",
        "Scriem ecuația echivalentă: $x+2=3^2$.",
        "Rezolvăm: $x+2=9 \\Rightarrow x=7$, care verifică $x>-2$.",
      ],
    },
    {
      statement: "Determinați dacă funcția $f:\\mathbb{R}\\to(0,+\\infty)$, $f(x)=3^x$, este bijectivă.",
      steps: [
        "Funcția exponențială $f(x)=3^x$ este strict crescătoare pe $\\mathbb{R}$ (deoarece $3>1$), deci este injectivă.",
        "Funcția este surjectivă pe $(0,+\\infty)$, deoarece pentru orice $y>0$ există $x=\\log_3 y$ astfel încât $f(x)=y$.",
        "Fiind injectivă și surjectivă, funcția $f$ este bijectivă.",
      ],
    },
  ],
};
