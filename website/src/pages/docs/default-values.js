import React from 'react';
// import { Link } from 'gatsby';

import Docs from '../../containers/docs';
import { Code } from '../../components';

const DefaultValues = () => {
  return (
    <Docs title="Default Values">
      <p className="Docs__paragraph">
        In the previous part, you declared your default state value
        as some sort of <code className="custom-code">null</code>. What if
        you want to use a day(range) as your default state value? Well, it&#39;s pretty straightforward. you need to pass your intended day instead
        of <code className="custom-code">null</code>. All day formats in this package
        are like:
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

    </Docs>
  );
};

export default DefaultValues;
