import React from 'react';
import { ClipLoader } from 'react-spinners';

import Modal from '../Modal';
import styles from '../Modal/common.module.scss';

const BurnModal = ({
  visible,
  burning,
  onBurn,
  onClose,
}) => {


  const handleTransfer = () => {
    onBurn('0x000000000000000000000000000000000000000f');
  };

  return (
    <Modal
      visible={visible}
      title="Burn Item"
      onClose={onClose}
      submitDisabled={burning}
      submitLabel={
        burning ? <ClipLoader color="#FFF" size={16} /> : 'Burn Now'
      }
      onSubmit={!burning ? () => handleTransfer() : null}
    >
      <div className={styles.formGroup}>
      This deletion confirmation will result in the permanent removal of your NFT and cannot be undone.<br/><br/>
      Please make sure this action is deliberate and you fully understand the consequences as OpenZoo will not be held responsible for the loss of NFTs under any circumstances.
      </div>
      
    </Modal>
  );
};

export default BurnModal;
