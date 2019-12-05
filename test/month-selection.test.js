import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';

import { Calendar } from '../src';
import { GREGORIAN_MONTHS, PERSIAN_MONTHS } from '../src/shared/constants';

const renderMonthSelector = (shouldOpenSelector = true, props) => {
  const { getAllByLabelText, getByTestId, rerender, getByText } = render(<Calendar {...props} />);
  const thisMonthText = new Date().toLocaleString('default', { month: 'long' });
  const [monthButton] = getAllByLabelText(/open month selector/i);
  const monthSelector = getByTestId('month-selector');
  const monthSelectorWrapper = getByTestId('month-selector-wrapper');
  const monthsChildren = Array.from(monthSelector.children);
  const selectors = within(monthSelector);
  if (shouldOpenSelector) fireEvent.click(monthButton);
  return {
    ...selectors,
    rerender,
    calendarGetByText: getByText,
    monthButton,
    monthSelector,
    monthSelectorWrapper,
    thisMonthText,
    monthsChildren,
  };
};

describe('Month Selection', () => {
  test('toggles on month click', () => {
    const { monthSelector, monthButton } = renderMonthSelector(false);

    expect(monthSelector).not.toHaveClass('-open');

    fireEvent.click(monthButton);

    expect(monthSelector).toHaveClass('-open');

    fireEvent.click(monthButton);

    expect(monthSelector).not.toHaveClass('-open');
  });

  test('renders all months', () => {
    const { monthsChildren, rerender, monthSelector, monthButton } = renderMonthSelector();
    const gregorianMonthTexts = monthsChildren.map(child => child.textContent);

    expect(gregorianMonthTexts).toEqual(GREGORIAN_MONTHS);
    rerender(<Calendar locale="fa" />);
    fireEvent.click(monthButton);
    const persianMonthTexts = Array.from(monthSelector.children).map(child => child.textContent);

    expect(persianMonthTexts).toHaveLength(12);
    expect(persianMonthTexts).toEqual(PERSIAN_MONTHS);
  });

  test('highlights the initial active month', () => {
    const { monthsChildren, thisMonthText } = renderMonthSelector();
    const activeMonth = monthsChildren.find(child => child.classList.contains('-active'));

    expect(activeMonth).toBeTruthy();
    expect(activeMonth.textContent).toBe(thisMonthText);
  });

  test('selects a new month', () => {
    const { monthsChildren, monthSelector } = renderMonthSelector();
    const nonSelectedMonth = monthsChildren.find(child => !child.classList.contains('-active'));
    const selectedMonth = monthsChildren.find(child => child.classList.contains('-active'));
    fireEvent.click(nonSelectedMonth.children[0]);

    expect(nonSelectedMonth).toHaveClass('-active');
    expect(selectedMonth).not.toHaveClass('-active');
    expect(monthSelector).not.toHaveClass('-open');
  });

  test('disables months according to minimum & maximum dates', () => {
    const { rerender, getByText, calendarGetByText } = renderMonthSelector(true, {
      value: { year: 2019, month: 6, day: 1 },
      minimumDate: { year: 2019, month: 3, day: 5 },
      maximumDate: { year: 2019, month: 10, day: 10 },
    });
    expect(getByText('January')).toHaveAttribute('disabled');
    expect(getByText('February')).toHaveAttribute('disabled');
    expect(getByText('March')).not.toHaveAttribute('disabled');
    expect(getByText('October')).not.toHaveAttribute('disabled');
    expect(getByText('November')).toHaveAttribute('disabled');
    expect(getByText('December')).toHaveAttribute('disabled');

    rerender(
      <Calendar
        value={{ year: 2019, month: 6, day: 1 }}
        minimumDate={{ year: 2018, month: 2, day: 5 }}
        maximumDate={{ year: 2020, month: 11, day: 10 }}
      />,
    );

    expect(getByText('January')).not.toHaveAttribute('disabled');
    expect(getByText('December')).not.toHaveAttribute('disabled');

    const previousYearButton = calendarGetByText('2018');
    fireEvent.click(previousYearButton);

    expect(getByText('January')).toHaveAttribute('disabled');

    const nextYearButton = calendarGetByText('2020');
    fireEvent.click(nextYearButton);
    expect(getByText('December')).toHaveAttribute('disabled');
  });

  test('navigates by keyboard', () => {
    const value = { year: 2019, month: 10, day: 1 };
    const { getByText, monthSelectorWrapper } = renderMonthSelector(true, { value });

    expect(getByText('October')).toBePressed();
    getByText('October').focus();
    fireEvent.keyDown(monthSelectorWrapper, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(getByText('September'));

    // keeps active month reachable by keyboard
    expect(getByText('October')).toHaveTabIndex(0);

    // makes inactive month unreachable by keyboard
    fireEvent.keyDown(monthSelectorWrapper, { key: 'ArrowLeft' });
    expect(getByText('September')).toHaveTabIndex(-1);

    fireEvent.keyDown(monthSelectorWrapper, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(getByText('September'));
  });
});
