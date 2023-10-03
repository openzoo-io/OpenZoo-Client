import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const DropdownButtonItem = {
  
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const propsTypes = {
  value: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape(DropdownButtonItem)),
  btnClassName: PropTypes.string,
  className: PropTypes.string,
  onClickItem: PropTypes.func,
};

export function DropdownButton(props) {

  const title = props.items?.find(v => v.id === props.value)?.label || '';

  const handleClickItem = item => () => {
    props.onClickItem?.(item);
  };
  return (
    <div className={cx('dropdown', props.className)}>
      <button
        className={cx('btn btn-sm dropdown-toggle', props.btnClassName)}
        type="button"
        data-toggle="dropdown"
        aria-haspopup="false"
        aria-expanded="false"
      >
        {title}
      </button>
      <div className="dropdown-menu">
        {props.items?.map(item => (
          <div
            key={`${props.key}-${item.id}-${item.label}`}
            className="cursor-pointer dropdown-item"
            onClick={handleClickItem(item)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

DropdownButton.propsTypes = propsTypes;
DropdownButton.defaultProps = {
  btnClassName: 'btn-dark',
};
