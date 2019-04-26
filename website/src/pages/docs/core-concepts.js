import React, { useState } from 'react';
import DatePicker, { Calendar } from 'react-persian-calendar-date-picker';
import { Link } from 'gatsby';

import Docs from '../../containers/docs';
import { Code } from '../../components';

const CoreConcepts = () => {
  const [datePicker1Value, setDatePicker1Value] = useState(null);
  const [datePicker2Value, setDatePicker2Value] = useState(null);
  const [datePicker3Value, setDatePicker3Value] = useState({ from: null, to: null });
  const [datePicker4Value, setDatePicker4Value] = useState({ from: null, to: null });

  return (
    <Docs title="Core Concepts">
      <p className="Docs__paragraph">
        Now that you&#39;ve installed the package. It&#39;s the time to get familiarized with
        the core concepts of react-persian-calendar-date-picker. In a
        nutshell, there are two major components available
        to import:
      </p>

      <ul className="Docs__list">
        <li>1- <code className="custom-code">{`<DatePicker />`}</code> default exported component which includes an input and a calendar.</li>
        <li>2- <code className="custom-code">{`<Calendar />`}</code> component which is the calendar itself.</li>
      </ul>

      <p className="Docs__paragraph">
        By the way, we&#39;re gonna use <a rel="noopener noreferrer" target="_blank" className="Docs__link" href=" https://reactjs.org/docs/hooks-intro.html"> React hooks </a> for
        examples provided in this document.
      </p>

      <h2 className="Docs__titleSecondary">Basic Usage</h2>

      <p className="Docs__paragraph">
        Let&#39;s kick things off by providing an example:
      </p>

      <div className="Docs__sampleContainer">
        <Code language="javascript">
          {`
import React, { useState } from "react";
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import DatePicker from "react-persian-calendar-date-picker";

const App = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  return (
    <DatePicker
      selectedDay={selectedDay}
      onChange={setSelectedDay}
    />
  );
};

export default App;

          `}
        </Code>
        <DatePicker
          wrapperClassName="persianFontWrapper -aboveAll"
          calendarClassName="persianFontWrapper"
          selectedDay={datePicker1Value}
          onChange={setDatePicker1Value}
        />
      </div>

      <p className="Docs__paragraph">
        Without any input:
      </p>

      <div className="Docs__sampleContainer">
              <Code language="javascript">
                {`
import React, { useState } from "react";
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import { Calendar } from "react-persian-calendar-date-picker";

const App = () => {
  const [selectedDay, setSelectedDay] = useState(null);
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
                selectedDay={datePicker2Value}
                onChange={setDatePicker2Value}
              />
            </div>

      <p className="Docs__paragraph">
       <code className="custom-code">selectedDay</code> prop
        is the value of our date picker, and <code className="custom-code">onChange</code> is
        the function which
        will take care of changing the state. In this case, we&#39;re
        passing the state hook modifier.
        For a more detailed list of props, visit <Link to="/docs" className="Docs__link">props list</Link>.
      </p>

      <h2 className="Docs__titleSecondary">Selecting a Day Range</h2>
      <p className="Docs__paragraph">
        To turn out the picker into a range picker, you need to
        add <code className="custom-code">isDayRange</code> prop, and
        replace <code className="custom-code">selectedDay</code> prop
        with <code className="custom-code">selectedDayRange</code>. Remember to change
        the default state. Here&#39;s an example:
      </p>

      <div className="Docs__sampleContainer">
        <Code language="javascript">
          {`
import React, { useState } from "react";
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import { Calendar } from "react-persian-calendar-date-picker";

const App = () => {
  // a change in default state
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null
  });
  return (
    <Calendar
      selectedDayRange={selectedDayRange} // this is required
      onChange={setSelectedDay}
      isDayRange // this line too!
    />
  );
};

export default App;

          `}
        </Code>
        <Calendar
          calendarClassName="persianFontWrapper"
          selectedDayRange={datePicker3Value}
          onChange={setDatePicker3Value}
          isDayRange
        />
      </div>

      <p className="Docs__paragraph">
        Note that you can replace <code className="custom-code">{`<Calendar />`}</code> with
        <code className="custom-code">{`<DatePicker />`}</code> to have an input along with calendar:
      </p>

      <div className="Docs__sampleContainer">
        <Code language="javascript">
          {`
import React, { useState } from "react";
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import { Calendar } from "react-persian-calendar-date-picker";

const App = () => {
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null
  });
  return (
    <DatePicker // here's what we've changed
      selectedDayRange={selectedDayRange}
      onChange={setSelectedDay}
      isDayRange
    />
  );
};

export default App;

          `}
        </Code>
        <DatePicker
          wrapperClassName="persianFontWrapper -aboveAll"
          calendarClassName="persianFontWrapper"
          selectedDayRange={datePicker4Value}
          onChange={setDatePicker4Value}
          isDayRange
        />
      </div>
    </Docs>
  );
};

export default CoreConcepts;
