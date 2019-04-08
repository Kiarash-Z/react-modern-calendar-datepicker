import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DatePicker from '../../src/DatePicker';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<DatePicker />, document.getElementById('root'));
serviceWorker.unregister();
