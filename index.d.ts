import React from 'react';

export type Day = {
  year: number;
  month: number;
  day: number;
};

export type Range<T> = { from?: T; to?: T };

type Value = Day | Day[] | Range<Day>;

export interface CalendarProps<TValue extends Value> {
  value: TValue;
  onChange?(value: TValue): void;
  onDisabledDayError?(value: Day): void;
  selectorStartingYear?: number;
  selectorEndingYear?: number;
  isPersian?: boolean;
  minimumDate?: Day;
  maximumDate?: Day;
  disabledDays?: Day[];
  shouldHighlightWeekends?: boolean;
  colorPrimary?: string;
  colorPrimaryLight?: string;
  calendarClassName?: string;
  calendarTodayClassName?: string;
  calendarSelectedDayClassName?: string;
  calendarRangeStartClassName?: string;
  calendarRangeBetweenClassName?: string;
  calendarRangeEndClassName?: string;
}

export function Calendar(props: Optional<CalendarProps<Day>, 'value'>): React.ReactElement;
export function Calendar(props: CalendarProps<Day[]>): React.ReactElement;
export function Calendar(props: CalendarProps<Range<Day>>): React.ReactElement;

export type RenderInputProps = {
  ref: React.RefObject<HTMLElement>;
  onFocus: React.FocusEventHandler<HTMLElement>;
  onBlur: React.FormEventHandler<HTMLElement>;
};

export interface DatePickerProps<TValue extends Value> extends CalendarProps<TValue> {
  wrapperClassName?: string;
  inputClassName?: string;
  inputPlaceholder?: string;
  formatInputText?: () => string;
  renderInput?: React.FC<RenderInputProps>;
}

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export function DatePicker(props: Optional<DatePickerProps<Day>, 'value'>): React.ReactElement;
export function DatePicker(props: DatePickerProps<Day[]>): React.ReactElement;
export function DatePicker(props: DatePickerProps<Range<Day>>): React.ReactElement;

export default DatePicker;

export type Utils = {
  monthsList: string[];
  weekDaysList: string[];
  getToday(): Day;
  getMonthName(number: number): string;
  getMonthNumber(name: string): number;
  getMonthLength(day: Day): number;
  getMonthFirstWeekday(day: Day): number;
  isBeforeDate(a: Day, b: Day): boolean;
  checkDayInDayRange(props: Required<Range<Day>> & { day: Day }): boolean;
  getLanguageDigits(digit: string | number): string;
};

export function utils(isPersian: boolean): Utils;
