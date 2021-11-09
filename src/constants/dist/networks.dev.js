"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Contracts = exports.NETWORK_LABEL = void 0;

var _sdk = require("@sushiswap/sdk");

var _NETWORK_LABEL;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NETWORK_LABEL = (_NETWORK_LABEL = {}, _defineProperty(_NETWORK_LABEL, _sdk.ChainId.MAINNET, 'Ethereum'), _defineProperty(_NETWORK_LABEL, _sdk.ChainId.RINKEBY, 'Rinkeby'), _defineProperty(_NETWORK_LABEL, _sdk.ChainId.ROPSTEN, 'Ropsten'), _defineProperty(_NETWORK_LABEL, _sdk.ChainId.GÖRLI, 'Görli'), _defineProperty(_NETWORK_LABEL, _sdk.ChainId.KOVAN, 'Kovan'), _defineProperty(_NETWORK_LABEL, _sdk.ChainId.FANTOM, 'Fantom'), _defineProperty(_NETWORK_LABEL, _sdk.ChainId.FANTOM_TESTNET, 'Fantom Testnet'), _defineProperty(_NETWORK_LABEL, _sdk.ChainId.MATIC, 'Matic'), _defineProperty(_NETWORK_LABEL, _sdk.ChainId.MATIC_TESTNET, 'Matic Testnet'), _defineProperty(_NETWORK_LABEL, _sdk.ChainId.XDAI, 'xDai'), _defineProperty(_NETWORK_LABEL, _sdk.ChainId.BSC, 'BSC'), _defineProperty(_NETWORK_LABEL, _sdk.ChainId.BSC_TESTNET, 'BSC Testnet'), _defineProperty(_NETWORK_LABEL, _sdk.ChainId.MOONBASE, 'Moonbase'), _defineProperty(_NETWORK_LABEL, _sdk.ChainId.AVALANCHE, 'Avalanche'), _defineProperty(_NETWORK_LABEL, _sdk.ChainId.FUJI, 'Fuji'), _defineProperty(_NETWORK_LABEL, _sdk.ChainId.HECO, 'HECO'), _defineProperty(_NETWORK_LABEL, _sdk.ChainId.HECO_TESTNET, 'HECO Testnet'), _defineProperty(_NETWORK_LABEL, _sdk.ChainId.HARMONY, 'Harmony'), _defineProperty(_NETWORK_LABEL, _sdk.ChainId.HARMONY_TESTNET, 'Harmony Testnet'), _defineProperty(_NETWORK_LABEL, 888, 'Wanchain'), _defineProperty(_NETWORK_LABEL, 999, 'Wanchain Testnet'), _NETWORK_LABEL);
exports.NETWORK_LABEL = NETWORK_LABEL;
var Contracts = {
  888: {
    auction: '0x7e408f989deD4ac3ce2AdddD96b8E518Cbdc9aa0',
    sales: '0x271b096921Fa5891D48CF2bF43F42fc32Fa69fDf',
    bundleSales: '0x23fcfcE2ec048f3e78d2c8EFfE598F81B0330C3c',
    factory: '0x94e75dD5194b4Cd800fF8DB232dE2500ee3E785f',
    //FantomNFTFactory
    privateFactory: '0xB628A26232F5E24B771D268C8680877DA9e8D209',
    //FantomNFTFactoryPrivate
    artFactory: '0x01C619F89247284268DA8837ffEE8fBb5a78eA22',
    //FantomArtFactory
    privateArtFactory: '0xCaa6ff4Db9a762dcdc725D69DD5d9B392A66d933' //FantomArtFactoryPrivate

  },
  999: {
    auction: '0x7e408f989deD4ac3ce2AdddD96b8E518Cbdc9aa0',
    sales: '0x271b096921Fa5891D48CF2bF43F42fc32Fa69fDf',
    bundleSales: '0x23fcfcE2ec048f3e78d2c8EFfE598F81B0330C3c',
    factory: '0x94e75dD5194b4Cd800fF8DB232dE2500ee3E785f',
    //FantomNFTFactory
    privateFactory: '0xB628A26232F5E24B771D268C8680877DA9e8D209',
    //FantomNFTFactoryPrivate
    artFactory: '0x01C619F89247284268DA8837ffEE8fBb5a78eA22',
    //FantomArtFactory
    privateArtFactory: '0xCaa6ff4Db9a762dcdc725D69DD5d9B392A66d933',
    //FantomArtFactoryPrivate
    zooBooster: '0xbCF9F4fae90dA7c4BB05DA6f9E9A9A39dc5Ce979'
  }
};
exports.Contracts = Contracts;