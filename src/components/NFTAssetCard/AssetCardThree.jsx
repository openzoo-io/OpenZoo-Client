import React from 'react';
import PropTypes from 'prop-types';
import { StackAvatars } from 'components/Avatar/StackAvatars';
import ExampleImage from 'assets/imgs/exampleZooGenes.png';
import { Link } from 'react-router-dom';

const propTypes = {
  item: PropTypes.object.isRequired,
  loading: PropTypes.object,
  style: PropTypes.object,
  onLike: PropTypes.func,
};

export function AssetCardThree() {
  const assetUrl = '/explore/0x35b0b5c350b62ddee9be102b7567c4dabe52cf4f/36';

  return (
    <div className="card__item three">
      <div className="card_body space-y-10">
        <div className="card_head">
          <Link to={assetUrl}>
            <img src={ExampleImage} alt="..." />
          </Link>

          <a href="#" className="likes space-x-3">
            <i className="ri-heart-3-fill"></i>
            <span className="txt_sm">23.1k</span>
          </a>
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
            Colorful Abstract Painting
          </Link>
        </h6>

        <div className="card_footer d-block space-y-10">
          <div className="d-flex justify-content-between">
            <StackAvatars users={new Array(2).fill({})} />
            <a href="#" className="space-x-3">
              <span className="color_green txt_sm">0.001 ETH</span>
            </a>
          </div>
          <div className="hr"></div>
          <a href="#" className="d-flex align-items-center space-x-10">
            <i className="ri-vip-crown-line"></i>
            <p className="color_text txt_sm" style={{ width: 'auto' }}>
              Highest bid
            </p>
            <span className="color_black txt_sm">0.0022 ETH</span>
          </a>
        </div>
      </div>
    </div>
  );
}

AssetCardThree.propTypes = propTypes;
