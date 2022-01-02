import React from 'react';

import { getRandomIPFS } from 'utils';

import { Link } from 'react-router-dom';

import { shortenAddress, formatNumber } from 'utils';
import { Categories } from 'constants/filter.constants';
export function NFTCollection(props) {
  const {
    isVerified,
    address,
    collectionName,
    name,
    owner,
    ownerAlias,
    logoImageHash,
    categories,
    item_count,
    owner_count,
  } = props.item;

  function addDefaultSrc(ev) {
    ev.target.src = '/notfound.png';
  }

  return (
    <div className="collections mb-30">
      <div className="d-flex flex-column collections_item">
        <div className="d-flex space-x-10">
          <div className="images-box">
            <Link to={`/collection/${address}`}>
              <img
                onError={addDefaultSrc}
                src={`${getRandomIPFS('', true)}${logoImageHash}`}
              />
            </Link>
          </div>
          <div className="detail">
            <Link to={`/collection/${address}`}>
              <h4 className="d-flex">
                {collectionName || name}{' '}
                {isVerified && (
                  <img
                    src="/verified.svg"
                    className="verified"
                    alt="verified"
                  />
                )}
              </h4>
            </Link>
            <div className="txt _bold color_light_grey">
              created by{' '}
              <Link to={`/account/${owner}`} className="color_brand owner">
                {ownerAlias[0] ? ownerAlias[0] : shortenAddress(owner)}
              </Link>
            </div>
            <div className="categories d-flex space-x-5 space-y-5 -ml-5">
              <div></div>
              {categories &&
                Categories &&
                Categories.map(v => {
                  if (categories.includes(v.id + '')) {
                    return (
                      <div className="txt_xs color_text px-3 py-1 bg_hard_light rounded-pill">
                        <Link to="#" className=" color_text">
                          {v.label}
                        </Link>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </div>
        <div className="d-flex mt-10 space-x-10 space-y-10 -ml-10 flex-wrap">
          <div></div>
          <div className="stat-card">
            <h2 className="color_brand">{formatNumber(item_count)}</h2>
            <span className="txt_xs color_text">items</span>
          </div>
          <div className="stat-card">
            <h2 className="color_brand">{formatNumber(owner_count)}</h2>
            <span className="txt_xs color_text">owners</span>
          </div>
        </div>
      </div>
    </div>
  );
}
