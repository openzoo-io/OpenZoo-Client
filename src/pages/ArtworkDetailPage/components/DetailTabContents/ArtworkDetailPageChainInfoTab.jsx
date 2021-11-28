import React from 'react';
import { shortenAddress } from 'utils';

import styles from '../../styles.module.scss';

export function ArtworkDetailPageChainInfoTab(props) {
  const { explorerUrl, address } = props;
  return (
    <div className={styles.panelBody}>
      <div className={styles.panelLine}>
        <div className={styles.panelLabel}>Collection</div>
        <a
          href={`${explorerUrl}/token/${address}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.panelValue}
        >
          {shortenAddress(address)}
        </a>
      </div>
      <div className={styles.panelLine}>
        <div className={styles.panelLabel}>Network</div>
        <div className={styles.panelValue}>Wanchain Mainnet</div>
      </div>
      <div className={styles.panelLine}>
        <div className={styles.panelLabel}>Chain ID</div>
        <div className={styles.panelValue}>888</div>
      </div>
    </div>
  );
}
