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

export function AccountProfileActivitiesList(props) {
  const { activityLoading, activities } = props;
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
    <div className={cx('bg-white', styles.tableWapper)}>
      <div className={styles.activityHeader}>
        <div className={styles.event}>Event</div>
        <div className={styles.name}>Item</div>
        <div className={styles.price}>Price</div>
        <div className={styles.quantity}>Quantity</div>
        <div className={styles.owner}>Owner</div>
        <div className={styles.date}>Date</div>
      </div>
      <div className={styles.activityList}>
        {(activityLoading ? new Array(5).fill(null) : activities).map(
          (activity, idx) => (
            <div key={idx} className={styles.activity}>
              <div className={styles.event}>
                {activity ? (
                  activity.event
                ) : (
                  <Skeleton width={100} height={20} />
                )}
              </div>
              {activity ? (
                <Link
                  to={`/collection/${activity.contractAddress}/${activity.tokenID}`}
                  className={styles.name}
                >
                  <div className={styles.media}>
                    {renderMedia(
                      activity.thumbnailPath.length > 10
                        ? `${storageUrl}/image/${activity.thumbnailPath}`
                        : activity.imageURL
                    )}
                  </div>
                  <div>
                  {activity.name}
                  </div>
                </Link>
              ) : (
                <div className={styles.name}>
                  <Skeleton width={120} height={20} />
                </div>
              )}
              <div className={styles.price}>
                {activity ? (
                  <>
                    <div className={styles.tokenLogo}>
                      <img src={activity.token?.icon} />
                    </div>
                    {activity.price}
                  </>
                ) : (
                  <Skeleton width={100} height={20} />
                )}
              </div>
              <div className={styles.quantity}>
                {activity ? (
                  activity.quantity
                ) : (
                  <Skeleton width={80} height={20} />
                )}
              </div>
              {activity ? (
                activity.to ? (
                  <Link to={`/account/${activity.to}`} className={styles.owner}>
                    <div className={styles.ownerAvatarWrapper}>
                      {activity.image ? (
                        <img
                          src={`https://openzoo.mypinata.cloud/ipfs/${activity.image}`}
                          className={styles.ownerAvatar}
                        />
                      ) : (
                        <Identicon
                          account={activity.to}
                          size={24}
                          className={styles.ownerAvatar}
                        />
                      )}
                    </div>
                    {activity.alias || shortenAddress(activity.to)}
                  </Link>
                ) : (
                  <div className={styles.owner} />
                )
              ) : (
                <div className={styles.owner}>
                  <Skeleton width={130} height={20} />
                </div>
              )}
              <div className={styles.date}>
                {activity ? (
                  formatDateTimeAgo(activity.createdAt)
                ) : (
                  <Skeleton width={120} height={20} />
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
