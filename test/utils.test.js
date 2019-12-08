import utils from '../src/shared/localeUtils';
import {
  putZero,
  isSameDay,
  getDateAccordingToMonth,
  getValueType,
  toExtendedDay,
  deepCloneObject,
} from '../src/shared/generalUtils';
import {
  PERSIAN_MONTHS,
  GREGORIAN_MONTHS,
  TYPE_SINGLE_DATE,
  TYPE_RANGE,
  TYPE_MUTLI_DATE,
} from '../src/shared/constants';

describe('Utility Functions', () => {
  describe('General Utilities', () => {
    test('returns the next or previous month according to date', () => {
      const thisMonth = { year: 2000, month: 12, day: 1 };
      const nextMonth = { year: 2001, month: 1, day: 1 };
      const previousMonth = { year: 2000, month: 11, day: 1 };
      expect(getDateAccordingToMonth(thisMonth, 'NEXT')).toEqual(nextMonth);
      expect(getDateAccordingToMonth(nextMonth, 'PREVIOUS')).toEqual(thisMonth);
      expect(getDateAccordingToMonth(thisMonth, 'PREVIOUS')).toEqual(previousMonth);
    });

    test('prepends a zero on a single-digit number', () => {
      expect(putZero('1')).toBe('01');
      expect(putZero('12')).toBe('12');
    });

    test('returns whether the passed days are equal', () => {
      const day1 = { year: 2001, month: 10, day: 18 };
      const day2 = { year: 2001, month: 10, day: 18 };
      const day3 = { year: 2000, month: 6, day: 22 };
      expect(isSameDay(day1, day2)).toBe(true);
      expect(isSameDay(day1, day3)).toBe(false);
      expect(isSameDay(null, day3)).toBe(false);
    });

    test('transforms a date object into an array', () => {
      const date = { year: 2019, month: 10, day: 1 };
      const extendedDate = toExtendedDay(date);
      expect(extendedDate[0]).toBe(date.year);
      expect(extendedDate[1]).toBe(date.month);
      expect(extendedDate[2]).toBe(date.day);
    });

    test('indicates the value type', () => {
      const singleDate = { year: 2001, month: 10, day: 18 };
      const rangeDate = {
        from: { year: 2000, month: 1, day: 1 },
        to: { year: 2001, month: 1, day: 1 },
      };
      const multiDate = [
        { year: 2000, month: 1, day: 1 },
        { year: 2000, month: 1, day: 5 },
        { year: 2000, month: 1, day: 10 },
      ];
      expect(getValueType(singleDate)).toBe(TYPE_SINGLE_DATE);
      expect(getValueType(rangeDate)).toBe(TYPE_RANGE);
      expect(getValueType(multiDate)).toBe(TYPE_MUTLI_DATE);
    });

    test('throws an error for malformed value', () => {
      const malformedDate = { name: 'Kiarash' };
      expect(() => {
        getValueType(malformedDate);
      }).toThrow(TypeError);
    });

    test('includes undefined values in deep cloning object', () => {
      expect(deepCloneObject({ from: undefined, to: undefined })).toEqual({
        from: null,
        to: null,
      });
    });
  });

  describe('Language Dependent Utilities', () => {
    let gregorianUtils = null;
    let persianUtils = null;

    beforeAll(() => {
      gregorianUtils = utils();
      persianUtils = utils('fa');
    });

    test('returns correct language digits', () => {
      const englishDigits = '0123';
      const persianDigits = '۰۱۲۳';
      expect(gregorianUtils.getLanguageDigits(englishDigits)).toBe(englishDigits);
      expect(persianUtils.getLanguageDigits(englishDigits)).toBe(persianDigits);
    });

    test('returns month name according to its index', () => {
      expect(persianUtils.getMonthName(7)).toBe(PERSIAN_MONTHS[6]);
      expect(gregorianUtils.getMonthName(7)).toBe(GREGORIAN_MONTHS[6]);
    });

    test('returns month length', () => {
      const persianMonthWith31Days = { year: 1398, month: 1, day: 1 };
      const persianMonthWith30Days = { year: 1398, month: 7, day: 1 };
      const persianLeapMonth = { year: 1395, month: 12, day: 1 };
      const gregorianMonthWith31Days = { year: 2019, month: 10, day: 1 };
      const gregorianMonthWith30Days = { year: 2019, month: 9, day: 1 };
      const gregorianLeapMonth = { year: 2020, month: 2, day: 1 };
      expect(persianUtils.getMonthLength(persianMonthWith31Days)).toBe(31);
      expect(persianUtils.getMonthLength(persianMonthWith30Days)).toBe(30);
      expect(persianUtils.getMonthLength(persianLeapMonth)).toBe(30);
      expect(gregorianUtils.getMonthLength(gregorianMonthWith31Days)).toBe(31);
      expect(gregorianUtils.getMonthLength(gregorianMonthWith30Days)).toBe(30);
      expect(gregorianUtils.getMonthLength(gregorianLeapMonth)).toBe(29);
    });

    test('returns the first weekday of the passed month', () => {
      const persianDate = { year: 1398, month: 1, day: 1 };
      const persianMonthStartingWithSaturday = { year: 1398, month: 4, day: 1 };
      const gregorianDate = { year: 2019, month: 9, day: 1 };
      expect(persianUtils.getMonthFirstWeekday(persianDate)).toBe(5);
      expect(gregorianUtils.getMonthFirstWeekday(gregorianDate)).toBe(0);
      expect(persianUtils.getMonthFirstWeekday(persianMonthStartingWithSaturday)).toBe(0);
    });

    test('returns whether a day is before another', () => {
      const gregorianDay1 = { year: 2001, month: 1, day: 1 };
      const gregorianDay2 = { year: 2001, month: 1, day: 2 };

      expect(gregorianUtils.isBeforeDate(gregorianDay1, gregorianDay2)).toBe(true);
      expect(gregorianUtils.isBeforeDate(gregorianDay2, gregorianDay1)).toBe(false);

      const persianDay1 = { year: 1398, month: 8, day: 1 };
      const persianDay2 = { year: 1398, month: 8, day: 2 };
      expect(persianUtils.isBeforeDate(persianDay1, persianDay2)).toBe(true);
      expect(persianUtils.isBeforeDate(persianDay2, persianDay1)).toBe(false);
    });

    test('returns if a day is in a range', () => {
      const dayInRange = { year: 2001, month: 1, day: 3 };
      const dayNotInRange = { year: 2001, month: 1, day: 7 };
      const range = {
        from: { year: 2001, month: 1, day: 1 },
        to: { year: 2001, month: 1, day: 5 },
      };
      expect(gregorianUtils.checkDayInDayRange({ ...range, day: dayInRange })).toBe(true);
      expect(gregorianUtils.checkDayInDayRange({ ...range, day: dayNotInRange })).toBe(false);
    });
  });
});
