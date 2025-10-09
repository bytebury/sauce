import { UnknownRecord } from "./types";

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
   * Unwraps the underlying value and returns it.
   * If the value is `None` then this function
   * will throw an error.
   *
   * @throws
   * An error when the underlying value is `None`.
   *
   * @example
   * ```ts
   * Some(42).unwrap(); // 42
   * None.unwrap(); // throws Error
   * ```
   */
  unwrap(): NonNullable<T>;
  /**
   * Unwraps the underlying value and returns it.
   * If the value is `None` then this function
   * will throw an error with the given message.
   *
   * @remarks
   * Usually preferred over `unwrap`.
   *
   * @throws
   * An error when the underlying value is `None`.
   * This error will contain the provided message.
   *
   * @example
   * ```ts
   * Some("hi").expect("should never fail"); // "hi"
   * None.expect("missing value"); // throws Error("missing value")
   * ```
   */
  expect(message: string): NonNullable<T>;
  /**
   * Unwraps the underlying value, or returns the given
   * value if the underlying value is `None`.
   *
   * @example
   * ```ts
   * Some(10).unwrapOr(0); // 10
   * None.unwrapOr(0); // 0
   * ```
   */
  unwrapOr<U>(value: U): T | U;
  /**
   * Determines if the underlying value is something.
   *
   * @example
   * ```ts
   * Some(5).isSome(); // true
   * None.isSome(); // false
   * ```
   */
  isSome(): boolean;
  /**
   * Determines if the underlying value is something,
   * and the predicate using that same value is also
   * true.
   *
   * @example
   * ```ts
   * Some(4).isSomeAnd(isEven); // true
   * Some(3).isSomeAnd(isEven); // false
   * None.isSomeAnd(() => true); // false
   * ```
   */
  isSomeAnd(fn: (x: T) => boolean): boolean;
  /**
   * Determines if the underlying value is `None`.
   *
   * @example
   * ```ts
   * None.isNone(); // true
   * Some("hi").isNone(); // false
   * ```
   */
  isNone(): boolean;
  /**
   * Determines if the underlying value is `None`,
   * or if the predicate using that same value returns `true`.
   *
   * @example
   * ```ts
   * None.isNoneOr(() => false); // true
   * Some(5).isNoneOr(isOdd); // true
   * Some(2).isNoneOr(isOdd); // false
   * ```
   */
  isNoneOr(fn: (x: T) => boolean): boolean;
  /**
   * Returns `None` if the `Option` is `None`. Otherwise,
   * this will call the predicate. If the predicate returns
   * `true` then this will return `Some(T)`. If the predicate
   * returns `false`, then this will return `None`.
   *
   * @example
   * ```ts
   * Some(10).filter(isEven); // Some(10)
   * Some(3).filter(isEven); // None
   * None.filter(isEven); // None
   * ```
   */
  filter(fn: (x: T) => boolean): Option<T>;
  /**
   * Reads the current value wrapped in this Option and
   * performs a side-effect. Useful for logging situations.
   *
   * @example
   * ```ts
   * Some("hello").inspect(console.log); // logs "hello", returns Some("hello")
   * None.inspect(console.log); // does nothing, returns None
   * ```
   */
  inspect(fn: (x: T) => void): Option<T>;
  /**
   * Maps an `Option` to `Option` by applying the function when
   * the contained value is `Some`. If it is `None`, then it will
   * return `None`.
   *
   * @example
   * ```ts
   * Some(2).map(x => x * 3); // Some(6)
   * None.map(x => x * 3); // None
   * ```
   */
  map<U>(fn: (x: T) => U): Option<U>;
  /**
   * Maps an `Option` to a value by applying the function when
   * the contained value is `Some`. If it is `None`, then it will
   * return the `defaultVal` given.
   *
   * @example
   * ```ts
   * Some(4).mapOr(0, x => x * 2); // 8
   * None.mapOr(0, x => x * 2); // 0
   * ```
   */
  mapOr<U>(defaultVal: U, fn: (x: T) => U): U;
  /**
   * Forces an unwrap of a null. This will always return
   * `null`, even if there is a value. This is only useful
   * if you want to always return `null` from this option.
   *
   * @example
   * ```ts
   * Some(42).null(); // null
   * None.null(); // null
   * ```
   */
  null(): null;
  /**
   * Forces an unwrap of undefined. This will always return
   * `undefined`, even if there is a value. This is only useful
   * if you want to always return `undefined` from this option.
   *
   * @example
   * ```ts
   * Some(42).undefined(); // undefined
   * None.undefined(); // undefined
   * ```
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

  expect(message: string): NonNullable<T> {
    if (this.isNone()) {
      throw new Error(message);
    }
    return this.value as NonNullable<T>;
  }

  unwrapOr<U>(value: U): T | U {
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

  filter(fn: (x: T) => boolean): Option<T> {
    if (this.isNone()) return None;
    const val = fn(this.value);
    if (val) return Some(this.value as NonNullable<T>);
    return None;
  }

  inspect(fn: (x: T) => void): Option<T> {
    fn(this.value);
    return this;
  }

  map<U>(fn: (x: T) => U): Option<U> {
    if (this.isNone()) return None;
    return wrap(fn(this.value));
  }

  mapOr<U>(defaultVal: U, fn: (x: T) => U): U {
    if (this.isNone()) return defaultVal;
    return wrap(fn(this.value)).unwrapOr(defaultVal);
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
export function wrap<T>(value: T): Option<T> {
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
    throw new Error("You are trying to put a None in a Some");
  }
  return wrap(value);
}

/**
 * An `Option` that has `None` value.
 *
 * @remarks A `None` is `null` or `undefined`.
 */
export const None: Option<never> = wrap(null as never);
