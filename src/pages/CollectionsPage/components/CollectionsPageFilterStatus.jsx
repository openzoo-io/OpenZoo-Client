//import { FilterMenu } from 'components/FilterMenu';
import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton } from 'components/DropdownButton/DropdownButton';
//import { useState } from 'react';

/*
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
*/
const sortByItems = [
  // {
  //   id: '',
  //   label: 'Order by',
  // },
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'item',
    label: 'Item numbers',
  },
  {
    id: 'popularity',
    label: 'Popularity',
  },
  {
    id: 'owner',
    label: 'Number of owners',
  },
  {
    id: 'created',
    label: 'Date created',
  },
];

const propTypes = {
  onFilterChange: PropTypes.func,
  onCategorySortChange: PropTypes.func,
};

export function CollectionsPageFilterStatus(props) {
  //const [categorySortedBy, setCategorySortedBy] = useState(categorySortByItems[0]);

/*
  const handleOnFilterChange = values => {
    console.log(values);
    props.onFilterChange?.(values);
  };

  
  const handleCategoryOnSelectSortBy = value => {
    setCategorySortedBy(value);
    props.onCategorySortChange?.(value);
  };
*/
  const handleOnSelectSortBy = value => {
    props.setSortedBy(value);
  };

  return (
    <div className="row justify-content-between align-items-center">
      <div className="col-lg-auto"></div>
      {/*
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
      */}
      {
        <div className="col-lg-auto">
        <div className="d-flex space-x-10 align-items-center sm:mt-20">
          {/*
          <DropdownButton
            value={categorySortedBy?.id}
            items={categorySortByItems}
            onClickItem={handleCategoryOnSelectSortBy}
          />*/
        }

          <DropdownButton
            value={props.sortedBy?.id}
            items={sortByItems}
            onClickItem={handleOnSelectSortBy}
          />
        </div>
      </div>
      }
    </div>
  );
}

CollectionsPageFilterStatus.propTypes = propTypes;
