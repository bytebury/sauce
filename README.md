# sauce 🍅
A functional base layer for any size application to help get you write cleaner code.

## Usage
```ts
import { isNullOrWhitespace, title } from "@bytebury/sauce";
import type { Nullish } from "@bytebury/sauce";

function sayHelloTo(name: Nullish<string>): void {
  if (isNullOrWhitespace(name)) {
    console.log('Hello, Guest!');
    return;
  }
  console.log(`Hello, ${title(name))}`);
}
```
