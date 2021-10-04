import { TYPE_SINGLE_DATE, TYPE_RANGE, TYPE_MUTLI_DATE } from './constants';

export const hasProperty = (object, propertyName) => (object || {}).hasOwnProperty(propertyName);

/*
  These utility functions don't depend on locale of the date picker(Persian or Gregorian)
*/

export const getDateAccordingToMonth = (date, direction) => {
  const toSum = direction === 'NEXT' ? 1 : -1;
  let newMonthIndex = date.month + toSum;
  let newYear = date.year;
  if (newMonthIndex < 1) {
    newMonthIndex = 12;
    newYear -= 1;
  }
  if (newMonthIndex > 12) {
    newMonthIndex = 1;
    newYear += 1;
  }
  const newDate = { year: newYear, month: newMonthIndex, day: 1 };
  return newDate;
};

export const createUniqueRange = (number, startingId) =>
  Array.from(Array(number).keys()).map(key => ({
    value: key + 1,
    id: `${startingId}-${key}`,
  }));

export const isSameDay = (day1, day2) => {
  if (!day1 || !day2) return false;
  return day1.day === day2.day && day1.month === day2.month && day1.year === day2.year;
};

export const putZero = number => (number.toString().length === 1 ? `0${number}` : number);

export const toExtendedDay = date => [date.year, date.month, date.day];

export const shallowClone = value => ({ ...value });

export const deepCloneObject = obj =>
  JSON.parse(JSON.stringify(obj, (key, value) => (typeof value === 'undefined' ? null : value)));

export const getValueType = value => {
  if (Array.isArray(value)) return TYPE_MUTLI_DATE;
  if (hasProperty(value, 'from') && hasProperty(value, 'to')) return TYPE_RANGE;
  if (
    !value ||
    (hasProperty(value, 'year') && hasProperty(value, 'month') && hasProperty(value, 'day'))
  ) {
    return TYPE_SINGLE_DATE;
  }
  throw new TypeError(
    `The passed value is malformed! Please make sure you're using one of the valid value types for date picker.`,
  );
};
