import React from 'react';

import EventIcon from '@material-ui/icons/Event';
import { useLocaleUtils, useLocaleLanguage } from './shared/hooks';
import { putZero, getValueType } from './shared/generalUtils';
import { TYPE_SINGLE_DATE, TYPE_RANGE, TYPE_MUTLI_DATE } from './shared/constants';

const DatePickerInput = React.forwardRef(
  (
    {
      value,
      inputPlaceholder,
      inputClassName,
      inputName,
      formatInputText,
      renderInput,
      locale,
      openCalendar,
    },
    ref,
  ) => {
    const { getLanguageDigits } = useLocaleUtils(locale);
    const {
      to: toWord,
      yearLetterSkip,
      digitSeparator,
      defaultPlaceholder,
      isRtl,
    } = useLocaleLanguage(locale);
    const getSingleDayValue = () => {
      if (!value) return '';
      const year = getLanguageDigits(value.year);
      const month = getLanguageDigits(putZero(value.month));
      const day = getLanguageDigits(putZero(value.day));
      return `${year}/${month}/${day}`;
    };

    const getDayRangeValue = () => {
      if (!value.from || !value.to) return '';
      const { from, to } = value;
      const fromText = `${getLanguageDigits(putZero(from.day))}/${getLanguageDigits(
        putZero(from.month),
      )}/${getLanguageDigits(putZero(from.year))
        .toString()
        .slice(yearLetterSkip)}`;
      const toText = `${getLanguageDigits(putZero(to.day))}/${getLanguageDigits(
        putZero(to.month),
      )}/${getLanguageDigits(putZero(to.year))
        .toString()
        .slice(yearLetterSkip)}`;
      return `From ${fromText} ${toWord} ${toText}`;
    };

    const getMultiDateValue = () => {
      return value.map(date => getLanguageDigits(date.day)).join(`${digitSeparator} `);
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
    const placeholderValue = inputPlaceholder || defaultPlaceholder;
    const render = () => {
      return (
        renderInput({ ref }) || (
          <>
            <input
              data-testid="datepicker-input"
              readOnly
              ref={ref}
              value={getValue()}
              name={inputName}
              placeholder={placeholderValue}
              className={`DatePicker__input -${isRtl ? 'rtl' : 'ltr'} ${inputClassName}`}
              aria-label={placeholderValue}
            />
            <EventIcon className="icon-DatePicker" onClick={openCalendar} />
          </>
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
  inputName: '',
};

export default DatePickerInput;
