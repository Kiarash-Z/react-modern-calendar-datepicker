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
        <li>1- <code className="custom-code">{`<DatePicker />`}</code> default-exported component which includes an input and a calendar.</li>
        <li>2- <code className="custom-code">{`<Calendar />`}</code> component which is the calendar itself.</li>
      </ul>

      <p className="Docs__paragraph">
        These components are similar in many cases. <code className="custom-code">{`<DatePicker />`}</code> just
        includes an extra input in comparison with <code className="custom-code">{`<Calendar />`}</code>. The simple
        rule is:
      </p>

      <p className="Docs__paragraph -marginTop -marginBottom">
        <strong> You can use almost every prop
          on both <code className="custom-code">{`<DatePicker />`}</code> and <code className="custom-code"> {`<Calendar />`}</code> components.</strong>
      </p>

      <p className="Docs__paragraph">
        By the way, all the examples provided in this document are implemented using <a rel="noopener noreferrer" target="_blank" className="Docs__link" href=" https://reactjs.org/docs/hooks-intro.html"> React hooks </a>.
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
      inputPlaceholder="انتخاب روز"
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
          inputPlaceholder="انتخاب روز"
          onChange={setDatePicker1Value}
        />
      </div>

      <p className="Docs__paragraph">
        Without the input:
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
        is the value of the date picker, and <code className="custom-code">onChange</code> is
        the function which
        will take care of changing the state using the state hook modifier. All day formats
        in the picker are like:
      </p>

      <Code language="javascript">
              {`
PropTypes.shape({
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
})
              `}
            </Code>

      <p className="Docs__paragraph">
        For a more detailed list of props,
        visit <Link to="/docs/props-list" className="Docs__link">props list</Link>.
      </p>

      <h2 className="Docs__titleSecondary">Selecting a Day Range</h2>
      <p className="Docs__paragraph">
        To turn out the picker into a range picker, you need to
        add <code className="custom-code">isDayRange</code> prop and
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
      onChange={setSelectedDayRange}
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
        We&#39;ve used <code className="custom-code">from</code> on the default state to indicate
        the starting point of the day range, and <code className="custom-code">to</code> for
        the ending point of the day range. Note that you can
        replace <code className="custom-code">{`<Calendar />`}</code> with
        <code className="custom-code">{`<DatePicker />`}</code> to have the input along with the calendar:
      </p>

      <div className="Docs__sampleContainer">
        <Code language="javascript">
          {`
import React, { useState } from "react";
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import DatePicker from "react-persian-calendar-date-picker";

const App = () => {
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null
  });
  return (
    <DatePicker
      selectedDayRange={selectedDayRange}
      onChange={setSelectedDayRange}
      inputPlaceholder="انتخاب روزهای نمایش"
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
          inputPlaceholder="انتخاب روزهای نمایش"
          isDayRange
        />
      </div>
      <p className="Docs__paragraph">
        So far so good. By now, you should feel pretty comfortable with this picker. In this
        part, you used <code className="custom-code">null</code> as the default value for the single date
        picker and similarly, <code className="custom-code">{`{ from: null, to: null }`}</code> as the default
        value for the range date picker. In the next part, you&#39;ll learn more
        about <Link className="Docs__link" to="/docs/default-values">default values</Link>.
      </p>
    </Docs>
  );
};

export default CoreConcepts;
