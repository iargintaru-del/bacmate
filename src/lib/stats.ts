import type { Attempt } from "./storage";
import type { Topic } from "../types";

export interface TopicStats {
  topic: Topic;
  total: number;
  correct: number;
  accuracy: number;
}

export interface OverallStats {
  total: number;
  correct: number;
  accuracy: number;
  byTopic: TopicStats[];
}

export interface SetScore {
  correct: number;
  attempted: number;
}

export function computeSetScore(attempts: Attempt[], itemIds: string[]): SetScore {
  let correct = 0;
  let attempted = 0;

  for (const itemId of itemIds) {
    const itemAttempts = attempts.filter((a) => a.itemId === itemId);
    if (itemAttempts.length === 0) continue;
    attempted += 1;
    const latest = itemAttempts.reduce((a, b) => (a.timestamp > b.timestamp ? a : b));
    if (latest.correct) correct += 1;
  }

  return { correct, attempted };
}

export function computeStats(attempts: Attempt[], topics: Topic[]): OverallStats {
  const total = attempts.length;
  const correct = attempts.filter((a) => a.correct).length;

  const byTopic: TopicStats[] = topics.map((topic) => {
    const topicAttempts = attempts.filter((a) => a.topic === topic);
    const topicCorrect = topicAttempts.filter((a) => a.correct).length;
    return {
      topic,
      total: topicAttempts.length,
      correct: topicCorrect,
      accuracy: topicAttempts.length === 0 ? 0 : topicCorrect / topicAttempts.length,
    };
  });

  return {
    total,
    correct,
    accuracy: total === 0 ? 0 : correct / total,
    byTopic,
  };
}
