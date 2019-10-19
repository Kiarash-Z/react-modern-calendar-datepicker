import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { toPersianNumber } from '../shared/utils';

const YearSelector = ({
  isOpen,
  activeDate,
  onYearSelect,
  startingYear,
  endingYear,
  maximumDate,
  minimumDate,
}) => {
  const wrapperElement = useRef(null);
  const yearListElement = useRef(null);

  useEffect(() => {
    const classToggleMethod = isOpen ? 'add' : 'remove';
    const activeSelectorYear = wrapperElement.current.querySelector(
      '.Calendar__yearSelectorText.-active',
    );
    wrapperElement.current.classList[classToggleMethod]('-faded');
    yearListElement.current.scrollTop =
      activeSelectorYear.offsetTop - activeSelectorYear.offsetHeight * 5.8;
    yearListElement.current.classList[classToggleMethod]('-open');
  }, [isOpen]);

  const renderSelectorYears = () => {
    const items = [];
    for (let i = startingYear; i <= endingYear; i += 1) {
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
              onYearSelect(item);
            }}
            disabled={isAfterMaximumDate || isBeforeMinimumDate}
          >
            {toPersianNumber(item)}
          </button>
        </div>
      );
    });
  };

  return (
    <div className="Calendar__yearSelectorAnimationWrapper">
      <div ref={wrapperElement} className="Calendar__yearSelectorWrapper">
        <div ref={yearListElement} className="Calendar__yearSelector">
          {renderSelectorYears()}
        </div>
      </div>
    </div>
  );
};

YearSelector.propTypes = {
  startingYear: PropTypes.number,
  endingYear: PropTypes.number,
};

YearSelector.defaultProps = {
  startingYear: 1300,
  endingYear: 1450,
};

export default YearSelector;
