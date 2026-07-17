import type { Exercise } from "../../types";

export const sistemeExercises: Exercise[] = [
  {
    id: "sy-1",
    topic: "sisteme",
    type: "input",
    points: 6,
    prompt:
      "Rezolvați sistemul $$\\begin{cases} x + y = 5 \\\\ x - y = 1 \\end{cases}$$ și determinați valoarea lui $x$.",
    correctAnswer: "3",
    explanation: "Adunând cele două ecuații: $2x = 6 \\Rightarrow x = 3$.",
  },
  {
    id: "sy-2",
    topic: "sisteme",
    type: "mcq",
    points: 6,
    prompt: "Sistemul $$\\begin{cases} x + y = 3 \\\\ 2x + 2y = 6 \\end{cases}$$ are:",
    options: ["o infinitate de soluții", "soluție unică", "nicio soluție", "exact două soluții"],
    correctAnswer: "o infinitate de soluții",
    explanation:
      "A doua ecuație este de $2$ ori prima, deci cele două drepte coincid și sistemul este compatibil nedeterminat.",
  },
  {
    id: "sy-3",
    topic: "sisteme",
    type: "input",
    points: 6,
    prompt: "Pentru sistemul $$\\begin{cases} x + 2y = 4 \\\\ 3x - y = 5 \\end{cases}$$ determinați valoarea lui $y$.",
    correctAnswer: "1",
    explanation:
      "Din prima ecuație $x = 4 - 2y$. Înlocuind în a doua: $3(4-2y) - y = 5 \\Rightarrow 12 - 7y = 5 \\Rightarrow y = 1$.",
  },
  {
    id: "sy-4",
    topic: "sisteme",
    type: "mcq",
    points: 6,
    prompt: "Un sistem liniar de 2 ecuații cu 2 necunoscute este incompatibil (fără soluții) atunci când:",
    options: [
      "dreptele reprezentate sunt paralele și distincte",
      "dreptele reprezentate sunt confundate",
      "dreptele se intersectează într-un punct",
      "coeficienții necunoscutelor sunt toți nuli",
    ],
    correctAnswer: "dreptele reprezentate sunt paralele și distincte",
    explanation: "Două drepte paralele și distincte nu au niciun punct comun, deci sistemul nu are soluție.",
  },
];
