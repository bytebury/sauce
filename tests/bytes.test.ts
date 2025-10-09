import { describe, expect, it } from "vitest";
import { ByteConverter } from "../src/bytes.ts";

describe("ByteConverter", () => {
  describe("bytes", () => {
    it("returns the same number if integer", () => {
      expect(ByteConverter.bytes(42)).toBe(42);
    });

    it("ceil decimals", () => {
      expect(ByteConverter.bytes(42.3)).toBe(43);
      expect(ByteConverter.bytes(0.1)).toBe(1);
    });
  });

  describe("kilobytes", () => {
    it("converts kilobytes to bytes", () => {
      expect(ByteConverter.kilobytes(1)).toBe(1024);
      expect(ByteConverter.kilobytes(1.5)).toBe(Math.ceil(1.5 * 1024));
    });
  });

  describe("megabytes", () => {
    it("converts megabytes to bytes", () => {
      expect(ByteConverter.megabytes(1)).toBe(1024 ** 2);
      expect(ByteConverter.megabytes(1.2)).toBe(Math.ceil(1.2 * 1024 ** 2));
    });
  });

  describe("gigabytes", () => {
    it("converts gigabytes to bytes", () => {
      expect(ByteConverter.gigabytes(1)).toBe(1024 ** 3);
      expect(ByteConverter.gigabytes(1.7)).toBe(Math.ceil(1.7 * 1024 ** 3));
    });
  });

  describe("terabytes", () => {
    it("converts terabytes to bytes", () => {
      expect(ByteConverter.terabytes(1)).toBe(1024 ** 4);
      expect(ByteConverter.terabytes(0.5)).toBe(Math.ceil(0.5 * 1024 ** 4));
    });
  });

  describe("petabytes", () => {
    it("converts petabytes to bytes", () => {
      expect(ByteConverter.petabytes(1)).toBe(1024 ** 5);
      expect(ByteConverter.petabytes(2.3)).toBe(Math.ceil(2.3 * 1024 ** 5));
    });
  });
});
