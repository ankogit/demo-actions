import { greet, add, getTimestamp } from "../index.js";

describe("greet", () => {
  it("returns greeting with name", () => {
    expect(greet("World")).toBe("Hello, World!");
  });
});

describe("add", () => {
  it("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});

describe("getTimestamp", () => {
  it("returns ISO date string", () => {
    const ts = getTimestamp();
    expect(ts).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });
});
