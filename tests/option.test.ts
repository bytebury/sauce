import { describe, expect, it, vi } from "vitest";
import { None, Some } from "../src/option.ts";
import { isEven } from "../src/numbers.ts";
import { type UnknownRecord } from "../src/types.ts";
import { upper } from "../src/strings.ts";

describe("OptionConstructor / wrap / Some / None", () => {
  describe("Some", () => {
    it("creates a Some for non-null/undefined values", () => {
      const some = Some(42);
      expect(some.isSome()).toBe(true);
      expect(some.expect()).toBe(42);
    });

    it("throws if given null or undefined", () => {
      expect(() => Some(null as unknown as UnknownRecord)).toThrow();
      expect(() => Some(undefined as unknown as UnknownRecord)).toThrow();
    });
  });

  describe("None", () => {
    it("represents a None value", () => {
      expect(None.isNone()).toBe(true);
      expect(None.isSome()).toBe(false);
    });
  });

  describe("expect", () => {
    it("returns the underlying value if Some", () => {
      const opt = Some(99);
      expect(opt.expect()).toBe(99);
    });

    it("throws if the value is None", () => {
      const opt = None;
      expect(() => opt.expect()).toThrow();
      expect(() => opt.expect()).toThrow(
        "@bytebury/sauce: trying to unwrap a value that is null or undefined.",
      );
    });

    it("should include the custom error message in the thrown error", () => {
      expect(() => None.expect("missing value")).toThrow(
        "missing value",
      );
      expect(() => None.expect("nope")).toThrow("nope");
    });
  });

  describe("unwrapOr", () => {
    it("returns the value if Some", () => {
      const opt = Some("hi");
      expect(opt.unwrapOr("default")).toBe("hi");
    });

    it("returns the default if None", () => {
      const opt = None;
      expect(opt.unwrapOr("default")).toBe("default");
    });
  });

  describe("isSome / isNone", () => {
    it("correctly identifies Some vs None", () => {
      const some = Some(1);
      expect(some.isSome()).toBe(true);
      expect(some.isNone()).toBe(false);

      const none = None;
      expect(none.isSome()).toBe(false);
      expect(none.isNone()).toBe(true);
    });
  });

  describe("isSomeAnd / isNoneOr", () => {
    it("isSomeAnd returns true if Some and predicate passes", () => {
      const opt = Some(4);
      expect(opt.isSomeAnd(isEven)).toBe(true);
      expect(opt.isSomeAnd((n) => n > 5)).toBe(false);
    });

    it("isSomeAnd returns false for None", () => {
      const opt = None;
      expect(opt.isSomeAnd(isEven)).toBe(false);
    });

    it("isNoneOr returns true if None or predicate passes", () => {
      expect(None.isNoneOr(isEven)).toBe(true);
      expect(Some(4).isNoneOr(isEven)).toBe(true);
      expect(Some(5).isNoneOr(isEven)).toBe(false);
    });
  });

  describe("null / undefined methods", () => {
    it("always returns null for null()", () => {
      expect(Some(42).null()).toBe(null);
      expect(None.null()).toBe(null);
    });

    it("always returns undefined for undefined()", () => {
      expect(Some(42).undefined()).toBe(undefined);
      expect(None.undefined()).toBe(undefined);
    });
  });

  describe("filter", () => {
    it("returns None() when Option is None", () => {
      expect(None.filter(() => true)).toEqual(None);
      expect(None.filter(() => false)).toEqual(None);
    });

    it("returns Some() when predicate returns true", () => {
      expect(Some(42).filter((x) => x > 0)).toEqual(Some(42));
    });

    it("returns None when predicate returns false", () => {
      expect(Some(42).filter((x) => x < 0)).toEqual(None);
    });
  });

  describe("inspect", () => {
    it("calls the callback when Some()", () => {
      const fn = vi.fn();
      const opt = Some(99).inspect(fn);
      expect(fn).toHaveBeenCalledWith(99);
      expect(opt).toEqual(Some(99));
    });

    it("does not call the callback when None", () => {
      const fn = vi.fn();
      const opt = None.inspect(fn);
      expect(fn).toHaveBeenCalledWith(null);
      expect(opt).toEqual(None);
    });
  });
  describe("map", () => {
    it("returns None when Option is None", () => {
      expect(None.map((x) => x)).toEqual(None);
    });

    it("applies the function when Some()", () => {
      expect(Some(2).map((x) => x * 2)).toEqual(Some(4));
      expect(Some("hi").map((s) => upper(s))).toEqual(Some("HI"));
    });
  });

  describe("or", () => {
    it("returns the current option when Some()", () => {
      expect(Some(3).or(Some(5)).expect()).toBe(3);
    });

    it("returns the value from .or() when None", () => {
      expect(None.or(Some(5)).expect()).toBe(5);
    });
  });

  describe("mapOr", () => {
    it("returns the mapped value when Some()", () => {
      expect(Some(3).mapOr(0, (x) => x * 3)).toBe(9);
    });

    it("returns the default when None", () => {
      expect(None.mapOr(10, (x) => x)).toBe(10);
    });
  });
});
