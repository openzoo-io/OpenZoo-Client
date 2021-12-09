import { useApi } from 'api';
import Identicon from 'components/Identicon';
import Loader from 'components/Loader';
import SuspenseImg from 'components/SuspenseImg';
import React, { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { formatDateTimeAgo, shortenAddress } from 'utils';
import cx from 'classnames';
import styles from '../styles.module.scss';

export function AccountProfileOffersList(props) {
  const { offers, offersLoading, now } = props;
  const { storageUrl } = useApi();

  const renderMedia = image => {
    if (image?.includes('youtube')) {
      return (
        <ReactPlayer
          className={styles.mediaInner}
          url={image}
          controls={true}
          width="100%"
          height="100%"
        />
      );
    } else {
      return (
        <Suspense
          fallback={
            <Loader type="Oval" color="#00A59A" height={32} width={32} />
          }
        >
          <SuspenseImg className={styles.mediaInner} src={image} />
        </Suspense>
      );
    }
  };

  return (
    <>
      <div className={styles.activityHeader}>
        <div className={styles.name}>Item</div>
        <div className={styles.owner}>From</div>
        <div className={styles.price}>Price</div>
        <div className={styles.quantity}>Quantity</div>
        <div className={styles.date}>Date</div>
      </div>
      <div className={cx('bg-white', styles.activityList)}>
        {(offersLoading
          ? new Array(5).fill(null)
          : offers?.filter(offer => offer.deadline * 1000 > now.getTime())
        ).map((offer, idx) => (
          <div key={idx} className={styles.activity}>
            {offer ? (
              <Link
                to={`/explore/${offer.contractAddress}/${offer.tokenID}`}
                className={styles.name}
              >
                <div className={styles.media}>
                  {renderMedia(
                    offer.thumbnailPath.length > 10
                      ? `${storageUrl}/image/${offer.thumbnailPath}`
                      : offer.imageURL
                  )}
                </div>
                {offer.name}
              </Link>
            ) : (
              <div className={styles.name}>
                <Skeleton width={120} height={20} />
              </div>
            )}
            {offer ? (
              <Link to={`/account/${offer.creator}`} className={styles.owner}>
                <div className={styles.ownerAvatarWrapper}>
                  {offer.image ? (
                    <img
                      src={`https://openzoo.mypinata.cloud/ipfs/${offer.image}`}
                      className={styles.ownerAvatar}
                    />
                  ) : (
                    <Identicon
                      account={offer.creator}
                      size={24}
                      className={styles.ownerAvatar}
                    />
                  )}
                </div>
                {offer.alias || shortenAddress(offer.creator)}
              </Link>
            ) : (
              <div className={styles.owner}>
                <Skeleton width={130} height={20} />
              </div>
            )}
            <div className={styles.price}>
              {offer ? (
                <>
                  <div className={styles.tokenLogo}>
                    <img src={offer.token?.icon} />
                  </div>
                  {offer.pricePerItem}
                </>
              ) : (
                <Skeleton width={100} height={20} />
              )}
            </div>
            <div className={styles.quantity}>
              {offer ? offer.quantity : <Skeleton width={80} height={20} />}
            </div>
            <div className={styles.date}>
              {offer ? (
                formatDateTimeAgo(offer.createdAt)
              ) : (
                <Skeleton width={120} height={20} />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
