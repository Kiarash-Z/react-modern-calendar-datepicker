import * as React from 'react';

type DateInfo = {
    day: number;
    month: number;
    year: number;
}

type Range = {
    from: DateInfo | null;
    To: DateInfo | null;
}

export interface DatePickerProps {
    value: Range | DateInfo[] | null;
    onChange: (newValue: Range | DateInfo[] | null) => null;
    formatInputText?: () => string;
    inputPlaceholder?: string;
    inputClassName?: string;
    renderInput?: ({ ref, onFocus, onBlur }: { ref: React.RefObject<HTMLInputElement>, onFocus: () => void, onBlur: () => void }) => React.ReactElement;
    wrapperClassName?: string;
    calendarClassName?: string;
    calendarTodayClassName?: string;
    calendarSelectedDayClassName?: string;
    calendarRangeStartClassName?: string;
    calendarRangeBetweenClassName?: string;
    calendarRangeEndClassName?: string;
    disabledDays?: number[];
    onDisabledDayError?: (number) => null;
    colorPrimary?: string;
    colorPrimaryLight?: string;
    minimumDate?: DateInfo | null;
    maximumDate?: DateInfo | null;
    selectorStartingYear?: number;
    selectorEndingYear?: number;
    isPersian?: boolean;
    shouldHighlightWeekends?: boolean;
}

export interface CalenderProps {
    value: Range | DateInfo[] | null;
    onChange: (newValue: Range | DateInfo[] | null) => null;
    onDisabledDayError?: (number) => null;
    calendarClassName?: string;
    calendarTodayClassName?: string;
    calendarSelectedDayClassName?: string;
    calendarRangeStartClassName?: string;
    calendarRangeBetweenClassName?: string;
    calendarRangeEndClassName?: string;
    disabledDays?: number[];
    colorPrimary?: string;
    colorPrimaryLight?: string;
    minimumDate?: DateInfo;
    maximumDate?: DateInfo;
    selectorStartingYear?: number;
    selectorEndingYear?: number;
    isPersian?: boolean;
    shouldHighlightWeekends?: boolean;
}

declare const Calendar: React.FC<CalenderProps>;
declare const DatePicker: React.FC<DatePickerProps>;