import { isWhitespace, lower } from "./strings";
import type { NonEmptyList, UnknownList } from "./types";

/**
 * Compares two things by turning them into strings,
 * and comparing them by their string value.
 *
 * @example
 * isEqual("1", 1); // true
 * isEqual({foo: "bar"}, {foo: "bar"}); // true
 * isEqual([], []); // true
 * isEqual([0], [1]); // false
 * isEqual(false, " false "); // false
 * isEqual(false, "FALSE"); // false
 */
export function isEqual(thing1: unknown, thing2: unknown): boolean {
  return stringify(thing1) === stringify(thing2);
}

/**
 * Returns the first thing in a list. If the value
 * is a string, then it will return the first character.
 *
 * @remarks
 * If an empty list is passed then this will return undefined.
 *
 * @example
 * first("hello"); // "h"
 * first([1, 2, 3]); // 1
 */
export function first<T>(list: NonEmptyList<T>): T;
export function first(value: string): string;
export function first<T>(
  value: string | NonEmptyList<T>,
): T | string | undefined {
  return value[0];
}

/**
 * Returns the last thing in a list. If the value
 * is a string, then it will return the last character.
 *
 * @remarks
 * If an empty list is passed then this will return undefined.
 *
 * @example
 * last("hello"); // "o"
 * last([1, 2, 3]); // 3
 */
export function last<T>(list: NonEmptyList<T>): T;
export function last(value: string): string;
export function last<T>(
  value: string | NonEmptyList<T>,
): T | string | undefined {
  return value[value.length - 1];
}

/**
 * Compares two things by turning them into strings,
 * and comparing them by their string value.
 *
 * @remarks this is the inverse of `isEqual`.
 *
 * @example
 * isNotEqual("1", 1); // true
 * isNotEqual({foo: "bar"}, {foo: "bar"}); // true
 * isNotEqual([], []); // true
 * isNotEqual([0], [1]); // false
 * isNotEqual(false, " false "); // true
 * isNotEqual(false, "FALSE"); // false
 */
export function isNotEqual(thing1: unknown, thing2: unknown): boolean {
  return !isEqual(thing1, thing2);
}

/**
 * Compares two things by turning them into strings and lowercasing
 * them, and comparing the string values. Works exactly like `isEqual` except
 * will lowercase both things before comparing.
 *
 * @example
 * isEqualIgnoreCase("1", 1); // true
 * isEqualIgnoreCase({foo: "bar"}, {foo: "bar"}); // true
 * isEqualIgnoreCase([], []); // true
 * isEqualIgnoreCase([0], [1]); // false
 * isEqualIgnoreCase(false, " false "); // false
 * isEqualIgnoreCase(false, "FALSE"); // true
 */
export function isEqualIgnoreCase(thing1: unknown, thing2: unknown): boolean {
  thing1 = lower(stringify(thing1));
  thing2 = lower(stringify(thing2));

  return thing1 === thing2;
}

/**
 * Compares two things by turning them into strings, trimming and lowercasing
 * them, and comparing the string values. Works exactly like `isEqual` except
 * will lowercase both things before comparing.
 *
 * @example
 * isNotEqualIgnoreCase("1", 1); // false
 * isNotEqualIgnoreCase({foo: "bar"}, {foo: "bar"}); // false
 * isNotEqualIgnoreCase([], []); // false
 * isNotEqualIgnoreCase([0], [1]); // true
 * isNotEqualIgnoreCase(false, " false "); // true
 * isNotEqualIgnoreCase(false, "FALSE"); // false
 */
export function isNotEqualIgnoreCase(
  thing1: unknown,
  thing2: unknown,
): boolean {
  return !isEqualIgnoreCase(thing1, thing2);
}

/**
 * Converts the given parameter into the string equivalent.
 *
 * If the thing provided has the type of "object", then this function
 * returns `JSON.stringify(thing)`. Otherwise, it will wrap the `thing`
 * in a String and convert it to it's string representation.
 *
 * @example
 * stringify({ foo: "bar" }); // "{ "foo": "bar" }"
 * stringify([1, 2, 3]); // "[1, 2, 3]"
 * stringify(1); // "1"
 */
export function stringify(thing: unknown): string {
  return typeof thing === "object" ? JSON.stringify(thing) : String(thing);
}

/**
 * Converts the given parameter to a boolean.
 *
 * @remarks
 * This is syntactic sugar for `Boolean(value)`.
 *
 * @example
 * bool("false"); // true
 * bool("true"); // true
 * bool(""); // false
 * bool("   "); // true
 * bool(false); // false
 * bool("null"); // true
 * bool({}); // true
 * bool("Hello World"); // true
 */
export function bool(thing: unknown): boolean {
  return Boolean(thing);
}

/**
 * Clones the given thing. This is an alias for `structuredClone`.
 */
export function clone<T>(thing: T): T {
  return structuredClone(thing);
}

/**
 * Reverses the given string or list.
 *
 * If the thing provided is a string, then it will return the string in reverse
 * respecting all characters.
 *
 * If the thing is a list, then it will reverse all items in the list.
 *
 * @example
 * reverse('Apple'); // "elppA"
 * reverse([1, 2, 3]); // [3, 2, 1]
 * reverse(new Set([1, 2, 3])); // Set[3, 2, 1]
 */
