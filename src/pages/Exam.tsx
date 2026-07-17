import { useState } from "react";
import { Link } from "react-router-dom";
import type { Problem } from "../types";
import { ALL_EXERCISES, ALL_PROBLEMS } from "../data";
import { buildExam, gradeExam, type ExamResult, type ExamSession } from "../lib/examBuilder";
import { logAttempt } from "../lib/storage";
import { QuestionCard } from "../components/QuestionCard";
import { MathText } from "../components/MathText";

function findResult(result: ExamResult, itemId: string) {
  const all = [...result.subiectI, ...result.subiectII, ...result.subiectIII];
  return all.find((r) => r.itemId === itemId);
}

function ProblemBlock({
  problem,
  answers,
  onChange,
  result,
}: {
  problem: Problem;
  answers: Record<string, string>;
  onChange: (id: string, value: string) => void;
  result: ExamResult | null;
}) {
  return (
    <div className="problem-block">
      <div className="problem-block__statement">
        <MathText text={problem.statement} />
      </div>
      {problem.subpoints.map((subpoint) => (
        <QuestionCard
          key={subpoint.id}
          item={subpoint}
          label={subpoint.label}
          mode={result ? "review" : "collect"}
          value={answers[subpoint.id]}
          onChange={(value) => onChange(subpoint.id, value)}
          reviewResult={result ? findResult(result, subpoint.id) : undefined}
        />
      ))}
    </div>
  );
}

export function Exam() {
  const [session] = useState<ExamSession>(() => buildExam(ALL_EXERCISES, ALL_PROBLEMS));
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ExamResult | null>(null);

  const handleChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitExam = () => {
    const graded = gradeExam(session, answers);
    setResult(graded);

    const allProblems = [...session.subiectII, ...session.subiectIII];
    for (const itemResult of [...graded.subiectI, ...graded.subiectII, ...graded.subiectIII]) {
      const exercise = session.subiectI.find((e) => e.id === itemResult.itemId);
      const topic =
        exercise?.topic ?? allProblems.find((p) => p.subpoints.some((sp) => sp.id === itemResult.itemId))?.topic;
      if (topic) {
        logAttempt({ itemId: itemResult.itemId, topic, correct: itemResult.correct, timestamp: Date.now() });
      }
    }
  };

  return (
    <div className="page page--exam">
      <h1>Examen simulat — Bacalaureat M2</h1>

      <section>
        <h2>SUBIECTUL I ({result ? result.subtotalI : 30} puncte)</h2>
        {session.subiectI.map((exercise) => (
          <QuestionCard
            key={exercise.id}
            item={exercise}
            mode={result ? "review" : "collect"}
            value={answers[exercise.id]}
            onChange={(value) => handleChange(exercise.id, value)}
            reviewResult={result ? findResult(result, exercise.id) : undefined}
          />
        ))}
      </section>

      <section>
        <h2>SUBIECTUL II ({result ? result.subtotalII : 30} puncte)</h2>
        {session.subiectII.map((problem) => (
          <ProblemBlock key={problem.id} problem={problem} answers={answers} onChange={handleChange} result={result} />
        ))}
      </section>

      <section>
        <h2>SUBIECTUL III ({result ? result.subtotalIII : 30} puncte)</h2>
        {session.subiectIII.map((problem) => (
          <ProblemBlock key={problem.id} problem={problem} answers={answers} onChange={handleChange} result={result} />
        ))}
      </section>

      {!result ? (
        <button type="button" className="exam-submit" onClick={handleSubmitExam}>
          Predă lucrarea
        </button>
      ) : (
        <div className="exam-result">
          <p>
            Total: {result.total}/100 (din care {result.oficiu} puncte din oficiu). Nota:{" "}
            <strong>{result.nota.toFixed(2)}</strong>
          </p>
          <Link to="/">Înapoi acasă</Link>
        </div>
      )}
    </div>
  );
}
