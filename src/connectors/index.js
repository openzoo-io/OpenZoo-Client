// import { ChainId } from '@sushiswap/sdk';
import { InjectedConnector } from '@web3-react/injected-connector';
//import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
//import { Wallet } from 'ethers';
import { NetworkConnector } from './NetworkConnector';

//import ARTION_LOGO_URL from '../assets/svgs/logo_blue.svg';

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

const RPC = isMainnet
  ? {
    [888]: 'https://gwan-ssl.wandevs.org:56891',
  }
  : {
    [999]: 'https://gwan-ssl.wandevs.org:46891',
  };

export const network = new NetworkConnector({
  defaultChainId: 888,
  urls: RPC,
});

export const injected = new InjectedConnector({
  supportedChainIds: isMainnet
    ? [
      888, // fantom
    ]
    : [
      999, // fantom testnet
    ],
});

export const walletconnect = new WalletConnectConnector({
  infuraId: '326fb0397704475abffcfa9ca9c0ee5a',
  rpcUrl: 'https://gwan-ssl.wandevs.org:56891',
  chainId: 888,
  networkId: 888,
  rpc: {
    888: 'https://gwan-ssl.wandevs.org:56891',
    999: 'https://gwan-ssl.wandevs.org:46891',
  },
  bridge: 'https://derelay.rabby.io'
});

// export const walletlink = new WalletLinkConnector({
//   url: 'https://rpc.zookeeper.finance',
//   appName: 'OpenZoo',
//   appLogoUrl: ARTION_LOGO_URL,
// });
