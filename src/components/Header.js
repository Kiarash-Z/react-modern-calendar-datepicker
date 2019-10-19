import React, { useEffect, useRef } from 'react';

import { isBeforeDate, isSameDay, getMonthName, toPersianNumber } from '../shared/utils';
import { getSlideDate, animateContent, handleSlideAnimationEnd } from '../shared/sliderHelpers';

const Header = ({
  maximumDate,
  minimumDate,
  onMonthChange,
  activeDate,
  monthChangeDirection,
  onMonthSelect,
  onYearSelect,
  isMonthSelectorOpen,
  isYearSelectorOpen,
}) => {
  const headerElement = useRef(null);
  const monthYearWrapperElement = useRef(null);

  useEffect(() => {
    if (!monthChangeDirection) return;
    animateContent({
      direction: monthChangeDirection,
      parent: monthYearWrapperElement.current,
    });
  }, [monthChangeDirection]);

  useEffect(() => {
    const isOpen = isMonthSelectorOpen || isYearSelectorOpen;
    const monthText = headerElement.current.querySelector(
      '.Calendar__monthYear.-shown .Calendar__monthText',
    );
    const yearText = monthText.nextSibling;
    const hasActiveBackground = element => element.classList.contains('-activeBackground');
    const isInitialRender =
      !isOpen && !hasActiveBackground(monthText) && !hasActiveBackground(yearText);
    if (isInitialRender) return;

    const arrows = [...headerElement.current.querySelectorAll('.Calendar__monthArrowWrapper')];
    const hasMonthSelectorToggled = isMonthSelectorOpen || hasActiveBackground(monthText);
    const primaryElement = hasMonthSelectorToggled ? monthText : yearText;
    const secondaryElement = hasMonthSelectorToggled ? yearText : monthText;

    const translateXDirection = hasMonthSelectorToggled ? -1 : 1;
    const scale = !isOpen ? 1 : 1.05;
    const translateX = !isOpen ? 0 : `${(translateXDirection * secondaryElement.offsetWidth) / 2}`;
    secondaryElement.style.transform = '';
    primaryElement.style.transform = `scale(${scale}) translateX(${translateX}px)`;
    primaryElement.classList.toggle('-activeBackground');
    secondaryElement.classList.toggle('-hidden');
    arrows.forEach(arrow => {
      arrow.classList.toggle('-hidden');
    });
  }, [isMonthSelectorOpen, isYearSelectorOpen]);

  const getMonthYearText = isInitialActiveChild => {
    const date = getSlideDate({
      isInitialActiveChild,
      monthChangeDirection,
      activeDate,
      parent: monthYearWrapperElement.current,
    });
    const year = toPersianNumber(date.year);
    const month = getMonthName(date.month);
    return `${month} ${year}`;
  };

  const isNextMonthArrowDisabled =
    maximumDate &&
    isBeforeDate(maximumDate, { ...activeDate, month: activeDate.month + 1, day: 1 });
  const isPreviousMonthArrowDisabled =
    minimumDate &&
    (isBeforeDate({ ...activeDate, day: 1 }, minimumDate) ||
      isSameDay(minimumDate, { ...activeDate, day: 1 }));

  return (
    <div ref={headerElement} className="Calendar__header">
      <button
        tabIndex="-1"
        className="Calendar__monthArrowWrapper -right"
        onClick={() => onMonthChange('PREVIOUS')}
        aria-label="ماه قبل"
        type="button"
        disabled={isPreviousMonthArrowDisabled}
      >
        <span className="Calendar__monthArrow" alt="فلش راست">
          &nbsp;
        </span>
      </button>
      <div className="Calendar__monthYearContainer" ref={monthYearWrapperElement}>
        &nbsp;
        <div onAnimationEnd={handleSlideAnimationEnd} className="Calendar__monthYear -shown">
          <button
            tabIndex="-1"
            onClick={onMonthSelect}
            type="button"
            className="Calendar__monthText"
          >
            {getMonthYearText(true).split(' ')[0]}
          </button>
          <button tabIndex="-1" onClick={onYearSelect} type="button" className="Calendar__yearText">
            {getMonthYearText(true).split(' ')[1]}
          </button>
        </div>
        <div onAnimationEnd={handleSlideAnimationEnd} className="Calendar__monthYear -hiddenNext">
          <button
            tabIndex="-1"
            onClick={onMonthSelect}
            type="button"
            className="Calendar__monthText"
          >
            {getMonthYearText(false).split(' ')[0]}
          </button>
          <button tabIndex="-1" onClick={onYearSelect} type="button" className="Calendar__yearText">
            {getMonthYearText(false).split(' ')[1]}
          </button>
        </div>
      </div>
      <button
        tabIndex="-1"
        className="Calendar__monthArrowWrapper -left"
        onClick={() => onMonthChange('NEXT')}
        aria-label="ماه بعد"
        type="button"
        disabled={isNextMonthArrowDisabled}
      >
        <span className="Calendar__monthArrow" alt="فلش چپ">
          &nbsp;
        </span>
      </button>
    </div>
  );
};

export default Header;
