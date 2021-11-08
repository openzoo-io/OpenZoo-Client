// import { ChainId } from '@sushiswap/sdk';

// import iconFTM from 'assets/imgs/ftm.png';
import iconWFTM from 'assets/imgs/wwan.png';
// import iconUSDT from 'assets/imgs/usdt.png';
// import iconUSDC from 'assets/imgs/usdc.png';
// import iconDAI from 'assets/imgs/dai.png';

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

const Tokens = {
  888: [
    // {
    //   address: '',
    //   name: 'Fantom',
    //   symbol: 'FTM',
    //   decimals: 18,
    //   icon: iconFTM,
    // },
    {
      address: '0xdabd997ae5e4799be47d6e69d9431615cba28f48',
      name: 'Wrapped WAN',
      symbol: 'WWAN',
      decimals: 18,
      icon: iconWFTM,
    },
  ],
  999: [
    // {
    //   address: '',
    //   name: 'Fantom',
    //   symbol: 'FTM',
    //   decimals: 18,
    //   icon: iconFTM,
    // },
    {
      address: '0x916283cc60fdaf05069796466af164876e35d21f',
      name: 'Wrapped WAN',
      symbol: 'WWAN',
      decimals: 18,
      icon: iconWFTM,
    },
  ],
};

export default function useTokens() {
  const chain = isMainnet ? 888 : 999;

  const tokens = Tokens[chain];

  const getTokenByAddress = addr => {
    const address =
      !addr ||
      addr === '0x0000000000000000000000000000000000000000' ||
      addr === 'ftm'
        ? ''
        : addr;
    return (tokens || []).find(
      tk => tk.address.toLowerCase() === address.toLowerCase()
    );
  };

  return { getTokenByAddress, tokens };
}
