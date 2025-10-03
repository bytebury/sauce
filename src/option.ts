import type { Nullish } from "./types";

/**
 * Represents a thing that may or may not have a value.
 *
 * Very useful when dealing with things that might be null
 * or undefined.
 *
 * @example
 * const value = wrap(mightBeNull).unwrapOr(100);
 */
export interface Option<T> {
  /**
   * Unwrap the underlying value and returns it.
   * If the value is `None` then this function
   * will throw an error.
   *
   * @throws an error when underlying value is `None`.
   */
  unwrap(): T;
  /**
   * Unwraps the underlying value, or returns the given
   * value if the underlying value is `None`.
   */
  unwrapOr(value: unknown): unknown;
  /**
   * Determines if the underlying value is something.
   */
  isSome(): boolean;
  /**
   * Determines if the underlying value is something,
   * and the predicate using that same value is also
   * true.
   */
  isSomeAnd(fn: (x: T) => boolean): boolean;
  /**
   * Determines if the underlying value is `None`.
   */
  isNone(): boolean;
  /**
   * Determines if the underlying value is `None`,
   * or the predicate using the `Some` value is true.
   */
  isNoneOr(fn: (x: T) => boolean): boolean;
}

class _Option<T> implements Option<T> {
  constructor(private readonly value: T) { }

  unwrap(): T {
    if (this.isNone()) {
      throw new Error("Trying to unwrap a value that is null or undefined.");
    }
    return this.value;
  }

  unwrapOr(value: unknown): unknown {
    if (this.isNone()) return value;
    return this.value;
  }

  isSome(): boolean {
    return !this.isNone();
  }

  isSomeAnd(fn: (x: T) => boolean): boolean {
    if (this.isNone()) return false;
    return fn(this.value);
  }

  isNone(): boolean {
    return this.value === null || this.value === undefined;
  }

  isNoneOr(fn: (x: T) => boolean): boolean {
    return this.isNone() || fn(this.value);
  }
}

/**
 * Wraps a value that might be `null` or `undefined` and 
 * turns it into an Option.
 */
export function wrap<T>(value: Nullish<T>): Option<Nullish<T>> {
  return new _Option(value);
}

