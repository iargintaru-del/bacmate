import { Link } from "react-router-dom";
import { EXAM_VARIANTS } from "../data";

export function VariantPicker() {
  return (
    <div className="page page--variants">
      <h1>Variante de examen — Bacalaureat M2</h1>
      <p className="page__intro">
        Alege o variantă. Fiecare variantă are un set fix de subiecte, la fel ca variantele oficiale — poți reveni
        oricând la aceeași variantă și vei primi aceleași subiecte.
      </p>
      <div className="variant-grid">
        {EXAM_VARIANTS.map((variant) => (
          <Link key={variant.number} to={`/exam/variant/${variant.number}`} className="variant-card">
            Varianta {variant.number}
          </Link>
        ))}
      </div>
      <Link to="/">Înapoi acasă</Link>
    </div>
  );
}
