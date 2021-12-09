import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const TabListItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(TabListItemShape)).isRequired,
  activeId: PropTypes.string,
  className: PropTypes.string,
  tabClassName: PropTypes.string,
  onChangeTab: PropTypes.func,
};

const TabListComponent = props => {
  const activeId =
    props.activeId ?? (props.items.length > 0 ? props.items[0].id : null);

  const handleChangeTab = item => () => {
    props.onChangeTab?.(item.id);
  };

  return (
    <>
      <div className={cx('d-flex justify-content-between', props.className)}>
        <ul
          className={cx(
            'nav nav-tabs d-flex space-x-10 mb-30',
            props.tabClassName
          )}
          role="tablist"
        >
          {props.items?.map(item => (
            <li
              key={`account-profile-tablist-item-${item.id}`}
              className="nav-item"
            >
              <button
                className={cx(
                  'btn btn-sm',
                  activeId == item.id ? 'btn-dark' : 'btn-white'
                )}
                onClick={handleChangeTab(item)}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export const AccountProfileArtworkTab = React.memo(TabListComponent);
TabListComponent.propTypes = propTypes;
