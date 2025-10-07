/**
 * Determines if the given number is even.
 *
 * @example
 * isEven(0); // true
 * isEven(5); // false
 */
export function isEven(num: number): boolean {
  return (num || 0) % 2 === 0;
}

/**
 * Determines if the given number is odd.
 *
 * @example
 * isOdd(1); // true
 * isOdd(4); // false
 */
export function isOdd(num: number): boolean {
  return !isEven(num);
}

/**
 * Converts a number to "1st", "2nd", "3rd", etc.
 *
 * @example
 * ordinalize(1); // "1st"
 * ordinalize(2); // "2nd"
 * ordinalize(3); // "3rd"
 * ordinalize(4); // "4th"
 * ordinalize(11); // "11th"
 * ordinalize(21); // "21st"
 * ordinalize(112); // "112th"
 */
export function ordinalize(num: number): string {
  num ||= 0;

  const v = num % 100;

  if (v >= 11 && v <= 13) return num + "th";

  switch (num % 10) {
    case 1:
      return num + "st";
    case 2:
      return num + "nd";
    case 3:
      return num + "rd";
    default:
      return num + "th";
  }
}
