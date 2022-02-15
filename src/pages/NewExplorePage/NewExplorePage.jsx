import React, { useEffect, useRef, useState } from 'react';
import {
  ExplorePageArtworksSection,
  //ExplorePageFilterCategorySection,
  ExplorePageFillterStatus,
} from './sections';
import { useResizeDetector } from 'react-resize-detector';
import { useDispatch, useSelector } from 'react-redux';
import CollectionsActions from 'actions/collections.actions';
import TokensActions from 'actions/tokens.actions';
import { useApi } from 'api';
import useWindowDimensions from 'hooks/useWindowDimensions';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';
import usePrevious from 'hooks/usePrevious';
import { PageLayout } from 'components/Layouts/PageLayout';
import FilterActions from 'actions/filter.actions';

export function NewExplorePage() {
  const { fetchCollections, fetchWarnedCollections, fetchTokens, getItemsLiked } = useApi();
  const dispatch = useDispatch();
  const { chainId } = useWeb3React();

  const { width: gridWidth, ref } = useResizeDetector();
  const { width } = useWindowDimensions();

  // console.log({ width });

  const conRef = useRef();
  const [fetchInterval, setFetchInterval] = useState(null);
  const [cancelSource, setCancelSource] = useState(null);
  const [likeCancelSource, setLikeCancelSource] = useState(null);
  const [prevNumPerRow, setPrevNumPerRow] = useState(null);
  const [warnedCollections, setWarnedCollections] = useState([]);

  const { authToken } = useSelector(state => state.ConnectWallet);
  const { upFetching, downFetching, tokens, count, from, to } = useSelector(
    state => state.Tokens
  );
  const {
    collections,
    groupType,
    category,
    mediaType,
    sortBy,
    onlyVerified,
    statusBuyNow,
    statusHasBids,
    statusHasOffers,
    statusOnAuction,
  } = useSelector(state => state.Filter);



  const prevAuthToken = usePrevious(authToken);
  
  const numPerRow = Math.floor(gridWidth / 256);
  const fetchCount = numPerRow <= 3 ? 9 : 8;

  useEffect(() => {
    if (fetchInterval) {
      clearInterval(fetchInterval);
    }
    dispatch(FilterActions.updateCollectionsFilter([]));


    // Set Buy now //
    /*
    dispatch(FilterActions.updateStatusFilter('statusBuyNow', true));
    dispatch(FilterActions.updateStatusFilter('statusHasBids', false));
    dispatch(FilterActions.updateStatusFilter('statusHasOffers', false));
    dispatch(FilterActions.updateStatusFilter('statusOnAuction', false));
*/
    updateCollections();
    updateWarnedCollections();
    setFetchInterval(setInterval(updateCollections, 1000 * 60 * 10));
    
    return () => {
      if (fetchInterval) {
        clearInterval(fetchInterval);
      }
      

    };
  }, []);

  useEffect(() => {
    setPrevNumPerRow(numPerRow);
    if (isNaN(numPerRow) || (prevNumPerRow && prevNumPerRow !== numPerRow))
      return;
    fetchNFTs(0);

  }, [
    collections,
    groupType,
    category,
    mediaType,
    sortBy,
    onlyVerified,
    statusBuyNow,
    statusHasBids,
    statusHasOffers,
    statusOnAuction,
    chainId,
    numPerRow,
  ]);

  const updateWarnedCollections = async () => {
      const res = await fetchWarnedCollections();
      if (res.status === 'success') {
        setWarnedCollections(res.data);
      }
  };

  const updateCollections = async () => {
    try {
      dispatch(CollectionsActions.fetchStart());
      const res = await fetchCollections();
      if (res.status === 'success') {
        const verified = [];
        const unverified = [];
        res.data.map(item => {
          if (item.isVerified) verified.push(item);
          else unverified.push(item);
        });
        dispatch(CollectionsActions.fetchSuccess([...verified, ...unverified]));
      }
    } catch {
      dispatch(CollectionsActions.fetchFailed());
    }
  };

  const fetchNFTs = async dir => {
    if (cancelSource) {
      cancelSource.cancel();
    }
    if (isNaN(fetchCount)) return;

    try {
      const filterBy = [];
      if (onlyVerified) filterBy.push('onlyVerified');
      if (statusBuyNow) filterBy.push('buyNow');
      if (statusHasBids) filterBy.push('hasBids');
      if (statusHasOffers) filterBy.push('hasOffers');
      if (statusOnAuction) filterBy.push('onAuction');

      const cancelTokenSource = axios.CancelToken.source();
      setCancelSource(cancelTokenSource);

      let start;
      let _count = fetchCount;
      if (dir !== 0) {
        _count -= tokens.length % numPerRow;
        start = Math.max(dir < 0 ? from - _count : to, 0);
      } else {
        start = from;
        _count = fetchCount * 2;
      }
      if (start === count) {
        return;
      }

      dispatch(TokensActions.startFetching(dir));

      const { data } = await fetchTokens(
        start,
        _count,
        groupType,
        collections,
        category,
        sortBy,
        filterBy,
        null,
        cancelTokenSource.token,
        false,
        mediaType
      );

      let newTokens =
        dir > 0
          ? [...tokens, ...data.tokens]
          : dir < 0
          ? [...data.tokens, ...tokens]
          : data.tokens;
      newTokens = newTokens.filter(
        (tk, idx) =>
          newTokens.findIndex(_tk =>
            tk.items
              ? tk._id === _tk._id
              : tk.contractAddress === _tk.contractAddress &&
                tk.tokenID === _tk.tokenID
          ) === idx
      );
      let _from = from;
      let _to = to;
      const newCount = newTokens.length - tokens.length;
      if (dir > 0) {
        _to += newCount;
      } else if (dir < 0) {
        _from -= newCount;
      } else {
        _to = _from + newTokens.length;
      }

      // newTokens =
      //   dir > 0
      //     ? newTokens.slice(-fetchCount * 2)
      //     : newTokens.slice(0, fetchCount * 2);
      // if (dir > 0) {
      //   _from = _to - newTokens.length;
      // } else if (dir < 0) {
      //   _to = _from + newTokens.length;
      // }
      dispatch(
        TokensActions.fetchingSuccess(data.total, newTokens, _from, _to)
      );
      if (dir === 0 && from) {
        // move scrollbar to middle
        const obj = width > 600 ? ref.current : conRef.current;
        obj.scrollTop = (obj.scrollHeight - obj.clientHeight) / 2;
      }
    } catch (e) {
      if (!axios.isCancel(e)) {
        dispatch(TokensActions.fetchingFailed());
      }
    } finally {
      setCancelSource(null);
    }
  };



  const handleOnReachArtworksBottom = () => {
    if (upFetching || downFetching) return;
    fetchNFTs(1);
  };

  const updateItems = async () => {
    try {
      if (!authToken) {
        if (prevAuthToken) {
          dispatch(
            TokensActions.updateTokens(
              tokens.map(tk => ({
                ...tk,
                isLiked: false,
              }))
            )
          );
        }
        return;
      }
      let missingTokens = tokens.map((tk, index) =>
        tk.items
          ? {
              index,
              isLiked: tk.isLiked,
              bundleID: tk._id,
            }
          : {
              index,
              isLiked: tk.isLiked,
              contractAddress: tk.contractAddress,
              tokenID: tk.tokenID,
            }
      );
      if (prevAuthToken) {
        missingTokens = missingTokens.filter(tk => tk.isLiked === undefined);
      }

      if (missingTokens.length === 0) return;

      const cancelTokenSource = axios.CancelToken.source();
      setLikeCancelSource(cancelTokenSource);
      const { data, status } = await getItemsLiked(
        missingTokens,
        authToken,
        cancelTokenSource.token
      );
      if (status === 'success') {
        const newTokens = [...tokens];
        missingTokens.map((tk, idx) => {
          newTokens[tk.index].isLiked = data[idx].isLiked;
        });
        dispatch(TokensActions.updateTokens(newTokens));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLikeCancelSource(null);
    }
  };

  useEffect(() => {
    if (likeCancelSource) {
      likeCancelSource.cancel();
    }
    if (tokens.length) {
      updateItems();
    }
  }, [tokens, authToken]);

  return (
    <PageLayout
      ref={conRef}
      cover={
        <>
        {/* 
          <div className="hero_marketplace bg_white">
            <div className="container">
              <h1 className="text-center">NFT Marketplace</h1>
            </div>
          </div>
          <ExplorePageFilterCategorySection />
        
        */}
        </>
      }
    >
      <div className="section mt-40"> {/* mt-100 previous */}
        <div className="section__head">
          {/*<h2 className="section__title mb-20"> Artworks</h2>*/}
          <ExplorePageFillterStatus />
        </div>
      </div>
      <div ref={ref} style={{paddingBottom:60}}>
        <ExplorePageArtworksSection
          items={tokens}
          category={category}
          count={count}
          loading={downFetching}
          warnedCollections={warnedCollections}
          onReachBottom={handleOnReachArtworksBottom}
        />
      </div>
    </PageLayout>
  );
}
