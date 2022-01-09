import { PageLayout } from 'components/Layouts';
import React, { useEffect, useState } from 'react';
import { CollectionsPageFilterStatus } from './components/CollectionsPageFilterStatus';
import { NFTCollection } from 'components/NFTCollection';
import { useSelector } from 'react-redux';
import { useApi } from 'api';
import Loader from 'react-loader-spinner';
export function CollectionsPage() {
  const { fetchCollectionList } = useApi();
  const [collections, setCollections] = useState([]);
  const [sortedBy, setSortedBy] = useState({id:''});
  const [loading, setLoading] = useState(false);
  const {
    onlyVerified,
  } = useSelector(state => state.Filter);

  useEffect(() => {
    if (typeof onlyVerified === 'undefined') return;
    setCollections([]);
      getAllCollections();
  }, [onlyVerified]);

  function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const getAllCollections = async () => {
    setLoading(true);
    const res = await fetchCollectionList(onlyVerified);
    if (res.status === 'success') {
      let official = [];
      let nonofficial = [];
      
      res.data.map(item => {
        if (item.address === '0x992e4447f470ea47819d677b84d2459677bfdadf' || item.address === '0x38034b2e6ae3fb7fec5d895a9ff3474ba0c283f6' || item.address === '0xa67213608db9d4bffac75bad01ca5b1f4ad0724c')
        {
          official.push(item);
        }
        else
        {
          nonofficial.push(item);
        }
      });

      nonofficial = shuffleArray(nonofficial);

      setCollections([...official, ...nonofficial]);
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="section mt-50 collectionList">
        {false && <div className="section__head">{<CollectionsPageFilterStatus sortedBy={sortedBy} setSortedBy={setSortedBy}/>}</div>}
        <div className="row justify-content-center mb-30_reset">
          {
            loading && (
              <div className={'d-flex justify-content-center'} >
              <Loader type="Oval" color="#00A59A" height={40} width={40} />
              </div>
            )
          }
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
