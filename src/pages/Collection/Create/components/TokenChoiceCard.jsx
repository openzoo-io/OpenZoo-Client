import React from 'react';
import cx from 'classnames';

export function TokenChoiceCard(props) {
  const { selected, title, subtitle, network, detail, onClick } = props;

  return (
    <div
      className={cx(
        'box bg_white rounded-20 w-100 d-flex flex-column justify-content-center align-items-center py-20 px-25 sm:px-5 cursor-pointer',
        selected && 'border_brand_5'
      )}
      onClick={onClick}
    >
      {selected ? (
        <i className="ri-checkbox-blank-circle-fill color_brand"></i>
      ) : (
        <i className="ri-checkbox-blank-circle-fill color_hard_light"></i>
      )}
      <h3 className="color_brand mt-20 txt_align-center">{title}</h3>
      <p className="txt_align-center">{subtitle}</p>
      <p className="txt_sm _bold txt_align-center">{network}</p>
      <p className="mt-15 txt_align-center">{detail}</p>
    </div>
  );
}
