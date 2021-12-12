import React from 'react';

export function ViewProofButton() {
  return (
    <div className="dropdown">
      <button
        className="btn btn-sm btn-primary rounded-pill dropdown-toggle"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Proof
      </button>
      <div className="dropdown-menu">
        <a
          className="dropdown-item"
          href="https://ipfs.io/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>
            <img src="assets/img/icons/ipfs.svg" width="20" alt="" />
            View on IPFS
          </span>
          <i className="ri-external-link-line color_brand"></i>
        </a>
        <a
          className="dropdown-item"
          href="https://etherscan.io/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>
            <img src="assets/img/icons/ether.png" width="20" alt="" />
            View on Etherscan
          </span>
          <i className="ri-external-link-line color_brand"></i>
        </a>
      </div>
    </div>
  );
}
