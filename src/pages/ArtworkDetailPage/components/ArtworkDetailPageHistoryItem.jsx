import { Avatar } from 'components/Avatar';
import React from 'react';
import PropTypes from 'prop-types';

import Badge from 'assets/imgs/icons/Badge.svg';
import { Link } from 'react-router-dom';
import { formatNumber } from 'utils';

const propTypes = {
  user: PropTypes.object,
  dateTime: PropTypes.string,
  price: PropTypes.number,
};

export function ArtworkDetailPageHistoryItem(props) {
  const userUrl = props.user ? `/account/${props.user?.address}` : '#';

  return (
    <div className="creator_item creator_card space-x-10">
      <div className="avatars space-x-10">
        <div className="media">
          <div className="badge">
            <img src={Badge} alt="" />
          </div>
          <Link to={userUrl}>
            <Avatar user={props.user} size="md" />
          </Link>
        </div>
        <div>
          <p className="color_black">
            Bid accepted{' '}
            <span className="color_brand">
              {formatNumber((props.price ?? 0).toFixed(2))}
            </span>{' '}
            by{' '}
            <Link className="color_black txt _bold" to={userUrl}>
              {props.user?.name ?? 'unnamed'}
            </Link>
          </p>
          <span className="date color_text">{props.dateTime ?? ''}</span>
        </div>
      </div>
    </div>
  );
}

ArtworkDetailPageHistoryItem.propTypes = propTypes;
