import { FilterMenu } from 'components/FilterMenu';
import { useState, useEffect, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useApi } from 'api';
import { useParams } from 'react-router-dom';
import FilterActions from 'actions/filter.actions';
import PropTypes from 'prop-types';
import { /*GroupFilters,*/ SortByOptions } from 'constants/filter.constants';
import { DropdownButton } from 'components/DropdownButton/DropdownButton';
import FilterList from '@material-ui/icons/FilterListSharp';
import { FilterCollectionAttributes } from 'components/FilterCollectionAttributes/FilterCollectionAttributes';

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
  const { isAttributeFilterAvailable } = useApi();
  const { addr } = useParams();
  const [showAttributeFilter, setShowAttributeFilter] = useState(false);
  const [enableAttributeFilter, setEnableAttributeFilter] = useState(false);

  useEffect(() => {
    isAttributeFilterAvailable(addr).then(setEnableAttributeFilter);
  },[]);

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

  const toggleAttributeFilter = () =>
    setShowAttributeFilter(!showAttributeFilter);

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
    
    // Delete //
    window.localStorage.removeItem('collection_tokens');
    window.localStorage.removeItem('collection_count');
    window.localStorage.removeItem('collection_from');
    window.localStorage.removeItem('collection_to');
    window.localStorage.removeItem('collection_fromTop');

  };

  /*
  const handleOnClickGroupFilter = item => {
    dispatch(FilterActions.updateGroupTypeFilter(item.id));
  };
*/
  const handleOnClickSortBy = item => {
    dispatch(FilterActions.updateSortByFilter(item.id));
        // Delete //
        window.localStorage.removeItem('collection_tokens');
        window.localStorage.removeItem('collection_count');
        window.localStorage.removeItem('collection_from');
        window.localStorage.removeItem('collection_to');
        window.localStorage.removeItem('collection_fromTop');
  };

  return (
    <div>
      <div className="row justify-content-between align-items-center">
        <div className="col-lg-auto">
          <FilterMenu
            name="explore-filter-status"
            items={filterStatusItems}
            values={selectedValues}
            className={'align-items-center'}
            multiple={false}
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
            <div>
              <button
                className={`btn btn-sm btn-white ${enableAttributeFilter ? '' : 'disabled'}`}
                onClick={toggleAttributeFilter}
                endIcon={<FilterList />}
                disabled={!enableAttributeFilter}
              >
                Attribute Filter <FilterList />
              </button>
            </div>
            <DropdownButton
              key="sort-by-dropdown-menu"
              value={sortBy}
              items={SortByOptions}
              onClickItem={handleOnClickSortBy}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <FilterCollectionAttributes
          hidden={!showAttributeFilter}
          hideFunction={() => setShowAttributeFilter(false)}
          toggleAttributeButton={setEnableAttributeFilter}
          attributes={props.attributes}
        />
      </div>
    </div>
  );
}

ExplorePageFillterStatus.propTypes = propTypes;
