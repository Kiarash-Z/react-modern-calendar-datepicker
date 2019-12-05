import {
  GREGORIAN_MONTHS,
  PERSIAN_MONTHS,
  GREGORIAN_WEEK_DAYS,
  PERSIAN_WEEK_DAYS,
} from './constants';

const localeLanguages = {
  en: {
    months: GREGORIAN_MONTHS,
    weekDays: GREGORIAN_WEEK_DAYS,
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

const getLanguageText = locale => localeLanguages[locale];

export default getLanguageText;
