import React, { useEffect, useState } from 'react';
import Header from 'components/header';

import { Link } from 'react-router-dom';
import TxButton from 'components/TxButton';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
export default function HomePage() {
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
            <div className={`${styles.btnGroup} d-flex flex-wrap space-y-10 homepage-center-btn`}>
              <a></a>
              <Link to="/explore" className="btn btn-warning btn-sm home-btn">
                EXPLORE
              </Link>
              <Link
                to="/collections"
                className="btn btn-primary btn-sm  home-btn"
              >
                COLLECTIONS
              </Link>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://docs.openzoo.io"
                className="btn btn-dark btn-sm home-btn"
              >
                <FontAwesomeIcon icon={faBook} /> Docs
              </a>
            </div>
            <div className={styles.btnGroup}>
              <TxButton
                className="btn btn-link btn-sm  home-btn"
                style={{ marginLeft: -15 }}
                onClick={() => {
                  window.location.href = '/create';
                }}
              >
                Create NFT &gt;
              </TxButton>
            </div>

            <div className={styles.contact}>
              <div className={styles.become}>
                <div>
                  <img src="https://assets.openzoo.io/verified.svg" />
                </div>
                <div>
                  Become<span>verified</span>
                </div>
              </div>
              <div className={styles.seperator}></div>
              <div className={styles.become2}>
                <div>
                  On Telegram
                  <span>
                    <a
                      rel="noreferrer"
                      href="https://t.me/openzoo_validation"
                      target="_blank"
                    >
                      here
                    </a>
                  </span>
                </div>
              </div>
              <div className={styles.become2}>
                <div>OR</div>
              </div>
              <div className={styles.become2}>
                <div>
                  On Discord
                  <span>
                    <a
                      rel="noreferrer"
                      href="https://discord.gg/tT4v8H6UBH"
                      target="_blank"
                    >
                      here
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {!dark ? (
            <img
              src={`https://assets.openzoo.io/Homepage/light/${(Math.floor(Math.random() * 16) + 1)
                .toString()
                .padStart(2, '0')}.jpg`}
              alt="man"
              className={styles.man}
            />
          ) : (
            <img
              src={`https://assets.openzoo.io/Homepage/dark/${(Math.floor(Math.random() * 16) + 1)
                .toString()
                .padStart(2, '0')}.jpg`}
              alt="man"
              className={styles.man}
            />
          )}
        </div>
      </div>
    </div>
  );
}
