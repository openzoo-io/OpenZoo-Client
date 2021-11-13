import { FilterMenu } from 'components/FilterMenu';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterActions from 'actions/filter.actions';
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

export function ExplorePageFillterStatus(props) {
  const dispatch = useDispatch();

  const filter = useSelector(state => state.Filter);
  const {
    statusBuyNow,
    statusHasBids,
    statusHasOffers,
    statusOnAuction,
  } = filter;
  const selectedValues = Object.keys(filter).filter(k => filter[k] === true);

  const updateStatusFilter = (field, selected) => {
    dispatch(FilterActions.updateStatusFilter(field, selected));
  };

  const handleOnChange = values => {
    const _buyNow = values.includes('statusBuyNow');
    const _hasBids = values.includes('statusHasBids');
    const _hasOffers = values.includes('statusHasOffers');
    const _onAuction = values.includes('statusOnAuction');

    if (_buyNow !== statusBuyNow) {
      updateStatusFilter('statusBuyNow', _buyNow);
    }
    if (_hasBids !== statusHasBids) {
      updateStatusFilter('statusHasBids', _hasBids);
    }
    if (_hasOffers !== statusHasOffers) {
      updateStatusFilter('statusHasOffers', _hasOffers);
    }
    if (_onAuction !== statusOnAuction) {
      updateStatusFilter('statusOnAuction', _onAuction);
    }
    props.onChange?.(values);
  };

  return (
    <div className="row justify-content-between align-items-center">
      <div className="col-lg-auto">
        <FilterMenu
          name="explore-filter-status"
          items={filterStatusItems}
          values={selectedValues}
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

ExplorePageFillterStatus.propTypes = propTypes;
