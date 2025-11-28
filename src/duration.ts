/**
 * Returns the number of milliseconds given. Although this
 * just returns the given value, this is useful to portray a function
 * takes in milliseconds.
 *
 * @example
 * milliseconds(500);
 * milliseconds(1_000);
 * setTimeout(() => {}, milliseconds(3_000));
 */
export function milliseconds(ms: number): number {
	return ms;
}

/**
 * Returns the number of seconds as milliseconds.
 *
 * @example
 * seconds(0.5); // 500
 * seconds(1); // 1_000
 * setTimeout(() => {}, seconds(3));
 */
export function seconds(seconds: number): number {
	return seconds * 1_000;
}

/**
 * Returns the number of minutes as milliseconds.
 *
 * @example
 * minutes(0.5); // 30_000
 * minutes(1); // 60_000
 * setTimeout(() => {}, minutes(2)); // 120_000
 */
export function minutes(minutes: number): number {
	return minutes * seconds(60);
}

/**
 * Returns the number of hours as milliseconds.
 *
 * @example
 * hours(0.5); // 1_800_000
 * hours(1);   // 3_600_000
 * setTimeout(() => {}, hours(2)); // 7_200_000
 */
export function hours(hours: number): number {
	return hours * minutes(60);
}

/**
 * Returns the number of days as milliseconds.
 *
 * @example
 * days(0.5); // 43_200_000
 * days(1);   // 86_400_000
 * setTimeout(() => {}, days(3)); // 259_200_000
 */
export function days(days: number): number {
	return days * hours(24);
}
