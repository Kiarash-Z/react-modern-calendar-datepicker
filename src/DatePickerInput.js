import React from 'react';
import PropTypes from 'prop-types';

import { toPersianNumber } from './utils';

const DatePickerInput = React.forwardRef(({
  onFocus,
  onBlur,
  selectedDay,
  inputPlaceholder,
  inputClassName,
  formatInputText,
  renderInput,
}, ref) => {
  const getValue = () => {
    if (!selectedDay) return '';
    const year = toPersianNumber(selectedDay.year);
    const month = toPersianNumber(selectedDay.month);
    const day = toPersianNumber(selectedDay.day);
    return formatInputText({ year, month, day });
  };
  const render = () => {
    return renderInput({ ref, onFocus, onBlur }) || (
      <input
        readOnly
        ref={ref}
        onFocus={onFocus}
        onBlur={onBlur}
        value={getValue()}
        placeholder={inputPlaceholder}
        className={`DatePicker__input ${inputClassName}`}
      />
    );
  };

  return render();
});

DatePickerInput.defaultProps = {
  formatInputText: ({ year, month, day }) => `${year}/${month}/${day}`,
  renderInput: () => null,
  inputPlaceholder: 'انتخاب',
  inputClassName: '',
};

DatePickerInput.propTypes = {
  formatInputText: PropTypes.func,
  inputPlaceholder: PropTypes.string,
  inputClassName: PropTypes.string,
  renderInput: PropTypes.func,
};

export default DatePickerInput;
