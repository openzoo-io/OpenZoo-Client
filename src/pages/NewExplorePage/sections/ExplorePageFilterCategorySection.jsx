import React from 'react';
import PropTypes from 'prop-types';
import { Categories } from 'constants/filter.constants';
import { useDispatch, useSelector } from 'react-redux';
import FilterActions from 'actions/filter.actions';
import { makeStyles } from '@material-ui/styles';
import cx from 'classnames';

const propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
};

export function ExplorePageFilterCategorySection() {
  const dispatch = useDispatch();
  const { category } = useSelector(state => state.Filter);

  const classes = useStyles();

  const handleSelectCategory = categoryId => {
    dispatch(
      FilterActions.updateCategoryFilter(
        category === categoryId ? null : categoryId
      )
    );
  };

  return (
    <div className="bg_white border-b py-20">
      <div className="container">
        <div className="d-flex justify-content-center">
          <ul
            className={cx(
              'menu_categories space-x-20 md:space-y-10',
              classes.menuWrapper
            )}
          >
            <li
              className={cx(classes.filterItem, 'space-x-3')}
              onClick={() => handleSelectCategory(null)}
            >
              <span
                className={cx(category === null && classes.filterItemActive)}
              >
                All
              </span>
            </li>
            {Categories.map(item => (
              <li
                key={`explore-filter-category-item-${item.id}`}
                className={cx(classes.filterItem, 'space-x-3')}
                onClick={() => handleSelectCategory(item.id)}
              >
                <img width={25} height={25} src={item.icon} />
                <span
                  className={cx(
                    category === item.id && classes.filterItemActive
                  )}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

ExplorePageFilterCategorySection.propTypes = propTypes;

const useStyles = makeStyles(() => ({
  menuWrapper: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterItem: {
    cursor: 'pointer',
    justifyContent: 'center',
  },
  filterItemActive: {
    fontWeight: 'bold',
  },
}));
