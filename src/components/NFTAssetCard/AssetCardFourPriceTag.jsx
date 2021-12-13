import React from 'react';
import { makeStyles } from '@material-ui/core';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';
import useTokens from 'hooks/useTokens';
import { formatNumber } from 'utils';

import wFTMLogo from 'assets/imgs/wftm.png';

export function AssetCardFourPriceTag(props) {
  const {
    loading,
    auction,
    item,
    durationHumanize,
    auctionActive,
    onClickMakeOffer,
  } = props;
  const styles = useStyle();

  const { getTokenByAddress } = useTokens();

  if (loading) {
    return (
      <div className="d-flex rounded-15 bg_light justify-content-between px-10 py-10">
        <Skeleton width={'100%'} height={50} />
      </div>
    );
  }

  return (
    <>
      <div className="d-flex rounded-15 bg_light justify-content-between px-10 py-10">
        <div className={styles.head}>
          <span className={cx('color_text', styles.headText)}>
            {auction
              ? auctionActive
                ? 'Current Bid'
                : 'PRICE'
              : 'Not for sale'}
          </span>
        </div>
        <div className="d-flex space-x-5 align-items-center">
          {auction ? (
            <>
              <img
                src={
                  auctionActive
                    ? auction?.token?.icon
                    : getTokenByAddress(item?.paymentToken)?.icon || wFTMLogo
                }
                alt={auction?.token?.symbol}
                className={styles.tokenIcon}
              />
              <strong className={cx(styles.tokenPrice, 'color_brand')}>
                {formatNumber(
                  auctionActive ? auction.reservePrice : item.price.toFixed(2)
                )}
              </strong>
              <strong className={cx(styles.tokenSymbol, 'color_brand')}>
                {auction?.token?.symbol}
              </strong>
            </>
          ) : (
            <div
              className="cursor-pointer color_brand"
              onClick={onClickMakeOffer}
            >
              Make Offer
            </div>
          )}
        </div>
      </div>
      <div className="d-flex px-10 justify-content-between">
        <div>
          {durationHumanize && (
            <>
              <div className="txt_xs color_text">Time left</div>
              <div className="txt_xs">{durationHumanize}</div>
            </>
          )}
        </div>
        {item?.lastSalePrice > 0 && (
          <div className="d-flex justify-content-end align-items-center space-x-5">
            <span className="txt_sm">Last Price</span>
            <img
              src={getTokenByAddress(item?.lastSalePricePaymentToken)?.icon}
              alt={ getTokenByAddress(item?.lastSalePricePaymentToken).symbol}
              className={styles.tokenIcon}
            />
            <strong className={cx(styles.tokenPrice, 'txt_sm color_brand')}>
              {formatNumber(item.lastSalePrice)}
            </strong>
          </div>
        )}
      </div>
    </>
  );
}

const useStyle = makeStyles(() => ({
  head: {
    width: 80,
    paddingRight: 10,
    borderRight: '1px solid #e6edf0',
    textAlign: 'center',
  },
  headText: {
    fontSize: 14,
    lineHeight: 1,
    fontWeight: 500,
  },
  tokenIcon: {
    width: 20,
    height: 20,
  },
  tokenPrice: {
    fontSize: 17,
    fontWeight: 500,
  },
  tokenSymbol: {
    fontSize: 18,
    fontWeight: 600,
  },
}));
