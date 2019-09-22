import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import utils from './shared/localeUtils';
import { putZero } from './shared/independentUtils';

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
      isPersian,
    },
    ref,
  ) => {
    const { getLanguageDigits } = useMemo(() => utils(isPersian), [isPersian]);

    const getSelectedDayValue = () => {
      if (!selectedDay) return '';
      const year = getLanguageDigits(selectedDay.year);
      const month = getLanguageDigits(putZero(selectedDay.month));
      const day = getLanguageDigits(putZero(selectedDay.day));
      return `${year}/${month}/${day}`;
    };

    const fromWord = isPersian ? 'از' : 'from';
    const toWord = isPersian ? 'تا' : 'to';
    const yearLetterSkip = isPersian ? -2 : 0;

    const getSelectedRangeValue = () => {
      if (!selectedDayRange.from || !selectedDayRange.to) return '';
      const { from, to } = selectedDayRange;
      const fromText = `${getLanguageDigits(putZero(from.year))
        .toString()
        .slice(yearLetterSkip)}/${getLanguageDigits(putZero(from.month))}/${getLanguageDigits(
        putZero(from.day),
      )}`;
      const toText = `${getLanguageDigits(putZero(to.year))
        .toString()
        .slice(yearLetterSkip)}/${getLanguageDigits(putZero(to.month))}/${getLanguageDigits(
        putZero(to.day),
      )}`;
      return `${fromWord} ${fromText} ${toWord} ${toText}`;
    };
    const getValue = () => {
      if (formatInputText()) return formatInputText();
      return isDayRange ? getSelectedRangeValue() : getSelectedDayValue();
    };

    const placeholderValue = inputPlaceholder || (isPersian ? 'انتخاب' : 'Select');

    const render = () => {
      return (
        renderInput({ ref, onFocus, onBlur }) || (
          <input
            readOnly
            ref={ref}
            onFocus={onFocus}
            onBlur={onBlur}
            value={getValue()}
            placeholder={placeholderValue}
            className={`DatePicker__input ${inputClassName}`}
            aria-label={placeholderValue}
          />
        )
      );
    };

    return render();
  },
);

DatePickerInput.defaultProps = {
  formatInputText: () => '',
  renderInput: () => null,
  inputPlaceholder: '',
  inputClassName: '',
  isPersian: false,
};

DatePickerInput.propTypes = {
  formatInputText: PropTypes.func,
  inputPlaceholder: PropTypes.string,
  inputClassName: PropTypes.string,
  renderInput: PropTypes.func,
  isPersian: PropTypes.bool,
};

export default DatePickerInput;
