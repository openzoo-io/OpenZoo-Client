import React, { useEffect, useState } from 'react';
import Header from 'components/header';

import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export function HomePage() {
  useEffect(() => {
    document.body.classList.add('homepage');
    return () => {
      document.body.classList.remove('homepage');
    };
  }, []);
  const [dark, setDark] = useState(false);
  return (
    <div className="overflow-hidden">
      <div className={`${styles.container} ${styles.homepage}`}>
        <Header setDark={setDark} />
        <div className={styles.body}>
          <div className={styles.main}>
            <div>
              <div className={styles.nftmkt}>NFT MARKETPLACE</div>
              <div className={styles.openzoo}>
                OPEN<span>ZOO</span>
              </div>
              <div className={styles.subtitle}>
                not so ordinary,
                <br />
                open to everyone
              </div>
            </div>
            <div className={styles.btnGroup}>
              <Link to="/explore" className="btn btn-warning btn-sm home-btn">
                EXPLORE
              </Link>
              <Link
                to="/collections"
                className="btn btn-primary btn-sm  home-btn disabled"
              >
                COLLECTIONS
              </Link>
              <Link to="/create" disabled className="btn btn-link btn-sm  home-btn">
                Create NFT &gt;
              </Link>
            </div>
            <div className={styles.contact}>
              <div className={styles.become}>
                <div><img src="verified.svg"/></div><div>Become<span>verified</span></div>
              </div>
              <div className={styles.seperator}></div>
              <div className={styles.become2}>
                <div>On Telegram<span>URL LINK</span></div>
              </div>
              <div className={styles.become2}>
                <div>OR</div>
              </div>
              <div className={styles.become2}>
                <div>On Discord<span>URL LINK</span></div>
              </div>
            </div>
          </div>

          {!dark ? (
            <img
              src={`/Homepage/light/${(Math.floor(Math.random() * 16) + 1).toString().padStart(2,"0")}.jpg`}
              alt="man"
              className={styles.man}
            />
          ) : (
            <img src={`/Homepage/dark/${(Math.floor(Math.random() * 16) + 1).toString().padStart(2,"0")}.jpg`} alt="man" className={styles.man} />
          )}
        </div>
      </div>
    </div>
  );
}
