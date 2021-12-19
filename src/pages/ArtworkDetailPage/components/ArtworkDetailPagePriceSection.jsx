import React from 'react';
import { formatNumber } from 'utils';
import styles from '../styles.module.scss';
import PropTypes from 'prop-types';
import TxButton from 'components/TxButton';
import cx from 'classnames';
import { ClipLoader } from 'react-spinners';

const propTypes = {
  bestListing: PropTypes.object,
  prices: PropTypes.object,
};

export function ArtworkDetailPagePriceSection(props) {
  const {
    bid,
    bestListing,
    prices,
    account,
    buyingItem,
    bundleID,
    isMine,
    auction,
    auctionCanceling,
    cancelCurrentAuction,
    auctionCancelConfirming,
    hasListing,
    tokenType,
    auctionStarting,
    auctionUpdating,
    auctionEnded,
    setAuctionModalVisible,
    auctionStartConfirming,
    auctionUpdateConfirming,
    cancelingListing,
    cancelList,
    cancelListingConfirming,
    listingItem,
    myHolding,
    priceUpdating,
    setSellModalVisible,
    listingConfirming,
    tokenInfo,
    offerPlacing,
    offerCanceling,
    handleBuyBundle,
    handleCancelOffer,
    setOfferModalVisible,
    offerConfirming,
    hasMyOffer,
    handleBuyItem,
  } = props;

  /*
  if (bestListing == null) {
    return null;
  }
  */

  return (
    <div className="numbers">
      {bestListing && (
        <div className="d-flex flex-column flex-sm-column flex-md-row  space-x-10 justify-content-between align-items-center">
          <div className="d-flex space-x-20">
            <h2 className="">
              {prices[bestListing.token?.address]
                ? `$${formatNumber(
                    (
                      bestListing.price * prices[bestListing.token?.address]
                    ).toFixed(3)
                  )}`
                : null}
            </h2>
            <span className="d-flex align-items-center txt_lg">
              <img
                src={bestListing?.token?.icon}
                className={styles.tokenLogo}
              />
              {formatNumber(bestListing.price)}
            </span>
          </div>

          <div className="d-flex sm:space-x-5 md:space-x-10 space-x-20 sm:-ml-5 md:-ml-10 -ml-20">
            <div></div>
           
            {bestListing &&
              bestListing?.owner.toLocaleLowerCase() !==
                account?.toLocaleLowerCase() && (
                <TxButton
                  className={cx(
                    'btn btn-warning btn-lg rounded-20',
                    styles.headerButton,
                    buyingItem && styles.disabled
                  )}
                  onClick={
                    bundleID
                      ? handleBuyBundle
                      : () => handleBuyItem(bestListing)
                  }
                >
                  Buy Now
                </TxButton>
              )}

            {isMine && (
              <>
                {auction.current?.resulted === false ? (
                  <div
                    className={cx(
                      'btn btn-warning btn-lg rounded-20',
                      styles.headerButton,
                      auctionCanceling && styles.disabled
                    )}
                    onClick={cancelCurrentAuction}
                  >
                    {auctionCancelConfirming ? (
                      <ClipLoader color="#FFF" size={16} />
                    ) : bid?.bid < auction.current.reservePrice ||
                      !auctionEnded ? (
                      'Cancel Auction'
                    ) : (
                      'Accept highest bid'
                    )}
                  </div>
                ) : null}
                {!bundleID &&
                  (!auction.current || !auction.current.resulted) &&
                  !hasListing &&
                  tokenType.current !== 1155 && (
                    <div
                      className={cx(
                        'btn btn-warning btn-lg rounded-20',
                        styles.headerButton,
                        (auctionStarting || auctionUpdating || auctionEnded) &&
                          styles.disabled
                      )}
                      onClick={() => {
                        !auctionEnded && setAuctionModalVisible(true);
                      }}
                    >
                      {auctionStartConfirming || auctionUpdateConfirming ? (
                        <ClipLoader color="#FFF" size={16} />
                      ) : auction.current ? (
                        'Update Auction'
                      ) : (
                        'Start Auction'
                      )}
                    </div>
                  )}
                {(!auction.current || auction.current.resulted) && (
                  <>
                    {hasListing ? (
                      <div
                        className={cx(
                          'btn btn-warning btn-lg rounded-20',
                          styles.headerButton,
                          cancelingListing && styles.disabled
                        )}
                        onClick={cancelList}
                      >
                        {cancelListingConfirming ? (
                          <ClipLoader color="#FFF" size={16} />
                        ) : (
                          'Cancel Listing'
                        )}
                      </div>
                    ) : null}
                    <div
                      className={cx(
                        'btn btn-warning btn-lg rounded-20',
                        styles.headerButton,
                        (listingItem || priceUpdating) && styles.disabled
                      )}
                      onClick={() =>
                        !(listingItem || priceUpdating)
                          ? setSellModalVisible(true)
                          : null
                      }
                    >
                      {listingConfirming ? (
                        <ClipLoader color="#FFF" size={16} />
                      ) : hasListing ? (
                        'Update Listing'
                      ) : (
                        'Sell'
                      )}
                    </div>
                  </>
                )}
              </>
            )}

            {(!isMine ||
              (tokenType.current === 1155 &&
                myHolding.supply < tokenInfo.totalSupply)) &&
              (!auction.current || auction.current.resulted) && (
                <TxButton
                  className={cx(
                    'btn btn-warning btn-lg rounded-20',
                    styles.headerButton,
                    (offerPlacing || offerCanceling) && styles.disabled
                  )}
                  data-toggle="modal"
                  data-target="#popup_bid"
                  onClick={
                    hasMyOffer
                      ? handleCancelOffer
                      : () => setOfferModalVisible(true)
                  }
                >
                  {offerConfirming ? (
                    <ClipLoader color="#FFF" size={16} />
                  ) : hasMyOffer ? (
                    'Withdraw Offer'
                  ) : (
                    'Make Offer'
                  )}
                </TxButton>
              )}
          </div>
        </div>
      )}

      {!bestListing && (
        <div className="d-flex flex-column flex-sm-column flex-md-row  space-x-10 justify-content-between align-items-center">
          <div className="d-flex sm:space-x-5 md:space-x-10 space-x-20 sm:-ml-5 md:-ml-10 -ml-20">
            <div></div>
            {isMine && (
              <>
                {auction.current?.resulted === false ? (
                  <div
                    className={cx(
                      'btn btn-warning btn-lg rounded-20',
                      styles.headerButton,
                      auctionCanceling && styles.disabled
                    )}
                    onClick={cancelCurrentAuction}
                  >
                    {auctionCancelConfirming ? (
                      <ClipLoader color="#FFF" size={16} />
                    ) : bid?.bid < auction.current.reservePrice ||
                      !auctionEnded ? (
                      'Cancel Auction'
                    ) : (
                      'Accept highest bid'
                    )}
                  </div>
                ) : null}
                {!bundleID &&
                  (!auction.current || !auction.current.resulted) &&
                  !hasListing &&
                  tokenType.current !== 1155 && (
                    <div
                      className={cx(
                        'btn btn-warning btn-lg rounded-20',
                        styles.headerButton,
                        (auctionStarting || auctionUpdating || auctionEnded) &&
                          styles.disabled
                      )}
                      onClick={() => {
                        !auctionEnded && setAuctionModalVisible(true);
                      }}
                    >
                      {auctionStartConfirming || auctionUpdateConfirming ? (
                        <ClipLoader color="#FFF" size={16} />
                      ) : auction.current ? (
                        'Update Auction'
                      ) : (
                        'Start Auction'
                      )}
                    </div>
                  )}
                {(!auction.current || auction.current.resulted) && (
                  <>
                    {hasListing ? (
                      <div
                        className={cx(
                          'btn btn-warning btn-lg rounded-20',
                          styles.headerButton,
                          cancelingListing && styles.disabled
                        )}
                        onClick={cancelList}
                      >
                        {cancelListingConfirming ? (
                          <ClipLoader color="#FFF" size={16} />
                        ) : (
                          'Cancel Listing'
                        )}
                      </div>
                    ) : null}
                    <div
                      className={cx(
                        'btn btn-warning btn-lg rounded-20',
                        styles.headerButton,
                        (listingItem || priceUpdating) && styles.disabled
                      )}
                      onClick={() =>
                        !(listingItem || priceUpdating)
                          ? setSellModalVisible(true)
                          : null
                      }
                    >
                      {listingConfirming ? (
                        <ClipLoader color="#FFF" size={16} />
                      ) : hasListing ? (
                        'Update Listing'
                      ) : (
                        'Sell'
                      )}
                    </div>
                  </>
                )}
              </>
            )}

            {(!isMine ||
              (tokenType.current === 1155 &&
                myHolding.supply < tokenInfo.totalSupply)) &&
              (!auction.current || auction.current.resulted) && (
                <TxButton
                  className={cx(
                    'btn btn-warning btn-lg rounded-20',
                    styles.headerButton,
                    (offerPlacing || offerCanceling) && styles.disabled
                  )}
                  data-toggle="modal"
                  data-target="#popup_bid"
                  onClick={
                    hasMyOffer
                      ? handleCancelOffer
                      : () => setOfferModalVisible(true)
                  }
                >
                  {offerConfirming ? (
                    <ClipLoader color="#FFF" size={16} />
                  ) : hasMyOffer ? (
                    'Withdraw Offer'
                  ) : (
                    'Make Offer'
                  )}
                </TxButton>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

ArtworkDetailPagePriceSection.propTypes = propTypes;
