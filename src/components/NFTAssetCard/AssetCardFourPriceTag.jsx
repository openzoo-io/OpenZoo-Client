import { makeStyles } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import wFTMLogo from 'assets/imgs/wftm.png';
import cx from 'classnames';
import useTokens from 'hooks/useTokens';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatNumber } from 'utils';

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
  const { currentPrice } = useSelector(state => state.CoinGecko);

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
          <div className="d-flex flex-column space-x-5 align-items-end justify-content-center px-10">

            <strong className={cx(styles.tokenPrice, 'color_brand')}>
              <img
                src={
                  auctionActive
                    ? auction?.token?.icon
                    : getTokenByAddress(item?.paymentToken)?.icon || wFTMLogo
                }
                alt={auction?.token?.symbol}
                className={styles.tokenIcon}
              />
              {formatNumber(
                (parseFloat(auction.highestBid.toString()) / 1e18).toFixed(2).replace(/[.,]00$/, "")
              )}{' '}
              {auction?.token?.symbol}
            </strong>
            <div className={styles.dollar}>
              {
                auctionActive ? 'Reserved price ' + formatNumber(auction.reservePrice.toFixed(2).replace(/[.,]00$/, "")) + ' ' + auction?.token?.symbol : ''
              }{' '}
            </div>
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

                {
                  currentPrice != null && currentPrice > 0 ?
                    <div className={styles.dollar}>
                      =${formatNumber((item.price * currentPrice).toFixed(2).replace(/[.,]00$/, ""))}
                    </div> :
                    <></>
                }
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
                        {formatNumber(item.lastSalePrice.toFixed(2).replace(/[.,]00$/, ""))}
                      </strong>
                    </div>

                    <div className={cx(styles.dollar, "d-flex justify-content-end")}>
                      =${formatNumber(item.lastSalePriceInUSD.toFixed(2).replace(/[.,]00$/, ""))}
                    </div> :
                    <></>

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
    marginTop: '-2px',
  },
}));
