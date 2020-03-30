import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getDateAccordingToMonth, shallowClone, getValueType } from './shared/generalUtils';
import {
  DAY_SHAPE,
  TYPE_SINGLE_DATE,
  TYPE_RANGE,
  TYPE_MUTLI_DATE,
  LOCALE_SHAPE,
} from './shared/constants';
import { useLocaleUtils, useLocaleLanguage } from './shared/hooks';

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
  arrow,
  colorWeekend,
  colorBackground,
  colorDeepInkOnBackground,
  colorInkBackground,
  colorDisabledOnBackground,
  colorBackgroundTransparent,
  colorPrimary,
  colorInkOnPrimary,
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
  const calendarElement = useRef(null);
  const [mainState, setMainState] = useState({
    activeDate: null,
    monthChangeDirection: '',
    isMonthSelectorOpen: false,
    isYearSelectorOpen: false,
  });

  useEffect(() => {
    const handleKeyUp = ({ key }) => {
      /* istanbul ignore else */
      if (key === 'Tab') calendarElement.current.classList.remove('-noFocusOutline');
    };
    calendarElement.current.addEventListener('keyup', handleKeyUp, false);
    return () => {
      calendarElement.current.removeEventListener('keyup', handleKeyUp, false);
    };
  });

  const { getToday } = useLocaleUtils(locale);
  const { weekDays: weekDaysList, isRtl } = useLocaleLanguage(locale);
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

  const weekdays = weekDaysList.map(weekDay => (
    <abbr key={weekDay.name} title={weekDay.name} className="Calendar__weekDay">
      {weekDay.short}
    </abbr>
  ));

  const handleMonthChange = direction => {
    setMainState({
      ...mainState,
      monthChangeDirection: direction,
    });
  };

  const updateDate = () => {
    setMainState({
      ...mainState,
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
      className={`Calendar -noFocusOutline ${calendarClassName} -${isRtl ? 'rtl' : 'ltr'}`}
      role="grid"
      style={{
        '--cl-arrow': arrow,
        '--cl-color-weekend': colorWeekend,
        '--cl-color-background': colorBackground,
        '--cl-color-ink-on-background': colorInkBackground,
        '--cl-color-deep-ink-on-background': colorDeepInkOnBackground,
        '--cl-color-disabled': colorDisabledOnBackground,
        '--cl-color-background-transparent': colorBackgroundTransparent,
        '--cl-color-primary': colorPrimary,
        '--cl-color-ink-on-primary': colorInkOnPrimary,
        '--cl-color-primary-light': colorPrimaryLight,
        '--animation-duration': slideAnimationDuration,
      }}
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
        locale={locale}
      />

      <MonthSelector
        isOpen={mainState.isMonthSelectorOpen}
        activeDate={activeDate}
        onMonthSelect={selectMonth}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        locale={locale}
      />

      <YearSelector
        isOpen={mainState.isYearSelectorOpen}
        activeDate={activeDate}
        onYearSelect={selectYear}
        selectorStartingYear={selectorStartingYear}
        selectorEndingYear={selectorEndingYear}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        locale={locale}
      />

      <div className="Calendar__weekDays">{weekdays}</div>

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
        locale={locale}
        shouldHighlightWeekends={shouldHighlightWeekends}
        customDaysClassName={customDaysClassName}
        isQuickSelectorOpen={mainState.isYearSelectorOpen || mainState.isMonthSelectorOpen}
      />
      <div className="Calendar__footer">{renderFooter()}</div>
    </div>
  );
};

Calendar.defaultProps = {
  minimumDate: null,
  maximumDate: null,
  arrow: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg class='nc-icon-wrapper' fill='%23000000'%3E%3Cdefs stroke='none'%3E%3C/defs%3E%3Cpath class='cls-1' d='M12 23.25V.75' fill='none' stroke='%23000000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5px'%3E%3C/path%3E%3Cpath class='cls-2' d='M22.5 11.25L12 .75 1.5 11.25' fill='none' stroke='%23000000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5px' fill-rule='evenodd'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`,
  colorWeekend: '#ff2929',
  colorBackground: '#fff',
  colorInkBackground: '#444',
  colorDeepInkOnBackground: '#000',
  colorDisabledOnBackground: '#d4d4d4',
  colorBackgroundTransparent: 'rgba(245,245,245,0)',
  colorPrimary: '#0eca2d',
  colorInkOnPrimary: '#fff',
  colorPrimaryLight: '#cff4d5',
  slideAnimationDuration: '0.4s',
  calendarClassName: '',
  locale: 'en',
  value: null,
  renderFooter: () => null,
  customDaysClassName: [],
};

Calendar.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.shape(DAY_SHAPE),
    PropTypes.shape({ from: PropTypes.shape(DAY_SHAPE), to: PropTypes.shape(DAY_SHAPE) }),
    PropTypes.arrayOf(PropTypes.shape(DAY_SHAPE)),
  ]),
  calendarClassName: PropTypes.string,
  arrow: PropTypes.string,
  colorWeekend: PropTypes.string,
  colorBackground: PropTypes.string,
  colorInkBackground: PropTypes.string,
  colorDeepInkOnBackground: PropTypes.string,
  colorDisabledOnBackground: PropTypes.string,
  colorBackgroundTransparent: PropTypes.string,
  colorPrimary: PropTypes.string,
  colorInkOnPrimary: PropTypes.string,
  colorPrimaryLight: PropTypes.string,
  slideAnimationDuration: PropTypes.string,
  minimumDate: PropTypes.shape(DAY_SHAPE),
  maximumDate: PropTypes.shape(DAY_SHAPE),
  locale: PropTypes.oneOfType([PropTypes.oneOf(['en', 'fa']), LOCALE_SHAPE]),
  renderFooter: PropTypes.func,
  customDaysClassName: PropTypes.arrayOf(
    PropTypes.shape({ ...DAY_SHAPE, className: PropTypes.string }),
  ),
};

export { Calendar };
