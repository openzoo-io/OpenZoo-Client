import React from 'react';
import PropTypes from 'prop-types';

import Skeleton from 'react-loading-skeleton';
import { AssetCardTwo } from './AssetCardTwo';
import { AssetCardFive } from './AssetCardFive';
import { AssetCardFour } from './AssetCardFour';
import { AssetCardThree } from './AssetCardThree';

const propTypes = {
  preset: PropTypes.oneOf('two', 'three', 'four', 'five'),
  item: PropTypes.object.isRequired,
  loading: PropTypes.object,
  style: PropTypes.object,
  onLike: PropTypes.func,
};

export function AssetCard(props) {
  if (props.preset === 'two') {
    return <AssetCardTwo {...props} />;
  } else if (props.preset === 'three') {
    return <AssetCardThree {...props} />;
  } else if (props.preset === 'four') {
    return <AssetCardFour {...props} />;
  } else if (props.preset === 'five') {
    return <AssetCardFive {...props} />;
  }
  return (
    <div className="card__item five">
      <Skeleton width="100%" height="100%" />
    </div>
  );
}

AssetCard.propTypes = propTypes;
