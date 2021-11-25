import { PageLayout } from 'components/Layouts';
import React from 'react';
import { CollectionsPageFilterStatus } from './components';
import { NFTCollection } from 'components/NFTCollection';

const fakeItems = new Array(6).fill({});

export function CollectionsPage() {
  return (
    <PageLayout
      cover={
        <div className="hero_marketplace bg_white">
          <div className="container">
            <h1 className="text-center">NFT Collections</h1>
          </div>
        </div>
      }
    >
      <div className="section mt-100">
        <div className="section__head">
          <h2 className="section__title mb-20"> Collections</h2>
          <CollectionsPageFilterStatus />
        </div>
        <div className="row justify-content-center mb-30_reset">
          {fakeItems.map((item, index) => (
            <div
              key={`collection-item-${index}`}
              className="col-lg-4 col-md-6 col-sm-8"
            >
              <NFTCollection item={item} />
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
