import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import utils from '../src/shared/localeUtils';

import { Calendar } from '../src';
import { getDateAccordingToMonth } from '../src/shared/generalUtils';
import { Header } from '../src/components';

const { getMonthLength, getToday, getMonthFirstWeekday, getMonthName, isBeforeDate } = utils();

const renderCalendar = props => {
  const selectors = render(<Calendar {...props} />);
  const activeSection = Array.from(selectors.getByTestId('days-section-wrapper').children).find(
    child => child.classList.contains('-shown'),
  );
  const days = Array.from(activeSection.children);
  const standardDays = days.filter(day => !day.classList.contains('-blank'));
  return { ...selectors, activeSection, days, standardDays };
};

describe('Calendar Days', () => {
  describe('Basic Rendering', () => {
    test(`renders current month's all days`, () => {
      const currentMonthLength = getMonthLength(getToday());
      const { standardDays } = renderCalendar();

      expect(standardDays).toHaveLength(currentMonthLength);
    });

    test('displays the correct weekday for the first day of the month', () => {
      const { days } = renderCalendar();
      const weekday = getMonthFirstWeekday(getToday());
      const startingBlankDays = days.slice(0, 7).filter(day => day.classList.contains('-blank'));

      expect(startingBlankDays).toHaveLength(weekday);
    });

    test('appends blank days for additional days week', () => {
      const monthWith5Weeks = { year: 2019, month: 10, day: 5 };
      const { days } = renderCalendar({ value: monthWith5Weeks });

      expect(days.length / 7).toBeGreaterThan(5);
      expect(days.length / 7).toBeLessThan(6);
    });

    test(`shows current month and year title when there's no value`, () => {
      const date = getToday();
      const currentYear = date.year;
      const currentMonth = getMonthName(date.month);
      const { getByTestId } = renderCalendar();
      const shownMonthYear = Array.from(getByTestId('month-year-container').children).find(child =>
        child.classList.contains('-shown'),
      );
      const [monthButton, yearButton] = shownMonthYear.children;

      expect(monthButton.textContent).toBe(currentMonth);
      expect(yearButton.textContent).toBe(String(currentYear));
    });

    test(`shows date's month and year as title when it has value`, () => {
      const singleDateValue = { year: 2018, month: 2, day: 1 };
      const { getByTestId, rerender } = renderCalendar({ value: singleDateValue });
      const shownMonthYear = Array.from(getByTestId('month-year-container').children).find(child =>
        child.classList.contains('-shown'),
      );
      const [monthButton, yearButton] = shownMonthYear.children;

      expect(monthButton.textContent).toBe('February');
      expect(yearButton.textContent).toBe('2018');

      const rangeValue = {
        from: { year: 2001, month: 10, day: 27 },
        to: { year: 2001, month: 11, day: 3 },
      };
      rerender(<Calendar value={rangeValue} />);
      expect(monthButton.textContent).toBe('October');
      expect(yearButton.textContent).toBe('2001');

      const multiDateValue = [
        { year: 2000, month: 1, day: 1 },
        { year: 2001, month: 10, day: 1 },
        { year: 2015, month: 6, day: 1 },
      ];
      rerender(<Calendar value={multiDateValue} />);
      expect(monthButton.textContent).toBe('January');
      expect(yearButton.textContent).toBe('2000');
    });

    test('disables specified days', () => {
      const activeDate = { year: 2019, month: 10, day: 1 };
      const disabledDays = [{ year: 2019, month: 10, day: 2 }, { year: 2019, month: 10, day: 5 }];
      const { standardDays } = renderCalendar({ value: activeDate, disabledDays });

      expect(standardDays[1]).toHaveClass('-disabled');
      expect(standardDays[4]).toHaveClass('-disabled');
    });
  });

  describe('Month Changes by Arrows', () => {
    test('changes month on arrow click', () => {
      const { getByLabelText, getByTestId, standardDays } = renderCalendar();
      const nextArrow = getByLabelText(/next month/i);
      const previousArrow = getByLabelText(/previous month/i);
      const findHiddenSliderItem = parentTestId =>
        Array.from(getByTestId(parentTestId).children).find(
          child => !child.classList.contains('-shown'),
        );
      const today = getToday();
      const currentMonthLength = getMonthLength(today);
      const nextMonthDate = getDateAccordingToMonth(today, 'NEXT');
      const nextMonthLength = getMonthLength(nextMonthDate);
      const [nextMonthButton, nextYearButton] = findHiddenSliderItem(
        'month-year-container',
      ).children;
      const hiddenNextMonthDaysSection = findHiddenSliderItem('days-section-wrapper');

      // next month arrow click
      fireEvent.click(nextArrow);
      const hiddenNextMonthDays = Array.from(hiddenNextMonthDaysSection.children).filter(
        day => !day.classList.contains('-blank'),
      );

      expect(nextYearButton.textContent).toBe(String(nextMonthDate.year));
      expect(nextMonthButton.textContent).toBe(getMonthName(nextMonthDate.month));
      expect(hiddenNextMonthDays).toHaveLength(nextMonthLength);

      // previous month arrow click
      const [previousMonthButton, previousYearButton] = findHiddenSliderItem(
        'month-year-container',
      ).children;
      fireEvent.click(previousArrow);
      const hiddenPreviousMonthDays = standardDays.filter(day => !day.classList.contains('-blank'));

      expect(previousYearButton.textContent).toBe(String(today.year));
      expect(previousMonthButton.textContent).toBe(getMonthName(today.month));
      expect(hiddenPreviousMonthDays).toHaveLength(currentMonthLength);
    });

    test('avoids parallel clicks on a month arrow button', () => {
      const mockedMonthChange = jest.fn();
      const activeDate = getToday();
      const { getByLabelText, rerender } = render(
        <Header activeDate={activeDate} onMonthChange={mockedMonthChange} />,
      );
      const nextArrow = getByLabelText(/next month/i);

      fireEvent.click(nextArrow);

      rerender(
        <Header
          activeDate={activeDate}
          monthChangeDirection="NEXT"
          onMonthChange={mockedMonthChange}
        />,
      );

      fireEvent.click(nextArrow);

      expect(mockedMonthChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Minimum & Maximum Dates', () => {
    test('disables days before minimum date and after maximum date', () => {
      const minimumDate = { year: 2019, month: 10, day: 22 };
      const maximumDate = { year: 2019, month: 10, day: 27 };
      const { standardDays } = renderCalendar({ minimumDate, value: minimumDate, maximumDate });
      const areAllDisabled = list => list.every(day => day.classList.contains('-disabled'));
      const daysBeforeMinimum = standardDays.filter(day =>
        isBeforeDate(
          {
            year: 2019,
            month: 10,
            day: Number(day.textContent),
          },
          minimumDate,
        ),
      );
      const daysAfterMaximum = standardDays.filter(day =>
        isBeforeDate(maximumDate, {
          year: 2019,
          month: 10,
          day: Number(day.textContent),
        }),
      );
      expect(areAllDisabled(daysBeforeMinimum)).toBe(true);
      expect(areAllDisabled(daysAfterMaximum)).toBe(true);
    });

    test('disables the related month arrow', () => {
      const { getByLabelText, getByTestId, rerender } = renderCalendar({
        maximumDate: { year: 2019, month: 12, day: 10 },
        value: { year: 2019, month: 10, day: 20 },
      });

      const sections = Array.from(getByTestId('days-section-wrapper').children);
      const monthYearItems = Array.from(getByTestId('month-year-container').children);

      const nextArrow = getByLabelText(/next month/i);
      const previousArrow = getByLabelText(/previous month/i);

      const endSlideAnimation = () => {
        const findAnimatedChild = child => child.classList.contains('-shownAnimated');
        const animatingMonthYearItem = monthYearItems.find(findAnimatedChild);
        const animatingSectionItem = sections.find(findAnimatedChild);
        fireEvent.animationEnd(animatingMonthYearItem);
        fireEvent.animationEnd(animatingSectionItem);
      };

      const changeMonth = arrow => {
        fireEvent.click(arrow);
        endSlideAnimation();
      };

      // next arrow basic
      expect(nextArrow).not.toHaveAttribute('disabled');
      expect(previousArrow).not.toHaveAttribute('disabled');

      changeMonth(nextArrow);
      expect(nextArrow).not.toHaveAttribute('disabled');

      changeMonth(nextArrow);
      expect(nextArrow).toHaveAttribute('disabled');

      // previous arrow basic
      rerender(
        <Calendar
          value={{ year: 2019, month: 12, day: 10 }}
          minimumDate={{ year: 2019, month: 10, day: 5 }}
        />,
      );
      changeMonth(previousArrow);
      expect(previousArrow).not.toHaveAttribute('disabled');

      changeMonth(previousArrow);
      expect(previousArrow).toHaveAttribute('disabled');
    });
  });
});
