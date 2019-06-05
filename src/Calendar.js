import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import {
  WEEK_DAYS,
  getToday,
  toPersianNumber,
  getMonthName,
  getMonthLength,
  getMonthFirstWeekday,
  createUniqueRange,
  getDateAccordingToMonth,
  isSameDay,
  checkDayInDayRange,
  isBeforeDate,
  shallowCloneObject,
  deepCloneObject,
} from './utils';

const Calendar = ({
  selectedDay,
  selectedDayRange,
  onChange,
  onDisabledDayError,
  isDayRange,
  calendarClassName,
  calendarTodayClassName,
  calendarSelectedDayClassName,
  calendarRangeStartClassName,
  calendarRangeBetweenClassName,
  calendarRangeEndClassName,
  disabledDays,
  colorPrimary,
  colorPrimaryLight,
  disableBackward,
}) => {
  const monthYearTextWrapper = useRef(null);
  const calendarSectionWrapper = useRef(null);
  const [mainState, setMainState] = useState({
    status: 'NEXT',
    cycleCount: 1,
    activeDate: null,
  });

  const today = getToday();
  let activeDate = mainState.activeDate ? shallowCloneObject(mainState.activeDate) : null;

  const setActiveDate = () => {
    if (selectedDay) activeDate = shallowCloneObject(selectedDay);
    else if (selectedDayRange.from) activeDate = shallowCloneObject(selectedDayRange.from);
    else activeDate = shallowCloneObject(today);
  };

  if (!activeDate) setActiveDate();

  const renderWeekDays = () =>
    Object.keys(WEEK_DAYS).map(key => (
      <span key={key} className="Calendar__weekDay">
        {WEEK_DAYS[key][0]}
      </span>
    ));

  const getDate = isThisMonth => {
    return isThisMonth ? activeDate : getDateAccordingToMonth(activeDate, mainState.status);
  };

  const getMonthYearText = isNewMonth => {
    const date = getDate(!isNewMonth);
    const year = toPersianNumber(date.year).slice(-2);
    const month = getMonthName(date.month);
    return `${month} ${year}`;
  };

  const getDayRangeValue = day => {
    const clonedDayRange = deepCloneObject(selectedDayRange);
    const dayRangeValue =
      clonedDayRange.from && clonedDayRange.to ? { from: null, to: null } : clonedDayRange;
    const dayRangeProp = !dayRangeValue.from ? 'from' : 'to';
    dayRangeValue[dayRangeProp] = day;
    const { from, to } = dayRangeValue;

    // swap from and to values if from is later than to
    if (isBeforeDate(dayRangeValue.to, dayRangeValue.from)) {
      dayRangeValue.from = to;
      dayRangeValue.to = from;
    }

    const checkIncludingDisabledDay = disabledDay => {
      return checkDayInDayRange({
        day: disabledDay,
        from: dayRangeValue.from,
        to: dayRangeValue.to,
      });
    };
    const includingDisabledDay = disabledDays.find(checkIncludingDisabledDay);
    if (includingDisabledDay) {
      onDisabledDayError(includingDisabledDay);
      return selectedDayRange;
    }

    return dayRangeValue;
  };

  const handleDayClick = day => {
    const newDayValue = isDayRange ? getDayRangeValue(day) : day;
    onChange(newDayValue);
  };

  const getDayClassNames = dayItem => {
    const isToday = isSameDay(dayItem, today);
    const isSelected = selectedDay ? isSameDay(dayItem, selectedDay) : false;
    const { from: startingDay, to: endingDay } = selectedDayRange;
    const isStartedDayRange = isSameDay(dayItem, startingDay);
    const isEndingDayRange = isSameDay(dayItem, endingDay);
    const isWithinRange = checkDayInDayRange({ day: dayItem, from: startingDay, to: endingDay });
    const classNames = ''
      .concat(isToday && !isSelected ? ` -today ${calendarTodayClassName}` : '')
      .concat(!dayItem.isStandard ? ' -blank' : '')
      .concat(isSelected ? ` -selected ${calendarSelectedDayClassName}` : '')
      .concat(isStartedDayRange ? ` -selectedStart ${calendarRangeStartClassName}` : '')
      .concat(isEndingDayRange ? ` -selectedEnd ${calendarRangeEndClassName}` : '')
      .concat(isWithinRange ? ` -selectedBetween ${calendarRangeBetweenClassName}` : '')
      .concat(dayItem.isDisabled ? '-disabled' : '');
    return classNames;
  };

  const getViewMonthDays = isNewMonth => {
    const date = getDate(!isNewMonth);
    const prependingBlankDays = createUniqueRange(getMonthFirstWeekday(date), 'starting-blank');

    // all months will have an additional 7 days(week) for rendering purpose
    const appendingBlankDays = createUniqueRange(7 - getMonthFirstWeekday(date), 'ending-blank');
    const standardDays = createUniqueRange(getMonthLength(date)).map(
      day => ({
        ...day,
        isStandard: true,
        month: date.month,
        year: date.year,
      }),
      'standard',
    );
    const allDays = prependingBlankDays.concat(standardDays, appendingBlankDays);
    return allDays;
  };

  const renderMonthDays = isNewMonth => {
    const allDays = getViewMonthDays(isNewMonth);
    return allDays.map(({ id, value: day, month, year, isStandard }) => {
      const dayItem = { day, month, year };
      let isDisabled = disabledDays.some(disabledDay => isSameDay(dayItem, disabledDay));
      if (disableBackward && dayItem.year <= today.year)
        if (
          dayItem.month < today.month ||
          (dayItem.month === today.month && dayItem.day < today.day)
        )
          isDisabled = true;
      const additionalClass = getDayClassNames({ ...dayItem, isStandard, isDisabled });
      const isFromSelectedOnly = isSameDay(dayItem, selectedDayRange.from) && !selectedDayRange.to;
      return (
        <button
          key={id}
          className={`Calendar__day ${additionalClass}`}
          onClick={() => {
            if (isDisabled) {
              onDisabledDayError(dayItem); // good for showing error messages
              return;
            }
            handleDayClick({ day, month, year });
          }}
          disabled={!isStandard || isFromSelectedOnly}
          type="button"
        >
          {toPersianNumber(day)}
        </button>
      );
    });
  };

  // animate monthYear text in header and month days
  const animateContent = (direction, parentRef) => {
    const { current: textWrapper } = parentRef;
    const wrapperChildren = Array.from(textWrapper.children);
    const shownItem = wrapperChildren.find(child => child.classList.contains('-shown'));
    if (!shownItem) return; // prevent simultaneous animations
    const hiddenItem = wrapperChildren.find(child => child !== shownItem);
    const baseClass = shownItem.classList[0];
    const isNextMonth = direction === 'NEXT';
    const getAnimationClass = value => (value ? '-hiddenNext' : '-hiddenPrevious');
    shownItem.className = `${baseClass} ${getAnimationClass(!isNextMonth)}`;
    hiddenItem.className = `${baseClass} ${getAnimationClass(isNextMonth)}`;
    hiddenItem.classList.add('-shownAnimated');
  };

  const handleMonthClick = direction => {
    setMainState({
      ...mainState,
      status: direction,
    });
    animateContent(direction, monthYearTextWrapper);
    animateContent(direction, calendarSectionWrapper);
  };

  const handleAnimationEnd = ({ target }) => {
    target.classList.remove('-hiddenNext');
    target.classList.remove('-hiddenPrevious');
    target.classList.replace('-shownAnimated', '-shown');
  };

  const updateDate = () => {
    setMainState({
      ...mainState,
      cycleCount: mainState.cycleCount + 1,
      activeDate: getDateAccordingToMonth(activeDate, mainState.status),
    });
  };

  // determine the hidden animated item
  const isCycleCountEven = mainState.cycleCount % 2 === 0;
  return (
    <div
      className={`Calendar ${calendarClassName}`}
      style={{ '--cl-color-primary': colorPrimary, '--cl-color-primary-light': colorPrimaryLight }}
    >
      <div className="Calendar__header">
        <button
          className="Calendar__monthArrowWrapper -right"
          onClick={() => handleMonthClick('PREVIOUS')}
          aria-label="ماه قبل"
          type="button"
        >
          <span className="Calendar__monthArrow" alt="فلش راست">
            &nbsp;
          </span>
        </button>
        <div className="Calendar__monthYearContainer" ref={monthYearTextWrapper}>
          &nbsp;
          <span onAnimationEnd={handleAnimationEnd} className="Calendar__monthYear -shown">
            {getMonthYearText(isCycleCountEven)}
          </span>
          <span onAnimationEnd={handleAnimationEnd} className="Calendar__monthYear -hiddenNext">
            {getMonthYearText(!isCycleCountEven)}
          </span>
        </div>
        <button
          className="Calendar__monthArrowWrapper -left"
          onClick={() => handleMonthClick('NEXT')}
          aria-label="ماه بعد"
          type="button"
        >
          <span className="Calendar__monthArrow" alt="فلش چپ">
            &nbsp;
          </span>
        </button>
      </div>
      <div className="Calendar__weekDays">{renderWeekDays()}</div>
      <div ref={calendarSectionWrapper} className="Calendar__sectionWrapper">
        <div
          onAnimationEnd={e => {
            handleAnimationEnd(e);
            updateDate();
          }}
          className="Calendar__section -shown"
        >
          {renderMonthDays(isCycleCountEven)}
        </div>
        <div
          onAnimationEnd={e => {
            handleAnimationEnd(e);
            updateDate();
          }}
          className="Calendar__section -hiddenNext"
        >
          {renderMonthDays(!isCycleCountEven)}
        </div>
      </div>
    </div>
  );
};

