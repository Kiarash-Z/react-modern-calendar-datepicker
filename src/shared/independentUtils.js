/*
  These utility functions don't depend on locale of the date picker(Persian or Gregorian)
*/

const createUniqueRange = (number, startingId) =>
  Array.from(Array(number).keys()).map(key => ({
    value: key + 1,
    id: `${startingId}-${key}`,
  }));

const isSameDay = (day1, day2) => {
  if (!day1 || !day2) return false;
  return day1.day === day2.day && day1.month === day2.month && day1.year === day2.year;
};

const putZero = number => (number.toString().length === 1 ? `0${number}` : number);

const toExtendedDay = date => [date.year, date.month, date.day];

const shallowCloneObject = obj => ({ ...obj });

const deepCloneObject = obj => JSON.parse(JSON.stringify(obj));

const getDateAccordingToMonth = (date, direction) => {
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

export {
  createUniqueRange,
  isSameDay,
  putZero,
  toExtendedDay,
  shallowCloneObject,
  deepCloneObject,
  getDateAccordingToMonth,
};
