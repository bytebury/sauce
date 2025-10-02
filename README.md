# sauce 🍅
A functional base layer for any size application to help get you write cleaner code.

## Installation
```sh
npm i --save @bytebury/sauce
```

## Usage
```ts
import { isNullOrWhitespace, title, sample, wrap } from "@bytebury/sauce";
import type { Nullish } from "@bytebury/sauce";

function sayHelloTo(name: Nullish<string>): void {
  if (isNullOrWhitespace(name)) {
    console.log('Hello, Guest!');
    return;
  }
  console.log(`Hello, ${title(name))}`);
}

// Picks a random item from the list and determines
// if it is greater than the amount given. Null-safe.
function pickAndCheckIfGreaterThan(amount: number): boolean {
  const list = [null, null, 6, 7, 8];
  return wrap(sample(list)).isSomeAnd(x => x > amount);
}
```
