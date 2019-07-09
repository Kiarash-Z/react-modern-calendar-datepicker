import React, { useState } from 'react';
import { Calendar, getToday } from 'react-persian-calendar-date-picker';

import Docs from '../../containers/docs';
import { Code } from '../../components';

const MinimumMaximumDate = () => {
  const defaultValue1 = {
    year: 1398,
    month: 1,
    day: 5,
  };

  const defaultValue2 = {
    year: 1398,
    month: 2,
    day: 15,
  };

  const [datePicker1Value, setDatePicker1Value] = useState(defaultValue1);
  const [datePicker2Value, setDatePicker2Value] = useState(defaultValue2);

  const minimumDate = {
    year: 1398,
    month: 2,
    day: 10
  };

  const maximumDate = {
    year: 1398,
    month: 2,
    day: 20
  }

  return (
    <Docs title="Minimum & Maximum Date">
      <p className="Docs__paragraph">
        There are many cases where you want to somehow limit the user to choose a
        day in a appropriate range. That&#39;s
        when <code className="custom-code">minimumDate</code> and <code className="custom-code">mximumDate</code> props
        come in handy. Here are some examples:
      </p>

      <h2 className="Docs__titleSecondary">Limiting from Today</h2>

      <div className="Docs__sampleContainer">
        <Code language="javascript">
          {`
import React, { useState } from "react";
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import { Calendar, getToday } from "react-persian-calendar-date-picker";

const App = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  return (
    <Calendar
      selectedDay={selectedDay}
      onChange={setSelectedDay}
      minimumDate={getToday()}
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
          minimumDate={getToday()}
        />
      </div>

      <h2 className="Docs__titleSecondary">Specifying Both Minimum and Maximum</h2>

      <div className="Docs__sampleContainer">
        <Code language="javascript">
          {`
import React, { useState } from "react";
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import { Calendar } from "react-persian-calendar-date-picker";

const App = () => {
  const defaultValue = {
    year: 1398,
    month: 2,
    day: 15
  };

  const minimumDate = {
    year: 1398,
    month: 2,
    day: 10
  };

  const maximumDate = {
    year: 1398,
    month: 2,
    day: 20
  }

  const [selectedDay, setSelectedDay] = useState(
    defaultValue
  );
  return (
    <Calendar
      selectedDay={selectedDayRange}
      onChange={setSelectedDayRange}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
    />
  );
};

export default App;

          `}
        </Code>
        <Calendar
          calendarClassName="persianFontWrapper"
          selectedDay={datePicker2Value}
          onChange={setDatePicker2Value}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      </div>
    </Docs>
  );
};

export default MinimumMaximumDate;
