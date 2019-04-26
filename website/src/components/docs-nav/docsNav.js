import React from 'react';
import { Link } from 'gatsby';

import { TUTORIAL_ITEMS } from '../../constants/docsConstants';

import styles from './docsNav.module.css';

const DocsNav = () => {
  return (
    <aside className={styles.DocsNav}>
      <div className={styles.DocsNav__section}>
        <span className={styles.DocsNav__sectionTitle}>Tutorial</span>
        <ul className={styles.DocsNav__list}>
          {TUTORIAL_ITEMS.map(({ id, path, text }) => (
            <Link
              key={id}
              to={path}
              className={styles.DocsNav__listItem}
              activeClassName={styles.Active}
            >
              {text}
            </Link>
          ))}
        </ul>
      </div>
      <div className={styles.DocsNav__section}>
        <span className={styles.DocsNav__sectionTitle}>API</span>
        <ul className={styles.DocsNav__list}>
          <Link to="/docs" className={styles.DocsNav__listItem}>Installation</Link>
          <Link to="/docs" className={styles.DocsNav__listItem}>Basic Date Picker</Link>
          <Link to="/docs" className={styles.DocsNav__listItem}>Range Date Picker</Link>
        </ul>
      </div>
    </aside>
  );
}

export { DocsNav };
