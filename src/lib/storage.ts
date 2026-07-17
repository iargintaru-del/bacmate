import type { Topic } from "../types";

const STORAGE_KEY = "bacmate:attempts";

export interface Attempt {
  itemId: string;
  topic: Topic;
  correct: boolean;
  timestamp: number;
}

export function getAttempts(): Attempt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Attempt[];
  } catch {
    return [];
  }
}

export function logAttempt(attempt: Attempt): void {
  const attempts = getAttempts();
  attempts.push(attempt);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
}

export function clearAttempts(): void {
  localStorage.removeItem(STORAGE_KEY);
}
