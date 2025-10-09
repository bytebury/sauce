import { describe, expect, it } from "vitest";
import { isEven, isOdd, ordinalize } from "../src/numbers.ts";

describe("isEven", () => {
  it("returns true for even numbers", () => {
    expect(isEven(0)).toBe(true);
    expect(isEven(2)).toBe(true);
    expect(isEven(-4)).toBe(true);
    expect(isEven(null as any)).toBe(true);
    expect(isEven(undefined as any)).toBe(true);
  });

  it("returns false for odd numbers", () => {
    expect(isEven(1)).toBe(false);
    expect(isEven(-3)).toBe(false);
    expect(isEven(7)).toBe(false);
  });
});

describe("isOdd", () => {
  it("returns true for odd numbers", () => {
    expect(isOdd(1)).toBe(true);
    expect(isOdd(-3)).toBe(true);
    expect(isOdd(7)).toBe(true);
  });

  it("returns false for even numbers", () => {
    expect(isOdd(0)).toBe(false);
    expect(isOdd(2)).toBe(false);
    expect(isOdd(-4)).toBe(false);
    expect(isOdd(null as any)).toBe(false);
    expect(isOdd(undefined as any)).toBe(false);
  });
});

describe("ordinalize", () => {
  it("returns correct ordinal for 1-3", () => {
    expect(ordinalize(1)).toBe("1st");
    expect(ordinalize(2)).toBe("2nd");
    expect(ordinalize(3)).toBe("3rd");
  });

  it("returns 'th' for numbers 4-10 and 14-20", () => {
    expect(ordinalize(4)).toBe("4th");
    expect(ordinalize(10)).toBe("10th");
    expect(ordinalize(14)).toBe("14th");
    expect(ordinalize(20)).toBe("20th");
  });

  it("handles special cases 11-13", () => {
    expect(ordinalize(11)).toBe("11th");
    expect(ordinalize(12)).toBe("12th");
    expect(ordinalize(13)).toBe("13th");
  });

  it("returns correct ordinals for larger numbers", () => {
    expect(ordinalize(21)).toBe("21st");
    expect(ordinalize(22)).toBe("22nd");
    expect(ordinalize(23)).toBe("23rd");
    expect(ordinalize(112)).toBe("112th");
  });

  it("should treat null and undefined as 0", () => {
    expect(ordinalize(undefined as any)).toBe("0th");
    expect(ordinalize(null as any)).toBe("0th");
  });
});
