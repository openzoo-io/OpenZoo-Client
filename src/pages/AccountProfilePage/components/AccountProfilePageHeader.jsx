import React, { useState } from 'react';

import { Avatar } from 'components/Avatar';
import { ShareButton } from 'components/ShareButton';
import { ReportButton } from 'components/ReportButton';
import { Tooltip } from '@material-ui/core';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import PropTypes from 'prop-types';
import { shortenAddress } from 'utils';
import Skeleton from 'react-loading-skeleton';
import { ClipLoader } from 'react-spinners';

const propTypes = {
  loading: PropTypes.bool,
  coverImg: PropTypes.string,
  isMe: PropTypes.bool.isRequired,
  user: PropTypes.object,
  uid: PropTypes.string.isRequired,
  following: PropTypes.bool.isRequired,
  followingInProgress: PropTypes.bool.isRequired,
  onClickFollow: PropTypes.func,
};

export function AccountProfilePageHeader(props) {
  const {
    uid,
    loading,
    coverImg,
    user,
    isMe,
    following,
    followingInProgress,
    onClickFollow,
  } = props;

  const [copied, setCopied] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleOnMouseOverCopy = on => () => {
    setTooltipOpen(on);
  };

  const handleCopyAddress = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="md:mb-30 mb-100">
      <div className="hero__profile">
        <div className="cover">
          {loading ? (
            <Skeleton width="100%" height="100%" />
          ) : (
            <img src={coverImg} alt="" />
          )}
        </div>
        <div className="infos">
          <div className="container">
            <div className="row flex-wrap align-items-center justify-content-between">
              <div className="col-md-auto mr-20">
                <div className="avatars d-flex space-x-20 align-items-center">
                  <div className="avatar_wrap">
                    <Avatar account={uid} size="lg" user={user} />
                  </div>
                  <h5>{user?.alias ?? 'unnamed'}</h5>
                </div>
              </div>
              <div className="col-md-auto">
                <div className="d-flex flex-wrap align-items-center space-x-20 mb-20_reset">
                  <div className="mb-20">
                    <CopyToClipboard text={uid} onCopy={handleCopyAddress}>
                      <div className="copy">
                        <Tooltip
                          title={copied ? 'Copied!' : 'Copy'}
                          open={tooltipOpen}
                          arrow
                          // classes={{ tooltip: styles.tooltip }}
                        >
                          <span className="color_text">
                            {shortenAddress(uid)}
                          </span>
                        </Tooltip>
                        <div
                          onMouseOver={handleOnMouseOverCopy(true)}
                          onMouseLeave={handleOnMouseOverCopy(false)}
                        >
                          <i className="cursor-pointer ri-file-copy-line color_text"></i>
                        </div>
                      </div>
                    </CopyToClipboard>
                  </div>
                  <div className="d-flex flex-wrap align-items-center space-x-20">
                    {!isMe && (
                      <div className="mb-20">
                        <button
                          className="btn btn-dark btn-sm"
                          onClick={onClickFollow}
                        >
                          {followingInProgress ? (
                            <ClipLoader color="#FFF" size={14} />
                          ) : following ? (
                            'Unfollow'
                          ) : (
                            'Follow'
                          )}
                        </button>
                      </div>
                    )}
                    <div className="mb-20">
                      <ShareButton />
                    </div>
                    <div className="mb-20">
                      <ReportButton />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AccountProfilePageHeader.propTypes = propTypes;
