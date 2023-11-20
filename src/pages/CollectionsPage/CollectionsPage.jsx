import { PageLayout } from 'components/Layouts';
import React, { useEffect, useState } from 'react';
import { CollectionsPageFilterStatus } from './components/CollectionsPageFilterStatus';
import { NFTCollection } from 'components/NFTCollection';
import { useSelector } from 'react-redux';
import { useApi } from 'api';
import Loader from 'react-loader-spinner';
import { useMemo } from 'react';
// const stickylist = [
//   '0x992e4447f470ea47819d677b84d2459677bfdadf',
//   '0x38034b2e6ae3fb7fec5d895a9ff3474ba0c283f6',
//   '0xa67213608db9d4bffac75bad01ca5b1f4ad0724c'
// ]

export default function CollectionsPage() {
  const { fetchCollectionList } = useApi();
  const [collections, setCollections] = useState([]);
  const [official_collections, setOfficial_collections] = useState([]);
  const [sortedBy, setSortedBy] = useState({ id: 'volume' });
  const [loading, setLoading] = useState(false);
  const { onlyVerified } = useSelector(state => state.Filter);
  const [count, setCount] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const observer = React.useRef();

  const onReachBottom = () => {
    //if (upFetching || downFetching) return;
    if (loading) return;
    getAllCollections(1);
  };

  const loadMoreRef = React.useCallback(
    node => {
      console.log(collections.length, count);
      const hasMore = collections.length < count; // TODO: Need to check
      //console.log(props.items.length);
      //console.log(props.count);
      if (loading) return;
      if (observer.current) observer.current?.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          onReachBottom?.();
        }
      });
      if (node) observer.current.observe(node);
    },
    [collections, count, loading]
  );

  useMemo(() => {
    setCollections([]);
    setOfficial_collections([]);
    setFrom(0);
    setTo(0);
    setCount(0);
  }, [onlyVerified, sortedBy]);

  useEffect(() => {
    if (typeof onlyVerified === 'undefined') return;

    getAllCollections(0);
  }, [onlyVerified, sortedBy]);

  // function shuffleArray(array) {
  //   let i = array.length - 1;
  //   for (; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     const temp = array[i];
  //     array[i] = array[j];
  //     array[j] = temp;
  //   }
  //   return array;
  // }

  const getAllCollections = async dir => {
    setLoading(true);

    if (dir === 0) {
      console.log(collections);
    }

    let fetchCount = 12;
    let start;
    let _count = fetchCount;
    if (dir !== 0) {
      start = to;
    } else {
      start = from;
    }
    _count = fetchCount;
    if (count !== 0 && start === count) {
      return;
    }

    const res = await fetchCollectionList(
      onlyVerified,
      start,
      _count,
      sortedBy
    );
    if (res.status === 'success') {
      // let official = [];
      // let nonofficial = [];

      // res.data.collections.map(item => {
      //   if (
      //     stickylist.indexOf(item.address) !== -1
      //   ) {
      //     official.push(item);
      //   } else {
      //     nonofficial.push(item);
      //   }
      // });

      //nonofficial = shuffleArray(nonofficial);

      setCount(res.data.total);
      //setCollections(res.data.collections);

      let _from = from;
      let _to = to;

      if (dir > 0) {
        _to += res.data.collections.length;
      } else {
        _to = _from + res.data.collections.length;
      }
      setFrom(_from);
      setTo(_to);
      setOfficial_collections(res.data.official_collections);
      setCollections([...collections, ...res.data.collections]);
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="section mt-50 collectionList">
        <div className="section__head">
          <div class="row justify-content-between align-items-center">
            <div class="col-lg-auto">
            <div style={{fontSize:20,fontWeight:'bold'}}>
                Featured Collections
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-start mb-30" style={{zoom: 0.8}}>
          {official_collections.map((item, index) => {
           // if (!item.isSticky) return <></>;
            return (
              <div
                key={`collection-item-${index}`}
                className="col-xl-3 col-lg-6 col-md-6 col-sm-12"
              >
                <NFTCollection item={item} minimal={true}/>
              </div>
            );
          })}

          <div className={'d-flex justify-content-center'} ref={loadMoreRef}>
            {loading && (
              <Loader type="Oval" color="#00A59A" height={40} width={40} />
            )}
          </div>
        </div>

        {
          <div className="section__head">
            {
              <CollectionsPageFilterStatus
                sortedBy={sortedBy}
                setSortedBy={setSortedBy}
                count={count}
                onlyVerified={onlyVerified}
              />
            }
          </div>
        }
        <div className="row justify-content-start mb-30_reset">
          {collections.map((item, index) => {
            //if (item.isSticky) return <></>;
            return (
              <div
                key={`collection-item-${index}`}
                className="col-xl-4 col-lg-6 col-md-6 col-sm-12"
              >
                <NFTCollection item={item} />
              </div>
            );
          })}

          <div className={'d-flex justify-content-center'} ref={loadMoreRef}>
            {loading && (
              <Loader type="Oval" color="#00A59A" height={40} width={40} />
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
