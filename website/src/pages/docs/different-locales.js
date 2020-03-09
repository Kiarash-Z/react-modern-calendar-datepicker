import React, { useState } from 'react';
import DatePicker, { Calendar } from 'react-modern-calendar-datepicker';

import Docs from '../../containers/docs';
import { Code } from '../../components';

const myCustomLocale = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  weekDays: [
    {
      name: 'Sunday',
      short: 'S',
      isWeekend: true,
    },
    {
      name: 'Monday',
      short: 'M',
    },
    {
      name: 'Tuesday',
      short: 'T',
    },
    {
      name: 'Wednesday',
      short: 'W',
    },
    {
      name: 'Thursday',
      short: 'T',
    },
    {
      name: 'Friday',
      short: 'F',
    },
    {
      name: 'Saturday',
      short: 'S',
      isWeekend: true,
    },
  ],
  weekStartingIndex: 0,
  getToday(gregorainTodayObject) {
    return gregorainTodayObject;
  },
  toNativeDate(date) {
    return new Date(date.year, date.month - 1, date.day);
  },
  getMonthLength(date) {
    return new Date(date.year, date.month, 0).getDate();
  },
  transformDigit(digit) {
    return digit;
  },
  nextMonth: 'Next Month',
  previousMonth: 'Previous Month',
  openMonthSelector: 'Open Month Selector',
  openYearSelector: 'Open Year Selector',
  closeMonthSelector: 'Close Month Selector',
  closeYearSelector: 'Close Year Selector',
  from: 'from',
  to: 'to',
  defaultPlaceholder: 'Select...',
  digitSeparator: ',',
  yearLetterSkip: 0,
  isRtl: false,
};

const DefaultValues = () => {
  const [datePicker1Value, setDatePicker1Value] = useState(null);
  const [datePicker2Value, setDatePicker2Value] = useState(null);

  return (
    <Docs title="Different Locales">
      <p>
        Turning this date picker into another locale date picker is as easy as
        changing the <code className="custom-code">locale</code> prop. For other
        features like minimum and maximum dates, just use them as you would
        normally use:
      </p>
      <h2 className="Docs__titleSecondary">Using Predefined Locales</h2>
      <p>
        For now, there are two predefined locales;{' '}
        <code className="custom-code">en</code> and{' '}
        <code className="custom-code">fa</code>. You can use them by passing
        them to <code className="custom-code">locale</code> prop as a string.
      </p>
      <div className="Docs__sampleContainer">
        <Code language="javascript">
          {`
import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

const App = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  return (
    <DatePicker
      value={selectedDay}
      onChange={setSelectedDay}
      shouldHighlightWeekends
      locale="fa" // add this
    />
  );
};

export default App;

          `}
        </Code>
        <DatePicker
          calendarClassName="responsive-calendar"
          wrapperClassName="fontWrapper -persian"
          value={datePicker1Value}
          onChange={setDatePicker1Value}
          locale="fa"
          shouldHighlightWeekends
        />
      </div>
      <div className="Docs__sampleContainer">
        <Code language="javascript">
          {`
import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

const App = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  return (
    <Calendar
      value={selectedDay}
      onChange={setSelectedDay}
      shouldHighlightWeekends
      locale="fa" // add this
    />
  );
};

export default App;

                `}
        </Code>
        <Calendar
          calendarClassName="fontWrapper -persian responsive-calendar"
          value={datePicker2Value}
          onChange={setDatePicker2Value}
          locale="fa"
          shouldHighlightWeekends
        />
      </div>
      <h2 className="Docs__titleSecondary">Using Custom Locales</h2>
      <p>
        If your locale is missing in predefined locales, you can add your own
        custom locale by passing a locale object to{' '}
        <code className="custom-code">locale</code> prop. This is an example of
        default English picker&#39;s data:
      </p>
      <div className="Docs__sampleContainer">
        <Code language="javascript">
          {`
import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

const myCustomLocale = {
  // months list by order
  months: [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  ],

  // week days by order
  weekDays: [
    {
      name: 'Sunday', // used for accessibility 
      short: 'S', // displayed at the top of days' rows
      isWeekend: true, // is it a formal weekend or not?
    },
    {
      name: 'Monday',
      short: 'M',
    },
    {
      name: 'Tuesday',
      short: 'T',
    },
    {
      name: 'Wednesday',
      short: 'W',
    },
    {
      name: 'Thursday',
      short: 'T',
    },
    {
      name: 'Friday',
      short: 'F',
    },
    {
      name: 'Saturday',
      short: 'S',
      isWeekend: true,
    },
  ],

  // just play around with this number between 0 and 6
  weekStartingIndex: 0,

  // return a { year: number, month: number, day: number } object
  getToday(gregorainTodayObject) {
    return gregorainTodayObject;
  },

  // return a native JavaScript date here
  toNativeDate(date) {
    return new Date(date.year, date.month - 1, date.day);
  },

  // return a number for date's month length
  getMonthLength(date) {
    return new Date(date.year, date.month, 0).getDate();
  },

  // return a transformed digit to your locale
  transformDigit(digit) {
    return digit;
  },

  // texts in the date picker
  nextMonth: 'Next Month',
  previousMonth: 'Previous Month',
  openMonthSelector: 'Open Month Selector',
  openYearSelector: 'Open Year Selector',
  closeMonthSelector: 'Close Month Selector',
  closeYearSelector: 'Close Year Selector',
  defaultPlaceholder: 'Select...',

  // for input range value
  from: 'from',
  to: 'to',


  // used for input value when multi dates are selected
  digitSeparator: ',',

  // if your provide -2 for example, year will be 2 digited
  yearLetterSkip: 0,

  // is your language rtl or ltr?
  isRtl: false,
}

const App = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  return (
    <Calendar
      value={selectedDay}
      onChange={setSelectedDay}
      locale={myCustomLocale} // custom locale object
      shouldHighlightWeekends
    />
  );
};

export default App;

                      `}
        </Code>
        <Calendar
          calendarClassName="responsive-calendar"
          value={datePicker2Value}
          onChange={setDatePicker2Value}
          locale={myCustomLocale}
          shouldHighlightWeekends
        />
      </div>
    </Docs>
  );
};

export default DefaultValues;
