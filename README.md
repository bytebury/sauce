# sauce
🍅 A functional base layer for all things TypeScript / JavaScript. A generic helper library for any sized project to help get you write cleaner code.

## Usage
```ts
import { isNullOrWhitespace, title } from "@bytebury/sauce";
import type { Nullish } from "@bytebury/sauce";

function sayHelloTo(name: Nullish<string>): void {
  if (isNullOrWhitespace(name)) {
    console.log('Hello, Guest!');
    return
  }
  console.log(`Hello, ${title(name))}`);
}
```
