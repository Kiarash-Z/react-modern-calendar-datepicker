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
  'شنبه',
  'یکشنبه',
  'دوشنبه',
  'سه شنبه',
  'چهارشنبه',
  'پنجشنبه',
  'جمعه',
];

export const GREGORIAN_WEEK_DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
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
  weekDays: PropTypes.arrayOf(PropTypes.string),
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
