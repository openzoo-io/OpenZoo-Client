import { useApi } from 'api';
import React from 'react';
import { shortenAddress } from 'utils';
import styles from '../../styles.module.scss';

export function ArtworkDetailPagePropertiesView(props) {
  const { properties } = props;

  const { explorerUrl } = useApi();

  const res = [];

  res.push(
    <div key="animation_url" className={styles.property}>
      <div className={styles.propertyLabel}>animation_url : {props.animationUrl}</div>
      <div className={styles.propertyValue}></div>
    </div>
  );

  Object.keys(properties).map((key, idx) => {
    if (!['address'].includes(key)) {
      res.push(
        <div key={idx} className={styles.property}>
          <div className={styles.propertyLabel}>{key} : </div>
          <div className={styles.propertyValue}>
            {key === 'recipient' ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${explorerUrl}/address/${properties[key]}`}
              >
                {shortenAddress(properties[key])}
              </a>
            ) : key === 'IP_Rights' ? (
              properties[key] ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={properties[key]}
                >
                  {properties[key]}
                </a>
              ) : (
                'Not available'
              )
            ) : (
              properties[key]
            )}
            {key === 'royalty' ? '%' : ''}
          </div>
        </div>
      );
    }
  });

  return <div className={styles.propertiesWrapper}>{res}</div>;
}
