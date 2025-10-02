import type { Nullish } from "./types.ts";

/**
 * Determines if the string is null or empty, or comprised only of
 * whitespace.
 *
 * @remarks
 * Note that the strings `"null"` and `"undefined"` are
 * considered `null` and `undefined` respectively.
 *
 * @see isNotNullOrWhitespace
 *
 * @example
 * isNullOrWhitespace(null); // true
 * isNullOrWhitespace(undefined); // true
 * isNullOrWhitespace("null"); // true
 * isNullOrWhitespace("   "); // true
 * isNullOrWhitespace("Hello World"); // false
 * isNullOrWhitespace("  .  "); // false
 */
export function isNullOrWhitespace(text: Nullish<string>): boolean {
  return isNull(text) || trim(text as string).length === 0;
}

/**
 * Determines if the string has some value that is not just whitespace.
 * This is the inverse of `isNullOrWhitespace`.
 *
 * @remarks
 * Note that the strings `"null"` and `"undefined"` are
 * considered `null` and `undefined` respectively.
 *
 * @see isNullOrWhitespace
 */
export function isNotNullOrWhitespace(text: Nullish<string>): boolean {
  return !isNullOrWhitespace(text);
}

/**
 * Trims the whitespace from the beginning and the end. This is an
 * alias for `.trim()`. Useful for when you're mapping over lists.
 *
 * @example
 * [' hello ', ' world '].map(trim); // ['hello', 'world'];
 */
export function trim(text: string): string {
  return text.trim();
}

/**
 * Converts the string to Title Case. This will capitalize
 * the letter of each word that is separated by a space. Underscores
 * are considered spaces. Hyphens are respected.
 *
 * @example
 * title("hello world"); // Hello World
 * title("hello-world"); // Hello-world
 * title("hello_world"); // Hello World
 * title("HELLO wORLD"); // Hello World
 */
export function title(text: string): string {
  return lower(text)
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => upper(word.charAt(0)) + word.slice(1))
    .join(" ");
}

/**
 * Convert the string to lowercase. An alias for `toLowerCase()`.
 */
export function lower(text: string): string {
  return text.toLowerCase();
}

/**
 * Convert the string to uppercase. An alias for `toUpperCase()`.
 */
export function upper(text: string): string {
  return text.toUpperCase();
}

/**
 * Convert the string to kebab-case.
 */
export function kebab(text: string): string {
  return trim(removePunctuation(lower(text))).replace(/\s+/g, "-");
}

/**
 * Convert the string to snake_case.
 */
export function snake(text: string): string {
  return kebab(text).replace(/-/g, "_");
}

/**
 * Removes all non-alphanumeric characters except spaces and returns
 * the new string.
 */
export function alphanumeric(text: string): string {
  return text.replace(/[^a-z0-9 ]/gi, "");
}

/**
 * Removes any non-numeric characters. This includes spaces.
 */
export function numeric(text: string): string {
  return text.replace(/[^\d]/g, "");
}

function removePunctuation(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z0-9\s]/g, "");
}

function isNull(thing: Nullish<string>): boolean {
  const text = String(thing).trim().toLowerCase();
  return text === "null" || text === "undefined";
}
