import React from 'react';
import { Link } from 'gatsby';

import Docs from '../../containers/docs';
import { Code } from '../../components';

const Installation = () => {
  return (
    <Docs title="Getting Started">
      <p className="Docs__paragraph">
        Welcome to docs! react-persian-calendar-date-picker (a quite long name!)
        is a react date picker
        package for the Persian community.
        It&#39;s lightweight; only ~5.5KB gizpped, and it&#39;s easy to use.
        Before using this package, please pay attention to these two important points:
      </p>

      <ul className="Docs__list">
        <li>
          1- This package
          uses <a rel="noopener noreferrer" target="_blank" className="Docs__link" href=" https://reactjs.org/docs/hooks-intro.html"> React hooks</a>. Make
          sure you&#39;re running <code className="custom-code">{`react >= 16.8.0`}</code> version.
        </li>
        <li>
          2- By default, this package inherits <code className="custom-code">font-family</code> from your project. It&#39;s recommended
          to use <a rel="noopener noreferrer" target="_blank" className="Docs__link" href="https://fontiran.com/%D9%81%D9%88%D9%86%D8%AA-%D8%A7%DB%8C%D8%B1%D8%A7%D9%86-%DB%8C%DA%A9%D8%A7%D9%86-iran-yekan/"> Iran Yekan (primary choice) </a>
          or <a rel="noopener noreferrer" target="_blank" className="Docs__link" href="https://fontiran.com/%D8%AE%D8%A7%D9%86%D9%88%D8%A7%D8%AF%D9%87-%D9%81%D9%88%D9%86%D8%AA-%D8%A7%DB%8C%D8%B1%D8%A7%D9%86-%D8%B3%D9%86-%D8%B3%D8%B1%DB%8C%D9%81-iran-sans-%D9%BE%D9%86%D8%AC-%D9%88%D8%B2%D9%86-%D9%87%D9%85/"> Iran Sans </a>
          as your font family in order to have the best user experience.
        </li>
      </ul>

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
        After the installation, it&#39;s time to import the package in your app:
      </p>
      <Code language="javascript">
        {`import 'react-persian-calendar-date-picker/lib/DatePicker.css';
import DatePicker from 'react-persian-calendar-date-picker';`}
      </Code>
      <p className="Docs__paragraph">
        Great job! You&#39;re all set. It&#39;s time to write some code now.
        Learn more about <Link className="Docs__link" to="/docs/core-concepts">the core concepts</Link>.
      </p>
    </Docs>
  );
};

export default Installation;
