import { describe, expect, it } from "vitest";
import { distinct, falsy, isEqual, isNotEqual, truthy } from "../src/core.ts";
import { isEqualIgnoreCase, isNotEqualIgnoreCase } from "../src/core.ts";
import {
  bool,
  isEmpty,
  isNotEmpty,
  reverse,
  sample,
  stringify,
} from "../src/core.ts";
import { clone, unique } from "../src/core.ts";
import { None, Some } from "../src/option.ts";

describe("isEqual", () => {
  it("returns true for numbers and strings that match after stringify and trim", () => {
    expect(isEqual("1", 1)).toBe(true);
    expect(isEqual(false, " false ")).toBe(false);
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
    expect(isNotEqual("false ", "false")).toBe(true);
    expect(isNotEqual("false", false)).toBe(false);
  });
});

describe("isEqualIgnoreCase", () => {
  it("returns true for numbers and strings that match after stringify, trim, and lowercase", () => {
    expect(isEqualIgnoreCase("1", 1)).toBe(true);
    expect(isEqualIgnoreCase(false, " false ")).toBe(false);
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

  it("returns false for different stringe / cases when compared case-insensitive", () => {
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
    expect(isNotEqualIgnoreCase(false, " false ")).toBe(true);
    expect(isNotEqualIgnoreCase(false, "false_not")).toBe(true);
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
  it("should return false for falsy situations", () => {
    expect(bool(false)).toBe(false);
    expect(bool(0)).toBe(false);
    expect(bool("")).toBe(false);
    expect(bool("   ")).toBe(false);
    expect(bool(None)).toBe(false);
  });

  it("returns true for other truthy values", () => {
    expect(bool({})).toBe(true);
    expect(bool("hello")).toBe(true);
    expect(bool(42)).toBe(true);
    expect(bool("0")).toBe(true);
    expect(bool(Some(""))).toBe(true);
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
  it("returns true for null or undefined", () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  it("returns true for empty strings and whitespace-only strings", () => {
    expect(isEmpty("")).toBe(true);
    expect(isEmpty("   ")).toBe(true);
    expect(isEmpty("\n\t")).toBe(true);
  });

  it("returns false for non-empty strings", () => {
    expect(isEmpty("Hello")).toBe(false);
  });

  it("returns true for empty arrays", () => {
    expect(isEmpty([])).toBe(true);
  });

  it("returns false for non-empty arrays", () => {
    expect(isEmpty([1, 2])).toBe(false);
  });

  it("returns true for empty objects", () => {
    expect(isEmpty({})).toBe(true);
  });

  it("returns false for non-empty objects", () => {
    expect(isEmpty({ foo: "bar" })).toBe(false);
  });

  it("returns true for empty Set and Map", () => {
    expect(isEmpty(new Set())).toBe(true);
    expect(isEmpty(new Map())).toBe(true);
  });

  it("returns false for non-empty Set and Map", () => {
    expect(isEmpty(new Set([1]))).toBe(false);
    expect(isEmpty(new Map([["key", "value"]]))).toBe(false);
  });

  it("returns true for OptionConstructor that is None", () => {
    const noneOption = None;
    expect(isEmpty(noneOption)).toBe(true);
  });

  it("returns false for OptionConstructor that is Some", () => {
    const someOption = Some(42);
    expect(isEmpty(someOption)).toBe(false);
    expect(someOption.unwrap()).toBe(42);
  });
});

describe("isNotEmpty", () => {
  it("returns the opposite of isEmpty", () => {
    expect(isNotEmpty(null)).toBe(false);
    expect(isNotEmpty("")).toBe(false);
    expect(isNotEmpty("Hello")).toBe(true);
    expect(isNotEmpty([1])).toBe(true);
    expect(isNotEmpty([])).toBe(false);
    expect(isNotEmpty({ foo: "bar" })).toBe(true);
    expect(isNotEmpty({})).toBe(false);
    expect(isNotEmpty(new Set([1]))).toBe(true);
    expect(isNotEmpty(new Set())).toBe(false);
  });
});

describe("unique", () => {
  it("returns an array of distinct values", () => {
    expect(unique([1, 2, 2, 3])).toEqual([1, 2, 3]);
    expect(unique(["a", "b", "a"])).toEqual(["a", "b"]);
  });

  it("returns an empty array when given an empty array", () => {
    expect(unique([])).toEqual([]);
  });
});

describe("distinct", () => {
  it("is an alias for unique", () => {
    expect(distinct([1, 2, 2, 3])).toEqual([1, 2, 3]);
    expect(distinct(["x", "x", "y"])).toEqual(["x", "y"]);
  });
});

describe("sample", () => {
  it("returns undefined wrapped in Option for empty array", () => {
    const result = sample([]);
    expect(result.isNone()).toBe(true);
  });

  it("returns one of the elements for non-empty array", () => {
    const list = [1, 2, 3, 4, 5];
    const result = sample(list);
    expect(list).toContain(result.unwrap());
  });
});

describe("truthy", () => {
  it("returns true for truthy values", () => {
    expect(truthy(true)).toBe(true);
    expect(truthy(1)).toBe(true);
    expect(truthy("non-empty")).toBe(true);
  });

  it("returns false for falsy values", () => {
    expect(truthy(false)).toBe(false);
    expect(truthy(0)).toBe(false);
    expect(truthy("")).toBe(false);
    expect(truthy(null)).toBe(false);
    expect(truthy(undefined)).toBe(false);
  });
});

describe("falsy", () => {
  it("returns true for falsy values", () => {
    expect(falsy(false)).toBe(true);
    expect(falsy(0)).toBe(true);
    expect(falsy("")).toBe(true);
    expect(falsy(null)).toBe(true);
    expect(falsy(undefined)).toBe(true);
  });

  it("returns false for truthy values", () => {
    expect(falsy(true)).toBe(false);
    expect(falsy(1)).toBe(false);
    expect(falsy("hello")).toBe(false);
  });
});
