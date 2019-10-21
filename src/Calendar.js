import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import utils from './shared/localeUtils';
import { getDateAccordingToMonth, shallowClone, getValueType } from './shared/generalUtils';
import { DAY_SHAPE, TYPE_SINGLE_DATE, TYPE_RANGE, TYPE_MUTLI_DATE } from './shared/constants';

import { Header, MonthSelector, YearSelector, DaysList } from './components';

const Calendar = ({
  value,
  onChange,
  onDisabledDayError,
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
  isPersian,
  shouldHighlightWeekends,
}) => {
  const calendarElement = useRef(null);
  const [mainState, setMainState] = useState({
    activeDate: null,
    monthChangeDirection: '',
    isMonthSelectorOpen: false,
    isYearSelectorOpen: false,
  });

  const { getToday, weekDaysList } = useMemo(() => utils(isPersian), [isPersian]);
  const today = getToday();

  const createStateToggler = property => () => {
    setMainState({ ...mainState, [property]: !mainState[property] });
  };

  const toggleMonthSelector = createStateToggler('isMonthSelectorOpen');
  const toggleYearSelector = createStateToggler('isYearSelectorOpen');

  const getComputedActiveDate = () => {
    const valueType = getValueType(value);
    if (valueType === TYPE_MUTLI_DATE && value.length) return shallowClone(value[0]);
    if (valueType === TYPE_SINGLE_DATE && value) return shallowClone(value);
    if (valueType === TYPE_RANGE && value.from) return shallowClone(value.from);
    return shallowClone(today);
  };

  const activeDate = mainState.activeDate
    ? shallowClone(mainState.activeDate)
    : getComputedActiveDate();

  const renderWeekDays = () =>
    weekDaysList.map(weekDay => (
      <span key={weekDay} className="Calendar__weekDay">
        {weekDay[0]}
      </span>
    ));

  const handleMonthChange = direction => {
    setMainState({
      ...mainState,
      monthChangeDirection: direction,
    });
  };

  const updateDate = () => {
    setMainState({
      activeDate: getDateAccordingToMonth(activeDate, mainState.monthChangeDirection),
      monthChangeDirection: '',
    });
  };

  const selectMonth = newMonthNumber => {
    setMainState({
      ...mainState,
      activeDate: { ...activeDate, month: newMonthNumber },
      isMonthSelectorOpen: false,
    });
  };

  const selectYear = year => {
    setMainState({
      ...mainState,
      activeDate: { ...activeDate, year },
      isYearSelectorOpen: false,
    });
  };

  return (
    <div
      className={`Calendar ${calendarClassName} ${isPersian ? '-persian' : ''}`}
      style={{ '--cl-color-primary': colorPrimary, '--cl-color-primary-light': colorPrimaryLight }}
      ref={calendarElement}
    >
      <Header
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        activeDate={activeDate}
        onMonthChange={handleMonthChange}
        onMonthSelect={toggleMonthSelector}
        onYearSelect={toggleYearSelector}
        monthChangeDirection={mainState.monthChangeDirection}
        isMonthSelectorOpen={mainState.isMonthSelectorOpen}
        isYearSelectorOpen={mainState.isYearSelectorOpen}
        isPersian={isPersian}
      />

      <MonthSelector
        isOpen={mainState.isMonthSelectorOpen}
        activeDate={activeDate}
        onMonthSelect={selectMonth}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        isPersian={isPersian}
      />

      <YearSelector
        isOpen={mainState.isYearSelectorOpen}
        activeDate={activeDate}
        onYearSelect={selectYear}
        selectorStartingYear={selectorStartingYear}
        selectorEndingYear={selectorEndingYear}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        isPersian={isPersian}
      />

      <div className="Calendar__weekDays">{renderWeekDays()}</div>

      <DaysList
        activeDate={activeDate}
        value={value}
        monthChangeDirection={mainState.monthChangeDirection}
        onSlideChange={updateDate}
        disabledDays={disabledDays}
        onDisabledDayError={onDisabledDayError}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onChange={onChange}
        calendarTodayClassName={calendarTodayClassName}
        calendarSelectedDayClassName={calendarSelectedDayClassName}
        calendarRangeStartClassName={calendarRangeStartClassName}
        calendarRangeEndClassName={calendarRangeEndClassName}
        calendarRangeBetweenClassName={calendarRangeBetweenClassName}
        isPersian={isPersian}
        shouldHighlightWeekends={shouldHighlightWeekends}
      />
    </div>
  );
};

Calendar.defaultProps = {
  minimumDate: null,
  maximumDate: null,
  colorPrimary: '#0eca2d',
  colorPrimaryLight: '#cff4d5',
  calendarClassName: '',
  isPersian: false,
  value: null,
};

Calendar.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.shape(DAY_SHAPE),
    PropTypes.shape({ from: PropTypes.shape(DAY_SHAPE), to: PropTypes.shape(DAY_SHAPE) }),
    PropTypes.arrayOf(PropTypes.shape(DAY_SHAPE)),
  ]),
  calendarClassName: PropTypes.string,
  colorPrimary: PropTypes.string,
  colorPrimaryLight: PropTypes.string,
  minimumDate: PropTypes.shape(DAY_SHAPE),
  maximumDate: PropTypes.shape(DAY_SHAPE),
  isPersian: PropTypes.bool,
};

export { Calendar };
