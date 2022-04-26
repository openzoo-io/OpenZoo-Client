// import { ChainId } from '@sushiswap/sdk';
import { InjectedConnector } from '@web3-react/injected-connector';
//import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import {WalletConnectConnector} from '@web3-react/walletconnect-connector';
//import { Wallet } from 'ethers';
import { NetworkConnector } from './NetworkConnector';

//import ARTION_LOGO_URL from '../assets/svgs/logo_blue.svg';

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

const RPC = isMainnet
  ? {
      [888]: 'https://rpc.zookeeper.finance',
    }
  : {
      [999]: 'https://rpc.zookeeper.finance/testnet',
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
  url: 'https://rpc.zookeeper.finance',
  appName: 'OpenZoo',
});

// export const walletlink = new WalletLinkConnector({
//   url: 'https://rpc.zookeeper.finance',
//   appName: 'OpenZoo',
//   appLogoUrl: ARTION_LOGO_URL,
// });
