import { Avatar } from 'components/Avatar';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.module.scss';
// import Badge from 'assets/imgs/icons/Badge.svg';
import { Link } from 'react-router-dom';
import { formatNumber } from 'utils';
import Skeleton from 'react-loading-skeleton';

const propTypes = {
  listing: PropTypes.object,
  prices: PropTypes.object,
};

export function ArtworkDetailPageHistoryItem(props) {
  const { listing, prices } = props;
  const userUrl = listing.owner ? `/account/${listing.owner}` : '#';
  const accountImage = `https://openzoo.mypinata.cloud/ipfs/${listing.image}`;

  return (
    <div className="creator_item creator_card space-x-10">
      <div className="avatars space-x-10">
        <div className="media">
          {/* <div className="badge">
            <img src={Badge} alt="" />
          </div> */}
          <Link to={userUrl}>
            <Avatar imageSrc={accountImage} size="md" />
          </Link>
        </div>
        <div>
          <p className="color_black">
            Bid accepted{' '}
            <span className="color_brand">
              <img src={listing?.token?.icon} className={styles.tokenIcon} />
              {formatNumber(listing?.price)}&nbsp;(
              {listing?.token?.address != null &&
              prices?.[listing?.token?.address] != null ? (
                `$${(listing?.price * prices[listing?.token?.address]).toFixed(
                  3
                )}`
              ) : (
                <Skeleton width={60} height={24} />
              )}
              )
            </span>{' '}
            by{' '}
            <Link className="color_black txt _bold" to={userUrl}>
              {listing?.alias || listing.owner?.substr(0, 6) || 'unnamed'}
            </Link>
          </p>
          <span className="date color_text">{props.dateTime ?? ''}</span>
        </div>
      </div>
    </div>
  );
}

ArtworkDetailPageHistoryItem.propTypes = propTypes;
