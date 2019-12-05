import React, { useState } from 'react';
import { Link } from 'gatsby';
import DatePicker, { Calendar } from 'react-modern-calendar-datepicker';

import Docs from '../../containers/docs';
import { Code } from '../../components';

const CoreConcepts = () => {
  const [datePicker1Value, setDatePicker1Value] = useState(null);
  const [datePicker2Value, setDatePicker2Value] = useState(null);
  const [datePicker3Value, setDatePicker3Value] = useState({ from: null, to: null });
  const [datePicker4Value, setDatePicker4Value] = useState({ from: null, to: null });
  const [datePicker5Value, setDatePicker5Value] = useState([]);

  return (
    <Docs title="Core Concepts">
      <p>
        Now that you&#39;ve installed the package. It&#39;s the time to get familiarized with
        the core concepts of react-modern-calendar-datepicker. In a
        nutshell, there are two major components available
        to import:
      </p>

      <ul className="Docs__list">
        <li>1- <code className="custom-code">{`<DatePicker />`}</code> default-exported component which includes an input and a calendar.</li>
        <li>2- <code className="custom-code">{`<Calendar />`}</code> component which is the calendar itself.</li>
      </ul>

      <p>
        These components are similar in many cases. <code className="custom-code">{`<DatePicker />`}</code> just
        includes an extra input in comparison with <code className="custom-code">{`<Calendar />`}</code>. The simple
        rule is:
      </p>

      <p className="-marginTop -marginBottom">
        <strong> You can use almost every prop
          on both <code className="custom-code">{`<DatePicker />`}</code> and <code className="custom-code"> {`<Calendar />`}</code> components.</strong>
      </p>

      <p className="-marginTop -marginBottom">
        <strong> Note: </strong> To turn this calendar into a another language locale one, <Link className="Docs__link" to="/docs/different-locales"> add this prop</Link>.
      </p>

      <p>
        By the way, all the examples provided in this document are implemented using <a rel="noopener noreferrer" target="_blank" className="Docs__link" href=" https://reactjs.org/docs/hooks-intro.html"> React hooks </a>.
      </p>

      <h2 className="Docs__titleSecondary">Basic Usage</h2>

      <p>
        Let&#39;s kick things off by providing an example:
      </p>

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
      inputPlaceholder="Select a day"
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
          inputPlaceholder="Select a day"
          onChange={setDatePicker1Value}
          shouldHighlightWeekends
        />
      </div>

      <p>
        Without the input:
      </p>

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

      <p>
       - <code className="custom-code">value</code> prop
        is the value of the date picker and <strong>the shape of its initial value, defines the date picker type(single, range, multiple)</strong>
      </p>
      <p>
      -<code className="custom-code">onChange</code> is
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

      <p>
        For a more detailed list of props,
        visit <Link to="/docs/props-list" className="Docs__link">props list</Link>.
      </p>

      <h2 className="Docs__titleSecondary">Selecting a Day Range</h2>
      <p>
        To turn out the picker into a range picker, you need to
        change the initial <code className="custom-code">value</code>. Here&#39;s an example:
      </p>

      <div className="Docs__sampleContainer">
        <Code language="javascript">
          {`
import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

const App = () => {
  // ✅ a change in default state: { from: ..., to: ... }
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null
  });
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

      <p>
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
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

const App = () => {
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null
  });
  return (
    <DatePicker
      value={selectedDayRange}
      onChange={setSelectedDayRange}
      inputPlaceholder="Select a day range"
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
          value={datePicker4Value}
          onChange={setDatePicker4Value}
          inputPlaceholder="Select a day range"
          shouldHighlightWeekends
        />
      </div>
      <h2 className="Docs__titleSecondary">Selecting Multiple Dates</h2>
      <p>You pass a <code className="custom-code">[]</code> as a default value, it becomes a multiple date selector.</p>
      <div className="Docs__sampleContainer">
              <Code language="javascript">
                {`
      import React, { useState } from "react";
      import "react-modern-calendar-datepicker/lib/DatePicker.css";
      import { Calendar } from "react-modern-calendar-datepicker";

      const App = () => {
        // ✅ a change in default state: []
        const [selectedDays, setSelectedDays] = useState([]);
        return (
          <Calendar
            value={selectedDays}
            onChange={setSelectedDays}
            shouldHighlightWeekends
          />
        );
      };

      export default App;

                `}
              </Code>
              <Calendar
                calendarClassName="fontWrapper"
                value={datePicker5Value}
                onChange={setDatePicker5Value}
                shouldHighlightWeekends
              />
            </div>
      <p>Simple as that! as mentioned above, the shape of <code className="custom-code">value</code> prop defines the date picker type. Here
       we passed an empty array.</p>
      <h2 className="Docs__titleSecondary">Recap</h2>
      <p>
        So far so good. By now, you should feel pretty comfortable with this picker. In this
        part, you used <code className="custom-code">null</code> as the default value for the single date
        picker, <code className="custom-code">{`{ from: null, to: null }`}</code> as the default
        value for the range date picker, and <code className="custom-code">[]</code> as the default
        value for the mutliple date picker. In the next part, you&#39;ll learn more
        about <Link className="Docs__link" to="/docs/default-values">default values</Link>.
      </p>
    </Docs>
  );
};

export default CoreConcepts;
