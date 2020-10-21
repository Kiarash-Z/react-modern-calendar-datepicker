import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

import { Calendar } from './Calendar';
import DatePickerInput from './DatePickerInput';
import { getValueType } from './shared/generalUtils';
import { TYPE_SINGLE_DATE, TYPE_MUTLI_DATE, TYPE_RANGE } from './shared/constants';

const DatePicker = ({
  value,
  onChange,
  onDisplayedDateChangeEnd,
  onDisplayedDateChangeStart,
  formatInputText,
  inputPlaceholder,
  inputClassName,
  inputName,
  renderInput,
  wrapperClassName,
  calendarClassName,
  calendarTodayClassName,
  calendarSelectedDayClassName,
  calendarRangeStartClassName,
  calendarRangeBetweenClassName,
  calendarRangeEndClassName,
  calendarPopperPosition,
  disabledDays,
  onDisabledDayError,
  colorPrimary,
  colorPrimaryLight,
  slideAnimationDuration,
  minimumDate,
  maximumDate,
  selectorStartingYear,
  selectorEndingYear,
  locale,
  shouldHighlightWeekends,
  renderFooter,
  customDaysClassName,
  calendarRef,
}) => {
  const calendarContainerElement = useRef(null);
  const inputElement = useRef(null);
  const shouldPreventToggle = useRef(false);
  const [isCalendarOpen, setCalendarVisiblity] = useState(false);

  useEffect(() => {
    const handleBlur = () => {
      setCalendarVisiblity(false);
    };
    window.addEventListener('blur', handleBlur, false);
    return () => {
      window.removeEventListener('blur', handleBlur, false);
    };
  }, []);

  // handle input focus/blur
  useEffect(() => {
    const valueType = getValueType(value);
    if (valueType === TYPE_MUTLI_DATE) return; // no need to close the calendar
    const shouldCloseCalendar =
      valueType === TYPE_SINGLE_DATE ? !isCalendarOpen : !isCalendarOpen && value.from && value.to;
    if (shouldCloseCalendar) inputElement.current.blur();
  }, [value, isCalendarOpen]);

  const handleBlur = e => {
    e.persist();
    if (!isCalendarOpen) return;
    const isInnerElementFocused = calendarContainerElement.current.contains(e.relatedTarget);
    if (shouldPreventToggle.current) {
      shouldPreventToggle.current = false;
      inputElement.current.focus();
    } else if (isInnerElementFocused && e.relatedTarget) {
      e.relatedTarget.focus();
    } else {
      setCalendarVisiblity(false);
    }
  };

  const openCalendar = () => {
    if (!shouldPreventToggle.current) setCalendarVisiblity(true);
  };

  // Keep the calendar in the screen bounds if input is near the window edges
  useLayoutEffect(() => {
    if (!isCalendarOpen) return;
    const { left, width, height, top } = calendarContainerElement.current.getBoundingClientRect();
    const { clientWidth, clientHeight } = document.documentElement;
    const isOverflowingFromRight = left + width > clientWidth;
    const isOverflowingFromLeft = left < 0;
    const isOverflowingFromBottom = top + height > clientHeight;

    const getLeftStyle = () => {
      const overflowFromRightDistance = left + width - clientWidth;

      if (!isOverflowingFromRight && !isOverflowingFromLeft) return;
      const overflowFromLeftDistance = Math.abs(left);
      const rightPosition = isOverflowingFromLeft ? overflowFromLeftDistance : 0;

      const leftStyle = isOverflowingFromRight
        ? `calc(50% - ${overflowFromRightDistance}px)`
        : `calc(50% + ${rightPosition}px)`;
      return leftStyle;
    };

    calendarContainerElement.current.style.left = getLeftStyle();
    if (
      (calendarPopperPosition === 'auto' && isOverflowingFromBottom) ||
      calendarPopperPosition === 'top'
    ) {
      calendarContainerElement.current.classList.add('-top');
    }
  }, [isCalendarOpen]);

  const handleCalendarChange = newValue => {
    const valueType = getValueType(value);
    onChange(newValue);
    if (valueType === TYPE_SINGLE_DATE) setCalendarVisiblity(false);
    else if (valueType === TYPE_RANGE && newValue.from && newValue.to) setCalendarVisiblity(false);
  };

  const handleKeyUp = ({ key }) => {
    switch (key) {
      case 'Enter':
        setCalendarVisiblity(true);
        break;
      case 'Escape':
        setCalendarVisiblity(false);
        shouldPreventToggle.current = true;
        break;
    }
  };

  useEffect(() => {
    if (!isCalendarOpen && shouldPreventToggle.current) {
      inputElement.current.focus();
      shouldPreventToggle.current = false;
    }
  }, [shouldPreventToggle, isCalendarOpen]);

  return (
    <div
      onFocus={openCalendar}
      onBlur={handleBlur}
      onKeyUp={handleKeyUp}
      className={`DatePicker ${wrapperClassName}`}
      role="presentation"
    >
      <DatePickerInput
        ref={inputElement}
        formatInputText={formatInputText}
        value={value}
        inputPlaceholder={inputPlaceholder}
        inputClassName={inputClassName}
        renderInput={renderInput}
        inputName={inputName}
        locale={locale}
      />
      {isCalendarOpen && (
        <>
          <div
            ref={calendarContainerElement}
            className="DatePicker__calendarContainer"
            data-testid="calendar-container"
            role="presentation"
            onMouseDown={() => {
              shouldPreventToggle.current = true;
            }}
          >
            <Calendar
              ref={calendarRef}
              value={value}
              onChange={handleCalendarChange}
              onDisplayedDateChangeEnd={onDisplayedDateChangeEnd}
              onDisplayedDateChangeStart={onDisplayedDateChangeStart}
              calendarClassName={calendarClassName}
              calendarTodayClassName={calendarTodayClassName}
              calendarSelectedDayClassName={calendarSelectedDayClassName}
              calendarRangeStartClassName={calendarRangeStartClassName}
              calendarRangeBetweenClassName={calendarRangeBetweenClassName}
              calendarRangeEndClassName={calendarRangeEndClassName}
              disabledDays={disabledDays}
              colorPrimary={colorPrimary}
              colorPrimaryLight={colorPrimaryLight}
              slideAnimationDuration={slideAnimationDuration}
              onDisabledDayError={onDisabledDayError}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              selectorStartingYear={selectorStartingYear}
              selectorEndingYear={selectorEndingYear}
              locale={locale}
              shouldHighlightWeekends={shouldHighlightWeekends}
              renderFooter={renderFooter}
              customDaysClassName={customDaysClassName}
            />
          </div>
          <div className="DatePicker__calendarArrow" />
        </>
      )}
    </div>
  );
};

DatePicker.defaultProps = {
  wrapperClassName: '',
  locale: 'en',
  calendarPopperPosition: 'auto',
};

export default DatePicker;
