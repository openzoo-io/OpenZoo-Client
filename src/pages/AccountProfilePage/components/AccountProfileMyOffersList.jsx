import { useApi } from 'api';
import Loader from 'components/Loader';
import SuspenseImg from 'components/SuspenseImg';
import React, { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { formatDateTimeAgo } from 'utils';
import cx from 'classnames';
import styles from '../styles.module.scss';

export function AccountProfileMyOffersList(props) {
  const { bids, bidsLoading, now } = props;
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
      <div className={cx(styles.activityHeader)}>
        <div className={styles.name}>Item</div>
        <div className={styles.price}>Price</div>
        <div className={styles.quantity}>Quantity</div>
        <div className={styles.date}>Date</div>
      </div>
      <div className={cx('bg-white', styles.activityList)}>
        {(bidsLoading
          ? new Array(5).fill(null)
          : bids?.filter(bid => bid.deadline * 1000 > now.getTime())
        ).map((bid, idx) => (
          <div key={idx} className={styles.activity}>
            {bid ? (
              <Link
                to={`/collection/${bid.contractAddress}/${bid.tokenID}`}
                className={styles.name}
              >
                <div className={styles.media}>
                  {renderMedia(
                    bid.thumbnailPath.length > 10
                      ? `${storageUrl}/image/${bid.thumbnailPath}`
                      : bid.imageURL
                  )}
                </div>
                {bid.name}
              </Link>
            ) : (
              <div className={styles.name}>
                <Skeleton width={120} height={20} />
              </div>
            )}
            <div className={styles.price}>
              {bid ? (
                <>
                  <div className={styles.tokenLogo}>
                    <img src={bid.token?.icon} />
                  </div>
                  {bid.pricePerItem}
                </>
              ) : (
                <Skeleton width={100} height={20} />
              )}
            </div>
            <div className={styles.quantity}>
              {bid ? bid.quantity : <Skeleton width={80} height={20} />}
            </div>
            <div className={styles.date}>
              {bid ? (
                formatDateTimeAgo(bid.createdAt)
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
