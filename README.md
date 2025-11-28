# sauce 🍅

A functional base layer for any size application to help get you write clean,
safe, and predictable code.

## Installation

```sh
npm i --save @bytebury/sauce
```

## Usage

```ts
import { isWhitespace, title } from "@bytebury/sauce";

function sayHelloTo(name?: string): void {
  if (isWhitespace(name)) {
    console.log("Hello, Guest");
  } else {
    console.log(`Hello, ${title(name)}`);
  }
}
```

## Documentation

You can see all of the available helpers on our
[documentation website](https://sauce.pizzastate.dev).
