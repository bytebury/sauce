# sauce 🍅

A functional base layer for any size application to help get you write cleaner
code. We provide several small every-day helper functions that are easy to use.
In addition, we offer the `Option` pattern that Rust uses, for clear, safe
null-checks.

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

Sauce provides several helper functions that are useful for any size
application. It has zero dependencies and a small footprint. We also offer
`Option` which is inspired by **[Rust](https://rust-lang.org)**. It helps avoid
Null-pointer Exceptions, and TypeScript does its best to not allow you to hurt
yourself at compile time.

When you call any _string or number function_ in Sauce, you will never
experience a NullException. We will always default a value if null or undefined
is given _or_ if we cannot return a default value, we will return an
`Option<T>`.

In Sauce, we have `Some` and `None` which are exported by Sauce. As the name
implies, `Some` represents a thing that has a value. `None` represents a thing
without a value. In our case, `None === (null || undefined)`. Therefore, you can
create an option three ways:

```ts
// via `Some` - creates an `Option` with the value given wrapped.
const option1 = Some("123");
// via `None` - creates an `Option` with no value (`None`).
const option2 = None;
// via `wrap()` - converts any value to an `Option`.
const option3 = wrap(couldBeAnything);
```

Take for example this code:

```ts
// ⚠️ this might throw an exception if value is null!
function lowerCaseValue(value: string): string {
  return value.toLowerCase();
}

// So instead, to be safe:
function lowerCaseValue(value: string): string {
  if (value === undefined || value === null) {
    return "";
  }
  return value.toLowerCase();
}

// But, we can use Option instead!
function lowerCaseValue(value: Option<string>): string {
  return lower(value.unwrapOr(""));
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

Here's some more example of `Option` at work for reference (but refer to our
documentation for more information). These examples demonstrate that you can
interact with an `Option<T>` before you decide to work with them. This is super
useful especially when doing mapping excersizes.

```ts
const someNumber = Some(4); // Some(4)
const evenNumber = someNumber.filter(isEven); // Some(4)
const oddNumber = someNumber.filter(isEven); // None
const mulByTwo = someNumber.map(x => x * 2); // Some(8)
const mulByFour = None.map(x => x * 2); // None
const mulByTwoOr = someNumber.mapOr(0, x => x * 2); // 8
const mulByFourOr = None.mapOr(0, x => x * 4); // 0

someNumber.inspect(x => console.log(`The number is: ${x}`); // Some(4)
```

We also introduce types to be more explicit in our intentions, these are minor
tweaks to our code, but they really help the future developers.

```ts
// You might often see this:
setTimeout(() => {/* omit */}, 1_800_000); // ⚠️ we'd have to think about this...

// Instead, we offer helpers:
setTimeout(() => {/* omit */}, minutes(30)); // ✅ readable
```

Sauce also supplies types that every application can benefit from. You can read
about all of the types that we
[export here](https://sauce.pizzastate.dev/modules/types.html). It includes
types like: `Autocomplete`, `UnknownRecord`, `UnknownList`, `OneOrMany`,
`NonEmptyList` and more.

## Inspiration

At Bytebury, we use Rust extensively and appreciate how elegantly it handles
null values. TypeScript has `null` and `undefined`, but all too often we find
ourselves writing repetitive null-checks or worse, discovering null-related
errors only at runtime. We think that TypeScript can benefit from the `Option`
pattern that Rust provides. We acknowledge it's not fool-proof. However, it's
made development enjoyable, explicit, and efficient in TypeScript.

We've also included some functions that we personally use all the time, and
therefore, that's included in the library. If you want to use Sauce, and we're
missing a function that you find useful, please feel free to contribute back to
the project.
