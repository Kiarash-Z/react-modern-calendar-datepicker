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
    hour: 12,
    minuets: 0,
  };
  const defaultTo = {
    year: 2019,
    month: 4,
    day: 19,
    hour: 12,
    minuets: 0,
  };
  const defaultValue = {
    from: defaultFrom,
    to: defaultTo,
  };
  const [selectedDay, setValue] = useState(defaultValue);
  return (
    <>
      <h1>{JSON.stringify(selectedDay)}</h1>
      <DatePicker value={selectedDay} onChange={setValue} shouldHighlightWeekends activeTime />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
