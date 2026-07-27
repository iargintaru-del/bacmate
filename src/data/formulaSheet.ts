// Source of truth for public/formule-bacalaureat.{pdf,docx}.
// After editing, run `npm run generate:formulas` and commit both regenerated files.
import type { Topic } from "../types";
import { TOPIC_LABELS } from "./index";

export interface FormulaEntry {
  label: string;
  latex: string;
  plain: string;
}

export interface FormulaChapter {
  topic: Topic;
  title: string;
  formulas: FormulaEntry[];
}

function chapter(topic: Topic, formulas: FormulaEntry[]): FormulaChapter {
  return { topic, title: TOPIC_LABELS[topic], formulas };
}

export const FORMULA_SHEET: FormulaChapter[] = [
  chapter("numere-complexe", [
    {
      label: "Forma algebrică",
      latex: "z = a + bi,\\ a,b \\in \\mathbb{R},\\ i^2=-1",
      plain: "z = a + bi,  a, b ∈ ℝ,  i² = −1",
    },
    {
      label: "Adunarea / scăderea",
      latex: "(a+bi) \\pm (c+di) = (a \\pm c) + (b \\pm d)i",
      plain: "(a+bi) ± (c+di) = (a±c) + (b±d)i",
    },
    {
      label: "Înmulțirea",
      latex: "(a+bi)(c+di) = (ac-bd) + (ad+bc)i",
      plain: "(a+bi)(c+di) = (ac−bd) + (ad+bc)i",
    },
    {
      label: "Modulul",
      latex: "|z| = \\sqrt{a^2+b^2}",
      plain: "|z| = √(a² + b²)",
    },
    {
      label: "Puterile lui i",
      latex: "i^1=i,\\ i^2=-1,\\ i^3=-i,\\ i^4=1",
      plain: "i¹ = i,  i² = −1,  i³ = −i,  i⁴ = 1",
    },
    {
      label: "Ecuație de gradul 2 (Δ < 0)",
      latex: "x_{1,2} = \\dfrac{-b \\pm i\\sqrt{-\\Delta}}{2a}",
      plain: "x1,2 = (−b ± i√(−Δ)) / 2a",
    },
  ]),
  chapter("combinatorica", [
    {
      label: "Permutări",
      latex: "P_n = n!",
      plain: "Pn = n!",
    },
    {
      label: "Aranjamente",
      latex: "A_n^k = \\dfrac{n!}{(n-k)!}",
      plain: "A(n,k) = n! / (n−k)!",
    },
    {
      label: "Combinări",
      latex: "C_n^k = \\dfrac{n!}{k!(n-k)!}",
      plain: "C(n,k) = n! / (k!·(n−k)!)",
    },
    {
      label: "Binomul lui Newton",
      latex: "(x+y)^n = \\sum_{k=0}^{n} C_n^k x^{n-k} y^k",
      plain: "(x+y)ⁿ = Σ C(n,k)·x^(n−k)·yᵏ,  k = 0..n",
    },
    {
      label: "Probabilitate clasică",
      latex: "P=\\dfrac{\\text{numărul cazurilor favorabile}}{\\text{numărul cazurilor posibile}}",
      plain: "P = (cazuri favorabile) / (cazuri posibile)",
    },
  ]),
  chapter("matrice", [
    {
      label: "Produsul a două matrice",
      latex: "(AB)_{ij} = \\sum_k A_{ik}B_{kj}",
      plain: "(A·B)ij = Σk Aik·Bkj",
    },
    {
      label: "Matricea identitate",
      latex: "A \\cdot I_n = I_n \\cdot A = A",
      plain: "A·In = In·A = A",
    },
    {
      label: "Transpusa",
      latex: "(A^T)_{ij} = A_{ji}",
      plain: "(Aᵀ)ij = Aji",
    },
  ]),
  chapter("determinanti", [
    {
      label: "Determinant de ordinul 2",
      latex: "\\det(A) = ad-bc",
      plain: "det(A) = ad − bc",
    },
    {
      label: "Determinant și scalar",
      latex: "\\det(kA) = k^n \\det(A)",
      plain: "det(k·A) = kⁿ · det(A)",
    },
    {
      label: "Determinantul produsului",
      latex: "\\det(A \\cdot B) = \\det(A) \\cdot \\det(B)",
      plain: "det(A·B) = det(A) · det(B)",
    },
    {
      label: "Condiția de inversabilitate",
      latex: "A \\text{ inversabilă} \\iff \\det(A) \\neq 0",
      plain: "A inversabilă  ⇔  det(A) ≠ 0",
    },
  ]),
  chapter("sisteme", [
    {
      label: "Sistem liniar 2×2",
      latex: "\\begin{cases}a_1x+b_1y=c_1\\\\a_2x+b_2y=c_2\\end{cases}",
      plain: "{ a1x + b1y = c1 ;  a2x + b2y = c2 }",
    },
    {
      label: "Determinantul sistemului",
      latex: "\\Delta = \\begin{vmatrix}a_1&b_1\\\\a_2&b_2\\end{vmatrix}",
      plain: "Δ = |a1 b1; a2 b2|",
    },
    {
      label: "Regula lui Cramer",
      latex: "x = \\dfrac{\\Delta_x}{\\Delta},\\ y = \\dfrac{\\Delta_y}{\\Delta}",
      plain: "x = Δx / Δ,  y = Δy / Δ",
    },
    {
      label: "Compatibilitate determinată",
      latex: "\\Delta \\neq 0 \\Rightarrow \\text{sistem compatibil determinat}",
      plain: "Δ ≠ 0  ⇒  sistem compatibil determinat",
    },
  ]),
  chapter("limite", [
    {
      label: "Limita fundamentală (sin x / x)",
      latex: "\\lim_{x\\to 0}\\dfrac{\\sin x}{x}=1",
      plain: "lim(x→0) sinx / x = 1",
    },
    {
      label: "Limita fundamentală (numărul e)",
      latex: "\\lim_{x\\to\\infty}\\left(1+\\dfrac{1}{x}\\right)^x = e",
      plain: "lim(x→∞) (1 + 1/x)ˣ = e",
    },
  ]),
  chapter("derivate", [
    {
      label: "Derivata puterii",
      latex: "(x^n)' = nx^{n-1}",
      plain: "(xⁿ)' = n · xⁿ⁻¹",
    },
    {
      label: "Derivate trigonometrice",
      latex: "(\\sin x)' = \\cos x,\\ (\\cos x)' = -\\sin x",
      plain: "(sin x)' = cos x,  (cos x)' = −sin x",
    },
    {
      label: "Derivate exponențială și logaritmică",
      latex: "(e^x)' = e^x,\\ (\\ln x)' = \\dfrac{1}{x}",
      plain: "(eˣ)' = eˣ,  (ln x)' = 1/x",
    },
    {
      label: "Derivata produsului",
      latex: "(u \\cdot v)' = u'v + uv'",
      plain: "(u · v)' = u'v + uv'",
    },
    {
      label: "Derivata câtului",
      latex: "\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v-uv'}{v^2}",
      plain: "(u / v)' = (u'v − uv') / v²",
    },
  ]),
  chapter("integrale", [
    {
      label: "Primitiva puterii",
      latex: "\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1}+C",
      plain: "∫xⁿ dx = xⁿ⁺¹ / (n+1) + C",
    },
    {
      label: "Primitiva lui 1/x",
      latex: "\\int \\dfrac{1}{x}\\,dx = \\ln|x|+C",
      plain: "∫(1/x) dx = ln|x| + C",
    },
    {
      label: "Primitiva exponențială",
      latex: "\\int e^x\\,dx = e^x+C",
      plain: "∫eˣ dx = eˣ + C",
    },
    {
      label: "Primitive trigonometrice",
      latex: "\\int \\sin x\\,dx = -\\cos x + C,\\ \\int \\cos x\\,dx = \\sin x + C",
      plain: "∫sinx dx = −cosx + C,  ∫cosx dx = sinx + C",
    },
    {
      label: "Formula Leibniz–Newton",
      latex: "\\int_a^b f(x)\\,dx = F(b)-F(a)",
      plain: "∫[a,b] f(x) dx = F(b) − F(a)",
    },
  ]),
  chapter("geometrie", [
    {
      label: "Distanța dintre două puncte",
      latex: "AB=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}",
      plain: "AB = √((x2−x1)² + (y2−y1)²)",
    },
    {
      label: "Mijlocul unui segment",
      latex: "M\\left(\\dfrac{x_1+x_2}{2},\\dfrac{y_1+y_2}{2}\\right)",
      plain: "M((x1+x2)/2, (y1+y2)/2)",
    },
    {
      label: "Panta unei drepte",
      latex: "m=\\dfrac{y_2-y_1}{x_2-x_1}",
      plain: "m = (y2−y1) / (x2−x1)",
    },
    {
      label: "Teorema lui Pitagora",
      latex: "BC^2=AB^2+AC^2",
      plain: "BC² = AB² + AC²",
    },
    {
      label: "Teorema sinusurilor",
      latex: "\\dfrac{a}{\\sin A}=\\dfrac{b}{\\sin B}=\\dfrac{c}{\\sin C}=2R",
      plain: "a/sinA = b/sinB = c/sinC = 2R",
    },
    {
      label: "Teorema cosinusului",
      latex: "a^2=b^2+c^2-2bc\\cos A",
      plain: "a² = b² + c² − 2bc·cosA",
    },
  ]),
  chapter("legi-compozitie", [
    {
      label: "Comutativitate",
      latex: "x\\circ y=y\\circ x",
      plain: "x∘y = y∘x",
    },
    {
      label: "Asociativitate",
      latex: "(x\\circ y)\\circ z=x\\circ(y\\circ z)",
      plain: "(x∘y)∘z = x∘(y∘z)",
    },
    {
      label: "Element neutru",
      latex: "x\\circ e=e\\circ x=x",
      plain: "x∘e = e∘x = x",
    },
    {
      label: "Element simetrizabil",
      latex: "x\\circ x'=x'\\circ x=e",
      plain: "x∘x' = x'∘x = e",
    },
  ]),
  chapter("multimi-logica", [
    {
      label: "Reuniunea mulțimilor",
      latex: "A\\cup B=\\{x \\mid x\\in A \\text{ sau } x\\in B\\}",
      plain: "A ∪ B = {x | x ∈ A or x ∈ B}",
    },
    {
      label: "Intersecția mulțimilor",
      latex: "A\\cap B=\\{x \\mid x\\in A \\text{ și } x\\in B\\}",
      plain: "A ∩ B = {x | x ∈ A and x ∈ B}",
    },
    {
      label: "Diferența mulțimilor",
      latex: "A\\setminus B=\\{x \\mid x\\in A \\text{ și } x\\notin B\\}",
      plain: "A \\ B = {x | x ∈ A and x ∉ B}",
    },
    {
      label: "Complementara",
      latex: "C_EA=E\\setminus A",
      plain: "C_E(A) = E \\ A",
    },
  ]),
  chapter("functia-gradul-1", [
    {
      label: "Funcția de gradul I",
      latex: "f(x)=ax+b,\\ a,b\\in\\mathbb{R},\\ a\\neq0",
      plain: "f(x) = ax + b,  a, b ∈ ℝ,  a ≠ 0",
    },
    {
      label: "Intersecția cu axele de coordonate",
      latex: "f(0)=b,\\ f(x)=0 \\Rightarrow x=-\\dfrac{b}{a}",
      plain: "f(0) = b;  f(x) = 0  ⇒  x = −b/a",
    },
    {
      label: "Monotonia funcției de gradul I",
      latex: "a>0 \\Rightarrow \\text{strict crescătoare};\\ a<0 \\Rightarrow \\text{strict descrescătoare}",
      plain: "a > 0  ⇒  strict crescătoare;   a < 0  ⇒  strict descrescătoare",
    },
  ]),
  chapter("functia-gradul-2", [
    {
      label: "Funcția de gradul al II-lea",
      latex: "f(x)=ax^2+bx+c,\\ a,b,c\\in\\mathbb{R},\\ a\\neq0",
      plain: "f(x) = ax² + bx + c,  a, b, c ∈ ℝ,  a ≠ 0",
    },
    {
      label: "Vârful parabolei",
      latex: "V\\left(-\\dfrac{b}{2a},-\\dfrac{\\Delta}{4a}\\right),\\ \\Delta=b^2-4ac",
      plain: "V(−b/2a, −Δ/4a),  Δ = b² − 4ac",
    },
    {
      label: "Relațiile lui Viète",
      latex: "x_1+x_2=-\\dfrac{b}{a},\\ x_1\\cdot x_2=\\dfrac{c}{a}",
      plain: "x1 + x2 = −b/a,  x1 · x2 = c/a",
    },
  ]),
  chapter("siruri", [
    {
      label: "Progresia aritmetică — termenul general",
      latex: "a_n=a_1+(n-1)r",
      plain: "an = a1 + (n−1)·r",
    },
    {
      label: "Suma primilor n termeni (progresie aritmetică)",
      latex: "S_n=\\dfrac{(a_1+a_n)\\cdot n}{2}",
      plain: "Sn = (a1 + an) · n / 2",
    },
    {
      label: "Progresia geometrică — termenul general",
      latex: "b_n=b_1\\cdot q^{n-1}",
      plain: "bn = b1 · q^(n−1)",
    },
    {
      label: "Suma primilor n termeni (progresie geometrică, q≠1)",
      latex: "S_n=b_1\\cdot\\dfrac{q^n-1}{q-1}",
      plain: "Sn = b1 · (qⁿ − 1) / (q − 1)",
    },
  ]),
];
