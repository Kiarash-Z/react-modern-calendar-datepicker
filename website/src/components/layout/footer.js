import React from 'react';
import Helmet from 'react-helmet';
import shortId from 'shortid';

import { ReactComponent as Logo } from '../../images/logo.svg';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <Helmet>
        <script async defer src={`https://buttons.github.io/buttons.js?${shortId.generate()}`} />
      </Helmet>
      <Logo className={styles.Footer__logo} />
      <h1 className={styles.Footer__title}>
        react-persian-calendar-date-picker <span className={styles.Footer__copyright}>By Kiarash Zarinmehr</span>
      </h1>
      <div className={styles.Footer__githubContainer}>
        <a
          className="github-button"
          href="https://github.com/Kiarash-Z/react-persian-calendar-date-picker"
          data-icon="octicon-star"
          data-show-count="true"
          aria-label="Star Kiarash-Z/react-persian-calendar-date-picker on GitHub"
        >
          Star
        </a>
      </div>
    </footer>
  )
};

export default Footer;
