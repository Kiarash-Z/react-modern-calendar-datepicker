import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './DatePicker.css';

import Calendar from './Calendar';
import DatePickerInput from './DatePickerInput';

let shouldPreventFocus, mousePosition;

const DatePicker = ({
  isDayRange,
  selectedDay,
  onChange,
  formatInputText,
  inputPlaceholder,
  inputClassName,
  renderInput,
  selectedDayRange,
}) => {
  const calendarContainer = useRef(null);
  const dateInput = useRef(null);
  const [isCalendarOpen, setCalendarVisiblity] = useState(false);

  // get mouse live position
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove, false);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove, false);
    }
  }, []);
  useEffect(() => {
    const shouldCloseCalendar = !isDayRange ?
    !isCalendarOpen : (
      !isCalendarOpen &&
      selectedDayRange.from &&
      selectedDayRange.to
    );
    if (shouldCloseCalendar) dateInput.current.blur();
  }, [selectedDay, isCalendarOpen]);

  const toggleCalendar = () => setCalendarVisiblity(!isCalendarOpen);

  // keep calendar open if clicked inside the calendar
  const handleBlur = e => {
    e.persist();
    const { current: calendar } = calendarContainer;
    if (!calendar) return;
    const calendarPosition = calendar.getBoundingClientRect();
    const isInBetween = (value, start, end) => (value >= start) && (value <= end);
    const isInsideCalendar = isInBetween(mousePosition.x, calendarPosition.left, calendarPosition.right) &&
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

  const handleMouseMove = e => {
    const { clientX: x, clientY: y } = e;
    mousePosition = { x, y };
  };

  const handleDaySelect = day => {
    onChange(day);
    toggleCalendar();
  };

  const handleDayRangeSelect = range => {
    onChange(range);
    if (range.from && range.to) toggleCalendar();
  };

  return (
    <div className="DatePicker">
      {isCalendarOpen && (
        <div
          ref={calendarContainer}
          className="DatePicker__calendarContainer"
        >
          <Calendar
            onDaySelect={handleDaySelect}
            selectedDay={selectedDay}
            selectedDayRange={selectedDayRange}
            onDayRangeSelect={handleDayRangeSelect}
            isDayRange={isDayRange}
          />
        </div>
      )}
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

const dayShape = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
};

DatePicker.defaultProps = {
  isDayRange: false,
  selectedDay: null,
  selectedDayRange: {
    from: null,
    to: null
  },
};

DatePicker.propTypes = {
  selectedDay: PropTypes.shape(dayShape),
  selectedDayRange: PropTypes.shape({
    from: PropTypes.shape(dayShape),
    to: PropTypes.shape(dayShape),
  }),
  onChange: PropTypes.func.isRequired,
};

export default DatePicker;
