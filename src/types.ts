/**
 * This is a utility type that allows you to Autocomplete a string.
 *
 * For example, let's say you have a situation where you would like an input
 * autocompleted with suggestion, but you also want people to be able to type
 * whatever they want. This would come in handy.
 *
 * @example
 * function setUserRole(role: AutoComplete<'free' | 'paid' | 'admin'>): void {
 *  // omitted
 * }
 */
export type AutoComplete<T extends string> = T | (string & UnknownRecord);

/**
 * This is a utility type that allows you to get the keys from an object or list.
 *
 * If `T` is a type of list, then this behaves the same as `ValuesOf`.
 *
 * @example
 * const MyEnum = { foo: 'bar', another: 'baz' } as const;
 * const MyList = ['apple', 'banana', 'orange'] as const;
 *
 * function example(param: KeyOf<typeof MyEnum>): void {
 *   // param would be: "foo" | "another"
 * }
 *
 * function example2(param: KeyOf<typeof MyList): void {
 *   // param would be: "apple" | "banana" | "orange"
 * }
 */
export type KeyOf<T> = T extends UnknownList ? ValueOf<T> : keyof T;

/**
 * This is a utility type that allows you to get the values from an object
 * or a list.
 *
 * @example
 * const MyEnum = { foo: 'bar', another: 'baz' } as const;
 * const MyList = ['apple', 'banana', 'orange'] as const;
 *
 * function example(param: ValueOf<typeof MyEnum>): void {
 *   // param would be: "bar" | "baz"
 * }
 *
 * function example2(param: ValueOf<typeof MyList): void {
 *   // param would be: "apple" | "banana" | "orange"
 * }
 */
export type ValueOf<T> = T extends UnknownList ? T[number] : T[keyof T];

/**
 * Represents an object with `unknown` value. This is typically
 * a better usecase than just using `{}`.
 */
export type UnknownRecord = Record<PropertyKey, unknown>;

/**
 * Represents a list with `unknown` values. Useful for when you
 * want a type that all lists can be assigned to, but you don't care
 * about the value.
 */
export type UnknownList = unknown[];

/**
 * Represents a set with `unknown` values.
 */
export type UnknownSet = Set<unknown>;

/**
 * Represents an `unknown` Map
 */
export type UnknownMap = Map<unknown, unknown>;

/**
 * Represents any primitive ECMAScript value.
 */
export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined;

/**
 * Represents when there can be one or many of someting
 */
export type OneOrMany<T> = T | T[];

/**
 * Represents a non-empty list.
 */
export type NonEmptyList<T> = [T, ...T[]];

/**
 * Represents a thing that might be `None` (null or undefined).
 */
export type Nullish<T> = T | Nothing;

/**
 * A utility type that takes an nobject type and makes the hover overlay
 * more readable for the developer.
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

/**
 * Represents a byte unit.
 */
export type ByteUnit = "KB" | "MB" | "GB" | "TB" | "TB";

/**
 * Syntactic sugar for `null | undefined`.
 */
export type Nothing = null | undefined;
