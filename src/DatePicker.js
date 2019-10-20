import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

import { Calendar } from './Calendar';
import DatePickerInput from './DatePickerInput';
import { getValueType } from './shared/generalUtils';
import { TYPE_SINGLE_DATE, TYPE_MUTLI_DATE, TYPE_RANGE } from './shared/constants';

const DatePicker = ({
  value,
  onChange,
  formatInputText,
  inputPlaceholder,
  inputClassName,
  renderInput,
  wrapperClassName,
  calendarClassName,
  calendarTodayClassName,
  calendarSelectedDayClassName,
  calendarRangeStartClassName,
  calendarRangeBetweenClassName,
  calendarRangeEndClassName,
  disabledDays,
  onDisabledDayError,
  colorPrimary,
  colorPrimaryLight,
  minimumDate,
  maximumDate,
  selectorStartingYear,
  selectorEndingYear,
  isPersian,
  shouldHighlightWeekends,
}) => {
  const calendarContainerElement = useRef(null);
  const dateInputElement = useRef(null);
  const mousePosition = useRef({});
  const shouldPreventFocus = useRef(null);
  const [isCalendarOpen, setCalendarVisiblity] = useState(false);

  const handleMouseMove = ({ clientX: x, clientY: y }) => {
    mousePosition.current = { x, y };
  };

  // get mouse live position
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove, false);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove, false);
    };
  }, []);

  // handle input focus/blur
  useEffect(() => {
    const valueType = getValueType(value);
    if (valueType === TYPE_MUTLI_DATE) return; // no need to close the calendar
    const shouldCloseCalendar =
      valueType === TYPE_SINGLE_DATE ? !isCalendarOpen : !isCalendarOpen && value.from && value.to;
    if (shouldCloseCalendar) dateInputElement.current.blur();
  }, [value, isCalendarOpen]);

  const handleBlur = e => {
    e.persist();
    if (!isCalendarOpen) return;
    const { current: calendar } = calendarContainerElement;
    const calendarPosition = calendar.getBoundingClientRect();
    const isInBetween = (position, start, end) => position >= start && position <= end;

    // keep calendar open if clicked inside the calendar
    const isInsideCalendar =
      isInBetween(mousePosition.current.x, calendarPosition.left, calendarPosition.right) &&
      isInBetween(mousePosition.current.y, calendarPosition.top, calendarPosition.bottom);
    if (isInsideCalendar) {
      shouldPreventFocus.current = true;
      e.target.focus();
      shouldPreventFocus.current = false;
      return;
    }
    setCalendarVisiblity(false);
  };

  const handleFocus = () => {
    if (shouldPreventFocus.current) return;
    setCalendarVisiblity(true);
  };

  // Keep the calendar in the screen bounds if input is near the window edges
  useLayoutEffect(() => {
    if (!isCalendarOpen) return;
    const { left, width } = calendarContainerElement.current.getBoundingClientRect();
    const { clientWidth } = document.documentElement;
    const isOverflowingFromRight = left + width > clientWidth;
    const overflowFromRightDistance = left + width - clientWidth;
    const isOverflowingFromLeft = left < 0;
    if (!isOverflowingFromRight && !isOverflowingFromLeft) return;
    const overflowFromLeftDistance = Math.abs(left);
    const rightPosition = isOverflowingFromLeft ? overflowFromLeftDistance : 0;
    const leftStyle = isOverflowingFromRight
      ? `calc(50% - ${overflowFromRightDistance}px)`
      : `calc(50% + ${rightPosition}px)`;
    calendarContainerElement.current.style.left = leftStyle;
  }, [isCalendarOpen]);

  const handleCalendarChange = newValue => {
    const valueType = getValueType(value);
    onChange(newValue);
    if (valueType === TYPE_SINGLE_DATE) setCalendarVisiblity(false);
    else if (valueType === TYPE_RANGE && newValue.from && newValue.to) setCalendarVisiblity(false);
  };

  return (
    <div className={`DatePicker ${isCalendarOpen ? '-calendarOpen' : ''} ${wrapperClassName}`}>
      <div
        ref={calendarContainerElement}
        className="DatePicker__calendarContainer"
        data-testid="calendar-container"
      >
        <Calendar
          value={value}
          onChange={handleCalendarChange}
          calendarClassName={calendarClassName}
          calendarTodayClassName={calendarTodayClassName}
          calendarSelectedDayClassName={calendarSelectedDayClassName}
          calendarRangeStartClassName={calendarRangeStartClassName}
          calendarRangeBetweenClassName={calendarRangeBetweenClassName}
          calendarRangeEndClassName={calendarRangeEndClassName}
          disabledDays={disabledDays}
          colorPrimary={colorPrimary}
          colorPrimaryLight={colorPrimaryLight}
          onDisabledDayError={onDisabledDayError}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          selectorStartingYear={selectorStartingYear}
          selectorEndingYear={selectorEndingYear}
          isPersian={isPersian}
          shouldHighlightWeekends={shouldHighlightWeekends}
        />
      </div>
      <DatePickerInput
        ref={dateInputElement}
        onFocus={handleFocus}
        onBlur={handleBlur}
        formatInputText={formatInputText}
        value={value}
        inputPlaceholder={inputPlaceholder}
        inputClassName={inputClassName}
        renderInput={renderInput}
        isPersian={isPersian}
      />
    </div>
  );
};

DatePicker.defaultProps = {
  wrapperClassName: '',
};

DatePicker.propTypes = {
  wrapperClassName: PropTypes.string,
};

export default DatePicker;
