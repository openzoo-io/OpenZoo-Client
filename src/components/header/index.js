import React, { useEffect, useState, useRef } from 'react';
import { useHistory, withRouter, NavLink, Link } from 'react-router-dom';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';
import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import WalletConnectActions from 'actions/walletconnect.actions';
import AuthActions from 'actions/auth.actions';
import ModalActions from 'actions/modal.actions';
import { getRandomIPFS } from 'utils';
import { useApi } from 'api';
import { ADMIN_ADDRESS } from 'constants/index';
import WFTMModal from 'components/WFTMModal';
import ModModal from 'components/ModModal';
import VerifyCollectionModal from 'components/VerifyCollectionModal';
import BanCollectionModal from 'components/BanCollectionModal';
import BanItemModal from 'components/BanItemModal';
import BanUserModal from 'components/BanUserModal';
import BoostCollectionModal from 'components/BoostCollectionModal';
import ConnectWalletModal from 'components/ConnectWalletModal';
import Identicon from 'components/Identicon';

import logoSmallBlue from 'assets/svgs/openzoo_icon.svg';

import styles from './styles.module.scss';
//import FilterActions from '../../actions/filter.actions';
import { HeaderAvatarMenu } from './HeaderAvatarMenu';
//import { HeaderNotificationMenu } from './HeaderNotificationMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    apiUrl,
    /*storageUrl,*/
    getAuthToken,
    getAccountDetails,
    getIsModerator,
  } = useApi();
  const { account, chainId, deactivate } = useWeb3React();

  const { user } = useSelector(state => state.Auth);
  let isSearchbarShown = useSelector(state => state.HeaderOptions.isShown);
  const { isModerator } = useSelector(state => state.ConnectWallet);
  const { wftmModalVisible, connectWalletModalVisible } = useSelector(
    state => state.Modal
  );


  const [loading, setLoading] = useState(false);
  const [searchBarActive, setSearchBarActive] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [modModalVisible, setModModalVisible] = useState(false);
  const [isBan, setIsBan] = useState(false);
  const [banCollectionModalVisible, setBanCollectionModalVisible] = useState(
    false
  );
  const [isVerify, setIsVerfiy] = useState(false);
  const [verifyCollectionModalVisible, setVerifyCollectionModalVisible] = useState(
    false
  );
  const [banItemModalVisible, setBanItemModalVisible] = useState(false);
  const [banUserModalVisible, setBanUserModalVisible] = useState(false);
  const [unbanUserModalVisible, setUnbanUserModalVisible] = useState(false);
  const [
    boostCollectionModalVisible,
    setBoostCollectionModalVisible,
  ] = useState(false);
  const [burgerActive, setBurgerActive] = useState(false);

  const [keyword, setKeyword] = useState('');
  const [cancelSource, setCancelSource] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [tokenDetailsLoading, setTokenDetailsLoading] = useState(false);
  const timer = useRef(null);

  const [DarkMode, setDarkMode] = React.useState(() => {
    const DarkValue = window.localStorage.getItem('darkmode');
    return DarkValue !== null
      ? JSON.parse(DarkValue)
      : false;
  });

  useEffect(() => {
    if (DarkMode === true) {
      document.body.classList.add('is__dark');
      window.localStorage.setItem('darkmode', true);
    }
    else {
      document.body.classList.remove('is__dark');
      window.localStorage.setItem('darkmode', false);
    }
  }, [DarkMode])

  const login = async () => {
    try {
      setLoading(true);
      const token = await getAuthToken(account);
      const isModerator = await getIsModerator(account);

      dispatch(WalletConnectActions.connectWallet(token, isModerator));
      dispatch(AuthActions.fetchStart());
      try {
        const { data } = await getAccountDetails(token);
        dispatch(AuthActions.fetchSuccess(data));
      } catch {
        dispatch(AuthActions.fetchFailed());
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const init = () => {
    login();
  };

  useEffect(() => {
    if (account) {
      init();
    } else {
      handleSignOut();
    }
  }, [account, chainId]);

  const handleConnectWallet = () => {
    dispatch(ModalActions.showConnectWalletModal());
  };

  const resetResults = () => {
    setAccounts([]);
    setCollections([]);
    setTokens([]);
    setBundles([]);
  };

  useEffect(() => {
    resetResults();
  }, [isSearchbarShown]);

  const search = async word => {
    setKeyword(word);

    if (cancelSource) {
      cancelSource.cancel();
    }

    if (word.length === 0) {
      resetResults();

      return;
    }

    try {
      const cancelTokenSource = axios.CancelToken.source();
      setCancelSource(cancelTokenSource);

      const {
        data: {
          data: { accounts, collections, tokens, bundles },
        },
      } = await axios({
        method: 'post',
        url: `${apiUrl}/info/searchNames`,
        data: JSON.stringify({ name: word }),
        headers: {
          'Content-Type': 'application/json',
        },
        cancelToken: cancelTokenSource.token,
      });

      Promise.all(
        tokens.map(async token => {
          if (token.imageURL) {
            token.imageURL = getRandomIPFS(token.imageURL);
          }

          if (token.imageURL === '-') {
            const {
              data: { image },
            } = await axios.get(token.tokenURI);

            if (image) {
              // eslint-disable-next-line require-atomic-updates
              token.imageURL = getRandomIPFS(token.imageURL);
            }
          }
        })
      );

      setAccounts(accounts);
      setCollections(collections);
      setTokenDetailsLoading(true);
      setTokens(tokens);
      setBundles(bundles);
      setTokenDetailsLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setCancelSource(null);
    }
  };

  /*
  const handleSelectCollection = addr => {
    dispatch(FilterActions.updateCollectionsFilter([addr]));
  };
  */

  const handleSearch = word => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => search(word), 500);
  };

  const handleSignOut = () => {
    deactivate();
    dispatch(WalletConnectActions.disconnectWallet());
    dispatch(AuthActions.signOut());

  };



  const handleClickBurgerMenu = () => {
    setBurgerActive(previousValue => !previousValue);
  };



  const addMod = () => {
    setIsAdding(true);
    setModModalVisible(true);

  };

  const removeMod = () => {
    setIsAdding(false);
    setModModalVisible(true);

  };

  const reviewCollections = () => {
    history.push('/collection/review');

  };

  const banCollection = () => {
    setIsBan(true);
    setBanCollectionModalVisible(true);

  };

  const unbanCollection = () => {
    setIsBan(false);
    setBanCollectionModalVisible(true);

  };

  const verifyCollection = () => {
    setIsVerfiy(true);
    setVerifyCollectionModalVisible(true);

  };

  const unverifyCollection = () => {
    setIsVerfiy(false);
    setVerifyCollectionModalVisible(true);

  };

  const banItems = () => {
    setBanItemModalVisible(true);

  };

  const banUser = () => {
    setBanUserModalVisible(true);

  };

  const unbanUser = () => {
    setUnbanUserModalVisible(true);

  };

  const boostCollection = () => {
    setBoostCollectionModalVisible(true);

  };



  const renderSearchBox = () => (
    <div className={cx(styles.searchcont)}>
      <div className={styles.searchcontinner}>
        <div className={cx('header__search', styles.searchWrapper)}>
          <input
            type="text"
            placeholder="Search items, collections and accounts"
            onChange={e => handleSearch(e.target.value)}
            onFocus={() => setSearchBarActive(true)}
            onBlur={() => setTimeout(() => setSearchBarActive(false), 200)}
          />
          <button className="header__result">
            <i className="ri-search-line"></i>
          </button>
        </div>

        {renderSearchResult()}
      </div>
    </div>
  );

  const renderSearchResult = () => {
    if (!searchBarActive || keyword.length === 0) {
      return null;
    }

    return (
      <div className={cx('shadow', styles.resultcont)}>
        {collections.length > 0 && (
          <div className={styles.resultsection}>
            <div className={styles.resultsectiontitle}>Collections</div>
            <div className={styles.separator} />
            <div className={styles.resultlist}>
              {collections.map((collection, idx) => (
                <Link
                  key={idx}
                  className={styles.result}
                  to={'/collection/' + collection.erc721Address}
                >
                  <img
                    className={styles.resultimg}
                    src={`${getRandomIPFS('', true)}${collection.logoImageHash
                      }`}
                  />
                  <div className={styles.resulttitle}>
                    {collection.collectionName} {collection?.isVerified && <img src="/verified.svg"/>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        {accounts.length > 0 && (
          <div className={styles.resultsection}>
            <div className={styles.resultsectiontitle}>Accounts</div>
            <div className={styles.separator} />
            <div className={styles.resultlist}>
              {accounts.map((account, idx) => (
                <Link
                  to={`/account/${account.address}`}
                  key={idx}
                  className={styles.result}
                >
                  {account.imageHash ? (
                    <img
                      className={styles.resultimg}
                      src={`https://openzoo.mypinata.cloud/ipfs/${account.imageHash}`}
                    />
                  ) : (
                    <Identicon
                      className={styles.resultimg}
                      account={account.address}
                      size={40}
                    />
                  )}
                  <div className={styles.resulttitle}>{account.alias}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
        {tokens.length > 0 && (
          <div className={styles.resultsection}>
            <div className={styles.resultsectiontitle}>Items</div>
            <div className={styles.separator} />
            <div className={styles.resultlist}>
              {tokens.map((tk, idx) => (
                <Link
                  to={`/explore/${tk.contractAddress}/${tk.tokenID}`}
                  key={idx}
                  className={styles.result}
                >
                  <div className={styles.resultimg}>
                    {tokenDetailsLoading ? (
                      <Skeleton width={40} height={40} />
                    ) : (
                      tk.thumbnailPath && <><img src={tk.imageURL} /></>

                    )}
                    {/*
                      (tk.thumbnailPath.length > 10 ? (
                        <img src={`${storageUrl}/image/${tk.thumbnailPath}`} />
                      ) : tk.thumbnailPath === '.' ? (
                        <img src={tk.imageURL} />
                      ) : null)
                      */}
                  </div>
                  <div className={styles.resulttitle}>{tk.name}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
        {bundles.length > 0 && (
          <div className={styles.resultsection}>
            <div className={styles.resultsectiontitle}>Bundles</div>
            <div className={styles.separator} />
            <div className={styles.resultlist}>
              {bundles.map((bundle, idx) => (
                <Link
                  to={`/bundle/${bundle._id}`}
                  key={idx}
                  className={styles.result}
                >
                  <div className={styles.resultimg}></div>
                  <div className={styles.resulttitle}>{bundle.name}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
        {keyword.length > 0 &&
          collections.length === 0 &&
          accounts.length === 0 &&
          tokens.length === 0 &&
          bundles.length === 0 && (
            <div className={styles.noResults}>No Results</div>
          )}

      </div>
    );
  };

  return (
    <header className={cx('header__1', 'js-header', styles.header)}>
      <div className={'container'}>
        <div className={'wrapper js-header-wrapper'}>
          <div className="header__logo">
            <Link to="/" className={'header__logo'}>
              <img src={logoSmallBlue} alt="logo" />
            </Link>
          </div>
          <div className={cx('header__menu', styles.left)}>
            <ul className="d-flex space-x-20">

              <li>
                <NavLink
                  to="/home"
                  className={'color_black'}
                  activeClassName={'color_info'}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/explore"
                  className={'color_black'}
                  activeClassName={styles.active}
                >
                  Explore
                </NavLink>
              </li>
              {/* 
              <li>
                <NavLink
                  to="/collections"
                  className={'color_black'}
                  activeClassName={styles.active}
                >
                  Collections
                </NavLink>
              </li>
              */}
            </ul>
          </div>
          {renderSearchBox()}
          <div className={cx('header__menu')}>
            <ul className="d-flex space-x-20">
              <li>
                <div className={styles.darkmodeToggle}>
                  <span style={{ marginRight: 5, display: 'flex' }}>
                    <FontAwesomeIcon icon={faSun} />
                  </span>
                  <input
                    id="darkmode-toggle"
                    type="checkbox"
                    checked={DarkMode}
                    onChange={() => {
                      setDarkMode(!DarkMode);
                    }}
                  />
                  <label
                    style={{ marginBottom: 0 }}
                    className="toggle"
                    htmlFor={`darkmode-toggle`}
                  >
                    Toggle
                  </label>
                  <span style={{ marginLeft: 5, display: 'flex' }}>
                    <FontAwesomeIcon icon={faMoon} />
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center space-x-20 sm:space-x-10">

            {account ? (
              <>
                {/*<HeaderNotificationMenu />*/}
                <HeaderAvatarMenu
                 
                  user={user}
                  loading={loading}
                  isAdmin={
                    account?.toLowerCase() && ADMIN_ADDRESS.includes(account?.toLowerCase())
                  }
                  isModerator={isModerator}
                  onClickSignOut={handleSignOut}
                  addMod={addMod}
                  removeMod={removeMod}
                  reviewCollections={reviewCollections}
                  banCollection={banCollection}
                  unbanCollection={unbanCollection}
                  verifyCollection={verifyCollection}
                  unverifyCollection={unverifyCollection}
                  banItems={banItems}
                  banUser={banUser}
                  unbanUser={unbanUser}
                  boostCollection={boostCollection}
                />
                <div className="header__btns">
                  <NavLink
                    to="/create"
                    className={'btn btn-warning btn-sm'}
                    activeClassName={styles.active}
                  >
                    Create
                  </NavLink>
                </div>
              </>
            ) : (
              <div className="header__btns">
                <a
                  className="btn btn-warning btn-sm"
                  onClick={handleConnectWallet}
                >
                  <i className="ri-wallet-3-line"></i>
                  Connect wallet
                </a>
              </div>
            )}
            <div
              className={cx('header__burger', burgerActive && 'active')}
              onClick={handleClickBurgerMenu}
            ></div>
          </div>

          <div
            className={cx(
              'header__mobile js-header-mobile shadow-sm',
              burgerActive && 'visible'
            )}
          >
            <div className="header__mobile__menu space-y-20">
              <ul className="d-flex space-y-20">
                <li>
                  <NavLink className="color_black" to="/home">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink className="color_black" to="/explore">
                    Explore
                  </NavLink>
                </li>
                {
                  /*
                <li>
                  <NavLink className="color_black" to="/collections">
                    Collections
                  </NavLink>
                </li>
                */
                }
                <li>
                <div className={styles.darkmodeToggle}>
                  <span style={{ marginRight: 5, display: 'flex' }}>
                    <FontAwesomeIcon icon={faSun} />
                  </span>
                  <input
                    id="darkmode-toggle"
                    type="checkbox"
                    checked={DarkMode}
                    onChange={() => {
                      setDarkMode(!DarkMode);
                    }}
                  />
                  <label
                    style={{ marginBottom: 0 }}
                    className="toggle"
                    htmlFor={`darkmode-toggle`}
                  >
                    Toggle
                  </label>
                  <span style={{ marginLeft: 5, display: 'flex' }}>
                    <FontAwesomeIcon icon={faMoon} />
                  </span>
                </div>
              </li>
              </ul>
              {account ? (
                <div className="col-md-12 col-sm-12">
                  <Link
                    to="/create"
                    className={'btn btn-warning w-full'}
                    activeClassName={styles.active}
                  >
                    Create
                  </Link>
                </div>
              ) : (
                <a
                  className="btn btn-warning w-full"
                  onClick={handleConnectWallet}
                >
                  Connect wallet
                </a>
              )}
              <div className="space-y-20">
                <div className="header__search in_mobile w-full">
                  <input
                    type="text"
                    placeholder="Search"
                    onChange={e => handleSearch(e.target.value)}
                    onFocus={() => setSearchBarActive(true)}
                    onBlur={() =>
                      setTimeout(() => setSearchBarActive(false), 200)
                    }
                  />
                  <button className="header__result">
                    <i className="ri-search-line"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="header__mobile__menu">{renderSearchResult()}</div>
          </div>

          <WFTMModal
            visible={wftmModalVisible}
            onClose={() => dispatch(ModalActions.hideWFTMModal())}
          />
          <ModModal
            isAdding={isAdding}
            visible={modModalVisible}
            onClose={() => setModModalVisible(false)}
          />
          <VerifyCollectionModal
            visible={verifyCollectionModalVisible}
            isVerify={isVerify}
            onClose={() => setVerifyCollectionModalVisible(false)}
          />
          <BanCollectionModal
            visible={banCollectionModalVisible}
            isBan={isBan}
            onClose={() => setBanCollectionModalVisible(false)}
          />
          <BanItemModal
            visible={banItemModalVisible}
            onClose={() => setBanItemModalVisible(false)}
          />
          <BanUserModal
            visible={banUserModalVisible}
            onClose={() => setBanUserModalVisible(false)}
            isForBanning={true}
          />
          <BanUserModal
            visible={unbanUserModalVisible}
            onClose={() => setUnbanUserModalVisible(false)}
            isForBanning={false}
          />
          <BoostCollectionModal
            visible={boostCollectionModalVisible}
            onClose={() => setBoostCollectionModalVisible(false)}
          />
          <ConnectWalletModal
            visible={connectWalletModalVisible}
            onClose={() => dispatch(ModalActions.hideConnectWalletModal())}
          />
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
