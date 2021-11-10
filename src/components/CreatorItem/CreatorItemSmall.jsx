import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'components/Avatar';
import { NavLink } from 'react-router-dom';
import { shortenAddress } from 'utils';

const propTypes = {
  user: PropTypes.object.isRequired,
  rank: PropTypes.number,
  price: PropTypes.number,
};

export function CreatorItemSmall(props) {
  return (
    <div className="creator_item space-x-10">
      <div className="avatars space-x-10">
        <div className="media">
          <NavLink to={`/account/${props.user?.address}`}>
            <Avatar size="md" user={props.user} />
          </NavLink>
          {props.rank && <div className="has_number">{props.rank}</div>}
        </div>
        <div>
          <NavLink to={`/account/${props.user?.address}`}>
            <p className="avatars_name color_black">
              {props.user?.alias ||
                shortenAddress(props.user?.address) ||
                'Unnamed'}
            </p>
          </NavLink>
          <span className="price color_green">
            {`${props.price ?? '0'} ETH`}
          </span>
        </div>
      </div>
    </div>
  );
}

CreatorItemSmall.propTypes = propTypes;
