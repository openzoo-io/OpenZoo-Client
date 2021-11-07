import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

import styles from './styles.module.scss';
import Identicon from 'components/Identicon';

const propsType = {
  user: PropTypes.object,
  account: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

export function HeaderAvatarMenu(props) {
  // TODO: define data
  const balance = 25.2;
  const coinCurrency = 'ETH';

  const wrapperRef = useRef(null);

  return (
    <div className="header__avatar" onClick={props.onClick} ref={wrapperRef}>
      {balance != null && balance !== '' && (
        <div className="price">
          <span>
            {balance} <strong>{coinCurrency}</strong>{' '}
          </span>
        </div>
      )}
      {props.loading ? (
        <Skeleton className={'avatar'} />
      ) : props.user?.imageHash ? (
        <img
          className="avatar"
          src={`https://openzoo.mypinata.cloud/ipfs/${props.props.user?.imageHash}`}
          alt="avatar"
        />
      ) : (
        <Identicon
          account={'13b9ebda035r178'}
          size={40}
          className={styles.avatar}
        />
      )}
    </div>
  );
}

HeaderAvatarMenu.propsType = propsType;
