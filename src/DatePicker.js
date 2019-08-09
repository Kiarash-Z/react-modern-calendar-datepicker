import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Calendar } from './Calendar';
import DatePickerInput from './DatePickerInput';

let shouldPreventFocus;
let mousePosition;

const DatePicker = ({
  isDayRange,
  selectedDay,
  onChange,
  formatInputText,
  inputPlaceholder,
  inputClassName,
  renderInput,
  selectedDayRange,
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
}) => {
  const calendarContainer = useRef(null);
  const dateInput = useRef(null);
  const [isCalendarOpen, setCalendarVisiblity] = useState(false);

  const handleMouseMove = e => {
    const { clientX: x, clientY: y } = e;
    mousePosition = { x, y };
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
    const shouldCloseCalendar = !isDayRange
      ? !isCalendarOpen
      : !isCalendarOpen && selectedDayRange.from && selectedDayRange.to;
    if (shouldCloseCalendar) dateInput.current.blur();
  }, [selectedDay, isCalendarOpen]);

  const toggleCalendar = () => setCalendarVisiblity(!isCalendarOpen);

  // keep calendar open if clicked inside the calendar
  const handleBlur = e => {
    e.persist();
    const { current: calendar } = calendarContainer;
    if (!calendar) return;
    const calendarPosition = calendar.getBoundingClientRect();
    const isInBetween = (value, start, end) => value >= start && value <= end;
    const isInsideCalendar =
      isInBetween(mousePosition.x, calendarPosition.left, calendarPosition.right) &&
      isInBetween(mousePosition.y, calendarPosition.top, calendarPosition.bottom);
    if (isInsideCalendar) {
      shouldPreventFocus = true;
      e.target.focus();
      shouldPreventFocus = false;
      return;
    }
    toggleCalendar();
  };

  const handleFocus = () => {
    if (shouldPreventFocus) return;
    toggleCalendar();
  };

  const handleDaySelect = day => {
    onChange(day);
    toggleCalendar();
  };

  const handleDayRangeSelect = range => {
    onChange(range);
    if (range.from && range.to) toggleCalendar();
  };

  // Keep the calendar in the screen bounds if input is near the window edges
  const getCalendarPosition = () => {
    if (!calendarContainer.current) return;
    const isVisible = calendarContainer.current.style.visibility === 'visible';
    if (isVisible) return { left: calendarContainer.current.style.left };
    const { left, width } = calendarContainer.current.getBoundingClientRect();
    const { clientWidth } = document.documentElement;
    const isOverflowingFromRight = left + width > clientWidth;
    const overflowFromRightDistance = left + width - clientWidth;
    const isOverflowingFromLeft = left < 0;
    const overflowFromLeftDistance = Math.abs(left);
    const rightPosition = isOverflowingFromLeft ? overflowFromLeftDistance : 0;
    const leftStyle = isOverflowingFromRight
      ? `calc(50% - ${overflowFromRightDistance}px)`
      : `calc(50% + ${rightPosition}px)`;
    return { left: leftStyle };
  };

  return (
    <div className={`DatePicker ${isCalendarOpen ? '-calendarOpen' : ''} ${wrapperClassName}`}>
      <div
        ref={calendarContainer}
        className="DatePicker__calendarContainer"
        style={getCalendarPosition()}
      >
        <Calendar
          onDaySelect={handleDaySelect}
          selectedDay={selectedDay}
          onChange={isDayRange ? handleDayRangeSelect : handleDaySelect}
          selectedDayRange={selectedDayRange}
          onDayRangeSelect={handleDayRangeSelect}
          isDayRange={isDayRange}
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
        />
      </div>
      <DatePickerInput
        ref={dateInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        formatInputText={formatInputText}
        selectedDay={selectedDay}
        selectedDayRange={selectedDayRange}
        inputPlaceholder={inputPlaceholder}
        inputClassName={inputClassName}
        renderInput={renderInput}
        isDayRange={isDayRange}
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
