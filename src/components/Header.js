import React, { useEffect, useRef } from 'react';

import { isSameDay } from '../shared/generalUtils';
import { getSlideDate, animateContent, handleSlideAnimationEnd } from '../shared/sliderHelpers';
import { useLocaleUtils, useLocaleLanguage } from '../shared/hooks';

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
  locale,
}) => {
  const headerElement = useRef(null);
  const monthYearWrapperElement = useRef(null);

  const { getMonthName, isBeforeDate, getLanguageDigits } = useLocaleUtils(locale);
  const {
    isRtl,
    nextMonth,
    previousMonth,
    openMonthSelector,
    closeMonthSelector,
    openYearSelector,
    closeYearSelector,
  } = useLocaleLanguage(locale);

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

    let translateXDirection = hasMonthSelectorToggled ? 1 : -1;
    if (isRtl) translateXDirection *= -1;
    const scale = !isOpen ? 0.95 : 1;
    const translateX = !isOpen ? 0 : `${(translateXDirection * secondaryElement.offsetWidth) / 2}`;
    if (!isOpen) {
      secondaryElement.removeAttribute('aria-hidden');
    } else {
      secondaryElement.setAttribute('aria-hidden', true);
    }
    secondaryElement.setAttribute('tabindex', isOpen ? '-1' : '0');
    secondaryElement.style.transform = '';
    primaryElement.style.transform = `scale(${scale}) ${
      translateX ? `translateX(${translateX}px)` : ''
    }`;
    primaryElement.classList.toggle('-activeBackground');
    secondaryElement.classList.toggle('-hidden');
    arrows.forEach(arrow => {
      const isHidden = arrow.classList.contains('-hidden');
      arrow.classList.toggle('-hidden');
      if (isHidden) {
        arrow.removeAttribute('aria-hidden');
        arrow.setAttribute('tabindex', '0');
      } else {
        arrow.setAttribute('aria-hidden', true);
        arrow.setAttribute('tabindex', '-1');
      }
    });
  }, [isMonthSelectorOpen, isYearSelectorOpen]);

  const getMonthYearText = isInitialActiveChild => {
    const date = getSlideDate({
      isInitialActiveChild,
      monthChangeDirection,
      activeDate,
      parent: monthYearWrapperElement.current,
    });
    const year = getLanguageDigits(date.year);
    const month = getMonthName(date.month);
    return { month, year };
  };

  const isNextMonthArrowDisabled =
    maximumDate &&
    isBeforeDate(maximumDate, { ...activeDate, month: activeDate.month + 1, day: 1 });
  const isPreviousMonthArrowDisabled =
    minimumDate &&
    (isBeforeDate({ ...activeDate, day: 1 }, minimumDate) ||
      isSameDay(minimumDate, { ...activeDate, day: 1 }));

  const onMonthChangeTrigger = direction => {
    const isMonthChanging = Array.from(monthYearWrapperElement.current.children).some(child =>
      child.classList.contains('-shownAnimated'),
    );
    if (isMonthChanging) return;
    onMonthChange(direction);
  };

  // first button text is the one who shows the current month and year(initial active child)
  const monthYearButtons = [true, false].map(isInitialActiveChild => {
    const { month, year } = getMonthYearText(isInitialActiveChild);
    const isActiveMonth = month === getMonthName(activeDate.month);
    const hiddenStatus = {
      ...(isActiveMonth ? {} : { 'aria-hidden': true }),
    };
    return (
      <div
        onAnimationEnd={handleSlideAnimationEnd}
        className={`Calendar__monthYear ${isInitialActiveChild ? '-shown' : '-hiddenNext'}`}
        role="presentation"
        key={String(isInitialActiveChild)}
        {...hiddenStatus}
      >
        <button
          onClick={onMonthSelect}
          type="button"
          className="Calendar__monthText"
          aria-label={isMonthSelectorOpen ? closeMonthSelector : openMonthSelector}
          tabIndex={isActiveMonth ? '0' : '-1'}
          {...hiddenStatus}
        >
          {month}
        </button>
        <button
          onClick={onYearSelect}
          type="button"
          className="Calendar__yearText"
          aria-label={isYearSelectorOpen ? closeYearSelector : openYearSelector}
          tabIndex={isActiveMonth ? '0' : '-1'}
          {...hiddenStatus}
        >
          {year}
        </button>
      </div>
    );
  });

  return (
    <div ref={headerElement} className="Calendar__header">
      <button
        className="Calendar__monthArrowWrapper -right"
        onClick={() => {
          onMonthChangeTrigger('PREVIOUS');
        }}
        aria-label={previousMonth}
        type="button"
        disabled={isPreviousMonthArrowDisabled}
      >
        <span className="Calendar__monthArrow" />
      </button>
      <div
        className="Calendar__monthYearContainer"
        ref={monthYearWrapperElement}
        data-testid="month-year-container"
      >
        &nbsp;
        {monthYearButtons}
      </div>
      <button
        className="Calendar__monthArrowWrapper -left"
        onClick={() => {
          onMonthChangeTrigger('NEXT');
        }}
        aria-label={nextMonth}
        type="button"
        disabled={isNextMonthArrowDisabled}
      >
        <span className="Calendar__monthArrow" />
      </button>
    </div>
  );
};

export default Header;
