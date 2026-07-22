import { Link } from "react-router-dom";
import type { Topic } from "../types";
import { ProgressRing } from "./ProgressRing";

interface TopicCardProps {
  topic: Topic;
  label: string;
  accuracy: number;
  attempted: number;
  hasSets?: boolean;
}

export function TopicCard({ topic, label, accuracy, attempted, hasSets }: TopicCardProps) {
  return (
    <div className="chapter-row">
      <div className="chapter-row__title">{label}</div>
      <ProgressRing accuracy={accuracy} attempted={attempted} />
      <div className="chapter-row__actions">
        <Link to={`/theory/${topic}`} className="chapter-row__action">
          Teorie
        </Link>
        <Link to={`/quiz/${topic}`} className="chapter-row__action">
          Exersează
        </Link>
        {hasSets && (
          <Link to={`/quiz/${topic}/sets`} className="chapter-row__action">
            Seturi de exerciții
          </Link>
        )}
      </div>
    </div>
  );
}
