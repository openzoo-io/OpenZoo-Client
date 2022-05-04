import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

import toast from 'utils/toast';
import { useApi } from 'api';
import useConnectionUtils from 'hooks/useConnectionUtils';

import Modal from '../Modal';
import styles from '../Modal/common.module.scss';

const VerifyCollectionModal = ({ visible, isVerify, onClose }) => {
  const { getNonce, verifyCollection, unverifyCollection } = useApi();
  const {getSigner} = useConnectionUtils();
  const { account } = useWeb3React();

  const { authToken } = useSelector(state => state.ConnectWallet);

  const [verifying, setVerifying] = useState(false);
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (visible) {
      setVerifying(false);
    }
  }, [visible]);

  const handleVerifyItem = async () => {
    if (verifying) return;

    try {
      setVerifying(true);

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
          'You need to sign the message to be able to verify/unverify collection.'
        );
        setVerifying(false);
        return;
      }

      const ret = await (isVerify ? verifyCollection : unverifyCollection)(
        address,
        authToken,
        signature,
        addr
      );
      if (ret.status == 'success')
      {
        toast('success', 'Success!');
      }
      else{
        toast('error',ret.data);
      }
    } catch (e) {
      console.log(e);
    }
    setVerifying(false);
  };

  return (
    <Modal
      visible={visible}
      title={isVerify ? 'Verify Collection' : 'Unverify Collection'}
      onClose={onClose}
      submitDisabled={verifying}
      submitLabel={
        verifying ? (
          <ClipLoader color="#FFF" size={16} />
        ) : isVerify ? (
          'Verify'
        ) : (
          'Unverify'
        )
      }
      onSubmit={!verifying ? () => handleVerifyItem() : null}
    >
      <div className={styles.formGroup}>
        <div className={styles.formLabel}>Collection Address</div>
        <div className={styles.formInputCont}>
          <input
            className={styles.formInput}
            placeholder="0x0000"
            value={address}
            onChange={e => setAddress(e.target.value)}
            disabled={verifying}
          />
        </div>
      </div>
    </Modal>
  );
};

export default VerifyCollectionModal;
