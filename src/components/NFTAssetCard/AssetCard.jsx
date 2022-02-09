import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Skeleton from 'react-loading-skeleton';
//import { AssetCardTwo } from './AssetCardTwo';
//import { AssetCardFive } from './AssetCardFive';
import { AssetCardFour } from './AssetCardFour';
//import { AssetCardThree } from './AssetCardThree';

//import ExampleImage from 'assets/imgs/exampleZooGenes.png';
//import faker from 'faker';
import { useApi } from 'api';
import { useSelector } from 'react-redux';
import { getRandomIPFS } from 'utils';
import { useAuctionContract } from 'contracts';
import useTokens from 'hooks/useTokens';
import { ethers } from 'ethers';
import axios from 'axios';
import {
  //useZooBoosterContract,
  useZooElixirContract,
} from 'contracts/zookeeper';
const propTypes = {
  preset: PropTypes.oneOf(['two', 'three', 'four', 'five']),
  item: PropTypes.object.isRequired,
  warnedCollections: PropTypes.array,
  loading: PropTypes.object,
  style: PropTypes.object,
  onLike: PropTypes.func,
};

// const fakerAsset = () => {
//   return {
//     contractAddress: '0x35b0b5c350b62ddee9be102b7567c4dabe52cf4f',
//     imageURL: ExampleImage,
//     name: faker.commerce.productName(),
//     price: faker.random.float({ min: 0.01, max: 999, precision: 2 }),
//     paymentToken: '0x916283cc60fdaf05069796466af164876e35d21f',
//     priceInUSD: 0,
//     supply: 1,
//     thumbnailPath: '-',
//     tokenID: 322,
//     tokenType: 721,
//     tokenURI:
//       'https://openzoo.mypinata.cloud/ipfs/QmTbgsZSGQLrFjKte9RuEK3pgwmJJqUfv5641ULxTpvq5Z',
//     liked: faker.random.number({ min: 0, max: 99 }),
//     _id: '6186d1f5dafdf997a5c07afe',
//     lastSalePrice: 10,
//     lastSalePricePaymentToken: '0x916283cc60fdaf05069796466af164876e35d21f',
//     lastSalePriceInUSD: 0,
//     isAppropriate: true,
//   };
// };

