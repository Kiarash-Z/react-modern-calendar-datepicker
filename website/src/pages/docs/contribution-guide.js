import React from 'react';

import Docs from '../../containers/docs';

const ContributionGuide = () => {

  return (
    <Docs title="Contribution Guide">
      <p className="Docs__paragraph">
        I&#39;d be glad to see the support and pull requests from the community. Here&#39;s the guide:
        <ul className="Docs__list">
          <li>1- Fork the <a rel="noopener noreferrer" target="_blank" className="Docs__link" href="https://github.com/Kiarash-Z/react-persian-calendar-date-picker"> Github repository </a></li>
          <li>2- Switch to the <code className="custom-code">develop</code> branch</li>
          <li>3- Start working! </li>
          <li>4- Run <code className="custom-code">yarn build</code> and make sure everything is OK when
          running <code className="custom-code">yarn checkAll</code>. checkAll script checks the following items:
          <ul className="Docs__list">
            <li>- Code formatting and styles using Eslint and Prettier </li>
            <li>- Tests all get passed</li>
            <li>- Bundle size wouldn&#39;t exceed 8 KB</li>
          </ul>
          </li>
          <li>5- Submit a pull request, and we will work it out!</li>
        </ul>
      </p>
    </Docs>
  );
};

export default ContributionGuide;
