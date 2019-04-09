import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DatePicker from '../../src/DatePicker';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const [selectedDayRange, setValue] = useState({ from: null, to: null });
  return (
    <DatePicker
      selectedDayRange={selectedDayRange}
      isDayRange={true}
      onChange={setValue}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
