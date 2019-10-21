import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import DatePicker from '../src/DatePicker';

describe('DatePicker', () => {
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
});
