import React from 'react';
import PropTypes from 'prop-types';

import styles from './buttonPrimary.module.css'

const ButtonPrimary = ({ className, children }) => {
  return (
    <button type="button" className={`${className} ${styles.Button}`}>
      {children}
    </button>
  )
}

ButtonPrimary.defaultProps = {
  className: '',
}

ButtonPrimary.propTypes = {
  className: PropTypes.string,
}

export { ButtonPrimary };
