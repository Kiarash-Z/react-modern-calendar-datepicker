import React from 'react';

export type Day = {
  year: number;
  month: number;
  day: number;
};

export type DayRange = { from?: Day; to?: Day };

type Value = Day | Day[] | DayRange;

export interface CalendarProps<TValue extends Value> {
  value: TValue;
  onChange?(value: TValue): void;
  onDisabledDayError?(value: Day): void;
  selectorStartingYear?: number;
  selectorEndingYear?: number;
  locale?: string;
  minimumDate?: Day;
  maximumDate?: Day;
  disabledDays?: Day[];
  shouldHighlightWeekends?: boolean;
  colorPrimary?: string;
  colorPrimaryLight?: string;
  slideAnimationDuration?: string;
  calendarClassName?: string;
  calendarTodayClassName?: string;
  calendarSelectedDayClassName?: string;
  calendarRangeStartClassName?: string;
  calendarRangeBetweenClassName?: string;
  calendarRangeEndClassName?: string;
}

export function Calendar(props: Optional<CalendarProps<Day>, 'value'>): React.ReactElement;
export function Calendar(props: CalendarProps<Day[]>): React.ReactElement;
export function Calendar(props: CalendarProps<DayRange>): React.ReactElement;

export type RenderInputProps = {
  ref: React.RefObject<HTMLElement>;
};

export interface DatePickerProps<TValue extends Value> extends CalendarProps<TValue> {
  wrapperClassName?: string;
  inputClassName?: string;
  inputPlaceholder?: string;
  formatInputText?: () => string;
  renderInput?: React.FC<RenderInputProps>;
}

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

declare function DatePicker(props: Optional<DatePickerProps<Day>, 'value'>): React.ReactElement;
declare function DatePicker(props: DatePickerProps<Day[]>): React.ReactElement;
declare function DatePicker(props: DatePickerProps<DayRange>): React.ReactElement;

export type Utils = {
  monthsList: string[];
  weekDaysList: string[];
  getToday(): Day;
  getMonthName(number: number): string;
  getMonthNumber(name: string): number;
  getMonthLength(day: Day): number;
  getMonthFirstWeekday(day: Day): number;
  isBeforeDate(a: Day, b: Day): boolean;
  checkDayInDayRange(props: Required<DayRange> & { day: Day }): boolean;
  getLanguageDigits(digit: string | number): string;
};

export function utils(locale: string): Utils;

export interface Locale {
  months: string[];
  weekDays: string[];
  weekStartingIndex: number;
  getToday: () => Day;
  toNativeDate: () => Date;
  getMonthLength: () => number;
  transformDigit: () => (number | string);
  nextMonth: string;
  previousMonth: string;
  openMonthSelector: string;
  openYearSelector: string;
  closeMonthSelector: string;
  closeYearSelector: string;
  from: string;
  to: string;
  defaultPlaceholder: string;
  digitSeparator: string;
  yearLetterSkip: number;
  isRtl: boolean;
}

export default DatePicker;
