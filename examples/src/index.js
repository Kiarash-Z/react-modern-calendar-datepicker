import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DatePicker from '../../src/DatePicker';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const [selectedDay, setValue] = useState({ year: 1398, month: 1, day: 21});
  return (
    <DatePicker
      selectedDay={selectedDay}
      onChange={setValue}
      disabledDays={[
        { year: 1398, month: 1, day: 21}
      ]}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
