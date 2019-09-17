import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../../src/DatePicker.css';
import DatePicker from '../../src';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const [selectedDay, setValue] = useState({ from: null, to: null });

  const disabledDays = [
    {
      year: 1398,
      month: 6,
      day: 22,
    },
    {
      year: 1398,
      month: 6,
      day: 25,
    },
    {
      year: 1398,
      month: 6,
      day: 6,
    },
  ];

  return (
    <DatePicker
      minimumDate={{ year: 1394, month: 3, day: 31 }}
      selectedDayRange={selectedDay}
      onChange={setValue}
      disabledDays={disabledDays}
      isDayRange
      allowDisabledDaysRangeSelect
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
