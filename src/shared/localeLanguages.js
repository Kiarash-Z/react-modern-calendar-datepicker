import jalaali from 'jalaali-js';

import {
  GREGORIAN_MONTHS,
  PERSIAN_MONTHS,
  GREGORIAN_WEEK_DAYS,
  PERSIAN_WEEK_DAYS,
  PERSIAN_NUMBERS,
} from './constants';
import { toExtendedDay } from './generalUtils';

const localeLanguages = {
  en: {
    months: GREGORIAN_MONTHS,
    weekDays: GREGORIAN_WEEK_DAYS,
    weekStartingIndex: 0,
    getToday(gregorainTodayObject) {
      return gregorainTodayObject;
    },
    toNativeDate(date) {
      return new Date(date.year, date.month - 1, date.day);
    },
    getMonthLength(date) {
      return new Date(date.year, date.month, 0).getDate();
    },
    transformDigit(digit) {
      return digit;
    },
    nextMonth: 'Next Month',
    previousMonth: 'Previous Month',
    openMonthSelector: 'Open Month Selector',
    openYearSelector: 'Open Year Selector',
    closeMonthSelector: 'Close Month Selector',
    closeYearSelector: 'Close Year Selector',
    from: 'from',
    to: 'to',
    defaultPlaceholder: 'Select...',
    digitSeparator: ',',
    yearLetterSkip: 0,
    isRtl: false,
  },
  fa: {
    months: PERSIAN_MONTHS,
    weekDays: PERSIAN_WEEK_DAYS,
    weekStartingIndex: 1,
    getToday({ year, month, day }) {
      const { jy, jm, jd } = jalaali.toJalaali(year, month, day);
      return { year: jy, month: jm, day: jd };
    },
    toNativeDate(date) {
      const gregorian = jalaali.toGregorian(...toExtendedDay(date));
      return new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd);
    },
    getMonthLength(date) {
      return jalaali.jalaaliMonthLength(date.year, date.month);
    },
    transformDigit(digit) {
      return digit
        .toString()
        .split('')
        .map(letter => PERSIAN_NUMBERS[Number(letter)])
        .join('');
    },
    nextMonth: 'ماه بعد',
    previousMonth: 'ماه قبل',
    openMonthSelector: 'نمایش انتخابگر ماه',
    openYearSelector: 'نمایش انتخابگر سال',
    closeMonthSelector: 'بستن انتخابگر ماه',
    closeYearSelector: 'بستن انتخابگر ماه',
    from: 'از',
    to: 'تا',
    defaultPlaceholder: 'انتخاب...',
    digitSeparator: '،',
    yearLetterSkip: -2,
    isRtl: true,
  },
};

const getLocaleDetails = locale => {
  if (typeof locale === 'string') return localeLanguages[locale];
  return locale;
};

export { localeLanguages };
export default getLocaleDetails;
