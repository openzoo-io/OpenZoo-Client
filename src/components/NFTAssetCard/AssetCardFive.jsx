import React from 'react';
import PropTypes from 'prop-types';

import ExampleImage from 'assets/imgs/exampleZooGenes.png';
import Skeleton from 'react-loading-skeleton';
import { Avatar } from 'components/Avatar';
import { Link } from 'react-router-dom';
import { formatNumber } from 'utils';
import { ArtworkMediaView } from 'components/ArtworkMedia';

const propTypes = {
  item: PropTypes.object.isRequired,
  info: PropTypes.object,
  liked: PropTypes.number,
  isLike: PropTypes.bool,
  loading: PropTypes.bool,
  style: PropTypes.object,
  onLike: PropTypes.func,
};

export function AssetCardFive(props) {
  const { item, info } = props;
  const assetUrl = item
    ? `/collection/${item?.contractAddress}/${item?.tokenID}`
    : '#';

  if (props.loading) {
    return (
      <div className="card__item five">
        <div className="card_body space-y-10 space-x-10 d-flex">
          <div className="card_head">
            <Skeleton width="100%" height="100%" />
          </div>
          <div className="d-flex flex-column justify-content-center w-100 space-y-10">
            <Skeleton width="100%" height={30} />
            <Skeleton width="100%" height={50} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card__item five">
      <div className="card_body space-y-10 space-x-10 d-flex">
        <div className="card_head">
          <Link to={assetUrl}>
            <ArtworkMediaView image={info?.image ?? item?.imageURL ?? ExampleImage} alt="" />
          </Link>
          <div className="details d-flex justify-content-between">
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: '80%' }}
                aria-valuenow="80"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center w-100 space-y-10">
          <h6>
            <Link to={assetUrl} className={'color_black'}>
              {info?.name ?? item?.name}
            </Link>
          </h6>
          <div className="hr"></div>
          <div className="card_footer d-block space-y-10">
            <Link to={assetUrl} className={'creators space-x-10'}>
              <div className="avatars">
                <Avatar size="sm" user={{}} />
              </div>
              <p className="avatars_name txt_sm">@krista_bryan... </p>
            </Link>
            <div className="d-flex align-items-center space-x-10 justify-content-between">
              <a
                className="btn btn-sm btn-primary"
                href="#"
                data-toggle="modal"
                data-target="#popup_bid"
              >
                Place Bid
              </a>
              <span className="color_green txt_sm text-right">
                {formatNumber(item?.price?.toFixed(2))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AssetCardFive.propTypes = propTypes;
