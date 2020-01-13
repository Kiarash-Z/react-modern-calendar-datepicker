import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';

import { Calendar } from '../src';
import {
  MINIMUM_SELECTABLE_YEAR_SUBTRACT,
  MAXIMUM_SELECTABLE_YEAR_SUM,
} from '../src/shared/constants';

const renderYearSelector = (shouldOpenSelector = true, props = { value: null }) => {
  const { getAllByText, getByTestId, rerender } = render(<Calendar {...props} />);
  const thisYearText = props.value ? props.value.year : new Date().getFullYear();
  const [yearButton] = getAllByText(String(thisYearText));
  const yearSelector = getByTestId('year-selector');
  const yearSelectorWrapper = getByTestId('year-selector-wrapper');
  const yearsChildren = Array.from(yearSelector.children);
  const selectors = within(yearSelector);
  if (shouldOpenSelector) fireEvent.click(yearButton);
  return {
    ...selectors,
    rerender,
    yearSelectorWrapper,
    yearButton,
    yearSelector,
    thisYearText,
    yearsChildren,
  };
};

describe('Year Selection', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // hide errors on console for toThrow passing tests
  });

  afterEach(() => {
    // eslint-disable-next-line no-console
    console.error.mockRestore();
  });

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

  test('navigates by keyboard', () => {
    const value = { year: 2019, month: 10, day: 1 };
    const { getByText, yearSelectorWrapper } = renderYearSelector(true, { value });
    expect(getByText('2019')).toBePressed();
    getByText('2019').focus();
    fireEvent.keyDown(yearSelectorWrapper, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(getByText('2018'));

    // keeps active year reachable by keyboard
    expect(getByText('2019')).toHaveTabIndex(0);

    // makes inactive year unreachable by keyboard
    fireEvent.keyDown(yearSelectorWrapper, { key: 'ArrowLeft' });
    expect(getByText('2018')).toHaveTabIndex(-1);

    fireEvent.keyDown(yearSelectorWrapper, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(getByText('2018'));
  });

  test('throws an error when year is out of valid bounds', () => {
    expect(() => {
      renderYearSelector(false, {
        value: { year: 1999, month: 1, day: 1 },
        selectorStartingYear: 2000,
      });
    }).toThrow(RangeError);

    expect(() => {
      renderYearSelector(false, {
        value: { year: 2051, month: 1, day: 1 },
        selectorEndingYear: 2050,
      });
    }).toThrow(RangeError);
  });
});
