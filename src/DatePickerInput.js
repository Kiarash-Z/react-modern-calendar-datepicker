import React from 'react';
import PropTypes from 'prop-types';

import { toPersianNumber, putZero, createDateRangeDays } from './utils';

const DatePickerInput = React.forwardRef(
  (
    {
      onFocus,
      onBlur,
      selectedDay,
      selectedDayRange,
      inputPlaceholder,
      inputClassName,
      formatInputText,
      renderInput,
      isDayRange,
      disabledDays,
    },
    ref,
  ) => {
    const getSelectedDayValue = () => {
      if (!selectedDay) return '';
      const year = toPersianNumber(selectedDay.year);
      const month = toPersianNumber(putZero(selectedDay.month));
      const day = toPersianNumber(putZero(selectedDay.day));
      return `${year}/${month}/${day}`;
    };

    const getSelectedRangeValue = () => {
      if (!selectedDayRange.from || !selectedDayRange.to) return '';
      const { from, to } = selectedDayRange;
      const fromText = `${toPersianNumber(putZero(from.year))
        .toString()
        .slice(-2)}/${toPersianNumber(putZero(from.month))}/${toPersianNumber(putZero(from.day))}`;
      const toText = `${toPersianNumber(putZero(to.year))
        .toString()
        .slice(-2)}/${toPersianNumber(putZero(to.month))}/${toPersianNumber(putZero(to.day))}`;
      return `از ${fromText} تا ${toText}`;
    };
    const getValue = () => {
      if (formatInputText()) return formatInputText();
      return isDayRange ? getSelectedRangeValue() : getSelectedDayValue();
    };
    const getSelectedRangeAvailableDays = () => {
      if (!selectedDayRange.from || !selectedDayRange.to) return '[]';
      const { from, to } = selectedDayRange;

      const disabledDaysArray = (disabledDays || []).map(
        disabledDate =>
          `${disabledDate.year}/${putZero(disabledDate.month)}/${putZero(disabledDate.day)}`,
      );
      const rangeDays = createDateRangeDays(from, to, disabledDaysArray);
      return JSON.stringify(rangeDays);
    };

    const render = () => {
      return [
        renderInput({ ref, onFocus, onBlur }) || (
          <input
            readOnly
            ref={ref}
            onFocus={onFocus}
            onBlur={onBlur}
            value={getValue()}
            placeholder={inputPlaceholder}
            className={`DatePicker__input ${inputClassName}`}
            aria-label="انتخاب تاریخ"
          />
        ),
        <input
          type="hidden"
          className={`DatePicker__input_hidden ${inputClassName}`}
          value={getSelectedRangeAvailableDays()}
        />,
      ];
    };

    return render();
  },
);

DatePickerInput.defaultProps = {
  formatInputText: () => '',
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
