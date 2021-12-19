import { PageLayout } from 'components/Layouts';
import React from 'react';
import { CollectionsPageFilterStatus } from './components';
import { NFTCollection } from 'components/NFTCollection';

const fakeItems = new Array(6).fill({});

export function CollectionsPage() {
  return (
    <PageLayout>
      <div className="section mt-100">
        <div className="section__head">
          <CollectionsPageFilterStatus />
        </div>
        <div className="row justify-content-center mb-30_reset">
          {fakeItems.map((item, index) => (
            <div
              key={`collection-item-${index}`}
              className="col-lg-6 col-md-6 col-sm-12"
            >
              <NFTCollection item={item} />
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
