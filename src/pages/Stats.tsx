import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { TOPICS, TOPIC_LABELS } from "../data";
import { getAttempts, clearAttempts } from "../lib/storage";
import { computeStats } from "../lib/stats";

export function Stats() {
  const [attempts, setAttempts] = useState(() => getAttempts());
  const stats = useMemo(() => computeStats(attempts, TOPICS), [attempts]);

  const handleReset = () => {
    const confirmed = window.confirm(
      "Ești sigur că vrei să ștergi tot progresul salvat? Această acțiune nu poate fi anulată."
    );
    if (!confirmed) return;
    clearAttempts();
    setAttempts([]);
  };

  return (
    <div className="page page--stats">
      <h1>Statistici</h1>
      {stats.total === 0 ? (
        <p>Nu ai răspuns încă la nicio întrebare.</p>
      ) : (
        <>
          <p>
            Total: {stats.correct}/{stats.total} răspunsuri corecte ({Math.round(stats.accuracy * 100)}%).
          </p>
          <ul className="stats-list">
            {stats.byTopic.map((topicStats) => (
              <li key={topicStats.topic} className="stats-list__item">
                <span>{TOPIC_LABELS[topicStats.topic]}</span>
                <div className="stats-bar">
                  <div
                    className="stats-bar__fill"
                    style={{ width: `${topicStats.total === 0 ? 0 : Math.round(topicStats.accuracy * 100)}%` }}
                  />
                </div>
                <span>
                  {topicStats.total === 0
                    ? "—"
                    : `${Math.round(topicStats.accuracy * 100)}% (${topicStats.correct}/${topicStats.total})`}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
      {stats.total > 0 && (
        <button type="button" className="stats-reset" onClick={handleReset}>
          Resetează statisticile
        </button>
      )}
      <Link to="/">Înapoi acasă</Link>
    </div>
  );
}
