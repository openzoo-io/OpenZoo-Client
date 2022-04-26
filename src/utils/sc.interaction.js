import { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

const useContract = () => {
  const { chainId, connector } = useWeb3React();

  const loadContract = useCallback(
    async (address, abi) => {
      let web3provider = await connector.getProvider();
      await web3provider.enable();
      const provider = new ethers.providers.Web3Provider(web3provider);
      const signer = provider.getSigner();
      return new ethers.Contract(address, abi, signer);
    },
    [chainId]
  );

  const getAccountBalance = useCallback(
    async address => {
      let web3provider = await connector.getProvider();
      await web3provider.enable();
      const provider = new ethers.providers.Web3Provider(web3provider);
      let balance = await provider.getBalance(address);
      balance = ethers.utils.formatEther(balance);
      return balance;
    },
    [chainId]
  );

  return { loadContract, getAccountBalance };
};

export default useContract;
