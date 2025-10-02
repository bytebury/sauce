import { describe, it, expect } from "vitest";
import { wrap } from "../src/option";

describe('#unwrap', () => {
  it('should unwrap the value', () => {
    expect(wrap(true).unwrap()).toBe(true);
  });

  it('should unwrap but throw an error when null', () => {
    expect(() => wrap(null).unwrap()).toThrowError('Trying to unwrap a value that is null or undefined');
  });

  it('should unwrap but throw an error when undefined', () => {
    expect(() => wrap(undefined).unwrap()).toThrowError('Trying to unwrap a value that is null or undefined');
  });
});

describe('#unwrapOr', () => {
  it('should unwrap the value', () => {
    expect(wrap('hello world').unwrapOr('another string')).toBe('hello world');
  });

  it('should be unable to unwrap the value and return the given value', () => {
    expect(wrap(null).unwrapOr('another string')).toBe('another string');
  });

  it('should be unable to unwrap the value and return the given value', () => {
    expect(wrap(undefined).unwrapOr('another string')).toBe('another string');
  });
});

describe('#unwrapAnd', () => {
  it('should unwrap the value and then do something to it', () => {
    expect(wrap(3).unwrapAnd(x => x + 2)).toBe(5);
  });

  it('should be unable to unwrap the value and throw an error', () => {
    expect(() => wrap(undefined as unknown as number).unwrapAnd(x => x + 2)).toThrowError('Trying to unwrap a value that is null or undefined');
  });

  it('should be unable to unwrap the value and throw an error', () => {
    expect(() => wrap(null as unknown as number).unwrapAnd(x => x + 2)).toThrowError('Trying to unwrap a value that is null or undefined');
  });
});
