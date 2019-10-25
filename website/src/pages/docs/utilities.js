import React from 'react';
import { utils } from '../../lib';
import Docs from '../../containers/docs';

import { Code } from '../../components';


const Utilities = () => {
  const gregorianToday = utils().getToday();
  const persianToday = utils(true).getToday();
  return (
    <Docs title="Utilities">
      <p className="Docs__paragraph">
        Along with exported components, there are utility date-based functions available
        for you to use. the first parameter of <code className="custom-code">utils</code> function, is
        for using Persian language for utils (default to false). Here are some examples:
      </p>

      <h2 className="Docs__titleSecondary">Get Today</h2>

      <Code language="javascript">
        {`
import { utils } from 'react-modern-calendar-datepicker';

const gregorianToday = utils().getToday(); // { year: ${gregorianToday.year}, month: ${gregorianToday.month}, day: ${gregorianToday.day} }
const persianToday = utils(true).getToday(); // { year: ${persianToday.year}, month: ${persianToday.month}, day: ${persianToday.day} }
        `}
      </Code>

      <h2 className="Docs__titleSecondary">Days Precedence</h2>

      <Code language="javascript">
        {`
import { utils } from 'react-modern-calendar-datepicker';
const day1 = { year: 2019, month: 10, day: 1 };
const day2 = { year: 2019, month: 10, day: 2 };

const { isBeforeDate } = utils();
const isDay1BeforeDay2 = isBeforeDate(day1, day2); // ✅ true
const isDay2BeforeDay1 = isBeforeDate(day2, day1); // ❌ false
        `}
      </Code>
    </Docs>
  );
};

export default Utilities;
