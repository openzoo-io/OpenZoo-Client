import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { NFTCollection } from 'components/NFTCollection';
const propTypes = {
  collections: PropTypes.array,
  collectionLoading: PropTypes.bool,
};

function AccountProfileCollectionListComponent(props) {
  
  return (
    <div className="tab-content collectionList">
      <div className="tab-pane active">
        <div className="row">
          {props.collections?.map((item, index) => (
            <div
              key={item?.tokenID + index.toString()}
              className="col-xl-6 col-lg-6 col-md-6"
            >
              <NFTCollection item={item} isProfile={true} />
            </div>
          ))}
          <div className={'d-flex justify-content-center'}>
            {props.collectionLoading && (
              <Loader type="Oval" color="#00A59A" height={32} width={32} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

AccountProfileCollectionListComponent.propTypes = propTypes;
export const AccountProfileCollectionList = AccountProfileCollectionListComponent;
