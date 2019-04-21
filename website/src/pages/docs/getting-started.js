import React from 'react';

import { Link } from 'gatsby';
import Docs from '../../containers/docs';
import { Code } from '../../components';

const Installation = () => {
  return (
    <Docs title="Getting Started">
      <p className="Docs__paragraph">
        Welcome to docs! react-persian-calendar-date-picker (quite long name!) is a date picker
        package for React and espacially, for the Persian community.
        It&#39;s lightweight; only 5.17KB gizpped, and it&#39;s easy to use.
      </p>

      <p className="Docs__paragraph -marginTop">
        <strong className="Docs__note">Important Note: </strong> This project uses your default font family in your project, but it&#39;s recommended
        to use <a rel="noopener noreferrer" target="_blank" className="Docs__link" href="https://fontiran.com/%D9%81%D9%88%D9%86%D8%AA-%D8%A7%DB%8C%D8%B1%D8%A7%D9%86-%DB%8C%DA%A9%D8%A7%D9%86-iran-yekan/"> Iran Yekan </a>
        or <a rel="noopener noreferrer" target="_blank" className="Docs__link" href="https://fontiran.com/%D8%AE%D8%A7%D9%86%D9%88%D8%A7%D8%AF%D9%87-%D9%81%D9%88%D9%86%D8%AA-%D8%A7%DB%8C%D8%B1%D8%A7%D9%86-%D8%B3%D9%86-%D8%B3%D8%B1%DB%8C%D9%81-iran-sans-%D9%BE%D9%86%D8%AC-%D9%88%D8%B2%D9%86-%D9%87%D9%85/"> Iran Sans </a> font families
        for the best user experience.
      </p>

      <h2 className="Docs__titleSecondary">Installation</h2>

      <p className="Docs__paragraph">
        Install it using Yarn:
      </p>

      <Code language="bash">
        {`yarn add react-persian-calendar-date-picker`}
      </Code>

      <p className="Docs__paragraph">
        Of if you prefer NPM:
      </p>

      <Code language="bash">
        {`npm i react-persian-calendar-date-picker`}
      </Code>

      <h2 className="Docs__titleSecondary">Basic Import</h2>
      <p className="Docs__paragraph">
        After the installation, it&#39;s time to import the package in your app.
      </p>
      <Code language="javascript">
        {`import 'react-persian-calendar-date-picker/lib/DatePicker.css';
import DatePicker from 'react-persian-calendar-date-picker';`}
      </Code>
      <p className="Docs__paragraph">
        Great job! You&#39;re all set. Now it&#39;s time to write some code.
        This is how you use the <Link className="Docs__link" to="/getting-started">basic date picker</Link>.
      </p>
    </Docs>
  );
};

export default Installation;
