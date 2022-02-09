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
import { useParams } from 'react-router';
import FilterActions from 'actions/filter.actions';
import styles from './styles.module.scss';
import { shortenAddress, formatUSD, formatNumber } from 'utils';
//import  warned  from 'constants/warned.collections';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationArrow,
  faGlobe,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faTelegramPlane,
  faInstagram,
  faDiscord,
  faMedium,
} from '@fortawesome/free-brands-svg-icons';
import { Categories } from 'constants/filter.constants';
import { Link, useHistory } from 'react-router-dom';
export function CollectionList() {
  const {
    fetchCollection,
    fetchCollections,
    fetchWarnedCollections,
    fetchCollectionStatistic,
    fetchTokens,
    getItemsLiked,
    explorerUrl,
    getUserAccountDetails,
  } = useApi();
  const dispatch = useDispatch();
  const { chainId } = useWeb3React();

  const { width: gridWidth, ref } = useResizeDetector();
  const { width } = useWindowDimensions();

  // console.log({ width });

  const { addr } = useParams();

  const conRef = useRef();

  const [collectionType, setCollectionType] = useState(721);

  // Reset to unfilterd //
  /*
  useEffect(() => {
    return () => {
      dispatch(FilterActions.updateCollectionsFilter([]));
    };
  }, []);
*/
  const [fetchInterval, setFetchInterval] = useState(null);
  const [cancelSource, setCancelSource] = useState(null);
  const [likeCancelSource, setLikeCancelSource] = useState(null);
  const [prevNumPerRow, setPrevNumPerRow] = useState(null);
  const [collectionData, setCollectionData] = useState({});
  const [collectionStatisticData, setCollectionStatisticData] = useState({});
  const [warnedCollections, setWarnedCollections] = useState([]);

  const { authToken } = useSelector(state => state.ConnectWallet);
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
    attributes,
  } = useSelector(state => state.Filter);

  const prevAuthToken = usePrevious(authToken);

  const numPerRow = Math.floor(gridWidth / 256);
  const fetchCount = numPerRow <= 3 ? 14 : 12;

  useEffect(() => {
    // Filter by Address //
    dispatch(FilterActions.updateCollectionsFilter([addr]));

    // reset Buy now //
    /*
    dispatch(FilterActions.updateStatusFilter('statusBuyNow', false));
    dispatch(FilterActions.updateStatusFilter('statusHasBids', false));
    dispatch(FilterActions.updateStatusFilter('statusHasOffers', false));
    dispatch(FilterActions.updateStatusFilter('statusOnAuction', false));
*/
    if (fetchInterval) {
      clearInterval(fetchInterval);
    }

    updateCollections();
    updateWarnedCollections();
    setFetchInterval(setInterval(updateCollections, 1000 * 60 * 10));

    return () => {
      if (fetchInterval) {
        clearInterval(fetchInterval);
      }
    };
  }, [addr]);

  const [ownerInfo, setOwnerInfo] = useState(null);

  const getOwnerInfo = async owner => {
    try {
      const { data } = await getUserAccountDetails(owner);
      setOwnerInfo(data);
    } catch {
      setOwnerInfo(null);
    }
  };

  const FilterType = {
    Attribute: 'attributes'
  }

  useEffect(() => {
    if (collectionData?.owner) {
      getOwnerInfo(collectionData?.owner);
    }
  }, [collectionData?.owner]);

  useEffect(() => {
    setPrevNumPerRow(numPerRow);
    if (isNaN(numPerRow) || (prevNumPerRow && prevNumPerRow !== numPerRow))
      return;
    fetchNFTs(0, FilterType.Attribute);
  }, [attributes]);

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
  const history = useHistory();
  const updateWarnedCollections = async () => {
    const res = await fetchWarnedCollections();
    if (res.status === 'success') {
      setWarnedCollections(res.data);
    }
};
  const updateCollections = async () => {
    try {
      // Filter by Address //

      let cRes = await fetchCollection(addr);
      if (cRes.data.isAppropriate === false) {
        history.replace('/404');
        return;
      }
      setCollectionData(cRes.data);

      let statisticRes = await fetchCollectionStatistic(addr);
      setCollectionStatisticData(statisticRes.data);

      dispatch(CollectionsActions.fetchStart());
      const res = await fetchCollections();
      //console.log('collections',res);
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

  const fetchNFTs = async (dir, filterType) => {
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

      if (filterType !== FilterType.Attribute && start === count) {
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
        null,
        attributes
      );

      // Set collection type by first NFT //
      if (data.tokens[0]) {
        setCollectionType(data.tokens[0].tokenType);
      }
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

  // handle event methos
  // eslint-disable-next-line no-unused-vars
  const handleScroll = e => {
    if (upFetching || downFetching) return;

    const obj = e.target;
    if (obj.scrollHeight - obj.clientHeight - obj.scrollTop < 100) {
      fetchNFTs(1);
    } else if (obj.scrollTop < 100 && from > 0) {
      fetchNFTs(-1);
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
  function addDefaultSrc(ev) {
    ev.target.src = '/notfound.png';
  }
  return (
    <>
      <PageLayout
        ref={conRef}
        cover={
          <>
            <div className="hero_marketplace bg_white">
              <div className="container">
                {
                warnedCollections && warnedCollections.includes(addr) && <div className="alert alert-danger"><b><FontAwesomeIcon icon={faExclamationTriangle} /> Warning:</b> This content has been flagged by the OpenZoo Team as suspicious.</div>
                }
                <div className="col-lg-6">
                  <div className={styles.collectionDescription}>
                    <div className={styles.logo}>
                      <img
                        onError={addDefaultSrc}
                        src={`https://openzoo.mypinata.cloud/ipfs/${collectionData?.logoImageHash}`}
                      />
                    </div>
                    <div>
                      <h1>
                        {collectionData?.collectionName}{' '}
                        {collectionData?.isVerified && (
                          <img src="https://assets.openzoo.io/verified.svg" />
                        )}
                      </h1>
                      <div className={styles.ownedby}>
                        created by{' '}
                        <Link
                          to={`/account/${collectionData?.owner}`}
                          className="creators space-x-10"
                        >
                          {ownerInfo?.alias ||
                            shortenAddress(collectionData?.owner)}
                        </Link>
                      </div>

                      <div className={styles.links}>
                        <a
                          href={
                            explorerUrl +
                            (collectionType === 721 ? '/token/' : '/address/') +
                            addr
                          }
                          className={styles.address}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {shortenAddress(addr)}{' '}
                          <FontAwesomeIcon icon={faLocationArrow} />
                        </a>
                        {collectionData.siteUrl && (
                          <a
                            href={collectionData.siteUrl}
                            className={styles.external}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FontAwesomeIcon icon={faGlobe} />
                          </a>
                        )}
                        {collectionData.twitterHandle && (
                          <a
                            href={collectionData.twitterHandle}
                            className={styles.external}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FontAwesomeIcon icon={faTwitter} />
                          </a>
                        )}
                        {collectionData.telegram && (
                          <a
                            href={collectionData.telegram}
                            className={styles.external}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FontAwesomeIcon icon={faTelegramPlane} />
                          </a>
                        )}
                        {collectionData.discord && (
                          <a
                            href={collectionData.discord}
                            className={styles.external}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FontAwesomeIcon icon={faDiscord} />
                          </a>
                        )}
                        {collectionData.mediumHandle && (
                          <a
                            href={collectionData.mediumHandle}
                            className={styles.external}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FontAwesomeIcon icon={faMedium} />
                          </a>
                        )}
                        {collectionData.instagramHandle && (
                          <a
                            href={collectionData.instagramHandle}
                            className={styles.external}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FontAwesomeIcon icon={faInstagram} />
                          </a>
                        )}
                      </div>
                      <div className={styles.linksAlt}>
                        {collectionType === 721 ? (
                          <div className={styles.bullet}>SINGLE TOKEN 721</div>
                        ) : (
                          <div className={styles.bullet}>MULTI TOKEN 1155</div>
                        )}

                        {collectionData.categories &&
                          Categories &&
                          Categories.map(v => {
                            if (collectionData.categories.includes(v.id + '')) {
                              return (
                                <div className={styles.bullet}>{v.label}</div>
                              );
                            }
                          })}
                      </div>
                    </div>
                  </div>
                  <div className={styles.collectionDescription}>
                    <div className="box">
                      <span>
                        {collectionStatisticData.countNFT
                          ? formatNumber(collectionStatisticData.countNFT)
                          : 'N/A'}
                      </span>
                      items
                    </div>

                    <div className="box">
                      <span>
                        {collectionStatisticData.countOwner
                          ? formatNumber(collectionStatisticData.countOwner)
                          : 'N/A'}
                      </span>
                      owners
                    </div>

                    <div className="box">
                      <span>
                        {collectionStatisticData.floorPrice
                          ? formatUSD(collectionStatisticData.floorPrice, 2)
                          : 'N/A'}
                      </span>
                      floor price
                    </div>

                    <div className="box">
                      <span>
                        {collectionStatisticData.volumeTraded
                          ? formatUSD(collectionStatisticData.volumeTraded, 2)
                          : 'N/A'}
                      </span>
                      volume traded
                    </div>
                  </div>
                  <div className={styles.collectionDescription}>
                    <p>{collectionData?.description}</p>
                  </div>
                </div>
              </div>
            </div>
            {/*<ExplorePageFilterCategorySection />*/}
          </>
        }
      >
        <div className="section mt-40">
          <div className="section__head">
            {/*<h2 className="section__title mb-20"> Artworks</h2>*/}
            <ExplorePageFillterStatus />
          </div>
        </div>

        <div ref={ref} style={{ paddingBottom: 60 }}>
          <ExplorePageArtworksSection
            items={tokens}
            warnedCollections={warnedCollections}
            category={category}
            count={count}
            loading={downFetching}
            onReachBottom={handleOnReachArtworksBottom}
          />
        </div>
      </PageLayout>
    </>
  );
}
