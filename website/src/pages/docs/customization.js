import React, { useState } from 'react';
import { Link } from 'gatsby';
import DatePicker, { Calendar } from 'react-modern-calendar-datepicker';

import Docs from '../../containers/docs';
import { Code } from '../../components';

import { getRandomMonthDate } from '../../utils';

const DisabledDays = () => {
  const [datePicker1Value, setDatePicker1Value] = useState(null);
  const [datePicker2Value, setDatePicker2Value] = useState(null);
  const [datePicker3Value, setDatePicker3Value] = useState({
    from: {
      year: 2019,
      month: 4,
      day: 16,
    },
    to: {
      year: 2019,
      month: 4,
      day: 19,
    },
  });
  const randomDate = getRandomMonthDate();
  const randomDate2 = getRandomMonthDate();
  const [datePicker4Value, setDatePicker4Value] = useState(randomDate);
  const [datePicker5Value, setDatePicker5Value] = useState(randomDate2);
  const [datePicker6Value, setDatePicker6Value] = useState({
    year: 2019,
    month: 3,
    day: 1,
  });

  return (
    <Docs title="Customization">
      <p>
        This package is designed to be customizable. There are a couple of props
        to change the default styles according to your preferences. You can
        customize picker, calendar, and input. For the full list of available
        props, you can visit{' '}
        <Link className="Docs__link" to="/docs/props-list">
          props list
        </Link>
        .
      </p>

      <h2 className="Docs__titleSecondary">Customized Input</h2>

      <p>
        Placeholder and the formatted value of input can be set directly by you.
        Moreover, you can set an additional class on the input. If that&#39;s
        not enough, you can render your own input as well. Let&#39;s take a look
        at a few examples:
      </p>

      <div className="Docs__sampleContainer">
        <Code language="javascript">
          {`
import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

const App = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  const formatInputValue = () => {
    if (!selectedDay) return '';
    return \`Day: \${selectedDay.day}\`;
  };

  return (
    <DatePicker
      value={selectedDay}
      onChange={setSelectedDay}
      inputPlaceholder="Select a date" // placeholder
      formatInputText={formatInputValue} // format value
      inputClassName="my-custom-input" // custom class
      shouldHighlightWeekends
    />
  );
};

export default App;

          `}
        </Code>

        <DatePicker
          wrapperClassName="fontWrapper -aboveAll"
          calendarClassName="fontWrapper"
          value={datePicker1Value}
          onChange={setDatePicker1Value}
          inputPlaceholder="Select a date"
          formatInputText={() => {
            if (!datePicker1Value) return '';
            return `Day: ${datePicker1Value.day}`;
          }}
          shouldHighlightWeekends
        />
      </div>

      <p>
        You can render your own custom input using{' '}
        <code className="custom-code">renderInput</code> prop:
      </p>

      <div className="Docs__sampleContainer">
        <Code language="javascript">
          {`
import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

const App = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  // render regular HTML input element
  const renderCustomInput = ({ ref }) => (
    <input
      readOnly
      ref={ref} // necessary
      placeholder="I'm a custom input"
      value={selectedDay ? \`✅: \${selectedDay.day}\` : ''}
      style={{
        textAlign: 'center',
        padding: '1rem 1.5rem',
        fontSize: '1.5rem',
        border: '1px solid #9c88ff',
        borderRadius: '100px',
        boxShadow: '0 1.5rem 2rem rgba(156, 136, 255, 0.2)',
        color: '#9c88ff',
        outline: 'none',
      }}
      className="my-custom-input-class" // a styling class
    />
  )

  return (
    <DatePicker
      value={selectedDay}
      onChange={setSelectedDay}
      renderInput={renderCustomInput} // render a custom input
      shouldHighlightWeekends
    />
  );
};

export default App;

          `}
        </Code>

        <DatePicker
          wrapperClassName="fontWrapper"
          calendarClassName="fontWrapper"
          value={datePicker2Value}
          onChange={setDatePicker2Value}
          shouldHighlightWeekends
          renderInput={({ ref }) => (
            <input
              readOnly
              ref={ref}
              placeholder="I'm a custom input"
              className="-customPlaceholderColor"
              value={datePicker2Value ? `✅: ${datePicker2Value.day}` : ''}
              style={{
                textAlign: 'center',
                padding: '1rem 1.5rem',
                fontSize: '1.5rem',
                border: '1px solid #9c88ff',
                borderRadius: '100px',
                boxShadow: '0 1.5rem 2rem rgba(156, 136, 255, 0.2)',
                color: '#9c88ff',
                outline: 'none',
              }}
            />
          )}
        />
      </div>

      <h2 className="Docs__titleSecondary">Customized Calendar</h2>

      <p>
        The calendar has a few more props for customization. The most basic ones
        are <code className="custom-code">colorPrimary</code>,{' '}
        <code className="custom-code">colorPrimaryLight</code>. Additional
        classes&#39; props are available for the calendar itself, selected day,
        disabled days, range start day, range end day, and more. Here are some
        examples:
      </p>

      <div className="Docs__sampleContainer">
        <Code language="javascript">
          {`
import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

const App = () => {
  const defaultFrom = {
    year: 2019,
    month: 4,
    day: 16,
  };
  const defaultTo = {
    year: 2019,
    month: 4,
    day: 19,
  };
  const defaultValue = {
    from: defaultFrom,
    to: defaultTo,
  };
  const [selectedDayRange, setSelectedDayRange] = useState(
    defaultValue
  );

  return (
    <Calendar
      value={selectedDayRange}
      onChange={setSelectedDayRange}
      colorPrimary="#0fbcf9" // added this
      colorPrimaryLight="rgba(75, 207, 250, 0.4)" // and this
      shouldHighlightWeekends
    />
  );
};

export default App;

          `}
        </Code>

        <Calendar
          calendarClassName="fontWrapper"
          value={datePicker3Value}
          onChange={setDatePicker3Value}
          colorPrimary="#0fbcf9"
          colorPrimaryLight="rgba(75, 207, 250, 0.4)"
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
  const defaultValue = {
    year: ${randomDate.year},
    month: ${randomDate.month},
    day: ${randomDate.day},
  };
  const [selectedDay, setSelectedDay] = useState(defaultValue);

  return (
    <Calendar
      value={selectedDay}
      onChange={setSelectedDay}
      colorPrimary="#9c88ff" // added this
      calendarClassName="custom-calendar" // and this
      calendarTodayClassName="custom-today-day" // also this
      shouldHighlightWeekends
    />
  );
};

export default App;

          `}
        </Code>

        <Calendar
          calendarClassName="fontWrapper purple-shadow"
          value={datePicker4Value}
          onChange={setDatePicker4Value}
          colorPrimary="#9c88ff"
          calendarTodayClassName="text-orange"
          shouldHighlightWeekends
        />
      </div>

      <p>Our CSS code for the above example is:</p>

      <Code language="css">
        {`
.custom-calendar {
  box-shadow: 0 1em 3em rgba(156, 136, 255,0.2);
}

.custom-today-day {
  color: #e67e22 !important;
  border: 1px solid #e67e22 !important;
}

.custom-today-day::after {
  visibility: hidden; /* hide small border under the text */
}
        `}
      </Code>

      <p>
        <strong>Note:</strong> the usage of{' '}
        <code className="custom-code">!important</code> is because of{' '}
        <a
          rel="noopener noreferrer"
          target="_blank"
          className="Docs__link"
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity"
        >
          overriding the default styles
        </a>
        .
      </p>

      <h2 className="Docs__titleSecondary">Customized Array of Days</h2>
      <p>
        If any of the above customizable options for days is not enough for you,
        you can provide an array for some days to have a certain CSS class:
      </p>

<div className="Docs__sampleContainer">
        <Code language="javascript">
          {`
import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

const App = () => {
  const defaultValue = {
    year: 2019,
    month: 3,
    day: 1,
  };
  const [selectedDay, setSelectedDay] = useState(defaultValue);

  return (
    <Calendar
      value={selectedDay}
      onChange={setSelectedDay}
      shouldHighlightWeekends
      customDaysClassName={[
        // here we add some CSS classes
        { year: 2019, month: 3, day: 4, className: 'purpleDay' },
        { year: 2019, month: 3, day: 12, className: 'orangeDay' },
        { year: 2019, month: 3, day: 18, className: 'yellowDay' },
        { year: 2019, month: 3, day: 26, className: 'navyBlueDay' },
      ]}
    />
  );
};

export default App;

          `}
        </Code>

        <Calendar
          calendarClassName="fontWrapper"
          value={datePicker6Value}
          onChange={setDatePicker6Value}
          shouldHighlightWeekends
          customDaysClassName={[
            { year: 2019, month: 3, day: 4, className: 'purpleDay' },
            { year: 2019, month: 3, day: 12, className: 'orangeDay' },
            { year: 2019, month: 3, day: 18, className: 'yellowDay' },
            { year: 2019, month: 3, day: 26, className: 'navyBlueDay' },
          ]}
        />
      </div>

      <p>Our CSS code for the above example is:</p>

      <Code language="css">
        {`
/*
  These :not() selectors are for preventing
  style conflicts with a selected date. You can remove them if you wish!
*/

.purpleDay:not(.-selectedStart):not(.-selectedBetween):not(.-selectedEnd):not(.-selected) {
  border: 2px solid rgba(156, 136, 255, 0.7) !important;
}

.orangeDay:not(.-selectedStart):not(.-selectedBetween):not(.-selectedEnd):not(.-selected) {
  border: 2px solid rgba(219, 145, 60, 0.7) !important;
}

.yellowDay:not(.-selectedStart):not(.-selectedBetween):not(.-selectedEnd):not(.-selected) {
  border: 2px solid rgba(228, 231, 36, 0.7) !important;
}

.navyBlueDay:not(.-selectedStart):not(.-selectedBetween):not(.-selectedEnd):not(.-selected) {
  border: 2px solid rgba(52, 73, 94, 0.7) !important;
}
        `}
      </Code>

      <h2 className="Docs__titleSecondary">Calendar Footer</h2>

      <p>
        You can render a custom footer in the calendar below the days list by{' '}
        <code className="custom-code">renderFooter</code> prop. This can be
        useful for rendering a button for selecting today or reseting the value.
        This is an example:
      </p>

      <div className="Docs__sampleContainer">
        <Code language="javascript">
          {`
import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

const App = () => {
  const defaultValue = {
    year: ${randomDate2.year},
    month: ${randomDate2.month},
    day: ${randomDate2.day},
  };
  const [selectedDay, setSelectedDay] = useState(defaultValue);

  return (
    <Calendar
      value={selectedDay}
      onChange={setSelectedDay}
      shouldHighlightWeekends
      // here we go
      renderFooter={() => (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 2rem' }}>
          <button
            type="button"
            onClick={() => {
              setSelectedDay(null)
            }}
            style={{
              border: '#0fbcf9',
              color: '#fff',
              borderRadius: '0.5rem',
              padding: '1rem 2rem',
            }}
          >
            Reset Value!
          </button>
        </div>
      )}
    />
  );
};

export default App;

          `}
        </Code>

        <Calendar
          calendarClassName="fontWrapper"
          value={datePicker5Value}
          onChange={setDatePicker5Value}
          shouldHighlightWeekends
          renderFooter={() => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '1rem 2rem',
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setDatePicker5Value(null);
                }}
                style={{
                  background: '#0fbcf9',
                  color: '#fff',
                  borderRadius: '0.5rem',
                  padding: '1rem 2rem',
                }}
              >
                Reset Value!
              </button>
            </div>
          )}
        />
      </div>

      <h2 className="Docs__titleSecondary">Customized Wrapper</h2>

      <p>
        All the calendar custom styling props can be passed from{' '}
        <code className="custom-code">{`<DatePicker />`}</code>. Furthermore,
        there&#39;s a<code className="custom-code">wrapperClassName</code> prop
        for the customization of the picker&#39;s container element itself.
      </p>
    </Docs>
  );
};

export default DisabledDays;
