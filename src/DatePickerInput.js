import React from 'react';

import { toPersianNumber } from './utils';

const DatePickerInput = React.forwardRef(({ onFocus, onBlur, selectedDay, placeholder }, ref) => {
  const getValue = () => {
    if (!selectedDay) return '';
    const year = toPersianNumber(selectedDay.year);
    const month = toPersianNumber(selectedDay.month);
    const day = toPersianNumber(selectedDay.day);
    return `${year}/${month}/${day}`;
  };

  return (
    <input
      readOnly
      ref={ref}
      onFocus={onFocus}
      onBlur={onBlur}
      value={getValue()}
      placeholder={placeholder}
      className="DatePicker__input"
    />
  );
});

export default DatePickerInput;
