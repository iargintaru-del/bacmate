import { Link, useParams } from "react-router-dom";
import type { Topic } from "../types";
import { TOPIC_LABELS } from "../data";
import { theoryForTopic } from "../data/theory";
import { MathText } from "../components/MathText";

export function Theory() {
  const { topic } = useParams<{ topic: Topic }>();
  const section = topic ? theoryForTopic(topic) : undefined;

  if (!topic || !section) {
    return (
      <div className="page">
        <p>Capitol necunoscut.</p>
        <Link to="/">Înapoi acasă</Link>
      </div>
    );
  }

  return (
    <div className="page page--theory">
      <h1>{TOPIC_LABELS[topic]} — Teorie</h1>

      {section.concepts.map((concept) => (
        <div className="theory-page__concept" key={concept.heading}>
          <div className="theory-page__concept-heading"><MathText text={concept.heading} /></div>
          {concept.body.map((paragraph, index) => (
            <p key={index}>
              <MathText text={paragraph} />
            </p>
          ))}
        </div>
      ))}

      <h2>Exemple rezolvate</h2>
      {section.examples.map((example, index) => (
        <div className="theory-page__example" key={index}>
          <div className="theory-page__example-statement">
            <MathText text={example.statement} />
          </div>
          <ol>
            {example.steps.map((step, stepIndex) => (
              <li key={stepIndex}>
                <MathText text={step} />
              </li>
            ))}
          </ol>
        </div>
      ))}

      <p>
        <Link to={`/quiz/${topic}`}>Exersează acest capitol</Link>
      </p>
      <p>
        <Link to="/">Înapoi acasă</Link>
      </p>
    </div>
  );
}
