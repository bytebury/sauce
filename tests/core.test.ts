import { describe, it, expect } from "vitest";
import { isEqual, isNotEqual } from "../src/core.ts";
import { isEqualIgnoreCase, isNotEqualIgnoreCase } from "../src/core.ts";
import { stringify, bool, reverse, sample, isEmpty, isNotEmpty } from "../src/core.ts";
import { unique, clone } from "../src/core.ts";
import { wrap } from '../src/option.ts';

describe("isEqual", () => {
  it("returns true for numbers and strings that match after stringify and trim", () => {
    expect(isEqual("1", 1)).toBe(true);
    expect(isEqual(false, " false ")).toBe(true);
  });

  it("returns true for objects with same stringified content", () => {
    expect(isEqual({ foo: "bar" }, { foo: "bar" })).toBe(true);
  });

  it("returns true for empty arrays", () => {
    expect(isEqual([], [])).toBe(true);
  });

  it("returns false for different arrays", () => {
    expect(isEqual([0], [1])).toBe(false);
  });

  it("returns false for different strings / cases", () => {
    expect(isEqual(false, "FALSE")).toBe(false);
    expect(isEqual("hello", "world")).toBe(false);
  });
});

describe("isNotEqual", () => {
  it("returns the opposite of isEqual", () => {
    expect(isNotEqual("1", 1)).toBe(false);
    expect(isNotEqual("2", 1)).toBe(true);
    expect(isNotEqual({ foo: "bar" }, { foo: "bar" })).toBe(false);
    expect(isNotEqual([], [1])).toBe(true);
  });
});

describe("isEqualIgnoreCase", () => {
  it("returns true for numbers and strings that match after stringify, trim, and lowercase", () => {
    expect(isEqualIgnoreCase("1", 1)).toBe(true);
    expect(isEqualIgnoreCase(false, " false ")).toBe(true);
    expect(isEqualIgnoreCase(false, "FALSE")).toBe(true);
  });

  it("returns true for objects with same stringified content ignoring case", () => {
    expect(isEqualIgnoreCase({ foo: "bar" }, { foo: "bar" })).toBe(true);
    expect(isEqualIgnoreCase({ Foo: "BAR" }, { foo: "bar" })).toBe(true);
  });

  it("returns true for empty arrays", () => {
    expect(isEqualIgnoreCase([], [])).toBe(true);
  });

  it("returns false for different arrays", () => {
    expect(isEqualIgnoreCase([0], [1])).toBe(false);
  });

  it("returns false for different strings / cases when compared case-insensitive", () => {
    expect(isEqualIgnoreCase("hello", "world")).toBe(false);
  });
});

describe("isNotEqualIgnoreCase", () => {
  it("returns the inverse of isEqualIgnoreCase for numbers and strings", () => {
    expect(isNotEqualIgnoreCase("1", 1)).toBe(false);
    expect(isNotEqualIgnoreCase("2", 1)).toBe(true);
  });

  it("returns the inverse for arrays and objects", () => {
    expect(isNotEqualIgnoreCase([0], [1])).toBe(true);
    expect(isNotEqualIgnoreCase({ foo: "bar" }, { foo: "bar" })).toBe(false);
  });

  it("handles booleans and case-insensitive strings", () => {
    expect(isNotEqualIgnoreCase(false, " false ")).toBe(false);
    expect(isNotEqualIgnoreCase(false, "FALSE")).toBe(false);
  });
});

describe("stringify", () => {
  it("converts objects, arrays, and primitives to strings", () => {
    expect(stringify({ a: 1 })).toBe(JSON.stringify({ a: 1 }));
    expect(stringify([1, 2, 3])).toBe("[1,2,3]");
    expect(stringify(42)).toBe("42");
    expect(stringify("hello")).toBe("hello");
  });
});

describe("bool", () => {
  it("returns false for false, 0, nullish, or whitespace strings", () => {
    expect(bool("false")).toBe(false);
    expect(bool("0")).toBe(false);
    expect(bool("   ")).toBe(false);
  });

  it("returns true for other truthy values", () => {
    expect(bool({})).toBe(true);
    expect(bool("hello")).toBe(true);
    expect(bool(42)).toBe(true);
  });
});

describe("clone", () => {
  it("returns a deep copy", () => {
    const obj = { a: 1 };
    const arr = [1, 2, 3];
    const clonedObj = clone(obj);
    const clonedArr = clone(arr);
    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj);
    expect(clonedArr).toEqual(arr);
    expect(clonedArr).not.toBe(arr);
  });
});

describe("reverse", () => {
  it("reverses strings", () => {
    expect(reverse("abc")).toBe("cba");
  });

  it("reverses arrays", () => {
    expect(reverse([1, 2, 3])).toEqual([3, 2, 1]);
  });

  it("reverses sets", () => {
    expect(reverse(new Set([1, 2, 3]))).toEqual(new Set([3, 2, 1]));
  });
});

describe("isEmpty", () => {
  it("detects empty values correctly", () => {
    expect(isEmpty("")).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty(wrap(null as unknown as string))).toBe(true);
  });

  it("detects non-empty values correctly", () => {
    expect(isEmpty([0])).toBe(false);
    expect(isEmpty(" ")).toBe(false);
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty(new Set([1]))).toBe(false);
    expect(isEmpty(wrap(' '))).toBe(false);
  });
});

describe("isNotEmpty", () => {
  it("returns the inverse of isEmpty", () => {
    expect(isNotEmpty([])).toBe(false);
    expect(isNotEmpty([0])).toBe(true);
    expect(isNotEmpty("")).toBe(false);
    expect(isNotEmpty(" ")).toBe(true);
  });
});

describe("unique", () => {
  it("removes duplicates from arrays", () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    expect(unique([])).toEqual([]);
  });
});

describe("sample", () => {
  it("returns undefined for empty array", () => {
    expect(sample([]).isNone()).toBe(true);
  });

  it("returns an element from the array", () => {
    const arr = [1, 2, 3];
    const result = sample(arr).unwrap();
    expect(arr).toContain(result);
  });

  it("returns all possible values over multiple runs", () => {
    const arr = [1, 2, 3];
    const seen = new Set<number>();
    for (let i = 0; i < 50; i++) {
      seen.add(sample(arr).unwrap());
    }
    expect(seen.size).toBe(arr.length);
  });
});
