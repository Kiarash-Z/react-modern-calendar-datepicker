import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Calendar } from '../src';
import { GREGORIAN_MONTHS, PERSIAN_MONTHS } from '../src/shared/constants';

const renderMonthSelector = (shouldOpenSelector = true, props) => {
  const selectors = render(<Calendar {...props} />);
  const thisMonthText = new Date().toLocaleString('default', { month: 'long' });
  const [monthButton] = selectors.getAllByText(thisMonthText);
  const monthSelector = selectors.getByTestId('month-selector');
  const monthsChildren = Array.from(monthSelector.children);
  if (shouldOpenSelector) fireEvent.click(monthButton);
  return { ...selectors, monthButton, monthSelector, thisMonthText, monthsChildren };
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
    const { monthsChildren, rerender, monthSelector } = renderMonthSelector();
    const gregorianMonthTexts = monthsChildren.map(child => child.textContent);

    expect(gregorianMonthTexts).toEqual(GREGORIAN_MONTHS);
    rerender(<Calendar isPersian />);
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
    const { rerender, getByText, getAllByText } = renderMonthSelector(true, {
      value: { year: 2019, month: 6, day: 1 },
      minimumDate: { year: 2019, month: 3, day: 5 },
      maximumDate: { year: 2019, month: 10, day: 10 },
    });
    expect(getByText('January')).toHaveAttribute('disabled');
    expect(getByText('February')).toHaveAttribute('disabled');
    expect(getByText('March')).not.toHaveAttribute('disabled');
    expect(getAllByText('October')[1]).not.toHaveAttribute('disabled');
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

    const previousYearButton = getByText('2018');
    fireEvent.click(previousYearButton);

    expect(getByText('January')).toHaveAttribute('disabled');

    const nextYearButton = getByText('2020');
    fireEvent.click(nextYearButton);
    expect(getByText('December')).toHaveAttribute('disabled');
  });
});
