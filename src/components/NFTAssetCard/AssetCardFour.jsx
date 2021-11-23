import { Avatar } from 'components/Avatar';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { formatNumber } from 'utils';
import { ArtworkMediaView } from 'components/ArtworkMedia';

const propTypes = {
  item: PropTypes.object.isRequired,
  loading: PropTypes.object,
  style: PropTypes.object,
  onLike: PropTypes.func,
};

export function AssetCardFour(props) {
  const { item } = props;
  const assetUrl = item
    ? `/explore/${item?.contractAddress}/${item?.tokenID}`
    : '#';

  if (props.loading) {
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
    <div className="card__item four">
      <div className="card_body space-y-10">
        <div className="creators space-x-10">
          <div className="avatars space-x-3">
            <Link to="/account/0x35b0b5c350b62ddee9be102b7567c4dabe52cf4f">
              <Avatar size="sm" user={{}} />
            </Link>
            <Link to="/account/0x35b0b5c350b62ddee9be102b7567c4dabe52cf4f/36">
              <p className="avatars_name txt_xs">@mickel_fenn</p>
            </Link>
          </div>
          <div className="avatars space-x-3">
            <Link to="/account/0x35b0b5c350b62ddee9be102b7567c4dabe52cf4f/36">
              <Avatar size="sm" user={{}} />
            </Link>
            <Link to="/account/0x35b0b5c350b62ddee9be102b7567c4dabe52cf4f/36">
              <p className="avatars_name txt_xs">@mickel_fenn</p>
            </Link>
          </div>
        </div>
        <div className="card_head">
          <Link to={assetUrl}>
            <ArtworkMediaView image={item?.imageURL} alt="" />
          </Link>

          <div
            className="cursor-pointer likes space-x-3"
            onClick={props.onLike}
          >
            <i className="ri-heart-3-fill"></i>
            <span className="txt_sm">{item?.liked ?? 0}</span>
          </div>
        </div>

        <h6 className="card_title">
          <Link to={assetUrl} className={'color_black'}>
            {item?.name}
          </Link>
        </h6>

        <div className="card_footer d-block space-y-10">
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
        </div>
      </div>
    </div>
  );
}

AssetCardFour.propTypes = propTypes;
