import { AssetCard } from 'components/NFTAssetCard';
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  items: PropTypes.array,
  loading: PropTypes.bool,
};

export function ExplorePageArtworksSection(props) {
  return (
    <div className="row mb-30_reset" ref={props.ref}>
      {props.items?.map((item, index) => (
        <div
          key={'explore-artwork-item-' + index.toString()}
          className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
        >
          <AssetCard preset="four" item={item} />
        </div>
      ))}
    </div>
  );
}

ExplorePageArtworksSection.propTypes = propTypes;
