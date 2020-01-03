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
    }
  });
  const randomDate = getRandomMonthDate();
  const [datePicker4Value, setDatePicker4Value] = useState(randomDate);

  return (
    <Docs title="Customization">
      <p>
        This package is designed to be customizable. There are a couple of props to
        change the default styles according to your preferences. You
        can customize picker, calendar, and input. For the full list of available
        props, you can visit <Link className="Docs__link" to="/docs/props-list">props list</Link>.
      </p>

      <h2 className="Docs__titleSecondary">Customized Input</h2>

      <p>
        Placeholder and the formatted value of input can be set directly by you.
        Moreover, you can set an additional class on the input. If that&#39;s not enough,
        you can render your own input as well. Let&#39;s take a look at a few examples:
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
            return `Day: ${datePicker1Value.day}`
          }}
          shouldHighlightWeekends
        />
      </div>

      <p>
        You can render your own custom input
        using <code className="custom-code">renderInput</code> prop:
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
          wrapperClassName="fontWrapper -aboveAll"
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
        are <code className="custom-code">colorPrimary</code>, <code className="custom-code">colorPrimaryLight</code>.
        Additional classes&#39; props are available for the calendar itself,
        selected day, disabled days, range start day, range end day, and more.
        Here are some examples:
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

      <p>
        Our CSS code for the above example is:
      </p>

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
        <strong>Note:</strong> the usage of <code className="custom-code">!important</code> is because
        of <a rel="noopener noreferrer" target="_blank" className="Docs__link" href="https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity">overriding the default styles</a>.
      </p>

      <h2 className="Docs__titleSecondary">Customized Wrapper</h2>

      <p>
        All the calendar custom styling props can be passed
        from <code className="custom-code">{`<DatePicker />`}</code>. Furthermore, there&#39;s a
        <code className="custom-code">wrapperClassName</code> prop for the customization of
        the picker&#39;s container element itself.
      </p>
    </Docs>
  );
};

export default DisabledDays;
