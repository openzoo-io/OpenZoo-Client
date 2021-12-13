import Identicon from 'components/Identicon';
import React, {useState, useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { formatNumber, shortenAddress } from 'utils';
import styles from '../styles.module.scss';
import {
  People as PeopleIcon,
  Person as PersonIcon,
  ViewModule as ViewModuleIcon,
} from '@material-ui/icons';
import cx from 'classnames';
import { ViewProofButton } from './ViewProofButton';

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
    creator,
    creatorInfo,
    creatorInfoLoading,
    account,
    tokenUri
  } = props.data;

  const [mine, setMine] = useState(0);
  useEffect(()=>{
    if (holders.length > 0)
    {
      let myAccount = account?.toLowerCase();
      holders.map((v)=>{
        if (v.address === myAccount)
        {
          setMine(v.supply);
        }
      });
    }
  },[holders]);

  return (
    <div
      className={cx(
        styles.itemStats,
        'p-15 bg_white rounded-10 justify-content-between'
      )}
    >
      <div className={cx('space-x-10')}>
        {(ownerInfoLoading || tokenOwnerLoading || owner || tokenInfo) && (
          <div className={styles.itemOwner}>
            {ownerInfoLoading || tokenOwnerLoading ? (
              <Skeleton width={150} height={20} />
            ) : tokenType.current === 721 || bundleID ? (
              <>
                Owned by&nbsp;&nbsp;
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
                <Link to={`/account/${owner}`} className={styles.ownerName}>
                  {isMine ? 'Me' : ownerInfo?.alias || shortenAddress(owner)}
                </Link>
              </>
            ) : tokenInfo ? (
              
              <>
                {
                  account && <div
                  className={cx(styles.itemViews)}
                
                >
                  <PersonIcon style={styles.itemIcon} />
                  &nbsp;{formatNumber(mine)}
                  &nbsp;{holders.length > 1 ? 'Items are' : 'Item is'} mine
                </div>
                }
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
        {(creatorInfoLoading || creator || creatorInfoLoading) && (
          <div className={styles.itemOwner}>
            {creatorInfoLoading ? (
              <Skeleton width={150} height={20} />
            ) : tokenType.current === 721 || bundleID ? (
              <>
                Created by&nbsp;&nbsp;
                <div className={styles.ownerAvatar}>
                  {creatorInfo?.imageHash ? (
                    <img
                      src={`https://openzoo.mypinata.cloud/ipfs/${creatorInfo.imageHash}`}
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
                <Link to={`/account/${owner}`} className={styles.ownerName}>
                  {isMine ? 'Me' : creatorInfo?.alias || shortenAddress(owner)}
                </Link>
              </>
            ) : null}
          </div>
        )}
      </div>
      <div>
        <ViewProofButton tokenUri={tokenUri}/>
      </div>
    </div>
  );
}
