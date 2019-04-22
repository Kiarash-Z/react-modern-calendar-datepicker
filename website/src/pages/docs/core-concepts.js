import React, { useState } from 'react';
import DatePicker from 'react-persian-calendar-date-picker';

import Docs from '../../containers/docs';
import { Code } from '../../components';

const CoreConcepts = () => {
  const [datePicker1Value, setDatePicker1Value] = useState(null);
  return (
    <Docs title="Core Concepts">
      <p className="Docs__paragraph">
        Now that you&#39;ve installed the package. It&#39;s the time to get familiarized with
        the core concepts of react-persian-calendar-date-picker. In a nutshell, there are two major components available
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

      {/* <p className="Docs__paragraph">
        If you want to use an input along with the calendar, go with <code className="custom-code">DatePicker</code>:
      </p>

      <Code language="javascript">
        {`import DatePicker from 'react-persian-calendar-date-picker';`}
      </Code>

      <p className="Docs__paragraph">
        Otherwise, if you're going to use a custom way of displaying picker e.g in a modal, go with <code className="custom-code">Calendar</code>:
      </p>

      <Code language="javascript">
        {`import { Calendar } from 'react-persian-calendar-date-picker';`}
      </Code> */}
    </Docs>
  );
};

export default CoreConcepts;
