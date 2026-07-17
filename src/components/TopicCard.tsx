import { Link } from "react-router-dom";
import type { Topic } from "../types";

interface TopicCardProps {
  topic: Topic;
  label: string;
  accuracy: number;
  attempted: number;
  hasSets?: boolean;
}

export function TopicCard({ topic, label, accuracy, attempted, hasSets }: TopicCardProps) {
  return (
    <div className="topic-card">
      <Link to={`/quiz/${topic}`} className="topic-card__link">
        <div className="topic-card__title">{label}</div>
        <div className="topic-card__stats">
          {attempted === 0 ? "Neîncercat încă" : `${Math.round(accuracy * 100)}% corect (${attempted} întrebări)`}
        </div>
      </Link>
      {hasSets && (
        <Link to={`/quiz/${topic}/sets`} className="topic-card__sets-link">
          Seturi de exerciții
        </Link>
      )}
    </div>
  );
}
