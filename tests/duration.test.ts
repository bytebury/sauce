import { describe, expect, it } from "vitest";
import { Duration } from "../src/duration.ts";

describe("Duration", () => {
  it("returns the same number of milliseconds", () => {
    expect(Duration.milliseconds(500)).toBe(500);
  });

  it("converts seconds to milliseconds", () => {
    expect(Duration.seconds(1)).toBe(1000);
    expect(Duration.seconds(2.5)).toBe(2500);
  });

  it("converts minutes to milliseconds", () => {
    expect(Duration.minutes(1)).toBe(60 * 1000);
    expect(Duration.minutes(1.5)).toBe(90 * 1000);
  });

  it("converts hours to milliseconds", () => {
    expect(Duration.hours(1)).toBe(60 * 60 * 1000);
    expect(Duration.hours(2.5)).toBe(2.5 * 60 * 60 * 1000);
  });

  it("converts days to milliseconds", () => {
    expect(Duration.days(1)).toBe(24 * 60 * 60 * 1000);
    expect(Duration.days(1.5)).toBe(1.5 * 24 * 60 * 60 * 1000);
  });
});
