import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';

export * from './abi';
export * from './auctions';
export * from './sales';
export * from './bundleSales';
export * from './token';
export * from './wftm';
export * from './factory';

export const getSigner = async () => {
  const { connector } = useWeb3React();
  const web3provider = await connector.getProvider();
  await web3provider.enable();
  let provider = new ethers.providers.Web3Provider(web3provider);
  const signer = provider.getSigner();
  return signer;
};
