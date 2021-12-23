import React from 'react';
import { makeStyles } from '@material-ui/core';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';
import useTokens from 'hooks/useTokens';
import { formatNumber } from 'utils';
import { Link } from 'react-router-dom';
import wFTMLogo from 'assets/imgs/wftm.png';
import { useWeb3React } from '@web3-react/core';
export function AssetCardFourPriceTag(props) {
  const { account } = useWeb3React();
  const {
    loading,
    auction,
    item,
    //durationHumanize,
    auctionActive,

    owner,
    assetUrl,
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
      <div
        className={`${styles.priceTagWrapper} d-flex rounded-15 bg_light justify-content-between px-10`}
      >
        <div className={`${styles.head} card_head_text`}>
          <span className={cx('color_text', styles.headText)}>
            {auction && auctionActive ? <>Current Bid</> : ''}
            {auction && !auctionActive ? <>Closing Price</> : ''}
            {item.price && !auction && !auctionActive ? <>Price</> : ''}
            {!item.price && !auction ? <>Not for Sale</> : ''}
          </span>
        </div>

        {auction ? (
          <div className="d-flex space-x-5 align-items-center justify-content-center">
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
              )}{' '}
              {auction?.token?.symbol}
            </strong>
          </div>
        ) : (
          <div className="d-flex flex-column space-x-5 align-items-end justify-content-center px-10">
            {item.price ? (
              <>
                <strong className={cx(styles.tokenPrice, 'color_brand')}>
                  <img
                    src={getTokenByAddress(item?.paymentToken)?.icon}
                    className={`${styles.tokenIcon}`}
                  />{' '}
                  {item.price} {getTokenByAddress(item?.paymentToken)?.symbol}
                </strong>

                <div className={styles.dollar}>
                  =${formatNumber(item.priceInUSD.toFixed(2))}
                </div>
              </>
            ) : (
              <Link to={assetUrl} className="cursor-pointer color_brand">
               
                {item?.lastSalePrice > 0 && (
                  <>
                    <div className="d-flex justify-content-end align-items-center space-x-5">
                      <span className="txt_sm">Last Price</span>
                      <img
                        src={
                          getTokenByAddress(item?.lastSalePricePaymentToken)
                            ?.icon
                        }
                        alt=""
                        className={styles.tokenIcon}
                      />
                      <strong
                        className={cx(styles.tokenPrice, 'txt_sm color_brand')}
                      >
                        {formatNumber(item.lastSalePrice)}
                      </strong>
                    </div>
                    <div className={cx(styles.dollar,"d-flex justify-content-end")}>
                      =${formatNumber(item.lastSalePriceInUSD.toFixed(2))}
                    </div>
                  </>
                )}
                {!item?.lastSalePrice
                  ? owner &&
                    account &&
                    owner?.toLowerCase() === account?.toLowerCase()
                    ? 'Sell an Item'
                    : 'Make Offer'
                  : ''}
              </Link>
            )}
          </div>
        )}
      </div>

      
    </>
  );
}

const useStyle = makeStyles(() => ({
  priceTagWrapper: {
    height: '50px',
  },
  head: {
    width: 80,
    paddingRight: 10,
    borderRight: '1px solid #eee',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headText: {
    fontSize: 14,
    lineHeight: '18px',
    fontWeight: 600,
  },
  tokenIcon: {
    width: 20,
    height: 20,
    marginRight: '5px',
  },
  tokenPrice: {
    fontSize: 17,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  tokenSymbol: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dollar: {
    fontSize: 11,
    marginTop: '-5px',
  },
}));
