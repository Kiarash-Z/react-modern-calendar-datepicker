import React, { useRef, useEffect } from 'react';

import { MINIMUM_SELECTABLE_YEAR_SUBTRACT, MAXIMUM_SELECTABLE_YEAR_SUM } from '../shared/constants';
import handleKeyboardNavigation from '../shared/keyboardNavigation';
import { useLocaleUtils } from '../shared/hooks';

const YearSelector = ({
  isOpen,
  activeDate,
  onYearSelect,
  selectorStartingYear,
  selectorEndingYear,
  maximumDate,
  minimumDate,
  locale,
}) => {
  const wrapperElement = useRef(null);
  const yearListElement = useRef(null);

  const { getLanguageDigits, getToday } = useLocaleUtils(locale);
  const startingYearValue =
    selectorStartingYear || getToday().year - MINIMUM_SELECTABLE_YEAR_SUBTRACT;
  const endingYearValue = selectorEndingYear || getToday().year + MAXIMUM_SELECTABLE_YEAR_SUM;
  const allYears = [];
  for (let i = startingYearValue; i <= endingYearValue; i += 1) {
    allYears.push(i);
  }
  useEffect(() => {
    const classToggleMethod = isOpen ? 'add' : 'remove';
    const activeSelectorYear = wrapperElement.current.querySelector(
      '.Calendar__yearSelectorItem.-active',
    );
    if (!activeSelectorYear) {
      throw new RangeError(
        `Provided value for year is out of selectable year range. You're probably using a wrong locale prop value or your provided value's locale is different from the date picker locale. Try changing the 'locale' prop or the value you've provided.`,
      );
    }
    wrapperElement.current.classList[classToggleMethod]('-faded');
    yearListElement.current.scrollTop =
      activeSelectorYear.offsetTop - activeSelectorYear.offsetHeight * 5;
    yearListElement.current.classList[classToggleMethod]('-open');
  }, [isOpen]);

  const renderSelectorYears = () => {
    return allYears.map(item => {
      const isAfterMaximumDate = maximumDate && item > maximumDate.year;
      const isBeforeMinimumDate = minimumDate && item < minimumDate.year;
      const isSelected = activeDate.year === item;
      return (
        <li key={item} className={`Calendar__yearSelectorItem ${isSelected ? '-active' : ''}`}>
          <button
            tabIndex={isSelected && isOpen ? '0' : '-1'}
            className="Calendar__yearSelectorText"
            type="button"
            onClick={() => {
              onYearSelect(item);
            }}
            disabled={isAfterMaximumDate || isBeforeMinimumDate}
            aria-pressed={isSelected}
            data-is-default-selectable={isSelected}
          >
            {getLanguageDigits(item)}
          </button>
        </li>
      );
    });
  };

  const handleKeyDown = e => {
    handleKeyboardNavigation(e, { allowVerticalArrows: false });
  };

  return (
    <div
      className="Calendar__yearSelectorAnimationWrapper"
      role="presentation"
      {...(isOpen ? {} : { 'aria-hidden': true })}
    >
      <div
        ref={wrapperElement}
        className="Calendar__yearSelectorWrapper"
        role="presentation"
        data-testid="year-selector-wrapper"
        onKeyDown={handleKeyDown}
      >
        <ul ref={yearListElement} className="Calendar__yearSelector" data-testid="year-selector">
          {renderSelectorYears()}
        </ul>
      </div>
    </div>
  );
};

YearSelector.defaultProps = {
  selectorStartingYear: 0,
  selectorEndingYear: 0,
};

export default YearSelector;
