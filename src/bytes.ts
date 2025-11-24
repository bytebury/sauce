/**
 * Converts kilobytes to bytes.
 *
 * @throws
 * An error when the value given is negative.
 */
export function fromKB(kb: number): number {
  if (kb < 0) throw new Error("kb cannot be negative");
  return Math.ceil(kb * 1024);
}

/**
 * Converts megabytes to bytes.
 *
 * @throws
 * An error when the value given is negative.
 */
export function fromMB(mb: number): number {
  if (mb < 0) throw new Error("mb cannot be negative");
  return Math.ceil(mb * 1024 ** 2);
}

/**
 * Converts gigabytes to bytes.
 *
 * @throws
 * An error when the value given is negative.
 */
export function fromGB(gb: number): number {
  if (gb < 0) throw new Error("gb cannot be negative");
  return Math.ceil(gb * 1024 ** 3);
}

/**
 * Converts terabytes to bytes.
 *
 * @throws
 * An error when the value given is negative.
 */
export function fromTB(tb: number): number {
  if (tb < 0) throw new Error("tb cannot be negative");
  return Math.ceil(tb * 1024 ** 4);
}

/**
 * Converts petabytes to bytes.
 *
 * @throws
 * An error when the value given is negative.
 */
export function fromPB(pb: number): number {
  if (pb < 0) throw new Error("pb cannot be negative");
  return Math.ceil(pb * 1024 ** 5);
}

/**
 * Converts bytes to kilobytes.
 *
 * @throws
 * An error when the bytes given is negative.
 */
export function toKB(bytes: number): number {
  if (bytes < 0) throw new Error("bytes cannot be negative");
  return bytes / 1024;
}

/**
 * Converts bytes to megabytes.
 *
 * @throws
 * An error when the bytes given is negative.
 */
export function toMB(bytes: number): number {
  if (bytes < 0) throw new Error("bytes cannot be negative");
  return bytes / (1024 ** 2);
}

/**
 * Converts bytes to gigabytes.
 *
 * @throws
 * An error when the bytes given is negative.
 */
export function toGB(bytes: number): number {
  if (bytes < 0) throw new Error("bytes cannot be negative");
  return bytes / (1024 ** 3);
}

/**
 * Converts bytes to terabytes.
 *
 * @throws
 * An error when the bytes given is negative.
 */
export function toTB(bytes: number): number {
  if (bytes < 0) throw new Error("bytes cannot be negative");
  return bytes / (1024 ** 4);
}

/**
 * Converts bytes to petabytes.
 *
 * @throws
 * An error when the bytes given is negative.
 */
export function toPB(bytes: number): number {
  if (bytes < 0) throw new Error("bytes cannot be negative");
  return bytes / (1024 ** 5);
}
