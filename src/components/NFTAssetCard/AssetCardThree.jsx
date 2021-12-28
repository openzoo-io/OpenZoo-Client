import React from 'react';
import PropTypes from 'prop-types';
import { StackAvatars } from 'components/Avatar/StackAvatars';
import { Link } from 'react-router-dom';
import { formatNumber } from 'utils';
import cx from 'classnames';
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

export function AssetCardThree(props) {
  const { item, info, liked, isLike } = props;
  const assetUrl = item
    ? `/collection/${item?.contractAddress}/${item?.tokenID}`
    : '#';

  return (
    <div className="card__item three">
      <div className="card_body space-y-10">
        <div className="card_head">
          <Link to={assetUrl}>
            <ArtworkMediaView image={info?.image || item?.imageURL} />
          </Link>

          <div
            className="cursor-pointer likes space-x-3"
            onClick={props.onLike}
          >
            <i
              className={cx(isLike ? 'ri-heart-3-fill' : 'ri-heart-3-line')}
            ></i>
            <span className="txt_sm">{liked || item?.liked || 0}</span>
          </div>
          <div className="action">
            <a
              href="#"
              className="btn btn-primary btn_card"
              data-toggle="modal"
              data-target="#popup_bid"
            >
              <i className="ri-pie-chart-line color_white"></i>
              Place Your Bid
            </a>
          </div>
        </div>
        <h6 className="card_title">
          <Link to={assetUrl} className="color_black">
            {info?.name || item?.name}
          </Link>
        </h6>

        <div className="card_footer d-block space-y-10">
          <div className="d-flex justify-content-between">
            <StackAvatars users={new Array(2).fill({})} />
            <a href="#" className="space-x-3">
              <span className="color_green txt_sm">
                {formatNumber(item?.price?.toFixed?.(2))}
              </span>
            </a>
          </div>
          <div className="hr"></div>
          <a href="#" className="d-flex align-items-center space-x-10">
            <i className="ri-vip-crown-line"></i>
            <p className="color_text txt_sm" style={{ width: 'auto' }}>
              Highest bid
            </p>
            <span className="color_black txt_sm">0.0022 WAN</span>
          </a>
        </div>
      </div>
    </div>
  );
}

AssetCardThree.propTypes = propTypes;
