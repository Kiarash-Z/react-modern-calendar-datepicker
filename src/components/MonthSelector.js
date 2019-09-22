import React, { useRef, useEffect, useMemo } from 'react';

import { isSameDay } from '../shared/independentUtils';
import utils from '../shared/localeUtils';

const MonthSelector = ({
  activeDate,
  maximumDate,
  minimumDate,
  onMonthSelect,
  isOpen,
  isPersian,
}) => {
  const monthSelector = useRef(null);

  useEffect(() => {
    const classToggleMethod = isOpen ? 'add' : 'remove';
    monthSelector.current.classList[classToggleMethod]('-open');
  }, [isOpen]);

  const { getMonthNumber, isBeforeDate, monthsList } = useMemo(() => utils(isPersian), [isPersian]);

  const renderMonthSelectorItems = () =>
    monthsList.map(persianMonth => {
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
              onMonthSelect(monthNumber);
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
  return (
    <div className="Calendar__monthSelectorAnimationWrapper">
      <div className="Calendar__monthSelectorWrapper">
        <div ref={monthSelector} className="Calendar__monthSelector">
          {renderMonthSelectorItems()}
        </div>
      </div>
    </div>
  );
};

export default MonthSelector;
