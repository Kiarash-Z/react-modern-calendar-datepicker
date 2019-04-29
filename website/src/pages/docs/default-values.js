import React, { useState } from 'react';
import { Calendar } from 'react-persian-calendar-date-picker';

import Docs from '../../containers/docs';
import { Code } from '../../components';

const DefaultValues = () => {
  const defaultValue1 = {
    year: 1398,
    month: 1,
    day: 5,
  };

  const defaultValue2 = {
    from: {
      year: 1398,
      month: 1,
      day: 4,
    },
    to: {
      year: 1398,
      month: 1,
      day: 7,
    }
  };

  const [datePicker1Value, setDatePicker1Value] = useState(defaultValue1);
  const [datePicker2Value, setDatePicker2Value] = useState(defaultValue2);

  return (
    <Docs title="Default Values">
      <p className="Docs__paragraph">
        In the previous part, you declared the default state value
        as some sort of <code className="custom-code">null</code>. What if
        you want to use a day(range) as your default state value? Well, it&#39;s pretty
        straightforward. you need to pass your intended day in the correct format instead
        of <code className="custom-code">null</code>.
      </p>

      <h2 className="Docs__titleSecondary">Single Date Default Value</h2>

      <div className="Docs__sampleContainer">
        <Code language="javascript">
          {`
import React, { useState } from "react";
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import { Calendar } from "react-persian-calendar-date-picker";

const App = () => {
  const defaultValue = {
    year: 1398,
    month: 1,
    day: 5,
  };

  const [selectedDay, setSelectedDay] = useState(defaultValue);
  return (
    <Calendar
      selectedDay={selectedDay}
      onChange={setSelectedDay}
    />
  );
};

export default App;

          `}
        </Code>
        <Calendar
          calendarClassName="persianFontWrapper"
          selectedDay={datePicker1Value}
          inputPlaceholder="انتخاب روز"
          onChange={setDatePicker1Value}
        />
      </div>

      <h2 className="Docs__titleSecondary">Range Date Default Value</h2>

      <div className="Docs__sampleContainer">
        <Code language="javascript">
          {`
import React, { useState } from "react";
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import { Calendar } from "react-persian-calendar-date-picker";

const App = () => {
  const defaultFrom = {
    year: 1398,
    month: 1,
    day: 4,
  };

  const defaultTo = {
    year: 1398,
    month: 1,
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
      selectedDayRange={selectedDayRange}
      onChange={setSelectedDayRange}
      isDayRange
    />
  );
};

export default App;

          `}
        </Code>
        <Calendar
          calendarClassName="persianFontWrapper"
          selectedDayRange={datePicker2Value}
          onChange={setDatePicker2Value}
          isDayRange
        />
      </div>
    </Docs>
  );
};

export default DefaultValues;
