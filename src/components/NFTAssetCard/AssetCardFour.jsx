import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { formatNumber, getEmbedParams } from 'utils';
//import warned from 'constants/warned.collections';
import BootstrapTooltip from 'components/BootstrapTooltip';
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
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { StackAvatars } from 'components/Avatar';
import { useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getRandomIPFS } from 'utils';
const propTypes = {
  item: PropTypes.object.isRequired,
  warnedCollections: PropTypes.array,
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
    warnedCollections,
    authToken,
    info,
    auction,
    auctionActive,
    liked,
    isLike,
    cardHeaderClassName,
    zooGeneClass,
    zooElixir,
    auctionOwnerInfo,
  } = props;
  const { apiUrl } = useApi();
  const assetUrl = item
    ? `/collection/${item?.contractAddress}/${item?.tokenID}${
        getEmbedParams().isEmbed ? window.location.search : ''
      }`
    : '#';

  const { collections } = useSelector(state => state.Collections);

  const collection = collections.find(
    col => col.address === item?.contractAddress
  );
  console.log('collection', collection);
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

  const getZooElixirClass = elixir => {
    switch (elixir) {
      case '1':
        return <img src="/ZooBooster/class/N.png" />;
      case '2':
        return <img src="/ZooBooster/class/R.png" />;
      case '3':
        return <img src="/ZooBooster/class/SR.png" />;
      case '4':
        return <img src="/ZooBooster/class/SSR.png" />;
      case '5':
        return <img src="/ZooBooster/class/UR.png" />;
    }
  };

  // Elixir Images //
  const numberToColor = (number, diff = 0) => {
    return '#' + ((number % 16777215) + diff).toString(16).padStart(6, '0');
  };
  const elixirIMG = (bottle_type_id, filled_drop, drop_color) => {
    bottle_type_id = parseInt(bottle_type_id) + 1;
    filled_drop = Number(filled_drop);

    if (filled_drop > 100) filled_drop = 100;

    return (
      <div className="elixir">
        <img className="bottle" src={`/elixir_sets/${bottle_type_id}e.png`} />
        <div
          className="fill"
          style={{
            background:
              'linear-gradient(0deg, ' +
              drop_color +
              ' ' +
              ((filled_drop * 75) / 100).toFixed(2) +
              '%, rgba(255, 255, 255, 0) 0%)',
            WebkitMaskImage: `url(/elixir_sets/${bottle_type_id}bg.png)`,
            MaskImage: `url(/elixir_sets/${bottle_type_id}bg.png)`,
          }}
        ></div>
        <img
          className="bottle_bg"
          src={`/elixir_sets/${bottle_type_id}bg.png`}
        />
      </div>
    );
  };

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
              {item?.tokenType === 721 && item?.owner && auction === null && (
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
              {item?.tokenType === 721 && auction !== null && (
                <StackAvatars
                  users={new Array(1).fill({
                    address: auction?.owner,
                    alias: auctionOwnerInfo?.alias,
                    imageHash: auctionOwnerInfo?.imageHash,
                  })}
                />
              )}
              {item?.tokenType === 1155 && (
                <>
                  <div className="avatars -space-x-20">
                    <p className="avatars_name txt_sm d-flex align-items-center">
                      <ViewModuleIcon className="avatar avatar-sm" />{' '}
                      {formatNumber(item?.supply)} minted
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
            <img
              className="blur_thumb"
              src={
                (item?.thumbnailPath !== '-' &&
                  item?.thumbnailPath !== '.' &&
                  apiUrl + '/image/' + item?.thumbnailPath) ||
                getRandomIPFS(info?.image) ||
                getRandomIPFS(item?.imageURL)
              }
            />
            {!zooElixir && (
              <Link
                to={assetUrl}
                onClick={() => {
                  if (window.location.href.includes('explore')) {
                    window.localStorage.setItem(
                      'fromTop',
                      document.documentElement.scrollTop
                    );
                  }
                  if (window.location.href.includes('collection')) {
                    window.localStorage.setItem(
                      'collection_fromTop',
                      document.documentElement.scrollTop
                    );
                  }
                }}
              >
                <ArtworkMediaView
                  image={
                    (item?.thumbnailPath !== '-' &&
                      item?.thumbnailPath !== '.' &&
                      apiUrl + '/image/' + item?.thumbnailPath) ||
                    getRandomIPFS(info?.image) ||
                    getRandomIPFS(item?.imageURL)
                  }
                  alt=""
                />
              </Link>
            )}

            {zooElixir && (
              <Link
                to={assetUrl}
                onClick={() => {
                  if (window.location.href.includes('explore')) {
                    window.localStorage.setItem(
                      'fromTop',
                      document.documentElement.scrollTop
                    );
                  }
                  if (window.location.href.includes('collection')) {
                    window.localStorage.setItem(
                      'collection_fromTop',
                      document.documentElement.scrollTop
                    );
                  }
                }}
              >
                {elixirIMG(
                  zooElixir.shape,
                  Number(zooElixir.drops) / 1e18,
                  numberToColor(zooElixir.color)
                )}
              </Link>
            )}
            {zooGeneClass && (
              <div className="cardZooGeneClass">
                <img src={`/ZooBooster/class/${zooGeneClass}.png`} />
              </div>
            )}
            {zooElixir && (
              <>
                <div className="cardZooGeneClass">
                  {getZooElixirClass(zooElixir?.level?.toString())}
                </div>
                <div className="cardZooElixirFilled">
                  {(Number(zooElixir?.drops?.toString()) / 1e18).toFixed(2)}%
                </div>
              </>
            )}
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

            {!endAuctionIn && auction?.endTime && (
              <div className="countdownWrapper space-x-3">
                <div className="txt_xs">
                  <FontAwesomeIcon icon={faGavel} /> Expired
                </div>
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
              onClick={() => {
                if (window.location.href.includes('explore')) {
                  window.localStorage.setItem(
                    'fromTop',
                    document.documentElement.scrollTop
                  );
                }
                if (window.location.href.includes('collection')) {
                  window.localStorage.setItem(
                    'collection_fromTop',
                    document.documentElement.scrollTop
                  );
                }
              }}
            >
              {collection?.collectionName || collection?.name}

              {collection?.isVerified && (
                <img src="https://assets.openzoo.io/verified.svg" />
              )}
              {warnedCollections &&
              warnedCollections.includes(item?.contractAddress) ? (
                <BootstrapTooltip
                  title="Warning: This content has been flagged by the OpenZoo Team as suspicious."
                  placement="top"
                >
                  <a className="text-danger">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                  </a>
                </BootstrapTooltip>
              ) : (
                ''
              )}
            </Link>
            <Link
              to={assetUrl}
              className={'color_black'}
              onClick={() => {
                if (window.location.href.includes('explore')) {
                  window.localStorage.setItem(
                    'fromTop',
                    document.documentElement.scrollTop
                  );
                }
                if (window.location.href.includes('collection')) {
                  window.localStorage.setItem(
                    'collection_fromTop',
                    document.documentElement.scrollTop
                  );
                }
              }}
            >
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
