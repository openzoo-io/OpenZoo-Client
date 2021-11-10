import React from 'react';
import { Link } from 'react-router-dom';

import LogoImage from 'assets/svgs/openzoo_icon.svg';

export function HomePageStartOwnCollectionSection() {
  return (
    <div className="call2action is__light">
      <div className="container">
        <div
          className="row justify-content-between align-items-center
						sm:space-y-20"
        >
          <div className="col-md-6">
            <div className="space-y-20">
              <h1>Start your own collection today</h1>
              <p className="color_text section__text">
                raroin is a shared liquidity NFT market smart contract which is
                used by multiple websites to provide the users the best possible
                experience.
              </p>
              <Link to="/" className="btn btn-primary">
                Start Collecting
              </Link>
            </div>
          </div>
          <div className="col-md-4">
            <img className="img-fluid img__logo" src={LogoImage} alt="..." />
          </div>
        </div>
      </div>
    </div>
  );
}
