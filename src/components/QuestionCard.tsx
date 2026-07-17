import { useState } from "react";
import type { GradableItem } from "../types";
import { isCorrectAnswer } from "../lib/grading";
import { MathText } from "./MathText";

interface QuestionCardProps {
  item: GradableItem;
  label?: string;
  mode: "practice" | "collect" | "review";
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string, correct: boolean) => void;
  reviewResult?: { correct: boolean; earned: number; possible: number };
}

export function QuestionCard({ item, label, mode, value, onChange, onSubmit, reviewResult }: QuestionCardProps) {
  const [practiceValue, setPracticeValue] = useState("");
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);
  const [practiceCorrect, setPracticeCorrect] = useState(false);

  const currentValue = mode === "practice" ? practiceValue : value ?? "";
  const isLocked = mode === "review" || (mode === "practice" && practiceSubmitted);

  const submitPractice = (answer: string) => {
    if (isLocked) return;
    const correct = isCorrectAnswer(answer, item);
    setPracticeValue(answer);
    setPracticeCorrect(correct);
    setPracticeSubmitted(true);
    onSubmit?.(answer, correct);
  };

  const showExplanation = mode === "review" || practiceSubmitted;

  return (
    <div className="question-card">
      {label && <div className="question-card__label">{label})</div>}
      <div className="question-card__prompt">
        <MathText text={item.prompt} />
      </div>

      {item.type === "mcq" ? (
        <div className="question-card__options">
          {item.options?.map((option) => {
            const selected = currentValue === option;
            return (
              <button
                key={option}
                type="button"
                className={"question-card__option" + (selected ? " question-card__option--selected" : "")}
                disabled={isLocked}
                onClick={() => {
                  if (mode === "collect") {
                    onChange?.(option);
                  } else {
                    submitPractice(option);
                  }
                }}
              >
                <MathText text={option} />
              </button>
            );
          })}
        </div>
      ) : (
        <div className="question-card__input-row">
          <input
            type="text"
            value={currentValue}
            disabled={isLocked}
            onChange={(event) => {
              if (mode === "collect") {
                onChange?.(event.target.value);
              } else {
                setPracticeValue(event.target.value);
              }
            }}
          />
          {mode === "practice" && (
            <button type="button" onClick={() => submitPractice(practiceValue)} disabled={isLocked}>
              Verifică
            </button>
          )}
        </div>
      )}

      {mode === "practice" && practiceSubmitted && (
        <div
          className={practiceCorrect ? "question-card__feedback--correct" : "question-card__feedback--incorrect"}
        >
          {practiceCorrect ? "Corect!" : "Greșit."}
        </div>
      )}

      {mode === "review" && reviewResult && (
        <div
          className={reviewResult.correct ? "question-card__feedback--correct" : "question-card__feedback--incorrect"}
        >
          {reviewResult.correct ? "Corect" : "Greșit"} ({reviewResult.earned}/{reviewResult.possible} puncte)
        </div>
      )}

      {showExplanation && (
        <div className="question-card__explanation">
          <strong>Explicație:</strong> <MathText text={item.explanation} />
        </div>
      )}
    </div>
  );
}
