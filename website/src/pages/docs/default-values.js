import React, { useState } from 'react';
import { Calendar } from 'react-modern-calendar-datepicker';

import Docs from '../../containers/docs';
import { Code } from '../../components';

const DefaultValues = () => {
  const defaultValue1 = {
    year: 2019,
    month: 10,
    day: 5,
  };

  const defaultValue2 = {
    from: {
      year: 2019,
      month: 3,
      day: 4,
    },
    to: {
      year: 2019,
      month: 3,
      day: 7,
    },
  };

  const defaultValue3 = [
    {
      year: 2019,
      month: 10,
      day: 2,
    },
    {
      year: 2019,
      month: 10,
      day: 15,
    },
    {
      year: 2019,
      month: 10,
      day: 30,
    },
  ];

  const [datePicker1Value, setDatePicker1Value] = useState(defaultValue1);
  const [datePicker2Value, setDatePicker2Value] = useState(defaultValue2);
  const [datePicker3Value, setDatePicker3Value] = useState(defaultValue3);

  return (
    <Docs title="Default Values">
      <p>
        In the previous part, you declared the default state value as some sort
        of <code className="custom-code">null</code>. What if you want to use a
        day(range) as your default state value? Well, it&#39;s pretty
        straightforward. you need to pass your intended day in the correct
        format instead of <code className="custom-code">null</code>.
      </p>

      <h2 className="Docs__titleSecondary">Single Date Default Value</h2>

      <div className="Docs__sampleContainer">
        <Code language="javascript">
          {`
import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

const App = () => {
  const defaultValue = {
    year: 2019,
    month: 10,
    day: 5,
  };

  const [selectedDay, setSelectedDay] = useState(defaultValue);
  return (
    <Calendar
      value={selectedDay}
      onChange={setSelectedDay}
      shouldHighlightWeekends
    />
  );
};

export default App;

          `}
        </Code>
        <Calendar
          calendarClassName="fontWrapper"
          value={datePicker1Value}
          inputPlaceholder="Select a day"
          onChange={setDatePicker1Value}
          shouldHighlightWeekends
        />
      </div>

      <h2 className="Docs__titleSecondary">Range Date Default Value</h2>

      <div className="Docs__sampleContainer">
        <Code language="javascript">
          {`
import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

const App = () => {
  const defaultFrom = {
    year: 2019,
    month: 3,
    day: 4,
  };

  const defaultTo = {
    year: 2019,
    month: 3,
    day: 7,
  };

  const defaultRange = {
    from: defaultFrom,
    to: defaultTo,
  };

  const [selectedDayRange, setSelectedDayRange] = useState(
    defaultRange
  );
  return (
    <Calendar
      value={selectedDayRange}
      onChange={setSelectedDayRange}
      shouldHighlightWeekends
    />
  );
};

export default App;

          `}
        </Code>
        <Calendar
          calendarClassName="fontWrapper"
          value={datePicker2Value}
          onChange={setDatePicker2Value}
          shouldHighlightWeekends
        />
      </div>

      <h2 className="Docs__titleSecondary">Multiple Date Default Value</h2>

      <div className="Docs__sampleContainer">
        <Code language="javascript">
          {`
import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

const App = () => {
  const preselectedDays = [
    {
      year: 2019,
      month: 10,
      day: 2,
    },
    {
      year: 2019,
      month: 10,
      day: 15,
    },
    {
      year: 2019,
      month: 10,
      day: 30,
    },
  ]

  const [selectedDayRange, setSelectedDayRange] = useState(
    preselectedDays
  );
  return (
    <Calendar
      value={selectedDayRange}
      onChange={setSelectedDayRange}
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
          shouldHighlightWeekends
        />
      </div>
    </Docs>
  );
};

export default DefaultValues;
