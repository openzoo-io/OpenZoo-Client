import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { formatNumber } from 'utils';
// import { formatNumber } from 'utils';
import cx from 'classnames';
import { ArtworkMediaView } from 'components/ArtworkMedia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AssetCardFourPriceTag } from './AssetCardFourPriceTag';
import { useApi } from 'api';
import { ViewModule as ViewModuleIcon } from '@material-ui/icons';
import {
  faImage,
  faMusic,
  faVideo,
  faCubes,
  faGavel,
} from '@fortawesome/free-solid-svg-icons';
import { StackAvatars } from 'components/Avatar';
import { useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
const propTypes = {
  item: PropTypes.object.isRequired,
  info: PropTypes.object,
  liked: PropTypes.number,
  isLike: PropTypes.bool,
  loading: PropTypes.bool,
  style: PropTypes.object,
  onLike: PropTypes.func,
};

export function AssetCardFour(props) {
  const {
    loading,
    item,
    authToken,
    info,
    auction,
    auctionActive,
    liked,
    isLike,
    cardHeaderClassName,
  } = props;
  const { apiUrl } = useApi();
  const assetUrl = item
    ? `/collection/${item?.contractAddress}/${item?.tokenID}`
    : '#';

  const { collections } = useSelector(state => state.Collections);

  const collection = collections.find(
    col => col.address === item?.contractAddress
  );

  const [endAuctionIn, setEndAuctionIn] = useState();
  //console.log(item);
  useEffect(() => {
    if (auction?.endTime == null || !auction?.endTime || !auctionActive) {
      setEndAuctionIn(undefined);
      return;
    }

    const timer = setInterval(() => {
      const end = moment(auction?.endTime * 1000);
      const now = moment();
      var duration = moment.duration(end.diff(now));

      setEndAuctionIn({
        years: duration.years(),
        months: duration.months(),
        days: duration.days(),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
        humanize: duration.humanize(),
        humanizeSuffix: duration.humanize(true),
      });
    }, 1000);

    return () => {
      setEndAuctionIn(undefined);
      clearInterval(timer);
    };
  }, [auction?.endTime]);

  if (loading) {
    return (
      <div className="card__item four">
        <div className="card_body space-y-10">
          <div className="creators space-x-10">
            <Skeleton width="100%" height="100%" />
          </div>
          <div className="card_head">
            <Skeleton width="100%" height="100%" />
          </div>
          <div className="card_footer d-block space-y-10">
            <Skeleton width="100%" height={30} />
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card__root">
      <div className="card__item four">
        <div className="card_body space-y-10">
          <div className="creators space-x-10">
            <div className="avatars space-x-3">
              {item?.owner && (
                <StackAvatars
                  users={new Array(1).fill({
                    address: item?.owner,
                    alias:
                      item.ownerAlias && item.ownerAlias[0]
                        ? item.ownerAlias[0]
                        : null,
                    imageHash:
                      item.ownerAlias && item.ownerAlias[0]
                        ? item.ownerAlias[1]
                        : null,
                  })}
                />
              )}
              {item?.tokenType === 1155 && (
                <>
                  <div className="avatars -space-x-20">
                    <p className="avatars_name txt_sm d-flex align-items-center">
                      <ViewModuleIcon className="avatar avatar-sm"/> {formatNumber(item?.supply)} minted
                    </p>
                  </div>
                </>
              )}
            </div>
            <div
              className={`${authToken &&
                'cursor-pointer'} likes space-x-3 shadow-sm px-2 py-0.5 my-0.5 rounded-10`}
              onClick={authToken && props.onLike}
            >
              <i
                className={cx(
                  isLike ? 'ri-heart-3-fill' : 'ri-heart-3-line',
                  'color_red'
                )}
              ></i>
              <span className="txt_sm">{liked || item?.liked || 0}</span>
            </div>
          </div>
          <div className={cx('card_head', cardHeaderClassName)}>
            <Link to={assetUrl}>
              <ArtworkMediaView
                image={
                  (item?.thumbnailPath !== '-' &&
                    apiUrl + '/image/' + item?.thumbnailPath) ||
                  info?.image ||
                  item?.imageURL
                }
                alt=""
              />
            </Link>

            {endAuctionIn && (
              <div className="countdownWrapper space-x-3">
                {endAuctionIn?.humanize && (
                  <>
                    <div className="txt_xs">
                      <FontAwesomeIcon icon={faGavel} />{' '}
                      {endAuctionIn?.humanize} Left
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="cursor-pointer contentType space-x-3">
              {item?.contentType && item.contentType === 'image' && (
                <>
                  <FontAwesomeIcon icon={faImage} />
                </>
              )}
              {item?.contentType && item.contentType === 'video' && (
                <>
                  <FontAwesomeIcon icon={faVideo} />
                </>
              )}
              {item?.contentType && item.contentType === 'sound' && (
                <>
                  <FontAwesomeIcon icon={faMusic} />
                </>
              )}
              {item?.contentType && item.contentType === 'model' && (
                <>
                  <FontAwesomeIcon icon={faCubes} />
                </>
              )}
            </div>
          </div>

          <h6 className="card_title">
            <Link
              to={'/collection/' + item?.contractAddress}
              className={'card_subtitle'}
            >
              {collection?.collectionName || collection?.name}
              {collection?.isVerified && <img src="/verified.svg" />}
            </Link>
            <Link to={assetUrl} className={'color_black'}>
              {info?.name || item?.name}
            </Link>
          </h6>

          <AssetCardFourPriceTag
            loading={loading}
            auction={auction}
            item={item}
            //durationHumanize={endAuctionIn?.humanize}
            auctionActive={auctionActive}
            owner={item?.owner}
            assetUrl={assetUrl}
          />

          {/* <div className="card_footer d-block space-y-10">
          <div className="card_footer justify-content-between">
            <div className="creators">
              <p className="txt_sm"> 4 in stock</p>
            </div>
            <a href="#" className="">
              <p className="txt_sm">
                Price:{' '}
                <span className="color_green txt_sm">
                  {formatNumber(item?.price?.toFixed?.(2))}
                </span>
              </p>
            </a>
          </div>
          <div className="hr"></div>
          <div className="d-flex align-items-center space-x-10 justify-content-between">
            <div className="d-flex align-items-center space-x-10">
              <i className="ri-history-line"></i>
              <a href="#" data-toggle="modal" data-target="#popup_history">
                <p className="color_text txt_sm" style={{ width: 'auto' }}>
                  View History
                </p>
              </a>
            </div>
            <a
              className="btn btn-sm btn-primary"
              href="#"
              data-toggle="modal"
              data-target="#popup_bid"
            >
              Place Bid
            </a>
          </div>
        </div> */}
        </div>
      </div>
      {item.tokenType === 1155 && (
        <>
          <div className="card__item four"></div>
          <div className="card__item four"></div>
        </>
      )}
    </div>
  );
}

AssetCardFour.propTypes = propTypes;
