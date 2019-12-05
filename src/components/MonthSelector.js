import React, { useRef, useEffect } from 'react';

import { isSameDay } from '../shared/generalUtils';
import handleKeyboardNavigation from '../shared/keyboardNavigation';
import { useLocaleUtils, useLocaleLanguage } from '../shared/hooks';

const MonthSelector = ({ activeDate, maximumDate, minimumDate, onMonthSelect, isOpen, locale }) => {
  const monthSelector = useRef(null);

  useEffect(() => {
    const classToggleMethod = isOpen ? 'add' : 'remove';
    monthSelector.current.classList[classToggleMethod]('-open');
  }, [isOpen]);

  const { getMonthNumber, isBeforeDate } = useLocaleUtils(locale);
  const { months: monthsList } = useLocaleLanguage(locale);

  const handleKeyDown = e => {
    handleKeyboardNavigation(e, { allowVerticalArrows: false });
  };

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
      const isSelected = monthNumber === activeDate.month;
      return (
        <li
          key={persianMonth}
          className={`Calendar__monthSelectorItem ${isSelected ? '-active' : ''}`}
        >
          <button
            tabIndex={isSelected && isOpen ? '0' : '-1'}
            onClick={() => {
              onMonthSelect(monthNumber);
            }}
            className="Calendar__monthSelectorItemText"
            type="button"
            disabled={isAfterMaximumDate || isBeforeMinimumDate}
            aria-pressed={isSelected}
            data-is-default-selectable={isSelected}
          >
            {persianMonth}
          </button>
        </li>
      );
    });
  return (
    <div
      role="presentation"
      className="Calendar__monthSelectorAnimationWrapper"
      {...(isOpen ? {} : { 'aria-hidden': true })}
    >
      <div
        role="presentation"
        data-testid="month-selector-wrapper"
        className="Calendar__monthSelectorWrapper"
        onKeyDown={handleKeyDown}
      >
        <ul ref={monthSelector} className="Calendar__monthSelector" data-testid="month-selector">
          {renderMonthSelectorItems()}
        </ul>
      </div>
    </div>
  );
};

export default MonthSelector;
