import React, { useState } from 'react';
import Modal from '../Modal';
import showToast from 'utils/toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const EmbedModal = ({ visible, onClose, embedTitle }) => {
  const [darkMode, setDarkMode] = useState(false);

  const frameProps = {
    height: 300,
    width: 400,
    src: window.location.href + "?" + ["embed", darkMode ? "theme=dark" : ""].filter(x => !!x).join("&"),
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <span style={{ marginRight: 5, display: 'flex' }}>
              <FontAwesomeIcon icon={faSun} />
            </span>
            <input
              id="embed-dark-mode-toggle"
              type="checkbox"
              checked={darkMode}
            />
            <label
              style={{ marginBottom: 0 }}
              className="toggle"
              htmlFor={`embed-dark-mode-toggle`}
              onClick={() => setDarkMode(!darkMode)}
            >
              Toggle
            </label>
            <span style={{ marginLeft: 5, display: 'flex' }}>
              <FontAwesomeIcon icon={faMoon} />
            </span>
          </div>
          <button className="btn btn-sm btn-white" onClick={() => copyToClipboard()}>
            <i className="ri-save-line" style={{ marginRight: "5px" }}></i>Copy
          </button>
        </div>
      </div>
    </Modal >
  );
};

export default EmbedModal
