import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import cx from 'classnames';

import Identicon from 'components/Identicon';
import { shortenAddress } from 'utils';
import { useDetectOutsideRef } from 'hooks/useDetectOutsideRef';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tooltip } from '@material-ui/core';

import WWAN_IMAGE from 'assets/imgs/wwan.png';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
//import { useDispatch } from 'react-redux';
//import ModalActions from 'actions/modal.actions';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { /*useWFTMContract,*/ useNFTContract } from 'contracts';
import { formatNumber } from 'utils';

const propTypes = {
  user: PropTypes.object,
  account: PropTypes.string,
  loading: PropTypes.bool,
  isAdmin: PropTypes.bool,
  isModerator: PropTypes.bool,
  onClick: PropTypes.func,
  onClickSignOut: PropTypes.func,
};

export function HeaderAvatarMenu(props) {
  //const coinCurrency = 'ZOO';
  const { getERC20Contract } = useNFTContract();
  //const dispatch = useDispatch();
  const { account, chainId } = useWeb3React();
  //const { getWFTMBalance } = useWFTMContract();

  const styles = useStyle();

  const [balance, setBalance] = useState(0);
  const [zooBalance, setZooBalance] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [gettingBalance, setGettingBalance] = useState(false);

  const wrapperRef = useDetectOutsideRef(() => {
    setMenuVisible(false);
  });

  React.useEffect(() => {
    getBalances();
  }, [account, chainId]);

  const parseBalance = (bal, fractionDigits = 2) => {
    return bal.toFixed(fractionDigits);
  };

  const getBalances = async () => {
    setGettingBalance(true);

    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const ZOO_ADDRESS = {
      888: '0x6e11655d6aB3781C6613db8CB1Bc3deE9a7e111F',
      999: '0x890589dC8BD3F973dcAFcB02b6e1A133A76C8135',
    };

    const zooContract = await getERC20Contract(ZOO_ADDRESS[chainId]);

    let [ftmBal, /*wftmBal,*/ zooBal] = await Promise.all([
      await provider.getBalance(account),
      // await getWFTMBalance(account),
      await zooContract.balanceOf(account),
    ]);

    setBalance(parseFloat(ftmBal.toString()) / 10 ** 18);
    setZooBalance(parseFloat(zooBal.toString()) / 10 ** 18);

    // setWrappedBalance(parseFloat(wftmBal.toString()) / 10 ** 18);

    setGettingBalance(false);

    return [
      parseFloat(ftmBal.toString()) / 10 ** 18,
      //parseFloat(wftmBal.toString()) / 10 ** 18,
    ];
  };

  // handle event methods
  const handleOnClick = () => {
    setMenuVisible(oldValue => !oldValue);
    // props.onClick(e);
  };

  const handleCopyAddress = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleOnMouseOverCopy = on => () => {
    setTooltipOpen(on);
  };

  /*
  const handleOpenWrapStation = () => {
    dispatch(ModalActions.showWFTMModal());
  };
  */

  return (
    <div
      className="header__avatar"
      onClick={handleOnClick}
      ref={wrapperRef}
      style={{ overflow: 'hidden' }}
    >
      <div className="price">
        {gettingBalance ? (
          <Skeleton width={100} height="100%" />
        ) : (
          <span>
            <img src="/zoo32x32.png" />{' '}
            {formatNumber(parseBalance(zooBalance), 2)}
          </span>
        )}
      </div>
      {props.loading ? (
        <Skeleton className={'avatar'} />
      ) : props.user?.imageHash ? (
        <img
          className="avatar"
          src={`https://openzoo.mypinata.cloud/ipfs/${props.user?.imageHash}`}
          alt="avatar"
        />
      ) : (
        <Identicon account={account} size={40} className={styles.avatar} />
      )}

      <div
        className={cx(
          'avatar_popup space-y-20 shadow',
          menuVisible && 'visible'
        )}
      >
        <CopyToClipboard text={account} onCopy={handleCopyAddress}>
          <div className="d-flex align-items-center justify-content-between">
            <Tooltip
              title={copied ? 'Copied!' : 'Copy'}
              open={tooltipOpen}
              arrow
            >
              <span className="color_text">{shortenAddress(account, 7)}</span>
            </Tooltip>
            <button
              className="btn btn-link ml-2"
              onMouseOver={handleOnMouseOverCopy(true)}
              onMouseLeave={handleOnMouseOverCopy(false)}
            >
              <i className="ri-file-copy-line"></i>
            </button>
          </div>
        </CopyToClipboard>
        <div className="d-flex align-items-center space-x-10">
          <img
            className={cx('coin', styles.coinImage)}
            src={WWAN_IMAGE}
            alt="/"
          />
          <div className="info">
            <p className="text-sm font-book text-gray-400">Balance</p>
            <p className="w-full text-sm font-bold text-green-500">{`${parseBalance(
              balance
            )} WAN`}</p>
          </div>
        </div>
        <div className="hr"></div>
        <div className="links space-y-10">
          <Link to={`/account/${account}`}>
            <i className="ri-user-line"></i> <span> My Profile</span>
          </Link>
          <Link to="/settings/notification">
            <i className="ri-notification-2-line"></i>{' '}
            <span> Notification Settings</span>
          </Link>
          <Link to="/collection/create">
            <i className="ri-add-line"></i> <span> Create New Collection</span>
          </Link>

          {/*
          <a onClick={handleOpenWrapStation}>
            <i className="ri-refresh-fill"></i> <span> WAN / WWAN Station</span>
          </a>
          */}

          {(props.isAdmin || props.isModerator) && (
            <div className="hr mt-2"></div>
          )}

          {props.isAdmin && (
            <Link to="/collection/register">
              <i className="ri-edit-line"></i>{' '}
              <span> Register Existing Collection</span>
            </Link>
          )}

          {props.isAdmin && (
            <>
              <div className="cursor-pointer" onClick={props.addMod}>
                <i className="ri-user-add-line"></i> <span> Add Mod</span>
              </div>
              <div className="cursor-pointer" onClick={props.removeMod}>
                <i className="ri-user-unfollow-line"></i>{' '}
                <span> Remove Mod</span>
              </div>
              <div className="cursor-pointer" onClick={props.reviewCollections}>
                <span> Review Collections</span>
              </div>
            </>
          )}
          {(props.isAdmin || props.isModerator) && (
            <>
              <div className="cursor-pointer" onClick={props.verifyCollection}>
                <span>Verify Collection</span>
              </div>

              <div
                className="cursor-pointer"
                onClick={props.unverifyCollection}
              >
                <span>Un-Verfiy Collection</span>
              </div>

              <div className="cursor-pointer" onClick={props.banCollection}>
                <span>Ban Collection</span>
              </div>

              {props.isAdmin && (
                <div className="cursor-pointer" onClick={props.unbanCollection}>
                  <span>Unban Collection</span>
                </div>
              )}

              <div className="cursor-pointer" onClick={props.banItems}>
                <span>Ban Items</span>
              </div>
              <div className="cursor-pointer" onClick={props.banUser}>
                <span>Ban a user</span>
              </div>
              <div className="cursor-pointer" onClick={props.unbanUser}>
                <span>Unban a user</span>
              </div>
            </>
          )}
          {props.isAdmin && (
            <div className="cursor-pointer" onClick={props.boostCollection}>
              <span>Boost Collection</span>
            </div>
          )}

          {(props.isAdmin || props.isModerator) && (
            <div className="hr mt-2"></div>
          )}


          <a onClick={props.onClickSignOut}>
            <i className="ri-logout-circle-line"></i> <span> Logout</span>
          </a>
        </div>
      </div>
    </div>
  );
}

const useStyle = makeStyles(() => ({
  avatar: {
    height: '2.4rem',
    width: '2.4rem',
    borderRadius: '2000px',
    objectFit: 'cover',
    overflow: 'hidden',
  },
  coinImage: {
    width: 36,
    height: 36,
  },
  darkmodeToggle: {
    display: 'flex',
    alignItems: 'center',
  },
}));

HeaderAvatarMenu.propTypes = propTypes;
