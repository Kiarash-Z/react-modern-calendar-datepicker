import React, { useState, useEffect, useRef } from 'react';

import './DatePicker.css';

import Calendar from './Calendar';
import DatePickerInput from './DatePickerInput';

let shouldPreventFocus, mousePosition;

let isDayRange = true; // remove this

const App = () => {
  const calendarContainer = useRef(null)
  const dateInput = useRef(null);
  const [isCalendarOpen, setCalendarVisiblity] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDayRange, setSelectedDayRange] = useState({ from: null, to: null });
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove, false);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove, false);
    }
  }, []);
  useEffect(() => {
    if (!isCalendarOpen && selectedDay) dateInput.current.blur();
    if (!isCalendarOpen &&
      selectedDayRange.from &&
      selectedDayRange.to
    ) dateInput.current.blur();
  });

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
    setSelectedDay(day);
    toggleCalendar();
  };

  const handleDayRangeSelect = range => {
    setSelectedDayRange(range);
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
        selectedDay={selectedDay}
        placeholder="انتخاب"
      />
    </div>
  );
}

export default App;
