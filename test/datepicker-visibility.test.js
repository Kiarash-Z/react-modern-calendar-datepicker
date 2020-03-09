import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import DatePicker, { Calendar } from '../src';
import { localeLanguages } from '../src/shared/localeLanguages';

const renderOpenDatePicker = (renderProps = {}) => {
  const { getByTestId, ...otherSelectors } = render(<DatePicker {...renderProps} />);
  const input = getByTestId('datepicker-input');
  fireEvent.focus(input);
  return { getByTestId, ...otherSelectors, input };
};

describe('DatePicker Visibility', () => {
  test('toggles correctly on input focus/blur', () => {
    const { queryByTestId, getByTestId, getByText } = render(
      <div>
        <DatePicker />
        <button type="button">out</button>
      </div>,
    );
    const input = getByTestId('datepicker-input');
    const button = getByText(/out/i);
    const getCalendarContainer = () => queryByTestId('calendar-container');

    // closed by default
    expect(getCalendarContainer()).not.toBeInTheDocument();

    // opens correctly
    fireEvent.focus(input);
    expect(getCalendarContainer()).toBeInTheDocument();

    // closes when clicked outside
    fireEvent.click(button);
    fireEvent.blur(input);
    expect(getCalendarContainer()).not.toBeInTheDocument();

    // stays open when clicked inside
    fireEvent.focus(input);
    fireEvent.mouseDown(getCalendarContainer());
    fireEvent.blur(input);
    expect(getCalendarContainer()).toBeInTheDocument();
  });

  test('toggles date picker by keyboard', () => {
    const { input, queryByTestId } = renderOpenDatePicker();

    fireEvent.keyUp(input, { key: 'Escape' });

    expect(document.activeElement).toBe(input);
    expect(queryByTestId('calendar-container')).not.toBeInTheDocument();

    fireEvent.keyUp(input, { key: 'Enter' });

    expect(queryByTestId('calendar-container')).toBeInTheDocument();
  });

  test('closes on window blur', () => {
    const { queryByTestId } = renderOpenDatePicker();
    fireEvent.blur(window);
    expect(queryByTestId('calendar-container')).not.toBeInTheDocument();
  });

  test('aligns according to window visible boundaries', () => {
    // TODO: complete test (https://github.com/jsdom/jsdom/issues/1332)
    const { rerender, queryByTestId, getByTestId } = render(<DatePicker />);

    const input = getByTestId('datepicker-input');

    HTMLDivElement.prototype.getBoundingClientRect = jest.fn(() => ({
      left: 50,
      width: 100,
    }));
    input.focus();

    // overflow from right
    Object.defineProperty(document.documentElement, 'clientWidth', { value: 100 });
    input.blur();

    // overflow from left
    HTMLDivElement.prototype.getBoundingClientRect = jest.fn(() => ({
      left: -50,
      width: 100,
    }));
    input.focus();
    queryByTestId('calendar-container').getBoundingClientRect = jest.fn(() => ({
      left: -50,
      width: 100,
    }));
    rerender(<DatePicker />);
    input.focus();
    input.blur();

    // overflow from bottom
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 100 });
    HTMLDivElement.prototype.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      top: 100,
      width: 100,
      height: 100,
    }));
  });

  test('keeps calendar open on inner element focus', () => {
    const { getAllByText, queryByTestId, input } = renderOpenDatePicker();
    const sampleDay = getAllByText('1')[0];
    fireEvent.blur(input, { relatedTarget: sampleDay });

    expect(queryByTestId('calendar-container')).toBeInTheDocument();
  });

  test('closes calendar on out element focus', () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <div>
        <DatePicker />
        <button type="button">out</button>
      </div>,
    );
    const input = getByTestId('datepicker-input');
    const button = getByText(/out/i);
    input.focus();
    button.focus();

    expect(queryByTestId('calendar-container')).not.toBeInTheDocument();
  });

  test('closes calendar on single day selection', () => {
    const { queryByTestId, getAllByText, getByTestId } = renderOpenDatePicker({
      value: null,
      onChange: () => {},
    });
    const monthDay = getAllByText('1')[0];
    const input = getByTestId('datepicker-input');
    input.focus();
    fireEvent.click(monthDay);
    expect(queryByTestId('calendar-container')).not.toBeInTheDocument();
  });

  test('closes calendar on day range selection', () => {
    const { getAllByText, getByTestId, queryByTestId, rerender } = renderOpenDatePicker({
      value: { from: { year: 2019, month: 10, day: 1 }, to: null },
      onChange: () => {},
    });
    const input = getByTestId('datepicker-input');
    const rangeStart = getAllByText('1')[0];
    input.focus();

    fireEvent.click(rangeStart);
    rerender(
      <DatePicker
        value={{ from: { year: 2019, month: 10, day: 1 }, to: null }}
        onChange={() => {}}
      />,
    );

    input.focus();

    const rangeEnd = getAllByText('5')[0];
    // calendar still open
    expect(queryByTestId('calendar-container')).toBeInTheDocument();

    fireEvent.click(rangeEnd);

    // now closed
    expect(queryByTestId('calendar-container')).not.toBeInTheDocument();
  });

  test('keeps calendar open on multi day selection', () => {
    const { getAllByText, getByTestId } = renderOpenDatePicker({
      value: [],
      onChange: () => {},
    });
    const input = getByTestId('datepicker-input');
    const day1 = getAllByText('1')[0];
    const day2 = getAllByText('5')[0];
    const day3 = getAllByText('10')[0];
    input.focus();

    fireEvent.click(day1);
    fireEvent.click(day2);
    fireEvent.click(day3);

    expect(getByTestId('calendar-container')).toBeInTheDocument();
  });

  test('adds focus style on keyboard navigation', () => {
    const { container } = render(<Calendar value={null} />);

    expect(container.firstChild).toHaveClass('-noFocusOutline');
    fireEvent.keyUp(container.firstChild, { key: 'Tab' });
    expect(container.firstChild).not.toHaveClass('-noFocusOutline');
  });

  test('renders the datepicker with custom locale prop', () => {
    // ltr language
    expect(
      render(<DatePicker value={null} onChange={() => {}} locale="en" />).container,
    ).toStrictEqual(
      render(<DatePicker value={null} onChange={() => {}} locale={localeLanguages.en} />).container,
    );

    // rtl language
    expect(
      render(<DatePicker value={null} onChange={() => {}} locale="fa" />).container,
    ).toStrictEqual(
      render(<DatePicker value={null} onChange={() => {}} locale={localeLanguages.fa} />).container,
    );
  });
});
