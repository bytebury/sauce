import { describe, expect, it } from "vitest";
import {
  days,
  hours,
  milliseconds,
  minutes,
  seconds,
} from "../src/duration.ts";

describe("milliseconds", () => {
  it("returns the same value passed in", () => {
    expect(milliseconds(500)).toBe(500);
    expect(milliseconds(1_000)).toBe(1_000);
  });
});

describe("seconds", () => {
  it("converts seconds to milliseconds", () => {
    expect(seconds(0.5)).toBe(500);
    expect(seconds(1)).toBe(1_000);
    expect(seconds(3)).toBe(3_000);
  });
});

describe("minutes", () => {
  it("converts minutes to milliseconds", () => {
    expect(minutes(0.5)).toBe(30_000);
    expect(minutes(1)).toBe(60_000);
    expect(minutes(2)).toBe(120_000);
  });
});

describe("hours", () => {
  it("converts hours to milliseconds", () => {
    expect(hours(0.5)).toBe(1_800_000);
    expect(hours(1)).toBe(3_600_000);
    expect(hours(2)).toBe(7_200_000);
  });
});

describe("days", () => {
  it("converts days to milliseconds", () => {
    expect(days(0.5)).toBe(43_200_000);
    expect(days(1)).toBe(86_400_000);
    expect(days(3)).toBe(259_200_000);
  });
});
