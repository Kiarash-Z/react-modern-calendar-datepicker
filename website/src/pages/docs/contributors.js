import React from 'react';

import Docs from '../../containers/docs';
import { Contributor } from '../../components';
import { CONTRIBUTORS } from '../../constants/contributorsConstants';

const Contributors = () => {
  return (
    <Docs title="Contributors ❤️">
      <p className="Docs__paragraph">
        Here are the people who helped me with maintaining this package.
      </p>
      <div className="Docs__list -inline">
        {CONTRIBUTORS.map(({ username }) => (
          <Contributor username={username} />
        ))}
      </div>
    </Docs>
  );
};

export default Contributors;
