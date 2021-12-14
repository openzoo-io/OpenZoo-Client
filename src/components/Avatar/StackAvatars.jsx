import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from './Avatar';
import { Link } from 'react-router-dom';
import { shortenAddress } from 'utils';

const propTypes = {
  users: PropTypes.array,
  size: PropTypes.oneOf(['sm', 'md']).isRequired,
};

export function StackAvatars(props) {
  const latestUser =
    props.users != null &&
    props.users.length > 0 &&
    props.users[props.users.length - 1];

  return (
    <Link
      to={`/account/${latestUser?.address}`}
      className="creators space-x-10"
    >
      <div className="avatars -space-x-20">
        {props.users?.map((user, index) => (
          <Avatar
            key={`avatar-stack-${index.toString()}`}
            size="sm"
            user={user}
          />
        ))}
      </div>
      <p className="avatars_name txt_sm">
        {latestUser?.alias || shortenAddress(latestUser?.address) || 'Unnamed'}
      </p>
    </Link>
  );
}

StackAvatars.propTypes = propTypes;
StackAvatars.defaultProps = {
  size: 'sm',
};
