import React from 'react';
import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import 'assets/css/plugins/remixicon.min.css';
import 'assets/css/plugins/bootstrap.min.css';
import './index.css';
import 'assets/css/style.css';

// import App from 'components/app';
// import Web3ReactManager from 'components/Web3ReactManager';
// import { store } from '../src/stores/reduxStore';
// import { NetworkContextName } from './constants';
// import getLibrary from './utils/getLibrary';

//const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);
const root = createRoot(document.getElementById('root'));

root.render(
  <div style={{ textAlign: 'center', fontSize: '20px', width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <img src="https://openzoo.io/icon.png" alt="OpenZoo.io" style={{ width: '150px', height: '150px' }} />
    
    <div><strong>OpenZoo.io</strong> already closed.</div>
    <div><b>ZooBoosters/ZooNFTs</b>: Future in-game utility updates coming soon.</div>
    <div style={{ marginTop: '20px' }}>Thank you for supporting OpenZoo!</div>
  </div>
);

