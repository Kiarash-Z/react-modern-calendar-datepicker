import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

import { Calendar } from './Calendar';
import DatePickerInput from './DatePickerInput';
import { getValueType } from './shared/generalUtils';
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
}) => {
  const calendarContainerElement = useRef(null);
  const inputElement = useRef(null);
  const calendarArrowElement = useRef(null);
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

    // input element boundary
    const inputElementBoundery = inputElement.current.getBoundingClientRect();
    const inputElementWidth = inputElementBoundery.width;
    const inputElementHeight = inputElementBoundery.height;

    // arrow element boundary
    const arrowBoundary = calendarArrowElement.current.getBoundingClientRect();
    const arrowHeight = arrowBoundary.height;
    const arrowTop = arrowBoundary.top;

    // calendar element boundary
    const calendarBoundary = calendarContainerElement.current.getBoundingClientRect();
    const widthMargin = (calendarBoundary.width - inputElementWidth) / 2;
    const heightMargin = (calendarBoundary.height - inputElementHeight) / 2;
    const calendarWidth = calendarBoundary.width;
    const calendarHeight = calendarBoundary.height;
    const calendarLeft = calendarBoundary.left;
    const calendarTop = calendarBoundary.top;

    // client (window) boundary
    const { clientWidth, clientHeight } = document.documentElement;

    // find overflow, when calendar open in 4 sides of input element
    // right
    const rightFreeSpace = clientWidth - calendarLeft - inputElementWidth - arrowHeight;
    const rightOverflow = rightFreeSpace - calendarWidth;
    const isOverflowingFromRight = rightOverflow < 0;

    // left
    const leftFreeSpace = calendarLeft - arrowHeight;
    const leftOverflow = leftFreeSpace - calendarWidth;
    const isOverflowingFromLeft = leftOverflow < 0;

    // bottom
    const bottomFreeSpace = clientHeight - arrowTop - arrowHeight;
    const bottomOverflow = bottomFreeSpace - calendarHeight;
    const isOverflowingFromBottom = bottomOverflow < 0;

    // top
    const topFreeSapace = calendarTop - arrowHeight;
    const topOverflow = topFreeSapace - calendarHeight;
    const isOverflowingFromTop = topOverflow < 0;

    // set calendar position on screen
    const setCalendarPosition = (top, left) => {
      calendarContainerElement.current.style.top = `${top}px`;
      calendarContainerElement.current.style.left = `${left}px`;
    };

    // set Arrow direction
    const setArrow = (direction, left, top) => {
      if (direction === 'top') {
        calendarArrowElement.current.style.animation = `fadeArrowFlippedTop 0.3s forwards`;
        calendarArrowElement.current.style.top = `${top}px`;
      } else if (direction === 'right') {
        calendarArrowElement.current.style.animation = `fadeArrowFlippedRight 0.3s forwards`;
        calendarArrowElement.current.style.left = `${left}px`;
        calendarArrowElement.current.style.top = `${top}px`;
      } else if (direction === 'left') {
        calendarArrowElement.current.style.animation = `fadeArrowFlippedLeft 0.3s forwards`;
        calendarArrowElement.current.style.left = `${left}px`;
        calendarArrowElement.current.style.top = `${top}px`;
      }
    };

    // calculate left offset
    const calculateLeftOffset = () => {
      if (leftFreeSpace + rightFreeSpace > 2 * widthMargin) {
        // Enough space in both left and right side
        if (leftFreeSpace - widthMargin >= 0 && rightFreeSpace - widthMargin >= 0) {
          return widthMargin;
        }
        // Low space in left side but extra space in right side
        if (leftFreeSpace - widthMargin < 0) {
          return leftFreeSpace / 2;
        }
        // Low space in right side but extra space in left side
        if (rightFreeSpace - widthMargin < 0) {
          return widthMargin + (widthMargin - rightFreeSpace + rightFreeSpace / 2);
        }
        // Low space in both side
      } else {
        return leftFreeSpace;
      }
    };

    // calculate top offset
    const calculateToptOffset = () => {
      if (topFreeSapace + bottomFreeSpace > 2 * heightMargin) {
        // Enough space in both top and bottom side
        if (topFreeSapace - heightMargin >= 0 && bottomFreeSpace - heightMargin >= 0) {
          return heightMargin;
        }
        // Low space in top side but extra space in bottom side
        if (topFreeSapace - heightMargin < 0) {
          return topFreeSapace / 2 + inputElementHeight;
        }
        // Low space in bottom side but extra space in top side
        if (bottomFreeSpace - heightMargin < 0) {
          return (
            heightMargin +
            (heightMargin - bottomFreeSpace + bottomFreeSpace / 2 + inputElementHeight)
          );
        }
        // Low space in both side
      } else {
        return topFreeSapace;
      }
    };

    // Show calendar on top side of input element
    const showCalendarTop = () => {
      const newTop = topFreeSapace - inputElementHeight - calendarHeight;
      setCalendarPosition(newTop, calendarLeft - calculateLeftOffset());
      setArrow('top', null, -arrowHeight);
    };

    // Show calendar on bottom side of input element
    const showCalendarBottom = () => {
      setCalendarPosition(calendarTop + arrowHeight, calendarLeft - calculateLeftOffset());
    };

    // Show calendar on right side of input element
    const showCalendarRight = () => {
      setCalendarPosition(
        calendarTop - calculateToptOffset(),
        calendarLeft + inputElementWidth + arrowHeight,
      );
      setArrow('right', inputElementWidth - 5, inputElementHeight / 2 - 3);
    };

    // Show calendar on left side of input element
    const showCalendarLeft = () => {
      setCalendarPosition(calendarTop - calculateToptOffset(), leftOverflow);
      setArrow('left', (inputElementWidth + 10) * -1, inputElementHeight / 2 - 3);
    };

    // There is no free space in any side. Show calendar on fron of input element.
    const showCalendarFront = () => {
      setCalendarPosition(
        calendarTop - calculateToptOffset(),
        calendarLeft - calculateLeftOffset(),
      );
    };

    if (calendarPopperPosition === 'top') {
      showCalendarTop();
    } else if (calendarPopperPosition === 'bottom') {
      showCalendarBottom();
    } else if (!isOverflowingFromBottom) {
      showCalendarBottom();
    } else if (!isOverflowingFromTop) {
      showCalendarTop();
    } else if (!isOverflowingFromRight) {
      showCalendarRight();
    } else if (!isOverflowingFromLeft) {
      showCalendarLeft();
    } else {
      showCalendarFront();
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
              value={value}
              onChange={handleCalendarChange}
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
          <div ref={calendarArrowElement} className="DatePicker__calendarArrow" />
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
