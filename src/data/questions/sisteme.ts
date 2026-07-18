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
    explanation: [
      "Adunăm cele două ecuații pentru a elimina $y$: $(x+y)+(x-y)=5+1$.",
      "Simplificăm: $2x=6$.",
      "Împărțim la $2$: $x=3$.",
    ],
  },
  {
    id: "sy-2",
    topic: "sisteme",
    type: "mcq",
    points: 6,
    prompt: "Sistemul $$\\begin{cases} x + y = 3 \\\\ 2x + 2y = 6 \\end{cases}$$ are:",
    options: ["o infinitate de soluții", "soluție unică", "nicio soluție", "exact două soluții"],
    correctAnswer: "o infinitate de soluții",
    explanation: [
      "Observăm că a doua ecuație este exact prima ecuație înmulțită cu $2$: $2(x+y)=2\\cdot3=6$.",
      "Cele două ecuații reprezintă aceeași dreaptă, deci au aceleași soluții.",
      "Sistemul este compatibil nedeterminat, adică are o infinitate de soluții.",
    ],
  },
  {
    id: "sy-3",
    topic: "sisteme",
    type: "input",
    points: 6,
    prompt: "Pentru sistemul $$\\begin{cases} x + 2y = 4 \\\\ 3x - y = 5 \\end{cases}$$ determinați valoarea lui $y$.",
    correctAnswer: "1",
    explanation: [
      "Din prima ecuație exprimăm $x$ în funcție de $y$: $x=4-2y$.",
      "Înlocuim în a doua ecuație: $3(4-2y)-y=5$.",
      "Desfacem paranteza: $12-6y-y=5 \\Rightarrow 12-7y=5$.",
      "Rezolvăm: $-7y=-7 \\Rightarrow y=1$.",
    ],
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
    explanation: [
      "Grafic, fiecare ecuație liniară cu 2 necunoscute reprezintă o dreaptă.",
      "Sistemul nu are soluții exact atunci când cele două drepte nu se intersectează, adică sunt paralele și distincte.",
      "În acest caz nu există niciun punct comun celor două drepte.",
    ],
  },
];
