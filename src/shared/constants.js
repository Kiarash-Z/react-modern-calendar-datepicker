import PropTypes from 'prop-types';

export const PERSIAN_NUMBERS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export const PERSIAN_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

export const GREGORIAN_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const PERSIAN_WEEK_DAYS = [
  {
    name: 'شنبه',
    short: 'ش',
  },
  {
    name: 'یکشنبه',
    short: 'ی',
  },
  {
    name: 'دوشنبه',
    short: 'د',
  },
  {
    name: 'سه شنبه',
    short: 'س',
  },
  {
    name: 'چهارشنبه',
    short: 'چ',
  },
  {
    name: 'پنجشنبه',
    short: 'پ',
  },
  {
    name: 'جمعه',
    short: 'ج',
    isWeekend: true,
  },
];

export const GREGORIAN_WEEK_DAYS = [
  {
    name: 'Sunday',
    short: 'S',
    isWeekend: true,
  },
  {
    name: 'Monday',
    short: 'M',
  },
  {
    name: 'Tuesday',
    short: 'T',
  },
  {
    name: 'Wednesday',
    short: 'W',
  },
  {
    name: 'Thursday',
    short: 'T',
  },
  {
    name: 'Friday',
    short: 'F',
  },
  {
    name: 'Saturday',
    short: 'S',
    isWeekend: true,
  },
];

export const DAY_SHAPE = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
};

export const MINIMUM_SELECTABLE_YEAR_SUBTRACT = 100;

export const MAXIMUM_SELECTABLE_YEAR_SUM = 50;

export const TYPE_SINGLE_DATE = 'SINGLE_DATE';
export const TYPE_RANGE = 'RANGE';
export const TYPE_MUTLI_DATE = 'MUTLI_DATE';

export const LOCALE_SHAPE = PropTypes.shape({
  months: PropTypes.arrayOf(PropTypes.string),
  weekDays: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      short: PropTypes.string,
      isWeekend: PropTypes.bool,
    }),
  ),
  weekStartingIndex: PropTypes.number,
  getToday: PropTypes.func,
  toNativeDate: PropTypes.func,
  getMonthLength: PropTypes.func,
  transformDigit: PropTypes.func,
  nextMonth: PropTypes.string,
  previousMonth: PropTypes.string,
  openMonthSelector: PropTypes.string,
  openYearSelector: PropTypes.string,
  closeMonthSelector: PropTypes.string,
  closeYearSelector: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string,
  defaultPlaceholder: PropTypes.string,
  digitSeparator: PropTypes.string,
  yearLetterSkip: PropTypes.number,
  isRtl: PropTypes.bool,
});
