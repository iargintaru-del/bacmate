import { describe, it, expect, beforeEach } from "vitest";
import { getAttempts, logAttempt, clearAttempts, type Attempt } from "./storage";

beforeEach(() => {
  localStorage.clear();
});

describe("storage", () => {
  it("returns an empty array when nothing is stored", () => {
    expect(getAttempts()).toEqual([]);
  });

  it("logs and retrieves an attempt", () => {
    const attempt: Attempt = { itemId: "ex-1", topic: "limite", correct: true, timestamp: 123 };
    logAttempt(attempt);
    expect(getAttempts()).toEqual([attempt]);
  });

  it("appends multiple attempts in order", () => {
    logAttempt({ itemId: "a", topic: "limite", correct: true, timestamp: 1 });
    logAttempt({ itemId: "b", topic: "derivate", correct: false, timestamp: 2 });
    expect(getAttempts().map((a) => a.itemId)).toEqual(["a", "b"]);
  });

  it("clears all attempts", () => {
    logAttempt({ itemId: "a", topic: "limite", correct: true, timestamp: 1 });
    clearAttempts();
    expect(getAttempts()).toEqual([]);
  });

  it("returns an empty array when stored data is corrupt", () => {
    localStorage.setItem("bacmate:attempts", "not json");
    expect(getAttempts()).toEqual([]);
  });
});
