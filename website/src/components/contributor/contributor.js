import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import styles from './contributor.module.css';

const Contributor = ({ username }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${username}`)
      .then(({ data: responseData }) => {
        setData(responseData);
      });
  }, []);
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={data.html_url}
      className={styles.Contributor}
    >
      {!Object.keys(data).length ? null : (
        <>
          <img
            className={styles.Contributor__avatar}
            src={data.avatar_url}
            alt={`${username}'s profile`}
          />
          <span className={styles.Contributor__name}>{data.name}</span>
          <span className={styles.Contributor__username}>@{username}</span>
        </>
      )}
    </a>
  );
};

Contributor.propTypes = {
  username: PropTypes.string.isRequired,
};

export { Contributor };
