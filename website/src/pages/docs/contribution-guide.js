import React from 'react';

import Docs from '../../containers/docs';

const ContributionGuide = () => {

  return (
    <Docs title="Contribution Guide">
      <p className="Docs__paragraph">
        I&#39;d be glad to see the support and pull requests from the community. Here&#39;s the guide:
      </p>
      <ul className="Docs__list">
        <li>1- Submit <a className="Docs__link" rel="noopener noreferrer" href="https://github.com/Kiarash-Z/react-modern-calendar-datepicker/issues">an issue </a> for what you want to work on</li>
        <li>2- After approval, fork the <a rel="noopener noreferrer" target="_blank" className="Docs__link" href="https://github.com/Kiarash-Z/react-modern-calendar-datepicker"> Github repository </a></li>
        <li>3- Switch to the <code className="custom-code">develop</code> branch</li>
        <li>4- Start working! please remember to write tests for your changes.</li>
        <li>5- Run <code className="custom-code">yarn build</code> and make sure everything is OK when
        running <code className="custom-code">yarn checkAll</code>. checkAll script checks the following items:
        <ul className="Docs__list">
          <li>- Code formatting and styles using Eslint and Prettier </li>
          <li>- Tests all get passed</li>
          <li>- Coverage is 100%</li>
          <li>- Bundle size wouldn&#39;t exceed 9 KB</li>
        </ul>
        </li>
        <li>5- Submit a pull request(to develop branch of main repository), and we will work it out!</li>
      </ul>
    </Docs>
  );
};

export default ContributionGuide;
