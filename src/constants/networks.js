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
    zooBooster: '0x38034B2E6ae3fB7FEC5D895a9Ff3474bA0c283F6',
    zooElixir: '0xA67213608Db9D4BFFAc75baD01Ca5B1f4ad0724c',
    zooAlchemy: '0x23A9f34aa1e45f9E191A6615d24A781607a1bcb1'
  },
  999: {
    auction: '0x7e408f989deD4ac3ce2AdddD96b8E518Cbdc9aa0',
    sales: '0x271b096921Fa5891D48CF2bF43F42fc32Fa69fDf',
    bundleSales: '0x23fcfcE2ec048f3e78d2c8EFfE598F81B0330C3c',
    factory: '0x94e75dD5194b4Cd800fF8DB232dE2500ee3E785f', //FantomNFTFactory
    privateFactory: '0xB628A26232F5E24B771D268C8680877DA9e8D209', //FantomNFTFactoryPrivate
    artFactory: '0x01C619F89247284268DA8837ffEE8fBb5a78eA22', //FantomArtFactory
    privateArtFactory: '0xCaa6ff4Db9a762dcdc725D69DD5d9B392A66d933', //FantomArtFactoryPrivate
    zooBooster: '0xbCF9F4fae90dA7c4BB05DA6f9E9A9A39dc5Ce979',
    zooElixir: '0xDe3f8DA0Cf18b4ddc5e2f3d94ca3694c241507Bd',
    zooAlchemy: '0x910A1a6b133A6A869141722872Eb19609A16B511'
  },
};
