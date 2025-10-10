/**
 * Determines if the given text is only comprised of whitespace.
 *
 * @remarks
 * This is `null | undefined` safe. If you pass `null | undefined` then this will return `true`.
 *
 * @example
 * isWhitespace(null); // true
 * isWhitespace("   "); // true
 * isWhitespace("\n\t"); // true
 * isWhitespace("Hello"); // false
 */
export function isWhitespace(text: string): boolean {
  return trim(text).length === 0;
}

/**
 * Determines if the given text contains any non-whitespace characters.
 *
 * @remarks
 * This is `null | undefined` safe. If you pass `null | undefined` then this will return `false`.
 *
 * @example
 * isNotWhitespace(null); // false
 * isNotWhitespace("   "); // false
 * isNotWhitespace("Hello"); // true
 */
export function isNotWhitespace(text: string): boolean {
  return !isWhitespace(text);
}

/**
 * Trims the whitespace from the beginning and the end. This is an
 * alias for `.trim()`. Useful for when you're mapping over lists.
 *
 * @remarks
 * This is `null | undefined` safe. If you pass `null | undefined` then this will return `""`.
 *
 * @example
 * trim(null); // ""
 * trim(" HELLO WORLD    \n"); // ""
 * [' hello ', ' world '].map(trim); // ['hello', 'world'];
 */
export function trim(text: string): string {
  return (text || "").trim();
}

/**
 * Converts the string to Title Case. This will capitalize
 * the letter of each word that is separated by a space. Underscores
 * are considered spaces. Hyphens are respected.
 *
 * @remarks
 * This is `null | undefined` safe. If you pass `null | undefined` then this will return `""`.
 *
 * @example
 * title(null); // ""
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
 * Converts the string to lowercase.
 * An alias for `toLowerCase()`.
 *
 * @remarks
 * This is `null | undefined` safe. If you pass `null | undefined` then this will return `""`.
 *
 * @example
 * lower(null); // ""
 * lower("Hello WORLD"); // "hello world"
 */
export function lower(text: string): string {
  return (text || "").toLowerCase();
}

/**
 * Converts the string to uppercase.
 * An alias for `toUpperCase()`.
 *
 * @remarks
 * This is `null | undefined` safe. If you pass `null | undefined` then this will return `""`.
 *
 * @example
 * upper(null); // ""
 * upper("Hello world"); // "HELLO WORLD"
 */
export function upper(text: string): string {
  return (text || "").toUpperCase();
}

/**
 * Converts the string to `kebab-case` by removing punctuation,
 * trimming extra spaces, converting to lowercase, and joining words with hyphens.
 *
 * @remarks
 * This is `null | undefined` safe. If you pass `null | undefined` then this will return `""`.
 *
 * @example
 * kebab(null); // ""
 * kebab("Hello World!"); // "hello-world"
 * kebab("  Clean THIS_up!! "); // "clean-this-up"
 */
export function kebab(text: string): string {
  return trim(removePunctuation(lower(text))).replace(/\s+/g, "-");
}

/**
 * Converts a string to `snake_case` by replacing spaces and punctuation with underscores.
 * Uses `kebab()` internally, replacing hyphens with underscores.
 *
 * @remarks
 * This is `null | undefined` safe. If you pass `null | undefined` then this will return `""`.
 *
 * @example
 * snake(null); // ""
 * snake("Hello World"); // "hello_world"
 * snake("User-Profile Page"); // "user_profile_page"
 */
export function snake(text: string): string {
  return kebab(text).replace(/-/g, "_");
}

/**
 * Returns a copy of the given string with all non-alphanumeric characters removed,
 * except for spaces. Letters and digits are preserved regardless of case.
 *
 * @remarks
 * This is `null | undefined` safe. If you pass `null | undefined` then this will return `""`.
 *
 * @example
 * alphanumeric(null); // ""
 * alphanumeric("Hello, World!"); // "Hello World"
 * alphanumeric("123@#Test"); // "123Test"
 */
export function alphanumeric(text: string): string {
  return (text || "").replace(/[^a-z0-9 ]/gi, "");
}

/**
 * Removes any non-numeric characters. This includes spaces.
 *
 * @remarks
 * This is `null | undefined` safe. If you pass `null | undefined` then this will return `""`.
 *
 * @example
 * numeric(null); // ""
 * numeric('(555) 555-5555'); // 5555555555
 */
export function numeric(text: string): string {
  return (text || "").replace(/[^\d]/g, "");
}

function removePunctuation(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z0-9\s]/g, "");
}
