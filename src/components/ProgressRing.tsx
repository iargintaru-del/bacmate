interface ProgressRingProps {
  accuracy: number;
  attempted: number;
}

const SIZE = 40;
const STROKE = 4;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CENTER = SIZE / 2;

export function ProgressRing({ accuracy, attempted }: ProgressRingProps) {
  if (attempted === 0) {
    return (
      <svg
        className="progress-ring"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label="Netestat"
      >
        <circle
          className="progress-ring__track progress-ring__track--empty"
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          strokeWidth={STROKE}
        />
      </svg>
    );
  }

  const percent = Math.round(accuracy * 100);
  const offset = CIRCUMFERENCE * (1 - accuracy);
  const arcClass =
    accuracy < 0.5
      ? "progress-ring__arc--weak"
      : accuracy >= 0.8
        ? "progress-ring__arc--strong"
        : "progress-ring__arc--mid";

  return (
    <svg
      className="progress-ring"
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label={`${percent}% corect`}
    >
      <circle className="progress-ring__track" cx={CENTER} cy={CENTER} r={RADIUS} strokeWidth={STROKE} />
      <circle
        className={`progress-ring__arc ${arcClass}`}
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        strokeWidth={STROKE}
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${CENTER} ${CENTER})`}
      />
      <text className="progress-ring__label" x={CENTER} y={CENTER} textAnchor="middle" dominantBaseline="central">
        {percent}
      </text>
    </svg>
  );
}
