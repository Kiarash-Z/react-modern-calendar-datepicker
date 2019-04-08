import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DatePicker from '../../src/DatePicker';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  return (
    <DatePicker
      selectedDay={selectedDay}
      onChange={setSelectedDay}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
