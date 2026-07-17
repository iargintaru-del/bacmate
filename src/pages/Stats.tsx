import { Link } from "react-router-dom";
import { useMemo } from "react";
import { TOPICS, TOPIC_LABELS } from "../data";
import { getAttempts } from "../lib/storage";
import { computeStats } from "../lib/stats";

export function Stats() {
  const stats = useMemo(() => computeStats(getAttempts(), TOPICS), []);

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
      <Link to="/">Înapoi acasă</Link>
    </div>
  );
}
