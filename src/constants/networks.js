import { ChainId } from '@sushiswap/sdk';

export const NETWORK_LABEL = {
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.FANTOM]: 'Fantom',
  [ChainId.FANTOM_TESTNET]: 'Fantom Testnet',
  [ChainId.MATIC]: 'Matic',
  [ChainId.MATIC_TESTNET]: 'Matic Testnet',
  [ChainId.XDAI]: 'xDai',
  [ChainId.BSC]: 'BSC',
  [ChainId.BSC_TESTNET]: 'BSC Testnet',
  [ChainId.MOONBASE]: 'Moonbase',
  [ChainId.AVALANCHE]: 'Avalanche',
  [ChainId.FUJI]: 'Fuji',
  [ChainId.HECO]: 'HECO',
  [ChainId.HECO_TESTNET]: 'HECO Testnet',
  [ChainId.HARMONY]: 'Harmony',
  [ChainId.HARMONY_TESTNET]: 'Harmony Testnet',
  888: 'Wanchain',
  999: 'Wanchain Testnet',
};

export const Contracts = {
  888: {
    auction: '0x7e408f989deD4ac3ce2AdddD96b8E518Cbdc9aa0',
    sales: '0x271b096921Fa5891D48CF2bF43F42fc32Fa69fDf',
    bundleSales: '0x23fcfcE2ec048f3e78d2c8EFfE598F81B0330C3c',
    factory: '0x94e75dD5194b4Cd800fF8DB232dE2500ee3E785f', //FantomNFTFactory
    privateFactory: '0xB628A26232F5E24B771D268C8680877DA9e8D209', //FantomNFTFactoryPrivate
    artFactory: '0x01C619F89247284268DA8837ffEE8fBb5a78eA22', //FantomArtFactory
    privateArtFactory: '0xCaa6ff4Db9a762dcdc725D69DD5d9B392A66d933', //FantomArtFactoryPrivate
  },
  999: {
    auction: '0x7e408f989deD4ac3ce2AdddD96b8E518Cbdc9aa0',
    sales: '0x271b096921Fa5891D48CF2bF43F42fc32Fa69fDf',
    bundleSales: '0x23fcfcE2ec048f3e78d2c8EFfE598F81B0330C3c',
    factory: '0x94e75dD5194b4Cd800fF8DB232dE2500ee3E785f', //FantomNFTFactory
    privateFactory: '0xB628A26232F5E24B771D268C8680877DA9e8D209', //FantomNFTFactoryPrivate
    artFactory: '0x01C619F89247284268DA8837ffEE8fBb5a78eA22', //FantomArtFactory
    privateArtFactory: '0xCaa6ff4Db9a762dcdc725D69DD5d9B392A66d933', //FantomArtFactoryPrivate
  },
};
