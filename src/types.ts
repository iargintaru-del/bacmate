// Adding a member here also requires a matching chapter in FORMULA_SHEET
// (src/data/formulaSheet.ts), enforced by formulaSheet.test.ts, plus
// running `npm run generate:formulas` to regenerate the downloadable
// public/formule-bacalaureat.{pdf,docx}.
export type Topic =
  | "numere-complexe"
  | "combinatorica"
  | "matrice"
  | "determinanti"
  | "sisteme"
  | "limite"
  | "derivate"
  | "integrale"
  | "geometrie"
  | "legi-compozitie"
  | "multimi-logica"
  | "functia-gradul-1"
  | "functia-gradul-2"
  | "siruri"
  | "puteri-radicali-logaritmi"
  | "functii-exponentiale-logaritmice"
  | "matematici-financiare";

export type AnswerType = "mcq" | "input";

export interface GradableItem {
  id: string;
  type: AnswerType;
  prompt: string;
  options?: string[];
  correctAnswer: string;
  acceptedAnswers?: string[];
  explanation: string[];
  points: number;
}

export interface Exercise extends GradableItem {
  topic: Topic;
  set?: number;
}

export interface Subpoint extends GradableItem {
  label: "a" | "b" | "c";
}

export interface Problem {
  id: string;
  topic: Topic;
  subject: "II" | "III";
  statement: string;
  subpoints: Subpoint[];
}

export interface ExamVariant {
  number: number;
  subiectIIds: [string, string, string, string, string];
  subiectIIIds: [string, string];
  subiectIIIIds: [string, string];
}

export interface TheoryConcept {
  heading: string;
  body: string[];
}

export interface TheoryExample {
  statement: string;
  steps: string[];
}

export interface TheorySection {
  topic: Topic;
  title: string;
  concepts: TheoryConcept[];
  examples: TheoryExample[];
}
