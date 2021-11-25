import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  multiple: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export function FilterMenu(props) {
  const [selectedValues, setSelectedValues] = useState([]);

  useEffect(() => {
    if (props.values != null) {
      setSelectedValues(props.values);
    }
  }, [props.values]);

  const handleOnChange = item => () => {
    const index = selectedValues.findIndex(v => v === item.value);
    const cpValues = [...selectedValues];
    if (index >= 0) {
      cpValues.splice(index, 1);
    } else {
      cpValues.push(item.value);
    }
    setSelectedValues(cpValues);
    props.onChange?.(cpValues);
  };

  return (
    <div className={cx('d-flex space-x-10', props.className)}>
      <span className="color_text txt_sm" style={{ minWidth: 'max-content' }}>
        FILTER BY:
      </span>
      <ul className="menu_categories space-x-20">
        {props.items?.map(item => (
          <li
            key={`filter-menu-item-${item.value}`}
            className="d-flex space-x-10 switch_item"
          >
            <input
              id={`${props.name}-switch-${item.value}`}
              type="checkbox"
              checked={selectedValues.includes(item.value)}
              onChange={handleOnChange(item)}
            />
            <label
              className="toggle"
              htmlFor={`${props.name}-switch-${item.value}`}
            >
              Toggle
            </label>
            <span> {item.label} </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

FilterMenu.propTypes = propTypes;
FilterMenu.defaultProps = {
  multiple: true,
};
