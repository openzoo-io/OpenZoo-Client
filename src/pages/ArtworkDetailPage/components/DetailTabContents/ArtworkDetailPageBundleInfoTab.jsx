import Identicon from 'components/Identicon';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { shortenAddress } from 'utils';

import styles from '../../../NFTItem/styles.module.scss';

export function ArtworkDetailPageBundleInfoTab(props) {
  const { creatorInfoLoading, creatorInfo, creator, account } = props;

  return (
    <div className={styles.panelBody}>
      {creatorInfoLoading ? (
        <Skeleton width={150} height={20} />
      ) : (
        <div className={styles.itemOwner}>
          <div className={styles.ownerAvatar}>
            {creatorInfo?.imageHash ? (
              <img
                src={`https://openzoo.mypinata.cloud/ipfs/${creatorInfo.imageHash}`}
                className={styles.avatar}
              />
            ) : (
              <Identicon
                account={creator}
                size={24}
                className={styles.avatar}
              />
            )}
          </div>
          Created by&nbsp;
          <Link to={`/account/${creator}`} className={styles.ownerName}>
            {creator?.toLowerCase() === account?.toLowerCase()
              ? 'Me'
              : creatorInfo?.alias || shortenAddress(creator)}
          </Link>
        </div>
      )}
    </div>
  );
}
