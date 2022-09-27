import React, { useEffect, useState, useMemo } from 'react';
import { Contracts } from 'constants/networks';
import {
  useZooBoosterContract,
  useZooElixirContract,
} from 'contracts/zookeeper';

import styles from '../../styles.module.scss';
import { useApi } from 'api';

// eslint-disable-next-line no-undef
const ENV = process.env.REACT_APP_ENV;
const CHAIN = ENV === 'MAINNET' ? 888 : 999;
const ZOOGENES_EXCLUDED = [
  'Background Points',
  'Body Points',
  'Expression Points',
  'Accessory Points',
  'Costume Points',
  'Ghost Points',
  'Generation',
  'Headgear Points',
  'Effect Points',
];

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

  const { getAttributeFilterData } = useApi();
  const [filterData, setFilterData] = useState([]);
  const [parsedFilterData, setParsedFilterData] = useState([]);
  const fetchFilterData = async () => {
    try {
      let data = await getAttributeFilterData(address);
      setFilterData(data);
    } catch (e) {
      setFilterData([]);
    }
  };

  useMemo(()=>{
    fetchFilterData();
  },[])

  useEffect(()=>{
    if (!filterData) return;
    let parsedData = [];
    filterData.map((v)=>{
      if (v.isNumeric === false)
      {
        let total_value = 0;
        v.value.map(v2=>{
          total_value +=  v2.count;
        })

        let tmp = v;
        tmp.total_value = total_value;
        parsedData.push(tmp);
      }
    });
    //console.log('parsedData',parsedData)

    // parse to array //
    let result = [];
    parsedData.map((v)=>{
      result[v._id] = v;
      v.value.map((v2)=>{
        result[v._id][v2.value] = v2;
      });
    })
    console.log('parsedData',result)
    setParsedFilterData(result);

  },[filterData])



  const numberToColor = (number, diff = 0) => {
    return '#' + ((number % 16777215) + diff).toString(16).padStart(6, '0');
  };

  const res = [];
  // ZooBooster - Additional Data //
  if (Contracts[CHAIN].zooBooster.toLowerCase() === address.toLowerCase()) {
    res.push(
      <>
        <div className={styles.attributeLabel}>Boosting</div>
        <div className={styles.attributeValue}>
          +{zooBoosterBoosting.toFixed(3)}%
        </div>

        <div className={styles.attributeLabel}>Lock Reduce</div>
        <div className={styles.attributeValue}>
          -{zooBoosterLockTimeReduce.toFixed(3)}%
        </div>
      </>
    );
  }

  // ZooElixir - Additional Data //
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
        <div className={styles.attributeLabel}>Name</div>
        <div className={styles.attributeValue}>{zooElixir?.name}</div>

        <div className={styles.attributeLabel}>Drops</div>
        <div className={styles.attributeValue}>
          {Number(Number(zooElixir?.drops?.toString()) / 1e18).toFixed(2)}%
        </div>

        <div className={styles.attributeLabel}>Level</div>
        <div className={styles.attributeValue}>{levelImg}</div>

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
      </>
    );
  }

  Object.keys(attributes).map(key => {
    // Excluded Fields for ZooGenes //
    if (Contracts[CHAIN].zooGenes.toLowerCase() === address.toLowerCase()) {
      if (ZOOGENES_EXCLUDED.includes(attributes[key].trait_type)) {
        return;
      }
      if (attributes[key].trait_type === 'Class') {
        switch (attributes[key].value) {
          case 'N':
            attributes[key].value2 = <img src="/ZooBooster/class/N.png" />;
            break;
          case 'R':
            attributes[key].value2 = <img src="/ZooBooster/class/R.png" />;
            break;
          case 'SR':
            attributes[key].value2 = <img src="/ZooBooster/class/SR.png" />;
            break;
          case 'SSR':
            attributes[key].value2 = <img src="/ZooBooster/class/SSR.png" />;
            break;
          case 'UR':
            attributes[key].value2 = <img src="/ZooBooster/class/UR.png" />;
            break;
        }
      }
    }

    // ZooBooster of each attriibute //
    if (Contracts[CHAIN].zooBooster.toLowerCase() === address.toLowerCase()) {
      if (attributes[key].trait_type === 'category') {
        switch (attributes[key].value) {
          case '1':
            attributes[key].value2 = (
              <img src="/ZooBooster/category/fruits.png" />
            );
            break;
          case '2':
            attributes[key].value2 = (
              <img src="/ZooBooster/category/foods.png" />
            );
            break;
          case '3':
            attributes[key].value2 = (
              <img src="/ZooBooster/category/sweets.png" />
            );
            break;
          case '4':
            attributes[key].value2 = (
              <img src="/ZooBooster/category/potions.png" />
            );
            break;
          case '5':
            attributes[key].value2 = (
              <img src="/ZooBooster/category/spices.png" />
            );
            break;
          case '6':
            attributes[key].value2 = (
              <img src="/ZooBooster/category/magic.png" />
            );
            break;
        }
      }
      if (attributes[key].trait_type === 'level') {
        switch (attributes[key].value) {
          case '1':
            attributes[key].value2 = <img src="/ZooBooster/star.png" />;
            break;
          case '2':
            attributes[key].value2 = (
              <>
                <img src="/ZooBooster/star.png" />
                <img src="/ZooBooster/star.png" />
              </>
            );
            break;
          case '3':
            attributes[key].value2 = (
              <>
                <img src="/ZooBooster/star.png" />
                <img src="/ZooBooster/star.png" />
                <img src="/ZooBooster/star.png" />
              </>
            );
            break;
          case '4':
            attributes[key].value2 = <img src="/ZooBooster/max.png" />;
            break;
        }
      }
      if (attributes[key].trait_type === 'item') {
        attributes[key].trait_type2 = 'Class';
        switch (attributes[key].value) {
          case '1':
            attributes[key].value2 = <img src="/ZooBooster/class/N.png" />;
            break;
          case '2':
            attributes[key].value2 = <img src="/ZooBooster/class/R.png" />;
            break;
          case '3':
            attributes[key].value2 = <img src="/ZooBooster/class/SR.png" />;
            break;
          case '4':
            attributes[key].value2 = <img src="/ZooBooster/class/SSR.png" />;
            break;
          case '5':
            attributes[key].value2 = <img src="/ZooBooster/class/UR.png" />;
            break;
        }
      }
    }

    // ZooGenes Unshift insteads - Class, Total Points //
    if (Contracts[CHAIN].zooGenes.toLowerCase() === address.toLowerCase()) {
      if (['Class', 'Total Points'].includes(attributes[key].trait_type)) {
        res.unshift(
          <>
            <div className={styles.attributeLabel}>
              {attributes[key].trait_type}
            </div>

            <div className={styles.attributeValue}>
              {attributes[key].value2 || attributes[key].value}
              
              {
              parsedFilterData && parsedFilterData[attributes[key].trait_type] && attributes[key].value && parsedFilterData[attributes[key].trait_type][attributes[key].value].count && <span className={styles.percent}> ({
                Number(Number(parsedFilterData[attributes[key].trait_type][attributes[key].value].count) * 100 / Number(parsedFilterData[attributes[key].trait_type].total_value)).toFixed(2)
                }%)</span>
            }
              </div>
          </>
        );
        return;
      }
    }

    res.push(
      <>
        <div className={styles.attributeLabel}>
          {attributes[key].trait_type2 || attributes[key].trait_type}
        </div>
        {attributes[key].display_type === 'date' && (
          <div className={styles.attributeValue}>
            {new Date(Number(attributes[key].value) * 1000).toUTCString()}
          </div>
        )}
        {attributes[key].display_type !== 'date' && (
          <div className={styles.attributeValue}>
            {Contracts[CHAIN].zooGenes.toLowerCase() !== address.toLowerCase() ? attributes[key].display_type === 'boost_number' && Number(attributes[key].value) > 0 ?'+':'' : ''}
            {Contracts[CHAIN].zooGenes.toLowerCase() !== address.toLowerCase() ? attributes[key].value2 || attributes[key].value : ''}
            {
              
              Contracts[CHAIN].zooGenes.toLowerCase() === address.toLowerCase() && attributes[key].display_type === 'boost_number' && Number(attributes[key].value) > 0 ?
            
            <div className="progress" style={{width:'100%',marginRight:20, height: '1.15rem'}}>
              <div className="progress-bar" style={{background:'#00a59a',width:`${attributes[key].value2 || attributes[key].value}%`}}>{attributes[key].value2 || attributes[key].value}</div>
            </div>

            : Contracts[CHAIN].zooGenes.toLowerCase() === address.toLowerCase() && (attributes[key].value2 || attributes[key].value)
            }
            {
              parsedFilterData && parsedFilterData[attributes[key].trait_type] && parsedFilterData[attributes[key].trait_type][attributes[key].value] && parsedFilterData[attributes[key].trait_type][attributes[key].value].count !== undefined && <span className={styles.percent}> ({
                Number(Number(parsedFilterData[attributes[key].trait_type][attributes[key].value].count) * 100 / Number(parsedFilterData[attributes[key].trait_type].total_value)).toFixed(2)
                }%)</span>
            }
            {attributes[key].display_type === 'boost_percentage'?'%':''}
          </div>
        )}
      </>
    );
  });

  return <div className={styles.attributeWrapper}>{res}</div>;
}
