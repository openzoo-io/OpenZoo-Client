import React from 'react';

import webIcon from 'assets/svgs/web.svg';
import discordIcon from 'assets/svgs/discord.svg';
import telegramIcon from 'assets/svgs/telegram.svg';
import twitterIcon from 'assets/svgs/twitter.svg';
import mediumIcon from 'assets/svgs/medium.svg';

import styles from '../../../NFTItem/styles.module.scss';

export function ArtworkDetailPageAboutCollectionTab(props) {
  const { collection } = props;

  return (
    <div className={styles.panelBody}>
      <div className={styles.collectionDescription}>
        {collection?.description || 'Unverified Collection'}
      </div>

      <div className={styles.socialLinks}>
        {collection?.siteUrl?.length > 0 && (
          <a
            href={collection?.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <img src={webIcon} />
          </a>
        )}
        {collection?.twitterHandle?.length > 0 && (
          <a
            href={collection?.twitterHandle}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <img src={twitterIcon} />
          </a>
        )}
        {collection?.mediumHandle?.length > 0 && (
          <a
            href={collection?.mediumHandle}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <img src={mediumIcon} />
          </a>
        )}
        {collection?.telegram?.length > 0 && (
          <a
            href={collection?.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <img src={telegramIcon} />
          </a>
        )}
        {collection?.discord?.length > 0 && (
          <a
            href={collection?.discord}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <img src={discordIcon} />
          </a>
        )}
      </div>
    </div>
  );
}
