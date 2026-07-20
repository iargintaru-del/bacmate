import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Topic } from "../types";
import { TOPIC_LABELS, exercisesByTopic, exercisesForSet } from "../data";
import { logAttempt } from "../lib/storage";
import { QuestionCard } from "../components/QuestionCard";

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export function TopicQuiz() {
  const { topic, setNumber } = useParams<{ topic: Topic; setNumber?: string }>();
  const isSetMode = setNumber !== undefined;
  const exercises = useMemo(() => {
    if (!topic) return [];
    if (isSetMode) return exercisesForSet(topic, Number(setNumber));
    return shuffle(exercisesByTopic(topic));
  }, [topic, setNumber, isSetMode]);
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentAnswered, setCurrentAnswered] = useState(false);

  if (!topic || exercises.length === 0) {
    return (
      <div className="page">
        <p>Capitol necunoscut.</p>
        <Link to="/">Înapoi acasă</Link>
      </div>
    );
  }

  const heading = isSetMode ? `${TOPIC_LABELS[topic]} — Setul ${setNumber}` : TOPIC_LABELS[topic];

  if (index >= exercises.length) {
    return (
      <div className="page page--quiz">
        <h1>{heading}</h1>
        <p>
          Ai terminat! Scor: {correctCount}/{exercises.length}.
        </p>
        {isSetMode && (
          <p>
            <Link to={`/quiz/${topic}/sets`}>Alege alt set</Link>
          </p>
        )}
        <Link to="/">Înapoi acasă</Link>
      </div>
    );
  }

  const current = exercises[index];

  const handleSubmit = (_value: string, correct: boolean) => {
    logAttempt({ itemId: current.id, topic, correct, timestamp: Date.now() });
    if (correct) setCorrectCount((c) => c + 1);
    setCurrentAnswered(true);
  };

  const handleNext = () => {
    setCurrentAnswered(false);
    setIndex((i) => i + 1);
  };

  return (
    <div className="page page--quiz">
      <h1>{heading}</h1>
      <p className="page__progress">
        Întrebarea {index + 1} din {exercises.length}
      </p>
      <p>
        <Link to="/">Înapoi acasă</Link>
      </p>
      <QuestionCard key={current.id} item={current} mode="practice" onSubmit={handleSubmit} />
      {currentAnswered && (
        <button type="button" onClick={handleNext}>
          {index + 1 < exercises.length ? "Următoarea întrebare" : "Vezi rezultatul"}
        </button>
      )}
    </div>
  );
}
