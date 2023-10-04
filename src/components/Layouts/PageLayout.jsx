import React from 'react';
import { Footer } from 'components/Footer';
import Header from 'components/header';
import cx from 'classnames';
import { FooterEmbed } from 'components/FooterEmbed';
import { getEmbedParams } from 'utils';

import { useDispatch } from 'react-redux';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import PriceActions from 'actions/price.actions';


export function PageLayout(props) {
  const { className, containerClassName, children, cover, ...rest } = props;
  const { isEmbed, isDarkMode } = getEmbedParams();

  const dispatch = useDispatch();
  const { chainId, connector } = useWeb3React();



  React.useEffect(() => {
    const getPrice = async () => {
      try {
        if (chainId === 888) {
          const web3provider = await connector.getProvider();
          //await web3provider.enable();
          const provider = new ethers.providers.Web3Provider(web3provider);
          const oracle = new ethers.Contract(
            '0xA34D0a3a38C385B8CAbF1d888c61ca0d2500B7cE',
            [
              {
                inputs: [{ internalType: 'address', type: 'address', name: '_token' }],
                name: 'getPrice',
                outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
                stateMutability: 'view',
                type: 'function',
              },
            ],
            provider
          );
          const ZOO = '0x6e11655d6aB3781C6613db8CB1Bc3deE9a7e111F';
          const _price = await oracle.getPrice(ZOO);
          const price = parseFloat(_price.toString()) / 10 ** 18;
          dispatch(PriceActions.updatePrice(price));
          console.log('ZOO PRICE',price)
        } else if (chainId === 999) {
          const web3provider = await connector.getProvider();
          //await web3provider.enable();
          const provider = new ethers.providers.Web3Provider(web3provider);
          const oracle = new ethers.Contract(
            '0x2f5e32eC8d9A298063F7FFA14aF515Fa8fEb71Eb',
            [
              {
                inputs: [{ internalType: 'address', type: 'address', name: '_token' }],
                name: 'getPrice',
                outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
                stateMutability: 'view',
                type: 'function',
              },
            ],
            provider
          );
          const ZOO = '0x890589dC8BD3F973dcAFcB02b6e1A133A76C8135';
          const _price = await oracle.getPrice(ZOO);
          const price = parseFloat(_price.toString()) / 10 ** 18;
          dispatch(PriceActions.updatePrice(price));
          
        }
      } catch (err) {
        console.log(err);
      }
    };

    getPrice();
    const timer = setInterval(getPrice, 1000 * 60);
    return () => {
      clearInterval(timer);
    }
  }, [chainId]);

  if (isDarkMode) { //isEmbed && 
    document.body.classList.add('is__dark');
    window.localStorage.setItem('darkmode', true);
  }

  return (
    <div className={cx('overflow-hidden', className)} {...rest}>
      {
        isEmbed ?
          (
            <>
              {cover}
              <div className={cx('container', containerClassName)}>{children}</div>
              <FooterEmbed />
            </>
          ) :
          (
            <>
              <Header />
              {cover}
              <div className={cx('container', containerClassName)}>{children}</div>
              <Footer />
            </>
          )
      }
    </div>
  );
}
