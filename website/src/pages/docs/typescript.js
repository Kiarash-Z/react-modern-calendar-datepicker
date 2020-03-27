import React from 'react';

import Docs from '../../containers/docs';
import { Code } from '../../components';

const Installation = () => {
  return (
    <Docs title="TypeScript">
      <p className="Docs__paragraph">
        This package ships with
        <a rel="noopener noreferrer" target="_blank" className="Docs__link" href="https://www.typescriptlang.org/"> TypeScript </a>
        typings out of the box.
        As TypeScript is a typed superset of JavaScript,
        you can use this package as you used to in JavaScript
        but there are some pitfalls that you should notice.
      </p>

      <h2 className="Docs__titleSecondary">Type-safety with React Hooks</h2>

      <p className="Docs__paragraph">
        It&#39;s important to define generic type variable explicitly in <code className="custom-code">useState</code> hook when you want to use
        <a rel="noopener noreferrer" target="_blank" className="Docs__link" href=" https://reactjs.org/docs/hooks-intro.html"> React hooks </a>
        with react-modern-calendar-datepicker in TypeScript.
      </p>

      <p className="Docs__paragraph">
         You can use <code className="custom-code">Day</code> and <code className="custom-code">DayRange</code> types that has been exported by this package to define generic type variable.
      </p>

      <Code language="javascript">{`
import React from 'react'
import DatePicker, { DayValue, DayRange, Day } from 'react-modern-calendar-datepicker'

function App() {
  const [day, setDay] = React.useState<DayValue>(null);
  const [dayRange, setDayRange] = React.useState<DayRange>({
    from: null,
    to: null
  });
  const [days, setDays] = React.useState<Day[]>([]);

  return (
    <>
      <DatePicker value={day} onChange={setDay} />
      <DatePicker value={dayRange} onChange={setDayRange} />
      <DatePicker value={days} onChange={setDays} />
    </>
  );
}
      `}</Code>
    </Docs>
  );
};

export default Installation;
