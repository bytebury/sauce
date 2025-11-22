/**
 * Convert bytes to other kinds of byte sizing.
 *
 * All functions will return their size in bytes.
 *
 * @example
 * Bytes.bytes(10_000); // 10_000
 * Bytes.megabytes(5); // 5_242_880
 */
export const Bytes = {
  /**
   * Converts the bytes to bytes.
   *
   * This just returns what was entered. If a decimal is passed,
   * this will take the ceil.
   */
  bytes: (b: number): number => Math.ceil(b),
  /** Converts kilobytes to bytes. */
  kilobytes: (kb: number): number => Math.ceil(kb * 1024),
  /** Converts megabytes to bytes. */
  megabytes: (mb: number): number => Math.ceil(mb * 1024 ** 2),
  /** Converts gigabytes to bytes. */
  gigabytes: (gb: number): number => Math.ceil(gb * 1024 ** 3),
  /** Converts terabytes to bytes. */
  terabytes: (tb: number): number => Math.ceil(tb * 1024 ** 4),
  /** Converts petabytes to bytes. */
  petabytes: (pb: number): number => Math.ceil(pb * 1024 ** 5),
};
