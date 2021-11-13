import { NFTCollection } from 'components/NFTCollection/NFTCollection';
import React from 'react';
import { ExplorePageCollectionFilterStatus } from './ExplorePageCollectionFilterStatus';

export function ExplorePageCollectionsSections() {
  return (
    <div className="section mt-100">
      <div className="section__head">
        <h2 className="section__title mb-20"> Collections</h2>
        <ExplorePageCollectionFilterStatus />
      </div>
      <div className="row justify-content-center mb-30_reset">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <NFTCollection />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-8">
          <NFTCollection />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-8">
          <NFTCollection />
        </div>
      </div>
    </div>
  );
}
