/**
 * Convert bytes to other kinds of byte sizing.
 *
 * All functions will return their size in bytes.
 *
 * @example
 * ByteConverter.bytes(10_000); // 10_000
 * ByteConverter.megabytes(5); // 5_242_880
 */
export const ByteConverter = {
  /**
   * Converts the bytes to bytes.
   *
   * This just returns what was entered. If a decimal is passed,
   * this will take the ceil.
   */
  bytes: (b: number): Milliseconds => Math.ceil(b),
  /** Converts kilobytes to bytes. */
  kilobytes: (kb: number): Milliseconds => Math.ceil(kb * 1024),
  /** Converts megabytes to bytes. */
  megabytes: (mb: number): Milliseconds => Math.ceil(mb * 1024 ** 2),
  /** Converts gigabytes to bytes. */
  gigabytes: (gb: number): Milliseconds => Math.ceil(gb * 1024 ** 3),
  /** Converts terabytes to bytes. */
  terabytes: (tb: number): Milliseconds => Math.ceil(tb * 1024 ** 4),
  /** Converts petabytes to bytes. */
  petabytes: (pb: number): Milliseconds => Math.ceil(pb * 1024 ** 5),
};

type Milliseconds = number;
