import React from 'react';
import PropTypes from 'prop-types';

import Skeleton from 'react-loading-skeleton';
import { AssetCardTwo } from './AssetCardTwo';
import { AssetCardFive } from './AssetCardFive';
import { AssetCardFour } from './AssetCardFour';
import { AssetCardThree } from './AssetCardThree';

import ExampleImage from 'assets/imgs/exampleZooGenes.png';
import faker from 'faker';

const propTypes = {
  preset: PropTypes.oneOf('two', 'three', 'four', 'five'),
  item: PropTypes.object.isRequired,
  loading: PropTypes.object,
  style: PropTypes.object,
  onLike: PropTypes.func,
};

const fakerAsset = () => {
  return {
    contractAddress: '0x35b0b5c350b62ddee9be102b7567c4dabe52cf4f',
    imageURL: ExampleImage,
    name: faker.commerce.productName(),
    price: faker.random.float({ min: 0.01, max: 999, precision: 2 }),
    paymentToken: '0x916283cc60fdaf05069796466af164876e35d21f',
    priceInUSD: 0,
    supply: 1,
    thumbnailPath: '-',
    tokenID: 322,
    tokenType: 721,
    tokenURI:
      'https://openzoo.mypinata.cloud/ipfs/QmTbgsZSGQLrFjKte9RuEK3pgwmJJqUfv5641ULxTpvq5Z',
    liked: faker.random.number({ min: 0, max: 99 }),
    _id: '6186d1f5dafdf997a5c07afe',
    lastSalePrice: 10,
    lastSalePricePaymentToken: '0x916283cc60fdaf05069796466af164876e35d21f',
    lastSalePriceInUSD: 0,
    isAppropriate: true,
  };
};

function AssetCardComponent(props) {
  const { preset, item, ...rest } = props;

  // TODO: delete faker code
  const _item = item && Object.keys(item).length > 0 ? item : fakerAsset();

  if (preset === 'two') {
    return <AssetCardTwo item={_item} {...rest} />;
  } else if (preset === 'three') {
    return <AssetCardThree item={_item} {...rest} />;
  } else if (preset === 'four') {
    return <AssetCardFour item={_item} {...rest} />;
  } else if (preset === 'five') {
    return <AssetCardFive item={_item} {...rest} />;
  }

  return (
    <div className="card__item five">
      <Skeleton width="100%" height="100%" />
    </div>
  );
}

AssetCardComponent.propTypes = propTypes;

export const AssetCard = React.memo(AssetCardComponent);
