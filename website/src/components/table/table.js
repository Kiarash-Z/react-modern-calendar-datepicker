import React from 'react';
import shortId from 'shortid';
import PropTypes from 'prop-types';

import styles from './table.module.css';

const Table = ({ headers, rows }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead >
          <tr>
            {headers.map(header => (
              <th className={styles.table__header} key={shortId.generate()}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={shortId.generate()} className={styles.table__row}>
              {row.map((rowItem, index) => {
                return (
                  <td key={shortId.generate()} className={styles.table__data}>
                    {!(index === 2) ? rowItem : (
                      <code className="custom-code">{rowItem}</code>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.defaultProps = {
  headers: [],
  rows: [],
};

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
  rows: PropTypes.arrayOf(PropTypes.array),
};

export { Table };
