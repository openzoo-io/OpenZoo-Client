import { FilterMenu } from 'components/FilterMenu';
import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton } from 'components/DropdownButton/DropdownButton';
import { useState } from 'react';

const filterStatusItems = [
  {
    value: 'onlyVerified',
    label: 'SHOW ONLY VERIFIED',
  },
];

const categorySortByItems = [
  {
    id: '',
    label: 'CATEGORY',
  },
  {
    id: 'name',
    label: 'CATEGORY NAME',
  },
  {
    id: 'category2',
    label: 'CATEGORY 2',
  },
  {
    id: 'category3',
    label: 'CATEGORY 3',
  },
];

const sortByItems = [
  {
    id: '',
    label: 'Order by',
  },
  {
    id: 'price',
    label: 'PRICE',
  },
  {
    id: 'order2',
    label: 'Order 2',
  },
  {
    id: 'order3',
    label: 'Order 3',
  },
];

const propTypes = {
  onFilterChange: PropTypes.func,
  onCategorySortChange: PropTypes.func,
};

export function CollectionsPageFilterStatus(props) {
  const [categorySortedBy, setCategorySortedBy] = useState(categorySortByItems[0]);
  const [sortedBy, setSortedBy] = useState(sortByItems[0]);

  const handleOnFilterChange = values => {
    console.log(values);
    props.onFilterChange?.(values);
  };

  const handleCategoryOnSelectSortBy = value => {
    setCategorySortedBy(value);
    props.onCategorySortChange?.(value);
  };

  const handleOnSelectSortBy = value => {
    setSortedBy(value);
  };

  return (
    <div className="row justify-content-between align-items-center">
      <div className="col-lg-auto">
        <FilterMenu
          title=""
          //values={'onlyVerified'}
          name="explore-collection-filter-status"
          items={filterStatusItems}
          className={'align-items-center'}
          onChange={handleOnFilterChange}
        />
      </div>
      {
      false && <div className="col-lg-auto">
        <div className="d-flex space-x-10 align-items-center sm:mt-20">
          <DropdownButton
            value={categorySortedBy?.id}
            items={categorySortByItems}
            onClick={handleCategoryOnSelectSortBy}
          />

          <DropdownButton
            value={sortedBy?.id}
            items={sortByItems}
            onClick={handleOnSelectSortBy}
          />
        </div>
      </div>
      }
    </div>
  );
}

CollectionsPageFilterStatus.propTypes = propTypes;
