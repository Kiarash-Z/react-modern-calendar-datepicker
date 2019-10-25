import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import utils from './shared/localeUtils';
import { putZero, getValueType } from './shared/generalUtils';
import { TYPE_SINGLE_DATE, TYPE_RANGE, TYPE_MUTLI_DATE } from './shared/constants';

const DatePickerInput = React.forwardRef(
  (
    {
      onFocus,
      onBlur,
      value,
      inputPlaceholder,
      inputClassName,
      formatInputText,
      renderInput,
      isPersian,
    },
    ref,
  ) => {
    const { getLanguageDigits } = useMemo(() => utils(isPersian), [isPersian]);

    const getSingleDayValue = () => {
      if (!value) return '';
      const year = getLanguageDigits(value.year);
      const month = getLanguageDigits(putZero(value.month));
      const day = getLanguageDigits(putZero(value.day));
      return `${year}/${month}/${day}`;
    };

    const fromWord = isPersian ? 'از' : 'from';
    const toWord = isPersian ? 'تا' : 'to';
    const yearLetterSkip = isPersian ? -2 : 0;

    const getDayRangeValue = () => {
      if (!value.from || !value.to) return '';
      const { from, to } = value;
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

    const getMultiDateValue = () => {
      return value.map(date => getLanguageDigits(date.day)).join(`${isPersian ? '،' : ','} `);
    };

    const getValue = () => {
      if (formatInputText()) return formatInputText();
      const valueType = getValueType(value);
      switch (valueType) {
        case TYPE_SINGLE_DATE:
          return getSingleDayValue();
        case TYPE_RANGE:
          return getDayRangeValue();
        case TYPE_MUTLI_DATE:
          return getMultiDateValue();
      }
    };

    const placeholderValue = inputPlaceholder || (isPersian ? 'انتخاب...' : 'Select...');

    const render = () => {
      return (
        renderInput({ ref, onFocus, onBlur }) || (
          <input
            data-testid="datepicker-input"
            readOnly
            ref={ref}
            onFocus={onFocus}
            onBlur={onBlur}
            value={getValue()}
            placeholder={placeholderValue}
            className={`DatePicker__input${isPersian ? ' -persian' : ''} ${inputClassName}`}
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
