import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import DatePicker from '../src';

describe('DatePicker Visibility', () => {
  test('toggles correctly on input focus/blur', () => {
    const { container, getByTestId } = render(<DatePicker />);
    const calendarContainer = getByTestId('calendar-container');
    const input = getByTestId('datepicker-input');

    // opens correctly
    fireEvent.focus(input);
    expect(container.firstChild).toHaveClass('-calendarOpen');

    const elementBoundaries = { left: 50, top: 50, right: 150, bottom: 150 };
    calendarContainer.getBoundingClientRect = jest.fn(() => elementBoundaries);

    // stays open when input blur gets fired and mouse position is in the calendar boundaries
    const insideCalendarMousePosition = { clientX: 60, clientY: 60 };
    fireEvent(document, new MouseEvent('mousemove', insideCalendarMousePosition));
    fireEvent.blur(input);
    expect(container.firstChild).toHaveClass('-calendarOpen');

    // closes when input blur gets fired and mouse position is outside the calendar boundaries
    const outsideCalendarMousePosition = { clientX: 10, clientY: 10 };
    fireEvent(document, new MouseEvent('mousemove', outsideCalendarMousePosition));
    fireEvent.blur(input);
    expect(container.firstChild).not.toHaveClass('-calendarOpen');
    expect(calendarContainer.getBoundingClientRect).toHaveBeenCalled();
  });

  test('aligns according to window visible boundaries', () => {
    const { getByTestId } = render(<DatePicker />);
    const calendarContainer = getByTestId('calendar-container');
    const input = getByTestId('datepicker-input');

    const elementBoundaries = { left: 50, width: 100 };
    calendarContainer.getBoundingClientRect = jest.fn(() => elementBoundaries);
    Object.defineProperty(document.documentElement, 'clientWidth', { value: 100 });
    fireEvent.focus(input);
    // TODO: complete test (https://github.com/testing-library/dom-testing-library/issues/387)
  });

  test('closes calendar on single day selection', () => {
    const { container, getAllByText, getByTestId } = render(
      <DatePicker value={null} onChange={() => {}} />,
    );
    const monthDay = getAllByText('1')[0];
    const input = getByTestId('datepicker-input');
    input.focus();
    fireEvent.click(monthDay);
    expect(container.firstChild).not.toHaveClass('-calendarOpen');
  });

  test('closes calendar on day range selection', () => {
    const { container, getAllByText, getByTestId, rerender } = render(
      <DatePicker value={{ from: null, to: null }} onChange={() => {}} />,
    );
    const input = getByTestId('datepicker-input');
    const rangeStart = getAllByText('1')[0];
    const rangeEnd = getAllByText('5')[0];
    input.focus();

    fireEvent.click(rangeStart);
    rerender(
      <DatePicker
        value={{ from: { year: 2019, month: 10, day: 21 }, to: null }}
        onChange={() => {}}
      />,
    );

    // calendar still open
    expect(container.firstChild).toHaveClass('-calendarOpen');

    fireEvent.click(rangeEnd);

    // now closed
    expect(container.firstChild).not.toHaveClass('-calendarOpen');
  });

  test('keeps calendar open on multi day selection', () => {
    const { container, getAllByText, getByTestId } = render(
      <DatePicker value={[]} onChange={() => {}} />,
    );
    const input = getByTestId('datepicker-input');
    const day1 = getAllByText('1')[0];
    const day2 = getAllByText('5')[0];
    const day3 = getAllByText('10')[0];
    input.focus();

    fireEvent.click(day1);
    fireEvent.click(day2);
    fireEvent.click(day3);

    expect(container.firstChild).toHaveClass('-calendarOpen');
  });
});
