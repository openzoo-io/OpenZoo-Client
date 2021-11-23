import React from 'react';
import PropTypes from 'prop-types';

import { StackAvatars } from 'components/Avatar';
import faker from 'faker';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { formatNumber } from 'utils';
import { ArtworkMediaView } from 'components/ArtworkMedia';

const propTypes = {
  item: PropTypes.object.isRequired,
  loading: PropTypes.object,
  style: PropTypes.object,
  onLike: PropTypes.func,
};

export function AssetCardTwo(props) {
  const { item } = props;
  const assetUrl = item
    ? `/explore/${item?.contractAddress}/${item?.tokenID}`
    : '#';

  if (props.loading) {
    return (
      <div className="card__item two">
        <div className="card_body space-y-10">
          <div className="card_head">
            <Skeleton width="100%" height="100%" />
          </div>
          <Skeleton width="100%" height={30} />
          <Skeleton width="100%" height={50} />
        </div>
      </div>
    );
  }

  return (
    <div className="card__item two">
      <div className="card_body space-y-10">
        <div className="card_head">
          <Link to={assetUrl}>
            <ArtworkMediaView image={item?.imageURL} alt="" />
          </Link>
          <div className="block_timer">
            <div className="d-flex justify-content-center align-items-center">
              <div className="item">
                <div className="number txt hours">
                  23<span></span>
                </div>
              </div>
              <div className="dots">:</div>
              <div className="item">
                <div className="number txt minutes">
                  53<span></span>
                </div>
              </div>
              <div className="dots">:</div>
              <div className="item">
                <div className="number txt seconds">
                  23<span></span>
                </div>
              </div>
            </div>
          </div>
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
        <h6 className="card_title">
          <Link className="color_black" to={assetUrl}>
            {item?.name}
          </Link>
        </h6>
        <div className="hr"></div>
        <div className="card_footer justify-content-between">
          {/* TODO: define users */}
          <StackAvatars
            users={new Array(2).fill({ alias: faker.name.findName() })}
          />
          <a href="#" className="space-x-3">
            <p className="color_green txt_sm">
              {formatNumber(item?.price?.toFixed?.(2))}
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

AssetCardTwo.propTypes = propTypes;
