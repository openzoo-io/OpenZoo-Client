import React from 'react';
import cx from 'classnames';
import { useParams } from 'react-router';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import Identicon from 'components/Identicon';
import { formatNumber, shortenAddress } from 'utils';
import TxButton from 'components/TxButton';
import { ClipLoader } from 'react-spinners';

import styles from '../../../NFTItem/styles.module.scss';

export function ArtworkDetailPageListingsTab(props) {
  const { bundleID } = useParams();
  const {
    tokenInfo,
    listings,
    bundleListing,
    loading,
    owner,
    ownerInfo,
    isMine,
    buyingItem,
    prices,
    account,
    handleBuyBundle,
    handleBuyItem,
  } = props;

  return (
    <div className={styles.listings}>
      <div className={cx(styles.listing, styles.heading)}>
        <div className={styles.owner}>From</div>
        <div className={styles.price}>Price</div>
        {tokenInfo?.totalSupply > 1 && (
          <div className={styles.quantity}>Quantity</div>
        )}
        <div className={styles.buy} />
      </div>
      {console.log('!listings', listings)}
      {bundleID
        ? bundleListing && (
            <div className={styles.listing}>
              <div className={styles.owner}>
                {loading ? (
                  <Skeleton width={100} height={20} />
                ) : (
                  <Link to={`/account/${owner}`}>
                    <div className={styles.userAvatarWrapper}>
                      {ownerInfo?.imageHash ? (
                        <img
                          src={`https://openzoo.mypinata.cloud/ipfs/${ownerInfo.imageHash}`}
                          className={styles.userAvatar}
                        />
                      ) : (
                        <Identicon
                          account={owner}
                          size={24}
                          className={styles.userAvatar}
                        />
                      )}
                    </div>
                    {isMine ? 'Me' : ownerInfo?.alias || shortenAddress(owner)}
                  </Link>
                )}
              </div>
              <div className={styles.price}>
                {loading ? (
                  <Skeleton width={100} height={20} />
                ) : (
                  <>
                    <img
                      src={bundleListing.token?.icon}
                      className={styles.tokenIcon}
                    />
                    {formatNumber(bundleListing.price)}
                  </>
                )}
              </div>
              <div className={styles.buy}>
                {!isMine && (
                  <TxButton
                    className={cx(
                      'btn btn-primary btn-md',
                      styles.buyButton,
                      buyingItem && styles.disabled
                    )}
                    onClick={handleBuyBundle}
                  >
                    {buyingItem ? <ClipLoader color="#FFF" size={16} /> : 'Buy'}
                  </TxButton>
                )}
              </div>
            </div>
          )
        : listings.map((listing, idx) => (
            <div className={styles.listing} key={idx}>
              <div className={styles.owner}>
                <Link to={`/account/${listing.owner}`}>
                  <div className={styles.userAvatarWrapper}>
                    {listing.image ? (
                      <img
                        src={`https://openzoo.mypinata.cloud/ipfs/${listing.image}`}
                        className={styles.userAvatar}
                      />
                    ) : (
                      <Identicon
                        account={listing.owner}
                        size={24}
                        className={styles.userAvatar}
                      />
                    )}
                  </div>
                  {listing.alias || listing.owner?.substr(0, 6)}
                </Link>
              </div>
              <div className={styles.price}>
                <img src={listing.token?.icon} className={styles.tokenIcon} />
                {formatNumber(listing.price)}&nbsp;(
                {prices[listing.token?.address] !== undefined ? (
                  `$${(listing.price * prices[listing.token?.address]).toFixed(
                    3
                  )}`
                ) : (
                  <Skeleton width={60} height={24} />
                )}
                )
              </div>
              {tokenInfo?.totalSupply > 1 && (
                <div className={styles.quantity}>
                  {formatNumber(listing.quantity)}
                </div>
              )}
              <div className={styles.buy}>
                {listing.owner.toLowerCase() !== account?.toLowerCase() && (
                  <TxButton
                    className={cx(
                      'btn btn-primary btn-md',
                      styles.buyButton,
                      buyingItem && styles.disabled
                    )}
                    onClick={() => handleBuyItem(listing)}
                  >
                    {buyingItem ? <ClipLoader color="#FFF" size={16} /> : 'Buy'}
                  </TxButton>
                )}
              </div>
            </div>
          ))}
    </div>
  );
}
