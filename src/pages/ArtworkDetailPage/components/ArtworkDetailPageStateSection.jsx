import Identicon from 'components/Identicon';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { formatNumber, shortenAddress } from 'utils';
import styles from '../../NFTItem/styles.module.scss';
import {
  People as PeopleIcon,
  ViewModule as ViewModuleIcon,
} from '@material-ui/icons';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export function ArtworkDetailPageStateSection(props) {
  const { setOwnersModalVisible } = props;
  const {
    ownerInfoLoading,
    tokenOwnerLoading,
    owner,
    tokenInfo,
    tokenType,
    bundleID,
    ownerInfo,
    isMine,
    holders,
    views,
  } = props.data;

  return (
    <div className={styles.itemStats}>
      {(ownerInfoLoading || tokenOwnerLoading || owner || tokenInfo) && (
        <div className={styles.itemOwner}>
          {ownerInfoLoading || tokenOwnerLoading ? (
            <Skeleton width={150} height={20} />
          ) : tokenType.current === 721 || bundleID ? (
            <>
              <div className={styles.ownerAvatar}>
                {ownerInfo?.imageHash ? (
                  <img
                    src={`https://openzoo.mypinata.cloud/ipfs/${ownerInfo.imageHash}`}
                    className={styles.avatar}
                  />
                ) : (
                  <Identicon
                    account={owner}
                    size={32}
                    className={styles.avatar}
                  />
                )}
              </div>
              Owned by&nbsp;
              <Link to={`/account/${owner}`} className={styles.ownerName}>
                {isMine ? 'Me' : ownerInfo?.alias || shortenAddress(owner)}
              </Link>
            </>
          ) : tokenInfo ? (
            <>
              <div
                className={cx(styles.itemViews, styles.clickable)}
                onClick={() => setOwnersModalVisible(true)}
              >
                <PeopleIcon style={styles.itemIcon} />
                &nbsp;{formatNumber(holders.length)}
                &nbsp;owner{holders.length > 1 && 's'}
              </div>
              <div className={styles.itemViews}>
                <ViewModuleIcon style={styles.itemIcon} />
                &nbsp;{formatNumber(tokenInfo.totalSupply)} total
              </div>
            </>
          ) : null}
        </div>
      )}
      <div className={styles.itemViews}>
        <FontAwesomeIcon icon={faEye} color="#A2A2AD" />
        &nbsp;
        {isNaN(views) ? (
          <Skeleton width={80} height={20} />
        ) : (
          `${formatNumber(views)} view${views !== 1 ? 's' : ''}`
        )}
      </div>
    </div>
  );
}
