/**
 * Represents a thing that may or may not have a value.
 *
 * Very useful when dealing with things that might be null
 * or undefined.
 *
 * @example
 * const option = wrap(mightBeNull);
 *
 * const value1 = option.unwrapOr(100);
 * const value2 = option.isNoneOr(isWhitespace);
 * const value3 = option.isSomeAnd(isEven);
 */
export interface Option<T> {
  /**
   * Unwrap the underlying value and returns it.
   * If the value is `None` then this function
   * will throw an error.
   *
   * @throws an error when underlying value is `None`.
   */
  unwrap(): NonNullable<T>;
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
  /**
   * Forces an unwrap of a null. This will always return
   * `null`, even if there is a value. This is only useful
   * if you want to always return `null` from this option.
   */
  null(): null;
  /**
   * Forces an unwrap of undefined. This will always return
   * `undefined`, even if there is a value. This is only useful
   * if you want to always return `undefined` from this option.
   */
  undefined(): undefined;
}

export class OptionConstructor<T> implements Option<T> {
  constructor(private readonly value: T) { }

  unwrap(): NonNullable<T> {
    if (this.isNone()) {
      throw new Error("Trying to unwrap a value that is null or undefined.");
    }
    return this.value as NonNullable<T>;
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

  null(): null {
    return null;
  }

  undefined(): undefined {
    return undefined;
  }
}

/**
 * Wraps a value that might be `null` or `undefined` and 
 * turns it into an Option.
 */
function wrap<T>(value: T): Option<T> {
  return new OptionConstructor(value);
}

/**
 * An `Option` that will always have some value.
 *
 * You cannot put null into a Some.
 *
 * @throws an error if you try to give `null` or `undefined`.
 */
export function Some<T>(value: NonNullable<T>): Option<NonNullable<T>> {
  if (value === null || value === undefined) {
    throw new Error('You are trying to put a None in a Some');
  }
  return wrap(value)
}

/**
 * An `Option` that has `None` value.
 *
 * @remarks A `None` is `null` or `undefined`.
 */
export const None: Option<never> = wrap(null as never);
