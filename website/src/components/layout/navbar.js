import React from 'react';
import { Link } from "gatsby"

import Logo from '../../images/logo.svg';

import styles from "./navbar.module.css"

const Navbar = ({ version }) => {
  return (
    <nav className={styles.Navbar}>
      <div className={styles.Navbar__titleContainer}>
        <Logo className={styles.Navbar__logo} />
        <h1>
          <Link className={styles.Navbar__title} to="/">react-persian-date-picker</Link>
        </h1>
        <span className={styles.Navbar__version}>v{version}</span>
      </div>
      <ul className={styles.Navbar__list}>
        <li className={styles.Navbar__listItem}>
          <Link to="/docs">Docs</Link>
        </li>
        <li className={styles.Navbar__listItem}>
          <Link to="/docs">Github</Link>
        </li>
      </ul>
    </nav>
  )
};

export { Navbar };
