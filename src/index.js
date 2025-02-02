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
  <div style={{ textAlign: 'left', fontSize: '14px', width: '100%', margin: '0 auto', maxWidth: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start', padding: '20px' }}>
    <img src="https://openzoo.io/icon.png" alt="OpenZoo.io" style={{ width: '100px', height: '100px' }} />

    <div style={{ marginTop: '20px' }}>
      <div style={{ fontWeight: 'bold', fontSize: '20px' }}>Farewell to <b>OpenZoo.io</b></div>
      <div style={{ fontSize: '18px' }}>Thank You for the Journey</div>
    </div>

    <div style={{ marginTop: '20px' }}>
      Today, we officially close the doors of OpenZoo.io, marking the end of an incredible chapter in our NFT journey. From the very beginning, OpenZoo was more than just a marketplace. It was a vision to create a thriving digital collectibles hub within the WANCHAIN ecosystem.
    </div>We want to express our deepest gratitude to every artist, collector, trader, and builder who supported us along the way. Your enthusiasm, creativity, and belief in this project have been the heartbeat of OpenZoo, and we couldn’t have made it this far without you.

    <div style={{ marginTop: '20px' }}>
      Today, we officially close the doors of OpenZoo.io, marking the end of an incredible chapter in our NFT journey. From the very beginning, OpenZoo was more than just a marketplace. It was a vision to create a thriving digital collectibles hub within the WANCHAIN ecosystem.
    </div>

    <div style={{ marginTop: '20px' }}>
      While OpenZoo has come to an end, this isn’t goodbye: it’s an evolution. Our commitment to blockchain gaming, NFTs, and innovation remains stronger than ever. <a href="https://opensea.io/collection/zoogenes" target="_blank" rel="noopener noreferrer">ZooGenes</a> will continue their journey on Avalanche C-Chain, bringing new opportunities for their holders, and our gaming ecosystem will keep growing.
    </div>

    <div style={{ marginTop: '20px' }}>
      Thank you for being part of this adventure. The future of PLYR is just getting started, and we hope you’ll stay with us for the next chapter.
    </div>

    <div style={{ marginTop: '20px' }}>
      With appreciation,<br/>
      The OPENZOO Team
    </div>

  </div>
);

