import React from 'react';

import styles from '../../styles.module.scss';

export function ArtworkDetailPageRoyaltyTab(props) {
  const { collectionRoyalty } = props;
  return (
    <div className={styles.panelBody}>
      <div className={styles.panelLine}>
        <div className={styles.panelLabel}>Royalty</div>
        <div className={styles.panelValue}>{collectionRoyalty.royalty}%</div>
      </div>
      <div className={styles.panelLine}>
        <div className={styles.panelLabel}>Fee Recipient</div>
        <div className={styles.panelValue}>
          {collectionRoyalty.feeRecipient}
        </div>
      </div>
    </div>
  );
}
