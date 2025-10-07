import { describe, it, expect } from 'vitest';
import { addDays, addMonths, addYears, daysBetween, isFriday, isMonday, isSaturday, isSunday, isThursday, isTuesday, isWednesday, isWeekday, isWeekend, monthsBetween, now, subtractDays, subtractMonths, subtractYears, today, tomorrow, yearsBetween, yesterday } from '../src/dates.ts';


describe("now", () => {
  it("returns a Date object close to current time", () => {
    const n = now();
    expect(n).toBeInstanceOf(Date);
    expect(Math.abs(n.getTime() - new Date().getTime())).toBeLessThan(1000); // within 1 second
  });
});

describe("today", () => {
  it("returns today's date at midnight", () => {
    const t = today();
    expect(t.getHours()).toBe(0);
    expect(t.getMinutes()).toBe(0);
    expect(t.getSeconds()).toBe(0);
    expect(t.getMilliseconds()).toBe(0);
    const nowDate = new Date();
    expect(t.getFullYear()).toBe(nowDate.getFullYear());
    expect(t.getMonth()).toBe(nowDate.getMonth());
    expect(t.getDate()).toBe(nowDate.getDate());
  });
});

describe("tomorrow", () => {
  it("returns tomorrow's date at midnight", () => {
    const t = tomorrow();
    const expected = addDays(today(), 1);
    expect(t.getTime()).toBe(expected.getTime());
  });
});

describe("yesterday", () => {
  it("returns yesterday's date at midnight", () => {
    const t = yesterday();
    const expected = subtractDays(today(), 1);
    expect(t.getTime()).toBe(expected.getTime());
  });
});

describe("addDays / subtractDays", () => {
  it("adds or subtracts the correct number of days", () => {
    const base = new Date(2025, 0, 1); // Jan 1, 2025
    expect(addDays(base, 5).getDate()).toBe(6);
    expect(subtractDays(base, 1).getDate()).toBe(31); // Dec 31, 2024
  });
});

describe("addMonths / subtractMonths", () => {
  it("adds or subtracts months correctly", () => {
    const base = new Date(2025, 0, 31); // Jan 31, 2025
    expect(addMonths(base, 1).getMonth()).toBe(1); // Feb
    expect(subtractMonths(base, 1).getMonth()).toBe(11); // Dec previous year
  });
});

describe("addYears / subtractYears", () => {
  it("adds or subtracts years correctly", () => {
    const base = new Date(2025, 0, 1);
    expect(addYears(base, 2).getFullYear()).toBe(2027);
    expect(subtractYears(base, 2).getFullYear()).toBe(2023);
  });
});

describe("daysBetween", () => {
  it("calculates absolute number of days between two dates", () => {
    const start = new Date(2025, 0, 1);
    const end = new Date(2025, 0, 10);
    expect(daysBetween(start, end)).toBe(9);
    expect(daysBetween(end, start)).toBe(9);
  });
});

describe("monthsBetween", () => {
  it("calculates absolute number of months between two dates", () => {
    const start = new Date(2025, 0, 1);
    const end = new Date(2025, 3, 1);
    expect(monthsBetween(start, end)).toBe(3);
  });
});

describe("yearsBetween", () => {
  it("calculates years correctly based on full-year completion", () => {
    const start = new Date("2007-08-01");
    const end1 = new Date("2008-07-31");
    const end2 = new Date("2008-08-01");
    expect(yearsBetween(start, end1)).toBe(0);
    expect(yearsBetween(start, end2)).toBe(1);
  });
});

describe("isSunday -> isSaturday", () => {
  const base = new Date(2025, 9, 5); // Sunday, Oct 5, 2025
  it("correctly identifies weekdays", () => {
    expect(isSunday(base)).toBe(true);
    expect(isMonday(base)).toBe(false);
    expect(isTuesday(base)).toBe(false);
    expect(isWednesday(base)).toBe(false);
    expect(isThursday(base)).toBe(false);
    expect(isFriday(base)).toBe(false);
    expect(isSaturday(base)).toBe(false);
  });
});

describe("isWeekend / isWeekday", () => {
  it("identifies weekends and weekdays correctly", () => {
    const sunday = new Date(2025, 9, 5);
    const monday = new Date(2025, 9, 6);
    const saturday = new Date(2025, 9, 4);

    expect(isWeekend(sunday)).toBe(true);
    expect(isWeekend(saturday)).toBe(true);
    expect(isWeekend(monday)).toBe(false);

    expect(isWeekday(sunday)).toBe(false);
    expect(isWeekday(monday)).toBe(true);
    expect(isWeekday(saturday)).toBe(false);
  });
});

