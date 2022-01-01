import React, { useState, useEffect } from 'react';

import { getRandomIPFS } from 'utils';
// import { Avatar } from 'components/Avatar';
import { Link } from 'react-router-dom';
import { useApi } from 'api';
import { shortenAddress,formatNumber } from 'utils';
import { Categories } from 'constants/filter.constants';
export function NFTCollection(props) {
  const { isVerified, address, collectionName, name } = props.item;
  const { fetchCollection, fetchCollectionStatistic } = useApi();
  const [collectionData, setCollectionData] = useState({});
  const [collectionStatisticData, setCollectionStatisticData] = useState({});
  useEffect(() => {
    getCollection();
  }, []);
  function addDefaultSrc(ev) {
    ev.target.src = '/notfound.png';
  }

  const getCollection = async () => {
    let cRes = await fetchCollection(address);
    setCollectionData(cRes.data);

    let statisticRes = await fetchCollectionStatistic(address);
    setCollectionStatisticData(statisticRes.data);
  };

  return (
    <div className="collections mb-30">
      {isVerified && (
        <img src="/verified.svg" className="verified" alt="verified" />
      )}
      <div className="d-flex space-x-10 collections_item">
        <div className="images-box">
          <Link to={`/collection/${address}`}>
            <img
              onError={addDefaultSrc}
              src={`${getRandomIPFS('', true)}${collectionData?.logoImageHash}`}
            />
          </Link>
        </div>
        <div className="detail">
          <Link to={`/collection/${address}`}>
            <h3>{collectionName || name}</h3>
          </Link>
          <div className="txt _bold color_light_grey">
            created by{' '}
            <Link to="#" className="color_brand owner">
              {shortenAddress(collectionData?.owner)}
            </Link>
          </div>
          <div className="categories d-flex space-x-5 space-y-5 -ml-5">
            <div></div>
            {collectionData.categories &&
              Categories &&
              Categories.map(v => {
                if (collectionData.categories.includes(v.id + '')) {
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
          <div className="d-flex mt-10 space-x-10 space-y-10 -ml-10 flex-wrap">
            <div></div>
            <div className="stat-card shadow-sm">
              <h2 className="color_brand">
                {collectionStatisticData.countNFT
                  ? formatNumber(collectionStatisticData.countNFT)
                  : 'N/A'}
              </h2>
              <span className="txt_xs color_text">items</span>
            </div>
            <div className="stat-card shadow-sm">
              <h2 className="color_brand">
                {collectionStatisticData.countOwner
                  ? formatNumber(collectionStatisticData.countOwner)
                  : 'N/A'}
              </h2>
              <span className="txt_xs color_text">owners</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
