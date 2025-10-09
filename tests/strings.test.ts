import { describe, expect, it } from "vitest";
import {
  alphanumeric,
  isNotWhitespace,
  isWhitespace,
  kebab,
  lower,
  numeric,
  snake,
  title,
  trim,
  upper,
} from "../src/strings.ts";

describe("trim", () => {
  it("trims leading and trailing whitespace", () => {
    expect(trim(" hello ")).toBe("hello");
    expect(trim(null as any)).toBe("");
    expect(trim(undefined as any)).toBe("");
    expect(trim("\nworld\t")).toBe("world");
  });
});

describe("isWhitespace", () => {
  it("should return true when the text is only comprised of whitespace", () => {
    expect(isWhitespace("  ")).toBe(true);
    expect(isWhitespace("\n")).toBe(true);
    expect(isWhitespace("")).toBe(true);
    expect(isWhitespace(null as any)).toBe(true);
    expect(isWhitespace(undefined as any)).toBe(true);
  });
});

describe("notWhitespace", () => {
  it("should return true when the text is only comprised of whitespace", () => {
    expect(isNotWhitespace(" %")).toBe(true);
    expect(isNotWhitespace(" t ")).toBe(true);
    expect(isNotWhitespace("Hello  World")).toBe(true);
    expect(isNotWhitespace(null as any)).toBe(false);
    expect(isNotWhitespace(undefined as any)).toBe(false);
  });
});

describe("title", () => {
  it("capitalizes first letter of each word, underscores converted to spaces", () => {
    expect(title("hello world")).toBe("Hello World");
    expect(title("hello-world")).toBe("Hello-world");
    expect(title("hello_world")).toBe("Hello World");
    expect(title("HELLO wORLD")).toBe("Hello World");
    expect(title(null as any)).toBe("");
    expect(title(undefined as any)).toBe("");
  });
});

describe("lower", () => {
  it("converts string to lowercase", () => {
    expect(lower("HELLO")).toBe("hello");
    expect(lower("Hello World")).toBe("hello world");
    expect(lower(null as any)).toBe("");
    expect(lower(undefined as any)).toBe("");
  });
});

describe("upper", () => {
  it("converts string to uppercase", () => {
    expect(upper("hello")).toBe("HELLO");
    expect(upper("Hello World")).toBe("HELLO WORLD");
    expect(upper(null as any)).toBe("");
    expect(upper(undefined as any)).toBe("");
  });
});

describe("kebab", () => {
  it("converts text to kebab-case", () => {
    expect(kebab("Hello World")).toBe("hello-world");
    expect(kebab("hello_world!")).toBe("hello-world");
    expect(kebab("Hello, World!!!")).toBe("hello-world");
    expect(kebab(null as any)).toBe("");
    expect(kebab(undefined as any)).toBe("");
  });
});

describe("snake", () => {
  it("converts text to snake_case", () => {
    expect(snake("Hello World")).toBe("hello_world");
    expect(snake("hello-world!")).toBe("hello_world");
    expect(snake("Hello, World!!!")).toBe("hello_world");
    expect(snake(null as any)).toBe("");
    expect(snake(undefined as any)).toBe("");
  });
});

describe("alphanumeric", () => {
  it("removes non-alphanumeric characters except spaces", () => {
    expect(alphanumeric("Hello, World! 123")).toBe("Hello World 123");
    expect(alphanumeric("abc$%^123")).toBe("abc123");
    expect(alphanumeric(null as any)).toBe("");
    expect(alphanumeric(undefined as any)).toBe("");
  });
});

describe("numeric", () => {
  it("removes non-numeric characters", () => {
    expect(numeric("123abc456")).toBe("123456");
    expect(numeric("Phone: 555-1234")).toBe("5551234");
    expect(numeric(null as any)).toBe("");
    expect(numeric(undefined as any)).toBe("");
  });
});
