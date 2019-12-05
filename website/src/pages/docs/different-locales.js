import React, { useState } from 'react';
import DatePicker, { Calendar } from 'react-modern-calendar-datepicker';

import Docs from '../../containers/docs';
import { Code } from '../../components';

const DefaultValues = () => {
  const [datePicker1Value, setDatePicker1Value] = useState(null);
  const [datePicker2Value, setDatePicker2Value] = useState(null);

  return (
    <Docs title="Different Locales">
      <p>
        Turning this date picker into another locale date picker is as easy as changing
        the <code className="custom-code">locale</code> prop. For
        other features like minimum and maximum dates, just use them as you would normally use:
      </p>
      <h2 className="Docs__titleSecondary">Persian Locale</h2>
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
      locale="fa // add this
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
    </Docs>
  );
};

export default DefaultValues;