const dayShape = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
};

Calendar.defaultProps = {
  onChange: () => null,
  onDisabledDayError: () => null,
  selectedDay: null,
  selectedDayRange: {
    from: null,
    to: null,
  },
  disabledDays: [],
  colorPrimary: '#0eca2d',
  colorPrimaryLight: '#cff4d5',
  calendarClassName: '',
  calendarTodayClassName: '',
  calendarSelectedDayClassName: '',
  calendarRangeStartClassName: '',
  calendarRangeBetweenClassName: '',
  calendarRangeEndClassName: '',
  disableBackward: false,
};

Calendar.propTypes = {
  onChange: PropTypes.func,
  onDisabledDayError: PropTypes.func,
  selectedDay: PropTypes.shape(dayShape),
  selectedDayRange: PropTypes.shape({
    from: PropTypes.shape(dayShape),
    to: PropTypes.shape(dayShape),
  }),
  disabledDays: PropTypes.arrayOf(PropTypes.shape(dayShape)),
  calendarClassName: PropTypes.string,
  calendarTodayClassName: PropTypes.string,
  calendarSelectedDayClassName: PropTypes.string,
  calendarRangeStartClassName: PropTypes.string,
  calendarRangeBetweenClassName: PropTypes.string,
  calendarRangeEndClassName: PropTypes.string,
  colorPrimary: PropTypes.string,
  colorPrimaryLight: PropTypes.string,
  disableBackward: PropTypes.bool,
};

export { Calendar };
