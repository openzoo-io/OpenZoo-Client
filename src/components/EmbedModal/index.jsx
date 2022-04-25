import React from 'react';
import Modal from '../Modal';
import showToast from 'utils/toast';

const EmbedModal = ({ visible, onClose, embedTitle }) => {

  const frameProps = {
    height: 300,
    width: 400,
    src: window.location.href + "?embed",
    title: ["OpenZoo", embedTitle].filter(x => !!x).join(" - ")
  }

  const value = `<iframe width="${frameProps.width}" height="${frameProps.height}" src="${frameProps.src}" title="${frameProps.title}" frameborder="0"></iframe>`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    showToast('info', 'Embed code is copied to clipboard.');
    onClose();
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Embed Collection"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <textarea
          style={{ height: 160 }}
          readOnly
          value={value}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="btn btn-sm btn-white" onClick={() => copyToClipboard()}>
            <i className="ri-save-line" style={{ marginRight: "5px" }}></i>Copy
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EmbedModal
