export type Topic =
  | "numere-complexe"
  | "combinatorica"
  | "matrice"
  | "determinanti"
  | "sisteme"
  | "limite"
  | "derivate"
  | "integrale";

export type AnswerType = "mcq" | "input";

export interface GradableItem {
  id: string;
  type: AnswerType;
  prompt: string;
  options?: string[];
  correctAnswer: string;
  acceptedAnswers?: string[];
  explanation: string | string[];
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
