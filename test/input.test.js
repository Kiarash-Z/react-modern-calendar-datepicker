import React from 'react';
import { render } from '@testing-library/react';

import DatePicker from '../src';

const renderInput = props => {
  const selectors = render(<DatePicker {...props} />);
  const input = selectors.getByTestId('datepicker-input');
  return { ...selectors, input };
};

describe('DatePicker Input', () => {
  test('shows single date selection value', () => {
    const gregorianValue = { year: 2019, month: 10, day: 1 };
    const { input, rerender } = renderInput({ value: gregorianValue });
    expect(input).toHaveValue('2019/10/01');

    const persianValue = { year: 1398, month: 10, day: 10 };
    rerender(<DatePicker locale="fa" value={persianValue} />);
    expect(input).toHaveValue('۱۳۹۸/۱۰/۱۰');

    const brazilianValue = { year: 1964, month: 6, day: 13 };
    rerender(<DatePicker locale="pt-BR" value={brazilianValue} />);
    expect(input).toHaveValue('13/06/1964');
  });

  test('shows range selection value', () => {
    const gregorianValue = {
      from: { year: 2019, month: 10, day: 1 },
      to: { year: 2019, month: 10, day: 5 },
    };
    const { input, rerender } = renderInput({ value: gregorianValue });
    expect(input).toHaveValue('from 2019/10/01 to 2019/10/05');

    const persianValue = {
      from: { year: 1398, month: 10, day: 1 },
      to: { year: 1398, month: 10, day: 5 },
    };
    rerender(<DatePicker locale="fa" value={persianValue} />);
    expect(input).toHaveValue('از ۹۸/۱۰/۰۱ تا ۹۸/۱۰/۰۵');

    const brazilianValue = {
      from: { year: 1964, month: 6, day: 1 },
      to: { year: 1964, month: 6, day: 5 },
    };
    rerender(<DatePicker locale="pt-BR" value={brazilianValue} />);
    expect(input).toHaveValue('de 01/06/1964 até 05/06/1964');
  });

  test('shows multiple date value', () => {
    const gregorianValue = [
      { year: 2019, month: 10, day: 1 },
      { year: 2019, month: 10, day: 5 },
      { year: 2019, month: 10, day: 12 },
    ];
    const { input, rerender } = renderInput({ value: gregorianValue });
    expect(input).toHaveValue('1, 5, 12');

    const persianValue = [
      { year: 1398, month: 10, day: 1 },
      { year: 1398, month: 10, day: 5 },
      { year: 1398, month: 10, day: 12 },
    ];
    rerender(<DatePicker locale="fa" value={persianValue} />);
    expect(input).toHaveValue('۱، ۵، ۱۲');

    const brazilianValue = [
      { year: 1964, month: 6, day: 1 },
      { year: 1964, month: 6, day: 5 },
      { year: 1964, month: 6, day: 12 },
    ];
    rerender(<DatePicker locale="pt-BR" value={brazilianValue} />);
    expect(input).toHaveValue('1, 5, 12');
  });

  test('overrides input format by formatInputText prop', () => {
    const value = { year: 2019, month: 10, day: 1 };
    const formatInputText = () => 'custom';
    const { input } = renderInput({ value, formatInputText });
    expect(input).toHaveValue('custom');
  });
});
