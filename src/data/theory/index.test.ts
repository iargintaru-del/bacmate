import { describe, it, expect } from "vitest";
import { TOPICS } from "../index";
import { THEORY, theoryForTopic } from "./index";

describe("theory content integrity", () => {
  it("has a theory section for every topic", () => {
    for (const topic of TOPICS) {
      const section = theoryForTopic(topic);
      expect(section).toBeDefined();
      expect(section!.topic).toBe(topic);
    }
  });

  it("every theory section has at least one concept with non-empty body", () => {
    for (const topic of TOPICS) {
      const section = THEORY[topic];
      expect(section.concepts.length).toBeGreaterThan(0);
      for (const concept of section.concepts) {
        expect(concept.heading.trim().length).toBeGreaterThan(0);
        expect(concept.body.length).toBeGreaterThan(0);
      }
    }
  });

  it("every theory section has at least 2 worked examples with steps", () => {
    for (const topic of TOPICS) {
      const section = THEORY[topic];
      expect(section.examples.length).toBeGreaterThanOrEqual(2);
      for (const example of section.examples) {
        expect(example.statement.trim().length).toBeGreaterThan(0);
        expect(example.steps.length).toBeGreaterThan(0);
      }
    }
  });
});
