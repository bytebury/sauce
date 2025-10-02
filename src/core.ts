import { isNullOrWhitespace, lower, trim } from "./strings";
import type { Nullish, OneOrMany, UnknownList } from "./types";

/**
 * Compares two things by turning them into strings, trimming them,
 * and comparing them by their string value.
 *
 * @example
 * isEqual("1", 1); // true
 * isEqual({foo: "bar"}, {foo: "bar"}); // true
 * isEqual([], []); // true
 * isEqual([0], [1]); // false
 * isEqual(false, " false "); // true
 * isEqual(false, "FALSE"); // false
 */
export function isEqual(thing1: unknown, thing2: unknown): boolean {
	thing1 = trim(stringify(thing1));
	thing2 = trim(stringify(thing2));

	return thing1 === thing2;
}

/**
 * Compares two things by turning them into strings, trimming them,
 * and comparing them by their string value.
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
 * Compares two things by turning them into strings, trimming and lowercasing
 * them, and comparing the string values. Works exactly like `isEqual` except
 * will lowercase both things before comparing.
 *
 * @example
 * isEqualIgnoreCase("1", 1); // true
 * isEqualIgnoreCase({foo: "bar"}, {foo: "bar"}); // true
 * isEqualIgnoreCase([], []); // true
 * isEqualIgnoreCase([0], [1]); // false
 * isEqualIgnoreCase(false, " false "); // true
 * isEqualIgnoreCase(false, "FALSE"); // true
 */
export function isEqualIgnoreCase(thing1: unknown, thing2: unknown): boolean {
	thing1 = trim(lower(stringify(thing1)));
	thing2 = trim(lower(stringify(thing2)));

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
 * isNotEqualIgnoreCase(false, " false "); // false
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
export function stringify<T>(thing: T): string {
	if (typeof thing === "object") {
		return JSON.stringify(thing);
	}
	return String(thing);
}

/**
 * Converts the given parameter to a boolean.
 *
 * This behaves a little unique and different from `Boolean`.
 * Instead, bonobo treats the strings "false", "null", "undefined", and "0"
 * as `false`. Similar to their "non-string" equivalent.
 *
 * It will also trim all whitespace, so strings of just whitespace are
 * treated as false.
 *
 * In all other scenarios this function will use `Boolean(thing)`.
 *
 * @example
 * bool("false"); // false
 * bool("true"); // true
 * bool(""); // false
 * bool("   "); // false
 * bool("null"); // false
 * bool({}); // true
 * bool("Hello World"); // true
 */
export function bool<T>(thing: OneOrMany<T>): boolean {
	const text = trim(lower(String(thing)));

	if (text === "false" || isNullOrWhitespace(text) || text === "0") {
		return false;
	}
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
export function reverse(thing: Set<unknown>): Set<unknown>;
export function reverse<T>(
	thing: string | Set<unknown> | T[],
): string | Set<unknown> | T[] {
	if (typeof thing === "string") {
		return thing.split("").reverse().join("");
	}

	if (thing instanceof Set) {
		return new Set([...thing].reverse());
	}

	return thing.reverse();
}

/**
 * Determines if the given thing is empty.
 *
 * If the thing has no length, then it is considered empty.
 *
 * @example
 * isEmpty([]); // true
 * isEmpty([0]); // false
 * isEmpty(""); // true
 * isEmpty(" "); // false
 * isEmpty(new Set()); // true
 * isEmpty({}); // true
 * isEmpty(new Map()); // true
 */
export function isEmpty(thing: Nullish<string>): boolean;
export function isEmpty(thing: UnknownList): boolean;
export function isEmpty(thing: unknown): boolean;
export function isEmpty(thing: string | UnknownList | unknown): boolean {
	if (thing === null || thing === undefined) return true;

	if (typeof thing === "string" || Array.isArray(thing)) {
		return thing.length === 0;
	}

	if (thing instanceof Map || thing instanceof Set) {
		return thing.size === 0;
	}

	if (typeof thing === "object") {
		return Object.keys(thing).length === 0;
	}

	return false;
}

/**
 * Determines if the given thing is not empty.
 *
 * If the thing has no length, then it is considered empty.
 * So, this will only be true if the thing has a length.
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
export function isNotEmpty(thing: Nullish<string>): boolean;
export function isNotEmpty(thing: UnknownList): boolean;
export function isNotEmpty(thing: unknown): boolean;
export function isNotEmpty(thing: string | UnknownList | unknown): boolean {
	return !isEmpty(thing);
}

/**
 * Determines if the given thing is null.
 *
 * Something is null if the string representation is `"null"` or `"undefined"`.
 *
 * @example
 * isNull(null); // true
 * isNull("NULL"); // true
 * isNull("undefined"); // true
 * isNull(undefined); // true
 * isNull(0); // false
 * isNull(false); // false
 */
export function isNull<T>(thing: Nullish<T>): boolean {
	const text = String(thing).trim().toLowerCase();
	return text === "null" || text === "undefined";
}

/**
 * Determines if the given thing is null.
 *
 * Something is null if the string representation is `"null"` or `"undefined"`.
 *
 * @example
 * isNotNull(null); // false
 * isNotNull("NULL"); // false
 * isNotNull("undefined"); // false
 * isNotNull(undefined); // false
 * isNotNull(0); // true
 * isNotNull(false); // true
 */
export function isNotNull<T>(thing: Nullish<T>): boolean {
	return !isNull(thing);
}

/**
 * Removes duplicates from an array.
 */
export function unique<T>(list: T[]): T[] {
	return [...new Set(list)];
}

/**
 * Pick a random item from an array.
 */
export function sample<T>(list: T[]): T | undefined {
	return list.length
		? list[Math.floor(Math.random() * list.length)]
		: undefined;
}
