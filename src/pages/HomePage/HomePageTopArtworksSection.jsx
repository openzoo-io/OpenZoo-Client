import { FilterMenu } from 'components/FilterMenu';
import { AssetCard } from 'components/NFTAssetCard';
import React from 'react';

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

export function HomePageTopArtworksSection() {
  const handleFilterChange = values => {
    console.log('handleFilterChange', values);
    // TODO: filter NFT Asset
  };

  return (
    <div className="mt-100">
      <div className="container">
        <div className="section__head">
          <div
            className="d-flex
							flex-md-wrap
							justify-content-between
							align-items-center
							mb-20"
          >
            <h2 className="section__title">Top artworks</h2>
            <div className="dropdown">
              <button
                className="btn btn-dark btn-sm dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Recent Active
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </div>
          </div>
          <FilterMenu
            name="top-artworks"
            items={filterItems}
            onChange={handleFilterChange}
          />
        </div>
        {/* End header */}
        <div className="row">
          <div className="col-lg-4">
            <AssetCard preset="three" item={{}} />
          </div>
          <div className="col-lg-4">
            <AssetCard preset="five" item={{}} />
            <AssetCard preset="five" item={{}} />
            <AssetCard preset="five" item={{}} />
          </div>
          <div className="col-lg-4">
            <AssetCard preset="five" item={{}} />
            <AssetCard preset="five" item={{}} />
            <AssetCard preset="five" item={{}} />
          </div>
        </div>
      </div>
    </div>
  );
}
