import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

import { Calendar } from './Calendar';
import DatePickerInput from './DatePickerInput';
import { getValueType, todayPerLang } from './shared/generalUtils';
import { TYPE_SINGLE_DATE, TYPE_MUTLI_DATE, TYPE_RANGE } from './shared/constants';

const DatePicker = ({
  value,
  onChange,
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
  activeTime,
  type,
}) => {
  let timeDate = null;
  const today = todayPerLang(locale);
  if (type === 'single' && activeTime) {
    timeDate = {
      hour: value ? value.hour : today.hour,
      minutes: value ? value.minutes : today.minutes,
    };
    if (!value) {
      onChange(today);
    }
  } else if (
    type === 'range' &&
    activeTime &&
    (!(value.from && value.to) || (value.from && value.to))
  ) {
    timeDate = {
      from: {
        hour: value.from ? value.from.hour : today.hour,
        minutes: value.from ? value.from.minutes : today.minutes,
      },
      to: {
        hour: value.to ? value.to.hour : today.hour,
        minutes: value.to ? value.to.minutes : today.minutes,
      },
    };
    if (!value.from && !value.to) {
      onChange({
        from: { ...today },
        to: { ...today, day: today.day + 2 },
      });
    }
  }

  const [time, setTime] = useState(timeDate);
  const calendarContainerElement = useRef(null);
  const inputElement = useRef(null);
  const mainElement = useRef(false);
  const shouldPreventToggle = useRef(false);
  const [isCalendarOpen, setCalendarVisiblity] = useState(false);

  useEffect(() => {
    const listener = event => {
      if (!mainElement.current || mainElement.current.contains(event.target)) {
        return;
      }
      setCalendarVisiblity(false);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  });

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
    if (shouldCloseCalendar) {
      setCalendarVisiblity(false);
      inputElement.current.blur();
    }
  }, [value, isCalendarOpen]);

  const handleBlur = e => {
    e.persist();
    if (!isCalendarOpen) setCalendarVisiblity(true);
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
    if (valueType === 'SINGLE_DATE') {
      if (activeTime) {
        onChange({ ...newValue, ...time });
      } else {
        onChange({ ...newValue });
      }
    } else if (valueType === 'RANGE') {
      /* eslint-disable no-param-reassign */
      if (newValue.from && activeTime) {
        newValue.from.hour = time.from.hour;
        newValue.from.minutes = time.from.minutes;
      }
      if (newValue.to && activeTime) {
        newValue.to.hour = time.to.hour;
        newValue.to.minutes = time.to.minutes;
      }
      onChange(newValue);
    }
    if (valueType === TYPE_SINGLE_DATE) setCalendarVisiblity(false);
    else if (valueType === TYPE_RANGE && newValue.from && newValue.to) setCalendarVisiblity(false);
  };
  const handleCalendarTimeChange = newValue => {
    const valueType = getValueType(value);
    if (valueType === 'SINGLE_DATE') {
      if (activeTime) {
        onChange({ ...newValue, ...time });
      }
    } else if (valueType === 'RANGE') {
      /* eslint-disable no-param-reassign */
      if (newValue.from && activeTime) {
        newValue.from.hour = time.from.hour;
        newValue.from.minutes = time.from.minutes;
      }
      if (newValue.to && activeTime) {
        newValue.to.hour = time.to.hour;
        newValue.to.minutes = time.to.minutes;
      }
      onChange({ ...newValue });
    }
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
      onClick={handleBlur}
      onKeyUp={handleKeyUp}
      ref={mainElement}
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
        activeTime={activeTime}
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
              value={value}
              onChange={handleCalendarChange}
              handleCalendarTimeChange={handleCalendarTimeChange}
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
              activeTime={activeTime}
              time={time}
              onSetTime={setTime}
              type
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
