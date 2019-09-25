import React, { useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { getSlideDate, handleSlideAnimationEnd, animateContent } from '../shared/sliderHelpers';
import utils from '../shared/localeUtils';
import {
  deepCloneObject,
  isSameDay,
  createUniqueRange,
  getValueType,
} from '../shared/generalUtils';
import { DAY_SHAPE, TYPE_SINGLE_DATE, TYPE_RANGE, TYPE_MUTLI_DATE } from '../shared/constants';

const DaysList = ({
  activeDate,
  value,
  monthChangeDirection,
  onSlideChange,
  disabledDays,
  onDisabledDayError,
  minimumDate,
  maximumDate,
  onChange,
  isPersian,
  calendarTodayClassName,
  calendarSelectedDayClassName,
  calendarRangeStartClassName,
  calendarRangeEndClassName,
  calendarRangeBetweenClassName,
  shouldHighlightWeekends,
}) => {
  const calendarSectionWrapper = useRef(null);

  const {
    getToday,
    isBeforeDate,
    checkDayInDayRange,
    getMonthFirstWeekday,
    getMonthLength,
    getLanguageDigits,
  } = useMemo(() => utils(isPersian), [isPersian]);
  const today = getToday();

  useEffect(() => {
    if (!monthChangeDirection) return;
    animateContent({
      direction: monthChangeDirection,
      parent: calendarSectionWrapper.current,
    });
  }, [monthChangeDirection]);

  const getDayRangeValue = day => {
    const clonedDayRange = deepCloneObject(value);
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
      return value;
    }

    return dayRangeValue;
  };

  const getMultiDateValue = day => {
    const isAlreadyExisting = value.some(valueDay => isSameDay(valueDay, day));
    const addedToValue = [...value, day];
    const removedFromValue = value.filter(valueDay => !isSameDay(valueDay, day));
    return isAlreadyExisting ? removedFromValue : addedToValue;
  };

  const handleDayClick = day => {
    const valueType = getValueType(value);
    if (valueType === TYPE_SINGLE_DATE) onChange(day);
    else if (valueType === TYPE_RANGE) onChange(getDayRangeValue(day));
    else if (valueType === TYPE_MUTLI_DATE) onChange(getMultiDateValue(day));
  };

  const isSingleDateSelected = day => {
    const valueType = getValueType(value);
    if (valueType === TYPE_SINGLE_DATE) return isSameDay(day, value);
    if (valueType === TYPE_MUTLI_DATE) return value.some(valueDay => isSameDay(valueDay, day));
  };

  const getDayClassNames = dayItem => {
    const isToday = isSameDay(dayItem, today);
    const isSelected = isSingleDateSelected(dayItem);
    const { from: startingDay, to: endingDay } = value || {};
    const isStartedDayRange = isSameDay(dayItem, startingDay);
    const isEndingDayRange = isSameDay(dayItem, endingDay);
    const isWithinRange = checkDayInDayRange({ day: dayItem, from: startingDay, to: endingDay });
    const classNames = ''
      .concat(isToday && !isSelected ? ` -today ${calendarTodayClassName}` : '')
      .concat(!dayItem.isStandard ? ' -blank' : '')
      .concat(dayItem.isWeekend && shouldHighlightWeekends ? ' -weekend' : '')
      .concat(isSelected ? ` -selected ${calendarSelectedDayClassName}` : '')
      .concat(isStartedDayRange ? ` -selectedStart ${calendarRangeStartClassName}` : '')
      .concat(isEndingDayRange ? ` -selectedEnd ${calendarRangeEndClassName}` : '')
      .concat(isWithinRange ? ` -selectedBetween ${calendarRangeBetweenClassName}` : '')
      .concat(dayItem.isDisabled ? '-disabled' : '');
    return classNames;
  };

  const getViewMonthDays = date => {
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

  const renderMonthDays = isInitialActiveChild => {
    const date = getSlideDate({
      activeDate,
      isInitialActiveChild,
      monthChangeDirection,
      parent: calendarSectionWrapper.current,
    });
    const allDays = getViewMonthDays(date);
    return allDays.map(({ id, value: day, month, year, isStandard }, index) => {
      const dayItem = { day, month, year };
      const isInDisabledDaysRange = disabledDays.some(disabledDay =>
        isSameDay(dayItem, disabledDay),
      );
      const isBeforeMinimumDate = isBeforeDate(dayItem, minimumDate);
      const isAfterMaximumDate = isBeforeDate(maximumDate, dayItem);
      const isNotInValidRange = isStandard && (isBeforeMinimumDate || isAfterMaximumDate);
      const isDisabled = isInDisabledDaysRange || isNotInValidRange;
      const isWeekend = (!isPersian && index % 7 === 0) || index % 7 === 6;
      const additionalClass = getDayClassNames({ ...dayItem, isWeekend, isStandard, isDisabled });
      return (
        <button
          tabIndex="-1"
          key={id}
          className={`Calendar__day ${isPersian ? '-persian' : '-gregorian'} ${additionalClass}`}
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
          {getLanguageDigits(day)}
        </button>
      );
    });
  };

  return (
    <div ref={calendarSectionWrapper} className="Calendar__sectionWrapper">
      <div
        onAnimationEnd={e => {
          handleSlideAnimationEnd(e);
          onSlideChange();
        }}
        className="Calendar__section -shown"
      >
        {renderMonthDays(true)}
      </div>
      <div
        onAnimationEnd={e => {
          handleSlideAnimationEnd(e);
          onSlideChange();
        }}
        className="Calendar__section -hiddenNext"
      >
        {renderMonthDays(false)}
      </div>
    </div>
  );
};

DaysList.propTypes = {
  onChange: PropTypes.func,
  onDisabledDayError: PropTypes.func,
  disabledDays: PropTypes.arrayOf(PropTypes.shape(DAY_SHAPE)),
  calendarTodayClassName: PropTypes.string,
  calendarSelectedDayClassName: PropTypes.string,
  calendarRangeStartClassName: PropTypes.string,
  calendarRangeBetweenClassName: PropTypes.string,
  calendarRangeEndClassName: PropTypes.string,
  shouldHighlightWeekends: PropTypes.bool,
};

DaysList.defaultProps = {
  onChange: () => {},
  onDisabledDayError: () => {},
  disabledDays: [],
  calendarTodayClassName: '',
  calendarSelectedDayClassName: '',
  calendarRangeStartClassName: '',
  calendarRangeBetweenClassName: '',
  calendarRangeEndClassName: '',
  shouldHighlightWeekends: false,
};

export default DaysList;
