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
