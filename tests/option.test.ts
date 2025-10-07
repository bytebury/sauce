import { describe, it, expect } from "vitest";
import { None, Some } from "../src/option";
import { isEven } from '../src/numbers';

describe("OptionConstructor / wrap / Some / None", () => {
  describe("Some", () => {
    it("creates a Some for non-null/undefined values", () => {
      const some = Some(42);
      expect(some.isSome()).toBe(true);
      expect(some.unwrap()).toBe(42);
    });

    it("throws if given null or undefined", () => {
      expect(() => Some(null as any)).toThrow();
      expect(() => Some(undefined as any)).toThrow();
    });
  });

  describe("None", () => {
    it("represents a None value", () => {
      expect(None.isNone()).toBe(true);
      expect(None.isSome()).toBe(false);
    });
  });

  describe("unwrap", () => {
    it("returns the underlying value if Some", () => {
      const opt = Some(99);
      expect(opt.unwrap()).toBe(99);
    });

    it("throws if the value is None", () => {
      const opt = None;
      expect(() => opt.unwrap()).toThrow();
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
      expect(opt.isSomeAnd(n => n > 5)).toBe(false);
    });

    it("isSomeAnd returns false for None", () => {
      const opt = None;
      expect(opt.isSomeAnd(isEven as any)).toBe(false);
    });

    it("isNoneOr returns true if None or predicate passes", () => {
      expect(None.isNoneOr(isEven as any)).toBe(true);
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
});
