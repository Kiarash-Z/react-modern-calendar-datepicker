import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../../src/DatePicker.css';
import { Calendar } from '../../src';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const [selectedDays, setValue] = useState([]);
  return (
    <Calendar
      minimumDate={{ year: 1394, month: 3, day: 31 }}
      onChange={setValue}
      selectedDays={selectedDays}
      isMultipleDays
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
