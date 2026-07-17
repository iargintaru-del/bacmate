import { Link, useParams } from "react-router-dom";
import type { Topic } from "../types";
import { TOPIC_LABELS, setNumbersForTopic } from "../data";

export function SetPicker() {
  const { topic } = useParams<{ topic: Topic }>();
  const sets = topic ? setNumbersForTopic(topic) : [];

  if (!topic || sets.length === 0) {
    return (
      <div className="page">
        <p>Acest capitol nu are seturi de exerciții.</p>
        <Link to="/">Înapoi acasă</Link>
      </div>
    );
  }

  return (
    <div className="page page--sets">
      <h1>{TOPIC_LABELS[topic]} — Seturi de exerciții</h1>
      <p className="page__intro">Alege un set de 10 întrebări.</p>
      <div className="set-grid">
        {sets.map((setNumber) => (
          <Link key={setNumber} to={`/quiz/${topic}/set/${setNumber}`} className="set-card">
            Setul {setNumber}
          </Link>
        ))}
      </div>
      <Link to="/">Înapoi acasă</Link>
    </div>
  );
}
