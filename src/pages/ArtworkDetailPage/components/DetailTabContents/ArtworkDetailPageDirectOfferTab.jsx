import React from 'react';
import cx from 'classnames';

import styles from '../../styles.module.scss';
import { Link } from 'react-router-dom';
import Identicon from 'components/Identicon';
import { formatNumber } from 'utils';
import Skeleton from 'react-loading-skeleton';
import { ClipLoader } from 'react-spinners';
import TxButton from 'components/TxButton';

const ONE_MIN = 60;
const ONE_HOUR = ONE_MIN * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_MONTH = ONE_DAY * 30;

// .current => offers, tokenType, auction
export function ArtworkDetailPageDirectOfferTab(props) {
  const {
    offers,
    tokenInfo,
    now,
    prices,
    isMine,
    myHolding,
    account,
    salesContractApproving,
    offerAccepting,
    bundleID,
    isBundleContractApproved,
    handleApproveBundleSalesContract,
    salesContractApproved,
    handleApproveSalesContract,
    offerCanceling,
    tokenType,
    auction,
    offerPlacing,
    handleAcceptOffer,
    handleCancelOffer,
    setOfferModalVisible,
  } = props;

  const formatDiff = diff => {
    if (diff >= ONE_MONTH) {
      const m = Math.ceil(diff / ONE_MONTH);
      return `${m} Month${m > 1 ? 's' : ''}`;
    }
    if (diff >= ONE_DAY) {
      const d = Math.ceil(diff / ONE_DAY);
      return `${d} Day${d > 1 ? 's' : ''}`;
    }
    if (diff >= ONE_HOUR) {
      const h = Math.ceil(diff / ONE_HOUR);
      return `${h} Hour${h > 1 ? 's' : ''}`;
    }
    if (diff >= ONE_MIN) {
      const h = Math.ceil(diff / ONE_MIN);
      return `${h} Min${h > 1 ? 's' : ''}`;
    }
    return `${diff} Second${diff > 1 ? 's' : ''}`;
  };

  const formatExpiration = deadline => {
    if (deadline < now.getTime()) return 'Expired';

    let diff = new Date(deadline).getTime() - now.getTime();
    diff = Math.floor(diff / 1000);
    return formatDiff(diff);
  };

  return (
    <div className={styles.offers}>
      {offers.length ? (
        <>
          <div className={cx(styles.offer, styles.heading)}>
            <div className={styles.owner}>From</div>
            <div className={styles.price}>Price</div>
            {tokenInfo?.totalSupply > 1 && (
              <div className={styles.quantity}>Quantity</div>
            )}
            <div className={styles.deadline}>Expires In</div>
            <div className={styles.buy} />
          </div>
          {offers
            .filter(offer => offer.deadline > now.getTime())
            .sort((a, b) => (a.pricePerItem < b.pricePerItem ? 1 : -1))
            .map((offer, idx) => (
              <div className={styles.offer} key={idx}>
                <div className={styles.owner}>
                  <Link to={`/account/${offer.creator}`}>
                    <div className={styles.userAvatarWrapper}>
                      {offer.image ? (
                        <img
                          src={`https://openzoo.mypinata.cloud/ipfs/${offer.image}`}
                          className={styles.userAvatar}
                        />
                      ) : (
                        <Identicon
                          account={offer.creator}
                          size={24}
                          className={styles.userAvatar}
                        />
                      )}
                    </div>
                    {offer.alias || offer.creator?.substr(0, 6)}
                  </Link>
                </div>
                <div className={styles.price}>
                  <img src={offer.token?.icon} className={styles.tokenIcon} />
                  {formatNumber(offer.pricePerItem || offer.price)}
                  &nbsp;(
                  {prices[offer.token.address] !== undefined ? (
                    `$${(
                      (offer.pricePerItem || offer.price) *
                      prices[offer.token.address]
                    ).toFixed(3)}`
                  ) : (
                    <Skeleton width={60} height={24} />
                  )}
                  )
                </div>
                {tokenInfo?.totalSupply > 1 && (
                  <div className={styles.quantity}>
                    {formatNumber(offer.quantity)}
                  </div>
                )}
                <div className={styles.deadline}>
                  {formatExpiration(offer.deadline)}
                </div>
                <div className={styles.buy}>
                  {(isMine ||
                    (myHolding && myHolding.supply >= offer.quantity)) &&
                    offer.creator?.toLowerCase() !== account?.toLowerCase() && (
                      <div
                        className={cx(
                          styles.buyButton,
                          (salesContractApproving || offerAccepting) &&
                            styles.disabled
                        )}
                        onClick={
                          bundleID
                            ? isBundleContractApproved
                              ? () => handleAcceptOffer(offer)
                              : handleApproveBundleSalesContract
                            : salesContractApproved
                            ? () => handleAcceptOffer(offer)
                            : handleApproveSalesContract
                        }
                      >
                        {!(bundleID
                          ? isBundleContractApproved
                          : salesContractApproved) ? (
                          salesContractApproving ? (
                            <ClipLoader color="#FFF" size={16} />
                          ) : (
                            'Approve'
                          )
                        ) : offerAccepting ? (
                          <ClipLoader color="#FFF" size={16} />
                        ) : (
                          'Accept'
                        )}
                      </div>
                    )}
                  {offer.creator?.toLowerCase() === account?.toLowerCase() && (
                    <div
                      className={cx(
                        'btn btn-primary btn-md rounded-20',
                        styles.buyButton,
                        offerCanceling && styles.disabled
                      )}
                      onClick={() => handleCancelOffer()}
                    >
                      {offerCanceling ? (
                        <ClipLoader color="#FFF" size={16} />
                      ) : (
                        'Withdraw'
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </>
      ) : (
        <div className={styles.noOffers}>
          <div className={styles.noOffersLabel}>No Offers Yet</div>
          {(!isMine ||
            (tokenType === 1155 && myHolding.supply < tokenInfo.totalSupply)) &&
            (!auction || auction.resulted) && (
              <TxButton
                className={cx(
                  'btn btn-primary btn-md rounded-20',
                  styles.makeOffer,
                  offerPlacing && styles.disabled
                )}
                onClick={() => alert('Make offer is disabled')} //setOfferModalVisible(true)}
              >
                Make Offer
              </TxButton>
            )}
        </div>
      )}
    </div>
  );
}
