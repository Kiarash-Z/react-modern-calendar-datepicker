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
  PERSIAN_MONTHS,
  getMonthNumber,
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
  minimumDate,
  maximumDate,
  selectorStartingYear,
  selectorEndingYear,
}) => {
  const calendarElement = useRef(null);
  const monthYearTextWrapper = useRef(null);
  const calendarSectionWrapper = useRef(null);
  const monthSelector = useRef(null);
  const yearSelector = useRef(null);
  const yearSelectorWrapper = useRef(null);
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
    const year = toPersianNumber(date.year);
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
      const isInDisabledDaysRange = disabledDays.some(disabledDay =>
        isSameDay(dayItem, disabledDay),
      );
      const isBeforeMinimumDate = isBeforeDate(dayItem, minimumDate);
      const isAfterMaximumDate = isBeforeDate(maximumDate, dayItem);
      const isNotInValidRange = isStandard && (isBeforeMinimumDate || isAfterMaximumDate);
      const isDisabled = isInDisabledDaysRange || isNotInValidRange;
      const additionalClass = getDayClassNames({ ...dayItem, isStandard, isDisabled });
      return (
        <button
          tabIndex="-1"
          key={id}
          className={`Calendar__day ${additionalClass}`}
          onClick={() => {
            if (isDisabled) {
              onDisabledDayError(dayItem); // good for showing error messages
              return;
            }
            handleDayClick({ day, month, year });
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

  const toggleMonthArrows = () => {
    const arrows = [...calendarElement.current.querySelectorAll('.Calendar__monthArrowWrapper')];
    arrows.forEach(arrow => {
      arrow.classList.toggle('-hidden');
    });
  };

  const toggleMonthSelector = () => {
    toggleMonthArrows();
    const monthText = calendarElement.current.querySelector(
      '.Calendar__monthYear.-shown .Calendar__monthText',
    );
    const yearText = monthText.nextSibling;
    const isClosed = yearText.classList.contains('-hidden');
    const scale = isClosed ? 1 : 1.05;
    const translateX = isClosed ? 0 : `-${yearText.offsetWidth / 2}`;
    yearText.style.transform = '';
    monthText.style.transform = `scale(${scale}) translateX(${translateX}px)`;
    monthText.classList.toggle('-activeBackground');
    yearText.classList.toggle('-hidden');
    monthSelector.current.classList.toggle('-open');
  };

  const toggleYearSelector = () => {
    toggleMonthArrows();
    const yearText = calendarElement.current.querySelector(
      '.Calendar__monthYear.-shown .Calendar__yearText',
    );
    const monthText = yearText.previousSibling;
    const isClosed = monthText.classList.contains('-hidden');
    const scale = isClosed ? 1 : 1.05;
    const translateX = isClosed ? 0 : `${monthText.offsetWidth / 2}`;
    const activeSelectorYear = calendarElement.current.querySelector(
      '.Calendar__yearSelectorText.-active',
    );
    yearSelectorWrapper.current.classList.toggle('-faded');
    yearSelector.current.scrollTop =
      activeSelectorYear.offsetTop - activeSelectorYear.offsetHeight * 5.8;
    monthText.style.transform = '';
    yearText.style.transform = `scale(${scale}) translateX(${translateX}px)`;
    yearText.classList.toggle('-activeBackground');
    monthText.classList.toggle('-hidden');
    yearSelector.current.classList.toggle('-open');
  };

  const handleMonthSelect = newMonthNumber => {
    setMainState({
      ...mainState,
      activeDate: { ...activeDate, month: newMonthNumber },
    });
    toggleMonthSelector();
  };

  const renderMonthSelectorItems = () =>
    PERSIAN_MONTHS.map(persianMonth => {
      const monthNumber = getMonthNumber(persianMonth);
      const monthDate = { day: 1, month: monthNumber, year: activeDate.year };
      const isAfterMaximumDate =
        maximumDate && isBeforeDate(maximumDate, { ...monthDate, month: monthNumber });
      const isBeforeMinimumDate =
        minimumDate &&
        (isBeforeDate({ ...monthDate, month: monthNumber + 1 }, minimumDate) ||
          isSameDay({ ...monthDate, month: monthNumber + 1 }, minimumDate));
      return (
        <div key={persianMonth} className="Calendar__monthSelectorItem">
          <button
            tabIndex="-1"
            onClick={() => {
              handleMonthSelect(monthNumber);
            }}
            className={`Calendar__monthSelectorItemText ${
              monthNumber === activeDate.month ? '-active' : ''
            }`}
            type="button"
            disabled={isAfterMaximumDate || isBeforeMinimumDate}
          >
            {persianMonth}
          </button>
        </div>
      );
    });

  const selectYear = year => {
    setMainState({
      ...mainState,
      activeDate: { ...activeDate, year },
    });
    toggleYearSelector();
  };

  const renderSelectorYears = () => {
    // const items =
    const items = [];
    for (let i = selectorStartingYear; i <= selectorEndingYear; i += 1) {
      items.push(i);
    }
    return items.map(item => {
      const isAfterMaximumDate = maximumDate && item > maximumDate.year;
      const isBeforeMinimumDate = minimumDate && item < minimumDate.year;
      return (
        <div key={item} className="Calendar__yearSelectorItem">
          <button
            tabIndex="-1"
            className={`Calendar__yearSelectorText ${activeDate.year === item ? '-active' : ''}`}
            type="button"
            onClick={() => {
              selectYear(item);
            }}
            disabled={isAfterMaximumDate || isBeforeMinimumDate}
          >
            {toPersianNumber(item)}
          </button>
        </div>
      );
    });
  };

  const isNextMonthArrowDisabled =
    maximumDate &&
    isBeforeDate(maximumDate, { ...activeDate, month: activeDate.month + 1, day: 1 });
  const isPreviousMonthArrowDisabled =
    minimumDate &&
    (isBeforeDate({ ...activeDate, day: 1 }, minimumDate) ||
      isSameDay(minimumDate, { ...activeDate, day: 1 }));

  // determine the hidden animated item
  const isCycleCountEven = mainState.cycleCount % 2 === 0;
  return (
    <div
      className={`Calendar ${calendarClassName}`}
      style={{ '--cl-color-primary': colorPrimary, '--cl-color-primary-light': colorPrimaryLight }}
      ref={calendarElement}
    >
      <div className="Calendar__header">
        <button
          tabIndex="-1"
          className="Calendar__monthArrowWrapper -right"
          onClick={() => handleMonthClick('PREVIOUS')}
          aria-label="ماه قبل"
          type="button"
          disabled={isPreviousMonthArrowDisabled}
        >
          <span className="Calendar__monthArrow" alt="فلش راست">
            &nbsp;
          </span>
        </button>
        <div className="Calendar__monthYearContainer" ref={monthYearTextWrapper}>
          &nbsp;
          <div onAnimationEnd={handleAnimationEnd} className="Calendar__monthYear -shown">
            <button
              tabIndex="-1"
              onClick={toggleMonthSelector}
              type="button"
              className="Calendar__monthText"
            >
              {getMonthYearText(isCycleCountEven).split(' ')[0]}
            </button>
            <button
              tabIndex="-1"
              onClick={toggleYearSelector}
              type="button"
              className="Calendar__yearText"
            >
              {getMonthYearText(isCycleCountEven).split(' ')[1]}
            </button>
          </div>
          <div onAnimationEnd={handleAnimationEnd} className="Calendar__monthYear -hiddenNext">
            <button
              tabIndex="-1"
              onClick={toggleMonthSelector}
              type="button"
              className="Calendar__monthText"
            >
              {getMonthYearText(!isCycleCountEven).split(' ')[0]}
            </button>
            <button
              tabIndex="-1"
              onClick={toggleYearSelector}
              type="button"
              className="Calendar__yearText"
            >
              {getMonthYearText(!isCycleCountEven).split(' ')[1]}
            </button>
          </div>
        </div>
        <button
          tabIndex="-1"
          className="Calendar__monthArrowWrapper -left"
          onClick={() => handleMonthClick('NEXT')}
          aria-label="ماه بعد"
          type="button"
          disabled={isNextMonthArrowDisabled}
        >
          <span className="Calendar__monthArrow" alt="فلش چپ">
            &nbsp;
          </span>
        </button>
      </div>
      <div className="Calendar__monthSelectorAnimationWrapper">
        <div className="Calendar__monthSelectorWrapper">
          <div ref={monthSelector} className="Calendar__monthSelector">
            {renderMonthSelectorItems()}
          </div>
        </div>
      </div>

      <div className="Calendar__yearSelectorAnimationWrapper">
        <div ref={yearSelectorWrapper} className="Calendar__yearSelectorWrapper">
          <div ref={yearSelector} className="Calendar__yearSelector">
            {renderSelectorYears()}
          </div>
        </div>
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
  minimumDate: null,
  maximumDate: null,
  disabledDays: [],
  colorPrimary: '#0eca2d',
  colorPrimaryLight: '#cff4d5',
  calendarClassName: '',
  calendarTodayClassName: '',
  calendarSelectedDayClassName: '',
  calendarRangeStartClassName: '',
  calendarRangeBetweenClassName: '',
  calendarRangeEndClassName: '',
  selectorStartingYear: 1300,
  selectorEndingYear: 1450,
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
  minimumDate: PropTypes.shape(dayShape),
  maximumDate: PropTypes.shape(dayShape),
  selectorStartingYear: PropTypes.number,
  selectorEndingYear: PropTypes.number,
};

export { Calendar };
