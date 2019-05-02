import React, { useState, useEffect, useReducer, useRef } from 'react';
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
  checkDayInDayRangeIncluding,
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
}) => {
  const monthYearTextWrapper = useRef(null);
  const calendarSectionWrapper = useRef(null);
  const [mainState, setMainState] = useState({
    status: 'NEXT',
    cycleCount: 1,
    activeDate: null,
  });

  const createDateFromDays = (first, second) => {
    if (!isDayRange) {
      return first;
    }
    if (isBeforeDate(first, second) || !second) {
      return { from: first, to: second };
    }
    return { from: second, to: first };
  };
  const getSelectedDisabledDayIfAny = date => {
    if (isDayRange) {
      return disabledDays.find(disabledDay =>
        checkDayInDayRangeIncluding({ day: disabledDay, from: date.from, to: date.to }),
      );
    }
    return disabledDays.find(disabledDay => isSameDay(disabledDay, date));
  };

  const [selectedDaysState, dispatchSelectedDays] = useReducer((state, { type, date }) => {
    const { firstSelectedDay, secondSelectedDay, currentlyDragging } = state;
    let newState;
    switch (type) {
      case 'SELECT':
        if (!isDayRange) {
          newState = {
            firstSelectedDay: date,
            secondSelectedDay: date,
            currentlyDragging: 'FIRST',
          };
        } else if (isSameDay(date, firstSelectedDay)) {
          newState = {
            firstSelectedDay: date,
            secondSelectedDay,
            currentlyDragging: 'FIRST',
          };
        } else if (isSameDay(date, secondSelectedDay)) {
          newState = {
            firstSelectedDay,
            secondSelectedDay,
            currentlyDragging: 'SECOND',
          };
        } else if (!firstSelectedDay) {
          newState = {
            firstSelectedDay: date,
            secondSelectedDay,
            currentlyDragging: 'SECOND',
          };
        } else if (secondSelectedDay) {
          newState = {
            firstSelectedDay: date,
            secondSelectedDay: null,
            currentlyDragging: 'SECOND',
          };
        } else {
          newState = {
            firstSelectedDay,
            secondSelectedDay: date,
            currentlyDragging: 'SECOND',
          };
        }
        break;
      case 'ENTER':
        if (currentlyDragging === 'FIRST' && !isSameDay(date, secondSelectedDay)) {
          newState = {
            firstSelectedDay: date,
            secondSelectedDay,
            currentlyDragging,
          };
        } else if (currentlyDragging === 'SECOND' && !isSameDay(date, firstSelectedDay)) {
          newState = {
            firstSelectedDay,
            secondSelectedDay: date,
            currentlyDragging,
          };
        }
        break;
      case 'RELEASE':
        return {
          ...state,
          currentlyDragging: null,
        };
      default:
        newState = null;
    }
    if (!newState) return state;
    const newDate = createDateFromDays(newState.firstSelectedDay, newState.secondSelectedDay);
    const disabledDay = getSelectedDisabledDayIfAny(newDate);
    if (disabledDay) {
      onDisabledDayError(disabledDay);
      return state;
    }
    return newState;
  }, selectedDayRange);

  const { firstSelectedDay, secondSelectedDay, currentlyDragging } = selectedDaysState;

  useEffect(() => {
    onChange(createDateFromDays(firstSelectedDay, secondSelectedDay));
  }, [firstSelectedDay, secondSelectedDay]);

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

  React.useEffect(() => {
    function handler() {
      dispatchSelectedDays({ type: 'RELEASE' });
    }
    window.addEventListener('mouseup', handler);
    return () => window.removeEventListener('mouseup', handler);
  }, []);

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
      const isDisabled = disabledDays.some(disabledDay => isSameDay(dayItem, disabledDay)); // Todo
      const additionalClass = getDayClassNames({ ...dayItem, isStandard, isDisabled });
      return (
        <button
          key={id}
          className={`Calendar__day ${additionalClass}`}
          onMouseDown={() => {
            dispatchSelectedDays({ type: 'SELECT', date: { day, month, year } });
          }}
          onMouseEnter={() => {
            if (isStandard && currentlyDragging) {
              dispatchSelectedDays({ type: 'ENTER', date: { day, month, year } });
            }
          }}
          onMouseUp={() => {
            dispatchSelectedDays({ type: 'RELEASE', date: { day, month, year } });
          }}
          disabled={!isStandard}
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

  const handleMonthClick = (e, direction) => {
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
          onClick={e => handleMonthClick(e, 'NEXT')}
          aria-label="ماه بعد"
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
          onClick={e => handleMonthClick(e, 'PREVIOUS')}
          aria-label="ماه قبل"
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
};

export { Calendar };
