import { FilterMenu } from 'components/FilterMenu';
import React from 'react';
import PropTypes from 'prop-types';

const filterStatusItems = [
  {
    value: 'statusBuyNow',
    label: 'Buy Now',
  },
  {
    value: 'statusHasBids',
    label: 'Has Bids',
  },
  {
    value: 'statusHasOffers',
    label: 'Has Offers',
  },
  {
    value: 'statusOnAuction',
    label: 'On Auction',
  },
];

const propTypes = {
  onChange: PropTypes.func,
};

export function ExplorePageCollectionFilterStatus(props) {
  const handleOnChange = values => {
    props.onChange?.(values);
  };

  return (
    <div className="row justify-content-between align-items-center">
      <div className="col-lg-auto">
        <FilterMenu
          name="explore-collection-filter-status"
          items={filterStatusItems}
          className={'align-items-center'}
          onChange={handleOnChange}
        />
      </div>
      <div className="col-lg-auto">
        <div className="d-flex space-x-10 align-items-center sm:mt-20">
          <span className="color_text txt_sm"> SORT BY: </span>
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
      </div>
    </div>
  );
}

ExplorePageCollectionFilterStatus.propTypes = propTypes;
