import { useMemo, useState } from "react";
import type { GradableItem } from "../types";
import { isCorrectAnswer } from "../lib/grading";
import { MathText } from "./MathText";

function hashString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

// Deterministic per-question shuffle (xorshift32 seeded by the question id) so the
// correct option isn't always in the same position, but a given question's option
// order stays stable across renders/sessions instead of jumping around.
function shuffleOptions<T>(items: T[], seed: number): T[] {
  const result = [...items];
  let state = seed || 1;
  const next = () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    return state / 4294967296;
  };
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

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

  const displayedOptions = useMemo(() => {
    if (!item.options) return undefined;
    return shuffleOptions(item.options, hashString(item.id));
  }, [item.id, item.options]);

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
          {displayedOptions?.map((option) => {
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
            <button
              type="button"
              className="question-card__submit"
              onClick={() => submitPractice(practiceValue)}
              disabled={isLocked}
            >
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
          <strong>Explicație:</strong>
          <ol className="question-card__explanation-steps">
            {item.explanation.map((step, stepIndex) => (
              <li key={stepIndex}>
                <MathText text={step} />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
