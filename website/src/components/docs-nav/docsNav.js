import React from 'react';
import { Link } from 'gatsby';

import styles from './docsNav.module.css';

const DocsNav = () => {
  return (
    <aside className={styles.DocsNav}>
      <div className={styles.DocsNav__section}>
        <span className={styles.DocsNav__sectionTitle}>Getting Started</span>
        <ul className={styles.DocsNav__list}>
          <Link to="/docs" className={styles.DocsNav__listItem}>Installation</Link>
          <Link to="/docs" className={styles.DocsNav__listItem}>Basic Date Picker</Link>
          <Link to="/docs" className={styles.DocsNav__listItem}>Range Date Picker</Link>
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
