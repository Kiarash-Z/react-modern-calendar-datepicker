import React from 'react';

import Docs from '../../containers/docs';

import { Code } from '../../components';


const Utilities = () => {
  return (
    <Docs title="Utilities">
      <p className="Docs__paragraph">
        Along with exported components, there are utility date-based functions available
        for you to use. For now, there&#39;s only one utility function exported, and that
        is <code className="custom-code">getToday</code> function:
      </p>

      <Code language="javascript">
        {`
import { getToday } from 'react-persian-calendar-date-picker';

const today = getToday(); // valid Jalaali date object
        `}
      </Code>

      <p className="Docs__paragraph">
        More utilities will be added soon.
      </p>
    </Docs>
  );
};

export default Utilities;
