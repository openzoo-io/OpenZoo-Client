import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
const checkBalance = async address => {
  const { connector } = useWeb3React();
  const web3provider = await connector.getProvider();
  await web3provider.enable();
  const provider = new ethers.providers.Web3Provider(web3provider);
  let balance = await provider.getBalance(address);
  balance = ethers.utils.formatEther(balance);
  return balance;
};
const WalletUtils = {
  checkBalance,
};

export default WalletUtils;
