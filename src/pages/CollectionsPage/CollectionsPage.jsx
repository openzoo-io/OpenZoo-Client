import { PageLayout } from 'components/Layouts';
import React, { useEffect, useState } from 'react';
import { CollectionsPageFilterStatus } from './components/CollectionsPageFilterStatus';
import { NFTCollection } from 'components/NFTCollection';
import { useSelector } from 'react-redux';
import { useApi } from 'api';

export function CollectionsPage() {
  const { fetchCollectionList } = useApi();
  const [collections, setCollections] = useState([]);
  const [sortedBy, setSortedBy] = useState({id:''});
  
  const {
    onlyVerified,
  } = useSelector(state => state.Filter);

  useEffect(() => {
    getAllCollections();
  }, [onlyVerified]);



  const getAllCollections = async () => {
    const res = await fetchCollectionList(onlyVerified);
    if (res.status === 'success') {
      setCollections( res.data);
    }
  };

  return (
    <PageLayout>
      <div className="section mt-50 collectionList">
        {false && <div className="section__head">{<CollectionsPageFilterStatus sortedBy={sortedBy} setSortedBy={setSortedBy}/>}</div>}
        <div className="row justify-content-center mb-30_reset">
          {collections.map((item, index) => (
            <div
              key={`collection-item-${index}`}
              className="col-lg-4 col-md-12 col-sm-12"
            >
              <NFTCollection item={item}/>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
