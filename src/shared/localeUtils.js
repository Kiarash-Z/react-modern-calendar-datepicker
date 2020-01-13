/*
  These utility functions highly depend on locale of the date picker(Persian or Gregorian)
*/

import getLocaleDetails from './localeLanguages';

const utils = (locale = 'en') => {
  const {
    months: monthsList,
    getToday: localeGetToday,
    toNativeDate,
    getMonthLength,
    weekStartingIndex,
    transformDigit: getLanguageDigits,
  } = typeof locale === 'string' ? getLocaleDetails(locale) : locale;

  const getToday = () => {
    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const month = todayDate.getMonth() + 1;
    const day = todayDate.getDate();
    return localeGetToday({ year, month, day });
  };

  const getMonthName = month => monthsList[month - 1];

  const getMonthNumber = monthName => monthsList.indexOf(monthName) + 1;

  const getMonthFirstWeekday = date => {
    const gregorianDate = toNativeDate({ ...date, day: 1 });
    const weekday = gregorianDate.getDay();
    const dayIndex = weekday + weekStartingIndex;
    return dayIndex % 7;
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

  return {
    getToday,
    getMonthName,
    getMonthNumber,
    getMonthLength,
    getMonthFirstWeekday,
    isBeforeDate,
    checkDayInDayRange,
    getLanguageDigits,
  };
};

export default utils;
