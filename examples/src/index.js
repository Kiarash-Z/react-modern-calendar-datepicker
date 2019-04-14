import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DatePicker } from '../../lib';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const [selectedDay, setValue] = useState(null);
  return <DatePicker selectedDay={selectedDay} onChange={setValue} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
