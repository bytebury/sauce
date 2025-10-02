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
class Option<T> {
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

export function wrap<T>(value: Nullish<T>): Option<Nullish<T>> {
  return new Option(value);
}

