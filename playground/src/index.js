import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../../src/DatePicker.css';
import DatePicker from '../../src';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const defaultFrom = {
    year: 2019,
    month: 4,
    day: 16,
    hour: 24,
    minutes: 0,
  };
  const defaultTo = {
    year: 2019,
    month: 4,
    day: 19,
    hour: 12,
    minutes: 10,
  };
  const defaultValue = {
    from: defaultFrom,
    to: defaultTo,
  };
  const singleValue = {
    year: 2019,
    month: 4,
    day: 19,
    hour: 14,
    minutes: 23,
  };
  const [selectedDay, setValue] = useState(defaultValue);
  const [selectedDay1, setValue1] = useState(singleValue);
  return (
    <>
      <h1>{JSON.stringify(selectedDay)}</h1>
      <div>
        <DatePicker
          value={selectedDay}
          onChange={setValue}
          shouldHighlightWeekends
          activeTime
          type="range"
        />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />

      <h1>{JSON.stringify(selectedDay1)}</h1>
      <div>
        <DatePicker
          value={selectedDay1}
          onChange={setValue1}
          shouldHighlightWeekends
          activeTime
          type="single"
        />
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