function AssetCardComponent(props) {
  const { preset, item, loading, onLike, cardHeaderClassName, warnedCollections, ...rest } = props;

  const { likeItem, likeBundle } = useApi();
  const { getAuction } = useAuctionContract();
  const { getTokenByAddress } = useTokens();
  const { authToken } = useSelector(state => state.ConnectWallet);

  const [now, setNow] = useState(new Date());
  const [fetching, setFetching] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [liked, setLiked] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [info, setInfo] = useState(null);
  const [auction, setAuction] = useState(null);
  const [zooGeneClass, setZooGeneClass] = useState(null);
  const { getElixir } = useZooElixirContract();
  const [zooElixir, setZooElixir] = useState(null);
  // TODO: delete faker code
  const _item = item && Object.keys(item).length > 0 ? item : []; ///fakerAsset();

  const auctionStarted = now.getTime() / 1000 >= auction?.startTime;

  const auctionEnded = auction?.endTime <= now.getTime() / 1000;

  const auctionActive = auctionStarted && !auctionEnded;

  useEffect(() => {
    setInterval(() => {
      setNow(new Date());
    }, 1000);
  }, []);

  useEffect(() => {
    async function fetchMyAPI() {
      if (item && !item.name) {
        await getTokenURI(item.tokenURI);
      }
      if (item) {
        if (item.imageURL) {
          // eslint-disable-next-line require-atomic-updates
          item.imageURL = getRandomIPFS(item.imageURL);
        }


        setLiked(item.liked);
        setAuction(null);
        if (item.items) {
          setAuction(null);
        } else if (item.isAuction) {
          //console.log(item);
          getCurrentAuction();
        }

        // Get Class for Collection ZooGene //
        if (item.contractAddress === '0x992e4447f470ea47819d677b84d2459677bfdadf')
        {
          await getZooGeneClass(item.tokenURI);
        }

        // Get Class for Collection ZooElixir //
        if (item.contractAddress === '0xa67213608db9d4bffac75bad01ca5b1f4ad0724c')
        {
          await getZooElixirClass(item.tokenID);
        }
      }
    }
    fetchMyAPI();
  }, [item]);

  useEffect(() => {
    if (item?.isLiked != null) {
      setIsLike(item.isLiked);
    }
  }, [item?.isLiked]);

  const getTokenURI = async tokenURI => {
    setFetching(true);
    try {
      tokenURI = getRandomIPFS(tokenURI);

      const { data } = await axios.get(tokenURI);

      if (data[Object.keys(data)[0]].image) {
        data.image = getRandomIPFS(data[Object.keys(data)[0]].image);
        data.name = data[Object.keys(data)[0]].name;
      }

      if (data.properties && data.properties.image) {
        data.image = getRandomIPFS(data.properties.image.description);
      }

      setInfo(data);
    } catch {
      setInfo(null);
    }
    setFetching(false);
  };

  const getZooGeneClass = async tokenURI => {
    
    try {
      tokenURI = getRandomIPFS(tokenURI);

      const { data } = await axios.get(tokenURI);

      if (data.attributes) {
        data.attributes.map((v) => {
          if (v.trait_type === 'Class')
            setZooGeneClass(v.value);
        });
      }

    

    } catch {
     console.log('error')
    }
    
  };

  const getZooElixirClass = async tokenID => {
    
    try {
      getElixir(tokenID).then(ret => {
        setZooElixir(ret);
        console.log('Elixir Info',ret);
        //console.log('Elixir Info',zooElixir);
      });

    } catch {
     console.log('error')
    }
    
  };

  const getCurrentAuction = async () => {
    try {
      const _auction = await getAuction(item.contractAddress, item.tokenID);
      if (_auction.endTime !== 0) {
        const token = getTokenByAddress?.(_auction.payToken);
        _auction.reservePrice = parseFloat(
          ethers.utils.formatUnits(_auction.reservePrice, token.decimals)
        );
        _auction.token = token;
        setAuction(_auction);
      }
    } catch {
      //
    }
  };

  const toggleFavorite = async () => {
    if (isLiking) return;

    setIsLiking(true);
    try {
      if (item.items) {
        const { data } = await likeBundle(item._id, authToken);
        setLiked(data);
      } else {
        const { data } = await likeItem(
          item.contractAddress,
          item.tokenID,
          authToken
        );
        setLiked(data);
      }
    } catch (err) {
      console.log('toggleFavorite err', err);
    }
    setIsLike(!isLike);
    setIsLiking(false);
  };

  const handleClickLike = async () => {
    await toggleFavorite();
    if (onLike) {
      onLike(props.item);
    }
  };

  if (preset === 'four')
  {
    return (
      <AssetCardFour
        item={_item}
        warnedCollections={warnedCollections}
        info={info}
        liked={liked}
        isLike={isLike}
        auction={auction}
        auctionActive={auctionActive}
        loading={fetching || loading}
        cardHeaderClassName={cardHeaderClassName}
        onLike={handleClickLike}
        authToken={authToken}
        zooGeneClass={zooGeneClass}
        zooElixir={zooElixir}
        {...rest}
      />
    );
  }

  // if (preset === 'two') {
  //   return (
  //     <AssetCardTwo
  //       item={_item}
  //       info={info}
  //       liked={liked}
  //       isLike={isLike}
  //       auction={auction}
  //       loading={fetching || loading}
  //       onLike={handleClickLike}
  //       {...rest}
  //     />
  //   );
  // } else if (preset === 'three') {
  //   return (
  //     <AssetCardThree
  //       item={_item}
  //       info={info}
  //       liked={liked}
  //       isLike={isLike}
  //       auction={auction}
  //       loading={fetching || loading}
  //       onLike={handleClickLike}
  //       {...rest}
  //     />
  //   );
  // } else if (preset === 'four') {
  //   return (
  //     <AssetCardFour
  //       item={_item}
  //       info={info}
  //       liked={liked}
  //       isLike={isLike}
  //       auction={auction}
  //       auctionActive={auctionActive}
  //       loading={fetching || loading}
  //       cardHeaderClassName={cardHeaderClassName}
  //       onLike={handleClickLike}
  //       authToken={authToken}
  //       {...rest}
  //     />
  //   );
  // } else if (preset === 'five') {
  //   return (
  //     <AssetCardFive
  //       item={_item}
  //       info={info}
  //       liked={liked}
  //       isLike={isLike}
  //       auction={auction}
  //       loading={fetching || loading}
  //       onLike={handleClickLike}
  //       {...rest}
  //     />
  //   );
  // }

  return (
    <div className="card__item five">
      <Skeleton width="100%" height="100%" />
    </div>
  );
}

AssetCardComponent.propTypes = propTypes;

export const AssetCard = React.memo(AssetCardComponent);
