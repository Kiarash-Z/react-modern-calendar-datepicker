import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../../src/DatePicker.css';
import DatePicker from '../../src';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const [selectedDay, setValue] = useState(null);
  const onChangeMonth = (valueDate, directionArrow) => {
    return {
      date: valueDate,
      direction: directionArrow,
    };
  };
  const handleOnChange = value => {
    return {
      date: value,
    };
  };
  return (
    <DatePicker
      onChangeMonth={onChangeMonth}
      value={selectedDay}
      onChange={setValue}
      shouldHighlightWeekends
      handleOnChange={handleOnChange}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
