import React from 'react';
import PropTypes from 'prop-types';

const DropdownButtonItem = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const propsTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(DropdownButtonItem)),
  onClick: PropTypes.func,
  onClickItem: PropTypes.func,
};

export function DropdownButton(props) {
  const handleClickItem = item => () => {
    props.onClickItem?.(item);
  };
  return (
    <div className="dropdown d-none d-sm-block">
      <button
        className="btn btn-white btn-sm dropdown-toggle"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={props.onClick}
      >
        {props.title}
      </button>
      <div className="dropdown-menu">
        {props.items?.map(item => (
          <a
            key={`${props.title}-${item.id}-${item.label}`}
            className="dropdown-item"
            href="#"
            onClick={handleClickItem(item)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

DropdownButton.propsTypes = propsTypes;
