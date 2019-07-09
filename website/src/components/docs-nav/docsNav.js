import React from 'react';
import { Link } from 'gatsby';

import { DOCS_NAVBAR_ITEMS, } from '../../constants/docsConstants';

import styles from './docsNav.module.css';

const DocsNav = () => {
  return (
    <aside className={styles.DocsNav}>
      {DOCS_NAVBAR_ITEMS.map(({ id, items, name }) => (
        <div key={id} className={styles.DocsNav__section}>
          <span className={styles.DocsNav__sectionTitle}>{name}</span>
          <ul className={styles.DocsNav__list}>
            {items.map(({ id: itemId, path, name: itemName }) => (
              <Link
                key={itemId}
                to={path}
                className={styles.DocsNav__listItem}
                activeClassName={styles.Active}
              >
                {itemName}
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export { DocsNav };
