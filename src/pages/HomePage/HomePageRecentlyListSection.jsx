import { FilterMenu } from 'components/FilterMenu';
import { AssetCard } from 'components/NFTAssetCard';
import React from 'react';
import { Link } from 'react-router-dom';

const filterItems = [
  {
    label: 'Has list price',
    value: 'has-list-price',
  },
  {
    label: 'Has open offer',
    value: 'has-open-offer',
  },
  {
    label: 'Has sold',
    value: 'has-sold',
  },
];

export function HomePageRecentlyListSection() {
  const handleFilterChange = values => {
    console.log('handleFilterChange', values);
    // TODO: filter NFT Asset
  };

  return (
    <div className="section mt-100">
      <div className="container">
        <div className="section__head">
          <div className="d-flex justify-content-between sm-column align-items-center mb-20">
            <h2 className="section__title"> Recently Listed</h2>
            <Link to="/explore" className="btn btn-dark btn-sm">
              View All
            </Link>
          </div>
          <FilterMenu
            name="recently-list"
            items={filterItems}
            onChange={handleFilterChange}
          />
        </div>
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <AssetCard preset="four" item={{}} />
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <AssetCard preset="four" item={{}} />
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <AssetCard preset="four" item={{}} />
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <AssetCard preset="four" item={{}} />
          </div>
        </div>
      </div>
    </div>
  );
}
