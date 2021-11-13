import React, { useEffect, useRef, useState } from 'react';
import Header from 'components/header';
import {
  ExplorePageArtworksSection,
  ExplorePageFilterCategorySection,
  ExplorePageFillterStatus,
  ExplorePageCollectionsSections,
} from './sections';
import { Footer } from 'components/Footer';
import { useResizeDetector } from 'react-resize-detector';
import { useDispatch, useSelector } from 'react-redux';
import CollectionsActions from 'actions/collections.actions';
import TokensActions from 'actions/tokens.actions';
import { useApi } from 'api';
import useWindowDimensions from 'hooks/useWindowDimensions';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';

export function NewExplorePage() {
  const { fetchCollections, fetchTokens } = useApi();
  const dispatch = useDispatch();
  const { chainId } = useWeb3React();

  const { width: gridWidth, ref } = useResizeDetector();
  const { width } = useWindowDimensions();

  const conRef = useRef();
  const [fetchInterval, setFetchInterval] = useState(null);
  const [cancelSource, setCancelSource] = useState(null);
  const [prevNumPerRow, setPrevNumPerRow] = useState(null);

  // const { authToken } = useSelector(state => state.ConnectWallet);
  const { upFetching, downFetching, tokens, count, from, to } = useSelector(
    state => state.Tokens
  );
  const {
    collections,
    groupType,
    category,
    sortBy,
    statusBuyNow,
    statusHasBids,
    statusHasOffers,
    statusOnAuction,
  } = useSelector(state => state.Filter);

  const numPerRow = Math.floor(gridWidth / 256);
  const fetchCount = numPerRow <= 3 ? 18 : 16;

  useEffect(() => {
    if (fetchInterval) {
      clearInterval(fetchInterval);
    }

    updateCollections();
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
    sortBy,
    statusBuyNow,
    statusHasBids,
    statusHasOffers,
    statusOnAuction,
    chainId,
    numPerRow,
  ]);

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
        cancelTokenSource.token
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
      newTokens =
        dir > 0
          ? newTokens.slice(-fetchCount * 2)
          : newTokens.slice(0, fetchCount * 2);
      if (dir > 0) {
        _from = _to - newTokens.length;
      } else if (dir < 0) {
        _to = _from + newTokens.length;
      }
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

  // handle event methos
  const handleScroll = e => {
    if (upFetching || downFetching) return;

    const obj = e.target;
    if (obj.scrollHeight - obj.clientHeight - obj.scrollTop < 100) {
      fetchNFTs(1);
    } else if (obj.scrollTop < 100 && from > 0) {
      fetchNFTs(-1);
    }
  };

  return (
    <div
      ref={conRef}
      className="overflow-hidden"
      onScroll={width <= 600 ? handleScroll : null}
    >
      <Header />
      <div className="hero_marketplace bg_white">
        <div className="container">
          <h1 className="text-center">NFT Marketplace</h1>
        </div>
      </div>

      <ExplorePageFilterCategorySection />

      <div className="container">
        <div className="section mt-100">
          <div className="section__head">
            <h2 className="section__title mb-20"> Artworks</h2>
            <ExplorePageFillterStatus />
          </div>
        </div>
        <div ref={ref}>
          <ExplorePageArtworksSection items={tokens} loading={downFetching} />
        </div>
        <ExplorePageCollectionsSections />
      </div>
      <Footer />
    </div>
  );
}
