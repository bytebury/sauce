# sauce 🍅
A functional base layer for any size application to help get you write cleaner code.
We provide several small every-day helper functions that are easy to use. In addition,
we offer the `Option` pattern that Rust uses, for clear, safe null-checks.

## Installation
```sh
npm i --save @bytebury/sauce
```

## Usage
```ts
import { title, sample, wrap, isWhitespace } from "@bytebury/sauce";
import { type Option } from "@bytebury/sauce";

function sayHelloTo(name: Option<string>): void {
  if (name.isNoneOr(isWhitespace)) {
    console.log('Hello, Guest!');
    return;
  }
  console.log(`Hello, ${title(name))}`);
}
```

## How Sauce Works
Sauce provides several helper functions that are useful for any size application.
It has zero dependencies and a small footprint. We also offer `Option` which is
inspired by **[Rust](https://rust-lang.org)**. It helps avoid Null-pointer Exceptions,
and TypeScript does its best to not allow you to hurt yourself at compile time.

Take for example this code:

```ts
// ⚠️ this might throw an exception if value is null!
function lowerCaseValue(value: string): string {
  return value.toLowerCase();
}

// So instead, to be safe:
function lowerCaseValue(value: string): string {
  if (value === undefined || value === null) {
    return '';
  }
  return value.toLowerCase();
}

// But, we can use Option instead!
function lowerCaseValue(value: Option<string>): string {
  return lower(value.unwrapOr(''));
}
```

There's a lot of other functions that help do things on `Option`, like
`isNoneOr` and `isSomeAnd`. For example take this code:

```ts
// ⚠️ this might throw an exception if value is null!
function sayHello(name: string): void {
  if (name === undefined || name === null || name.trim().length === 0 {
    console.log('Hello, Guest!');
  } else {
    console.log(`Hello, ${name}`);
  }
}

// However, we can clean this up with sauce 🍅
function sayHello(name: Option<string>): void {
  if (name.isNoneOr(isWhitespace)) {
    console.log('Hello, Guest!');
  } else {
    console.log(`Hello, ${name}`);
  }
}
```

We also introduce types to be more explicit in our intentions, these are minor
tweaks to our code, but they really help the future developers.

```ts
// You might often see this:
setTimeout(() => { /* omit */}, 1_800_000);  // ⚠️ we'd have to think about this...

// Instead, we offer the `Duration` object:
setTimeout(() => { /* omit */}, Duration.minutes(30)); // ✅ readable
```
