import {
  toPersianNumber,
  getMonthName,
  PERSIAN_MONTHS,
  getMonthLength,
  getMonthFirstWeekday,
  getDateAccordingToMonth,
  isSameDay,
  isBeforeDate,
  checkDayInDayRange,
  putZero,
} from '../src/utils';

describe('Utility Functions', () => {
  test('should convert English numbers to Persian numbers', () => {
    const englishString = '0123';
    const persianSring = '۰۱۲۳';
    expect(toPersianNumber(englishString)).toBe(persianSring);
  });

  test('should return month name according to its index', () => {
    expect(getMonthName(7)).toBe(PERSIAN_MONTHS[6]);
  });

  test('should return month length', () => {
    const monthWith31Days = { year: 1398, month: 1, day: 1 };
    const monthWith30Days = { year: 1398, month: 7, day: 1 };
    const leapMonth = { year: 1395, month: 12, day: 1 };
    expect(getMonthLength(monthWith31Days)).toBe(31);
    expect(getMonthLength(monthWith30Days)).toBe(30);
    expect(getMonthLength(leapMonth)).toBe(30);
  });

  test('should return the first weekday of the passed month', () => {
    const date = { year: 1398, month: 1, day: 1 };
    expect(getMonthFirstWeekday(date)).toBe(5);
  });

  test('should return the next or previous month according to date', () => {
    const thisMonth = { year: 1398, month: 12, day: 1 };
    const nextMonth = { year: 1399, month: 1, day: 1 };
    const previousMonth = { year: 1398, month: 11, day: 1 };
    expect(getDateAccordingToMonth(thisMonth, 'NEXT')).toEqual(nextMonth);
    expect(getDateAccordingToMonth(thisMonth, 'PREVIOUS')).toEqual(previousMonth);
  });

  test('should return whether the passed days are equal', () => {
    const day1 = { year: 1398, month: 7, day: 26 };
    const day2 = { year: 1398, month: 7, day: 26 };
    const day3 = { year: 1398, month: 6, day: 22 };
    expect(isSameDay(day1, day2)).toBe(true);
    expect(isSameDay(day1, day3)).toBe(false);
  });

  test('should return whether a day is before another', () => {
    const day1 = { year: 1398, month: 1, day: 1 };
    const day2 = { year: 1398, month: 1, day: 2 };
    expect(isBeforeDate(day1, day2)).toBe(true);
    expect(isBeforeDate(day2, day1)).toBe(false);
  });

  test('should return true if a day is in a range', () => {
    const day = { year: 1398, month: 1, day: 3 };
    const range = {
      from: { year: 1398, month: 1, day: 1 },
      to: { year: 1398, month: 1, day: 5 },
    };
    expect(checkDayInDayRange({ ...range, day })).toBe(true);
  });

  test('should prepend a zero on a single-digit number', () => {
    expect(putZero('1')).toBe('01');
    expect(putZero('12')).toBe('12');
  });
});
