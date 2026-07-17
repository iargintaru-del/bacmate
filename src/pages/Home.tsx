import { Link } from "react-router-dom";
import { useMemo } from "react";
import { TOPICS, TOPIC_LABELS, setNumbersForTopic } from "../data";
import { getAttempts } from "../lib/storage";
import { computeStats } from "../lib/stats";
import { TopicCard } from "../components/TopicCard";

export function Home() {
  const stats = useMemo(() => computeStats(getAttempts(), TOPICS), []);

  return (
    <div className="page page--home">
      <h1>BacMate — Pregătire Bacalaureat M2</h1>
      <p className="page__intro">Alege un capitol pentru exersare, sau susține un examen simulat complet.</p>

      {stats.total > 0 && (
        <p className="page__summary">
          Progres general: {Math.round(stats.accuracy * 100)}% corect din {stats.total} întrebări.{" "}
          <Link to="/stats">Vezi statistici detaliate</Link>
        </p>
      )}

      <div className="topic-grid">
        {TOPICS.map((topic) => {
          const topicStats = stats.byTopic.find((t) => t.topic === topic)!;
          return (
            <TopicCard
              key={topic}
              topic={topic}
              label={TOPIC_LABELS[topic]}
              accuracy={topicStats.accuracy}
              attempted={topicStats.total}
              hasSets={setNumbersForTopic(topic).length > 0}
            />
          );
        })}
      </div>

      <Link to="/exam" className="exam-cta">
        Susține un examen simulat (Subiectul I, II, III)
      </Link>
    </div>
  );
}
