import React from 'react';
import { Link } from 'gatsby';

import { ReactComponent as Logo } from '../../images/logo.svg';

import styles from './navbar.module.css';

const Navbar = ({ version }) => {
  return (
    <nav className={styles.Navbar}>
      <div className={styles.Navbar__titleContainer}>
        <Logo className={styles.Navbar__logo} />
        <h1>
          <Link className={styles.Navbar__title} to="/">
            react-modern-calendar-datepicker
          </Link>
        </h1>
        <span className={styles.Navbar__version}>v{version}</span>
      </div>
      <ul className={styles.Navbar__list}>
        <li>
          <Link className={styles.Navbar__listItem} to="/docs/getting-started">
            Docs
          </Link>
        </li>
        <li>
          <Link className={styles.Navbar__listItem} to="/docs/contribution-guide">
            Contribution
          </Link>
        </li>
        <li>
          <a
            href="https://github.com/Kiarash-Z/react-modern-calendar-datepicker"
            rel="noopener noreferrer"
            target="_blank"
            className={styles.Navbar__listItem}
          >
          Github
          </a>
        </li>
      </ul>
    </nav>
  );
};

export { Navbar };
