import React, { useEffect, useState } from 'react';
import { Contracts } from 'constants/networks';
import {
  useZooBoosterContract,
  useZooElixirContract,
} from 'contracts/zookeeper';
import cx from 'classnames';

import styles from '../../styles.module.scss';

// eslint-disable-next-line no-undef
const ENV = process.env.REACT_APP_ENV;
const CHAIN = ENV === 'MAINNET' ? 888 : 999;

export function ArtworkDetailPageAttributesView(props) {
  const { address, tokenID, attributes } = props;

  const { getBoosting, getLockTimeReduce } = useZooBoosterContract();
  const { getElixir } = useZooElixirContract();

  const [zooBoosterBoosting, setzooBoosterBoosting] = useState(0);
  const [zooBoosterLockTimeReduce, setzooBoosterLockTimeReduce] = useState(0);
  const [zooElixir, setzooElixir] = useState({});

  useEffect(() => {
    // ZooBooster //
    if (Contracts[CHAIN].zooBooster.toLowerCase() === address.toLowerCase()) {
      getBoosting(tokenID).then(ret => {
        setzooBoosterBoosting(100 * (Number(ret.toString()) / 1e12 - 1));
      });
      getLockTimeReduce(tokenID).then(ret => {
        setzooBoosterLockTimeReduce(100 * (1 - Number(ret.toString()) / 1e12));
      });
    }

    // ZooElixir //
    if (Contracts[CHAIN].zooElixir.toLowerCase() === address.toLowerCase()) {
      getElixir(tokenID).then(ret => {
        setzooElixir(ret);
        //console.log('Elixir Info',ret);
        //console.log('Elixir Info',zooElixir);
      });
    }
  }, [tokenID]);

  const numberToColor = (number, diff = 0) => {
    return '#' + ((number % 16777215) + diff).toString(16).padStart(6, '0');
  };

  const res = [];
  // ZooBooster //
  if (Contracts[CHAIN].zooBooster.toLowerCase() === address.toLowerCase()) {
    res.push(
      <>
        <div key={'zooBooster_boosting'} className={styles.attribute}>
          <div className={styles.attributeLabel}>Boosting</div>
          <div className={styles.attributeValue}>
            +{zooBoosterBoosting.toFixed(3)}%
          </div>
        </div>
        <div key={'zooBooster_locktimereduce'} className={styles.attribute}>
          <div className={styles.attributeLabel}>Lock Reduce</div>
          <div className={styles.attributeValue}>
            -{zooBoosterLockTimeReduce.toFixed(3)}%
          </div>
        </div>
      </>
    );
  }

  // ZooElixir //
  if (Contracts[CHAIN].zooElixir.toLowerCase() === address.toLowerCase()) {
    let levelImg = '';
    switch (zooElixir?.level?.toString()) {
      case '1':
        levelImg = <img src="/ZooBooster/class/N.png" />;
        break;
      case '2':
        levelImg = <img src="/ZooBooster/class/R.png" />;
        break;
      case '3':
        levelImg = <img src="/ZooBooster/class/SR.png" />;
        break;
      case '4':
        levelImg = <img src="/ZooBooster/class/SSR.png" />;
        break;
      case '5':
        levelImg = <img src="/ZooBooster/class/UR.png" />;
        break;
    }
    res.push(
      <>
        <div key={'zooElixir_name'} className={styles.attribute}>
          <div className={styles.attributeLabel}>Name</div>
          <div className={styles.attributeValue}>{zooElixir?.name}</div>
        </div>
        <div key={'zooElixir_drops'} className={styles.attribute}>
          <div className={styles.attributeLabel}>Drops</div>
          <div className={styles.attributeValue}>
            {Number(zooElixir?.drops?.toString()) / 1e18}%
          </div>
        </div>
        <div key={'zooElixir_level'} className={styles.attribute}>
          <div className={styles.attributeLabel}>Level</div>
          <div className={styles.attributeValue}>{levelImg}</div>
        </div>
        <div key={'zooElixir_color'} className={styles.attribute}>
          <div className={styles.attributeLabel}>Color</div>
          <div className={styles.attributeValue}>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: numberToColor(Number(zooElixir?.color?.toString())),
              }}
            ></div>
          </div>
        </div>
      </>
    );
  }

  Object.keys(attributes).map((key, idx) => {
    // ZooBooster //
    if (Contracts[CHAIN].zooBooster.toLowerCase() === address.toLowerCase()) {
      if (attributes[key].trait_type === 'category') {
        switch (attributes[key].value) {
          case '1':
            attributes[key].value = (
              <img src="/ZooBooster/category/fruits.png" />
            );
            break;
          case '2':
            attributes[key].value = (
              <img src="/ZooBooster/category/foods.png" />
            );
            break;
          case '3':
            attributes[key].value = (
              <img src="/ZooBooster/category/sweets.png" />
            );
            break;
          case '4':
            attributes[key].value = (
              <img src="/ZooBooster/category/potions.png" />
            );
            break;
          case '5':
            attributes[key].value = (
              <img src="/ZooBooster/category/spices.png" />
            );
            break;
          case '6':
            attributes[key].value = (
              <img src="/ZooBooster/category/magic.png" />
            );
            break;
        }
      }
      if (attributes[key].trait_type === 'level') {
        switch (attributes[key].value) {
          case '1':
            attributes[key].value = <img src="/ZooBooster/star.png" />;
            break;
          case '2':
            attributes[key].value = (
              <>
                <img src="/ZooBooster/star.png" />
                <img src="/ZooBooster/star.png" />
              </>
            );
            break;
          case '3':
            attributes[key].value = (
              <>
                <img src="/ZooBooster/star.png" />
                <img src="/ZooBooster/star.png" />
                <img src="/ZooBooster/star.png" />
              </>
            );
            break;
          case '4':
            attributes[key].value = <img src="/ZooBooster/max.png" />;
            break;
        }
      }
      if (attributes[key].trait_type === 'item') {
        attributes[key].trait_type = 'Class';
        switch (attributes[key].value) {
          case '1':
            attributes[key].value = <img src="/ZooBooster/class/N.png" />;
            break;
          case '2':
            attributes[key].value = <img src="/ZooBooster/class/R.png" />;
            break;
          case '3':
            attributes[key].value = <img src="/ZooBooster/class/SR.png" />;
            break;
          case '4':
            attributes[key].value = <img src="/ZooBooster/class/SSR.png" />;
            break;
          case '5':
            attributes[key].value = <img src="/ZooBooster/class/UR.png" />;
            break;
        }
      }
    }

    res.push(
      <div key={idx} className={cx('px-1', styles.attribute)}>
        <div className={styles.attributeLabel}>
          {attributes[key].trait_type}
        </div>
        <div className={styles.attributeValue}>{attributes[key].value}</div>
      </div>
    );
  });

  return (
    <div className={cx('row space-x-5 space-y-5', styles.attributeWrapper)}>
      {res}
    </div>
  );
}
