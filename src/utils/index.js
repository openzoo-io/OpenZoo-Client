import { ethers } from 'ethers';
import { getAddress } from '@ethersproject/address';

import { Categories } from 'constants/filter.constants';
import { IPFSUris } from 'constants/ipfs.constants';
import MetamaskErrors from 'constants/errors';



export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

function isValidCode(code) {
  return code in MetamaskErrors ? true : false;
}

export function shortenAddress(address, chars = 4) {
  if (!address) return '';
  if (address === '0x8930f0cafda831181fd3f5dcccaeb0418b615b56')
  {
    return 'Auction Contract';
  }
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}



export const getRandomIPFS = (tokenURI, justURL = false, isFallback = false) => {
  let random = Math.floor(Math.random() * IPFSUris.length);

  if (justURL) {
    return `${IPFSUris[random]}`;
  }
  if (isFallback) {
    if (tokenURI.includes('ipfs://')) {
      return `https://artion.mypinata.cloud/ipfs/${tokenURI.split('ipfs://')[1].replace(/([^:]\/)\/+/g, "$1")}`;
    }
    else {
      return `https://artion.mypinata.cloud/ipfs/${tokenURI.split('ipfs/')[1]}`;
    }
  }
  try {
    if (
      tokenURI.includes('pinata.cloud') ||
      tokenURI.includes('cloudflare') ||
      tokenURI.includes('ipfs.io') ||
      tokenURI.includes('ipfs.infura.io')
    ) {
      return `${IPFSUris[random]}${tokenURI.split('ipfs/')[1]}`;
    } else if (tokenURI.includes('ipfs://')) {
      return `${IPFSUris[random]}${tokenURI.split('ipfs://')[1].replace(/([^:]\/)\/+/g, "$1")}`;
    }



    return tokenURI.replace('zoo-factory.vercel.app', 'app.zookeeper.finance');
  }
  catch (error) {
    return tokenURI;
  }


};

export const formatUSD = (num, digits) => {
  if (num < 1) {
    return '$' + num.toFixed(digits);
  }
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function (item) {
    return num >= item.value;
  });
  return item ? '$' + (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "$0";
}


export const formatNumber = num => {
  if (isNaN(num) || num === null) return '';
  let parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};



export const formatCategory = category => {
  return Categories.find(item => item.id === category).label;
};

export const formatError = error => {
  if (error.data) {
    if (isValidCode(error.data.code)) {
      return MetamaskErrors[String(error.data.code)];
    } else {
      return error.data.message;
    }
  } else {
    if (error.message) {
      let message = error.message;
      let startIndex = message.indexOf('data');

      if (startIndex < 0) {
        if (isValidCode(error.code)) {
          return MetamaskErrors[String(error.code)];
        }
      }

      let code = String(message.substr(startIndex + 14, 6));

      if (isValidCode(code)) {
        return MetamaskErrors[code];
      }
    }
  }

  return 'Error!';
};

const intlFormat = num => {
  return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
};

export const formatFollowers = num => {
  if (num >= 1000000) return intlFormat(num / 1000000) + 'M';
  if (num >= 1000) return intlFormat(num / 1000) + 'k';
  return intlFormat(num);
};

export const calculateGasMargin = value => {
  return value
    .mul(ethers.BigNumber.from(10000).add(ethers.BigNumber.from(1000)))
    .div(ethers.BigNumber.from(10000));
};

export const formatDateTimeAgo = (_date, _now) => {
  const ONE_MIN = 60;
  const ONE_HOUR = ONE_MIN * 60;
  const ONE_DAY = ONE_HOUR * 24;
  const ONE_MONTH = ONE_DAY * 30;

  const now = _now ?? new Date();
  const date = new Date(_date);
  const diff = Math.floor((now - date.getTime()) / 1000);
  if (diff >= ONE_MONTH) {
    const m = Math.ceil(diff / ONE_MONTH);
    return `${m} Month${m > 1 ? 's' : ''} Ago`;
  }
  if (diff >= ONE_DAY) {
    const d = Math.ceil(diff / ONE_DAY);
    return `${d} Day${d > 1 ? 's' : ''} Ago`;
  }
  if (diff >= ONE_HOUR) {
    const h = Math.ceil(diff / ONE_HOUR);
    return `${h} Hour${h > 1 ? 's' : ''} Ago`;
  }
  if (diff >= ONE_MIN) {
    const h = Math.ceil(diff / ONE_MIN);
    return `${h} Min${h > 1 ? 's' : ''} Ago`;
  }
  return `${diff} Second${diff > 1 ? 's' : ''} Ago`;
};

function getLocationSearchParams() {
  try {
    return window.location.search.replace("?", "").toLowerCase().split("&");
  } catch {
    return []
  }
}

function isEmbed() {
  return getLocationSearchParams().find(x => x.startsWith("embed")) ?? false;
}

function isDarkModeRequested() {
  return getLocationSearchParams().find(x => x.startsWith("theme=dark")) ?? false;
}

export function getEmbedParams() {
  return {
    isEmbed: isEmbed(),
    isDarkMode: isDarkModeRequested()
  }
}
