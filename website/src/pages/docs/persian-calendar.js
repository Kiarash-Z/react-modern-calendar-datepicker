import React, { useState } from 'react';
import DatePicker, { Calendar } from 'react-modern-calendar-datepicker';

import Docs from '../../containers/docs';
import { Code } from '../../components';

const DefaultValues = () => {
  const [datePicker1Value, setDatePicker1Value] = useState(null);
  const [datePicker2Value, setDatePicker2Value] = useState(null);

  return (
    <Docs title="Persian Calendar">
      <p>
        Turning this date picker into a Persian date picker is as easy as adding
        a <code className="custom-code">isPersian</code> prop. For
        other features like minimum and maximum dates, just use them like the gregorian calendar:
      </p>
      <h2 className="Docs__titleSecondary"><code className="custom-code">{`<DatePicker />`}</code></h2>
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
      isPersian // add this
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
          isPersian
          shouldHighlightWeekends
        />
      </div>

      <h2 className="Docs__titleSecondary"><code className="custom-code">{`<Calendar />`}</code></h2>
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
      isPersian // add this
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
                isPersian
                shouldHighlightWeekends
              />
            </div>
    </Docs>
  );
};

export default DefaultValues;
