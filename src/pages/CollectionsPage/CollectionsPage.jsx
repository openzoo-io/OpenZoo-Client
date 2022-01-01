import { PageLayout } from 'components/Layouts';
import React, { useEffect, useState } from 'react';
//import { CollectionsPageFilterStatus } from './components';
import { NFTCollection } from 'components/NFTCollection';
import { useApi } from 'api';
export function CollectionsPage() {
  const { fetchCollectionList } = useApi();
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    getAllCollections();
  }, []);

  const getAllCollections = async () => {
    const res = await fetchCollectionList();
    if (res.status === 'success') {
      const verified = [];
      const unverified = [];
      res.data.map(item => {
        if (item.isVerified) verified.push(item);
        else unverified.push(item);
      });
      setCollections(verified);
    }
  };

  return (
    <PageLayout>
      <div className="section mt-50 collectionList">
        {
        false && <div className="section__head">
          {/*<CollectionsPageFilterStatus />*/}
        </div>
        }
        <div className="row justify-content-center mb-30_reset">
          {collections.map((item, index) => (
            <div
              key={`collection-item-${index}`}
              className="col-lg-6 col-md-12 col-sm-12"
            >
              <NFTCollection item={item} />
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
