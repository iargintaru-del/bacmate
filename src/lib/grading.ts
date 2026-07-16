export function normalizeAnswer(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, "");
}

export function isCorrectAnswer(
  userAnswer: string,
  item: { correctAnswer: string; acceptedAnswers?: string[] }
): boolean {
  const normalizedUser = normalizeAnswer(userAnswer);
  const candidates = [item.correctAnswer, ...(item.acceptedAnswers ?? [])];
  return candidates.some((candidate) => normalizeAnswer(candidate) === normalizedUser);
}
