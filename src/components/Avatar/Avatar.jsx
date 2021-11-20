import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Identicon from 'components/Identicon';
import Skeleton from 'react-loading-skeleton';

const propTypes = {
  user: PropTypes.object,
  account: PropTypes.string,
  imageSrc: PropTypes.any,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

function mapSizeToIdenticonSize(size) {
  if (size === 'sm') {
    return 32;
  } else if (size === 'md') {
    return 80;
  } else if (size === 'lg') {
    return 112;
  } else {
    return 32;
  }
}

function randomId(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function Avatar(props) {
  const accountHex =
    props.user?.address ??
    props.account ??
    React.useMemo(() => randomId(30), []);
  const sizeNum = mapSizeToIdenticonSize(props.size);

  if (props.imageSrc == null && props.user == null) {
    return (
      <Skeleton
        width={sizeNum}
        height={sizeNum}
        className={cx(
          'no-overflow',
          'avatar',
          `avatar-${props.size}`,
          props.className
        )}
      />
    );
  }

  if (props.imageSrc == null && props.user?.imageHash == null) {
    return (
      <Identicon
        account={accountHex}
        size={sizeNum}
        className={cx(
          'no-overflow',
          'avatar',
          `avatar-${props.size}`,
          props.className
        )}
      />
    );
  }

  return (
    <img
      src={
        props.imageSrc ||
        `https://openzoo.mypinata.cloud/ipfs/${props.user?.imageHash}`
      }
      alt="Avatar"
      className={cx('avatar', `avatar-${props.size}, props.className`)}
    />
  );
}

Avatar.propTypes = propTypes;
