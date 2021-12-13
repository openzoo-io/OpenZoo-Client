import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import HeaderActions from 'actions/header.actions';
import Header from 'components/header';

import openzooicon from 'assets/svgs/openzoo_icon.svg';

import styles from './styles.module.scss';

const NotFound = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(HeaderActions.toggleSearchbar(false));
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <div className={styles.main}>
          <div className={styles.title}>404</div>
          <div className={styles.subtitle}>
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </div>
          <Link to="/" className={styles.button}>
            Back To Home
          </Link>
        </div>
        <img src={openzooicon} alt="man" className={styles.man} />
      </div>
    </div>
  );
};

export default NotFound;
