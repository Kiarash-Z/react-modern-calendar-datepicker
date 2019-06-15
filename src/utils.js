import jalaali from 'jalaali-js';

const PERSIAN_NUMBERS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const PERSIAN_MONTHS = [
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

const WEEK_DAYS = {
  saturday: 'شنبه',
  sunday: 'یکشنبه',
  monday: 'دوشنبه',
  tuesday: 'سه شنبه',
  wednesday: 'چهارشنبه',
  thursday: 'پنجشنبه',
  friday: 'جمعه',
};

const getToday = () => {
  const todayDate = new Date();
  const todayYear = todayDate.getFullYear();
  const todayMonth = todayDate.getMonth() + 1;
  const todayDay = todayDate.getDate();
  const { jy: J_YEAR, jm: J_MONTH, jd: J_DAY } = jalaali.toJalaali(todayYear, todayMonth, todayDay);
  const currentDate = { year: J_YEAR, month: J_MONTH, day: J_DAY };
  return currentDate;
};

const createUniqueRange = (number, startingId) =>
  Array.from(Array(number).keys()).map(key => ({
    value: key + 1,
    id: `${startingId}-${key}`,
  }));

const toPersianNumber = number =>
  number
    .toString()
    .split('')
    .map(letter => PERSIAN_NUMBERS[Number(letter)])
    .join('');

const getMonthName = month => PERSIAN_MONTHS[month - 1];

const getMonthLength = date => jalaali.jalaaliMonthLength(date.year, date.month);

const getMonthFirstWeekday = _date => {
  const gregorianFirstDay = jalaali.toGregorian(_date.year, _date.month, 1);
  const gregorianDate = new Date(
    gregorianFirstDay.gy,
    gregorianFirstDay.gm - 1,
    gregorianFirstDay.gd,
  );
  const weekday = gregorianDate.getDay();
  return weekday < 6 ? weekday + 1 : 0;
};

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

const isSameDay = (day1, day2) => {
  if (!day1 || !day2) return false;
  return day1.day === day2.day && day1.month === day2.month && day1.year === day2.year;
};

const toExtendedDay = date => [date.year, date.month, date.day];

const toNativeDate = date => {
  const gregorian = jalaali.toGregorian(...toExtendedDay(date));
  return new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd);
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

const putZero = number => (number.toString().length === 1 ? `0${number}` : number);

const shallowCloneObject = obj => ({ ...obj });

const deepCloneObject = obj => JSON.parse(JSON.stringify(obj));

export {
  WEEK_DAYS,
  PERSIAN_MONTHS,
  getToday,
  toPersianNumber,
  createUniqueRange,
  getMonthName,
  getMonthLength,
  getMonthFirstWeekday,
  getDateAccordingToMonth,
  isSameDay,
  checkDayInDayRange,
  isBeforeDate,
  putZero,
  shallowCloneObject,
  deepCloneObject,
};
