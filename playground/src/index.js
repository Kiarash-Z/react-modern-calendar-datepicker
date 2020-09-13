import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../../src/DatePicker.css';
import DatePicker from '../../src';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const [selectedDay, setValue] = useState(null);
  return <DatePicker value={selectedDay} onChange={setValue} shouldHighlightWeekends activeTime />;
};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
