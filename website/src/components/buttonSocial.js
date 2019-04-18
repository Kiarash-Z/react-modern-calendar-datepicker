import React from 'react';
import PropTypes from 'prop-types';

import styles from './buttonSocial.module.css'

const ButtonSocial = ({ className, children }) => {
  return (
    <button type="button" className={`${className} ${styles.Button}`}>
      {children}
    </button>
  )
}

ButtonSocial.defaultProps = {
  className: '',
}

ButtonSocial.propTypes = {
  className: PropTypes.string,
}

export { ButtonSocial };
