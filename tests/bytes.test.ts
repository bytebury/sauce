import { describe, expect, it } from "vitest";
import {
  fromGB,
  fromKB,
  fromMB,
  fromPB,
  fromTB,
  toGB,
  toKB,
  toMB,
  toPB,
  toTB,
} from "../src/bytes.ts";

describe("fromKB", () => {
  it("converts KB to bytes correctly", () => {
    expect(fromKB(1)).toBe(1024);
    expect(fromKB(5)).toBe(5 * 1024);
    expect(fromKB(0.5)).toBe(512);
  });
});

describe("fromMB", () => {
  it("converts MB to bytes correctly", () => {
    expect(fromMB(1)).toBe(1024 ** 2);
    expect(fromMB(5)).toBe(5 * 1024 ** 2);
    expect(fromMB(0.5)).toBe(524288);
  });
});

describe("fromGB", () => {
  it("converts GB to bytes correctly", () => {
    expect(fromGB(1)).toBe(1024 ** 3);
    expect(fromGB(2)).toBe(2 * 1024 ** 3);
  });
});

describe("fromTB", () => {
  it("converts TB to bytes correctly", () => {
    expect(fromTB(1)).toBe(1024 ** 4);
    expect(fromTB(0.5)).toBe(Math.ceil(0.5 * 1024 ** 4));
  });
});

describe("fromPB", () => {
  it("converts PB to bytes correctly", () => {
    expect(fromPB(1)).toBe(1024 ** 5);
    expect(fromPB(0.1)).toBe(Math.ceil(0.1 * 1024 ** 5));
  });
});

describe("toKB", () => {
  it("converts bytes to KB correctly", () => {
    expect(toKB(1024)).toBe(1);
    expect(toKB(5120)).toBe(5);
  });
});

describe("toMB", () => {
  it("converts bytes to MB correctly", () => {
    expect(toMB(1024 ** 2)).toBe(1);
    expect(toMB(5 * 1024 ** 2)).toBe(5);
  });
});

describe("toGB", () => {
  it("converts bytes to GB correctly", () => {
    expect(toGB(1024 ** 3)).toBe(1);
    expect(toGB(2 * 1024 ** 3)).toBe(2);
  });
});

describe("toTB", () => {
  it("converts bytes to TB correctly", () => {
    expect(toTB(1024 ** 4)).toBe(1);
    expect(toTB(0.5 * 1024 ** 4)).toBe(0.5);
  });
});

describe("toPB", () => {
  it("converts bytes to PB correctly", () => {
    expect(toPB(1024 ** 5)).toBe(1);
    expect(toPB(0.1 * 1024 ** 5)).toBe(0.1);
  });
});
