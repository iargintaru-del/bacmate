import { Link } from "react-router-dom";
import type { Topic } from "../types";

interface TopicCardProps {
  topic: Topic;
  label: string;
  accuracy: number;
  attempted: number;
}

export function TopicCard({ topic, label, accuracy, attempted }: TopicCardProps) {
  return (
    <Link to={`/quiz/${topic}`} className="topic-card">
      <div className="topic-card__title">{label}</div>
      <div className="topic-card__stats">
        {attempted === 0 ? "Neîncercat încă" : `${Math.round(accuracy * 100)}% corect (${attempted} întrebări)`}
      </div>
    </Link>
  );
}
