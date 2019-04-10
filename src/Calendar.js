import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import './Calendar.css';
import arrow from './assets/arrow.svg';
import {
  CURRENT_DATE,
  WEEK_DAYS,
  toPersianNumber,
  getMonthName,
  getMonthLength,
  getMonthFirstWeekday,
  createUniqueRange,
  getDateAccordingToMonth,
  isSameDay,
  checkDayInDayRange,
  isBeforeDate,
} from './utils';

let activeDate = CURRENT_DATE;

const Calendar = ({
  selectedDay,
  selectedDayRange,
  onChange,
  isDayRange,
  calendarClassName,
  calendarTodayClassName,
  calendarSelectedDayClassName,
  calendarRangeStartClassName,
  calendarRangeBetweenClassName,
  calendarRangeEndClassName,
}) => {
  const monthYearTextWrapper = useRef(null);
  const calendarSectionWrapper = useRef(null);
  const [newMonthState, setNewMonthState] = useState({
    status: 'NEXT',
    cycleCount: 1,
  });

  const renderWeekDays = () => Object
    .keys(WEEK_DAYS)
    .map(key => <span key={key} className="Calendar__weekDay">{WEEK_DAYS[key][0]}</span>);

  const getDate = isThisMonth => {
    return isThisMonth ? activeDate : getDateAccordingToMonth(activeDate, newMonthState.status);
  };

  const getMonthYearText = isNewMonth => {
    const date = getDate(!isNewMonth);
    const year = toPersianNumber(date.year).slice(-2);
    const month = getMonthName(date.month);
    return `${month} ${year}`;
  };

  const handleDayClick = day => {
    if (!isDayRange) return onChange(day);
    const clonedDayRange = JSON.parse(JSON.stringify(selectedDayRange)); // deep clone;
    const dayRangeValue = (clonedDayRange.from && clonedDayRange.to) ? { from: null, to: null } : clonedDayRange;
    const dayRangeProp = !dayRangeValue.from ? 'from' : 'to';
    dayRangeValue[dayRangeProp] = day;
    const { from, to } = dayRangeValue;

    // swap from and to values if from is later than to
    if (isBeforeDate(dayRangeValue.to, dayRangeValue.from)) {
      dayRangeValue.from = to;
      dayRangeValue.to = from;
    }
    onChange(dayRangeValue);
  };

  const getDayClassNames = dayItem => {
    const isToday = isSameDay(dayItem, CURRENT_DATE);
    const isSelected = selectedDay ? isSameDay(dayItem, selectedDay) : false;
    const { from: startingDay, to: endingDay } = selectedDayRange;
    const isStartedDayRange = isSameDay(dayItem, startingDay);
    const isEndingDayRange = isSameDay(dayItem, endingDay);
    const isWithinRange = checkDayInDayRange({ day: dayItem, from: startingDay, to: endingDay });
    const classNames = ''
      .concat((isToday && !isSelected) ? ` -today ${calendarTodayClassName}` : '')
      .concat(!dayItem.isStandard ? ' -blank' : '')
      .concat(isSelected ? ` -selected ${calendarSelectedDayClassName}` : '')
      .concat(isStartedDayRange ? ` -selectedStart ${calendarRangeStartClassName}` : '')
      .concat(isEndingDayRange ? ` -selectedEnd ${calendarRangeEndClassName}` : '')
      .concat(isWithinRange ? ` -selectedBetween ${calendarRangeBetweenClassName}` : '');
    return classNames;
  };

  const getViewMonthDays = isNewMonth =>  {
    const date = getDate(!isNewMonth);
    const prependingBlankDays = createUniqueRange(getMonthFirstWeekday(date), 'starting-blank');

    // all months will have an additional 7 days(week) for rendering purpose
    const appendingBlankDays = createUniqueRange(7 - getMonthFirstWeekday(date), 'ending-blank');
    const standardDays = createUniqueRange(
      getMonthLength(date)).map(day => ({
        ...day,
        isStandard: true,
        month: date.month,
        year: date.year
      }),
      'standard'
    );
    const allDays = prependingBlankDays.concat(standardDays, appendingBlankDays);
    return allDays;
  };

  const renderMonthDays = isNewMonth => {
    const allDays = getViewMonthDays(isNewMonth);
    return allDays.map(({ id, value: day , month, year, isStandard }) => {
      const dayItem = { day, month, year };
      const additionalClass = getDayClassNames({ ...dayItem, isStandard });
      const isFromSelectedOnly = isSameDay(dayItem, selectedDayRange.from) && !selectedDayRange.to;
      return (
        <button
          key={id}
          className={`Calendar__day ${additionalClass}`}
          onClick={() => { handleDayClick({ day, month, year }); }}
          disabled={!isStandard || isFromSelectedOnly}
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
    const getAnimationClass = value => value ? '-hiddenNext' : '-hiddenPrevious';
    shownItem.className = `${baseClass} ${getAnimationClass(!isNextMonth)}`;
    hiddenItem.className =  `${baseClass} ${getAnimationClass(isNextMonth)}`;
    hiddenItem.classList.add('-shownAnimated');
  };

  const handleMonthClick = (e, direction) => {
    setNewMonthState({
      ...newMonthState,
      status: direction
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
    activeDate = getDateAccordingToMonth(activeDate, newMonthState.status);
    setNewMonthState({
      ...newMonthState,
      cycleCount: newMonthState.cycleCount + 1,
    });
  };

  // determine the hidden animated item
  const isCycleCountEven = newMonthState.cycleCount % 2 === 0;
  return (
    <div className={`Calendar ${calendarClassName}`}>
      <div className="Calendar__header">
        <button
          className="Calendar__monthArrowWrapper -right"
          onClick={e => handleMonthClick(e, 'NEXT')}
        >
          <img src={arrow} className="Calendar__monthArrow" alt="فلش راست"/>
        </button>
        <div className="Calendar__monthYearContainer" ref={monthYearTextWrapper}>
          &nbsp;
          <span
            onAnimationEnd={handleAnimationEnd}
            className="Calendar__monthYear -shown"
          >
            {getMonthYearText(isCycleCountEven)}
          </span>
          <span
            onAnimationEnd={handleAnimationEnd}
            className="Calendar__monthYear -hiddenNext"
          >
            {getMonthYearText(!isCycleCountEven)}
          </span>
        </div>
        <button
          className="Calendar__monthArrowWrapper -left"
          onClick={e => handleMonthClick(e, 'PREVIOUS')}
        >
          <img src={arrow} className="Calendar__monthArrow" alt="فلش چپ"/>
        </button>
      </div>
      <div className="Calendar__weekDays">
        {renderWeekDays()}
      </div>
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
  selectedDay: null,
  selectedDayRange: {
    from: null,
    to: null
  },
  calendarClassName: '',
  calendarTodayClassName: '',
  calendarSelectedDayClassName: '',
  calendarRangeStartClassName: '',
  calendarRangeBetweenClassName: '',
  calendarRangeEndClassName: '',
}

Calendar.propTypes = {
  onChange: PropTypes.func,
  selectedDay: PropTypes.shape(dayShape),
  selectedDayRange: PropTypes.shape({
    from: PropTypes.shape(dayShape),
    to: PropTypes.shape(dayShape),
  }),
  calendarClassName: PropTypes.string,
  calendarTodayClassName: PropTypes.string,
  calendarSelectedDayClassName: PropTypes.string,
  calendarRangeStartClassName: PropTypes.string,
  calendarRangeBetweenClassName: PropTypes.string,
  calendarRangeEndClassName: PropTypes.string,
}

export default Calendar;
