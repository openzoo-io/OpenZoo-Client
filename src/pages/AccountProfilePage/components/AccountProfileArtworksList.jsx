import { AssetCard } from 'components/NFTAssetCard';
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  items: PropTypes.array,
};

function AccountProfileArtworksListComponent(props) {
  const handleOnLike = () => {
    //
  };

  return (
    <div className="tab-content">
      <div className="tab-pane active">
        <div className="row mb-30_reset">
          {props.items?.map((item, index) => (
            <div
              key={item?.tokenID + index.toString()}
              className="col-xl-4 col-lg-6 col-md-6"
            >
              <AssetCard preset="three" item={item} onLike={handleOnLike} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

AccountProfileArtworksListComponent.propTypes = propTypes;
export const AccountProfileArtworksList = AccountProfileArtworksListComponent;
