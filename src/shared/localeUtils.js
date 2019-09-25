/*
  These utility functions highly depend on locale of the date picker(Persian or Gregorian)
*/

import jalaali from 'jalaali-js';

import {
  PERSIAN_MONTHS,
  GREGORIAN_MONTHS,
  GREGORIAN_WEEK_DAYS,
  PERSIAN_WEEK_DAYS,
  PERSIAN_NUMBERS,
} from './constants';
import { toExtendedDay } from './generalUtils';

const utils = isPersian => {
  const isGregorian = !isPersian;
  const monthsList = isGregorian ? GREGORIAN_MONTHS : PERSIAN_MONTHS;
  const weekDaysList = isGregorian ? GREGORIAN_WEEK_DAYS : PERSIAN_WEEK_DAYS;

  const getToday = () => {
    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const month = todayDate.getMonth() + 1;
    const day = todayDate.getDate();
    if (isGregorian) return { year, month, day };
    const { jy, jm, jd } = jalaali.toJalaali(year, month, day);
    const currentDate = { year: jy, month: jm, day: jd };
    return currentDate;
  };

  const getMonthName = month => monthsList[month - 1];

  const getMonthNumber = monthName => monthsList.indexOf(monthName) + 1;

  const toNativeDate = date => {
    if (isGregorian) return new Date(date.year, date.month - 1, date.day);
    const gregorian = jalaali.toGregorian(...toExtendedDay(date));
    return new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd);
  };

  const getMonthLength = date =>
    isGregorian
      ? new Date(date.year, date.month, 0).getDate()
      : jalaali.jalaaliMonthLength(date.year, date.month);

  const getMonthFirstWeekday = date => {
    const gregorianFirstDay = isGregorian
      ? { gy: date.year, gm: date.month, gd: 1 }
      : jalaali.toGregorian(date.year, date.month, 1);
    const gregorianDate = new Date(
      gregorianFirstDay.gy,
      gregorianFirstDay.gm - 1,
      gregorianFirstDay.gd,
    );
    const weekday = gregorianDate.getDay();
    if (isGregorian) return weekday;
    return weekday < 6 ? weekday + 1 : 0;
  };

  const isBeforeDate = (day1, day2) => {
    if (!day1 || !day2) return false;
    return toNativeDate(day1) < toNativeDate(day2);
  };

  const checkDayInDayRange = ({ day, from, to }) => {
    if (!day || !from || !to) return false;
    const nativeDay = toNativeDate(day);
    const nativeFrom = toNativeDate(from);
    const nativeTo = toNativeDate(to);
    return nativeDay > nativeFrom && nativeDay < nativeTo;
  };

  const getLanguageDigits = digit => {
    if (isGregorian) return digit;
    return digit
      .toString()
      .split('')
      .map(letter => PERSIAN_NUMBERS[Number(letter)])
      .join('');
  };

  return {
    getToday,
    getMonthName,
    getMonthNumber,
    getMonthLength,
    getMonthFirstWeekday,
    isBeforeDate,
    checkDayInDayRange,
    monthsList,
    weekDaysList,
    getLanguageDigits,
  };
};

export default utils;
