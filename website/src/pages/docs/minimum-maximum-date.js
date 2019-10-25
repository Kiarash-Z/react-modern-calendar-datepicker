import React, { useState } from 'react';
import { Calendar, utils } from 'react-modern-calendar-datepicker';

import Docs from '../../containers/docs';
import { Code } from '../../components';

const MinimumMaximumDate = () => {
  const defaultValue = {
    year: 2019,
    month: 4,
    day: 15,
  };

  const [datePicker1Value, setDatePicker1Value] = useState(null);
  const [datePicker2Value, setDatePicker2Value] = useState(defaultValue);

  const minimumDate = {
    year: 2019,
    month: 4,
    day: 10
  };

  const maximumDate = {
    year: 2019,
    month: 4,
    day: 21
  }

  return (
    <Docs title="Minimum & Maximum Date">
      <p>
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
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "react-modern-calendar-datepicker";

const App = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  return (
    <Calendar
      value={selectedDay}
      onChange={setSelectedDay}
      minimumDate={utils().getToday()}
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
          inputPlaceholder="Select a date"
          onChange={setDatePicker1Value}
          minimumDate={utils().getToday()}
          shouldHighlightWeekends
        />
      </div>

      <h2 className="Docs__titleSecondary">Specifying Both Minimum and Maximum</h2>

      <div className="Docs__sampleContainer">
        <Code language="javascript">
          {`
import React, { useState } from "react";
import "react-modern-calendar-datepicke/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicke";

const App = () => {
  const defaultValue = {
    year: 2019,
    month: 4,
    day: 15
  };

  const minimumDate = {
    year: 2019,
    month: 4,
    day: 10
  };

  const maximumDate = {
    year: 2019,
    month: 4,
    day: 21
  }

  const [selectedDay, setSelectedDay] = useState(
    defaultValue
  );
  return (
    <Calendar
      value={selectedDay}
      onChange={setSelectedDay}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
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
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          shouldHighlightWeekends
        />
      </div>
    </Docs>
  );
};

export default MinimumMaximumDate;
