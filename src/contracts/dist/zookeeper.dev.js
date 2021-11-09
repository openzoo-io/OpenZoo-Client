"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useZooBoosterContract = void 0;

var _networks = require("constants/networks");

var _useContract2 = _interopRequireDefault(require("hooks/useContract"));

var _abi = require("./abi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line no-undef
var isMainnet = process.env.REACT_APP_ENV === 'MAINNET';
var CHAIN = isMainnet ? 888 : 999;

var useZooBoosterContract = function useZooBoosterContract() {
  var _useContract = (0, _useContract2["default"])(),
      getContract = _useContract.getContract;

  var getZooBoosterContract = function getZooBoosterContract() {
    return regeneratorRuntime.async(function getZooBoosterContract$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(getContract(_networks.Contracts[CHAIN].zooBooster, _abi.ZOOBOOSTER_ABI));

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  var getBoosting = function getBoosting(tokenId) {
    var contract;
    return regeneratorRuntime.async(function getBoosting$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(getZooBoosterContract());

          case 2:
            contract = _context2.sent;
            _context2.next = 5;
            return regeneratorRuntime.awrap(contract.getBoosting(tokenId));

          case 5:
            return _context2.abrupt("return", _context2.sent);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  };

  var getLockTimeReduce = function getLockTimeReduce(tokenId) {
    var contract;
    return regeneratorRuntime.async(function getLockTimeReduce$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(getZooBoosterContract());

          case 2:
            contract = _context3.sent;
            _context3.next = 5;
            return regeneratorRuntime.awrap(contract.getLockTimeReduce(tokenId));

          case 5:
            return _context3.abrupt("return", _context3.sent);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    });
  };

  return {
    getBoosting: getBoosting,
    getLockTimeReduce: getLockTimeReduce
  };
};

exports.useZooBoosterContract = useZooBoosterContract;