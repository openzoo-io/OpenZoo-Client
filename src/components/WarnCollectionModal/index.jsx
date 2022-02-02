import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

import toast from 'utils/toast';
import { useApi } from 'api';
import { getSigner } from 'contracts';

import Modal from '../Modal';
import styles from '../Modal/common.module.scss';

const WarnCollectionModal = ({ visible, isWarn, onClose }) => {
  const { getNonce, warnCollection, unwarnCollection } = useApi();
  const { account } = useWeb3React();

  const { authToken } = useSelector(state => state.ConnectWallet);

  const [warning, setWarning] = useState(false);
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (visible) {
      setWarning(false);
    }
  }, [visible]);

  const handleWarnItem = async () => {
    if (warning) return;

    try {
      setWarning(true);

      const { data: nonce } = await getNonce(account, authToken);

      let signature;
      let addr;
      try {
        const signer = await getSigner();
        const msg = `Approve Signature on OpenZoo.io with nonce ${nonce}`;
        signature = await signer.signMessage(msg);
        addr = ethers.utils.verifyMessage(msg, signature);
      } catch (err) {
        toast(
          'error',
          'You need to sign the message to be able to warn/unwarn collection.'
        );
        setWarning(false);
        return;
      }

      const ret = await (isWarn ? warnCollection : unwarnCollection)(
        address,
        authToken,
        signature,
        addr
      );
      if (ret.status == 'success')
      {
        toast('success', 'Success! - Please wait around 2 mins');
      }
      else{
        toast('error',ret.data);
      }
    } catch (e) {
      console.log(e);
    }
    setWarning(false);
  };

  return (
    <Modal
      visible={visible}
      title={isWarn ? 'Warn Collection' : 'Unwarn Collection'}
      onClose={onClose}
      submitDisabled={warning}
      submitLabel={
        warning ? (
          <ClipLoader color="#FFF" size={16} />
        ) : isWarn ? (
          'Warn'
        ) : (
          'Un-Warn'
        )
      }
      onSubmit={!warning ? () => handleWarnItem() : null}
    >
      <div className={styles.formGroup}>
        <div className={styles.formLabel}>Collection Address</div>
        <div className={styles.formInputCont}>
          <input
            className={styles.formInput}
            placeholder="0x0000"
            value={address}
            onChange={e => setAddress(e.target.value)}
            disabled={warning}
          />
        </div>
      </div>
    </Modal>
  );
};

export default WarnCollectionModal;
