import { Link, useParams } from "react-router-dom";
import type { Topic } from "../types";
import { TOPIC_LABELS, setNumbersForTopic, exercisesForSet } from "../data";
import { getAttempts } from "../lib/storage";
import { computeSetScore } from "../lib/stats";

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

  const attempts = getAttempts();

  return (
    <div className="page page--sets">
      <h1>{TOPIC_LABELS[topic]} — Seturi de exerciții</h1>
      <p className="page__intro">Alege un set de 10 întrebări.</p>
      <div className="set-grid">
        {sets.map((setNumber) => {
          const itemIds = exercisesForSet(topic, setNumber).map((exercise) => exercise.id);
          const { correct, attempted } = computeSetScore(attempts, itemIds);
          const scoreClass = attempted === 0 ? "" : correct >= 5 ? " set-card--strong" : " set-card--weak";
          return (
            <Link key={setNumber} to={`/quiz/${topic}/set/${setNumber}`} className={`set-card${scoreClass}`}>
              <span className="set-card__title">Setul {setNumber}</span>
              {attempted > 0 && <span className="set-card__score">{correct}/{itemIds.length}</span>}
            </Link>
          );
        })}
      </div>
      <Link to="/">Înapoi acasă</Link>
    </div>
  );
}
