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
