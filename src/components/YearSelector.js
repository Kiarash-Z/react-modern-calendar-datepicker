import React, { useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import utils from '../shared/localeUtils';
import { MINIMUM_SELECTABLE_YEAR_SUBTRACT, MAXIMUM_SELECTABLE_YEAR_SUM } from '../shared/constants';

const YearSelector = ({
  isOpen,
  activeDate,
  onYearSelect,
  selectorStartingYear,
  selectorEndingYear,
  maximumDate,
  minimumDate,
  isPersian,
}) => {
  const wrapperElement = useRef(null);
  const yearListElement = useRef(null);

  const { getLanguageDigits, getToday } = useMemo(() => utils(isPersian), [isPersian]);

  useEffect(() => {
    const classToggleMethod = isOpen ? 'add' : 'remove';
    const activeSelectorYear = wrapperElement.current.querySelector(
      '.Calendar__yearSelectorItem.-active',
    );
    wrapperElement.current.classList[classToggleMethod]('-faded');
    yearListElement.current.scrollTop =
      activeSelectorYear.offsetTop - activeSelectorYear.offsetHeight * 5;
    yearListElement.current.classList[classToggleMethod]('-open');
  }, [isOpen]);

  const renderSelectorYears = () => {
    const items = [];
    const startingYearValue =
      selectorStartingYear || getToday().year - MINIMUM_SELECTABLE_YEAR_SUBTRACT;
    const endingYearValue = selectorEndingYear || getToday().year + MAXIMUM_SELECTABLE_YEAR_SUM;
    for (let i = startingYearValue; i <= endingYearValue; i += 1) {
      items.push(i);
    }
    return items.map(item => {
      const isAfterMaximumDate = maximumDate && item > maximumDate.year;
      const isBeforeMinimumDate = minimumDate && item < minimumDate.year;
      return (
        <div
          key={item}
          className={`Calendar__yearSelectorItem ${activeDate.year === item ? '-active' : ''}`}
        >
          <button
            tabIndex="-1"
            className="Calendar__yearSelectorText"
            type="button"
            onClick={() => {
              onYearSelect(item);
            }}
            disabled={isAfterMaximumDate || isBeforeMinimumDate}
          >
            {getLanguageDigits(item)}
          </button>
        </div>
      );
    });
  };

  return (
    <div className="Calendar__yearSelectorAnimationWrapper">
      <div ref={wrapperElement} className="Calendar__yearSelectorWrapper">
        <div ref={yearListElement} className="Calendar__yearSelector" data-testid="year-selector">
          {renderSelectorYears()}
        </div>
      </div>
    </div>
  );
};

YearSelector.propTypes = {
  selectorStartingYear: PropTypes.number,
  selectorEndingYear: PropTypes.number,
};

YearSelector.defaultProps = {
  selectorStartingYear: 0,
  selectorEndingYear: 0,
};

export default YearSelector;
