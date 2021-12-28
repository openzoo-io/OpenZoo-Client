/* eslint-disable no-unused-expressions,  no-unused-vars */
import React, { useRef, useState, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, Redirect } from 'react-router-dom';
import { useResizeDetector } from 'react-resize-detector';
import cx from 'classnames';
import { Edit as EditIcon } from '@material-ui/icons';
import { Tooltip, Menu, MenuItem } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Skeleton from 'react-loading-skeleton';
import { ClipLoader } from 'react-spinners';
import ReactPlayer from 'react-player';
import Loader from 'react-loader-spinner';
import axios from 'axios';

import NFTsGrid from 'components/NFTsGrid';
import Header from 'components/header';
import Identicon from 'components/Identicon';
import NewBundleModal from 'components/NewBundleModal';
import FollowersModal from 'components/FollowersModal';
import SuspenseImg from 'components/SuspenseImg';
import { isAddress, shortenAddress, formatFollowers } from 'utils';
import toast from 'utils/toast';
import { useApi } from 'api';
import useTokens from 'hooks/useTokens';
import usePrevious from 'hooks/usePrevious';
import HeaderActions from 'actions/header.actions';
import ModalActions from 'actions/modal.actions';
import CollectionsActions from 'actions/collections.actions';

// import IconBundle from 'assets/icons/iconBundle';
import IconHeart from 'assets/icons/iconHeart';
import IconClock from 'assets/icons/iconClock';

import styles from './styles.module.scss';
import { Footer } from 'components/Footer';
import {
  AccountProfileAboutMeCard,
  AccountProfilePageHeader,
  AccountProfileFollowCard,
  AccountProfileArtworkTab,
  AccountProfileArtworksList,
  AccountProfileActivitiesList,
  AccountProfileOffersList,
  AccountProfileMyOffersList,
} from './components';
import { AssetCard } from 'components/NFTAssetCard';

const TAB_ITEMS = [
  {
    id: 0,
    title: 'NFTs',
  },
  {
    id: 2,
    title: 'Favorited',
  },
  {
    id: 3,
    title: 'Activities',
  },
  {
    id: 4,
    title: 'Offers',
  },
  {
    id: 5,
    title: 'My Offers',
  },
];

