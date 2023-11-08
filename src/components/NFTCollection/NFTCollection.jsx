import React from 'react';

import { getRandomIPFS } from 'utils';

import { Link } from 'react-router-dom';

import { shortenAddress, formatNumber, formatUSD } from 'utils';
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
    floor_price,
    traded_volume,
    collectionType,
    isSticky,
  } = props.item;

  function addDefaultSrc(ev) {
    ev.target.src = '/notfound.png';
  }

  return (
    <div className="collections mb-30">
      <div className="d-flex flex-column collections_item">
        <div className="d-flex space-x-10">
          <div className="images-box" style={props?.minimal?{width:100,height:100}:{}}>
            <Link to={`/collection/${address}`} onClick={() => {
                // Delete //
                window.localStorage.removeItem('collection_tokens');
                window.localStorage.removeItem('collection_count');
                window.localStorage.removeItem('collection_from');
                window.localStorage.removeItem('collection_to');
                window.localStorage.removeItem('collection_fromTop');
              }}>
              <img
                onError={addDefaultSrc}
                src={`${getRandomIPFS('', true)}${logoImageHash}`}
              />
            </Link>
          </div>
          <div className="detail">
            <Link
              to={`/collection/${address}`}
              onClick={() => {
                // Delete //
                window.localStorage.removeItem('collection_tokens');
                window.localStorage.removeItem('collection_count');
                window.localStorage.removeItem('collection_from');
                window.localStorage.removeItem('collection_to');
                window.localStorage.removeItem('collection_fromTop');
              }}
            >
              <h4 className="d-flex">
                {collectionName || name}{' '}
                {isVerified && (
                  <img
                    src="https://assets.openzoo.io/verified.svg"
                    className="verified"
                    alt="verified"
                  />
                )}
              </h4>
            </Link>
            <div className="txt _bold color_light_grey">
              created by{' '}
              <Link to={`/account/${owner}`} className="color_brand owner">
                {ownerAlias ? ownerAlias[0] : shortenAddress(owner)}
              </Link>
            </div>
            <div className="categories d-flex space-x-5 space-y-5 -ml-5">
              <div></div>
              {collectionType[0] && collectionType[0].tokenType === 721 ? (
                <div className="txt_xs color_text px-3 py-1 bg_hard_light rounded-pill">
                  SINGLE TOKEN 721
                </div>
              ) : (
                <div className="txt_xs color_text px-3 py-1 bg_hard_light rounded-pill">
                  {collectionType[0]
                    ? 'MULTI TOKEN 1155'
                    : 'UNDEFINED TOKEN TYPE'}
                </div>
              )}
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
        {
        !props?.minimal && <div className="d-flex mt-10 space-x-10 space-y-10 -ml-10 flex-wrap">
          <div></div>
          <div className="stat-card">
            <h2 className="color_brand">{formatNumber(item_count)}</h2>
            <span className="txt_xs color_text">items</span>
          </div>
          <div className="stat-card">
            <h2 className="color_brand">{formatNumber(owner_count)}</h2>
            <span className="txt_xs color_text">owners</span>
          </div>
          <div className="stat-card">
            <h2 className="color_brand">{formatUSD(floor_price, 2)}</h2>
            <span className="txt_xs color_text">floor price</span>
          </div>
          <div className="stat-card">
            <h2 className="color_brand">{formatUSD(traded_volume, 2)}</h2>
            <span className="txt_xs color_text">volume traded</span>
          </div>
        </div>
        }
      </div>
    </div>
  );
}
