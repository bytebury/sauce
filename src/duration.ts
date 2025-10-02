/**
 * Represents a duration of time, which will always return
 * the duration in milliseconds.
 *
 * @example
 * setTimeout(() => {
 *   console.log("Hello World!");
 * }, Duration.seconds(2));
 */
export const Duration = {
  /** Numeric representation of milliseconds, simply returns what was given. */
  milliseconds: (milliseconds: number): Milliseconds => milliseconds,
  /** Converts the given number of seconds to milliseconds. */
  seconds: (seconds: number): Milliseconds => seconds * 1000,
  /** Converts the given number of minutes to milliseconds. */
  minutes: (minutes: number): Milliseconds => minutes * 60 * 1000,
  /** Converts the given number of hours to milliseconds. */
  hours: (hours: number): Milliseconds => hours * 60 * 60 * 1000,
  /** Converts the given number of days to milliseconds. */
  days: (days: number): Milliseconds => days * 24 * 60 * 60 * 1000,
};

type Milliseconds = number;
