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
      <div className="topic-card__title">{label}</div>
      {attempted > 0 && (
        <div className="topic-card__stats">
          {Math.round(accuracy * 100)}% corect ({attempted} întrebări)
        </div>
      )}
      <div className="topic-card__actions">
        <Link to={`/theory/${topic}`} className="topic-card__action">
          Teorie
        </Link>
        <Link to={`/quiz/${topic}`} className="topic-card__action">
          Exersează
        </Link>
        {hasSets && (
          <Link to={`/quiz/${topic}/sets`} className="topic-card__action">
            Seturi de exerciții
          </Link>
        )}
      </div>
    </div>
  );
}
