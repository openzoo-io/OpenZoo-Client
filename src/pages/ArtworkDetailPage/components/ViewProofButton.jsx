import React from 'react';

export function ViewProofButton(props) {
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
        {props.tokenUri && (
          <a
            className="dropdown-item"
            href={props.tokenUri}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>
              <img src="assets/img/icons/ipfs.svg" width="20" alt="" />
              View on IPFS
            </span>
            <i className="ri-external-link-line color_brand"></i>
          </a>
        )}
        {
        false && <a
          className="dropdown-item"
          href="https://www.wanscan.org/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>
            <img src="assets/img/icons/ether.png" width="20" alt="" />
            View on Wanscan
          </span>
          <i className="ri-external-link-line color_brand"></i>
        </a>
        }
      </div>
    </div>
  );
}