export function reverse(thing: string): string;
export function reverse<T>(thing: T[]): T[];
export function reverse<T>(thing: Set<T>): Set<T>;
export function reverse<T>(
  thing: string | Set<T> | T[],
): string | Set<T> | T[] {
  if (typeof thing === "string") return thing.split("").reverse().join("");
  if (thing instanceof Set) return new Set([...thing].reverse());
  return thing.reverse();
}

/**
 * Determines if the given thing is empty.
 *
 * Things are empty when:
 *   * They are `None`
 *   * They are empty strings
 *   * They are strings of only whitespace
 *   * They have length or size
 *
 * @example
 * isEmpty([]); // true
 * isEmpty([0]); // false
 * isEmpty(""); // true
 * isEmpty(" "); // true
 * isEmpty(new Set()); // true
 * isEmpty({}); // true
 * isEmpty(new Map()); // true
 * isEmpty(wrap(null)); // true
 * isEmpty(wrap('')); // false
 * isEmpty(wrap(' ')); // false
 */
export function isEmpty(thing: UnknownList): boolean;
export function isEmpty(thing: unknown): boolean;
export function isEmpty(thing: string | UnknownList | unknown): boolean {
  if (isNone(thing)) return true;
  if (typeof thing === "string") return isWhitespace(thing);
  if (Array.isArray(thing)) return thing.length === 0;
  if (thing instanceof Map || thing instanceof Set) return thing.size === 0;
  if (typeof thing === "object") return Object.keys(thing!).length === 0;
  return false;
}

/**
 * Determines if the given thing is not empty.
 *
 * @remarks this is the inverse of `isEmpty`.
 *
 * @example
 * isNotEmpty([]); // false
 * isNotEmpty([0]); // true
 * isNotEmpty(""); // false
 * isNotEmpty(" "); // true
 * isNotEmpty(new Set()); // false
 * isNotEmpty({}); // false
 * isNotEmpty(new Map()); // false
 */
export function isNotEmpty(thing: UnknownList): boolean;
export function isNotEmpty(thing: unknown): boolean;
export function isNotEmpty(thing: string | UnknownList | unknown): boolean {
  return !isEmpty(thing);
}

/**
 * Returns the distinct values from a list.
 *
 * @remarks same as `distinct`.
 *
 * @example
 * const myList = [1, 2, 3, 3];
 * unique(myList); // [1, 2, 3];
 */
export function unique<T>(list: T[]): T[] {
  return [...new Set(list)];
}

/**
 * Returns the distinct values from a list.
 *
 * @remarks alias for `unique`.
 *
 * @example
 * const myList = [1, 2, 3, 3];
 * distinct(myList); // [1, 2, 3];
 */
export function distinct<T>(list: T[]): T[] {
  return unique(list);
}

/**
 * Pick a random item from an array.
 *
 * @remarks
 * If you pass an empty list, then this function will return `undefined`.
 *
 * @example
 * const myList = [1, 2, 3, 4];
 * const randomItem = sample(myList);
 *
 * console.log(randomItem); // could be 1, 2, 3, or 4
 * console.log(sample([])); // undefined
 */
export function sample<T>(list: NonEmptyList<T>): T | undefined {
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Gives a random number in the given range. The first parameter is inclusive
 * and the second one is exclusive. Therefore, it will work with lists out of
 * the box.
 *
 * @example
 * rand(0, 10); // 0 -> 9
 * rand(3, 7); // 3 -> 6
 */
export function rand(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start)) + start;
}

/**
 * Determines if the given value is truthy.
 *
 * @example
 * truthy(true); // true
 * truthy(false); // false
 * truthy(''); // false
 */
export function truthy(thing: unknown): boolean {
  return Boolean(thing) === true;
}

/**
 * Determines if the given value is falsy.
 *
 * @example
 * falsy(true); // false
 * falsy(false); // true
 * falsy(''); // true
 */
export function falsy(thing: unknown): boolean {
  return !truthy(thing);
}

/**
 * Returns true if the given value is not null or undefined.
 *
 * @example
 * isSome(null); // false
 * isSome(undefined); // false
 * isSome(0); // true
 * isSome({}); // true
 */
export function isSome(thing: unknown): boolean {
  return !isNone(thing);
}

/**
 * Returns true if the given value is null or undefined.
 *
 * @example
 * isNone(null); // true
 * isNone(undefined); // true
 * isNone(true); // false
 * isNone(0); // false
 */
export function isNone(thing: unknown): boolean {
  return thing === null || thing === undefined;
}

/**
 * Sums the elements in the given list. If you pass a list of numbers, it sums
 * them directly. If you pass a list of objects, provide the key to sum.
 *
 * @example
 * sum([1, 2, 3]); // 6
 * sum([{ x: 1 }, { x: 2 }], "x"); // 3
 */
export function sum(list: number[]): number;
export function sum<T extends Record<PropertyKey, number>>(
  list: T[],
  key: keyof T,
): number;
export function sum(list: any[], key?: PropertyKey): number {
  if (list.length === 0) return 0;
  if (typeof list[0] === "number") {
    return (list as number[]).reduce((a, v) => a + v, 0);
  }
  return (list as Record<PropertyKey, number>[]).reduce(
    (a, v) => a + (v as any)[key!],
    0,
  );
}