export function AccountProfilePage() {
  const dispatch = useDispatch();

  const {
    storageUrl,
    getUserAccountDetails,
    getUserFigures,
    fetchCollections,
    fetchTokens,
    updateBanner,
    getAccountActivity,
    getActivityFromOthers,
    getMyOffers,
    getFollowing,
    followUser: _followUser,
    getFollowers,
    getFollowings,
    getMyLikes,
    getItemsLiked,
  } = useApi();
  const { getTokenByAddress } = useTokens();
  const { account, chainId } = useWeb3React();
  const { width, ref } = useResizeDetector();

  const { uid } = useParams();

  const { authToken } = useSelector(state => state.ConnectWallet);
  const { user: me } = useSelector(state => state.Auth);

  const fileInput = useRef();

  const [anchorEl, setAnchorEl] = useState(null);
  const [prevUID, setPrevUID] = useState(null);
  const [bundleModalVisible, setBundleModalVisible] = useState(false);
  const [followingsModalVisible, setFollowingsModalVisible] = useState(false);
  const [followersModalVisible, setFollowersModalVisible] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [bundleFetching, setBundleFetching] = useState(false);
  const [favFetching, setFavFetching] = useState(false);
  const [fguresFetching, setFiguresFetching] = useState(false);
  const tokens = useRef([]);
  const bundles = useRef([]);
  const likes = useRef([]);
  const [followersLoading, setFollowersLoading] = useState(false);
  const followers = useRef([]);
  const followings = useRef([]);
  const [following, setFollowing] = useState(false);
  const [followingInProgress, setFollowingInProgress] = useState(false);
  const [count, setCount] = useState(0);
  const [bundleCount, setBundleCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const [now, setNow] = useState(new Date());
  const [page, setPage] = useState(0);
  const [bannerHash, setBannerHash] = useState();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [copied, setCopied] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [activityLoading, setActivityLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [bidsLoading, setBidsLoading] = useState(false);
  const [bids, setBids] = useState([]);
  const [offersLoading, setOffersLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [fetchInterval, setFetchInterval] = useState(null);
  const [likeCancelSource, setLikeCancelSource] = useState(null);
  const [prevNumPerRow, setPrevNumPerRow] = useState(null);
  const prevAuthToken = usePrevious(authToken);

  const numPerRow = Math.floor(width / 340);
  const fetchCount = numPerRow <= 3 ? 18 : numPerRow === 4 ? 16 : numPerRow * 3;

  const getUserDetails = async _account => {
    setLoading(true);
    try {
      const { data } = await getUserAccountDetails(_account);
      setUser(data);
    } catch {
      setUser({});
    }
    try {
      const { data: isFollowing } = await getFollowing(account, _account);

      if (account === undefined) {
        setFollowing(false);
      } else {
        setFollowing(isFollowing);
      }
    } catch {
      setFollowing(false);
    }
    setLoading(false);
  };

  const getFigures = async _account => {
    setFiguresFetching(true);

    try {
      const {
        data: { single, bundle, fav },
      } = await getUserFigures(_account);
      setCount(single);
      setBundleCount(bundle);
      setFavCount(fav);
    } catch {
      setCount(0);
      setBundleCount(0);
      setFavCount(0);
    }

    setFiguresFetching(false);
  };

  const fetchNFTs = async () => {
    if (tab === 0) {
      if (fetching) return;
      setFetching(true);
    } else {
      if (bundleFetching) return;
      setBundleFetching(true);
    }

    try {
      const start = tab === 0 ? tokens.current.length : bundles.current.length;
      const _count =
        fetchCount -
        ((tab === 0 ? tokens.current : bundles.current).length % numPerRow);
      const { data } = await fetchTokens(
        start,
        _count,
        tab === 0 ? 'single' : 'bundle',
        [],
        null,
        'createdAt',
        [],
        uid,
        null,
        true
      );

      if (tab === 0) {
        // eslint-disable-next-line require-atomic-updates
        tokens.current = [...tokens.current, ...data.tokens];
        setCount(data.total);
        if (authToken) {
          updateItems(tokens.current)
            .then(_tokens => (tokens.current = _tokens))
            .catch(err => console.error(err));
        }
      } else {
        // eslint-disable-next-line require-atomic-updates
        bundles.current = [...bundles.current, ...data.tokens];
        setBundleCount(data.total);
        if (authToken) {
          updateItems(bundles.current)
            .then(_bundles => (bundles.current = _bundles))
            .catch();
        }
      }

      setFetching(false);
      setBundleFetching(false);
    } catch {
      setFetching(false);
      setBundleFetching(false);
    }
  };

  const fetchLikes = async step => {
    if (fetching) return;

    setFavFetching(true);

    try {
      const { data } = await getMyLikes(step, uid);
      setFavFetching(false);
      likes.current = [...likes.current, ...data.tokens];
      setFavCount(data.total);
      if (authToken) {
        updateItems(likes.current)
          .then(_likes => (likes.current = _likes))
          .catch();
      }
      setPage(step);
    } catch {
      setFavFetching(false);
    }
  };

  useEffect(() => {
    setPrevNumPerRow(numPerRow);
    if (isNaN(numPerRow) || (prevNumPerRow && prevNumPerRow !== numPerRow))
      return;

    if (prevUID !== uid) {
      setPrevUID(uid);
      getUserDetails(uid);
      getFigures(uid);
      setTab(0);
      if (tab === 0) {
        init();
      }
    } else {
      init();
    }
  }, [prevUID, uid, tab, chainId, numPerRow]);

  useEffect(() => {
    if (me && user && me.address?.toLowerCase() === uid.toLowerCase()) {
      setUser({ ...user, ...me });
    }

    if (account === undefined) {
      setFollowing(false);
    }
  }, [me, uid, account]);

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

  useEffect(() => {
    if (fetchInterval) {
      clearInterval(fetchInterval);
    }

    updateCollections();
    setFetchInterval(setInterval(updateCollections, 1000 * 60 * 10));
    return () => clearInterval(fetchInterval);
  }, [chainId]);

  const isMe = account?.toLowerCase() === uid.toLowerCase();

  useEffect(() => {
    dispatch(HeaderActions.toggleSearchbar(true));
    setInterval(() => setNow(new Date()), 1000);
  }, []);

  const updateItems = async _tokens => {
    return new Promise((resolve, reject) => {
      if (!authToken) {
        return resolve(
          _tokens.map(tk => ({
            ...tk,
            isLiked: false,
          }))
        );
      }
      let missingTokens = _tokens.map((tk, index) =>
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

      if (missingTokens.length === 0) {
        reject();
        return;
      }

      const cancelTokenSource = axios.CancelToken.source();
      setLikeCancelSource(cancelTokenSource);
      getItemsLiked(missingTokens, authToken, cancelTokenSource.token)
        .then(({ data, status }) => {
          setLikeCancelSource(null);
          if (status === 'success') {
            const newTokens = [...tokens.current];
            missingTokens.map((tk, idx) => {
              newTokens[tk.index].isLiked = data[idx].isLiked;
            });
            resolve(newTokens);
          }
        })
        .catch(() => {
          reject();
        });
    });
  };

  useEffect(() => {
    if (likeCancelSource) {
      likeCancelSource.cancel();
    }

    if (tokens.current.length) {
      updateItems(tokens.current)
        .then(_tokens => (tokens.current = _tokens))
        .catch();
    }
    if (bundles.current.length) {
      updateItems(bundles.current)
        .then(_bundles => (bundles.current = _bundles))
        .catch();
    }
    if (likes.current.length) {
      updateItems(likes.current)
        .then(_likes => (likes.current = _likes))
        .catch();
    }
  }, [authToken]);

  const loadNextPage = () => {
    if (fetching || bundleFetching) return;

    if (tab === 0 && tokens.current.length === count) return;
    if (tab === 1 && bundles.current.length === bundleCount) return;
    if (tab === 2 && likes.current.length === favCount) return;

    if (tab === 0 || tab === 1) {
      fetchNFTs();
    } else {
      fetchLikes(page + 1);
    }
  };

  const handleScroll = e => {
    if (tab > 2) return;

    const obj = e.currentTarget;
    if (obj.scrollHeight - obj.clientHeight - obj.scrollTop < 100) {
      loadNextPage();
    }
  };

  const handleOnArtworksReachBottom = () => {
    if (tab > 2) return;
    loadNextPage();
  };

  const init = () => {
    if (tab === 0) {
      tokens.current = [];
      setCount(0);
      fetchNFTs();
    } else if (tab === 1) {
      bundles.current = [];
      setBundleCount(0);
      fetchNFTs();
    } else if (tab === 2) {
      likes.current = [];
      setFavCount(0);
      fetchLikes(0);
    } else if (tab === 3) {
      getActivity();
    } else if (tab === 4) {
      getOffersFromOthers();
    } else if (tab === 5) {
      getOffers();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopyLink = () => {
    handleClose();
    toast('success', 'Link copied to clipboard!');
  };

  const handleShareOnFacebook = () => {
    handleClose();
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
      '_blank'
    );
  };

  const handleShareToTwitter = () => {
    handleClose();
    window.open(
      `https://twitter.com/intent/tweet?text=Check%20out%20this%20account%20on%20Artion&url=${window.location.href}`,
      '_blank'
    );
  };

  const goToTab = _tab => {
    tokens.current = [];
    bundles.current = [];
    likes.current = [];

    setTab(_tab);
  };

  const getActivity = async () => {
    try {
      setActivityLoading(true);
      const { data } = await getAccountActivity(uid);
      const _activities = [];

      data.bids.map(bActivity => _activities.push(bActivity));
      data.listings.map(lActivity => _activities.push(lActivity));
      data.offers.map(oActivity => _activities.push(oActivity));
      data.sold.map(sActivity => _activities.push(sActivity));

      _activities.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      _activities.map(item => {
        item.token = getTokenByAddress(item.paymentToken);
      });
      setActivities(_activities);
      setActivityLoading(false);
    } catch {
      setActivityLoading(false);
    }
  };

  const getOffersFromOthers = async () => {
    try {
      setOffersLoading(true);
      const { data } = await getActivityFromOthers(uid);
      data.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      data.map(item => {
        item.token = getTokenByAddress(item.paymentToken);
      });
      setOffers(data);
      setOffersLoading(false);
    } catch {
      setOffersLoading(false);
    }
  };

  const getOffers = async () => {
    try {
      setBidsLoading(true);
      const { data } = await getMyOffers(uid);
      data.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      data.map(item => {
        item.token = getTokenByAddress(item.paymentToken);
      });
      setBids(data);
      setBidsLoading(false);
    } catch {
      setBidsLoading(false);
    }
  };

  const selectBanner = () => {
    fileInput.current?.click();
  };

  const handleSelectFile = e => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      const reader = new FileReader();

      reader.onload = async function(e) {
        const { data } = await updateBanner(e.target.result, authToken);
        setBannerHash(data);
      };

      reader.readAsDataURL(file);
    }
    e.target.value = null;
  };

  const openAccountSettings = () => {
    dispatch(ModalActions.showAccountModal());
  };

  // const handleCreateBundle = () => {
  //   setBundleModalVisible(true);
  // };

  const fetchFollowers = async () => {
    setFollowersLoading(true);
    try {
      const { data } = await getFollowers(uid);
      followers.current = data;
    } catch {
      followers.current = [];
    }
    setFollowersLoading(false);
  };

  const fetchFollowings = async () => {
    setFollowersLoading(true);
    try {
      const { data } = await getFollowings(uid);
      followings.current = data;
    } catch {
      followings.current = [];
    }
    setFollowersLoading(false);
  };

  const showFollowers = () => {
    if (loading || !user.followers || user.followers === 0) return;

    setFollowersModalVisible(true);
    fetchFollowers();
  };

  const showFollowings = () => {
    if (loading || !user.followings || user.followings === 0) return;

    setFollowingsModalVisible(true);
    fetchFollowings();
  };

  const followUser = async () => {
    if (followingInProgress) return;

    if (account === undefined) {
      toast('error', 'Please connect your wallet!');
      return;
    }

    setFollowingInProgress(true);
    try {
      const { status, data } = await _followUser(uid, !following, authToken);
      if (status === 'success') {
        const { data } = await getUserAccountDetails(uid);
        setUser(data);
        setFollowing(!following);
      } else {
        toast('error', data);
      }
    } catch (e) {
      console.log(e);
    }
    setFollowingInProgress(false);
  };

  const handleOnLike = async () => {
    if (tab == 2) {
      likes.current = [];
      fetchLikes(0);
    }
  };

  if (!isAddress(uid)) {
    return <Redirect to="/404" />;
  }

  return (
    <div className="overflow-hidden">
      <FollowersModal
        visible={followersModalVisible || followingsModalVisible}
        onClose={() => {
          setFollowersModalVisible(false);
          setFollowingsModalVisible(false);
        }}
        title={followersModalVisible ? 'Followers' : 'Followings'}
        users={
          followersLoading
            ? new Array(5).fill(null)
            : followersModalVisible
            ? followers.current
            : followings.current
        }
      />
      <Header />
      <AccountProfilePageHeader
        loading={loading}
        authToken={authToken}
        uid={uid}
        user={user}
        isMe={isMe}
        showFollowers={showFollowers}
        showFollowings={showFollowings}
        following={following}
        followingInProgress={followingInProgress}
        onClickFollow={followUser}
        onClickEdit={openAccountSettings}
      />
      <div className="container">
        <div className="row justify-content-center">
          {/* Left section */}
          <div className="col-lg-3 col-md-7 order-md-0 order-1">
            <div className="profile__sidebar">
              <div className="space-y-40">
                <AccountProfileAboutMeCard user={user} loading={loading} />
              </div>
              {/*<p className="text-center txt_sm mt-20 color_text">Since 2021</p>*/}
            </div>
          </div>

          {/* Right section */}
          <div ref={ref} className="col-lg-9 col-md-12 order-md-1 order-0">
            <div className="profile__content">
              <div className="d-flex justify-content-between">
                <div className="space-x-10 w-full">
                  <AccountProfileArtworkTab
                    items={TAB_ITEMS}
                    activeId={tab}
                    onChangeTab={goToTab}
                  />
                  {tab === 0 || tab === 2 ? (
                    <AccountProfileArtworksList
                      items={
                        tab === 0
                          ? tokens.current
                          : tab === 2
                          ? likes.current
                          : []
                      }
                      count={count}
                      loading={
                        tab === 0 ? fetching : tab === 2 ? favFetching : []
                      }
                      onLike={handleOnLike}
                      onReachBottom={handleOnArtworksReachBottom}
                    />
                  ) : tab === 3 ? (
                    <AccountProfileActivitiesList
                      activityLoading={activityLoading}
                      activities={activities}
                      now={now}
                    />
                  ) : tab === 4 ? (
                    <AccountProfileOffersList
                      offers={offers}
                      offersLoading={offersLoading}
                      now={now}
                    />
                  ) : tab === 5 ? (
                    <AccountProfileMyOffersList
                      bids={bids}
                      bidsLoading={bidsLoading}
                      now={now}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
