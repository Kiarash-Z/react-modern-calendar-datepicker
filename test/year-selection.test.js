import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Calendar } from '../src';
import {
  MINIMUM_SELECTABLE_YEAR_SUBTRACT,
  MAXIMUM_SELECTABLE_YEAR_SUM,
} from '../src/shared/constants';

const renderYearSelector = (shouldOpenSelector = true, props) => {
  const selectors = render(<Calendar {...props} />);
  const thisYearText = new Date().getFullYear();
  const [yearButton] = selectors.getAllByText(String(thisYearText));
  const yearSelector = selectors.getByTestId('year-selector');
  const yearsChildren = Array.from(yearSelector.children);
  if (shouldOpenSelector) fireEvent.click(yearButton);
  return { ...selectors, yearButton, yearSelector, thisYearText, yearsChildren };
};

describe('Year Selection', () => {
  test('toggles on year click', () => {
    const { yearSelector, yearButton } = renderYearSelector(false);

    expect(yearSelector).not.toHaveClass('-open');

    fireEvent.click(yearButton);

    expect(yearSelector).toHaveClass('-open');

    fireEvent.click(yearButton);

    expect(yearSelector).not.toHaveClass('-open');
  });

  test('renders all years', () => {
    const { yearsChildren, thisYearText, rerender, yearSelector } = renderYearSelector();
    const years = yearsChildren.map(yearChild => Number(yearChild.textContent));
    const firstYear = thisYearText - MINIMUM_SELECTABLE_YEAR_SUBTRACT;
    const lastYear = thisYearText + MAXIMUM_SELECTABLE_YEAR_SUM;

    expect(years[0]).toBe(firstYear);
    expect(years[years.length - 1]).toBe(lastYear);

    rerender(<Calendar selectorStartingYear={2000} selectorEndingYear={2050} />);
    const newYears = Array.from(yearSelector.children).map(yearChild =>
      Number(yearChild.textContent),
    );

    expect(newYears[0]).toBe(2000);
    expect(newYears[newYears.length - 1]).toBe(2050);
  });

  test('highlights the initial active year', () => {
    const { yearsChildren, thisYearText } = renderYearSelector();
    const activeYear = yearsChildren.find(child => child.classList.contains('-active'));

    expect(activeYear).toBeTruthy();
    expect(activeYear.textContent).toBe(String(thisYearText));
  });

  test('scrolls to active year', () => {
    const { yearsChildren, yearButton, yearSelector } = renderYearSelector(false);
    const activeYear = yearsChildren.find(child => child.classList.contains('-active'));
    Object.defineProperties(activeYear, {
      offsetTop: { get: () => 100 },
      offsetHeight: { get: () => 10 },
    });

    fireEvent.click(yearButton);
    expect(yearSelector.scrollTop).toBe(50);
  });

  test('selects a new year', () => {
    const { yearsChildren, yearSelector } = renderYearSelector();
    const nonSelectedYear = yearsChildren.find(child => !child.classList.contains('-active'));
    const selectedYear = yearsChildren.find(child => child.classList.contains('-active'));
    fireEvent.click(nonSelectedYear.children[0]);

    expect(nonSelectedYear).toHaveClass('-active');
    expect(selectedYear).not.toHaveClass('-active');
    expect(yearSelector).not.toHaveClass('-open');
  });

  test('disables years according to minimum & maximum dates', () => {
    const { getByText } = renderYearSelector(true, {
      value: { year: 2019, month: 1, day: 1 },
      minimumDate: { year: 2015, month: 1, day: 1 },
      maximumDate: { year: 2022, month: 1, day: 1 },
    });

    expect(getByText('2015')).not.toHaveAttribute('disabled');
    expect(getByText('2014')).toHaveAttribute('disabled');
    expect(getByText('2013')).toHaveAttribute('disabled');
    expect(getByText('2022')).not.toHaveAttribute('disabled');
    expect(getByText('2023')).toHaveAttribute('disabled');
    expect(getByText('2024')).toHaveAttribute('disabled');
  });
});
