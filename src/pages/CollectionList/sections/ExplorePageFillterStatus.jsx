import { FilterMenu } from 'components/FilterMenu';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterActions from 'actions/filter.actions';
import PropTypes from 'prop-types';
import { /*GroupFilters,*/ SortByOptions } from 'constants/filter.constants';
import { DropdownButton } from 'components/DropdownButton/DropdownButton';

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
    //groupType,
    sortBy,
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

  /*
  const handleOnClickGroupFilter = item => {
    dispatch(FilterActions.updateGroupTypeFilter(item.id));
  };
*/
  const handleOnClickSortBy = item => {
    dispatch(FilterActions.updateSortByFilter(item.id));
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
          {/*
          <DropdownButton
            key="group-by-dropdown-menu"
            value={groupType}
            items={GroupFilters.map(v => ({ id: v.value, label: v.label }))}
            onClickItem={handleOnClickGroupFilter}
          />
          */}
          <DropdownButton
            key="sort-by-dropdown-menu"
            value={sortBy}
            items={SortByOptions}
            onClickItem={handleOnClickSortBy}
          />
        </div>
      </div>
    </div>
  );
}

ExplorePageFillterStatus.propTypes = propTypes;
